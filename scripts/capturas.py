#!/usr/bin/env python3
"""
Convierte las capturas de pantalla al formato que espera el sitio.

Uso:
    python3 scripts/capturas.py            # convierte lo que haya en capturas/
    python3 scripts/capturas.py --estado   # solo informa qué falta

Cómo usarlo: dejar los PNG/JPG en `capturas/<slug>/`, con la portada llamada
`cover` (o `00-...`) y el resto numerado. El script los convierte a .webp
optimizado y los deja en `public/projects/<slug>/`, que es donde el build los
descubre solo — no hay que tocar código.

    capturas/tna-office/cover.png          → public/projects/tna-office/cover.webp
    capturas/tna-office/01-ventas.png      → public/projects/tna-office/gallery/01-ventas.webp

Requiere Pillow:  python3 -m pip install Pillow
"""

import sys
import pathlib
import re

try:
    from PIL import Image
except ImportError:
    sys.exit("Falta Pillow. Instalar con:  python3 -m pip install Pillow")

RAIZ = pathlib.Path(__file__).resolve().parent.parent
ENTRADA = RAIZ / "capturas"
SALIDA = RAIZ / "public" / "projects"

# Ancho máximo. Las tarjetas se ven a ~600 px y el visor a ~1100; 1600 deja
# margen para pantallas de alta densidad sin inflar el peso del sitio.
ANCHO_MAX = 1600
CALIDAD = 82

EXTENSIONES = {".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"}

PROYECTOS = [
    "tna-office",
    "queue-alerts",
    "taskflow",
    "screenpop",
    "wiplus",
    "congelados-naty",
    "tnagroup",
    "whm-provision",
]


def imagenes(carpeta: pathlib.Path) -> list[pathlib.Path]:
    if not carpeta.is_dir():
        return []
    return sorted(
        (f for f in carpeta.iterdir() if f.suffix.lower() in EXTENSIONES),
        key=lambda f: f.name.lower(),
    )


def convertir(origen: pathlib.Path, destino: pathlib.Path) -> str:
    im = Image.open(origen)
    im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
    if im.width > ANCHO_MAX:
        alto = round(im.height * ANCHO_MAX / im.width)
        im = im.resize((ANCHO_MAX, alto), Image.LANCZOS)
    destino.parent.mkdir(parents=True, exist_ok=True)
    im.save(destino, "WEBP", quality=CALIDAD, method=6)
    kb = destino.stat().st_size / 1024
    return f"{im.width}x{im.height} · {kb:.0f} KB"


def estado() -> None:
    print(f"{'proyecto':<18} {'portada':<10} galería")
    print("─" * 42)
    faltan = 0
    for slug in PROYECTOS:
        carpeta = SALIDA / slug
        portada = any((carpeta / f"cover{e}").exists() for e in (".webp", ".png", ".jpg"))
        galeria = len(imagenes(carpeta / "gallery"))
        if not portada:
            faltan += 1
        marca = "sí" if portada else "—  FALTA"
        print(f"{slug:<18} {marca:<10} {galeria}")
    print("─" * 42)
    print(
        f"{len(PROYECTOS) - faltan}/{len(PROYECTOS)} con portada."
        + ("" if not faltan else f"  Faltan {faltan}.")
    )


def procesar() -> None:
    if not ENTRADA.is_dir():
        ENTRADA.mkdir(parents=True)
        for slug in PROYECTOS:
            (ENTRADA / slug).mkdir(exist_ok=True)
        print(f"Creé {ENTRADA.relative_to(RAIZ)}/ con una carpeta por proyecto.")
        print("Dejá ahí las capturas y volvé a correr el script.")
        return

    total = 0
    for slug in PROYECTOS:
        origen = ENTRADA / slug
        archivos = imagenes(origen)
        if not archivos:
            continue

        print(f"\n{slug}")
        n = 0
        for f in archivos:
            tallo = f.stem.lower()
            es_portada = tallo == "cover" or tallo.startswith("00")
            if es_portada:
                destino = SALIDA / slug / "cover.webp"
                etiqueta = "cover.webp"
            else:
                n += 1
                # Normaliza el nombre: `Captura de Ventas.PNG` → `01-ventas`
                limpio = re.sub(r"[^a-z0-9]+", "-", re.sub(r"^\d+[-_ ]*", "", tallo))
                limpio = limpio.strip("-") or f"captura-{n}"
                destino = SALIDA / slug / "gallery" / f"{n:02d}-{limpio}.webp"
                etiqueta = f"gallery/{destino.name}"
            info = convertir(f, destino)
            print(f"  {f.name:<34} → {etiqueta:<28} {info}")
            total += 1

    if total:
        print(f"\n{total} imágenes convertidas. Corré `npm run build` y aparecen solas.")
    else:
        print("No encontré imágenes en capturas/. Dejá los archivos y volvé a correr.")
    print()
    estado()


if __name__ == "__main__":
    if "--estado" in sys.argv:
        estado()
    else:
        procesar()

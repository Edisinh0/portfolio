#!/usr/bin/env python3
"""
Tapa los datos sensibles de las capturas antes de publicarlas.

Uso:
    python3 scripts/censurar.py                 # procesa todos los proyectos
    python3 scripts/censurar.py tna-office      # solo uno
    python3 scripts/censurar.py --marcar        # dibuja los recuadros en rojo
                                                # en vez de taparlos, para revisar
                                                # que estén bien puestos

Cómo funciona: los originales sin tocar viven en `capturas/<slug>/_originales/`
(esa subcarpeta la ignora `capturas.py`, que solo mira archivos sueltos). Este
script los lee, aplica el pixelado y deja el resultado en `capturas/<slug>/`
ya renombrado como espera `capturas.py`.

    capturas/tna-office/_originales/Ventas.png  →  capturas/tna-office/05-ventas.png

**Pixelado, no desenfoque.** El desenfoque gaussiano sobre texto se puede
revertir por deconvolución, y aunque no se revierta, un OCR lo lee igual. El
mosaico promedia bloques grandes: la información se pierde de verdad. Es la
misma razón por la que `public/projects/LEEME.md` pide bloque sólido y no blur.

Las zonas van en coordenadas relativas (0.0 a 1.0) sobre el ancho y el alto, así
que no dependen de la resolución de la captura.

Requiere Pillow:  python3 -m pip install Pillow
"""

import sys
import pathlib
import shutil

try:
    from PIL import Image, ImageDraw
except ImportError:
    sys.exit("Falta Pillow. Instalar con:  python3 -m pip install Pillow")

RAIZ = pathlib.Path(__file__).resolve().parent.parent
CAPTURAS = RAIZ / "capturas"
ORIGINALES = "_originales"

# Cuánto más grande el bloque, menos recuperable queda el texto. Se calcula
# sobre el ancho para que una captura de 2838 px no quede menos tapada que una
# de 1911 px.
BLOQUE_REL = 0.007
BLOQUE_MIN = 10


# Cada entrada: archivo original → (nombre de salida, [zonas a tapar]).
# Las zonas son (x1, y1, x2, y2) en fracción del ancho y del alto.
# Lista vacía = la captura está limpia y solo se copia.
#
# El nombre de salida define el orden de la galería: `cover` es la portada de la
# tarjeta y el resto se numera. Ver `public/projects/LEEME.md`.
PLAN = {
    "tna-office": {
        # Limpia: solo el placeholder tu@email.com.
        "Login.png": ("cover.png", []),

        "Dashboard.png": ("01-dashboard.png", [
            # Los tres contratos vencidos: razón social, nombre del archivo de
            # contrato y la nota interna con folio y fecha de renovación.
            (0.172, 0.255, 0.535, 0.478),
            # "PENDIENTES DE PAGO $1.205.875 · 117 ventas"
            (0.430, 0.535, 0.520, 0.600),
        ]),

        # Limpia: catálogo de salas con fotos del local y texto de marketing.
        "Recursos.png": ("02-recursos.png", []),

        "Clientes.png": ("03-clientes.png", [
            # Cantidad de clientes recurrentes.
            (0.153, 0.215, 0.190, 0.270),
            # Facturación real: 603.48 UF / $24.655.375 CLP mensual, etc.
            (0.352, 0.198, 0.980, 0.288),
            # "EMPRESAS (394 DE 394)" — delata la cartera completa.
            (0.192, 0.340, 0.245, 0.368),
            # Listado de razones sociales.
            (0.176, 0.500, 0.412, 1.000),
        ]),

        "Cotizaciones.png": ("04-cotizaciones.png", [
            # Cliente (chip "s4chile") repetido en cada fila.
            (0.288, 0.330, 0.345, 0.900),
            # Montos en UF.
            (0.262, 0.368, 0.390, 0.985),
            # Fecha + UUID del registro interno.
            (0.195, 0.405, 0.478, 1.000),
        ]),

        "Ventas.png": ("05-ventas.png", [
            # Los cuatro KPI del mes y el desglose por forma de pago.
            (0.145, 0.215, 0.706, 0.315),
            (0.708, 0.220, 0.992, 0.310),
            # Factura 1: razón social y monto.
            (0.172, 0.418, 0.330, 0.462),
            (0.912, 0.420, 0.985, 0.462),
            # Detalle de la factura 1: producto, fecha y N° de venta.
            (0.158, 0.458, 0.360, 0.688),
            # Factura 2: razón social y monto.
            (0.172, 0.722, 0.265, 0.762),
            (0.905, 0.722, 0.985, 0.764),
            # "COMPRADO POR" — nombres de personas reales.
            (0.205, 0.758, 0.402, 0.792),
            # Detalle de la factura 2.
            (0.158, 0.788, 0.540, 1.000),
        ]),

        "Usuarios.png": ("06-usuarios.png", [
            # Nombre y correo corporativo de cada usuario.
            (0.235, 0.390, 0.430, 1.000),
        ]),

        # Limpia: es el selector de columnas, sin ningún dato cargado.
        "Reportes.png": ("07-reportes.png", []),
    },
}


def pixelar(im: Image.Image, caja: tuple[int, int, int, int], bloque: int) -> None:
    x1, y1, x2, y2 = caja
    if x2 <= x1 or y2 <= y1:
        return
    region = im.crop(caja)
    ancho = max(1, region.width // bloque)
    alto = max(1, region.height // bloque)
    # BOX al achicar promedia los píxeles (destruye el texto); NEAREST al
    # agrandar deja el mosaico nítido en vez de interpolar de vuelta.
    region = region.resize((ancho, alto), Image.BOX).resize(region.size, Image.NEAREST)
    im.paste(region, caja)


def a_pixeles(zona: tuple, ancho: int, alto: int) -> tuple[int, int, int, int]:
    x1, y1, x2, y2 = zona
    return (
        max(0, round(x1 * ancho)),
        max(0, round(y1 * alto)),
        min(ancho, round(x2 * ancho)),
        min(alto, round(y2 * alto)),
    )


def procesar(slug: str, marcar: bool) -> int:
    carpeta = CAPTURAS / slug
    origen = carpeta / ORIGINALES
    if not origen.is_dir():
        print(f"{slug}: no existe {origen.relative_to(RAIZ)}/ — nada que hacer.")
        return 0

    plan = PLAN.get(slug)
    if not plan:
        print(f"{slug}: no hay plan de censura definido en scripts/censurar.py.")
        return 0

    print(f"\n{slug}")
    hechas = 0
    for entrada, (salida, zonas) in plan.items():
        f = origen / entrada
        if not f.exists():
            print(f"  {entrada:<20} — falta en {ORIGINALES}/, se salta")
            continue

        destino = carpeta / salida
        if not zonas and not marcar:
            shutil.copyfile(f, destino)
            print(f"  {entrada:<20} → {salida:<22} limpia, copiada tal cual")
            hechas += 1
            continue

        im = Image.open(f).convert("RGBA")
        bloque = max(BLOQUE_MIN, round(im.width * BLOQUE_REL))
        dibujo = ImageDraw.Draw(im) if marcar else None

        for zona in zonas:
            caja = a_pixeles(zona, im.width, im.height)
            if marcar:
                dibujo.rectangle(caja, outline=(255, 0, 0, 255), width=4)
            else:
                pixelar(im, caja, bloque)

        im.save(destino)
        que = "recuadros marcados" if marcar else f"{len(zonas)} zonas tapadas"
        print(f"  {entrada:<20} → {salida:<22} {que}")
        hechas += 1

    return hechas


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    marcar = "--marcar" in sys.argv

    slugs = args or sorted(PLAN)
    total = sum(procesar(s, marcar) for s in slugs)

    print()
    if marcar:
        print(f"{total} capturas marcadas. Revisá los recuadros rojos en capturas/<slug>/.")
        print("Cuando estén bien, corré el script sin --marcar.")
    else:
        print(f"{total} capturas listas. Ahora:  python3 scripts/capturas.py")
    print()

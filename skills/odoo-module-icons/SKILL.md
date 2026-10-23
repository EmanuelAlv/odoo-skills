---
name: odoo-module-icons
description: "Diseña iconos de módulos de Odoo (icon.png 256×256 con fondo transparente) con la línea gráfica de Odoo 19. Úsala siempre que se pida un icono, logo o imagen de app para un módulo de Odoo. Designs Odoo module icons (transparent icon.png) in the native Odoo 19 visual style; use it whenever an icon, logo or app image for an Odoo module is requested."
---

# Iconos de módulos Odoo — estilo Odoo 19

Objetivo: que el icono de un módulo propio se vea como si viniera de fábrica en el menú de aplicaciones de Odoo 19, tanto en tema claro como oscuro.

## 0. Formato de entrega: PNG con fondo transparente

- **El archivo final del icono es siempre `icon.png`**, 256×256, RGBA con **fondo transparente**.
- **No entregar el icono en WebP ni en SVG.** El PNG es el formato que Odoo usa de forma fiable tanto en la lista de Aplicaciones como en el menú principal (`web_icon`), y evita problemas de render del SVG en algunas instancias.
- El SVG se usa solo como **archivo de trabajo interno** para dibujar y exportar; no se entrega ni se coloca en el módulo, salvo que se pida expresamente.
- Verificar antes de entregar que el PNG es modo `RGBA` y que las esquinas tienen alpha 0 (transparente), sin tarjeta ni fondo blanco.

## 1. ADN visual de Odoo 19

Observado en los iconos nativos (Conversaciones, Calendario, Actividades, Contactos, CRM, Ventas, Tableros, Contabilidad, Proyectos, Compras, Inventario, Código de barras, Rastreador de enlaces, Aplicaciones, Ajustes):

- **Plano y geométrico.** Formas sólidas, sin contornos (stroke), sin sombras, sin degradados, sin texturas.
- **2 a 4 formas grandes** que se superponen. Nada de detalles finos: el icono se ve a ~64 px.
- **Superposición con color propio.** Donde dos formas se cruzan aparece un tercer tono más oscuro/saturado (como transparencia multiplicada), pero pintado en color plano, NO con opacity.
- **Esquinas redondeadas** generosas (radio ≈ 15–25 % del lado de la forma). Las barras y trazos tienen extremos redondeados o cortes en diagonal limpios.
- **Diagonal a ~45°** muy frecuente (CRM, Proyectos, Contabilidad, Actividades, Rastreador): da dinamismo.
- **Una sola metáfora** reconocible: burbuja de chat, check, tarjeta, código de barras, hexágono-engranaje, barras de gráfico, número.
- **Huecos en lugar de blanco.** El centro de Ajustes se ve oscuro en tema oscuro y blanco en claro: es un agujero transparente. Recortar con `fill-rule="evenodd"` en vez de rellenar de blanco. El blanco solo se permite como detalle pequeño encima de una forma de color (silueta de Contactos).
- **Fondo transparente.** La tarjeta redondeada (blanca u oscura) la pone Odoo; el icono no la dibuja.
- **Sin texto**, salvo números o letras muy gruesas como parte de la metáfora ("31" de Calendario).

## 2. Paleta

Valores aproximados muestreados de Odoo 19. Usar 2–3 colores base + 1 tono de superposición.

| Rol | Nombre | Hex |
|---|---|---|
| Base | Morado Odoo (ciruela) | `#985184` |
| Base | Morado profundo | `#714B67` |
| Base | Turquesa | `#1AD3BB` |
| Base | Petróleo oscuro | `#005E7A` |
| Base | Amarillo | `#FBB945` |
| Base | Naranja | `#F78613` |
| Base | Coral / rosa | `#FC868B` |
| Base | Rojo | `#EF5350` |
| Base | Azul cielo | `#2EBCFA` |
| Base | Azul | `#1A9FFF` |

Tonos de superposición sugeridos (color del cruce):

| Formas que se cruzan | Color del cruce |
|---|---|
| Morado + turquesa | `#005E7A` (petróleo) |
| Morado + amarillo | `#C2454B` (rojo vino) |
| Morado + naranja / coral | `#B33E5C` |
| Turquesa + rojo | `#B8323B` |
| Amarillo + naranja | `#F25C1F` |
| Naranja + coral | `#E8503A` |
| Turquesa + azul | `#0B8FB3` |
| Amarillo + turquesa | `#5CB85C` (usar con moderación) |

Reglas de color:
- El morado Odoo aparece en la mayoría de iconos; incluirlo salvo que el concepto pida otra cosa.
- Máximo 3 tonos base por icono (sin contar el del cruce).
- No usar negro, gris ni blanco como color principal: desaparecen en uno de los dos temas.
- Revisar que ningún color quede con contraste bajo contra `#FFFFFF` ni contra `#262A36`.

Combinaciones de referencia:
- Conversaciones: naranja + rojo-naranja (burbuja).
- CRM / Proyectos: turquesa + morado + petróleo en el cruce.
- Ventas: barras morado, rojo, amarillo con cruces más oscuros.
- Tableros / Aplicaciones: bloques de 4 colores (morado, coral, azul, turquesa).
- Inventario / Ajustes: hexágono amarillo-naranja + morado.

## 3. Grilla y geometría

- `viewBox="0 0 100 100"`, fondo transparente.
- Zona segura: el contenido ocupa aprox. de 12 a 88 en ambos ejes (≈ 75 % del lienzo). Centrado óptico, no matemático.
- Grosor mínimo de cualquier barra: 10 unidades. Huecos mínimos: 6 unidades.
- Radios: formas grandes `rx` 8–14; barras con extremos totalmente redondeados.
- Ángulos: 0°, 45° o 90°. Evitar ángulos arbitrarios.
- Peso visual similar al de los iconos nativos: ni más pequeño ni más cargado.

## 4. Proceso

1. **Entender el módulo**: qué hace y cómo se llama (nombre técnico). Si no está claro, preguntar en una línea.
2. **Elegir metáfora**: proponer 2–3 conceptos (objeto simple + forma) y escoger el más legible a 64 px. Comprobar que no se confunda con un icono nativo existente.
3. **Elegir paleta**: 2–3 colores base de la tabla + tono de cruce.
4. **Dibujar en SVG (archivo de trabajo)** a mano con primitivas (`rect`, `circle`, `path`, `polygon`). Los cruces se pintan duplicando la forma delantera recortada con `clipPath` de la trasera.
5. **Exportar a `icon.png`** 256×256 RGBA con fondo transparente y verificar la transparencia.
6. **Previsualizar** el PNG en tarjeta clara y oscura, a 96 px y 64 px; mirar el render con Read y corregir peso, centrado y contraste.
7. **Entregar** `icon.png` + `preview.png` + el fragmento XML para el menú. No entregar SVG ni WebP salvo petición expresa.

Cuando se pidan opciones, entregar 3 variantes con metáforas distintas, no 3 colores de la misma (cada una como PNG transparente).

## 5. Plantilla SVG (solo para dibujar)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <!-- forma trasera, usada para recortar el cruce -->
    <clipPath id="back">
      <rect x="12" y="32" width="50" height="54" rx="12"/>
    </clipPath>
  </defs>
  <!-- forma trasera -->
  <rect x="12" y="32" width="50" height="54" rx="12" fill="#985184"/>
  <!-- forma delantera -->
  <circle cx="64" cy="36" r="24" fill="#1AD3BB"/>
  <!-- cruce: misma forma delantera, recortada por la trasera, color oscuro -->
  <circle cx="64" cy="36" r="24" fill="#005E7A" clip-path="url(#back)"/>
</svg>
```

Hueco transparente (estilo Ajustes):

```svg
<path fill-rule="evenodd" fill="#F78613"
  d="M50 12 L83 31 L83 69 L50 88 L17 69 L17 31 Z
     M50 38 a12 12 0 1 0 0.01 0 Z"/>
```

## 6. Ejemplo aprobado: partner_duplicate_block

Módulo que bloquea contactos duplicados (NIT, teléfono, correo). Metáfora: dos tarjetas de contacto superpuestas (existente + duplicado) con distintivo rojo de "prohibido".

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="backCard"><rect x="12" y="14" width="48" height="56" rx="10"/></clipPath>
    <clipPath id="frontCard"><rect x="28" y="28" width="48" height="56" rx="10"/></clipPath>
  </defs>
  <rect x="12" y="14" width="48" height="56" rx="10" fill="#985184"/>
  <rect x="28" y="28" width="48" height="56" rx="10" fill="#1AD3BB"/>
  <rect x="28" y="28" width="48" height="56" rx="10" fill="#005E7A" clip-path="url(#backCard)"/>
  <circle cx="52" cy="48" r="8" fill="#FFFFFF"/>
  <path d="M38 72 a14 13 0 0 1 28 0 Z" fill="#FFFFFF"/>
  <circle cx="73" cy="73" r="15" fill="#EF5350"/>
  <circle cx="73" cy="73" r="15" fill="#B8323B" clip-path="url(#frontCard)"/>
  <rect x="65" y="70" width="16" height="6" rx="3" fill="#FFFFFF"/>
</svg>
```

Patrón reutilizable: objeto principal del módulo + distintivo circular pequeño en la esquina inferior derecha para la acción (bloquear, validar, sincronizar, alertar).

## 7. Exportación a PNG y previsualización

```bash
pip install cairosvg pillow --break-system-packages
```

```python
import cairosvg, io
from PIL import Image, ImageDraw

def render(svg, size):
    return Image.open(io.BytesIO(cairosvg.svg2png(url=svg, output_width=size, output_height=size))).convert("RGBA")

# Exportar PNG final con fondo transparente
icon = render("icon.svg", 256)
assert icon.mode == "RGBA" and icon.getpixel((0, 0))[3] == 0, "El fondo debe ser transparente"
icon.save("icon.png", format="PNG", optimize=True)

# Preview claro / oscuro (tarjetas como el menú de Odoo 19), usando el PNG final
themes = [((232, 230, 240), (255, 255, 255)), ((26, 29, 41), (38, 42, 54))]
W, T, PAD = 420, 140, 40
src = Image.open("icon.png").convert("RGBA")
sheet = Image.new("RGBA", (W, T * 2 + PAD * 3))
for i, (bg, tile) in enumerate(themes):
    y = PAD + i * (T + PAD)
    d = ImageDraw.Draw(sheet)
    d.rectangle([0, y - PAD // 2, W, y + T + PAD // 2], fill=bg)
    for j, size in enumerate([96, 64]):  # tamaño grande y tamaño real
        x = 40 + j * 180
        d.rounded_rectangle([x, y, x + T, y + T], radius=18, fill=tile)
        ic = src.resize((size, size), Image.LANCZOS)
        sheet.alpha_composite(ic, (x + (T - size) // 2, y + (T - size) // 2))
sheet.save("preview.png")
```

Abrir `preview.png` con Read y revisar antes de entregar.

## 8. Integración en el módulo

Archivo en `mi_modulo/static/description/`:
- `icon.png` (256×256, fondo transparente) — lo usa la lista de Aplicaciones y el menú principal.

Menú raíz:

```xml
<menuitem id="menu_mi_modulo_root"
          name="Mi Módulo"
          web_icon="mi_modulo,static/description/icon.png"
          sequence="50"/>
```

Si el módulo no tiene menú propio (solo agrega lógica), basta con colocar `icon.png`. Tras cambiar el icono, actualizar el módulo (`-u mi_modulo`) y refrescar con caché limpia.

## 9. Checklist antes de entregar

- [ ] Entregado como `icon.png` 256×256 RGBA con fondo transparente (no WebP, no SVG).
- [ ] Se lee a 64 px y la metáfora es obvia.
- [ ] 2–4 formas, sin strokes, sin degradados, sin sombras, sin opacity.
- [ ] Cruces pintados con color plano más oscuro.
- [ ] Huecos transparentes en vez de rellenos blancos.
- [ ] Funciona en tarjeta clara y oscura.
- [ ] Peso y tamaño parecidos a los iconos nativos.
- [ ] No se confunde con un icono nativo de Odoo.
- [ ] Entregados `icon.png`, `preview.png` y el XML del menú con `web_icon` apuntando al PNG.

## 10. Errores comunes

- Entregar el icono en WebP o SVG en lugar de PNG transparente.
- Exportar el PNG con fondo blanco o en modo RGB (sin canal alpha).
- Dibujar la tarjeta blanca de fondo dentro del icono (Odoo ya la pone).
- Usar texto o iniciales del módulo como icono.
- Demasiados detalles pequeños, líneas finas o iconos tipo "line icon".
- Degradados o sombras estilo Odoo 13–15.
- Colores fuera de la paleta (verdes lima, grises, neones).
- Usar `opacity` para los cruces: cambia según el fondo y se ve sucio en tema oscuro.
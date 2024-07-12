# flip-card Component

## Propiedades

### config (Object)
- `flipCardAllowed` (boolean): Indica si se permite voltear la tarjeta. (Opcional)
- `cardsPerRow` (number): Número de tarjetas por fila. (Opcional)

### data (Array)
- `textLow` (string): Texto en la parte inferior de la tarjeta. (Obligatorio)
- `textTop` (string): Texto en la parte superior de la tarjeta. (Obligatorio)
- `flipCardAllowed` (boolean): Indica si se permite voltear la tarjeta. (Opcional)
- `clickLinkAllowed` (boolean): Indica si se permite hacer clic en el enlace. (Opcional)
- `contentOnBack` (Object): Contenido para la parte trasera de la tarjeta. (Opcional)
  - `detail` (Array): Array de objetos que contienen los detalles.
    - `label_en` (string): Etiqueta en inglés. (Obligatorio)
    - `label_es` (string): Etiqueta en español. (Obligatorio)

## Ejemplos

```html
<flip-card .lang=${'es'} .config=${{ flipCardAllowed: true, cardsPerRow: 3 }} .data=${[
  { textLow: "Hola11", textTop: 'Hola', flipCardAllowed: true, clickLinkAllowed: true, contentOnBack: { detail: [{ label_en: 'Detail 1', label_es: 'Detalle 1' }] }},
  { textLow: "Hola12", textTop: 'Hola', flipCardAllowed: true, clickLinkAllowed: true },
  { textLow: "Hola13", textTop: 'Hola', flipCardAllowed: true, clickLinkAllowed: true },
  { textLow: "Hola14", textTop: 'Hola', flipCardAllowed: true, clickLinkAllowed: true }
]}></flip-card>

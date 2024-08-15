# TreeElement Component

`TreeElement` es un componente personalizado basado en `LitElement` que permite crear una estructura de árbol interactiva. Es ideal para representar datos jerárquicos.

## Propiedades

- **data**: _Array_
  - Datos que se utilizan para construir la estructura del árbol. Debe estar formateado según las especificaciones definidas en la propiedad `specification`.

- **specification**: _Object_
  - Define cómo deben interpretarse los datos del árbol. Incluye las claves necesarias para extraer la información relevante de cada nivel.

  - **key**: _String_
    - Clave utilizada para identificar cada elemento del árbol.
  
  - **label**: _String_
    - Clave utilizada para mostrar la etiqueta de cada elemento del árbol.
  
  - **children**: _String_
    - Clave que indica el nombre de la propiedad que contiene los hijos de cada nodo.
  
  - **children_definition**: _Object_
    - Especifica cómo deben manejarse los hijos en cada nivel. Anida la misma estructura (`key`, `label`, `children`).

- **label**: _String_
  - Etiqueta que se muestra cuando no hay un elemento seleccionado. El valor predeterminado es `'Select an item'`.

- **expanded**: _Boolean_
  - Controla si el componente se renderiza inicialmente expandido. El valor predeterminado es `false`.

## Ejemplo de Uso

```javascript
import { html } from 'lit';
import './tree-element.js';

html`
  <tree-element
    .data="${data}"
    .specification="${specification}"
    label="Select an item"
    expanded="false">
  </tree-element>
`;

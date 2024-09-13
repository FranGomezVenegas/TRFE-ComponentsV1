import { html } from 'lit';
import { styles } from './styles.js';

export const template = (nodeDataArray, links, lang, handleMouseDown, handleMouseMove, handleMouseUp) => html`
  <style>
    ${styles}
  </style>
  <div class="table-container">
    ${nodeDataArray.map(node => html`
      <div id="${node.key}" class="table" style="position: absolute; left: ${node.loc.split(' ')[0]}px; 
          top: ${node.loc.split(' ')[1]}px; width: ${node.width!==undefined?node.width:100}px;
          border: 2px solid black;"

     @mousedown=${(event) => handleMouseDown(event, node)}
     @mousemove=${handleMouseMove}
     @mouseup=${handleMouseUp}         
      >
        <h3 style="font-size: ${node['font-size']!==undefined?node['font-size']:10}px;">${node["label_"+lang]!==undefined?node["label_"+lang]:node.key}</h3>
        ${node.fields.map(field => html`
          <div title="${field.info}" id="${node.key}-${field.name}" class="field" style="background-color: ${field.color};">
            ${field.name}
          </div>
        `)}
      </div>
    `)}
  </div>
`;

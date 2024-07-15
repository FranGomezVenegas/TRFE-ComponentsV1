import { html } from 'lit';
import { styles } from './styles.js';

export const template = (nodeDataArray, links) => html`
  <style>
    ${styles}
  </style>
  <div class="table-container">
    ${nodeDataArray.map(node => html`
      <div class="table" style="position: absolute; left: ${node.loc.split(' ')[0]}px; top: ${node.loc.split(' ')[1]}px;">
        <h3>${node.key}</h3>
        ${node.fields.map(field => html`
          <div class="field" style="background-color: ${field.color};">
            ${field.name}: ${field.info}
          </div>
        `)}
      </div>
    `)}
    <svg class="connections" width="800" height="600">
      ${links.map(link => {
        const fromNode = nodeDataArray.find(node => node.key === link.from.key);
        const toNode = nodeDataArray.find(node => node.key === link.to.key);
        const fromFieldIndex = fromNode.fields.findIndex(field => field.name === link.from.field);
        const toFieldIndex = toNode.fields.findIndex(field => field.name === link.to.field);
        
        const fromX = parseInt(fromNode.loc.split(' ')[0]) + 100; // ajustar la posición del campo de origen
        const fromY = parseInt(fromNode.loc.split(' ')[1]) + 40 + fromFieldIndex * 30;
        const toX = parseInt(toNode.loc.split(' ')[0]); // ajustar la posición del campo de destino
        const toY = parseInt(toNode.loc.split(' ')[1]) + 40 + toFieldIndex * 30;

        return html`
          <line class="line" x1="${fromX}" y1="${fromY}" x2="${toX}" y2="${toY}" marker-end="url(#arrowhead)"></line>
        `;
      })}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>
    </svg>
  </div>
`;

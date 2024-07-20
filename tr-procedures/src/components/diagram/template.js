import { html } from 'lit';
import { until } from 'lit/directives/until.js';

export const template = (paletteVisible, nodes, links) => html`
  <div class="diagram-container">
    <div class="palette ${paletteVisible ? '' : 'hidden'}">
      <div class="node" draggable="true" @dragstart=${startDrag}>Cloud</div>
      <div class="node" draggable="true" @dragstart=${startDrag}>Firewall</div>
      <div class="node" draggable="true" @dragstart=${startDrag}>Router</div>
      <div class="node" draggable="true" @dragstart=${startDrag}>Server</div>
      <div class="node" draggable="true" @dragstart=${startDrag}>Switch</div>
      <div class="node" draggable="true" @dragstart=${startDrag}>PC</div>
    </div>
    <div class="diagram-area" @dragover=${allowDrop} @drop=${dropNode}>
      ${until(renderNodes(nodes, links))}
    </div>
  </div>
`;

function startDrag(event) {
  event.dataTransfer.setData('text/plain', event.target.textContent);
}

function allowDrop(event) {
  event.preventDefault();
}

function dropNode(event) {
  event.preventDefault();
  const type = event.dataTransfer.getData('text/plain');
  // Add logic to place the node
}

async function renderNodes(nodes, links) {
  return html`
    ${nodes.map(node => html`<div class="node" style="left: ${node.loc.x}px; top: ${node.loc.y}px;">${node.type}</div>`)}
    <svg width="100%" height="100%">
      ${links.map(link => html`<line x1="${link.from.x}" y1="${link.from.y}" x2="${link.to.x}" y2="${link.to.y}" class="link"></line>`)}
    </svg>
  `;
}

import { LitElement, html } from 'lit-element';
import { graphStyles } from './styles.js';
import { graphTemplate } from './template.js';
import * as d3 from 'd3';

class GraphFlowComponent extends LitElement {
  static get properties() {
    return {
      model: { type: Object }
    };
  }

  static get styles() {
    return [graphStyles];
  }

  firstUpdated() {
    this.createDiagram();
  }

  updated(changedProperties) {
    if (changedProperties.has('model')) {
      this.updateDiagram();
    }
  }

  createDiagram() {
    this.svg = d3.select(this.shadowRoot.getElementById('diagram'))
      .append('svg')
      .attr('width', '100%')
      .attr('height', '600px');
  }

  updateDiagram() {
    const { nodeDataArray, linkDataArray } = this.model;
    const nodes = nodeDataArray.map(d => Object.create(d));
    const links = linkDataArray.map(d => ({
      ...d,
      source: d.from,
      target: d.to
    }));

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.key))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.svg.node().getBoundingClientRect().width / 2, 300));

    this.svg.selectAll('*').remove();

    const link = this.svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('class', 'link');

    const node = this.svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter().append('g');

    node.append('circle')
      .attr('class', d => d.category ? `node ${d.category.toLowerCase()}` : 'node')
      .attr('r', d => (d.category === 'Start' || d.category === 'End') ? 20 : 15);

    node.append('text')
      .attr('class', 'label')
      .attr('dy', -30)
      .text(d => d.text);

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });
  }

  render() {
    return html`
      ${graphTemplate()}
    `;
  }
}

customElements.define('graph-flow-component', GraphFlowComponent);

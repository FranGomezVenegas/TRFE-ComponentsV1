import { LitElement, html } from 'lit';
import { template } from './template.js';

class TableDiagram extends LitElement {
  static get properties() {
    return {
      nodeDataArray: { type: Array },
      links: { type: Array },
    };
  }

  constructor() {
    super();
    this.nodeDataArray = [];
    this.links = [];
  }

  render() {
    return template(this.nodeDataArray, this.links);
  }
}

customElements.define('table-diagram', TableDiagram);

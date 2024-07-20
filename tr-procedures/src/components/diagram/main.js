import { LitElement } from 'lit';
import { styles } from './styles.js';
import { template } from './template.js';

class DiagramComponent extends LitElement {
  static get properties() {
    return {
      isEditable: { type: Boolean },
      nodes: { type: Array },
      links: { type: Array }
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.isEditable = true;
    this.nodes = [
      { key: 0, type: 'Cloud', loc: { x: 0, y: 0 }, text: 'Internet' },
      { key: 1, type: 'Firewall', loc: { x: 100, y: 0 } },
      { key: 2, type: 'Router', loc: { x: 200, y: 0 } },
      { key: 3, type: 'Server', loc: { x: 300, y: 0 } },
      { key: 4, type: 'Switch', loc: { x: 200, y: 100 } },
      { key: 5, type: 'Firewall', loc: { x: 25, y: 100 } },
      { key: 6, type: 'Router', loc: { x: 25, y: 200 } },
      { key: 7, type: 'Switch', loc: { x: 400, y: 100 } },
    ];
    this.links = [
      { from: { x: 0, y: 0 }, to: { x: 100, y: 0 } },
      { from: { x: 100, y: 0 }, to: { x: 200, y: 0 } },
    ];
  }

  render() {
    return template(this.isEditable, this.nodes, this.links);
  }
}

customElements.define('diagram-component', DiagramComponent);

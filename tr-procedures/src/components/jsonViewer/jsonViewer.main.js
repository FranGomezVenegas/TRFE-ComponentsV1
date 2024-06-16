import { LitElement } from 'lit-element';
import { template } from './jsonViewer.template.js';
import { styles } from './jsonViewer.css.js';

export class JsonViewer extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      jsonData: { type: Object }
    };
  }

  constructor() {
    super();
    this.jsonData = {};
  }

  render() {
    return template(this.jsonData);
  }
}

if (!customElements.get('unique-json-viewer')) {
  customElements.define('unique-json-viewer', JsonViewer);
}

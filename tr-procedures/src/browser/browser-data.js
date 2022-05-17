import { LitElement, html, css, nothing } from 'lit';
import '@alenaksu/json-viewer';

export class BrowserData extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`
      ${Object.keys(this.data).length ?
        html`<json-viewer>${JSON.stringify(this.data)}</json-viewer>` :
        nothing
      }
    `;
  }

  static get properties() {
    return {
      data: { type: Object }
    };
  }

  constructor() {
    super();
    this.data = {}
  }
}
customElements.define('browser-data', BrowserData);
import { LitElement, html, css } from 'lit';

export class CoreView extends LitElement {
  static get styles() {
    return css`
    :host {
      display: block;
    }
    :host([hidden]) {
      display: none;
    }
    `;
  }

  static get properties() {
    return {
      lang: { type: String },
      programList: { type: Array }
    };
  }

  render() {
    return html`On Going`
  }

  constructor() {
    super();
  }

  firstUpdated() {
  }

  updated(updates) {
    if (updates.has('programList') && this.programList && this.programList.length) {
      this.setView()
    }
  }

  setView() { }
}
customElements.define('core-view', CoreView);
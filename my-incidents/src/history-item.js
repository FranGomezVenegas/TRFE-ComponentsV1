import { LitElement, html, css } from 'lit';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';

export class HistoryItem extends LitElement {
  static get styles() {
    return css`
    mwc-list-item {
      border: 1px solid #ccc;
      margin: 10px 0;
    }
    `;
  }

  static get properties() {
    return {
      history: { type: Object }
    };
  }

  constructor() {
    super();
    this.history = {};
  }

  render() {
    return html`
    <mwc-list-item twoline>
      <span>${this.history.action_name} - ${this.history.date}</span>
      <span slot="secondary">${this.history.note}</span>
    </mwc-list-item>
    `;
  }
}
window.customElements.define('history-item', HistoryItem);
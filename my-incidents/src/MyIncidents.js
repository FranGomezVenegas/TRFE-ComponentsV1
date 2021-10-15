import { html, css, LitElement } from 'lit';

export class MyIncidents extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
    };
  }

  constructor() {
    super();
  }

  firstUpdated() {
  }

  render() {
    return html`
      <h2>My Incidents</h2>
    `;
  }
}

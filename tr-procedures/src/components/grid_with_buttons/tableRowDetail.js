import { LitElement, html, css } from 'lit';

class TableRowDetail extends LitElement {
  static get styles() {
    return css`
      .detail-row {
        display: none;
      }
      :host([opened]) .detail-row {
        display: table-row;
      }
    `;
  }

  static get properties() {
    return {
      opened: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.opened = false;
  }

  toggle() {
    this.opened = !this.opened;
  }

  render() {
    return html`
      <tr class="detail-row">
        <td colspan="100%">
        sss
          <!-- Aquí va tu contenido detallado -->
          <slot name="details"></slot>
        </td>
      </tr>
    `;
  }
}

customElements.define('table-row-detail', TableRowDetail);

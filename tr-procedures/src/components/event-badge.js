import { LitElement, html, css } from 'lit';

class EventBadge extends LitElement {
  static properties = {
    label: { type: Number }, // Número que mostrará el badge
  };

  static styles = css`
    .badge {
      position: absolute;
      top: 0px;
      right: 1px;
      color: white;
      border-radius: 50%;
      padding: 4px;
      font-size: 10px;
      line-height: 1;
      min-width: 20px;
      text-align: center;
      box-sizing: border-box;
    }
  `;

  render() {
    return html`
      <span class="badge" style="background-color: inherit;">${this.label}</span>
    `;
  }
}

customElements.define('event-badge', EventBadge);

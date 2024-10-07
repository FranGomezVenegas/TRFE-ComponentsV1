import { LitElement, html, css } from 'lit';
import '@material/web/icon/icon.js';

export class HistoryItem extends LitElement {
  static get styles() {
    return css`
      .tooltip {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-radius: 8px;
        padding: 10px;
        margin: 10px 0;
        max-width: 300px;
        font-size: 14px;
        font-family: Arial, sans-serif;
        color: #fff;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        /* Asegura que el div se reduzca en pantallas más pequeñas */
        flex: 1 1 300px;
      }
      .tooltip.negative {
        background-color: #ff5c5c; /* Rojo para NEW */
      }
      .tooltip.info {
        background-color: #1e90ff; /* Azul para NOTE */
      }
      .tooltip.positive {
        background-color: #28a745; /* Verde para CONFIRMED */
      }
      .tooltip.default {
        background-color: #6c757d; /* Gris para otros casos */
      }
      .tooltip-icon {
        margin-right: 10px;
        font-size: 20px;
      }
      h3 {
        margin: 0;
        font-size: 16px;
      }
      span {
        display: block;
        margin-top: 5px;
      }

      /* Estilos para hacer que las tarjetas sean responsivas */
      @media (max-width: 600px) {
        .tooltip {
          flex-direction: column; /* Colocar icono y texto en una columna en pantallas pequeñas */
          align-items: flex-start;
          width: 100%; /* Ocupa todo el ancho disponible */
        }
        .tooltip-icon {
          margin-bottom: 5px;
        }
      }
    `;
  }

  static get properties() {
    return {
      lang: { type: String },
      history: { type: Object }
    };
  }

  constructor() {
    super();
    this.history = {};
  }

  render() {
    return html`
      <div class="tooltip ${this.getVariant()}">
        <md-icon class="tooltip-icon">${this.getIcon()}</md-icon>
        <div>
          <h3>
            ${this.history.action_pretty_en
              ? this.history['action_pretty_' + this.lang]
              : this.history.action_name}
            <br />
            ${this.history.date}
          </h3>
          <span>${this.history.note}</span>
        </div>
      </div>
    `;
  }

  getVariant() {
    if (this.history.action_name.indexOf("NEW") > -1) {
      return "negative";
    } else if (this.history.action_name.indexOf("NOTE") > -1) {
      return "info";
    } else if (this.history.action_name.indexOf("CONFIRMED") > -1) {
      return "positive";
    } else {
      return "default";
    }
  }

  getIcon() {
    if (this.history.action_name.indexOf("NEW") > -1) {
      return "add";
    } else if (this.history.action_name.indexOf("NOTE") > -1) {
      return "note_add";
    } else {
      return "check";
    }
  }
}

window.customElements.define('history-item', HistoryItem);

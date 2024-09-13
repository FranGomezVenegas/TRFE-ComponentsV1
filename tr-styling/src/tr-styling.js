import { LitElement, html } from 'lit';
import { TrazitTheme } from './theme-trazit.js';
import { Client1Theme } from './theme-cliente1.js';

export class TrStyling extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
      theme: { type: String },
    };
  }

  constructor() {
    super();
    this.config = { theme: 'trazit' }; // Tema por defecto
  }

  updated(changedProperties) {
    if (changedProperties.has('config')) {
      this.applyConfig(this.config);
    }
  }

  applyConfig(config) {
    const theme = config.theme || 'trazit';
    let selectedTheme;
    switch (theme) {
      case 'client1':
        selectedTheme = css`
         md-filled-icon-button {
          color: green; /* Set the icon color directly */
        }
        `;
        break;
      case 'trazit':
        selectedTheme = css`
          md-filled-icon-button {
            --md-filled-icon-button-icon-color: blue;
            
          }
        `;
        break;
      default:
        console.error(`Theme '${theme}' not found. Falling back to 'trazit' theme.`);
        selectedTheme = css`
          md-filled-icon-button {
            --md-filled-icon-button-icon-color: blue;
          }
        `;
        break;
    }
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(selectedTheme.cssText);
    this.shadowRoot.adoptedStyleSheets = [styleSheet];
  }


  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('tr-styling', TrStyling);

import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import '@spectrum-web-components/accordion/sp-accordion';
import '@spectrum-web-components/accordion/sp-accordion-item';

export class PlatformNotif extends CommonCore {
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
      notifs: { type: Array }
    };
  }

  constructor() {
    super();
    this.notifs = [];
  }

  render() {
    return html`
      ${this.notifs.map(n=>
        html`
        <sp-accordion allow-multiple style="--spectrum-accordion-text-color: ${n.is_error?'red':'green'}; --spectrum-accordion-text-color-hover: ${n.is_error?'red':'green'}">
          <sp-accordion-item label=${n.message_en}>
            <div>
              <b>Request URL</b>
              <p>${n.urlParams}</p>
            </div>
          </sp-accordion-item>
        </sp-accordion>
        `
      )}
    `;
  }
}

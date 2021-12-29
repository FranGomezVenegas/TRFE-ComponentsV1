import { LitElement, html, css, nothing } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';

export class Templates extends LitElement {
  static get styles() {
    return [
      Layouts,
      css`
      `
    ];
  }

  static get properties() {
    return {
      templateName: { type: String },
      buttons: { type: Array },
      lang: { type: String },
      dataApi: { type: Object }
    };
  }

  constructor() {
    super()
    this.dataApi = {}
  }

  render() {
    return html`${this.templateName ?
      html`${this[this.templateName]()}` :
      nothing
    }`
  }

  specCode() {
    return html`
      <div class="layout vertical center">
        ${this.buttons&&this.buttons.map(b =>
          html`<mwc-icon-button 
            icon="${b.icon}" 
            title="${b.title['label_'+this.lang]}" 
            @click=${()=>this.dispatchEvent(new CustomEvent('template-event', {
              detail: b
            }))}></mwc-icon-button>`
        )}
        <h3>${this.dataApi.spec_code}</h3>
      </div>
    `
  }
}
window.customElements.define('templates-', Templates);
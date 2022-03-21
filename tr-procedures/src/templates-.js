import { LitElement, html, css, nothing } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';

export class Templates extends LitElement {
  static get styles() {
    return [
      Layouts,
      css`
      mwc-select[hidden] {
        display: none;
      }
      `
    ];
  }

  static get properties() {
    return {
      templateName: { type: String },
      buttons: { type: Array },
      lang: { type: String },
      programsList: { type: Array }
    };
  }

  constructor() {
    super()
    this.programsList = []
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
        <mwc-select outlined label="Program Name" @change=${this.programChanged} ?hidden=${this.programsList.length<2}>
          ${this.programsList.map((p,i) => 
            html`<mwc-list-item value="${p.name}" ?selected=${i==0}>${p.name}</mwc-list-item>`
          )}
        </mwc-select>
        ${this.programsList.length==1 ?
          html`<h3>${this.programsList[0].name}</h3>` : nothing
        }
      </div>
    `
  }

  programChanged(e) {
    if (this.programsList.length) {
      let program = this.programsList.filter(p => p.name == e.target.value)
      this.dispatchEvent(new CustomEvent('program-changed', {
        detail: program[0].sample_points || []
      }))
    }
  }
}
window.customElements.define('templates-', Templates);
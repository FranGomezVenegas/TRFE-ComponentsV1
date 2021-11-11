import { LitElement, html, css } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-icon';
import '@spectrum-web-components/tooltip/sp-tooltip.js';

export class AuditDialog extends LitElement {
  static get styles() {
    return [
      Layouts,
      css`
        mwc-dialog * {
          margin-bottom: 5px;
          --mdc-dialog-max-width: 100vw;
        }
        sp-tooltip {
          max-width: 100%;
          width: 100%;
          --spectrum-tooltip-info-background-color: #c2f2ff;
          color: black;
        }
        sp-tooltip.sub {
          --spectrum-tooltip-info-background-color: #30b7dc;
        }
        mwc-button.sign {
          --mdc-typography-button-text-transform: none;
          --mdc-theme-primary: #efefef;
          --mdc-theme-on-primary: #3f51b5;
        }
        div[hidden] {
          display: none;
        }
      `
    ];
  }

  static get properties() {
    return {
      audits: { type: Array }
    };
  }

  constructor() {
    super();
    this.audits = [];
  }

  firstUpdated() {
    this.updateComplete.then(() => {
      // manually backgrounding the dialog box
      // password dialog
      this.dialogSurface.style.padding = "20px";
      this.dialogSurface.style.width = "100vw";
    })
  }

  render() {
    return html`
    <mwc-dialog ?open=${this.audits.length} class="layout vertical"
      heading=""
      scrimClickAction=""
      escapeKeyAction="">
      ${this.audits.map(a=>
        html`
        <div class="layout horizontal flex center" style="margin:0;border-left:3px solid #ccc">
          <mwc-icon style="margin-left:-13px;color:#3f51b5;background:white">radio_button_checked</mwc-icon>
          <sp-tooltip open placement="right" variant="info">
            ${a.reviewed?
              html`
              <mwc-icon title="reviewed_on: ${a.reviewed_on}">grading</mwc-icon>
              `:
              html`
              <mwc-button class="sign" dense unelevated label="Sign"
                @click=${()=>this.signAudit(a.audit_id)}></mwc-button>
              `
            }
            <div class="layout horizontal flex">
              <input type="checkbox" @click=${e=>this.showItem(e,a)}>
              <div>action_name: ${a.action_name}</div>
            </div>
            <div id="audit-${a.audit_id}" hidden=true>
              *performed_on: ${a.date}
              ${a.reviewed?html`<br>*reviewed_on: ${a.reviewed_on}`:null}
              <li>audit_id: ${a.audit_id}</li>
              fields_updated: ${a.fields_updated}<br><br>
              ${a.sublevel.length&&a.sublevel[0].date?
              html`${a.sublevel.map(s=>
                html`
                  <div class="layout horizontal flex center" style="margin:5px">
                    <mwc-icon style="color:#3f51b5">radio_button_checked</mwc-icon>
                    <sp-tooltip class="sub" open placement="right" variant="info">
                      ${s.reviewed?
                        html`
                        <mwc-icon title="reviewed_on: ${s.reviewed_on}">grading</mwc-icon>
                        `:
                        html`
                        <mwc-button class="sign" dense unelevated label="Sign"
                          @click=${()=>this.signAudit(s.audit_id)}></mwc-button>
                        `
                      }
                      <div class="layout horizontal flex">
                        <input type="checkbox" checked @click=${e=>this.showSubItem(e,s)}>
                        <div>action_name: ${s.action_name}</div>
                      </div>
                      <div id="audit-${s.audit_id}">
                        *performed_on: ${s.date}<br>
                        ${s.reviewed?html`*reviewed_on: ${s.reviewed_on}<br>`:null}
                        fields_updated: ${s.fields_updated}
                      </div>
                    </sp-tooltip>
                  </div>`
              )}
              `: null}
            </div>
          </sp-tooltip>
        </div>
        `
      )}
      <mwc-button slot="secondaryAction" label="close" @click=${()=>this.audits=[]}></mwc-button>
    </mwc-dialog>
    `;
  }

  signAudit(id) {
    alert(`Audit ID: ${id}`)
    this.dispatchEvent(new CustomEvent('sign-audit', {
      detail: { audit_id: id }
    }))
  }

  get dialog() {
    return this.shadowRoot.querySelector('mwc-dialog')
  }

  get dialogSurface() {
    return this.dialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  showItem(event, item) {
    this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden = !event.target.checked
  }

  showSubItem(event, item) {
    this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden = !event.target.checked
  }
}
window.customElements.define('audit-dialog', AuditDialog);
import { LitElement, html, css } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-button';
import '@material/mwc-icon';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@trazit/tr-dialog/tr-dialog';

export class AuditDialog extends LitElement {
  static get styles() {
    return [
      Layouts,
      css`
        tr-dialog {
          --mdc-dialog-max-width: 90vw;
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
        mwc-button[hidden] {
          display: none;
        }
        div[hidden] {
          display: none;
        }
      `
    ];
  }

  static get properties() {
    return {
      audits: { type: Array },
      sampleAuditRevisionMode: { type: Boolean },
      sampleAuditChildRevisionRequired: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.audits = [];
    this.sampleAuditRevisionMode = true;
    this.sampleAuditChildRevisionRequired = true;
  }

  updated(updates) {
    if (updates.has('audits') && this.audits.length) {
      this.setPrintContent()
    }
  }

  setPrintContent() {
    this.printObj = {
      header: `Sample Audit for ${this.audits[0].sample_id}`,
      content: this.setContent()
    }
  }

  setContent() {
    let str = ''
    this.audits.forEach(a => {
      str += `<div>action_name: ${a.action_name}</div>`
      str += `*performed_on: ${a.date} by ${a.person}`
      str += `<br>*reviewed_on: ${a.reviewed ? a.reviewed_on : ''}`
      str += `<li>audit_id: ${a.audit_id}</li>`
      str += `fields_updated: ${a.fields_updated ? JSON.stringify(a.fields_updated) : ''}`
      if (a.sublevel.length&&a.sublevel[0].date) {
        str += `<div style="margin-left: 20px;">`
        a.sublevel.forEach(s=> {
          str += `<p><div>action_name: ${s.action_name}</div>`
          str += `*performed_on: ${s.date} by ${s.person}`
          str += `<br>*reviewed_on: ${s.reviewed ? s.reviewed_on : ''}`
          str += `<br>fields_updated: ${s.fields_updated ? JSON.stringify(s.fields_updated) : ''}</p>`
        })
        str += `</div>`
      }
      str += `<hr>`
    })
    return str
  }

  auditPrint() {
    var printWindow = window.open('', '', 'fullscreen=yes');
    let style = `<style type="text/css" media="print">
      @page { size: portrait; }
    </style>`
    printWindow.document.write(style);
    printWindow.document.write(this.printObj.content);
    setTimeout(()=>{
      printWindow.document.title = this.printObj.header;
      printWindow.document.close();
      printWindow.print();
    }, 100)
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
    <tr-dialog ?open=${this.audits.length} @closed=${()=>this.audits=[]} class="layout vertical"
      heading=""
      hideActions=""
      scrimClickAction="">
      ${this.countInfo()}
      <mwc-icon slot="icon1" @click=${this.auditPrint}>print</mwc-icon>
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
                @click=${()=>this.signAudit(a.audit_id)} ?hidden=${!this.sampleAuditRevisionMode}></mwc-button>
              `
            }
            <div class="layout horizontal flex">
              <input type="checkbox" @click=${e=>this.showItem(e,a)}>
              <div>action_name: ${a.action_name}</div>
            </div>
            <div>
              *performed_on: ${a.date} by ${a.person}
            </div>
            <div id="audit-${a.audit_id}" hidden=true>
              ${a.reviewed?html`<br>*reviewed_on: ${a.reviewed_on}`:null}
              <li>audit_id: ${a.audit_id}</li>
              fields_updated: ${JSON.stringify(a.fields_updated)}<br><br>
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
                          @click=${()=>this.signAudit(s.audit_id)} ?hidden=${!this.sampleAuditRevisionMode||!this.sampleAuditChildRevisionRequired}></mwc-button>
                        `
                      }
                      <div class="layout horizontal flex">
                        <input type="checkbox" checked @click=${e=>this.showSubItem(e,s)}>
                        <div>action_name: ${s.action_name}</div>
                      </div>
                      <div>
                        *performed_on: ${s.date} by ${s.person}
                      </div>
                      <div id="audit-${s.audit_id}">
                        ${s.reviewed?html`*reviewed_on: ${s.reviewed_on}<br>`:null}
                        fields_updated: ${JSON.stringify(s.fields_updated)}
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
    </tr-dialog>
    `;
  }

  signAudit(id) {
    alert(`Audit ID: ${id}`)
    this.dispatchEvent(new CustomEvent('sign-audit', {
      detail: { audit_id: id }
    }))
  }

  get dialog() {
    return this.shadowRoot.querySelector('tr-dialog')
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

  countInfo() {
    let unSigned = this.audits.filter(a => !a.reviewed)
    let str = ''
    if (unSigned.length) {
      str = html`<label slot="topLeft" style="font-size:12px;color: red">${unSigned.length}/${this.audits.length}</label>`
    } else {
      str = html`<label slot="topLeft" style="font-size:12px;color: green">${this.audits.length}/${this.audits.length}</label>`
    }
    return str
  }
}
window.customElements.define('audit-dialog', AuditDialog);
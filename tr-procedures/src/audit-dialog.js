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
          --spectrum-tooltip-info-background-color: rgb(144 215 215 / 12%);
          color: #3f51b5;
        }
        sp-tooltip.sub {
          --spectrum-tooltip-info-background-color: #c8f3ff;
        }
        mwc-icon.sign {
          cursor: pointer;
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
      lang: { type: String },
      audits: { type: Array },
      sampleAuditRevisionMode: { type: Boolean },
      sampleAuditChildRevisionRequired: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.lang = "en";
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
    let session = JSON.parse(sessionStorage.getItem("userSession"))
    let sessionDate = session.appSessionStartDate
    let sessionUser = session.header_info.first_name +" "+ session.header_info.last_name +" ("+ session.userRole +")"
    let strContent = ``
    this.audits.forEach(a => {
      strContent += `<div>action_name: ${a.action_pretty_en ? a['action_pretty_'+ this.lang] : a.action_name}</div>`
      strContent += `*performed_on: ${a.date} by ${a.person}`
      strContent += `<br>*reviewed_on: ${a.reviewed ? a.reviewed_on : ''}`
      strContent += `<li>audit_id: ${a.audit_id}</li>`
      strContent += `fields_updated: ${a.fields_updated ? Object.entries(a.fields_updated).map(([key, value]) => `<li>${key}: ${value}</li>`) : ''}`
      if (a.sublevel.length&&a.sublevel[0].date) {
        strContent += `<div style="margin-left: 20px;">`
        a.sublevel.forEach(s=> {
          strContent += `<p><div>action_name: ${s.action_pretty_en ? s['action_pretty_'+ this.lang] : s.action_name}</div>`
          strContent += `*performed_on: ${s.date} by ${s.person}`
          strContent += `<br>*reviewed_on: ${s.reviewed ? s.reviewed_on : ''}`
          strContent += `<br>fields_updated: ${s.fields_updated ? Object.entries(s.fields_updated).map(([key, value]) => `<li>${key}: ${value}</li>`) : ''}</p>`
        })
        strContent += `</div>`
      }
      strContent += `<hr>`
    })

    let str = `
      <style type="text/css">
      .page-header, .page-header-space {
        height: 75px;
        padding-top: 50px;
      }
      .page-header {
        position: fixed;
        top: 0mm;
        width: 100%;
        border-bottom: 1px solid black; /* for demo */
      }
      .page-footer, .page-footer-space {
        height: 30px;
        padding-top: 10px;
      }
      .page-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1px solid black; /* for demo */
      }
      .page {
        page-break-after: always;
      }
      @page {
        margin: 0mm 10mm 10mm;
      }
      @media print {
        thead {display: table-header-group;} 
        tfoot {display: table-footer-group;}
      }
      </style>

      <div class="page-header" style="text-align: center; font-weight: bold;">
        Sample Audit for ${this.audits[0].sample_id} on ${sessionDate}
      </div>

      <div class="page-footer">
        ${sessionUser} on ${sessionDate} 
      </div>
      <table>
        <thead>
          <tr>
            <td>
              <!--place holder for the fixed-position header-->
              <div class="page-header-space"></div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <!--*** CONTENT GOES HERE ***-->
              <div class="page">${strContent}</div>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td>
              <!--place holder for the fixed-position footer-->
              <div class="page-footer-space"></div>
            </td>
          </tr>
        </tfoot>
      </table>
    `
    return str
  }

  auditPrint() {
    var printWindow = window.open('', '', 'fullscreen=yes');
    printWindow.document.write(this.printObj.content);
    printWindow.document.title = this.printObj.header;
    printWindow.document.close();
    setTimeout(function () {
      printWindow.print();
      printWindow.close();
    }, 500);
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
      ${this.audits.map((a,i)=>
        html`
        <div class="layout horizontal flex center" style="padding:2px 0 2px 0;border-left:3px solid #ccc">
          <mwc-icon style="margin-left:-13px;color:${a.collapse?'#ccc':'#3f51b5'};background:white">radio_button_checked</mwc-icon>
          <sp-tooltip open placement="right" variant="info">
            <div class="layout horizontal flex center">
              ${a.reviewed?
                html`
                <mwc-icon title="reviewed_on: ${a.reviewed_on}">grading</mwc-icon>
                `:
                html`
                <mwc-icon class="sign" title="Sign" 
                  @click=${()=>this.signAudit(a.audit_id)} ?hidden=${!this.sampleAuditRevisionMode}>edit_note</mwc-icon>
                `
              }
              <input type="checkbox" @click=${e=>this.showItem(e,a,i)}>
              <div>action_name: <b>${a.action_pretty_en ? a['action_pretty_'+ this.lang] : a.action_name}</b></div>
            </div>
            <div>
              *performed_on: ${a.date} by ${a.person}
            </div>
            <div id="audit-${a.audit_id}" hidden=true>
              ${a.reviewed?html`<br>*reviewed_on: ${a.reviewed_on}`:null}
              <li>audit_id: ${a.audit_id}</li>
              fields_updated: ${a.fields_updated ? Object.entries(a.fields_updated).map(([key, value], i) => html`<li>${key}: ${value}</li>`) : ''}<br><br>
              ${a.sublevel.length&&a.sublevel[0].date?
              html`${a.sublevel.map((s,si)=>
                html`
                  <div class="layout horizontal flex center" style="margin:5px">
                    <mwc-icon style="color:${s.collapse?'#ccc':'#3f51b5'}">radio_button_checked</mwc-icon>
                    <sp-tooltip class="sub" open placement="right" variant="info">
                      <div class="layout horizontal flex center">
                        ${s.reviewed?
                          html`
                          <mwc-icon title="reviewed_on: ${s.reviewed_on}">grading</mwc-icon>
                          `:
                          html`
                          <mwc-icon class="sign" title="Sign" 
                            @click=${()=>this.signAudit(s.audit_id)} ?hidden=${!this.sampleAuditRevisionMode||!this.sampleAuditChildRevisionRequired}>edit_note</mwc-icon>
                          `
                        }
                        <input type="checkbox" checked @click=${e=>this.showSubItem(e,s,i,si)}>
                        <div>action_name: ${s.action_pretty_en ? s['action_pretty_'+ this.lang] : s.action_name}</div>
                      </div>
                      <div>
                        *performed_on: ${s.date} by ${s.person}
                      </div>
                      <div id="audit-${s.audit_id}">
                        ${s.reviewed?html`*reviewed_on: ${s.reviewed_on}<br>`:null}
                        fields_updated: ${s.fields_updated ? Object.entries(s.fields_updated).map(([key, value], i) => html`<li>${key}: ${value}</li>`) : ''}
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

  showItem(event, item, i) {
    this.audits[i].collapse = !this.audits[i].collapse
    this.requestUpdate()
    this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden = !event.target.checked
  }

  showSubItem(event, item, i, si) {
    this.audits[i].sublevel[si].collapse = !this.audits[i].sublevel[si].collapse
    this.requestUpdate()
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
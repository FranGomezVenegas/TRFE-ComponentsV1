import { html, css } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@trazit/tr-dialog/tr-dialog';
import './audit-dialog';

export class ProceduresCore extends CredDialog {
  static get styles() {
    return [
      Layouts,
      super.styles,
      css`
        mwc-button {
          --mdc-typography-button-text-transform: none;
          margin: 0 2px;
        }
        tr-dialog * {
          margin-bottom: 5px;
        }
        mwc-textfield[hidden] {
          display: none;
        }
        mwc-button[hidden] {
          display: none;
        }
        mwc-icon-button#prev {
          -webkit-transform:rotateY(180deg);
          -moz-transform:rotateY(180deg);
          -o-transform:rotateY(180deg);
          -ms-transform:rotateY(180deg);
        }
        div.input * {
          margin: 10px 0 5px;
        }
        mwc-icon-button[hidden] {
          display: none;
        }
      `
    ];
  }

  static get properties() {
    return {
      langConfig: { type: Object },
      selectedItem: { type: Object },
      procName: { type: String }
    };
  }

  firstUpdated() {
    super.firstUpdated()
    this.updateComplete.then(() => {
      this.adjustAnotherDialog();
    })
  }

  authorized() {
    super.authorized()
    // whether user has access into the selected proc
    let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
    this.audit.updateComplete.then(() => {
      let whichProc = procList.filter(p => p.procInstanceName == this.procName)
      if (whichProc.length) {
        this.audit.sampleAuditRevisionMode = whichProc[0].audit_sign_mode.sampleAuditRevisionMode == "DISABLE" ? false : true
        this.audit.sampleAuditChildRevisionRequired = whichProc[0].audit_sign_mode.sampleAuditChildRevisionRequired == "FALSE" ? false : true
      }
    })
    let anyAccess = procList.filter(p => p.procInstanceName == this.procName)
    if (anyAccess.length) {
      this.getSamples()
    }
  }

  render() {
    return html`
    ${this.getTitle()}
    <div class="layout horizontal center flex wrap">
      ${this.getButton()}
    </div>
    <vaadin-grid id="mainGrid" @active-item-changed=${this.selectItem} theme="row-dividers" column-reordering-allowed multi-sort>
      ${this.gridList()}
    </vaadin-grid>
    ${this.dateTemplate()}
    ${this.reasonDialog()}
    ${this.commentDialog()}
    <audit-dialog @sign-audit=${this.signAudit}></audit-dialog>
    ${this.resultDialog()}
    ${super.render()}
    `;
  }

  get audit() {
    return this.shadowRoot.querySelector("audit-dialog")
  }

  get grid() {
    return this.shadowRoot.querySelector("vaadin-grid#mainGrid")
  }

  nextRequest() {
    super.nextRequest()
    this.reqParams = {
      procInstanceName: this.procName,
      ...this.reqParams
    }
  }

  getTitle() {}
  getSamples() {}
  adjustAnotherDialog() {}
  reasonDialog() {}
  commentDialog() {}
  getButton() {}
  dateTemplate() {}
  resultDialog() {}
}

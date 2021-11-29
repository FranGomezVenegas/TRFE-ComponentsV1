import { html, css } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@trazit/tr-dialog/tr-dialog';
import './audit-dialog';
let langConfig = {};

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
      selectedItem: { type: Object },
      procName: { type: String }
    };
  }

  initLang(data) {
    langConfig = data
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
    let anyAccess = procList.filter(p => p.procInstanceName == this.procName)
    if (anyAccess.length) {
      this.getSamples()
    } else {
      alert("You don't have any access to "+ this.procName)
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

  gridList() {
    return Object.entries(langConfig.gridHeader).map(
      ([key, value], i) => html`
        ${i==0 ?
          html`<vaadin-grid-filter-column flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
          html`<vaadin-grid-filter-column resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
        }
      `
    )
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

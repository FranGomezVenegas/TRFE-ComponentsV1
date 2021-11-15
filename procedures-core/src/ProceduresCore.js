import { html, css } from 'lit';
import { CommonCore, commonLangConfig } from '@trazit/common-core';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import './audit-dialog';
export { commonLangConfig };
let langConfig = {};

export class ProceduresCore extends CommonCore {
  static get styles() {
    return [
      Layouts,
      super.styles,
      css`
        mwc-button {
          --mdc-typography-button-text-transform: none;
          margin: 0 2px;
        }
        mwc-dialog * {
          margin-bottom: 5px;
        }
        mwc-textfield[hidden] {
          display: none;
        }
        mwc-button[hidden] {
          display: none;
        }
        mwc-dialog {
          --mdc-dialog-heading-ink-color: blue;
          --mdc-typography-headline6-font-size: 35px;
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
      `
    ];
  }

  static get properties() {
    return {
      selectedItem: { type: Object },
      userName: { type: String },
      procName: { type: String },
      personel: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.userName = "";
  }

  updated(updates) {
    super.updated(updates)
    if (updates.has('personel')) {
      if ((this.personel == false || this.personel == true) && this.userName) {
        this.getSamples()
      }
    }
  }

  initLang(data) {
    langConfig = data
  }

  firstUpdated() {
    super.firstUpdated()
    this.updateComplete.then(() => {
      // manually backgrounding the dialog box
      // password dialog
      this.pwdDialogSurface.style.backgroundImage = "url(/images/abstract.jpg)";
      this.pwdDialogSurface.style.backgroundSize = "cover";
      this.pwdDialogSurface.style.backgroundRepeat = "no-repeat";
      this.pwdDialogSurface.style.textAlign = "center";
      this.pwdDialogSurface.style.padding = "20px";
      this.pwdDialog.shadowRoot.querySelector("h2#title").style.fontSize = "20px";

      // esign dialog
      this.esgDialogSurface.style.backgroundImage = "url(/images/abstract.jpg)";
      this.esgDialogSurface.style.backgroundSize = "cover";
      this.esgDialogSurface.style.backgroundRepeat = "no-repeat";
      this.esgDialogSurface.style.textAlign = "center";
      this.esgDialogSurface.style.padding = "20px";
      this.esgDialog.shadowRoot.querySelector("h2#title").style.fontSize = "20px";

      this.adjustAnotherDialog();
    })
  }

  authorized() {
    this.getSamples()
    this.userName = JSON.parse(sessionStorage.getItem("userSession")).userName
  }

  render() {
    return html`
    ${this.getTitle()}
    <div class="layout horizontal center flex wrap">
      ${this.getButton()}
    </div>
    <vaadin-grid @active-item-changed=${this.selectItem} theme="row-dividers" column-reordering-allowed multi-sort>
      ${this.gridList()}
    </vaadin-grid>
    ${this.dateTemplate()}
    ${this.reasonDialog()}
    <mwc-dialog id="pwdDialog" @opened=${()=> this.pwd.focus()} @closed=${()=>{this.attempt=0;this.pwd.value=""}}
      heading="${langConfig.pwdWindowTitle["label_" + this.lang]}"
      scrimClickAction=""
      hideActions="">
      <div class="layout horizontal flex center-justified" style="opacity:0.8">
        <div class="input layout vertical" style="width: 70%">
          <mwc-textfield id="user" label="${langConfig.userToCheck[" label_" + this.lang]}" type="text"
            .value=${this.userName} disabled></mwc-textfield>
          <mwc-textfield id="pwd" label="${langConfig.pwToCheck[" label_" + this.lang]}" type="password"
            iconTrailing="visibility" @click=${this.showPwd}
            @keypress=${e=>e.keyCode==13&&this.checkingUser()}></mwc-textfield>
        </div>
      </div>
      <div style="margin-top:30px">
        <sp-button size="xl" @click=${this.checkingUser}>
          ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
        <sp-button size="xl" variant="secondary" dialogAction="decline">
          ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
      </div>
      ${this.setAttempts()}
    </mwc-dialog>
    ${this.commentDialog()}
    <audit-dialog @sign-audit=${this.signAudit}></audit-dialog>
    <mwc-dialog id="esgDialog" @opened=${()=>this.esg.focus()} @closed=${()=>{this.attempt=0;this.esg.value=""}}
      heading="${langConfig.esignWindowTitle["label_"+this.lang]}"
      scrimClickAction=""
      hideActions="">
      <div class="layout horizontal flex center-justified" style="opacity:0.8">
        <div class="input" style="width: 70%">
          <mwc-textfield id="esg" type="password" iconTrailing="visibility" 
            @click=${this.showPwd}
            @keypress=${e=>e.keyCode==13&&this.checkingPhrase()}></mwc-textfield>
        </div>
      </div>
      <div style="margin-top:30px">
        <sp-button size="xl" @click=${this.checkingPhrase}>${commonLangConfig.confirmDialogButton["label_"+this.lang]}</sp-button>
        <sp-button size="xl" variant="secondary" dialogAction="decline">${commonLangConfig.cancelDialogButton["label_"+this.lang]}</sp-button>
      </div>
      ${this.setAttempts()}
    </mwc-dialog>
    `;
  }

  getTitle() {
    return html`
      <h1>${this.personel?
        html`${langConfig.title.personel["label_"+this.lang]}`:
        html`${langConfig.title.non["label_"+this.lang]}`}
      </h1>
    `
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
    return this.shadowRoot.querySelector("vaadin-grid")
  }

  get pwdDialog() {
    return this.shadowRoot.querySelector("mwc-dialog#pwdDialog")
  }

  get pwd() {
    return this.shadowRoot.querySelector("mwc-textfield#pwd")
  }

  get pwdDialogSurface() {
    return this.pwdDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  get esgDialog() {
    return this.shadowRoot.querySelector("mwc-dialog#esgDialog")
  }

  get esg() {
    return this.shadowRoot.querySelector("mwc-textfield#esg")
  }

  get esgDialogSurface() {
    return this.esgDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  /**
   * Checking whether user exist and verified
   */
  checkingUser() {
    this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      actionName: "TOKEN_VALIDATE_USER_CREDENTIALS",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      userToCheck: this.userName,
      passwordToCheck: this.pwd.value
    }), false).then(j => {
      if (j) {
        this.needConfirmUser()
      } else {
        if (this.attempt > 1) {
          this.pwdDialog.close()
        } else {
          this.attempt++
        }
      }
    })
  }

  getSamples() {}
  adjustAnotherDialog() {}
  reasonDialog() {}
  commentDialog() {}
  getButton() {}
  dateTemplate() {}
  needConfirmUser() {}
}

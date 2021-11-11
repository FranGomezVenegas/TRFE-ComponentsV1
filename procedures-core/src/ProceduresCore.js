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

      this.cmnDialogSurface.style.backgroundImage = "url(/images/abstract.jpg)";
      this.cmnDialogSurface.style.backgroundSize = "cover";
      this.cmnDialogSurface.style.backgroundRepeat = "no-repeat";
      this.cmnDialogSurface.style.textAlign = "center";
      this.cmnDialogSurface.style.padding = "20px";
    })
  }

  authorized() {
    this.userName = JSON.parse(sessionStorage.getItem("userSession")).userName
  }

  render() {
    return html`
    ${this.getTitle()}
    <div class="layout horizontal center flex wrap">
      ${this.getButton()}
    </div>
    <vaadin-grid @active-item-changed=${this.selectItem} theme="row-dividers" column-reordering-allowed multi-sort>
      <vaadin-grid-filter-column flex-grow="0" text-align="end" path="sample_id" header="Sample ID">
      </vaadin-grid-filter-column>
      <vaadin-grid-filter-column auto-width path="program_name" header="Project"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column flex-grow="0" path="location_name" header="Location"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column auto-width path="sampling_date" header="Sampling Date"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column auto-width path="sampling_comment" header="Sampling Comment"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column auto-width path="spec_code" header="Spec"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column auto-width path="spec_variation_name" header="Variation"></vaadin-grid-filter-column>
    </vaadin-grid>
    <mwc-dialog id="pwdDialog" @opened=${()=> this.pwd.focus()} @closed=${()=>this.attempt=0}
      heading="${langConfig.pwdWindowTitle["label_" + this.lang]}"
      scrimClickAction=""
      escapeKeyAction=""
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
    <mwc-dialog id="cmnDialog" @opened=${() => this.cmn.focus()}
      heading=""
      scrimClickAction=""
      escapeKeyAction="">
      <div class="layout horizontal flex center-justified">
        <div class="input">
          <mwc-textfield id="cmn" label="Add Comment"></mwc-textfield>
        </div>
      </div>
      <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.addComment}>
        ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
      <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
        ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
    </mwc-dialog>
    <audit-dialog @sign-audit=${this.signAudit}></audit-dialog>
    <mwc-dialog id="esgDialog" @opened=${()=>this.esg.focus()} @closed=${()=>this.attempt=0}
      heading="${langConfig.esignWindowTitle["label_"+this.lang]}"
      scrimClickAction=""
      escapeKeyAction=""
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

  getTitle() {}
  getButton() {}

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

  get cmnDialog() {
    return this.shadowRoot.querySelector("mwc-dialog#cmnDialog")
  }

  get cmn() {
    return this.shadowRoot.querySelector("mwc-textfield#cmn")
  }

  get cmnDialogSurface() {
    return this.cmnDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }
}

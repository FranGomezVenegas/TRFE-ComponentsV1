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

const langConfig = {
  "userToCheck": {
    "label_en": "User",
    "label_es": "Usuario"
  },
  "pwToCheck": {
    "label_en": "Current Password",
    "label_es": "Contraseña Actual"
  },
  "confirmUserNote": {
    "label_en": "Note",
    "label_es": "Nota"
  },
  "pwdWindowTitle": {
    "label_en": "Please confirm your credentials (user & password)",
    "label_es": "Por favor confirma tu identidad (usuario y contraseña)"
  },
  "esignWindowTitle": {
    "label_en": "Please enter your eSign",
    "label_es": "Por favor entra tu frase de Firma Electrónica"
  }
};

export class SamplesSampling extends CommonCore {
  static get styles() {
    return [
      Layouts,
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
    this.procName = "em-demo-a";
  }

  updated(updates) {
    super.updated(updates)
    if (updates.has('personel')) {
      if ((this.personel == false || this.personel == true) && this.userName) {
        this.getSamplesPending()
      }
    }
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
    this.getSamplesPending()
    this.userName = JSON.parse(sessionStorage.getItem("userSession")).userName
  }

  render() {
    return html`
      <h1>${this.personel?'Personnel ':''}Samples Pending Sampling Date</h1>
      <div class="layout horizontal center flex wrap">
      <mwc-icon-button icon="refresh" @click=${this.getSamplesPending}></mwc-icon-button>
      <mwc-icon-button title="Sample Audit" icon="rule" ?disabled=${!this.selectedItem} @click=${this.sampleAudit}>
      </mwc-icon-button>
      <mwc-icon-button title="Next" icon="next_week" ?disabled=${!this.selectedItem} @click=${this.moveToNext}>
      </mwc-icon-button>
      <mwc-icon-button title="Set Sample Date" icon="date_range" ?disabled=${!this.selectedItem} @click=${() =>
        this.pwdDialog.show()}></mwc-icon-button>
      <mwc-icon-button title="Add Sampling Comment" icon="add_comment" ?disabled=${!this.selectedItem} @click=${() => 
        this.cmnDialog.show()}></mwc-icon-button>
      <mwc-icon-button title="Remove Sampling Comment" icon="speaker_notes_off" ?disabled=${!this.selectedItem} @click=${this.removeComment}>
      </mwc-icon-button>
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
    <mwc-dialog id="pwdDialog" @opened=${()=> this.pwd.focus()}
      heading="${langConfig.pwdWindowTitle["label_" + this.lang]}"
      scrimClickAction=""
      escapeKeyAction="">
      <div class="layout horizontal flex center-justified" style="opacity:0.8">
        <div class="input layout vertical" style="width: 70%">
          <mwc-textfield id="user" label="${langConfig.userToCheck[" label_" + this.lang]}" type="text"
            .value=${this.userName} disabled></mwc-textfield>
          <mwc-textfield id="pwd" label="${langConfig.pwToCheck[" label_" + this.lang]}" type="password"
            iconTrailing="visibility" @click=${this.showPwd}></mwc-textfield>
        </div>
      </div>
      <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.checkingUser}>
        ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
      <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
        ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
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
    <mwc-dialog id="esgDialog" @opened=${()=>this.esg.focus()}
      heading="${langConfig.esignWindowTitle["label_"+this.lang]}"
      scrimClickAction=""
      escapeKeyAction="">
      <div class="layout horizontal flex center-justified" style="opacity:0.8">
        <div class="input" style="width: 70%">
          <mwc-textfield id="esg" type="password" iconTrailing="visibility" 
            @click=${this.showPwd}></mwc-textfield>
        </div>
      </div>
      <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.checkingPhrase}>${commonLangConfig.confirmDialogButton["label_"+this.lang]}</sp-button>
      <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">${commonLangConfig.cancelDialogButton["label_"+this.lang]}</sp-button>
    </mwc-dialog>
    `;
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

  get cmnDialog() {
    return this.shadowRoot.querySelector("mwc-dialog#cmnDialog")
  }

  get cmn() {
    return this.shadowRoot.querySelector("mwc-textfield#cmn")
  }

  get cmnDialogSurface() {
    return this.cmnDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  getSamplesPending() {
    this.fetchApi(this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl + '?' + new URLSearchParams({
      procInstanceName: this.procName,
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      actionName: "SAMPLES_BY_STAGE",
      sampleFieldToRetrieve: "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name",
      whereFieldsName: "current_stage|sample_config_code"+ (this.personel?'':' not') +" in*",
      whereFieldsValue: "Sampling|prog_pers_template"
    }), false, false).then(j => {
      if (j) {
        this.grid.items = j
      }
    })
  }

  /**
   * Once an incident item selected
   * @param {*} e the grid
   */
  selectItem(e) {
    // deselect old selected item if found
    if (this.selectedItem) {
      e.target.deselectItem(this.selectedItem)
      this.selectedItem = null
    }
    if (e.detail.value) {
      e.target.selectedItems = [e.detail.value]
      this.selectedItem = e.detail.value
    }
  }

  /**
   * when sign button click on the audit dialog
   * @param {*} e 
   */
  signAudit(e) {
    this.selectedAuditId = e.detail.audit_id
    this.esgDialog.show()
  }

  /**
   * Checking whether phrase matched
   */
  checkingPhrase() {
    if (this.esg.value) {
      this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
        actionName: "TOKEN_VALIDATE_ESIGN_PHRASE",
        finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
        esignPhraseToCheck: this.esg.value
      }), false, false).then(j => {
        if (j) {
          if (this.selectedAuditId) { // esign to review the selected audit id
            this.auditReview()
          } else { // when select sample id on personel
            this.pullAudit()
            this.esg.value = ""
          }
        } else {
          this.esg.value = ""
        }
      })
    }
  }

  /**
   * Request audit review api
   */
  auditReview() {
    this.fetchApi(this.config.backendUrl + this.config.ApiEnvMonitSampleUrl + '?' + new URLSearchParams({
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      dbName: this.config.dbName,
      procInstanceName: this.procName,
      actionName: "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
      sampleId: this.selectedItem.sample_id,
      auditId: this.selectedAuditId,
      esignPhraseToCheck: this.esg.value
    })).then(j => {
      console.log(j)
      this.esg.value = ""
      this.selectedAuditId = null
      this.pullAudit()
    })
  }

  sampleAudit() {
    if (this.personel) {
      this.esgDialog.show()
    } else {
      this.pullAudit()
    }
  }

  pullAudit() {
    this.fetchApi(this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl + '?' + new URLSearchParams({
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      dbName: this.config.dbName,
      procInstanceName: this.procName,
      actionName: "GET_SAMPLE_AUDIT",
      sampleId: this.selectedItem.sample_id,
      sampleAuditFieldToRetrieve: ""
    }), false, false).then(j => {
      console.log(j)
      this.audit.audits = j
      this.audit.requestUpdate()
    })
  }

  moveToNext() {
    this.fetchApi(this.config.backendUrl + this.config.ApiEnvMonitSampleUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      procInstanceName: this.procName,
      actionName: "SAMPLESTAGE_MOVETONEXT",
      sampleId: this.selectedItem.sample_id
    })).then(j => {
      console.log(j)
      if (j) {
        this.getSamplesPending()
      }
    })
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
    }), false, false).then(j => {
      if (j) {
        this.setSamplingDate()
      }
      this.pwd.value = ""
    })
  }

  setSamplingDate() {
    this.fetchApi(this.config.backendUrl + this.config.ApiEnvMonitSampleUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      procInstanceName: this.procName,
      actionName: "SETSAMPLINGDATE",
      sampleId: this.selectedItem.sample_id,
      userToCheck: this.userName,
      passwordToCheck: ""
    })).then(j => {
      console.log(j)
      if (j) {
        this.getSamplesPending()
      }
    })
  }

  addComment() {
    if (this.cmn.value) {
      this.fetchApi(this.config.backendUrl + this.config.ApiEnvMonitSampleUrl + '?' + new URLSearchParams({
        actionName: "SAMPLINGCOMMENTADD",
        finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
        sampleId: this.selectedItem.sample_id,
        sampleComment: this.cmn.value,
        dbName: this.config.dbName,
        procInstanceName: this.procName  
      })).then(j => {
        if (j) {
          this.getSamplesPending()
        }
        this.cmn.value = ""
      })
    }
  }

  removeComment() {
    this.fetchApi(this.config.backendUrl + this.config.ApiEnvMonitSampleUrl + '?' + new URLSearchParams({
      actionName: "SAMPLINGCOMMENTREMOVE",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      sampleId: this.selectedItem.sample_id,
      dbName: this.config.dbName,
      procInstanceName: this.procName  
    })).then(j => {
      if (j) {
        this.getSamplesPending()
      }
    })
  }
}

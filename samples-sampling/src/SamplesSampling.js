import { html } from 'lit';
import { ProceduresCore, commonLangConfig } from '@trazit/procedures-core';

let langConfig = {
  "title": {
    "personel": {
      "label_en": "Personnel Samples Pending Sampling Date", 
      "label_es": "Muestras de personal pendientes de la fecha de muestreo"
    },
    "non": {
      "label_en": "Samples Pending Sampling Date", 
      "label_es": "Muestras pendientes de la fecha de muestreo"
    }
  },
  "newDate":  {
    "label_en": "New Date",
    "label_es": "Nueva Fecha"
  },
  "auditReason": {
    "label_en": "Audit Reason",
    "label_es": "Motivo de la auditoría"
  },
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
  },
  "gridHeader": {
    "sample_id": {
      label_en:"Sample ID", label_es: "ID Muestra"
    },
    "program_name": {
      label_en:"Project", label_es: "Programa"
    },
    "location_name": {
      label_en:"Location", label_es: "Ubicación"
    },
    "sampling_date": {
      label_en:"sampling Date", label_es: "ID Fecha de Muestreo"
    },
    "sampling_comment": {
      label_en:"sampling Comment", label_es: "Comentario Muestreo"
    },
    "spec_code": {
      label_en:"Spec", label_es: "Especificación"
    },
    "spec_variation_name": {
      label_en:"Variation", label_es: "Variación"
    }
  }
}

export class SamplesSampling extends ProceduresCore {
  getButton() {
    return html`
      <mwc-icon-button icon="refresh" @click=${this.getSamples}></mwc-icon-button>
      <mwc-icon-button title="Sample Audit" icon="rule" ?disabled=${!this.selectedItem} @click=${this.sampleAudit}>
      </mwc-icon-button>
      <mwc-icon-button title="Set Sample Date" icon="date_range" ?disabled=${!this.selectedItem} @click=${this.setDate}></mwc-icon-button>
      <mwc-icon-button title="Change Sample Date" icon="event" ?disabled=${!this.selectedItem} @click=${()=>this.dateDialog.show()}></mwc-icon-button>
      <mwc-icon-button title="Next" icon="next_week" ?disabled=${!this.selectedItem} @click=${this.moveToNext}>
      </mwc-icon-button>
      <mwc-icon-button title="Add Sampling Comment" icon="add_comment" ?disabled=${!this.selectedItem} @click=${() => 
        this.cmnDialog.show()}></mwc-icon-button>
      <mwc-icon-button title="Remove Sampling Comment" icon="speaker_notes_off" ?disabled=${!this.selectedItem} @click=${this.removeComment}>
      </mwc-icon-button>
    `
  }

  commentDialog() {
    return html`
    <mwc-dialog id="cmnDialog" @opened=${() => this.cmn.focus()} @closed=${()=>this.cmn.value=""}
      heading=""
      scrimClickAction="">
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
    `
  }

  dateTemplate() {
    return html`
    <mwc-dialog id="dateDialog" @opened=${() => this.dateTxt.focus()} @closed=${()=>{this.dateTxt.value="";this.auditReasonTxt.value=""}}
      heading=""
      scrimClickAction="">
      <div class="layout horizontal flex center-justified">
        <div class="input layout vertical">
          <input id="dateTxt" placeholder="${langConfig.newDate["label_"+ this.lang]}" type="datetime-local">
          <mwc-textfield id="auditReason" label="${langConfig.auditReason["label_" + this.lang]}" type="text"></mwc-textfield>
        </div>
      </div>
      <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.setNewDate}>
        ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
      <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
        ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
    </mwc-dialog>
    `
  }

  get dateDialog() {
    return this.shadowRoot.querySelector("mwc-dialog#dateDialog")
  }

  get dateTxt() {
    return this.shadowRoot.querySelector("input#dateTxt")
  }

  get auditReasonTxt() {
    return this.shadowRoot.querySelector("mwc-textfield#auditReason")
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

  constructor() {
    super()
    this.procName = "em-demo-a"
    this.initLang(langConfig)
  }

  adjustAnotherDialog() {
    this.cmnDialogSurface.style.backgroundImage = "url(/images/abstract.jpg)";
    this.cmnDialogSurface.style.backgroundSize = "cover";
    this.cmnDialogSurface.style.backgroundRepeat = "no-repeat";
    this.cmnDialogSurface.style.textAlign = "center";
    this.cmnDialogSurface.style.padding = "20px";
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

  sampleAudit() {
    if (this.personel) {
      this.esgDialog.show()
    } else {
      this.pullAudit()
    }
  }

  setDate() {
    if (this.personel) {
      this.setSamplingDate()
    } else {
      this.pwdDialog.show()
    }
  }

  setNewDate() {
    if (this.dateTxt.value) {
      // tell state for new date change event
      this.newDate = true
      this.pwdDialog.show()
    }
  }

  getSamples() {
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
   * Checking whether phrase matched
   */
  checkingPhrase() {
    this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      actionName: "TOKEN_VALIDATE_ESIGN_PHRASE",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      esignPhraseToCheck: this.esg.value
    }), false).then(j => {
      if (j) {
        if (this.selectedAuditId) { // esign to review the selected audit id
          this.auditReview()
        } else { // when select sample id on personel
          this.pullAudit()
        }
      } else {
        if (this.attempt > 1) {
          this.esgDialog.close()
        } else {
          this.attempt++
        }
      }
    })
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
      this.esgDialog.close()
      this.selectedAuditId = null
      this.pullAudit()
    })
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
      this.esgDialog.close()
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
        this.getSamples()
      }
    })
  }

  needConfirmUser() {
    this.setSamplingDate()
  }

  setSamplingDate() {
    this.fetchApi(this.config.backendUrl + this.config.ApiEnvMonitSampleUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      procInstanceName: this.procName,
      actionName: this.newDate ? "CHANGESAMPLINGDATE" : "SETSAMPLINGDATE",
      sampleId: this.selectedItem.sample_id,
      userToCheck: this.userName,
      newDateTime: this.newDate ? this.dateTxt.value : "",
      passwordToCheck: this.pwd.value,
      auditReasonPhrase: this.auditReasonTxt.value
    })).then(j => {
      console.log(j)
      this.newDate = null
      this.pwdDialog.close()
      if (j) {
        this.getSamples()
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
          this.getSamples()
        }
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
        this.getSamples()
      }
    })
  }
}

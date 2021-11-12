import { html } from 'lit';
import { ProceduresCore } from '@trazit/procedures-core';

let langConfig = {
  "title": {
    "personel": {
      "label_en": "Personnel Samples Pending Plate Reading", 
      "label_es": "Muestras de personal pendientes de la lectura de placa"
    },
    "non": {
      "label_en": "Samples Pending Plate Reading", 
      "label_es": "Muestras pendientes de la lectura de placa"
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
      label_en: "Sample ID", 
      label_es: "ID Muestra"
    },
    "status": {
      label_en:"Status", label_es: "Estado"
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
    "incubation_batch": {
      label_en:"Batch incub 1", label_es: "Tanda 1a Incubacion"
    },
    "incubation_incubator": {
      label_en:"Incubator incub 1", label_es: "Incubadora 1a Incubacion"
    },
    "incubation_start": {
      label_en:"incubation 1 start", label_es: "Inicio 1a Incubacion"
    },
    "incubation_end": {
      label_en:"incubation 1 end", label_es: "Fin 1a Incubacion"
    },
    "incubation2_batch": {
      label_en:"Batch incub 2", label_es: "Tanda 2a Incubacion"
    },
    "incubation2_incubator": {
      label_en:"Incubator incub 2", label_es: "Incubadora 2a Incubacion"
    },
    "incubation2_start": {
      label_en:"incubation 2 start", label_es: "Inicio 2a Incubacion"
    },
    "incubation2_end": {
      label_en:"incubation 2 end", label_es: "Fin 2a Incubacion"
    }
  }
}

export class PlateReading extends ProceduresCore {
  getButton() {
    return html`
      <mwc-icon-button icon="refresh" @click=${this.getSamples}></mwc-icon-button>
      <mwc-icon-button id="prev" title="Previous" icon="next_week" ?disabled=${!this.selectedItem} @click=${()=>this.move("prev")}></mwc-icon-button>
      <mwc-icon-button title="Next" icon="next_week" ?disabled=${!this.selectedItem} @click=${()=>this.move("next")}></mwc-icon-button>
      <mwc-icon-button title="Sample Audit" icon="rule" ?disabled=${!this.selectedItem} @click=${this.sampleAudit}></mwc-icon-button>
      <mwc-icon-button title="Enter Result" icon="document_scanner" ?disabled=${!this.selectedItem} @click=${this.enterResult}></mwc-icon-button>
    `
  }

  constructor() {
    super()
    this.procName = "em-demo-a"
    this.initLang(langConfig)
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

  getSamples() {
    this.fetchApi(this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl + '?' + new URLSearchParams({
      procInstanceName: this.procName,
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      actionName: "SAMPLES_BY_STAGE",
      sampleFieldToRetrieve: "sample_id|program_name|location_name|current_stage|status|sampling_date|sampling_comment|incubation_batch|incubation_incubator|incubation_start|incubation_end|incubation2_batch|incubation2_incubator|incubation2_start|incubation2_end|sample_config_code",
      whereFieldsName: "current_stage|sample_config_code"+ (this.personel?'':' not') +" in*",
      whereFieldsValue: "PlateReading|prog_pers_template"
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

  /**
   * Moving the samples
   * @param {*} to next/prev, default next
   */
  move(to="next") {
    this.fetchApi(this.config.backendUrl + this.config.ApiEnvMonitSampleUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      procInstanceName: this.procName,
      actionName: to=="next" ? "SAMPLESTAGE_MOVETONEXT" : "SAMPLESTAGE_MOVETOPREVIOUS",
      sampleId: this.selectedItem.sample_id
    })).then(j => {
      console.log(j)
      if (j) {
        this.getSamples()
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
    }), false).then(j => {
      if (j) {
        this.setSamplingDate()
      } else {
        if (this.attempt > 1) {
          this.pwdDialog.close()
        } else {
          this.attempt++
        }
      }
    })
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

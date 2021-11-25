import { html } from 'lit';
import { ProceduresCore } from './ProceduresCore';
import { commonLangConfig } from '@trazit/common-core';

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
      <mwc-icon-button title="Set Sample Date" icon="date_range" ?disabled=${!this.selectedItem} @click=${this.setSamplingDate}></mwc-icon-button>
      <mwc-icon-button title="Change Sample Date" icon="event" ?disabled=${!this.selectedItem} @click=${()=>this.dateDialog.show()}></mwc-icon-button>
      <mwc-icon-button title="Next" icon="next_week" ?disabled=${!this.selectedItem} @click=${this.moveToNext}>
      </mwc-icon-button>
      <mwc-icon-button title="Add Sampling Comment" icon="add_comment" ?disabled=${!this.selectedItem} @click=${() => 
        this.cmnDialog.show()}></mwc-icon-button>
      <mwc-icon-button title="Remove Sampling Comment" icon="speaker_notes_off" ?disabled=${!this.selectedItem} @click=${this.removeComment}>
      </mwc-icon-button>
    `
  }

  dateTemplate() {
    return html`
    <tr-dialog id="dateDialog" 
      @closed=${()=>this.dateTxt.value=""}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <input id="dateTxt" placeholder="${langConfig.newDate["label_"+ this.lang]}" 
          type="datetime-local" dialogInitialFocus
          @keypress=${e=>e.keyCode==13&&this.setNewDate()}>
        <div style="margin-top:30px;text-align:center">
          <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
            ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="xl" slot="primaryAction" @click=${this.setNewDate}>
            ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
        </div>
      </div>
    </tr-dialog>
    `
  }

  commentDialog() {
    return html`
    <tr-dialog id="cmnDialog" 
      @closed=${()=>this.cmn.value=""}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <mwc-textfield id="cmn" label="Add Comment" 
          dialogInitialFocus
          @keypress=${e=>e.keyCode==13&&this.addComment()}></mwc-textfield>
        <div style="margin-top:30px;text-align:center">
          <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
            ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.addComment}>
            ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
        </div>
      </div>
    </tr-dialog>
    `
  }

  get dateDialog() {
    return this.shadowRoot.querySelector("tr-dialog#dateDialog")
  }

  get dateDialogSurface() {
    return this.dateDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  get dateTxt() {
    return this.shadowRoot.querySelector("input#dateTxt")
  }

  get cmnDialog() {
    return this.shadowRoot.querySelector("tr-dialog#cmnDialog")
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

  getSamples() {
    this.credsChecker("SAMPLES_BY_STAGE")
  }

  getSamplesReq() {
    let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl + '?' + new URLSearchParams({
      sampleFieldToRetrieve: "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name",
      whereFieldsName: "current_stage|sample_config_code"+ (this.personel?'':' not') +" in*",
      whereFieldsValue: "Sampling|prog_pers_template",
      ...this.reqParams
    })
    this.fetchApi(params, false, false).then(j => {
      if (j) {
        this.grid.items = j
      }
    })
  }

  sampleAudit() {
    this.credsChecker("GET_SAMPLE_AUDIT", this.selectedItem.sample_id)
  }

  sampleAuditReq() {
    let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params, false, false).then(j => {
      this.audit.audits = j
      this.audit.requestUpdate()
    })
  }

  /**
   * when sign button click on the audit dialog
   * @param {*} e 
   */
  signAudit(e) {
    this.selectedAuditId = e.detail.audit_id
    this.credsChecker("SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED", e.detail.audit_id)
  }

  /**
   * Request audit review api
   */
  signAuditReq() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      this.selectedAuditId = ""
      this.sampleAudit()
    })
  }

  setNewDate() {
    if (this.dateTxt.value) {
      // tell state for new date change event
      this.newDate = true
      this.setSamplingDate()
    }
  }

  setSamplingDate() {
    if (this.newDate) {
      this.credsChecker("CHANGESAMPLINGDATE", this.selectedItem.sample_id)
    } else {
      this.credsChecker("SETSAMPLINGDATE", this.selectedItem.sample_id)
    }
  }

  setSamplingDateReq() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl + '?' + new URLSearchParams({
      newDateTime: this.newDate ? this.dateTxt.value : "",
      ...this.reqParams
    })
    this.fetchApi(params).then(j => {
      this.newDate = false
      this.dateDialog.close()
      if (j) {
        this.getSamples()
      }
    })
  }

  moveToNext() {
    this.credsChecker("SAMPLESTAGE_MOVETONEXT", this.selectedItem.sample_id)
  }

  moveToNextReq() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      if (j) {
        this.getSamples()
      }
    })
  }

  addComment() {
    if (this.cmn.value) {
      this.credsChecker("SAMPLINGCOMMENTADD", this.selectedItem.sample_id)
    }
  }

  addCommentReq() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl + '?' + new URLSearchParams({
      sampleComment: this.cmn.value,
      ...this.reqParams
    })
    this.fetchApi(params).then(j => {
      this.cmnDialog.close()
      if (j) {
        this.getSamples()
      }
    })
  }

  removeComment() {
    this.credsChecker("SAMPLINGCOMMENTREMOVE", this.selectedItem.sample_id)
  }

  removeCommentReq() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      if (j) {
        this.getSamples()
      }
    })
  }

  nextRequest() {
    super.nextRequest()
    if (this.actionName == "SAMPLES_BY_STAGE") {
      this.getSamplesReq()
    } else if (this.actionName == "GET_SAMPLE_AUDIT") {
      this.sampleAuditReq()
    } else if (this.actionName == "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED") {
      this.signAuditReq()
    } else if (this.actionName == "SETSAMPLINGDATE" || this.actionName == "CHANGESAMPLINGDATE") {
      this.setSamplingDateReq()
    } else if (this.actionName == "SAMPLESTAGE_MOVETONEXT") {
      this.moveToNextReq()
    } else if (this.actionName == "SAMPLINGCOMMENTADD") {
      this.addCommentReq()
    } else if (this.actionName == "SAMPLINGCOMMENTREMOVE") {
      this.removeCommentReq()
    }
  }
}

import { html, render } from 'lit';
import { ProceduresCore } from './ProceduresCore';
import { commonLangConfig } from '@trazit/common-core';

export class SamplePendingSampling extends ProceduresCore {
  getButton() {
    return html`
      <mwc-icon-button icon="refresh" @click=${this.getSamples}></mwc-icon-button>
      <mwc-icon-button title="Sample Audit" icon="rule" ?disabled=${!this.selectedItem} @click=${this.sampleAudit}>
      </mwc-icon-button>
      <mwc-icon-button title="Set Sample Date" icon="date_range" ?disabled=${!this.selectedItem} @click=${this.setSamplingDate}></mwc-icon-button>
      <mwc-icon-button title="Change Sample Date" icon="event" ?disabled=${!this.selectedItem} @click=${()=>this.dateDialog.show()}></mwc-icon-button>
      <mwc-icon-button title="Next" icon="next_week" 
        ?disabled=${!this.selectedItem} 
        ?hidden=${this.hideNext}
        @click=${()=>this.moveToNext()}>
      </mwc-icon-button>
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
        <input id="dateTxt" placeholder="${this.langConfig.newDate&&this.langConfig.newDate["label_"+ this.lang]}" 
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

  static get properties() {
    return {
      name: { type: String },
      hideNext: { type: Boolean }
    };
  }

  constructor() {
    super()
    this.procName = "em-demo-a"
    this.hideNext = false
    this.name = "samples"
    this.langConfig = {
      "title": {
        "samples": {
          "label_en": "Samples Pending Sampling Date", 
          "label_es": "Muestras pendientes de la fecha de muestreo"
        },
        "personel": {
          "label_en": "Personnel Samples Pending Sampling Date", 
          "label_es": "Muestras de personal pendientes de la fecha de muestreo"
        },
        "sampling": {
          "label_en": "Pending Sampling", 
          "label_es": "Muestras pendiente muestreo"
        }
      },
      "newDate":  {
        "label_en": "New Date",
        "label_es": "Nueva Fecha"
      },
      "gridHeader": {
        "sample_id": {
          label_en:"Sample ID", label_es: "ID Muestra", sort: false, filter: true
        },
        "program_name": {
          label_en:"Project", label_es: "Programa", sort: false, filter: true
        },
        "location_name": {
          label_en:"Location", label_es: "Ubicación", sort: false, filter: true
        },
        "sampling_date": {
          label_en:"Sampling Date", label_es: "ID Fecha de Muestreo", sort: false, filter: true
        },
        "sampling_comment": {
          label_en:"sampling Comment", label_es: "Comentario Muestreo", sort: false, filter: true
        },
        "spec_code": {
          label_en:"Spec", label_es: "Especificación", sort: false, filter: true
        },
        "spec_variation_name": {
          label_en:"Variation", label_es: "Variación", sort: false, filter: true
        }
      }
    }
  }

  updated(updates) {
    super.updated(updates)
    if (updates.has('name') && this.userName) {
      this.getSamples()
    }
  }

  gridList() {
    return Object.entries(this.langConfig.gridHeader).map(
      ([key, value], i) => html`
        ${this.langConfig.gridHeader[key].is_icon ?
          this.iconColumn(key, value, i) :
          this.nonIconColumn(key, value, i)
        }
      `
    )
  }

  iconColumn(key, value, i) {
    return html`${i==0 ?
      html`
      <vaadin-grid-column
        header="${value['label_'+this.lang]}"
        .renderer="${this.iconRenderer}"
        text-align="center"
        flex-grow="0"
      ></vaadin-grid-column>
      ` :
      html`
      <vaadin-grid-column
        header="${value['label_'+this.lang]}"
        .renderer="${this.iconRenderer}"
        text-align="center"
        auto-width
      ></vaadin-grid-column>
      `
    }`
  }

  iconRenderer(root, _, model) {
    if (this.getRootNode().host.name) {
      const sample = model.item;
      render(
        html`<img src="/images/${this.getRootNode().host.name}_${sample.status.toLowerCase()}.png" style="width:20px">`,
        root
      );
    }
  }

  nonIconColumn(key, value, i) {
    return html`${this.langConfig.gridHeader[key].sort ?
      this.sortColumn(key, value, i) :
      this.filterColumn(key, value, i)
    }`
  }

  sortColumn(key, value, i) {
    return html`${i==0 ?
      html`<vaadin-grid-sort-column flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
      html`<vaadin-grid-sort-column resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
    }`
  }

  filterColumn(key, value, i) {
    return html`${i==0 ?
      html`<vaadin-grid-filter-column flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
      html`<vaadin-grid-filter-column resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
    }`
  }

  getTitle() {
    if (this.langConfig.title[this.name]) {
      return html`<h1>${this.langConfig.title[this.name]["label_"+this.lang]}</h1>`
    }
  }

  /**
   * Once an item selected
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
    if (this.name == "sampling") {
      this.credsChecker("SAMPLES_INPROGRESS_LIST", null, {
        sampleFieldToRetrieve: "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name",
        whereFieldsName: "sampling_date is null",
        whereFieldsValue: "-",
        addSampleAnalysis: false,
        addSampleAnalysisFieldToRetrieve: "method_name|testing_group",
        sampleAnalysisWhereFieldsName: "FQ*String",
        addSampleAnalysisResult: false
      })
    } else {
      this.credsChecker("SAMPLES_BY_STAGE", null, {
        sampleFieldToRetrieve: "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name",
        whereFieldsName: "current_stage|sample_config_code"+ (this.name=='personel'?'':' not') +" in*",
        whereFieldsValue: "Sampling|prog_pers_template"
      })
    }
  }

  getSamplesReq() {
    let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params, false, false).then(j => {
      if (j && !j.is_error) {
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
      if (j && !j.is_error) {
        this.audit.audits = j
        this.audit.requestUpdate()
      }
      this.getSamples()
    })
  }

  /**
   * when sign button click on the audit dialog
   * @param {*} e 
   */
  signAudit(e) {
    this.credsChecker("SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED", e.detail.audit_id, {
      auditId: e.detail.audit_id
    })
  }

  /**
   * Request audit review api
   */
  signAuditReq() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      this.sampleAudit()
    })
  }
  
  moveToNext(isNext=true) {
    this.credsChecker(isNext ? "SAMPLESTAGE_MOVETONEXT" : "SAMPLESTAGE_MOVETOPREVIOUS", this.selectedItem.sample_id)
  }

  moveToNextReq() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      this.getSamples()
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
      this.credsChecker("CHANGESAMPLINGDATE", this.selectedItem.sample_id, {
        newDateTime: this.dateTxt.value
      })
    } else {
      this.credsChecker("SETSAMPLINGDATE", this.selectedItem.sample_id)
    }
  }

  setSamplingDateReq() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      this.newDate = false
      this.dateDialog.close()
      this.getSamples()
    })
  }

  addComment() {
    if (this.cmn.value) {
      this.credsChecker("SAMPLINGCOMMENTADD", this.selectedItem.sample_id, {
        sampleComment: this.cmn.value
      })
    }
  }

  addCommentReq() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      this.cmnDialog.close()
      this.getSamples()
    })
  }

  removeComment() {
    this.credsChecker("SAMPLINGCOMMENTREMOVE", this.selectedItem.sample_id)
  }

  removeCommentReq() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      this.getSamples()
    })
  }

  nextRequest() {
    super.nextRequest()
    if (this.actionName == "SAMPLES_INPROGRESS_LIST" || this.actionName == "SAMPLES_BY_STAGE") {
      this.getSamplesReq()
    } else if (this.actionName == "GET_SAMPLE_AUDIT") {
      this.sampleAuditReq()
    } else if (this.actionName == "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED") {
      this.signAuditReq()
    } else if (this.actionName == "SAMPLESTAGE_MOVETOPREVIOUS" || this.actionName == "SAMPLESTAGE_MOVETONEXT") {
      this.moveToNextReq()
    } else if (this.actionName == "SETSAMPLINGDATE" || this.actionName == "CHANGESAMPLINGDATE") {
      this.setSamplingDateReq()
    } else if (this.actionName == "SAMPLINGCOMMENTADD") {
      this.addCommentReq()
    } else if (this.actionName == "SAMPLINGCOMMENTREMOVE") {
      this.removeCommentReq()
    }
  }
}

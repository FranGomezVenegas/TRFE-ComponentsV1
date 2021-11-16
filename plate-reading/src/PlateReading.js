import { html, css, render } from 'lit';
import { ProceduresCore, commonLangConfig } from '@trazit/procedures-core';

let langConfig = {
  "close": {
    "label_en": "Close", "label_es": "Cerrar"
  },
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
  },
  "resultHeader": {
    "spec_eval": {
      label_en:"spec_eval", label_es:"Eval Espec"
    },
    "result_id": {
      label_en:"Result Id", label_es:"Id Resultado"
    },
    "analysis": {
      label_en:"Analysis", label_es:"Análísis"
    },
    "param_name": {
      label_en:"Parameter", label_es:"Parámetro"
    },
    "raw_value": {
      label_en:"Value", label_es:"Valor"
    }
  }
}

export class PlateReading extends ProceduresCore {
  static get styles() {
    return [
      super.styles,
      css`
      #rslDialog {
        --mdc-dialog-min-width: 800px;
      }
      #rGrid {
        font-size: 10px;
      }
      `
    ]
  }

  getButton() {
    return html`
      <mwc-icon-button icon="refresh" @click=${this.getSamples}></mwc-icon-button>
      <mwc-icon-button id="prev" title="Previous" icon="next_week" ?disabled=${!this.selectedItem} @click=${()=>this.rsnDialog.show()}></mwc-icon-button>
      <mwc-icon-button title="Next" icon="next_week" ?disabled=${!this.selectedItem} @click=${()=>this.move("next")}></mwc-icon-button>
      <mwc-icon-button title="Sample Audit" icon="rule" ?disabled=${!this.selectedItem} @click=${this.sampleAudit}></mwc-icon-button>
      <mwc-icon-button title="Enter Result" icon="document_scanner" ?disabled=${!this.selectedItem} @click=${()=>this.rslDialog.show()}></mwc-icon-button>
    `
  }

  reasonDialog() {
    return html`
    <mwc-dialog id="rsnDialog" @opened=${() => this.rsn.focus()} @closed=${()=>this.rsn.value=""}
      heading=""
      scrimClickAction="">
      <div class="layout horizontal flex center-justified" style="opacity:0.8">
        <mwc-textfield id="rsn" label="Audit Reason"
          @keypress=${e=>{if(e.keyCode==13&&this.rsn.value)this.pwdDialog.show()}}></mwc-textfield>
      </div>
      <sp-button size="xl" slot="primaryAction">
        ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
      <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
        ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
    </mwc-dialog>
    `
  }

  resultDialog() {
    return html`
    <mwc-dialog id="rslDialog" @opening=${this.getResult}
      heading=""
      scrimClickAction="">
      <div class="layout horizontal flex center-justified">
        <vaadin-grid id="rGrid" theme="row-dividers">
          ${this.resultList()}
        </vaadin-grid>
      </div>
      <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
        ${langConfig.close["label_" + this.lang]}</sp-button>
    </mwc-dialog>
    `
  }
  resultList() {
    return Object.entries(langConfig.resultHeader).map(
      ([key, value], i) => html`
        ${i==0 ?
          html`
            <vaadin-grid-column .renderer=${this.checkRenderer}></vaadin-grid-column>
            <vaadin-grid-column path="${key}" header="${value['label_'+this.lang]}"
            .renderer=${e=>this.bulletRenderer(e, this)}></vaadin-grid-column>
          `:
          html`
          ${i==Object.entries(langConfig.resultHeader).length-1 ? 
            html`
            <vaadin-grid-column path="${key}" header="${value['label_'+this.lang]}"
              .renderer="${e=>this.fieldRenderer(e, this)}"></vaadin-grid-column>
            `: 
            html`<vaadin-grid-column path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
          }
          `
        }
      `
    )
  }

  resDetail(root) {

  }
  bulletRenderer(root) {
    render(html`${this.rGrid.items[0].spec_eval?html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>`:null}`, root)
  }
  checkRenderer(root) {
    render(html`<input type="checkbox">`, root)
  }
  fieldRenderer(root, me) {
    // i.e vaadin-grid-cell-content-23
    let slotId = root.slot.split("-")
    // result_id is on the 3 previous column
    slotId[slotId.length-1] = slotId[slotId.length-1] - 3
    slotId = slotId.join("-")
    let cell = me.shadowRoot.querySelectorAll("vaadin-grid-cell-content[slot="+ slotId +"]")
    // for something reason element query returns 2 NodeList where the one list with empty outerText
    let resultId = Array.from(cell).filter(c => c.outerText)
    resultId = Number(resultId[0].outerText)
    // find the cell model item
    let whichItem = this.rGrid.items.findIndex(g => g.result_id == resultId)
    render(html`<mwc-textfield style="--mdc-text-field-fill-color: green"
      @keydown=${e=>{if(e.keyCode==13&&e.target.value)me.enterResult(e, this.rGrid.items[whichItem].result_id)}}
      ?disabled=${this.rGrid.items[whichItem].raw_value_num?true:false}></mwc-textfield>`, root)
  }
  enterResult(e, id) {
    this.fetchApi(this.config.backendUrl + this.config.ApiEnvMonitSampleUrl + '?' + new URLSearchParams({
      procInstanceName: this.procName,
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      actionName: "ENTERRESULT",
      sampleId: this.selectedItem.sample_id,
      resultId: id,
      rawValueResult: e.target.value
    }), false, false).then(j => {
      if (j) {
        this.getResult()
      }
    })
  }
  getResult() {
    this.fetchApi(this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl + '?' + new URLSearchParams({
      procInstanceName: this.procName,
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      actionName: "GET_SAMPLE_ANALYSIS_RESULT_LIST",
      sampleId: this.selectedItem.sample_id,
      sampleAnalysisResultFieldToRetrieve: "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict",
      sortFieldsName: "test_id|result_id"
    }), false, false).then(j => {
      if (j) {
        console.log(j)
        this.rGrid.items = j
      }
    })
  }
  get rGrid() {
    return this.shadowRoot.querySelector("vaadin-grid#rGrid")
  }

  get rsnDialog() {
    return this.shadowRoot.querySelector("mwc-dialog#rsnDialog")
  }

  get rsn() {
    return this.shadowRoot.querySelector("mwc-textfield#rsn")
  }

  get rsnDialogSurface() {
    return this.rsnDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  get rslDialog() {
    return this.shadowRoot.querySelector("mwc-dialog#rslDialog")
  }

  get rslDialogSurface() {
    return this.rslDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  constructor() {
    super()
    this.procName = "em-demo-a"
    this.initLang(langConfig)
  }

  adjustAnotherDialog() {
    this.rsnDialogSurface.style.backgroundImage = "url(/images/abstract.jpg)";
    this.rsnDialogSurface.style.backgroundSize = "cover";
    this.rsnDialogSurface.style.backgroundRepeat = "no-repeat";
    this.rsnDialogSurface.style.textAlign = "center";
    this.rsnDialogSurface.style.padding = "20px";

    this.rslDialogSurface.style.padding = "20px";
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
      actionName: to=="next" ? "SAMPLESTAGE_MOVETONEXT" : "SAMPLESTAGE_MOVETOPREVIOUS",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      sampleId: this.selectedItem.sample_id,
      dbName: this.config.dbName,
      procInstanceName: this.procName,
      auditReasonPhrase: this.rsn.value,
      userToCheck: this.userName,
      passwordToCheck: this.pwd.value
    })).then(j => {
      if (j) {
        this.pwdDialog.close()
        this.rsnDialog.close()
        this.getSamples()
      }
    })
  }

  needConfirmUser() {
    this.move("prev")
  }
}

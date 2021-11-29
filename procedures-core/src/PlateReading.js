import { html, css } from 'lit';
import { SamplesSampling } from './SamplesSampling';

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

export class PlateReading extends SamplesSampling {
  static get styles() {
    return [
      super.styles,
      css`
      #rslDialog {
        --mdc-dialog-min-width: 800px;
      }
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th {
        text-align: center !important;
      }
      td, th {
        border: 1px solid #ddd;
        padding: 8px;
      }
      tr:nth-child(even){background-color: #f2f2f2;}
      tr:hover {background-color: #ddd;}
      th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #000;
        color: white;
      }
      tr[hidden] {
        display: none;
      }
      `
    ]
  }

  getButton() {
    return html`
      <mwc-icon-button icon="refresh" @click=${this.getSamples}></mwc-icon-button>
      <mwc-icon-button id="prev" title="Previous" icon="next_week" ?disabled=${!this.selectedItem} @click=${()=>this.moveToNext(false)}></mwc-icon-button>
      <mwc-icon-button title="Next" icon="next_week" ?disabled=${!this.selectedItem} @click=${()=>this.moveToNext()}></mwc-icon-button>
      <mwc-icon-button title="Sample Audit" icon="rule" ?disabled=${!this.selectedItem} @click=${this.sampleAudit}></mwc-icon-button>
      <mwc-icon-button title="Enter Result" icon="document_scanner" ?disabled=${!this.selectedItem} @click=${()=>this.rslDialog.show()}></mwc-icon-button>
    `
  }

  resultDialog() {
    return html`
    <tr-dialog id="rslDialog" @opening=${this.getResult}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        ${this.enterResults.length ?
          html`
            <table>
              <!-- table header -->
              <tr>
                <th></th>
                ${Object.entries(langConfig.resultHeader).map(([k,v])=>
                  html`<th>${v['label_'+this.lang]}</th>`
                )}
              </tr>
              <!-- table contents -->
              ${this.enterResults.map(item=>
                html`<tr><td><input type="checkbox" name="rItem" @change=${e=>this.resDetail(e, item)}></td>
                  ${Object.entries(langConfig.resultHeader).map(([k, v])=>
                    html`${k=="spec_eval" ?
                      html`<td style="text-align: center">${item[k] ?
                            html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>` : null
                          }</td>` :
                      html`${k=="raw_value" ?
                        html`<td>${item[k] ?
                              html`${item[k]}` :
                              html`<input type="text" @keypress=${e=>{if(e.keyCode==13&&e.target.value&&!isNaN(e.target.value))this.enterResult(e.target.value, item.result_id)}}>`
                            }</td>` :
                        html`<td>${item[k]}</td>`
                      }`
                    }`
                  )}
                </tr>
                `
              )}
              ${this.selectedResult?
              html`
              <tr>
                <td colspan="6" style="text-align: center">
                  <p>${this.selectedResult.spec_eval?html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>`:null}</p>
                  <p>Range Evaluation: ${this.selectedResult.spec_eval}</p>
                  <p>Range Rule: ${this.selectedResult.spec_eval_detail}</p>
                  <p>Lock Reason: ${this.selectedResult.locking_reason?this.selectedResult.locking_reason["message_"+ this.lang]:null}</p>
                </td>
              </tr>
              `:null
              }
            </table>
          ` : null
        }
      </div>
    </tr-dialog>
    `
  }

  get rslDialog() {
    return this.shadowRoot.querySelector("tr-dialog#rslDialog")
  }

  get rslDialogSurface() {
    return this.rslDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  static get properties() {
    return {
      enterResults: { type: Array },
      selectedResult: { type: Object }
    };
  }

  constructor() {
    super()
    this.enterResults = []
  }

  getSamples() {
    this.credsChecker("SAMPLES_BY_STAGE", null, {
      sampleFieldToRetrieve: "sample_id|program_name|location_name|current_stage|status|sampling_date|sampling_comment|incubation_batch|incubation_incubator|incubation_start|incubation_end|incubation2_batch|incubation2_incubator|incubation2_start|incubation2_end|sample_config_code",
      whereFieldsName: "current_stage|sample_config_code"+ (this.personel?'':' not') +" in*",
      whereFieldsValue: "PlateReading|prog_pers_template"
    })
  }

  enterResult(raw_value, id) {
    this.credsChecker("ENTERRESULT", this.selectedItem.sample_id, {
      rawValueResult: raw_value,
      resultId: id
    })
  }

  enterResultReq() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params, false, false).then(j => {
      if (j) {
        this.getResult()
      }
    })
  }

  getResult() {
    this.credsChecker("GET_SAMPLE_ANALYSIS_RESULT_LIST", this.selectedItem.sample_id, {
      sampleAnalysisResultFieldToRetrieve: "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict",
      sortFieldsName: "test_id|result_id"
    })
  }

  getResultReq() {
    let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params, false, false).then(j => {
      if (j) {
        this.enterResults = j
        this.requestUpdate()
      }
    })
  }

  nextRequest() {
    super.nextRequest()
    if (this.actionName == "SAMPLESTAGE_MOVETOPREVIOUS") {
      this.moveToNextReq()
    } else if (this.actionName == "ENTERRESULT") {
      this.enterResultReq()
    } else if (this.actionName == "GET_SAMPLE_ANALYSIS_RESULT_LIST") {
      this.getResultReq()
    }
  }

  resDetail(e, item) {
    // unchecked all unselected items
    let nlist = this.shadowRoot.querySelectorAll("input[type=checkbox]")
    nlist.forEach(n => {
      if (e.target != n) {
        n.checked = false
      }
    })
    // set the selected item
    if (e.target.checked) {
      this.selectedResult = item
    } else {
      this.selectedResult = null
    }
    this.requestUpdate()
  }
}

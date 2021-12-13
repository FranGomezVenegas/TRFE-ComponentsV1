import { html, css } from 'lit';
import { SamplePendingSampling } from './SamplePendingSampling';

export class SamplePlateReading extends SamplePendingSampling {
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
      <mwc-icon-button id="prev" title="Previous" icon="next_week"
        ?disabled=${!this.selectedItem} 
        ?hidden=${this.hidePrev}
        @click=${()=>this.moveToNext(false)}></mwc-icon-button>
      <mwc-icon-button title="Next" icon="next_week" 
        ?disabled=${!this.selectedItem} 
        ?hidden=${this.hideNext}
        @click=${this.moveToNext}></mwc-icon-button>
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
                ${Object.entries(this.langConfig.resultHeader).map(([k,v])=>
                  html`<th>${v['label_'+this.lang]}</th>`
                )}
              </tr>
              <!-- table contents -->
              ${this.enterResults.map(item=>
                html`<tr><td><input type="checkbox" name="rItem" @change=${e=>this.resDetail(e, item)}></td>
                  ${Object.entries(this.langConfig.resultHeader).map(([k, v])=>
                    html`${k=="spec_eval" ?
                      html`<td style="text-align: center">${item[k] ?
                            html`<mwc-icon style="color:${item[k]=='IN'?'green':'red'}">radio_button_checked</mwc-icon>` : 
                            html`<mwc-icon style="color:grey">radio_button_checked</mwc-icon>`
                          }</td>` :
                      html`${k=="raw_value" ?
                        html`<td>${!item[k]||item.spec_eval=="IN" ?
                              html`<input type="number" min=0.00 max=1.00 step=0.01 .value=${item[k]?item[k]:0.00}
                                @keypress=${e=>{if(e.keyCode==13&&e.target.value&&!isNaN(e.target.value))this.enterResult(e.target.value, item)}}>` :
                              html`${item[k]}`
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
                  <p>${this.selectedResult.spec_eval ?
                    html`<mwc-icon style="color:${this.selectedResult.spec_eval=='IN'?'green':'red'}">radio_button_checked</mwc-icon>` :
                    html`<mwc-icon style="color:grey">radio_button_checked</mwc-icon>`
                  }</p>
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

  get rItem() {
    return this.shadowRoot.querySelector("input[name=rItem]")
  }

  static get properties() {
    return {
      enterResults: { type: Array },
      selectedResult: { type: Object },
      hidePrev: { type: Boolean }
    };
  }

  constructor() {
    super()
    this.enterResults = []
    this.hidePrev = false
    this.langConfig = {
      "close": {
        "label_en": "Close", "label_es": "Cerrar"
      },
      "title": {
        "PlateReadingSMP": {
          "label_en": "Samples Pending Plate Reading", 
          "label_es": "Muestras pendientes de la lectura de placa"
        },
        "PlateReadingPERS": {
          "label_en": "Personnel Samples Pending Plate Reading", 
          "label_es": "Muestras de personal pendientes de la lectura de placa"
        },
        "fq": {
          "label_en": "FQ-Testing Pending Results", 
          "label_es": "FQ-Ensayos pendientes entrar resultados"
        },
        "mb": {
          "label_en": "Samples Pending Micro Testing", 
          "label_es": "Muestras pendientes de testeo Microbiológico"
        }
      },
      "gridHeader": {
        "sample_id": {
          label_en: "Sample ID", label_es: "ID Muestra", sort: false, filter: true
        },
        "status": {
          label_en:"Status", label_es: "Estado", is_icon:true
        },
        "program_name": {
          label_en:"Project", label_es: "Programa", sort: false, filter: true
        },
        "location_name": {
          label_en:"Location", label_es: "Ubicación", sort: false, filter: true
        },
        "sampling_date": {
          label_en:"sampling Date", label_es: "ID Fecha de Muestreo", sort: false, filter: true
        },
        "incubation_batch": {
          label_en:"Batch incub 1", label_es: "Tanda 1a Incubacion", sort: false, filter: true
        },
        "incubation_incubator": {
          label_en:"Incubator incub 1", label_es: "Incubadora 1a Incubacion", sort: false, filter: true
        },
        "incubation_start": {
          label_en:"incubation 1 start", label_es: "Inicio 1a Incubacion", sort: false, filter: true
        },
        "incubation_end": {
          label_en:"incubation 1 end", label_es: "Fin 1a Incubacion", sort: false, filter: true
        },
        "incubation2_batch": {
          label_en:"Batch incub 2", label_es: "Tanda 2a Incubacion", sort: false, filter: true
        },
        "incubation2_incubator": {
          label_en:"Incubator incub 2", label_es: "Incubadora 2a Incubacion", sort: false, filter: true
        },
        "incubation2_start": {
          label_en:"incubation 2 start", label_es: "Inicio 2a Incubacion", sort: false, filter: true
        },
        "incubation2_end": {
          label_en:"incubation 2 end", label_es: "Fin 2a Incubacion", sort: false, filter: true
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
  }

  getSamples() {
    this.credsChecker("SAMPLES_BY_STAGE", null, {
      sampleFieldToRetrieve: "sample_id|program_name|location_name|current_stage|status|sampling_date|sampling_comment|incubation_batch|incubation_incubator|incubation_start|incubation_end|incubation2_batch|incubation2_incubator|incubation2_start|incubation2_end|sample_config_code",
      whereFieldsName: "current_stage|sample_config_code"+ (this.samplingType=='personel'?'':' not') +" in*",
      whereFieldsValue: "PlateReading|prog_pers_template"
    })
  }

  enterResult(raw_value, item) {
    let actionName = "ENTERRESULT"
    if (item.raw_value) {
      actionName = "REENTERRESULT"
    }
    this.credsChecker(actionName, this.selectedItem.sample_id, {
      rawValueResult: raw_value,
      resultId: item.result_id
    })
  }

  enterResultReq() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params, false, false).then(j => {
      this.getResult()
    })
  }

  getResult() {
    this.selectedResult = null
    this.enterResults = []
    this.getResultCmd()
  }

  getResultCmd() {
    this.credsChecker("GET_SAMPLE_ANALYSIS_RESULT_LIST", this.selectedItem.sample_id, {
      sampleAnalysisResultFieldToRetrieve: "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict",
      sortFieldsName: "test_id|result_id"
    })
  }

  getResultReq() {
    let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params, false, false).then(j => {
      if (j && !j.is_error) {
        this.enterResults = j
        this.requestUpdate()
      }
    })
  }

  nextRequest() {
    super.nextRequest()
    if (this.actionName == "ENTERRESULT" || this.actionName == "REENTERRESULT") {
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

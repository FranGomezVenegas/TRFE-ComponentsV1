import { html, css } from 'lit';
import { PendingSampling } from './PendingSampling';

export class SampleFq extends PendingSampling {
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
      selectedResult: { type: Object },
      hidePrev: { type: Boolean }
    };
  }

  constructor() {
    super()
    this.enterResults = []
    this.hidePrev = true
    this.hideNext = true
    this.name = "fq"
    this.langConfig = {
      "close": {
        "label_en": "Close", "label_es": "Cerrar"
      },
      "title": {
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
        "status": {
          label_en:"Status", label_es: "Estado"
        },
        "sample_id": {
          label_en: "Sample ID", 
          label_es: "ID Muestra"
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
        "spec_code": {
          label_en:"Spec", label_es: "Especificación"
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
    this.credsChecker("SAMPLES_INPROGRESS_LIST", null, {
      sampleFieldToRetrieve: "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name",
      whereFieldsName: "status in-|sample_config_code not in*|sampling_date is not null",
      whereFieldsValue: "RECEIVED-INCOMPLETE-COMPLETE*String|prog_pers_template|-",
      addSampleAnalysis: this.samplingType == "fq" ? true : false,
      addSampleAnalysisFieldToRetrieve: "method_name|testing_group",
      sampleAnalysisWhereFieldsName: "testing_group|status not in",
      sampleAnalysisWhereFieldsValue: (this.samplingType == "fq" ? "FQ" : "MB") + "*String|REVIEWED*String",
      addSampleAnalysisResult: true
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

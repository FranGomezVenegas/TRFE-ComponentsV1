import { html, css, nothing } from 'lit';
import { SamplePendingSampling } from './SamplePendingSampling';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';

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
      ${this.selectedItem ?
        html`<label slot="topLeft" style="font-size:12px">Sample ID: ${this.selectedItem.sample_id}</label>` : nothing
      }
      <vaadin-grid id="erGrid" theme="row-dividers" column-reordering-allowed multi-sort
        @selected-items-changed=${e => {
          this.selectedResults = e.detail.value
        }}
        .detailsOpenedItems=${this.selectedResults}
        ${gridRowDetailsRenderer(this.detailRenderer)}>
        <vaadin-grid-selection-column header="" flex-grow="1"></vaadin-grid-selection-column>
        ${this.erList()}
      </vaadin-grid>
    </tr-dialog>
    `
  }

  get erGrid() {
    return this.shadowRoot.querySelector("vaadin-grid#erGrid")
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
      selectedResults: { type: Array },
      hidePrev: { type: Boolean }
    };
  }

  constructor() {
    super()
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

  detailRenderer(result) {
    return html`
      <div style="text-align:center;font-size:12px">
        <p>${result.spec_eval ?
          html`${result.spec_eval=='IN' ?
            html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>` :
            html`${result.is_locked ?
              html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>` :
              html`<mwc-icon style="color:yellow">radio_button_checked</mwc-icon>`
            }`
          }` :
          html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
        }</p>
        <p>Range Evaluation: ${result.spec_eval}</p>
        <p>Range Rule: ${result.spec_eval_detail}</p>
        <p>Lock Reason: ${result.is_locked?result.is_locked["message_"+ this.lang]:null}</p>
      </div>
    `
  }

  specRenderer(result) {
    if (result.spec_eval) {
      if (result.spec_eval == 'IN') {
        return html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>`
      } else {
        if (result.is_locked) {
          return html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>`
        } else {
          return html`<mwc-icon style="color:yellow">radio_button_checked</mwc-icon>`
        }
      }
    } else {
      return html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
    }
  }

  valRenderer(result) {
    if (!result.raw_value || result.spec_eval == "IN") {
      if (result.param_type == "TEXT" || result.param_type == "qualitative") {
        return html`<mwc-textfield type="text" .value=${result.raw_value}></mwc-textfield>`
      } else {
        return html`<mwc-textfield type="number" step=0.01 .value=${result.raw_value?result.raw_value:0.00}></mwc-textfield>`
      }
    } else {
      if (result.is_locked) {
        return html`
          <div style="width: 100%;height: 55px;position: relative;">
            <div style="width: 100%;text-align:center; margin: 0;position: absolute;top: 50%;-ms-transform: translateY(-50%);transform: translateY(-50%);">${result.raw_value}</div>
          </div>
        `
      } else {
        if (result.param_type == "TEXT" || result.param_type == "qualitative") {
          return html`<mwc-textfield type="text" .value=${result.raw_value}></mwc-textfield>`
        } else {
          return html`<mwc-textfield type="number" step=0.01 .value=${result.raw_value?result.raw_value:0.00}></mwc-textfield>`
        }
      }
    }
  }

  erList() {
    return Object.entries(this.langConfig.resultHeader).map(([key, value], i) => 
      html`${i==0 ?
        html`<vaadin-grid-column 
          ${columnBodyRenderer(this.specRenderer)}
          text-align="center" 
          flex-grow="0"
          path="${key}" 
          header="${value['label_'+this.lang]}"></vaadin-grid-column>`:
        html`${key=="raw_value" ?
          html`<vaadin-grid-column 
            ${columnBodyRenderer(this.valRenderer)}
            text-align="center" 
            flex-grow="1"
            path="${key}" 
            header="${value['label_'+this.lang]}"></vaadin-grid-column>` :
          html`<vaadin-grid-column resizable flex-grow=1 path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
        }`
      }`
    )
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
    this.selectedResults = []
    this.erGrid.items = []
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
        this.resetCheck = false
        this.selectedResults = []
        this.erGrid.items = j
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
}

import { html, css, nothing } from 'lit';
import { CoreView } from './core-view';
import { Alignment, Layouts } from '@collaborne/lit-flexbox-literals';
import { commonLangConfig } from '@trazit/common-core';

let langConfig = {
  "title": {
    "label_en": "Program Sampling Points", 
    "label_es": "Puntos de muestro del programa"
  },
  "fieldText": {
    "logBtn": { "label_en": "Log Sample", "label_es": "Registrar Muestra" },
    "shift": {
      "items": [
        { "keyName": "M1", "keyValue_en": "Morning 1", "keyValue_es": "Mañana 1" },
        { "keyName": "M2", "keyValue_en": "Morning 2", "keyValue_es": "Mañana 2" },
        { "keyName": "N", "keyValue_en": "Night", "keyValue_es": "Noche" }
      ],
      "label_en": "Shift", "label_es": "Turno"
    },
    "lot": {
      "items": [],
      "label_en": "Lot", "label_es": "Lote"
    }
  },
  "gridHeader": {
    "area": {
      "label_en": "Area", "label_es": "Area", "sort": false, "filter": true, "is_icon": true, "width": "10%"
    },
    "location_name": {
      "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "20%"
    },
    "spec_code": {
      "label_en": "Spec", "label_es": "Especificación", "sort": false, "filter": true, "width": "20%"
    },
    "spec_variation_name": {
      "label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true, "width": "20%"
    },
    "spec_analysis_variation": {
      "label_en": "Analysis Variation", "label_es": "Análisis de Variación", "sort": false, "filter": true, "width": "20%"
    },
    "person_ana_definition": {
      "label_en": "Person Sampling Areas", "label_es": "Areas a analizar de Personal", "sort": false, "filter": true, "width": "40%"
    }
  }
}
let actions = [
  {
    "actionName": "PROGRAMS_LIST",
    "clientMethod": "getProgramList",
    "button": {
      "icon": "refresh",
      "title": {
        "label_en": "Reload", "label_es": "Recargar"
      },
      "whenDisabled": "samplesReload"
    },
    "subAction": {
      "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
      "clientMethod": "getLots"
    }
  },
  {
    "actionName": "LOGSAMPLE",
    "clientMethod": "logSample",
    "apiParams": [
      { "query": "programName", "element": "programInput", "defaultValue": "" },
      { "query": "locationName", "element": "locationInput", "defaultValue": "" },
      { "query": "sampleTemplate", "targetValue": true },
      { "query": "sampleTemplateVersion", "targetValue": true },
      { "query": "fieldName", "defaultValue": "shift|production_lot" },
      { "query": "fieldValue", "targetValue": true },
      { "query": "numSamplesToLog", "defaultValue": 1 }
    ]
  }
]

export class SamplingPoints extends CoreView {
  static get styles() {
    return [Layouts, Alignment,
      super.styles,
      css`
      `
    ];
  }

  static get properties() {
    return {
      samplesReload: { type: Boolean },
      selectedSamples: { type: Array },
      selectedAction: { type: Object },
      targetValue: { type: Object },
      procName: { type: String },
      config: { type: Object }
    };
  }

  constructor() {
    super()
    this.selectedSamples = []
    this.selectedAction = actions[0]
  }

  tabView() {
    return html`
      <div class="layout horizontal flex wrap">
        <div class="layout flex">
          <h1>${langConfig.title["label_"+this.lang]}</h1>
          <div class="layout horizontal center flex wrap">
            ${this.getButton()}
          </div>
          <vaadin-grid theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedSamples=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedSamples}">
            ${this.gridList()}
          </vaadin-grid>
        </div>
        ${this.pointTemplate()}
      </div>
    `;
  }

  /** Point Template Dialog part */
  pointTemplate() {
    return html`
    <tr-dialog id="pointDialog" .open=${this.selectedSamples&&this.selectedSamples.length}
      @closed=${e=>{if(e.target===this.pointDialog)this.grid.activeItem=null}}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <div class="layout horizontal justified flex">
          <sp-button size="m" variant="secondary" dialogAction="accept">
            ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="m" @click=${this.setLogSample}>${langConfig.fieldText.logBtn["label_"+this.lang]}</sp-button>
        </div>
        <mwc-select label="${langConfig.fieldText.shift["label_"+this.lang]}" id="shift">
          ${langConfig.fieldText.shift.items.map((c,i) => 
            html`<mwc-list-item value="${c.keyName}" ?selected=${i==0}>${c["keyValue_"+this.lang]}</mwc-list-item>`
          )}
        </mwc-select>
        <mwc-select label="${langConfig.fieldText.lot["label_"+this.lang]}" id="lot">
          ${langConfig.fieldText.lot.items.map((c,i) => 
            html`<mwc-list-item value="${c.lot_name}" ?selected=${i==0}>${c.lot_name}</mwc-list-item>`
          )}
        </mwc-select>
        ${this.selectedSamples.length&&this.selectedSamples[0].card_info.map(f => 
          html`<mwc-textfield label=${f['label_'+this.lang]} name=${f.name} type=${f.type} value=${f.value}></mwc-textfield>`
        )}
      </div>
    </tr-dialog>
    `
  }

  get grid() {
    return this.shadowRoot.querySelector("vaadin-grid")
  }

  get pointDialog() {
    return this.shadowRoot.querySelector("tr-dialog#pointDialog")
  }

  get shiftField() {
    return this.shadowRoot.querySelector("mwc-select#shift")
  }

  get lotField() {
    return this.shadowRoot.querySelector("mwc-select#lot")
  }

  get programInput() {
    return this.shadowRoot.querySelector("mwc-textfield[name=program_name]")
  }

  get locationInput() {
    return this.shadowRoot.querySelector("mwc-textfield[name=location_name]")
  }

  setLogSample() {
    this.targetValue = {
      sampleTemplate: this.programList[0].sample_config_code,
      sampleTemplateVersion: this.programList[0].sample_config_code_version,
      fieldValue: `${this.shiftField.value}*String|${this.lotField.value}*String`
    }
    this.actionMethod(null, false, 1)
  }

  getButton() {
    return html`
      ${actions.map(action =>
        html`${action.button ?
          html`<mwc-icon-button 
            class="${action.button.class}"
            icon="${action.button.icon}" 
            title="${action.button.title['label_'+this.lang]}" 
            ?disabled=${action.button.whenDisabled == "samplesReload" ? this.samplesReload : !this.selectedSamples.length}
            @click=${()=>this.actionMethod(action)}></mwc-icon-button>` :
          nothing
        }`
      )}
    `
  }

  actionMethod(action, replace = true, actionNumIdx) {
    if (replace) {
      this.selectedAction = action
    }
    if (actionNumIdx) {
      action = actions[actionNumIdx]
      this.selectedAction = actions[actionNumIdx]
    }
    if (this.selectedSamples.length) {
      this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam(), action)
    } else {
      this.credsChecker(action.actionName, null, this.jsonParam(), action)
    }
  }

  jsonParam() {
    let jsonParam = {}
    if (this.selectedAction.apiParams) {
      this.selectedAction.apiParams.forEach(p => {
        if (p.element) {
          jsonParam[p.query] = this[p.element].value // get value from field input
        } else if (p.defaultValue) {
          jsonParam[p.query] = p.defaultValue // get value from default value (i.e incubator)
        } else if (p.targetValue) {
          jsonParam[p.query] = this.targetValue[p.query] // get value from target element passed
        } else {
          jsonParam[p.query] = p.value
        }
      })
    }
    return jsonParam
  }

  nextRequest() {
    super.nextRequest()
    this.reqParams = {
      procInstanceName: this.procName,
      ...this.reqParams
    }
    this[this.selectedAction.clientMethod]()
  }

  gridList() {
    return Object.entries(langConfig.gridHeader).map(
      ([key, value], i) => html`${this.nonIconColumn(key, value, i)}`
    )
  }

  nonIconColumn(key, value, i) {
    return html`${langConfig.gridHeader[key].sort ?
      this.sortColumn(key, value, i) :
      this.filterColumn(key, value, i)
    }`
  }

  sortColumn(key, value, i) {
    return html`${i==0 ?
      html`${langConfig.gridHeader[key].width ?
        html`<vaadin-grid-sort-column width="${langConfig.gridHeader[key].width}" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          text-align="${langConfig.gridHeader[key].align ? langConfig.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
        html`<vaadin-grid-sort-column flex-grow="0" 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          text-align="${langConfig.gridHeader[key].align ? langConfig.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
      }` :
      html`${langConfig.gridHeader[key].width ?
        html`<vaadin-grid-sort-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          width="${langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>` :
        html`<vaadin-grid-sort-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
      }`
    }`
  }

  filterColumn(key, value, i) {
    return html`${i==0 ?
      html`${langConfig.gridHeader[key].width ?
        html`<vaadin-grid-filter-column width="${langConfig.gridHeader[key].width}" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          text-align="${langConfig.gridHeader[key].align ? langConfig.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
        html`<vaadin-grid-filter-column flex-grow="0" 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          text-align="${langConfig.gridHeader[key].align ? langConfig.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
      }` :
      html`${langConfig.gridHeader[key].width ?
        html`<vaadin-grid-filter-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          width="${langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
        html`<vaadin-grid-filter-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
      }`
    }`
  }

  isConfidential(sample, key) {
    if (this.langConfig.gridHeader[key].confidential_value&&sample[key]) {
      return html`*****`
    } else {
      return html`${sample[key]}`
    }
  }

  async getProgramList() {
    this.samplesReload = true
    let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl 
      + '?' + new URLSearchParams(this.reqParams)
    await this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        if (this.selectedAction.subAction) {
          this.actionMethod(this.selectedAction.subAction)
          this.programList = j.programsList
        }
      }
    })
  }

  getLots() {
    let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      this.samplesReload = false
      this.grid.items = this.programList[0].sample_points
      langConfig.fieldText.lot.items = j
      this.requestUpdate()
    })
  }

  logSample() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(() => {
      this.selectedAction = actions[0]
      this.pointDialog.close()
    })
  }

  setView() {
    this.selectedSamples = []
    this.selectedAction = actions[0]
    this.actionMethod(this.selectedAction.subAction)
  }
}
customElements.define('sampling-points', SamplingPoints);
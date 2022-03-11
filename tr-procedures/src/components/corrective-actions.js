import { html, css, nothing } from 'lit';
import { CoreView } from './core-view';
import { Alignment, Layouts } from '@collaborne/lit-flexbox-literals';
import { commonLangConfig } from '@trazit/common-core';

let langConfig = {
  "title": {
    label_en:'Program Active Corrective Actions', 
    label_es:'Acciones correctivas aún activas del programa'
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
    "result_id": {
      "label_en": "Result", "label_es": "Resultado", "sort": false, "filter": true, "width": "10%"
    },
    "created_on": {
      "label_en": "Creation", "label_es": "Creada", "sort": true, "filter": false, "width": "15%"
    },
    "location_name": {
      "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "15%"
    },
    "method_name": {
      "label_en": "Method", "label_es": "Método", "sort": false, "filter": true, "width": "10%"
    },
    "spec_eval_detail": {
      "label_en": "Problem Detail", "label_es": "Detalle del Problema", "sort": false, "filter": true, "width": "30%"
    },
    "spec_rule_with_detail": {
      "label_en": "Spec Rule", "label_es": "Especificación", "sort": false, "filter": true, "width": "10%"
    }
  }
}
let actions = [
  {
    "actionName": "PROGRAMS_CORRECTIVE_ACTION_LIST",
    "clientMethod": "getCorrectiveList",
    "button": {
      "icon": "refresh",
      "title": {
        "label_en": "Reload", "label_es": "Recargar"
      },
      "whenDisabled": "samplesReload"
    },
    "apiParams": [
      { "query": "programName", "defaultValue": "Aguas Ejemplo" }
    ],
    "subAction": {
      "actionName": "OPEN_INVESTIGATIONS",
      "clientMethod": "openInvestigations",
      "endPoint": "/frontend/InvestigationAPIfrontend"
    }
  },
  {
    "actionName": "CORRECTIVE_ACTION_COMPLETE",
    "clientMethod": "correctiveComplete",
    "button": {
      "title": {
        "label_en": "Complete", "label_es": "Concluir"
      },
      "whenDisabled": "selectedSamples"
    },
  }
]

export class CorrectiveActions extends CoreView {
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
      config: { type: Object },
      windowOpenable: { type: String },
      sopsPassed: { type: Boolean }
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
      </div>
    `;
  }

  get grid() {
    return this.shadowRoot.querySelector("vaadin-grid")
  }
  
  getButton() {
    return html`
      ${actions.map(action =>
        html`${action.button ?
          html`${action.button.icon ?
            html`<mwc-icon-button 
              class="${action.button.class}"
              icon="${action.button.icon}" 
              title="${action.button.title['label_'+this.lang]}" 
              ?disabled=${this.btnDisabled(action)}
              @click=${()=>this.actionMethod(action)}></mwc-icon-button>` :
            html`<mwc-button dense raised 
              label="${action.button.title['label_'+this.lang]}" 
              ?disabled=${this.btnDisabled(action)}
              @click=${()=>this.actionMethod(action)}></mwc-button>`
          }` :
          nothing
        }`
      )}
    `
  }

  btnDisabled(action) {
    let d = false
    if (this.sopsPassed == false) {
      if (this.windowOpenable == "yes") {
        d = action.button.whenDisabled == "samplesReload" ? this.samplesReload : true
      }
    } else {
      d = action.button.whenDisabled == "samplesReload" ? this.samplesReload : !this.selectedSamples.length
    }
    return d
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

  getCorrectiveList() {
    this.samplesReload = true
    let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        if (this.selectedAction.subAction) {
          this.actionMethod(this.selectedAction.subAction)
          this.grid.items = j
        }
      }
    })
  }

  openInvestigations() {
    let params = this.config.backendUrl + this.selectedAction.endPoint  
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      this.samplesReload = false
      this.selectedAction = actions[0]
      this.requestUpdate()
    })
  }

  setView() {
    this.actionMethod(this.selectedAction)
  }
}
customElements.define('corrective-actions', CorrectiveActions);
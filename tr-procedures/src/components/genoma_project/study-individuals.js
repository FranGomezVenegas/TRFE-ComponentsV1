import { html, css, nothing } from 'lit';
import { CoreView } from '../core-view';
import { Alignment, Layouts } from '@collaborne/lit-flexbox-literals';
import { commonLangConfig } from '@trazit/common-core';
import { columnBodyRenderer } from 'lit-vaadin-helpers';

let langConfig = {
  "title": {
    "label_en": "Individuals", 
    "label_es": "Individuos"
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
  "gridHeaderIndiv": {
    "individual_id": {
      "label_en": "Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"
    },
    "individual_name": {
      "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"
    },
    "created_by": {
      "label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"
    },
    "created_on": {
      "label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"
    },
  },
  "gridHeaderIndivSample": {
    "sample_id": {
      "label_en": "Smp Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"
    },
    "individual_name": {
      "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"
    },
    "created_by": {
      "label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"
    },
    "created_on": {
      "label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"
    },
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
      { "query": "locationName", "element": "locationInput", "defaultValue": "" },
      { "query": "sampleTemplate", "targetValue": true },
      { "query": "sampleTemplateVersion", "targetValue": true },
      { "query": "fieldName", "defaultValue": "shift|production_lot" },
      { "query": "fieldValue", "targetValue": true },
      { "query": "numSamplesToLog", "defaultValue": 1 }
    ]
  }
]

export class StudyIndividuals extends CoreView {
  static get styles() {
    return [Layouts, Alignment,
      super.styles,
      css`
      @media (max-width: 460px) {
        vaadin-grid {
          font-size: 10px;
        }
        vaadin-grid-cell-content {
          padding: 5px;
        }
      }
      `
    ];
  }

  static get properties() {
    return {
      samplesReload: { type: Boolean },
      selectedSamples: { type: Array },
      selectedIndiv: { type: Array },
      selectedIndivSamples: { type: Array },
      selectedIndivSamplesVariable: { type: Array },
      selectedAction: { type: Object },
      targetValue: { type: Object },
      procName: { type: String },
      config: { type: Object }
    };
  }

  constructor() {
    super()
    this.selectedSamples = []
    this.selectedIndiv = []
    this.selectedIndivSamples = []
    this.selectedIndivSamplesVariable = []
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
          <vaadin-grid id="indivgrid" theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedIndiv=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedIndiv}">
            ${this.gridListIndiv()}
          </vaadin-grid>
          <vaadin-grid id="indivsmpgrid" theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedIndivSamples=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedIndivSamples}">
            ${this.gridListIndivSample()}
          </vaadin-grid>
          <vaadin-grid id="indivsmpvariablegrid" theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedIndivSamplesVariable=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedIndivSamplesVariable}">
            ${this.gridListIndivSampleVariable()}
          </vaadin-grid>
        </div>
        ${this.indivSelected()}
      </div>
    `;
  }

  /** Point Template Dialog part */
  indivSelected() {
    if (!this.selectedIndiv.length){return;}
    this.indivsmpgrid.items = this.selectedIndiv[0].study_individual_sample;
    return;
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
        ${this.selectedSamples.length&&this.selectedSamples[0].card_info.map(f => 
          html`<mwc-textfield label=${f['label_'+this.lang]} name=${f.name} type=${f.type} value=${f.value}></mwc-textfield>`
        )}
      </div>
    </tr-dialog>
    `
  }

  get indivgrid() {
    return this.shadowRoot.querySelector("vaadin-grid#indivgrid")
  }
  get indivsmpgrid() {
    return this.shadowRoot.querySelector("vaadin-grid#indivsmpgrid")
  }
  get indivsmpvariablegrid() {
    return this.shadowRoot.querySelector("vaadin-grid#indivsmpvariablegrid")
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
      sampleTemplate: this.selectedProgram.sample_config_code,
      sampleTemplateVersion: this.selectedProgram.sample_config_code_version,
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

  gridListIndiv() {
    return Object.entries(langConfig.gridHeaderIndiv).map(
      ([key, value], i) => html`${this.nonIconColumnIndiv(key, value, i)}`
    )
  }
  nonIconColumnIndiv(key, value, i) {
    return html`${langConfig.gridHeaderIndiv[key].sort ?
      this.sortColumnIndiv(key, value, i) :
      this.filterColumnIndiv(key, value, i)
    }`
  }
  sortColumnIndiv(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${langConfig.gridHeaderIndiv[key].width ?
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndiv(sample, key))}
                width="${langConfig.gridHeaderIndiv[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndiv(sample, key))}
                flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
            }` :
            html`${langConfig.gridHeaderIndiv[key].width ?
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndiv(sample, key))}
                width="${langConfig.gridHeaderIndiv[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>` :
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndiv(sample, key))}
                resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
            }`
          }
        ` :
        html`<vaadin-grid-sort-column width="65px" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidentialIndiv(sample, key))}
          text-align="${langConfig.gridHeaderIndiv[key].align ? langConfig.gridHeaderIndiv[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
      }
    `
  }
  filterColumnIndiv(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${langConfig.gridHeaderIndiv[key].width ?
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndiv(sample, key))}
                width="${langConfig.gridHeaderIndiv[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndiv(sample, key))}
                flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
            }` :
            html`${langConfig.gridHeaderIndiv[key].width ?
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndiv(sample, key))}
                width="${langConfig.gridHeaderIndiv[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndiv(sample, key))}
                resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
            }`
          }
        ` :
        html`<vaadin-grid-filter-column width="65px" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidentialIndiv(sample, key))}
          text-align="${langConfig.gridHeaderIndiv[key].align ? langConfig.gridHeaderIndiv[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
      }
    `
  }
  isConfidentialIndiv(sample, key) {
    if (langConfig.gridHeaderIndiv[key].confidential_value&&sample[key]) {
      return html`*****`
    } else {
      return html`${sample[key]}`
    }
  }  

  gridListIndivSample() {
    return Object.entries(langConfig.gridHeaderIndivSample).map(
      ([key, value], i) => html`${this.nonIconColumnIndivSample(key, value, i)}`
    )
  }
  nonIconColumnIndivSample(key, value, i) {
    return html`${langConfig.gridHeaderIndivSample[key].sort ?
      this.sortColumnIndivSample(key, value, i) :
      this.filterColumnIndivSample(key, value, i)
    }`
  }
  sortColumnIndivSample(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${langConfig.gridHeaderIndivSample[key].width ?
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSample(sample, key))}
                width="${langConfig.gridHeaderIndivSample[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSample(sample, key))}
                flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
            }` :
            html`${langConfig.gridHeaderIndivSample[key].width ?
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSample(sample, key))}
                width="${langConfig.gridHeaderIndivSample[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>` :
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSample(sample, key))}
                resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
            }`
          }
        ` :
        html`<vaadin-grid-sort-column width="65px" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidentialIndivSample(sample, key))}
          text-align="${langConfig.gridHeaderIndivSample[key].align ? langConfig.gridHeaderIndivSample[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
      }
    `
  }  
  filterColumnIndivSample(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${langConfig.gridHeaderIndivSample[key].width ?
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSample(sample, key))}
                width="${langConfig.gridHeaderIndivSample[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSample(sample, key))}
                flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
            }` :
            html`${langConfig.gridHeaderIndivSample[key].width ?
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSample(sample, key))}
                width="${langConfig.gridHeaderIndivSample[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSample(sample, key))}
                resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
            }`
          }
        ` :
        html`<vaadin-grid-filter-column width="65px" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidentialIndivSample(sample, key))}
          text-align="${langConfig.gridHeaderIndivSample[key].align ? langConfig.gridHeaderIndivSample[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
      }
    `
  }
  isConfidentialIndivSample(sample, key) {
    if (langConfig.gridHeaderIndivSample[key].confidential_value&&sample[key]) {
      return html`*****`
    } else {
      return html`${sample[key]}`
    }
  }

  gridListIndivSampleVariable() {
    return Object.entries(langConfig.gridHeaderIndivSampleVariable).map(
      ([key, value], i) => html`${this.nonIconColumnIndivSampleVariable(key, value, i)}`
    )
  }
  nonIconColumnIndivSampleVariable(key, value, i) {
    return html`${langConfig.gridHeaderIndivSampleVariable[key].sort ?
      this.sortColumnIndivSampleVariable(key, value, i) :
      this.filterColumnIndivSampleVariable(key, value, i)
    }`
  }
  sortColumnIndivSampleVariable(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${langConfig.gridHeaderIndivSampleVariable[key].width ?
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSampleVariable(sample, key))}
                width="${langConfig.gridHeaderIndivSampleVariable[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSampleVariable(sample, key))}
                flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
            }` :
            html`${langConfig.gridHeaderIndivSampleVariable[key].width ?
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSampleVariable(sample, key))}
                width="${langConfig.gridHeaderIndivSampleVariable[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>` :
              html`<vaadin-grid-sort-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSampleVariable(sample, key))}
                resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
            }`
          }
        ` :
        html`<vaadin-grid-sort-column width="65px" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidentialIndivSampleVariable(sample, key))}
          text-align="${langConfig.gridHeaderIndivSampleVariable[key].align ? langConfig.gridHeaderIndivSampleVariable[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
      }
    `
  }  
  filterColumnIndivSampleVariable(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${langConfig.gridHeaderIndivSampleVariable[key].width ?
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSampleVariable(sample, key))}
                width="${langConfig.gridHeaderIndivSampleVariable[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSampleVariable(sample, key))}
                flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
            }` :
            html`${langConfig.gridHeaderIndivSampleVariable[key].width ?
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSampleVariable(sample, key))}
                width="${langConfig.gridHeaderIndivSampleVariable[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
              html`<vaadin-grid-filter-column 
                ${columnBodyRenderer((sample)=>this.isConfidentialIndivSampleVariable(sample, key))}
                resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
            }`
          }
        ` :
        html`<vaadin-grid-filter-column width="65px" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidentialIndivSampleVariable(sample, key))}
          text-align="${langConfig.gridHeaderIndivSampleVariable[key].align ? langConfig.gridHeaderIndivSampleVariable[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
      }
    `
  }
  isConfidentialIndivSampleVariable(sample, key) {
    if (langConfig.gridHeaderIndivSampleVariable[key].confidential_value&&sample[key]) {
      return html`*****`
    } else {
      return html`${sample[key]}`
    }
  }

  async getProgramList() {
    this.samplesReload = true
    let params = this.config.backendUrl + this.config.GenomaProjectAPIqueriesUrl 
      + '?' + new URLSearchParams(this.reqParams)
    await this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        if (this.selectedAction.subAction) {
          this.actionMethod(this.selectedAction.subAction)
          this.programsList = j.programsList
        }
      }
    })
  }

  getLots() {
    let params = this.config.backendUrl + this.config.GenomaProjectAPIqueriesUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      this.samplesReload = false
      this.indivgrid.items = this.selectedProgram.study_individual
      langConfig.fieldText.lot.items = j
      this.requestUpdate()
    })
  }

  logSample() {
    this.reqParams.programName = this.selectedProgram.name
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
customElements.define('study-individuals', StudyIndividuals);
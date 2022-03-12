import { html, css, nothing } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import { ClientMethod } from './ClientMethod';
import { DialogTemplate } from './DialogTemplate';
import { columnBodyRenderer } from 'lit-vaadin-helpers';

export class TabsComposition extends ClientMethod(DialogTemplate(CredDialog)) {
  static get styles() {
    return [
      Layouts,
      super.styles,
      css`
        mwc-button {
          --mdc-typography-button-text-transform: none;
          margin: 0 2px;
        }
        tr-dialog * {
          margin-bottom: 5px;
        }
        mwc-textfield[hidden] {
          display: none;
        }
      `
    ];
  }

  static get properties() {
    return {
      model: { type: Object },
      config: { type: Object },
      procName: { type: String },
      viewName: { type: String },
      filterName: { type: String },
      langConfig: { type: Object },
      actions: { type: Array },
      samplesReload: { type: Boolean },
      selectedSamples: { type: Array },
      selectedAction: { type: Object },
      windowOpenable: { type: String },
      sopsPassed: { type: Boolean }
    };
  }

  constructor() {
    super()
    this.openInvests = []
    this.selectedInvestigations = []
    this.samplesReload = true
  }

  updated(updates) {
    super.updated(updates)
    if (updates.has('model')) {
      this.filterName = this.model.filter
      this.resetView()
    }
  }

  resetView() {
    this.grid.items = []
    this.openInvests = []
    this.selectedInvestigations = []
    this.selectedSamples = []
    this.langConfig = this.model.langConfig
    this.actions = this.model.actions
    this.selectedAction = this.model.actions[0]
    this.reload()
  }

  render() {
    return html`${this.model ? 
      html`
        <div class="layout horizontal flex wrap">
          <div class="layout flex">
            ${this.getTitle()}
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
        ${this.investigationTemplate()}
        ${this.filterName=="open" ?
          html`${this.decisionTemplate()}` : nothing
        }
      ` : 
      nothing
    }
    ${super.render()}
    `;
  }

  selectItem(e) {
    this.selectedSamples = e.detail.value ? [e.detail.value] : []
  }

  get grid() {
    return this.shadowRoot.querySelector("vaadin-grid")
  }

  reload() {
    this.resetDialogThings()
    this.selectedAction = this.model.actions[0]
    this.actionMethod(this.selectedAction)
  }

  resetDialogThings() {
    this.targetValue = {}
    this.selectedDialogAction = null
  }

  reloadDialog() {
    this.resetDialogThings()
    this.actionMethod(this.selectedAction)
  }

  actionMethod(action, replace = true) {
    if (replace) {
      this.selectedAction = action
    }
    if (action.dialogInfo) {
      if (action.dialogInfo.automatic) {
        if (this.itemId) {
          this.credsChecker(action.actionName, this.itemId, this.jsonParam(), action)
        } else {
          this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam(), action)
        }
      } else {
        this[action.dialogInfo.name].show()
      }
    } else {
      if (this.selectedSamples.length) {
        this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam(), action)
      } else {
        this.credsChecker(action.actionName, null, this.jsonParam(), action)
      }
    }
  }

  getButton() {
    return html`
      ${this.actions&&this.actions.map(action =>
        html`${action.button ?
          html`${action.button.icon ?
            html`${action.button.actionName ?
              html`<mwc-icon-button
                class="${action.button.class}"
                icon="${action.button.icon}" 
                title="${action.button.title['label_'+this.lang]}" 
                ?disabled=${this.btnDisabled(action)}
                @click=${()=>this.actionMethod(action)}></mwc-icon-button>` :
              html`<mwc-icon-button style="color:${action.button.color}" 
                class="${action.button.class}"
                icon="${action.button.icon}" 
                title="${action.button.title['label_'+this.lang]}" 
                ?disabled=${this[action.button.whenDisabled]}
                @click=${()=>this[action.clientMethod](action.filterState)}></mwc-icon-button>`
            }` :
            html`${action.button.img ?
              html`<mwc-icon-button class="${action.button.class} img" 
                title="${action.button.title['label_'+this.lang]}"
                ?disabled=${this[action.button.whenDisabled]}
                @click=${()=>this[action.clientMethod](action.filterState)}>
                  <img class="iconBtn" src="/images/${action.button.img}">
                </mwc-icon-button>` :
              html`<mwc-button dense raised 
                label="${action.button.title['label_'+this.lang]}" 
                ?disabled=${this.btnDisabled(action)}
                @click=${()=>this.actionMethod(action)}></mwc-button>`
            }`
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
      d = action.button.whenDisabled == "samplesReload" ? 
        this.samplesReload : 
        (this.selectedSamples.length ?
          action.button.disabledBEState&&this.selectedSamples[0][action.button.disabledBEState] ? 
            true :
            false
          : true)
    }
    return d
  }

  nextRequest() {
    super.nextRequest()
    this.reqParams = {
      procInstanceName: this.procName,
      ...this.reqParams
    }
    let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
    this[action.clientMethod]()
  }

  dialogAccept(selected=true) {
    if (selected) {
      this.credsChecker(this.selectedAction.actionName, this.selectedSamples[0].sample_id, this.jsonParam(this.selectedAction), this.selectedAction)
    } else {
      this.credsChecker(this.selectedAction.actionName, null, this.jsonParam(this.selectedAction), this.selectedAction)
    }
  }

  jsonParam() {
    let jsonParam = {}
    let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
    if (action.apiParams) {
      action.apiParams.forEach(p => {
        if (p.element) {
          jsonParam[p.query] = p.type == "check" ? this[p.element].checked : this[p.element].value // get value from field input
        } else if (p.defaultValue) {
          jsonParam[p.query] = p.defaultValue // get value from default value (i.e incubator)
        } else if (p.beItem) {
          jsonParam[p.query] = this.selectedSamples[0][p.beItem] // get value from selected item
        } else if (p.targetValue) {
          jsonParam[p.query] = this.targetValue[p.query] // get value from target element passed
        } else {
          jsonParam[p.query] = p.value
        }
      })
    }
    if (action.paramFilter) {
      jsonParam[action.paramFilter[this.filterName].query] = action.paramFilter[this.filterName].value
    }
    return jsonParam
  }

  setGrid(j) {
    this.selectedSamples = []
    if (j) {
      this.grid.items = j
    } else {
      this.grid.items = []
    }
  }

  gridList() {
    if (this.langConfig && JSON.stringify(this.langConfig) == JSON.stringify(this.model.langConfig)) {
      return Object.entries(this.langConfig.gridHeader).map(
        ([key, value], i) => html`
          ${this.nonIconColumn(key, value, i)}
        `
      )
    }
  }

  nonIconColumn(key, value, i) {
    return html`${this.langConfig.gridHeader[key].sort ?
      this.sortColumn(key, value, i) :
      html`${this.langConfig.gridHeader[key].filter ? 
        html`${this.filterColumn(key, value, i)}` : 
        html`${this.commonColumn(key, value, i)}`
      }`
    }`
  }

  sortColumn(key, value, i) {
    return html`${i==0 ?
      html`${this.langConfig.gridHeader[key].width ?
        html`<vaadin-grid-sort-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          width="${this.langConfig.gridHeader[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
        html`<vaadin-grid-sort-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
      }` :
      html`${this.langConfig.gridHeader[key].width ?
        html`<vaadin-grid-sort-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          width="${this.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>` :
        html`<vaadin-grid-sort-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
      }`
    }`
  }

  filterColumn(key, value, i) {
    return html`${i==0 ?
      html`${this.langConfig.gridHeader[key].width ?
        html`<vaadin-grid-filter-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          width="${this.langConfig.gridHeader[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
        html`<vaadin-grid-filter-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
      }` :
      html`${this.langConfig.gridHeader[key].width ?
        html`<vaadin-grid-filter-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          width="${this.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
        html`<vaadin-grid-filter-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
      }`
    }`
  }

  commonColumn(key, value, i) {
    return html`${i==0 ?
      html`${this.langConfig.gridHeader[key].width ?
        html`<vaadin-grid-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          width="${this.langConfig.gridHeader[key].width}" resizable text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`:
        html`<vaadin-grid-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
      }` :
      html`${this.langConfig.gridHeader[key].width ?
        html`<vaadin-grid-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          width="${this.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`:
        html`<vaadin-grid-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
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

  getTitle() {
    if (this.langConfig&&this.langConfig.title[this.filterName]) {
      return html`<h1>${this.langConfig.title[this.filterName]["label_"+this.lang]}</h1>`
    }
  }
}
window.customElements.define('tabs-composition', TabsComposition);
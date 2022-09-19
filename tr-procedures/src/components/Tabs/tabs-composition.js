import { html, css, nothing } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts } from '@collaborne/lit-flexbox-literals';
//import { ClientMethod } from './ClientMethod';
//import { DialogTemplate } from './DialogTemplate';
import { columnBodyRenderer } from 'lit-vaadin-helpers';

import {ButtonsFunctions} from '../Buttons/ButtonsFunctions';
import {GridFunctions} from '../grid_with_buttons/GridFunctions';

//import {TrazitInvestigationsDialog} from './components/GenericDialogs/TrazitInvestigationsDialog';
//TrazitInvestigationsDialog
export class TabsComposition extends ButtonsFunctions(GridFunctions(((CredDialog)))) {
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
      viewModelFromProcModel: { type: Object },
      config: { type: Object },
      procInstanceName: { type: String },
      viewName: { type: String },
      filterName: { type: String },
      langConfig: { type: Object },
      actions: { type: Array },
      samplesReload: { type: Boolean },
      selectedItems: { type: Array },      
      windowOpenable: { type: String },
      sopsPassed: { type: Boolean },
      ready:{type: Boolean},
      gridItems: { type: Array },
    };
  }

  constructor() {
    super()
    this.viewModelFromProcModel={}
    this.openInvests = []
    this.selectedInvestigations = []
    this.samplesReload = true
    this.ready=false;
    this.selectedItems = []
    this.gridItems=[]
  }

  // updated(updates) {
  //   super.updated(updates)
  //   if (updates.has('viewModelFromProcModel')) {
  //     this.filterName = this.viewModelFromProcModel.filter
  //     this.resetView()
  //   }
  // }

  resetView() {
    this.grid.items = []
    this.openInvests = []
    this.selectedInvestigations = []
    this.selectedItems = []
    this.langConfig = this.viewModelFromProcModel.langConfig
    this.actions = this.viewModelFromProcModel.actions
    this.reload()
  }

  render() {
    return html`${this.viewModelFromProcModel ? 
      html`
        <div class="layout horizontal flex wrap">
          <div class="layout flex">
            ${this.getTitle()}
            <div class="layout horizontal center flex wrap">
              ${this.getButton()}
            </div>
            <vaadin-grid id="mainGrid" theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedItems=e.detail.value ? [e.detail.value] : []}
            .items=${this.gridItems} .selectedItems="${this.selectedItems}">
            ${this.gridList(this.viewModelFromProcModel)}
          </vaadin-grid>
          </div>
        </div>
        <div style="display:none">
        ${this.ready===false ? html`${this.GetViewData()}`: nothing}            
        </div>
      ` : 
      nothing
    }
    ${super.render()}
    `;
  }

  // ${this.investigationTemplate()}
  // ${this.filterName=="open" ?
  //   html`${this.decisionTemplate()}` : nothing
  // }

  get grid() {return this.shadowRoot.querySelector("vaadin-grid#mainGrid")}

  reload() {
    this.resetDialogThings()
    this.GetViewData()
  }

  resetDialogThings() {
    this.targetValue = {}
    this.selectedDialogAction = null
  }

  reloadDialog() {
    this.resetDialogThings()
    this.actionMethod(this.selectedAction)
  }

  xselectItem(e) {
    this.selectedItems = e.detail.value ? [e.detail.value] : []
  }

  xactionMethod(action, replace = true) {
    if (replace) {
      this.selectedAction = action
    }
    if (action.dialogInfo) {
      if (action.dialogInfo.automatic) {
        if (this.itemId) {
          this.credsChecker(action.actionName, this.itemId, this.jsonParam(), action)
        } else {
          this.credsChecker(action.actionName, this.selectedItems[0].sample_id, this.jsonParam(), action)
        }
      } else {
        this[action.dialogInfo.name].show()
      }
    } else {
      if (this.selectedItems.length) {
        this.credsChecker(action.actionName, this.selectedItems[0].sample_id, this.jsonParam(), action)
      } else {
        this.credsChecker(action.actionName, null, this.jsonParam(), action)
      }
    }
  }

  xgetButton() {
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

  xbtnDisabled(action) {
    let d = false
    if (this.sopsPassed == false) {
      if (this.windowOpenable == "yes") {
        d = action.button.whenDisabled == "samplesReload" ? this.samplesReload : true
      }
    } else {
      d = action.button.whenDisabled == "samplesReload" ? 
        this.samplesReload : 
        (this.selectedItems.length ?
          action.button.disabledBEState&&this.selectedItems[0][action.button.disabledBEState] ? 
            true :
            false
          : true)
    }
    return d
  }

  xnextRequest() {
    super.nextRequest()
    this.reqParams = {
      procInstanceName: this.procInstanceName,
      ...this.reqParams
    }
    let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
    this[action.clientMethod]()
  }

  xdialogAccept(selected=true) {
    if (selected) {
      this.credsChecker(this.selectedAction.actionName, this.selectedItems[0].sample_id, this.jsonParam(this.selectedAction), this.selectedAction)
    } else {
      this.credsChecker(this.selectedAction.actionName, null, this.jsonParam(this.selectedAction), this.selectedAction)
    }
  }

  xjsonParam() {
    let jsonParam = {}
    let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
    if (action.apiParams) {
      action.apiParams.forEach(p => {
        if (p.element) {
          jsonParam[p.argumentName] = p.type == "check" ? this[p.element].checked : this[p.element].value // get value from field input
        } else if (p.defaultValue) {
          jsonParam[p.argumentName] = p.defaultValue // get value from default value (i.e incubator)
        } else if (p.beItem) {
          jsonParam[p.argumentName] = this.selectedItems[0][p.beItem] // get value from selected item
        } else if (p.targetValue) {
          jsonParam[p.argumentName] = this.targetValue[p.argumentName] // get value from target element passed
        } else {
          jsonParam[p.argumentName] = p.value
        }
      })
    }
    if (action.paramFilter) {
      jsonParam[action.paramFilter[this.filterName].argumentName] = action.paramFilter[this.filterName].value
    }
    return jsonParam
  }

  xsetGrid(j) {
    'setGrid tab compositions'
    this.selectedItems = []
    if (j) {
      this.grid.items = j
    } else {
      this.grid.items = []
    }
  }

  xgridList() {
    if (this.langConfig && JSON.stringify(this.langConfig) == JSON.stringify(this.viewModelFromProcModel.langConfig)) {
      return Object.entries(this.langConfig.gridHeader).map(
        ([key, value], i) => html`
          ${this.nonIconColumn(key, value, i)}
        `
      )
    }
  }

  xnonIconColumn(key, value, i) {
    return html`${this.langConfig.gridHeader[key].sort ?
      this.sortColumn(key, value, i) :
      html`${this.langConfig.gridHeader[key].filter ? 
        html`${this.filterColumn(key, value, i)}` : 
        html`${this.commonColumn(key, value, i)}`
      }`
    }`
  }

  xsortColumn(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
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
          }
        ` :
        html`<vaadin-grid-sort-column width="65px" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
      }
    `
  }

  xfilterColumn(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
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
          }
        ` :
        html`<vaadin-grid-filter-column width="65px" resizable 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
      }
    `
  }

  xcommonColumn(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
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
          }
        ` :
        html`<vaadin-grid-column 
          ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
          width="65px" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
      }
    `
  }

  xisConfidential(sample, key) {
    if (this.langConfig.gridHeader[key].confidential_value&&sample[key]) {
      return html`*****`
    } else {
      return html`${sample[key]}`
    }
  }

  xgetTitle() {
    if (this.langConfig&&this.langConfig.title[this.filterName]) {
      return html`<h1>${this.langConfig.title[this.filterName]["label_"+this.lang]}</h1>`
    }
  }
}
window.customElements.define('tabs-composition', TabsComposition);
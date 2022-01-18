import { html, css, nothing } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts, Alignment } from '@collaborne/lit-flexbox-literals';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
import { ProceduresModel } from './ProceduresModel';
import { ClientMethod } from './ClientMethod';
import { DialogTemplate } from './DialogTemplate';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@trazit/tr-dialog/tr-dialog';
import './audit-dialog';
import './templates-';
import './bottom-composition';
import './tabsComposition';
import './components/program-proc';

export class TrProcedures extends ClientMethod(DialogTemplate(CredDialog)) {
  static get styles() {
    return [
      Layouts, Alignment,
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
        mwc-button[hidden] {
          display: none;
        }
        mwc-button.tabBtn {
          --mdc-theme-primary: #03a9f4;
          --mdc-theme-on-primary: white;
          --mdc-typography-button-font-size: 10px;
        }
        mwc-icon-button#prev {
          -webkit-transform:rotateY(180deg);
          -moz-transform:rotateY(180deg);
          -o-transform:rotateY(180deg);
          -ms-transform:rotateY(180deg);
        }
        div.input * {
          margin: 10px 0 5px;
        }
        mwc-icon-button[hidden] {
          display: none;
        }
        #resultDialog {
          --mdc-dialog-min-width: 800px;
        }
      `
    ];
  }

  static get properties() {
    return {
      procName: { type: String },
      viewName: { type: String },
      filterName: { type: String },
      langConfig: { type: Object },
      actions: { type: Array },
      compositions: { type: Array },
      samplesReload: { type: Boolean },
      selectedSamples: { type: Array },
      selectedAction: { type: Object },
      batchName: { type: String },
      componentModel: { type: String },
      tabs: { type: Array }
    };
  }

  resetView() {
    if (!this.config.local) {
      let findProc = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures.filter(m => m.name == this.procName)
      if (findProc.length) {
        ProceduresModel[this.procName] = findProc[0].procModel
      }
    }
    this.componentModel = null
    this.abstract = ProceduresModel[this.procName][this.viewName].abstract
    if (ProceduresModel[this.procName][this.viewName].component) {
      this.componentModel = ProceduresModel[this.procName][this.viewName]
    } else if (ProceduresModel[this.procName][this.viewName].tabs) {
      this.tabs = ProceduresModel[this.procName][this.viewName].tabs
    } else {
      this.enterResults = []
      this.microorganismList = []
      this.selectedSamples = []
      this.langConfig = ProceduresModel[this.procName][this.viewName].langConfig
      this.actions = ProceduresModel[this.procName][this.viewName].actions
      this.topCompositions = ProceduresModel[this.procName][this.viewName].topCompositions
      this.bottomCompositions = ProceduresModel[this.procName][this.viewName].bottomCompositions
      this.selectedAction = ProceduresModel[this.procName][this.viewName].actions[0]
    }
  }

  authorized() {
    super.authorized()
    if (!this.componentModel) {
      // whether user has access into the selected proc
      let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
      if (!this.abstract) {
        this.audit.updateComplete.then(() => {
          let whichProc = procList.filter(p => p.procInstanceName == this.procName)
          if (whichProc.length) {
            this.audit.sampleAuditRevisionMode = whichProc[0].audit_sign_mode.sampleAuditRevisionMode == "DISABLE" ? false : true
            this.audit.sampleAuditChildRevisionRequired = whichProc[0].audit_sign_mode.sampleAuditChildRevisionRequired == "FALSE" ? false : true
          }
        })
      }
      let anyAccess = procList.filter(p => p.procInstanceName == this.procName)
      if (anyAccess.length) {
        if (this.tabs) {
          this.updateComplete.then(() => {
            this.tabsComposition.updateComplete.then(() => {
              this.tabsComposition.model = ProceduresModel[this.procName][this.viewName].tabs[0]
            })
          })
        } else {
          this.reload()
        }
      }
    }
  }

  render() {
    return html`
      ${this.componentModel ? 
        html`${this.viewName == "Programs" ?
          html`<program-proc 
            .lang=${this.lang}
            .procName=${this.procName} 
            .viewName=${this.viewName} 
            .filterName=${this.filterName}
            .model=${this.componentModel}
            .config=${this.config}></program-proc>` :
          nothing
        }` :
        html`
          ${this.topCompositions ?
            html`${this.topCompositions.map(c => 
              html`<templates- 
                .templateName=${c.templateName} .buttons=${c.buttons} .lang=${this.lang}
                @template-event=${this.templateEvent}></templates->`
            )}` :
            nothing
          }
          ${this.abstract ? 
            nothing :
            html`
              <div class="layout horizontal flex wrap">
                <div class="layout flex">
                  ${this.getTitle()}
                  <div class="layout horizontal center flex wrap">
                    ${this.getButton()}
                  </div>
                  <vaadin-grid id="mainGrid" theme="row-dividers" column-reordering-allowed multi-sort 
                    @active-item-changed=${e=>this.selectedSamples=e.detail.value ? [e.detail.value] : []}
                    .selectedItems="${this.selectedSamples}">
                    ${this.gridList()}
                  </vaadin-grid>
                </div>
                <audit-dialog @sign-audit=${this.setAudit} .lang=${this.lang}></audit-dialog>
                ${this.langConfig&&this.viewName=="ProductionLots" ? 
                  html`${this.lotTemplate()}` :
                  nothing
                }
                ${this.dateTemplate()}
                ${this.langConfig&&this.langConfig.fieldText&&this.langConfig.fieldText.comment ?
                  html`${this.commentTemplate()}` : nothing
                }
                ${this.langConfig&&this.langConfig.resultHeader ? 
                  html`${this.resultTemplate()}` :
                  nothing
                }
                ${this.langConfig&&this.langConfig.microorganismHeader ? 
                  html`${this.microorganismTemplate()}` :
                  nothing
                }
                ${this.langConfig&&this.viewName=="LogSamples" ? 
                  html`${this.pointTemplate()}` :
                  nothing
                }
                ${this.langConfig&&this.viewName=="PlatformInstruments" ? 
                  html`${this.newInstrumentsTemplate()}` :
                  nothing
                }
                ${super.render()}
              </div>
            `
          }
          ${this.bottomCompositions ?
            html`${this.bottomCompositions.map(c => 
              html`<div class="layout flex">
                <bottom-composition id=${c.filter} .procName=${this.procName} .viewName=${this.viewName}
                  .model=${c} .config=${this.config} .batchName=${this.batchName}
                  @reload-samples=${e=>this[e.detail.method]()}
                  @selected-incub=${this.filteringBatch}
                  @selected-batch=${this.filteringIncub}
                  @set-grid=${e=>this.setGrid(e.detail)}></bottom-composition>
              </div>`
            )}` :
            nothing
          }
          ${this.tabs ?
            html`
              <div class="layout vertical flex">
                <div class="layout horizontal flex">
                  ${this.tabs.map(t => 
                    html`
                      <mwc-button class="tabBtn" dense unelevated 
                        .label=${t.langConfig.tab["label_"+ this.lang]}
                        @click=${()=>this.selectTab(t)}></mwc-button>
                    `
                  )}
                </div>
                <tabs-composition 
                  .procName=${this.procName} 
                  .viewName=${this.viewName} 
                  .config=${this.config}></tabs-composition>
              </div>
            ` : nothing
          }
        `
      }
    `;
  }

  selectTab(tab) {
    this.tabsComposition.model = tab
  }

  get tabsComposition() {
    return this.shadowRoot.querySelector("tabs-composition")
  }

  get batchElement() {
    return this.shadowRoot.querySelector("bottom-composition#active_batches")
  }

  get incubElement() {
    return this.shadowRoot.querySelector("bottom-composition#samplesWithAnyPendingIncubation")
  }

  filteringIncub(e) {
    if (e.detail.sample) {
      this.batchName = e.detail.sample.name
      // if select new batch item, don't show up any incub samples
      if (!e.detail.sample.incub_stage) {
        this.incubElement.filteredItems = []
      // if select new assigned incub#1 (incub_stage=1) and SAMPLES_ARRAY.length=0, show up the incub samples that incubation_batch = "" (orange state)
      } else if (!e.detail.sample.incubation_start && e.detail.sample.incub_stage == "1" && !e.detail.sample.SAMPLES_ARRAY.length) {
        this.incubElement.filteredItems = this.incubElement.gridItems.filter(item => !item.incubation_batch)
      // if select new assigned incub#1 (incub_stage=1) and SAMPLES_ARRAY.length>0, show up the incub samples that incubation_batch != "" & pending_incub = 1 & incubation_start = "" (tomato state)
      } else if (!e.detail.sample.incubation_start && e.detail.sample.incub_stage == "1" && e.detail.sample.SAMPLES_ARRAY.length) {
        let preFilter = this.incubElement.gridItems.filter(item => item.incubation_batch && item.pending_incub == 1 && !item.incubation_start)
        // sort out by matched sample id
        this.incubElement.filteredItems = preFilter.filter(p => {
          let matched = false
          e.detail.sample.SAMPLES_ARRAY.forEach(s => {
            if (p.sample_id == s.sample_id) matched = true
          })
          if (matched) return p
        })
      // if select started incub#1 (incub_stage=1), show up the incub samples that pending_incub = 1 & incubation_start != "" & incubation_end = "" (gif state)
      } else if (e.detail.sample.incubation_start && e.detail.sample.incub_stage == "1") {
        this.incubElement.filteredItems = this.incubElement.gridItems.filter(item => item.incubation_start && !item.incubation_end && item.pending_incub == 1)
      // if select new assigned incub#2 (incub_stage=2) and SAMPLES_ARRAY.length=0, show up the incub samples that incubation_end != "" & incubation2_batch = "" (MediumSeaGreen state)
      } else if (!e.detail.sample.incubation_start && e.detail.sample.incub_stage == "2" && !e.detail.sample.SAMPLES_ARRAY.length) {
        this.incubElement.filteredItems = this.incubElement.gridItems.filter(item => item.incubation_end && !item.incubation2_batch)
      // if select new assigned incub#2 (incub_stage=2) and SAMPLES_ARRAY.length>0, show up the incub samples that incubation2_batch != "" & pending_incub = 2 & incubation2_start = "" (SlateBlue state)
      } else if (!e.detail.sample.incubation_start && e.detail.sample.incub_stage == "2" && e.detail.sample.SAMPLES_ARRAY.length) {
        let preFilter = this.incubElement.gridItems.filter(item => item.incubation2_batch && item.pending_incub == 2 && !item.incubation2_start)
        // sort out by matched sample id
        this.incubElement.filteredItems = preFilter.filter(p => {
          let matched = false
          e.detail.sample.SAMPLES_ARRAY.forEach(s => {
            if (p.sample_id == s.sample_id) matched = true
          })
          if (matched) return p
        })
      // if select started incub#2 (incub_stage=2), show up the incub samples that pending_incub = 2 & incubation2_start != "" & incubation2_end = "" (gif state)
      } else if (e.detail.sample.incubation_start && e.detail.sample.incub_stage == "2") {
        this.incubElement.filteredItems = this.incubElement.gridItems.filter(item => item.incubation2_start && !item.incubation2_end && item.pending_incub == 2)
      } else {
        this.batchElement.filteredItems = this.batchElement.gridItems
      }
    } else {
      this.batchName = null
      this.incubElement.filteredItems = this.incubElement.gridItems
    }
  }

  filteringBatch(e) {
    if (e.detail.sample) {
      // sample not in batch, show the batch that incubation_start = "" & assigned incub#1 (incub_stage=1)
      if (!e.detail.sample.incubation_batch) {
        this.batchElement.filteredItems = this.batchElement.gridItems.filter(item => !item.incubation_start && item.incub_stage == "1")
      // sample in batch incub#1 & incubation_start="", show the batch that incubation_start = "" & assigned incub#1 (incub_stage=1) & sample_id is already put on SAMPLES_ARRAY
      } else if (e.detail.sample.incubation_batch && !e.detail.sample.incubation_start) {
        let preFilter = this.batchElement.gridItems.filter(item => !item.incubation_start && item.incub_stage == "1" && item.SAMPLES_ARRAY.length)
        // sort out by matched sample id
        let matched
        preFilter.forEach(p => {
          if (!matched) {
            p.SAMPLES_ARRAY.forEach(s => {
              if (s.sample_id == e.detail.sample.sample_id) matched = p
            })
          }
        })
        this.batchElement.filteredItems = [matched]
      // sample incub#1 incubation_start != "" & incubation_end = "", show the batch that incubation_start != "" & assigned incub#1 (incub_stage=1)
      } else if (e.detail.sample.incubation_start && !e.detail.sample.incubation_end) {
        let preFilter = this.batchElement.gridItems.filter(item => item.incubation_start && item.incub_stage == "1")
        // sort out by matched sample id
        let matched
        preFilter.forEach(p => {
          if (!matched) {
            p.SAMPLES_ARRAY.forEach(s => {
              if (s.sample_id == e.detail.sample.sample_id) matched = p
            })
          }
        })
        this.batchElement.filteredItems = [matched]
      // sample incub#1 incubation_start != "" & incubation_end != "" & incubation2_batch = "", show the batch that incubation_start = "" & assigned incub#2 (incub_stage=2)
      } else if (e.detail.sample.incubation_start && e.detail.sample.incubation_end && !e.detail.sample.incubation2_batch) {
        this.batchElement.filteredItems = this.batchElement.gridItems.filter(item => !item.incubation_start && item.incub_stage == "2")
      // sample in batch incub#2 & incubation2_start="", show the batch that incubation_start = "" & assigned incub#2 (incub_stage=2) & sample_id is already put on SAMPLES_ARRAY
      } else if (e.detail.sample.incubation2_batch && !e.detail.sample.incubation2_start) {
        let preFilter = this.batchElement.gridItems.filter(item => !item.incubation_start && item.incub_stage == "2" && item.SAMPLES_ARRAY.length)
        console.log(preFilter)
        // sort out by matched sample id
        let matched
        preFilter.forEach(p => {
          if (!matched) {
            p.SAMPLES_ARRAY.forEach(s => {
              if (s.sample_id == e.detail.sample.sample_id) matched = p
            })
          }
        })
        this.batchElement.filteredItems = [matched]
      // sample incub#2 incubation2_start != "" & incubation2_end = "", show the batch that incubation_start != "" & assigned incub#2 (incub_stage=2)
      } else if (e.detail.sample.incubation2_start && !e.detail.sample.incubation2_end) {
        let preFilter = this.batchElement.gridItems.filter(item => item.incubation_start && item.incub_stage == "2")
        // sort out by matched sample id
        let matched
        preFilter.forEach(p => {
          if (!matched) {
            p.SAMPLES_ARRAY.forEach(s => {
              if (s.sample_id == e.detail.sample.sample_id) matched = p
            })
          }
        })
        this.batchElement.filteredItems = [matched]
      }
    } else {
      this.batchElement.filteredItems = this.batchElement.gridItems
    }
  }

  templateEvent(e) {
    if (e.detail.calledActionIdx >= 0) {
      this.selectedAction = ProceduresModel[this.procName][this.viewName].actions[e.detail.calledActionIdx]
      this.reload()
    }
  }

  get templates() {
    return this.shadowRoot.querySelector("templates-")
  }

  get audit() {
    return this.shadowRoot.querySelector("audit-dialog")
  }
    
  setAudit(e) {
    this.targetValue = {
      auditId: e.detail.audit_id
    }
    this.itemId = e.detail.audit_id
    this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
    this.actionMethod(this.selectedDialogAction, false)
  }

  get grid() {
    return this.shadowRoot.querySelector("vaadin-grid#mainGrid")
  }

  reload() {
    this.resetDialogThings()
    this.selectedAction = ProceduresModel[this.procName][this.viewName].actions[0]
    this.actionMethod(this.selectedAction)
  }

  resetDialogThings() {
    this.itemId = null
    this.targetValue = {}
    this.selectedResults = []
    this.selectedMicroorganisms = []
    this.selectedDialogAction = null
  }

  reloadDialog() {
    this.resetDialogThings()
    this.actionMethod(this.selectedAction)
  }

  actionMethod(action, replace = true, actionNumIdx) {
    if (replace) {
      this.selectedAction = action
    }
    if (actionNumIdx) {
      action = ProceduresModel[this.procName][this.viewName].actions[actionNumIdx]
      this.selectedAction = ProceduresModel[this.procName][this.viewName].actions[actionNumIdx]
    }
    if (action.dialogInfo) {
      if (action.dialogInfo.automatic) {
        if (this.itemId) {
          this.credsChecker(action.actionName, this.itemId, this.jsonParam())
        } else {
          this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam())
        }
      } else {
        this[action.dialogInfo.name].show()
      }
    } else {
      if (this.selectedSamples.length) {
        this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam())
      } else {
        this.credsChecker(action.actionName, null, this.jsonParam())
      }
    }
  }

  getButton() {
    return html`
      ${this.actions&&this.actions.map(action =>
        html`${action.button ?
          html`${action.button.icon ?
            html`<mwc-icon-button 
              id="${action.button.id}"
              icon="${action.button.icon}" 
              title="${action.button.title['label_'+this.lang]}" 
              ?disabled=${action.button.whenDisabled == "samplesReload" ? this.samplesReload : !this.selectedSamples.length}
              @click=${()=>this.actionMethod(action)}></mwc-icon-button>` :
            html`<mwc-button dense raised 
              id="${action.button.id}"
              icon="${action.button.icon}" 
              label="${action.button.title['label_'+this.lang]}" 
              ?disabled=${action.button.whenDisabled == "samplesReload" ? this.samplesReload : !this.selectedSamples.length}
              @click=${()=>this.actionMethod(action)}></mwc-button>`
          }` :
          nothing
        }`
      )}
    `
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
      this.credsChecker(this.selectedAction.actionName, this.selectedSamples[0].sample_id, this.jsonParam(this.selectedAction))
    } else {
      this.credsChecker(this.selectedAction.actionName, null, this.jsonParam(this.selectedAction))
    }
  }

  jsonParam() {
    let jsonParam = {}
    let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
    if (action.apiParams) {
      action.apiParams.forEach(p => {
        if (p.element) {
          jsonParam[p.query] = this[p.element].value // get value from field input
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
    if (this.abstract) {
      this.shadowRoot.querySelectorAll("bottom-composition").forEach(c => {
        if (j) {
          c.gridItems = c.filteredItems = j[c.model.filter]
        } else {
          c.gridItems = c.filteredItems = []
        }
        c.samplesReload = false
      })
    } else {
      if (j) {
        this.grid.items = j
      } else {
        this.grid.items = []
      }
    }
  }

  gridList() {
    if (this.langConfig) {
      return Object.entries(this.langConfig.gridHeader).map(
        ([key, value], i) => html`
          ${this.langConfig.gridHeader[key].is_icon ?
            this.iconColumn(key, value, i) :
            this.nonIconColumn(key, value, i)
          }
        `
      )
    }
  }

  iconColumn(key, value, i) {
    return html`${i==0 ?
      html`${this.langConfig.gridHeader[key].width ?
        html`
        <vaadin-grid-column
          header="${value['label_'+this.lang]}"
          ${columnBodyRenderer(this.iconRenderer)}
          text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'center' }"
          width="${this.langConfig.gridHeader[key].width}" resizable
        ></vaadin-grid-column>
        ` :
        html`
        <vaadin-grid-column
          header="${value['label_'+this.lang]}"
          ${columnBodyRenderer(this.iconRenderer)}
          text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'center' }"
          flex-grow="0"
        ></vaadin-grid-column>
        `
      }` :
      html`${this.langConfig.gridHeader[key].width ?
        html`
        <vaadin-grid-column
          header="${value['label_'+this.lang]}"
          ${columnBodyRenderer(this.iconRenderer)}
          text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'center' }"
          width="${this.langConfig.gridHeader[key].width}" resizable
        ></vaadin-grid-column>
        ` :
        html`<vaadin-grid-column
          header="${value['label_'+this.lang]}"
          ${columnBodyRenderer(this.iconRenderer)}
          text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'center' }"
          auto-width
        ></vaadin-grid-column>`
      }`
    }`
  }

  iconRenderer(sample) {
    if (this.filterName) {
      if (this.filterName == "SampleLogin") {
        return html`<img src="/images/labplanet.png" style="width:20px">`
      } else {
        return html`<img src="/images/${this.filterName}_${sample.status?sample.status.toLowerCase():''}.png" style="width:20px">`
      }
    }
  }

  nonIconColumn(key, value, i) {
    return html`${this.langConfig.gridHeader[key].sort ?
      this.sortColumn(key, value, i) :
      this.filterColumn(key, value, i)
    }`
  }

  sortColumn(key, value, i) {
    return html`${i==0 ?
      html`${this.langConfig.gridHeader[key].width ?
        html`<vaadin-grid-sort-column width="${this.langConfig.gridHeader[key].width}" resizable 
          text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
        html`<vaadin-grid-sort-column flex-grow="0" 
          text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
      }` :
      html`${this.langConfig.gridHeader[key].width ?
        html`<vaadin-grid-sort-column width="${this.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>` :
        html`<vaadin-grid-sort-column resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
      }`
    }`
  }

  filterColumn(key, value, i) {
    return html`${i==0 ?
      html`${this.langConfig.gridHeader[key].width ?
        html`<vaadin-grid-filter-column width="${this.langConfig.gridHeader[key].width}" resizable 
          text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
        html`<vaadin-grid-filter-column flex-grow="0" 
          text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'end' }"
          path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
      }` :
      html`${this.langConfig.gridHeader[key].width ?
        html`<vaadin-grid-filter-column width="${this.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
        html`<vaadin-grid-filter-column resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
      }`
    }`
  }

  getTitle() {
    if (this.langConfig&&this.langConfig.title[this.filterName]) {
      return html`<h1>${this.langConfig.title[this.filterName]["label_"+this.lang]}</h1>`
    }
  }
}

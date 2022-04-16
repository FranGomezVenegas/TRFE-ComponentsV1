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
import './tabs-composition';
import './components/program-proc';
import './components/genoma-project';

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
        mwc-icon-button.reverse {
          -webkit-transform:rotateY(180deg);
          -moz-transform:rotateY(180deg);
          -o-transform:rotateY(180deg);
          -ms-transform:rotateY(180deg);
        }
        mwc-icon-button[disabled] {
          opacity: 0.5;
        }
        img.iconBtn {
          width: 20px;
        }
        div.input * {
          margin: 10px 0 5px;
        }
        mwc-icon-button[hidden] {
          display: none;
        }
        #resultDialog {
          --mdc-dialog-min-width: 80vw;
        }
        vaadin-grid {
          font-size: 12px;
        }
        sp-button[hidden] {
          display: none;
        }
        @media (max-width: 460px) {
          vaadin-grid {
            font-size: 10px;
          }
          vaadin-grid-cell-content {
            padding: 5px;
          }
          #resultDialog {
            --mdc-dialog-min-width: 100vw;
          }
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
      gridItems: { type: Array },
      selectedSamples: { type: Array },
      selectedAction: { type: Object },
      batchName: { type: String },
      componentModel: { type: String },
      tabs: { type: Array },
      windowOpenable: { type: String },
      sopsPassed: { type: Boolean },
      // we will wait the updated langConfig completed
      // fixed issue: https://github.com/FranGomezVenegas/FETR/issues/158
      ready: { type: Boolean },
      sampleState: { type: Object }
    };
  }

  resetView() {
    if (!this.config.local) {
      let findProc = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures.filter(m => m.procInstanceName == this.procName)
      if (findProc.length) {
        ProceduresModel[this.procName] = findProc[0].procModel
      }
    }
    this.gridItems = []
    this.componentModel = null
    this.abstract = ProceduresModel[this.procName][this.viewName].abstract
    this.topCompositions = ProceduresModel[this.procName][this.viewName].topCompositions
    this.bottomCompositions = ProceduresModel[this.procName][this.viewName].bottomCompositions
    this.tabs = ProceduresModel[this.procName][this.viewName].tabs
    this.enterResults = []
    this.microorganismList = []
    this.selectedSamples = []
    if (ProceduresModel[this.procName][this.viewName].component) {
      this.componentModel = ProceduresModel[this.procName][this.viewName]
    } else if (ProceduresModel[this.procName][this.viewName].tabs) {
      // 
    } else {
      this.langConfig = ProceduresModel[this.procName][this.viewName].langConfig
      this.actions = ProceduresModel[this.procName][this.viewName].actions
      this.selectedAction = ProceduresModel[this.procName][this.viewName].actions[0]
    }
    this.requestUpdate()
  }

  async authorized() {
    super.authorized()
    this.windowOpenable = null
    this.sopsPassed = null
    let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
    let anyAccess = procList.filter(p => p.procInstanceName == this.procName)
    if (anyAccess.length) {
      let defView = anyAccess[0].new_definition.filter(d => d.lp_frontend_page_name == this.viewName)
      if (defView.length) {
        // for fake test
        // this.sopsPassed = false
        if (defView[0].icons) {
          let sopIcon = defView[0].icons.filter(i => i.name == this.filterName)
          this.sopsPassed = sopIcon[0].sops_passed
        } else {
          this.sopsPassed = defView[0].sops_passed
        }
      }
      this.windowOpenable = anyAccess[0].windowOpenableWhenNotSopCertifiedUserSopCertification.toLowerCase()
      // When sopsPassed=true then does not matter what windowOpenableWhenNotSopCertifiedUserSopCertification business rule is set
      if (this.sopsPassed) {
        this.windowOpenable = "yes"
      }
      if (this.windowOpenable == "no") {
        this.dispatchEvent(new CustomEvent("error", {
          detail: { 
            is_error: true,
            message_en: "Window cannot be open due to pending linked SOP certifications",
            message_es: "La ventana no se puede abrir porque hay SOPs vinculados pendientes de certificación"
          },
          bubbles: true,
          composed: true
        }))
        console.log("Window cannot be open due to pending linked SOP certifications")
        return
      }
      if (defView.length && defView[0].mode==="readonly") {
        this.sopsPassed = false
      } else if (defView.length && defView[0].mode==="edit") {
        this.sopsPassed = this.sopsPassed == false ? false : true
      }
    }
    await this.updateComplete
    if (!this.componentModel) {
      // whether user has access into the selected proc
      if (!this.abstract && this.audit) {
        this.audit.updateComplete.then(() => {
          let whichProc = procList.filter(p => p.procInstanceName == this.procName)
          if (whichProc.length) {
            this.audit.sampleAuditRevisionMode = whichProc[0].audit_sign_mode.sampleAuditRevisionMode == "DISABLE" ? false : true
            this.audit.sampleAuditChildRevisionRequired = whichProc[0].audit_sign_mode.sampleAuditChildRevisionRequired == "FALSE" ? false : true
          }
        })
      }
      if (anyAccess.length) {
        if (this.tabs) {
          this.tabsComposition.updateComplete.then(() => {
            this.tabsComposition.model = ProceduresModel[this.procName][this.viewName].tabs[0]
          })
        } else {
          this.reload()
        }
      }
    }
  }

  render() {
    return html`
      ${this.windowOpenable=="yes" ? 
        html`
          ${this.componentModel ? 
            html`${this.viewName == "Programs" || this.viewName == "ProjectManager" ?
              html`
                ${this.viewName == "Programs" ? 
                  html`<program-proc 
                    .windowOpenable=${this.windowOpenable}
                    .sopsPassed=${this.sopsPassed}
                    .lang=${this.lang}
                    .procName=${this.procName} 
                    .viewName=${this.viewName} 
                    .filterName=${this.filterName}
                    .model=${this.componentModel}
                    .config=${this.config}></program-proc>`
                  :
                  html`<genoma-project 
                    .windowOpenable=${this.windowOpenable}
                    .sopsPassed=${this.sopsPassed}
                    .lang=${this.lang}
                    .procName=${this.procName} 
                    .viewName=${this.viewName} 
                    .filterName=${this.filterName}
                    .model=${this.componentModel}
                    .config=${this.config}></genoma-project>`
              }`:html
            }` :
            html`
              ${this.topCompositions ?
                html`${this.topCompositions.map(c => 
                  html`<templates- 
                    .windowOpenable=${this.windowOpenable}
                    .sopsPassed=${this.sopsPassed}
                    .templateName=${c.templateName} .buttons=${c.buttons} .lang=${this.lang}
                    @program-changed=${e=>this.gridItems=e.detail}
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
                      ${this.ready ? 
                        html`
                          <vaadin-grid id="mainGrid" theme="row-dividers" column-reordering-allowed multi-sort 
                            @active-item-changed=${e=>this.selectedSamples=e.detail.value ? [e.detail.value] : []}
                            .items=${this.gridItems}
                            .selectedItems="${this.selectedSamples}">
                              ${this.gridList()}
                          </vaadin-grid>
                        ` :
                        nothing
                      }
                    </div>
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
                    ${this.langConfig&&this.viewName=="EventsInProgress" ? 
                      html`${this.instrumentEventTemplate()}` :
                      nothing
                    }  
                    ${this.langConfig&&this.viewName=="WhiteIpList" ? 
                      html`${this.newPlatformAdminWhiteIPListsTemplate()}` :
                      nothing
                    }
                    ${this.langConfig&&this.viewName=="BlackIpList" ? 
                      html`${this.newPlatformAdminBlackIPListsTemplate()}` :
                      nothing
                    }
                    ${this.langConfig&&this.viewName=="PlatformBusRules" ? 
                      html`${this.newPlatformAdminBusinessRulesTemplate()}` :
                      nothing
                    }
                    
                    <audit-dialog @sign-audit=${this.setAudit} .lang=${this.lang}></audit-dialog>
                  </div>
                `
              }
              ${this.bottomCompositions ?
                html`${this.bottomCompositions.map(c => 
                  html`<div class="layout flex">
                    <bottom-composition id=${c.filter} .procName=${this.procName} .viewName=${this.viewName}
                      .lang=${this.lang}
                      .windowOpenable=${this.windowOpenable}
                      .sopsPassed=${this.sopsPassed}
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
                      .lang=${this.lang}
                      .windowOpenable=${this.windowOpenable}
                      .sopsPassed=${this.sopsPassed}
                      .procName=${this.procName} 
                      .viewName=${this.viewName} 
                      .config=${this.config}></tabs-composition>
                  </div>
                ` : nothing
              }
            `
          }
        ` : nothing
      }
      ${super.render()}
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
        let pendings = this.incubElement.gridItems.filter(item => !item.incubation_batch)
        let preFilter = this.incubElement.gridItems.filter(item => item.incubation_batch && item.pending_incub == 1 && !item.incubation_start)
        // sort out by matched sample id
        let inBatches = preFilter.filter(p => {
          let matched = false
          e.detail.sample.SAMPLES_ARRAY.forEach(s => {
            if (p.sample_id == s.sample_id) matched = true
          })
          if (matched) return p
        })
        this.incubElement.filteredItems = [...pendings, ...inBatches]
      // if select started incub#1 (incub_stage=1), show up the incub samples that pending_incub = 1 & incubation_start != "" & incubation_end = "" (gif state)
      } else if (e.detail.sample.incubation_start && e.detail.sample.incub_stage == "1") {
        this.incubElement.filteredItems = this.incubElement.gridItems.filter(item => item.incubation_start && !item.incubation_end && item.pending_incub == 1)
      // if select new assigned incub#2 (incub_stage=2) and SAMPLES_ARRAY.length=0, show up the incub samples that incubation_end != "" & incubation2_batch = "" (MediumSeaGreen state)
      } else if (!e.detail.sample.incubation_start && e.detail.sample.incub_stage == "2" && !e.detail.sample.SAMPLES_ARRAY.length) {
        this.incubElement.filteredItems = this.incubElement.gridItems.filter(item => item.incubation_end && !item.incubation2_batch)
      // if select new assigned incub#2 (incub_stage=2) and SAMPLES_ARRAY.length>0, show up the incub samples that incubation2_batch != "" & pending_incub = 2 & incubation2_start = "" (SlateBlue state)
      } else if (!e.detail.sample.incubation_start && e.detail.sample.incub_stage == "2" && e.detail.sample.SAMPLES_ARRAY.length) {
        let pendings = this.incubElement.gridItems.filter(item => !item.incubation2_batch && item.pending_incub == 2 && !item.incubation2_start)
        let preFilter = this.incubElement.gridItems.filter(item => item.incubation2_batch && item.pending_incub == 2 && !item.incubation2_start)
        // sort out by matched sample id
        let inBatches = preFilter.filter(p => {
          let matched = false
          e.detail.sample.SAMPLES_ARRAY.forEach(s => {
            if (p.sample_id == s.sample_id) matched = true
          })
          if (matched) return p
        })
        this.incubElement.filteredItems = [...pendings, ...inBatches]
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
    this.requestUpdate()
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
            html`<mwc-icon-button 
              class="${action.button.class}"
              icon="${action.button.icon}" 
              title="${action.button.title['label_'+this.lang]}" 
              ?disabled=${this.btnDisabled(action)}
              @click=${()=>this.actionMethod(action)}></mwc-icon-button>` :
            html`${action.button.img ?
              html`<mwc-icon-button 
                class="${action.button.class} img"
                title="${action.button.title['label_'+this.lang]}" 
                ?disabled=${this.btnDisabled(action)}
                ?hidden=${this.btnHidden(action)}
                @click=${()=>this.actionMethod(action)}>
                  <img class="iconBtn" src="images/${action.button.img}">
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
        d = action.button.whenDisabled == "samplesReload" && action.button.title.label_en == "Reload" ? this.samplesReload : true
      }
    } else {
      d = action.button.whenDisabled == "samplesReload" ? this.samplesReload : !this.selectedSamples.length
    }
    return d
  }

  btnHidden(action) {
    let d = true
    if (action.button.showWhenSelectedItem) {
      if (this.selectedSamples.length && this.selectedSamples[0][action.button.showWhenSelectedItem.column] == action.button.showWhenSelectedItem.value) {
        d = false
      }
    } else {
      d = false
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
        // updating grid of samples_stillIncubationStageAndBothIncubCompleted
        if (c.siGrid) {
          if (j) {
            if (j.samples_stillIncubationStageAndBothIncubCompleted && j.samples_stillIncubationStageAndBothIncubCompleted.length) {
              c.stucksList = j.samples_stillIncubationStageAndBothIncubCompleted
              c.stuckNum = c.stucksList.length
              c.siGrid.items = j.samples_stillIncubationStageAndBothIncubCompleted
            } else {
              c.stucksList = null
              c.siGrid.items = []
            }
          } else {
            c.stucksList = null
            c.siGrid.items = []
          }
          c.selectedStucks = []
        }
    
        if (j) {
          c.gridItems = c.filteredItems = j[c.model.filter]
        } else {
          c.gridItems = c.filteredItems = []
        }
        this.batchName = null
        c.selectedSamples = []
        c.samplesReload = false
        c.requestUpdate()
      })
    } else {
      if (j) {
        this.gridItems = j
      } else {
        this.gridItems = []
      }
    }

    this.ready = true
    if (this.sampleState) {
      this.reloadSampleState()
    }
  }

  gridList() {
    return Object.entries(this.langConfig.gridHeader).map(
      ([key, value], i) => html`
        ${this.langConfig.gridHeader[key].is_icon ?
          this.iconColumn(key, value, i) :
          this.nonIconColumn(key, value, i)
        }
      `
    )
  }

  iconColumn(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
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
          }
        ` :
        html`
          <vaadin-grid-column
            header="${value['label_'+this.lang]}"
            ${columnBodyRenderer(this.iconRenderer)}
            text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'center' }"
            width="65px" resizable
          ></vaadin-grid-column>
        `
      }
    `
  }

  iconRenderer(sample) {
    if (this.filterName == "SampleLogin") {
      return html`<img src="/images/labplanet.png" style="width:20px">`
    } else if (this.viewName == "PlatformInstruments") {
      return html`<img src="/images/${sample.on_line?'activate.svg':'deactivate.svg'}" style="width:20px">`
    } else if (this.viewName == "EventsInProgress") {
      return html`<img src="/images/inst_ev_type_${sample.event_type.toLowerCase()}.svg" style="width:20px">`
    } else if (this.viewName == "WhiteIpList") {
      return html`<img src="/images/${sample.active?'activate.svg':'deactivate.svg'}" style="width:20px">`
    } else if (this.viewName == "BlackIpList") {
      return html`<img src="/images/${sample.active?'activate.svg':'deactivate.svg'}" style="width:20px">`
    } else if (this.viewName == "PlatformBusRules") {
      return html`<img src="/images/${sample.disabled?'activate.svg':'deactivate.svg'}" style="width:20px">`
    } else {
      return html`<img src="/images/${this.filterName}_${sample.status?sample.status.toLowerCase():''}.png" style="width:20px">`
    }
  }

  nonIconColumn(key, value, i) {
    return html`${this.langConfig.gridHeader[key].sort ?
      this.sortColumn(key, value, i) :
      this.filterColumn(key, value, i)
    }`
  }

  sortColumn(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${this.langConfig.gridHeader[key].width ?
              html`<vaadin-grid-sort-column width="${this.langConfig.gridHeader[key].width}" resizable 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'end' }"
                path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
              html`<vaadin-grid-sort-column flex-grow="0" 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'end' }"
                path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
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

  filterColumn(key, value, i) {
    return html`
      ${this.desktop ?
        html`
          ${i==0 ?
            html`${this.langConfig.gridHeader[key].width ?
              html`<vaadin-grid-filter-column width="${this.langConfig.gridHeader[key].width}" resizable 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'end' }"
                path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
              html`<vaadin-grid-filter-column flex-grow="0" 
                ${columnBodyRenderer((sample)=>this.isConfidential(sample, key))}
                text-align="${this.langConfig.gridHeader[key].align ? this.langConfig.gridHeader[key].align : 'end' }"
                path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
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

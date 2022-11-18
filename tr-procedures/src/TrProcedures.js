import { html, css, nothing, LitElement } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts, Alignment } from '@collaborne/lit-flexbox-literals';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
import { ProceduresModel } from './ProceduresModel';
// import { CommonsClientMethod } from './CommonsClientMethod';
// import { DialogTemplate } from './DialogTemplate';
// import { CommonsDialogTemplate } from './CommonsDialogTemplate';
// import { DialogTemplateEnvMonit } from './module_env_monit/DialogTemplateEnvMonit';
// import { DialogTemplateInstruments } from './module_instruments/DialogTemplateInstruments';
import '@trazit/tr-dialog/tr-dialog';
import './components/Audit/audit-dialog';

import {ApiFunctions} from './components/Api/ApiFunctions';



export class TrProcedures extends (((((((ApiFunctions(CredDialog)))))))) {
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
        div#microGrid {
          height: 35vh;
          overflow: auto;
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
        .enterResultVal {
          width: 75%;
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
      viewModelFromProcModel: {type: Object},      
      viewName: { type: String },
      filterName: { type: String },
      // langConfig: { type: Object },
      // actions: { type: Array },
      // compositions: { type: Array },
      // samplesReload: { type: Boolean },
      // gridItems: { type: Array },
      // selectedSamples: { type: Array },
      // selectedAction: { type: Object },
      // batchName: { type: String },
      // viewModelFromProcModel: { type: String },
      tabs: { type: Array },
      windowOpenable: { type: String },
      // sopsPassed: { type: Boolean },
      // we will wait the updated langConfig completed
      // fixed issue: https://github.com/FranGomezVenegas/FETR/issues/158
      ready: { type: Boolean },
      sampleState: { type: Object },
      // masterData:{ type: Array}
     
    };
  }
  constructor() {
    super()
   
  }

  resetView() {
    let findProc = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures.filter(m => m.procInstanceName == this.procName)
    if (!this.config.local) {
      if (findProc.length) {
        ProceduresModel[this.procName] = findProc[0].procModel
      }
    }
    this.procInstanceModel=ProceduresModel[this.procName]
    if (findProc!==undefined&&findProc.length>0&&findProc[0].master_data!==undefined){
      this.masterData=findProc[0].master_data
      console.log('master data', this.masterData)   
    }
    
    // experimental for browser view
    // if (this.viewName == "Browser") {
    //   import('./browser/browser-view')
    //   return
    // }
    // if (this.viewName == "DataMining") {
    //   import('./data_mining/datamining-mainview')
    //   return
    // }
    this.gridItems = []
    this.viewModelFromProcModel = null
    if (ProceduresModel[this.procName][this.viewName]===undefined){
      alert('Not found any window called '+this.viewName+' in the Backend Proc Model for procedure '+this.procName)
      return
    }
    if (ProceduresModel[this.procName][this.viewName].component===undefined){
      alert('The window called '+this.viewName+' has no component specified in the Backend Proc Model for procedure '+this.procName)
      return
    }
    this.viewModelFromProcModel=ProceduresModel[this.procName][this.viewName]
    console.log('resetView', 'component', this.viewModelFromProcModel.component)
    
    switch(this.viewModelFromProcModel.component){
      case 'GridWithButtons':
      case 'TableWithButtons':        
        import('./components/grid_with_buttons/grid-with-buttons')
        if (this.GridWithButtons!==null){
          this.GridWithButtons.ready=false
        }        
        //alert('grid')
        return
      case 'Tabs':
        import('./components/Tabs/tabs-main-view')
        return
      case 'ModuleEnvMonitProgramProc':
        import('./module_env_monit/program-proc')
        return
      case 'ModuleEnvMonitSampleIncubation':
        import('./module_env_monit/sample-incubation-view')
        return
      case 'EnvMonitBrowser', 'Browser':
        import('./browser/browser-view')
        return
      case 'DataMining':
        import('./data_mining/datamining-mainview')
        return
      case 'ModuleGenomaProjectWindow':
        import('./module_genoma/genoma-project')
        return
      case 'ModuleSampleLogSample':
        import('./module_sample/log-sample-module-sample')
        return
      default:
        alert('In TrProcedures, not found component '+this.viewModelFromProcModel.component)
        return
    }


    if (ProceduresModel[this.procName][this.viewName].abstract===undefined){
      this.abstract = false
    }else{
      this.abstract = ProceduresModel[this.procName][this.viewName].abstract
    }
    this.topCompositions = ProceduresModel[this.procName][this.viewName].topCompositions
    this.bottomCompositions = ProceduresModel[this.procName][this.viewName].bottomCompositions
    this.tabs = ProceduresModel[this.procName][this.viewName].tabs
    this.enterResults = []
    this.microorganismList = []
    this.selectedSamples = []
    let hasOwnComponent=ProceduresModel[this.procName][this.viewName].hasOwnComponent
    if (ProceduresModel[this.procName][this.viewName]!==undefined){
      this.viewModelFromProcModel = ProceduresModel[this.procName][this.viewName]
    }
    if (ProceduresModel[this.procName][this.viewName].component) {
      this.viewModelFromProcModel = ProceduresModel[this.procName][this.viewName]
    } else if (ProceduresModel[this.procName][this.viewName].tabs) {
      // 
    } else {
      this.langConfig = ProceduresModel[this.procName][this.viewName].langConfig
      this.actions = ProceduresModel[this.procName][this.viewName].actions
      this.selectedAction = ProceduresModel[this.procName][this.viewName].viewQuery   
    }
   // console.log('resetView', 'this.selectedAction', this.selectedAction)
    if (this.selectedAction===undefined&&hasOwnComponent===undefined){
      alert('resetView-->viewQuery property not found in the procedure model for procInstanceName'+this.procName+' and view '+this.viewName)
      return
    }
    this.reload()
    this.requestUpdate()
  }

  async authorized() {
    //super.authorized() -- credDialog
    //console.log('authorized')
    this.windowOpenable = null
    this.sopsPassed = null
    let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures

    if (this.procName===undefined||procList===undefined){return}
    
    let anyAccess = procList.filter(p => p.procInstanceName == this.procName)
    if (anyAccess.length) {
      let defView = anyAccess[0].new_definition.filter(d => d.lp_frontend_page_name == this.viewName)
      if (defView.length==0) {
        defView = anyAccess[0].icons_up.filter(d => d.lp_frontend_page_name == this.viewName)
      }
      if (defView.length==0) {
        defView = anyAccess[0].icons_down.filter(d => d.lp_frontend_page_name == this.viewName)
      }
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
      if (!this.sopsPassed) {
        if (anyAccess.length && anyAccess[0].userSopMode!==undefined && anyAccess[0].userSopMode.toString().toUpperCase().includes("DISAB")) {
          this.sopsPassed=true
        } else{      
          if (anyAccess[0].userSopMode===undefined||anyAccess[0].windowOpenableWhenNotSopCertifiedUserSopCertification===undefined){
            this.sopsPassed=false
            this.windowOpenable = "no"
          }else{
            this.windowOpenable = anyAccess[0].windowOpenableWhenNotSopCertifiedUserSopCertification.toLowerCase()
          }
        }
      }
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
    // experimental for browser view
    if (this.viewName == "Browser") return
    if (this.viewName == "DataMining") return
    //console.log('this.viewModelFromProcModel', this.viewModelFromProcModel)    
    if (!this.viewModelFromProcModel) {
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
//FRAAAAAAAAN , parche
      alert('Fran, acuerdate del parche en TrProcedures.authorized para sampleAuditRevisionMode y sampleAuditChildRevisionRequirede')
      this.audit.sampleAuditRevisionMode = true
      this.audit.sampleAuditChildRevisionRequired = true
//FRAAAAAAAAN , parche

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

  reload() {
    return
    this.resetDialogThings()
    this.selectedAction = ProceduresModel[this.procName][this.viewName].viewQuery
    this.actionMethod(this.selectedAction)
  }    
  resetDialogThings() {
    this.itemId = null
    this.targetValue = {}
    this.selectedResults = []
    this.selectedDialogAction = null
  }
  ownComponents(){
    if (this.viewModelFromProcModel!==undefined&&this.viewModelFromProcModel.component!==undefined){
      //console.log('ownComponents', 'component', this.viewModelFromProcModel.component)
    }
    return html `
      ${this.viewModelFromProcModel.component == 'Browser' ? html`
        <browser-view .config=${this.config} .desktop=${this.desktop} .lang=${this.lang} .model=${ProceduresModel[this.procName]} .procName=${this.procName}></browser-view>
      `:html``}
      ${this.viewModelFromProcModel.component == 'DataMining' ? html`
        <datamining-mainview .config=${this.config} .desktop=${this.desktop} .lang=${this.lang} .masterData=${this.masterData} .model=${ProceduresModel[this.procName]} .procName=${this.procName}></datamining-mainview>
      `:html``}
      ${this.viewModelFromProcModel.component == 'ModuleSampleLogSample' ? html`
        <log-sample-module-sample 
          .windowOpenable=${this.windowOpenable} .sopsPassed=${this.sopsPassed}  .lang=${this.lang}
          .procInstanceName=${this.procName} .viewName=${this.viewName}   .filterName=${this.filterName}  
          .viewModelFromProcModel=${this.viewModelFromProcModel} .config=${this.config}>
        </log-sample-module-sample>        
      `:html``}
      ${this.viewModelFromProcModel.component == 'ModuleEnvMonitProgramProc' ? html`
        <program-proc .windowOpenable=${this.windowOpenable} .sopsPassed=${this.sopsPassed} .lang=${this.lang}
          .procInstanceName=${this.procName}  .viewName=${this.viewName} .filterName=${this.filterName} .model=${this.viewModelFromProcModel}
          .viewModelFromProcModel=${this.viewModelFromProcModel} .config=${this.config}></program-proc>      
      `:html``}
      ${this.viewModelFromProcModel.component == 'ModuleEnvMonitSampleIncubation' ? html`
        <sample-incubation-view .windowOpenable=${this.windowOpenable} .sopsPassed=${this.sopsPassed} .lang=${this.lang}
          .procInstanceName=${this.procName}  .viewName=${this.viewName} .filterName=${this.filterName} .viewModelFromProcModel=${this.viewModelFromProcModel}
          .config=${this.config}></sample-incubation-view>      
      `: nothing}

      

      ${this.viewModelFromProcModel.component == 'ModuleGenomaProjectWindow' ? html`
        <genoma-project .windowOpenable=${this.windowOpenable} .sopsPassed=${this.sopsPassed} .lang=${this.lang}
          .procInstanceName=${this.procName}  .viewName=${this.viewName} .filterName=${this.filterName} .viewModelFromProcModel=${this.viewModelFromProcModel}
          .config=${this.config}></genoma-project>      
      `:html``}
    `
  }
  render(){
    if (this.viewModelFromProcModel!==undefined){
      console.log('render', this.viewModelFromProcModel, 'windowOpenable', this.windowOpenable)
    }
    return html`   
      ${this.windowOpenable=="yes" ? 
      html`      
        ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component !== null&&this.viewModelFromProcModel.component !== undefined
          &&this.viewModelFromProcModel.component.toLowerCase() == 'tablewithbuttons' ? html`
          <grid-with-buttons id="gridwithbuttons" .viewModelFromProcModel=${this.viewModelFromProcModel} viewName=${this.viewName} 
            filterName=${this.filterName} procInstanceName=${this.procName} lang=${this.lang}
            .config=${this.config} .reqParams=${this.reqParams} ?ready="false">
          </grid-with-buttons>
        `: html`

        ${this.viewModelFromProcModel&&this.viewModelFromProcModel.component !== null&&this.viewModelFromProcModel.component !== undefined
          &&this.viewModelFromProcModel.component.toLowerCase() == 'tabs' ? html`
            <tabs-main-view id="tabsmainview" .tabsMainViewModelFromProcModel=${this.viewModelFromProcModel} viewName=${this.viewName} 
            filterName=${this.filterName} procInstanceName=${this.procName} lang=${this.lang}
            .config=${this.config} .reqParams=${this.reqParams} ?ready="false"></tabs-main-view>
          `: html`
            ${this.ownComponents()}
          `}  
        `}        
      `:
      nothing}
    ${super.render()}    
    `;
  }
  get GridWithButtons() {return this.shadowRoot.querySelector("grid-with-buttons#gridwithbuttons")}



  xfilteringIncub(e) {
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

  xfilteringBatch(e) {
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
  xtemplateEvent(e) {
    if (e.detail.calledActionIdx >= 0) {
      this.selectedAction = ProceduresModel[this.procName][this.viewName].actions[e.detail.calledActionIdx]
      this.reload()
    }
  }
  xsetAudit(e) {
    this.targetValue = {
      auditId: e.detail.audit_id
    }
    this.itemId = e.detail.audit_id
    this.selectedDialogAction = this.selectedAction.dialogInfo.viewQuery
    this.actionMethod(this.selectedDialogAction, false)
  }

  xreloadDialog() {
    this.resetDialogThings()
    this.actionMethod(this.selectedAction)
  }
  xnextRequest() {
    super.xnextRequest()
    this.reqParams = {
      procInstanceName: this.procName,
      ...this.reqParams
    }
    let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
    this[action.clientMethod]()
  }

}

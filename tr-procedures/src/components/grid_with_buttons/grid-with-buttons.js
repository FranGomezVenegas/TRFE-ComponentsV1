import { html, css, LitElement, nothing } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts, Alignment } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';

import '@trazit/cred-dialog'
//import '../../module_env_monit/gridmodel-bottomcomp-sampleincubation';
import '../../gridmodel-bottomcomp-chart';

import '../templates-';
import '@trazit/tr-dialog/tr-dialog';
import {ButtonsFunctions} from '../Buttons/ButtonsFunctions';
import {GridFunctions} from './GridFunctions';
import {ModuleEnvMonitClientMethods} from '../../module_env_monit/ModuleEnvMonitClientMethods';
import { ProceduresModel } from '../../ProceduresModel';
import {TrazitGenericDialogs} from '../GenericDialogs/TrazitGenericDialogs';
import {TrazitReactivateObjectsDialog} from '../GenericDialogs/TrazitReactivateObjectsDialog';
import {TrazitEnterResultWithSpec} from '../GenericDialogs/TrazitEnterResultWithSpec';
import {ModuleEnvMonitDialogsMicroorganism} from '../../module_env_monit/Dialogs/ModuleEnvMonitDialogsMicroorganism';
import {TrazitInvestigationsDialog} from '../GenericDialogs/TrazitInvestigationsDialog';
import { ModuleInstrumentsDialogs} from '../../module_instruments/ModuleInstrumentsDialogs'
import { AuditFunctions} from '../Audit/AuditFunctions';
import {TrazitCredentialsDialogs} from '../GenericDialogs/TrazitCredentialsDialogs';

import '../Audit/audit-dialog';
//import '../../tabs-composition';
export class GridWithButtons extends TrazitCredentialsDialogs(AuditFunctions(ModuleInstrumentsDialogs(TrazitInvestigationsDialog(ModuleEnvMonitDialogsMicroorganism(TrazitEnterResultWithSpec(TrazitReactivateObjectsDialog(TrazitGenericDialogs(ModuleEnvMonitClientMethods(GridFunctions(ButtonsFunctions(LitElement))))))))))) {
    static get styles() {
      return [
        Layouts, Alignment,
        //super.styles,
        css`
          :host {
            display: block;
          }
          .tabContainer {
            overflow: auto;
          }
          .tabContainer::-webkit-scrollbar {
            display: none;
          }
          .tabContainer > * {
            display: inline-block;
            flex-shrink: 0;
          }
          mwc-button {
            --mdc-typography-button-text-transform: none;
          }
          mwc-icon-button.slide[hidden] {
            visibility: hidden;
          }
          mwc-select[hidden] {
            display: none;
          }
          h1 {        
            color : rgba(36, 192, 235, 1);
            font-family : Montserrat;
            font-weight : bold;
            font-size:calc(12px + 1.5vw);
            text-align: center;
          }        
          vaadin-grid-cell-content{
            color : rgb(94, 145, 186);
          }
          #vaadin-text-field-input{
          background-color: #d0f1fa;
          }
        `
      ];
    }
  
    static get properties() {
      return {
        model: { type: Object },
        config: { type: Object },
        procName: { type: String },
        viewModelFromProcModel: {type: Object},
        ready:{type: Boolean},
        viewName: { type: String },
        filterName: { type: String },
        lang: { type: String },
        procInstanceName:{type: String},
        // langConfig: { type: Object },
        // actions: { type: Array },
        // samplesReload: { type: Boolean },
        selectedItems: { type: Array },
        // selectedAction: { type: Object },
        // prev: { type: Boolean },
        // next: { type: Boolean },
        // programsList: { type: Array },
        // tabView: { type: String },
        // windowOpenable: { type: String },
        // sopsPassed: { type: Boolean },
        actionBeingPerformedModel:{type:Object},
        localProceduresModels: { type: Object},
      };
    }
  
    constructor() {
      super()
      this.ready=false;
      this.selectedItems=[]
      this.config={}
      this.viewModelFromProcModel={}   
      this.actionBeingPerformedModel={}
      this.localProceduresModels=ProceduresModel
    }
    resetView(){
      this.selectedItems=[]
      this.ready=false;
    }
    // firstUpdated() {
    //   super.firstUpdated()
    //   alert('firstUpdated')
    // }
    //  updated(updates) {
    //   //alert('updated')
      
    //    if (updates.has('selectedItems')) {
    //    // this.GetViewData()  
    // //     this.resetView()
    //    }
    //  }
  // ${this.topCompositionBlock()} 
  // ${this.abstractBlock()}                        
  // ${this.resetView()}
  //${this.GetViewData()}
  // ${this.tabsBlock()}  
  render() {
      return html`
        <div>        
          ${this.topCompositionBlock()} 
          ${this.abstractBlock()}
          ${this.bottomCompositionBlock()}  
          <div style="display:none">
            ${this.ready===false&&this.viewModelFromProcModel.tabs===undefined ? html`${this.GetViewData()}`: nothing}            
          </div>
         
        </div>
      `
    }
    loadDialogs(){
      //console.log('loadDialogs')
      return html`
      ${this.credentialsDialog()}
    ${this.genericFormDialog()}
    ${this.reactivateObjectsDialog()}
    ${this.moduleEnvMonitMicroorganismsDialogAdd()}
    ${this.moduleEnvMonitMicroorganismsDialogRemove()}
    ${this.pointTemplate()}
    ${this.resultTemplate()}
    ${this.investigationTemplate()}
    ${this.filterName=="open" ?
      html`${this.decisionTemplate()}` : nothing
    }  
    `}
  topCompositionBlock(){
      return html`
      ${this.viewModelFromProcModel.topCompositions ?
        html`${this.viewModelFromProcModel.topCompositions.map(c => 
          html`<templates- id="topComp"
            .windowOpenable=${this.windowOpenable}
            .sopsPassed=${this.sopsPassed}
            .templateName=${c.templateName} .buttons=${c.buttons} .lang=${this.lang}
            .viewName=${this.viewName} .filterName=${this.filterName}
            .viewModelFromProcModel=${this.viewModelFromProcModel}
            .procInstanceName=${this.procInstanceName}
            @program-changedzzzz=${e=>this.gridItems=e.detail}
            @program-changed=${this.programChangedAction}
            @template-event=${this.templateEvent}></templates->           
          `
        )}` :
        nothing
      }
      `
  }

  programChangedAction(e){
    if (e===undefined){return}
    this.ready=true
    this.gridItems=e.detail

  }
  bottomCompositionBlock(){
  return html`
  ${this.viewModelFromProcModel.bottomCompositions ?
      html`${this.viewModelFromProcModel.bottomCompositions.map(c =>                             
      html`
          ${c.elementName=='envmonit-batch-sampleincubation' ? html`                               
          <div class="layout flex">
          <gridmodel-bottomcomp-sampleincubation id=${c.filter} .procName=${this.procName} .viewName=${this.viewName}
              .lang=${this.lang}
              .windowOpenable=${this.windowOpenable}
              .sopsPassed=${this.sopsPassed}
              .model=${c} .config=${this.config} .batchName=${this.batchName}
              @reload-samples=${e=>this[e.detail.method]()}
              @selected-incub=${this.filteringBatch}
              @selected-batch=${this.filteringIncub}
              @set-grid=${e=>this.setGrid(e.detail)}></gridmodel-bottomcomp-sampleincubation>
          </div>
          ` : nothing} 
          ${c.elementName=='chart' ? html`      
          <div class="layout flex">
          <gridmodel-bottomcomp-chart id=${c.filter} .procName=${this.procName} .viewName=${this.viewName}
          .selectedItems=${this.selectedItems} .lang=${this.lang}
          .model=${c} .config=${this.config}></gridmodel-bottomcomp-chart>
          </div>
      ` : nothing} 
      `
      )}` :
      html``
  }
  `
  }
  activeItemChanged(e){
    
    if (e===undefined){return}
    let d=true
    d=this.disabledByCertification(this.viewModelFromProcModel.langConfig.gridActionOnClick)     
    if (d) {
       //alert('View in read only mode')
      return
    }
    this.selectedItems=e.detail.value ? [e.detail.value] : []
    if (this.selectedItems.length>0&&this.viewModelFromProcModel.langConfig.gridActionOnClick!==undefined){
      //alert(this.viewModelFromProcModel.langConfig.gridActionOnClick.actionName)
      this.GetAlternativeViewData(this.viewModelFromProcModel.langConfig.gridActionOnClick)
    }

  }

  abstractBlock(){
    //console.log('abstractBlock')
  return html`
  ${this.loadDialogs()} 
  ${this.abstract ? 
      nothing :
      html`
        ${this.viewModelFromProcModel.topCompositions!==undefined ? nothing: html`${this.getTitle()}`}
      
        <div class="layout horizontal flex wrap">
            <div class="layout flex">          
            <div class="layout horizontal center flex wrap">
              ${this.getButton()}
            </div>
            ${this.ready ? 
              html`
              <vaadin-grid id="mainGrid" theme="row-dividers" column-reordering-allowed multi-sort 
                @active-item-changed=${this.activeItemChanged}
                .items=${this.gridItems} .selectedItems="${this.selectedItems}">
                ${this.gridList(this.viewModelFromProcModel)}
              </vaadin-grid>
              ` :
              html``
          }
          </div>   
         
  
          <audit-dialog @sign-audit=${this.setAudit} .actionBeingPerformedModel=${this.actionBeingPerformedModel} 
          .filterName=${this.filterName} .lang=${this.lang} .windowOpenable=${this.windowOpenable}
          .sopsPassed=${this.sopsPassed} .procInstanceName=${this.procInstanceName} .viewName=${this.viewName} 
          .viewModelFromProcModel=${this.viewModelFromProcModel}
          .selectedItems=${this.selectedItems} .config=${this.config}></audit-dialog>


        </div>
      `
  }    
  `
  }

//  ${this.resultTemplate()}

  xtabsBlock(){
    return html`
    ${this.viewModelFromProcModel.tabs ?
      html`
        <div class="layout vertical flex">
          <div class="layout horizontal flex">
            ${this.viewModelFromProcModel.tabs.map(t => 
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
            .procInstanceName=${this.procInstanceName}             
            .viewName=${this.viewName}  .viewModelFromProcModel=${this.viewModelFromProcModel}
            .config=${this.config}>${this.defaultTab()}</tabs-composition>
        </div>
        
      ` : nothing
    }
    `
  }
  xdefaultTab(){
    if (this.tabsComposition!=null){
      console.log('defaultTab')
      this.tabsComposition.ready=false
      this.tabsComposition.viewModelFromProcModel=this.viewModelFromProcModel.tabs[0]
    }

  }
  xselectTab(tab) {
    console.log('selectTab', tab)
    this.tabsComposition.viewModelFromProcModel = tab
    this.tabsComposition.ready=false
    this.tabsComposition.render()
    //this.tabsComposition.reload()
    //this.tabsComposition.grid.
  }

  get xtabsCompositionc() {return this.shadowRoot.querySelector("tabs-composition")}

//     <vaadin-grid id="mainGrid" theme="row-dividers" column-reordering-allowed multi-sort 
//     @active-item-changed=${e=>this.selectedItems=e.detail.value ? [e.detail.value] : []}
//     .items=${this.gridItems}
//     .selectedItems="${this.selectedItems}">
//     ${this.gridList()}
// </vaadin-grid>

    // this code is not longer need. We need to build the generic dialog template with generic fields instead!!! :)))
    // ${this.dateTemplate()}
    // ${this.selectedAction&&this.selectedAction.dialogInfo&&this.selectedAction.dialogInfo.fieldText&&this.selectedAction.dialogInfo.fieldText.comment ?
    // html`${this.commentTemplate()}` : nothing
    // }
    // ${this.langConfig&&this.langConfig.resultHeader ? 
    // html`${this.resultTemplate()}` :
    // nothing
    // }
    // ${this.langConfig&&this.langConfig.microorganismHeader ? 
    // html`${this.microorganismTemplate()}` :
    // nothing
    // }
    // ${this.langConfig&&this.viewName=="ProductionLots" ? 
    // html`${this.lotTemplate()}` :
    // nothing
    // }
    // ${this.langConfig&&this.viewName=="LogSamples" ? 
    // html`${this.pointTemplate()}` :
    // nothing
    // }
    // ${this.langConfig&&this.viewName=="PlatformInstruments" ? 
    // html`${this.newInstrumentsTemplate()}` :
    // nothing
    // }
    // ${this.langConfig&&this.viewName=="EventsInProgress" ? 
    // html`${this.instrumentEventTemplate()}` :
    // nothing
    // }  
    // ${this.langConfig&&this.viewName=="WhiteIpList" ? 
    // html`${this.newPlatformAdminWhiteIPListsTemplate()}` :
    // nothing
    // }
    // ${this.langConfig&&this.viewName=="BlackIpList" ? 
    // html`${this.newPlatformAdminBlackIPListsTemplate()}` :
    // nothing
    // }
    // ${this.langConfig&&this.viewName=="PlatformBusRules" ? 
    // html`${this.newPlatformAdminBusinessRulesTemplate()}` :
    // nothing
    // }

    get batchElement() {return this.shadowRoot.querySelector("gridmodel-bottomcomp-sampleincubation#active_batches")}
    get incubElement() {return this.shadowRoot.querySelector("gridmodel-bottomcomp-sampleincubation#samplesWithAnyPendingIncubation")}
    get grid() {return this.shadowRoot.querySelector("vaadin-grid#mainGrid")}
    get chart() {return this.shadowRoot.querySelector("google-chart")}   
    get templates() {return this.shadowRoot.querySelector("templates-#topComp")}
    get audit() {return this.shadowRoot.querySelector("audit-dialog")}    


   templateEvent(e) {
    console.log('templateEvent')
    if (e.detail.calledActionIdx >= 0) {
      this.selectedAction = ProceduresModel[this.procName][this.viewName].actions[e.detail.calledActionIdx]
      this.reload()
    }
  }

  }
  window.customElements.define('grid-with-buttons', GridWithButtons);
import { html, css, LitElement, nothing } from 'lit';
import { gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { Layouts, Alignment } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';

import '@trazit/cred-dialog'
import '../../gridmodel-bottomcomp-chart';

import '../templates-';
import '@trazit/tr-dialog/tr-dialog';
import { AuditFunctions} from '../Audit/AuditFunctions';
import {ButtonsFunctions} from '../Buttons/ButtonsFunctions';
import {GridFunctions} from '../grid_with_buttons/GridFunctions';
import {ModuleEnvMonitClientMethods} from '../../module_env_monit/ModuleEnvMonitClientMethods';
import { ProceduresModel } from '../../ProceduresModel';
import {TrazitGenericDialogs} from '../GenericDialogs/TrazitGenericDialogs';
import {TrazitReactivateObjectsDialog} from '../GenericDialogs/TrazitReactivateObjectsDialog';
import {TrazitEnterResultWithSpec} from '../GenericDialogs/TrazitEnterResultWithSpec';
import {ModuleEnvMonitDialogsMicroorganism} from '../../module_env_monit/Dialogs/ModuleEnvMonitDialogsMicroorganism';
import {TrazitInvestigationsDialog} from '../GenericDialogs/TrazitInvestigationsDialog';

import {TrazitCredentialsDialogs} from '../GenericDialogs/TrazitCredentialsDialogs';
import { TrazitTakePictureDialog } from '../GenericDialogs/TrazitTakePictureDialog';

import '../DragDropBox';
//

import '../Audit/audit-dialog';
export class DrapBox extends (TrazitTakePictureDialog(TrazitCredentialsDialogs(AuditFunctions(TrazitGenericDialogs(TrazitInvestigationsDialog(ModuleEnvMonitDialogsMicroorganism(TrazitEnterResultWithSpec(TrazitReactivateObjectsDialog((ModuleEnvMonitClientMethods(GridFunctions(ButtonsFunctions(LitElement))))))))))))) {
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
        procInstanceName: { type: String },
        viewModelFromProcModel: {type: Object},
        ready:{type: Boolean},
        viewName: { type: String },
        filterName: { type: String },
        lang: { type: String },
        selectedItems: { type: Array },
        actionBeingPerformedModel:{type:Object},
        localProceduresModels: { type: Object},
        masterData:{type: Object},
        contextMenuItems: { type: Array },
        useFakeData: {type: Boolean},
        data: { type: Array },
        dragdropboxdata: { type: Array }
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
      this.masterData={}
      this.contextMenuItems=[]
      this.useFakeData=false
      this.data=[]
      this.dragdropboxdata=[]
    }


    connectedCallback() {
      super.connectedCallback();
      window.addEventListener('dragdropboxdata-changed', this._onDragdropboxdataChanged.bind(this));
      this._checkSessionStorage();

      const draggableItems = this.shadowRoot.querySelectorAll('.draggable');
      draggableItems.forEach(item => {
        item.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
        item.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
        item.addEventListener('touchend', this.handleTouchEnd.bind(this), false);
      });      
    }
  
    handleTouchStart(event) {
      this.draggedElement = event.target;
      // Ajustar la posición inicial según la ubicación táctil
      const touch = event.touches[0];
      this.draggedElement.style.position = 'absolute';
      this.draggedElement.style.left = `${touch.clientX}px`;
      this.draggedElement.style.top = `${touch.clientY}px`;
    }
  
    handleTouchMove(event) {
      event.preventDefault();  // Prevenir el scroll
      if (!this.draggedElement) return;
      
      const touch = event.touches[0];
      this.draggedElement.style.left = `${touch.clientX}px`;
      this.draggedElement.style.top = `${touch.clientY}px`;
    }
  
    handleTouchEnd(event) {
      this.draggedElement = null;
    }
        
    disconnectedCallback() {
      window.removeEventListener('dragdropboxdata-changed', this._onDragdropboxdataChanged.bind(this));
      super.disconnectedCallback();
    }
  
    _onDragdropboxdataChanged() {
      const newData = JSON.parse(sessionStorage.getItem('dragdropboxdata'));
      this.dragdropboxdata = newData;
      this.refreshData(newData);
    }
  
    _checkSessionStorage() {
      const data = JSON.parse(sessionStorage.getItem('dragdropboxdata'));
      if (data && data !== this.dragdropboxdata) {
        this.dragdropboxdata = data;
        this.refreshData(data);
      }
    }

    firstUpdated() {
      if (this.useFakeData){
        this.data=this.viewModelFromProcModel.fakedata
      }else{ 
        this.filterPerformAction()
      }
      this.dragdropbox;
    }
  
    async filterPerformAction(e, flag) {
  
      await this.GetViewData(false)
      this.data=this.requestData
      console.log('getViewData', this.data)
    }
    

    resetView(){
      this.selectedItems=[]
      this.ready=false;
    }
    updated(changedProperties) {
      if (changedProperties.has('dragdropboxdata')) {
        this.refreshData(this.dragdropboxdata);
      }
      if (changedProperties.has('requestData')) {
        this.refreshData(this.requestData);
      }

      
    }
  
    refreshData(newData) {
      this.data = newData;
      this.refreshView();
    }
  
    refreshView() {
      if (this.dragdropbox!==null){
        this.dragdropbox.data=this.data      
        this.dragdropbox.refreshTables()
      }      
    }

    render(){
      return html`
      ${this.loadDialogs()}
        <dragdrop-box id="dragdropbox" .action=${this.actionModelForTable} .config=${this.config} .viewModelFromProcModel=${this.viewModelFromProcModel}
          .data=${this.data}
          .lang=${this.lang} .procName=${this.procName} .procInstanceName=${this.procInstanceName} .desktop=${this.desktop} > </dragdrop-box>
      `
    }
    get dragdropbox() {   
       //alert('get dragdropbox')
      return this.shadowRoot.querySelector("dragdrop-box#dragdropbox")    }
    
    renderWhenRequiresRefreshDueToMultipleViewsUsingIt(){
      return html`
        <div style='display:none;'>
          ${this.ready===false ? html`${this.GetViewData()}`: nothing}  
        </div>
        <dragdrop-box .action=${this.actionModelForTable} .config=${this.config} .viewModelFromProcModel=${this.viewModelFromProcModel}
          .data=${this.data}
          .lang=${this.lang} .procName=${this.procName} .procInstanceName=${this.procInstanceName} .desktop=${this.desktop} > </dragdrop-box>
      `
    }    
    
    renderOriginal() {
      return html`
      ${this.loadDialogs()}
        <div>      
          <div style="display:none">
            ${this.ready===false&&this.viewModelFromProcModel.tabs===undefined ? html`${this.GetViewData()}`: nothing}            
          </div>
         
        </div>
      `
    }
    loadDialogs(){
      //alert('loadDialogs')
      return html` 
      ${this.credentialsDialog()}
      ${this.genericFormDialogTemplate()}
      ${this.reactivateObjectsDialog()}
      ${this.moduleEnvMonitMicroorganismsDialogAdd()}
      ${this.moduleEnvMonitMicroorganismsDialogRemove()}
      ${this.pointTemplate()}
      ${this.resultTemplate()}
      ${this.takePictureFormDialog()}
      
      ${this.decisionTemplate()}
    `}

  setReady(){
    this.ready=true
  }

  contextMenuAction(e){
    //console.log(e.target)
    let selectedItem=e.target
    if (selectedItem) {
      //console.log(selectedItem.item)      
    }        
    this.actionMethod(e.detail.value.actionDef, e.detail.value.actionDef, null, null, this.selectedItems[0], false)
  }
  addContextMenu(){
    if (this.viewModelFromProcModel.enableContextMenu!==undefined||this.viewModelFromProcModel.enableContextMenu===false){
      return false
    }
    this.contextMenuItems=[]    
      let menuItem={}
      menuItem.component='hr'
      this.contextMenuItems.push(menuItem)
      if (this.viewModelFromProcModel.addActionsInContextMenu!==undefined&&this.viewModelFromProcModel.addActionsInContextMenu===true){
        this.viewModelFromProcModel.actions.forEach(action => {
          menuItem={}
          menuItem.text=action.button.title['label_'+this.lang]
          if ((action.button.requiresGridItemSelected===undefined||action.button.requiresGridItemSelected===true)&&(this.selectedItems===undefined||this.selectedItems.length==0)){
            menuItem.disabled=true
          }
          menuItem.actionDef=action
          this.contextMenuItems.push(menuItem)
        })
      }
      if (this.viewModelFromProcModel.actionsForContextMenu!==undefined){
        this.viewModelFromProcModel.actionsForContextMenu.forEach(action => {
          menuItem={}
          menuItem.text=action.button.title['label_'+this.lang]
          if ((action.button.requiresGridItemSelected===undefined||action.button.requiresGridItemSelected===true)&&(this.selectedItems===undefined||this.selectedItems.length==0)){
            menuItem.disabled=true
          }
          menuItem.actionDef=action
          this.contextMenuItems.push(menuItem)
        })
      }
      menuItem={}
      menuItem.component='hr'
      this.contextMenuItems.push(menuItem)    
    return true
    /*
    ${this.btnHidden(action) ? nothing : 
      html`${action.button ?
          html`${action.button.icon ?
          html`<mwc-icon-button 
              class="${action.button.class} disabled${this.btnDisabled(action, sectionModel)}"
              icon="${action.button.icon}" 
              title="${action.button.title['label_'+this.lang]}" 
              ?disabled=${this.btnDisabled(action, sectionModel)}
              ?hidden=${this.btnHidden(action)}
              @click=${()=>this.actionMethod(action, sectionModel, null, null, data, isProcManagement)}></mwc-icon-button>` :
    */
  }

//  ${this.resultTemplate()}
get rowTooltip() {
  return this.shadowRoot.querySelector("#rowTooltip")
}
  get xtabsCompositionc() {return this.shadowRoot.querySelector("tabs-composition")}

  get batchElement() {return this.shadowRoot.querySelector("gridmodel-bottomcomp-sampleincubation#active_batches")}
  get incubElement() {return this.shadowRoot.querySelector("gridmodel-bottomcomp-sampleincubation#samplesWithAnyPendingIncubation")}
  get grid() {return this.shadowRoot.querySelector("vaadin-grid#mainGrid")}
  get chart() {return this.shadowRoot.querySelector("google-chart")}   
  get templates() {return this.shadowRoot.querySelector("templates-#topComp")}
  get audit() {return this.shadowRoot.querySelector("audit-dialog")}    

  templateEvent(e) {
    console.log('templateEvent')
    if (e.detail.calledActionIdx >= 0) {
      this.selectedAction = ProceduresModel[this.procInstanceName][this.viewName].actions[e.detail.calledActionIdx]
      this.reload()
    }
  }

  showLockReason(i) {
    //alert('showLockReason', i)
    let labels = {
      "warning_reason_label_en": "Warning Reason", "warning_reason_label_es": "Razón Aviso",
      "locking_reason_label_en": "Locking Reason", "locking_reason_label_es": "Razón Bloqueo"
    }
    if (this.grid.items[i - 1].is_locked) {
      this.rowTooltip.style.backgroundColor = "#24C0EB"
      this.rowTooltip.style.visibility = "visible"
      let txtValue=labels['locking_reason_label_' + this.lang] + ": "
      if (this.grid.items[i - 1].locking_reason===undefined||this.grid.items[i - 1].locking_reason["message_" + this.lang]===undefined){
        txtValue=txtValue+"undefined"
      }else{
        txtValue=txtValue+this.grid.items[i - 1].locking_reason["message_" + this.lang]
      }
      this.rowTooltip.textContent = txtValue
    } else if (this.grid.items[i - 1].warning_reason) {
      this.rowTooltip.style.backgroundColor = "#D6E9F8"
      this.rowTooltip.style.visibility = "visible"
      let txtValue=labels['warning_reason_label_' + this.lang] + ": "
      if (this.grid.items[i - 1].warning_reason===undefined||this.grid.items[i - 1].warning_reason["message_" + this.lang]===undefined){
        txtValue=txtValue+"undefined"
      }else{
        txtValue=txtValue+this.grid.items[i - 1].warning_reason["message_" + this.lang]
      }
    }
  }

  hideLockReason() {
    this.rowTooltip.style.visibility = "hidden"
  }

  detailRenderer(result) {
    //console.log('detailRenderer', result)
    let labels = {
      "warning_reason_label_en": "Warning Reason", "warning_reason_label_es": "Razón Aviso",
      "locking_reason_label_en": "Locking Reason", "locking_reason_label_es": "Razón Bloqueo"
    }
    return html`
      <div style="text-align:center;font-size:12px">
        <p>${result.spec_eval ?
        html`${result.spec_eval == 'IN' ?
          html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>` :
          html`${result.spec_eval.toUpperCase().includes("OUT") && result.spec_eval.toUpperCase().includes("SPEC") ?
            html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>` :
            html`<mwc-icon style="color:orange">radio_button_checked</mwc-icon>`
            }`
          }` :
        html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
      }</p>
        <p>${this.lang == "en" ? "Method" : "Método"}: ${result.method_name} (${result.method_version})</p>
        <p>Range Rule: ${result.spec_rule_info[0].ruleRepresentation}</p>
        <p>Range Evaluation: ${result.spec_eval} (${result.spec_eval_detail})</p>
      ${result.is_locked ?
        html`<p style="color:rgb(255 8 8)">${labels['locking_reason_label_' + this.lang]}: ${result.locked_reason}</p>` : nothing
      }
        ${result.warning_reason ?
        html`<p style="color:#0085ff">${labels['warning_reason_label_' + this.lang]}: ${result.warning_reason["message_" + this.lang]}</p>` : nothing
      }
      </div>
    `
  }  

  setCellListener() {
    // alert('setCellListener')
    //console.log('setCellListener')
    if (this.grid===undefined||this.grid===null){return}
    this.rowTooltip.style.display = "block"
    this.rowTooltip.style.visibility = "hidden"
    this.rowTooltip.style.fontSize = "12px"
    this.rowTooltip.style.color = "white"
    let rows = this.grid.shadowRoot.querySelectorAll("tr[part=row]")
    rows.forEach((r, i) => {
      if (i > 0 && this.grid.items[i - 1]) {
        r.removeEventListener('mouseenter', () => this.showLockReason(i))
        r.removeEventListener('mouseleave', this.hideLockReason.bind(this))
      }
      if (i > 0 && this.grid.items[i - 1] && (this.grid.items[i - 1].is_locked || this.grid.items[i - 1].warning_reason)) {
        r.addEventListener('mouseenter', () => this.showLockReason(i))
        r.addEventListener('mouseleave', this.hideLockReason.bind(this))
      }
    })    
  }

  }
  window.customElements.define('drag-box', DrapBox);
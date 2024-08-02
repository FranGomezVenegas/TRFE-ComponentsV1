"use strict";(self.webpackChunk_trazit_tr_procedures=self.webpackChunk_trazit_tr_procedures||[]).push([[568],{"./src/components/DragDropBox/drag-box.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DrapBox:()=>DrapBox});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit-vaadin-helpers/dist/index.js"),_collaborne_lit_flexbox_literals__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@collaborne/lit-flexbox-literals/dist/index.js"),_Audit_AuditFunctions__WEBPACK_IMPORTED_MODULE_16__=(__webpack_require__("./node_modules/@material/mwc-button/mwc-button.js"),__webpack_require__("./node_modules/@material/mwc-icon-button/mwc-icon-button.js"),__webpack_require__("./node_modules/@material/mwc-textfield/mwc-textfield.js"),__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid.js"),__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid-column.js"),__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js"),__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js"),__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js"),__webpack_require__("./node_modules/@vaadin/vaadin-context-menu/vaadin-context-menu.js"),__webpack_require__("./.yalc/@trazit/cred-dialog/index.js"),__webpack_require__("./src/gridmodel-bottomcomp-chart.js"),__webpack_require__("./src/components/templates-.js"),__webpack_require__("./.yalc/@trazit/cred-dialog/.yalc/@trazit/tr-dialog/tr-dialog.js"),__webpack_require__("./src/components/Audit/AuditFunctions.js")),_Buttons_ButtonsFunctions__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__("./src/components/Buttons/ButtonsFunctions.js"),_grid_with_buttons_GridFunctions__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__("./src/components/grid_with_buttons/GridFunctions.js"),_module_env_monit_ModuleEnvMonitClientMethods__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__("./src/module_env_monit/ModuleEnvMonitClientMethods.js"),_ProceduresModel__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__("./src/ProceduresModel.js"),_GenericDialogs_TrazitGenericDialogs__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__("./src/components/GenericDialogs/TrazitGenericDialogs.js"),_GenericDialogs_TrazitReactivateObjectsDialog__WEBPACK_IMPORTED_MODULE_22__=__webpack_require__("./src/components/GenericDialogs/TrazitReactivateObjectsDialog.js"),_GenericDialogs_TrazitEnterResultWithSpec__WEBPACK_IMPORTED_MODULE_23__=__webpack_require__("./src/components/GenericDialogs/TrazitEnterResultWithSpec.js"),_module_env_monit_Dialogs_ModuleEnvMonitDialogsMicroorganism__WEBPACK_IMPORTED_MODULE_24__=__webpack_require__("./src/module_env_monit/Dialogs/ModuleEnvMonitDialogsMicroorganism.js"),_GenericDialogs_TrazitInvestigationsDialog__WEBPACK_IMPORTED_MODULE_25__=__webpack_require__("./src/components/GenericDialogs/TrazitInvestigationsDialog.js"),_GenericDialogs_TrazitCredentialsDialogs__WEBPACK_IMPORTED_MODULE_26__=__webpack_require__("./src/components/GenericDialogs/TrazitCredentialsDialogs.js"),_GenericDialogs_TrazitTakePictureDialog__WEBPACK_IMPORTED_MODULE_27__=__webpack_require__("./src/components/GenericDialogs/TrazitTakePictureDialog.js");__webpack_require__("./src/components/DragDropBox/index.js"),__webpack_require__("./src/components/Audit/audit-dialog.js");class DrapBox extends((0,_GenericDialogs_TrazitTakePictureDialog__WEBPACK_IMPORTED_MODULE_27__.O)((0,_GenericDialogs_TrazitCredentialsDialogs__WEBPACK_IMPORTED_MODULE_26__.s)((0,_Audit_AuditFunctions__WEBPACK_IMPORTED_MODULE_16__.t)((0,_GenericDialogs_TrazitInvestigationsDialog__WEBPACK_IMPORTED_MODULE_25__.O)((0,_module_env_monit_Dialogs_ModuleEnvMonitDialogsMicroorganism__WEBPACK_IMPORTED_MODULE_24__.E)((0,_GenericDialogs_TrazitEnterResultWithSpec__WEBPACK_IMPORTED_MODULE_23__.F)((0,_GenericDialogs_TrazitReactivateObjectsDialog__WEBPACK_IMPORTED_MODULE_22__.T)((0,_GenericDialogs_TrazitGenericDialogs__WEBPACK_IMPORTED_MODULE_21__.f)((0,_module_env_monit_ModuleEnvMonitClientMethods__WEBPACK_IMPORTED_MODULE_19__.a)((0,_grid_with_buttons_GridFunctions__WEBPACK_IMPORTED_MODULE_18__.G)((0,_Buttons_ButtonsFunctions__WEBPACK_IMPORTED_MODULE_17__.n)(lit__WEBPACK_IMPORTED_MODULE_0__.WF)))))))))))){static get styles(){return[_collaborne_lit_flexbox_literals__WEBPACK_IMPORTED_MODULE_2__.G6,_collaborne_lit_flexbox_literals__WEBPACK_IMPORTED_MODULE_2__.C1,lit__WEBPACK_IMPORTED_MODULE_0__.AH`
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
        `]}static get properties(){return{model:{type:Object},config:{type:Object},procInstanceName:{type:String},viewModelFromProcModel:{type:Object},ready:{type:Boolean},viewName:{type:String},filterName:{type:String},lang:{type:String},selectedItems:{type:Array},actionBeingPerformedModel:{type:Object},localProceduresModels:{type:Object},masterData:{type:Object},contextMenuItems:{type:Array},useFakeData:{type:Boolean},data:{type:Array}}}constructor(){super(),this.ready=!1,this.selectedItems=[],this.config={},this.viewModelFromProcModel={},this.actionBeingPerformedModel={},this.localProceduresModels=_ProceduresModel__WEBPACK_IMPORTED_MODULE_20__.m,this.masterData={},this.contextMenuItems=[],this.useFakeData=!0,this.data=[]}firstUpdated(){this.useFakeData?this.data=this.viewModelFromProcModel.fakedata:this.filterPerformAction()}async filterPerformAction(e,flag){await this.GetViewData(!1),this.data=this.requestData}resetView(){this.selectedItems=[],this.ready=!1}render(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
        <dragdrop-box .action=${this.actionModelForTable} .config=${this.config} .viewModelFromProcModel=${this.viewModelFromProcModel}
          .data=${this.data}
          .lang=${this.lang} .procName=${this.procName} .procInstanceName=${this.procInstanceName} .desktop=${this.desktop} > </dragdrop-box>
      `}renderWhenRequiresRefreshDueToMultipleViewsUsingIt(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div style='display:none;'>
          ${!1===this.ready?lit__WEBPACK_IMPORTED_MODULE_0__.qy`${this.GetViewData()}`:lit__WEBPACK_IMPORTED_MODULE_0__.s6}  
        </div>
        <dragdrop-box .action=${this.actionModelForTable} .config=${this.config} .viewModelFromProcModel=${this.viewModelFromProcModel}
          .data=${this.data}
          .lang=${this.lang} .procName=${this.procName} .procInstanceName=${this.procInstanceName} .desktop=${this.desktop} > </dragdrop-box>
      `}renderOriginal(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div>      
          ${this.topCompositionBlock()} 
          ${this.abstractBlock()}
          ${this.bottomCompositionBlock()}  
          <div style="display:none">
            ${!1===this.ready&&void 0===this.viewModelFromProcModel.tabs?lit__WEBPACK_IMPORTED_MODULE_0__.qy`${this.GetViewData()}`:lit__WEBPACK_IMPORTED_MODULE_0__.s6}            
          </div>
         
        </div>
      `}loadDialogs(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
      ${this.credentialsDialog()}
      ${this.genericFormDialog()}
      ${this.reactivateObjectsDialog()}
      ${this.moduleEnvMonitMicroorganismsDialogAdd()}
      ${this.moduleEnvMonitMicroorganismsDialogRemove()}
      ${this.pointTemplate()}
      ${this.resultTemplate()}
      ${this.takePictureFormDialog()}
      
      ${this.investigationTemplate()}
      ${"open"==this.filterName?lit__WEBPACK_IMPORTED_MODULE_0__.qy`${this.decisionTemplate()}`:lit__WEBPACK_IMPORTED_MODULE_0__.s6}  
      ${this.decisionTemplate()}
    `}topCompositionBlock(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
      ${this.viewModelFromProcModel.topCompositions?lit__WEBPACK_IMPORTED_MODULE_0__.qy`${this.viewModelFromProcModel.topCompositions.map((c=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`<templates- id="topComp"
            .windowOpenable=${this.windowOpenable}
            .sopsPassed=${this.sopsPassed}
            .templateName=${c.templateName} .buttons=${c.buttons} .lang=${this.lang}
            .viewName=${this.viewName} .filterName=${this.filterName}
            .viewModelFromProcModel=${this.viewModelFromProcModel}
            .procInstanceName=${this.procInstanceName}
            @program-changedzzzz=${e=>this.gridItems=e.detail}
            @program-changed=${this.programChangedAction}
            @template-event=${this.templateEvent}></templates->           
          `))}`:lit__WEBPACK_IMPORTED_MODULE_0__.s6}
      `}setReady(){this.ready=!0}programChangedAction(e){void 0!==e&&(this.ready=!0,this.gridItems=e.detail)}bottomCompositionBlock(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
  ${this.viewModelFromProcModel.bottomCompositions?lit__WEBPACK_IMPORTED_MODULE_0__.qy`${this.viewModelFromProcModel.bottomCompositions.map((c=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`
          ${"envmonit-batch-sampleincubation"==c.elementName?lit__WEBPACK_IMPORTED_MODULE_0__.qy`                               
          <div class="layout flex">
          <gridmodel-bottomcomp-sampleincubation id=${c.filter} .procInstanceName=${this.procInstanceName} .viewName=${this.viewName}
              .lang=${this.lang}
              .windowOpenable=${this.windowOpenable}
              .sopsPassed=${this.sopsPassed}
              .model=${c} .config=${this.config} .batchName=${this.batchName}
              @reload-samples=${e=>this[e.detail.method]()}
              @selected-incub=${this.filteringBatch}
              @selected-batch=${this.filteringIncub}
              @set-grid=${e=>this.setGrid(e.detail)}></gridmodel-bottomcomp-sampleincubation>
          </div>
          `:lit__WEBPACK_IMPORTED_MODULE_0__.s6} 
          ${"chart"==c.elementName?lit__WEBPACK_IMPORTED_MODULE_0__.qy`      
          <div class="layout flex">
          <gridmodel-bottomcomp-chart id=${c.filter} .procInstanceName=${this.procInstanceName} .viewName=${this.viewName}
          .selectedItems=${this.selectedItems} .lang=${this.lang}
          .model=${c} .config=${this.config}></gridmodel-bottomcomp-chart>
          </div>
      `:lit__WEBPACK_IMPORTED_MODULE_0__.s6} 
      `))}`:lit__WEBPACK_IMPORTED_MODULE_0__.qy``}
  `}activeItemChanged(e){if(void 0===e)return;let d=!0;d=this.disabledByCertification(this.viewModelFromProcModel.langConfig.gridActionOnClick),d||(this.selectedItems=e.detail.value?[e.detail.value]:[],this.selectedItems.length>0&&void 0!==this.viewModelFromProcModel.langConfig.gridActionOnClick&&this.GetAlternativeViewData(this.viewModelFromProcModel.langConfig.gridActionOnClick))}abstractBlock(){let addContextMenu=this.addContextMenu();return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
  ${this.loadDialogs()} 
  ${this.abstract?lit__WEBPACK_IMPORTED_MODULE_0__.s6:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
        ${void 0!==this.viewModelFromProcModel.topCompositions?lit__WEBPACK_IMPORTED_MODULE_0__.s6:lit__WEBPACK_IMPORTED_MODULE_0__.qy`${this.getTitle()}`}
      
        <div class="layout horizontal flex wrap">
            <div class="layout flex">          
            <div class="layout horizontal center flex wrap">
              ${this.getButton()}
            </div>
            ${this.ready?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
              ${void 0!==addContextMenu&&!0===addContextMenu?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                <vaadin-context-menu .items=${this.contextMenuItems} @item-selected="${this.contextMenuAction}">
                <vaadin-grid id="mainGrid" theme="row-dividers" column-reordering-allowed multi-sort 
                  @active-item-changed=${this.activeItemChanged}
                  .items=${this.gridItems} .selectedItems="${this.selectedItems}"
                  ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.O)(this.detailRenderer)}
                  ${this.setCellListener()}                  
                >
                  ${this.gridList(this.viewModelFromProcModel)}
                </vaadin-grid>
                </vaadin-context-menu>`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                <vaadin-grid id="mainGrid" theme="row-dividers" column-reordering-allowed multi-sort 
                @active-item-changed=${this.activeItemChanged}
                .items=${this.gridItems} .selectedItems="${this.selectedItems}"
                ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.O)(this.detailRenderer)}
                ${this.setCellListener()}                
                >
                ${this.gridList(this.viewModelFromProcModel)}
              </vaadin-grid>`}
              
              <div id="rowTooltip">&nbsp;</div>
              `:lit__WEBPACK_IMPORTED_MODULE_0__.qy``}
          </div>   
          <audit-dialog @sign-audit=${this.setAudit} .actionBeingPerformedModel=${this.actionBeingPerformedModel} 
          .filterName=${this.filterName} .lang=${this.lang} .windowOpenable=${this.windowOpenable}
          .sopsPassed=${this.sopsPassed} .procInstanceName=${this.procInstanceName} .viewName=${this.viewName} 
          .viewModelFromProcModel=${this.viewModelFromProcModel}
          .selectedItems=${this.selectedItems} .config=${this.config}></audit-dialog>


        </div>
      `}    
  `}contextMenuAction(e){e.target;this.actionMethod(e.detail.value.actionDef,e.detail.value.actionDef,null,null,this.selectedItems[0],!1)}addContextMenu(){if(void 0!==this.viewModelFromProcModel.enableContextMenu||!1===this.viewModelFromProcModel.enableContextMenu)return!1;this.contextMenuItems=[];let menuItem={component:"hr"};return this.contextMenuItems.push(menuItem),void 0!==this.viewModelFromProcModel.addActionsInContextMenu&&!0===this.viewModelFromProcModel.addActionsInContextMenu&&this.viewModelFromProcModel.actions.forEach((action=>{menuItem={},menuItem.text=action.button.title["label_"+this.lang],void 0!==action.button.requiresGridItemSelected&&!0!==action.button.requiresGridItemSelected||void 0!==this.selectedItems&&0!=this.selectedItems.length||(menuItem.disabled=!0),menuItem.actionDef=action,this.contextMenuItems.push(menuItem)})),void 0!==this.viewModelFromProcModel.actionsForContextMenu&&this.viewModelFromProcModel.actionsForContextMenu.forEach((action=>{menuItem={},menuItem.text=action.button.title["label_"+this.lang],void 0!==action.button.requiresGridItemSelected&&!0!==action.button.requiresGridItemSelected||void 0!==this.selectedItems&&0!=this.selectedItems.length||(menuItem.disabled=!0),menuItem.actionDef=action,this.contextMenuItems.push(menuItem)})),menuItem={},menuItem.component="hr",this.contextMenuItems.push(menuItem),!0}get rowTooltip(){return this.shadowRoot.querySelector("#rowTooltip")}get xtabsCompositionc(){return this.shadowRoot.querySelector("tabs-composition")}get batchElement(){return this.shadowRoot.querySelector("gridmodel-bottomcomp-sampleincubation#active_batches")}get incubElement(){return this.shadowRoot.querySelector("gridmodel-bottomcomp-sampleincubation#samplesWithAnyPendingIncubation")}get grid(){return this.shadowRoot.querySelector("vaadin-grid#mainGrid")}get chart(){return this.shadowRoot.querySelector("google-chart")}get templates(){return this.shadowRoot.querySelector("templates-#topComp")}get audit(){return this.shadowRoot.querySelector("audit-dialog")}templateEvent(e){console.log("templateEvent"),e.detail.calledActionIdx>=0&&(this.selectedAction=_ProceduresModel__WEBPACK_IMPORTED_MODULE_20__.m[this.procInstanceName][this.viewName].actions[e.detail.calledActionIdx],this.reload())}showLockReason(i){let labels={warning_reason_label_en:"Warning Reason",warning_reason_label_es:"Razón Aviso",locking_reason_label_en:"Locking Reason",locking_reason_label_es:"Razón Bloqueo"};if(this.grid.items[i-1].is_locked){this.rowTooltip.style.backgroundColor="#24C0EB",this.rowTooltip.style.visibility="visible";let txtValue=labels["locking_reason_label_"+this.lang]+": ";void 0===this.grid.items[i-1].locking_reason||void 0===this.grid.items[i-1].locking_reason["message_"+this.lang]?txtValue+="undefined":txtValue+=this.grid.items[i-1].locking_reason["message_"+this.lang],this.rowTooltip.textContent=txtValue}else if(this.grid.items[i-1].warning_reason){this.rowTooltip.style.backgroundColor="#D6E9F8",this.rowTooltip.style.visibility="visible";let txtValue=labels["warning_reason_label_"+this.lang]+": ";void 0===this.grid.items[i-1].warning_reason||void 0===this.grid.items[i-1].warning_reason["message_"+this.lang]?txtValue+="undefined":txtValue+=this.grid.items[i-1].warning_reason["message_"+this.lang]}}hideLockReason(){this.rowTooltip.style.visibility="hidden"}detailRenderer(result){let labels={warning_reason_label_en:"Warning Reason",warning_reason_label_es:"Razón Aviso",locking_reason_label_en:"Locking Reason",locking_reason_label_es:"Razón Bloqueo"};return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
      <div style="text-align:center;font-size:12px">
        <p>${result.spec_eval?lit__WEBPACK_IMPORTED_MODULE_0__.qy`${"IN"==result.spec_eval?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<mwc-icon style="color:green">radio_button_checked</mwc-icon>`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`${result.spec_eval.toUpperCase().includes("OUT")&&result.spec_eval.toUpperCase().includes("SPEC")?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<mwc-icon style="color:red">radio_button_checked</mwc-icon>`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`<mwc-icon style="color:orange">radio_button_checked</mwc-icon>`}`}`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`}</p>
        <p>${"en"==this.lang?"Method":"Método"}: ${result.method_name} (${result.method_version})</p>
        <p>Range Rule: ${result.spec_rule_info[0].ruleRepresentation}</p>
        <p>Range Evaluation: ${result.spec_eval} (${result.spec_eval_detail})</p>
      ${result.is_locked?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<p style="color:rgb(255 8 8)">${labels["locking_reason_label_"+this.lang]}: ${result.locked_reason}</p>`:lit__WEBPACK_IMPORTED_MODULE_0__.s6}
        ${result.warning_reason?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<p style="color:#0085ff">${labels["warning_reason_label_"+this.lang]}: ${result.warning_reason["message_"+this.lang]}</p>`:lit__WEBPACK_IMPORTED_MODULE_0__.s6}
      </div>
    `}setCellListener(){if(void 0===this.grid||null===this.grid)return;this.rowTooltip.style.display="block",this.rowTooltip.style.visibility="hidden",this.rowTooltip.style.fontSize="12px",this.rowTooltip.style.color="white",this.grid.shadowRoot.querySelectorAll("tr[part=row]").forEach(((r,i)=>{i>0&&this.grid.items[i-1]&&(r.removeEventListener("mouseenter",(()=>this.showLockReason(i))),r.removeEventListener("mouseleave",this.hideLockReason.bind(this))),i>0&&this.grid.items[i-1]&&(this.grid.items[i-1].is_locked||this.grid.items[i-1].warning_reason)&&(r.addEventListener("mouseenter",(()=>this.showLockReason(i))),r.addEventListener("mouseleave",this.hideLockReason.bind(this)))}))}}window.customElements.define("drag-box",DrapBox)}}]);
//# sourceMappingURL=568.258cb050.iframe.bundle.js.map
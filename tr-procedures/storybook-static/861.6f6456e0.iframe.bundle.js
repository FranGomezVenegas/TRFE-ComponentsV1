"use strict";(self.webpackChunk_trazit_tr_procedures=self.webpackChunk_trazit_tr_procedures||[]).push([[861],{"./.yalc/@trazit/cred-dialog/.yalc/@trazit/common-core/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>CommonCore,k:()=>commonLangConfig});var lit=__webpack_require__("./node_modules/lit/index.js");const commonLangConfig={cancelDialogButton:{label_en:"Cancel",label_es:"Cancelar"},confirmDialogButton:{label_en:"Accept",label_es:"Aceptar"},closeDialogButton:{label_en:"Close",label_es:"Cerrar"},confirmActionPhrase:{label_en:"Are you sure you want to continue doing",label_es:"¿Está seguro que desea continuar aplicando"}};class CommonCore extends lit.WF{static get properties(){return{config:{type:Object},flag:{type:String},lang:{type:String},fieldErrMsg:{type:Object},desktop:{type:Boolean},userName:{type:String},headerInfo:{type:Object}}}constructor(){super(),this.config={},this.userName="",this.lang="en"}firstUpdated(){let resizeTimer;window.addEventListener("resize",(()=>{clearTimeout(resizeTimer),resizeTimer=setTimeout((()=>{this.resizeElements()}),500)}),!0),this.updateComplete.then((()=>{this.resizeElements(),0==this.config.local||window.process||(this.localToast=document.createElement("div"),this.localToast.style.position="fixed",this.localToast.style.bottom="10px",this.localToast.style.left="10px",this.localToast.style.padding="5px",this.localToast.style.backgroundColor="black",this.localToast.style.color="white",this.localToast.style.fontSize="12px",this.localToast.style.maxWidth="98vw",this.localToast.style.display="none",this.localToast.style.zIndex="999",this.shadowRoot.appendChild(this.localToast))})),0==this.config.local||window.process||(this.addEventListener("success",(e=>{this.showNotif(e)})),this.addEventListener("error",(e=>{this.showNotif(e),this.localToast.style.backgroundColor="#a33"})))}showNotifOld(e){this.localToast.textContent=e.detail.message||e.detail["message_"+this.lang],this.localToast.textContent&&(this.localToast.style.display="block",setTimeout((()=>this.localToast.style.display="none"),4e3))}showNotif(e){if(console.log("showNotif",e),void 0===e.detail.is_error)return;let msgContent=void 0!==e.detail["message_"+this.lang]?e.detail["message_"+this.lang]:e.detail.message;return this.localToast.textContent=msgContent,this.localToast.textContent&&!0===e.detail.is_error?(this.localToast.style.backgroundColor="#b22222",this.localToast.style.display="block",this.localToast.style.zIndex="999",void setTimeout((()=>this.localToast.style.display="none"),4e3)):(this.localToast.style.backgroundColor="#0085ff",this.localToast.style.display="block",this.localToast.style.zIndex="999",void setTimeout((()=>this.localToast.style.display="none"),4e3))}resizeElements(){let wScreen=document.documentElement.clientWidth;this.desktop=wScreen>460}updated(updates){updates.has("config")&&"{}"!=JSON.stringify(this.config)&&sessionStorage.getItem("userSession")&&this.authorized(),updates.has("lang")&&(this.changeFlag(),this.dispatchEvent(new CustomEvent("change-lang",{detail:{lang:this.lang},bubbles:!0,composed:!0})))}authorized(){console.log(JSON.parse(sessionStorage.getItem("userSession"))),this.userName=JSON.parse(sessionStorage.getItem("userSession")).userName,this.headerInfo=JSON.parse(sessionStorage.getItem("userSession")).header_info,console.log("this.headerInfo",this.headerInfo)}fetchApi(urlParams,feedback=!0){let log=!0;return urlParams.toString().toUpperCase().includes("QUERI")&&(log=!1),log=!0,console.log("fetchApi, log",log,"urlParams",urlParams,urlParams.toString().toUpperCase()),urlParams+="&isForTesting="+this.config.isForTesting,this.dispatchEvent(new CustomEvent("set-activity",{bubbles:!0,composed:!0})),fetch(urlParams).then((async r=>{if(200==r.status)return r.json();throw await r.json()})).then((j=>(this.refreshMasterData(j),feedback&&this.dispatchEvent(new CustomEvent("success",{detail:{...j,log},bubbles:!0,composed:!0})),j))).catch((e=>"Unexpected end of JSON input"==e.message?void this.dispatchEvent(new CustomEvent("error",{detail:{...e},bubbles:!0,composed:!0})):(this.dispatchEvent(new CustomEvent("error",{detail:{...e,log},bubbles:!0,composed:!0})),this.error(e),e)))}refreshMasterData(endPointResponse){if(void 0===this.procInstanceName||void 0===endPointResponse||void 0===endPointResponse.master_data)return;let userSession=JSON.parse(sessionStorage.getItem("userSession"));void 0!==endPointResponse.master_data&&(userSession.procedures_list.procedures[this.procInstanceName].master_data=endPointResponse.master_data,sessionStorage.setItem("userSession",JSON.stringify(userSession)))}fetchApiPost(urlParams,feedback=!0,formData2){let log=!0;urlParams.toString().toUpperCase().includes("QUERI")&&(log=!1),log=!0;const formData=new FormData;return formData.append("dbUserName",formData2[0]),formData.append("dbUserPassword",formData2[1]),console.log("fetchApi, log",log,"urlParams",urlParams,urlParams.toString().toUpperCase()),urlParams+="&isForTesting="+this.config.isForTesting,this.dispatchEvent(new CustomEvent("set-activity",{bubbles:!0,composed:!0})),fetch(urlParams,{method:"POST",body:formData}).then((async r=>{if(200==r.status)return r.json();throw await r.json()})).then((j=>(feedback&&this.dispatchEvent(new CustomEvent("success",{detail:{...j,log},bubbles:!0,composed:!0})),j))).catch((e=>"Unexpected end of JSON input"==e.message?void this.dispatchEvent(new CustomEvent("error",{detail:{...e},bubbles:!0,composed:!0})):(this.dispatchEvent(new CustomEvent("error",{detail:{...e,log},bubbles:!0,composed:!0})),this.error(e),e)))}error(e){}showPwd(e){-1==e.pointerId&&(e.target.type="password"==e.target.type?"text":"password")}changeLang(){return"en"==this.flag?(this.lang="en",this.flag="es"):(this.lang="es",this.flag="en"),this.flag}changeFlag(){"en"==this.lang?this.flag="es":this.flag="en"}}},"./.yalc/@trazit/cred-dialog/.yalc/@trazit/tr-dialog/tr-dialog.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var lit=__webpack_require__("./node_modules/lit/index.js"),constants=__webpack_require__("./node_modules/@material/dialog/constants.js"),class_map=__webpack_require__("./node_modules/lit/directives/class-map.js"),mwc_dialog=__webpack_require__("./node_modules/@material/mwc-dialog/mwc-dialog.js");__webpack_require__("./node_modules/@material/mwc-button/mwc-button.js"),__webpack_require__("./node_modules/@material/mwc-icon/mwc-icon.js");class TrDialog extends mwc_dialog.l{static get styles(){return[super.styles,lit.AH`
      mwc-icon.corner {
        cursor: pointer;
        --mdc-icon-size: 15px;
        margin: auto 5px;
        color: rgb(94, 145, 186);
      }
      ::slotted(mwc-icon) {
        cursor: pointer;
        --mdc-icon-size: 15px;
      }
      mwc-icon[hidden] {
        display: none;
      }
      div[hidden] {
        display: none;
      }
      /*Resizeable*/

      .mdc-dialog__surface .resizer-right {
        width: 5px;
        height: 100%;
        background: transparent;
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: e-resize;
      }

      .mdc-dialog__surface .resizer-bottom {
        width: 100%;
        height: 5px;
        background: transparent;
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: n-resize;
      }

      .mdc-dialog__surface .resizer-both {
        width: 5px;
        height: 5px;
        background: transparent;
        z-index: 10;
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: nw-resize;
      }

      /*NOSELECT*/

      .mdc-dialog__surface * {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                        supported by Chrome and Opera */
      }

      .mdc-dialog__surface {
        max-width: 100% !important;
      }

      .popup-header {
        cursor: move;
      }
      `]}render(){const classes={[constants.Y7.STACKED]:this.stacked};let heading=lit.qy``;this.heading&&(heading=this.renderHeading());const actionsClasses={"mdc-dialog__actions":!this.hideActions};return lit.qy`
    <style>
      :host {
        --mdc-shape-medium: ${this.dialogShape};
        --mdc-dialog-z-index: ${this.zIndex};
      }
    </style>
    <div class="mdc-dialog ${(0,class_map.H)(classes)}" role="alertdialog" aria-modal="true" aria-labelledby="title"
      aria-describedby="content">
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface" style="top: 0px; left: 0px">
          ${heading}
          <div id="content" class="mdc-dialog__content">
            <slot id="contentSlot"></slot>
          </div>
          <footer id="actions" class="${(0,class_map.H)(actionsClasses)}">
            <span>
              <slot name="secondaryAction"></slot>
            </span>
            <span>
              <slot name="primaryAction"></slot>
            </span>
          </footer>
          ${this.cornerButton()}
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    </div>`}get mdcDialog(){return this.shadowRoot.querySelector(".mdc-dialog")}get mdcScrim(){return this.shadowRoot.querySelector(".mdc-dialog__scrim")}get dialogSurface(){return this.shadowRoot.querySelector(".mdc-dialog__surface")}get dialogContent(){return this.shadowRoot.querySelector("#content")}get dialogHeader(){return this.shadowRoot.querySelector(".popup-header")}static get properties(){return{dialogShape:{type:String},zoomLabel:{type:String},expandLabel:{type:String},hideMin:{type:Boolean,reflect:!0},hideZoom:{type:Boolean,reflect:!0},hideXtoClose:{type:Boolean,reflect:!0},zIndex:{type:Number}}}constructor(){super(),this.dialogShape="5px",this.zoomLabel="zoom_out_map",this.expandLabel="expand_more",this.hideMin=!1,this.hideZoom=!1,this.hideXtoClose=!1,this.top="0px",this.left="0px",this.width="0px",this.height="0px",this.zIndex=7}firstUpdated(){super.firstUpdated(),this.shadowRoot.querySelector(".mdc-dialog__surface").style.padding="20px",this.myinitialize()}myinitialize(){this.initResizeElement(),this.initDragElement()}cornerButton(){return lit.qy`
      <div class="popup-header" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 30px;">
        <div style="position: absolute; top: 10px; left: 10px;">
          <slot name="topLeft"></slot>
        </div>
        <div style="position: absolute; top: 10px; right: 10px;">
          <slot name="icon1" style="margin-right: 5px;"></slot>
          <mwc-icon ?hidden=${this.hideMin} class="corner" @click=${this.minimize}>${this.expandLabel}</mwc-icon>
          <mwc-icon ?hidden=${this.hideZoom} class="corner" @click=${this.zoomOut}>${this.zoomLabel}</mwc-icon>
          <mwc-icon ?hidden=${this.hideXtoClose} class="corner" dialogAction="decline">close</mwc-icon>
        </div>
      </div>
    `}show(){void 0!==this.dialogContent&&null!==this.dialogContent&&(this.dialogContent.style.overflow="auto"),void 0!==this.dialogSurface&&null!==this.dialogSurface&&(this.dialogSurface.style.overflow="auto",this.dialogSurface.style.top="0",this.dialogSurface.style.height="auto"),this.expandLabel="expand_more",super.show()}initResizeElement(){let startX,startY,startWidth,startHeight,parentPopup=null,resizer=null,right=document.createElement("div");right.className="resizer-right",this.dialogSurface.appendChild(right),right.addEventListener("mousedown",initDrag,!1),right.parentPopup=this.dialogSurface;let bottom=document.createElement("div");bottom.className="resizer-bottom",this.dialogSurface.appendChild(bottom),bottom.addEventListener("mousedown",initDrag,!1),bottom.parentPopup=this.dialogSurface;let both=document.createElement("div");function initDrag(e){parentPopup=this.parentPopup,resizer=this,startX=e.clientX,startY=e.clientY,startWidth=parseInt(document.defaultView.getComputedStyle(parentPopup).width,10),startHeight=parseInt(document.defaultView.getComputedStyle(parentPopup).height,10),document.documentElement.addEventListener("mousemove",doDrag,!1),document.documentElement.addEventListener("mouseup",stopDrag,!1)}function doDrag(e){(resizer.classList.contains("resizer-right")||resizer.classList.contains("resizer-both"))&&(parentPopup.style.width=startWidth+2*(e.clientX-startX)+"px"),(resizer.classList.contains("resizer-bottom")||resizer.classList.contains("resizer-both"))&&(parentPopup.style.height=startHeight+2*(e.clientY-startY)+"px")}function stopDrag(){document.documentElement.removeEventListener("mousemove",doDrag,!1),document.documentElement.removeEventListener("mouseup",stopDrag,!1)}both.className="resizer-both",this.dialogSurface.appendChild(both),both.addEventListener("mousedown",initDrag,!1),both.parentPopup=this.dialogSurface}initDragElement(){let pos1=0,pos2=0,pos3=0,pos4=0,element=null,currentZIndex=100;function elementDrag(e){element&&(e=e||window.event,pos1=pos3-e.clientX,pos2=pos4-e.clientY,pos3=e.clientX,pos4=e.clientY,element.style.top=parseInt(element.style.top,10)-pos2+"px",element.style.left=parseInt(element.style.left,10)-pos1+"px")}function closeDragElement(){document.onmouseup=null,document.onmousemove=null}this.dialogSurface.onmousedown=function(){this.style.zIndex=""+ ++currentZIndex},this.dialogHeader&&(this.dialogHeader.parentPopup=this.dialogSurface,this.dialogHeader.onmousedown=function dragMouseDown(e){element=this.parentPopup,element.style.zIndex=""+ ++currentZIndex,e=e||window.event,pos3=e.clientX,pos4=e.clientY,document.onmouseup=closeDragElement,document.onmousemove=elementDrag})}minimize(){this.dialogSurface.style.minWidth="auto",this.mdcDialog.style.minWidth="auto",this.dialogShape="5px",this.dialogSurface.style.height="auto",this.mdcDialog.style.height="100%",this.mdcScrim.style.height="100%",this.zoomLabel="zoom_out_map","expand_more"==this.expandLabel?(this.dialogContent.style.overflow="hidden",this.dialogSurface.style.overflow="hidden",this.dialogSurface.style.top="45vh",this.dialogSurface.style.height="0",this.expandLabel="expand_less"):(this.dialogContent.style.overflow="auto",this.dialogSurface.style.overflow="auto",this.dialogSurface.style.top="0",this.dialogSurface.style.height="auto",this.expandLabel="expand_more")}zoomOut(){"zoom_out_map"==this.zoomLabel?(this.top=this.dialogSurface.style.top,this.left=this.dialogSurface.style.left,this.width=this.dialogSurface.style.width,this.height=this.dialogSurface.style.height,this.dispatchEvent(new CustomEvent("zoom-out")),this.dialogShape="0px",this.dialogSurface.style.height="100vh",this.dialogSurface.style.top="0px",this.dialogSurface.style.left="0px",this.mdcDialog.style.height="auto",this.dialogSurface.style.minWidth="100vw",this.mdcDialog.style.minWidth="100vw",this.mdcScrim.style.height="auto",this.zoomLabel="zoom_in_map",this.expandLabel="expand_more"):(this.dispatchEvent(new CustomEvent("zoom-in")),this.dialogSurface.style.minWidth="auto",this.mdcDialog.style.minWidth="auto",this.dialogShape="5px",this.dialogSurface.style.height="auto",this.mdcDialog.style.height="100%",this.mdcScrim.style.height="100%",this.zoomLabel="zoom_out_map",this.dialogSurface.style.top=this.top,this.dialogSurface.style.left=this.left,this.dialogSurface.style.width=this.width,this.dialogSurface.style.height=this.height)}}window.customElements.define("tr-dialog",TrDialog)},"./src/components/Audit/AuditFunctions.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>AuditFunctions});var _Api_ApiFunctions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/Api/ApiFunctions.js");function AuditFunctions(base){return class extends((0,_Api_ApiFunctions__WEBPACK_IMPORTED_MODULE_0__.Y)(base)){getObjectAuditInfo(dataElement=this.selectedItems[0]){let extraParams=this.jsonParam(this.actionBeingPerformedModel,dataElement,{}),serviceAPIurl=this.getServiceAPIUrl(this.actionBeingPerformedModel),APIParams=this.getAPICommonParams(this.actionBeingPerformedModel),endPointUrl=this.getActionAPIUrl(this.actionBeingPerformedModel);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);let params=serviceAPIurl+(this.actionBeingPerformedModel.endPoint?this.actionBeingPerformedModel.endPoint:this.config.SampleAPIqueriesUrl)+"?"+new URLSearchParams(APIParams)+"&"+new URLSearchParams(extraParams);params=params.replace(/\|/g,"%7C"),this.fetchApi(params).then((j=>{if(j&&!j.is_error){let auditRecords=[];null!==this.audit?(this.audit.highlightFields=[],void 0!==j.audit_info?(auditRecords=j.audit_info,void 0!==j.highlight_fields&&null!==j.highlight_fields&&(this.audit.highlightFields=j.highlight_fields)):(this.audit.highlightFields=[],auditRecords=j),Array.isArray(auditRecords)&&(auditRecords.forEach((audit=>{audit.collapse=!0,audit.sublevel&&audit.sublevel.length&&audit.sublevel.forEach((level=>{level.collapse=!1}))})),this.audit.audits=auditRecords,this.audit.requestUpdate())):alert("Audit element not loaded, please contact TRAZiT frontend development team")}}))}signAudit(){let params=this.getServiceAPIUrl(this.selectedDialogAction.endPoint)+(this.selectedDialogAction.endPoint?this.selectedDialogAction.endPoint:this.config.ApiEnvMonitSampleUrl)+"?"+new URLSearchParams(this.reqParams);params=params.replace(/\|/g,"%7C"),this.fetchApi(params).then((()=>{this.reloadDialog()}))}}}},"./src/components/Audit/audit-dialog.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),_collaborne_lit_flexbox_literals__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@collaborne/lit-flexbox-literals/dist/index.js"),_Buttons_ButtonsFunctions__WEBPACK_IMPORTED_MODULE_5__=(__webpack_require__("./node_modules/@material/mwc-icon/mwc-icon.js"),__webpack_require__("./node_modules/@spectrum-web-components/tooltip/sp-tooltip.js"),__webpack_require__("./.yalc/@trazit/cred-dialog/.yalc/@trazit/tr-dialog/tr-dialog.js"),__webpack_require__("./src/components/Buttons/ButtonsFunctions.js")),_ProceduresModel__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/ProceduresModel.js"),_GenericDialogs_TrazitCredentialsDialogs__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/components/GenericDialogs/TrazitCredentialsDialogs.js"),_Actions_ActionsFunctions__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./src/components/Actions/ActionsFunctions.js"),_GenericDialogs_DialogsFunctions__WEBPACK_IMPORTED_MODULE_9__=(__webpack_require__("./src/components/Audit/audit-dialog.js"),__webpack_require__("./src/components/GenericDialogs/DialogsFunctions.js"));const langConfig_actionName={label_en:"Action Name",label_es:"Acción"},langConfig_performedOn={label_en:"Performed on",label_es:"Realizado el"},langConfig_reviewedOn={label_en:"Reviewed on",label_es:"Revisado el"},langConfig_auditId={label_en:"Audit Id",label_es:"Id Auditoría"},langConfig_fieldsUpdate={label_en:"Fields updated",label_es:"Campos modificados"},langConfig_by={label_en:"By",label_es:"Por"},langConfig_sign={label_en:"Sign",label_es:"Firmar"};class AuditDialog extends((0,_Actions_ActionsFunctions__WEBPACK_IMPORTED_MODULE_10__.$)((0,_GenericDialogs_TrazitCredentialsDialogs__WEBPACK_IMPORTED_MODULE_7__.s)((0,_Buttons_ButtonsFunctions__WEBPACK_IMPORTED_MODULE_5__.n)((0,_GenericDialogs_DialogsFunctions__WEBPACK_IMPORTED_MODULE_9__.X)(lit__WEBPACK_IMPORTED_MODULE_0__.WF))))){static get styles(){return[_collaborne_lit_flexbox_literals__WEBPACK_IMPORTED_MODULE_1__.G6,lit__WEBPACK_IMPORTED_MODULE_0__.AH`
        :host {
          font-family:Montserrat;
        }      
        tr-dialog {
          --mdc-dialog-max-width: 90vw;
          position: relative;
          transition: opacity 0.2s ease-in-out;
        }
        tr-dialog[open] {
          opacity: 1;
        }
        tr-dialog {
          animation: bounce 0.5s ease-in-out;
        }
        @keyframes bounce {
          0% { transform: translateY(-20px); }
          50% { transform: translateY(10px); }
          100% { transform: translateY(0); }
        }
        sp-tooltip[hidden] {
          display: none;
        }
        sp-tooltip {
          max-width: 100%;
          width: 100%;
          --spectrum-tooltip-info-background-color: rgba(36, 192, 235, 0.08);
          color: #3f51b5;
        }
        sp-tooltip.sub {
          --spectrum-tooltip-info-background-color: rgba(36, 192, 235, 0.09);
        }
        mwc-icon.sign {
          cursor: pointer;
        }
        mwc-icon[hidden] {
          display: none;
        }
        div[hidden] {
          display: none;
        }
        .ball {
          margin-left: -13px;
          cursor: pointer;
          background: transparent;
        }
        .column-list {
          -webkit-columns: 3; /* Number of columns */
          -moz-columns: 3;
          columns: 3;
          -webkit-column-gap: 10px; /* Spacing between columns */
          -moz-column-gap: 10px;
          column-gap: 10px;
          list-style-type: none;
          padding: 10px 0px 0px;
          margin: 0px;
        }

        @media screen and (max-width: 890px) {
          .column-list {
            -webkit-columns: 2; /* Number of columns */
            -moz-columns: 2;
            columns: 2;
          }
        }

        @media screen and (max-width: 530px) {
          .column-list {
            -webkit-columns: 1; /* Number of columns */
            -moz-columns: 1;
            columns: 1;
          }
        }
        
        .column-list li {
          display: inline-block;
          width: 100%;
          margin-bottom: 10px;
          margin-left:30px;
          hyphens: auto;
          word-break: break-all;          
        }

        .d-flex {
          display:flex !important;
        }

        .highlighed{
          color:rgb(76, 175, 80);
          font-size:1.21em;
        }
        span.relevantlabel{
          font-weight: bold;
          font-size: 16px;
        }          
        div.label{
          font-weight: bold;         
          width:124px;
          text-align:right;
          margin-right: 8px;
        }
        p{
            font-weight: bold;
            font-size: 15px;
            margin-top:5px;
            margin-left:4px;
            margin-bottom:5px;
        }   
        .text-group {
          display: flex;
          align-items: center;
          margin-top: 2px;
          margin-bottom: 4px;
          font-size:1em;
        }        
        .tglabelaction {
          font-size: 1.2em;
          width: 124px;
          text-align: right;
          margin-right: 8px;
          flex-shrink:0;
        }
        .tglabel {
          font-size: 1.2em;
          width: 124px; 
          text-align: right;
          margin-right: 8px;
          flex-shrink:0;
        }
        .tgvalue {
          font-size: 1.0em;
        }
        div.feldsupdatedregion{
          border-color : rgba(153, 153, 153, 1);
          border-left : 1px solid;
          border-radius : 10px;
        }
        mwc-textfield {
          border-style : Solid;
          border-color : #999999;
          border-color : rgba(153, 153, 153, 1);
          border-width : 1px;
          border-radius : 7px;
          -moz-border-radius : 7px;
          -webkit-border-radius : 7px;   
          font-family : Montserrat;
          font-weight : bold;
          font-size : 19px;
          background-color :  #FFFFFF;
          background-color : rgb(255, 255, 255);  
          --mdc-text-field-idle-line-color:#148CFA;
          --mdc-text-field-outlined-idle-border-color: #148CFA;
          --mdc-text-field-label-ink-color:  #148CFA;
          --mdc-text-field-focused-label-color: #148CFA;
          --mdc-theme-primary: #0465FB;
        }
        mwc-select {        
          --mdc-theme-primary : rgba(36, 192, 235, 1);
          --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
          --mdc-select-ink-color: rgb(47, 47, 47);
          --mdc-select-dropdown-icon-color:rgba(36, 192, 235, 1);
          --mdc-select-hover-line-color:rgba(36, 192, 235, 1);
          --mdc-notched-outline-border-color: rgba(186, 235, 248, 0.4);
          --mdc-select-disabled-dropdown-icon-color:rgba(36, 192, 235, 1);
  
          font-family : Montserrat;
          font-weight : bold;
          font-size : 19px;
        }
        mwc-select.outlined {        
          --mdc-theme-primary : rgba(36, 192, 235, 1);
          --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
          --mdc-select-ink-color: rgba(36, 192, 235, 1);
          font-family : Montserrat;
          font-weight : bold;
          font-size : 19px;
          background-color: 4fcad029;
        }            
      `]}static get properties(){return{lang:{type:String},audits:{type:Array},objectAuditParentRevisionMode:{type:Boolean},objectAuditChildRevisionRequired:{type:Boolean},selectedItems:{type:Array},actionBeingPerformedModel:{type:Object},auditAction:{type:Object},procInstanceName:{type:String},filterName:{type:String},viewName:{type:String},windowOpenable:{type:Boolean},sopsPassed:{type:Boolean},config:{type:Object},localProceduresModels:{type:Object},viewModelFromProcModel:{type:Object},objectId:{type:String},ObjectType:{type:String},highlightFields:{type:Array}}}constructor(){super(),this.lang="en",this.audits=[],this.objectAuditParentRevisionMode=!0,this.objectAuditChildRevisionRequired=!0,this.selectedItems=[],this.actionBeingPerformedModel={},this.auditAction={},this.config={},this.localProceduresModels=_ProceduresModel__WEBPACK_IMPORTED_MODULE_6__.m,this.viewModelFromProcModel={},this.highlightFields=[]}updated(updates){updates.has("audits")&&this.audits.length&&this.setPrintContent()}setPrintContent(){this.printObj={header:`${this.objectType} Audit for ${this.objectId}`,content:this.setContent()}}setContent(){let session=JSON.parse(sessionStorage.getItem("userSession")),sessionDate=session.appSessionStartDate,sessionUser=session.header_info.first_name+" "+session.header_info.last_name+" ("+session.userRole+")",strContent="";return this.audits.forEach((a=>{strContent+=`<div><span class="relevantlabel">${langConfig_actionName["label_"+this.lang]}:</span> ${a.action_pretty_en?a["action_pretty_"+this.lang]:a.action_name}</div>`,strContent+=`<span class="relevantlabel">Performed On:</span> ${a.date} by ${a.person}`,strContent+=`<br><span class="relevantlabel">Reviewed On:</span> ${a.reviewed?a.reviewed_on:""}`,strContent+=`<li>audit_id: ${a.audit_id}</li>`;let fu=a.fields_updated?Object.entries(a.fields_updated).map((([key,value])=>({k:key,v:value}))):null,strFu="";fu?(strFu+="<ul>",fu.forEach((d=>{strFu+=`<li>${d.k}: ${d.v}</li>`})),strFu+="</ul>"):strFu+="<br/>",strContent+=`<p>fields_updated: </p> ${strFu}`,a.sublevel.length&&a.sublevel[0].date&&(strContent+='<div style="margin-left: 20px;">',a.sublevel.forEach((s=>{strContent+=`<p><div><span class="relevantlabel">Action Name: </span>${s.action_pretty_en?s["action_pretty_"+this.lang]:s.action_name}</div>`,strContent+=`<span class="relevantlabel">Performed On: </span>${s.date} by ${s.person}`,strContent+=`<br><span class="relevantlabel">Reviewed On: </span>${s.reviewed?s.reviewed_on:""}`,fu=s.fields_updated?Object.entries(s.fields_updated).map((([key,value])=>({k:key,v:value}))):null,strFu="",fu?(strFu+="<ul>",fu.forEach((d=>{strFu+=`<li>${d.k}: ${d.v}</li>`})),strFu+="</ul>"):strFu+="<br/>",strContent+=`<br><p>fields_updated: </p> ${strFu}`})),strContent+="</div>"),strContent+="<hr>"})),`\n      <style type="text/css">\n      .page-header, .page-header-space {\n        height: 75px;\n        padding-top: 50px;\n      }\n      .page-header {\n        position: fixed;\n        top: 0mm;\n        width: 100%;\n        border-bottom: 1px solid black; /* for demo */\n      }\n      .page-footer, .page-footer-space {\n        height: 30px;\n        padding-top: 10px;\n      }\n      .page-footer {\n        position: fixed;\n        bottom: 0;\n        width: 100%;\n        border-top: 1px solid black; /* for demo */\n      }\n      .page {\n        page-break-after: always;\n      }\n      @page {\n        margin: 0mm 10mm 10mm;\n      }\n      @media print {\n        thead {display: table-header-group;} \n        tfoot {display: table-footer-group;}\n      }\n      .column-list {\n        -webkit-columns: 3; /* Number of columns */\n        -moz-columns: 3;\n        columns: 3;\n        -webkit-column-gap: 10px; /* Spacing between columns */\n        -moz-column-gap: 10px;\n        column-gap: 10px;\n        list-style-type: none;\n        padding: 0;\n        margin: 0;\n      }\n      \n      .column-list li {\n        display: inline-block;\n        width: 100%;\n        margin-bottom: 10px;\n      }\n      </style>\n\n      <div class="page-header" style="text-align: center; font-weight: bold;">\n        ${this.objectType} Audit for ${this.objectId} on ${sessionDate}\n      </div>\n\n      <div class="page-footer">\n        ${sessionUser} on ${sessionDate} \n      </div>\n      <table>\n        <thead>\n          <tr>\n            <td>\n              \x3c!--place holder for the fixed-position header--\x3e\n              <div class="page-header-space"></div>\n            </td>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>\n              \x3c!--*** CONTENT GOES HERE ***--\x3e\n              <div class="page">${strContent}</div>\n            </td>\n          </tr>\n        </tbody>\n        <tfoot>\n          <tr>\n            <td>\n              \x3c!--place holder for the fixed-position footer--\x3e\n              <div class="page-footer-space"></div>\n            </td>\n          </tr>\n        </tfoot>\n      </table>\n    `}auditPrint(){let printWindow=window.open("","","fullscreen=yes");printWindow.document.write(this.printObj.content),printWindow.document.title=this.printObj.header,printWindow.document.close(),setTimeout((function(){printWindow.print(),printWindow.close()}),500)}firstUpdated(){this.updateComplete.then((()=>{this.dialogSurface.style.padding="20px",this.dialogSurface.style.width="100vw"}))}signButtonsMode(){let procList=JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures;if(void 0===this.procInstanceName||void 0===procList)return;let whichProc=procList.filter((p=>p.procInstanceName==this.procInstanceName));if(void 0===whichProc||void 0===whichProc[0])return this.objectAuditParentRevisionMode=!0,void(this.objectAuditChildRevisionRequired=!0);console.log("signButtonsMode","whichProc[0].audit_sign_mode",whichProc[0].audit_sign_mode),this.objectAuditParentRevisionMode=!0,this.objectAuditChildRevisionRequired=!0,void 0!==this.actionBeingPerformedModel&&void 0!==this.actionBeingPerformedModel.parentAuditBusinessRuleName&&(this.objectAuditParentRevisionMode="DISABLED"!=whichProc[0].audit_sign_mode[this.actionBeingPerformedModel.parentAuditBusinessRuleName]),void 0!==this.actionBeingPerformedModel&&void 0!==this.actionBeingPerformedModel.childAuditBusinessRuleName&&(this.objectAuditChildRevisionRequired="NO"!=whichProc[0].audit_sign_mode[this.actionBeingPerformedModel.childAuditBusinessRuleName])}render(){return this.signButtonsMode(),lit__WEBPACK_IMPORTED_MODULE_0__.qy`
    ${this.credentialsDialog()}
    <tr-dialog id="auditDialog" ?open=${this.audits.length}  @closed=${()=>this.audits=[]} class="layout vertical"
      heading=""
      hideActions=""
      scrimClickAction="">
      ${this.countInfo()}
      <mwc-icon slot="icon1" @click=${this.auditPrint}>print</mwc-icon>
      ${this.audits.map(((a,i)=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div id="wrap-${a.audit_id}" class="layout horizontal flex center" style="padding:2px 0 2px 0;border-left:3px solid #ccc">
          <mwc-icon class="ball"
            @click=${()=>this.showItem(a,i)}
            style="color:${"open"==a.ballState?"#3f51b5":"hide"==a.ballState?"#eee":"#aaa"}">radio_button_checked</mwc-icon>
          <sp-tooltip open placement="right" variant="info" id="tooltip-${a.audit_id}">            
            <div class="layout horizontal flex">
              ${a.reviewed?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                  ${1==this.objectAuditParentRevisionMode?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <div class="text-group"><mwc-icon title="${langConfig_reviewedOn["label_"+this.lang]}: ${a.reviewed_on}">grading</mwc-icon></div>
                  `:lit__WEBPACK_IMPORTED_MODULE_0__.s6}  
                `:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                  ${1==this.objectAuditParentRevisionMode?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <mwc-icon class="sign" title="${langConfig_sign["label_"+this.lang]}"  @click=${()=>this.signAudit(a.audit_id)}>edit_note</mwc-icon>
                  `:lit__WEBPACK_IMPORTED_MODULE_0__.s6}  
                `}
              <div>
                <div class="text-group"><div class="tglabelaction">${langConfig_actionName["label_"+this.lang]}: </div><b>${a.action_pretty_en?a["action_pretty_"+this.lang]:a.action_name}</b></div>
                <div class="text-group">
                  <div class="tglabel">${langConfig_performedOn["label_"+this.lang]}: </div>${a.date} ${langConfig_by["label_"+this.lang]} ${a.person}
                </div>

                <div id="audit-${a.audit_id}">
                  <div class="text-group">${a.reviewed?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<br><div class="tglabel">${langConfig_reviewedOn["label_"+this.lang]}: ${a.reviewed_on}: </div>${a.reviewed_on}`:null}</div>
                  <div class="text-group"><div class="tglabel">${langConfig_auditId["label_"+this.lang]}: </div>${a.audit_id}</div>
                  <div class="feldsupdatedregion">
                    <p>${langConfig_fieldsUpdate["label_"+this.lang]}: </p> <ul class="column-list"> ${a.fields_updated?Object.entries(a.fields_updated).map((([key,value],i)=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`<li class="d-flex ${this.fieldToBeHighlighted(a,key)}"><div class="label">${key}:</div> <div>${value}</div></li>`)):""}</ul>
                  </div>
                  ${a.sublevel.length&&a.sublevel[0].date?lit__WEBPACK_IMPORTED_MODULE_0__.qy`${a.sublevel.map(((s,si)=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                      <div id="wrap-${s.audit_id}" class="layout horizontal flex center" style="margin:5px">
                        <mwc-icon class="ball"
                          @click=${()=>this.showSubItem(s,i,si)}
                          style="color:${"hide"==s.ballState?"#eee":"close"==s.ballState?"#aaa":"#3f51b5"}">radio_button_checked</mwc-icon>
                        <sp-tooltip class="sub" open placement="right" variant="info" id="tooltip-${s.audit_id}">
                          <div class="layout horizontal flex">
                            ${s.reviewed?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                                ${1==this.objectAuditParentRevisionMode?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                                  <mwc-icon title="reviewed_on: ${s.reviewed_on}">grading</mwc-icon>
                                `:lit__WEBPACK_IMPORTED_MODULE_0__.s6}
                              `:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                                ${1==this.objectAuditParentRevisionMode?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                                  <mwc-icon class="sign" title="${langConfig_sign["label_"+this.lang]}" 
                                    @click=${()=>this.signAudit(s.audit_id)}>edit_note</mwc-icon>
                                `:lit__WEBPACK_IMPORTED_MODULE_0__.s6}
                              `}
                            <div>
                              <div class="text-group"><div class="tglabelaction">${langConfig_actionName["label_"+this.lang]}: </div>${s.action_pretty_en?s["action_pretty_"+this.lang]:s.action_name}</div>
                              <div class="text-group"><div class="tglabel">${langConfig_performedOn["label_"+this.lang]}: </div>${s.date} ${langConfig_by["label_"+this.lang]} ${s.person}</div>
                              <div id="audit-${s.audit_id}">
                                ${s.reviewed?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<span class="relevantlabel">Reviewed On: </span>${s.reviewed_on}<br>`:null}
                                <div class="text-group"><div class="tglabel">${langConfig_auditId["label_"+this.lang]}: </div>${s.audit_id}</div>
                                <div class="feldsupdatedregion">
                                  <p>${langConfig_fieldsUpdate["label_"+this.lang]}: </p> <ul class="column-list">${s.fields_updated?Object.entries(s.fields_updated).map((([key,value],i)=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`<li class="d-flex ${this.fieldToBeHighlighted(s,key)}"><div class="label">${key}:</div> <div>${value} </div></li>`)):""}</ul>
                                </div>
                              </div>
                            </div>  
                          </div>
                        </sp-tooltip>
                      </div>`))}
                  `:null}
                </div>
              </div>
            </div>
          </sp-tooltip>
        
        </div>
        `))}
    </tr-dialog>
    `}fieldToBeHighlighted(auditRow,rowFldName){if(null==this.highlightFields)return"";if(0==this.highlightFields.length)return"";if(void 0===auditRow.table_name)return"";if(void 0===auditRow.action_name)return"";for(let record of this.highlightFields)if(record.table_name===auditRow.table_name&&record.field_name===rowFldName&&(record.action_name===auditRow.action_name||"ALL"===record.action_name))return"highlighed";return""}signAudit(id){this.targetValue={auditId:id},this.trazitNoDialogRequired(this.actionBeingPerformedModel.dialogInfo.action[0],this.selectedItems[0],this.targetValue,!1,this.selectedItems[0],void 0,void 0,void 0)}get dialog(){return this.shadowRoot.querySelector("tr-dialog")}get dialogSurface(){return this.dialog.shadowRoot.querySelector(".mdc-dialog__surface")}showItem(item,i){"open"==this.audits[i].ballState?(this.audits[i].ballState="hide",this.shadowRoot.querySelector("#tooltip-"+item.audit_id).hidden=!0,this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginTop="-11px",this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginBottom="-11px"):"hide"==this.audits[i].ballState?(this.audits[i].ballState="close",this.shadowRoot.querySelector("#tooltip-"+item.audit_id).hidden=!1,this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden=!0,this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginTop="",this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginBottom=""):(this.audits[i].ballState="open",this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden=!1),this.requestUpdate()}showSubItem(item,i,si){"hide"==this.audits[i].sublevel[si].ballState?(this.audits[i].sublevel[si].ballState="close",this.shadowRoot.querySelector("#tooltip-"+item.audit_id).hidden=!1,this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden=!0,this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.margin="5px"):"close"==this.audits[i].sublevel[si].ballState?(this.audits[i].sublevel[si].ballState="open",this.shadowRoot.querySelector("#audit-"+item.audit_id).hidden=!1):(this.audits[i].sublevel[si].ballState="hide",this.shadowRoot.querySelector("#tooltip-"+item.audit_id).hidden=!0,si==this.audits[i].sublevel.length-1?this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginBottom="-5px":this.shadowRoot.querySelector("#wrap-"+item.audit_id).style.marginBottom="-11px"),this.requestUpdate()}countInfo(){let unSigned=this.audits.filter((a=>!a.reviewed)),str="";return str=unSigned.length?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<label slot="topLeft" style="font-size:12px;color: red">${unSigned.length}/${this.audits.length}</label>`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`<label slot="topLeft" style="font-size:12px;color: green">${this.audits.length}/${this.audits.length}</label>`,str}}window.customElements.define("audit-dialog",AuditDialog)},"./src/components/DragDropBox/index.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var lit_element=__webpack_require__("./node_modules/lit-element/lit-element.js");__webpack_require__("./node_modules/@material/mwc-icon/mwc-icon.js"),__webpack_require__("./src/components/MultiSelect/index.js"),__webpack_require__("./src/components/grid_with_buttons/gridCellTooltip.js"),__webpack_require__("./src/components/grid_with_buttons/tableRowDetail.js"),__webpack_require__("./node_modules/@material/mwc-button/mwc-button.js");const dragdropboxprint=function print(selectbox,thisComponent){!function printCoa(selectbox,thisComponent){console.log(selectbox),console.log(thisComponent);const{cardStyles,cardElement}=function setPrintContentCoa(selectbox,thisComponent){let cardElement="",cardStyles="\n      .box-content {\n        width: fit-content;\n        border-radius: 4px;\n        background-color: #42BFF7;\n        padding: 4px;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        border: 2px solid #03A9F4;\n      }\n    \n      .box-content_allowmove_false {\n        width: 100%;\n        border-radius: 4px;\n        background-color: #aca2a2;\n        padding: 4px;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        border: 2px solid #03A9F4;\n        height:100%;\n      }\n      .box-content_allowmove_true {\n        width: fit-content;\n        border-radius: 4px;\n        background-color: #20B2AA;\n        padding: 4px;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        border: 2px solid #03A9F4;\n      }  \n    \n      .box {\n        width: 80px;\n        height: 80px;\n        background-color: #42BFF7;  \n        border: 2px solid #03A9F4;\n        padding: 2px;\n        color: white;\n        cursor: pointer;\n        flex:1;\n      }\n    \n      .row-num {\n        color: white;\n        width: 20px;\n        height: 80px;\n        display: flex;\n        align-items: center;\n      }\n    \n      .col-num {\n        color: white;\n        width: 80px;\n        height: 20px;\n        text-align: center;\n        flex:1;\n      }\n    \n      .row-content {\n        display: flex;\n        flex-direction: row;\n        gap: 2px;\n      }\n    \n      .first-item {\n        width: 20px;\n        height: 20px;\n      }\n    \n      .position {\n        display: flex;\n        justify-content: space-between;\n      }\n    \n      .data-view {\n        height: 54px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        word-break: break-word;\n        text-align: center;\n        flex-direction: column;\n      }\n    \n      .add-circle {\n        margin-top: 10px;\n        border-radius: 50%;\n        width: 30px;\n        height: 30px;\n        background-color: white;\n        text-align: center;\n        font-weight: bold;\n        font-size: 20px;\n        color: #03A9F4;\n    \n      }\n    \n      .accept-btn {\n        background-color: #24C0EB;\n        border-radius: 4px;\n        padding: 8px 12px;\n        color: white;\n        font-weight: bold;\n        font-size: 16px;\n        cursor: pointer;\n      }\n    \n      .view-btn {\n        border: 2px solid #24C0EB;\n        background-color: #54CCEF;\n        border-radius: 4px;\n        padding: 8px 12px;  \n        color: white;\n        font-weight: bold;\n        font-size: 16px;\n        cursor: pointer;\n      }\n    \n      .view-btn.active {\n        color: rgb(19,11,111);\n        background-color: #8DDDF4;\n      }\n    \n      .box.active {\n        border-color: #FF8E00;\n      }\n    \n      .selected-cell-content {\n        color: rgb(19,11,111);\n        border: 2px solid #03A9F4;\n        border-radius: 8px;\n        background-color: #42BFF7;\n        text-align: left;\n        padding: 4px 8px;\n      }\n    \n      table {\n        border-collapse: collapse;\n      }\n      \n      th, td {\n        text-align: left;\n        padding: 8px;\n      }\n      \n      th {\n        background-color: #04AA6D;\n        color: white;\n      }\n    \n      tr {\n        background-color: white;\n      }\n      table, td, th {\n        border: 1px solid #03A9F4;\n      }\n      table.dragdropable.TRAZiT-DefinitionArea {\n    \n      }\n      table.dragdropable.TRAZiT-DefinitionArea thead tr th {\n        background-color: #2989d8 !important;\n        color: white;\n      }\n    \n      table.dragdropable.TRAZiT-UsersArea thead tr th {\n        background-color: white;\n        color: gray;\n      }\n    \n      table.dragdropable {\n        border-collapse: collapse;\n        width: 100%;\n        font-family: Montserrat;\n        font-size: 16px;\n      }\n    \n      table.dragdropable.TRAZiT-UsersArea tr {\n        border: none; \n        border-bottom: 1px solid #dddddd;\n      }\n    \n      table.dragdropable tr {\n        border: 1px solid #dddddd;\n        text-align: center;\n        color: #808080;\n      }\n    \n      table.dragdropable.TRAZiT-UsersArea tr:nth-child(even) {\n        background-color: white;\n      }\n    \n      table.dragdropable.TRAZiT-UsersArea tr:last-child {\n        border: none;\n      }\n    \n      table.dragdropable.TRAZiT-UsersArea thead {\n        border-bottom: 1px solid #dddddd;\n      }\n    \n      table.dragdropable tr:nth-child(even) {\n        background-color: rgb(214, 233, 248);\n      }\n    \n      table.dragdropable.TRAZiT-DefinitionArea th {\n        padding: 16px 20px;\n        background-color: #2989d8 !important;\n        border: 1px solid #dddddd !important;\n      }\n    \n      table.dragdropable td, th {\n        padding: 16px 20px;\n        border: 1px solid #dddddd !important;\n      }\n    \n      table.dragdropable.TRAZiT-UsersArea td, th {\n        border: none !important;\n      }\n    \n      table.dragdropable tr {\n        cursor: pointer;\n      }\n    \n      table.dragdropable.TRAZiT-DefinitionArea tr:hover td {\n        background-color: #2989d830 !important;\n      }\n    \n      table.dragdropable.TRAZiT-UsersArea tr:hover td {\n        background-color: #2989d830 !important;\n      }\n      ";if(selectbox){console.log(thisComponent);let mainBoxDiv=thisComponent.shadowRoot.querySelector("#mainBox");cardElement+=mainBoxDiv?.outerHTML}else{console.log(thisComponent),cardElement+=thisComponent.shadowRoot.querySelector("table").outerHTML}return{cardStyles,cardElement}}(selectbox,thisComponent);let printWindow=window.open("","_blank");printWindow.document.write(`\n      <!DOCTYPE html>\n      <html lang="en">\n        <head>\n          <meta charset="UTF-8">\n          <meta name="viewport" content="width=device-width, initial-scale=1.0">\n          <meta http-equiv="X-UA-Compatible" content="ie=edge">\n          <title>Stability Studies</title>\n          <style>\n            ${cardStyles}\n          </style>\n       </head>\n        <body>        \n        ${cardElement}\n      </body>\n      </html>\n      \n      `),setTimeout((function(){printWindow.print(),printWindow.close()}),500)}(selectbox,thisComponent)},template=(tmpLogic,selectedBox,viewModel,lang,componentRef)=>{if(console.log("tmpLogic",tmpLogic,"selectedBox",selectedBox,"viewModel",viewModel),void 0===viewModel.boxPosicsViews)return alert("Not found the property boxPosicsViews, it should be of at least one entry"),lit_element.qy``;let boxAllowMoveObject=!1,boxContentStructured=!0,totalStr="";if(void 0!==selectedBox){boxContentStructured=selectedBox.content_structured,void 0!==selectedBox.allow_move_objects&&(boxAllowMoveObject=selectedBox.allow_move_objects);let occupied=selectedBox.datas.length;if(!0===boxContentStructured){let total=selectedBox.cols*selectedBox.rows;totalStr=String(occupied)+("en"===lang?" of ":" de ")+String(total)}else totalStr="Total: "+String(occupied)}return lit_element.qy` 
    <div style="display:flex; flex-direction:column; gap:12px;">    
    <div style="display:flex; flex-direction:row; gap:12px;">    
        <div style="width: 100%; gap: 4px; display: flex; flex-direction: column;">        
            <div style="display:flex; justify-content: space-between; align-items: center;"> 
                <div style="display:flex; flex-direction:row; gap: 4px; align-items: center;"> 
                <mwc-icon-button icon="print" @click=${()=>{dragdropboxprint(void 0!==selectedBox,componentRef)}}></mwc-icon-button>
                ${void 0===selectedBox?lit_element.qy``:lit_element.qy`
                    <mwc-icon @click=${()=>tmpLogic.setBoxView()} style="color:#54CCEF; cursor:pointer;"> home </mwc-icon>
                    <div class="view-btn ${1==viewModel.viewMode?"active":""}" @click=${()=>tmpLogic.setViewMode(1)}> Box View </div>
                    <div class="view-btn ${2==viewModel.viewMode?"active":""}" @click=${()=>tmpLogic.setViewMode(2)}> List View </div>
                    
                `}
                </div>
                <div style="color:#24C0EB; font-weight: bold; font-size: 16px;">${totalStr}</div>
                <div style="display:flex; flex-direction:row; gap: 4px; align-items: center;">
                    ${void 0===viewModel.objectsToDragColumns?lit_element.qy``:lit_element.qy`<div class="accept-btn" @click=${()=>tmpLogic.setViewTable()}> ${tmpLogic.setViewTableButtonLabel()} </div>`}
                </div>
            
            </div>

        ${!0===boxContentStructured?lit_element.qy`${function boxStructured(tmpLogic,selectedBox,viewModel,lang,componentRef,boxAllowMoveObject){let axisCols=[],axisRows=[];if(void 0!==selectedBox){for(let i=0;i<selectedBox.cols;i++)void 0===selectedBox.axisLabels||void 0===selectedBox.axisLabels.posicX||selectedBox.axisLabels.posicX.length<=i?axisCols.push(i):axisCols.push(selectedBox.axisLabels.posicX[i]);let letter="A";for(let i=0;i<selectedBox.rows;i++)void 0===selectedBox.axisLabels||void 0===selectedBox.axisLabels.posicY||selectedBox.axisLabels.posicY.length<=i?axisRows.push(String.fromCharCode(letter.charCodeAt(0)+i)):axisRows.push(selectedBox.axisLabels.posicY[i])}let boxPosicsViews=[];void 0!==selectedBox&&void 0!==selectedBox.boxPosicsViews?boxPosicsViews=selectedBox.boxPosicsViews:viewModel.boxPosicsViews&&(boxPosicsViews=viewModel.boxPosicsViews);return lit_element.qy`
        ${void 0!==selectedBox?lit_element.qy`
        <div class="box-content_allowmove_${boxAllowMoveObject}" id='mainBox'>
            ${1==viewModel.viewMode?lit_element.qy`
            <div> 
                <div class="row-content"> 
                    <div class="first-item"> </div>
                    ${axisCols.map(((colN,i)=>lit_element.qy`
                    <div class="col-num"> ${colN+1} </div>
                    `))}
                </div>
                ${axisRows.map(((rowN,i)=>lit_element.qy`
                <div class="row-content"> 
                    <div class="row-num"> ${rowN} </div>
                    ${boxAllowMoveObject?axisCols.map(((item1,j)=>lit_element.qy`
                    <div class="box ${tmpLogic.selectedIndex1==rowN+(j+1)?"active":""}" style=${selectedBox.datas.find(((item,index)=>item.posX+(item.posY-1)*selectedBox.cols==i*axisCols.length+(j+1)))?"background-color:rgb(80, 220, 247);":""}  @click=${()=>tmpLogic.setSelectBoxIndex(rowN+(j+1),i*axisCols.length+(j+1))} @dragover=${e=>tmpLogic.allowDrop(e)} @drop=${e=>tmpLogic.dropBox(e,j+1,i+1)}> 
                        <div draggable="true"  @dragstart=${e=>tmpLogic.dragBox(e,j+1,i+1)} class="draggable-box">                        
                        ${printObjectData(tmpLogic,selectedBox,axisCols,boxPosicsViews,i,j)}
                            <div class="position">
                                <span> ${rowN+(j+1)} </span>
                                <span> ${i*axisCols.length+(j+1)} </span>
                            </div>
                        </div>
                    </div>
                    `)):axisCols.map(((item1,j)=>lit_element.qy`
                    <div class="box ${tmpLogic.selectedIndex1==rowN+(j+1)?"active":""}" style=${selectedBox.datas.find(((item,index)=>item.posX+(item.posY-1)*selectedBox.cols==i*axisCols.length+(j+1)))?"background-color:rgb(80, 220, 247);":""} @click=${()=>tmpLogic.setSelectBoxIndex(rowN+(j+1),i*axisCols.length+(j+1))}> 
                        <div class="draggable-box">
                            ${printObjectData(tmpLogic,selectedBox,axisCols,boxPosicsViews,i,j)}
                            <div class="position">
                                <span> ${rowN+(j+1)} </span>
                                <span> ${i*axisCols.length+(j+1)} </span>
                            </div>
                        </div>
                    </div>
                    `))}
                </div>
                `))}
                <div style="display:flex; justify-content: center;">
                    ${tmpLogic.selectedIndex1?lit_element.qy`<div class="selected-cell-content"> ${"en"===lang?lit_element.qy`Selected cell`:lit_element.qy`Celda seleccionada`}: ${tmpLogic.selectedIndex1} </div>`:null} 
                </div>
                ${tmpLogic.selectedIndex2?lit_element.qy`<div style="text-align: center; color: white;"> ${"en"===lang?lit_element.qy`Object`:lit_element.qy`Objeto`}: ${selectedBox.name} </div>`:null} 
            </div>
            `:selectedBox.datas.length>0?lit_element.qy`
            <div style="width: min-width: 556px;">
                ${boxContentTable(tmpLogic,viewModel.boxesContentColumns,selectedBox)}
            </div>
            `:null}
        </div>
        `:tmpLogic&&tmpLogic.data&&tmpLogic.data.boxContents&&tmpLogic.data.boxContents.length>0?lit_element.qy`
        ${void 0===viewModel.boxesTableColumns?lit_element.qy``:lit_element.qy`${function boxesTable(tmpLogic,elem,data,lang){let dataArr=getDataFromRoot(elem,data);return lit_element.qy`
    <table class="dragdropable TRAZiT-DefinitionArea">
    <thead> 
        ${elem.columns.map(((column,i)=>lit_element.qy`<th>${column.label_en}</th>`))}
    </thead>
    <tbody>
        ${void 0!==dataArr&&Array.isArray(dataArr)?lit_element.qy`  
            ${dataArr.map(((p,i)=>lit_element.qy`
            <tr @click=${()=>tmpLogic.showBoxContent(p,i)}> 
            
                ${elem.columns.map(((fld,index)=>void 0!==fld.is_icon&&1==fld.is_icon?fld.icon_class?lit_element.qy`
                                ${void 0!==fld.tooltip?lit_element.qy`
                                    <grid-cell-tooltip lang="${lang}" .element="${fld}" .data="${p}">
                                    <div class="left-area">
                                        <mwc-icon-button class="icon ${p[fld.icon_class]}" icon="${p[fld.icon_name]}" alt="${fld.name}"></mwc-icon-button>
                                    </div>
                                    </grid-cell-tooltip>
                                `:lit_element.qy`
                                    <mwc-icon-button class="icon ${p[fld.icon_class]}" icon="${p[fld.icon_name]}" alt="${fld.name}"></mwc-icon-button>
                                `}
                            `:lit_element.qy`     
                            <td>                           
                                ${void 0!==fld.tooltip?lit_element.qy`
                                    <grid-cell-tooltip lang="${lang}" .element="${fld}" .data="${p}">
                                        <img src="${tmpLogic.iconRendererSrc(p,fld.name,i,fld)}" style="width:20px">
                                    </grid-cell-tooltip>
                                `:lit_element.qy`
                                <img src="${tmpLogic.iconRendererSrc(p,fld.name,i,fld)}" style="width:20px">
                                `}

                            </td>
                            `:lit_element.qy`                        
                            <td>
                                ${void 0!==fld.tooltip?lit_element.qy`
                                    <grid-cell-tooltip lang="${lang}" .element="${fld}" .data="${p}">
                                        ${p[fld.name]}
                                    </grid-cell-tooltip>
                                `:lit_element.qy`
                                ${p[fld.name]}
                                `}

                            </td>
                        `))} 
                ${void 0===elem.row_buttons?lit_element.qy``:lit_element.qy`
                    <td><div class="layout horizontal center flex wrap"> ${this.getButtonForRows(elem.row_buttons,p,!1,parentData)}</div></td>
                `}
            </tr>
            `))}
        `:lit_element.qy`No Data`}
    </tbody>
    </table>    
    `}(tmpLogic,viewModel.boxesTableColumns,tmpLogic.data,lang)}`}                                    
        `:null}
    </div>
    `}(tmpLogic,selectedBox,viewModel,lang,0,boxAllowMoveObject)}`:lit_element.qy`${function boxNotStructured(tmpLogic,selectedBox,viewModel,lang,componentRef,boxAllowMoveObject){let boxPosicsViews=[];void 0!==selectedBox&&void 0!==selectedBox.boxPosicsViews?boxPosicsViews=selectedBox.boxPosicsViews:viewModel.boxPosicsViews&&(boxPosicsViews=viewModel.boxPosicsViews);return lit_element.qy`
            <div class="box-content_allowmove_${boxAllowMoveObject}" id='mainBox'>
                ${1==viewModel.viewMode?lit_element.qy`
                <div draggable="true" class="draggable-box" @dragover=${e=>tmpLogic.allowDrop(e)} @drop=${e=>tmpLogic.dropBox(e,0,0)}>
                ${selectedBox.datas.length>0?lit_element.qy`
                    ${selectedBox.datas.map(((selItem,j)=>lit_element.qy`
                    ${printItemByViewFilter(selItem,tmpLogic,boxPosicsViews,!1)}
                    `))}         
                `:lit_element.qy``}
                </div>
                `:selectedBox.datas.length>0?lit_element.qy`
                    <div style="width: min-width: 556px;">
                    ${boxContentTable(tmpLogic,viewModel.boxesContentColumns,selectedBox)}
                    </div>
                `:null}

            </div>
    `}(tmpLogic,selectedBox,viewModel,0,0,boxAllowMoveObject)}`}
        </div>  
        ${void 0===viewModel.boxPosicsViews||1==viewModel.boxPosicsViews.length?lit_element.qy``:lit_element.qy`
        <div >
            <mwc-icon style="color:#54CCEF; cursor:pointer;" @click=${()=>tmpLogic.setShowBoxViewModeList()}> view_agenda </mwc-icon>
            ${tmpLogic.listBoxViewMode?lit_element.qy`
                ${viewModel.boxPosicsViews.map(((view,i)=>lit_element.qy`
                <div style="display:flex;">
                    <input style="transform: translateY(3px);" type="radio" id="${view[1]}" name="fav_language" value="${view[1]}"  @click=${()=>tmpLogic.setBoxPosicsViewFilter(i)}>                            
                    <label for="${view[1]}" @click=${()=>tmpLogic.setBoxPosicsViewFilter(i)}> 
                        <multi-select id="${view[1]}" @click=${()=>tmpLogic.setBoxPosicsViewFilter(i)} .label="" .props=${{readOnly:!0,displayLabel:!1}} .activeOptions=${view} .options=${{}}> </multi-select>                            
                    </label><br>                            
                </div>                        
                `))}
            `:lit_element.qy``}
        </div>
        `}

        ${void 0===viewModel.objectsToDragColumns?lit_element.qy``:lit_element.qy`${function dragObjectsTable(tmpLogic,elem,data,componentRef){let dataArr=getDataFromRoot(elem,data);return lit_element.qy`
    ${tmpLogic.viewTable?lit_element.qy`
    <div style="margin-top:42px">
        <table class="dragdropable TRAZiT-DefinitionArea"> 
            <thead>
                ${elem.columns.map((column=>lit_element.qy`<th>${column.label_en}</th>`))}
            </thead>
            <tbody>
                ${void 0!==dataArr&&Array.isArray(dataArr)?lit_element.qy`  
                    ${dataArr.map(((p,idx)=>lit_element.qy`
                    <tr class="dragdropabletr" draggable="true" @dragstart=${e=>tmpLogic.dragTableTr(e,elem,p)}>
                        ${elem.columns.map(((fld,index)=>void 0!==fld.is_icon&&1==fld.is_icon?fld.icon_class?lit_element.qy`<div class="left-area">
                                    ${this.iconRenderer(p,fld.name,idx,fld)}
                                    <mwc-icon-button class="icon ${p[fld.icon_class]}" icon="${p[fld.icon_name]}" alt="${fld.name}"></mwc-icon-button>
                                </div>`:lit_element.qy`${this.iconRenderer(p,fld.name,idx,fld)}
                                    <img src="${tmpLogic.iconRendererSrc(p,fld.name,idx,fld)}" style="width:20px">`:lit_element.qy`<td @click="${()=>componentRef.shadowRoot.querySelector("#detail"+idx).toggle()}">${p[fld.name]}</td>`))}
                        ${void 0===elem.row_buttons?lit_element.qy``:lit_element.qy`<td><div class="layout horizontal center flex wrap">${this.getButtonForRows(elem.row_buttons,p,!1,parentData)}</div></td>`}
                    </tr>
                    <table-row-detail id="detail${idx}">
                      <div slot="details">
                      dd
                        <!-- Aquí puedes poner el contenido detallado para esta fila -->
                      </div>
                    </table-row-detail>`))}
                `:lit_element.qy`No Data`}
            </tbody>
        </table>
    </div> 
    `:null}
    `}(tmpLogic,viewModel.objectsToDragColumns,tmpLogic.data,componentRef)}`}
    </div>    
    </div>        
    `};function printObjectData(tmpLogic,selectedBox,axisCols,boxPosicsViews,i,j){let selItem=selectedBox.datas.find(((item,index)=>item.posX+(item.posY-1)*selectedBox.cols==i*axisCols.length+(j+1)));return void 0===selItem?lit_element.qy``:lit_element.qy`
        ${printItemByViewFilter(selItem,tmpLogic,boxPosicsViews,!0)}
    `}function printItemByViewFilter(selItem,tmpLogic,boxPosicsViews,contentStructured){return lit_element.qy`
    <div class="data-view" style="${!0===contentStructured?"":"background-color: #50dcf7; border: 2px solid #1473e6; margin-bottom: 5px;"}"}>
    ${boxPosicsViews[tmpLogic.viewContentIndex].map(((curFld,i)=>lit_element.qy`
        <div>${curFld}: ${selItem[curFld]}</div>
    `))}
    </div>
    `}function boxContentTable(tmpLogic,elem,selectedBox){return lit_element.qy`
    <table class="TRAZiT-DefinitionArea dragdropable">
    <thead>
        <th>Posic</th>
        ${elem.columns.map(((column,i)=>lit_element.qy`<th>${column.label_en}</th>`))}
    </thead>
    <tbody>
        ${void 0!==selectedBox.datas&&Array.isArray(selectedBox.datas)?lit_element.qy`  
            ${selectedBox.datas.map(((p,i)=>lit_element.qy`
            <tr @click=${()=>tmpLogic.showBoxContent(p,i)}> 
            
                <td>${String.fromCharCode(p.posY+64)+p.posX}</td>
            
                ${elem.columns.map(((fld,index)=>void 0!==fld.is_icon&&1==fld.is_icon?fld.icon_class?lit_element.qy`
                            <div class="left-area">
                                <mwc-icon-button class="icon ${p[fld.icon_class]}" icon="${p[fld.icon_name]}" alt="${fld.name}"></mwc-icon-button>
                            </div>
                            `:lit_element.qy`
                            <img src="${tmpLogic.iconRendererSrc(p,fld.name,i,fld)}" style="width:20px">
                            `:lit_element.qy`<td>${p[fld.name]}</td>`))} 
                ${void 0===elem.row_buttons?lit_element.qy``:lit_element.qy`
                    <td><div class="layout horizontal center flex wrap"> ${this.getButtonForRows(elem.row_buttons,p,!1,parentData)}</div></td>
                `}
            </tr>
            `))}
        `:lit_element.qy`No Data`}    
    </tbody>
    </table>
    `}function getDataFromRoot(elem,curDataForThisCard,filterValues){if(void 0!==elem&&void 0!==elem.contextVariableName&&void 0!==this[elem.contextVariableName]&&(curDataForThisCard=this[elem.contextVariableName]),null!=curDataForThisCard){if(void 0!==elem.endPointPropertyArray){if(0===elem.endPointPropertyArray.length)return curDataForThisCard;if(1===elem.endPointPropertyArray.length&&"ROOT"===elem.endPointPropertyArray[0].toUpperCase())return curDataForThisCard;let i=0,subJSON={};for(i=0;i<elem.endPointPropertyArray.length;i++){if(null===curDataForThisCard)return;let propertyName=elem.endPointPropertyArray[i];subJSON=Array.isArray(curDataForThisCard[propertyName])&&i<elem.endPointPropertyArray.length-1?curDataForThisCard[propertyName][0]:curDataForThisCard[propertyName],curDataForThisCard=subJSON}return curDataForThisCard}if(void 0!==elem.endPointResponseObject&&void 0!==elem.endPointResponseObject2){let curDataForThisCardToRet=[];return curDataForThisCardToRet=curDataForThisCard[elem.endPointResponseObject],void 0!==curDataForThisCardToRet?applyFilterToTheData(curDataForThisCardToRet[elem.endPointResponseObject2],filterValues):[]}if("ROOT"===String(elem.endPointResponseObject).toUpperCase()){if(!Array.isArray(curDataForThisCard)){let curDataForThisCardArr=[];return curDataForThisCardArr.push(curDataForThisCard),applyFilterToTheData(curDataForThisCardArr,filterValues)}return applyFilterToTheData(curDataForThisCard,filterValues)}return applyFilterToTheData(curDataForThisCard[elem.endPointResponseObject],filterValues)}function applyFilterToTheData(curDataForThisCard,filterValues){const uniqueItemsSet=new Set;for(const key in filterValues){const filterValue=filterValues[key];if(Array.isArray(curDataForThisCard)){const filteredItems=curDataForThisCard.filter((item=>!(!item[key]||!filterValue)&&item[key]==filterValue));console.log(filteredItems),filteredItems.forEach((item=>uniqueItemsSet.add(item)))}}return Array.from(uniqueItemsSet)}}const styles=lit_element.AH`
  :host([disabled]) {
  }
  * {
    box-sizing: border-box;
  }

  .box-content {
    width: fit-content;
    border-radius: 4px;
    background-color: #24c0eb1a;
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border: 2px solid #0465fb;
  }

  .box-content_allowmove_false {
    width: 100%;
    border-radius: 4px;
    background-color: #aca2a2;
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border: 2px solid #03A9F4;
    height:100%;
  }
  .box-content_allowmove_true {
    width: fit-content;
    border-radius: 4px;
    background-color: #20B2AA;
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border: 2px solid #03A9F4;
  }  

  .box {
    width: 80px;
    height: 80px;
    background-color: rgb(191 231 241); 
    border: 2px solid rgb(119 206 230);
    padding: 2px;
    color: white;
    cursor: pointer;
    flex:1;
  }

  .row-num {
    color: white;
    width: 20px;
    height: 80px;
    display: flex;
    align-items: center;
  }

  .col-num {
    color: white;
    width: 80px;
    height: 20px;
    text-align: center;
    flex:1;
  }

  .row-content {
    display: flex;
    flex-direction: row;
    gap: 2px;
  }

  .first-item {
    width: 20px;
    height: 20px;
  }

  .position {
    display: flex;
    justify-content: space-between;
  }

  .data-view {
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: break-word;
    text-align: center;
    flex-direction: column;
  }

  .add-circle {
    margin-top: 10px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: white;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: #03A9F4;

  }

  .accept-btn {
    background-color: rgba(36, 192, 235, 1);
    border-radius: 4px;
    padding: 8px 12px;
    color: white;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
  }

  .view-btn {
    border: 2px solid rgba(36, 192, 235, 1);
    background-color: #54CCEF;
    border-radius: 4px;
    padding: 8px 12px;  
    color: white;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
  }

  .view-btn.active {
    color: rgb(19,11,111);
    background-color: #8DDDF4;
  }

  .box.active {
    border-color: #FF8E00;
  }

  .selected-cell-content {
    color: rgb(19,11,111);
    border: 2px solid #03A9F4;
    border-radius: 8px;
    background-color: #42BFF7;
    text-align: left;
    padding: 4px 8px;
  }

  table {
    border-collapse: collapse;
  }
  
  th, td {
    text-align: left;
    padding: 8px;
  }
  
  th {
    background-color: #04AA6D;
    color: white;
  }

  tr {
    background-color: white;
  }
  table, td, th {
    border: 1px solid #03A9F4;
  }
  table.dragdropable.TRAZiT-DefinitionArea {

  }
  table.dragdropable.TRAZiT-DefinitionArea thead tr th {
    background-color: #2989d8 !important;
    color: white;
  }

  table.dragdropable.TRAZiT-UsersArea thead tr th {
    background-color: white;
    color: gray;
  }

  table.dragdropable {
    border-collapse: collapse;
    width: 100%;
    font-family: Montserrat;
    font-size: 16px;
  }

  table.dragdropable.TRAZiT-UsersArea tr {
    border: none; 
    border-bottom: 1px solid #dddddd;
  }

  table.dragdropable tr {
    border: 1px solid #dddddd;
    text-align: center;
    color: #808080;
  }

  table.dragdropable.TRAZiT-UsersArea tr:nth-child(even) {
    background-color: white;
  }

  table.dragdropable.TRAZiT-UsersArea tr:last-child {
    border: none;
  }

  table.dragdropable.TRAZiT-UsersArea thead {
    border-bottom: 1px solid #dddddd;
  }

  table.dragdropable tr:nth-child(even) {
    background-color: rgb(214, 233, 248);
  }

  table.dragdropable.TRAZiT-DefinitionArea th {
    padding: 16px 20px;
    background-color: #2989d8 !important;
    border: 1px solid #dddddd !important;
  }

  table.dragdropable td, th {
    padding: 16px 20px;
    border: 1px solid #dddddd !important;
  }

  table.dragdropable.TRAZiT-UsersArea td, th {
    border: none !important;
  }

  table.dragdropable tr {
    cursor: pointer;
  }

  table.dragdropable.TRAZiT-DefinitionArea tr:hover td {
    background-color: #2989d830 !important;
  }

  table.dragdropable.TRAZiT-UsersArea tr:hover td {
    background-color: #2989d830 !important;
  }
`;var lit_element_router=__webpack_require__("./node_modules/lit-element-router/lit-element-router.js"),ButtonsFunctions=__webpack_require__("./src/components/Buttons/ButtonsFunctions.js"),DialogsFunctions=__webpack_require__("./src/components/GenericDialogs/DialogsFunctions.js"),GridFunctions=__webpack_require__("./src/components/grid_with_buttons/GridFunctions.js"),ActionsFunctions=__webpack_require__("./src/components/Actions/ActionsFunctions.js");class DragDropBox extends((0,ActionsFunctions.$)((0,GridFunctions.G)((0,DialogsFunctions.X)((0,ButtonsFunctions.n)((0,lit_element_router.gM)(lit_element.WF)))))){static get styles(){return styles}static get properties(){return{config:{type:Object},data:{type:Array},selectedIndex1:{type:String},selectedIndex2:{type:Number},selectedBox:{type:Object}}}constructor(){super(),this.config={},this.selectedIndex1="",this.selectedIndex2=0,this.selectedBox=void 0,this.selectedTr=void 0,this.dropBoxData={id:void 0,x:"",y:"",name:"",temperature:"",study:""},this.dragTrData={id:void 0,temperature:"",study:""},this.data=[],this.dragElement=void 0,this.viewContentIndex=0,this.listBoxViewMode=!1,this.dragTr=!1,this.dragBackgroundColor=void 0,this.dropBackgroundColor=void 0,this.dragParentElement=void 0,this.viewTable=!0,this.viewTableBox=!0}render(){return console.log("render","data",this.data),void 0===this.viewModelFromProcModel.viewMode&&(this.viewModelFromProcModel.viewMode=1),template({data:this.data,selectedIndex1:this.selectedIndex1,selectedIndex2:this.selectedIndex2,listBoxViewMode:this.listBoxViewMode,viewContentIndex:this.viewContentIndex,viewTable:this.viewTable,viewTableBox:this.viewTableBox,setSelectBoxIndex:this._setSelectBoxIndex,setViewMode:this._setViewMode,dropBox:this._dropBox,allowDrop:this._allowDrop,dropTableTr:this._dropTableTr,allowDropTr:this._allowDropTr,dragBox:this._dragBox,dragTableTr:this._dragTableTr,setShowBoxViewModeList:this._setShowBoxViewModeList,setBoxPosicsViewFilter:this._setBoxPosicsViewFilter,setViewTable:this._setViewTable,setViewTableButtonLabel:this._setViewTableButtonLabel,setBoxView:this._setBoxView,showBoxContent:this._showBoxContent,iconRendererSrc:this.iconRendererSrc},this.selectedBox,this.viewModelFromProcModel,this.lang,this)}_showBoxContent=(data,i)=>{this.selectedBox=data,this.selectedBox.cols=data.cols,this.selectedBox.rows=data.rows,this.viewTableBox=!1,this.requestUpdate()};_setBoxView=()=>{this.viewTableBox=!this.viewTableBox,this.selectedBox=void 0,this.requestUpdate()};_setViewTable=()=>{this.viewTable=!this.viewTable,this.requestUpdate()};_setViewTableButtonLabel=()=>{let labels={hide:{label_en:"Hide Table",label_es:"Ocultar Tabla"},show:{label_en:"Show Table",label_es:"Mostrar Tabla"}};return this.viewTable?labels.hide["label_"+this.lang]:labels.show["label_"+this.lang]};_dragTableTr=(e,elem,dragElement)=>{this.dragTr=!0,this.dragElement=dragElement};_setBoxPosicsViewFilter=mode=>{console.log("viewmode",mode),this.viewContentIndex=mode,this.requestUpdate()};_setShowBoxViewModeList=()=>{this.listBoxViewMode=!this.listBoxViewMode,this.requestUpdate()};_allowDrop=e=>{e.preventDefault()};_dropBox=(e,y,x)=>{e.preventDefault(),this.selectedBox.posicx=x,this.selectedBox.posicy=y,this.selectedBox.datas.some((item=>item.posX===y&&item.posY===x))?"en"===this.lang?alert("Position occupied already"):alert("Posición ocupada actualmente"):void 0!==this.viewModelFromProcModel.dropAction?!1!==this.dataIntegrityChecks(this.viewModelFromProcModel,this.selectedBox,this.dragElement)&&(alert("Success to Drop"),this.trazitButtonsMethod(e,!1,this.viewModelFromProcModel.dropAction,!0,void 0,void 0,this.selectedBox,!1,void 0,this.selectedBox,this.dragElement)):"en"===this.lang?(console.log("viewModelFromProcModel",this.viewModelFromProcModel),alert("No drop action defined")):alert("No hay definida acción al soltar")};_allowDropTr=e=>{e.preventDefault()};_dropTableTr=e=>{e.preventDefault(),e.target.parentNode.innerHTML=this.selectedTr};_dragBox=(e,x,y)=>{this.dragBoxData.x=x,this.dragBoxData.y=y,this.selectedBox.datas.map(((item,index)=>{item.posX==x&&item.posY==y&&(this.dragBoxData.id=item.id,this.dragBoxData.name=item.name,this.dragBoxData.temperature=item.temperature,this.dragBoxData.study=item.study)})),console.log("asdf",this.dragBoxData),this.dragTr=!1;let currentElement=e.target;for(;currentElement&&!currentElement.classList.contains("box");)currentElement=currentElement.parentElement;this.dragParentElement=currentElement,this.dragBackgroundColor=currentElement.style.backgroundColor,this.dragElement=e.target.childNodes[1],this.selectedBox=e.target.childNodes[1].innerHTML};_setSelectBoxIndex=(first,second)=>{this.selectedIndex1=first,this.selectedIndex2=second,this.requestUpdate()};_setViewMode=mode=>{this.viewModelFromProcModel.viewMode=mode,this.requestUpdate()};dataIntegrityChecks(viewModel,selectedBox,dropData){return void 0===viewModel||void 0===viewModel.dataIntegrityCheck||!!this.dataIntegrityDragElementMandatoryProps(viewModel,selectedBox,dropData)&&!!this.dataIntegrityDragElementMandatoryPropsAndMatchValues(viewModel,selectedBox,dropData)}dataIntegrityDragElementMandatoryProps(viewModel,selectedBox,dropData){if(void 0===viewModel.dataIntegrityCheck.dropingEntryRequiredProperties)return!0;for(const property of viewModel.dataIntegrityCheck.dropingEntryRequiredProperties)if(!(property in dropData))return alert("The property "+property+" is required and not found"),!1;return!0}dataIntegrityDragElementMandatoryPropsAndMatchValues(viewModel,selectedBox,dropData){if(void 0===viewModel.dataIntegrityCheck.dropingEntryRequiredPropertiesAndMatchValues)return!0;for(const entry of viewModel.dataIntegrityCheck.dropingEntryRequiredPropertiesAndMatchValues){if(!("name"in entry)||!("criteria"in entry))return alert("Each entry must contain a name and criteria"),!1;const propertyName=entry.name,criteria=entry.criteria;if(!(propertyName in dropData))return alert("The property "+propertyName+" is required and not found"),!1;switch(criteria.type){case"value":if(String(dropData[propertyName])!==String(criteria.value))return alert(`The value for ${propertyName} must exactly match ${criteria.value} but is ${dropData[propertyName]}`),!1;break;case"values":if(!criteria.values.map(String).includes(String(dropData[propertyName]))){let validValuesList=criteria.values.join(", ");return alert(`The value for ${propertyName} must be one of the specified values: [${validValuesList}]`),!1}break;case"greater":if("number"!=typeof dropData[propertyName]||dropData[propertyName]<criteria.value)return alert(`The value for ${propertyName} must be a number greater than ${criteria.value}`),!1;break;case"greater_or_equal":if("number"!=typeof dropData[propertyName]||dropData[propertyName]<=criteria.value)return alert(`The value for ${propertyName} must be a number greater than ${criteria.value}`),!1;break;case"less":if("number"!=typeof dropData[propertyName]||dropData[propertyName]>criteria.value)return alert(`The value for ${propertyName} must be a number less than ${criteria.value}`),!1;break;case"less_or_equal":if("number"!=typeof dropData[propertyName]||dropData[propertyName]>=criteria.value)return alert(`The value for ${propertyName} must be a number less than ${criteria.value}`),!1;break;case"range":if("number"!=typeof dropData[propertyName]||dropData[propertyName]<criteria.min||dropData[propertyName]>criteria.max)return alert(`The value for ${propertyName} must be a number between ${criteria.min} and ${criteria.max}`),!1;break;case"selectedBox_value":let selectedBoxPropertyName=criteria.selectedBoxPropName||propertyName;if(String(dropData[propertyName])!==String(selectedBox[selectedBoxPropertyName]))return alert(`The value for ${propertyName} in dropData must match the value of ${selectedBoxPropertyName} in selectedBox that is ${selectedBox[selectedBoxPropertyName]}`),!1;break;case"selectedBox_range":selectedBoxPropertyName=criteria.selectedBoxPropName||propertyName;let range=selectedBox[selectedBoxPropertyName].split("-").map(Number);if(2!==range.length||isNaN(range[0])||isNaN(range[1])||dropData[propertyName]<range[0]||dropData[propertyName]>range[1])return alert(`The value for ${propertyName} in dropData must be within the range specified in selectedBox for ${selectedBoxPropertyName} (${selectedBox[selectedBoxPropertyName]})`),!1;break;default:return alert(`Invalid criteria type for ${propertyName}`),!1}}return!0}}window.customElements.define("dragdrop-box",DragDropBox)},"./src/components/GenericDialogs/DialogsFunctions.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X:()=>DialogsFunctions});var _Buttons_ButtonsFunctions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/Buttons/ButtonsFunctions.js"),_Actions_ActionsFunctions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Actions/ActionsFunctions.js");function DialogsFunctions(base){return class extends((0,_Actions_ActionsFunctions__WEBPACK_IMPORTED_MODULE_1__.$)((0,_Buttons_ButtonsFunctions__WEBPACK_IMPORTED_MODULE_0__.n)(base))){dialogAccept(selected=!0){void 0===this.actionBeingPerformedModel.clientMethod?selected?this.trazitCredsChecker(this.actionBeingPerformedModel.actionName,this.selectedItems[0].sample_id,this.jsonParam(this.actionBeingPerformedModel,this.selectedItems[0]),this.actionBeingPerformedModel):this.trazitCredsChecker(this.actionBeingPerformedModel.actionName,null,this.jsonParam(this.actionBeingPerformedModel,this.selectedItems[0]),this.actionBeingPerformedModel):this[this.actionBeingPerformedModel.clientMethod]()}dialogAcceptForGrid(selected=!0,gridSelectedObject){void 0===this.actionBeingPerformedModel.clientMethod?selected?this.trazitCredsChecker(this.actionBeingPerformedModel.actionName,this.selectedItems[0].sample_id,this.jsonParam(this.actionBeingPerformedModel,this.selectedItems[0],null,gridSelectedObject),this.actionBeingPerformedModel):this.trazitCredsChecker(this.actionBeingPerformedModel.actionName,null,this.jsonParam(this.actionBeingPerformedModel,this.selectedItems[0],null,gridSelectedObject),this.actionBeingPerformedModel):this[this.actionBeingPerformedModel.clientMethod]()}}}},"./src/components/GenericDialogs/TrazitCredentialsDialogs.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>TrazitCredentialsDialogs});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.yalc/@trazit/cred-dialog/.yalc/@trazit/common-core/index.js"),_collaborne_lit_flexbox_literals__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@collaborne/lit-flexbox-literals/dist/index.js"),_DialogsFunctions__WEBPACK_IMPORTED_MODULE_7__=(__webpack_require__("./node_modules/@material/mwc-list/mwc-list-item.js"),__webpack_require__("./node_modules/@material/mwc-select/mwc-select.js"),__webpack_require__("./node_modules/@material/mwc-checkbox/mwc-checkbox.js"),__webpack_require__("./node_modules/@material/mwc-formfield/mwc-formfield.js"),__webpack_require__("./src/components/GenericDialogs/DialogsFunctions.js"));const langConfig={pwdWindowTitle:{label_en:"Please confirm your credentials (user & password)",label_es:"Por favor confirma tu identidad (usuario y contraseña)"},esignWindowTitle:{label_en:"Please enter your eSign",label_es:"Por favor entra tu frase de Firma Electrónica"},justificationWindowTitle:{label_en:"Please enter the justification phrase",label_es:"Por favor entra tu frase de justificación"},action:{label_en:"Action name",label_es:"Nombre de la acción"},userToCheck:{label_en:"User",label_es:"Usuario"},pwToCheck:{label_en:"Password",label_es:"Contraseña"},esgToCheck:{label_en:"Esign",label_es:"Esign"},jstToCheck:{label_en:"Justification Phrase",label_es:"Frase de Justificación"},notCorrectMessage:{now:{message_en:"Validation not completed, action aborted",message_es:"Validación no completada, acción abortada"},dialog_cancelled:{message_en:"dialog canceled, action aborted",message_es:"Diálogo cancelado, acción abortada"},attempts_consumed:{message_en:"All attempts consumed, action aborted",message_es:"Todos los intentos consumidos, acción abortada"}}};function TrazitCredentialsDialogs(base){return class extends((0,_DialogsFunctions__WEBPACK_IMPORTED_MODULE_7__.X)(base)){static get styles(){return[_collaborne_lit_flexbox_literals__WEBPACK_IMPORTED_MODULE_2__.G6,lit__WEBPACK_IMPORTED_MODULE_0__.AH`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
      tr-dialog {
        --mdc-dialog-heading-ink-color: blue;
        --mdc-typography-headline6-font-size: 35px;
        position: relative;
        z-index:999;
      }
      .content {
        opacity: 0.9;
      }
      .content * {
        margin: 5px 0;
      }
      p.attemptsphraseblue {
        color: #464dbb;
      }
      p.attemptsphrasered {
        color: #f3371680;
        animation-duration: 2s;
        animation-name: slidein;
      }
      @keyframes slidein {
        from {
          margin-left: 30%;
        }
        to {
          margin-left: 0%;
        }
      }           
      @media (max-width: 460px) {
      }
      mwc-textfield {
        border-style : Solid;
        border-color : #999999;
        border-color : rgba(153, 153, 153, 1);
        border-width : 1px;
        border-radius : 7px;
        -moz-border-radius : 7px;
        -webkit-border-radius : 7px;   
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background-color :  #FFFFFF;
        background-color : rgb(255, 255, 255);  
        --mdc-text-field-idle-line-color:#148CFA;
        --mdc-text-field-outlined-idle-border-color: #148CFA;
        --mdc-text-field-label-ink-color:  #148CFA;
        --mdc-text-field-focused-label-color: #148CFA;
        --mdc-theme-primary: #0465FB;
      }      
      mwc-select {        
        --mdc-theme-primary : rgba(36, 192, 235, 1);
        --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
        --mdc-select-ink-color: rgb(47, 47, 47);
        --mdc-select-dropdown-icon-color:rgba(36, 192, 235, 1);
        --mdc-select-hover-line-color:rgba(36, 192, 235, 1);
        --mdc-notched-outline-border-color: rgba(186, 235, 248, 0.4);
        --mdc-select-disabled-dropdown-icon-color:rgba(36, 192, 235, 1);

        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }
      mwc-select.outlined {        
        --mdc-theme-primary : rgba(36, 192, 235, 1);
        --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
        --mdc-select-ink-color: rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background-color: 4fcad029;
      }
      tr-dialog#confirmDialog {
        --mdc-dialog-z-index: 9;
      }
      `]}static get properties(){return{type:{type:String},header:{type:String},changing:{type:Boolean},attempt:{type:Number},maxFails:{type:Number},actionName:{type:String},actionObj:{type:Object},objectId:{type:String},justificationType:{type:String},nonProc:{type:Boolean},escapeKey:{type:Boolean},reqParams:{type:Object}}}constructor(){super(),this.escapeKey=!0,this.reqParams={},this.reset()}reset(){this.type="",this.changing=!1,this.attempt=0,this.maxFails=3,this.justificationType="",this.nonProc=!1,this.actionObj={}}firstUpdated(){super.firstUpdated(),this.updateComplete.then((()=>{null!==this.dialogSurface&&(this.dialogSurface.style.backgroundImage="url(/images/abstract.jpg)",this.dialogSurface.style.backgroundSize="cover",this.dialogSurface.style.backgroundRepeat="no-repeat",this.dialogSurface.style.textAlign="center"),null!==this.credDialog&&(this.credDialog.shadowRoot.querySelector("h2#title").style.fontSize="20px",this.credDialog.shadowRoot.querySelector("#content").style.paddingBottom="0")}))}headerLabel(){return"user"==this.type?`${langConfig.pwdWindowTitle["label_"+this.lang]}`:"esign"==this.type?`${langConfig.esignWindowTitle["label_"+this.lang]}`:`${langConfig.justificationWindowTitle["label_"+this.lang]}`}openThisDialog(actionModel=this.actionBeingPerformedModel){return!!(actionModel&&actionModel.dialogInfo&&actionModel.dialogInfo.fields)}credentialsDialog(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
          <tr-dialog id="credDialog" 
          style="position: relative; z-index:999;"
            @closed=${this.closed}
            .heading="${this.headerLabel()}"
            hideActions=""
            scrimClickAction=""            
            .escapeKeyAction="${this.escapeKey?"close":""}">
            ${this.changing||this.nonProc?lit__WEBPACK_IMPORTED_MODULE_0__.s6:lit__WEBPACK_IMPORTED_MODULE_0__.qy`<div style="position:absolute;left:15px;top:8px;font-size:12px;">
                ${this.actionObj.button?this.actionObj.button.title["label_"+this.lang]:this.actionName} (id: ${this.objectId})
              </div>`}
            <div class="content layout vertical flex center-justified">
              ${this.inputField()}
              ${this.changing||this.nonProc?null:lit__WEBPACK_IMPORTED_MODULE_0__.qy`${this.auditField()}`}
              <div style="margin-top:30px">
                ${this.nonProc?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<sp-button size="xl" variant="secondary" @click=${this.failedAttempt}>${_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__.k.cancelDialogButton["label_"+this.lang]}</sp-button>`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`<sp-button size="xl" variant="secondary" dialogAction="close">${_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__.k.cancelDialogButton["label_"+this.lang]}</sp-button>`}
                <sp-button size="xl" @click=${this.checking}>${_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__.k.confirmDialogButton["label_"+this.lang]}</sp-button>
              </div>
              ${this.setAttempts()}
            </div>
          </tr-dialog>
          <tr-dialog id="confirmDialog" 
            ?hideXtoClose=${!0}
            heading=""
            hideActions=""
            scrimClickAction=""
            .zIndex=${9}
          >
            <div class="layout vertical flex center-justified">
              <div>${_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__.k.confirmActionPhrase["label_"+this.lang]} ${this.actionObj.button?this.actionObj.button.title["label_"+this.lang]:this.actionName}?</div>
              <div style="margin-top:30px;text-align:center">
                <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
                  ${_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__.k.cancelDialogButton["label_"+this.lang]}</sp-button>
                <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.addJustificationPhrase}>
                  ${_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__.k.confirmDialogButton["label_"+this.lang]}</sp-button>
              </div>
            </div>
          </tr-dialog>
        `}get confirmDialog(){return this.shadowRoot.querySelector("tr-dialog#confirmDialog")}closed(){this.reset(),this.pwd&&(this.pwd.value=""),this.esg&&(this.esg.value=""),this.jst&&(this.jst.value="")}inputField(){return"user"==this.type?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
        <mwc-textfield id="userTxtFld" label="${langConfig.userToCheck["label_"+this.lang]}" type="text"
        dialogInitialFocus ></mwc-textfield>
        <mwc-textfield id="pwd" label="${this.adjustLbl(`${langConfig.pwToCheck["label_"+this.lang]}`)}" type="password" iconTrailing="visibility" 
          
          @click=${this.showPwd}
          @keypress=${e=>this.keyPress(e,"checkingUser")}></mwc-textfield>
      `:"esign"==this.type?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
        <mwc-textfield id="esg" label="${this.adjustLbl(`${langConfig.esgToCheck["label_"+this.lang]}`)}" type="password" iconTrailing="visibility" 
          dialogInitialFocus
          @click=${this.showPwd}
          @keypress=${e=>this.keyPress(e,"checkingEsignPhrase")}></mwc-textfield>
      `:void 0}auditField(){return null===this.justificationType||void 0===this.justificationType||"TEXT"==this.justificationType||"LABPLANET_FALSE"==this.justificationType?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
        <mwc-textfield id="jst" label="${this.adjustLbl(`${langConfig.jstToCheck["label_"+this.lang]}`)}" type="text" 
          ?dialogInitialFocus=${!!this.justificationType} 
          @keypress=${this.keyPress}></mwc-textfield>
      `:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
      <vaadin-combo-box id="jst"
          item-label-path="name"
          item-value-path="id"
          .placeholder="${langConfig.jstToCheck["label_"+this.lang]}"
          .label="${langConfig.jstToCheck["label_"+this.lang]}"
          .value=${"LIST"==this.justificationType?this.justificationList[0]:null}
          ?dialogInitialFocus=${!!this.justificationType}
          @keypress=${this.keyPress}
          @change=${this.keyPress}
          .items="${this.justificationList}"></vaadin-combo-box>
      `}adjustLbl(label){return this.changing?"en"==this.lang?"Current "+label:label+" Actual":label}get credDialog(){return this.shadowRoot.querySelector("tr-dialog#credDialog")}get userTxtFld(){return this.shadowRoot.querySelector("mwc-textfield#userTxtFld")}get pwd(){return this.shadowRoot.querySelector("mwc-textfield#pwd")}get esg(){return this.shadowRoot.querySelector("mwc-textfield#esg")}get jst(){return this.shadowRoot.querySelector("#jst")}get dialogSurface(){return null===this.credDialog?null:this.credDialog.shadowRoot.querySelector(".mdc-dialog__surface")}keyPress(e,method){13==e.keyCode&&(method&&this.justificationType?this.jst.focus():this.checking())}checking(){"user"==this.type?this.checkingUser():"esign"==this.type?this.checkingEsignPhrase():"justification"==this.type&&this.addJustificationPhrase()}checkAttempt(){this.attempt>1?this.failedAttempt():this.attempt++}failedAttempt(){this.credDialog.close()}buildCreadArgumentsObj(){let credArguments={};return this.userName&&(credArguments.userToCheck=this.userName),this.userTxtFld&&null!==this.userTxtFld.value&&String(this.userTxtFld.value).length>0&&(credArguments.userToCheck=this.userTxtFld.value),this.pwd&&null!==this.pwd.value&&String(this.pwd.value).length>0&&(credArguments.passwordToCheck=this.pwd.value),this.esg&&null!==this.esg.value&&String(this.esg.value).length>0&&(credArguments.esignPhraseToCheck=this.esg.value),this.jst&&null!==this.jst.value&&String(this.jst.value).length>0&&(credArguments.auditReasonPhrase=this.jst.value),credArguments}checkingUser(){let params=this.config.backendUrl+this.config.appAuthenticateApiUrl+"?"+new URLSearchParams({actionName:"TOKEN_VALIDATE_USER_CREDENTIALS",finalToken:JSON.parse(sessionStorage.getItem("userSession")).finalToken,userToCheck:this.userTxtFld.value,passwordToCheck:this.pwd.value});this.fetchApi(params).then((j=>{if(j.is_error)this.checkAttempt();else{let actionInfoToAPIcall=JSON.parse(sessionStorage.getItem("actionInfoToAPIcall"));this.trazitNextRequest(actionInfoToAPIcall.action,actionInfoToAPIcall.actionParams,this.buildCreadArgumentsObj(),actionInfoToAPIcall.gridSelectedItem,actionInfoToAPIcall.parentData)}}))}addJustificationPhrase(){let actionInfoToAPIcall=JSON.parse(sessionStorage.getItem("actionInfoToAPIcall"));this.trazitNextRequest(actionInfoToAPIcall.action,actionInfoToAPIcall.actionParams,this.buildCreadArgumentsObj(),actionInfoToAPIcall.gridSelectedItem,actionInfoToAPIcall.parentData)}checkingEsignPhrase(){let params=this.config.backendUrl+this.config.appAuthenticateApiUrl+"?"+new URLSearchParams({actionName:"TOKEN_VALIDATE_ESIGN_PHRASE",finalToken:JSON.parse(sessionStorage.getItem("userSession")).finalToken,esignPhraseToCheck:this.esg.value});this.fetchApi(params).then((j=>{if(j.is_error)this.checkAttempt();else{let actionInfoToAPIcall=JSON.parse(sessionStorage.getItem("actionInfoToAPIcall"));this.trazitNextRequest(actionInfoToAPIcall.action,actionInfoToAPIcall.actionParams,this.buildCreadArgumentsObj(),actionInfoToAPIcall.gridSelectedItem,actionInfoToAPIcall.parentData)}}))}setAttempts(){if("justification"==this.type)return;let txt="en"==this.lang?`*** Attempts: ${this.attempt} of 3`:`*** Intentos: ${this.attempt} de ${this.maxFails}`;return lit__WEBPACK_IMPORTED_MODULE_0__.qy`<p class=${0==this.attempt?"attemptsphraseblue":"attemptsphrasered"}>${txt}</p>`}nextRequestCommons(action){console.log("nextRequestCommons"),this.reqParams={...this.reqParams,procInstanceName:this.procInstanceName,finalToken:JSON.parse(sessionStorage.getItem("userSession")).finalToken,dbName:this.config.dbName,actionName:action.actionName,userToCheck:this.userName,passwordToCheck:this.pwd?this.pwd.value:"",esignPhraseToCheck:this.esg?this.esg.value:"",auditReasonPhrase:this.jst?this.jst.value:""};let params=this.config.backendUrl+action.endPoint+"?"+new URLSearchParams(this.reqParams);this.fetchApi(params).then((()=>{}));let cleanParams={};Object.entries(this.reqParams).map((([key,value])=>{null==value&&null==value||(cleanParams[key]=value)})),this.reqParams=cleanParams,this.credDialog&&this.credDialog.close()}}}},"./src/components/GenericDialogs/TrazitEnterResultWithSpec.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F:()=>TrazitEnterResultWithSpec});var lit=__webpack_require__("./node_modules/lit/index.js"),dist=__webpack_require__("./node_modules/@collaborne/lit-flexbox-literals/dist/index.js"),lit_vaadin_helpers_dist=__webpack_require__("./node_modules/lit-vaadin-helpers/dist/index.js"),common_core=__webpack_require__("./.yalc/@trazit/cred-dialog/.yalc/@trazit/common-core/index.js"),lit_element=(__webpack_require__("./node_modules/@material/mwc-list/mwc-list-item.js"),__webpack_require__("./node_modules/@material/mwc-select/mwc-select.js"),__webpack_require__("./node_modules/@material/mwc-checkbox/mwc-checkbox.js"),__webpack_require__("./node_modules/@material/mwc-formfield/mwc-formfield.js"),__webpack_require__("./node_modules/lit-element/lit-element.js"));__webpack_require__("./node_modules/@vaadin/vaadin-context-menu/vaadin-context-menu.js");const template=props=>{const{name,label,this:thisComponent,handleUpload}=props,getFile=event=>{thisComponent.selectedFile=event.target.files[0],thisComponent.requestUpdate()},removeFile=()=>{thisComponent.selectedFile&&(thisComponent.selectedFile=null);thisComponent.shadowRoot.querySelector(`#${name}`).value="",thisComponent.requestUpdate()};return lit_element.qy`<div id="file-container">${lit_element.qy`
    <div class="container">
      <div class="button-wrap">
      ${thisComponent.selectedFile?lit_element.qy`
      <label class="button" @click=${handleUpload} >Upload</label>
      `:lit_element.qy`
      <label class="button" for="${name}">${label}</label>
      `}
        
        
        <input @change="${getFile}" id="${name}" type="file">
        ${thisComponent.selectedFile?lit_element.qy`<p>${thisComponent.selectedFile.name}</p> <span @click=${removeFile}>&#x2716</span>`:""}
      </div>
    </div>
    <vaadin-context-menu .items=${[{text:"View"},{text:"Edit"},{text:"Delete"}]}>
      <template>
        <vaadin-list-box>
          <vaadin-item>First menu item</vaadin-item>
          <vaadin-item>Second menu item</vaadin-item>
        </vaadin-list-box>
      </template>
    </vaadin-context-menu>
    <vaadin-context-menu .items=${[{text:"View"},{text:"Edit"},{text:"Delete"}]}>
    </vaadin-context-menu>
  `}</div>`},styles=lit_element.AH`
  :host {
    display: block;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  input[type="file"] {
    position: absolute;
    z-index: -1;
    top: 15px;
    left: 20px;
    font-size: 17px;
    color: #b8b8b8;
  }

  .button-wrap {
    position: relative;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    gap:10px;
  }

  .button {
    display: inline-block;
    background-color: #007bff; 
    border: none; 
    color: #fff; 
    padding:3px;
    text-align: center;
    font-size: 16px; 
    border-radius: 4px;
    transition: background-color 0.3s; 
    cursor: pointer;
}

.button:hover {
    background-color: #0056b3; 
}
`;var ApiFunctions=__webpack_require__("./src/components/Api/ApiFunctions.js");class UploadButton extends((0,ApiFunctions.Y)(lit_element.WF)){static get styles(){return styles}static get properties(){return{name:String,label:String,config:{type:Object},action:{type:Object},selectedItem:{type:Object},procInstanceName:String,selectedfile:{}}}constructor(){super(),this.selectedfile=null,this.name="",this.label="",this.config={},this.action={},this.selectedItem={}}render(){return template({name:this.name,label:this.label,this:this,handleUpload:this._upload})}_uploadYanko=async()=>{const files=this.shadowRoot.querySelector(`#${this.name}`).files;let result={error:0,message:""};try{if(0===files.length)throw new Error("No file selected");let form=new FormData;form.append("title","Sample"),form.append("file",files[0]);let response=await fetch("/upload.php",{method:"POST",credentials:"same-origin",body:form});if(200!=response.status)throw new Error("HTTP response code != 200");let json=await response.json();if(1==json.error)throw new Error(json.message)}catch(e){result={error:1,message:e.message}}return console.log(result),result};_uploadHybrid=async()=>{console.log("action",this.action,"selectedItem",this.selectedItem);const files=this.shadowRoot.querySelector(`#${this.name}`).files;let result={error:0,message:""};this.action.actionName.includes("_PARSING")||(this.action.actionName=this.action.actionName+"_PARSING");try{if(0===files.length)throw new Error("No file selected");let form=new FormData;form.append("title","Sample"),form.append("file",files[0]);let params="http://localhost:8081/TRAZiT-API/moduleProjectRnD/ProjectRnDAPIactions?actionName=FORMULA_ADD_INGREDIENT&dbName=demo_v0_9_2&procInstanceName=RandD&finalToken=eyJ1c2VyREIiOiJhZG1pbiIsImRhdGV0aW1lRm9ybWF0QXRQbGF0Zm9ybUxldmVsIjoiRElTQUJMRUQiLCJwcm9jc01vZHVsZU5hbWUiOiJpbnNwZWN0aW9uX2xvdCpJTlNQRUNUSU9OX0xPVFN8aW5zdHJ1bWVudHMqSU5TVFJVTUVOVFN8RGVtbypJTlNUUlVNRU5UU3xEaXNlYXNlU3R1ZGllcypDTElOSUNBTF9TVFVESUVTfG1iX2VtKk1PTklUT1JJTkd8c3RvY2sqU1RPQ0tTfG1vbl93YXRlcipNT05JVE9SSU5HfFJhbmREKlJhbmREIFBST0pFQ1RTIiwiZGJOYW1lIjoiZGVtb192MF85XzIiLCJ0eXAiOiJKV1QiLCJ1c2VyX3Byb2NlZHVyZV9oYXNoY29kZXMiOiJpbnNwZWN0aW9uX2xvdCoxKi03MDQyMTQ1NTZ8aW5zdHJ1bWVudHMqMSotOTQ0MTQ0NTQ3fERlbW8qMSoxNzcyNjIzMTI4fERpc2Vhc2VTdHVkaWVzKjEqMTk3NDc3MTczMXxtYl9lbSoxKjIzNDI0MjU0NXxzdG9jayoxKjEzNjEyMjU2OTF8bW9uX3dhdGVyKjEqMjA1MzgwNjg2NXxSYW5kRCoxKjEyMzg0NTgzNjUiLCJlU2lnbiI6ImZpcm1hZGVtbyIsInVzZXJEQlBhc3N3b3JkIjoidHJheml0IiwidXNlck1haWwiOiJORVd0cmF6aXQuaW5mb0BnbWFpbC5jb20iLCJ1c2VyX3Byb2NlZHVyZXMiOiJbaW5zcGVjdGlvbl9sb3QsIGluc3RydW1lbnRzLCBEZW1vLCBEaXNlYXNlU3R1ZGllcywgbWJfZW0sIHN0b2NrLCBtb25fd2F0ZXIsIFJhbmREXSIsImFwcFNlc3Npb25JZCI6IjYzODgiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJUdWUgTWF5IDIxIDE0OjM0OjE1IFVUQyAyMDI0IiwidXNlclJvbGUiOiJzdXBlcnVzZXIiLCJhbGciOiJIUzI1NiIsImludGVybmFsVXNlcklEIjoiNDU0ODkyMjMifQ.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.PNpQDZobs2EcR4L1pRUXE0lLDBNIZH2CDxexKTfidjk&formulaName=formula+nueva+1&ingredient=Almid%C3%B3n+de+ma%C3%ADz&quantity=100&quantityUom=mg&&isForTesting=false",targetValue={rawValueResult:"",resultId:this.selectedItem.result_id,eventId:this.selectedItem.event_id,instrumentName:this.selectedItem.instrument,variableName:this.selectedItem.param_name},APIParams=this.getAPICommonParams(this.action),endPointUrl=this.getActionAPIUrl(this.action);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);if(void 0!==this.config&&void 0!==this.config.backendUrl)params=this.config.backendUrl+endPointUrl;else{params=JSON.parse(sessionStorage.getItem("userSession")).backendUrl+endPointUrl}let actionParams=this.jsonParam(this.action.dialogInfo.action[0],this.selectedItem,targetValue,this.selectedItem,void 0,void 0,void 0);params=params+"?"+new URLSearchParams(APIParams)+"&"+new URLSearchParams(actionParams),console.log("_upload","action",this.action.actionName,params);let response=await fetch(params,{method:"POST",body:form,credentials:"same-origin"});if(200!==response.status){const errorText=await response.text();throw new Error(errorText)}}catch(e){result={error:1,message:e.message}}return console.log(result),result};_upload=async()=>{console.log("action",this.action,"selectedItem",this.selectedItem);const files=this.shadowRoot.querySelector(`#${this.name}`).files;let result={error:0,message:""};this.action.actionName.includes("_PARSING")||(this.action.actionName=this.action.actionName+"_PARSING");try{if(0===files.length)throw new Error("No file selected");let form=new FormData;form.append("file",files[0]);let params="http://localhost:8081/TRAZiT-API/moduleProjectRnD/ProjectRnDAPIactions?actionName=FORMULA_ADD_INGREDIENT&dbName=demo_v0_9_2&procInstanceName=RandD&finalToken=eyJ1c2VyREIiOiJhZG1pbiIsImRhdGV0aW1lRm9ybWF0QXRQbGF0Zm9ybUxldmVsIjoiRElTQUJMRUQiLCJwcm9jc01vZHVsZU5hbWUiOiJpbnNwZWN0aW9uX2xvdCpJTlNQRUNUSU9OX0xPVFN8aW5zdHJ1bWVudHMqSU5TVFJVTUVOVFN8RGVtbypJTlNUUlVNRU5UU3xEaXNlYXNlU3R1ZGllcypDTElOSUNBTF9TVFVESUVTfG1iX2VtKk1PTklUT1JJTkd8c3RvY2sqU1RPQ0tTfG1vbl93YXRlcipNT05JVE9SSU5HfFJhbmREKlJhbmREIFBST0pFQ1RTIiwiZGJOYW1lIjoiZGVtb192MF85XzIiLCJ0eXAiOiJKV1QiLCJ1c2VyX3Byb2NlZHVyZV9oYXNoY29kZXMiOiJpbnNwZWN0aW9uX2xvdCoxKi03MDQyMTQ1NTZ8aW5zdHJ1bWVudHMqMSotOTQ0MTQ0NTQ3fERlbW8qMSoxNzcyNjIzMTI4fERpc2Vhc2VTdHVkaWVzKjEqMTk3NDc3MTczMXxtYl9lbSoxKjIzNDI0MjU0NXxzdG9jayoxKjEzNjEyMjU2OTF8bW9uX3dhdGVyKjEqMjA1MzgwNjg2NXxSYW5kRCoxKjEyMzg0NTgzNjUiLCJlU2lnbiI6ImZpcm1hZGVtbyIsInVzZXJEQlBhc3N3b3JkIjoidHJheml0IiwidXNlck1haWwiOiJORVd0cmF6aXQuaW5mb0BnbWFpbC5jb20iLCJ1c2VyX3Byb2NlZHVyZXMiOiJbaW5zcGVjdGlvbl9sb3QsIGluc3RydW1lbnRzLCBEZW1vLCBEaXNlYXNlU3R1ZGllcywgbWJfZW0sIHN0b2NrLCBtb25fd2F0ZXIsIFJhbmREXSIsImFwcFNlc3Npb25JZCI6IjYzODgiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJUdWUgTWF5IDIxIDE0OjM0OjE1IFVUQyAyMDI0IiwidXNlclJvbGUiOiJzdXBlcnVzZXIiLCJhbGciOiJIUzI1NiIsImludGVybmFsVXNlcklEIjoiNDU0ODkyMjMifQ.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.PNpQDZobs2EcR4L1pRUXE0lLDBNIZH2CDxexKTfidjk&formulaName=formula+nueva+1&ingredient=Almid%C3%B3n+de+ma%C3%ADz&quantity=100&quantityUom=mg&&isForTesting=false",targetValue={rawValueResult:"",resultId:this.selectedItem.result_id,eventId:this.selectedItem.event_id,instrumentName:this.selectedItem.instrument,variableName:this.selectedItem.param_name},APIParams=this.getAPICommonParams(this.action),endPointUrl=this.getActionAPIUrl(this.action);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);if(void 0!==this.config&&void 0!==this.config.backendUrl)params=this.config.backendUrl+endPointUrl;else{params=JSON.parse(sessionStorage.getItem("userSession")).backendUrl+endPointUrl}let actionParams=this.jsonParam(this.action.dialogInfo.action[0],this.selectedItem,targetValue,this.selectedItem,void 0,void 0,void 0);for(let key in APIParams)APIParams.hasOwnProperty(key)&&form.append(key,APIParams[key]);for(let key in actionParams)actionParams.hasOwnProperty(key)&&form.append(key,actionParams[key]);console.log("_upload","action",this.action.actionName,params),this.dispatchEvent(new CustomEvent("show-progress",{bubbles:!0,composed:!0}));let response=await fetch(params,{method:"POST",body:form,credentials:"same-origin"});if(200!==response.status){const errorText=await response.text();throw new Error(errorText)}this.dispatchEvent(new CustomEvent("hide-progress",{bubbles:!0,composed:!0}))}catch(e){this.dispatchEvent(new CustomEvent("hide-progress",{bubbles:!0,composed:!0})),result={error:1,message:e.message}}return console.log(result),result}}window.customElements.define("upload-button",UploadButton);var ActionsFunctions=__webpack_require__("./src/components/Actions/ActionsFunctions.js");function TrazitEnterResultWithSpec(LitElement){return class extends((0,ActionsFunctions.$)(LitElement)){static get styles(){return[dist.G6,dist.C1,super.styles,lit.AH`
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
<style>
            input {
              border-style: solid;
              border-color: #999999;
              border-width: 1px;
              border-radius: 7px;
              font-family: Montserrat;
              font-weight: bold;
              /* font-size: 19px; */
              background-color: #FFFFFF;
              padding: 8px;
              flex: 1;
            }
            .input-container {
              display: flex;
              align-items: center;
            }
            .input-container span {
              font-family: Montserrat;
              font-weight: bold;
              /* font-size: 19px; */
              margin: 0 4px;
            }          
          </style>          
      `]}static get properties(){return{enterResults:{type:Array},selectedItems:{type:Array},actionBeingPerformedModel:{type:Object},procInstanceName:{type:String}}}constructor(){super(),this.enterResults=[],this.selectedItems=[],this.actionBeingPerformedModel={}}get erGrid(){return this.shadowRoot.querySelector("vaadin-grid#erGrid")}get resultDialog(){return this.shadowRoot.querySelector("tr-dialog#resultDialog")}get rItem(){return this.shadowRoot.querySelector("input[name=rItem]")}get rowTooltipEnterResults(){return this.shadowRoot.querySelector("#rowTooltipenterresults")}get uomDialog(){return this.shadowRoot.querySelector("tr-dialog#uomConvertionDialog")}resultTemplate(procInstanceName){return this.procInstanceName=procInstanceName,lit.qy`

      <style>
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
      #topLeft{
        color: rgb(94, 145, 186);
        font-family: Montserrat;
        font-weight: bold;
        font-size: calc(12px + 1.5vw);
        text-align: center;        
      }
      </style>


      <tr-dialog id="resultDialog" ?open=${this.enterResults.length}
        @opened=${()=>this.setCellListenerEnterResults()}
        @closing=${()=>this.removeEvents()}
        heading=""
        hideActions=""
        scrimClickAction="">
        ${void 0===this.actionBeingPerformedModel.dialogInfo||void 0===this.actionBeingPerformedModel?lit.s6:lit.qy`
          ${this.selectedItems.length&&void 0!==this.actionBeingPerformedModel.dialogInfo.resultHeaderObjectLabelTopLeft?lit.qy`<label id="topLeft" slot="topLeft" style="font-size:12px">${this.actionBeingPerformedModel.dialogInfo.resultHeaderObjectLabelTopLeft["label_"+this.lang]} ${this.selectedItems[0].sample_id||this.selectedItems[0].id}</label>`:lit.s6}
          <vaadin-grid id="erGrid" theme="row-dividers" column-reordering-allowed multi-sort
            .items=${this.enterResults}
            @selected-items-changed=${e=>{void 0!==this.actionBeingPerformedModel.dialogInfo&&void 0!==this.actionBeingPerformedModel.dialogInfo.name&&"resultDialog"===this.actionBeingPerformedModel.dialogInfo.name?this.selectedResults=[]:this.selectedResults=e.detail.value}}
            .detailsOpenedItems=${this.selectedResults}
            ${(0,lit_vaadin_helpers_dist.O)(this.detailRendererEnterResults)}>
            ${this.desktop?lit.qy`<vaadin-grid-selection-column header="" flex-grow="1"></vaadin-grid-selection-column>`:lit.qy`<vaadin-grid-selection-column header="" width="65px" resizable ></vaadin-grid-selection-column>`}

          ${void 0!==this.actionBeingPerformedModel.dialogInfo&&void 0!==this.actionBeingPerformedModel.dialogInfo.name&&"resultDialog"===this.actionBeingPerformedModel.dialogInfo.name&&void 0!==this.actionBeingPerformedModel.dialogInfo.subQueryName&&"getParams"===this.actionBeingPerformedModel.dialogInfo.subQueryName?lit.qy`${this.instrumentEventList()}`:lit.qy`${this.enterResultList()}`}
          </vaadin-grid>
          <div id="rowTooltipenterresults">&nbsp;</div>
        `}
      </tr-dialog>
      <tr-dialog id="uomConvertionDialog" ?open=${this.dataForDialog}
        heading="UOM Convertion List"
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <select @change=${e=>this.setUOM(this.dataForDialog.result_id,e.target.value)}>
            ${this.dataForDialog&&this.dataForDialog.ucm.map((u=>lit.qy`<option value=${u} ?selected=${u==this.dataForDialog.uom}>${u}</option>`))}
          </select>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${common_core.k.cancelDialogButton["label_"+this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `}detailRendererEnterResults(result){let labels={warning_reason_label_en:"Warning Reason",warning_reason_label_es:"Razón Aviso",locking_reason_label_en:"Locking Reason",locking_reason_label_es:"Razón Bloqueo"},specAreaLabels_method_title={label_en:"Method",label_es:"Método"},specAreaLabels_rule_title={label_en:"Range",label_es:"Rango"},specAreaLabels_no_rule={label_en:"Has no limited range",label_es:"No tiene rango asignado"},specAreaLabels_range_evaluation={label_en:"Evaluation",label_es:"Evaluación"};return lit.qy`
        <div style="text-align:center;font-size:12px">
          <p>${result.spec_eval?lit.qy`${"IN"==result.spec_eval||void 0!==result.spec_eval&&result.spec_eval.toUpperCase().includes("NO_SPEC_LIMIT")?lit.qy`<mwc-icon style="color:green">radio_button_checked</mwc-icon>`:lit.qy`${result.spec_eval.toUpperCase().includes("OUT")&&result.spec_eval.toUpperCase().includes("SPEC")?lit.qy`<mwc-icon style="color:red">radio_button_checked</mwc-icon>`:lit.qy`<mwc-icon style="color:orange">radio_button_checked</mwc-icon>`}`}`:lit.qy`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`}</p>
          <p>>${specAreaLabels_method_title["label_"+this.lang]}: ${result.method_name} (v${result.method_version})</p>
          <p>${specAreaLabels_rule_title["label_"+this.lang]}: ${void 0===result.spec_rule_info||void 0===result.spec_rule_info[0]||void 0===result.spec_rule_info[0].ruleRepresentation?specAreaLabels_no_rule["label_"+this.lang]:result.spec_rule_info[0].ruleRepresentation}</p>
          <p>${specAreaLabels_range_evaluation["label_"+this.lang]}:           
            ${result.spec_eval.toUpperCase().includes("NO_SPEC_LIMIT")?lit.qy`specAreaLabels.no_rule["label_"+this.lang]`:lit.qy`${result.spec_eval} (${result.spec_eval_detail})`}
          </p >
          ${result.is_locked?lit.qy`<p style="color:rgb(255 8 8)">${labels["locking_reason_label_"+this.lang]}: ${result.locking_reason["message_"+this.lang]}</p>`:lit.s6}
          ${result.warning_reason?lit.qy`<p style="color:#0085ff">${labels["warning_reason_label_"+this.lang]}: ${result.warning_reason["message_"+this.lang]}</p>`:lit.s6}
        </div>
      `}setCellListenerEnterResults(){if(console.log("setCellListenerEnterResults EnterResults"),void 0!==this.actionBeingPerformedModel.dialogInfo&&void 0!==this.actionBeingPerformedModel.dialogInfo.name&&"resultDialog"===this.actionBeingPerformedModel.dialogInfo.name);else{if(void 0===this.erGrid||null===this.erGrid)return;this.rowTooltipEnterResults.style.display="block",this.rowTooltipEnterResults.style.visibility="hidden",this.rowTooltipEnterResults.style.fontSize="12px",this.rowTooltipEnterResults.style.color="white",this.erGrid.shadowRoot.querySelectorAll("tr[part=row]").forEach(((r,i)=>{i>0&&this.enterResults[i-1]&&(r.removeEventListener("mouseenter",(()=>this.showLockReasonEnterResults(i))),r.removeEventListener("mouseleave",this.hideLockReasonEnterResults.bind(this))),i>0&&this.enterResults[i-1]&&(this.enterResults[i-1].is_locked||this.enterResults[i-1].warning_reason)&&(r.addEventListener("mouseenter",(()=>this.showLockReasonEnterResults(i))),r.addEventListener("mouseleave",this.hideLockReasonEnterResults.bind(this)))}))}}showLockReasonEnterResults(i){let labels={warning_reason_label_en:"Warning Reason",warning_reason_label_es:"Razón Aviso",locking_reason_label_en:"Locking Reason",locking_reason_label_es:"Razón Bloqueo"};this.enterResults[i-1].is_locked?(this.rowTooltipEnterResults.style.backgroundColor="rgb(255 8 8)",this.rowTooltipEnterResults.style.visibility="visible",this.rowTooltipEnterResults.textContent=labels["locking_reason_label_"+this.lang]+": "+this.enterResults[i-1].locking_reason["message_"+this.lang]):this.enterResults[i-1].warning_reason&&(this.rowTooltipEnterResults.style.backgroundColor="#0085ff",this.rowTooltipEnterResults.style.visibility="visible",this.rowTooltipEnterResults.textContent=labels["warning_reason_label_"+this.lang]+": "+this.enterResults[i-1].warning_reason["message_"+this.lang]),console.log(this.rowTooltipEnterResults.textContent)}hideLockReasonEnterResults(){this.rowTooltipEnterResults.style.visibility="hidden"}enterResultList(){return void 0===this.actionBeingPerformedModel||void 0===this.actionBeingPerformedModel.dialogInfo||void 0===this.actionBeingPerformedModel.dialogInfo.resultHeader?lit.qy``:Object.entries(this.actionBeingPerformedModel.dialogInfo.resultHeader).map((([key,value],i)=>lit.qy`
          ${this.desktop?lit.qy`
              ${0==i?lit.qy`<vaadin-grid-column 
                  ${(0,lit_vaadin_helpers_dist.gh)(this.specRenderer)}
                  text-align="center" 
                  flex-grow="0"
                  path="${key}" 
                  header="${value["label_"+this.lang]}"></vaadin-grid-column>`:lit.qy`${"raw_value"==key?lit.qy`<vaadin-grid-column 
                      ${(0,lit_vaadin_helpers_dist.gh)(this.valRenderer)}
                      text-align="center" 
                      resizable 
                      width="130px"
                      path="${key}" 
                      header="${value["label_"+this.lang]}"></vaadin-grid-column>`:lit.qy`${"sar2_raw_value"==key?lit.qy`<vaadin-grid-column 
                        ${(0,lit_vaadin_helpers_dist.gh)(this.valRenderer)}
                        text-align="center" 
                        resizable 
                        width="130px"
                        path="${key}" 
                        header="${value["label_"+this.lang]}"></vaadin-grid-column>`:lit.qy`${"uom"==key?lit.qy`<vaadin-grid-column ${(0,lit_vaadin_helpers_dist.gh)(this.uomRenderer)} resizable flex-grow=1 text-align='center' path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-column>`:lit.qy`<vaadin-grid-column resizable flex-grow=1 path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-column>`}`}`}`}
            `:lit.qy`
              ${0==i?lit.qy`<vaadin-grid-column 
                  ${(0,lit_vaadin_helpers_dist.gh)(this.specRenderer)}
                  width="65px" resizable 
                  path="${key}" 
                  header="${value["label_"+this.lang]}"></vaadin-grid-column>`:lit.qy`${"raw_value"==key?lit.qy`<vaadin-grid-column 
                    ${(0,lit_vaadin_helpers_dist.gh)(this.valRenderer)}
                    width="130px" resizable 
                    path="${key}" 
                    header="${value["label_"+this.lang]}"></vaadin-grid-column>`:lit.qy`${"sar2_raw_value"==key?lit.qy`<vaadin-grid-column 
                      ${(0,lit_vaadin_helpers_dist.gh)(this.valRenderer)}
                      text-align="center" 
                      resizable 
                      width="130px"
                      path="${key}" 
                      header="${value["label_"+this.lang]}"></vaadin-grid-column>`:lit.qy`${"uom"==key?lit.qy`<vaadin-grid-column ${(0,lit_vaadin_helpers_dist.gh)(this.uomRenderer)} resizable width="65px" path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-column>`:lit.qy`<vaadin-grid-column resizable width="65px" path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-column>`}`}`}`}
            `}
        `))}instrumentEventList(){return Object.entries(this.actionBeingPerformedModel.resultHeader).map((([key,value],i)=>lit.qy`
          ${this.desktop?lit.qy`
              ${"value"==key?lit.qy`<vaadin-grid-column 
                  ${(0,lit_vaadin_helpers_dist.gh)(this.valRendererInstrument)}
                  text-align="center" 
                  width="130px"
                  path="${key}" 
                  header="${value["label_"+this.lang]}"></vaadin-grid-column>`:lit.qy`<vaadin-grid-column resizable flex-grow=1 path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-column>`}
            `:lit.qy`
              ${"value"==key?lit.qy`<vaadin-grid-column 
                  ${(0,lit_vaadin_helpers_dist.gh)(this.valRendererInstrument)}
                  width="130px" resizable
                  path="${key}" 
                  header="${value["label_"+this.lang]}"></vaadin-grid-column>`:lit.qy`<vaadin-grid-column resizable width="65px" path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-column>`}
            `}
        `))}changeUOM(){let params=this.getServiceAPIUrl(this.actionBeingPerformedModel)+(this.actionBeingPerformedModel.endPoint?this.actionBeingPerformedModel.endPoint:this.config.SampleAPIactionsUrl)+"?"+new URLSearchParams(this.reqParams);this.execResult(params)}enterResult(){let params=this.getServiceAPIUrl(this.actionBeingPerformedModel)+(this.actionBeingPerformedModel.endPoint?this.actionBeingPerformedModel.endPoint:this.config.SampleAPIactionsUrl)+"?"+new URLSearchParams(this.reqParams);this.execResult(params)}execResult(params){this.fetchApi(params).then((j=>{this.reloadDialog(),this.dataForDialog=null}))}removeEvents(){if(void 0!==this.actionBeingPerformedModel.dialogInfo&&void 0!==this.actionBeingPerformedModel.dialogInfo.name&&"resultDialog"===this.actionBeingPerformedModel.dialogInfo.name);else{if(void 0===this.rowTooltipEnterResults||null===this.rowTooltipEnterResults)return;this.rowTooltipEnterResults.textContent="",this.rowTooltipEnterResults.style.visibility="hidden",this.erGrid.shadowRoot.querySelectorAll("tr[part=row]").forEach(((r,i)=>{i>0&&this.enterResults[i-1]&&this.enterResults[i-1].is_locked&&(r.removeEventListener("mouseenter",this.showLockReasonEnterResults.bind(this)),r.removeEventListener("mouseleave",this.hideLockReasonEnterResults.bind(this)))}))}this.curResultRef=void 0,this.enterResults=[]}valRenderer(result){let rawValue1="";if(rawValue1=this.actionBeingPerformedModel.actionName.toUpperCase().includes("SECOND")?result.sar2_raw_value:result.raw_value,result.is_locked)return lit.qy`
          <div style="width: 100%;height: 55px;position: relative; background-color: rgb(255 8 8 / 20%)">
            <div style="width: 100%;text-align:center; margin: 0;position: absolute;top: 50%;-ms-transform: translateY(-50%);transform: translateY(-50%);">${result.raw_value}</div>
          </div>
        `;if("CALC"==result.param_type.toUpperCase())return lit.qy`<input class="enterResultVal" type="text" .value=${rawValue1} 
            disabled>
          `;if("FILE"==result.param_type.toUpperCase())return lit.qy` 
          <upload-button procInstanceName="${this.procInstanceName}" .config="${this.config}" .action="${this.actionBeingPerformedModel}" .selectedItem="${result}" 
            name="upload"  label="File"></upload-button>
<!--          <mwc-icon-button icon="print" @click=${this.printCoa}></mwc-icon-button>   
          <mwc-icon-button icon="print" @click=${()=>{this.openFile(result)}}></mwc-icon-button>   
          -->
          `;if("TEXT"==result.param_type.toUpperCase()||"QUALITATIVE"==result.param_type.toUpperCase())return lit.qy`<input class="enterResultVal" type="text" .value=${rawValue1} 
            ?disabled=${this.actionBeingPerformedModel.dialogInfo.readOnly}
            @keydown=${e=>13==e.keyCode&&this.setResult(result,e.target)}>`;if(result.param_type.toUpperCase().indexOf("LIST")>-1){let lEntry=("|"+result.list_entry).split("|");if(void 0===result.value||0==result.value.length){lEntry=[[""]].concat(lEntry)}return lit.qy`
            ${"TEXTLIST"==result.param_type.toUpperCase()?lit.qy`
                <input class="enterResultVal" list="listEntry${result.result_id}" 
                  .value=${rawValue1}
                  @keydown=${e=>13==e.keyCode&&this.setResult(result,e.target)}>
                <datalist id="listEntry${result.result_id}">
                  ${lEntry.map((l=>lit.qy`<option value="${l}">${l}`))}
                </datalist>
              `:lit.qy`
                <select class="enterResultVal" @change=${e=>this.setResult(result,e.target)}>
                  ${lEntry.map((l=>lit.qy`<option value="${l}" ?selected=${l==rawValue1}>${l}`))}
                </select>
              `}
          `}if("REAL"==result.param_type.toUpperCase()){let step=result.max_dp?1/Math.pow(10,result.max_dp):.01,min=result.min_allowed?result.min_allowed:0,max=result.max_allowed&&result.max_allowed;return lit.qy`
            ${this[""+(result.param_type+""+result.result_id)]}
            <input class="enterResultVal" id="${result.param_type+""+result.result_id}" 
              ?disabled=${this.actionBeingPerformedModel.dialogInfo.readOnly} type="number" 
              .step=${step} 
              .min=${min}
              .max=${max}
              .value=${this.adjustValUndetermined(result)} 
              @input=${e=>this.setValidVal(e,result)}
              @keydown=${e=>13==e.keyCode&&this.setResult(result,e.target)}>
          `}{let min=void 0!==result.min_allowed&&result.min_allowed.length>0?result.min_allowed:null,max=void 0!==result.max_allowed&&result.max_allowed.length>0?result.max_allowed:null;return lit.qy`
            ${this[""+(result.param_type+""+result.result_id)]}
            <input class="enterResultVal" id="${result.param_type+""+result.result_id}" 
              ?disabled=${this.actionBeingPerformedModel.dialogInfo.readOnly} type="number" 
              .min=${min}
              .max=${max}
              .value=${this.adjustValUndetermined(result)} 
              @input=${e=>this.setValidVal(e,result)}
              @keydown=${e=>13==e.keyCode&&this.setResult(result,e.target)}>
          `}}valRendererInstrument(result){if(result.is_locked)return lit.qy`
          <div style="width: 100%;height: 55px;position: relative; background-color: rgb(255 8 8 / 20%)">
            <div style="width: 100%;text-align:center; margin: 0;position: absolute;top: 50%;-ms-transform: translateY(-50%);transform: translateY(-50%);">${result.raw_value}</div>
          </div>
        `;if("CALC"==result.param_type.toUpperCase())return lit.qy`<input class="enterResultVal" type="text" .value=${rawValue} 
            disabled>
          `;if("FILE"==result.param_type.toUpperCase())return lit.qy` 
          <upload-button procInstanceName="${this.procInstanceName}" .config="${this.config}" .action="${this.actionBeingPerformedModel}" .selectedItem="${result}" 
            name="upload"  label="File"></upload-button>
<!--          <mwc-icon-button icon="print" @click=${this.printCoa}></mwc-icon-button>   
          <mwc-icon-button icon="print" @click=${()=>{this.openFile(result)}}></mwc-icon-button>   
          -->
          `;if("TEXT"==result.param_type.toUpperCase()||"qualitative"==result.param_type)return lit.qy`<input class="enterResultVal" type="text" .value=${result.value} 
            ?disabled=${this.actionBeingPerformedModel.dialogInfo.readOnly}
            @keydown=${e=>13==e.keyCode&&this.setResultInstrument(result,e)}>`;if(result.param_type.toUpperCase().indexOf("LIST")>-1){let lEntry=result.allowed_values.split("|");if(0==result.value.length){lEntry=[[""]].concat(lEntry)}return lit.qy`
            ${"TEXTLIST"==result.param_type.toUpperCase()?lit.qy`
                <input class="enterResultVal" list="listEntry${result.result_id}" 
                  .value=${result.value}
                  @keydown=${e=>13==e.keyCode&&this.setResultInstrument(result,e)}>
                <datalist id="listEntry${result.result_id}">
                  ${lEntry.map((l=>lit.qy`<option value="${l}">${l}`))}
                </datalist>
              `:lit.qy`
                <select class="enterResultVal" @change=${e=>this.setResultInstrument(result,e)}>
                  ${lEntry.map((l=>lit.qy`<option value="${l}" ?selected=${l==result.value}>${l}`))}
                </select>
              `}
          `}if("REAL"==result.param_type.toUpperCase()){let step=result.max_dp?1/Math.pow(10,result.max_dp):.01,min=result.min_allowed?result.min_allowed:0,max=result.max_allowed&&result.max_allowed;return lit.qy`
            ${this[""+(result.param_type+""+result.result_id)]}
            <input class="enterResultVal" id="${result.param_type+""+result.result_id}" 
              ?disabled=${this.actionBeingPerformedModel.dialogInfo.readOnly} type="number" 
              .step=${step} 
              .min=${min}
              .max=${max}
              .value=${result.value} 
              @input=${e=>this.setValidVal(e,result)}
              @keydown=${e=>13==e.keyCode&&this.setResultInstrument(result,e)}>
          `}{let min=result.min_allowed?result.min_allowed:0,max=result.max_allowed&&result.max_allowed;return lit.qy`
            ${this[""+(result.param_type+""+result.result_id)]}
            <input class="enterResultVal" id="${result.param_type+""+result.result_id}" 
              ?disabled=${this.actionBeingPerformedModel.dialogInfo.readOnly} type="number" 
              .min=${min}
              .max=${max}
              .value=${result.value}
              @input=${e=>this.setValidVal(e,result)}
              @keydown=${e=>13==e.keyCode&&this.setResultInstrument(result,e)}>
          `}}setValidVal(e,result){if("number"==typeof result.min_allowed&&e.target.value<result.min_allowed)e.target.value=result.min_allowed;else if("number"==typeof result.max_allowed&&e.target.value>result.max_allowed)e.target.value=result.max_allowed;else if(result.max_dp){let v=e.target.value.split(".");v.length>1&&v[1].length>result.max_dp&&(v[1]=v[1].substring(0,result.max_dp),e.target.value=Number(v.join(".")))}}adjustValUndetermined(result,elmSet){console.log("adjustValUndetermined","result",result,"elmSet",elmSet);let lbl="",raw="";if(""!=result.raw_value&&(this.actionBeingPerformedModel.actionName.toUpperCase().includes("SECOND")?(raw=result.sar2_raw_value,void 0!==raw&&0!=String(raw).length||(raw=result.raw_value)):raw=result.raw_value,"number"==typeof result.min_undetermined&&Number(result.raw_value)<result.min_undetermined?(lbl="<",raw=result.min_undetermined):"number"==typeof result.max_undetermined&&Number(result.raw_value)>result.max_undetermined&&(lbl=">",raw=result.max_undetermined)),this[result.param_type+""+result.result_id]=lbl,!elmSet)return raw;elmSet.value=raw}uomRenderer(result){if(result.uom){if(result.uom_conversion_mode){let ucm=result.uom_conversion_mode.split("|");return lit.qy`<mwc-button 
            @click=${()=>this.dataForDialog={ucm,uom:result.uom,result_id:result.result_id}}
            ?disabled=${!result.raw_value} label="${result.uom}" icon="edit"></mwc-button>`}return result.uom}}setUOM(resultId,newResultUom){this.targetValue={resultId,newResultUom};let actionIdx=this.actionBeingPerformedModel.dialogInfo.action.findIndex((a=>"changeUOM"==a.clientMethod));this.selectedDialogAction=this.actionBeingPerformedModel.dialogInfo.action[actionIdx],this.actionMethod(this.selectedDialogAction,!1)}specRenderer(result){return void 0===result||void 0===result.spec_eval?lit.qy``:result.spec_eval?"IN"==result.spec_eval?lit.qy`<mwc-icon style="color:green">radio_button_checked</mwc-icon>`:result.spec_eval.toUpperCase().includes("OUT")&&result.spec_eval.toUpperCase().includes("SPEC")?lit.qy`<mwc-icon style="color:red">radio_button_checked</mwc-icon>`:result.spec_eval.toUpperCase().includes("NO_SPEC_LIMIT")?lit.qy`<mwc-icon style="color:green">radio_button_checked</mwc-icon>`:lit.qy`<mwc-icon style="color:orange">radio_button_checked</mwc-icon>`:lit.qy`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`}openFile(res){const jsonString=res.attachment_jsonstring,byteData=JSON.parse(jsonString).data,blob=new Blob([byteData],{type:"application/octet-stream"}),url=URL.createObjectURL(blob);window.open(url,"_blank")}downloadFile(res){const jsonString=res.attachment,byteData=JSON.parse(jsonString).data,blob=new Blob([byteData],{type:"application/octet-stream"}),url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url,link.download="file.txt",link.click()}getResult(){console.log("getResult","SampleAPIqueriesUrl","this.selectedItems[0]",this.selectedItems[0],"action",this.actionBeingPerformedModel);let queryDefinition=this.actionBeingPerformedModel.dialogInfo.viewQuery;this.deactivatedObjects=[];let APIParams=this.getAPICommonParams(queryDefinition),viewParams=this.jsonParam(queryDefinition,this.selectedItems[0]),endPointUrl=this.getQueryAPIUrl(queryDefinition);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);let params=this.getServiceAPIUrl(this.actionBeingPerformedModel)+endPointUrl+"?"+new URLSearchParams(APIParams)+"&"+new URLSearchParams(viewParams);this.fetchApi(params).then((j=>{if(j&&!j.is_error){if(0==j.length&&this.dispatchEvent(new CustomEvent("error",{detail:{is_error:!0,message_en:"Found no results",message_es:"No se encontraron resultados"},bubbles:!0,composed:!0})),this.curResultRef){if(void 0!==j.message&&j.message.includes("unexpected"))return;let r=j.filter((d=>d.result_id==this.curResultRef.resId));r.length&&("number"==this.curResultRef.elm.type?this.adjustValUndetermined(r[0],this.curResultRef.elm):this.curResultRef.elm.value=r[0].raw_value)}this.curResultRef=void 0,this.selectedResults=[],this.enterResults=j,this.requestUpdate()}else this.dispatchEvent(new CustomEvent("error",{detail:{is_error:!0,message_en:this.actionBeingPerformedModel.alertMsg.empty.label_en,message_es:this.actionBeingPerformedModel.alertMsg.empty.label_es},bubbles:!0,composed:!0})),console.log(this.actionBeingPerformedModel.alertMsg.empty.label_en)}))}getParams(){console.log("getResult","SampleAPIqueriesUrl","this.selectedItems[0]",this.selectedItems[0],"action",this.actionBeingPerformedModel);let queryDefinition=this.actionBeingPerformedModel.dialogInfo.viewQuery;this.deactivatedObjects=[];let APIParams=this.getAPICommonParams(queryDefinition),viewParams=this.jsonParam(queryDefinition,this.selectedItems[0]),endPointUrl=this.getQueryAPIUrl(queryDefinition);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);let params=this.getServiceAPIUrl(this.actionBeingPerformedModel)+endPointUrl+"?"+new URLSearchParams(APIParams)+"&"+new URLSearchParams(viewParams);this.fetchApi(params).then((j=>{if(j&&!j.is_error){if(0==j.length&&this.dispatchEvent(new CustomEvent("error",{detail:{is_error:!0,message_en:"Found no results",message_es:"No se encontraron resultados"},bubbles:!0,composed:!0})),this.curResultRef){if(void 0!==j.message&&j.message.includes("unexpected"))return;let r=j.filter((d=>d.result_id==this.curResultRef.resId));r.length&&("number"==this.curResultRef.elm.type?this.adjustValUndetermined(r[0],this.curResultRef.elm):this.curResultRef.elm.value=r[0].raw_value)}this.curResultRef=void 0,this.selectedResults=[],this.enterResults=j,this.requestUpdate()}else this.dispatchEvent(new CustomEvent("error",{detail:{is_error:!0,message_en:this.actionBeingPerformedModel.alertMsg.empty.label_en,message_es:this.actionBeingPerformedModel.alertMsg.empty.label_es},bubbles:!0,composed:!0})),console.log(this.actionBeingPerformedModel.alertMsg.empty.label_en)}))}getInstEventResult(){let params=this.config.backendUrl+this.config.ApiInstrumentsAPIqueriesUrl+"?"+new URLSearchParams(this.reqParams);this.fetchApi(params).then((j=>{if(j&&!j.is_error){if(this.curResultRef){let r=j.filter((d=>d.event_id==this.curResultRef.evtId));r.length&&(this.curResultRef.elm.value=r[0].value)}this.selectedResults=[],this.enterResults=j,this.erGrid.items=j,this.requestUpdate()}else this.dispatchEvent(new CustomEvent("error",{detail:{is_error:!0,message_en:this.selectedAction.alertMsg.empty.label_en,message_es:this.selectedAction.alertMsg.empty.label_es},bubbles:!0,composed:!0})),console.log(this.selectedAction.alertMsg.empty.label_en)}))}setResult(result,target){let resId="";if(this.actionBeingPerformedModel.actionName.toUpperCase().includes("SECOND")){if(void 0===result.sar2_result_id||0==result.sar2_result_id.length)return void this.dispatchEvent(new CustomEvent("error",{detail:{is_error:!0,message_en:"This result has no second entry feature enabled",message_es:"Funcionalidad Segunda Entrada no habilitada para este resultado"},bubbles:!0,composed:!0}));resId=result.sar2_result_id}else resId=result.result_id;let newValue=target.value;this.targetValue={rawValueResult:newValue,resultId:resId,eventId:result.event_id,instrumentName:result.instrument,variableName:result.param_name},this.curResultRef={elm:target,resId:result.result_id,evtId:result.event_id};let act=JSON.stringify(this.actionBeingPerformedModel.dialogInfo.action[0]);this.selectedDialogAction=JSON.parse(act);let rawValue1="";rawValue1=this.actionBeingPerformedModel.actionName.toUpperCase().includes("SECOND")?result.sar2_raw_value:result.raw_value,rawValue1?(this.selectedDialogAction.actionName="RE"+this.selectedDialogAction.actionName,this.actionMethodResults(this.selectedDialogAction,this.selectedItems,result.sample_number,this.selectedItems,this.targetValue)):(this.selectedItems[0]=result,this.actionMethodResults(this.selectedDialogAction,this.selectedItems,result.sample_number,this.selectedItems,this.targetValue)),console.log("setResult After","resId",resId,"selectedDialogAction",this.selectedDialogAction,"this.selectedItems",this.selectedItems)}actionMethodResults(action,selObject,sampleId,resultRow,targetValue){void 0!==action?void 0!==action.requiresDialog?!1!==action.requiresDialog?void 0===action.requiresGridItemSelected||!0!==action.requiresGridItemSelected||void 0!==this[selectedItemPropertyName]&&void 0!==this[selectedItemPropertyName][0]?(this.GetQueriesForDialog(action),"auditDialog"!==action.dialogInfo.name?this[action.dialogInfo.name]?action.dialogInfo.subQueryName?this[action.dialogInfo.subQueryName]():this[action.dialogInfo.name].show():alert("the dialog "+action.dialogInfo.name+" does not exist"):this[action.clientMethod]()):alert("Please select one item in the table prior"):this.trazitNoDialogRequired(action,selObject[0],targetValue,!1,selObject[0],null,null,null):alert("The action "+action.actionName+" has no requiresDialog property which is mandatory"):alert("action not passed as argument")}setResultInstrument(resultRow,e){let newValue=e.target.value;this.targetValue={newValue,eventId:resultRow.event_id,instrumentName:resultRow.instrument,variableName:resultRow.param_name},this.curResultRef={elm:e.target,resId:resultRow.result_id,evtId:resultRow.event_id};let act=JSON.stringify(this.actionBeingPerformedModel.dialogInfo.action[0]);this.selectedDialogAction=JSON.parse(act),resultRow.raw_value||resultRow.value?(this.selectedDialogAction.actionName="RE"+this.selectedDialogAction.actionName,this.actionMethodResults(this.selectedDialogAction,this.selectedItems,resultRow.event_id,resultRow,this.targetValue)):this.actionMethodResults(this.selectedDialogAction,this.selectedItems,resultRow.event_id,resultRow,this.targetValue)}}}},"./src/components/GenericDialogs/TrazitGenericDialogs.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{f:()=>TrazitGenericDialogs});var lit=__webpack_require__("./node_modules/lit/index.js"),common_core=__webpack_require__("./.yalc/@trazit/cred-dialog/.yalc/@trazit/common-core/index.js"),GridFunctions=__webpack_require__("./src/components/grid_with_buttons/GridFunctions.js");__webpack_require__("./node_modules/@material/mwc-textarea/mwc-textarea.js"),__webpack_require__("../node_modules/@cicciosgamino/qr-code-element/qr-code-element.js"),__webpack_require__("./node_modules/@material/mwc-list/mwc-list-item.js"),__webpack_require__("./node_modules/@material/mwc-select/mwc-select.js"),__webpack_require__("./node_modules/@material/mwc-checkbox/mwc-checkbox.js"),__webpack_require__("./node_modules/@material/mwc-formfield/mwc-formfield.js"),__webpack_require__("./src/components/MultiSelect/index.js"),__webpack_require__("./node_modules/@material/mwc-icon-button/mwc-icon-button.js"),__webpack_require__("./node_modules/@material/mwc-list/mwc-list.js");class TreeViewFran extends lit.WF{static get properties(){return{data:{type:Array},specification:{type:Object},selectedItems:{type:Object},showChildren:{type:Object},value:{type:String},label:{type:String},expanded:{type:Boolean}}}constructor(){super(),this.data=[],this.specification={},this.selectedItems={},this.showChildren={},this.expanded=!1,this.value="",this.label="Select an item"}static get styles(){return lit.AH`
      :host {
        display: block;
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      }

      .main {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 56px;
      }

      .label {
        position: absolute;
        top: 0px;
        left: 18px;
        font-size: 12px;
        color: #999;
        transition: 0.2s ease all;
        pointer-events: none;
      }

      .label.selected {
        color: #24c0eb;
      }

      .value {
        display: flex;
        align-items: center;
        padding: 6px;
        border: 1px solid #999;
        border-radius: 4px;
        cursor: pointer;
        background-color: #fff;
        height: 56px;
      }

      .value.selected {
        border-color: #24c0eb;
      }

      .dropdown {
        display: none;
        position: absolute;
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
        max-height: 300px;
        overflow-y: auto;
        background-color: #fff;
        z-index: 1;
      }

      .dropdown.show {
        display: block;
      }

      mwc-list-item {
        display: flex;
        align-items: center;
        padding: 4px 16px;
        transition: height 0.3s;
      }

      .icon-left {
        margin-right: 8px;
        --mdc-icon-size: 16px;
      }

      .clear-icon {
        margin-left: auto;
        cursor: pointer;
        --mdc-icon-size: 20px;
      }

      .accordion-details {
        flex-wrap: wrap;
        gap: 4px;
        padding: 4px 0;
      }

      .expanded {
        height: auto;
      }

      .collapsed {
        height: 32px;
      }

      .accordion-details > mwc-list-item {
        /*flex: 1 1 calc(33.333% - 8px); */ /* Ajustar el porcentaje para controlar el número de elementos por fila */
      }

      .selected-text {
        color: #24c0eb;
      }
    `}handleToggleDropdown(e){e.stopPropagation(),this.showChildren=!this.showChildren,this.expanded=!0,this.requestUpdate()}handleSelectItem(item,specification,e){console.log("value",item[specification.key],"item",item,specification),this.value=item[specification.key],e.stopPropagation(),this.label=item[specification.key],this.showChildren=!1,this.requestUpdate()}handleToggleChildren(key,event){event.stopPropagation(),this.showChildren={...this.showChildren,[key]:!this.showChildren[key]},this.requestUpdate()}handleClearSelection(event){event.stopPropagation(),this.value="",this.selectedItems={},this.requestUpdate()}renderItem(data,specification,level=0){const childrenKey=specification.children,children=data[childrenKey],key=data[specification.key],label=data[specification.label]||data[specification.key],hasChildren=children&&children.length>0,isSelected=this.value===key,isExpanded=this.showChildren[key];return lit.qy`
      <mwc-list-item
        class="${isExpanded?"expanded":"collapsed"}"
        graphic="icon"
        .twoline=${hasChildren}
        .hasMeta=${hasChildren}
      >
        ${hasChildren?lit.qy`
              <mwc-icon-button
                class="icon-left"
                slot="graphic"
                icon="chevron_right"
                @click=${e=>this.handleToggleChildren(key,e)}
              ></mwc-icon-button>
            `:""}
        <span
          class="list-item-label ${isSelected?"selected-text":""}"
          @click=${e=>this.handleSelectItem(data,specification,e)}
        >
          ${label}
        </span>
        ${isExpanded&&hasChildren?lit.qy`
              <div class="accordion-details">
                ${children.map((child=>this.renderItem(child,specification.children_definition,level+1)))}
              </div>
            `:""}
      </mwc-list-item>
    `}render(){const hasValue=!!this.value,selectedItem=this.findSelectedItem(this.data,this.specification,this.value),selectedLabel=selectedItem?selectedItem[this.specification.label]||selectedItem[this.specification.key]:"";return lit.qy`
      <div class="main">
        <div class="value ${hasValue?"selected":""}" @click=${this.handleToggleDropdown}>
          ${selectedLabel||this.label}
          ${hasValue?lit.qy`
                <mwc-icon-button
                  class="clear-icon"
                  icon="clear"
                  @click=${this.handleClearSelection}
                ></mwc-icon-button>
              `:""}
        </div>
        <div class="label ${hasValue?"selected":""}">${this.label}</div>
        ${this.expanded?lit.qy`
          <div class="dropdown ${this.showChildren?"show":""}">
            <mwc-list>
              ${this.data.map((item=>this.renderItem(item,this.specification)))}
            </mwc-list>
          </div>
        `:lit.qy``}
      </div>
    `}findSelectedItem(data,specification,value){for(const item of data){if(item[specification.key]===value)return item;const children=item[specification.children];if(children&&children.length>0){const childItem=this.findSelectedItem(children,specification.children_definition,value);if(childItem)return childItem}}return null}}customElements.define("tree-viewfran",TreeViewFran);var lit_element=__webpack_require__("./node_modules/lit-element/lit-element.js");__webpack_require__("./node_modules/@material/mwc-textfield/mwc-textfield.js");const styles=lit_element.AH`
  :host {
    display: block;
  }

  ul {
    padding-left: 10px;
  }
  mwc-textfield {
    border-style: solid;
    border-color: #999999;
    border-color: rgba(153, 153, 153, 1);
    border-width: 1px;
    border-radius: 7px;
    -moz-border-radius: 7px;
    -webkit-border-radius: 7px;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    background-color: #FFFFFF;
    background-color: rgb(255, 255, 255);
    --mdc-text-field-idle-line-color: #148CFA;
    --mdc-text-field-outlined-idle-border-color: #148CFA;
    --mdc-text-field-label-ink-color: #148CFA;
    --mdc-text-field-focused-label-color: #148CFA;
    --mdc-theme-primary: #0465FB;
  }
  input {
    border-style: solid;
    border-color: #999999;
    border-width: 1px;
    border-radius: 7px;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    background-color: #FFFFFF;
    padding: 8px;
    flex: 1;
  }
  .input-container {
    display: flex;
    align-items: center;
  }
  .input-container span {
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    margin: 0 4px;
  }
  .error {
    color: red;
    font-family: Montserrat;
    font-size: 14px;
  }
`;class SpeclimitQuantitative extends lit_element.WF{static get styles(){return styles}static get properties(){return{rules:{type:Array},selectedRule:{type:Number},inputValue1:{type:String},inputValue2:{type:String},errorMessage:{type:String},value:{type:String}}}constructor(){super(),this.rules=[{id:1,description:"Entre X y Y incluidos"},{id:2,description:"Entre X y Y"},{id:3,description:"Menor de X"},{id:4,description:"Menor o igual a X"},{id:5,description:"Mayor de X"},{id:6,description:"Mayor o igual a X"}],this.selectedRule=1,this.inputValue1="",this.inputValue2="",this.errorMessage="",this.value=""}handleRuleChange(e){this.selectedRule=Number(e.target.value),this.inputValue1="",this.inputValue2="",this.errorMessage="",this.updateOutputValue()}handleInputChange1(e){this.inputValue1=e.target.value,this.validateInput()}handleInputChange2(e){this.inputValue2=e.target.value,this.validateInput()}validateInput(){let regex,fullInput;switch(this.selectedRule){case 1:regex=/^Entre \d{1,6}(\.\d{1,2})? y \d{1,6}(\.\d{1,2})? incluidos?$/i,fullInput=`Entre ${this.inputValue1} y ${this.inputValue2} incluidos`;break;case 2:regex=/^Entre \d{1,6}(\.\d{1,2})? y \d{1,6}(\.\d{1,2})?$/i,fullInput=`Entre ${this.inputValue1} y ${this.inputValue2}`;break;case 3:regex=/^Menor de \d{1,6}(\.\d{1,2})?$/i,fullInput=`Menor de ${this.inputValue1}`;break;case 4:regex=/^Menor o igual a \d{1,6}(\.\d{1,2})?$/i,fullInput=`Menor o igual a ${this.inputValue1}`;break;case 5:regex=/^Mayor de \d{1,6}(\.\d{1,2})?$/i,fullInput=`Mayor de ${this.inputValue1}`;break;case 6:regex=/^Mayor o igual a \d{1,6}(\.\d{1,2})?$/i,fullInput=`Mayor o igual a ${this.inputValue1}`;break;default:return void(this.errorMessage="Regla no válida")}regex.test(fullInput)?(1===this.selectedRule||2===this.selectedRule)&&parseFloat(this.inputValue1)>=parseFloat(this.inputValue2)?this.errorMessage="El primer valor debe ser menor que el segundo valor":(this.errorMessage="",this.updateOutputValue()):this.errorMessage="Formato de entrada no válido para la regla seleccionada, usa punto (.) como separador decimal"}getPrefix(){switch(this.selectedRule){case 1:case 2:return"Entre ";case 3:return"Menor de ";case 4:return"Menor o igual a ";case 5:return"Mayor de ";case 6:return"Mayor o igual a ";default:return""}}updateOutputValue(){let output;switch(this.selectedRule){case 1:output=`Entre ${this.inputValue1} y ${this.inputValue2} incluidos`;break;case 2:output=`Entre ${this.inputValue1} y ${this.inputValue2}`;break;case 3:output=`Menor de ${this.inputValue1}`;break;case 4:output=`Menor o igual a ${this.inputValue1}`;break;case 5:output=`Mayor de ${this.inputValue1}`;break;case 6:output=`Mayor o igual a ${this.inputValue1}`;break;default:output=""}this.value=output,this.dispatchEvent(new CustomEvent("output-change",{detail:{value:this.value}}))}render(){return rules=this.rules,selectedRule=this.selectedRule,inputValue1=this.inputValue1,inputValue2=this.inputValue2,errorMessage=this.errorMessage,handleRuleChange=this.handleRuleChange.bind(this),handleInputChange1=this.handleInputChange1.bind(this),handleInputChange2=this.handleInputChange2.bind(this),lit_element.qy`
    <div>
      <label for="rules">Selecciona una regla:</label>
      <select id="rules" @change="${handleRuleChange}">
        ${rules.map((rule=>lit_element.qy`<option value="${rule.id}" ?selected="${rule.id===selectedRule}">${rule.description}</option>`))}
      </select>
    </div>
    <div>
      <label for="input"></label><br>
      <div class="input-container">
        <span>${function getPrefix(selectedRule){switch(selectedRule){case 1:case 2:return"Entre ";case 3:return"Menor de ";case 4:return"Menor o igual a ";case 5:return"Mayor de ";case 6:return"Mayor o igual a ";default:return""}}(selectedRule)}</span>
        ${1===selectedRule||2===selectedRule?lit_element.qy`
              <input
                type="text"
                .value="${inputValue1}"
                maxlength="6"
                @input="${handleInputChange1}"
                placeholder="X"/>
              <span> y </span>
              <input
                type="text"
                .value="${inputValue2}"
                maxlength="6"
                @input="${handleInputChange2}"
                placeholder="Y"/>  ${1===selectedRule?" incluidos":""}`:lit_element.qy`
              <input
                type="text"
                .value="${inputValue1}"
                maxlength="6"
                @input="${handleInputChange1}"
                placeholder=""/>`}
      </div>
    </div>
    ${errorMessage?lit_element.qy`<div class="error">${errorMessage}</div>`:""}
  `;var rules,selectedRule,inputValue1,inputValue2,errorMessage,handleRuleChange,handleInputChange1,handleInputChange2}}function ListsFunctions(base){return class extends base{actionWhenListValueSelected(event,fld,dialogInfo){if(void 0===fld)return;if(void 0===fld.dependencyActionFields&&void 0===fld.dependencyFieldBehavior&&void 0===fld.dependencyFieldBehaviorForAll)return;const selectedItem=event.target.selected,itemData=(selectedItem.getAttribute("data-index"),JSON.parse(selectedItem.getAttribute("data-item")));void 0!==fld.dependencyActionFields&&this.dependencyActionFields(fld,itemData.allRecord),void 0!==fld.dependencyFieldBehavior&&this.dependencyFieldBehavior(fld.dependencyFieldBehavior,itemData.allRecord,!0,itemData.keyName),void 0!==fld.dependencyFieldBehaviorForAll&&this.dependencyFieldBehaviorForAll(fld.dependencyFieldBehaviorForAll,event.target.id,itemData.allRecord,dialogInfo,!0,itemData.keyName)}actionWhenOtherThanListValueChanged(event,fld,dialogInfo,itemData){void 0!==fld&&(void 0===fld.dependencyActionFields&&void 0===fld.dependencyFieldBehavior&&void 0===fld.dependencyFieldBehaviorForAll||(void 0!==fld.dependencyActionFields&&this.dependencyActionFields(fld,itemData),void 0!==fld.dependencyFieldBehavior&&this.dependencyFieldBehavior(fld.dependencyFieldBehavior,itemData,!1,this[event.currentTarget.id].value),void 0!==fld.dependencyFieldBehaviorForAll&&this.dependencyFieldBehaviorForAll(fld.dependencyFieldBehaviorForAll,event.target.id,itemData,dialogInfo,!1,this[event.currentTarget.id].value)))}dependencyFieldBehaviorForAll(dependencyFieldBehaviorForAll,fldName,itemData,dialogInfo,isList,itemKeyName){if(itemKeyName.length>0&&"whenEmpty"===dependencyFieldBehaviorForAll.rule&&!0===dependencyFieldBehaviorForAll.resetValue)return;const fields=dialogInfo.fields,exceptionFields=dependencyFieldBehaviorForAll.exceptionFields||[],filteredFields=fields.map((field=>{const fieldName=Object.keys(field)[0];return fieldName===fldName||exceptionFields.includes(fieldName)?null:{field:fieldName,rule:dependencyFieldBehaviorForAll.rule,resetValue:dependencyFieldBehaviorForAll.resetValue,action:dependencyFieldBehaviorForAll.action,...field[fieldName]}})).filter((item=>null!==item));this.dependencyFieldBehavior(filteredFields,itemData,isList,itemKeyName)}dependencyFieldBehaviorForAllFran(dependencyFieldBehaviorForAll,fldName,itemData,dialogInfo,isList,itemKeyName){const filteredFields=dialogInfo.fields.map((field=>{const fieldName=Object.keys(field)[0];return fieldName!==fldName?{field:fieldName,rule:dependencyFieldBehaviorForAll.rule,resetValue:dependencyFieldBehaviorForAll.resetValue,action:dependencyFieldBehaviorForAll.action,...field[fieldName]}:null})).filter((item=>null!==item));this.dependencyFieldBehavior(filteredFields,itemData,isList,itemKeyName)}dependencyActionFields(fld,itemData){fld.dependencyActionFields.map(((curFld,index)=>{if(void 0!==curFld.field&&(void 0!==curFld.staticValue&&(this[curFld.field].value=curFld.staticValue),void 0!==curFld.fieldValue&&(this[curFld.field].value=itemData[curFld.fieldValue]),curFld.allRecordEntryWithList)){let data={};data[curFld.propertyNameInDestination]=itemData[curFld.allRecordEntryWithList],this.updateListEntries(curFld.field,curFld,data)}}))}dependencyFieldBehavior(fieldsList,itemData,isList,itemKeyName){fieldsList.map(((curFld,index)=>{if(void 0!==curFld.field&&void 0!==curFld.rule&&void 0!==this[curFld.field]){const fieldElement=this[curFld.field];switch(curFld.rule){case"whenEmpty":if(0==itemKeyName.length)switch(void 0!==curFld.resetValue&&!0===curFld.resetValue&&(this[curFld.field].value=""),curFld.action){case"disable":default:this[curFld.field].disabled=!0;break;case"hide":void 0!==fieldElement&&void 0!==fieldElement.style&&(fieldElement.style.display="none");break;case"show":void 0!==fieldElement&&void 0!==fieldElement.style&&(fieldElement.style.display="block")}else switch(curFld.action){case"disable":default:this[curFld.field].disabled=!1;break;case"hide":void 0!==fieldElement&&void 0!==fieldElement.style&&(fieldElement.style.display="");break;case"show":void 0!==fieldElement&&void 0!==fieldElement.style&&(fieldElement.style.display="none")}break;case"whenThisFieldValueIs":if(void 0!==curFld.checkValue&&itemKeyName===curFld.checkValue)switch(curFld.action){case"disable":default:this[curFld.field].disabled=!0;break;case"hide":void 0!==fieldElement&&void 0!==fieldElement.style&&(fieldElement.style.display="none");break;case"show":void 0!==fieldElement&&void 0!==fieldElement.style&&(fieldElement.style.display="block")}else switch(curFld.action){case"disable":default:this[curFld.field].disabled=!1;break;case"hide":void 0!==fieldElement&&void 0!==fieldElement.style&&(fieldElement.style.display="");break;case"show":void 0!==fieldElement&&void 0!==fieldElement.style&&(fieldElement.style.display="none")}break;case"whenThisFieldValueIsNot":if(void 0!==curFld.checkValue&&itemKeyName!==curFld.checkValue)switch(curFld.action){case"disable":default:this[curFld.field].disabled=!1;break;case"hide":void 0!==fieldElement&&void 0!==fieldElement.style&&(fieldElement.style.display="none");break;case"show":void 0!==fieldElement&&void 0!==fieldElement.style&&(fieldElement.style.display="")}else switch(curFld.action){case"disable":default:this[curFld.field].disabled=!0;break;case"hide":case"show":void 0!==fieldElement&&void 0!==fieldElement.style&&(fieldElement.style.display="none")}}}}))}updateListEntries(listFieldName,fldMDDef,newData){}convertListToHtmlListEntries(fld,newList){}listEntries(fld,multilist=!1){void 0===multilist&&(multilist=!1);let newList=this.entriesForTheList(fld,multilist);return newList&&0!==newList.length?multilist&&Array.isArray(newList)?newList.filter((entry=>entry.keyName.length>0)).map((entry=>entry.keyName)).join("|"):newList:lit.qy``}entriesForTheList(fld,multilist=!1){let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:"",allRecord:{}},newList=[];if(void 0===fld)return lit.qy`<mwc-list-item></mwc-list-item>`;if(fld.addBlankValueOnTop&&newList.push(blankEmpty),fld.items&&fld.items.length>0)fld.valuesFromMasterData&&alert("This element has both, items and valuesFromMasterData, be careful and use only one. it will use the items..."),newList=[...newList,...fld.items];else if(fld.valuesFromMasterData){let MDentriesArr=this.listEntriesFromMasterData(fld.valuesFromMasterData);MDentriesArr.length>0&&(newList=[...newList,...MDentriesArr])}else if(fld.valuesFromProperty){fld.valuesFromProperty.propertyNameContainer="ROOT";let MDentriesArr=this.listEntriesFromProperty(fld.valuesFromProperty);MDentriesArr.length>0&&(newList=[...newList,...MDentriesArr])}else if(fld.valuesFromSelectedItem){let MDentriesArr=this.listEntriesFromSelectedItem(fld.valuesFromSelectedItem);MDentriesArr.length>0&&(newList=[...newList,...MDentriesArr])}return fld.addBlankValueAtBottom&&newList.push(blankEmpty),multilist?newList.filter((entry=>entry.keyName.length>0)).map((entry=>entry.keyName)).join("|"):lit.qy`
                ${newList.map(((c,i)=>lit.qy`<mwc-list-item value="${c.keyName}" ?selected="${fld.selectedValue===c.keyName}" data-index="${i}"
                    data-item="${JSON.stringify(c)}">${c["keyValue_"+this.lang]}</mwc-list-item>`))}`}listEntriesForUom(fld,fldName){console.log("listEntriesForUom");let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:""},defValue="",newList=[];if(void 0===fld)return lit.qy`<mwc-list-item></mwc-list-item>`;if(void 0!==fld.addBlankValueOnTop&&!0===fld.addBlankValueOnTop&&newList.push(blankEmpty),void 0!==fld.the_default_value){if(void 0!==fld.the_default_value.default_value&&null!==fldObj[keyName].default_value&&(blankEmpty={keyName:fld.the_default_value.default_value,keyValue_en:fld.the_default_value.default_value,keyValue_es:fld.default_value.default_value},newList.push(blankEmpty)),void 0!==fld.the_default_value.selObjectPropertyName&&null!==fld.the_default_value.selObjectPropertyName){let val="";if(void 0!==this.selectedItems&&this.selectedItems.length>0){val=this.selectedItems[0][fld.the_default_value.selObjectPropertyName];val.split("|").forEach((item=>{const blankEmpty={keyName:item,keyValue_en:item,keyValue_es:item},isDuplicate=newList.some((item=>item.keyName===item));isDuplicate||(null!==this[fldName]&&0===this[fldName].value.length&&(defValue=item,this[fldName].value=item),newList.push(blankEmpty))}))}}if(void 0!==fld.the_default_value.internalVariableObjName&&null!==fld.the_default_value.internalVariableObjName&&void 0!==fld.internalVariableObjProperty&&null!==fld.internalVariableObjProperty){let val=this[fld.the_default_value.internalVariableObjName][0][fld.internalVariableObjProperty];blankEmpty={keyName:val,keyValue_en:val,keyValue_es:val};newList.some((item=>item.keyName===val))||newList.push(blankEmpty)}}if(void 0!==fld.list_values){if(void 0!==fld.list_values.default_value&&null!==fldObj[keyName].default_value&&(blankEmpty={keyName:fld.list_values.default_value,keyValue_en:fld.list_values.default_value,keyValue_es:fld.list_values.default_value},newList.push(blankEmpty)),void 0!==fld.list_values.selObjectPropertyName&&null!==fld.list_values.selObjectPropertyName){this.selectedItems[0][fld.list_values.selObjectPropertyName].split("|").forEach((item=>{const blankEmpty={keyName:item,keyValue_en:item,keyValue_es:item},isDuplicate=newList.some((item=>item.keyName===item));isDuplicate||newList.push(blankEmpty)}))}if(void 0!==fld.list_values.internalVariableObjName&&null!==fld.list_values.internalVariableObjName&&void 0!==fld.internalVariableObjProperty&&null!==fld.internalVariableObjProperty){let val=this[fld.list_values.internalVariableObjName][0][fld.internalVariableObjProperty];blankEmpty={keyName:val,keyValue_en:val,keyValue_es:val};newList.some((item=>item.keyName===val))||newList.push(blankEmpty)}}return lit.qy`
            ${newList.map(((c,i)=>lit.qy`<mwc-list-item value="${c.keyName}" defval="${defValue}" ?selected=${void 0!==fld.addBlankValueOnTop&&!0===fld.addBlankValueOnTop&&void 0!==fld.default_value?1==i:0==i}>${c["keyValue_"+this.lang]}</mwc-list-item>`))}
            `}getProcMasterData(){let userSession=JSON.parse(sessionStorage.getItem("userSession"));if(void 0===this.procInstanceName&&(this.procInstanceName=sessionStorage.getItem("currentProcInstanceName")),this.isProcManagement=userSession.isProcManagement,void 0===this.isProcManagement||!0!==this.isProcManagement){let findProc=[];findProc=void 0!==this.area?userSession.procedures_list.procedures.filter((m=>m.procInstanceName==this.area)):userSession.procedures_list.procedures.filter((m=>m.procInstanceName==this.procInstanceName)),void 0!==findProc&&findProc.length>0&&void 0!==findProc[0].master_data&&(this.masterData=findProc[0].master_data)}else{let userSession=JSON.parse(sessionStorage.getItem("userSession"));this.masterData=userSession.proc_management_masterdata}}listEntriesFromMasterData(fldMDDef){return this.getProcMasterData(),console.log(fldMDDef,this.masterData),this.buildFrontListFromData(fldMDDef,this.masterData)}listEntriesFromProperty(fldMDDef){if(void 0!==this[fldMDDef.selObjectPropertyName])return this.buildFrontListFromData(fldMDDef,this[fldMDDef.selObjectPropertyName]);alert("selObjectPropertyName "+selObjectPropertyName+" is empty")}listEntriesFromSelectedItem(fldMDDef){let data=[];null!==fldMDDef&&void 0!==fldMDDef.defval&&null!==fldMDDef.defval&&alert(fldMDDef.defval),null!=fldMDDef&&void 0!==fldMDDef.default_value&&null!==fldMDDef.default_value&&(data=fldMDDef.default_value),null!=fldMDDef&&void 0!==fldMDDef.selObjectPropertyName&&null!==fldMDDef.selObjectPropertyName&&null!==fldMDDef&&(data=this.selectedItems[0][fldMDDef.selObjectPropertyName]),null!=fldMDDef&&void 0!==fldMDDef.internalVariableObjName&&null!==fldMDDef.internalVariableObjName&&void 0!==fldMDDef.internalVariableObjProperty&&null!==fldMDDef.internalVariableObjProperty&&(data=this[fldMDDef.internalVariableObjName][0][fldMDDef.internalVariableObjProperty]),null!=fldMDDef&&void 0!==fldMDDef.internalVariableSingleObjName&&null!==fldMDDef.internalVariableSingleObjName&&void 0!==fldMDDef.internalVariableSingleObjProperty&&null!==fldMDDef.internalVariableSingleObjProperty&&(data=this[fldMDDef.internalVariableSingleObjName][fldMDDef.internalVariableSingleObjProperty]);let entries1=[];return void 0!==data&&data.forEach((item=>{console.log("item",item,"fldMDDef.propertyNameContainer.propertyKeyName",fldMDDef.propertyKeyName);let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:""};blankEmpty.keyName=item[fldMDDef.propertyKeyName];let valEn="";fldMDDef.propertyKeyValueEn.forEach((item2=>{valEn.length>0&&(valEn+="-"),valEn+=item[item2]})),blankEmpty.keyValue_en=valEn;let valEs="";fldMDDef.propertyKeyValueEn.forEach((item2=>{valEs.length>0&&(valEs+="-"),valEs+=item[item2]})),blankEmpty.keyValue_es=valEs,console.log("blankEmpty",blankEmpty),entries1.push(blankEmpty)})),entries1}buildFrontListFromData(fldMDDef,data,isInjected){return void 0===data||void 0===fldMDDef?[]:void 0!==fldMDDef.version&&2===fldMDDef.version?this.buildFrontListFromDatav2(fldMDDef,data,isInjected):this.buildFrontListFromDatav1(fldMDDef,data,isInjected)}buildFrontListFromDatav1(fldMDDef,data,isInjected){if(void 0===data||void 0===fldMDDef)return[];let entries1=[];if(void 0===isInjected||!1===isInjected)if(console.log("masterData",data),console.log("actionBeingPerformedModel",this.actionBeingPerformedModel),"ROOT"===String(fldMDDef.propertyNameContainer).toUpperCase());else{if(void 0===data[fldMDDef.propertyNameContainer])return alert("Property "+fldMDDef.propertyNameContainer+" not found in Master Data"),entries1;data=data[fldMDDef.propertyNameContainer]}if(void 0!==fldMDDef.filterInFirstLevel&&!0===fldMDDef.filterInFirstLevel){let filterValue;void 0!==fldMDDef.propertyNameContainerLevelfixValue?filterValue=fldMDDef.propertyNameContainerLevelfixValue:void 0!==fldMDDef.elementName?filterValue=this[fldMDDef.elementName].value:void 0!==fldMDDef.contextVariableName?filterValue=this[fldMDDef.contextVariableName]:void 0!==fldMDDef.internalVariableSimpleObjName&&void 0!==fldMDDef.internalVariableSimpleObjProperty&&(filterValue=this[fldMDDef.internalVariableSimpleObjName][fldMDDef.internalVariableSimpleObjProperty]);let filterPropertyName="name";if(void 0!==fldMDDef.filterPropertyName&&(filterPropertyName=fldMDDef.filterPropertyName),void 0===filterValue)return entries1;let result=data[fldMDDef.propertyNameContainer].find((item=>item[filterPropertyName]===filterValue));return void 0===result||(result[fldMDDef.propertyNameContainerLevel2].forEach((item=>{console.log("item",item,"fldMDDef.propertyNameContainer.propertyKeyName",fldMDDef.propertyKeyName);let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:""};blankEmpty.keyName=item[fldMDDef.propertyKeyName],blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn],blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs],blankEmpty.allRecord=item,console.log("blankEmpty",blankEmpty),entries1.push(blankEmpty)})),console.log("entries at end",entries1),void 0!==fldMDDef.fixItemsOnTop&&(entries1=[...fldMDDef.fixItemsOnTop,...entries1]),void 0!==fldMDDef.fixItemsAtBottom&&(entries1=[...entries1,...fldMDDef.fixItemsAtBottom])),entries1}return void 0!==data&&data.forEach((item=>{let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:""};blankEmpty.keyName=item[fldMDDef.propertyKeyName],blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn],blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs],blankEmpty.allRecord=item,entries1.push(blankEmpty)})),void 0!==fldMDDef.fixItemsOnTop&&(entries1=[...fldMDDef.fixItemsOnTop,...entries1]),void 0!==fldMDDef.fixItemsAtBottom&&(entries1=[...entries1,...fldMDDef.fixItemsAtBottom]),entries1}buildFrontListFromDatav2(config,data){if(!data||!config)return console.log("Invalid data or configuration"),[];console.log("Processing Level:",config.label);let entries1=[],filteredData=data;return void 0!==config.filterStaticValue&&(filteredData=data.filter((item=>item[config.filterKey]===config.filterStaticValue))),void 0!==config.filterDataValue&&(filteredData=data.filter((item=>item[config.filterKey]===data[config.filterDataValue]))),filteredData.forEach((item=>{if(config.children&&item[config.children]){let childEntries=buildFrontListFromDatav2(config.children_definition,item[config.children]);entries1=entries1.concat(childEntries)}else{console.log("Terminal Node Found:",config.label);let blankEmpty={keyName:item[config.propertyKeys.name],keyValue_en:item[config.propertyKeys.values.en],keyValue_es:item[config.propertyKeys.values.es],allRecord:item};entries1.push(blankEmpty)}})),entries1}getListInLevel3(fldMDDef,level2Arr){level2Arr.filter((p=>p[propertyNameContainerLevel2PropertyKeyName]==fldMDDef.propertyNameContainerLevel2fixValue))[fldMDDef.propertyNameContainerLevel3].forEach((item=>{console.log("item",item,"fldMDDef.propertyNameContainer.propertyKeyName",fldMDDef.propertyNameContainerLevel2PropertyKeyName);let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:""};blankEmpty.keyName=item[fldMDDef.propertyKeyName],blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn],blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs],console.log("blankEmpty",blankEmpty),entries.push(blankEmpty)}))}}}function DialogsFeatures(base){return class extends base{isFieldDisabled(fld){return void 0!==fld.disabled&&!0===fld.disabled}fldDisabled(){return!1}fieldLabel(fld){if(void 0===fld)return"";let fldLbl=fld["label_"+this.lang];return void 0!==fld.optional&&!1!==fld.optional||(fldLbl="* "+fldLbl),fldLbl}}}window.customElements.define("speclimit-quantitative",SpeclimitQuantitative);class TwoListsLinked extends(ListsFunctions(DialogsFeatures(lit.WF))){static properties={lang:{type:String},procInstanceName:{type:String},fld:{type:Object},listLinked1Items:{type:Array},listLinked2Items:{type:Array},selectedList1Value:{type:String}};constructor(){super(),this.fld={},this.listLinked1Items=[],this.listLinked2Items=[],this.selectedList1Value="",this.procInstanceName=""}static styles=lit.AH`
    .layout {
      display: flex;
    }
    .horizontal {
      flex-direction: row;
    }
    .flex {
      flex: 1;
    }
    .center-center {
      justify-content: center;
      align-items: center;
    }
        mwc-select {
      --mdc-theme-primary: rgba(36, 192, 235, 1);
      --mdc-theme-text-primary-on-background: rgba(49, 130, 189, 1);
      --mdc-select-ink-color: rgb(47, 47, 47);
      --mdc-select-dropdown-icon-color: rgba(36, 192, 235, 1);
      --mdc-select-hover-line-color: rgba(36, 192, 235, 1);
      --mdc-notched-outline-border-color: #148CFA;
      --mdc-select-disabled-dropdown-icon-color: rgba(36, 192, 235, 1);
      --mdc-select-label-ink-color: #148CFA; /* Color del label cuando no hay valor seleccionado */
      --mdc-select-idle-line-color: #148CFA; /* Color de la línea */
      --mdc-select-bottom-line-color: #148CFA; /* Color de la línea inferior */

      font-family: Montserrat;
      font-weight: bold;
      font-size: 19px;
    }

    mwc-select::part(notched-outline) {
      border-color: #148CFA;
    }

    mwc-select::part(idle) {
      border-color: #148CFA;
    }

    mwc-select::part(label) {
      color: #148CFA;
    }

    mwc-select.outlined {
      --mdc-theme-primary: rgba(36, 192, 235, 1);
      --mdc-theme-text-primary-on-background: rgba(49, 130, 189, 1);
      --mdc-select-ink-color: rgba(36, 192, 235, 1);
      font-family: Montserrat;
      font-weight: bold;
      font-size: 19px;
      background-color: 4fcad029;
    }
    `;render(){return lit.qy`
      ${this.fld.listLinked1?lit.qy`
        <div class="layout horizontal flex center-center">
          <mwc-select
            id="listLinked1"
            label="${this.fieldLabel(this.fld.listLinked1)}"
            @selected=${e=>this.actionWhenListValueSelected(e)}
            ?disabled=${this.isFieldDisabled(this.fld.listLinked1)}
            style="width: 100%;"
          >
            ${this.listEntriesTwoListsLinked(this.fld.listLinked1)}
          </mwc-select>
        </div>
        <div class="layout horizontal flex center-center">
          <mwc-select
            id="listLinked2"
            label="${this.fieldLabel(this.fld.listLinked2)}"
            ?disabled=${""===this.selectedList1Value}
            style="width: 100%;"
          >
            ${this.listEntriesTwoListsLinked(this.fld.listLinked2)}
          </mwc-select>
        </div>
      `:lit.qy``}
    `}listEntriesTwoListsLinked(field){let entries=[],blankEmpty={keyName:"",keyValue_en:"",keyValue_es:"",allRecord:{}};return field.addBlankValueOnTop&&entries.push(blankEmpty),field.items?entries=[...entries,...field.items]:field.valuesFromMasterData&&(entries=[...entries,...this.listEntriesFromMasterData(field.valuesFromMasterData)]),field===this.fld.listLinked2&&(entries=this.listLinked2Items),field.addBlankValueAtBottom&&entries.push(blankEmpty),0===entries.length?lit.qy``:entries.map((item=>lit.qy`<mwc-list-item value="${item.keyName}">${item["keyValue_"+this.lang]}</mwc-list-item>`))}actionWhenListValueSelected(event){this.listLinked2.value="";const selectedValue=event.target.value;this.selectedList1Value=selectedValue,this.updateList2Entries(selectedValue)}updateList2Entries(selectedValue){if(""===selectedValue)this.listLinked2Items=[];else{let allDataWithNoFilter;if(this.fld.listLinked2.items)allDataWithNoFilter=this.fld.listLinked2.items,this.listLinked2Items=allDataWithNoFilter.filter((item=>item.parentValue===selectedValue));else{let list2MasterDataConfig=this.fld.listLinked2.valuesFromMasterData;allDataWithNoFilter=this.masterData[list2MasterDataConfig.propertyNameContainer],allDataWithNoFilter=allDataWithNoFilter.filter((item=>item[list2MasterDataConfig.propertyNameContainerLevelPropertyKeyName]===selectedValue));let allDataForTheSelectedEntry=allDataWithNoFilter[0];allDataForTheSelectedEntry=allDataForTheSelectedEntry[list2MasterDataConfig.selectedEntryFromFilterPropertyName],this.listLinked2Items=allDataForTheSelectedEntry.map((item=>({keyName:item[this.fld.listLinked2.valuesFromMasterData.propertyKeyName],keyValue_en:item[this.fld.listLinked2.valuesFromMasterData.propertyKeyValueEn],keyValue_es:item[this.fld.listLinked2.valuesFromMasterData.propertyKeyValueEs]})));let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:"",allRecord:{}};this.fld.listLinked2.addBlankValueOnTop&&this.listLinked2Items.unshift(blankEmpty),this.fld.listLinked2.addBlankValueAtBottom&&this.listLinked2Items.push(blankEmpty)}}this.requestUpdate()}get listLinked1(){return this.shadowRoot.querySelector("mwc-select#listLinked1")}get listLinked2(){return this.shadowRoot.querySelector("mwc-select#listLinked2")}}customElements.define("two-lists-linked",TwoListsLinked);var DialogsFunctions=__webpack_require__("./src/components/GenericDialogs/DialogsFunctions.js");function TrazitGenericDialogs(base){return class extends(DialogsFeatures(ListsFunctions((0,GridFunctions.G)((0,DialogsFunctions.X)(base))))){static get properties(){return{selectedResults:{type:Array},enterResults:{type:Array},microorganismList:{type:Array},selectedAssigns:{type:Array},assignList:{type:Array},targetValue:{type:Object},selectedDialogAction:{type:Object},lotDays:{type:Number},deactivatedLots:{type:Array},openInvests:{type:Array},selectedInvestigations:{type:Array},capaRequired:{type:Boolean},selectedStucks:{type:Array},dataForDialog:{type:Object},familyList:{type:Array},microName:{type:String},fromGrid:{type:Boolean},fields:{type:Array},declineDialog:{type:Object},masterData:{type:Object},genericDialogGridItems:{type:Array},genericDialogGridSelectedItems:{type:Array},area:{type:String},procInstanceName:{type:String}}}constructor(){super(),this.lotDays=7,this.deactivatedLots=[],this.microorganismList=[],this.familyList=[],this.capaRequired=!1,this.fromGrid=!1,this.fields=[],this.actionBeingPerformedModel={},this.fieldsShouldBeReset=!0,this.masterData={},this.genericDialogGridItems=[],this.genericDialogGridSelectedItems=[],this.procInstanceName=""}handleQRCodeDecoded(e){const decodedData=e.detail.value;this.actionBeingPerformedModel.dialogInfo.fields.forEach((field=>{const keyName=Object.keys(field)[0],fieldDef=field[keyName];fieldDef.qrCodeParsing&&decodedData[fieldDef.qrCodeParsing]&&(this[keyName].value=decodedData[fieldDef.qrCodeParsing])}))}renderQRCodeScanner(actionModel){return actionModel.dialogInfo.fields.find((field=>field.qrcode))?lit.qy`
            <div class="layout horizontal flex center-center">
                <qr-code-element
                    continuous
                    @qrcode-decoded=${this.handleQRCodeDecoded}>
                </qr-code-element>
            </div>
            `:lit.s6}renderDialogFields(actionModel){return lit.qy`
        ${actionModel.dialogInfo.fields.map(((fld,i)=>lit.qy`
            // Renderiza tus campos aquí como antes
        `))}
        `}openGenericDialog(actionModel=this.actionBeingPerformedModel){return void 0!==actionModel&&void 0!==actionModel.dialogInfo&&(void 0!==actionModel.dialogInfo.gridContent&&!0===actionModel.dialogInfo.gridContent||void 0!==actionModel.dialogInfo.filesListContent&&!0===actionModel.dialogInfo.filesListContent?(this.getGenericDialogGridItems(actionModel.dialogInfo),!0):(this.formDefaultValue(),void 0!==actionModel.dialogInfo&&void 0!==actionModel.dialogInfo.name&&"GENERICDIALOG"===actionModel.dialogInfo.name.toString().toUpperCase()))}acceptedGenericGridDialog(e){console.log("genericDialogGridSelectedItems",this.genericDialogGridSelectedItems),0!=this.genericDialogGridSelectedItems.length?(this.dialogAcceptForGrid(!1,this.genericDialogGridSelectedItems[0]),e.stopPropagation()):"es"==this.lang?alert("Por favor, seleccione un elemento de la tabla"):alert("Please select one element from the list first")}genericFormDialog(actionModel,procInstanceName){return this.procInstanceName=procInstanceName,void 0===actionModel&&void 0!==(actionModel=this.actionBeingPerformedModel)&&(this.area=actionModel.area),lit.qy`
    <style>
    mwc-textfield {
        border-style : Solid;
        border-color : #999999;
        border-color : rgba(153, 153, 153, 1);
        border-width : 1px;
        border-radius : 7px;
        -moz-border-radius : 7px;
        -webkit-border-radius : 7px;   
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background-color :  #FFFFFF;
        background-color : rgb(255, 255, 255);  
        --mdc-text-field-idle-line-color:#148CFA;
        --mdc-text-field-outlined-idle-border-color: #148CFA;
        --mdc-text-field-label-ink-color:  #148CFA;
        --mdc-text-field-focused-label-color: #148CFA;
        --mdc-theme-primary: #0465FB;
      }
      mwc-select {        
        --mdc-theme-primary : rgba(36, 192, 235, 1);
        --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
        --mdc-select-ink-color: rgb(47, 47, 47);
        --mdc-select-dropdown-icon-color:rgba(36, 192, 235, 1);
        --mdc-select-hover-line-color:rgba(36, 192, 235, 1);
        --mdc-notched-outline-border-color: rgba(186, 235, 248, 0.4);
        --mdc-select-disabled-dropdown-icon-color:rgba(36, 192, 235, 1);
        --mdc-select-label-ink-color: #148CFA;
        
        
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }
      mwc-select.outlined {        
        --mdc-theme-primary : rgba(36, 192, 235, 1);
        --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
        --mdc-select-ink-color: rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background-color: 4fcad029;
      }  
      
    .file-list {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      max-width: 600px;
    }

    /* Style for each list item */
    .file-list-item {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    /* Style for the icon button */
    .file-list-item mwc-icon-button {
      margin-right: 10px;
    }

    /* Style for the file name */
    .file-name {
      font-size: 14px;
      color: #333;
    }            
    </style>
        <tr-dialog id="genericDialog"  
             

            ?open=${this.openGenericDialog(actionModel)}  heading="" hideActions="" scrimClickAction="">
        
        ${void 0!==actionModel&&void 0!==actionModel.dialogInfo&&void 0!==actionModel.dialogInfo&&void 0!==actionModel.dialogInfo.gridContent&&!0===actionModel.dialogInfo.gridContent?lit.qy`
            <div style="margin-top:30px;text-align:center">
                <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline" @click=${this.declineDialog}> 
                    ${common_core.k.closeDialogButton["label_"+this.lang]}</sp-button>
                <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.acceptedGenericGridDialog}>
                    ${common_core.k.confirmDialogButton["label_"+this.lang]}</sp-button>
            </div>  
            
            ${null==this.genericDialogGridItems||0==this.genericDialogGridItems.length?lit.qy`${"en"===this.lang?"No items to display":"No hay elementos para ver"}`:lit.qy`
                <vaadin-grid .items=${this.genericDialogGridItems} id="genericDialogGrid" theme="row-dividers" column-reordering-allowed multi-sort 
                @active-item-changed=${e=>this.genericDialogGridSelectedItems=e.detail.value?[e.detail.value]:[]}
                .selectedItems="${this.genericDialogGridSelectedItems}" all-rows-visible>
                ${actionModel.dialogInfo.langConfig.gridHeader.map((fld=>lit.qy`<vaadin-grid-filter-column width="${fld.width}" resizable text-align="center" path="${fld.fldName}" .header="${fld["label_"+this.lang]}"></vaadin-grid-filter-column>`))}
                </vaadin-grid>  
            `}                      
        `:lit.qy`
        ${actionModel&&actionModel.dialogInfo&&actionModel.dialogInfo.fields?lit.qy`              
            ${actionModel.dialogInfo.fields.map(((fld,i)=>lit.qy`   
                ${fld.acceptancecriteria?lit.qy`        
                        <speclimit-quantitative id="acceptancecriteria" .fld=${fld.acceptancecriteria} ></speclimit-quantitative>         
                `:lit.qy``}          

                ${fld.tree1?lit.qy`     
  <tree-viewfran    id="tree1" .data="${fld.tree1.treeElementData}"   label="${this.fieldLabel(fld.tree1)}" .specification="${fld.tree1.treeElementSpecification}"    
    @item-selected=${fld.tree1.treeSelection}    .level="${0}"  ></tree-viewfran>                       
               <!--         <tree-view id="tree1" .data=${fld.tree1.treeElementData} .specification=${fld.tree1.treeElementSpecification} 
               @item-selected=${fld.tree1.treeSelection}></tree-view>         -->
                `:lit.qy``}          
                ${fld.text1?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text1" type="text" .value=${fld.text1.default_value?fld.text1.default_value:""}  label="${this.fieldLabel(fld.text1)}"  ?disabled=${this.isFieldDisabled(fld.text1)} 
                        @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.text2?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text2" type="text" .value=${fld.text2.default_value?fld.text2.default_value:""} label="${this.fieldLabel(fld.text2)}"  ?disabled=${this.isFieldDisabled(fld.text2)}                    
                    @keypress=${e=>13==e.keyCode&&this.actionWhenOtherThanListValueChanged(e,fld.text2,actionModel.dialogInfo,this.genericDialogGridSelectedItems)}  
                    </mwc-textfield>                  
                    </div>
                `:lit.qy``}          
                ${fld.text3?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text3" type="text" .value=${fld.text3.default_value?fld.text3.default_value:""} label="${this.fieldLabel(fld.text3)}"  ?disabled=${this.isFieldDisabled(fld.text3)} 
                        @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}                       
                ${fld.text4?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text4" type="text" .value=${fld.text4.default_value?fld.text4.default_value:""} label="${this.fieldLabel(fld.text4)}"  ?disabled=${this.isFieldDisabled(fld.text4)} 
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.text5?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text5" type="text" .value=${fld.text5.default_value?fld.text5.default_value:""} label="${this.fieldLabel(fld.text5)}"  ?disabled=${this.isFieldDisabled(fld.text5)} 
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.text6?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text6" type="text" .value=${fld.text6.default_value?fld.text6.default_value:""} label="${this.fieldLabel(fld.text6)}"  ?disabled=${this.isFieldDisabled(fld.text6)} 
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.text7?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text7" type="text" .value=${fld.text7.default_value?fld.text7.default_value:""} label="${this.fieldLabel(fld.text7)}" ?disabled=${this.isFieldDisabled(fld.text7)}  
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.text8?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text8" type="text" .value=${fld.text8.default_value?fld.text8.default_value:""} label="${this.fieldLabel(fld.text8)}" ?disabled=${this.isFieldDisabled(fld.text8)} 
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.text9?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text9" type="text" .value=${fld.text9.default_value?fld.text9.default_value:""} label="${this.fieldLabel(fld.text9)}" ?disabled=${this.isFieldDisabled(fld.text9)} 
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.text10?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text10" type="text" .value=${fld.text10.default_value?fld.text10.default_value:""} label="${this.fieldLabel(fld.text10)}" ?disabled=${this.isFieldDisabled(fld.text10)} 
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``} 
                ${fld.textarea1?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textarea id="textarea1" label="${this.fieldLabel(fld.textarea1)}" rows=10 cols=100></mwc-textarea>            
                    </div>
                `:lit.qy``} 
                ${fld.number111?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number111" type="number" 
                    .value=${this.fldDefaultValue(fld.number111)}                      
                    @input=${e=>this.setNumberMask(e,fld.number111)}
                    label="${this.fieldLabel(fld.number111)}"
                    @keypress=${e=>13==e.keyCode}></mwc-textfield>                 
                    </div>
                `:lit.qy``}   

                ${fld.number1?lit.qy`        
                    <div class="layout horizontal flex center-center">
                        <mwc-textfield class="layout flex" id="number1" type="number"
                            .value=${String(this.fldDefaultValue(fld.number1))}
                            @input=${e=>this.setValidVal(e,fld)}
                            label="${this.fieldLabel(fld.number1)}"
                            ?disabled=${this.isFieldDisabled(fld.number1)}
                            @keypress=${e=>13===e.keyCode&&this.acceptedGenericDialog()}></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.number2?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number2" type="number" @input=${e=>this.setNumberMask(e,fld.number2)}  ?disabled=${this.isFieldDisabled(fld.number2)} 
                    .value=${this.fldDefaultValue(fld.number2)}    label="${this.fieldLabel(fld.number2)}"
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.number3?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number3" type="number" @input=${e=>this.setNumberMask(e,fld.number3)} ?disabled=${this.isFieldDisabled(fld.number3)} 
                    .value=${this.fldDefaultValue(fld.number3)}    label="${this.fieldLabel(fld.number3)}"
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.number4?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number4" type="number" @input=${e=>this.setNumberMask(e,fld.number4)} ?disabled=${this.isFieldDisabled(fld.number4)} 
                    .value=${this.fldDefaultValue(fld.number4)}    label="${this.fieldLabel(fld.number4)}"
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.number5?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number5" type="number" @input=${e=>this.setNumberMask(e,fld.number5)} ?disabled=${this.isFieldDisabled(fld.number5)} 
                    .value=${this.fldDefaultValue(fld.number5)}    label="${this.fieldLabel(fld.number5)}"
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.number6?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number6" type="number" @input=${e=>this.setNumberMask(e,fld.number6)} ?disabled=${this.isFieldDisabled(fld.number6)} 
                    .value=${this.fldDefaultValue(fld.number6)}   label="${this.fieldLabel(fld.number6)}"
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.number7?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number7" type="number" @input=${e=>this.setNumberMask(e,fld.number7)} ?disabled=${this.isFieldDisabled(fld.number7)} 
                    .value=${this.fldDefaultValue(fld.number7)}    label="${this.fieldLabel(fld.number7)}"
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.number8?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number8" type="number" @input=${e=>this.setNumberMask(e,fld.number8)} ?disabled=${this.isFieldDisabled(fld.number8)} 
                    .value=${this.fldDefaultValue(fld.number8)}    label="${this.fieldLabel(fld.number8)}"
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.number9?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number9" type="number" @input=${e=>this.setNumberMask(e,fld.number9)} ?disabled=${this.isFieldDisabled(fld.number9)} 
                    .value=${this.fldDefaultValue(fld.number9)}    label="${this.fieldLabel(fld.number9)}"
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.number10?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number10" type="number" @input=${e=>this.setNumberMask(e,fld.number10)} ?disabled=${this.isFieldDisabled(fld.number10)} 
                    .value=${this.fldDefaultValue(fld.number10)}    label="${this.fieldLabel(fld.number10)}"
                    @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.checkbox1?lit.qy`        
                    <mwc-formfield label="${this.fieldLabel(fld.checkbox1)}" >
                        <mwc-checkbox id="checkbox1" 
                        ?checked=${this.fldDefaultValue(fld.checkbox1)} ?disabled=${this.isFieldDisabled(fld.checkbox1)} 
                        @change=${e=>{this.checkbox1.value=this.checkbox1.checked}}
                        value="${fld.checkbox1.default_value}"
                        ></mwc-checkbox>
                    </mwc-formfield>
                `:lit.qy``}                              
                    ${fld.checkbox2?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox2)}" >
                        <mwc-checkbox id="checkbox2" 
                        ?checked=${this.fldDefaultValue(fld.checkbox2)} ?disabled=${this.isFieldDisabled(fld.checkbox2)} 
                        @change=${e=>{this.checkbox2.value=this.checkbox2.checked}}
                        value="${fld.checkbox2.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.checkbox3?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox3)}" >
                        <mwc-checkbox id="checkbox3" 
                        ?checked=${this.fldDefaultValue(fld.checkbox3)} ?disabled=${this.isFieldDisabled(fld.checkbox3)} 
                        @change=${e=>{this.checkbox3.value=this.checkbox3.checked}}
                        value="${fld.checkbox3.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.checkbox4?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox4)}" >
                        <mwc-checkbox id="checkbox4" 
                        ?checked=${this.fldDefaultValue(fld.checkbox4)} ?disabled=${this.isFieldDisabled(fld.checkbox4)} 
                        @change=${e=>{this.checkbox4.value=this.checkbox4.checked}}
                        value="${fld.checkbox4.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.checkbox5?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox5)}" >
                        <mwc-checkbox id="checkbox5" 
                        ?checked=${this.fldDefaultValue(fld.checkbox5)} ?disabled=${this.isFieldDisabled(fld.checkbox5)} 
                        @change=${e=>{this.checkbox5.value=this.checkbox5.checked}}
                        value="${fld.checkbox5.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.checkbox6?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox6)}" >
                        <mwc-checkbox id="checkbox6" 
                        ?checked=${this.fldDefaultValue(fld.checkbox6)} ?disabled=${this.isFieldDisabled(fld.checkbox6)} 
                        @change=${e=>{this.checkbox6.value=this.checkbox6.checked}}
                        value="${fld.checkbox6.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.checkbox7?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox7)}" >
                        <mwc-checkbox id="checkbox7" 
                        ?checked=${this.fldDefaultValue(fld.checkbox7)} ?disabled=${this.isFieldDisabled(fld.checkbox7)} 
                        @change=${e=>{this.checkbox7.value=this.checkbox7.checked}}
                        value="${fld.checkbox7.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.checkbox8?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox8)}" >
                        <mwc-checkbox id="checkbox8" 
                        ?checked=${this.fldDefaultValue(fld.checkbox8)} ?disabled=${this.isFieldDisabled(fld.checkbox8)} 
                        @change=${e=>{this.checkbox8.value=this.checkbox8.checked}}
                        value="${fld.checkbox8.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.checkbox9?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox9)}" >
                        <mwc-checkbox id="checkbox9" 
                        ?checked=${this.fldDefaultValue(fld.checkbox9)} ?disabled=${this.isFieldDisabled(fld.checkbox9)} 
                        @change=${e=>{this.checkbox9.value=this.checkbox9.checked}}
                        value="${fld.checkbox9.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.checkbox10?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.checkbox10)}" >
                        <mwc-checkbox id="checkbox10" 
                        ?checked=${this.fldDefaultValue(fld.checkbox10)} ?disabled=${this.isFieldDisabled(fld.checkbox10)} 
                        @change=${e=>{this.checkbox10.value=this.checkbox10.checked}}
                        value="${fld.checkbox10.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              

                    ${fld.date1?lit.qy`<mwc-textfield id="date1" label="${this.fieldLabel(fld.date1)}" type="date"></mwc-textfield>`:lit.qy``}
                    ${fld.date2?lit.qy`<mwc-textfield id="date2" label="${this.fieldLabel(fld.date2)}" type="date"></mwc-textfield>`:lit.qy``}
                    ${fld.date3?lit.qy`<mwc-textfield id="date3" label="${this.fieldLabel(fld.date3)}" type="date"></mwc-textfield>`:lit.qy``}
                    ${fld.date4?lit.qy`<mwc-textfield id="date4" label="${this.fieldLabel(fld.date4)}" type="date"></mwc-textfield>`:lit.qy``}
                    ${fld.date5?lit.qy`<mwc-textfield id="date5" label="${this.fieldLabel(fld.date5)}" type="date"></mwc-textfield>`:lit.qy``}                           
                    ${fld.date6?lit.qy`<mwc-textfield id="date6" label="${this.fieldLabel(fld.date6)}" type="date"></mwc-textfield>`:lit.qy``} 
                    ${fld.date7?lit.qy`<mwc-textfield id="date7" label="${this.fieldLabel(fld.date7)}" type="date"></mwc-textfield>`:lit.qy``}
                    ${fld.date8?lit.qy`<mwc-textfield id="date8" label="${this.fieldLabel(fld.date8)}" type="date"></mwc-textfield>`:lit.qy``}
                    ${fld.date9?lit.qy`<mwc-textfield id="date9" label="${this.fieldLabel(fld.date9)}" type="date"></mwc-textfield>`:lit.qy``}
                    ${fld.date10?lit.qy`<mwc-textfield id="date10" label="${this.fieldLabel(fld.date10)}" type="date"></mwc-textfield>`:lit.qy``}

                    ${fld.datetime1?lit.qy`<input id="datetime1" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.datetime2?lit.qy`<input id="datetime2" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.datetime3?lit.qy`<input id="datetime3" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.datetime4?lit.qy`<input id="datetime4" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.datetime5?lit.qy`<input id="datetime5" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.datetime6?lit.qy`<input id="datetime6" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.datetime7?lit.qy`<input id="datetime7" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.datetime8?lit.qy`<input id="datetime8" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.datetime9?lit.qy`<input id="datetime9" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.datetime10?lit.qy`<input id="datetime10" type="datetime-local" dialogInitialFocus>`:lit.qy``}   

                    
                    ${fld.daterange1?lit.qy`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange1dateStart" label="${this.fieldLabel(fld.daterange1.dateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange1dateEnd" label="${this.fieldLabel(fld.daterange1.dateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `:lit.qy``}                       
                    ${fld.daterange2?lit.qy`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange2dateStart" label="${this.fieldLabel(fld.daterange2.dateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange2dateEnd" label="${this.fieldLabel(fld.daterange2.dateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `:lit.qy``}                       
                    ${fld.daterange3?lit.qy`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange3dateStart" label="${this.fieldLabel(fld.daterange3.dateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange3dateEnd" label="${this.fieldLabel(fld.daterange3.dateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `:lit.qy``}                       
                    ${fld.daterange4?lit.qy`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange4dateStart" label="${this.fieldLabel(fld.daterange4.dateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange4dateEnd" label="${this.fieldLabel(fld.daterange4.dateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `:lit.qy``}                       
                    ${fld.daterange5?lit.qy`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange5dateStart" label="${this.fieldLabel(fld.daterange5.dateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange5dateEnd" label="${this.fieldLabel(fld.daterange5.dateEnd)}" type="date"></mwc-textfield>
                        </div>
                `:lit.qy``}                
                ${fld.twoListsLinked?lit.qy`                
                    <two-lists-linked .procInstanceName=${this.procInstanceName} lang=${this.lang} .fld=${fld.twoListsLinked}></two-lists-linked>
                `:lit.qy``}      
                ${fld.list1?lit.qy`       
                <div class="layout horizontal flex center-center"> 
                    <mwc-select id="list1" label="${this.fieldLabel(fld.list1)}" @selected=${e=>this.actionWhenListValueSelected(e,fld.list1,actionModel.dialogInfo)} ?disabled=${this.isFieldDisabled(fld.list1)} .definition=${fld.list1}
                        style="width:100%;">
                        ${this.listEntries(fld.list1)}</mwc-select>`:lit.qy``}  
                </div>
                ${fld.list2?lit.qy`        
                    <div class="layout horizontal flex center-center"> 
                    <mwc-select style="width:100%;" id="list2" label="${this.fieldLabel(fld.list2)}" @selected=${e=>this.actionWhenListValueSelected(e,fld.list2,actionModel.dialogInfo)} ?disabled=${this.isFieldDisabled(fld.list2)} .definition=${fld.list2}>
                        ${this.listEntries(fld.list2)}</mwc-select>`:lit.qy``}
                </div>  
                ${fld.list3?lit.qy`        
                    <div class="layout horizontal flex center-center"> 
                    <mwc-select style="width:100%;" id="list3" label="${this.fieldLabel(fld.list3)}" @selected=${e=>this.actionWhenListValueSelected(e,fld.list3,actionModel.dialogInfo)} @input=${this.fldDisabled} ?disabled=${this.isFieldDisabled(fld.list3)}>
                        ${this.listEntries(fld.list3)}</mwc-select>`:lit.qy``}
                </div>  
                ${fld.list4?lit.qy`        
                    <div class="layout horizontal flex center-center"> 
                    <mwc-select style="width:100%;" id="list4" label="${this.fieldLabel(fld.list4)}" @selected=${e=>this.actionWhenListValueSelected(e,fld.list4,actionModel.dialogInfo)}  @input=${this.fldDisabled} ?disabled=${this.isFieldDisabled(fld.list4)}>
                        ${this.listEntries(fld.list4)}</mwc-select>`:lit.qy``}
                </div>  
                ${fld.list5?lit.qy`        
                    <div class="layout horizontal flex center-center"> 
                    <mwc-select style="width:100%;" id="list5" label="${this.fieldLabel(fld.list5)}" @selected=${e=>this.actionWhenListValueSelected(e,fld.list5,actionModel.dialogInfo)}  @input=${this.fldDisabled} ?disabled=${this.isFieldDisabled(fld.list5)}>
                        ${this.listEntries(fld.list5)}</mwc-select>`:lit.qy``}
                </div>  
                ${fld.list6?lit.qy`        
                    <div class="layout horizontal flex center-center"> 
                    <mwc-select style="width:100%;" id="list6" label="${this.fieldLabel(fld.list6)}" @selected=${e=>this.actionWhenListValueSelected(e,fld.list6,actionModel.dialogInfo)} ?disabled=${this.isFieldDisabled(fld.list6)}>
                        ${this.listEntries(fld.list6)}</mwc-select>`:lit.qy``}
                </div>  
                ${fld.list7?lit.qy`        
                    <div class="layout horizontal flex center-center"> 
                    <mwc-select style="width:100%;" id="list7" label="${this.fieldLabel(fld.list7)}" @selected=${e=>this.actionWhenListValueSelected(e,fld.list7,actionModel.dialogInfo)} ?disabled=${this.isFieldDisabled(fld.list7)}>
                        ${this.listEntries(fld.list7)}</mwc-select>`:lit.qy``}
                </div>  
                ${fld.list8?lit.qy`        
                    <div class="layout horizontal flex center-center"> 
                    <mwc-select style="width:100%;" id="list8" label="${this.fieldLabel(fld.list8)}" @selected=${e=>this.actionWhenListValueSelected(e,fld.list8,actionModel.dialogInfo)} ?disabled=${this.isFieldDisabled(fld.list8)}>
                        ${this.listEntries(fld.list8)}</mwc-select>`:lit.qy``}
                </div>  
                ${fld.list9?lit.qy`        
                    <div class="layout horizontal flex center-center"> 
                    <mwc-select style="width:100%;" id="list9" label="${this.fieldLabel(fld.list9)}" @selected=${e=>this.actionWhenListValueSelected(e,fld.list9,actionModel.dialogInfo)} ?disabled=${this.isFieldDisabled(fld.list9)}>
                        ${this.listEntries(fld.list9)}</mwc-select>`:lit.qy``}
                </div>  
                ${fld.list10?lit.qy`        
                    <div class="layout horizontal flex center-center"> 
                    <mwc-select style="width:100%;" id="list10" label="${this.fieldLabel(fld.list10)}" @selected=${e=>this.actionWhenListValueSelected(e,fld.list10,actionModel.dialogInfo)} ?disabled=${this.isFieldDisabled(fld.list10)}>
                        ${this.listEntries(fld.list10)}</mwc-select>`:lit.qy``}
                </div>  
                ${fld.multilist1?lit.qy`        
                    <div class="layout horizontal flex center-center" style="margin-top: 4px;">
                      <multi-select style="width: 100%;" id="multilist1" .props=${void 0!==fld.multilist1.properties?fld.multilist1.properties:{}} .activeOptions=${fld.multilist1.defaultValue?this.selectedItem[fld.multilist1.defaultValue]:{}} .options=${this.listEntries(fld.multilist1,!0)}
                      .label="${fld.multilist1["label_"+this.lang]}"> </multi-select> 
                    </div>
                `:lit.qy``}                   
                ${fld.multilist2?lit.qy`        
                    <div class="layout horizontal flex center-center" style="margin-top: 4px;">
                      <multi-select style="width: 100%;" id="multilist2" .props=${void 0!==fld.multilist2.properties?fld.multilist2.properties:{}} .activeOptions=${fld.multilist2.defaultValue?this.selectedItem[fld.multilist2.defaultValue]:{}} .options=${this.listEntries(fld.multilist2,!0)}
                      .label="${fld.multilist2["label_"+this.lang]}"> </multi-select> 
                    </div>
                `:lit.qy``}                   
                ${fld.multilist3?lit.qy`        
                    <div class="layout horizontal flex center-center" style="margin-top: 4px;">
                      <multi-select style="width: 100%;" id="multilist3" .props=${void 0!==fld.multilist3.properties?fld.multilist3.properties:{}} .activeOptions=${fld.multilist3.defaultValue?this.selectedItem[fld.multilist3.defaultValue]:{}} .options=${this.listEntries(fld.multilist3,!0)}
                      .label="${fld.multilist3["label_"+this.lang]}"> </multi-select> 
                    </div>
                `:lit.qy``}                   
                ${fld.multilist4?lit.qy`        
                    <div class="layout horizontal flex center-center" style="margin-top: 4px;">
                      <multi-select style="width: 100%;" id="multilist4" .props=${void 0!==fld.multilist4.properties?fld.multilist4.properties:{}} .activeOptions=${fld.multilist4.defaultValue?this.selectedItem[fld.multilist4.defaultValue]:{}} .options=${this.listEntries(fld.multilist4,!0)}
                      .label="${fld.multilist4["label_"+this.lang]}"> </multi-select> 
                    </div>
                `:lit.qy``}                   
                ${fld.multilist5?lit.qy`        
                    <div class="layout horizontal flex center-center" style="margin-top: 4px;">
                      <multi-select style="width: 100%;" id="multilist5" .props=${void 0!==fld.multilist5.properties?fld.multilist5.properties:{}} .activeOptions=${fld.multilist5.defaultValue?this.selectedItem[fld.multilist5.defaultValue]:{}} .options=${this.listEntries(fld.multilist5,!0)}
                      .label="${fld.multilist5["label_"+this.lang]}"> </multi-select> 
                    </div>
                `:lit.qy``}                   
                ${fld.multilist6?lit.qy`        
                    <div class="layout horizontal flex center-center" style="margin-top: 4px;">
                      <multi-select style="width: 100%;" id="multilist6" .props=${void 0!==fld.multilist6.properties?fld.multilist6.properties:{}} .activeOptions=${fld.multilist6.defaultValue?this.selectedItem[fld.multilist6.defaultValue]:{}} .options=${this.listEntries(fld.multilist6,!0)}
                      .label="${fld.multilist6["label_"+this.lang]}"> </multi-select> 
                    </div>
                `:lit.qy``}                   
                ${fld.multilist7?lit.qy`        
                    <div class="layout horizontal flex center-center" style="margin-top: 4px;">
                      <multi-select style="width: 100%;" id="multilist7" .props=${void 0!==fld.multilist7.properties?fld.multilist7.properties:{}} .activeOptions=${fld.multilist7.defaultValue?this.selectedItem[fld.multilist7.defaultValue]:{}} .options=${this.listEntries(fld.multilist7,!0)}
                      .label="${fld.multilist7["label_"+this.lang]}"> </multi-select> 
                    </div>
                `:lit.qy``}                   
                ${fld.multilist8?lit.qy`        
                    <div class="layout horizontal flex center-center" style="margin-top: 4px;">
                      <multi-select style="width: 100%;" id="multilist8" .props=${void 0!==fld.multilist8.properties?fld.multilist8.properties:{}} .activeOptions=${fld.multilist8.defaultValue?this.selectedItem[fld.multilist8.defaultValue]:{}} .options=${this.listEntries(fld.multilist8,!0)}
                      .label="${fld.multilist8["label_"+this.lang]}"> </multi-select> 
                    </div>
                `:lit.qy``}                   
                ${fld.multilist9?lit.qy`        
                    <div class="layout horizontal flex center-center" style="margin-top: 4px;">
                      <multi-select style="width: 100%;" id="multilist9" .props=${void 0!==fld.multilist9.properties?fld.multilist9.properties:{}} .activeOptions=${fld.multilist9.defaultValue?this.selectedItem[fld.multilist9.defaultValue]:{}} .options=${this.listEntries(fld.multilist9,!0)}
                      .label="${fld.multilist9["label_"+this.lang]}"> </multi-select> 
                    </div>
                `:lit.qy``}                   
                ${fld.multilist10?lit.qy`        
                    <div class="layout horizontal flex center-center" style="margin-top: 4px;">
                      <multi-select style="width: 100%;" id="multilist10" .props=${void 0!==fld.multilist10.properties?fld.multilist10.properties:{}} .activeOptions=${fld.multilist10.defaultValue?this.selectedItem[fld.multilist10.defaultValue]:{}} .options=${this.listEntries(fld.multilist10,!0)}
                      .label="${fld.multilist10["label_"+this.lang]}"> </multi-select> 
                    </div>
                `:lit.qy``}                   

                ${fld.list1SelectedRow?lit.qy`        
                    <div class="layout horizontal flex center-center"> 
                    <mwc-select style="width:100%;" id="list1SelectedRow" label="${this.fieldLabel(fld.list1SelectedRow)}">
                        ${this.listEntriesForUom(fld.list1SelectedRow,"list1SelectedRow")}</mwc-select>`:lit.qy``}  
                ${fld.list2SelectedRow?lit.qy`        
                    <div class="layout horizontal flex center-center"> 
                    <mwc-select style="width:100%;" id="list2SelectedRow" label="${this.fieldLabel(fld.list2SelectedRow)}">
                        ${this.listEntriesForUom(fld.list2SelectedRow,"list2SelectedRow")}</mwc-select>`:lit.qy``}  
                ${fld.list3SelectedRow?lit.qy`        
                    <div class="layout horizontal flex center-center"> 
                    <mwc-select style="width:100%;" id="list3SelectedRow" label="${this.fieldLabel(fld.list3SelectedRow)}">
                        ${this.listEntriesForUom(fld.list3SelectedRow,"list3SelectedRow")}</mwc-select>`:lit.qy``}  
                
                ${fld.listMDSamplerPersonalAreas?lit.qy`        
                    <div class="layout horizontal flex center-center"> 
                    <mwc-select style="width:100%;" id="listMDSamplerPersonalAreas" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDSamplerPersonalAreas&&fld.listMDSamplerPersonalAreas["label_"+this.lang]}">
                    ${this.masterData.samplerPersonalAreas.map(((c,i)=>lit.qy`<mwc-list-item value="${c.key}" ?selected=${0==i}>${c["label_"+this.lang]}</mwc-list-item>`))}
                    </mwc-select>
                `:lit.qy``}           
                
                ${fld.dynamicElement1?this.addTheDynamicElement(fld.dynamicElement1):lit.s6}

                ${fld.listMDprocedureUsers?lit.qy`        
                        <mwc-select id="listMDprocedureUsers" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDprocedureUsers&&fld.listMDprocedureUsers["label_"+this.lang]}">
                        ${this.MDprocedureUsers.map(((c,i)=>lit.qy`<mwc-list-item value="${c.user_name}" ?selected=${0==i}>${c.user_name}</mwc-list-item>`))}
                        </mwc-select>
                `:lit.qy``}         
                ${fld.listMDvariablesSet?lit.qy`        
                        <mwc-select id="listMDvariablesSet" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDvariablesSet&&fld.listMDvariablesSet["label_"+this.lang]}">
                        ${this.MDvariablesSet.map(((c,i)=>lit.qy`<mwc-list-item value="${c.name}" ?selected=${0==i}>${c.name}(${c.variables_list})</mwc-list-item>`))}
                        </mwc-select>
                `:lit.qy``}           
                ${fld.listMDvariables?lit.qy`        
                        <mwc-select id="listMDvariables" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDvariables&&fld.listMDvariables["label_"+this.lang]}">
                        ${this.MDvariables.map(((c,i)=>lit.qy`<mwc-list-item value="${c.name}" ?selected=${0==i}>${c.name}(${c.param_type})</mwc-list-item>`))}
                        </mwc-select>
                `:lit.qy``}           
            
                ${fld.listSelectedStudyIndividuals?lit.qy`        
                        <mwc-select id="listSelectedStudyIndividuals" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listSelectedStudyIndividuals&&fld.listSelectedStudyIndividuals["label_"+this.lang]}">
                        ${this.selectedStudy.study_individual.map(((l,i)=>lit.qy`<mwc-list-item value="${this.listItemValueToGet(fld.listSelectedStudyIndividuals,l)}" ?selected=${0==i}>${this.listItemValueToDisplay(fld.listSelectedStudyIndividuals,l)}</mwc-list-item>`))}
                        </mwc-select>
                `:lit.qy``}    
                ${fld.listSelectedStudyIndividualSamples?lit.qy`        
                        <mwc-select id="listSelectedStudyIndividualSamples" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listSelectedStudyIndividualSamples&&fld.listSelectedStudyIndividualSamples["label_"+this.lang]}">
                        ${this.selectedStudy.study_individual.map(((l,i)=>lit.qy`<mwc-list-item value="${this.listItemValueToGet(fld.listSelectedStudyIndividualSamples,l)}" ?selected=${0==i}>${this.listItemValueToDisplay(fld.listSelectedStudyIndividualSamples,l)}</mwc-list-item>`))}
                        </mwc-select>
                `:lit.qy``} 
                `))}
            <div style="margin-top:30px;text-align:center">
                <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline" @click=${this.declineDialog}>
                    ${common_core.k.cancelDialogButton["label_"+this.lang]}</sp-button>
                <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.acceptedGenericDialog}>
                    ${common_core.k.confirmDialogButton["label_"+this.lang]}</sp-button>
            </div>
        `:lit.qy`
                ${void 0!==actionModel&&void 0!==actionModel.dialogInfo&&void 0!==actionModel.dialogInfo&&void 0!==actionModel.dialogInfo.filesListContent&&!0===actionModel.dialogInfo.filesListContent?lit.qy`
                    ${null==this.genericDialogGridItems||0==this.genericDialogGridItems.length?lit.qy`${"en"===this.lang?"No items to display":"No hay elementos para ver"}`:lit.qy`
                    <ul class="file-list">
                    ${this.renderQRCodeScanner(actionModel)}
                        ${this.genericDialogGridItems.map(((fld,i)=>lit.qy`
                        <li class="file-list-item">
                            <mwc-icon-button title="${void 0!==fld.brief_summary&&fld.brief_summary.length>0?fld.brief_summary:fld.file_link}" icon="picture_as_pdf" 
                                @click=${()=>window.open(void 0!==fld.file_link&&fld.file_link.length?fld.file_link:fld.report_url,"_blank").focus()} 
                                ?disabled=${!fld.file_link} style="--mdc-icon-size: 40px;"></mwc-icon-button>
                            <div class="file-name">${void 0!==fld.file_link&&fld.file_link.length?fld.file_link:fld.original_file_name}</div>
                        </li>                            
                        `))}
                    </ul>
                    `}
                `:lit.s6}    
            `}
        `}
        </tr-dialog>
    `}addTheDynamicElement(fld){if(void 0===fld.rule||void 0===this.selectedItems[0])return;let selObj=this.selectedItems[0],curValue=selObj[fld.rule.field];if(void 0===curValue)return;0===curValue.length&&(curValue="*NULL*");let matchingEntry=fld.rule.logic.find((entry=>entry.value===curValue));return void 0===matchingEntry&&(curValue.length>0&&(curValue="*NOT_NULL*"),matchingEntry=fld.rule.logic.find((entry=>entry.value===curValue))),void 0!==matchingEntry?"TEXT"===String(matchingEntry.element).toUpperCase()?lit.qy`
            <div class="layout horizontal flex center-center">
            <mwc-textfield class="layout flex" id="dynamicElement1" type="text" .value=${fld.default_value?fld.default_value:""}  label="${this.fieldLabel(fld)}"  ?disabled=${this.isFieldDisabled(fld)} 
                @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>
            </div>
            `:"LIST"===String(matchingEntry.element).toUpperCase()?(fld.items=[],fld.items=JSON.parse(selObj[fld.rule.field]),lit.qy`
            <div class="layout horizontal flex center-center">
            <mwc-select id="dynamicElement1" label="${this.fieldLabel(fld)}" @selected=${()=>this.actionWhenListValueSelected(fld)} ?disab, actionModel.dialogInfoled=${this.isFieldDisabled(fld)}  >
            ${this.listEntries(fld)}</mwc-select>
            </div>
            `):lit.qy``:void 0}get genericDialog(){return this.shadowRoot.querySelector("tr-dialog#genericDialog")}get dateDialog(){return this.shadowRoot.querySelector("tr-dialog#dateDialog")}get dateInput(){return this.shadowRoot.querySelector("input#dateInput")}setNewDate(){this.dateInput.value&&this.dialogAccept(!1)}declineDialog(){this.fieldsShouldBeReset=!0}acceptedGenericDialog(e){this.fieldsShouldBeReset=!0,this.checkMandatoryFieldsNotEmpty()?this.dialogAccept(!1):(console.log("Accepted Generic Dialog but mandatories pending then action not performed"),e.stopPropagation())}checkMandatoryFieldsNotEmpty(){let dlgFlds=this.actionBeingPerformedModel.dialogInfo.fields;for(let i=0;i<dlgFlds[0].length;i++){let fldObj=dlgFlds[0][i],keyName=Object.keys(fldObj),fldDef=fldObj[keyName[0]];if((void 0===fldDef.optional||!1===fldDef.optional)&&0==this[keyName].value.length)return alert("Field "+fldDef["label_"+this.lang]+" is mandatory"),!1}return!0}gridActiveItemChanged(){alert("Changed")}formDefaultValue(){let dlgFlds;if(this.fieldsShouldBeReset&&(this.resetFields(),this.fieldsShouldBeReset=!1),void 0!==this.actionBeingPerformedModel&&void 0!==this.actionBeingPerformedModel.dialogInfo&&void 0!==this.actionBeingPerformedModel.dialogInfo.fields&&(this.actionBeingPerformedModel.dialogInfo.fields,dlgFlds=this.actionBeingPerformedModel.dialogInfo.fields),void 0!==dlgFlds)for(let element of dlgFlds){let fldObj=element,keyName=Object.keys(fldObj);if(null!==this[keyName]&&void 0!==fldObj[keyName]&&void 0!==fldObj[keyName].default_value&&null!==fldObj[keyName].default_value&&(this[keyName].value=fldObj[keyName].default_value),null!==this[keyName]&&void 0!==fldObj[keyName]&&void 0!==fldObj[keyName].selObjectPropertyName&&null!==fldObj[keyName].selObjectPropertyName&&null!==this[keyName]){if(void 0===this.selectedItem[0])return;this[keyName].value=this.selectedItem[0][fldObj[keyName].selObjectPropertyName]}if(null!==this[keyName]&&void 0!==fldObj[keyName]&&void 0!==fldObj.selObjectPropertyName&&null!==fldObj[keyName].selObjectPropertyName&&null!==this[keyName]){if(void 0===this.selectedItem[0])return;this[keyName].value=this.selectedItem[0][fldObj.selObjectPropertyName]}if(null!==this[keyName]&&void 0!==fldObj[keyName]&&void 0!==fldObj[keyName].internalVariableObjName&&null!==fldObj[keyName].internalVariableObjName&&void 0!==fldObj[keyName].internalVariableObjProperty&&null!==fldObj[keyName].internalVariableObjProperty){if(void 0===this[fldObj[keyName].internalVariableObjName]||void 0===this[fldObj[keyName].internalVariableObjName][0])return;Array.isArray(this[fldObj[keyName].internalVariableObjName])?this[keyName].value=this[fldObj[keyName].internalVariableObjName][0][fldObj[keyName].internalVariableObjProperty]:this[keyName].value=this[fldObj[keyName].internalVariableObjName][fldObj[keyName].internalVariableObjProperty]}null!==this[keyName]&&void 0!==fldObj[keyName]&&void 0!==fldObj[keyName].internalVariableObjName&&null!==fldObj[keyName].internalVariableObjName&&void 0!==fldObj[keyName].getNextId&&null!==fldObj[keyName].getNextId&&!0===fldObj[keyName].getNextId&&(void 0===this[fldObj[keyName].internalVariableObjName]?this[keyName].value=1:this[keyName].value=this[fldObj[keyName].internalVariableObjName].length+1)}}resetFields(e){let dlgFlds;if(void 0!==this.actionBeingPerformedModel&&void 0!==this.actionBeingPerformedModel.dialogInfo&&void 0!==this.actionBeingPerformedModel.dialogInfo.fields&&(dlgFlds=this.actionBeingPerformedModel.dialogInfo.fields),void 0!==dlgFlds)for(const element of dlgFlds){let fldObj=element,keyName=Object.keys(fldObj);null!==this[keyName]&&(keyName[0].includes("list")&&!keyName[0].includes("multi")?keyName[0].includes("SelectedRow")||(this[keyName[0]].value=[]):keyName[0].includes("multi")?(fldObj.defaultValue?this[keyName[0]].activeOptions=this.selectedItem[fldObj.defaultValue]:this[keyName[0]].activeOptions={},this[keyName[0]].setClosed()):void 0!==this[keyName]&&void 0!==this[keyName[0]]&&(this[keyName[0]].value=""))}}get acceptancecriteria(){return this.shadowRoot.querySelector("speclimit-quantitative#acceptancecriteria")}get twoListsLinked(){return this.shadowRoot.querySelector("two-lists-linked")}get twoListsLinked(){return this.shadowRoot.querySelector("two-lists-linked")}get listLinked1(){const twoListsLinkedComponent=this.twoListsLinked;return twoListsLinkedComponent?twoListsLinkedComponent.listLinked1:null}get listLinked2(){const twoListsLinkedComponent=this.twoListsLinked;return twoListsLinkedComponent?twoListsLinkedComponent.listLinked2:null}get tree1(){return this.shadowRoot.querySelector("tree-viewfran#tree1")}get text1(){return this.shadowRoot.querySelector("mwc-textfield#text1")}get text2(){return this.shadowRoot.querySelector("mwc-textfield#text2")}get text3(){return this.shadowRoot.querySelector("mwc-textfield#text3")}get text4(){return this.shadowRoot.querySelector("mwc-textfield#text4")}get text5(){return this.shadowRoot.querySelector("mwc-textfield#text5")}get text6(){return this.shadowRoot.querySelector("mwc-textfield#text6")}get text7(){return this.shadowRoot.querySelector("mwc-textfield#text7")}get text8(){return this.shadowRoot.querySelector("mwc-textfield#text8")}get text9(){return this.shadowRoot.querySelector("mwc-textfield#text9")}get text10(){return this.shadowRoot.querySelector("mwc-textfield#text10")}get textarea1(){return this.shadowRoot.querySelector("mwc-textarea#textarea1")}get checkbox1(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox1")}get checkbox2(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox2")}get checkbox3(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox3")}get checkbox4(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox4")}get checkbox5(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox5")}get checkbox6(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox6")}get checkbox7(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox7")}get checkbox8(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox8")}get checkbox9(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox9")}get checkbox10(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox10")}get date1(){return this.shadowRoot.querySelector("mwc-textfield#date1")}get date2(){return this.shadowRoot.querySelector("mwc-textfield#date2")}get date3(){return this.shadowRoot.querySelector("mwc-textfield#date3")}get date4(){return this.shadowRoot.querySelector("mwc-textfield#date4")}get date5(){return this.shadowRoot.querySelector("mwc-textfield#date5")}get date6(){return this.shadowRoot.querySelector("mwc-textfield#date6")}get date7(){return this.shadowRoot.querySelector("mwc-textfield#date7")}get date8(){return this.shadowRoot.querySelector("mwc-textfield#date8")}get date9(){return this.shadowRoot.querySelector("mwc-textfield#date9")}get date10(){return this.shadowRoot.querySelector("mwc-textfield#date10")}get datetime1(){return this.shadowRoot.querySelector("input#datetime1")}get datetime2(){return this.shadowRoot.querySelector("input#datetime2")}get datetime3(){return this.shadowRoot.querySelector("input#datetime3")}get datetime4(){return this.shadowRoot.querySelector("input#datetime4")}get datetime5(){return this.shadowRoot.querySelector("input#datetime5")}get datetime6(){return this.shadowRoot.querySelector("input#datetime6")}get datetime7(){return this.shadowRoot.querySelector("input#datetime7")}get datetime8(){return this.shadowRoot.querySelector("input#datetime8")}get datetime9(){return this.shadowRoot.querySelector("input#datetime9")}get datetime10(){return this.shadowRoot.querySelector("input#datetime10")}get daterange1dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange1dateStart")}get daterange1dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange1dateEnd")}get daterange2dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange2dateStart")}get daterange2dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange2dateEnd")}get daterange3dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange3dateStart")}get daterange3dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange3dateEnd")}get daterange4dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange4dateStart")}get daterange4dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange4dateEnd")}get daterange5dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange5dateStart")}get daterange5dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange5dateEnd")}get number1(){return this.shadowRoot.querySelector("mwc-textfield#number1")}get number2(){return this.shadowRoot.querySelector("mwc-textfield#number2")}get number3(){return this.shadowRoot.querySelector("mwc-textfield#number3")}get number4(){return this.shadowRoot.querySelector("mwc-textfield#number4")}get number5(){return this.shadowRoot.querySelector("mwc-textfield#number5")}get number6(){return this.shadowRoot.querySelector("mwc-textfield#number6")}get number7(){return this.shadowRoot.querySelector("mwc-textfield#number7")}get number8(){return this.shadowRoot.querySelector("mwc-textfield#number8")}get number9(){return this.shadowRoot.querySelector("mwc-textfield#number9")}get number10(){return this.shadowRoot.querySelector("mwc-textfield#number10")}get list1(){return this.shadowRoot.querySelector("mwc-select#list1")}get list2(){return this.shadowRoot.querySelector("mwc-select#list2")}get list3(){return this.shadowRoot.querySelector("mwc-select#list3")}get list4(){return this.shadowRoot.querySelector("mwc-select#list4")}get list5(){return this.shadowRoot.querySelector("mwc-select#list5")}get list6(){return this.shadowRoot.querySelector("mwc-select#list6")}get list7(){return this.shadowRoot.querySelector("mwc-select#list7")}get list8(){return this.shadowRoot.querySelector("mwc-select#list8")}get list9(){return this.shadowRoot.querySelector("mwc-select#list9")}get list10(){return this.shadowRoot.querySelector("mwc-select#list10")}get list1SelectedRow(){return this.shadowRoot.querySelector("mwc-select#list1SelectedRow")}get list2SelectedRow(){return this.shadowRoot.querySelector("mwc-select#list2SelectedRow")}get list3SelectedRow(){return this.shadowRoot.querySelector("mwc-select#list3SelectedRow")}get listMDprocedureUsers(){return this.shadowRoot.querySelector("mwc-select#listMDprocedureUsers")}get listMDSamplerPersonalAreas(){return this.shadowRoot.querySelector("mwc-select#listMDSamplerPersonalAreas")}get listMDvariablesSet(){return this.shadowRoot.querySelector("mwc-select#listMDvariablesSet")}get listMDvariables(){return this.shadowRoot.querySelector("mwc-select#listMDvariables")}get listSelectedStudyIndividuals(){return this.shadowRoot.querySelector("mwc-select#listSelectedStudyIndividuals")}get listSelectedStudyIndividualSamples(){return this.shadowRoot.querySelector("mwc-select#listSelectedStudyIndividualSamples")}get multilist1(){return this.shadowRoot.querySelector("multi-select#multilist1")}get multilist2(){return this.shadowRoot.querySelector("multi-select#multilist2")}get multilist3(){return this.shadowRoot.querySelector("multi-select#multilist3")}get multilist4(){return this.shadowRoot.querySelector("multi-select#multilist4")}get multilist5(){return this.shadowRoot.querySelector("multi-select#multilist5")}get multilist6(){return this.shadowRoot.querySelector("multi-select#multilist6")}get multilist7(){return this.shadowRoot.querySelector("multi-select#multilist7")}get multilist8(){return this.shadowRoot.querySelector("multi-select#multilist8")}get multilist9(){return this.shadowRoot.querySelector("multi-select#multilist9")}get multilist10(){return this.shadowRoot.querySelector("multi-select#multilist10")}get dynamicElement1(){return this.shadowRoot.querySelector("#dynamicElement1")}setNumberMask(e,fieldDef){if(void 0!==fieldDef.min_allowed&&"number"==typeof fieldDef.min_allowed&&e.target.value<fieldDef.min_allowed)return e.target.value=fieldDef.min_allowed,void(this[e.currentTarget.id].value=fieldDef.min_allowed);if(void 0!==fieldDef.max_allowed&&"number"==typeof fieldDef.max_allowed&&e.target.value>fieldDef.max_allowed)return e.target.value=fieldDef.max_allowed,void(this[e.currentTarget.id].value=fieldDef.max_allowed);if(void 0!==fieldDef.max_dp){let v=e.target.value.split(".");v.length>1&&v[1].length>fieldDef.max_dp&&(v[1]=v[1].substring(0,fieldDef.max_dp),e.target.value=Number(v.join(".")),this[e.currentTarget.id].value=Number(v.join(".")))}}async fldDefaultValue(fldDef){if(void 0===fldDef)return"";let curArgName="";if(fldDef.default_value)return fldDef.default_value;if(void 0!==fldDef.getNextId&&!0===fldDef.getNextId&&void 0!==fldDef.internalVariableObjName)return console.log(this[fldDef.internalVariableObjName].length+1),this[fldDef.internalVariableObjName].length+1;if(fldDef.internalVariableSimpleObjName&&fldDef.internalVariableSimpleObjProperty){if(void 0===this[fldDef.internalVariableSimpleObjName]||void 0===this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]){let msg="";return void 0===this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]?(msg="The object "+fldDef.internalVariableSimpleObjName+" has no one property called "+fldDef.internalVariableSimpleObjProperty,alert(msg)):(msg="there is no object called "+fldDef.internalVariableSimpleObjName+" in this view",alert(msg)),"ERROR: "+msg}return this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]}if(fldDef.internalVariableObjName&&fldDef.internalVariableObjProperty){if(void 0===this[fldDef.internalVariableObjName]||void 0===this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]){let msg="";return void 0===this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]?(msg="The object "+fldDef.internalVariableObjName+" has no one property called "+fldDef.internalVariableObjProperty,alert(msg)):(msg="there is no object called "+fldDef.internalVariableObjName+" in this view",alert(msg)),"ERROR: "+msg}return this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]}return fldDef.element?void 0:fldDef.defaultValue?void 0!==fldDef.isAdhocField&&!0===fldDef.isAdhocField?(curArgName=jsonParam[fldDef.argumentName],void 0===curArgName&&(curArgName=""),curArgName.length>0&&(curArgName+="|"),curArgName+=fldDef.defaultValue,void 0!==fldDef.fieldType&&(curArgName=curArgName+"*"+fldDef.fieldType),curArgName):fldDef.defaultValue:fldDef.selObjectPropertyName?this.selectedItem[fldDef.selObjectPropertyName]:fldDef.targetValue?targetValue[fldDef.argumentName]:fldDef.fixValue?fldDef.fixValue:fldDef.contextVariableName?this[fldDef.contextVariableName]:""}}}},"./src/components/GenericDialogs/TrazitInvestigationsDialog.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>TrazitInvestigationsDialog});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.yalc/@trazit/cred-dialog/.yalc/@trazit/common-core/index.js"),_DialogsFunctions__WEBPACK_IMPORTED_MODULE_6__=(__webpack_require__("./node_modules/@material/mwc-list/mwc-list-item.js"),__webpack_require__("./node_modules/@material/mwc-select/mwc-select.js"),__webpack_require__("./node_modules/@material/mwc-checkbox/mwc-checkbox.js"),__webpack_require__("./node_modules/@material/mwc-formfield/mwc-formfield.js"),__webpack_require__("./src/components/GenericDialogs/DialogsFunctions.js")),_Actions_ActionsFunctions__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/components/Actions/ActionsFunctions.js");function TrazitInvestigationsDialog(base){return class extends((0,_Actions_ActionsFunctions__WEBPACK_IMPORTED_MODULE_7__.$)((0,_DialogsFunctions__WEBPACK_IMPORTED_MODULE_6__.X)(base))){static get properties(){return{selectedInvestigations:{type:Array},openInvests:{type:Array},capaRequired:{type:Boolean},targetValue:{type:Object}}}constructor(){super(),this.selectedInvestigations=[],this.openInvests=[],this.capaRequired=!1,this.targetValue={}}openGenericDialog(actionModel=this.actionBeingPerformedModel){return void 0!==actionModel.dialogInfo&&void 0!==actionModel.dialogInfo.name&&"GENERICDIALOG"===actionModel.dialogInfo.name.toString().toUpperCase()&&(this.formDefaultValue(),!0)}investigationTemplate(){return void 0===this.viewModelFromProcModel||void 0===this.viewModelFromProcModel.langConfig||void 0===this.viewModelFromProcModel.langConfig.gridHeader||void 0===this.viewModelFromProcModel.langConfig.gridHeader.created_on||"pending"!==this.viewModelFromProcModel.filter?lit__WEBPACK_IMPORTED_MODULE_0__.qy``:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
      <tr-dialog id="investigationDialog" 
        @closed=${e=>{e.target===this.investigationDialog&&(this.openInvests=[],this.grid.activeItem=null)}}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified" style="width:450px;">
          <div style="height:55vh;overflow:auto">
            <vaadin-grid .items=${this.openInvests} id="investigationGrid" theme="row-dividers" column-reordering-allowed multi-sort 
              @active-item-changed=${e=>this.selectedInvestigations=e.detail.value?[e.detail.value]:[]}
              .selectedItems="${this.selectedInvestigations}" all-rows-visible>
              <vaadin-grid-sort-column width="40%" resizable text-align="center" path="id" header="Id"></vaadin-grid-sort-column>
              <vaadin-grid-filter-column width="60%" resizable text-align="center" path="created_on" .header="${this.viewModelFromProcModel.langConfig.gridHeader.created_on["label_"+this.lang]}"></vaadin-grid-filter-column>
            </vaadin-grid>
          </div>
          <div style="margin-top:10px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__.k.cancelDialogButton["label_"+this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" 
              @click=${this.addInvestigationAction}
              ?disabled=${!this.selectedInvestigations.length}>
              ${_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__.k.confirmDialogButton["label_"+this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `}decisionTemplate(){return void 0===this.viewModelFromProcModel||void 0===this.viewModelFromProcModel.langConfig||void 0===this.viewModelFromProcModel.langConfig.fieldText||"open"!==this.viewModelFromProcModel.filter?lit__WEBPACK_IMPORTED_MODULE_0__.qy``:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
      <tr-dialog id="decisionDialog" 
        @opened=${()=>this.capaRequired=this.capaCheck.checked}
        @closed=${e=>{e.target===this.decisionDialog&&(this.grid.activeItem=null)}}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <mwc-textfield id="systemName" label="${this.viewModelFromProcModel.langConfig.fieldText.systemName["label_"+this.lang]}" 
            .value=${this.selectedItems.length&&this.selectedItems[0].capa_external_system_name}
            dialogInitialFocus></mwc-textfield>
          <mwc-textfield id="systemId" label="${this.viewModelFromProcModel.langConfig.fieldText.systemId["label_"+this.lang]}"
            .value=${this.selectedItems.length&&this.selectedItems[0].capa_external_system_id}></mwc-textfield>
          <mwc-formfield label="${this.viewModelFromProcModel.langConfig.fieldText.capa["label_"+this.lang]}">
            <mwc-checkbox id="capaCheck" 
              ?checked=${this.selectedItems.length&&this.selectedItems[0].capa_required}
              @change=${e=>{this.capaRequired=e.target.checked,this.capaId.value="",this.capaName.value=""}}></mwc-checkbox>
          </mwc-formfield>
          <mwc-textfield id="capaName" label="${this.viewModelFromProcModel.langConfig.fieldText.capaName["label_"+this.lang]}"
            .value=${this.selectedItems.length&&this.selectedItems[0].external_system_name}
            ?hidden=${!this.capaRequired}></mwc-textfield>
          <mwc-textfield id="capaId" label="${this.viewModelFromProcModel.langConfig.fieldText.capaId["label_"+this.lang]}"
            .value=${this.selectedItems.length&&this.selectedItems[0].external_system_id}
            ?hidden=${!this.capaRequired}></mwc-textfield>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__.k.cancelDialogButton["label_"+this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction"
              @click=${this.setDecision}>
              ${_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__.k.confirmDialogButton["label_"+this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `}get investigationDialog(){return this.shadowRoot.querySelector("tr-dialog#investigationDialog")}get decisionDialog(){return this.shadowRoot.querySelector("tr-dialog#decisionDialog")}get systemName(){return this.shadowRoot.querySelector("mwc-textfield#systemName")}get systemId(){return this.shadowRoot.querySelector("mwc-textfield#systemId")}get capaCheck(){return this.shadowRoot.querySelector("mwc-checkbox#capaCheck")}get capaName(){return this.shadowRoot.querySelector("mwc-textfield#capaName")}get capaId(){return this.shadowRoot.querySelector("mwc-textfield#capaId")}setDecision(){let required=[];if(this.systemName.value||required.push("System Name"),this.systemId.value||required.push("System Id"),this.capaCheck.checked&&(this.capaName.value||required.push("CAPA Name"),this.capaId.value||required.push("CAPA Id")),required.length)return this.dispatchEvent(new CustomEvent("error",{detail:{is_error:!0,message_en:"Please fill the required fields: "+required.join(", "),message_es:"Por favor, rellene los campos obligatorios: "+required.join(", ")},bubbles:!0,composed:!0})),void console.log("Please fill the required fields: "+required.join(", "));let targetValue={capaFieldValue:"Trackwise"+this.systemName.value+"*String|"+this.systemId.value+"*String|"+this.capaName.value+"*String|"+this.capaId.value+"*String",capaRequired:this.capaRequired};this.trazitNoDialogRequired(this.actionBeingPerformedModel,this.selectedItems[0],targetValue,!1,this.selectedItems[0],null,null,null)}addInvestigationAction(){let targetValue={investigationId:this.selectedInvestigations[0].id};void 0!==this.selectedItems[0].result_id&&(targetValue.objectsToAdd="sample_analysis_result*"+this.selectedItems[0].result_id),this.trazitNoDialogRequired(this.actionBeingPerformedModel,this.selectedItems[0],targetValue,!1,this.selectedItems[0],null,null,null)}newInvestigationAction(){void 0!==this.selectedItems[0].result_id&&(this.reqParams.fieldValue="Investigation for "+this.selectedItems[0].result_id+"*String",this.reqParams.objectsToAdd="sample_analysis_result*"+this.selectedItems[0].result_id);let APIParams=this.getAPICommonParams(this.actionBeingPerformedModel),endPointUrl=this.getActionAPIUrl(this.actionBeingPerformedModel);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);let params=this.getServiceAPIUrl(this.actionBeingPerformedModel)+endPointUrl+"?"+new URLSearchParams(this.reqParams)+"&"+new URLSearchParams(APIParams);this.fetchApi(params).then((()=>{this.reload()}))}getOpenInvestigations(){alert("getOpenInvestigations");let APIParams=this.getAPICommonParams(this.actionBeingPerformedModel),endPointUrl=this.getQueryAPIUrl(this.actionBeingPerformedModel);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);let params=this.getServiceAPIUrl(this.actionBeingPerformedModel)+endPointUrl+"?"+new URLSearchParams(APIParams);console.log("getOpenInvestigations","params",params),this.fetchApi(params).then((j=>{j&&!j.is_error&&(this.openInvests=j,this.requestUpdate())}))}addInvestObjects(){let params=this.getServiceAPIUrl(this.actionBeingPerformedModel)+this.selectedDialogAction.endPoint+"?"+new URLSearchParams(this.reqParams);this.fetchApi(params).then((()=>{this.investigationDialog.close(),this.resetDialogThings(),this.reload()}))}capaDecisionAction(){let APIParams=this.getAPICommonParams(this.actionBeingPerformedModel),endPointUrl=this.getActionAPIUrl(this.actionBeingPerformedModel);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);let params=this.getServiceAPIUrl(this.actionBeingPerformedModel)+endPointUrl+"?"+new URLSearchParams(this.reqParams)+"&"+new URLSearchParams(APIParams);this.fetchApi(params).then((()=>{this.decisionDialog.close(),this.resetDialogThings(),this.reload()}))}closeInvestigation(){let reqParams={};reqParams.investigationId=this.selectedItems[0].id;let APIParams=this.getAPICommonParams(this.actionBeingPerformedModel),endPointUrl=this.getActionAPIUrl(this.actionBeingPerformedModel);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);if(!this.selectedItems[0].capa_decision_on)return this.dispatchEvent(new CustomEvent("error",{detail:{is_error:!0,message_en:"Required set decision before close",message_es:"Decisión de conjunto requerida antes del cierre"},bubbles:!0,composed:!0})),void console.log("Required set decision before close");let params=this.getServiceAPIUrl(this.actionBeingPerformedModel)+endPointUrl+"?"+new URLSearchParams(reqParams)+"&"+new URLSearchParams(APIParams);this.fetchApi(params).then((()=>{this.reload()}))}}}},"./src/components/GenericDialogs/TrazitReactivateObjectsDialog.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>TrazitReactivateObjectsDialog});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.yalc/@trazit/cred-dialog/.yalc/@trazit/common-core/index.js"),_Actions_ActionsFunctions__WEBPACK_IMPORTED_MODULE_6__=(__webpack_require__("./node_modules/@material/mwc-list/mwc-list-item.js"),__webpack_require__("./node_modules/@material/mwc-select/mwc-select.js"),__webpack_require__("./node_modules/@material/mwc-checkbox/mwc-checkbox.js"),__webpack_require__("./node_modules/@material/mwc-formfield/mwc-formfield.js"),__webpack_require__("./src/components/Actions/ActionsFunctions.js"));function TrazitReactivateObjectsDialog(base){return class extends((0,_Actions_ActionsFunctions__WEBPACK_IMPORTED_MODULE_6__.$)(base)){static get properties(){return{numDays:{type:Number},deactivatedObjects:{type:Array},selectedObjectToReactive:{type:Object}}}constructor(){super(),this.numDays=7,this.deactivatedObjects=[],this.selectedObjectToReactive={}}noNegativeValues(e1){e1.target.value<=0&&(this.numDays=0,e1.target.value=0)}reactivateObjectsDialog(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy` 
        <tr-dialog id="reactivateObjectDialog" ?open=${this.actionBeingPerformedModel&&this.actionBeingPerformedModel.dialogInfo&&"reactivateObjectDialog"===this.actionBeingPerformedModel.dialogInfo.name} heading="" hideActions="" @open="${this.cleanReactivateObjectList}" scrimClickAction="">
        ${void 0===this.actionBeingPerformedModel||void 0===this.actionBeingPerformedModel.dialogInfo||"reactivateObjectDialog"!==this.actionBeingPerformedModel.dialogInfo.name?lit__WEBPACK_IMPORTED_MODULE_0__.s6:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
        <style>
        mwc-select {        
          --mdc-theme-primary : rgba(36, 192, 235, 1);
          --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
          --mdc-select-ink-color: rgb(47, 47, 47);
          --mdc-select-dropdown-icon-color:rgba(36, 192, 235, 1);
          --mdc-select-hover-line-color:rgba(36, 192, 235, 1);
          --mdc-notched-outline-border-color: rgba(186, 235, 248, 0.4);
          --mdc-select-disabled-dropdown-icon-color:rgba(36, 192, 235, 1);
  
          font-family : Montserrat;
          font-weight : bold;
          font-size : 19px;
        }
        mwc-select.outlined {        
          --mdc-theme-primary : rgba(36, 192, 235, 1);
          --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
          --mdc-select-ink-color: rgba(36, 192, 235, 1);
          font-family : Montserrat;
          font-weight : bold;
          font-size : 19px;
          background-color: 4fcad029;
        }       
        div.reactivate{
          min-width:490px;
        }
  
        </style>
        <div class="layout vertical flex center-justified reactivate">        
                <div class="layout vertical flex">
                  <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="queryNumDays" type="number" 
                      .value=${this.numDays} @change=${e1=>this.numDays=e1.target.value}
                      @input=${e1=>this.noNegativeValues(e1)}
                      label="${this.actionBeingPerformedModel.dialogInfo.fieldsObject.queryNumDays["label_"+this.lang]}"
                      @keypress=${e1=>13==e1.keyCode&&this.setDays()}></mwc-textfield>
                    <mwc-icon-button icon="refresh" @click=${this.setDays}></mwc-icon-button>
                  </div>
                  <mwc-select id="objectToReactivateName" label="${this.actionBeingPerformedModel.dialogInfo.fieldsObject.objectName["label_"+this.lang]}" 
                    ?disabled=${!this.deactivatedObjects.length}>
                    ${this.deactivatedObjects.length?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                    ${this.deactivatedObjects.map(((l,i)=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`<mwc-list-item value="${this.listItemValueToGet(l)}" ?selected=${0==i}>${this.listItemValueToDisplay(l)}</mwc-list-item>`))}
                    `:lit__WEBPACK_IMPORTED_MODULE_0__.s6}
                  </mwc-select>
                </div>     
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline" @click="${this.cleanReactivateObjectList}">
              ${_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__.k.cancelDialogButton["label_"+this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.reactivateObjectDialogAction}>
              ${_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__.k.confirmDialogButton["label_"+this.lang]}</sp-button>
          </div>
        </div>
        </tr-dialog>      
        `}
        `}cleanReactivateObjectList(){this.deactivatedObjects=[],this.selectedObjectToReactive={}}setDays(){this.selectedDialogAction=this.actionBeingPerformedModel.dialogInfo.viewQuery,this.GetAlternativeViewData(this.selectedDialogAction,!1)}listItemValueToGet(entry){return void 0===this.actionBeingPerformedModel.dialogInfo||void 0===this.actionBeingPerformedModel.dialogInfo.listDefinition||void 0===this.actionBeingPerformedModel.dialogInfo.listDefinition.keyFldName?(alert("This selected action has no the requirements, requieres dialogInfo.listDefinition.keyFldName property, check the console"),entry.name):(this.selectedObjectToReactive=entry,entry[this.actionBeingPerformedModel.dialogInfo.listDefinition.keyFldName])}listItemValueToDisplay(entry){if(void 0===this.actionBeingPerformedModel.dialogInfo||void 0===this.actionBeingPerformedModel.dialogInfo.listDefinition||void 0===this.actionBeingPerformedModel.dialogInfo.listDefinition.eachEntryTextGenerator)return alert("This selected action has no the requirements, requieres dialogInfo.listDefinition.eachEntryTextGenerator property, check the console"),entry.name;let lFlds=this.actionBeingPerformedModel.dialogInfo.listDefinition.eachEntryTextGenerator,textToDisplay="";for(let i=0;i<lFlds.length;i++)"fix"==lFlds[i].type&&(textToDisplay+=lFlds[i].value),"field"==lFlds[i].type&&(textToDisplay+=entry[lFlds[i].value]);return textToDisplay}reactivateObjectDialogAction(){this.trazitNoDialogRequired(this.actionBeingPerformedModel,this.selectedObjectToReactive,null,!1,this.selectedObjectToReactive,null,null,null),this.cleanReactivateObjectList()}async getDeactivatedObjects(){let queryDefinition=this.actionBeingPerformedModel.dialogInfo.viewQuery;this.deactivatedObjects=[];let APIParams=this.getAPICommonParams(queryDefinition),viewParams=this.jsonParam(queryDefinition),endPointUrl=this.getQueryAPIUrl(queryDefinition);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);let params=this.config.backendUrl+endPointUrl+"?"+new URLSearchParams(APIParams)+"&"+new URLSearchParams(viewParams);try{const response=await this.fetchApi(params);if(response&&!response.is_error&&(this.deactivatedObjects=response,0===this.deactivatedObjects.length)){let log="";log="en"===this.lang?"No records found":"No se han encontrado objetos",this.dispatchEvent(new CustomEvent("error",{detail:{...e,log},bubbles:!0,composed:!0}))}}catch(error){console.error("Error:",error)}}get reactivateObjectDialog(){return this.shadowRoot.querySelector("tr-dialog#reactivateObjectDialog")}get queryNumDays(){return this.shadowRoot.querySelector("mwc-textfield#queryNumDays")}get objectToReactivateName(){return this.shadowRoot.querySelector("mwc-select#objectToReactivateName")}}}},"./src/components/MultiSelect/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var lit_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-element/lit-element.js"),_multiselect_template__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/MultiSelect/multiselect.template.js"),_multiselect_css__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/MultiSelect/multiselect.css.js"),lit_element_router__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/lit-element-router/lit-element-router.js");class MultiSelect extends((0,lit_element_router__WEBPACK_IMPORTED_MODULE_3__.gM)(lit_element__WEBPACK_IMPORTED_MODULE_0__.WF)){static get styles(){return _multiselect_css__WEBPACK_IMPORTED_MODULE_2__.R}static get properties(){return{activeOptions:{type:Array},options:{type:Array},props:{type:Object},open:{type:Boolean},searchOptions:{type:Array}}}constructor(){super(),this.options=[],this.props={},this.activeOptions=[],this.open=!1,this.searchOptions=[],this.allowAdhocEntries=!0,this.value=void 0,this.clickedContainer=!1}render(){return void 0===this.activeOptions?this.activeOptions=[]:"string"==typeof this.activeOptions&&(this.activeOptions=this.activeOptions.split("|")),Array.isArray(this.activeOptions)||(this.activeOptions=[]),void 0===this.searchOptions?this.searchOptions=[]:"string"==typeof this.searchOptions&&(this.searchOptions=this.searchOptions.split("|")),Array.isArray(this.searchOptions)||(this.searchOptions=[]),void 0===this.props&&(this.props={}),void 0===this.props.allowAdhocEntries&&(this.props.allowAdhocEntries=!1),void 0!==this.props&&void 0!==this.props.displayLabel||(this.props.displayLabel=!0),void 0!==this.props&&void 0!==this.props.readOnly||(this.props.readOnly=!1),(0,_multiselect_template__WEBPACK_IMPORTED_MODULE_1__.v)({activeOptions:this.activeOptions,options:this.options,displayLabel:this.props.displayLabel,readOnly:this.props.readOnly,open:this.open,searchOptions:this.searchOptions,allowAdhocEntries:this.props.allowAdhocEntries,clickedContainer:this.clickedContainer,setOpen:this._setOpen,removeActiveOption:this._removeActiveOption,removeOption:this._removeOption,setOpenTrue:this._setOpenTrue,pressEnter:this._pressEnter,clickContainer:this._clickContainer,inputFocusOut:this._inputFocusOut},this.label)}_inputFocusOut=()=>{0==this.activeOptions.length&&(this.clickedContainer=!1),this.open=!1,this.requestUpdate()};_clickContainer=e=>{this.clickedContainer=!0,this.open=!0,this.requestUpdate()};_pressEnter=e=>{const inputValue=e.target.value.toLowerCase();this.activeOptions.some((option=>option.toLowerCase()===inputValue))||this.activeOptions.push(e.target.value),this.activeOptions.map(((value,i)=>{0==i?this.value=value:this.value+="|"+value})),this.inputValue="",this.requestUpdate()};firstUpdated=()=>{this.searchOptions=this.options,this.activeOptions.map(((value,i)=>{0==i?this.value=value:this.value+="|"+value})),this.requestUpdate()};_setOpen=e=>{e.stopPropagation(),this.open=!this.open,this.open?this.clickedContainer=!0:0==this.activeOptions.length&&(this.clickedContainer=!1),this.requestUpdate()};_removeActiveOption=index=>{this.searchOptions.push(this.activeOptions[index]),this.activeOptions.splice(index,1),this.activeOptions.map(((value,i)=>{0==i?this.value=value:this.value+="|"+value})),0==this.activeOptions.length&&(this.clickedContainer=!1,this.open=!1),this.requestUpdate()};_removeOption=index=>{this.activeOptions.push(this.searchOptions[index]),this.activeOptions.map(((value,i)=>{0==i?this.value=value:this.value+="|"+value})),this.searchOptions.splice(index,1),this.requestUpdate()};_setOpenTrue=()=>{this.open=!0,this.requestUpdate()};setClosed(){this.open=!1,this.requestUpdate()}}window.customElements.define("multi-select",MultiSelect)},"./src/components/MultiSelect/multiselect.css.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>styles});const styles=__webpack_require__("./node_modules/lit-element/lit-element.js").AH`
:host {

}
.sellect-container {
    border: 1px solid #ccc;
    padding: 16px 5px 0 5px;
    border-radius: 3px;
    margin-top: 5px;
    position: relative;
    background: #efefef;
}

.sellect-container-readonly {
    border: none;
    padding: 16px 5px 0 5px;
    border-radius: 3px;
    margin-top: -5px;
    position: relative;
    background: #efefef;
}


.sellect-destination-list {
    display: inline-block;
}

.sellect-destination-list .sellect-item {
    padding-top: 3px;
    padding-bottom: 0;
    font-size: 11px;
}

.sellect-destination-list .sellect-item {
    margin: 2px -2px 2px 0;
    background-color: #e5e5e5;
    border: 1px solid #ccc;
    cursor: pointer;
    border-radius: 2px;
    padding: 0px 5px;
    text-align: center;
    line-height: 24px;
    display: inline-block;
    color: rgb(19, 11, 111);
    background-color: #8DDDF4;    
}

.sellect-destination-list .sellect-item .sellect-close-icon {
    margin-left: 5px;
}

.sellect-element {
    border: none;
    height: 18px;
    background: none;
}

.sellect-element:focus-visible {
    outline-offset: 0px;
    outline: none;
}

.sellect-origin-list.open {
    max-height: 138px;
    opacity: 1;
}

.sellect-origin-list {
    overflow: auto;
    max-height: 0;
    opacity: 0;
    transition: opacity 1.1s ease, max-height .2s ease;
}

.sellect-origin-list .sellect-item {
    display: block;
    cursor: pointer;
    padding: 5px;
    border-radius: 3px;
    margin-right: 5px;
}

.sellect-arrow-icon {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    padding: 8px;
    transform: translateY(-3px);
}

.first {
    color: gray;
    position: absolute;
    font-size: 14px;
    top: 8px;
}

.second {
    top: 0px;
    left: -12px;
    position: absolute;
    transform: scale(0.8);
    color: #18a4fe;
}

label {
    padding: 0px 8px;
    transition: all 0.2s;
}
`},"./src/components/MultiSelect/multiselect.template.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{v:()=>template});var lit_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit-element/lit-element.js");__webpack_require__("./node_modules/@material/mwc-icon/mwc-icon.js"),__webpack_require__("./node_modules/@material/mwc-textfield/mwc-textfield.js");const template=(props,label)=>{void 0===props.activeOptions?props.activeOptions=[]:"string"==typeof props.activeOptions&&(props.activeOptions=props.activeOptions.split("|")),Array.isArray(props.activeOptions)||(props.activeOptions=[]),void 0===props.options?props.options=[]:"string"==typeof props.options&&(props.options=props.options.split("|")),Array.isArray(props.options)||(props.options=[]),void 0===props.allowAdhocEntries&&(props.allowAdhocEntries=!1),void 0===props.readOnly&&(props.readOnly=!1),void 0===props.displayLabel&&(props.displayLabel=!0),!0===props.readOnly&&(props.clickedContainer=!0);const filteredOptions=props.options.filter((option=>!props.activeOptions.includes(option))),uniqueFilteredOptions=[...new Set(filteredOptions)];return lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
    <div>
    ${!0===props.readOnly?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
    <div class="sellect-container-readonly" @click=${e=>props.clickContainer(e)} style=${props.clickedContainer?"background-color:transparent;":""} @focusout=${()=>props.inputFocusOut()}>
        ${!1===props.displayLabel?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy``:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
            <label class=${props.clickedContainer?"second":"first"}> ${label} </label>
        `}                
        <div class="sellect-destination-list">
        ${props.activeOptions.map(((option,i)=>lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
            <span class="sellect-trigger sellect-item" style="display: inherit;"> ${option} 
            ${!0===props.readOnly?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy``:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                <mwc-icon class="sellect-close-icon" style="font-size:8px" @click=${()=>props.removeActiveOption(i)}> close </mwc-icon> </span>
            `}
        `))}
        </div>
        </div>
    `:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
        <div class="sellect-container" @click=${e=>props.clickContainer(e)} style=${props.clickedContainer?"background-color:transparent;":""} @focusout=${()=>props.inputFocusOut()}>
            <div class="sellect-destination-list">
                ${props.activeOptions.map(((option,i)=>lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <span class="sellect-trigger sellect-item" style="display: inherit;"> ${option} 
                    ${!0===props.readOnly?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy``:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                        <mwc-icon class="sellect-close-icon" style="font-size:8px" @click=${()=>props.removeActiveOption(i)}> close </mwc-icon> </span>
                    `}
                `))}
            </div>
            ${!1===props.displayLabel?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy``:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                <label class=${props.clickedContainer?"second":"first"}> ${label} </label>
                ${props.allowAdhocEntries?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                <input class="sellect-element" ?disabled=${props.readOnly||!props.allowAdhocEntries} @click=${()=>props.setOpenTrue()} id="my-element" type="text" label=${"* New Production Lot Name"}  @change=${e=>props.pressEnter(e)}></input>
                `:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                <input class="sellect-element" ?disabled=${props.readOnly||!props.allowAdhocEntries} @click=${()=>props.setOpenTrue()} id="my-element" type="text" label=${"* New Production Lot Name"}> </input>
                `}
            `}
            ${!0===props.readOnly?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy``:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
            <div class="sellect-origin-list ${props.open?"open":""}">
                ${uniqueFilteredOptions.map(((option,i)=>lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <span class="sellect-trigger sellect-item" style="display: inherit;" @click=${()=>props.removeOption(i)}> ${option} <i class="fa fa-times sellect-close-icon"> </i> </span>
                `))}
            </div>
            `}
            ${!0===props.readOnly?lit_element__WEBPACK_IMPORTED_MODULE_0__.qy``:lit_element__WEBPACK_IMPORTED_MODULE_0__.qy`
                <mwc-icon class="sellect-arrow-icon" @click=${e=>props.setOpen(e)}> arrow_drop_down </mwc-icon>
            `}
        </div>
    `}
    </div>
    `}},"./src/components/Views/DataViews.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>DataViews});var lit=__webpack_require__("./node_modules/lit/index.js"),unsafe_html=__webpack_require__("./node_modules/lit/directives/unsafe-html.js"),ButtonsFunctions=__webpack_require__("./src/components/Buttons/ButtonsFunctions.js"),AuditFunctions=__webpack_require__("./src/components/Audit/AuditFunctions.js"),ModuleEnvMonitClientMethods=(__webpack_require__("./src/components/Audit/audit-dialog.js"),__webpack_require__("./src/module_env_monit/ModuleEnvMonitClientMethods.js")),TrazitGenericDialogs=__webpack_require__("./src/components/GenericDialogs/TrazitGenericDialogs.js"),TrazitReactivateObjectsDialog=__webpack_require__("./src/components/GenericDialogs/TrazitReactivateObjectsDialog.js"),TrazitEnterResultWithSpec=__webpack_require__("./src/components/GenericDialogs/TrazitEnterResultWithSpec.js"),ModuleEnvMonitDialogsMicroorganism=__webpack_require__("./src/module_env_monit/Dialogs/ModuleEnvMonitDialogsMicroorganism.js"),TrazitInvestigationsDialog=__webpack_require__("./src/components/GenericDialogs/TrazitInvestigationsDialog.js"),common_core=__webpack_require__("./.yalc/@trazit/cred-dialog/.yalc/@trazit/common-core/index.js"),GridFunctions=__webpack_require__("./src/components/grid_with_buttons/GridFunctions.js"),DialogsFunctions=(__webpack_require__("./node_modules/@material/mwc-list/mwc-list-item.js"),__webpack_require__("./node_modules/@material/mwc-select/mwc-select.js"),__webpack_require__("./node_modules/@material/mwc-checkbox/mwc-checkbox.js"),__webpack_require__("./node_modules/@material/mwc-formfield/mwc-formfield.js"),__webpack_require__("./src/components/GenericDialogs/DialogsFunctions.js")),lit_element=__webpack_require__("./node_modules/lit-element/lit-element.js");__webpack_require__("./node_modules/@material/mwc-textfield/mwc-textfield.js"),__webpack_require__("./node_modules/@material/mwc-switch/mwc-switch.js"),__webpack_require__("./src/components/MultiSelect/index.js");const elementTypes={Integer:"INTEGER",Number:"BIGDECIMAL",Text:"STRING",TextArr:"STRINGARR",TextObjectsArr:"STRINGOFOBJECTS"},styles=lit_element.AH`
  :host {
    display: flex;
    justify-content: center;
  }

  .container {
    width: 500px;
  }

  .title {
    font-size: 24px;
    text-align: center;
    margin: 5px 0px 20px;
    color: #148cfa;
  }

  .item-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  select {
    position: relative;
    font-size: 1rem;
    outline: none;
    border-radius: 4px;
    border: 1px solid gray;
    padding: 3px 6px;
    height: 40px;
    appearance: none;
    width: 100%;
    transition: all 0.2s;
    cursor: pointer;
  }

  mwc-select {     
    --mdc-theme-primary : #148cfa;
  }

  mwc-textfield {
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    --mdc-theme-primary: #148cfa;
  }

  mwc-checkbox {
    --mdc-theme-secondary: #148cfa;
  }

  .form-fields {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  mwc-switch {
    --mdc-switch-selected-handle-color: #24C0EB;
    --mdc-switch-selected-track-color: #24C0EB;
    --mdc-switch-unselected-icon-color: gray;
    --mdc-switch-selected-pressed-state-layer-color: #24C0EB;
    --mdc-theme-primary: #24C0EB;
    --mdc-ripple-hover-state-layer-color: gray;

    --mdc-switch-selected-hover-track-color: #24C0EB;
    --mdc-switch-selected-hover-handle-color: #24C0EB;

    --mdc-switch-selected-focus-track-color: #24C0EB;
    --mdc-switch-selected-focus-handle-color: #24C0EB;

    --mdc-switch-selected-pressed-track-color: #24C0EB;
    --mdc-switch-selected-pressed-handle-color: #24C0EB;
  }
`;class DependencyForm extends lit_element.WF{static get styles(){return styles}static get properties(){return{endpoint:{type:String},endpoints:{type:Array},notification:{type:String},notifications:{type:Array},params:{type:Array},lang:{type:String},isFormValid:{type:Boolean},toggles:{type:Object},objectTypes:{type:Array},rowSelectedData:{type:Object},objectTypesStr:{type:String}}}constructor(){super(),this.endpoints=[],this.params=[],this.notification="",this.notifications=[],this.endpoint="",this.lang="",this.toggles={},this.objectTypes=[],this.objectTypesStr="",this.rowSelectedData={},this.notificationChecked=!1,this.tmpNotification=[]}render(){return(props=>{let items=[];if(void 0===props.rowSelectedData)items=props.params;else if(0===Object.keys(props.rowSelectedData).length)items=props.params;else if(props.rowSelectedData){let actionName=sessionStorage.getItem("actionName");items=actionName==props.endpoint&&"SCRIPT_UPDATE_STEP"==actionName?props.endpoints.find((item=>item.keyName==props.rowSelectedData.action_name))?.arguments_array:props.params}else items=[];return lit.qy`
    <div class="container">
      <form id="#endpoint-form" action="/" method="get">
        <div class="item-container">
          <mwc-select
            required
            fixedMenuPosition
            @change=${props.handleChangeEndpoint}
            id="endpoint"
            name="endpoint"
            label="endpoint"
            value=${void 0!==props&&null!==props.rowSelectedData&&void 0!==props.rowSelectedData&&void 0!==props.rowSelectedData.action_name?props.rowSelectedData.action_name:""}
          >
          ${void 0===props||void 0===props.endpoints?lit.s6:lit.qy`
           ${props.endpoints.map(((endpoint,idx)=>endpoint.keyName!=props.rowSelectedData?.action_name?lit.qy`                
                  <mwc-list-item value=${endpoint.keyName}>
                    ${endpoint.keyName}
                  </mwc-list-item>
                `:lit.qy`                
                  <mwc-list-item value=${props.rowSelectedData.action_name}>
                    ${props.rowSelectedData.action_name}
                  </mwc-list-item>
                `))}
          `}
          </mwc-select>
        </div>

        <div class="form-fields">
          ${items.map(((param,idx)=>{const required=param["is_mandatory?"],str=lit.qy`<mwc-switch
                name=${param.name}
                @click=${props.toggleChanged(param.name)}
              />`;if("category"==param.name&&lit.qy`<mwc-select></mwc-select>`,param.type===elementTypes.Number||param.type===elementTypes.Integer)return lit.qy`
              <mwc-formfield>
                  ${str}
                  ${props.toggles[param.name]?lit.qy`
                        <mwc-textfield
                          type="text"
                          ?required=${required}
                          label=${"Step"}
                          name=${param.name+"_step"}
                          style="width: 100%"
                          @change=${props.handleChangeStep(param.name)}
                        ></mwc-textfield>
                        <multi-select style="width: 100%;" name=${param.name+"_object_posic"} 
                        ?required=${required} .activeOptions=${{}} .options=${props.objectTypes}
                        .props=${{readOnly:!1,displayLabel:!0}} .label="${"Object Type"}"> </multi-select> 
                        <mwc-textfield
                          type="text"
                          ?required=${required}
                          label=${"Object Posic"}
                          name=${param.name+"_object_posic"}
                          style="width: 100%"
                          defaultValue=${1}
                        ></mwc-textfield>
                      `:lit.qy`
                    <mwc-textfield
                    ?required=${required}
                    outlined
                    type="number"
                    label=${param.name}
                    name=${param.name}
                    @blur=${props.checkValidity}
                    value=3
                  ></mwc-textfield>`}
                </mwc-formfield>
              `;if(param.type===elementTypes.Text||param.type===elementTypes.TextArr||param.type===elementTypes.TextObjectsArr){let arg="argument_0"+(idx+1);return lit.qy`
                <mwc-formfield>
                  ${str}
                  ${props.toggles[param.name]?lit.qy`
                        <mwc-textfield
                          type="text"
                          ?required=${required}
                          label=${"Step"}
                          name=${param.name+"_step"}
                          style="width: 100%"
                          @change=${props.handleChangeStep(param.name)}
                        ></mwc-textfield>
                        <multi-select style="width: 100%;" name=${param.name+"_object_posic"} 
                        ?required=${required} .activeOptions=${{}} .options=${props.objectTypes}
                        .props=${{readOnly:!1,displayLabel:!0}} .label="${"Object Type"}"> </multi-select> 
                        <mwc-textfield
                          type="text"
                          ?required=${required}
                          label=${"Object Posic"}
                          name=${param.name+"_object_posic"}
                          style="width: 100%"
                          defaultValue=${1}
                        ></mwc-textfield>
                      `:lit.qy`
                    <mwc-textfield
                      ?required=${required}
                      type="text"
                      label=${param.name}
                      name=${param.name}
                      @blur=${props.checkValidity}
                      value=${"SCRIPT_UPDATE_STEP"==sessionStorage.getItem("actionName")&&props.rowSelectedData&&props.rowSelectedData[arg]?props.rowSelectedData[arg]:""}
                      style="width: 100%"
                    ></mwc-textfield> `}
                </mwc-formfield>
              `}return param.type===elementTypes.TextArr2?(console.log("elementTypes.TextArr2"),lit.qy`
                <mwc-formfield>
                  ${str}
                  ${props.toggles[param.name]?lit.qy`
                        <mwc-textfield
                          type="text"
                          ?required=${required}
                          label=${"Step"}
                          name=${param.name+"_step"}
                          style="width: 100%"
                          @change=${props.handleChangeStep(param.name)}
                        ></mwc-textfield>
                        ${props.objectTypes.length>0?lit.qy`
                         <mwc-select
                          required
                          fixedMenuPosition
                          id="objectType"
                          name=${param.name+"_object_type"}
                          label="objectType"
                        >
                          ${props.objectTypes.map(((objectType,idx)=>lit.qy`
                              <mwc-list-item value=${objectType}>
                                ${objectType}
                              </mwc-list-item>
                            `))}
                          </mwc-select>
                          `:lit.qy`
                            <multi-select style="width: 100%;" name=${param.name+"_object_posic"} 
                            ?required=${required} .activeOptions=${{}} .options=${props.objectTypes}
                            .props=${{readOnly:!1,displayLabel:!0}} .label="${"Object Type"}"> </multi-select> 
                          `}
                       
                        <mwc-textfield
                          type="text"
                          ?required=${required}
                          label=${"Object Posic"}
                          name=${param.name+"_object_posic"}
                          style="width: 100%"
                          defaultValue=${1}
                        ></mwc-textfield>
                      `:lit.qy`
                        <mwc-textfield
                          type="text"
                          ?required=${required}
                          label=${param.name}
                          name=${param.name}
                          @blur=${props.checkValidity}
                          style="width: 100%"
                        ></mwc-textfield>
                      `}
                </mwc-formfield>
              `):lit.qy`${param.type}`}))}
          <mwc-formfield label="Expected successful?">
            <mwc-checkbox name="expectedSyntaxis" @change=${e=>props.visibleNotification(e)}></mwc-checkbox>
          </mwc-formfield>
          ${props.notificationChecked?null:lit.qy`
          <mwc-select
            fixedMenuPosition
            id="notification"
            name="notification"
            label="notification"
          >
          ${void 0===props||void 0===props.notifications?lit.s6:lit.qy`
            ${props.notifications.map(((notif,idx)=>lit.qy`
                <mwc-list-item value=${notif.keyName}>
                  ${notif["keyValue_"+props.lang]}
                </mwc-list-item>
              `))}
          `}
          </mwc-select>
          `}
        </div>
      </form>
    </div>
  `})({endpoints:this.endpoints,notifications:this.notifications,tmpNotifications:this.tmpNotifications,params:this.params,lang:this.lang,checkValidity:this._checkValidity,toggles:this.toggles,objectTypes:this.objectTypes,objectTypesStr:this.objectTypesStr,rowSelectedData:this.rowSelectedData,notificationChecked:this.notificationChecked,endpoint:this.endpoint,handleChangeEndpoint:this._handleChangeEndpoint,toggleChanged:this._toggleChanged,handleChangeStep:this._handleChangeStep,visibleNotification:this._visibleNotification})}_visibleNotification=e=>{this.notificationChecked=!this.notificationChecked,this.notifications=this.tmpNotifications,this.notificationChecked&&(this.notifications=[]),this.requestUpdate()};_handleChangeStep=name=>e=>{this.objectTypes=[],this.objectTypesStr="";const stepValue=e.target.value;let steps=JSON.parse(sessionStorage.getItem("steps"));const tmp=JSON.parse(steps[stepValue-1].dynamic_data);console.log(tmp),tmp.map(((step,i)=>{this.objectTypesStr.length>0&&(this.objectTypesStr=this.objectTypesStr+"|"),this.objectTypesStr=this.objectTypesStr+step.object_type,this.objectTypes.push(step.object_type)})),this.requestUpdate()};_toggleChanged=name=>()=>{this.toggles[name]=!this.toggles[name],this.requestUpdate()};_handleChangeEndpoint=e=>{if(this.willUpdateData=void 0,this.toggles={},void 0===this.endpoints)return[];const idx=this.endpoints.findIndex((endpoint=>endpoint.keyName===e.target.value));if(-1===idx)return[];this.endpoint=this.endpoints[idx].keyName,this.params=this.endpoints[idx]?.arguments_array??[],console.log(this.endpoint,this.params),this.requestUpdate()};getFormFields=()=>{if(console.log("getFormFields"),this.checkValidity(),!this.isFormValid)return null;const payload={};return this.shadowRoot.querySelectorAll("mwc-textfield, mwc-select, mwc-checkbox, mwc-radio").forEach((field=>{console.log("field",field),"MWC-TEXTFIELD"!==field.tagName&&"MWC-SELECT"!==field.tagName||(payload[field.name]=field.value),"MWC-CHECKBOX"===field.tagName&&(payload[field.name]=field.checked),"MWC-RADIO"===field.tagName&&field.checked&&(payload[field.name]=field.value)})),payload};getFieldTypes=()=>this.params;checkValidity=()=>{const requiredFields=this.shadowRoot.querySelectorAll("[required]"),validFields=[];return requiredFields.forEach((field=>{validFields.push(field.validity.valid)})),this.isFormValid=!validFields.includes(!1),this.isFormValid}}window.customElements.define("dependency-form",DependencyForm);var TrazitCredentialsDialogs=__webpack_require__("./src/components/GenericDialogs/TrazitCredentialsDialogs.js"),dynamicFieldValue=(__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid.js"),__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid-column.js"),__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js"),__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js"),__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js"),__webpack_require__("./node_modules/@doubletrade/lit-datatable/lit-datatable.js"),__webpack_require__("./node_modules/@google-web-components/google-chart/google-chart.js"),__webpack_require__("./src/components/grid_with_buttons/gridCellTooltip.js"),__webpack_require__("./src/components/grid_with_buttons/tableRowDetail.js"),__webpack_require__("./node_modules/@material/mwc-button/mwc-button.js"),__webpack_require__("./src/features/dynamicFieldValue.js"));var until=__webpack_require__("./node_modules/lit/directives/until.js");__webpack_require__("./src/components/DragDropBox/index.js");function DataViews(base){let contextMenu;return class extends((0,dynamicFieldValue.i)(function TrazitTestScriptNewStepDialog(base){return class extends((0,GridFunctions.G)((0,DialogsFunctions.X)(base))){static get properties(){return{}}constructor(){super()}openTestScriptNewStepDialog(actionModel=this.actionBeingPerformedModel){return void 0!==actionModel.dialogInfo&&void 0!==actionModel.dialogInfo.name&&"TESTSCRIPTNEWSTEPDIALOG"===actionModel.dialogInfo.name.toString().toUpperCase()}isFieldDisabled(fld){return void 0!==fld.disabled&&!0===fld.disabled}testScriptNewStepFormDialog(actionModel){void 0===actionModel&&void 0!==(actionModel=this.actionBeingPerformedModel)&&(this.area=actionModel.area);let rowData={};return rowData="SCRIPT_UPDATE_STEP"===this.actionBeingPerformedModel.actionName?this.selectedItems[0]:{},lit.qy`
        <style>
          mwc-textfield {
            border-style: Solid;
            border-color: #999999;
            border-color: rgba(153, 153, 153, 1);
            border-width: 1px;
            border-radius: 7px;
            -moz-border-radius: 7px;
            -webkit-border-radius: 7px;
            font-family: Montserrat;
            font-weight: bold;
            font-size: 19px;
            background-color: #ffffff;
            background-color: rgb(255, 255, 255);
            --mdc-text-field-idle-line-color: #148cfa;
            --mdc-text-field-outlined-idle-border-color: #148cfa;
            --mdc-text-field-label-ink-color: #148cfa;
            --mdc-text-field-focused-label-color: #148cfa;
            --mdc-theme-primary: #0465fb;
          }
          mwc-select {
            --mdc-theme-primary: rgba(36, 192, 235, 1);
            --mdc-theme-text-primary-on-background: rgba(49, 130, 189, 1);
            --mdc-select-ink-color: rgb(47, 47, 47);
            --mdc-select-dropdown-icon-color: rgba(36, 192, 235, 1);
            --mdc-select-hover-line-color: rgba(36, 192, 235, 1);
            --mdc-notched-outline-border-color: rgba(186, 235, 248, 0.4);
            --mdc-select-disabled-dropdown-icon-color: rgba(36, 192, 235, 1);

            font-family: Montserrat;
            font-weight: bold;
            font-size: 19px;
          }
          mwc-select.outlined {
            --mdc-theme-primary: rgba(36, 192, 235, 1);
            --mdc-theme-text-primary-on-background: rgba(49, 130, 189, 1);
            --mdc-select-ink-color: rgba(36, 192, 235, 1);
            font-family: Montserrat;
            font-weight: bold;
            font-size: 19px;
            background-color: #4fcad029;
          }
        </style>
        <tr-dialog
          id="testScriptNewStepDialog"
          heading=""
          hideActions=""
          scrimClickAction=""
          @opened=${()=>{this.defaultValue()}}
          ?open=${this.openTestScriptNewStepDialog(actionModel)}
        >
          <dependency-form
            .lang=${this.lang}
            .endpoints=${this.listTestEndpointsList()}
            .notifications=${this.listTestNotificationsList()}
            .tmpNotifications=${this.listTestNotificationsList()}
            .rowSelectedData=${rowData}
          ></dependency-form>
          <div style="margin-top:30px;text-align:center">
            <sp-button
              size="xl"
              variant="secondary"
              slot="secondaryAction"
              dialogAction="decline"
              @click=${()=>this.declineDialog()}
            >
              ${common_core.k.closeDialogButton["label_"+this.lang]}
            </sp-button>
            <sp-button
              size="xl"
              slot="primaryAction"
              dialogAction="accept"
              @click=${()=>this.acceptedTestDialog(actionModel)}
            >
              ${common_core.k.confirmDialogButton["label_"+this.lang]}
            </sp-button>
          </div>
        </tr-dialog>
      `}addTheDynamicElement(fld){if(void 0===fld.rule||void 0===this.selectedItemInView)return;let selObj=this.selectedItemInView,curValue=selObj[fld.rule.field];if(void 0===curValue)return;0===curValue.length&&(curValue="*NULL*");let matchingEntry=fld.rule.logic.find((entry=>entry.value===curValue));return void 0===matchingEntry&&(curValue.length>0&&(curValue="*NOT_NULL*"),matchingEntry=fld.rule.logic.find((entry=>entry.value===curValue))),void 0!==matchingEntry?"TEXT"===String(matchingEntry.element).toUpperCase()?lit.qy`
          <div class="layout horizontal flex center-center">
            <mwc-textfield
              class="layout flex"
              id="dynamicElement1"
              type="text"
              .value=${fld.default_value?fld.default_value:""}
              label="${this.fieldLabel(fld)}"
              ?disabled=${this.isFieldDisabled(fld)}
              @keypress=${e=>13==e.keyCode&&this.acceptedTestGenericDialog}
            ></mwc-textfield>
          </div>
        `:"LIST"===String(matchingEntry.element).toUpperCase()?(fld.items=[],fld.items=JSON.parse(selObj[fld.rule.field]),lit.qy`
          <div class="layout horizontal flex center-center">
            <mwc-select
              id="dynamicElement1"
              label="${this.fieldLabel(fld)}"
              @selected=${this.valueSelected}
              ?disabled=${this.isFieldDisabled(fld)}
            >
              ${this.listEntries(fld)}</mwc-select
            >
          </div>
        `):lit.qy``:void 0}get testScriptNewStepDialog(){return this.shadowRoot.querySelector("tr-dialog#testScriptNewStepDialog")}get dateDialog(){return this.shadowRoot.querySelector("tr-dialog#dateDialog")}get dateInput(){return this.shadowRoot.querySelector("input#dateInput")}setNewDate(){this.dateInput.value&&this.dialogAccept(!1)}declineDialog=()=>{this.fieldsShouldBeReset=!0,console.log("closedialog"),sessionStorage.setItem("rowSelectedData",{})};acceptedTestDialog(actionModel){console.log("Accepted"),this.fieldsShouldBeReset=!0,this.validationCheck()?this.performActionRequestHavingDialogOrNotForProcess(actionModel):(console.log("Accepted Test Dialog but mandatories pending then action not performed"),alert("mandatories pending"))}async performActionRequestHavingDialogOrNotForProcess(actionModel){const data=this.getDependencyForm().getFormFields(),meta=this.getDependencyForm().getFieldTypes(),fieldNames=meta.map((info=>info.name)),fieldValues=meta.map((info=>{if(Object.keys(data).includes(info.name+"_step")&&Object.keys(data).includes(info.name+"_object_type")&&Object.keys(data).includes(info.name+"_object_posic")){const name={step:data[info.name+"_step"],object_type:data[info.name+"_object_type"],object_posic:data[info.name+"_object_posic"]};return`${JSON.stringify(name)}*${info.type}`}return`${data[info.name]}*${info.type}`}));let actionName=actionModel.actionName,extraParams="&action="+this.getDependencyForm().endpoint;"SCRIPT_UPDATE_STEP"==actionName&&(extraParams=extraParams+"&stepId="+this.selectedItems[0].step_id),extraParams=extraParams+"&scriptId="+this.selectedItem.script_id,extraParams=extraParams+"&fieldName="+fieldNames.join("|"),extraParams=extraParams+"&fieldValue="+fieldValues.join("|"),extraParams=extraParams+"&procInstanceName="+this.procInstanceName,extraParams=extraParams+"&procedureName="+this.procedureName,extraParams=extraParams+"&procedureVersion="+this.procedureVersion,extraParams=extraParams+"&expectedSyntaxis="+data.expectedSyntaxis,extraParams=extraParams+"&expectedNotification="+data.notification;let APIParams=this.getAPICommonParams(actionModel,!0),endPointUrl=this.getActionAPIUrl(actionModel);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);let params=this.config.backendUrl+endPointUrl+"?"+new URLSearchParams(APIParams);console.log("add data Params",JSON.stringify(extraParams)),params+=extraParams,params=params.replace(/\|/g,"%7C"),console.log("add data extraParams",JSON.stringify(extraParams)),await this.fetchApi(params).then((j=>{j&&j.is_error,this.actionOutput=j.json(),this.selectedItem=j.json(),this.selectSectionView(index,!0)})).then((j=>{let mye={};return void 0!==j.is_error&&!0===j.is_error?this.dispatchEvent(new CustomEvent("error",{detail:{...j,log:!0},bubbles:!0,composed:!0})):(mye={is_error:!1,message_en:"Performed with success",message_es:"Ejecutado correctamente"},this.dispatchEvent(new CustomEvent("success",{detail:{...mye,log:!0},bubbles:!0,composed:!0}))),j})).catch((e=>{if("Unexpected end of JSON input"!=e.message)return this.dispatchEvent(new CustomEvent("error",{detail:{...e,log:!0},bubbles:!0,composed:!0})),e;this.dispatchEvent(new CustomEvent("error",{detail:{...e},bubbles:!0,composed:!0}))}))}getDependencyForm(){return this.shadowRoot.querySelector("dependency-form")}validationCheck(){return this.getDependencyForm().checkValidity()}gridActiveItemChanged(){alert("Changed")}defaultValue(e){!0===this.fieldsShouldBeReset&&(this.resetFields(),this.fieldsShouldBeReset=!1);let dlgFlds=this.actionBeingPerformedModel.dialogInfo.fields;if(void 0!==dlgFlds)for(let element of dlgFlds){let fldObj1=element,keyName1=Object.keys(fldObj1);null!==this[keyName1]&&void 0!==this[keyName1].defval&&null!==this[keyName1].defval&&alert(this[keyName1].defval),null!==this[keyName1]&&void 0!==fldObj1[keyName1]&&void 0!==fldObj1[keyName1].default_value&&null!==fldObj1[keyName1].default_value&&(this[keyName1].value=fldObj1[keyName1].default_value),null!==this[keyName1]&&void 0!==fldObj1[keyName1]&&void 0!==fldObj1[keyName1].selObjectPropertyName&&null!==fldObj1[keyName1].selObjectPropertyName&&null!==this[keyName1]&&(this[keyName1].value=this.selectedItems[0][fldObj1[keyName1].selObjectPropertyName]),null!==this[keyName1]&&void 0!==fldObj1[keyName1]&&void 0!==fldObj1[keyName1].internalVariableObjName&&null!==fldObj1[keyName1].internalVariableObjName&&void 0!==fldObj1[keyName1].internalVariableObjProperty&&null!==fldObj1[keyName1].internalVariableObjProperty&&(this[keyName1].value=this[fldObj1[keyName1].internalVariableObjName][0][fldObj1[keyName1].internalVariableObjProperty])}}resetFields(e){let dlgFlds=this.actionBeingPerformedModel.dialogInfo.fields;if(void 0!==dlgFlds)for(const element of dlgFlds){let fldObj1=element,keyName1=Object.keys(fldObj1);null!==this[keyName1]&&(keyName1[0].includes("list")?keyName1[0].includes("SelectedRow")||(this[keyName1[0]].value=[]):void 0!==this[keyName1]&&void 0!==this[keyName1[0]]&&(this[keyName1[0]].value=""))}}valueSelected(e){}scriptStepArguments(fld,data){if(this.isProcManagement=!0,this.moduleName=sessionStorage.getItem("selectedProcedureModuleName"),this.getProcMasterData(),0==Object.values(this.masterData).flatMap((group=>Object.values(group))).filter((item=>item.module_name===this.moduleName)).length)return;let endPointList=this.listTestEndpointsList();const idx=endPointList.findIndex((endpoint=>endpoint.keyName===data.action_name));if(-1===idx)return[];let endpointParams=endPointList[idx]?.arguments_array??[];return lit.qy`
        ${endpointParams.map(((curParam,curParamIdx)=>lit.qy` 
            <span style="color:blue;">${curParam.name}:</span><span style="color:green;">${this.dataArgumentValue(data,curParamIdx)}</span> `))}
        
      `}dataArgumentValue(data,index1){let argFldName="";return argFldName=1==(index1+=1)?"argument_0":"argument_",argFldName+=index1,void 0===data[argFldName]||0===data[argFldName].length?"N/A":data[argFldName]}listTestEndpointsList(){let userSession=JSON.parse(sessionStorage.getItem("userSession"));if(this.isProcManagement=userSession.isProcManagement,void 0===this.isProcManagement||!1===this.isProcManagement)return;let fld={addBlankValueOnTop:!0,valuesFromMasterData:{propertyNameContainer:"modules",filterInFirstLevel:!0,filterPropertyName:"module_name",contextVariableName:"moduleName",propertyNameContainerLevel2:"module_in_solution_actions",propertyKeyName:"endpoint_name",propertyKeyValueEn:"endpoint_name",propertyKeyValueEs:"endpoint_name"}},blankEmpty={keyName:"",keyValue_en:"",keyValue_es:"",arguments_array:[]},newList=[];if(void 0===fld)return[];if(void 0!==fld.addBlankValueOnTop&&!0===fld.addBlankValueOnTop&&newList.push(blankEmpty),void 0!==fld.valuesFromMasterData){let MDentriesArr=this.listTestEntriesFromMasterData(fld.valuesFromMasterData);MDentriesArr.length>0&&MDentriesArr.forEach((item=>newList.push(item)))}else if(void 0!==fld.valuesFromSelectedItem){let MDentriesArr=this.listTestEntriesFromSelectedItem(fld.valuesFromSelectedItem);MDentriesArr.length>0&&MDentriesArr.forEach((item=>newList.push(item)))}else fld.items.forEach((item=>newList.push(item)));return void 0!==fld.addBlankValueAtBottom&&!0===fld.addBlankValueAtBottom&&newList.push(blankEmpty),newList}listTestNotificationsList(){let userSession=JSON.parse(sessionStorage.getItem("userSession"));if(this.isProcManagement=userSession.isProcManagement,void 0===this.isProcManagement||!1===this.isProcManagement)return;let fld={addBlankValueOnTop:!0,valuesFromMasterData:{propertyNameContainer:"modules",filterInFirstLevel:!0,filterPropertyName:"module_name",contextVariableName:"moduleName",propertyNameContainerLevel2:"module_error_notifications",propertyKeyName:"error_code",propertyKeyValueEn:"error_code",propertyKeyValueEs:"error_code"}},blankEmpty={keyName:"",keyValue_en:"",keyValue_es:"",arguments_array:[]},newList=[];if(void 0===fld)return[];if(void 0!==fld.addBlankValueOnTop&&!0===fld.addBlankValueOnTop&&newList.push(blankEmpty),void 0!==fld.valuesFromMasterData){let MDentriesArr=this.listTestEntriesFromMasterData(fld.valuesFromMasterData);MDentriesArr.length>0&&MDentriesArr.forEach((item=>newList.push(item)))}else if(void 0!==fld.valuesFromSelectedItem){let MDentriesArr=this.listTestEntriesFromSelectedItem(fld.valuesFromSelectedItem);MDentriesArr.length>0&&MDentriesArr.forEach((item=>newList.push(item)))}else fld.items.forEach((item=>newList.push(item)));return void 0!==fld.addBlankValueAtBottom&&!0===fld.addBlankValueAtBottom&&newList.push(blankEmpty),newList}listEntriesForUom(fld,fldName){console.log("listEntriesForUom");let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:""},defValue="",newList=[];if(void 0===fld)return lit.qy`<mwc-list-item></mwc-list-item>`;if(void 0!==fld.addBlankValueOnTop&&!0===fld.addBlankValueOnTop&&newList.push(blankEmpty),void 0!==fld.the_default_value){if(void 0!==fld.the_default_value.default_value&&null!==fldObj[keyName].default_value&&(blankEmpty={keyName:fld.the_default_value.default_value,keyValue_en:fld.the_default_value.default_value,keyValue_es:fld.default_value.default_value},newList.push(blankEmpty)),void 0!==fld.the_default_value.selObjectPropertyName&&null!==fld.the_default_value.selObjectPropertyName){let val="";void 0!==this.selectedItems&&this.selectedItems.length>0&&(val=this.selectedItems[0][fld.the_default_value.selObjectPropertyName],val.split("|").forEach((item=>{const blankEmpty={keyName:item,keyValue_en:item,keyValue_es:item},isDuplicate=newList.some((item=>item.keyName===item));isDuplicate||(null!==this[fldName]&&0===this[fldName].value.length&&(defValue=item,this[fldName].value=item),newList.push(blankEmpty))})))}if(void 0!==fld.the_default_value.internalVariableObjName&&null!==fld.the_default_value.internalVariableObjName&&void 0!==fld.internalVariableObjProperty&&null!==fld.internalVariableObjProperty){let val=this[fld.the_default_value.internalVariableObjName][0][fld.internalVariableObjProperty];blankEmpty={keyName:val,keyValue_en:val,keyValue_es:val},newList.some((item=>item.keyName===val))||newList.push(blankEmpty)}}if(void 0!==fld.list_values&&(void 0!==fld.list_values.default_value&&null!==fldObj[keyName].default_value&&(blankEmpty={keyName:fld.list_values.default_value,keyValue_en:fld.list_values.default_value,keyValue_es:fld.list_values.default_value},newList.push(blankEmpty)),void 0!==fld.list_values.selObjectPropertyName&&null!==fld.list_values.selObjectPropertyName&&this.selectedItems[0][fld.list_values.selObjectPropertyName].split("|").forEach((item=>{const blankEmpty={keyName:item,keyValue_en:item,keyValue_es:item},isDuplicate=newList.some((item=>item.keyName===item));isDuplicate||newList.push(blankEmpty)})),void 0!==fld.list_values.internalVariableObjName&&null!==fld.list_values.internalVariableObjName&&void 0!==fld.internalVariableObjProperty&&null!==fld.internalVariableObjProperty)){let val=this[fld.list_values.internalVariableObjName][0][fld.internalVariableObjProperty];blankEmpty={keyName:val,keyValue_en:val,keyValue_es:val},newList.some((item=>item.keyName===val))||newList.push(blankEmpty)}return lit.qy`
        ${newList.map(((c,i)=>lit.qy`<mwc-list-item
              value="${c.keyName}"
              defval="${defValue}"
              ?selected=${void 0!==fld.addBlankValueOnTop&&!0===fld.addBlankValueOnTop&&void 0!==fld.default_value?1==i:0==i}
              >${c["keyValue_"+this.lang]}</mwc-list-item
            >`))}
      `}getProcMasterData(){if(void 0===this.isProcManagement||!0!==this.isProcManagement){let userSession=JSON.parse(sessionStorage.getItem("userSession"));console.log("userSession.procedures_list.procedures",userSession.procedures_list.procedures);let findProc=[];findProc=void 0!==this.area?userSession.procedures_list.procedures.filter((m=>m.procInstanceName==this.area)):userSession.procedures_list.procedures.filter((m=>m.procInstanceName==this.procInstanceName)),void 0!==findProc&&findProc.length>0&&void 0!==findProc[0].master_data&&(this.masterData=findProc[0].master_data,console.log("master data",this.masterData))}else{let userSession=JSON.parse(sessionStorage.getItem("userSession"));this.masterData=userSession.proc_management_masterdata}}listTestEntriesFromMasterData(fldMDDef){return this.isProcManagement=!0,this.getProcMasterData(),this.buildTestFrontListFromData(fldMDDef,this.masterData)}listTestEntriesFromSelectedItem(fldMDDef){let data=[];null!==fldMDDef&&void 0!==fldMDDef.defval&&null!==fldMDDef.defval&&alert(fldMDDef.defval),null!=fldMDDef&&void 0!==fldMDDef.default_value&&null!==fldMDDef.default_value&&(data=fldMDDef.default_value),null!=fldMDDef&&void 0!==fldMDDef.selObjectPropertyName&&null!==fldMDDef.selObjectPropertyName&&null!==fldMDDef&&(data=this.selectedItems[0][fldMDDef.selObjectPropertyName]),null!=fldMDDef&&void 0!==fldMDDef.internalVariableObjName&&null!==fldMDDef.internalVariableObjName&&void 0!==fldMDDef.internalVariableObjProperty&&null!==fldMDDef.internalVariableObjProperty&&(data=this[fldMDDef.internalVariableObjName][0][fldMDDef.internalVariableObjProperty]),null!=fldMDDef&&void 0!==fldMDDef.internalVariableSingleObjName&&null!==fldMDDef.internalVariableSingleObjName&&void 0!==fldMDDef.internalVariableSingleObjProperty&&null!==fldMDDef.internalVariableSingleObjProperty&&(data=this[fldMDDef.internalVariableSingleObjName][fldMDDef.internalVariableSingleObjProperty]);let entries1=[];return void 0!==data&&data.forEach((item=>{console.log("item",item,"fldMDDef.propertyNameContainer.propertyKeyName",fldMDDef.propertyKeyName);let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:""};blankEmpty.keyName=item[fldMDDef.propertyKeyName];let valEn="";fldMDDef.propertyKeyValueEn.forEach((item2=>{valEn.length>0&&(valEn+="-"),valEn+=item[item2]})),blankEmpty.keyValue_en=valEn;let valEs="";fldMDDef.propertyKeyValueEn.forEach((item2=>{valEs.length>0&&(valEs+="-"),valEs+=item[item2]})),blankEmpty.keyValue_es=valEs,console.log("blankEmpty",blankEmpty),entries1.push(blankEmpty)})),entries1}buildTestFrontListFromData(fldMDDef,data){if(void 0===data)return[];if(null==fldMDDef&&(void 0===this.actionBeingPerformedModel.dialogInfo||void 0===this.actionBeingPerformedModel.dialogInfo.name||"TESTSCRIPTNEWSTEPDIALOG"!==this.actionBeingPerformedModel.dialogInfo.name.toString().toUpperCase()))return!1;let userSession=JSON.parse(sessionStorage.getItem("userSession"));if(this.isProcManagement=userSession.isProcManagement,void 0===this.isProcManagement||!1===this.isProcManagement)return;let entries1=[];if(void 0===data[fldMDDef.propertyNameContainer])return alert("Property "+fldMDDef.propertyNameContainer+" not found in Master Data"),entries1;if(void 0!==fldMDDef.filterInFirstLevel&&!0===fldMDDef.filterInFirstLevel){let filterValue;void 0!==fldMDDef.propertyNameContainerLevelfixValue?filterValue=fldMDDef.propertyNameContainerLevelfixValue:void 0!==fldMDDef.elementName?filterValue=this[fldMDDef.elementName].value:void 0!==fldMDDef.contextVariableName?filterValue=this[fldMDDef.contextVariableName]:void 0!==fldMDDef.internalVariableSimpleObjName&&void 0!==fldMDDef.internalVariableSimpleObjProperty&&(filterValue=this[fldMDDef.internalVariableSimpleObjName][fldMDDef.internalVariableSimpleObjProperty]);let filterPropertyName="name";if(void 0!==fldMDDef.filterPropertyName&&(filterPropertyName=fldMDDef.filterPropertyName),void 0===filterValue)return entries1;let result=data[fldMDDef.propertyNameContainer].find((item=>item[filterPropertyName]===filterValue));return void 0===result||result[fldMDDef.propertyNameContainerLevel2].forEach((item=>{let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:"",arguments_array:[]};blankEmpty.keyName=item[fldMDDef.propertyKeyName],blankEmpty.keyValue_en=void 0!==item[fldMDDef.propertyKeyValueEn]?item[fldMDDef.propertyKeyValueEn]:item[fldMDDef.propertyKeyName],blankEmpty.keyValue_es=void 0!==item[fldMDDef.propertyKeyValueEs]?item[fldMDDef.propertyKeyValueEs]:item[fldMDDef.propertyKeyName],blankEmpty.arguments_array=item.arguments_array,entries1.push(blankEmpty)})),entries1}return data[fldMDDef.propertyNameContainer].forEach((item=>{let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:"",arguments_array:[]};blankEmpty.keyName=item[fldMDDef.propertyKeyName],blankEmpty.keyValue_en=void 0!==item[fldMDDef.propertyKeyValueEn]?item[fldMDDef.propertyKeyValueEn]:item[fldMDDef.propertyKeyName],blankEmpty.keyValue_es=void 0!==item[fldMDDef.propertyKeyValueEs]?item[fldMDDef.propertyKeyValueEs]:item[fldMDDef.propertyKeyName],blankEmpty.arguments_array=item.arguments_array,entries1.push(blankEmpty)})),entries1}getListInLevel3(fldMDDef,level2Arr){level2Arr.filter((p=>p[propertyNameContainerLevel2PropertyKeyName]==fldMDDef.propertyNameContainerLevel2fixValue))[fldMDDef.propertyNameContainerLevel3].forEach((item=>{console.log("item",item,"fldMDDef.propertyNameContainer.propertyKeyName",fldMDDef.propertyNameContainerLevel2PropertyKeyName);let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:""};blankEmpty.keyName=item[fldMDDef.propertyKeyName],blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn],blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs],console.log("blankEmpty",blankEmpty),entries.push(blankEmpty)}))}fldDisabled(){return!1}fieldLabel(fld){let fldLbl=fld["label_"+this.lang];return void 0!==fld.optional&&!1!==fld.optional||(fldLbl="* "+fldLbl),fldLbl}get text1(){return this.shadowRoot.querySelector("mwc-textfield#text1")}get text2(){return this.shadowRoot.querySelector("mwc-textfield#text2")}get text3(){return this.shadowRoot.querySelector("mwc-textfield#text3")}get text4(){return this.shadowRoot.querySelector("mwc-textfield#text4")}get text5(){return this.shadowRoot.querySelector("mwc-textfield#text5")}get text6(){return this.shadowRoot.querySelector("mwc-textfield#text6")}get text7(){return this.shadowRoot.querySelector("mwc-textfield#text7")}get text8(){return this.shadowRoot.querySelector("mwc-textfield#text8")}get text9(){return this.shadowRoot.querySelector("mwc-textfield#text9")}get text10(){return this.shadowRoot.querySelector("mwc-textfield#text10")}get checkbox1(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox1")}get checkbox2(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox2")}get checkbox3(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox3")}get checkbox4(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox4")}get checkbox5(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox5")}get checkbox6(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox6")}get checkbox7(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox7")}get checkbox8(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox8")}get checkbox9(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox9")}get checkbox10(){return this.shadowRoot.querySelector("mwc-checkbox#checkbox10")}get date1(){return this.shadowRoot.querySelector("mwc-textfield#date1")}get date2(){return this.shadowRoot.querySelector("mwc-textfield#date2")}get date3(){return this.shadowRoot.querySelector("mwc-textfield#date3")}get date4(){return this.shadowRoot.querySelector("mwc-textfield#date4")}get date5(){return this.shadowRoot.querySelector("mwc-textfield#date5")}get date6(){return this.shadowRoot.querySelector("mwc-textfield#date6")}get date7(){return this.shadowRoot.querySelector("mwc-textfield#date7")}get date8(){return this.shadowRoot.querySelector("mwc-textfield#date8")}get date9(){return this.shadowRoot.querySelector("mwc-textfield#date9")}get date10(){return this.shadowRoot.querySelector("mwc-textfield#date10")}get datetime1(){return this.shadowRoot.querySelector("input#datetime1")}get datetime2(){return this.shadowRoot.querySelector("input#datetime2")}get datetime3(){return this.shadowRoot.querySelector("input#datetime3")}get datetime4(){return this.shadowRoot.querySelector("input#datetime4")}get datetime5(){return this.shadowRoot.querySelector("input#datetime5")}get datetime6(){return this.shadowRoot.querySelector("input#datetime6")}get datetime7(){return this.shadowRoot.querySelector("input#datetime7")}get datetime8(){return this.shadowRoot.querySelector("input#datetime8")}get datetime9(){return this.shadowRoot.querySelector("input#datetime9")}get datetime10(){return this.shadowRoot.querySelector("input#datetime10")}get daterange1dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange1dateStart")}get daterange1dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange1dateEnd")}get daterange2dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange2dateStart")}get daterange2dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange2dateEnd")}get daterange3dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange3dateStart")}get daterange3dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange3dateEnd")}get daterange4dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange4dateStart")}get daterange4dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange4dateEnd")}get daterange5dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange5dateStart")}get daterange5dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange5dateEnd")}get number1(){return this.shadowRoot.querySelector("mwc-textfield#number1")}get number2(){return this.shadowRoot.querySelector("mwc-textfield#number2")}get number3(){return this.shadowRoot.querySelector("mwc-textfield#number3")}get number4(){return this.shadowRoot.querySelector("mwc-textfield#number4")}get number5(){return this.shadowRoot.querySelector("mwc-textfield#number5")}get number6(){return this.shadowRoot.querySelector("mwc-textfield#number6")}get number7(){return this.shadowRoot.querySelector("mwc-textfield#number7")}get number8(){return this.shadowRoot.querySelector("mwc-textfield#number8")}get number9(){return this.shadowRoot.querySelector("mwc-textfield#number9")}get number10(){return this.shadowRoot.querySelector("mwc-textfield#number10")}get list1(){return this.shadowRoot.querySelector("mwc-select#list1")}get list2(){return this.shadowRoot.querySelector("mwc-select#list2")}get list3(){return this.shadowRoot.querySelector("mwc-select#list3")}get list4(){return this.shadowRoot.querySelector("mwc-select#list4")}get list5(){return this.shadowRoot.querySelector("mwc-select#list5")}get list6(){return this.shadowRoot.querySelector("mwc-select#list6")}get list7(){return this.shadowRoot.querySelector("mwc-select#list7")}get list8(){return this.shadowRoot.querySelector("mwc-select#list8")}get list9(){return this.shadowRoot.querySelector("mwc-select#list9")}get list10(){return this.shadowRoot.querySelector("mwc-select#list10")}get list1SelectedRow(){return this.shadowRoot.querySelector("mwc-select#list1SelectedRow")}get list2SelectedRow(){return this.shadowRoot.querySelector("mwc-select#list2SelectedRow")}get list3SelectedRow(){return this.shadowRoot.querySelector("mwc-select#list3SelectedRow")}get listMDprocedureUsers(){return this.shadowRoot.querySelector("mwc-select#listMDprocedureUsers")}get listMDSamplerPersonalAreas(){return this.shadowRoot.querySelector("mwc-select#listMDSamplerPersonalAreas")}get listMDvariablesSet(){return this.shadowRoot.querySelector("mwc-select#listMDvariablesSet")}get listMDvariables(){return this.shadowRoot.querySelector("mwc-select#listMDvariables")}get listSelectedStudyIndividuals(){return this.shadowRoot.querySelector("mwc-select#listSelectedStudyIndividuals")}get listSelectedStudyIndividualSamples(){return this.shadowRoot.querySelector("mwc-select#listSelectedStudyIndividualSamples")}get dynamicElement1(){return this.shadowRoot.querySelector("#dynamicElement1")}setNumberMask(e,fieldDef){if(void 0!==fieldDef.min_allowed&&"number"==typeof fieldDef.min_allowed&&e.target.value<fieldDef.min_allowed)return e.target.value=fieldDef.min_allowed,void(this[e.currentTarget.id].value=fieldDef.min_allowed);if(void 0!==fieldDef.max_allowed&&"number"==typeof fieldDef.max_allowed&&e.target.value>fieldDef.max_allowed)return e.target.value=fieldDef.max_allowed,void(this[e.currentTarget.id].value=fieldDef.max_allowed);if(void 0!==fieldDef.max_dp){let v=e.target.value.split(".");v.length>1&&v[1].length>fieldDef.max_dp&&(v[1]=v[1].substring(0,fieldDef.max_dp),e.target.value=Number(v.join(".")),this[e.currentTarget.id].value=Number(v.join(".")))}}fldDefaultValue(fldDef){let curArgName="";if(fldDef.default_value)return fldDef.default_value;if(fldDef.internalVariableSimpleObjName&&fldDef.internalVariableSimpleObjProperty){if(void 0===this[fldDef.internalVariableSimpleObjName]||void 0===this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]){let msg="";return void 0===this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]?(msg="The object "+fldDef.internalVariableSimpleObjName+" has no one property called "+fldDef.internalVariableSimpleObjProperty,alert(msg)):(msg="there is no object called "+fldDef.internalVariableSimpleObjName+" in this view",alert(msg)),"ERROR: "+msg}return this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]}if(fldDef.internalVariableObjName&&fldDef.internalVariableObjProperty){if(void 0===this[fldDef.internalVariableObjName]||void 0===this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]){let msg="";return void 0===this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]?(msg="The object "+fldDef.internalVariableObjName+" has no one property called "+fldDef.internalVariableObjProperty,alert(msg)):(msg="there is no object called "+fldDef.internalVariableObjName+" in this view",alert(msg)),"ERROR: "+msg}return this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]}return fldDef.element?void 0:fldDef.defaultValue?void 0!==fldDef.isAdhocField&&!0===fldDef.isAdhocField?(curArgName=jsonParam[fldDef.argumentName],void 0===curArgName&&(curArgName=""),curArgName.length>0&&(curArgName+="|"),curArgName+=fldDef.defaultValue,void 0!==fldDef.fieldType&&(curArgName=curArgName+"*"+fldDef.fieldType),curArgName):fldDef.defaultValue:fldDef.selObjectPropertyName?selObject[fldDef.selObjectPropertyName]:fldDef.targetValue?targetValue[fldDef.argumentName]:fldDef.fixValue?fldDef.fixValue:fldDef.contextVariableName?this[fldDef.contextVariableName]:""}}}(function ReadOnlyTableParts(base){let contextMenu;return class extends((0,dynamicFieldValue.i)((0,GridFunctions.G)((0,ButtonsFunctions.n)(base)))){popupFilterElement(elem,dataArr){elem.filterElements=[{name:"lot_name",type:"text"},{name:"references",type:"multilist","list properties":"blablabla"}]}applyFilter(elem,dataArr){}setupReadOnlyTable(elem,dataArr,isSecondLevel,directData,theme,parentData){if(void 0===elem)return;this.selectedItemInView;let tmp="";tmp=void 0===elem.theme?"TRAZiT-UsersArea":elem.theme,"procedure_user_requirements_tree_child"==elem.endPointResponseObject&&(tmp=sessionStorage.getItem("tableTheme")),void 0!==tmp&&sessionStorage.setItem("tableTheme",tmp),void 0===tmp&&(tmp="TRAZiT-UsersArea",sessionStorage.setItem("tableTheme",tmp));const endPointResponseObject=elem.endPointResponseObject,selectedIdx=this.selectedTableIndex[endPointResponseObject];void 0===isSecondLevel&&(isSecondLevel=!1),dataArr=void 0!==directData?directData:this.getDataFromRoot(elem,dataArr);let cleanArr=[];return this.dataContainsRequiredProperties(elem,dataArr)&&void 0!==dataArr&&Array.isArray(dataArr)?(dataArr.length>0&&dataArr[0].action_name&&sessionStorage.setItem("steps",JSON.stringify(dataArr)),{theme,dataArr,tmp,selectedIdx}):{theme,dataArr:cleanArr,tmp,selectedIdx}}prepareTableData(elem,dataArr,directData){return dataArr}getTableStyles(elem){return lit.qy`
            <style>
            * {
              box-sizing: border-box;
            }
  
            .title {
              color: #2989d8;
              font-size: 18px;
              font-weight: bold;
            }
  
            table.TRAZiT-DefinitionArea-table1 thead tr th {
              background-color: #2989d8;
              color: white;
            }
  
            table.TRAZiT-UsersArea thead tr th {
              background-color: #b6d6f3;
              color: rgb(0 0 0 / 55%);
              font-size: 16px;
              font-family: Montserrat;
            }
  
            table {
              border-collapse: collapse;
              width: 100%;
              font-family: Montserrat;
              font-size: 16px;
              border solid 1px rgba(78, 162, 240, 0.69);
            }
  
            table.TRAZiT-UsersArea tr {
              border: solid 1px rgba(78, 162, 240, 0.69); 
              border-bottom: 1px solid #dddddd;
            }
  
            tr {
              border: 1px solid #dddddd;
              text-align: center;
              color: #808080;
            }
  
            table.TRAZiT-UsersArea tr:nth-child(even) {
              /* background-color: white; */
            }
  
            table.TRAZiT-UsersArea tr:last-child {
              /* border: none; */
            }
         
            table.TRAZiT-UsersArea thead {
              border-bottom: 1px solid #dddddd;
            }
  
            tr:nth-child(even) {
              background-color: rgba(214, 233, 248, 0.37);
            }
  
            table.TRAZiT-DefinitionArea th {
              padding: 5px 5px;
              border: 1px solid #dddddd !important;
            }
  
            td, th {
              padding: 5px 5px;
              border: 1px solid #dddddd !important;
            }
  
            table.TRAZiT-UsersArea td, th {
              border: none !important;
            }
  
            tr {
              cursor: pointer;
            }
  
            table#${elem.endPointResponseObject} tr:hover td {
              background-color: #2989d830 !important;
            }
  
            mwc-icon-button {
              --mdc-icon-button-size: 35px;
              --mdc-icon-size: 25px;
            }
  
            .hidden {
              display: none;
            }
            .selected {
              background: linear-gradient(45deg, #54ccef6e, #03a9f400);
              /* background-color: #148cfa36 !important; */
            }
  
            .js-context-popup {
              background-color: #24C0EB;
              color: white;
              width: 130px;
              position: fixed;
              z-index: 10;
              display:none;
            }
            .js-context-popup div {
              padding: 8px 12px;
              border: 2px solid #03A9F4;
              cursor: pointer;
            }
            .js-context-popup div:first-child {
              border-botton: none !important;
            }
  
            .circle {
              width: 20px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              background-color: #24C0EB;
              border-radius: 50%;
              color: white;
              float: left;
            }
            .green {
              color: green;
            }
            .red { 
              color: red;
            }
            .yellow {
              color: orange;
            }
            span.title {
                color: rgb(35, 163, 198);
                margin-top: 10px;
                font-weight: bold;
            }
            span.title.true {
                font-size: 18px;
            }
            span.title.false {
                font-size: 18px;
            }  
            .w3-responsive {
                display: block;
                overflow-x: auto;
              }
              .w3-container,
              .w3-panel {
                padding: 0.01em 4px;
              }
              .w3-panel {
                margin-top: 16px;
                margin-bottom: 16px;
              }
              .w3-container:after,
              .w3-container:before,
              .w3-panel:after,
              .w3-panel:before,
              .w3-row:after,
              .w3-row:before,
              .w3-row-padding:after,
              .w3-row-padding:before,
              .w3-blue,
              .w3-hover-blue:hover {
                color: rgba(
                  7,
                  13,
                  22,
                  0.94
                ) !important;
                background-color: #2196f3 !important;
              }
              .w3-background,
              .w3-hover-blue:hover {
                color: rgba(
                  7,
                  13,
                  22,
                  0.94
                ) !important;
                background-color: #ffdedd !important;
              }
              .title {
                font-size: 8px;
                font-weight: 500;
                letter-spacing: 0;
                line-height: 1.5em;
                padding-bottom: 15px;
                position: relative;
                font-family: Montserrat;
                font-color: rgb(
                  94,
                  145,
                  186
                );
              }                      
            </style>
              
            `}createTableHeader(elem,parentElement,lang,selectedIdx,handleResetParentFilter){return lit.qy`
                <thead>
                <tr>
                ${elem.columns.map(((fld1,idx)=>0===idx&&null!=parentElement?lit.qy` 
                        <th>
                            <mwc-icon-button 
                            class="icon resetBtn" 
                            icon="refresh" 
                            @click=${()=>handleResetParentFilter(parentElement)}
                            ></mwc-icon-button>

                            ${fld1["label_"+lang]} <span class="resize-handle"></span>
                        </th>
                        `:lit.qy` <th>${fld1["label_"+lang]} <span class="resize-handle"></span></th>`))}
                ${void 0===elem.row_buttons?lit.qy`<th></th>`:lit.qy`
                    <th>
                        ${"en"===lang?"Actions":"Acciones"} 
                        <span class="resize-handle"></span>
                    </th>
                    `}
                </tr>
                </thead>    
            `}_toggleDetail(e,index){e.stopPropagation();const detailElement=this.shadowRoot.querySelector(`#detail${index}`);detailElement?detailElement.toggle():console.error(`Element with id 'detail${index}' not found`)}addViewTitle(elem,alternativeTitle,isSecondLevel){return lit.qy`                
                ${void 0!==alternativeTitle?lit.qy`
                    <p>
                        <span class="title ${isSecondLevel}"
                        >${alternativeTitle}</span
                        >
                    </p>`:lit.qy`
                    ${void 0===elem||void 0===elem.title?lit.s6:lit.qy` <p><span class="title ${isSecondLevel}">${elem.title["label_"+this.lang]}</span></p>`}
                `}  
            `}getActionsButtons(elem,dataArr,selectedItems){return lit.qy`
                <div class="layout horizontal center flex wrap">
                    ${this.getButton(elem,dataArr,selectedItems,!0)}
                </div>
            `}dataContainsRequiredProperties(elem,dataArr){return void 0!==dataArr&&(void 0===elem.mantadoryPropertiesInVariableName||elem.mantadoryPropertiesInVariableName.every((curProp=>Array.isArray(dataArr)?void 0!==dataArr[0]&&void 0!==dataArr[0][curProp]:void 0!==dataArr[curProp])))}renderTable(elem,header,body,styles,title,actionButtons,tmp){return lit.qy`${styles} ${title} ${actionButtons} 
            <div style="display: flex; flex-direction: row; text-align: center; align-items: baseline;">
            <div style="display: flex; flex-direction: column; text-align: center;">  
            <table id=${elem.endPointResponseObject} class="styled-table read-only ${tmp}">
                ${header} 
                ${void 0===elem.columns?lit.qy`${void 0!==elem.hideNoDataMessage&&elem.hideNoDataMessage?"":"No columns defined"}`:lit.qy`
                ${body} 
            `}            
            </table>
            </div>
            </div>    
            `}createTableBody(elem,dataArr,lang,selectedIdx,handler,handleTableRowClick,parentData){return lit.qy`
                <tbody>
                    <div class="js-context-popup"></div>
                    ${void 0!==dataArr&&Array.isArray(dataArr)?lit.qy`${this.tableBodyHavingData(elem,dataArr,lang,selectedIdx,handler,handleTableRowClick,parentData)}`:lit.qy`No Data`}
                </tbody>
            `}handleKeyDown(event){"Escape"===event.key&&(contextMenu.style.display="none")}handleOpenContextMenu(event,rowSelected,elem){console.log("elem",elem),event.preventDefault();const popup=this.shadowRoot.querySelector(".js-context-popup");contextMenu=popup,popup.innerHTML="";let menuOptionsArr=[];void 0!==elem.rowButtonsAsContextMenu&&!0===elem.rowButtonsAsContextMenu?menuOptionsArr=elem.row_buttons:void 0!==elem.contextmenu_buttons&&(menuOptionsArr=elem.contextmenu_buttons),menuOptionsArr.map(((item,i)=>{let newIcon=document.createElement("mwc-icon-button");newIcon.setAttribute("icon",item.button.icon),newIcon.style.color="white";let newLabel=document.createElement("label");newLabel.textContent=item.button.title["label_"+this.lang];let newDiv=document.createElement("div");newDiv.style.display="flex",newDiv.style.flexDirection="row",newDiv.style.alignItems="center",newDiv.style.cursor="pointer",newDiv.appendChild(newIcon),newDiv.appendChild(newLabel),newDiv.addEventListener("click",(e=>this.actionMethod(e,item,menuOptionsArr,null,null,rowSelected,!1))),popup.appendChild(newDiv)})),popup.addEventListener("click",(()=>this.contextMenuItemAction(popup))),popup.style.left=`${event.clientX}px`,popup.style.top=`${event.clientY}px`,popup.style.display="flex",popup.style.flexDirection="column",document.body.addEventListener("click",this.closeContextMenu)}closeContextMenu(e){contextMenu.style.display="none"}contextMenuItemAction(e){e.style.display="none"}tableBodyHavingData(elem,dataArr,lang,selectedIdx,handler,handleRowClk,parentData){return lit.qy`
                ${dataArr.map(((curRow,idx)=>lit.qy`
                  <tr
                    @click=${event=>{handler&&dataArr[elem.children]&&dataArr[elem.children].length>0&&(void 0!==elem.openWhenNoData&&!1!==elem.openWhenNoData||handler(event,curRow,elem,idx)),this.handleTableRowClick(event,curRow,elem)}}
                    @contextmenu=${event=>this.handleOpenContextMenu(event,curRow,elem)}
                    class="${selectedIdx===idx?"selected":void 0!==selectedIdx?"hidzzzden":""}"
                >                
                ${elem.columns.map(((fld1,index)=>lit.qy`
                    <td>
                        ${void 0!==fld1.tooltip?lit.qy`
                            <grid-cell-tooltip lang="${lang}" .element="${fld1}" .data="${curRow}">                        
                                ${this.cellContentController(elem,fld1,curRow,lang,index)}                    
                            </grid-cell-tooltip>
                        `:lit.qy`
                            ${this.cellContentController(elem,fld1,curRow,lang,index)}
                        `}
                    </td>
                    `))}
                ${this.generateRowButtons(elem,fld,curRow,parentData,idx,handler,lang)}
                </tr>
                `))}
            `}cellContentController(elem,fld1,data,lang,columnIndex,rowIndex){let applyOther=!0;return(void 0!==fld1.edit&&!0===fld1.edit||"pretty_spec"===fld1.name||"reportTitle"===fld1.name||void 0!==fld1.is_tag_list&&!0===fld1.is_tag_list||void 0!==fld1.as_progress&&!0===fld1.as_progress||void 0!==fld1.is_icon&&!0===fld1.is_icon||void 0!==fld1.as_paragraph&&!0===fld1.as_paragraph)&&(applyOther=!1),lit.qy`
            ${void 0!==fld1.edit&&!0===fld1.edit?lit.qy`
                ${this.cellEditNumeric(fld1,data,lang,columnIndex,rowIndex)}
            `:lit.qy`
                ${"pretty_spec"===fld1.name==="reportTitle"?this.cellIsPrettySpec(fld1,data,lang):lit.s6}
                ${void 0!==fld1.is_tag_list&&!0===fld1.is_tag_list?this.cellIsTagList(fld1,data,lang):lit.s6}
                ${void 0!==fld1.as_progress&&!0===fld1.as_progress?this.cellIsAsProgress(fld1,data,lang):lit.s6}
                ${void 0!==fld1.as_paragraph&&!0===fld1.as_paragraph?this.cellIsParagraph(fld1,data,lang):lit.s6}
                ${void 0!==fld1.is_icon&&!0===fld1.is_icon?this.cellIsIcon(fld1,data,columnIndex):lit.s6}
                ${!0===applyOther?this.cellIsOther(elem,fld1,data,lang,columnIndex):lit.s6}
            `}
            `}cellEditNumeric(fld1,data,lang,columnIndex,rowIndex){const id=`col_${columnIndex}_row_${rowIndex}`;return lit.qy`
            <input class="enterResultVal" id="${id}" 
              type="number" 
              .step=${void 0!==fld1.step?fld1.step:""} 
              .min=${void 0!==fld1.min?fld1.min:""} 
              .max=${void 0!==fld1.max?fld1.max:""} 
              .value=${data[fld1.name]} 
              @input=${e=>this.cellEditSetValidVal(e,data)}
              @keydown=${e=>this.cellEditOnKeyDown(e,fld1,columnIndex,rowIndex,data)}
              @paste=${e=>this.cellEditOnPaste(e,fld1,columnIndex,rowIndex,data)}>          
          `}cellEditOnPaste(event,fld1,columnIndex,rowIndex,data){event.preventDefault();const pastedData=(event.clipboardData||window.clipboardData).getData("Text");console.log("Pasted data:",pastedData);const rows=pastedData.split("\n").filter((row=>""!==row.trim()));console.log("Rows:",rows),rows.forEach(((row,index)=>{const nextInputId=`col_${columnIndex}_row_${rowIndex+index}`;console.log(`Processing input ID: ${nextInputId}`);const nextInput=this.shadowRoot.querySelector(`#${nextInputId}`);if(nextInput){const currentValue=nextInput.value.trim(),newValue=row.trim();""!==currentValue?confirm(`The cell ${nextInputId} is not empty. Replace "${currentValue}" with "${newValue}"?`)?(console.log(`Replacing value in ${nextInputId}:`,newValue),nextInput.value=newValue,this.cellEditSetValidVal(event,data),this.trazitButtonsMethod(event,!0,fld1.action,!0,1,event.target,data),this.cellEditMoveToNextRow(columnIndex,rowIndex)):console.log(`Keeping existing value in ${nextInputId}:`,currentValue):(console.log(`Setting value in empty cell ${nextInputId}:`,newValue),nextInput.value=newValue,this.cellEditSetValidVal(event,data),this.trazitButtonsMethod(event,!0,fld1.action,!0,1,event.target,data),this.cellEditMoveToNextRow(columnIndex,rowIndex))}else console.warn(`Next input with ID ${nextInputId} not found`)}))}cellEditSetValidVal(event,data){const value=event.target.value;console.log("Validating and setting value:",value)}cellEditOnKeyDown(event,fld1,columnIndex,rowIndex,data){"Enter"!==event.key&&"Enter"!==event.code||(event.preventDefault(),this.cellEditHandleKeyDown(event,fld1,columnIndex,rowIndex,data))}cellEditHandleKeyDown(event,fld1,columnIndex,rowIndex,data){this.trazitButtonsMethod(event,!0,fld1.action,!0,1,event.target,data),this.cellEditMoveToNextRow(columnIndex,rowIndex)}cellEditMoveToNextRow(columnIndex,rowIndex){const nextInputId=`#col_${columnIndex}_row_${rowIndex+1}`;let nextInput=this.shadowRoot.querySelector(nextInputId);nextInput?nextInput.focus():setTimeout((()=>{nextInput=this.shadowRoot.querySelector(nextInputId),nextInput&&nextInput.focus()}),100)}cellIsPrettySpec(fld1,data,lang){return lit.qy`   cellIsPrettySpec             
                    <span style="color:green">${data["spec_text_green_area_"+lang]}</span>
                    <span style="color:orange">${data["spec_text_yellow_area_"+lang]}</span>
                    <span style="color:red">${data["spec_text_red_area_"+lang]}</span>         
            `}cellIsTagList(fld1,data){return lit.qy` 
                <multi-select .label=${{}} 
                    .props=${void 0!==fld1.properties?fld1.properties:{readOnly:!0,displayLabel:!1}} 
                    .activeOptions=${data[fld1.name]} .options=${{}}> </multi-select>
                `}cellIsAsProgress(fld1,data,lang){return lit.qy`
              <div class="w3-container">
                <div class="w3-background w3-round-xlarge" title="${this.titleLang(fld1)}">
                  <div class="w3-container w3-blue w3-round-xlarge" style="width:${data[fld1.name]}%">
                    ${data[fld1.name]}%
                  </div>
                </div>
              </div>
              <br />
          `}cellIsIcon(fld1,data,index){return lit.qy` 
                ${fld1.icon_class?lit.qy`                
                    <div class="left-area">
                        <mwc-icon-button class="icon ${data[fld1.icon_class]}" icon="${data[fld1.icon_name]}" alt="${fld1.name}"></mwc-icon-button>
                    </div>
                `:lit.qy`
                    <img src="${this.iconRendererSrc(data,fld1.name,index,fld1)}" alt="${this.iconRendererSrc(data,fld1.name,index,fld1)}" style="width:20px">
                `}             
            `}cellIsOther(elem,fld1,data,lang,index){return lit.qy`
                <div class="right-area">
                <span class="text">
                    ${void 0!==fld1.fix_value_prefix?fld1.fix_value_prefix:""}
                </span>
                <span>${data[fld1.name]}</span>
                ${void 0!==fld1.fix_value_suffix?fld1.fix_value_suffix:""}
                ${void 0!==fld1.fix_value2_prefix?fld1.fix_value2_prefix:""}
                <span>
                    ${void 0!==fld1.name2?data[fld1.name2]:""}
                </span>
                ${void 0!==fld1.fix_value2_suffix?fld1.fix_value2_suffix:""}
                ${void 0!==fld1.fix_value3_prefix?fld1.fix_value3_prefix:""}
                <span>
                    ${void 0!==fld1.name3?data[fld1.name3]:""}
                    ${void 0!==fld1.fix_value3_suffix?fld1.fix_value3_suffix:""}
                </span>                
                </div>                  
            `}cellIsParagraph(fld1,data,lang){return lit.qy`${(0,unsafe_html._)(this.getDynamicData(fld1.paragraph,data,lang))}
            `}generateRowButtons(elem,curRow,parentData,index,handle,lang){return lit.qy`
            <td>
            ${elem.expandInfoSection?lit.qy`
            <div class="circle" @click="${e=>this._toggleDetail(e,index)}" title="${"es"===lang?"Información":"Information"}">i</div>`:lit.qy``}
            
            ${void 0===elem.row_buttons?lit.qy`
                
                    ${curRow[elem.children]&&curRow[elem.children].length>0?lit.qy`
                        <div class="circle"> 
                            ${curRow[elem.children].length} 
                        </div>
                        </div>
                    `:lit.qy``}
                `:lit.qy`                
                  
                    ${curRow[elem.children]&&curRow[elem.children].length>0?lit.qy`
                        <div class="circle"> 
                          ${curRow[elem.children].length} 
                        </div>
                    `:lit.qy``}
                    <div class="layout horizontal center flex wrap">
                      ${this.getButtonForRows(elem.row_buttons,curRow,!1,parentData)}
                    </div>
                  
                `}  
                </td>    
            `}getRowsInfo(elem,curRow,rowIndex,lang,parentData,handler){return lit.qy`
              ${elem.columns.map(((fld1,columnIndex)=>lit.qy`
                  <td>
                      ${void 0!==fld1.tooltip?lit.qy`
                          <grid-cell-tooltip lang="${lang}" .element="${fld1}" .data="${curRow}">                        
                              ${this.cellContentController(elem,fld1,curRow,lang,columnIndex,rowIndex)}                    
                          </grid-cell-tooltip>
                      `:lit.qy`
                          ${this.cellContentController(elem,fld1,curRow,lang,columnIndex,rowIndex)}
                      `}
                  </td>
                  `))}
              ${this.generateRowButtons(elem,curRow,parentData,rowIndex,handler,lang)}
          `}}}((0,GridFunctions.G)(function TrazitFormsElements(base){return class extends((0,DialogsFunctions.X)(base)){static get properties(){return{selectedResults:{type:Array},enterResults:{type:Array},microorganismList:{type:Array},selectedAssigns:{type:Array},assignList:{type:Array},targetValue:{type:Object},selectedDialogAction:{type:Object},lotDays:{type:Number},deactivatedLots:{type:Array},openInvests:{type:Array},selectedInvestigations:{type:Array},capaRequired:{type:Boolean},selectedStucks:{type:Array},dataForDialog:{type:Object},familyList:{type:Array},microName:{type:String},fromGrid:{type:Boolean},fields:{type:Array},declineDialog:{type:Object},masterData:{type:Object}}}constructor(){super(),this.lotDays=7,this.deactivatedLots=[],this.microorganismList=[],this.familyList=[],this.capaRequired=!1,this.fromGrid=!1,this.fields=[],this.actionBeingPerformedModel={},this.fieldsShouldBeReset=!0,this.masterData={}}openThisDialog(actionModel=this.actionBeingPerformedModel){return!!(actionModel&&actionModel.dialogInfo&&actionModel.dialogInfo.fields)&&(this.defaultValue(),!0)}setValidVal(e,fieldDef){if(console.log("setValidVal",e,"fieldDef",fieldDef),void 0!==fieldDef.min_allowed&&"number"==typeof fieldDef.min_allowed&&e.target.value<fieldDef.min_allowed)e.target.value=fieldDef.min_allowed;else if(void 0!==fieldDef.max_allowed&&"number"==typeof fieldDef.max_allowed&&e.target.value>fieldDef.max_allowed)e.target.value=fieldDef.max_allowed;else if(void 0!==fieldDef.max_dp&&fieldDef.max_dp){let v=e.target.value.split(".");v.length>1&&v[1].length>fieldDef.max_dp&&(v[1]=v[1].substring(0,fieldDef.max_dp),e.target.value=Number(v.join(".")))}}fieldLabel(fld){let fldLbl=fld["label_"+this.lang];return void 0!==fld.optional&&!1!==fld.optional||(fldLbl="* "+fldLbl),fldLbl}isFieldDisabled(fld){return void 0!==fld.disabled&&!0===fld.disabled}fldDefaultValue(fldDef){let curArgName="";if(fldDef.default_value)return fldDef.default_value;if(fldDef.internalVariableSimpleObjName&&fldDef.internalVariableSimpleObjProperty){if(void 0===this[fldDef.internalVariableSimpleObjName]||void 0===this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]){let msg="";return void 0===this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]?(msg="The object "+fldDef.internalVariableSimpleObjName+" has no one property called "+fldDef.internalVariableSimpleObjProperty,alert(msg)):(msg="there is no object called "+fldDef.internalVariableSimpleObjName+" in this view",alert(msg)),"ERROR: "+msg}return this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]}if(fldDef.internalVariableObjName&&fldDef.internalVariableObjProperty){if(void 0===this[fldDef.internalVariableObjName]||void 0===this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]){let msg="";return void 0===this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]?(msg="The object "+fldDef.internalVariableObjName+" has no one property called "+fldDef.internalVariableObjProperty,alert(msg)):(msg="there is no object called "+fldDef.internalVariableObjName+" in this view",alert(msg)),"ERROR: "+msg}return this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]}return fldDef.element?void 0:fldDef.defaultValue?void 0!==fldDef.isAdhocField&&!0===fldDef.isAdhocField?(curArgName=jsonParam[fldDef.argumentName],void 0===curArgName&&(curArgName=""),curArgName.length>0&&(curArgName+="|"),curArgName+=fldDef.defaultValue,void 0!==fldDef.fieldType&&(curArgName=curArgName+"*"+fldDef.fieldType),curArgName):fldDef.defaultValue:fldDef.selObjectPropertyName?selObject[fldDef.selObjectPropertyName]:fldDef.targetValue?targetValue[fldDef.argumentName]:fldDef.fixValue?fldDef.fixValue:fldDef.contextVariableName?this[fldDef.contextVariableName]:""}genericFormElements(fields1,withEnterKey=!1,keydownHandler=null){return void 0===fields1&&(fields1=[]),this.fields=fields1,lit.qy`
    <style>
    mwc-textfield {
        border-style : Solid;
        border-color : #999999;
        border-color : rgba(153, 153, 153, 1);
        border-width : 1px;
        border-radius : 7px;
        -moz-border-radius : 7px;
        -webkit-border-radius : 7px;   
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background-color :  #FFFFFF;
        background-color : rgb(255, 255, 255);  
        --mdc-text-field-idle-line-color:#148CFA;
        --mdc-text-field-outlined-idle-border-color: #148CFA;
        --mdc-text-field-label-ink-color:  #148CFA;
        --mdc-text-field-focused-label-color: #148CFA;
        --mdc-theme-primary: #0465FB;
      }
      mwc-select {        
        --mdc-theme-primary : rgba(36, 192, 235, 1);
        --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
        --mdc-select-ink-color: rgb(47, 47, 47);
        --mdc-select-dropdown-icon-color:rgba(36, 192, 235, 1);
        --mdc-select-hover-line-color:rgba(36, 192, 235, 1);
        --mdc-notched-outline-border-color: rgba(186, 235, 248, 0.4);
        --mdc-select-disabled-dropdown-icon-color:rgba(36, 192, 235, 1);

        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }
      mwc-select.outlined {        
        --mdc-theme-primary : rgba(36, 192, 235, 1);
        --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
        --mdc-select-ink-color: rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background-color: 4fcad029;
      } 
      mwc-formfield{        
        --mdc-theme-secondary: #1473e6;
      }      
    </style>
        ${fields1?lit.qy`              
            ${fields1.map(((fld,i)=>lit.qy`            
                ${fld.filtertext1?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext1" type="text" .value=${(0,until.T)(this.fldDefaultValue(fld.filtertext1),"")} label="${this.fieldLabel(fld.filtertext1)}"  ?disabled=${this.isFieldDisabled(fld.filtertext1)} 
                        @keypress=${e=>13==e.keyCode&&this.acceptedGenericDialog}></mwc-textfield>

                    </div>
                `:lit.qy``}          
                ${fld.text1?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text1" type="text" .value=${(0,until.T)(this.fldDefaultValue(fld.text1),"")}  label="${this.fieldLabel(fld.text1)}" ?disabled=${this.isFieldDisabled(fld.text1)}
                        @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.filtertext2?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext2" type="text" .value=${(0,until.T)(this.fldDefaultValue(fld.filtertext2),"")} label="${this.fieldLabel(fld.filtertext2)}" ?disabled=${this.isFieldDisabled(fld.filtertext2)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.filtertext3?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext3" type="text" .value=${(0,until.T)(this.fldDefaultValue(fld.filtertext3),"")} label="${this.fieldLabel(fld.filtertext3)}" ?disabled=${this.isFieldDisabled(fld.filtertext3)}
                        @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}                       
                ${fld.filtertext4?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext4" type="text" .value=${(0,until.T)(this.fldDefaultValue(fld.filtertext4),"")} label="${this.fieldLabel(fld.filtertext4)}" ?disabled=${this.isFieldDisabled(fld.filtertext4)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.filtertext5?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext5" type="text" .value=${(0,until.T)(this.fldDefaultValue(fld.filtertext5),"")} label="${this.fieldLabel(fld.filtertext5)}"  ?disabled=${this.isFieldDisabled(fld.filtertext5)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.filtertext6?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext6" type="text" .value=${(0,until.T)(this.fldDefaultValue(fld.filtertext6),"")} label="${this.fieldLabel(fld.filtertext6)}"  ?disabled=${this.isFieldDisabled(fld.filtertext6)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.filtertext7?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext7" type="text" .value=${(0,until.T)(this.fldDefaultValue(fld.filtertext7),"")} label="${this.fieldLabel(fld.filtertext7)}"  ?disabled=${this.isFieldDisabled(fld.filtertext7)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.filtertext8?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext8" type="text" .value=${(0,until.T)(this.fldDefaultValue(fld.filtertext8),"")} label="${this.fieldLabel(fld.filtertext8)}" ?disabled=${this.isFieldDisabled(fld.filtertext8)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.filtertext9?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext9" type="text" .value=${(0,until.T)(this.fldDefaultValue(fld.filtertext9),"")} label="${this.fieldLabel(fld.filtertext9)}" ?disabled=${this.isFieldDisabled(fld.filtertext9)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}          
                ${fld.filtertext10?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext10" type="text" .value=${(0,until.T)(this.fldDefaultValue(fld.filtertext10),"")} label="${this.fieldLabel(fld.filtertext10)}" ?disabled=${this.isFieldDisabled(fld.filtertext10)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}                              
                ${fld.filternumber1?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber1" type="number" 
                    @input=${e=>this.setValidVal(e,fld)} .value=${this.fldDefaultValue(fld.filternumber1)} label="${this.fieldLabel(fld.filternumber1)}" ?disabled=${this.isFieldDisabled(fld.filternumber1)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.filternumber2?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber2" type="number" @input=${e=>this.setValidVal(e,fld)}
                    .value=${this.fldDefaultValue(fld.filternumber2)}   label="${this.fieldLabel(fld.filternumber2)}" ?disabled=${this.isFieldDisabled(fld.filternumber2)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.filternumber3?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber3" type="number" @input=${e=>this.setValidVal(e,fld)}
                    .value=${this.fldDefaultValue(fld.filternumber3)}   label="${this.fieldLabel(fld.filternumber3)}" ?disabled=${this.isFieldDisabled(fld.filternumber3)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.filternumber4?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber4" type="number" @input=${e=>this.setValidVal(e,fld)}
                    .value=${this.fldDefaultValue(fld.filternumber4)}   label="${this.fieldLabel(fld.filternumber4)}" ?disabled=${this.isFieldDisabled(fld.filternumber4)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.filternumber5?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber5" type="number" @input=${e=>this.setValidVal(e,fld)}
                    .value=${this.fldDefaultValue(fld.filternumber5)}   label="${this.fieldLabel(fld.filternumber5)}" ?disabled=${this.isFieldDisabled(fld.filternumber5)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.filternumber6?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber6" type="number" @input=${e=>this.setValidVal(e,fld)}
                    .value=${this.fldDefaultValue(fld.filternumber6)}  label="${this.fieldLabel(fld.filternumber6)}" ?disabled=${this.isFieldDisabled(fld.filternumber6)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.filternumber7?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber7" type="number" @input=${e=>this.setValidVal(e,fld)}
                    .value=${this.fldDefaultValue(fld.filternumber7)}   label="${this.fieldLabel(fld.filternumber7)}" ?disabled=${this.isFieldDisabled(fld.filternumber7)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.filternumber8?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber8" type="number" @input=${e=>this.setValidVal(e,fld)}
                    .value=${this.fldDefaultValue(fld.filternumber8)}   label="${this.fieldLabel(fld.filternumber8)}" ?disabled=${this.isFieldDisabled(fld.filternumber8)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.filternumber9?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber9" type="number" @input=${e=>this.setValidVal(e,fld)}
                    .value=${this.fldDefaultValue(fld.filternumber9)}   label="${this.fieldLabel(fld.filternumber9)}" ?disabled=${this.isFieldDisabled(fld.filternumber9)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.filternumber10?lit.qy`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber10" type="number" @input=${e=>this.setValidVal(e,fld)}
                    .value=${this.fldDefaultValue(fld.filternumber10)}   label="${this.fieldLabel(fld.filternumber10)}" ?disabled=${this.isFieldDisabled(fld.filternumber10)}
                    @keydown=${withEnterKey?keydownHandler:nothing} ></mwc-textfield>
                    </div>
                `:lit.qy``}   
                ${fld.filtercheckbox1?lit.qy`        
                    <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox1)}" >
                        <mwc-checkbox id="filtercheckbox1" ?checked=${this.fldDefaultValue(fld.filtercheckbox1)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox1)}
                        @change=${e=>{this.filtercheckbox1.value=this.filtercheckbox1.checked}} value="${this.fldDefaultValue(fld.filtercheckbox1)}"
                        ></mwc-checkbox>
                    </mwc-formfield>
                `:lit.qy``}                              
                    ${fld.filtercheckbox2?lit.qy`        
                    <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox2)}" >
                        <mwc-checkbox id="filtercheckbox2" ?checked=${this.fldDefaultValue(fld.filtercheckbox2)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox2)}
                        @change=${e=>{this.filtercheckbox2.value=this.filtercheckbox2.checked}} value="${this.fldDefaultValue(fld.filtercheckbox2)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.filtercheckbox3?lit.qy`        
                    <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox3)}" >
                        <mwc-checkbox id="filtercheckbox3" ?checked=${this.fldDefaultValue(fld.filtercheckbox3)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox3)}
                        @change=${e=>{this.filtercheckbox3.value=this.filtercheckbox3.checked}} value="${this.fldDefaultValue(fld.filtercheckbox3)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.filtercheckbox4?lit.qy`        
                    <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox4)}" >
                        <mwc-checkbox id="filtercheckbox4" ?checked=${this.fldDefaultValue(fld.filtercheckbox4)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox4)}
                        @change=${e=>{this.filtercheckbox4.value=this.filtercheckbox4.checked}} value="${this.fldDefaultValue(fld.filtercheckbox4)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.filtercheckbox5?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox5)}" >
                        <mwc-checkbox id="filtercheckbox5" ?checked=${this.fldDefaultValue(fld.filtercheckbox5)} @change=${e=>{this.filtercheckbox5.value=this.filtercheckbox5.checked}}
                        value="${this.fldDefaultValue(fld.filtercheckbox5)}" ?disabled=${this.isFieldDisabled(fld.filtercheckbox5)}
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.filtercheckbox6?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox6)}" >
                        <mwc-checkbox id="filtercheckbox6" ?checked=${this.fldDefaultValue(fld.filtercheckbox6)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox6)}
                        @change=${e=>{this.filtercheckbox6.value=this.filtercheckbox6.checked}} value="${this.fldDefaultValue(fld.filtercheckbox6)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.filtercheckbox7?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox7)}" >
                        <mwc-checkbox id="filtercheckbox7" ?checked=${this.fldDefaultValue(fld.filtercheckbox7)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox7)}
                        @change=${e=>{this.filtercheckbox7.value=this.filtercheckbox7.checked}} value="${this.fldDefaultValue(fld.filtercheckbox7)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.filtercheckbox8?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox8)}" >
                        <mwc-checkbox id="filtercheckbox8" ?checked=${this.fldDefaultValue(fld.filtercheckbox8)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox8)}
                        @change=${e=>{this.filtercheckbox8.value=this.filtercheckbox8.checked}} value="${this.fldDefaultValue(fld.filtercheckbox8)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.filtercheckbox9?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox9)}" >
                        <mwc-checkbox id="filtercheckbox9" ?checked=${this.fldDefaultValue(fld.filtercheckbox9)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox9)}
                        @change=${e=>{this.filtercheckbox9.value=this.filtercheckbox9.checked}} value="${this.fldDefaultValue(fld.filtercheckbox9)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              
                    ${fld.filtercheckbox10?lit.qy`        
                        <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox10)}" >
                        <mwc-checkbox id="filtercheckbox10" ?checked=${this.fldDefaultValue(fld.filtercheckbox10)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox10)}
                        @change=${e=>{this.filtercheckbox10.value=this.filtercheckbox10.checked}} value="${this.fldDefaultValue(fld.filtercheckbox10)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `:lit.qy``}                              

                    ${fld.filterdate1?lit.qy`<mwc-textfield id="filterdate1" label="${this.fieldLabel(fld.filterdate1)}"  ?disabled=${this.isFieldDisabled(fld.filterdate1)} type="date"></mwc-textfield>`:lit.qy``}
                    ${fld.filterdate2?lit.qy`<mwc-textfield id="filterdate2" label="${this.fieldLabel(fld.filterdate2)}"  ?disabled=${this.isFieldDisabled(fld.filterdate2)} type="date"></mwc-textfield>`:lit.qy``}
                    ${fld.filterdate3?lit.qy`<mwc-textfield id="filterdate3" label="${this.fieldLabel(fld.filterdate3)}"  ?disabled=${this.isFieldDisabled(fld.filterdate3)} type="date"></mwc-textfield>`:lit.qy``}
                    ${fld.filterdate4?lit.qy`<mwc-textfield id="date4" label="${this.fieldLabel(fld.filterdate4)}"  ?disabled=${this.isFieldDisabled(fld.filterdate4)} type="date"></mwc-textfield>`:lit.qy``}
                    ${fld.filterdate5?lit.qy`<mwc-textfield id="date5" label="${this.fieldLabel(fld.filterdate5)}"  ?disabled=${this.isFieldDisabled(fld.filterdate5)} type="date"></mwc-textfield>`:lit.qy``}                           
                    ${fld.filterdate6?lit.qy`<mwc-textfield id="date6" label="${this.fieldLabel(fld.filterdate6)}"  ?disabled=${this.isFieldDisabled(fld.filterdate6)} type="date"></mwc-textfield>`:lit.qy``} 
                    ${fld.filterdate7?lit.qy`<mwc-textfield id="date7" label="${this.fieldLabel(fld.filterdate7)}"  ?disabled=${this.isFieldDisabled(fld.filterdate7)} type="date"></mwc-textfield>`:lit.qy``}
                    ${fld.filterdate8?lit.qy`<mwc-textfield id="date8" label="${this.fieldLabel(fld.filterdate8)}"  ?disabled=${this.isFieldDisabled(fld.filterdate8)} type="date"></mwc-textfield>`:lit.qy``}
                    ${fld.filterdate9?lit.qy`<mwc-textfield id="date9" label="${this.fieldLabel(fld.filterdate9)}"  ?disabled=${this.isFieldDisabled(fld.filterdate9)} type="date"></mwc-textfield>`:lit.qy``}
                    ${fld.filterdate10?lit.qy`<mwc-textfield id="filterdate10" label="${this.fieldLabel(fld.filterdate10)}  ?disabled=${this.isFieldDisabled(fld.filterdate10)}" type="date"></mwc-textfield>`:lit.qy``}

                    ${fld.filterdatetime1?lit.qy`<input id="datetime1" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.filterdatetime2?lit.qy`<input id="datetime2" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.filterdatetime3?lit.qy`<input id="datetime3" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.filterdatetime4?lit.qy`<input id="datetime4" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.filterdatetime5?lit.qy`<input id="datetime5" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.filterdatetime6?lit.qy`<input id="datetime6" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.filterdatetime7?lit.qy`<input id="datetime7" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.filterdatetime8?lit.qy`<input id="datetime8" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.filterdatetime9?lit.qy`<input id="datetime9" type="datetime-local" dialogInitialFocus>`:lit.qy``}   
                    ${fld.filterdatetime10?lit.qy`<input id="datetime10" type="datetime-local" dialogInitialFocus>`:lit.qy``}   

                    
                    ${fld.filterdaterange1?lit.qy`    
                            <div style="display:flex">    
                            <mwc-textfield id="filterdaterange1dateStart" label="${this.fieldLabel(fld.filterdaterange1.filterdateStart)}" type="date" value="${(0,until.T)(this.fldDefaultValue(fld.filterdaterange1.filterdateStart),"")}"></mwc-textfield>
                            <mwc-textfield id="filterdaterange1dateEnd" label="${this.fieldLabel(fld.filterdaterange1.filterdateEnd)}" type="date" value="${(0,until.T)(this.fldDefaultValue(fld.filterdaterange1.filterdateEnd),"")}"></mwc-textfield>
                            </div>
                        `:lit.qy``}                       
                    ${fld.filterdaterange1?lit.qy`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange1dateStart" label="${this.fieldLabel(fld.filterdaterange1.filterdateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange1dateEnd" label="${this.fieldLabel(fld.filterdaterange1.filterdateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `:lit.qy``}                       
                    ${fld.filterdaterange2?lit.qy`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange2dateStart" label="${this.fieldLabel(fld.filterdaterange2.filterdateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange2dateEnd" label="${this.fieldLabel(fld.filterdaterange2.filterdateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `:lit.qy``}                       
                    ${fld.filterdaterange3?lit.qy`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange3dateStart" label="${this.fieldLabel(fld.filterdaterange3.filterdateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange3dateEnd" label="${this.fieldLabel(fld.filterdaterange3.filterdateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `:lit.qy``}                       
                    ${fld.filterdaterange4?lit.qy`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange4dateStart" label="${this.fieldLabel(fld.filterdaterange4.filterdateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange4dateEnd" label="${this.fieldLabel(fld.filterdaterange4.filterdateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `:lit.qy``}                       
                    ${fld.filterdaterange5?lit.qy`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange5dateStart" label="${this.fieldLabel(fld.filterdaterange5.filterdateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange5dateEnd" label="${this.fieldLabel(fld.filterdaterange5.filterdateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `:lit.qy``}                                   

                ${fld.filterlist1?lit.qy`        
                    <mwc-select id="list1" label="${this.fieldLabel(fld.filterlist1)}" @selected=${this.valueSelected}  ?disabled=${this.isFieldDisabled(fld.filterlist1)} >
                        ${this.filterlistEntries(fld.filterlist1)}</mwc-select>`:lit.qy``}  
                ${fld.filterlist2?lit.qy`        
                    <mwc-select id="list2" label="${this.fieldLabel(fld.filterlist2)}" ?disabled=${this.isFieldDisabled(fld.filterlist2)} >
                        ${this.filterlistEntries(fld.filterlist2)}</mwc-select>`:lit.qy``}  
                ${fld.filterlist3?lit.qy`        
                    <mwc-select id="list3" label="${this.fieldLabel(fld.filterlist3)}" ?disabled=${this.isFieldDisabled(fld.filterlist3)} >
                        ${this.filterlistEntries(fld.filterlist3)}</mwc-select>`:lit.qy``}  
                ${fld.filterlist4?lit.qy`        
                    <mwc-select id="list4" label="${this.fieldLabel(fld.filterlist4)}"  ?disabled=${this.isFieldDisabled(fld.filterlist4)} >
                        ${this.filterlistEntries(fld.filterlist4)}</mwc-select>`:lit.qy``}  
                ${fld.filterlist5?lit.qy`        
                    <mwc-select id="list5" label="${this.fieldLabel(fld.filterlist5)}"  ?disabled=${this.isFieldDisabled(fld.filterlist5)} >
                        ${this.filterlistEntries(fld.filterlist5)}</mwc-select>`:lit.qy``}  
                ${fld.filterlist6?lit.qy`        
                    <mwc-select id="list6" label="${this.fieldLabel(fld.filterlist6)}" ?disabled=${this.isFieldDisabled(fld.filterlist6)} >
                        ${this.filterlistEntries(fld.filterlist6)}</mwc-select>`:lit.qy``}  
                ${fld.filterlist7?lit.qy`        
                    <mwc-select id="list7" label="${this.fieldLabel(fld.filterlist7)}" ?disabled=${this.isFieldDisabled(fld.filterlist7)} >
                        ${this.filterlistEntries(fld.filterlist7)}</mwc-select>`:lit.qy``}  
                ${fld.filterlist8?lit.qy`        
                    <mwc-select id="list8" llabel="${this.fieldLabel(fld.filterlist8)}" ?disabled=${this.isFieldDisabled(fld.filterlist8)} >
                        ${this.filterlistEntries(fld.filterlist8)}</mwc-select>`:lit.qy``}  
                ${fld.filterlist9?lit.qy`        
                    <mwc-select id="list9" label="${this.fieldLabel(fld.filterlist9)}" ?disabled=${this.isFieldDisabled(fld.filterlist9)} >
                        ${this.filterlistEntries(fld.filterlist9)}</mwc-select>`:lit.qy``}  
                ${fld.filterlist10?lit.qy`        
                    <mwc-select id="list10" label="${this.fieldLabel(fld.filterlist10)}" ?disabled=${this.isFieldDisabled(fld.filterlist10)} >
                        ${this.filterlistEntries(fld.filterlist10)}</mwc-select>`:lit.qy``}  

                `))}   
        `:lit.qy``}        
    `}get dateInput(){return this.shadowRoot.querySelector("input#dateInput")}setNewDate(){this.filterdateInput.value&&this.dialogAccept(!1)}declineDialog(){this.fieldsShouldBeReset=!0}acceptedGenericDialog(e){this.fieldsShouldBeReset=!0,this.checkMandatoryFieldsNotEmpty()?this.dialogAccept(!1):(console.log("Accepted Generic Dialog but mandatories pending then action not performed"),e.stopPropagation())}checkMandatoryFieldsNotEmpty(){let dlgFlds=this.fields;for(let i=0;i<dlgFlds.length;i++){let fldObj=dlgFlds[i],keyName=Object.keys(fldObj),fldDef=fldObj[keyName[0]];if((void 0===fldDef.optional||!1===fldDef.optional)&&0==this[keyName].value.length)return alert("Field "+fldDef["label_"+this.lang]+" is mandatory"),!1}return!0}defaultValue(){!0===this.fieldsShouldBeReset&&(this.resetFields(),this.fieldsShouldBeReset=!1);let dlgFlds=fields;if(void 0!==dlgFlds)for(let i=0;i<dlgFlds.length;i++){let fldObj=dlgFlds[i],keyName=Object.keys(fldObj);void 0!==fldObj[keyName].default_value&&null!==fldObj[keyName].default_value&&(this[keyName[0]].value=fldObj[keyName].default_value),void 0!==fldObj[keyName].selObjectPropertyName&&null!==fldObj[keyName].selObjectPropertyName&&(this[keyName[0]].value=this.selectedItems[0][fldObj[keyName].selObjectPropertyName]),void 0!==fldObj[keyName].internalVariableObjName&&null!==fldObj[keyName].internalVariableObjName&&void 0!==fldObj[keyName].internalVariableObjProperty&&null!==fldObj[keyName].internalVariableObjProperty&&(this[keyName[0]].value=this[fldObj[keyName].internalVariableObjName][0][fldObj[keyName].internalVariableObjProperty])}}resetFields(){let dlgFlds=fields;if(void 0!==dlgFlds)for(let i=0;i<dlgFlds.length;i++){let fldObj=dlgFlds[i],keyName=Object.keys(fldObj);null!==this[keyName]&&(keyName[0].includes("list")?this[keyName[0]].value=[]:void 0!==this[keyName]&&void 0!==this[keyName[0]]&&(this[keyName[0]].value=""))}}valueSelected(e){}listEntries(fld){console.log("listEntries");let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:""},newList=[];if(void 0===fld)return lit.qy`<mwc-list-item></mwc-list-item>`;if(void 0!==fld.addBlankValueOnTop&&!0===fld.addBlankValueOnTop&&newList.push(blankEmpty),void 0!==fld.valuesFromMasterData){let MDentriesArr=this.filterlistEntriesFromMasterData(fld.valuesFromMasterData);MDentriesArr.length>0&&MDentriesArr.forEach((item=>newList.push(item)))}else fld.items.forEach((item=>newList.push(item)));return void 0!==fld.addBlankValueAtBottom&&!0===fld.addBlankValueAtBottom&&newList.push(blankEmpty),lit.qy`
        ${newList.map(((c,i)=>lit.qy`<mwc-list-item value="${c.keyName}" ?selected=${0==i}>${c["keyValue_"+this.lang]}</mwc-list-item>`))}
        `}listEntriesFromMasterData(fldMDDef){if(void 0===this.masterData)return entries1;console.log("masterData",this.masterData),console.log("actionBeingPerformedModel",this.actionBeingPerformedModel);let entries1=[];if(void 0===this.masterData[fldMDDef.propertyNameContainer])return alert("Property "+fldMDDef.propertyNameContainer+" not found in Master Data"),entries1;if(void 0!==fldMDDef.filterInFirstLevel&&!0===fldMDDef.filterInFirstLevel){if(!(void 0!==fldMDDef.elementName&&null!==fldMDDef.elementName||void 0!==fldMDDef.propertyNameContainerLevelfixValue&&null!==fldMDDef.propertyNameContainerLevelfixValue))return alert("Property elementName or propertyNameContainerLevelfixValue is mandatory when filterInFirstLevel=true. Review model definition"),entries1;let filterValue;if(filterValue=void 0!==fldMDDef.propertyNameContainerLevelfixValue?fldMDDef.propertyNameContainerLevelfixValue:this[fldMDDef.elementName].value,void 0===filterValue)return entries1;let result=this.masterData[fldMDDef.propertyNameContainer].find((item=>item.name===filterValue));return void 0===result||(result[fldMDDef.propertyNameContainerLevel2].forEach((item=>{console.log("item",item,"fldMDDef.propertyNameContainer.propertyKeyName",fldMDDef.propertyKeyName);let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:""};blankEmpty.keyName=item[fldMDDef.propertyKeyName],blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn],blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs],console.log("blankEmpty",blankEmpty),entries1.push(blankEmpty)})),console.log("entries at end",entries1)),entries1}return this.masterData[fldMDDef.propertyNameContainer].forEach((item=>{console.log("item",item,"fldMDDef.propertyNameContainer.propertyKeyName",fldMDDef.propertyKeyName);let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:""};blankEmpty.keyName=item[fldMDDef.propertyKeyName],blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn],blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs],console.log("blankEmpty",blankEmpty),entries1.push(blankEmpty)})),entries1}getListInLevel3(fldMDDef,level2Arr){level2Arr.filter((p=>p[propertyNameContainerLevel2PropertyKeyName]==fldMDDef.propertyNameContainerLevel2fixValue))[fldMDDef.propertyNameContainerLevel3].forEach((item=>{console.log("item",item,"fldMDDef.propertyNameContainer.propertyKeyName",fldMDDef.propertyNameContainerLevel2PropertyKeyName);let blankEmpty={keyName:"",keyValue_en:"",keyValue_es:""};blankEmpty.keyName=item[fldMDDef.propertyKeyName],blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn],blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs],console.log("blankEmpty",blankEmpty),entries.push(blankEmpty)}))}fldDisabled(){return!0}get filtertext1(){return this.shadowRoot.querySelector("mwc-textfield#filtertext1")}get text1(){return this.shadowRoot.querySelector("mwc-textfield#text1")}get filtertext2(){return this.shadowRoot.querySelector("mwc-textfield#filtertext2")}get filtertext3(){return this.shadowRoot.querySelector("mwc-textfield#filtertext3")}get filtertext4(){return this.shadowRoot.querySelector("mwc-textfield#filtertext4")}get filtertext5(){return this.shadowRoot.querySelector("mwc-textfield#filtertext5")}get filtertext6(){return this.shadowRoot.querySelector("mwc-textfield#filtertext6")}get filtertext7(){return this.shadowRoot.querySelector("mwc-textfield#filtertext7")}get filtertext8(){return this.shadowRoot.querySelector("mwc-textfield#filtertext8")}get filtertext9(){return this.shadowRoot.querySelector("mwc-textfield#filtertext9")}get filtertext10(){return this.shadowRoot.querySelector("mwc-textfield#filtertext10")}get filtercheckbox1(){return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox1")}get filtercheckbox2(){return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox2")}get filtercheckbox3(){return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox3")}get filtercheckbox4(){return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox4")}get filtercheckbox5(){return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox5")}get filtercheckbox6(){return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox6")}get filtercheckbox7(){return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox7")}get filtercheckbox8(){return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox8")}get filtercheckbox9(){return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox9")}get filtercheckbox10(){return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox10")}get filterdate1(){return this.shadowRoot.querySelector("mwc-textfield#filterdate1")}get filterdate2(){return this.shadowRoot.querySelector("mwc-textfield#filterdate2")}get filterdate3(){return this.shadowRoot.querySelector("mwc-textfield#filterdate3")}get date4(){return this.shadowRoot.querySelector("mwc-textfield#date4")}get date5(){return this.shadowRoot.querySelector("mwc-textfield#date5")}get date6(){return this.shadowRoot.querySelector("mwc-textfield#date6")}get date7(){return this.shadowRoot.querySelector("mwc-textfield#date7")}get date8(){return this.shadowRoot.querySelector("mwc-textfield#date8")}get date9(){return this.shadowRoot.querySelector("mwc-textfield#date9")}get filterdate10(){return this.shadowRoot.querySelector("mwc-textfield#filterdate10")}get datetime1(){return this.shadowRoot.querySelector("input#datetime1")}get datetime2(){return this.shadowRoot.querySelector("input#datetime2")}get datetime3(){return this.shadowRoot.querySelector("input#datetime3")}get datetime4(){return this.shadowRoot.querySelector("input#datetime4")}get datetime5(){return this.shadowRoot.querySelector("input#datetime5")}get datetime6(){return this.shadowRoot.querySelector("input#datetime6")}get datetime7(){return this.shadowRoot.querySelector("input#datetime7")}get datetime8(){return this.shadowRoot.querySelector("input#datetime8")}get datetime9(){return this.shadowRoot.querySelector("input#datetime9")}get datetime10(){return this.shadowRoot.querySelector("input#datetime10")}get filterdaterange1dateStart(){return this.shadowRoot.querySelector("mwc-textfield#filterdaterange1dateStart")}get filterdaterange1dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#filterdaterange1dateEnd")}get daterange1dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange1dateStart")}get daterange1dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange1dateEnd")}get daterange2dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange2dateStart")}get daterange2dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange2dateEnd")}get daterange3dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange3dateStart")}get daterange3dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange3dateEnd")}get daterange4dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange4dateStart")}get daterange4dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange4dateEnd")}get daterange5dateStart(){return this.shadowRoot.querySelector("mwc-textfield#daterange5dateStart")}get daterange5dateEnd(){return this.shadowRoot.querySelector("mwc-textfield#daterange5dateEnd")}get filternumber1(){return this.shadowRoot.querySelector("mwc-textfield#filternumber1")}get filternumber2(){return this.shadowRoot.querySelector("mwc-textfield#filternumber2")}get filternumber3(){return this.shadowRoot.querySelector("mwc-textfield#filternumber3")}get filternumber4(){return this.shadowRoot.querySelector("mwc-textfield#filternumber4")}get filternumber5(){return this.shadowRoot.querySelector("mwc-textfield#filternumber5")}get filternumber6(){return this.shadowRoot.querySelector("mwc-textfield#filternumber6")}get filternumber7(){return this.shadowRoot.querySelector("mwc-textfield#filternumber7")}get filternumber8(){return this.shadowRoot.querySelector("mwc-textfield#filternumber8")}get filternumber9(){return this.shadowRoot.querySelector("mwc-textfield#filternumber9")}get filternumber10(){return this.shadowRoot.querySelector("mwc-textfield#filternumber10")}get list1(){return this.shadowRoot.querySelector("mwc-select#list1")}get list2(){return this.shadowRoot.querySelector("mwc-select#list2")}get list3(){return this.shadowRoot.querySelector("mwc-select#list3")}get list4(){return this.shadowRoot.querySelector("mwc-select#list4")}get list5(){return this.shadowRoot.querySelector("mwc-select#list5")}get list6(){return this.shadowRoot.querySelector("mwc-select#list6")}get list7(){return this.shadowRoot.querySelector("mwc-select#list7")}get list8(){return this.shadowRoot.querySelector("mwc-select#list8")}get list9(){return this.shadowRoot.querySelector("mwc-select#list9")}get list10(){return this.shadowRoot.querySelector("mwc-select#list10")}get listMDprocedureUsers(){return this.shadowRoot.querySelector("mwc-select#listMDprocedureUsers")}get listMDSamplerPersonalAreas(){return this.shadowRoot.querySelector("mwc-select#listMDSamplerPersonalAreas")}get listMDvariablesSet(){return this.shadowRoot.querySelector("mwc-select#listMDvariablesSet")}get listMDvariables(){return this.shadowRoot.querySelector("mwc-select#listMDvariables")}get listSelectedStudyIndividuals(){return this.shadowRoot.querySelector("mwc-select#listSelectedStudyIndividuals")}get listSelectedStudyIndividualSamples(){return this.shadowRoot.querySelector("mwc-select#listSelectedStudyIndividualSamples")}}}((0,TrazitCredentialsDialogs.s)((0,AuditFunctions.t)((0,TrazitInvestigationsDialog.O)((0,ModuleEnvMonitDialogsMicroorganism.E)((0,TrazitEnterResultWithSpec.F)((0,TrazitReactivateObjectsDialog.T)((0,TrazitGenericDialogs.f)((0,ModuleEnvMonitClientMethods.a)((0,AuditFunctions.t)((0,ButtonsFunctions.n)(lit.WF)))))))))))))))){kpiChartFran1(elem,data1){return void 0===elem||void 0!==elem.hideNoDataMessage&&!0===elem.hideNoDataMessage&&void 0===data1?lit.qy``:(void 0===data1&&void 0!==this.data&&(data1=this.data),lit.qy`
        ${!0!==elem.display_chart?lit.s6:lit.qy`
              ${this.chartStyle(elem.chart_name)}
              <google-chart
                id="${elem.chart_name}"
                title="${elem.chart_title["label_"+this.lang]}"
                type="${elem.chart_type}"
                .data="${this.getChartData(elem,data1)}"
                .options="${this.getChartOptions(elem)}"
                style="${void 0!==elem.chart_style?elem.chart_style:"height:400px; width: 100%;"}
              ></google-chart>
            `}
      `)}getDataFromRoot(elem,data1){if(void 0!==this.viewModelFromProcModel&&void 0!==this.viewModelFromProcModel?.viewQuery?.dataResponse&&"ArrayInRoot"===this.viewModelFromProcModel?.viewQuery?.dataResponse)return data1.queryData?data1.queryData:"";if(void 0!==elem&&void 0!==elem.contextVariableName&&void 0!==this[elem.contextVariableName]&&(data1=this[elem.contextVariableName]),null!=data1){if(void 0!==elem.endPointPropertyArray){if(0===elem.endPointPropertyArray.length)return data1;if(1===elem.endPointPropertyArray.length&&"ROOT"===elem.endPointPropertyArray[0].toUpperCase())return data1;let i=0,subJSON={};for(i=0;i<elem.endPointPropertyArray.length;i++){if(null===data1)return;let propertyName=elem.endPointPropertyArray[i];if(Array.isArray(data1[propertyName])){if(!(i<elem.endPointPropertyArray.length-1))return data1[propertyName];subJSON=data1[propertyName][0]}else subJSON=data1[propertyName];if(void 0===subJSON)return data1;data1=subJSON}return data1}if(void 0!==elem.endPointResponseObject&&void 0!==elem.endPointResponseObject2){let dataToRet=[];return dataToRet=data1[elem.endPointResponseObject],void 0!==dataToRet?dataToRet[elem.endPointResponseObject2]:[]}if("ROOT"===String(elem.endPointResponseObject).toUpperCase()){if(!Array.isArray(data1)){let dataArr=[];return dataArr.push(data1),dataArr}return data1}return data1[elem.endPointResponseObject]}}jsonViewer(elem,data1){return lit.qy`
        <div style="position:relative;">
          ${void 0===elem||void 0===elem.title?lit.s6:lit.qy`<span
                style="color: rgb(20, 115, 230);font-size: 30px;margin-top: 10px;font-weight: bold;"
                >${elem.title["label_"+this.lang]}</span
              >`}
          ${void 0===elem||void 0===data1?lit.s6:lit.qy` <json-viewer style=${void 0!==elem.style?elem.style:"padding:0px; padding-left:20px; top:-15px;"}
                >${JSON.stringify(this.getDataFromRoot(elem,data1))}</json-viewer
              >`}
        </div>
      `}kpiReportTitle(elem,data1){if(void 0!==this.filterName&&""!==this.filterName){if("string"!=typeof this.filterName)throw new Error("filterName must be a string");const filterName=String(this.filterName);function isFilterNameDefined(subViewFilter,filterName){if(subViewFilter)for(const filter of subViewFilter)if(filter.hasOwnProperty(filterName))return filter[filterName];return[]}elem=isFilterNameDefined(elem.subViewFilter,filterName)}return lit.qy`    
        <p style="text-align: center;">
          <span style="color: rgb(20, 115, 230); font-size: 30px; margin-top: 10px; font-weight: bold;" id="reportTitle">
            ${elem.title["label_"+this.lang]}
          </span>
        </p>
      `}kpiReportTitleLvl2(elem,data1,lang){return void 0!==elem.title||void 0!==elem.title.text_en&&void 0!==elem.title.label_en?void 0!==elem.title.text_en?lit.qy`
        <p><span style="color: rgb(20, 115, 230);font-size: 24px;margin-top: 10px;font-weight: bold;" id="reportTitle">            
          ${(0,unsafe_html._)(this.getDynamicData(elem.title,data1,lang))}
        </p>
        `:lit.qy`    
          <p><span style="color: rgb(20, 115, 230);font-size: 24px;margin-top: 10px;font-weight: bold;" id="reportTitle">${elem.title["label_"+this.lang]}</p>
          `:lit.qy``}kpiGrid(elem,data1=this.data){for(let i=0;i<elem.fieldsToDisplay.length;i++)void 0!==elem.fieldsToDisplay[i]["label_"+this.lang]&&(elem.fieldsToDisplay[i].header=elem.fieldsToDisplay[i]["label_"+this.lang]);return lit.qy`
        ${data1[elem.elementName]&&elem.fieldsToDisplay?lit.qy`
              <lit-datatable
                .data="${data1[elem.elementName]}"
                .conf="${elem.fieldsToDisplay}"
              ></lit-datatable>
            `:lit.s6}
      `}readOnlyTableByGroupOrig(elem,dataArr,isSecondLevel=!1){return console.log("readOnlyTableByGroup",elem,dataArr),dataArr=this.getDataFromRoot(elem,dataArr),console.log("Mejori",dataArr),lit.qy`
        <style>
          .table-group-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
          }

          .table-group {
            display: flex;
            flex-direction: column;
            text-align: center;
          }

          .table-group-header {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 10px;
          }
        </style>
        <div class="table-group-container">
          ${void 0===dataArr?lit.qy`No Data`:lit.qy`
                ${Object.entries(dataArr).map((([key,value])=>lit.qy`
                      ${this.readOnlyTable(elem,Object.entries(value).map,isSecondLevel,value,key)}
                    `))}
              `}
        </div>
      `}readOnlyTableByGroupAllInOne(elem,dataArr,isSecondLevel){return void 0===isSecondLevel&&(isSecondLevel=!1),dataArr=this.getDataFromRoot(elem,dataArr),lit.qy`
        <style>
          .styled-table-bygroup {
            display: -webkit-inline-box;
            margin-top: 0px;
            margin-bottom: 3px;
            color: #4285f4;
            font-size: 1.8vmin;
            border-collapse: collapse;
            margin: 2px 10px;
            font-family: Montserrat;
            /* min-width: 400px; */
            box-shadow: 0 0 20px #44cbe652;
            table-layout: fixed;
            //width: 91%;
          }
          .styled-table-bygroup thead tr {
            background-color: #2989d8;
            color: #ffffff;
            text-align: center;
            border: 1px solid #c2edf9;
          }
          .styled-table-bygroup thead tr headercolumns {
            background-color: 2989d870;
            color: white;
          }

          .styled-table-bygroup th {
            color: white;
          }
          .styled-table-bygroup tbody tr:hover td {
            color: white;
            background-color: #2989d8;
          }
          .styled-table-bygroup td {
            color: rgba(0, 0, 0, 0.71);
            padding: 8px 15px;
            border: 1px solid #c2edf9;
            word-break: break-all;
            font-weight: bold;
          }
          .styled-table-bygroup tbody tr {
            border-bottom: 1px solid #c2edf9;
          }
          .styled-table-bygroup tbody tr:nth-of-type(even) {
            background-color: #c2f2ff5c;
          }
          .styled-table-bygroup tbody tr:last-of-type {
            border-bottom: 2px solid #009879;
          }
          .styled-table-bygroup tbody tr.active-row {
            font-weight: bold;
            color: #009879;
          }
          span.cardLabel {
            font-weight: bold;
            font-size:16px;
            font-family: Montserrat;
            word-break: auto-phrase;
            color: rgb(41, 137, 216); /* #032bbc; */
          }
          span.cardValue {            
            color: rgba(214, 233, 248, 0.37); 
            font-size:16px; 
            font-family: Montserrat;
            display:inherit;            
            word-break: auto-phrase;
             /* #009879; */
          }
          span.title {
            color: rgb(35, 163, 198);
            margin-top: 10px;
            font-weight: bold;
          }
          span.title.true {
            font-size: 18px;
          }
          span.title.false {
            font-size: 18px;
          }
        </style>
        <div style="display: flex; flex-direction: row; text-align: center;">
          <div
            style="display: flex; flex-direction: column; text-align: center;"
          >
            ${void 0===elem||void 0===elem.title?lit.s6:lit.qy` <p>
                  <span class="title ${isSecondLevel}">${elem.title}</span>
                </p>`}
            <div class="layout horizontal center flex wrap">
              ${this.getButton(elem,dataArr,!0)}
            </div>
            ${void 0===elem.columns?lit.qy`No columns defined`:lit.qy`
                  <table class="styled-table-bygroup">
                    ${Object.entries(dataArr).sort().map((([key,value])=>lit.qy`
                  <thead>          
                    <tr>
                    <th style="color:#24c0eb; background-color: #d6e9f8; text-transform:uppercase; font-size:16px;" colspan=" ${elem.columns.length} ">
                      
                      ${void 0!==elem.showGroupEntryObjectName&&!0===elem.showGroupEntryObjectName?lit.qy`${key} ${Object.keys(value)[0]}`:lit.qy`${key}`}</th>
                    </tr>
                    <tr class="headercolumns">
                      ${elem.columns.map((fld=>lit.qy`
                            <td style="background-color:#7ccee6; color: white;">
                              ${fld["label_"+this.lang]}
                            </td>
                          `))}                  
                    </tr>
                  </thead>
                  <tbody>
                  ${void 0!==value&&Array.isArray(value)?lit.qy`
                          ${value.sort().map((p=>lit.qy`
                                <tr>
                                  ${elem.columns.map((fld=>lit.qy`
                                        ${"pretty_spec"===fld.name?lit.qy`
                                              <td>
                                                <span style="color:green"
                                                  >${p["spec_text_green_area_"+this.lang]}</span
                                                >
                                                <span style="color:orange"
                                                  >${p["spec_text_yellow_area_"+this.lang]}</span
                                                >
                                                <span style="color:red"
                                                  >${p["spec_text_red_area_"+this.lang]}</span
                                                >
                                              </td>
                                            `:lit.qy`
                                              ${void 0!==fld.as_progress&&!0===fld.as_progress?lit.qy`
                                                    <style>
                                                      .w3-responsive {
                                                        display: block;
                                                        overflow-x: auto;
                                                      }
                                                      .w3-container,
                                                      .w3-panel {
                                                        padding: 0.01em 4px;
                                                      }
                                                      .w3-panel {
                                                        margin-top: 16px;
                                                        margin-bottom: 16px;
                                                      }
                                                      .w3-container:after,
                                                      .w3-container:before,
                                                      .w3-panel:after,
                                                      .w3-panel:before,
                                                      .w3-row:after,
                                                      .w3-row:before,
                                                      .w3-row-padding:after,
                                                      .w3-row-padding:before,
                                                      .w3-blue,
                                                      .w3-hover-blue:hover {
                                                        color: rgba(
                                                          7,
                                                          13,
                                                          22,
                                                          0.94
                                                        ) !important;
                                                        background-color: #2196f3 !important;
                                                      }
                                                      .w3-background,
                                                      .w3-hover-blue:hover {
                                                        color: rgba(
                                                          7,
                                                          13,
                                                          22,
                                                          0.94
                                                        ) !important;
                                                        background-color: #ffdedd !important;
                                                      }
                                                      .title {
                                                        font-size: 8px;
                                                        font-weight: 500;
                                                        letter-spacing: 0;
                                                        line-height: 1.5em;
                                                        padding-bottom: 15px;
                                                        position: relative;
                                                        font-family: Montserrat;
                                                        font-color: rgb(
                                                          94,
                                                          145,
                                                          186
                                                        );
                                                      }
                                                    </style>
                                                    <td>
                                                      <div class="w3-container">
                                                        <div
                                                          class="w3-background w3-round-xlarge"
                                                          title="${this.titleLang(fld)}"
                                                        >
                                                          <div
                                                            class="w3-container w3-blue w3-round-xlarge"
                                                            style="width:${p[fld.name]}%"
                                                          >
                                                            ${p[fld.name]}%
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <br />
                                                    </td>
                                                  `:lit.qy`
                                                    <td>
                                                      ${void 0!==fld.fix_value_prefix?fld.fix_value_prefix:""}${p[fld.name]}${void 0!==fld.fix_value_suffix?fld.fix_value_suffix:""}
                                                      ${void 0!==fld.fix_value2_prefix?fld.fix_value2_prefix:""}${void 0!==fld.name2?p[fld.name2]:""}${void 0!==fld.fix_value2_suffix?fld.fix_value2_suffix:""}
                                                      ${void 0!==fld.fix_value3_prefix?fld.fix_value3_prefix:""}${void 0!==fld.name3?p[fld.name3]:""}${void 0!==fld.fix_value3_suffix?fld.fix_value3_suffix:""}
                                                    </td>
                                                  `}
                                            `}
                                      `))}
                                </tr>
                              `))}
                        `:lit.qy`No Data`}
                  </tbody>
                </table>
              `))}
                  </table>
                `}
          </div>
        </div>
      `}readOnlyTableByGroup(elem,dataArr,isSecondLevel){return void 0===isSecondLevel&&(isSecondLevel=!1),void 0===(dataArr=this.getDataFromRoot(elem,dataArr))?lit.qy``:lit.qy`
        <style>
          .styled-table-bygroup {
            display: -webkit-inline-box;
            margin-top: 0px;
            margin-bottom: 3px;
            color: #4285f4;
            font-size: 1.8vmin;
            border-collapse: collapse;
            margin: 2px 10px;
            font-family: Montserrat;
            /* min-width: 400px; */
            box-shadow: 0 0 20px #44cbe652;
            table-layout: fixed;
            //width: 91%;
          }
          .styled-table-bygroup thead tr {
            background-color: #2989d8;
            color: #ffffff;
            text-align: center;
            border: 1px solid #c2edf9;
          }
          .styled-table-bygroup thead tr headercolumns {
            background-color: 2989d870;
            color: white;
            font-weight: bold;
          }

          .styled-table-bygroup th {
            color: white;
          }
          .styled-table-bygroup tbody tr:hover td {
            color: white;
            background-color: #2989d8;
          }
          .styled-table-bygroup td groupheader {
            color: rgba(0, 0, 0, 0.71);
            padding: 8px 15px;
            border: 1px solid #c2edf9;
            word-break: break-all;
            font-weight: bold;
          }
          .styled-table-bygroup td {
            color: rgba(0, 0, 0, 0.71);
            padding: 8px 15px;
            border: 1px solid #c2edf9;
            word-break: break-all;
          }
          .styled-table-bygroup tbody tr {
            border-bottom: 1px solid #c2edf9;
          }
          .styled-table-bygroup tbody tr:nth-of-type(even) {
            background-color: #c2f2ff5c;
          }
          .styled-table-bygroup tbody tr:last-of-type {
            border-bottom: 2px solid #009879;
          }
          .styled-table-bygroup tbody tr.active-row {
            font-weight: bold;
            color: #009879;
          }
          span.cardLabel {
            font-weight: bold;
            color: rgb(41, 137, 216); 
            font-family: Montserrat;
            word-break: auto-phrase;
            font-size:16px; 
            /* #032bbc; */
          }
          span.cardValue {
            color: rgba(214, 233, 248, 0.37); 
            word-break: auto-phrase;
            font-family: Montserrat;
            font-size:16px; 
            display:inherit;
            /* #009879; */
          }
          span.title {
            color: rgb(35, 163, 198);
            margin-top: 10px;
            font-weight: bold;
          }
          span.title.true {
            font-size: 18px;
          }
          span.title.false {
            font-size: 18px;
          }
        </style>
        <div style="display: flex; flex-direction: column; text-align: center;">
          ${void 0===elem||void 0===elem.title?lit.s6:lit.qy` <p>
                <span class="title ${isSecondLevel}"
                  >${elem.title["label_"+this.lang]}</span
                >
              </p>`}

          <div
            style="display: flex; flex-direction: row; text-align: center; flex-wrap:wrap; "
          >
            <div class="layout horizontal center flex wrap">
              ${this.getButton(elem,dataArr,!0)}
            </div>
            ${void 0===elem.columns?lit.qy`No columns defined`:lit.qy`
                  ${Object.entries(dataArr).sort().map((([key,value])=>lit.qy`
                          <table class="styled-table-bygroup">
                            <thead>
                              <tr>
                                <th
                                  style="color:#24c0eb; background-color: #d6e9f8; text-transform:uppercase; font-size:16px;"
                                  colspan=" ${elem.columns.length} "
                                >
                                  ${key}
                                </th>
                              </tr>
                              <tr class="headercolumns">
                                ${elem.columns.map((fld=>lit.qy`
                                      ${!0===this.fieldsToDiscard(fld)?lit.s6:lit.qy`<td
                                            style="background-color:#7ccee6; color: white; font-weight: bold;"
                                          >
                                            ${fld["label_"+this.lang]}
                                          </td>`}
                                    `))}
                              </tr>
                            </thead>
                            <tbody>
                              ${void 0!==value&&Array.isArray(value)?lit.qy`
                                    ${value.sort().map((p=>lit.qy`
                                          <tr>
                                            ${elem.columns.map((fld=>lit.qy`
                                                  ${!0===this.fieldsToDiscard(fld)?lit.s6:lit.qy`
                                                        ${"pretty_spec"===fld.name?lit.qy`
                                                              <td>
                                                                <span
                                                                  style="color:green"
                                                                  >${p["spec_text_green_area_"+this.lang]}</span
                                                                >
                                                                <span
                                                                  style="color:orange"
                                                                  >${p["spec_text_yellow_area_"+this.lang]}</span
                                                                >
                                                                <span
                                                                  style="color:red"
                                                                  >${p["spec_text_red_area_"+this.lang]}</span
                                                                >
                                                              </td>
                                                            `:lit.qy`
                                                              ${void 0!==fld.as_progress&&!0===fld.as_progress?lit.qy`
                                                                    <style>
                                                                      .w3-responsive {
                                                                        display: block;
                                                                        overflow-x: auto;
                                                                      }
                                                                      .w3-container,
                                                                      .w3-panel {
                                                                        padding: 0.01em
                                                                          4px;
                                                                      }
                                                                      .w3-panel {
                                                                        margin-top: 16px;
                                                                        margin-bottom: 16px;
                                                                      }
                                                                      .w3-container:after,
                                                                      .w3-container:before,
                                                                      .w3-panel:after,
                                                                      .w3-panel:before,
                                                                      .w3-row:after,
                                                                      .w3-row:before,
                                                                      .w3-row-padding:after,
                                                                      .w3-row-padding:before,
                                                                      .w3-blue,
                                                                      .w3-hover-blue:hover {
                                                                        color: rgba(
                                                                          7,
                                                                          13,
                                                                          22,
                                                                          0.94
                                                                        ) !important;
                                                                        background-color: #2196f3 !important;
                                                                      }
                                                                      .w3-background,
                                                                      .w3-hover-blue:hover {
                                                                        color: rgba(
                                                                          7,
                                                                          13,
                                                                          22,
                                                                          0.94
                                                                        ) !important;
                                                                        background-color: #ffdedd !important;
                                                                      }
                                                                      .title {
                                                                        font-size: 8px;
                                                                        font-weight: 500;
                                                                        letter-spacing: 0;
                                                                        line-height: 1.5em;
                                                                        padding-bottom: 15px;
                                                                        position: relative;
                                                                        font-family: Montserrat;
                                                                        font-color: rgb(
                                                                          94,
                                                                          145,
                                                                          186
                                                                        );
                                                                      }
                                                                    </style>
                                                                    <td>
                                                                      <div
                                                                        class="w3-container"
                                                                      >
                                                                        <div
                                                                          class="w3-background w3-round-xlarge"
                                                                          title="${this.titleLang(fld)}"
                                                                        >
                                                                          <div
                                                                            class="w3-container w3-blue w3-round-xlarge"
                                                                            style="width:${p[fld.name]}%"
                                                                          >
                                                                            ${p[fld.name]}%
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                      <br />
                                                                    </td>
                                                                  `:lit.qy`
                                                                    <td>
                                                                      ${void 0!==fld.fix_value_prefix?fld.fix_value_prefix:""}${p[fld.name]}${void 0!==fld.fix_value_suffix?fld.fix_value_suffix:""}
                                                                      ${void 0!==fld.fix_value2_prefix?fld.fix_value2_prefix:""}${void 0!==fld.name2?p[fld.name2]:""}${void 0!==fld.fix_value2_suffix?fld.fix_value2_suffix:""}
                                                                      ${void 0!==fld.fix_value3_prefix?fld.fix_value3_prefix:""}${void 0!==fld.name3?p[fld.name3]:""}${void 0!==fld.fix_value3_suffix?fld.fix_value3_suffix:""}
                                                                    </td>
                                                                  `}
                                                            `}
                                                      `}
                                                `))}
                                          </tr>
                                        `))}
                                  `:lit.qy`No Data`}
                            </tbody>
                          </table>
                        `))}
                `}
          </div>
        </div>
      `}handleTableRowClick(event,rowSelected,elem){let rowIndex=-1;void 0!==this.selectedItems&&(rowIndex=this.selectedItems.findIndex((item=>JSON.stringify(item)===JSON.stringify(rowSelected)))),-1!==rowIndex?this.selectedItems.splice(rowIndex,1):(void 0!==elem.allowMultiSelection&&!1!==elem.allowMultiSelection||(this.selectedItems=[]),this.selectedItems.push(rowSelected)),!function isEqual(obj1,obj2){return JSON.stringify(obj1)===JSON.stringify(obj2)}(this.selectedItem,rowSelected)?this.selectedItem=rowSelected:this.selectedItem={},0==rowSelected[elem.children]?void 0!==elem.openWhenNoData&&!1!==elem.openWhenNoData||(alert("There is no data"),this.selectedItem=[]):this.selectedItem=rowSelected,sessionStorage.setItem("rowSelectedData",JSON.stringify(rowSelected)),this.render();const popup=this.shadowRoot.querySelector(".js-context-popup");popup.contains(event.target)||(popup.style.display="none")}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleKeyDown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleKeyDown)}handleKeyDown(event){"Escape"===event.key&&(contextMenu.style.display="none")}handleOpenContextMenu(event,rowSelected,elem){console.log("elem",elem),event.preventDefault();const popup=this.shadowRoot.querySelector(".js-context-popup");contextMenu=popup,popup.innerHTML="";let menuOptionsArr=[];void 0!==elem.rowButtonsAsContextMenu&&!0===elem.rowButtonsAsContextMenu?menuOptionsArr=elem.row_buttons:void 0!==elem.contextmenu_buttons&&(menuOptionsArr=elem.contextmenu_buttons),menuOptionsArr.map(((item,i)=>{let newIcon=document.createElement("mwc-icon-button");newIcon.setAttribute("icon",item.button.icon),newIcon.style.color="white";let newLabel=document.createElement("label");newLabel.textContent=item.button.title["label_"+this.lang];let newDiv=document.createElement("div");newDiv.style.display="flex",newDiv.style.flexDirection="row",newDiv.style.alignItems="center",newDiv.style.cursor="pointer",newDiv.appendChild(newIcon),newDiv.appendChild(newLabel),newDiv.addEventListener("click",(e=>this.actionMethod(e,item,menuOptionsArr,null,null,rowSelected,!1))),popup.appendChild(newDiv)})),popup.addEventListener("click",(()=>this.contextMenuItemAction(popup))),popup.style.left=`${event.clientX}px`,popup.style.top=`${event.clientY}px`,popup.style.display="flex",popup.style.flexDirection="column",document.body.addEventListener("click",this.closeContextMenu)}closeContextMenu(e){contextMenu.style.display="none"}contextMenuItemAction(e){e.style.display="none"}resetFilterIndex(elem){const endPointResponseObject=elem.endPointResponseObject;if(this.selectedTableIndex={...this.selectedTableIndex,[endPointResponseObject]:void 0},elem.children_definition){const childElement={...elem.children_definition,endPointResponseObject:elem.children};this.resetFilterIndex(childElement)}}parentReadOnlyTable(elem,dataArr,isSecondLevel,directData,alternativeTitle,parentElement,theme,parentData){dataArr=void 0!==directData?directData:this.getDataFromRoot(elem,dataArr);const childElement={...elem.children_definition,endPointResponseObject:elem.children},endPointResponseObject=elem.endPointResponseObject,selectedIdx=this.selectedTableIndex[endPointResponseObject];let childDataArr;return void 0!==dataArr&&void 0!==dataArr[0]&&(childDataArr=void 0!==selectedIdx?dataArr[selectedIdx][elem.children]:void 0,void 0===parentData&&(parentData=void 0!==selectedIdx?dataArr[0]:void 0)),lit.qy`
        ${this.readOnlyTable(elem,void 0,isSecondLevel,dataArr,alternativeTitle,((event,p,elem,idx)=>{const endPointResponseObject=elem.endPointResponseObject,isToggling=this.selectedTableIndex[endPointResponseObject]===idx;this.resetFilterIndex(elem),isToggling||(this.selectedTableIndex={...this.selectedTableIndex,[endPointResponseObject]:idx})}),(elem=>{this.resetFilterIndex(elem)}),parentElement,theme,parentData)}
        ${childDataArr&&childDataArr.length>0?this.parentReadOnlyTable(childElement,void 0,isSecondLevel,childDataArr,alternativeTitle,elem,theme,parentData):lit.s6}
      `}rolesAndActions(elem,dataArr,isSecondLevel=!1,lang,directData,theme){let tmp=elem.theme;return void 0===tmp&&(tmp="TRAZiT-UsersArea"),lit.qy`
        <style>
          table.styled-table-for-rolesandactions th{
            color:gray !important;
          }

          .title {
            color: #2989d8;
            font-size: 18px;
            font-weight: bold;
          }

          table.styled-table-for-rolesandactions th, td{
            border: none !important;
          }

          table.styled-table-for-rolesandactions tr:nth-child(even) {
            background-color: white !important;
          }

          table.styled-table-for-rolesandactions tr {
            border: none;
            border-bottom: 1px solid #dddddd;
          }
          
          table.styled-table-for-rolesandactions tr:last-child {
            border: none;
          }

          * {
            box-sizing: border-box;
          }

        table.TRAZiT-DefinitionArea thead tr th {
          background-color: #2989d8;
          color: white !important;
        }

        table.TRAZiT-UsersArea thead tr th {
          background-color: white;
          color: gray;
        }

        table {
          border-collapse: collapse;
          width: 100%;
          font-family: Montserrat;
          font-size: 16px;
        }

        table.TRAZiT-UsersArea tr {
          border: none; 
          border-bottom: 1px solid #dddddd;
        }

        tr {
          border: 1px solid #dddddd;
          text-align: center;
          color: #808080;
        }

        table.TRAZiT-UsersArea tr:nth-child(even) {
          background-color: white;
        }

        table.TRAZiT-UsersArea tr:last-child {
          border: none;
        }
     
        table.TRAZiT-UsersArea thead {
          border-bottom: 1px solid #dddddd;
        }

        table.TRAZiT-DefinitionArea tr:nth-child(even) {
          background-color: rgba(214, 233, 248, 0.37) !important;
        }

        table.TRAZiT-DefinitionArea th {
          padding: 5px 5px;
          border: 1px solid #dddddd !important;
        }

        td, th {
          padding: 5px 5px;
          border: 1px solid #dddddd !important;
        }

        table.TRAZiT-UsersArea td, th {
          border: none !important;
        }

        tr {
          cursor: pointer;
        }

        mwc-icon-button {
        --mdc-icon-button-size: 35px;
        --mdc-icon-size: 25px;
        }
        
        td.absent {
          background-color: #e0121257;
        }
        
        td.present {
          background-color: #5e80003d;
        }

        table tr:hover td.title1 {
          background-color: #2989d830 !important;
        }
        table td {
          font-size: 16px !important;
          font-family: "Montserrat";
        }
        </style>
        <div style="display: flex; flex-direction: column; text-align: center;">
          ${void 0===elem||void 0===elem.title?lit.s6:lit.qy` <p>
                <span class="title ${isSecondLevel}"
                  >${elem.title["label_"+this.lang]}</span
                >
              </p>`}
       
          <table class="styled-table-for-rolesandactions ${tmp}" style="margin-top:24px;">
            <thead>
              <tr>
                ${void 0===dataArr||void 0===dataArr[0]?lit.qy`${"en"==this.lang?"Not applicable":"No aplica"}`:lit.qy`
                      ${dataArr[0].map((fld=>lit.qy`
                            ${"object"==typeof fld?lit.qy`${!0===this.fieldsToDiscard(fld)?lit.s6:lit.qy`<th
                                      style="text-align: center; color:white; font-weight:normal;"
                                    >
                                      ${fld.label}
                                    </th>`} `:lit.qy`
                                  <th style="text-align: center; color:white; font-weight:normal;">
                                    ${fld}
                                  </th>
                                `}
                          `))}
                    `}
              </tr>
            </thead>
            <tbody>
              ${void 0===dataArr||void 0===dataArr[0]?lit.s6:lit.qy`
                    ${dataArr.map(((p,iRow)=>lit.qy`
                          ${0==iRow?lit.s6:lit.qy`
                                <tr>
                                  ${p.map(((fld,iCol)=>lit.qy`
                                        ${0==iCol||1==iCol?lit.qy` ${"object"==typeof dataArr[0][iCol]?lit.qy`
                                                  ${!0===this.fieldsToDiscard(dataArr[0][iCol])?lit.s6:lit.qy`<td
                                                        class="title1"
                                                        style="font-size: 1.6vmin; font-weight: unset; font-family: Montserrat;"
                                                      >
                                                        ${fld}
                                                      </td>`}
                                                `:lit.qy`<td>${fld}</td>`}`:lit.qy`
                                              ${void 0!==fld&&fld.length>0?lit.qy`<td
                                                    class="present"
                                                    title="Assigned"
                                                  >
                                                    ${"ALL"===fld?"es"===this.lang?"TODOS":"ALL":fld}
                                                  </td>`:lit.qy`<td
                                                    class="absent"
                                                    title="NOT assigned"
                                                  ></td>`}
                                            `}
                                      `))}
                                </tr>
                              `}
                        `))}
                  `}
            </tbody>
          </table>
        </div>
      `}kpiCardSomeElementsSingleObject(elem,data1){return lit.qy`
        <style>
        .cardItem {
          display: flex;
          flex-direction: row; /* Ensures items are laid out in a row */
          align-items: center; /* Aligns items vertically in the center */
        }
        
        .cardLabel {
          color: blue; /* Set your desired color for the label */
          margin-right: 8px; /* Space between the label and value */
        }
        
        .cardValue {
          color: green; /* Set your desired color for the value */
        }
        
        </style>
        ${this.kpiCardSomeElementsMain(elem,this.getDataFromRoot(elem,data1))}          
      `}cardExpandSectionForScriptStep(elem,data1){let jsonElem={endPointPropertyArray:["ROOT"],style:"background-color:white;"};return lit.qy`
        ${this.scriptStepArguments(elem,data1)}        
        ${this.jsonViewer(jsonElem,JSON.parse(data1.dynamic_data))}
        'tester notes:'${data1.tester_notes}
      `}cardSomeElementsRepititiveObjects(elem,data1){return data1=this.getDataFromRoot(elem,data1),lit.qy`
        ${Array.isArray(data1)&&data1.length>0?lit.qy`
              ${data1.map((d=>lit.qy` ${this.kpiCardSomeElementsMain(elem,d)} `))}
            `:lit.s6}
      `}dataContainsRequiredProperties(elem,dataArr){if(void 0===dataArr)return!1;if(void 0===elem.mantadoryPropertiesInVariableName)return!0;return elem.mantadoryPropertiesInVariableName.every((curProp=>Array.isArray(dataArr)?void 0!==dataArr[0]&&void 0!==dataArr[0][curProp]:void 0!==dataArr[curProp]))}get dialogEl(){return this.shadowRoot.querySelector("div#dialog-frame")}get iframeEl(){return this.shadowRoot.querySelector("iframe#my-iframe")}get videosourceEl(){return this.shadowRoot.querySelector("source#video-source")}openDialogFrame(e){console.log(e.currentTarget.isvideo),this.dialogEl.style.display="block";const{width,height}=this.dialogEl.getBoundingClientRect();if(void 0!==e.currentTarget.isvideo&&!1!==e.currentTarget.isvideo||(this.iframeEl.src=e.currentTarget.src+"#toolbar=0"),void 0!==e.currentTarget.isvideo&&!0===e.currentTarget.isvideo){const mimeUrl=e.currentTarget.src.match(/(?<=src=")(.*?)(?=")/)[0];this.videosourceEl.src=mimeUrl}console.log(" window.innerWidth;",window.innerWidth),this.dialogEl.style.marginTop="200px",this.dialogEl.style.marginLeft="316px",window.innerWidth<800&&(this.dialogEl.style.marginLeft="100px"),this.dialogEl.style.border="1px solid rgb(36, 192, 235)",this.dialogEl.style.width=.65*window.innerWidth+"px"}closeDialogFrame(){this.dialogEl.style.display="none"}keyPressDialogFrame(e){alert("key"),"Escape"==e.key&&(this.dialogEl.style.display="none"),27==e.keyCode&&(this.dialogEl.style.display="none")}stopOthers(v){this.shadowRoot.querySelectorAll("video").forEach((vid=>{vid.id!=v&&vid.pause()}))}buttonsOnly(elem,data1){return lit.qy`
        ${void 0===elem||void 0===elem.title?lit.s6:lit.qy`<span
                style="color: rgb(20, 115, 230);font-size: 30px;margin-top: 10px;font-weight: bold;"
                >${elem.title["label_"+this.lang]}</span
              >`}
                <div style="flex-basis: auto; width: auto;">
                  ${this.getButton(elem,data1,!1)}
                </div>
              </div>
            `}kpiCardSomeElementsMain(elem,data1){return console.log("kpiCardSomeElementsMain","elem",elem,"data",data1),Array.isArray(data1)&&data1.length>0&&(data1=data1[0]),lit.qy`
        ${void 0===elem||void 0===elem.title?lit.s6:lit.qy`<span
              style="color: rgb(20, 115, 230);font-size: 30px;margin-top: 10px;font-weight: bold;"
              >${elem.title["label_"+this.lang]}</span
            >`}
        ${void 0===data1?lit.qy`${void 0!==elem.hideNoDataMessage&&elem.hideNoDataMessage?"":"No columns defined"}`:lit.qy`
              <style>
                ul.column-list {
                  -webkit-columns: var(
                    --num-columns,
                    3
                  ); /* Number of columns */
                  -moz-columns: var(--num-columns, 3);
                  columns: var(--num-columns, 3);
                  -webkit-column-gap: 10px; /* Spacing between columns */
                  -moz-column-gap: 10px;
                  column-gap: 10px;
                  list-style-type: none;
                  padding: 0;
                  margin: 0;
                }
                ul.column-list1 {
                  -webkit-columns: 1; /* Number of columns */
                  -moz-columns: 1;
                  columns: 1;
                  -webkit-column-gap: 10px; /* Spacing between columns */
                  -moz-column-gap: 10px;
                  column-gap: 10px;
                  list-style-type: none;
                  padding: 0;
                  margin: 0;
                }
                ul.column-list2 {
                  -webkit-columns: 2; /* Number of columns */
                  -moz-columns: 2;
                  columns: 2;
                  -webkit-column-gap: 10px; /* Spacing between columns */
                  -moz-column-gap: 10px;
                  column-gap: 10px;
                  list-style-type: none;
                  padding: 0;
                  margin: 0;
                }
                ul.column-list3 {
                  -webkit-columns: var(
                    --num-columns,
                    3
                  ); /* Number of columns */
                  -moz-columns: var(--num-columns, 3);
                  columns: var(--num-columns, 3);
                  -webkit-column-gap: 10px; /* Spacing between columns */
                  -moz-column-gap: 10px;
                  column-gap: 10px;
                  list-style-type: none;
                  padding: 0;
                  margin: 0;
                }
                ul.column-list4 {
                  -webkit-columns: 4; /* Number of columns */
                  -moz-columns: 4;
                  columns: 4;
                  -webkit-column-gap: 10px; /* Spacing between columns */
                  -moz-column-gap: 10px;
                  column-gap: 10px;
                  list-style-type: none;
                  padding: 0;
                  margin: 0;
                }

                ul.column-list li {
                  display: inline-block;
                  width: 100%;
                  margin-bottom: 10px;
                  margin-left: 30px;
                  hyphens: auto;
                  word-break: break-all;
                  left: -17px;
                  position: RELATIVE;
                }
                span.relevantlabel {
                  font-weight: bold;
                  font-size: 16px;
                }
                span.label {
                  font-weight: bold;
                }
                div#mainaddborder {
                  border: 0.72px solid rgba(36, 192, 235, 1);
                  border-radius: 10px;
                  padding: 10px;
                  margin-right: 2px;
                  overflow: hidden;
                  flex-basis: calc(33.33% - 10px);
                  position: relative;                  
                  left: -12px;   
                  align-content: flex-start;               
                }
                iframe {
                  width: 100%;
                  height: 250px;
                  flex: 1;
                }
                /* Dialog styles */
                .dialog {
                  display: none;
                  position: fixed;
                  z-index: 9999;
                  top: 0;
                  left: 0;
                  width: 1000px;
                  height: 600px;
                  background-color: white; /* rgba(0, 0, 0, 0.5); */
                }

                /* Iframe styles */
                #my-iframe {
                  width: 100%;
                  height: 100%;
                  border: none;
                  flex: 1;
                }
                @keyframes slidein {
                  from {
                    margin-left: 30%;
                  }
                  to {
                    margin-left: 0%;
                  }
                }
                @media (max-width: 460px) {
                }
                iframe::shadow
                  .pdf-viewer::content
                  #controls
                  ::slotted(.SwitchToReadingMode-Small14) {
                  display: none;
                }
                .card-container {
                  display: flex;
                  flex-wrap: wrap;
                }

                .card {
                  flex: 0 0 calc(33.33% - 20px);
                  margin: 10px;
                  border: 1px solid #ccc;
                  padding: 10px;
                }

                @media (max-width: 768px) {
                  .card {
                    flex: 0 0 calc(50% - 20px);
                  }
                }

                @media (max-width: 480px) {
                  .card {
                    flex: 0 0 calc(100% - 20px);
                  }
                }
              </style>
              <div data-index="${elem.index}"
                id="main${void 0!==elem.add_border&&1==elem.add_border?"addborder":""}"
                class="layout vertical flex wrap"
                style="${void 0!==elem.style?elem.style:""}"
              >
                <div style="flex-basis: auto; width: auto;">
                  ${this.getButton(elem,data1,!0)}
                </div>
                <ul
                  style="align-items: baseline;"
                  class="column-list${void 0!==elem.num_columns?elem.num_columns:""}"
                >
                ${void 0===elem.fieldsToDisplay?lit.s6:lit.qy`
                  ${elem.fieldsToDisplay.map(((fld,i)=>lit.qy`
                        ${!0===this.fieldsToDiscard(fld)?lit.s6:lit.qy`                              
                              ${void 0===fld.as_ppt||!0!==fld.as_ppt&&!0!==fld.as_video?lit.qy`
                                ${void 0!==fld.is_tag_list&&!0===fld.is_tag_list?lit.qy`   
                                <span class="cardLabel" style="${void 0!==elem.styleForLabel?elem.styleForLabel:""}">${this.fieldLabel(fld)}:</span>
                                <span class="cardValue" style="${void 0!==elem.styleForValue?elem.styleForValue:""}">
                                  <multi-select .label=${this.purpose} .props=${{readOnly:!0,displayLabel:!1}} .activeOptions=${data1[fld.name]} .options=${{}}> </multi-select>
                                </span>
                                `:lit.qy`                                      
                                    ${void 0!==fld.as_progress&&!0===fld.as_progress?lit.qy`
                                          <style>
                                            .w3-responsive {
                                              display: block;
                                              overflow-x: auto;
                                            }
                                            .w3-container,
                                            .w3-panel {
                                              padding: 0.01em 4px;
                                            }
                                            .w3-panel {
                                              margin-top: 16px;
                                              margin-bottom: 16px;
                                              border-radius: 5px;
                                              box-shadow: 0px 0px 5px
                                                rgba(0, 0, 0, 0.1);
                                            }
                                            .w3-container:after,
                                            .w3-container:before,
                                            .w3-panel:after,
                                            .w3-panel:before,
                                            .w3-row:after,
                                            .w3-row:before,
                                            .w3-row-padding:after,
                                            .w3-row-padding:before,
                                            .w3-blue,
                                            .w3-hover-blue:hover {
                                              color: rgba(
                                                7,
                                                13,
                                                22,
                                                0.94
                                              ) !important;
                                              background-color: #2196f3 !important;
                                            }
                                            .w3-background,
                                            .w3-hover-blue:hover {
                                              color: rgba(
                                                7,
                                                13,
                                                22,
                                                0.94
                                              ) !important;
                                              background-color: #ffdedd !important;
                                            }
                                            .title {
                                              font-size: 18px;
                                              font-weight: 500;
                                              letter-spacing: 0;
                                              line-height: 1.5em;
                                              padding-bottom: 15px;
                                              position: relative;
                                              font-family: Montserrat;
                                              font-color: rgb(94, 145, 186);
                                            }
                                            span.cardMainLabel {
                                              font-weight: bold;
                                              color: rgb(41, 137, 216); /* #032bbc; */
                                            }
                                            span.cardMainValue {            
                                              color: rgba(214, 233, 248, 0.37); /* #009879; */
                                            }
                                          </style>
                                          <div class="w3-container">
                                            <div
                                              class="w3-background w3-round-xlarge"
                                              title="${this.titleLang(fld)}"
                                            >
                                              <div
                                                title="${this.titleLang(fld)}"
                                                class="w3-container w3-blue w3-round-xlarge"
                                                style="width:${data1[fld.name]}%"
                                              >
                                                ${fld.name}:
                                                ${void 0===data1[fld.name]||0==data1[fld.name].length?"0":data1[fld.name]}%
                                              </div>
                                            </div>
                                          </div>
                                          <br />
                                        `:lit.qy`
                                          ${this.cardField(fld,data1)}                                        
                                        `}
                                  `}
                                `:lit.qy`
                                    <mwc-icon-button
                                      icon="fullscreen"
                                      .isvideo=${data1.is_video}
                                      .src=${data1[fld.name]}
                                      @click=${this.openDialogFrame}
                                      .fld=${fld}
                                    ></mwc-icon-button>
                                    ${void 0===data1.is_video||!1===data1.is_video?lit.qy`
                                          <iframe
                                            src=${data1[fld.name]}
                                            @click=${this.openDialogFrame}
                                          ></iframe>
                                          <div id="dialog-frame" class="dialog">
                                            <mwc-icon-button
                                              icon="fullscreen_exit"
                                              @click=${this.closeDialogFrame}
                                            ></mwc-icon-button>
                                            <iframe
                                              id="my-iframe"
                                              controls
                                              controlsList="nodownload"
                                            ></iframe>
                                          </div>
                                        `:lit.qy`
                            <video id="${data1[fld.name]}-${i}" controls slot="cover-photo"
                            @play=${()=>this.stopOthers(`${data1[fld.name]}-${i}`)}>
                            <source type="video/mp4" src="${data1[fld.name]}">
                            </video>
<!---
                              <video controls type="video/mp4" src=${data1[fld.name]} controlsList="nodownload"oncontextmenu="return false" onselectstart="return false" ondragstart="return false"></video>
                              <div id="dialog-frame" class="dialog">
                              <mwc-icon-button icon="fullscreen_exit" @click=${this.closeDialogFrame}></mwc-icon-button> 
                                <video id="video-source" type="video/mp4" controls controlsList="nodownload"oncontextmenu="return false" onselectstart="return false" ondragstart="return false" >
                                </video>-->
                              </div>
                            `}
                                  `}  
                            `}
                      `))}
                `}
                </ul>
              </div>
            `}
      `}cardField(fld,data1){if(void 0!==fld.fix_value_suffix||void 0!==fld.name2)return void 0===data1[fld.name]&&void 0!==fld.hideNoDataMessage&&!0===fld.hideNoDataMessage?lit.qy``:lit.qy`
          <li class="cardItem" style="${void 0!==fld.styleForBlock?fld.styleForBlock:""}">
            <span class="cardLabel" style="${void 0!==fld.styleForLabel?fld.styleForLabel:""}">
              ${this.fieldLabel(fld)}:
            </span>
            <span class="cardValue" style="${void 0!==fld.styleForValue?fld.styleForValue:""}">
              ${data1[fld.name]}
              ${void 0!==fld.fix_value_suffix?fld.fix_value_suffix:""}
              ${void 0!==fld.fix_value2_prefix?fld.fix_value2_prefix:""}
              ${void 0!==fld.name2?data1[fld.name2]:""}
              ${void 0!==fld.fix_value2_suffix?fld.fix_value2_suffix:""}
              ${void 0!==fld.fix_value3_prefix?fld.fix_value3_prefix:""}
              ${void 0!==fld.name3?data1[fld.name3]:""}
              ${void 0!==fld.fix_value3_suffix?fld.fix_value3_suffix:""}
            </span>
          </li>`;if(void 0!==fld.paragraph){let fldValue=(0,unsafe_html._)(this.getDynamicData(fld.paragraph,data1,this.lang));if(void 0===fldValue&&void 0!==fld.hideNoDataMessage&&!0===fld.hideNoDataMessage)return lit.qy``;let fldLabel=this.fieldLabel(fld);return lit.qy`
        <li class="cardItem" style="${void 0!==fld.styleForBlock?fld.styleForBlock:""}">
          ${void 0===fldLabel?lit.s6:lit.qy`
            <span class="cardLabel" style="${void 0!==fld.styleForLabel?fld.styleForLabel:""}">
              ${fldLabel}:
            </span>
          `}
          <span class="cardValue" style="${void 0!==fld.styleForValue?fld.styleForValue:""}">
            ${fldValue}
          </span>
        </li>        
        `}return void 0!==data1[fld.name]&&0!=data1[fld.name].length||void 0===fld.hideNoDataMessage||!0!==fld.hideNoDataMessage?lit.qy`
        <li class="cardItem" style="${void 0!==fld.styleForBlock?fld.styleForBlock:""}">
          <span class="cardLabel" style="${void 0!==fld.styleForLabel?fld.styleForLabel:""}">
            ${this.fieldLabel(fld)}:
          </span>          
          <span class="cardValue" style="${void 0!==fld.styleForValue?fld.styleForValue:""}">
            ${void 0!==fld.is_icon&&!0===fld.is_icon?lit.qy`${this.cellIsIcon(fld,data1,void 0)}`:lit.qy`${data1[fld.name]}`}
          </span>
        </li>
      `:void 0!==fld.KeepJustLabelWhenNoDataMessage&&!0===fld.KeepJustLabelWhenNoDataMessage?lit.qy`
          <li class="cardItem" style="${void 0!==fld.styleForBlock?fld.styleForBlock:""}">
            <span class="cardLabel" style="${void 0!==fld.styleForLabel?fld.styleForLabel:""}">
              ${this.fieldLabel(fld)}:
            </span>
          </li>
          `:lit.qy``}fieldLabel(fld){return void 0!==fld.hideLabel&&!0===fld.hideLabel?"":void 0!==fld["label_"+this.lang]?fld["label_"+this.lang]:fld.name}dialogs(){return console.log("DataViews dialogs"),lit.qy` ${this.credentialsDialog()} ${this.genericFormDialog()}  ${this.reactivateObjectsDialog()}`}loadDialogs(){return console.log("DataViews loadDialogs"),lit.qy`
        ${this.credentialsDialog()} ${this.genericFormDialog()}
        ${this.reactivateObjectsDialog()}
        ${this.moduleEnvMonitMicroorganismsDialogAdd()}
        ${this.moduleEnvMonitMicroorganismsDialogRemove()}
        ${this.pointTemplate()} ${this.resultTemplate()}
        ${this.investigationTemplate()}
        ${"open"==this.filterName?lit.qy`${this.decisionTemplate()}`:lit.s6}
        ${this.decisionTemplate()}
      `}kpiCard(elem,data1=this.data,isProcManagement){let myDataArr=[];return Array.isArray(data1)?myDataArr=data1:myDataArr.push(data1),lit.qy`
              ${data1?lit.qy`
                      <style>
                        li.cardelement {
                          color: #032bbc;
                        }
                        .card {
                          position: relative;
                          display: inline-block;
                          margin: 10px;
                        }
                        .ribbon {
                          width: 0;
                          height: 0;
                          border-top: 50px solid #f44336;
                          content: "";
                        }
                        <div
                          class="ribbons"
                          > <p
                          > New</p
                          > </div
                          > .ribbon::before {
                          width: 0;
                          height: 0;
                          border-left: 60px solid transparent;
                          content: "";
                        }

                        .ribbon p {
                          position: absolute;
                          margin: 0;
                          padding: 5px 15px;
                          color: #fff;
                          transform: rotate(45deg);
                          background-color: #f44336;
                          font-size: 14px;
                          z-index: 9;
                        }
                      </style>
                      <div class="layout horizontal flex wrap">
                        ${myDataArr.map((curData=>lit.qy`
                              ${this.loadDialogs()}
                              <div class="card">
                                <sp-card-ext
                                  heading="${void 0===elem.title?"":void 0===elem.title["label_"+this.lang]?"-":elem.title["label_"+this.lang]}"
                                  subheading="${void 0===elem.subtitle?"":void 0===elem.subtitle["label_"+this.lang]?"-":elem.subtitle["label_"+this.lang]}"
                                >
                                  <div slot="ribbon"></div>
                                  <div slot="footer">
                                    <div
                                      class="layout horizontal center flex wrap"
                                    >
                                      ${this.getButton(elem,curData,isProcManagement)}
                                    </div>
                                    ${void 0===elem.fieldsToDisplay?lit.s6:elem.fieldsToDisplay.map((d=>lit.qy`<li class="cardelement">
                                              ${d["label_"+this.lang]}:
                                              ${curData[d.field_name]}${void 0!==d.fix_value_suffix?d.fix_value_suffix:""}
                                              ${void 0!==d.fix_value2_prefix?d.fix_value2_prefix:""}${void 0!==d.name2?curData[d.field_name2]:""}${void 0!==d.fix_value2_suffix?d.fix_value2_suffix:""}
                                              ${void 0!==d.fix_value3_prefix?d.fix_value3_prefix:""}${void 0!==d.name3?curData[d.field_name3]:""}${void 0!==d.fix_value3_suffix?d.fix_value3_suffix:""}
                                            </li>`))}
                                  </div>
                                </sp-card-ext>
                              </div>
                              <audit-dialog
                                @sign-audit=${this.setAudit}
                                .actionBeingPerformedModel=${this.actionBeingPerformedModel}
                                .filterName=${this.filterName}
                                .lang=${this.lang}
                                .windowOpenable=${this.windowOpenable}
                                .sopsPassed=${this.sopsPassed}
                                .procInstanceName=${this.procInstanceName}
                                .viewName=${this.viewName}
                                .viewModelFromProcModel=${this.viewModelFromProcModel}
                                .selectedItems=${this.selectedItems}
                                .config=${this.config}
                              ></audit-dialog>
                            `))}
                      </div>
                    `:lit.s6}
              </div>
            `}kpiStyleByStringAttribute(elType,elem){let defaultOptions="";"title"&&(defaultOptions="width:300px;color:blue;"),"div"&&(defaultOptions="display:flex");this.shadowRoot.querySelector("div#"+elem.elementName);return void 0===elem.style?defaultOptions:elem.style}kpiChartFran(elem,data1){return void 0===elem?lit.qy``:(void 0!==elem.endPointPropertyArray&&(data1=this.getDataFromRoot(elem,data1)),void 0!==elem.grouper_field_name&&data1[elem.grouper_field_name]||void 0!==elem.counter_field_name&&data1[elem.counter_field_name]?void 0!==elem.hideNoDataMessage&&!0===elem.hideNoDataMessage&&void 0===data1?lit.qy``:(void 0===data1&&void 0!==this.data&&(data1=this.data),lit.qy`
        ${!0!==elem.display_chart?lit.s6:lit.qy`
              ${this.chartStyle(elem.chart_name)}
              <google-chart
                id="${elem.chart_name}"
                title="${elem.chart_title["label_"+this.lang]}"
                type="${elem.chart_type}"
                .data="${this.getChartData(elem,data1)}"
                .options="${this.getChartOptions(elem)}"
              ></google-chart>
            `}
      `):lit.qy``)}chartStyle(chartName){let chartObj=this.shadowRoot.querySelector("google-chart#"+chartName);null!=chartObj&&chartObj.style.setProperty("width","1600px")}addNumericValue(rule,value){return null==rule||null!=value&&(!(null!=rule.min_allowed&&value<=rule.min_allowed)&&(!(rule.min_allowed_included<void 0&&value<rule.min_allowed_included)&&(!(null!=rule.max_allowed&&value>=rule.max_allowed)&&(!(rule.max_allowed_included>void 0&&value>rule.max_allowed_included)&&(null==rule.value||rule.value!=value)))))}getChartData(elem,data1){let chartData=[],fakeData=[];if("fakeTrendlineExample"===elem.elementName)return fakeData=[["Diameter","Age"],[8,37],[4,19.5],[11,52],[4,22],[3,16.5],[6.5,32.8],[14,72]],fakeData;if("cdatatable"===elem.elementName)return fakeData=[["Day","Guardians of the Galaxy","The Avengers","Transformers: Age of Extinction"],[1,37.8,80.8,41.8],[2,30.9,69.5,32.4],[3,25.4,57,25.7],[4,11.7,18.8,10.5],[5,11.9,17.6,10.4],[6,8.8,13.6,7.7],[7,7.6,12.3,9.6],[8,12.3,29.2,10.6],[9,16.9,42.9,14.8],[10,12.8,30.9,11.6],[11,5.3,7.9,4.7],[12,6.6,8.4,5.2],[13,4.8,6.3,3.6],[14,4.2,6.2,3.4]],fakeData;if("methodValidation"===elem.chartModel)return this.getChartDataForMethodValidation(elem,data1);if(void 0===data1&&void 0!==this.data&&(data1=this.data),void 0!==data1||void 0!==elem.chart_name&&void 0!==data1[elem.chart_name]||(void 0!==this.selectedItem?data1=this.selectedItem:void 0!==this.selectedItemInView&&(data1=this.selectedItemInView)),void 0!==data1&&void 0!==data1[elem.chart_name]){let dataForChart=data1[elem.chart_name],seriesArr=[];Array.isArray(elem.counter_field_name)?seriesArr=elem.counter_field_name:seriesArr.push(elem.counter_field_name);let curchtHeader=[];curchtHeader.push(elem.label_item);for(let iSerie=0;iSerie<seriesArr.length;iSerie++)curchtHeader.push(seriesArr[iSerie]);chartData.push(curchtHeader);for(let iData=0;iData<dataForChart.length;iData++)if(!elem.grouper_exclude_items.includes(dataForChart[iData][elem.grouper_field_name]))for(let iSerie=0;iSerie<seriesArr.length;iSerie)if(this.addNumericValue(elem.counterLimits,dataForChart[iData][seriesArr[iSerie]])){let curchtval=[];curchtval.push(this.labelPossibleReplacement(elem,dataForChart[iData][elem.grouper_field_name]));for(let iSerie=0;iSerie<seriesArr.length;iSerie++)curchtval.push(dataForChart[iData][seriesArr[iSerie]]);chartData.push(curchtval)}}return chartData}labelPossibleReplacement(elem,labelValue){if(void 0!==elem.label_values_replacement){let fld=elem.label_values_replacement[labelValue];if(void 0!==fld)return fld["label_"+this.lang]}return labelValue}getChartDataForMethodValidationFran(elem,data1){let chartData=[];if(void 0===data1||void 0===elem)return chartData;for(let iSerie=0;iSerie<data1[chartSourceData].length;iSerie++){let curchtHeader=[];curchtHeader[0]=data1[chartSourceData][xAxisSouceData],curchtHeader[1]=data1[chartSourceData][sourceData],chartData.push(curchtHeader)}return chartData}getChartDataForMethodValidation(elem,data1){let chartData=[];if(void 0===data1||void 0===elem)return chartData;const chartSourceData1=data1[elem.chartSourceData];if(!chartSourceData1||!Array.isArray(chartSourceData1))return chartData;let curchtHeader=[];curchtHeader[0]=elem.xAxisSourceData,curchtHeader[1]=elem.sourceData,chartData.push(curchtHeader);for(let iSerie=0;iSerie<chartSourceData1.length;iSerie++){let curchtHeader=[],currentData=chartSourceData1[iSerie];void 0!==currentData[elem.xAxisSourceData]&&void 0!==currentData[elem.sourceData]&&(curchtHeader[0]=Number(currentData[elem.xAxisSourceData]),curchtHeader[1]=Number(currentData[elem.sourceData]),chartData.push(curchtHeader))}return chartData}getChartOptions(elem){if("fakeTrendlineExample"===elem.elementName)return{title:"Age of sugar maples vs. trunk diameter, in inches",hAxis:{title:"Diameter"},vAxis:{title:"Age"},legend:"none",trendlines:{0:{}}};let defaultChartOptions={width:"300px",backgroundColor:"transparent",is3D:!0},chartOptions={};return void 0!==elem.chart_title&&(chartOptions.title=elem.chart_title["label_"+this.lang]),void 0===elem.chartStyle?Object.entries(defaultChartOptions).map((([key,val])=>{chartOptions[key]=val})):Object.entries(elem.chartStyle).map((([key,val])=>{chartOptions[key]=val})),chartOptions}kpiCharts(elem){return lit.qy`
        <datamining-google-chart-ext
          id="chart1"
          @redrawed=${e=>this.dispatchEvent(new CustomEvent("chart-images",{detail:{imgUri:e.target.imageURI}}))}
          style="margin: 5px 5px 30px 8px"
          type="line"
          options='{"height": ${this.chartH}, "width": ${this.chartW}}'
        ></datamining-google-chart-ext>
        <datamining-google-chart-ext
          id="chart2"
          @redrawed=${e=>this.dispatchEvent(new CustomEvent("chart-images",{detail:{imgUri:e.target.imageURI}}))}
          style="margin: 5px 5px 30px 8px"
          type="line"
          options='{"height": ${this.chartH}, "width": ${this.chartW}}'
        ></datamining-google-chart-ext>
      `}EnvMonAirSampleBrowser(){if(void 0===this.data.sampleFieldToRetrieve)return lit.qy``;let header="Report for the ";return header+=`sample ${this.data.sampleFieldToRetrieve.sample_id}`,lit.qy`${this.data.sampleFieldToRetrieve?lit.qy`
            <sp-card-ext
              heading="Report for the sample"
              subheading="${this.data.sampleFieldToRetrieve.sample_id}"
            >
              <div slot="footer">
                ${this.data.sampleFieldsToDisplay.map((d=>lit.qy`<li class="cardItem">${d.field_name}: ${d.field_value}</li>`))}
              </div>
            </sp-card-ext>
            <sp-card-ext heading="Stages" nonSubHeading>
              <div slot="footer" class="layout vertical">
                ${this.data.stages.map((d=>lit.qy`
                      ${this.stageTitle(d.current_stage)}
                      ${this.stageTimingCapture(d)}
                      <sp-card-ext
                        heading="${d.current_stage}"
                        ?nonSubHeading=${!d.started_on}
                        subheading="${d.started_on}${d.ended_on&&` >> ${d.ended_on}`}"
                      >
                        <div slot="footer">
                          ${"Sampling"==d.current_stage?lit.qy`
                                ${d.data.map((data1=>lit.qy`<li class="cardItem">
                                      ${data1.field_name}: ${data1.field_value}
                                    </li>`))}
                              `:lit.qy`${"Incubation"==d.current_stage?lit.qy`
                                    ${d.data.map((data1=>lit.qy`
                                          <sp-card-ext
                                            heading="Incubation 1"
                                            nonSubHeading
                                          >
                                            <div slot="footer">
                                              ${data1.incubation_1.map((f=>lit.qy`${f.field_name?lit.qy`<li class="cardItem">
                                                        ${f.field_name}:
                                                        ${f.field_value}
                                                      </li>`:lit.s6}`))}
                                            </div>
                                          </sp-card-ext>
                                          <sp-card-ext
                                            heading="Incubation 2"
                                            nonSubHeading
                                          >
                                            <div slot="footer">
                                              ${data1.incubation_2.map((f=>lit.qy`${f.field_name?lit.qy`<li class="cardItem">
                                                        ${f.field_name}:
                                                        ${f.field_value}
                                                      </li>`:lit.s6}`))}
                                            </div>
                                          </sp-card-ext>
                                        `))}
                                  `:lit.qy`${"PlateReading"==d.current_stage?lit.qy`
                                        ${d.data.map((data1=>lit.qy`${"raw_value"==data1.field_name?lit.qy`<li class="cardItem">
                                                  Number of Colonies:
                                                  ${data1.field_value}
                                                </li>`:lit.s6}`))}
                                      `:lit.qy`${"MicroorganismIdentification"==d.current_stage?lit.qy`
                                            ${d.data.map((data1=>lit.qy`${"microorganism_count"===data1.field_name||"microorganism_list"===data1.field_name?lit.qy`<li class="cardItem">
                                                      ${data1.field_name}:
                                                      ${data1.field_value}
                                                    </li>`:lit.s6}`))}
                                          `:lit.qy`
                                            ${d.data.map((data1=>lit.qy`${"name"==data1.field_name?lit.qy`${data1.field_name}:
                                                    ${data1.field_value}`:lit.s6}`))}
                                          `}`}`}`}
                        </div>
                        ${"Sampling"==d.current_stage?lit.qy`<mwc-icon
                              slot="actions"
                              title="Open"
                              placement="bottom-end"
                              ?hidden=${"END"==this.data.sampleFieldToRetrieve.current_stage}
                              @click=${this.openSample}
                              >file_open</mwc-icon
                            >`:lit.s6}
                      </sp-card-ext>
                    `))}
              </div>
            </sp-card-ext>
          `:lit.qy`Sample ID: ${data.sample_id}`}`}EnvMonAirSampleReportTitle(){return"Report for the sample "+this.data.buttonActionInfo.objectId}EnvMonAirSampleReportContent(){let strContent="<h2>Summary</h2>";return this.data.sampleFieldsToDisplay.forEach((d=>{strContent+=`<li class="cardItem">${d.field_name}: ${d.field_value}</li>`})),strContent+="<h2>Stages</h2>",this.data.stages.forEach((d=>{strContent+=`<table border="1" cellpadding="3" style="margin-bottom: 10px; border-collapse: collapse; width: 100%;"><tr><th>${d.current_stage}<br>${d.started_on}${d.ended_on&&` >> ${d.ended_on}`}</th></tr><tr><td>`,"Sampling"==d.current_stage?d.data.forEach((data1=>{strContent+=`Sampling Date: ${data1.sampling_date}`})):"Incubation"==d.current_stage?d.data.forEach((data1=>{strContent+='<table border="1" cellpadding="3" style="border-collapse: collapse; width: 100%;"><tr><th>Incubation 1</th><th>Incubation 2</th></tr><tr>',strContent+="<td>",data1.incubation_1.forEach((f=>{f.field_name&&(strContent+=`<li class="cardItem">${f.field_name}: ${f.field_value}</li>`)})),strContent+="</td><td>",data1.incubation_2.forEach((f=>{f.field_name&&(strContent+=`<li class="cardItem">${f.field_name}: ${f.field_value}</li>`)})),strContent+="</td></tr></table>"})):"PlateReading"==d.current_stage?d.data.forEach((data1=>{"raw_value"==data1.field_name&&(strContent+=`Number of Colonies: ${data1.field_value}`)})):"MicroorganismIdentification"==d.current_stage?d.data.forEach((data1=>{"microorganism_list"==data1.field_name&&(strContent+=`Colonies Identified: ${data1.field_value}`)})):d.data.forEach((data1=>{strContent+=`<li class="cardItem">${data1.name}: ${data1.items}</li>`})),strContent+="</td></tr></table>"})),strContent}EnvMonAirIncubatorBrowser(){return lit.qy`${this.data.incubatorFieldToRetrieve?lit.qy`
            <div class="layout horizontal flex wrap">
              <sp-card-ext
                heading="Report for the incubator"
                subheading="${this.data.incubatorFieldToRetrieve.name}"
              >
                <div slot="footer">
                  ${this.data.incubatorFieldsToDisplay.map((d=>lit.qy`<li class="cardItem">${d.field_name}: ${d.field_value}</li>`))}
                </div>
              </sp-card-ext>
              <google-chart-ext
                id="chart1"
                @redrawed=${e=>this.dispatchEvent(new CustomEvent("chart-images",{detail:{imgUri:e.target.imageURI}}))}
                style="margin: 5px 5px 30px 8px"
                type="line"
                options='{"height": ${this.chartH}, "width": ${this.chartW}}'
              ></google-chart-ext>
            </div>
          `:lit.s6}`}EnvMonAirBatchBrowser(){return lit.qy`${this.data.batchFieldToRetrieve?lit.qy`
            <div class="layout horizontal flex wrap">
              <sp-card-ext
                heading="Report for the batch"
                subheading="${this.data.batchFieldToRetrieve.name}"
              >
                <div slot="footer">
                  ${this.data.batchFieldsToDisplay.map((d=>lit.qy`<li class="cardItem">${d.field_name}: ${d.field_value}</li>`))}
                </div>
              </sp-card-ext>
              <google-chart-ext
                id="chart1"
                @redrawed=${e=>this.dispatchEvent(new CustomEvent("chart-images",{detail:{imgUri:e.target.imageURI}}))}
                style="margin: 5px 5px 30px 8px"
                type="line"
                options='{"height": ${this.chartH}, "width": ${this.chartW}}'
              ></google-chart-ext>
            </div>
            <sp-card-ext
              heading="Batch Content (${this.data.NUM_SAMPLES} samples)"
              nonSubHeading
            >
              <div slot="footer" class="layout horizontal flex wrap">
                ${this.data.SAMPLES_ARRAY.map(((d,i)=>lit.qy`${d.sample_id}${i<this.data.SAMPLES_ARRAY.length-1?", ":""}`))}
              </div>
            </sp-card-ext>
          `:lit.s6}`}EnvMonProductionLotBrowser(){return lit.qy`${this.data.prodLotFieldToRetrieve?lit.qy`
            <div class="layout horizontal flex wrap">
              <sp-card-ext
                heading="Report for the production lot"
                subheading="${this.data.prodLotFieldToRetrieve.name}"
              >
                <div slot="footer">
                  ${this.data.prodLotFieldsToDisplay.map((d=>lit.qy`<li class="cardItem">${d.field_name}: ${d.field_value}</li>`))}
                </div>
              </sp-card-ext>
              <google-chart-ext
                id="chart1"
                @redrawed=${e=>this.dispatchEvent(new CustomEvent("chart-images",{detail:{imgUri:e.target.imageURI}}))}
                style="margin: 5px 5px 30px 8px"
                type="line"
                options='{"height": ${this.chartH}, "width": ${this.chartW}}'
              ></google-chart-ext>
              <google-chart-ext
                id="chart2"
                @redrawed=${e=>this.dispatchEvent(new CustomEvent("chart-images",{detail:{imgUri:e.target.imageURI}}))}
                style="margin: 5px 5px 30px 8px"
                type="line"
                options='{"height": ${this.chartH}, "width": ${this.chartW}}'
              ></google-chart-ext>
            </div>
            <div class="layout horizontal flex center-justified">
              <mwc-button
                label="Download Sample"
                @click=${this.downloadSample}
              ></mwc-button>
            </div>
          `:lit.s6}`}stageTitle(currentStage){return lit.qy` <h1>${currentStage}</h1> `}stageTimingCapture(stageData){return lit.qy` <h3>${stageData.started_on} --> ${stageData.ended_on}</h3> `}EnvMonAirIncubatorReportContent(strContent){return this.data.incubatorFieldsToDisplay&&this.data.incubatorFieldsToDisplay.forEach((d=>{strContent+=`<li class="cardItem">${d.field_name}: ${d.field_value}</li>`})),strContent}chartContent(){let imgs="";return this.chartImgs.forEach((img=>{imgs+=`<img src="${img}" style="margin-bottom=10px;"><br>`})),imgs}incubatorContentTitle(){return"Report for the incubator "+this.data.incubatorFieldToRetrieve.name}EnvMonAirBatchReportContent(strContent){if(this.sampleData.batchFieldsToDisplay){this.sampleData.batchFieldsToDisplay.forEach((d=>{strContent+=`<li class="cardItem">${d.field_name}: ${d.field_value}</li>`})),strContent+=this.chartContent();let batches=this.sampleData.SAMPLES_ARRAY.map((d=>d.sample_id));strContent+=`<table border="1" cellpadding="3" style="margin: 10px auto; border-collapse: collapse; width: 100%;"><tr><th>Batch Content (${this.sampleData.NUM_SAMPLES} samples)</th></tr><tr><td>${batches.join(", ")}</td></tr></table>`}return strContent}EnvMonProductionLotReportContent(strContent){return this.data.prodLotFieldsToDisplay&&(this.data.prodLotFieldsToDisplay.forEach((d=>{strContent+=`<li class="cardItem">${d.field_name}: ${d.field_value}</li>`})),strContent+=this.chartContent(),strContent+='<br><table border="1" cellpadding="3" style="margin-top: 10px; border-collapse: collapse; width: 100%;">',strContent+="<tr><th>Sample ID</th><th>Sampling Date</th><th>Sampling Date End</th><th>Raw Value</th></tr>",this.data.sample.forEach((s=>{s.spec_code&&(strContent+=`<tr><td>${s.sample_id}</td><td>${s.sampling_date}</td><td>${s.sampling_date_end}</td><td>${s.raw_value?s.raw_value:""}</td></tr>`)})),strContent+="</table>"),strContent}EnvMonProductionLotReportTitle(){return"Report for the Production Lot "+this.data.prodLotFieldToRetrieve.lot_name}sampleContent(strContent){return this.data.sampleFieldsToDisplay&&"Sample"==this.activeTab.label_en&&(this.data.sampleFieldsToDisplay.forEach((d=>{strContent+=`<li class="cardItem">${d.field_name}: ${d.field_value}</li>`})),strContent+="<h2>Stages</h2>",this.data.stages.forEach((d=>{strContent+=`<table border="1" cellpadding="3" style="margin-bottom: 10px; border-collapse: collapse; width: 100%;"><tr><th>${d.current_stage}<br>${d.started_on}${d.ended_on&&` >> ${d.ended_on}`}</th></tr><tr><td>`,"Sampling"==d.current_stage?d.data.forEach((data1=>{strContent+=`Sampling Date: ${data1.sampling_date}`})):"Incubation"==d.current_stage?d.data.forEach((data1=>{strContent+='<table border="1" cellpadding="3" style="border-collapse: collapse; width: 100%;"><tr><th>Incubation 1</th><th>Incubation 2</th></tr><tr>',strContent+="<td>",data1.incubation_1.forEach((f=>{f.field_name&&(strContent+=`<li class="cardItem">${f.field_name}: ${f.field_value}</li>`)})),strContent+="</td><td>",data1.incubation_2.forEach((f=>{f.field_name&&(strContent+=`<li class="cardItem">${f.field_name}: ${f.field_value}</li>`)})),strContent+="</td></tr></table>"})):"PlateReading"==d.current_stage?d.data.forEach((data1=>{"raw_value"==data1.field_name&&(strContent+=`Number of Colonies: ${data1.field_value}`)})):d.data.forEach((data1=>{strContent+=`<li class="cardItem">${data1.name}: ${data1.items}</li>`})),strContent+="</td></tr></table>"}))),strContent}titleLang(colDef){return void 0!==colDef.title?colDef.title["label_"+this.lang]:colDef.name}fieldsToDiscard(fld){return void 0!==fld.is_translation&&!1!==fld.is_translation&&(!0!==fld.is_translation||!fld.name.endsWith(this.lang))}get audit(){return this.shadowRoot.querySelector("audit-dialog")}toggleFilterVisibility(element){const filterDiv=this.shadowRoot.getElementById("smartFilterDiv");filterDiv.classList.contains("hidden")?(filterDiv.classList.remove("hidden"),filterDiv.classList.add("visible")):(filterDiv.classList.remove("visible"),filterDiv.classList.add("hidden"))}handleFilter(elem){this.requestUpdate()}toggleFilter(){let filter=this.shadowRoot.querySelector(".search-container");filter.style.display="none"===filter.style.display?"flex":"none"}updateFilterValue(elem,event){const input=event.target,value=input.value,name=input.getAttribute("name");name&&(elem.smartFilter.filterValues[name]=value)}clearFilter(elem,context){context.shadowRoot.querySelector(".search-container").querySelectorAll("input").forEach((elm=>{elm.value=""})),elem.smartFilter.filterValues={},this.requestUpdate()}isNumeric(str){return"string"==typeof str&&(!isNaN(str)&&!isNaN(parseFloat(str)))}applyFilterToTheData(curDataForThisCard,filterValues){let hasFilters=!1;const uniqueItemsSet=new Set;for(const key in filterValues){let filterValue=filterValues[key];if(null!=filterValue&&String(filterValue).length>0){hasFilters=!0;Number(filterValue);if(this.isNumeric(filterValue)?filterValue=Number(filterValue):"true"!==filterValue.toLowerCase()&&"false"!==filterValue.toLowerCase()||(filterValue="true"===filterValue.toLowerCase()),Array.isArray(curDataForThisCard)){curDataForThisCard.filter((item=>{if(void 0!==item[key]&&null!==item[key]){const itemValue=item[key];if("string"==typeof itemValue&&"string"==typeof filterValue)return itemValue.toLowerCase().includes(filterValue.toLowerCase());if("number"==typeof itemValue&&"number"==typeof filterValue)return itemValue===filterValue;if("boolean"==typeof itemValue&&"boolean"==typeof filterValue)return itemValue===filterValue}return!1})).forEach((item=>uniqueItemsSet.add(item)))}}}return hasFilters?Array.from(uniqueItemsSet):curDataForThisCard}readOnlyTable(elem,dataArr,isSecondLevel,directData,alternativeTitle,handler,handleResetParentFilter,parentElement,theme,parentData){if(void 0===elem)return;parentData=this.selectedItemInView;let tmp=elem.theme?elem.theme:"TRAZiT-UsersArea";"procedure_user_requirements_tree_child"==elem.endPointResponseObject&&(tmp=sessionStorage.getItem("tableTheme")),sessionStorage.setItem("tableTheme",tmp);const endPointResponseObject=elem.endPointResponseObject;this.selectedTableIndex[endPointResponseObject];if(void 0===isSecondLevel&&(isSecondLevel=!1),dataArr=void 0!==directData?directData:this.getDataFromRoot(elem,dataArr),!this.dataContainsRequiredProperties(elem,dataArr))return lit.s6;if(void 0===dataArr||!Array.isArray(dataArr))return lit.qy``;dataArr.length>0&&dataArr[0].action_name&&sessionStorage.setItem("steps",JSON.stringify(dataArr));const styles=this.getTableStyles(elem),title=this.addViewTitle(elem,alternativeTitle,isSecondLevel),actionButtons=this.getActionsButtons(elem,dataArr,this.selectedItems);dataArr&&elem?.smartFilter?.filterValues&&0!=Object.keys(elem?.smartFilter?.filterValues).length&&(dataArr=this.applyFilterToTheData(dataArr,elem.smartFilter.filterValues));const sortData=(field,ascending)=>{dataArr.sort(((a,b)=>a[field]<b[field]?ascending?-1:1:a[field]>b[field]?ascending?1:-1:0)),this.requestUpdate()},isItemSelected=item=>this.selectedItems&&this.selectedItems.some((selected=>JSON.stringify(selected)===JSON.stringify(item)));let smartFilter={applyFilterButton:{title:{label_en:"Apply Filter",label_es:"Aplicar Filtro"}},clearFilterButton:{title:{label_en:"Clear Filter",label_es:"Limpiar Filtro"}},displayFilterButton:{title:{label_en:"Display/Hide Filter",label_es:"Mostrar/Ocultar Filtro"}}};void 0!==elem&&void 0!==elem.smartFilter&&void 0!==elem.smartFilter.applyFilterButton&&void 0!==elem.smartFilter.applyFilterButton.title&&(smartFilter.applyFilterButton.title=elem.smartFilter.applyFilterButton.title),void 0!==elem&&void 0!==elem.smartFilter&&void 0!==elem.smartFilter.clearFilterButton&&void 0!==elem.smartFilter.clearFilterButton.title&&(smartFilter.clearFilterButton.title=elem.smartFilter.clearFilterButton.title),void 0!==elem&&void 0!==elem.smartFilter&&void 0!==elem.smartFilter.displayFilterButton&&void 0!==elem.smartFilter.displayFilterButton.title&&(smartFilter.displayFilterButton.title=elem.smartFilter.displayFilterButton.title);let smartFilterVisible=!1;return smartFilterVisible=elem.columns.some((column=>!0===column.addToSmartFilter)),lit.qy`
      ${styles}
      <div style="display: flex; flex-direction: row; text-align: center; align-items: baseline; width: 100%;">
        <div style="display: flex; flex-direction: column; text-align: center; width: 100%;">
          ${title}          
          <div class="layout horizontal center flex wrap">            
            ${elem?.smartFilter?.filterValues&&smartFilterVisible&&lit.qy`               
              <mwc-icon-button id="smartfilter"	icon="filter_alt"title="Filter" @click=${e=>this.toggleFilter()}></mwc-icon-button>
            `}
            ${actionButtons}
          </div>
          ${void 0===elem.columns?lit.qy`${void 0!==elem.hideNoDataMessage&&elem.hideNoDataMessage?"":"No columns defined"}`:lit.qy`
                <style>
                  * {
                    font-family: 'Montserrat', sans-serif;
                  }
                  .table-container {
                    max-height: 400px; /* Adjust the height as needed */
                    overflow-y: auto;
                    overflow-x: auto;
                    width: 100%;
                  }
                  .styled-table {
                    width: 100%;
                    border-collapse: collapse;
                  }
                  .styled-table thead th {
                    position: sticky;
                    top: 0;
                    background: #fff; /* Adjust background as needed */
                    z-index: 1;
                  }
                  .styled-table th, .styled-table td {
                    padding: 10px;
                    border: 1px solid #ddd;
                    text-align: left;
                  }
                  .styled-table tbody tr:nth-child(even) {
                    background-color: #f2f2f2;
                  }
                  .styled-table tbody tr:hover {
                    background-color: #ddd;
                  }
                  .styled-table tbody tr.selected-row {
                    background-color: #FFDDB3; /* Highlight color for selected rows */
                  }
                  .sort-icons {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                  }
                  .sort-icon {
                    cursor: pointer;
                    display: block;
                    width: 0;
                    height: 0;
                    border-left: 7px solid transparent;
                    border-right: 7px solid transparent;
                    margin-left: 5px;
                    position: relative;
                  }
                  .sort-asc {
                    border-bottom: 10px solid #4c7fad;
                  }
                  .sort-desc {
                    border-top: 10px solid #4c7fad;
                  }
                  .sort-icon:hover::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    top: 25px;
                    left: 10px;
                    background: #b6d6f3;
                    color: white;
                    padding: 5px;
                    border-radius: 5px;
                    white-space: nowrap;
                    z-index: 10;
                    font-family: 'Montserrat', sans-serif;
                  }
                  @media screen and (max-width: 768px) {
                    .styled-table th, .styled-table td {
                      padding: 8px;
                      font-size: 14px;
                    }
                  }
                  .search-container {
                    background: #fff;
                    padding: 10px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    max-width: 100%;
                    margin: 0 auto;
                    margin-left: 10px;
                  }
  
                  .search-input {
                    display: flex;
                    flex-wrap: nowrap;
                    margin-right: 10px;
                    width: 100%;
                  }
  
                  .search-input input {
                    flex: 1;
                    padding: 10px;
                    margin-right: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
                    transition: border-color 0.3s, box-shadow 0.3s;
                  }
  
                  .search-input input:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 123, 255, 0.3);
                  }
  
                  .search-buttons {
                    display: flex;
                  }
  
                  .search-buttons button {
                    padding: 10px 20px;
                    margin-left: 10px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s, box-shadow 0.3s;
                  }
  
                  .search-buttons button:hover {
                    background-color: #007bff;
                  }
  
                  .search-buttons button:active {
                    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
                  }
  
                  .search-buttons .apply-filter {
                    background-color: #007bff;
                    color: white;
                  }
  
                  .search-buttons .clear-filter {
                    background-color: #6c757d;
                    color: white;
                  }
  
                  .toggle-filter {
                    display: flex;
                    width: 120px;
                    background-color: #007bff;
                    color: white;
                    padding: 10px 20px;
                    margin-left: 10px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s, box-shadow 0.3s;               
                    transition: color 0.3s;
                  }
  
                  .toggle-filter:hover {
                    color: #fff;
                  }
                </style>
                ${elem?.smartFilter?.filterValues&&smartFilterVisible&&lit.qy`                                         
                    <div class="search-container">
                      <!--  <div class="search-input">
                            ${elem.columns.map((column=>lit.qy`
                                <input type="text" id="${column.name}" name="${column.name}" placeholder="${column.label_en}">
                            `))}
                        </div> -->
                          <div class="search-input">
                      ${elem.columns.map((column=>lit.qy`
                        ${void 0!==column.addToSmartFilter&&!0===column.addToSmartFilter?lit.qy`
                          <input 
                              type="text" 
                              id="${column.name}" 
                              name="${column.name}" 
                              placeholder="${column.label_en}"
                              @input="${e=>this.updateFilterValue(elem,e)}">
                        `:lit.s6}
                      `))}
                  </div>
                        <div class="search-buttons">
                            <button class="apply-filter" @click="${()=>this.handleFilter(elem,this)}">Apply</button>
                            <button class="clear-filter" @click="${()=>this.clearFilter(elem,this)}">Clear</button>
                        </div>
                    </div>
                    `}
                <div class="table-container">
                  <table data-index="${elem.index}" id=${elem.endPointResponseObject} class="styled-table read-only ${tmp}">
                    <thead>
                      <tr>
                        ${elem.allowMultiSelection?lit.qy`<th><input type="checkbox" @change=${event=>{event.target.checked?this.selectedItems=[...dataArr]:this.selectedItems=[],this.requestUpdate()}}></th>`:lit.s6}
                        ${elem.columns.map(((fld,idx)=>{const fieldName=fld.name;return 0===idx&&null!=parentElement?lit.qy`
                              <th>
                                <mwc-icon-button class="icon resetBtn" icon="refresh" @click=${()=>handleResetParentFilter(parentElement)}></mwc-icon-button>
                                ${fld["label_"+this.lang]}
                                <span class="resize-handle"></span>
                                <div class="sort-icons">
                                  <span class="sort-icon sort-asc" data-tooltip="${"es"===this.lang?"Orden ascendente":"Sort ascending"}" @click=${()=>sortData(fieldName,!0)}></span>
                                  <span class="sort-icon sort-desc" data-tooltip="${"es"===this.lang?"Orden descendente":"Sort descending"}" @click=${()=>sortData(fieldName,!1)}></span>
                                </div>
                              </th>`:lit.qy`
                            <th>
                              ${fld["label_"+this.lang]}
                              <span class="resize-handle"></span>
                              <div class="sort-icons">
                                <span class="sort-icon sort-asc" data-tooltip="${"es"===this.lang?"Orden ascendente":"Sort ascending"}" @click=${()=>sortData(fieldName,!0)}></span>
                                <span class="sort-icon sort-desc" data-tooltip="${"es"===this.lang?"Orden descendente":"Sort descending"}" @click=${()=>sortData(fieldName,!1)}></span>
                              </div>
                            </th>`}))}
                        ${void 0===elem.row_buttons?lit.s6:lit.qy`<th>${"en"===this.lang?"Actions":"Acciones"} <span class="resize-handle"></span></th>`}
                      </tr>
                    </thead>
                    <tbody>
                      <div class="js-context-popup"></div>
                      ${void 0!==dataArr&&Array.isArray(dataArr)?lit.qy`
                            ${dataArr.map(((p,rowIndex)=>{const isSelected=isItemSelected(p);return lit.qy`
                                <tr
                                  @click=${event=>{handler&&p[elem.children]&&p[elem.children].length>0&&(void 0!==elem.openWhenNoData&&!1!==elem.openWhenNoData||handler(event,p,elem,rowIndex)),this.handleTableRowClick(event,p,elem)}}
                                  @contextmenu=${event=>this.handleOpenContextMenu(event,p,elem)}
                                  class="${isSelected?"selected-row":""}"
                                >
                                  ${elem.allowMultiSelection?lit.qy`<td><input type="checkbox" ?checked=${isSelected}></td>`:lit.s6}
                                  ${this.getRowsInfo(elem,p,rowIndex,this.lang,parentData,handler)}
                                </tr>
                                ${void 0!==elem.expandInfoSection?lit.qy`
                                      <table-row-detail id="detail${rowIndex}" .data="${p}" .elem="${elem}">
                                        <div slot="details"></div>
                                      </table-row-detail>
                                    `:lit.qy``}
                              `}))}
                          `:lit.qy`No Data`}
                    </tbody>
                  </table>
                </div>
              `}
        </div>
      </div>
    `}dragDropBoxes(elem,data1){return Promise.all([__webpack_require__.e(949),__webpack_require__.e(527),__webpack_require__.e(568)]).then(__webpack_require__.bind(__webpack_require__,"./src/components/DragDropBox/drag-box.js")),lit.qy`
      <drag-box .windowOpenable=${!0} .sopsPassed=${!0} .lang=${this.lang}
      .procInstanceName="RandD" .desktop=${!0} .viewName="rdprojects" .filterName="rdprojects" 
      .model=${elem} ?ready="false"
      .viewModelFromProcModel=${elem} .config=${this.config}></drag-box>      
  
      `}dragDropObjects(elem,data1){return Promise.all([__webpack_require__.e(949),__webpack_require__.e(527),__webpack_require__.e(515)]).then(__webpack_require__.bind(__webpack_require__,"./src/components/DragDropTable/drag-drop.js")),console.log("elem",elem,"data",data1),lit.qy`
        <drag-drop .windowOpenable=${this.windowOpenable} .sopsPassed=${this.sopsPassed} .lang=${this.lang}
          .procInstanceName=${this.procName} .desktop=${this.desktop} .viewName=${this.viewName} .filterName=${this.filterName} 
          .model=${elem} ?ready="true" .data=${data1}
          .viewModelFromProcModel=${elem} .config=${this.config}></drag-drop>      
      `}calendar(elem,data1){__webpack_require__.e(206).then(__webpack_require__.bind(__webpack_require__,"./src/components/Calendar/index.js"));let dataArr=this.getDataFromRoot(elem,data1);console.log("calendar","elem",elem,"data",data1,"dataArr",dataArr);let events={program_calendar:{calendar_id:1,program_name:"LlenadoViales",program_config_version:1,schedule_size_unit:"MONTHS",schedule_size:12,viewCurrentDate:"today",start_date:"2023-11-01",end_date:"2024-12-31",day_of_week:"MONDAY",holidays_calendar:[{id:1,description_en:"Spanish labor calendar",description_es:"Calendario laboral español",dates:[{id:1,date:"2023-11-02",description_en:"King's day",description_es:"Dia de los Reyes"}]}],program_calendar_recursive_entry:[{id:1,start_date:"2023-01-01",end_date:"2023-01-31",purpose_en:"All Fridays on January",purpose_es:"Todos los viernes de Enero"}]}};if(void 0!==dataArr){let holidayDay={created_on:"2023-11-01",instrument:"All saints",is_holidays:!0};dataArr.push(holidayDay);let holidayDay2={created_on:"2023-11-16",instrument:"Invented holidays",is_holidays:!0};dataArr.push(holidayDay2),events.program_calendar.dates=dataArr}return lit.qy`
        <calendar-component .fakeData=${!1} .windowOpenable=${this.windowOpenable} .sopsPassed=${this.sopsPassed} .lang=${this.lang}
          .procInstanceName=${this.procName} .desktop=${this.desktop} .viewName=${this.viewName} .filterName=${this.filterName} 
          .model=${elem} ?ready="true" .dataAllInOneData=${events}
          .viewModelFromProcModel=${elem} .config=${{datesDateField:"created_on",eventListsFields:[{field:"instrument",label_en:"Instrument",label_es:"Instrumento"},{field:"event_type",label_en:"Event",label_es:"Evento"}],hoverDateDialog:{entryTitleFld:"instrument",eventListsFields:[{field:"instrument",label_en:"Instrument",label_es:"Instrumento"},{field:"event_type",label_en:"Event",label_es:"Evento"}],dialogWidth:"300px",dialogHeight:"300px"}}}></calendar-component>      
      `}}}},"./src/components/grid_with_buttons/GridFunctions.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>GridFunctions});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/lit-vaadin-helpers/dist/index.js"),_Buttons_ButtonsFunctions__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/Buttons/ButtonsFunctions.js");function GridFunctions(base){return class extends((0,_Buttons_ButtonsFunctions__WEBPACK_IMPORTED_MODULE_2__.n)(base)){getTitle(sectionModel=this.viewModelFromProcModel){let textToDisplay=this.filterName;if(void 0===this.filterName||"undefined"===this.filterName?textToDisplay=sectionModel.langConfig.title["label_"+this.lang]:sectionModel.langConfig&&sectionModel.langConfig.title[this.filterName]&&(textToDisplay=sectionModel.langConfig.title[this.filterName]["label_"+this.lang]),void 0!==textToDisplay&&"undefined"!==textToDisplay||(textToDisplay=""),this.disabledByCertification({})){let title={label_en:"( Read Only Mode) ",label_es:"( Modo Lectura ) "};return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <style>
                        h1 .readonly{
                            color: #FF00006B;
                            font-style: oblique;
                        }
                    </style>
                    <h1>${textToDisplay}<span class="readonly"> ${title["label_"+this.lang]}</span></h1>`}return lit__WEBPACK_IMPORTED_MODULE_0__.qy`<h1>${textToDisplay}</h1>`}cleanGrid(){this.selectedItems=[],this.gridItems=[],this.ready=!0}setGrid(j){this.selectedItems=[],this.gridItems=[],this.abstract?this.shadowRoot.querySelectorAll("gridmodel-bottomcomp-sampleincubation").forEach((c=>{c.siGrid&&(j&&j.samples_stillIncubationStageAndBothIncubCompleted&&j.samples_stillIncubationStageAndBothIncubCompleted.length?(c.stucksList=j.samples_stillIncubationStageAndBothIncubCompleted,c.stuckNum=c.stucksList.length,c.siGrid.items=j.samples_stillIncubationStageAndBothIncubCompleted):(c.stucksList=null,c.siGrid.items=[]),c.selectedStucks=[]),c.gridItems=c.filteredItems=j?j[c.model.filter]:[],this.batchName=null,c.selectedItems=[],c.samplesReload=!1,c.requestUpdate()})):this.gridItems=j||[],this.ready=!0,this.sampleState&&this.reloadSampleState()}gridList(viewModelFromProcModel={}){if(void 0!==viewModelFromProcModel&&void 0!==this.gridItems&&0!=this.gridItems.length)return Object.entries(viewModelFromProcModel.langConfig.gridHeader).map((([key,value],i)=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                ${viewModelFromProcModel.langConfig.gridHeader[key].is_icon?this.iconColumn(key,value,i,viewModelFromProcModel):this.nonIconColumn(key,value,i,viewModelFromProcModel)}
                `))}iconColumn(key,value,i,viewModelFromProcModel){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
            ${this.desktop?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                ${0==i?lit__WEBPACK_IMPORTED_MODULE_0__.qy`${viewModelFromProcModel.langConfig.gridHeader[key].width?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <vaadin-grid-column
                    header="${value["label_"+this.lang]}"
                    ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.iconRenderer(sample,key,i,viewModelFromProcModel.langConfig.gridHeader[key])))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align?viewModelFromProcModel.langConfig.gridHeader[key].align:"center"}"
                    width="${viewModelFromProcModel.langConfig.gridHeader[key].width}" resizable
                    ></vaadin-grid-column>
                    `:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <vaadin-grid-column
                    header="${value["label_"+this.lang]}"
                    ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.iconRenderer(sample,key,i,viewModelFromProcModel.langConfig.gridHeader[key])))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align?viewModelFromProcModel.langConfig.gridHeader[key].align:"center"}"
                    flex-grow="0"
                    ></vaadin-grid-column>
                    `}`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`${viewModelFromProcModel.langConfig.gridHeader[key].width?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                    <vaadin-grid-column
                    header="${value["label_"+this.lang]}"
                    ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.iconRenderer(sample,key,i,viewModelFromProcModel.langConfig.gridHeader[key])))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align?viewModelFromProcModel.langConfig.gridHeader[key].align:"center"}"
                    width="${viewModelFromProcModel.langConfig.gridHeader[key].width}" resizable
                    ></vaadin-grid-column>
                    `:lit__WEBPACK_IMPORTED_MODULE_0__.qy`<vaadin-grid-column
                    header="${value["label_"+this.lang]}"
                    ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.iconRenderer(sample,key,i,viewModelFromProcModel.langConfig.gridHeader[key])))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align?viewModelFromProcModel.langConfig.gridHeader[key].align:"center"}"
                    auto-width
                    ></vaadin-grid-column>`}`} 
            `:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                <vaadin-grid-column
                header="${value["label_"+this.lang]}"
                ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.iconRenderer(sample,key,i,viewModelFromProcModel.langConfig.gridHeader[key])))}
                text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align?viewModelFromProcModel.langConfig.gridHeader[key].align:"center"}"
                width="65px" resizable
                ></vaadin-grid-column>
            `}
        `}titleLang(colDef){return void 0!==colDef.title?colDef.title["label_"+this.lang]:""}iconRenderer(sample,keyName,i,colDef){return void 0!==colDef.as_progress&&colDef.as_progress?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
            <style>
            .w3-responsive{display:block;overflow-x:auto}
            .w3-container,.w3-panel{padding:0.01em 4px}.w3-panel{margin-top:16px;margin-bottom:16px}
            .w3-container:after,.w3-container:before,.w3-panel:after,.w3-panel:before,.w3-row:after,.w3-row:before,.w3-row-padding:after,.w3-row-padding:before,
            .w3-blue,.w3-hover-blue:hover{color:rgba(7, 13, 22, 0.94)!important;background-color:#2196F3!important}
            .w3-background,.w3-hover-blue:hover{color:rgba(7, 13, 22, 0.94)!important;background-color:#ffdedd!important}
            .title {
                font-size: 8px; font-weight: 500; letter-spacing: 0;
                line-height: 1.5em; padding-bottom: 15px; position: relative;
                font-family: Montserrat; font-color:rgb(94, 145, 186);
              }
            </style>
            <div class="w3-container" >
                <div class="w3-background w3-round-xlarge" title="${this.titleLang(colDef)}">
                <div class="w3-container w3-blue w3-round-xlarge" style="width:${sample[keyName]}%" >${sample[keyName]}%</div>
                </div>
            </div>
            <br>            
            `:void 0!==colDef.image_name&&"ACTIVATE_DEACTIVATE"===String(colDef.image_name).toUpperCase()?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<img src="/images/${sample[keyName]?"activate.svg":"deactivate.svg"}" style="width:20px">`:"SampleLogin"==this.filterName?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<img src="/images/labplanet.png" style="width:20px">`:"EventsInProgress"==this.viewName?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<img src="/images/inst_ev_type_${void 0!==sample.event_type?sample.event_type.toLowerCase():""}.svg" style="width:20px">`:"WhiteIpList"==this.viewName||"BlackIpList"==this.viewName?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<img src="/images/${sample.active?"activate.svg":"deactivate.svg"}" style="width:20px">`:"PlatformBusRules"==this.viewName?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<img src="/images/${sample.disabled?"activate.svg":"deactivate.svg"}" style="width:20px">`:void 0!==sample[keyName]&&!0===sample[keyName]?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<img src="/images/activate.svg" style="width:20px">`:void 0!==sample[keyName]&&!1===sample[keyName]?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<img src="/images/deactivate.svg" style="width:20px">`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`<img src="/images/icons/${this.getIconPath(sample[keyName])}" style="width:20px">`}iconRendererSrc(sample,keyName,i,colDef){return void 0!==colDef.as_progress&&colDef.as_progress?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                <style>
                .w3-responsive{display:block;overflow-x:auto}
                .w3-container,.w3-panel{padding:0.01em 4px}.w3-panel{margin-top:16px;margin-bottom:16px}
                .w3-container:after,.w3-container:before,.w3-panel:after,.w3-panel:before,.w3-row:after,.w3-row:before,.w3-row-padding:after,.w3-row-padding:before,
                .w3-blue,.w3-hover-blue:hover{color:rgba(7, 13, 22, 0.94)!important;background-color:#2196F3!important}
                .w3-background,.w3-hover-blue:hover{color:rgba(7, 13, 22, 0.94)!important;background-color:#ffdedd!important}
                .title {
                    font-size: 8px; font-weight: 500; letter-spacing: 0;
                    line-height: 1.5em; padding-bottom: 15px; position: relative;
                    font-family: Montserrat; font-color:rgb(94, 145, 186);
                  }
                </style>
                <div class="w3-container" >
                    <div class="w3-background w3-round-xlarge" title="${this.titleLang(colDef)}">
                    <div class="w3-container w3-blue w3-round-xlarge" style="width:${sample[keyName]}%" >${sample[keyName]}%</div>
                    </div>
                </div>
                <br>            
                `:void 0!==colDef.image_name&&"ACTIVATE_DEACTIVATE"===String(colDef.image_name).toUpperCase()?sample[keyName]?"/images/activate.svg":"/images/deactivate.svg":"SampleLogin"==this.filterName?"/images/labplanet.png":"EventsInProgress"==this.viewName?"/images/inst_ev_type_"+sample.event_type!==void 0?sample.event_type.toLowerCase():0:"WhiteIpList"==this.viewName?(sample.active,"activate.svg"):"BlackIpList"==this.viewName?sample.active?"/images/activate.svg":"/images/deactivate.svg":"PlatformBusRules"==this.viewName?sample.disabled?"/images/activate.svg":"/images/deactivate.svg":void 0!==sample[keyName]&&!0===sample[keyName]?"/images/activate.svg":void 0!==sample[keyName]&&!1===sample[keyName]?"/images/deactivate.svg":"/images/icons/${this.getIconPath(sample[keyName])}"}getIconPath(iconName){if(void 0===iconName)return null;const iconExtension=iconName.split(".").pop(),validExtension={jpg:".jpg",gif:".gif",svg:".svg"}[iconExtension.toLowerCase()];return validExtension?iconName+validExtension:(console.error("Unsupported icon extension:",iconExtension),null)}nonIconColumn(key,value,i,viewModelFromProcModel){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`${viewModelFromProcModel.langConfig.gridHeader[key].sort?this.sortColumn(key,value,i,viewModelFromProcModel):this.filterColumn(key,value,i,viewModelFromProcModel)}`}sortColumn(key,value,i,viewModelFromProcModel){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
            ${this.desktop?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                ${0==i?lit__WEBPACK_IMPORTED_MODULE_0__.qy`${viewModelFromProcModel.langConfig.gridHeader[key].width?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<vaadin-grid-sort-column width="${viewModelFromProcModel.langConfig.gridHeader[key].width}" resizable 
                    ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.isConfidential(sample,key,viewModelFromProcModel)))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align?viewModelFromProcModel.langConfig.gridHeader[key].align:"end"}"
                    path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-sort-column>`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`<vaadin-grid-sort-column flex-grow="0" 
                    ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.isConfidential(sample,key,viewModelFromProcModel)))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align?viewModelFromProcModel.langConfig.gridHeader[key].align:"end"}"
                    path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-sort-column>`}`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`${viewModelFromProcModel.langConfig.gridHeader[key].width?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<vaadin-grid-sort-column 
                    ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.isConfidential(sample,key,viewModelFromProcModel)))}
                    width="${viewModelFromProcModel.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-sort-column>`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`<vaadin-grid-sort-column 
                    ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.isConfidential(sample,key,viewModelFromProcModel)))}
                    resizable auto-width path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-sort-column>`}`}
            `:lit__WEBPACK_IMPORTED_MODULE_0__.qy`<vaadin-grid-sort-column width="65px" resizable 
                ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.isConfidential(sample,key,viewModelFromProcModel)))}
                text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align?viewModelFromProcModel.langConfig.gridHeader[key].align:"end"}"
                path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-sort-column>`}
        `}filterColumn(key,value,i,viewModelFromProcModel){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
            ${this.desktop?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                ${0==i?lit__WEBPACK_IMPORTED_MODULE_0__.qy`${viewModelFromProcModel.langConfig.gridHeader[key].width?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<vaadin-grid-filter-column width="${viewModelFromProcModel.langConfig.gridHeader[key].width}" resizable 
                    ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.isConfidential(sample,key,viewModelFromProcModel)))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align?viewModelFromProcModel.langConfig.gridHeader[key].align:"end"}"
                    path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-filter-column>`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`<vaadin-grid-filter-column flex-grow="0" 
                    ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.isConfidential(sample,key,viewModelFromProcModel)))}
                    text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align?viewModelFromProcModel.langConfig.gridHeader[key].align:"end"}"
                    path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-filter-column>`}`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`${viewModelFromProcModel.langConfig.gridHeader[key].width?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<vaadin-grid-filter-column 
                    ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.isConfidential(sample,key,viewModelFromProcModel)))}
                    width="${viewModelFromProcModel.langConfig.gridHeader[key].width}" resizable path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-filter-column>`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`<vaadin-grid-filter-column 
                    ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.isConfidential(sample,key,viewModelFromProcModel)))}
                    resizable auto-width path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-filter-column>`}`}
            `:lit__WEBPACK_IMPORTED_MODULE_0__.qy`<vaadin-grid-filter-column width="65px" resizable 
                ${(0,lit_vaadin_helpers__WEBPACK_IMPORTED_MODULE_1__.gh)((sample=>this.isConfidential(sample,key,viewModelFromProcModel)))}
                text-align="${viewModelFromProcModel.langConfig.gridHeader[key].align?viewModelFromProcModel.langConfig.gridHeader[key].align:"end"}"
                path="${key}" header="${value["label_"+this.lang]}"></vaadin-grid-filter-column>`}
        `}isConfidential(sample,key,viewModelFromProcModel){return void 0===viewModelFromProcModel.langConfig.gridHeader[key]?(alert("key="+key),lit__WEBPACK_IMPORTED_MODULE_0__.qy`${sample[key]}`):void 0!==viewModelFromProcModel.langConfig.gridHeader[key].confidential_value&&!0===viewModelFromProcModel.langConfig.gridHeader[key].confidential_value&&sample[key]?lit__WEBPACK_IMPORTED_MODULE_0__.qy`*****`:lit__WEBPACK_IMPORTED_MODULE_0__.qy`${sample[key]}`}}}},"./src/components/grid_with_buttons/gridCellTooltip.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var lit=__webpack_require__("./node_modules/lit/index.js"),unsafe_html=__webpack_require__("./node_modules/lit/directives/unsafe-html.js"),dynamicFieldValue=__webpack_require__("./src/features/dynamicFieldValue.js");class GridCellTooltip extends(function FeaturesObjectsAndArrays(base){return class extends base{varObjorArrAsArray(input){return"object"!=typeof input||Array.isArray(input)?input:[input]}}}((0,dynamicFieldValue.i)(lit.WF))){static get styles(){return lit.AH`
      .tooltip {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        border: 1px solid #d3d3d3;
        border-radius: 4px;
        padding: 10px;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s;
        max-width: 200px;
        word-wrap: break-word;
      }
      :host(:hover) .tooltip {
        display: block;
        opacity: 1;
      }
      .tooltip img {
        max-width: 100%;
        height: auto;
      }
      @media screen and (max-width: 600px) {
        .tooltip {
          /* Ajustes específicos para pantallas pequeñas, si son necesarios */
        }
      }
    `}static get properties(){return{element:{type:Object},data:{type:Object}}}constructor(){super(),this.element={},this.data={}}render(){if(void 0===this.element||void 0===this.element.tooltip)return lit.qy``;let tooltipArr=this.varObjorArrAsArray(this.element.tooltip);return lit.qy`
        <slot></slot>
        <div class="tooltip">
            ${tooltipArr.map(((curTip,index)=>lit.qy`
                    ${curTip.text?lit.qy`${(0,unsafe_html._)(this.getDynamicData(curTip,this.data,this.lang))}`:""}
                    ${curTip.text_en&&"en"===this.lang?lit.qy`${(0,unsafe_html._)(this.getDynamicData(curTip,this.data,this.lang))}`:""}
                    ${curTip.text_es&&"es"===this.lang?lit.qy`${(0,unsafe_html._)(this.getDynamicData(curTip,this.data,this.lang))}`:""}
                    ${curTip.field?lit.qy`${this.data[curTip.field]}`:""}
                    ${curTip.imageSrc?lit.qy`<img src="${this.imageSrc}" alt="Tooltip Image">`:""}
            `))}
        </div>
        `}}customElements.define("grid-cell-tooltip",GridCellTooltip)},"./src/components/grid_with_buttons/tableRowDetail.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),_Views_DataViews__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Views/DataViews.js");class TableRowDetail extends((0,_Views_DataViews__WEBPACK_IMPORTED_MODULE_1__.V)(lit__WEBPACK_IMPORTED_MODULE_0__.WF)){static get styles(){return lit__WEBPACK_IMPORTED_MODULE_0__.AH`
      .detail-row {
        display: none;
      }
      :host([opened]) .detail-row {
        display: table-row;
      }
    `}static get properties(){return{opened:{type:Boolean,reflect:!0},idx:{type:Number},lang:{type:String},elem:{type:Object},data:{type:Object}}}constructor(){super(),this.opened=!1,this.idx=-1,this.elem={},this.data={}}toggle(){this.opened=!this.opened}render(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
      <tr class="detail-row">
        <td colspan="100%">            
                <div slot="details">
                    <slot name="details"></slot>
                    ${this.print2LevelsObject(this.elem,this.data)}
                </div>            
        </td>
      </tr>
    `}print2LevelsObject(elem,data){return void 0===elem.expandInfoSectionDetail?lit__WEBPACK_IMPORTED_MODULE_0__.qy``:lit__WEBPACK_IMPORTED_MODULE_0__.qy`    
    ${"reportTitle"===elem.type?this.kpiReportTitle(elem,data):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
    <div style="display: flex; flex-wrap: wrap; padding-left:30px; gap: 10px">        
      ${elem.expandInfoSectionDetail.elements.map(((elem2,i)=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`
          ${void 0===elem2.is_translation||void 0!==elem2.is_translation&&!0===elem2.is_translation&&void 0!==elem2.lang&&elem2.lang===this.lang?lit__WEBPACK_IMPORTED_MODULE_0__.qy`              
            ${"reportTitle"===elem2.type?this.kpiReportTitleLvl2(elem2,data[elem.endPointResponseObject],!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${"card"===elem2.type?this.kpiCard(elem2,data[elem2.endPointResponseObject],!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${"cardSomeElementsSingleObject"===elem2.type?this.kpiCardSomeElementsSingleObject(elem2,data,!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${"cardSomeElementsRepititiveObjects"===elem2.type?this.cardSomeElementsRepititiveObjects(elem2,data,!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}              
            ${"cardExpandSectionForScriptStep"===elem2.type?this.cardExpandSectionForScriptStep(elem2,data,this.moduleName):lit__WEBPACK_IMPORTED_MODULE_0__.s6}                    
            ${"recovery_rate"===elem2.type?this.kpiRecoveryRate(elem2,!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${"grid"===elem2.type?this.kpiGrid(elem2,data[elem2.endPointResponseObject],!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${"chart"===elem2.type?this.kpiChartFran(elem2,!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}   

            ${"jsonViewer"===elem2.type?this.jsonViewer(elem2,data,!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${"readOnlyTable"===elem2.type?this.readOnlyTable(elem2,data,!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${"parentReadOnlyTable"===elem2.type?this.parentReadOnlyTable(elem2,data,!0,void 0,void 0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${"readOnlyTableByGroup"===elem2.type?this.readOnlyTableByGroup(elem2,data,!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${"readOnlyTableByGroupAllInOne"===elem2.type?this.readOnlyTableByGroupAllInOne(elem2,data,!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}

            ${"rolesAndActions"===elem2.type&&void 0!==elem2.endPointResponseObject2&&void 0!==data[elem2.endPointResponseObject]?this.rolesAndActions(elem2,data[elem2.endPointResponseObject][elem2.endPointResponseObject2],!0,this.lang):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${"rolesAndActions"===elem2.type&&void 0===elem2.endPointResponseObject2?this.rolesAndActions(elem2,data[elem2.endPointResponseObject],!0,this.lang):lit__WEBPACK_IMPORTED_MODULE_0__.s6}   

            ${"coa"===elem2.type?this.coa(elem,data[elem.endPointResponseObject],!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
              
              
            ${void 0===elem2.includeChild||!1===elem2.includeChild?lit__WEBPACK_IMPORTED_MODULE_0__.s6:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
                  ${this.kpiCardSomeElementsChild(elem2,data,!0)}
            `}              
            ${"Report"===elem2.type?this.ReportController(elem2,!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${"testScripts"===elem2.type?this.scripts(elem2,!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${"spectestScripts"===elem2.type?this.specScripts(elem,!0):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${"buttonsOnly"===elem2.type?this.buttonsOnly(elem2,data[elem.endPointResponseObject]):lit__WEBPACK_IMPORTED_MODULE_0__.s6}
            ${"tree"===elem2.type?this.treeElement(elem2,data):lit__WEBPACK_IMPORTED_MODULE_0__.s6}

          `:lit__WEBPACK_IMPORTED_MODULE_0__.s6}
        `))} 
    </div>
    `}}customElements.define("table-row-detail",TableRowDetail)},"./src/features/dynamicFieldValue.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function FeaturesDynamicFieldValue(base){return class extends base{getDynamicData(curTip,data,lang){let templateString=curTip.text;return void 0!==curTip["text_"+lang]&&(templateString=curTip["text_"+lang]),this.replaceTagsInDynamicValue(templateString,data)}replaceTagsInDynamicValue(templateString,data){if(void 0===templateString)return"";return templateString.replace(/\{(fld|variable)\:(\w+)\}|\{(fld|variable)\?(\w+)(?:\s*(==|!=)\s*(['"]?.+['"]?))?\s*\?\s*([^:}]+)\s*:\s*([^}]+)\}/g,((match,type,key,condType,condKey,operator,comparisonValue,truePart,falsePart)=>type&&key?this.simpleReplacement(type,key,data,match):condType&&condKey?this.evaluateExpression(data,condType,condKey,truePart,falsePart,comparisonValue,operator):match))}simpleReplacement(type,key,data,match){return"fld"===type&&void 0!==data[key]?data[key]:match}evaluateExpression(data,type,key,truePart,falsePart,comparisonValue,operator){try{const value="fld"===type?data[key]:this.variable[key];if(void 0!==comparisonValue){return"=="===operator&&value===comparisonValue.replace(/['"]/g,"")||"!="===operator&&value!==comparisonValue.replace(/['"]/g,"")?this.replaceTagsInDynamicValue(truePart,data):this.replaceTagsInDynamicValue(falsePart,data)}return value?this.replaceTagsInDynamicValue(truePart,data):this.replaceTagsInDynamicValue(falsePart,data)}catch(e){return console.error("Error evaluating expression: ",e),""}}}}__webpack_require__.d(__webpack_exports__,{i:()=>FeaturesDynamicFieldValue})},"./src/module_env_monit/Dialogs/ModuleEnvMonitDialogsMicroorganism.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{E:()=>ModuleEnvMonitDialogsMicroorganism});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.yalc/@trazit/cred-dialog/.yalc/@trazit/common-core/index.js");__webpack_require__("./node_modules/@material/mwc-list/mwc-list-item.js"),__webpack_require__("./node_modules/@material/mwc-select/mwc-select.js"),__webpack_require__("./node_modules/@material/mwc-checkbox/mwc-checkbox.js"),__webpack_require__("./node_modules/@material/mwc-formfield/mwc-formfield.js");function ModuleEnvMonitDialogsMicroorganism(base){return class extends base{static get properties(){return{microorganismList:{type:Array},gridDialogItems:{type:Array}}}constructor(){super(),this.microorganismList=[],this.gridDialogItems=[]}moduleEnvMonitMicroorganismsDialogAdd(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
        <tr-dialog id="microorganismDialogAdd" ?open=${this.openAddDialog()}
          @opened=${e=>{e.target===this.microorganismDialog&&(this.fromGrid=!1)}}
          @closing=${e=>{e.target===this.microorganismDialog&&(this.microorganismList=[],this.reload())}}
          heading=""
          hideActions=""
          scrimClickAction="">
          ${void 0===this.actionBeingPerformedModel.dialogInfo||"microorganismDialogAdd"!==this.actionBeingPerformedModel.dialogInfo.name?lit__WEBPACK_IMPORTED_MODULE_0__.s6:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
              ${this.selectedItems.length?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<label slot="topLeft" style="font-size:12px">Sample ID: ${this.selectedItems[0].sample_id}</label>`:lit__WEBPACK_IMPORTED_MODULE_0__.s6}
          <div class="layout vertical flex">
            ${this.viewForAdd()}        
          </div>
          `}
        </tr-dialog>
      `}openAddDialog(){return this.microorganismList.length>0&&void 0!==this.actionBeingPerformedModel.dialogInfo&&"microorganismDialogAdd"===this.actionBeingPerformedModel.dialogInfo.name}openRemoveDialog(){return this.microorganismList.length>0&&void 0!==this.actionBeingPerformedModel.dialogInfo&&"microorganismDialogRemove"===this.actionBeingPerformedModel.dialogInfo.name}moduleEnvMonitMicroorganismsDialogRemove(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
        <tr-dialog id="microorganismDialogRemove" ?open=${this.openRemoveDialog()}
          @opened=${e=>{e.target===this.microorganismDialog&&(this.fromGrid=!1)}}
          @closing=${e=>{e.target===this.microorganismDialog&&(this.microorganismList=[],this.reload())}}
          heading=""
          hideActions=""
          scrimClickAction="">
          ${void 0===this.actionBeingPerformedModel.dialogInfo||"microorganismDialogRemove"!==this.actionBeingPerformedModel.dialogInfo.name?lit__WEBPACK_IMPORTED_MODULE_0__.s6:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
              ${this.selectedItems.length?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<label slot="topLeft" style="font-size:12px">Sample ID: ${this.selectedItems[0].sample_id}</label>`:lit__WEBPACK_IMPORTED_MODULE_0__.s6}
          <div class="layout vertical flex">
            ${this.viewForRemove()}        
          </div>
          `}
          </tr-dialog>
      `}viewForAdd(){return void 0===this.actionBeingPerformedModel||void 0===this.actionBeingPerformedModel.dialogInfo||"microorganismDialogAdd"!==this.actionBeingPerformedModel.dialogInfo.name?lit__WEBPACK_IMPORTED_MODULE_0__.qy``:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
        <mwc-textfield id="numMicroItems" label="${this.microName||"Microorganism Name"}" type="number" 
          .min=${this.getNumMicroItems()} 
          .value=${this.getNumMicroItems()}></mwc-textfield>
        ${void 0===this.actionBeingPerformedModel.dialogInfo.fieldText?lit__WEBPACK_IMPORTED_MODULE_0__.s6:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
          <mwc-select id='mAdd' @change=${this.selectMicroItem}>
            <mwc-list-item value=''>-- Microorganism List --</mwc-list-item>
            ${this.microorganismList.map((m=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`<mwc-list-item value=${m.name}>${m.name}</mwc-list-item>`))}
          </mwc-select>
          <sp-button id="mAddBtn" size="m" variant="cta" @click=${()=>this.AddOrAdhocMicroorganismAction(!1)}>
        
          ${this.actionBeingPerformedModel.dialogInfo.fieldText.addBtn["label_"+this.lang]}</sp-button>
        
          <mwc-textfield id="mAddHoc" label="${this.actionBeingPerformedModel.dialogInfo.fieldText.addhocInput["label_"+this.lang]}"
            @input=${this.inputAddhoc}></mwc-textfield>
          <sp-button id="mAddHocBtn" size="m" variant="secondary" @click=${()=>this.AddOrAdhocMicroorganismAction()}>
            ${this.actionBeingPerformedModel.dialogInfo.fieldText.addhocBtn["label_"+this.lang]}</sp-button>
        `}
        <div id='microGrid'>
          <vaadin-grid theme="row-dividers" multi-sort
            .items=${this.gridDialogItems}
            @active-item-changed="${this.selectMicroOrg}">
            <vaadin-grid-sort-column resizable auto-width path="name" header="${this.actionBeingPerformedModel.microorganismHeader.name["label_"+this.lang]}"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column resizable auto-width path="items" header="${this.actionBeingPerformedModel.microorganismHeader.items["label_"+this.lang]}"></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
      `}selectMicroItem(e){this.fromGrid||(this.microGrid.activeItem=null,this.microGrid.selectedItems=[],this.microName=e.target.value,this.microName?(this.mAddHoc.disabled=!0,this.mAddHocBtn.disabled=!0,this.mAddHoc.value=""):(this.mAddHoc.disabled=!1,this.mAddHocBtn.disabled=!1)),this.fromGrid=!1}inputAddhoc(e){if(!this.fromGrid){this.microGrid.activeItem=null,this.microGrid.selectedItems=[],this.timeout&&clearTimeout(this.timeout);let name=e.target.value;this.timeout=setTimeout((()=>{this.microName=name,this.microName?(this.mAdd.value="",this.mAdd.disabled=!0,this.mAddBtn.disabled=!0):(this.mAdd.disabled=!1,this.mAddBtn.disabled=!1)}),300)}this.fromGrid=!1}selectMicroOrg(e){console.log("selectMicroOrg"),this.fromGrid=!0;const item=e.detail.value;if(this.mAdd)if(this.mAddHoc.disabled=!1,this.mAddHocBtn.disabled=!1,this.mAdd.disabled=!1,this.mAddBtn.disabled=!1,item){this.microorganismList.filter((m=>m.name==item.name)).length?(this.mAddHoc.disabled=!0,this.mAddHocBtn.disabled=!0,this.mAddHoc.value="",this.mAdd.value=item.name,this.mAdd.disabled=!0):(this.mAdd.disabled=!0,this.mAddBtn.disabled=!0,this.mAdd.value="",this.mAddHoc.value=item.name,this.mAddHoc.disabled=!0)}else this.mAdd.value="",this.mAddHoc.value="";this.microName=item?item.name:"",e.target.selectedItems=item?[item]:[]}getNumMicroItems(){let item=this.selectedItems.length&&this.selectedItems[0].microorganism_list_array.filter((m=>m.name==this.microName));return item.length?item[0].items+1:1}viewForRemove(){return void 0===this.actionBeingPerformedModel||void 0===this.actionBeingPerformedModel.microorganismHeader||"microorganismDialogRemove"!==this.actionBeingPerformedModel.dialogInfo.name?lit__WEBPACK_IMPORTED_MODULE_0__.qy``:lit__WEBPACK_IMPORTED_MODULE_0__.qy`        
        <div id='microGrid'>
          <vaadin-grid theme="row-dividers" all-rows-visible multi-sort
            .items=${this.gridDialogItems}
            @active-item-changed="${this.selectMicroOrg}">
            <vaadin-grid-sort-column resizable auto-width path="name" header="${this.actionBeingPerformedModel.microorganismHeader.name["label_"+this.lang]}"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column resizable auto-width path="items" header="${this.actionBeingPerformedModel.microorganismHeader.items["label_"+this.lang]}"></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
        ${this.microGrid&&this.microGrid.selectedItems.length?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
            <mwc-textfield id="numMicroItems" min=0 .max=${this.getNumMicroItems()-2} label="${this.microGrid.selectedItems[0].name}" type="number" .value=${this.getNumMicroItems()-2}></mwc-textfield>
          `:lit__WEBPACK_IMPORTED_MODULE_0__.s6}
        <sp-button size="m" variant="cta" @click=${this.removeSampleMicroorganismAction}>
        ${_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__.k.confirmDialogButton["label_"+this.lang]}</sp-button>
      `}get microorganismDialogAdd(){return this.shadowRoot.querySelector("tr-dialog#microorganismDialogAdd")}get microorganismDialogRemove(){return this.shadowRoot.querySelector("tr-dialog#microorganismDialogRemove")}get mAdd(){return this.shadowRoot.querySelector("mwc-select#mAdd")}get mAddHoc(){return this.shadowRoot.querySelector("mwc-textfield#mAddHoc")}get microItems(){return this.shadowRoot.querySelector("mwc-textfield#numMicroItems")}get microGrid(){return this.shadowRoot.querySelector("div#microGrid vaadin-grid")}get mAddBtn(){return this.shadowRoot.querySelector("sp-button#mAddBtn")}get mAddHocBtn(){return this.shadowRoot.querySelector("sp-button#mAddHocBtn")}AddOrAdhocMicroorganismAction(addhoc=!0){if(this.microName){let totalItems=Number(this.microItems.value);this.selectedDialogAction=addhoc?this.actionBeingPerformedModel.dialogInfo.action[1]:this.actionBeingPerformedModel.dialogInfo.action[0];let item=this.gridDialogItems.filter((m=>m.name==this.microName));item=item.length?item[0].items:0;let numItems=totalItems-item;if(this.gridDialogItems.forEach((m=>{m.name!=this.microName&&(totalItems+=Number(m.items))})),Number(this.selectedItems[0].raw_value)<totalItems)return this.dispatchEvent(new CustomEvent("error",{detail:{is_error:!0,message_en:"This addition would be "+totalItems+" what is greater than the reading "+this.selectedItems[0].raw_value+" what is not allowed.",message_es:"Está adición sumaría un total de "+totalItems+", mayor a la lectura identificada, "+this.selectedItems[0].raw_value+", lo que no es permitido."},bubbles:!0,composed:!0})),void console.log("This addition would be "+totalItems+" what is greater than the reading "+this.selectedItems[0].raw_value+" what is not allowed.");this.targetValue={microorganismName:this.microName,numItems},this.performActionRequestHavingDialogOrNot(this.selectedDialogAction,this.selectedItems[0],this.targetValue)}}reload(){this.resetDialogThings()}resetDialogThings(){this.targetValue={},this.selectedDialogAction=null}getMicroorganismToAdd(){console.log("getMicroorganismToAdd"),this.moduleEnvMonitMicroorganismsDialogAdd();let queryDefinition=this.actionBeingPerformedModel.dialogInfo.viewQuery,APIParams=this.getAPICommonParams(queryDefinition),viewParams=this.jsonParam(queryDefinition,this.selectedItems[0]),params=this.config.backendUrl+this.config.frontEndEnvMonitSampleUrl+"?"+new URLSearchParams(viewParams)+"&"+new URLSearchParams(APIParams);this.fetchApi(params).then((j=>{j&&!j.is_error&&(this.microName=null,this.microorganismList=j,this.gridDialogItems=this.selectedItems[0].microorganism_list_array,this.fromGrid=!1,this.requestUpdate())}))}addSampleMicroorganism(){let queryDefinition=this.actionBeingPerformedModel.action[0];this.targetValue={sampleId:this.selectedItems[0].sample_id,microorganismName:this.microGrid.selectedItems[0].name},console.log("addSampleMicroorganism","targetValue",this.targetValue);let extraParams=this.jsonParam(queryDefinition,this.selectedItems[0],this.targetValue),APIParams=this.getAPICommonParams(queryDefinition),params=this.config.backendUrl+this.config.ApiEnvMonitSampleUrl+"?"+new URLSearchParams(this.reqParams)+"&"+new URLSearchParams(APIParams)+"&"+new URLSearchParams(extraParams);this.fetchApi(params).then((()=>{this.reload()}))}getMicroorganismToRemove(){console.log("getMicroorganismToRemove"),this.moduleEnvMonitMicroorganismsDialogRemove();let queryDefinition=this.actionBeingPerformedModel.dialogInfo.viewQuery,APIParams=this.getAPICommonParams(queryDefinition);this.reqParams.whereFieldsName="sample_id",this.reqParams.whereFieldsValue=this.selectedItems[0].sample_id+"*Integer";let params=this.config.backendUrl+this.config.frontEndEnvMonitSampleUrl+"?"+new URLSearchParams(this.reqParams)+"&"+new URLSearchParams(APIParams);this.fetchApi(params).then((j=>{j&&!j.is_error&&(this.microName=null,this.microorganismList=j,this.gridDialogItems=this.selectedItems[0].microorganism_list_array,this[this.actionBeingPerformedModel.dialogInfo.name].show(),this.requestUpdate())}))}removeSampleMicroorganismAction(){let queryDefinition=this.actionBeingPerformedModel.dialogInfo.action[0];if(!this.microGrid.selectedItems.length)return;this.targetValue={},this.targetValue={sampleId:this.selectedItems[0].sample_id,microorganismName:this.microGrid.selectedItems[0].name,numItems:this.microGrid.selectedItems[0].items-this.microItems.value},this.microItems.hidden=!0,console.log("removeSampleMicroorganismAction 20221013","targetValue",this.targetValue,"queryDefinition",queryDefinition);let APIParams=this.getAPICommonParams(queryDefinition),extraParams=this.jsonParam(queryDefinition,this.selectedItems[0],this.targetValue),endPointUrl=this.getActionAPIUrl(queryDefinition),params=this.config.backendUrl+endPointUrl+"?"+new URLSearchParams(this.reqParams)+"&"+new URLSearchParams(APIParams)+"&"+new URLSearchParams(extraParams);this.fetchApi(params).then((()=>{this.microorganismList=[],this.microGrid.selectedItems=[],this.reload(),this.targetValue={}}))}removeSampleMicroorganismActionNO(){console.log("removeSampleMicroorganismAction"),this.selectedDialogAction=this.actionBeingPerformedModel.dialogInfo.action[0],this.actionMethod(this.selectedDialogAction,!1)}get objectToReactivateName(){return this.shadowRoot.querySelector("mwc-select#objectToReactivateName")}}}},"./src/module_env_monit/ModuleEnvMonitClientMethods.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>ModuleEnvMonitClientMethods});var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.yalc/@trazit/cred-dialog/.yalc/@trazit/common-core/index.js"),_components_Actions_ActionsFunctions__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/Actions/ActionsFunctions.js");function ModuleEnvMonitClientMethods(base){return class extends((0,_components_Actions_ActionsFunctions__WEBPACK_IMPORTED_MODULE_2__.$)(base)){static get properties(){return{headerInfo:{type:Object},sopsPassed:{type:Boolean},prodLotList:{type:Object}}}constructor(){super(),this.sopsPassed=!0,this.headerInfo=JSON.parse(sessionStorage.getItem("userSession")).header_info,this.prodLotList=[]}async getProgramList(){let queryDefinition=this.viewModelFromProcModel.viewQuery;this.samplesReload=!0;let APIParams=this.getAPICommonParams(queryDefinition),viewParams=this.jsonParam(queryDefinition),params=this.config.backendUrl+this.config.frontEndEnvMonitUrl+"?"+new URLSearchParams(APIParams)+"&"+new URLSearchParams(viewParams);await this.fetchApi(params).then((j=>{j&&!j.is_error&&(this.templates.programsList=j.programsList)}))}logSampleDialog(){this.GetQueriesForDialog(this.viewModelFromProcModel.langConfig.gridActionOnClick)}pointTemplate(){return void 0===this.viewModelFromProcModel||void 0===this.viewModelFromProcModel.langConfig||void 0===this.viewModelFromProcModel.langConfig.fieldText||void 0===this.selectedItems||void 0===this.selectedItems[0]||void 0===this.selectedItems[0].card_info?lit__WEBPACK_IMPORTED_MODULE_0__.s6:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
            <tr-dialog id="pointDialog" .open=${this.selectedItems&&this.selectedItems.length&&this.sopsPassed}
              @closed=${e=>{e.target===this.pointDialog&&(this.grid.activeItem=null)}}
              heading=""
              hideActions=""
              scrimClickAction="">            
              <div class="layout vertical flex center-justified">
                <div class="layout horizontal justified flex">
                  <sp-button size="m" variant="secondary" dialogAction="accept">
                    ${_trazit_common_core__WEBPACK_IMPORTED_MODULE_1__.k.closeDialogButton["label_"+this.lang]}</sp-button>
                  <sp-button size="m" @click=${this.setLogSample}>${this.viewModelFromProcModel.langConfig.fieldText.logBtn["label_"+this.lang]}</sp-button>
                </div>
                <div class="layout horizontal flex around-justified wrap" style="gap: 5px;">
                  <mwc-select label="${this.viewModelFromProcModel.langConfig.fieldText.shift["label_"+this.lang]}" id="shift">
                    ${this.viewModelFromProcModel.langConfig.fieldText.shift.items.map(((c,i)=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`<mwc-list-item value="${c.keyName}" ?selected=${c.keyName==this.headerInfo.shift}>${c["keyValue_"+this.lang]}</mwc-list-item>`))}
                  </mwc-select>
                  <mwc-select label="${this.viewModelFromProcModel.langConfig.fieldText.lot["label_"+this.lang]}" id="lot">
                    ${this.prodLotList.map(((c,i)=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`<mwc-list-item value="${c.lot_name}" ?selected=${0==i}>${c.lot_name}</mwc-list-item>`))}
                  </mwc-select>
                  ${this.selectedItems.length&&this.selectedItems[0].card_info.map((f=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`${f.name in this.viewModelFromProcModel.langConfig.gridHeader?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<mwc-textfield disabled style="width:200px" label=${this.viewModelFromProcModel.langConfig.gridHeader[f.name]["label_"+this.lang]} name=${f.name} type=${f.type} value=${this.viewModelFromProcModel.langConfig.gridHeader[f.name]&&this.viewModelFromProcModel.langConfig.gridHeader[f.name].confidential_value&&f.value?"*****":f.value}></mwc-textfield>`:lit__WEBPACK_IMPORTED_MODULE_0__.s6}
                    `))}
                </div>
              </div>
            </tr-dialog>
            `}get pointDialog(){return this.shadowRoot.querySelector("tr-dialog#pointDialog")}get shiftField(){return this.shadowRoot.querySelector("mwc-select#shift")}get lotField(){return this.shadowRoot.querySelector("mwc-select#lot")}setLogSample(e){this.targetValue={sampleTemplate:this.templates.selectedProgram.sample_config_code,sampleTemplateVersion:this.templates.selectedProgram.sample_config_code_version,fieldValue:`${this.shiftField.value}*String|${this.lotField.value}*String`},this.trazitNoDialogRequired(this.viewModelFromProcModel.langConfig.gridActionOnClick.dialogInfo.action,this.selectedItems[0],this.targetValue,!1,this.selectedItems[0]),e.stopPropagation()}}}}}]);
//# sourceMappingURL=861.6f6456e0.iframe.bundle.js.map
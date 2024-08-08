    .list {
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin: 0;
    }
    .list li {
        flex: 1 1 30%;
        margin: 5px;
        list-style: none;
        cursor: pointer;
        user-select: none;
        border-style: solid;
        border-color: #999999;
        border-width: 1px;
        border-radius: 7px;
        font-family: Montserrat, sans-serif;
        font-weight: bold;
        font-size: 19px;
        background-color: #FFFFFF;
        text-align: center;
        padding: 10px;
        color:#126075;
    }
    .dialog-container {
        display: none;
        z-index: 1000;
        position: relative;
    }
    .dialog-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    .dialog-box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        border-radius: 7px;
        font-family: Montserrat, sans-serif;
    }
    h3, h4 {
        font-family: Montserrat, sans-serif;
        font-weight: bold;
        color: #003d7f;
    }
    button {
        font-family: Montserrat, sans-serif;
        font-weight: bold;
        font-size: 19px;
        background-color: #FFFFFF;
        color: #148CFA;
        border: 1px solid #148CFA;
        border-radius: 7px;
        padding: 10px 20px;
        margin: 10px;
        cursor: pointer;
    }
    button:hover {
        background-color: #148CFA;
        color: #FFFFFF;
    }
    .dragging {
        opacity: 0.5;
    }
            .dragging {
                opacity: 0.5;
            }
        `;constructor(){super(),this.fieldsToDownload=[]}async downloadDataTableToCSV(downloadElements,dataArr,selectedData,downaloadbleButtonModel,lang="en"){if(void 0===downloadElements)return void alert("The definition to download is wrong");(void 0===selectedData||selectedData.length>0)&&(dataArr=selectedData);let allFieldsInDataArrSet=new Set;dataArr.forEach((item=>{Object.keys(item).forEach((key=>allFieldsInDataArrSet.add(key)))}));const allFieldsInDataArr=Array.from(allFieldsInDataArrSet),allNamesInColumns=new Set;downloadElements.columns.forEach((column=>{column.hasOwnProperty("name")&&allNamesInColumns.add(column.name)}));const tableColumnsArray=Array.from(allNamesInColumns);this.fieldsToDownload=tableColumnsArray,console.log("downloadElements",downloadElements),void 0!==downloadElements.downloadable&&void 0!==downloadElements.downloadable.allowUserSelectColumns&&!0===downloadElements.downloadable.allowUserSelectColumns&&(await this.showDialog(lang,allFieldsInDataArr,this.fieldsToDownload),this.fieldsToDownload=this.updateFieldsToDownload());let csvContent="data:text/csv;charset=utf-8;",contents=this.getTraceabilityInfo(),headers=this.fieldsToDownload.map((key=>key[`label_${lang}`]||key));contents.push(headers.join(";")),void 0!==dataArr&&dataArr.forEach((item=>{let row=this.fieldsToDownload.map((key=>item.hasOwnProperty(key)?`"${item[key]}"`:"")).join(";");contents.push(row)})),csvContent+=contents.join("\r\n");let encodedUri=encodeURI(csvContent),link=document.createElement("a"),currentDate=new Date,cDay=("0"+currentDate.getDate()).slice(-2),cMonth=("0"+(currentDate.getMonth()+1)).slice(-2),cYear=currentDate.getFullYear();link.setAttribute("href",encodedUri),link.setAttribute("download",`export_${cYear}${cMonth}${cDay}.csv`),document.body.appendChild(link),link.click(),document.body.removeChild(link)}getTraceabilityInfo(){let trackInfo=[],userSession=JSON.parse(sessionStorage.getItem("userSession"));return trackInfo.push(["Traceability Info: "]),trackInfo.push(["This file was created on",new Date,"by",userSession.header_info.first_name+" "+userSession.header_info.last_name]),trackInfo.push(["system",this.dbName,"Procedure",this.procName]),trackInfo.push(["Data: "]),trackInfo}showDialog(lang,unselectedList,selectedList){return new Promise(((resolve,reject)=>{this.cleanupDialog();const dialogContainer=document.createElement("div");dialogContainer.id="dialog-container",dialogContainer.style.display="none",dialogContainer.style.zIndex="1000",dialogContainer.style.position="relative";const dialogBackground=document.createElement("div");dialogBackground.id="dialog-background",dialogBackground.style.position="fixed",dialogBackground.style.top="0",dialogBackground.style.left="0",dialogBackground.style.width="100%",dialogBackground.style.height="100%",dialogBackground.style.background="rgba(0, 0, 0, 0.5)";const dialogBox=document.createElement("div");dialogBox.id="dialog-box",dialogBox.style.position="fixed",dialogBox.style.top="50%",dialogBox.style.left="50%",dialogBox.style.transform="translate(-50%, -50%)",dialogBox.style.background="white",dialogBox.style.padding="20px",dialogBox.style.boxShadow="0 0 10px rgba(0, 0, 0, 0.5)";const selectedColumnsContainer=document.createElement("div"),selectedColumnsTitle=document.createElement("h4");selectedColumnsTitle.textContent="es"===lang?"Columnas seleccionadas":"Selected Columns";const selectedListElement=document.createElement("ul");selectedListElement.id="selected-list",selectedListElement.classList.add("list");const unselectedColumnsContainer=document.createElement("div"),unselectedColumnsTitle=document.createElement("h4");unselectedColumnsTitle.textContent="es"===lang?"Columnas no seleccionadas":"Unselected Columns";const unselectedListElement=document.createElement("ul");unselectedListElement.id="unselected-list",unselectedListElement.classList.add("list"),selectedColumnsContainer.appendChild(selectedColumnsTitle),selectedColumnsContainer.appendChild(selectedListElement),unselectedColumnsContainer.appendChild(unselectedColumnsTitle),unselectedColumnsContainer.appendChild(unselectedListElement);const okButton=document.createElement("button");okButton.id="dialog-ok",okButton.textContent="OK",okButton.onclick=()=>{this.fieldsToDownload=this.updateFieldsToDownload(),dialogContainer.style.display="none",resolve()};const cancelButton=document.createElement("button");cancelButton.id="dialog-cancel",cancelButton.textContent="Cancel",cancelButton.onclick=()=>{dialogContainer.style.display="none",reject("Dialog cancelled")},dialogBox.appendChild(selectedColumnsContainer),dialogBox.appendChild(unselectedColumnsContainer),dialogBox.appendChild(okButton),dialogBox.appendChild(cancelButton),dialogBackground.appendChild(dialogBox),dialogContainer.appendChild(dialogBackground),document.body.appendChild(dialogContainer),dialogContainer.style.display="block",this.populateLists(selectedList,unselectedList),dialogBackground.addEventListener("click",(event=>{event.target===dialogBackground&&(dialogContainer.style.display="none",reject("Dialog closed"))}))}))}populateLists(selected,unselected){const selectedList=document.getElementById("selected-list"),unselectedList=document.getElementById("unselected-list");selectedList&&unselectedList?(selectedList.innerHTML="",unselectedList.innerHTML="",(selected||[]).forEach(((field,index)=>{let li=document.createElement("li");li.textContent=`${index+1}. ${field}`,li.draggable=!0,li.style.cursor="pointer",li.onclick=this.moveItemToUnselected.bind(this),li.addEventListener("dragstart",this.handleDragStart.bind(this)),li.addEventListener("dragover",this.handleDragOver.bind(this)),li.addEventListener("drop",this.handleDrop.bind(this)),selectedList.appendChild(li)})),(unselected||[]).forEach(((field,index)=>{if(!selected.includes(field)){let li=document.createElement("li");li.textContent=`${index+1}. ${field}`,li.style.cursor="pointer",li.onclick=this.moveItemToSelected.bind(this),unselectedList.appendChild(li)}})),this.updateFieldsToDownload()):console.error("Selected or Unselected list element not found")}moveItemToSelected(event){const item=event.target,unselectedList=document.getElementById("unselected-list"),selectedList=document.getElementById("selected-list");unselectedList.contains(item)&&(item.removeEventListener("click",this.moveItemToSelected.bind(this)),item.addEventListener("click",this.moveItemToUnselected.bind(this)),item.draggable=!0,item.style.cursor="pointer",item.addEventListener("dragstart",this.handleDragStart.bind(this)),item.addEventListener("dragover",this.handleDragOver.bind(this)),item.addEventListener("drop",this.handleDrop.bind(this)),unselectedList.removeChild(item),selectedList.appendChild(item),this.updateFieldsToDownload(),this.updateListIndices(selectedList))}moveItemToUnselected(event){const item=event.target,unselectedList=document.getElementById("unselected-list"),selectedList=document.getElementById("selected-list");selectedList.contains(item)&&(item.removeEventListener("click",this.moveItemToUnselected.bind(this)),item.addEventListener("click",this.moveItemToSelected.bind(this)),item.draggable=!1,item.style.cursor="pointer",item.removeEventListener("dragstart",this.handleDragStart.bind(this)),item.removeEventListener("dragover",this.handleDragOver.bind(this)),item.removeEventListener("drop",this.handleDrop.bind(this)),selectedList.removeChild(item),unselectedList.appendChild(item),this.updateFieldsToDownload(),this.updateListIndices(selectedList))}handleDragStart(event){event.target.classList.add("dragging"),event.dataTransfer.effectAllowed="move",event.dataTransfer.setData("text/plain",event.target.textContent)}handleDragOver(event){event.preventDefault(),event.dataTransfer.dropEffect="move"}handleDrop(event){event.preventDefault();const draggingElement=document.querySelector(".dragging"),targetElement=event.target;if(draggingElement&&targetElement&&"LI"===targetElement.tagName&&targetElement!==draggingElement){const list=targetElement.parentElement;list.insertBefore(draggingElement,targetElement.nextSibling),draggingElement.classList.remove("dragging"),this.updateFieldsToDownload(),this.updateListIndices(list)}}updateFieldsToDownload(){const selectedList=document.getElementById("selected-list"),fields=Array.from(selectedList.children).map((item=>item.textContent.split(". ")[1]));return console.log("Updated fieldsToDownload:",fields),fields}updateListIndices(list){Array.from(list.children).forEach(((item,index)=>{item.textContent=`${index+1}. ${item.textContent.split(". ")[1]}`}))}cleanupDialog(){const existingDialog=document.getElementById("dialog-container");existingDialog&&existingDialog.remove()}}}(function ProcManagementMethods(base){return class extends base{cardActions=[{actionName:"LOCK_PROCEDURE",notGetViewData:!0,clientMethod:"procMngRequirementsMethod",endPoint:"/appProcMgr/RequirementsProcedureDefinitionAPIActions",selectedItemPropertyName:"selectedItems",requiresDialog:!1,certificationException:!0,secondaryActionToPerform:{name:"refreshAllProceduresView"},button:{icon:"lock",title:{label_en:"Lock procedure",label_es:"Bloquear proceso"},requiresGridItemSelected:!1,hideWhenSelectedItem:{column:"locked_for_actions",value:!0}},endPointParams:[{argumentName:"procedureName",selObjectPropertyName:"procedure_name"},{argumentName:"procedureVersion",selObjectPropertyName:"procedure_version"},{argumentName:"procInstanceName",selObjectPropertyName:"proc_instance_name"}]},{actionName:"UNLOCK_PROCEDURE",notGetViewData:!0,clientMethod:"procMngRequirementsMethod",endPoint:"/appProcMgr/RequirementsProcedureDefinitionAPIActions",selectedItemPropertyName:"selectedItems",requiresDialog:!1,certificationException:!0,secondaryActionToPerform:{name:"refreshAllProceduresView"},button:{icon:"lock_open",title:{label_en:"Unlock procedure",label_es:"Desbloquear proceso"},requiresGridItemSelected:!1,showWhenSelectedItem:{column:"locked_for_actions",value:!0}},endPointParams:[{argumentName:"procedureName",selObjectPropertyName:"procedure_name"},{argumentName:"procedureVersion",selObjectPropertyName:"procedure_version"},{argumentName:"procInstanceName",selObjectPropertyName:"proc_instance_name"}]}];selectedProcedureInstance(e){this.selectedProcInstance=this.allProcedures.find((item=>item.proc_instance_name===e.currentTarget.id)),this.selectSectionView(0),this.render()}openSop(e){if(window){let urlVal="file_link";console.log(e),void 0!==this.actionBeingPerformedModel.fieldWithUrl&&(urlVal=this.actionBeingPerformedModel.fieldWithUrl),window.open(this.selectedItems[0][urlVal],"_blank").focus()}}procMngRequirementsMethod(e){this.trazitCredsChecker(this.actionBeingPerformedModel.actionName,null,this.jsonParam(this.actionBeingPerformedModel,this.selectedItems[0]),this.actionBeingPerformedModel,!0)}async testScriptPerformed(){await this.refreshSelProcData()}async coveragePerformed(){await this.refreshSelProcData()}async refreshMainView(){const event=new CustomEvent("refresh-main-view",{detail:{key:"newProcInstance",value:newProcInstance}});window.dispatchEvent(event)}async refreshSelProcData(){await this.GetViewData(!1,{actionName:"ONE_PROCEDURE_DEFINITION",label_en:"One Procedure Definition",label_es:"Definición de un proceso",endPoint:"/appProcMgr/RequirementsProcedureDefinitionAPIQueries",notUseGrid:!0,variableName:"selectedProcInstance",endPointResponseVariableName:"all_platform_procedures_list"});let newProcInstance1=this.selectedProcInstance?.[0];if(!newProcInstance1)return;sessionStorage.setItem("newProcInstance",JSON.stringify(this.selectedProcInstance[0]));const event=new CustomEvent("session-storage-updated",{detail:{key:"newProcInstance",value:newProcInstance1}});window.dispatchEvent(event)}async refreshAllProceduresView(){await this.GetViewData(!1,{actionName:"ALL_PROCEDURES_DEFINITION",area:"app",label_en:"All Procedures Definition",label_es:"Definición de todos los procesos",endPoint:"/appProcMgr/RequirementsProcedureDefinitionAPIQueries",notUseGrid:!0,variableName:"allProcedures",endPointResponseVariableName:"all_platform_procedures_list"});const event=new CustomEvent("refresh-all-procedures",{});window.dispatchEvent(event)}}}(function ClientMethod(base){return class extends base{async refreshObjectByTab(){await this.GetViewData(!1);let newProcInstance=this.selectedProcInstance?.[0];if(!newProcInstance)return;sessionStorage.setItem("newProcInstance",JSON.stringify(this.selectedProcInstance[0]));const event=new CustomEvent("session-storage-updated",{detail:{key:"newProcInstance",value:newProcInstance}});window.dispatchEvent(event)}async getSamples(){this.samplesReload=!0,this.selectedSamples=[],console.log("getSamples","actionObj",this.actionObj);let params=this.config.backendUrl+(this.actionObj.endPoint?this.actionObj.endPoint:this.config.frontEndEnvMonitSampleUrl)+"?"+new URLSearchParams(this.reqParams);params=params.replace(/\|/g,"%7C"),await this.fetchApi(params).then((j=>{j&&!j.is_error?this.setGrid(j):this.setGrid()})),this.samplesReload=!1}getMicroorganism(){let params=this.config.backendUrl+this.config.frontEndEnvMonitSampleUrl+"?"+new URLSearchParams(this.reqParams);params=params.replace(/\|/g,"%7C"),this.fetchApi(params).then((j=>{j&&!j.is_error&&(this.microName=null,this.microorganismList=j,this.gridDialogItems=this.selectedSamples[0].microorganism_list_array,this.fromGrid=!1,this.requestUpdate())}))}addSampleMicroorganism(){this.sampleState={action:JSON.stringify(this.selectedAction),sample:this.selectedSamples[0].sample_id};let params=this.config.backendUrl+this.config.ApiEnvMonitSampleUrl+"?"+new URLSearchParams(this.reqParams);params=params.replace(/\|/g,"%7C"),this.fetchApi(params).then((()=>{this.reload()}))}getMicroorganismItem(){this.reqParams.whereFieldsValue=this.selectedSamples[0].sample_id+"*Integer";let params=this.config.backendUrl+this.config.frontEndEnvMonitSampleUrl+"?"+new URLSearchParams(this.reqParams);params=params.replace(/\|/g,"%7C"),this.fetchApi(params).then((j=>{j&&!j.is_error&&(this.microName=null,this.microorganismList=j,this.gridDialogItems=this.selectedSamples[0].microorganism_list_array,this.requestUpdate())}))}removeSampleMicroorganism(){this.sampleState={action:JSON.stringify(this.selectedAction),sample:this.selectedSamples[0].sample_id};let params=this.config.backendUrl+this.config.ApiEnvMonitSampleUrl+"?"+new URLSearchParams(this.reqParams);this.fetchApi(params).then((()=>{this.microGrid.selectedItems=[],this.reload()}))}getAssign(){let params=this.config.backendUrl+this.config.frontEndEnvMonitIncubationUrl+"?"+new URLSearchParams(this.reqParams);params=params.replace(/\|/g,"%7C"),this.fetchApi(params).then((j=>{j&&!j.is_error&&(this.selectedAssigns=[],this.assignList=j,this.asGrid.items=j,this.requestUpdate())}))}addRemoveBatch(){if("EM_BATCH_INCUB_ADD_SMP"==this.selectedAction.actionName&&!this.batchName)return this.dispatchEvent(new CustomEvent("error",{detail:{is_error:!0,message_en:"Please select the batch should be added",message_es:"Seleccione el lote que debe agregarse"},bubbles:!0,composed:!0})),void console.log("Please select the batch should be added");this.reqParams={...this.reqParams,batchName:this.batchName};let params=this.config.backendUrl+this.config.ApiEnvMonitSampleUrl+"?"+new URLSearchParams(this.reqParams);params=params.replace(/\|/g,"%7C"),this.fetchApi(params).then((()=>{this.reload()}))}getLots(){console.log("getLots");let params=this.config.backendUrl+this.config.frontEndEnvMonitUrl+"?"+new URLSearchParams(this.reqParams);params=params.replace(/\|/g,"%7C"),this.fetchApi(params).then((j=>{this.samplesReload=!1,this.langConfig.fieldText.lot.items=j,this.ready=!0,this.requestUpdate()}))}logSample(){let params=this.config.backendUrl+(this.actionObj.endPoint?this.actionObj.endPoint:this.config.SampleAPIactionsUrl)+"?"+new URLSearchParams(this.reqParams);params=params.replace(/\|/g,"%7C"),this.fetchApi(params).then((()=>{this.pointDialog.close()}))}xxxreloadSampleState(){this.selectedSamples=this.gridItems.filter((g=>g.sample_id==this.sampleState.sample)),this.selectedAction=JSON.parse(this.sampleState.action),this.reloadDialog(),this.sampleState=null}openPDF(action,data){let linkUrl;void 0===data&&alert("no data received"),void 0!==data.report_url&&(linkUrl=data.report_url),void 0!==data.file_link&&(linkUrl=data.file_link),void 0!==linkUrl?window.open(linkUrl,"_blank").focus():alert("this record has no property called report_url or file_link instead")}inventoryLotPrintLabel(action,selectedItem){if(console.log("inventoryLotPrintLabel this.reqParams",this.reqParams),void 0===selectedItem||void 0===selectedItem.lot_name)return void alert("item not selected");let extraParams=this.jsonParam(action,selectedItem),APIParams=this.getAPICommonParams(action),endPointUrl=this.getActionAPIUrl(action);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);let params=this.config.backendUrl+endPointUrl+"?"+new URLSearchParams(APIParams)+"&"+new URLSearchParams(extraParams);console.log("inventoryLotPrintLabel","action",action," selectedItem",selectedItem,"extraParams",extraParams),this.fetchApi(params).then((j=>{if(j&&!j.is_error){console.log(j.zpl_code);let printWindow=window.open("","","fullscreen=yes");printWindow.document.write(j.zpl_code),printWindow.document.close(),setTimeout((function(){printWindow.print(),printWindow.close()}),500)}else alert("is_error")}))}xxxgetDeactivatedLots(){this.deactivatedLots=[];let params=this.config.backendUrl+this.selectedDialogAction.endPoint+"?"+new URLSearchParams(this.reqParams);this.fetchApi(params).then((j=>{j&&!j.is_error&&(this.deactivatedLots=j)}))}xxxsetLot(){console.log("setLot");let params=this.config.backendUrl+this.config.ApiEnvMonitProdLotUrl+"?"+new URLSearchParams(this.reqParams);this.fetchApi(params).then((()=>{this.lotDialog.close(),this.reload()}))}xxxsetInstruments(){console.log("this.reqParams",this.reqParams);let params=this.config.backendUrl+this.config.ApiInstrumentsAPIactionsUrl+"?"+new URLSearchParams(this.reqParams);this.fetchApi(params).then((()=>{this.reload()}))}}}((0,ActionsFunctions.$)((0,ApiFunctions.Y)(base))))))){getButtonForRows(actions,data,isProcManagement,parentData){return void 0===actions&&(actions=this.viewModelFromProcModel),lit.qy`
        <style>
          mwc-icon-button#lang {        
            color : #1473e6; /* rgba(36, 192, 235, 1); */
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }
          mwc-button {
            background-color: #1473e6; /* rgba(36, 192, 235, 1); */
            font-family: Montserrat;
            font-weight: bold;
            font-size: 19px;
            --mdc-theme-primary:#1473e6; /* rgba(36, 192, 235, 1); */
            border-radius: 12px;
          }
          mwc-button.button {        
            color : #1473e6; /* rgba(36, 192, 235, 1); */
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
            background: rgb(36, 192, 235) none repeat scroll 0% 0%;
            font-family: Montserrat;
            font-weight: bold;
            font-size: 19px;
            color: white;
            border-color: transparent !important;
            --mdc-button-fill-color: red;
            --mdc-button-ink-color: blue;
            border-radius: 12px;
          }            
          mwc-icon-button {        
            color : #1473e6; /* rgba(36, 192, 235, 1); */
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }
          mwc-icon-button.disabledtrue{
            color : red;
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }
          mwc-icon-button#video {
            color : #FFFFFF;
            color : #1473e6; /* rgba(36, 192, 235, 1); */
          }
          sp-button {
            background : #24C0EB;
            background : rgba(36, 192, 235, 1);
            border-color : inherit !important;
            border-radius : 35px;
            -moz-border-radius : 35px;
            -webkit-border-radius : 35px;
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
            color : #FFFFFF;
            color : rgb(255, 255, 255);
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
            background: rgba(255, 255, 255, 0) none repeat scroll 0% 0%;
          }
          mwc-textfield.mdc-text-field {
            background-color :  #FFFFFF;
            background-color : rgb(255, 255, 255);
          }
          mwc-textfield.mdc-textfield.mdc-floating-label {
            color: red;
          }
        </style>
          ${void 0!==actions&&actions.map((action=>lit.qy`
          ${this.btnHiddenForRows(action,data)?lit.s6:lit.qy`${action.button?lit.qy`${action.button.icon?lit.qy`<mwc-icon-button
                  class="${action.button.class} disabled${this.btnDisabled(action,actions)}"
                  icon="${action.button.icon}" id="${action.actionName}"
                  title="${action.button.title["label_"+this.lang]}"
                  ?disabled=${this.btnDisabled(action,actions)}
                  ?hidden=${this.btnHiddenForRows(action,data)}
                  @click=${e=>this.trazitButtonsMethod(e,!0,action,actions,null,null,data,isProcManagement,parentData)}></mwc-icon-button>`:lit.qy`${action.button.img?lit.qy`<mwc-icon-button
                  class="${action.button.class} disabled${this.btnDisabled(action,actions)} img"
                  title="${action.button.title["label_"+this.lang]}" id="${action.actionName}"
                  ?disabled=${this.btnDisabled(action,actions)}
                  ?hidden=${this.btnHiddenForRows(action,data)}
                  @click=${e=>this.trazitButtonsMethod(e,!0,action,actions,null,null,data,isProcManagement,parentData)}>
                      <img class="iconBtn" src="images/${action.button.img}">
                  </mwc-icon-button>`:lit.qy`<mwc-button dense raised
                  label="${action.button.title["label_"+this.lang]}" id="${action.actionName}"
                  class="${action.button.class} disabled${this.btnDisabled(action,actions)} img"
                  ?disabled=${this.btnDisabled(action,actions)}
                  ?hidden=${this.btnHiddenForRows(action,data)}
                  @click=${e=>this.trazitButtonsMethod(e,!0,action,actions,null,null,data,isProcManagement,parentData)}></mwc-button>`}`}`:lit.s6}`}`))}
      `}getButton(sectionModel,data,selectedItems,isProcManagement){void 0===sectionModel&&(sectionModel=this.viewModelFromProcModel);let refreshable1={enable:!0,icon:"refresh",title:{label_en:"Reload",label_es:"Recargar"}};void 0!==sectionModel.viewQuery&&void 0!==sectionModel.viewQuery.refreshable&&(void 0!==sectionModel.viewQuery.refreshable.enable&&(refreshable1.enable=sectionModel.viewQuery.refreshable.enable),void 0!==sectionModel.viewQuery.refreshable.title&&(refreshable1.title=sectionModel.viewQuery.refreshable.title),void 0!==sectionModel.viewQuery.refreshable.icon&&(refreshable1.icon=sectionModel.viewQuery.refreshable.icon)),void 0!==sectionModel.refreshable&&(void 0!==sectionModel.refreshable.enable&&(refreshable1.enable=sectionModel.refreshable.enable),void 0!==sectionModel.refreshable.title&&(refreshable1.title=sectionModel.refreshable.title),void 0!==sectionModel.refreshable.icon&&(refreshable1.icon=sectionModel.refreshable.icon));let printable={enable:!0,icon:"print",title:{label_en:"Print",label_es:"Imprimir"}};void 0!==sectionModel.viewQuery&&void 0!==sectionModel.viewQuery.printable&&(void 0!==sectionModel.viewQuery.printable.enable&&(printable.enable=sectionModel.viewQuery.printable.enable),void 0!==sectionModel.viewQuery.printable.title&&(printable.title=sectionModel.viewQuery.printable.title),void 0!==sectionModel.viewQuery.printable.icon&&(printable.icon=sectionModel.viewQuery.printable.icon)),void 0!==sectionModel.printable&&(void 0!==sectionModel.printable.enable&&(printable.enable=sectionModel.printable.enable),void 0!==sectionModel.printable.title&&(printable.title=sectionModel.printable.title),void 0!==sectionModel.printable.icon&&(printable.icon=sectionModel.printable.icon));let downloadable={enable:!0,icon:"download",title:{label_en:"Export",label_es:"Exportar"}};return void 0!==sectionModel.viewQuery&&void 0!==sectionModel.viewQuery.downloadable&&(void 0!==sectionModel.viewQuery.downloadable.enable&&(downloadable.enable=sectionModel.viewQuery.downloadable.enable),void 0!==sectionModel.viewQuery.downloadable.title&&(downloadable.title=sectionModel.viewQuery.downloadable.title),void 0!==sectionModel.viewQuery.downloadable.icon&&(downloadable.icon=sectionModel.viewQuery.downloadable.icon)),void 0!==sectionModel.downloadable&&(void 0!==sectionModel.downloadable.enable&&(downloadable.enable=sectionModel.downloadable.enable),void 0!==sectionModel.downloadable.title&&(downloadable.title=sectionModel.downloadable.title),void 0!==sectionModel.downloadable.icon&&(downloadable.icon=sectionModel.downloadable.icon)),lit.qy`
        <style>
          mwc-icon-button#lang {        
            color : #1473e6; /* rgba(36, 192, 235, 1); */
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }
          mwc-button {
            background-color: #1473e6; /* rgba(36, 192, 235, 1); */
            font-family: Montserrat;
            font-weight: bold;
            font-size: 19px;
            --mdc-theme-primary:#1473e6; /* rgba(36, 192, 235, 1); */
            border-radius: 12px;
          }
          mwc-button.button {        
            color : #1473e6; /* rgba(36, 192, 235, 1); */
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
            background: rgb(36, 192, 235) none repeat scroll 0% 0%;
            font-family: Montserrat;
            font-weight: bold;
            font-size: 19px;
            color: white;
            border-color: transparent !important;
            --mdc-button-fill-color: red;
            --mdc-button-ink-color: blue;
            border-radius: 12px;
          }            
          mwc-icon-button {        
            color : #1473e6; /* rgba(36, 192, 235, 1); */
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }
          mwc-icon-button.disabledtrue{
            color : red;
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }
          mwc-icon-button#video {
            color : #FFFFFF;
            color : #1473e6; /* rgba(36, 192, 235, 1); */
          }
          sp-button {
            background : #24C0EB;
            background : #1473e6; /* rgba(36, 192, 235, 1); */
            border-color : inherit !important;
            border-radius : 35px;
            -moz-border-radius : 35px;
            -webkit-border-radius : 35px;
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
            color : #FFFFFF;
            color : rgb(255, 255, 255);
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
            background: rgba(255, 255, 255, 0) none repeat scroll 0% 0%;
          }
          mwc-textfield.mdc-text-field {
            background-color :  #FFFFFF;
            background-color : rgb(255, 255, 255);
          }
          mwc-textfield.mdc-textfield.mdc-floating-label {
            color: red;
          }
        </style>
          ${!0===refreshable1.enable?lit.qy`
          <mwc-icon-button
              ${void 0===refreshable1||void 0===refreshable1.class?"":lit.qy`class="${refreshable1.class}"`}          
              icon="${refreshable1.icon}" id="refresh"
              title="${refreshable1.title["label_"+this.lang]}"
              @click=${()=>this.GetViewData()}
              style="${void 0!==refreshable1.style?refreshable1.style:""}">
          </mwc-icon-button>`:lit.s6}
        ${!0===printable.enable?lit.qy`
          <mwc-icon-button 
              ${void 0===printable||void 0===printable.class?"":lit.qy`class="${printable.class}"`}
              icon="${printable.icon}" id="printable" 
              title="${printable.title["label_"+this.lang]}"             
              @click=${()=>this.printTable(sectionModel.index)}
              style="${void 0!==printable&&void 0!==printable.style?printable.style:""}">
          </mwc-icon-button>`:lit.s6}
        ${!0===downloadable.enable?lit.qy`
          <mwc-icon-button 
          ${void 0===downloadable||void 0===downloadable.class?"":lit.qy`class="${downloadable.class}"`}
              icon="${downloadable.icon}" id="downloadable" 
              title="${downloadable.title["label_"+this.lang]}"             
              @click=${()=>this.downloadDataTableToCSV(sectionModel,data,selectedItems,downloadable)}
              style="${void 0!==downloadable&&void 0!==downloadable.style?downloadable.style:""}">
          </mwc-icon-button>`:lit.s6}                
          ${void 0!==sectionModel&&sectionModel.actions&&sectionModel.actions.map((action=>lit.qy`

              ${this.btnHidden(action,data)?lit.s6:lit.qy`${action.button?lit.qy`${action.button.icon?lit.qy`<mwc-icon-button id="${action.actionName}"
                                                                                      
                      class="${action.button.class} disabled${this.btnDisabled(action,sectionModel)}"
                      icon="${action.button.icon}" 
                      title="${action.button.title["label_"+this.lang]}" 
                      ?disabled=${this.btnDisabled(action,sectionModel)}
                      ?hidden=${this.btnHidden(action,data)}
                      style="${void 0!==action.button.style?action.button.style:""}"
                      .data=${data}
                      @click=${e=>this.trazitButtonsMethod(e,!1,action,sectionModel,null,null,data,isProcManagement)}></mwc-icon-button>`:lit.qy`${action.button.img?lit.qy`<mwc-icon-button  id="${action.actionName}"
                      class="${!0===this.btnDisabled(action,sectionModel)?"disabledtrue":"disabledfalse"}"
                      title="${action.button.title["label_"+this.lang]}" 
                      ?disabled=${this.btnDisabled(action,sectionModel)}
                      ?hidden=${this.btnHidden(action,data)}
                      style="${void 0!==action.button.style?action.button.style:""}"
                      .data=${data}
                      @click=${e=>this.trazitButtonsMethod(e,!1,action,sectionModel,null,null,data,isProcManagement)}>
                          <img class="iconBtn" src="images/${this.giveFileName(action,sectionModel)}">
                      </mwc-icon-button>`:lit.qy`<mwc-button dense raised id="${action.actionName}"
                      label="${action.button.title["label_"+this.lang]}" 
                      ?disabled=${this.btnDisabled(action,sectionModel)}
                      ?hidden=${this.btnHidden(action,data)}
                      style="${void 0!==action.button.style?action.button.style:""}"
                      .data=${data}
                      @click=${e=>this.trazitButtonsMethod(e,!1,action,sectionModel,null,null,data,isProcManagement)}></mwc-button>`}`}`:lit.s6}`}
          `))}
      `}getSmartFilterButton(sectionModel,data,isProcManagement,lang){let action=sectionModel.smartFilter;if(null!=action)return void 0===sectionModel&&(sectionModel=this.viewModelFromProcModel),console.log("getButtondatasectionModel",sectionModel),console.log("getButtondata",data),lit.qy`
		  <style>
			mwc-icon-button#lang {
			  color : rgba(36, 192, 235, 1);
			  font-family : Montserrat;
			  font-weight : bold;
			  font-size : 19px;
			}
			mwc-button {
			  background-color: rgba(36, 192, 235, 1);
			  font-family: Montserrat;
			  font-weight: bold;
			  font-size: 19px;
			  --mdc-theme-primary:rgba(36, 192, 235, 1);
			  border-radius: 12px;
			}
			mwc-button.button {
			  color : rgba(36, 192, 235, 1);
			  font-family : Montserrat;
			  font-weight : bold;
			  font-size : 19px;
			  background: rgb(36, 192, 235) none repeat scroll 0% 0%;
			  font-family: Montserrat;
			  font-weight: bold;
			  font-size: 19px;
			  color: white;
			  border-color: transparent !important;
			  --mdc-button-fill-color: red;
			  --mdc-button-ink-color: blue;
			  border-radius: 12px;
			}
			mwc-icon-button {
			  color : rgba(36, 192, 235, 1);
			  font-family : Montserrat;
			  font-weight : bold;
			  font-size : 19px;
			}
			mwc-icon-button.disabledtrue{
			  color : red;
			  font-family : Montserrat;
			  font-weight : bold;
			  font-size : 19px;
			}
			mwc-icon-button#video {
			  color : #FFFFFF;
			  color : rgba(36, 192, 235, 1);
			}
			sp-button {
			  background : #24C0EB;
			  background : rgba(36, 192, 235, 1);
			  border-color : inherit !important;
			  border-radius : 35px;
			  -moz-border-radius : 35px;
			  -webkit-border-radius : 35px;
			  font-family : Montserrat;
			  font-weight : bold;
			  font-size : 19px;
			  color : #FFFFFF;
			  color : rgb(255, 255, 255);
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
			  background: rgba(255, 255, 255, 0) none repeat scroll 0% 0%;
			}
			mwc-textfield.mdc-text-field {
			  background-color :  #FFFFFF;
			  background-color : rgb(255, 255, 255);
			}
			mwc-textfield.mdc-textfield.mdc-floating-label {
			  color: red;
			}
		  </style>
      ${!0===refreshable.enable?lit.qy`
        <mwc-icon-button
            ${void 0===refreshable||void 0===refreshable.class?"":lit.qy`class="${refreshable.class}"`}          
            icon="${refreshable.icon}" id="refresh"
            title="${refreshable.title["label_"+this.lang]}"
            @click=${()=>this.GetViewData()}
            style="${void 0!==refreshable.style?refreshable.style:""}">
        </mwc-icon-button>`:lit.s6}                	  
			${this.btnHidden(action)?lit.s6:lit.qy`${action.button?lit.qy`${action.button.icon?lit.qy`<mwc-icon-button id="${action.actionName}"
					class="${action.button.class} disabled${this.btnDisabled(action,sectionModel)}"
					icon="${action.button.icon}"
					title="${action.button.title["label_"+lang]}"
					?disabled=${this.btnDisabled(action,sectionModel)}
					?hidden=${this.btnHidden(action)}
					style="${void 0!==action.button.style?action.button.style:""}"
					@click=${e=>this.trazitButtonsMethod(e,!1,action,sectionModel,null,null,data,isProcManagement)}></mwc-icon-button>`:lit.qy`${action.button.img?lit.qy`<mwc-icon-button  id="${action.actionName}"
					class="${!0===this.btnDisabled(action,sectionModel)?"disabledtrue":"disabledfalse"}"
					title="${action.button.title["label_"+lang]}"
					?disabled=${this.btnDisabled(action,sectionModel)}
					?hidden=${this.btnHidden(action)}
					style="${void 0!==action.button.style?action.button.style:""}"
					@click=${e=>this.trazitButtonsMethod(e,!1,action,sectionModel,null,null,data,isProcManagement)}>
						<img class="iconBtn" src="images/${this.giveFileName(action,sectionModel)}">
					</mwc-icon-button>`:lit.qy`<mwc-button dense raised id="${action.actionName}"
					label="${action.button.title["label_"+lang]}"
					?disabled=${this.btnDisabled(action,sectionModel)}
					?hidden=${this.btnHidden(action)}
					style="${void 0!==action.button.style?action.button.style:""}"
					@click=${e=>this.trazitButtonsMethod(e,!1,action,sectionModel,null,null,data,isProcManagement)}></mwc-button>`}`}`:lit.s6}`}`}giveFileName(action,sectionModel){const originalExtension=action.button.img.split(".").pop();return action.button.img.replace(/\.[^/.]+$/,`_${!0===this.btnDisabled(action,sectionModel)?"disabledtrue":"disabledfalse"}.${originalExtension}`)}btnDisabled(action,viewModelFromProcModel){let selRecord=[];selRecord=void 0!==viewModelFromProcModel.alternativeItemPropertyName?this[viewModelFromProcModel.alternativeItemPropertyName]:this.selectedItems;let d=!1;if(void 0!==action.certificationException&&!0===action.certificationException)return!1;if(void 0===selRecord||0==selRecord.length)return void 0===action.button.requiresGridItemSelected||!1!==action.button.requiresGridItemSelected||(d=this.disabledByCertification(action),d);if(void 0===viewModelFromProcModel&&(viewModelFromProcModel=this.viewModelFromProcModel),void 0!==action.mode&&"READONLY"===action.mode.toString().toUpperCase())return!0;if(void 0!==viewModelFromProcModel.mode&&"READONLY"===viewModelFromProcModel.mode.toString().toUpperCase())return!0;if(void 0!==action.buttonForQuery&&!0===action.buttonForQuery);else if(d=this.disabledByCertification(action),d)return d;return void 0!==action.button.requiresGridItemSelected?!1!==action.button.requiresGridItemSelected&&(void 0!==viewModelFromProcModel.alternativeItemPropertyName?void 0===this[viewModelFromProcModel.alternativeItemPropertyName]||!(this[viewModelFromProcModel.alternativeItemPropertyName].length>0):void 0===selRecord||void 0===selRecord[0]):d}btnHiddenForRows(action,selItems){let selRow=selItems[0],d=!1;return void 0!==selRow&&void 0!==selRow["No Data"]||(void 0!==action.button&&void 0!==action.button.showWhenSelectedItem&&1===selItems.length?void 0===selRow||void 0===selRow||(Array.isArray(action.button.showWhenSelectedItem)?(action.button.showWhenSelectedItem.forEach((rowArray=>{let curValue=String(rowArray.value).split("|");"*NULL*"===rowArray.value?0==selRow[rowArray.column].length&&(d=!1):String(rowArray.value).toUpperCase().includes("*NOT")&&String(rowArray.value).toUpperCase().includes("NULL*")?selRow[rowArray.column].length>0&&(d=!1):d=!!curValue.includes(selRow[rowArray.column])})),d):"*NULL*"===action.button.showWhenSelectedItem.value?0!=selRow[action.button.showWhenSelectedItem.column].length:String(action.button.showWhenSelectedItem.value).toUpperCase().includes("*NOT")&&String(action.button.showWhenSelectedItem.value).toUpperCase().includes("NULL*")?!(selRow[action.button.showWhenSelectedItem.column].length>0):selRow[action.button.showWhenSelectedItem.column]!==action.button.showWhenSelectedItem.value):void 0!==action.button&&void 0!==action.button.hideWhenSelectedItem&&1===selItems.length?void 0===selRow||void 0===selRow||(Array.isArray(action.button.hideWhenSelectedItem)?(action.button.hideWhenSelectedItem.forEach((rowArray=>{d="*NULL*"===rowArray.value?0==selRow[rowArray.column].length:String(rowArray.value).toUpperCase().includes("*NOT")&&String(rowArray.value).toUpperCase().includes("NULL*")?selRow[rowArray.column].length>0:selRow[rowArray.column]!=rowArray.value})),!d):"*NULL*"===action.button.hideWhenSelectedItem.value?0==selRow[action.button.hideWhenSelectedItem.column].length:String(action.button.hideWhenSelectedItem.value).toUpperCase().includes("*NOT")&&String(action.button.hideWhenSelectedItem.value).toUpperCase().includes("NULL*")?selRow[action.button.hideWhenSelectedItem.column].length>0:selRow[action.button.hideWhenSelectedItem.column]===action.button.hideWhenSelectedItem.value):(d=!1,d))}btnHidden(action,selItems){if(void 0!==selItems)return selItems.length>1&&(void 0===action.button||void 0===action.button.requiresGridItemSelected||!0===action.button.requiresGridItemSelected)&&(void 0===action.actionForMultiSelect||!0!==action.actionForMultiSelect)||this.btnHiddenForRows(action,selItems);let d=!1;if(void 0===action||void 0===action.button)return d;if(void 0!==action.button.showWhenSelectedItem&&1===selItems.length){if(void 0===this.selectedItems||void 0===this.selectedItems[0])return!0;if(Array.isArray(action.button.showWhenSelectedItem))return action.button.showWhenSelectedItem.forEach((rowArray=>{let curValue=String(rowArray.value).split("|");"*NULL*"===rowArray.value?0==this.selectedItems[0][rowArray.column].length&&(d=!0):String(rowArray.value).toUpperCase().includes("*NOT")&&String(rowArray.value).toUpperCase().includes("NULL*")?this.selectedItems[0][rowArray.column].length>0&&(d=!0):d=!!curValue.includes(this.selectedItems[0][rowArray.column])})),d;if("*NULL*"===action.button.showWhenSelectedItem.value)0==this.selectedItems[0][action.button.showWhenSelectedItem.column].length&&(d=!0);else{if(!String(action.button.showWhenSelectedItem.value).toUpperCase().includes("*NOT")||!String(action.button.showWhenSelectedItem.value).toUpperCase().includes("NULL*"))return this.selectedItems[0][action.button.showWhenSelectedItem.column]!==action.button.showWhenSelectedItem.value;this.selectedItems[0][action.button.showWhenSelectedItem.column].length>0&&(d=!0)}}else if(void 0!==action.button.hideWhenSelectedItem&&1===selItems.length){if(void 0===this.selectedItems||void 0===this.selectedItems[0])return!0;if(Array.isArray(action.button.hideWhenSelectedItem))return action.button.hideWhenSelectedItem.forEach((rowArray=>{"*NULL*"===rowArray.value?0==this.selectedItems[0][rowArray.column].length&&(d=!0):String(rowArray.value).toUpperCase().includes("*NOT")&&String(rowArray.value).toUpperCase().includes("NULL*")?this.selectedItems[0][rowArray.column].length>0&&(d=!0):this.selectedItems[0][rowArray.column]!=rowArray.value&&(d=!0)})),!d;if("*NULL*"===action.button.hideWhenSelectedItem.value)0==this.selectedItems[0][action.button.hideWhenSelectedItem.column].length&&(d=!0);else{if(!String(action.button.hideWhenSelectedItem.value).toUpperCase().includes("*NOT")||!String(action.button.hideWhenSelectedItem.value).toUpperCase().includes("NULL*"))return this.selectedItems[0][action.button.hideWhenSelectedItem.column]===action.button.hideWhenSelectedItem.value;this.selectedItems[0][action.button.hideWhenSelectedItem.column].length>0&&(d=!0)}}else d=!1;return d}getFromMasterData(){if(void 0===this.procInstanceName)return void alert("Proc Instance Name not found");if(void 0===this.masterData)return entries;console.log("masterData",this.masterData),console.log("actionBeingPerformedModel",this.actionBeingPerformedModel);let entries=[];return void 0===this.masterData[this.viewModelFromProcModel.viewQuery.actionName]?(alert("Property "+fldMDDef.propertyNameContainer+" not found in Master Data"),[]):this.masterData[this.viewModelFromProcModel.viewQuery.actionName]}setTheValues(queryDefinition,j){void 0!==queryDefinition.notUseGrid&&!0===queryDefinition.notUseGrid?void 0!==queryDefinition.variableName?void 0!==queryDefinition.endPointResponseVariableName?this[queryDefinition.variableName]=j[queryDefinition.endPointResponseVariableName]:this[queryDefinition.variableName]=j:(this.selectedItems=j,this.selectedItem=this.selectedItems[0],console.log("this.selectedItems",this.selectedItems),j&&!j.is_error?this.requestData=j:this.requestData={}):(this.ready=!0,void 0!==this.setGrid?j&&!j.is_error?this.setGrid(j):this.setGrid():j&&!j.is_error?this.requestData=j:this.requestData={}),this.samplesReload=!1}async GetViewData(setGrid=!0,viewQuery){void 0===viewQuery&&(viewQuery=this.viewModelFromProcModel.viewQuery);let queryDefinition=viewQuery;if(void 0===queryDefinition)return;let params={};if(void 0!==viewQuery&&void 0!==viewQuery.clientMethod){if(void 0===this[viewQuery.clientMethod])return void alert("not found any clientMethod called "+viewQuery.clientMethod);let j=this[viewQuery.clientMethod]();return void this.setTheValues(viewQuery,j)}void 0!==this.config&&void 0!==this.config.backendUrl||(this.config=JSON.parse(sessionStorage.getItem("userSession"))),this.samplesReload=!0,this.selectedItems=[];let APIParams=this.getAPICommonParams(queryDefinition),viewParams=this.jsonParam(queryDefinition),endPointUrl=this.getQueryAPIUrl(queryDefinition);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);let serviceAPIurl=this.getServiceAPIUrl(viewQuery);if(void 0===this.config.backendUrl&&void 0===serviceAPIurl){serviceAPIurl="https://platform.trazit.net:8443/TRAZiT-API";let sessionDbName=JSON.parse(sessionStorage.getItem("userSession")).dbName;void 0!==sessionDbName&&(this.config.dbName=sessionDbName),void 0===this.config.dbName&&(this.config.dbName="labplanet",this.config.isForTesting=!1)}params=serviceAPIurl+endPointUrl+"?"+new URLSearchParams(APIParams)+"&"+new URLSearchParams(viewParams),this.dispatchEvent(new CustomEvent("show-progress",{bubbles:!0,composed:!0})),await this.fetchApi(params,!1,queryDefinition).then((j=>{if(("ONE_PROCEDURE_DEFINITION"===queryDefinition.actionName||"ALL_PROCEDURES_DEFINITION"===queryDefinition.actionName)&&void 0!==j.master_data){let userSession=JSON.parse(sessionStorage.getItem("userSession"));userSession.proc_management_masterdata={},userSession.proc_management_masterdata=j.master_data,sessionStorage.setItem("userSession",JSON.stringify(userSession))}if(void 0!==queryDefinition.dataResponse&&"ArrayInRoot"===queryDefinition.dataResponse){let arrayToSingleObject={};return arrayToSingleObject.queryData=j,void(this.selectedItemInView=arrayToSingleObject)}if(queryDefinition.notUseGrid,void 0!==queryDefinition.notUseGrid&&!0===queryDefinition.notUseGrid)if(void 0!==queryDefinition.variableName)void 0!==queryDefinition.endPointResponseVariableName?this[queryDefinition.variableName]=j[queryDefinition.endPointResponseVariableName]:this[queryDefinition.variableName]=j;else{if(this.selectedItems=j,void 0!==this.selectedItems[0]&&null!==this.selectedItems[0]){if(this.selectedItem=this.selectedItems[0],this.selectedItemInView)if(1==j.length)this.selectedItemInView=j[0];else{const uniqueKey=this.viewModelFromProcModel.viewQuery.selectedItemKeyProperty,newItem=j.find((item=>item[uniqueKey]===this.selectedItemInView[uniqueKey]));newItem&&(this.selectedItemInView=newItem)}this.render()}j&&!j.is_error?this.requestData=j:this.requestData={}}else j&&!j.is_error?this.requestData=j:this.requestData={}})),this.dispatchEvent(new CustomEvent("hide-progress",{bubbles:!0,composed:!0})),this.ready=!0,this.requestUpdate(),this.samplesReload=!1}async GetAlternativeViewData(queryDefinition,selObject={}){if(void 0!==queryDefinition.clientMethod)return void 0===this[queryDefinition.clientMethod]?void alert("not found any clientMethod called "+queryDefinition.clientMethod):void this[queryDefinition.clientMethod]();console.log("GetAlternativeViewData","queryDefinition",queryDefinition);let APIParams=this.getAPICommonParams(queryDefinition),viewParams=this.jsonParam(queryDefinition,selObject),endPointUrl=this.getQueryAPIUrl(queryDefinition),params=this.getServiceAPIUrl(queryDefinition)+endPointUrl+"?"+new URLSearchParams(APIParams)+"&"+new URLSearchParams(viewParams);this.dispatchEvent(new CustomEvent("show-progress",{bubbles:!0,composed:!0})),await this.fetchApi(params).then((j=>{j&&!j.is_error?this.setGrid(j):this.setGrid()})),this.dispatchEvent(new CustomEvent("hide-progress",{bubbles:!0,composed:!0})),this.samplesReload=!1}async GetQueryForDialogGrid(actionDefinition){if(console.log("GetQueryForDialogGrid",actionDefinition),void 0===actionDefinition.dialogQuery)return;let currQuery=actionDefinition.dialogQuery;if(void 0!==currQuery.clientMethod)return void 0===this[currQuery.clientMethod]?void alert("not found any clientMethod called "+currQuery.clientMethod):void this[currQuery.clientMethod]();console.log("GetQueryForDialogGrid","currQuery",currQuery);let APIParams=this.getAPICommonParams(currQuery),viewParams=this.jsonParam(currQuery),endPointUrl=this.getQueryAPIUrl(currQuery),params=this.getServiceAPIUrl(currQuery)+endPointUrl+"?"+new URLSearchParams(APIParams)+"&"+new URLSearchParams(viewParams);this.dispatchEvent(new CustomEvent("show-progress",{bubbles:!0,composed:!0})),await this.fetchApi(params).then((j=>{j&&!j.is_error?this.genericDialogGridItems=j:this.genericDialogGridItems=[]})),this.dispatchEvent(new CustomEvent("hide-progress",{bubbles:!0,composed:!0}))}async GetQueriesForDialog(actionDefinition){if(console.log("GetQueriesForDialog",actionDefinition),void 0===actionDefinition.dialogQueries)return;let i=0;for(i=0;i<actionDefinition.dialogQueries.length;i++){let currQuery=actionDefinition.dialogQueries[i];if(void 0!==currQuery.clientMethod)return void 0===this[currQuery.clientMethod]?void alert("not found any clientMethod called "+currQuery.clientMethod):void this[currQuery.clientMethod]();console.log("GetQueriesForDialog","currQuery",currQuery);let APIParams=this.getAPICommonParams(currQuery),viewParams=this.jsonParam(currQuery);if(void 0===currQuery)return;let endPointUrl=this.getQueryAPIUrl(currQuery),params=this.getServiceAPIUrl(currQuery)+endPointUrl+"?"+new URLSearchParams(APIParams)+"&"+new URLSearchParams(viewParams);this.dispatchEvent(new CustomEvent("show-progress",{bubbles:!0,composed:!0})),await this.fetchApi(params).then((j=>{j&&!j.is_error?this[currQuery.variableForData]=j:this[currQuery.variableForData]=[]}))}this.dispatchEvent(new CustomEvent("hide-progress",{bubbles:!0,composed:!0})),this.samplesReload=!1}async getGenericDialogGridItems(dialogInfo){if(!(void 0!==dialogInfo.gridContent&&!1!==dialogInfo.gridContent||void 0!==dialogInfo.filesListContent&&!1!==dialogInfo.filesListContent))return[];if(void 0===dialogInfo.masterDataEntryName&&void 0===dialogInfo.dialogQuery&&void 0===dialogInfo.gridContent&&void 0===dialogInfo.filesListContent)return alert("By now, the getGenericDialogGridItems only works for master data entries or dialogQuery or gridContent or filesListContent"),[];let data=[];if(void 0!==dialogInfo.masterDataEntryName)return this.getProcMasterData(),void 0===this.masterData?[]:void 0===this.masterData[dialogInfo.masterDataEntryName]?(alert("the procedure instance "+this.procInstanceName+" has no one master data entry called "+dialogInfo.masterDataEntryName),[]):(this.genericDialogGridItems=[],this.genericDialogGridItems=this.masterData[dialogInfo.masterDataEntryName],this.genericDialogGridItems);if(void 0!==dialogInfo.dialogQuery)return await this.GetQueryForDialogGrid(dialogInfo),this.genericDialogGridItems;return data.push({analysis:"hola",method_name:"method",method_version:1}),console.log("genericDialogGridItems",data),data}disabledByCertification(action){return!1}}}}}]);
//# sourceMappingURL=794.912e56c3.iframe.bundle.js.map
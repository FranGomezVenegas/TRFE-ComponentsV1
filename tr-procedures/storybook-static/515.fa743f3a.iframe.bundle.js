"use strict";(self.webpackChunk_trazit_tr_procedures=self.webpackChunk_trazit_tr_procedures||[]).push([[515],{"./src/components/DragDropTable/drag-drop.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DrapDrop:()=>DrapDrop});var lit=__webpack_require__("./node_modules/lit/index.js"),dist=__webpack_require__("./node_modules/lit-vaadin-helpers/dist/index.js"),lit_flexbox_literals_dist=__webpack_require__("./node_modules/@collaborne/lit-flexbox-literals/dist/index.js"),AuditFunctions=(__webpack_require__("./node_modules/@material/mwc-button/mwc-button.js"),__webpack_require__("./node_modules/@material/mwc-icon-button/mwc-icon-button.js"),__webpack_require__("./node_modules/@material/mwc-textfield/mwc-textfield.js"),__webpack_require__("./node_modules/@material/mwc-select/mwc-select.js"),__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid.js"),__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid-column.js"),__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid-selection-column.js"),__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid-sort-column.js"),__webpack_require__("./node_modules/@vaadin/vaadin-grid/vaadin-grid-filter-column.js"),__webpack_require__("./node_modules/@vaadin/vaadin-context-menu/vaadin-context-menu.js"),__webpack_require__("./.yalc/@trazit/cred-dialog/index.js"),__webpack_require__("./src/gridmodel-bottomcomp-chart.js"),__webpack_require__("./src/components/templates-.js"),__webpack_require__("./.yalc/@trazit/cred-dialog/.yalc/@trazit/tr-dialog/tr-dialog.js"),__webpack_require__("./src/components/Audit/AuditFunctions.js")),ButtonsFunctions=__webpack_require__("./src/components/Buttons/ButtonsFunctions.js"),GridFunctions=__webpack_require__("./src/components/grid_with_buttons/GridFunctions.js"),ModuleEnvMonitClientMethods=__webpack_require__("./src/module_env_monit/ModuleEnvMonitClientMethods.js"),ProceduresModel=__webpack_require__("./src/ProceduresModel.js"),TrazitGenericDialogs=__webpack_require__("./src/components/GenericDialogs/TrazitGenericDialogs.js"),TrazitReactivateObjectsDialog=__webpack_require__("./src/components/GenericDialogs/TrazitReactivateObjectsDialog.js"),TrazitEnterResultWithSpec=__webpack_require__("./src/components/GenericDialogs/TrazitEnterResultWithSpec.js"),ModuleEnvMonitDialogsMicroorganism=__webpack_require__("./src/module_env_monit/Dialogs/ModuleEnvMonitDialogsMicroorganism.js"),TrazitInvestigationsDialog=__webpack_require__("./src/components/GenericDialogs/TrazitInvestigationsDialog.js"),TrazitCredentialsDialogs=__webpack_require__("./src/components/GenericDialogs/TrazitCredentialsDialogs.js"),TrazitTakePictureDialog=__webpack_require__("./src/components/GenericDialogs/TrazitTakePictureDialog.js"),lit_element=__webpack_require__("./node_modules/lit-element/lit-element.js");__webpack_require__("./node_modules/@material/mwc-icon/mwc-icon.js");const template=(props1,data,lang1,thisComponent)=>lit_element.qy`
    <div style="display:flex; flex-direction:row; gap:12px;">
      ${props1.definition.map(((curTable,ii1)=>lit_element.qy`
        ${void 0===curTable.name||void 0===curTable.type?lit_element.qy`The object ${ii1} has no name or type attribute, this is mandatory`:lit_element.qy` 
            <div style="display:flex; flex-direction:column; gap:12px; align-items: center;">
              ${void 0===curTable.title?lit_element.qy``:lit_element.qy` 
                <p style="width: 100%; display: flex; justify-content: center;">
                  <span class="title">${curTable.title["label_"+lang1]}</span>
                </p>
              `}              
              ${"table"===curTable.type?function myTable(elem,dataArr,lang1,props1,thisComponent){(dataArr=getDataFromRoot(elem,dataArr))&&0!=Object.keys(elem.smartFilter.filterValues).length&&(dataArr=applyFilterToTheData(dataArr,elem.smartFilter.filterValues));const renderTable=()=>lit_element.qy`
      <div style="flex:1;">
          <!-- Smart Filter UI -->
          ${elem.smartFilter?lit_element.qy`
              <div class="smart-filter-container">
                  <div>
                      <span>
                          <button class="smart-filter-button" @click="${()=>{thisComponent.toggleFilterDialog(elem.name)}}">
                              ${elem.smartFilter?.displayFilterButton?.title["label_"+lang1]}
                          </button>
                      </span>
                  </div>
                  <div id="smartFilterDiv_${elem.name}" ?hidden="${thisComponent.hideFilters(elem.name)}">
                      ${elem.smartFilter?.dialogInfo?.fields?.map(((fld,i)=>lit_element.qy`
                              ${fld?lit_element.qy`
                                  ${"select"===fld.type?lit_element.qy`
                                      <div class="smart-filter-field layout horizontal flex center-center">
                                          <mwc-select id="list1" name="${fld.name}">
                                              <mwc-list-item value="" name="">Select</mwc-list-item>
                                              ${fld.select_options.map(((c,i)=>lit_element.qy`<mwc-list-item value="${c.value}" name="${c.name}">${c["lable_"+lang1]}</mwc-list-item>`))}
                                          </mwc-select>
                                      </div>
                                  `:lit_element.qy`
                                      <div class="smart-filter-field layout horizontal flex center-center">
                                          <mwc-textfield class="layout flex" id="smartFilter_text_${i}" type="text"
                                              value=${fld.default_value?fld.default_value:""}
                                              label="${fld["label_"+lang1]}"
                                              @keypress=${e=>13==e.keyCode&&thisComponent.genomaSuperDialogClickedAction()}>
                                          </mwc-textfield>
                                      </div>
                                  `}
                              `:lit_element.qy``}
                          `))}
                      <div class="smart-filter-actions">
                          <span>
                              <button class="smart-filter-button" @click="${()=>handleFilter(elem,thisComponent)}">
                                  ${elem.smartFilter?.applyFilterButton?.title["label_"+lang1]}
                              </button>
                          </span>
                          <span>
                              <button class="smart-filter-button" @click="${()=>handleClear(elem,thisComponent)}">
                                  ${elem.smartFilter?.clearFilterButton?.title["label_"+lang1]}
                              </button>
                          </span>
                      </div>
                  </div>
              </div>
          `:void 0}
          <!-- Table -->
          <table class="dragdropable TRAZiT-DefinitionArea">
              <thead>
                  ${elem.columns.map(((column,i)=>lit_element.qy`<th>${column["label_"+lang1]}</th>`))}
              </thead>
              <tbody>
                  ${void 0!==dataArr&&Array.isArray(dataArr)?lit_element.qy`
                          ${dataArr.map(((p,idx)=>lit_element.qy`
                              <tr class="dragdropabletr" draggable="${elem.dragEnable}"
                                  @dragstart=${e=>props1.dragTableTr(e,elem,p)}
                                  @dragover=${e=>props1.allowDropTr(e)}
                                  @drop=${e=>props1.dropTableTr(e,elem,p)}>
                                  ${elem.columns.map(((fld,index1)=>lit_element.qy`<td>${p[fld.name]}</td>`))}
                                  ${void 0===elem.row_buttons?lit_element.qy``:lit_element.qy`
                                      <td>
                                          <div class="layout horizontal center flex wrap">
                                              ${thisComponent.getButtonForRows(elem.row_buttons,p,!1,parentData)}
                                          </div>
                                      </td>
                                  `}
                              </tr>
                          `))}
                      `:lit_element.qy`No Data`}
              </tbody>
          </table>
      </div>
  `;return renderTable()}(curTable,data,lang1,props1,thisComponent):lit_element.qy``}
              ${"cards"===curTable.type?function cardSomeElementsRepititiveObjects(elem,data,lang1,props1,thisComponent){data=getDataFromRoot(elem,data),data&&0!=Object.keys(elem.smartFilter.filterValues).length&&(data=applyFilterToTheData(data,elem.smartFilter.filterValues));return console.log("cardSomeElementsRepititiveObjects >> getDataFromRoot","elem",elem,"data",data),lit_element.qy`
      <div style="flex:1;">
      <!-- Smart Filter UI -->
      ${elem.smartFilter?lit_element.qy`
                        <div class="smart-filter-container">
                  <div>
                      <span>
                          <button class="smart-filter-button" @click="${()=>{thisComponent.toggleFilterDialog(elem.name)}}">
                              ${elem.smartFilter?.displayFilterButton?.title["label_"+lang1]}
                          </button>
                      </span>
                  </div>
                  <div id="smartFilterDiv_${elem.name}" ?hidden="${thisComponent.hideFilters(elem.name)}">
                      ${elem.smartFilter?.dialogInfo?.fields?.map(((fld,i)=>lit_element.qy`
                              ${fld?lit_element.qy`
                                  ${"select"===fld.type?lit_element.qy`
                                      <div class="smart-filter-field layout horizontal flex center-center">
                                          <mwc-select id="list1" name="${fld.name}">
                                              <mwc-list-item value="" name="">Select</mwc-list-item>
                                              ${fld.select_options.map(((c,i)=>lit_element.qy`<mwc-list-item value="${c.value}" name="${c.name}">${c["lable_"+lang1]}</mwc-list-item>`))}
                                          </mwc-select>
                                      </div>
                                  `:lit_element.qy`
                                      <div class="smart-filter-field layout horizontal flex center-center">
                                          <mwc-textfield class="layout flex" id="smartFilter_text_${i}" type="text"
                                              value=${fld.default_value?fld.default_value:""}
                                              label="${fld["label_"+lang1]}"
                                              @keypress=${e=>13==e.keyCode&&thisComponent.genomaSuperDialogClickedAction()}>
                                          </mwc-textfield>
                                      </div>
                                  `}
                              `:lit_element.qy``}
                          `))}
                      <div class="smart-filter-actions">
                          <span>
                              <button class="smart-filter-button" @click="${()=>handleFilter(elem,thisComponent)}">
                                  ${elem.smartFilter?.applyFilterButton?.title["label_"+lang1]}
                              </button>
                          </span>
                          <span>
                              <button class="smart-filter-button" @click="${()=>handleClear(elem,thisComponent)}">
                                  ${elem.smartFilter?.clearFilterButton?.title["label_"+lang1]}
                              </button>
                          </span>
                      </div>
                  </div>
              </div>

      `:void 0}

          ${Array.isArray(data)&&data?.map(((d,i)=>lit_element.qy` ${function kpiCardSomeElementsMain(elem,curDataForThisCard,lang1,props1,thisComponent){return lit_element.qy`
    ${void 0===elem||void 0===elem.title?lit_element.qy``:lit_element.qy`<span
          style="color: rgb(20, 115, 230);font-size: 30px;margin-top: 10px;font-weight: bold;"
          >${elem.title["label_"+lang1]}</span
        >`}
    ${void 0===curDataForThisCard?lit_element.qy`${void 0!==elem.hideNoDataMessage&&elem.hideNoDataMessage?"":"No columns defined"}`:lit_element.qy`     
          <div
            id="main${void 0!==elem.add_border&&1==elem.add_border?"addborder":""}"
            class="layout vertical flex wrap"
            style="${void 0!==elem.style?elem.style:""}"
            class="dragdropabletr" draggable="${elem.dragEnable}"  @dragstart=${e=>props1.dragTableTr(e,elem,curDataForThisCard)} @dragover=${e=>props1.allowDropTr(e)} @drop=${e=>props1.dropTableTr(e,elem,curDataForThisCard)}>
            <div style="flex-basis: auto; width: auto;">
             <!-- this.getButton(elem, curDataForThisCard, true)} -->
            </div>
            <ul
              style="align-items: baseline;"
              class="column-list${void 0!==elem.num_columns?elem.num_columns:""}"
            >
            ${void 0===elem.fieldsToDisplay?lit_element.qy``:lit_element.qy`
              ${elem.fieldsToDisplay.map(((fld,i)=>lit_element.qy`
                    ${!0===function fieldsToDiscard(fld){if(void 0===fld.is_translation||!1===fld.is_translation)return!1;return!0!==fld.is_translation||!fld.name.endsWith(lang)}(fld)?lit_element.qy``:lit_element.qy`
                          ${void 0===fld.as_ppt||!0!==fld.as_ppt&&!0!==fld.as_video?lit_element.qy`
                            ${void 0!==fld.is_tag_list&&!0===fld.is_tag_list?lit_element.qy`
                            <span class="cardLabel">${fieldLabel(fld,lang1)}:</span>
                            <span class="cardValue">
                              <multi-select .label=${this.purpose} .props=${{readOnly:!0,displayLabel:!1}} .activeOptions=${curDataForThisCard[fld.name]} .options=${{}}> </multi-select>
                            </span>
                            `:lit_element.qy`
                                ${void 0!==fld.as_progress&&!0===fld.as_progress?lit_element.qy`
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
                                          font-size: 8px;
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
                                          title="${titleLang(fld)}"
                                        >
                                          <div
                                            title="${titleLang(fld)}"
                                            class="w3-container w3-blue w3-round-xlarge"
                                            style="width:${curDataForThisCard[fld.name]}%"
                                          >
                                            ${fld.name}:
                                            ${void 0===curDataForThisCard[fld.name]||0==curDataForThisCard[fld.name].length?"0":curDataForThisCard[fld.name]}%
                                          </div>
                                        </div>
                                      </div>
                                      <br />
                                    `:lit_element.qy`
                                      <li>
                                        <span class="cardLabel">
                                          ${fieldLabel(fld,lang1)}:
                                        </span>
                                        <span class="cardValue">
                                          ${curDataForThisCard[fld.name]}
                                          ${void 0!==fld.fix_value_suffix?fld.fix_value_suffix:""}
                                          ${void 0!==fld.fix_value2_prefix?fld.fix_value2_prefix:""}
                                          ${void 0!==fld.name2?curDataForThisCard[fld.name2]:""}
                                          ${void 0!==fld.fix_value2_suffix?fld.fix_value2_suffix:""}
                                          ${void 0!==fld.fix_value3_prefix?fld.fix_value3_prefix:""}
                                          ${void 0!==fld.name3?curDataForThisCard[fld.name3]:""}
                                          ${void 0!==fld.fix_value3_suffix?fld.fix_value3_suffix:""}
                                        </span>
                                      </li>
                                    `}
                              `}
                            `:lit_element.qy`
                                <mwc-icon-button
                                  icon="fullscreen"
                                  .isvideo=${curDataForThisCard.is_video}
                                  .src=${curDataForThisCard[fld.name]}
                                  @click=${this.openDialogFrame}
                                  .fld=${fld}
                                ></mwc-icon-button>
                                ${void 0===curDataForThisCard.is_video||!1===curDataForThisCard.is_video?lit_element.qy`
                                      <iframe
                                        src=${curDataForThisCard[fld.name]}
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
                                    `:lit_element.qy`

<!---
                          <video controls type="video/mp4" src=${curDataForThisCard[fld.name]} controlsList="nodownload"oncontextmenu="return false" onselectstart="return false" ondragstart="return false"></video>
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
  `}(elem,d,lang1,props1)} `))}
          </div>        
  `}(curTable,data,lang1,props1,thisComponent):lit_element.qy``}
              ${"table"!==curTable.type&&"cards"!==curTable.type?lit_element.qy`The type ${curTable.type} is not recognized`:lit_element.qy``}
            </div>
          `}  
      `))}        
    </div>
  `;function handleFilter(elem,thisComponent){let filterDiv=thisComponent.shadowRoot.querySelectorAll(`#smartFilterDiv_${elem.name} mwc-textfield`);console.log(filterDiv);let selectFilterDiv=thisComponent.shadowRoot.querySelector(`#smartFilterDiv_${elem.name} mwc-select`);if(filterDiv.forEach(((elm,i)=>{let value=elm.shadowRoot.querySelector(".mdc-text-field__input").value;elem.smartFilter.dialogInfo.fields[i]?.name&&(elem.smartFilter.filterValues[elem.smartFilter.dialogInfo.fields[i].name]=value)})),selectFilterDiv){let name=selectFilterDiv.getAttribute("name"),value=selectFilterDiv.shadowRoot.querySelector("input").value;console.log(selectFilterDiv.shadowRoot.querySelector("input")),elem.smartFilter.filterValues[name]=value}thisComponent.requestUpdate()}function handleClear(elem,thisComponent){elem.smartFilter.filterValues={};let filterDiv=thisComponent.shadowRoot.querySelectorAll(`#smartFilterDiv_${elem.name} mwc-textfield`),selectFilterDiv=thisComponent.shadowRoot.querySelector(`#smartFilterDiv_${elem.name} mwc-select`);selectFilterDiv&&(selectFilterDiv.shadowRoot.querySelector("input").value="null"),filterDiv.forEach(((elm,i)=>{const input=elm.shadowRoot.querySelector(".mdc-text-field__input");input&&(input.value="")})),thisComponent.requestUpdate()}function fieldLabel(fld,lang1){return void 0!==fld["label_"+lang1]?fld["label_"+lang1]:fld.name}function titleLang(colDef){return void 0!==colDef.title?colDef.title["label_"+lang]:colDef.name}function applyFilterToTheData(curDataForThisCard,filterValues){const uniqueItemsSet=new Set;for(const key in filterValues){const filterValue=filterValues[key];if(Array.isArray(curDataForThisCard)){const filteredItems=curDataForThisCard.filter((item=>!(!item[key]||!filterValue)&&item[key]==filterValue));console.log(filteredItems),filteredItems.forEach((item=>uniqueItemsSet.add(item)))}}return Array.from(uniqueItemsSet)}function getDataFromRoot(elem,curDataForThisCard){if(void 0!==elem&&void 0!==elem.contextVariableName&&void 0!==this[elem.contextVariableName]&&(curDataForThisCard=this[elem.contextVariableName]),null!=curDataForThisCard){if(void 0!==elem.endPointPropertyArray){if(0===elem.endPointPropertyArray.length)return curDataForThisCard;if(1===elem.endPointPropertyArray.length&&"ROOT"===elem.endPointPropertyArray[0].toUpperCase())return curDataForThisCard;let i=0,subJSON={};for(i=0;i<elem.endPointPropertyArray.length;i++){if(null===curDataForThisCard)return;let propertyName=elem.endPointPropertyArray[i];if(Array.isArray(curDataForThisCard[propertyName])){if(!(i<elem.endPointPropertyArray.length-1))return curDataForThisCard[propertyName];subJSON=curDataForThisCard[propertyName][0]}else subJSON=curDataForThisCard[propertyName];if(void 0===subJSON)return curDataForThisCard;curDataForThisCard=subJSON}return curDataForThisCard}if(void 0!==elem.endPointResponseObject&&void 0!==elem.endPointResponseObject2){let curDataForThisCardToRet=[];return curDataForThisCardToRet=curDataForThisCard[elem.endPointResponseObject],void 0!==curDataForThisCardToRet?curDataForThisCardToRet[elem.endPointResponseObject2]:[]}if("ROOT"===String(elem.endPointResponseObject).toUpperCase()){if(!Array.isArray(curDataForThisCard)){let curDataForThisCardArr=[];return curDataForThisCardArr.push(curDataForThisCard),curDataForThisCardArr}return curDataForThisCard}return curDataForThisCard[elem.endPointResponseObject]}}const styles=lit_element.AH`
  :host([disabled]) {
  }
  * {
    box-sizing: border-box;
  }
  .title {
    color: #2989d8;
    font-size: 18px;
    font-weight: bold;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    color: white;
  }
  
  th, td {
    text-align: left;
    padding: 8px;
  }
  
  th {
    background-color: #04AA6D;
    color: white;
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
    background-color: rgba(214, 233, 248, 0.37);
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

  .undropable {
    cursor: no-drop !important;
  }

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
  
  /* Smart Filter Container */
.smart-filter-container {
    background: rgb(36, 192, 235);
    padding: 15px;
    border-radius: 10px;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Smart Filter Buttons */
.smart-filter-button {
    background: linear-gradient(79deg, #4668db, #9d70cd);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.smart-filter-button:hover {
    opacity: 0.9;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.smart-filter-button:active {
    transform: translateY(2px);
}

/* Smart Filter Fields */
.smart-filter-field {
    margin: 10px 0;
}

.smart-filter-field mwc-select, .smart-filter-field mwc-textfield {
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    transition: all 0.3s ease;
}

.smart-filter-field mwc-select:hover, .smart-filter-field mwc-textfield:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Smart Filter Actions */
.smart-filter-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

/* Table Styling */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

th, td {
    border: 1px solid #ccc;
    padding: 15px;
    text-align: left;
}

th {
    background: linear-gradient(79deg, #4668db, #9d70cd);
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

tr:nth-child(even) {
    background: #f9f9f9;
}

tr:hover {
    background: #f1f1f1;
    transition: background 0.3s ease;
}

/* Row Buttons */
.row-button {
    background: linear-gradient(79deg, #4668db, #9d70cd);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.row-button:hover {
    opacity: 0.9;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.row-button:active {
    transform: translateY(2px);
}


`;var lit_element_router=__webpack_require__("./node_modules/lit-element-router/lit-element-router.js"),DialogsFunctions=__webpack_require__("./src/components/GenericDialogs/DialogsFunctions.js");class DragDropTable extends((0,TrazitGenericDialogs.f)((0,GridFunctions.G)((0,DialogsFunctions.X)((0,ButtonsFunctions.n)((0,lit_element_router.gM)(lit_element.WF)))))){static get styles(){return styles}static get properties(){return{data:{type:Array},viewModelFromProcModel:{type:Object},viewMode:{type:Number},selectedIndex1:{type:String},selectedIndex2:{type:Number},dragTable:{type:Object},showFilterButton:{type:Boolean}}}constructor(){super(),this.selectedTr=void 0,this.dragData=void 0,this.dragTable={},this.viewModelFromProcModel2={},this.data=[],this.viewModelFromProcModel={type:"dragDropTables",tables:[{dragEnable:!0,dropEnable:!1,theme:"TRAZiT-DefinitionArea",endPointPropertyArray:["table1"],columns:[{name:"id",label_en:"id",label_es:"id"},{name:"temperature",label_en:"temperature",label_es:"temperature"},{name:"study",label_en:"study",label_es:"study"}]},{dragEnable:!0,dropEnable:!0,theme:"TRAZiT-DefinitionArea",endPointPropertyArray:["table2"],dropObjectPropertiesRequired:["id","study","temperature"],columns:[{name:"id",label_en:"id2",label_es:"id"},{name:"temperature",label_en:"temperature",label_es:"temperature"},{name:"study",label_en:"study",label_es:"study"}]}],dragEnable:[!0,!0,!1],dropEnable:[!1,!0,!0],dropObjectPropertiesRequired:["id","study","temperature"],title:{label_en:"1.1) Roles",label_es:"1.1) Perfiles"},theme:"TRAZiT-DefinitionArea",endPointResponseObject:"procedure_roles",columns:[{name:"id",label_en:"id2",label_es:"id"},{name:"temperature",label_en:"temperature",label_es:"temperature"},{name:"study",label_en:"study",label_es:"study"}],row_buttons:[{actionName:"REMOVE_ROLE",notGetViewData:!0,clientMethod:"procMngRequirementsMethod",endPoint:"/appProcMgr/RequirementsProcedureDefinitionAPIActions",selectedItemPropertyName:"selectedItems",requiresDialog:!1,certificationException:!0,secondaryActionToPerform:{name:"refreshSelProcData"},button:{icon:"person_remove",title:{label_en:"Remove role",label_es:"Borrar perfil"},requiresGridItemSelected:!1},endPointParams:[{argumentName:"procedureName",contextVariableName:"procedureName"},{argumentName:"procedureVersion",contextVariableName:"procedureVersion"},{argumentName:"procInstanceName",contextVariableName:"procInstanceName"},{argumentName:"roleName",selObjectPropertyName:"role_name"}]},{actionName:"RENAME_ROLE",notGetViewData:!0,clientMethod:"procMngRequirementsMethod",endPoint:"/appProcMgr/RequirementsProcedureDefinitionAPIActions",selectedItemPropertyName:"selectedItems",requiresDialog:!0,certificationException:!0,secondaryActionToPerform:{name:"refreshSelProcData"},button:{icon:"manage_accounts",title:{label_en:"Rename role",label_es:"Renombrar perfil"},requiresGridItemSelected:!1},dialogInfo:{name:"genericDialog",fields:[{text1:{label_en:"New Role Name",label_es:"Nuevo Nombre Perfil",selObjectPropertyName:"role_name"}}]},endPointParams:[{argumentName:"procedureName",contextVariableName:"procedureName"},{argumentName:"procedureVersion",contextVariableName:"procedureVersion"},{argumentName:"procInstanceName",contextVariableName:"procInstanceName"},{argumentName:"roleName",selObjectPropertyName:"role_name"},{argumentName:"newroleName",element:"text1",defaultValue:""}]},{actionName:"CLONE_ROLE",notGetViewData:!0,clientMethod:"procMngRequirementsMethod",endPoint:"/appProcMgr/RequirementsProcedureDefinitionAPIActions",selectedItemPropertyName:"selectedItems",requiresDialog:!0,certificationException:!0,secondaryActionToPerform:{name:"refreshSelProcData"},button:{icon:"file_copy",title:{label_en:"Clone Role",label_es:"Clonar Perfil"},requiresGridItemSelected:!1},dialogInfo:{name:"genericDialog",fields:[{text1:{label_en:"New Role Name",label_es:"Nuevo Nombre de Perfil",selObjectPropertyName:"role_name"}}]},endPointParams:[{argumentName:"procedureName",contextVariableName:"procedureName"},{argumentName:"procedureVersion",contextVariableName:"procedureVersion"},{argumentName:"procInstanceName",contextVariableName:"procInstanceName"},{argumentName:"roleName",selObjectPropertyName:"role_name"},{argumentName:"newroleName",element:"text1"}]}],actions:[{actionName:"ADD_ROLE",notGetViewData:!0,clientMethod:"procMngRequirementsMethod",endPoint:"/appProcMgr/RequirementsProcedureDefinitionAPIActions",selectedItemPropertyName:"selectedItems",requiresDialog:!0,certificationException:!0,secondaryActionToPerform:{name:"refreshSelProcData"},button:{icon:"person_add",title:{label_en:"Assign Role",label_es:"Asignar Perfil"},requiresGridItemSelected:!1},dialogInfo:{name:"genericDialog",dialogWidth:"500px",fields:[{text1:{label_en:"New Role name",label_es:"Nuevo Nombre de Perfil"}}]},endPointParams:[{argumentName:"procedureName",contextVariableName:"procedureName"},{argumentName:"procedureVersion",contextVariableName:"procedureVersion"},{argumentName:"procInstanceName",contextVariableName:"procInstanceName"},{argumentName:"roleName",element:"text1",defaultValue:""}]}]},this.dragElement=void 0,this.dragTr=!1,this.showFilterButton={1:!1,2:!1,3:!1}}firstUpdated(){this.filterPerformAction()}async filterPerformAction(e,flag){await this.GetViewData(!1),this.data=this.requestData}toggleFilterDialog(name){this.showFilterButton[name]=!this.showFilterButton[name],this.requestUpdate()}hideFilters(name){return this.showFilterButton[name]}render(){return template({definition:this.viewModelFromProcModel.objects,dropTableTr:this._dropTableTr,allowDropTr:this._allowDropTr,dragTableTr:this._dragTableTr,unavaiableToDrop:this._unavaiableToDrop},this.data,this.lang,this)}_unavaiableToDrop=()=>{alert("Not available to drop")};_dragTableTr=(e,dragTable,rowData)=>{console.log("this.dragData",this.dragData,e),this.dragData=rowData,this.dragTable=dragTable,this.requestUpdate()};_allowDropTr=e=>{e.preventDefault()};_dropTableTr=(e,dropTable,dropData)=>{if(e.preventDefault(),this.dragTable.name!==dropTable.name){if(void 0!==dropTable.acceptEntriesOnlyFromObjects){if(!Array.isArray(dropTable.acceptEntriesOnlyFromObjects))return void("en"===this.lang?alert("The property called acceptEntriesOnlyFromObjects must be an array of strings, for the table "+dropTable.name):alert("La propiedad llamada acceptEntriesOnlyFromObjects debe ser un array, para la tabla "+dropTable.name));if(!dropTable.acceptEntriesOnlyFromObjects.includes(this.dragTable.name))return void("en"===this.lang?alert("The table "+dropTable.name+" accept only data from some tables and the table  "+this.dragTable.name+" is not one of those."):alert("La tabla "+dropTable.name+" sólo accepta datos de ciertas tablas y la tabla "+this.dragTable.name+" no es una de ellas."))}void 0!==dropTable.dropEnable&&!1!==dropTable.dropEnable?void 0!==dropTable.dropAction?!1!==this.dataIntegrityChecks(dropTable)&&(alert("Success to Drop"),this.trazitButtonsMethod(e,!1,dropTable.dropAction,!0,void 0,void 0,this.dragData,!1,void 0,this.dragData,dropData),this.requestUpdate()):"en"===this.lang?(console.log("dropTable",dropTable),alert("No drop action defined")):alert("No hay definida acción al soltar"):"en"===this.lang?alert("Not allowed, the destination table accept no data transfers into"):alert("No permitido, la tabla destino no acepte que se le transfiera contenido")}else"en"===this.lang?alert("You cannot drap and drop over the same table, action aborted"):alert("No se puede transferir desde y hasta la misma tabla, acción cancelada")};dataIntegrityChecks(dropTable,dropData){return void 0===dropTable||void 0===dropTable.dataIntegrityCheck||!!this.dataIntegrityDragElementMandatoryProps(this.dragTable,dropTable,dropData)}dataIntegrityDragElementMandatoryProps(dragTable,dropTable,dropData){if(void 0===dropTable.dataIntegrityCheck.dropingEntryRequiredProperties)return!0;for(const property of dropTable.dataIntegrityCheck.dropingEntryRequiredProperties)if(!(property in this.dragData))return alert("The property "+property+" is required and not found"),!1;return!0}}window.customElements.define("dragdrop-table",DragDropTable);__webpack_require__("./src/components/Audit/audit-dialog.js");class DrapDrop extends((0,TrazitTakePictureDialog.O)((0,TrazitCredentialsDialogs.s)((0,AuditFunctions.t)((0,TrazitInvestigationsDialog.O)((0,ModuleEnvMonitDialogsMicroorganism.E)((0,TrazitEnterResultWithSpec.F)((0,TrazitReactivateObjectsDialog.T)((0,TrazitGenericDialogs.f)((0,ModuleEnvMonitClientMethods.a)((0,GridFunctions.G)((0,ButtonsFunctions.n)(lit.WF)))))))))))){static get styles(){return[lit_flexbox_literals_dist.G6,lit_flexbox_literals_dist.C1,lit.AH`
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
        `]}static get properties(){return{model:{type:Object},config:{type:Object},procInstanceName:{type:String},viewModelFromProcModel:{type:Object},ready:{type:Boolean},viewName:{type:String},filterName:{type:String},lang:{type:String},selectedItems:{type:Array},actionBeingPerformedModel:{type:Object},localProceduresModels:{type:Object},data:{type:Object},contextMenuItems:{type:Array}}}constructor(){super(),this.ready=!1,this.selectedItems=[],this.config={},this.viewModelFromProcModel={},this.actionBeingPerformedModel={},this.localProceduresModels=ProceduresModel.m,this.data={},this.contextMenuItems=[]}resetView(){this.selectedItems=[],this.ready=!1}renderOld(){return lit.qy`
<!--        <div style='display:none;'>
          ${!1===this.ready?lit.qy`${this.GetViewData()}`:lit.s6}            
        </div> -->
        <dragdrop-table .action=${this.actionModelForTable} .config=${this.config} .viewModelFromProcModel=${this.viewModelFromProcModel}
          .data=${this.data}
          .lang=${this.lang} .procName=${this.procName} .procInstanceName=${this.procInstanceName} .desktop=${this.desktop} > </dragdrop-table>
      `}render(){return lit.qy`
        <dragdrop-table .action=${this.actionModelForTable} .config=${this.config} .viewModelFromProcModel=${this.viewModelFromProcModel}
          .data=${this.data}
          .lang=${this.lang} .procName=${this.procName} .procInstanceName=${this.procInstanceName} .desktop=${this.desktop} > </dragdrop-table>
      `}renderOriginal(){return lit.qy`
        <div>      
          ${this.topCompositionBlock()} 
          ${this.abstractBlock()}
          ${this.bottomCompositionBlock()}  
          <div style="display:none">
            ${!1===this.ready&&void 0===this.viewModelFromProcModel.tabs?lit.qy`${this.GetViewData()}`:lit.s6}            
          </div>
         
        </div>
      `}loadDialogs(){return lit.qy`
      ${this.credentialsDialog()}
      ${this.genericFormDialog()}
      ${this.reactivateObjectsDialog()}
      ${this.moduleEnvMonitMicroorganismsDialogAdd()}
      ${this.moduleEnvMonitMicroorganismsDialogRemove()}
      ${this.pointTemplate()}
      ${this.resultTemplate()}
      ${this.takePictureFormDialog()}
      
      ${this.investigationTemplate()}
      ${"open"==this.filterName?lit.qy`${this.decisionTemplate()}`:lit.s6}  
      ${this.decisionTemplate()}
    `}topCompositionBlock(){return lit.qy`
      ${this.viewModelFromProcModel.topCompositions?lit.qy`${this.viewModelFromProcModel.topCompositions.map((c=>lit.qy`<templates- id="topComp"
            .windowOpenable=${this.windowOpenable}
            .sopsPassed=${this.sopsPassed}
            .templateName=${c.templateName} .buttons=${c.buttons} .lang=${this.lang}
            .viewName=${this.viewName} .filterName=${this.filterName}
            .viewModelFromProcModel=${this.viewModelFromProcModel}
            .procInstanceName=${this.procInstanceName}
            @program-changedzzzz=${e=>this.gridItems=e.detail}
            @program-changed=${this.programChangedAction}
            @template-event=${this.templateEvent}></templates->           
          `))}`:lit.s6}
      `}setReady(){this.ready=!0}programChangedAction(e){void 0!==e&&(this.ready=!0,this.gridItems=e.detail)}bottomCompositionBlock(){return lit.qy`
  ${this.viewModelFromProcModel.bottomCompositions?lit.qy`${this.viewModelFromProcModel.bottomCompositions.map((c=>lit.qy`
          ${"envmonit-batch-sampleincubation"==c.elementName?lit.qy`                               
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
          `:lit.s6} 
          ${"chart"==c.elementName?lit.qy`      
          <div class="layout flex">
          <gridmodel-bottomcomp-chart id=${c.filter} .procInstanceName=${this.procInstanceName} .viewName=${this.viewName}
          .selectedItems=${this.selectedItems} .lang=${this.lang}
          .model=${c} .config=${this.config}></gridmodel-bottomcomp-chart>
          </div>
      `:lit.s6} 
      `))}`:lit.qy``}
  `}activeItemChanged(e){if(void 0===e)return;let d=!0;d=this.disabledByCertification(this.viewModelFromProcModel.langConfig.gridActionOnClick),d||(this.selectedItems=e.detail.value?[e.detail.value]:[],this.selectedItems.length>0&&void 0!==this.viewModelFromProcModel.langConfig.gridActionOnClick&&this.GetAlternativeViewData(this.viewModelFromProcModel.langConfig.gridActionOnClick))}abstractBlock(){let addContextMenu=this.addContextMenu();return lit.qy`
  ${this.loadDialogs()} 
  ${this.abstract?lit.s6:lit.qy`
        ${void 0!==this.viewModelFromProcModel.topCompositions?lit.s6:lit.qy`${this.getTitle()}`}
      
        <div class="layout horizontal flex wrap">
            <div class="layout flex">          
            <div class="layout horizontal center flex wrap">
              ${this.getButton()}
            </div>
            ${this.ready?lit.qy`
              ${void 0!==addContextMenu&&!0===addContextMenu?lit.qy`
                <vaadin-context-menu .items=${this.contextMenuItems} @item-selected="${this.contextMenuAction}">
                <vaadin-grid id="mainGrid" theme="row-dividers" column-reordering-allowed multi-sort 
                  @active-item-changed=${this.activeItemChanged}
                  .items=${this.gridItems} .selectedItems="${this.selectedItems}"
                  ${(0,dist.O)(this.detailRenderer)}
                  ${this.setCellListener()}                  
                >
                  ${this.gridList(this.viewModelFromProcModel)}
                </vaadin-grid>
                </vaadin-context-menu>`:lit.qy`
                <vaadin-grid id="mainGrid" theme="row-dividers" column-reordering-allowed multi-sort 
                @active-item-changed=${this.activeItemChanged}
                .items=${this.gridItems} .selectedItems="${this.selectedItems}"
                ${(0,dist.O)(this.detailRenderer)}
                ${this.setCellListener()}                
                >
                ${this.gridList(this.viewModelFromProcModel)}
              </vaadin-grid>`}
              
              <div id="rowTooltip">&nbsp;</div>
              `:lit.qy``}
          </div>   
          <audit-dialog @sign-audit=${this.setAudit} .actionBeingPerformedModel=${this.actionBeingPerformedModel} 
          .filterName=${this.filterName} .lang=${this.lang} .windowOpenable=${this.windowOpenable}
          .sopsPassed=${this.sopsPassed} .procInstanceName=${this.procInstanceName} .viewName=${this.viewName} 
          .viewModelFromProcModel=${this.viewModelFromProcModel}
          .selectedItems=${this.selectedItems} .config=${this.config}></audit-dialog>


        </div>
      `}    
  `}contextMenuAction(e){e.target;this.actionMethod(e.detail.value.actionDef,e.detail.value.actionDef,null,null,this.selectedItems[0],!1)}addContextMenu(){if(void 0!==this.viewModelFromProcModel.enableContextMenu||!1===this.viewModelFromProcModel.enableContextMenu)return!1;this.contextMenuItems=[];let menuItem={component:"hr"};return this.contextMenuItems.push(menuItem),void 0!==this.viewModelFromProcModel.addActionsInContextMenu&&!0===this.viewModelFromProcModel.addActionsInContextMenu&&this.viewModelFromProcModel.actions.forEach((action=>{menuItem={},menuItem.text=action.button.title["label_"+this.lang],void 0!==action.button.requiresGridItemSelected&&!0!==action.button.requiresGridItemSelected||void 0!==this.selectedItems&&0!=this.selectedItems.length||(menuItem.disabled=!0),menuItem.actionDef=action,this.contextMenuItems.push(menuItem)})),void 0!==this.viewModelFromProcModel.actionsForContextMenu&&this.viewModelFromProcModel.actionsForContextMenu.forEach((action=>{menuItem={},menuItem.text=action.button.title["label_"+this.lang],void 0!==action.button.requiresGridItemSelected&&!0!==action.button.requiresGridItemSelected||void 0!==this.selectedItems&&0!=this.selectedItems.length||(menuItem.disabled=!0),menuItem.actionDef=action,this.contextMenuItems.push(menuItem)})),menuItem={},menuItem.component="hr",this.contextMenuItems.push(menuItem),!0}get rowTooltip(){return this.shadowRoot.querySelector("#rowTooltip")}get xtabsCompositionc(){return this.shadowRoot.querySelector("tabs-composition")}get batchElement(){return this.shadowRoot.querySelector("gridmodel-bottomcomp-sampleincubation#active_batches")}get incubElement(){return this.shadowRoot.querySelector("gridmodel-bottomcomp-sampleincubation#samplesWithAnyPendingIncubation")}get grid(){return this.shadowRoot.querySelector("vaadin-grid#mainGrid")}get chart(){return this.shadowRoot.querySelector("google-chart")}get templates(){return this.shadowRoot.querySelector("templates-#topComp")}get audit(){return this.shadowRoot.querySelector("audit-dialog")}templateEvent(e){console.log("templateEvent"),e.detail.calledActionIdx>=0&&(this.selectedAction=ProceduresModel.m[this.procInstanceName][this.viewName].actions[e.detail.calledActionIdx],this.reload())}showLockReason(i){let labels={warning_reason_label_en:"Warning Reason",warning_reason_label_es:"Razón Aviso",locking_reason_label_en:"Locking Reason",locking_reason_label_es:"Razón Bloqueo"};if(this.grid.items[i-1].is_locked){this.rowTooltip.style.backgroundColor="#24C0EB",this.rowTooltip.style.visibility="visible";let txtValue=labels["locking_reason_label_"+this.lang]+": ";void 0===this.grid.items[i-1].locking_reason||void 0===this.grid.items[i-1].locking_reason["message_"+this.lang]?txtValue+="undefined":txtValue+=this.grid.items[i-1].locking_reason["message_"+this.lang],this.rowTooltip.textContent=txtValue}else if(this.grid.items[i-1].warning_reason){this.rowTooltip.style.backgroundColor="#D6E9F8",this.rowTooltip.style.visibility="visible";let txtValue=labels["warning_reason_label_"+this.lang]+": ";void 0===this.grid.items[i-1].warning_reason||void 0===this.grid.items[i-1].warning_reason["message_"+this.lang]?txtValue+="undefined":txtValue+=this.grid.items[i-1].warning_reason["message_"+this.lang]}}hideLockReason(){this.rowTooltip.style.visibility="hidden"}detailRenderer(result){let labels={warning_reason_label_en:"Warning Reason",warning_reason_label_es:"Razón Aviso",locking_reason_label_en:"Locking Reason",locking_reason_label_es:"Razón Bloqueo"};return lit.qy`
      <div style="text-align:center;font-size:12px">
        <p>${result.spec_eval?lit.qy`${"IN"==result.spec_eval?lit.qy`<mwc-icon style="color:green">radio_button_checked</mwc-icon>`:lit.qy`${result.spec_eval.toUpperCase().includes("OUT")&&result.spec_eval.toUpperCase().includes("SPEC")?lit.qy`<mwc-icon style="color:red">radio_button_checked</mwc-icon>`:lit.qy`<mwc-icon style="color:orange">radio_button_checked</mwc-icon>`}`}`:lit.qy`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`}</p>
        <p>${"en"==this.lang?"Method":"Método"}: ${result.method_name} (${result.method_version})</p>
        <p>Range Rule: ${result.spec_rule_info[0].ruleRepresentation}</p>
        <p>Range Evaluation: ${result.spec_eval} (${result.spec_eval_detail})</p>
      ${result.is_locked?lit.qy`<p style="color:rgb(255 8 8)">${labels["locking_reason_label_"+this.lang]}: ${result.locked_reason}</p>`:lit.s6}
        ${result.warning_reason?lit.qy`<p style="color:#0085ff">${labels["warning_reason_label_"+this.lang]}: ${result.warning_reason["message_"+this.lang]}</p>`:lit.s6}
      </div>
    `}setCellListener(){if(void 0===this.grid||null===this.grid)return;this.rowTooltip.style.display="block",this.rowTooltip.style.visibility="hidden",this.rowTooltip.style.fontSize="12px",this.rowTooltip.style.color="white",this.grid.shadowRoot.querySelectorAll("tr[part=row]").forEach(((r,i)=>{i>0&&this.grid.items[i-1]&&(r.removeEventListener("mouseenter",(()=>this.showLockReason(i))),r.removeEventListener("mouseleave",this.hideLockReason.bind(this))),i>0&&this.grid.items[i-1]&&(this.grid.items[i-1].is_locked||this.grid.items[i-1].warning_reason)&&(r.addEventListener("mouseenter",(()=>this.showLockReason(i))),r.addEventListener("mouseleave",this.hideLockReason.bind(this)))}))}}window.customElements.define("drag-drop",DrapDrop)}}]);
//# sourceMappingURL=515.fa743f3a.iframe.bundle.js.map
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ButtonsFunctions } from '../Buttons/ButtonsFunctions';
import { GridFunctions } from "../grid_with_buttons/GridFunctions";
import { FeaturesDynamicFieldValue } from '../../features/dynamicFieldValue';
import '../MultiSelect';
import '../grid_with_buttons/gridCellTooltip'

export function ReadOnlyTableParts(base) {
    let contextMenu = undefined;
    return class extends FeaturesDynamicFieldValue(GridFunctions(ButtonsFunctions(base))) {
        popupFilterElement(elem, dataArr){
          elem.filterElements=[{"name": "lot_name", "type": "text"}, 
          {"name": "references", "type": "multilist", "list properties":"blablabla"}]

        }
        applyFilter(elem, dataArr){

        }
        setupReadOnlyTable(elem, dataArr, isSecondLevel, directData, theme, parentData) {
            if (elem===undefined){
                return
              }
              parentData=this.selectedItemInView //sessionStorage.getItem('rowSelectedData')
              //console.log('isSecondLevel', isSecondLevel, 'parentData', parentData)
              let tmp=""
              if (elem.theme===undefined){
                tmp = "TRAZiT-UsersArea";
              }else{
                tmp = elem.theme;
              }
              if(elem.endPointResponseObject == "procedure_user_requirements_tree_child") {
                tmp = sessionStorage.getItem('tableTheme');
              }
              if(typeof(tmp) != "undefined") {
                sessionStorage.setItem('tableTheme', tmp);
              }
              if(typeof(tmp) == "undefined") {
                tmp = "TRAZiT-UsersArea";
                sessionStorage.setItem('tableTheme', tmp);
              }
              const endPointResponseObject = elem.endPointResponseObject;
              const selectedIdx = this.selectedTableIndex[endPointResponseObject];
        
              if (isSecondLevel === undefined) {
                isSecondLevel = false;
              }
              if (directData !== undefined) {
                dataArr = directData;
              } else {
                dataArr = this.getDataFromRoot(elem, dataArr);
              }
              let cleanArr=[]
              if (!this.dataContainsRequiredProperties(elem, dataArr)) {
                return {'theme':theme, 'dataArr':cleanArr, 'tmp':tmp, 'selectedIdx': selectedIdx};
              }
        
              if (dataArr === undefined || !Array.isArray(dataArr)) {
                return {'theme':theme, 'dataArr':cleanArr, 'tmp':tmp, 'selectedIdx': selectedIdx};
              } else {
                if(dataArr.length > 0 && dataArr[0].action_name) {
                  sessionStorage.setItem('steps', JSON.stringify(dataArr))
                }
              }
              return {'theme':theme, 'dataArr':dataArr, 'tmp':tmp, 'selectedIdx': selectedIdx};
        }
        
        prepareTableData(elem, dataArr, directData) {
            // ...data preparation logic here...
            return dataArr;
        }
        
        getTableStyles(elem) {
            return html`
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
              --mdc-icon-button-size: 24px;
              --mdc-icon-size: 16px;
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
              
            `;
        }
        
        createTableHeader(elem, parentElement, lang, selectedIdx, handleResetParentFilter) {
            // ...header creation logic here...
            return html`
                <thead>
                <tr>
                ${elem.columns.map((fld, idx) => {
                    if(idx === 0 && parentElement !== null && parentElement !== undefined) {
                        return html` 
                        <th>
                            <mwc-icon-button 
                            class="icon resetBtn" 
                            icon="refresh" 
                            @click=${() => handleResetParentFilter(parentElement)}
                            ></mwc-icon-button>

                            ${fld["label_" + lang]} <span class="resize-handle"></span>
                        </th>
                        `;
                    }
                    return html` <th>${fld["label_" + lang]} <span class="resize-handle"></span></th>`;
                    }
                )}
                ${elem.row_buttons === undefined
                    ? html`<th></th>` 
                    : html`
                    <th>
                        ${lang === "en" ? "Actions" : "Acciones"} 
                        <span class="resize-handle"></span>
                    </th>
                    `}
                </tr>
                </thead>    
            `;
        }
        _toggleDetail(e, index) {
            e.stopPropagation();
            const detailElement = this.shadowRoot.querySelector(`#detail${index}`);
            if (detailElement) {
              detailElement.toggle(); // Make sure `toggle` is a valid method on your element
            } else {
              console.error(`Element with id 'detail${index}' not found`);
            }
          }

        
        addViewTitle(elem, alternativeTitle, isSecondLevel){
            //console.log('addViewTitle', elem, alternativeTitle, isSecondLevel)
            return html`                
                ${alternativeTitle !== undefined?html`
                    <p>
                        <span class="title ${isSecondLevel}"
                        >${alternativeTitle}</span
                        >
                    </p>`
                : html`
                    ${elem === undefined || elem.title === undefined
                    ? nothing: html` <p><span class="title ${isSecondLevel}">${elem.title["label_" + this.lang]}</span></p>`}
                `}  
            `
        }
        getActionsButtons(elem, dataArr){
            return html`
                <div class="layout horizontal center flex wrap">
                    ${this.getButton(elem, dataArr, true)}
                </div>
            `            
        }

        dataContainsRequiredProperties(elem, dataArr) {
            //console.log('dataContainsRequiredProperties', elem.mantadoryPropertiesInVariableName, dataArr[0])
            if (dataArr === undefined) {
              return false;
            }
            if (elem.mantadoryPropertiesInVariableName === undefined) {
              return true;
            }
            //let rValue=true
            const rValue = elem.mantadoryPropertiesInVariableName.every((curProp) => {
              if (Array.isArray(dataArr)){
                return dataArr[0]!==undefined && dataArr[0][curProp] !== undefined;
              }else{
                return dataArr[curProp] !== undefined;
              }
            });
            //if (rValue===undefined){return true}
            return rValue;
          }
      
        renderTable(elem, header, body, styles, title, actionButtons, tmp) {
            return html`${styles} ${title} ${actionButtons} 
            <div style="display: flex; flex-direction: row; text-align: center; align-items: baseline;">
            <div style="display: flex; flex-direction: column; text-align: center;">  
            <table id=${elem.endPointResponseObject} class="styled-table read-only ${tmp}">
                ${header} 
                ${elem.columns === undefined
                ? html`${elem.hideNoDataMessage !== undefined &&
                  elem.hideNoDataMessage
                    ? ""
                    : "No columns defined"}`
                : html`
                ${body} 
            `}            
            </table>
            </div>
            </div>    
            `
            ;
        }        
        createTableBody(elem, dataArr, lang, selectedIdx, handler, handleTableRowClick, parentData) {
            return html`
                <tbody>
                    <div class="js-context-popup"></div>
                    ${dataArr === undefined || !Array.isArray(dataArr) ? 
                    html `No Data` : 
                    html`${this.tableBodyHavingData(elem, dataArr, lang, selectedIdx, handler, handleTableRowClick, parentData)}`}
                </tbody>
            `;
        }
        
        handleKeyDown(event) {
            if (event.key === 'Escape') {
              contextMenu.style.display = "none";
            }
          }
          // handleScroll(event) {
          //   const popup = this.shadowRoot.querySelector(".js-context-popup");
          //   contextMenu = popup;
          //   contextMenu.style.display = "none";
          // }
          handleOpenContextMenu(event, rowSelected, elem) {
            console.log('elem', elem)
            event.preventDefault();
            const popup = this.shadowRoot.querySelector(".js-context-popup");
            contextMenu = popup;
            popup.innerHTML = "";
            let menuOptionsArr=[]
            if (elem.rowButtonsAsContextMenu!==undefined&&elem.rowButtonsAsContextMenu===true){
              menuOptionsArr=elem.row_buttons
            }else{
              if (elem.contextmenu_buttons!==undefined){
                menuOptionsArr=elem.contextmenu_buttons
              }
            }
            
            menuOptionsArr.map((item, i) => {
              let newIcon = document.createElement('mwc-icon-button');
              newIcon.setAttribute('icon', item.button.icon);
              newIcon.style.color = "white";
      
              let newLabel = document.createElement('label');
              newLabel.textContent = item.button.title["label_"+this.lang]
      
              let newDiv = document.createElement('div');
              newDiv.style.display = "flex";
              newDiv.style.flexDirection = "row";
              newDiv.style.alignItems =  "center";
              newDiv.style.cursor = "pointer"
              newDiv.appendChild(newIcon);
              newDiv.appendChild(newLabel);
              newDiv.addEventListener('click', (e) => this.actionMethod(e, item, menuOptionsArr, null, null, rowSelected, false));
      
              popup.appendChild(newDiv);
            })
            popup.addEventListener('click', () => this.contextMenuItemAction(popup));
            popup.style.left = `${event.clientX}px`;
            popup.style.top = `${event.clientY}px`;
            popup.style.display = "flex";
            popup.style.flexDirection = "column";
            document.body.addEventListener('click', this.closeContextMenu);
          }
          
          closeContextMenu(e) {
            contextMenu.style.display = "none";
          }
      
          contextMenuItemAction(e) {
            e.style.display = "none";
          }        
        tableBodyHavingData(elem, dataArr, lang, selectedIdx, handler, handleRowClk, parentData){
            //console.log('tableBodyHavingData', 'dataArr', dataArr)
            return html`
                ${dataArr.map((curRow, idx) => {
                return html`
                  <tr
                    @click=${(event) => {
                      if(handler) {
                        if(dataArr[elem.children] && dataArr[elem.children].length > 0) {
                          if (elem.openWhenNoData === undefined || elem.openWhenNoData === false) {
                            handler(event, curRow, elem, idx);
                          }
                        }
                      }
                      this.handleTableRowClick(event, curRow, elem)
                    }}
                    @contextmenu=${(event) => this.handleOpenContextMenu(event, curRow, elem)}
                    class="${selectedIdx === idx ? "selected" : selectedIdx !== undefined ? "hidzzzden" : ""}"
                >                
                ${elem.columns.map((fld, index) =>                     
                    html`
                    <td>
                        ${fld.tooltip !== undefined ? html`
                            <grid-cell-tooltip lang="${lang}" .element="${fld}" .data="${curRow}">                        
                                ${this.cellContentController(elem, fld, curRow, lang, index)}                    
                            </grid-cell-tooltip>
                        `:html`
                            ${this.cellContentController(elem, fld, curRow, lang, index)}
                        `}
                    </td>
                    `
                )}
                ${this.generateRowButtons(elem, fld, curRow, parentData, idx, handler, lang)}
                </tr>
                `})}
            `
        }

        


        cellContentController(elem, fld, data, lang, columnIndex, rowIndex){
          //alert(fld.name+' '+fld.edit)
            let applyOther=true
            if (fld.edit!==undefined&&fld.edit===true){
              applyOther = false;
            } else if (fld.name === "pretty_spec" || fld.name === "reportTitle") {
                applyOther = false;
            } else if (fld.is_tag_list !== undefined &&fld.is_tag_list === true) {
                applyOther = false;
            } else if (fld.as_progress !== undefined && fld.as_progress === true) {
                applyOther = false;
            } else if (fld.is_icon !== undefined && fld.is_icon === true) {
                applyOther = false;
            } else if (fld.as_paragraph !== undefined && fld.as_paragraph === true) {
                applyOther = false;
            }                  
            return html`
            ${fld.edit!==undefined&&fld.edit===true?
            html`
                ${this.cellEditNumeric(fld, data, lang, columnIndex, rowIndex)}
            `:html`
                ${fld.name === "pretty_spec"==="reportTitle" ? this.cellIsPrettySpec(fld, data, lang) : nothing}
                ${fld.is_tag_list !== undefined && fld.is_tag_list === true ? this.cellIsTagList(fld, data, lang) : nothing}
                ${fld.as_progress !== undefined && fld.as_progress === true ? this.cellIsAsProgress(fld, data, lang) : nothing}
                ${fld.as_paragraph !== undefined && fld.as_paragraph === true ? this.cellIsParagraph(fld, data, lang) : nothing}
                ${fld.is_icon !== undefined && fld.is_icon === true ? this.cellIsIcon(fld, data, columnIndex) : nothing}
                ${applyOther===true?this.cellIsOther(elem, fld, data, lang, columnIndex) : nothing}
            `}
            `
        }

        cellEditNumeric(fld, data, lang, columnIndex, rowIndex) {
          const id = `col_${columnIndex}_row_${rowIndex}`; // Changed ID format
          //console.log('Rendering cell:', columnIndex, rowIndex);
          return html`
            <input class="enterResultVal" id="${id}" 
              type="number" 
              .step=${fld.step !== undefined ? fld.step : ''} 
              .min=${fld.min !== undefined ? fld.min : ''} 
              .max=${fld.max !== undefined ? fld.max : ''} 
              .value=${data[fld.name]} 
              @input=${e => this.cellEditSetValidVal(e, data)}
              @keydown=${e => this.cellEditOnKeyDown(e, fld, columnIndex, rowIndex, data)}
              @paste=${e => this.cellEditOnPaste(e, fld, columnIndex, rowIndex, data)}>          
          `;
        }
        
        cellEditOnPaste(event, fld, columnIndex, rowIndex, data) {
          event.preventDefault();
        
          const clipboardData = event.clipboardData || window.clipboardData;
          const pastedData = clipboardData.getData('Text');
        
          console.log('Pasted data:', pastedData);
        
          const rows = pastedData.split('\n').filter(row => row.trim() !== '');
          
          console.log('Rows:', rows);
        
          rows.forEach((row, index) => {
            const currentRowIndex = rowIndex + index;
            const nextInputId = `col_${columnIndex}_row_${currentRowIndex}`;
            console.log(`Processing input ID: ${nextInputId}`);
            const nextInput = this.shadowRoot.querySelector(`#${nextInputId}`);
        
            if (nextInput) {
              const currentValue = nextInput.value.trim();
              const newValue = row.trim();
        
              if (currentValue !== '') {
                const replace = confirm(`The cell ${nextInputId} is not empty. Replace "${currentValue}" with "${newValue}"?`);
                if (replace) {
                  console.log(`Replacing value in ${nextInputId}:`, newValue);
                  nextInput.value = newValue;
                  this.cellEditSetValidVal(event, data);
                  this.trazitButtonsMethod(event, true, fld.action, true, 1, event.target, data);
                  this.cellEditMoveToNextRow(columnIndex, rowIndex);
                } else {
                  console.log(`Keeping existing value in ${nextInputId}:`, currentValue);
                }
              } else {
                console.log(`Setting value in empty cell ${nextInputId}:`, newValue);
                nextInput.value = newValue;
                this.cellEditSetValidVal(event, data);
                this.trazitButtonsMethod(event, true, fld.action, true, 1, event.target, data);
                this.cellEditMoveToNextRow(columnIndex, rowIndex);      
              }
            } else {
              console.warn(`Next input with ID ${nextInputId} not found`);
            }
          });
        }

        
        cellEditSetValidVal(event, data) {
          const input = event.target;
          const value = input.value;
        
          console.log('Validating and setting value:', value);
          // Actualiza tus datos aquí según sea necesario
        }
        
        cellEditOnKeyDown(event, fld, columnIndex, rowIndex, data) {
         // alert('this.cellEditOnKeyDown'+ + event.key)
         // console.log('cellEditOnKeyDown triggered:', event.key, event.code);
          if (event.key === 'Enter' || event.code === 'Enter') {
            event.preventDefault();
            //console.log('Enter key pressed, calling handleKeyDown');
            this.cellEditHandleKeyDown(event, fld, columnIndex, rowIndex, data);
          } else {
            //console.log('Other key pressed:', event.key);
          }
        }
        
        cellEditHandleKeyDown(event, fld, columnIndex, rowIndex, data) {
          //console.log('cellEditHandleKeyDown called');
          this.trazitButtonsMethod(event, true, fld.action, true, 1, event.target, data);
          this.cellEditMoveToNextRow(columnIndex, rowIndex);
        }
        
        cellEditMoveToNextRow(columnIndex, rowIndex) {
          const nextRowIndex = rowIndex + 1;
          const nextInputId = `#col_${columnIndex}_row_${nextRowIndex}`;
          //console.log(`Attempting to focus next input: ${nextInputId}`);
        
          let nextInput = this.shadowRoot.querySelector(nextInputId);
          
          if (!nextInput) {
            //console.log(`Next input not found immediately: ${nextInputId}`);
            setTimeout(() => {
              nextInput = this.shadowRoot.querySelector(nextInputId);
              if (nextInput) {
              //  console.log(`Focusing next input after delay: ${nextInputId}`);
                nextInput.focus();
              } else {
              //  console.warn(`Next input still not found after delay: ${nextInputId}`);
              }
            }, 100);
          } else {
            //console.log(`Focusing next input immediately: ${nextInputId}`);
            nextInput.focus();
          }
        }
                        
        cellIsPrettySpec(fld, data, lang){
            return html`   cellIsPrettySpec             
                    <span style="color:green">${data["spec_text_green_area_" + lang]}</span>
                    <span style="color:orange">${data["spec_text_yellow_area_" + lang]}</span>
                    <span style="color:red">${data["spec_text_red_area_" + lang]}</span>         
            `    
        }
        cellIsTagList(fld,  data){
            let purpose={}
            return html` 
                <multi-select .label=${purpose} 
                    .props=${fld.properties!==undefined?fld.properties:{"readOnly":true, "displayLabel":false}} 
                    .activeOptions=${data[fld.name]} .options=${{}}> </multi-select>
                ` 
        }
        
        cellIsAsProgress(fld, data, lang){
            return html`
              <div class="w3-container">
                <div class="w3-background w3-round-xlarge" title="${this.titleLang(fld)}">
                  <div class="w3-container w3-blue w3-round-xlarge" style="width:${data[fld.name]}%">
                    ${data[fld.name]}%
                  </div>
                </div>
              </div>
              <br />
          `            
        }

        cellIsIcon(fld, data, index){            
            return html` 
                ${fld.icon_class ?
                html`                
                    <div class="left-area">
                        <mwc-icon-button class="icon ${data[fld.icon_class]}" icon="${data[fld.icon_name]}" alt="${fld.name}"></mwc-icon-button>
                    </div>
                ` :html `
                    <img src="${this.iconRendererSrc(data, fld.name, index, fld)}" alt="${this.iconRendererSrc(data, fld.name, index, fld)}" style="width:20px">
                `}             
            `
        }
        cellIsOther(elem, fld, data, lang, index){
            return html`
                <div class="right-area">
                <span class="text">
                    ${fld.fix_value_prefix !== undefined ? fld.fix_value_prefix: ""}
                </span>
                <span>${ data[fld.name] }</span>
                ${fld.fix_value_suffix !== undefined ? fld.fix_value_suffix : ""}
                ${fld.fix_value2_prefix !== undefined ? fld.fix_value2_prefix : ""}
                <span>
                    ${fld.name2 !== undefined ? data[fld.name2] : ""}
                </span>
                ${fld.fix_value2_suffix !== undefined ? fld.fix_value2_suffix : ""}
                ${fld.fix_value3_prefix !== undefined ? fld.fix_value3_prefix : ""}
                <span>
                    ${fld.name3 !== undefined ? data[fld.name3] : ""}
                    ${fld.fix_value3_suffix !== undefined ? fld.fix_value3_suffix : ""}
                </span>                
                </div>                  
            `
        }
        cellIsParagraph(fld, data, lang){
            return html`${unsafeHTML(this.getDynamicData(fld.paragraph, data, lang))}
            `
        }        
        generateRowButtons(elem, curRow, parentData, index, handle, lang) {
            return html`
            <td>
            ${elem.expandInfoSection?html`
            <div class="circle" @click="${(e) => this._toggleDetail(e, index)}" title="${lang==='es'?'Información':'Information'}">i</div>`
            :html``}
            
            ${elem.row_buttons === undefined
                ? html`
                
                    ${curRow[elem.children] && curRow[elem.children].length > 0 ? html `
                        <div class="circle"> 
                            ${curRow[elem.children].length} 
                        </div>
                        </div>
                    ` : html``}
                ` : 
                html`                
                  
                    ${curRow[elem.children] && curRow[elem.children].length > 0 ? html `
                        <div class="circle"> 
                          ${curRow[elem.children].length} 
                        </div>
                    ` : html``}
                    <div class="layout horizontal center flex wrap">
                      ${this.getButtonForRows(elem.row_buttons, curRow, false, parentData)}
                    </div>
                  
                `}  
                </td>    
            `
        }
        getRowsInfo(elem, curRow, rowIndex, lang, parentData, handler){
          //console.log(rowIndex)
          return html`
              ${elem.columns.map((fld, columnIndex) =>                     
                  html`
                  <td>
                      ${fld.tooltip !== undefined ? html`
                          <grid-cell-tooltip lang="${lang}" .element="${fld}" .data="${curRow}">                        
                              ${this.cellContentController(elem, fld, curRow, lang, columnIndex, rowIndex)}                    
                          </grid-cell-tooltip>
                      `:html`
                          ${this.cellContentController(elem, fld, curRow, lang, columnIndex, rowIndex)}
                      `}
                  </td>
                  `
              )}
              ${this.generateRowButtons(elem, curRow, parentData, rowIndex, handler, lang)}
          `
          }
      
   
    }
}
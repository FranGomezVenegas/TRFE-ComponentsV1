import { html } from 'lit-element';
import '@material/mwc-icon';
import '../MultiSelect';
import '../grid_with_buttons/gridCellTooltip'
import '../grid_with_buttons/tableRowDetail';
import '@material/mwc-button';
import print from './dragdropboxprint';
export const template = (tmpLogic, selectedBox, viewModel, lang, componentRef) => {
    //console.log('tmpLogic', tmpLogic, 'selectedBox', selectedBox, 'viewModel', viewModel)
    if (viewModel.boxPosicsViews===undefined){
        alert("Not found the property boxPosicsViews, it should be of at least one entry")
        return html``
        
    }
    let boxAllowMoveObject=false
    let boxContentStructured=true    
    let totalStr=""
    if (selectedBox!==undefined){
        boxContentStructured=selectedBox.content_structured
        if (selectedBox.allow_move_objects!==undefined){
            boxAllowMoveObject=selectedBox.allow_move_objects
        }
        let occupied=selectedBox.datas.length
        if (boxContentStructured===true){
            let total=selectedBox.cols*selectedBox.rows
            totalStr=String(occupied)+(lang==="en"?' of ':' de ')+ String(total)                
        }else{
            totalStr="Total: "+String(occupied)
        }
    }
    return html` 
    <div style="display:flex; flex-direction:column; gap:12px;">    
    <div style="display:flex; flex-direction:row; gap:12px;">    
        <div style="width: 100%; gap: 4px; display: flex; flex-direction: column;">        
            <div style="display:flex; justify-content: space-between; align-items: center;"> 
                <div style="display:flex; flex-direction:row; gap: 4px; align-items: center;"> 
                <mwc-icon-button icon="print" @click=${() => { print(selectedBox!==undefined, componentRef) }}></mwc-icon-button>
                ${selectedBox===undefined ? html``: html `
                    <mwc-icon @click=${() => tmpLogic.setBoxView()} style="color:#54CCEF; cursor:pointer;"> home </mwc-icon>
                    <div class="view-btn ${viewModel.viewMode == 1 ? "active" : ""}" @click=${() => tmpLogic.setViewMode(1)}> Box View </div>
                    <div class="view-btn ${viewModel.viewMode == 2 ? "active" : ""}" @click=${() => tmpLogic.setViewMode(2)}> List View </div>
                    
                `}
                </div>
                <div style="color:#24C0EB; font-weight: bold; font-size: 16px;">${totalStr}</div>
                <div style="display:flex; flex-direction:row; gap: 4px; align-items: center;">
                    ${viewModel.objectsToDragColumns===undefined?html``:html`<div class="accept-btn" @click=${() => tmpLogic.setViewTable()}> ${tmpLogic.setViewTableButtonLabel()} </div>`}
                </div>
            
            </div>

        ${boxContentStructured===true?
            html`${boxStructured(tmpLogic, selectedBox, viewModel, lang, componentRef, boxAllowMoveObject)}`
        :
            html`${boxNotStructured(tmpLogic, selectedBox, viewModel, lang, componentRef, boxAllowMoveObject)}`
        }
        </div>  
        ${viewModel.boxPosicsViews===undefined||viewModel.boxPosicsViews.length==1? html``:html`
        <div >
            <mwc-icon style="color:#54CCEF; cursor:pointer;" @click=${() => tmpLogic.setShowBoxViewModeList()}> view_agenda </mwc-icon>
            ${tmpLogic.listBoxViewMode ? html `
                ${viewModel.boxPosicsViews.map((view, i) => html `
                <div style="display:flex;">
                    <input style="transform: translateY(3px);" type="radio" id="${view[1]}" name="fav_language" value="${view[1]}"  @click=${() => tmpLogic.setBoxPosicsViewFilter(i)}>                            
                    <label for="${view[1]}" @click=${() => tmpLogic.setBoxPosicsViewFilter(i)}> 
                        <multi-select id="${view[1]}" @click=${() => tmpLogic.setBoxPosicsViewFilter(i)} .label="" .props=${{"readOnly":true, "displayLabel":false}} .activeOptions=${view} .options=${{}}> </multi-select>                            
                    </label><br>                            
                </div>                        
                `)}
            `: 
            html ``}
        </div>
        `}

        ${viewModel.objectsToDragColumns===undefined? html``:html`${dragObjectsTable(tmpLogic, viewModel.objectsToDragColumns, tmpLogic.data, componentRef)}`}
    </div>    
    </div>        
    `;
};
function boxNotStructured(tmpLogic, selectedBox, viewModel, lang, componentRef, boxAllowMoveObject){
    let boxPosicsViews=[]
    if (selectedBox!==undefined&&selectedBox.boxPosicsViews!==undefined){
        boxPosicsViews=selectedBox.boxPosicsViews
    }else if (viewModel.boxPosicsViews){
        boxPosicsViews=viewModel.boxPosicsViews
    }
    return  html`
            <div class="box-content_allowmove_${boxAllowMoveObject}" id='mainBox'>
                ${viewModel.viewMode == 1 ? html `
                <div draggable="true" class="draggable-box" @dragover=${(e) => tmpLogic.allowDrop(e)} @drop=${(e) => tmpLogic.dropBox(e, 0, 0)}>
                ${selectedBox.datas.length > 0 ?
                html `
                    ${selectedBox.datas.map((selItem ,j) => html `
                    ${printItemByViewFilter(selItem, tmpLogic, boxPosicsViews, false)}
                    `)}         
                `:html``}
                </div>
                `:
                selectedBox.datas.length > 0 ?
                html `
                    <div style="width: min-width: 556px;">
                    ${boxContentTable(tmpLogic,viewModel.boxesContentColumns, selectedBox)}
                    </div>
                ` : 
                null}

            </div>
    `
}
function boxStructured(tmpLogic, selectedBox, viewModel, lang, componentRef, boxAllowMoveObject){
    let axisCols = [], axisRows = [];        
    if (selectedBox!==undefined){
    
        for(let i = 0; i < selectedBox.cols; i++) {
            if (selectedBox.axisLabels===undefined||selectedBox.axisLabels.posicX===undefined||selectedBox.axisLabels.posicX.length<=i){
                axisCols.push(i);
            }else{
                axisCols.push(selectedBox.axisLabels.posicX[i])
            }
        }
        let letter = "A";
        for(let i = 0; i < selectedBox.rows; i++) {
            if (selectedBox.axisLabels===undefined||selectedBox.axisLabels.posicY===undefined||selectedBox.axisLabels.posicY.length<=i){
                axisRows.push(String.fromCharCode(letter.charCodeAt(0) + (i)));
            }else{
                axisRows.push(selectedBox.axisLabels.posicY[i])
            }
        }
    }
    let boxPosicsViews=[]
    if (selectedBox!==undefined&&selectedBox.boxPosicsViews!==undefined){
        boxPosicsViews=selectedBox.boxPosicsViews
    }else if (viewModel.boxPosicsViews){
        boxPosicsViews=viewModel.boxPosicsViews
    }
    return html`
        ${selectedBox!==undefined ? html `
        <div class="box-content_allowmove_${boxAllowMoveObject}" id='mainBox'>
            ${viewModel.viewMode == 1 ? html `
            <div> 
                <div class="row-content"> 
                    <div class="first-item"> </div>
                    ${axisCols.map((colN, i) => html `
                    <div class="col-num"> ${colN + 1} </div>
                    `)}
                </div>
                ${axisRows.map((rowN ,i) => html `
                <div class="row-content"> 
                    <div class="row-num"> ${rowN} </div>
                    ${boxAllowMoveObject ? 
                    axisCols.map((item1 ,j) => html `
                    <div class="box ${tmpLogic.selectedIndex1 == rowN + (j + 1) ? "active" : ""}" style=${selectedBox.datas.find((item, index) => item.posX + ((item.posY - 1) * selectedBox.cols) == i * axisCols.length + (j + 1)) ? `background-color:rgb(80, 220, 247);` : ``}  @click=${() => tmpLogic.setSelectBoxIndex(rowN + (j + 1), i * axisCols.length + (j + 1))} @dragover=${(e) => tmpLogic.allowDrop(e)} @drop=${(e) => tmpLogic.dropBox(e, j + 1, i + 1)}> 
                        <div draggable="true"  @dragstart=${(e) => tmpLogic.dragBox(e, j + 1, i + 1)} class="draggable-box">                        
                        ${printObjectData(tmpLogic, selectedBox, axisCols, boxPosicsViews, i, j)}
                            <div class="position">
                                <span> ${rowN + (j + 1)} </span>
                                <span> ${ i * axisCols.length + (j + 1) } </span>
                            </div>
                        </div>
                    </div>
                    `) : 
                    axisCols.map((item1 ,j) => html `
                    <div class="box ${tmpLogic.selectedIndex1 == rowN + (j + 1) ? "active" : ""}" style=${selectedBox.datas.find((item, index) => item.posX + ((item.posY - 1) * selectedBox.cols) == i * axisCols.length + (j + 1)) ? `background-color:rgb(80, 220, 247);` : ``} @click=${() => tmpLogic.setSelectBoxIndex(rowN + (j + 1), i * axisCols.length + (j + 1))}> 
                        <div class="draggable-box">
                            ${printObjectData(tmpLogic, selectedBox, axisCols, boxPosicsViews, i, j)}
                            <div class="position">
                                <span> ${rowN + (j + 1)} </span>
                                <span> ${ i * axisCols.length + (j + 1) } </span>
                            </div>
                        </div>
                    </div>
                    `)}
                </div>
                `)}
                <div style="display:flex; justify-content: center;">
                    ${tmpLogic.selectedIndex1 ? html `<div class="selected-cell-content"> ${lang==='en'?html`Selected cell`:html`Celda seleccionada`}: ${tmpLogic.selectedIndex1} </div>` : null} 
                </div>
                ${tmpLogic.selectedIndex2 ? html `<div style="text-align: center; color: white;"> ${lang==='en'?html`Object`:html`Objeto`}: ${selectedBox.name} </div>` : null} 
            </div>
            ` : 

            selectedBox.datas.length > 0 ?
            html `
            <div style="width: min-width: 556px;">
                ${boxContentTable(tmpLogic,viewModel.boxesContentColumns, selectedBox)}
            </div>
            ` : 
            null}
        </div>
        ` :
        tmpLogic.data.boxContents && tmpLogic.data.boxContents.length > 0 ?
        html `
        ${viewModel.boxesTableColumns===undefined? html``:html`${boxesTable(tmpLogic, viewModel.boxesTableColumns, tmpLogic.data, lang)}`}                                    
        `: null}
    </div>
    `
}
function printObjectData(tmpLogic, selectedBox, axisCols, boxPosicsViews, i, j){
    let selItem=selectedBox.datas.find((item, index) => item.posX + ((item.posY - 1) * selectedBox.cols) == i * axisCols.length + (j + 1))    
    if (selItem===undefined){
        return html``
    }
    return html`
        ${printItemByViewFilter(selItem, tmpLogic, boxPosicsViews, true)}
    `
}

function printItemByViewFilter(selItem, tmpLogic, boxPosicsViews, contentStructured){
    //alert(curFld)
    return html`
    <div class="data-view" style="${contentStructured===true?'':'background-color: #50dcf7; border: 2px solid #1473e6; margin-bottom: 5px;'}"}>
    ${boxPosicsViews[tmpLogic.viewContentIndex].map((curFld, i) => html`
        <div>${curFld}: ${selItem[curFld]}</div>
    `)}
    </div>
    `
}

function dragObjectsTable(tmpLogic, elem, data, componentRef){
    let dataArr = getDataFromRoot(elem, data)
    return html`
    ${tmpLogic.viewTable ? html`
    <div style="margin-top:42px">
        <table class="dragdropable TRAZiT-DefinitionArea"> 
            <thead>
                ${elem.columns.map((column) => html`<th>${column.label_en}</th>`)}
            </thead>
            <tbody>
                ${dataArr === undefined || !Array.isArray(dataArr) ? html`No Data` : 
                html`  
                    ${dataArr.map((p, idx) => html`
                    <tr class="dragdropabletr" draggable="true" @dragstart=${(e) => tmpLogic.dragTableTr(e, elem, p)}>
                        ${elem.columns.map((fld, index) => fld.is_icon !== undefined && fld.is_icon == true ? 
                            fld.icon_class ?
                                html`<div class="left-area">
                                    ${this.iconRenderer(p, fld.name, idx, fld)}
                                    <mwc-icon-button class="icon ${p[fld.icon_class]}" icon="${p[fld.icon_name]}" alt="${fld.name}"></mwc-icon-button>
                                </div>` :
                                html`${this.iconRenderer(p, fld.name, idx, fld)}
                                    <img src="${tmpLogic.iconRendererSrc(p, fld.name, idx, fld)}" style="width:20px">` 
                            :     
                            html`<td @click="${() => componentRef.shadowRoot.querySelector('#detail' + idx).toggle()}">${p[fld.name]}</td>`                    
                        )}
                        ${elem.row_buttons === undefined ? html`` : html`<td><div class="layout horizontal center flex wrap">${this.getButtonForRows(elem.row_buttons, p, false, parentData)}</div></td>`}
                    </tr>
                    <table-row-detail id="detail${idx}">
                      <div slot="details">
                      dd
                        <!-- Aquí puedes poner el contenido detallado para esta fila -->
                      </div>
                    </table-row-detail>`)}
                `}
            </tbody>
        </table>
    </div> 
    ` : null}
    `
  }
  
function boxContentTable(tmpLogic,elem, selectedBox){
    return html`
    <table class="TRAZiT-DefinitionArea dragdropable">
    <thead>
        <th>Posic</th>
        ${elem.columns.map((column, i) => html`<th>${column.label_en}</th>`)}
    </thead>
    <tbody>
        ${selectedBox.datas === undefined || !Array.isArray(selectedBox.datas) ? html `No Data` : 
        html`  
            ${selectedBox.datas.map((p, i) => { return html `
            <tr @click=${() => tmpLogic.showBoxContent(p, i)}> 
            
                <td>${ String.fromCharCode(p.posY + 64) + p.posX}</td>
            
                ${elem.columns.map((fld, index) =>         
                    fld.is_icon !== undefined && fld.is_icon == true ? 
                        fld.icon_class ?
                            html`
                            <div class="left-area">
                                <mwc-icon-button class="icon ${p[fld.icon_class]}" icon="${p[fld.icon_name]}" alt="${fld.name}"></mwc-icon-button>
                            </div>
                            ` :
                            html `
                            <img src="${tmpLogic.iconRendererSrc(p, fld.name, i, fld)}" style="width:20px">
                            ` 
                    :     
                        html`<td>${p[fld.name]}</td>`                    
                )} 
                ${elem.row_buttons === undefined? html`` : html`
                    <td><div class="layout horizontal center flex wrap"> ${this.getButtonForRows(elem.row_buttons, p, false, parentData)}</div></td>
                `}
            </tr>
            `})}
        `}    
    </tbody>
    </table>
    `
}

function boxesTable(tmpLogic, elem, data, lang){
    let dataArr=getDataFromRoot(elem, data)
    return html`
    <table class="dragdropable TRAZiT-DefinitionArea">
    <thead> 
        ${elem.columns.map((column, i) => html`<th>${column.label_en}</th>`)}
    </thead>
    <tbody>
        ${dataArr === undefined || !Array.isArray(dataArr) ? html `No Data` : 
        html`  
            ${dataArr.map((p, i) => { return html `
            <tr @click=${() => tmpLogic.showBoxContent(p, i)}> 
            
                ${elem.columns.map((fld, index) =>      
                
                    fld.is_icon !== undefined && fld.is_icon == true ? 
                        fld.icon_class ?
                            html`
                                ${fld.tooltip !== undefined ? html`
                                    <grid-cell-tooltip lang="${lang}" .element="${fld}" .data="${p}">
                                    <div class="left-area">
                                        <mwc-icon-button class="icon ${p[fld.icon_class]}" icon="${p[fld.icon_name]}" alt="${fld.name}"></mwc-icon-button>
                                    </div>
                                    </grid-cell-tooltip>
                                `:html`
                                    <mwc-icon-button class="icon ${p[fld.icon_class]}" icon="${p[fld.icon_name]}" alt="${fld.name}"></mwc-icon-button>
                                `}
                            ` :
                            html `     
                            <td>                           
                                ${fld.tooltip !== undefined ? html`
                                    <grid-cell-tooltip lang="${lang}" .element="${fld}" .data="${p}">
                                        <img src="${tmpLogic.iconRendererSrc(p, fld.name, i, fld)}" style="width:20px">
                                    </grid-cell-tooltip>
                                `:html`
                                <img src="${tmpLogic.iconRendererSrc(p, fld.name, i, fld)}" style="width:20px">
                                `}

                            </td>
                            ` 
                    :     
                        html`                        
                            <td>
                                ${fld.tooltip !== undefined ? html`
                                    <grid-cell-tooltip lang="${lang}" .element="${fld}" .data="${p}">
                                        ${p[fld.name]}
                                    </grid-cell-tooltip>
                                `:html`
                                ${p[fld.name]}
                                `}

                            </td>
                        `
                )} 
                ${elem.row_buttons === undefined? html`` : html`
                    <td><div class="layout horizontal center flex wrap"> ${this.getButtonForRows(elem.row_buttons, p, false, parentData)}</div></td>
                `}
            </tr>
            `})}
        `}
    </tbody>
    </table>    
    `    
}

function getDataFromRoot(elem, data) {
    if (elem !== undefined && elem.contextVariableName !== undefined) {
      if (this[elem.contextVariableName] !== undefined) {
        data = this[elem.contextVariableName];
      }
    }
    if (data === null || data === undefined) {
      return undefined;
    }
    if (elem.endPointPropertyArray !== undefined) {
      if (elem.endPointPropertyArray.length === 0) {
        return data;
      }
      if (
        elem.endPointPropertyArray.length === 1 &&
        elem.endPointPropertyArray[0].toUpperCase() === "ROOT"
      ) {
        return data;
      }
      //const numObjectsToSkip = elem.endPointPropertyArray.length - 1;
      //const propertyName = elem.endPointPropertyArray[numObjectsToSkip];
      let i = 0;
      let subJSON = {};
      //data = data[elem.endPointPropertyArray[0]][0]
      for (i = 0; i < elem.endPointPropertyArray.length; i++) {
        if (data === null) {
          return undefined;
        }
        let propertyName = elem.endPointPropertyArray[i];
        if (Array.isArray(data[propertyName])) {
          if (i < elem.endPointPropertyArray.length - 1) {
            subJSON = data[propertyName][0];
          } else {
            return data[propertyName];
          }
        } else {
          subJSON = data[propertyName];
        }
        if (typeof subJSON === "undefined") {
          return data;
        } else {
          data = subJSON;
        }
      }
      return data;
      if (typeof subJSON === "undefined") {
        return undefined;
      } else if (elem.endPointPropertyArray.length % 2 === 0) {
        // If the input array has an even number of elements, skip one more object level before recursing
        return getValueFromNestedJSON(
          subJSON,
          elem.endPointPropertyArray.slice(0, numObjectsToSkip)
        );
      } else {
        // Otherwise, recurse on the sub-JSON with the remaining elem.endPointPropertyArray elements
        return getValueFromNestedJSON(
          subJSON,
          elem.endPointPropertyArray.slice(0, numObjectsToSkip)
        );
      }
    } else {
      if (
        elem.endPointResponseObject !== undefined &&
        elem.endPointResponseObject2 !== undefined
      ) {
        let dataToRet = [];
        dataToRet = data[elem.endPointResponseObject];
        if (dataToRet !== undefined) {
          return dataToRet[elem.endPointResponseObject2];
        } else {
          return [];
        }
      } else {
        if (String(elem.endPointResponseObject).toUpperCase() === "ROOT") {
          if (!Array.isArray(data)) {
            let dataArr = [];
            dataArr.push(data);
            return dataArr;
          }
          return data;
        } else {
          return data[elem.endPointResponseObject];
        }
      }
    }
  }


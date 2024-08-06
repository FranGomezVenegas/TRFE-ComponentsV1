import { html } from 'lit';
import '@material/mwc-icon';
import '../MultiSelect';
import '../grid_with_buttons/gridCellTooltip'
import '../grid_with_buttons/tableRowDetail';
import '@material/mwc-button';
import '../ParentReadOnlyTable/main'; // Adjust the import path as needed

import print from './dragdropboxprint';
export const template = (tmpLogic, selectedBox, viewModel, lang, componentRef) => {
    console.log('tmpLogic', tmpLogic, 'selectedBox', selectedBox, 'viewModel', viewModel)
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
        if (viewModel.forceAllowMoveObjectAsViewRule!==undefined&&viewModel.forceAllowMoveObjectAsViewRule===true){
            boxAllowMoveObject=true
        }
        let selectedBoxContentData=selectedBox[viewModel.boxesContentColumns.endPointPropertyArray]
        let occupied=selectedBoxContentData===undefined?0:selectedBoxContentData.length
        if (boxContentStructured===true){
            let total=selectedBox.cols*selectedBox.rows
            totalStr=String(occupied)+(lang==="en"?' of ':' de ')+ String(total)                
        }else{
            totalStr="Total: "+String(occupied)
        }
    }
    return html`
    <div style="display:flex; flex-direction:column; gap:12px; margin:30px;">    
    <div style="display:flex; flex-direction:row; gap:12px;">    
        <div style="width: 100%; gap: 4px; display: flex; flex-direction: column;">        
            <div style="display:flex; justify-content: space-between; align-items: center;"> 
                <div style="display:flex; flex-direction:row; gap: 4px; align-items: center;"> 
                <mwc-icon-button icon="print" @click=${() => { print(selectedBox!==undefined, componentRef) }}></mwc-icon-button>
                ${selectedBox===undefined ? html`
                    
            ${viewModel.boxesTableColumns===undefined? html``:html`${componentRef._boxesTable(tmpLogic, viewModel.boxesTableColumns, tmpLogic.data, lang, componentRef)}`}                                    

                    `: html `
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
    let selectedBoxContentData=selectedBox[viewModel.boxesContentColumns.endPointPropertyArray]
    return  html`
            <div class="unstructuredbox-content_allowmove_${boxAllowMoveObject}" id='mainBox' draggable="true" class="draggable-box" @dragover=${(e) => tmpLogic.allowDrop(e, boxAllowMoveObject)} @drop=${(e) => tmpLogic.dropInUnstructuredBox(e, 0, 0)}>
                ${viewModel.viewMode == 1 ? html `
                <div >
                ${selectedBoxContentData.length > 0 ?
                html `
                    ${selectedBoxContentData.map((selItem ,j) => html `
                    ${printItemByViewFilter(selItem, tmpLogic, boxPosicsViews, false)}
                    `)}         
                `:html``}
                </div>
                `:
                selectedBoxContentData!==undefined ?
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
    let selectedBoxContentData=undefined
    if (selectedBox!==undefined){
        selectedBoxContentData=selectedBox[viewModel.boxesContentColumns.endPointPropertyArray]
    }
    return html`
        ${selectedBox!==undefined ? html `
        <div class="structuredbox-content_allowmove_${boxAllowMoveObject}" id='mainBox'>
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
                    <div class="box ${tmpLogic.selectedIndex1 == rowN + (j + 1) ? "active" : ""}" style=${selectedBoxContentData.find((item, index) => item.posX + ((item.posY - 1) * selectedBox.cols) == i * axisCols.length + (j + 1)) ? `background-color:rgb(80, 220, 247);` : ``}  @click=${() => tmpLogic.setSelectBoxIndex(rowN + (j + 1), i * axisCols.length + (j + 1))} @dragover=${(e) => tmpLogic.allowDrop(e, boxAllowMoveObject)} @drop=${(e) => tmpLogic.dropInStructuredBox(e, j + 1, i + 1)}> 
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
                    <div class="box ${tmpLogic.selectedIndex1 == rowN + (j + 1) ? "active" : ""}" style=${selectedBoxContentData.find((item, index) => item.posX + ((item.posY - 1) * selectedBox.cols) == i * axisCols.length + (j + 1)) ? `background-color:rgb(80, 220, 247);` : ``} @click=${() => tmpLogic.setSelectBoxIndex(rowN + (j + 1), i * axisCols.length + (j + 1))}> 
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

            selectedBoxContentData.length > 0 ?
            html `
            <div style="width: min-width: 556px;">
                ${boxContentTable(tmpLogic,viewModel.boxesContentColumns, selectedBox)}
            </div>
            ` : 
            null}
        </div>
        ` :
        tmpLogic && tmpLogic.data && tmpLogic.data.boxContents && tmpLogic.data.boxContents.length > 0 ?
        html `
        ${viewModel.boxesTableColumns===undefined? html``:html`${boxesTable(tmpLogic, viewModel.boxesTableColumns, tmpLogic.data, lang, componentRef)}`}                                    
        `: null}
    </div>
    `
}
function printObjectData(tmpLogic, selectedBox, axisCols, boxPosicsViews, i, j){    
    let selectedBoxContentData=selectedBox[boxesContentColumns.endPointPropertyArray]
    let selItem=selectedBoxContentData.find((item, index) => item.posX + ((item.posY - 1) * selectedBox.cols) == i * axisCols.length + (j + 1))    
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
    let dataArr = componentRef.TRAZiTgetDataFromRoot(elem, data)
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
                        ${elem.row_buttons === undefined ? html`` : html`<td><div class="layout horizontal center flex wrap">${componentRef.getButtonForRows(elem.row_buttons, p, false, parentData)}</div></td>`}
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
    let selectedBoxContentData=selectedBox[elem.boxesContentColumns.endPointPropertyArray]

    return html`
    <table class="TRAZiT-DefinitionArea dragdropable">
    <thead>
        <th>Posic</th>
        ${elem.columns.map((column, i) => html`<th>${column.label_en}</th>`)}
    </thead>
    <tbody>
        ${selectedBoxContentData === undefined || !Array.isArray(selectedBoxContentData) ? html `No Data` : 
        html`  
            ${selectedBoxContentData.map((p, i) => { return html `
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
                    <td><div class="layout horizontal center flex wrap"> ${componentRef.getButtonForRows(elem.row_buttons, p, false, parentData)}</div></td>
                `}
            </tr>
            `})}
        `}    
    </tbody>
    </table>
    `
}
function boxesTableDataViews(tmpLogic, elem, data, lang, componentRef){
    return html``
    let dataArr=componentRef.TRAZiTgetDataFromRoot(elem, data)
    return html`${componentRef.parentReadOnlyTable(elem, undefined, false, dataArr)}`
}
function boxesTableUsingnewParentReadOnlyTable(tmpLogic, elem, data, lang, componentRef) {
    let dataArr = componentRef.TRAZiTgetDataFromRoot(elem, data);
    return html`<newparent-read-only-table .elem=${elem} .dataArr=${dataArr} .lang=${lang}></newparent-read-only-table>`;
  }







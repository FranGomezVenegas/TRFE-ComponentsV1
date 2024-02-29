import { html } from 'lit-element';
import '@material/mwc-icon';

export const template = (props, action) => {
    let cols = [], rows = [];
    for(let i = 0; i < props.data.boxDefinition.cols; i++) {
        cols.push(i);
    }

    let letter = "A";
    for(let i = 0; i < props.data.boxDefinition.rows; i++) {
        rows.push(String.fromCharCode(letter.charCodeAt(0) + (i)));
    }
    let activeData = null;

    return html`    
        <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; flex-direction:row; gap:12px;">
                <div style="width: fit-content; gap: 4px; display: flex; flex-direction: column;">
                    <div style="display:flex; justify-content: space-between;"> 
                        <div style="display:flex; flex-direction:row; gap: 4px; align-items: center;"> 
                            <mwc-icon style="color:#54CCEF; cursor:pointer;"> content_copy </mwc-icon>
                            <div class="view-btn ${props.viewMode == 1 ? "active" : ""}" @click=${() => props.setViewMode(1)}> Box View </div>
                            <div class="view-btn ${props.viewMode == 2 ? "active" : ""}" @click=${() => props.setViewMode(2)}> List View </div>
                        </div>
                        <div style="display:flex; flex-direction:row; gap: 4px; align-items: center;">
                            <mwc-icon @click=${() => props.setViewTableBox()} style="color:#54CCEF; cursor:pointer;"> home </mwc-icon>
                            <div class="accept-btn" @click=${() => props.setViewTable()}> Accept </div>
                        </div>
                    </div>
                    ${!props.viewTableBox ? html `
                    <div class="box-content">
                        ${props.viewMode == 1 ? html `
                        <div> 
                            <div class="row-content"> 
                                <div class="first-item"> </div>
                                ${cols.map((colN, i) => html `
                                <div class="col-num"> ${colN + 1} </div>
                                `)}
                            </div>
                            ${rows.map((rowN ,i) => html `
                            <div class="row-content"> 
                                <div class="row-num"> ${rowN} </div>
                                ${props.data.boxDefinition.allow_move_objects ? 
                                cols.map((item1 ,j) => html `
                                <div class="box ${props.selectedIndex1 == rowN + (j + 1) ? "active" : ""}" style=${props.data.boxDefinition.datas.find((item, index) => item.posX + ((item.posY - 1) * props.data.boxDefinition.cols) == i * cols.length + (j + 1)) ? `background-color:rgb(80, 220, 247);` : ``}  @click=${() => props.setSelectBoxIndex(rowN + (j + 1), i * cols.length + (j + 1))} @dragover=${(e) => props.allowDrop(e)} @drop=${(e) => props.dropBox(e, j + 1, i + 1)}> 
                                    <div draggable="true"  @dragstart=${(e) => props.dragBox(e, j + 1, i + 1)} class="draggable-box">
                                        <div class="data-view" >
                                            <div> ${props.data.boxDefinition.datas.find((item, index) => item.posX + ((item.posY - 1) * props.data.boxDefinition.cols) == i * cols.length + (j + 1)) ? `id: ${props.data.boxDefinition.datas.find((item, index) => item.posX + ((item.posY - 1) * props.data.boxDefinition.cols) == i * cols.length + (j + 1)).id}` : html``} </div>
                                            <div> ${props.data.boxDefinition.datas.find((item, index) => item.posX + ((item.posY - 1) * props.data.boxDefinition.cols) == i * cols.length + (j + 1)) ?  `${[props.data.boxDefinition.views[props.viewBoxMode][1]]}: ${ props.data.boxDefinition.datas.find((item, index) => item.posX + ((item.posY - 1) * props.data.boxDefinition.cols) == i * cols.length + (j + 1))[props.data.boxDefinition.views[props.viewBoxMode][1]] ? props.data.boxDefinition.datas.find((item, index) => item.posX + ((item.posY - 1) * props.data.boxDefinition.cols) == i * cols.length + (j + 1))[props.data.boxDefinition.views[props.viewBoxMode][1]] : "???"}` : html `<div class="add-circle"> + </div>`} </div>
                                        </div>
                                        <div class="position">
                                            <span> ${rowN + (j + 1)} </span>
                                            <span> ${ i * cols.length + (j + 1) } </span>
                                        </div>
                                    </div>
                                </div>
                                `) : 
                                cols.map((item1 ,j) => html `
                                <div class="box ${props.selectedIndex1 == rowN + (j + 1) ? "active" : ""}" @click=${() => props.setSelectBoxIndex(rowN + (j + 1), i * cols.length + (j + 1))}> 
                                    <div class="draggable-box">
                                        <div class="data-view" >
                                            <div> ${props.data.boxDefinition.datas.find((item, index) => item.posX + ((item.posY - 1) * props.data.boxDefinition.cols) == i * cols.length + (j + 1)) ? `id: ${props.data.boxDefinition.datas.find((item, index) => item.posX + ((item.posY - 1) * props.data.boxDefinition.cols) == i * cols.length + (j + 1)).id}` : html``} </div>
                                            <div> ${props.data.boxDefinition.datas.find((item, index) => item.posX + ((item.posY - 1) * props.data.boxDefinition.cols) == i * cols.length + (j + 1)) ?  `${[props.data.boxDefinition.views[props.viewBoxMode][1]]}: ${ props.data.boxDefinition.datas.find((item, index) => item.posX + ((item.posY - 1) * props.data.boxDefinition.cols) == i * cols.length + (j + 1))[props.data.boxDefinition.views[props.viewBoxMode][1]] ? props.data.boxDefinition.datas.find((item, index) => item.posX + ((item.posY - 1) * props.data.boxDefinition.cols) == i * cols.length + (j + 1))[props.data.boxDefinition.views[props.viewBoxMode][1]] : "???"}` : html `<div class="add-circle"> + </div>`} </div>
                                        </div>
                                        <div class="position">
                                            <span> ${rowN + (j + 1)} </span>
                                            <span> ${ i * cols.length + (j + 1) } </span>
                                        </div>
                                    </div>
                                </div>
                                `)}
                            </div>
                            `)}
                            <div style="display:flex; justify-content: center;">
                                ${props.selectedIndex1 ? html `<div class="selected-cell-content"> Cell selected: ${props.selectedIndex1} </div>` : null} 
                            </div>
                            ${props.selectedIndex2 ? html `<div style="text-align: center; color: white;"> ${props.selectedIndex2}:Sample box </div>` : null} 
                        </div>
                        ` : 

                        props.data.boxDefinition.datas.length > 0 ?
                        html `
                        <div style="width: min-width: 556px;">
                            <table class="TRAZiT-DefinitionArea dragdropable">
                                <thead>
                                    <tr>
                                        <th>Pos</th>
                                        <th>Name</th>
                                        <th>Vol</th>
                                        <th>Stor.comments</th>
                                        <th>Description</th>
                                        <th>Date created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${props.data.boxDefinition.datas.map((data, i) => html`
                                    <tr>
                                        <td>${ String.fromCharCode(data.posY + 64) + data.posX}</td>
                                        <td>${data.name}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>${data.stored_on}</td>
                                    </tr>
                                    `)}
                                </tbody>
                            </table>
                        </div>
                        ` : 
                        null}
                    </div>
                    ` :
                    props.data.boxContents && props.data.boxContents.length > 0 ?
                    html `
                    <table class="dragdropable TRAZiT-DefinitionArea">
                        <thead> 
                            <th> Name </th>
                            <th> Cols </th>
                            <th> Rows </th>
                        </thead>
                        <tbody>
                            ${props.data.boxContents.map((row, i) => html `
                            <tr @click=${() => props.showBoxContent(row, i)}> 
                                <td> box ${ i + 1 } </td>
                                <td> ${row.cols} </td>
                                <td> ${row.rows} </td>
                            </tr>
                            `)}
                        </tbody>
                    </table>
                    `: null}
                </div>
                <div >
                    <mwc-icon style="color:#54CCEF; cursor:pointer; margin-top:42px;" @click=${() => props.setShowBoxViewModeList()}> view_agenda </mwc-icon>
                    ${props.listBoxViewMode ? html `
                        ${props.data.boxDefinition.views.map((view, i) => html `
                        <div class="display:flex; flex-direction:row;">
                            <input style="transform: translateY(3px);" type="radio" id="${view[1]}" name="fav_language" value="${view[1]}"  @click=${() => props.setViewBoxMode(i)}>
                            <label for="${view[1]}" @click=${() => props.setViewBoxMode(i)}> id, ${view[1]} </label><br>
                        </div>
                        `)}
                    `: 
                    html ``}
                </div>
                ${props.viewTable ? html `
                <div style="margin-top:42px">
                    <table class="dragdropable TRAZiT-DefinitionArea"> 
                        <thead>
                                ${props.data.tableDefinition.columns.map((column, i) => html`
                                    <th>${column.label_en}</th>
                                `)}
                        </thead>
                        <tbody>
                            ${props.data.tableData.map((data, i) => html`
                            <tr class="dragdropabletr" draggable="true"  @dragstart=${(e) => props.dragTableTr(e, data.id, data.study, data.temperature)}>
                                <td> ${data.id} </td>
                                <td> ${data.study} </td>
                                <td> ${data.temperature} </td>
                            </tr>
                            `)}
                        </tbody>
                    </table>
                </div> 
                `: null}
            </div>
        </div>
    `;
};



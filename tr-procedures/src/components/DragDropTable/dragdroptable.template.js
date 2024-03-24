import { html } from 'lit-element';
import { nothing } from 'lit'; 
import { ButtonsFunctions } from "../Buttons/ButtonsFunctions";

import '@material/mwc-icon';

export const template = (props, data, lang) => {    
    return html`
        <div style="display:flex; flex-direction:row; gap:12px;">
        ${props.definition.map((curTable, ii) => myTable(curTable, data, lang, props))}
        </div>
    `;
}

function myTable(elem, dataArr, lang, props) {
    dataArr=getDataFromRoot(elem, dataArr)
    return html`
        <table class="dragdropable TRAZiT-DefinitionArea" style="width: 400px;"> 
            <thead>
                ${elem.columns.map((column, i) => html`<th>${column["label_"+lang]}</th>`)}
            </thead>
            <tbody>
                ${dataArr === undefined || !Array.isArray(dataArr) ? html `No Data` : 
                html`  
                    ${dataArr.map((p, idx) => { return html `
                    <tr class="dragdropabletr" draggable="${elem.dragEnable}"  @dragstart=${(e) => props.dragTableTr(e, elem, p)} @dragover=${(e) => props.allowDropTr(e)} @drop=${(e) => props.dropTableTr(e, elem, p)}>
                        ${elem.columns.map((fld, index) =>         
                            html`<td>${p[fld.name]}</td>`
                        )}
                        ${elem.row_buttons === undefined? html`` : html`
                        <td><div class="layout horizontal center flex wrap"> ${this.getButtonForRows(elem.row_buttons, p, false, parentData)}</div></td>
                        `}
                    </tr>
                    `})}
                `}
            </tr>            
            </tbody>
        </table>
    `;
}

function trElementType(elem){
    if (elem.dragEnable && elem.dropEnable){
        return html `<tr class="dragdropabletr" draggable="true"  @dragstart=${(e) => props.dragTableTr(e, ii, index)} @dragover=${(e) => props.allowDropTr(e)} @drop=${(e) => props.dropTableTr(e, ii, index)}>`
    }
    if (elem.dropEnable){return html `
    <tr class="dragdropabletr" @dragover=${(e) => props.allowDropTr(e)} @drop=${(e) => props.dropTableTr(e, ii, index)}>
    `}

    if (elemdragEnable){return html `
    <tr class="dragdropabletr" draggable="true"  @dragstart=${(e) => props.dragTableTr(e, ii, index)}>
    `}
    return html `
    <tr class="dragdropabletr undropable" @dragover=${(e) => props.allowDropTr(e)} @drop=${(e) => props.unavaiableToDrop()}>
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
export const template2 = (props) => {
    return html`    
        <div style="display:flex; flex-direction:row; gap:12px;">
        ${props.data.tableData.map((taData, ii) => html`
            <table class="dragdropable TRAZiT-DefinitionArea" style="width: 400px;"> 
                <thead>
                        ${props.data.tableDefinition.columns.map((column, i) => html`
                            <th>${column.label_en}</th>
                        `)}
                    <tr>
                </thead>
                <tbody>
                    ${taData.map((data, index) => 
                    props.data.tableDefinition.dragEnable[ii] && props.data.tableDefinition.dropEnable[ii] ? html `
                    <tr class="dragdropabletr" draggable="true"  @dragstart=${(e) => props.dragTableTr(e, ii, index)} @dragover=${(e) => props.allowDropTr(e)} @drop=${(e) => props.dropTableTr(e, ii, index)}>                    
                        <td> ${data.id} </td>
                        <td> ${data.study} </td>
                        <td> ${data.temperature} </td>
                    </tr>` :
                    props.data.tableDefinition.dropEnable[ii] ? html `
                    <tr class="dragdropabletr" @dragover=${(e) => props.allowDropTr(e)} @drop=${(e) => props.dropTableTr(e, ii, index)}>
                    <td> ${data.id} </td>
                        <td> ${data.study} </td>
                        <td> ${data.temperature} </td>
                    </tr> ` : 
                    props.data.tableDefinition.dragEnable[ii] ? html `
                    <tr class="dragdropabletr" draggable="true"  @dragstart=${(e) => props.dragTableTr(e, ii, index)}>
                        <td> ${data.id} </td>
                        <td> ${data.study} </td>
                        <td> ${data.temperature} </td>
                    </tr>` : html `
                    <tr class="dragdropabletr undropable" @dragover=${(e) => props.allowDropTr(e)} @drop=${(e) => props.unavaiableToDrop()}>
                        <td> ${data.id} </td>
                        <td> ${data.study} </td>
                        <td> ${data.temperature} </td>
                    </tr>`)}
                </tbody>
            </table>
        `)}
        </div>
    `;
};

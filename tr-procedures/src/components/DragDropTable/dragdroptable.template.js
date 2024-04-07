import { css, nothing } from "lit";

import { html } from 'lit-element';
import { ButtonsFunctions } from "../Buttons/ButtonsFunctions";

import '@material/mwc-icon';

export const template = (props, data, lang) => {    
    return html`
        <div style="display:flex; flex-direction:row; gap:12px;">
        ${props.definition.map((curTable, ii) => 
        html`
          ${curTable.name===undefined||curTable.type===undefined ? html`The object ${ii} has no name or type attribute, this is mandatory`
          :
          html` 
          ${curTable.type==='table'?myTable(curTable, data, lang, props):html``}
          ${curTable.type==='cards'?cardSomeElementsRepititiveObjects(curTable, data, lang, props):html``}
          ${curTable.type!=='table'&&curTable.type!=='cards'?html`The type ${curTable.type} is not recognized`:html``}
          `
          }  
        `)}        
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

function cardSomeElementsRepititiveObjects(elem, data, lang, props) {
  //console.log('cardSomeElementsRepititiveObjects', 'elem', elem, 'data', data)
  data = getDataFromRoot(elem, data);
  console.log('cardSomeElementsRepititiveObjects >> getDataFromRoot', 'elem', elem, 'data', data)
  return html`
    ${Array.isArray(data) && data.length > 0
      ? html`
          ${data.map(
            (d, i) => html` ${kpiCardSomeElementsMain(elem, d, lang, props)} `
          )}
        `
      : html``}
  `;
}
function kpiCardSomeElementsMain(elem, curDataForThisCard, lang, props) {
  //console.log('kpiCardSomeElementsMain', 'elem', elem, 'curDataForThisCard', curDataForThisCard)
  return html`
    ${elem === undefined || elem.title === undefined
      ? html``
      : html`<span
          style="color: rgb(20, 115, 230);font-size: 30px;margin-top: 10px;font-weight: bold;"
          >${elem.title["label_" + lang]}</span
        >`}
    ${curDataForThisCard === undefined
      ? html`${elem.hideNoDataMessage !== undefined &&
        elem.hideNoDataMessage
          ? ""
          : "No columns defined"}`
      : html`
          <div
            id="main${elem.add_border !== undefined &&
            elem.add_border == true
              ? "addborder"
              : ""}"
            class="layout vertical flex wrap"
            style="${elem.style !== undefined ? elem.style : ""}"
            class="dragdropabletr" draggable="${elem.dragEnable}"  @dragstart=${(e) => props.dragTableTr(e, elem, curDataForThisCard)} @dragover=${(e) => props.allowDropTr(e)} @drop=${(e) => props.dropTableTr(e, elem, curDataForThisCard)}>
            <div style="flex-basis: auto; width: auto;">
             <!-- this.getButton(elem, curDataForThisCard, true)} -->
            </div>
            <ul
              style="align-items: baseline;"
              class="column-list${elem.num_columns !== undefined
                ? elem.num_columns
                : ""}"
            >
            ${elem.fieldsToDisplay===undefined?html``:
            html`
              ${elem.fieldsToDisplay.map(
                (fld, i) =>
                  html`
                    ${fieldsToDiscard(fld) === true
                      ? html``
                      : html`                      
                          ${fld.as_ppt !== undefined &&
                          (fld.as_ppt === true || fld.as_video === true)
                            ? html`
                                <mwc-icon-button
                                  icon="fullscreen"
                                  .isvideo=${curDataForThisCard.is_video}
                                  .src=${curDataForThisCard[fld.name]}
                                  @click=${this.openDialogFrame}
                                  .fld=${fld}
                                ></mwc-icon-button>
                                ${curDataForThisCard.is_video === undefined ||
                                curDataForThisCard.is_video === false
                                  ? html`
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
                                    `
                                  : html`
                       
<!---
                          <video controls type="video/mp4" src=${
                            curDataForThisCard[fld.name]
                          } controlsList="nodownload"oncontextmenu="return false" onselectstart="return false" ondragstart="return false"></video>
                          <div id="dialog-frame" class="dialog">
                          <mwc-icon-button icon="fullscreen_exit" @click=${
                            this.closeDialogFrame
                          }></mwc-icon-button> 
                            <video id="video-source" type="video/mp4" controls controlsList="nodownload"oncontextmenu="return false" onselectstart="return false" ondragstart="return false" >
                            </video>-->
                          </div>
                        `}
                              `
                            : html`
                            ${fld.is_tag_list !== undefined && fld.is_tag_list === true ? html`   
                            <span class="cardLabel">${fieldLabel(fld, lang)}:</span>
                            <span class="cardValue">                               
                              <multi-select .label=${this.purpose} .props=${{"readOnly":true, "displayLabel":false}} .activeOptions=${curDataForThisCard[fld.name]} .options=${{}}> </multi-select>
                            </span>
                            `:html`                                      
                                ${fld.as_progress !== undefined &&
                                fld.as_progress === true
                                  ? html`
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
                                            ${curDataForThisCard[fld.name] ===
                                              undefined ||
                                            curDataForThisCard[fld.name].length == 0
                                              ? "0"
                                              : curDataForThisCard[fld.name]}%
                                          </div>
                                        </div>
                                      </div>
                                      <br />
                                    `
                                  : html`
                                      <li>
                                        <span class="cardLabel">
                                          ${fieldLabel(fld, lang)}:
                                        </span>
                                        <span class="cardValue">
                                          ${curDataForThisCard[fld.name]}
                                          ${fld.fix_value_suffix !==undefined? fld.fix_value_suffix: ""}
                                          ${fld.fix_value2_prefix !==undefined? fld.fix_value2_prefix: ""}
                                          ${fld.name2 !== undefined? curDataForThisCard[fld.name2]: ""}
                                          ${fld.fix_value2_suffix !==undefined? fld.fix_value2_suffix: ""}
                                          ${fld.fix_value3_prefix !==undefined? fld.fix_value3_prefix: ""}
                                          ${fld.name3 !== undefined? curDataForThisCard[fld.name3]: ""}
                                          ${fld.fix_value3_suffix !==undefined? fld.fix_value3_suffix: ""}
                                        </span>
                                      </li>
                                    `}
                              `}
                            `}  
                        `}
                  `
              )}
            `}
            </ul>
          </div>
        `}
  `;
}
function fieldLabel(fld, lang) {
  return fld["label_" + lang] !== undefined
    ? fld["label_" + lang]
    : fld.name;
}
function titleLang(colDef) {
  let titleStr = "";
  if (colDef.title !== undefined) {
    return colDef.title["label_" + lang];
  } else {
    return colDef.name;
  }
  return titleStr;
}
function fieldsToDiscard(fld) {
  if (fld.is_translation === undefined || fld.is_translation === false) {
    return false;
  }
  if (fld.is_translation === true && fld.name.endsWith(lang)) {
    return false;
  } else {
    return true;
  }
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

function getDataFromRoot(elem, curDataForThisCard) {
    if (elem !== undefined && elem.contextVariableName !== undefined) {
      if (this[elem.contextVariableName] !== undefined) {
        curDataForThisCard = this[elem.contextVariableName];
      }
    }
    if (curDataForThisCard === null || curDataForThisCard === undefined) {
      return undefined;
    }
    if (elem.endPointPropertyArray !== undefined) {
      if (elem.endPointPropertyArray.length === 0) {
        return curDataForThisCard;
      }
      if (
        elem.endPointPropertyArray.length === 1 &&
        elem.endPointPropertyArray[0].toUpperCase() === "ROOT"
      ) {
        return curDataForThisCard;
      }
      //const numObjectsToSkip = elem.endPointPropertyArray.length - 1;
      //const propertyName = elem.endPointPropertyArray[numObjectsToSkip];
      let i = 0;
      let subJSON = {};
      //curDataForThisCard = curDataForThisCard[elem.endPointPropertyArray[0]][0]
      for (i = 0; i < elem.endPointPropertyArray.length; i++) {
        if (curDataForThisCard === null) {
          return undefined;
        }
        let propertyName = elem.endPointPropertyArray[i];
        if (Array.isArray(curDataForThisCard[propertyName])) {
          if (i < elem.endPointPropertyArray.length - 1) {
            subJSON = curDataForThisCard[propertyName][0];
          } else {
            return curDataForThisCard[propertyName];
          }
        } else {
          subJSON = curDataForThisCard[propertyName];
        }
        if (typeof subJSON === "undefined") {
          return curDataForThisCard;
        } else {
          curDataForThisCard = subJSON;
        }
      }
      return curDataForThisCard;
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
        let curDataForThisCardToRet = [];
        curDataForThisCardToRet = curDataForThisCard[elem.endPointResponseObject];
        if (curDataForThisCardToRet !== undefined) {
          return curDataForThisCardToRet[elem.endPointResponseObject2];
        } else {
          return [];
        }
      } else {
        if (String(elem.endPointResponseObject).toUpperCase() === "ROOT") {
          if (!Array.isArray(curDataForThisCard)) {
            let curDataForThisCardArr = [];
            curDataForThisCardArr.push(curDataForThisCard);
            return curDataForThisCardArr;
          }
          return curDataForThisCard;
        } else {
          return curDataForThisCard[elem.endPointResponseObject];
        }
      }
    }
  }
export const template2 = (props) => {
    return html`    
        <div style="display:flex; flex-direction:row; gap:12px;">
        ${props.curDataForThisCard.tableData.map((taData, ii) => html`
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

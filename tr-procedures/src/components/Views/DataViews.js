import { html, nothing } from "lit";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { ButtonsFunctions } from "../Buttons/ButtonsFunctions";
import { AuditFunctions } from "../Audit/AuditFunctions";
import "../Audit/audit-dialog";

import { ModuleEnvMonitClientMethods } from "../../module_env_monit/ModuleEnvMonitClientMethods";
import { TrazitGenericDialogs } from "../GenericDialogs/TrazitGenericDialogs";
import { TrazitReactivateObjectsDialog } from "../GenericDialogs/TrazitReactivateObjectsDialog";
import { TrazitEnterResultWithSpec } from "../GenericDialogs/TrazitEnterResultWithSpec";
import { ModuleEnvMonitDialogsMicroorganism } from "../../module_env_monit/Dialogs/ModuleEnvMonitDialogsMicroorganism";
import { TrazitInvestigationsDialog } from "../GenericDialogs/TrazitInvestigationsDialog";
import { TrazitTestScriptNewStepDialog } from "../GenericDialogs/TrazitTestScriptNewStepDialog";
import { TrazitCredentialsDialogs } from "../GenericDialogs/TrazitCredentialsDialogs";

import "@vaadin/vaadin-grid/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-column";
import "@vaadin/vaadin-grid/vaadin-grid-selection-column";
import "@vaadin/vaadin-grid/vaadin-grid-sort-column";
import "@vaadin/vaadin-grid/vaadin-grid-filter-column";
import "@doubletrade/lit-datatable";
import "@google-web-components/google-chart";
import '../MultiSelect';
import '../grid_with_buttons/gridCellTooltip'
import '../grid_with_buttons/tableRowDetail';

import { ReadOnlyTableParts } from "./ReadOnlyTableParts";

import { TrazitFormsElements } from "../GenericDialogs/TrazitFormsElements";
import { GridFunctions } from "../grid_with_buttons/GridFunctions";

import '../DragDropBox/index';  

export function DataViews(base) {

  let contextMenu = undefined;
  return class extends TrazitTestScriptNewStepDialog(ReadOnlyTableParts(GridFunctions(TrazitFormsElements(
    TrazitCredentialsDialogs(
      AuditFunctions(
          (
          TrazitInvestigationsDialog(
            ModuleEnvMonitDialogsMicroorganism(
              TrazitEnterResultWithSpec(
                TrazitReactivateObjectsDialog(
                  TrazitGenericDialogs(
                    ModuleEnvMonitClientMethods(
                      AuditFunctions(ButtonsFunctions(base))
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  )))) {
    kpiChartFran1(elem, data) {
      if (elem===undefined){return html``}
      if (elem.hideNoDataMessage!==undefined&&elem.hideNoDataMessage===true&&data===undefined){return html``}
      if (data===undefined&&this.data!==undefined){data=this.data}
      //console.log('kpiChartFran', 'elem', elem, 'data', this.data)
      return html`
        ${elem.display_chart !== true
          ? nothing
          : html`
              ${this.chartStyle(elem.chart_name)}
              <google-chart
                id="${elem.chart_name}"
                title="${elem.chart_title["label_" + this.lang]}"
                type="${elem.chart_type}"
                .data="${this.getChartData(elem, data)}"
                .options="${this.getChartOptions(elem)}"
                style="${
                  elem.chart_style !== undefined
                    ? elem.chart_style
                    : "height:400px; width: 100%;"
                }
              ></google-chart>
            `}
      `;
    }

    getDataFromRoot(elem, data) {
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

    jsonViewer(elem, data) {
      // console.log('jsonViewer', 'elem', elem, 'data', data, 'dataToDisplay', data[elem.endPointResponseObject])
      return html`
        <div style="position:relative;">
          ${elem === undefined || elem.title === undefined
            ? nothing
            : html`<span
                style="color: rgb(20, 115, 230);font-size: 30px;margin-top: 10px;font-weight: bold;"
                >${elem.title["label_" + this.lang]}</span
              >`}
          ${elem === undefined || data === undefined
            ? nothing
            : html` <json-viewer style=${elem.style!==undefined?elem.style: "padding:0px; padding-left:20px; top:-15px;"}
                >${JSON.stringify(
                  this.getDataFromRoot(elem, data)
                )}</json-viewer
              >`}
        </div>
      `;
    }
    kpiReportTitle(elem, data) {    
      return html`    
        <p><span style="color: rgb(20, 115, 230);font-size: 30px;margin-top: 10px;font-weight: bold;" id="reportTitle">${elem.title["label_" + this.lang]}</p>
      `;
    }
    kpiReportTitleLvl2(elem, data, lang) {
      if (elem.title===undefined&&(elem.title.text_en===undefined||elem.title.label_en===undefined)){
        return html``
      }
      if (elem.title.text_en!==undefined){
        return html`
        <p><span style="color: rgb(20, 115, 230);font-size: 24px;margin-top: 10px;font-weight: bold;" id="reportTitle">            
          ${unsafeHTML(this.getDynamicData(elem.title, data, lang))}
        </p>
        `
      }
      return html`    
          <p><span style="color: rgb(20, 115, 230);font-size: 24px;margin-top: 10px;font-weight: bold;" id="reportTitle">${            
              elem.title["label_" + this.lang]
          }</p>
          `;
    }
    kpiRecoveryRate() {
      //console.log('kpiRecoveryRate', this.data.recoveryrate_datatable)
      return html`
        ${!this.data.recoveryrate_datatable ||
        !this.data.recoveryrate_datatable.data
          ? nothing
          : html`
              <lit-datatable
                .data="${this.data.recoveryrate_datatable.data}"
                .conf="${this.data.recoveryrate_datatable.conf}"
              ></lit-datatable>
            `}
      `;
    }
    kpiGrid(elem, data = this.data) {
      //console.log('kpiGrid', elem, "data", this.data[elem.elementName])
      let fldsToDisplay = [];
      for (let i = 0; i < elem.fieldsToDisplay.length; i++) {
        if (elem.fieldsToDisplay[i]["label_" + this.lang] !== undefined) {
          elem.fieldsToDisplay[i].header =
            elem.fieldsToDisplay[i]["label_" + this.lang];
        }
      }
      return html`
        ${!data[elem.elementName] || !elem.fieldsToDisplay
          ? nothing
          : html`
              <lit-datatable
                .data="${data[elem.elementName]}"
                .conf="${elem.fieldsToDisplay}"
              ></lit-datatable>
            `}
      `;
    }
    readOnlyTableByGroupOrig(elem, dataArr, isSecondLevel = false) {
      console.log("readOnlyTableByGroup", elem, dataArr);
      dataArr = this.getDataFromRoot(elem, dataArr);
      console.log("Mejori",dataArr);      
      return html`
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
          ${dataArr === undefined
            ? html`No Data`
            : html`
                ${Object.entries(dataArr).map(
                  ([key, value]) =>
                    html`
                      ${this.readOnlyTable(
                        elem,
                        Object.entries(value).map,
                        isSecondLevel,
                        value,
                        key
                      )}
                    `
                )}
              `}
        </div>
      `;
    }
    readOnlyTableByGroupAllInOne(elem, dataArr, isSecondLevel) {
      if (isSecondLevel === undefined) {
        isSecondLevel = false;
      }
      dataArr = this.getDataFromRoot(elem, dataArr);
      return html`
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
            font-size:10px;
            word-break: auto-phrase;
            color: rgb(41, 137, 216); /* #032bbc; */
          }
          span.cardValue {            
            color: rgba(214, 233, 248, 0.37); 
            font-size:8px; 
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
            ${elem === undefined || elem.title === undefined
              ? nothing
              : html` <p>
                  <span class="title ${isSecondLevel}">${elem.title}</span>
                </p>`}
            <div class="layout horizontal center flex wrap">
              ${this.getButton(elem, dataArr, true)}
            </div>
            ${elem.columns === undefined
              ? html`No columns defined`
              : html`
                  <table class="styled-table-bygroup">
                    ${Object.entries(dataArr)
                      .sort()
                      .map(
                        ([key, value]) =>
                          html`
                  <thead>          
                    <tr>
                    <th style="color:#24c0eb; background-color: #d6e9f8; text-transform:uppercase; font-size:16px;" colspan=" ${
                      elem.columns.length} ">
                      
                      ${elem.showGroupEntryObjectName!==undefined&&elem.showGroupEntryObjectName===true?
                      html`${key} ${ Object.keys(value)[0]}`: 
                      html`${key}`
                      }</th>
                    </tr>
                    <tr class="headercolumns">
                      ${elem.columns.map(
                        (fld) =>
                          html`
                            <td style="background-color:#7ccee6; color: white;">
                              ${fld["label_" + this.lang]}
                            </td>
                          `
                      )}                  
                    </tr>
                  </thead>
                  <tbody>
                  ${
                    value === undefined || !Array.isArray(value)
                      ? html`No Data`
                      : html`
                          ${value.sort().map(
                            (p) =>
                              html`
                                <tr>
                                  ${elem.columns.map(
                                    (fld) =>
                                      html`
                                        ${fld.name === "pretty_spec"
                                          ? html`
                                              <td>
                                                <span style="color:green"
                                                  >${p[
                                                    "spec_text_green_area_" +
                                                      this.lang
                                                  ]}</span
                                                >
                                                <span style="color:orange"
                                                  >${p[
                                                    "spec_text_yellow_area_" +
                                                      this.lang
                                                  ]}</span
                                                >
                                                <span style="color:red"
                                                  >${p[
                                                    "spec_text_red_area_" +
                                                      this.lang
                                                  ]}</span
                                                >
                                              </td>
                                            `
                                          : html`
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
                                                          title="${this.titleLang(
                                                            fld
                                                          )}"
                                                        >
                                                          <div
                                                            class="w3-container w3-blue w3-round-xlarge"
                                                            style="width:${p[
                                                              fld.name
                                                            ]}%"
                                                          >
                                                            ${p[fld.name]}%
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <br />
                                                    </td>
                                                  `
                                                : html`
                                                    <td>
                                                      ${fld.fix_value_prefix !==
                                                      undefined
                                                        ? fld.fix_value_prefix
                                                        : ""}${p[
                                                        fld.name
                                                      ]}${fld.fix_value_suffix !==
                                                      undefined
                                                        ? fld.fix_value_suffix
                                                        : ""}
                                                      ${fld.fix_value2_prefix !==
                                                      undefined
                                                        ? fld.fix_value2_prefix
                                                        : ""}${fld.name2 !==
                                                      undefined
                                                        ? p[fld.name2]
                                                        : ""}${fld.fix_value2_suffix !==
                                                      undefined
                                                        ? fld.fix_value2_suffix
                                                        : ""}
                                                      ${fld.fix_value3_prefix !==
                                                      undefined
                                                        ? fld.fix_value3_prefix
                                                        : ""}${fld.name3 !==
                                                      undefined
                                                        ? p[fld.name3]
                                                        : ""}${fld.fix_value3_suffix !==
                                                      undefined
                                                        ? fld.fix_value3_suffix
                                                        : ""}
                                                    </td>
                                                  `}
                                            `}
                                      `
                                  )}
                                </tr>
                              `
                          )}
                        `
                  }
                  </tbody>
                </table>
              `
                      )}
                  </table>
                `}
          </div>
        </div>
      `;
    }

    readOnlyTableByGroup(elem, dataArr, isSecondLevel) {
      if (isSecondLevel === undefined) {
        isSecondLevel = false;
      }
      dataArr = this.getDataFromRoot(elem, dataArr);
      if (dataArr === undefined) {
        return html``;
      }
      return html`
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
            word-break: auto-phrase;
            font-size:10px; 
            /* #032bbc; */
          }
          span.cardValue {
            color: rgba(214, 233, 248, 0.37); 
            word-break: auto-phrase;
            font-size:8px; 
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
          ${elem === undefined || elem.title === undefined
            ? nothing
            : html` <p>
                <span class="title ${isSecondLevel}"
                  >${elem.title["label_" + this.lang]}</span
                >
              </p>`}

          <div
            style="display: flex; flex-direction: row; text-align: center; flex-wrap:wrap; "
          >
            <div class="layout horizontal center flex wrap">
              ${this.getButton(elem, dataArr, true)}
            </div>
            ${elem.columns === undefined
              ? html`No columns defined`
              : html`
                  ${Object.entries(dataArr)
                    .sort()
                    .map(
                      ([key, value]) =>
                        html`
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
                                ${elem.columns.map(
                                  (fld) =>
                                    html`
                                      ${this.fieldsToDiscard(fld) === true
                                        ? nothing
                                        : html`<td
                                            style="background-color:#7ccee6; color: white; font-weight: bold;"
                                          >
                                            ${fld["label_" + this.lang]}
                                          </td>`}
                                    `
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              ${value === undefined || !Array.isArray(value)
                                ? html`No Data`
                                : html`
                                    ${value.sort().map(
                                      (p) =>
                                        html`
                                          <tr>
                                            ${elem.columns.map(
                                              (fld) =>
                                                html`
                                                  ${this.fieldsToDiscard(
                                                    fld
                                                  ) === true
                                                    ? nothing
                                                    : html`
                                                        ${fld.name ===
                                                        "pretty_spec"
                                                          ? html`
                                                              <td>
                                                                <span
                                                                  style="color:green"
                                                                  >${p[
                                                                    "spec_text_green_area_" +
                                                                      this.lang
                                                                  ]}</span
                                                                >
                                                                <span
                                                                  style="color:orange"
                                                                  >${p[
                                                                    "spec_text_yellow_area_" +
                                                                      this.lang
                                                                  ]}</span
                                                                >
                                                                <span
                                                                  style="color:red"
                                                                  >${p[
                                                                    "spec_text_red_area_" +
                                                                      this.lang
                                                                  ]}</span
                                                                >
                                                              </td>
                                                            `
                                                          : html`
                                                              ${fld.as_progress !==
                                                                undefined &&
                                                              fld.as_progress ===
                                                                true
                                                                ? html`
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
                                                                          title="${this.titleLang(
                                                                            fld
                                                                          )}"
                                                                        >
                                                                          <div
                                                                            class="w3-container w3-blue w3-round-xlarge"
                                                                            style="width:${p[
                                                                              fld
                                                                                .name
                                                                            ]}%"
                                                                          >
                                                                            ${p[
                                                                              fld
                                                                                .name
                                                                            ]}%
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                      <br />
                                                                    </td>
                                                                  `
                                                                : html`
                                                                    <td>
                                                                      ${fld.fix_value_prefix !==
                                                                      undefined
                                                                        ? fld.fix_value_prefix
                                                                        : ""}${p[
                                                                        fld.name
                                                                      ]}${fld.fix_value_suffix !==
                                                                      undefined
                                                                        ? fld.fix_value_suffix
                                                                        : ""}
                                                                      ${fld.fix_value2_prefix !==
                                                                      undefined
                                                                        ? fld.fix_value2_prefix
                                                                        : ""}${fld.name2 !==
                                                                      undefined
                                                                        ? p[
                                                                            fld
                                                                              .name2
                                                                          ]
                                                                        : ""}${fld.fix_value2_suffix !==
                                                                      undefined
                                                                        ? fld.fix_value2_suffix
                                                                        : ""}
                                                                      ${fld.fix_value3_prefix !==
                                                                      undefined
                                                                        ? fld.fix_value3_prefix
                                                                        : ""}${fld.name3 !==
                                                                      undefined
                                                                        ? p[
                                                                            fld
                                                                              .name3
                                                                          ]
                                                                        : ""}${fld.fix_value3_suffix !==
                                                                      undefined
                                                                        ? fld.fix_value3_suffix
                                                                        : ""}
                                                                    </td>
                                                                  `}
                                                            `}
                                                      `}
                                                `
                                            )}
                                          </tr>
                                        `
                                    )}
                                  `}
                            </tbody>
                          </table>
                        `
                    )}
                `}
          </div>
        </div>
      `;
    }

    handleTableRowClick(event, rowSelected, elem) {      
      if(rowSelected[elem.children] == 0) {
        if (elem.openWhenNoData === undefined || elem.openWhenNoData === false) {
          alert("There is no data");
          this.selectedItemInView={}
        }
      }
      //alert(el);

      //if (this.selectedItemInView===undefined||Object.keys(this.selectedItemInView).length === 0){
      //  this.selectedItemInView=undefined
      //}else{
      this.selectedItemInView = rowSelected;
      console.log('selectedItemInView', this.selectedItemInView)
      //}
      // const event2 = new CustomEvent('action-performed', {
      //   bubbles: true, // Allow the event to bubble up the DOM tree
      //   composed: true, // Allow the event to cross the shadow DOM boundary
      // });

      // this.dispatchEvent(event2);
      sessionStorage.setItem('rowSelectedData', JSON.stringify(rowSelected));
      this.render();
      const popup = this.shadowRoot.querySelector(".js-context-popup");
      if (!popup.contains(event.target)) {
        popup.style.display = "none";
      }
    }

    connectedCallback() {
      super.connectedCallback();
      document.addEventListener('keydown', this.handleKeyDown);
      // window.addEventListener('scroll', this.handleScroll);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      document.removeEventListener('keydown', this.handleKeyDown);
      // window.removeEventListener('scroll', this.handleScroll);
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

    resetFilterIndex(elem) {
      const endPointResponseObject = elem.endPointResponseObject;
      this.selectedTableIndex = {
        ...this.selectedTableIndex,
        [endPointResponseObject]: undefined
      }

      if(elem.children_definition) {
        const childElement = {
          ...elem.children_definition,
          endPointResponseObject: elem.endPointResponseObject + "_child"
        };
        this.resetFilterIndex(childElement);
      }
    }

    parentReadOnlyTable(elem, dataArr, isSecondLevel, directData, alternativeTitle, parentElement, theme, parentData) {
      if (directData !== undefined) {
        dataArr = directData;
      } else {
        dataArr = this.getDataFromRoot(elem, dataArr);
      }
      console.log(elem, dataArr)
      const handleFilter = (event, p, elem, idx) => {
        const endPointResponseObject = elem.endPointResponseObject;
        const isToggling = this.selectedTableIndex[endPointResponseObject] === idx;
        this.resetFilterIndex(elem);

        if(!isToggling) {
          this.selectedTableIndex = {
            ...this.selectedTableIndex,
            [endPointResponseObject]: idx
          }
        }
      }

      const handleResetParentFilter = (elem) => {
        this.resetFilterIndex(elem);
      }
      
      const childElement = {
        ...elem.children_definition,
        endPointResponseObject: elem.endPointResponseObject + "_child"
      };
      
      const endPointResponseObject = elem.endPointResponseObject;
      const selectedIdx = this.selectedTableIndex[endPointResponseObject];
      const childDataArr = selectedIdx !== undefined ? dataArr[selectedIdx][elem.children] : undefined;
      if (parentData===undefined){
        parentData= selectedIdx !== undefined ? dataArr[0] : undefined;
      }
      return html`
        ${this.readOnlyTable(elem, undefined, isSecondLevel, dataArr, alternativeTitle, handleFilter, handleResetParentFilter, parentElement, theme, parentData)}
        ${childDataArr && childDataArr.length > 0 ? this.parentReadOnlyTable(childElement, undefined, isSecondLevel, childDataArr, alternativeTitle, elem, theme, parentData) : nothing}
      `;
    }

    rolesAndActions(elem, dataArr, isSecondLevel = false, lang, directData, theme) {
      let tmp = elem.theme
      if(typeof(tmp) == "undefined") {
        tmp = "TRAZiT-UsersArea";
      }
      //console.log('rolesAndActions', 'elem', elem, 'dataArr', dataArr)
/*      if (directData !== undefined) {
        dataArr = directData;
      } else {
        dataArr = this.getDataFromRoot(elem, dataArr);
      }
*/
      return html`
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
          padding: 16px 20px;
          border: 1px solid #dddddd !important;
        }

        td, th {
          padding: 16px 20px;
          border: 1px solid #dddddd !important;
        }

        table.TRAZiT-UsersArea td, th {
          border: none !important;
        }

        tr {
          cursor: pointer;
        }

        mwc-icon-button {
          --mdc-icon-button-size: 24px;
          --mdc-icon-size: 16px;
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
          ${elem === undefined || elem.title === undefined
            ? nothing
            : html` <p>
                <span class="title ${isSecondLevel}"
                  >${elem.title["label_" + this.lang]}</span
                >
              </p>`}
       
          <table class="styled-table-for-rolesandactions ${tmp}" style="margin-top:24px;">
            <thead>
              <tr>
                ${dataArr === undefined || dataArr[0] === undefined
                  ? html`${this.lang == "en" ? "Not applicable" : "No aplica"}`
                  : html`
                      ${dataArr[0].map(
                        (fld) =>
                          html`
                            ${typeof fld === "object"
                              ? html`${this.fieldsToDiscard(fld) === true
                                  ? nothing
                                  : html`<th
                                      style="text-align: center; color:white; font-weight:normal;"
                                    >
                                      ${fld.label}
                                    </th>`} `
                              : html`
                                  <th style="text-align: center; color:white; font-weight:normal;">
                                    ${fld}
                                  </th>
                                `}
                          `
                      )}
                    `}
              </tr>
            </thead>
            <tbody>
              ${dataArr === undefined || dataArr[0] === undefined
                ? nothing
                : html`
                    ${dataArr.map(
                      (p, iRow) =>
                        html`
                          ${iRow == 0
                            ? nothing
                            : html`
                                <tr>
                                  ${p.map(
                                    (fld, iCol) =>
                                      html`
                                        ${iCol == 0 || iCol == 1
                                          ? html` ${typeof dataArr[0][iCol] ===
                                            "object"
                                              ? html`
                                                  ${this.fieldsToDiscard(
                                                    dataArr[0][iCol]
                                                  ) === true
                                                    ? nothing
                                                    : html`<td
                                                        class="title1"
                                                        style="font-size: 1.6vmin; font-weight: unset; font-family: Montserrat;"
                                                      >
                                                        ${fld}
                                                      </td>`}
                                                `
                                              : html`<td>${fld}</td>`}`
                                          : html`
                                              ${fld !== undefined &&
                                              fld.length > 0
                                                ? html`<td
                                                    class="present"
                                                    title="Assigned"
                                                  >
                                                    ${fld === "ALL"
                                                      ? this.lang === "es"
                                                        ? "TODOS"
                                                        : "ALL"
                                                      : fld}
                                                  </td>`
                                                : html`<td
                                                    class="absent"
                                                    title="NOT assigned"
                                                  ></td>`}
                                            `}
                                      `
                                  )}
                                </tr>
                              `}
                        `
                    )}
                  `}
            </tbody>
          </table>
        </div>
      `;
    }

    kpiCardSomeElementsSingleObject(elem, data) {
      return html`
        ${this.kpiCardSomeElementsMain(elem, this.getDataFromRoot(elem, data))}          
      `;      
    }
    cardExpandSectionForScriptStep(elem, data){
      let jsonElem={}
      jsonElem.endPointPropertyArray=["ROOT"]
      jsonElem.style="background-color:white;" 
      return html`
        ${this.scriptStepArguments(elem, data)}        
        ${this.jsonViewer(jsonElem, JSON.parse(data.dynamic_data))}
        'tester notes:'${data.tester_notes}
      `;
      //${this.kpiCardSomeElementsMain(elem, data)}
    }
    cardSomeElementsRepititiveObjects(elem, data) {
      //console.log('cardSomeElementsRepititiveObjects', 'elem', elem, 'data', data)
      data = this.getDataFromRoot(elem, data);
      //console.log('cardSomeElementsRepititiveObjects >> getDataFromRoot', 'elem', elem, 'data', data)
      return html`
        ${Array.isArray(data) && data.length > 0
          ? html`
              ${data.map(
                (d) => html` ${this.kpiCardSomeElementsMain(elem, d)} `
              )}
            `
          : nothing}
      `;
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

    get dialogEl() {
      return this.shadowRoot.querySelector("div#dialog-frame");
    }
    get iframeEl() {
      return this.shadowRoot.querySelector("iframe#my-iframe");
    }
    get videosourceEl() {
      return this.shadowRoot.querySelector("source#video-source");
    }
    //get listMDprocedureUsers() {return this.shadowRoot.querySelector("mwc-select#listMDprocedureUsers")}
    openDialogFrame(e) {
      console.log(e.currentTarget.isvideo);
      this.dialogEl.style.display = "block";
      const { width, height } = this.dialogEl.getBoundingClientRect();
      const marginTop = height / 2;
      const marginLeft = width / 2;
      if (
        e.currentTarget.isvideo === undefined ||
        e.currentTarget.isvideo === false
      ) {
        this.iframeEl.src = e.currentTarget.src + "#toolbar=0";
      }
      if (
        e.currentTarget.isvideo !== undefined &&
        e.currentTarget.isvideo === true
      ) {
        const mimeUrl = e.currentTarget.src.match(/(?<=src=")(.*?)(?=")/)[0];
        this.videosourceEl.src = mimeUrl;
      }

      console.log(" window.innerWidth;",  window.innerWidth);

      this.dialogEl.style.marginTop = `200px`;
      this.dialogEl.style.marginLeft = `316px`;
      if(window.innerWidth < 800) {
        this.dialogEl.style.marginLeft = `100px`;
      }
      this.dialogEl.style.border = "1px solid rgb(36, 192, 235)";
      this.dialogEl.style.width = `${window.innerWidth * 0.65}px`;
      //this.dialogEl.style.display = 'block';
    }

    closeDialogFrame() {
      this.dialogEl.style.display = "none";
    }
    keyPressDialogFrame(e) {
      alert("key");
      if (e.key == "Escape") {
        this.dialogEl.style.display = "none";
      }
      if (e.keyCode == 27) {
        this.dialogEl.style.display = "none";
      }
    }
    /**
     * Stop other videos when playing one video
     * @param {*} v the playing video element
     */
    stopOthers(v) {
      let allVids = this.shadowRoot.querySelectorAll("video");
      allVids.forEach((vid) => {
        if (vid.id != v) {
          vid.pause();
        }
      });
    }
    buttonsOnly(elem, data) {
      //console.log('buttonsOnly', 'elem', elem, 'data', data)
      return html`
        ${
          elem === undefined || elem.title === undefined
            ? nothing
            : html`<span
                style="color: rgb(20, 115, 230);font-size: 30px;margin-top: 10px;font-weight: bold;"
                >${elem.title["label_" + this.lang]}</span
              >`
        }
                <div style="flex-basis: auto; width: auto;">
                  ${this.getButton(elem, data, true)}
                </div>
              </div>
            `;
    }
    kpiCardSomeElementsMain(elem, data) {
      console.log('kpiCardSomeElementsMain', 'elem', elem, 'data', data)
      return html`
        ${elem === undefined || elem.title === undefined
          ? nothing
          : html`<span
              style="color: rgb(20, 115, 230);font-size: 30px;margin-top: 10px;font-weight: bold;"
              >${elem.title["label_" + this.lang]}</span
            >`}
        ${data === undefined
          ? html`${elem.hideNoDataMessage !== undefined &&
            elem.hideNoDataMessage
              ? ""
              : "No columns defined"}`
          : html`
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
              <div
                id="main${elem.add_border !== undefined &&
                elem.add_border == true
                  ? "addborder"
                  : ""}"
                class="layout vertical flex wrap"
                style="${elem.style !== undefined ? elem.style : ""}"
              >
                <div style="flex-basis: auto; width: auto;">
                  ${this.getButton(elem, data, true)}
                </div>
                <ul
                  style="align-items: baseline;"
                  class="column-list${elem.num_columns !== undefined
                    ? elem.num_columns
                    : ""}"
                >
                ${elem.fieldsToDisplay===undefined?nothing:
                html`
                  ${elem.fieldsToDisplay.map(
                    (fld, i) =>
                      html`
                        ${this.fieldsToDiscard(fld) === true
                          ? nothing
                          : html`                              
                              ${fld.as_ppt !== undefined &&
                              (fld.as_ppt === true || fld.as_video === true)
                                ? html`
                                    <mwc-icon-button
                                      icon="fullscreen"
                                      .isvideo=${data.is_video}
                                      .src=${data[fld.name]}
                                      @click=${this.openDialogFrame}
                                      .fld=${fld}
                                    ></mwc-icon-button>
                                    ${data.is_video === undefined ||
                                    data.is_video === false
                                      ? html`
                                          <iframe
                                            src=${data[fld.name]}
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
                            <video id="${
                              data[fld.name]
                            }-${i}" controls slot="cover-photo"
                            @play=${() =>
                              this.stopOthers(`${data[fld.name]}-${i}`)}>
                            <source type="video/mp4" src="${data[fld.name]}">
                            </video>
<!---
                              <video controls type="video/mp4" src=${
                                data[fld.name]
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
                                <span class="cardLabel">${this.fieldLabel(fld)}:</span>
                                <span class="cardValue">                               
                                  <multi-select .label=${this.purpose} .props=${{"readOnly":true, "displayLabel":false}} .activeOptions=${data[fld.name]} .options=${{}}> </multi-select>
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
                                              title="${this.titleLang(fld)}"
                                            >
                                              <div
                                                title="${this.titleLang(fld)}"
                                                class="w3-container w3-blue w3-round-xlarge"
                                                style="width:${data[fld.name]}%"
                                              >
                                                ${fld.name}:
                                                ${data[fld.name] ===
                                                  undefined ||
                                                data[fld.name].length == 0
                                                  ? "0"
                                                  : data[fld.name]}%
                                              </div>
                                            </div>
                                          </div>
                                          <br />
                                        `
                                      : html`
                                          <li>
                                            <span class="cardLabel">
                                              ${this.fieldLabel(fld)}:
                                            </span>
                                            <span class="cardValue">
                                              ${data[fld.name]}
                                              ${fld.fix_value_suffix !==undefined? fld.fix_value_suffix: ""}
                                              ${fld.fix_value2_prefix !==undefined? fld.fix_value2_prefix: ""}
                                              ${fld.name2 !== undefined? data[fld.name2]: ""}
                                              ${fld.fix_value2_suffix !==undefined? fld.fix_value2_suffix: ""}
                                              ${fld.fix_value3_prefix !==undefined? fld.fix_value3_prefix: ""}
                                              ${fld.name3 !== undefined? data[fld.name3]: ""}
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
    fieldLabel(fld) {
      return fld["label_" + this.lang] !== undefined
        ? fld["label_" + this.lang]
        : fld.name;
    }
    dialogs() {
      console.log('DataViews dialogs')
      return html` ${this.credentialsDialog()} ${this.genericFormDialog()}  ${this.reactivateObjectsDialog()}`;
    }

    loadDialogs() {
      console.log('DataViews loadDialogs')
      return html`
        ${this.credentialsDialog()} ${this.genericFormDialog()}
        ${this.reactivateObjectsDialog()}
        ${this.moduleEnvMonitMicroorganismsDialogAdd()}
        ${this.moduleEnvMonitMicroorganismsDialogRemove()}
        ${this.pointTemplate()} ${this.resultTemplate()}
        ${this.investigationTemplate()}
        ${this.filterName == "open"
          ? html`${this.decisionTemplate()}`
          : nothing}
        ${this.decisionTemplate()}
      `;
    }

    kpiCard(elem, data = this.data, isProcManagement) {
      let myDataArr = [];
      if (Array.isArray(data)) {
        myDataArr = data;
      } else {
        myDataArr.push(data);
      }

      //console.log('kpiCard', 'elem', elem, 'data', this.data)
      return html`
              ${
                !data
                  ? nothing
                  : html`
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
                        ${myDataArr.map(
                          (curData) =>
                            html`
                              ${this.loadDialogs()}
                              <div class="card">
                                <sp-card-ext
                                  heading="${elem.title === undefined
                                    ? ""
                                    : elem.title["label_" + this.lang] ===
                                      undefined
                                    ? "-"
                                    : elem.title["label_" + this.lang]}"
                                  subheading="${elem.subtitle === undefined
                                    ? ""
                                    : elem.subtitle["label_" + this.lang] ===
                                      undefined
                                    ? "-"
                                    : elem.subtitle["label_" + this.lang]}"
                                >
                                  <div slot="ribbon"></div>
                                  <div slot="footer">
                                    <div
                                      class="layout horizontal center flex wrap"
                                    >
                                      ${this.getButton(
                                        elem,
                                        curData,
                                        isProcManagement
                                      )}
                                    </div>
                                    ${elem.fieldsToDisplay === undefined
                                      ? nothing
                                      : elem.fieldsToDisplay.map(
                                          (d) =>
                                            html`<li class="cardelement">
                                              ${d["label_" + this.lang]}:
                                              ${curData[
                                                d.field_name
                                              ]}${d.fix_value_suffix !==
                                              undefined
                                                ? d.fix_value_suffix
                                                : ""}
                                              ${d.fix_value2_prefix !==
                                              undefined
                                                ? d.fix_value2_prefix
                                                : ""}${d.name2 !== undefined
                                                ? curData[d.field_name2]
                                                : ""}${d.fix_value2_suffix !==
                                              undefined
                                                ? d.fix_value2_suffix
                                                : ""}
                                              ${d.fix_value3_prefix !==
                                              undefined
                                                ? d.fix_value3_prefix
                                                : ""}${d.name3 !== undefined
                                                ? curData[d.field_name3]
                                                : ""}${d.fix_value3_suffix !==
                                              undefined
                                                ? d.fix_value3_suffix
                                                : ""}
                                            </li>`
                                        )}
                                  </div>
                                </sp-card-ext>
                              </div>
                              <audit-dialog
                                @sign-audit=${this.setAudit}
                                .actionBeingPerformedModel=${this
                                  .actionBeingPerformedModel}
                                .filterName=${this.filterName}
                                .lang=${this.lang}
                                .windowOpenable=${this.windowOpenable}
                                .sopsPassed=${this.sopsPassed}
                                .procInstanceName=${this.procInstanceName}
                                .viewName=${this.viewName}
                                .viewModelFromProcModel=${this
                                  .viewModelFromProcModel}
                                .selectedItems=${this.selectedItems}
                                .config=${this.config}
                              ></audit-dialog>
                            `
                        )}
                      </div>
                    `
              }
              </div>
            `;
    }
    kpiStyleByStringAttribute(elType, elem) {
      let defaultOptions = "";
      if ((elType = "title")) {
        defaultOptions = "width:300px;color:blue;";
      }
      if ((elType = "div")) {
        defaultOptions = "display:flex";
      }
      let chartObj = this.shadowRoot.querySelector(
        elType + "#" + elem.elementName
      );
      let chartOptions = {};
      if (elem.style === undefined) {
        return defaultOptions; //"color:red;"
      } else {
        return elem.style;
      }
      return;
    }
    kpiChartFran(elem, data) {
      if (elem===undefined){return html``}
      if (elem.hideNoDataMessage!==undefined&&elem.hideNoDataMessage===true&&data===undefined){return html``}
      if (data===undefined&&this.data!==undefined){data=this.data}

      console.log('kpiChartFran', 'elem', elem, 'data', data)
      return html`
        ${elem.display_chart !== true
          ? nothing
          : html`
              ${this.chartStyle(elem.chart_name)}
              <google-chart
                id="${elem.chart_name}"
                title="${elem.chart_title["label_" + this.lang]}"
                type="${elem.chart_type}"
                .data="${this.getChartData(elem, data)}"
                .options="${this.getChartOptions(elem)}"
              ></google-chart>
            `}
      `;
    }
    chartStyle(chartName) {
      let chartObj = this.shadowRoot.querySelector("google-chart#" + chartName);
      if (chartObj !== undefined && chartObj !== null) {
        chartObj.style.setProperty("width", "1600px");
      }
      console.log("chartStyle", "chartName", chartName, chartObj);
    }

    addNumericValue(rule, value) {
      if (rule == undefined) {
        return true;
      }
      if (value == undefined) {
        return false;
      }
      if (rule.min_allowed != undefined) {
        if (value <= rule.min_allowed) {
          return false;
        }
      }
      if (rule.min_allowed_included < undefined) {
        if (value < rule.min_allowed_included) {
          return false;
        }
      }
      if (rule.max_allowed != undefined) {
        if (value >= rule.max_allowed) {
          return false;
        }
      }
      if (rule.max_allowed_included > undefined) {
        if (value > rule.max_allowed_included) {
          return false;
        }
      }
      if (rule.value != undefined) {
        if (rule.value == value) {
          return false;
        }
      }
      return true;
    }
    getChartData(elem, data) {
      console.log('getChartData', elem, 'data', data, 'this.data', this.data, 'chartData')
      let chartData = [];

      if (elem.elementName === "cdatatable") {
        let data = [
          [
            "Day",
            "Guardians of the Galaxy",
            "The Avengers",
            "Transformers: Age of Extinction",
          ],
          [1, 37.8, 80.8, 41.8],
          [2, 30.9, 69.5, 32.4],
          [3, 25.4, 57, 25.7],
          [4, 11.7, 18.8, 10.5],
          [5, 11.9, 17.6, 10.4],
          [6, 8.8, 13.6, 7.7],
          [7, 7.6, 12.3, 9.6],
          [8, 12.3, 29.2, 10.6],
          [9, 16.9, 42.9, 14.8],
          [10, 12.8, 30.9, 11.6],
          [11, 5.3, 7.9, 4.7],
          [12, 6.6, 8.4, 5.2],
          [13, 4.8, 6.3, 3.6],
          [14, 4.2, 6.2, 3.4],
        ];
        return data;
      }
      if (data===undefined&&this.data!==undefined){data=this.data}
      //data = this.getDataFromRoot(elem, data);
      if (data === undefined && (elem.chart_name===undefined||data[elem.chart_name] === undefined)) {
        if (this.selectedItem !== undefined) {
          data = this.selectedItem;
        } else {
          if (this.selectedItemInView !== undefined) {
            data = this.selectedItemInView;
          }
        }
      }
      //chartData = [[elem.label_item, elem.label_value]];

      if (data !== undefined && data[elem.chart_name] !== undefined) {
        let dataForChart = data[elem.chart_name];

        let seriesArr = [];
        if (Array.isArray(elem.counter_field_name)) {
          seriesArr = elem.counter_field_name;
        } else {
          seriesArr.push(elem.counter_field_name);
        }

        let curchtHeader = [];
        curchtHeader.push(elem.label_item);
        for (let iSerie = 0; iSerie < seriesArr.length; iSerie++) {
          curchtHeader.push(seriesArr[iSerie]);
        }
        chartData.push(curchtHeader);
        for (let iData = 0; iData < dataForChart.length; iData++) {
          if (!elem.grouper_exclude_items.includes(dataForChart[iData][elem.grouper_field_name])) {
            for (let iSerie = 0; iSerie < seriesArr.length; iSerie) {
              if (
                this.addNumericValue(
                  elem.counterLimits,
                  dataForChart[iData][seriesArr[iSerie]]
                )
              ) {
                let curchtval = [];
                curchtval.push(
                  this.labelPossibleReplacement(
                    elem,
                    dataForChart[iData][elem.grouper_field_name]
                  )
                );

                for (let iSerie = 0; iSerie < seriesArr.length; iSerie++) {
                  curchtval.push(dataForChart[iData][seriesArr[iSerie]]); // Add each value from seriesArr as a column
                }
                chartData.push(curchtval);
              }
            }
          } // iSerie
        } // iData
      }
      //console.log('getChartData', 'chartData', chartData)
      return chartData;
    }
    labelPossibleReplacement(elem, labelValue) {
      if (elem.label_values_replacement !== undefined) {
        let fld = elem.label_values_replacement[labelValue];
        if (fld !== undefined) {
          return fld["label_" + this.lang];
        }
        //console.log('labelPossibleReplacement', labelValue, 'fld', fld)
      }
      return labelValue;
    }
    getChartOptions(elem) {
      let defaultChartOptions = {
        width: "300px",
        backgroundColor: "transparent",
        is3D: true,
      };
      let chartOptions = {};
      if (elem.chart_title !== undefined) {
        chartOptions.title = elem.chart_title["label_" + this.lang];
      }
      if (elem.chartStyle === undefined) {
        Object.entries(defaultChartOptions).map(([key, val]) => {
          //console.log(key, val)
          chartOptions[key] = val;
        });
      } else {
        Object.entries(elem.chartStyle).map(([key, val]) => {
          //console.log(key, val)
          chartOptions[key] = val;
        });
      }
      return chartOptions;
    }

    kpiCharts(elem) {
      return html`
        <datamining-google-chart-ext
          id="chart1"
          @redrawed=${(e) =>
            this.dispatchEvent(
              new CustomEvent("chart-images", {
                detail: { imgUri: e.target.imageURI },
              })
            )}
          style="margin: 5px 5px 30px 8px"
          type="line"
          options='{"height": ${this.chartH}, "width": ${this.chartW}}'
        ></datamining-google-chart-ext>
        <datamining-google-chart-ext
          id="chart2"
          @redrawed=${(e) =>
            this.dispatchEvent(
              new CustomEvent("chart-images", {
                detail: { imgUri: e.target.imageURI },
              })
            )}
          style="margin: 5px 5px 30px 8px"
          type="line"
          options='{"height": ${this.chartH}, "width": ${this.chartW}}'
        ></datamining-google-chart-ext>
      `;
    }

    EnvMonAirSampleBrowser() {
      if (this.data.sampleFieldToRetrieve === undefined) return html``;
      let header = `Report for the `;
      header += `sample ${this.data.sampleFieldToRetrieve.sample_id}`;
      return html`${this.data.sampleFieldToRetrieve
        ? html`
            <sp-card-ext
              heading="Report for the sample"
              subheading="${this.data.sampleFieldToRetrieve.sample_id}"
            >
              <div slot="footer">
                ${this.data.sampleFieldsToDisplay.map(
                  (d) => html`<li>${d.field_name}: ${d.field_value}</li>`
                )}
              </div>
            </sp-card-ext>
            <sp-card-ext heading="Stages" nonSubHeading>
              <div slot="footer" class="layout vertical">
                ${this.data.stages.map(
                  (d) =>
                    html`
                      ${this.stageTitle(d.current_stage)}
                      ${this.stageTimingCapture(d)}
                      <sp-card-ext
                        heading="${d.current_stage}"
                        ?nonSubHeading=${!d.started_on}
                        subheading="${d.started_on}${d.ended_on &&
                        ` >> ${d.ended_on}`}"
                      >
                        <div slot="footer">
                          ${d.current_stage == "Sampling"
                            ? html`
                                ${d.data.map(
                                  (data) =>
                                    html`<li>
                                      ${data.field_name}: ${data.field_value}
                                    </li>`
                                )}
                              `
                            : html`${d.current_stage == "Incubation"
                                ? html`
                                    ${d.data.map(
                                      (data) =>
                                        html`
                                          <sp-card-ext
                                            heading="Incubation 1"
                                            nonSubHeading
                                          >
                                            <div slot="footer">
                                              ${data.incubation_1.map(
                                                (f) =>
                                                  html`${f.field_name
                                                    ? html`<li>
                                                        ${f.field_name}:
                                                        ${f.field_value}
                                                      </li>`
                                                    : nothing}`
                                              )}
                                            </div>
                                          </sp-card-ext>
                                          <sp-card-ext
                                            heading="Incubation 2"
                                            nonSubHeading
                                          >
                                            <div slot="footer">
                                              ${data.incubation_2.map(
                                                (f) =>
                                                  html`${f.field_name
                                                    ? html`<li>
                                                        ${f.field_name}:
                                                        ${f.field_value}
                                                      </li>`
                                                    : nothing}`
                                              )}
                                            </div>
                                          </sp-card-ext>
                                        `
                                    )}
                                  `
                                : html`${d.current_stage == "PlateReading"
                                    ? html`
                                        ${d.data.map(
                                          (data) =>
                                            html`${data.field_name ==
                                            "raw_value"
                                              ? html`<li>
                                                  Number of Colonies:
                                                  ${data.field_value}
                                                </li>`
                                              : nothing}`
                                        )}
                                      `
                                    : html`${d.current_stage ==
                                      "MicroorganismIdentification"
                                        ? html`
                                            ${d.data.map(
                                              (data) =>
                                                html`${data.field_name ===
                                                  "microorganism_count" ||
                                                data.field_name ===
                                                  "microorganism_list"
                                                  ? html`<li>
                                                      ${data.field_name}:
                                                      ${data.field_value}
                                                    </li>`
                                                  : nothing}`
                                            )}
                                          `
                                        : html`
                                            ${d.data.map(
                                              (data) =>
                                                html`${data.field_name == "name"
                                                  ? html`${data.field_name}:
                                                    ${data.field_value}`
                                                  : nothing}`
                                            )}
                                          `}`}`}`}
                        </div>
                        ${d.current_stage == "Sampling"
                          ? html`<mwc-icon
                              slot="actions"
                              title="Open"
                              placement="bottom-end"
                              ?hidden=${this.data.sampleFieldToRetrieve
                                .current_stage == "END"}
                              @click=${this.openSample}
                              >file_open</mwc-icon
                            >`
                          : nothing}
                      </sp-card-ext>
                    `
                )}
              </div>
            </sp-card-ext>
          `
        : html`Sample ID: ${data.sample_id}`}`;
    }
    EnvMonAirSampleReportTitle() {
      return "Report for the sample " + this.data.buttonActionInfo.objectId;
    }
    EnvMonAirSampleReportContent() {
      let strContent = `<h2>Summary</h2>`;
      this.data.sampleFieldsToDisplay.forEach((d) => {
        strContent += `<li>${d.field_name}: ${d.field_value}</li>`;
      });
      strContent += `<h2>Stages</h2>`;
      this.data.stages.forEach((d) => {
        strContent += `<table border="1" cellpadding="3" style="margin-bottom: 10px; border-collapse: collapse; width: 100%;"><tr><th>${
          d.current_stage
        }<br>${d.started_on}${
          d.ended_on && ` >> ${d.ended_on}`
        }</th></tr><tr><td>`;
        if (d.current_stage == "Sampling") {
          d.data.forEach((data) => {
            strContent += `Sampling Date: ${data.sampling_date}`;
          });
        } else if (d.current_stage == "Incubation") {
          d.data.forEach((data) => {
            strContent += `<table border="1" cellpadding="3" style="border-collapse: collapse; width: 100%;"><tr><th>Incubation 1</th><th>Incubation 2</th></tr><tr>`;
            strContent += `<td>`;
            data.incubation_1.forEach((f) => {
              if (f.field_name) {
                strContent += `<li>${f.field_name}: ${f.field_value}</li>`;
              }
            });
            strContent += `</td><td>`;
            data.incubation_2.forEach((f) => {
              if (f.field_name) {
                strContent += `<li>${f.field_name}: ${f.field_value}</li>`;
              }
            });
            strContent += `</td></tr></table>`;
          });
        } else if (d.current_stage == "PlateReading") {
          d.data.forEach((data) => {
            if (data.field_name == "raw_value") {
              strContent += `Number of Colonies: ${data.field_value}`;
            }
          });
        } else if (d.current_stage == "MicroorganismIdentification") {
          d.data.forEach((data) => {
            if (data.field_name == "microorganism_list") {
              strContent += `Colonies Identified: ${data.field_value}`;
            }
          });
        } else {
          d.data.forEach((data) => {
            strContent += `<li>${data.name}: ${data.items}</li>`;
          });
        }
        strContent += `</td></tr></table>`;
      });
      return strContent;
    }

    EnvMonAirIncubatorBrowser() {
      return html`${this.data.incubatorFieldToRetrieve
        ? html`
            <div class="layout horizontal flex wrap">
              <sp-card-ext
                heading="Report for the incubator"
                subheading="${this.data.incubatorFieldToRetrieve.name}"
              >
                <div slot="footer">
                  ${this.data.incubatorFieldsToDisplay.map(
                    (d) => html`<li>${d.field_name}: ${d.field_value}</li>`
                  )}
                </div>
              </sp-card-ext>
              <google-chart-ext
                id="chart1"
                @redrawed=${(e) =>
                  this.dispatchEvent(
                    new CustomEvent("chart-images", {
                      detail: { imgUri: e.target.imageURI },
                    })
                  )}
                style="margin: 5px 5px 30px 8px"
                type="line"
                options='{"height": ${this.chartH}, "width": ${this.chartW}}'
              ></google-chart-ext>
            </div>
          `
        : nothing}`;
    }

    EnvMonAirBatchBrowser() {
      return html`${this.data.batchFieldToRetrieve
        ? html`
            <div class="layout horizontal flex wrap">
              <sp-card-ext
                heading="Report for the batch"
                subheading="${this.data.batchFieldToRetrieve.name}"
              >
                <div slot="footer">
                  ${this.data.batchFieldsToDisplay.map(
                    (d) => html`<li>${d.field_name}: ${d.field_value}</li>`
                  )}
                </div>
              </sp-card-ext>
              <google-chart-ext
                id="chart1"
                @redrawed=${(e) =>
                  this.dispatchEvent(
                    new CustomEvent("chart-images", {
                      detail: { imgUri: e.target.imageURI },
                    })
                  )}
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
                ${this.data.SAMPLES_ARRAY.map(
                  (d, i) =>
                    html`${d.sample_id}${i < this.data.SAMPLES_ARRAY.length - 1
                      ? ", "
                      : ""}`
                )}
              </div>
            </sp-card-ext>
          `
        : nothing}`;
    }

    EnvMonProductionLotBrowser() {
      return html`${this.data.prodLotFieldToRetrieve
        ? html`
            <div class="layout horizontal flex wrap">
              <sp-card-ext
                heading="Report for the production lot"
                subheading="${this.data.prodLotFieldToRetrieve.name}"
              >
                <div slot="footer">
                  ${this.data.prodLotFieldsToDisplay.map(
                    (d) => html`<li>${d.field_name}: ${d.field_value}</li>`
                  )}
                </div>
              </sp-card-ext>
              <google-chart-ext
                id="chart1"
                @redrawed=${(e) =>
                  this.dispatchEvent(
                    new CustomEvent("chart-images", {
                      detail: { imgUri: e.target.imageURI },
                    })
                  )}
                style="margin: 5px 5px 30px 8px"
                type="line"
                options='{"height": ${this.chartH}, "width": ${this.chartW}}'
              ></google-chart-ext>
              <google-chart-ext
                id="chart2"
                @redrawed=${(e) =>
                  this.dispatchEvent(
                    new CustomEvent("chart-images", {
                      detail: { imgUri: e.target.imageURI },
                    })
                  )}
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
          `
        : nothing}`;
    }

    stageTitle(currentStage) {
      return html` <h1>${currentStage}</h1> `;
    }
    stageTimingCapture(stageData) {
      return html` <h3>${stageData.started_on} --> ${stageData.ended_on}</h3> `;
    }

    EnvMonAirIncubatorReportContent(strContent) {
      if (this.data.incubatorFieldsToDisplay) {
        this.data.incubatorFieldsToDisplay.forEach((d) => {
          strContent += `<li>${d.field_name}: ${d.field_value}</li>`;
        });
        //strContent += this.incubatorChartContent()
      }
      return strContent;
    }
    chartContent() {
      let imgs = ``; // ${this.kpiStyleByStringAttribute("div", undefined)}
      this.chartImgs.forEach((img) => {
        imgs += `<img src="${img}" style="margin-bottom=10px;"><br>`;
      });
      return imgs;
    }
    incubatorContentTitle() {
      return (
        "Report for the incubator " + this.data.incubatorFieldToRetrieve.name
      );
    }

    EnvMonAirBatchReportContent(strContent) {
      if (this.sampleData.batchFieldsToDisplay) {
        this.sampleData.batchFieldsToDisplay.forEach((d) => {
          strContent += `<li>${d.field_name}: ${d.field_value}</li>`;
        });
        strContent += this.chartContent();
        let batches = this.sampleData.SAMPLES_ARRAY.map((d) => d.sample_id);
        strContent += `<table border="1" cellpadding="3" style="margin: 10px auto; border-collapse: collapse; width: 100%;"><tr><th>Batch Content (${
          this.sampleData.NUM_SAMPLES
        } samples)</th></tr><tr><td>${batches.join(", ")}</td></tr></table>`;
      }
      return strContent;
    }

    EnvMonProductionLotReportContent(strContent) {
      if (this.data.prodLotFieldsToDisplay) {
        this.data.prodLotFieldsToDisplay.forEach((d) => {
          strContent += `<li>${d.field_name}: ${d.field_value}</li>`;
        });
        strContent += this.chartContent();
        strContent += `<br><table border="1" cellpadding="3" style="margin-top: 10px; border-collapse: collapse; width: 100%;">`;
        strContent += `<tr><th>Sample ID</th><th>Sampling Date</th><th>Sampling Date End</th><th>Raw Value</th></tr>`;
        this.data.sample.forEach((s) => {
          if (s.spec_code) {
            strContent += `<tr><td>${s.sample_id}</td><td>${
              s.sampling_date
            }</td><td>${s.sampling_date_end}</td><td>${
              s.raw_value ? s.raw_value : ""
            }</td></tr>`;
          }
        });
        strContent += `</table>`;
      }
      return strContent;
    }
    EnvMonProductionLotReportTitle() {
      return (
        "Report for the Production Lot " +
        this.data.prodLotFieldToRetrieve.lot_name
      );
    }

    sampleContent(strContent) {
      if (
        this.data.sampleFieldsToDisplay &&
        this.activeTab.label_en == "Sample"
      ) {
        this.data.sampleFieldsToDisplay.forEach((d) => {
          strContent += `<li>${d.field_name}: ${d.field_value}</li>`;
        });
        strContent += `<h2>Stages</h2>`;
        this.data.stages.forEach((d) => {
          strContent += `<table border="1" cellpadding="3" style="margin-bottom: 10px; border-collapse: collapse; width: 100%;"><tr><th>${
            d.current_stage
          }<br>${d.started_on}${
            d.ended_on && ` >> ${d.ended_on}`
          }</th></tr><tr><td>`;
          if (d.current_stage == "Sampling") {
            d.data.forEach((data) => {
              strContent += `Sampling Date: ${data.sampling_date}`;
            });
          } else if (d.current_stage == "Incubation") {
            d.data.forEach((data) => {
              strContent += `<table border="1" cellpadding="3" style="border-collapse: collapse; width: 100%;"><tr><th>Incubation 1</th><th>Incubation 2</th></tr><tr>`;
              strContent += `<td>`;
              data.incubation_1.forEach((f) => {
                if (f.field_name) {
                  strContent += `<li>${f.field_name}: ${f.field_value}</li>`;
                }
              });
              strContent += `</td><td>`;
              data.incubation_2.forEach((f) => {
                if (f.field_name) {
                  strContent += `<li>${f.field_name}: ${f.field_value}</li>`;
                }
              });
              strContent += `</td></tr></table>`;
            });
          } else if (d.current_stage == "PlateReading") {
            d.data.forEach((data) => {
              if (data.field_name == "raw_value") {
                strContent += `Number of Colonies: ${data.field_value}`;
              }
            });
          } else {
            d.data.forEach((data) => {
              strContent += `<li>${data.name}: ${data.items}</li>`;
            });
          }
          strContent += `</td></tr></table>`;
        });
      }
      return strContent;
    }
    titleLang(colDef) {
      let titleStr = "";
      if (colDef.title !== undefined) {
        return colDef.title["label_" + this.lang];
      } else {
        return colDef.name;
      }
      return titleStr;
    }
    fieldsToDiscard(fld) {
      if (fld.is_translation === undefined || fld.is_translation === false) {
        return false;
      }
      if (fld.is_translation === true && fld.name.endsWith(this.lang)) {
        return false;
      } else {
        return true;
      }
    }
    get audit() {
      return this.shadowRoot.querySelector("audit-dialog");
    }
 
    readOnlyTable(elem, dataArr, isSecondLevel, directData, alternativeTitle, handler, handleResetParentFilter, parentElement, theme, parentData) {
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
      if (!this.dataContainsRequiredProperties(elem, dataArr)) {
        return nothing;
      }

      if (dataArr === undefined || !Array.isArray(dataArr)) {
        return html``;
      } else {
        if(dataArr.length > 0 && dataArr[0].action_name) {
          sessionStorage.setItem('steps', JSON.stringify(dataArr))
        }
      }
      const styles = this.getTableStyles(elem);
      const title = this.addViewTitle(elem, alternativeTitle, isSecondLevel)
      const actionButtons = this.getActionsButtons(elem, dataArr)
      return html`     
        ${styles}   
        <div style="display: flex; flex-direction: row; text-align: center; align-items: baseline;">
          <div style="display: flex; flex-direction: column; text-align: center;">
            ${title}
            ${actionButtons}
            ${elem.columns === undefined
              ? html`${elem.hideNoDataMessage !== undefined &&
                elem.hideNoDataMessage
                  ? ""
                  : "No columns defined"}`
              : html`
                  <table id=${elem.endPointResponseObject} class="styled-table read-only ${tmp}">
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

                                  ${fld["label_" + this.lang]} <span class="resize-handle"></span>
                                </th>
                              `;
                            }
                            return html` <th>${fld["label_" + this.lang]} <span class="resize-handle"></span></th>`;
                          }
                        )}
                        ${elem.row_buttons === undefined
                          ? nothing 
                          : html`
                            <th>
                              ${this.lang === "en" ? "Actions" : "Acciones"} 
                              <span class="resize-handle"></span>
                            </th>
                          `}
                      </tr>
                    </thead>
                    <tbody>
                      <div class="js-context-popup">
                      </div>
                      ${dataArr === undefined || !Array.isArray(dataArr) ? 
                        html `No Data` : 
                        html`
                         
                          ${dataArr.map((p, idx) => {
                            return html`
                              <tr
                              @click=${(event) => {
                                if(handler) {
                                  if(p[elem.children] && p[elem.children].length > 0) {
                                    if (elem.openWhenNoData === undefined || elem.openWhenNoData === false) {
                                      handler(event, p, elem, idx);
                                    }
                                  }
                                }
                                this.handleTableRowClick(event, p, elem)
                              }}
                              @contextmenu=${(event) => this.handleOpenContextMenu(event, p, elem)}
                              class="${selectedIdx === idx ? "selected" : selectedIdx !== undefined ? "hidden" : ""}"  
                              >
                                ${this.getRowsInfo(elem, p, idx, this.lang, parentData, handler)}
                              </tr>
                              ${elem.expandInfoSection!==undefined?html`
                                <table-row-detail id="detail${idx}" .data="${p}" .elem="${elem}">
                                <div slot="details">                                
                                  <!-- Contenido detallado específico para la fila 1 -->
                                </div>
                                </table-row-detail>
                              `:html``}
                            `}
                          )}
                        `}
                    </tbody>
                  </table>
                `}
          </div>
        </div>
      `;
    }
    dragDropBoxes(elem, data){
      import('../DragDropBox/drag-box')
      //console.log('elem', elem)
      return html`
      <drag-box .windowOpenable=${true} .sopsPassed=${true} .lang=${this.lang}
      .procInstanceName="RandD" .desktop=${true} .viewName="rdprojects" .filterName="rdprojects" 
      .model=${elem} ?ready="false"
      .viewModelFromProcModel=${elem} .config=${this.config}></drag-box>      
  
      `
    }
  };
}
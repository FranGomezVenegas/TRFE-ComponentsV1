import { html } from "lit";
import { commonLangConfig } from "@trazit/common-core";
import { GridFunctions } from "../grid_with_buttons/GridFunctions";

import "@material/mwc-list/mwc-list-item";
import "@material/mwc-select";
import "@material/mwc-checkbox";
import "@material/mwc-formfield";
import { DialogsFunctions } from "./DialogsFunctions";
import "../../components/DependencyForm/app/index";
import '../MultiSelect';

export function TrazitTestScriptNewStepDialog(base) {
  return class extends GridFunctions(DialogsFunctions(base)) {
    static get properties() {
      return {};
    }

    constructor() {
      super();
    }
    openTestScriptNewStepDialog(actionModel = this.actionBeingPerformedModel) {
      if (
        actionModel.dialogInfo === undefined ||
        actionModel.dialogInfo.name === undefined ||
        actionModel.dialogInfo.name.toString().toUpperCase() !==
          "TESTSCRIPTNEWSTEPDIALOG"
      ) {
        return false;
      }

      //        if (!actionModel||!actionModel.dialogInfo||!actionModel.dialogInfo.fields){
      //        //alert(false)
      //        return false
      //       }
      // alert(true)
      //this.defaultValue()
      //this.resetFields()
      //    if (this.actionBeingPerformedModel.dialogInfo.gridContent!==undefined&&this.actionBeingPerformedModel.dialogInfo.gridContent===true){
      //     this.getGenericDialogGridItems(this.actionBeingPerformedModel.dialogInfo)
      //     return
      // }
      // if (this.actionBeingPerformedModel.dialogInfo.filesListContent!==undefined&&this.actionBeingPerformedModel.dialogInfo.filesListContent===true){
      //     this.getGenericDialogGridItems(this.actionBeingPerformedModel.dialogInfo)
      //     return
      // }
      return true;
    }

    isFieldDisabled(fld) {
      if (fld.disabled !== undefined && fld.disabled === true) {
        return true;
      }
      return false;
    }
    /** Date Template Dialog part  @open=${this.defaultValue()}*/
    testScriptNewStepFormDialog(actionModel) {
      if (actionModel === undefined) {
        actionModel = this.actionBeingPerformedModel;
        if (actionModel !== undefined) {
          this.area = actionModel.area;
        }
      }
      let rowData={}
      if (this.actionBeingPerformedModel.actionName==="SCRIPT_UPDATE_STEP"){
        rowData=this.selectedItems[0]
      }else{
        rowData={}
      }
      
      // let rowSelectedRowStr=sessionStorage.getItem ('rowSelectedData')
      // if (rowSelectedRowStr!==undefined&& rowSelectedRowStr !== "[object Object]" ){
      //   rowData=JSON.parse(rowSelectedRowStr)
      // }
//      console.log(rowData)
      // @closed=${this.resetFields} this is in use but moved to be executed about to perform the fetchApi
      //     otherwise it is not compatible with actions requiring credentials dialog.
      return html`
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
          @opened=${() => {
            this.defaultValue();
          }}
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
              @click=${() => this.declineDialog()}
            >
              ${commonLangConfig.closeDialogButton["label_" + this.lang]}
            </sp-button>
            <sp-button
              size="xl"
              slot="primaryAction"
              dialogAction="accept"
              @click=${() => this.acceptedTestDialog(actionModel)}
            >
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}
            </sp-button>
          </div>
        </tr-dialog>
      `;
    }
    addTheDynamicElement(fld) {
      if (fld.rule === undefined || this.selectedItemInView === undefined) {
        return;
      }
      let selObj = this.selectedItemInView;
      let curValue = selObj[fld.rule.field];
      if (curValue === undefined) {
        return;
      }
      if (curValue.length === 0) {
        curValue = "*NULL*";
      }
      let matchingEntry = fld.rule.logic.find(
        (entry) => entry.value === curValue
      );

      if (matchingEntry === undefined) {
        if (curValue.length > 0) {
          curValue = "*NOT_NULL*";
        }
        matchingEntry = fld.rule.logic.find(
          (entry) => entry.value === curValue
        );
      }
      if (matchingEntry === undefined) {
        return;
      }

      if (String(matchingEntry.element).toUpperCase() === "TEXT") {
        return html`
          <div class="layout horizontal flex center-center">
            <mwc-textfield
              class="layout flex"
              id="dynamicElement1"
              type="text"
              .value=${fld.default_value ? fld.default_value : ""}
              label="${this.fieldLabel(fld)}"
              ?disabled=${this.isFieldDisabled(fld)}
              @keypress=${(e) =>
                e.keyCode == 13 && this.acceptedTestGenericDialog}
            ></mwc-textfield>
          </div>
        `;
      }
      if (String(matchingEntry.element).toUpperCase() === "LIST") {
        fld.items = [];
        fld.items = JSON.parse(selObj[fld.rule.field]);
        return html`
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
        `;
      }
      return html``;
    }
    get testScriptNewStepDialog() {
      return this.shadowRoot.querySelector("tr-dialog#testScriptNewStepDialog");
    }
    get dateDialog() {
      return this.shadowRoot.querySelector("tr-dialog#dateDialog");
    }
    get dateInput() {
      return this.shadowRoot.querySelector("input#dateInput");
    }
    setNewDate() {
      if (this.dateInput.value) {
        this.dialogAccept(false);
      }
    }
    declineDialog = () => {
      this.fieldsShouldBeReset = true;
      console.log("closedialog");
      sessionStorage.setItem('rowSelectedData', {})
    }
    acceptedTestDialog(actionModel) {
      console.log("Accepted");
      this.fieldsShouldBeReset = true;
      if (this.validationCheck()) {
        this.performActionRequestHavingDialogOrNotForProcess(actionModel);
      } else {
        console.log(
          "Accepted Test Dialog but mandatories pending then action not performed"
        );
        alert("mandatories pending");
      }
    }

    async performActionRequestHavingDialogOrNotForProcess(actionModel) {
      const data = this.getDependencyForm().getFormFields();
      const meta = this.getDependencyForm().getFieldTypes();

      const fieldNames = meta.map((info) => info.name);
      const fieldValues = meta.map((info) => {
        if (
          Object.keys(data).includes(info.name + "_step") &&
          Object.keys(data).includes(info.name + "_object_type") &&
          Object.keys(data).includes(info.name + "_object_posic")
        ) {
          const name = {
            step: data[info.name + "_step"],
            object_type: data[info.name + "_object_type"],
            object_posic: data[info.name + "_object_posic"],
          };
          return `${JSON.stringify(name)}*${info.type}`;
        }
        return `${data[info.name]}*${info.type}`;
      });

      //console.log({ meta, data });
      //console.log(fieldNames.join("|"), fieldValues.join("|"));
      //console.log("uuuuuuuuuuuuuuuuu",{ fieldNames, fieldValues });

      let actionName = actionModel.actionName; //sessionStorage.getItem('actionName');
      let extraParams = "&action=" + this.getDependencyForm().endpoint;
      
      if (actionName == "SCRIPT_UPDATE_STEP") {
        extraParams = extraParams + "&stepId=" + this.selectedItems[0].step_id;
      }
      extraParams = extraParams + "&scriptId=" + this.selectedItem.script_id;
      extraParams = extraParams + "&fieldName=" + fieldNames.join("|");
      extraParams = extraParams + "&fieldValue=" + fieldValues.join("|");
      extraParams = extraParams + "&procInstanceName=" + this.procInstanceName;
      extraParams = extraParams + "&procedureName=" + this.procedureName;
      extraParams = extraParams + "&procedureVersion=" + this.procedureVersion;
      extraParams = extraParams + "&expectedSyntaxis=" + data.expectedSyntaxis;
      extraParams = extraParams + "&expectedNotification=" + data.notification;
      let APIParams = this.getAPICommonParams(actionModel, true);
      let endPointUrl = this.getActionAPIUrl(actionModel);
      if (String(endPointUrl).toUpperCase().includes("ERROR")) {
        alert(endPointUrl);
        return;
      }
      let params =
        this.config.backendUrl +
        endPointUrl +
        "?" +
        new URLSearchParams(APIParams); // + "&" +new URLSearchParams(credDialogArgs);
      
      console.log("add data Params", JSON.stringify(extraParams));

      params = params + extraParams;

      let log = true;
      params = params.replace(/\|/g, "%7C");

      console.log("add data extraParams", JSON.stringify(extraParams));
          await this.fetchApi(params)
            .then((j) => {
              if (j && !j.is_error) {      
                this.actionOutput = j.json();
                this.selectedItem = j.json();
              } else {
                this.actionOutput = j.json();
                this.selectedItem = j.json();
              }
              this.selectSectionView(index, true);

              //this.selectedProcInstanceMainView()
              //if (this.actionOutput!==undefined){console.log("actionOutput", this.actionOutput);}
            })
            .then((j) => {
              let mye = {};
              if (j.is_error !== undefined && j.is_error === true) {
                //        mye = { is_error: true, message_en: "Performed with success", message_es: "Ejecutado correctamente" }
                this.dispatchEvent(
                  new CustomEvent("error", {
                    detail: { ...j, log: log },
                    bubbles: true,
                    composed: true,
                  })
                );
              } else {
                mye = {
                  is_error: false,
                  message_en: "Performed with success",
                  message_es: "Ejecutado correctamente",
                };
                this.dispatchEvent(
                  new CustomEvent("success", {
                    detail: { ...mye, log: log },
                    bubbles: true,
                    composed: true,
                  })
                );
              }
              return j;
            })
            .catch((e) => {
              if (e.message == "Unexpected end of JSON input") {
                this.dispatchEvent(
                  new CustomEvent("error", {
                    detail: { ...e },
                    bubbles: true,
                    composed: true,
                  })
                );
              } else {
                this.dispatchEvent(
                  new CustomEvent("error", {
                    detail: { ...e, log: log },
                    bubbles: true,
                    composed: true,
                  })
                );
                //this.error(e)
                return e;
              }
            });

      return;
    }

    getDependencyForm() {
      return this.shadowRoot.querySelector("dependency-form");
    }

    validationCheck() {
      const validity = this.getDependencyForm().checkValidity();
      return validity;
    }

    gridActiveItemChanged() {
      alert("Changed");

      // <vaadin-grid id="mainGrid" theme="row-dividers" column-reordering-allowed multi-sort
      // @active-item-changed=${this.gridActiveItemChanged} .items=${this.genericDialogGridItems} .selectedItems="${this.genericDialogGridSelectedItems}"
      // ${gridRowDetailsRenderer(this.detailRenderer)} ${this.setCellListener()}
      // ${this.gridList(actionModel.dialogInfo)}
      // </vaadin-grid>
    }

    defaultValue(e) {
      //alert('open defaultValue')
      // if (this.actionBeingPerformedModel.dialogInfo.gridContent!==undefined&&this.actionBeingPerformedModel.dialogInfo.gridContent===true){
      //     this.getGenericDialogGridItems(this.actionBeingPerformedModel.dialogInfo)
      //     return
      // }
      // if (this.actionBeingPerformedModel.dialogInfo.filesListContent!==undefined&&this.actionBeingPerformedModel.dialogInfo.filesListContent===true){
      //     this.getGenericDialogGridItems(this.actionBeingPerformedModel.dialogInfo)
      //     return
      // }
      if (this.fieldsShouldBeReset === true) {
        this.resetFields();
        this.fieldsShouldBeReset = false;
      }
      let dlgFlds = this.actionBeingPerformedModel.dialogInfo.fields;
      if (dlgFlds === undefined) {
        //alert('The dialog '+this.actionBeingPerformedModel.dialogInfo.name+' has no fields property for adding the fields, please review.')
        return;
      }
      for (let element of dlgFlds) {
        let fldObj = element;
        let keyName = Object.keys(fldObj);

        //if (==null){
        if (
          this[keyName] !== null &&
          this[keyName].defval !== undefined &&
          this[keyName].defval !== null
        ) {
          alert(this[keyName].defval);
        }
        if (
          this[keyName] !== null &&
          fldObj[keyName] !== undefined &&
          fldObj[keyName].default_value !== undefined &&
          fldObj[keyName].default_value !== null
        ) {
          this[keyName].value = fldObj[keyName].default_value;
        }
        if (
          this[keyName] !== null &&
          fldObj[keyName] !== undefined &&
          fldObj[keyName].selObjectPropertyName !== undefined &&
          fldObj[keyName].selObjectPropertyName !== null &&
          this[keyName] !== null
        ) {
          this[keyName].value =
            this.selectedItems[0][fldObj[keyName].selObjectPropertyName];
        }
        if (
          this[keyName] !== null &&
          fldObj[keyName] !== undefined &&
          fldObj[keyName].internalVariableObjName !== undefined &&
          fldObj[keyName].internalVariableObjName !== null &&
          fldObj[keyName].internalVariableObjProperty !== undefined &&
          fldObj[keyName].internalVariableObjProperty !== null
        ) {
          this[keyName].value =
            this[fldObj[keyName].internalVariableObjName][0][
              fldObj[keyName].internalVariableObjProperty
            ];
        }
      }
    }
    resetFields(e) {
      //alert('reset Fields now')
      let dlgFlds = this.actionBeingPerformedModel.dialogInfo.fields;
      if (dlgFlds === undefined) {
        //alert('The dialog '+this.actionBeingPerformedModel.dialogInfo.name+' has no fields property for adding the fields, please review.')
        return;
      }
      for (const element of dlgFlds) {
        let fldObj = element;
        let keyName = Object.keys(fldObj);
        if (this[keyName] !== null) {
          // console.log(keyName[0])
          if (keyName[0].includes("list")) {
            if (!keyName[0].includes("SelectedRow")) {
              this[keyName[0]].value = [];
            }
          } else {
            if (this[keyName] !== undefined && this[keyName[0]] !== undefined) {
              this[keyName[0]].value = "";
            }
          }
        }
      }
    }
    valueSelected(e) {
      return; // The code below is there only for trying to make lists depending on another list, does not work yet
      //alert('ds '+ e.target.id+this[e.target.id].value)

      // let triggeredElem=this.actionBeingPerformedModel.dialogInfo.fields.filter(p => p == e.target.id)

      let cleanParams = {};
      // Object.entries(this.actionBeingPerformedModel.dialogInfo.fields).map(([key, value]) => {
      //   if (value != null || value != undefined) {
      //     cleanParams[key] = value
      //   }
      // })
      // console.log('cleanParams', cleanParams)
      let fld = this.actionBeingPerformedModel.dialogInfo.fields[1].list2; //(([key, value]) =>{
      //cleanParams=value
      //})
      console.log("fld", fld);
      let thisNewList2 = [];
      thisNewList2 = this.listEntries(fld);
      console.log("thisNewList2", thisNewList2);
      //alert(this.actionBeingPerformedModel.dialogInfo.fields[e.target.id].valuesFromMasterData.recalculateObjectOnEntrySelected)
      //console.log(e.targetValue)
    }
    // listEntries(fld){

    scriptStepArguments(fld, data){
      
      this.isProcManagement=true
      //alert("Remember to remove line 510, TrazitTestScriptNewStepDialog")
      this.moduleName=sessionStorage.getItem('selectedProcedureModuleName')
      //this.moduleName="STOCKS"
      //alert(this.moduleName)
      this.getProcMasterData(); 
      let flattenedArray = Object.values(this.masterData).flatMap(group => Object.values(group));
      let findProc = flattenedArray.filter(item => item.module_name === this.moduleName);
      if (findProc.length==0) {return}
      let endPointList=this.listTestEndpointsList()
      const idx =endPointList.findIndex(
        (endpoint) => endpoint.keyName === data.action_name
      );
      if (idx === -1) return [];
      let endpointParams =endPointList[idx]?.arguments_array ?? [];  
      //console.log(endpointParams)    
      return html`
        ${endpointParams.map((curParam, curParamIdx) => html` 
            <span style="color:blue;">${curParam.name}:</span><span style="color:green;">${this.dataArgumentValue(data,curParamIdx)}</span> `
        )}
        
      ` 
    }
    dataArgumentValue(data, index){
      index=(index+1)
      let argFldName=""
      if (index==1){argFldName="argument_0"}else{argFldName="argument_"}
      argFldName=argFldName+index
      
      return data[argFldName]===undefined||data[argFldName].length===0?"N/A": data[argFldName]
    }

    listTestEndpointsList() {
      let userSession = JSON.parse(sessionStorage.getItem("userSession"))
      this.isProcManagement=userSession.isProcManagement
      if (this.isProcManagement===undefined||this.isProcManagement===false){return}

      let fld = {};
      fld.addBlankValueOnTop = true;
      fld.valuesFromMasterData = {
        propertyNameContainer: "modules",
        filterInFirstLevel: true,
        filterPropertyName: "module_name",
        contextVariableName: "moduleName",
        propertyNameContainerLevel2: "module_in_solution_actions",
        propertyKeyName: "endpoint_name",
        propertyKeyValueEn: "endpoint_name",
        propertyKeyValueEs: "endpoint_name",
      };
      //console.log("listEntries", fld);
      let blankEmpty = {
        keyName: "",
        keyValue_en: "",
        keyValue_es: "",
        arguments_array: [],
      };
      let newList = [];
      if (fld === undefined) {
        // return html`<mwc-list-item></mwc-list-item>`
        return [];
      }
      if (
        fld.addBlankValueOnTop !== undefined &&
        fld.addBlankValueOnTop === true
      ) {
        newList.push(blankEmpty);
      }
      if (fld.valuesFromMasterData !== undefined) {
        let MDentriesArr = this.listTestEntriesFromMasterData(
          fld.valuesFromMasterData
        );
        if (MDentriesArr.length > 0) {
          MDentriesArr.forEach((item) => newList.push(item));
        }
      } else if (fld.valuesFromSelectedItem !== undefined) {
        let MDentriesArr = this.listTestEntriesFromSelectedItem(
          fld.valuesFromSelectedItem
        );
        if (MDentriesArr.length > 0) {
          MDentriesArr.forEach((item) => newList.push(item));
        }
      } else {
        fld.items.forEach((item) => newList.push(item));
      }
      if (
        fld.addBlankValueAtBottom !== undefined &&
        fld.addBlankValueAtBottom === true
      ) {
        newList.push(blankEmpty);
      }

      // console.log(newList);
      return newList;
      // return html`
      //     ${newList.map((c, i) =>
      //     html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
      // )}
      // `
    }
    listTestNotificationsList() {
      let userSession = JSON.parse(sessionStorage.getItem("userSession"))
      this.isProcManagement=userSession.isProcManagement
      if (this.isProcManagement===undefined||this.isProcManagement===false){return}

      let fld = {};
      fld.addBlankValueOnTop = true;
      fld.valuesFromMasterData = {
        propertyNameContainer: "modules",
        filterInFirstLevel: true,
        filterPropertyName: "module_name",
        contextVariableName: "moduleName",
        propertyNameContainerLevel2: "module_error_notifications",
        propertyKeyName: "error_code",
        propertyKeyValueEn: "error_code",
        propertyKeyValueEs: "error_code",
      };
      //console.log("listEntries", fld);
      let blankEmpty = {
        keyName: "",
        keyValue_en: "",
        keyValue_es: "",
        arguments_array: [],
      };
      let newList = [];
      if (fld === undefined) {
        // return html`<mwc-list-item></mwc-list-item>`
        return [];
      }
      if (
        fld.addBlankValueOnTop !== undefined &&
        fld.addBlankValueOnTop === true
      ) {
        newList.push(blankEmpty);
      }
      if (fld.valuesFromMasterData !== undefined) {
        let MDentriesArr = this.listTestEntriesFromMasterData(
          fld.valuesFromMasterData
        );
        if (MDentriesArr.length > 0) {
          MDentriesArr.forEach((item) => newList.push(item));
        }
      } else if (fld.valuesFromSelectedItem !== undefined) {
        let MDentriesArr = this.listTestEntriesFromSelectedItem(
          fld.valuesFromSelectedItem
        );
        if (MDentriesArr.length > 0) {
          MDentriesArr.forEach((item) => newList.push(item));
        }
      } else {
        fld.items.forEach((item) => newList.push(item));
      }
      if (
        fld.addBlankValueAtBottom !== undefined &&
        fld.addBlankValueAtBottom === true
      ) {
        newList.push(blankEmpty);
      }

      // console.log(newList);
      return newList;
      // return html`
      //     ${newList.map((c, i) =>
      //     html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
      // )}
      // `
    }

    listEntriesForUom(fld, fldName) {
      console.log("listEntriesForUom");
      let blankEmpty = { keyName: "", keyValue_en: "", keyValue_es: "" };
      let defValue = "";
      let newList = [];
      if (fld === undefined) {
        return html`<mwc-list-item></mwc-list-item>`;
      }
      if (
        fld.addBlankValueOnTop !== undefined &&
        fld.addBlankValueOnTop === true
      ) {
        newList.push(blankEmpty);
      }
      if (fld.the_default_value !== undefined) {
        if (
          fld.the_default_value.default_value !== undefined &&
          fldObj[keyName].default_value !== null
        ) {
          blankEmpty = {
            keyName: fld.the_default_value.default_value,
            keyValue_en: fld.the_default_value.default_value,
            keyValue_es: fld.default_value.default_value,
          };
          newList.push(blankEmpty);
        }
        if (
          fld.the_default_value.selObjectPropertyName !== undefined &&
          fld.the_default_value.selObjectPropertyName !== null
        ) {
          let val = "";
          if (
            this.selectedItems !== undefined &&
            this.selectedItems.length > 0
          ) {
            val =
              this.selectedItems[0][
                fld.the_default_value.selObjectPropertyName
              ];
            const valueArray = val.split("|");
            valueArray.forEach((item) => {
              const blankEmpty = {
                keyName: item,
                keyValue_en: item,
                keyValue_es: item,
              };
              const isDuplicate = newList.some((item) => item.keyName === item);
              if (!isDuplicate) {
                if (
                  this[fldName] !== null &&
                  this[fldName].value.length === 0
                ) {
                  defValue = item;
                  this[fldName].value = item;
                }
                newList.push(blankEmpty);
              }
            });
          }
        }
        if (
          fld.the_default_value.internalVariableObjName !== undefined &&
          fld.the_default_value.internalVariableObjName !== null &&
          fld.internalVariableObjProperty !== undefined &&
          fld.internalVariableObjProperty !== null
        ) {
          let val =
            this[fld.the_default_value.internalVariableObjName][0][
              fld.internalVariableObjProperty
            ];
          blankEmpty = { keyName: val, keyValue_en: val, keyValue_es: val };
          const isDuplicate = newList.some((item) => item.keyName === val);
          if (!isDuplicate) {
            newList.push(blankEmpty);
          }
          //                this[keyName[0]].value=this[fld.internalVariableObjName][0][fld.internalVariableObjProperty]
        }
      }
      if (fld.list_values !== undefined) {
        if (
          fld.list_values.default_value !== undefined &&
          fldObj[keyName].default_value !== null
        ) {
          blankEmpty = {
            keyName: fld.list_values.default_value,
            keyValue_en: fld.list_values.default_value,
            keyValue_es: fld.list_values.default_value,
          };
          newList.push(blankEmpty);
        }
        if (
          fld.list_values.selObjectPropertyName !== undefined &&
          fld.list_values.selObjectPropertyName !== null
        ) {
          let val =
            this.selectedItems[0][fld.list_values.selObjectPropertyName];
          const valueArray = val.split("|");
          valueArray.forEach((item) => {
            const blankEmpty = {
              keyName: item,
              keyValue_en: item,
              keyValue_es: item,
            };
            const isDuplicate = newList.some((item) => item.keyName === item);
            if (!isDuplicate) {
              newList.push(blankEmpty);
            }
          });
        }
        if (
          fld.list_values.internalVariableObjName !== undefined &&
          fld.list_values.internalVariableObjName !== null &&
          fld.internalVariableObjProperty !== undefined &&
          fld.internalVariableObjProperty !== null
        ) {
          let val =
            this[fld.list_values.internalVariableObjName][0][
              fld.internalVariableObjProperty
            ];
          blankEmpty = { keyName: val, keyValue_en: val, keyValue_es: val };
          const isDuplicate = newList.some((item) => item.keyName === val);
          if (!isDuplicate) {
            newList.push(blankEmpty);
          }
        }
      }
      return html`
        ${newList.map(
          (c, i) =>
            html`<mwc-list-item
              value="${c.keyName}"
              defval="${defValue}"
              ?selected=${fld.addBlankValueOnTop !== undefined &&
              fld.addBlankValueOnTop === true &&
              fld.default_value !== undefined
                ? i == 1
                : i == 0}
              >${c["keyValue_" + this.lang]}</mwc-list-item
            >`
        )}
      `;
    }

    getProcMasterData() {
      if (
        this.isProcManagement === undefined ||
        this.isProcManagement !== true
      ) {
        let userSession = JSON.parse(sessionStorage.getItem("userSession"));
        console.log(
          "userSession.procedures_list.procedures",
          userSession.procedures_list.procedures
        );
        let findProc = [];
        if (this.area !== undefined) {
          findProc = userSession.procedures_list.procedures.filter(
            (m) => m.procInstanceName == this.area
          );
        } else {
          findProc = userSession.procedures_list.procedures.filter(
            (m) => m.procInstanceName == this.procInstanceName
          );
        }
        // if (!this.config.local) {
        //   if (findProc.length) {
        //     ProceduresModel[this.procName] = findProc[0].procModel
        //   }
        // }
        //        this.procInstanceModel=ProceduresModel[this.procName]
        if (
          findProc !== undefined &&
          findProc.length > 0 &&
          findProc[0].master_data !== undefined
        ) {
          this.masterData = findProc[0].master_data;
          console.log("master data", this.masterData);
        }
      } else {
        let userSession = JSON.parse(sessionStorage.getItem("userSession"));
        this.masterData = userSession.proc_management_masterdata;
      }
    }

    listTestEntriesFromMasterData(fldMDDef) {
      this.isProcManagement=true
      this.getProcMasterData();
      return this.buildTestFrontListFromData(fldMDDef, this.masterData);
    }

    listTestEntriesFromSelectedItem(fldMDDef) {
      let data = [];

      if (
        fldMDDef !== null &&
        fldMDDef.defval !== undefined &&
        fldMDDef.defval !== null
      ) {
        alert(fldMDDef.defval);
      }
      if (
        fldMDDef !== null &&
        fldMDDef !== undefined &&
        fldMDDef.default_value !== undefined &&
        fldMDDef.default_value !== null
      ) {
        data = fldMDDef.default_value;
      }
      if (
        fldMDDef !== null &&
        fldMDDef !== undefined &&
        fldMDDef.selObjectPropertyName !== undefined &&
        fldMDDef.selObjectPropertyName !== null &&
        fldMDDef !== null
      ) {
        data = this.selectedItems[0][fldMDDef.selObjectPropertyName];
      }
      if (
        fldMDDef !== null &&
        fldMDDef !== undefined &&
        fldMDDef.internalVariableObjName !== undefined &&
        fldMDDef.internalVariableObjName !== null &&
        fldMDDef.internalVariableObjProperty !== undefined &&
        fldMDDef.internalVariableObjProperty !== null
      ) {
        data =
          this[fldMDDef.internalVariableObjName][0][
            fldMDDef.internalVariableObjProperty
          ];
      }
      if (
        fldMDDef !== null &&
        fldMDDef !== undefined &&
        fldMDDef.internalVariableSingleObjName !== undefined &&
        fldMDDef.internalVariableSingleObjName !== null &&
        fldMDDef.internalVariableSingleObjProperty !== undefined &&
        fldMDDef.internalVariableSingleObjProperty !== null
      ) {
        data =
          this[fldMDDef.internalVariableSingleObjName][
            fldMDDef.internalVariableSingleObjProperty
          ];
      }

      let entries = [];
      if (data !== undefined) {
        data.forEach((item) => {
          console.log(
            "item",
            item,
            "fldMDDef.propertyNameContainer.propertyKeyName",
            fldMDDef.propertyKeyName
          );
          let blankEmpty = { keyName: "", keyValue_en: "", keyValue_es: "" };
          blankEmpty.keyName = item[fldMDDef.propertyKeyName];

          let valEn = "";
          fldMDDef.propertyKeyValueEn.forEach((item2) => {
            if (valEn.length > 0) {
              valEn = valEn + "-";
            }
            valEn = valEn + item[item2];
          });
          blankEmpty.keyValue_en = valEn;
          let valEs = "";
          fldMDDef.propertyKeyValueEn.forEach((item2) => {
            if (valEs.length > 0) {
              valEs = valEs + "-";
            }
            valEs = valEs + item[item2];
          });
          blankEmpty.keyValue_es = valEs;
          console.log("blankEmpty", blankEmpty);
          entries.push(blankEmpty);
        });
      }
      return entries;
      //return this.buildTestFrontListFromData(fldMDDef, this.selectedProcedureInstance)
    }

    buildTestFrontListFromData(fldMDDef, data) {
      if (data === undefined) {
        return [];
      }

      if (fldMDDef==undefined&&(
        this.actionBeingPerformedModel.dialogInfo === undefined ||
        this.actionBeingPerformedModel.dialogInfo.name === undefined ||
        this.actionBeingPerformedModel.dialogInfo.name.toString().toUpperCase() !== "TESTSCRIPTNEWSTEPDIALOG")
      ) {
        return false;
      }
      let userSession = JSON.parse(sessionStorage.getItem("userSession"))
      this.isProcManagement=userSession.isProcManagement
      if (this.isProcManagement===undefined||this.isProcManagement===false){return}
      //console.log("masterData", data);
      //console.log("actionBeingPerformedModel", this.actionBeingPerformedModel);
      let entries = [];

      if (data[fldMDDef.propertyNameContainer] === undefined) {
        alert('Property ' +fldMDDef.propertyNameContainer +' not found in Master Data');
        return entries;
      }
      if (
        fldMDDef.filterInFirstLevel === undefined ||
        fldMDDef.filterInFirstLevel !== true
      ) {
        data[fldMDDef.propertyNameContainer].forEach((item) => {
          // console.log('item', item, 'fldMDDef.propertyNameContainer.propertyKeyName', fldMDDef.propertyKeyName)
          let blankEmpty = {
            keyName: "",
            keyValue_en: "",
            keyValue_es: "",
            arguments_array: [],
          };
          blankEmpty.keyName = item[fldMDDef.propertyKeyName];
          blankEmpty.keyValue_en = item[fldMDDef.propertyKeyValueEn]!==undefined? item[fldMDDef.propertyKeyValueEn]: item[fldMDDef.propertyKeyName];
          blankEmpty.keyValue_es = item[fldMDDef.propertyKeyValueEs]!==undefined? item[fldMDDef.propertyKeyValueEs]: item[fldMDDef.propertyKeyName];
          blankEmpty.arguments_array = item.arguments_array;
          //console.log('blankEmpty', blankEmpty)
          entries.push(blankEmpty);
        });
      } else {
        // if ((fldMDDef.elementName===undefined||fldMDDef.elementName===null)&&
        //     (fldMDDef.propertyNameContainerLevelfixValue===undefined||fldMDDef.propertyNameContainerLevelfixValue===null)
        //     (fldMDDef.contextVariableName===undefined||fldMDDef.contextVariableName===null)
        //     ((fldMDDef.internalVariableSimpleObjName===undefined||fldMDDef.internalVariableSimpleObjName===null) || (fldMDDef.internalVariableSimpleObjProperty===undefined||fldMDDef.internalVariableSimpleObjProperty===null))
        //     ){
        //     alert('Property elementName or propertyNameContainerLevelfixValue is mandatory when filterInFirstLevel=true. Review model definition')
        //     return entries
        // }
        let filterValue = undefined;
        if (fldMDDef.propertyNameContainerLevelfixValue !== undefined) {
          filterValue = fldMDDef.propertyNameContainerLevelfixValue;
        } else if (fldMDDef.elementName !== undefined) {
          filterValue = this[fldMDDef.elementName].value;
        } else if (fldMDDef.contextVariableName !== undefined) {
          filterValue = this[fldMDDef.contextVariableName];
        } else if (
          fldMDDef.internalVariableSimpleObjName !== undefined &&
          fldMDDef.internalVariableSimpleObjProperty !== undefined
        ) {
          filterValue =
            this[fldMDDef.internalVariableSimpleObjName][
              fldMDDef.internalVariableSimpleObjProperty
            ];
        }
        let filterPropertyName = "name";
        if (fldMDDef.filterPropertyName !== undefined) {
          filterPropertyName = fldMDDef.filterPropertyName;
        }
        if (filterValue === undefined) {
          return entries;
        }
        let result = data[fldMDDef.propertyNameContainer].find(
          (item) => item[filterPropertyName] === filterValue
        );
        if (result === undefined) {
          return entries;
        }
        //alert(filterValue)
        // if (fldMDDef.propertyNameContainerLevel2fixValue!==undefined&&fldMDDef.propertyNameContainerLevel3){
        //     entries=getListInLevel3(fldMDDef, result[fldMDDef.propertyNameContainerLevel2])
        //     return entries
        // }
        result[fldMDDef.propertyNameContainerLevel2].forEach((item) => {
          // console.log('item', item, 'fldMDDef.propertyNameContainer.propertyKeyName', fldMDDef.propertyKeyName)
          let blankEmpty = {
            keyName: "",
            keyValue_en: "",
            keyValue_es: "",
            arguments_array: [],
          };
          blankEmpty.keyName = item[fldMDDef.propertyKeyName];
          blankEmpty.keyValue_en = item[fldMDDef.propertyKeyValueEn]!==undefined? item[fldMDDef.propertyKeyValueEn]: item[fldMDDef.propertyKeyName];
          blankEmpty.keyValue_es = item[fldMDDef.propertyKeyValueEs]!==undefined? item[fldMDDef.propertyKeyValueEs]: item[fldMDDef.propertyKeyName];
          blankEmpty.arguments_array = item.arguments_array;
          entries.push(blankEmpty);
        });
        //console.log("entries at end", entries);
        return entries;
      }
      //let blankEmpty={keyName:"1", keyValue_en:"2", keyValue_es:"3"}
      //entries.push(blankEmpty)
      return entries;
    }
    getListInLevel3(fldMDDef, level2Arr) {
      let level3Arr = level2Arr.filter(
        (p) =>
          p[propertyNameContainerLevel2PropertyKeyName] ==
          fldMDDef.propertyNameContainerLevel2fixValue
      );
      level3Arr[fldMDDef.propertyNameContainerLevel3].forEach((item) => {
        console.log(
          "item",
          item,
          "fldMDDef.propertyNameContainer.propertyKeyName",
          fldMDDef.propertyNameContainerLevel2PropertyKeyName
        );
        let blankEmpty = { keyName: "", keyValue_en: "", keyValue_es: "" };
        blankEmpty.keyName = item[fldMDDef.propertyKeyName];
        blankEmpty.keyValue_en = item[fldMDDef.propertyKeyValueEn];
        blankEmpty.keyValue_es = item[fldMDDef.propertyKeyValueEs];
        console.log("blankEmpty", blankEmpty);
        entries.push(blankEmpty);
      });
    }
    fldDisabled() {
      return false;
    }

    fieldLabel(fld) {
      let fldLbl = fld["label_" + this.lang];
      if (fld.optional === undefined || fld.optional === false) {
        fldLbl = "* " + fldLbl;
      }
      return fldLbl;
    }

    get text1() {
      return this.shadowRoot.querySelector("mwc-textfield#text1");
    }
    get text2() {
      return this.shadowRoot.querySelector("mwc-textfield#text2");
    }
    get text3() {
      return this.shadowRoot.querySelector("mwc-textfield#text3");
    }
    get text4() {
      return this.shadowRoot.querySelector("mwc-textfield#text4");
    }
    get text5() {
      return this.shadowRoot.querySelector("mwc-textfield#text5");
    }
    get text6() {
      return this.shadowRoot.querySelector("mwc-textfield#text6");
    }
    get text7() {
      return this.shadowRoot.querySelector("mwc-textfield#text7");
    }
    get text8() {
      return this.shadowRoot.querySelector("mwc-textfield#text8");
    }
    get text9() {
      return this.shadowRoot.querySelector("mwc-textfield#text9");
    }
    get text10() {
      return this.shadowRoot.querySelector("mwc-textfield#text10");
    }
    get checkbox1() {
      return this.shadowRoot.querySelector("mwc-checkbox#checkbox1");
    }
    get checkbox2() {
      return this.shadowRoot.querySelector("mwc-checkbox#checkbox2");
    }
    get checkbox3() {
      return this.shadowRoot.querySelector("mwc-checkbox#checkbox3");
    }
    get checkbox4() {
      return this.shadowRoot.querySelector("mwc-checkbox#checkbox4");
    }
    get checkbox5() {
      return this.shadowRoot.querySelector("mwc-checkbox#checkbox5");
    }
    get checkbox6() {
      return this.shadowRoot.querySelector("mwc-checkbox#checkbox6");
    }
    get checkbox7() {
      return this.shadowRoot.querySelector("mwc-checkbox#checkbox7");
    }
    get checkbox8() {
      return this.shadowRoot.querySelector("mwc-checkbox#checkbox8");
    }
    get checkbox9() {
      return this.shadowRoot.querySelector("mwc-checkbox#checkbox9");
    }
    get checkbox10() {
      return this.shadowRoot.querySelector("mwc-checkbox#checkbox10");
    }
    get date1() {
      return this.shadowRoot.querySelector("mwc-textfield#date1");
    }
    get date2() {
      return this.shadowRoot.querySelector("mwc-textfield#date2");
    }
    get date3() {
      return this.shadowRoot.querySelector("mwc-textfield#date3");
    }
    get date4() {
      return this.shadowRoot.querySelector("mwc-textfield#date4");
    }
    get date5() {
      return this.shadowRoot.querySelector("mwc-textfield#date5");
    }
    get date6() {
      return this.shadowRoot.querySelector("mwc-textfield#date6");
    }
    get date7() {
      return this.shadowRoot.querySelector("mwc-textfield#date7");
    }
    get date8() {
      return this.shadowRoot.querySelector("mwc-textfield#date8");
    }
    get date9() {
      return this.shadowRoot.querySelector("mwc-textfield#date9");
    }
    get date10() {
      return this.shadowRoot.querySelector("mwc-textfield#date10");
    }
    get datetime1() {
      return this.shadowRoot.querySelector("input#datetime1");
    }
    get datetime2() {
      return this.shadowRoot.querySelector("input#datetime2");
    }
    get datetime3() {
      return this.shadowRoot.querySelector("input#datetime3");
    }
    get datetime4() {
      return this.shadowRoot.querySelector("input#datetime4");
    }
    get datetime5() {
      return this.shadowRoot.querySelector("input#datetime5");
    }
    get datetime6() {
      return this.shadowRoot.querySelector("input#datetime6");
    }
    get datetime7() {
      return this.shadowRoot.querySelector("input#datetime7");
    }
    get datetime8() {
      return this.shadowRoot.querySelector("input#datetime8");
    }
    get datetime9() {
      return this.shadowRoot.querySelector("input#datetime9");
    }
    get datetime10() {
      return this.shadowRoot.querySelector("input#datetime10");
    }

    get daterange1dateStart() {
      return this.shadowRoot.querySelector("mwc-textfield#daterange1dateStart");
    }
    get daterange1dateEnd() {
      return this.shadowRoot.querySelector("mwc-textfield#daterange1dateEnd");
    }
    get daterange2dateStart() {
      return this.shadowRoot.querySelector("mwc-textfield#daterange2dateStart");
    }
    get daterange2dateEnd() {
      return this.shadowRoot.querySelector("mwc-textfield#daterange2dateEnd");
    }
    get daterange3dateStart() {
      return this.shadowRoot.querySelector("mwc-textfield#daterange3dateStart");
    }
    get daterange3dateEnd() {
      return this.shadowRoot.querySelector("mwc-textfield#daterange3dateEnd");
    }
    get daterange4dateStart() {
      return this.shadowRoot.querySelector("mwc-textfield#daterange4dateStart");
    }
    get daterange4dateEnd() {
      return this.shadowRoot.querySelector("mwc-textfield#daterange4dateEnd");
    }
    get daterange5dateStart() {
      return this.shadowRoot.querySelector("mwc-textfield#daterange5dateStart");
    }
    get daterange5dateEnd() {
      return this.shadowRoot.querySelector("mwc-textfield#daterange5dateEnd");
    }

    get number1() {
      return this.shadowRoot.querySelector("mwc-textfield#number1");
    }
    get number2() {
      return this.shadowRoot.querySelector("mwc-textfield#number2");
    }
    get number3() {
      return this.shadowRoot.querySelector("mwc-textfield#number3");
    }
    get number4() {
      return this.shadowRoot.querySelector("mwc-textfield#number4");
    }
    get number5() {
      return this.shadowRoot.querySelector("mwc-textfield#number5");
    }
    get number6() {
      return this.shadowRoot.querySelector("mwc-textfield#number6");
    }
    get number7() {
      return this.shadowRoot.querySelector("mwc-textfield#number7");
    }
    get number8() {
      return this.shadowRoot.querySelector("mwc-textfield#number8");
    }
    get number9() {
      return this.shadowRoot.querySelector("mwc-textfield#number9");
    }
    get number10() {
      return this.shadowRoot.querySelector("mwc-textfield#number10");
    }

    get list1() {
      return this.shadowRoot.querySelector("mwc-select#list1");
    }
    get list2() {
      return this.shadowRoot.querySelector("mwc-select#list2");
    }
    get list3() {
      return this.shadowRoot.querySelector("mwc-select#list3");
    }
    get list4() {
      return this.shadowRoot.querySelector("mwc-select#list4");
    }
    get list5() {
      return this.shadowRoot.querySelector("mwc-select#list5");
    }
    get list6() {
      return this.shadowRoot.querySelector("mwc-select#list6");
    }
    get list7() {
      return this.shadowRoot.querySelector("mwc-select#list7");
    }
    get list8() {
      return this.shadowRoot.querySelector("mwc-select#list8");
    }
    get list9() {
      return this.shadowRoot.querySelector("mwc-select#list9");
    }
    get list10() {
      return this.shadowRoot.querySelector("mwc-select#list10");
    }

    get list1SelectedRow() {
      return this.shadowRoot.querySelector("mwc-select#list1SelectedRow");
    }
    get list2SelectedRow() {
      return this.shadowRoot.querySelector("mwc-select#list2SelectedRow");
    }
    get list3SelectedRow() {
      return this.shadowRoot.querySelector("mwc-select#list3SelectedRow");
    }

    get listMDprocedureUsers() {
      return this.shadowRoot.querySelector("mwc-select#listMDprocedureUsers");
    }
    get listMDSamplerPersonalAreas() {
      return this.shadowRoot.querySelector(
        "mwc-select#listMDSamplerPersonalAreas"
      );
    }
    get listMDvariablesSet() {
      return this.shadowRoot.querySelector("mwc-select#listMDvariablesSet");
    }
    get listMDvariables() {
      return this.shadowRoot.querySelector("mwc-select#listMDvariables");
    }
    get listSelectedStudyIndividuals() {
      return this.shadowRoot.querySelector(
        "mwc-select#listSelectedStudyIndividuals"
      );
    }
    get listSelectedStudyIndividualSamples() {
      return this.shadowRoot.querySelector(
        "mwc-select#listSelectedStudyIndividualSamples"
      );
    }

    get dynamicElement1() {
      return this.shadowRoot.querySelector("#dynamicElement1");
    }

    setNumberMask(e, fieldDef) {
      if (
        fieldDef.min_allowed !== undefined &&
        typeof fieldDef.min_allowed == "number" &&
        e.target.value < fieldDef.min_allowed
      ) {
        e.target.value = fieldDef.min_allowed;
        this[e.currentTarget.id].value = fieldDef.min_allowed;
        return;
      }
      if (
        fieldDef.max_allowed !== undefined &&
        typeof fieldDef.max_allowed == "number" &&
        e.target.value > fieldDef.max_allowed
      ) {
        e.target.value = fieldDef.max_allowed;
        this[e.currentTarget.id].value = fieldDef.max_allowed;
        return;
      }
      // make sure the decimal length <= max_dp when manual input
      if (fieldDef.max_dp !== undefined) {
        let v = e.target.value.split(".");
        if (v.length > 1 && v[1].length > fieldDef.max_dp) {
          v[1] = v[1].substring(0, fieldDef.max_dp);
          e.target.value = Number(v.join("."));
          this[e.currentTarget.id].value = Number(v.join("."));
        }
      }
    }

    fldDefaultValue(fldDef) {
      let curArgName=""
      //console.log('fldDefaultValue', fldDef)
      if (fldDef.default_value) {
        return fldDef.default_value;
      } else if (
        fldDef.internalVariableSimpleObjName &&
        fldDef.internalVariableSimpleObjProperty
      ) {
        if (
          this[fldDef.internalVariableSimpleObjName] === undefined ||
          this[fldDef.internalVariableSimpleObjName][
            fldDef.internalVariableSimpleObjProperty
          ] === undefined
        ) {
          let msg = "";
          if (
            this[fldDef.internalVariableSimpleObjName][
              fldDef.internalVariableSimpleObjProperty
            ] === undefined
          ) {
            msg =
              "The object " +
              fldDef.internalVariableSimpleObjName +
              " has no one property called " +
              fldDef.internalVariableSimpleObjProperty;
            alert(msg);
          } else {
            msg =
              "there is no object called " +
              fldDef.internalVariableSimpleObjName +
              " in this view";
            alert(msg);
          }
          return "ERROR: " + msg;
        }
        return this[fldDef.internalVariableSimpleObjName][
          fldDef.internalVariableSimpleObjProperty
        ];
      } else if (
        fldDef.internalVariableObjName &&
        fldDef.internalVariableObjProperty
      ) {
        if (
          this[fldDef.internalVariableObjName] === undefined ||
          this[fldDef.internalVariableObjName][0][
            fldDef.internalVariableObjProperty
          ] === undefined
        ) {
          let msg = "";
          if (
            this[fldDef.internalVariableObjName][0][
              fldDef.internalVariableObjProperty
            ] === undefined
          ) {
            msg =
              "The object " +
              fldDef.internalVariableObjName +
              " has no one property called " +
              fldDef.internalVariableObjProperty;
            alert(msg);
            //console.log(msg, this[fldDef.internalVariableObjName][0])
          } else {
            msg =
              "there is no object called " +
              fldDef.internalVariableObjName +
              " in this view";
            alert(msg);
          }
          //    alert('No family selected')
          return "ERROR: " + msg;
        }
        return this[fldDef.internalVariableObjName][0][
          fldDef.internalVariableObjProperty
        ];
      } else if (fldDef.element) {
      } else if (fldDef.defaultValue) {
        if (fldDef.isAdhocField !== undefined && fldDef.isAdhocField === true) {
          curArgName = jsonParam[fldDef.argumentName];
          if (curArgName === undefined) {
            curArgName = "";
          }
          if (curArgName.length > 0) {
            curArgName = curArgName + "|";
          }
          curArgName = curArgName + fldDef.defaultValue;
          if (fldDef.fieldType !== undefined) {
            curArgName = curArgName + "*" + fldDef.fieldType;
          }
          return curArgName;
        } else {
          return fldDef.defaultValue; // get value from default value (i.e incubator)
        }
      } else if (fldDef.selObjectPropertyName) {
        return selObject[fldDef.selObjectPropertyName]; // get value from selected item
      } else if (fldDef.targetValue) {
        return targetValue[fldDef.argumentName]; // get value from target element passed
      } else if (fldDef.fixValue) {
        return fldDef.fixValue;
      } else if (fldDef.contextVariableName) {
        return this[fldDef.contextVariableName];
      } else {
        return "";
      }
    }
  };
}

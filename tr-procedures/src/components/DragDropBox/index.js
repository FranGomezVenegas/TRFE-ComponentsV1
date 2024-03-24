import {LitElement} from 'lit-element';
import {template} from './dragdropbox.template';
import {styles} from './dragdropbox.css';
import { navigator } from "lit-element-router";
import { ButtonsFunctions } from '../Buttons/ButtonsFunctions';
import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';
export class DragDropBox extends DialogsFunctions(ButtonsFunctions(navigator(LitElement))) {

  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      config: { type: Object },
      data: { type: Object },
      viewMode: { type: Number},
      selectedIndex1: { type: String },
      selectedIndex2: { type: Number}
    };
  }

  constructor() {
    super();
    this.config={};
    this.selectedIndex1 = "";
    this.selectedIndex2 = 0;
    this.viewMode = 1;
    this.selectedBox = undefined;
    this.selectedTr = undefined;
    this.dragBoxData = {id: undefined, x:"", y: "", name:"", temperature:"", study:""};
    this.dropBoxData = {id: undefined, x:"", y: "", name:"", temperature:"", study:""};  
    this.dragTrData = {id: undefined, temperature:"", study:""};
    this.data = {
      boxDefinition:{
        cols: 5,
        rows: 3,
        views:[
          ["id", "study"],
          ["id", "temperature"],
        ],
        readOnly: true,
        allow_move_objects: true,
        max_num_objects_per_position: 1,
        datas: [
          {
            id: 1, 
            name: "Sample1",
            description: "Hello",
            study: undefined,
            temperature: "aaa",
            result1: 1,
            result2: 2,
            posX: 2,
            posY: 1,
            stored_on: "2024-01-19"
          },
          {
            id: 2, 
            name: "Sample2",
            description: "Hello2",
            study: "here2",
            temperature: "bbb",
            result1: 1,
            result2: 2,
            posX: 3,
            posY: 2,
            stored_on: "2024-01-17"
          },
          {
            id: 3, 
            name: "Sample3",
            description: "Hello3",
            study: "here13",
            temperature: "ccc",
            result1: 1,
            result2: 2,
            posX: 5,
            posY: 3,
            stored_on: "2024-01-16"
          }        
        ]
      },
      tableData:[
        {id: "1", study:"Study 1", temperature: "10º", "extraField":"demo"},
        {id: "2", study:"Study 2", temperature: "20º", "extraField":"demo"},
        {id: "3", study:"Study 3", temperature: "30º", "extraField":"demo"},
        {id: "4", study:"Study 10", temperature: "40º", "extraField":"demo"}
      ],
      tableDefinition: {
        "type": "readOnlyTable",
        "dragEnable": true,
        "dropEnable": true,
        "dropObjectPropertiesRequired":["id", "study", "temperature"],
        "title": {
          "label_en": "1.1) Roles",
          "label_es": "1.1) Perfiles"
        },
        "theme":"TRAZiT-DefinitionArea",
        "endPointResponseObject": "procedure_roles",
        "columns": [
          {
            "name": "id",
            "label_en": "id",
            "label_es": "id"
          },
          {
            "name": "temperature",
            "label_en": "temperature",
            "label_es": "temperature"
          },
          {
            "name": "study",
            "label_en": "study",
            "label_es": "study"
          }
        ],
        "row_buttons": [
          {
            "actionName": "REMOVE_ROLE",
            "notGetViewData": true,
            "clientMethod": "procMngRequirementsMethod",
            "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
            "selectedItemPropertyName": "selectedItems",
            "requiresDialog": false,
            "certificationException": true,
            "secondaryActionToPerform": {
              "name": "refreshSelProcData"
            },
            "button": {
              "icon": "person_remove",
              "title": {
                "label_en": "Remove role",
                "label_es": "Borrar perfil"
              },
              "requiresGridItemSelected": false
            },
            "endPointParams": [
              {
                "argumentName": "procedureName",
                "contextVariableName": "procedureName"
              },
              {
                "argumentName": "procedureVersion",
                "contextVariableName": "procedureVersion"
              },
              {
                "argumentName": "procInstanceName",
                "contextVariableName": "procInstanceName"
              },
              {
                "argumentName": "roleName",
                "selObjectPropertyName": "role_name"
              }
            ]
          },
          {
            "actionName": "RENAME_ROLE",
            "notGetViewData": true,
            "clientMethod": "procMngRequirementsMethod",
            "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
            "selectedItemPropertyName": "selectedItems",
            "requiresDialog": true,
            "certificationException": true,
            "secondaryActionToPerform": {
              "name": "refreshSelProcData"
            },
            "button": {
              "icon": "manage_accounts",
              "title": {
                "label_en": "Rename role",
                "label_es": "Renombrar perfil"
              },
              "requiresGridItemSelected": false
            },
            "dialogInfo": {
              "name": "genericDialog",
              "fields": [
                {
                  "text1": {
                    "label_en": "New Role Name",
                    "label_es": "Nuevo Nombre Perfil",
                    "selObjectPropertyName": "role_name"
                  }
                }
              ]
            },
            "endPointParams": [
              {
                "argumentName": "procedureName",
                "contextVariableName": "procedureName"
              },
              {
                "argumentName": "procedureVersion",
                "contextVariableName": "procedureVersion"
              },
              {
                "argumentName": "procInstanceName",
                "contextVariableName": "procInstanceName"
              },
              {
                "argumentName": "roleName",
                "selObjectPropertyName": "role_name"
              },
              {
                "argumentName": "newroleName",
                "element": "text1",
                "defaultValue": ""
              }
            ]
          },
          {
            "actionName": "CLONE_ROLE",
            "notGetViewData": true,
            "clientMethod": "procMngRequirementsMethod",
            "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
            "selectedItemPropertyName": "selectedItems",
            "requiresDialog": true,
            "certificationException": true,
            "secondaryActionToPerform": {
              "name": "refreshSelProcData"
            },
            "button": {
              "icon": "file_copy",
              "title": {
                "label_en": "Clone Role",
                "label_es": "Clonar Perfil"
              },
              "requiresGridItemSelected": false
            },
            "dialogInfo": {
              "name": "genericDialog",
              "fields": [
                {
                  "text1": {
                    "label_en": "New Role Name",
                    "label_es": "Nuevo Nombre de Perfil",
                    "selObjectPropertyName": "role_name"
                  }
                }
              ]
            },
            "endPointParams": [
              {
                "argumentName": "procedureName",
                "contextVariableName": "procedureName"
              },
              {
                "argumentName": "procedureVersion",
                "contextVariableName": "procedureVersion"
              },
              {
                "argumentName": "procInstanceName",
                "contextVariableName": "procInstanceName"
              },
              {
                "argumentName": "roleName",
                "selObjectPropertyName": "role_name"
              },
              {
                "argumentName": "newroleName",
                "element": "text1"
              }
            ]
          }
        ],
        "actions": [
          {
            "actionName": "ADD_ROLE",
            "notGetViewData": true,
            "clientMethod": "procMngRequirementsMethod",
            "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
            "selectedItemPropertyName": "selectedItems",
            "requiresDialog": true,
            "certificationException": true,
            "secondaryActionToPerform": {
              "name": "refreshSelProcData"
            },
            "button": {
              "icon": "person_add",
              "title": {
                "label_en": "Assign Role",
                "label_es": "Asignar Perfil"
              },
              "requiresGridItemSelected": false
            },
            "dialogInfo": {
              "name": "genericDialog",
              "dialogWidth": "500px",
              "fields": [
                {
                  "text1": {
                    "label_en": "New Role name",
                    "label_es": "Nuevo Nombre de Perfil"
                  }
                }
              ]
            },
            "endPointParams": [
              {
                "argumentName": "procedureName",
                "contextVariableName": "procedureName"
              },
              {
                "argumentName": "procedureVersion",
                "contextVariableName": "procedureVersion"
              },
              {
                "argumentName": "procInstanceName",
                "contextVariableName": "procInstanceName"
              },
              {
                "argumentName": "roleName",
                "element": "text1",
                "defaultValue": ""
              }
            ]
          }
        ]
      },
      boxContents: [
        {cols: 5, rows: 5},
        {cols: 9, rows: 4},
        {cols: 11, rows: 6}
      ]
    };
    this.dragElement = undefined;
    this.viewBoxMode = 0;
    this.listBoxViewMode = false;
    this.dragTr = false;
    this.dragBackgroundColor = undefined;
    this.dropBackgroundColor = undefined;
    this.dragParentElement = undefined;
    this.viewTable = true;
    this.viewTableBox = true;
  }

  render() {
    return template({
      data: this.data,
      selectedIndex1: this.selectedIndex1,
      selectedIndex2: this.selectedIndex2,
      viewMode: this.viewMode,
      listBoxViewMode: this.listBoxViewMode,
      viewBoxMode: this.viewBoxMode,
      viewTable: this.viewTable,
      viewTableBox: this.viewTableBox,
      setSelectBoxIndex: this._setSelectBoxIndex,
      setViewMode: this._setViewMode,
      dropBox: this._dropBox,
      allowDrop: this._allowDrop,
      dropTableTr: this._dropTableTr,
      allowDropTr: this._allowDropTr,
      dragBox: this._dragBox,
      dragTableTr: this._dragTableTr,
      setShowBoxViewModeList: this._setShowBoxViewModeList,
      setViewBoxMode:this._setViewBoxMode,
      setViewTable: this._setViewTable,
      setViewTableBox: this._setViewTableBox,
      showBoxContent: this._showBoxContent,
    }, this.action);
  }

   _showBoxContent = (data, i) => {
    this.data.boxDefinition.cols = data.cols;
    this.data.boxDefinition.rows = data.rows;
    this.viewTableBox = false;
    
    this.requestUpdate();
  }

  _setViewTableBox = () => {
    this.viewTableBox = !this.viewTableBox;
    this.requestUpdate();
  }

  _setViewTable = () => {
    this.viewTable = !this.viewTable;
    this.requestUpdate();
  }

  _dragTableTr = (e, id, study, temperature) => {
    this.dragTr = true;
    let currentElement = e.target;
    
    while (currentElement && !currentElement.classList.contains('dragdropabletr')) {
      currentElement = currentElement.parentElement;
    };

    this.selectedTr = `<td> ${currentElement.children[0].innerHTML} </td><td> ${currentElement.children[1].innerHTML} </td><td>${currentElement.children[2].innerHTML} </td>`

    let currentID = currentElement.childNodes[1].childNodes[1].textContent;
    currentID -= 1;
    let str = "";
    if(this.viewBoxMode == 0) {
      str =`<div>id: ${this.data.tableData[currentID].id}</div><div> study: ${this.data.tableData[currentID].study}</div>`
    } 
    else {
      str =`<div>id: ${this.data.tableData[currentID].id}</div><div> temperature: ${this.data.tableData[currentID].temperature}</div>`
    }
    this.selectedBox = str;
    this.dragTrData.id = id;
    this.dragTrData.study = study;
    this.dragTrData.temperature =temperature;
  }

  _setViewBoxMode = (mode) => {
    console.log("viewmode", mode);
    this.viewBoxMode = mode;
    this.requestUpdate();
  }

  _setShowBoxViewModeList = () => {
    this.listBoxViewMode = !this.listBoxViewMode;
    this.requestUpdate();
  }

  _allowDrop = (e) => {
    e.preventDefault();
  }

  _dropBox = (e, x, y) => {
    this.dropBoxData.x = x;
    this.dropBoxData.y = y;
    this.data.boxDefinition.datas.map((item, index) => {
      if(item.posX == x && item.posY == y) {
        this.dropBoxData.id = item.id;
        this.dropBoxData.name = item.name;
        this.dropBoxData.temperature = item.temperature;
        this.dropBoxData.study = item.study
      }
    })
    e.preventDefault();
    let currentElement = e.target;
    while (currentElement && !currentElement.classList.contains('box')) {
        currentElement = currentElement.parentElement;
    };
    this.dropBackgroundColor = currentElement.style.backgroundColor;
    console.log("dropbox", this.dropBackgroundColor);
    if(!this.dragTr) {
      this.dragElement.innerHTML =  currentElement.childNodes[1].childNodes[1].innerHTML;
      this.dragParentElement.style.backgroundColor = "";
      if(this.dropBackgroundColor) {
        this.dragParentElement.style.backgroundColor = this.dropBackgroundColor;
      }
      this.actionMethodForDragAndDrop(e, this.action, this.dragBoxData, this.dropBoxData, null, null);
    }
    currentElement.style.backgroundColor = this.dragBackgroundColor;
    if(this.dragTr) {
      currentElement.style.backgroundColor = "rgb(80, 220, 247)";
      this.actionMethodForDragAndDrop(e, this.action, this.dragTrData, this.dropBoxData, null, null);
    }
    currentElement.childNodes[1].childNodes[1].innerHTML = this.selectedBox;
    console.log("dropbox", this.dragBoxData, this.dropBoxData); 
  }

  _allowDropTr = (e) => {
    e.preventDefault();
  }

  _dropTableTr = (e) => {
    e.preventDefault();
    let currentElement = e.target;
    currentElement.parentNode.innerHTML = this.selectedTr;
  }

  _dragBox = (e, x, y) => {
    this.dragBoxData.x = x;
    this.dragBoxData.y = y;
    this.data.boxDefinition.datas.map((item, index) => {
      if(item.posX == x && item.posY == y) {
        this.dragBoxData.id = item.id;
        this.dragBoxData.name = item.name;
        this.dragBoxData.temperature = item.temperature;
        this.dragBoxData.study = item.study
      }
    })
    console.log("asdf", this.dragBoxData);
    this.dragTr = false;
    let currentElement = e.target;
    while (currentElement && !currentElement.classList.contains('box')) {
        currentElement = currentElement.parentElement;
    };
    this.dragParentElement = currentElement;
    this.dragBackgroundColor = currentElement.style.backgroundColor;
    this.dragElement = e.target.childNodes[1];
    this.selectedBox = e.target.childNodes[1].innerHTML;
  }

  _setSelectBoxIndex = (first, second)  => {
    this.selectedIndex1 = first;
    this.selectedIndex2 = second;
    this.requestUpdate();
  }

  _setViewMode = (mode) => {
    this.viewMode = mode;
    this.requestUpdate();
  }
}

window.customElements.define('dragdrop-box', DragDropBox);

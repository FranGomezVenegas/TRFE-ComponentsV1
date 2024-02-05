import {LitElement} from 'lit-element';
import {template} from './dragdroptable.template';
import {styles} from './dragdroptable.css';
import { navigator } from "lit-element-router";
export class DragDropTable extends navigator(LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      data: { type: Object },
      viewMode: { type: Number},
      selectedIndex1: { type: String },
      selectedIndex2: { type: Number}
    };
  }

  constructor() {
    super();
    this.selectedTr = undefined;
    this.data = {
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
      }
  
    };
    this.dragElement = undefined;
    this.dragTr = false;
  }

  render() {
    return template({
      data: this.data,
      dropTableTr: this._dropTableTr,
      allowDropTr: this._allowDropTr,
      dragTableTr: this._dragTableTr,
    });
  }

  _dragTableTr = (e) => {
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
  }

  _allowDropTr = (e) => {
    e.preventDefault();
  }

  _dropTableTr = (e) => {
    e.preventDefault();
    let currentElement = e.target;
    currentElement.parentNode.innerHTML = this.selectedTr;
  }

}

window.customElements.define('dragdrop-table', DragDropTable);

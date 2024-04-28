import {LitElement} from 'lit-element';
import {template} from './dragdroptable.template';
import {styles} from './dragdroptable.css';
import { navigator } from "lit-element-router";
import { ButtonsFunctions} from '../../components/Buttons/ButtonsFunctions';
import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';
import {GridFunctions} from '../grid_with_buttons/GridFunctions';
import { ActionsFunctions } from '../Actions/ActionsFunctions';
//import {DataViews} from '../../components/Views/DataViews';

export class DragDropTable extends ActionsFunctions(GridFunctions(DialogsFunctions(ButtonsFunctions(navigator(LitElement))))) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      data: { type: Object },
      viewModelFromProcModel: { type: Object },
      viewMode: { type: Number},
      selectedIndex1: { type: String },
      selectedIndex2: { type: Number},
      dragTable: {type: Object}
    };
  }

  constructor() {
    super();
    this.selectedTr = undefined;
    this.dragData = undefined;
    this.dragTable={}
    this.viewModelFromProcModel={}
    this.data={}
    this.data2 = {
      "table1":
        [
          {id: "1", study:"Study 1", temperature: "1º", "extraField":"demo"},
          {id: "2", study:"Study 2", temperature: "2º", "extraField":"demo"},
          {id: "3", study:"Study 3", temperature: "3º", "extraField":"demo"},
          {id: "4", study:"Study 4", temperature: "4º", "extraField":"demo"}
        ],
      "table2":
        [
          {id: "10", study2:"Study 10", temperature: "10º", "extraField":"demo"},
          {id: "20", study2:"Study 20", temperature: "20º", "extraField":"demo"},
          {id: "30", study2:"Study 30", temperature: "30º", "extraField":"demo"},
          {id: "40", study2:"Study 40", temperature: "40º", "extraField":"demo"}
        ],
      "table3":        
        [
          {id: "5", study3:"Study 5", temperature: "50º", "extraField":"demo"},
          {id: "6", study3:"Study 6", temperature: "60º", "extraField":"demo"},
          {id: "7", study3:"Study 7", temperature: "70º", "extraField":"demo"},
          {id: "8", study3:"Study 8", temperature: "80º", "extraField":"demo"}
        ]
    }
    this.viewModelFromProcModel2= {
        "type": "dragDropTables",
        "tables":[
          { "dragEnable": true,
            "dropEnable": false,
            "theme":"TRAZiT-DefinitionArea",
            "endPointPropertyArray":["table1"],
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
            ]
          },  
          { "dragEnable": true,
            "dropEnable": true,
            "theme":"TRAZiT-DefinitionArea",
            "endPointPropertyArray":["table2"],
            "dropObjectPropertiesRequired":["id", "study", "temperature"],
            "columns": [
              {
                "name": "id",
                "label_en": "id2",
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
            ]
          }  
        ],
        "dragEnable": [true, true, false],
        "dropEnable": [false, true, true],
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
            "label_en": "id2",
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
  
    
    this.dragElement = undefined;
    this.dragTr = false;
  }

  render() {
    return template({
      definition: this.viewModelFromProcModel.objects,
      dropTableTr: this._dropTableTr,
      allowDropTr: this._allowDropTr,
      dragTableTr: this._dragTableTr,
      unavaiableToDrop: this._unavaiableToDrop
    }, this.data, this.lang);
  }

  _unavaiableToDrop = () => {
    alert("Not available to drop");
  }

  _dragTableTr = (e, dragTable, rowData) => {
    console.log('this.dragData', this.dragData, e)
    //this.data.tableData[ii].splice(index, 1);
    this.dragData = rowData; //this.data.tableData[ii][index];
    this.dragTable=dragTable
    this.requestUpdate();
  }

  _allowDropTr = (e) => {
    e.preventDefault();
  }

  _dropTableTr = (e, dropTable, dropData) => {
    e.preventDefault();
    if (this.dragTable.name===dropTable.name){
      if (this.lang==='en'){
        alert('You cannot drap and drop over the same table, action aborted')
      }else{
        alert('No se puede transferir desde y hasta la misma tabla, acción cancelada')
      }
      return
    }
    if (dropTable.acceptEntriesOnlyFromObjects!==undefined){
      if (!Array.isArray(dropTable.acceptEntriesOnlyFromObjects)) {        
        if (this.lang==='en'){
          alert('The property called acceptEntriesOnlyFromObjects must be an array of strings, for the table '+dropTable.name);
        }else{
          alert('La propiedad llamada acceptEntriesOnlyFromObjects debe ser un array, para la tabla '+dropTable.name)
        }
        return
      }    
      if (!dropTable.acceptEntriesOnlyFromObjects.includes(this.dragTable.name)){
        
        if (this.lang==='en'){
          alert('The table '+dropTable.name+' accept only data from some tables and the table  '+this.dragTable.name+' is not one of those.')
        }else{
          alert('La tabla '+dropTable.name+' sólo accepta datos de ciertas tablas y la tabla '+this.dragTable.name+' no es una de ellas.')
        }
        return
      }      
    }
    if (dropTable.dropEnable===undefined||dropTable.dropEnable===false){
      if (this.lang==='en'){
        alert('Not allowed, the destination table accept no data transfers into')
      }else{
        alert('No permitido, la tabla destino no acepte que se le transfiera contenido')
      }
      return
    }
    if (dropTable.dropAction===undefined){
      if (this.lang==='en'){
        console.log('dropTable', dropTable)
        alert('No drop action defined')
      }else{
        alert('No hay definida acción al soltar')
      }
      return
    }
    if (this.dataIntegrityChecks(dropTable)===false){
      return
    }
    //this.data.tableData[ii].push(this.dragData);
    alert("Success to Drop");
    this.trazitButtonsMethod(e, dropTable.dropAction, true, undefined, undefined, this.dragData, false, undefined, this.dragData, dropData)         
    this.requestUpdate();
  }

  dataIntegrityChecks(dropTable, dropData){ 
    if (dropTable===undefined||dropTable.dataIntegrityCheck===undefined){
      return true
    }
    if (!this.dataIntegrityDragElementMandatoryProps(this.dragTable, dropTable, dropData)){
      return false
    }
    //alert('abort by Fran, remove this!')
    //return false;
    return true; 
  }

  dataIntegrityDragElementMandatoryProps(dragTable, dropTable, dropData){
    if (dropTable.dataIntegrityCheck.dropingEntryRequiredProperties===undefined){
      return true
    }
    for (const property of dropTable.dataIntegrityCheck.dropingEntryRequiredProperties) {
      if (!(property in this.dragData)) {
          alert('The property ' + property + ' is required and not found');
          return false; // Property is missing, return false
      }
    }
    return true; 
  }

}

window.customElements.define('dragdrop-table', DragDropTable);

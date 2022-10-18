import { html, css, nothing } from 'lit';
import { CoreView } from '../../components/core-view';
import { Alignment, justified, Layouts } from '@collaborne/lit-flexbox-literals';
import { commonLangConfig } from '@trazit/common-core';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
import { CommonsDialogTemplate } from '../../CommonsDialogTemplate';
import { GenomaUtilities } from '../GenomaUtilities';
import { GridUtilities} from '../GridUtilities';
import { GenomaActions} from '../GenomaActions';
import { GenomaDialogTemplate} from '../GenomaDialogTemplate';
//import { CommonsClientMethod} from './../../CommonsClientMethod';
let langConfig = {
  "title": {
    "label_en": "Users", 
    "label_es": "Usuarios"
  },
  "fieldText": {
    "lot": {
      "items": [],
      "label_en": "Lot", "label_es": "Lote"
    }
  },
  "gridHeaderStudyUsers": {
    gridColumns:{
      "person": {"label_en": "Person", "label_es": "Persona", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
      "roles": {"label_en": "Roles", "label_es": "Roles", "sort": false, "filter": true, "width": "20%"},
      "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
      "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"}
    },
    buttons:[
      { "actionName": "STUDY_ADD_USER",
        "clientMethod": "newStudyIndividual",
        "selObjectVariableName": "selectedStudyUser", 
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [ 
          { "argumentName": "studyName", "internalVariableObjName":"selectedStudy", "internalVariableObjProperty":"study", "ZZZselObjectPropertyName": "study"},
          { "argumentName": "userName", "element": "listMDprocedureUsers" },
          { "argumentName": "userRole", "element": "list1" }
          // { "argumentName": "fieldsNames", "value": "undefined" },
          // { "argumentName": "fieldsValues", "value": "undefined" }
          //individualsList
        ],
        "button": {
          "z-icdon": "refresh",
          "title": {
            "label_en": "New", "label_es": "Nuevo"
          },
          requiresObjectSelected : false
        },   
        "dialogInfo": {
          "requiresDialog": true,
          "name": "genericFormDialog",
          "fieldText": [
            { "listMDprocedureUsers": { "label_en": "User", "label_es": "Usuario" }},
            { "list1": { "label_en": "Role", "label_es": "Rol",
               "items": [
                 { "keyName": "read-only", "keyValue_en": "Read Only", "keyValue_es": "Solo Lectura" },
                 { "keyName": "edit", "keyValue_en": "Edit", "keyValue_es": "Editar" },
                ]            
              }
            }
          ]
        }
      },
      { "actionName": "STUDY_USER_DEACTIVATE",
        "clientMethod": "buttonActionWithoutDialog",
        "selObjectVariableName": "selectedStudyUser",
        "endPoint": "/modulegenoma/GenomaStudyAPI",
        "endPointParams": [
          { "argumentName": "studyName", "selObjectPropertyName": "study"},
          { "argumentName": "userName", "selObjectPropertyName": "person" },
          { "argumentName": "userRole", "selObjectPropertyName": "roles" }
        ],
        "button": {
          "z-icon": "refresh",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          requiresObjectSelected : true
        },    
      }, 
      { "actionName": "STUDY_USER_ACTIVATE",
        "endPoint": "/modulegenoma/GenomaStudyAPI",  
        "endPointParams": [
          { "argumentName": "studyName", "selObjectPropertyName": "study"},
          { "argumentName": "userName", "selObjectPropertyName": "person" }
          //{ "argumentName": "userRole", "selObjectPropertyName": "roles" }
        ],
        "clientMethod": "openReactivateObjectDialog",
        "selObjectVariableName": "selectedStudyUser",
        "button": {
          "icon": "alarm_add",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          requiresObjectSelected : false
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "reactivateObjectDialog",
          "selObjectVariableName": "selectedStudyUser", 
          "fieldText": {
            "numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
            "objectName": { "label_en": "Person to reactivate", "label_es": "Persona a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"person",
            "eachEntryTextGenerator":[
              {"value": "Name: ", "type":"fix"}, {"value": "person", "type":"field"}, {"value": " (", "type":"fix"}, {"value": "roles", "type":"field"}, {"value": ")", "type":"fix"}  
            ]
          },
          "action": [            
            {
              "actionName": "DEACTIVATED_STUDY_USERS_LAST_N_DAYS",
              "clientMethod": "getDeactivatedObjects",
              "endPoint": "/modulegenoma/GenomaStudyAPIFrontend",  
              "apiParams": [
                { "query": "numDays", "element": "lotNumDays", "defaultValue": 7 },
                { "argumentName": "studyName", "selObjectPropertyName": "study"},
              ]
            }
          ]
        }
      },
    ]
  },
}
let actions = [
]

export class StudyUsers extends GenomaDialogTemplate(GridUtilities(GenomaUtilities(GenomaActions(CommonsDialogTemplate(CoreView))))) {
  static get styles() {
    return [Layouts, Alignment,
      super.styles,
      css`
      @media (max-width: 460px) {
        vaadin-grid {
          font-size: 10px;
        }
        vaadin-grid-cell-content {
          padding: 5px;
        }
      }
      `
    ];
  }

  static get properties() {
    return {
      samplesReload: { type: Boolean },
      selectedSamples: { type: Array },
      selectedAction: { type: Object },
      targetValue: { type: Object },
      procName: { type: String },
      config: { type: Object },

      selectedStudy: { type: Object },
      selectedStudyUser: { type: Array },
    };
  }

  constructor() {
    super()
    this.selectedSamples = []
    this.selectedAction = actions[0]

    this.selectedStudyUser = []
    this.selectedAction = []
  }
  //height="${this.tableHeight(this.selectedStudy.study_users)}px">
  tabView() {
    //console.log('selectedStudy', this.selectedStudy)
    if (this.selectedStudy===undefined){
      return html`hhhh`;
    }else{
      return html`
        <div class="layout horizontal flex wrap">
          ${this.selectedStudy===undefined ? html`
            <h2>Please select one study first</h2>
          `: html`
            <div class="layout flex">
              <h1>${langConfig.title["label_"+this.lang]} ${this.selectedStudy.name}</h1>
              <div class="layout horizontal center flex wrap">
                ${this.getButton(langConfig.actions)}
              </div>
              ${this.getButton(langConfig.gridHeaderStudyUsers.buttons, this.selectedStudyUser)}
              <vaadin-grid id="studyusergrid" theme="row-dividers" column-reordering-allowed multi-sort 
                @active-item-changed=${e=>this.selectedStudyUser=e.detail.value ? [e.detail.value] : []}
                .selectedItems="${this.selectedStudyUser}" .items="${this.selectedStudy.study_users}">              
                ${this.gridListFromGridUtilities(langConfig.gridHeaderStudyUsers, 'studyusergrid', this.selectedStudy.study_users)}                  
              </vaadin-grid>
            </div>
            ${this.genomaDialogsTemplate()} 
            ${this.reactiveObjectTemplate()}
          `}
        </div>
      `;
    }
  }
  get studyusergrid() {
    return this.shadowRoot.querySelector("vaadin-grid#studyusergrid")
  }
  // nextRequest() {
  //   super.nextRequest()
  //   this.reqParams = {
  //     procInstanceName: this.procName,
  //     ...this.reqParams
  //   }
  //   let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
  //   this[action.clientMethod]()
  // }    
  async getProgramList() {
    this.samplesReload = true
    let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl 
      + '?' + new URLSearchParams(this.reqParams)
    await this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        if (this.selectedAction.subAction) {
          this.actionMethod(this.selectedAction.subAction)
          this.programsList = j.programsList
        }
      }
    })
  }
  // genericFormClient(){
  //   this.selectedSamples = []
  //   this.newStudyIndividual.show()
  // }

  // setView() {
  //   this.selectedSamples = []
  //   this.selectedAction = actions[0]
  //   this.actionMethod(this.selectedAction.subAction)
  // }

  // cleanFormFields(){
  //   if (this.text1){this.text1.value=''}
  //   if (this.number1){this.number1.value=''}
  //   //if (this.list1){this.list1.value={}}
  // }
  xjsonParamCommons(selAction, selObject) {
    let jsonParam = {}
    if (selAction.endPointParams===undefined){
      return jsonParam
    }
    //console.log('xjsonParamCommons', selAction)
    if (selAction===undefined){
      selAction=this.selectedAction
    }
    if (selObject===undefined){
      if (selAction.selObjectVariableName===undefined){
        alert("Please add the property selObjectVariableName to your action definition")
        return
      }
      selObject=this[selAction.selObjectVariableName][0]
    }
    let action = selAction
    if (action.endPointParams) {
      action.endPointParams.forEach(p => {
        if (p.argumentName==="studyName") {
          if (this.selectedStudy===undefined||this.selectedStudy.name===undefined){
            alert('No study selected')
            return jsonParam
          }
          jsonParam[p.argumentName] = this.selectedStudy.name
        } else if (p.element) {
          jsonParam[p.argumentName] = this[p.element].value // get value from field input
        } else if (p.defaultValue) {
          jsonParam[p.argumentName] = p.defaultValue // get value from default value (i.e incubator)
        } else if (p.selObjectPropertyName) {
          jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
        } else if (p.targetValue) {
          jsonParam[p.argumentName] = this.targetValue[p.argumentName] // get value from target element passed
        } else {
          jsonParam[p.argumentName] = p.value
        }
        console.log('xjsonParamCommons', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
      })
    }
    if (action.paramFilter) {
      jsonParam[action.paramFilter[this.filterName].query] = action.paramFilter[this.filterName].value
    }
    return jsonParam
  }

  // enterResultList() {
  //   //console.log('enterResultList')
  //     return html`
  //     <mwc-textfield class="layout flex" id="text1" type="text" 
  //     .value=${this.selectedAction.dialogInfo.fieldText.variableName.default_value ? this.selectedAction.dialogInfo.fieldText.variableName.default_value : this[this.selectedAction.selObjectVariableName][0].name} 
  //     label="${this.selectedAction.dialogInfo.fieldText.variableName["label_" + this.lang]}"
  //     disabled
  //     @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
  //     ${this[this.selectedAction.selObjectVariableName][0].type}
  //     ${this[this.selectedAction.selObjectVariableName][0].value}      
  //     `    
  // }
  // valRenderer(result) {
  //   if (result.is_locked) {
  //     return html`
  //       <div style="width: 100%;height: 55px;position: relative; background-color: rgb(255 8 8 / 20%)">
  //         <div style="width: 100%;text-align:center; margin: 0;position: absolute;top: 50%;-ms-transform: translateY(-50%);transform: translateY(-50%);">${result.raw_value}</div>
  //       </div>
  //     `
  //   } else {
  //     if (result.param_type.toUpperCase() == "TEXT" || result.param_type == "qualitative") {
  //       return html`<input class="enterResultVal" type="text" .value=${result.raw_value} 
  //         ?disabled=${this.selectedAction.dialogInfo.readOnly}
  //         @keydown=${e => e.keyCode == 13 && this.setResult(result, e.target)}>`
  //     } else if (result.param_type.toUpperCase().indexOf("LIST") > -1) {
  //       let lEntry = result.list_entry.split("|")
  //       return html`
  //         ${result.param_type.toUpperCase() == "TEXTLIST" ?
  //           html`
  //             <input class="enterResultVal" list="listEntry${result.result_id}" 
  //               .value=${result.raw_value}
  //               @keydown=${e => e.keyCode == 13 && this.setResult(result, e.target)}>
  //             <datalist id="listEntry${result.result_id}">
  //               ${lEntry.map(l =>
  //                 html`<option value="${l}">${l}`
  //               )}
  //             </datalist>
  //           ` :
  //           html`
  //             <select class="enterResultVal" @change=${e => this.setResult(result, e.target)}>
  //               ${lEntry.map(l =>
  //                 html`<option value="${l}" ?selected=${l==result.raw_value}>${l}`
  //               )}
  //             </select>
  //           `
  //         }
  //       `
  //     } else if (result.param_type.toUpperCase() == "REAL") {
  //       let step = result.max_dp ? 1 / Math.pow(10, result.max_dp) : 0.01
  //       let min = result.min_allowed ? result.min_allowed : 0
  //       let max = result.max_allowed && result.max_allowed
  //       return html`
  //         ${this[`${result.param_type+''+result.result_id}`]}
  //         <input class="enterResultVal" id="${result.param_type+''+result.result_id}" 
  //           ?disabled=${this.selectedAction.dialogInfo.readOnly} type="number" 
  //           .step=${step} 
  //           .min=${min}
  //           .max=${max}
  //           .value=${this.adjustValUndetermined(result)} 
  //           @input=${e=>this.setValidVal(e, result)}
  //           @keydown=${e => e.keyCode == 13 && this.setResult(result, e.target)}>
  //       `
  //     } else {
  //       let min = result.min_allowed ? result.min_allowed : 0
  //       let max = result.max_allowed && result.max_allowed
  //       return html`
  //         ${this[`${result.param_type+''+result.result_id}`]}
  //         <input class="enterResultVal" id="${result.param_type+''+result.result_id}" 
  //           ?disabled=${this.selectedAction.dialogInfo.readOnly} type="number" 
  //           .min=${min}
  //           .max=${max}
  //           .value=${this.adjustValUndetermined(result)} 
  //           @input=${e=>this.setValidVal(e, result)}
  //           @keydown=${e => e.keyCode == 13 && this.setResult(result, e.target)}>
  //       `
  //     }
  //   }
  // }

  
}
customElements.define('study-users', StudyUsers);
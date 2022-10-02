import { html, css, LitElement } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts, Alignment } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '../components/core-view';
import '@trazit/tr-dialog/tr-dialog';
import './GenomaProject/project-main';
import './GenomaProject/study-users';
import './GenomaProject/study-individuals';
import './GenomaProject/study-families';
import './GenomaProject/study-samples-set';
import './GenomaProject/study-variable-values';
// import {GenomaUtilities} from './GenomaUtilities';
// import { CommonsDialogTemplate } from './../CommonsDialogTemplate';
// import { commonLangConfig } from '@trazit/common-core';
// import { GenomaActions } from './GenomaActions';
// import { GenomaDialogTemplate} from './GenomaDialogTemplate';

import '../components/Tabs/tab-element';
import {TabFunctions} from '../components/Tabs/TabFunctions';

let tabBtns = {
  "tabToOpenOnViewOpenTabIndex":0,
  "genoma-1": [
    {tabLabel_en: "Project", tabLabel_es: "Proyecto", view: "project-main"},
    {tabLabel_en: "Users", tabLabel_es: "Usuarios", view: "study-users"},
    {tabLabel_en: "Variable Values", tabLabel_es: "Valores de Variables", view: "study-variable-values"},  
    {tabLabel_en: "Individuals", tabLabel_es: "Individuos", view: "study-individuals"},
    {tabLabel_en: "Families", tabLabel_es: "Familias", view: "study-families"},
    {tabLabel_en: "Samples Set", tabLabel_es: "Agrupador Muestras", view: "study-samples-set"}    
  ]
}
let viewQuery = { "actionName": "ALL_ACTIVE_PROJECTS",
  "clientMethod": "getGenomaProjectsList",
  "button": {
    "icon": "refresh",
    "title": {
      "label_en": "Reload", "label_es": "Recargar"
    },
    requiresObjectSelected : false
  }    
}
let actions = [
  { "actionName": "PROJECT_NEW",
  "clientMethod": "newStudyIndividual",
  "endPoint": "/modulegenoma/GenomaProjectAPI",
  "endPointParams": [
    { "argumentName": "projectName", "element": "text1" }
    // { "argumentName": "fieldsNames", "value": "undefined" },
    // { "argumentName": "fieldsValues", "value": "undefined" }
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
      {"text1": { "label_en": "new Project Name", "label_es": "Nombre Nuevo Proyecto" }}
    ]
  }
},

]
// GenomaDialogTemplate(GenomaActions(CommonsDialogTemplate(GenomaUtilities(TabFunctions(CredDialog))))) 
export class GenomaProject extends TabFunctions(LitElement) {
  static get styles() {
    return [
      Layouts, Alignment,
      //super.styles,
      css`
        :host {
          display: block;
        }
        .tabContainer {
          overflow: auto;
        }
        .tabContainer::-webkit-scrollbar {
          display: none;
        }
        .tabContainer > * {
          display: inline-block;
          flex-shrink: 0;
        }
        mwc-button {
          --mdc-typography-button-text-transform: none;
        }
        mwc-icon-button.slide[hidden] {
          visibility: hidden;
        }
        mwc-select[hidden] {
          display: none;
        }
      `
    ];
  }

  static get properties() {
    return {
      model: { type: Object },
      config: { type: Object },
      procName: { type: String },
      viewName: { type: String },
      filterName: { type: String },
      langConfig: { type: Object },
      actions: { type: Array },
      samplesReload: { type: Boolean },
      selectedItems: { type: Array },
      selectedAction: { type: Object },
      prev: { type: Boolean },
      next: { type: Boolean },
      programsList: { type: Array },
      tabView: { type: String },
      windowOpenable: { type: String },
      sopsPassed: { type: Boolean },

      selectedProject: { type: Object },
      selectedStudy: { type: Object },

      MDprocedureUsers:{type:Array},
      MDvariables:{type:Array},
      MDvariablesSet:{type:Array}

    };
  }

  constructor() {
    super()
    this.tabView = "summary"
    this.prev = false
    this.next = false
    this.programsList = []
    this.selectedProject = {}
    this.selectedStudy = {}

    this.selectedItems = []

    this.MDprocedureUsers = []
    this.MDvariables = []
    this.MDvariablesSet = []
  }

  updated(updates) {
    if (updates.has('model')) {
      this.resetView()
    }
  }

  resetView() {
    this.programsList = []
    xczxc
    this.selectedAction

    return

    this.actions = this.model.actions
    this.selectedAction = this.model.actions[0]
    this.actionMethod(this.selectedAction)

    if (tabBtns.tabToOpenOnViewOpenTabIndex!==undefined&&tabBtns.tabToOpenOnViewOpenTabIndex>-1){
      let tbsArr=tabBtns[this.procName]
      let mye={}
      mye.detail=tbsArr[tabBtns.tabToOpenOnViewOpenTabIndex]
      this.tabChanged(mye)
    }
  }
  get projectList() {
    return this.shadowRoot.querySelector("mwc-select#projectList")
  }
  get studyList() {
    return this.shadowRoot.querySelector("mwc-select#studyList")
  }

  render() {
    return html`
      <div class="layout vertical flex">
        <div class="layout horizontal center-center">
        ${this.getButton(actions)}

        <mwc-select outlined id="projectList" label="Project Name" @change=${this.projectChanged} ?hidden=${this.programsList.length<2}>
            ${this.programsList&&this.programsList.map((p,i) => 
              html`<mwc-list-item value="${p.name}" ?selected=${i==0}>${p.name}</mwc-list-item>`
            )}
          </mwc-select>
          ${this.selectedProject&&this.selectedProject.study ?
            html`
              <mwc-select id="studyList" outlined label="Project Name" @change=${this.studyChanged} ?hidden=${this.selectedProject.study.length<2}>
                ${this.selectedProject&&this.selectedProject.study&&this.selectedProject.study.map((p,i) => 
                html`<mwc-list-item value="${p.name}" ?selected=${i==0}>${p.name}</mwc-list-item>`
                )}
              </mwc-select>
            ` : html``
          }
        </div>
        ${this.showTabElement(tabBtns)}
        <project-main .MDprocedureUsers=${this.MDprocedureUsers} .reqParams=${this.reqParams} .procName=${this.procName} .config=${this.config} .lang=${this.lang} .selectedProject=${this.selectedProject} 
          ?hidden=${this.tabView!="project-main"}></project-main>
        <study-users .MDprocedureUsers=${this.MDprocedureUsers} .reqParams=${this.reqParams} .procName=${this.procName} .config=${this.config} .lang=${this.lang} .selectedStudy=${this.selectedStudy}  .selectedProject=${this.selectedProject} 
          ?hidden=${this.tabView!="study-users"}></study-users>
        <study-individuals .reqParams=${this.reqParams} .procName=${this.procName} .config=${this.config} .lang=${this.lang} .selectedStudy=${this.selectedStudy} .selectedProject=${this.selectedProject}  
          ?hidden=${this.tabView!="study-individuals"}
          .MDvariablesSet=${this.MDvariablesSet} .MDvariables=${this.MDvariables}></study-individuals>
        <study-families .reqParams=${this.reqParams} .procName=${this.procName} .config=${this.config} .lang=${this.lang} .selectedStudy=${this.selectedStudy} .selectedProject=${this.selectedProject}  
          ?hidden=${this.tabView!="study-families"}></study-families>
        <study-samples-set .reqParams=${this.reqParams} .procName=${this.procName} .config=${this.config} .lang=${this.lang} .selectedStudy=${this.selectedStudy} .selectedProject=${this.selectedProject}  
          ?hidden=${this.tabView!="study-samples-set"}></study-samples-set>
        <study-variable-values .reqParams=${this.reqParams} .procName=${this.procName} .config=${this.config} .lang=${this.lang} .selectedStudy=${this.selectedStudy} .selectedProject=${this.selectedProject}  
          ?hidden=${this.tabView!="study-variable-values"}></study-variable-values>
          
          
        <core-view .lang=${this.lang} .selectedProgram=${this.selectedStudy} ?hidden=${this.tabView!="core"}></core-view>
        ${this.genomaDialogsTemplate()} 
        ${super.render()}
      </div>
    `
  }

  programChanged(e) {
    let program = this.programsList.filter(p => p.name == e.target.value)
    if (program.length) {
      this.selectedProgram = program[1]
      this.selectedStudy = program[1].study[5]
      this.requestUpdate()
    }
  }

  get tabContainer() {
    return this.shadowRoot.querySelector(".tabContainer")
  }

  tabChanged(e) {
    if (e.detail.view) {
      this.tabView = e.detail.view
    } else {
      this.tabView = "core"
    }
  }

  prevTab() {
    this.tabContainer.scrollLeft = this.tabContainer.scrollLeft - 200
  }

  nextTab() {
    this.tabContainer.scrollLeft = this.tabContainer.scrollLeft + 200
  }

  isScroll() {
    if (this.tabContainer.offsetWidth < this.tabContainer.scrollWidth) {
      this.next = true
    } else {
      this.next = false
    }
  }

  firstUpdated() {
    super.firstUpdated()
    this.tabContainer.addEventListener('scroll', () => {
      if (this.tabContainer.scrollLeft == 0) {
        this.prev = false
      } else {
        this.prev = true
      }
      if (this.tabContainer.offsetWidth + this.tabContainer.scrollLeft == this.tabContainer.scrollWidth) {
        this.next = false
      } else {
        this.next = true
      }
    })
  }

  // nextRequest() {
  //   super.nextRequest()
  //   this.reqParams = {
  //     procInstanceName: this.procName,
  //     ...this.reqParams
  //   }
  //   this[this.selectedAction.clientMethod]()
  // }

  projectChanged(e) {
    //console.log('projectChanged')
    let program = []
    program=this.programsList.filter(p => p.name == e.target.value)
    if (program.length) {
      this.selectedProject = {}
      this.selectedProject=program[0]
      //this.selectedProject.study = []
      //this.selectedProject.study=[]
      this.selectedProject.study.push(program[0].study)
      this.selectedStudy={}
      this.selectedStudy=program[0].study[0]
      if (this.studyList){
        this.studyList.value=this.selectedStudy
      }
      //console.log('this.selectedProject', this.selectedProject)
      this.requestUpdate()
    }
  }
  studyChanged(e) {
    //console.log('studyChanged')
    if (this.selectedProject===undefined){return}
    let study = this.selectedProject.study.filter(p => p.name == e.target.value)
    if (study.length) {      
      this.selectedStudy = study[0]      
      //console.log('this.selectedStudy', this.selectedStudy)
      this.requestUpdate()
    }
  }
  setView() {
    this.selectedItems = []
    this.selectedAction = actions[0]
    this.actionMethod(this.selectedAction.subAction)
  }
  jsonParamCommons(selAction, selObject) {
    // console.log('jsonParamCommons', selAction)
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
     let jsonParam = {}
     let action = selAction
     if (action.endPointParams) {
       action.endPointParams.forEach(p => {
         if (p.argumentName==="studyName") {
           if (this.selectedStudy===undefined||this.selectedStudy.name===undefined){
             alert('No study selected')
             return jsonParam
           }
           jsonParam[p.argumentName] = this.selectedStudy.name
         } else if (p.internalVariableObjName&&p.internalVariableObjProperty) {          
             if (this[p.internalVariableObjName]===undefined||this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
               var msg=""
               if (this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
                 msg='The object '+p.internalVariableObjName+' has no one property called '+p.internalVariableObjProperty
                 alert(msg)
                 //console.log(msg, this[p.internalVariableObjName][0])
               }else{
                 msg='there is no object called '+p.internalVariableObjName+' in this view'
                 alert(msg)
               }
           //    alert('No family selected')
               return jsonParam[p.argumentName] = "ERROR: "+msg
             }  
           jsonParam[p.argumentName] = this[p.internalVariableObjName][0][p.internalVariableObjProperty]
          
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
         console.log('jsonParamCommons', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
       })
     }
     if (action.paramFilter) {
       jsonParam[action.paramFilter[this.filterName].query] = action.paramFilter[this.filterName].value
     }
     return jsonParam
   }
 
 
}
window.customElements.define('genoma-project', GenomaProject);
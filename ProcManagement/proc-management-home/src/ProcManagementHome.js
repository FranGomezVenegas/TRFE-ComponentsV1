import { html, css, LitElement } from 'lit';
//import { CommonCore } from '@trazit/common-core';
import '@trazit/tr-procedures/src/browser/sp-card-ext';
import {ProcManagement} from '@trazit/tr-procedures/src/0proc_models/proc-management-model';
//import {ProcManagement} from '../../../tr-procedures/src/0proc_models/proc-management-model';
import './trazit-filter-view';
//import '@trazit/tr-procedures/src/form_fields/trazit-form-fields';
//import '../../../tr-procedures/src/form_fields/trazit-form-fields';
import {ApiFunctions } from '@trazit/tr-procedures/src/components/Api/ApiFunctions';
import {ButtonsFunctions} from '@trazit/tr-procedures/src/components/Buttons/ButtonsFunctions';
export class ProcManagementHome extends ((ButtonsFunctions(ApiFunctions(LitElement)))) {
  static get styles() {
    return [
      css`
      div.procCard {
        height: 200px;
        width: 300px;
        transition: box-shadow .1s;
        background:
          url(https://bit.ly/3ZbNdfW)
          no-repeat center;
        background-size: cover;
      }
      divprocCard:hover {
        box-shadow: 0px 0px 50px rgba(0, 0, 0, 1);
      }      
      `
    ]
  }

  static get properties() {
    return {
      config:{type: Object},
      procMgrModel:{type: Object},
      procDefinitionViewCollapsed:{type: Boolean},
      procDeployViewCollapsed:{type: Boolean},
      procDeployViewCheckerCollapsed:{type: Boolean},
      procTestingCoverageCollapsed:{type: Boolean},
      procTestingScriptsCollapsed:{type: Boolean},
      selectedProcInstance:{type: Object},
      viewModelFromProcModel : {type: Object},
      
    };
  }

  constructor() {
    super()
    this.procMgrModel=ProcManagement    
    this.procDefinitionViewCollapsed=true   
    this.procDeployViewCheckerCollapsed=true
    this.procDeployViewCollapsed=true
    this.procTestingCoverageCollapsed=true
    this.procTestingScriptsCollapsed=true

    //this.config={}

    this.selectedProcInstance=undefined
    this.viewModelFromProcModel=ProcManagement.ProcedureDefinition
    console.log('constructor', 'this.config', this.config, this.viewModelFromProcModel)
    this.GetViewData()
  }
  toggleWiewCollapsed(e){
    if (e.target.id===undefined){return}
    this[e.target.id]=!this[e.target.id]
    console.log('this[e.target.id]', e.target.id, this[e.target.id])
    this.render()   
    return
  }
  ProcedureDefinitionView(){
    return html`
    <h1 id="procDefinitionViewCollapsed">${this.procMgrModel.ProcedureDefinition.viewDefinition[0]["label_en"+this.lang]}</h1>
    ${this.procDefinitionViewCollapsed===false ? html``: html`      
      <trazit-filter-view .config="${this.config}" .viewDefinition="${this.procMgrModel.ProcedureDefinition.viewDefinition}"></trazit-filter-view>
      `
    }
    `
  }
  ProcedureDeploymentView(){
    return html`
    <h1 id="procDeployViewCollapsed">${this.procMgrModel.ProcedureDeployment.viewDefinition[0]["label_en"+this.lang]}</h1>
    ${this.procDeployViewCollapsed===false ? html``: html`
      <trazit-filter-view .config="${this.config}" .viewDefinition="${this.procMgrModel.ProcedureDeployment.viewDefinition}"></trazit-filter-view>
      `
    }
    `
  }
  ProcedureDeploymentCheckerView(){
    return html`
    <h1 id="procDeployViewCheckerCollapsed" >${this.procMgrModel.ProcedureDeploymentChecker.viewDefinition[0]["label_en"+this.lang]}</h1>
    ${this.procDeployViewCheckerCollapsed===false ? html``: html`
      <trazit-filter-view .config="${this.config}" .viewDefinition="${this.procMgrModel.ProcedureDeploymentChecker.viewDefinition}"></trazit-filter-view>
      `
    }
    `
  }
  ProcedureTestingScriptsView(){
    return html`
    <h1 id="procTestingScriptsCollapsed" >${this.procMgrModel.ProcedureTestingScripts.viewDefinition[0]["label_en"+this.lang]}</h1>
    ${this.procTestingScriptsCollapsed===false ? html``: html`
      <trazit-filter-view .config="${this.config}" .viewDefinition="${this.procMgrModel.ProcedureTestingScripts.viewDefinition}"></trazit-filter-view>
      `
    }
    `
  }

  ProcedureTestingCoverageView(){
    return html`
    <h1 id="procTestingCoverageCollapsed" >${this.procMgrModel.ProcedureTestingCoverage.viewDefinition[0]["label_en"+this.lang]}</h1>
    ${this.procTestingCoverageCollapsed===false ? html``: html`
      <trazit-filter-view .config="${this.config}" .viewDefinition="${this.procMgrModel.ProcedureTestingCoverage.viewDefinition}"></trazit-filter-view>
      `
    }
    `
  }
  async authorized() {
    console.log('procManagementHome async authorized')
    super.authorized()
  }

  renderOld() {
    return html`       
      <div class="layout horizontal center flex wrap" @click="${this.toggleWiewCollapsed}">      
        ${this.procMgrModel.ProcedureDeployment&&this.procMgrModel.ProcedureDefinition.display===true ?
        html `${this.ProcedureDefinitionView()}`:nothing}
      </div>
      <div class="layout horizontal center flex wrap" @click="${this.toggleWiewCollapsed}">      
        ${this.procMgrModel.ProcedureDeployment&&this.procMgrModel.ProcedureDeployment.display===true ?
          html `${this.ProcedureDeploymentView()}`:nothing}
      </div>
      <div class="layout horizontal center flex wrap" @click="${this.toggleWiewCollapsed}">      
        ${this.procMgrModel.ProcedureDeployment&&this.procMgrModel.ProcedureDeploymentChecker.display===true ?
          html `${this.ProcedureDeploymentCheckerView()}`:nothing}
      </div>
      
      <div class="layout horizontal center flex wrap" @click="${this.toggleWiewCollapsed}">      
        ${this.procMgrModel.ProcedureDeployment&&this.procMgrModel.ProcedureTestingScripts.display===true ?
          html `${this.ProcedureTestingScriptsView()}`:nothing}
      </div>
      <div class="layout horizontal center flex wrap" @click="${this.toggleWiewCollapsed}">      
        ${this.procMgrModel.ProcedureDeployment&&this.procMgrModel.ProcedureTestingCoverage.display===true ?
          html `${this.ProcedureTestingCoverageView()}`:nothing}
      </div>
      
            

      
    `;
  }
  handleMouseMove(evt) {
    const el = evt.target;
    const {layerX, layerY} = evt;
    const height = el.clientHeight+50;
    const width = el.clientWidth+50;
    const yRotation = ((layerX - width / 2) / width) * 20;
    const xRotation = ((layerY - width / 2) / height) * 20;
    const transform = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    el.style.transform = transform;
  }
  handleMouseOut(evt) {
    const el = evt.target;
    el.style.transform = `perspective(500px) scale(1) rotateX(0) rotateY(0)`;
  }
  // ${this.data[elem.elementName].map(d =>
  //   html`<li>${d.field_name}: ${d.field_value}</li>`
  // )} 
render(){return html`
    ${this.selectedProcInstance===undefined ?
      html`
      <sp-card-ext heading="Report for the production lot" subheading="'this[elem.subheadingObj].value'">
        <div class="procCard" slot="cover-photo" @mousemove="${this.handleMouseMove}" @mouseout="${this.handleMouseOut}"></div>      
          <div slot="footer"></div>
      </sp-card-ext>
      <sp-card-ext heading="Report for the production lot" subheading="'this[elem.subheadingObj].value'">
        <div class="procCard" slot="cover-photo" @mousemove="${this.handleMouseMove}" @mouseout="${this.handleMouseOut}"></div>      
          <div slot="footer"></div>
      </sp-card-ext>
      <sp-card-ext heading="Report for the production lot" subheading="'this[elem.subheadingObj].value'">
        <div class="procCard" slot="cover-photo" @mousemove="${this.handleMouseMove}" @mouseout="${this.handleMouseOut}"></div>      
          <div slot="footer"></div>
      </sp-card-ext>
      <sp-card-ext heading="Report for the production lot" subheading="'this[elem.subheadingObj].value'">
        <div class="procCard" slot="cover-photo" @mousemove="${this.handleMouseMove}" @mouseout="${this.handleMouseOut}"></div>      
          <div slot="footer"></div>
      </sp-card-ext>

        
        nothing selected
      `:html`
        ${this.selectedProcInstance.name}
      ` 
    }
  `}  
}
window.customElements.define('proc-management-home', ProcManagementHome);

import { html, css, LitElement } from 'lit';
//import { CommonCore } from '@trazit/common-core';

import {ProcManagement} from '@trazit/tr-procedures/src/0proc_models/proc-management-model';
//import {ProcManagement} from '../../../tr-procedures/src/0proc_models/proc-management-model';
import './trazit-filter-view';
//import '@trazit/tr-procedures/src/form_fields/trazit-form-fields';
//import '../../../tr-procedures/src/form_fields/trazit-form-fields';
export class ProcManagementHome extends ((((LitElement)))) {
  static get styles() {
    return [
      css`
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
  }
  toggleWiewCollapsed(e){
    if (e.target.id===undefined){return}
    this[e.target.id]=!this[e.target.id]
    console.log('this[e.target.id]', e.target.id, this[e.target.id])
    this.render()   
    return
  }
  render() {
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
}
window.customElements.define('proc-management-home', ProcManagementHome);

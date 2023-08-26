import { html, css, nothing} from 'lit';
import {ButtonsFunctions} from '../Buttons/ButtonsFunctions';
// import { AuditFunctions} from '../Audit/AuditFunctions';
// import '../Audit/audit-dialog';

// import {ModuleEnvMonitClientMethods} from '../../module_env_monit/ModuleEnvMonitClientMethods';
// import {TrazitGenericDialogs} from '../GenericDialogs/TrazitGenericDialogs';
// import {TrazitReactivateObjectsDialog} from '../GenericDialogs/TrazitReactivateObjectsDialog';
// import {TrazitEnterResultWithSpec} from '../GenericDialogs/TrazitEnterResultWithSpec';
// import {ModuleEnvMonitDialogsMicroorganism} from '../../module_env_monit/Dialogs/ModuleEnvMonitDialogsMicroorganism';
// import {TrazitInvestigationsDialog} from '../GenericDialogs/TrazitInvestigationsDialog';
// import { ModuleInstrumentsDialogs} from '../../module_instruments/ModuleInstrumentsDialogs'

// import {TrazitCredentialsDialogs} from '../GenericDialogs/TrazitCredentialsDialogs';
// import '@vaadin/vaadin-grid/vaadin-grid';
// import '@vaadin/vaadin-grid/vaadin-grid-column';
// import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
// import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
// import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
// import '@doubletrade/lit-datatable';
// import '@google-web-components/google-chart';

export function LeftPaneFilterViews(base) {
  //return class extends TrazitCredentialsDialogs(AuditFunctions(ModuleInstrumentsDialogs(TrazitInvestigationsDialog(ModuleEnvMonitDialogsMicroorganism(TrazitEnterResultWithSpec(TrazitReactivateObjectsDialog(TrazitGenericDialogs(ModuleEnvMonitClientMethods(AuditFunctions(ButtonsFunctions(base))))))))))) {
  return class extends  base {
    
    filterElement(data){
      if (data===undefined){return}
      return html`
        ${this.viewModelFromProcModel.filterResultDetail !== undefined&&this.viewModelFromProcModel.filterResultDetail.type !== undefined 
          &&this.viewModelFromProcModel.filterResultDetail.type==="list"? html`
            ${this.filterAsList(data)}`: nothing}        
      `
    }
    
    
    filterAsList(data) {
      let elem=this.viewModelFromProcModel
      //console.log('filterAsList', elem.filterResultDetail, data)
      let dataArr=[]
      if (!Array.isArray(data)){        
        dataArr.push(data)        
      }else{
        dataArr=data
      }
      //let data=this.userSessionsList
      if (elem===undefined){html`data undefined`}
      if (dataArr === undefined) {
        return html`data undefined`
      }
      return html`
        ${Array.isArray(dataArr) && dataArr.length > 0
          ? html`
              <style>
                li.no_success {
                  color: red;
                }
                li.success {
                  color: #3880d4;
                };
                }
                li {
                  cursor: pointer;
                  font-size: 1.7vmin;
                  transition: all 0.2s ease-in-out;
                }
                li:hover {
                  background-color: rgba(41, 137, 216, 0.1);
                }
              </style>
              <ul>
              ${dataArr===undefined?html`dataArr is undefined`:
              html`  
                ${dataArr.map(
                  (d) =>
                    html`
                      <li role="button"  class="success" @click=${this.filterElementClicked} 
                      .thisitem="${d}" .elementdef="${elem}">
                          ${elem.filterResultDetail.detail.map((curFld, index) => html`
                          ${d[curFld.field]}${index !== elem.filterResultDetail.detail.length - 1 ? ' ,' : ''}
                    `)}
                    
                        <hr />
                      </li>
                    `
                )}
              `}
              </ul>
            `
          : nothing}
      `;
    }
    //clickedUserSessionFromList
    filterElementClicked(e){
      if (e.targetValue===undefined){return}
      console.log(e.targetValue.elementdef)
    }
  } 
}
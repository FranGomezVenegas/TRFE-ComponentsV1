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
                .item {
                  height: 30px;
                  line-height: 30px;
                  text-align: center;
                  background-color: rgb(36, 192, 235);
                  border: 1px solid blue;
                  display: flex;
                  margin-bottom: 8px;
                  border-radius: 12px;
                  cursor: pointer;
                }
                .search-item {
                  text-align: center;
                  width: 100%;
                }
                .index {
                  width: 36px;
                  height: 30px;
                  text-align: center;
                  background-color: blue;
                  flex-shrink: 0;
                  background-color: rgb(3, 169, 244);
                  border-radius: 12px 0px 0px 12px
                }
              </style>
              ${dataArr===undefined?html`dataArr is undefined`:
              html`  
                ${dataArr.map(
                  (d, i) =>
                    html`
                      <div role="button"  class="success item" @click=${() => this.filterElementClicked(d)} 
                      .thisitem="${d}" .elementdef="${elem}">
                        <div class="index"> ${i + 1} </div>
                        <div class="search-item"> 
                          ${elem.filterResultDetail.detail.map((curFld, index) => html`
                          ${d[curFld.field]}${index !== elem.filterResultDetail.detail.length - 1 ? ' ,' : ''}
                        </div>
                      `)}
                      </div>
                    `
                )}
              `}
            `
          : nothing}
      `;
    }
    //clickedUserSessionFromList
    filterElementClicked = (d) => {
      console.log("filterElementClicked", d);
      let params = `http://51.75.202.142:8888/TRAZiT-API/moduleinsplotrm/InspLotRMAPIqueries?actionName=GET_SPECS&dbName=demo_v0_9_2&procInstanceName=inspection_lot&finalToken=eyJ1c2VyREIiOiJhZG1pbiIsImRhdGV0aW1lRm9ybWF0QXRQbGF0Zm9ybUxldmVsIjoiRElTQUJMRUQiLCJwcm9jc01vZHVsZU5hbWUiOiJzdG9jaypTVE9DS1N8aW5zdHJ1bWVudHMqSU5TVFJVTUVOVFN8bW9uX3dhdGVyKk1PTklUT1JJTkd8bWJfZW0qTU9OSVRPUklOR3xpbnNwZWN0aW9uX2xvdCpJTlNQRUNUSU9OX0xPVFN8Y2FybWVuU3RvY2sqU1RPQ0tTfERpc2Vhc2VTdHVkaWVzKkNMSU5JQ0FMX1NUVURJRVMiLCJkYk5hbWUiOiJkZW1vX3YwXzlfMiIsInR5cCI6IkpXVCIsInVzZXJfcHJvY2VkdXJlX2hhc2hjb2RlcyI6InN0b2NrKjEqMTgzNzg3MTczOHxpbnN0cnVtZW50cyoxKjg5ODgwODk4M3xtb25fd2F0ZXIqMSoyMDUzODA2ODY1fG1iX2VtKjEqMTg3OTA0Njk5M3xpbnNwZWN0aW9uX2xvdCoxKjE2NzgwMTI2MjN8Y2FybWVuU3RvY2sqMSoxNzA4NDczODgzfERpc2Vhc2VTdHVkaWVzKjEqMTk3NDc3MTczMSIsImVTaWduIjoiZmlybWFkZW1vIiwidXNlckRCUGFzc3dvcmQiOiJ0cmF6aXQ0ZXZlciIsInVzZXJNYWlsIjoiaW5mb0B0cmF6aXQubmV0IiwidXNlcl9wcm9jZWR1cmVzIjoiW3N0b2NrLCBpbnN0cnVtZW50cywgbW9uX3dhdGVyLCBtYl9lbSwgaW5zcGVjdGlvbl9sb3QsIGNhcm1lblN0b2NrLCBEaXNlYXNlU3R1ZGllc10iLCJhcHBTZXNzaW9uSWQiOiIxMTMxIiwiYXBwU2Vzc2lvblN0YXJ0ZWREYXRlIjoiV2VkIEphbiAxMCAxNzo0NjoyMyBVVEMgMjAyNCIsInVzZXJSb2xlIjoic3VwZXJ1c2VyIiwiYWxnIjoiSFMyNTYiLCJpbnRlcm5hbFVzZXJJRCI6IjQ1NDg5MjIzIn0.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.AYpOaCSGgr-oZBQxDj60uk9l7uQF3ThGNr23Jq8k7_0&specCode=%25${d.code}%25&isForTesting=false`;
      this.fetchApi(params).then(res => {
        console.log("result", res)
      })
    }
  } 
}
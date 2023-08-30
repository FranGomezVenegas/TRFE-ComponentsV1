import { html, css, nothing } from 'lit';
import { CommonCore } from '@trazit/common-core';
import '@alenaksu/json-viewer';
import '@spectrum-web-components/split-view/sp-split-view';
//import { TrazitFormsElements } from '@trazit/tr-procedures/src/components/GenericDialogs/TrazitFormsElements'
//import { DataViews } from '@trazit/tr-procedures/src/components/Views/DataViews'
import { ModelData } from './modelData';
// DataViews(TrazitFormsElements(CommonCore)) {
export class PlatformUsersessions extends (CommonCore) { 
  static get styles() {
    return [
      css`
      sp-split-view {
        height: calc(100vh - 150px);
      }
      #leftSplit {
        padding: 10px;
        background-color:transparent;
        width:300px;
      }
      #leftSplit::-webkit-scrollbar, #rightSplit::-webkit-scrollbar {
        display: none;
      }

     



      #rightSplit{
        background-color:transparent
      }      
      div[hidden] {
        display: none;
      }
      mwc-button {
        background-color: rgba(36, 192, 235, 1);
        font-family: Montserrat;
        font-weight: bold;
        font-size: 19px;
        --mdc-theme-primary:rgba(36, 192, 235, 1);
        border-radius: 12px;
      }
      mwc-button.button {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background: rgb(36, 192, 235) none repeat scroll 0% 0%;
        font-family: Montserrat;
        font-weight: bold;
        font-size: 19px;
        color: white;
        border-color: transparent !important;
        --mdc-button-fill-color: red;
        --mdc-button-ink-color: blue;
        border-radius: 12px;
      }            
      mwc-textfield {
        border-style : Solid;
        border-color : #999999;
        border-color : rgba(153, 153, 153, 1);
        border-width : 1px;
        border-radius : 7px;
        -moz-border-radius : 7px;
        -webkit-border-radius : 7px;   
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background-color :  #FFFFFF;
        background-color : rgb(255, 255, 255);  
        --mdc-text-field-idle-line-color:#148CFA;
        --mdc-text-field-outlined-idle-border-color: #148CFA;
        --mdc-text-field-label-ink-color:  #148CFA;
        --mdc-text-field-focused-label-color: #148CFA;
        --mdc-theme-primary: #0465FB;
      }
      nwc-textfield.mdc-text-field {
      background-color :  #FFFFFF;
      background-color : rgb(255, 255, 255);     
      }
      json-viewer{
        --background-color: #2a2f3a00;
        --string-color: rgba(57, 61, 71, 0.9);
        --property-color: rgba(57, 61, 71, 0.9);
        --preview-color: #24C0EB;
        --font-family: Montserrat;
      }
      `
    ]
  }

  static get properties() {
    return {
      docs: { type: Array },
      filterDocs: { type: Array },
      userSessionsList: { type: Array },
      userSessionDetailInfo: { type: Array },
      endpoints: { type: Array },
      selectedApis: { type: Array },
      selectedTxts: { type: Array },
      viewModelFromProcModel: {type: Object}
    };
  }

  constructor() {
    super()
    this.docs = []
    this.filterDocs = []
    this.userSessionsList = []
    this.userSessionDetailInfo = []    
    this.selectedApis = []
    this.selectedTxts = []
    this.desktop=true
    this.viewModelFromProcModel=ModelData
  }

  leftSplitOnd(){
    return html`
    <div id="leftSplitOld">
    <select @change=${this.apiChanged}>
      <option value="">-- Filter by API Name --</option>
      ${this.userSessionsList.map(a=>
        html`<option value=${a}>${a}</option>`
      )}
    </select><br>
    Last Update <input id="lastDate" type="datetime-local" @change=${this.dateChanged}>
    <hr>
    <label>${this.filterDocs.length} of ${this.docs.length}</label>
    <div id="endpointName">
    ${this.filterDocs.map(d =>
      html`
        <p class="ed" id="${d.id}" @click=${e=>this.endpointSelect(e, d)}>${d.endpoint_name}</p>
      `
    )}
    </div>
  </div>    
  `
  }
  render() {    
    if (this.lang===undefined){this.lang="en"}
    return html`
      ${this.desktop ?
        html`        
        <sp-split-view resizable dir="ltr" splitter-pos="300">

          <div id="leftSplit" class="${this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed ? '' : 'collapsed'}">
          <div id="endpointName">                
            <sp-button size="m" slot="primaryAction" dialogAction="accept" .viewModelFromProcModel="${this.viewModelFromProcModel}" 
              @click="${this.getUserSessions}">${this.viewModelFromProcModel.filter_button["label_" + this.lang]} </sp-button>

            ${this.viewModelFromProcModel.filter === undefined ? nothing : html`
              ${this.genericFormElements(this.viewModelFromProcModel.filter, true)} `}                      
          </div>
          <div>
          ${this.viewModelFromProcModel.filterResultDetail !== undefined&&this.viewModelFromProcModel.filterResultDetail.type !== undefined 
            &&this.viewModelFromProcModel.filterResultDetail.type==="list"? html`
              ${this.userSessionsAsList()}`: nothing}
          
          </div>
          </div>          
          <div id="rightSplit">
          ${this.userSessionDetailInfo===undefined?nothing:html`
            ${this.kpiCardSomeElementsSingleObject(this.viewModelFromProcModel.detail.header, this.userSessionDetailInfo[0])}
          `}
            ${this.userSessionDetailInfo.map(s =>
              html`<json-viewer>${JSON.stringify(s)}</json-viewer>`
            )}
          </div>
        </sp-split-view>
        ` :
        html`
        <div id="mobile">
        </div>
        `
      }
    `;
  }
  userSessionsAsList() {
    let elem=this.viewModelFromProcModel
    let data=this.userSessionsList
    if (elem===undefined){return}
    if (data===undefined){alert('data is undefined');return}
    if (data === undefined) {
      return html``;
    }
    return html`
      ${Array.isArray(data) && data.length > 0
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
            ${data===undefined?nothing:
            html`  
              ${data.map(
                (d) =>
                  html`
                    <li
                      role="button"
                      class="success"
                      .thisitem="${d}"
                      @click=${this.clickedUserSessionFromList}
                      .elementdef="${elem}"
                    >
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

  clickedUserSessionFromList(e) {
    this.getSessionDetail(e.currentTarget.thisitem.session_id)
    this.requestUpdate();
  }

  async getUserSessions() {    
    let viewParams=this.jsonParam(this.viewModelFromProcModel.viewQuery)
    //console.log(viewParams)
    await this.fetchApi(this.config.backendUrl + "/app/UserSessionAPIqueries" + '?' + new URLSearchParams({
      actionName: "USER_SESSIONS", //USER_SESSION_INCLUDING_AUDIT_HISTORY&userSessionId=19641
      apiName: "ALL",
      dbName: JSON.parse(sessionStorage.getItem("userSession")).dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      person: JSON.parse(sessionStorage.getItem("userSession")).header_info.person_id,
      //date_started_start: '2023-02-01',
      //date_started_end: '2023-03-01'
      
    })+"&"+new URLSearchParams(viewParams), false).then(j => {
      this.docs = this.filterDocs = j
      //let apis = j.map(d => d.api_name)
      //apis.unshift("All")
      this.userSessionsList = j //apis.filter((item, index) => apis.indexOf(item) === index);
    })
    this.requestUpdate()
  }

  async getSessionDetail(sessionId) {    

    await this.fetchApi(this.config.backendUrl + "/app/UserSessionAPIqueries" + '?' + new URLSearchParams({
      actionName: "USER_SESSION_INCLUDING_AUDIT_HISTORY", //&=19641
      apiName: "ALL",
      dbName: JSON.parse(sessionStorage.getItem("userSession")).dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      userSessionId:sessionId
      
    }), false).then(j => {
      this.docs = this.filterDocs = j
      //let apis = j.map(d => d.api_name)
      //apis.unshift("All")
      this.userSessionDetailInfo = j //apis.filter((item, index) => apis.indexOf(item) === index);
    })
    this.requestUpdate()
  }
}

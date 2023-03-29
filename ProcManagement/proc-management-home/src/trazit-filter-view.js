import { LitElement, html, css, nothing } from 'lit';
import { TrazitFilterActions } from './TrazitFilterActions';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@spectrum-web-components/split-view/sp-split-view';
import './trazit-filter-view-content';
import {ApiFunctions} from '@trazit/tr-procedures/src/components/Api/ApiFunctions';

export class TrazitFilterView extends ApiFunctions(TrazitFilterActions(LitElement)) {
  static get styles() {
    return [
      Layouts,
      css`
      mwc-icon-button#lang {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
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
      mwc-icon-button {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }        
      mwc-icon-button.disabledtrue{        
        color : red;
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }        
      sp-split-view {
        height: calc(100vh - 150px);
      }
      #leftSplit {
        padding: 10px;
        background-color:transparent
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
      mwc-button#search {
        --mdc-typography-button-text-transform: none;
        --mdc-typography-button-font-size: 13px;
        --mdc-button-color:rgba(214, 233, 248, 1);
        background : #D6E9F8;
        background : rgba(214, 233, 248, 1);
        border-radius : 11px;
        -moz-border-radius : 11px;
        -webkit-border-radius : 11px;        
      }
      `
    ];
  }

  static get properties() {
    return {
      desktop: { type: Boolean },
      config: { type: Object },
      lang: { type: String },
      model: { type: Object },
      procName: { type: String },
      data: { type: Object },
      datatable:{type: Object},
      leftOpen:{type: Boolean},
      masterData: {type: Array},

      jsonData:{type: Object},
      filters:{type: Array},
      viewDefinition:{type: Array},
      selectedEntry:{type: Object},
      dbName: { type: String },
      

    };
  }

  constructor() {
    super()
    this.jsonData={}
    this.desktop = true
    this.model = {}    
    this.data = {}
    this.leftOpen = true
    this.dbName=""

    if (this.lang===undefined){this.lang="en"}

    this.filters=[]
    this.viewDefinition=[]
    this.selectedEntry={}

    if (this.config===undefined||this.config.length==0){
      this.config={
        "dbName": "labplanet",
        "isForTesting": false,
        "backendUrl": "http://51.75.202.142:8888/LabPLANET-API",
        "appAuthenticateApiUrl": "/app/AuthenticationAPIactions",
        "frontEndEnvMonitSampleUrl": "/moduleenvmon/EnvMonSampleAPIqueries",
        "EnvMonSampleAPIQueriesStats": "/moduleenvmon/EnvMonAPIstats",
        "ApiEnvMonitSampleUrl": "/moduleenvmon/EnvMonSampleAPIactions",
        "ApiEnvMonitUrl": "/moduleenvmon/EnvMonAPIactions",
        "frontEndEnvMonitIncubationUrl": "/moduleenvmon/EnvMonIncubationAPIqueries",
        "frontEndEnvMonitUrl": "/moduleenvmon/EnvMonAPIqueries",
        "ApiEnvMonitProdLotUrl": "/moduleenvmon/EnvMonProdLotAPIactions",
        "ApiInstrumentsAPIactionsUrl": "/app/procs/InstrumentsAPIactions",
        "ApiInstrumentsAPIqueriesUrl": "/app/procs/InstrumentsAPIqueries",
        "PlatformAdminAPIactionsUrl": "/app/PlatformAdminActions",
        "PlatformAdminAPIqueriesUrl": "/app/PlatformAdminQueries",
        "GenomaStudyAPIactionsUrl": "/modulegenoma/GenomaStudyAPIactions",
        "GenomaStudyAPIqueriesUrl": "/modulegenoma/GenomaStudyAPIqueries",
        "local": true,
        "localDefaultView": {
            "procName": "em-demo-a",
            "viewName": "DataMining",
            "filterName": "DataMining"
        }
      }
      this.dbName=this.config.dbName
    }
  }
  filterSize(){
    let leftPane = this.shadowRoot.querySelector("sp-split-view#leftsplit")
    if (leftPane!==undefined){
      //leftPane.style.size="10"
      if (this.leftOpen){
        leftPane.primarySize="20"

      }else{
        leftPane.primarySize="300"
      }
      this.leftOpen=!this.leftOpen
    }else{
      alert('not found')
    }
  }
  filterPaneIcon(){
    if (this.leftOpen){
      return 'chevron_left'      
    }else{
      return 'keyboard_arrow_right' //'chevron_right'
    }
  }
  //this.desktop
  render() {
    return html`
        ${this.selectedEntry.filter===undefined||this.selectedEntry.filter.filterFields===undefined||this.selectedEntry.filter.filterFields.length===0 ? 
        html`
          <div id="rightSplit">
          <mwc-button id="search" raised label="${this.selectedEntry["button_label_"+this.lang]}" @click=${this.getQueryFilterData}></mwc-button>
          ${Object.keys(this.data).length ?
          html`
            <trazit-filter-view-content .config="${this.config}"  .data=${this.data} .activeTab=${this.selectedEntry}></trazit-filter-view-content>            
          ` :nothing}         
          </div>
        `:
        html`
        <sp-split-view id="leftsplit" resizable primary-size="300">
            <div id="leftSplit">
            <mwc-icon-button class="material-icons-round" icon="${this.filterPaneIcon()}" @click=${this.filterSize}></mwc-icon-button>
            ${this.viewDefinition!==undefined&&this.viewDefinition.length>1 ?
            html`
                <mwc-select style="width:100%;" class="layout flex vertical" outlined id="filterList" label="Deployment" @change=${this.listObjectSelected}>
                ${this.viewDefinition.map((p,i) => 
                  html`<mwc-list-item value="${i}" ?selected=${i==0}>${p['label_'+this.lang]}</mwc-list-item>`
                )}
                </mwc-select>      
            `: nothing}
            <div class="layout flex vertical">
              <trazit-form-fields id="filterfields" lang="${this.lang}" .fields="${this.selectedEntry.filter.filterFields}"></trazit-form-fields>
              <mwc-button id="search" raised label="${this.selectedEntry["button_label_"+this.lang]}" @click=${this.getQueryFilterData}></mwc-button>
              </div>
            </div>
          <div id="rightSplit">
          ${Object.keys(this.data).length ?
          html`
          <trazit-filter-view-content .config="${this.config}" .data=${this.data} .activeTab=${this.selectedEntry}></trazit-filter-view-content>            
          ` :nothing}         
          </div>
        </sp-split-view>      
        `
      }

    `
  }
  get trazitFormFields() {    return this.shadowRoot.querySelector("trazit-form-fields#filterfields")    } 

  fetchApi(urlParams) {
    this.dispatchEvent(new CustomEvent('set-activity', {bubbles: true, composed: true}))
    return fetch(urlParams).then(async r => {
      if (r.status == 200) {
        return r.json()
      }
      else if (r.status == 203) {
        let err = await r.json()
        if (err.message!==undefined){alert(err.message)}
      }else {
        let err = await r.json()
        throw err
      }
    }).then(j => {
      this.dispatchEvent(new CustomEvent('success', {
        detail: {...j},
        bubbles: true,
        composed: true
      }))
      return j
    }).catch(e => {
      this.dispatchEvent(new CustomEvent("error", {
        detail: {...e},
        bubbles: true,
        composed: true
      }))
      return
    })
  }
  updated(updates) {
    if (updates.has('viewDefinition') && this.viewDefinition.length) {
      this.updateComplete.then(() => {
        this.selectedEntry=this.viewDefinition[0]
      })  
    }
  }
}
window.customElements.define('trazit-filter-view', TrazitFilterView);
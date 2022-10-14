import { LitElement, html, css, nothing } from 'lit';

import { Layouts } from '@collaborne/lit-flexbox-literals';
// import '@material/mwc-button';
// import '@material/mwc-select';
// import '@material/mwc-list/mwc-list-item';
// import '@material/mwc-textfield';
import '@alenaksu/json-viewer';
import '@spectrum-web-components/split-view/sp-split-view';
// import '@doubletrade/lit-datatable';
//import '../../../tr-procedures/src/form_fields/trazit-form-fields'
import '@trazit/tr-procedures/src/form_fields/trazit-form-fields';
export class TestingCoverageSummary extends LitElement {
  static get styles() {
    return [
      Layouts,
      css`
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
      json-viewer#viewer {
        --background-color: #fff;
        --color: #f8f8f2;
        --string-color: #03A9F4;
        --number-color: #03A9F4;
        --boolean-color: #03A9F4;
        --null-color: #df9cf3;
        --property-color : #24C0EB;
        --property-color : rgb(36, 192, 235);
        --font-family: Myriad Pro;
        --preview-color: rgba(222, 175, 143, 0.9);
        --highlight-color: #7b0000;
    
        display: block;
        background-color: var(--background-color);
        color: var(--color);
        padding: 0.5rem;
        font-family: var(--font-family);
        font-size: 1.3rem;        
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
      tabList: { type: Array },
      activeTab: { type: Object },
      sampleData: { type: Object },
      data: { type: Object },
      chartImgs: { type: Array },
      datatable:{type: Object},
      leftOpen:{type: Boolean},
      masterData: {type: Array},

      filters:{type: Array},
      viewDefinition:{type: Array},
      selectedEntry:{type: Object}
    };
  }

  constructor() {
    super()
    this.desktop = true
    this.model = {}
    this.tabList = []
    this.activeTab = {}
    this.sampleData = {}
    this.data = {}
    this.chartImgs = []
    this.leftOpen = true

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
    }
    
    // console.log('constructor', 'viewDefinition', this.viewDefinition)
    // if (this.viewDefinition){ //!==undefined&&this.viewDefinition.length==1){
    //   this.selectedEntry=this.viewDefinition[0]
    // }
    
  }
  filterSize(){
    //let leftPane = this.shadowRoot.querySelector("div#leftSplit")
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

    testing coverage summaryssss
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
            <trazit-form-fields id="filterfields" lang="${this.lang}" .filter="${this.selectedEntry.filter}"></trazit-form-fields>
            <mwc-button id="search" raised label="Search" @click=${this.getQueryFilterData}></mwc-button>
            </div>
          </div>
          <div id="rightSplit">
          ${Object.keys(this.data).length ?
            html`<json-viewer id="viewer"></json-viewer>` :
            nothing
          }         
          </div>
        </sp-split-view>      
    `
  }
//  html`<json-viewer id="viewer" .data="${this.data[this.selectedEntry.elementName]}"></json-viewer>` :

  // <!--            <datamining-data .data=${this.data} .activeTab=${this.activeTab} lang=${this.lang}
  //           dbName=${this.config.dbName} procName=${this.procName}
  //             @chart-images=${e=>{this.chartImgs.push(e.detail.imgUri);this.requestUpdate()}}></datamining-data>-->

  get trazitFormFields() {    return this.shadowRoot.querySelector("trazit-form-fields#filterfields")    } 
  get jsonViewer(){    return this.shadowRoot.querySelector("json-viewer#viewer")    } 
  listObjectSelected(e){
    console.log('listObjectSelected', e.target.value)
    this.selectedEntry =this.viewDefinition[e.target.value]
  }

  jsonParamCommons(selObject) {
    let jsonParam = {}
    selObject.forEach(p => {
      if (p.argumentName==="projectName") {
        if (this.selectedProject===undefined||this.selectedProject.name===undefined){
          alert('No study selected')
          return jsonParam
        }
        jsonParam[p.argumentName] = this.selectedProject.name
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
            return jsonParam[p.argumentName] = "ERROR: "+msg
          }  
        jsonParam[p.argumentName] = this[p.internalVariableObjName][0][p.internalVariableObjProperty]
        
      } else if (p.element) {
        jsonParam[p.argumentName] = this.trazitFormFields[p.element].value // get value from field input
      } else if (p.defaultValue) {
        jsonParam[p.argumentName] = p.defaultValue // get value from default value (i.e incubator)
      } else if (p.selObjectPropertyName) {
        jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
      } else if (p.targetValue) {
        jsonParam[p.argumentName] = this.targetValue[p.argumentName] // get value from target element passed
      } else {
        jsonParam[p.argumentName] = p.value
      }
      //console.log('jsonParamCommons', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
    })
    return jsonParam
  }


  getQueryFilterData() {
    if (this.selectedEntry===undefined||this.selectedEntry.filter===undefined){
      alert("No entry selected to perform the search")
      return
    }
    if (this.config===undefined||this.config===null){
      //alert('No config info available')
      //return
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
      }
  
    }
    var extraParams=this.jsonParamCommons(this.selectedEntry.filter.extraParams) 
    let reqParams = {
      procInstanceName: this.procName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      dbName: this.config.dbName,
      actionName: this.selectedEntry.action, 
      ...this.selectedEntry.filter.fixParams,
      ...extraParams
    }
    let params = this.config.backendUrl + (this.selectedEntry.endPoint ? this.selectedEntry.endPoint : this.config.EnvMonSampleAPIQueriesStats)
      + '?' + new URLSearchParams(reqParams)
    this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        this.data = j
        console.log(this.data)
        this.jsonViewer.data=this.data[this.selectedEntry.elementName]
        
        //this.render()
      }
    })
  }

  setPrintContent() {
     //let header = `Report for the `
    // if (this.sampleData.sampleFieldToRetrieve) {
    //   header += `sample ${this.sampleData.sampleFieldToRetrieve.sample_id}`
    // } else if (this.sampleData.incubatorFieldToRetrieve) {
    //   header += `incubator ${this.sampleData.incubatorFieldToRetrieve.name}`
    // } else if (this.sampleData.batchFieldToRetrieve) {
    //   header += `batch ${this.sampleData.batchFieldToRetrieve.name}`
    // } else {
    //   header += `production lot ${this.sampleData.prodLotFieldToRetrieve.name}`
    // }
    let contentToPrint="Page Empty, nothing to print"
    let dataContent=this.shadowRoot.querySelector("div#kpidata")
    if (dataContent!==undefined&&dataContent!==null){
      contentToPrint=dataContent
    }
    this.printObj = {
      header: this.activeTab["label_"+this.lang],
      content:contentToPrint
    }
  }

  chartContent() {
    let imgs = ``
    this.chartImgs.forEach(img => {
      imgs += `<img src="${img}" style="margin-bottom=10px;"><br>`
    })
    return imgs
  }
  print() {
    this.setPrintContent()
    var printWindow = window.open('', '', 'fullscreen=yes');
    printWindow.document.write(this.printObj.content);
    printWindow.document.title = this.printObj.header;
    printWindow.document.close();
    setTimeout(function () {
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  /**
   * Populating fetch api
   * @param {*} urlParams the url api with params
   */
  fetchApi(urlParams) {
    this.dispatchEvent(new CustomEvent('set-activity', {bubbles: true, composed: true}))
    return fetch(urlParams).then(async r => {
      if (r.status == 200) {
        return r.json()
      } else {
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
    if (updates.has('model') && this.model.DataMining) {
      this.tabList = this.model.DataMining.tabs
    }
  }
}
window.customElements.define('testing-coverage-summary', TestingCoverageSummary);
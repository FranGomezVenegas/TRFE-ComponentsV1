import { html, css, nothing, LitElement } from 'lit';
import './objecttabs-composition';
import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';

export class ObjectByTabs extends DialogsFunctions(LitElement) {
  static get styles() {
    return css`
      :host([disabled]) {
        opacity: 0.5;
        pointer: none;
      }
      div.t-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin-right: 3px;
        background-color: #03a9f4;
      }
      mwc-button.tabBtn {
        background-color: #24C0EB;
        font-family : Myriad Pro;
        border-radius : 11px;        
        -moz-border-radius : 11px;
        -webkit-border-radius : 11px;
        border-style:outset;
        border-color:rgb(48, 116, 135);
        border-width: 0px 3px 3px 0px;
        --mdc-typography-button-text-transform: none;
        --mdc-typography-button-font-size: 19px;
        --mdc-theme-primary: rgb(3, 169, 244);       
      }
    `;
  }

    static get properties() {
        return {
            tabsMainViewModelFromProcModel: {type: Object},
            viewModelFromProcModel: {type: Object},        
            selectedTabModelFromProcModel : {type: Object},        
            config: { type: Object },
            procName: { type: String },
            ready:{type: Boolean},
            viewName: { type: String },
            filterName: { type: String },
            lang: { type: String },
            procInstanceName:{type: String},
            masterData:{ type: Object},
            requestData: {type: Array},
            selectedItem:{ type: Object},
            selectedItemLoaded:{type: Boolean},
        }
    }
    constructor() {
        super()
        this.viewModelFromProcModel={} 
        this.tabsMainViewModelFromProcModel={}
        this.selectedTabModelFromProcModel={}
        this.ready=false;
        this.config={}
        this.masterData={} 
        this.langConfig = this.viewModelFromProcModel.langConfig
        this.requestData =[]
        this.selectedItem={}
        this.selectedItemLoaded=false
        //this.getObjectData()
        this.lotDefault='Testing 2023-03-15T21:20:55.962273'//'demo 2023-03-11T22:40:27.243529300'//'demo 2023-03-11T22:29:16.300048300'//'demo 2023-03-11T11:03:06.643535700'//'demo 2023-03-11T21:33:16.786665'
          }
    render() {       
      this.getObjectData()
        return html`   
        <div class="layout horizontal flex center-center">
        <mwc-textfield class="layout flex" id="lottoget" type="text" .value=${this.lotDefault ? this.lotDefault : ''}  label="lot to get" 
            @keypress=${e => e.keyCode == 13 && this.getObjectData()}></mwc-textfield>
        </div>
        ${this.title()}
        ${this.tabsBlock()}  
        
      `
    }
    title(){
      return html`
      ${Object.keys(this.selectedItem).length === 0||this.viewModelFromProcModel.showTitleOnTop===undefined||this.viewModelFromProcModel.showTitleOnTop!==true ? nothing :
      html `
        <h2>
        ${this.viewModelFromProcModel.title.fix_text_en===undefined ? '' :this.viewModelFromProcModel.title.fix_text_en}
        ${this.selectedItem[this.viewModelFromProcModel.title.field_name]===undefined ? '' :this.selectedItem[this.viewModelFromProcModel.title.field_name]}
        </h2>
      
      `}`
    }
    tabsBlock(){
        //this.resetView()
        return html`
        ${this.viewModelFromProcModel.tabs ?
          html`
            <div class="layout horizontal flex">
            ${this.viewModelFromProcModel.tabs!==undefined&&this.viewModelFromProcModel.tabs.length>1 ?
            html`
              <div class="layout horizontal flex">
                ${this.viewModelFromProcModel.tabs.map(t => 
                  html`
                    <mwc-button class="tabBtn" dense unelevated 
                      .label=${t["tabLabel_"+ this.lang]}
                      @click=${()=>this.selectTab(t)}></mwc-button>
                  `
                )}
              </div>
            `: nothing}
              ${this.selectedTabContent()}  
            </div>
            
          ` : nothing
        }
        `
    }
    
    selectedTabContent(){
      if (Object.keys(this.selectedTabModelFromProcModel).length === 0){
        this.selectedTabModelFromProcModel=this.viewModelFromProcModel.tabs[0]
      }
      //console.log('selectedTabContent', this.viewName, this.selectedTabModelFromProcModel)
      return html`
      <objecttabs-composition .selectedTabModelFromProcModel=${this.selectedTabModelFromProcModel}
      .lang=${this.lang} .procInstanceName=${this.procInstanceName} .config=${this.config}     
      .selectedItem=${this.selectedItem}      
      </objecttabs-composition>      
      `
    }
    tabOnOpenView() {
      // <objecttabs-composition 
      // .lang=${this.lang} .masterData=${this.masterData}
      // .windowOpenable=${this.windowOpenable}
      // .sopsPassed=${this.sopsPassed}
      // .procInstanceName=${this.procInstanceName}             
      // .viewName=${this.viewName}  .viewModelFromProcModel=${this.viewModelFromProcModel!==undefined&&Object.keys(this.viewModelFromProcModel).length>0 ? this.viewModelFromProcModel : this.viewModelFromProcModel.tabs[0]}
      // .selectedTabModelFromProcModel=${this.selectedTabModelFromProcModel}
      // .selectedItem=${this.selectedItem}
      // .config=${this.config}>${this.tabOnOpenView()}</objecttabs-composition>        
      return
    }
    selectTab(tab) {
      this.selectedTabModelFromProcModel=tab
      this.objecttabsComposition.render()
    }

    getObjectData(){
      console.log('this.selectedItem', this.selectedItem)
      //if (Object.keys(this.selectedItem).length === 0){
      //if (!this.selectedItemLoaded){        
      if (this.lottoget!==null&& this.lottoget.value!=='' && this.selectedItemLot!=this.lottoget.value){
        this.selectedItemLot=""
        this.GetViewData(false)
        if (this.requestData.length===1){
          if (Array.isArray(this.requestData)){
            this.selectedItem=this.requestData[0]
          }else{
            this.selectedItem={}
          }
          this.selectedItemLot=this.lottoget.value
          this.selectedItemLoaded=true
        }
      }
    }
    resetView() {
      //console.log('resetView', 'tabs', this.tabsMainViewModelFromProcModel.tabs, 'master data', this.masterData)
      if (this.objecttabsComposition!==null){
        this.objecttabsComposition.render()
      }
      return
      }
      get lottoget() {    return this.shadowRoot.querySelector("mwc-textfield#lottoget")    }        

      get objecttabsComposition() {return this.shadowRoot.querySelector("objecttabs-composition")}  
}
window.customElements.define('object-by-tabs', ObjectByTabs);
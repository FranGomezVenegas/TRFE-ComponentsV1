import { html, css, nothing, LitElement } from 'lit';
import './objecttabs-composition';
import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';
import { TrazitFormsElements } from '../GenericDialogs/TrazitFormsElements'
import {TrazitGenericDialogs} from '../GenericDialogs/TrazitGenericDialogs';
import { LeftPaneFilterViews } from '../Views/LeftPaneFilterViews';
import { ViewDownloadable } from '../Views/ViewDownloadable';
import { ViewReport } from '../Views/ViewReport';
export class ObjectByTabs extends ViewReport(ViewDownloadable(LeftPaneFilterViews(TrazitGenericDialogs(TrazitFormsElements(DialogsFunctions(LitElement)))))) {
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
        --mdc-typography-button-font-size: 14px;
        --mdc-theme-primary: rgb(3, 169, 244);       
      }
      sp-split-view {
        height: calc(100vh - 100px);
        width: 100%;
        --spectrum-dragbar-handle-width:0px;       
      }
      #splitter{
        width:0px;
      }
      .splitter{       
        background-color: blue;
      }
      .sp-split-view.collapsed{
        width: 0;
      }
      #leftSplit {
        padding: 10px;
        background-color:transparent;
        overflow-y: scroll;
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      #leftSplit.collapsed {
        width: 0;
      }

      .resizer {
        background-color: #cbd5e0;
        cursor: ew-resize;
        height: 100%;
        width: 2px;
      }

      div#leftSplit::-webkit-scrollbar {
        width: 8px;
      }

      div#leftSplit::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      div#leftSplit::-webkit-scrollbar-thumb {
        background: #888;
      }

      /* Add a hover effect to the collapse button */
      .collapse-button:hover {
        cursor: pointer;
      }
      
      /* Apply the collapse class to the left side area div when the button is clicked */
      .collapse-button:hover + #leftSplit {
        width: 0;
      }  
      @media screen and (min-width: 992px) {
        #rightSplit{
          padding: 0px;
          background-color:transparent;
          transition: width 0.5s ease-in-out;
          flex: 1;
          display: flex;
          justify-content: start;
        }  
        #rightSplit.collapsed {
          width: 96vw;
        }
      }  
      @media screen and (max-width: 992px) {
        #rightSplit {
          width: 100%;
        }
      }  
            
      #endpointName {
        box-shadow: 16px 14px 20px rgba(20, 78, 117, 0.5);
        overflow-y : auto;
        display: flex;
        flex-direction: column;      
        width: 100%;  
        gap: 12px;  
        padding: 0px 20px;
      }
      .tabs-container {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        padding-left: 10px;
      }
      mwc-textfield {
        width: 100%;
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
            filterResponseData: {type: Array},
            selectedItem:{ type: Object},
            selectedItems:{ type: Array},
            selectedItemLoaded:{type: Boolean},
            leftSplitDisplayed: { type: Boolean },
            filterCurrentData: {type: Object},
            isProcManagement: { type: Boolean },
            moduleVersion: { type: Number },
            moduleName: { type: String },      
            procedureVersion: { type: Number },
            procedureName: { type: String }
      
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
        this.filterResponseData=[]
        this.selectedItem={}
        this.selectedItems=[]
        this.selectedItemLoaded=false
        this.desktop = true
        this.showDivider=true
        this.leftSplitDisplayed=true
        this.filterCurrentData={}
        this.lotDefault='Testing 2023-03-15T21:20:55.962273'//'demo 2023-03-11T22:40:27.243529300'//'demo 2023-03-11T22:29:16.300048300'//'demo 2023-03-11T11:03:06.643535700'//'demo 2023-03-11T21:33:16.786665'
    }

    firstUpdated() {
      const resizer = this.shadowRoot.getElementById("dragMe");
      let leftSide = undefined
      let rightSide = undefined
      if (resizer!==null && resizer!==undefined){
        leftSide = resizer.previousElementSibling;
        rightSide = resizer.nextElementSibling;
      }
      let x = 0;
      let y = 0;
      let leftWidth = 0;
      const mouseDownHandler = function (e) {
        // Get the current mouse position
        x = e.clientX;
        y = e.clientY;
        leftWidth = leftSide.getBoundingClientRect().width;

        // Attach the listeners to document
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      };

      const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - x;
        const dy = e.clientY - y;

        const newLeftWidth = ((leftWidth + dx) * 100) / resizer.parentNode.getBoundingClientRect().width;
        leftSide.style.width = newLeftWidth + '%';

        resizer.style.cursor = 'col-resize';
        document.body.style.cursor = 'col-resize';

        leftSide.style.userSelect = 'none';
        leftSide.style.pointerEvents = 'none';

        rightSide.style.userSelect = 'none';
        rightSide.style.pointerEvents = 'none';
      };

      const mouseUpHandler = function () {
        resizer.style.removeProperty('cursor');
        document.body.style.removeProperty('cursor');

        leftSide.style.removeProperty('user-select');
        leftSide.style.removeProperty('pointer-events');

        rightSide.style.removeProperty('user-select');
        rightSide.style.removeProperty('pointer-events');

        // Remove the handlers of mousemove and mouseup
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };
      if (resizer!==null&&resizer!==undefined){
        resizer.addEventListener('mousedown', mouseDownHandler);
      }
    }

    title() {      
      return html`
        <style>
          .title-banner {
            background-color: #007bff; /* Blue */
            color: #24c0eb; /* White */
            display: flex;
            justify-content: space-between; /* Add space between left and right text */
            align-items: center;
            height: 60px;
            padding: 0 10px; /* Add padding to keep text away from edges */
            position: fixed;
            z-index: 6;       
            width: calc(96vw - 250px);
            transition: width 0.5s ease-in-out;
            background : -moz-linear-gradient(46.71% -341.1% -76deg,rgba(214, 233, 248, 1) 43.85%,rgba(255, 255, 255, 1) 58.66%);
            background : -webkit-linear-gradient(-76deg, rgba(214, 233, 248, 1) 43.85%, rgba(255, 255, 255, 1) 58.66%);
            background : -webkit-gradient(linear,46.71% -341.1% ,53.29% 441.1% ,color-stop(0.4385,rgba(214, 233, 248, 1) ),color-stop(0.5866,rgba(255, 255, 255, 1) ));
            background : -o-linear-gradient(-76deg, rgba(214, 233, 248, 1) 43.85%, rgba(255, 255, 255, 1) 58.66%);
            background : -ms-linear-gradient(-76deg, rgba(214, 233, 248, 1) 43.85%, rgba(255, 255, 255, 1) 58.66%);
            -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#D6E9F8', endColorstr='#FFFFFF' ,GradientType=0)";
            background : linear-gradient(166deg, rgba(214, 233, 248, 1) 43.85%, rgba(255, 255, 255, 1) 58.66%);
            border-radius : 12px;
            -moz-border-radius : 12px;
            -webkit-border-radius : 12px;
            box-shadow : 2.77px 2.77px 4.62px rgba(20, 78, 117, 0.5);
            box-shadow: 16px 14px 20px rgba(20, 78, 117, 0.5);     
            filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=2.77, Off=2.77, Color='#144E75') progid:DXImageTransform.Microsoft.gradient(startColorstr='#D6E9F8',endColorstr='#FFFFFF' , GradientType=1);                  
          }  
          .title-banner.collapsed {
            width: 93.25vw;
          }  
          
          .title-banner .left-text {
            font-size: 12px;
            margin-right: auto; /* Push left text to the very left */
          }
          
          .title-banner .title {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
          }
          
          .title-banner .right-text {
            font-size: 12px;
            margin-left: auto; /* Push right text to the very right */
          }    
        </style>    
        ${this.viewModelFromProcModel.title === undefined ? nothing : html`
        <div class="title-banner ${this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed ? '' : 'collapsed'}">
          <span class="left-text">
          <mwc-icon-button size="s" style="left:22px;" id="expandleftpane" dense raised label=""  icon="${this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed ? 'expand_more' : 'expand_less'}"   @click=${this.toggleLeftSplitPane}></mwc-icon-button>                
          </span>          
            <h1 class="title">
              ${this.viewModelFromProcModel.title["fix_text_"+this.lang]===undefined ? '' :this.viewModelFromProcModel.title["fix_text_"+this.lang]}
              ${this.selectedItem===undefined||this.selectedItem[this.viewModelFromProcModel.title.field_name]===undefined ? '' :this.selectedItem[this.viewModelFromProcModel.title.field_name]}  
            </h1>
          <span class="right-text"></span>
        </div>
        `}
    
  </div>
      `
    }
    toggleLeftSplitPane() {
      this.leftSplitDisplayed = !this.leftSplitDisplayed
    }  
    async filterPerformAction(e, flag) {
        this.filterCurrentData={}
        //this.filterCurrentData=this.jsonParam(this.viewModelFromProcModel)
        console.log("this.filterCurrentData", this.filterCurrentData)
        //let viewParams=this.jsonParam(queryDefinition)
        if (this.filtertext1!==null){
          this.filterCurrentData.filtertext1=this.filtertext1.value
        }
        if (this.filterdaterange1dateStart!==null){
          this.filterCurrentData.filterdaterange1dateStart=this.filterdaterange1dateStart.value
        }
        if (this.filterdaterange1dateEnd!==null){
          this.filterCurrentData.filterdaterange1dateEnd=this.filterdaterange1dateEnd.value
        }

        this.selectedItemLot=""
        await this.GetViewData(false)
        this.filterResponseData=[]
        if (!Array.isArray(this.selectedItems)){        
          this.filterResponseData.push(this.selectedItems)        
        }else{
          this.filterResponseData=this.selectedItems
        }        
        //this.filterElement(this.filterResponseData)
        //console.log('filterResponseData', this.filterResponseData)
        if (!Array.isArray(this.requestData)){
          this.selectedItem=this.requestData;          
        }else{
          if (this.requestData.length===1){
            if (Array.isArray(this.requestData)){
              this.selectedItem=this.requestData[0]
            }else{
              this.selectedItem={}
            }
            this.selectedItemLot=this.selectedItem.lot_name
            this.selectedItemLoaded=true
          }else{
            this.selectedItem=this.requestData[sessionStorage.getItem('specificSearchIndex')];
          }
        }        
    }

    resize(e) {
      const resizer = this.shadowRoot.getElementById("dragMe");
      console.log("resize", resizer);
      const leftSide = resizer.previousElementSibling;
      const rightSide = resizer.nextElementSibling;
      let x = 0;
      let y = 0;
      let leftWidth = 0;
      const mouseDownHandler = function (e) {
        // Get the current mouse position
        x = e.clientX;
        y = e.clientY;
        leftWidth = leftSide.getBoundingClientRect().width;

        // Attach the listeners to document
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      };

      const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - x;
        const dy = e.clientY - y;

        const newLeftWidth = ((leftWidth + dx) * 100) / resizer.parentNode.getBoundingClientRect().width;
        leftSide.style.width = newLeftWidth + '%';

        resizer.style.cursor = 'col-resize';
        document.body.style.cursor = 'col-resize';

        leftSide.style.userSelect = 'none';
        leftSide.style.pointerEvents = 'none';

        rightSide.style.userSelect = 'none';
        rightSide.style.pointerEvents = 'none';
      };

      const mouseUpHandler = function () {
        resizer.style.removeProperty('cursor');
        document.body.style.removeProperty('cursor');

        leftSide.style.removeProperty('user-select');
        leftSide.style.removeProperty('pointer-events');

        rightSide.style.removeProperty('user-select');
        rightSide.style.removeProperty('pointer-events');

        // Remove the handlers of mousemove and mouseup
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };
      resizer.addEventListener('mousedown', mouseDownHandler);
    }

    render() {      
      return html`
      ${this.genericFormDialog()}
        ${this.desktop ?
          html`     
          ${this.viewModelFromProcModel.filter === undefined ? html`              
              ${this.tabsBlock()}  

          ` : html`             
            <sp-split-view show-divider=${this.showDivider}>
              <div style="display:flex; width: 100%; background:transparent;">
                <div id="leftSplit" class="${this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed ? '' : 'collapsed'} container__left">
                  <div id="endpointName">      
                    ${this.viewModelFromProcModel.filter_button === undefined ? nothing : html`
                      <div style="display:flex; justify-content:center;">
                        <sp-button size="m" slot="primaryAction" dialogAction="accept" .viewModelFromProcModel="${this.viewModelFromProcModel}" @click=${this.filterPerformAction}>
                          ${this.viewModelFromProcModel.filter_button["label_" + this.lang]} 
                        </sp-button>
                      </div>
                    `}
                    ${this.viewModelFromProcModel.filter === undefined ? nothing : html`
                      ${this.genericFormElements(this.viewModelFromProcModel.filter, true)} 
                    `}
                  </div>
                  ${this.filterElement(this.filterResponseData)}
                </div>

                <div class="resizer" id="dragMe" style="width: 3px;"></div>

                <div id="rightSplit" class="${this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed ? '' : 'collapsed'} container__right">
                  <div id="document">
                    ${this.tabsBlock()}  
                    <div class="layout horizontal">
                    ${this.viewModelFromProcModel&&this.viewModelFromProcModel.printable&&this.viewModelFromProcModel.printable.active===true ?
                    html`
                      <mwc-icon-button icon="print" @click=${this.printCoa}></mwc-icon-button>                
                    `: nothing}
                
                    ${this.viewModelFromProcModel&&this.viewModelFromProcModel.download&&this.viewModelFromProcModel.download.active===true ?
                      html`    
                      <mwc-icon-button icon="download" @click=${this.downloadDataTableToCSV}></mwc-icon-button>                
                    `: nothing}
                    </div>
                  ${this.viewModelFromProcModel !== undefined && this.viewModelFromProcModel.view_definition !== undefined && this.viewModelFromProcModel ? html`            
                      <objecttabs-composition style="position:relative; left: 30px; top:86px; width:95%; display:block;" .selectedTabModelFromProcModel=${this.viewModelFromProcModel.view_definition.reportElements}
                      .lang=${this.lang} .procedureName=${this.procedureName} .procedureVersion=${this.procedureVersion} .procInstanceName=${this.procInstanceName} .config=${this.config}     
                      .selectedItem=${this.selectedItem}  .viewName=${this.viewName} .filterName=${this.filterName} .viewModelFromProcModel=${this.viewModelFromProcModel}
                      .moduleName=${this.moduleName} .moduleVersion=${this.moduleVersion} ?isProcManagement=${this.isProcManagement}
                      .filterCurrentData=${this.filterCurrentData} @tab-selected="${(e) => { alert("test") }}"> 
                      </objecttabs-composition>              
      
                    `: nothing}
                  </div>
                </div>
              </div>
            </sp-split-view>
          `}
      ` : html`        
        <div id="rightSplit">
        ${this.tabsBlock()}  

        ${this.viewModelFromProcModel !== undefined && this.viewModelFromProcModel.view_definition !== undefined && this.viewModelFromProcModel ? html`
            <objecttabs-composition .selectedTabModelFromProcModel=${this.viewModelFromProcModel.view_definition.reportElements}
              .lang=${this.lang} .procedureName=${this.procedureName} .procedureVersion=${this.procedureVersion} .procInstanceName=${this.procInstanceName} .config=${this.config} .viewName=${this.viewName} .filterName=${this.filterName} 
              .moduleName=${this.moduleName} .moduleVersion=${this.moduleVersion} ?isProcManagement=${this.isProcManagement}
              .selectedItem=${this.selectedProcInstance} .viewModelFromProcModel=${this.viewModelFromProcModel}      
              .filterCurrentData=${this.filterCurrentData} @tab-selected="${(e) => { alert("test") }}">
            </objecttabs-composition>              
          `: nothing}
        </div>
        `
        }
    `;
    }
  
    tabsBlock(){
        //this.resetView()
        return html`
        ${this.viewModelFromProcModel.tabs ?
          html`
            <div class="layout horizontal flex" style="position:relative; top:10px;">
            ${this.viewModelFromProcModel.tabs!==undefined&&this.viewModelFromProcModel.tabs.length>1 ?
            html`
				      <div class="tabs-container">
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
      //console.log("this.filterCurrentData", this.filterCurrentData);
      return html`
        <objecttabs-composition 
          .selectedTabModelFromProcModel=${this.selectedTabModelFromProcModel}
          .viewModelFromProcModel=${this.viewModelFromProcModel} 
          .lang=${this.lang} 
          .config=${this.config}  
          .procInstanceName=${this.procInstanceName} 
          .selectedItem=${this.selectedItem}  
          .viewName=${this.viewName} 
          .procedureName=${this.procedureName} 
          .procedureVersion=${this.procedureVersion} 
          .filterName=${this.filterName} 
          .moduleName=${this.moduleName} 
          .moduleVersion=${this.moduleVersion} 
          ?isProcManagement=${this.isProcManagement} 
          .filterCurrentData=${this.filterCurrentData}
          @tab-selected="${(e) => { alert("test") }}"></objecttabs-composition>     
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
      this.dispatchEvent(new CustomEvent('tab-selected', {        
        bubbles: true,  // Allow event to bubble up through the DOM
        composed: true  // Allow event to cross the shadow DOM boundary
      }));   
      const objectComposition = this.shadowRoot.querySelector('#rightSplit objecttabs-composition')
      if (objectComposition!==null){
        objectComposition.resetFilterIndex(this.selectedTabModelFromProcModel.view_definition[0])          
      }
      this.objecttabsComposition.render()
    }

    
    resetView() {
      //console.log('resetView', 'tabs', this.tabsMainViewModelFromProcModel.tabs, 'master data', this.masterData)
      if (this.objecttabsComposition!==null){
        this.objecttabsComposition.render()
      }
    }
    get objecttabsComposition() {return this.shadowRoot.querySelector("objecttabs-composition")}  
}
window.customElements.define('object-by-tabs', ObjectByTabs);
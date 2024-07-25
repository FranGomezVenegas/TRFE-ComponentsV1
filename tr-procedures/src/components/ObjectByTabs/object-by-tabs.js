import { html, css, nothing, LitElement } from 'lit';
import './objecttabs-composition';
import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';
import { TrazitFormsElements } from '../GenericDialogs/TrazitFormsElements'
import {TrazitGenericDialogs} from '../GenericDialogs/TrazitGenericDialogs';
import { LeftPaneFilterViews } from '../Views/LeftPaneFilterViews';
import { ViewDownloadable } from '../Views/ViewDownloadable';
import { ViewReport } from '../Views/ViewReport';


export class ObjectByTabs extends (ViewReport(ViewDownloadable(LeftPaneFilterViews(TrazitGenericDialogs(TrazitFormsElements(DialogsFunctions(LitElement))))))) {
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
      mwc-button.tabBtnOrig {
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
      .tabBtnOrig.selected {
        --mdc-theme-primary: #1062c5; /* Darker blue for the selected tab */
        background-color: #1062c5; /* Ensure the background is also set */
        color: white; /* Adjust text color for better contrast */
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
        width: 200px;
        display: flex;
        flex-direction: column;
        align-items: end;
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
            
      #endpointName_expanded_true {
        
        box-shadow: inset 6px 20px 49px rgb(167 202 225 / 50%); /* 16px 14px 20px rgba(20, 78, 117, 0.5);*/
        overflow-y : none;
        display: flex;
        flex-direction: column;      
        width: 100%;  
        gap: 12px;  
        padding: 0px 20px;
        left: 16px;
        position:relative;
      }
      #endpointName_expanded_false {
        
        overflow-y : none;
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
      mwc-button.tabBtnOrig {
        background-color: #24C0EB; /* Light blue background */
        font-family: 'Myriad Pro', sans-serif; /* Font family */
        border-radius: 11px; /* Rounded corners */
        border: 2px solid rgb(48, 116, 135); /* Solid border with color */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
        --mdc-typography-button-text-transform: none; /* No uppercase text */
        --mdc-typography-button-font-size: 14px; /* Font size */
        color: white; /* White text color for contrast */
        transition: background-color 0.3s, box-shadow 0.3s; /* Smooth transitions */
      }
      
      .tabBtnOrig:hover {
        background-color: #1aa7d9; /* Slightly darker blue on hover */
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover */
      }
      
      .tabBtnOrig.selected {
        --mdc-theme-primary: #1062c5; /* Darker blue for the selected tab */
        background-color: #1062c5; /* Ensure the background is also set */
        color: white; /* Adjust text color for better contrast */
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); /* Slightly deeper shadow */
      }
      
      .tabBtnOrig:active { 
        background-color: #0d5aa7; /* Darker blue on active/pressed */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Reduce shadow on active */
      }
      #leftSplit {
        padding: 10px;
        background-color: #95c3eeb0; /* Base color */
        background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                          radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        background-size: 20px 20px; /* Adjust size to create a subtle pattern */
        background-position: 0 0, 10px 10px;
        overflow-y: scroll;
        width: 17%;
        display: flex;
        flex-direction: column;
        align-items: end;
      }
      mwc-button.tabBtn {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        min-width: 64px;
        padding: 12px 24px;
        border: none;
        outline: none;
        line-height: inherit;
        user-select: none;
        appearance: none;
        overflow: hidden;
        vertical-align: middle;
        background: linear-gradient(79deg, #4668db, #9d70cd); /* Gradient background */
        color: #fff; /* White text */
        font-size: 16px; /* Font size */
        font-weight: 600; /* Font weight */
        border-radius: 50px; /* Rounded corners */
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        cursor: pointer; /* Pointer cursor */
        transition: transform 0.3s, box-shadow 0.3s; /* Smooth transitions */
        --mdc-theme-primary: transparent;
        --mdc-typography-button-font-family: Montserrat;
        /* Or use general CSS */
        font-family: Montserrat;        
    }
    
    mwc-button.tabBtn:hover {
        transform: translateY(-3px); /* Slight lift effect on hover */
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
        --mdc-theme-primary: transparent;
    }
    
    mwc-button.tabBtn.selected {
        transform: translateY(0); /* Reset lift effect */
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Reduced shadow on active */
        background: linear-gradient(79deg, #384c8e, #29064e); /* Gradient background */
        --mdc-theme-primary: transparent;
       
    }
    
    mwc-button.tabBtn:focus {
        outline: none; /* Remove default focus outline */
        box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.5); /* Custom focus outline */
    }
    
    mwc-button.tabBtn::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300%;
        height: 300%;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.5s;
    }
    
    mwc-button.tabBtn:active::before {
        transform: translate(-50%, -50%) scale(1);
        transition: transform 0s;
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
            procedureName: { type: String },
            showDivider: { type: Boolean },
            hideLeftPane: { type: Boolean },
            selectedTab: { type: Object },
            isLeftPaneExpanded: { type: Boolean },
            selectedItemInView: { type: Object },
        }
    }
    constructor() {
        super()
        this.isLeftPaneExpanded = true;
        this.selectedTab = null;
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
        this.hideLeftPane=false
        this.showDivider=true
        this.leftSplitDisplayed=true
        this.filterCurrentData={}
        this.selectedItemInView={}        
    }

    firstUpdated() {
      //alert(this.viewModelFromProcModel.hideLeftPane)
      if (this.viewModelFromProcModel.hideLeftPane!==undefined){
        this.hideLeftPane=this.viewModelFromProcModel.hideLeftPane
        this.filterPerformAction()
      }

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
    startDrag(e) {
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
    }
  
    onDrag(e) {
      // Logic to resize the split view panels based on mouse movement
      // This typically involves adjusting the width or height of the panels
    }
  
    stopDrag(e) {
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.stopDrag);
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

      //alert('filterPerformAction')
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
    toggleLeftPane() {
      this.isLeftPaneExpanded = !this.isLeftPaneExpanded;
      const leftPaneWidth = this.isLeftPaneExpanded ? '250px' : '30px';
      this.shadowRoot.querySelector('#leftSplit').style.width = leftPaneWidth;
      // if (this.isLeftPaneExpanded){
      //   this.shadowRoot.querySelector('#leftSplit').style.display='block'
      // }else{
      //   this.shadowRoot.querySelector('#leftSplit').style.dipslay='none'
      // }
    }
    handleKeyDown(event) {
      if (event.key === 'Enter') {
        this.filterPerformAction();
      }
    }
    
    render() {
      return html`
        ${this.genericFormDialog()}

        ${this.desktop
          ? html`
              ${this.viewModelFromProcModel.filter === undefined
                ? html`
                    ${this.tabsBlock()}
                  `
                : html`
                    <style>
                      .split-view {
                        display: flex;
                        /* Other styles for your split view */
                      }

                      .divider {
                        background-color: #ccc; /* Light grey color */
                        width: 8px; /* Increase the width to make it more noticeable */
                        cursor: ew-resize; /* Change the cursor to indicate it can be dragged */
                        position: relative;
                        z-index: 1; /* Ensure it's above other content */
                      }

                      .divider::before {
                        content: '';
                        position: absolute;
                        left: -4px; /* Adjust for a larger clickable area */
                        right: -4px; /* Adjust for a larger clickable area */
                        top: 0;
                        bottom: 0;
                        background-color: transparent; /* Transparent, but clickable */
                      }

                      .divider:hover {
                        background-color: #aaa; /* Darker grey on hover */
                      }

                      .divider:active {
                        background-color: #888; /* Even darker grey when actively being dragged */
                      }
                      .searchbutton{
                        background: -webkit-linear-gradient(79deg, #4668db, #9d70cd); /* Para Chrome y Safari */
                        background: -moz-linear-gradient(79deg, #4668db, #9d70cd); /* Para Firefox */
                        background: -o-linear-gradient(79deg, #4668db, #9d70cd); /* Para Opera */
                        background: linear-gradient(79deg, #4668db, #9d70cd); /* Estándar */
                        color:white;                        
                      }
                    </style>
                    <sp-split-view show-divider=${this.showDivider} class="split-view" >
                      <div style="display:flex; width: 100%; background:transparent;">
                        <div id="leftSplit" style=${this.hideLeftPane ? 'display: none;' : ''}
                        class="${this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed ? '' : 'collapsed'} container__left">
                          <div id="endpointName_expanded_${this.isLeftPaneExpanded}">
                            ${this.viewModelFromProcModel.filter_button === undefined
                              ? nothing
                              : html`
                                  <div style="display:flex;">
                                    <mwc-icon-button id="expandleftpane" icon="${this.isLeftPaneExpanded ? 'chevron_left' : 'chevron_right'}" @click=${this.toggleLeftPane}></mwc-icon-button>
                                    <div class="search-container" style="padding-bottom:8px;">
                                      <sp-button size="m" slot="primaryAction" class="searchbutton" dialogAction="accept" .viewModelFromProcModel="${this.viewModelFromProcModel}" @click=${this.filterPerformAction}>
                                        ${this.viewModelFromProcModel.filter_button["label_" + this.lang]}
                                      </sp-button>
                                    </div>
                                    ${this.viewModelFromProcModel.left_panel === undefined
                                      ? nothing
                                      : html`
                                          <div style="flex-basis: auto; width: auto;">
                                            ${this.getButton(this.viewModelFromProcModel.left_panel, {}, true)}
                                          </div>
                                        `}
                                  </div>
                                `}
                            ${this.viewModelFromProcModel.filter === undefined || this.isLeftPaneExpanded === false
                              ? nothing
                              : html`
                                  ${this.genericFormElements(this.viewModelFromProcModel.filter, true, this.handleKeyDown)}
                                `}
                          </div>
                          ${this.filterElement(this.filterResponseData)}
                        </div>
                        <div class="resizer" id="dragMe" style="width: 15px;"></div>
                        <div id="rightSplit" class="${this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed ? '' : 'collapsed'} container__right">
                          <div id="document" style="width: 100%;">
                            ${this.tabsBlock()}
                            <div class="layout horizontal">
                              ${this.viewModelFromProcModel && this.viewModelFromProcModel.printable && this.viewModelFromProcModel.printable.active === true
                                ? html`
                                    <mwc-icon-button icon="print" @click=${this.printCoa}></mwc-icon-button>
                                  `
                                : nothing}
                              ${this.viewModelFromProcModel && this.viewModelFromProcModel.download && this.viewModelFromProcModel.download.active === true
                                ? html`
                                    <mwc-icon-button icon="download" @click=${this.downloadDataTableToCSV}></mwc-icon-button>
                                  `
                                : nothing}
                            </div>
                            ${this.viewModelFromProcModel !== undefined && this.viewModelFromProcModel.view_definition !== undefined && this.viewModelFromProcModel
                              ? html`
                                  <objecttabs-composition style="position:relative; left: 30px; top:86px; width:95%; display:block;" .selectedTabModelFromProcModel=${this.viewModelFromProcModel.view_definition.reportElements}
                                    .lang=${this.lang} .procedureName=${this.procedureName} .procedureVersion=${this.procedureVersion} .procInstanceName=${this.procInstanceName} .config=${this.config}
                                    .selectedItem=${this.selectedItem} .viewName=${this.viewName} .filterName=${this.filterName} .viewModelFromProcModel=${this.viewModelFromProcModel}
                                    .moduleName=${this.moduleName} .moduleVersion=${this.moduleVersion} ?isProcManagement=${this.isProcManagement}
                                    .filterCurrentData=${this.filterCurrentData} @tab-selected="${(e) => { alert('test') }}"
                                    .selectedItemInView=${this.selectedItemInView}>
                                  </objecttabs-composition>
                                `
                              : nothing}
                          </div>
                        </div>
                      </div>
                    </sp-split-view>
                  `}
            `
          : html`
              <div id="rightSplit">
                ${this.tabsBlock()}
                ${this.viewModelFromProcModel !== undefined && this.viewModelFromProcModel.view_definition !== undefined && this.viewModelFromProcModel
                  ? html`
                      <objecttabs-composition .selectedTabModelFromProcModel=${this.viewModelFromProcModel.view_definition.reportElements}
                        .lang=${this.lang} .procedureName=${this.procedureName} .procedureVersion=${this.procedureVersion} .procInstanceName=${this.procInstanceName} .config=${this.config}
                        .viewName=${this.viewName} .filterName=${this.filterName} .moduleName=${this.moduleName} .moduleVersion=${this.moduleVersion} ?isProcManagement=${this.isProcManagement}
                        .selectedItem=${this.selectedProcInstance} .viewModelFromProcModel=${this.viewModelFromProcModel} .filterCurrentData=${this.filterCurrentData} @tab-selected="${(e) => { alert('test') }}">
                      </objecttabs-composition>
                    `
                  : nothing}
              </div>
            `}
      `;
    }
  
    tabsBlock() {
      return html`
        ${this.viewModelFromProcModel.tabs ? html`
          <div class="layout horizontal flex" style="position:relative; top:10px;">
            ${this.viewModelFromProcModel.tabs.length > 1 ? html`
              <div class="tabs-container">
                ${this.viewModelFromProcModel.tabs.map(t => html`
                  <mwc-button
                    class="tabBtn ${this.selectedTab === t ? 'selected' : ''}"
                    dense
                    unelevated
                    .label=${t["tabLabel_" + this.lang]}
                    @click=${() => this.selectTab(t)}>
                  </mwc-button>
                `)}
              </div>
            ` : nothing}
            ${this.selectedTabContent('tabs')}
          </div>
        ` : html`
          ${this.viewModelFromProcModel.view_definition ? html`
            ${this.selectedTabContent('view_definition')}          
        `:      
        nothing}
        `}
      `;
    }
    
    selectedTabContent(type) {
      if (type==='tabs'){
        if (Object.keys(this.selectedTabModelFromProcModel).length === 0) {
          this.selectedTabModelFromProcModel = this.viewModelFromProcModel.tabs[0];
        }
      }
      if (type==='view_definition'){
        this.selectedTabModelFromProcModel = this.viewModelFromProcModel.view_definition
      }
      //console.log('selectedTabContent', this.viewName, this.selectedTabModelFromProcModel)
      //console.log("this.filterCurrentData", this.filterCurrentData);
      return html`
        <objecttabs-composition 
          style="padding: 20px; left: 50px; width: 90%; position: relative; display: block; "
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
          .selectedItemInView=${this.selectedItemInView}
          @tab-selected="${(e) => { alert('test') }}">
        </objecttabs-composition>     
      `;
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
      this.selectedTab = tab;
      this.requestUpdate();
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
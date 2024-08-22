import { html, css, nothing, LitElement } from 'lit';
import '../ObjectByTabs/object-by-tabs';
import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';

export class TabsMainView extends DialogsFunctions(LitElement) {
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

            config: { type: Object },
            procName: { type: String },
            ready:{type: Boolean},
            viewName: { type: String },
            filterName: { type: String },
            lang: { type: String },
            procInstanceName:{type: String},
            masterData:{ type: Object},
            selectedItems: { type: Array },
            selectedTab: {type: Object}
        }
    }
    constructor() {
        super()
        this.viewModelFromProcModel={} 
        this.tabsMainViewModelFromProcModel={}
        this.selectedTab={}
        this.ready=false;
        this.config={}
        this.masterData={} 
        this.selectedItems=[]
    }
    render() {        
        return html`        
        ${this.viewModelFromProcModel ? 
        html`
            ${this.tabsBlock()}              
        `: nothing}`
    }
    tabsBlock(){
        return html`
        ${this.tabsMainViewModelFromProcModel.tabs ?
          html`
            <div class="layout vertical flex">
              <div class="layout horizontal flex">
                ${this.tabsMainViewModelFromProcModel.tabs.map(t => 
                  html`
                  <mwc-button
                    class="tabBtn ${this.selectedTab === t ? 'selected' : ''}"

                    dense unelevated 
                      .label=${t.tabLabel["label_"+ this.lang]}
                      @click=${()=>this.loadSelectTab(t)}></mwc-button>
                  `
                )}
              </div>
              <object-by-tabs .windowOpenable=${this.windowOpenable} .sopsPassed=${this.sopsPassed} .lang=${this.lang}
                .procInstanceName=${this.procName} .desktop=${this.desktop} .viewName=${this.viewName} .filterName=${this.filterName} 
                .model=${this.tabsMainViewModelFromProcModel}
                .config=${this.config}></object-by-tabs>               
            </div>
          ` : nothing
        }
        `
    }
    firstUpdated() {
      if (this.objectByTabs) {
          const initialTab = this.tabsMainViewModelFromProcModel.tabs[0];
          if (initialTab) {
              this.objectByTabs.changeModel(initialTab);
          }
      }
    }
    loadSelectTab(tab) {
      this.selectedTab = tab;
      this.requestUpdate();
      this.viewModelFromProcModel = tab;
      this.dispatchEvent(new CustomEvent('tab-selected', {        
          bubbles: true,
          composed: true
      }));
      if (this.objectByTabs !== null) {
          this.objectByTabs.changeModel(tab);  // Use the changeModel method to update the model
      }
    }      
    get objectByTabs() {return this.shadowRoot.querySelector("object-by-tabs")}  
}
window.customElements.define('tabs-main-view', TabsMainView);
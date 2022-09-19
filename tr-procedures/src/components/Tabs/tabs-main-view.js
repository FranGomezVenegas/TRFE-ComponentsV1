import { html, css, nothing, LitElement } from 'lit';
import('../grid_with_buttons/grid-with-buttons');
import './tabs-composition';
export class TabsMainView extends LitElement {

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
    
        }
    }
    constructor() {
        super()
        this.viewModelFromProcModel={} 
        this.tabsMainViewModelFromProcModel={}

        this.ready=false;
        this.config={}
  
    }
    render() {        
        return html`        
        ${this.viewModelFromProcModel ? 
        html`
            ${this.tabsBlock()}              
        `: nothing}`
    }
    tabsBlock(){
        this.resetView()
        return html`
        ${this.tabsMainViewModelFromProcModel.tabs ?
          html`
            <div class="layout vertical flex">
              <div class="layout horizontal flex">
                ${this.tabsMainViewModelFromProcModel.tabs.map(t => 
                  html`
                    <mwc-button class="tabBtn" dense unelevated 
                      .label=${t.langConfig.tab["label_"+ this.lang]}
                      @click=${()=>this.selectTab(t)}></mwc-button>
                  `
                )}
              </div>
              <tabs-composition 
                .lang=${this.lang}
                .windowOpenable=${this.windowOpenable}
                .sopsPassed=${this.sopsPassed}
                .procInstanceName=${this.procInstanceName}             
                .viewName=${this.viewName}  .viewModelFromProcModel=${this.viewModelFromProcModel}
                .config=${this.config}>${this.defaultTab()}</tabs-composition>
            </div>
            
          ` : nothing
        }
        `
    }
    defaultTab(){
    if (this.tabsComposition!=null){
        console.log('defaultTab')
        // this.tabsComposition.ready=false
        // this.tabsComposition.viewModelFromProcModel=this.viewModelFromProcModel.tabs[0]
        if (this.viewModelFromProcModel===undefined){
            this.viewModelFromProcModel=this.tabsMainViewModelFromProcModel.tabs[0]
        }
        this.openTabViewContent()
    }

    }
    selectTab(tab) {
    console.log('selectTab', tab)
    //this.tabsComposition.viewModelFromProcModel = tab
    this.viewModelFromProcModel=tab
    this.openTabViewContent()
    // this.tabsComposition.ready=false
    // this.tabsComposition.render()
    //this.tabsComposition.reload()
    //this.tabsComposition.grid.
    }

    openTabViewContent(){
        import('../grid_with_buttons/grid-with-buttons') 
        console.log('openTabViewContent', 'this.viewModelFromProcModel', this.viewModelFromProcModel)
        this.tabsComposition.ready=false
        if (this.GridWithButtons!==null){
            this.GridWithButtons.ready=false
        }
        return html`
            <grid-with-buttons id="gridwithbuttons" .viewModelFromProcModel=${this.viewModelFromProcModel} viewName=${this.viewName} 
                filterName=${this.filterName} procInstanceName=${this.procName} lang=${this.lang}
                .config=${this.config} .reqParams=${this.reqParams} ?ready="false">
            </grid-with-buttons>
        `
    }

    resetView() {
        if (this.viewModelFromProcModel===undefined||this.viewModelFromProcModel.component===undefined){return}
        switch(this.viewModelFromProcModel.component){
          case 'GridWithButtons':
          case 'TableWithButtons':        
            import('../grid_with_buttons/grid-with-buttons')            
            if (this.GridWithButtons!==null){
              this.GridWithButtons.ready=false
            }        
            //alert('grid')
            return
        //   case 'Tabs':
        //     import('./components/Tabs/tabs-main-view')
        //     return
        //   case 'ModuleEnvMonitProgramProc':
        //     import('./module_env_monit/program-proc')
        //     return
        //   case 'EnvMonitBrowser':
        //     import('./browser/browser-view')
        //     return
        //   case 'DataMining':
        //     import('./data_mining/datamining-mainview')
        //     return
        //   case 'ModuleGenomaProjectWindow':
        //     import('./module_genoma/genoma-project')
        //     return
        //   case 'ModuleSampleLogSample':
        //     import('./module_sample/log-sample-module-sample')
        //     return
          default:
            alert('In tabs-main-view component, Not found component '+this.viewModelFromProcModel.component)
            return
        }
      }
    
      get tabsComposition() {return this.shadowRoot.querySelector("tabs-composition")}  
      get GridWithButtons() {return this.shadowRoot.querySelector("grid-with-buttons#gridwithbuttons")}  
}
window.customElements.define('tabs-main-view', TabsMainView);
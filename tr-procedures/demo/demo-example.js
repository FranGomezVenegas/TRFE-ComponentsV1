import { LitElement, html, css } from 'lit-element';
import { getUserSession } from '@trazit/platform-login';
import '@trazit/platform-login/platform-login';
import '../tr-procedures';
import '../../ProcManagement/proc-management-home';
import '@material/mwc-icon-button';
import '@material/mwc-ripple';
import { ProceduresModel, DemoViews } from '../src/ProceduresModel';


class DemoExample extends LitElement {
  static get styles() {
    return css`
        div[hidden] {
          display: none;
        }
      `
  }

  static get properties() {
    return {
      auth: { type: Boolean },
      hideAllButtonsStatus: { type: Boolean },
      flag: { type: String },
      userRole: { type: String }
    }
  }

  constructor() {
    super();
    this.hideAllButtonsStatus=true;
    this.auth = false;
    this.flag = "es";
    this.userRole='';
  }
  hideActionButton(proc){
    if (proc===undefined) return false
    //alert(proc)
    let sessionProcs=JSON.parse(sessionStorage.getItem("userSession"))
    if (sessionProcs===null) return false
    let findProc = sessionProcs.procedures_list.procedures.filter(m => m.procInstanceName == proc)
//    console.log('hideAllButtons', 'proc', proc, 'findProc', findProc)
    return (findProc===undefined||findProc.length==0)
  }
  toggleHideAllButtonsStatus(){
    this.hideAllButtonsStatus=!this.hideAllButtonsStatus
  }
  hideAllButtons(){
    return !this.hideAllButtonsStatus
  }

  render() {
    return html`
      <platform-login @authorized=${e=>{
        this.auth=e.target.auth;
        if (this.auth) {
        //if (this.userRole!==undefined&&this.userRole.length>0&&this.userRole!=='proc_management'){
          this.trProc.config=this.pLogin.config;
          if (this.trProcManagement){
            this.trProcManagement.config=this.pLogin.config;
            console.log('this.trProcManagement.config', this.trProcManagement.config)
            //this.trProc.resetView()
            //this.trProc.authorized()
            //this.trProc.render()
        
          }
        }
      }}></platform-login>

      <div ?hidden="${!this.auth}">
        <h1 @click=${this.toggleHideAllButtonsStatus}>Hi ${this.getUser()}, you are authorized</h1>
        <button @click=${this.changeLang}><img .src="/images/${this.flag}.png" style="width:30px"></button>
        <button @click=${()=>this.pLogin.logout()}>Logout</button><hr>

        ${this.userRole==="proc_management" ?
        html`
          <proc-management-home></proc-management-home>
        `:html` 
        <div ?hidden="${this.hideAllButtons()}" id="allButons">  
        
        ${DemoViews.map(cur =>
          html`<button ?hidden="${this.hideActionButton(cur.proc_instance_name)}" 
            @click=${()=>this.selectMenu(cur.proc_instance_name, cur.view_name, cur.filter_name)}>${cur.title}</button>
          `
        )}

        <button ?hidden="${this.hideActionButton("em-demo-a")}" @click=${()=>this.selectMenu("em-demo-a", "Home", "Home")}>Home</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "LogSamples", "SampleLogin")}>Log Samples</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "ProductionLots", "SampleLot")}>Production Lots</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SamplePendingSampling", "SamplingSMP")}>Samples Sampling </button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SamplePendingSampling", "SamplingPERS")}>Personel Sampling</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SamplePendingSamplingInterval", "SamplingSMP")}>Samples Sampling (Interval)</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SamplePendingSamplingInterval", "SamplingPERS")}>Personel Sampling (Interval)</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SamplePlateReading", "PlateReadingSMP")}>Sample Plate Reading</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SamplePlateReading", "PlateReadingPERS")}>Personel Plate Reading</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SamplePlateReadingSecondEntry", "PlateReadingSecondEntrySMP")}>Sample Plate Reading SecondEntry</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SamplePlateReadingSecondEntry", "PlateReadingSecondEntryPERS")}>Personel Plate Reading SecondEntry</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SampleIncubation", "Incubation")}>Sample Incubation</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SampleMicroorganism", "MicroOrganismSMP")}>Sample Microorganism </button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SampleMicroorganism", "MicroOrganismPERS")}>Personel Microorganism</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "Programs", "Programs")}>Program</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "Deviation", "Deviation")}>Deviation</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "Browser", "Browser")}>Browser</button><br>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "DataMining", "DataMining")}>Data Mining</button><br>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "Incubators", "Incubators")}>Incubators</button><br>

          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "Home", "Home")}>Home</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "LogSamples", "SampleLogin")}>Log Samples (proc)</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "ProductionLots", "SampleLot")}>Production Lots (proc)</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "SamplePending", "sampling")}>Sampling</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "SampleEnterResult", "ER-FQ")}>FQ</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "SampleEnterResult", "ER-MB")}>MB</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "ReviewTesting", "RT-FQ")}>RT FQ</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "ReviewTesting", "RT-MB")}>RT MB</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "ReviewTestingGroup", "RTG-FQ")}>RTG FQ</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "ReviewTestingGroup", "RTG-MB")}>RTG MB</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "ReviewSample", "Review")}>Review Sample</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "Programs", "Programs")}>Program</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "Deviation", "Deviation")}>Deviation</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "Browser", "Browser")}>Browser</button><br>

          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("app-proc", "PlatformInstruments", "InstrumentsList")}>Instruments List</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("app-proc", "EventsInProgress", "EventsER")}>Events In Progress</button><br>

          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("app-instruments", "PlatformInstruments", "InstrumentsList")}>Instruments List</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("app-instruments", "EventsInProgress", "EventsER")}>Events In Progress</button><br>

          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("app", "WhiteIpList", "WhiteIpList")}>White IPs List</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("app", "BlackIpList", "BlackIpList")}>Black IPs List</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("app", "PlatformBusRules", "PlatformBusRules")}>Platform Business Rules</button><br>

          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("genoma-1", "ProjectManager", "ProjectManager")}>Genoma-ProjectManager</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("genoma-1", "StudyVariableValues", "StudyVariableValues")}>Genoma-StudyVariableValues</button><br>

          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "LogSamplesModuleSamples", "SampleLogin")}>sample-coa logSamples</button><br>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "SampleEnterResult", "ER-FQ")}>sample-coa-rel1 FQ</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "SampleEnterResult", "ER-MB")}>sample-coa-rel1 MB</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "ReviewTesting", "RT-FQ")}>sample-coa-rel1 RT FQ</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "ReviewTesting", "RT-MB")}>sample-coa-rel1 RT MB</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "ReviewTestingGroup", "RTG-FQ")}>sample-coa-rel1 RTG FQ</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "ReviewTestingGroup", "RTG-MB")}>sample-coa-rel1 RTG MB</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "ReviewSample", "Review")}>sample-coa-rel1 Review Sample</button><br>

          Inv-Draft<br>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("inv-draft", "InventoryLots", "InventoryLots.1")}>InventoryLots</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("inv-draft", "InventoryLotsReactivos", "InventoryLotsReactivos")}>Issues</button>
          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("inv-draft", "Issues", "Issues")}>Issues</button>

          <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "culture-medium", "culture-medium")}>culture-medium</button>
          
<!--          <button @click=${this.changeLang}><img .src="/images/${this.flag}.png" style="width:30px"></button>
          <button @click=${()=>this.pLogin.logout()}>Logout</button><hr> -->
          </div>
          <tr-procedures></tr-procedures>          
          ${this.openTestDefaultView()}
        </div>
      `}
    `;
  }

  openTestDefaultView(){    
    console.log('openTestDefaultView', this.pLogin)
    if (this.pLogin&&this.pLogin.config&&this.pLogin.config.local&&this.pLogin.config.localDefaultView){
      this.hideAllButtonsStatus=true
      this.selectMenu(this.pLogin.config.localDefaultView.procName, this.pLogin.config.localDefaultView.viewName, this.pLogin.config.localDefaultView.filterName)
      return
    }
  }
  selectMenu(proc, sample, filter) {
    this.trProc.ready = false
    this.trProc.procName = proc
    this.trProc.viewName = sample
    this.trProc.filterName = filter
    this.trProc.resetView()
    this.trProc.authorized()
    this.trProc.render()
  }

  get pLogin() {    return this.shadowRoot.querySelector("platform-login")  }
  get trProc() {    return this.shadowRoot.querySelector("tr-procedures")  }
  get trProcManagement() {    return this.shadowRoot.querySelector("proc-management-home")  }
  

  /**
   * Lifecycle called after DOM updated on the first time
   * Pulling the app config and waiting for the sts state
   */
  firstUpdated() {
    fetch("./config.json").then(r => r.json()).then(j => {
      this.pLogin.config = j
    })
    if (this.auth) {
      let session = getUserSession()
      this.userRole=session.userRole
      //this.trProc.render()
    }

  }

  getUser() {
    if (this.auth) {
      let session = getUserSession()
      this.userRole=session.userRole
      return session.header_info.first_name +" "+ session.header_info.last_name +"("+ session.userRole +")"
      
    }
  }

  changeLang() {
    this.flag = this.trProc.changeLang()
  }
}
customElements.define('demo-example', DemoExample);

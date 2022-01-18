import { LitElement, html, css } from 'lit-element';
import { getUserSession } from '@trazit/platform-login';
import '@trazit/platform-login/platform-login';
import '../tr-procedures';

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
      flag: { type: String }
    }
  }

  constructor() {
    super();
    this.auth = false;
    this.flag = "es";
  }

  render() {
    return html`
      <platform-login @authorized=${e=>{
        this.auth=e.target.auth;
        this.trProc.config=this.pLogin.config;
      }}></platform-login>
      <div ?hidden="${!this.auth}">
        <h1>Hi ${this.getUser()}, you are authorized</h1>
        <button @click=${()=>this.selectMenu("em-demo-a", "LogSamples", "SampleLogin")}>Log Samples</button>
        <button @click=${()=>this.selectMenu("em-demo-a", "ProductionLots", "SampleLot")}>Production Lots</button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SamplePendingSampling", "SamplingSMP")}>Samples Sampling </button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SamplePendingSampling", "SamplingPERS")}>Personel Sampling</button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SamplePendingSamplingInterval", "SamplingSMP")}>Samples Sampling (Interval)</button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SamplePendingSamplingInterval", "SamplingPERS")}>Personel Sampling (Interval)</button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SamplePlateReading", "PlateReadingSMP")}>Sample Plate Reading</button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SamplePlateReading", "PlateReadingPERS")}>Personel Plate Reading</button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SampleIncubation", "Incubation")}>Sample Incubation</button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SampleMicroorganism", "MicroOrganismSMP")}>Sample Microorganism </button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SampleMicroorganism", "MicroOrganismPERS")}>Personel Microorganism</button>
        <button @click=${()=>this.selectMenu("em-demo-a", "Programs", "Programs")}>Program</button>
        <button @click=${()=>this.selectMenu("em-demo-a", "Deviation", "Deviation")}>Deviation</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "LogSamples", "SampleLogin")}>Log Samples (proc)</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "ProductionLots", "SampleLot")}>Production Lots (proc)</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "SamplePending", "sampling")}>Sampling</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "SampleEnterResult", "ER-FQ")}>FQ</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "SampleEnterResult", "ER-MB")}>MB</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "ReviewTesting", "RT-FQ")}>RT FQ</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "ReviewTesting", "RT-MB")}>RT MB</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "ReviewTestingGroup", "RTG-FQ")}>RTG FQ</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "ReviewTestingGroup", "RTG-MB")}>RTG MB</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "ReviewSample", "Review")}>Review Sample</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "Programs", "Programs")}>Program</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "Deviation", "Deviation")}>Deviation</button>
        <button @click=${()=>this.selectMenu("app-proc", "PlatformInstruments", "InstrumentsList")}>Instruments List</button>
        <button @click=${()=>this.selectMenu("app-proc", "EventsInProgress", "EventsER")}>Events In Progress</button>
        <tr-procedures></tr-procedures><hr>
        <button @click=${()=>this.pLogin.logout()}>Logout</button>
      </div>
    `;
  }

  selectMenu(proc, sample, filter) {
    this.trProc.procName = proc
    this.trProc.viewName = sample
    this.trProc.filterName = filter
    this.trProc.resetView()
    this.trProc.render()
    this.trProc.authorized()
  }

  get pLogin() {
    return this.shadowRoot.querySelector("platform-login")
  }

  get trProc() {
    return this.shadowRoot.querySelector("tr-procedures")
  }

  /**
   * Lifecycle called after DOM updated on the first time
   * Pulling the app config and waiting for the sts state
   */
  firstUpdated() {
    fetch("./config.json").then(r => r.json()).then(j => {
      this.pLogin.config = j
    })
  }

  getUser() {
    if (this.auth) {
      let session = getUserSession()
      return session.header_info.first_name +" "+ session.header_info.last_name +"("+ session.userRole +")"
    }
  }

  changeLang() {
    this.flag = this.trProc.changeLang()
  }
}
customElements.define('demo-example', DemoExample);

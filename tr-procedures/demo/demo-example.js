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
        <button @click=${()=>this.selectMenu("em-demo-a", "SamplePendingSampling", "SamplingSMP")}>Samples Sampling </button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SamplePendingSampling", "SamplingPERS")}>Personel Sampling</button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SamplePlateReading", "PlateReadingSMP")}>Sample Plate Reading</button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SamplePlateReading", "PlateReadingPERS")}>Personel Plate Reading</button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SampleIncubation", "active_batches")}>Sample Incubation</button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SampleMicroorganism", "MicroOrganismSMP")}>Sample Microorganism </button>
        <button @click=${()=>this.selectMenu("em-demo-a", "SampleMicroorganism", "MicroOrganismPERS")}>Personel Microorganism</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "SamplePending", "sampling")}>Sampling</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "SampleEnterResult", "ER-FQ")}>FQ</button>
        <button @click=${()=>this.selectMenu("proc-deploy", "SampleEnterResult", "ER-MB")}>MB</button>
        <tr-procedures></tr-procedures><hr>
        <button @click=${()=>this.pLogin.logout()}>Logout</button>
      </div>
    `;
  }

  selectMenu(proc, sample, filter) {
    this.trProc.procName = proc
    this.trProc.sampleName = sample
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

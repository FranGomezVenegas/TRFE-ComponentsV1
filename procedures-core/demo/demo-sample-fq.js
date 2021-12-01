import { LitElement, html, css } from 'lit-element';
import { getUserSession } from '@trazit/platform-login';
import '@trazit/platform-login/platform-login';
import '../sample-fq';

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
      <platform-login @authorized=${e=>{this.auth=e.target.auth;this.fqSample.config=this.pLogin.config;this.mbSample.config=this.pLogin.config}}></platform-login>
      <div ?hidden="${!this.auth}">
        <h1>Hi ${this.getUser()}, you are authorized</h1>
        <sample-fq id="s"></sample-fq><hr>
        <sample-fq id="p" name="mb"></sample-fq><br>
        <button @click=${()=>this.pLogin.logout()}>Logout</button>
      </div>
    `;
  }

  get pLogin() {
    return this.shadowRoot.querySelector("platform-login")
  }

  get fqSample() {
    return this.shadowRoot.querySelector("sample-fq#s")
  }

  get mbSample() {
    return this.shadowRoot.querySelector("sample-fq#p")
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
    this.flag = this.fqSample.changeLang()
  }
}
customElements.define('demo-example', DemoExample);

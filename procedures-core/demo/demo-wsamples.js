import { LitElement, html, css } from 'lit-element';
import { getUserSession } from '@trazit/platform-login';
import '@trazit/platform-login/platform-login';
import '../water-sampling';

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
      <platform-login @authorized=${this.authorized}></platform-login>
      <div ?hidden="${!this.auth}">
        <h1>Hi ${this.getUser()}, you are authorized</h1>
        <water-sampling></water-sampling><hr>
        <button @click=${()=>this.pLogin.logout()}>Logout</button>
      </div>
    `;
  }

  authorized(e) {
    let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
    let anyWater = procList.filter(p => p.label_en.indexOf("Water") >= 0)
    if (anyWater.length) {
      this.auth = e.target.auth
      this.wSampling.config = this.pLogin.config
    } else {
      alert("You don't have any access to Water procedures")
      this.pLogin.logout()
    }
  }

  get pLogin() {
    return this.shadowRoot.querySelector("platform-login")
  }

  get wSampling() {
    return this.shadowRoot.querySelector("water-sampling")
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
    this.flag = this.sSampling.changeLang()
  }
}
customElements.define('demo-example', DemoExample);

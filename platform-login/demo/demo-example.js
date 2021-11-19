import { LitElement, html, css } from 'lit-element';
import { getUserSession } from '../';
import '../platform-login';

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
      businessRules: { type: Object }
    }
  }

  constructor() {
    super();
    this.auth = false;
    this.businessRules = {
      "enableLockSession": true,
      "minsLockSession": 10,
      "enableLogoutSession": true,
      "minsLogoutSession": 15,
      "secondsNextTimeChecker": 60
    }
  }

  render() {
    return html`
      <platform-login @authorized=${e=>this.auth=e.target.auth} 
        localBusinessRules=true
        .businessRules=${this.businessRules}></platform-login>
      <div ?hidden="${!this.auth}">
        <h1>Hi ${this.getUser()}, you are authorized</h1>
        <button @click=${()=>this.pLogin.logout()}>Logout</button>
      </div>
    `;
  }

  get pLogin() {
    return this.shadowRoot.querySelector("platform-login")
  }

  /**
   * Lifecycle called after DOM updated on the first time
   * Pulling the app config and waiting for the sts state
   */
  firstUpdated() {
    fetch("./config.json").then(r => r.json()).then(j => {
      console.log(j)
      this.pLogin.config = j
    })
  }

  getUser() {
    if (this.auth) {
      let session = getUserSession()
      return session.header_info.first_name +" "+ session.header_info.last_name +"(Role: "+ session.userRole +")"
    }
  }
}
customElements.define('demo-example', DemoExample);

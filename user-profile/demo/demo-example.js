import { LitElement, html, css } from 'lit-element';
import '@trazit/platform-login/platform-login';
import '../user-profile';

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
      auth: { type: Boolean }
    }
  }

  constructor() {
    super();
    this.auth = false;
  }

  render() {
    return html`
      <platform-login @authorized=${e=>{this.auth=e.target.auth;this.uProfile.config=this.pLogin.config}}></platform-login>
      <div ?hidden="${!this.auth}">
        <h1>Hi ${this.getUser()}, you are authorized</h1>
        <user-profile></user-profile><br>
        <button @click=${()=>this.pLogin.logout()}>Logout</button>
      </div>
    `;
  }

  get pLogin() {
    return this.shadowRoot.querySelector("platform-login")
  }

  get uProfile() {
    return this.shadowRoot.querySelector("user-profile")
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
      let session = this.pLogin.getUser()
      return session.header_info.first_name +" "+ session.header_info.last_name +"("+ session.userRole +")"
    }
  }
}
customElements.define('demo-example', DemoExample);

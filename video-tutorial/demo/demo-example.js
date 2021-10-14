import { LitElement, html, css } from 'lit-element';
import '@trazit/platform-login/platform-login';
import '../video-tutorial';

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
      lang: { type: String }
    }
  }

  constructor() {
    super();
    this.auth = false;
    this.lang = "england";
  }

  render() {
    return html`
      <platform-login @authorized=${e=>{this.auth=e.target.auth;this.vTutor.config=this.pLogin.config}}></platform-login>
      <div ?hidden="${!this.auth}">
        <h1>Hi ${this.getUser()}, you are authorized</h1>
        <video-tutorial></video-tutorial><br>
        <button @click=${this.changeLang}><img .src="/images/${this.lang}.jpg" style="width:30px"></button><br><br>
        <button @click=${()=>this.pLogin.logout()}>Logout</button>
      </div>
    `;
  }

  get pLogin() {
    return this.shadowRoot.querySelector("platform-login")
  }

  get vTutor() {
    return this.shadowRoot.querySelector("video-tutorial")
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

  changeLang() {
    if (this.lang == "england") {
      this.vTutor.lang = "es"
      this.lang = "spain"
    } else {
      this.vTutor.lang = "en"
      this.lang = "england"
    }
  }
}
customElements.define('demo-example', DemoExample);

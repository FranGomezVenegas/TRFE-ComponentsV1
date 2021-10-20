import { LitElement, html, css } from 'lit-element';
import { getUserSession } from '@trazit/platform-login';
import '@spectrum-web-components/action-menu/sync/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@trazit/platform-login/platform-login';
import '../my-certifications';

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
      sops: { type: Array },
      analytics: { type: Array }
    }
  }

  constructor() {
    super();
    this.auth = false;
    this.sops = [];
    this.analytics = [];
  }

  render() {
    return html`
      <platform-login @authorized=${this.authorized}>
      </platform-login>
      <div ?hidden="${!this.auth}">
        <h1>Hi ${this.getUser()}, you are authorized</h1>
        <sp-action-menu id="cert-menu" size="m" @mouseover=${()=> this.menuHover("cert-menu")}>
          <span slot="label" @mouseover=${()=> this.menuHover("cert-menu")}>My Certifications ${this.sops.length+this.analytics.length}</span>
          <sp-menu-item>SOP ${this.pendingSOP()} <span style="color: blue" @click=${()=>this.myCerts.pass("sop")}>${this.sops.length}</span></sp-menu-item>
          <sp-menu-item>Analytical Method ${this.pendingAnalytic()} <span style="color: blue" @click=${()=>this.myCerts.pass("analysis")}>${this.analytics.length}</span></sp-menu-item>
        </sp-action-menu>
        <button @click=${()=> this.pLogin.logout()}>Logout</button>
        <my-certifications></my-certifications><br>
      </div>
    `;
  }

  authorized(e) {
    this.auth = e.target.auth
    this.myCerts.config = this.pLogin.config
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    this.sops = userSession.all_my_sops[0].my_sops.filter(c => c.status != "EXPIRED")
    this.analytics = userSession.all_my_analysis_methods[0].my_analysis_method_certifications.filter(c => c.status != "EXPIRED")
  }

  pendingSOP() {
    let p = this.sops.filter(s => s.status == "NOT_PASS")
    return html`<span style="color: red" @click=${()=>this.myCerts.pending("sop")}>${p.length}</span>`
  }

  pendingAnalytic() {
    let p = this.analytics.filter(s => s.status == "NOT_PASS")
    return html`<span style="color: red" @click=${()=>this.myCerts.pending("analysis")}>${p.length}</span>`
  }

  get pLogin() {
    return this.shadowRoot.querySelector("platform-login")
  }

  get myCerts() {
    return this.shadowRoot.querySelector("my-certifications")
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

  menuHover(menu) {
    this.shadowRoot.querySelectorAll("sp-action-menu").forEach(s => {
      if (s.id == menu) {
        s.open = true;
      } else {
        s.open = false
      }
    })
  }

  getUser() {
    if (this.auth) {
      let session = getUserSession()
      return session.header_info.first_name + " " + session.header_info.last_name + "(" + session.userRole + ")"
    }
  }
}
customElements.define('demo-example', DemoExample);

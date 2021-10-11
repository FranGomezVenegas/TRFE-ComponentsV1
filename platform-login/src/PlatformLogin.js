import { html, css, LitElement } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@spectrum-web-components/button/sp-button';

export class PlatformLogin extends LitElement {
  static get styles() {
    return [
      Layouts,
      css`
      :host {
        display: block;
        width: 400px;
      }
      :host([auth]) {
        display: none;
      }
      div.login-box {
        background-color: rgba(177, 242, 244, 25%);
        border-radius: 20px;
        box-shadow: 5px 5px #888888;
        padding: 10px;
      }
      img.appLoginLogoOnTop {
        height: 4.08vmax;
        width: 17.85vmax;
      }
      h2 {
        font-family: 'Oxygen', sans-serif;
        font-size: 35px;
        color: #1676f3;
      }
      div.input * {
        margin-bottom: 15px;
      }
      mwc-icon-button#video {
        color: #6495ed;
      }
      @media (max-width: 460px) {
        :host {
          display: block;
          width: 300px;
        }
      }
    `];
  }

  static get properties() {
    return {
      auth: { type: Boolean, reflect: true },
      config: { type: Object },
      userRoles: { type: Array },
      hidePwd: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.auth = false;
    this.config = {};
    this.userRoles = [];
    this.hidePwd = true;
  }

  firstUpdated() {
    if (sessionStorage.getItem("partialToken") && sessionStorage.getItem("userSession")) {
      this.authorized();
    }
    // focusing to username once rendered
    this.updateComplete.then(() => {
      this.user.focus()
    })
  }

  render() {
    return html`
      <div class="login-box layout vertical flex center">
        <img class="appLoginLogoOnTop" src="/images/trazit-removebg.png" />
        <mwc-icon-button>
          <img src="/images/england.jpg" />
        </mwc-icon-button>
        <h2>Trace it !!!</h2>
        <div class="input layout vertical flex">
          <mwc-textfield label="User" @keypress=${()=>this.password.focus()}></mwc-textfield>
          <mwc-textfield label="Password" type="${this.hidePwd?'password':'text'}" iconTrailing="visibility" 
            @keypress=${this.checkLogin}
            @click=${this.showPwd}></mwc-textfield>
          <sp-button size="xl" @click=${this.login}>Access</sp-button>
          <mwc-select label="Role">
            ${this.userRoles.map(r => 
              html`<mwc-list-item value="${r}">${r}</mwc-list-item>`
            )}
          </mwc-select>
        </div>
        <mwc-icon-button id="video">
          <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"
            style="pointer-events: none; display: block; width: 100%; height: 100%;">
            <g>
              <path
                d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z">
              </path>
            </g>
          </svg>
        </mwc-icon-button>
      </div>
    `;
  }

  get user() {
    return this.shadowRoot.querySelector("mwc-textfield[label=User]")
  }

  get password() {
    return this.shadowRoot.querySelector("mwc-textfield[label=Password]")
  }

  get role() {
    return this.shadowRoot.querySelector("mwc-select[label=Role]")
  }

  clearSessionStorage() {
    window.sessionStorage.clear();
  }

  logout() {
    console.log('PlatformLogin::logout')
    this.clearSessionStorage();
    window.location.href = "/";
  }

  checkLogin(e) {
    // Allow user to send by press enter
    if (e.which == 13) {
      this.login();
    }
  }

  async login() {
    try {
      // requesting partial token
      await this.reqPartialToken()
      // requesting user roles
      await this.reqUserRoles()
      // requesting final token
      if (this.userRoles.length == 1) {
        this.role.value = this.userRoles[0];
        await this.reqFinalToken();
      }
      this.authorized();
    } catch (e) {
      console.log("Error: ", e)
      alert(e.message)
      this.logout()
    }
  }

  authorized() {
    console.log("reqFinal ", JSON.parse(sessionStorage.getItem("userSession")))
    this.auth = true;
    this.dispatchEvent(new CustomEvent("authorized", {bubbles: true, composed: true}));
  }

  reqPartialToken() {
    return fetch(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      dbUserName: this.user.value,
      dbUserPassword: this.password.value,
      dbName: this.config.dbName,
      actionName: 'authenticate'
    })).then(async r => {
      if (r.status == 200) {
        return r.json()
      } else {
        let err = await r.json()
        throw err
      }
    }).then(j => {
      sessionStorage.setItem('partialToken', JSON.stringify(j))
    })
  }

  reqUserRoles() {
    let partialToken = JSON.parse(sessionStorage.getItem('partialToken'))
    return fetch(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      myToken: partialToken.myToken,
      dbName: this.config.dbName,
      actionName: 'getuserrole'
    })).then(async r => {
      if (r.status == 200) {
        return r.json()
      } else {
        let err = await r.json()
        throw err
      }
    }).then(j => {
      this.userRoles = j;
    })
  }

  reqFinalToken() {
    let partialToken = JSON.parse(sessionStorage.getItem('partialToken'))
    return fetch(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      myToken: partialToken.myToken,
      userRole: this.userRoles[0],
      dbName: this.config.dbName,
      actionName: 'finaltoken'
    })).then(async r => {
      if (r.status == 200) {
        return r.json()
      } else {
        let err = await r.json()
        throw err
      }
    }).then(j => {
      sessionStorage.setItem("userSession", JSON.stringify({
        ...j,
        userRole: this.userRoles[0]
      }))
    })
  }

  getUser() {
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    return userSession.header_info.first_name +" "+ userSession.header_info.last_name
  }

  showPwd(e) {
    if (e.pointerId == -1) {
      this.hidePwd = !this.hidePwd;
    }
  }
}

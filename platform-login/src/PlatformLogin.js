import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@spectrum-web-components/button/sp-button';

export function getUserSession() {
  let userSession = JSON.parse(sessionStorage.getItem("userSession"))
  return userSession
}

export const langConfig = {
  "title": {
    "label_en": "Trace it !!!", 
    "label_es": "¡¡ TRÁZALO !!"
  },
  "password": {
    "label_en": "Password", 
    "label_es": "Contraseña"
  },
  "user": {
    "label_en": "User", 
    "label_es": "Usuario"
  },
  "buttonAccess": {
    "label_en": "Access", 
    "label_es": "Entrar"
  },
  "role": {
    "label_en": "Role", 
    "label_es": "Rol"
  }
}

export class PlatformLogin extends CommonCore {
  static get styles() {
    return [
      Layouts,
      css`
      :host {
        display: block;
        width: 400px;
      }
      :host([hidden]) {
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
      hidden: { type: Boolean, reflect: true },
      auth: { type: Boolean },
      userRoles: { type: Array },
      setRole: { type: String }
    };
  }

  constructor() {
    super();
    this.hidden = true;
    this.auth = false;
    this.userRoles = [];
  }

  firstUpdated() {
    super.firstUpdated()
    // focusing to username once rendered
    this.updateComplete.then(() => {
      this.user.focus()
    })
  }

  updated(updates) {
    if (updates.has('config') && JSON.stringify(this.config) != "{}") {
      this.hidden = false
    }
    super.updated(updates)
  }

  render() {
    return html`
      <div class="login-box layout vertical flex center">
        <img class="appLoginLogoOnTop" src="/images/trazit-removebg.png" />
        <mwc-icon-button @click=${this.changeLang}>
          <img .src="/images/${this.flag}.jpg" />
        </mwc-icon-button>
        <h2>${langConfig.title["label_"+this.lang]}</h2>
        <div class="input layout vertical flex">
          <mwc-textfield label="${langConfig.user["label_"+this.lang]}" @keypress=${()=>this.password.focus()}></mwc-textfield>
          <mwc-textfield label="${langConfig.password["label_"+this.lang]}" type="password" iconTrailing="visibility" 
            @keypress=${this.checkLogin}
            @click=${this.showPwd}></mwc-textfield>
          <sp-button size="xl" @click=${this.login}>${langConfig.buttonAccess["label_"+this.lang]}</sp-button>
          <mwc-select label="${langConfig.role["label_"+this.lang]}" @change=${this.setRole} ?disabled=${!this.userRoles.length}>
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
      }
    } catch (e) {
      console.log("Error: ", e)
      this.clearSessionStorage();
      this.error(e);
    }
  }

  async setRole(e) {
    if (e.target.value) {
      await this.reqFinalToken();
      this.authorized();
    }
  }

  authorized() {
    console.log("reqFinal ", JSON.parse(sessionStorage.getItem("userSession")))
    this.auth = true;
    this.hidden = true;
    this.dispatchEvent(new CustomEvent("authorized", {bubbles: true, composed: true}));
  }

  reqPartialToken() {
    return this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      dbUserName: this.user.value,
      dbUserPassword: this.password.value,
      dbName: this.config.dbName,
      actionName: 'authenticate'
    })).then(j => {
      sessionStorage.setItem('partialToken', JSON.stringify(j))
    })
  }

  reqUserRoles() {
    let partialToken = JSON.parse(sessionStorage.getItem('partialToken'))
    return this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      myToken: partialToken.myToken,
      dbName: this.config.dbName,
      actionName: 'getuserrole'
    })).then(async j => {
      this.userRoles = j;
      await this.requestUpdate();
    })
  }

  reqFinalToken() {
    let partialToken = JSON.parse(sessionStorage.getItem('partialToken'))
    return this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      myToken: partialToken.myToken,
      userRole: this.role.value,
      dbName: this.config.dbName,
      actionName: 'finaltoken'
    })).then(j => {
      sessionStorage.setItem("userSession", JSON.stringify({
        ...j,
        userName: this.user.value,
        userRole: this.role.value
      }))
    })
  }
}

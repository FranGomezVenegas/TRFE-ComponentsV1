import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-dialog';
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
        background-color:  rgba(177, 242, 244, 25%); 
        border-radius: 20px;
        box-shadow: 5px 5px #888888;
        padding: 10px;
      }
      img.appLoginLogoOnTop {
        height: 4.08vmax;
        width: 17.85vmax;
        padding-bottom:15px;
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
      video {
        width: 480px;
        height: 480px;
      }
      @media (max-width: 460px) {
        :host {
          display: block;
          width: 300px;
        }
        video {
          width: 300px;
          height: 300px;
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
      setTimeout(() => {
        this.user.focus()
      }, 200)
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
      <div class="input layout vertical flex">
        <mwc-textfield id="user" label="${langConfig.user["label_"+this.lang]}" @keypress=${()=>this.password.focus()}></mwc-textfield>
        <mwc-textfield id="password" label="${langConfig.password["label_"+this.lang]}" type="password" iconTrailing="visibility" 
          @keypress=${this.checkLogin}
          @click=${this.showPwd}></mwc-textfield>
          <sp-button size="xl" @click=${this.login}>${langConfig.buttonAccess["label_"+this.lang]}</sp-button>
        <mwc-select id="role" label="${langConfig.role["label_"+this.lang]}" @change=${this.setRole} ?disabled=${!this.userRoles.length}>
          ${this.userRoles.map(r => 
            html`<mwc-list-item value="${r}">${r}</mwc-list-item>`
          )}
        </mwc-select>
      </div>
      <div class="input layout flex">
        <mwc-icon-button id="video" icon="videocam" @click=${()=>this.shadowRoot.querySelector("#videoDialog").open=true}></mwc-icon-button>
        <mwc-dialog id="videoDialog" 
          heading=""
          scrimClickAction=""
          escapeKeyAction="cancel">
          <iframe width="420" height="345" src="https://www.youtube.com/watch?v=qzZv5e0gg9M?autoplay=1"></iframe>
          <mwc-icon-button icon="close" 
            slot="secondaryAction"
            dialogAction="cancel"> 
          </mwc-icon-button>
        </mwc-dialog>
        <mwc-icon-button @click=${this.changeLang}>
          <img .src="/images/${this.flag}.png" />
        </mwc-icon-button>
      </div>
    </div>
    `;
  }

  get user() {
    return this.shadowRoot.querySelector("mwc-textfield#user")
  }

  get password() {
    return this.shadowRoot.querySelector("mwc-textfield#password")
  }

  get role() {
    return this.shadowRoot.querySelector("mwc-select#role")
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
      this.clearSessionStorage();
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
    }), false).then(j => {
      if (j) {
        sessionStorage.setItem('partialToken', JSON.stringify(j))
      } else {
        throw {}
      }
    })
  }

  reqUserRoles() {
    let partialToken = JSON.parse(sessionStorage.getItem('partialToken'))
    return this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      myToken: partialToken.myToken,
      dbName: this.config.dbName,
      actionName: 'getuserrole'
    }), false).then(async j => {
      if (j) {
        this.userRoles = j;
        await this.requestUpdate();
      } else {
        throw {}
      }
    })
  }

  reqFinalToken() {
    let partialToken = JSON.parse(sessionStorage.getItem('partialToken'))
    return this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      myToken: partialToken.myToken,
      userRole: this.role.value,
      dbName: this.config.dbName,
      actionName: 'finaltoken'
    }), false).then(j => {
      if (j) {
        sessionStorage.setItem("userSession", JSON.stringify({
          ...j,
          userName: this.user.value,
          userRole: this.role.value
        }))
      } else {
        throw {}
      }
    })
  }
}

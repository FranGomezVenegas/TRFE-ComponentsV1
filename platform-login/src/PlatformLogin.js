import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@spectrum-web-components/button/sp-button';
import '@trazit/tr-dialog/tr-dialog';

export function getUserSession() {
  let userSession = JSON.parse(sessionStorage.getItem("userSession"))
  return userSession
}

const langConfig = {
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

const appLogin_authenticationMessage={
  "connectedSuccess_singleRole":{
    "message_en":"Valid user, Starting session ... please wait",
    "message_es":"Usuario válido, iniciando sesión ... por favor espere",
  },
  "connectedSuccess":{
    "message_en":"Valid user, please proceed selecting the role",
    "message_es":"Usuario válido, por favor escoja rol",
  },
  "connectedFails":{
    "message_en":"I guess there is no user with those credentials",
    "message_es":"Me temo que el usuario o la contraseña no son correctos.",    
  }
}

export class PlatformLogin extends CommonCore {
  static get styles() {
    return [
      Layouts,
      css`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
      div.login-box {
        background : #FFFFFF;
        background : rgba(255, 255, 255, 1);
        border-radius : 67px;
        -moz-border-radius : 67px;
        -webkit-border-radius : 67px;
        padding: 20px;
        -webkit-filter: drop-shadow(0 0 8px rgba(120, 217, 255)); /* webkit only 
        assuming the content is written in rgba(120, 217, 255) */
filter: drop-shadow(0 0 8px rgba(120, 217, 255));              /* FF~35 */
filter: drop-shadow(0 0 0 8px rgba(120, 217, 255));              /* MDN */   
box-shadow: 16px 14px 20px #0000008c;     
      }
      img.appLoginLogoOnTop {
        height: 5.08vmax;
        width: 16vmax;
        padding-bottom: 15px;
      }
      h2 {
        font-family: 'Oxygen', sans-serif;
        font-size: 35px;
        color: #1676f3;
      }
      div.input * {
        margin-bottom: 15px;
      }
      mwc-icon-button#lang {
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }
      mwc-icon-button#video {
        color : #FFFFFF;
        color : rgba(36, 192, 235, 1);
      }
      sp-button {
        background : #24C0EB;
        background : rgba(36, 192, 235, 1);
        border-radius : 35px;
        -moz-border-radius : 35px;
        -webkit-border-radius : 35px;
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        color : #FFFFFF;
        color : rgb(255, 255, 255);
        border-color: transparent !important;

      }
      mwc-textfield {
        border-style : Solid;
        border-color : #999999;
        border-color : rgba(153, 153, 153, 1);
        border-width : 1px;
        border-radius : 7px;
        -moz-border-radius : 7px;
        -webkit-border-radius : 7px;   
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background-color :  #FFFFFF;
        background-color : rgb(255, 255, 255);  
        --mdc-text-field-idle-line-color:#148CFA;
        --mdc-text-field-outlined-idle-border-color: #148CFA;
        --mdc-text-field-label-ink-color:  #148CFA;
        --mdc-text-field-focused-label-color: #148CFA;
        --mdc-theme-primary: #0465FB;
      }
      nwc-textfield.mdc-text-field {
      background-color :  #FFFFFF;
      background-color : rgb(255, 255, 255);     
      }
      .content {
        width: 480px;
        height: 100%;
      }
      .content * {
        margin: 5px 0;
      }
      @media (max-width: 460px) {
        :host {
          display: block;
          width: 300px;
        }
        div.login-box {
          padding: 10px 0;
        }
        .content {
          width: 100%;
        }
      }
    `];
  }

  static get properties() {
    return {
      hidden: { type: Boolean, reflect: true },
      auth: { type: Boolean },
      userRoles: { type: Array }
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
      this.videoDialogSurface.style.paddingTop = "20px";
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
        <mwc-textfield id="user" label="${langConfig.user["label_"+this.lang]}" 
          @keypress=${e=>e.keyCode==13&&this.password.focus()}></mwc-textfield>
        <mwc-textfield id="password" label="${langConfig.password["label_"+this.lang]}" type="password" iconTrailing="visibility" 
          @keypress=${this.checkLogin}
          @click=${this.showPwd}></mwc-textfield>
          <sp-button id="access" size="xl" @click=${this.login}>${langConfig.buttonAccess["label_"+this.lang]}</sp-button>
        <mwc-select id="role" label="${langConfig.role["label_"+this.lang]}" @change=${this.setRole} ?disabled=${!this.userRoles.length}>
          ${this.userRoles.map(r => 
            html`<mwc-list-item value="${r}">${r}</mwc-list-item>`
          )}
        </mwc-select>
      </div>
      <div>
        <mwc-icon-button id="video" icon="videocam" title="Video" @click=${()=>this.shadowRoot.querySelector("#videoDialog").open=true}></mwc-icon-button>
        <tr-dialog id="videoDialog" @closed=${this.closeVideo}
          @zoom-out=${()=>this.dialogZoom(true)}
          @zoom-in=${()=>this.dialogZoom()}
          heading=""
          hideActions=""
          scrimClickAction=""
          hideMin>
          <div class="content layout vertical flex center-justified">
            <iframe id="ytube" width="100%" height="345" src="https://www.youtube.com/embed/p-C9v-jCrcM?enablejsapi=1"></iframe>
          </div>
        </tr-dialog>
        <mwc-icon-button id="lang" @click=${this.changeLang} title="Language">${this.lang}</mwc-icon-button>
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

  get videoDialog() {
    return this.shadowRoot.querySelector("tr-dialog#videoDialog")
  }

  get videoDialogSurface() {
    return this.videoDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  closeVideo() {
    this.shadowRoot.querySelector("#ytube").contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func: 'stopVideo' 
    }), '*');
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
      if (this.config.fullscreen) {
        // set full screen mode
        let el = document.documentElement
        let requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
        if (requestMethod) {

          // Native full screen.
          requestMethod.call(el);
      
        } else if (typeof window.ActiveXObject !== "undefined") {
      
          // Older IE.
          var wscript = new ActiveXObject("WScript.Shell");
      
          if (wscript !== null) {
            wscript.SendKeys("{F11}");
          }
        }
      }
  
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
    super.authorized();
    this.auth = true;
    this.hidden = true;
    this.dispatchEvent(new CustomEvent("authorized", {bubbles: true, composed: true}));
  }

  reqPartialToken() {
    let urlParams = this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      dbUserName: this.user.value,
      dbUserPassword: this.password.value,
      dbName: this.config.dbName,
      actionName: 'authenticate'
    })
    return this.fetchApi(urlParams, false).then(j => {
      if (j && !j.is_error) {
        sessionStorage.setItem('partialToken', JSON.stringify(j))
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        this.dispatchEvent(new CustomEvent("error", {
          detail: {...appLogin_authenticationMessage.connectedFails, urlParams: urlParams, log: false, is_error: true},
          bubbles: true,
          composed: true
        }))
        throw {}
      }
    })
  }

  reqUserRoles() {
    let partialToken = JSON.parse(sessionStorage.getItem('partialToken'))
    let urlParams = this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      myToken: partialToken.myToken,
      dbName: this.config.dbName,
      actionName: 'getuserrole'
    })
    return this.fetchApi(urlParams, false).then(async j => {
      if (j && !j.is_error) {
        if (j.length > 1) {
          this.dispatchEvent(new CustomEvent('success', {
            detail: {...appLogin_authenticationMessage.connectedSuccess, urlParams: urlParams, log: false},
            bubbles: true,
            composed: true
          }))
        }
        this.userRoles = j;
        await this.requestUpdate();
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        throw {}
      }
    })
  }

  reqFinalToken() {
    let partialToken = JSON.parse(sessionStorage.getItem('partialToken'))
    let urlParams = this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      myToken: partialToken.myToken,
      userRole: this.role.value,
      dbName: this.config.dbName,
      actionName: 'finaltoken',
      sizeValue: window.screen.width,
      includeProcModelInfo: !this.config.local
    })
    return this.fetchApi(urlParams, false).then(j => {
      if (j && !j.is_error) {
        j = {
          ...j,
          ...appLogin_authenticationMessage.connectedSuccess_singleRole
        }
        this.dispatchEvent(new CustomEvent('success', {
          detail: {...j, urlParams: urlParams, log: false, waiting: true},
          bubbles: true,
          composed: true
        }))
        sessionStorage.setItem("userSession", JSON.stringify({
          ...j,
          userName: this.user.value,
          userRole: this.role.value
        }))
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        throw {}
      }
    })
  }

  dialogZoom(zoom) {
    if (zoom) {
      this.shadowRoot.querySelector(".content").style.width = "100%"
      this.shadowRoot.querySelector("#ytube").height = "100%"
    } else {
      if (this.desktop) {
        this.shadowRoot.querySelector(".content").style.width = "480px"
      } else {
        this.shadowRoot.querySelector(".content").style.width = "100%"
      }
      this.shadowRoot.querySelector("#ytube").height = "345"
    }
  }
}

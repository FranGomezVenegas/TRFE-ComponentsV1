import { html, LitElement } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { platformLoginStyles } from './platform-login-styles.js'; // Importa los estilos
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@spectrum-web-components/button/sp-button';
import '@trazit/tr-dialog/tr-dialog';

export function getUserSession() {
  let userSession = JSON.parse(sessionStorage.getItem("userSession"));
  return userSession;
}

const langConfig = {
  title: {
    label_en: "Trace it !!!",
    label_es: "¡¡ TRÁZALO !!",
  },
  password: {
    label_en: "Password",
    label_es: "Contraseña",
  },
  user: {
    label_en: "User",
    label_es: "Usuario",
  },
  buttonAccess: {
    label_en: "Access",
    label_es: "Entrar",
  },
  role: {
    label_en: "Role",
    label_es: "Rol",
  },
};

const appLogin_authenticationMessage = {
  connectedSuccess_singleRole: {
    message_en: "Valid user, Starting session ... please wait",
    message_es: "Usuario válido, iniciando sesión ... por favor espere",
  },
  connectedSuccess: {
    message_en: "Valid user, please proceed selecting the role",
    message_es: "Usuario válido, por favor escoja rol",
  },
  connectedFails: {
    message_en: "I guess there is no user with those credentials",
    message_es: "Me temo que el usuario o la contraseña no son correctos.",
  },
};

export class PlatformLogin extends CommonCore {
  static get styles() {
    return platformLoginStyles; // Usa los estilos importados
  }

  static get properties() {
    return {
      hidden: { type: Boolean, reflect: true },
      auth: { type: Boolean },
      userRoles: { type: Array },
      role: { type: String },
    };
  }

  constructor() {
    super();
    this.hidden = true;
    this.auth = false;
    this.userRoles = [];
    this.role = '';
  }

  firstUpdated() {
    super.firstUpdated();
    this.updateComplete.then(() => {
      setTimeout(() => {
        this.showElements();
        this.user.focus();
      }, 200);
    });
  }

  updated(changedProperties) {
    if (changedProperties.has('config') && JSON.stringify(this.config) !== '{}') {
      this.hidden = false;
    }
    super.updated(changedProperties);
  }

  showElements() {
    const elements = this.shadowRoot.querySelectorAll('.login-box, .appLoginLogoOnTop, .input mwc-textfield, .input sp-button, mwc-icon-button#lang');
    elements.forEach(el => el.classList.add('visible'));
  }

  render() {
    return html`
      <div class="login-box layout vertical flex center">
        <img class="appLoginLogoOnTop" src="/images/trazit-removebg.png" />
        <div class="input layout vertical flex" style="display: flex; flex-direction: column; ">
          <mwc-textfield
            id="user"
            label="${langConfig.user['label_' + this.lang]}"
            @keypress=${(e) => e.keyCode == 13 && this.password.focus()}
          ></mwc-textfield>
          <mwc-textfield
            id="password"
            label="${langConfig.password['label_' + this.lang]}"
            type="password"
            iconTrailing="visibility"
            @keypress=${this.checkLogin}
            @click=${this.showPwd}
          ></mwc-textfield>
          <sp-button id="access" size="xl" @click=${this.login}
            >${langConfig.buttonAccess['label_' + this.lang]}</sp-button
          >
        </div>
        <div>
          <mwc-icon-button
            id="lang"
            @click=${this.changeLang}
            title="Language"
            >${this.lang}</mwc-icon-button
          >
          <tr-dialog id="rolesSelector2" @closed=${this.setRoleFromChip}>
          </tr-dialog>
          <tr-dialog id="rolesSelector" hideMin hideZoom hideActions>
            <div class="content layout vertical flex center-justified">
              ${this.lang === 'en'
                ? html`<p class="modal-title">Select one role for this session</p>`
                : html`<p class="modal-title">Selecciona un perfil para esta sesión</p>`}
              <div class="role-container">
                ${this.userRoles.map(
                  (r) => html`
                    <div
                      class="role-chip"
                      @click=${() => this.setRoleFromChip(r)}
                      value="${r}"
                    >
                      ${r.replace(/_/g, ' ')}
                    </div>
                  `
                )}
              </div>
            </div>
            <div class="modal-footer"></div>
          </tr-dialog>
        </div>
      </div>
    `;
  }

  get user() {
    return this.shadowRoot.querySelector("mwc-textfield#user");
  }

  get password() {
    return this.shadowRoot.querySelector("mwc-textfield#password");
  }

  checkLogin(e) {
    if (e.which == 13) {
      this.login();
    }
  }

  async login() {
    try {
      if (this.config.fullscreen) {
        let el = document.documentElement;
        let requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
        if (requestMethod) {
          requestMethod.call(el);
        } else if (typeof window.ActiveXObject !== "undefined") {
          let wscript = new ActiveXObject("WScript.Shell");
          if (wscript !== null) {
            wscript.SendKeys("{F11}");
          }
        }
      }

      await this.reqPartialToken();
      await this.reqUserRoles();

      if (this.userRoles.length == 1) {
        this.role = this.userRoles[0];
        await this.reqFinalToken();
        this.authorized();
      } else {
        this.shadowRoot.querySelector("#rolesSelector").open = true;
      }
    } catch (e) {
      this.clearSessionStorage();
    }
  }

  async setRole(e) {
    if (e.target.value) {
      try {
        await this.reqFinalToken();
        this.authorized();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async setRoleFromChip(value) {
    if (value) {
      this.role = value;
      await this.reqFinalToken();
      this.authorized();
    }
  }

  authorized() {
    super.authorized();
    this.auth = true;
    this.hidden = true;
    this.dispatchEvent(new CustomEvent("authorized", { bubbles: true, composed: true }));
  }

  clearSessionStorage() {
    window.sessionStorage.clear();
  }

  reqPartialToken() {
    let urlParams = this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      dbUserName: this.user.value,
      dbUserPassword: this.password.value,
      dbName: this.config.dbName,
      actionName: 'authenticate'
    });

    const formData = [this.user.value, this.password.value];
    return this.fetchApiPost(urlParams, false, formData).then(j => {
      if (j && !j.is_error) {
        sessionStorage.setItem('partialToken', JSON.stringify(j));
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        this.dispatchEvent(new CustomEvent("error", {
          detail: { ...appLogin_authenticationMessage.connectedFails, urlParams: urlParams, log: false, is_error: true },
          bubbles: true,
          composed: true
        }));
        throw {};
      }
    });
  }

  reqUserRoles() {
    let partialToken = JSON.parse(sessionStorage.getItem('partialToken'));
    let urlParams = this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      myToken: partialToken.myToken,
      dbName: this.config.dbName,
      actionName: 'getuserrole'
    });
    return this.fetchApi(urlParams, false).then(async j => {
      if (j && !j.is_error) {
        if (j.length > 1) {
          this.dispatchEvent(new CustomEvent('success', {
            detail: { ...appLogin_authenticationMessage.connectedSuccess, urlParams: urlParams, log: false },
            bubbles: true,
            composed: true
          }));
        }
        this.userRoles = j;
        await this.requestUpdate();
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        throw {};
      }
    });
  }

  reqFinalToken() {
    let partialToken = JSON.parse(sessionStorage.getItem('partialToken'));
    let urlParams = this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      myToken: partialToken.myToken,
      userRole: this.role,
      dbName: this.config.dbName,
      actionName: 'finaltoken',
      sizeValue: window.screen.width,
      includeProcModelInfo: !this.config.local
    });
    return this.fetchApi(urlParams, false).then(j => {
      if (j && !j.is_error) {
        j = {
          ...j,
          ...appLogin_authenticationMessage.connectedSuccess_singleRole
        };
        this.dispatchEvent(new CustomEvent('success', {
          detail: { ...j, urlParams: urlParams, log: false, waiting: true },
          bubbles: true,
          composed: true          
        }));
        let isProcManagement = "proc_management" === this.role;
        sessionStorage.setItem("userSession", JSON.stringify({
          ...j,
          userName: this.user.value,
          userRole: this.role,
          dbName: this.config.dbName,
          backendUrl: this.config.backendUrl,
          isProcManagement: isProcManagement
        }));
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        throw {};
      }
    });
  }
  logout() {
    console.log('PlatformLogin::logout')
    this.clearSessionStorage();
    window.location.href = "/";
  }
}

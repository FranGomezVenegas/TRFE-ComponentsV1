import { html, LitElement, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { platformLoginStyles } from './platform-login-styles.js'; // Importa los estilos
import '@material/web/iconbutton/outlined-icon-button.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/dialog/dialog.js';
import '@material/web/button/filled-button.js';
import '@material/web/list/list-item.js';
import '@material/web/button/elevated-button.js';
import { langConfig, appLogin_authenticationMessage } from './langLabels.js';



import { MdFilledIconButtonStyles } from './md3-buttons-styles';

export function getUserSession() {
  if (sessionStorage === undefined) { return ''; }
  let userSession = JSON.parse(sessionStorage.getItem("userSession"));
  if (userSession === undefined) { return ''; }
  return userSession;
}

export class PlatformLogin extends CommonCore {
  static get styles() {
    return [
      platformLoginStyles, // Usa los estilos importados
      css`
      ${MdFilledIconButtonStyles}
        #rolesSelector {
          position: absolute;
          top: 150px;
          left: 50px;
          z-index: 1000; 
          width: 250px; 
          transform: translate(0, -50%);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      `
    ];
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
    const elements = this.shadowRoot.querySelectorAll('.login-box, .appLoginLogoOnTop, .input md-filled-text-field, .input elevated-button, md-outlined-icon-button#lang');
    elements.forEach(el => el.classList.add('visible'));
  }

  render() {
    return html`
      <div class="login-box layout vertical flex center">
        <img class="appLoginLogoOnTop" src="/images/trazit-removebg.png" />
        <div class="input layout vertical flex" style="gap: 10px; display: flex; flex-direction: column;">
          <md-filled-text-field
            id="user"
            label="${langConfig.user['label_' + this.lang]}"
            @keypress=${(e) => e.keyCode == 13 && this.password.focus()}
          ></md-filled-text-field>
          <md-filled-text-field id="password" label="${langConfig.password['label_' + this.lang]}"
            type="password" trailingIcon="visibility" @keypress=${this.checkLogin}
            @click=${this.showPwd} ></md-filled-text-field>
          <md-elevated-button id="access" style="background-color:rgb(157 112 205 / 25%);" size="xl" @click=${this.login}
            >${langConfig.buttonAccess['label_' + this.lang]}</md-elevated-button>
        </div>
        <div>
          <md-outlined-icon-button
            id="lang" style="padding-top:10px;"
            @click=${this.changeLang}
            title="Language"
            >${this.lang}</md-outlined-icon-button
          >
          <md-dialog id="rolesSelector" @closed=${this.setRoleFromChip}>
            <div slot="headline">
            
              ${this.lang === 'en'
                ? html`<p class="modal-title">Select one role for this session</p>`
                : html`<p class="modal-title">Selecciona un perfil para esta sesión</p>`}
            </div>
              <form slot="content" id="form-id" method="dialog">              
                <div class="role-container">
                  ${this.userRoles && this.userRoles.length > 0
                    ? this.userRoles.map(
                      (r) => html`
                        <div
                          class="role-chip"
                          @click=${() => this.setRoleFromChip(r)}
                          value="${r}"
                        >${r.replace(/_/g, ' ')}
                        </div>
                      `)
                    : html`<p>No roles available</p>`
                  }
                </div>
              </form>
            </div>
          </md-dialog>
        </div>
      </div>
    `;
  }

  get user() {
    return this.shadowRoot.querySelector("md-filled-text-field#user");
  }

  get password() {
    return this.shadowRoot.querySelector("md-filled-text-field#password");
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
      console.log("User Roles:", this.userRoles); // Verifica si los roles se obtienen correctamente
      if (this.userRoles.length == 1) {
        this.role = this.userRoles[0];
        await this.reqFinalToken();
        this.authorized();
      } else {
        this.shadowRoot.querySelector("#rolesSelector").show();
        //this.requestUpdate(); // Forzar actualización 20240828 commented-out due to it updates many times in vain
      }
    } catch (e) {
      this.clearSessionStorage();
    }
  }
  shouldUpdate(changedProperties) { // 20240828 Added this method due to it updates many times in vain
    if (changedProperties.has('userRoles') && this.userRoles.length <= 1) {
        // Evitar actualizar si no hay más de un rol de usuario
        return false;
    }
    return super.shouldUpdate(changedProperties);
  }
  async setRoleFromChip(clickedRole) {
    if (clickedRole) {
        this.role = clickedRole;

        // Cierra el modal antes de solicitar el token final para evitar que interfiera
        this.shadowRoot.querySelector("#rolesSelector").close();
        
        // Asegúrate de que el DOM esté actualizado antes de continuar
        await this.updateComplete;

        // Procede con la solicitud del token final
        await this.reqFinalToken();
        this.authorized();
    } else {
        alert('No role selected');
    }
}

  authorized() {
    super.authorized();
    this.auth = true;
    this.hidden = true;
    this.dispatchEvent(new CustomEvent("authorized", { 
      bubbles: true, 
      composed: true,
      detail: { auth: true }
    }));
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
        this.getUserRoleProceduresList(this.user.value, this.role).catch((error) => {
          console.error("Error fetching procedures list:", error);
        });        
        //return this.getUserRoleProceduresList(this.user.value, this.role);
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        throw {};
      }
    });
  }

  getUserRoleProceduresList(userName, userRole) {
    return
    let partialToken = JSON.parse(sessionStorage.getItem('partialToken'));
    let userSessionData = JSON.parse(sessionStorage.getItem("userSession")) || {};
    let secondUrlParams = this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      finalToken: userSessionData.finalToken,
      dbName: this.config.dbName,
      userName: userName,
      userRole: userRole,
      actionName: 'GET_USER_ROLE_PROCEDURES_LIST'
    });
  
    return this.fetchApi(secondUrlParams, false).then(secondResponse => {
      if (secondResponse && !secondResponse.is_error) {
        // Guardar datos adicionales en sessionStorage
        
        userSessionData.procedures_list = secondResponse.procedures_list; // Asignar proceduresList de la respuesta
        sessionStorage.setItem("userSession", JSON.stringify(userSessionData));
        //userSessionData = JSON.parse(sessionStorage.getItem("userSession")
        console.log("procedures list for user", userName, " and role ", userRole, JSON.parse(sessionStorage.getItem("userSession")).procedures_list)

        const event = new CustomEvent('userSessionUpdated', {
          detail: { userSession: userSessionData }
        });
        window.dispatchEvent(event);
/*        // Despachar un evento adicional tras la segunda request exitosa
        this.dispatchEvent(new CustomEvent('secondSuccess', {
          detail: { ...secondResponse, log: true, waiting: false },
          bubbles: true,
          composed: true
        }));*/
      } else {
        throw new Error("Error in second request");
      }
    }).catch(error => {
      console.error("Second request failed:", error);
    });
  }
  logout() {
    console.log('PlatformLogin::logout')
    this.clearSessionStorage();
    window.location.href = "/";
  }
}

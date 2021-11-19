import { html, css } from 'lit';
import { CommonCore, commonLangConfig } from '@trazit/common-core';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@spectrum-web-components/button/sp-button';
import '@trazit/tr-dialog/tr-dialog';

const langConfig = {
  "Password": {
    "label_en": "New Password", 
    "label_es": "Nueva Contraseña"
  },
  "ChangePassword": {
    "label_en": "Confirm", 
    "label_es": "Confirmar"
  },
  "pwdWindowTitle": {
    "label_en": "Please confirm your credentials (user & password)",
    "label_es": "Por favor confirma tu identidad (usuario y contraseña)"
  },
  "pwdNotCorrectMessage": {
    "now": {
      "message_en": "Validation not completed, action aborted",
      "message_es": "Validación no completada, acción abortada"
    },
    "dialog_cancelled": {
      "message_en": "dialog canceled, action aborted",
      "message_es": "Diálogo cancelado, acción abortada"
    },
    "attempts_consumed": {
      "message_en": "All attempts consumed, action aborted",
      "message_es": "Todos los intentos consumidos, acción abortada"
    }
  },
  "userToCheck": {
    "label_en": "User", 
    "label_es": "Usuario"
  },
  "pwToCheck": {
    "label_en": "Current Password", 
    "label_es": "Contraseña Actual"
  }
}

export class ReloginDialog extends CommonCore {
  static get styles() {
    return [
      super.styles,
      Layouts,
      css`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
      tr-dialog {
        --mdc-dialog-heading-ink-color: blue;
        --mdc-typography-headline6-font-size: 35px;
      }
      .content {
        opacity: 0.9;
      }
      .content * {
        margin: 5px 0;
      }

      @media (max-width: 460px) {
      }
    `];
  }

  static get properties() {
    return {
      startSession: { type: Number },
      businessRules: { type: Boolean },
      microConv: { type: Number } // conversion number to micros
    };
  }

  constructor() {
    super();
    this.businessRules = {};
    this.microConv = 60000; // multiply to 1 minute
  }

  firstUpdated() {
    super.firstUpdated()
    this.updateComplete.then(() => {
      // manually backgrounding the dialog box
      // password dialog
      this.pwdDialogSurface.style.backgroundImage = "url(/images/abstract.jpg)";
      this.pwdDialogSurface.style.backgroundSize = "cover";
      this.pwdDialogSurface.style.backgroundRepeat = "no-repeat";
      this.pwdDialogSurface.style.textAlign = "center";
      this.pwdDialog.shadowRoot.querySelector("h2#title").style.fontSize = "20px";
      this.pwdDialog.shadowRoot.querySelector("#content").style.paddingBottom = "0";
    })
  }

  // Override this method once authorized
  authorized() {
    super.authorized()
    this.startSession = new Date().getTime()
    if (this.config.local) {
      this.businessRules = this.config.businessRules
      this.microConv = 1000 // multiply to 1s for local test
    } else {
      this.businessRules = JSON.parse(sessionStorage.getItem("userSession")).platform_business_rules
    }
    this.checkSessionExpired()
  }

  render() {
    return html`
      <tr-dialog id="pwdDialog" 
        heading="${langConfig.pwdWindowTitle["label_"+this.lang]}"
        hideActions=""
        scrimClickAction=""
        escapeKeyAction="">
        <div class="content layout vertical flex center-justified">
          <mwc-textfield id="user" label="${langConfig.userToCheck["label_"+this.lang]}" type="text" .value=${this.userName} disabled></mwc-textfield>
          <mwc-textfield id="pwd" label="${langConfig.pwToCheck["label_"+this.lang]}" type="password" iconTrailing="visibility" 
            dialogInitialFocus
            @click=${this.showPwd}
            @keypress=${e=>e.keyCode==13&&this.checkingUser()}></mwc-textfield>
          <div style="margin-top:30px">
            <sp-button size="xl" variant="secondary" @click=${this.logout}>${commonLangConfig.cancelDialogButton["label_"+this.lang]}</sp-button>
            <sp-button size="xl" @click=${this.checkingUser}>${commonLangConfig.confirmDialogButton["label_"+this.lang]}</sp-button>
          </div>
          ${this.setAttempts()}
        </div>
      </tr-dialog>
    `;
  }

  get pwdDialog() {
    return this.shadowRoot.querySelector("tr-dialog#pwdDialog")
  }

  get pwd() {
    return this.shadowRoot.querySelector("mwc-textfield#pwd")
  }

  get pwdDialogSurface() {
    return this.pwdDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  /**
   * Checking the user session inactivity
   */
  checkSessionExpired() {
    console.log("checkingSesssionExpired")
    // clear out the timeout if exist to stop the previous interval
    if (this.timer) {
      clearTimeout(this.timer);
    }
    let curTime = new Date().getTime();
    let runSession = curTime - this.startSession;
    if (runSession >= this.businessRules.minsLockSession * this.microConv) { // session running >= minsLockSession
      // open relogin dialog
      this.pwdDialog.show()
      if (this.businessRules.enableLogoutSession) {
        this.newSession = new Date().getTime()
        return this.checkUserRelogin()
      } else {
        return
      }
    }
    setTimeout(() => {
      this.checkSessionExpired()
    }, this.businessRules.secondsNextTimeChecker * this.microConv)
  }

  /**
   * Waiting for relogin action, force logout if no relogin activity
   */
  checkUserRelogin() {
    console.log("checkingUserRelogin")
    let curTime = new Date().getTime();
    let runSession = curTime - this.newSession;
    if (runSession >= this.businessRules.minsLogoutSession * this.microConv) { // session running >= minsLogoutSession
      // should logout
      this.logout()
    } else {
      // set the timeout object
      this.timer = setTimeout(() => {
        this.checkUserRelogin()
      }, this.businessRules.secondsNextTimeChecker * this.microConv)
    }
  }

  /**
   * once relogin succeed
   */
  reloginSucceed() {
    this.attempt = 0
    this.startSession = new Date().getTime()
    this.newSession = new Date().getTime()
    this.checkSessionExpired()
  }

  /**
   * Checking whether user exist and verified
   */
  checkingUser() {
    this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      actionName: "TOKEN_VALIDATE_USER_CREDENTIALS",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      userToCheck: this.userName,
      passwordToCheck: this.pwd.value
    })).then(j => {
      this.pwd.value = ""
      if (j) {
        this.pwdDialog.close()
        this.reloginSucceed()
      } else {
        if (this.attempt > 1) {
          this.logout()
        } else {
          this.attempt++
          this.pwd.focus()
        }
      }
    })
  }

  logout() {
    this.dispatchEvent(new CustomEvent('logout'))
  }
}
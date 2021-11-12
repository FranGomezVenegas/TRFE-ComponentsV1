import { html, css } from 'lit';
import { CommonCore, commonLangConfig } from '@trazit/common-core';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-dialog';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@spectrum-web-components/button/sp-button';

const langConfig = {
  "Password": {
    "label_en": "New Password", 
    "label_es": "Nueva Contraseña"
  },
  "ChangePassword": {
    "label_en": "Confirm", 
    "label_es": "Confirmar"
  },
  "Esign": {
    "label_en": "New Esign", 
    "label_es": "Nueva Firma Electrónica"
  },
  "ChangeEsign": {
    "label_en": "Confirm", 
    "label_es": "Confirmar"
  },
  "TabLogin": {
    "label_en": "Save Open Tabs", 
    "label_es": "Guardar Pestañas Actuales"
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
  },
  "confirmUserNote": {
    "label_en": "Note", 
    "label_es": "Nota"
  },
  "esignWindowTitle": {
    "label_en": "Please enter your eSign",
    "label_es": "Por favor entra tu frase de Firma Electrónica"
  },
  "esignNotCorrectMessage": {
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
  }
};

export class UserProfile extends CommonCore {
  static get styles() {
    return [
      Layouts,
      super.styles,
      css`
      :host {
        display: block;
        width: 300px;
      }
      :host([hidden]) {
        display: none;
      }
      div.input * {
        margin: 10px 0 5px;
      }
      mwc-icon-button {
        color: blue;
      }
      mwc-dialog {
        --mdc-dialog-heading-ink-color: blue;
        --mdc-typography-headline6-font-size: 35px;
      }
      `
    ];
  }

  static get properties() {
    return {
      userName: { type: String }
    };
  }

  constructor() {
    super();
    this.userName = "";
  }

  render() {
    return html`
      <div class="input">
        <div class="layout horizontal flex center">
          <mwc-textfield id="newPwd" .label="${langConfig.Password["label_"+this.lang]}" type="password" iconTrailing="visibility"
            @click=${this.showPwd} @keypress=${e=>{if (e.keyCode==13&&this.newPwd.value)this.pwdDialog.show() }}></mwc-textfield>
          <mwc-icon-button title="Confirm" icon="published_with_changes" @click=${()=>this.pwdDialog.show()} .label="${langConfig.ChangePassword["label_"+this.lang]}"></mwc-icon-button>
        </div>
        <div class="layout horizontal flex center">
          <mwc-textfield id="newEsign" .label="${langConfig.Esign["label_"+this.lang]}" type="password" iconTrailing="visibility"
            @click=${this.showPwd} @keypress=${e=>{if (e.keyCode==13&&this.newEsg.value)this.esgDialog.show() }}></mwc-textfield>
          <mwc-icon-button title="Confirm" icon="published_with_changes" @click=${()=>this.esgDialog.show()} .label="${langConfig.ChangeEsign["label_"+this.lang]}"></mwc-icon-button>
        </div>
      </div>
      <sp-button size="xl" @click=${()=>this.dispatchEvent(new CustomEvent('save-tabs'))}>${langConfig.TabLogin["label_"+this.lang]}</sp-button>
      <mwc-dialog id="pwdDialog" @opened=${()=>this.oldPwd.focus()} @closed=${()=>{this.attempt=0;this.oldPwd.value=""}}
        heading="${langConfig.pwdWindowTitle["label_"+this.lang]}"
        scrimClickAction=""
        hideActions="">
        <div class="layout horizontal flex center-justified" style="opacity:0.8">
          <div class="input layout vertical" style="width: 70%">
            <mwc-textfield id="user" label="${langConfig.userToCheck["label_"+this.lang]}" type="text" .value=${this.userName} disabled></mwc-textfield>
            <mwc-textfield id="oldPwd" label="${langConfig.pwToCheck["label_"+this.lang]}" type="password" iconTrailing="visibility" 
              @click=${this.showPwd}
              @keypress=${e=>e.keyCode==13&&this.checkingUser()}></mwc-textfield>
          </div>
        </div>
        <div style="margin-top:30px">
          <sp-button size="xl" @click=${this.checkingUser}>${commonLangConfig.confirmDialogButton["label_"+this.lang]}</sp-button>
          <sp-button size="xl" variant="secondary" dialogAction="decline">${commonLangConfig.cancelDialogButton["label_"+this.lang]}</sp-button>
        </div>
        ${this.setAttempts()}
      </mwc-dialog>
      <mwc-dialog id="esgDialog" @opened=${()=>this.oldEsg.focus()} @closed=${()=>{this.attempt=0;this.oldEsg.value=""}}
        heading="${langConfig.esignWindowTitle["label_"+this.lang]}"
        scrimClickAction=""
        hideActions="">
        <div class="layout horizontal flex center-justified" style="opacity:0.8">
          <div class="input" style="width: 70%">
            <mwc-textfield id="oldEsg" type="password" iconTrailing="visibility" 
              @click=${this.showPwd}
              @keypress=${e=>e.keyCode==13&&this.checkingPhrase()}></mwc-textfield>
          </div>
        </div>
        <div style="margin-top:30px">
          <sp-button size="xl" @click=${this.checkingPhrase}>${commonLangConfig.confirmDialogButton["label_"+this.lang]}</sp-button>
          <sp-button size="xl" variant="secondary" dialogAction="decline">${commonLangConfig.cancelDialogButton["label_"+this.lang]}</sp-button>
        </div>
        ${this.setAttempts()}
      </mwc-dialog>
    `;
  }

  get newPwd() {
    return this.shadowRoot.querySelector("mwc-textfield#newPwd")
  }

  get newEsg() {
    return this.shadowRoot.querySelector("mwc-textfield#newEsign")
  }

  get pwdDialog() {
    return this.shadowRoot.querySelector("mwc-dialog#pwdDialog")
  }

  get esgDialog() {
    return this.shadowRoot.querySelector("mwc-dialog#esgDialog")
  }

  get pwdDialogSurface() {
    return this.pwdDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  get esgDialogSurface() {
    return this.esgDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  get oldPwd() {
    return this.shadowRoot.querySelector("mwc-textfield#oldPwd")
  }

  get oldEsg() {
    return this.shadowRoot.querySelector("mwc-textfield#oldEsg")
  }

  authorized() {
    console.log(JSON.parse(sessionStorage.getItem("userSession")))
    this.userName = JSON.parse(sessionStorage.getItem("userSession")).userName;
  }

  firstUpdated() {
    super.firstUpdated()
    this.updateComplete.then(() => {
      this.newPwd.updateComplete.then(() => {
        setTimeout(() => {
          this.newPwd.focus();
        }, 100)
      })
      // manually backgrounding the dialog box
      // password dialog
      this.pwdDialogSurface.style.backgroundImage = "url(/images/abstract.jpg)";
      this.pwdDialogSurface.style.backgroundSize = "cover";
      this.pwdDialogSurface.style.backgroundRepeat = "no-repeat";
      this.pwdDialogSurface.style.textAlign = "center";
      this.pwdDialogSurface.style.padding = "20px";
      this.pwdDialog.shadowRoot.querySelector("h2#title").style.fontSize = "20px";
      this.pwdDialog.shadowRoot.querySelector("#content").style.paddingBottom = "0";
      // esign dialog
      this.esgDialogSurface.style.backgroundImage = "url(/images/abstract.jpg)";
      this.esgDialogSurface.style.backgroundSize = "cover";
      this.esgDialogSurface.style.backgroundRepeat = "no-repeat";
      this.esgDialogSurface.style.textAlign = "center";
      this.esgDialogSurface.style.padding = "20px";
      this.esgDialog.shadowRoot.querySelector("h2#title").style.fontSize = "20px";
      this.esgDialog.shadowRoot.querySelector("#content").style.paddingBottom = "0";
    })
  }

  /**
   * Checking whether user exist and verified
   */
  checkingUser() {
    this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      actionName: "TOKEN_VALIDATE_USER_CREDENTIALS",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      userToCheck: this.userName,
      passwordToCheck: this.oldPwd.value
    }), false).then(j => {
      if (j) {
        this.confirmNewPassword()
      } else {
        if (this.attempt > 1) {
          this.pwdDialog.close()
        } else {
          this.attempt++
        }
      }
    })
  }

  /**
   * Once user found and verified, confirm the password changing
   */
  confirmNewPassword() {
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      actionName: "USER_CHANGE_PSWD",
      finalToken: userSession.finalToken,
      dbName: this.config.dbName,
      newPassword: this.newPwd.value
    })).then(j => {
      if (j) {
        userSession.finalToken = j.finalToken
        sessionStorage.setItem("userSession", JSON.stringify(userSession))
      }
      this.pwdDialog.close()
      this.newPwd.value = ""
    })
  }

  /**
   * Checking whether phrase matched
   */
  checkingPhrase() {
    this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      actionName: "TOKEN_VALIDATE_ESIGN_PHRASE",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      esignPhraseToCheck: this.oldEsg.value
    }), false).then(j => {
      if (j) {
        this.confirmNewEsign()
      } else {
        if (this.attempt > 1) {
          this.esgDialog.close()
        } else {
          this.attempt++
        }
      }
    })
  }

  /**
   * Confirm the esign changing
   */
  confirmNewEsign() {
    console.log("AAAA")
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      actionName: "USER_CHANGE_ESIGN",
      finalToken: userSession.finalToken,
      dbName: this.config.dbName,
      newEsign: this.newEsg.value
    })).then(j => {
      console.log(j)
      if (j) {
        userSession.finalToken = j.finalToken
        sessionStorage.setItem("userSession", JSON.stringify(userSession))
      }
      this.esgDialog.close()
      this.newEsg.value = ""
    })
  }
}

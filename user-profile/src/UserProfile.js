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
      css`
      :host {
        display: block;
        width: 300px;
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
            @click=${this.showPwd}></mwc-textfield>
          <mwc-icon-button icon="published_with_changes" @click=${()=>this.pwdDialog.open=true} .label="${langConfig.ChangePassword["label_"+this.lang]}"></mwc-icon-button>
        </div>
        <div class="layout horizontal flex center">
          <mwc-textfield id="newEsign" .label="${langConfig.Esign["label_"+this.lang]}" type="password" iconTrailing="visibility"
            @click=${this.showPwd}></mwc-textfield>
          <mwc-icon-button icon="published_with_changes" @click=${this.changeEsign} .label="${langConfig.ChangeEsign["label_"+this.lang]}"></mwc-icon-button>
        </div>
      </div>
      <sp-button size="xl" @click=${this.login}>${langConfig.TabLogin["label_"+this.lang]}</sp-button>
      <mwc-dialog id="pwdDialog" 
        heading="${langConfig.pwdWindowTitle["label_"+this.lang]}"
        scrimClickAction=""
        escapeKeyAction="">
        <div class="layout horizontal flex center-justified" style="opacity:0.8">
          <div class="input layout vertical" style="width: 70%">
            <mwc-textfield id="user" label="${langConfig.userToCheck["label_"+this.lang]}" type="text" .value=${this.userName} disabled></mwc-textfield>
            <mwc-textfield id="oldPwd" label="${langConfig.pwToCheck["label_"+this.lang]}" type="password" iconTrailing="visibility" 
              @click=${this.showPwd}></mwc-textfield>
            <mwc-textfield id="note" label="${langConfig.confirmUserNote["label_"+this.lang]}" type="text"></mwc-textfield>
          </div>
        </div>
        <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.checkingUser}>${commonLangConfig.confirmDialogButton["label_"+this.lang]}</sp-button>
        <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">${commonLangConfig.cancelDialogButton["label_"+this.lang]}</sp-button>
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

  get dialogSurface() {
    return this.pwdDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  get oldPwd() {
    return this.shadowRoot.querySelector("mwc-textfield#oldPwd")
  }

  get notePwd() {
    return this.shadowRoot.querySelector("mwc-textfield#note")
  }

  authorized() {
    this.userName = JSON.parse(sessionStorage.getItem("userSession")).userName;
  }

  firstUpdated() {
    this.updateComplete.then(() => {
      // manually backgrounding the dialog box
      this.dialogSurface.style.backgroundImage = "url(/images/abstract.jpg)";
      this.dialogSurface.style.backgroundSize = "cover";
      this.dialogSurface.style.backgroundRepeat = "no-repeat";
      this.dialogSurface.style.textAlign = "center";
      this.dialogSurface.style.padding = "20px";
    })
  }

  /**
   * Checking whether user exist and verified
   */
  checkingUser() {
    if (this.newPwd.value) {
      return this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
        actionName: "TOKEN_VALIDATE_USER_CREDENTIALS",
        finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
        userToCheck: this.userName,
        passwordToCheck: this.oldPwd.value
      })).then(j => {
        this.confirmNewPassword()
      })
    }
  }

  /**
   * Once user found and verified, confirm the password changing
   */
  confirmNewPassword() {
    return this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      actionName: "USER_CHANGE_PSWD",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      dbName: this.config.dbName,
      newPassword: this.newPwd.value
    })).then(j => {
      this.newPwd.value = ""
      this.oldPwd.value = ""
      this.notePwd.value = ""
    })
  }

  changeEsign() {
    console.log(this.newEsg.value)
  }
}

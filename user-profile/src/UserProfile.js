import { html, css } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts } from '@collaborne/lit-flexbox-literals';
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
};

export class UserProfile extends CredDialog {
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
      `
    ];
  }

  render() {
    return html`
      <div class="input">
        <div class="layout horizontal flex center">
          <mwc-textfield id="newPwd" .label="${langConfig.Password["label_"+this.lang]}" type="password" iconTrailing="visibility"
            @click=${this.showPwd} @keypress=${e=>{if (e.keyCode==13&&this.newPwd.value)this.credsChecker("TOKEN_VALIDATE_USER_CREDENTIALS") }}></mwc-textfield>
          <mwc-icon-button title="Confirm" icon="published_with_changes" @click=${()=>this.credsChecker("TOKEN_VALIDATE_USER_CREDENTIALS")} .label="${langConfig.ChangePassword["label_"+this.lang]}"></mwc-icon-button>
        </div>
        <div class="layout horizontal flex center">
          <mwc-textfield id="newEsign" .label="${langConfig.Esign["label_"+this.lang]}" type="password" iconTrailing="visibility"
            @click=${this.showPwd} @keypress=${e=>{if (e.keyCode==13&&this.newEsg.value)this.credsChecker("TOKEN_VALIDATE_ESIGN_PHRASE") }}></mwc-textfield>
          <mwc-icon-button title="Confirm" icon="published_with_changes" @click=${()=>this.credsChecker("TOKEN_VALIDATE_ESIGN_PHRASE")} .label="${langConfig.ChangeEsign["label_"+this.lang]}"></mwc-icon-button>
        </div>
      </div>
      <sp-button size="xl" @click=${()=>this.dispatchEvent(new CustomEvent('save-tabs'))}>${langConfig.TabLogin["label_"+this.lang]}</sp-button>
      ${super.render()}
    `;
  }

  get newPwd() {
    return this.shadowRoot.querySelector("mwc-textfield#newPwd")
  }

  get newEsg() {
    return this.shadowRoot.querySelector("mwc-textfield#newEsign")
  }

  reset() {
    super.reset()
    this.changing = true
  }

  firstUpdated() {
    super.firstUpdated()
    this.updateComplete.then(() => {
      this.newPwd.updateComplete.then(() => {
        setTimeout(() => {
          this.newPwd.focus();
        }, 100)
      })
    })
  }

  credsChecker(action) {
    if (action == "TOKEN_VALIDATE_USER_CREDENTIALS") {
      this.type = "user"
    } else if (action == "TOKEN_VALIDATE_ESIGN_PHRASE") {
      this.type = "esign"
    }
    super.credsChecker(action)
  }

  nextRequest() {
    if (this.actionName == "TOKEN_VALIDATE_USER_CREDENTIALS") {
      this.confirmNewPassword()
    } else if (this.actionName == "TOKEN_VALIDATE_ESIGN_PHRASE") {
      this.confirmNewEsign()
    }
    super.nextRequest()
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
      this.newPwd.value = ""
    })
  }

  /**
   * Confirm the esign changing
   */
  confirmNewEsign() {
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      actionName: "USER_CHANGE_ESIGN",
      finalToken: userSession.finalToken,
      dbName: this.config.dbName,
      newEsign: this.newEsg.value
    })).then(j => {
      if (j) {
        userSession.finalToken = j.finalToken
        sessionStorage.setItem("userSession", JSON.stringify(userSession))
      }
      this.newEsg.value = ""
    })
  }
}

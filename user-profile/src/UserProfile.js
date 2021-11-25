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
            @click=${this.showPwd} @keypress=${e=>{if (e.keyCode==13&&this.newPwd.value)this.confirmNewVal("USER_CHANGE_PSWD") }}></mwc-textfield>
          <mwc-icon-button title="Confirm" icon="published_with_changes" @click=${()=>this.confirmNewVal("USER_CHANGE_PSWD")} .label="${langConfig.ChangePassword["label_"+this.lang]}"></mwc-icon-button>
        </div>
        <div class="layout horizontal flex center">
          <mwc-textfield id="newEsign" .label="${langConfig.Esign["label_"+this.lang]}" type="password" iconTrailing="visibility"
            @click=${this.showPwd} @keypress=${e=>{if (e.keyCode==13&&this.newEsg.value)this.confirmNewVal("USER_CHANGE_ESIGN") }}></mwc-textfield>
          <mwc-icon-button title="Confirm" icon="published_with_changes" @click=${()=>this.confirmNewVal("USER_CHANGE_ESIGN")} .label="${langConfig.ChangeEsign["label_"+this.lang]}"></mwc-icon-button>
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

  confirmNewVal(action) {
    if (action == "USER_CHANGE_PSWD") {
      this.type = "user"
      this.credsChecker(action, -1, {
        newPassword: this.newPwd.value
      })
    } else if (action == "USER_CHANGE_ESIGN") {
      this.type = "esign"
      this.credsChecker(action, -1, {
        newEsign: this.newEsg.value
      })
    }
  }

  /**
   * Once user found and verified, confirm the password changing
   */
  confirmNewPassword() {
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    let params = this.config.backendUrl + this.config.appAuthenticateApiUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
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
    let params = this.config.backendUrl + this.config.appAuthenticateApiUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      if (j) {
        userSession.finalToken = j.finalToken
        sessionStorage.setItem("userSession", JSON.stringify(userSession))
      }
      this.newEsg.value = ""
    })
  }

  nextRequest() {
    super.nextRequest()
    if (this.actionName == "USER_CHANGE_PSWD") {
      this.confirmNewPassword()
    } else if (this.actionName == "USER_CHANGE_ESIGN") {
      this.confirmNewEsign()
    }
  }
}

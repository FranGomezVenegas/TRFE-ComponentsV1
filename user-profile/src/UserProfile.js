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
  "Esign": {
    "label_en": "New Esign",
    "label_es": "Nueva Firma Electrónica"
  },
  "Shift": {
    "label_en": "Shift",
    "label_es": "Turno",
    "items": [
      { "keyName": "M1", "keyValue_en": "Morning 1", "keyValue_es": "Mañana 1" },
      { "keyName": "M2", "keyValue_en": "Morning 2", "keyValue_es": "Mañana 2" },
      { "keyName": "N", "keyValue_en": "Night", "keyValue_es": "Nocturno" }
    ]
  },
  "ChangeLabel": {
    "label_en": "Confirm",
    "label_es": "Confirmar"
  },
  "TabLogin": {
    "label_en": "Save Open Tabs",
    "label_es": "Guardar Pestañas Actuales"
  }
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
          <mwc-textfield id="newPwd" .label="${langConfig.Password["label_" + this.lang]}" type="password" iconTrailing="visibility"
            @click=${this.showPwd} @keypress=${e => { if (e.keyCode == 13 && this.newPwd.value) this.confirmNewVal("USER_CHANGE_PSWD") }}></mwc-textfield>
          <mwc-icon-button title="Confirm" icon="published_with_changes" @click=${() => this.confirmNewVal("USER_CHANGE_PSWD")} .label="${langConfig.ChangeLabel["label_" + this.lang]}"></mwc-icon-button>
        </div>
        <div class="layout horizontal flex center">
          <mwc-textfield id="newEsign" .label="${langConfig.Esign["label_" + this.lang]}" type="password" iconTrailing="visibility"
            @click=${this.showPwd} @keypress=${e => { if (e.keyCode == 13 && this.newEsg.value) this.confirmNewVal("USER_CHANGE_ESIGN") }}></mwc-textfield>
          <mwc-icon-button title="Confirm" icon="published_with_changes" @click=${() => this.confirmNewVal("USER_CHANGE_ESIGN")} .label="${langConfig.ChangeLabel["label_" + this.lang]}"></mwc-icon-button>
        </div>
        <div class="layout horizontal flex center">
          <mwc-select label='${langConfig.Shift["label_" + this.lang]}' id="newShift">
            ${langConfig.Shift.items.map(c =>
      html`<mwc-list-item value="${c.keyName}" 
                ?selected=${c.keyName == this.userShift}>${c["keyValue_" + this.lang]}</mwc-list-item>`
    )}
          </mwc-select>
          <mwc-icon-button title="Confirm" icon="published_with_changes" @click=${() => this.confirmNewVal("UPDATE_USER_SHIFT")} .label="${langConfig.ChangeLabel["label_" + this.lang]}"></mwc-icon-button>
        </div>
      </div>
      <sp-button size="xl" @click=${() => this.dispatchEvent(new CustomEvent('save-tabs'))}>${langConfig.TabLogin["label_" + this.lang]}</sp-button>
      ${super.render()}
    `;
  }

  get newPwd() {
    return this.shadowRoot.querySelector("mwc-textfield#newPwd")
  }

  get newEsg() {
    return this.shadowRoot.querySelector("mwc-textfield#newEsign")
  }

  get newShift() {
    return this.shadowRoot.querySelector("mwc-select#newShift")
  }

  static get properties() {
    return {
      userShift: { type: String }
    }
  }

  authorized() {
    super.authorized()
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    console.log('userShift', 'userSession.header_info', userSession.header_info);
    this.userShift = userSession.header_info.shift
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
    } else if (action == "UPDATE_USER_SHIFT") {
      this.type = "user"
      this.credsChecker(action, -1, {
        newShift: this.newShift.value
      })
    }
  }

  /**
  Once user found and verified, confirm the shift changing
  */
  confirmNewShift() {
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    let params = this.config.backendUrl + this.config.appPlatformAdminActions
    '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      if (j) {
        userSession.finalToken = j.finalToken
        sessionStorage.setItem("userSession", JSON.stringify(userSession))
      }
    })
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
    } else if (this.actionName == "UPDATE_USER_SHIFT") {
      this.confirmNewShift()
    }
  }
}

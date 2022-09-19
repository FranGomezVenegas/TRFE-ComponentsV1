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
      mwc-icon-button#lang {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }
      mwc-button.button {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background: rgb(36, 192, 235) none repeat scroll 0% 0%;
        font-family: Montserrat;
        font-weight: bold;
        font-size: 19px;
        color: white;
        border-color: transparent !important;
        --mdc-button-fill-color: red;
        --mdc-button-ink-color: blue;
      }            
      mwc-icon-button {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }        
      mwc-icon-button.disabledtrue{        
        color : red;
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
        border-color : inherit !important;
        border-radius : 35px;
        -moz-border-radius : 35px;
        -webkit-border-radius : 35px;
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        color : #FFFFFF;
        color : rgb(255, 255, 255);
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
      mwc-select {
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
      mwc-list-item {
        background-color :  #FFFFFF;
        background-color : rgb(255, 255, 255);     
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
          <mwc-select label='${langConfig.Shift["label_" + this.lang]}' id="newShift" @change=${e=>this.userShift=e.target.value}>
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
    let params = this.config.backendUrl + this.config.appPlatformAdminActions
      + '?' + new URLSearchParams(this.reqParams)
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        userSession.header_info.shift = this.userShift
        sessionStorage.setItem("userSession", JSON.stringify(userSession))
      }
    })
  }

  /**
   * Once user found and verified, confirm the password changing
   */
  async confirmNewPassword() {
    let params = this.config.backendUrl + this.config.appAuthenticateApiUrl
      + '?' + new URLSearchParams(this.reqParams)
    await this.queryApi(params)
    this.newPwd.value = ""
  }

  /**
   * Confirm the esign changing
   */
  async confirmNewEsign() {
    let params = this.config.backendUrl + this.config.appAuthenticateApiUrl
      + '?' + new URLSearchParams(this.reqParams)
    await this.queryApi(params)
    this.newEsg.value = ""
  }

  queryApi(params) {
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    return this.fetchApi(params).then(j => {
      if (j) {
        userSession.finalToken = j.finalToken
        sessionStorage.setItem("userSession", JSON.stringify(userSession))
      }
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

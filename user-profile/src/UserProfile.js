import { html, css } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/web/button/text-button'
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button';
import '@material/web/button/text-button';

import '@material/web/textfield/filled-text-field';
import '@material/web/select/select-option';
import '@material/web/select/filled-select';

//import '@material/md-filled-text-field';
//import '@spectrum-web-components/button/sp-button';
import { DialogsFunctions } from '../../tr-procedures/src/components/GenericDialogs/DialogsFunctions';
import {TrazitCredentialsDialogs} from '../../tr-procedures/src/components/GenericDialogs/TrazitCredentialsDialogs';
const viewInfoDefinition = {
  "Password": {
    "label_en": "New Password",
    "label_es": "Nueva Contraseña",
    "empty_label_en": "Please fill the new password first",
    "empty_label_es": "Por favor entra una nueva contraseña antes",
  },
  "Esign": {
    "label_en": "New Esign",
    "label_es": "Nueva Firma Electrónica",
    "empty_label_en": "Please fill the new E Sign first",
    "empty_label_es": "Por favor entra una nueva firma electrónica antes",
  },
  "Email": {
    "label_en": "New Mail",
    "label_es": "Nuevo Correo",
    "empty_label_en": "Please fill the new E Sign first",
    "empty_label_es": "Por favor entra una nueva firma electrónica antes",
    "enabled": false
  },  
  "Alias": {
    "label_en": "New Alias",
    "label_es": "Nuevo Apodo",
    "empty_label_en": "Please fill the new E Sign first",
    "empty_label_es": "Por favor entra una nueva firma electrónica antes",
    "enabled": false
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
export class UserProfile extends TrazitCredentialsDialogs(DialogsFunctions(CredDialog)) {
  static get styles() {
    return [
      Layouts,
      super.styles,
      css`
      :host {
        display: block;
        width: 1000px;
      }
      :host([hidden]) {
        display: none;
      }
      div.input * {
        margin: 10px 0 5px;
        padding-left:10px;
        
      }
      md-icon {
        color: blue;
      }
      md-icon#lang {
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }
      md-button.button {        
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
      md-icon {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }        
      md-icon.enabledtrue{        
        color : red;
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }        
      md-icon#video {
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
      md-filled-text-field {
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
      nd-textfield.mdc-text-field {
      background-color :  #FFFFFF;
      background-color : rgb(255, 255, 255);     
      }      
      md-filled-select {
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
      md-select-option {
        background-color :  #FFFFFF;
        background-color : rgb(255, 255, 255);     
        }  
        
        * {
        box-sizing: border-box;
      }
      
      /* Create three equal columns that floats next to each other */
      .column {
        float: left;
        width: 33.33%;
        padding: 10px;   
        display: flex;     
      }
      
      /* Clear floats after the columns */
      .row:after {
        content: "";
        display: table;
        clear: both;
      }
      
      /* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
      @media screen and (max-width: 1000px) {
        .column {
          width: 100%;
        }
      }  
        md-filled-select {
          background-color: rgba(255, 255, 255, 1) !important; /* Fondo blanco para las opciones */
          color: black; /* Color del texto para las opciones */
        }        
        /* Estilo para md-select-option (opciones en la lista) */
        md-select-option {
          background-color: rgba(255, 255, 255, 1) !important; /* Fondo blanco para las opciones */
          color: black; /* Color del texto para las opciones */
        }

        /* Estilo para md-filled-text-field (campo de texto) */
        md-filled-text-field {
          --_container-color: rgba(255, 255, 255, 1); /* Fondo blanco */
          --_text-field-container-color: rgba(255, 255, 255, 1); /* Fondo blanco */
          --_text-field-active-indicator-color: rgba(49, 130, 189, 1); /* Color del borde activo */
          --md-comp-filled-text-field-container-background-color: rgba(255, 255, 255, 1); /* Fondo del contenedor */
        }              
      `      
    ];
  }
  render() {
    return html`
      <div class="row">
      <div class="icon-button"><md-icon slot="icon" @click=${this.getOpenIncidents}>refresh</md-icon></div>
        <div class="column">
          <md-filled-text-field id="newAlias" ?enabled=${viewInfoDefinition.Alias.enabled} .label="${viewInfoDefinition.Alias["label_" + this.lang]}" type="email" .value=${this.userAlias}
            @click=${this.showPwd} @keypress=${e => { if (e.keyCode == 13 && this.newAlias.value) this.confirmNewVal("USER_CHANGE_ALIAS") }}></md-filled-text-field>
          <md-icon title="Confirm" ?enabled=${viewInfoDefinition.Alias.enabled} icon="published_with_changes" @click=${() => this.confirmNewVal("UPDATE_USER_ALIAS")} .label="${viewInfoDefinition.ChangeLabel["label_" + this.lang]}">published_with_changes</md-icon>
        </div>

        <div class="column">
          <md-filled-text-field id="newMail" ?enabled=${viewInfoDefinition.Email.enabled} .label="${viewInfoDefinition.Email["label_" + this.lang]}" type="email" .value=${this.userMail}
            @click=${this.showPwd} @keypress=${e => { if (e.keyCode == 13 && this.newMail.value) this.confirmNewVal("USER_CHANGE_MAIL") }}></md-filled-text-field>
          <md-icon title="Confirm" ?enabled=${viewInfoDefinition.Email.enabled} icon="published_with_changes" @click=${() => this.confirmNewVal("UPDATE_USER_MAIL")} .label="${viewInfoDefinition.ChangeLabel["label_" + this.lang]}">published_with_changes</md-icon>
        </div>

        <div class="column">
          <md-filled-select label='${viewInfoDefinition.Shift["label_" + this.lang]}' id="newShift" @change=${e=>this.userShift=e.target.value}>
            ${viewInfoDefinition.Shift.items.map(c =>
              html`<md-select-option value="${c.keyName}" 
                ?selected=${c.keyName == this.userShift}>${c["keyValue_" + this.lang]}</md-select-option>`
              )}
          </md-filled-select>
          <md-icon title="Confirm" icon="published_with_changes" @click=${() => this.confirmNewVal("UPDATE_USER_SHIFT")} .label="${viewInfoDefinition.ChangeLabel["label_" + this.lang]}">published_with_changes</md-icon>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <md-filled-text-field id="newPwd" .label="${viewInfoDefinition.Password["label_" + this.lang]}" type="password" iconTrailing="visibility"
            @click=${this.showPwd} @keypress=${e => { if (e.keyCode == 13 && this.newPwd.value) this.confirmNewVal("USER_CHANGE_PSWD") }}></md-filled-text-field>
          <md-icon title="Confirm" icon="published_with_changes" @click=${() => this.confirmNewVal("USER_CHANGE_PSWD")} .label="${viewInfoDefinition.ChangeLabel["label_" + this.lang]}">published_with_changes</md-icon>
        </div>
        <div class="column">
          <md-filled-text-field id="newEsign" .label="${viewInfoDefinition.Esign["label_" + this.lang]}" type="password" iconTrailing="visibility"
            @click=${this.showPwd} @keypress=${e => { if (e.keyCode == 13 && this.newEsg.value) this.confirmNewVal("USER_CHANGE_ESIGN") }}></md-filled-text-field>
          <md-icon slot="icon" title="Confirm" icon="published_with_changes" @click=${() => this.confirmNewVal("USER_CHANGE_ESIGN")} .label="${viewInfoDefinition.ChangeLabel["label_" + this.lang]}">published_with_changes</md-icon>
        </div>
      </div>
      <text-button size="xl" @click=${() => this.dispatchEvent(new CustomEvent('save-tabs'))}>${viewInfoDefinition.TabLogin["label_" + this.lang]}</text-button>
      ${super.render()}
    `;
  }
 
  get newPwd() {return this.shadowRoot.querySelector("md-filled-text-field#newPwd")}
  get newEsg() {return this.shadowRoot.querySelector("md-filled-text-field#newEsign")}
  get newShift() {return this.shadowRoot.querySelector("md-filled-select#newShift")}
  get newMail() {return this.shadowRoot.querySelector("md-filled-text-field#newMail")}
  get newAlias() {return this.shadowRoot.querySelector("md-filled-text-field#newAlias")}
  static get properties() {
    return {
      userShift: { type: String },
      userMail: { type: String },
      userAlias: { type: String },
      targetValue:{ type: Object}
    }
  }
  constructor() {
    super();
    this.targetValue = {}
  }
  authorized() {
    super.authorized()
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    console.log('userShift', 'userSession.header_info', userSession.header_info);
    this.userShift = userSession.header_info.shift
    this.userMail = userSession.header_info.mail
    this.userAlias = userSession.header_info.alias
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
  confirmNewVal(actionName) {
    sessionStorage.setItem('actionInfoToAPIcall', JSON.stringify(this.actionBeingPerformedModel));
    let action={}
    action.actionName = actionName
    action.endPoint = this.config.appAuthenticateApiUrl
    action.requiresDialog = false
    action.notGetViewData = true
    this.targetValue=this.reqParams
    if (actionName == "USER_CHANGE_PSWD") {
      this.type = "user"
      if (this.newPwd.value===undefined||this.newPwd.value.length===0){
        alert(viewInfoDefinition.Password["empty_label_" + this.lang])
        return
      }
//        this.selectedItems=[]
//      let item={newPassword: this.newPwd.value}
//      this.selectedItems.push(item)
//      this.actionMethod(action)
      //return
//      this.config.appAuthenticateApiUrl
      this.actionBeingPerformedModel=action
      console.log(action)
      this.type = "user"
      this.trazitCredsChecker(actionName, -1, {
        newPassword: this.newPwd.value}, action, true, 'user')
    } else if (actionName == "USER_CHANGE_ESIGN") {
      this.type = "esign"
      if (this.newEsg.value===undefined||this.newEsg.value.length===0){
        alert(viewInfoDefinition.Esign["empty_label_" + this.lang])
        return
      }
      this.actionBeingPerformedModel=action
      this.type = "esign"
      this.trazitCredsChecker(actionName, -1, {
        newEsign: this.newEsg.value}, action, true, 'esign')
    } else if (actionName == "UPDATE_USER_SHIFT") {
      console.log('action', action)
      action.endPoint='/app/PlatformAdminAPIactions'
      this.actionBeingPerformedModel=action
      this.type = "user"
      this.trazitCredsChecker(actionName, -1, {
        newShift: this.newShift.value}, this.targetValue, action, true, 'user')
    } else if (actionName == "UPDATE_USER_MAIL") {
      console.log('action', action)
      action.endPoint='/app/PlatformAdminAPIactions'
      this.actionBeingPerformedModel=action
      this.type = "user"
      this.trazitCredsChecker(actionName, -1, {
        newMail: this.newMail.value}, this.targetValue, action, true, 'user')
    } else if (actionName == "UPDATE_USER_ALIAS") {
      console.log('action', action)
      action.endPoint='/app/PlatformAdminAPIactions'
      this.actionBeingPerformedModel=action
      this.type = "user"
      this.trazitCredsChecker(actionName, -1, {
        newAlias: this.newAlias.value}, this.targetValue, action, true, 'user')
    }
  }
  /**
  Once user found and verified, confirm the shift changing
  */
  confirmNewShift() {
    let action={}
    action.actionName = 'UPDATE_USER_SHIFT'
    action.endPoint = '/app/PlatformAdminAPIactions'
    action.requiresDialog = false
    action.notGetViewData = true
    let APIParams=this.getAPICommonParams(action)
    let params = this.config.backendUrl + action.endPoint
      + '?' + new URLSearchParams(APIParams) + '&' + new URLSearchParams(this.reqParams)
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        userSession.header_info.shift = this.userShift
        sessionStorage.setItem("userSession", JSON.stringify(userSession))
      }
    })
  }

  confirmNewMail() {
    let action={}
    action.actionName = 'UPDATE_USER_MAIL'
    action.endPoint = '/app/PlatformAdminAPIactions'
    action.requiresDialog = false
    action.notGetViewData = true
    let APIParams=this.getAPICommonParams(action)
    let params = this.config.backendUrl + action.endPoint
      + '?' + new URLSearchParams(APIParams) + '&' + new URLSearchParams(this.reqParams)
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        userSession.header_info.email = this.userMail
        sessionStorage.setItem("userSession", JSON.stringify(userSession))
      }
    })
  }
  confirmNewAlias() {
    let action={}
    action.actionName = 'UPDATE_USER_ALIAS'
    action.endPoint = '/app/PlatformAdminAPIactions'
    action.requiresDialog = false
    action.notGetViewData = true
    let APIParams=this.getAPICommonParams(action)
    let params = this.config.backendUrl + action.endPoint
      + '?' + new URLSearchParams(APIParams) + '&' + new URLSearchParams(this.reqParams)
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        userSession.header_info.alias = this.userAlias
        sessionStorage.setItem("userSession", JSON.stringify(userSession))
      }
    })
  }

  /**
   * Once user found and verified, confirm the password changing
   */
  async confirmNewPassword() {
//    let params = this.config.backendUrl + this.config.appAuthenticateApiUrl      + '?' + new URLSearchParams(this.reqParams)
    let action={}
    action.actionName = 'USER_CHANGE_PSWD'
    action.endPoint = '/app/AuthenticationAPIactions'
    action.requiresDialog = false
    action.notGetViewData = true
    let APIParams=this.getAPICommonParams(action)
    let params = this.config.backendUrl + action.endPoint
      + '?' + new URLSearchParams(APIParams) + '&' + new URLSearchParams(this.reqParams)
    await this.queryApi(params)
    this.newPwd.value = ""
  }
  /**
   * Confirm the esign changing
   */
  async confirmNewEsign() {
    // let params = this.config.backendUrl + this.config.appAuthenticateApiUrl      + '?' + new URLSearchParams(this.reqParams)
    let action={}
    action.actionName = 'USER_CHANGE_ESIGN'
    action.endPoint = '/app/AuthenticationAPIactions'
    action.requiresDialog = false
    action.notGetViewData = true
    let APIParams=this.getAPICommonParams(action)
    let params = this.config.backendUrl + action.endPoint
      + '?' + new URLSearchParams(APIParams) + '&' + new URLSearchParams(this.reqParams)
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
    } else if (this.actionName == "UPDATE_USER_MAIL") {
      this.confirmNewMail()
    } else if (this.actionName == "UPDATE_USER_ALIAS") {
      this.confirmNewAlias()
    }
  }
}

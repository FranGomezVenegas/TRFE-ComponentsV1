import { html, css } from 'lit';
import { CommonCore, commonLangConfig } from '@trazit/common-core';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-textfield';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@spectrum-web-components/button/sp-button';
import '@trazit/tr-dialog/tr-dialog';

const langConfig = {
  "pwdWindowTitle": {
    "label_en": "Please confirm your credentials (user & password)",
    "label_es": "Por favor confirma tu identidad (usuario y contraseña)"
  },
  "esignWindowTitle": {
    "label_en": "Please enter your eSign",
    "label_es": "Por favor entra tu frase de Firma Electrónica"
  },
  "justificationWindowTitle": {
    "label_en": "Please enter the justification phrase",
    "label_es": "Por favor entra tu frase de justificación"
  },
  "action": {
    "label_en": "Action name", 
    "label_es": "Nombre de la acción"
  },
  "userToCheck": {
    "label_en": "User", 
    "label_es": "Usuario"
  },
  "pwToCheck": {
    "label_en": "Password", 
    "label_es": "Contraseña"
  },
  "esgToCheck": {
    "label_en": "Esign", 
    "label_es": "Esign"
  },
  "jstToCheck": {
    "label_en": "Justification Phrase", 
    "label_es": "Frase de Justificación"
  },
  "notCorrectMessage": {
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
}

export class CredDialog extends CommonCore {
  static get styles() {
    return [
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
      p.attemptsphraseblue {
        color: #464dbb;
      }
      p.attemptsphrasered {
        color: #f3371680;
        animation-duration: 2s;
        animation-name: slidein;
      }
      @keyframes slidein {
        from {
          margin-left: 30%;
        }
        to {
          margin-left: 0%;
        }
      }           
      @media (max-width: 460px) {
      }
      `
    ];
  }

  static get properties() {
    return {
      type: { type: String }, // user, esign, justification (default user)
      header: { type: String },
      // for changing purpose we will adjust the placeholder of text label
      // for example in user-profile
      changing: { type: Boolean },
      attempt: { type: Number },
      maxFails: { type: Number },
      actionName: { type: String },
      objectId: { type: String },
      justificationType: { type: String },
      nonProc: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.type = "user";
    this.changing = false;
    this.attempt = 0;
    this.maxFails = 3;
    this.justificationType = "TEXT";
    this.nonProc = false;
  }

  firstUpdated() {
    super.firstUpdated()
    this.updateComplete.then(() => {
      // manually backgrounding the dialog box
      // password dialog
      this.dialogSurface.style.backgroundImage = "url(/images/abstract.jpg)";
      this.dialogSurface.style.backgroundSize = "cover";
      this.dialogSurface.style.backgroundRepeat = "no-repeat";
      this.dialogSurface.style.textAlign = "center";
      this.credDialog.shadowRoot.querySelector("h2#title").style.fontSize = "20px";
      this.credDialog.shadowRoot.querySelector("#content").style.paddingBottom = "0";
    })
  }

  updated(updates) {
    super.updated(updates)
    if (updates.has('type')) {
      if (this.type == "user") {
        this.header = `${langConfig.pwdWindowTitle["label_"+this.lang]}`
      } else if (this.type == "esign") {
        this.header = `${langConfig.esignWindowTitle["label_"+this.lang]}`
      } else if (this.type == "justification") {
        this.header = `${langConfig.justificationWindowTitle["label_"+this.lang]}`
      }
    }
  }

  render() {
    return html`
      <tr-dialog id="credDialog" 
        @closed=${this.reset}
        heading="${this.header}"
        hideActions=""
        scrimClickAction="">
        <div class="content layout vertical flex center-justified">
          ${this.changing||this.nonProc ?
            null :
            html`
            <mwc-textfield label="${langConfig.action["label_"+this.lang]}" .value=${this.actionName} type="text" disabled></mwc-textfield>
            <mwc-textfield label="Id" .value=${this.objectId} type="text" disabled></mwc-textfield>
            `
          }
          ${this.inputField()}
          ${this.changing||this.nonProc ?
            null :
            html`${this.auditField()}`
          }
          <div style="margin-top:30px">
            ${this.nonProc ?
              // closing dialog for non procedures i.e relogin on lock inactivity
              html`<sp-button size="xl" variant="secondary" @click=${()=>this.dispatchEvent(new CustomEvent('cancel'))}>${commonLangConfig.cancelDialogButton["label_"+this.lang]}</sp-button>` :
              // for procedures
              html`<sp-button size="xl" variant="secondary" dialogAction="close">${commonLangConfig.cancelDialogButton["label_"+this.lang]}</sp-button>`
            }
            <sp-button size="xl" @click=${this.checking}>${commonLangConfig.confirmDialogButton["label_"+this.lang]}</sp-button>
          </div>
          ${this.setAttempts()}
        </div>
      </tr-dialog>
    `;
  }

  /**
   * Composition template for the input fields
   * filter out by creds type
   */
  inputField() {
    if (this.type == "user") {
      // adjust the placeholder label for changing purpose
      return html`
        <mwc-textfield id="user" label="${langConfig.userToCheck["label_"+this.lang]}" type="text" .value=${this.userName} disabled></mwc-textfield>
        <mwc-textfield id="pwd" label="${this.adjustLbl(`${langConfig.pwToCheck["label_"+this.lang]}`)}" type="password" iconTrailing="visibility" 
          dialogInitialFocus
          @click=${this.showPwd}
          @keypress=${e=>this.keyPress(e, 'checkingUser')}></mwc-textfield>
      `
    } else if (this.type == "esign") {
      // adjust the placeholder label for changing purpose
      return html`
        <mwc-textfield id="esg" label="${this.adjustLbl(`${langConfig.esgToCheck["label_"+this.lang]}`)}" type="password" iconTrailing="visibility" 
          dialogInitialFocus
          @click=${this.showPwd}
          @keypress=${e=>this.keyPress(e, 'checkingPhrase')}></mwc-textfield>
      `
    }
  }

  /**
   * TEXT: free text auditPhrase
   * LIST: list of auditPhrase
   * TEXTLIST: combination of TEXT & LIST
   */
  auditField() {
    // adjust the placeholder label for changing purpose
    if (this.justificationType == "TEXT") {
      return html`
        <mwc-textfield id="jst" label="${this.adjustLbl(`${langConfig.jstToCheck["label_"+this.lang]}`)}" type="text" 
          ?dialogInitialFocus=${this.justificationType?true:false} 
          @keypress=${this.keyPress}></mwc-textfield>
      `
    } else {
      return html`
        <vaadin-combo-box id="jst"
          item-label-path="name"
          item-value-path="id"
          .placeholder="${langConfig.jstToCheck["label_"+this.lang]}"
          .label="${langConfig.jstToCheck["label_"+this.lang]}"
          .value=${this.justificationType=="LIST"?this.justificationList[0]:null}
          ?dialogInitialFocus=${this.justificationType?true:false}
          @keypress=${this.keyPress}
          @change=${this.keyPress}
          .items="${this.justificationList}"></vaadin-combo-box>
      `
    }
  }

  /**
   * Adjusting the placeholder label based the actived language
   * @param {*} label 
   */
  adjustLbl(label) {
    if (this.changing) {
      if (this.lang == "en") {
        return "Current "+label
      } else {
        return label+" Actual"
      }
    } else {
      return label
    }
  }

  get credDialog() {
    return this.shadowRoot.querySelector("tr-dialog#credDialog")
  }

  get pwd() {
    return this.shadowRoot.querySelector("mwc-textfield#pwd")
  }

  get esg() {
    return this.shadowRoot.querySelector("mwc-textfield#esg")
  }

  get jst() {
    return this.shadowRoot.querySelector("#jst")
  }

  get dialogSurface() {
    return this.credDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  keyPress(e, method) {
    if (e.keyCode==13) {
      if (method) { // keypress password / esign field
        // if found justification field, focus to audit field
        if (this.justificationType) {
          this.jst.focus()
        } else {
          this.checking()
        }
      } else { // keypress justification field
        this.checking()
      }
    }
  }

  /**
   * which creds request should be requested
   */
  checking() {
    if (this.type == "user") {
      this.checkingUser()
    } else if (this.type == "esign") {
      this.checkingPhrase()
    } else if (this.type == "justification") {
      this.nextRequest()
    }
  }

  checkAttempt() {
    if (this.attempt > 1) {
      this.credDialog.close()
      if (this.nonProc) {
        this.dispatchEvent(new CustomEvent('cancel'))
      }
    } else {
      this.attempt++
    }
  }

  /**
   * set the justification type, generate justification list for non text type
   */
  checkProcList() {
    this.justificationType = null
    this.justificationList = null
    let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures[0]
    if (procList.actions_with_confirm_user.indexOf(this.actionName) >= 0) {
      let idx = procList.actions_with_confirm_user.findIndex(p => p == this.actionName)
      --idx // the object is on the previous index
      if (procList.actions_with_confirm_user[idx][this.actionName].type) {
        this.justificationType = procList.actions_with_confirm_user[idx][this.actionName].type
        if (this.justificationType != "TEXT") {
          this.justificationList = procList.actions_with_confirm_user[idx][this.actionName].list_entries
        }
      }
      this.type = "user"
    } else if (procList.actions_with_esign.indexOf(this.actionName) >= 0) {
      let idx = procList.actions_with_esign.findIndex(p => p == this.actionName)
      --idx // the object is on the previous index
      if (procList.actions_with_esign[idx][this.actionName].type) {
        this.justificationType = procList.actions_with_esign[idx][this.actionName].type
        if (this.justificationType != "TEXT") {
          this.justificationList = procList.actions_with_esign[idx][this.actionName].list_entries
        }
      }
      this.type = "esign"
    } else if (procList.actions_with_justification_phrase.indexOf(this.actionName) >= 0) {
      let idx = procList.actions_with_justification_phrase.findIndex(p => p == this.actionName)
      --idx // the object is on the previous index
      if (procList.actions_with_justification_phrase[idx][this.actionName].type) {
        this.justificationType = procList.actions_with_justification_phrase[idx][this.actionName].type
        if (this.justificationType != "TEXT") {
          this.justificationList = procList.actions_with_justification_phrase[idx][this.actionName].list_entries
        }  
      }
      this.type = "justification"
    }
  }

  credsChecker(actionName, objId) {
    if (actionName) {
      this.actionName = actionName
      this.objectId = objId
      this.checkProcList()
      this.credDialog.show()
    }
  }

  checkingUser() {
    let params = this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      actionName: "TOKEN_VALIDATE_USER_CREDENTIALS",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      userToCheck: this.userName,
      passwordToCheck: this.pwd.value
    })
    console.log(this.actionName)
    console.log(this.objectId)
    console.log(this.jst.value)
    console.log(params)
    this.fetchApi(params, false).then(j => {
      if (j) {
        this.nextRequest()
      } else {
        this.checkAttempt()
      }
    })
  }

  checkingPhrase() {
    let params = this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      actionName: "TOKEN_VALIDATE_ESIGN_PHRASE",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      esignPhraseToCheck: this.esg.value
    })
    console.log(this.actionName)
    console.log(this.objectId)
    console.log(this.jst.value)
    console.log(params)
    this.fetchApi(params, false).then(j => {
      if (j) {
        this.nextRequest()
      } else {
        this.checkAttempt()
      }
    })
  }

  nextRequest() {
    console.log(this.actionName)
    console.log(this.objectId)
    console.log(this.jst.value)
  }

  setAttempts() {
    if (this.type == "justification") {
      return
    }
    let txt = this.lang == "en" ? 
      `*** Attempts: ${this.attempt} of 3` : 
      `*** Intentos: ${this.attempt} de ${this.maxFails}`
    return html`<p class=${this.attempt==0?'attemptsphraseblue':'attemptsphrasered'}>${txt}</p>`
  }
}
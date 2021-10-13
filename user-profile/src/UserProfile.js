import { html, css, LitElement } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-dialog';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@spectrum-web-components/button/sp-button';

export class UserProfile extends LitElement {
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
      config: { type: Object },
      userName: { type: String }
    };
  }

  constructor() {
    super();
    this.config = {};
    this.userName = "";
  }

  render() {
    return html`
      <div class="input">
        <div class="layout horizontal flex center">
          <mwc-textfield label="New Password" type="password" iconTrailing="visibility"
            @click=${this.showPwd}></mwc-textfield>
          <mwc-icon-button icon="published_with_changes" @click=${()=>this.pwdDialog.open=true}></mwc-icon-button>
        </div>
        <div class="layout horizontal flex center">
          <mwc-textfield label="New Esign" type="password" iconTrailing="visibility"
            @click=${this.showPwd}></mwc-textfield>
          <mwc-icon-button icon="published_with_changes" @click=${this.changeEsign}></mwc-icon-button>
        </div>
      </div>
      <sp-button size="xl" @click=${this.login}>Save Open Tabs</sp-button>
      <mwc-dialog id="pwdDialog" 
        heading="Please confirm your credentials (user & password)"
        scrimClickAction=""
        escapeKeyAction="">
        <div class="layout horizontal flex center-justified" style="opacity:0.8">
          <div class="input layout vertical" style="width: 70%">
            <mwc-textfield label="User" type="text" .value=${this.userName} disabled></mwc-textfield>
            <mwc-textfield label="Password" type="password" iconTrailing="visibility" 
              @keypress=${this.keyPwd}
              @click=${this.showPwd}></mwc-textfield>
            <mwc-textfield label="Note" type="text" @keypress=${this.keyPwd}></mwc-textfield>
          </div>
        </div>
        <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.checkingUser}>Accept</sp-button>
        <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">Cancel</sp-button>
      </mwc-dialog>

    `;
  }

  get newPwd() {
    return this.shadowRoot.querySelector("mwc-textfield[label='New Password']")
  }

  get newEsg() {
    return this.shadowRoot.querySelector("mwc-textfield[label='New Esign']")
  }

  get pwdDialog() {
    return this.shadowRoot.querySelector("mwc-dialog#pwdDialog")
  }

  get dialogSurface() {
    return this.pwdDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  get oldPwd() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Password']")
  }

  get notePwd() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Note']")
  }

  firstUpdated() {
    this.updateComplete.then(() => {
      if (sessionStorage.getItem("userSession")) {
        this.userName = JSON.parse(sessionStorage.getItem("userSession")).userName;
      }
      // manually backgrounding the dialog box
      this.dialogSurface.style.backgroundImage = "url(/images/abstract.jpg)";
      this.dialogSurface.style.backgroundSize = "cover";
      this.dialogSurface.style.backgroundRepeat = "no-repeat";
      this.dialogSurface.style.textAlign = "center";
      this.dialogSurface.style.padding = "20px";
    })
  }

  /**
   * Pressing enter from password / note field
   * @param {*} e the element that fires event
   */
  keyPwd(e) {
    if (e.which == 13) {
      this.checkingUser()
    }
  }

  /**
   * Checking whether user exist and verified
   */
  checkingUser() {
    if (this.newPwd.value) {
      return fetch(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
        actionName: "TOKEN_VALIDATE_USER_CREDENTIALS",
        finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
        userToCheck: this.userName,
        passwordToCheck: this.oldPwd.value
      })).then(async r => {
        if (r.status == 200) {
          return r.json()
        } else {
          let err = await r.json()
          throw err
        }
      }).then(j => {
        this.confirmNewPassword()
      }).catch(e => {
        console.log(e.message_en)
      })
    }
  }

  /**
   * Once user found and verified, confirm the password changing
   */
  confirmNewPassword() {
    return fetch(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      actionName: "USER_CHANGE_PSWD",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      dbName: this.config.dbName,
      newPassword: this.newPwd.value
    })).then(async r => {
      if (r.status == 200) {
        return r.json()
      } else {
        let err = await r.json()
        throw err
      }
    }).then(j => {
      this.newPwd.value = ""
      this.oldPwd.value = ""
      this.notePwd.value = ""
    }).catch(e => {
      console.log(e.message_en)
    })
  }

  changeEsign() {
    console.log(this.newEsg.value)
  }

  showPwd(e) {
    if (e.pointerId == -1) {
      e.target.type = e.target.type == "password" ? "text" : "password";
    }
  }
}

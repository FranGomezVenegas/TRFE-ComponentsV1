import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-dialog';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@spectrum-web-components/button/sp-button';

export function getUserSession() {
  let userSession = JSON.parse(sessionStorage.getItem("userSession"))
  return userSession
}

export const langConfig = {
  "title": {
    "label_en": "Trace it !!!", 
    "label_es": "¡¡ TRÁZALO !!"
  },
  "password": {
    "label_en": "Password", 
    "label_es": "Contraseña"
  },
  "user": {
    "label_en": "User", 
    "label_es": "Usuario"
  },
  "buttonAccess": {
    "label_en": "Access", 
    "label_es": "Entrar"
  },
  "role": {
    "label_en": "Role", 
    "label_es": "Rol"
  }
}

export class PlatformLogin extends CommonCore {
  static get styles() {
    return [
      Layouts,
      css`
      :host {
        display: block;
        width: 400px;
      }
      :host([hidden]) {
        display: none;
      }
      div.login-box {
        background-color: rgba(177, 242, 244, 25%);
        border-radius: 20px;
        box-shadow: 5px 5px #888888;
        padding: 10px;
      }
      img.appLoginLogoOnTop {
        height: 4.08vmax;
        width: 17.85vmax;
      }
      h2 {
        font-family: 'Oxygen', sans-serif;
        font-size: 35px;
        color: #1676f3;
      }
      div.input * {
        margin-bottom: 15px;
      }
      mwc-icon-button#video {
        color: #6495ed;
      }
      video {
        width: 480px;
        height: 480px;
      }
      @media (max-width: 460px) {
        :host {
          display: block;
          width: 300px;
        }
        video {
          width: 300px;
          height: 300px;
        }
      }
    `];
  }

  static get properties() {
    return {
      hidden: { type: Boolean, reflect: true },
      auth: { type: Boolean },
      userRoles: { type: Array },
      setRole: { type: String }
    };
  }

  constructor() {
    super();
    this.hidden = true;
    this.auth = false;
    this.userRoles = [];
  }

  firstUpdated() {
    super.firstUpdated()
    // focusing to username once rendered
    this.updateComplete.then(() => {
      this.user.focus()
    })
  }

  updated(updates) {
    if (updates.has('config') && JSON.stringify(this.config) != "{}") {
      this.hidden = false
    }
    super.updated(updates)
  }

  render() {
    return html`
      <div class="login-box layout vertical flex center">
        <img class="appLoginLogoOnTop" src="/images/trazit-removebg.png" />
        <mwc-icon-button @click=${this.changeLang}>
          <img .src="/images/${this.flag}.jpg" />
        </mwc-icon-button>
        <h2>${langConfig.title["label_"+this.lang]}</h2>
        <div class="input layout vertical flex">
          <mwc-textfield label="${langConfig.user["label_"+this.lang]}" @keypress=${()=>this.password.focus()}></mwc-textfield>
          <mwc-textfield label="${langConfig.password["label_"+this.lang]}" type="password" iconTrailing="visibility" 
            @keypress=${this.checkLogin}
            @click=${this.showPwd}></mwc-textfield>
          <sp-button size="xl" @click=${this.login}>${langConfig.buttonAccess["label_"+this.lang]}</sp-button>
          <mwc-select label="${langConfig.role["label_"+this.lang]}" @change=${this.setRole} ?disabled=${!this.userRoles.length}>
            ${this.userRoles.map(r => 
              html`<mwc-list-item value="${r}">${r}</mwc-list-item>`
            )}
          </mwc-select>
        </div>
        <mwc-icon-button id="video" icon="videocam" @click=${()=>this.shadowRoot.querySelector("#videoDialog").open=true}></mwc-icon-button>
        <mwc-dialog id="videoDialog" 
          heading=""
          scrimClickAction=""
          escapeKeyAction="">
          <div>
            <video controls>
              <source 
              src="https://public.bl.files.1drv.com/y4mLz8UF0o6QbcW2MVcx9le4afsSHgqDKGPrUHQ7QBL1RyBMhow077DNRlmWwTYqqFsHfbstKYno7TWVTuLeW72OeC7RL1-8E3PpOOY6A9Fv28Cw_-orPVE8paObv2yEv0Ku3fGMbXv1RwhkNixP9ENnU0bd9mCIwjHwBYI0o9kf_ZUQOkvBxLjY1nh-9r84LCmxNAAWwoEwiEvT59VAUTaCUDdBWfAtTS6Od_IrhMs_WI?access_token=EwAYA61DBAAU2kADSankulnKv2PwDjfenppNXFIAARIUjO3SPOOldTu%2bfRZXa/7IxRSKT/yHxi6TDPEMWi7m56Xu0ZvLeQpsnF1VAwPYbULfcnZszwb4pl0so1RzIt8xKsc024d2mqdbWqGahVJu9MBRupIJj7M7RTzV2BVzDP40EpOAn64GIBX25pFK9W8YBQncVp0IWvcRLveU4/4mwDz0xJQ51uO/EkyqGTmywDTpV4jnzpuXUpMhK3citM8h44J/BPtMOw5Vf3d%2bZAVJwzlxdcr0jniDoe6VMoEp/jcfAJOMuUVb7WdUMDX1hqnnWRVszuleV43CaAwHXFBIItUtXjQ0oEaq39%2banlUCYjox9HHNh2HwTR55XWd7XGIDZgAACONZoBMGDdAD6AF%2blO5w6UUZKxr%2b8omTC7yGYb6GOx9RIOAi/S/6luSum1yIWD0Q6XAPyxl6wTURmBFLhRejmDf/gqkMduocV%2bSeXsOyDOVjvZN0uIS9USVeyNJ5wmfVcFQGwfbwNJ7remfqXMpCdYwS%2b06m6JrM6K4mMls6ScK5TCViZGDAbO8Bxgy9hMMnJFZinAJ9YtiMk4Fvy3eLQxoIStrywz3odmfMUVpnNDzBeEFBGfxtcGjIrkdEEIUN65DCgxiByur/9HiCNEOETbTNwe8ZyTd30WJjCyfHzEJOqvuchI1pc0hR3Lkil7Eo/6Beq%2bac2PvrivbWH7SmISPJ%2b1Kz5vcxdvX4SFqrdLKroweaiPiAS4hvNKWSNmr5yusNtMUN6Fp9bc8wdc5MdSlOmAgT7dNvjd8dN40p2KRTc65IJ4c6HjaDGpmMVweJktSK1R3lxg49xpG0Cty9lPTMvgf4/JlqFZjOAiudmLLYdjuYW2u1w7BfYZjPbQqqgU5cWt06WiokHMIeEjY9zmfR0shuZQVyN/ZfGf%2boINmfPgTTOEQzY0NpiI82tcx2lNhq8Yto4PMRHgExol1iVf7r116yskiQFtPBa4hAdwTTEhBzfHQYz%2bPK1J3fMyv0qXMJ9KmMk4CqYTgLLP0ttzyDZxcC"
              type="video/mp4">
            </video>
          </div>
          <mwc-icon-button icon="close"
              slot="secondaryAction"
              dialogAction="cancel">
          </mwc-icon-button>
        </mwc-dialog>
      </div>
    `;
  }

  get user() {
    return this.shadowRoot.querySelector("mwc-textfield[label=User]")
  }

  get password() {
    return this.shadowRoot.querySelector("mwc-textfield[label=Password]")
  }

  get role() {
    return this.shadowRoot.querySelector("mwc-select[label=Role]")
  }

  clearSessionStorage() {
    window.sessionStorage.clear();
  }

  logout() {
    console.log('PlatformLogin::logout')
    this.clearSessionStorage();
    window.location.href = "/";
  }

  checkLogin(e) {
    // Allow user to send by press enter
    if (e.which == 13) {
      this.login();
    }
  }

  async login() {
    try {
      // requesting partial token
      await this.reqPartialToken()
      // requesting user roles
      await this.reqUserRoles()
      // requesting final token
      if (this.userRoles.length == 1) {
        this.role.value = this.userRoles[0];
      }
    } catch (e) {
      console.log("Error: ", e)
      this.clearSessionStorage();
      this.error(e);
    }
  }

  async setRole(e) {
    if (e.target.value) {
      await this.reqFinalToken();
      this.authorized();
    }
  }

  authorized() {
    console.log("reqFinal ", JSON.parse(sessionStorage.getItem("userSession")))
    this.auth = true;
    this.hidden = true;
    this.dispatchEvent(new CustomEvent("authorized", {bubbles: true, composed: true}));
  }

  reqPartialToken() {
    return this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      dbUserName: this.user.value,
      dbUserPassword: this.password.value,
      dbName: this.config.dbName,
      actionName: 'authenticate'
    })).then(j => {
      sessionStorage.setItem('partialToken', JSON.stringify(j))
    })
  }

  reqUserRoles() {
    let partialToken = JSON.parse(sessionStorage.getItem('partialToken'))
    return this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      myToken: partialToken.myToken,
      dbName: this.config.dbName,
      actionName: 'getuserrole'
    })).then(async j => {
      this.userRoles = j;
      await this.requestUpdate();
    })
  }

  reqFinalToken() {
    let partialToken = JSON.parse(sessionStorage.getItem('partialToken'))
    return this.fetchApi(this.config.backendUrl + this.config.appAuthenticateApiUrl + '?' + new URLSearchParams({
      myToken: partialToken.myToken,
      userRole: this.role.value,
      dbName: this.config.dbName,
      actionName: 'finaltoken'
    })).then(j => {
      sessionStorage.setItem("userSession", JSON.stringify({
        ...j,
        userName: this.user.value,
        userRole: this.role.value
      }))
    })
  }
}

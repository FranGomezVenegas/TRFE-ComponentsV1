import { LitElement, html } from 'lit';

function installMediaQueryWatcher(mediaQuery, layoutChangedCallback) {
  let mql = window.matchMedia(mediaQuery);
  mql.addListener((e) => layoutChangedCallback(e.matches));
  layoutChangedCallback(mql.matches);
}

export const commonLangConfig = {
  "cancelDialogButton": {
    "label_en": "Cancel", 
    "label_es": "Cancelar"
  },
  "confirmDialogButton": {
    "label_en": "Accept", 
    "label_es": "Aceptar"
  },
  "closeDialogButton":{
    "label_en": "Close", 
    "label_es": "Cerrar"
  },
  "confirmActionPhrase":{
    "label_en": "Are you sure you want to continue doing", 
    "label_es": "¿Está seguro que desea continuar aplicando"
  }
}

export class CommonCore extends LitElement {
  static get properties() {
    return {
      config: { type: Object },
      flag: { type: String },
      lang: { type: String },
      fieldErrMsg: { type: Object },
      desktop: { type: Boolean },
      userName: { type: String }
    };
  }

  constructor() {
    super();
    this.config = {};
    this.userName = "";
    this.lang = "en";
  }

  firstUpdated() {
    installMediaQueryWatcher(`(min-width: 461px)`, desktop => this.desktop = desktop );
  }

  updated(updates) {
    if (updates.has('config') && JSON.stringify(this.config) != "{}" && sessionStorage.getItem("userSession")) {
      this.authorized()
    }
    if (updates.has("lang")) {
      this.changeFlag()
      this.dispatchEvent(new CustomEvent('change-lang', {
        detail: {lang: this.lang},
        bubbles: true,
        composed: true
      }))  
    }
  }

  // Override this method once authorized
  authorized() {
    console.log(JSON.parse(sessionStorage.getItem("userSession")))
    this.userName = JSON.parse(sessionStorage.getItem("userSession")).userName
  }

  /**
   * Populating fetch api
   * @param {*} urlParams the url api with params
   * @param {*} feedback will be show up the user feedback
   */
  fetchApi(urlParams, feedback=true) {
    let log = true
    if (urlParams.indexOf("/frontend/") >= 0) {
      log = false
    }
    urlParams += "&isForTesting="+ this.config.isForTesting
    this.dispatchEvent(new CustomEvent('set-activity', {bubbles: true, composed: true}))
    return fetch(urlParams).then(async r => {
      if (r.status == 200) {
        return r.json()
      } else {
        let err = await r.json()
        throw err
      }
    }).then(j => {
      if (feedback) {
        this.dispatchEvent(new CustomEvent('success', {
          detail: {...j, log: log},
          bubbles: true,
          composed: true
        }))
      }
      return j
    }).catch(e => {
      if (e.message == "Unexpected end of JSON input") {
        this.dispatchEvent(new CustomEvent("error", {
          detail: {...e},
          bubbles: true,
          composed: true
        }))
        return
      } else {
        this.dispatchEvent(new CustomEvent("error", {
          detail: {...e, log: log},
          bubbles: true,
          composed: true
        }))
        this.error(e)
        return e
      }
    })
  }

  error(e) { }

  showPwd(e) {
    if (e.pointerId == -1) {
      e.target.type = e.target.type == "password" ? "text" : "password";
    }
  }

  changeLang() {
    if (this.flag == "en") {
      this.lang = "en"
      this.flag = "es"
    } else {
      this.lang = "es"
      this.flag = "en"
    }
    return this.flag
  }

  changeFlag() {
    if (this.lang == "en") {
      this.flag = "es"
    } else {
      this.flag = "en"
    }
  }
}
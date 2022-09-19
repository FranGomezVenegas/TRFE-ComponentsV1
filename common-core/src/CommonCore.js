import { LitElement } from 'lit';

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
      userName: { type: String },
      headerInfo: { type: Object }
    };
  }

  constructor() {
    super();
    this.config = {};
    this.userName = "";
    this.lang = "en";
  }

  firstUpdated() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        this.resizeElements()
      }, 500)
    }, true);
    this.updateComplete.then(() => {
      this.resizeElements()
      if (this.config.local != false && !window.process) {
        this.localToast = document.createElement("div")
        this.localToast.style.position = 'fixed'
        this.localToast.style.bottom = '10px'
        this.localToast.style.left = '10px'
        this.localToast.style.padding = '5px'
        this.localToast.style.backgroundColor = 'black'
        this.localToast.style.color = 'white'
        this.localToast.style.fontSize = '12px'
        this.localToast.style.maxWidth = "98vw"
        this.localToast.style.display = "none"
        this.shadowRoot.appendChild(this.localToast)
      }
    })
    if (this.config.local != false && !window.process) {
      this.addEventListener('success', e => {
        // alert('addEventListener for success')

        // if (e.is_error===undefined){
        //   return
        // }
        this.showNotif(e)
        // if (e.is_error===true){
        //   this.localToast.style.backgroundColor = '#0085ff'
        // }else{
        //   this.localToast.style.backgroundColor = '#b22222'
        // }
      })
      this.addEventListener('error', e => {
        // alert('addEventListener for error')
        this.showNotif(e)
        this.localToast.style.backgroundColor = '#a33'
      })
    }
  }

  showNotifOld(e) {
    //console.log('showNotifOld')
    this.localToast.textContent = e.detail.message || e.detail['message_'+ this.lang]
    if (this.localToast.textContent) {
      this.localToast.style.display = 'block'
      setTimeout(() => this.localToast.style.display = 'none', 4000)
    }
  }

  showNotif(e) {
    console.log('showNotif', e)
    if (e.detail.is_error===undefined){
      return
    }
    let msgContent= e.detail['message_'+ this.lang]!==undefined ? e.detail['message_'+ this.lang] : e.detail.message
    this.localToast.textContent = msgContent
    if (this.localToast.textContent&&e.detail.is_error===true) {
      this.localToast.style.backgroundColor = '#b22222'
      this.localToast.style.display = 'block'
      setTimeout(() => this.localToast.style.display = 'none', 4000)
      return
    }else{
      this.localToast.style.backgroundColor = '#0085ff'
      this.localToast.style.display = 'block'
      setTimeout(() => this.localToast.style.display = 'none', 4000)
      return
    }
  }

  resizeElements() {
    let wScreen = document.documentElement.clientWidth;
    if (wScreen > 460) {
      this.desktop = true
    } else {
      this.desktop = false
    }
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
    this.headerInfo = JSON.parse(sessionStorage.getItem("userSession")).header_info
    //console.log('this.headerInfo', this.headerInfo)

  }

  /**
   * Populating fetch api
   * @param {*} urlParams the url api with params
   * @param {*} feedback will be show up the user feedback
   */
  fetchApi(urlParams, feedback=true) { 
    // notification enabled by default, just turn log to false for those what requires no notification   
    let log = true
    if (urlParams.toString().toUpperCase().includes("QUERI")) {
      log = false
    }
    log = true
    console.log('fetchApi, log', log, 'urlParams', urlParams, urlParams.toString().toUpperCase())
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
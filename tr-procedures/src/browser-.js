import { LitElement, html, css } from 'lit';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@spectrum-web-components/split-view/sp-split-view';
import './tab-browser';

export class Browser extends LitElement {
  static get styles() {
    return [
      css`
      sp-split-view {
        height: calc(100vh - 150px);
      }
      #leftSplit {
        padding: 10px;
      }
      #leftSplit::-webkit-scrollbar, #rightSplit::-webkit-scrollbar {
        display: none;
      }
      div[hidden] {
        display: none;
      }
      mwc-button {
        --mdc-typography-button-text-transform: none;
        --mdc-typography-button-font-size: 12px;
      }
      `
    ];
  }

  static get properties() {
    return {
      desktop: { type: Boolean },
      config: { type: Object },
      procModel: { type: Object },
      procName: { type: String },
      tabList: { type: Array },
      samples: { type: Array }
    };
  }

  constructor() {
    super()
    this.desktop = true
    this.tabList = []
    this.samples = []
  }

  firstUpdated() {
    super.firstUpdated()
    let findProc = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures.filter(m => m.procInstanceName == this.procName)
    if (findProc.length) {
      findProc[0].new_definition.forEach(d => {
        if (d.icons) {
          d.icons.forEach(ic => {
            this.tabList.push({...ic, lp_frontend_page_name: d.lp_frontend_page_name})
          })
        } else {
          d.label_en&&this.tabList.push(d)
        }
      })
    }
  }

  render() {
    return html`
      ${this.desktop ?
        html`
        <sp-split-view resizable primary-size="300">
          <div id="leftSplit">
            <h4>Proc Instance: ${this.procName}</h4>
            <tab-browser .tabs=${this.tabList} @tab-changed=${this.tabChanged}></tab-browser>
            <input type='datetime-local'>
            <select>
              ${this.samples.map(s=>
                html`<option>${s.sample_id}</option>`
              )}
            </select>
          </div>
          <div id="rightSplit">
            <mwc-button outlined label="Print"></mwc-button>
            <mwc-button outlined label="Send"></mwc-button>
          </div>
        </sp-split-view>
        ` :
        html`Coming Soon`
      }
    `
  }

  tabChanged(t) {
    let selectedAction = this.procModel[t.detail.lp_frontend_page_name].actions[0]
    let reqParams = {
      ...this.jsonParam(selectedAction, t.detail.icon_name ? t.detail.name : null),
      procInstanceName: this.procName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      dbName: this.config.dbName,
      actionName: selectedAction.actionName,
      userToCheck: JSON.parse(sessionStorage.getItem("userSession")).userName
    }

    let params = this.config.backendUrl + (selectedAction.endPoint ? selectedAction.endPoint : this.config.frontEndEnvMonitSampleUrl) 
      + '?' + new URLSearchParams(reqParams)
    this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        this.samples = j
      }
    })
  }


  jsonParam(action, filterName) {
    console.log(filterName);
    let jsonParam = {}
    if (action.apiParams) {
      action.apiParams.forEach(p => {
        jsonParam[p.query] = p.value
      })
    }
    if (action.paramFilter) {
      jsonParam[action.paramFilter[filterName].query] = action.paramFilter[filterName].value
    }
    return jsonParam
  }

  /**
   * Populating fetch api
   * @param {*} urlParams the url api with params
   */
  fetchApi(urlParams) {
    this.dispatchEvent(new CustomEvent('set-activity', {bubbles: true, composed: true}))
    return fetch(urlParams).then(async r => {
      if (r.status == 200) {
        return r.json()
      } else {
        let err = await r.json()
        throw err
      }
    }).then(j => {
      this.dispatchEvent(new CustomEvent('success', {
        detail: {...j},
        bubbles: true,
        composed: true
      }))
      return j
    }).catch(e => {
      this.dispatchEvent(new CustomEvent("error", {
        detail: {...e},
        bubbles: true,
        composed: true
      }))
      return
    })
  }
}
window.customElements.define('browser-', Browser);
import { LitElement, html, css, nothing } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-button';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-textfield';
import '@spectrum-web-components/split-view/sp-split-view';
import './browser-tab';
import './browser-data';

export class BrowserView extends LitElement {
  static get styles() {
    return [
      Layouts,
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
      lang: { type: String },
      model: { type: Object },
      procName: { type: String },
      tabList: { type: Array },
      activeTab: { type: Object },
      sampleData: { type: Object }
    };
  }

  constructor() {
    super()
    this.desktop = true
    this.model = {}
    this.tabList = []
    this.activeTab = {}
    this.sampleData = {}
  }

  updated(updates) {
    if (updates.has('model') && this.model.Browser) {
      this.tabList = this.model.Browser.tabs
    }
  }

  render() {
    return html`
      ${this.desktop ?
        html`
        <sp-split-view resizable primary-size="300">
          <div id="leftSplit">
            <h4>Proc Instance: ${this.procName}</h4>
            <browser-tab 
              @tab-changed=${this.tabChanged}
              .lang=${this.lang}
              .tabs=${this.tabList}></browser-tab>
            <div class="layout flex vertical">
            ${this.activeTab.label_en == "Sample" ?
              html`<mwc-textfield label="Sample ID"></mwc-textfield>` :
              html`${this.activeTab.label_en == "Incubation" ?
                html`
                  <mwc-textfield label="Incubator Name"></mwc-textfield>
                  <mwc-textfield label="Start Date" type="datetime-local"></mwc-textfield>
                  <mwc-textfield label="End Date" type="datetime-local"></mwc-textfield>
                ` :
                html`${this.activeTab.label_en == "Batch" ?
                  html`<mwc-textfield label="Batch Name"></mwc-textfield>` :
                  html`<mwc-textfield label="Lot Name"></mwc-textfield>`
                }`
              }`
            }
            <mwc-button raised label="Search" @click=${this.getSampleData}></mwc-button>
            </div>
          </div>
          <div id="rightSplit">
            <mwc-button outlined label="Print"></mwc-button>
            <mwc-button outlined label="Send"></mwc-button>
            <browser-data .data=${this.sampleData}></browser-data>
          </div>
        </sp-split-view>
        ` :
        html`Coming Soon`
      }
    `
  }

  get sampleId() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Sample ID']")
  }

  get incubatorName() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Incubator Name']")
  }

  get startDate() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Start Date']")
  }

  get endDate() {
    return this.shadowRoot.querySelector("mwc-textfield[label='End Date']")
  }

  get batchName() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Batch Name']")
  }

  get lotName() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Lot Name']")
  }

  get browserData() {
    return this.shadowRoot.querySelector("browser-data")
  }

  tabChanged(e) {
    this.activeTab = e.target.selectedTab
  }

  getSampleData() {
    this.browserData.data = {}
    let extraParams = {}
    Object.entries(this.activeTab.extraParams).map((
      [key]) => extraParams[key] = this[key].value
    )
    let reqParams = {
      procInstanceName: this.procName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      dbName: this.config.dbName,
      schemaPrefix: this.procName, 
      actionName: this.activeTab.action, 
      ...this.activeTab.fixParams,
      ...extraParams
    }
    let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl
      + '?' + new URLSearchParams(reqParams)
    this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        this.sampleData = j
      }
    })
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
window.customElements.define('browser-view', BrowserView);
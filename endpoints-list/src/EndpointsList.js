import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import '@alenaksu/json-viewer';
import '@spectrum-web-components/split-view/sp-split-view';

export class EndpointsList extends CommonCore {
  static get styles() {
    return [
      css`
      sp-split-view {
        height: calc(100vh - 120px);
      }
      #leftSplit {
        padding: 10px;
      }
      #endpointName {
        height: 100%;
        overflow-y : auto;
      }
      #leftSplit::-webkit-scrollbar, #rightSplit::-webkit-scrollbar, #endpointName::-webkit-scrollbar {
        display: none;
      }
      label {
        color: blue;
      }
      .ed {
        cursor: pointer;
      }
      `
    ]
  }

  static get properties() {
    return {
      docs: { type: Array },
      filterDocs: { type: Array },
      apis: { type: Array },
      endpoints: { type: Array },
      selectedApis: { type: Array },
      selectedTxts: { type: Array }
    };
  }

  constructor() {
    super()
    this.docs = []
    this.filterDocs = []
    this.apis = []
    this.selectedApis = []
    this.selectedTxts = []
  }

  render() {
    return html`
      <sp-split-view resizable splitter-pos="300">
        <div id="leftSplit">
          <select @change=${this.apiChanged}>
            <option value="">-- Filter by API Name --</option>
            ${this.apis.map(a=>
              html`<option value=${a}>${a}</option>`
            )}
          </select><br>
          Last Update <input id="lastDate" type="datetime-local" @change=${this.dateChanged}>
          <hr>
          <label>${this.filterDocs.length} of ${this.docs.length}</label>
          <div id="endpointName">
          ${this.filterDocs.map(d =>
            html`
              <p class="ed" id="${d.id}" @click=${e=>this.endpointSelect(e, d)}>${d.endpoint_name}</p>
            `
          )}
          </div>
        </div>
        <div id="rightSplit">
          ${this.selectedApis.map(s =>
            html`<json-viewer>${JSON.stringify(s)}</json-viewer>`
          )}
        </div>
      </sp-split-view>
    `;
  }

  async authorized() {
    super.authorized()
    await this.fetchApi(this.config.backendUrl + this.config.endpointsDocApiUrl + '?' + new URLSearchParams({
      actionName: "GET_DOC_ENDPOINTS",
      apiName: "ALL",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken
    }), false).then(j => {
      this.docs = this.filterDocs = j
      let apis = j.map(d => d.api_name)
      apis.unshift("All")
      this.apis = apis.filter((item, index) => apis.indexOf(item) === index);
    })
    this.requestUpdate()
  }

  apiChanged(e) {
    this.selectedTxts.forEach(t => {
      t.style.fontWeight = "normal"
    })
    this.selectedApis = []
    this.selectedTxts = []
    this.shadowRoot.querySelector("input#lastDate").value = ""
    if (!e.target.value) return
    if (e.target.value == "All") {
      this.filterDocs = this.docs
    } else {
      this.filterDocs = this.docs.filter(d => d.api_name == e.target.value)
    }
    this.requestUpdate()
  }

  dateChanged(evt) {
    this.selectedTxts.forEach(t => {
      t.style.fontWeight = "normal"
    })
    this.selectedApis = []
    this.selectedTxts = []
    this.shadowRoot.querySelector("select").value = ""
    if (evt.target.value) {
      this.filterDocs = this.docs.filter(d => new Date(d.last_update).getTime() >= new Date(evt.target.value).getTime())
    } else {
      this.filterDocs = this.docs      
    }
    this.requestUpdate()
  }

  endpointSelect(evt, api) {
    if (evt.target.style.fontWeight == "bold") {
      evt.target.style.fontWeight = "normal"
      this.selectedApis = this.selectedApis.filter(a => a.title != `${api.endpoint_name} (${api.api_name} ${api.id})`)
      this.selectedTxts = this.selectedTxts.filter(t => t.id != evt.target.id)
    } else {
      evt.target.style.fontWeight = "bold"
      this.selectedApis.push({
        title: `${api.endpoint_name} (${api.api_name} ${api.id})`,
        date: `${api.creation_date} ${api.last_update}`,
        arguments: api.arguments_array.map(arg => { 
          return { name: arg.name, type: arg.type, mandatory: arg['is_mandatory?'] }
        }),
        output_object_types: api.output_object_types
      })
      this.selectedTxts.push(evt.target)
    }
    this.requestUpdate()
  }
}

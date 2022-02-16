import { html } from 'lit';
import { CommonCore } from '@trazit/common-core';
import '@alenaksu/json-viewer';

export class EndpointsList extends CommonCore {
  static get properties() {
    return {
      docs: { type: Array }
    };
  }

  constructor() {
    super()
    this.docs = []
  }

  render() {
    return html`
      ${this.docs.map(d =>
        html`
          <json-viewer>${JSON.stringify(d)}</json-viewer>
        `
      )}
    `;
  }

  async authorized() {
    super.authorized()
    await this.fetchApi(this.config.backendUrl + this.config.endpointsDocApiUrl + '?' + new URLSearchParams({
      actionName: "GET_DOC_ENDPOINTS",
      apiName: "ALL",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken
    }), false, false).then(j => {
      this.docs = j
    })
    this.requestUpdate()
  }
}

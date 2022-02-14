import { html } from 'lit';
import { CommonCore } from '@trazit/common-core';
import '@alenaksu/json-viewer';

export class ProcedureManagement extends CommonCore {
  static get properties() {
    return {
      defs: { type: Array }
    };
  }

  constructor() {
    super()
    this.defs = []
  }

  render() {
    return html`
      ${this.defs.map(d =>
        html`
          <h2>${d.procedure_info.procedure_name}</h2>
          <json-viewer>${JSON.stringify(d)}</json-viewer>
        `
      )}
    `;
  }

  async authorized() {
    super.authorized()
    this.defs = []
    let procedures = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
    for (let i=0; i<procedures.length; i++) {
      await this.fetchApi(this.config.backendUrl + this.config.procDefinitionApiUrl + '?' + new URLSearchParams({
        actionName: "ALL_PROCEDURE_DEFINITION",
        procInstanceName: procedures[i].procInstanceName,
        dbName: this.config.dbName,
        finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken
      }), false, false).then(j => {
        this.defs.push(j.definition)
      })
    }
    console.log(this.defs)
    this.requestUpdate()
  }
}

import { CommonCore } from '@trazit/common-core';
import { EndpointsListStyles } from './endpoints-list-styles.js';
import { EndpointsListTemplate } from './endpoints-list-styles-template.js';
import '@alenaksu/json-viewer';
import '@spectrum-web-components/split-view/sp-split-view';

export class EndpointsList2 extends CommonCore {
  static get styles() {
    return [EndpointsListStyles];
  }

  static get properties() {
    return {
      docs: { type: Array },
      filterDocs: { type: Array },
      apis: { type: Array },
      endpoints: { type: Array },
      selectedApis: { type: Array },
      selectedTxts: { type: Array },
      storybook: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.docs = [];
    this.filterDocs = [];
    this.apis = [];
    this.selectedApis = [];
    this.selectedTxts = [];
    this.callAPI(this.getLocalVariables());
    if (this.storybook !== undefined && this.storybook === true) {
      alert('storybook...');
      this.callAPI(this.getLocalVariables());
    }
  }

  render() {
    return EndpointsListTemplate(this);
  }

  async getLocalVariables() {
    try {
      const response = await fetch("./config.json");
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const localVariables = await response.json();
      console.log(localVariables);
      return localVariables;
    } catch (error) {
      console.error("Error fetching config:", error);
      alert(`Failed to fetch configuration: ${error.message}`);
      return null;
    }
  }
  
  async firstUpdated() {
    const localVariables = await this.getLocalVariables();
    if (localVariables) {
      this.callAPI(localVariables);
    } else {
      console.error("No se pudieron cargar las variables locales");
    }
  }
  
  async callAPI(localVariables) {
    let bckendUrl =
      this.config.backendUrl !== undefined
        ? this.config.backendUrl
        : localVariables.backendUrl;
    let endpUrl =
      this.config.endpointsDocApiUrl !== undefined
        ? this.config.endpointsDocApiUrl
        : localVariables.endpointsDocApiUrl;
  
    try {
      const j = await this.fetchApi(
        bckendUrl +
          endpUrl +
          '?' +
          new URLSearchParams({
            actionName: "GET_DOC_ENDPOINTS",
            apiName: "ALL",
            finalToken: JSON.parse(sessionStorage.getItem("userSession"))
              .finalToken,
          }),
        false
      );
      this.docs = this.filterDocs = j;
  
      let apis = this.docs.reduce((acc, curr) => {
        const { api_name, api_url } = curr;
        const existingObj = acc.find(
          (obj) => obj.api_name === api_name && obj.api_url === api_url
        );
  
        if (!existingObj) {
          acc.push({ api_name, api_url });
        }
  
        return acc;
      }, []);
  
      let Allarr = { api_name: "All", api_url: "All" };
      apis.unshift(Allarr);
      this.apis = apis;
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
    }
  }
  
  async authorized() {
    super.authorized();    
    this.callAPI(this.getLocalVariables());
    this.requestUpdate();
  }

  apiChanged(e) {
    this.selectedTxts.forEach((t) => {
      t.style.fontWeight = "normal";
    });
    this.selectedApis = [];
    this.selectedTxts = [];
    this.shadowRoot.querySelector("input#lastDate").value = "";
    if (!e.target.value) return;
    if (e.target.value == "All") {
      this.filterDocs = this.docs;
    } else {
      this.filterDocs = this.docs.filter(
        (d) => d.api_name == e.target.value
      );
    }
    this.requestUpdate();
  }

  dateChanged(evt) {
    this.selectedTxts.forEach((t) => {
      t.style.fontWeight = "normal";
    });
    this.selectedApis = [];
    this.selectedTxts = [];
    this.shadowRoot.querySelector("select").value = "";
    if (evt.target.value) {
      this.filterDocs = this.docs.filter(
        (d) =>
          new Date(d.last_update).getTime() >=
          new Date(evt.target.value).getTime()
      );
    } else {
      this.filterDocs = this.docs;
    }
    this.requestUpdate();
  }

  endpointSelect(evt, api) {
    if (evt.target.style.fontWeight == "bold") {
      evt.target.style.fontWeight = "normal";
      this.selectedApis = this.selectedApis.filter(
        (a) => a.title != `${api.endpoint_name}`
      );
      this.selectedTxts = this.selectedTxts.filter(
        (t) => t.id != evt.target.id
      );
    } else {
      evt.target.style.fontWeight = "bold";
      this.selectedApis.push({
        Api_url: `${api.api_url}`,
        Api_Collection: `${api.api_name} / Id:${api.id} / Number Endpoints in API: ${api.num_endpoints_in_api}`,
        title: `${api.endpoint_name}`,
        date: `${api.creation_date} ${api.last_update}`,
        dev_notes: `${api.dev_notes}`,
        dev_notes_tags: `${api.dev_notes_tags}`,
        number_of_arguments: `${api.num_arguments}`,
        arguments: api.arguments_array.map((arg) => {
          return {
            name: arg.name,
            type: arg.type,
            mandatory: arg['is_mandatory?'],
            dev_comment: arg.dev_comment,
            dev_comment_tags: arg.dev_comment_tags,
          };
        }),
        output_object_types: api.output_object_types,
      });
      this.selectedTxts.push(evt.target);
    }
    this.requestUpdate();
  }

  endpointDetail(api) {
    const mandatoryStyle = '--property-color: red;';
    const nonMandatoryStyle = '--property-color: blue;';

    const argumentsArray = api.arguments_array.map((arg) => {
      const name = arg['is_mandatory?']
        ? `<span style="${mandatoryStyle}">${arg.name}</span>`
        : `<span style="${nonMandatoryStyle}">${arg.name}</span>`;
      return {
        name,
        type: arg.type,
        mandatory: arg['is_mandatory?'],
        dev_comment: arg.dev_comment,
        dev_comment_tags: arg.dev_comment_tags,
      };
    });

    return JSON.stringify({
      Api_url: `${api.api_url}`,
      Api_Collection: `${api.api_name} / Id:${api.id} / Number Endpoints in API: ${api.num_endpoints_in_api}`,
      title: `${api.endpoint_name}`,
      date: `${api.creation_date} ${api.last_update}`,
      dev_notes: `${api.dev_notes}`,
      dev_notes_tags: `${api.dev_notes_tags}`,
      number_of_arguments: `${api.num_arguments}`,
      arguments: argumentsArray,
      output_object_types: api.output_object_types,
    });
  }
}

customElements.define('endpoints-list2', EndpointsList2);

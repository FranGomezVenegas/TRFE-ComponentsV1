import { html, css } from 'lit';

import { CommonCore } from '@trazit/common-core';
import { EndpointsListStyles } from './endpoints-list-styles.js';
import { EndpointsListTemplate } from './endpoints-list-template.js';
import '@material/web/icon/icon.js';
import '@alenaksu/json-viewer';

export class EndpointsListByModule extends CommonCore {
  static get styles() {
    return [EndpointsListStyles, // Mantiene los estilos existentes
      css`
        
      `
    ];
  }

  static get properties() {
    return {
      docs: { type: Array },
      filterDocs: { type: Array },
      modules: { type: Array },
      filteredApis: { type: Array },
      apis: { type: Array },
      selectedApis: { type: Array },
      selectedTxts: { type: Array },
      storybook: { type: Boolean },
      visibleEndpoints: { type: Object }, // Para la visibilidad de cada endpoint
      areAllEndpointsVisible: { type: Boolean }, // Para el estado de todos los endpoints

      config: { type: Object }, 
    };
  }

  constructor() {
    super();
    this.docs = [];
    this.filterDocs = [];
    this.modules = [];
    this.filteredApis = [];
    this.apis = [];
    this.selectedApis = [];
    this.selectedTxts = [];
    this.visibleEndpoints = new Set(); // Inicializa el Set
    this.areAllEndpointsVisible = false; // Inicializa el estado de visibilidad
    
    this.config = { theme: 'trazit', darkMode: false };

    this.callAPI();
    if (this.storybook !== undefined && this.storybook === true) {
      alert('storybook...');
      this.callAPI();
    }
  }

  applyTheme(theme) {
    // Aquí puedes aplicar la lógica para cambiar estilos según el tema
    // Por ejemplo, podrías cambiar clases o aplicar estilos CSS directamente
    if (theme === 'cliente1') {
      this.style.setProperty('--button-color', '#ff5722');  // Ejemplo de cambio de estilo
    } else {
      this.style.setProperty('--button-color', '#148cfa');  // Estilo por defecto
    }
  }

  render() {
    
    return EndpointsListTemplate(this);
  }

  // Lógica para alternar la visibilidad del detalle de un endpoint
  toggleEndpointDetails(index) {
    if (this.visibleEndpoints.has(index)) {
      this.visibleEndpoints.delete(index);
    } else {
      this.visibleEndpoints.add(index);
    }
    this.requestUpdate();
  }

  // Verificar si un endpoint es visible
  isEndpointVisible(index) {
    return this.visibleEndpoints.has(index);
  }

  // Lógica para alternar la visibilidad de todos los endpoints
  toggleAllEndpoints() {
    if (this.areAllEndpointsVisible) {
      this.visibleEndpoints.clear(); // Oculta todos
    } else {
      this.filterDocs.forEach((_, index) => this.visibleEndpoints.add(index)); // Muestra todos
    }
    this.areAllEndpointsVisible = !this.areAllEndpointsVisible;
    this.requestUpdate();
  }

  endpointDetail(api) {
    // Definir estilos para argumentos obligatorios y no obligatorios
    const mandatoryStyle = 'color: red; font-weight: bold;';
    const nonMandatoryStyle = 'color: blue;';
  
    // Procesar cada argumento para aplicar los estilos
    const argumentsArray = api.arguments_array.map((arg) => {
      const name = arg["is_mandatory?"]
        ? `<span style="${mandatoryStyle}">${arg.name}</span>`
        : `<span style="${nonMandatoryStyle}">${arg.name}</span>`;
      
      return {
        name: arg.name,
        type: arg.type,
        mandatory: arg["is_mandatory?"],
        dev_comment: arg.dev_comment,
        dev_comment_tags: arg.dev_comment_tags,
      };
    });
  
    // Crear y retornar el objeto JSON procesado
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

  async getLocalVariables() {
    if (this.pLogin===null){
      let localVariables={}
      localVariables.backendUrl=undefined
      localVariables.endpointsDocApiUrl=undefined
      return localVariables
    }
    try {
      const response = await fetch("/config.json");
      if (!response.ok) {
        let localVariables={}
        localVariables.backendUrl=undefined
        localVariables.endpointsDocApiUrl=undefined
        return localVariables
        //throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const localVariables = await response.json();
      console.log(localVariables);
      return localVariables;
    } catch (error) {
      console.error("Error fetching config:", error);
      alert(`Failed to fetch configuration: ${error.message}`);
      let localVariables={}
      localVariables.backendUrl=undefined
      localVariables.endpointsDocApiUrl=undefined
      return localVariables
    }
  }
  
  async firstUpdated() {
    if (this.config) {
      this.applyTheme(this.config.theme);
    }
    const localVariables = await this.getLocalVariables();
    if (localVariables) {
      this.callAPI(localVariables);
    } else {
      console.error("No se pudieron cargar las variables locales");
    }
  }


  async callAPI(localVariables) {
    //return
    if (this.config===undefined&&localVariables===undefined){return}
    if (localVariables===undefined){
      localVariables={}
      localVariables.backendUrl=''
      localVariables.endpointsDocApiUrl=''
    }
    let bckendUrl =
    this.config!==undefined&&this.config.backendUrl !== undefined
        ? this.config.backendUrl
        : localVariables.backendUrl;
    let endpUrl =
    this.config!==undefined&&this.config.endpointsDocApiUrl !== undefined
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
      this.docs = j;
  
      // Rellenar módulos sin duplicados
      let modules = this.docs.reduce((acc, curr) => {
        const { module_pretty_name } = curr; // Asumiendo que `module_pretty_name` es la clave que contiene el nombre del módulo
        if (module_pretty_name && !acc.includes(module_pretty_name)) {
          acc.push(module_pretty_name);
        }
        return acc;
      }, []);
      this.modules = modules;
  
      // Filtrar APIs sin duplicados y asociadas al módulo actual
      let apis = this.docs.reduce((acc, curr) => {
        const { api_name, api_url, module_pretty_name } = curr;
  
        // Filtrar por módulos
        if (this.currentModule && !module_pretty_name.includes(this.currentModule)) {
          return acc;
        }
  
        const existingObj = acc.find(
          (obj) => obj.api_name === api_name && obj.api_url === api_url
        );
  
        if (!existingObj) {
          acc.push({ api_name, api_url });
        }
  
        return acc;
      }, []);
  
      // Añadir la opción 'All'
      let Allarr = { api_name: "All", api_url: "All" };
      apis.unshift(Allarr);
      this.apis = apis;
  
      // Filtrar los endpoints de acuerdo al módulo seleccionado
      this.filterDocs = this.docs.filter((doc) =>
        !this.currentModule || doc.module_pretty_name.includes(this.currentModule)
      );
  
    } catch (error) {
      //console.error("Error en la llamada a la API:", error);
    }
  }

  moduleClicked(e) {
    const clickedModule = e.target.value;
  
    if (this.currentModule && this.currentModule === clickedModule) {
      // Si se hace clic en el módulo seleccionado, deselecciona todo
      this.currentModule = null;
      this.filteredApis = [...new Set(this.docs.map(doc => doc.api_name))];
      this.filterDocs = this.docs;
      
      // Restablecer la selección del select (remover selección)
      e.target.selectedIndex = -1;
    } else if (clickedModule === "") {
      // Si no se selecciona ningún módulo, muestra todos los endpoints
      this.currentModule = null;
      this.filteredApis = [...new Set(this.docs.map(doc => doc.api_name))];
      this.filterDocs = this.docs;
  
      // Restablecer la selección del select (remover selección)
      e.target.selectedIndex = -1;
    } else {
      // Filtra APIs basadas en el módulo seleccionado
      this.currentModule = clickedModule;
      this.filteredApis = [...new Set(this.docs
        .filter(doc => doc.module_pretty_name === clickedModule)
        .map(doc => doc.api_name))];
      
      // Actualiza la lista de documentos basados en las APIs filtradas
      this.filterDocs = this.docs.filter(doc => doc.module_pretty_name === clickedModule);
    }
  
    this.requestUpdate();
  }
  
  apiClicked(e) {
    const clickedApi = e.target.value;
  
    if (this.currentApi && this.currentApi === clickedApi) {
      // Si se hace clic en la API seleccionada, deselecciona todo
      this.currentApi = null;
      this.filterDocs = this.docs.filter(doc => !this.currentModule || doc.module_pretty_name === this.currentModule);
  
      // Restablecer la selección del select (remover selección)
      e.target.selectedIndex = -1;
    } else if (clickedApi === "") {
      // Si no se selecciona ninguna API, muestra todos los endpoints
      this.currentApi = null;
      this.filterDocs = this.docs.filter(doc => !this.currentModule || doc.module_pretty_name === this.currentModule);
  
      // Restablecer la selección del select (remover selección)
      e.target.selectedIndex = -1;
    } else {
      // Filtra los endpoints basados en la API seleccionada
      this.currentApi = clickedApi;
      this.filterDocs = this.docs.filter(doc => doc.api_name === clickedApi && (!this.currentModule || doc.module_pretty_name === this.currentModule));
    }
  
    this.requestUpdate();
  }
    
  searchEndpoints(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    this.filterDocs = this.docs.filter(doc => {
      // Buscar en endpoint_name, api_name y module_pretty_name
      const matchesBasicFields = doc.endpoint_name.toLowerCase().includes(searchTerm) ||
                                 doc.api_name.toLowerCase().includes(searchTerm) ||
                                 doc.module_pretty_name.toLowerCase().includes(searchTerm);
      
      // Buscar en los nombres de los argumentos
      const matchesArguments = doc.arguments_array.some(arg => arg.name.toLowerCase().includes(searchTerm));
      
      // Retornar true si coincide con alguno de los campos
      return matchesBasicFields || matchesArguments;
    });
  
    this.requestUpdate();
  }

}customElements.define('endpoints-listbymodule', EndpointsListByModule);

import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import '@alenaksu/json-viewer';
import '@spectrum-web-components/split-view/sp-split-view';
const langConfig = {
  field: {
    title: {
      "label_en": "Title", "label_es": "Titulo"
    },
    detail: {
      "label_en": "Detail", "label_es": "Detalle"
    },
    days: {
      "label_en": "Number of Days", "label_es": "Número de Días"
    },
    id:  {
      "label_en": "Incident Id - Date Creation - Title", "label_es": "Id de Incidencia - Creación de fecha - Título"
    }
  },
  dialog_button: {
    new: {
      "label_en": "Create", "label_es": "Crear"
    },
    confirm: {
      "label_en": "Confirm", "label_es": "Confirmar"
    },
    close: {
      "label_en": "Close", "label_es": "Cerrar"
    },
    cancel: {
      "label_en": "Cancel", "label_es": "Cancelar"
    },
    accept: {
      "label_en": "Accept", "label_es": "Aceptar"
    }
  },
  grid: {
    id: {
      "label_en": "Id", "label_es": "Id"
    },
    last_update: {
      "label_en": "Last Update", "label_es": "Último cambio"
    },
    creation: {
      "label_en":"Creation", "label_es": "Creación"
    },
    title: {
      "label_en": "Title", "label_es": "Titulo"
    },
    detail: {
      "label_en": "Detail", "label_es": "Detalle"
    }
  },
  button: {
    new: {
    "label_en": "New", "label_es": "Crear"
    },
    confirm: {
      "label_en": "Confirm", "label_es": "Confirmar"
    },
    note: {
      "label_en": "Add Note", "label_es": "Añadir Nota"
    },
    close: {
      "label_en": "Close it!", "label_es": "¡Zanjarla!"
    },
    reopen: {
      "label_en": "ReOpen it!", "label_es": "¡Reabrirla!"
    }
  }
};


export class HolidayCalendars extends CommonCore {
  static get styles() {
    return [
      css`
      sp-split-view {
        height: calc(100vh - 150px);
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
      div[hidden] {
        display: none;
      }
      @media (max-width: 460px) {
        #endpointName {
          height: calc(100vh - 180px);
        }
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
      selectedTxts: { type: Array },
      selectedItem: { type: Object },
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
      <div class="layout horizontal center flex wrap">
        <mwc-icon-button icon="refresh" @click=${this.getOpenIncidents}></mwc-icon-button>      
        <mwc-icon-button style="color:#c9252d" .title="${langConfig.button.new["label_"+this.lang]}" icon="add" @click=${()=>{this.action=`${langConfig.button.new["label_"+this.lang]} Incident`;this.openDialog("create")}}></mwc-icon-button>
      </div>
      s
      <vaadin-grid @active-item-changed=${this.selectItem} theme="row-dividers" column-reordering-allowed multi-sort>
        <vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column>
        <vaadin-grid-sort-column path="id" .header="${langConfig.grid.id["label_"+this.lang]}"></vaadin-grid-sort-column>
        <vaadin-grid-filter-column path="date_last_update" .header="${langConfig.grid.last_update["label_"+this.lang]}"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column path="date_creation" .header="${langConfig.grid.creation["label_"+this.lang]}"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column path="item_title" .header="${langConfig.grid.title["label_"+this.lang]}"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column path="item_detail" .header="${langConfig.grid.detail["label_"+this.lang]}"></vaadin-grid-filter-column>
      </vaadin-grid>

    `;
  }

  get grid() {
    return this.shadowRoot.querySelector("vaadin-grid")
  }
  getTitle() {
    if (this.langConfig&&this.langConfig.title[this.filterName]) {
      return html`<h1>${this.langConfig.title[this.filterName]["label_"+this.lang]}</h1>`
    }
  }
  getButton() {
    return html`
      ${this.actions&&this.actions.map(action =>
        html`${action.button ?
          html`${action.button.icon ?
            html`${action.button.actionName ?
              html`<mwc-icon-button
                class="${action.button.class}"
                icon="${action.button.icon}" 
                title="${action.button.title['label_'+this.lang]}" 
                ?disabled=${this.btnDisabled(action)}
                @click=${()=>this.actionMethod(action)}></mwc-icon-button>` :
              html`<mwc-icon-button style="color:${action.button.color}" 
                class="${action.button.class}"
                icon="${action.button.icon}" 
                title="${action.button.title['label_'+this.lang]}" 
                ?disabled=${this[action.button.whenDisabled]}
                @click=${()=>this[action.clientMethod](action.filterState)}></mwc-icon-button>`
            }` :
            html`${action.button.img ?
              html`<mwc-icon-button class="${action.button.class} img" 
                title="${action.button.title['label_'+this.lang]}"
                ?disabled=${this[action.button.whenDisabled]}
                @click=${()=>this[action.clientMethod](action.filterState)}>
                  <img class="iconBtn" src="/images/${action.button.img}">
                </mwc-icon-button>` :
              html`<mwc-button dense raised 
                label="${action.button.title['label_'+this.lang]}" 
                ?disabled=${this.btnDisabled(action)}
                @click=${()=>this.actionMethod(action)}></mwc-button>`
            }`
          }` :
          nothing
        }`
      )}
    `
  }
  getOpenIncidents() {
    //this.histories = []
    this.fetchApi(this.config.backendUrl + this.config.frontEndIncidentsUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      actionName: 'USER_OPEN_INCIDENTS'
    }), false).then(j => {
      if (j && !j.is_error) {
//        this.getClosedIds()
        this.grid.items = j
        this.grid.querySelectorAll("vaadin-checkbox").forEach(c => {
          c.disabled = true
        })
      }
    })
  }

















  authorized() {
    super.authorized()
    this.getOpenIncidents()
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

  endpointDetail(api) {
    return JSON.stringify({
      title: `${api.endpoint_name} (${api.api_name} ${api.id})`,
      date: `${api.creation_date} ${api.last_update}`,
      arguments: api.arguments_array.map(arg => { 
        return { name: arg.name, type: arg.type, mandatory: arg['is_mandatory?'] }
      }),
      output_object_types: api.output_object_types
    })
  }
}

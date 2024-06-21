import { html, css, unsafeCSS, nothing } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { Alignment, displayFlex, Layouts, vertical } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-textarea';
import '@material/mwc-textfield';
import '@spectrum-web-components/button/sp-button';
import '@spectrum-web-components/icon/sp-icon.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@trazit/tr-dialog/tr-dialog';
import './history-item';

const langConfig = {
  field: {
    title: {
      "label_en": "Title", "label_es": "Titulo"
    },
    procInstanceName:{
      "label_en": "Procedure", "label_es": "Proceso"
    },
    category:{
      "label_en": "Category", "label_es": "Categoría"
    },
    priority:{
      "label_en": "Priority", "label_es": "Prioridad"
    },
    note: {
      "label_en": "Note", "label_es": "Nota"
    },
    days: {
      "label_en": "Number of Days", "label_es": "Número de Días"
    },
    id:  {
      "label_en": "Incident Id - Date Creation - Title", "label_es": "Id de Incidencia - Creación de fecha - Título"
    }
  },
  categories:{
    "label_en": "Number of Days", "label_es": "Número de Días",
    "listEntries": [
        {"name": "users", label_en: "users management", "label_es":"Gestión usuarios"}
    ]
  },  
  priority:['', '1', '2', '3'],
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
    detail: {"label_en": "Detail", "label_es": "Detalle"},
    priority: {"label_en": "Priority", "label_es": "Prioridad"},
    category: {"label_en": "Category", "label_es": "Categoría"},
    procInstanceName:{"label_en": "Procedure", "label_es": "Proceso"}
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

export class MyIncidents extends CommonCore {
  static get styles() {
    return [
      Layouts, Alignment,
      css`
        tr-dialog {
          --mdc-dialog-heading-ink-color: blue;
          --mdc-typography-headline6-font-size: 35px;
        }
        .content {
          opacity: 0.9;
        }
        .content * {
          margin: 5px 0;
        }
        div[hidden] {
          display: none;
        }
        sp-button {
          margin: 0 2px;
        }
        sp-button[hidden] {
          display: none;
        }
        mwc-textfield[hidden] {
          display: none;
        }
        .reopenPart {
          ${unsafeCSS(displayFlex)}
          ${unsafeCSS(vertical)}
        }
        .dialogButton {
          width: 100%;
          left: 21px;
          top: -29px;
        }
        `
    ];
  }

  static get properties() {
    return {
      selectedItem: { type: Object },
      histories: { type: Array },
      dialogType: { type: String },
      numDays: { type: Number },
      closedIds: { type: Array },
      category: { type: Object }
    };
  }

  constructor() {
    super();
    this.histories = [];
    this.category = {}
    this.dialogType = "";
    this.numDays = 7;
    this.closedIds = [];
    this.fieldErrMsg = {
      en: {
        title: "Title is required",
        id: "Id is required",
        note: "Note is required",
        procInstanceName:"Procedure is required"
      },
      es: {
        title: "El título es obligatorio",
        id: "Se requiere identificación",
        note: "Se requiere una nota",
        procInstanceName: "Se requiere asociar proceso"
      }
    };
  }

  authorized() {
    super.authorized()
    this.getOpenIncidents()
  }

  render() {
    let hasConfirmDate=false    
    if (this.selectedItem!==null&this.selectedItem!==undefined&&this.selectedItem.date_confirmed!==undefined){
      hasConfirmDate=String(this.selectedItem.date_confirmed).length>0      
    }
    return html`
    <div class="layout horizontal center flex wrap">
      <mwc-icon-button icon="refresh" @click=${this.getOpenIncidents}></mwc-icon-button>
      <mwc-icon-button style="color:#c9252d" .title="${langConfig.button.new["label_"+this.lang]}" icon="add" @click=${()=>{this.action=`${langConfig.button.new["label_"+this.lang]} Incident`;this.openDialog("createStep1")}}></mwc-icon-button>
      ${hasConfirmDate?nothing:html`
          <mwc-icon-button style="color:#12805c" .title="${langConfig.button.confirm["label_"+this.lang]}" icon="check" ?disabled=${!this.selectedItem} @click=${()=>{this.action=`${langConfig.button.confirm["label_"+this.lang]} Incident`;this.openDialog("confirm")}}></mwc-icon-button>
      `}      
      <mwc-icon-button style="color:#0d66d0" .title="${langConfig.button.note["label_"+this.lang]}" icon="note_add" ?disabled=${!this.selectedItem} @click=${()=>{this.action=`${langConfig.button.note["label_"+this.lang]}`;this.openDialog("note")}}></mwc-icon-button>
      <mwc-icon-button style="color:#747474" .title="${langConfig.button.close["label_"+this.lang]}" icon="close" ?disabled=${!this.selectedItem} @click=${()=>{this.action=`${langConfig.button.close["label_"+this.lang]} Incident`;this.openDialog("close")}}></mwc-icon-button>
      <mwc-icon-button .title="${langConfig.button.reopen["label_"+this.lang]}" icon="lock_open" @click=${()=>{this.action=`${langConfig.button.reopen["label_"+this.lang]} Incident`;this.openDialog("reopen")}} ?disabled=${!this.closedIds.length}></mwc-icon-button>
    </div>
    <vaadin-grid @active-item-changed=${this.selectItem} theme="row-dividers" column-reordering-allowed multi-sort>
      <vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column>
      <vaadin-grid-sort-column path="id" .header="${langConfig.grid.id["label_"+this.lang]}"></vaadin-grid-sort-column>
      <vaadin-grid-filter-column path="date_last_update" .header="${langConfig.grid.last_update["label_"+this.lang]}"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column path="date_creation" .header="${langConfig.grid.creation["label_"+this.lang]}"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column path="item_title" .header="${langConfig.grid.title["label_"+this.lang]}"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column path="category" .header="${langConfig.grid.category["label_"+this.lang]}"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column path="priority" .header="${langConfig.grid.priority["label_"+this.lang]}"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column path="incident_procedure" .header="${langConfig.grid.procInstanceName["label_"+this.lang]}"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column path="item_detail" .header="${langConfig.grid.detail["label_"+this.lang]}"></vaadin-grid-filter-column>
      
    </vaadin-grid>
    <div ?hidden=${this.hideList}>
      ${this.histories.map(h=>
        html`<history-item .history=${h} .lang=${this.lang}></history-item>`
      )}
    </div>
    <tr-dialog id="icdDialog" 
      @opened=${e=>{if(e.target===this.icdDialog)this.dialogOpened()}}       
      heading=""
      hideActions=""
      scrimClickAction="">
      <label slot="topLeft" style="font-size:12px">
        ${this.addDialogTitle()}
      </label>
      <div class="content layout vertical flex center-justified">
        ${this.fieldsByTypeAndAction()}
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px;">
          ${this.buttonsByTypeAndAction()}
        </div>
      </div>
    </tr-dialog>
    `;
  }
  resetDialogFields(){
    this.action=undefined;
    this.category.name=undefined;
    let textElements=['icdTitle', 'icdNote', 'priority']
    textElements.forEach(elementId => {
      if(this[elementId]){this[elementId].value="";}
    })
  }

  addDialogTitle(){
    if (this.category.name===undefined){return html``}//${this.action}`}
    return html`
      ${this.dialogType=="ZZZcreate"?html`<button disabled><img .src="/images/incidentType/${this.category.name}_${this.flag}.png" style="width:80px; background-color: transparent;"></button>`:html``}
    <!--${this.action}        -->
    `
  }

  computeGridStyle(count) {    
    let columns, rows;
    switch (count) {
      case 4:
        columns = 2; rows = 2;
        break;
      case 6:
        columns = 3; rows = 2;
        break;
      case 8:
        columns = 2; rows = 4;
        break;
      case 9:
        columns = 3; rows = 3;
        break;
      default:
        columns = 1; rows = count;  // Default to a single column layout
    }
    return `grid-template-columns: repeat(${columns}, 1fr); grid-template-rows: repeat(${rows}, auto);`;
  }

  fieldsByTypeAndAction(){        
    if (this.dialogType=="createStep1"){
      let incidentsType=[{"name":"issue"}, {"name":"request"} , {"name":"proposal"}, {"name":"users_management"}, {"name":"change_control"}, {"name":"doubt"}]
      const gridStyle = this.computeGridStyle(incidentsType.length);
      return html`
        <div style="display: grid; ${gridStyle}" class="reopenPart">
          ${incidentsType.map((curType, idx) => html`
            <button style="width:100px; border: none; background-color: transparent;" @click=${() =>{this.newTicketForm(curType)}}><img .src="/images/incidentType/${curType.name}_${this.lang}.png" style="width:100%"></button><br><br></br>
          `)}
        </div>
      `
    } else if (this.dialogType=="createStep2"){
      return html`
        <mwc-select id="procInstanceName" label="${langConfig.field.procInstanceName["label_"+this.lang]}" @selected=${this.valueSelected}                    
          style="width:100%;">${this.getUserProcsList()}</mwc-select>  
        <mwc-textfield id="title" label="${langConfig.field.title["label_"+this.lang]}" ?hidden=${this.dialogType!="createStep2"} .validationMessage=${this.fieldErrMsg[this.lang].title} required></mwc-textfield>
        <mwc-select id="priority" label="${langConfig.field.priority["label_"+this.lang]}" @selected=${this.valueSelected}                    
          style="width:100%;">${langConfig.priority.map((curValue, i)=>
            html`<mwc-list-item value="${curValue}" ?selected=${i == 0}>${curValue}</mwc-list-item>`
          )}</mwc-select>  
        <mwc-textarea id="note" label="${langConfig.field.note["label_"+this.lang]}" rows=10 cols=100 .validationMessage=${this.fieldErrMsg[this.lang].detail} required></mwc-textarea>
      `
    } else if (this.dialogType=="reopen"){
      return html`
        <div class="reopenPart">
          <div class="layout horizontal flex center-center">
            <mwc-textfield class="layout flex" id="numDays" type="number" 
              .value=${this.numDays} @change=${e=>this.numDays=e.target.value}
              label="${langConfig.field.days["label_"+this.lang]}"></mwc-textfield>
            <mwc-icon-button icon="refresh" @click=${this.getClosedIds}></mwc-icon-button>
          </div>
          <mwc-select id="icdId" label="${langConfig.field.id["label_"+this.lang]}" 
            ?disabled=${!this.closedIds.length}>
            ${this.closedIds.map((c,i) => 
              html`<mwc-list-item value="${c.id}" ?selected=${i==0}>${c.id} - ${c.date_creation.slice(0,10)} - ${c.item_title.slice(0,20)}</mwc-list-item>`
            )}
          </mwc-select>
        </div>
      `
    }else{
      return html`
      <mwc-textarea id="note" label="${langConfig.field.note["label_"+this.lang]}" rows=10 cols=100 .validationMessage=${this.fieldErrMsg[this.lang].detail} required></mwc-textarea>
      `
    }

  }
  buttonsByTypeAndAction(){
    switch (this.dialogType){
      case "createStep2":
        return html`<img .src="/images/incidentType/${this.category.name}_${this.flag}.png" style="width:80px; background-color: transparent; position: absolute; top:-10px; left:-15px;">
        <sp-button class="dialogButton" size="m" @click=${this.createIncident}>${langConfig.button.new["label_"+this.lang]}</sp-button>`
      case "confirm":
        return html`<sp-button class="dialogButton" size="m" @click=${this.confirmIncident} ?hidden=${this.dialogType!="confirm"}>${langConfig.button.confirm["label_"+this.lang]}</sp-button>`
      case "note":
        return html`<sp-button class="dialogButton" size="m" @click=${this.addNote} ?hidden=${this.dialogType!="note"}>${langConfig.button.note["label_"+this.lang]}</sp-button>`
      case "close":
        return html`<sp-button class="dialogButton" size="m" @click=${this.closeIncident} ?hidden=${this.dialogType!="close"}>${langConfig.button.close["label_"+this.lang]}</sp-button>`
      case "reopen":
        return html`<sp-button class="dialogButton" size="m" @click=${this.reopenIncident} ?hidden=${this.dialogType!="reopen"} ?disabled=${!this.closedIds.length}>${langConfig.button.reopen["label_"+this.lang]}</sp-button>`
      default: return html``
    }
  }
  newTicketForm(curType){
    this.category=curType
    this.openDialog("createStep2")
  }
  get grid() {return this.shadowRoot.querySelector("vaadin-grid")}
  get icdDialog() {return this.shadowRoot.querySelector("tr-dialog#icdDialog")}
  get icdDialogSurface() {return this.icdDialog.shadowRoot.querySelector(".mdc-dialog__surface")}
  get icdTitle() {return this.shadowRoot.querySelector("#title")}
  get icdId() {return this.shadowRoot.querySelector("#icdId")}
  get icdNote() {return this.shadowRoot.querySelector("#note")}
  get icdProcInstanceName() {return this.shadowRoot.querySelector("#procInstanceName")}
  get icdPriority() {return this.shadowRoot.querySelector("#priority")}
  

  getOpenIncidents() {
    this.histories = []
    this.fetchApi(this.config.backendUrl + this.config.frontEndIncidentsUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      actionName: 'USER_OPEN_INCIDENTS'
    }), false).then(j => {
      if (j && !j.is_error) {
        this.getClosedIds()
        this.grid.items = j
        this.grid.querySelectorAll("vaadin-checkbox").forEach(c => {
          c.disabled = true
        })
      }
    })
  }
  getUserProcsList(){
    let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
    let blankEmpty={keyName:"", keyValue_en:"", keyValue_es:""}
    let newList=[]
    newList.push(blankEmpty)
    newList = newList.concat(procList);
    return html`
    ${newList.map((c, i) =>
        html`<mwc-list-item value="${c.procInstanceName}" ?selected=${i == 0}>${c["label_" + this.lang]}</mwc-list-item>`
    )}`         
  }
  getClosedIds() {
    this.closedIds = []
    this.fetchApi(this.config.backendUrl + this.config.frontEndIncidentsUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      actionName: 'CLOSED_INCIDENTS_LAST_N_DAYS',
      numDays: this.numDays
    }), false).then(j => {
      if (j && !j.is_error) {
        this.closedIds = j
      }
    })
  }

  /**
   * Once an incident item selected
   * @param {*} e the grid
   */
  selectItem(e) {
    if (!e.detail.value) {
      this.selectedItem = null
      this.histories = []
      return
    }
    // deselect old selected item if found
    if (this.selectedItem) {
      e.target.deselectItem(this.selectedItem)
    }
    if (e.detail.value) {
      this.selectedItem = e.detail.value
      this.fetchApi(this.config.backendUrl + this.config.frontEndIncidentsUrl + '?' + new URLSearchParams({
        dbName: this.config.dbName,
        finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
        actionName: 'INCIDENT_DETAIL_FOR_GIVEN_INCIDENT',
        incidentId: this.selectedItem.id
      }), false).then(j => {
        if (j && !j.is_error) {
          this.histories = j
        }
      })
    }
  }

  incidentAPI(params) {
    this.fetchApi(this.config.backendUrl + this.config.ApiIncidentsUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      ...params
    })).then(j => {
      this.icdDialog.close()
      this.getOpenIncidents()
    })
  }

  createIncident() {
    if (!this.icdTitle.validity.valid) {
      return this.icdTitle.focus()
    }
    if (!this.icdNote.validity.valid) {
      return this.icdNote.focus()
    }
    this.incidentAPI({
      actionName: 'NEW_INCIDENT',
      category: this.category.name,
      incidentTitle: this.icdTitle.value,
      incidentDetail: this.icdNote.value,
      incidentProcedure: this.icdProcInstanceName.value,
      priority: this.icdPriority.value
    })
    this.resetDialogFields()
  }

  confirmIncident() {
    if (!this.icdNote.validity.valid) {
      return this.icdNote.focus()
    }
    this.incidentAPI({
      actionName: 'CONFIRM_INCIDENT',
      incidentId: this.selectedItem.id,
      note: this.icdNote.value
    })
  }

  addNote() {
    if (!this.icdNote.validity.valid) {
      return this.icdNote.focus()
    }
    this.incidentAPI({
      actionName: 'ADD_NOTE_INCIDENT',
      incidentId: this.selectedItem.id,
      note: this.icdNote.value
    })
  }

  closeIncident() {
    if (!this.icdNote.validity.valid) {
      return this.icdNote.focus()
    }
    this.incidentAPI({
      actionName: 'CLOSE_INCIDENT',
      incidentId: this.selectedItem.id,
      note: this.icdNote.value
    })
  }

  reopenIncident() {
    if (this.icdNote===null){
      this.incidentAPI({
        actionName: 'REOPEN_INCIDENT',
        incidentId: this.icdId.value
      })
    }else{
      if (!this.icdNote.validity.valid) {
        return this.icdNote.focus()
      }
      this.incidentAPI({
        actionName: 'REOPEN_INCIDENT',
        incidentId: this.icdId.value,
        note: this.icdNote.value
      })
    }
  }

  openDialog(type) {
    this.dialogType = type
    if (this.icdDialog!==undefined&&this.icdDialog!==null){
      this.icdDialog.show()
    }
  }

  dialogOpened() {
    if (this.dialogType == "createStep2") {
      this.icdTitle.focus()
    } else if (this.dialogType == "reopen") {
      this.icdId.focus()
    } else {
      if (this.icdNote!==null){
        this.icdNote.focus()  
      }
    }
  }
}

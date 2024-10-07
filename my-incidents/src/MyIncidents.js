import { html, css, nothing } from 'lit';
import { CommonCore } from '@trazit/common-core';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button';
import '@material/web/select/filled-select';
import '@material/web/select/select-option';
import '@material/web/button/text-button';
import '@material/web/textfield/filled-text-field';
import './table.js'; // Importa la tabla personalizada

import { styles } from './my-incidents-styles.js';

import '@trazit/tr-dialog/tr-dialog';
import './history-item';
import { ApiFunctionsForPlatform } from '@trazit/apis-forplatform/ApiFunctionsForPlatform';


const langConfig = {
  field: {
    title: { "label_en": "Title", "label_es": "Titulo" },
    procInstanceName: { "label_en": "Procedure", "label_es": "Proceso" },
    category: { "label_en": "Category", "label_es": "Categoría" },
    priority: { "label_en": "Priority", "label_es": "Prioridad" },
    note: { "label_en": "Note", "label_es": "Nota" },
    days: { "label_en": "Number of Days", "label_es": "Número de Días" },
    id: { "label_en": "Incident Id - Date Creation - Title", "label_es": "Id de Incidencia - Creación de fecha - Título" }
  },
  priority: ['', '1', '2', '3'],
  grid: {
    id: { "label_en": "Id", "label_es": "Id" },
    last_update: { "label_en": "Last Update", "label_es": "Último cambio" },
    creation: { "label_en": "Creation", "label_es": "Creación" },
    title: { "label_en": "Title", "label_es": "Titulo" },
    detail: { "label_en": "Detail", "label_es": "Detalle" },
    priority: { "label_en": "Priority", "label_es": "Prioridad" },
    category: { "label_en": "Category", "label_es": "Categoría" },
    procInstanceName: { "label_en": "Procedure", "label_es": "Proceso" }
  },
  button: {
    new: {
    "label_en": "New", "label_es": "Crear"
    },
    reopen: {
      "label_en": "ReOpen it!", "label_es": "¡Reabrirla!"
    }    
  }
};

export class MyIncidents extends ApiFunctionsForPlatform(CommonCore) {
  static get properties() {
    return {
      selectedItem: { type: Object },
      histories: { type: Array },
      dialogType: { type: String },
      numDays: { type: Number },
      closedIds: { type: Array },
      category: { type: Object },
      dialogTitle: { type: Object },
      lang: { type: String }, // Idioma
      data: { type: Array },  // Datos de la tabla
      originalData: { type: Array },  // Datos de la tabla
    };
  }
  static get styles() {
    return styles;
  }
  constructor() {
    super();
    this.histories = [];
    this.category = {};
    this.dialogType = "";
    this.numDays = 7;
    this.closedIds = [];
    this.dialogTitle = {};
    this.lang = "en";
    this.originalData=[]
    this.data = []; // Datos vacíos al inicio
  }

  authorized() {
    super.authorized();
    this.getOpenIncidents();
  }

//   <!--      ${hasConfirmDate?nothing:html`
//     <div class="icon-button"><md-icon slot="icon" style="color:#12805c" .title="${langConfig.button.confirm["label_"+this.lang]}"  ?disabled=${!this.selectedItem} @click=${()=>{this.action=`${langConfig.button.confirm["label_"+this.lang]} Incident`;this.openDialog("confirm", langConfig.button.confirm)}}>check</md-icon></div> 
// `}      
// <div class="icon-button"><md-icon slot="icon" style="color:#0d66d0" .title="${langConfig.button.note["label_"+this.lang]}"  ?disabled=${!this.selectedItem} @click=${()=>{this.action=`${langConfig.button.note["label_"+this.lang]}`;this.openDialog("note", langConfig.button.note)}}></md-icon></div>
// <div class="icon-button"><md-icon slot="icon" style="color:#747474" .title="${langConfig.button.close["label_"+this.lang]}"  ?disabled=${!this.selectedItem} @click=${()=>{this.action=`${langConfig.button.close["label_"+this.lang]} Incident`;this.openDialog("close", langConfig.button.close)}}>close</md-icon></div>
// 
// -->
// <!--      <div class="icon-button"><md-icon slot="icon" style="color:#c9252d" icon="add" @click=${this.openDialog}>add</md-icon></div>
// ${this.renderActions()} -->

  render() {
    let hasConfirmDate=false    
    if (this.selectedItem!==null&this.selectedItem!==undefined&&this.selectedItem.date_confirmed!==undefined){
      hasConfirmDate=String(this.selectedItem.date_confirmed).length>0      
    }    
    return html`
    <div class="flex-container" style="display: flex; left: 20px; position: relative; gap: 10px; margin-bottom: 10px;">
      
      <div class="icon-button"><md-icon slot="icon" @click=${this.getOpenIncidents}>refresh</md-icon></div>
      <div class="icon-button"><md-icon slot="icon" style="color:#c9252d" .title="${langConfig.button.new["label_"+this.lang]}" icon="add" @click=${()=>{this.action=`${langConfig.button.new["label_"+this.lang]} Incident`;this.openDialog("createStep1", langConfig.button.new)}}>add</md-icon></div>
      <div class="icon-button"><md-icon slot="icon" .title="${langConfig.button.reopen["label_"+this.lang]}"  @click=${()=>{this.action=`${langConfig.button.reopen["label_"+this.lang]} Incident`;this.openDialog("reopen", langConfig.button.reopen)}} ?disabled=${!this.closedIds.length}>lock_open</md-icon></div>
    </div>
    ${this.renderTable()}
    <div ?hidden=${this.hideList} style="display:flex; flex-wrap: wrap; gap: 10px;">
      ${this.histories.map(h =>
        html`<history-item .history=${h} .lang=${this.lang}></history-item>`
      )}
    </div>

    <tr-dialog id="icdDialog" 
      @opened=${e=>{if(e.target===this.icdDialog)this.dialogOpened()}}  
      .showCloseButton="${true}" .showDoButton="${true}" @do-action="${this.handleDialogAction}"
      heading=""
      hideActions=""
      scrimClickAction=""
      .dialogTitle=${this.dialogTitle}
      .doButtonLabel="${this.buttonsByTypeAndAction()}"
      .lang=${this.lang}
      >
      <form slot="content" id="form-id" method="dialog"> 
        <div class="content layout vertical flex center-justified">
          ${this.fieldsByTypeAndAction()}
        </div>
      </form>
    </tr-dialog>    
    `;
  }

  renderTable() {
    return html`
      <table-component
        .elem="${this.getTableConfig()}"
        .data="${this.data}"
        .lang="${this.lang}"
        @table-row-selected="${this.handleRowSelected}"
        @table-row-button-clicked="${this.openDialogForRowButton}">
      </table-component>
    `;
  }
  
  openDialogForRowButton(event) {
    //alert('openDialogForRowButton '+this.dialogType);
    //console.log('Datos del evento:', event.detail);  // Muestra los detalles del evento en la consola para depuración
    this.selectedItem=event.detail.data
    this.openDialog(event.detail.action.actionName, event.detail.action.button.title) 
    
    //this.dialogType=event.detail.action.actionName
    //this.buttonsByTypeAndAction()
  }

  renderActions() {
    return html`
      <div class="icon-button"><md-icon slot="icon" style="color:#0d66d0" .title="Add Note" icon="note_add" @click=${this.addNote}>note_add</md-icon></div>
      <div class="icon-button"><md-icon slot="icon" style="color:#747474" .title="Close Incident" icon="close" @click=${this.closeIncident}>close</md-icon></div>
    `;
  }

  getTableConfig() {
    console.log('getTableConfig')
    return {
      columns: [
        { label_en: langConfig.grid.id["label_" + this.lang], name: 'id' },
        { label_en: langConfig.grid.last_update["label_" + this.lang], name: 'date_last_update' },
        { label_en: langConfig.grid.creation["label_" + this.lang], name: 'date_creation' },
        { label_en: langConfig.grid.title["label_" + this.lang], name: 'item_title' },
        { label_en: langConfig.grid.category["label_" + this.lang], name: 'category' },
        { label_en: langConfig.grid.priority["label_" + this.lang], name: 'priority' },
        { label_en: langConfig.grid.procInstanceName["label_" + this.lang], name: 'incident_procedure' },
      ],
      row_buttons:[   
        { actionName:"confirm",
          button:{
            icon:"check",
            title:{
              "label_en": "Confirm", "label_es": "Confirmar"
            }
          }
        },    
        { actionName:"note", 
          button:{    
            icon:"note_add",
            title:{ 
              "label_en": "Add Note", "label_es": "Añadir Nota"
            }
          }
        },
        { actionName:"close",  
          button:{ 
            icon:"close",
            title:{   
              "label_en": "Close it!", "label_es": "¡Zanjarla!"
            }
          }
        }
      ]
    };
  }

  getOpenIncidents() {
    this.histories = []
    let serviceAPIurl=this.getServiceAPIUrl(undefined)
    this.fetchApi(serviceAPIurl + this.config.frontEndIncidentsUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      actionName: 'USER_OPEN_INCIDENTS'
    }), false).then(j => {
      if (j && !j.is_error) {
        this.getClosedIds()
        this.originalData=j
        this.data=j
        //this.grid.items = j
        //this.grid.querySelectorAll("vaadin-checkbox").forEach(c => {
        //  c.disabled = true
        //})
      }
    })
  }
  getClosedIds() {
    this.closedIds = []
    let serviceAPIurl=this.getServiceAPIUrl(undefined)
    this.fetchApi(serviceAPIurl + this.config.frontEndIncidentsUrl + '?' + new URLSearchParams({
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
        <md-filled-select id="procInstanceName" label="${langConfig.field.procInstanceName["label_"+this.lang]}" @selected=${this.valueSelected}                    
          style="width:100%;">${this.getUserProcsList()}</md-filled-select>  
        <md-filled-text-field id="title" label="${langConfig.field.title["label_"+this.lang]}" ?hidden=${this.dialogType!="createStep2"} required></md-filled-text-field>
        <md-filled-select id="priority" label="${langConfig.field.priority["label_"+this.lang]}" @selected=${this.valueSelected}                    
          style="width:100%;">${langConfig.priority.map((curValue, i)=>
            html`<md-select-option value="${curValue}" ?selected=${i == 0}>${curValue}</md-select-option>`
          )}</md-filled-select>  
        <textarea id="note" label="${langConfig.field.note["label_"+this.lang]}"  rows=10 cols=100 required></textarea>
      `
    } else if (this.dialogType=="reopen"){
      return html`
        <div class="reopenPart">
          <div class="layout horizontal flex center-center">
            <md-filled-text-field class="layout flex" id="numDays" type="number" 
              .value=${this.numDays} @change=${e=>this.numDays=e.target.value}
              label="${langConfig.field.days["label_"+this.lang]}"></md-filled-text-field>
            <md-icon slot="icon" @click=${this.getClosedIds}>refresh</md-icon>
          </div>
          <md-filled-select id="icdId" label="${langConfig.field.id["label_"+this.lang]}" 
            ?disabled=${!this.closedIds.length}>
            ${this.closedIds.map((c,i) => 
              html`<md-select-option value="${c.id}" ?selected=${i==0}>${c.id} - ${c.date_creation.slice(0,10)} - ${c.item_title.slice(0,20)}</md-select-option>`
            )}
          </md-filled-select>
        </div>
      `
    }else{
      return html`
      <textarea id="note" label="${langConfig.field.note["label_"+this.lang]}" rows=10 cols=100 required></textarea>
      `
    }

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
  handleDialogAction(){    
    switch (this.dialogType){
      case "createStep2":
        this.createIncident()
        break
      case "confirm":
        this.confirmIncident()
        break
      case "note":
        this.addNote()
        break
      case "close":
        this.closeIncident()
        break
      case "reopen":
        this.reopenIncident()
        break
      default: 
        return 
    }    
  }
  buttonsByTypeAndAction(){
    switch (this.dialogType){
      case "createStep2":
        return langConfig.button.new
      case "confirm":
        return langConfig.button.confirm
      case "note":
        return langConfig.button.note
      case "close":
        return langConfig.button.close
      case "reopen":
        return langConfig.button.reopen
      default: {}
    }
  }
  newTicketForm(curType){
    this.category=curType
    //this.dialogTitle.icon="/images/incidentType/"+curType.name+"_"+this.lang+".png"
    this.openDialog("createStep2", curType)
  }
  get grid() {return this.shadowRoot.querySelector("vaadin-grid")}
  get icdDialog() {return this.shadowRoot.querySelector("tr-dialog#icdDialog")}
  get icdDialogSurface() {return this.icdDialog.shadowRoot.querySelector(".mdc-dialog__surface")}
  get icdTitle() {return this.shadowRoot.querySelector("#title")}
  get icdId() {return this.shadowRoot.querySelector("#icdId")}
  get icdNote() {return this.shadowRoot.querySelector("#note")}
  get icdProcInstanceName() {return this.shadowRoot.querySelector("#procInstanceName")}
  get icdPriority() {return this.shadowRoot.querySelector("#priority")}
  


  getUserProcsList(){
    let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
    let blankEmpty={keyName:"", keyValue_en:"", keyValue_es:""}
    let newList=[]
    newList.push(blankEmpty)
    newList = newList.concat(procList);
    return html`
    ${newList.map((c, i) =>
        html`<md-select-option value="${c.procInstanceName}" ?selected=${i == 0}>${c["label_" + this.lang]}</md-select-option>`
    )}`         
  }


  /**
   * Once an incident item selected
   * @param {*} e the grid
   */

  handleRowSelected(event) {
    const rowData = event.detail.row;
    console.log('Row seleccionada:', rowData);
    this.selectItem({ detail: { value: rowData } });
  }

  selectItem(e) {
    if (!e.detail.value) {
      // Si no hay ningún ítem seleccionado, restauramos los datos originales
      this.selectedItem = null;
      this.histories = [];
      this.data = [...this.originalData]; // Restauramos la copia de los datos originales
      return;
    }
  
    // Si ya hay un ítem seleccionado, lo limpiamos
    if (this.selectedItem) {
      this.selectedItem = null;
      this.data=this.originalData
      return
    }
  
    if (e.detail.value) {
      // Guardamos el nuevo ítem seleccionado
      this.selectedItem = e.detail.value;
  
      // Guardamos una copia de los datos originales solo si no la hemos guardado aún
      if (!this.originalData) {
        this.originalData = [...this.data];
      }
  
      // Reemplazamos `this.data` con solo el ítem seleccionado
      this.data = [this.selectedItem];
  
      // Llamada a la API para obtener más detalles del ítem seleccionado
      let serviceAPIurl = this.getServiceAPIUrl(undefined);
      this.fetchApi(serviceAPIurl + this.config.frontEndIncidentsUrl + '?' + new URLSearchParams({
        dbName: this.config.dbName,
        finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
        actionName: 'INCIDENT_DETAIL_FOR_GIVEN_INCIDENT',
        incidentId: this.selectedItem.id
      }), false).then(j => {
        if (j && !j.is_error) {
          this.histories = j; // Almacena los historiales del ítem seleccionado
        }
      });
    }
  }
  

  incidentAPI(params) {
    let serviceAPIurl=this.getServiceAPIUrl(undefined)
    this.fetchApi(serviceAPIurl + this.config.ApiIncidentsUrl + '?' + new URLSearchParams({
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
  resetDialogFields(){
    this.action=undefined;
    this.category.name=undefined;
    let textElements=['icdTitle', 'icdNote', 'priority']
    textElements.forEach(elementId => {
      if(this[elementId]){this[elementId].value="";}
    })
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



  openDialog(type, buttonInfo) {
    this.dialogType = type;
    if (buttonInfo.label_en!==undefined){
      this.dialogTitle.title_en = buttonInfo.label_en;
      this.dialogTitle.title_es = buttonInfo.label_es;
    }else{
      this.dialogTitle.title_en = this.dialogTitle.title_en+' '+buttonInfo.name;
      this.dialogTitle.title_es = this.dialogTitle.title_es+' '+buttonInfo.name;
    }
    console.log(this.dialogTitle)
    if (this.icdDialog) {
        this.icdDialog.dialogTitle=this.dialogTitle
        this.icdDialog.show();
        this.icdDialog.requestUpdate(); // Force a re-render after showing
    }
 }

  dialogOpened() {
    if (this.dialogType == "createStep2") {
      this.icdDialog.dialogTitle=this.dialogTitle
      this.icdTitle.focus()
      this.icdDialog.requestUpdate();
    } else if (this.dialogType == "reopen") {
      this.icdId.focus()
    } else {
      if (this.icdNote!==null){
        this.icdNote.focus()  
      }
    }
  }

}window.customElements.define('my-incidents', MyIncidents);

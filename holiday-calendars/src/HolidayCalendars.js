import { html, css } from 'lit';
//import { CredDialog } from '@trazit/cred-dialog';
import { CommonCore } from '@trazit/common-core';
import { CalendarUtilities } from './CalendarUtilities';
import { CalendarActions } from './CalendarActions';
import { CalendarDialogTemplate} from './CalendarDialogTemplate';
import '@google-web-components/google-chart';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';

//import '@alenaksu/json-viewer';
//import '@spectrum-web-components/split-view/sp-split-view';

const viewInfoDefinition = {
  grid: {
    id: {"label_en": "Id", "label_es": "Id"},
    date: {"label_en": "Date", "label_es": "Fecha"},
    day_name: {"label_en":"Name", "label_es": "Nombre"},
    created_on: {"label_en":"Creation Date", "label_es": "F.Creación"},
    created_by: {"label_en": "Creator", "label_es": "Creador"}
  },
  selector: { 
    title: {"label_en": "Calendar Name", "label_es": "Calendario"}
  },
  calendarActions: [
    { "actionName": "NEW_CALENDAR",
      "selObjectVariableName": "selectedCalendar", 
      "endPoint": "/app/HolidayCalendarAPIactions",
      "endPointParams": [ 
        { "argumentName": "name", "element": "text1" },
        { "isAdhocField": true, "argumentName": "fieldName", "defaultValue": "description" },
        { "isAdhocField": true, "argumentName": "fieldValue", "element": "text2", "fieldType":"STRING" }
      ],
    "button": {
      "z-icdon": "refresh",
      "title": {
        "label_en": "Create", "label_es": "Crear"
      },
      requiresObjectSelected : false
    },   
    "dialogInfo": {
      "requiresDialog": true,
      "name": "genericFormDialog",
      "fields": {
        "text1": { "label_en": "New calendar name", "label_es": "Nombre nuevo calendario" },
        "text2": { "label_en": "Description", "label_es": "Descripción" },
      }
    }
    },

  ],
  calendarDateActions: [
    { "actionName": "ADD_DATE_TO_CALENDAR",
    "requiresDialog": true,
    "xxxclientMethod": "newStudyIndividual",
    "selObjectVariableName": "selectedCalendar", 
    "endPoint": "/app/HolidayCalendarAPIactions",
    "endPointParams": [ 
      { "argumentName": "name", "internalVariableObjName":"selectedCalendar", "internalVariableObjProperty":"code"},
      { "argumentName": "dayName", "element": "text1" },
      { "argumentName": "newDate", "element": "date1" }
      // { "argumentName": "fieldsNames", "value": "undefined" },
      // { "argumentName": "fieldsValues", "value": "undefined" }
      //individualsList
    ],
    "button": {
      "z-icdon": "refresh",
      "title": {
        "label_en": "Add Date", "label_es": "Añadir Fecha"
      },
      requiresObjectSelected : false
    },   
    "dialogInfo": {
      "requiresDialog": true,
      "name": "genericFormDialog",
      "fields": {
        "text1": { "label_en": "Date Name", "label_es": "Nombre" },
        "date1": { "label_en": "Date", "label_es": "Fecha"}
      }
    }
    },
    { "actionName": "DELETE_DATE_FROM_GIVEN_CALENDAR",
      "selObjectVariableName": "selectedCalendarDate", 
      "endPoint": "/app/HolidayCalendarAPIactions",
      "endPointParams": [ 
        { "argumentName": "calendar", "internalVariableArrName":"selectedCalendarDate", "internalVariableObjProperty":"calendar_code", "ZZZselObjectPropertyName": "study"},
        { "argumentName": "date_id", "internalVariableArrName":"selectedCalendarDate", "internalVariableObjProperty":"id" },        
      ],
      "button": {
        "z-icdon": "refresh",
        "title": {
          "label_en": "Remove Date", "label_es": "Quitar Fecha"
        },
        requiresObjectSelected : true
      },   
    },
  ]
};

 
export class HolidayCalendars extends CalendarDialogTemplate(CalendarActions(CalendarUtilities((CommonCore)))) {
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
      google-chart.calendarchart{
        height:180px;
      }
      mwc-icon-button#lang {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }
      mwc-button {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background: rgb(36, 192, 235) none repeat scroll 0% 0%;
        font-family: Montserrat;
        font-weight: bold;
        font-size: 19px;
        color: white;
        border-color: transparent !important;
        --mdc-button-fill-color: red;
        --mdc-button-ink-color: blue;
      }            
      mwc-icon-button {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }        
      mwc-icon-button.disabledtrue{        
        color : red;
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }        
      mwc-icon-button#video {
        color : #FFFFFF;
        color : rgba(36, 192, 235, 1);
      }
      sp-button {
        background : #24C0EB;
        background : rgba(36, 192, 235, 1);
        border-color : inherit !important;
        border-radius : 35px;
        -moz-border-radius : 35px;
        -webkit-border-radius : 35px;
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        color : #FFFFFF;
        color : rgb(255, 255, 255);
      }
      mwc-textfield {
        border-style : Solid;
        border-color : #999999;
        border-color : rgba(153, 153, 153, 1);        
        border-width : 1px;
        border-radius : 7px;
        -moz-border-radius : 7px;
        -webkit-border-radius : 7px;   
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background-color :  #FFFFFF;
        background-color : rgb(255, 255, 255);     
        background: rgba(255, 255, 255, 0) none repeat scroll 0% 0%;
      }
      mwc-textfield.mdc-text-field {
        background-color :  #FFFFFF;
        background-color : rgb(255, 255, 255);     
      }
      mwc-textfield.mdc-textfield.mdc-floating-label {
        color: red; 
      }

      `
    ]
  }

  static get properties() {
    return {
      docs: { type: Array },
      filterDocs: { type: Array },
      apis: { type: Array },
      calendars: { type: Array },
      selectedApis: { type: Array },
      selectedTxts: { type: Array },
      selectedCalendarDate: { type: Array },
      selectedCalendar: { type: Object },
    };
  }

  constructor() {
    super()
    this.docs = []
    this.filterDocs = []
    this.apis = []
    this.selectedApis = []
    this.selectedTxts = []
    this.calendars = []
    this.selectedCalendar = [{}]
    this.selectedCalendarDate = []
    
  }
  calendarSelectorTitle(){
    return viewInfoDefinition.selector.title["label_"+this.lang]
    return 'Calendar Name'
  }
  listEntryLabel(entry){
    if (entry.description&&entry.description.length>0){
      return entry.code +' ('+entry.description+')'
    }else{
      return entry.code
    }
  }
  render() {
    return html`
      <div class="layout horizontal center flex wrap">      
        <mwc-icon-button icon="refresh" @click=${this.getHolidayCalendars}></mwc-icon-button>      
        <mwc-select outlined id="calendarsList" label="${this.calendarSelectorTitle()}" @change=${this.calendarChanged} ?hidden=${this.calendars.length<2}>
            ${this.calendars&&this.calendars.map((p,i) => 
              html`<mwc-list-item value="${p.code}" ?selected=${i==0}>${this.listEntryLabel(p)}</mwc-list-item>`
            )}
          </mwc-select>
          ${this.getButton(viewInfoDefinition.calendarActions, this.selectedCalendar)}
      </div>
      <h1>${this.getTitle()}</h1>

      ${this.getButton(viewInfoDefinition.calendarDateActions, this.selectedCalendarDate)}
      <div class="layout horizontal center flex wrap">  
        <google-chart class="calendarchart" type="calendar"></google-chart>
      </div>
      <vaadin-grid @active-item-changed=${this.selectItem} theme="row-dividers" column-reordering-allowed multi-sort
       .selectedItems="${this.selectedCalendarDate}" 
      >
        <vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column>
        <vaadin-grid-sort-column path="id" .header="${viewInfoDefinition.grid.id["label_"+this.lang]}"></vaadin-grid-sort-column>
        <vaadin-grid-sort-column path="date" .header="${viewInfoDefinition.grid.date["label_"+this.lang]}"></vaadin-grid-sort-column>
        <vaadin-grid-filter-column path="day_name" .header="${viewInfoDefinition.grid.day_name["label_"+this.lang]}"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column path="created_on" .header="${viewInfoDefinition.grid.created_on["label_"+this.lang]}"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column path="created_by" .header="${viewInfoDefinition.grid.created_by["label_"+this.lang]}"></vaadin-grid-filter-column>
      </vaadin-grid>
      ${this.calendarDialogsTemplate()} 
    `;
  }
    

  get grid() {return this.shadowRoot.querySelector("vaadin-grid")}
  get chart() {return this.shadowRoot.querySelector("google-chart")}
  getTitle(){
    if (this.selectedCalendar&&this.selectedCalendar.code){
      return this.selectedCalendar.description+'  ('+this.selectedCalendar.code+')'
    }else{
      return ''
    }
  }
  selectItem(e) {
    console.log('selectItem', e.detail.value)
    if (!e.detail.value) {
      this.selectedCalendarDate = []
      //this.histories = []
      return
    }
    // deselect old selected item if found
    if (this.selectedCalendarDate) {
      e.target.deselectItem(this.selectedCalendarDate)
    }
    this.selectedCalendarDate = []
    if (e.detail.value) {
      this.selectedCalendarDate.push(e.detail.value)
      this.requestUpdate()
    }
  }  
  calendarChanged(e) {
    console.log('calendarChanged', e.target.value)
    let program = []
    this.selectedCalendarDate = []
    program=this.calendars.filter(p => p.code == e.target.value)
    if (program.length) {
      this.selectedCalendar = []
      this.selectedCalendar=program[0]
      //this.selectedCalendar.study = []
      //this.selectedCalendar.study=[]
      //console.log('this.selectedCalendar', this.selectedCalendar)
      this.grid.items=program[0].holidays_calendar_date
      this.setGoogleCalendarChart()
      this.requestUpdate()
    }
  }

  setGoogleCalendarChart() {
    let cols=[]
    cols=[{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }]
     
    this.chart.cols=cols 
    let options={}
    
    options= 
      {width: 2000,
              height: 720,
              redFrom: 4,
              redTo: 5,
              yellowFrom:1,
              yellowTo: 3,
              minorTicks: 5,
          title: "",
          calendar: {
              dayOfWeekLabel: {
                fontName: 'Times-Roman',
                fontSize: 12,
                color: '#76a7fa',
                bold: true,
                italic: true,
              },
              dayOfWeekRightSpace: 10,
              daysOfWeek: 'DLMXJVS',
              yearLabel: {
                fontName: 'Times-Roman',
                fontSize: 32,
                color: '#76a7fa',
                bold: true,
                italic: true
              },
              monthOutlineColor: {
                stroke: '#050B33',
                strokeOpacity: 0.8,
                strokeWidth: 2
              },
              unusedMonthOutlineColor: {
                  stroke: '#050B33',
                  strokeOpacity: 0.8,
                  strokeWidth: 1
              },                                                                           
            },

          underMonthSpace: 16,     
          noDataPattern: {
            backgroundColor: '#EEF1FF',
            color: '#EEF1FF'
          },
      }
      if (this.selectedCalendar){
        if (this.selectedCalendar.description){
          options.title=this.selectedCalendar.description
        }else{
          options.title=this.selectedCalendar.code
        }
      }
    this.chart.options=options
    let datas=[]
    datas=[
        {year:2019, month:3, day: 1, value:0},
        {year:2020, month:3, day:2, value:1},
        {year:2019, month:3, day:3, value:2},
        {year:2019, month:3, day:4, value:3},
        {year:2019, month:3, day:5, value:4},
        {year:2019, month:3, day:6, value:5},
        {year:2019, month:3, day:7, value:6},
        {year:2021, month:10, day:1, value:-10},
    ]
    datas=this.selectedCalendar.holidays_calendar_date
    var i;
    var datesArr=[];
    for (i = 0; i < datas.length; i++) { 
        console.log('i', i, datas[i].year);
        var newElement=[];
        newElement[0]=new Date(datas[i].date_year, datas[i].date_month-1, datas[i].date_dayOfMonth);
        newElement[1]=-50 //datas[i].day_name
        datesArr[i]=newElement;                    
    }
    console.log('datesArr', datesArr);
    this.chart.rows=datesArr
    return
    let data = []
    data.push( [ new Date(2012, 3, 1), 37032 ])
    data.push( [ new Date(2012, 2, 1), 37032 ])
    if (this.chart){
      this.chart.data = JSON.stringify(data)
      //this.chart.col = ["Date", "Won/Loss"]
      var option2s = {
        title: 'Red Sox Attendance',
        height: 350,
        calendar: {
          dayOfWeekLabel: {
            fontName: 'Times-Roman',
            fontSize: 12,
            color: '#1a8763',
            bold: true,
            italic: true,
          },
          dayOfWeekRightSpace: 10,
          daysOfWeek: 'DLMMJVS',
        }
      }
      this.chart.options=options
  //    var dataTable = new google.visualization.DataTable();
  //    dataTable.addColumn({ type: 'date', id: 'Date' });
  //    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
      console.log(data)
      return
      this.selectedProgram.samples_summary_by_stage.forEach(c => {
        if (c.current_stage != "END") {
          data.push([c.current_stage, c.COUNTER])
        }
      })
      this.chart.data = JSON.stringify(data)
    }
  }

  getTitle() {
    if (this.viewInfoDefinition&&this.viewInfoDefinition.title[this.filterName]) {
      return html`<h1>${this.viewInfoDefinition.title[this.filterName]["label_"+this.lang]}</h1>`
    }
  }
  getHolidayCalendars() {
    var curCalendar=this.selectedCalendar
    if (curCalendar===undefined){return}
    this.fetchApi(this.config.backendUrl + this.config.HolidayCalendarAPIqueriesUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      actionName: 'GET_ALL_HOLIDAY_DATES_LIST_ALL_CALENDARS'
    }), false).then(j => {
      if (j && !j.is_error) {
        this.calendars = j
        this.selectedCalendar=this.calendars[0]
        if (curCalendar.code!==undefined){
          let givenCalendar = this.calendars.filter(i => i.code == curCalendar.code)
          if (givenCalendar!==undefined){
            this.selectedCalendar=givenCalendar[0]
            this.grid.items=this.selectedCalendar.holidays_calendar_date
          }else{
            this.grid.items=this.calendars[0].holidays_calendar_date
          }
        }
      }
    })
    this.requestUpdate()
  }
  authorized() {
    super.authorized()
    this.getHolidayCalendars()
  }
/*
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

  calendarselect(evt, api) {
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
*/  
}

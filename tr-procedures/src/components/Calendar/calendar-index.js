import { LitElement, html, css } from 'lit';
import { styles } from './styles/index';
//import { events } from './data/event';
import { createEventDescription, getDayNames, formatTime, formatDate, formatDateString } from './utils';
import '../event-badge';
import { ButtonsFunctions } from '../Buttons/ButtonsFunctions';
import '@material/mwc-icon-button';
import '@material/mwc-button';
import { TrazitGenericDialogs } from '../GenericDialogs/TrazitGenericDialogs';
import { MiniMapMain } from './MiniMap/mini-map-main';

class CalendarComponent extends MiniMapMain(TrazitGenericDialogs(ButtonsFunctions(LitElement))) {
  static properties = {
    data: { type: Object },
    calendarInfo: { type: Object },
    eventsInfo: {type: Array},
    config:{ type: Object},
    eventsConfig:{ type: Object},
    calendarConfig:{ type: Object},
    showWeekViewTab:{type: Boolean},
    showMonthViewTab:{type: Boolean},
    showDayViewTab:{type: Boolean},
    showYearViewTab:{type: Boolean},
    showEventsViewTab:{type: Boolean},
    lang: {type: String},
    calendarStartDate: {type: Date},
    calendarEndDate: {type: Date}
    
    // Otras propiedades que ya tienes...
  };

  static styles = [styles, css``];
  constructor() {
    super();
    this.data={}
    this.showWeekViewTab=false // This view does not work and then it cannot displayed
    this.showDayViewTab=false
    this.showMonthViewTab=false
    this.showYearViewTab=false
    this.showEventsViewTab=false    
    this.calendarConfig={}
    this.calendarInfo={}
    this.eventsConfig={}
    this.eventsInfo=[]
    this.calendarStartDate=new Date()
    this.calendarEndDate=new Date()
    this.config={}
  }

  initializeCalendarConfigVariablesWhenMissingProperties(){
    if (this.calendarInfo===undefined){
      this.calendarInfo={}
    }    
    if (this.calendarConfig===undefined){
      this.calendarConfig={}
    }    
    if (this.calendarConfig.startDate===undefined){
      this.calendarConfig.startDate="start_date" // La fecha de inicio del programa, las fechas anteriores estarán deshabilitadas o directamente no visibles.
    }
    if (this.calendarConfig.endDate===undefined){
      this.calendarConfig.endDate="end_date" // La fecha de inicio del programa, las fechas anteriores estarán deshabilitadas o directamente no visibles.
    }
    
    if (this.calendarConfig.scheduleSizeUnit===undefined){
      this.calendarConfig.scheduleSizeUnit="MONTHS" // Puede ser MONTHS, DAYS, YEARS
    }
    if (this.calendarConfig.firstDayOfWeek===undefined){
      this.calendarConfig.firstDayOfWeek="MONDAY" // Puede ser lunes o domingo, segun el calendario escogido
    }    
    if (this.calendarConfig.viewCurrentDate===undefined){
      this.calendarConfig.viewCurrentDate="today" // El día que se ve seleccionado al abrir la pantalla
    }      
  }
  
  firstUpdated() {
    super.firstUpdated();
    this.refreshView()   

    //this.showMonthView();
  }
  
  showMonthView() {
    // Limpiar otras pestañas activas
    // this.shadowRoot.querySelectorAll('.tab-item').forEach((btn) => {
    //   btn.classList.remove('active');
    // });
  
    // // Añadir la clase 'active' a la pestaña de "Month"
    // let monthObj=this.shadowRoot.getElementById('showCurrentMonth')
    // if (monthObj!==null){
    //   monthObj.classList.add('active');
    // }
    // Mostrar la vista del mes
    this.shadowRoot.getElementById('calendar').innerHTML = ''; // Limpia el calendario
    const currentMonth = this.calendarStartDate
      ? new Date(this.calendarStartDate).getMonth()
      : new Date().getMonth();
    const currentYear = this.calendarStartDate
      ? new Date(this.calendarStartDate).getFullYear()
      : new Date().getFullYear();
    
    const $monthNode = this.buildMonth(
      currentMonth,
      currentYear,
      this.eventsInfo,
      this.holidays_calendar,
      this.calendarStartDate,
      this.calendarEndDate, false
    );
  
    this.shadowRoot.getElementById('calendar').appendChild($monthNode);
    $monthNode.classList.remove('month')
    $monthNode.classList.add('full-month');
    this.showCalendarView();
    if (this.currentButton!==undefined){
      this.currentButton.innerText = 'Month'; // Actualiza el botón de navegación
    }
  }

  updated(changedProperties) {
    if(changedProperties.has('calendarConfig')) {
      this.refreshView()
    }
    if(changedProperties.has('calendarInfo')) {
      this.refreshView()
    }
    if(changedProperties.has('eventsConfig')) {
      this.refreshView()
    }
    if(changedProperties.has('eventInfo')) {
      this.refreshView()
    }
    const conflictTab = this.shadowRoot.getElementById('showConflicts');
    if (conflictTab && conflictTab.style.display !== 'none') {
      conflictTab.addEventListener('click', () => {
        this.allEvents.innerHTML = '';
        this.allEvents.style.display = 'none';
        this.conflictEvents.innerHTML = '';
        this.conflictEvents.style.display = 'block';
        this.calendar.style.display = 'none';
        
        const conflictContainer = document.createElement('div');
        conflictContainer.classList.add('event-list-container');
        const conflictEvents = this.eventsInfo.filter(event => event.conflict);
  
        conflictEvents.forEach((event) => {
          let listItem = document.createElement('li');
          listItem.classList.add('event-item');
          
          const dateField = this.eventsConfig?.datesDateField || 'date';
          let eventDate = document.createElement('p');
          eventDate.textContent = `Date: ${event[dateField]}`;
          listItem.appendChild(eventDate);
  
          let eventDescription = createEventDescription(event, this.eventsConfig.eventListsFields, this.lang);
          listItem.appendChild(eventDescription);
  
          let conflictDetail = document.createElement('p');
          conflictDetail.textContent = `Conflict Detail: ${event.conflict_detail}`;
          listItem.appendChild(conflictDetail);
  
          conflictContainer.appendChild(listItem);
        });
  
        this.conflictEvents.appendChild(conflictContainer);
      });
    }    
  }  
  
  setDefaultView(){
    this.showDayViewTab=this.calendarConfig.dayView!==undefined&&this.calendarConfig.dayView.hide!==undefined&&this.calendarConfig.dayView.hide!==true
    this.showMonthViewTab=this.calendarConfig.monthView!==undefined&&this.calendarConfig.monthView.hide!==undefined&&this.calendarConfig.monthView.hide!==true
    this.showYearViewTab=this.calendarConfig.yearView!==undefined&&this.calendarConfig.yearView.hide!==undefined&&this.calendarConfig.yearView.hide!==true
    this.showEventsViewTab=this.eventsConfig!==undefined&&this.eventsConfig.eventListsFields!==undefined


    this.shadowRoot.querySelectorAll('.tab-item').forEach((btn) => {
      btn.classList.remove('active');
    });
    if (this.calendarConfig.defaultTab===undefined){
      if (this.showMonthViewTab){
        this.calendarConfig.defaultTab='month'
      }else if (this.showYearViewTab){
        this.calendarConfig.defaultTab='year'
      }else if (this.showEventsViewTab){
        this.calendarConfig.defaultTab='events'
      }else if (this.showDayViewTab){
        this.calendarConfig.defaultTab='day'
      }else{
        return
      }
    }
    let monthObj=undefined
    switch(this.calendarConfig.defaultTab.toLowerCase()){      
      case 'month':
        monthObj=this.shadowRoot.getElementById('showCurrentMonth')
        if (monthObj!==null){
          monthObj.classList.add('active');
        }   
        this.showMonthView()
        break
      case 'year':
        monthObj=this.shadowRoot.getElementById('showAllMonths')
        if (monthObj!==null){
          monthObj.classList.add('active');
        }          
        break
      case 'day':
        monthObj=this.shadowRoot.getElementById('showDayView')
        if (monthObj!==null){
          monthObj.classList.add('active');
        }   
        //this.showDayGridView()
        break
      case 'events':
        monthObj=this.shadowRoot.getElementById('showAllEvents')
        if (monthObj!==null){
          monthObj.classList.add('active');
        }   
        this.showAllEventsView()
        break
      case 'week':
        monthObj=this.shadowRoot.getElementById('showWeekView')
        if (monthObj!==null){
          monthObj.classList.add('active');
        }   
        this.showCalendarView()
        break                        
      default:        
    }
    // Añadir la clase 'active' a la pestaña de "Month"
  }
  showAllEventsView(){
    this.allEvents.innerHTML = '';
    this.allEvents.style.display = 'block';
    this.calendar.style.display = 'none';
    this.selectedDateView.style.display = 'none';
    this.dayGridView.style.display = 'none';
    this.weekGridView.style.display = 'none';
    this.conflictEvents.style.display = 'none';      

    const allEventsContainer = document.createElement('div');
    allEventsContainer.classList.add('event-list-container');
    
    if (this.eventsInfo !== undefined) {
      this.eventsInfo.forEach((event) => {
        let listItem = document.createElement('li');
        listItem.classList.add('event-item');

        let eventDate = document.createElement('p');
        const dateField = this.eventsConfig?.datesDateField || 'date';
        eventDate.textContent = `Date: ${event[dateField]}`;
        listItem.appendChild(eventDate);

        let eventDescription = createEventDescription(event, this.eventsConfig.eventListsFields, this.lang);
        listItem.appendChild(eventDescription);

        if (event.is_holidays) {
          let holidayLabel = document.createElement('span');
          holidayLabel.textContent = 'Holiday';
          holidayLabel.classList.add('event-label');
          listItem.appendChild(holidayLabel);
        }

        if (event.conflict) {
          let conflictDetail = document.createElement('p');
          conflictDetail.textContent = `Conflict Detail: ${event.conflict_detail}`;
          conflictDetail.classList.add('conflict-detail');
          listItem.appendChild(conflictDetail);
        }

        allEventsContainer.appendChild(listItem);
      });
    }

    this.allEvents.appendChild(allEventsContainer);    
  }
  refreshView() {    
    console.log('refreshView');
    this.initializeCalendarConfigVariablesWhenMissingProperties();
      
 
    this.holidays_calendar = [];
    if (this.calendarInfo && this.calendarInfo.holidays_calendar) {
      this.holidays_calendar = this.calendarInfo.holidays_calendar;
    }
    
    this.firstDayOfWeek = this.calendarInfo?.[this.calendarConfig.firstDayOfWeek] || "MONDAY";
    this.schedule_size_unit = this.calendarInfo?.[this.calendarConfig.scheduleSizeUnit] || "MONTHS";
    
    this.currentDate = this.calendarInfo.viewCurrentDate?.toLowerCase() === "today" ? 
      new Date() : 
      new Date(this.calendarInfo?.[this.calendarConfig.startDate] || new Date());
  
    this.firstDateOfWeek = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate() - (this.firstDayOfWeek === "MONDAY" ? (this.currentDate.getDay() === 0 ? 6 : this.currentDate.getDay() - 1) : this.currentDate.getDay())
    );
    
    if (this.calendarInfo === undefined || this.calendarConfig === undefined || this.calendarInfo[this.calendarConfig.startDate] === undefined) {
      this.calendarInfo[this.calendarConfig.startDate] = this.currentDate;
    }
  
    console.log('date for calendarStartDate', this.calendarInfo[this.calendarConfig.startDate]);
    this.calendarStartDate = new Date(new Date(this.calendarInfo[this.calendarConfig.startDate]).setHours(0, 0, 0));
    this.calendarEndDate = new Date(new Date(this.calendarInfo[this.calendarConfig.endDate]).setHours(0, 0, 0));
  
    if (isNaN(this.calendarStartDate.getTime()) || isNaN(this.calendarEndDate.getTime())) {    
      //console.error('this.calendarStartDate', this.calendarStartDate, 'this.calendarEndDate', this.calendarEndDate, 'this.calendarInfo', this.calendarInfo, 'this.calendarConfig.startDate', this.calendarConfig.startDate, 'this.calendarConfig.endDate', this.calendarConfig.endDate);  
      this.calendarStartDate = new Date(new Date().getFullYear(), 0, 1);
      this.calendarEndDate = new Date(new Date().getFullYear(), 11, 31);
    }
  
    this.currentDisplayedYear = this.calendarInfo[this.calendarConfig.startDate]
      ? new Date(this.calendarInfo[this.calendarConfig.startDate]).getFullYear()
      : new Date().getFullYear();
    this.currentDisplayedMonth = this.calendarInfo[this.calendarConfig.startDate]
      ? new Date(this.calendarInfo[this.calendarConfig.startDate]).getMonth()
      : new Date().getMonth();
    this.currentYear = this.calendarInfo[this.calendarConfig.startDate]
      ? new Date(this.calendarInfo[this.calendarConfig.startDate]).getFullYear()
      : new Date().getFullYear();      
    
    let logInfo = {
      'firstDateOfWeek': this.firstDateOfWeek,
      'currentDate': this.currentDate, 
      'currentDisplayedYear': this.currentDisplayedYear,
      'currentDisplayedMonth': this.currentDisplayedMonth,
      'calendarStartDate': this.calendarStartDate, 
      'calendarEndDate': this.calendarEndDate,
      'calendarConfig': this.calendarConfig,
      'eventsConfig': this.eventsConfig
    };
    console.log('calendar config and main data info', logInfo);
  
    this.setDayBasedOnStartWeek = (this.firstDayOfWeek.toLowerCase() || 'SUNDAY') === 'monday' ? 1 : 2;
    this.dayNames = getDayNames(this.firstDayOfWeek || 'SUNDAY');
    this.calendar = this.shadowRoot.getElementById('calendar');
    this.allEvents = this.shadowRoot.getElementById('allEvents');
    this.conflictEvents = this.shadowRoot.getElementById('conflictEvents');
    this.selectedDateView = this.shadowRoot.getElementById('selectedDateView');
    this.dayGridView = this.shadowRoot.getElementById('dayGridView');
    this.weekGridView = this.shadowRoot.getElementById('weekGridView');
    this.previousButton = this.shadowRoot.getElementById('previous');
    this.nextButton = this.shadowRoot.getElementById('next');
    this.currentButton = this.shadowRoot.getElementById('current');
    this.previousButton.addEventListener('click', this.handlePrevious);
    this.nextButton.addEventListener('click', this.handleNext);
    this.showCurrentMonthButton = this.shadowRoot.getElementById('showCurrentMonth');
    this.showAllMonthsButton = this.shadowRoot.getElementById('showAllMonths');
    this.showDayViewButton = this.shadowRoot.getElementById('showDayView');
    this.showWeekViewButton = this.shadowRoot.getElementById('showWeekView');
    this.weekHourGrid = this.shadowRoot.getElementById('weekHourGrid');
    this.showAllEvents = this.shadowRoot.getElementById('showAllEvents');
    this.selectedWeekTitle = this.shadowRoot.getElementById('selectedWeekTitle');
    this.selectedDateTitleGrid = this.shadowRoot.getElementById('selectedDateTitleGrid');
    this.addEvent = this.shadowRoot.getElementById('addEvent');
    this.hourGrid = this.shadowRoot.getElementById('hourGrid');
    this.eventName = this.shadowRoot.getElementById('eventName');
    this.eventStartTime = this.shadowRoot.getElementById('eventStartTime');
    this.eventEndTime = this.shadowRoot.getElementById('eventEndTime');
    this.selectedDateTitle = this.shadowRoot.getElementById('selectedDateTitle');
    this.eventPopup = this.shadowRoot.getElementById('eventPopup');
    this.days = this.shadowRoot.querySelectorAll('.day');
    this.hours = this.shadowRoot.querySelectorAll('.hour');
    this.sidebarButtons = this.shadowRoot.querySelectorAll('.tab-item');
    
    this.currentButton.addEventListener('click', this.handleCurrent);
    if (this.showAllEvents!==null){
      this.showAllEvents.addEventListener('click', () => {
        this.showAllEventsView()
      });
    }
    this.sidebarButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.sidebarButtons.forEach((btn) => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
      });
    });
  
    this.addEvent.addEventListener('click', this.addEventFunction);
  
    this.hours.forEach((hour) => {
      hour.addEventListener('drop', this.handleHourDrop);
      hour.addEventListener('dragover', (event) => {
        event.preventDefault();
      });
    });
    if (this.showMonthViewTab&&this.showCurrentMonthButton!==null){
    this.showCurrentMonthButton.addEventListener('click', () => {
      console.log('click Month', this.currentDisplayedMonth);
      this.conflictEvents.style.display = 'none';      
      this.shadowRoot.getElementById('calendar').innerHTML = '';
      const currentMonth = this.calendarStartDate ? new Date(this.calendarStartDate).getMonth() : new Date().getMonth();
      const currentYear = this.calendarStartDate ? new Date(this.calendarStartDate).getFullYear() : new Date().getFullYear();
      const $monthNode = this.buildMonth(currentMonth, currentYear, this.eventsInfo, this.holidays_calendar, this.calendarStartDate, this.calendarEndDate);
      this.shadowRoot.getElementById('calendar').appendChild($monthNode);
      $monthNode.classList.add('full-month');
      this.showCalendarView();
      this.currentButton.innerText = 'Month';
    });
    }
    if (this.showYearViewTab&&this.showAllMonthsButton!==null){    
      this.showAllMonthsButton.addEventListener('click', () => {
        this.conflictEvents.style.display = 'none';      
        this.shadowRoot.getElementById('calendar').innerHTML = '';
        const currentYear = this.calendarStartDate ? new Date(this.calendarStartDate).getFullYear() : new Date().getFullYear();
        this.buildYearCalendar(this.calendar, currentYear, this.eventsInfo, this.holidays_calendar, this.calendarStartDate, this.calendarEndDate);
        this.showCalendarView();
        this.currentButton.innerText = 'Year';
      });
    }
    if (this.showDayViewTab&&this.showDayViewButton!==null){
      this.showDayViewButton.addEventListener('click', () => {
        let selectedDate;
        if (new Date() >= new Date(this.calendarStartDate) && new Date() <= new Date(this.calendarEndDate)) {
          selectedDate = new Date();
        } else {
          selectedDate = new Date(this.calendarStartDate);
        }
    
        this.showDayGridView(selectedDate);
        this.currentButton.innerText = 'Day';
      });
    }
    this.shadowRoot.getElementById('showConflicts').addEventListener('click', () => {
      this.allEvents.innerHTML = '';
      this.allEvents.style.display = 'none';
      this.conflictEvents.innerHTML = '';
      this.conflictEvents.style.display = 'block';
      this.calendar.style.display = 'none';
      
      const conflictContainer = document.createElement('div');
      conflictContainer.classList.add('event-list-container');
      const conflictEvents = this.eventsInfo.filter(event => event.conflict);
  
      conflictEvents.forEach((event) => {
        let listItem = document.createElement('li');
        listItem.classList.add('event-item');
  
        const dateField = this.eventsConfig?.datesDateField || 'date';
        let eventDate = document.createElement('p');
        eventDate.textContent = `Date: ${event[dateField]}`;
        listItem.appendChild(eventDate);
  
        let eventDescription = createEventDescription(event, this.eventsConfig.eventListsFields, this.lang);
        listItem.appendChild(eventDescription);
  
        let conflictDetail = document.createElement('p');
        conflictDetail.textContent = `Conflict Detail: ${event.conflict_detail}`;
        conflictDetail.classList.add('conflict-detail');
        listItem.appendChild(conflictDetail);
  
        conflictContainer.appendChild(listItem);
      });
  
      this.conflictEvents.appendChild(conflictContainer);
    });
  
    this.monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    if (this.calendarConfig.defaultTab === 'month') {
      this.currentButton.innerText = 'Month';
      this.shadowRoot.getElementById('calendar').innerHTML = '';
      const currentMonth = this.calendarStartDate ? new Date(this.calendarStartDate).getMonth() : new Date().getMonth();
      const currentYear = this.calendarStartDate ? new Date(this.calendarStartDate).getFullYear() : new Date().getFullYear();
      const $monthNode = this.buildMonth(currentMonth, currentYear, this.eventsInfo, this.holidays_calendar, this.calendarStartDate, this.calendarEndDate);
      this.shadowRoot.getElementById('calendar').appendChild($monthNode);
      $monthNode.classList.add('full-month');
      if (this.showWeekView) {
        this.showWeekViewButton.addEventListener('click', () => {
          console.log('click Week');
          this.showWeekGridView();
          this.addDoubleClickEventToWeekHours();
          this.currentButton.innerText = 'Week';
        });
      }
      this.showCalendarView();
    } else if (this.calendarConfig.defaultTab === 'day') {
      let selectedDate;
      if (new Date() >= new Date(this.calendarStartDate) && new Date() <= new Date(this.calendarEndDate)) {
        selectedDate = new Date();
      } else {
        selectedDate = new Date(this.calendarStartDate);
      }
  
      this.showDayGridView(selectedDate);
      this.currentButton.innerText = 'Day';
    } else if (this.calendarConfig.defaultTab === 'week') {
      this.showWeekGridView();
      this.addDoubleClickEventToWeekHours();
      this.currentButton.innerText = 'Week';
    } else {
      this.buildYearCalendar(this.calendar, this.currentYear, this.eventsInfo, this.holidays_calendar, this.calendarStartDate, this.calendarEndDate);
    }

    this.setDefaultView()    
  }
  

  refreshViewV1(){
    console.log('refreshView')
    this.initializeCalendarConfigVariablesWhenMissingProperties()
    //this.dataAllInOneData=this.data


    this.holidays_calendar = []
    if (this.calendarInfo!==undefined&&this.calendarInfo.holidays_calendar!==undefined){
      this.holidays_calendar = this.calendarInfo.holidays_calendar;
    }
    this.firstDayOfWeek = "MONDAY"
    if (this.calendarInfo!==undefined&&this.calendarInfo[this.calendarConfig.firstDayOfWeek]!==undefined){
      this.firstDayOfWeek = this.calendarInfo[this.calendarConfig.firstDayOfWeek];
    }
    this.schedule_size_unit = "MONTHS"
    if (this.calendarInfo!==undefined&&this.calendarInfo[this.calendarConfig.scheduleSizeUnit]!==undefined){
      this.schedule_size_unit = this.calendarInfo[this.calendarConfig.scheduleSizeUnit]
    }
    if (this.calendarInfo.viewCurrentDate===undefined){
      this.calendarInfo.viewCurrentDate="today"
    }
    if (this.calendarInfo.viewCurrentDate.toLowerCase()=="today"){
      this.currentDate = new Date()
    }else{
      this.currentDate = this.calendarInfo[this.calendarConfig.startDate]
        ? new Date(this.calendarInfo[this.calendarConfig.startDate])
        : new Date();        
    }      
    this.firstDateOfWeek = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate() - (this.firstDayOfWeek === "MONDAY" ? (this.currentDate.getDay() === 0 ? 6 : this.currentDate.getDay() - 1) : this.currentDate.getDay())
    );    
    
    
    if (this.calendarInfo===undefined||this.calendarConfig===undefined||this.calendarInfo[this.calendarConfig.startDate]===undefined){
      this.calendarInfo[this.calendarConfig.startDate]=this.currentDate
    }
    console.log('date for calendarStartDate', this.calendarInfo[this.calendarConfig.startDate])
    this.calendarStartDate = new Date(
      new Date(this.calendarInfo[this.calendarConfig.startDate]).setHours(0, 0, 0)
    );
    this.calendarEndDate = new Date(
      new Date(this.calendarInfo[this.calendarConfig.endDate]).setHours(0, 0, 0)
    );

    if ( isNaN(this.calendarStartDate.getTime())|| isNaN(this.calendarEndDate.getTime())){    
      //alert("Start or end date are wrong, please review the console.log")
      console.error('this.calendarStartDate', this.calendarStartDate, 'this.calendarEndDate', this.calendarEndDate, 'this.calendarInfo', this.calendarInfo, 'this.calendarConfig.startDate', this.calendarConfig.startDate, 'this.calendarConfig.endDate', this.calendarConfig.endDate)  
      this.calendarStartDate=new Date(new Date().getFullYear(), 0, 1);
      this.calendarEndDate=new Date(new Date().getFullYear(), 11, 31);
    }
    this.currentDisplayedYear = this.calendarInfo[this.calendarConfig.startDate]
      ? new Date(this.calendarInfo[this.calendarConfig.startDate]).getFullYear()
      : new Date().getFullYear();
    this.currentDisplayedMonth = this.calendarInfo[this.calendarConfig.startDate]
      ? new Date(this.calendarInfo[this.calendarConfig.startDate]).getMonth()
      : new Date().getMonth();
    this.currentYear = this.calendarInfo[this.calendarConfig.startDate]
      ? new Date(this.calendarInfo[this.calendarConfig.startDate]).getFullYear()
      : new Date().getFullYear();      
    
    let logInfo={
      'firstDateOfWeek':this.firstDateOfWeek,
      'currentDate': this.currentDate, 
      'currentDisplayedYear': this.currentDisplayedYear,
      'currentDisplayedMonth': this.currentDisplayedMonth,
      'calendarStartDate': this.calendarStartDate, 
      'calendarEndDate': this.calendarEndDate,
      'calendarConfig': this.calendarConfig,
      'eventsConfig': this.eventsConfig
    }
    console.log('calendar config and main data info', logInfo)
    this.setDayBasedOnStartWeek =
      (this.firstDayOfWeek.toLowerCase() || 'SUNDAY') === 'monday' ? 1 : 2;
    this.dayNames = getDayNames(this.firstDayOfWeek || 'SUNDAY');
    this.calendar = this.shadowRoot.getElementById('calendar');
    this.allEvents = this.shadowRoot.getElementById('allEvents');
    this.conflictEvents = this.shadowRoot.getElementById('conflictEvents');
    this.selectedDateView = this.shadowRoot.getElementById('selectedDateView');
    this.dayGridView = this.shadowRoot.getElementById('dayGridView');
    this.weekGridView = this.shadowRoot.getElementById('weekGridView');
    this.previousButton = this.shadowRoot.getElementById('previous');
    this.nextButton = this.shadowRoot.getElementById('next');
    this.currentButton = this.shadowRoot.getElementById('current');
    this.previousButton.addEventListener('click', this.handlePrevious);
    this.nextButton.addEventListener('click', this.handleNext);
    this.showCurrentMonthButton =
      this.shadowRoot.getElementById('showCurrentMonth');
    this.showAllMonthsButton = this.shadowRoot.getElementById('showAllMonths');
    this.showDayViewButton = this.shadowRoot.getElementById('showDayView');
    this.showWeekViewButton = this.shadowRoot.getElementById('showWeekView');
    this.weekHourGrid = this.shadowRoot.getElementById('weekHourGrid');
    this.showAllEvents = this.shadowRoot.getElementById('showAllEvents');
    this.selectedWeekTitle =
      this.shadowRoot.getElementById('selectedWeekTitle');
    this.selectedDateTitleGrid = this.shadowRoot.getElementById(
      'selectedDateTitleGrid'
    );
    this.addEvent = this.shadowRoot.getElementById('addEvent');
    this.hourGrid = this.shadowRoot.getElementById('hourGrid');
    this.eventName = this.shadowRoot.getElementById('eventName');
    this.eventStartTime = this.shadowRoot.getElementById('eventStartTime');
    this.eventEndTime = this.shadowRoot.getElementById('eventEndTime');
    this.selectedDateTitle =
      this.shadowRoot.getElementById('selectedDateTitle');
    this.eventPopup = this.shadowRoot.getElementById('eventPopup');
    this.days = this.shadowRoot.querySelectorAll('.day');
    this.hours = this.shadowRoot.querySelectorAll('.hour');
    this.sidebarButtons = this.shadowRoot.querySelectorAll('.tab-item');
    this.currentButton.addEventListener('click', this.handleCurrent);
    if (this.showEventsViewTab) {
      this.showAllEvents.addEventListener('click', () => {
        this.allEvents.innerHTML = ''
        this.allEvents.style.display = 'block';
        this.calendar.style.display = 'none';
        this.selectedDateView.style.display = 'none';
        this.dayGridView.style.display = 'none';
        this.weekGridView.style.display = 'none';
        this.conflictEvents.style.display = 'none';      

        const allEventsContainer = document.createElement('div');
        allEventsContainer.classList.add('event-list-container'); // Add a class for container styling
        //console.log('this.eventsInfo', this.eventsInfo)
        if (this.eventsConfig===undefined){
          //alert('eventsInfo is undefined')
        }
        if (this.eventsInfo!==undefined){
          this.eventsInfo.forEach((event, index) => {
            let listItem = document.createElement('li');
            listItem.classList.add('event-item');

            let eventDate = document.createElement('p');
            if(this.eventsConfig.datesDateField!==undefined){
              eventDate.textContent = `Date: ${event[this.eventsConfig.datesDateField]}}`;
            }else{
              eventDate.textContent = `Date: ${event.date}}`;
            }
            listItem.appendChild(eventDate);

            let eventDescription = createEventDescription(event, this.eventsConfig.eventListsFields, this.lang);
  /*          let eventDescription = document.createElement('p');
            eventDescription.textContent = `${event.description_en}`;
            eventDescription.classList.add('event-description');*/
            listItem.appendChild(eventDescription);

            if (event.is_holidays) {
              let holidayLabel = document.createElement('span');
              holidayLabel.textContent = 'Holiday';
              holidayLabel.classList.add('event-label');
              listItem.appendChild(holidayLabel);
            }

            if (event.conflict) {
              let conflictDetail = document.createElement('p');
              conflictDetail.textContent = `Conflict Detail: ${event.conflict_detail}`;
              conflictDetail.classList.add('conflict-detail');
              listItem.appendChild(conflictDetail);
            }        
            allEventsContainer.appendChild(listItem);
          });
        }
        this.allEvents.appendChild(allEventsContainer);
      });
    }
    this.sidebarButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.sidebarButtons.forEach((btn) => {
          btn.classList.remove('active');
        });
        button.classList.add('active');
      });
    });
    this.addEvent.addEventListener('click', this.addEventFunction);
    this.hours.forEach((hour) => {
      hour.addEventListener('drop', this.handleHourDrop);
      hour.addEventListener('dragover', function (event) {
        event.preventDefault();
      });
    });
    if (this.showMonthViewTab) {
      this.showCurrentMonthButton.addEventListener('click', () => {
        console.log('click Month', this.currentDisplayedMonth);
        this.shadowRoot.getElementById('calendar').innerHTML = '';
        console.log('refreshView', 'this.calendarStartDate', this.calendarStartDate, 'this.calendarEndDate', this.calendarEndDate);
        const currentMonth = this.calendarStartDate
          ? new Date(this.calendarStartDate).getMonth()
          : new Date().getMonth();
        const currentYear = this.calendarStartDate
          ? new Date(this.calendarStartDate).getFullYear()
          : new Date().getFullYear();
        const $monthNode = this.buildMonth(
          currentMonth,
          currentYear,
          this.eventsInfo,
          this.holidays_calendar,
          this.calendarStartDate,
          this.calendarEndDate
        );
        this.shadowRoot.getElementById('calendar').appendChild($monthNode);
        $monthNode.classList.add('full-month');
        this.showCalendarView();
        this.currentButton.innerText = 'Month';
      });
    }
    if (this.showYearViewTab) {    
      this.showAllMonthsButton.addEventListener('click', () => {
        this.shadowRoot.getElementById('calendar').innerHTML = '';
        const currentYear = this.calendarStartDate
          ? new Date(this.calendarStartDate).getFullYear()
          : new Date().getFullYear();
        this.buildYearCalendar(
          this.calendar,
          currentYear,
          this.eventsInfo,
          this.holidays_calendar,
          this.calendarStartDate,
          this.calendarEndDate
        );
        this.showCalendarView();
        this.currentButton.innerText = 'Year';
      });
    }
    if (this.showDayViewTab) {
      this.showDayViewButton.addEventListener('click', () => {
        let selectedDate;
        if (
          new Date() >= new Date(this.calendarStartDate) &&
          new Date() <= new Date(this.calendarEndDate)
        ) {
          //console.log('in');
          selectedDate = new Date();
        } else {
          //console.log('else');
          selectedDate = new Date(this.calendarStartDate);
        }

        this.showDayGridView(selectedDate);
        this.currentButton.innerText = 'Day';
      });
    }
    this.shadowRoot.getElementById('showConflicts').addEventListener('click', () => {
      this.allEvents.innerHTML = '';
      this.allEvents.style.display = 'none';
      this.conflictEvents.innerHTML = '';
      this.conflictEvents.style.display = 'block';
      this.calendar.style.display = 'none';
    
      const conflictContainer = document.createElement('div');
      conflictContainer.classList.add('event-list-container');
      const conflictEvents = this.eventsInfo.filter(event => event.conflict);
    
      conflictEvents.forEach((event) => {
        let listItem = document.createElement('li');
        listItem.classList.add('event-item');
        let eventDate = document.createElement('p');
        eventDate.textContent = `Date: ${event[this.eventsConfig.datesDateField]}`;
        listItem.appendChild(eventDate);
    
        let eventDescription = createEventDescription(event, this.eventsConfig.eventListsFields, this.lang);
        listItem.appendChild(eventDescription);
    
        let conflictDetail = document.createElement('p');
        conflictDetail.textContent = `Conflict Detail: ${event.conflict_detail}`;
        listItem.appendChild(conflictDetail);
        conflictContainer.appendChild(listItem);
      });
    
      this.conflictEvents.appendChild(conflictContainer);
    });

    
    this.monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    if (this.schedule_size_unit === 'MONTHS') {
      this.currentButton.innerText = 'Month';
      console.log('click Month', this.currentDisplayedMonth);
      this.shadowRoot.getElementById('calendar').innerHTML = '';
      console.log(this.calendarStartDate);
      const currentMonth = this.calendarStartDate
        ? new Date(this.calendarStartDate).getMonth()
        : new Date().getMonth();
      const currentYear = this.calendarStartDate
        ? new Date(this.calendarStartDate).getFullYear()
        : new Date().getFullYear();
      const $monthNode = this.buildMonth(
        currentMonth,
        currentYear,
        this.eventsInfo,
        this.holidays_calendar,
        this.calendarStartDate,
        this.calendarEndDate
      );
      this.shadowRoot.getElementById('calendar').appendChild($monthNode);
      $monthNode.classList.add('full-month');
      if (this.showWeekView){
        this.showWeekViewButton.addEventListener('click', () => {
          console.log('click Week');
          this.showWeekGridView();
          this.addDoubleClickEventToWeekHours();
          this.currentButton.innerText = 'Week';
        });      
      }
      this.showCalendarView();      
    } else if (this.schedule_size_unit === 'DAYS') {
      let selectedDate;
      if (
        new Date() >= new Date(this.calendarStartDate) &&
        new Date() <= new Date(this.calendarEndDate)
      ) {
        console.log('in');
        selectedDate = new Date();
      } else {
        console.log('else');
        selectedDate = new Date(this.calendarStartDate);
      }

      this.showDayGridView(selectedDate);
      this.currentButton.innerText = 'Day';
    } else if (this.schedule_size_unit === 'WEEKS') {
      this.showWeekGridView();
      this.addDoubleClickEventToWeekHours();
      this.currentButton.innerText = 'Week';
    } else {
      this.buildYearCalendar(
        this.calendar,
        this.currentYear,
        this.eventsInfo,
        this.holidays_calendar,
        this.calendarStartDate,
        this.calendarEndDate
      );
    }    
  }
  handleCurrent = () => {
    console.log('handleCurrent', 'this.calendarStartDate', this.calendarStartDate);
    console.log('handleCurrent', 'this.calendarEndDate', this.calendarEndDate);
    const innerText = this.currentButton.innerText;
    if (innerText === 'Year') {
      const currentYear = new Date(this.calendarStartDate).getFullYear();
      const yearDifference = currentYear - this.currentDisplayedYear;
      this.changeYear(yearDifference);
    }
    if (innerText === 'Month') {
      const currentMonth = new Date(this.calendarStartDate).getMonth();
      const currentYear = new Date(this.calendarStartDate).getFullYear();
      this.calendar.innerHTML = '';
      var $monthNode = this.buildMonth(
        currentMonth,
        currentYear,
        this.eventsInfo,
        this.holidays_calendar,
        this.calendarStartDate,
        this.calendarEndDate
      );
      this.calendar.appendChild($monthNode);
      $monthNode.classList.add('full-month');
      this.showCalendarView();
    }
    if (innerText === 'Week') {
      this.firstDateOfWeek = new Date(
        new Date(this.calendarStartDate).getFullYear(),
        new Date(this.calendarStartDate).getMonth(),
        new Date(this.calendarStartDate).getDate() - new Date(this.calendarStartDate).getDay()
      );
      this.showWeekGridView();
    }
    if (innerText === 'Day') {
      this.showDayGridView(new Date(this.calendarStartDate));
    }
  };
  handlePrevious = () => {
    console.log(this.currentDisplayedYear);

    console.log(new Date(this.calendarStartDate).getFullYear());
    console.log(new Date(this.calendarStartDate).getFullYear());    
    let calendarValue = window
      .getComputedStyle(this.calendar)
      .getPropertyValue('display');
    let dateValue = window
      .getComputedStyle(this.dayGridView)
      .getPropertyValue('display');
    let weekValue = window
      .getComputedStyle(this.weekGridView)
      .getPropertyValue('display');
    if (calendarValue === 'block') {
      if (this.shadowRoot.querySelector('.full-month')) {
        const currentMonthDate = new Date(this.currentYear, this.currentDisplayedMonth);
        currentMonthDate.setMonth(currentMonthDate.getMonth() - 1);
        if (
          currentMonthDate >= this.calendarStartDate &&
          currentMonthDate <= this.calendarEndDate
        ) {
          this.changeMonth(-1);
        }
      }
      else {
        if (
          this.currentDisplayedYear - 1 >=
          new Date(this.calendarStartDate).getFullYear() &&
          this.currentDisplayedYear - 1 <= new Date(this.calendarEndDate).getFullYear()
        ) {
          this.changeYear(-1);
        }
      }
    }
    if (dateValue === 'block') {
      var selectedDate = new Date(this.selectedDateTitleGrid.innerText);
      let DayDate = new Date(this.selectedDateTitleGrid.innerText)
      DayDate.setDate(selectedDate.getDate() - 1)
      if (
        DayDate >= this.calendarStartDate &&
        DayDate <= this.calendarEndDate
      ) {
        selectedDate.setDate(selectedDate.getDate() - 1);
        this.showDayGridView(selectedDate);
      }
    }
    if (weekValue === 'block') {
      var currentDate = new Date(this.firstDateOfWeek);
      let weekDate = new Date(this.firstDateOfWeek);
      weekDate.setDate(weekDate.getDate() - 1);
      if (
        weekDate >= this.calendarStartDate &&
        weekDate <= this.calendarEndDate
      ) {
        currentDate.setDate(this.firstDateOfWeek.getDate() - 7);
        this.firstDateOfWeek = currentDate;
        this.showWeekGridView();
      }
    }
  };
  handleNext = () => {   
    let calendarValue = window
      .getComputedStyle(this.calendar)
      .getPropertyValue('display');
    let dateValue = window
      .getComputedStyle(this.dayGridView)
      .getPropertyValue('display');
    let weekValue = window
      .getComputedStyle(this.weekGridView)
      .getPropertyValue('display');
    if (calendarValue === 'block') {
      if (this.shadowRoot.querySelector('.full-month')) {
        const currentMonthDate = new Date(this.currentYear, this.currentDisplayedMonth);
        currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
        if (
          currentMonthDate >= this.calendarStartDate &&
          currentMonthDate <= this.calendarEndDate
        ) {
          this.changeMonth(1);
        }
      }
      else {
        if (
          this.currentDisplayedYear + 1 >=
          new Date(this.calendarStartDate).getFullYear() &&
          this.currentDisplayedYear + 1 <= new Date(this.calendarEndDate).getFullYear()
        ) {
          this.changeYear(1);
        }
      }
    }
    if (dateValue === 'block') {
      var selectedDate = new Date(this.selectedDateTitleGrid.innerText);
      let DayDate = new Date(this.selectedDateTitleGrid.innerText)
      DayDate.setDate(selectedDate.getDate() + 1)
      if (
        selectedDate >= this.calendarStartDate &&
        selectedDate <= this.calendarEndDate
      ) {
        selectedDate.setDate(selectedDate.getDate() + 1);
        this.showDayGridView(selectedDate);
      }
    }
    if (weekValue === 'block') {
      var currentDate = new Date(this.firstDateOfWeek);
      let weekDate = new Date(this.firstDateOfWeek);
      weekDate.setDate(weekDate.getDate() + 7);
      if (
        weekDate >= this.calendarStartDate &&
        weekDate <= this.calendarEndDate
      ) {
        currentDate.setDate(this.firstDateOfWeek.getDate() + 7);
        this.firstDateOfWeek = currentDate;
        this.showWeekGridView();
      }
    }
  };
  changeMonth(monthChange) {
    this.currentDisplayedMonth += monthChange;

    if (this.currentDisplayedMonth === 12) {
      this.currentDisplayedMonth = 0;
      this.currentYear++;
    } else if (this.currentDisplayedMonth === -1) {
      this.currentDisplayedMonth = 11;
      this.currentYear--;
    }
    this.calendar.innerHTML = '';
    var $monthNode = this.buildMonth(
      this.currentDisplayedMonth,
      this.currentYear,
      this.eventsInfo,
      this.holidays_calendar,
      this.calendarStartDate,
      this.calendarEndDate
    );
    this.calendar.appendChild($monthNode);
    $monthNode.classList.add('full-month');
    this.showCalendarView();
  }

  handleDayHoverGPT = (event) => {
    var hoveredDate = event.currentTarget.getAttribute('data-date');
    var eventsForHoveredDate = this.eventsInfo.filter(function (event) {
        return (
            new Date(event.date).toDateString() === new Date(hoveredDate).toDateString()
        );
    });

    var existingDropdown = document.querySelector('.event-dropdown');
    if (existingDropdown) {
        existingDropdown.parentNode.removeChild(existingDropdown);
    }

    if (eventsForHoveredDate.length > 0) {
        var dropdown = document.createElement('div');
        dropdown.classList.add('event-dropdown');

        // Aquí se ajusta la posición del hover
        var rect = event.currentTarget.getBoundingClientRect();
        dropdown.style.position = 'absolute';
        dropdown.style.top = rect.top + window.scrollY + 'px';
        
        // Verificar si hay espacio suficiente hacia la derecha, si no, mover a la izquierda
        if (rect.left + dropdown.offsetWidth > window.innerWidth) {
            dropdown.style.left = rect.left - dropdown.offsetWidth + 'px';  // Mueve el dropdown a la izquierda si no cabe
        } else {
            dropdown.style.left = rect.left + 'px';  // Posición normal a la derecha
        }

        document.body.appendChild(dropdown);
    }
};

  handleDayHover = (event) => {
    var hoveredDate = event.currentTarget.getAttribute('data-date');
    var eventsForDate = []  
    if (this.eventsInfo!==undefined){    
      let dateFieldName=this.eventsConfig.datesDateField
      var eventsForHoveredDate = this.eventsInfo.filter(function (event) {
        return (
          new Date(event[dateFieldName]).toDateString() ===
          new Date(hoveredDate).toDateString()
        );
      });
    }
    var existingDropdown = document.querySelector('.event-dropdown');
    if (existingDropdown) {
      existingDropdown.parentNode.removeChild(existingDropdown);
    }

    if (eventsForHoveredDate!==undefined&&eventsForHoveredDate.length > 0) {
      var dropdown = document.createElement('div');
      dropdown.classList.add('event-dropdown');

      var header = document.createElement('div');
      header.classList.add('dropdown-header');
      header.textContent = 'Events for ' + hoveredDate;
      dropdown.appendChild(header);

      var eventList = document.createElement('ul');
      eventList.classList.add('event-list');

      eventsForHoveredDate.forEach((event) => {
        let ListContent = document.createElement('div');
        var listItem = document.createElement('div');
        listItem.style.display = 'flex';
        listItem.style.padding = '5px 0px';
        listItem.style.justifyContent = 'space-between';
        listItem.style.alignItems = 'center';
        let eventTitle = document.createElement('p');
        eventTitle.style.margin = '0';

        if (this.eventsConfig.hoverDateDialog.entryTitleFld!==undefined){
          eventTitle.textContent=event[this.eventsConfig.hoverDateDialog.entryTitleFld];
        }else{
          eventTitle.textContent=""
        }
        let eventDescription = createEventDescription(event, this.eventsConfig.hoverDateDialog.eventListsFields, this.lang);

        //listItem.appendChild(eventTitle);

        let eventDetails = document.createElement('div');
        eventDetails.appendChild(eventTitle);
        eventDetails.appendChild(eventDescription);
      
        listItem.appendChild(eventDetails);

        var crossIcon = document.createElement('span');
        crossIcon.textContent = '❌';
        crossIcon.style.cursor = 'pointer';
        crossIcon.style.marginLeft = '5px';
        crossIcon.style.color = '#ccc';
        crossIcon.style.fontSize = '12px';
        crossIcon.addEventListener('click', (e) => {
          e.preventDefault();
          const selector = `[data-date="${hoveredDate}"]`;
          const $dateNode = this.shadowRoot.querySelector(selector);
          if ($dateNode) {
            console.log(this.eventsInfo);
            let dateFieldName=this.eventsConfig.datesDateField
            let matchedEvents = this.eventsInfo.filter(
              (e) => e.date === event[dateFieldName]
            );
            if (matchedEvents.length === 1) {
              if ($dateNode.classList.contains('holidayEvent')) {
                $dateNode.classList.remove('holidayWithActiveEvent');
                $dateNode.classList.remove('activeEvent');
              } else {
                $dateNode.classList.remove('activeEvent');
              }
            }
          }
          eventList.removeChild(ListContent);

          var indexToRemove = this.eventsInfo.findIndex(function (evt) {
            return evt === event;
          });

          if (indexToRemove !== -1) {
            this.eventsInfo.splice(indexToRemove, 1);
          }
        });
        listItem.appendChild(crossIcon);
        ListContent.appendChild(listItem);

        if (event.conflict) {
          let conflictContainer = document.createElement('div');
          ListContent.style.backgroundColor = '#ffe6e6';
          ListContent.style.padding = '5px';
          // ListContent.style.marginTop = '5px';
          ListContent.style.borderRadius = '3px';
          let conflictDetail = document.createElement('p');
          conflictDetail.style.margin = '0';
          conflictDetail.innerText = event.conflict_detail;
          conflictDetail.style.color = 'red';
          conflictDetail.style.fontWeight = 'bold';
          conflictContainer.appendChild(conflictDetail);
          ListContent.appendChild(conflictContainer);
        }

        ListContent.addEventListener('mouseenter', function () {
          if (!event.conflict) {
            listItem.style.backgroundColor = '#f0f0f0';
          }
        });
        ListContent.addEventListener('mouseleave', function () {
          listItem.style.backgroundColor = 'transparent';
        });
        eventList.appendChild(ListContent);
      });


      dropdown.appendChild(eventList);
      var rect = event.currentTarget.getBoundingClientRect();
      dropdown.style.top = rect.top + rect.height + 'px';
      dropdown.style.left = rect.left + 'px';
      dropdown.style.position = 'absolute';
      dropdown.style.backgroundColor = '#fff';
      dropdown.style.border = '1px solid #ccc';
      dropdown.style.borderRadius = '5px';
      dropdown.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
      dropdown.style.padding = '5px';
      dropdown.style.zIndex = '9999';
      dropdown.style.maxWidth = this.eventsConfig.hoverDateDialog.dialogWidth || '400px';
      dropdown.style.maxHeight = this.eventsConfig.hoverDateDialog.dialogHeight || '400px';
      dropdown.style.overflowY = 'auto';

      header.style.fontWeight = 'bold';
      header.style.paddingBottom = '5px';
      header.style.borderBottom = '1px solid #ccc';
      header.style.marginBottom = '5px';

      // Añadir estas propiedades para dividir el título en dos líneas si es necesario
      header.style.wordBreak = 'break-word';
      header.style.whiteSpace = 'normal';
      //header.style.wordWrap = 'break-word';
      header.style.width = '100%'; // Asegurarse de que el título ocupe el ancho completo del contenedor

      eventList.style.listStyle = 'none';
      eventList.style.padding = '0 5px';
      eventList.style.margin = '0';

      eventList.querySelectorAll('li').forEach(function (li) {
        li.style.padding = '5px 0';
        li.style.cursor = 'pointer';
      });

      eventList.querySelectorAll('li:hover').forEach(function (li) {
        li.style.backgroundColor = '#f0f0f0';
      });

      document.body.appendChild(dropdown);
      dropdown.addEventListener('mouseleave', function () {
        dropdown.parentNode.removeChild(dropdown);
      });
    }
  };
  closePopup = () => {
    this.eventPopup.style.display = 'none';
  };
  addDoubleClickEventToWeekHours = () => {
    var hourNodes = document.querySelectorAll('.week-hour');
    hourNodes.forEach((hourNode) => {
      hourNode.addEventListener('dblclick', this.handleWeekHourDoubleClick);
    });
  };
  handleWeekHourDoubleClick = (event) => {
    var startTime = event.target.innerText.split(' ')[0];
    // var endTime = event.target.innerText.split(" ")[2];
    var currentDate = this.selectedWeekTitle.innerText;

    var currentDateString = currentDate ? currentDate.trim() : '';

    var selectedDate = new Date(currentDateString + ' ' + startTime);

    var rect = event.target.getBoundingClientRect();
    var popup = this.eventPopup;
    popup.style.display = 'block';
    popup.style.top = rect.top + 'px';
    popup.style.left = rect.right + 'px';

    this.selectedDateTitle.innerText = selectedDate;

    var defaultEndTime = formatTime(
      selectedDate.getHours() + 1,
      selectedDate.getMinutes()
    );

    this.eventStartTime.value = startTime;
    this.eventEndTime.value = defaultEndTime;
  };
  addEventFunction = (e) => {
    e.preventDefault();
    var eventName = this.eventName.value;
    var eventStartTime = this.eventStartTime.value;
    var eventEndTime = this.eventEndTime.value;
    var selectedDate = this.selectedDateTitle.innerText;
    var newEvent = {
      id: this.eventsInfo.length + 1,
      date: formatDateString(selectedDate),
      description_en: eventName,
      description_es: '',
      is_holidays: false,
      conflict: false,
      conflict_detail: '',
      location: '',
      start_time: eventStartTime,
      end_time: eventEndTime,
    };
    this.eventsInfo.push(newEvent);
    this.closeModal();
    localStorage.setItem('events', JSON.stringify(events));
    this.updateCalendar(new Date(selectedDate));
    this.eventName.value = '';
    this.eventStartTime.value = '';
    this.eventEndTime.value = '';
    // this.eventPopup.style.display = "none";
  };
  handleHourDrop = (event) => {
    event.preventDefault();
    var draggedHour = event.dataTransfer.getData('text/plain');
    var newHour = event.target.innerText;
    console.log('Change event time from', draggedHour, 'to', newHour);
  };
  updateCalendar = (date) => {
    var dayNodes = this.shadowRoot.querySelectorAll('.day');
    dayNodes.forEach(function (dayNode) {
      var dayDate = new Date(dayNode.getAttribute('data-date'));
      if (dayDate.toDateString() === date.toDateString()) {
        dayNode.classList.add('activeEvent');
      }
    });
  };
  handleDrop = (event) => {
    event.preventDefault();
    var draggedDate = event.dataTransfer.getData('text/plain');
    var newDate = event.target.dataset.date;
    console.log('Move event from', draggedDate, 'to', newDate);
    let dateFieldName=this.eventsConfig.datesDateField
    var draggedEvent = this.this.dataAllInOneData.find(function (event) {
      return (
        new Date(event[dateFieldName]).toDateString() ===
        new Date(draggedDate).toDateString()
      );
    });
    console.log('Event:', draggedEvent);
    this.updateEventDate(draggedEvent, newDate);
  };
  updateEventDate = (event, newDate) => {
    const index = this.eventsInfo.findIndex(
      (obj) => obj.id === event.id
    );

    if (index !== -1) {
      event[this.eventsConfig.datesDateField] = new Date(newDate).toISOString().split('T')[0];
      this.eventsInfo[index] = {
        ...this.eventsInfo[index],
        ...event,
      };
      console.log(
        'Object updated successfully:',
        this.eventsInfo[index]
      );
      this.updateDateColor(event[this.eventsConfig.datesDateField]);
    } else {
      console.log('Object with ID', 'id', 'not found.');
    }
  };
  updateDateColor = (updatedDate) => {
    var dateElement = this.shadowRoot.querySelector(
      '[data-date="' + updatedDate + '"]'
    );
    console.log(updatedDate);
    console.log(dateElement);
    if (dateElement) {
      dateElement.style.backgroundColor = 'red';
    }
  };
  getMonthsInYear = (year) => {
    var date = new Date(year, 0, 1);
    var months = [];
    var monthCount = 0;
    while (monthCount < 12) {
      months.push(new Date(date));
      date.setMonth(date.getMonth() + 1);
      monthCount++;
    }
    return months;
  };
  buildYearCalendar = (
    el,
    year,    
    eventsInfo = this.eventsInfo,
    holidays_calendar = this.holidays_calendar,
    calendarStartDate,
    calendarEndDate
  ) => {
    console.log('buildYearCalendar', 'start', 'calendarStartDate', calendarStartDate, 'calendarEndDate', calendarEndDate);
    var months = this.getMonthsInYear(year);
    // Calendar for check start_date and end_date
    months.forEach((a, b) => {
      let loadedYear = new Date(a).getFullYear();
      let loadedMonth = new Date(a).getMonth() + 1;

      const currentDate = new Date(loadedYear, loadedMonth - 1); // loadedMonth-1 ya que Date() usa base 0 para los meses

// Comprobar si currentDate está fuera del rango
if (currentDate < this.calendarStartDate || currentDate > this.calendarEndDate) {
  if (this.calendarConfig.yearView !== undefined && this.calendarConfig.yearView.hideOutOfBoundsMonths === true) {
    return;
  }
}

      var $monthNode = this.buildMonth(
        b,
        year,
        this.eventsInfo,
        holidays_calendar,
        calendarStartDate,
        calendarEndDate
      );
      el.appendChild($monthNode);
    });
  };
  handleHourDragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.target.innerText); // store the hour being dragged
  };
  getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  handleDayClick = (event) => {
    var selectedDate = event.currentTarget.getAttribute('data-date');
    var modal = this.shadowRoot.getElementById('eventModal');
    var modalContent = this.shadowRoot.querySelector('.modal-content');

    // Display the modal
    modal.style.display = 'block';

    // Center the modal horizontally
    modalContent.style.left = '50%';
    modalContent.style.transform = 'translateX(-50%)';

    this.selectedDateTitle.innerText = selectedDate;
    var currentTime = new Date();
    var defaultStartTime = formatTime(
      currentTime.getHours(),
      currentTime.getMinutes()
    );
    var defaultEndTime = formatTime(
      currentTime.getHours() + 1,
      currentTime.getMinutes()
    );
    this.shadowRoot.getElementById('eventStartTime').value = defaultStartTime;
    this.shadowRoot.getElementById('eventEndTime').value = defaultEndTime;

    if (event.target.classList.contains('hour')) {
      var startTime = event.target.innerText.split(' ')[0];
      var endTime = event.target.innerText.split(' ')[2];
      console.log('Event Start Time: ' + startTime);
      console.log('Event End Time: ' + endTime);

      var hourNodes = this.sh.querySelectorAll('.hour');
      hourNodes.forEach(function (hourNode) {
        hourNode.classList.remove('selected');
      });
      event.target.classList.add('selected');
    }
  };

  closeModal = () => {
    var modal = this.shadowRoot.getElementById('eventModal');
    modal.style.display = 'none';
  };

  // handleDayClick = (event) => {
  //   var selectedDate = event.currentTarget.getAttribute("data-date");
  //   var rect = event.currentTarget.getBoundingClientRect();
  //   var popup = this.eventPopup;
  //   popup.style.display = "block";
  //   popup.style.top = "0"; // Set top to 0 to align with the top of the viewport
  //   popup.style.left = "50%"; // Set left to center horizontally
  //   popup.style.transform = "translateX(-50%)"; // Center horizontally using transform
  //   this.selectedDateTitle.innerText = selectedDate;
  //   var currentTime = new Date();
  //   var defaultStartTime = formatTime(
  //     currentTime.getHours(),
  //     currentTime.getMinutes()
  //   );
  //   var defaultEndTime = formatTime(
  //     currentTime.getHours() + 1,
  //     currentTime.getMinutes()
  //   );
  //   this.eventStartTime.value = defaultStartTime;
  //   this.eventEndTime.value = defaultEndTime;

  //   if (event.target.classList.contains("hour")) {
  //     var startTime = event.target.innerText.split(" ")[0];
  //     var endTime = event.target.innerText.split(" ")[2];
  //     console.log("Event Start Time: " + startTime);
  //     console.log("Event End Time: " + endTime);

  //     var hourNodes = this.sh.querySelectorAll(".hour");
  //     hourNodes.forEach(function (hourNode) {
  //       hourNode.classList.remove("selected");
  //     });
  //     event.target.classList.add("selected");
  //   }
  // }
  handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.target.dataset.date);
  };
  changeYear = (yearChange) => {
    this.currentDisplayedYear += yearChange;
    this.calendar.innerHTML = '';
    this.buildYearCalendar(
      this.calendar,
      this.currentDisplayedYear,
      this.eventsInfo,
      this.holidays_calendar,
      this.calendarStartDate,
      this.calendarEndDate
    );
    this.showCalendarView();
  };

  showDayGridView = (selectedDate) => {
    var selectedDateTitleGrid = this.selectedDateTitleGrid;
    var hourGrid = this.hourGrid;
    const dayHeader = this.shadowRoot.getElementById('dayHeader');
    if (hourGrid!==undefined){
      hourGrid.innerHTML = '';
    }
    var previouslySelectedHour = document.querySelector('.hour.selected');
    if (previouslySelectedHour) {
      previouslySelectedHour.classList.remove('selected');
    }
    let eventsData = []
    // console.log(selectedDate);
    if (selectedDate!==undefined){
      selectedDateTitleGrid.innerText = selectedDate.toDateString();
      const date = formatDateString(selectedDate);    
      if (this.eventsInfo!==undefined){    
        eventsData = this.eventsInfo.filter((e) => e.date === date);
      }
    }
    if (eventsData.length > 0) {
      eventsData.forEach((event) => {
        const eventElement = document.createElement('div');
        eventElement.style.padding = '10px';
        eventElement.style.marginBottom = '20px';
        eventElement.style.border = '1px solid #ccc';
        eventElement.style.borderRadius = '5px';

        const dateElement = document.createElement('div');
        dateElement.innerText = event[this.eventsConfig.datesDateField];
        dateElement.style.fontWeight = 'bold';
        eventElement.appendChild(dateElement);

        // const descriptionEnElement = document.createElement('div');
        // let eventDetail= createEventDescription(event, this.calendarConfig.dayView.eventListsFields, this.lang);
        
        // descriptionEnElement.appendChild(eventDescription);
        // descriptionEnElement.innerText = eventDetail

        // descriptionEnElement.innerText = event.description_en;
        // descriptionEnElement.style.marginTop = '5px';
        // eventElement.appendChild(descriptionEnElement);

        const descriptionEnElement = document.createElement('div');
        let eventDetail= createEventDescription(event, this.calendarConfig.dayView.eventListsFields, this.lang);
        
        descriptionEnElement.style.marginTop = '5px';
        descriptionEnElement.style.display = 'flex';
        eventElement.appendChild(eventDetail);
                
        dayHeader.appendChild(eventElement);
      });
    } else {
      while (dayHeader.firstChild) {
        dayHeader.removeChild(dayHeader.firstChild);
      }
    }
    this.populateHourGrid(hourGrid);
    var hourNodes = document.querySelectorAll('.hour');
    hourNodes.forEach((hourNode) => {
      hourNode.addEventListener('dblclick', this.handleDayClick);
    });
    if (this.calendar!==null&&this.calendar!==undefined){
      this.calendar.style.display = 'none';
    }
    if (this.selectedDateView!==null&&this.selectedDateView!==undefined){
      this.selectedDateView.style.display = 'block';
    }
    if (this.dayGridView!==null&&this.dayGridView!==undefined){
      this.dayGridView.style.display = 'block';
    }
    if (this.weekGridView!==null&&this.weekGridView!==undefined){
      this.weekGridView.style.display = 'none';
    }
  };
  populateHourGrid = (hourGrid) => {
    let startHour=1
    let endHour=24
    if (this.calendarConfig.dayView!==undefined&&this.calendarConfig.dayView.startHour!==undefined){
      startHour=this.calendarConfig.dayView.startHour
    }
    if (this.calendarConfig.dayView!==undefined&&this.calendarConfig.dayView.endHour!==undefined){
      endHour=this.calendarConfig.dayView.endHour
    }
    var hourNode = document.createElement('div');
    hourNode.classList.add('hour');
    hourNode.innerText = 0 + ':00 - ' + (1) + ':00';
    if (hourGrid!==undefined){
      hourGrid.appendChild(hourNode);
      for (var i = startHour; i < endHour; i++) {
        var hourNode = document.createElement('div');
        hourNode.classList.add('hour');
        hourNode.innerText = i + ':00 - ' + (i + 1) + ':00';
        hourGrid.appendChild(hourNode);
      }
    }
  };
  showWeekGridView = () => {
    console.log('showWeekGridView week');

    var selectedWeekTitle = this.selectedWeekTitle;
    var weekHourGrid = this.weekHourGrid;
    const weekHeader = this.shadowRoot.getElementById('weekHeader');
    weekHeader.innerHTML = ''
    weekHourGrid.innerHTML = '';

    selectedWeekTitle.innerText =
      'Week of ' + this.firstDateOfWeek.toDateString();

    for (var i = 0; i < 7; i++) {
      var dayNode = document.createElement('div');
      dayNode.classList.add('day');
      var currentDay = new Date(this.firstDateOfWeek);
      currentDay.setDate(this.firstDateOfWeek.getDate() + i);
      const options = { weekday: 'short' }
      dayNode.innerText =
      currentDay.toLocaleDateString('en-US', options) +
        ', ' +
        this.monthNames[currentDay.getMonth()] +
        ' ' +
        currentDay.getDate();

      const eventsData = this.eventsInfo.filter(
        (e) => e.date === formatDateString(new Date(currentDay))
      );
      // let holidays = [];
      // const holidayData = this.holidays_calendar.forEach((h) => {
      //   holidays.push(
      //     ...h.dates.filter(
      //       (e) => e.date === formatDateString(new Date(currentDay))
      //     )
      //   );
      // });
      if (eventsData.length > 0) {
        eventsData.forEach((event) => {
          const eventElement = document.createElement('div');
          eventElement.style.padding = '10px';
          eventElement.style.marginBottom = '20px';
          eventElement.style.border = '1px solid #ccc';
          eventElement.style.borderRadius = '5px';

          const dateElement = document.createElement('div');
          dateElement.innerText = event[this.eventsConfig.datesDateField];
          dateElement.style.fontWeight = 'bold';
          eventElement.appendChild(dateElement);

          const descriptionEnElement = document.createElement('div');
          descriptionEnElement.innerText = event.description_en;
          descriptionEnElement.style.marginTop = '5px';
          eventElement.appendChild(descriptionEnElement);
          weekHeader.appendChild(eventElement);
        });
      }


      // var eventsForDate = this.events.filter(function (event) {
      //   return (
      //     new Date(event[this.config.datesDateField]).getDate() === new Date(currentDay).getDate() &&
      //     new Date(event[this.config.datesDateField]).getMonth() === new Date(currentDay).getMonth() &&
      //     new Date(event[this.config.datesDateField]).getFullYear() === new Date(currentDay).getFullYear()
      //   );
      // });
      // if (eventsForDate.length > 0) {
      //   dayNode.classList.add("activeEvent");
      //   dayNode.addEventListener("dragstart", this.handleDragStart);
      //   dayNode.setAttribute("draggable", true);
      // }
      // var currentDate = new Date();
      // console.log(new Date(currentDay).getDate())
      // if (
      //   currentDate.getDate() === new Date(currentDay).getDate() &&
      //   currentDate.getMonth() === new Date(currentDay).getMonth() &&
      //   currentDate.getFullYear() === new Date(currentDay).getFullYear()
      // ) {
      //   dayNode.classList.add("currentDate");
      // }
      // var holidayList = this.holidays_calendar.reduce(function (acc, holiday) {
      //   var holidaysForDate = holiday.dates.filter(function (date) {
      //     return (
      //       new Date(date.date).getDate() === new Date(currentDay).getDate() &&
      //       new Date(date.date).getMonth() === new Date(currentDay).getMonth() &&
      //       new Date(date.date).getFullYear() === new Date(currentDay).getFullYear()
      //     );
      //   });
      //   return acc.concat(holidaysForDate);
      // }, []);
      // if (holidayList.length > 0) {
      //   dayNode.classList.add("holidayEvent");
      // }
      weekHourGrid.appendChild(dayNode);

      for (var j = 0; j < 24; j++) {
        var hourNode = document.createElement('div');
        hourNode.classList.add('week-hour');
        hourNode.innerText = j + ':00 - ' + (j + 1) + ':00';
        hourNode.addEventListener('dblclick', this.handleWeekHourDoubleClick);
        dayNode.appendChild(hourNode);
      }
    }

    this.calendar.style.display = 'none';
    this.selectedDateView.style.display = 'none';
    this.dayGridView.style.display = 'none';
    this.weekGridView.style.display = 'block';
  };
  showCalendarView = () => {
    if (this.calendar!==null&&this.calendar!==undefined){
      this.calendar.style.display = 'block';
    }
    if (this.selectedDateView!==null&&this.selectedDateView!==undefined){
      this.selectedDateView.style.display = 'none';
    }
    if (this.dayGridView!==null&&this.dayGridView!==undefined){
      this.dayGridView.style.display = 'none';
    }
    if (this.weekGridView!==null&&this.weekGridView!==undefined){    
      this.weekGridView.style.display = 'none';
    }
    if (this.allEvents!==null&&this.allEvents!==undefined){
      this.allEvents.style.display = 'none';
    }
  };
  
  buildMonth(monthNum, year, events = this.eventsInfo, holidays_calendar = this.holidays_calendar, calendarStartDate, calendarEndDate, isAllMonthsView) {
    const firstDayOfMonth = new Date(year, monthNum, this.setDayBasedOnStartWeek).getDay();
    const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const daysInMonth = this.getDaysInMonth(monthNum, year);
    const $monthNode = document.createElement('div');
if (isAllMonthsView) {
  $monthNode.classList.add('full-month');  // Añade solo en la vista AllMonths
} else {
  $monthNode.classList.add('month');  // Otras vistas pueden usar la clase 'month'
}    
    //$monthNode.classList.add('month');
    const $titleNode = document.createElement('h4');
    if (this.monthNames!==undefined){
      $titleNode.innerText = this.monthNames[monthNum] + ' ' + year;    
      $monthNode.appendChild($titleNode);
    }

    // Añadimos los nombres de los días
    if (this.dayNames!==undefined){
      this.dayNames.forEach(function (dayName) {
        const $dayNode = document.createElement('div');
        $dayNode.classList.add('dow');
        $dayNode.innerText = dayName;
        $monthNode.appendChild($dayNode);
      });
    }
    const $daysContainer = document.createElement('div');
    $daysContainer.classList.add('days-container');

    // Crear los días vacíos antes del primer día del mes
    for (let i = 0; i < startingDay; i++) {
      const $emptyDayNode = document.createElement('div');
      $emptyDayNode.classList.add('day', 'empty');
      $daysContainer.appendChild($emptyDayNode);
    }

    daysInMonth.forEach((c, d) => {
      const $dayNode = document.createElement('div');
      $dayNode.classList.add('day');
      $dayNode.setAttribute('data-date', c);
      $dayNode.innerText = d + 1;

      if (c >= calendarStartDate && c <= calendarEndDate) {
        $dayNode.addEventListener('dblclick', this.handleDayClick);
        $dayNode.addEventListener('mouseover', this.handleDayHover);
        let eventsForDate=undefined
        if (this.eventsInfo!==undefined){
          let eventsForDate = this.eventsInfo.filter((event) => {
            const dateFieldName = this.eventsConfig.datesDateField;
            return (
              new Date(event[dateFieldName]).getDate() === d + 1 &&
              new Date(event[dateFieldName]).getMonth() === monthNum &&
              new Date(event[dateFieldName]).getFullYear() === year
            );
          });
        
          eventsForDate.forEach((event) => {
            let hasConflict = false;
            let isHoliday = false;
            let eventCount = 0;
          
            // Iteramos todos los eventos del día para evaluar el conflicto o si es festivo
            eventsForDate.forEach((event) => {
              if (event.conflict) {
                hasConflict = true;
              }
              if (event.is_holidays) {
                isHoliday = true;
              }
              eventCount++;  // Contamos el número de eventos para el badge
            });
          
            // Una vez evaluados todos los eventos, aplicamos la clase correspondiente
            if (hasConflict) {
              if (isHoliday) {
                $dayNode.classList.add('holiday-conflict');
              } else {
                $dayNode.classList.add('conflict-day');
              }
            } else if (isHoliday) {
              $dayNode.classList.add('holidayEvent');
            } else if (eventCount > 0) {
              $dayNode.classList.add('activeEvent');
            }
          
            // Eliminar badges duplicados si ya existen
            const existingBadge = $dayNode.querySelector('event-badge');
            if (existingBadge) {
              existingBadge.remove();
            }
          
            // Si hay eventos, agregamos el badge
            if (eventCount > 0) {
              const badge = document.createElement('event-badge');
              badge.setAttribute('label', eventCount);
              $dayNode.appendChild(badge);  // Añadimos el badge al dayNode
            }
          });
        }

        $dayNode.setAttribute('draggable', true);
        $dayNode.addEventListener('dragstart', this.handleDragStart);
      } else {
        $dayNode.classList.add('privMonthDate');
      }

      $daysContainer.appendChild($dayNode);
    });

    $monthNode.appendChild($daysContainer);

    return $monthNode;
  }  
  buildMonthV1 = (
    monthNum,
    year,
    events=this.eventsInfo,
    holidays_calendar = this.holidays_calendar,
    calendarStartDate,
    calendarEndDate
  ) => {
    console.log('monthNum', monthNum)
    var firstDayOfMonth = new Date(year, monthNum, this.setDayBasedOnStartWeek).getDay();
    console.log('calendarStartDate', calendarStartDate, 'calendarEndDate', calendarEndDate)
    //console.log('this.eventsInfo', this.eventsInfo, 'events', events)
    var startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    var daysInMonth = this.getDaysInMonth(monthNum, year);
    var $monthNode = document.createElement('div');
    //$monthNode.classList.add('month');
    var $titleNode = document.createElement('h4');
    $titleNode.innerText = this.monthNames[monthNum] + ' ' + year;
    $monthNode.appendChild($titleNode);
    this.dayNames.forEach(function (dayName) {
      var $dayNode = document.createElement('div');
      $dayNode.classList.add('dow');
      $dayNode.innerText = dayName;
      $monthNode.appendChild($dayNode);
    });
    var $daysContainer = document.createElement('div');
    $daysContainer.classList.add('days-container');
    for (var i = 0; i < startingDay; i++) {
      var $emptyDayNode = document.createElement('div');
      $emptyDayNode.classList.add('day', 'empty');
      var prevMonthDays = new Date(year, monthNum, 0).getDate();
      var date = prevMonthDays - startingDay + i + 1;
      $emptyDayNode.innerText = date;
      $emptyDayNode.classList.add('privMonthDate');
      $daysContainer.appendChild($emptyDayNode);
    }
    daysInMonth.forEach((c, d) => {
      // Calendar for check start_date and end_date

      //Calendar Date load
      var $dayNode = document.createElement('div');
      $dayNode.classList.add('day');
      $dayNode.setAttribute('data-date', c);
      $dayNode.innerText = d + 1;
      if (c >= calendarStartDate && c <= calendarEndDate) {
        $dayNode.addEventListener('dblclick', this.handleDayClick);
        $dayNode.addEventListener('drop', this.handleDrop);
        $dayNode.addEventListener('mouseover', this.handleDayHover);
        $dayNode.addEventListener('dragover', function (event) {
          event.preventDefault();
        });
        var currentDate = new Date();
        if (
          currentDate.getDate() === d + 1 &&
          currentDate.getMonth() === monthNum &&
          currentDate.getFullYear() === year
        ) {
          console.log('iscurrentDate', 'd', d, 'monthNum', monthNum, 'year', year, 'eventsForDate.length', eventsForDate===undefined?-1:eventsForDate.length)
          $dayNode.classList.add('currentDate');
        }
        var eventsForDate = []  
        if (this.eventsInfo!==undefined){
          let dateFieldName=this.eventsConfig.datesDateField
          eventsForDate = this.eventsInfo.filter(function (event) {
            return (
              new Date(event[dateFieldName]).getDate() === d + 1 &&
              new Date(event[dateFieldName]).getMonth() === monthNum &&
              new Date(event[dateFieldName]).getFullYear() === year
            );
          });
          // var holidayList = holidays_calendar.reduce(function (acc, holiday) {
          //   var holidaysForDate = holiday.dates.filter(function (date) {
          //     return (
          //       new Date(date.date).getDate() === d + 1 &&
          //       new Date(date.date).getMonth() === monthNum &&
          //       new Date(date.date).getFullYear() === year
          //     );
          //   });
          //   return acc.concat(holidaysForDate);
          // }, []);
          console.log('d', d, 'monthNum', monthNum, 'year', year, 'eventsForDate.length', eventsForDate.length)
          if (year==2024&&monthNum==9&&d==6){
            //alert("te pillo")
          }
          if (eventsForDate.length > 0) {
            console.log(eventsForDate)
            eventsForDate.forEach(e => {
              const allHolidays = eventsForDate.every(event => event.is_holidays);
              const noHolidays = eventsForDate.every(event => !event.is_holidays);
              const mixedEvents = !allHolidays && !noHolidays;
            
              // Limpiar las clases antes de aplicarlas para evitar duplicaciones no deseadas
              $dayNode.classList.remove('holidayEvent', 'activeEvent', 'holidayWithActiveEvent');
            
              // Aplicar la clase correspondiente según las condiciones
              if (allHolidays) {
                $dayNode.classList.add('holidayEvent');
              } else if (noHolidays) {
                $dayNode.classList.add('activeEvent');
              } else if (mixedEvents) {
                $dayNode.classList.add('holidayWithActiveEvent');
              }
            
              // Añadir clases adicionales según el conflicto
              if (e.conflict) {
                $dayNode.classList.add('holiday-match');
              }

/*              $dayNode.classList.add('activeEvent');
              if (e.is_holidays) {
                $dayNode.classList.add('holidayEvent');
              }
              if (e.conflict) {
                $dayNode.classList.add('holidayWithActiveEvent');
              } else {
                $dayNode.classList.add('activeEvent');
              }*/
            })
          }
          $dayNode.addEventListener('dragstart', this.handleDragStart);
          $dayNode.setAttribute('draggable', true);
        }
        // this.holidays_calendar.forEach((holiday) => {
        //   holiday.dates.forEach((holidayDate) => {
        //     const isHolidayDatePresent = this.events.some((date) => {
        //       return date.date === holidayDate.date;
        //     });
        //     if (isHolidayDatePresent) {
        //       this.events.forEach((date) => {
        //         if (date.date === holidayDate.date) {
        //           const dateValue = formatDate(date.date);
        //           const selector = `[data-date="${dateValue}"]`;
        //           const $dateNode = this.shadowRoot.querySelector(selector);
        //           if ($dateNode) {
        //             $dateNode.classList.add('holiday-match');
        //           }
        //         }
        //       });
        //     }
        //   });
        // });
        $daysContainer.appendChild($dayNode);
      } else {
        $dayNode.classList.add('privMonthDate');
        $daysContainer.appendChild($dayNode);
      }

      // if (hasEvent(new Date(c))) {
      //   var eventDot = document.createElement("span");
      //   eventDot.classList.add("event-date");
      //   $dayNode.appendChild(eventDot);
      // }

      // }
    });

    $monthNode.appendChild($daysContainer);

    return $monthNode;
  };

  render() {
    let totalConflicts = 0
    let totalEvents = 0
    if (this.eventsInfo!==undefined){
      totalConflicts = this.eventsInfo.filter(event => event.conflict).length;
      totalEvents = this.eventsInfo.length;
    }

    return html`
    ${this.genericFormDialogTemplate()}
    ${this.minimapTemplate()}
    
${super.render()}    
      <div class="body">
        <div class="tabs-container">
          <ul class="tab-list">
            ${this.showDayViewTab||this.defaultTab==='day'?html`  
              <li class="tab-item" id="showDayView">
                <button class="tab-button">Day</button>
              </li>
            `:html``}
            ${this.showWeekViewTab||this.defaultTab==='week'?html`
              <li class="tab-item" id="showWeekView">
                <span class="tab-separator"></span
                ><button class="tab-button">Week</button>
              </li>
            `:html``}
            ${this.showMonthViewTab||this.defaultTab==='month'?html`
            ${this.showMonthView?html`            
              <li class="tab-item" id="showCurrentMonth">
                <span class="tab-separator"></span
                ><button class="tab-button">Month</button>
              </li>
            `:html``}
            `:html``}
            ${this.showYearViewTab||this.defaultTab==='year'?html`            
              <li class="tab-item active" id="showAllMonths">
                <span class="tab-separator"></span
                ><button class="tab-button">Year</button>
              </li>
            `:html``}
            ${this.showEventsViewTab||this.defaultTab==='events'?html`            
              <li class="tab-item" id="showAllEvents">
                <span class="tab-separator"></span
                ><button class="tab-button">Events Lists</button>
                <event-badge label="${totalEvents}"></event-badge>
              </li>
            `:html``}
            ${totalConflicts > 0 ? html`
              <li class="tab-item" id="showConflicts">
                <span class="tab-separator"></span
                ><button class="tab-button">Conflicts</button>
                <event-badge label="${totalConflicts}"></event-badge>
              </li>
            ` : html`<li class="tab-item" style="display:none;" id="showConflicts"></li>`}            
            <li class="tab-item" id="actions">
            ${this.calendarConfig===undefined||this.calendarConfig.actions===undefined?html``:html`
              ${this.getButtonForRows(this.calendarConfig.actions, this.data, false, {})}                   
            `}
            </li>
          </ul>
          
          <ul class="tab-list">
            <li class="tab-item" id="previous">
              <button class="tab-button">
                <span class="previous round" style="font-size: 26px;">&#8249;</span>
              </button>
            </li>
            <li class="tab-item">
              <span class="tab-separator"></span
              ><button class="tab-button" id="current"></button>
            </li>
            <li class="tab-item" id="next">
              <span class="tab-separator"></span
              ><button class="tab-button">
                <span class="previous round" style="font-size: 26px;">&#8250;</span>
              </button>
            </li>
          </ul>  
          
        </div>

        <div id="selectedDateView">
          <h2 id="selectedDateTitle"></h2>
        </div>
        <div id="dayGridView">
          <h2 id="selectedDateTitleGrid"></h2>
          <div id="dayHeader"></div>
          <div id="hourGrid"></div>
        </div>
        <div id="weekGridView">
          <h2 id="selectedWeekTitle"></h2>
          <div id="weekHeader"></div>
          <div id="weekHourGrid"></div>
        </div>

        <div id="calendar"></div>
        <div id="allEvents">   
        
       ${this.currentView === 'year' ? html`
          <div class="year-view">
            <!-- Botones para la vista de Year -->
            ${this.getButton(this.calendarConfig.yearView, this.data, this.data, true)}
            
          </div>
        ` : ''}        
          
        </div>
        <div id="conflictEvents" style="display: none;"></div>

        <div id="eventModal" class="modal">
          <div class="modal-content">
            <span class="close" @click="${this.closeModal}">&times;</span>
            <h2>Add Event</h2>
            <input type="text" id="eventName" placeholder="Event Name" />
            <input type="text" id="eventStartTime" value="" />
            <input type="text" id="eventEndTime" value="" />
            <button id="addEvent">Add Event</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('calendar-component', CalendarComponent);

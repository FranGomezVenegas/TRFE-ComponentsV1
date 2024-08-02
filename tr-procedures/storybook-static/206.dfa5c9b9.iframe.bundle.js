"use strict";(self.webpackChunk_trazit_tr_procedures=self.webpackChunk_trazit_tr_procedures||[]).push([[206],{"./src/components/Calendar/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__);var lit=__webpack_require__("./node_modules/lit/index.js");const styles=lit.AH`
.body
 {
    background: rgb(255, 255, 255);
    font-family: Montserrat;
}

.month {
    width: 300px;
    padding: 20px;
    background: #fff;
    position: relative;
    overflow: hidden;
    float: left;
    margin: 20px;
    height: 350px;
}
.month h3 {
    text-align: center;
    margin: -20px -20px 30px -20px;
    padding: 20px 0;
    background: red;
    color: #fff;
}
.activeEvent {
    cursor: pointer;
}
.day,
.dow,
.dummy-day {
    display: inline-block;
    width: 12.7864%;
    float: left;
    text-align: center;
    margin-right: 1.5%;
}

.dow {
    font-weight: bold;
    margin-bottom: 10px;
}

.day {
    color: #333;
    cursor: pointer;
    box-shadow: inset 0 0 0 1px #eee;
}
.day.weekend {
    background: #fafaff;
}
.day:hover {
    background: -webkit-linear-gradient(79deg, #4668db1a, #9d70cd99); /* Para Chrome y Safari */
    background: -moz-linear-gradient(79deg, #4668db1a, #9d70cd99); /* Para Firefox */
    background: -o-linear-gradient(79deg, #4668db1a, #9d70cd99); /* Para Opera */
    background: linear-gradient(79deg, #4668db1a, #9d70cd99); /* Estándar */    
    color: #000;
}

.day,
.dummy-day {
    height: 40px;
    line-height: 40px;
    margin-bottom: 1.5%;
    background: #fff;
}

.dummy-day {
    background: #f5f5f5;
    color: #ccc;
}

.hour.selected {
    background-color: #3498db; /* Blue color */
    color: white;
    font-weight: bold;
}

#selectedDateView,
#dayGridView,
#weekGridView {
    display: none;
}

#dayGridView,
#weekGridView {
    margin-top: 20px;
}

.hour {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    cursor: pointer;
}

.hour.selected {
    background-color: #3498db;
    /* Blue color */
    color: white;
    font-weight: bold;
}

.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    display: none;
    max-width: 300px;
    overflow: auto;
    /* Add overflow property to enable scrolling if needed */
}

.popup input[type="text"] {
    margin-bottom: 10px;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.popup button {
    padding: 8px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
}

.popup .close {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
}

.event-date {
    position: relative;
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: green;
    /* Green color */
    border-radius: 50%;
    margin-left: 5px;
}

.event-date {
    position: relative;
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: green;
    border-radius: 50%;
    margin-left: 5px;
}

.has-event {
    background-color: green;
    color: white;
}

/* Panthil */

.full-month {
    width: 100%;
    height: 100%;
    height: 100vh;
    margin: 0;
}

.tabs-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 20px;
}


.tab-list {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid rgba(0, 0, 0, 0.4);
    background-color: transparent;
    border-radius: 6px;
}

.tab-item {
    display: flex;
    // flex: 1;
    text-align: center;
}

.tab-button {
    background-color: transparent;
    color: rgba(0, 0, 0, 0.6);
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    font-family: Montserrat;
    font-size: 16px;
    transition: background-color 0.2s ease-in-out;
}

.tab-item.active .tab-button {
  background: -webkit-linear-gradient(79deg, #4668db, #9d70cd); /* Para Chrome y Safari */
  background: -moz-linear-gradient(79deg, #4668db, #9d70cd); /* Para Firefox */
  background: -o-linear-gradient(79deg, #4668db, #9d70cd); /* Para Opera */
  background: linear-gradient(79deg, #4668db, #9d70cd); /* Estándar */
  color:white;
}

.tab-separator {
    width: 1px;
    margin: 5px 0;
    background-color: #ccc;
}

/* SGR */

.currentDate {
    background-color: #95bf0b;
    color: #fff;
}

.day.holidayEvent {
  /* estilos para holidayEvent */
  background-color: gray; /* ejemplo de estilo */
  color:dark-gray
}

/* Puedes asegurarte de que activeEvent no sobrescriba holidayEvent */
.day.activeEvent:not(.holidayEvent) {
  /* estilos para activeEvent */
  background: -webkit-linear-gradient(79deg, #4668db, #9d70cd); /* Para Chrome y Safari */
  background: -moz-linear-gradient(79deg, #4668db, #9d70cd); /* Para Firefox */
  background: -o-linear-gradient(79deg, #4668db, #9d70cd); /* Para Opera */
  background: linear-gradient(79deg, #4668db, #9d70cd); /* Estándar */
  color:white;
}

.day.holidayWithActiveEvent{
  /* Estilos para cuando ambos eventos están presentes */
  background: -webkit-linear-gradient(12deg, #808080, #ffc107); /* Para Chrome y Safari */
  background: -moz-linear-gradient(12deg, #808080, #ffc107); /* Para Firefox */
  background: -o-linear-gradient(12deg, #808080, #ffc107); /* Para Opera */
  background: linear-gradient(12deg, #808080, #ffc107); /* Estándar */
  color: #8b1212; /* Ejemplo de estilo */
}
.privMonthDate {
    color: #e3e1e1;
}

.event-dropdown {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 5px;
    z-index: 9999;
    max-width: 200px; /* Adjusted max-width */
    max-height: 200px; /* Added max-height */
    overflow-y: auto; /* Added overflow-y for vertical scrollbar */
}

.dropdown-header {
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 5px;
}

.event-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.event-list li {
    padding: 5px 0;
    cursor: pointer;
}

.event-list li:hover {
    background-color: #f0f0f0;
}

.day.holiday {
    background-color: red !important;
}

.holiday-match {
    background-color: red !important;
}  
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 50px auto; /* Adjusted margin to center vertically */
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 400px;
    position: fixed;
    top: 50px; /* Adjust top position */
    left: 50%;
    transform: translateX(-50%);
  }
  
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    color: #999999;
    cursor: pointer;
  }
  
  .close:hover {
    color: #333333;
  }
  
  h2 {
    margin-top: 0;
    font-size: 24px;
    color: #333333;
  }
  
  input[type="text"] {
    width: calc(100% - 40px);
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }
  
  button {
    background: -webkit-linear-gradient(79deg, #4668db1a, #9d70cd99); /* Para Chrome y Safari */
    background: -moz-linear-gradient(79deg, #4668db1a, #9d70cd99); /* Para Firefox */
    background: -o-linear-gradient(79deg, #4668db1a, #9d70cd99); /* Para Opera */
    background: linear-gradient(79deg, #4668db1a, #9d70cd99); /* Estándar */  
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
button:hover {
  background: -webkit-linear-gradient(79deg, #4668db, #9d70cd); /* Para Chrome y Safari */
  background: -moz-linear-gradient(79deg, #4668db, #9d70cd); /* Para Firefox */
  background: -o-linear-gradient(79deg, #4668db, #9d70cd); /* Para Opera */
  background: linear-gradient(79deg, #4668db, #9d70cd); /* Estándar */
}




  .event-list-container {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.event-item {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    list-style:none;
}

.event-date {
    font-weight: bold;
    color: #333333;
    margin: 0 0 5px;
}

.event-description {
    margin: 0;
    color: #555555;
    margin-bottom: 10px;
}

.event-label {
    background-color: #666666;
    color: #ffffff;
    padding: 5px 12px;
    border-radius: 5px;
    margin-left: 10px;
}

.conflict-detail {
    color: #ff0000;
    font-style: italic;
    margin-top: 10px;
}

  


  

  `;function formatTime(hours,minutes){return(hours<10?"0"+hours:hours)+":"+(minutes<10?"0"+minutes:minutes)}function formatDateString(dateString){const date=new Date(dateString);return`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`}function createEventDescription(event,eventListsFields,lang){let eventDescriptionList=document.createElement("ul");return eventDescriptionList.classList.add("event-description-list"),eventListsFields.forEach((fieldConfig=>{let listItem=document.createElement("li"),label="es"===lang?fieldConfig.label_es:fieldConfig.label_en,value=event[fieldConfig.field];listItem.textContent=`${label}: ${value}`,eventDescriptionList.appendChild(listItem)})),eventDescriptionList}class CalendarComponent extends lit.WF{static properties={dataAllInOneData:{type:Object},config:{type:Object},showWeekView:{type:Boolean},lang:{type:String}};static styles=[styles,lit.AH``];constructor(){super(),this.showWeekView=!1,this.dataAllInOneData={},this.config={}}firstUpdated(){if(super.firstUpdated(),void 0===this.dataAllInOneData.program_calendar&&(this.dataAllInOneData.program_calendar={}),this.fakeData?(this.events=this.dataAllInOneData.program_calendar.dates,this.holidays_calendar=this.dataAllInOneData.program_calendar.holidays_calendar,this.firstDayOfWeek=this.dataAllInOneData.program_calendar.day_of_week,this.schedule_size_unit=this.dataAllInOneData.program_calendar.schedule_size_unit,"today"==this.dataAllInOneData.program_calendar.viewCurrentDate.toLowerCase()?this.currentDate=new Date:this.currentDate=this.dataAllInOneData.program_calendar.start_date?new Date(this.dataAllInOneData.program_calendar.start_date):new Date,console.log("currentDate",this.currentDate),this.firstDateOfWeek=new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),this.currentDate.getDate()-("MONDAY"===this.firstDayOfWeek?0===this.currentDate.getDay()?6:this.currentDate.getDay()-1:this.currentDate.getDay())),console.log(this.firstDateOfWeek),this.calendarStartDate=new Date(new Date(this.dataAllInOneData.program_calendar.start_date).setHours(0,0,0)),this.calendarEndDate=new Date(new Date(this.dataAllInOneData.program_calendar.end_date).setHours(0,0,0)),this.currentDisplayedYear=this.dataAllInOneData.program_calendar.start_date?new Date(this.dataAllInOneData.program_calendar.start_date).getFullYear():(new Date).getFullYear(),this.currentDisplayedMonth=this.dataAllInOneData.program_calendar.start_date?new Date(this.dataAllInOneData.program_calendar.start_date).getMonth():(new Date).getMonth(),this.currentYear=this.dataAllInOneData.program_calendar.start_date?new Date(this.dataAllInOneData.program_calendar.start_date).getFullYear():(new Date).getFullYear()):(this.events=[],void 0!==this.dataAllInOneData&&void 0!==this.dataAllInOneData.program_calendar&&void 0!==this.dataAllInOneData.program_calendar.dates&&(this.events=this.dataAllInOneData.program_calendar.dates),this.holidays_calendar=[],void 0!==this.dataAllInOneData&&void 0!==this.dataAllInOneData.program_calendar&&void 0!==this.dataAllInOneData.program_calendar.holidays_calendar&&(this.holidays_calendar=this.dataAllInOneData.program_calendar.holidays_calendar),this.firstDayOfWeek="MONDAY",void 0!==this.dataAllInOneData&&void 0!==this.dataAllInOneData.program_calendar&&void 0!==this.dataAllInOneData.program_calendar.day_of_week&&(this.firstDayOfWeek=this.dataAllInOneData.program_calendar.day_of_week),this.schedule_size_unit="MONTHS",void 0!==this.dataAllInOneData&&void 0!==this.dataAllInOneData.program_calendar&&void 0!==this.dataAllInOneData.program_calendar.schedule_size_unit&&(this.schedule_size_unit=this.dataAllInOneData.program_calendar.schedule_size_unit),void 0===this.dataAllInOneData.program_calendar.viewCurrentDate&&(this.dataAllInOneData.program_calendar.viewCurrentDate="today"),"today"==this.dataAllInOneData.program_calendar.viewCurrentDate.toLowerCase()?this.currentDate=new Date:this.currentDate=this.dataAllInOneData.program_calendar.start_date?new Date(this.dataAllInOneData.program_calendar.start_date):new Date,console.log("currentDate",this.currentDate),this.firstDateOfWeek=new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),this.currentDate.getDate()-("MONDAY"===this.firstDayOfWeek?0===this.currentDate.getDay()?6:this.currentDate.getDay()-1:this.currentDate.getDay())),console.log(this.firstDateOfWeek),this.calendarStartDate=new Date(new Date(this.dataAllInOneData.program_calendar.start_date).setHours(0,0,0)),this.calendarEndDate=new Date(new Date(this.dataAllInOneData.program_calendar.end_date).setHours(0,0,0)),this.currentDisplayedYear=this.dataAllInOneData.program_calendar.start_date?new Date(this.dataAllInOneData.program_calendar.start_date).getFullYear():(new Date).getFullYear(),this.currentDisplayedMonth=this.dataAllInOneData.program_calendar.start_date?new Date(this.dataAllInOneData.program_calendar.start_date).getMonth():(new Date).getMonth(),this.currentYear=this.dataAllInOneData.program_calendar.start_date?new Date(this.dataAllInOneData.program_calendar.start_date).getFullYear():(new Date).getFullYear()),this.setDayBasedOnStartWeek="monday"===(this.firstDayOfWeek.toLowerCase()||"SUNDAY")?1:2,this.dayNames=function getDayNames(day){return"monday"===day.toLowerCase()?["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}(this.firstDayOfWeek||"SUNDAY"),this.calendar=this.shadowRoot.getElementById("calendar"),this.allEvents=this.shadowRoot.getElementById("allEvents"),this.selectedDateView=this.shadowRoot.getElementById("selectedDateView"),this.dayGridView=this.shadowRoot.getElementById("dayGridView"),this.weekGridView=this.shadowRoot.getElementById("weekGridView"),this.previousButton=this.shadowRoot.getElementById("previous"),this.nextButton=this.shadowRoot.getElementById("next"),this.currentButton=this.shadowRoot.getElementById("current"),this.previousButton.addEventListener("click",this.handlePrevious),this.nextButton.addEventListener("click",this.handleNext),this.showCurrentMonthButton=this.shadowRoot.getElementById("showCurrentMonth"),this.showAllMonthsButton=this.shadowRoot.getElementById("showAllMonths"),this.showDayViewButton=this.shadowRoot.getElementById("showDayView"),this.showWeekViewButton=this.shadowRoot.getElementById("showWeekView"),this.weekHourGrid=this.shadowRoot.getElementById("weekHourGrid"),this.showAllEvents=this.shadowRoot.getElementById("showAllEvents"),this.selectedWeekTitle=this.shadowRoot.getElementById("selectedWeekTitle"),this.selectedDateTitleGrid=this.shadowRoot.getElementById("selectedDateTitleGrid"),this.addEvent=this.shadowRoot.getElementById("addEvent"),this.hourGrid=this.shadowRoot.getElementById("hourGrid"),this.eventName=this.shadowRoot.getElementById("eventName"),this.eventStartTime=this.shadowRoot.getElementById("eventStartTime"),this.eventEndTime=this.shadowRoot.getElementById("eventEndTime"),this.selectedDateTitle=this.shadowRoot.getElementById("selectedDateTitle"),this.eventPopup=this.shadowRoot.getElementById("eventPopup"),this.days=this.shadowRoot.querySelectorAll(".day"),this.hours=this.shadowRoot.querySelectorAll(".hour"),this.sidebarButtons=this.shadowRoot.querySelectorAll(".tab-item"),this.currentButton.addEventListener("click",this.handleCurrent),this.showAllEvents.addEventListener("click",(()=>{this.allEvents.innerHTML="",this.allEvents.style.display="block",this.calendar.style.display="none",this.selectedDateView.style.display="none",this.dayGridView.style.display="none",this.weekGridView.style.display="none";const allEventsContainer=document.createElement("div");allEventsContainer.classList.add("event-list-container"),void 0!==this.events&&this.events.forEach(((event,index)=>{let listItem=document.createElement("li");listItem.classList.add("event-item");let eventDate=document.createElement("p");eventDate.textContent=`Date: ${event[this.config.datesDateField]}}`,listItem.appendChild(eventDate);let eventDescription=createEventDescription(event,this.config.eventListsFields,this.lang);if(listItem.appendChild(eventDescription),event.is_holidays){let holidayLabel=document.createElement("span");holidayLabel.textContent="Holiday",holidayLabel.classList.add("event-label"),listItem.appendChild(holidayLabel)}if(event.conflict){let conflictDetail=document.createElement("p");conflictDetail.textContent=`Conflict Detail: ${event.conflict_detail}`,conflictDetail.classList.add("conflict-detail"),listItem.appendChild(conflictDetail)}allEventsContainer.appendChild(listItem)})),this.allEvents.appendChild(allEventsContainer)})),this.sidebarButtons.forEach((button=>{button.addEventListener("click",(()=>{this.sidebarButtons.forEach((btn=>{btn.classList.remove("active")})),button.classList.add("active")}))})),this.addEvent.addEventListener("click",this.addEventFunction),this.hours.forEach((hour=>{hour.addEventListener("drop",this.handleHourDrop),hour.addEventListener("dragover",(function(event){event.preventDefault()}))})),this.showCurrentMonthButton.addEventListener("click",(()=>{console.log("click Month",this.currentDisplayedMonth),this.shadowRoot.getElementById("calendar").innerHTML="",console.log(this.calendarStartDate);const currentMonth=this.calendarStartDate?new Date(this.calendarStartDate).getMonth():(new Date).getMonth(),currentYear=this.calendarStartDate?new Date(this.calendarStartDate).getFullYear():(new Date).getFullYear(),$monthNode=this.buildMonth(currentMonth,currentYear,this.events,this.holidays_calendar,this.calendarStartDate,this.calendarEndDate);this.shadowRoot.getElementById("calendar").appendChild($monthNode),$monthNode.classList.add("full-month"),this.showCalendarView(),this.currentButton.innerText="Month"})),this.showAllMonthsButton.addEventListener("click",(()=>{this.shadowRoot.getElementById("calendar").innerHTML="";const currentYear=this.calendarStartDate?new Date(this.calendarStartDate).getFullYear():(new Date).getFullYear();this.buildYearCalendar(this.calendar,currentYear,this.events,this.holidays_calendar,this.calendarStartDate,this.calendarEndDate),this.showCalendarView(),this.currentButton.innerText="Year"})),this.showDayViewButton.addEventListener("click",(()=>{let selectedDate;new Date>=new Date(this.calendarStartDate)&&new Date<=new Date(this.calendarEndDate)?(console.log("in"),selectedDate=new Date):(console.log("else"),selectedDate=new Date(this.calendarStartDate)),this.showDayGridView(selectedDate),this.currentButton.innerText="Day"})),this.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"],"MONTHS"===this.schedule_size_unit){this.currentButton.innerText="Month",console.log("click Month",this.currentDisplayedMonth),this.shadowRoot.getElementById("calendar").innerHTML="",console.log(this.calendarStartDate);const currentMonth=this.calendarStartDate?new Date(this.calendarStartDate).getMonth():(new Date).getMonth(),currentYear=this.calendarStartDate?new Date(this.calendarStartDate).getFullYear():(new Date).getFullYear(),$monthNode=this.buildMonth(currentMonth,currentYear,this.events,this.holidays_calendar,this.calendarStartDate,this.calendarEndDate);this.shadowRoot.getElementById("calendar").appendChild($monthNode),$monthNode.classList.add("full-month"),this.showWeekView&&this.showWeekViewButton.addEventListener("click",(()=>{console.log("click Week"),this.showWeekGridView(),this.addDoubleClickEventToWeekHours(),this.currentButton.innerText="Week"})),this.showCalendarView()}else if("DAYS"===this.schedule_size_unit){let selectedDate;new Date>=new Date(this.calendarStartDate)&&new Date<=new Date(this.calendarEndDate)?(console.log("in"),selectedDate=new Date):(console.log("else"),selectedDate=new Date(this.calendarStartDate)),this.showDayGridView(selectedDate),this.currentButton.innerText="Day"}else"WEEKS"===this.schedule_size_unit?(this.showWeekGridView(),this.addDoubleClickEventToWeekHours(),this.currentButton.innerText="Week"):this.buildYearCalendar(this.calendar,this.currentYear,this.events,this.holidays_calendar,this.calendarStartDate,this.calendarEndDate)}handleCurrent=()=>{console.log(this.calendarStartDate),console.log(this.calendarEndDate);const innerText=this.currentButton.innerText;if("Year"===innerText){const yearDifference=new Date(this.calendarStartDate).getFullYear()-this.currentDisplayedYear;this.changeYear(yearDifference)}if("Month"===innerText){const currentMonth=new Date(this.calendarStartDate).getMonth(),currentYear=new Date(this.calendarStartDate).getFullYear();this.calendar.innerHTML="";var $monthNode=this.buildMonth(currentMonth,currentYear,this.events,this.holidays_calendar,this.calendarStartDate,this.calendarEndDate);this.calendar.appendChild($monthNode),$monthNode.classList.add("full-month"),this.showCalendarView()}"Week"===innerText&&(this.firstDateOfWeek=new Date(new Date(this.calendarStartDate).getFullYear(),new Date(this.calendarStartDate).getMonth(),new Date(this.calendarStartDate).getDate()-new Date(this.calendarStartDate).getDay()),this.showWeekGridView()),"Day"===innerText&&this.showDayGridView(new Date(this.calendarStartDate))};handlePrevious=()=>{console.log(this.currentDisplayedYear),console.log(new Date(this.calendarStartDate).getFullYear()),console.log(new Date(this.calendarStartDate).getFullYear());let calendarValue=window.getComputedStyle(this.calendar).getPropertyValue("display"),dateValue=window.getComputedStyle(this.dayGridView).getPropertyValue("display"),weekValue=window.getComputedStyle(this.weekGridView).getPropertyValue("display");if("block"===calendarValue)if(this.shadowRoot.querySelector(".full-month")){const currentMonthDate=new Date(this.currentYear,this.currentDisplayedMonth);currentMonthDate.setMonth(currentMonthDate.getMonth()-1);const calendarStartDate=new Date(this.calendarStartDate),calendarEndDate=new Date(this.calendarEndDate);currentMonthDate>=calendarStartDate&&currentMonthDate<=calendarEndDate&&this.changeMonth(-1)}else this.currentDisplayedYear-1>=new Date(this.calendarStartDate).getFullYear()&&this.currentDisplayedYear-1<=new Date(this.calendarEndDate).getFullYear()&&this.changeYear(-1);if("block"===dateValue){var selectedDate=new Date(this.selectedDateTitleGrid.innerText);const calendarStartDate=new Date(this.calendarStartDate),calendarEndDate=new Date(this.calendarEndDate);let DayDate=new Date(this.selectedDateTitleGrid.innerText);DayDate.setDate(selectedDate.getDate()-1),DayDate>=calendarStartDate&&DayDate<=calendarEndDate&&(selectedDate.setDate(selectedDate.getDate()-1),this.showDayGridView(selectedDate))}if("block"===weekValue){var currentDate=new Date(this.firstDateOfWeek);const calendarStartDate=new Date(this.calendarStartDate),calendarEndDate=new Date(this.calendarEndDate);let weekDate=new Date(this.firstDateOfWeek);weekDate.setDate(weekDate.getDate()-1),weekDate>=calendarStartDate&&weekDate<=calendarEndDate&&(currentDate.setDate(this.firstDateOfWeek.getDate()-7),this.firstDateOfWeek=currentDate,this.showWeekGridView())}};handleNext=()=>{let calendarValue=window.getComputedStyle(this.calendar).getPropertyValue("display"),dateValue=window.getComputedStyle(this.dayGridView).getPropertyValue("display"),weekValue=window.getComputedStyle(this.weekGridView).getPropertyValue("display");if("block"===calendarValue)if(this.shadowRoot.querySelector(".full-month")){const currentMonthDate=new Date(this.currentYear,this.currentDisplayedMonth);currentMonthDate.setMonth(currentMonthDate.getMonth()+1);const calendarStartDate=new Date(this.calendarStartDate),calendarEndDate=new Date(this.calendarEndDate);currentMonthDate>=calendarStartDate&&currentMonthDate<=calendarEndDate&&this.changeMonth(1)}else this.currentDisplayedYear+1>=new Date(this.calendarStartDate).getFullYear()&&this.currentDisplayedYear+1<=new Date(this.calendarEndDate).getFullYear()&&this.changeYear(1);if("block"===dateValue){var selectedDate=new Date(this.selectedDateTitleGrid.innerText);const calendarStartDate=new Date(this.calendarStartDate),calendarEndDate=new Date(this.calendarEndDate);new Date(this.selectedDateTitleGrid.innerText).setDate(selectedDate.getDate()+1),selectedDate>=calendarStartDate&&selectedDate<=calendarEndDate&&(selectedDate.setDate(selectedDate.getDate()+1),this.showDayGridView(selectedDate))}if("block"===weekValue){var currentDate=new Date(this.firstDateOfWeek);const calendarStartDate=new Date(this.calendarStartDate),calendarEndDate=new Date(this.calendarEndDate);let weekDate=new Date(this.firstDateOfWeek);weekDate.setDate(weekDate.getDate()+7),weekDate>=calendarStartDate&&weekDate<=calendarEndDate&&(currentDate.setDate(this.firstDateOfWeek.getDate()+7),this.firstDateOfWeek=currentDate,this.showWeekGridView())}};changeMonth(monthChange){this.currentDisplayedMonth+=monthChange,12===this.currentDisplayedMonth?(this.currentDisplayedMonth=0,this.currentYear++):-1===this.currentDisplayedMonth&&(this.currentDisplayedMonth=11,this.currentYear--),this.calendar.innerHTML="";var $monthNode=this.buildMonth(this.currentDisplayedMonth,this.currentYear,this.events,this.holidays_calendar,this.calendarStartDate,this.calendarEndDate);this.calendar.appendChild($monthNode),$monthNode.classList.add("full-month"),this.showCalendarView()}handleDayHover=event=>{var hoveredDate=event.currentTarget.getAttribute("data-date");if(void 0!==this.events){let dateFieldName=this.config.datesDateField;var eventsForHoveredDate=this.events.filter((function(event){return new Date(event[dateFieldName]).toDateString()===new Date(hoveredDate).toDateString()}))}var existingDropdown=document.querySelector(".event-dropdown");if(existingDropdown&&existingDropdown.parentNode.removeChild(existingDropdown),void 0!==eventsForHoveredDate&&eventsForHoveredDate.length>0){var dropdown=document.createElement("div");dropdown.classList.add("event-dropdown");var header=document.createElement("div");header.classList.add("dropdown-header"),header.textContent="Events for "+hoveredDate,dropdown.appendChild(header);var eventList=document.createElement("ul");eventList.classList.add("event-list"),eventsForHoveredDate.forEach((event=>{let ListContent=document.createElement("div");var listItem=document.createElement("div");listItem.style.display="flex",listItem.style.padding="5px 0px",listItem.style.justifyContent="space-between",listItem.style.alignItems="center";let eventTitle=document.createElement("p");eventTitle.style.margin="0",void 0!==this.config.hoverDateDialog.entryTitleFld?eventTitle.textContent=event[this.config.hoverDateDialog.entryTitleFld]:eventTitle.textContent="";let eventDescription=createEventDescription(event,this.config.hoverDateDialog.eventListsFields,this.lang),eventDetails=document.createElement("div");eventDetails.appendChild(eventTitle),eventDetails.appendChild(eventDescription),listItem.appendChild(eventDetails);var crossIcon=document.createElement("span");if(crossIcon.textContent="❌",crossIcon.style.cursor="pointer",crossIcon.style.marginLeft="5px",crossIcon.style.color="#ccc",crossIcon.style.fontSize="12px",crossIcon.addEventListener("click",(e=>{e.preventDefault();const selector=`[data-date="${hoveredDate}"]`,$dateNode=this.shadowRoot.querySelector(selector);if($dateNode){console.log(this.events);let dateFieldName=this.config.datesDateField,matchedEvents=this.events.filter((e=>e.date===event[dateFieldName]));1===matchedEvents.length&&($dateNode.classList.contains("holidayEvent")?($dateNode.classList.remove("holidayWithActiveEvent"),$dateNode.classList.remove("activeEvent")):$dateNode.classList.remove("activeEvent"))}eventList.removeChild(ListContent);var indexToRemove=this.events.findIndex((function(evt){return evt===event}));-1!==indexToRemove&&this.events.splice(indexToRemove,1)})),listItem.appendChild(crossIcon),ListContent.appendChild(listItem),event.conflict){let conflictContainer=document.createElement("div");ListContent.style.backgroundColor="#ffe6e6",ListContent.style.padding="5px",ListContent.style.borderRadius="3px";let conflictDetail=document.createElement("p");conflictDetail.style.margin="0",conflictDetail.innerText=event.conflict_detail,conflictDetail.style.color="red",conflictDetail.style.fontWeight="bold",conflictContainer.appendChild(conflictDetail),ListContent.appendChild(conflictContainer)}ListContent.addEventListener("mouseenter",(function(){event.conflict||(listItem.style.backgroundColor="#f0f0f0")})),ListContent.addEventListener("mouseleave",(function(){listItem.style.backgroundColor="transparent"})),eventList.appendChild(ListContent)})),dropdown.appendChild(eventList);var rect=event.currentTarget.getBoundingClientRect();dropdown.style.top=rect.top+rect.height+"px",dropdown.style.left=rect.left+"px",dropdown.style.position="absolute",dropdown.style.backgroundColor="#fff",dropdown.style.border="1px solid #ccc",dropdown.style.borderRadius="5px",dropdown.style.boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)",dropdown.style.padding="5px",dropdown.style.zIndex="9999",dropdown.style.maxWidth=this.config.hoverDateDialog.dialogWidth||"400px",dropdown.style.maxHeight=this.config.hoverDateDialog.dialogHeight||"400px",dropdown.style.overflowY="auto",header.style.fontWeight="bold",header.style.paddingBottom="5px",header.style.borderBottom="1px solid #ccc",header.style.marginBottom="5px",header.style.wordBreak="break-word",header.style.whiteSpace="normal",header.style.width="100%",eventList.style.listStyle="none",eventList.style.padding="0 5px",eventList.style.margin="0",eventList.querySelectorAll("li").forEach((function(li){li.style.padding="5px 0",li.style.cursor="pointer"})),eventList.querySelectorAll("li:hover").forEach((function(li){li.style.backgroundColor="#f0f0f0"})),document.body.appendChild(dropdown),dropdown.addEventListener("mouseleave",(function(){dropdown.parentNode.removeChild(dropdown)}))}};closePopup=()=>{this.eventPopup.style.display="none"};addDoubleClickEventToWeekHours=()=>{document.querySelectorAll(".week-hour").forEach((hourNode=>{hourNode.addEventListener("dblclick",this.handleWeekHourDoubleClick)}))};handleWeekHourDoubleClick=event=>{var startTime=event.target.innerText.split(" ")[0],currentDate=this.selectedWeekTitle.innerText,currentDateString=currentDate?currentDate.trim():"",selectedDate=new Date(currentDateString+" "+startTime),rect=event.target.getBoundingClientRect(),popup=this.eventPopup;popup.style.display="block",popup.style.top=rect.top+"px",popup.style.left=rect.right+"px",this.selectedDateTitle.innerText=selectedDate;var defaultEndTime=formatTime(selectedDate.getHours()+1,selectedDate.getMinutes());this.eventStartTime.value=startTime,this.eventEndTime.value=defaultEndTime};addEventFunction=e=>{e.preventDefault();var eventName=this.eventName.value,eventStartTime=this.eventStartTime.value,eventEndTime=this.eventEndTime.value,selectedDate=this.selectedDateTitle.innerText,newEvent={id:this.events.length+1,date:formatDateString(selectedDate),description_en:eventName,description_es:"",is_holidays:!1,conflict:!1,conflict_detail:"",location:"",start_time:eventStartTime,end_time:eventEndTime};this.events.push(newEvent),this.closeModal(),localStorage.setItem("events",JSON.stringify(events)),this.updateCalendar(new Date(selectedDate)),this.eventName.value="",this.eventStartTime.value="",this.eventEndTime.value=""};handleHourDrop=event=>{event.preventDefault();var draggedHour=event.dataTransfer.getData("text/plain"),newHour=event.target.innerText;console.log("Change event time from",draggedHour,"to",newHour)};updateCalendar=date=>{this.shadowRoot.querySelectorAll(".day").forEach((function(dayNode){new Date(dayNode.getAttribute("data-date")).toDateString()===date.toDateString()&&dayNode.classList.add("activeEvent")}))};handleDrop=event=>{event.preventDefault();var draggedDate=event.dataTransfer.getData("text/plain"),newDate=event.target.dataset.date;console.log("Move event from",draggedDate,"to",newDate);let dateFieldName=this.config.datesDateField;var draggedEvent=this.this.dataAllInOneData.find((function(event){return new Date(event[dateFieldName]).toDateString()===new Date(draggedDate).toDateString()}));console.log("Event:",draggedEvent),this.updateEventDate(draggedEvent,newDate)};updateEventDate=(event,newDate)=>{const index=this.events.program_calendar.dates.findIndex((obj=>obj.id===event.id));-1!==index?(event[this.config.datesDateField]=new Date(newDate).toISOString().split("T")[0],this.events.program_calendar.dates[index]={...this.events.program_calendar.dates[index],...event},console.log("Object updated successfully:",this.events.program_calendar.dates[index]),this.updateDateColor(event[this.config.datesDateField])):console.log("Object with ID","id","not found.")};updateDateColor=updatedDate=>{var dateElement=this.shadowRoot.querySelector('[data-date="'+updatedDate+'"]');console.log(updatedDate),console.log(dateElement),dateElement&&(dateElement.style.backgroundColor="red")};getMonthsInYear=year=>{for(var date=new Date(year,0,1),months=[],monthCount=0;monthCount<12;)months.push(new Date(date)),date.setMonth(date.getMonth()+1),monthCount++;return months};buildYearCalendar=(el,year,events1=this.events,holidays_calendar=this.holidays_calendar,calendarStartDate,calendarEndDate)=>{console.log("start"),this.getMonthsInYear(year).forEach(((a,b)=>{let loadedYear=new Date(a).getFullYear(),loadedMonth=new Date(a).getMonth()+1;loadedYear>=new Date(this.calendarStartDate).getFullYear()&&loadedYear<=new Date(this.calendarEndDate).getFullYear()&&loadedMonth>=new Date(this.calendarStartDate).getMonth()+1&&loadedMonth<=new Date(this.calendarEndDate).getMonth()+1&&(console.log(loadedYear,loadedMonth),console.log(new Date(this.calendarStartDate).getFullYear(),new Date(this.calendarStartDate).getMonth()+1),console.log(new Date(this.calendarEndDate).getFullYear(),new Date(this.calendarEndDate).getMonth()+1));var $monthNode=this.buildMonth(b,year,events1,holidays_calendar,calendarStartDate,calendarEndDate);el.appendChild($monthNode)}))};handleHourDragStart=event=>{event.dataTransfer.setData("text/plain",event.target.innerText)};getDaysInMonth=(month,year)=>{for(var date=new Date(year,month,1),days=[];date.getMonth()===month;)days.push(new Date(date)),date.setDate(date.getDate()+1);return days};handleDayClick=event=>{var selectedDate=event.currentTarget.getAttribute("data-date"),modal=this.shadowRoot.getElementById("eventModal"),modalContent=this.shadowRoot.querySelector(".modal-content");modal.style.display="block",modalContent.style.left="50%",modalContent.style.transform="translateX(-50%)",this.selectedDateTitle.innerText=selectedDate;var currentTime=new Date,defaultStartTime=formatTime(currentTime.getHours(),currentTime.getMinutes()),defaultEndTime=formatTime(currentTime.getHours()+1,currentTime.getMinutes());if(this.shadowRoot.getElementById("eventStartTime").value=defaultStartTime,this.shadowRoot.getElementById("eventEndTime").value=defaultEndTime,event.target.classList.contains("hour")){var startTime=event.target.innerText.split(" ")[0],endTime=event.target.innerText.split(" ")[2];console.log("Event Start Time: "+startTime),console.log("Event End Time: "+endTime),this.sh.querySelectorAll(".hour").forEach((function(hourNode){hourNode.classList.remove("selected")})),event.target.classList.add("selected")}};closeModal=()=>{this.shadowRoot.getElementById("eventModal").style.display="none"};handleDragStart=event=>{event.dataTransfer.setData("text/plain",event.target.dataset.date)};changeYear=yearChange=>{this.currentDisplayedYear+=yearChange,this.calendar.innerHTML="",this.buildYearCalendar(this.calendar,this.currentDisplayedYear,this.events,this.holidays_calendar,this.calendarStartDate,this.calendarEndDate),this.showCalendarView()};showDayGridView=selectedDate=>{var selectedDateTitleGrid=this.selectedDateTitleGrid,hourGrid=this.hourGrid;const dayHeader=this.shadowRoot.getElementById("dayHeader");hourGrid.innerHTML="";var previouslySelectedHour=document.querySelector(".hour.selected");previouslySelectedHour&&previouslySelectedHour.classList.remove("selected"),selectedDateTitleGrid.innerText=selectedDate.toDateString();const date=formatDateString(selectedDate);let eventsData=[];if(void 0!==this.events&&(eventsData=this.events.filter((e=>e.date===date))),eventsData.length>0)eventsData.forEach((event=>{const eventElement=document.createElement("div");eventElement.style.padding="10px",eventElement.style.marginBottom="20px",eventElement.style.border="1px solid #ccc",eventElement.style.borderRadius="5px";const dateElement=document.createElement("div");dateElement.innerText=event[this.config.datesDateField],dateElement.style.fontWeight="bold",eventElement.appendChild(dateElement);const descriptionEnElement=document.createElement("div");descriptionEnElement.innerText=event.description_en,descriptionEnElement.style.marginTop="5px",eventElement.appendChild(descriptionEnElement),dayHeader.appendChild(eventElement)}));else for(;dayHeader.firstChild;)dayHeader.removeChild(dayHeader.firstChild);this.populateHourGrid(hourGrid),document.querySelectorAll(".hour").forEach((hourNode=>{hourNode.addEventListener("dblclick",this.handleDayClick)})),this.calendar.style.display="none",this.selectedDateView.style.display="block",this.dayGridView.style.display="block",this.weekGridView.style.display="none"};populateHourGrid=hourGrid=>{for(var i=0;i<24;i++){var hourNode=document.createElement("div");hourNode.classList.add("hour"),hourNode.innerText=i+":00 - "+(i+1)+":00",hourGrid.appendChild(hourNode)}};showWeekGridView=()=>{console.log("showWeekGridView week");var selectedWeekTitle=this.selectedWeekTitle,weekHourGrid=this.weekHourGrid;const weekHeader=this.shadowRoot.getElementById("weekHeader");weekHeader.innerHTML="",weekHourGrid.innerHTML="",selectedWeekTitle.innerText="Week of "+this.firstDateOfWeek.toDateString();for(var i=0;i<7;i++){var dayNode=document.createElement("div");dayNode.classList.add("day");var currentDay=new Date(this.firstDateOfWeek);currentDay.setDate(this.firstDateOfWeek.getDate()+i);const options={weekday:"short"};dayNode.innerText=currentDay.toLocaleDateString("en-US",options)+", "+this.monthNames[currentDay.getMonth()]+" "+currentDay.getDate();const eventsData=this.events.filter((e=>e.date===formatDateString(new Date(currentDay))));eventsData.length>0&&eventsData.forEach((event=>{const eventElement=document.createElement("div");eventElement.style.padding="10px",eventElement.style.marginBottom="20px",eventElement.style.border="1px solid #ccc",eventElement.style.borderRadius="5px";const dateElement=document.createElement("div");dateElement.innerText=event[this.config.datesDateField],dateElement.style.fontWeight="bold",eventElement.appendChild(dateElement);const descriptionEnElement=document.createElement("div");descriptionEnElement.innerText=event.description_en,descriptionEnElement.style.marginTop="5px",eventElement.appendChild(descriptionEnElement),weekHeader.appendChild(eventElement)})),weekHourGrid.appendChild(dayNode);for(var j=0;j<24;j++){var hourNode=document.createElement("div");hourNode.classList.add("week-hour"),hourNode.innerText=j+":00 - "+(j+1)+":00",hourNode.addEventListener("dblclick",this.handleWeekHourDoubleClick),dayNode.appendChild(hourNode)}}this.calendar.style.display="none",this.selectedDateView.style.display="none",this.dayGridView.style.display="none",this.weekGridView.style.display="block"};showCalendarView=()=>{this.calendar.style.display="block",this.selectedDateView.style.display="none",this.dayGridView.style.display="none",this.weekGridView.style.display="none",this.allEvents.style.display="none"};buildMonth=(monthNum,year,events1=this.events,holidays_calendar=this.holidays_calendar,calendarStartDate,calendarEndDate)=>{var firstDayOfMonth=new Date(year,monthNum,this.setDayBasedOnStartWeek).getDay(),startingDay=0===firstDayOfMonth?6:firstDayOfMonth-1,daysInMonth=this.getDaysInMonth(monthNum,year),$monthNode=document.createElement("div");$monthNode.classList.add("month");var $titleNode=document.createElement("h4");$titleNode.innerText=this.monthNames[monthNum]+" "+year,$monthNode.appendChild($titleNode),this.dayNames.forEach((function(dayName){var $dayNode=document.createElement("div");$dayNode.classList.add("dow"),$dayNode.innerText=dayName,$monthNode.appendChild($dayNode)}));var $daysContainer=document.createElement("div");$daysContainer.classList.add("days-container");for(var i=0;i<startingDay;i++){var $emptyDayNode=document.createElement("div");$emptyDayNode.classList.add("day","empty");var date=new Date(year,monthNum,0).getDate()-startingDay+i+1;$emptyDayNode.innerText=date,$emptyDayNode.classList.add("privMonthDate"),$daysContainer.appendChild($emptyDayNode)}return daysInMonth.forEach(((c,d)=>{var $dayNode=document.createElement("div");if($dayNode.classList.add("day"),$dayNode.setAttribute("data-date",c),$dayNode.innerText=d+1,c>=calendarStartDate&&c<=calendarEndDate){$dayNode.addEventListener("dblclick",this.handleDayClick),$dayNode.addEventListener("drop",this.handleDrop),$dayNode.addEventListener("mouseover",this.handleDayHover),$dayNode.addEventListener("dragover",(function(event){event.preventDefault()}));var currentDate=new Date;currentDate.getDate()===d+1&&currentDate.getMonth()===monthNum&&currentDate.getFullYear()===year&&$dayNode.classList.add("currentDate");var eventsForDate=[];if(void 0!==this.events){let dateFieldName=this.config.datesDateField;(eventsForDate=this.events.filter((function(event){return new Date(event[dateFieldName]).getDate()===d+1&&new Date(event[dateFieldName]).getMonth()===monthNum&&new Date(event[dateFieldName]).getFullYear()===year}))).length>0&&(console.log(eventsForDate),eventsForDate.forEach((e=>{const allHolidays=eventsForDate.every((event=>event.is_holidays)),noHolidays=eventsForDate.every((event=>!event.is_holidays)),mixedEvents=!allHolidays&&!noHolidays;$dayNode.classList.remove("holidayEvent","activeEvent","holidayWithActiveEvent"),allHolidays?$dayNode.classList.add("holidayEvent"):noHolidays?$dayNode.classList.add("activeEvent"):mixedEvents&&$dayNode.classList.add("holidayWithActiveEvent"),e.conflict&&$dayNode.classList.add("holiday-match")}))),$dayNode.addEventListener("dragstart",this.handleDragStart),$dayNode.setAttribute("draggable",!0)}$daysContainer.appendChild($dayNode)}else $dayNode.classList.add("privMonthDate"),$daysContainer.appendChild($dayNode)})),$monthNode.appendChild($daysContainer),$monthNode};render(){return lit.qy`
      <div class="body">
        <div class="tabs-container">
          <ul class="tab-list">
            <li class="tab-item" id="showDayView">
              <button class="tab-button">Day</button>
            </li>
            ${this.showWeekView?lit.qy`
            <li class="tab-item" id="showWeekView">
              <span class="tab-separator"></span
              ><button class="tab-button">Week</button>
            </li>
            `:lit.qy``}
            <li class="tab-item" id="showCurrentMonth">
              <span class="tab-separator"></span
              ><button class="tab-button">Month</button>
            </li>
            <li class="tab-item active" id="showAllMonths">
              <span class="tab-separator"></span
              ><button class="tab-button">Year</button>
            </li>
            <li class="tab-item" id="showAllEvents">
              <span class="tab-separator"></span
              ><button class="tab-button">Event Lists</button>
            </li>
          </ul>
          <ul class="tab-list">
            <li class="tab-item" id="previous">
              <button class="tab-button">
                <span class="previous round">&#8249;</span>
              </button>
            </li>
            <li class="tab-item">
              <span class="tab-separator"></span
              ><button class="tab-button" id="current"></button>
            </li>
            <li class="tab-item" id="next">
              <span class="tab-separator"></span
              ><button class="tab-button">
                <span class="previous round">&#8250;</span>
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
        <div id="allEvents" style="display: none;"></div>

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
    `}}customElements.define("calendar-component",CalendarComponent)}}]);
//# sourceMappingURL=206.dfa5c9b9.iframe.bundle.js.map
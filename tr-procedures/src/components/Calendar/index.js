import { LitElement, html, css } from 'lit';
import { styles } from './styles/index';
import { events } from './data/event';
import { getDayNames, formatTime, formatDate, formatDateString } from './utils';

class CalendarComponent extends LitElement {
  static styles = [
    styles,
    css``
  ];
  constructor() {
    super();
  }
  firstUpdated() {
    super.firstUpdated();
    this.events = events.program_calendar.dates;
    this.holidays_calendar = events.program_calendar.holidays_calendar;
    this.firstDayOfWeek = events.program_calendar.first_day_of_week;
    this.currentDate = new Date()
    this.firstDateOfWeek = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - this.currentDate.getDay());
    this.calendarStartDate = events.start_date;
    this.calendarEndDate = events.end_date;
    this.currentDisplayedYear = new Date().getFullYear();
    this.currentDisplayedMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.setDayBasedOnStartWeek = (this.firstDayOfWeek.toLowerCase() || "SUNDAY") === 'monday' ? 1 : 2;
    this.calendarStartDate = events.start_date;
    this.dayNames = getDayNames(this.firstDayOfWeek || "SUNDAY");
    this.calendar = this.shadowRoot.getElementById('calendar');
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
    this.currentButton.addEventListener('click', this.handleCurrent)
    this.sidebarButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.sidebarButtons.forEach((btn) => {
          btn.classList.remove("active");
        });
        button.classList.add("active");
      });
    });
    this.addEvent.addEventListener('click', this.addEventFunction)
    this.hours.forEach((hour) => {
      hour.addEventListener("drop", this.handleHourDrop);
      hour.addEventListener("dragover", function (event) {
        event.preventDefault();
      });
    });
    this.showCurrentMonthButton.addEventListener("click", () => {
      this.shadowRoot.getElementById('calendar').innerHTML = "";
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const $monthNode = this.buildMonth(currentMonth, currentYear);
      this.shadowRoot.getElementById('calendar').appendChild($monthNode);
      $monthNode.classList.add("full-month");
      this.showCalendarView();
      this.currentButton.innerText = 'Month'
    });
    this.showAllMonthsButton.addEventListener("click", () => {
      this.shadowRoot.getElementById('calendar').innerHTML = "";
      this.buildYearCalendar(this.calendar, this.currentDisplayedYear);
      this.showCalendarView();
      this.currentButton.innerText = 'Year'
    });
    this.showDayViewButton.addEventListener("click", () => {
      const selectedDate = new Date();
      this.showDayGridView(selectedDate);
      this.currentButton.innerText = 'Day'
    });
    this.showWeekViewButton.addEventListener("click", () => {
      this.showWeekGridView();
      this.addDoubleClickEventToWeekHours();
      this.currentButton.innerText = 'Week'
    });
    this.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.buildYearCalendar(this.calendar, this.currentYear, this.events, this.holidays_calendar);
    this.currentButton.innerText = 'Year'
  }
  handleCurrent = () => {
    const innerText = this.currentButton.innerText;
    if (innerText === 'Year') {
      const currentYear = new Date().getFullYear();
      const yearDifference = currentYear - this.currentDisplayedYear;
      this.changeYear(yearDifference);
    }
    if (innerText === 'Month') {
      const currentMonth = this.currentDate.getMonth();
      const currentYear = this.currentDate.getFullYear();
      this.calendar.innerHTML = "";
      var $monthNode = this.buildMonth(
        currentMonth,
        currentYear,
        this.events,
        this.holidays_calendar
      );
      this.calendar.appendChild($monthNode);
      $monthNode.classList.add("full-month");
      this.showCalendarView();
    }
    if (innerText === 'Week') {
      this.firstDateOfWeek = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - this.currentDate.getDay());
      this.showWeekGridView();
    }
    if (innerText === 'Day') {
      this.showDayGridView(this.currentDate);
    }
  }
  handlePrevious = () => {
    let calendarValue = window.getComputedStyle(this.calendar).getPropertyValue('display');
    let dateValue = window.getComputedStyle(this.dayGridView).getPropertyValue('display');
    let weekValue = window.getComputedStyle(this.weekGridView).getPropertyValue('display');
    if (calendarValue === 'block') {
      if (this.calendar.childElementCount === 12) {
        this.changeYear(-1);
      } else {
        this.changeMonth(-1);
      }
    }
    if (dateValue === 'block') {
      var selectedDate = new Date(this.selectedDateTitleGrid.innerText);
      selectedDate.setDate(selectedDate.getDate() - 1);
      this.showDayGridView(selectedDate);
    }
    if (weekValue === 'block') {
      var currentDate = new Date(this.firstDateOfWeek);
      currentDate.setDate(this.firstDateOfWeek.getDate() - 7);
      this.firstDateOfWeek = currentDate;
      this.showWeekGridView();
    }
  }
  handleNext = () => {
    let calendarValue = window.getComputedStyle(this.calendar).getPropertyValue('display');
    let dateValue = window.getComputedStyle(this.dayGridView).getPropertyValue('display');
    let weekValue = window.getComputedStyle(this.weekGridView).getPropertyValue('display');
    if (calendarValue === 'block') {
      if (this.calendar.childElementCount === 12) {
        this.changeYear(1);
      } else {
        this.changeMonth(1);
      }
    }
    if (dateValue === 'block') {
      var selectedDate = new Date(this.selectedDateTitleGrid.innerText);
      selectedDate.setDate(selectedDate.getDate() + 1);
      this.showDayGridView(selectedDate);
    }
    if (weekValue === 'block') {
      var currentDate = new Date(this.firstDateOfWeek);
      currentDate.setDate(this.firstDateOfWeek.getDate() + 7);
      this.firstDateOfWeek = currentDate;
      this.showWeekGridView();
    }
  }
  changeMonth(monthChange) {
    this.currentDisplayedMonth += monthChange;

    if (this.currentDisplayedMonth === 12) {
      this.currentDisplayedMonth = 0;
      this.currentYear++;
    } else if (this.currentDisplayedMonth === -1) {
      this.currentDisplayedMonth = 11;
      this.currentYear--;
    }
    this.calendar.innerHTML = "";
    var $monthNode = this.buildMonth(
      this.currentDisplayedMonth,
      this.currentYear,
      this.events,
      this.holidays_calendar
    );
    this.calendar.appendChild($monthNode);
    $monthNode.classList.add("full-month");
    this.showCalendarView();
  }
  handleDayHover = (event) => {
    var hoveredDate = event.currentTarget.getAttribute("data-date");
    var eventsForHoveredDate = this.events.filter(function (event) {
      return (
        new Date(event.date).toDateString() ===
        new Date(hoveredDate).toDateString()
      );
    });
    var existingDropdown = document.querySelector(".event-dropdown");
    if (existingDropdown) {
      existingDropdown.parentNode.removeChild(existingDropdown);
    }

    if (eventsForHoveredDate.length > 0) {
      var dropdown = document.createElement("div");
      dropdown.classList.add("event-dropdown");

      var header = document.createElement("div");
      header.classList.add("dropdown-header");
      header.textContent = "Events for " + hoveredDate;
      dropdown.appendChild(header);

      var eventList = document.createElement("ul");
      eventList.classList.add("event-list");

      eventsForHoveredDate.forEach((event) => {
        var listItem = document.createElement("li");
        listItem.style.display = 'flex';
        listItem.style.justifyContent = 'space-between';
        listItem.style.alignItems = 'center'
        let eventTitle = document.createElement('p');
        eventTitle.style.margin = "0"
        eventTitle.innerText = event.description_en;
        listItem.appendChild(eventTitle)
        listItem.addEventListener("click", function () {
          console.log("Clicked on event:", event.description_en);
        });
        var crossIcon = document.createElement("span");
        crossIcon.textContent = "❌";
        crossIcon.style.cursor = "pointer";
        crossIcon.style.marginLeft = "5px";
        crossIcon.style.color = "#ccc";
        crossIcon.style.fontSize = "12px";
        crossIcon.addEventListener("click", (e) => {
          e.preventDefault();
          const selector = `[data-date="${hoveredDate}"]`;
          const $dateNode = this.shadowRoot.querySelector(selector);
          console.log($dateNode)
          if ($dateNode) {
            console.log(this.events)
            let matchedEvents = this.events.filter(e => e.date === event.date)
            if (matchedEvents.length === 1) {
              if ($dateNode.classList.contains('holidayEvent')) {
                $dateNode.classList.remove('holiday-match');
                $dateNode.classList.remove('activeEvent');
              } else {
                $dateNode.classList.remove('activeEvent');
              }
            }
          }
          eventList.removeChild(listItem)

          // // Remove the event dropdown
          // var existingDropdown = document.querySelector(".event-dropdown");
          // if (existingDropdown) {
          //   existingDropdown.parentNode.removeChild(existingDropdown);
          // }
          var indexToRemove = this.events.findIndex(function (evt) {
            return evt === event;
          });

          if (indexToRemove !== -1) {
            this.events.splice(indexToRemove, 1);
          }
        });
        listItem.appendChild(crossIcon);
        listItem.appendChild(crossIcon);
        listItem.addEventListener("mouseenter", function () {
          listItem.style.backgroundColor = "#f0f0f0";
        });
        listItem.addEventListener("mouseleave", function () {
          listItem.style.backgroundColor = "transparent";
        });
        eventList.appendChild(listItem);
      });
      dropdown.appendChild(eventList);
      var rect = event.currentTarget.getBoundingClientRect();
      dropdown.style.top = rect.top + rect.height + "px";
      dropdown.style.left = rect.left + "px";
      dropdown.style.position = "absolute";
      dropdown.style.backgroundColor = "#fff";
      dropdown.style.border = "1px solid #ccc";
      dropdown.style.borderRadius = "5px";
      dropdown.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
      dropdown.style.padding = "5px";
      dropdown.style.zIndex = "9999";
      dropdown.style.maxWidth = "200px";
      dropdown.style.maxHeight = "200px";
      dropdown.style.overflowY = "auto";

      header.style.fontWeight = "bold";
      header.style.paddingBottom = "5px";
      header.style.borderBottom = "1px solid #ccc";
      header.style.marginBottom = "5px";

      eventList.style.listStyle = "none";
      eventList.style.padding = "0 5px";
      eventList.style.margin = "0";

      eventList.querySelectorAll("li").forEach(function (li) {
        li.style.padding = "5px 0";
        li.style.cursor = "pointer";
      });

      eventList.querySelectorAll("li:hover").forEach(function (li) {
        li.style.backgroundColor = "#f0f0f0";
      });

      document.body.appendChild(dropdown);
      dropdown.addEventListener("mouseleave", function () {
        dropdown.parentNode.removeChild(dropdown);
      });
    }

  }
  closePopup = () => {
    this.eventPopup.style.display = "none";
  }
  addDoubleClickEventToWeekHours = () => {
    var hourNodes = document.querySelectorAll(".week-hour");
    hourNodes.forEach((hourNode) => {
      hourNode.addEventListener("dblclick", this.handleWeekHourDoubleClick);
    });
  }
  handleWeekHourDoubleClick = (event) => {
    var startTime = event.target.innerText.split(" ")[0];
    // var endTime = event.target.innerText.split(" ")[2];
    var currentDate = this.selectedWeekTitle.innerText;

    var currentDateString = currentDate ? currentDate.trim() : "";

    var selectedDate = new Date(currentDateString + " " + startTime);

    var rect = event.target.getBoundingClientRect();
    var popup = this.eventPopup;
    popup.style.display = "block";
    popup.style.top = rect.top + "px";
    popup.style.left = rect.right + "px";

    this.selectedDateTitle.innerText = selectedDate;

    var defaultEndTime = formatTime(
      selectedDate.getHours() + 1,
      selectedDate.getMinutes()
    );

    this.eventStartTime.value = startTime;
    this.eventEndTime.value = defaultEndTime;
  }
  addEventFunction = (e) => {
    e.preventDefault();
    var eventName = this.eventName.value;
    var eventStartTime = this.eventStartTime.value;
    var eventEndTime = this.eventEndTime.value;
    var selectedDate = this.selectedDateTitle.innerText;
    var newEvent = {
      id: this.events.length + 1,
      date: formatDateString(selectedDate),
      description_en: eventName,
      description_es: "",
      is_holidays: false,
      conflict: false,
      conflict_detail: "",
      location: "",
      start_time: eventStartTime,
      end_time: eventEndTime,
    };
    this.events.push(newEvent);
    this.closeModal()
    localStorage.setItem("events", JSON.stringify(events));
    this.updateCalendar(new Date(selectedDate));
    this.eventName.value = "";
    this.eventStartTime.value = "";
    this.eventEndTime.value = "";
    // this.eventPopup.style.display = "none";
    
  }
  handleHourDrop = (event) => {
    event.preventDefault();
    var draggedHour = event.dataTransfer.getData("text/plain");
    var newHour = event.target.innerText;
    console.log("Change event time from", draggedHour, "to", newHour);
  }
  updateCalendar = (date) => {
    var dayNodes = this.shadowRoot.querySelectorAll(".day");
    dayNodes.forEach(function (dayNode) {
      var dayDate = new Date(dayNode.getAttribute("data-date"));
      if (dayDate.toDateString() === date.toDateString()) {
        dayNode.classList.add("activeEvent");
      }
    });
  }
  handleDrop = (event) => {
    event.preventDefault();
    var draggedDate = event.dataTransfer.getData("text/plain");
    var newDate = event.target.dataset.date;
    console.log("Move event from", draggedDate, "to", newDate);
    var draggedEvent = events.find(function (event) {
      return (
        new Date(event.date).toDateString() ===
        new Date(draggedDate).toDateString()
      );
    });
    console.log("Event:", draggedEvent);
    this.updateEventDate(draggedEvent, newDate);
  }
  updateEventDate = (event, newDate) => {
    const index = events.program_calendar.dates.findIndex(
      (obj) => obj.id === event.id
    );

    if (index !== -1) {
      event.date = new Date(newDate).toISOString().split("T")[0];
      events.program_calendar.dates[index] = {
        ...events.program_calendar.dates[index],
        ...event,
      };
      console.log(
        "Object updated successfully:",
        events.program_calendar.dates[index]
      );
      this.updateDateColor(event.date);
    } else {
      console.log("Object with ID", "id", "not found.");
    }
  }
  updateDateColor = (updatedDate) => {
    var dateElement = this.shadowRoot.querySelector(
      '[data-date="' + updatedDate + '"]'
    );
    console.log(updatedDate);
    console.log(dateElement);
    if (dateElement) {
      dateElement.style.backgroundColor = "red";
    }
  }
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
  }
  buildYearCalendar = (el, year, events = this.events, holidays_calendar = this.holidays_calendar) => {
    var months = this.getMonthsInYear(year);
    months.forEach((a, b) => {
      var $monthNode = this.buildMonth(b, year, events, holidays_calendar);
      el.appendChild($monthNode);
    });
  }
  handleHourDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.innerText); // store the hour being dragged
  }
  getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }


  handleDayClick = (event) => {
    var selectedDate = event.currentTarget.getAttribute("data-date");
    var modal = this.shadowRoot.getElementById("eventModal");
    var modalContent = this.shadowRoot.querySelector(".modal-content");
  
    // Display the modal
    modal.style.display = "block";
  
    // Center the modal horizontally
    modalContent.style.left = "50%";
    modalContent.style.transform = "translateX(-50%)";
  
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
    this.shadowRoot.getElementById("eventStartTime").value = defaultStartTime;
    this.shadowRoot.getElementById("eventEndTime").value = defaultEndTime;
  
    if (event.target.classList.contains("hour")) {
      var startTime = event.target.innerText.split(" ")[0];
      var endTime = event.target.innerText.split(" ")[2];
      console.log("Event Start Time: " + startTime);
      console.log("Event End Time: " + endTime);
  
      var hourNodes = this.sh.querySelectorAll(".hour");
      hourNodes.forEach(function (hourNode) {
        hourNode.classList.remove("selected");
      });
      event.target.classList.add("selected");
    }
  }
  
  closeModal = () => {
    var modal = this.shadowRoot.getElementById("eventModal");
    modal.style.display = "none";
  }
  



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
    event.dataTransfer.setData("text/plain", event.target.dataset.date);
  }
  changeYear = (yearChange) => {
    this.currentDisplayedYear += yearChange;
    this.calendar.innerHTML = "";
    this.buildYearCalendar(
      this.calendar,
      this.currentDisplayedYear,
      this.events,
      this.holidays_calendar
    );
    this.showCalendarView();
  }
  showDayGridView = (selectedDate) => {
    var selectedDateTitleGrid = this.selectedDateTitleGrid;
    var hourGrid = this.hourGrid;
    const dayHeader = this.shadowRoot.getElementById('dayHeader')
    hourGrid.innerHTML = "";
    var previouslySelectedHour = document.querySelector(".hour.selected");
    if (previouslySelectedHour) {
      previouslySelectedHour.classList.remove("selected");
    }
    console.log(selectedDate)
    selectedDateTitleGrid.innerText = selectedDate.toDateString();
    const date = formatDateString(selectedDate)
    const eventsData = this.events.filter(e => e.date === date)
    if (eventsData.length > 0) {
      eventsData.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.style.padding = '10px';
        eventElement.style.marginBottom = '20px';
        eventElement.style.border = '1px solid #ccc';
        eventElement.style.borderRadius = '5px';

        const dateElement = document.createElement('div');
        dateElement.innerText = event.date;
        dateElement.style.fontWeight = 'bold';
        eventElement.appendChild(dateElement);

        const descriptionEnElement = document.createElement('div');
        descriptionEnElement.innerText = event.description_en;
        descriptionEnElement.style.marginTop = '5px';
        eventElement.appendChild(descriptionEnElement);
        dayHeader.appendChild(eventElement)
      });
    } else {
      while (dayHeader.firstChild) {
        dayHeader.removeChild(dayHeader.firstChild);
      }
    }
    this.populateHourGrid(hourGrid);
    var hourNodes = document.querySelectorAll(".hour");
    hourNodes.forEach((hourNode) => {
      hourNode.addEventListener("dblclick", this.handleDayClick);
    });

    this.calendar.style.display = "none";
    this.selectedDateView.style.display = "block";
    this.dayGridView.style.display = "block";
    this.weekGridView.style.display = "none";
  }
  populateHourGrid = (hourGrid) => {
    for (var i = 0; i < 24; i++) {
      var hourNode = document.createElement("div");
      hourNode.classList.add("hour");
      hourNode.innerText = i + ":00 - " + (i + 1) + ":00";
      hourGrid.appendChild(hourNode);
    }
  }
  showWeekGridView = () => {
    var selectedWeekTitle = this.selectedWeekTitle;
    var weekHourGrid = this.weekHourGrid;
    const weekHeader = this.shadowRoot.getElementById('weekHeader')

    weekHourGrid.innerHTML = "";

    selectedWeekTitle.innerText = "Week of " + this.firstDateOfWeek.toDateString();

    for (var i = 0; i < 7; i++) {
      var dayNode = document.createElement("div");
      dayNode.classList.add("day");
      var currentDay = new Date(this.firstDateOfWeek);
      currentDay.setDate(this.firstDateOfWeek.getDate() + i);
      dayNode.innerText =
        this.dayNames[currentDay.getDay()] +
        ", " +
        this.monthNames[currentDay.getMonth()] +
        " " +
        currentDay.getDate();

      const eventsData = this.events.filter(e => e.date === formatDateString(new Date(currentDay)))
      let holidays = []
      const holidayData = this.holidays_calendar.forEach(h => {
        holidays.push(...h.dates.filter(e => e.date === formatDateString(new Date(currentDay))))
      })
      if (eventsData.length > 0) {
        eventsData.forEach(event => {
          const eventElement = document.createElement('div');
          eventElement.style.padding = '10px';
          eventElement.style.marginBottom = '20px';
          eventElement.style.border = '1px solid #ccc';
          eventElement.style.borderRadius = '5px';

          const dateElement = document.createElement('div');
          dateElement.innerText = event.date;
          dateElement.style.fontWeight = 'bold';
          eventElement.appendChild(dateElement);

          const descriptionEnElement = document.createElement('div');
          descriptionEnElement.innerText = event.description_en;
          descriptionEnElement.style.marginTop = '5px';
          eventElement.appendChild(descriptionEnElement);
          weekHeader.appendChild(eventElement)
        });
      } else {
        while (weekHeader.firstChild) {
          weekHeader.removeChild(weekHeader.firstChild);
        }
      }


      // var eventsForDate = this.events.filter(function (event) {
      //   return (
      //     new Date(event.date).getDate() === new Date(currentDay).getDate() &&
      //     new Date(event.date).getMonth() === new Date(currentDay).getMonth() &&
      //     new Date(event.date).getFullYear() === new Date(currentDay).getFullYear()
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
      // var holidayList = holidays_calendar.reduce(function (acc, holiday) {
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
        var hourNode = document.createElement("div");
        hourNode.classList.add("week-hour");
        hourNode.innerText = j + ":00 - " + (j + 1) + ":00";
        hourNode.addEventListener("dblclick", this.handleWeekHourDoubleClick);
        dayNode.appendChild(hourNode);
      }
    }

    this.calendar.style.display = "none";
    this.selectedDateView.style.display = "none";
    this.dayGridView.style.display = "none";
    this.weekGridView.style.display = "block";
  }
  showCalendarView = () => {
    this.calendar.style.display = "block";
    this.selectedDateView.style.display = "none";
    this.dayGridView.style.display = "none";
    this.weekGridView.style.display = "none";
  }
  buildMonth = (monthNum, year, events = this.events, holidays_calendar = this.holidays_calendar) => {
    var firstDayOfMonth = new Date(
      year,
      monthNum,
      this.setDayBasedOnStartWeek
    ).getDay();
    var startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    var daysInMonth = this.getDaysInMonth(monthNum, year);
    var $monthNode = document.createElement("div");
    $monthNode.classList.add("month");
    var $titleNode = document.createElement("h4");
    $titleNode.innerText = this.monthNames[monthNum] + " " + year;
    $monthNode.appendChild($titleNode);
    this.dayNames.forEach(function (dayName) {
      var $dayNode = document.createElement("div");
      $dayNode.classList.add("dow");
      $dayNode.innerText = dayName;
      $monthNode.appendChild($dayNode);
    });
    var $daysContainer = document.createElement("div");
    $daysContainer.classList.add("days-container");
    for (var i = 0; i < startingDay; i++) {
      var $emptyDayNode = document.createElement("div");
      $emptyDayNode.classList.add("day", "empty");
      var prevMonthDays = new Date(year, monthNum, 0).getDate();
      var date = prevMonthDays - startingDay + i + 1;
      $emptyDayNode.innerText = date;
      $emptyDayNode.classList.add("privMonthDate");
      $daysContainer.appendChild($emptyDayNode);
    }
    daysInMonth.forEach((c, d) => {
      var $dayNode = document.createElement("div");
      $dayNode.classList.add("day");
      $dayNode.setAttribute("data-date", c);
      $dayNode.innerText = d + 1;
      $dayNode.addEventListener("dblclick", this.handleDayClick);
      $dayNode.addEventListener("drop", this.handleDrop);
      $dayNode.addEventListener("mouseover", this.handleDayHover);
      $dayNode.addEventListener("dragover", function (event) {
        event.preventDefault();
      });
      // if (hasEvent(new Date(c))) {
      //   var eventDot = document.createElement("span");
      //   eventDot.classList.add("event-date");
      //   $dayNode.appendChild(eventDot);
      // }
      var currentDate = new Date();
      if (
        currentDate.getDate() === d + 1 &&
        currentDate.getMonth() === monthNum &&
        currentDate.getFullYear() === year
      ) {
        $dayNode.classList.add("currentDate");
      }
      var eventsForDate = events.filter(function (event) {
        return (
          new Date(event.date).getDate() === d + 1 &&
          new Date(event.date).getMonth() === monthNum &&
          new Date(event.date).getFullYear() === year
        );
      });
      var holidayList = holidays_calendar.reduce(function (acc, holiday) {
        var holidaysForDate = holiday.dates.filter(function (date) {
          return (
            new Date(date.date).getDate() === d + 1 &&
            new Date(date.date).getMonth() === monthNum &&
            new Date(date.date).getFullYear() === year
          );
        });
        return acc.concat(holidaysForDate);
      }, []);
      if (eventsForDate.length > 0) {
        $dayNode.classList.add("activeEvent");
        $dayNode.addEventListener("dragstart", this.handleDragStart);
        $dayNode.setAttribute("draggable", true);
      }

      if (holidayList.length > 0) {
        $dayNode.classList.add("holidayEvent");
      }
      this.holidays_calendar.forEach((holiday) => {
        holiday.dates.forEach((holidayDate) => {
          const isHolidayDatePresent = this.events.some((date) => {
            return date.date === holidayDate.date;
          });
          if (isHolidayDatePresent) {
            console.log("Holiday date: " + holidayDate.date);
            this.events.forEach((date) => {
              if (date.date === holidayDate.date) {
                console.log("Matching date in jsonObject: " + date.date + "   " + holidayDate.date);
                const dateValue = formatDate(date.date);
                const selector = `[data-date="${dateValue}"]`;
                console.log("Selector:", selector);
                const $dateNode = this.shadowRoot.querySelector(selector);
                console.log("$dateNode:", $dateNode);
                if ($dateNode) {
                  $dateNode.classList.add("holiday-match");
                }
              }
            });
          }

        });
      });

      $daysContainer.appendChild($dayNode);
    });

    $monthNode.appendChild($daysContainer);

    return $monthNode;
  }

  render() {
    return html`
      <div class="body">
      <div class="tabs-container">
      <ul class="tab-list">
        <li class="tab-item" id="showDayView"><button class="tab-button">Day</button></li>
        <li class="tab-item" id="showWeekView"><span class="tab-separator"></span><button class="tab-button">Week</button></li>
        <li class="tab-item" id="showCurrentMonth"><span class="tab-separator"></span><button class="tab-button">Month</button></li>
        <li class="tab-item active" id="showAllMonths"><span class="tab-separator"></span><button class="tab-button">Year</button></li>
      </ul>
      <ul class="tab-list">
      <li class="tab-item" id="previous"><button class="tab-button"><span class="previous round">&#8249;</span></button></li>
      <li class="tab-item"><span class="tab-separator"></span><button class="tab-button" id="current"></button></li>
      <li class="tab-item" id="next"><span class="tab-separator"></span><button class="tab-button"><span class="previous round">&#8250;</span></button></li>
      </ul>
    </div>

    <div id="selectedDateView">
      <h2 id="selectedDateTitle"></h2>
    </div>
    <div id="dayGridView">
    <h2 id="selectedDateTitleGrid"></h2>
    <div id="dayHeader">   
      </div>   
      <div id="hourGrid"></div>
    </div>
    <div id="weekGridView">
    <h2 id="selectedWeekTitle"></h2>
    <div id="weekHeader">
      
    </div>      
      <div id="weekHourGrid"></div>
    </div>

    <div id="calendar"></div>
    
    <div id="eventModal" class="modal">
  <div class="modal-content">
    <span class="close" @click="${this.closeModal}">&times;</span>
    <h2>Add Event</h2>
    <input type="text" id="eventName" placeholder="Event Name">
    <input type="text" id="eventStartTime" value="">
    <input type="text" id="eventEndTime" value="">
    <button id="addEvent">Add Event</button>
  </div>
</div>

      </div>
    `;
  }

}

customElements.define('calendar-component', CalendarComponent);

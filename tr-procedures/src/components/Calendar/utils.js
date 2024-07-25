function getDayNames(day) {
    if (day.toLowerCase() === 'monday') {
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    } else {
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }
}
function formatTime(hours, minutes) {
    var formattedHours = hours < 10 ? "0" + hours : hours;
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return formattedHours + ":" + formattedMinutes;
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${dayOfWeek} ${month} ${day} ${year} 00:00:00 GMT+0530 (India Standard Time)`;
}
function formatDateString(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function createEventDescription(event, eventListsFields, lang) {
    let eventDescriptionList = document.createElement('ul');
    eventDescriptionList.classList.add('event-description-list');
  
    // Iterar sobre cada campo definido en la configuración
    eventListsFields.forEach(fieldConfig => {
      let listItem = document.createElement('li');
  
      // Seleccionar la etiqueta adecuada según el idioma
      let label = lang === 'es' ? fieldConfig.label_es : fieldConfig.label_en;
  
      // Obtener el valor del campo del evento
      let value = event[fieldConfig.field];
  
      // Establecer el contenido del elemento de lista
      listItem.textContent = `${label}: ${value}`;
  
      // Añadir el elemento de lista a la lista de descripción
      eventDescriptionList.appendChild(listItem);
    });
  
    return eventDescriptionList;
  }
export {
    getDayNames,
    formatTime,
    formatDate,
    formatDateString,
    createEventDescription
}
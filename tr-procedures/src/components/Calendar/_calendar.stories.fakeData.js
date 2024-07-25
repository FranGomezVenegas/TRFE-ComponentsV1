// _calendar.stories.fakeData.js

export const calendarConfig = {
    "datesDateField":"created_on",
    "eventListsFields":[
      {"field": "instrument", "label_en": "Instrument", "label_es": "Instrumento"},
      {"field": "event_type", "label_en": "Event", "label_es": "Evento"}
    ],
    "hoverDateDialog":{
      "entryTitleFld":"instrument",
      "eventListsFields":[
        {"field": "instrument", "label_en": "Instrument", "label_es": "Instrumento"},
        {"field": "event_type", "label_en": "Event", "label_es": "Evento"}
      ],  
      "dialogWidth": "300px", // Añade estas líneas
      "dialogHeight": "300px" // Añade estas líneas        
    }
  };
  
  export const dataAllInOneData = [
    // Añade aquí tus datos por defecto
    // Ejemplo:
    { id: 1, name: 'Event 1', date: '2024-07-22' },
    { id: 2, name: 'Event 2', date: '2024-08-15' },
  ];
  
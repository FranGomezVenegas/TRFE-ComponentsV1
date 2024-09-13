import { css } from 'lit';

export const styles = css`
.body
 {
    background: rgb(255, 255, 255);
    font-family: Montserrat;
}

.month {
    width: 300px;
    padding: 20px;
    background: rgb(255 255 255 / 36%);
    position: relative;
    overflow: hidden;
    float: left;
    margin: 20px;
    height: 350px;
     width: calc(100% / 4 - 10px); /* Ajusta para que quepan más meses por fila (4 por fila en este ejemplo) */
  margin: 10px; /* Ajuste de espacio entre los meses */
  border: solid 1px; /* Añade borde */
  border-radius: 10px; /* Añade esquinas redondeadas */
  box-sizing: border-box;
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

    position: relative;  /* Asegura que el badge se posicione correctamente */
    background-color: #f0f0f0; 
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

.full-month2 {
    width: 100%;
    height: 100%;
    height: 40vh;
    margin: 0px;
    border: solid 1px;
    border-radius: 10px;
    /* width: 300px; */
}
.full-month {
    width: calc((70vw - 40px) );
    height: 50vh;
    background: rgb(255 255 255 / 36%);
    position: relative;
    overflow: hidden;
    float: left;
    margin: 20px;
    border: solid 1px; /* Añade borde */
    border-radius: 10px; /* Añade esquinas redondeadas */
    box-sizing: border-box;
}    

.tabs-container {
    display: flex;
    justify-content: space-between;s
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

.conflict-day {
background: linear-gradient(to bottom, rgb(220, 53, 69), rgb(70, 104, 219));
}

.holiday-conflict {
background: linear-gradient(to bottom, gray, rgb(220, 53, 69));
}  

.event-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #ff6f61; /* Color del fondo del badge */
  color: white; /* Color del texto */
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}
    .event-list-container {
        display: flex;
        flex-wrap: wrap; /* Para que las tarjetas que no quepan salten a la siguiente línea */
        gap: 16px; /* Espacio entre las tarjetas */
        padding: 20px;
        background-color: rgb(245 245 245 / 14%);
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
    display: block;
    width: auto; /* El ancho se adapta al contenido */
    max-width: 300px; /* Puedes ajustar el máximo ancho para controlar el tamaño de las tarjetas */
    background-color: #f5f5f5; /* Ejemplo de fondo para las tarjetas */
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    word-wrap: break-word; /* Ajusta el texto dentro del card si es demasiado largo */
}


/* Contenedor de los eventos en el hover */
.event-dropdown {
    display: flex;
    flex-wrap: wrap;  /* Los elementos se ajustarán a la siguiente fila si no caben */
    gap: 10px; /* Añade un pequeño espacio entre los elementos */
    max-width: 400px; /* Puedes ajustar este valor según el espacio disponible */
    padding: 10px;
}

/* Cada evento dentro del hover */
.event-item {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
    list-style: none;
    display: flex;
    flex-direction: column;
    min-width: 150px; /* Ancho mínimo para cada tarjeta de evento */
    max-width: 200px; /* Ancho máximo para controlar el tamaño */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    word-wrap: break-word; /* Ajusta el texto dentro del card si es demasiado largo */
}

/* Para garantizar que los eventos se adapten al ancho disponible en la lista */
.event-list-container {
    display: flex;
    flex-wrap: wrap; /* Para que las tarjetas se ajusten y no se rompa el layout */
    gap: 16px; /* Espacio entre las tarjetas */
    padding: 20px;
}
  

  `;
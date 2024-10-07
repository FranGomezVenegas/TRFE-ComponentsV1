import { css } from "lit";

export const styles = css`
:host([disabled]) {
  margin: 30px;
  font-family: Montserrat;
}

* {
  box-sizing: border-box;
}

.black {
  color: #808080;
}

.yellow {
  color: yellow;
}

.red {
  color: red;
}

.actions-column {
  width: 200px; /* Ajusta el ancho según sea necesario */
}

.actions-column div {
  display: flex;
  justify-content: space-between;
}

.structuredbox-content {
  width: fit-content;
  border-radius: 4px;
  background-color: #24c0eb1a;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 2px solid #0465fb;
}

.structuredbox-content_allowmove_false {
  width: 100%;
  border-radius: 4px;
  background-color: #aca2a2;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 2px solid #03A9F4;
  height: 100%;
  min-width: 300px;
  min-height: 500px;
}

.structuredbox-content_allowmove_true {
  width: fit-content;
  border-radius: 4px;
  background-color: #20B2AA;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 2px solid #03A9F4;
  min-width: 300px;
  min-height: 500px;
}

.unstructuredbox-content {
  width: fit-content;
  border-radius: 4px;
  background-color: #24c0eb1a;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 2px solid #0465fb;
}

.unstructuredbox-content_allowmove_false {
  width: 100%;
  border-radius: 4px;
  background-color: #aca2a2;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 2px solid #03A9F4;
  height: 100%;
  min-width: 300px;
  min-height: 500px;
}

.unstructuredbox-content_allowmove_true {
  width: fit-content;
  border-radius: 4px;
  background-color: #20B2AA;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border: 2px solid #03A9F4;
  min-width: 300px;
  min-height: 500px;
}

.box {
  width: 80px;
  height: 80px;
  background-color: rgb(191 231 241);
  border: 2px solid rgb(119 206 230);
  padding: 2px;
  color: white;
  cursor: pointer;
  flex: 1;
}

.row-num {
  color: white;
  width: 20px;
  height: 80px;
  display: flex;
  align-items: center;
}

.col-num {
  color: white;
  width: 80px;
  height: 20px;
  text-align: center;
  flex: 1;
}

.row-content {
  display: flex;
  flex-direction: row;
  gap: 2px;
}

.first-item {
  width: 20px;
  height: 20px;
}

.position {
  display: flex;
  justify-content: space-between;
}

.data-view {
  min-height: 100px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
  text-align: center;
  flex-direction: column;
  background-color: #50dcf7;
  border: 2px solid #1473e6;
  margin-bottom: 5px;
}

.data-view.custom {
  display: grid;
  gap: 2px; /* Reducimos el espacio entre entradas */
}

.data-view.custom > div {
  margin: 0; /* Eliminamos el margen entre los elementos hijos */
  padding: 2px; /* Reducimos el padding para que ocupe menos espacio */
}

.circle {
  min-width: 20px;
  min-height: 20px;
  padding: 5px;
  display: inline-block;
  text-align: center;
  background-color: #24C0EB;
  border-radius: 50%;
  color: white;
  line-height: 1;
  font-size: 14px;
}


.accept-btn {
  background-color: rgba(36, 192, 235, 1);
  border-radius: 4px;
  padding: 8px 12px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

.view-btn {
  border: 2px solid rgba(36, 192, 235, 1);
  background-color: #54CCEF;
  border-radius: 4px;
  padding: 8px 12px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

.view-btn.active {
  color: rgb(19, 11, 111);
  background-color: #8DDDF4;
}

.box.active {
  border-color: #FF8E00;
}

.selected-cell-content {
  color: rgb(19, 11, 111);
  border: 2px solid #03A9F4;
  border-radius: 8px;
  background-color: #42BFF7;
  text-align: left;
  padding: 4px 8px;
}

table {
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #04AA6D;
  color: white;
}

tr {
  background-color: white;
}

table, td, th {
  border: 1px solid #03A9F4;
}

table.dragdropable.TRAZiT-DefinitionArea thead tr th {
  background-color: #2989d8 !important;
  color: white;
}

table.dragdropable.TRAZiT-UsersArea thead tr th {
  background-color: white;
  color: gray;
}

table.dragdropable {
  border-collapse: collapse;
  width: 100%;
  font-family: Montserrat;
  font-size: 16px;
}

table.dragdropable.TRAZiT-UsersArea tr {
  border: none;
  border-bottom: 1px solid #dddddd;
}

table.dragdropable tr {
  border: 1px solid #dddddd;
  text-align: center;
  color: #808080;
}

table.dragdropable.TRAZiT-UsersArea tr:nth-child(even) {
  background-color: rgb(214, 233, 248);
}

table.dragdropable.TRAZiT-UsersArea tr:last-child {
  border: none;
}

table.dragdropable.TRAZiT-UsersArea thead {
  border-bottom: 1px solid #dddddd;
}

table.dragdropable tr:nth-child(even) {
  background-color: rgb(214, 233, 248);
}

table.dragdropable.TRAZiT-DefinitionArea th {
  padding: 16px 20px;
  background-color: #2989d8 !important;
  border: 1px solid #dddddd !important;
}

table.dragdropable td, th {
  padding: 16px 20px;
  border: 1px solid #dddddd !important;
}

table.dragdropable.TRAZiT-UsersArea td, th {
  border: none !important;
}

table.dragdropable tr {
  cursor: pointer;
}

table.dragdropable.TRAZiT-DefinitionArea tr:hover td {
  background-color: #2989d830 !important;
}

table.dragdropable.TRAZiT-UsersArea tr:hover td {
  background-color: #2989d830 !important;
}

.dragdropable {
  width: 100%;
  table-layout: auto;
}

.TRAZiT-DefinitionArea {
  width: 100%;
}

/* Añade estas clases si no están presentes para manejar el scroll */
.scrollable-container {
  flex: 1;
  overflow-y: auto;
}

/* Nuevas reglas para el layout */
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 30px;
  height: 100%;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: flex-start;
  width: 100%;
  height: 100%;
}

.col {
  flex: 1 1 33%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  margin-left: 20px;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }

  .col {
    margin-left: 0;
  }
:root {
		--md-list-container-color: #f4fbfa;
		--md-list-item-label-text-color: #161d1d;
		--md-list-item-supporting-text-color: #3f4948;
		--md-list-item-trailing-supporting-text-color: #3f4948;
		--md-list-item-label-text-font: system-ui;
		--md-list-item-supporting-text-font: system-ui;
		--md-list-item-trailing-supporting-text-font: system-ui;
	  }
      textarea {
        width: 100%;
        height: 150px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-family: Arial, sans-serif;
        font-size: 16px;
        box-sizing: border-box;
        resize: vertical; /* Permite que el usuario cambie el tamaño vertical del textarea */
      }
      textarea:focus {
        outline: none;
        border-color: #4a90e2; /* Color del borde al enfocar */
      }      
        .flex-container {
          display: flex;
          flex-direction: row; /* Reemplazo de vertical */
          justify-content: left; /* Reemplazo de Alignment.CENTER */
          align-items: center;
        }      
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
        md-text-button {
          margin: 0 2px;
        }
        md-text-button[hidden] {
          display: none;
        }
        md-filled-text-field[hidden] {
          display: none;
        }
        .reopenPart {
          display: flex; /* Reemplazo de displayFlex */
          flex-direction: column; /* Reemplazo de vertical */
        }
        .dialogButton {
          width: 100%;
          left: 21px;
          top: -29px;
        }
        /* Estilo para md-filled-select (lista desplegable) */
md-filled-select {
  --md-comp-filled-select-container-background-color: rgba(255, 255, 255, 1); /* Fondo del contenedor */
  --md-comp-filled-select-active-indicator-color: rgba(36, 192, 235, 1); /* Color de la línea inferior al seleccionar */
  --md-comp-filled-select-dropdown-icon-color: rgba(36, 192, 235, 1); /* Color del icono del dropdown */
  --md-comp-filled-select-hover-active-indicator-color: rgba(36, 192, 235, 1); /* Color de la línea en hover */
  --md-comp-filled-select-label-text-color: #148CFA; /* Color de la etiqueta */
  --md-comp-filled-select-disabled-dropdown-icon-color: rgba(36, 192, 235, 1); /* Icono del dropdown deshabilitado */
  --md-comp-filled-select-focus-active-indicator-color: rgba(186, 235, 248, 0.4); /* Color de la línea cuando tiene foco */

  font-family: Montserrat;
  font-weight: bold;
  font-size: 19px;
}


        /* Estilo para md-select-option (opciones en la lista) */
        md-select-option {
          background-color: rgba(255, 255, 255, 1) !important; /* Fondo blanco para las opciones */
          color: black; /* Color del texto para las opciones */
        }

        /* Estilo para md-filled-text-field (campo de texto) */
        md-filled-text-field {
          --_container-color: rgba(255, 255, 255, 1); /* Fondo blanco */
          --_text-field-container-color: rgba(255, 255, 255, 1); /* Fondo blanco */
          --_text-field-active-indicator-color: rgba(49, 130, 189, 1); /* Color del borde activo */
          --md-comp-filled-text-field-container-background-color: rgba(255, 255, 255, 1); /* Fondo del contenedor */
        }

        md-icon{
          font-size: 34px; /* Tamaño de los iconos */
          width: 34px;     /* Asegura el ancho */
          height: 34px;    /* Asegura la altura */
          box-sizing: content-box; /
        }
        .icon-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px; /* Ancho del botón */
          height: 40px; /* Altura del botón */
          border: 2px solid #cccccc; /* Borde del botón */
          border-radius: 50%; /* Hacerlo circular */
          font-size: 24px; /* Tamaño del ícono */
          color: #12805c; /* Color del ícono */
          cursor: pointer;
        }
        .icon-button:hover {
          background-color: #f0f0f0; /* Efecto hover */
        }
            md-dialog::part(surface) {
                background-color: white !important; /* Fondo blanco */
                color: black; /* Color de texto negro */
            }

            /* Alternativa si ::part no funciona, forzamos estilos del diálogo directamente */
            md-dialog {
                --md-dialog-container-color: white; /* Forzar el fondo blanco en el contenedor */
                background-color: white; /* Fondo blanco en el diálogo */
                color: black;
            }    
.selected-item table {
  width: 100%;
  border-collapse: collapse;
}

.selected-item th, .selected-item td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.selected-item th {
  background-color: #04AA6D;
  color: white;
}

.selected-item tr {
  background-color: white;
}

}
`
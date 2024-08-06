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

.add-circle {
  margin-top: 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: white;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  color: #03A9F4;
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
  background-color: white;
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
}
`
import { css } from "lit-element";

export const styles = css`
  :host([disabled]) {
  }
  * {
    box-sizing: border-box;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    color: white;
  }
  
  th, td {
    text-align: left;
    padding: 8px;
  }
  
  th {
    background-color: #04AA6D;
    color: white;
  }

  table, td, th {
    border: 1px solid #03A9F4;
  }
  table.dragdropable.TRAZiT-DefinitionArea {

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
    background-color: rgba(214, 233, 248, 0.37);
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

  .undropable {
    cursor: no-drop !important;
  }
`
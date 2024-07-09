import { css } from "lit-element";

export const styles = css`
  :host([disabled]) {
  }
  * {
    box-sizing: border-box;
  }
  .title {
    color: #2989d8;
    font-size: 18px;
    font-weight: bold;
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

  ul.column-list {
    -webkit-columns: var(
      --num-columns,
      3
    ); /* Number of columns */
    -moz-columns: var(--num-columns, 3);
    columns: var(--num-columns, 3);
    -webkit-column-gap: 10px; /* Spacing between columns */
    -moz-column-gap: 10px;
    column-gap: 10px;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  ul.column-list1 {
    -webkit-columns: 1; /* Number of columns */
    -moz-columns: 1;
    columns: 1;
    -webkit-column-gap: 10px; /* Spacing between columns */
    -moz-column-gap: 10px;
    column-gap: 10px;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  ul.column-list2 {
    -webkit-columns: 2; /* Number of columns */
    -moz-columns: 2;
    columns: 2;
    -webkit-column-gap: 10px; /* Spacing between columns */
    -moz-column-gap: 10px;
    column-gap: 10px;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  ul.column-list3 {
    -webkit-columns: var(
      --num-columns,
      3
    ); /* Number of columns */
    -moz-columns: var(--num-columns, 3);
    columns: var(--num-columns, 3);
    -webkit-column-gap: 10px; /* Spacing between columns */
    -moz-column-gap: 10px;
    column-gap: 10px;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  ul.column-list4 {
    -webkit-columns: 4; /* Number of columns */
    -moz-columns: 4;
    columns: 4;
    -webkit-column-gap: 10px; /* Spacing between columns */
    -moz-column-gap: 10px;
    column-gap: 10px;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  ul.column-list li {
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
    margin-left: 30px;
    hyphens: auto;
    word-break: break-all;
  }
  span.relevantlabel {
    font-weight: bold;
    font-size: 16px;
  }
  span.label {
    font-weight: bold;
  }
  div#mainaddborder {
    border: 0.72px solid rgba(36, 192, 235, 1);
    border-radius: 10px;
    padding: 10px;
    margin-right: 2px;
    overflow: hidden;
    flex-basis: calc(33.33% - 10px);
  }
  iframe {
    width: 100%;
    height: 250px;
    flex: 1;
  }
  /* Dialog styles */
  .dialog {
    display: none;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 1000px;
    height: 600px;
    background-color: white; /* rgba(0, 0, 0, 0.5); */
  }

  /* Iframe styles */
  #my-iframe {
    width: 100%;
    height: 100%;
    border: none;
    flex: 1;
  }
  @keyframes slidein {
    from {
      margin-left: 30%;
    }
    to {
      margin-left: 0%;
    }
  }
  @media (max-width: 460px) {
  }
  iframe::shadow
    .pdf-viewer::content
    #controls
    ::slotted(.SwitchToReadingMode-Small14) {
    display: none;
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
  }

  .card {
    flex: 0 0 calc(33.33% - 20px);
    margin: 10px;
    border: 1px solid #ccc;
    padding: 10px;
  }

  @media (max-width: 768px) {
    .card {
      flex: 0 0 calc(50% - 20px);
    }
  }

  @media (max-width: 480px) {
    .card {
      flex: 0 0 calc(100% - 20px);
    }
  }
  
  /* Smart Filter Container */
.smart-filter-container {
    background: rgb(36, 192, 235);
    padding: 15px;
    border-radius: 10px;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Smart Filter Buttons */
.smart-filter-button {
    background: linear-gradient(79deg, #4668db, #9d70cd);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.smart-filter-button:hover {
    opacity: 0.9;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.smart-filter-button:active {
    transform: translateY(2px);
}

/* Smart Filter Fields */
.smart-filter-field {
    margin: 10px 0;
}

.smart-filter-field mwc-select, .smart-filter-field mwc-textfield {
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    transition: all 0.3s ease;
}

.smart-filter-field mwc-select:hover, .smart-filter-field mwc-textfield:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Smart Filter Actions */
.smart-filter-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

/* Table Styling */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

th, td {
    border: 1px solid #ccc;
    padding: 15px;
    text-align: left;
}

th {
    background: linear-gradient(79deg, #4668db, #9d70cd);
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

tr:nth-child(even) {
    background: #f9f9f9;
}

tr:hover {
    background: #f1f1f1;
    transition: background 0.3s ease;
}

/* Row Buttons */
.row-button {
    background: linear-gradient(79deg, #4668db, #9d70cd);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.row-button:hover {
    opacity: 0.9;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.row-button:active {
    transform: translateY(2px);
}


`
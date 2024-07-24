// Archivo: serial-port-styles.js
import { css } from 'lit';

export const styles = css`
  :host {
    left:10px;
    position:relative;
    display: block;
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    background: -webkit-linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Para Chrome y Safari */
    background: -moz-linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Para Firefox */
    background: -o-linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Para Opera */
    background: linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Estándar */  

    font-family: Montserrat;
    width: 700px; /* Ancho fijo */
  }
  /* Estilos para el diálogo */
  mwc-dialog {
    background: -webkit-linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Para Chrome y Safari */
    background: -moz-linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Para Firefox */
    background: -o-linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Para Opera */
    background: linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Estándar */  
    max-width: 90%; /* Ajusta este valor según tus necesidades */
    overflow-x: hidden; /* Quita el scroll horizontal */
  }
  
  mwc-dialog > .mdc-dialog__surface {
    overflow-x: hidden; /* Asegura que el contenido del diálogo no cause desbordamiento horizontal */
  }
  
  mwc-dialog .content {
    overflow-x: hidden; /* Asegura que el contenido del diálogo no cause desbordamiento horizontal */
    max-width: 100%; /* Asegura que el contenido del diálogo se ajuste al ancho del diálogo */
    box-sizing: border-box; /* Incluye el padding y el borde en el ancho total */
  }    
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .left-column {
    width: 400px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .right-column {
    width: 300px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    margin-left: 16px; /* Espacio entre columnas */
  }
  .standard-button {
    padding: 8px 16px;
    margin-top: 8px;
    border: none;
    border-radius: 4px;
    background: -webkit-linear-gradient(79deg, #4668db, #9d70cd); /* Para Chrome y Safari */
    background: -moz-linear-gradient(79deg, #4668db, #9d70cd); /* Para Firefox */
    background: -o-linear-gradient(79deg, #4668db, #9d70cd); /* Para Opera */
    background: linear-gradient(79deg, #4668db, #9d70cd); /* Estándar */    
    color: white;
    cursor: pointer;
  }


  .standard-button:hover {
    transform: scale(1.05); /* Aumentar ligeramente el tamaño */
    background: -webkit-linear-gradient(19deg, #4668db, #9d70cd); /* Para Chrome y Safari */
    background: -moz-linear-gradient(19deg, #4668db, #9d70cd); /* Para Firefox */
    background: -o-linear-gradient(19deg, #4668db, #9d70cd); /* Para Opera */
    background: linear-gradient(19deg, #4668db, #9d70cd); /* Estándar */    
  }

  .icon-button {
    padding: 8px;
    margin-top: 8px;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    color: #007bff; /* Color del icono */
    cursor: pointer;
    font-size: 16px;
    transition: transform 0.2s; /* Transición suave */
  }

  .icon-button:hover {
    transform: scale(1.2); /* Aumentar ligeramente el tamaño en hover */  
    background-color: transparent;  
  }

    

  button:hover {
    background-color: #0056b3;
  }


  .button-row {
    width:380px;
  }

  textarea {
    width: 100%;
    height: 150px;
    padding-top: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    resize: none;
    font-size: 14px;
    margin-top: 8px;
    white-space: pre-wrap; /* Mantener formato en log */
  }

  input[type="text"] {
    width: 100%;
    padding-top: 10px;
    margin-bottom: 0px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  input[type="number"] {
    width: 60px;
    margin-top: 8px;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  label {
    font-size: 14px;
    margin-right: 8px;
  }

  div {
    margin-top: 16px;
  }
 table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 0px;
  }

  th, td {
    padding: 8px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  th {
    background: -webkit-linear-gradient(19deg, #4668db, #9d70cd); /* Para Chrome y Safari */
    background: -moz-linear-gradient(19deg, #4668db, #9d70cd); /* Para Firefox */
    background: -o-linear-gradient(19deg, #4668db, #9d70cd); /* Para Opera */
    background: linear-gradient(19deg, #4668db, #9d70cd); /* Estándar */       
    color:white;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  .dragdropabletr {
    cursor: move;
  }

  .left-area {
    display: flex;
    align-items: center;
  }    
`;

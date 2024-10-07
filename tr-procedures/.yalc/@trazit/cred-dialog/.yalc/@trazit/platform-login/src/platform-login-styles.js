import { css } from 'lit';

export const platformLoginStyles = css`
  :host {
    display: block;
  }
  :host([hidden]) {
    display: none;
  }
  .login-box {
    background: #ffffff;
    background: rgba(255, 255, 255, 1);
    border-radius: 67px;
    padding: 20px;
    filter: drop-shadow(0 0 8px rgba(120, 217, 255));
    box-shadow: 16px 14px 20px #0000008c;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    display: flex;
    flex-direction: column;
    align-items: center; /* Horizontal centering */
    justify-content: center; /* Vertical centering */
  }
  .login-box.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .appLoginLogoOnTop {
    height: 5.08vmax;
    width: 17vmax;
    padding-bottom: 15px;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    transition-delay: 0.1s;
  }
  .appLoginLogoOnTop.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  elevated-button {
    transition-delay: 0.6s;
    text-align: center;
    background: linear-gradient(179deg, #4668db, #9d70cd);
    border-radius: 35px;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    color: #ffffff;
    border-color: transparent !important;
  }
  mwc-icon-button#lang {
    color: rgba(36, 192, 235, 1);
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    transition-delay: 0.8s;
  }
  mwc-icon-button#lang.visible {
    opacity: 1;
    transform: translateY(0);
  }



  @media (max-width: 460px) {
    :host {
      display: block;
      width: 300px;
    }
    .login-box {
      padding: 10px 0;
    }
    .content {
      width: 100%;
    }
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .modal-content {
      background-color: white;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      max-width: 400px;
    }
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  }
  .role-container {
    display: flex;
    flex-direction: column;
  }
  .role-chip {
    margin: 5px;
    padding: 5px;
    font-family: Montserrat;
    font-size: 18px;
    text-align: center;
    color: rgb(36, 192, 235);
    border: 1px solid rgb(36, 192, 235);
    border-radius: 10px;
    transition: all 0.2s;
    cursor: pointer;
    text-transform: capitalize;
    flex: 1;
  }
  .role-chip:hover {
    color: white;
    font-weight: bold;
    background-color: rgb(36, 192, 235);
    transform: scale(1.02);
  }
  #rolesSelector {
    position: absolute;
    top: 30%;
    left: 10%;
    z-index: 1000; /* Asegura que esté sobre otros elementos */
    transform: translate(-10%, -30%);
  }    
  .modal-title {
    margin: 8px 0 12px;
    font-family: Montserrat;
    color: rgb(36, 192, 235);
    font-size: 24px;
    font-weight: 500;
    text-align: center;
  }
  .modal-footer {
    display: none;
  }
  /* New Styles for Input Fields */
  mwc-textfield {
    --mdc-theme-primary: #6767ec; /* Primary color */
    --mdc-text-field-idle-line-color: #6767ec;
    --mdc-text-field-outlined-idle-border-color: #6767ec;
    --mdc-text-field-label-ink-color: #6767ec;
    --mdc-text-field-focused-label-color: #6767ec;
    --mdc-text-field-ink-color: #6767ec;
  }    
  md-filled-text-field {
    --md-filled-text-field-container-color: transparent;
    //background: linear-gradient(79deg, #4668db, #9d70cd);
    border-radius: 4px; /* Mantén el radio de borde consistente */
    padding: 4px; /* Añadir algo de padding para que el fondo se vea correctamente */
  }

  /* Ajusta la opacidad del relleno interno para asegurar que el texto sea legible */
  md-filled-text-field::part(container) {
    background: transparent; /* Hace que el fondo del container sea transparente */
  }

  /* Ajusta la opacidad del label para que se vea mejor sobre el gradiente */
  md-filled-text-field::part(label) {
    color: white; /* Cambiar el color del label */
  }
.input mwc-textfield,
  .input elevated-button {
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .input mwc-textfield.visible,
  .input elevated-button.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .input mwc-textfield:nth-child(1) {
    transition-delay: 0.2s;
  }
  .input mwc-textfield:nth-child(2) {
    transition-delay: 0.4s;
  }   

  md-filled-text-field {
    --md-filled-text-field-container-color: transparent;
    --md-filled-text-field-focus-label-color: white; /* Color del label cuando está enfocado */
    --md-filled-text-field-ink-color: white; /* Color del texto escrito */
    /* --md-filled-text-field-hover-state-layer-color: transparent; */ /* Elimina el color de fondo al hacer hover */
    --md-filled-text-field-focus-state-layer-color: transparent; /* Elimina el color de fondo al enfocar */
    /* background: linear-gradient(79deg, #4668db, #9d70cd); */
    border-radius: 4px;
    padding: 4px;
  }

  md-filled-text-field::part(container) {
    background: transparent; /* Hace que el fondo del container sea transparente */
  }

  md-filled-text-field::part(label) {
    color: white; /* Cambiar el color del label */
  }

  md-filled-text-field::part(input-field) {
    background: transparent !important; /* Asegúrate de que el fondo del input sea transparente */
    color: white; /* Color del texto escrito */
  }

  md-filled-text-field::part(active-indicator) {
    background: transparent !important; /* Quita el color de fondo al hacer clic */
  }     
  /* Sobrescribir estilos para el autofill */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgba(70, 104, 219, 1) inset !important; /* Ajusta el color aquí */
    box-shadow: 0 0 0 30px rgba(70, 104, 219, 1) inset !important; /* Ajusta el color aquí */
    -webkit-text-fill-color: white !important;
    caret-color: white !important;
  }

  /* Sobrescribir estilos específicos para Firefox */
  input:-moz-autofill {
    background-color: rgba(70, 104, 219, 1) !important;
    color: white !important;
  }    

`;

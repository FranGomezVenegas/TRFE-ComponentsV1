import { css } from 'lit';

export const buttonStyles = css`
  mwc-button {
    background-color: #1473e6; /* Color de fondo */
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    --mdc-theme-primary: #1473e6;
    border-radius: 12px;
  }

  mwc-button.button {
    color: #1473e6;
    background: rgb(36, 192, 235) none repeat scroll 0% 0%;
    color: white;
    border-color: transparent !important;
    --mdc-button-fill-color: red;
    --mdc-button-ink-color: blue;
    border-radius: 12px;
  }

  mwc-icon-button {
    color: #1473e6;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
  }

  mwc-icon-button.disabledtrue {
    color: red;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
  }

  mwc-icon-button#lang {
    color: #1473e6;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
  }

  mwc-icon-button#video {
    color: #1473e6;
  }

  sp-button {
    background: #1473e6;
    border-color: inherit !important;
    border-radius: 35px;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    color: rgb(255, 255, 255);
  }

  mwc-textfield {
    border-style: solid;
    border-color: rgba(153, 153, 153, 1);
    border-width: 1px;
    border-radius: 7px;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    background-color: rgb(255, 255, 255);
  }

  mwc-textfield.mdc-text-field {
    background-color: rgb(255, 255, 255);
  }

  mwc-textfield.mdc-textfield.mdc-floating-label {
    color: red;
  }
`;

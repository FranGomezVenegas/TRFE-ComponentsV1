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
  .input mwc-textfield,
  .input sp-button {
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .input mwc-textfield.visible,
  .input sp-button.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .input mwc-textfield:nth-child(1) {
    transition-delay: 0.2s;
  }
  .input mwc-textfield:nth-child(2) {
    transition-delay: 0.4s;
  }
  sp-button {
    transition-delay: 0.6s;
    background: rgba(36, 192, 235, 1);
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

  /* New Styles for Input Fields */
  mwc-textfield {
    --mdc-theme-primary: #6767ec; /* Primary color */
    --mdc-text-field-idle-line-color: #6767ec;
    --mdc-text-field-outlined-idle-border-color: #6767ec;
    --mdc-text-field-label-ink-color: #6767ec;
    --mdc-text-field-focused-label-color: #6767ec;
    --mdc-text-field-ink-color: #6767ec;
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
`;

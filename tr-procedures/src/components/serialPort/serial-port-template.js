// Archivo: serial-port-template.js
import { html } from 'lit';

export const template = (isSendEnabled, lang, messages, isTimeoutEditable, handleKeyDown, canSendData) => html`
  ${isSendEnabled ? html`
    <input type="text" id="userInput" placeholder="${messages.enterText[lang]}" @keydown="${handleKeyDown}" ?disabled="${!canSendData}">
  ` : ''}
  <button id="connectButton">${messages.connect[lang]}</button>
  <button id="closeButton">${messages.closeConnection[lang]}</button>
  <button class="icon-button" id="clearLogButton" title="Clear Log">🗑️</button>
  <textarea id="output" readonly></textarea>
  <div>
    <label for="timeout">${messages.timeout[lang]}:</label>
    <input type="number" id="timeout" value="3" min="1" step="1" ?disabled="${!isTimeoutEditable}">
  </div>
`;

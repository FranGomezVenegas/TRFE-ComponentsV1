// Archivo: serial-port-template.js
import { html } from 'lit';

export const template = html`
  <div class="buttons">
    <button id="connectButton">Connect to Serial Port</button>
    <button id="closeButton">Close Connection</button>
  </div>
  <textarea id="output" readonly></textarea>
  <div>
    <label for="timeout">Timeout (seconds):</label>
    <input type="number" id="timeout" value="3" min="1" step="1">
  </div>
`;

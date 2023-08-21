import { html } from "lit-element";
import { nothing } from "lit-html";
import '@granite-elements/granite-qrcode-scanner/granite-qrcode-scanner.js';

export const template = (props) => {
  const { decoded, isDetecting, handleDecoded } = props;
  return html`
    ${
      isDetecting ? 
      html`<div class="container">
        <granite-qrcode-scanner 
          active 
          continuous
          @qrcode-decoded=${handleDecoded} 
        ></granite-qrcode-scanner>
      </div>` : nothing
    }
    
    <div class="container">
      <button id="startDetect" class="button">Detect</button>
      <input 
        type="text" 
        readonly 
        class="input"
        value=${decoded} 
      />
    </div>
  `;
}
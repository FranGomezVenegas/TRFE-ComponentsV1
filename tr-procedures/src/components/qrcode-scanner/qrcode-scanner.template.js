import { html } from "lit-element";
import { nothing } from "lit-html";
import '@granite-elements/granite-qrcode-scanner/granite-qrcode-scanner.js';
import '@cicciosgamino/qr-code-element'

export const template = (props) => {
  const { encoded, decoded, isDetecting, handleDecoded, stopDetect } = props;
  return html`
    <div class="container">
      <qr-code-element
        text=${encoded}
        graphic-element="canvas"
        error-correction="medium"
        mask-pattern="-1">
      </qr-code-element>

      <input type="text" id="encode" class="input" />
    </div>

    ${isDetecting ?
      html`<div class="container">
         <granite-qrcode-scanner 
          active 
          continuous
          debug="false"
          @qrcode-decoded=${handleDecoded} 
        ></granite-qrcode-scanner> 
      </div>` : nothing
    }
    
    <div class="container">
      <button id="startDetect" class="button">Detect</button>
      ${isDetecting ? html`<button id="stopDetect" class="button">Stop</button>` : nothing}
      <input 
        type="text" 
        readonly 
        class="input"
        value=${decoded} 
      />
    </div>
  `;
}

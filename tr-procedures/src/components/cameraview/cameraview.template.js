import { html } from "lit-element";

export const template = (props, lang) => {
  return html`
    <div class="container">
      <video id="video" width="240" height="180" autoplay></video>
      <canvas id="viewport" width="240" height="180"></canvas>
    </div>

    <div class="button-container">
      <button id="start" class="button">${lang===undefined||lang==="en"?"Start Camera":"Iniciar Cámara"}</button>
      <button id="capture" class="button">${lang===undefined||lang==="en"?"Capture":"Capturar"}</button>
      <button id="upload" class="button">${lang===undefined||lang==="en"?"Upload":"Subir"}</button>      
    </div>
  `
}
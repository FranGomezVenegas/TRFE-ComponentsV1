import { html } from "lit-element";

export const template = (props) => {
  return html`
    <div class="container">
      <video id="video" width="320" height="240" autoplay></video>
      <canvas id="viewport" width="320" height="240"></canvas>
    </div>

    <div class="container">
      <button id="start" class="button">Start Camera</button>
      <button id="capture" class="button">Capture</button>
      <button id="upload" class="button">Upload</button>
    </div>
  `
}
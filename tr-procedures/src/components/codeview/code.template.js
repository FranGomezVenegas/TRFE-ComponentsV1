import { html } from "lit-element";

export const template = (props) => {
  return html`
    <div class="container">
      <div class="codeContainer">
        <input id="qrCodeInput" class="input" type="text" />
        <div id="qrCodeContainer"></div>
      </div>
      <div class="codeContainer">
        <input id="barCodeInput" class="input" type="text" />
        <div id="qrCodeContainer"></div>
      </div>
    </div>

    <div class="container">
      <button id="scanQRCode" class="button">Scan QRCode</button>
      <button id="scanBarCode" class="button">Scan BarCode</button>
    </div>
  `
}
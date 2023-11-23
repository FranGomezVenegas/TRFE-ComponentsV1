import { LitElement } from "lit-element";
import { template } from "./qrcode-scanner.template";
import { styles } from "./qrcode-scanner.css";
// import '@granite-elements/granite-qrcode-scanner/granite-qrcode-scanner.js';

export class QRCodeScanner extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      decoded: { type: String },
      encoded: { type: String },
      isDetecting: { type: Boolean },
      startDetectBtn: { state: true }
    };
  }

  constructor() {
    super();
    this.decoded = "";
    this.encoded = "";
    this.isDetecting = false;
  }

  render() {
    return template({
      decoded: this.decoded,
      encoded: this.encoded,
      isDetecting: this.isDetecting,
      handleDecoded: this._onDecoded
    });
  }

  firstUpdated() {
    this.encodeInput = this.shadowRoot.querySelector("#encode");
    this.startDetectBtn = this.shadowRoot.querySelector("#startDetect");
    this.encodeInput.addEventListener('change', this._changeEncode);
    this.startDetectBtn.addEventListener('click', this._startDetect);
  }

  _startDetect = () => {
    this.isDetecting = true;
  }

  _changeEncode = (event) => {
    this.encoded = event.target.value;
  }

  _onDecoded = (e) => {
    if (e.detail === 'error decoding QR Code')
      return;
    this.decoded = e.detail;
    this.isDetecting = false;
  }
}

customElements.define("qrcode-scanner", QRCodeScanner);
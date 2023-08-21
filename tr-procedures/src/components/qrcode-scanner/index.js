import { LitElement } from "lit-element";
import { template } from "./qrcode-scanner.template";
import { styles } from "./qrcode-scanner.css";
import '@granite-elements/granite-qrcode-scanner/granite-qrcode-scanner.js';

export class TrazitQRCodeScanner extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      decoded: { type: String },
      isDetecting: { type: Boolean },
      startDetectBtn: { state: true }
    };
  }

  constructor() {
    super();
    this.decoded = "";
    this.isDetecting = false;
  }

  render() {
    return template({
      decoded: this.decoded,
      isDetecting: this.isDetecting,
      handleDecoded: this._onDecoded
    });
  }

  firstUpdated() {
    this.startDetectBtn = this.shadowRoot.querySelector("#startDetect");
    this.startDetectBtn.addEventListener('click', this._startDetect);
  }

  _startDetect = () => {
    this.isDetecting = true;
  }

  _onDecoded = (e) => {
    if (e.detail === 'error decoding QR Code')
      return;
    this.decoded = e.detail;
    this.isDetecting = false;
  }
}

customElements.define("trazit-qrcode-scanner", TrazitQRCodeScanner);
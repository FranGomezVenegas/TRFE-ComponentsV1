import { LitElement } from 'lit-element';
import { template } from './code.template';
import { styles } from './code.css';


export class CodeView extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      qrCodeInput: { state: true },
      barCodeInput: { state: true },      
      scanQRCodeBtn: { state: true },
      scanBarCodeBtn: { state: true },
      qrCodeContainer: { state: true },
      barCodeContainer: { state: true },
    };
  }

  constructor() {
    super();
  }
  
  firstUpdated() {
    this._init();
  }

  render() {
    return template({});
  }

  _init = () => {
    this.qrCodeInput = this.shadowRoot.querySelector("#qrCodeInput");
    this.barCodeInput = this.shadowRoot.querySelector("#barCodeInput");
    this.scanQRCodeBtn = this.shadowRoot.querySelector("#scanQRCode");
    this.scanBarCodeBtn = this.shadowRoot.querySelector("#scanBarCode");
    this.qrCodeContainer = this.shadowRoot.querySelector("#qrCodeContainer");
    this.barCodeContainer = this.shadowRoot.querySelector("#barCodeContainer");

    this.qrCodeInput.addEventListener('keyup', this._handleQRInputChange);
    this.barCodeInput.addEventListener('keyup', this._handleBarInputChange);

    this.qrCodeInput.value = "QRCode";
    this.barCodeInput.value = "BarCode";

    this._generateQRCode(this.qrCodeInput.value);
  }

  _generateQRCode = (text) => {
    const qrCodeElement = showQRCode(text);
    if(this.qrCodeContainer.lastChild)
      this.qrCodeContainer.replaceChild(qrCodeElement, this.qrCodeContainer.lastChild);
    else
      this.qrCodeContainer.appendChild(qrCodeElement);
  }

  _handleQRInputChange = (event) => {
    this._generateQRCode(event.target.value);    
  }

  _handleBarInputChange = (event) => {
    const text = event.target.value;
    console.log(text);
  }
}

window.customElements.define('code-view', CodeView);

import { LitElement } from 'lit-element';
import { styles } from './cameraview.css';
import { template } from './cameraview.template';


export class CameraView extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      video: { state: true },
      viewport: { state: true },
      record: { state: true },
      capture: { state: true },
      imageDataUrl: { type: String }
    };
  }

  constructor() {
    super();
  }
  
  firstUpdated() {
    this.video = this.shadowRoot.querySelector("#video");
    this.viewport = this.shadowRoot.querySelector("#viewport");
    this.startBtn = this.shadowRoot.querySelector("#start");
    this.captureBtn = this.shadowRoot.querySelector("#capture");
    this.uploadBtn = this.shadowRoot.querySelector("#upload");
    this._init();
  }

  render() {
    return template({});
  }

  _init = () => {
    this.startBtn.addEventListener('click', this._startCamera);
    this.uploadBtn.addEventListener('click', this._upload); 
    this.captureBtn.addEventListener('click', this._capture);
  }

  _startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    this.video.srcObject = stream;
  }

  _capture = () => {
    const width = this.viewport.width;
    const height = this.viewport.height;

    this.viewport.getContext('2d').drawImage(this.video, 0, 0, width, height);
    this.imageDataUrl = this.viewport.toDataURL('image/jpeg');
  }

  _upload = async () => {
    if(!this.imageDataUrl) {
      console.log("Please Capture Image to upload");
      return;
    }

    try {
      const result = await fetch('/api/upload', {
        method: "POST",
        body: JSON.stringify({
          image: this.imageDataUrl
        })
      });
  
      console.log(result);
    } catch(e) {
      console.log("error");
    }
  }
}

window.customElements.define('camera-view', CameraView);

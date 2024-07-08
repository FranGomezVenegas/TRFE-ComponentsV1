import { LitElement } from 'lit-element';
import { styles } from './cameraview.css';
import { template } from './cameraview.template';
import { ApiFunctions } from '../Api/ApiFunctions';

export class CameraView extends ApiFunctions(LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      video: { state: true },
      viewport: { state: true },
      record: { state: true },
      capture: { state: true },
      imageDataUrl: { type: String },
      lang: { type: String },
      config: { type: Object },
      action: { type: Object },
      selectedItem: { type: Object },
      procInstanceName: String,

    };
  }

  constructor() {
    super();
    this.config={}
    this.action={}
    this.selectedItem={}    
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
    return template({}, this.lang);
  }

  _init = () => {
    this.startBtn.addEventListener('click', this._startCamera);
    this.uploadBtn.addEventListener('click', this._upload);
    this.captureBtn.addEventListener('click', this._capture);
  }

  _reset = () => {
    this.video.srcObject = null;
    this.viewport.getContext('2d').clearRect(0, 0, this.viewport.width, this.viewport.height);
  }

  _startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    this.video.srcObject = stream;
  }

  _captureYanko = () => {
    const width = this.viewport.width;
    const height = this.viewport.height;
    this.viewport.getContext('2d').drawImage(this.video, 0, 0, width, height);
    this.imageDataUrl = this.viewport.toDataURL('image/jpeg');
    // this.viewport.getContext('2d').clearRect(0, 0, width, height);
  }
  _capture = () => {
    const width = this.viewport.width;
    const height = this.viewport.height;
    const context = this.viewport.getContext('2d');

    // Draw the video frame to the canvas
    context.drawImage(this.video, 0, 0, width, height);

    // Get the image as a Data URL
    let captureimageDataUrl = this.viewport.toDataURL('image/jpeg', 0.9); // Adjust the quality if needed

    this.imageDataUrl = this.dataURLToBlob(captureimageDataUrl);
    // Optional: Clear the canvas (uncomment if necessary)
    // context.clearRect(0, 0, width, height);

    // Log the Data URL length to check the size
    console.log('Image Data URL length:', this.imageDataUrl.length);
  }

  dataURLToBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  base64ToBlob(base64, mime) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
    
  }
  downloadBlob(blob, fileName) {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  _upload = async () => {
    if (!this.imageDataUrl) {
      if (this.lang==='es'){
        alert('Por favor toma una foto antes, para subirla')
      }else{
        alert("Please Capture Image previously, to upload it");        
      }
      return;
    }
    //const dataUrl = this.imageDataUrl;
    //const base64String = dataUrl.split(',')[1];

    //const mimeType = 'image/jpeg';
    //const imageBlob = this.base64ToBlob(base64String, mimeType);
    //this.downloadBlob(imageBlob, "hola.jpeg")
    
    let form = new FormData();
    form.append('title', 'Sample');
    form.append('picture', this.imageDataUrl);
    let requestResult={}
    try{
        // URL parameters for the fetchApi call
        //let params = 'http://localhost:8081/TRAZiT-API/moduleProjectRnD/ProjectRnDAPIactions?actionName=FORMULA_ADD_INGREDIENT&dbName=demo_v0_9_2&procInstanceName=RandD&finalToken=eyJ1c2VyREIiOiJhZG1pbiIsImRhdGV0aW1lRm9ybWF0QXRQbGF0Zm9ybUxldmVsIjoiRElTQUJMRUQiLCJwcm9jc01vZHVsZU5hbWUiOiJpbnNwZWN0aW9uX2xvdCpJTlNQRUNUSU9OX0xPVFN8aW5zdHJ1bWVudHMqSU5TVFJVTUVOVFN8RGVtbypJTlNUUlVNRU5UU3xEaXNlYXNlU3R1ZGllcypDTElOSUNBTF9TVFVESUVTfG1iX2VtKk1PTklUT1JJTkd8c3RvY2sqU1RPQ0tTfG1vbl93YXRlcipNT05JVE9SSU5HfFJhbmREKlJhbmREIFBST0pFQ1RTIiwiZGJOYW1lIjoiZGVtb192MF85XzIiLCJ0eXAiOiJKV1QiLCJ1c2VyX3Byb2NlZHVyZV9oYXNoY29kZXMiOiJpbnNwZWN0aW9uX2xvdCoxKi03MDQyMTQ1NTZ8aW5zdHJ1bWVudHMqMSotOTQ0MTQ0NTQ3fERlbW8qMSoxNzcyNjIzMTI4fERpc2Vhc2VTdHVkaWVzKjEqMTk3NDc3MTczMXxtYl9lbSoxKjIzNDI0MjU0NXxzdG9jayoxKjEzNjEyMjU2OTF8bW9uX3dhdGVyKjEqMjA1MzgwNjg2NXxSYW5kRCoxKjEyMzg0NTgzNjUiLCJlU2lnbiI6ImZpcm1hZGVtbyIsInVzZXJEQlBhc3N3b3JkIjoidHJheml0IiwidXNlck1haWwiOiJORVd0cmF6aXQuaW5mb0BnbWFpbC5jb20iLCJ1c2VyX3Byb2NlZHVyZXMiOiJbaW5zcGVjdGlvbl9sb3QsIGluc3RydW1lbnRzLCBEZW1vLCBEaXNlYXNlU3R1ZGllcywgbWJfZW0sIHN0b2NrLCBtb25fd2F0ZXIsIFJhbmREXSIsImFwcFNlc3Npb25JZCI6IjYzODgiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJUdWUgTWF5IDIxIDE0OjM0OjE1IFVUQyAyMDI0IiwidXNlclJvbGUiOiJzdXBlcnVzZXIiLCJhbGciOiJIUzI1NiIsImludGVybmFsVXNlcklEIjoiNDU0ODkyMjMifQ.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.PNpQDZobs2EcR4L1pRUXE0lLDBNIZH2CDxexKTfidjk&formulaName=formula+nueva+1&ingredient=Almid%C3%B3n+de+ma%C3%ADz&quantity=100&quantityUom=mg&&isForTesting=false';

        let APIParams = this.getAPICommonParams(this.action)
        let endPointUrl = this.getActionAPIUrl(this.action)
        let serviceAPIurl=this.getServiceAPIUrl(this.action)
        if (String(endPointUrl).toUpperCase().includes("ERROR")) {
          alert(endPointUrl)
          return
        }
/*
        if (this.config !== undefined && serviceAPIurl !== undefined) {
          params = serviceAPIurl + endPointUrl
        } else {
          let userSession = JSON.parse(sessionStorage.getItem("userSession"))
          params = serviceAPIurl + endPointUrl
        }
*/
        /*let targetValue = {
          rawValueResult: '',
          resultId: this.selectedItem.result_id,
          eventId: this.selectedItem.event_id,
          instrumentName: this.selectedItem.instrument,
          variableName: this.selectedItem.param_name
        } */       
        let actionParams = this.jsonParam(this.action, this.selectedItem, undefined, this.selectedItem, undefined, undefined, undefined)
        // params = params + '?' + new URLSearchParams(APIParams) + '&' + new URLSearchParams(actionParams)
        //   //+ '&' + new URLSearchParams(credDialogArgs)        
        // console.log('_upload', 'action', this.action.actionName, params)

        Object.keys(actionParams).forEach(key => {
          form.append(key, actionParams[key]);
        });
        Object.keys(APIParams).forEach(key => {
          form.append(key, APIParams[key]);
        });
        let params=serviceAPIurl + endPointUrl
        //params=params.replace('https://platform.trazit.net:8443/', 'http://localhost:8081/')
        // Call fetchApi with the FormData
        //let response = await fetch(serviceAPIurl + endPointUrl, { //params
        let response = await fetch(params, {
            method: 'POST',
            body: form,
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .catch(error => console.error(error))
        if (response.status === 200) {
            // const blob = await response.blob();
            // const url = window.URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = 'processed_report.txt'; // Adjust the filename as needed
            // document.body.appendChild(a); // Append to the document to make it clickable
            // a.click(); // Trigger the download
            // a.remove(); // Remove the element after the download
        } else {
            // const errorText = await response.text();
            // throw new Error(errorText);
        }
    } catch (e) {
        requestResult = { error: 1, message: e.message };
    }
    console.log(requestResult);
    return requestResult;



    return
    try {
      const result = await fetch('/api/upload', {
        method: "POST",
        body: JSON.stringify({
          image: this.imageDataUrl
        })
      });

      console.log(result);
    } catch (e) {
      console.log("error");
    }
  }
}

window.customElements.define('camera-view', CameraView);

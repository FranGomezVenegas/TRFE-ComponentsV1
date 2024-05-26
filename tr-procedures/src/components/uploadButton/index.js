import { LitElement } from 'lit-element';
import { template } from './uploadButton.template';
import { styles } from './uploadButton.css';
import { ApiFunctions } from '../Api/ApiFunctions';


export class UploadButton extends ApiFunctions(LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      name: String,
      label: String,
      config: { type: Object },
      action: { type: Object },
      selectedItem: { type: Object },
      procInstanceName: String,
      selectedfile: {}
    };
  }

  constructor() {
    super();
    this.selectedfile = null;
    this.name = "";
    this.label = "";
    this.config={}
    this.action={}
    this.selectedItem={}
  }

  render() {
    return template({
      name: this.name,
      label: this.label,
      this: this,
      handleUpload: this._upload
    });
  }

  _uploadYanko = async () => {
    const uploadBtn = this.shadowRoot.querySelector(`#${this.name}`);
    const files = uploadBtn.files;

    let result = { error: 0, message: '' };

    try {
      if (files.length === 0)
        throw new Error('No file selected');

      // create a form
      let form = new FormData();
      form.append('title', 'Sample');
      form.append('file', files[0]);
      
      // send fetch along with cookies
      let response = await fetch('/upload.php', {
        method: 'POST',
        credentials: 'same-origin',
        body: form
      });

      // server responded with http response != 200
      if (response.status != 200)
        throw new Error('HTTP response code != 200');

      // success response example : {"error":0,"message":""}
      let json = await response.json();
      if (json.error == 1)
        throw new Error(json.message);
    } catch (e) {
      result = { error: 1, message: e.message };      
    }
    console.log(result);
    return result;
  }
  _upload = async () => {
    console.log('action', this.action,'selectedItem', this.selectedItem)

    const uploadBtn = this.shadowRoot.querySelector(`#${this.name}`);
    const files = uploadBtn.files;

    let result = { error: 0, message: '' };
    if (!this.action.actionName.includes("_PARSING")){
      this.action.actionName=this.action.actionName+"_PARSING";
    }
    try {
        if (files.length === 0) throw new Error('No file selected');

        // create a form
        let form = new FormData();
        form.append('title', 'Sample');
        form.append('file', files[0]);

        // URL parameters for the fetchApi call
        let params = 'http://localhost:8081/TRAZiT-API/moduleProjectRnD/ProjectRnDAPIactions?actionName=FORMULA_ADD_INGREDIENT&dbName=demo_v0_9_2&procInstanceName=RandD&finalToken=eyJ1c2VyREIiOiJhZG1pbiIsImRhdGV0aW1lRm9ybWF0QXRQbGF0Zm9ybUxldmVsIjoiRElTQUJMRUQiLCJwcm9jc01vZHVsZU5hbWUiOiJpbnNwZWN0aW9uX2xvdCpJTlNQRUNUSU9OX0xPVFN8aW5zdHJ1bWVudHMqSU5TVFJVTUVOVFN8RGVtbypJTlNUUlVNRU5UU3xEaXNlYXNlU3R1ZGllcypDTElOSUNBTF9TVFVESUVTfG1iX2VtKk1PTklUT1JJTkd8c3RvY2sqU1RPQ0tTfG1vbl93YXRlcipNT05JVE9SSU5HfFJhbmREKlJhbmREIFBST0pFQ1RTIiwiZGJOYW1lIjoiZGVtb192MF85XzIiLCJ0eXAiOiJKV1QiLCJ1c2VyX3Byb2NlZHVyZV9oYXNoY29kZXMiOiJpbnNwZWN0aW9uX2xvdCoxKi03MDQyMTQ1NTZ8aW5zdHJ1bWVudHMqMSotOTQ0MTQ0NTQ3fERlbW8qMSoxNzcyNjIzMTI4fERpc2Vhc2VTdHVkaWVzKjEqMTk3NDc3MTczMXxtYl9lbSoxKjIzNDI0MjU0NXxzdG9jayoxKjEzNjEyMjU2OTF8bW9uX3dhdGVyKjEqMjA1MzgwNjg2NXxSYW5kRCoxKjEyMzg0NTgzNjUiLCJlU2lnbiI6ImZpcm1hZGVtbyIsInVzZXJEQlBhc3N3b3JkIjoidHJheml0IiwidXNlck1haWwiOiJORVd0cmF6aXQuaW5mb0BnbWFpbC5jb20iLCJ1c2VyX3Byb2NlZHVyZXMiOiJbaW5zcGVjdGlvbl9sb3QsIGluc3RydW1lbnRzLCBEZW1vLCBEaXNlYXNlU3R1ZGllcywgbWJfZW0sIHN0b2NrLCBtb25fd2F0ZXIsIFJhbmREXSIsImFwcFNlc3Npb25JZCI6IjYzODgiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJUdWUgTWF5IDIxIDE0OjM0OjE1IFVUQyAyMDI0IiwidXNlclJvbGUiOiJzdXBlcnVzZXIiLCJhbGciOiJIUzI1NiIsImludGVybmFsVXNlcklEIjoiNDU0ODkyMjMifQ.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.PNpQDZobs2EcR4L1pRUXE0lLDBNIZH2CDxexKTfidjk&formulaName=formula+nueva+1&ingredient=Almid%C3%B3n+de+ma%C3%ADz&quantity=100&quantityUom=mg&&isForTesting=false';

        let APIParams = this.getAPICommonParams(this.action)
        let endPointUrl = this.getActionAPIUrl(this.action)
        if (String(endPointUrl).toUpperCase().includes("ERROR")) {
          alert(endPointUrl)
          return
        }
        if (this.config !== undefined && this.config.backendUrl !== undefined) {
          params = this.config.backendUrl + endPointUrl
        } else {
          let userSession = JSON.parse(sessionStorage.getItem("userSession"))
          params = userSession.backendUrl + endPointUrl
        }

        let targetValue = {
          rawValueResult: '',
          resultId: this.selectedItem.result_id,
          eventId: this.selectedItem.event_id,
          instrumentName: this.selectedItem.instrument,
          variableName: this.selectedItem.param_name
        }        
        let actionParams = this.jsonParam(this.action.dialogInfo.action[0], this.selectedItem, targetValue, this.selectedItem, undefined, undefined, undefined)
        params = params + '?' + new URLSearchParams(APIParams) + '&' + new URLSearchParams(actionParams)
          //+ '&' + new URLSearchParams(credDialogArgs)        
        console.log('_upload', 'action', this.action.actionName, params)
    
        //params=params.replace('https://platform.trazit.net:8443/', 'http://localhost:8081/')

        // Call fetchApi with the FormData
        let response = await fetch(params, {
            method: 'POST',
            body: form,
            credentials: 'same-origin'
        });

        if (response.status === 200) {
            //const blob = await response.blob();
            //const url = window.URL.createObjectURL(blob);
            //const a = document.createElement('a');
            //a.href = url;
            //a.download = 'processed_report.txt'; // Adjust the filename as needed
            //document.body.appendChild(a); // Append to the document to make it clickable
            //a.click(); // Trigger the download
            //a.remove(); // Remove the element after the download
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (e) {
        result = { error: 1, message: e.message };
    }
    console.log(result);
    return result;
}



}

window.customElements.define('upload-button', UploadButton);

import { LitElement } from 'lit-element';
import { template } from './uploadButton.template';
import { styles } from './uploadButton.css';


export class UploadButton extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      name: String,
      label: String,
    };
  }

  constructor() {
    super();
    this.name = "";
    this.label = "";
  }

  render() {
    return template({
      name: this.name,
      label: this.label,
      handleUpload: this._upload
    });
  }

  _upload = async () => {
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
}

window.customElements.define('upload-button', UploadButton);

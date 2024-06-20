import { html } from "lit-element";
import './uploadNotification'

export const template = (props) => {
  const { name, label, handleUpload, getFile, fileName } = props;

  return html`
    <div class="container">
      <input type="file" id="file-selector" multiple accept="*/*" @change="${getFile}" />
      <label for="file-selector">
        Choose Or Drop Document
      </label>
      <mwc-icon-button class="button" icon="upload_file" id="uploadfile" 
        title="Click to upload the file" @click=${handleUpload}></mwc-icon-button>
      <div id="error"></div>
      ${fileName}
      <div id="preview">
      </div>
      <upload-notification></upload-notification>
    </div>
  `;
};
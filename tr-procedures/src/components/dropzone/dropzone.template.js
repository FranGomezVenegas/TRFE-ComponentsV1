import { html } from "lit-element";

export const template = (props) => {
  const { name, label, handleUpload } = props;
  return html`
    <div class="container">
      <input type="file" id="file-selector" multiple accept="*/*" />
      <label for="file-selector">
        Choose Or Drop Document
      </label>
      <mwc-icon-button class="button" icon="upload_file" id="uploadfile" 
        title="Click to upload the file"  @click=${handleUpload}></mwc-icon-button>    
      <div id="error"></div>
      <div id="preview"></div>
    </div>
    
    <!-- <button class="button" @click=${handleUpload}>Upload</button> -->
  `
}
import { html } from "lit-element";

export const template = (props) => {
  const { name, label, handleUpload } = props;
  return html`
    <div class="container">
      <input type="file" id="file-selector" multiple accept="image/*" />
      <label for="file-selector">
        Choose Or Drop Photos
      </label>
      <div id="error"></div>
      <div id="preview"></div>
    </div>
    <button class="button" @click=${handleUpload}>Upload</button>
  `
}
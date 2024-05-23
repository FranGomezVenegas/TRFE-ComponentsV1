import { html } from "lit-element";
import '@vaadin/vaadin-context-menu';

export const template = (props) => {
  const { name, label,this:thisComponent , handleUpload } = props;
  const getFile = (event) => {
    thisComponent.selectedFile = event.target.files[0];
    thisComponent.requestUpdate()
  };

  const removeFile = () => {
    if (thisComponent.selectedFile) {
      thisComponent.selectedFile = null;
    }
    const uploadBtn = thisComponent.shadowRoot.querySelector(`#${name}`);
    uploadBtn.value = ''
    thisComponent.requestUpdate()
  }



  const renderTemplate = () => {
    return html`
    <div class="container">
      <div class="button-wrap">
      ${thisComponent.selectedFile ? html`
      <label class="button" @click=${handleUpload} >Upload</label>
      ` : html`
      <label class="button" for="${name}">${label}</label>
      `}
        
        
        <input @change="${getFile}" id="${name}" type="file">
        ${thisComponent.selectedFile ? html`<p>${thisComponent.selectedFile.name}</p> <span @click=${removeFile}>&#x2716</span>` : ''}
      </div>
    </div>
    <vaadin-context-menu .items=${[{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }]}>
      <template>
        <vaadin-list-box>
          <vaadin-item>First menu item</vaadin-item>
          <vaadin-item>Second menu item</vaadin-item>
        </vaadin-list-box>
      </template>
    </vaadin-context-menu>
    <vaadin-context-menu .items=${[{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }]}>
    </vaadin-context-menu>
  `
  };
  return html`<div id="file-container">${renderTemplate()}</div>`;
}
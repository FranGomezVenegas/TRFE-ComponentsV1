import { html } from "lit-element";
import '@vaadin/vaadin-context-menu';

export const template = (props) => {
  const { name, label, handleUpload } = props;
  return html`
    <div class="container">
      <div class="button-wrap">
        <label class="button" for="${name}">${label}</label>
        <input id="${name}" type="file">
      </div>
    </div>
    <vaadin-context-menu .items=${[{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }]}>
      <template>
        <vaadin-list-box>
          <vaadin-item>First menu item</vaadin-item>
          <vaadin-item>Second menu item</vaadin-item>
        </vaadin-list-box>
      </template>
      <button class="button" @click=${handleUpload}>Upload</button>
    </vaadin-context-menu>
    <vaadin-context-menu .items=${[{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }]}>
      <p>asdfasdf</p>
    </vaadin-context-menu>
  `
}
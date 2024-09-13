import { html } from 'lit';

export const editorTemplate = (editorRef, onSave, codeValue, isSaveDisabled) => html`
  <div id="editor" .textContent="${codeValue}" ${editorRef}></div>
  <button @click="${onSave}" ?disabled="${isSaveDisabled}">Save Code</button>
`;

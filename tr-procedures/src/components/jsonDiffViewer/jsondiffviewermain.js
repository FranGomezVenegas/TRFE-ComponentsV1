import { LitElement, html } from 'lit';
import { template } from './jsondiffviewer.template';
import { styles } from './jsondiffviewer.css';
import '@lrnwebcomponents/lrndesign-diff-2-html/lrndesign-diff-2-html.js';

export class JsonDiffViewer extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      oldVersion: { type: String },
      newVersion: { type: String },
      diffString: { type: String }
    };
  }

  constructor() {
    super();
    this.oldVersion = '{}';
    this.newVersion = '{}';
    this.diffString = '';
  }

  updated(changedProperties) {
    if (changedProperties.has('oldVersion') || changedProperties.has('newVersion')) {
      this.updateDiff();
    }
  }

  updateDiff() {
    try {
      this.oldVersion={"name": "old version", "description": "This is the old version"}
      let newVersion={}
      this.newVersion={"name": "new version", "description": "This is the new version"}
    
      const diffElement = document.createElement('lrndesign-diff-2-html');
      diffElement.oldValue = this.oldVersion;
      diffElement.newValue = this.newVersion;

      // Esperar hasta que el diff se haya renderizado y tomar el HTML
      diffElement.updateComplete.then(() => {
        this.diffString = diffElement.shadowRoot.innerHTML;
        this.requestUpdate();
      });
    } catch (e) {
      console.error('Error creating diff:', e);
      this.diffString = '<p>Error creating diff. Ensure the input JSON is valid.</p>';
    }
  }

  render() {
    return template(this.diffString);
  }
}

window.customElements.define('json-diff-viewer', JsonDiffViewer);

import { html, css } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';

export class CoreView extends CredDialog {
  static get styles() {
    return [
      super.styles,
      css`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
      `
    ];
  }

  static get properties() {
    return {
      lang: { type: String },
      programList: { type: Array }
    };
  }

  constructor() {
    super()
    this.programList = []
  }

  render() {
    return html`
      ${this.tabView()}
      ${super.render()}
    `
  }

  tabView() {
    return html`On Going`
  }

  updated(updates) {
    super.updated(updates)
    if (updates.has('programList') && this.programList && this.programList.length) {
      this.setView()
    }
  }

  setView() { }
}
customElements.define('core-view', CoreView);
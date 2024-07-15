import { LitElement } from 'lit';
import { styles } from './styles.js';
import { template } from './template.js';

export class ReadOnlyTableByGroup extends LitElement {
  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      elem: { type: Object },
      dataArr: { type: Object },
      lang: { type: String },
      isSecondLevel: { type: Boolean }
    };
  }

  render() {
    return template(this.elem, this.dataArr, this.lang, this.isSecondLevel);
  }
}

customElements.define('read-only-table-by-group', ReadOnlyTableByGroup);

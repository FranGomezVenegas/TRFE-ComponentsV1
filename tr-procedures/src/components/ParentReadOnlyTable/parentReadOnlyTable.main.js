import { LitElement } from 'lit-element';
import { template } from './parentReadOnlyTable.template';
import { styles } from './parentReadOnlyTable.css';

export class ParentReadOnlyTable extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      data: { type: Array }
    };
  }

  constructor() {
    super();
    this.data = [];
  }

  render() {
    return template(this.data);
  }
}

window.customElements.define('parent-read-only-table', ParentReadOnlyTable);

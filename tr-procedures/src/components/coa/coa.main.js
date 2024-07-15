import { LitElement } from 'lit';
import { styles } from './styles.js';
import { template } from './template.js';

export class Coa extends LitElement {
  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      elem: { type: Object },
      data: { type: Array }
    };
  }

  render() {
    return template(this.elem, this.data);
  }
}

customElements.define('coa-element', Coa);

import { LitElement } from 'lit';
import { styles } from './styles.js';
import { template } from './template.js';

export class KpiGrid extends LitElement {
  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      elem: { type: Object },
      data: { type: Object },
      lang: { type: String }
    };
  }

  render() {
    return template(this.elem, this.data, this.lang);
  }
}

customElements.define('kpi-grid', KpiGrid);

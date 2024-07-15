import { LitElement } from 'lit';
import { styles } from './styles.js';
import { template } from './template.js';

export class KpiReportTitleLvl2 extends LitElement {
  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      elem: { type: Object },
      lang: { type: String }
    };
  }

  render() {
    return template(this.elem, this.lang);
  }
}

customElements.define('kpi-report-title-lvl2', KpiReportTitleLvl2);

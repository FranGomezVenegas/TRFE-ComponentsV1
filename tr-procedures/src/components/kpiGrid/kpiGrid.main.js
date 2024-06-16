import { LitElement } from 'lit-element';
import { template } from './kpiGrid.template.js';
import { styles } from './kpiGrid.css.js/index.js';

export class KpiGrid extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      gridData: { type: Array }
    };
  }

  constructor() {
    super();
    this.gridData = [];
  }

  render() {
    return template(this.gridData);
  }
}

window.customElements.define('kpi-grid', KpiGrid);

import { LitElement } from 'lit-element';
import { template } from './kpiChart.template.js';
import { styles } from './kpiChart.css.js';

export class KpiChart extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      chartData: { type: Object }
    };
  }

  constructor() {
    super();
    this.chartData = {};
  }

  render() {
    return template(this.chartData);
  }
}

window.customElements.define('kpi-chart', KpiChart);

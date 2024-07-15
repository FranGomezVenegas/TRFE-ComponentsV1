import { LitElement } from 'lit';
import { styles } from './styles.js';
import { template } from './template.js';

export class KpiRecoveryRate extends LitElement {
  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      data: { type: Object }
    };
  }

  render() {
    return template(this.data);
  }
}

customElements.define('kpi-recovery-rate', KpiRecoveryRate);

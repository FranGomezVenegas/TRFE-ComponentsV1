import { LitElement } from 'lit-element';
import '../components/flipcard/flipcard';
import { template } from './proc-homes.template';
import { styles } from './proc-homes.styles';

export class ProcHomes extends (LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      params: { type: Object },
      procName: { type: String },
      lang: { type: String },
      config: { type: Object },
      viewModelFromProcModel: { type: Object },
    };
  }

  constructor() {
    super();
    this.procName = "mon_water";
    this.index = 0;
    this.lang = "en";
    this.config = {};
    this.viewModelFromProcModel = {};
  }

  render() {
    return template({
      config: this.config,
      viewModelFromProcModel: this.viewModelFromProcModel,
      lang: this.lang
    });
  }

  firstUpdated() {
    setInterval(() => {
      this.lang = sessionStorage.getItem("language");
    }, 1000);
    this.requestUpdate();
  }
}

window.customElements.define('proc-homes', ProcHomes);

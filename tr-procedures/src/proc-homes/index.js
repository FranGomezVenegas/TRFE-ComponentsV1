import {LitElement} from 'lit-element';
import '../components/flipcard/flipcard';
import {template} from './proc-homes.template';
import {styles} from './proc-homes.styles';
//import { navigator } from "lit-element-router";
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
    this.config={}
    this.viewModelFromProcModel
  }

  render() {
    return template({
      config:this.config,
      viewModelFromProcModel: this.viewModelFromProcModel,
      lang: this.lang
    });
  }

  firstUpdated = () => {
    setInterval(() => {
      this.lang = sessionStorage.getItem("language");
    }, 1000);
    this.requestUpdate();
  }
 /* 
  _selectedMenu = (route) => {
    this.shadowRoot
      .querySelectorAll("sp-action-menu")
      .forEach((s) => (s.open = false));
    this.navigate(route);
  }

  _elementClicked = (vwName, fltrName) => {
    console.log("elementClicked", this.procName, vwName, fltrName);
    this._selectedMenu(
      "/dashboard/procedures?procName=" +
        this.procName +
        "&viewName=" +
        vwName +
        "&filterName=" +
        fltrName
    );
  }*/
}

window.customElements.define('proc-homes', ProcHomes);

import {LitElement} from 'lit';
import {template} from './dashboard.template';
import {styles} from './dashboard.css';
import { navigator } from "lit-element-router";
export class Dashboard extends navigator(LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      params: { type: Object },
      procName: { type: String },
      lang: { type: String },
    };
  }

  constructor() {
    super();
    this.procName = "mon_water";
    this.index = 0;
    this.lang = "en";
  }

  render() {
    return template({
      params: this.params,
      selectedMenu: this._selectedMenu,
      elementClicked: this._elementClicked,
      lang: this.lang
    });
  }

  firstUpdated = () => {
    setInterval(() => {
      this.lang = sessionStorage.getItem("language");
    }, 1000);
    this.requestUpdate();
  }
  
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
  }
}

window.customElements.define('dynamic-dashboard', Dashboard);

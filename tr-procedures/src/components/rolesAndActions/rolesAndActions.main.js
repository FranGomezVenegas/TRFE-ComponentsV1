import { LitElement } from 'lit';
import { template } from './rolesAndActions.template.js';
import { styles } from './rolesAndActions.css.js';
import { ReadOnlyTableParts } from '../Views/ReadOnlyTableParts.js';

export class RolesAndActions extends ReadOnlyTableParts(LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      isSecondLevel: { type: Boolean},
      data: { type: Array },
      elem:{type: Object},
      lang: { type: String}
    };
  }

  constructor() {
    super();
    this.elem;
    this.data = [];
    this.isSecondLevel=false
    this.lang=''
  }

  render() {
    let customTheme = ''
    if (this.elem!==undefined&&this.elem.theme!==undefined){
      customTheme=this.elem.theme
    }
    if (typeof (customTheme) == "undefined") {
      customTheme = "TRAZiT-UsersArea";
    }
    return template(this, this.elem, this.data, customTheme, this.isSecondLevel, this.lang);
  }
}

window.customElements.define('roles-and-actions', RolesAndActions);

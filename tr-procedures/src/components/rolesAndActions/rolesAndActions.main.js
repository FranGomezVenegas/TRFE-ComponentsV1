import { LitElement } from 'lit-element';
import { template } from './rolesAndActions.template.js';
import { styles } from './rolesAndActions.css.js';

export class RolesAndActions extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      rolesData: { type: Array }
    };
  }

  constructor() {
    super();
    this.rolesData = [];
  }

  render() {
    return template(this.rolesData);
  }
}

window.customElements.define('roles-and-actions', RolesAndActions);

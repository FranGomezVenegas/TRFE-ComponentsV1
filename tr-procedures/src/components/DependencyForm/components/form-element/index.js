import {LitElement} from 'lit-element';
import {template} from './form-element.template';
import {styles} from './form-element.css';

export class FormElement extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      param: {type: Object},
    };
  }

  constructor() {
    super();
    this.param = {}
  }

  render() {
    return template({
      param: this.param 
    });
  }
}

window.customElements.define('form-element', FormElement);

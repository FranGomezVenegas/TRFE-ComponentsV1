import {LitElement} from 'lit-element';
import {template} from './elements.template';
import {styles} from './elements.css';

export class Elements extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      params: {type: Array},
    };
  }

  constructor() {
    super();
    this.params = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  render() {
    return template({
      params: this.params 
    });
  }
}

window.customElements.define('dynamic-elements', Elements);

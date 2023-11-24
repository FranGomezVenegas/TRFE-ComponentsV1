import {LitElement} from 'lit-element';
import {template} from './app.template';
import {styles} from './app.css';
import {data} from '../mock';

export class DependencyForm extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      endpoints: {type: Array},
      params: {type: Array}
    };
  }

  constructor() {
    super();
    this.endpoints = data;
    this.params = [];
  }

  render() {
    return template({
      endpoints: this.endpoints,
      params: this.params,
      handleChangeEndpoint: this._handleChangeEndpoint
    });
  }

  _handleChangeEndpoint = (e) => {
    const idx = parseInt(e.target.value);
    this.params = this.endpoints[idx]?.arguments_array ?? [];
  }
}

window.customElements.define('dependency-form', DependencyForm);

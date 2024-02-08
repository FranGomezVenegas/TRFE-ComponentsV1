import {LitElement} from 'lit-element';
import {template} from './multiselect.template';
import { styles } from './multiselect.css';
import { navigator } from "lit-element-router";
export class MultiSelect extends navigator(LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      activeOptions: { type: Array },
      options: { type: Array },
      open: { type: Boolean },
      searchOptions: { type: Array }
    };
  }

  constructor() {
    super();
    this.options = ["apple", "red", "green", "trazit", "nothing", "someone", "dog"];
    this.activeOptions = ["hello", "moon"];
    this.open = false;
    this.searchOptions = [];
    this.allowAdhocEntries = true;
  }

  render() {
    return template({
      activeOptions: this.activeOptions,
      options: this.options,
      open: this.open,
      searchOptions: this.searchOptions,
      allowAdhocEntries: this.allowAdhocEntries,
      setOpen: this._setOpen,
      removeActiveOption: this._removeActiveOption,
      removeOption: this._removeOption,
      setOpenTrue: this._setOpenTrue,
      pressEnter: this._pressEnter,
    });
  }

  _pressEnter = (e) => {
    this.activeOptions.push(e.target.value);
    this.inputValue = "";
    this.requestUpdate();
  }

  firstUpdated = () => {
    this.searchOptions = this.options;
    this.requestUpdate();
  }

  _setOpen = () => {
    this.open = !this.open;
    this.requestUpdate();
  }

  _removeActiveOption = (index) => {
    this.searchOptions.push(this.activeOptions[index]);
    this.activeOptions.splice(index, 1);
    this.requestUpdate();
  }

  _removeOption = (index) => {
    this.activeOptions.push(this.searchOptions[index]);
    this.searchOptions.splice(index, 1);
    this.requestUpdate();
  }

  _setOpenTrue = () => {
    this.open = true;
    this.requestUpdate();
    
  }
}

window.customElements.define('multi-select', MultiSelect);

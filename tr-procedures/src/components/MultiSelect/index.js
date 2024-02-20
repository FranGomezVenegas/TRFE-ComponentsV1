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
    this.options = [];
    this.activeOptions = [];
    this.open = false;
    this.searchOptions = [];
    this.allowAdhocEntries = true;
    this.value = undefined;
    this.clickedContainer = false;
  }

  render() {
    if (this.activeOptions===undefined){this.activeOptions=[]}
    if (this.searchOptions===undefined){this.searchOptions=[]}
    if (this.allowAdhocEntries===undefined){this.allowAdhocEntries=false}

    return template({
      activeOptions: this.activeOptions,
      options: this.options,
      open: this.open,
      searchOptions: this.searchOptions,
      allowAdhocEntries: this.allowAdhocEntries,
      clickedContainer: this.clickedContainer,
      setOpen: this._setOpen,
      removeActiveOption: this._removeActiveOption,
      removeOption: this._removeOption,
      setOpenTrue: this._setOpenTrue,
      pressEnter: this._pressEnter, 
      clickContainer: this._clickContainer,
      inputFocusOut: this._inputFocusOut,
    }, this.label);
  }

  _inputFocusOut = () => {
    this.clickedContainer = false;
    this.open = false;
    this.requestUpdate();
  }

  _clickContainer = (e) => {
    this.clickedContainer = true;
    this.open = true;
    this.requestUpdate();
  }

  _pressEnter = (e) => {
    this.activeOptions.push(e.target.value);
    this.activeOptions.map((value, i) => {
      if(i == 0) {
        this.value = value;
      }
      else {
        this.value += "|" + value;
      }
    })
    this.inputValue = "";
    this.requestUpdate();
  }

  firstUpdated = () => {
    this.searchOptions = this.options;
    this.activeOptions.map((value, i) => {
      if(i == 0) {
        this.value = value;
      }
      else {
        this.value += "|" + value;
      }
    })
    this.requestUpdate();
  }

  _setOpen = (e) => {
    e.stopPropagation();
    this.open = !this.open;
    this.clickedContainer = false;
    if(this.open) {
      this.clickedContainer = true;
    }
    this.requestUpdate();
  }

  _removeActiveOption = (index) => {
    this.searchOptions.push(this.activeOptions[index]);
    this.activeOptions.splice(index, 1);
    this.activeOptions.map((value, i) => {
      if(i == 0) {
        this.value = value;
      }
      else {
        this.value += "|" + value;
      }
    })
    if(this.activeOptions.length == 0) {
      this.clickedContainer = false;
      this.open = false;
    }
    this.requestUpdate();
  }

  _removeOption = (index) => {
    this.activeOptions.push(this.searchOptions[index]);
    this.activeOptions.map((value, i) => {
      if(i == 0) {
        this.value = value;
      }
      else {
        this.value += "|" + value;
      }
    })
    this.searchOptions.splice(index, 1);
    this.requestUpdate();
  }

  _setOpenTrue = () => {
    this.open = true;
    this.requestUpdate();
  }
}

window.customElements.define('multi-select', MultiSelect);

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
      props: { type: Object},
      open: { type: Boolean },
      searchOptions: { type: Array }
    };
  }

  constructor() {
    super();
    this.options = [];
    this.props = {};
    this.activeOptions = [];
    this.open = false;
    this.searchOptions = [];
    this.allowAdhocEntries = true;
    this.value = undefined;
    this.clickedContainer = false;
   
  }

  render() {
    //if (this.activeOptions===undefined){this.activeOptions=[]}
    //if (this.searchOptions===undefined){this.searchOptions=[]}    
    if (this.activeOptions===undefined){ 
      this.activeOptions=[]
    } else if (typeof this.activeOptions === 'string') {
        // Split the string into an array using the pipe '|' as a delimiter
        this.activeOptions = this.activeOptions.split('|');
    }
    if (!Array.isArray(this.activeOptions)) {
        this.activeOptions = [];
    }
    if (this.searchOptions===undefined){ 
        this.searchOptions=[]
    } else if (typeof this.searchOptions === 'string') {
        // Split the string into an array using the pipe '|' as a delimiter
        this.searchOptions = this.searchOptions.split('|');
    }   
    if (!Array.isArray(this.searchOptions)) {
      this.searchOptions = [];
    }       
    if (this.props===undefined){this.props={}}
    if (this.props.allowAdhocEntries===undefined){this.props.allowAdhocEntries=false}
    if (this.props===undefined||this.props.displayLabel===undefined){this.props.displayLabel=true}
    if (this.props===undefined||this.props.readOnly===undefined){this.props.readOnly=false}
    //alert(this.props.readOnly)
    //console.log(this.props)
    return template({
      activeOptions: this.activeOptions,
      options: this.options,
      displayLabel: this.props.displayLabel,
      readOnly: this.props.readOnly,
      open: this.open,
      searchOptions: this.searchOptions,
      allowAdhocEntries: this.props.allowAdhocEntries,
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
    if(this.activeOptions.length == 0) {
      this.clickedContainer = false;
    }
    this.open = false;
    this.requestUpdate();
  }

  _clickContainer = (e) => {
    this.clickedContainer = true;
    this.open = true;
    this.requestUpdate();
  }

  _pressEnter = (e) => {
    const inputValue = e.target.value.toLowerCase(); // Convert input value to lower case
    if (!this.activeOptions.some(option => option.toLowerCase() === inputValue)) {
        this.activeOptions.push(e.target.value); // Push the original value
    }
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
    return
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
    return
  }

  _setOpen = (e) => {
    e.stopPropagation();
    this.open = !this.open;
    if(this.open) {
      this.clickedContainer = true;
    } else {
      if(this.activeOptions.length == 0) {
        this.clickedContainer = false;
      }
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
    return
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
    return
  }

  _setOpenTrue = () => {
    this.open = true;
    this.requestUpdate();
  }
  
  setClosed() {
    this.open = false;
    this.requestUpdate();
  }
}

window.customElements.define('multi-select', MultiSelect);

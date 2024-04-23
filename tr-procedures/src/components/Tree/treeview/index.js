import {LitElement} from 'lit-element';
import {template} from './treeview.template';
import {styles} from './treeview.css';

export class TreeView extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      data: {type: Array},
      specification: {type: Array},
      selectedItems: {type: Object},
      handleSelectItem: {type: Function},
      level: {type: Number},
      value: { type: String }
    };
  }
  _handleItemSelected = (event) => {
    if (this.value!==''&&this.value===event.detail){
      this.value=''
      return
    }
    this.value = event.detail;      
  };

  constructor() {
    super();
    this.data = [];
    this.specification = [];
    this.selectedItems = [];
    this.level = 0;
    this.value=''
  }
  render() {
    return template({
      data: this.data,
      specification: this.specification,
      selectedItems: this.selectedItems,
      handleSelectItem: this.handleSelectItem,
      level: this.level,
      value: this.valuem,
      handleItemSelected: this._handleItemSelected
    });
  }
  
}

window.customElements.define('tree-view', TreeView);

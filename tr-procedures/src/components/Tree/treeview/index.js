import { LitElement } from 'lit-element';
import { template } from './treeview.template';
import { styles } from './treeview.css';


export class TreeView extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      data: { type: Array },
      selectedItems: { type: Object },
      handleSelectItem: { type: Function }
    };
  }

  constructor() {
    super();
    this.data = [];
    this.selectedItems = [];
  }

  render() {
        return template({
      data: this.data,
      selectedItems: this.selectedItems,
      handleSelectItem: this.handleSelectItem
    });
  }
}

window.customElements.define('tree-view', TreeView);

import { LitElement } from 'lit-element';
import { template } from './treenode.template';
import { styles } from './treenode.css';

export class TreeNode extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      data: { type: Object },
      selectedItems: { type: Object },
      handleSelectItem: { type: Function },
      showChildren: { type: Boolean},
    };
  }

  constructor() {
    super();
    this.data = {};
    this.selectedItems = [];
    this.showChildren = false;
  }

  render() {
    return template({
      data: this.data,
      selectedItems: this.selectedItems,
      handleSelectItem: this.handleSelectItem,
      showChildren: this.showChildren,
      handleShowChildren: this._handleShowChildren
    });
  }

  _handleShowChildren = () => {
    this.showChildren = !this.showChildren;
  }
}

window.customElements.define('tree-node', TreeNode);

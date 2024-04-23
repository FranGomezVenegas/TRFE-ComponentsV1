import {LitElement} from 'lit-element';
import {template} from './treenode.template';
import {styles} from './treenode.css';

export class TreeNode extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    // Dispatch event here if necessary
  }
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      data: {type: Object},
      specification: {type: Array},
      selectedItems: {type: Object},
      handleSelectItem: {type: Function},
      handleShowChildrenItem: {type: Function},
      showChildren: {type: Boolean},
      level: {type: Number}
    };
  }

  constructor() {
    super();
    this.data = {};    
    this.specification = [];
    this.selectedItems = [];
    this.showChildren = false;
    this.level = 0;
    this.value = '';
    this.handleClickItem = this.handleClickItem.bind(this);     
  }
  handleClickItem = (event) => {
    event.stopPropagation();
    const selectedValue = this.data[this.specification[this.level].key];
    this.dispatchEvent(new CustomEvent('item-selected', { detail: selectedValue, bubbles: true, composed: true }));
  };

  render() {
    return template({
      data: this.data,
      specification: this.specification,
      selectedItems: this.selectedItems,
      handleSelectItem: this.handleSelectItem,
      showChildren: this.showChildren,      
      handleShowChildrenItem: this._handleShowChildrenItem,
      handleShowChildren: this._handleShowChildren,
      level: this.level,
      handleClickItem: this.handleClickItem
    });
  }

  

  _handleShowChildren = () => {
    this.showChildren = !this.showChildren;
  };
}

window.customElements.define('tree-node', TreeNode);

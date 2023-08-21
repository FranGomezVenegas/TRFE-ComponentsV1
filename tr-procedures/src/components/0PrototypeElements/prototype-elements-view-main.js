import { LitElement } from 'lit-element';
import { template } from './app.template';
import { styles } from './app.css';


export class PrototypeElementsViewMain extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      entity: { type: String },
      selectedItems: { type: Object }
    };
  }

  constructor() {
    super();
    this.entity = "";
    this.selectedItems = {};
  }

  render() {
    return template({
      selectedItems: this.selectedItems,
      handleSelectItem: this._handleSelectItem,
      getSelectedItems: this._getSelectedItems
    });
  }

  _handleSelectItem = (entity, itemData) => {
    if(this.entity !== entity) {
      this.selectedItems = {};
      this.entity = entity;
    }

    const { key } = itemData;
    if(!this.selectedItems[key]) {
      this.selectedItems[key] = itemData;
    } else {
      delete this.selectedItems[key];
    }
  }

  _getSelectedItems = () => {
    console.log(this.selectedItems);
  }
}

window.customElements.define('prototype-elements-view-main', PrototypeElementsViewMain);

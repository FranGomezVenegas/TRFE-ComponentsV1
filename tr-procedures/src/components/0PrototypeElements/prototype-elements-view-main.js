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
      selectedItems: { type: Object },
      treeElementData: { type: Array},
      treeElementSpecification:{ type: Array}
    };
  }

  constructor() {
    super();
    this.entity = "";
    this.selectedItems = {};
    this.treeElementData=[
      {
        "name": "hola lvl1",
        "level2":[
          { 
            "otro":"hola lvl2"
          },
          { 
            "otro":"adios lvl2"
          }
        ]
      },
      {
        "name": "adios lvl1"
      }
    ];
    this.treeElementSpecification=[
      {
        "key": "name",
        "label": "name",
        "label2": [
          "'('",
          "name",
          "') '",
          "name"
        ],
        "children": "level2"
      },
      {
        "key": "otro",
        "label": "otro",
        "label2": [
          "'('",
          "otro",
          "') '",
          "otro"
        ],
        "children": "children"
      }
    ]

    
  }
  _treeSelection = () => {
    const myTree = this.shadowRoot.querySelector("tree-view#mytree");
    if (myTree) {
      setTimeout(() => {  // Use setTimeout to allow the event loop to update the value
        alert(myTree.value);
        
      }, 0);
    }
  }
  render() {
    return template({
      selectedItems: this.selectedItems,
      handleSelectItem: this._handleSelectItem,
      getSelectedItems: this._getSelectedItems,
      treeElementData: this.treeElementData,
      treeElementSpecification: this.treeElementSpecification,
      treeSelection: this._treeSelection
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

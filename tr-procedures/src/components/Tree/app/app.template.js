import { html } from "lit-element";
import '../treeview/index';
import { data } from '../mock';


export const template = (props) => {
  const { selectedItems, handleSelectItem, getSelectedItems } = props;

  const handleAllowDrop = (event) => {
    event.preventDefault();
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const itemStr = event.dataTransfer.getData("item");
    const item = JSON.parse(itemStr);
    console.log(item);
  }

  return html`
    <div>
    aaaa
      <button @click=${getSelectedItems}>Selected Items</button>
      <div class="container">
        <tree-view 
          .data=${data} 
          .selectedItems=${selectedItems}
          .handleSelectItem=${handleSelectItem}
        ></tree-view>
        <div 
          class="dropzone"
          @dragover=${handleAllowDrop}
          @drop=${handleDrop}
        ></div>
      </div>
    </div>
  `
}
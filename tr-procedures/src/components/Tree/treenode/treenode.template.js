import { html } from "lit-element";
import { classNames } from "../utils";
import "../treeview";

export const template = (props) => {
  const { data, selectedItems, handleSelectItem, showChildren, handleShowChildren } = props;
  const { entity, key, children, label } = data;
  const selected = selectedItems[key] ? true : false;

  const handleClickItem = () => {
    handleShowChildren();
    if(!children)
      handleSelectItem(entity, data);
  }

  const handleDragStart = (event) => {
    event.dataTransfer.setData("item", JSON.stringify(data));
  }

  return html`
    <div 
      draggable="true"
      @dragstart=${handleDragStart}
      class="${
        classNames(
          "label",
          selected ? "selected" : "",
          children && children.length > 0 ? "hasChildren" : "",
          showChildren ? "opened" : "closed"
        )
      }"
      @click=${handleClickItem}
    >
      <span>${label}</span>
    </div>
    <ul>
      ${
        showChildren && children ? 
        html`<tree-view 
          .data=${children} 
          .selectedItems=${selectedItems} 
          .handleSelectItem=${handleSelectItem}
        ></tree-view>` : 
        ''
      }
    </ul>
  `
}
import { html } from "lit-element";
import "../treenode";

export const template = (props) => {
  const { data, selectedItems, handleSelectItem } = props;

  return html`
    <ul>
      ${data.map((node) => {
        return html`
          <tree-node 
            .data=${node} 
            .selectedItems=${selectedItems} 
            .handleSelectItem=${handleSelectItem}
          ></tree-node>
        `
      })}
    </ul>
  `
}
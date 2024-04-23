import {html} from 'lit-element';
import '../treenode';

export const template = (props) => {
  const {data, specification, level, selectedItems, handleSelectItem, value, handleItemSelected} = props;


  
  return html`
    <ul @item-selected=${handleItemSelected}>
      ${data.map((node) => {
        return html`
          <tree-node
            .data=${node}
            .specification=${specification}
            .selectedItems=${selectedItems}
            .handleSelectItem=${handleSelectItem}
            .level=${level}
            value=${value}
          ></tree-node>
        `;
      })}
    </ul>
  `;
};

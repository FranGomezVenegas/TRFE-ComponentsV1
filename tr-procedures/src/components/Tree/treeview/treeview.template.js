import {html} from 'lit-element';
import '../treenode';

export const template = (props) => {
  const {data, specification, level, selectedItems, handleSelectItem} = props;

  return html`
    <ul>
      ${data.map((node) => {
        return html`
          <tree-node
            .data=${node}
            .specification=${specification}
            .selectedItems=${selectedItems}
            .handleSelectItem=${handleSelectItem}
            .level=${level}
          ></tree-node>
        `;
      })}
    </ul>
  `;
};

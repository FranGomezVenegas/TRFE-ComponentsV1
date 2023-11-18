import {html} from 'lit-element';
import {classNames} from '../utils';
import '../treeview';

export const template = (props) => {
  const {
    data,
    specification,
    selectedItems,
    handleSelectItem,
    showChildren,
    handleShowChildren,
    level,
  } = props;
  const {entity, children} = data;
  const key = data[specification[level].key];
  const label = data[specification[level].label];
  const selected = selectedItems[key] ? true : false;

  const handleClickItem = () => {
    handleShowChildren();
    if (!children) handleSelectItem(entity, data);
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData('item', JSON.stringify(data));
  };

  return html`
    <div
      draggable="true"
      @dragstart=${handleDragStart}
      class="${classNames(
        'label',
        selected ? 'selected' : '',
        children && children.length > 0 ? 'hasChildren' : '',
        showChildren ? 'opened' : 'closed'
      )}"
      @click=${handleClickItem}
    >
      <span>${label}</span>
    </div>
    <ul>
      ${showChildren && children
        ? html`<tree-view
            .data=${children}
            .selectedItems=${selectedItems}
            .handleSelectItem=${handleSelectItem}
            .specification=${specification}
            .level=${level + 1}
          ></tree-view>`
        : ''}
    </ul>
  `;
};

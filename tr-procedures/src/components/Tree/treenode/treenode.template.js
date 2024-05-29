import {html} from 'lit-element';
import {classNames} from '../utils';
import '../treeview';
import '@vaadin/accordion';
import '@vaadin/accordion/vaadin-accordion-panel';
import '@vaadin/vertical-layout';


export const template = (props) => {
  const {
    data,
    specification,
    selectedItems,
    handleSelectItem,
    showChildren,
    handleShowChildren,
    level,
    handleClickItem    
  } = props;
  const entity = data;
  const children = data[specification[level].children]
  const key = data[specification[level].key];
  const label = data[specification[level].label];
  const selected = selectedItems[key] ? true : false;

  
  const handleShowChildrenItem = () =>{
    handleShowChildren();    
    this.dispatchEvent(new CustomEvent('item-selected', { detail: '', bubbles: true, composed: true }));
  }
  // handleClickItem = () => {    
  //   const selectedValue=data[specification[level].key] 
  //   alert(selectedValue)
  //   this.dispatchEvent(new CustomEvent('item-selected', { detail: selectedValue, bubbles: true, composed: true }));
  //   //handleShowChildren();
  //   //if (!children) handleSelectItem(entity, data);
  //};

  const handleDragStart = (event) => {    
    event.dataTransfer.setData('item', JSON.stringify(data));
  };

  

  return html`
  <vaadin-accordion-panel summary=${label} @click=${handleShowChildrenItem}
  draggable="true"      
  >
    <vaadin-vertical-layout>
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
    </vaadin-vertical-layout>
  </vaadin-accordion-panel>  
</vaadin-accordion>

   <!-- <div
      draggable="true"
      @dragstart=${handleDragStart}
      class="${classNames(
        'label',
        selected ? 'selected' : '',
        children && children.length > 0 ? 'hasChildren' : '',
        showChildren ? 'opened' : 'closed'
      )}" 
      @click=${handleShowChildrenItem}
    >
      <span @click=${handleClickItem}>${label}</span>
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
    </ul> --> 
  `;
};

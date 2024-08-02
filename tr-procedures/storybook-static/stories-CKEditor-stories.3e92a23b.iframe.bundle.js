"use strict";(self.webpackChunk_trazit_tr_procedures=self.webpackChunk_trazit_tr_procedures||[]).push([[930],{"./src/stories/CKEditor.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CKEditor:()=>CKEditor,__namedExportsOrder:()=>__namedExportsOrder,default:()=>CKEditor_stories});var lit=__webpack_require__("./node_modules/lit/index.js"),lit_element=__webpack_require__("./node_modules/lit-element/lit-element.js");__webpack_require__("./node_modules/@vaadin/accordion/vaadin-accordion.js"),__webpack_require__("./node_modules/@vaadin/accordion/vaadin-accordion-panel.js"),__webpack_require__("./node_modules/@vaadin/vertical-layout/vaadin-vertical-layout.js");const styles=lit_element.AH`
  :host {
    display: block;
  }

  ul {
    padding-left: 10px;
  }

  .label {
    cursor: pointer;
  }

  .label:hover {
    color: blue;
  }

  .hasChildren.opened::before {
    content: "-"
  }

  .hasChildren.closed::before {
    content: "+"
  }

  .selected {
    color: red;
  }
`;class TreeNode extends lit_element.WF{connectedCallback(){super.connectedCallback()}static get styles(){return styles}static get properties(){return{data:{type:Object},specification:{type:Array},selectedItems:{type:Object},handleSelectItem:{type:Function},handleShowChildrenItem:{type:Function},showChildren:{type:Boolean},level:{type:Number}}}constructor(){super(),this.data={},this.specification=[],this.selectedItems=[],this.showChildren=!1,this.level=0,this.value="",this.handleClickItem=this.handleClickItem.bind(this)}handleClickItem=event=>{event.stopPropagation();const selectedValue=this.data[this.specification[this.level].key];this.dispatchEvent(new CustomEvent("item-selected",{detail:selectedValue,bubbles:!0,composed:!0}))};render(){return(props=>{const{data,specification,selectedItems,handleSelectItem,showChildren,handleShowChildren,level,handleClickItem}=props,children=data[specification[level].children],key=data[specification[level].key],label=data[specification[level].label],selected=!!selectedItems[key],handleShowChildrenItem=()=>{handleShowChildren(),(void 0).dispatchEvent(new CustomEvent("item-selected",{detail:"",bubbles:!0,composed:!0}))};return lit_element.qy`
  <vaadin-accordion-panel summary=${label} @click=${handleShowChildrenItem}
  draggable="true"      
  >
    <vaadin-vertical-layout>
    <ul>
      ${showChildren&&children?lit_element.qy`<tree-view
            .data=${children}
            .selectedItems=${selectedItems}
            .handleSelectItem=${handleSelectItem}
            .specification=${specification}
            .level=${level+1}
          ></tree-view>`:""}
    </ul>
    </vaadin-vertical-layout>
  </vaadin-accordion-panel>  
</vaadin-accordion>

   <!-- <div
      draggable="true"
      @dragstart=${event=>{event.dataTransfer.setData("item",JSON.stringify(data))}}
      class="${((...names)=>names.join(" "))("label",selected?"selected":"",children&&children.length>0?"hasChildren":"",showChildren?"opened":"closed")}" 
      @click=${handleShowChildrenItem}
    >
      <span @click=${handleClickItem}>${label}</span>
    </div>
    <ul>
      ${showChildren&&children?lit_element.qy`<tree-view
            .data=${children}
            .selectedItems=${selectedItems}
            .handleSelectItem=${handleSelectItem}
            .specification=${specification}
            .level=${level+1}
          ></tree-view>`:""}
    </ul> --> 
  `})({data:this.data,specification:this.specification,selectedItems:this.selectedItems,handleSelectItem:this.handleSelectItem,showChildren:this.showChildren,handleShowChildrenItem:this._handleShowChildrenItem,handleShowChildren:this._handleShowChildren,level:this.level,handleClickItem:this.handleClickItem})}_handleShowChildren=()=>{this.showChildren=!this.showChildren}}window.customElements.define("tree-node",TreeNode);const treeview_css_styles=lit_element.AH`
  :host {
    display: block;
  }

  ul {
    padding-left: 10px;
  }
`;class TreeView extends lit_element.WF{static get styles(){return treeview_css_styles}static get properties(){return{data:{type:Array},specification:{type:Array},selectedItems:{type:Object},handleSelectItem:{type:Function},level:{type:Number},value:{type:String}}}_handleItemSelected=event=>{""===this.value||this.value!==event.detail?this.value=event.detail:this.value=""};constructor(){super(),this.data=[],this.specification=[],this.selectedItems=[],this.level=0,this.value=""}render(){return(props=>{const{data,specification,level,selectedItems,handleSelectItem,value,handleItemSelected}=props;return lit_element.qy`
    <vaadin-accordion @item-selected=${handleItemSelected}>
      ${data.map((node=>lit_element.qy`
          <tree-node
            .data=${node}
            .specification=${specification}
            .selectedItems=${selectedItems}
            .handleSelectItem=${handleSelectItem}
            .level=${level}
            value=${value}
          ></tree-node>
        `))}
    </vaadin-accordion>
  `})({data:this.data,specification:this.specification,selectedItems:this.selectedItems,handleSelectItem:this.handleSelectItem,level:this.level,value:this.valuem,handleItemSelected:this._handleItemSelected})}}window.customElements.define("tree-view",TreeView);const data=[{key:"0",label:"Documents",children:[{key:"0-0",label:"Document 1-1",children:[{key:"0-1-1",label:"Document-0-1.doc",entity:"car"},{key:"0-1-2",label:"Document-0-2",children:[{key:"0-1-2-1",label:"Document-0-2-1.doc",entity:"apple"},{key:"0-1-2-2",label:"Document-0-2-2.doc",entity:"apple"}]}]}]},{key:"1",label:"Desktop",children:[{key:"1-0",label:"document1.doc",entity:"egg"},{key:"1-1",label:"documennt-2.doc",entity:"egg"}]},{key:"2",label:"Downloads",entity:"soccer"}],app_css_styles=lit_element.AH`
  :host {
    display: block;
  }

  .container {
    display: flex;
    align-items: stretch;
  }

  .container > * {
    flex: 1;
    border: 1px solid black;
    margin: 4px;
  }

  .dropzone {
    
  }
`;class TreeViewMain extends lit_element.WF{static get styles(){return app_css_styles}static get properties(){return{entity:{type:String},selectedItems:{type:Object}}}constructor(){super(),this.entity="",this.selectedItems={},console.log("hello")}render(){return(props=>{const{selectedItems,handleSelectItem,getSelectedItems}=props;return lit_element.qy`
    <div>    
      <button @click=${getSelectedItems}>Selected Items</button>
      <div class="container">
        <tree-view 
          .data=${data} 
          .selectedItems=${selectedItems}
          .handleSelectItem=${handleSelectItem}
        ></tree-view>
        <div 
          class="dropzone"
          @dragover=${event=>{event.preventDefault()}}
          @drop=${event=>{event.preventDefault();const itemStr=event.dataTransfer.getData("item"),item=JSON.parse(itemStr);console.log(item)}}
        ></div>
      </div>
    </div>
  `})({selectedItems:this.selectedItems,handleSelectItem:this._handleSelectItem,getSelectedItems:this._getSelectedItems})}_handleSelectItem=(entity,itemData)=>{this.entity!==entity&&(this.selectedItems={},this.entity=entity);const{key}=itemData;this.selectedItems[key]?delete this.selectedItems[key]:this.selectedItems[key]=itemData};_getSelectedItems=()=>{console.log(this.selectedItems)}}window.customElements.define("tree-view-main",TreeViewMain);const CKEditor_stories={title:"Example/CKEDITOR",tags:["autodocs"],render:args=>lit.qy`
  <tree-view-main></tree-view-main> 
  `},CKEditor={args:{}},__namedExportsOrder=["CKEditor"];CKEditor.parameters={...CKEditor.parameters,docs:{...CKEditor.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...CKEditor.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=stories-CKEditor-stories.3e92a23b.iframe.bundle.js.map
import { html } from "lit-element";
import '../uploadButton/index';
import '../dropzone/index';
import '../cameraview/index';
import "../codeview/index";
import "../qrcode-scanner/index";
import '../Calendar/index';
import '../Tree/treeview/index'
import '../MolecularEditor/molecular-editor';
//import '../jsonDiffViewer/jsondiffviewermain';
import '../serialPort/serial-port';
//import '../LabelPrinter/label-printer-main';
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
  let oldVersion={}
  oldVersion={"name": "old version", "description": "This is the old version"}
  let newVersion={}
  newVersion={"name": "new version", "description": "This is the new version"}
  return html`
  <!-- <zebra-printer-component></zebra-printer-component> -->
  <serial-port-component lang=${props.lang} .sendEnabled="${true}" .isTimeoutEditable="${false}" .showAlert="${false}"></serial-port-component>
 <!-- <json-diff-viewer old-version=${oldVersion} 
  new-version=${newVersion}>
  </json-diff-viewer> -->
  <molecular-editor></molecular-editor>
  <tree-view id="mytree" .data=${props.treeElementData} .specification=${props.treeElementSpecification} @item-selected=${props.treeSelection}></tree-view>
  <calendar-component></calendar-component>
    <div class="section">
        <div 
          class="dropzone"
          @dragover=${handleAllowDrop}
          @drop=${handleDrop}
        ></div>
      </div>
    </div>
    <div class="section">
      <h3>Upload</h3>
      <div>
        <upload-button 
          name="upload" 
          label="File"
        ></upload-button>
      </div>
    </div>
    <div class="section">
      <h3>DropZone</h3>
      <drop-zone></drop-zone>
    </div>
    <div class="section">
      <h3>Camera</h3>
      <camera-view></camera-view>
    </div>
    <div class="section">
      <h3>QRCode & BarCode</h3>
      <qrcode-scanner></qrcode-scanner>
      <code-view></code-view>
    </div>
  `
}
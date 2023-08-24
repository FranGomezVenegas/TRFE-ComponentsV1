import { html } from "lit-element";
import '../uploadButton/index';
import '../dropzone/index';
import '../cameraview/index';
import "../codeview/index";
//import "../qrcode-scanner/index";


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
      <trazit-qrcode-scanner></trazit-qrcode-scanner>
    </div>
  `
}
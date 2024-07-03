import { html } from "lit-element";
import '../uploadButton/index';
import '../dropzone/index';
import '../cameraview/index';
import "../codeview/index";
import "../qrcode-scanner/index";
import '../Calendar/index';
import '../Tree/treeview/index';
import '../MolecularEditor/molecular-editor';
import '../flipcard/flipcard';
import '../serialPort/serial-port';
import '../PreviewFile/previewfile';
import { generateLabel, previewLabel } from '../GenericDialogs/labelGenerator';

export const template = (props) => {
  const { selectedItems, handleSelectItem, getSelectedItems, handleGenerateLabel } = props;

  const handleAllowDrop = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const itemStr = event.dataTransfer.getData("item");
    const item = JSON.parse(itemStr);
    console.log(item);
  };

  let oldVersion = { name: "old version", description: "This is the old version" };
  let newVersion = { name: "new version", description: "This is the new version" };

  let flipCardConfig1 = { flipCardAllowed: true };
  let flipCardData1 = { title: "Hola", role: 'bye' };
  let flipCardConfig2 = { flipCardAllowed: false };
  let flipCardData2 = { role: "Hola", title: 'bye' };

  let buttonForDownloadAwsFileUrl = "http://localhost:8081/TRAZiT-API/app/procs/InvTrackingAPIqueries?finalToken=eyJ1c2VyREIiOiJyJmQiLCJkYXRldGltZUZvcm1hdEF0UGxhdGZvcm1MZXZlbCI6IkRJU0FCTEVEIiwicHJvY3NNb2R1bGVOYW1lIjoiUmFuZEQqUmFuZEQgUFJPSkVDVFMiLCJkYk5hbWUiOiJkZW1vX3YwXzlfMiIsInR5cCI6IkpXVCIsInVzZXJfcHJvY2VkdXJlX2hhc2hjb2RlcyI6IlJhbmREKjEqMTIzODQ1ODM2NSIsImVTaWduIjoiZmlybWFkZW1vIiwidXNlckRCUGFzc3dvcmQiOiJ0cmF6aXQ0ZXZlciIsInVzZXJNYWlsIjoiaW5mb0B0cmF6aXQubmV0IiwidXNlcl9wcm9jZWR1cmVzIjoiW1JhbmREXSIsImFwcFNlc3Npb25JZCI6IjYyOTgiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJGcmkgTWF5IDE3IDA5OjA3OjU3IFVUQyAyMDI0IiwidXNlclJvbGUiOiJyJmQgc3VwZXJ1c2VyIiwiYWxnIjoiSFMyNTYiLCJpbnRlcm5hbFVzZXJJRCI6IjExMDgzMiJ9.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.gZmJzwaOGQOxGW-rJH_vUvAsGOUZxUBeSI7SsOwaQ0o&dbName=demo_v0_9_2&actionName=GET_LOT_AWS_ATTACHMENT&procInstanceName=stock&lotName=123456%205%2F10&qualifId=1";

  return html`
      <button @click=${handleGenerateLabel}>Generate Label Preview</button>
      <button @click=${() => window.print()}>Print</button>
      <div id="labelPreviewContainer" style="border: 1px solid #000; width: 400px; height: 600px;"></div>
<!--      <preview-file></preview-file> -->
      <flip-card .config=${flipCardConfig1} .data=${flipCardData1}></flip-card>
      <flip-card .config=${flipCardConfig2} .data=${flipCardData2}></flip-card>
      <serial-port-component lang=${props.lang} .sendEnabled="${true}" .isTimeoutEditable="${false}" .showAlert="${false}"></serial-port-component>
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
      <div class="section">
        <h3>Upload</h3>
        <upload-button 
          name="upload" 
          label="File"
        ></upload-button>
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
  `;
};

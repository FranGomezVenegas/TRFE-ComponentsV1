import { html } from "lit-element";
import '../uploadButton/index';
import '../dropzone/index';
import '../cameraview/index';
import "../codeview/index";
// import "../qrcode-scanner/index";
import '../Calendar/index';
import '../Tree/treeview/index';
import '../MolecularEditor/molecular-editor';
import '../flipcard/flipcard';
import '../serialPort/serial-port';
import '../PreviewFile/previewfile';
import '../TablesDiagram/tables.diagram.main'
import '../FlowDiagram/main'
import '../diagram/main';

import { generateLabel, previewLabel } from '../GenericDialogs/labelGenerator';

export const template = (props) => {
  const { selectedItems, lang, handleSelectItem, getSelectedItems, handleGenerateLabel } = props;

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

  let flipCardConfig1 = { flipCardAllowed: true, cardsPerRow:5 };
  let flipCardData11 = {
    contentOnFront: {
      cardTitle: { label_en: "All Inventory", label_es: "Todo el Stock" },
      textTop: { label_en: "Hello", label_es: "Esto es un texto", type: "normal" },
      textLow: { label_en: "Goodbye", label_es: "Un ejemplo más", type: "warning" }
    },
    contentOnBack: {
      cardTitle: { label_en: "All Inventory", label_es: "Todo el Stock" },
      detail: { label_en: ["All Inventory", "Critical!"], label_es: ["Todo el Stock", "Crítico!"], types: ["normal", "critical"] }
    },
    procInstanceName: 'stock',
    viewName: 'MasterData',
    flipCardAllowed: true,
    clickLinkAllowed: true
  }
  ;
  let flipCardData12 = { imageHeight: "70px", ximageUrl:"https://images.unsplash.com/photo-1720475376136-bf9bf6c0c782?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", textLow: "Hola222", textTop: 'bye', flipCardAllowed: false, flipCardAllowed: true, clickLinkAllowed:true };
  let flipCardData13 = { 
    
    contentOnFront:{
      cardTitle:{label_en:"All Inventory", label_es:"Todo el Stock"}, 
      textTop: {label_en:"Hello", label_es:"Esto es un texto"},
      textLow: {label_en:"Goodbye", label_es:"Un ejemplo más"},
    },  
    contentOnBack:{
      
      detail:{label_en:["All Inventory"], 
        label_es:["Todo el Stock", "Todo el Stock"]}, 
    },  
    procInstanceName: 'stock', viewName:'MasterData', 
    flipCardAllowed: true, clickLinkAllowed:true};

  let flipCardDataGroup1=[]
  flipCardDataGroup1.push(flipCardData11)
  flipCardDataGroup1.push(flipCardData12)
  flipCardDataGroup1.push(flipCardData13)
  flipCardDataGroup1.push(flipCardData12)

  let flipCardConfig2 = { flipCardAllowed: false };
  let flipCardData21 = { textLow: "Hola222", textTop: 'Hola', flipCardAllowed: true, clickLinkAllowed:true };
  let flipCardDataGroup2=[]
  flipCardDataGroup2.push(flipCardData21)

  let buttonForDownloadAwsFileUrl = "http://localhost:8081/TRAZiT-API/app/procs/InvTrackingAPIqueries?finalToken=eyJ1c2VyREIiOiJyJmQiLCJkYXRldGltZUZvcm1hdEF0UGxhdGZvcm1MZXZlbCI6IkRJU0FCTEVEIiwicHJvY3NNb2R1bGVOYW1lIjoiUmFuZEQqUmFuZEQgUFJPSkVDVFMiLCJkYk5hbWUiOiJkZW1vX3YwXzlfMiIsInR5cCI6IkpXVCIsInVzZXJfcHJvY2VkdXJlX2hhc2hjb2RlcyI6IlJhbmREKjEqMTIzODQ1ODM2NSIsImVTaWduIjoiZmlybWFkZW1vIiwidXNlckRCUGFzc3dvcmQiOiJ0cmF6aXQ0ZXZlciIsInVzZXJNYWlsIjoiaW5mb0B0cmF6aXQubmV0IiwidXNlcl9wcm9jZWR1cmVzIjoiW1JhbmREXSIsImFwcFNlc3Npb25JZCI6IjYyOTgiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJGcmkgTWF5IDE3IDA5OjA3OjU3IFVUQyAyMDI0IiwidXNlclJvbGUiOiJyJmQgc3VwZXJ1c2VyIiwiYWxnIjoiSFMyNTYiLCJpbnRlcm5hbFVzZXJJRCI6IjExMDgzMiJ9.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.gZmJzwaOGQOxGW-rJH_vUvAsGOUZxUBeSI7SsOwaQ0o&dbName=demo_v0_9_2&actionName=GET_LOT_AWS_ATTACHMENT&procInstanceName=stock&lotName=123456%205%2F10&qualifId=1";

  return html`
    <diagram-component></diagram-component>
    <graph-flow-component .model="${{
    "class": "GraphLinksModel",
    "nodeDataArray": [
      {"key":-1,"category":"Start","loc":"-237 41","text":"Start"},
      {"key":-2,"category":"End","loc":"277 696","text":"End"},
      {"category":"Conditional","text":"Is data\ntree-like?","key":-14,"loc":"40 165"},
      {"text":"Use a TreeModel","key":-5,"loc":"-100 230"},
      {"text":"Use a GraphLinksModel","key":-6,"loc":"180 230"},
      {"category":"Comment","text":"GraphLinksModel\nalso allows Groups","key":-7,"loc":"362 230"},
      {"text":"Create DIV for Diagram","key":-8,"loc":"-64 41"},
      {"text":"Create new Diagram associated with DIV","key":-9,"loc":"164 41"},
      {"text":"Style node templates","key":-10,"loc":"40 617"},
      {"text":"Add data to node/linkDataArray","key":-12,"loc":"180 320"},
      {"text":"Add data to nodeDataArray, including parent","key":-13,"loc":"-100 320"},
      {"text":"Style link templates","key":-15,"loc":"277 617"},
      {"category":"Conditional","text":"Should nodes be auto-positioned?","key":-16,"loc":"40 460"},
      {"text":"Choose a layout","key":-18,"loc":"-100 525"},
      {"text":"Set location in node data and bind","key":-17,"loc":"180 525"}
    ],
    "linkDataArray": [
      {"from":-1,"to":-8},
      {"from":-8,"to":-9},
      {"from":-5,"to":-13},
      {"from":-6,"to":-12},
      {"from":-15,"to":-2},
      {"from":-14,"to":-5,"text":"Yes"},
      {"from":-14,"to":-6,"text":"No"},
      {"from":-9,"to":-14},
      {"from":-13,"to":-16},
      {"from":-12,"to":-16},
      {"from":-16,"to":-18,"text":"Yes"},
      {"from":-16,"to":-17,"text":"No"},
      {"from":-18,"to":-10},
      {"from":-17,"to":-10},
      {"from":-10,"to":-15}
    ]}}">
  </graph-flow-component>

     <table-diagram
    .nodeDataArray=${[
      {
        key: 'Record1',
        fields: [
          { name: 'field1', info: '', color: '#F7B84B', figure: 'Ellipse' },
          { name: 'field2', info: 'the second one', color: '#F25022', figure: 'Ellipse' },
          { name: 'fieldThree', info: '3rd', color: '#00BCF2' },
        ],
        loc: '0 0',
      },
      {
        key: 'Record2',
        fields: [
          { name: 'fieldA', info: '', color: '#FFB900', figure: 'Diamond', info: 'diamond' },
          { name: 'fieldB', info: '', color: 'green', figure: 'Circle', info: 'circle' },
          { name: 'fieldC', info: '', color: 'red', figure: 'Triangle', info: 'triangle' },
          { name: 'fieldD', info: '', figure: 'XLine', info: 'X' },
        ],
        loc: '250 0',
      },
      {
        key: 'Sample',
        fields: [
          { name: 'sampleField1', info: '', color: '#00BCF2', figure: 'Ellipse' },
          { name: 'sampleField2', info: 'example', color: '#F25022', figure: 'Ellipse' },
        ],
        loc: '500 0',
      },
    ]}
    .links=${[
      { from: { key: 'Record1', field: 'field2' }, to: { key: 'Record2', field: 'fieldD' } },
      { from: { key: 'Record1', field: 'field1' }, to: { key: 'Sample', field: 'sampleField1' } },
      { from: { key: 'Record2', field: 'fieldA' }, to: { key: 'Sample', field: 'sampleField2' } },
    ]}
  ></table-diagram>

      <button @click=${handleGenerateLabel}>Generate Label Preview</button>
      <button @click=${() => window.print()}>Print</button>
      <div id="labelPreviewContainer" style="border: 1px solid #000; width: 400px; height: 600px;"></div>
<!--      <preview-file></preview-file> -->
      <flip-card .lang=${lang} .config=${flipCardConfig1} .data=${flipCardDataGroup1}></flip-card>
      
      <flip-card .lang=${lang} .config=${flipCardConfig2} .data=${flipCardDataGroup2}></flip-card>
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

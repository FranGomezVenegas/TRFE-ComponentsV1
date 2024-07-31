import { LitElement, html } from 'lit-element';
import { template } from './app.template';
import { styles } from './app.css';
import { generateLabel, previewLabel } from '../GenericDialogs/labelGenerator';
import '@cicciosgamino/qr-code-element';

export class PrototypeElementsViewMain extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      entity: { type: String },
      lang: { type: String },
      selectedItems: { type: Object },
      treeElementData: { type: Array },
      treeElementSpecification: { type: Array },
      labelFormat: { type: Object },
      labelData: { type: Object }
    };
  }

  constructor() {
    super();
    this.entity = "";
    this.labelFormat = {
      width: 400,
      height: 600,
      fields: [
        { label_en: 'CAS', label_es: 'CAS', key: 'cas', x: 10, y: 10 },
        { label_en: 'Quantity', label_es: 'Cantidad', key: 'quantity', x: 10, y: 50 },
        { label_en: 'Condition', label_es: 'Condición', key: 'conservation_condition', x: 10, y: 90 },
        { label_en: 'Status', label_es: 'Estado', key: 'status', x: 10, y: 130 },
        { label_en: 'Lot Name', label_es: 'Nombre de Lote', key: 'lot_name', x: 10, y: 170, isQr: true },
        { label_en: 'Reference', label_es: 'Referencia', key: 'reference', x: 10, y: 210, isBarcode: true }
      ]
    };
    this.labelData = {
      is_locked: false,
      vendor_coa_verified: false,
      locked_reason: "",
      quantity: 7,
      expiry_date_in_use: "",
      cas: "12-52-2",
      category: "Reactivos Comerciales",
      conservation_condition: "ROOM_TEMP",
      expiry_date: "",
      expiry_date_in_use: "",
      logged_by: "NEWAdmin alias",
      logged_on: "2024-04-25 18:20:32.2472",
      lot_name: "pruebaCAS2",
      purity: "",
      quantity_uom: "mL",
      reference: "REF1",
      retest_date: "",
      retired: false,
      retired_by: "",
      retired_on: "",
      status: "QUALIFIFICATION_REJECTED",
      status_previous: "UNDER_QUALIFIFICATION",
      vendor: "",
      vendor_coa_verified: false,
      vendor_lot: "",
      vendor_reference: "",
      name: "example-name-for-qr" // Asegúrate de que el campo `name` está definido
    };
    this.selectedItems = {};
    this.treeElementData = [
      {
        "name": "hola lvl1",
        "level2": [
          { "otro": "hola lvl2" },
          { "otro": "adios lvl2" }
        ]
      },
      {
        "name": "adios lvl1"
      }
    ];
    this.treeElementSpecification = [
      {
        "key": "name",
        "label": "name",
        "label2": ["'('", "name", "') '", "name"],
        "children": "level2"
      },
      {
        "key": "otro",
        "label": "otro",
        "label2": ["'('", "otro", "') '", "otro"],
        "children": "children"
      }
    ];
  }

  async _handleGenerateLabel() {
    console.log('Generating label with data:', this.labelData, this.labelFormat);
    const labelContainer = await generateLabel(this.labelData, this.labelFormat);
    this._labelContainer = labelContainer;
    this.requestUpdate();
  }

  updated() {
    if (this._labelContainer) {
      previewLabel(this._labelContainer, 'labelPreviewContainer');
      this._labelContainer = null;
    }
  }

  render() {
    return html`
<!--      <button @click=${this._handleGenerateLabel}>Generate Label Preview</button>
      <button @click=${() => window.print()}>Print</button>
      <div id="labelPreviewContainer" style="border: 1px solid #000; width: 400px; height: 600px;"></div> -->
      ${template({
        selectedItems: this.selectedItems,
        lang: this.lang,
        handleSelectItem: this._handleSelectItem,
        getSelectedItems: this._getSelectedItems,
        handleGenerateLabel: this._handleGenerateLabel,
        treeElementData: this.treeElementData,
        treeElementSpecification: this.treeElementSpecification,
        treeSelection: this._treeSelection,
      })}
    `;
  }

  _handleSelectItem = (entity, itemData) => {
    if (this.entity !== entity) {
      this.selectedItems = {};
      this.entity = entity;
    }

    const { key } = itemData;
    if (!this.selectedItems[key]) {
      this.selectedItems[key] = itemData;
    } else {
      delete this.selectedItems[key];
    }
  };

  _getSelectedItems = () => {
    console.log(this.selectedItems);
  };

  _treeSelection = () => {
    const myTree = this.shadowRoot.querySelector("tree-view#mytree");
    if (myTree) {
      setTimeout(() => {
        alert(myTree.value);
      }, 0);
    }
  };
}

window.customElements.define('prototype-elements-view-main', PrototypeElementsViewMain);

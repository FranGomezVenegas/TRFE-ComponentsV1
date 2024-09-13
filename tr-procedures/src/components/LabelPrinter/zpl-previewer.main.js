import { LitElement, html } from 'lit';
import { styles } from './zpl-previewer.styles.js';
import { template } from './zpl-previewer.template.js';
import '@material/mwc-dialog';
import { PrintPreview } from './print-preview.js';
import '@alenaksu/json-viewer';

class ZplPreviewer extends LitElement {
  static properties = {
    zplCode: { type: String },
    imageUrl: { type: String },
    labelWidth: { type: String },
    labelHeight: { type: String },
    showPrintCodeButton: { type: Boolean },
    showPreviewButton: { type: Boolean },
    showPrintLabelButton: { type: Boolean },
    showCombinedPreviewButton: { type: Boolean },
    zplEntries: { type: Array },
    objectsLoad: { type: Array },
  };

  static styles = styles;

  constructor() {
    super();
    this.zplCode = '';
    this.imageUrl = '';
    this.showPrintCodeButton = true;
    this.showPreviewButton = true;
    this.showPrintLabelButton = true;
    this.showCombinedPreviewButton = true;
    this.objectsLoad = [
      {
        object_class: 'sample',
        object_data: {
          id: 1,
          name: 'exampleSample1',
        },
      },
      {
        object_class: 'sample',
        object_data: {
          id: 2,
          name: 'exampleSample2',
        },
      },
      {
        object_class: 'other',
        object_data: {
          code: 'X',
          description: 'description',
        },
      },
    ];
    this.zplEntries = [
      { label: 'TRAZiT labels', value: 'hola', left: 220, top: 10, fontSize: 10, specialEncoding: 'no', description: 'Text data' },
      { label: 'TRAZiT labels', value: '{sample.name.1}', left: 220, top: 50, fontSize: 10, specialEncoding: 'no', description: 'Text data' },
      { label: '', value: 'http://www.example.com^FS', left: 100, top: 100, fontSize: 10, specialEncoding: 'QR', description: 'QR' },
      { label: '', value: 'http://www.example.com^FS', left: 220, top: 80, fontSize: 10, specialEncoding: 'barcode', description: 'barcode' },
    ];

    this.zplEntries2 = [
      { command: '^FD', params: 'TRAZiT labels^FS', description: 'Text data' },
      { command: '^FO', params: '220,50', description: 'Position product' },
      { command: '^FD', params: 'Product: Aspirine^FS', description: 'Product name' },
      { command: '^FO', params: '220,80', description: 'Position barcode' },
      { command: '^BY', params: '2,3,75', description: 'Barcode size' },
      { command: '^BC', params: '', description: 'Barcode type' },
      { command: '^FD', params: '12345678^FS', description: 'Barcode data' },
      { command: '^FO', params: '100,100', description: 'Position QR Code' },
      { command: '^BQN,2,10', params: '', description: 'QR Code command' },
      { command: '^FDQA,', params: 'http://www.example.com^FS', description: 'QR Code data' },
    ];
    this.labelWidth = 10;
    this.labelHeight = 5;
    this.labelUnit = 'cm';
    this._regenerateZpl();
    window.addEventListener('resize', () => this._resizeViewer());
  }

  firstUpdated() {
    this._fetchLabelPreview();
  }

  render() {
    return template(this);
  }

  renderButtons() {
    return html`
      <div class="controls">
        ${this.showPrintCodeButton ? html`<button @click="${this._openPrintCodeDialog}">See Code</button>` : ''}
        ${this.showPreviewButton ? html`<button @click="${this._printLabelBrowserPreview}">Preview</button>` : ''}
        ${this.showPrintLabelButton ? html`<button @click="${this._printLabel}">Print Label</button>` : ''}
        ${this.showCombinedPreviewButton ? html`<button @click="${this._combinedPreview}">Combined Preview</button>` : ''}
      </div>
    `;
  }

  renderZplCode() {
    return html`
      <div class="left-panel">
        <textarea @input="${this._updateZpl}">${this.zplCode}</textarea>
      </div>
    `;
  }

  renderPreviewLabel() {
    return html`
      <div id="viewer" class="right-panel">
        ${this.imageUrl ? html`<img src="${this.imageUrl}" alt="Label Preview">` : html`<p>Loading...</p>`}
      </div>
    `;
  }

  renderTableSection() {
    return html`
      <div>
        <div style="margin-bottom: 10px;">
          <label>Label Size:</label>
          <input type="number" .value="${this.labelWidth}" @input="${this._updateLabelWidth}" style="width: 5ch;"> x 
          <input type="number" .value="${this.labelHeight}" @input="${this._updateLabelHeight}" style="width: 5ch;">
          <select .value="${this.labelUnit}" @change="${this._updateLabelUnit}">
            <option value="cm">cm</option>
            <option value="mm">mm</option>
            <option value="inches">inches</option>
          </select>
          <button @click="${this._addEntry}">Add Entry</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Label</th>
              <th>Value</th>
              <th>Left</th>
              <th>Top</th>
              <th>Font size</th>
              <th>Special Encoding</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${this.zplEntries.map((entry, index) => html`
              <tr>
                <td><input type="text" .value="${entry.label}" @input="${e => this._updateEntry(index, 'label', e)}" style="width: 15ch;"></td>
                <td><input type="text" .value="${entry.value}" @input="${e => this._updateEntry(index, 'value', e)}" style="width: 20ch;"></td>
                <td><input type="number" .value="${entry.left}" @input="${e => this._updateEntry(index, 'left', e)}" style="width: 5ch;"></td>
                <td><input type="number" .value="${entry.top}" @input="${e => this._updateEntry(index, 'top', e)}" style="width: 5ch;"></td>
                <td><input type="number" .value="${entry.fontSize}" @input="${e => this._updateEntry(index, 'fontSize', e)}" style="width: 5ch;"></td>
                <td>
                  <select .value="${entry.specialEncoding}" @change="${e => this._updateEntry(index, 'specialEncoding', e)}">
                    <option value="no">No Encoding</option>
                    <option value="QR">QR Code</option>
                    <option value="barcode">Barcode</option>
                  </select>
                </td>
                <td><input type="text" .value="${entry.description}" @input="${e => this._updateEntry(index, 'description', e)}"></td>
                <td>
                  <button @click="${() => this._removeEntry(index)}">Remove</button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  renderObjectsLoadSection() {
    return html`
      <div class="json-viewer-container">
        <div class="controls">
          <button @click="${this._addObjectLoadEntry}">Add Object</button>
        </div>
        ${this.objectsLoad.map(
          (s) => html`<json-viewer>${JSON.stringify(s)}</json-viewer>`
        )}
        ${this.objectsLoad.map((obj, index) => html`
          <div class="json-viewer">
            ${obj.object_class}
            <json-viewer>${JSON.stringify(obj)}</json-viewer>
            <button class="remove-button" @click="${() => this._removeObjectLoadEntry(index)}">Remove</button>
          </div>
        `)}
      </div>
    `;
  }

  _updateLabelWidth(event) {
    this.labelWidth = parseFloat(event.target.value);
    this._regenerateZpl();
  }

  _updateLabelHeight(event) {
    this.labelHeight = parseFloat(event.target.value);
    this._regenerateZpl();
  }

  _updateLabelUnit(event) {
    this.labelUnit = event.target.value;
    this._regenerateZpl();
  }

  _addEntry() {
    const newEntry = {
      command: '^CF',
      params: `${this.fontType},${this.fontSize}`,
      description: 'New Font Entry',
    };
    this.zplEntries = [...this.zplEntries, newEntry];
    this._regenerateZpl();
  }

  _updateEntry(index, key, event) {
    const value = event.target.value.trim();
    this.zplEntries = [
      ...this.zplEntries.slice(0, index),
      { ...this.zplEntries[index], [key]: value },
      ...this.zplEntries.slice(index + 1),
    ];
    this._regenerateZpl();
  }

  _removeEntry(index) {
    this.zplEntries = [
      ...this.zplEntries.slice(0, index),
      ...this.zplEntries.slice(index + 1),
    ];
    this._regenerateZpl();
  }

  _cmToPx(cm) {
    return (cm / 2.54 * 96).toFixed(0);
  }

  _updateZpl(event) {
    this.zplCode = event.target.value;
    this._fetchLabelPreview();
  }

  _fetchLabelPreview() {
    const labelaryUrl = `https://api.labelary.com/v1/printers/8dpmm/labels/${this._cmToInches(this.labelWidth)}x${this._cmToInches(this.labelHeight)}/0/`;

    fetch(labelaryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: this.zplCode,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        this.imageUrl = URL.createObjectURL(blob);
        this.requestUpdate();
      })
      .catch((error) => {
        console.error('Error fetching label preview:', error);
      });
  }

  _cmToInches(cm) {
    return (cm / 2.54).toFixed(2);
  }

  _openPrintCodeDialog() {
    const dialog = this.shadowRoot.getElementById('printCodeDialog');
    dialog.show();
  }

  _printLabel() {
    console.log('Print Label');
    if (typeof BrowserPrint === 'undefined') {
      console.error('BrowserPrint is not defined');
      return;
    }

    BrowserPrint.getDefaultDevice('printer', (device) => {
      console.log('Selected device:', device);
      console.log(this.zplCode);
      device.send(this.zplCode, () => {
        console.log('Print successful');
      }, (error) => {
        console.error('Error printing:', error);
      });
    }, (error) => {
      console.error('Error getting default device:', error);
    });
  }

  _combinedPreview() {
    console.log('Combined Preview');
  }

  _resizeViewer() {
    const viewer = this.shadowRoot.getElementById('viewer');
    const appContainer = this.shadowRoot.getElementById('app-container');

    const labelWidthInPixels = this._convertToPixels(this.labelWidth, this.labelUnit);
    const labelHeightInPixels = this._convertToPixels(this.labelHeight, this.labelUnit);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const scaleWidth = viewportWidth / labelWidthInPixels;
    const scaleHeight = viewportHeight / labelHeightInPixels;
    const scale = Math.min(scaleWidth, scaleHeight);

    viewer.style.transform = `scale(${scale})`;
    viewer.style.transformOrigin = 'top left';
    viewer.style.width = `${labelWidthInPixels}px`;
    viewer.style.height = `${labelHeightInPixels}px`;

    appContainer.style.width = `${viewportWidth}px`;
    appContainer.style.height = `${viewportHeight}px`;
  }

  _convertToPixels(value, unit) {
    switch (unit) {
      case 'cm':
        return value * 37.795;
      case 'inches':
        return value * 96;
      case 'mm':
        return value * 3.7795;
      default:
        return value;
    }
  }

  _printLabelBrowserPreview() {
    const printPreview = new PrintPreview(this.imageUrl);
    printPreview.print();
  }

  _resolvePlaceholder(value) {
    const regex = /\{(\w+)\.(\w+)\.(\d+)\}/;
    const match = regex.exec(value);
    if (match) {
      const [, objectClass, property, index] = match;
      const object = this.objectsLoad.find((o) => o.object_class === objectClass && o.object_data[property]);
      if (object && object.object_data[property]) {
        return object.object_data[property];
      }
    }
    return value;
  }

  _regenerateZpl() {
    this.zplCode = '^XA';

    this.zplEntries.forEach((entry) => {
      const resolvedValue = this._resolvePlaceholder(entry.value);
      const fontCommand = `^CF0,${entry.fontSize}`;
      const positionCommand = `^FO${entry.left},${entry.top}`;

      let encodingCommand;

      switch (entry.specialEncoding) {
        case 'QR':
          encodingCommand = `^BQN,2,10^FDQA,${resolvedValue}^FS`;
          break;
        case 'barcode':
          encodingCommand = `^BY2,3,75^BC^FD${resolvedValue}^FS`;
          break;
        default:
          encodingCommand = `^FD${entry.label ? `${entry.label} ` : ''}${resolvedValue}^FS`;
          break;
      }

      this.zplCode += `${fontCommand}${positionCommand}${encodingCommand}`;
    });

    this.zplCode += '^XZ';
    this._fetchLabelPreview();
  }
}

customElements.define('zpl-previewer', ZplPreviewer);

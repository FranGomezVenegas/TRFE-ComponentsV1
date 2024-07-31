import { LitElement, html, css } from 'lit';

class ZplPreviewer extends LitElement {
  static properties = {
    zplCode: { type: String },
    imageUrl: { type: String },
    labelWidth: { type: String },
    labelHeight: { type: String },
    showPrintCodeButton: { type: Boolean },
    showPreviewButton: { type: Boolean },
    showPrintLabelButton: { type: Boolean },
    showCombinedPreviewButton: { type: Boolean }
  };

  constructor() {
    super();
    this.zplCode = '^XA^FX Top section with logo, name and address.^CF0,60^CF0,30^FO220,15^FD TRAZiT labels^FS^FO220,50^FDProduct: Aspirine^FS^FO220,80^BY2,3,75^BC^FD12345678^FS^XZ';
    this.imageUrl = '';
    this.labelWidth = '10'; // Default width in centimeters
    this.labelHeight = '15'; // Default height in centimeters
    this.showPrintCodeButton = true;
    this.showPreviewButton = true;
    this.showPrintLabelButton = true;
    this.showCombinedPreviewButton = true;
  }

  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .top-panel {
      display: flex;
      flex-direction: row;
      padding: 10px;
    }
    .left-panel, .right-panel {
      flex: 1;
      padding: 10px;
    }
    .controls {
      display: flex;
      flex-direction: column;
      margin-right: 10px;
    }
    .controls input, .controls button {
      margin-bottom: 10px;
    }
    .content {
      display: flex;
      flex: 1;
      height: calc(100% - 150px); /* Adjust based on the height of top-panel */
    }
    textarea {
      width: 100%;
      height: 100%;
      font-family: monospace;
      resize: none;
    }
    .right-panel {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid black; /* Add solid border */
      box-sizing: border-box; /* Include border in the element's dimensions */
    }
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain; /* Ensure image fits within the container while maintaining aspect ratio */
    }
  `;

  render() {
    return html`
      <div class="container">
        <div class="top-panel">
          <div class="controls">
            <input type="text" placeholder="Label Width (cm)" .value="${this.labelWidth}" @input="${e => this.labelWidth = e.target.value}">
            <input type="text" placeholder="Label Height (cm)" .value="${this.labelHeight}" @input="${e => this.labelHeight = e.target.value}">
            ${this.showPrintCodeButton ? html`<button @click="${this._printCode}">Print Code</button>` : ''}
            ${this.showPreviewButton ? html`<button @click="${this._fetchLabelPreview}">Preview</button>` : ''}
            ${this.showPrintLabelButton ? html`<button @click="${this._printLabel}">Print Label</button>` : ''}
            ${this.showCombinedPreviewButton ? html`<button @click="${this._combinedPreview}">Combined Preview</button>` : ''}
          </div>
        </div>
        <div class="content">
          <div class="left-panel">
            <textarea @input="${this._updateZpl}">${this.zplCode}</textarea>
          </div>
          <div class="right-panel" style="width: ${this._cmToPx(this.labelWidth)}px; height: ${this._cmToPx(this.labelHeight)}px;">
            ${this.imageUrl ? html`<img src="${this.imageUrl}" alt="Label Preview">` : html`<p>Loading...</p>`}
          </div>
        </div>
      </div>
    `;
  }

  _cmToPx(cm) {
    return (cm / 2.54 * 96).toFixed(0); // Convert cm to pixels at 96 DPI
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
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: this.zplCode
    })
    .then(response => response.blob())
    .then(blob => {
      this.imageUrl = URL.createObjectURL(blob);
      this.requestUpdate();
    })
    .catch(error => {
      console.error('Error fetching label preview:', error);
    });
  }

  _cmToInches(cm) {
    return (cm / 2.54).toFixed(2);
  }

  _printCode() {
    console.log("Print Code: ", this.zplCode);
    // Add code to print the ZPL code
  }

  _printLabel() {
    console.log("Print Label");
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
    console.log("Combined Preview");
    // Add code for combined preview
  }

  firstUpdated() {
    this._fetchLabelPreview();
  }
}

customElements.define('zpl-previewer', ZplPreviewer);

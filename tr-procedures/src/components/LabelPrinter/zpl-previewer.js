import { LitElement, html, css } from 'lit';
import '@material/mwc-dialog';
import { styles } from './zpl-previewer.styles.js';
import { PrintPreview } from './print-preview.js';
import '@alenaksu/json-viewer';
import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button';
import { TrazitTheme } from '@trazit/tr-styling/src/theme-trazit.js';

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
    selectedObjectClass: { type: String },
    selectedProperty: { type: String },
    selectedIndex: { type: Number },      
  };

  constructor() {
    super();
    this.zplCode = '';
    this.imageUrl = '';
    this.showPrintCodeButton = true;
    this.showPreviewButton = true;
    this.showPrintLabelButton = true;
    this.showCombinedPreviewButton = true;
    this.objectsLoad=[
      {
        object_class:'sample',
        object_data:{
          id:1,
          name: 'exampleSample1'
        }
      },
      {
        object_class:'sample',
        object_data:{
          id:2,
          name: 'exampleSample2'
        }
      },
      {
        object_class:'other',
        object_data:{
          code:'X',
          description: 'description'
        }
      }            
    ]
    this.zplEntries=[
      { label: 'TRAZiT labels', value: 'hola', left: 420, top:15, fontSize:25, specialEncoding:'no', description: 'Text data' },
      { label: 'TRAZiT labels', value: '{sample.name.1}', left: 450, top:50, fontSize:20, specialEncoding:'no', description: 'Text data' },
      { label: '', value: 'http://www.example.com^FS', left: 10, top:0, fontSize:5, specialEncoding:'QR', description: 'QR' },
      { label: '', value: 'http://www.example.com^FS', left: 220, top:305, fontSize:7, specialEncoding:'barcode', description: 'barcode' }
    ]

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
      { command: '^FDQA,', params: 'http://www.example.com^FS', description: 'QR Code data' }
    ];
    this.labelWidth = 10; // Default label width
    this.labelHeight = 5; // Default label height
    this.labelUnit = 'cm'; // Default unit for label size
    this._regenerateZpl()
    window.addEventListener('resize', () => this._resizeViewer());
  }

  static get styles() {
    return [
      styles,      
      TrazitTheme,
      css`
        /* Additional custom styles if needed */
      `
    ];
  }
  

  firstUpdated(){
    this._regenerateZpl()
  }
  renderStyling(){
    return html`
    <tr-styling .config="${{ theme: 'cliente1' }}">
      ${this.renderMain}
    </tr-styling>
    `
  }
  render() {
    return html`
      <div id="app-container" class="container">
        <div class="top-panel">
          ${this.renderTableSection()}
          <div class="right-panel-container">
            ${this.renderButtons()}
            ${this.renderPreviewLabel()}
          </div>
        </div>
        <div class="objects-load-section">
          ${this.renderObjectsLoadSection()}
        </div>
<!--        <div class="content">
          ${this.renderZplCode()}
        </div> -->
        <mwc-dialog id="printCodeDialog" heading="ZPL Code">
          <prestyle="white-space: pre-wrap; word-break: break-word;">${this.zplCode}</pre>
          <md-filled-icon-button style="padding-top:20px;" slot="primaryAction" dialogAction="close">Close</md-filled-icon-button>
      </mwc-dialog>

      <mwc-dialog id="wizardDialog" heading="Create Value">
        <mwc-select label="Object Class" @selected=${this._onObjectClassSelected}>
          ${this._getUniqueObjectClasses().map(
            (objClass) => html`<mwc-list-item value="${objClass}">${objClass}</mwc-list-item>`
          )}
        </mwc-select>
        <mwc-select label="Property" @selected=${this._onPropertySelected}>
          ${this.selectedObjectClass && this._getPropertiesForSelectedClass().map(
            (prop) => html`<mwc-list-item value="${prop}">${prop}</mwc-list-item>`
          )}
        </mwc-select>        
        <mwc-textfield label="Index" type="number" min="1" .value=${this.selectedIndex}></mwc-textfield>
        <md-filled-icon-button slot="primaryAction" @click="${this._onWizardOk}" disabled id="wizardOkButton">OK</md-filled-icon-button>
        <md-filled-icon-button slot="secondaryAction" dialogAction="close">Cancel</md-filled-icon-button>
      </mwc-dialog>      
      </div>
    `;
  }

  _getUniqueObjectClasses() {
    const objectClasses = this.objectsLoad.map(obj => obj.object_class);
    return [...new Set(objectClasses)]; // Eliminar duplicados
  }

  _getPropertiesForSelectedClass() {
    const selectedObject = this.objectsLoad.find(obj => obj.object_class === this.selectedObjectClass);
    return selectedObject ? Object.keys(selectedObject.object_data) : [];
  }
  renderButtons(){
    return html`
      <div class="controls" style="display: flex; flex-direction: row; gap: 10px;">
        ${this.showPrintCodeButton ? html`<md-filled-icon-button class="button" @click="${this._openPrintCodeDialog}"><md-icon>quick_reference</md-icon></md-filled-icon-button>` : ''}
        ${this.showPreviewButton ? html`<md-filled-icon-button class="button" @click="${this._printLabelBrowserPreview}"><md-icon>preview</md-icon></md-filled-icon-button>` : ''}
        ${this.showPrintLabelButton ? html`<md-filled-icon-button class="button" @click="${this._printLabel}"><md-icon>print</md-icon></md-filled-icon-button>` : ''}
        ${this.showCombinedPreviewButton ? html`<md-filled-icon-button class="button" @click="${this._combinedPreview}"><md-icon>photo_prints</md-icon></md-filled-icon-button>` : ''}
      </div>
    `;
  }
  
  renderButtonsOld(){
    return html`
      <div class="controls" style="display: flex; flex-direction: row; gap: 10px;">
        ${this.showPrintCodeButton ? html`<md-filled-icon-button class="button" @click="${this._openPrintCodeDialog}">See Code</button>` : ''}
        ${this.showPreviewButton ? html`<md-filled-icon-button class="button" @click="${this._printLabelBrowserPreview}">Preview</button>` : ''}
        ${this.showPrintLabelButton ? html`<md-filled-icon-button class="button" @click="${this._printLabel}">Print Label</button>` : ''}
        ${this.showCombinedPreviewButton ? html`<md-filled-icon-button class="button" @click="${this._combinedPreview}">Combined Preview</button>` : ''}
      </div>
    `;
  }

  renderZplCode(){
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
          <!-- Label Size Inputs -->
          <label>Label Size:</label>
          <input type="number" .value="${this.labelWidth}" @input="${this._updateLabelWidth}" style="width: 7ch;"> x 
          <input type="number" .value="${this.labelHeight}" @input="${this._updateLabelHeight}" style="width: 7ch;">
          <select .value="${this.labelUnit}" @change="${this._updateLabelUnit}">
            <option value="cm">cm</option>
            <option value="mm">mm</option>
            <option value="inches">inches</option>
          </select>
          <md-filled-icon-button class="button" @click="${this._addEntry}"><md-icon>add</md-icon></md-filled-icon-button>
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
                <td>
                  <input type="text" .value="${entry.value}" @input="${e => this._updateEntry(index, 'value', e)}" style="width: 20ch;">
                  <md-filled-icon-button class="button" @click="${() => this._openWizardDialog(index)}">...</button>
                </td>
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
                  <md-filled-icon-button class="button" @click="${() => this._removeEntry(index)}"><md-icon>delete_forever</md-icon></md-filled-icon-button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
  
  _openWizardDialog(entryIndex) {
    this.selectedObjectClass = '';
    this.selectedProperty = '';
    this.selectedIndex = 1;
    this.currentEntryIndex = entryIndex;
    const wizardDialog = this.shadowRoot.getElementById('wizardDialog');
    const okButton = this.shadowRoot.getElementById('wizardOkButton');
    okButton.disabled = true;
    wizardDialog.show();
  }

  _onObjectClassSelected(event) {
    this.selectedObjectClass = event.target.value;
    this.selectedProperty = '';
    const wizardDialog = this.shadowRoot.getElementById('wizardDialog');
    wizardDialog.requestUpdate();
    this._checkWizardValidity();
  }

  _onPropertySelected(event) {
    this.selectedProperty = event.target.value;
    this._checkWizardValidity();
  }

  _checkWizardValidity() {
    const okButton = this.shadowRoot.getElementById('wizardOkButton');
    if (this.selectedObjectClass && this.selectedProperty) {
      okButton.disabled = false;
    } else {
      okButton.disabled = true;
    }
  }

  _onWizardOk() {
    const wizardDialog = this.shadowRoot.getElementById('wizardDialog');
    const newValue = `{${this.selectedObjectClass}.${this.selectedProperty}.${this.selectedIndex}}`;
    this._updateEntry(this.currentEntryIndex, 'value', { target: { value: newValue } });
    wizardDialog.close();
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
      description: 'New Font Entry'
    };
    this.zplEntries = [...this.zplEntries, newEntry];
    this._regenerateZpl();
  }

  _updateEntry(index, key, event) {
    const value = event.target.value.trim(); // Use value, not textContent
  
    // Directly update the specific entry
    this.zplEntries = [
      ...this.zplEntries.slice(0, index),
      { ...this.zplEntries[index], [key]: value },
      ...this.zplEntries.slice(index + 1)
    ];
  
    this._regenerateZpl(); // Regenerate ZPL when an entry is updated
  }
  
  
  _removeEntry(index) {
    this.zplEntries = [
      ...this.zplEntries.slice(0, index),
      ...this.zplEntries.slice(index + 1)
    ];
    this._regenerateZpl();
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
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(blob => {
      this.imageUrl = URL.createObjectURL(blob);
      this.requestUpdate();
    })
    .catch(error => {
      console.error('Error fetching label preview:', error);
    });
}
  
  _fetchLabelPreviewGood() {
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

  _openPrintCodeDialog() {
    const dialog = this.shadowRoot.getElementById('printCodeDialog');
    dialog.show();
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
  }

  firstUpdated() {
    this._fetchLabelPreview();
  }

  _resolvePlaceholder(value) {
    const regex = /\{(\w+)\.(\w+)(?:\.(\d+))?\}/;
    const match = regex.exec(value);
    if (match) {
      const [, objectClass, property, index] = match;
      const objectIndex = index ? parseInt(index, 10) - 1 : 0; // Default to 0 (first object) if no index is provided
      const objectsOfClass = this.objectsLoad.filter(o => o.object_class === objectClass);
  
      if (objectsOfClass[objectIndex] && objectsOfClass[objectIndex].object_data[property]) {
        return objectsOfClass[objectIndex].object_data[property];
      }
    }
    return value; // Return the original value if no placeholder is found
  }
  

  _regenerateZpl() {
    this.zplCode = '^XA';
  
    this.zplEntries.forEach(entry => {
      const resolvedValue = this._resolvePlaceholder(entry.value);
      const fontCommand = `^CF0,${entry.fontSize}`;
      const positionCommand = `^FO${entry.left},${entry.top}`;
      
      let encodingCommand;
      
      switch (entry.specialEncoding) {
        case 'QR':
          encodingCommand = `^BQN,2,${entry.fontSize}^FDQA,${resolvedValue}^FS`;
          break;
        case 'barcode':
          encodingCommand = `^BY2,3,${entry.fontSize}^BC^FD${resolvedValue}^FS`;
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
   
  _regenerateZplGood() {
    // Realiza la conversión de las dimensiones de la etiqueta
    const labelWidthInMM = this._convertToMM(this.labelWidth, this.labelUnit);
    const labelHeightInMM = this._convertToMM(this.labelHeight, this.labelUnit);
    
    // Configura la ZPL incluyendo el ancho y la altura de la etiqueta
    this.zplCode = `^XA`;
    //this.zplCode +=`^PW${labelWidthInMM}^LL${labelHeightInMM}`;
  
    // Itera sobre cada entrada en zplEntries para construir los comandos ZPL
    this.zplEntries.forEach(entry => {
        const resolvedValue = this._resolvePlaceholder(entry.value);
        const positionCommand = `^FO${entry.left},${entry.top}`;
        const fontCommand = `^CF0,${entry.fontSize}`;  // Aplica el tamaño de la fuente
        
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
      
        // Añade los comandos a la cadena zplCode
        this.zplCode += `${positionCommand}${fontCommand}${encodingCommand}`;
    });
    
    // Finaliza la ZPL
    this.zplCode += '^XZ';
    
    // Verifica el ZPL generado en la consola
    console.log(this.zplCode);

    // Obtiene la vista previa de la etiqueta
    this._fetchLabelPreview();
}



// Conversion method to convert dimensions to millimeters
_convertToMM(value, unit) {
    switch (unit) {
        case 'cm':
            return value * 10; // Convert cm to mm
        case 'inches':
            return value * 25.4; // Convert inches to mm
        case 'mm':
        default:
            return value; // Already in mm
    }
}




  _resizeViewer() {
    const viewer = this.shadowRoot.getElementById('viewer');
//    const appContainer = this.shadowRoot.getElementById('app-container');
  
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
  
//    appContainer.style.width = `${viewportWidth}px`;
//    appContainer.style.height = `${viewportHeight}px`;
  }
  
  _convertToPixels(value, unit) {
    switch (unit) {
      case 'cm':
        return value * 37.795; // Aproximadamente 37.795px por cm
      case 'inches':
        return value * 96; // Aproximadamente 96px por pulgada
      case 'mm':
        return value * 3.7795; // Aproximadamente 3.7795px por mm
      default:
        return value; // Si ya está en px o en alguna otra unidad
    }
  }
  _printLabelBrowserPreview() {
    const printPreview = new PrintPreview(this.imageUrl);
    printPreview.print();
  }
  
  renderObjectsLoadSection() {
    return html`
      <div class="json-viewer-container">
        <div class="controls">
          <md-filled-icon-button class="button" @click="${this._addObjectLoadEntry}"><md-icon>add</md-icon></md-filled-icon-button>          
        </div>
        
        ${this.objectsLoad.map((obj, index) => html`
          <div class="div-json-viewer">
            <md-filled-icon-button class="remove-button" @click="${() => this._removeObjectLoadEntry(index)}"><md-icon>delete_forever</md-icon></md-filled-icon-button>
            <json-viewer class="json-viewer">${JSON.stringify(obj)}</json-viewer>            
          </div>
        `)}
      </div>
    `;
  }

  _addObjectLoadEntry() {
    // For now, just alert when adding an object. This can be expanded later.
    alert('Add Object button clicked');
  }

  _removeObjectLoadEntry(index) {
    this.objectsLoad = [
      ...this.objectsLoad.slice(0, index),
      ...this.objectsLoad.slice(index + 1)
    ];
  }  
  
    
  
}customElements.define('zpl-previewer', ZplPreviewer);

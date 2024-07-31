// main.js
import { LitElement } from 'lit';
import { template } from './label-printer-template.js';
import { styles } from './label-printer-styles.js';
import '../../../demo/BrowserPrint-Zebra-1.1.250.min.js'; // Asegúrate de que la ruta sea correcta

class ZebraPrinterComponent extends LitElement {
  static properties = {
    printerName: { type: String },
    data: { type: String },
  };

  constructor() {
    super();
    this.printerName = '';
    this.data = '';
    this.selectedDevice = null;
  }

  firstUpdated() {
    this.setupPrinter();
    this.fetchData();
  }

  setupPrinter() {
    BrowserPrint.getDefaultDevice('printer', (device) => {
      this.selectedDevice = device;
      console.log('Selected device:', device);
    }, (error) => {
      console.error('Error:', error);
    });
  }

  fetchData() {
    fetch('/path/to/data.json')
      .then(response => response.json())
      .then(data => {
        if (data.printer_name) {
          this.printerName = data.printer_name;
          this.print(data.data);
        } else {
          this.data = data.data;
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  print(data) {
    const printValue = data || this.data;
    if (this.selectedDevice) {
      this.selectedDevice.send(printValue, undefined, (error) => {
        console.error('Error:', error);
      });
    } else {
      console.error('No device selected');
    }
  }

  manualPrint() {
    const printValue = this.data;
    const printWindow = window.open();
    printWindow.document.open('text/plain');
    printWindow.document.write(printValue);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  render() {
    return template(this);
  }
}

customElements.define('zebra-printer-component', ZebraPrinterComponent);

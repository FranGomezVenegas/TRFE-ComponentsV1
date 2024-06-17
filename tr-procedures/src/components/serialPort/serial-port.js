// Archivo: serial-port.js
import { LitElement, html } from 'lit';
import { styles } from './serial-port-styles.js';
import { template } from './serial-port-template.js';

class SerialPortComponent extends LitElement {
  constructor() {
    super();
    this.output = '';
    this.buffer = '';
    this.reader = null;
    this.port = null;
    this.timeout = 3; // Tiempo de espera por defecto en segundos
    this.messageTimeout = null;
    this.value = ''; // Propiedad para guardar el mensaje completo
  }

  static get properties() {
    return {
      output: { type: String },
      value: { type: String }, // Propiedad para guardar el mensaje completo
    };
  }

  static styles = styles;

  firstUpdated() {
    this.shadowRoot.getElementById('connectButton').addEventListener('click', () => this.connectSerialPort());
    this.shadowRoot.getElementById('closeButton').addEventListener('click', () => this.closeSerialPort());
    this.shadowRoot.getElementById('timeout').addEventListener('input', (event) => {
      this.timeout = event.target.value;
    });
  }

  async connectSerialPort() {
    try {
      this.port = await navigator.serial.requestPort();
      await this.port.open({ baudRate: 9600 });

      const portName = `Puerto COM abierto`; // Nombre genérico del puerto
      this.output += `${portName}.\n`;
      this.updateOutput();

      this.reader = this.port.readable.getReader();
      this.readData();
    } catch (error) {
      this.output += `Error: ${error.message}\n`;
      this.updateOutput();
    }
  }

  async readData() {
    while (true) {
      try {
        const { value, done } = await this.reader.read();
        if (done) {
          this.reader.releaseLock();
          break;
        }
        this.buffer += new TextDecoder().decode(value);
        this.processData();
        this.resetMessageTimeout();
      } catch (error) {
        this.output += `Read error: ${error.message}\n`;
        this.updateOutput();
        break;
      }
    }
  }

  processData() {
    const lines = this.buffer.split('\r\n');
    this.buffer = lines.pop(); // Dejar lo que está después del último \r\n en el buffer

    lines.forEach(line => {
      this.value += line + '\n';
    });

    this.updateOutput();
  }

  resetMessageTimeout() {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
    this.messageTimeout = setTimeout(() => this.finalizeMessage(), this.timeout * 1000);
  }

  async finalizeMessage() {
    if (this.buffer.trim()) {
      this.value += this.buffer;
    }    
    this.output += `Mensaje recibido: ${this.value}\n`;
    this.buffer = '';
    this.value = ''; // Limpiar el mensaje acumulado

    // Cerrar el puerto
    await this.closeSerialPort();
    this.updateOutput();
  }

  async closeSerialPort() {
    try {
      if (this.reader) {
        await this.reader.cancel(); // Cancelar cualquier operación de lectura pendiente
        await this.reader.releaseLock(); // Liberar el lector
      }
      if (this.port) {
        await this.port.close(); // Cerrar el puerto después de liberar el lector
        this.output += `Puerto cerrado.\n`;
        this.updateOutput();
      }
    } catch (error) {
      this.output += `Error al cerrar el puerto: ${error.message}\n`;
      this.updateOutput();
    } finally {
      this.port = null;
      this.reader = null;
    }
  }

  updateOutput() {
    const outputElement = this.shadowRoot.getElementById('output');
    if (outputElement) {
      outputElement.value = this.output;
    }
  }

  render() {
    return html`${template}`;
  }
}

customElements.define('serial-port-component', SerialPortComponent);

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
    this.writer = null;
    this.port = null;
    this.timeout = 3; // Tiempo de espera por defecto en segundos
    this.messageTimeout = null;
    this.value = ''; // Propiedad para guardar el mensaje completo
    this.sendEnabled = true; // Propiedad para habilitar o deshabilitar el envío de datos
    this.canSendData = true; // Propiedad para habilitar o deshabilitar el campo de envío de datos tras la conexión
    this.lang = 'en'; // Idioma por defecto
    this.messages = {
      enterText: {
        en: 'Enter text to send',
        es: 'Ingrese texto para enviar'
      },
      connect: {
        en: 'Connect to Serial Port',
        es: 'Conectar al puerto serial'
      },
      closeConnection: {
        en: 'Close Connection',
        es: 'Cerrar conexión'
      },
      timeout: {
        en: 'Timeout (seconds)',
        es: 'Tiempo de espera (segundos)'
      },
      portOpen: {
        en: '<< Port COM opened >>',
        es: '<< Puerto COM abierto >>'
      },
      dataSent: {
        en: 'Data sent: ',
        es: 'Datos enviados: '
      },
      portClose: {
        en: '<< Port closed >>',
        es: '<< Puerto cerrado >>'
      },
      messageReceived: {
        en: 'Message received: ',
        es: 'Mensaje recibido: '
      },
      errorRead: {
        en: 'Read error: ',
        es: 'Error de lectura: '
      },
      errorSend: {
        en: 'Error: Could not send data, port is not open.',
        es: 'Error: No se pudo enviar el dato, el puerto no está abierto.'
      },
      errorClose: {
        en: 'Error closing port: ',
        es: 'Error al cerrar el puerto: '
      },
      alertMessage: {
        en: 'Message received: ',
        es: 'Mensaje recibido: '
      }
    };
    this.isTimeoutEditable = true; // Propiedad para determinar si el timeout es editable
  }

  static get properties() {
    return {
      output: { type: String },
      value: { type: String }, // Propiedad para guardar el mensaje completo
      sendEnabled: { type: Boolean }, // Propiedad para habilitar o deshabilitar el envío de datos
      canSendData: { type: Boolean }, // Propiedad para habilitar o deshabilitar el campo de envío de datos tras la conexión
      lang: { type: String }, // Propiedad para el idioma
      messages: { type: Object }, // Propiedad para los mensajes
      isTimeoutEditable: { type: Boolean } // Propiedad para editar el timeout
    };
  }

  static styles = styles;

  firstUpdated() {
    this.shadowRoot.getElementById('connectButton').addEventListener('click', () => this.handleConnectButtonClick());
    this.shadowRoot.getElementById('closeButton').addEventListener('click', () => this.closeSerialPort());
    this.shadowRoot.getElementById('clearLogButton').addEventListener('click', () => this.clearLog());
    this.shadowRoot.getElementById('timeout').addEventListener('input', (event) => {
      this.timeout = event.target.value;
    });

    if (this.sendEnabled) {
      const inputElement = this.shadowRoot.getElementById('userInput');
      if (inputElement) {
        inputElement.focus();
      }
    }
  }

  handleConnectButtonClick() {
    if (!this.port) {
      this.connectAndSendData();
    } else {
      this.sendDataFromInput();
    }
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.handleConnectButtonClick();
    }
  }

  async connectAndSendData() {
    try {
      this.port = await navigator.serial.requestPort();
      await this.port.open({ baudRate: 9600 });

      const portName = this.messages.portOpen[this.lang];
      this.logMessage(`${portName}`, true);

      this.reader = this.port.readable.getReader();
      this.writer = this.port.writable.getWriter(); // Crear un writer para enviar datos si está habilitado

      if (this.sendEnabled) {
        this.sendDataFromInput();
      }

      this.readData();
      this.canSendData = true; // Habilitar el campo de texto para enviar datos
      this.requestUpdate(); // Actualizar la UI
    } catch (error) {
      this.logMessage(`${this.messages.errorRead[this.lang]}${error.message}`);
    }
  }

  async sendDataFromInput() {
    const inputElement = this.shadowRoot.getElementById('userInput');
    const data = inputElement.value;
    if (data) {
      await this.sendData(data);
      inputElement.value = ''; // Limpiar la caja de texto
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
        this.logMessage(`${this.messages.errorRead[this.lang]}${error.message}`);
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
    this.showMessageAlert(this.value);
    this.logMessage(`${this.messages.messageReceived[this.lang]}${this.value}`);
    this.buffer = '';
    this.value = ''; // Limpiar el mensaje acumulado

    // Cerrar el puerto
    await this.closeSerialPort();
    this.updateOutput();
  }

  async sendData(data) {
    if (this.writer) {
      const encoder = new TextEncoder();
      await this.writer.write(encoder.encode(data + '\r\n'));
      this.logMessage(`${this.messages.dataSent[this.lang]}${data}`);
    } else {
      this.logMessage(this.messages.errorSend[this.lang]);
    }
  }

  async closeSerialPort() {
    try {
      if (this.reader) {
        await this.reader.cancel();
        await this.reader.releaseLock();
      }
      if (this.writer) {
        await this.writer.close();
        await this.writer.releaseLock();
      }
      if (this.port) {
        await this.port.close();
        this.logMessage(this.messages.portClose[this.lang], true);
        this.logMessage('', true);
      }
    } catch (error) {
      this.logMessage(`${this.messages.errorClose[this.lang]}${error.message}`);
    } finally {
      this.port = null;
      this.reader = null;
      this.writer = null;
      this.canSendData = false; // Deshabilitar el campo de texto para enviar datos tras cerrar el puerto
      this.requestUpdate(); // Actualizar la UI
    }
  }

  clearLog() {
    this.output = '';
    this.updateOutput();
  }

  showMessageAlert(message) {
    if (!this.showAlert) return;
    alert(`${this.messages.alertMessage[this.lang]}${message}`);
    this.logMessage(`${this.messages.alertMessage[this.lang]}${message}`);
  }

  logMessage(message, isBold = false) {
    const timestamp = new Date().toLocaleString();
    const formattedMessage = `[${timestamp}] ${message}`;
    this.output += isBold ? `**${formattedMessage}**\n` : `${formattedMessage}\n`;
    this.updateOutput();
  }

  updateOutput() {
    const outputElement = this.shadowRoot.getElementById('output');
    if (outputElement) {
      outputElement.value = this.output;
    }
  }

  render() {
    return html`${template(this.sendEnabled, this.lang, this.messages, this.isTimeoutEditable, this.handleKeyDown.bind(this), this.canSendData)}`;
  }
}

customElements.define('serial-port-component', SerialPortComponent);

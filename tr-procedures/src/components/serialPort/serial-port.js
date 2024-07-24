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
    this.timeout = 4; // Tiempo de espera por defecto en segundos
    this.baudRate = 9600;
    this.messageTimeout = null;
    this.value = ''; // Propiedad para guardar el mensaje completo
    this.sendEnabled = true; // Propiedad para habilitar o deshabilitar el envío de datos
    this.canSendData = true; // Propiedad para habilitar o deshabilitar el campo de envío de datos tras la conexión
    this.lang = 'en'; // Idioma por defecto
    this.logAreaHeight = 250; 
    this.messages = {
      enterText: {
        en: 'Enter the sample id',
        es: 'Ingrese Id de muestra'
      },
      connect: {
        en: 'Connect to Serial Port',
        es: 'Conectar al puerto serial'
      },
      closeConnection: {
        en: 'Close Connection',
        es: 'Cerrar conexión'
      },
      clearLog:{
        en: 'Clear log',
        es: 'Borrar log'
      },
      timeout: {
        en: 'Timeout (seconds)',
        es: 'Tiempo de espera (segundos)'
      },
      portOpen: {
        en: '<<Opened>>',
        es: '<<Abierto>>'
      },
      dataSent: {
        en: 'Data sent: ',
        es: 'Datos enviados: '
      },
      portClose: {
        en: '<<Port closed>>',
        es: '<<Puerto cerrado>>'
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
    this.displayObjectsTable=true
    this.tableDefinition={
      columns:[
        {"name": "sample_id", "label_en": "Sample", "label_en": "Muestra"},
        {"name": "raw_value", "label_en": "Got result", "label_en": "Resultado Obtenido"},
        {"name": "serial_log", "label_en": "Entire log", "label_en": "Registro entero"}
      ]
    } 
    this.tableData=[
      //{sample_id: 1, raw_value:"", serial_log: ""  }
    ]
    this.dialogWeightMessage = { label_en: '', label_es: '' };
  }

  static get properties() {
    return {
      output: { type: String },
      timeout: { type: Number },
      logAreaHeight: { type: Number },
      baudRate: { type: Number },
      value: { type: String }, // Propiedad para guardar el mensaje completo
      sendEnabled: { type: Boolean }, // Propiedad para habilitar o deshabilitar el envío de datos
      canSendData: { type: Boolean }, // Propiedad para habilitar o deshabilitar el campo de envío de datos tras la conexión
      lang: { type: String }, // Propiedad para el idioma
      messages: { type: Object }, // Propiedad para los mensajes
      isTimeoutEditable: { type: Boolean }, // Propiedad para editar el timeout
      displayObjectsTable: { type: Boolean },
      tableDefinition:{type: Object},
      tableData:{type: Array},
      dialogWeightMessage: { type: Object }
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

    const portList = this.shadowRoot.querySelectorAll('.port-item'); // Asumiendo que los elementos de la lista tienen la clase 'port-item'
    portList.forEach(item => {
      item.addEventListener('dblclick', () => {
        item.click(); // Simula el clic en el elemento
        this.handleConnectButtonClick(); // Llama a la función para conectar
      });
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
  handleKeyDownNextWeight(event) {
    if (event.key === 'Enter') {
      //alert('enter')
      const inputNextWeight = this.shadowRoot.getElementById('userInputNextWeight');
      const inputElement = this.shadowRoot.getElementById('userInput');
      inputElement.value=inputNextWeight.value  
      inputNextWeight.value=""
      this.closeNewSampleIdDialog()
      this.handleConnectButtonClick();
    }
  }

  startNoDataReceivedTimer() {
    if (this.noDataReceivedTimer) {
      clearTimeout(this.noDataReceivedTimer);
    }
    this.noDataReceivedTimer = setTimeout(() => {
      if (!this.hasReceivedData) {
        this.showNoDataReceivedAlert();
      }
    }, this.timeout * 1000);
  }
  
  
  async connectAndSendData() {
    try {
      if (this.baudRate === undefined) {
        this.baudRate = 9600;
      }
      if (!this.port){
        this.port = await navigator.serial.requestPort();
        await this.port.open({ baudRate: this.baudRate });
      } 
        
      this.logMessage(this.messages.portOpen[this.lang], true);

      this.startNoDataReceivedTimer();
  
      this.reader = this.port.readable.getReader();
      this.writer = this.port.writable.getWriter(); // Crear un writer para enviar datos si está habilitado
  
      if (this.sendEnabled) {
        this.sendDataFromInput();
      }
  
      this.readData();
      this.canSendData = true; // Habilitar el campo de texto para enviar datos
      this.requestUpdate(); // Actualizar la UI
  
      // Iniciar el temporizador para detectar inactividad
      this.startNoDataReceivedTimer();
    } catch (error) {
      this.logMessage(`${this.messages.errorRead[this.lang]}${error.message}`);
    }
  }
    

  async sendDataFromInput() {
    const inputElement = this.shadowRoot.getElementById('userInput');
    const data = inputElement.value;
    if (data) {
      await this.sendData(data);
  //      inputElement.value = ''; // Limpiar la caja de texto
    }
  }
  async showNoDataReceivedAlert() {
    const alertMessage = this.lang === 'en' ? 'No data received.' : 'No se ha recibido nada.';
    this.showMessageAlert(alertMessage);
    this.logMessage(alertMessage);
    await this.closeSerialPort();
  }
  
  async readData() {
    while (true) {
      try {
        const { value, done } = await this.reader.read();
        if (done) {
          this.reader.releaseLock();
          break;
        }
        this.hasReceivedData = true; // Marcar que se ha recibido algún dato
        this.buffer += new TextDecoder().decode(value);
        this.buffer = this.cleanBuffer(this.buffer); // Limpiar caracteres de control
        this.processData();
        this.resetMessageTimeout();
  
        // Reiniciar el temporizador de inactividad cada vez que se recibe un carácter
        this.startNoDataReceivedTimer();
      } catch (error) {
        this.logMessage(`${this.messages.errorRead[this.lang]}${error.message}`);
        break;
      }
    }
  }
  
  


  processData() {
    const lines = this.buffer.split('\n');
    this.buffer = lines.pop(); // Dejar lo que está después del último \n en el buffer
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
  
    // Resetear el temporizador de no recepción de datos
    this.startNoDataReceivedTimer();
  }
  

  async finalizeMessage() {
    if (this.buffer) {
      this.value += this.cleanBuffer(this.buffer) + '\n'; // Añadir salto de línea al final del buffer
    }
    const inputElement = this.shadowRoot.getElementById('userInput');
    this.sendReadingToAPI(inputElement.value, this.value);
    this.showMessageAlert(this.value);
    this.logMessage(`${this.messages.messageReceived[this.lang]}\n${this.value}`);
    this.buffer = '';
    this.value = ''; // Limpiar el mensaje acumulado
    inputElement.value = ''; // Limpiar la caja de texto
    this.hasReceivedData = false; // Resetear el indicador
  
    this.updateOutput();
  }
  
  
  
  cleanBuffer(buffer) {
    //return buffer.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '');
    return buffer
    //return buffer.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
  }
  
  
  sendReadingToAPI(inputData, logValue) {  
    logValue = this.cleanBuffer(logValue); // Limpiar caracteres de control
  
    if (inputData === undefined || inputData.length === 0) {
      alert('Please enter sample id on the top');
      return;
    }
  
    let weightValue = this.getWeightValue(logValue);
    if (weightValue === null) {
      alert('No valid weight value found in the log.');
      return;
    }
  
    let newReadingRow = { sample_id: inputData, raw_value: weightValue, serial_log: logValue };
    this.tableData.push(newReadingRow);
    let lblEn = "Weight " + weightValue + " for sample " + inputData;
    let lblES = "Peso " + weightValue + " para la muestra " + inputData;
    this.dialogWeightMessage = {
      label_en: lblEn,
      label_es: lblES
    };
    this.showDialog();
  }
  

getWeightValue(logValue) {
    // Función auxiliar para convertir la coma en punto
    function convertToDecimal(value) {
        return value.replace(',', '.');
    }

    // Expresión regular para verificar si es solo un número
    const numberPattern = /^-?\d+([,.]\d+)?$/;
    
    // Expresiones regulares para unidades de masa
    const massUnits = ["mg", "g", "kg"];
    const massPattern = new RegExp(`(\\d+[,.]?\\d*)\\s*(${massUnits.join('|')})`, 'i');

    // Verifica si el logValue es solo un número
    if (numberPattern.test(logValue.trim())) {
        return convertToDecimal(logValue.trim());
    }

    // Busca y extrae el número antes de la unidad de masa
    const match = logValue.match(massPattern);
    if (match) {
        return convertToDecimal(match[1]);
    }

    // Si no se encuentra un número válido, devuelve null o un valor indicativo
    return null;
  }


  showDialog() {
    const dialog = this.shadowRoot.getElementById('confirm-dialog');
    dialog.show();
  }

  showNewSampleIdDialog() {
    const dialog = this.shadowRoot.getElementById('next-weight');
    dialog.show();
    // Usa setTimeout para asegurarte de que el campo de entrada esté disponible después de que el diálogo se haya renderizado
    setTimeout(() => {
      const inputNextWeight = this.shadowRoot.getElementById('userInputNextWeight');
      if (inputNextWeight) {
        inputNextWeight.focus();
      }
    }, 0);
  }
  

  closeNewSampleIdDialog() {
    const dialog = this.shadowRoot.getElementById('next-weight');
    dialog.close();
  }  
  

  async handleButtonNextWeight() {
    this.showNewSampleIdDialog()
    // Acción para el botón 1
    console.log('Botón 1 presionado');
  }

  async handleButtonChangeCOM() {
    await this.closeSerialPort();

    // Acción para el botón 2
    console.log('Botón 2 presionado');
  }

  async handleButtonClose() {
    await this.closeSerialPort();
    // Acción para el botón 3
    console.log('Botón 3 presionado');
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
      this.canSendData = true; // Deshabilitar el campo de texto para enviar datos tras cerrar el puerto
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
    return html`${template(this.logAreaHeight, this.timeout, this.sendEnabled, this.lang, this.messages, this.isTimeoutEditable, this.handleKeyDown.bind(this), this.canSendData, 
      this.displayObjectsTable, this.tableDefinition, this.tableData, this.handleButtonNextWeight.bind(this), this.handleButtonChangeCOM.bind(this), this.handleButtonClose.bind(this), 
      this.dialogWeightMessage, this.handleKeyDownNextWeight.bind(this))}`;
  }
}

customElements.define('serial-port-component', SerialPortComponent);

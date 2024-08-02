"use strict";(self.webpackChunk_trazit_tr_procedures=self.webpackChunk_trazit_tr_procedures||[]).push([[884],{"./src/components/serialPort/_serialPort.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>_serialPort_stories});var lit_html=__webpack_require__("./node_modules/lit-html/lit-html.js"),lit=__webpack_require__("./node_modules/lit/index.js");const styles=lit.AH`
  :host {
    left:10px;
    position:relative;
    display: block;
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    background: -webkit-linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Para Chrome y Safari */
    background: -moz-linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Para Firefox */
    background: -o-linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Para Opera */
    background: linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Estándar */  

    font-family: Montserrat;
    width: 700px; /* Ancho fijo */
  }
  /* Estilos para el diálogo */
  mwc-dialog {
    background: -webkit-linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Para Chrome y Safari */
    background: -moz-linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Para Firefox */
    background: -o-linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Para Opera */
    background: linear-gradient(79deg, #4668db1a, #9d70cd99, #4668db1a); /* Estándar */  
    max-width: 90%; /* Ajusta este valor según tus necesidades */
    overflow-x: hidden; /* Quita el scroll horizontal */
  }
  
  mwc-dialog > .mdc-dialog__surface {
    overflow-x: hidden; /* Asegura que el contenido del diálogo no cause desbordamiento horizontal */
  }
  
  mwc-dialog .content {
    overflow-x: hidden; /* Asegura que el contenido del diálogo no cause desbordamiento horizontal */
    max-width: 100%; /* Asegura que el contenido del diálogo se ajuste al ancho del diálogo */
    box-sizing: border-box; /* Incluye el padding y el borde en el ancho total */
  }    
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .left-column {
    width: 400px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .right-column {
    width: 300px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    margin-left: 16px; /* Espacio entre columnas */
  }
  .standard-button {
    padding: 8px 16px;
    margin-top: 8px;
    border: none;
    border-radius: 4px;
    background: -webkit-linear-gradient(79deg, #4668db, #9d70cd); /* Para Chrome y Safari */
    background: -moz-linear-gradient(79deg, #4668db, #9d70cd); /* Para Firefox */
    background: -o-linear-gradient(79deg, #4668db, #9d70cd); /* Para Opera */
    background: linear-gradient(79deg, #4668db, #9d70cd); /* Estándar */    
    color: white;
    cursor: pointer;
  }


  .standard-button:hover {
    transform: scale(1.05); /* Aumentar ligeramente el tamaño */
    background: -webkit-linear-gradient(19deg, #4668db, #9d70cd); /* Para Chrome y Safari */
    background: -moz-linear-gradient(19deg, #4668db, #9d70cd); /* Para Firefox */
    background: -o-linear-gradient(19deg, #4668db, #9d70cd); /* Para Opera */
    background: linear-gradient(19deg, #4668db, #9d70cd); /* Estándar */    
  }

  .icon-button {
    padding: 8px;
    margin-top: 8px;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    color: #007bff; /* Color del icono */
    cursor: pointer;
    font-size: 16px;
    transition: transform 0.2s; /* Transición suave */
  }

  .icon-button:hover {
    transform: scale(1.2); /* Aumentar ligeramente el tamaño en hover */  
    background-color: transparent;  
  }

    

  button:hover {
    background-color: #0056b3;
  }


  .button-row {
    width:380px;
  }

  textarea {
    width: 100%;
    height: 150px;
    padding-top: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    resize: none;
    font-size: 14px;
    margin-top: 8px;
    white-space: pre-wrap; /* Mantener formato en log */
  }

  input[type="text"] {
    width: 100%;
    padding-top: 10px;
    margin-bottom: 0px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  input[type="number"] {
    width: 60px;
    margin-top: 8px;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  label {
    font-size: 14px;
    margin-right: 8px;
  }

  div {
    margin-top: 16px;
  }
 table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 0px;
  }

  th, td {
    padding: 8px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  th {
    background: -webkit-linear-gradient(19deg, #4668db, #9d70cd); /* Para Chrome y Safari */
    background: -moz-linear-gradient(19deg, #4668db, #9d70cd); /* Para Firefox */
    background: -o-linear-gradient(19deg, #4668db, #9d70cd); /* Para Opera */
    background: linear-gradient(19deg, #4668db, #9d70cd); /* Estándar */       
    color:white;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  .dragdropabletr {
    cursor: move;
  }

  .left-area {
    display: flex;
    align-items: center;
  }    
`;__webpack_require__("./node_modules/@material/mwc-dialog/mwc-dialog.js"),__webpack_require__("./node_modules/@material/mwc-button/mwc-button.js");const template=(logAreaHeight,timeout,isSendEnabled,lang,messages,isTimeoutEditable,handleKeyDown,canSendData,displayObjectsTable,tableDefinition,tableData,handleButton1,handleButton2,handleButton3,dialogWeightMessage,handleKeyDownNextWeight)=>lit.qy`
  <div class="container">
    <div class="left-column">    
      ${isSendEnabled?lit.qy`
        <input type="text" id="userInput" placeholder="${messages.enterText[lang]}" @keydown="${handleKeyDown}" ?disabled="${!canSendData}">
      `:""}
      <div class="button-row">
        <button class="standard-button" id="connectButton">${messages.connect[lang]}</button>
        <button class="standard-button" id="closeButton">${messages.closeConnection[lang]}</button>
        <button class="icon-button" id="clearLogButton" title="${messages.clearLog[lang]}">🗑️</button>
      </div>
      <textarea id="output" readonly style="height: ${logAreaHeight}px;"></textarea>
      <div>
        <label for="timeout">${messages.timeout[lang]}:</label>
        <input type="number" id="timeout" value="${timeout}" min="1" step="1" ?disabled="${!isTimeoutEditable}">
      </div>
    </div>
    <div class="right-column">
      ${displayObjectsTable?lit.qy`
        ${function dragObjectsTable(messages,tmpLogic,lang,elem,dataArr,componentRef,handleButton1,handleButton2,handleButton3,dialogWeightMessage,handleKeyDownNextWeight){return lit.qy`
  
  ${tmpLogic.viewTable?lit.qy`
  <div style="margin-top:42px">
      <table class="dragdropable TRAZiT-DefinitionArea"> 
          <thead>
              ${elem.columns.map((column=>lit.qy`<th>${column.label_en}</th>`))}
          </thead>
          <tbody>
              ${void 0!==dataArr&&Array.isArray(dataArr)?lit.qy`  
                  ${dataArr.map(((p,idx)=>lit.qy`
                  <tr class="dragdropabletr" draggable="true" @dragstart=${e=>tmpLogic.dragTableTr(e,elem,p)}>
                      ${elem.columns.map(((fld,index)=>void 0!==fld.is_icon&&1==fld.is_icon?fld.icon_class?lit.qy`<div class="left-area">
                                  ${this.iconRenderer(p,fld.name,idx,fld)}
                                  <mwc-icon-button class="icon ${p[fld.icon_class]}" icon="${p[fld.icon_name]}" alt="${fld.name}"></mwc-icon-button>
                              </div>`:lit.qy`${this.iconRenderer(p,fld.name,idx,fld)}
                                  <img src="${tmpLogic.iconRendererSrc(p,fld.name,idx,fld)}" style="width:20px">`:lit.qy`<td @click="${()=>componentRef.shadowRoot.querySelector("#detail"+idx).toggle()}">${p[fld.name]}</td>`))}
                      ${void 0===elem.row_buttons?lit.qy``:lit.qy`<td><div class="layout horizontal center flex wrap">${this.getButtonForRows(elem.row_buttons,p,!1,parentData)}</div></td>`}
                  </tr>
                  <table-row-detail id="detail${idx}">
                    <div slot="details">                    
                      <!-- Aquí puedes poner el contenido detallado para esta fila -->
                    </div>
                  </table-row-detail>`))}
              `:lit.qy`No Data`}
          </tbody>
      </table>
      <mwc-dialog id="confirm-dialog" heading="${dialogWeightMessage["label_"+lang]}">
        <div>What would you like to do next?</div>
        <mwc-button slot="primaryAction" dialogAction="ok" @click="${handleButton1}">Next weight</mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="cancel" @click="${handleButton2}">Change Balance</mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="close" @click="${handleButton3}">Exit</mwc-button>
      </mwc-dialog>
      <mwc-dialog id="next-weight" heading="">
        <input type="text" id="userInputNextWeight" placeholder="${messages.enterText[lang]}" @keydown="${handleKeyDownNextWeight}" ?disabled="${!1}">
      </mwc-dialog>
  </div> 
  `:null}
  `}(messages,{viewTable:!0},lang,tableDefinition,tableData,!0,handleButton1,handleButton2,handleButton3,dialogWeightMessage,handleKeyDownNextWeight)}
      `:""}
    </div>
  </div>
`;class SerialPortComponent extends lit.WF{constructor(){super(),this.output="",this.buffer="",this.reader=null,this.writer=null,this.port=null,this.timeout=4,this.baudRate=9600,this.messageTimeout=null,this.value="",this.sendEnabled=!0,this.canSendData=!0,this.lang="en",this.logAreaHeight=250,this.messages={enterText:{en:"Enter the sample id",es:"Ingrese Id de muestra"},connect:{en:"Connect to Serial Port",es:"Conectar al puerto serial"},closeConnection:{en:"Close Connection",es:"Cerrar conexión"},clearLog:{en:"Clear log",es:"Borrar log"},timeout:{en:"Timeout (seconds)",es:"Tiempo de espera (segundos)"},portOpen:{en:"<<Opened>>",es:"<<Abierto>>"},dataSent:{en:"Data sent: ",es:"Datos enviados: "},portClose:{en:"<<Port closed>>",es:"<<Puerto cerrado>>"},messageReceived:{en:"Message received: ",es:"Mensaje recibido: "},errorRead:{en:"Read error: ",es:"Error de lectura: "},errorSend:{en:"Error: Could not send data, port is not open.",es:"Error: No se pudo enviar el dato, el puerto no está abierto."},errorClose:{en:"Error closing port: ",es:"Error al cerrar el puerto: "},alertMessage:{en:"Message received: ",es:"Mensaje recibido: "}},this.isTimeoutEditable=!0,this.displayObjectsTable=!0,this.tableDefinition={columns:[{name:"sample_id",label_en:"Sample",label_en:"Muestra"},{name:"raw_value",label_en:"Got result",label_en:"Resultado Obtenido"},{name:"serial_log",label_en:"Entire log",label_en:"Registro entero"}]},this.tableData=[],this.dialogWeightMessage={label_en:"",label_es:""}}static get properties(){return{output:{type:String},timeout:{type:Number},logAreaHeight:{type:Number},baudRate:{type:Number},value:{type:String},sendEnabled:{type:Boolean},canSendData:{type:Boolean},lang:{type:String},messages:{type:Object},isTimeoutEditable:{type:Boolean},displayObjectsTable:{type:Boolean},tableDefinition:{type:Object},tableData:{type:Array},dialogWeightMessage:{type:Object}}}static styles=styles;firstUpdated(){this.shadowRoot.getElementById("connectButton").addEventListener("click",(()=>this.handleConnectButtonClick())),this.shadowRoot.getElementById("closeButton").addEventListener("click",(()=>this.closeSerialPort())),this.shadowRoot.getElementById("clearLogButton").addEventListener("click",(()=>this.clearLog())),this.shadowRoot.getElementById("timeout").addEventListener("input",(event=>{this.timeout=event.target.value}));if(this.shadowRoot.querySelectorAll(".port-item").forEach((item=>{item.addEventListener("dblclick",(()=>{item.click(),this.handleConnectButtonClick()}))})),this.sendEnabled){const inputElement=this.shadowRoot.getElementById("userInput");inputElement&&inputElement.focus()}}handleConnectButtonClick(){this.port?this.sendDataFromInput():this.connectAndSendData()}handleKeyDown(event){"Enter"===event.key&&this.handleConnectButtonClick()}handleKeyDownNextWeight(event){if("Enter"===event.key){const inputNextWeight=this.shadowRoot.getElementById("userInputNextWeight");this.shadowRoot.getElementById("userInput").value=inputNextWeight.value,inputNextWeight.value="",this.closeNewSampleIdDialog(),this.handleConnectButtonClick()}}startNoDataReceivedTimer(){this.noDataReceivedTimer&&clearTimeout(this.noDataReceivedTimer),this.noDataReceivedTimer=setTimeout((()=>{this.hasReceivedData||this.showNoDataReceivedAlert()}),1e3*this.timeout)}async connectAndSendData(){try{void 0===this.baudRate&&(this.baudRate=9600),this.port||(this.port=await navigator.serial.requestPort(),await this.port.open({baudRate:this.baudRate})),this.logMessage(this.messages.portOpen[this.lang],!0),this.startNoDataReceivedTimer(),this.reader=this.port.readable.getReader(),this.writer=this.port.writable.getWriter(),this.sendEnabled&&this.sendDataFromInput(),this.readData(),this.canSendData=!0,this.requestUpdate(),this.startNoDataReceivedTimer()}catch(error){this.logMessage(`${this.messages.errorRead[this.lang]}${error.message}`)}}async sendDataFromInput(){const data=this.shadowRoot.getElementById("userInput").value;data&&await this.sendData(data)}async showNoDataReceivedAlert(){const alertMessage="en"===this.lang?"No data received.":"No se ha recibido nada.";this.showMessageAlert(alertMessage),this.logMessage(alertMessage),await this.closeSerialPort()}async readData(){for(;;)try{const{value,done}=await this.reader.read();if(done){this.reader.releaseLock();break}this.hasReceivedData=!0,this.buffer+=(new TextDecoder).decode(value),this.buffer=this.cleanBuffer(this.buffer),this.processData(),this.resetMessageTimeout(),this.startNoDataReceivedTimer()}catch(error){this.logMessage(`${this.messages.errorRead[this.lang]}${error.message}`);break}}processData(){const lines=this.buffer.split("\n");this.buffer=lines.pop(),lines.forEach((line=>{this.value+=line+"\n"})),this.updateOutput()}resetMessageTimeout(){this.messageTimeout&&clearTimeout(this.messageTimeout),this.messageTimeout=setTimeout((()=>this.finalizeMessage()),1e3*this.timeout),this.startNoDataReceivedTimer()}async finalizeMessage(){this.buffer&&(this.value+=this.cleanBuffer(this.buffer)+"\n");const inputElement=this.shadowRoot.getElementById("userInput");this.sendReadingToAPI(inputElement.value,this.value),this.showMessageAlert(this.value),this.logMessage(`${this.messages.messageReceived[this.lang]}\n${this.value}`),this.buffer="",this.value="",inputElement.value="",this.hasReceivedData=!1,this.updateOutput()}cleanBuffer(buffer){return buffer}sendReadingToAPI(inputData,logValue){if(logValue=this.cleanBuffer(logValue),void 0===inputData||0===inputData.length)return void alert("Please enter sample id on the top");let weightValue=this.getWeightValue(logValue);if(null===weightValue)return void alert("No valid weight value found in the log.");let newReadingRow={sample_id:inputData,raw_value:weightValue,serial_log:logValue};this.tableData.push(newReadingRow);let lblEn="Weight "+weightValue+" for sample "+inputData,lblES="Peso "+weightValue+" para la muestra "+inputData;this.dialogWeightMessage={label_en:lblEn,label_es:lblES},this.showDialog()}getWeightValue(logValue){function convertToDecimal(value){return value.replace(",",".")}const massPattern=new RegExp(`(\\d+[,.]?\\d*)\\s*(${["mg","g","kg"].join("|")})`,"i");if(/^-?\d+([,.]\d+)?$/.test(logValue.trim()))return convertToDecimal(logValue.trim());const match=logValue.match(massPattern);return match?convertToDecimal(match[1]):null}showDialog(){this.shadowRoot.getElementById("confirm-dialog").show()}showNewSampleIdDialog(){this.shadowRoot.getElementById("next-weight").show(),setTimeout((()=>{const inputNextWeight=this.shadowRoot.getElementById("userInputNextWeight");inputNextWeight&&inputNextWeight.focus()}),0)}closeNewSampleIdDialog(){this.shadowRoot.getElementById("next-weight").close()}async handleButtonNextWeight(){this.showNewSampleIdDialog(),console.log("Botón 1 presionado")}async handleButtonChangeCOM(){await this.closeSerialPort(),console.log("Botón 2 presionado")}async handleButtonClose(){await this.closeSerialPort(),console.log("Botón 3 presionado")}async sendData(data){if(this.writer){const encoder=new TextEncoder;await this.writer.write(encoder.encode(data+"\r\n")),this.logMessage(`${this.messages.dataSent[this.lang]}${data}`)}else this.logMessage(this.messages.errorSend[this.lang])}async closeSerialPort(){try{this.reader&&(await this.reader.cancel(),await this.reader.releaseLock()),this.writer&&(await this.writer.close(),await this.writer.releaseLock()),this.port&&(await this.port.close(),this.logMessage(this.messages.portClose[this.lang],!0),this.logMessage("",!0))}catch(error){this.logMessage(`${this.messages.errorClose[this.lang]}${error.message}`)}finally{this.port=null,this.reader=null,this.writer=null,this.canSendData=!0,this.requestUpdate()}}clearLog(){this.output="",this.updateOutput()}showMessageAlert(message){this.showAlert&&(alert(`${this.messages.alertMessage[this.lang]}${message}`),this.logMessage(`${this.messages.alertMessage[this.lang]}${message}`))}logMessage(message,isBold=!1){const formattedMessage=`[${(new Date).toLocaleString()}] ${message}`;this.output+=isBold?`**${formattedMessage}**\n`:`${formattedMessage}\n`,this.updateOutput()}updateOutput(){const outputElement=this.shadowRoot.getElementById("output");outputElement&&(outputElement.value=this.output)}render(){return lit.qy`${template(this.logAreaHeight,this.timeout,this.sendEnabled,this.lang,this.messages,this.isTimeoutEditable,this.handleKeyDown.bind(this),this.canSendData,this.displayObjectsTable,this.tableDefinition,this.tableData,this.handleButtonNextWeight.bind(this),this.handleButtonChangeCOM.bind(this),this.handleButtonClose.bind(this),this.dialogWeightMessage,this.handleKeyDownNextWeight.bind(this))}`}}customElements.define("serial-port-component",SerialPortComponent);const _serialPort_stories={title:"Components/SerialPort",component:"serial-port",tags:["autodocs"],parameters:{docs:{description:{component:"The `SerialPort` component is used to manage serial port communication. It allows configuration of various serial port settings and provides a list of available ports."}}},argTypes:{lang:{description:"Language",control:"select",options:["en","es"]},baudRate:{description:"The baud rate for the serial communication",control:{value:9600}},timeout:{description:"Number of seconds of inactivity (nothing being received) to consider that this message is done",control:{value:4,min:0}},sendEnabled:{description:"Enable the line on the top to transmit one message through the port when connection is started, for devices with echo enabled this means that TRAZiT can send one message to be displayed in the device and as for bi-directional and traceability purpose.",control:"boolean",defaultValue:{summary:!0}},isTimeoutEditable:{description:"Allow the user to change the timeout seconds or not",control:"boolean",defaultValue:{summary:!1}},showAlert:{description:"Show one alert to notify the user that one communication-message is completed/received, independently of enabling the alert or not the message will be displayed in the log textarea",control:"boolean",defaultValue:{summary:!1}},logAreaHeight:{description:"Height, in pixels (px), for the log area",control:{value:150,min:0}},config:{description:"Configuration object for the serial port component",control:"object",table:{type:{summary:"object"}}},dataBits:{description:"The number of data bits per byte",control:"number",table:{category:"config",type:{summary:"number"},defaultValue:{summary:8}}},stopBits:{description:"The number of stop bits per byte",control:"number",table:{category:"config",type:{summary:"number"},defaultValue:{summary:1}}},parity:{description:"The parity bit setting",control:"text",table:{category:"config",type:{summary:"string"},defaultValue:{summary:"none"}}},flowControl:{description:"Indicates if flow control is enabled",control:"boolean",table:{category:"config",type:{summary:"boolean"},defaultValue:{summary:!1}}}}},Default=(({lang,baudRate,logAreaHeight,sendEnabled,timeout,isTimeoutEditable,showAlert,config})=>lit_html.qy`
  
  <serial-port-component .config=${config} logAreaHeight=${logAreaHeight} baudRate=${baudRate} timeout=${timeout}  lang=${lang} .sendEnabled="${sendEnabled}" .isTimeoutEditable="${isTimeoutEditable}" .showAlert="${showAlert}"></serial-port-component>
`).bind({});Default.args={lang:"en",baudRate:9600,logAreaHeight:150,sendEnabled:!0,timeout:4,isTimeoutEditable:!1,showAlert:!1,config:{baudRate:9600,dataBits:8,stopBits:1,parity:"none",flowControl:!1}};const __namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'({\n  lang,\n  baudRate,\n  logAreaHeight,\n  sendEnabled,\n  timeout,\n  isTimeoutEditable,\n  showAlert,\n  config\n}) => html`\n  \n  <serial-port-component .config=${config} logAreaHeight=${logAreaHeight} baudRate=${baudRate} timeout=${timeout}  lang=${lang} .sendEnabled="${sendEnabled}" .isTimeoutEditable="${isTimeoutEditable}" .showAlert="${showAlert}"></serial-port-component>\n`',...Default.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=components-serialPort-_serialPort-stories.c0efdda0.iframe.bundle.js.map
"use strict";(self.webpackChunk_trazit_tr_procedures=self.webpackChunk_trazit_tr_procedures||[]).push([[527],{"./.yalc/@trazit/cred-dialog/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>CredDialog});var lit=__webpack_require__("./node_modules/lit/index.js"),common_core=__webpack_require__("./.yalc/@trazit/cred-dialog/.yalc/@trazit/common-core/index.js"),dist=__webpack_require__("./node_modules/@collaborne/lit-flexbox-literals/dist/index.js");__webpack_require__("./node_modules/@material/mwc-textfield/mwc-textfield.js"),__webpack_require__("./node_modules/@vaadin/vaadin-combo-box/vaadin-combo-box.js"),__webpack_require__("./node_modules/@spectrum-web-components/button/sp-button.js"),__webpack_require__("./.yalc/@trazit/cred-dialog/.yalc/@trazit/tr-dialog/tr-dialog.js");const langConfig_pwdWindowTitle={label_en:"Please confirm your credentials (user & password)",label_es:"Por favor confirma tu identidad (usuario y contraseña)"},langConfig_esignWindowTitle={label_en:"Please enter your eSign",label_es:"Por favor entra tu frase de Firma Electrónica"},langConfig_justificationWindowTitle={label_en:"Please enter the justification phrase",label_es:"Por favor entra tu frase de justificación"},langConfig_userToCheck={label_en:"User",label_es:"Usuario"},langConfig_pwToCheck={label_en:"Password",label_es:"Contraseña"},langConfig_esgToCheck={label_en:"Esign",label_es:"Esign"},langConfig_jstToCheck={label_en:"Justification Phrase",label_es:"Frase de Justificación"};class CredDialog extends common_core.n{static get styles(){return[dist.G6,lit.AH`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
      tr-dialog {
        --mdc-dialog-heading-ink-color: blue;
        --mdc-typography-headline6-font-size: 35px;
        --mdc-dialog-z-index:9999999;
      }
      .content {
        opacity: 0.9;
        --mdc-dialog-z-index:9999999;
      }
      .content * {
        margin: 5px 0;
      }
      p.attemptsphraseblue {
        color: #464dbb;
      }
      p.attemptsphrasered {
        color: #f3371680;
        animation-duration: 2s;
        animation-name: slidein;
      }
      @keyframes slidein {
        from {
          margin-left: 30%;
        }
        to {
          margin-left: 0%;
        }
      }           
      @media (max-width: 460px) {
      }
      `]}static get properties(){return{type:{type:String},header:{type:String},changing:{type:Boolean},attempt:{type:Number},maxFails:{type:Number},actionName:{type:String},actionObj:{type:Object},objectId:{type:String},justificationType:{type:String},nonProc:{type:Boolean},escapeKey:{type:Boolean},reqParams:{type:Object}}}constructor(){super(),this.escapeKey=!0,this.reqParams={},this.reset()}reset(){this.type="",this.changing=!1,this.attempt=0,this.maxFails=3,this.justificationType="",this.nonProc=!1,this.actionObj={}}firstUpdated(){super.firstUpdated(),this.updateComplete.then((()=>{this.dialogSurface.style.backgroundImage="url(/images/abstract.jpg)",this.dialogSurface.style.backgroundSize="cover",this.dialogSurface.style.backgroundRepeat="no-repeat",this.dialogSurface.style.textAlign="center",this.credDialog.shadowRoot.querySelector("h2#title").style.fontSize="20px",this.credDialog.shadowRoot.querySelector("#content").style.paddingBottom="0"}))}headerLabel(){return"user"==this.type?`${langConfig_pwdWindowTitle["label_"+this.lang]}`:"esign"==this.type?`${langConfig_esignWindowTitle["label_"+this.lang]}`:`${langConfig_justificationWindowTitle["label_"+this.lang]}`}creadDialogs(){return lit.qy`
      <tr-dialog id="credDialog" 
        @closed=${this.closed}
        .heading="${this.headerLabel()}"
        hideActions=""
        hideXtoClose=""
        scrimClickAction=""
        .escapeKeyAction="${this.escapeKey?"close":""}">
        ${this.changing||this.nonProc?lit.s6:lit.qy`<div style="position:absolute;left:15px;top:8px;font-size:12px;">
            ${this.actionObj.button?this.actionObj.button.title["label_"+this.lang]:this.actionName} (id: ${this.objectId})
          </div>`}
        <div class="content layout vertical flex center-justified">
          ${this.inputField()}
          ${this.changing||this.nonProc?null:lit.qy`${this.auditField()}`}
          <div style="margin-top:30px">
            ${this.nonProc?lit.qy`<sp-button size="xl" variant="secondary" @click=${this.failedAttempt}>${common_core.k.cancelDialogButton["label_"+this.lang]}</sp-button>`:lit.qy`<sp-button size="xl" variant="secondary" dialogAction="close">${common_core.k.cancelDialogButton["label_"+this.lang]}</sp-button>`}
            <sp-button size="xl" @click=${this.checking}>${common_core.k.confirmDialogButton["label_"+this.lang]}</sp-button>
          </div>
          ${this.setAttempts()}
        </div>
      </tr-dialog>
      <tr-dialog id="confirmDialog" 
        heading=""
        hideActions=""
        hideXtoClose=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <div>${common_core.k.confirmActionPhrase["label_"+this.lang]} ${this.actionObj.button?this.actionObj.button.title["label_"+this.lang]:this.actionName}?</div>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${common_core.k.cancelDialogButton["label_"+this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.nextRequest}>
              ${common_core.k.confirmDialogButton["label_"+this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
    `}render(){return lit.qy`
      <tr-dialog id="credDialog" 
        @closed=${this.closed}
        .heading="${this.headerLabel()}"
        hideActions=""
        hideXtoClose=""
        scrimClickAction=""
        .escapeKeyAction="${this.escapeKey?"close":""}">
        ${this.changing||this.nonProc?lit.s6:lit.qy`<div style="position:absolute;left:15px;top:8px;font-size:12px;">
            ${this.actionObj.button?this.actionObj.button.title["label_"+this.lang]:this.actionName} (id: ${this.objectId})
          </div>`}
        <div class="content layout vertical flex center-justified">
          ${this.inputField()}
          ${this.changing||this.nonProc?null:lit.qy`${this.auditField()}`}
          <div style="margin-top:30px">
            ${this.nonProc?lit.qy`<sp-button size="xl" variant="secondary" @click=${this.failedAttempt}>${common_core.k.cancelDialogButton["label_"+this.lang]}</sp-button>`:lit.qy`<sp-button size="xl" variant="secondary" dialogAction="close">${common_core.k.cancelDialogButton["label_"+this.lang]}</sp-button>`}
            <sp-button size="xl" @click=${this.checking}>${common_core.k.confirmDialogButton["label_"+this.lang]}</sp-button>
          </div>
          ${this.setAttempts()}
        </div>
      </tr-dialog>
      <tr-dialog id="confirmDialog" 
        heading=""
        hideActions=""
        hideXtoClose=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <div>${common_core.k.confirmActionPhrase["label_"+this.lang]} ${this.actionObj.button?this.actionObj.button.title["label_"+this.lang]:this.actionName}?</div>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${common_core.k.cancelDialogButton["label_"+this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.nextRequest}>
              ${common_core.k.confirmDialogButton["label_"+this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
    `}get confirmDialog(){return this.shadowRoot.querySelector("tr-dialog#confirmDialog")}closed(){this.reset(),this.pwd&&(this.pwd.value=""),this.esg&&(this.esg.value=""),this.jst&&(this.jst.value="")}inputField(){return"user"==this.type?lit.qy`
        <mwc-textfield id="userTxtFld" label="${langConfig_userToCheck["label_"+this.lang]}" type="text" dialogInitialFocus .value=${this.userName}></mwc-textfield>
        <mwc-textfield id="pwd" label="${this.adjustLbl(`${langConfig_pwToCheck["label_"+this.lang]}`)}" type="password" iconTrailing="visibility"           
          @click=${this.showPwd}
          @keypress=${e=>this.keyPress(e,"checkingUser")}></mwc-textfield>
      `:"esign"==this.type?lit.qy`
        <mwc-textfield id="esg" label="${this.adjustLbl(`${langConfig_esgToCheck["label_"+this.lang]}`)}" type="password" iconTrailing="visibility"           
          @click=${this.showPwd}
          @keypress=${e=>this.keyPress(e,"checkingPhrase")}></mwc-textfield>
      `:void 0}auditField(){return null!==this.justificationType&&void 0!==this.justificationType&&0!=this.justificationType.length||(this.justificationType="TEXT"),"TEXT"==this.justificationType||"LABPLANET_FALSE"==this.justificationType?lit.qy`
        <mwc-textfield id="jst" label="${this.adjustLbl(`${langConfig_jstToCheck["label_"+this.lang]}`)}" type="text" 
          ?dialogInitialFocus=${!!this.justificationType} 
          @keypress=${this.keyPress}></mwc-textfield>
      `:lit.qy`
        <vaadin-combo-box id="jst"
          item-label-path="name"
          item-value-path="id"
          .placeholder="${langConfig_jstToCheck["label_"+this.lang]}"
          .label="${langConfig_jstToCheck["label_"+this.lang]}"
          .value=${"LIST"==this.justificationType?this.justificationList[0]:null}
          ?dialogInitialFocus=${!!this.justificationType}
          @keypress=${this.keyPress}
          @change=${this.keyPress}
          .items="${this.justificationList}"></vaadin-combo-box>
      `}adjustLbl(label){return this.changing?"en"==this.lang?"Current "+label:label+" Actual":label}get credDialog(){return this.shadowRoot.querySelector("tr-dialog#credDialog")}get userTxtFld(){return this.shadowRoot.querySelector("mwc-textfield#userTxtFld")}get pwd(){return this.shadowRoot.querySelector("mwc-textfield#pwd")}get esg(){return this.shadowRoot.querySelector("mwc-textfield#esg")}get jst(){return this.shadowRoot.querySelector("#jst")}get dialogSurface(){return this.credDialog.shadowRoot.querySelector(".mdc-dialog__surface")}keyPress(e,method){13==e.keyCode&&(method&&this.justificationType?this.jst.focus():this.checking())}checking(){"user"==this.type?this.checkingUser():"esign"==this.type?this.checkingPhrase():"justification"==this.type&&this.nextRequest()}checkAttempt(){this.attempt>1?this.failedAttempt():this.attempt++}failedAttempt(){this.credDialog.close()}checkingUser(){let params=this.config.backendUrl+this.config.appAuthenticateApiUrl+"?"+new URLSearchParams({actionName:"TOKEN_VALIDATE_USER_CREDENTIALS",finalToken:JSON.parse(sessionStorage.getItem("userSession")).finalToken,userToCheck:this.userTxtFld.value,passwordToCheck:this.pwd.value});params=params.replace(/\|/g,"%7C"),this.fetchApi(params).then((j=>{j.is_error?this.checkAttempt():this.nextRequest()}))}checkingPhrase(){let params=this.config.backendUrl+this.config.appAuthenticateApiUrl+"?"+new URLSearchParams({actionName:"TOKEN_VALIDATE_ESIGN_PHRASE",finalToken:JSON.parse(sessionStorage.getItem("userSession")).finalToken,esignPhraseToCheck:this.esg.value});params=params.replace(/\|/g,"%7C"),this.fetchApi(params).then((j=>{j.is_error?this.checkAttempt():this.nextRequest()}))}setAttempts(){if("justification"==this.type)return;let txt="en"==this.lang?`*** Attempts: ${this.attempt} of 3`:`*** Intentos: ${this.attempt} de ${this.maxFails}`;return lit.qy`<p class=${0==this.attempt?"attemptsphraseblue":"attemptsphrasered"}>${txt}</p>`}xnextRequestCommons(action){console.log("xnextRequestCommons"),this.reqParams={...this.reqParams,procInstanceName:this.procInstanceName,finalToken:JSON.parse(sessionStorage.getItem("userSession")).finalToken,dbName:this.config.dbName,actionName:action.actionName,userToCheck:this.userName,passwordToCheck:this.pwd?this.pwd.value:"",esignPhraseToCheck:this.esg?this.esg.value:"",auditReasonPhrase:this.jst?this.jst.value:""};let params=this.config.backendUrl+action.endPoint+"?"+new URLSearchParams(this.reqParams);params=params.replace(/\|/g,"%7C"),this.fetchApi(params).then((()=>{}));let cleanParams={};Object.entries(this.reqParams).map((([key,value])=>{null==value&&null==value||(cleanParams[key]=value)})),this.reqParams=cleanParams,this.credDialog&&this.credDialog.close()}}},"./src/components/GenericDialogs/TrazitTakePictureDialog.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>TrazitTakePictureDialog});var lit=__webpack_require__("./node_modules/lit/index.js"),GridFunctions=__webpack_require__("./src/components/grid_with_buttons/GridFunctions.js"),DialogsFunctions=__webpack_require__("./src/components/GenericDialogs/DialogsFunctions.js"),ApiFunctions=__webpack_require__("./src/components/Api/ApiFunctions.js"),lit_element=__webpack_require__("./node_modules/lit-element/lit-element.js");const styles=lit_element.AH`
  :host {
    display: block;
  }

  .buttonOrig {
    display: inline-block;
    background-color: #1d6355;
    border-radius: 10px;
    border: 4px double #cccccc;
    color: #ffffff;
    text-align: center;
    font-size: 20px;
    padding: 8px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
  }

  .button { 
    color : rgba(36, 192, 235, 1);
    font-family : Montserrat;
    font-weight : bold;
    font-size : 19px;
    background: rgb(36, 192, 235) none repeat scroll 0% 0%; 
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    color: white;
    border-color: transparent !important;
    --mdc-button-fill-color: red;
    --mdc-button-ink-color: blue;
    border-radius: 12px;
    padding: 8px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .container video, .container canvas {
    border: 1px dashed blue;
    border-radius: 8px;
    background-color: #18829f80; /* rgba(36, 192, 235, 1); */
    margin: 10px;
  }

  .button-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0px;
  }

  @media screen and (max-width: 559px) {
    .container {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 700px) {
    .button {
      font-size: 12px;
      padding: 8px;
    }
  }
`;class CameraView extends((0,ApiFunctions.Y)(lit_element.WF)){static get styles(){return styles}static get properties(){return{video:{state:!0},viewport:{state:!0},record:{state:!0},capture:{state:!0},imageDataUrl:{type:String},lang:{type:String},config:{type:Object},action:{type:Object},selectedItem:{type:Object},procInstanceName:String}}constructor(){super(),this.config={},this.action={},this.selectedItem={}}firstUpdated(){this.video=this.shadowRoot.querySelector("#video"),this.viewport=this.shadowRoot.querySelector("#viewport"),this.startBtn=this.shadowRoot.querySelector("#start"),this.captureBtn=this.shadowRoot.querySelector("#capture"),this.uploadBtn=this.shadowRoot.querySelector("#upload"),this._init()}render(){return lang=this.lang,lit_element.qy`
    <div class="container">
      <video id="video" width="240" height="180" autoplay></video>
      <canvas id="viewport" width="240" height="180"></canvas>
    </div>

    <div class="button-container">
      <button id="start" class="button">${void 0===lang||"en"===lang?"Start Camera":"Iniciar Cámara"}</button>
      <button id="capture" class="button">${void 0===lang||"en"===lang?"Capture":"Capturar"}</button>
      <button id="upload" class="button">${void 0===lang||"en"===lang?"Upload":"Subir"}</button>      
    </div>
  `;var lang}_init=()=>{this.startBtn.addEventListener("click",this._startCamera),this.uploadBtn.addEventListener("click",this._upload),this.captureBtn.addEventListener("click",this._capture)};_reset=()=>{this.video.srcObject=null,this.viewport.getContext("2d").clearRect(0,0,this.viewport.width,this.viewport.height)};_startCamera=async()=>{const stream=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1});this.video.srcObject=stream};_captureYanko=()=>{const width=this.viewport.width,height=this.viewport.height;this.viewport.getContext("2d").drawImage(this.video,0,0,width,height),this.imageDataUrl=this.viewport.toDataURL("image/jpeg")};_capture=()=>{const width=this.viewport.width,height=this.viewport.height;this.viewport.getContext("2d").drawImage(this.video,0,0,width,height);let captureimageDataUrl=this.viewport.toDataURL("image/jpeg",.9);this.imageDataUrl=this.dataURLToBlob(captureimageDataUrl),console.log("Image Data URL length:",this.imageDataUrl.length)};dataURLToBlob=dataURL=>{const byteString=atob(dataURL.split(",")[1]),mimeString=dataURL.split(",")[0].split(":")[1].split(";")[0],ab=new ArrayBuffer(byteString.length),ia=new Uint8Array(ab);for(let i=0;i<byteString.length;i++)ia[i]=byteString.charCodeAt(i);return new Blob([ab],{type:mimeString})};base64ToBlob(base64,mime){const byteCharacters=atob(base64),byteNumbers=new Array(byteCharacters.length);for(let i=0;i<byteCharacters.length;i++)byteNumbers[i]=byteCharacters.charCodeAt(i);const byteArray=new Uint8Array(byteNumbers);return new Blob([byteArray],{type:mime})}downloadBlob(blob,fileName){const link=document.createElement("a"),url=URL.createObjectURL(blob);link.href=url,link.download=fileName,document.body.appendChild(link),link.click(),document.body.removeChild(link),URL.revokeObjectURL(url)}_upload=async()=>{if(!this.imageDataUrl)return void("es"===this.lang?alert("Por favor toma una foto antes, para subirla"):alert("Please Capture Image previously, to upload it"));let form=new FormData;form.append("title","Sample"),form.append("picture",this.imageDataUrl);let requestResult={};try{let APIParams=this.getAPICommonParams(this.action),endPointUrl=this.getActionAPIUrl(this.action),serviceAPIurl=this.getServiceAPIUrl(this.action);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);let actionParams=this.jsonParam(this.action,this.selectedItem,void 0,this.selectedItem,void 0,void 0,void 0);Object.keys(actionParams).forEach((key=>{form.append(key,actionParams[key])})),Object.keys(APIParams).forEach((key=>{form.append(key,APIParams[key])}));let params=serviceAPIurl+endPointUrl;this.dispatchEvent(new CustomEvent("show-progress",{bubbles:!0,composed:!0})),(await fetch(params,{method:"POST",body:form,credentials:"same-origin"}).then((response=>response.json())).catch((error=>console.error(error)))).status}catch(e){requestResult={error:1,message:e.message}}return this.dispatchEvent(new CustomEvent("hide-progress",{bubbles:!0,composed:!0})),console.log(requestResult),requestResult}}window.customElements.define("camera-view",CameraView);class UploadNotification extends lit.WF{static properties={message:{type:String},visible:{type:Boolean},type:{type:String}};static styles=lit.AH`
        #notification {
            display: none;
            position: fixed;
            bottom: 20px;
            right: 20px;
            color: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            transition: opacity 0.3s ease-in-out;
        }
    `;constructor(){super(),this.message="",this.visible=!1,this.type="success"}show(message,type="success"){this.message=message,this.type=type,this.visible=!0,this.requestUpdate();const notification=this.shadowRoot.querySelector("#notification");notification.style.display="block",notification.style.opacity="1",notification.style.backgroundColor="success"===type?"#4caf50":"#f44336",setTimeout((()=>{notification.style.opacity="0",setTimeout((()=>{this.visible=!1,notification.style.display="none"}),300)}),3e3)}render(){return lit.qy`<div id="notification">${this.message}</div>`}}customElements.define("upload-notification",UploadNotification);const dropzone_css_styles=lit_element.AH`
  :host {
    display: block;
  }


  .button {
    display: inline-block;
    color: #0290ee;
    text-align: center;
    font-size: 20px;
    transition: all 0.5s;
    cursor: pointer;
  }
  
  .button:hover {
    color: #025bee;
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;    
    flex-wrap: wrap;
    background-color: #148cfa24;
    min-width: 300px;
    min-height: 200px;
    border: 2px dashed #025bee;
    border-radius: 8px;
  }

  input[type="file"] {
    display: none;
  }

  label {
    display: block;
    position: relative;
    background-color: #025bee;
    color: #ffffff;
    font-size: 0.8em
    text-align: center;
    width: 16em;
    padding: 1em 0;
    border-radius: 0.3em;
    margin: 0 auto 1em auto;
    cursor: pointer;
    transition: all 0.2s;
  }

  label:hover {
    background-color: #136cfd;
    transform: scale(1.05);
  }

  #preview {
    position: relative;
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    gap: 1.25em;
    flex-wrap: wrap;
  }
  
  #preview figure {
    width: 45%;
  }
  
  #preview img {
    width: 100%;
  }
  
  #preview figcaption {
    font-size: 0.8em;
    text-align: center;
    color: #5a5861;
  }

  .active {
    border: 2px dashed #025bee;
  }
  
  #error {
    text-align: center;
    color: #ff3030;
  }
.file-preview {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.file-preview figcaption {
  font-weight: bold;
  margin-bottom: 10px;
}

.file-preview img,
.file-preview canvas,
.file-preview pre,
.file-preview a {
  display: block;
  margin: 10px 0;
}

`;class Dropzone extends((0,ApiFunctions.Y)(lit_element.WF)){static get styles(){return dropzone_css_styles}static get properties(){return{container:{state:!0},fileSelector:{state:!0},errorContent:{state:!0},previewContent:{state:!0},files:{state:!0},lang:{type:String},config:{type:Object},action:{type:Object},selectedItem:{type:Object},procInstanceName:String,fileName:{type:String},close:{type:Function}}}constructor(){super(),this.files=[],this.close=()=>{}}firstUpdated(){this.container=this.shadowRoot.querySelector(".container"),this.fileSelector=this.shadowRoot.querySelector("#file-selector"),this.errorContent=this.shadowRoot.querySelector("#error"),this.previewContent=this.shadowRoot.querySelector("#preview"),this._init(),this.addEventListener("upload-success",(async event=>{const upload=this.shadowRoot.querySelector("upload-notification");await upload.show(event.detail.message)}))}render(){return(props=>{const{name,label,handleUpload,getFile,fileName}=props;return lit_element.qy`
    <div class="container">
      <input type="file" id="file-selector" multiple accept="*/*" @change="${getFile}" />
      <label for="file-selector">
        Choose Or Drop Document
      </label>
      <mwc-icon-button class="button" icon="upload_file" id="uploadfile" 
        title="Click to upload the file" @click=${handleUpload}></mwc-icon-button>
      <div id="error"></div>
      ${fileName}
      <div id="preview">
      </div>
      <upload-notification></upload-notification>
    </div>
  `})({handleUpload:this._upload,getFile:this.getFile,thisComponent:this,fileName:this.fileName})}getFile=event=>{this.previewContent.innerHTML="",Array.from(event.target.files).forEach((file=>{this._handleFile(file,file.name,file.type)})),this.files=event.target.files,this.fileName=this.files[0].fileName};_handleFile=(file,name,type)=>{this.errorContent.innerText="";let reader=new FileReader;if(reader.onloadend=async()=>{let fileContainer=document.createElement("figure");fileContainer.classList.add("file-preview");let caption=document.createElement("figcaption");if(caption.innerText=name,fileContainer.appendChild(caption),type.startsWith("image/")){let img=document.createElement("img");img.src=reader.result,img.style.maxWidth="100%",img.style.borderRadius="8px",fileContainer.appendChild(img)}else if("application/pdf"===type){let canvas=document.createElement("canvas");canvas.style.maxWidth="100%",fileContainer.appendChild(canvas);const pdf=await pdfjsLib.getDocument({data:reader.result}).promise,page=await pdf.getPage(1),viewport=page.getViewport({scale:1}),context=canvas.getContext("2d");canvas.height=viewport.height,canvas.width=viewport.width;const renderContext={canvasContext:context,viewport};page.render(renderContext)}this.previewContent.innerHTML="",this.previewContent.appendChild(fileContainer)},"application/pdf"===type)reader.readAsArrayBuffer(file);else if(type.startsWith("image/"))reader.readAsDataURL(file);else{let fileContainer=document.createElement("figure");fileContainer.classList.add("file-preview");let caption=document.createElement("figcaption");caption.innerText=name,fileContainer.appendChild(caption),this.previewContent.innerHTML="",this.previewContent.appendChild(fileContainer)}};_init=()=>{this.fileSelector.addEventListener("change",this.getFile),this.container.addEventListener("dragenter",(event=>{event.preventDefault(),event.stopPropagation(),this.container.classList.add("active")}),!1),this.container.addEventListener("dragleave",(event=>{event.preventDefault(),event.stopPropagation(),this.container.classList.remove("active")}),!1),this.container.addEventListener("dragover",(event=>{event.preventDefault(),event.stopPropagation(),this.container.classList.add("active")}),!1),this.container.addEventListener("drop",(event=>{event.preventDefault(),event.stopPropagation(),this.container.classList.remove("active");let files=event.dataTransfer.files;this.previewContent.innerHTML="",Array.from(files).forEach((file=>{this._handleFile(file,file.name,file.type)})),this.files=[...this.files,...files]}),!1)};_upload=async()=>{let form=new FormData;Array.from(this.files).forEach((file=>{form.append("file",file)}));let APIParams=this.getAPICommonParams(this.action),endPointUrl=this.getActionAPIUrl(this.action);if(String(endPointUrl).toUpperCase().includes("ERROR"))return void alert(endPointUrl);let actionParams=this.jsonParam(this.action,this.selectedItem,void 0,this.selectedItem,void 0,void 0,void 0);void 0!==actionParams&&Object.keys(actionParams).forEach((key=>{form.append(key,actionParams[key])})),void 0!==APIParams&&Object.keys(APIParams).forEach((key=>{form.append(key,APIParams[key])}));let params=this.getServiceAPIUrl(this.action)+endPointUrl;try{this.dispatchEvent(new CustomEvent("show-progress",{bubbles:!0,composed:!0}));const response=await fetch(params,{method:"POST",body:form,credentials:"same-origin"});return response.ok?this.dispatchEvent(new CustomEvent("upload-success",{detail:{message:"File Uploaded successfully!"},bubbles:!0,composed:!0})):(console.error("Upload failed with status:",response.status),setTimeout((()=>{"function"==typeof this.close&&this.close()}),300)),response.json()}catch(error){console.error("Upload failed with error:",error),setTimeout((()=>{"function"==typeof this.close&&this.close()}),300)}this.dispatchEvent(new CustomEvent("hide-progress",{bubbles:!0,composed:!0}))}}function TrazitTakePictureDialog(base){return class extends((0,ApiFunctions.Y)((0,GridFunctions.G)((0,DialogsFunctions.X)(base)))){static get properties(){return{lang:{type:String},actionModel:{type:Object},recordData:{type:Object}}}constructor(){console.log("constructor"),super(),this.actionModel={},this.recordData={},this.thisComponent=this,this.showUploadDialog=!0}show(viewModel,actionModel,data){console.log("show","actionModel",actionModel),this.actionModel=actionModel,this.recordData=data,this.requestUpdate();const dialog=this.shadowRoot.querySelector("#takePictureDialog");dialog&&(dialog.open=!0)}openTakePictureDialog(actionModel=this.actionBeingPerformedModel){return void 0!==actionModel.dialogInfo&&void 0!==actionModel.dialogInfo.name&&(console.log("openTakePictureDialog.open?","name",actionModel.dialogInfo.name),"TAKEPICTUREDIALOG"===actionModel.dialogInfo.name.toString().toUpperCase()||"UPLOADFILEDIALOG"===actionModel.dialogInfo.name.toString().toUpperCase())}resetView(actionModel=this.actionBeingPerformedModel){void 0!==actionModel.dialogInfo&&void 0!==actionModel.dialogInfo.name&&"TAKEPICTUREDIALOG"===actionModel.dialogInfo.name.toString().toUpperCase()||null!==this.cameraView&&this.cameraView._init()}close(){this.shadowRoot.querySelector("#uploadDialog").open=!1}takePictureFormDialog(actionModel){return void 0===actionModel&&(actionModel=this.actionBeingPerformedModel),lit.qy`
        <style>
            mwc-textfield {
                border-style : Solid;
                border-color : #999999;
                border-color : rgba(153, 153, 153, 1);
                border-width : 1px;
                border-radius : 7px;
                -moz-border-radius : 7px;
                -webkit-border-radius : 7px;   
                font-family : Montserrat;
                font-weight : bold;
                font-size : 19px;
                background-color :  #FFFFFF;
                background-color : rgb(255, 255, 255);  
                --mdc-text-field-idle-line-color:#148CFA;
                --mdc-text-field-outlined-idle-border-color: #148CFA;
                --mdc-text-field-label-ink-color:  #148CFA;
                --mdc-text-field-focused-label-color: #148CFA;
                --mdc-theme-primary: #0465FB;
            }
            mwc-select {        
                --mdc-theme-primary : rgba(36, 192, 235, 1);
                --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
                --mdc-select-ink-color: rgb(47, 47, 47);
                --mdc-select-dropdown-icon-color:rgba(36, 192, 235, 1);
                --mdc-select-hover-line-color:rgba(36, 192, 235, 1);
                --mdc-notched-outline-border-color: rgba(186, 235, 248, 0.4);
                --mdc-select-disabled-dropdown-icon-color:rgba(36, 192, 235, 1);

                font-family : Montserrat;
                font-weight : bold;
                font-size : 19px;
            }
            mwc-select.outlined {        
                --mdc-theme-primary : rgba(36, 192, 235, 1);
                --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
                --mdc-select-ink-color: rgba(36, 192, 235, 1);
                font-family : Montserrat;
                font-weight : bold;
                font-size : 19px;
                background-color: 4fcad029;
            }       
            .title {
                text-align: center;    
                font-size: 22px;
            }
        </style>
        ${void 0===actionModel.dialogInfo||"TAKEPICTUREDIALOG"!==actionModel.dialogInfo.name.toString().toUpperCase()?lit.s6:lit.qy`
            <tr-dialog id="takePictureDialog" @opened=${this.resetView(actionModel)} ?open=${this.openTakePictureDialog(actionModel)} 
                heading="" hideActions="" scrimClickAction="">
                <p class="title" >${"en"===this.lang?lit.qy`Turn on the cam, Take one picture and upload it`:lit.qy`Activa la cámara, toma una foto y súbela`}</p>
                <camera-view id="cameraView" .lang=${this.lang} procInstanceName="${this.procInstanceName}" .config="${this.config}" .action="${this.actionBeingPerformedModel}" .selectedItem="${this.selectedItem}"></camera-view>
            </tr-dialog>
        `}
          
                    <tr-dialog id="uploadDialog" @opened=${this.resetView(actionModel)} ?open=${this.openTakePictureDialog(actionModel)} 
                heading="" hideActions="" scrimClickAction="">
                <p class="title">${this.lang,lit.qy``}</p>
                <drop-zone id="dropFileZone" .lang=${this.lang} procInstanceName="${this.procInstanceName}" .config="${this.config}" .action="${this.actionBeingPerformedModel}" .close="${()=>{this.close()}}" .selectedItem="${this.selectedItem}"></drop-zone>
            </tr-dialog>    
        
    `}get cameraView(){return this.shadowRoot.querySelector("camera-view#cameraView")}get takePictureDialog(){return null!==this.cameraView&&this.cameraView._reset(),this.shadowRoot.querySelector("tr-dialog#takePictureDialog")}}}window.customElements.define("drop-zone",Dropzone)},"./src/components/templates-.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),_collaborne_lit_flexbox_literals__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@collaborne/lit-flexbox-literals/dist/index.js"),_components_grid_with_buttons_GridFunctions__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__("./node_modules/@material/mwc-select/mwc-select.js"),__webpack_require__("./node_modules/@material/mwc-list/mwc-list-item.js"),__webpack_require__("./src/components/grid_with_buttons/GridFunctions.js"));class Templates extends((0,_components_grid_with_buttons_GridFunctions__WEBPACK_IMPORTED_MODULE_4__.G)(lit__WEBPACK_IMPORTED_MODULE_0__.WF)){static get styles(){return[_collaborne_lit_flexbox_literals__WEBPACK_IMPORTED_MODULE_1__.G6,lit__WEBPACK_IMPORTED_MODULE_0__.AH`
      mwc-select[hidden] {
        display: none;
      }
      div#topElement{
        padding-top:5px;
        display: flex;
      }
      mwc-icon-button {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }   
      mwc-select {        
        --mdc-theme-primary : rgba(36, 192, 235, 1);
        --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
        --mdc-select-ink-color: rgba(36, 192, 235, 1);
        --mdc-select-dropdown-icon-color:rgba(36, 192, 235, 1);
        --mdc-select-hover-line-color:rgba(36, 192, 235, 1);

        --mdc-select-disabled-dropdown-icon-color:rgba(36, 192, 235, 1);

        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      }
      mwc-select.outlined {        
        --mdc-theme-primary : rgba(36, 192, 235, 1);
        --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
        --mdc-select-ink-color: rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
      } 
      h1 {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size:calc(12px + 1.5vw);
        text-align: center;
        padding-left: 5px;
      }                         
      `]}static get properties(){return{templateName:{type:String},buttons:{type:Array},lang:{type:String},programsList:{type:Array},selectedProgram:{type:Array},viewModelFromProcModel:{type:Object},viewName:{type:String},filterName:{type:String},procInstanceName:{type:String}}}constructor(){super(),this.programsList=[],this.selectedProgram={},this.viewModelFromProcModel={},this.lang="en"}render(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`${this.templateName?lit__WEBPACK_IMPORTED_MODULE_0__.qy`${this[this.templateName]()}`:lit__WEBPACK_IMPORTED_MODULE_0__.s6}`}resetView(){this.selectedProgram=[],this.programsList=[]}populateProgramsList(){let myList=[];this.programsList.forEach((row=>{myList.push(row)}));let firstProgram=this.programsList[0];if(void 0!==firstProgram){this.selectedProgram=[],this.selectedProgram.push(firstProgram);let mye={target:{value:""}};mye.target.value=firstProgram.name,this.programChanged(mye)}return lit__WEBPACK_IMPORTED_MODULE_0__.qy`
    ${myList.map(((c,i)=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`<mwc-list-item value="${c.name}" ?selected=${0==i}>${c.name}</mwc-list-item>`))}
    `}specCode(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`    
      <div id= "topElement" class="layout center">
        ${this.buttons&&this.buttons.map((b=>lit__WEBPACK_IMPORTED_MODULE_0__.qy`<mwc-icon-button 
            icon="${b.icon}" 
            title="${b.title["label_"+this.lang]}" 
            @click=${()=>this.dispatchEvent(new CustomEvent("template-event",{detail:b}))}></mwc-icon-button>`))}
        ${void 0===this.programsList?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
            No programs founds, please review the master data
        `:lit__WEBPACK_IMPORTED_MODULE_0__.qy`
          <mwc-select outlined label="Program Name" @change=${this.programChanged} ?hidden=${this.programsList.length<2}>
              ${this.populateProgramsList()}
          </mwc-select>
          ${1==this.programsList.length?lit__WEBPACK_IMPORTED_MODULE_0__.qy`<h3>${this.programsList[0].name}</h3>`:lit__WEBPACK_IMPORTED_MODULE_0__.s6}
        `} 
        ${this.getTitle()}  
      </div>
    `}programChanged(e){this.programsList.length&&(this.selectedProgram=this.programsList.filter((p=>p.name==e.target.value)),this.dispatchEvent(new CustomEvent("program-changed",{detail:this.selectedProgram[0].sample_points||[]})))}}window.customElements.define("templates-",Templates)},"./src/gridmodel-bottomcomp-chart.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var lit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/lit/index.js"),_trazit_cred_dialog__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./.yalc/@trazit/cred-dialog/index.js"),_collaborne_lit_flexbox_literals__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@collaborne/lit-flexbox-literals/dist/index.js");__webpack_require__("./node_modules/@google-web-components/google-chart/google-chart.js");let chartWithNoData={label_en:"No data for charting",label_es:"No hay datos para una gráfica"};class GridmodelBottomcompChart extends _trazit_cred_dialog__WEBPACK_IMPORTED_MODULE_1__.t{static get styles(){return[_collaborne_lit_flexbox_literals__WEBPACK_IMPORTED_MODULE_2__.G6,super.styles,lit__WEBPACK_IMPORTED_MODULE_0__.AH`
        mwc-button {
          --mdc-typography-button-text-transform: none;
          margin: 0 2px;
        }
        tr-dialog * {
          margin-bottom: 5px;
        }
        mwc-textfield[hidden] {
          display: none;
        }
        mwc-button[hidden] {
          display: none;
        }
        div.input * {
          margin: 10px 0 5px;
        }
        mwc-icon-button[hidden] {
          display: none;
        }
        #resultDialog {
          --mdc-dialog-min-width: 800px;
        }
        #batchDetail {
          width: 200px;
          margin: 0 20px;
          padding-top: 20px;
        }
        #batchDetail h1 {
          color: blue;
        }
        #samplesArr {
          border-radius: 2px;
          box-shadow: rgb(136, 136, 136) 2px 2px;
          padding: 5px;
          background: #c2f2ff;
        }
        #samplesArr div {
          margin: 5px 0;
        }
        #assignDialog {
          --mdc-dialog-min-width: 500px;
        }
        @media (max-width: 460px) {
          vaadin-grid {
            font-size: 10px;
          }
          vaadin-grid-cell-content {
            padding: 5px;
          }
        }
      `]}static get properties(){return{selectedItems:{type:Array},chartLineAllData:{type:Array}}}constructor(){super(),this.chartLineAllData=[]}updated(updates){super.updated(updates),updates.has("model")&&(this.filterName=this.model.filter,this.resetView(),this.authorized())}resetView(){this.selectedItems=[],this.assignList=[],this.langConfig=this.model.langConfig,this.mode&&this.model.actions&&(this.actions=this.model.actions,this.selectedAction=this.model.actions[0])}render(){return lit__WEBPACK_IMPORTED_MODULE_0__.qy`${this.model?lit__WEBPACK_IMPORTED_MODULE_0__.qy`      
      <div class="layout horizontal flex wrap">
        <div class="layout flex">
        <h3>${this.model.chartTitle["label_"+this.lang]}</h3>
        ${!this.lineData()||this.lineData().length<=1?lit__WEBPACK_IMPORTED_MODULE_0__.qy`
          ${chartWithNoData["label_"+this.lang]}
          `:lit__WEBPACK_IMPORTED_MODULE_0__.qy`      
            <google-chart type='${this.model.data.chartType}' .data='${this.lineData()}'></google-chart>
          `}
        </div>
        ${super.render()}
      </div>
      `:lit__WEBPACK_IMPORTED_MODULE_0__.s6}
    `}lineData(){let allData=[[]];if(allData[0][0]=this.model.data.chartValuesHeader[this.lang][0],allData[0][1]=this.model.data.chartValuesHeader[this.lang][1],void 0===this.selectedItems||0==this.selectedItems.length)return allData;if(void 0===this.selectedItems[0][this.model.data.objectArrayValuesName]||"No readings"===this.selectedItems[0][this.model.data.objectArrayValuesName]||0==this.selectedItems[0][this.model.data.objectArrayValuesName].length)return allData;let valuesArr=this.selectedItems[0][this.model.data.objectArrayValuesName];if("No readings"===valuesArr||0==valuesArr.length)return allData;for(let i=0;i<this.selectedItems[0][this.model.data.objectArrayValuesName].length;i++){let curReading=[];curReading[0]=this.selectedItems[0][this.model.data.objectArrayValuesName][i][this.model.data.valuesFirstPropertyName],curReading[1]=this.selectedItems[0][this.model.data.objectArrayValuesName][i][this.model.data.valuesSecondPropertyName],allData.push(curReading)}return this.chartLineAllData=allData,allData}}window.customElements.define("gridmodel-bottomcomp-chart",GridmodelBottomcompChart)}}]);
//# sourceMappingURL=527.7b80e83e.iframe.bundle.js.map
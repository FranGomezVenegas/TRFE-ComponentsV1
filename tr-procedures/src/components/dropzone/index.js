import { LitElement } from 'lit-element';
import { template } from './dropzone.template';
import { styles } from './dropzone.css';
import { ApiFunctions } from '../Api/ApiFunctions';

export class Dropzone extends ApiFunctions(LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      container: { state: true },
      fileSelector: { state: true },
      errorContent: { state: true },
      previewContent: { state: true },
      files: { state: true },
      lang: { type: String },
      config: { type: Object },
      action: { type: Object },
      selectedItem: { type: Object },
      procInstanceName: String,
      fileName: { type: String },
      close: { type: Function },
    };
  }

  constructor() {
    super();
    this.files = [];
    this.close = () => {};
  } 

  firstUpdated() {
    this.container = this.shadowRoot.querySelector('.container');
    this.fileSelector = this.shadowRoot.querySelector('#file-selector');
    this.errorContent = this.shadowRoot.querySelector('#error');
    this.previewContent = this.shadowRoot.querySelector('#preview');
    this._init();
    
    this.addEventListener('upload-success', async (event) => {
      const upload = this.shadowRoot.querySelector('upload-notification')
      await upload.show(event.detail.message);        
    });
  }

  render() {
    return template({
      handleUpload: this._upload,
      getFile: this.getFile,
      thisComponent: this,
      fileName: this.fileName
    });
  }

  getFile = (event) => {
    this.previewContent.innerHTML = "";
    Array.from(event.target.files).forEach((file) => {
      this._handleFile(file, file.name, file.type);
    });
    this.files = event.target.files;
    this.fileName = this.files[0].fileName
  };

  _handleFile = (file, name, type) => {
    this.errorContent.innerText = "";

    let reader = new FileReader();

    reader.onloadend = async () => {
      let fileContainer = document.createElement("figure");
      fileContainer.classList.add("file-preview");

      let caption = document.createElement("figcaption");
      caption.innerText = name;
      fileContainer.appendChild(caption);

      if (type.startsWith("image/")) {
        let img = document.createElement("img");
        img.src = reader.result;
        img.style.maxWidth = "100%";
        img.style.borderRadius = "8px";
        fileContainer.appendChild(img);
      } else if (type === "application/pdf") {
        let canvas = document.createElement("canvas");
        canvas.style.maxWidth = "100%";
        fileContainer.appendChild(canvas);

        const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      }
      this.previewContent.innerHTML = ''
      this.previewContent.appendChild(fileContainer);
    };

    if (type === "application/pdf") {
      reader.readAsArrayBuffer(file);
    } else if (type.startsWith("image/")) {
      reader.readAsDataURL(file);
    } else {
      let fileContainer = document.createElement("figure");
      fileContainer.classList.add("file-preview");

      let caption = document.createElement("figcaption");
      caption.innerText = name;
      fileContainer.appendChild(caption);
      this.previewContent.innerHTML = ''
      this.previewContent.appendChild(fileContainer);
    }
  };


  _init = () => {
    this.fileSelector.addEventListener("change", this.getFile);

    this.container.addEventListener("dragenter", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.container.classList.add("active");
    }, false);

    this.container.addEventListener("dragleave", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.container.classList.remove("active");
    }, false);

    this.container.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.container.classList.add("active");
    }, false);

    this.container.addEventListener("drop", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.container.classList.remove("active");
      let draggedData = event.dataTransfer;
      let files = draggedData.files;
      this.previewContent.innerHTML = "";
      Array.from(files).forEach((file) => {
        this._handleFile(file, file.name, file.type);
      });

      this.files = [...this.files, ...files];
    }, false);
  };

  _upload = async () => {
    let form = new FormData();
    Array.from(this.files).forEach(file => {
      form.append('file', file);
    });

    let APIParams = this.getAPICommonParams(this.action);
    let endPointUrl = this.getActionAPIUrl(this.action);
    if (String(endPointUrl).toUpperCase().includes("ERROR")) {
      alert(endPointUrl);
      return;
    }

    let actionParams = this.jsonParam(this.action, this.selectedItem, undefined, this.selectedItem, undefined, undefined, undefined);

    if (actionParams!==undefined){
      Object.keys(actionParams).forEach(key => {
        form.append(key, actionParams[key]);
      });
    }
    if (APIParams!==undefined){
      Object.keys(APIParams).forEach(key => {
        form.append(key, APIParams[key]);
      });
    }
    let serviceAPIurl=this.getServiceAPIUrl(this.action)
    let params = serviceAPIurl + endPointUrl;

    try {
      const response = await fetch(params, {
        method: 'POST',
        body: form,
        credentials: 'same-origin'
      });
  
      if (response.ok) {
        // Dispatch the success event if the response is OK
        this.dispatchEvent(new CustomEvent('upload-success', {
          detail: { message: 'File Uploaded successfully!' },
          bubbles: true,
          composed: true
        }));
      } else {
        // Handle non-OK responses
        console.error('Upload failed with status:', response.status);
        setTimeout(() => {
          if (typeof this.close === 'function') {
            this.close();
          }
        }, 300);
      }
  
      return response.json();
    } catch (error) {
      // Handle network errors or other fetch-related errors
      console.error('Upload failed with error:', error);
      setTimeout(() => {
        if (typeof this.close === 'function') {
          this.close();
        }
      }, 300);
    }
    


  };
  
}

window.customElements.define('drop-zone', Dropzone);
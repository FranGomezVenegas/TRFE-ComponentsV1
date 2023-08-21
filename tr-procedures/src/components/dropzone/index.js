import { LitElement } from 'lit-element';
import { template } from './dropzone.template';
import { styles } from './dropzone.css';


export class Dropzone extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      container: { state: true },
      fileSelector: { state: true },
      errorContent: { state: true },
      previewContent: { state: true },
      files: { state : true }
    };
  }

  constructor() {
    super();
    this.files = [];
  }


  firstUpdated() {
    this.container = this.shadowRoot.querySelector('.container');
    this.fileSelector = this.shadowRoot.querySelector('#file-selector');
    this.errorContent = this.shadowRoot.querySelector('#error');
    this.previewContent = this.shadowRoot.querySelector('#preview');
    this._init();
  }

  render() {
    return template({
      handleUpload: this._upload
    });
  }

  _handleFile = (file, name, type) => {
    if (type.split("/")[0] !== "image") {
      this.errorContent.innerText = "Please upload an image file";
      return false;
    }
    this.errorContent.innerText = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      let imageContainer = document.createElement("figure");
      let img = document.createElement("img");
      img.src = reader.result;
      imageContainer.appendChild(img);
      imageContainer.innerHTML += `<figcaption>${name}</figcaption>`;
      this.previewContent.appendChild(imageContainer);
    };
  }

  _init = () => {
    console.log(this.fileSelector);
    this.fileSelector.addEventListener("change", () => {
      this.previewContent.innerHTML = "";
      Array.from(this.fileSelector.files).forEach((file) => {
        this._handleFile(file, file.name, file.type);
      });

      this.files = this.fileSelector.files;
    });

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

        this.files = [...this.files, files];
    }, false);
  }

  _upload = async () => {
    const formData = new FormData()

    Array.prototype.forEach.call(this.files, f => formData.append('files', f))

    return fetch('/api/upload', {
      method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
      body: formData  // Coordinate the body type with 'Content-Type'
    })
    .then(response => response.json())
    .catch(error => console.error(error))
  }
}

window.customElements.define('drop-zone', Dropzone);

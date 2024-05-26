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
      files: { state : true },
      lang: { type: String },
      config: { type: Object },
      action: { type: Object },
      selectedItem: { type: Object },
      procInstanceName: String      
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

  _handleFileYanko = (file, name, type) => {
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

  _handleFile = (file, name, type) => {
    // Clear any previous error messages
    this.errorContent.innerText = "";
  
    // Create a FileReader to read the file
    let reader = new FileReader();
  
    // Set up the FileReader onloadend event
    reader.onloadend = () => {
      let fileContainer = document.createElement("figure");
  
      // Determine how to display the file based on its type
      if (type.startsWith("image/")) {
        // Display image files
        let img = document.createElement("img");
        img.src = reader.result;
        fileContainer.appendChild(img);
      } else if (type === "application/pdf") {
        // Display PDF files
        let iframe = document.createElement("iframe");
        iframe.src = reader.result;
        iframe.width = "100%";
        iframe.height = "500px"; // Adjust height as needed
        fileContainer.appendChild(iframe);
      } else if (type.startsWith("text/") || type === "application/json") {
        // Display text files and JSON
        let textPreview = document.createElement("pre");
        textPreview.textContent = reader.result;
        fileContainer.appendChild(textPreview);
      } else {
        // Handle other file types (e.g., .doc, .xls) by creating a download link
        let fileLink = document.createElement("a");
        fileLink.href = reader.result;
        fileLink.download = name;
        fileLink.innerText = `Download ${name}`;
        fileContainer.appendChild(fileLink);
      }
  
      // Add file name as a caption
      fileContainer.innerHTML += `<figcaption>${name}</figcaption>`;
      this.previewContent.appendChild(fileContainer);
    };
  
    // Read the file as a Data URL
    reader.readAsDataURL(file);
  };
        
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
    //const formData = new FormData()


    let form = new FormData();
    form.append('file', this.files[0]);
    //Array.prototype.forEach.call(this.files, f => form.append('files', f))

//    form.append('title', 'Sample');
//    form.append('picture', this.imageBlob);
//    let requestResult={}
    let APIParams = this.getAPICommonParams(this.action)
    let endPointUrl = this.getActionAPIUrl(this.action)
    if (String(endPointUrl).toUpperCase().includes("ERROR")) {
      alert(endPointUrl)
      return
    }

    let actionParams = this.jsonParam(this.action, this.selectedItem, undefined, this.selectedItem, undefined, undefined, undefined)
    
    Object.keys(actionParams).forEach(key => {
      form.append(key, actionParams[key]);
    });
    Object.keys(APIParams).forEach(key => {
      form.append(key, APIParams[key]);
    });
    let params=this.config.backendUrl + endPointUrl
    //params=params.replace('https://platform.trazit.net:8443/', 'http://localhost:8081/')
    let response = await fetch(params, {
      method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
      body: form,  // Coordinate the body type with 'Content-Type'
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .catch(error => console.error(error))
    if (response.status === 200) {
      //const blob = await response.blob();
      //const url = window.URL.createObjectURL(blob);
      //const a = document.createElement('a');
      //a.href = url;
      //a.download = 'processed_report.txt'; // Adjust the filename as needed
      //document.body.appendChild(a); // Append to the document to make it clickable
      //a.click(); // Trigger the download
      //a.remove(); // Remove the element after the download
    } else {
        //const errorText = await response.text();
        //throw new Error(errorText);
    }    
  }

}window.customElements.define('drop-zone', Dropzone);

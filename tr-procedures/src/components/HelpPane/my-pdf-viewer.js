import { LitElement, html } from 'lit';
import { pdfViewerTemplate } from './my-pdf-viewer-template.js';

export class MyPdfViewer extends LitElement {
  static properties = {
    pdfs: { type: Array },
    lang: { type: String },
    selectedPdfUrl: { type: String },
    selectedSection: { type: String },
  };

  constructor() {
    super();
    this.pdfs = [];
    this.lang = 'en';
    this.selectedPdfUrl = '';
    this.selectedSection = '';
  }
  changePdfSelected(pdf){
    this.selectedPdfUrl=pdf.url
  }
// this._onPdfSelected(pdf.url, pdf.isGoogleDrive)
  render() {
    return html`
        <div class="pdf-list">
            ${this.pdfs.map(
            (pdf) => html`
                <div
                class="pdf-list-item"
                @click=${() => this.changePdfSelected(pdf)}
                >
                <h3>${pdf.name}</h3>
                <p>${this.lang === 'en' ? pdf.description_en : pdf.description_es}</p>
                </div>
            `
            )}
        </div>
        <mwc-icon-button icon="fullscreen" .isvideo=${false} .src=${this.selectedPdfUrl} 
            @click=${this.openDialogFrame}></mwc-icon-button>
                                                                    
        <iframe .src=${this.selectedPdfUrl} @click=${this.openDialogFrame} controls
            controlsList="nodownload"></iframe>
        <div id="dialog-frame" class="dialog">
            <mwc-icon-button
                icon="fullscreen_exit"
                @click=${this.closeDialogFrame}
            ></mwc-icon-button>
            <iframe
                                              id="my-iframe"
                                              controls
                                              controlsList="nodownload"
                                            ></iframe>
        </div>             
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('selectedPdfUrl') && this.selectedPdfUrl) {
      this._renderPdf(this.selectedPdfUrl, this.selectedSection);
    }
  }
  openDialogFrame(e) {
    console.log(e.currentTarget.isvideo);
    this.dialogEl.style.display = "block";
    const { width, height } = this.dialogEl.getBoundingClientRect();
    const marginTop = height / 2;
    const marginLeft = width / 2;
    if (
      e.currentTarget.isvideo === undefined ||
      e.currentTarget.isvideo === false
    ) {
      this.iframeEl.src = e.currentTarget.src + "#toolbar=0";
    }
    if (
      e.currentTarget.isvideo !== undefined &&
      e.currentTarget.isvideo === true
    ) {
      const mimeUrl = e.currentTarget.src.match(/(?<=src=")(.*?)(?=")/)[0];
      this.videosourceEl.src = mimeUrl;
    }

    console.log(" window.innerWidth;", window.innerWidth);

    this.dialogEl.style.marginTop = `200px`;
    this.dialogEl.style.marginLeft = `316px`;
    if (window.innerWidth < 800) {
      this.dialogEl.style.marginLeft = `100px`;
    }
    this.dialogEl.style.border = "1px solid rgb(36, 192, 235)";
    this.dialogEl.style.width = `${window.innerWidth * 0.65}px`;
    //this.dialogEl.style.display = 'block';
  }

  closeDialogFrame() {
    this.dialogEl.style.display = "none";
  }
  keyPressDialogFrame(e) {
    alert("key");
    if (e.key == "Escape") {
      this.dialogEl.style.display = "none";
    }
    if (e.keyCode == 27) {
      this.dialogEl.style.display = "none";
    }
  }
  _extractGoogleDriveFileId(url) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  }

  _onPdfSelected(url, isGoogleDrive) {
    if (!isGoogleDrive) {
      const googleDriveFileId = this._extractGoogleDriveFileId(url);
      this.selectedPdfUrl = `https://drive.google.com/uc?export=download&id=${googleDriveFileId}`;
    } else {
      this.selectedPdfUrl = url;
    }
    this.selectedSection = '';
  }
  async _renderPdf(url, section) {
    const container = this.shadowRoot.getElementById('pdf-container');
    if (container!==null){
        container.innerHTML = ''; // Clear previous PDF content
        
        try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
    
        const numPages = pdf.numPages;
    
        for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
    
            const scale = 1.5;
            const viewport = page.getViewport({ scale });
    
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
    
            const renderContext = {
            canvasContext: context,
            viewport: viewport,
            };
    
            await page.render(renderContext).promise;
            container.appendChild(canvas);
        }
    
        if (section) {
            const page = await pdf.getPage(section);
            const viewport = page.getViewport({ scale: 1.5 });
    
            const sectionCanvas = document.createElement('canvas');
            const sectionContext = sectionCanvas.getContext('2d');
            sectionCanvas.height = viewport.height;
            sectionCanvas.width = viewport.width;
    
            const renderContext = {
            canvasContext: sectionContext,
            viewport: viewport,
            };
    
            await page.render(renderContext).promise;
            container.scrollTop = sectionCanvas.offsetTop;
        }
        } catch (error) {
        console.error('Error rendering PDF:', error.message);
        container.innerHTML = `<p>Error loading PDF: ${error.message}</p>`;
        }
    }
  }
  
  get dialogEl() {return this.shadowRoot.querySelector("div#dialog-frame");}
  get iframeEl() {return this.shadowRoot.querySelector("iframe#my-iframe");}

}customElements.define('my-pdf-viewer', MyPdfViewer);

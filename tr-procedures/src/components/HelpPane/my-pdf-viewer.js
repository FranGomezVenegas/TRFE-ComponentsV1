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

  render() {
    return html`
      <div class="pdf-list">
        ${this.pdfs.map(
          (pdf) => html`
            <div
              class="pdf-list-item"
              @click=${() => this._onPdfSelected(pdf.url, pdf.isGoogleDrive)}
            >
              <h3>${pdf.name}</h3>
              <p>${this.lang === 'en' ? pdf.description_en : pdf.description_es}</p>
            </div>
          `
        )}
      </div>
      <div id="pdf-container"></div>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('selectedPdfUrl') && this.selectedPdfUrl) {
      this._renderPdf(this.selectedPdfUrl, this.selectedSection);
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

customElements.define('my-pdf-viewer', MyPdfViewer);

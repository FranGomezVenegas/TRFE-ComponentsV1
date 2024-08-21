import { html } from 'lit';
import { pdfViewerStyles } from './my-pdf-viewer-styles.js';

export function pdfViewerTemplate({ pdfs, selectedPdfUrl, lang }) {
  return html`
    <style>
      ${pdfViewerStyles}
    </style>
    ss
    <div class="pdf-list">
      ${pdfs.map(
        (pdf) => html`
          <div
            class="pdf-list-item"
            @click=${() => this._onPdfSelected(pdf.url)}
          >
            <h3>${pdf.name}</h3>
            <p>${lang === 'en' ? pdf.description_en : pdf.description_es}</p>
          </div>
        `
      )}
    </div>
    ${selectedPdfUrl
      ? html`<iframe
          class="pdf-preview"
          src=${selectedPdfUrl}
          type="application/pdf"
        ></iframe>`
      : html`<p>No PDF selected</p>`}
  `;
}

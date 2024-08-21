import { css } from 'lit';

export const pdfViewerStyles = css`
  :host {
    display: block;
    font-family: Arial, sans-serif;
    padding: 16px;
    border: 1px solid #ccc;
  }

  .pdf-list {
    margin-bottom: 16px;
  }

  .pdf-list-item {
    cursor: pointer;
    padding: 8px;
    border-bottom: 1px solid #ccc;
  }

  .pdf-list-item:hover {
    background-color: #f0f0f0;
  }

  .pdf-preview {
    width: 100%;
    height: 600px;
    border: 1px solid #ccc;
  }
`;

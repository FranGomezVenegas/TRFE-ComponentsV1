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
#my-iframe {
                  width: 100%;
                  height: 100%;
                  border: none;
                  flex: 1;
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
                iframe::shadow
                  .pdf-viewer::content
                  #controls
                  ::slotted(.SwitchToReadingMode-Small14) {
                  display: none;
                }    
`;

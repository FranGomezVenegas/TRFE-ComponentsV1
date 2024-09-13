import { css } from 'lit';

export const editorStyles = css`
  :host {
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    background-color: #f9f9f9;
    max-width: 800px;
    margin: 0 auto;
  }

  #editor {
    height: 500px;
    width: 100%;
    border: 1px solid #ddd;
    font-family: monospace;
    font-size: 14px;
  }

  button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #ccc;
  }
`;

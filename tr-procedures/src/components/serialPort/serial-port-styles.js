// Archivo: serial-port-styles.js
import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
    width: 300px;
  }

  button {
    padding: 8px 16px;
    margin: 8px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  pre {
    max-height: 200px;
    overflow-y: auto;
    background: #e9ecef;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    resize: none;
    font-size: 14px;
    margin-top: 8px;
  }

  input[type="number"] {
    width: 60px;
    margin-top: 8px;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  label {
    font-size: 14px;
    margin-right: 8px;
  }

  div {
    margin-top: 16px;
  }
  
  div.buttons { 
    display:flex;
  }
`;

import { css } from "lit-element";

export const styles = css`
  :host {
    display: block;
  }

  .button {
    display: inline-block;
    background-color: #1d6355;
    border-radius: 10px;
    border: 4px double #cccccc;
    color: #ffffff;
    text-align: center;
    font-size: 20px;
    padding: 8px;
    width: 100px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
  }
  
  .button:hover {
    background-color: #00ab97;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    background-color: #ffffe0;
    min-width: 300px;
    min-height: 200px;
    border: 2px dashed red;
    border-radius: 8px;
  }

  input[type="file"] {
    display: none;
  }

  label {
    display: block;
    position: relative;
    background-color: #025bee;
    color: #ffffff;
    font-size: 1.1em;
    text-align: center;
    width: 16em;
    padding: 1em 0;
    border-radius: 0.3em;
    margin: 0 auto 1em auto;
    cursor: pointer;
    transition: all 0.2s;
  }

  label:hover {
    background-color: #136cfd;
    transform: scale(1.05);
  }

  #preview {
    position: relative;
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    gap: 1.25em;
    flex-wrap: wrap;
  }
  
  #preview figure {
    width: 45%;
  }
  
  #preview img {
    width: 100%;
  }
  
  #preview figcaption {
    font-size: 0.8em;
    text-align: center;
    color: #5a5861;
  }

  .active {
    border: 2px dashed #025bee;
  }
  
  #error {
    text-align: center;
    color: #ff3030;
  }
`
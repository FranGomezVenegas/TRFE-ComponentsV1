import { css } from "lit-element";

export const styles = css`
  :host {
    display: block;
  }

  .container {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
  }

  input[type="file"] {
    position: absolute;
    z-index: -1;
    top: 15px;
    left: 20px;
    font-size: 17px;
    color: #b8b8b8;
  }

  .button-wrap {
    position: relative;
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
`
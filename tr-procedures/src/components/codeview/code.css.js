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
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
  }

  .input {
    display: inline-block;
    border-radius: 10px;
    border: 4px double #cccccc;
    text-align: center;
    font-size: 20px;
    padding: 8px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
    outline: none;
  }

  .input:focus {
    border-color: #1d6355;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
  }

  .codeContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`
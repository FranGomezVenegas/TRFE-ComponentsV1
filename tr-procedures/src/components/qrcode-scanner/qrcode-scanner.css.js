import { css } from "lit";

export const styles = css`
  :host {
    display: block;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
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

  .input {
    display: inline-block;
    background-color: #cccccc;
    border-radius: 10px;
    border: 4px double #1d6355;
    color: #ffffff;
    text-align: center;
    font-size: 20px;
    padding: 8px;
    transition: all 0.5s;
    margin: 5px;
    outline: none;
  }
`
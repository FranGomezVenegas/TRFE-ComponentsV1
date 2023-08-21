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

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .container video, .container canvas {
    border: 1px dashed blue;
    border-radius: 8px;
    background-color: rgb(255, 255, 224);
    margin: 10px;
  }
`
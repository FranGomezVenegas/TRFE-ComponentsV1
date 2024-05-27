import { css } from "lit-element";

export const styles = css`
  :host {
    display: block;
  }

  .buttonOrig {
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

  .button { 
    color : rgba(36, 192, 235, 1);
    font-family : Montserrat;
    font-weight : bold;
    font-size : 19px;
    background: rgb(36, 192, 235) none repeat scroll 0% 0%;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    color: white;
    border-color: transparent !important;
    --mdc-button-fill-color: red;
    --mdc-button-ink-color: blue;
    border-radius: 12px;
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
    background-color: rgba(36, 192, 235, 1);
    margin: 10px;
  }

  .button-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0px;
  }

  @media screen and (max-width: 559px) {
    .container {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 700px) {
    .button {
      font-size: 12px;
      padding: 8px;
    }
  }
`
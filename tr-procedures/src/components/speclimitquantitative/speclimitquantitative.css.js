import { css } from "lit-element";

export const styles = css`
  :host {
    display: block;
  }

  ul {
    padding-left: 10px;
  }
  mwc-textfield {
    border-style: solid;
    border-color: #999999;
    border-color: rgba(153, 153, 153, 1);
    border-width: 1px;
    border-radius: 7px;
    -moz-border-radius: 7px;
    -webkit-border-radius: 7px;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    background-color: #FFFFFF;
    background-color: rgb(255, 255, 255);
    --mdc-text-field-idle-line-color: #148CFA;
    --mdc-text-field-outlined-idle-border-color: #148CFA;
    --mdc-text-field-label-ink-color: #148CFA;
    --mdc-text-field-focused-label-color: #148CFA;
    --mdc-theme-primary: #0465FB;
  }
  input {
    border-style: solid;
    border-color: #999999;
    border-width: 1px;
    border-radius: 7px;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    background-color: #FFFFFF;
    padding: 8px;
    flex: 1;
  }
  .input-container {
    display: flex;
    align-items: center;
  }
  .input-container span {
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    margin: 0 4px;
  }
  .error {
    color: red;
    font-family: Montserrat;
    font-size: 14px;
  }
`
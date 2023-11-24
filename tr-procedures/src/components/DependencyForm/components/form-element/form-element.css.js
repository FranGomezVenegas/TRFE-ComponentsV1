import { css } from "lit-element";

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  input {
    font-size: 18px;
    outline: none;
    border-radius: 4px;
    border: 1px solid gray;
    padding: 3px 6px;
  }

  mwc-textfield {
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    height: 40px;
    --mdc-theme-primary: #148cfa;
    --mdc-notched-outline-notch-offset: 18.75px;
  }
`;

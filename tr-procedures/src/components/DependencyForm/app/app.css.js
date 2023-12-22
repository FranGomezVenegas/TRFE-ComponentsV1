import { css } from "lit-element";

export const styles = css`
  :host {
    display: flex;
    justify-content: center;
  }

  .container {
    width: 500px;
  }

  .title {
    font-size: 24px;
    text-align: center;
    margin: 5px 0px 20px;
    color: #148cfa;
  }

  .item-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  select {
    position: relative;
    font-size: 1rem;
    outline: none;
    border-radius: 4px;
    border: 1px solid gray;
    padding: 3px 6px;
    height: 40px;
    appearance: none;
    width: 100%;
    transition: all 0.2s;
    cursor: pointer;
  }

  mwc-select {     
    --mdc-theme-primary : #148cfa;
  }

  mwc-textfield {
    font-family: Montserrat;
    font-weight: bold;
    font-size: 19px;
    --mdc-theme-primary: #148cfa;
  }

  mwc-checkbox {
    --mdc-theme-secondary: #148cfa;
  }

  .form-fields {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  mwc-switch {
    --mdc-switch-selected-handle-color: #24C0EB;
    --mdc-switch-selected-track-color: #24C0EB;
    --mdc-switch-unselected-icon-color: gray;
    --mdc-switch-selected-pressed-state-layer-color: #24C0EB;
    --mdc-theme-primary: #24C0EB;
    --mdc-ripple-hover-state-layer-color: gray;

    --mdc-switch-selected-hover-track-color: #24C0EB;
    --mdc-switch-selected-hover-handle-color: #24C0EB;

    --mdc-switch-selected-focus-track-color: #24C0EB;
    --mdc-switch-selected-focus-handle-color: #24C0EB;

    --mdc-switch-selected-pressed-track-color: #24C0EB;
    --mdc-switch-selected-pressed-handle-color: #24C0EB;
  }
`;

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

  select:hover {
    border: 1px solid black;
  }

  select:focus {
    border: 2px solid #148cfa;
  }

  .select-wrapper {
    position: relative;
  }

  .select-wrapper::after {
    content: "▼";
    font-size: 10px;
    top: 10px;
    right: 10px;
    position: absolute;
  }

  .select-wrapper:focus-within::after {
    color: #148cfa;
  }
`;

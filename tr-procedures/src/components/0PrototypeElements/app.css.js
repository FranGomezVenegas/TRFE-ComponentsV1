import { css } from "lit-element";

export const styles = css`
  :host {
    display: block;
  }

  .container {
    display: flex;
    align-items: stretch;
  }

  .container > * {
    flex: 1;
    border: 1px solid black;
    margin: 4px;
  }

  .section {
    margin: 20px 0;
  }
`
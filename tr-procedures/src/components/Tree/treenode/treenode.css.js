import { css } from "lit-element";

export const styles = css`
  :host {
    display: block;
  }

  ul {
    padding-left: 10px;
  }

  .label {
    cursor: pointer;
  }

  .label:hover {
    color: blue;
  }

  .hasChildren.opened::before {
    content: "-"
  }

  .hasChildren.closed::before {
    content: "+"
  }

  .selected {
    color: red;
  }
`
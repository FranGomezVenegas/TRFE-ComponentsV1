import { css } from "lit-element";

export const styles = css`
  :host {
    display: block;
    width: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  @media only screen and (max-width: 600px) {
    .container {
      padding: 10px;
    }
  }
`;

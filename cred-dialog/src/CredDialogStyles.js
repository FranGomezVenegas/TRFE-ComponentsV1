// CredDialogStyles.js
import { css } from 'lit';

export const credDialogStyles = css`
  :host {
    display: block;
  }
  :host([hidden]) {
    display: none;
  }
  tr-dialog {
    --mdc-dialog-heading-ink-color: blue;
    --mdc-typography-headline6-font-size: 35px;
    --mdc-dialog-z-index: 9999999;
  }
  .content {
    opacity: 0.9;
    --mdc-dialog-z-index: 9999999;
  }
  .content * {
    margin: 5px 0;
  }
  p.attemptsphraseblue {
    color: #464dbb;
  }
  p.attemptsphrasered {
    color: #f3371680;
    animation-duration: 2s;
    animation-name: slidein;
  }
  @keyframes slidein {
    from {
      margin-left: 30%;
    }
    to {
      margin-left: 0%;
    }
  }
  @media (max-width: 460px) {
  }
`;

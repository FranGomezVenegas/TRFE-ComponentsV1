// trackwise-ticket-viewer.css.js
import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    padding: 16px;
    font-family: Arial, sans-serif;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ticket-details {
    white-space: pre-wrap;
    background: #f9f9f9;
    border: 1px solid #ddd;
    padding: 16px;
  }
`;

import { css } from 'lit-element';

export const styles = css`
  table {
    width: 100%;
    border-collapse: collapse;
  }

  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

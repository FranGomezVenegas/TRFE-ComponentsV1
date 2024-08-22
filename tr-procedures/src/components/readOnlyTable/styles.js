import { css } from 'lit';

export const styles = css`
  .styledzzz-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  .styledzzz-table th,
  .styledzzz-table td {
    padding: 12px 15px;
  }

  .styledzzz-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }

  .styledzzz-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .styledzzz-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  .styledzzz-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  .styledzzz-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }
`;

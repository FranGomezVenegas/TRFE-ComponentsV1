import { css } from 'lit';

export const styles = css`
  .table-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .table {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    position: relative;
  }

  .field {
    margin: 5px 0;
    padding: 5px;
    border-radius: 4px;
  }

  .line {
    stroke: black;
    stroke-width: 2;
  }
`;

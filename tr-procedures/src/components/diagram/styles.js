import { css } from 'lit';

export const styles = css`
  .diagram-container {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .palette {
    width: 20%;
    background-color: #f0f0f0;
    border-right: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
  }

  .palette.hidden {
    display: none;
  }

  .diagram-area {
    width: 80%;
    position: relative;
  }

  .node {
    width: 50px;
    height: 50px;
    background-color: #2196f3;
    color: white;
    text-align: center;
    line-height: 50px;
    border-radius: 4px;
    cursor: pointer;
  }

  .link {
    stroke: black;
    stroke-width: 2px;
  }
`;

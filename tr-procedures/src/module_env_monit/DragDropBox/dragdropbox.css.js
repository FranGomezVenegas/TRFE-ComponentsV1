import { css } from "lit-element";

export const styles = css`
  :host([disabled]) {
  }
  * {
    box-sizing: border-box;
  }

  .box-content {
    width: fit-content;
    border-radius: 4px;
    background-color: #42BFF7;
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border: 2px solid #03A9F4;
  }

  .box {
    width: 80px;
    height: 80px;
    background-color: #42BFF7;  
    border: 2px solid #03A9F4;
    padding: 2px;
    color: white;
    cursor: pointer;
  }

  .row-num {
    color: white;
    width: 20px;
    height: 80px;
    display: flex;
    align-items: center;
  }

  .col-num {
    color: white;
    width: 80px;
    height: 20px;
    text-align: center;
  }

  .row-content {
    display: flex;
    flex-direction: row;
    gap: 2px;
  }

  .first-item {
    width: 20px;
    height: 20px;
  }

  .position {
    display: flex;
    justify-content: space-between;
  }

  .data-view {
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: break-word;
  }

  .add-circle {
    margin-top: 10px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: white;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: #03A9F4;

  }

  .accept-btn {
    background-color: #24C0EB;
    border-radius: 4px;
    padding: 8px 12px;
    color: white;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
  }

  .view-btn {
    border: 2px solid #24C0EB;
    background-color: #54CCEF;
    border-radius: 4px;
    padding: 8px 12px;  
    color: white;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
  }

  .view-btn.active {
    color: #FF5F7F;
    background-color: #8DDDF4;
  }

  .box.active {
    border-color: #FF8E00;
  }

  .selected-cell-content {
    color: #FF5F7F;
    border: 2px solid #03A9F4;
    border-radius: 8px;
    background-color: #42BFF7;
    text-align: left;
    padding: 4px 8px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    color: white;
  }
  
  th, td {
    text-align: left;
    padding: 8px;
  }
  
  th {
    background-color: #04AA6D;
    color: white;
  }

  table, td, th {
    border: 1px solid #03A9F4;
  }

`
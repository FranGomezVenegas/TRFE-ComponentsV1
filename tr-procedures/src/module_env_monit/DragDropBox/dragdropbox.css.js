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
    background-color: #ACACAC;
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border: 2px solid rgb(220,220,220);
  }

  .box {
    width: 80px;
    height: 80px;
    background-color: #ACACAC;
    border: 2px solid #757575;
    padding: 2px;
    color: white;
    cursor: pointer;
  }

  .row-num {
    width: 20px;
    height: 80px;
    display: flex;
    align-items: center;
  }

  .col-num {
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
  }

  .add-circle {
    margin-top: 10px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: #757575;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: #ACACAC;
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
    border: 2px solid #757575;
    background-color: #ACACAC;
    padding: 8px 12px;  
    color: #EBEBEB;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
  }

  .view-btn.active {
    color: red;
    background-color: rgb(220,220,220);
  }

  .box.active {
    background-color: rgb(220,220,220);
  }

  .selected-cell-content {
    color: #FF8E00;
    border: 2px solid #ACACAC;
    border-radius: 8px;
    background-color: rgb(220,220,220);
    text-align: left;
    padding: 4px 8px;

  }
`
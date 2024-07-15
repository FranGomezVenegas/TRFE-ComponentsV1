import { css } from 'lit';

export const styles = css`
  .styled-table-bygroup {
    display: -webkit-inline-box;
    margin-top: 0px;
    margin-bottom: 3px;
    color: #4285f4;
    font-size: 1.8vmin;
    border-collapse: collapse;
    margin: 2px 10px;
    font-family: Montserrat;
    box-shadow: 0 0 20px #44cbe652;
    table-layout: fixed;
  }
  .styled-table-bygroup thead tr {
    background-color: #2989d8;
    color: #ffffff;
    text-align: center;
    border: 1px solid #c2edf9;
  }
  .styled-table-bygroup th {
    color: white;
  }
  .styled-table-bygroup tbody tr:hover td {
    color: white;
    background-color: #2989d8;
  }
  .styled-table-bygroup td {
    color: rgba(0, 0, 0, 0.71);
    padding: 8px 15px;
    border: 1px solid #c2edf9;
    word-break: break-all;
    font-weight: bold;
  }
  .styled-table-bygroup tbody tr {
    border-bottom: 1px solid #c2edf9;
  }
  .styled-table-bygroup tbody tr:nth-of-type(even) {
    background-color: #c2f2ff5c;
  }
  .styled-table-bygroup tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }
  .styled-table-bygroup tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }
  span.cardLabel {
    font-weight: bold;
    font-size: 16px;
    font-family: Montserrat;
    word-break: auto-phrase;
    color: rgb(41, 137, 216);
  }
  span.cardValue {
    color: rgba(214, 233, 248, 0.37);
    font-size: 16px;
    font-family: Montserrat;
    display: inherit;
    word-break: auto-phrase;
  }
  span.title {
    color: rgb(35, 163, 198);
    margin-top: 10px;
    font-weight: bold;
  }
  span.title.true {
    font-size: 18px;
  }
  span.title.false {
    font-size: 18px;
  }
`;

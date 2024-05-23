import { css } from "lit-element";

export const styles = css`
  :host {
    display: block;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  input[type="file"] {
    position: absolute;
    z-index: -1;
    top: 15px;
    left: 20px;
    font-size: 17px;
    color: #b8b8b8;
  }

  .button-wrap {
    position: relative;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    gap:10px;
  }

  .button {
    display: inline-block;
    background-color: #007bff; 
    border: none; 
    color: #fff; 
    padding:3px;
    text-align: center;
    font-size: 16px; 
    border-radius: 4px;
    transition: background-color 0.3s; 
    cursor: pointer;
}

.button:hover {
    background-color: #0056b3; 
}
`
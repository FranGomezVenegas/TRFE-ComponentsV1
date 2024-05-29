import { css } from "lit-element";

export const styles = css`
  :host {
    display: block;
  }


  .button {
    display: inline-block;
    color: #0290ee;
    text-align: center;
    font-size: 20px;
    transition: all 0.5s;
    cursor: pointer;
  }
  
  .button:hover {
    color: #025bee;
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;    
    flex-wrap: wrap;
    background-color: #148cfa24;
    min-width: 300px;
    min-height: 200px;
    border: 2px dashed #025bee;
    border-radius: 8px;
  }

  input[type="file"] {
    display: none;
  }

  label {
    display: block;
    position: relative;
    background-color: #025bee;
    color: #ffffff;
    font-size: 0.8em
    text-align: center;
    width: 16em;
    padding: 1em 0;
    border-radius: 0.3em;
    margin: 0 auto 1em auto;
    cursor: pointer;
    transition: all 0.2s;
  }

  label:hover {
    background-color: #136cfd;
    transform: scale(1.05);
  }

  #preview {
    position: relative;
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    gap: 1.25em;
    flex-wrap: wrap;
  }
  
  #preview figure {
    width: 45%;
  }
  
  #preview img {
    width: 100%;
  }
  
  #preview figcaption {
    font-size: 0.8em;
    text-align: center;
    color: #5a5861;
  }

  .active {
    border: 2px dashed #025bee;
  }
  
  #error {
    text-align: center;
    color: #ff3030;
  }
.file-preview {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.file-preview figcaption {
  font-weight: bold;
  margin-bottom: 10px;
}

.file-preview img,
.file-preview canvas,
.file-preview pre,
.file-preview a {
  display: block;
  margin: 10px 0;
}

`
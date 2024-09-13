import { css } from 'lit';

export const styles = css`
  html, body {
    margin: 0;
    padding: 0;
    height: 90%;
    overflow: hidden;
  }

  #app-container {
    position: relative;
    top: 0px;
    left: 15px;
    /* Retain existing styles */
    display: flex;
    flex-direction: column;
    align-items: left;
     justify-content: center;
    /* width: 95vw;*/
    /* height: 100vh; */
    overflow: hidden;
  }

  div.div-json-viewer {
    display: flex;
  }
  json-viewer {
    --background-color: #2a2f3a00;
    --string-color: #24c0eb;
    --property-color: rgba(36, 75, 170, 0.9);
    --preview-color: #24c0eb;
    --font-family: Montserrat;
    --key-color: rgba(36, 75, 170, 0.9);
  }    
  .viewer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  #viewer {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    
  }
  .top-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .left-panel, .right-panel {
    flex: 1;
    padding: 10px;
  }
  .controls {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .controls input, .controls button {
    margin-bottom: 10px;
  }
  .content {
    display: flex;
    flex: 1;
    height: calc(100% - 150px);
  }
  textarea {
    width: 100%;
    height: 100%;
    font-family: monospace;
    resize: none;
  }
  .right-panel {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border: 2px solid black;
    box-sizing: border-box;
    width: 576px;
    height: 384px;
    padding: 10px;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  button {
    margin: 5px;
  }
  .right-panel-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .right-panel-container .controls {
    margin-bottom: 10px;
  }
.objects-load-section {
  margin-top: 20px; /* Ensure some space between the table and objects load section */
}

/* Make sure table and objects load section grow and shrink properly */
.top-panel > * {
  flex-grow: 1;
  flex-shrink: 1;
}

.top-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0; /* Remove bottom margin */
  padding-bottom: 0; /* Remove bottom padding */
}

.objects-load-section {
  margin-top: 10px; /* Adjust this as needed */
  padding-top: 0; /* Remove any padding */
} 
`;

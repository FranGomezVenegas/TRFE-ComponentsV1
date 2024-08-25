import { css } from 'lit';

export const EndpointsListStyles = css`
  sp-split-view {
    height: calc(100vh - 150px);
  }
  #leftSplit {
    padding: 10px;
    background-color: transparent;
    overflow: hidden;
  }
  #endpointName {
    height: 100%;
    overflow: hidden;
  }
  #leftSplit::-webkit-scrollbar,
  #rightSplit::-webkit-scrollbar,
  #endpointName::-webkit-scrollbar {}
  #rightSplit {
    background-color: transparent;
  }
  input {
    color: rgba(57, 61, 71, 0.9);
    font-family: Montserrat;
  }
  label {
    color: rgba(57, 61, 71, 0.9);
    font-family: Montserrat;
  }
  .ed {
    cursor: pointer;
    color: rgba(57, 61, 71, 0.9);
    font-family: Montserrat;
  }
  select {
    color: rgba(57, 61, 71, 0.9);
    font-family: Montserrat;
  }
  div[hidden] {
    display: none;
  }
  @media (max-width: 460px) {
    #endpointName {
      height: calc(100vh - 180px);
    }
  }
  json-viewer {
    --background-color: #2a2f3a00;
    --string-color: rgba(57, 61, 71, 0.9);
    --property-color: rgba(57, 61, 71, 0.9);
    --preview-color: #24C0EB;
    --font-family: Montserrat;
  }
`;

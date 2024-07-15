import { css } from 'lit-element';

export const graphStyles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
  }
  #diagram {
    width: 100%;
    height: 600px;
    border: 1px solid black;
  }
  .node {
    fill: #ffffff;
    stroke: #000000;
    stroke-width: 1.5px;
    cursor: pointer;
  }
  .link {
    fill: none;
    stroke: #000000;
    stroke-width: 1.5px;
  }
  .label {
    font: 12px sans-serif;
    text-anchor: middle;
  }
`;

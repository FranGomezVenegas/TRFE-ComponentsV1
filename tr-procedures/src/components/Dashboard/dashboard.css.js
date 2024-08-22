import { css } from "lit";

export const styles = css`
:host([disabled]) {
    opacity: 0.5;
    pointer: none;
  }
  .maindiv {
    width: 850px;
  }
  .btn-2 {
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.6));
  }
  .btn-2 {
    display: inline-block;
    position: relative;
    color: #fff;
    border: 15px #c0080b;
    font-weight: 500;
    font-family: "Arial";
    text-decoration: none;
    text-transform: uppercase;
    padding: 15px 50px;
    text-align: center;
    clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
    background-color: #7ed8f2;
    border: 10px;
  }
  .btn-1 {
    display: inline-block;
    position: relative;
    color: #fff;
    font-family: "Arial";
    font-weight: 500;
    text-decoration: none;
    text-transform: uppercase;
    padding: 30px 30px;
    text-align: center;
    clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
    background-color: #d9f8fa;
  }

  .start-end {
    display: inline-block;
    position: relative;
    color: #7ed8f2;
    font-family: "Arial";
    font-weight: 500;
    text-decoration: none;
    text-transform: uppercase;
    padding: 30px 30px;
    text-align: center;
    clip-path: polygon(20% 0, 82% 0, 100% 50%, 80% 100%, 40% 150%, 0 50%);
    background-color: #d9f8fa;
  }
  .block-background {
    display: inline-block;
    position: relative;
    color: #fff;
    font-family: "Arial";
    font-weight: 500;
    text-decoration: none;
    text-transform: uppercase;
    padding: 15px 35px 0px 20px;
    text-align: center;
    clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
    background-color: #d9f8fa;
  }
  .node {
    filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.6));
  }
  .node {
    display: inline-block;
    position: relative;
    color: #fff;
    border: 15px #c0080b;
    font-weight: 500;
    font-family: "Arial";
    text-decoration: none;
    text-transform: uppercase;
    padding: 0px 30px;
    text-align: center;
    clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
    background-color: #7ed8f2;
    border: 10px;
  }

  .container {
    max-width: 1024px;
  }

  text {
    cursor: pointer;
    text-transform: uppercase;
  }

  circle {
    cursor: pointer;
  }

  .container.primary circle,
  .container.primary rect {
    fill: #18a4fe;
    stroke: #18a4fea0;
  }

  .container.primary circle {
    stroke-width: 10;
  }

  .container.primary circle:hover {
    fill: #18a4fed0;
  }

  .container.primary path {
    stroke: #18a4fe;
    stroke-width: 10;
  }

  .container.primary text {
    font-size: 20px;
    font-weight: bold;
    fill: white;
    font-family: Montserrat;
    text-anchor: middle;
    alignment-baseline: middle;
  }

  .container.primary text.up-title {
    font-size: 24px;
    fill: #7b5817;
  }

  .container.primary text.lo-title {
    font-size: 24px;
    fill: blue;
  }

  .container.primary text.text-orange {
    fill: #7b5817;
  }

  .container.primary text.text-blue {
    fill: blue;
  }
`
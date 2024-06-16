import { html } from 'lit-element';

export const template = (data) => html`
  <google-chart
    type="pie"
    .data="${data}"
    .options="${{ title: 'KPI Chart' }}"
  ></google-chart>
`;

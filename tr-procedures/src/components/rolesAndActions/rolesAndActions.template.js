import { html } from 'lit-element';

export const template = (data) => html`
  <table>
    <thead>
      <tr>
        ${data[0].map(col => html`<th>${col}</th>`)}
      </tr>
    </thead>
    <tbody>
      ${data.slice(1).map(row => html`
        <tr>
          ${row.map(cell => html`<td>${cell}</td>`)}
        </tr>
      `)}
    </tbody>
  </table>
`;

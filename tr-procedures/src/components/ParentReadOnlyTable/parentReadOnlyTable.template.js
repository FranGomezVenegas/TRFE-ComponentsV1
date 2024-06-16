import { html } from 'lit-element';

export const template = (data) => html`
  <table>
    ${data.map(item => html`
      <tr>
        <td>${item.name}</td>
        <td>${item.value}</td>
      </tr>
    `)}
  </table>
`;

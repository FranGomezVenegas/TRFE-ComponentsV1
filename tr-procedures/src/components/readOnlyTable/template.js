import { html } from 'lit';

export const template = (elem, data) => html`
  <table class="styled-table">
    <thead>
      <tr>
        ${elem.columns.map(
          (col) => html`<th>${col.header}</th>`
        )}
      </tr>
    </thead>
    <tbody>
      ${data.map(
        (row) => html`
          <tr>
            ${elem.columns.map(
              (col) => html`<td>${row[col.field]}</td>`
            )}
          </tr>
        `
      )}
    </tbody>
  </table>
`;

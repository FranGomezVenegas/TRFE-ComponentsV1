import { html } from 'lit';

export const template = (elem, data) => {
  // Asegúrate de que data es un arreglo antes de mapearlo
  if (!Array.isArray(data)) {
    console.error("Data is not an array", data);
    return html`<p>No data available</p>`;
  }

  return html`
    <table class="parent-read-only-table">
      <thead>
        <tr>
          ${elem.columns.map(col => html`<th>${col.header}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${data.map(row => html`
          <tr>
            ${elem.columns.map(col => html`<td>${row[col.field]}</td>`)}
          </tr>
        `)}
      </tbody>
    </table>
  `;
};

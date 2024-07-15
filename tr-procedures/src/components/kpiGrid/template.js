import { html } from 'lit';

export const template = (elem, data, lang) => html`
  ${!data[elem.elementName] || !elem.fieldsToDisplay
    ? html`<p>No data available</p>`
    : html`
        <lit-datatable
          .data="${data[elem.elementName]}"
          .conf="${elem.fieldsToDisplay.map(field => ({
            ...field,
            header: field["label_" + lang]
          }))}"
        ></lit-datatable>
      `}
`;

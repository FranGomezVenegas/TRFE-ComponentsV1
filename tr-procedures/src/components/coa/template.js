import { html } from 'lit';

export const template = (elem, data) => html`
  <div class="coa-container">
    ${data.map(
      (item) => html`
        <div class="coa-item">
          <span class="coa-label">${item.label}</span>
          <span class="coa-value">${item.value}</span>
        </div>
      `
    )}
  </div>
`;

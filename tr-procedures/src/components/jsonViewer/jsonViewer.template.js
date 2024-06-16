import { html } from 'lit-element';

export const template = (data) => html`
  <pre>${JSON.stringify(data, null, 2)}</pre>
`;

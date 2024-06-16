import { html } from 'lit';

export const template = (diffString) => html`
  <div class="diff-container" .innerHTML=${diffString}></div>
`;

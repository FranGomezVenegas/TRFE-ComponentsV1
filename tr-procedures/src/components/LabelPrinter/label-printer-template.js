// template.js
import { html } from 'lit';
import { styles } from './label-printer-styles.js';

export const template = (context) => html`
  <style>
    ${styles}
  </style>
  <div class="container">
    <h3>${context.printerName}</h3>
    <textarea rows="10" .value=${context.data}></textarea>
    <button @click=${context.manualPrint.bind(context)}>Print Manually</button>
  </div>
`;

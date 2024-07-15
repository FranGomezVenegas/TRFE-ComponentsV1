import { html } from 'lit';

export const template = (elem, data) => html`
  <p>
    <span style="color: rgb(20, 115, 230); font-size: 30px; margin-top: 10px; font-weight: bold;">
      ${elem.title["label_" + data.lang]}
    </span>
  </p>
`;

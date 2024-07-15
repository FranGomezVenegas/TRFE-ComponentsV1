import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export const template = (elem, lang) => html`
  <p>
    <span>
      ${elem.title.text_en !== undefined
        ? unsafeHTML(elem.title.text_en)
        : elem.title["label_" + lang]}
    </span>
  </p>
`;

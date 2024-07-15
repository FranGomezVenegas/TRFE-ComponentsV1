import { html } from 'lit';

export const template = (elem, data, lang) => html`
  <div style="position: relative;">
    ${elem === undefined || elem.title === undefined
      ? html``
      : html`
          <span
            style="color: rgb(20, 115, 230); font-size: 30px; margin-top: 10px; font-weight: bold;"
          >
            ${elem.title["label_" + lang]}
          </span>
        `}
    ${elem === undefined || data === undefined
      ? html``
      : html`
          <json-viewer
            style=${elem.style !== undefined
              ? elem.style
              : 'padding: 0px; padding-left: 20px; top: -15px;'}
          >
            ${JSON.stringify(data)}
          </json-viewer>
        `}
  </div>
`;

import { html } from 'lit';

export const template = (elem, dataArr, lang, isSecondLevel) => html`
  <div style="display: flex; flex-direction: column; text-align: center;">
    ${elem === undefined || elem.title === undefined
      ? html``
      : html`
          <p>
            <span class="title ${isSecondLevel}">
              ${elem.title["label_" + lang]}
            </span>
          </p>
        `}
    <div style="display: flex; flex-direction: row; text-align: center; flex-wrap: wrap;">
      ${Object.entries(dataArr)
        .sort()
        .map(
          ([key, value]) => html`
            <table class="styled-table-bygroup">
              <thead>
                <tr>
                  <th colspan="${elem.columns.length}">
                    ${key}
                  </th>
                </tr>
                <tr class="headercolumns">
                  ${elem.columns.map(
                    (fld) => html`
                      <td>${fld["label_" + lang]}</td>
                    `
                  )}
                </tr>
              </thead>
              <tbody>
                ${value.map(
                  (p) => html`
                    <tr>
                      ${elem.columns.map(
                        (fld) => html`
                          <td>${p[fld.name]}</td>
                        `
                      )}
                    </tr>
                  `
                )}
              </tbody>
            </table>
          `
        )}
    </div>
  </div>
`;

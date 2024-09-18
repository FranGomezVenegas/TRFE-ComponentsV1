import { html, nothing } from 'lit';

export const template = (thisComponent, elem, dataArr, customTheme, isSecondLevel, lang) => html`
        <div style="display: flex; flex-direction: column; text-align: center;">
          ${elem === undefined || elem.title === undefined
          ? nothing
          : html` <p>
                <span class="title ${isSecondLevel}"
                  >${elem.title["label_" + lang]}</span
                >
              </p>`}
       
          <table class="styled-table-for-rolesandactions ${customTheme}" style="margin-top:0px;">
            <thead>
              <tr>
                ${dataArr === undefined || dataArr[0] === undefined
          ? html`${lang == "en" ? "Not applicable" : "No aplica"}`
          : html`
                      ${dataArr[0].map(
            (fld) =>
              html`
                            ${typeof fld === "object"
                  ? html`${thisComponent.fieldsToDiscard(fld) === true
                    ? nothing
                    : html`<th
                                      style="text-align: center; color:white; font-weight:normal;"
                                    >
                                      ${fld.label}
                                    </th>`} `
                  : html`
                                  <th style="text-align: center; color:white; font-weight:normal;">
                                    ${fld}
                                  </th>
                                `}
                          `
          )}
                    `}
              </tr>
            </thead>
            <tbody>
              ${dataArr === undefined || dataArr[0] === undefined
          ? nothing
          : html`
                    ${dataArr.map(
            (p, iRow) =>
              html`
                          ${iRow == 0
                  ? nothing
                  : html`
                                <tr>
                                  ${p.map(
                    (fld, iCol) =>
                      html`
                                        ${iCol == 0 || iCol == 1
                          ? html` ${typeof dataArr[0][iCol] ===
                            "object"
                            ? html`
                                                  ${thisComponent.fieldsToDiscard(
                              dataArr[0][iCol]
                            ) === true
                                ? nothing
                                : html`<td
                                                        class="title1"
                                                        style="font-size: 1.6vmin; font-weight: unset; font-family: Montserrat;"
                                                      >
                                                        ${fld}
                                                      </td>`}
                                                `
                            : html`<td>${fld}</td>`}`
                          : html`
                                              ${fld !== undefined &&
                              fld.length > 0
                              ? html`<td
                                                    class="present"
                                                    title="Assigned"
                                                  >
                                                    ${fld === "ALL"
                                  ? lang === "es"
                                    ? "TODOS"
                                    : "ALL"
                                  : fld}
                                                  </td>`
                              : html`<td
                                                    class="absent"
                                                    title="NOT assigned"
                                                  ></td>`}
                                            `}
                                      `
                  )}
                                </tr>
                              `}
                        `
          )}
                  `}
            </tbody>
          </table>
        </div>
`;

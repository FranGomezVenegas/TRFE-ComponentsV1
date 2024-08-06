import { html, nothing } from 'lit';

// Helper function to render table headers
const renderTableHeaders = (columns, lang, fieldsToDiscard) => {
  if (!columns) return nothing;
  return html`
    <tr class="headercolumns">
      ${columns.map(
        (fld) => fieldsToDiscard(fld)
          ? nothing
          : html`<td style="background-color:#7ccee6; color: white; font-weight: bold;">
              ${fld["label_" + lang]}
            </td>`
      )}
    </tr>
  `;
};

// Helper function to render table rows
const renderTableRows = (columns, data, lang, fieldsToDiscard, titleLang) => {
  if (!data) return nothing;
  return data.map((p) => html`
    <tr>
      ${columns.map((fld) => fieldsToDiscard(fld) ? nothing : renderTableCell(fld, p, lang, titleLang))}
    </tr>
  `);
};

// Helper function to render individual table cells
const renderTableCell = (fld, p, lang, titleLang) => {
  const value = p[fld.name];
  if (fld.name === "pretty_spec") {
    return html`
      <td>
        <span style="color:green">${p["spec_text_green_area_" + lang]}</span>
        <span style="color:orange">${p["spec_text_yellow_area_" + lang]}</span>
        <span style="color:red">${p["spec_text_red_area_" + lang]}</span>
      </td>
    `;
  } else if (fld.as_progress) {
    return html`
      <style>
        .w3-container, .w3-panel { padding: 0.01em 4px; }
        .w3-panel { margin-top: 16px; margin-bottom: 16px; }
        .w3-container:after, .w3-container:before, .w3-panel:after, .w3-panel:before,
        .w3-row:after, .w3-row:before, .w3-row-padding:after, .w3-row-padding:before,
        .w3-blue, .w3-hover-blue:hover { color: rgba(7, 13, 22, 0.94) !important; background-color: #2196f3 !important; }
        .w3-background, .w3-hover-blue:hover { color: rgba(7, 13, 22, 0.94) !important; background-color: #ffdedd !important; }
        .title { font-size: 8px; font-weight: 500; letter-spacing: 0; line-height: 1.5em; padding-bottom: 15px; position: relative; font-family: Montserrat; font-color: rgb(94, 145, 186); }
      </style>
      <td>
        <div class="w3-container">
          <div class="w3-background w3-round-xlarge" title="${titleLang(fld)}">
            <div class="w3-container w3-blue w3-round-xlarge" style="width:${value}%">
              ${fld.name}: ${value}%
            </div>
          </div>
        </div>
        <br />
      </td>
    `;
  } else if (typeof value === 'object') {
    return html`
      <td>${JSON.stringify(value)}</td>
    `;
  } else {
    return html`
      <td>
        ${fld.fix_value_prefix || ''}${value}${fld.fix_value_suffix || ''}
        ${fld.fix_value2_prefix || ''}${fld.name2 ? p[fld.name2] : ''}${fld.fix_value2_suffix || ''}
        ${fld.fix_value3_prefix || ''}${fld.name3 ? p[fld.name3] : ''}${fld.fix_value3_suffix || ''}
      </td>
    `;
  }
};

// Helper function to render the table
const renderTable = (key, value, elem, lang, fieldsToDiscard, titleLang) => {
  if (!value) return nothing;
  return html`
    <table class="styled-table-bygroup">
      <thead>
        <tr>
          <th style="color:#24c0eb; background-color: #d6e9f8; text-transform:uppercase; font-size:16px;" colspan="${elem.columns.length}">
            ${key}
          </th>
        </tr>
        ${renderTableHeaders(elem.columns, lang, fieldsToDiscard)}
      </thead>
      <tbody>
        ${value === undefined || !Array.isArray(value)
          ? html`<tr><td colspan="${elem.columns.length}">No Data</td></tr>`
          : renderTableRows(elem.columns, value, lang, fieldsToDiscard, titleLang)}
      </tbody>
    </table>
  `;
};

export const template = (component) => {
  const { elem, dataArr, isSecondLevel, lang } = component;

  return html`
    <div style="display: flex; flex-direction: column; text-align: center;">
      ${elem && elem.title ? html`
        <p>
          <span class="title ${isSecondLevel}">
            ${elem.title["label_" + lang]}
          </span>
        </p>
      ` : nothing}

      <div style="display: flex; flex-direction: row; text-align: center; flex-wrap: wrap;">
        <div class="layout horizontal center flex wrap">
          ${component.getButton(elem, dataArr, true)}
        </div>
        ${elem.columns && dataArr !== undefined ? html`
          ${Object.entries(dataArr).sort().map(
            ([key, value]) => renderTable(key, value, elem, lang, component.fieldsToDiscard.bind(component), component.titleLang.bind(component))
          )}
        ` : html`<p>No columns defined or no data</p>`}
      </div>
    </div>
  `;
};

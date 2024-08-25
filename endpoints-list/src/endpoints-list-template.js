import { html } from 'lit';

export const EndpointsListTemplate = (context) => {
  return html`
    ${context.desktop
      ? html`
      adsaadas
          <sp-split-view resizable splitter-pos="300">
            <div id="leftSplit">
              <select @change=${context.apiChanged}>
                <option value="">-- Filter by API Name --</option>
                ${context.apis.map(
                  (a) =>
                    html`<option value=${a.api_name}>
                      ${a.api_url !== undefined && a.api_url.length > 0
                        ? a.api_url
                        : a.api_name}
                    </option>`
                )}
              </select>
              <br />
              <label> Last Update</label>
              <input
                id="lastDate"
                type="datetime-local"
                @change=${context.dateChanged}
              />
              <hr />
              <label>${context.filterDocs.length} of ${context.docs.length}</label>
              <div id="endpointName">
                ${context.filterDocs.map(
                  (d) =>
                    html`
                      <p
                        class="ed"
                        id="${d.id}"
                        @click=${(e) => context.endpointSelect(e, d)}
                      >
                        ${d.endpoint_name}
                      </p>
                    `
                )}
              </div>
            </div>
            <div id="rightSplit">
              ${context.selectedApis.map(
                (s) => html`<json-viewer>${JSON.stringify(s)}</json-viewer>`
              )}
            </div>
          </sp-split-view>
        `
      : html`
          <div id="mobile">
            <div id="leftSplit">
              <select @change=${context.apiChanged}>
                <option value="">-- Filter by API Name --</option>
                ${context.apis.map(
                  (a) =>
                    html`<option value=${a.api_name}>
                      ${a.api_url !== undefined && a.api_url.length > 0
                        ? a.api_url
                        : a.api_name}
                    </option>`
                )}
              </select>
              <br />
              Last Update
              <input
                id="lastDate"
                type="datetime-local"
                @change=${context.dateChanged}
              />
              <hr />
              <label>${context.filterDocs.length} of ${context.docs.length}</label>
              <div id="endpointName">
                ${context.filterDocs.map(
                  (d) =>
                    html`
                      <p
                        class="ed"
                        id="${d.id}"
                        @click=${() =>
                          context.shadowRoot.querySelector(
                            "#detail" + d.id
                          ).hidden = !context.shadowRoot.querySelector(
                            "#detail" + d.id
                          ).hidden}
                      >
                        ${d.endpoint_name}
                      </p>
                      <div id="detail${d.id}" hidden>
                        <json-viewer>${context.endpointDetail(d)}</json-viewer>
                      </div>
                    `
                )}
              </div>
            </div>
          </div>
        `}
  `;
};

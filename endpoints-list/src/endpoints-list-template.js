import { html, css } from 'lit';

export const EndpointsListTemplate = (context) => {
  //alert(context.config.theme)
  return html`
    ${context.desktop
      ? html`
          <div class="split-container">
            <div id="leftSplit" class="resizable">
              <md-outlined-icon-button style="color: #148cfa;" icon="refresh" id="refresh" title="Refresh" 
                @click=${() => context.firstUpdated()}>d</md-outlined-icon-button>
              <select @click=${context.moduleClicked} multiple>
                <option class="labelModule" value="">-- Filter by Module --</option>
                ${context.modules.map(
                  (m) => html`<option value=${m} ?selected=${m === context.currentModule}>${m}</option>`
                )}
              </select>
              <br />
              <select @click=${context.apiClicked} multiple>
                <option class="labelApi" value="">-- Filter by API Name --</option>
                ${context.filteredApis.map(
                  (a) => html`<option value=${a} ?selected=${a === context.currentApi}>${a}</option>`
                )}
              </select>
              <br />
              <input style="height: 30px; width: 300px; background-color: #1473e614; font-size:16px;" type="text"
                @input=${context.searchEndpoints} placeholder="Search in Endpoints..."
              />
              <br />
            </div>
            <div class="divider"></div>
            <div id="rightSplit" class="resizable">
              ${context.selectedApis.map(
                (s) => html`<json-viewer>${JSON.stringify(s)}</json-viewer>`
              )}
            </div>
          </div>
        `
      : html`
          <div id="mobile">
            <div id="leftSplit">
              <div style="display:flex; height: 200px; gap: 10px">
                <md-filled-icon-button style="color: #148cfa;" icon="refresh" id="refresh"
                  title="" @click=${() => context.firstUpdated(undefined)}><md-icon>refresh</md-icon></md-filled-icon-button>                
                <select @click=${context.moduleClicked} multiple>
                  <option class="labelModule" value="">-- Filter by Module --</option>
                  ${context.modules.map(
                    (m) => html`<option value=${m} ?selected=${m === context.currentModule}>${m}</option>`
                  )}
                </select>
                <br />
                  <select @click=${context.apiClicked} multiple>
                    <option class="labelApi" value="">-- Filter by API Name --</option>
                    ${context.filteredApis.map(
                      (a) => html`<option value=${a} ?selected=${a === context.currentApi}>${a}</option>`
                    )}
                  </select>
                <br />
                <input style="height: 30px; width: 300px; background-color: #1473e614; font-size:16px;" type="text" 
                  @input=${context.searchEndpoints} placeholder="Search in Endpoints..."
                />
                <br />
              </div>
              <hr />
              <div style="display:flex;">
                <label style="margin:5px; padding-right:20px;">${context.filterDocs.length} of ${context.docs.length}</label>
                <button @click=${context.toggleAllEndpoints}>
                  ${context.areAllEndpointsVisible ? 'Collapse All' : 'Expand All'}
                </button>
              </div>
              <div id="endpointName">
                ${context.filterDocs.map(
                  (d, index) =>
                    html`
                      <p
                        class="ed"
                        id="${d.id}"
                      >
                        <span @click=${() => context.toggleEndpointDetails(index)}>
                          ${context.isEndpointVisible(index) ? '▼' : '▶'} 
                        </span>
                        <span class="labelModule">${d.module_pretty_name}</span> -- 
                        <span class="labelApi">${d.api_name}</span> -- 
                        <span class="labelEndpoint">${d.endpoint_name}</span> 
                        
                      </p>
                      ${context.isEndpointVisible(index)
                        ? html`<div class="endpoint-details"><json-viewer>${context.endpointDetail(d)}</json-viewer></div>`
                        : ''}
                    `
                )}
              </div>
            </div>
          </div>
        `}
  `;
};

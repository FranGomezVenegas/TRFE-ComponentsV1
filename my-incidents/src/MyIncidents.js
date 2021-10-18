import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import '@material/mwc-dialog';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@spectrum-web-components/button/sp-button';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import './history-item';

export class MyIncidents extends CommonCore {
  static get styles() {
    return css`
    `;
  }

  static get properties() {
    return {
      selectedItem: { type: Object },
      histories: { type: Array }
    };
  }

  constructor() {
    super();
    this.histories = [];
  }

  authorized() {
    this.getOpenIncidents()
  }

  render() {
    return html`
    <vaadin-grid @active-item-changed=${this.selectItem} theme="row-dividers" column-reordering-allowed multi-sort>
      <vaadin-grid-selection-column auto-select frozen></vaadin-grid-selection-column>
      <vaadin-grid-sort-column path="id" header="Id"></vaadin-grid-sort-column>
      <vaadin-grid-filter-column path="date_last_update"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column path="date_creation"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column path="item_title"></vaadin-grid-filter-column>
      <vaadin-grid-filter-column path="item_detail"></vaadin-grid-filter-column>
    </vaadin-grid>
    <div ?hidden=${this.hideList}>
      ${this.histories.map(h=>
        html`<history-item .history=${h}></history-item>`
      )}
    </div>
    `;
  }

  get grid() {
    return this.shadowRoot.querySelector("vaadin-grid")
  }

  getOpenIncidents() {
    return this.fetchApi(this.config.backendUrl + this.config.frontEndIncidentsUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      actionName: 'USER_OPEN_INCIDENTS'
    })).then(j => {
      console.log(j)
      this.grid.items = j
    })
  }

  /**
   * Once an incident item selected
   * @param {*} e the grid
   */
  selectItem(e) {
    // deselect old selected item if found
    if (this.selectedItem) {
      e.target.deselectItem(this.selectedItem)
    }
    if (e.detail.value) {
      this.selectedItem = e.detail.value
      return this.fetchApi(this.config.backendUrl + this.config.frontEndIncidentsUrl + '?' + new URLSearchParams({
        dbName: this.config.dbName,
        finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
        actionName: 'INCIDENT_DETAIL_FOR_GIVEN_INCIDENT',
        incidentId: this.selectedItem.id
      })).then(j => {
        console.log(j)
        this.histories = j
      })
    }
  }
}

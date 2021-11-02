import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-icon-button';
import '@material/mwc-textarea';
import '@material/mwc-textfield';
import '@spectrum-web-components/icon/sp-icon.js';
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
    return [
      Layouts, 
      css`
        mwc-button {
          --mdc-typography-button-text-transform: none;
          margin: 0 2px;
        }
        mwc-dialog * {
          margin-bottom: 5px;
        }
        mwc-textfield[hidden] {
          display: none;
        }
        mwc-button[hidden] {
          display: none;
        }
      `
    ];
  }

  static get properties() {
    return {
      selectedItem: { type: Object },
      histories: { type: Array },
      dialogType: { type: String },
      fieldErrMsg: { type: Object }
    };
  }

  constructor() {
    super();
    this.histories = [];
    this.dialogType = "";
    this.fieldErrMsg = {
      title: "Title is required",
      id: "Id is required",
      detail: "Detail is required"
    };
  }

  authorized() {
    this.getOpenIncidents()
  }

  render() {
    return html`
    <div class="layout horizontal center flex wrap">
      <mwc-icon-button icon="refresh" @click=${this.getOpenIncidents}></mwc-icon-button>
      <mwc-icon-button title="New" icon="add" @click=${()=>this.openDialog("create")}></mwc-icon-button>
      <mwc-icon-button title="Confirm" icon="check" ?disabled=${!this.selectedItem} @click=${()=>this.openDialog("confirm")}></mwc-icon-button>
      <mwc-icon-button title="Add Note" icon="note_add" ?disabled=${!this.selectedItem} @click=${()=>this.openDialog("note")}></mwc-icon-button>
      <mwc-icon-button title="Close" icon="close" ?disabled=${!this.selectedItem} @click=${()=>this.openDialog("close")}></mwc-icon-button>
      <mwc-icon-button title="Reopen" icon="lock_open" @click=${()=>this.openDialog("reopen")}></mwc-icon-button>
    </div>
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
    <mwc-dialog id="icdDialog" @opened=${this.dialogOpened}
      heading=""
      scrimClickAction=""
      escapeKeyAction="">
      <div class="layout vertical flex center-justified">
        <mwc-button dense slot="secondaryAction" dialogAction="close">Close</mwc-button>
        <mwc-textfield id="title" label="Title" ?hidden=${this.dialogType!="create"} .validationMessage=${this.fieldErrMsg.title} required></mwc-textfield>
        <mwc-textfield id="icdId" label="Incident ID" ?hidden=${this.dialogType!="reopen"} .validationMessage=${this.fieldErrMsg.id} required></mwc-textfield>
        <mwc-textarea id="detail" label="Detail" rows=10 cols=100 .validationMessage=${this.fieldErrMsg.detail} required></mwc-textarea>
        <mwc-button raised dense @click=${this.createIncident} ?hidden=${this.dialogType!="create"}>Create</mwc-button>
        <mwc-button raised dense @click=${this.confirmIncident} ?hidden=${this.dialogType!="confirm"}>Confirm</mwc-button>
        <mwc-button raised dense @click=${this.addNote} ?hidden=${this.dialogType!="note"}>Accept</mwc-button>
        <mwc-button raised dense @click=${this.closeIncident} ?hidden=${this.dialogType!="close"}>Accept</mwc-button>
        <mwc-button raised dense @click=${this.reopenIncident} ?hidden=${this.dialogType!="reopen"}>Accept</mwc-button>
      </div>
    </mwc-dialog>
    `;
  }

  get grid() {
    return this.shadowRoot.querySelector("vaadin-grid")
  }

  get icdDialog() {
    return this.shadowRoot.querySelector("mwc-dialog#icdDialog")
  }

  get icdDialogSurface() {
    return this.icdDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  get icdTitle() {
    return this.shadowRoot.querySelector("#title")
  }

  get icdId() {
    return this.shadowRoot.querySelector("#icdId")
  }

  get icdDetail() {
    return this.shadowRoot.querySelector("#detail")
  }

  getOpenIncidents() {
    this.histories = []
    this.fetchApi(this.config.backendUrl + this.config.frontEndIncidentsUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      actionName: 'USER_OPEN_INCIDENTS'
    })).then(j => {
      if (j) {
        this.grid.items = j
      }
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
      this.fetchApi(this.config.backendUrl + this.config.frontEndIncidentsUrl + '?' + new URLSearchParams({
        dbName: this.config.dbName,
        finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
        actionName: 'INCIDENT_DETAIL_FOR_GIVEN_INCIDENT',
        incidentId: this.selectedItem.id
      })).then(j => {
        if (j) {
          this.histories = j
        }
      })
    }
  }

  incidentAPI(params) {
    this.fetchApi(this.config.backendUrl + this.config.ApiIncidentsUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      ...params
    })).then(j => {
      if (j) {
        this.icdTitle.value = ""
        this.icdId.value = ""
        this.icdDetail.value = ""
        this.icdDialog.close()
        this.getOpenIncidents()
      }
    })
  }

  createIncident() {
    if (!this.icdTitle.validity.valid) {
      return this.icdTitle.focus()
    }
    if (!this.icdDetail.validity.valid) {
      return this.icdDetail.focus()
    }
    this.incidentAPI({
      actionName: 'NEW_INCIDENT',
      incidentTitle: this.icdTitle.value,
      incidentDetail: this.icdDetail.value
    })
  }

  confirmIncident() {
    if (!this.icdDetail.validity.valid) {
      return this.icdDetail.focus()
    }
    this.incidentAPI({
      actionName: 'CONFIRM_INCIDENT',
      incidentId: this.selectedItem.id,
      note: this.icdDetail.value
    })
  }

  addNote() {
    if (!this.icdDetail.validity.valid) {
      return this.icdDetail.focus()
    }
    this.incidentAPI({
      actionName: 'ADD_NOTE_INCIDENT',
      incidentId: this.selectedItem.id,
      note: this.icdDetail.value
    })
  }

  closeIncident() {
    if (!this.icdDetail.validity.valid) {
      return this.icdDetail.focus()
    }
    this.incidentAPI({
      actionName: 'CLOSE_INCIDENT',
      incidentId: this.selectedItem.id,
      note: this.icdDetail.value
    })
  }

  reopenIncident() {
    if (!this.icdId.validity.valid) {
      return this.icdId.focus()
    }
    if (!this.icdDetail.validity.valid) {
      return this.icdDetail.focus()
    }
    this.incidentAPI({
      actionName: 'REOPEN_INCIDENT',
      incidentId: this.icdId.value,
      note: this.icdDetail.value
    })
  }

  openDialog(type) {
    this.dialogType = type
    this.icdDialog.show()
  }

  dialogOpened() {
    if (this.dialogType == "create") {
      this.icdTitle.focus()
    } else if (this.dialogType == "reopen") {
      this.icdId.focus()
    } else {
      this.icdDetail.focus()
    }
  }
}

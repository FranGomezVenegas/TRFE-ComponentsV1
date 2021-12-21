import { html, css } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
import { ProceduresModel } from './ProceduresModel';
import { ClientMethod } from './ClientMethod';
import { DialogTemplate } from './DialogTemplate';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@trazit/tr-dialog/tr-dialog';
import './audit-dialog';

export class TrProcedures extends ClientMethod(DialogTemplate(CredDialog)) {
  static get styles() {
    return [
      Layouts,
      super.styles,
      css`
        mwc-button {
          --mdc-typography-button-text-transform: none;
          margin: 0 2px;
        }
        tr-dialog * {
          margin-bottom: 5px;
        }
        mwc-textfield[hidden] {
          display: none;
        }
        mwc-button[hidden] {
          display: none;
        }
        mwc-icon-button#prev {
          -webkit-transform:rotateY(180deg);
          -moz-transform:rotateY(180deg);
          -o-transform:rotateY(180deg);
          -ms-transform:rotateY(180deg);
        }
        div.input * {
          margin: 10px 0 5px;
        }
        mwc-icon-button[hidden] {
          display: none;
        }
      `
    ];
  }

  static get properties() {
    return {
      procName: { type: String },
      sampleName: { type: String },
      filterName: { type: String },
      langConfig: { type: Object },
      actions: { type: Array },
      samplesReload: { type: Boolean },
      selectedSamples: { type: Array },
      selectedAction: { type: Object }
    };
  }

  constructor() {
    super()
    this.procName = "em-demo-a"
    this.sampleName = "SamplePendingSampling"
    this.filterName = "samples"
    this.selectedSamples = []
    this.langConfig = ProceduresModel[this.procName][this.sampleName].langConfig
    this.actions = ProceduresModel[this.procName][this.sampleName].actions
    this.selectedAction = ProceduresModel[this.procName][this.sampleName].actions[0]
  }

  render() {
    return html`
    ${this.getTitle()}
    <div class="layout horizontal center flex wrap">
      ${this.getButton()}
    </div>
    <vaadin-grid id="mainGrid" theme="row-dividers" column-reordering-allowed multi-sort 
      @active-item-changed=${e=>this.selectedSamples=e.detail.value ? [e.detail.value] : []}
      .selectedItems="${this.selectedSamples}">
      ${this.gridList()}
    </vaadin-grid>
    <audit-dialog @sign-audit=${this.signAudit}></audit-dialog>
    ${this.dateTemplate()}
    ${this.commentTemplate()}
    ${super.render()}
    `;
  }

  get audit() {
    return this.shadowRoot.querySelector("audit-dialog")
  }

  get grid() {
    return this.shadowRoot.querySelector("vaadin-grid#mainGrid")
  }

  authorized() {
    super.authorized()
    // whether user has access into the selected proc
    let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
    this.audit.updateComplete.then(() => {
      let whichProc = procList.filter(p => p.procInstanceName == this.procName)
      if (whichProc.length) {
        this.audit.sampleAuditRevisionMode = whichProc[0].audit_sign_mode.sampleAuditRevisionMode == "DISABLE" ? false : true
        this.audit.sampleAuditChildRevisionRequired = whichProc[0].audit_sign_mode.sampleAuditChildRevisionRequired == "FALSE" ? false : true
      }
    })
    let anyAccess = procList.filter(p => p.procInstanceName == this.procName)
    if (anyAccess.length) {
      this.actionMethod(this.selectedAction)
    }
  }

  reload() {
    this.selectedAction = ProceduresModel[this.procName][this.sampleName].actions[0]
    this.actionMethod(this.selectedAction)
  }

  actionMethod(action) {
    this.selectedAction = action
    if (action.dialogInfo) {
      if (action.dialogInfo.automatic) {
        this.credsChecker(action.actionName, this.selectedSamples[0].sample_id)
      } else {
        this[action.dialogInfo.name].show()
      }
    } else {
      if (this.selectedSamples.length) {
        console.log(this.selectedSamples[0].sample_id, " SSS")
        this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam())
      } else {
        this.credsChecker(action.actionName, null, this.jsonParam())
      }
    }
  }

  getButton() {
    return html`
      ${this.actions.map(action =>
        html`${action.button.icon ?
          html`<mwc-icon-button 
            icon="${action.button.icon}" 
            title="${action.button.title['label_'+this.lang]}" 
            ?disabled=${action.button.whenDisabled == "samplesReload" ? this.samplesReload : !this.selectedSamples.length}
            @click=${()=>this.actionMethod(action)}></mwc-icon-button>` :
          html`<mwc-button raised label="${action.button.title['label_'+this.lang]}"></mwc-button>`
        }`
      )}
    `
  }

  nextRequest() {
    super.nextRequest()
    this.reqParams = {
      procInstanceName: this.procName,
      ...this.reqParams
    }
    this[this.selectedAction.clientMethod]()
  }

  dialogAccept() {
    this.credsChecker(this.selectedAction.actionName, this.selectedSamples[0].sample_id, this.jsonParam())
  }

  jsonParam() {
    let jsonParam = {}
    if (this.selectedAction.apiParams) {
      this.selectedAction.apiParams.forEach(p => {
        if (p.element) {
          jsonParam[p.query] = this[p.element].value // get value from field input
        } else {
          jsonParam[p.query] = p.value
        }
      })
    }
    if (this.selectedAction.paramFilter) {
      jsonParam[this.selectedAction.paramFilter[this.filterName].query] = this.selectedAction.paramFilter[this.filterName].value
    }
    return jsonParam
  }

  setGrid(j) {
    this.grid.items = j
  }

  gridList() {
    return Object.entries(this.langConfig.gridHeader).map(
      ([key, value], i) => html`
        ${this.langConfig.gridHeader[key].is_icon ?
          this.iconColumn(key, value, i) :
          this.nonIconColumn(key, value, i)
        }
      `
    )
  }

  iconColumn(key, value, i) {
    return html`${i==0 ?
      html`
      <vaadin-grid-column
        header="${value['label_'+this.lang]}"
        ${columnBodyRenderer(this.iconRenderer)}
        text-align="center"
        flex-grow="0"
      ></vaadin-grid-column>
      ` :
      html`
      <vaadin-grid-column
        header="${value['label_'+this.lang]}"
        ${columnBodyRenderer(this.iconRenderer)}
        text-align="center"
        auto-width
      ></vaadin-grid-column>
      `
    }`
  }

  iconRenderer(sample) {
    if (this.filterName) {
      return html`<img src="/images/${this.filterName}_${sample.status.toLowerCase()}.png" style="width:20px">`
    }
  }

  nonIconColumn(key, value, i) {
    return html`${this.langConfig.gridHeader[key].sort ?
      this.sortColumn(key, value, i) :
      this.filterColumn(key, value, i)
    }`
  }

  sortColumn(key, value, i) {
    return html`${i==0 ?
      html`<vaadin-grid-sort-column flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`:
      html`<vaadin-grid-sort-column resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-sort-column>`
    }`
  }

  filterColumn(key, value, i) {
    return html`${i==0 ?
      html`<vaadin-grid-filter-column flex-grow="0" text-align="end" path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`:
      html`<vaadin-grid-filter-column resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-filter-column>`
    }`
  }

  getTitle() {
    if (this.langConfig.title[this.filterName]) {
      return html`<h1>${this.langConfig.title[this.filterName]["label_"+this.lang]}</h1>`
    }
  }
}

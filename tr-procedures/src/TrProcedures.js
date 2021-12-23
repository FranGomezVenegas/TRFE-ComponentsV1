import { html, css, nothing } from 'lit';
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
import './composition-template';

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
        #resultDialog {
          --mdc-dialog-min-width: 800px;
        }
        #batchDetail {
          width: 200px;
          margin: 0 20px;
          padding-top: 20px;
        }
        #batchDetail h1 {
          color: blue;
        }
        #samplesArr {
          border-radius: 2px;
          box-shadow: rgb(136, 136, 136) 2px 2px;
          padding: 5px;
          background: #c2f2ff;
        }
        #samplesArr div {
          margin: 5px 0;
        }
        #assignDialog {
          --mdc-dialog-min-width: 500px;
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
      compositions: { type: Array },
      samplesReload: { type: Boolean },
      selectedSamples: { type: Array },
      selectedAction: { type: Object }
    };
  }

  resetView() {
    this.enterResults = []
    this.assignList = []
    this.selectedSamples = []
    this.langConfig = ProceduresModel[this.procName][this.sampleName].langConfig
    this.actions = ProceduresModel[this.procName][this.sampleName].actions
    this.compositions = ProceduresModel[this.procName][this.sampleName].compositions
    this.selectedAction = ProceduresModel[this.procName][this.sampleName].actions[0]
  }

  render() {
    return html`
      <div class="layout horizontal flex wrap">
        <div class="layout flex">
          ${this.getTitle()}
          <div class="layout horizontal center flex wrap">
            ${this.getButton()}
          </div>
          <vaadin-grid id="mainGrid" theme="row-dividers" column-reordering-allowed multi-sort 
            @active-item-changed=${e=>this.selectedSamples=e.detail.value ? [e.detail.value] : []}
            .selectedItems="${this.selectedSamples}">
            ${this.gridList()}
          </vaadin-grid>
        </div>
        ${this.langConfig&&this.sampleName=="SampleIncubation" ? 
          html`
            <div id="batchDetail">
              ${this.selectedSamples.length ?
                html`
                  <div>
                    <h1>
                      The selected batch is: ${this.selectedSamples[0].name}. 
                      Incubator: ${this.selectedSamples[0].incubation_incubator}. 
                      #Samples: ${this.selectedSamples[0].SAMPLES_ARRAY.length}
                    </h1>
                    ${this.selectedSamples[0].SAMPLES_ARRAY.length ?
                      html`<div id="samplesArr">${this.selectedSamples[0].SAMPLES_ARRAY.map(s =>
                        html`<div>${s.sample_id} Incub ${s.incubation_moment}</div>`
                      )}</div>` :
                      nothing
                    }
                  </div>
                ` :
                nothing
              }
            </div>
          ` :
          nothing
        }
        <audit-dialog @sign-audit=${this.setAudit}></audit-dialog>
        ${this.dateTemplate()}
        ${this.langConfig&&this.langConfig.fieldText&&this.langConfig.fieldText.comment ?
          html`${this.commentTemplate()}` : nothing
        }
        ${this.langConfig&&this.langConfig.resultHeader ? 
          html`${this.resultTemplate()}` :
          nothing
        }
        ${this.sampleName=="SampleIncubation" ? 
          html`
            ${this.newBatchTemplate()}
            ${this.assignTemplate()}
          ` :
          nothing
        }
        ${super.render()}
      </div>
      ${this.compositions&&this.sampleName=="SampleIncubation" ?
        html`${this.compositions.map(c => 
          html`<div class="layout flex">
            <composition-template .procName=${this.procName} .sampleName=${this.sampleName}
              .model=${c} .config=${this.config} .selectedBatch=${this.selectedSamples.length?this.selectedSamples[0]:{}}
              @set-grid=${e=>this.setGrid(e.detail)}></composition-template>
          </div>`
        )}` :
        nothing
      }
    `;
  }

  get audit() {
    return this.shadowRoot.querySelector("audit-dialog")
  }
    
  setAudit(e) {
    this.targetValue = {
      auditId: e.detail.audit_id
    }
    this.itemId = e.detail.audit_id
    this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
    this.actionMethod(this.selectedDialogAction, false)
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
      this.reload()
    }
  }

  reload() {
    this.resetDialogThings()
    this.selectedAction = ProceduresModel[this.procName][this.sampleName].actions[0]
    this.actionMethod(this.selectedAction)
  }

  resetDialogThings() {
    this.itemId = null
    this.targetValue = {}
    this.selectedResults = []
    this.selectedAssigns = []
    this.selectedDialogAction = null
  }

  reloadAudit() {
    this.resetDialogThings()
    this.actionMethod(this.selectedAction)
  }

  reloadResult() {
    this.resetDialogThings()
    this.actionMethod(this.selectedAction)
  }

  actionMethod(action, replace = true) {
    if (replace) {
      this.selectedAction = action
    }
    if (action.dialogInfo) {
      if (action.dialogInfo.automatic) {
        if (this.itemId) {
          this.credsChecker(action.actionName, this.itemId, this.jsonParam())
        } else {
          this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam())
        }
      } else {
        this[action.dialogInfo.name].show()
      }
    } else {
      if (this.selectedSamples.length) {
        console.log(this.selectedSamples, " object")
        this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam())
      } else {
        this.credsChecker(action.actionName, null, this.jsonParam())
      }
    }
  }

  getButton() {
    return html`
      ${this.actions&&this.actions.map(action =>
        html`${action.button ?
          html`${action.button.icon ?
            html`<mwc-icon-button 
              id="${action.button.id}"
              icon="${action.button.icon}" 
              title="${action.button.title['label_'+this.lang]}" 
              ?disabled=${action.button.whenDisabled == "samplesReload" ? this.samplesReload : !this.selectedSamples.length}
              @click=${()=>this.actionMethod(action)}></mwc-icon-button>` :
            html`<mwc-button dense raised 
              id="${action.button.id}"
              icon="${action.button.icon}" 
              label="${action.button.title['label_'+this.lang]}" 
              ?disabled=${action.button.whenDisabled == "samplesReload" ? this.samplesReload : !this.selectedSamples.length}
              @click=${()=>this.actionMethod(action)}></mwc-button>`
          }` :
          nothing
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
    let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
    this[action.clientMethod]()
  }

  dialogAccept(selected=true) {
    if (selected) {
      this.credsChecker(this.selectedAction.actionName, this.selectedSamples[0].sample_id, this.jsonParam(this.selectedAction))
    } else {
      this.credsChecker(this.selectedAction.actionName, null, this.jsonParam(this.selectedAction))
    }
  }

  jsonParam() {
    let jsonParam = {}
    let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
    if (action.apiParams) {
      action.apiParams.forEach(p => {
        if (p.element) {
          jsonParam[p.query] = this[p.element].value // get value from field input
        } else if (p.defaultValue) {
          jsonParam[p.query] = p.defaultValue // get value from default value (i.e incubator)
        } else if (p.beItem) {
          jsonParam[p.query] = this.selectedSamples[0][p.beItem] // get value from selected item
        } else if (p.targetValue) {
          jsonParam[p.query] = this.targetValue[p.query] // get value from target element passed
        } else {
          jsonParam[p.query] = p.value
        }
      })
    }
    if (action.paramFilter) {
      jsonParam[action.paramFilter[this.filterName].query] = action.paramFilter[this.filterName].value
    }
    return jsonParam
  }

  setGrid(j) {
    this.selectedSamples = []
    if (this.selectedAction.sortItem) {
      this.grid.items = j[this.selectedAction.sortItem]
      this.shadowRoot.querySelectorAll("composition-template").forEach(c => {
        c.grid.items = j[c.model.filter][0]
      })
    } else {
      this.grid.items = j
    }
  }

  gridList() {
    if (this.langConfig) {
      return Object.entries(this.langConfig.gridHeader).map(
        ([key, value], i) => html`
          ${this.langConfig.gridHeader[key].is_icon ?
            this.iconColumn(key, value, i) :
            this.nonIconColumn(key, value, i)
          }
        `
      )
    }
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
      if (this.filterName == "active_batches") {
        return html`<img src="/images/incubators/${sample.incubation_start?'IncubInProgress.gif':'iconTercerPrograma.jpg'}" style="width:20px">`
      } else {
        return html`<img src="/images/${this.filterName}_${sample.status.toLowerCase()}.png" style="width:20px">`
      }
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
    if (this.langConfig&&this.langConfig.title[this.filterName]) {
      return html`<h1>${this.langConfig.title[this.filterName]["label_"+this.lang]}</h1>`
    }
  }
}

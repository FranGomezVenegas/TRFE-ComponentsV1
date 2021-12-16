import { html, css, nothing } from 'lit';
import { SamplePendingSampling } from '../SamplePendingSampling';
import { commonLangConfig } from '@trazit/common-core';
import { Factors } from '@collaborne/lit-flexbox-literals';

class SampleBatch extends SamplePendingSampling {
  static get styles() {
    return [
      super.styles,
      Factors,
      css`
      #batchDetail {
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
    ]
  }

  render() {
    return html`
      <div class="layout horizontal flex wrap">
        <div class="layout flex">${super.render()}</div>
        <div id="batchDetail" class="layout horizontal flex-2">
          ${this.selectedItem ?
            html`
              <div>
                <h1>
                  The selected batch is: ${this.selectedItem.name}. 
                  Incubator: ${this.selectedItem.incubation_incubator}. 
                  #Samples: ${this.selectedItem.SAMPLES_ARRAY.length}
                </h1>
                ${this.selectedItem.SAMPLES_ARRAY.length ?
                  html`<div id="samplesArr">${this.selectedItem.SAMPLES_ARRAY.map(s =>
                    html`<div>${s.sample_id} Incub ${s.incubation_moment}</div>`
                  )}</div>` :
                  nothing
                }
              </div>
            ` :
            nothing
          }
        </div>
      </div>
      ${this.newBatchTemplate()}
      ${this.assignTemplate()}
    `
  }

  getButton() {
    return html`
      <mwc-icon-button icon="refresh" ?disabled=${!this.samplesLoaded} @click=${this.getSamples}></mwc-icon-button>
      <mwc-button label="New Batch" ?disabled=${!this.samplesLoaded} @click=${()=>this.newBatchDialog.show()}></mwc-button>
      <mwc-button label="Delete Batch" ?disabled=${!this.selectedItem} @click=${this.deleteBatch}></mwc-button>
      <mwc-button label="Assign Incubator" ?disabled=${!this.selectedItem} @click=${()=>this.assignDialog.show()}></mwc-button>
      <mwc-button label="Start Incubator" ?disabled=${!this.selectedItem} @click=${this.startIncubator}></mwc-button>
      <mwc-button label="End Incubator" ?disabled=${!this.selectedItem} @click=${this.endIncubator}></mwc-button>
    `
  }

  newBatchTemplate() {
    return html`
    <tr-dialog id="newBatchDialog" 
      @closed=${()=>this.batchTxt.value=""}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <mwc-textfield id="batchTxt" label="${this.langConfig.newBatch["label_"+ this.lang]}" 
          dialogInitialFocus @keypress=${e=>e.keyCode==13&&this.newBatch()}></mwc-textfield>
        <div style="margin-top:30px;text-align:center">
          <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
            ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="xl" slot="primaryAction" @click=${this.newBatch}>
            ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
        </div>
      </div>
    </tr-dialog>
    `
  }

  assignTemplate() {
    return html`
    <tr-dialog id="assignDialog" 
      @opening=${this.getAssign}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <vaadin-grid id="asGrid" theme="row-dividers"
          @active-item-changed=${e=>this.selectedAssigns=e.detail.value ? [e.detail.value] : []}
          .selectedItems="${this.selectedAssigns}">
          ${this.asList()}
        </vaadin-grid>
        <div style="margin-top:30px;text-align:center">
          <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
            ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="xl" slot="primaryAction" @click=${this.setAssign}>
            ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
        </div>
      </div>
    </tr-dialog>
    `
  }

  asList() {
    return Object.entries(this.langConfig.assignHeader).map(([key, value], i) => 
      html`${i==0 ?
        html`<vaadin-grid-column path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>` :
        html`<vaadin-grid-column resizable auto-width path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
      }`
    )
  }

  get newBatchDialog() {
    return this.shadowRoot.querySelector("tr-dialog#newBatchDialog")
  }

  get newBatchDialogSurface() {
    return this.newBatchDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  get batchTxt() {
    return this.shadowRoot.querySelector("mwc-textfield#batchTxt")
  }

  get assignDialog() {
    return this.shadowRoot.querySelector("tr-dialog#assignDialog")
  }

  get assignDialogSurface() {
    return this.newBatchDialog.shadowRoot.querySelector(".mdc-dialog__surface")
  }

  get asGrid() {
    return this.shadowRoot.querySelector("vaadin-grid#asGrid")
  }

  static get properties() {
    return {
      samplesLoaded: { type: Boolean },
      selectedAssigns: { type: Array }
    };
  }

  constructor() {
    super()
    this.name = "incubation"
    this.selectedAssigns = []
    this.langConfig.title = {
      "incubation" : {
        "label_en": "Batches", 
        "label_es": "Tandas"
      }
    }
    this.langConfig.gridHeader = {
      'iconCol': {
        label_en:'', label_es: '', is_icon: true
      },
      'name': {
        label_en:'Name', label_es: 'Nombre', sort: true, filter: false
      },
      'incub_stage': {
        label_en:'#Incub', label_es: 'IncNº', sort: true, filter: false
      },
      'incubation_incubator': {
        label_en:'Incubator', label_es: 'Incubadora', sort: false, filter: true
      },
      'incubator_info_temperature': {
        label_en:'Temperature', label_es: 'Temperatura', sort: false, filter: false
      },
      'incubator_info_created_on': {
        label_en:'T.Date', label_es: 'Fecha T.', sort: false, filter: false
      },
      'NUM_SAMPLES': {
        label_en:'Num Samples', label_es: 'Nº Muestras', sort: false, filter: false
      },
      'incubation_start': {
        label_en:'Start Date', label_es: 'Fecha Inicio', sort: false, filter: false
      }
    }
    this.langConfig = {
      ...this.langConfig,
      "newBatch" : {
        "label_en": "New Batch Name", "label_es": "Nombre para la nueva tanda"
      },
      "assignHeader" : {
        "stage": {
          label_en:'Incub', label_es: 'Incub'
        },
        "name": {
          label_en:'Name', label_es: 'Nombre'
        },
        "description": {
          label_en:'description', label_es: 'descripción'
        }
      }
    }
  }

  iconRenderer(sample) {
    return html`<img src="/images/incubators/${sample.incubation_start?'IncubInProgress.gif':'iconTercerPrograma.jpg'}" style="width:20px">`
  }

  getSamples() {
    this.samplesLoaded = false
    this.selectedItem = null
    this.credsChecker("GET_PENDING_INCUBATION_SAMPLES_AND_ACTIVE_BATCHES", null, {
      incub1_whereFieldsName: "current_stage|incubation_passed",
      incub1_whereFieldsValue: "Incubation|false",
      incub1_sortFieldsName: "sample_id desc",
      incub2_whereFieldsName: "current_stage|incubation_passed",
      incub2_whereFieldsValue: "Incubation|true",
      incub2_sortFieldsName: "sample_id desc"
    })
  }

  async getSamplesReq() {
    super.getSamplesReq().then(() => {
      this.samplesLoaded = true
    })
  }

  setGrid(j) {
    this.grid.items = j.active_batches
  }

  newBatch() {
    if (this.batchTxt.value) {
      this.credsChecker("EM_BATCH_INCUB_CREATE", null, {
        batchName: this.batchTxt.value,
        batchTemplateId: 1,
        batchTemplateVersion: 1
      })
    }
  }

  deleteBatch() {
    this.credsChecker("EM_BATCH_INCUB_REMOVE", null, {
      batchName: this.selectedItem.name
    })
  }

  setAssign() {
    this.credsChecker("EM_BATCH_ASSIGN_INCUB", null, {
      batchName: this.selectedItem.name,
      incubatorName: this.selectedAssigns[0].name,
      incubStage: this.selectedAssigns[0].stage
    })
  }

  startIncubator() {
    this.credsChecker("EM_BATCH_INCUB_START", null, {
      batchName: this.selectedItem.name,
      batchTemplateId: 1,
      batchTemplateVersion: 1
    })
  }

  endIncubator() {
    this.credsChecker("EM_BATCH_INCUB_END", null, {
      batchName: this.selectedItem.name,
      batchTemplateId: 1,
      batchTemplateVersion: 1
    })
  }

  getIncubatorReq() {
    let params = this.config.backendUrl + this.config.ApiEnvMonitUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      this.newBatchDialog.close()
      this.assignDialog.close()
      this.getSamples()
    })
  }

  getAssign() {
    this.credsChecker("INCUBATORS_LIST", null, {})
  }

  getAssignReq() {
    this.asGrid.items = []
    let params = this.config.backendUrl + this.config.frontEndEnvMonitIncubationUrl 
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      if (j) {
        this.asGrid.items = j
      }
    })
  }

  nextRequest() {
    super.nextRequest()
    if (this.actionName == "GET_PENDING_INCUBATION_SAMPLES_AND_ACTIVE_BATCHES") {
      this.getSamplesReq()
    } else if (this.actionName == "EM_BATCH_INCUB_CREATE" || this.actionName == "EM_BATCH_INCUB_REMOVE" || this.actionName == "EM_BATCH_ASSIGN_INCUB" || this.actionName == "EM_BATCH_INCUB_START" || this.actionName == "EM_BATCH_INCUB_END") {
      this.getIncubatorReq()
    } else if (this.actionName == "INCUBATORS_LIST") {
      this.getAssignReq()
    }
  }
}
window.customElements.define('sample-batch', SampleBatch);

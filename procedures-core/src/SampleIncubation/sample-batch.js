import { html } from 'lit';
import { SamplePendingSampling } from '../SamplePendingSampling';
import { commonLangConfig } from '@trazit/common-core';

class SampleBatch extends SamplePendingSampling {
  getButton() {
    return html`
      <mwc-icon-button icon="refresh" @click=${this.getSamples}></mwc-icon-button>
      <mwc-button label="New Batch" @click=${this.newBatch}></mwc-button>
      <mwc-button label="Delete Batch" ?disabled=${!this.selectedItem} @click=${this.deleteBatch}></mwc-button>
      <mwc-button label="Assign Incubator" ?disabled=${!this.selectedItem} @click=${this.assignIncubator}></mwc-button>
      <mwc-button label="Start Incubator" ?disabled=${!this.selectedItem} @click=${this.startIncubator}></mwc-button>
      <mwc-button label="End Incubator" ?disabled=${!this.selectedItem} @click=${this.endIncubator}></mwc-button>
    `
  }

  newBatchTemplate() {
    return html`
    <tr-dialog id="newBatchDialog" 
      @closed=${()=>this.newTxt.value=""}
      heading=""
      hideActions=""
      scrimClickAction="">
      <div class="layout vertical flex center-justified">
        <mwc-textfield id="newTxt" placeholder="${this.langConfig.newBatch&&this.langConfig.newBatch["label_"+ this.lang]}" 
          dialogInitialFocus @keypress=${e=>e.keyCode==13&&this.setNewBatch()}></mwc-textfield>
        <div style="margin-top:30px;text-align:center">
          <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
            ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
          <sp-button size="xl" slot="primaryAction" @click=${this.setNewBatch}>
            ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
        </div>
      </div>
    </tr-dialog>
    `
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

  static get properties() {
    return {
    };
  }

  constructor() {
    super()
    this.name = "incubation"
    this.langConfig.title = {
      "incubation" : {
        "label_en": "Batches", 
        "label_es": "Tandas"
      }
    }
    this.langConfig.gridHeader = {
      'iconCol': {
        label_en:'', label_es: ''
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
  }

  getSamples() {
    this.credsChecker("GET_PENDING_INCUBATION_SAMPLES_AND_ACTIVE_BATCHES", null, {
      incub1_whereFieldsName: "current_stage|incubation_passed",
      incub1_whereFieldsValue: "Incubation|false",
      incub1_sortFieldsName: "sample_id desc",
      incub2_whereFieldsName: "current_stage|incubation_passed",
      incub2_whereFieldsValue: "Incubation|true",
      incub2_sortFieldsName: "sample_id desc"
    })
  }

  setGrid(j) {
    console.log(j, " JJ")
    this.grid.items = j.active_batches
  }

  nextRequest() {
    super.nextRequest()
    if (this.actionName == "GET_PENDING_INCUBATION_SAMPLES_AND_ACTIVE_BATCHES") {
      this.getSamplesReq()
    }
  }
}
window.customElements.define('sample-batch', SampleBatch);

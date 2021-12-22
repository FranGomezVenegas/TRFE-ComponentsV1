import { html, nothing } from 'lit';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';

export function DialogTemplate(base) {
  return class extends base {
    static get properties() {
      return {
        selectedResults: { type: Array },
        enterResults: { type: Array },
        selectedAssigns: { type: Array },
        assignList: { type: Array },
        targetValue: { type: Object },
        selectedDialogAction: { type: Object }
      }
    }
  
    dateTemplate() {
      return html`
      <tr-dialog id="dateDialog" 
        @closed=${()=>this.dateInput.value=""}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <input id="dateInput" 
            type="datetime-local" dialogInitialFocus
            @keypress=${e=>e.keyCode==13&&this.setNewDate()}>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" @click=${this.setNewDate}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }
        
    get dateDialog() {
      return this.shadowRoot.querySelector("tr-dialog#dateDialog")
    }

    get dateInput() {
      return this.shadowRoot.querySelector("input#dateInput")
    }
  
    setNewDate() {
      if (this.dateInput.value) {
        this.dialogAccept()
      }
    }

    commentTemplate() {
      return html`
      <tr-dialog id="commentDialog" 
        @closed=${()=>this.commentInput.value=""}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <mwc-textfield id="commentInput" label="${this.langConfig.fieldText&&this.langConfig.fieldText.comment["label_"+ this.lang]}" 
            dialogInitialFocus
            @keypress=${e=>e.keyCode==13&&this.addComment()}></mwc-textfield>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.addComment}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }

    get commentDialog() {
      return this.shadowRoot.querySelector("tr-dialog#commentDialog")
    }

    get commentInput() {
      return this.shadowRoot.querySelector("mwc-textfield#commentInput")
    }

    addComment() {
      if (this.commentInput.value) {
        this.dialogAccept()
      }
    }

    resultTemplate() {
      return html`
      <tr-dialog id="resultDialog" ?open=${this.enterResults.length}
        @closing=${()=>this.enterResults=[]}
        heading=""
        hideActions=""
        scrimClickAction="">
        ${this.selectedSamples.length ?
          html`<label slot="topLeft" style="font-size:12px">Sample ID: ${this.selectedSamples[0].sample_id}</label>` : nothing
        }
        <vaadin-grid id="erGrid" theme="row-dividers" column-reordering-allowed multi-sort
          @selected-items-changed=${e => {
            this.selectedResults = e.detail.value
          }}
          .detailsOpenedItems=${this.selectedResults}
          ${gridRowDetailsRenderer(this.detailRenderer)}>
          <vaadin-grid-selection-column header="" flex-grow="1"></vaadin-grid-selection-column>
          ${this.erList()}
        </vaadin-grid>
      </tr-dialog>
      `
    }

    detailRenderer(result) {
      return html`
        <div style="text-align:center;font-size:12px">
          <p>${result.spec_eval ?
            html`${result.spec_eval=='IN' ?
              html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>` :
              html`${result.is_locked ?
                html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>` :
                html`<mwc-icon style="color:yellow">radio_button_checked</mwc-icon>`
              }`
            }` :
            html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
          }</p>
          <p>Range Evaluation: ${result.spec_eval}</p>
          <p>Range Rule: ${result.spec_eval_detail}</p>
          <p>Lock Reason: ${result.is_locked?result.is_locked["message_"+ this.lang]:null}</p>
        </div>
      `
    }

    erList() {
      return Object.entries(this.langConfig.resultHeader).map(([key, value], i) => 
        html`${i==0 ?
          html`<vaadin-grid-column 
            ${columnBodyRenderer(this.specRenderer)}
            text-align="center" 
            flex-grow="0"
            path="${key}" 
            header="${value['label_'+this.lang]}"></vaadin-grid-column>`:
          html`${key=="raw_value" ?
            html`<vaadin-grid-column 
              ${columnBodyRenderer(this.valRenderer)}
              text-align="center" 
              flex-grow="1"
              path="${key}" 
              header="${value['label_'+this.lang]}"></vaadin-grid-column>` :
            html`<vaadin-grid-column resizable flex-grow=1 path="${key}" header="${value['label_'+this.lang]}"></vaadin-grid-column>`
          }`
        }`
      )
    }

    specRenderer(result) {
      if (result.spec_eval) {
        if (result.spec_eval == 'IN') {
          return html`<mwc-icon style="color:green">radio_button_checked</mwc-icon>`
        } else {
          if (result.is_locked) {
            return html`<mwc-icon style="color:red">radio_button_checked</mwc-icon>`
          } else {
            return html`<mwc-icon style="color:yellow">radio_button_checked</mwc-icon>`
          }
        }
      } else {
        return html`<img style="height:24px; width: 24px;" src="https://upload.wikimedia.org/wikipedia/commons/9/96/Button_Icon_White.svg">`
      }
    }

    valRenderer(result) {
      if (!result.raw_value || result.spec_eval == "IN") {
        if (result.param_type == "TEXT" || result.param_type == "qualitative") {
          return html`<mwc-textfield type="text" .value=${result.raw_value} 
            @keydown=${e=>e.keyCode==13&&this.setResult(result, e)}></mwc-textfield>`
        } else {
          return html`<mwc-textfield 
            type="number" step=0.01 .value=${result.raw_value?result.raw_value:0.00} 
            @keydown=${e=>e.keyCode==13&&this.setResult(result, e)}></mwc-textfield>`
        }
      } else {
        if (result.is_locked) {
          return html`
            <div style="width: 100%;height: 55px;position: relative;">
              <div style="width: 100%;text-align:center; margin: 0;position: absolute;top: 50%;-ms-transform: translateY(-50%);transform: translateY(-50%);">${result.raw_value}</div>
            </div>
          `
        } else {
          if (result.param_type == "TEXT" || result.param_type == "qualitative") {
            return html`<mwc-textfield type="text" .value=${result.raw_value} 
              @keydown=${e=>e.keyCode==13&&this.setResult(result, e)}></mwc-textfield>`
          } else {
            return html`<mwc-textfield 
              type="number" step=0.01 .value=${result.raw_value?result.raw_value:0.00} 
              @keydown=${e=>e.keyCode==13&&this.setResult(result, e)}></mwc-textfield>`
          }
        }
      }
    }

    get erGrid() {
      return this.shadowRoot.querySelector("vaadin-grid#erGrid")
    }
  
    get resultDialog() {
      return this.shadowRoot.querySelector("tr-dialog#resultDialog")
    }
  
    get rItem() {
      return this.shadowRoot.querySelector("input[name=rItem]")
    }

    setResult(result, e) {
      this.targetValue = {
        rawValueResult: e.target.value,
        resultId: result.result_id
      }
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      if (result.raw_value) {
        this.selectedDialogAction.actionName = "RE"+ this.selectedDialogAction.actionName
        this.actionMethod(this.selectedDialogAction, false)
      } else {
        this.actionMethod(this.selectedDialogAction, false)
      }
    }

    newBatchTemplate() {
      return html`
      <tr-dialog id="newBatchDialog" 
        @closed=${()=>this.batchInput.value=""}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <mwc-textfield id="batchInput" label="${this.langConfig.fieldText&&this.langConfig.fieldText.newBatch["label_"+ this.lang]}" 
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

    get newBatchDialog() {
      return this.shadowRoot.querySelector("tr-dialog#newBatchDialog")
    }
  
    get batchInput() {
      return this.shadowRoot.querySelector("mwc-textfield#batchInput")
    }
  
    newBatch() {
      if (this.batchInput.value) {
        this.dialogAccept(false)
      }
    }

    assignTemplate() {
      return html`
      <tr-dialog id="assignDialog" ?open=${this.assignList.length}
        @closing=${()=>this.assignList=[]}
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
  
    get assignDialog() {
      return this.shadowRoot.querySelector("tr-dialog#assignDialog")
    }
  
    get asGrid() {
      return this.shadowRoot.querySelector("vaadin-grid#asGrid")
    }
  
    setAssign() {
      this.targetValue = {
        incubatorName: this.selectedAssigns[0].name,
        incubStage: this.selectedAssigns[0].stage
      }
      this.selectedDialogAction = this.selectedAction.dialogInfo.action[0]
      this.actionMethod(this.selectedDialogAction, false)
    }
  }
}
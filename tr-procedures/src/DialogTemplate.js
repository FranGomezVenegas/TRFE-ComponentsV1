import { html } from 'lit';
import { commonLangConfig } from '@trazit/common-core';

export function DialogTemplate(base) {
  return class extends base {
    dateTemplate() {
      return html`
      <tr-dialog id="dateDialog" 
        @closed=${()=>this.dateInput.value=""}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <input id="dateInput" placeholder="${this.langConfig.newDate&&this.langConfig.newDate["label_"+ this.lang]}" 
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

    commentTemplate() {
      return html`
      <tr-dialog id="commentDialog" 
        @closed=${()=>this.commentInput.value=""}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <mwc-textfield id="commentInput" label="Add Comment" 
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

    get dateDialog() {
      return this.shadowRoot.querySelector("tr-dialog#dateDialog")
    }

    get dateDialogSurface() {
      return this.dateDialog.shadowRoot.querySelector(".mdc-dialog__surface")
    }

    get dateInput() {
      return this.shadowRoot.querySelector("input#dateInput")
    }

    get commentDialog() {
      return this.shadowRoot.querySelector("tr-dialog#commentDialog")
    }

    get commentInput() {
      return this.shadowRoot.querySelector("mwc-textfield#commentInput")
    }

    setNewDate() {
      if (this.dateInput.value) {
        this.dialogAccept()
      }
    }

    setSamplingDate() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        this.dateDialog.close()
        this.getSamples()
      })
    }
  }
}
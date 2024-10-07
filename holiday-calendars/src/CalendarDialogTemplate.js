import { html, nothing } from 'lit';
import { commonLangConfig } from '@trazit/common-core';


export function CalendarDialogTemplate(base) {
  return class extends base {
    static get properties() {
      return {
        selectedAction: { type: Array }
      }
    }

    constructor() {
      super()
      this.selectedAction = []
    }

    defaultValue() {
      this.resetFields()
      let dlgFlds = this.actionBeingPerformedModel.dialogInfo.fields
      if (dlgFlds === undefined) {
        return
      }
      for (let i = 0; i < dlgFlds.length; i++) {
        let fldObj = dlgFlds[i]
        let keyName = Object.keys(fldObj)

        if (fldObj[keyName].default_value !== undefined && fldObj[keyName].default_value !== null) {
          this[keyName[0]].value = fldObj[keyName].default_value
        }
        if (fldObj[keyName].selObjectPropertyName !== undefined && fldObj[keyName].selObjectPropertyName !== null) {
          this[keyName[0]].value = this.selectedItems[0][fldObj[keyName].selObjectPropertyName]
        }
        if (fldObj[keyName].internalVariableObjName !== undefined && fldObj[keyName].internalVariableObjName !== null &&
            fldObj[keyName].internalVariableObjProperty !== undefined && fldObj[keyName].internalVariableObjProperty !== null) {
          this[keyName[0]].value = this[fldObj[keyName].internalVariableObjName][0][fldObj[keyName].internalVariableObjProperty]
        }
      }
    }

    resetFields() {
      let dlgFlds = this.actionBeingPerformedModel.dialogInfo.fields
      if (dlgFlds === undefined) {
        return
      }
      for (let i = 0; i < dlgFlds.length; i++) {
        let fldObj = dlgFlds[i]
        let keyName = Object.keys(fldObj)
        if (this[keyName] !== null) {
          this[keyName[0]].value = ""
        }
      }
    }

    cleanFormFields() {
      if (this.text1) { this.text1.value = '' }
      if (this.number1) { this.number1.value = '' }
    }

    calendarDialogsTemplate() {
      if (this.selectedAction && this.selectedAction.dialogInfo) {
        if (this.selectedAction.dialogInfo.name === 'reactivateObjectDialog') {
          return
        }
      }

      return html`
        <tr-dialog id="genericFormDialog"
          heading=""
          hideActions=""
          @closed=${() => this.cleanFormFields()}
          scrimClickAction="">
            ${this.selectedAction === undefined || this.selectedAction.dialogInfo === undefined ?
            html`hola`: html`
            <div class="layout vertical flex center-justified">
              ${!this.selectedAction.dialogInfo.fields.text1 ?
                html``: html`
                <div class="layout horizontal flex center-center">
                  <md-filled-text-field class="layout flex" id="text1" type="text" 
                  .value=${this.selectedAction.dialogInfo.fields.text1.default_value ? this.selectedAction.dialogInfo.fields.text1.default_value : ''} 
                  @change=${e => this.numDays = e.target.value}
                  label="${this.selectedAction.dialogInfo.fields.text1["label_" + this.lang]}"
                  @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedActionNoCredChecker()}></md-filled-text-field>
                </div>
              `}
              
              ${!this.selectedAction.dialogInfo.fields.text2 ?
                html``: html`
                <div class="layout horizontal flex center-center">
                  <md-filled-text-field class="layout flex" id="text2" type="text" 
                  .value=${this.selectedAction.dialogInfo.fields.text2.default_value ? this.selectedAction.dialogInfo.fields.text2.default_value : ''} 
                  @change=${e => this.numDays = e.target.value}
                  label="${this.selectedAction.dialogInfo.fields.text2["label_" + this.lang]}"
                  @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedActionNoCredChecker()}></md-filled-text-field>
                </div>
              `}
              
              ${!this.selectedAction.dialogInfo.fields.number1 ?
                html``: html`
                <div class="layout horizontal flex center-center">
                  <md-filled-text-field class="layout flex" id="number1" type="number" 
                  .value=${this.selectedAction.dialogInfo.fields.number1.default_value ? this.selectedAction.dialogInfo.fields.number1.default_value : ''} 
                  @change=${e => this.numDays = e.target.value}
                  label="${this.selectedAction.dialogInfo.fields.number1["label_" + this.lang]}"
                  @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedActionNoCredChecker()}></md-filled-text-field>
                </div>
              `}
              
              ${!this.selectedAction.dialogInfo.fields.list1 ?
                html``: html`
                <md-filled-select id="list1" label="${this.selectedAction && this.selectedAction.dialogInfo.fields.list1["label_" + this.lang]}">
                  ${this.selectedAction.dialogInfo.fields.list1.items.map((c, i) =>
                    html`<md-select-option value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</md-select-option>`
                  )}
                </md-filled-select>
              `}
              
              ${this.selectedAction.dialogInfo.fields.date1 ? html`
                <label for="fname">${this.selectedAction.dialogInfo.fields.date1["label_" + this.lang]}</label><br>
                <input id="date1" type="date" dialogInitialFocus>
              ` : nothing}

              <div style="margin-top:30px;text-align:center">
                <md-filled-tonal-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
                    ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</md-filled-tonal-button>
                <md-filled-tonal-button size="xl" slot="primaryAction" @click=${this.genomaSuperDialogClickedActionNoCredChecker}>
                    ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</md-filled-tonal-button>
              </div>
            </div>
            `}
        </tr-dialog>
      `
    } 

    get genericFormDialog() { return this.shadowRoot.querySelector("tr-dialog#genericFormDialog") }
    get text1() { return this.shadowRoot.querySelector("md-filled-text-field#text1") }
    get text2() { return this.shadowRoot.querySelector("md-filled-text-field#text2") }
    get number1() { return this.shadowRoot.querySelector("md-filled-text-field#number1") }
    get list1() { return this.shadowRoot.querySelector("md-filled-select#list1") }
    get date1() { return this.shadowRoot.querySelector("input#date1") }

  }
}

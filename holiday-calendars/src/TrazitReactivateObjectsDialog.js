import { html, nothing } from 'lit';
import { commonLangConfig } from '@trazit/common-core';
import { CalendarActions } from './CalendarActions';
import '@trazit/tr-dialog/tr-dialog'
import '@material/web/textfield/outlined-text-field'
import '@material/web/select/filled-select';
import '@material/web/select/select-option';

import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button';


export function TrazitReactivateObjectsDialog(base) {
  return class extends CalendarActions(base) {
    static get properties() {
      return {
        numDays: { type: Number },
        deactivatedObjects: { type: Array },
        selectedObjectToReactive: { type: Object }
      }
    }

    constructor() {
      super()
      this.numDays = 7
      this.deactivatedObjects = []
      this.selectedObjectToReactive = {}
    }

    noNegativeValues(e) {
      if (e.target.value <= 0) {
        this.numDays = 0
        e.target.value = 0
      }
    }

    reactivateObjectsDialog() {
      return html` 
        <tr-dialog id="reactivateObjectDialog" 
          ?open=${this.actionBeingPerformedModel && this.actionBeingPerformedModel.dialogInfo && this.actionBeingPerformedModel.dialogInfo.name === 'reactivateObjectDialog'} 
          heading="" hideActions="" 
          @open="${this.cleanReactivateObjectList}" 
          .showCloseButton=${true}
          .showDoButton=${true}
          scrimClickAction=""
          @do-action="${this.reactivateObjectDialogAction}"> 
          ${this.actionBeingPerformedModel === undefined || this.actionBeingPerformedModel.dialogInfo === undefined || this.actionBeingPerformedModel.dialogInfo.name !== "reactivateObjectDialog" ? nothing :
        html`
        <style>
        md-filled-select {        
          --mdc-theme-primary: rgba(36, 192, 235, 1);
          --mdc-theme-text-primary-on-background: rgba(49, 130, 189, 1);
          --mdc-select-ink-color: rgb(47, 47, 47);
          --mdc-select-dropdown-icon-color: rgba(36, 192, 235, 1);
          --mdc-select-hover-line-color: rgba(36, 192, 235, 1);
          --mdc-notched-outline-border-color: rgba(186, 235, 248, 0.4);

          font-family: Montserrat;
          font-weight: bold;
          font-size: 19px;
        }
        md-filled-select.outlined {        
          --mdc-theme-primary: rgba(36, 192, 235, 1);
          --mdc-theme-text-primary-on-background: rgba(49, 130, 189, 1);
          --mdc-select-ink-color: rgba(36, 192, 235, 1);
          font-family: Montserrat;
          font-weight: bold;
          font-size: 19px;
          background-color: 4fcad029;
        }
        div.reactivate {
          min-width: 490px;
        }
        </style>
        <form slot="content" id="form-id" method="dialog"> 
        <div class="layout vertical flex center-justified reactivate" style="width:400px;height:400px;">        
          <div class="layout vertical flex">
            <div class="layout horizontal flex center-center">
              <md-outlined-text-field class="layout flex" id="queryNumDays" type="number" 
                .value=${this.numDays} @change=${e => this.numDays = e.target.value}
                @input=${e => this.noNegativeValues(e)}
                label="${this.actionBeingPerformedModel.dialogInfo.fieldsObject.queryNumDays["label_" + this.lang]}"
                @keypress=${e => e.keyCode == 13 && this.setDays()}></md-outlined-text-field>
                            <md-filled-icon-button class="button-icon" id="logout" @click=${this.setDays}>
            </md-filled-icon-button>
              <md-icon-button @click=${this.setDays}><md-icon icon="refresh">refresh</md-icon><md-icon-button>
            </div>
            <md-filled-select id="objectToReactivateName" label="${this.actionBeingPerformedModel.dialogInfo.fieldsObject.objectName["label_" + this.lang]}" 
              ?disabled=${!this.deactivatedObjects.length}>
              ${!this.deactivatedObjects.length ? nothing : html`
                ${this.deactivatedObjects.map((l, i) =>
                  html`<md-select-option value="${this.listItemValueToGet(l)}" ?selected=${i == 0}>${this.listItemValueToDisplay(l)}</md-select-option>`
                )}
              `}
            </md-filled-select>
          </div>        
        </div>
        </form>
        </tr-dialog>      
      `}
      `
    }

    cleanReactivateObjectList() {
      this.deactivatedObjects = []
      this.selectedObjectToReactive = {}
    }

    setDays() {
      this.selectedDialogAction = this.actionBeingPerformedModel.dialogInfo.viewQuery
      this.GetAlternativeViewData(this.selectedDialogAction, false)
    }

    listItemValueToGet(entry) {
      if (this.actionBeingPerformedModel.dialogInfo === undefined || this.actionBeingPerformedModel.dialogInfo.listDefinition === undefined || this.actionBeingPerformedModel.dialogInfo.listDefinition.keyFldName === undefined) {
        alert('This selected action has no the requirements, requieres dialogInfo.listDefinition.keyFldName property, check the console')
        return entry["name"]
      }
      this.selectedObjectToReactive = entry
      return entry[this.actionBeingPerformedModel.dialogInfo.listDefinition.keyFldName]
    }

    listItemValueToDisplay(entry) {
      if (this.actionBeingPerformedModel.dialogInfo === undefined || this.actionBeingPerformedModel.dialogInfo.listDefinition === undefined || this.actionBeingPerformedModel.dialogInfo.listDefinition.eachEntryTextGenerator === undefined) {
        alert('This selected action has no the requirements, requieres dialogInfo.listDefinition.eachEntryTextGenerator property, check the console')
        return entry["name"]
      }
      let lFlds = this.actionBeingPerformedModel.dialogInfo.listDefinition.eachEntryTextGenerator
      let textToDisplay = ''
      for (let i = 0; i < lFlds.length; i++) {
        if (lFlds[i].type == 'fix') { textToDisplay = textToDisplay + lFlds[i].value }
        if (lFlds[i].type == 'field') { textToDisplay = textToDisplay + entry[lFlds[i].value] }
      }
      return textToDisplay
    }

    reactivateObjectDialogAction() {
      if (this.objectToReactivateName.value === undefined || this.objectToReactivateName.value.length == 0) {
        alert('Please check the model, the keyFldName property is set to one value (' + this.actionBeingPerformedModel.dialogInfo.listDefinition.keyFldName + ') that is not part of those entities data info')
        return
      }
      if (this.objectToReactivateName.value) {
        this.selectedItems[this.actionBeingPerformedModel.dialogInfo.listDefinition.keyFldName] = this.objectToReactivateName.value
        this.selectedDialogAction = this.actionBeingPerformedModel
        this.myActionMethod(this.selectedDialogAction, this.selectedItems, this.actionBeingPerformedModel.dialogInfo.listDefinition.keyFldName)
        this.cleanReactivateObjectList()
      }
    }

    myActionMethod(action, selObject, propName) {
      if (action === undefined) {
        alert('viewQuery property not found in the procedure model for procInstanceName' + this.procName + ' and view ' + this.viewName)
        return
      }
      let selObjectArr = []
      selObjectArr.push(selObject)
      this.buttonActionWithoutDialogNoCredChecker(action, selObjectArr)
      return
    }

    getDeactivatedObjects() {
      let queryDefinition = this.actionBeingPerformedModel.dialogInfo.viewQuery
      this.deactivatedObjects = []
      let APIParams = this.getAPICommonParams(queryDefinition)
      let viewParams = this.jsonParam(queryDefinition)
      let endPointUrl = this.getQueryAPIUrl(queryDefinition)
      if (String(endPointUrl).toUpperCase().includes("ERROR")) {
        alert(endPointUrl)
        return
      }
      let params = this.config.backendUrl + endPointUrl
        + '?' + new URLSearchParams(APIParams) + '&' + new URLSearchParams(viewParams)
      params = params.replace(/\|/g, "%7C");
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.deactivatedObjects = j
        }
      })
    }

    get reactivateObjectDialog() { return this.shadowRoot.querySelector("tr-dialog#reactivateObjectDialog") }
    get queryNumDays() { return this.shadowRoot.querySelector("md-outlined-text-field#queryNumDays") }
    get objectToReactivateName() { return this.shadowRoot.querySelector("md-filled-select#objectToReactivateName") }

  }
}

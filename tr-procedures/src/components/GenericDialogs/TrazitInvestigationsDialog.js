import { html } from 'lit';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import {DialogsFunctions} from './DialogsFunctions';
import { ActionsFunctions } from '../Actions/ActionsFunctions';

export function TrazitInvestigationsDialog(base) {
return class extends ActionsFunctions(DialogsFunctions(base)) {
    static get properties() {
        return {
          selectedInvestigations:{ type: Array},
          openInvests:{ type: Array},
          capaRequired: {type: Boolean},
          targetValue: {type: Object}
        }
    }
    constructor() {
        super()
        this.selectedInvestigations=[]
        this.openInvests=[]
        this.capaRequired=false
        this.targetValue={}
        this.actionBeingPerformedModel={}
    }

//    @opened=${() => this.capaRequired = this.capaCheck.checked}
//    @closed=${e => { if (e.target === this.decisionDialog) this.grid.activeItem = null }}

    decisionTemplate(actionModel) {
      if (actionModel === undefined) {
        actionModel = this.actionBeingPerformedModel
        if (actionModel!==undefined){
            this.area=actionModel.area
        }
      }      
      if (actionModel===undefined||actionModel.dialogInfo===undefined||actionModel.dialogInfo.fields===undefined
        ||actionModel.dialogInfo.name.toString().toUpperCase()!=="DECISIONDIALOG"        
        ){
         // alert('not loaded')
          return html`      <tr-dialog id="decisionDialog" 
        heading=""
        hideActions=""
        scrimClickAction="">
        </tr-dialog>`
      }
      //alert('loaded')
      return html`
       
      <tr-dialog id="decisionDialog" 
      @opened=${() => this.capaRequired = this.capaCheck.checked}
        heading=""
        hideActions=""
        scrimClickAction="">
        <div class="layout vertical flex center-justified">
          <mwc-textfield id="systemName" label="${actionModel.dialogInfo.fields.systemName["label_" + this.lang]}" 
            .value=${this.selectedItems.length && this.selectedItems[0].capa_external_system_name}
            dialogInitialFocus></mwc-textfield>
          <mwc-textfield id="systemId" label="${actionModel.dialogInfo.fields.systemId["label_" + this.lang]}"
            .value=${this.selectedItems.length && this.selectedItems[0].capa_external_system_id}></mwc-textfield>
          <mwc-formfield label="${actionModel.dialogInfo.fields.capa["label_" + this.lang]}">
            <mwc-checkbox id="capaCheck" 
              ?checked=${this.selectedItems.length && this.selectedItems[0].capa_required}
              @change=${e => {                
                this.capaRequired = e.target.checked;
                this.capaId.value = "";
                this.capaName.value = "";
            }}></mwc-checkbox>
          </mwc-formfield>
          <mwc-textfield id="capaName" label="${actionModel.dialogInfo.fields.capaName["label_" + this.lang]}"
            .value=${this.selectedItems.length && this.selectedItems[0].external_system_name}
            ?hidden=${!this.capaRequired}></mwc-textfield>
          <mwc-textfield id="capaId" label="${actionModel.dialogInfo.fields.capaId["label_" + this.lang]}"
            .value=${this.selectedItems.length && this.selectedItems[0].external_system_id}
            ?hidden=${!this.capaRequired}></mwc-textfield>
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction"
              @click=${this.setDecision}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
      </tr-dialog>
      `
    }
    get decisionDialog() {return this.shadowRoot.querySelector("tr-dialog#decisionDialog")}
    get systemName() {return this.shadowRoot.querySelector("mwc-textfield#systemName")}
    get systemId() {return this.shadowRoot.querySelector("mwc-textfield#systemId")}
    get capaCheck() {return this.shadowRoot.querySelector("mwc-checkbox#capaCheck")}
    get capaName() {return this.shadowRoot.querySelector("mwc-textfield#capaName")}
    get capaId() {return this.shadowRoot.querySelector("mwc-textfield#capaId")}

    setDecision() {
      let required = []
      if (!this.systemName.value) {
        required.push("System Name")
      }
      if (!this.systemId.value) {
        required.push("System Id")
      }
      if (this.capaCheck.checked) {
        if (!this.capaName.value) {
          required.push("CAPA Name")
        }
        if (!this.capaId.value) {
          required.push("CAPA Id")
        }
      }
      if (required.length) {
        this.dispatchEvent(new CustomEvent("error", {
          detail: {
            is_error: true,
            message_en: "Please fill the required fields: " + required.join(", "),
            message_es: "Por favor, rellene los campos obligatorios: " + required.join(", ")
          },
          bubbles: true,
          composed: true
        }))
        console.log("Please fill the required fields: " + required.join(", "))
        return
      }

      let targetValue = {
        "capaFieldValue": "Trackwise" + this.systemName.value + "*String|" + this.systemId.value + "*String|" + this.capaName.value + "*String|" + this.capaId.value + "*String",
        "capaRequired": this.capaRequired
      }
      this.trazitNoDialogRequired(this.actionBeingPerformedModel, 
        this.selectedItems[0], targetValue, false, this.selectedItems[0], null, null, null)
      //this.performActionRequestHavingDialogOrNot(this.actionBeingPerformedModel, 
      //  this.selectedItems[0], targetValue)
    }

    capaDecisionAction() {
      let APIParams=this.getAPICommonParams(this.actionBeingPerformedModel)    
      let endPointUrl=this.getActionAPIUrl(this.actionBeingPerformedModel)
      if (String(endPointUrl).toUpperCase().includes("ERROR")){
          alert(endPointUrl)
          return
      }
      let serviceAPIurl=this.getServiceAPIUrl(this.actionBeingPerformedModel)  
//      console.log('capaDecisionAction', 'reqParams', this.reqParams)
      let params = serviceAPIurl + endPointUrl   
        + '?' + new URLSearchParams(this.reqParams) + '&'+ new URLSearchParams(APIParams)
      this.fetchApi(params).then(() => {
        this.decisionDialog.close()
        this.resetDialogThings()
        this.reload()
      })
    }

    closeInvestigation() {
      let reqParams={}
      reqParams.investigationId = this.selectedItems[0].id
      let APIParams=this.getAPICommonParams(this.actionBeingPerformedModel)    
      let endPointUrl=this.getActionAPIUrl(this.actionBeingPerformedModel)
      if (String(endPointUrl).toUpperCase().includes("ERROR")){
          alert(endPointUrl)
          return
      }
      if (!this.selectedItems[0].capa_decision_on) {
        this.dispatchEvent(new CustomEvent("error", {
          detail: {
            is_error: true,
            message_en: "Required set decision before close",
            message_es: "Decisión de conjunto requerida antes del cierre"
          },
          bubbles: true,
          composed: true
        }))
        console.log("Required set decision before close")
        return
      }
      let serviceAPIurl=this.getServiceAPIUrl(this.actionBeingPerformedModel)  
      let params = serviceAPIurl + endPointUrl
        + '?' + new URLSearchParams(reqParams)+ '&'+ new URLSearchParams(APIParams)
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }


}}
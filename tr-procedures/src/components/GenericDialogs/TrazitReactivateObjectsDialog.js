import { html, nothing } from 'lit';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import { ActionsFunctions } from '../Actions/ActionsFunctions';
export function TrazitReactivateObjectsDialog(base) {
return class extends ActionsFunctions(base) {
    static get properties() {
        return {
            numDays: { type: Number },
            deactivatedObjects: { type: Array },
            selectedObjectToReactive: {type: Object}
        }
    }
    constructor() {
        super()
        this.numDays = 7
        this.deactivatedObjects = []
        this.selectedObjectToReactive = {}
    }
  
    noNegativeValues(e) {
      if (e.target.value <=0){
        this.numDays=0
        e.target.value=0
      }
      return
    }    

    reactivateObjectsDialog() {
        return html` 
        <tr-dialog id="reactivateObjectDialog" ?open=${this.actionBeingPerformedModel&&this.actionBeingPerformedModel.dialogInfo&&this.actionBeingPerformedModel.dialogInfo.name==='reactivateObjectDialog'} heading="" hideActions="" @open="${this.cleanReactivateObjectList}" scrimClickAction="">
        ${this.actionBeingPerformedModel===undefined||this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel.dialogInfo.name!=="reactivateObjectDialog" ? nothing :
        html`
        <style>
        mwc-select {        
          --mdc-theme-primary : rgba(36, 192, 235, 1);
          --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
          --mdc-select-ink-color: rgb(47, 47, 47);
          --mdc-select-dropdown-icon-color:rgba(36, 192, 235, 1);
          --mdc-select-hover-line-color:rgba(36, 192, 235, 1);
          --mdc-notched-outline-border-color: rgba(186, 235, 248, 0.4);
          --mdc-select-disabled-dropdown-icon-color:rgba(36, 192, 235, 1);
  
          font-family : Montserrat;
          font-weight : bold;
          font-size : 19px;
        }
        mwc-select.outlined {        
          --mdc-theme-primary : rgba(36, 192, 235, 1);
          --mdc-theme-text-primary-on-background : rgba(49, 130, 189, 1);
          --mdc-select-ink-color: rgba(36, 192, 235, 1);
          font-family : Montserrat;
          font-weight : bold;
          font-size : 19px;
          background-color: 4fcad029;
        }       
        div.reactivate{
          min-width:490px;
        }
  
        </style>
        <div class="layout vertical flex center-justified reactivate">        
                <div class="layout vertical flex">
                  <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="queryNumDays" type="number" 
                      .value=${this.numDays} @change=${e => this.numDays = e.target.value}
                      @input=${e=>this.noNegativeValues(e)}
                      label="${this.actionBeingPerformedModel.dialogInfo.fieldsObject.queryNumDays["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.setDays()}></mwc-textfield>
                    <mwc-icon-button icon="refresh" @click=${this.setDays}></mwc-icon-button>
                  </div>
                  <mwc-select id="objectToReactivateName" label="${this.actionBeingPerformedModel.dialogInfo.fieldsObject.objectName["label_" + this.lang]}" 
                    ?disabled=${!this.deactivatedObjects.length}>
                    ${!this.deactivatedObjects.length ? nothing : html`
                    ${this.deactivatedObjects.map((l, i) =>
                    html`<mwc-list-item value="${this.listItemValueToGet(l)}" ?selected=${i == 0}>${this.listItemValueToDisplay(l)}</mwc-list-item>`
                    )}
                    `}
                  </mwc-select>
                </div>     
          <div style="margin-top:30px;text-align:center">
            <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline" @click="${this.cleanReactivateObjectList}">
              ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
            <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.reactivateObjectDialogAction}>
              ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
          </div>
        </div>
        </tr-dialog>      
        `}
        `
    } 
    cleanReactivateObjectList(){
        this.deactivatedObjects= []
        this.selectedObjectToReactive={}
    }    
    setDays() {
        this.selectedDialogAction = this.actionBeingPerformedModel.dialogInfo.viewQuery
        this.GetAlternativeViewData(this.selectedDialogAction, false)
    }  
    listItemValueToGet(entry){
        if (this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel.dialogInfo.listDefinition===undefined||this.actionBeingPerformedModel.dialogInfo.listDefinition.keyFldName===undefined){
          alert('This selected action has no the requirements, requieres dialogInfo.listDefinition.keyFldName property, check the console')
          return entry["name"]
        }
        this.selectedObjectToReactive=entry
        return entry[this.actionBeingPerformedModel.dialogInfo.listDefinition.keyFldName]
    }
    listItemValueToDisplay(entry){
        if (this.actionBeingPerformedModel.dialogInfo===undefined||this.actionBeingPerformedModel.dialogInfo.listDefinition===undefined||this.actionBeingPerformedModel.dialogInfo.listDefinition.eachEntryTextGenerator===undefined){
            alert('This selected action has no the requirements, requieres dialogInfo.listDefinition.eachEntryTextGenerator property, check the console')
            return entry["name"]
        }
        let lFlds=this.actionBeingPerformedModel.dialogInfo.listDefinition.eachEntryTextGenerator
        let textToDisplay=''
        for (let i = 0; i < lFlds.length; i++) {
            if (lFlds[i].type=='fix'){textToDisplay=textToDisplay+lFlds[i].value}
            if (lFlds[i].type=='field'){textToDisplay=textToDisplay+entry[lFlds[i].value]}
        }
        return textToDisplay
    }
    reactivateObjectDialogAction() {
      this.trazitNoDialogRequired(this.actionBeingPerformedModel, this.selectedObjectToReactive, null, false, this.selectedObjectToReactive, null, null, null)
      this.cleanReactivateObjectList()
      return
    } 
    async getDeactivatedObjects() {
        // console.log('getDeactivatedObjects')
        let queryDefinition=this.actionBeingPerformedModel.dialogInfo.viewQuery
        this.deactivatedObjects = []
        let APIParams=this.getAPICommonParams(queryDefinition)
        let viewParams=this.jsonParam(queryDefinition)
        let endPointUrl=this.getQueryAPIUrl(queryDefinition)
        if (String(endPointUrl).toUpperCase().includes("ERROR")){
            alert(endPointUrl)
            return
        }
        let params = this.config.backendUrl + endPointUrl
          + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(viewParams)
        try {
          const response =await this.fetchApi(params)
          if (response && !response.is_error) {
            //console.log('deactivatedObjects', j.json())            
            this.deactivatedObjects = response
            if (this.deactivatedObjects.length===0){
              let log=""
              if (this.lang==="en"){
                log='No records found'
              }else{
                log='No se han encontrado objetos'
              }
              this.dispatchEvent(
                new CustomEvent("error", {
                  detail: { ...e, log: log },
                  bubbles: true,
                  composed: true,
                })  
              )
            }
          }
        } catch (error) {
          console.error('Error:', error);
          // Handle any errors that occurred during fetch or JSON parsing
        }        
    }
  
    
    get reactivateObjectDialog() {return this.shadowRoot.querySelector("tr-dialog#reactivateObjectDialog")}
    get queryNumDays() {return this.shadowRoot.querySelector("mwc-textfield#queryNumDays")}  
    get objectToReactivateName() {return this.shadowRoot.querySelector("mwc-select#objectToReactivateName")}
  
}}
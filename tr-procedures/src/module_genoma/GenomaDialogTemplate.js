import { html, nothing } from 'lit';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';

export function GenomaDialogTemplate(base) {
  return class extends base {
    static get properties() {
      return {
        // targetValue: { type: Object },
        // selectedDialogAction: { type: Object },
        // numDays: { type: Number },
        // deactivatedObjects: { type: Array },
        // dataForDialog: { type: Object },
        // fromGrid: { type: Boolean }
      }
    }

    constructor() {
      super()
    //   this.numDays = 7
    //   this.deactivatedObjects = []
    //   this.fromGrid = false
    }


    cleanFormFields(){
        if (this.text1){this.text1.value=''}
        if (this.number1){this.number1.value=''}
        if (this.list1){this.list1.value=''}
        if (this.list1){this.listMDprocedureUsers.value=''}
        
        //if (this.listSelectedStudyIndividuals){this.listSelectedStudyIndividuals.value=''}
      }
    genomaDialogsTemplate() {   
      //console.log('genomaDialogsTemplate') 
      return html`
        <tr-dialog id="genericFormDialog"         
        heading=""
        hideActions=""
        @closed=${() => this.cleanFormFields()}
        scrimClickAction="">
            ${this.selectedAction===undefined||this.selectedAction.dialogInfo===undefined ?
            html``: html`   
            <div class="layout vertical flex center-justified">
          ${this.selectedAction.dialogInfo.fieldText.map((fld, i) =>             
          html`
            ${!fld.text1 ?
                html``: html`        
                <div class="layout horizontal flex center-center">
                <mwc-textfield class="layout flex" id="text1" type="text" 
                .value=${fld.text1.default_value ? fld.text1.default_value : ''} @change=${e => this.numDays = e.target.value}
                label="${fld.text1["label_" + this.lang]}"
                @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                </div>
            `}          
            ${!fld.number1 ?
                html``: html`        
                <div class="layout horizontal flex center-center">
                <mwc-textfield class="layout flex" id="number1" type="number" 
                .value=${fld.number1.default_value ? fld.number1.default_value : ''} @change=${e => this.numDays = e.target.value}
                label="${fld.number1["label_" + this.lang]}"
                @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                </div>
            `}          
            ${!fld.list1 ?
            html``: html`        
                <mwc-select id="list1" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.list1&&fld.list1["label_" + this.lang]}">
                ${fld.list1.items.map((c, i) =>
                    html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
                )}
                </mwc-select>
            `}    
            ${!fld.listMDprocedureUsers ?
                html``: html`        
                    <mwc-select id="listMDprocedureUsers" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDprocedureUsers&&fld.listMDprocedureUsers["label_" + this.lang]}">
                    ${this.MDprocedureUsers.map((c, i) =>
                    html`<mwc-list-item value="${c.user_name}" ?selected=${i == 0}>${c.user_name}</mwc-list-item>`
                    )}
                    </mwc-select>
            `}           
            ${!fld.listMDvariablesSet ?
              html``: html`        
                  <mwc-select id="listMDvariablesSet" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDvariablesSet&&fld.listMDvariablesSet["label_" + this.lang]}">
                  ${this.MDvariablesSet.map((c, i) =>
                  html`<mwc-list-item value="${c.name}" ?selected=${i == 0}>${c.name}(${c.variables_list})</mwc-list-item>`
                  )}
                  </mwc-select>
            `}           
            ${!fld.listMDvariables ?
              html``: html`        
                  <mwc-select id="listMDvariables" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDvariables&&fld.listMDvariables["label_" + this.lang]}">
                  ${this.MDvariables.map((c, i) =>
                  html`<mwc-list-item value="${c.name}" ?selected=${i == 0}>${c.name}(${c.param_type})</mwc-list-item>`
                  )}
                  </mwc-select>
            `}           
       
            ${!fld.listSelectedStudyIndividuals ?
                html``: html`        
                    <mwc-select id="listSelectedStudyIndividuals" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listSelectedStudyIndividuals&&fld.listSelectedStudyIndividuals["label_" + this.lang]}">
                    ${this.selectedStudy.study_individual.map((l, i) =>
                    html`<mwc-list-item value="${this.listItemValueToGet(fld.listSelectedStudyIndividuals, l)}" ?selected=${i == 0}>${this.listItemValueToDisplay(fld.listSelectedStudyIndividuals, l)}</mwc-list-item>`
                    )}
                    </mwc-select>
            `}    
            ${!fld.listSelectedStudyIndividualSamples ?
              html``: html`        
                  <mwc-select id="listSelectedStudyIndividualSamples" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listSelectedStudyIndividualSamples&&fld.listSelectedStudyIndividualSamples["label_" + this.lang]}">
                  ${this.selectedStudy.study_individual.map((l, i) =>
                  html`<mwc-list-item value="${this.listItemValueToGet(fld.listSelectedStudyIndividualSamples, l)}" ?selected=${i == 0}>${this.listItemValueToDisplay(fld.listSelectedStudyIndividualSamples, l)}</mwc-list-item>`
                  )}
                  </mwc-select>
            `} 
          `            
          )}                                 
            <div style="margin-top:30px;text-align:center">
              <sp-button size="xl" variant="secondary" slot="secondaryAction" dialogAction="decline">
                  ${commonLangConfig.cancelDialogButton["label_" + this.lang]}</sp-button>
              <sp-button size="xl" slot="primaryAction" @click=${this.genomaSuperDialogClickedAction}>
                  ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
              </div>
            </div>
            `
            }    
        </tr-dialog>     
        
        <tr-dialog id="objectSetResultValue"         
            heading=""
            hideActions=""
            @closed=${() => this.cleanFormFields()}
            scrimClickAction="">
            ${this.selectedAction===undefined||this.selectedAction.dialogInfo===undefined ?
            html``: html`    
            <div class="layout vertical flex center-justified">
            ${!this.selectedAction.dialogInfo.fieldText.variableName ?
                html``: html`        
                <div class="layout horizontal flex center-center">
                <mwc-textfield class="layout flex" id="text1" type="text" 
                .value=${this.selectedAction.dialogInfo.fieldText.variableName.default_value ? this.selectedAction.dialogInfo.fieldText.variableName.default_value : this[this.selectedAction.selObjectVariableName][0].name} 
                label="${this.selectedAction.dialogInfo.fieldText.variableName["label_" + this.lang]}"
                disabled
                @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                ${this.enterResultList()}      
                </div>
            `}                  
            `}        
        </tr-dialog>      
          
    `}        
    get genericFormDialog() {return this.shadowRoot.querySelector("tr-dialog#genericFormDialog")    }
    get text1() {    return this.shadowRoot.querySelector("mwc-textfield#text1")    }        
    get number1() {    return this.shadowRoot.querySelector("mwc-textfield#number1")    }    
    get list1() {    return this.shadowRoot.querySelector("mwc-select#list1")    }
    get listSelectedStudyIndividuals() {    return this.shadowRoot.querySelector("mwc-select#listSelectedStudyIndividuals")    }    
    get listMDprocedureUsers() {    return this.shadowRoot.querySelector("mwc-select#listMDprocedureUsers")    }    
    get listMDvariablesSet() {    return this.shadowRoot.querySelector("mwc-select#listMDvariablesSet")    }    
    get listMDvariables() {    return this.shadowRoot.querySelector("mwc-select#listMDvariables")    }    
    get listSelectedStudyIndividualSamples() {    return this.shadowRoot.querySelector("mwc-select#listSelectedStudyIndividualSamples")    }    
    

    get objectSetResultValue() {return this.shadowRoot.querySelector("tr-dialog#objectSetResultValue")      }  

    enterResultList() {
        //console.log('enterResultList')
          return html`
          <mwc-textfield class="layout flex" id="text1" type="text" 
          .value=${this.selectedAction.dialogInfo.fieldText.variableName.default_value ? this.selectedAction.dialogInfo.fieldText.variableName.default_value : this[this.selectedAction.selObjectVariableName][0].name} 
          label="${this.selectedAction.dialogInfo.fieldText.variableName["label_" + this.lang]}"
          disabled
          @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
          ${this[this.selectedAction.selObjectVariableName][0].type}
          ${this[this.selectedAction.selObjectVariableName][0].value}      
          `    
      }
        

    listItemValueToGet(entry){
      if (this.selectedAction.dialogInfo===undefined||this.selectedAction.dialogInfo.listDefinition===undefined||this.selectedAction.dialogInfo.listDefinition.keyFldName===undefined){
        alert('This selected action has no the requirements, requieres dialogInfo.listDefinition.keyFldName property, check the console')
        console.log('this.selectedAction', this.selectedAction)
        return entry["name"]
      }
      return entry[this.selectedAction.dialogInfo.listDefinition.keyFldName]
    }
    listItemValueToDisplay(entry){
      if (this.selectedAction.dialogInfo===undefined||this.selectedAction.dialogInfo.listDefinition===undefined||this.selectedAction.dialogInfo.listDefinition.eachEntryTextGenerator===undefined){
        alert('This selected action has no the requirements, requieres dialogInfo.listDefinition.eachEntryTextGenerator property, check the console')
        console.log('this.selectedAction', this.selectedAction)
        return entry["name"]
      }
      var lFlds=this.selectedAction.dialogInfo.listDefinition.eachEntryTextGenerator
      var textToDisplay=''
      for (var i = 0; i < lFlds.length; i++) {
        if (lFlds[i].type=='fix'){textToDisplay=textToDisplay+lFlds[i].value}
        if (lFlds[i].type=='field'){textToDisplay=textToDisplay+entry[lFlds[i].value]}
      }
      return textToDisplay
      //return entry["description"]+' ('+entry["name"]+')'
    }
    listItemValueToGet(fieldDef, entry){
      console.log('fieldDef', fieldDef, 'entry', entry)      
      if (fieldDef===undefined||fieldDef.keyFldName===undefined){
        alert('This selected action has no the requirements, requieres dialogInfo.keyFldName property, check the console')        
        return entry["name"]
      }
      return entry[fieldDef.keyFldName]
    }
    listItemValueToDisplay(fieldDef, entry){
      console.log('fieldDef', fieldDef, 'entry', entry)
      if (fieldDef===undefined||fieldDef.eachEntryTextGenerator===undefined){
        alert('This selected action has no the requirements, requieres dialogInfo.eachEntryTextGenerator property, check the console')
        return entry["name"]
      }
      var lFlds=fieldDef.eachEntryTextGenerator
      var textToDisplay=''
      for (var i = 0; i < lFlds.length; i++) {
        if (lFlds[i].type=='fix'){textToDisplay=textToDisplay+lFlds[i].value}
        if (lFlds[i].type=='field'){textToDisplay=textToDisplay+entry[lFlds[i].value]}
      }
      return textToDisplay
      //return entry["description"]+' ('+entry["name"]+')'
    }
   
  }
}
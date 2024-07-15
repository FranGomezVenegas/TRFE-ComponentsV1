import { html } from 'lit';
import { until } from 'lit/directives/until.js';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import {DialogsFunctions} from './DialogsFunctions';
export function TrazitFormsElements(base) {
  return class extends DialogsFunctions(base) {
    static get properties() {
      return {
        selectedResults: { type: Array },
        enterResults: { type: Array },
        microorganismList: { type: Array },
        selectedAssigns: { type: Array },
        assignList: { type: Array },
        targetValue: { type: Object },
        selectedDialogAction: { type: Object },
        lotDays: { type: Number },
        deactivatedLots: { type: Array },
        openInvests: { type: Array },
        selectedInvestigations: { type: Array },
        capaRequired: { type: Boolean },
        selectedStucks: { type: Array },
        dataForDialog: { type: Object },
        familyList: { type: Array },
        microName: { type: String },
        fromGrid: { type: Boolean },
        fields:{type: Array},
        declineDialog:{type: Object},
        masterData:{type: Object}
      }
    }

    constructor() {
      super()
      this.lotDays = 7
      this.deactivatedLots = []
      this.microorganismList = []
      this.familyList = []
      this.capaRequired = false
      this.fromGrid = false
      this.fields=[]
      this.actionBeingPerformedModel={}
      this.fieldsShouldBeReset=true
      this.masterData={}
    }
    openThisDialog(actionModel = this.actionBeingPerformedModel){
       if (!actionModel||!actionModel.dialogInfo||!actionModel.dialogInfo.fields){
        //alert(false)
        return false
       }      
       // alert(true)
       this.defaultValue()
       //this.resetFields()
       return true 
    }
        
    
    setValidVal(e, fieldDef) {
        console.log('setValidVal', e, 'fieldDef', fieldDef)
        
      if (fieldDef.min_allowed!==undefined && typeof fieldDef.min_allowed == 'number' && e.target.value < fieldDef.min_allowed) {
        e.target.value = fieldDef.min_allowed
        return
      }
      if ( fieldDef.max_allowed!==undefined && typeof fieldDef.max_allowed == 'number' && e.target.value > fieldDef.max_allowed) {
        e.target.value = fieldDef.max_allowed
        return
      }
      // make sure the decimal length <= max_dp when manual input
      if (fieldDef.max_dp!==undefined && fieldDef.max_dp) {
        let v = e.target.value.split(".")
        if (v.length > 1 && v[1].length > fieldDef.max_dp) {
          v[1] = v[1].substring(0, fieldDef.max_dp)
          e.target.value = Number(v.join("."))
        }
      }
    }    
    fieldLabel(fld){        
        let fldLbl= fld["label_" + this.lang]
        if (fld.optional===undefined||fld.optional===false){
            fldLbl="* "+fldLbl
        }
        return fldLbl
    }
    isFieldDisabled(fld){        
        if (fld.disabled!==undefined&&fld.disabled===true){
            return true
        }
        return false
    }

    fldDefaultValue(fldDef){
        //console.log('fldDefaultValue', 'fldDef', fldDef)
        let curArgName=""
        if (fldDef.default_value){
            return fldDef.default_value
        } else if (fldDef.internalVariableSimpleObjName&&fldDef.internalVariableSimpleObjProperty) {          
            if (this[fldDef.internalVariableSimpleObjName]===undefined||this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]===undefined){
              let msg=""
              if (this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]===undefined){
                msg='The object '+fldDef.internalVariableSimpleObjName+' has no one property called '+fldDef.internalVariableSimpleObjProperty
                alert(msg)
              }else{
                msg='there is no object called '+fldDef.internalVariableSimpleObjName+' in this view'
                alert(msg)
              }
              return "ERROR: "+msg
            }  
            return this[fldDef.internalVariableSimpleObjName][fldDef.internalVariableSimpleObjProperty]          
        } else if (fldDef.internalVariableObjName&&fldDef.internalVariableObjProperty) {          
            if (this[fldDef.internalVariableObjName]===undefined||this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]===undefined){
            let msg=""
            if (this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]===undefined){
                msg='The object '+fldDef.internalVariableObjName+' has no one property called '+fldDef.internalVariableObjProperty
                alert(msg)
                //console.log(msg, this[fldDef.internalVariableObjName][0])
            }else{
                msg='there is no object called '+fldDef.internalVariableObjName+' in this view'
                alert(msg)
            }
        //    alert('No family selected')
            return "ERROR: "+msg
            }  
            return this[fldDef.internalVariableObjName][0][fldDef.internalVariableObjProperty]
        
        } else if (fldDef.element) {
        
        } else if (fldDef.defaultValue) {
        if (fldDef.isAdhocField!==undefined&&fldDef.isAdhocField===true){
            curArgName=jsonParam[fldDef.argumentName]
            if (curArgName===undefined){curArgName=''}
            if (curArgName.length>0){curArgName=curArgName+"|"}
            curArgName=curArgName+fldDef.defaultValue
            if (fldDef.fieldType!==undefined){
            curArgName=curArgName+"*"+fldDef.fieldType
            }
            return curArgName
        }else{
            return fldDef.defaultValue // get value from default value (i.e incubator)
        }
        } else if (fldDef.selObjectPropertyName) {
            return selObject[fldDef.selObjectPropertyName] // get value from selected item
        } else if (fldDef.targetValue) {
            return targetValue[fldDef.argumentName] // get value from target element passed
        } else if (fldDef.fixValue) {
            return fldDef.fixValue
        } else if (fldDef.contextVariableName) {
            return this[fldDef.contextVariableName]
        } else {
            return ""
        }

    }

    /** Date Template Dialog part  @open=${this.defaultValue()}*/
    genericFormElements(fields, withEnterKey = false, keydownHandler = null) {
        if (fields===undefined){fields=[]}
        // if (this.actionBeingPerformedModel.dialogInfo === undefined) {
        //     //alert('genericFormElements has no dialogInfo')
        //     return nothing
        // }
        // if (this.actionBeingPerformedModel!==undefined&&this.actionBeingPerformedModel.dialogInfo!==undefined&&this.actionBeingPerformedModel.dialogInfo.name === "genericDialog"){
        //     let dlgFlds=fields
        //     if (dlgFlds===undefined){
        //         alert('The dialog '+this.actionBeingPerformedModel.dialogInfo.name+' has no fields property for adding the fields, please review.')
        //         return nothing
        //     }
        // }    

         // @closed=${this.resetFields} this is in use but moved to be executed about to perform the fetchApi 
         //     otherwise it is not compatible with actions requiring credentials dialog.
         this.fields=fields
     
    return html`
    <style>
    mwc-textfield {
        border-style : Solid;
        border-color : #999999;
        border-color : rgba(153, 153, 153, 1);
        border-width : 1px;
        border-radius : 7px;
        -moz-border-radius : 7px;
        -webkit-border-radius : 7px;   
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background-color :  #FFFFFF;
        background-color : rgb(255, 255, 255);  
        --mdc-text-field-idle-line-color:#148CFA;
        --mdc-text-field-outlined-idle-border-color: #148CFA;
        --mdc-text-field-label-ink-color:  #148CFA;
        --mdc-text-field-focused-label-color: #148CFA;
        --mdc-theme-primary: #0465FB;
      }
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
      mwc-formfield{        
        --mdc-theme-secondary: #1473e6;
      }      
    </style>
        ${!fields ?
            html``: html`              
            ${fields.map((fld, i) =>             
                html`            
                ${!fld.filtertext1 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext1" type="text" .value=${until(this.fldDefaultValue(fld.filtertext1), '')} label="${this.fieldLabel(fld.filtertext1)}"  ?disabled=${this.isFieldDisabled(fld.filtertext1)} 
                        @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>

                    </div>
                `}          
                ${!fld.text1 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text1" type="text" .value=${until(this.fldDefaultValue(fld.text1), '')}  label="${this.fieldLabel(fld.text1)}" ?disabled=${this.isFieldDisabled(fld.text1)}
                        @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}          
                ${!fld.filtertext2 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext2" type="text" .value=${until(this.fldDefaultValue(fld.filtertext2), '')} label="${this.fieldLabel(fld.filtertext2)}" ?disabled=${this.isFieldDisabled(fld.filtertext2)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}          
                ${!fld.filtertext3 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext3" type="text" .value=${until(this.fldDefaultValue(fld.filtertext3), '')} label="${this.fieldLabel(fld.filtertext3)}" ?disabled=${this.isFieldDisabled(fld.filtertext3)}
                        @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}                       
                ${!fld.filtertext4 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext4" type="text" .value=${until(this.fldDefaultValue(fld.filtertext4), '')} label="${this.fieldLabel(fld.filtertext4)}" ?disabled=${this.isFieldDisabled(fld.filtertext4)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}          
                ${!fld.filtertext5 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext5" type="text" .value=${until(this.fldDefaultValue(fld.filtertext5), '')} label="${this.fieldLabel(fld.filtertext5)}"  ?disabled=${this.isFieldDisabled(fld.filtertext5)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}          
                ${!fld.filtertext6 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext6" type="text" .value=${until(this.fldDefaultValue(fld.filtertext6), '')} label="${this.fieldLabel(fld.filtertext6)}"  ?disabled=${this.isFieldDisabled(fld.filtertext6)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}          
                ${!fld.filtertext7 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext7" type="text" .value=${until(this.fldDefaultValue(fld.filtertext7), '')} label="${this.fieldLabel(fld.filtertext7)}"  ?disabled=${this.isFieldDisabled(fld.filtertext7)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}          
                ${!fld.filtertext8 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext8" type="text" .value=${until(this.fldDefaultValue(fld.filtertext8), '')} label="${this.fieldLabel(fld.filtertext8)}" ?disabled=${this.isFieldDisabled(fld.filtertext8)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}          
                ${!fld.filtertext9 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext9" type="text" .value=${until(this.fldDefaultValue(fld.filtertext9), '')} label="${this.fieldLabel(fld.filtertext9)}" ?disabled=${this.isFieldDisabled(fld.filtertext9)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}          
                ${!fld.filtertext10 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filtertext10" type="text" .value=${until(this.fldDefaultValue(fld.filtertext10), '')} label="${this.fieldLabel(fld.filtertext10)}" ?disabled=${this.isFieldDisabled(fld.filtertext10)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}                              
                ${!fld.filternumber1 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber1" type="number" 
                    @input=${e=>this.setValidVal(e, fld)} .value=${this.fldDefaultValue(fld.filternumber1)} label="${this.fieldLabel(fld.filternumber1)}" ?disabled=${this.isFieldDisabled(fld.filternumber1)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}   
                ${!fld.filternumber2 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber2" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.filternumber2)}   label="${this.fieldLabel(fld.filternumber2)}" ?disabled=${this.isFieldDisabled(fld.filternumber2)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}   
                ${!fld.filternumber3 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber3" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.filternumber3)}   label="${this.fieldLabel(fld.filternumber3)}" ?disabled=${this.isFieldDisabled(fld.filternumber3)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}   
                ${!fld.filternumber4 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber4" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.filternumber4)}   label="${this.fieldLabel(fld.filternumber4)}" ?disabled=${this.isFieldDisabled(fld.filternumber4)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}   
                ${!fld.filternumber5 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber5" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.filternumber5)}   label="${this.fieldLabel(fld.filternumber5)}" ?disabled=${this.isFieldDisabled(fld.filternumber5)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}   
                ${!fld.filternumber6 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber6" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.filternumber6)}  label="${this.fieldLabel(fld.filternumber6)}" ?disabled=${this.isFieldDisabled(fld.filternumber6)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}   
                ${!fld.filternumber7 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber7" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.filternumber7)}   label="${this.fieldLabel(fld.filternumber7)}" ?disabled=${this.isFieldDisabled(fld.filternumber7)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}   
                ${!fld.filternumber8 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber8" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.filternumber8)}   label="${this.fieldLabel(fld.filternumber8)}" ?disabled=${this.isFieldDisabled(fld.filternumber8)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}   
                ${!fld.filternumber9 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber9" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.filternumber9)}   label="${this.fieldLabel(fld.filternumber9)}" ?disabled=${this.isFieldDisabled(fld.filternumber9)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}   
                ${!fld.filternumber10 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="filternumber10" type="number" @input=${e=>this.setValidVal(e, fld)}
                    .value=${this.fldDefaultValue(fld.filternumber10)}   label="${this.fieldLabel(fld.filternumber10)}" ?disabled=${this.isFieldDisabled(fld.filternumber10)}
                    @keydown=${withEnterKey ? keydownHandler : nothing} ></mwc-textfield>
                    </div>
                `}   
                ${!fld.filtercheckbox1 ?
                    html``: html`        
                    <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox1)}" >
                        <mwc-checkbox id="filtercheckbox1" ?checked=${this.fldDefaultValue(fld.filtercheckbox1)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox1)}
                        @change=${e => { this.filtercheckbox1.value=this.filtercheckbox1.checked}} value="${this.fldDefaultValue(fld.filtercheckbox1)}"
                        ></mwc-checkbox>
                    </mwc-formfield>
                `}                              
                    ${!fld.filtercheckbox2 ?
                    html``: html`        
                    <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox2)}" >
                        <mwc-checkbox id="filtercheckbox2" ?checked=${this.fldDefaultValue(fld.filtercheckbox2)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox2)}
                        @change=${e => { this.filtercheckbox2.value=this.filtercheckbox2.checked}} value="${this.fldDefaultValue(fld.filtercheckbox2)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.filtercheckbox3 ?
                    html``: html`        
                    <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox3)}" >
                        <mwc-checkbox id="filtercheckbox3" ?checked=${this.fldDefaultValue(fld.filtercheckbox3)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox3)}
                        @change=${e => { this.filtercheckbox3.value=this.filtercheckbox3.checked}} value="${this.fldDefaultValue(fld.filtercheckbox3)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.filtercheckbox4 ?
                    html``: html`        
                    <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox4)}" >
                        <mwc-checkbox id="filtercheckbox4" ?checked=${this.fldDefaultValue(fld.filtercheckbox4)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox4)}
                        @change=${e => { this.filtercheckbox4.value=this.filtercheckbox4.checked}} value="${this.fldDefaultValue(fld.filtercheckbox4)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.filtercheckbox5 ?
                    html``: html`        
                        <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox5)}" >
                        <mwc-checkbox id="filtercheckbox5" ?checked=${this.fldDefaultValue(fld.filtercheckbox5)} @change=${e => { this.filtercheckbox5.value=this.filtercheckbox5.checked}}
                        value="${this.fldDefaultValue(fld.filtercheckbox5)}" ?disabled=${this.isFieldDisabled(fld.filtercheckbox5)}
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.filtercheckbox6 ?
                    html``: html`        
                        <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox6)}" >
                        <mwc-checkbox id="filtercheckbox6" ?checked=${this.fldDefaultValue(fld.filtercheckbox6)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox6)}
                        @change=${e => { this.filtercheckbox6.value=this.filtercheckbox6.checked}} value="${this.fldDefaultValue(fld.filtercheckbox6)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.filtercheckbox7 ?
                    html``: html`        
                        <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox7)}" >
                        <mwc-checkbox id="filtercheckbox7" ?checked=${this.fldDefaultValue(fld.filtercheckbox7)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox7)}
                        @change=${e => { this.filtercheckbox7.value=this.filtercheckbox7.checked}} value="${this.fldDefaultValue(fld.filtercheckbox7)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.filtercheckbox8 ?
                    html``: html`        
                        <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox8)}" >
                        <mwc-checkbox id="filtercheckbox8" ?checked=${this.fldDefaultValue(fld.filtercheckbox8)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox8)}
                        @change=${e => { this.filtercheckbox8.value=this.filtercheckbox8.checked}} value="${this.fldDefaultValue(fld.filtercheckbox8)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.filtercheckbox9 ?
                    html``: html`        
                        <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox9)}" >
                        <mwc-checkbox id="filtercheckbox9" ?checked=${this.fldDefaultValue(fld.filtercheckbox9)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox9)}
                        @change=${e => { this.filtercheckbox9.value=this.filtercheckbox9.checked}} value="${this.fldDefaultValue(fld.filtercheckbox9)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.filtercheckbox10 ?
                    html``: html`        
                        <mwc-formfield label="${this.fieldLabel(fld.filtercheckbox10)}" >
                        <mwc-checkbox id="filtercheckbox10" ?checked=${this.fldDefaultValue(fld.filtercheckbox10)} ?disabled=${this.isFieldDisabled(fld.filtercheckbox10)}
                        @change=${e => { this.filtercheckbox10.value=this.filtercheckbox10.checked}} value="${this.fldDefaultValue(fld.filtercheckbox10)}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              

                    ${!fld.filterdate1 ?html``: html`<mwc-textfield id="filterdate1" label="${this.fieldLabel(fld.filterdate1)}"  ?disabled=${this.isFieldDisabled(fld.filterdate1)} type="date"></mwc-textfield>`}
                    ${!fld.filterdate2 ?html``: html`<mwc-textfield id="filterdate2" label="${this.fieldLabel(fld.filterdate2)}"  ?disabled=${this.isFieldDisabled(fld.filterdate2)} type="date"></mwc-textfield>`}
                    ${!fld.filterdate3 ?html``: html`<mwc-textfield id="filterdate3" label="${this.fieldLabel(fld.filterdate3)}"  ?disabled=${this.isFieldDisabled(fld.filterdate3)} type="date"></mwc-textfield>`}
                    ${!fld.filterdate4 ?html``: html`<mwc-textfield id="date4" label="${this.fieldLabel(fld.filterdate4)}"  ?disabled=${this.isFieldDisabled(fld.filterdate4)} type="date"></mwc-textfield>`}
                    ${!fld.filterdate5 ?html``: html`<mwc-textfield id="date5" label="${this.fieldLabel(fld.filterdate5)}"  ?disabled=${this.isFieldDisabled(fld.filterdate5)} type="date"></mwc-textfield>`}                           
                    ${!fld.filterdate6 ?html``: html`<mwc-textfield id="date6" label="${this.fieldLabel(fld.filterdate6)}"  ?disabled=${this.isFieldDisabled(fld.filterdate6)} type="date"></mwc-textfield>`} 
                    ${!fld.filterdate7 ?html``: html`<mwc-textfield id="date7" label="${this.fieldLabel(fld.filterdate7)}"  ?disabled=${this.isFieldDisabled(fld.filterdate7)} type="date"></mwc-textfield>`}
                    ${!fld.filterdate8 ?html``: html`<mwc-textfield id="date8" label="${this.fieldLabel(fld.filterdate8)}"  ?disabled=${this.isFieldDisabled(fld.filterdate8)} type="date"></mwc-textfield>`}
                    ${!fld.filterdate9 ?html``: html`<mwc-textfield id="date9" label="${this.fieldLabel(fld.filterdate9)}"  ?disabled=${this.isFieldDisabled(fld.filterdate9)} type="date"></mwc-textfield>`}
                    ${!fld.filterdate10 ?html``: html`<mwc-textfield id="filterdate10" label="${this.fieldLabel(fld.filterdate10)}  ?disabled=${this.isFieldDisabled(fld.filterdate10)}" type="date"></mwc-textfield>`}

                    ${!fld.filterdatetime1 ?html``: html`<input id="datetime1" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.filterdatetime2 ?html``: html`<input id="datetime2" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.filterdatetime3 ?html``: html`<input id="datetime3" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.filterdatetime4 ?html``: html`<input id="datetime4" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.filterdatetime5 ?html``: html`<input id="datetime5" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.filterdatetime6 ?html``: html`<input id="datetime6" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.filterdatetime7 ?html``: html`<input id="datetime7" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.filterdatetime8 ?html``: html`<input id="datetime8" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.filterdatetime9 ?html``: html`<input id="datetime9" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.filterdatetime10 ?html``: html`<input id="datetime10" type="datetime-local" dialogInitialFocus>`}   

                    
                    ${!fld.filterdaterange1 ?
                        html``: html`    
                            <div style="display:flex">    
                            <mwc-textfield id="filterdaterange1dateStart" label="${this.fieldLabel(fld.filterdaterange1.filterdateStart)}" type="date" value="${until(this.fldDefaultValue(fld.filterdaterange1.filterdateStart), '')}"></mwc-textfield>
                            <mwc-textfield id="filterdaterange1dateEnd" label="${this.fieldLabel(fld.filterdaterange1.filterdateEnd)}" type="date" value="${until(this.fldDefaultValue(fld.filterdaterange1.filterdateEnd), '')}"></mwc-textfield>
                            </div>
                        `}                       
                    ${!fld.filterdaterange1 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange1dateStart" label="${this.fieldLabel(fld.filterdaterange1.filterdateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange1dateEnd" label="${this.fieldLabel(fld.filterdaterange1.filterdateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `}                       
                    ${!fld.filterdaterange2 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange2dateStart" label="${this.fieldLabel(fld.filterdaterange2.filterdateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange2dateEnd" label="${this.fieldLabel(fld.filterdaterange2.filterdateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `}                       
                    ${!fld.filterdaterange3 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange3dateStart" label="${this.fieldLabel(fld.filterdaterange3.filterdateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange3dateEnd" label="${this.fieldLabel(fld.filterdaterange3.filterdateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `}                       
                    ${!fld.filterdaterange4 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange4dateStart" label="${this.fieldLabel(fld.filterdaterange4.filterdateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange4dateEnd" label="${this.fieldLabel(fld.filterdaterange4.filterdateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `}                       
                    ${!fld.filterdaterange5 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange5dateStart" label="${this.fieldLabel(fld.filterdaterange5.filterdateStart)}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange5dateEnd" label="${this.fieldLabel(fld.filterdaterange5.filterdateEnd)}" type="date"></mwc-textfield>
                        </div>
                    `}                                   

                ${!fld.filterlist1 ?html``: html`        
                    <mwc-select id="list1" label="${this.fieldLabel(fld.filterlist1)}" @selected=${this.valueSelected}  ?disabled=${this.isFieldDisabled(fld.filterlist1)} >
                        ${this.filterlistEntries(fld.filterlist1)}</mwc-select>`}  
                ${!fld.filterlist2 ?html``: html`        
                    <mwc-select id="list2" label="${this.fieldLabel(fld.filterlist2)}" ?disabled=${this.isFieldDisabled(fld.filterlist2)} >
                        ${this.filterlistEntries(fld.filterlist2)}</mwc-select>`}  
                ${!fld.filterlist3 ?html``: html`        
                    <mwc-select id="list3" label="${this.fieldLabel(fld.filterlist3)}" ?disabled=${this.isFieldDisabled(fld.filterlist3)} >
                        ${this.filterlistEntries(fld.filterlist3)}</mwc-select>`}  
                ${!fld.filterlist4 ?html``: html`        
                    <mwc-select id="list4" label="${this.fieldLabel(fld.filterlist4)}"  ?disabled=${this.isFieldDisabled(fld.filterlist4)} >
                        ${this.filterlistEntries(fld.filterlist4)}</mwc-select>`}  
                ${!fld.filterlist5 ?html``: html`        
                    <mwc-select id="list5" label="${this.fieldLabel(fld.filterlist5)}"  ?disabled=${this.isFieldDisabled(fld.filterlist5)} >
                        ${this.filterlistEntries(fld.filterlist5)}</mwc-select>`}  
                ${!fld.filterlist6 ?html``: html`        
                    <mwc-select id="list6" label="${this.fieldLabel(fld.filterlist6)}" ?disabled=${this.isFieldDisabled(fld.filterlist6)} >
                        ${this.filterlistEntries(fld.filterlist6)}</mwc-select>`}  
                ${!fld.filterlist7 ?html``: html`        
                    <mwc-select id="list7" label="${this.fieldLabel(fld.filterlist7)}" ?disabled=${this.isFieldDisabled(fld.filterlist7)} >
                        ${this.filterlistEntries(fld.filterlist7)}</mwc-select>`}  
                ${!fld.filterlist8 ?html``: html`        
                    <mwc-select id="list8" llabel="${this.fieldLabel(fld.filterlist8)}" ?disabled=${this.isFieldDisabled(fld.filterlist8)} >
                        ${this.filterlistEntries(fld.filterlist8)}</mwc-select>`}  
                ${!fld.filterlist9 ?html``: html`        
                    <mwc-select id="list9" label="${this.fieldLabel(fld.filterlist9)}" ?disabled=${this.isFieldDisabled(fld.filterlist9)} >
                        ${this.filterlistEntries(fld.filterlist9)}</mwc-select>`}  
                ${!fld.filterlist10 ?html``: html`        
                    <mwc-select id="list10" label="${this.fieldLabel(fld.filterlist10)}" ?disabled=${this.isFieldDisabled(fld.filterlist10)} >
                        ${this.filterlistEntries(fld.filterlist10)}</mwc-select>`}  

                `            
            )}   
        `}        
    `
    }
    get dateInput() {return this.shadowRoot.querySelector("input#dateInput")}
    setNewDate() {
      if (this.filterdateInput.value) {
        this.dialogAccept(false)
      }
    }
    declineDialog(){
        this.fieldsShouldBeReset=true
    }
    acceptedGenericDialog(e){
        this.fieldsShouldBeReset=true
        if (this.checkMandatoryFieldsNotEmpty()){
            this.dialogAccept(false)
        }else{
            console.log('Accepted Generic Dialog but mandatories pending then action not performed')
           // alert('mandatories pending')
           e.stopPropagation();
        }
    }
    checkMandatoryFieldsNotEmpty(){                
        //console.log(this.fields)
        let dlgFlds=this.fields
        for (let i=0;i<dlgFlds.length;i++){            
            let fldObj=dlgFlds[i]
            //console.log('checkMandatoryFieldsNotEmpty', fldObj)
            let keyName=Object.keys(fldObj)
            let fldDef=fldObj[keyName[0]]
            if ((fldDef.optional===undefined||
                fldDef.optional===false)&&this[keyName].value.length==0){
                alert('Field '+fldDef["label_"+this.lang]+' is mandatory')
                return false
            }
        }
        return true
    }

    defaultValue(){
        if (this.fieldsShouldBeReset===true){
            this.resetFields()
            this.fieldsShouldBeReset=false
        }
        let dlgFlds=fields
        if (dlgFlds===undefined){
            //alert('The dialog '+this.actionBeingPerformedModel.dialogInfo.name+' has no fields property for adding the fields, please review.')
            return
        }
        for (let i=0;i<dlgFlds.length;i++){
            let fldObj=dlgFlds[i]
            let keyName=Object.keys(fldObj)
            
            //if (==null){            
            if (fldObj[keyName].default_value!==undefined&&fldObj[keyName].default_value!==null){
                //if (this[keyName[0]!==null]){
                    this[keyName[0]].value=fldObj[keyName].default_value
                //}
            }
            if (fldObj[keyName].selObjectPropertyName!==undefined&&fldObj[keyName].selObjectPropertyName!==null){
                this[keyName[0]].value=this.selectedItems[0][fldObj[keyName].selObjectPropertyName]
            }
            if (fldObj[keyName].internalVariableObjName!==undefined&&fldObj[keyName].internalVariableObjName!==null&&
                fldObj[keyName].internalVariableObjProperty!==undefined&&fldObj[keyName].internalVariableObjProperty!==null){
                this[keyName[0]].value=this[fldObj[keyName].internalVariableObjName][0][fldObj[keyName].internalVariableObjProperty]
            }
        }
    }    
    resetFields(){           
        //alert('reset Fields now')   
        let dlgFlds=fields
        if (dlgFlds===undefined){
            //alert('The dialog '+this.actionBeingPerformedModel.dialogInfo.name+' has no fields property for adding the fields, please review.')
            return
        }
        for (let i=0;i<dlgFlds.length;i++){
            let fldObj=dlgFlds[i]            
            let keyName=Object.keys(fldObj)
            if (this[keyName]!==null){
               // console.log(keyName[0])
                if (keyName[0].includes('list')){

                    this[keyName[0]].value=[]
                }else{
                    if (this[keyName]!==undefined&&this[keyName[0]]!==undefined){
                        this[keyName[0]].value=""
                    }
                }
            }
        }
    }
    valueSelected(e){
        return // The code below is there only for trying to make lists depending on another list, does not work yet
        //alert('ds '+ e.target.id+this[e.target.id].value)

        // let triggeredElem=fields.filter(p => p == e.target.id)

        let cleanParams = {}
        // Object.entries(fields).map(([key, value]) => {
        //   if (value != null || value != undefined) {
        //     cleanParams[key] = value
        //   }
        // })
        // console.log('cleanParams', cleanParams)
        let fld =fields[1].filterlist2//(([key, value]) =>{
            //cleanParams=value
        //})
        console.log('fld', fld)
        let thisNewList2=[]
        thisNewList2=this.filterlistEntries(fld)
        console.log('thisNewList2', thisNewList2)
        //alert(fields[e.target.id].valuesFromMasterData.recalculateObjectOnEntrySelected)
        //console.log(e.targetValue)
    }
    listEntries(fld){
        console.log('listEntries')
        let blankEmpty={keyName:"", keyValue_en:"", keyValue_es:""}
        let newList=[]
        if (fld===undefined){
            return html`<mwc-list-item></mwc-list-item>`

        }
        if (fld.addBlankValueOnTop!==undefined&&fld.addBlankValueOnTop===true){
            newList.push(blankEmpty)
        }
        if (fld.valuesFromMasterData!==undefined){
            let MDentriesArr=this.filterlistEntriesFromMasterData(fld.valuesFromMasterData)
            if (MDentriesArr.length>0){
                MDentriesArr.forEach(item =>newList.push(item))
            }
        }else{
            fld.items.forEach(item =>newList.push(item))
        }
        if (fld.addBlankValueAtBottom!==undefined&&fld.addBlankValueAtBottom===true){
            newList.push(blankEmpty)
        }
    
        return html`
        ${newList.map((c, i) =>
            html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
        )}
        `
    }
    listEntriesFromMasterData(fldMDDef){
        if (this.masterData===undefined){return entries}
        console.log('masterData', this.masterData)
        console.log('actionBeingPerformedModel', this.actionBeingPerformedModel)
        let entries=[]
        
        if (this.masterData[fldMDDef.propertyNameContainer]===undefined){
            alert('Property '+fldMDDef.propertyNameContainer+' not found in Master Data')
            return entries
        }
        if (fldMDDef.filterInFirstLevel===undefined||fldMDDef.filterInFirstLevel!==true){
            this.masterData[fldMDDef.propertyNameContainer].forEach(item =>{
                console.log('item', item, 'fldMDDef.propertyNameContainer.propertyKeyName', fldMDDef.propertyKeyName)
                let blankEmpty={keyName:'', keyValue_en:'', keyValue_es:''}
                blankEmpty.keyName=item[fldMDDef.propertyKeyName]
                blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn]
                blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs]
                console.log('blankEmpty', blankEmpty)
                entries.push(blankEmpty)
            })
        }else{
            if ((fldMDDef.elementName===undefined||fldMDDef.elementName===null)&&(fldMDDef.propertyNameContainerLevelfixValue===undefined||fldMDDef.propertyNameContainerLevelfixValue===null)){
                alert('Property elementName or propertyNameContainerLevelfixValue is mandatory when filterInFirstLevel=true. Review model definition')
                return entries
            }
            let filterValue=undefined
            if (fldMDDef.propertyNameContainerLevelfixValue!==undefined){
                filterValue=fldMDDef.propertyNameContainerLevelfixValue                
            }else{
                filterValue=this[fldMDDef.elementName].value
            }
            if (filterValue===undefined){return entries}
            let result = this.masterData[fldMDDef.propertyNameContainer].find(item => item.name === filterValue);
            if (result===undefined){return entries}
            //alert(filterValue)
            // if (fldMDDef.propertyNameContainerLevel2fixValue!==undefined&&fldMDDef.propertyNameContainerLevel3){
            //     entries=getListInLevel3(fldMDDef, result[fldMDDef.propertyNameContainerLevel2])
            //     return entries
            // }
            result[fldMDDef.propertyNameContainerLevel2].forEach(item =>{
                console.log('item', item, 'fldMDDef.propertyNameContainer.propertyKeyName', fldMDDef.propertyKeyName)
                let blankEmpty={keyName:'', keyValue_en:'', keyValue_es:''}
                blankEmpty.keyName=item[fldMDDef.propertyKeyName]
                blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn]
                blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs]
                console.log('blankEmpty', blankEmpty)
                entries.push(blankEmpty)
            })
            console.log('entries at end', entries)
            return entries
            
        }        
        //let blankEmpty={keyName:"1", keyValue_en:"2", keyValue_es:"3"}
        //entries.push(blankEmpty)
        return entries
    }
    getListInLevel3(fldMDDef, level2Arr){
        let level3Arr = level2Arr.filter(p => p[propertyNameContainerLevel2PropertyKeyName] == fldMDDef.propertyNameContainerLevel2fixValue)
        level3Arr[fldMDDef.propertyNameContainerLevel3].forEach(item =>{
            console.log('item', item, 'fldMDDef.propertyNameContainer.propertyKeyName', fldMDDef.propertyNameContainerLevel2PropertyKeyName)
            let blankEmpty={keyName:'', keyValue_en:'', keyValue_es:''}
            blankEmpty.keyName=item[fldMDDef.propertyKeyName]
            blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn]
            blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs]
            console.log('blankEmpty', blankEmpty)
            entries.push(blankEmpty)
        })

    }
    fldDisabled(){
        return true
    }   
    
    get filtertext1() {    return this.shadowRoot.querySelector("mwc-textfield#filtertext1")    }    

    get text1() {    return this.shadowRoot.querySelector("mwc-textfield#text1")    }        
    get filtertext2() {    return this.shadowRoot.querySelector("mwc-textfield#filtertext2")    }        
    get filtertext3() {    return this.shadowRoot.querySelector("mwc-textfield#filtertext3")    }        
    get filtertext4() {    return this.shadowRoot.querySelector("mwc-textfield#filtertext4")    }        
    get filtertext5() {    return this.shadowRoot.querySelector("mwc-textfield#filtertext5")    }        
    get filtertext6() {    return this.shadowRoot.querySelector("mwc-textfield#filtertext6")    }        
    get filtertext7() {    return this.shadowRoot.querySelector("mwc-textfield#filtertext7")    }        
    get filtertext8() {    return this.shadowRoot.querySelector("mwc-textfield#filtertext8")    }        
    get filtertext9() {    return this.shadowRoot.querySelector("mwc-textfield#filtertext9")    }        
    get filtertext10() {    return this.shadowRoot.querySelector("mwc-textfield#filtertext10")    }        
     get filtercheckbox1() {    return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox1")    }        
    get filtercheckbox2() {    return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox2")    }        
    get filtercheckbox3() {    return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox3")    }        
    get filtercheckbox4() {    return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox4")    }        
    get filtercheckbox5() {    return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox5")    }        
    get filtercheckbox6() {    return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox6")    }        
    get filtercheckbox7() {    return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox7")    }        
    get filtercheckbox8() {    return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox8")    }        
    get filtercheckbox9() {    return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox9")    }        
    get filtercheckbox10() {    return this.shadowRoot.querySelector("mwc-checkbox#filtercheckbox10")    }        
    get filterdate1() {    return this.shadowRoot.querySelector("mwc-textfield#filterdate1")    }        
    get filterdate2() {    return this.shadowRoot.querySelector("mwc-textfield#filterdate2")    }    
    get filterdate3() {    return this.shadowRoot.querySelector("mwc-textfield#filterdate3")    }        
    get date4() {    return this.shadowRoot.querySelector("mwc-textfield#date4")    }    
    get date5() {    return this.shadowRoot.querySelector("mwc-textfield#date5")    }        
    get date6() {    return this.shadowRoot.querySelector("mwc-textfield#date6")    }    
    get date7() {    return this.shadowRoot.querySelector("mwc-textfield#date7")    }        
    get date8() {    return this.shadowRoot.querySelector("mwc-textfield#date8")    }    
    get date9() {    return this.shadowRoot.querySelector("mwc-textfield#date9")    }        
    get filterdate10() {    return this.shadowRoot.querySelector("mwc-textfield#filterdate10")    }    
    get datetime1() {    return this.shadowRoot.querySelector("input#datetime1")    }        
    get datetime2() {    return this.shadowRoot.querySelector("input#datetime2")    }    
    get datetime3() {    return this.shadowRoot.querySelector("input#datetime3")    }        
    get datetime4() {    return this.shadowRoot.querySelector("input#datetime4")    }    
    get datetime5() {    return this.shadowRoot.querySelector("input#datetime5")    }        
    get datetime6() {    return this.shadowRoot.querySelector("input#datetime6")    }    
    get datetime7() {    return this.shadowRoot.querySelector("input#datetime7")    }        
    get datetime8() {    return this.shadowRoot.querySelector("input#datetime8")    }    
    get datetime9() {    return this.shadowRoot.querySelector("input#datetime9")    }        
    get datetime10() {    return this.shadowRoot.querySelector("input#datetime10")    }    
    
    get filterdaterange1dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#filterdaterange1dateStart")    }        
    get filterdaterange1dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#filterdaterange1dateEnd")    }    


    get daterange1dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange1dateStart")    }        
    get daterange1dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange1dateEnd")    }    
    get daterange2dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange2dateStart")    }        
    get daterange2dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange2dateEnd")    }    
    get daterange3dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange3dateStart")    }        
    get daterange3dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange3dateEnd")    }    
    get daterange4dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange4dateStart")    }        
    get daterange4dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange4dateEnd")    }    
    get daterange5dateStart() {    return this.shadowRoot.querySelector("mwc-textfield#daterange5dateStart")    }        
    get daterange5dateEnd() {    return this.shadowRoot.querySelector("mwc-textfield#daterange5dateEnd")    }    
        
    get filternumber1() {    return this.shadowRoot.querySelector("mwc-textfield#filternumber1")    }    
    get filternumber2() {    return this.shadowRoot.querySelector("mwc-textfield#filternumber2")    }    
    get filternumber3() {    return this.shadowRoot.querySelector("mwc-textfield#filternumber3")    }    
    get filternumber4() {    return this.shadowRoot.querySelector("mwc-textfield#filternumber4")    }    
    get filternumber5() {    return this.shadowRoot.querySelector("mwc-textfield#filternumber5")    }    
    get filternumber6() {    return this.shadowRoot.querySelector("mwc-textfield#filternumber6")    }    
    get filternumber7() {    return this.shadowRoot.querySelector("mwc-textfield#filternumber7")    }    
    get filternumber8() {    return this.shadowRoot.querySelector("mwc-textfield#filternumber8")    }    
    get filternumber9() {    return this.shadowRoot.querySelector("mwc-textfield#filternumber9")    }    
    get filternumber10() {    return this.shadowRoot.querySelector("mwc-textfield#filternumber10")    }    
  
    get list1() {    return this.shadowRoot.querySelector("mwc-select#list1")    }
    get list2() {    return this.shadowRoot.querySelector("mwc-select#list2")    }
    get list3() {    return this.shadowRoot.querySelector("mwc-select#list3")    }
    get list4() {    return this.shadowRoot.querySelector("mwc-select#list4")    }
    get list5() {    return this.shadowRoot.querySelector("mwc-select#list5")    }    
    get list6() {    return this.shadowRoot.querySelector("mwc-select#list6")    }    
    get list7() {    return this.shadowRoot.querySelector("mwc-select#list7")    }    
    get list8() {    return this.shadowRoot.querySelector("mwc-select#list8")    }    
    get list9() {    return this.shadowRoot.querySelector("mwc-select#list9")    }    
    get list10() {    return this.shadowRoot.querySelector("mwc-select#list10")    }  
    
    get listMDprocedureUsers() {return this.shadowRoot.querySelector("mwc-select#listMDprocedureUsers")}
    get listMDSamplerPersonalAreas() {return this.shadowRoot.querySelector("mwc-select#listMDSamplerPersonalAreas")}
    get listMDvariablesSet() {return this.shadowRoot.querySelector("mwc-select#listMDvariablesSet")}
    get listMDvariables() {return this.shadowRoot.querySelector("mwc-select#listMDvariables")}
    get listSelectedStudyIndividuals() {return this.shadowRoot.querySelector("mwc-select#listSelectedStudyIndividuals")}
    get listSelectedStudyIndividualSamples() {return this.shadowRoot.querySelector("mwc-select#listSelectedStudyIndividualSamples")}
         
  }
}
import { html, nothing } from 'lit';
import { columnBodyRenderer, gridRowDetailsRenderer } from 'lit-vaadin-helpers';
import { commonLangConfig } from '@trazit/common-core';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import {DialogsFunctions} from './DialogsFunctions';
export function TrazitGenericDialogs(base) {
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
        fields:{type: Array}
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
    }
    openThisDialog(actionModel = this.actionBeingPerformedModel){
//alert('openThisDialog')
       if (!actionModel||!actionModel.dialogInfo||!actionModel.dialogInfo.fields){
        //alert(false)
        return false
       }      
       // alert(true)
       this.resetFields()
       return true 
    }
        
    
    setValidVal(e, fieldDef) {
        console.log('setValidVal', e, 'fieldDef', fieldDef)
        return
      if (typeof fieldDef.min_allowed == 'number' && e.target.value < fieldDef.min_allowed) {
        e.target.value = fieldDef.min_allowed
        return
      }
      if (typeof fieldDef.max_allowed == 'number' && e.target.value > fieldDef.max_allowed) {
        e.target.value = fieldDef.max_allowed
        return
      }
      // make sure the decimal length <= max_dp when manual input
      if (fieldDef.max_dp) {
        let v = e.target.value.split(".")
        if (v.length > 1 && v[1].length > fieldDef.max_dp) {
          v[1] = v[1].substring(0, fieldDef.max_dp)
          e.target.value = Number(v.join("."))
        }
      }
    }    
    /** Date Template Dialog part  @open=${this.defaultValue()}*/
    genericFormDialog(actionModel = this.actionBeingPerformedModel) {
        // if (this.actionBeingPerformedModel.dialogInfo === undefined) {
        //     //alert('genericFormDialog has no dialogInfo')
        //     return nothing
        // }
        // if (this.actionBeingPerformedModel!==undefined&&this.actionBeingPerformedModel.dialogInfo!==undefined&&this.actionBeingPerformedModel.dialogInfo.name === "genericDialog"){
        //     let dlgFlds=this.actionBeingPerformedModel.dialogInfo.fields
        //     if (dlgFlds===undefined){
        //         alert('The dialog '+this.actionBeingPerformedModel.dialogInfo.name+' has no fields property for adding the fields, please review.')
        //         return nothing
        //     }
        // }    

         // @closed=${this.resetFields} this is in use but moved to be executed about to perform the fetchApi 
         //     otherwise it is not compatible with actions requiring credentials dialog.
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
    </style>
        <tr-dialog id="genericDialog"  @opened=${this.defaultValue} ?open=${this.openThisDialog(actionModel)} heading="" hideActions="" scrimClickAction="">
        ${!actionModel||!actionModel.dialogInfo||!actionModel.dialogInfo.fields ?
            html``: html`              
            ${actionModel.dialogInfo.fields.map((fld, i) =>             
                html`            
                ${!fld.text1 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text1" type="text" .value=${fld.text1.default_value ? fld.text1.default_value : ''}  label="${fld.text1["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text2 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text2" type="text" .value=${fld.text2.default_value ? fld.text2.default_value : ''} label="${fld.text2["label_" + this.lang]}" 
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text3 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text3" type="text" .value=${fld.text3.default_value ? fld.text3.default_value : ''} label="${fld.text3["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}                       
                ${!fld.text4 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text4" type="text" .value=${fld.text4.default_value ? fld.text4.default_value : ''} label="${fld.text4["label_" + this.lang]}" 
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text5 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text5" type="text" .value=${fld.text5.default_value ? fld.text5.default_value : ''} label="${fld.text5["label_" + this.lang]}" 
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text6 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text6" type="text" .value=${fld.text6.default_value ? fld.text6.default_value : ''} label="${fld.text6["label_" + this.lang]}" 
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text7 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text7" type="text" .value=${fld.text7.default_value ? fld.text7.default_value : ''} label="${fld.text7["label_" + this.lang]}" 
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text8 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text8" type="text" .value=${fld.text8.default_value ? fld.text8.default_value : ''} label="${fld.text8["label_" + this.lang]}" 
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text9 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text9" type="text" .value=${fld.text9.default_value ? fld.text9.default_value : ''} label="${fld.text9["label_" + this.lang]}" 
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}          
                ${!fld.text10 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="text10" type="text" .value=${fld.text10.default_value ? fld.text10.default_value : ''} label="${fld.text10["label_" + this.lang]}" 
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}                              
                ${!fld.number1 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number1" type="number" 
                    @input=${e=>this.setValidVal(e, fld)}
                    .value=${fld.number1.default_value ? fld.number1.default_value : ''} label="${fld.number1["label_" + this.lang]}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number2 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number2" type="number" 
                    .value=${fld.number2.default_value ? fld.number2.default_value : ''}   label="${fld.number2["label_" + this.lang]}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number3 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number3" type="number" 
                    .value=${fld.number3.default_value ? fld.number3.default_value : ''}   label="${fld.number3["label_" + this.lang]}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number4 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number4" type="number" 
                    .value=${fld.number4.default_value ? fld.number4.default_value : ''}   label="${fld.number4["label_" + this.lang]}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number5 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number5" type="number" 
                    .value=${fld.number5.default_value ? fld.number5.default_value : ''}   label="${fld.number5["label_" + this.lang]}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number6 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number6" type="number" 
                    .value=${fld.number6.default_value ? fld.number6.default_value : ''}   label="${fld.number6["label_" + this.lang]}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number7 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number7" type="number" 
                    .value=${fld.number7.default_value ? fld.number7.default_value : ''}   label="${fld.number7["label_" + this.lang]}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number8 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number8" type="number" 
                    .value=${fld.number8.default_value ? fld.number8.default_value : ''}   label="${fld.number8["label_" + this.lang]}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number9 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number9" type="number" 
                    .value=${fld.number9.default_value ? fld.number9.default_value : ''}   label="${fld.number9["label_" + this.lang]}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.number10 ?
                    html``: html`        
                    <div class="layout horizontal flex center-center">
                    <mwc-textfield class="layout flex" id="number10" type="number" 
                    .value=${fld.number10.default_value ? fld.number10.default_value : ''}   label="${fld.number10["label_" + this.lang]}"
                    @keypress=${e => e.keyCode == 13 && this.acceptedGenericDialog}></mwc-textfield>
                    </div>
                `}   
                ${!fld.checkbox1 ?
                    html``: html`        
                    <mwc-formfield label="${fld.checkbox1["label_" + this.lang]}">
                        <mwc-checkbox id="checkbox1" 
                        ?checked=${fld.checkbox1.default_value===undefined ? false : fld.checkbox1.default_value}
                        @change=${e => { this.checkbox1.value=this.checkbox1.checked}}
                        value="${fld.checkbox1.default_value}"
                        ></mwc-checkbox>
                    </mwc-formfield>
                `}                              
                    ${!fld.checkbox2 ?
                    html``: html`        
                        <mwc-formfield label="${fld.checkbox2["label_" + this.lang]}">
                        <mwc-checkbox id="checkbox2" 
                        ?checked=${fld.checkbox2.default_value===undefined ? false : fld.checkbox2.default_value}
                        @change=${e => { this.checkbox2.value=this.checkbox2.checked}}
                        value="${fld.checkbox2.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox3 ?
                    html``: html`        
                        <mwc-formfield label="${fld.checkbox3["label_" + this.lang]}">
                        <mwc-checkbox id="checkbox3" 
                        ?checked=${fld.checkbox3.default_value===undefined ? false : fld.checkbox3.default_value}
                        @change=${e => { this.checkbox3.value=this.checkbox3.checked}}
                        value="${fld.checkbox3.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox4 ?
                    html``: html`        
                        <mwc-formfield label="${fld.checkbox4["label_" + this.lang]}">
                        <mwc-checkbox id="checkbox4" 
                        ?checked=${fld.checkbox4.default_value===undefined ? false : fld.checkbox4.default_value}
                        @change=${e => { this.checkbox4.value=this.checkbox4.checked}}
                        value="${fld.checkbox4.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox5 ?
                    html``: html`        
                        <mwc-formfield label="${fld.checkbox5["label_" + this.lang]}">
                        <mwc-checkbox id="checkbox5" 
                        ?checked=${fld.checkbox5.default_value===undefined ? false : fld.checkbox5.default_value}
                        @change=${e => { this.checkbox5.value=this.checkbox5.checked}}
                        value="${fld.checkbox5.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox6 ?
                    html``: html`        
                        <mwc-formfield label="${fld.checkbox6["label_" + this.lang]}">
                        <mwc-checkbox id="checkbox6" 
                        ?checked=${fld.checkbox6.default_value===undefined ? false : fld.checkbox6.default_value}
                        @change=${e => { this.checkbox6.value=this.checkbox6.checked}}
                        value="${fld.checkbox6.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox7 ?
                    html``: html`        
                        <mwc-formfield label="${fld.checkbox7["label_" + this.lang]}">
                        <mwc-checkbox id="checkbox7" 
                        ?checked=${fld.checkbox7.default_value===undefined ? false : fld.checkbox7.default_value}
                        @change=${e => { this.checkbox7.value=this.checkbox7.checked}}
                        value="${fld.checkbox7.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox8 ?
                    html``: html`        
                        <mwc-formfield label="${fld.checkbox8["label_" + this.lang]}">
                        <mwc-checkbox id="checkbox8" 
                        ?checked=${fld.checkbox8.default_value===undefined ? false : fld.checkbox8.default_value}
                        @change=${e => { this.checkbox8.value=this.checkbox8.checked}}
                        value="${fld.checkbox8.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox9 ?
                    html``: html`        
                        <mwc-formfield label="${fld.checkbox9["label_" + this.lang]}">
                        <mwc-checkbox id="checkbox9" 
                        ?checked=${fld.checkbox9.default_value===undefined ? false : fld.checkbox9.default_value}
                        @change=${e => { this.checkbox9.value=this.checkbox9.checked}}
                        value="${fld.checkbox9.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              
                    ${!fld.checkbox10 ?
                    html``: html`        
                        <mwc-formfield label="${fld.checkbox10["label_" + this.lang]}">
                        <mwc-checkbox id="checkbox10" 
                        ?checked=${fld.checkbox10.default_value===undefined ? false : fld.checkbox10.default_value}
                        @change=${e => { this.checkbox10.value=this.checkbox10.checked}}
                        value="${fld.checkbox10.default_value}"
                    ></mwc-checkbox>
                        </mwc-formfield>
                    `}                              

                    ${!fld.date1 ?html``: html`<mwc-textfield id="date1" label="${fld.date1["label_" + this.lang]}" type="date"></mwc-textfield>`}                              
                    ${!fld.date2 ?html``: html`<mwc-textfield id="date2" label="${fld.date2["label_" + this.lang]}" type="date"></mwc-textfield>`}   
                    ${!fld.date3 ?html``: html`<mwc-textfield id="date3" label="${fld.date3["label_" + this.lang]}" type="date"></mwc-textfield>`}                              
                    ${!fld.date4 ?html``: html`<mwc-textfield id="date4" label="${fld.date4["label_" + this.lang]}" type="date"></mwc-textfield>`}   
                    ${!fld.date5 ?html``: html`<mwc-textfield id="date5" label="${fld.date5["label_" + this.lang]}" type="date"></mwc-textfield>`}                              
                    ${!fld.date6 ?html``: html`<mwc-textfield id="date6" label="${fld.date6["label_" + this.lang]}" type="date"></mwc-textfield>`}   
                    ${!fld.date7 ?html``: html`<mwc-textfield id="date7" label="${fld.date7["label_" + this.lang]}" type="date"></mwc-textfield>`}                              
                    ${!fld.date8 ?html``: html`<mwc-textfield id="date8" label="${fld.date8["label_" + this.lang]}" type="date"></mwc-textfield>`}   
                    ${!fld.date9 ?html``: html`<mwc-textfield id="date9" label="${fld.date9["label_" + this.lang]}" type="date"></mwc-textfield>`}                              
                    ${!fld.date10 ?html``: html`<mwc-textfield id="date10" label="${fld.date10["label_" + this.lang]}" type="date"></mwc-textfield>`}   

                    ${!fld.datetime1 ?html``: html`<input id="datetime1" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime2 ?html``: html`<input id="datetime2" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime3 ?html``: html`<input id="datetime3" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime4 ?html``: html`<input id="datetime4" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime5 ?html``: html`<input id="datetime5" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime6 ?html``: html`<input id="datetime6" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime7 ?html``: html`<input id="datetime7" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime8 ?html``: html`<input id="datetime8" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime9 ?html``: html`<input id="datetime9" type="datetime-local" dialogInitialFocus>`}   
                    ${!fld.datetime10 ?html``: html`<input id="datetime10" type="datetime-local" dialogInitialFocus>`}   

                    
                    ${!fld.daterange1 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange1dateStart" label="${fld.daterange1.dateStart["label_" + this.lang]}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange1dateEnd" label="${fld.daterange1.dateEnd["label_" + this.lang]}" type="date"></mwc-textfield>
                        </div>
                    `}                       
                    ${!fld.daterange2 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange2dateStart" label="${fld.daterange2.dateStart["label_" + this.lang]}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange2dateEnd" label="${fld.daterange2.dateEnd["label_" + this.lang]}" type="date"></mwc-textfield>
                        </div>
                    `}                       
                    ${!fld.daterange3 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange3dateStart" label="${fld.daterange3.dateStart["label_" + this.lang]}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange3dateEnd" label="${fld.daterange3.dateEnd["label_" + this.lang]}" type="date"></mwc-textfield>
                        </div>
                    `}                       
                    ${!fld.daterange4 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange4dateStart" label="${fld.daterange4.dateStart["label_" + this.lang]}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange4dateEnd" label="${fld.daterange4.dateEnd["label_" + this.lang]}" type="date"></mwc-textfield>
                        </div>
                    `}                       
                    ${!fld.daterange5 ?
                    html``: html`    
                        <div style="display:flex">    
                        <mwc-textfield id="daterange5dateStart" label="${fld.daterange5.dateStart["label_" + this.lang]}" type="date"></mwc-textfield>
                        <mwc-textfield id="daterange5dateEnd" label="${fld.daterange5.dateEnd["label_" + this.lang]}" type="date"></mwc-textfield>
                        </div>
                    `}                       
                

                ${!fld.list1 ?html``: html`        
                    <mwc-select id="list1" label="${fld.list1["label_" + this.lang]}">
                    ${fld.list1.items.map((c, i) =>
                        html`<mwc-list-item value="${c.keyName}" ?selected=${i==0}>${c["keyValue_"+this.lang]}</mwc-list-item>`
                    )}
                    </mwc-select>`}  
                ${!fld.list2 ?html``: html`        
                    <mwc-select id="list2" label="${fld.list2["label_" + this.lang]}">
                    ${fld.list2.items.map((c, i) =>
                        html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
                    )}
                    </mwc-select>`}  
                ${!fld.list3 ?html``: html`        
                    <mwc-select id="list3" label="${fld.list3["label_" + this.lang]}">
                    ${fld.list3.items.map((c, i) =>
                        html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
                    )}
                    </mwc-select>`}  
                ${!fld.list4 ?html``: html`        
                    <mwc-select id="list4" label="${fld.list4["label_" + this.lang]}">
                    ${fld.list4.items.map((c, i) =>
                        html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
                    )}
                    </mwc-select>`}  
                ${!fld.list5 ?html``: html`        
                    <mwc-select id="list5" label="${fld.list5["label_" + this.lang]}">
                    ${fld.list5.items.map((c, i) =>
                        html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
                    )}
                    </mwc-select>`}  
                ${!fld.list6 ?html``: html`        
                    <mwc-select id="list6" label="${fld.list6["label_" + this.lang]}">
                    ${fld.list6.items.map((c, i) =>
                        html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
                    )}
                    </mwc-select>`}  
                ${!fld.list6 ?html``: html`        
                    <mwc-select id="list6" label="${fld.list6["label_" + this.lang]}">
                    ${fld.list6.items.map((c, i) =>
                        html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
                    )}
                    </mwc-select>`}  
                ${!fld.list7 ?html``: html`        
                    <mwc-select id="list7" label="${fld.list7["label_" + this.lang]}">
                    ${fld.list7.items.map((c, i) =>
                        html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
                    )}
                    </mwc-select>`}  
                ${!fld.list8 ?html``: html`        
                    <mwc-select id="list8" label="${fld.list8["label_" + this.lang]}">
                    ${fld.list8.items.map((c, i) =>
                        html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
                    )}
                    </mwc-select>`}  
                ${!fld.list9 ?html``: html`        
                    <mwc-select id="list9" label="${fld.list9["label_" + this.lang]}">
                    ${fld.list9.items.map((c, i) =>
                        html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
                    )}
                    </mwc-select>`}  
                ${!fld.list10 ?html``: html`        
                    <mwc-select id="list10" label="${fld.list10["label_" + this.lang]}">
                    ${fld.list10.items.map((c, i) =>
                        html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
                    )}
                    </mwc-select>`}  

                    ${!fld.listMDSamplerPersonalAreas ?
                    html``: html`        
                        <mwc-select id="listMDSamplerPersonalAreas" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.listMDSamplerPersonalAreas&&fld.listMDSamplerPersonalAreas["label_" + this.lang]}">
                        ${this.masterData.samplerPersonalAreas.map((c, i) =>
                        html`<mwc-list-item value="${c.key}" ?selected=${i == 0}>${c["label_"+this.lang]}</mwc-list-item>`
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
                <sp-button size="xl" slot="primaryAction" dialogAction="accept" @click=${this.acceptedGenericDialog}>
                    ${commonLangConfig.confirmDialogButton["label_" + this.lang]}</sp-button>
            </div>  
        `}
        </tr-dialog>
    `
    }
    get genericDialog() {return this.shadowRoot.querySelector("tr-dialog#genericDialog")}
    get dateDialog() {return this.shadowRoot.querySelector("tr-dialog#dateDialog")}
    get dateInput() {return this.shadowRoot.querySelector("input#dateInput")}
    setNewDate() {
      if (this.dateInput.value) {
        this.dialogAccept(false)
      }
    }
    acceptedGenericDialog(e){
        if (this.checkMandatoryFieldsNotEmpty()){
            this.dialogAccept(false)
        }else{
            console.log('Accepted Generic Dialog but mandatories pending then action not performed')
           // alert('mandatories pending')
           e.stopPropagation();
        }
    }
    checkMandatoryFieldsNotEmpty(){                
        let dlgFlds=this.actionBeingPerformedModel.dialogInfo.fields
        for (let i=0;i<dlgFlds.length;i++){            
            let fldObj=dlgFlds[i]
            console.log('checkMandatoryFieldsNotEmpty', fldObj)
            let keyName=Object.keys(fldObj)
            let fldDef=fldObj[keyName[0]]
            if ((fldDef.optional===undefined||
                fldDef.optional===false)&&this[keyName[0]].value.length==0){
                alert('Field '+fldDef["label_"+this.lang]+' is mandatory')
                return false
            }
        }
        return true
    }

    defaultValue(){
        //return
        //console.log('defaultValue')
        this.resetFields()
        let dlgFlds=this.actionBeingPerformedModel.dialogInfo.fields
        if (dlgFlds===undefined){
            //alert('The dialog '+this.actionBeingPerformedModel.dialogInfo.name+' has no fields property for adding the fields, please review.')
            return
        }
        for (let i=0;i<dlgFlds.length;i++){
            let fldObj=dlgFlds[i]
            let keyName=Object.keys(fldObj)
            
            //if (==null){            
            if (fldObj[keyName].default_value!==undefined&&fldObj[keyName].default_value!==null){
                this[keyName[0]].value=fldObj[keyName].default_value
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
        let dlgFlds=this.actionBeingPerformedModel.dialogInfo.fields
        if (dlgFlds===undefined){
            //alert('The dialog '+this.actionBeingPerformedModel.dialogInfo.name+' has no fields property for adding the fields, please review.')
            return
        }
        for (let i=0;i<dlgFlds.length;i++){
            let fldObj=dlgFlds[i]            
            let keyName=Object.keys(fldObj)
            if (this[keyName]!==null){
                console.log(keyName[0])
                if (keyName[0].includes('list')){

                }else{
                    this[keyName[0]].value=""
                }
            }
        }
    }

    
    get text1() {    return this.shadowRoot.querySelector("mwc-textfield#text1")    }        
    get text2() {    return this.shadowRoot.querySelector("mwc-textfield#text2")    }        
    get text3() {    return this.shadowRoot.querySelector("mwc-textfield#text3")    }        
    get text4() {    return this.shadowRoot.querySelector("mwc-textfield#text4")    }        
    get text5() {    return this.shadowRoot.querySelector("mwc-textfield#text5")    }        
    get text6() {    return this.shadowRoot.querySelector("mwc-textfield#text6")    }        
    get text7() {    return this.shadowRoot.querySelector("mwc-textfield#text7")    }        
    get text8() {    return this.shadowRoot.querySelector("mwc-textfield#text8")    }        
    get text9() {    return this.shadowRoot.querySelector("mwc-textfield#text9")    }        
    get text10() {    return this.shadowRoot.querySelector("mwc-textfield#text10")    }        
    get text10() {    return this.shadowRoot.querySelector("mwc-textfield#text10")    } 
    get checkbox1() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox1")    }        
    get checkbox2() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox2")    }        
    get checkbox3() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox3")    }        
    get checkbox4() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox4")    }        
    get checkbox5() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox5")    }        
    get checkbox6() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox6")    }        
    get checkbox7() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox7")    }        
    get checkbox8() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox8")    }        
    get checkbox9() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox9")    }        
    get checkbox10() {    return this.shadowRoot.querySelector("mwc-checkbox#checkbox10")    }        
    get date1() {    return this.shadowRoot.querySelector("mwc-textfield#date1")    }        
    get date2() {    return this.shadowRoot.querySelector("mwc-textfield#date2")    }    
    get date3() {    return this.shadowRoot.querySelector("mwc-textfield#date3")    }        
    get date4() {    return this.shadowRoot.querySelector("mwc-textfield#date4")    }    
    get date5() {    return this.shadowRoot.querySelector("mwc-textfield#date5")    }        
    get date6() {    return this.shadowRoot.querySelector("mwc-textfield#date6")    }    
    get date7() {    return this.shadowRoot.querySelector("mwc-textfield#date7")    }        
    get date8() {    return this.shadowRoot.querySelector("mwc-textfield#date8")    }    
    get date9() {    return this.shadowRoot.querySelector("mwc-textfield#date9")    }        
    get date10() {    return this.shadowRoot.querySelector("mwc-textfield#date10")    }    
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
        
    get number1() {    return this.shadowRoot.querySelector("mwc-textfield#number1")    }    
    get number2() {    return this.shadowRoot.querySelector("mwc-textfield#number2")    }    
    get number3() {    return this.shadowRoot.querySelector("mwc-textfield#number3")    }    
    get number4() {    return this.shadowRoot.querySelector("mwc-textfield#number4")    }    
    get number5() {    return this.shadowRoot.querySelector("mwc-textfield#number5")    }    
    get number6() {    return this.shadowRoot.querySelector("mwc-textfield#number6")    }    
    get number7() {    return this.shadowRoot.querySelector("mwc-textfield#number7")    }    
    get number8() {    return this.shadowRoot.querySelector("mwc-textfield#number8")    }    
    get number9() {    return this.shadowRoot.querySelector("mwc-textfield#number9")    }    
    get number10() {    return this.shadowRoot.querySelector("mwc-textfield#number10")    }    
  
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
  }
}
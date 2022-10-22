import { LitElement, html, css, nothing } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-button';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-textfield';
import '@material/mwc-formfield';
import '@material/mwc-checkbox';
//import '@spectrum-web-components/split-view/sp-split-view';
import './datamining-tab';
import './datamining-data';
//import '@doubletrade/lit-datatable';
import {ButtonsFunctions} from '../components/Buttons/ButtonsFunctions';

export class DataMiningMainView extends ButtonsFunctions(LitElement) {
  static get styles() {
    return [
      Layouts,
      css`
      sp-split-view {
        height: calc(100vh - 150px);
      }
      #leftSplit {
        padding: 10px;
        background-color:transparent
      }
      #leftSplit::-webkit-scrollbar, #rightSplit::-webkit-scrollbar {
        display: none;
      }
      #rightSplit{
        background-color:transparent
      }
      div[hidden] {
        display: none;
      }
      mwc-button {
        background-color: rgba(36, 192, 235, 1);
        font-family: Montserrat;
        font-weight: bold;
        font-size: 19px;
        --mdc-theme-primary:rgba(36, 192, 235, 1);
        border-radius: 12px;
      }
      mwc-button.button {        
        color : rgba(36, 192, 235, 1);
        font-family : Montserrat;
        font-weight : bold;
        font-size : 19px;
        background: rgb(36, 192, 235) none repeat scroll 0% 0%;
        font-family: Montserrat;
        font-weight: bold;
        font-size: 19px;
        color: white;
        border-color: transparent !important;
        --mdc-button-fill-color: red;
        --mdc-button-ink-color: blue;
        border-radius: 12px;
      }
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
      nwc-textfield.mdc-text-field {
      background-color :  #FFFFFF;
      background-color : rgb(255, 255, 255);     
      }
  `
    ];
  }

  static get properties() {
    return {
      desktop: { type: Boolean },
      config: { type: Object },
      lang: { type: String },
      model: { type: Object },
      procName: { type: String },
      tabList: { type: Array },
      activeTab: { type: Object },
      sampleData: { type: Object },
      data: { type: Object },
      chartImgs: { type: Array },
      datatable:{type: Object},
      leftOpen:{type: Boolean},
      masterData: {type: Array}
    };
  }

  constructor() {
    super()
    this.desktop = true
    this.model = {}
    this.tabList = []
    this.activeTab = {}
    this.sampleData = {}
    this.data = {}
    this.chartImgs = []
    this.leftOpen = true
    
  }

  updated(updates) {
    if (updates.has('model') && this.model.DataMining) {
      this.tabList = this.model.DataMining.tabs
    }
  }
  filterSize(){
    //let leftPane = this.shadowRoot.querySelector("div#leftSplit")
    let leftPane = this.shadowRoot.querySelector("sp-split-view#leftsplit")
    
    if (leftPane!==undefined){
      //leftPane.style.size="10"
      if (this.leftOpen){
        leftPane.primarySize="20"

      }else{
        leftPane.primarySize="300"
      }
      this.leftOpen=!this.leftOpen
    }else{
      alert('not found')
    }
  }
  //this.desktop
  render() {
    return html`
      ${1==1 ?
        html`
        <sp-split-view id="leftsplit" resizable primary-size="300">
          <div id="leftSplit">
            <datamining-tab 
              @tab-changed=${this.tabChanged}
              .lang=${this.lang}
              .tabs=${this.tabList}></datamining-tab>
            <div class="layout flex vertical">
            ${!this.activeTab||!this.activeTab.filter||!this.activeTab.filter.filterFields ?
              html``: html`
                ${this.activeTab.filter.filterFields.map((fld, i) =>             
                  html`
                    ${!fld.text1 ?
                        html``: html`        
                        <div class="layout horizontal flex center-center">
                        <mwc-textfield class="layout flex" id="text1" type="text" .value=${fld.text1.default_value ? fld.text1.default_value : ''} label="${fld.text1["label_" + this.lang]}" 
                          @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                        </div>
                    `}          
                    ${!fld.text2 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text2" type="text" .value=${fld.text2.default_value ? fld.text2.default_value : ''} label="${fld.text2["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}          
                    ${!fld.text3 ?
                        html``: html`        
                        <div class="layout horizontal flex center-center">
                        <mwc-textfield class="layout flex" id="text3" type="text" .value=${fld.text3.default_value ? fld.text3.default_value : ''} label="${fld.text3["label_" + this.lang]}" 
                          @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                        </div>
                    `}                       
                    ${!fld.text4 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text4" type="text" .value=${fld.text4.default_value ? fld.text4.default_value : ''} label="${fld.text4["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}          
                    ${!fld.text5 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text5" type="text" .value=${fld.text5.default_value ? fld.text5.default_value : ''} label="${fld.text5["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}          
                    ${!fld.text6 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text6" type="text" .value=${fld.text6.default_value ? fld.text6.default_value : ''} label="${fld.text6["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}          
                    ${!fld.text7 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text7" type="text" .value=${fld.text7.default_value ? fld.text7.default_value : ''} label="${fld.text7["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}          
                    ${!fld.text8 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text8" type="text" .value=${fld.text8.default_value ? fld.text8.default_value : ''} label="${fld.text8["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}          
                    ${!fld.text9 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text9" type="text" .value=${fld.text9.default_value ? fld.text9.default_value : ''} label="${fld.text9["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}          
                    ${!fld.text10 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="text10" type="text" .value=${fld.text10.default_value ? fld.text10.default_value : ''} label="${fld.text10["label_" + this.lang]}" 
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}                              
                    ${!fld.number1 ?
                        html``: html`        
                        <div class="layout horizontal flex center-center">
                        <mwc-textfield class="layout flex" id="number1" type="number" 
                        .value=${fld.number1.default_value ? fld.number1.default_value : ''} label="${fld.number1["label_" + this.lang]}"
                        @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                        </div>
                    `}   
                    ${!fld.number2 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number2" type="number" 
                      .value=${fld.number2.default_value ? fld.number2.default_value : ''}   label="${fld.number2["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number3 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number3" type="number" 
                      .value=${fld.number3.default_value ? fld.number3.default_value : ''}   label="${fld.number3["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number4 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number4" type="number" 
                      .value=${fld.number4.default_value ? fld.number4.default_value : ''}   label="${fld.number4["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number5 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number5" type="number" 
                      .value=${fld.number5.default_value ? fld.number5.default_value : ''}   label="${fld.number5["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number6 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number6" type="number" 
                      .value=${fld.number6.default_value ? fld.number6.default_value : ''}   label="${fld.number6["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number7 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number7" type="number" 
                      .value=${fld.number7.default_value ? fld.number7.default_value : ''}   label="${fld.number7["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number8 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number8" type="number" 
                      .value=${fld.number8.default_value ? fld.number8.default_value : ''}   label="${fld.number8["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number9 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number9" type="number" 
                      .value=${fld.number9.default_value ? fld.number9.default_value : ''}   label="${fld.number9["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
                      </div>
                    `}   
                    ${!fld.number10 ?
                      html``: html`        
                      <div class="layout horizontal flex center-center">
                      <mwc-textfield class="layout flex" id="number10" type="number" 
                      .value=${fld.number10.default_value ? fld.number10.default_value : ''}   label="${fld.number10["label_" + this.lang]}"
                      @keypress=${e => e.keyCode == 13 && this.genomaSuperDialogClickedAction()}></mwc-textfield>
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

                      ${!fld.date1 ?
                        html``: html`        
                          <mwc-textfield id="date1" label="${fld.date1["label_" + this.lang]}" type="date"></mwc-textfield>
                      `}                              
                      ${!fld.date2 ?
                        html``: html`        
                          <mwc-textfield id="date2" label="${fld.date2["label_" + this.lang]}" type="date"></mwc-textfield>
                      `}   
                      
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


                                             
                    

                    ${!fld.list1 ?
                    html``: html`        
                        <mwc-select id="list1" label="${this.selectedAction&&this.selectedAction.dialogInfo&&fld.list1&&fld.list1["label_" + this.lang]}">
                        ${fld.list1.items.map((c, i) =>
                            html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
                        )}
                        </mwc-select>
                    `}  
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
              `
            }
            <mwc-button raised label="Search" @click=${this.getQueryFilterData}></mwc-button>
            </div>
          </div>
          <div id="rightSplit">
<!--              <div class="layout horizontal">
                <mwc-icon-button icon="print" @click=${this.print}></mwc-icon-button>                
              </div>
-->
            <datamining-data .data=${this.data} .activeTab=${this.activeTab} lang=${this.lang}
            dbName=${this.config.dbName} procName=${this.procName}
              @chart-images=${e=>{this.chartImgs.push(e.detail.imgUri);this.requestUpdate()}}></datamining-data>
          </div>
        </sp-split-view>
        ` :
        html`Coming Soon !`
      }
    `
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
  get listMDSamplerPersonalAreas() {    return this.shadowRoot.querySelector("mwc-select#listMDSamplerPersonalAreas")    }
  
  get sampleId() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Sample ID']")
  }

  get incubatorName() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Incubator Name']")
  }

  get startDate() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Start Date']")
  }

  get endDate() {
    return this.shadowRoot.querySelector("mwc-textfield[label='End Date']")
  }

  get batchName() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Batch Name']")
  }

  get lotName() {
    return this.shadowRoot.querySelector("mwc-textfield[label='Lot Name']")
  }

  get dataminingData() {
    return this.shadowRoot.querySelector("datamining-data")
  }

  tabChanged(e) {
    this.chartImgs = []
    this.sampleData = {}
    this.activeTab = e.target.selectedTab
  }


  xjsonParamCommons(selObject) {
    let jsonParam = {}
    selObject.forEach(p => {
      if (p.argumentName==="projectName") {
        if (this.selectedProject===undefined||this.selectedProject.name===undefined){
          alert('No study selected')
          return jsonParam
        }
        jsonParam[p.argumentName] = this.selectedProject.name
      } else if (p.internalVariableObjName&&p.internalVariableObjProperty) {          
          if (this[p.internalVariableObjName]===undefined||this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
            var msg=""
            if (this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
              msg='The object '+p.internalVariableObjName+' has no one property called '+p.internalVariableObjProperty
              alert(msg)
              //console.log(msg, this[p.internalVariableObjName][0])
            }else{
              msg='there is no object called '+p.internalVariableObjName+' in this view'
              alert(msg)
            }
            return jsonParam[p.argumentName] = "ERROR: "+msg
          }  
        jsonParam[p.argumentName] = this[p.internalVariableObjName][0][p.internalVariableObjProperty]
        
      } else if (p.element) {
        jsonParam[p.argumentName] = this[p.element].value // get value from field input
      } else if (p.defaultValue) {
        jsonParam[p.argumentName] = p.defaultValue // get value from default value (i.e incubator)
      } else if (p.selObjectPropertyName) {
        jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
      } else if (p.targetValue) {
        jsonParam[p.argumentName] = this.targetValue[p.argumentName] // get value from target element passed
      } else {
        jsonParam[p.argumentName] = p.value
      }
      //console.log('xjsonParamCommons', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
    })
    return jsonParam
  }


  getQueryFilterData() {
    console.log('getQueryFilterData')
    this.dataminingData.data = {}
    //let extraParams = {}
    // Object.entries(this.activeTab.extraParams).map((
    //   [key]) => extraParams[key] = this[key].value
    // )
    var extraParams=this.jsonParam(this.activeTab.filter) 
    let reqParams = {
      procInstanceName: this.procName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      dbName: this.config.dbName,
      schemaPrefix: this.procName, 
      actionName: this.activeTab.action, 
      ...this.activeTab.filter.fixParams,
      ...extraParams
    }
    let params = this.config.backendUrl + (this.activeTab.endPoint ? this.activeTab.endPoint : this.config.EnvMonSampleAPIQueriesStats)
      + '?' + new URLSearchParams(reqParams)
    this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        this.data = j
        if (j.recovery_rate&&j.recovery_rate.data){
          this.data.recoveryrate_datatable={}
          this.data.recoveryrate_datatable.conf =[]
          for (let i=0;i<j.recovery_rate.columns_data.length;i++){
            let newItem={}
            newItem.property=j.recovery_rate.columns_data[i].name
            newItem.header=j.recovery_rate.columns_data[i].name
            this.data.recoveryrate_datatable.conf.push(newItem)          
          }
          this.data.recoveryrate_datatable.data = j.recovery_rate.data
        }
        if (j.datatable){
          this.sampleData=j.datatable
        }
        this.chartImgs = []
      }
    })
  }

  setPrintContent() {
     //let header = `Report for the `
    // if (this.sampleData.sampleFieldToRetrieve) {
    //   header += `sample ${this.sampleData.sampleFieldToRetrieve.sample_id}`
    // } else if (this.sampleData.incubatorFieldToRetrieve) {
    //   header += `incubator ${this.sampleData.incubatorFieldToRetrieve.name}`
    // } else if (this.sampleData.batchFieldToRetrieve) {
    //   header += `batch ${this.sampleData.batchFieldToRetrieve.name}`
    // } else {
    //   header += `production lot ${this.sampleData.prodLotFieldToRetrieve.name}`
    // }
    let contentToPrint="Page Empty, nothing to print"
    let dataContent=this.shadowRoot.querySelector("div#kpidata")
    if (dataContent!==undefined&&dataContent!==null){
      contentToPrint=dataContent
    }
    this.printObj = {
      header: this.activeTab["label_"+this.lang],
      //content: this.setContent(header)
      content:contentToPrint
    }
  }

  setContent(header) {
    let session = JSON.parse(sessionStorage.getItem("userSession"))
    let sessionDate = session.appSessionStartDate
    let sessionUser = session.header_info.first_name +" "+ session.header_info.last_name +" ("+ session.userRole +")"
    let strContent = `<h2>Summary</h2>`
    strContent = this.sampleContent(strContent)
    strContent = this.incubatorContent(strContent)
    strContent = this.batchContent(strContent)
    strContent = this.lotContent(strContent)

    let str = `
      <style type="text/css">
      .page-header, .page-header-space {
        height: 50px;
        padding-top: 30px;
      }
      .page-header {
        font-size: 25px;
        position: fixed;
        top: 0mm;
        width: 100%;
        border-bottom: 1px solid black; /* for demo */
      }
      .page-footer, .page-footer-space {
        height: 50px;
        padding-top: 10px;
      }
      .page-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1px solid black; /* for demo */
      }
      .page {
        page-break-after: always;
      }
      @page {
        margin: 0mm 10mm 10mm;
        ${this.activeTab.label_en == 'Production Lot' ? 'size: landscape;' : '' }
      }
      @media print {
        thead {display: table-header-group;} 
        tfoot {display: table-footer-group;}
      }
      </style>

      <div class="page-header" style="text-align: center; font-weight: bold;">
        ${header}
      </div>

      <div class="page-footer">
        ${sessionUser} on ${sessionDate}<br>
        ${this.sampleData.report_info[0].report_information}
      </div>
      <table>
      <thead>
        <tr>
          <td>
            <!--place holder for the fixed-position header-->
            <div class="page-header-space"></div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <!--*** CONTENT GOES HERE ***-->
            <div class="page">${strContent}</div>
          </td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td>
            <!--place holder for the fixed-position footer-->
            <div class="page-footer-space"></div>
          </td>
        </tr>
      </tfoot>
    </table>
    `
    return str
  }

  sampleContent(strContent) {
    if (this.sampleData.sampleFieldsToDisplay && this.activeTab.label_en == "Sample") {
      this.sampleData.sampleFieldsToDisplay.forEach(d => {
        strContent += `<li>${d.field_name}: ${d.field_value}</li>`
      })
      strContent += `<h2>Stages</h2>`
      this.sampleData.stages.forEach(d => {
        strContent += `<table border="1" cellpadding="3" style="margin-bottom: 10px; border-collapse: collapse; width: 100%;"><tr><th>${d.current_stage}<br>${d.started_on}${d.ended_on&&` >> ${d.ended_on}`}</th></tr><tr><td>`
        if (d.current_stage == "Sampling") {
          d.data.forEach(data => {
            strContent += `Sampling Date: ${data.sampling_date}`
          })
        } else if (d.current_stage == "Incubation") {
          d.data.forEach(data => {
            strContent += `<table border="1" cellpadding="3" style="border-collapse: collapse; width: 100%;"><tr><th>Incubation 1</th><th>Incubation 2</th></tr><tr>`
            strContent += `<td>`
            data.incubation_1.forEach(f => {
              if (f.field_name) {
                strContent += `<li>${f.field_name}: ${f.field_value}</li>`
              }
            })
            strContent += `</td><td>`
            data.incubation_2.forEach(f => {
              if (f.field_name) {
                strContent += `<li>${f.field_name}: ${f.field_value}</li>`
              }
            })
            strContent += `</td></tr></table>`
          })
        } else if (d.current_stage == "PlateReading") {
          d.data.forEach(data => {
            if (data.field_name == "raw_value") {
              strContent += `Number of Colonies: ${data.field_value}`
            }
          })
        } else {
          d.data.forEach(data => {
            strContent += `<li>${data.name}: ${data.items}</li>`
          })
        }
        strContent += `</td></tr></table>`
      })
    }
    return strContent
  }

  incubatorContent(strContent) {
    if (this.sampleData.incubatorFieldsToDisplay) {
      this.sampleData.incubatorFieldsToDisplay.forEach(d => {
        strContent += `<li>${d.field_name}: ${d.field_value}</li>`
      })
      strContent += this.chartContent()
    }
    return strContent
  }

  batchContent(strContent) {
    if (this.sampleData.batchFieldsToDisplay) {
      this.sampleData.batchFieldsToDisplay.forEach(d => {
        strContent += `<li>${d.field_name}: ${d.field_value}</li>`
      })
      strContent += this.chartContent()
      let batches = this.sampleData.SAMPLES_ARRAY.map(d => d.sample_id)
      strContent += `<table border="1" cellpadding="3" style="margin: 10px auto; border-collapse: collapse; width: 100%;"><tr><th>Batch Content (${this.sampleData.NUM_SAMPLES} samples)</th></tr><tr><td>${batches.join(", ")}</td></tr></table>`
    }
    return strContent
  }

  lotContent(strContent) {
    if (this.sampleData.prodLotFieldsToDisplay) {
      this.sampleData.prodLotFieldsToDisplay.forEach(d => {
        strContent += `<li>${d.field_name}: ${d.field_value}</li>`
      })
      strContent += this.chartContent()
      strContent += `<br><table border="1" cellpadding="3" style="margin-top: 10px; border-collapse: collapse; width: 100%;">`
      strContent += `<tr><th>Sample ID</th><th>Sampling Date</th><th>Sampling Date End</th><th>Raw Value</th></tr>`
      this.sampleData.sample.forEach(s => {
        if (s.spec_code) {
          strContent += `<tr><td>${s.sample_id}</td><td>${s.sampling_date}</td><td>${s.sampling_date_end}</td><td>${s.raw_value?s.raw_value:''}</td></tr>`
        }
      })
      strContent += `</table>`  
    }
    return strContent
  }

  chartContent() {
    let imgs = ``
    this.chartImgs.forEach(img => {
      imgs += `<img src="${img}" style="margin-bottom=10px;"><br>`
    })
    return imgs
  }

  print() {
    this.setPrintContent()
    var printWindow = window.open('', '', 'fullscreen=yes');
    printWindow.document.write(this.printObj.content);
    printWindow.document.title = this.printObj.header;
    printWindow.document.close();
    setTimeout(function () {
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  /**
   * Populating fetch api
   * @param {*} urlParams the url api with params
   */
  fetchApi(urlParams) {
    this.dispatchEvent(new CustomEvent('set-activity', {bubbles: true, composed: true}))
    return fetch(urlParams).then(async r => {
      if (r.status == 200) {
        return r.json()
      } else {
        let err = await r.json()
        throw err
      }
    }).then(j => {
      this.dispatchEvent(new CustomEvent('success', {
        detail: {...j},
        bubbles: true,
        composed: true
      }))
      return j
    }).catch(e => {
      this.dispatchEvent(new CustomEvent("error", {
        detail: {...e},
        bubbles: true,
        composed: true
      }))
      return
    })
  }
}
window.customElements.define('datamining-mainview', DataMiningMainView);
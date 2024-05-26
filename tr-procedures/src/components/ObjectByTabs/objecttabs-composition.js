import { html, css, nothing } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@alenaksu/json-viewer';
import '@spectrum-web-components/split-view/sp-split-view';
import {DataViews} from '../../components/Views/DataViews';

import { CardMultipleElementsView } from '../Views/CardMultipleElementsView';

import {CoaView} from '../../components/Views/CoaView';
import "../Tree/treeview/index";
import "../ParentReadOnlyTable/ParentReadOnlyTable";

import {TrazitGenericDialogs} from '../GenericDialogs/TrazitGenericDialogs';
import { TrazitTestScriptNewStepDialog } from '../GenericDialogs/TrazitTestScriptNewStepDialog';
import { TrazitReactivateObjectsDialog } from "../GenericDialogs/TrazitReactivateObjectsDialog";

import { ModuleEnvMonitClientMethods } from "../../module_env_monit/ModuleEnvMonitClientMethods";
import { TrazitEnterResultWithSpec } from "../GenericDialogs/TrazitEnterResultWithSpec";
import { ModuleEnvMonitDialogsMicroorganism } from "../../module_env_monit/Dialogs/ModuleEnvMonitDialogsMicroorganism";
import { TrazitInvestigationsDialog } from "../GenericDialogs/TrazitInvestigationsDialog";

import { TrazitCredentialsDialogs } from "../GenericDialogs/TrazitCredentialsDialogs";
import { TrazitTakePictureDialog } from '../GenericDialogs/TrazitTakePictureDialog';


export class ObjecttabsComposition extends TrazitTakePictureDialog(CardMultipleElementsView(TrazitCredentialsDialogs((TrazitInvestigationsDialog(ModuleEnvMonitDialogsMicroorganism(TrazitEnterResultWithSpec(ModuleEnvMonitClientMethods(TrazitReactivateObjectsDialog(CoaView(TrazitGenericDialogs(TrazitTestScriptNewStepDialog(DataViews(CredDialog))))))))))))) {
  static get styles() {
    return [
      Layouts,
      //super.styles,
      css`
        mwc-button {
          --mdc-typography-button-text-transform: none;
          margin: 0 2px;
          --mdc-typography-button-font-size: 15px;
        }
        tr-dialog * {
          margin-bottom: 5px;
        }
        mwc-textfield[hidden] {
          display: none;
        }
        @media (max-width: 460px) {
          vaadin-grid {
            font-size: 10px;
          }
          vaadin-grid-cell-content {
            padding: 5px;
          }
        }
        json-viewer{
          --background-color: #2a2f3a00;
          --string-color: #24C0EB;
          --property-color: rgba(36, 75, 170, 0.9);
          --preview-color: #24C0EB;
          --font-family: Montserrat;
          --key-color: rgba(36, 75, 170, 0.9);          
        } 
        span.cardLabel {
          font-weight: bold;
          color: #032bbc;
          font-size: 10px;
          word-break: auto-phrase;
          color: rgb(41, 137, 216); /* #032bbc; */
  
        }
        span.cardValue {
          color: #009879;
          font-size:8px; 
          display:inherit;            
          word-break: auto-phrase;
        }
  
      `
    ];
  }
  static get properties() {
    return {
      selectedTabModelFromProcModel: { type: Object },
      viewModelFromProcModel: { type: Object },
      lang: {type: String},
      config: { type: Object },
      procInstanceName: { type: String },
      selectedItem: { type: Object },
      sopsPassed: { type: Boolean },
      viewName: { type: String },
      procedureName: { type: String },
      procedureVersion: { type: Number },
      filterName: { type: String },
      moduleName: { type: String },
      moduleVersion: { type: Number },
      isProcManagement: { type: Boolean },
      filterCurrentData: {type: Object},
      selectedItemInView:{ type: Object },
      selectedTableIndex: { type: Object }
    }
  }
  constructor() {
    super()
    this.viewModelFromProcModel={}
    this.selectedItem = {}
    this.selectedItemInView ={}
    this.selectedTabModelFromProcModel = {}
    this.config = {}
    this.sopsPassed=false    
    this.filterCurrentData={}
    this.lang = "";
    this.selectedTableIndex = {};
    this.connectedCallback();
    this.moduleName='';
  }

  handleTabSelected(event) {
    //const { selectedTab } = event.detail;
    alert('tab selected, objectabs-composition')
    // Reset table or perform other actions based on the selected tab
    this.dispatchEvent(new CustomEvent('tab-selected', {bubbles: true,composed: true}));  
  }
  render(){
    //console.log('viewName', this.viewName, 'view_definition', this.selectedTabModelFromProcModel.view_definition, 'selectedItem', this.selectedItem)
    return html`
      <div id="mainDiv">
        ${this.selectedTabModelFromProcModel===undefined?nothing:html`
          ${this.kpiElementsController(this.selectedTabModelFromProcModel.view_definition, this.selectedItem)}
        `}
      </div>
      ${this.genericFormDialog()}
      ${this.reactivateObjectsDialog()}
      ${this.testScriptNewStepFormDialog()}

      ${this.credentialsDialog()}  
      ${this.reactivateObjectsDialog()}
      ${this.moduleEnvMonitMicroorganismsDialogAdd()}
      ${this.moduleEnvMonitMicroorganismsDialogRemove()}

      ${this.takePictureFormDialog()}
     
      ${this.pointTemplate()} ${this.resultTemplate(this.procInstanceName)}
      ${this.investigationTemplate()}
      ${this.filterName == "open"
        ? html`${this.decisionTemplate()}`
        : nothing}
      ${this.decisionTemplate()}      
      ${super.render()}

    ` 
  }

  initTableResize(table) {

    const min = 150;
    // The max (fr) values for grid-template-columns
    const columnTypeToRatioMap = {
      numeric: 1,
      'text-short': 1.67,
      'text-long': 3.33,
    };

    /*
      The following will soon be filled with column objects containing
      the header element and their size value for grid-template-columns 
    */
    const columns = [];
    let headerBeingResized;

    // The next three functions are mouse event callbacks

    // Where the magic happens. I.e. when they're actually resizing
    const onMouseMove = (e) => requestAnimationFrame(() => {
      // Calculate the desired width
      const bounding = headerBeingResized.getBoundingClientRect();
      const width = e.clientX - bounding.x;
      
      // Update the column object with the new size value
      const column = columns.find(({ header }) => header === headerBeingResized);
      column.size = Math.max(min, width) + 'px'; // Enforce our minimum
      
      // For the other headers which don't have a set width, fix it to their computed width
      columns.forEach((column) => {
        if(column.size.startsWith('minmax')){ // isn't fixed yet (it would be a pixel value otherwise)
          column.size = parseInt(column.header.clientWidth, 10) + 'px';
        }
      });
      
      /* 
        Update the column sizes
        Reminder: grid-template-columns sets the width for all columns in one value
      */
      table.style.gridTemplateColumns = columns
        .map(({ header, size }) => size)
        .join(' ');
    });

    // Clean up event listeners, classes, etc.
    const onMouseUp = () => {
      console.log('onMouseUp');
      
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      headerBeingResized.classList.remove('header--being-resized');
      headerBeingResized = null;
    };

    // Get ready, they're about to resize
    const initResize = (e) => {
      console.log('initResize');
      e.stopPropagation();
      headerBeingResized = e.target.parentNode;
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      headerBeingResized.classList.add('header--being-resized');
    };

    // Let's populate that columns array and add listeners to the resize handles
    table.querySelectorAll('th').forEach((header) => {
      const max = '3.33fr';
      columns.push({ 
        header, 
        // The initial size value for grid-template-columns:
        size: `minmax(${min}px, ${max})`,
      });
      const resizer = header.querySelector('.resize-handle');
      if(resizer)
        resizer.addEventListener('mousedown', initResize);
    });
  }

  resetTableSize(table) {
    table.style.gridTemplateColumns = null;
  }

  updated(changedProperties) {
    if(changedProperties.has('selectedTabModelFromProcModel')) {
      const tables = this.shadowRoot.querySelectorAll("table");
      tables.forEach((table) => {
        this.resetTableSize(table);
        this.initTableResize(table)
      });    
    }
    if(changedProperties.has('selectedTableIndex')) {
      const tables = this.shadowRoot.querySelectorAll("table");
      tables.forEach((table) => {
        this.initTableResize(table)
      });  
    }
  }

  print2LevelsObject(elem, data){    
    console.log(elem.elements)
    return html`    
    ${elem.type==="reportTitle" ? this.kpiReportTitle(elem, data) : nothing}
    <div style="display: flex; flex-wrap: wrap; padding-left:30px; gap: 10px">        
      ${elem.elements.map((elem2, i) => {
        return html`
          ${elem2.is_translation===undefined||(elem2.is_translation!==undefined&&elem2.is_translation===true&&elem2.lang!==undefined&&elem2.lang===this.lang) ?
          html`              
            ${elem2.type==="reportTitle" ? this.kpiReportTitleLvl2(elem2, data[elem.endPointResponseObject], true) : nothing}
            ${elem2.type==="card" ? this.kpiCard(elem2, data[elem2.endPointResponseObject], true) : nothing}
            ${elem2.type==="cardSomeElementsSingleObject" ? this.kpiCardSomeElementsSingleObject(elem2, data, true) : nothing}
            ${elem2.type==="cardSomeElementsRepititiveObjects" ? this.cardSomeElementsRepititiveObjects(elem2, data, true) : nothing}              
            ${elem2.type==="recovery_rate" ? this.kpiRecoveryRate(elem2, true) : nothing}
            ${elem2.type==="grid" ? this.kpiGrid(elem2, data[elem2.endPointResponseObject], true) : nothing}
            ${elem2.type==="chart" ? this.kpiChartFran(elem2, true) : nothing}   

            ${elem2.type==="jsonViewer" ? this.jsonViewer(elem2, data, true): nothing}
            ${elem2.type==="readOnlyTable" ? this.readOnlyTable(elem2, data, true): nothing}
            ${elem2.type==="parentReadOnlyTable" ? this.parentReadOnlyTable(elem2, data, true, undefined, undefined,): nothing}
            ${elem2.type==="readOnlyTableByGroup" ? this.readOnlyTableByGroup(elem2, data, true): nothing}
            ${elem2.type==="readOnlyTableByGroupAllInOne" ? this.readOnlyTableByGroupAllInOne(elem2, data, true): nothing}

            ${elem2.type==="rolesAndActions"&&elem2.endPointResponseObject2!==undefined&&data[elem2.endPointResponseObject]!==undefined ? 
              this.rolesAndActions(elem2, data[elem2.endPointResponseObject][elem2.endPointResponseObject2], true, this.lang) : nothing}
            ${elem2.type==="rolesAndActions"&&elem2.endPointResponseObject2===undefined ? 
              this.rolesAndActions(elem2, data[elem2.endPointResponseObject], true, this.lang) : nothing}   

            ${elem2.type==="coa" ? this.coa(elem, data[elem.endPointResponseObject], true): nothing}

            ${elem2.type==="dragDropBoxes" ? this.dragDropBoxes(elem, data[elem2.endPointResponseObject]) : nothing}
              
            ${elem2.type==="cardMultipleElementsView" ? this.cardMultipleElementsView(elem2, data[elem2.endPointResponseObject]) : nothing}

            ${(elem2.includeChild===undefined||elem2.includeChild===false) ? nothing :
              html`
                  ${this.kpiCardSomeElementsChild(elem2, data, true)}
            `}              
            ${elem2.type==="Report" ? this.ReportController(elem2, true) : nothing}
            ${elem2.type==="testScripts" ? this.scripts(elem2, true) : nothing}
            ${elem2.type==="spectestScripts" ? this.specScripts(elem, true) : nothing}
            ${elem2.type==="buttonsOnly" ? this.buttonsOnly(elem2, data[elem.endPointResponseObject]) : nothing}
            ${elem2.type==="tree" ? this.treeElement(elem2, data)   : nothing}

          `:nothing}
        `
      })} 
    </div>
  `
  }
  print1LevelObject(elem, data){   
    
    return html`    
      ${elem.type==="reportTitle" ? this.kpiReportTitle(elem, data[elem.endPointResponseObject]) : nothing}
      ${elem.type==="card" ? this.kpiCard(elem, data[elem.endPointResponseObject]) : nothing}
      ${elem.type==="cardSomeElementsSingleObject" ? this.kpiCardSomeElementsSingleObject(elem, data) : nothing}
      ${elem.type==="cardSomeElementsRepititiveObjects" ? this.cardSomeElementsRepititiveObjects(elem, data) : nothing}    
      ${elem.type==="recovery_rate" ? this.kpiRecoveryRate(elem) : nothing}
      ${elem.type==="grid" ? this.kpiGrid(elem, data[elem.endPointResponseObject]) : nothing}
      ${elem.type==="chart" ? this.kpiChartFran(elem) : nothing}   
      ${elem.type==="jsonViewer" ? this.jsonViewer(elem, data, true): nothing}
      ${elem.type==="readOnlyTable" ? this.readOnlyTable(elem, data, true): nothing}
      ${elem.type==="readOnlyTableByGroup" ? this.readOnlyTableByGroup(elem, data, true): nothing}
      ${elem.type==="readOnlyTableByGroupAllInOne" ? this.readOnlyTableByGroupAllInOne(elem, data, true): nothing}
      ${elem.type==="parentReadOnlyTable" ? 
      this.parentReadOnlyTable(elem, data, true, undefined, undefined,undefined,elem.theme,): nothing}

      ${elem.type==="dragDropBoxes" ? this.dragDropBoxes(elem, data[elem.endPointResponseObject]) : nothing}

      ${elem.type==="cardMultipleElementsView" ? this.cardMultipleElementsView(elem, data[elem.endPointResponseObject]) : nothing}
      

      ${elem.type==="rolesAndActions"&&elem.endPointResponseObject2!==undefined ? 
        this.rolesAndActions(elem, data[elem.endPointResponseObject][elem.endPointResponseObject2], true, this.lang) : nothing}
      ${elem.type==="rolesAndActions"&&elem.endPointResponseObject2===undefined ? 
        this.rolesAndActions(elem, data[elem.endPointResponseObject], true, this.lang) : nothing}   


      ${elem.type==="readOnlyTable"&&elem.endPointResponseObject2!==undefined&&data[elem.endPointResponseObject]!==undefined ? 
        this.readOnlyTable(elem, data[elem.endPointResponseObject][elem.endPointResponseObject2]) : nothing}
      ${elem.type==="readOnlyTable"&&elem.endPointResponseObject2===undefined ? 
        this.readOnlyTable(elem, data[elem.endPointResponseObject]) : nothing}
      
      ${(elem.includeChild===undefined||elem.includeChild===false) ? nothing :
        html`
            ${this.kpiCardSomeElementsChild(elem, data)}
      `}
      ${elem.type==="Report" ? this.ReportController(elem) : nothing}
      ${elem.type==="testScripts" ? this.scripts(elem, true) : nothing}
      ${elem.type==="spectestScripts" ? this.specScripts(elem, true) : nothing}
      ${elem.type==="coa" ? this.coa(elem, data[elem.endPointResponseObject], true): nothing}   
      ${elem.type==="buttonsOnly" ? this.buttonsOnly(elem, data[elem.endPointResponseObject]) : nothing}
      ${elem.type==="tree" ? this.treeElement(elem, data)   : nothing}
 
    `
  }

  treeElement(elem, data){
    //console.log('treeElement', elem, data)    
    let dataArr=[]
      dataArr = this.getDataFromRoot(elem, data);
    //console.log('dataArr', dataArr)  
    return html`<tree-view .specification=${elem.view_definition} .data=${dataArr}></tree-view>`
  }

  kpiElementsController(elemDef = this.selectedTabModelFromProcModel, data = this.selectedItem) {
    if (data===undefined||elemDef===undefined){return}
    // if (this.selectedItem!==undefined){
    //   console.log(this.selectedItem.procInstanceName, 'kpiElementsController', 'data', data, 'elemDef', elemDef)
    // }    
    //console.log('elemDef', elemDef)
    return  html`
        <div style="display:block">
          ${elemDef!==undefined&&Array.isArray(elemDef)?
          html`    
            ${elemDef.map((elem, i) =>           
            html`
              ${elem.is_translation===undefined||(elem.is_translation!==undefined&&elem.is_translation===true&&elem.lang!==undefined&&elem.lang===this.lang) ?
              html`              
                ${elem.elements!==undefined? html` ${this.print2LevelsObject(elem, data)}`: html`${this.print1LevelObject(elem, data)}`}
              `:nothing}
            `                
            )}
          `:
            html`
            ${elemDef.is_translation===undefined||(elemDef.is_translation!==undefined&&elemDef.is_translation===true&&elemDef.lang!==undefined&&elemDef.lang===this.lang) ?
            html`              
              ${elemDef.elements!==undefined? html` ${this.print2LevelsObject(elemDef, data)}`: html`${this.print1LevelObject(elemDef, data)}`}
            `:nothing}
          `}
        </div>
    `
  } 
  
  handleTabSelected(event) {
    //const { selectedTab } = event.detail;
    alert('tab selected, objectabs-composition')
    // Reset table or perform other actions based on the selected tab
    this.resetTable();  // Assuming resetTable is a method that resets the table
}

// Ensure to clean up in disconnectedCallback
disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('tab-selected', this.handleTabSelected);
}
connectedCallback() {
  super.connectedCallback();
  this.addEventListener('tab-selected', this.handleTabSelected);
}
resetTable() {
  alert('resetTable, objectabs-composition')
  // Logic to reset the table, potentially checking if the correct table is active
  if (this.shadowRoot.querySelector('parentReadOnlyTable')) {
      this.shadowRoot.querySelector('parentReadOnlyTable').reset();
  }
} 


}
window.customElements.define('objecttabs-composition', ObjecttabsComposition);
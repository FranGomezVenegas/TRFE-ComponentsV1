import { html, css, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { ApiFunctions } from "../Api/ApiFunctions";
import { ProceduresManagement } from "../../0proc_models/ProceduresManagement";
import "@spectrum-web-components/split-view/sp-split-view";
import "../../components/ObjectByTabs/objecttabs-composition";
import "../../components/ObjectByTabs/object-by-tabs";
import { CommonCore } from "@trazit/common-core";
import { TrazitFormsElements } from "../GenericDialogs/TrazitFormsElements";
import { ProcManagementMethods } from "./ProcManagementMethods";
import {TrazitTestScriptNewStepDialog} from "../GenericDialogs/TrazitTestScriptNewStepDialog";
import { PrintViews } from "./procManagementPrint";
export class ProcManagementHome extends PrintViews(TrazitTestScriptNewStepDialog(ProcManagementMethods(ApiFunctions(TrazitFormsElements(CommonCore))))) {
  static get properties() {
    return {
      config: { type: Object },
      procMgrModel: { type: Object },
      procDefinitionViewCollapsed: { type: Boolean },
      procDeployViewCollapsed: { type: Boolean },
      procDeployViewCheckerCollapsed: { type: Boolean },
      procTestingCoverageCollapsed: { type: Boolean },
      procTestingScriptsCollapsed: { type: Boolean },
      selectedProcInstance: { type: Object },
      viewModelFromProcModel: { type: Object },
      show: { type: Boolean },
      selectedViewDefinition: { type: Object },
      selectedItems: { type: Array },
      moduleVersion: { type: Number },
      moduleName: { type: String },
      procedureVersion: { type: Number },
      procedureName: { type: String },
      procInstanceName: { type: String }, // This one is for the buttons and should be fix to proc_management to get this procedure model
      actionOutput: { type: Object },
      allProcedures: { type: Array },
      leftSplitDisplayed: { type: Boolean },
      selectedTabModelFromProcModel: { type: Array },
      localModel: { type: Boolean },
      mainview_definition: { type: Array},
      mainViewData:{type: Array},
      area: { type: String },
      isProcManagement: { type: Boolean },
      selectedItem: { type: Object },
      selectedCompositionView: { type: Object },
      selectedViewIndex: {type: Number},
      selectedTestIndex: {type: Number}
    };
  }

  constructor() {
    super();
    this.mainViewData=[]
    this.isProcManagement=true
    this.procedureVersion=-1
    this.procedureName=""
    this.moduleVersion=-1
    this.moduleName=""
    let data={"fake": true}
    this.mainViewData.push(data)
    this.mainview_definition=[]
    let action={}
    action = 		
    {"name": "",
    "title": {
      "label_en": "",
      "label_es": ""
    },
    "expanded": false,    
      "view_definition": [
        { "elements": [
            { "type": "buttonsOnly",
              "actions": [
                { "actionName": "NEW_PROCEDURE",
                  "area": "app",
                  "certificationException": true,
                  "requiresDialog": true,
                  "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                  "secondaryActionToPerform":{
                    "name":"refreshAllProceduresView"
                  },                  
                  "endPointParams": [
                { "argumentName": "procedureName", "element": "text1", "defaultValue": ""  },
                { "argumentName": "procedureVersion", "fixValue": "1"},
                { "argumentName": "newprocInstanceName", "element": "text2", "defaultValue": "" },
                { "argumentName": "moduleName", "element": "list1", "defaultValue": "" },
                { "argumentName": "moduleVersion", "fixValue": "1" },
                { "argumentName": "labelEn", "element": "text3", "defaultValue": "" },
                { "argumentName": "labelEs", "element": "text4", "defaultValue": "" }
                  ],
                  "button": {
                    "icon": "create_new_folder",
                    "title": {
                      "label_en": "New", "label_es": "Nuevo"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {          
                    "name": "genericDialog",
                    "fields": [
                      {"text1": { "label_en": "Process Name", "label_es": "Nombre del Proceso" }},
                      {"text2": { "label_en": "Instance", "label_es": "Instancia" }},
                      {"text3": { "label_en": "Label EN", "label_es": "Etiqueta EN", "optional": true }},
                      {"text4": { "label_en": "Label ES", "label_es": "Etiqueta ES", "optional": true }},

                      {"list1": {
                        "label_en": "Module", "label_es": "Módulo", "optional": true,
                        "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
                        "valuesFromMasterData": {
                        "propertyNameContainer": "modules",
                        "propertyNameContainerLevelPropertyKeyName": "module_name",
                        "propertyKeyName": "module_name", "propertyKeyValueEn": "description_en", "propertyKeyValueEs": "description_es"
                        }			
                      }}
                    ]
                  }
                }
              ]
            }
            ]
          }
      ]
    }
    this.area="app"
    this.mainview_definition=action
    this.localModel = false;
    this.leftSplitDisplayed = true;
    this.show = false;
    this.selectedViewDefinition = {};
    this.actionOutput = {};
    this.selectedItems = [];
    this.allProcedures = [];
    if (!customElements.get("mwc-notched-outline")) {
      customElements.define("mwc-notched-outline", NotchedOutline);
    }
    this.viewModelFromProcModel = undefined;
    this.selectedProcInstance = undefined;
    this.viewModelFromProcModel = {};
    this.selectedTabModelFromProcModel = [];
    this.viewModelFromProcModel.viewQuery = {
      actionName: "ALL_PROCEDURES_DEFINITION",
      area: "app",
      label_en: "All Procedures Definition",
      label_es: "Definición de todos los procesos",
      endPoint: "/appProcMgr/RequirementsProcedureDefinitionAPIQueries",
      notUseGrid: true,
      variableName: "allProcedures",
      endPointResponseVariableName: "all_platform_procedures_list",
    };
    //this.viewModelFromProcModel=ProcManagement.ProcedureDefinition
    // console.log('constructor', 'this.config', this.config, this.viewModelFromProcModel)

    if (this.localModel) {
      this.allProcedures =
        ProceduresManagement.ProceduresFake.all_platform_procedures_list;
      this.selectedProcInstance = this.allProcedures[0];
      // this.selectSectionView(0);
      // this.selectedViewDefinition = this.selectedProcInstance.views[0];

      if (this.selectedViewDefinition.alternative_endpoint_data !== undefined) {
        //this.objecttabsComposition.selectedItem = this.selectedProcInstance[this.selectedViewDefinition.alternative_endpoint_data]
        this.selectedItem =
          this.selectedProcInstance[
            this.selectedViewDefinition.alternative_endpoint_data
          ];
      } else {
        //this.objecttabsComposition.selectedItem = this.selectedProcInstance.definition
        this.selectedItem = this.selectedProcInstance.definition;
      }
    } else {
      this.GetViewData(this.viewModelFromProcModel.viewQuery);
    }

    window.addEventListener(
      "session-storage-updated",
      this.handleSessionStorageUpdated.bind(this)
    );

    window.addEventListener(
      "refresh-all-procedures",
      this.resetView.bind(this)
    );
    
  }

  handleSessionStorageUpdated(event) {
    const { key, value } = event.detail;
    if (key === "newProcInstance") {

        this.selectedProcInstance = value;
        
        let selectedScripts = sessionStorage.getItem("selectedScripts");
        if (selectedScripts !== undefined && selectedScripts !== null) {
          selectedScripts = JSON.parse(selectedScripts);
          const procScript = selectedScripts.find(
            (script) => script.proc_instance_name === this.procInstanceName
          );

          if (procScript) {
            if (this.selectedViewDefinition.tabs!==undefined){
              this.objectByTabs.selectedItemInView = procScript;
              this.objectByTabs.selectedTabModelFromProcModel =this.selectedViewDefinition;
            }else{            
              this.objecttabsComposition.selectedItemInView = procScript;
              this.objecttabsComposition.selectedTabModelFromProcModel =this.selectedViewDefinition;
            }
          }
        }
        if (this.selectedViewDefinition.tabs!==undefined){
          //.selectedItem=${this.mainViewData} 
          this.mainViewData = {}
          this.mainViewData=value;
          // this.objectByTabs.selectedItem = {}
          // this.objectByTabs.selectedItem = value
          this.selectedItem = value.definition;
          this.objectByTabs.isProcManagement = true;
          // this.objectByTabs.render();          
        }else{          
          this.objecttabsComposition.isProcManagement = true;
          this.objecttabsComposition.render();
        }
      }
      
  }

  resetView() {
    this.selectedProcInstance = undefined;
    this.selectedViewDefinition = undefined;
    this.selectedCompositionView = undefined;
    //this.GetViewData(this.viewModelFromProcModel.viewQuery)
    if (this.localModel) {
      this.allProcedures =
        ProceduresManagement.ProceduresFake.all_platform_procedures_list;
      this.render();
    } else {
      this.GetViewData(this.viewModelFromProcModel.viewQuery);
      this.render();
    }
  }

  selectSectionView(index, notResetSelectedView) {    
    console.log('selectSectionView', index, notResetSelectedView)
    this.selectedViewIndex = index;
    this.selectedTestIndex = -1;

    if (notResetSelectedView === undefined || !notResetSelectedView) {
      this.selectedItem = {};
    }
    this.selectedTabModelFromProcModel = [];
    this.selectedViewDefinition = {};
    this.selectedViewDefinition = this.selectedProcInstance.views[index];
    this.procedureName = this.selectedProcInstance.procedure_name;
    this.procedureVersion = this.selectedProcInstance.procedure_version;
    this.procInstanceName = this.selectedProcInstance.proc_instance_name;
    this.moduleName = this.selectedProcInstance.module_name;
    this.moduleVersion = this.selectedProcInstance.module_version;

    this.selectedProcInstance[0] = this.selectedProcInstance;

    if(!this.selectedViewDefinition.tabs) {
      this.selectedCompositionView = this.selectedViewDefinition.view_definition.reportElements; 
    }

    //console.log('this.selectedViewDefinition', this.selectedViewDefinition, 'procInstanceName', this.procInstanceName)
    // if (this.objecttabsComposition == null) {
    //   return;
    // }
    if (this.selectedViewDefinition.alternative_endpoint_data !== undefined&&this.selectedViewDefinition.alternative_endpoint_data=="actionOutput") {
      this.selectedItem = this.actionOutput
    } else if (this.selectedViewDefinition.alternative_endpoint_data !== undefined) {
      this.selectedItem =
        this.selectedProcInstance[
          this.selectedViewDefinition.alternative_endpoint_data
        ];
      this.selectedTabModelFromProcModel = this.selectedViewDefinition;
    } else {
      this.selectedTabModelFromProcModel = this.selectedViewDefinition;
      this.selectedItem = this.selectedProcInstance.definition;
    }
    
    // Get from session storage

    // let selectedScripts = sessionStorage.getItem("selectedScripts");
    // if (selectedScripts !== undefined && selectedScripts !== null) {
    //   selectedScripts = JSON.parse(selectedScripts);
    //   const procScript = selectedScripts.find(
    //     (script) => script.proc_instance_name === this.procInstanceName
    //   );

    //   if (procScript) {
    //     this.objecttabsComposition.selectedItem = procScript;
    //     this.objecttabsComposition.selectedTabModelFromProcModel=this.selectedViewDefinition;
    //     this.objecttabsComposition.procedureName=this.procedureName
    //     this.objecttabsComposition.procedureVersion=this.procedureVersion
    //   }
    // }

    this.isProcManagement = true;
    // this.objecttabsComposition.render();

    // Scroll down to right split on mobile
    if (this.desktop) return;
    this.scrollToSection("#rightSplit");
  }

  handleMouseMove(evt) {
    const el = evt.target;
    const { layerX, layerY } = evt;
    const height = el.clientHeight + 70;
    const width = el.clientWidth + 70;
    const yRotation = ((layerX - width / 2) / width) * 20;
    const xRotation = ((layerY - width / 2) / height) * 20;
    const transform = `perspective(300px) scale(0.9) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    el.style.transform = transform;
  }

  handleMouseOut(evt) {
    const el = evt.target;
    el.style.transform = `perspective(300px) scale(1) rotateX(0) rotateY(0)`;
  }
  loadDialogs(){
    //console.log('loadDialogs')
    //${this.credentialsDialog()}
    return html`    
      ${this.genericFormDialog()}
      ${this.testScriptNewStepFormDialog()}
    `
  }
  updated(changedProperties) {
    // leftSplitDisplayed
    if (changedProperties.has("show")) {
      const element = this.shadowRoot.querySelector(".fade-in");
      if (this.show) {
        if (element !== null) {
          element.classList.add("fade-in");
        }
      } else {
        if (element !== null) {
          element.classList.remove("fade-in");
        }
      }
      if (changedProperties.has("selectedProcInstance")) {
        this.selectedViewDefinition = this.selectedProcInstance.views[0];
        // this.selectSectionView(0);
      }
    }
    if (changedProperties.has("this.allProcedures")) {
      // find the selected object in the new allArr array
      this.selectedProcInstance = this.allProcedures.find(
        (obj) =>
          obj.proc_instance_name ===
          this.selectedProcInstance.proc_instance_name
      );
    }
    const items = this.shadowRoot.querySelectorAll(".accordion-item");
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const isActive = item.hasAttribute("data-active");
      //const content = item.querySelector('.accordion-content');
      // const content = this.shadowRoot.querySelector('div#section'+i+'_detail');

      // if (isActive) {
      //   content.style.maxHeight = content.scrollHeight + 'px';
      // } else {
      //   content.style.maxHeight = null;
      // }
    }
  }
  async authorized() {
    super.authorized();
  }

  connectedCallback() {
    super.connectedCallback();
    this.show = true;
  }

  scrollToSection(id) {
    const section = this.shadowRoot.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  fieldsToDiscard(fldName) {
    if (fldName === "navigation_icon_name") {
      return true;
    }
    if (fldName === "active") {
      return true;
    }
    return fldName.includes("label") && !fldName.includes(this.lang);
  }

  render() {
    return html`
      ${this.selectedProcInstance === undefined
        ? html`
            <style>
              $red: #aa392e;
              $blue: #1b1c38;
              $grey: #9f9b98;
              $black: #111111;
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: Montserrat, sans-serif;
              }

              .container {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
              }

              .product_grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
                gap: 24px;
              }

              @media (min-width: 990px) {
                .product_grid {
                  gap: 36px;
                  padding: 24px 80px;
                }
              }

              .product_container {
                position: relative;
                border-radius: 12px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06),
                  0 4px 4px rgba(0, 0, 0, 0.03);
                box-sizing: border-box;
                transition: all 0.4s ease-in !important;
                cursor: pointer;

                &:hover {
                  box-shadow: none;
                  box-shadow: 0 10px 20px rgba(36, 192, 235, 0.19),
                    0 6px 6px rgba(36, 192, 235, 0.1);
                }
              }

              .product {
                position: absolute;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                color: #fff;
                box-shadow: -3px 0px 10px -2px rgba(0, 0, 0, 0.14);
                opacity: 0;
                transition: all 1s ease 0.5s;

                .title {
                  font-size: 19px;
                  padding-bottom: 10px;
                  font-weight: bolder;
                }

                .price {
                  font-size: 20px;
                }

                .image {
                  width: 40%;
                  padding: 30px 0;
                  transform: scale(2.5);
                }
              }

              .product > * {
                transform: translateY(-50px);
                opacity: 0;
                transition: all 0.8s ease;
              }

              .product:target {
                opacity: 1;
                z-index: 7;

                & .title {
                  transition-delay: 1.2s;
                }

                & .price {
                  transition-delay: 0.6s;
                }

                & .image {
                  transform: scale(1);
                  transition-delay: 0.8s;
                }

                & .color {
                  transition-delay: 1s;
                }
              }

              .product:target > * {
                transform: translateY(0px);
                opacity: 1;
                transition: all 0.8s ease;
              }

              #product_one,
              .first_link {
                background: radial-gradient(lighten($red, 0.8), $red);
              }

              #product_two,
              .second_link {
                background: radial-gradient(lighten($blue, 0.8), $blue);
              }

              #product_three,
              .third_link {
                background: radial-gradient(lighten($grey, 0.8), $grey);
              }

              #product_four,
              .fourth_link {
                background: radial-gradient(lighten($black, 0.8), $black);
              }

              .nav_btns {
                display: flex;
                z-index: 70;
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);

                .link {
                  width: 25px;
                  height: 25px;
                  border-radius: 50%;
                  margin: 5px;
                  border: 1px solid white;
                }
              }
              .isLocked_true{
                color:red;
              }
              .isLocked_false{
                color:black;
              }
              .isLocked_undefined{
                color:black;
              }
              mwc-icon-button#locked-for-actions-icon {
                color:red;
                
              }
            </style>
            
            <div style="flex-basis: auto; width: auto;">            
              <objecttabs-composition 
                style="position:relative; left: 30px; top:10px; width:95%; display:block;" 
                .selectedTabModelFromProcModel=${this.mainview_definition}
                .lang=${this.lang} 
                .procedureName=${this.procedureName} 
                .procedureVersion=${this.procedureVersion} 
                .procInstanceName=${this.procInstanceName} 
                .config=${this.config}     
                .selectedItemInView=${this.mainViewData} 
                .moduleName=${this.moduleName} 
                .moduleVersion=${this.moduleVersion} 
                ?isProcManagement=${this.isProcManagement}
              ></objecttabs-composition>        
            </div>
            ${this.allProcedures===undefined||this.allProcedures.length==0? nothing:
            html`
            <div class="product_grid">
              ${this.allProcedures.map(
                (p, index) =>
                  html`
                    <div
                      class="product_container ${this.show
                        ? "fade-in"
                        : "show"}"
                    >
                      <div id="product_one22" class="xproduct">
                        <sp-card-ext
                          heading="${p.name}"
                          id="${p.proc_instance_name}"
                          subheading="'this[elem.subheadingObj].value'"
                          @click=${this.selectedProcedureInstance}
                        >
                          <div class="procCard" style="background:url(${p.navigation_icon_name ===undefined ? "trazit-logo.jpg"
                              : p.navigation_icon_name}) no-repeat center; 
                              height: 150px;
                              background-size: cover;"
                            slot="cover-photo"
                            @mousemove="${this.handleMouseMove}"
                            @mouseout="${this.handleMouseOut}"
                          ></div>
                          <ul slot="footer" class="procCard__footer">
                            ${p.cardData === undefined
                              ? nothing
                              : html`
                                  ${p.cardData.title === undefined
                                    ? nothing
                                    : html`<p class='isLocked_${p.locked_for_actions}'><span  style="font-weight: bold; font-size:18px;">
                                        ${p.locked_for_actions===undefined||p.locked_for_actions===false?nothing:html`<mwc-icon-button id="locked-for-actions-icon" icon="lock" alt="locked for changes"></mwc-icon-button>`}
                                        ${p["label_"+this.lang]}</span>
                                        ${
                                          p.cardData.subtitle === undefined
                                            ? nothing
                                            : html` <span style="font-size:16px;"
                                                >(${p.cardData.subtitle})</span
                                              >`
                                        }
                                        </p>`}
                                  ${p.cardData.fields === undefined
                                    ? nothing
                                    : html`
                                        ${p.cardData.fields.map(
                                          (d) =>
                                            html`
                                              ${this.fieldsToDiscard(
                                                d.field_name
                                              ) === true
                                                ? nothing
                                                : html`<li
                                                    style="color: rgba(36, 57, 170, 0.9); position:relative; left:20px;"
                                                  >
                                                    <b>${d.field_name}:</b>
                                                    ${d.field_value}
                                                  </li>`}
                                            `
                                        )}
                                      `}
                                  ${p.cardData.summary === undefined
                                    ? nothing
                                    : html`
                                        ${p.cardData.summary.map(
                                          (d) =>
                                            html`
                      <p>
                      <div style="display:inline-flex;">  
                      <div class="tooltip-container">                      
                        ${
                          d.signed !== undefined && d.signed === true
                            ? html`
                                <img
                                  class="trigger"
                                  style="height:25px; padding-right: 5px;"
                                  src="/images/procedures_pictures/Pass.jpg"
                                />
                                <div class="tooltip tooltip-blue">
                                  Step done and signed!
                                </div>
                              `
                            : html`
                                <img
                                  class="trigger"
                                  style="height:25px; padding-right: 5px;"
                                  src="/images/procedures_pictures/NotPass.png"
                                />
                                <div class="tooltip tooltip-red">
                                  Step not completed neither signed!
                                </div>
                              `
                        }
                      </div>
                      <div class="tooltip-container">
                          <div class="trigger progress-bar" data-progress="${
                            d.progress
                          }"><span class="bar">${d.section}: ${d.progress} ${
                                              d.progress_extra_text ===
                                              undefined
                                                ? ""
                                                : d.progress_extra_text
                                            }</span></div>
                          ${
                            d.tooltip == undefined
                              ? nothing
                              : html`<div class="tooltip tooltip-blue">
                                  ${d.tooltip}
                                </div>`
                          }
                      </div>
                      </div></p>
                      `
                                        )}
                                      `}
                                `}
                          </ul>
                        </sp-card-ext>
                      </div>
                    </div>
                  `
              )}
            </div>
          `}
          `
        : html`
            <div>
              ${this.selectedProcInstance.views === undefined
                ? nothing
                : html` <div>${this.selectedProcInstanceMainView()}</div>`}
            </div>
            <div></div>
          `}
    `;
  }

  toggleLeftSplitPane() {
    this.leftSplitDisplayed = !this.leftSplitDisplayed;
    this.render();
  }

  static get styles() {
    return [
      css`
        :host {
          font-family: Montserrat;
          display: flex;
          flex-direction: column;
        }
        .fade-in {
          opacity: 1;
          transition: opacity 2s ease-in-out;
        }
        .show {
          opacity: 0;
        }
        mwc-button {
          background-color: rgba(36, 192, 235, 1);
          font-family: Montserrat;
          font-weight: bold;
          font-size: 19px;
          --mdc-theme-primary: rgba(36, 192, 235, 1);
          border-radius: 32px;
          --mdc-button-horizontal-padding: 0px;
          --mdc-button-min-width: 20px;
        }
        mwc-button.mdc-button {
          min-width: 20px !important;
        }
        mwc-button.button {
          color: rgba(36, 192, 235, 1);
          font-family: Montserrat;
          font-weight: bold;
          font-size: 19px;
          background: rgb(36, 192, 235) none repeat scroll 0% 0%;
          font-family: Montserrat;
          font-weight: bold;
          font-size: 19px;
          color: white;
          border-color: transparent !important;
          --mdc-button-fill-color: red;
          --mdc-button-ink-color: blue;
          border-radius: 12px;
          min-width: 20px !important;
        }
        mwc-icon-button {
          color: rgba(36, 192, 235, 1);
          font-family: Montserrat;
          font-weight: bold;
          font-size: 19px;
          /* position: absolute; */
          cursor: zoom-in;
        }
        .mdc-icon-button {
          cursor: zoom-in;
        }
        #expand {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
        div.procCard {
          width: 100%;
          height: 200px;
          margin-bottom: 16px;
          transition: all 0.2s ease-in;
          border-radius: 12px 12px 0 0;
        }
        .procCard__footer {
          padding: 0 16px 16px;
          margin: 0;
        }

        .progress-bar {
          display: inline-block;
          width: 160px;
          height: 22px;
          background-color: #ddd;
          border-radius: 5px;
          color: white;
          padding-left: 5px;
          padding-top: 3px;
        }

        .bar {
          display: block;
          height: 100%;
          border-radius: 5px;
          padding-left: 10px;
        }

        /* Color ranges */
        [data-progress^="0"],
        [data-progress^="1"] {
          background-color: red;
        }

        [data-progress^="2"],
        [data-progress^="3"],
        [data-progress^="4"],
        [data-progress^="5"],
        [data-progress^="6"] {
          background-color: #ff8e00;
        }

        [data-progress^="7"],
        [data-progress^="8"],
        [data-progress^="9"] {
          background-color: rgb(156, 224, 100);
        }

        [data-progress^="100"] {
          background-color: green;
        }

        .tooltip-container {
          position: relative;
          display: inline-block;
        }

        .tooltip {
          font-family: Montserrat;
          visibility: hidden;
          opacity: 0;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-10%);
          padding: 5px;
          background-color: white;
          color: #24c0eb;
          border-color: #24c0eb;
          border-block-style: solid;
          transition: all 0.3s ease-in-out;
          z-index: 1;
          width: 180px;
        }
        .tooltip-red {
          color: #800c00;
          border-color: #800c00;
        }
        .tooltip-blue {
          color: #24c0eb;
          border-color: #24c0eb;
        }

        .trigger:hover + .tooltip,
        .tooltip:hover {
          visibility: visible;
          opacity: 1;
          top: calc(100% + 5px);
        }
        sp-split-view {
          height: calc(100vh - 100px);
          width: 100%;
          --spectrum-dragbar-handle-width: 0px;
        }
        @media screen and (max-width: 992px) {
          sp-split-view {
            height: auto;
            flex-direction: column;
          }
        }
        #splitter {
          width: 0px;
        }
        .splitter {
          background-color: blue;
        }
        .sp-split-view.collapsed {
          width: 0;
        }
        .pane-top-mobile {
          width: 100%;
        }
        #leftSplit {
          width: 100%;
          background-color: transparent;
          overflow-y: scroll !important;
          height: 100%;
          transition: all 0.4s ease-in-out;
        }
        @media screen and (min-width: 992px) {
          #leftSplit {
            padding: 10px;
            width: 290px;
            overflow: hidden;
            margin-bottom: 0;
          }
          #leftSplit.collapsed {
            width: 0;
            margin-bottom: 0;
          }
          .mobileTitle {
            display: none;
          }
          .desktopTitle {
            display: block;
          }
        }

        @media screen and (max-width: 992px) {
          #leftSplit {
            max-height: 2000px;
            margin-bottom: 10px;
          }
          #leftSplit.collapsed {
            margin-bottom: 0;
            max-height: 0px;
          }
          .mobileTitle {
            display: block;
            margin-bottom: 6px;
          }
          .desktopTitle {
            display: none;
          }
          .mobileTitle.hidden {
            display: none;
          }
        }

        #leftSplit.isMobile.collapsed {
          height: 0;
        }

        div#leftSplit::-webkit-scrollbar {
          width: 8px;
        }

        div#leftSplit::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        div#leftSplit::-webkit-scrollbar-thumb {
          background: #888;
        }

        /* Add a hover effect to the collapse button */
        .collapse-button:hover {
          cursor: pointer;
        }

        /* Apply the collapse class to the left side area div when the button is clicked */
        .collapse-button:hover + #leftSplit {
          width: 0;
        }

        #rightSplit {
          padding: 0px;
          background-color: transparent;
          transition: width 0.5s ease-in-out;
          position: relative;
        }
        @media screen and (min-width: 992px) {
          #rightSplit {
            width: calc(96vw - 290px);
          }

          #rightSplit.collapsed {
            width: 96vw;
          }
        }
       
        #endpointName {
          box-shadow: 16px 14px 20px rgba(20, 78, 117, 0.5);
          overflow-y: auto;
        }
        .accordion-item {
          border: 1px solid rgba(36, 192, 235, 1);
          padding: 10px;
          position: relative;
        }
        .accordion-title {
          position: relative;
          display: flex;
          font-size: 18px;
          font-family: Montserrat;
          font-weight: bold;
          color: rgba(36, 192, 235, 1);
          --mdc-theme-primary: rgba(36, 192, 235, 1);
          cursor: pointer;
        }
        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.2s ease-out;
        }
        .accordion-item[data-active] .accordion-content {
          max-height: 500px;
        }
        span.selected-proc-instance {
          color: #1473e6;
          font-size: 30px;
          margin-top: 10px;
          font-weight: bold;
        }
      `,
    ];
  }
  
  selectedProcInstanceMainView() {
    let selectedItemArr=[]
    selectedItemArr.push(this.selectedItem)
    sessionStorage.setItem('selectedProcedureModuleName', this.moduleName)
    
    return html`
      <sp-split-view show-divider=${this.showDivider}>
        <div
          id="leftSplit"
          class="${this.leftSplitDisplayed !== undefined &&
          this.leftSplitDisplayed
            ? ""
            : "collapsed"}"
        >
          <div class="mobileTitle">${this.selectedProcessTitle()}</div>
          <div id="endpointName">
            ${this.selectedProcInstance.views.map(
              (item, index) => html`
                <div id="section${index}" class="accordion-item">
                  <div
                    class="layout horizontal center inline-flex wrap accordion-title"
                  >
                    ${this.sectionElement(item, index)}
                  </div>
                  ${this.sectionDetail(item, index)}
                </div>
              `
            )}
          </div>
          <div class="resizer" id="dragMe" style="width: 3px;"></div>
        </div>
        
        <div
          id="rightSplit"
          class="${this.leftSplitDisplayed !== undefined &&
          this.leftSplitDisplayed
            ? ""
            : "collapsed"}"
        >
          <div class="desktopTitle">${this.selectedProcessTitle()}</div>
          <div class="mobileTitle ${this.leftSplitDisplayed ? "hidden" : ""}">${this.selectedProcessTitle()}</div>
          ${
            this.selectedViewDefinition &&
            (
              this.selectedViewDefinition.view_definition !== undefined || 
              this.selectedViewDefinition.tabs!==undefined
            ) 
            ? html`    
              ${this.selectedViewDefinition.tabs !== undefined ? 
                html`
                <mwc-icon-button icon="print" @click=${this.print}></mwc-icon-button> 
                  <object-by-tabs 
                    .windowOpenable=true 
                    .sopsPassed=true 
                    .lang=${this.lang}
                    .procedureName=${this.procedureName} 
                    .procedureVersion=${this.procedureVersion} 
                    ?isProcManagement=${this.isProcManagement}
                    .moduleName=${this.moduleName} 
                    .moduleVersion=${this.moduleVersion} 
                    ?isProcManagement=${this.isProcManagement}
                    .procInstanceName=${this.procInstanceName} 
                    .desktop=${this.desktop} 
                    .viewName=${this.viewName} 
                    .filterName=${this.filterName} 
                    .model=${this.selectedViewDefinition} 
                    .selectedItemInView=${this.selectedItem} 
                    .viewModelFromProcModel=${this.selectedViewDefinition} 
                    .config=${this.config}
                  ></object-by-tabs>                        
                ` :
                html`                  
                  <objecttabs-composition 
                    style="position:relative; left: 30px; top:10px; width:95%; display:block;" 
                    .selectedTabModelFromProcModel=${this.selectedCompositionView}
                    .lang=${this.lang} 
                    .procedureName=${this.procedureName} 
                    .procedureVersion=${this.procedureVersion} 
                    .procInstanceName=${this.procInstanceName} 
                    .config=${this.config}     
                    .selectedItemInView=${this.selectedItem}
                    .moduleName=${this.moduleName}
                    .moduleVersion=${this.moduleVersion}
                    ?isProcManagement=${this.isProcManagement}
                  ></objecttabs-composition>        
                `
              }      
            ` : nothing
          }
        </div>
      </sp-split-view>
    `;
  }

  sectionElement(item, index) {
    if(index === this.selectedViewIndex) {
      if(this.selectedTestIndex === -1)
        this.selectSectionView(this.selectedViewIndex);
    }  

    return html`
      ${item.view_definition !== undefined &&
      item.view_definition.hasDetail !== undefined &&
      item.view_definition.hasDetail === true > 0
        ? html`
            <div @click=${() => {
              this.selectSectionView(index);
              this.toggleLeftElements(index);
            }}>
              ${item.title["label_" + this.lang]}
            </div>
            <mwc-icon-button
              size="s"
              id="expand"
              dense
              raised
              label=""
              icon="${item.expanded !== undefined && item.expanded
                ? "expand_less"
                : "expand_more"}"
              @click=${() => {
                this.toggleLeftElements(index);
              }}
            ></mwc-icon-button>
          `
        : html`
            <div
              class="accordion-title"
              @click=${() => {
                this.selectSectionView(index);
              }}
            >
              ${item.title["label_" + this.lang]}
            </div>
          `}
    `;
  }
  sectionDetail(item, index) {
    return html`
      ${item.expanded !== undefined && item.expanded
        ? html`
            ${item.view_definition !== undefined &&
            item.view_definition.hasDetail !== undefined &&
            item.view_definition.hasDetail === true
              ? html`
                  <div
                    id="section${index}_detail"
                    class="layout horizontal center wrap accordion-content"
                    style=${index > -1 ? "max-height: none;" : ""}
                  >
                    ${item.view_definition.detail.type !== undefined &&
                    item.view_definition.detail.type === "actionWithFilter"
                      ? html`
                          <div
                            style="margin-top:1px;text-align:center;padding-bottom:5px;"
                          >
                            ${item.view_definition.detail.button === undefined
                              ? nothing
                              : html`
                                  <sp-button
                                    size="m"
                                    slot="primaryAction"
                                    dialogAction="accept"
                                    .selectedViewDefinition="${item.view_definition}"
                                    .tabindex="${index}"
                                    @click=${this.filterPerformAction}
                                  >
                                    ${item.view_definition.detail.button[
                                      "label_" + this.lang
                                    ]}
                                  </sp-button>
                                `}
                          </div>
                          ${this.genericFormElements(
                            item.view_definition.detail.filterFields, this.area
                          )}
                        `
                      : nothing}
                    ${item.view_definition.detail.type !== undefined &&
                    item.view_definition.detail.type === "objectsList"
                      ? html`
                          ${this.genericList(item, this.selectedProcInstance, true, index)}
                        `
                      : nothing}
                  </div>
                `
              : nothing}
          `
        : nothing}
    `;
  }

  detailObjectsList(elem, data, flag, index){
    if (elem.view_definition.detail==undefined||elem.view_definition.detail.paneName===undefined){
      return html``
    }
    const func = this[elem.view_definition.detail.paneName];
    if (typeof func === 'function') {
      return func(elem, data, flag, index);
    } else {
      // Handle the case where it's not a function or doesn't exist
      console.error('Invalid function:', elem.view_definition.detail.paneName);
      return null; // or any other appropriate default action
    }    
    //this[elem.view_definition.detail.paneName](elem, data, flag, index)

  }
  genericList(elem, data, flag, index) {
    data = this.localGetDataFromRoot(elem.view_definition.detail, data);
    if (data === undefined) {
      return html``;
    }
    return html`
      ${Array.isArray(data) && data.length > 0
        ? html`
            <style>
            li.no_success {
              color: red;
            }
            li.success {
              color: green;
            }
            li.default {
              color: #0d0c0c;
            }
            li {
              cursor: pointer;
              font-size: 14px;
              transition: all 0.2s ease-in-out;
            }
            li:hover {
              background-color: rgba(41, 137, 216, 0.1);
            }
          </style>
          <ul>
            ${data.map((d, idx) => {
              return html`              
              <li role="button" class="${this.conditionalClass(elem.view_definition.detail, d)}" .thisitem="${d}"
                @click=${(e) => this.clickItemAction(index, idx, elem, d)} .elementdef="${elem}">
                ${elem.view_definition.detail.fieldsToDisplayInFilter===undefined?html`detail requires fieldsToDisplayInFilter property def`:
                  html`${this.genericListLabelToDisplay(elem.view_definition.detail.fieldsToDisplayInFilter, d)}`
                  
                } 
                 
                <hr />
              </li>
              `
            })}

        `:nothing}
    `
  }
  conditionalClass(elemDef, thisitem){
    if (elemDef===undefined){return 'default'}
    if (elemDef.conditionalColor===undefined){
      if (elemDef.colorClass!==undefined){
        return elemDef.colorClass
      }  
      return 'default'
    }
    if (elemDef.conditionalColor.field===undefined||elemDef.conditionalColor.includedWord===undefined||
      elemDef.conditionalColor.classForTrue===undefined||elemDef.conditionalColor.classForFalse===undefined){return 'success'}
    if (thisitem[elemDef.conditionalColor.field].includes(elemDef.conditionalColor.includedWord)){
      return elemDef.conditionalColor.classForTrue
    }else{
      return elemDef.conditionalColor.classForFalse
    }
    //    "conditionalColor":{"field": "run_summary", "includedWord": "SUCCESS", "classForTrue": "success", "classForFalse":"no_success"}
  }
  genericListLabelToDisplay(elemFlds, data){
    const labelSuffix = this.lang === 'en' ? '_en' : '_es';

    // Map each element in elemFlds to its corresponding value in data
    const values = elemFlds.map(elem => {
        // Get the label
        const label = elem['label' + labelSuffix];

        // Get the value from data
        const value = data[elem.name];

        // Combine label and value
        return `${label}: ${value}`;
    });

    // Join the label-value pairs into a string
    const combinedValues = values.join(', ');

    return combinedValues; 
  }
  testingcardSomeElementsRepititiveObjects(elem, data, flag, index) {
    data = this.localGetDataFromRoot(elem.view_definition.detail, data);
    //console.log('testingcardSomeElementsRepititiveObjects', 'elem', elem, 'getDataFromRoot', data)
    //console.log('cardSomeElementsRepititiveObjects >> getDataFromRoot', 'elem', elem, 'data', data)
    if (data === undefined) {
      return html``;
    }
    return html`
      ${Array.isArray(data) && data.length > 0
        ? html`
            <style>
              li.no_success {
                color: red;
              }
              li.success {
                color: green;
              }
              li.default {
                color: #0d0c0c;
              }
              li {
                cursor: pointer;
                font-size: 14px;
                transition: all 0.2s ease-in-out;
              }
              li:hover {
                background-color: rgba(41, 137, 216, 0.1);
              }
            </style>
            <ul>
              ${data.map(
                (d, idx) => {
                  if(this.selectedViewIndex === index && idx === this.selectedTestIndex) {
                    this.clickedTest(index, idx, elem, d);
                  }
                  return html`
                    <li
                      role="button"
                      class="${d.run_summary.toUpperCase().includes("SUCCESS")? "success": "no_success"}"
                      .thisitem="${d}"
                      @click=${(e) => this.clickedTest(index, idx, elem, d)}
                      .elementdef="${elem}"
                    >
                      ${d.script_id} ${d.run_summary}<br />(${d.date_execution})
                      <hr />
                    </li>
                  `
              })}
            </ul>
          `
        : nothing}
    `;
  }

  clickItemAction(index, testIdx, elementdef, thisitem){
    console.log("clickItemAction",elementdef.view_definition.detail.clickItemAction);
    //this[elementdef.view_definition.detail.clickItemAction](index, testIdx, elementdef, thisitem)
    if (elementdef.view_definition.detail.clickItemAction===undefined){
      alert("The detail section of this model has no the property clickItemAction to set the click action")
      return null;
    }
    const func = this[elementdef.view_definition.detail.clickItemAction];
    if (typeof func === 'function') {
      this[elementdef.view_definition.detail.clickItemAction](index, testIdx, elementdef, thisitem);
      return
    } else {           
      // Handle the case where it's not a function or doesn't exist
      if (elementdef.view_definition.detail.clickItemAction===undefined){
        alert('view_definition.detail.clickItemAction not defined, please add this property to specify which action should be performed');
      }else{
        alert('Invalid function:', elementdef.view_definition.detail.clickItemAction);
      }
      return null; // or any other appropriate default action
    }      
  }

  viewDesignerAction(index, testIdx, elementdef, thisitem) {
    this.selectSectionView(index);
    this.selectedTestIndex = testIdx;
    
    this.selectedTabModelFromProcModel = elementdef.view_definition.detail;
    // this.objecttabsComposition.isProcManagement = true;
    // this.objecttabsComposition.selectedTabModelFromProcModel =
    //   this.selectedTabModelFromProcModel.view_definition;
    // this.objecttabsComposition.selectedItem = e.currentTarget.thisitem;
    
    // this.isProcManagement = true;
    this.isProcManagement = true;
    // // this.selectedViewDefinition.tabs = undefined;
    // // this.selectedViewDefinition.view_definition = this.selectedTabModelFromProcModel.view_definition;

    // let tmp = [];
    // this.selectedTabModelFromProcModel.view_definition.map((data, i) => {
    //   if(i == 0) {
    //     let reData = {
    //       elements: [],
    //       title: {},
    //       type: ""
    //     };
    //     reData.elements.push({actions: data.actions, columns: data.columns, endPointResponseObject: data.endPointResponseObject, theme: data.theme, type: data.type, row_buttons: data.row_buttons});
    //     reData.title = data.title;
    //     reData.type = data.type;
    //     tmp.push(reData);
    //   }
    //   else {
    //     tmp.push(data);
    //   }
    // })
    // this.selectedCompositionView = tmp;

    console.log("model", this.selectedCompositionView, 'data', thisitem);
    this.selectedItem = thisitem;      
    //this.selectedTabModelFromProcModel=this.selectedCompositionView

    return
    if (thisitem) {
      if (this.selectedCompositionView.tabs!==undefined){
        this.objectByTabs.selectedItem = thisitem;
        this.objectByTabs.selectedTabModelFromProcModel =this.selectedCompositionView;
      }else{            
        //this.objecttabsComposition.selectedItem = thisitem;
        //this.objecttabsComposition.selectedTabModelFromProcModel =this.selectedCompositionView;
      }
    }
    if (this.selectedCompositionView.tabs!==undefined){
      //.selectedItem=${this.mainViewData} 
      this.mainViewData = {}
      this.mainViewData=value;
      // this.objectByTabs.selectedItem = {}
      // this.objectByTabs.selectedItem = value
      this.selectedItem = thisitem;//value.definition;
      this.objectByTabs.isProcManagement = true;
      // this.objectByTabs.render();          
    }else{    
      this.selectedItem = thisitem;      
      this.selectedTabModelFromProcModel=this.selectedCompositionView
      //this.objecttabsComposition.isProcManagement = true;
      if (this.objecttabsComposition!==null&&this.objecttabsComposition!==undefined){
        this.objecttabsComposition.render();
      }
    }    
    return;
    this.selectedItem = thisitem;
    
    sessionStorage.setItem(
      "selectedTabModelFromProcModel",
      JSON.stringify(this.selectedTabModelFromProcModel)
    );
      
    // get selected scripts from session storage and filter
    let selectedScripts = sessionStorage.getItem("selectedScripts");
    if (selectedScripts === undefined || selectedScripts === null) {
      selectedScripts = [];
    } else {
      selectedScripts = JSON.parse(selectedScripts);
      selectedScripts = selectedScripts.filter(
        (script) =>
          script.proc_instance_name !==
          this.selectedProcInstance.proc_instance_name
      );
    }
    if (!thisitem || !this.selectedProcInstance) {
      return;
    }
    const newSelectedScript = [
      ...selectedScripts,
      {
        proc_instance_name: this.selectedProcInstance.proc_instance_name,
        ...thisitem,
      },
    ];

    sessionStorage.setItem(
      "selectedScripts",
      JSON.stringify(newSelectedScript)
    );

    // this.objecttabsComposition.render();

    // Scroll down to right split on mobile
    if (this.desktop) return;
    this.scrollToSection("#rightSplit");
  }

  clickedTest(index, testIdx, elementdef, thisitem) {
    this.selectSectionView(index);
    this.selectedTestIndex = testIdx;
    console.log("in clickedtest func", elementdef.view_definition.detail);
    this.selectedTabModelFromProcModel =
    elementdef.view_definition.detail;
    // this.objecttabsComposition.isProcManagement = true;
    // this.objecttabsComposition.selectedTabModelFromProcModel =
    //   this.selectedTabModelFromProcModel.view_definition;
    // this.objecttabsComposition.selectedItem = e.currentTarget.thisitem;
    
    // this.isProcManagement = true;
    this.isProcManagement = true;
    // this.selectedViewDefinition.tabs = undefined;
    // this.selectedViewDefinition.view_definition = this.selectedTabModelFromProcModel.view_definition;
    this.selectedCompositionView = this.selectedTabModelFromProcModel.view_definition;
    this.selectedItem = thisitem;
    
    sessionStorage.setItem(
      "selectedTabModelFromProcModel",
      JSON.stringify(this.selectedTabModelFromProcModel)
    );
      
    // get selected scripts from session storage and filter
    let selectedScripts = sessionStorage.getItem("selectedScripts");
    if (selectedScripts === undefined || selectedScripts === null) {
      selectedScripts = [];
    } else {
      selectedScripts = JSON.parse(selectedScripts);
      selectedScripts = selectedScripts.filter(
        (script) =>
          script.proc_instance_name !==
          this.selectedProcInstance.proc_instance_name
      );
    }
    if (!thisitem || !this.selectedProcInstance) {
      return;
    }
    const newSelectedScript = [
      ...selectedScripts,
      {
        proc_instance_name: this.selectedProcInstance.proc_instance_name,
        ...thisitem,
      },
    ];

    sessionStorage.setItem(
      "selectedScripts",
      JSON.stringify(newSelectedScript)
    );

    // this.objecttabsComposition.render();

    // Scroll down to right split on mobile
    if (this.desktop) return;
    this.scrollToSection("#rightSplit");
  }

  fieldLabel(fld) {
    return fld["label_" + this.lang] !== undefined
      ? fld["label_" + this.lang]
      : fld.name;
  }

  localGetDataFromRoot(elem, data) {
    if (data === undefined) {
      return undefined;
    }
    if (elem.endPointPropertyArray !== undefined) {
      if (elem.endPointPropertyArray.length === 0) {
        return data;
      }
      if (
        elem.endPointPropertyArray.length === 1 &&
        elem.endPointPropertyArray[0].toUpperCase() === "ROOT"
      ) {
        return data;
      }
      //const numObjectsToSkip = elem.endPointPropertyArray.length - 1;
      //const propertyName = elem.endPointPropertyArray[numObjectsToSkip];
      let i = 0;
      let subJSON = {};
      //data = data[elem.endPointPropertyArray[0]][0]
      for (i = 0; i < elem.endPointPropertyArray.length; i++) {
        let propertyName = elem.endPointPropertyArray[i];
        if (Array.isArray(data[propertyName])) {
          if (i < elem.endPointPropertyArray.length - 1) {
            subJSON = data[propertyName][0];
          } else {
            return data[propertyName];
          }
        } else {
          subJSON = data[propertyName];
        }
        if (typeof subJSON === "undefined") {
          return data;
        } else {
          data = subJSON;
        }
      }
      return data;
      if (typeof subJSON === "undefined") {
        return undefined;
      } else if (elem.endPointPropertyArray.length % 2 === 0) {
        // If the input array has an even number of elements, skip one more object level before recursing
        return getValueFromNestedJSON(
          subJSON,
          elem.endPointPropertyArray.slice(0, numObjectsToSkip)
        );
      } else {
        // Otherwise, recurse on the sub-JSON with the remaining elem.endPointPropertyArray elements
        return getValueFromNestedJSON(
          subJSON,
          elem.endPointPropertyArray.slice(0, numObjectsToSkip)
        );
      }
    } else {
      if (
        elem.endPointResponseObject !== undefined &&
        elem.endPointResponseObject2 !== undefined
      ) {
        let dataToRet = [];
        dataToRet = data[elem.endPointResponseObject];
        if (dataToRet !== undefined) {
          return dataToRet[elem.endPointResponseObject2];
        } else {
          return [];
        }
      } else {
        if (String(elem.endPointResponseObject).toUpperCase() === "ROOT") {
          return data;
        } else {
          return data[elem.endPointResponseObject];
        }
      }
    }
  }

  selectedProcessTitle() {
    return html`
      <style>
        .title-banner-isLocked-false {
          background-color: #007bff; /* Blue */
          color: #24c0eb; /* White */
          display: flex;
          align-items: center;
          height: 60px;
          width: 100%;
          position: relative;
          z-index: 6;       
          transition: width 0.5s ease-in-out;
          background : -moz-linear-gradient(46.71% -341.1% -76deg,rgba(214, 233, 248, 1) 43.85%,rgba(255, 255, 255, 1) 58.66%);
          background : -webkit-linear-gradient(-76deg, rgba(214, 233, 248, 1) 43.85%, rgba(255, 255, 255, 1) 58.66%);
          background : -webkit-gradient(linear,46.71% -341.1% ,53.29% 441.1% ,color-stop(0.4385,rgba(214, 233, 248, 1) ),color-stop(0.5866,rgba(255, 255, 255, 1) ));
          background : -o-linear-gradient(-76deg, rgba(214, 233, 248, 1) 43.85%, rgba(255, 255, 255, 1) 58.66%);
          background : -ms-linear-gradient(-76deg, rgba(214, 233, 248, 1) 43.85%, rgba(255, 255, 255, 1) 58.66%);
          -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#D6E9F8', endColorstr='#FFFFFF' ,GradientType=0)";
          background : linear-gradient(166deg, rgba(214, 233, 248, 1) 43.85%, rgba(255, 255, 255, 1) 58.66%);
          border-radius : 12px;
          -moz-border-radius : 12px;
          -webkit-border-radius : 12px;
          box-shadow : 2.77px 2.77px 4.62px rgba(20, 78, 117, 0.5);
          box-shadow: 16px 14px 20px rgba(20, 78, 117, 0.5);     
          filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=2.77, Off=2.77, Color='#144E75') progid:DXImageTransform.Microsoft.gradient(startColorstr='#D6E9F8',endColorstr='#FFFFFF' , GradientType=1);                  
        }
        .title-banner-isLocked-true {
          background-color: #007bff; /* Blue */
          color: #24c0eb; /* White */
          display: flex;
          align-items: center;
          height: 60px;
          width: 100%;
          position: relative;
          z-index: 6;       
          transition: width 0.5s ease-in-out;
          background : -moz-linear-gradient(46.71% -341.1% -76deg,rgba(214, 233, 248, 1) 43.85%,#A3181E 58.66%);
          background : -webkit-linear-gradient(-76deg, rgba(214, 233, 248, 1) 43.85%, #A3181E 58.66%);
          background : -webkit-gradient(linear,46.71% -341.1% ,53.29% 441.1% ,color-stop(0.4385,rgba(214, 233, 248, 1) ),color-stop(0.5866,#A3181E ));
          background : -o-linear-gradient(-76deg, rgba(214, 233, 248, 1) 43.85%, #A3181E 58.66%);
          background : -ms-linear-gradient(-76deg, rgba(214, 233, 248, 1) 43.85%, #A3181E 58.66%);
          -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#D6E9F8', endColorstr='#FFFFFF' ,GradientType=0)";
          background : linear-gradient(166deg, rgba(214, 233, 248, 1) 43.85%, #A3181E 58.66%);
          border-radius : 12px;
          -moz-border-radius : 12px;
          -webkit-border-radius : 12px;
          box-shadow : 2.77px 2.77px 4.62px rgba(20, 78, 117, 0.5);
          box-shadow: 16px 14px 20px rgba(20, 78, 117, 0.5);     
          filter: progid:DXImageTransform.Microsoft.dropshadow(OffX=2.77, Off=2.77, Color='#144E75') progid:DXImageTransform.Microsoft.gradient(startColorstr='#D6E9F8',endColorstr='#FFFFFF' , GradientType=1);                  
        }
        
        .title-banner .left-text {
          font-size: 12px;
          margin-right: 20px;
        }
      
        .title-banner .title {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }
        
        .title-banner .right-text {
          display: none;
          font-size: 12px;
          margin-left: auto; /* Push right text to the very right */
        }
        @media screen and (min-width: 992px) {
          .title-banner {
            width: calc(96vw - 330px);
            padding: 0 10px; /* Add padding to keep text away from edges */
            justify-content: space-between; /* Add space between left and right text */
          }
          .title-banner.collapsed {
            width: 93.25vw;
          }
          .title-banner .left-text {
            margin-right: auto; /* Push left text to the very left */
          }
          .title-banner .right-text {
            display: block;
          }
        }  
      </style>

      <div class="${classMap({
        "title-banner": true,
        'title-banner-isLocked-true': this.selectedProcInstance?.locked_for_actions === true,
        'title-banner-isLocked-false': !this.selectedProcInstance?.locked_for_actions,
        collapsed:
        this.leftSplitDisplayed === undefined || !this.leftSplitDisplayed,
      })}">
          <span class="left-text">
            <mwc-icon-button size="s" style="left:22px;" id="expandleftpane" dense raised label=""  icon="${
              this.leftSplitDisplayed !== undefined && this.leftSplitDisplayed
                ? "expand_more"
                : "expand_less"
            }" @click=${this.toggleLeftSplitPane}></mwc-icon-button>
            <mwc-icon-button size="xl" dense raised label=""  icon="home" @click=${
              this.resetView
            }></mwc-icon-button>
          </span>
          <h1 class="title">
            ${this.selectedProcInstance.procedure_name} v:${
      this.selectedProcInstance.procedure_version
    }
          </h1>
          <span class="right-text">${this.lang == "es" ? "Módulo" : "Module"} ${
      this.selectedProcInstance.module_name
    }
          </span>
        </div>
      </div>
    `;
  }

  filterPerformAction(e) {
    this.selectedViewDefinition = e.currentTarget.selectedViewDefinition.detail;
    //console.log('this.selectedViewDefinition', this.selectedViewDefinition)
    //alert('filterPerformAction')
    this.performActionRequestHavingDialogOrNotForProcess(
      e.currentTarget.tabindex,
      this.selectedViewDefinition,
      this.selectedItems
    );
  }

  async performActionRequestHavingDialogOrNotForProcess(
    index,
    action,
    selectedItem,
    targetValue = {},
    credDialogArgs = {}
  ) {
    if (action.alternativeAPIActionMethod !== undefined) {
      this[action.alternativeAPIActionMethod]();
      return;
    }
    let extraParams = this.jsonParam(action, selectedItem[0], targetValue);
    let APIParams = this.getAPICommonParams(action, true);
    let endPointUrl = this.getActionAPIUrl(action);
    if (String(endPointUrl).toUpperCase().includes("ERROR")) {
      alert(endPointUrl);
      return;
    }
    let params =this.config.backendUrl +endPointUrl +"?" +new URLSearchParams(APIParams) +"&" +new URLSearchParams(extraParams) +
      "&" +new URLSearchParams(credDialogArgs);
    console.log("performActionRequestHavingDialogOrNot","action",action,"selectedItem",selectedItem[0],"extraParams",extraParams);

    let log = true;
    await this.fetchApi(params)
      .then((j) => {
        if (j && !j.is_error) {
//console.log('j', j.json())          
          this.actionOutput = j.json();
          this.selectedItem = j.json();
        } else {
          this.actionOutput = j.json();
          this.selectedItem = j.json();
        }
        this.selectSectionView(index, true);

        //this.selectedProcInstanceMainView()
        //if (this.actionOutput!==undefined){console.log("actionOutput", this.actionOutput);}
      })
      .then((j) => {
        let mye = {};
        if (j.is_error !== undefined && j.is_error === true) {
          //        mye = { is_error: true, message_en: "Performed with success", message_es: "Ejecutado correctamente" }
          this.dispatchEvent(
            new CustomEvent("error", {
              detail: { ...j, log: log },
              bubbles: true,
              composed: true,
            })
          );
        } else {
          mye = {
            is_error: false,
            message_en: "Performed with success",
            message_es: "Ejecutado correctamente",
          };
          this.dispatchEvent(
            new CustomEvent("success", {
              detail: { ...mye, log: log },
              bubbles: true,
              composed: true,
            })
          );
        }
        return j;
      })
      .catch((e) => {
        if (e.message == "Unexpected end of JSON input") {
          this.dispatchEvent(
            new CustomEvent("error", {
              detail: { ...e },
              bubbles: true,
              composed: true,
            })
          );
        } else {
          this.dispatchEvent(
            new CustomEvent("error", {
              detail: { ...e, log: log },
              bubbles: true,
              composed: true,
            })
          );
          //this.error(e)
          return e;
        }
      });

    return;
  }

  toggleLeftElements(index) {
    const item = this.selectedProcInstance.views[index];
    item.expanded = !item.expanded;
    this.requestUpdate();
  }

  get objecttabsComposition() {return this.shadowRoot.querySelector("objecttabs-composition");}
  get objectByTabs() {return this.shadowRoot.querySelector("object-by-tabs");}
  
}
window.customElements.define("proc-management-home", ProcManagementHome);

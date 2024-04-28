import {LitElement} from 'lit-element';
import {template} from './dragdropbox.template';
import {styles} from './dragdropbox.css';
import { navigator } from "lit-element-router";
import { ButtonsFunctions } from '../Buttons/ButtonsFunctions';
import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';
import { GridFunctions } from '../grid_with_buttons/GridFunctions';
import { ActionsFunctions } from '../Actions/ActionsFunctions';
export class DragDropBox extends ActionsFunctions(GridFunctions(DialogsFunctions(ButtonsFunctions(navigator(LitElement))))) {

  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      config: { type: Object },
      data: { type: Object },
      //viewMode: { type: Number},
      selectedIndex1: { type: String },
      selectedIndex2: { type: Number},
      selectedBox: { type: Object}
    };
  }

  constructor() {
    super();
    this.config={};
    this.selectedIndex1 = "";
    this.selectedIndex2 = 0;
    //this.viewMode = 1;
    this.selectedBox = undefined;
    this.selectedTr = undefined;
    //this.dragBoxData = {id: undefined, x:"", y: "", name:"", temperature:"", study:""};
    this.dropBoxData = {id: undefined, x:"", y: "", name:"", temperature:"", study:""};  
    this.dragTrData = {id: undefined, temperature:"", study:""};
    this.data = {};
    this.dragElement = undefined;
    this.viewContentIndex = 0;
    this.listBoxViewMode = false;
    this.dragTr = false;
    this.dragBackgroundColor = undefined;
    this.dropBackgroundColor = undefined;
    this.dragParentElement = undefined;
    this.viewTable = true;
    this.viewTableBox = true;
  }

  render() {
    if (this.viewModelFromProcModel.viewMode===undefined){this.viewModelFromProcModel.viewMode=1}
    return template({
      data: this.data,      
      selectedIndex1: this.selectedIndex1,
      selectedIndex2: this.selectedIndex2,
      //viewMode: this.viewMode,
      listBoxViewMode: this.listBoxViewMode,
      viewContentIndex: this.viewContentIndex,
      viewTable: this.viewTable,
      viewTableBox: this.viewTableBox,
      setSelectBoxIndex: this._setSelectBoxIndex,
      setViewMode: this._setViewMode,
      dropBox: this._dropBox,
      allowDrop: this._allowDrop,
      dropTableTr: this._dropTableTr,
      allowDropTr: this._allowDropTr,
      dragBox: this._dragBox,
      dragTableTr: this._dragTableTr,
      setShowBoxViewModeList: this._setShowBoxViewModeList,
      setBoxPosicsViewFilter:this._setBoxPosicsViewFilter,
      setViewTable: this._setViewTable,
      setViewTableButtonLabel: this._setViewTableButtonLabel,
      setBoxView: this._setBoxView,
      showBoxContent: this._showBoxContent,
      iconRendererSrc: this.iconRendererSrc,
    }, this.selectedBox, this.viewModelFromProcModel, this.lang, this);
  }

   _showBoxContent = (data, i) => {
    this.selectedBox=data
    this.selectedBox.cols = data.cols;
    this.selectedBox.rows = data.rows;
//    this.data.boxDefinition.cols = data.cols;
//    this.data.boxDefinition.rows = data.rows;
    this.viewTableBox = false;
    
    this.requestUpdate();
  }

  _setBoxView = () => {
    this.viewTableBox = !this.viewTableBox;
    this.selectedBox=undefined
    this.requestUpdate();
  }

  _setViewTable = () => {
    this.viewTable = !this.viewTable;
    this.requestUpdate();
  }

  _setViewTableButtonLabel = () =>{
    let labels={
      "hide":{"label_en":"Hide Table", "label_es":"Ocultar Tabla"},
      "show":{"label_en":"Show Table", "label_es":"Mostrar Tabla"}
    }
    if (this.viewTable){return labels.hide["label_"+this.lang]}else{return labels.show["label_"+this.lang]}
  }

  _dragTableTr = (e, elem, dragElement) => {
    this.dragTr = true;
    this.dragElement=dragElement
    return
    let currentElement = e.target;
    
    while (currentElement && !currentElement.classList.contains('dragdropabletr')) {
      currentElement = currentElement.parentElement;
    };

    this.selectedTr = `<td> ${currentElement.children[0].innerHTML} </td><td> ${currentElement.children[1].innerHTML} </td><td>${currentElement.children[2].innerHTML} </td>`

    let currentID = currentElement.childNodes[1].childNodes[1].textContent;
    currentID -= 1;
    let str = "";
    if(this.viewContentIndex == 0) {
      str =`<div>id: ${this.data.tableData[currentID].id}</div><div> study: ${this.data.tableData[currentID].study}</div>`
    } 
    else {
      str =`<div>id: ${this.data.tableData[currentID].id}</div><div> temperature: ${this.data.tableData[currentID].temperature}</div>`
    }
    this.selectedBox = str;
    //this.dragTrData.id = id;
    //this.dragTrData.study = study;
    //this.dragTrData.temperature =temperature;
  }

  _setBoxPosicsViewFilter = (mode) => {
    console.log("viewmode", mode);
    this.viewContentIndex = mode;
    this.requestUpdate();
  }

  _setShowBoxViewModeList = () => {
    this.listBoxViewMode = !this.listBoxViewMode;
    this.requestUpdate();
  }

  _allowDrop = (e) => {
    e.preventDefault();
  }

  _dropBox = (e, y, x) => {
    e.preventDefault();
    this.selectedBox.posicx = x;
    this.selectedBox.posicy = y;

    if (this.selectedBox.datas.some(item => item.posX === y && item.posY === x)){
      
      if (this.lang==='en'){
        alert('Position occupied already')
      }else{
        alert('Posición ocupada actualmente')
      }      
      return
    }

    if (this.viewModelFromProcModel.dropAction===undefined){
      if (this.lang==='en'){
        console.log('viewModelFromProcModel', this.viewModelFromProcModel)
        alert('No drop action defined')
      }else{
        alert('No hay definida acción al soltar')
      }
      return
    }
    if (this.dataIntegrityChecks(this.viewModelFromProcModel, this.selectedBox, this.dragElement)===false){
      return
    }
    //this.data.tableData[ii].push(this.dragData);
    alert("Success to Drop");    
    this.trazitButtonsMethod(e, this.viewModelFromProcModel.dropAction, true, undefined, undefined, this.selectedBox, false, undefined, this.selectedBox, this.dragElement)
    return
  }

  _allowDropTr = (e) => {
    e.preventDefault();
  }

  _dropTableTr = (e) => {
    e.preventDefault();
    let currentElement = e.target;
    currentElement.parentNode.innerHTML = this.selectedTr;
  }

  _dragBox = (e, x, y) => {
    this.dragBoxData.x = x;
    this.dragBoxData.y = y;
    this.selectedBox.datas.map((item, index) => {
      if(item.posX == x && item.posY == y) {
        this.dragBoxData.id = item.id;
        this.dragBoxData.name = item.name;
        this.dragBoxData.temperature = item.temperature;
        this.dragBoxData.study = item.study
      }
    })
    console.log("asdf", this.dragBoxData);
    this.dragTr = false;
    let currentElement = e.target;
    while (currentElement && !currentElement.classList.contains('box')) {
        currentElement = currentElement.parentElement;
    };
    this.dragParentElement = currentElement;
    this.dragBackgroundColor = currentElement.style.backgroundColor;
    this.dragElement = e.target.childNodes[1];
    this.selectedBox = e.target.childNodes[1].innerHTML;
  }

  _setSelectBoxIndex = (first, second)  => {
    this.selectedIndex1 = first;
    this.selectedIndex2 = second;
    this.requestUpdate();
  }

  _setViewMode = (mode) => {
    this.viewModelFromProcModel.viewMode = mode;
    this.requestUpdate();
  }

  dataIntegrityChecks(viewModel, selectedBox, dropData){ 
    if (viewModel===undefined||viewModel.dataIntegrityCheck===undefined){
      return true
    }
    if (!this.dataIntegrityDragElementMandatoryProps(viewModel, selectedBox, dropData)){
      return false
    }
    if (!this.dataIntegrityDragElementMandatoryPropsAndMatchValues(viewModel, selectedBox, dropData)){
      return false
    }
    
    //alert('abort by Fran, remove this!')
    //return false;
    return true; 
  }

  dataIntegrityDragElementMandatoryProps(viewModel, selectedBox, dropData){
    if (viewModel.dataIntegrityCheck.dropingEntryRequiredProperties===undefined){
      return true
    }
    for (const property of viewModel.dataIntegrityCheck.dropingEntryRequiredProperties) {
      if (!(property in dropData)) {
          alert('The property ' + property + ' is required and not found');
          return false; // Property is missing, return false
      }
    }
    return true; 
  }

  dataIntegrityDragElementMandatoryPropsAndMatchValues(viewModel, selectedBox, dropData) {
    if (viewModel.dataIntegrityCheck.dropingEntryRequiredPropertiesAndMatchValues === undefined) {
      return true;
    }
  
    for (const entry of viewModel.dataIntegrityCheck.dropingEntryRequiredPropertiesAndMatchValues) {
      // Check for both name and criteria in each entry
      if (!('name' in entry) || !('criteria' in entry)) {
        alert('Each entry must contain a name and criteria');
        return false;
      }
  
      const propertyName = entry.name;
      const criteria = entry.criteria;
  
      // Check if the property exists in dropData
      if (!(propertyName in dropData)) {
        alert('The property ' + propertyName + ' is required and not found');
        return false;
      }
  
      // Check criteria based on type
      switch (criteria.type) {
        case 'value': // Exact match
          if (String(dropData[propertyName]) !== String(criteria.value)) {
            alert(`The value for ${propertyName} must exactly match ${criteria.value} but is ${dropData[propertyName]}`);
            return false;
          }
          break;
        case 'values': // One of the listed values
          if (!criteria.values.map(String).includes(String(dropData[propertyName]))) {
            let validValuesList = criteria.values.join(", ");
            alert(`The value for ${propertyName} must be one of the specified values: [${validValuesList}]`);
            return false;
          }
          break;
        case 'greater': // Greater than
          if (typeof dropData[propertyName] !== 'number' || dropData[propertyName] < criteria.value) {
            alert(`The value for ${propertyName} must be a number greater than ${criteria.value}`);
            return false;
          }
          break;
          case 'greater_or_equal': // Greater than
          if (typeof dropData[propertyName] !== 'number' || dropData[propertyName] <= criteria.value) {
            alert(`The value for ${propertyName} must be a number greater than ${criteria.value}`);
            return false;
          }
          break;
        case 'less': // Less than
          if (typeof dropData[propertyName] !== 'number' || dropData[propertyName] > criteria.value) {
            alert(`The value for ${propertyName} must be a number less than ${criteria.value}`);
            return false;
          }
          break;
        case 'less_or_equal': // Less than
          if (typeof dropData[propertyName] !== 'number' || dropData[propertyName] >= criteria.value) {
            alert(`The value for ${propertyName} must be a number less than ${criteria.value}`);
            return false;
          }
          break;
        case 'range': // Range
          if (typeof dropData[propertyName] !== 'number' ||
              dropData[propertyName] < criteria.min ||
              dropData[propertyName] > criteria.max) {
            alert(`The value for ${propertyName} must be a number between ${criteria.min} and ${criteria.max}`);
            return false;
          }
          break;
        case 'selectedBox_value': // Match with selectedBox property
          let selectedBoxPropertyName = criteria.selectedBoxPropName || propertyName;
          if (String(dropData[propertyName]) !== String(selectedBox[selectedBoxPropertyName])) {
            alert(`The value for ${propertyName} in dropData must match the value of ${selectedBoxPropertyName} in selectedBox that is ${selectedBox[selectedBoxPropertyName]}`);
            return false;
          }
          break;        
        case 'selectedBox_range': // Value within a range in selectedBox
          selectedBoxPropertyName = criteria.selectedBoxPropName || propertyName;
          let range = selectedBox[selectedBoxPropertyName].split('-').map(Number);
          if (range.length !== 2 || isNaN(range[0]) || isNaN(range[1]) || 
              dropData[propertyName] < range[0] || dropData[propertyName] > range[1]) {
            alert(`The value for ${propertyName} in dropData must be within the range specified in selectedBox for ${selectedBoxPropertyName} (${selectedBox[selectedBoxPropertyName]})`);
            return false;
          }
          break;        
        default:
          alert(`Invalid criteria type for ${propertyName}`);
          return false;
      }
    }
  
    return true;
  }
  
  // dataIntegrityDragElementMandatoryPropsAndMatchValues(viewModel, selectedBox, dropData){
  //   if (viewModel.dataIntegrityCheck.dropingEntryRequiredPropertiesAndMatchValues===undefined){
  //     return true
  //   }
  //   for (const property of viewModel.dataIntegrityCheck.dropingEntryRequiredPropertiesAndMatchValues) {
  //     if (!(property in dropData)) {
  //         alert('The property ' + property + ' is required and not found');
  //         return false; // Property is missing, return false
  //     }
  //   }
  //   return true; 
  // }


}

window.customElements.define('dragdrop-box', DragDropBox);

import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { template } from './dragdropbox.template';
import { styles } from './dragdropbox.css';
import { navigator } from 'lit-element-router';
import { ButtonsFunctions } from '../Buttons/ButtonsFunctions';
import { DialogsFunctions } from '../GenericDialogs/DialogsFunctions';
import { GridFunctions } from '../grid_with_buttons/GridFunctions';
import { ActionsFunctions } from '../Actions/ActionsFunctions';
import { ApiFunctions } from '../Api/ApiFunctions';
import { ListsFunctions } from '../../form_fields/lists-functions';
import { TrazitGenericDialogs } from '../GenericDialogs/TrazitGenericDialogs';

export class DragDropBox extends TrazitGenericDialogs(ListsFunctions(ApiFunctions(ActionsFunctions(GridFunctions(DialogsFunctions(ButtonsFunctions(navigator(LitElement)))))))) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      config: { type: Object },
      data: { type: Array },
      selectedIndex1: { type: String },
      selectedIndex2: { type: Number },
      selectedBox: { type: Object }
    };
  }

  constructor() {
    super();
    this.config = {};
    this.selectedIndex1 = '';
    this.selectedIndex2 = 0;
    this.selectedBox = undefined;
    this.selectedTr = undefined;
    this.dropBoxData = { id: undefined, x: '', y: '', name: '', temperature: '', study: '' };
    this.dragTrData = { id: undefined, temperature: '', study: '' };
    this.data = [];
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
    console.log('render', 'data', this.data);
    if (this.viewModelFromProcModel.viewMode === undefined) {
      this.viewModelFromProcModel.viewMode = 1;
    }

    return template(
      {
        data: this.data,
        selectedIndex1: this.selectedIndex1,
        selectedIndex2: this.selectedIndex2,
        listBoxViewMode: this.listBoxViewMode,
        viewContentIndex: this.viewContentIndex,
        viewTable: this.viewTable,
        viewTableBox: this.viewTableBox,
        setSelectBoxIndex: this._setSelectBoxIndex,
        setViewMode: this._setViewMode,
        dropInUnstructuredBox: this._dropInUnstructuredBox,
        dropInStructuredBox: this._dropInStructuredBox,
        allowDrop: this._allowDrop,
        dropTableTr: this._dropTableTr,
        allowDropTr: this._allowDropTr,
        dragBox: this._dragBox,
        dragTableTr: this._dragTableTr,
        setShowBoxViewModeList: this._setShowBoxViewModeList,
        setBoxPosicsViewFilter: this._setBoxPosicsViewFilter,
        setViewTable: this._setViewTable,
        setViewTableButtonLabel: this._setViewTableButtonLabel,
        setBoxView: this._setBoxView,
        showBoxContent: this._showBoxContent,
        iconRendererSrc: this.iconRendererSrc
      },
      this.selectedBox,
      this.viewModelFromProcModel,
      this.lang,
      this
    );
  }

  _showBoxContent = (data, i) => {
    this.selectedItem = data;
    this.selectedItems = [];
    this.selectedItems.push(data);
    this.selectedBox = data;
    this.selectedBox.cols = data.cols;
    this.selectedBox.rows = data.rows;
    this.viewTableBox = false;

    this.requestUpdate();
  };

  refreshTables() {
    if (this.selectedBox !== undefined) {
      if (this.viewModelFromProcModel.boxesTableKeyField===undefined){
        alert('The selected box cannot be refreshed due to the absent of the property boxesTableKeyField in the view model')        
      }else{
        let tablesInfo = this.TRAZiTgetDataFromRoot(this.viewModelFromProcModel.boxesTableColumns, this.data);
        let updatedBox = tablesInfo.find(
          (box) => box[this.viewModelFromProcModel.boxesTableKeyField] === this.selectedBox[this.viewModelFromProcModel.boxesTableKeyField]
        );
        if (updatedBox) {
          this.selectedBox = updatedBox;
        }
      }
    }
    this.requestUpdate();
  }

  _setBoxView = () => {
    this.viewTableBox = !this.viewTableBox;
    this.selectedBox = undefined;
    this.requestUpdate();
  };

  _setViewTable = () => {
    this.viewTable = !this.viewTable;
    this.requestUpdate();
  };

  _setViewTableButtonLabel = () => {
    let labels = {
      hide: { label_en: 'Hide Table', label_es: 'Ocultar Tabla' },
      show: { label_en: 'Show Table', label_es: 'Mostrar Tabla' }
    };
    if (this.viewTable) {
      return labels.hide['label_' + this.lang];
    } else {
      return labels.show['label_' + this.lang];
    }
  };

  _dragTableTr = (e, elem, dragElement) => {
    this.dragTr = true;
    this.dragElement = dragElement;
    return;
    let currentElement = e.target;

    while (currentElement && !currentElement.classList.contains('dragdropabletr')) {
      currentElement = currentElement.parentElement;
    }

    this.selectedTr = `<td> ${currentElement.children[0].innerHTML} </td><td> ${currentElement.children[1].innerHTML} </td><td>${currentElement.children[2].innerHTML} </td>`;

    let currentID = currentElement.childNodes[1].childNodes[1].textContent;
    currentID -= 1;
    let str = '';
    if (this.viewContentIndex == 0) {
      str = `<div>id: ${this.data.tableData[currentID].id}</div><div> study: ${this.data.tableData[currentID].study}</div>`;
    } else {
      str = `<div>id: ${this.data.tableData[currentID].id}</div><div> temperature: ${this.data.tableData[currentID].temperature}</div>`;
    }
    this.selectedBox = str;
  };

  _setBoxPosicsViewFilter = (mode) => {
    console.log('viewmode', mode);
    this.viewContentIndex = mode;
    this.requestUpdate();
  };

  _setShowBoxViewModeList = () => {
    this.listBoxViewMode = !this.listBoxViewMode;
    this.requestUpdate();
  };

  _allowDrop = (e) => {
    e.preventDefault();
  };

  _dropInUnstructuredBox = (e, y, x) => {
    e.preventDefault();

    if (this.viewModelFromProcModel.dropAction === undefined) {
      if (this.lang === 'en') {
        console.log('viewModelFromProcModel', this.viewModelFromProcModel);
        alert('No drop action defined');
      } else {
        alert('No hay definida acción al soltar');
      }
      return;
    }
    if (this.dataIntegrityChecks(this.viewModelFromProcModel, this.selectedBox, this.dragElement) === false) {
      return;
    }
    this.trazitButtonsMethod(
      e,
      false,
      this.viewModelFromProcModel.dropAction,
      true,
      undefined,
      undefined,
      this.selectedBox,
      false,
      undefined,
      this.selectedBox,
      this.dragElement
    );
    return;
  };

  _dropInStructuredBox = (e, y, x) => {
    e.preventDefault();
    this.selectedBox.posicx = x;
    this.selectedBox.posicy = y;

    let selectedBoxContentData = undefined;
    if (selectedBox !== undefined) {
      selectedBoxContentData = this.selectedBox[this.viewModelFromProcModel.boxesContentColumns.endPointPropertyArray];
    }

    if (selectedBoxContentData.some((item) => item.posX === y && item.posY === x)) {
      if (this.lang === 'en') {
        alert('Position occupied already');
      } else {
        alert('Posición ocupada actualmente');
      }
      return;
    }

    if (this.viewModelFromProcModel.dropAction === undefined) {
      if (this.lang === 'en') {
        console.log('viewModelFromProcModel', this.viewModelFromProcModel);
        alert('No drop action defined');
      } else {
        alert('No hay definida acción al soltar');
      }
      return;
    }
    if (this.dataIntegrityChecks(this.viewModelFromProcModel, this.selectedBox, this.dragElement) === false) {
      return;
    }
    alert('Success to Drop');
    this.trazitButtonsMethod(
      e,
      false,
      this.viewModelFromProcModel.dropAction,
      true,
      undefined,
      undefined,
      this.selectedBox,
      false,
      undefined,
      this.selectedBox,
      this.dragElement
    );
    return;
  };

  _allowDropTr = (e) => {
    e.preventDefault();
  };

  _dropTableTr = (e) => {
    e.preventDefault();
    let currentElement = e.target;
    currentElement.parentNode.innerHTML = this.selectedTr;
  };

  _dragBox = (e, x, y) => {
    this.dragBoxData.x = x;
    this.dragBoxData.y = y;
    this.selectedBox.datas.map((item, index) => {
      if (item.posX == x && item.posY == y) {
        this.dragBoxData.id = item.id;
        this.dragBoxData.name = item.name;
        this.dragBoxData.temperature = item.temperature;
        this.dragBoxData.study = item.study;
      }
    });
    console.log('asdf', this.dragBoxData);
    this.dragTr = false;
    let currentElement = e.target;
    while (currentElement && !currentElement.classList.contains('box')) {
      currentElement = currentElement.parentElement;
    }
    this.dragParentElement = currentElement;
    this.dragBackgroundColor = currentElement.style.backgroundColor;
    this.dragElement = e.target.childNodes[1];
    this.selectedBox = e.target.childNodes[1].innerHTML;
  };

  _setSelectBoxIndex = (first, second) => {
    this.selectedIndex1 = first;
    this.selectedIndex2 = second;
    this.requestUpdate();
  };

  _setViewMode = (mode) => {
    this.viewModelFromProcModel.viewMode = mode;
    this.requestUpdate();
  };

  dataIntegrityChecks(viewModel, selectedBox, dropData) {
    if (viewModel === undefined || viewModel.dataIntegrityCheck === undefined) {
      return true;
    }
    if (!this.dataIntegrityDragElementMandatoryProps(viewModel, selectedBox, dropData)) {
      return false;
    }
    if (!this.dataIntegrityDragElementMandatoryPropsAndMatchValues(viewModel, selectedBox, dropData)) {
      return false;
    }

    return true;
  }

  dataIntegrityDragElementMandatoryProps(viewModel, selectedBox, dropData) {
    if (viewModel.dataIntegrityCheck.dropingEntryRequiredProperties === undefined) {
      return true;
    }
    for (const property of viewModel.dataIntegrityCheck.dropingEntryRequiredProperties) {
      if (!(property in dropData)) {
        alert('The property ' + property + ' is required and not found');
        return false;
      }
    }
    return true;
  }

  dataIntegrityDragElementMandatoryPropsAndMatchValues(viewModel, selectedBox, dropData) {
    if (viewModel.dataIntegrityCheck.dropingEntryRequiredPropertiesAndMatchValues === undefined) {
      return true;
    }

    for (const entry of viewModel.dataIntegrityCheck.dropingEntryRequiredPropertiesAndMatchValues) {
      if (!('name' in entry) || !('criteria' in entry)) {
        alert('Each entry must contain a name and criteria');
        return false;
      }

      const propertyName = entry.name;
      const criteria = entry.criteria;

      if (!(propertyName in dropData)) {
        alert('The property ' + propertyName + ' is required and not found');
        return false;
      }

      switch (criteria.type) {
        case 'value':
          if (String(dropData[propertyName]) !== String(criteria.value)) {
            alert(`The value for ${propertyName} must exactly match ${criteria.value} but is ${dropData[propertyName]}`);
            return false;
          }
          break;
        case 'values':
          if (!criteria.values.map(String).includes(String(dropData[propertyName]))) {
            let validValuesList = criteria.values.join(', ');
            alert(`The value for ${propertyName} must be one of the specified values: [${validValuesList}]`);
            return false;
          }
          break;
        case 'greater':
          if (typeof dropData[propertyName] !== 'number' || dropData[propertyName] < criteria.value) {
            alert(`The value for ${propertyName} must be a number greater than ${criteria.value}`);
            return false;
          }
          break;
        case 'greater_or_equal':
          if (typeof dropData[propertyName] !== 'number' || dropData[propertyName] <= criteria.value) {
            alert(`The value for ${propertyName} must be a number greater than ${criteria.value}`);
            return false;
          }
          break;
        case 'less':
          if (typeof dropData[propertyName] !== 'number' || dropData[propertyName] > criteria.value) {
            alert(`The value for ${propertyName} must be a number less than ${criteria.value}`);
            return false;
          }
          break;
        case 'less_or_equal':
          if (typeof dropData[propertyName] !== 'number' || dropData[propertyName] >= criteria.value) {
            alert(`The value for ${propertyName} must be a number less than ${criteria.value}`);
            return false;
          }
          break;
        case 'range':
          if (
            typeof dropData[propertyName] !== 'number' ||
            dropData[propertyName] < criteria.min ||
            dropData[propertyName] > criteria.max
          ) {
            alert(`The value for ${propertyName} must be a number between ${criteria.min} and ${criteria.max}`);
            return false;
          }
          break;
        case 'selectedBox_value':
          let selectedBoxPropertyName = criteria.selectedBoxPropName || propertyName;
          if (String(dropData[propertyName]) !== String(selectedBox[selectedBoxPropertyName])) {
            alert(
              `The value for ${propertyName} in dropData must match the value of ${selectedBoxPropertyName} in selectedBox that is ${selectedBox[selectedBoxPropertyName]}`
            );
            return false;
          }
          break;
        case 'selectedBox_range':
          selectedBoxPropertyName = criteria.selectedBoxPropName || propertyName;
          let range = selectedBox[selectedBoxPropertyName].split('-').map(Number);
          if (
            range.length !== 2 ||
            isNaN(range[0]) ||
            isNaN(range[1]) ||
            dropData[propertyName] < range[0] ||
            dropData[propertyName] > range[1]
          ) {
            alert(
              `The value for ${propertyName} in dropData must be within the range specified in selectedBox for ${selectedBoxPropertyName} (${selectedBox[selectedBoxPropertyName]})`
            );
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

  _boxesTable(tmpLogic, elem, data, lang) {
    let dataArr = this.TRAZiTgetDataFromRoot(elem, data);
    return html`
      ${this.genericFormDialogTemplate()}
      <div id="boxesTableMainArea">
        ${this.getButton(elem, data, data, false, undefined)}
        <table class="dragdropable TRAZiT-DefinitionArea">
          <thead>
            ${elem.columns.map((column, i) => html`<th>${column.label_en}</th>`)}
                        ${elem.row_buttons === undefined
                          ? html``: html`<th class="actions-column">${this.lang==='es'?`Acciones`:`Actions`}</th>`}            
          </thead>
          <tbody>
            ${dataArr === undefined || !Array.isArray(dataArr)
              ? html`No Data`
              : html`
                  ${dataArr.map(
                    (p, i) => html`
                      <tr @click=${() => this._showBoxContent(p, i)}>
                        ${elem.columns.map((fld, index) =>
                          fld.is_icon !== undefined && fld.is_icon == true
                            ? fld.icon_class
                              ? html`
                                  ${fld.tooltip !== undefined
                                    ? html`
                                        <grid-cell-tooltip lang="${lang}" .element="${fld}" .data="${p}">
                                          <div class="left-area">
                                            <mwc-icon-button
                                              class="icon ${p[fld.icon_class]}"
                                              icon="${p[fld.icon_name]}"
                                              alt="${fld.name}"
                                            ></mwc-icon-button>
                                          </div>
                                        </grid-cell-tooltip>
                                      `
                                    : html`
                                        <mwc-icon-button
                                          class="icon ${p[fld.icon_class]}"
                                          icon="${p[fld.icon_name]}"
                                          alt="${fld.name}"
                                        ></mwc-icon-button>
                                      `}
                                `
                              : html`
                                  <td>
                                    ${fld.tooltip !== undefined
                                      ? html`
                                          <grid-cell-tooltip lang="${lang}" .element="${fld}" .data="${p}">
                                            <img src="${tmpLogic.iconRendererSrc(p, fld.name, i, fld)}" style="width:20px" />
                                          </grid-cell-tooltip>
                                        `
                                      : html`
                                          <img src="${tmpLogic.iconRendererSrc(p, fld.name, i, fld)}" style="width:20px" />
                                        `}
                                  </td>
                                `
                            : html`
                                <td>
                                  ${fld.tooltip !== undefined
                                    ? html`
                                        <grid-cell-tooltip lang="${lang}" .element="${fld}" .data="${p}">
                                          ${p[fld.name]}
                                        </grid-cell-tooltip>
                                      `
                                    : html`
                                        ${this.cellValue(fld, p)}
                                      `}
                                </td>
                              `
                        )}
                        ${elem.row_buttons === undefined
                          ? html``
                          : html`
                              <td class="actions-column">
                                <div class="layout horizontal center flex wrap">
                                  ${this.getButtonForRows(elem.row_buttons, p, false, undefined)}
                                </div>
                              </td>
                            `}
                      </tr>
                    `
                  )}
                `}
          </tbody>
        </table>
      </div>
    `;
  }

  _dragObjectsTable(tmpLogic, elem, data) {
    let dataArr = this.TRAZiTgetDataFromRoot(elem, data)
    return html`
    <div style="flex: 1; display: flex; flex-direction: column; height: 100%;"> <!-- Añadido display: flex y height: 100% para ocupar todo el espacio -->
        <div id="toggleDisplayDroggableTable" style="display:flex; flex-direction:row; gap: 4px; align-items: center;">
            <div class="accept-btn" @click=${() => tmpLogic.setViewTable()}> ${tmpLogic.setViewTableButtonLabel()}</div>
        </div>
        ${tmpLogic.viewTable ? html`
            <div style="flex: 1; overflow-y: auto;"> <!-- Añadido overflow-y: auto para el scroll vertical -->
                ${elem.columns === undefined ? html`` : html`
                    <table class="dragdropable TRAZiT-DefinitionArea">
                        <thead>
                            ${elem.columns.map((column) => html`<th>${column.label_en}</th>`)}
                        </thead>
                        <tbody>
                            ${dataArr === undefined || !Array.isArray(dataArr) ? html`No Data` : 
                            html`  
                                ${dataArr.map((p, idx) => html`
                                <tr draggable="true" @dragstart=${(e) => tmpLogic.dragTableTr(e, elem, p)}>
                                
                                    ${elem.columns.map((fld, index) => fld.is_icon !== undefined && fld.is_icon == true ? 
                                        fld.icon_class ?
                                            html`<div class="left-area">
                                                ${this.iconRenderer(p, fld.name, idx, fld)}
                                                <mwc-icon-button class="icon ${p[fld.icon_class]}" icon="${p[fld.icon_name]}" alt="${fld.name}"></mwc-icon-button>
                                            </div>` :
                                            html`${this.iconRenderer(p, fld.name, idx, fld)}
                                                <img src="${tmpLogic.iconRendererSrc(p, fld.name, idx, fld)}" style="width:20px">` 
                                        :     
                                        html`<td @click="${() => this.shadowRoot.querySelector('#detail' + idx).toggle()}">${p[fld.name]}</td>`                    
                                    )}
                                    ${elem.row_buttons === undefined ? html`` : html`<td><div class="layout horizontal center flex wrap">${this.getButtonForRows(elem.row_buttons, p, false, parentData)}</div></td>`}
                                </tr>
                                <table-row-detail id="detail${idx}">
                                <div slot="details">
                                    <!-- Aquí puedes poner el contenido detallado para esta fila -->
                                </div>
                                </table-row-detail>`)}
                            `}
                        </tbody>
                    </table>
                `}
            </div>
        ` : null}
    </div> 
    `
}  
  cellValue(fld, p) {
    if (String(fld.name).toLowerCase() === 'counter') {
      if (fld.propertyName === undefined || p[fld.propertyName] === undefined) {
        return 0;
      } else {
        return p[fld.propertyName].length;
      }
    }
    if (fld.name === 'chrono') {
      const chronoContent = this.chrono(fld, p);
      return html`<span class="${chronoContent.class}" title="Warning: ${fld.startWarning}, Alert: ${fld.startAlert}">
        ${chronoContent.timeDifference}
      </span>`;
    }
    return p[fld.name];
  }

  chrono(fld, p) {
    const startTime = new Date(p[fld.fldForTimer]);
    const currentTime = new Date();
    const timeDifference = Math.floor((currentTime - startTime) / 1000); // difference in seconds
  
    let timeClass = 'black';
    let timeDifferenceText = `${timeDifference} seconds`;
    const fontFamily = 'Montserrat';
  
    if (isNaN(timeDifference)) {
      if (this.lang==="es"){
        timeDifferenceText = 'Tanda sin iniciar';
      }else{
        timeDifferenceText = 'Batch not started';
      }
      timeClass = 'black';
    } else {
      if (timeDifference > fld.startWarning && timeDifference < fld.startAlert) {
        timeClass = 'yellow';
      } else if (timeDifference >= fld.startAlert) {
        timeClass = 'red';
      }
    }  
    return {
      timeDifference: timeDifferenceText,
      class: timeClass,
      style: {
        fontFamily: fontFamily
      }
    };
  }  
}

window.customElements.define('dragdrop-box', DragDropBox);

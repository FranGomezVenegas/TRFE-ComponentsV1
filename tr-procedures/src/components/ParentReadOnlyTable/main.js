import { LitElement, html, css } from 'lit';
import { nothing } from 'lit-html';
import { styles } from './styles.js';
import { template } from './the.template.js';
import { ReadOnlyTableParts } from '../Views/ReadOnlyTableParts.js'; // Adjust the import path
import { ApiFunctions } from '../Api/ApiFunctions.js';
import { ButtonsFunctions } from '../Buttons/ButtonsFunctions.js';

class NewparentReadOnlyTable extends ReadOnlyTableParts(ButtonsFunctions(ApiFunctions(LitElement))  ) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      elem: { type: Object },
      dataArr: { type: Array },
      isSecondLevel: { type: Boolean },
      directData: { type: Array },
      alternativeTitle: { type: String },
      parentElement: { type: Object },
      theme: { type: String },
      parentData: { type: Object }
    };
  }

  constructor() {
    super();
    this.isSecondLevel = false;
  }

  updated(changedProperties) {
    if (changedProperties.has('directData')) {
      this.dataArr = this.getDataFromRoot(this.elem, this.directData);
    }
  }

  getDataFromRoot(elem, data) {
    return getDataFromRoot(elem, data);
  }

  handleFilter(event, p, elem, idx) {
    const endPointResponseObject = elem.endPointResponseObject;
    const isToggling = this.selectedTableIndex[endPointResponseObject] === idx;
    this.resetFilterIndex(elem);

    if (!isToggling) {
      this.selectedTableIndex = {
        ...this.selectedTableIndex,
        [endPointResponseObject]: idx
      }
    }
  }

  handleResetParentFilter(elem) {
    this.resetFilterIndex(elem);
  }

  resetFilterIndex(elem) {
    const endPointResponseObject = elem.endPointResponseObject;
    this.selectedTableIndex = {
      ...this.selectedTableIndex,
      [endPointResponseObject]: undefined
    }

    if (elem.children_definition) {
      const childElement = {
        ...elem.children_definition,
        endPointResponseObject: elem.children // "_child"
      };
      this.resetFilterIndex(childElement);
    }
  }

  render() {
    return template(this);
  }
}

customElements.define('newparent-read-only-table', NewparentReadOnlyTable);

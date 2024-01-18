import {LitElement} from 'lit-element';
import {template} from './dragdropbox.template';
import {styles} from './dragdropbox.css';
import { navigator } from "lit-element-router";
export class DragDropBox extends navigator(LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      data: { type: Object },
    };
  }

  constructor() {
    super();
    this.selectedIndex1 = "";
    this.selectedIndex2 = "";
    this.viewMode = 1;
    this.data = {
      cols: 8,
      rows: 5,
    }
  }

  render() {
    return template({
      data: this.data,
      selectedIndex1: this.selectedIndex1,
      selectedIndex2: this.selectedIndex2,
      viewMode: this.viewMode,
      setSelectBoxIndex: this._setSelectBoxIndex,
      setViewMode: this._setViewMode,
    });
  }

  _setSelectBoxIndex = (first, second)  => {
    this.selectedIndex1 = first;
    this.selectedIndex2 = second;
    this.requestUpdate();
  }

  _setViewMode = (mode) => {
    this.viewMode = mode;
    this.requestUpdate();
  }
}

window.customElements.define('dragdrop-box', DragDropBox);

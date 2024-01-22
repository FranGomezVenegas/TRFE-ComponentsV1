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
      viewMode: { type: Number},
      selectedIndex1: { type: String },
      selectedIndex2: { type: Number}
    };
  }

  constructor() {
    super();
    this.selectedIndex1 = "";
    this.selectedIndex2 = 0;
    this.viewMode = 1;
    this.selectedBox = undefined;
    this.data = {
      cols: 5,
      rows: 3,
      datas: [
        {
          id: 1, 
          name: "Sample1",
          description: "Hello",
          study: "Sample here",
          temperature: "aaa",
          result1: 1,
          result2: 2,
          posX: 2,
          posY: 1,
          stored_on: "2024-01-19"
        },
        {
          id: 2, 
          name: "Sample2",
          description: "Hello2",
          study: "Sample here2",
          temperature: "bbb",
          result1: 1,
          result2: 2,
          posX: 3,
          posY: 2,
          stored_on: "2024-01-17"
        },
        {
          id: 3, 
          name: "Sample3",
          description: "Hello3",
          study: "Sample here3",
          temperature: "ccc",
          result1: 1,
          result2: 2,
          posX: 5,
          posY: 3,
          stored_on: "2024-01-16"
        }
      ]
    };
    this.dragElement = undefined;
  }

  render() {
    return template({
      data: this.data,
      selectedIndex1: this.selectedIndex1,
      selectedIndex2: this.selectedIndex2,
      viewMode: this.viewMode,
      setSelectBoxIndex: this._setSelectBoxIndex,
      setViewMode: this._setViewMode,
      dropBox: this._dropBox,
      allowDrop: this._allowDrop,
      dragBox: this._dragBox,
    });
  }

  _allowDrop = (e) => {
    e.preventDefault();
  }

  _dropBox = (e) => {
    e.preventDefault();
    let currentElement = e.target;
    while (currentElement && !currentElement.classList.contains('box')) {
        currentElement = currentElement.parentElement;
    };
    this.dragElement.innerHTML =  currentElement.childNodes[1].childNodes[1].innerHTML;
    currentElement.childNodes[1].childNodes[1].innerHTML = this.selectedBox;
  }

  _dragBox = (e) => {
    let currentElement = e.target;
    while (currentElement && !currentElement.classList.contains('box')) {
        currentElement = currentElement.parentElement;
    }
    this.dragElement = e.target.childNodes[1];
    this.selectedBox = e.target.childNodes[1].innerHTML;
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

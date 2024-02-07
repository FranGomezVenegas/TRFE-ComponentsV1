import {LitElement} from 'lit-element';
import {template} from './stagesview.template';
import { styles } from './stagesview.css';
import { navigator } from "lit-element-router";
export class StagesView extends navigator(LitElement) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      state: { type: Number }
    };
  }

  constructor() {
    super();
    this.state = 0;
    this.data = {
      datas: [
        { name : "Assigned" },
        { name : "Started" },
        { name : "Completed" },
        { name : "Approved" }
      ],
      currentState: 1
    }
  }

  render() {
    return template({
      data: this.data
    });
  }
}

window.customElements.define('stages-view', StagesView);

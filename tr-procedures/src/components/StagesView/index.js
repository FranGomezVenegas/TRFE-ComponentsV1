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
      stages: { type: Array},
      currentstage: { type: Number },
      data:{type: Object},
      lang: {type: String}
    };
  }

  constructor() {
    super();
    this.stages=[]
    this.currentstage = 0;
    this.data = {}
    this.lang=''
  }

  render() {
    console.log('stages', this.stages)
    this.data = {
      stages: this.stages,
    //[
    //   { name : "Assigned" },
    //   { name : "Started" },
    //   { name : "Completed" },
    //   { name : "Approved" }
    // ],
    currentStageName: this.stages[this.currentstage-1],
    currentState: this.currentstage-1   
  }  
    return template({
      data: this.data
    },
    this.lang);
  }
}

window.customElements.define('stages-view', StagesView);

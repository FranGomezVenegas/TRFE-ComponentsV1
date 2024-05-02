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
    let currentStageName=''
    if (this.currentstage===undefined){
      this.currentstage=0
    }
    if (this.stages!==undefined){
      currentStageName=this.stages[this.currentstage-1]    
    }
    this.data = {
      stages: this.stages,
    //[
    //   { name : "Assigned" },
    //   { name : "Started" },
    //   { name : "Completed" },
    //   { name : "Approved" }
    // ],
    currentStageName: currentStageName,
    currentState: this.currentstage-1   
  }  
    return template({
      data: this.data
    },
    this.lang);
  }
}

window.customElements.define('stages-view', StagesView);

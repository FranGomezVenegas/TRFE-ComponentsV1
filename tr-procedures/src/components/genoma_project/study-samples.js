import { html, css } from 'lit';
import { CoreView } from './../core-view';
import { Layouts } from '@collaborne/lit-flexbox-literals';

let langConfig = {
  limitView: {
    header: { label_en: 'Program limits list', label_es: 'Lista de rangos límite para el programa' }
  },
  configTableSpecLimits: {
    'genoma-1': {
      'study': {
        'label_en': 'Study', 'label_es': 'Estudio'
      },
      'sample_id': {
        'label_en': 'Sample Id', 'label_es': 'Num Muestra'
      },
    }
  }
}

export class StudySamples extends CoreView {
  static get styles() {
    return [Layouts,
      super.styles,
      css`
      .styled-table {
        display: -webkit-inline-box;
        margin-top: 0px;
        margin-bottom: 3px;
        color: #4285f4;
        font-size:2vmin;
        border-collapse: collapse;
        margin: 25px 0;
        font-family: sans-serif;
        min-width: 400px;
        box-shadow: 0 0 20px #44cbe6;
      }            
      .styled-table thead tr {
        background-color: #2989d8;
        color: #ffffff;
        text-align: left;
      }   
      .styled-table th,
      .styled-table td {
        color: #032bbc; 
        padding: 12px 15px;
      }  
      .styled-table tbody tr {
        border-bottom: 1px solid #207cca;
      }
      .styled-table tbody tr:nth-of-type(even) {
        background-color: #c2f2ff5c;
      }
      .styled-table tbody tr:last-of-type {
        border-bottom: 2px solid #009879;
      }      
      .styled-table tbody tr.active-row {
        font-weight: bold;
        color: #009879;
      }
      `
    ];
  }

  static get properties() {
    return {
      procName: { type: String }
    }
  }

  tabView() {
    console.log('this.procName',this.procName);
    return html`
      <h2>${langConfig.limitView.header["label_"+ this.lang]} ${this.selectedProgram&&this.selectedProgram.name}</h2>
      <table class="styled-table">
        <thead>
          <tr>
            <th>${langConfig.configTableSpecLimits[this.procName].study["label_"+ this.lang]}</th>
            <th>${langConfig.configTableSpecLimits[this.procName].sample_id["label_"+ this.lang]}</th>
          </tr>
        </thead>
        <tbody>
          ${this.selectedProgram&&this.selectedProgram.study_individual_sample.map(p => 
            html`
            <tr>
              ${this.procName=="em-demo-a" ?
                html`
                  <td>${langConfig.configTableSpecLimits[this.procName]["value_"+p.variation_name]["label_"+ this.lang]}</td>
                  <td>${langConfig.configTableSpecLimits[this.procName]["value_"+p.analysis]["label_"+ this.lang]}</td>
                  <td>${langConfig.configTableSpecLimits[this.procName]["value_"+p.method_name]["label_"+ this.lang]}</td>
                  <td>${langConfig.configTableSpecLimits[this.procName]["value_"+p.parameter]["label_"+ this.lang]}</td>
                ` :
                html`
                  <td>${p.study}</td>
                  <td>${p.sample_id}</td>
                `
              }
              <td>
                <span style="color:green">${p["spec_text_green_area_"+ this.lang]}</span>
                <span style="color:orange">${p["spec_text_yellow_area_"+ this.lang]}</span>
                <span style="color:red">${p["spec_text_red_area_"+ this.lang]}</span>
              </td>
            </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }

  setView() {
  }
}
customElements.define('study-samples', StudySamples);
import { html, css, nothing, LitElement } from 'lit';
// import('../grid_with_buttons/grid-with-buttons');
// import './tabs-composition';
// import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';

import { navigator } from 'lit-element-router';
export class HomeAir extends navigator(LitElement) {
  static get styles() {
    return css`
      :host([disabled]) {
        opacity: 0.5;
        pointer: none;
      }
      .maindiv {
        width: 850px;
      }
      .btn-2 {
        filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.6));
      }
      .btn-2 {
        display: inline-block;
        position: relative;
        color: #fff;
        border: 15px #c0080b;
        font-weight: 500;
        font-family: "Arial";
        text-decoration: none;
        text-transform: uppercase;
        padding: 15px 50px;
        text-align: center;
        clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
        background-color: #7ed8f2;
        border: 10px;
      }
      .btn-1 {
        display: inline-block;
        position: relative;
        color: #fff;
        font-family: "Arial";
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        padding: 30px 30px;
        text-align: center;
        clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
        background-color: #d9f8fa;
      }

      .start-end {
        display: inline-block;
        position: relative;
        color: #7ed8f2;
        font-family: "Arial";
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        padding: 30px 30px;
        text-align: center;
        clip-path: polygon(20% 0, 82% 0, 100% 50%, 80% 100%, 40% 150%, 0 50%);
        background-color: #d9f8fa;
      }
      .block-background {
        display: inline-block;
        position: relative;
        color: #fff;
        font-family: "Arial";
        font-weight: 500;
        text-decoration: none;
        text-transform: uppercase;
        padding: 15px 35px 0px 20px;
        text-align: center;
        clip-path: polygon(4% 0, 94% 0, 100% 50%, 90% 130%, 8% 150%, 0 50%);
        background-color: #d9f8fa;
      }
      .node {
        filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.6));
      }
      .node {
        display: inline-block;
        position: relative;
        color: #fff;
        border: 15px #c0080b;
        font-weight: 500;
        font-family: "Arial";
        text-decoration: none;
        text-transform: uppercase;
        padding: 0px 30px;
        text-align: center;
        clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%);
        background-color: #7ed8f2;
        border: 10px;
      }

      .container {
        max-width: 1024px;
      }

      text {
        cursor: pointer;
      }

      circle {
        cursor: pointer;
      }

      .container.primary circle,
      .container.primary rect {
        fill: #18a4fe;
        stroke: #18a4fea0;
      }

      .container.primary circle {
        stroke-width: 10;
      }

      .container.primary circle:hover {
        fill: #18a4fed0;
      }

      .container.primary path {
        stroke: #18a4fe;
        stroke-width: 10;
      }

      .container.primary text {
        font-size: 20px;
        font-weight: bold;
        fill: white;
        font-family: Montserrat;
        text-anchor: middle;
        alignment-baseline: middle;
      }
    `;
  }

    static get properties() {
        return {
            tabsMainViewModelFromProcModel: {type: Object},
            viewModelFromProcModel: {type: Object},        

            config: { type: Object },
            procName: { type: String },
            ready:{type: Boolean},
            viewName: { type: String },
            filterName: { type: String },
            lang: { type: String },
            procInstanceName:{type: String},
    
        }
    }
    constructor() {
        super()
        this.viewModelFromProcModel={} 
        this.tabsMainViewModelFromProcModel={}
        console.log('constructor flowchart')
        this.ready=false;
        this.config={}
  
    }
    firstUpdated() {
      const nodes = this.shadowRoot.querySelectorAll('.node');
      nodes.forEach(node => {
        node.addEventListener('click', () => {
          alert(`Clicked on ${node.textContent}`);
        });
      });
    }
    render() {
      return html`
      <svg
      class="container primary"
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 170 300 q 15 -60 60 -100" fill="none" />
      <path d="M 170 300 q 15 60 60 100" fill="none" />
      <rect x="770" y="195" width="60" height="10" />
      <rect x="770" y="395" width="60" height="10" />
      <path d="M 970 200 q 15 -30 60 100" fill="none" />
      <path d="M 970 400 q 15 30 60 -100" fill="none" />
      <path d="M 370 200 q 15 -30 60 100" fill="none" />
      <path d="M 370 400 q 15 30 60 -100" fill="none" />
      <path d="M 570 300 q 15 -60 60 -100" fill="none" />
      <path d="M 570 300 q 15 60 60 100" fill="none" />

      <circle cx="30" cy="300" r="20" />
      <circle cx="170" cy="300" r="20" />
      <circle class="sample" cx="100" cy="300" r="70" @click=${() => this.elementClicked("LogSamples", "SampleLogin")} />
      <text x="100" y="290" @click=${() => this.elementClicked("LogSamples", "SampleLogin")}>Program</text>
      <text x="100" y="310" @click=${() => this.elementClicked("LogSamples", "SampleLogin")}>Definition</text>

      <circle cx="430" cy="300" r="20" />
      <circle cx="570" cy="300" r="20" />
      <circle class="sample" cx="500" cy="300" r="70" />
      <text x="500" y="300">Incubate</text>

      <circle cx="230" cy="200" r="20" />
      <circle cx="370" cy="200" r="20" />
      <circle class="results" cx="300" cy="200" r="70" @click=${() => this.elementClicked("ReviewTesting", "FQ Testing")}/>
      <text x="300" y="200" @click=${() => this.elementClicked("ReviewTesting", "FQ Testing")} >Sampling</text>

      <circle cx="630" cy="200" r="20" />
      <circle cx="770" cy="200" r="20" />
      <circle class="testing" cx="700" cy="200" r="70" @click=${() => this.elementClicked("ReviewTesting", "FQ Testing")} />
      <text x="700" y="190" @click=${() => this.elementClicked("ReviewTesting", "FQ Testing")}>Plate</text>
      <text x="700" y="210" @click=${() => this.elementClicked("ReviewTesting", "FQ Testing")}>Reading</text>

      <circle cx="830" cy="200" r="20" />
      <circle cx="970" cy="200" r="20" />
      <circle class="testing" cx="900" cy="200" r="70" @click=${() => this.elementClicked("ReviewTestingGroup", "FQ Testing")}/>
      <text x="900" y="190" @click=${() => this.elementClicked("ReviewTestingGroup", "FQ Testing")}>Identification of</text>
      <text x="900" y="210" @click=${() => this.elementClicked("ReviewTestingGroup", "FQ Testing")}>microorganism</text>

      <circle cx="230" cy="400" r="20" />
      <circle cx="370" cy="400" r="20" />
      <circle class="results" cx="300" cy="400" r="70" @click=${() => this.elementClicked("SampleEnterResult", "MB Testing")}/>
      <text x="300" y="400" @click=${() => this.elementClicked("SampleEnterResult", "MB Testing")}>Sampling</text>

      <circle cx="630" cy="400" r="20" />
      <circle cx="770" cy="400" r="20" />
      <circle class="testing" cx="700" cy="400" r="70" @click=${() => this.elementClicked("ReviewTesting", "MB Testing")} />
      <text x="700" y="390" @click=${() => this.elementClicked("ReviewTesting", "MB Testing")}>Plate</text>
      <text x="700" y="410" @click=${() => this.elementClicked("ReviewTesting", "MB Testing")}>Reading</text>

      <circle cx="830" cy="400" r="20" />
      <circle cx="970" cy="400" r="20" />
      <circle class="testing" cx="900" cy="400" r="70" @click=${() => this.elementClicked("ReviewTestingGroup", "MB Testing")} />
      <text x="900" y="390" @click=${() => this.elementClicked("ReviewTestingGroup", "MB Testing")}>Identification of</text>
      <text x="900" y="410" @click=${() => this.elementClicked("ReviewTestingGroup", "MB Testing")}>microorganism</text>

      <circle cx="1030" cy="300" r="20" />
      <circle cx="1170" cy="300" r="20" />
      <circle class="sample" cx="1100" cy="300" r="70" @click=${() => this.elementClicked("ReviewSample", "")} />
      <text x="1100" y="300" @click=${() => this.elementClicked("ReviewSample", "")}>Inquires</text>
    </svg>
      `;
    }
    renderFran() {          
        return html`  
        ${this.viewModelFromProcModel ? 
        html`
            ${this.home()}              
        `: nothing}`
    }
    selectedMenu(route) {
      this.shadowRoot.querySelectorAll("sp-action-menu").forEach(s => s.open = false)
      this.navigate(route)
    }    
    elementClickedDynamic(e){
      console.log('elementClicked', this.procName,  e)
      let vwName='SampleMicroorganism' 
      //e.target.viewname
      let fltrName='MicroOrganismPERS' 
      //e.filtername
      this.selectedMenu('/dashboard/procedures?procName='+this.procName+
      '&viewName='+vwName+'&filterName='+fltrName)
      // this.trProc.ready = false
      // this.trProc.procName = this.procName
      // this.trProc.viewName = e.target.viewName
      // this.trProc.filterName = e.target.filterName
      // this.trProc.resetView()
      // this.trProc.authorized()
      // this.trProc.render()
      
    }
    elementClicked(vwName, fltrName){
      console.log('elementClicked', this.procName,  vwName, fltrName)
      this.selectedMenu('/dashboard/procedures?procName='+this.procName+
      '&viewName='+vwName+'&filterName='+fltrName)
    }
    homeAI(){
      return html`
        <div class="container">
        <div class="left-element">
          <div class="inner-elements">
            <div class="blue-box">Element 1</div>
            <div class="blue-box">Element 2</div>
          </div>
        </div>
        <div class="right-element">
          <h1>Hola</h1>
        </div>
      </div>
  
      `
    }
    home(){
      return html`


      <div class="maindiv">
      <div @click=${()=>this.elementClicked("LogSamples", "SampleLogin")} class="start-end" style="top: 50px; left: 20px;"><span>New <br>Samples</span></div>
      
      <div class="block-background" style="left:0px;">
        <div style="display:inline-grid;">
        <a @click=${()=>this.elementClicked("SamplePendingSampling", "SamplingSMP")} 
          class="node" style="font-size: 12px;"><span style="line-height: 40px">Sampling</span></a>
        <a @click=${()=>this.elementClicked("SamplePendingSamplingInterval", "SamplingSMP")} 
          class="node" style="font-size: 12px;"><span style="line-height: 40px">Sampling Static</span></a>
      </div>
        <div class="btn-2" style="left: -400px; top: -65px;"><span style="line-height: 40px">Incubar</span></div>
        <div @click=${()=>this.elementClicked("SamplePlateReading", "SamplingSMPlateReadingSPP")} 
          class="node" style="left: -30px; top:-6px; padding: 15px 20px;"><span>Plate<br>Reading</span></div>
        <div @click=${()=>this.elementClicked("SamplePlateReadingSecondEntry", "PlateReadingSecondEntrySMP")} 
          class="node" style="left: -30px; top:-6px; padding: 15px 20px;"><span>Plate Reading<br>Second Entry</span></div>
        <div @click=${()=>this.elementClicked("SampleMicroorganism", "MicroOrganismSMP")} 
          class="node" style="left: -25px; top:-6px;padding: 15px 20px;"><span>Microorganism<br>Identification</span></div>
      </div>
      <div class="block-background" style="top: 8px; left:130px;">
      <div style="display:inline-grid;">
        <a @click=${()=>this.elementClicked("SamplePendingSampling", "SamplingPERS")} 
          class="node" style="font-size: 12px;"><span style="line-height: 40px">Sampling</span></a>
          <a @click=${()=>this.elementClicked("SamplePendingSamplingInterval", "SamplingPERS")} 
          class="node" style="font-size: 12px;"><span style="line-height: 40px">Sampling Static</span></a>
      </div>          
        <div @click=${()=>this.elementClicked("SampleIncubation", "")} 
          class="btn-2" style="left: -369px; top: -102px;"><span style="line-height: 40px">Incubar</span></div>
        <div @click=${()=>this.elementClicked("SamplePlateReading", "PlateReadingPERS")} 
          class="node" style="left: -30px; top:-10px; padding: 15px 20px;"><span>Plate<br>Reading</span></div>
        <div @click=${()=>this.elementClicked("SamplePlateReadingSecondEntry", "PlateReadingSecondEntryPERS")} 
          class="node" style="left: -30px; top:-10px; padding: 15px 20px;"><span>Plate Reading<br>Second Entry</span></div>
        <div @click=${()=>this.elementClicked("SampleMicroorganism", "MicroOrganismPERS")} 
          class="node" style="left: -25px; top:-10px; padding: 15px 20px;"><span>Microorganism<br>Identification</span></div>
      </div>
        <div @click=${()=>this.elementClicked("SampleIncubation", "")} 
          class="btn-2" style="left: -488px; top: -68px;"><span style="line-height: 40px">Incubar</span></div>
      <div class="start-end" style="top: -68px; left: -70px; padding: 30px 40px;"><span style="color: #D9F8FA;"> . </span><span>End</span><span style="color: #D9F8FA;"> . </span></div>
      </div>            
      `
    }
    homeResponsive(){
      return html`
        <div class="maindiv">
          <node @click=${this.elementClicked} title='login sample' style="height: 2vmin; top: 1.5vmin; left: 120px;"></node>
          <div class="blocks-background" style="top: -6.5vmin; left:20vmin;">
            <node @click=${this.elementClicked} title='login sample' style="height: 2vmin; top: 30px; left: 320px;"></node>
            <node @click=${this.elementClicked} title='login sample' style="height: 2vmin; top: 30px; left: 320px;"></node>
            ...............
          </div>
          <div class="blocks-background" style="top: -3.5vmin; left:20vmin;">
            <node @click=${this.elementClicked} title='login sample' style="height: 2vmin; top: 380px; left: 320px;"></node>
            <node @click=${this.elementClicked} title='login sample' style="height: 2vmin; top: 380px; left: 320px;"></node>
            ...............
          </div>
        </div>
      
      `
    }
    flowChart(){
      console.log('Flowchart')
        //this.resetView()
        return html`
        <div class="template-wrap">
        <div class="maindiv">
                
        <div @click=${this.elementClicked} class="node" title="f333dasdassad" style="height: 2vmin; top: 80px; left: 320px;"></div>
        <node @click=${this.elementClicked} title='f2' style="height: 2vmin; top: 380px; left: 42%></node>
        bv
        <div class="btn-1a" style="top: 80px; left: 20px;"><span @click=${this.elementClicked}></span></div>
        
        <div class="btn-1" @click=${this.elementClicked} viewname="SampleMicroorganism"
        filtername="MicroOrganismPERS"  >
          <a href=""
          
          id="sampleIncubation" class="btn-2"><span style="line-height: 40px">muestreo</span></a>
          <div class="btn-2" style="top: 65px; opacity: 0.0;"><span style="line-height: 40px">Incubar</span></div>
          <div class="btn-2" style="top: 8px"><span>Lectura <br>de placas</span></div>
          <div class="btn-2" style="top: 8px"><span>Identificación<br>Microorganismos</span></div></div>
          <div class="btn-1" style="top: 8px; left:152px;">
          <a href="#" class="btn-2"><span style="line-height: 40px">muestreo</span></a>
          <div class="btn-2" style="top: -65px; opacity: 0.0;"><span style="line-height: 40px">Incubar</span></div>
          <div class="btn-2" style="top: 8px"><span>Lectura <br>de placas</span></div>
          <div class="btn-2" style="top: 8px"><span>Identificación<br>Microorganismos</span></div></div>
          <div class="btn-1a" style="top: -60px; left: 120px;"><span>Lectura <br>de placas</span></div>
          <div class="btn-2" style="left: -650px; top: -65px; opacity: 0.5;"><span style="line-height: 40px">Incubar</span></div>         
      </div>          
      </div>    
        `
    }
    
}
window.customElements.define('home-air', HomeAir);
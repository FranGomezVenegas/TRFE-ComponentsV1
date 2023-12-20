import { html, css, nothing, LitElement } from "lit";
// import('../grid_with_buttons/grid-with-buttons');
// import './tabs-composition';
// import {DialogsFunctions} from '../GenericDialogs/DialogsFunctions';
import { navigator } from "lit-element-router";
export class HomeWater extends navigator(LitElement) {
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

      .container.primary text.up-title {
        font-size: 24px;
        fill: orange;
      }

      .container.primary text.lo-title {
        font-size: 24px;
        fill: blue;
      }

      .container.primary text.text-orange {
        fill: orange;
      }

      .container.primary text.text-blue {
        fill: blue;
      }
    `;
  }

  static get properties() {
    return {
      tabsMainViewModelFromProcModel: { type: Object },
      viewModelFromProcModel: { type: Object },
      config: { type: Object },
      procName: { type: String },
      ready: { type: Boolean },
      viewName: { type: String },
      filterName: { type: String },
      lang: { type: String },
      procInstanceName: { type: String },
    };
  }
  constructor() {
    super();
    this.viewModelFromProcModel = {};
    this.tabsMainViewModelFromProcModel = {};
    console.log("constructor flowchart");
    this.ready = false;
    this.config = {};
  }
  render() {
    return html` ${this.viewModelFromProcModel
      ? html` ${this.flowChart()} `
      : nothing}`;
  }
  selectedMenu(route) {
    this.shadowRoot
      .querySelectorAll("sp-action-menu")
      .forEach((s) => (s.open = false));
    this.navigate(route);
  }

  elementClicked(vwName, fltrName) {
    console.log("elementClicked", this.procName, vwName, fltrName);
    this.selectedMenu(
      "/dashboard/procedures?procName=" +
        this.procName +
        "&viewName=" +
        vwName +
        "&filterName=" +
        fltrName
    );
  }
  flowChart() {
    console.log("Flowchart");
    //this.resetView()
    return html`
      <svg
        class="container primary"
        viewBox="0 0 1200 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 170 300 q 15 -60 60 -100" fill="none" />
        <path d="M 170 300 q 15 60 60 100" fill="none" />
        <rect x="570" y="195" width="60" height="10" />
        <rect x="570" y="395" width="60" height="10" />
        <path d="M 770 200 q 15 -30 60 100" fill="none" />
        <path d="M 770 400 q 15 30 60 -100" fill="none" />
        <rect x="370" y="195" width="60" height="10" />
        <rect x="370" y="395" width="60" height="10" />
        <rect x="250" y="300" width="500" height="10" />

        <text x="100" y="180" class="up-title">FQ</text>
        <text x="100" y="420" class="lo-title">MB</text>

        <circle cx="30" cy="300" r="20" />
        <circle cx="170" cy="300" r="20" />
        <circle class="sample" cx="100" cy="300" r="70" @click=${() => this.elementClicked("LogSamples", "SampleLogin")} />
        <text x="100" y="300" @click=${() => this.elementClicked("LogSamples", "SampleLogin")}>NEW SAMPLES</text>

        <circle cx="230" cy="200" r="20" />
        <circle cx="370" cy="200" r="20" />
        <circle class="results" cx="300" cy="200" r="70" @click=${() => this.elementClicked("ReviewTesting", "FQ Testing")}/>
        <text x="300" y="200" class="text-orange" @click=${() => this.elementClicked("ReviewTesting", "FQ Testing")} >TESTING GROUP</text>

        <circle cx="430" cy="200" r="20" />
        <circle cx="570" cy="200" r="20" />
        <circle class="testing" cx="500" cy="200" r="70" @click=${() => this.elementClicked("ReviewTesting", "FQ Testing")} />
        <text x="500" y="200" class="text-orange" @click=${() => this.elementClicked("ReviewTesting", "FQ Testing")}>REVIEW</text>

        <circle cx="630" cy="200" r="20" />
        <circle cx="770" cy="200" r="20" />
        <circle class="testing" cx="700" cy="200" r="70" @click=${() => this.elementClicked("ReviewTestingGroup", "FQ Testing")}/>
        <text x="700" y="200" class="text-orange" @click=${() => this.elementClicked("ReviewTestingGroup", "FQ Testing")}>ENTER RESULTS</text>

        <circle cx="230" cy="400" r="20" />
        <circle cx="370" cy="400" r="20" />
        <circle class="results" cx="300" cy="400" r="70" @click=${() => this.elementClicked("SampleEnterResult", "MB Testing")}/>
        <text x="300" y="400" class="text-blue" @click=${() => this.elementClicked("SampleEnterResult", "MB Testing")}>TESTING GROUP</text>

        <circle cx="430" cy="400" r="20" />
        <circle cx="570" cy="400" r="20" />
        <circle class="testing" cx="500" cy="400" r="70" @click=${() => this.elementClicked("ReviewTesting", "MB Testing")} />
        <text x="500" y="400" class="text-blue" @click=${() => this.elementClicked("ReviewTesting", "MB Testing")}>REVIEW</text>

        <circle cx="630" cy="400" r="20" />
        <circle cx="770" cy="400" r="20" />
        <circle class="testing" cx="700" cy="400" r="70" @click=${() => this.elementClicked("ReviewTestingGroup", "MB Testing")} />
        <text x="700" y="400" class="text-blue" @click=${() => this.elementClicked("ReviewTestingGroup", "MB Testing")}>ENTER RESULTS</text>

        <circle cx="830" cy="300" r="20" />
        <circle cx="970" cy="300" r="20" />
        <circle class="sample" cx="900" cy="300" r="70" @click=${() => this.elementClicked("ReviewSample", "")} />
        <text x="900" y="300" @click=${() => this.elementClicked("ReviewSample", "")}>REVIEW SAMPLE</text>
      </svg>
      <!-- <div class="maindiv">
        <div
          @click=${() => this.elementClicked("LogSamples", "SampleLogin")}
          class="start-end"
          style="top: 37px; left: 10px;"
        >
          <span>New <br />Samples</span>
        </div>

        <div class="block-background" style="left:0px;">
          <div
            @click=${() =>
          this.elementClicked("SampleEnterResult", "FQ Testing")}
            class="node"
            style="top:-6px; padding: 15px 20px;"
          >
            <span>Enter <br />Results</span>
          </div>
          <div
            @click=${() => this.elementClicked("ReviewTesting", "FQ Testing")}
            class="node"
            style="left: 10px; top:-6px; padding: 15px 20px;"
          >
            <span>Review <br />Tests</span>
          </div>
          <div
            @click=${() =>
        this.elementClicked("ReviewTestingGroup", "FQ Testing")}
            class="node"
            style="left: 10px; top:-6px;padding: 15px 20px;"
          >
            <span>Review<br />Testing Group</span>
          </div>
        </div>
        <div class="block-background" style="top: -8px; left:140px;">
          <div
            @click=${() =>
        this.elementClicked("SampleEnterResult", "MB Testing")}
            class="node"
            style="top:-6px; padding: 15px 20px;"
          >
            <span>Enter <br />Results</span>
          </div>
          <div
          @click=${() => this.elementClicked("SampleEnterResult", "MB Testing")}
            class="node"
            style="left: 10px; top:-5px; padding: 15px 20px;"
          >
            <span>Review <br />Tests</span>
          </div>
          <div
            @click=${() =>
        this.elementClicked("ReviewTestingGroup", "MB Testing")}
            class="node"
            style="left: 10px; top:-5px; padding: 15px 20px;"
          >
            <span>Review<br />Testing Group</span>
          </div>
        </div>

        <div
          @click=${() => this.elementClicked("ReviewSample", "")}
          class="start-end"
          style="top: -61px; left: 125px; padding: 30px 40px;"
        >
          <span>Review<br />Sample</span>
        </div>
      </div> -->
    `;
  }
}
window.customElements.define("home-water", HomeWater);

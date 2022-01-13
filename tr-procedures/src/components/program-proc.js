import { html, css, nothing } from 'lit';
import { CredDialog } from '@trazit/cred-dialog';
import { Layouts, Alignment } from '@collaborne/lit-flexbox-literals';
import { columnBodyRenderer } from 'lit-vaadin-helpers';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@trazit/tr-dialog/tr-dialog';
import './tab-program';
import './core-view';
import './summary-view';
import './parameter-limits';
import './config-calendar';
import './sampling-points';
import './sampling-points-map';
import './corrective-actions';

let tabBtns = {
  "em-demo-a": [
    {
      tabLabel_en: "Summary", tabLabel_es: "Inicio", view: "summary"
    },
    {
      tabLabel_en: "Parameter Limits", tabLabel_es: "Límites", view: "parameter-limits"
    },
    {
      tabLabel_en: "Config Calendar", tabLabel_es: "Calendario Config", view: "config-calendar"
    },
    {
      tabLabel_en: "Sampling Points", tabLabel_es: "Puntos de Muestreo", view: "sampling-points"
    },
    {
      tabLabel_en: "Sampling Points Map", tabLabel_es: "Puntos de Muestreo Mapa", view: "sampling-points-map"
    },
    {
      tabLabel_en: "Corrective Actions", tabLabel_es: "Acciones Correctivas", view: "corrective-actions"
    }
  ]
}

export class ProgramProc extends CredDialog {
  static get styles() {
    return [
      Layouts, Alignment,
      super.styles,
      css`
        :host {
          display: block;
        }
        .tabContainer {
          overflow: auto;
        }
        .tabContainer::-webkit-scrollbar {
          display: none;
        }
        .tabContainer > * {
          display: inline-block;
          flex-shrink: 0;
        }
        mwc-button {
          --mdc-typography-button-text-transform: none;
        }
        mwc-icon-button.slide[hidden] {
          visibility: hidden;
        }
      `
    ];
  }

  static get properties() {
    return {
      model: { type: Object },
      config: { type: Object },
      procName: { type: String },
      viewName: { type: String },
      filterName: { type: String },
      langConfig: { type: Object },
      actions: { type: Array },
      samplesReload: { type: Boolean },
      selectedSamples: { type: Array },
      selectedAction: { type: Object },
      prev: { type: Boolean },
      next: { type: Boolean },
      programList: { type: Array },
      tabView: { type: String }
    };
  }

  constructor() {
    super()
    this.prev = false
    this.next = false
  }

  updated(updates) {
    if (updates.has('model')) {
      this.resetView()
    }
  }

  resetView() {
    this.actions = this.model.actions
    this.selectedAction = this.model.actions[0]
    this.actionMethod(this.selectedAction)
  }

  render() {
    return html`
      <div class="layout vertical flex">
        <div class="layout flex">
          <div class="layout horizontal center">
            <mwc-icon-button class="slide" icon="navigate_before" @click=${this.prevTab} ?hidden=${!this.prev}>
            </mwc-icon-button>
            <div class="tabContainer layout horizontal flex center">
              <mwc-icon-button icon="refresh" @click=${this.getProgramList} ?disabled=${this.samplesReload}></mwc-icon-button>
              ${tabBtns[this.procName].map(t =>
                html`<tab-program .lang=${this.lang} .tab=${t} @tab-rendered=${this.isScroll} @tab-change=${this.tabChanged} ?disabled=${this.samplesReload}></tab-program>`
              )}
            </div>
            <mwc-icon-button class="slide" icon="navigate_next" @click=${this.nextTab} ?hidden=${!this.next}>
            </mwc-icon-button>
          </div>
        </div>
        <summary-view .lang=${this.lang} .programList=${this.programList} ?hidden=${this.tabView!="summary"}></summary-view>
        <parameter-limits .lang=${this.lang} .programList=${this.programList} ?hidden=${this.tabView!="parameter-limits"}></parameter-limits>
        <config-calendar .lang=${this.lang} .programList=${this.programList} ?hidden=${this.tabView!="config-calendar"}></config-calendar>
        <sampling-points .procName=${this.procName} .lang=${this.lang} .programList=${this.programList} .config=${this.config} ?hidden=${this.tabView!="sampling-points"}></sampling-points>
        <sampling-points-map .procName=${this.procName} .lang=${this.lang} .programList=${this.programList} .config=${this.config} ?hidden=${this.tabView!="sampling-points-map"}></sampling-points-map>
        <core-view .lang=${this.lang} .programList=${this.programList} ?hidden=${this.tabView!="core"}></core-view>
        <corrective-actions .procName=${this.procName} .lang=${this.lang} .programList=${this.programList} .config=${this.config} ?hidden=${this.tabView!="corrective-actions"}></corrective-actions>
        ${super.render()}
      </div>
    `
  }

  get tabContainer() {
    return this.shadowRoot.querySelector(".tabContainer")
  }

  tabChanged(e) {
    console.log(e.detail)
    if (e.detail.view) {
      this.tabView = e.detail.view
    } else {
      this.tabView = "core"
    }
  }

  prevTab() {
    this.tabContainer.scrollLeft = this.tabContainer.scrollLeft - 200
  }

  nextTab() {
    this.tabContainer.scrollLeft = this.tabContainer.scrollLeft + 200
  }

  isScroll() {
    if (this.tabContainer.offsetWidth < this.tabContainer.scrollWidth) {
      this.next = true
    } else {
      this.next = false
    }
  }

  firstUpdated() {
    super.firstUpdated()
    this.tabContainer.addEventListener('scroll', () => {
      if (this.tabContainer.scrollLeft == 0) {
        this.prev = false
      } else {
        this.prev = true
      }
      if (this.tabContainer.offsetWidth + this.tabContainer.scrollLeft == this.tabContainer.scrollWidth) {
        this.next = false
      } else {
        this.next = true
      }
    })
  }

  nextRequest() {
    super.nextRequest()
    this.reqParams = {
      procInstanceName: this.procName,
      ...this.reqParams
    }
    this[this.selectedAction.clientMethod]()
  }

  jsonParam() {
    let jsonParam = {}
    let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
    if (action.apiParams) {
      action.apiParams.forEach(p => {
        if (p.element) {
          jsonParam[p.query] = this[p.element].value // get value from field input
        } else if (p.defaultValue) {
          jsonParam[p.query] = p.defaultValue // get value from default value (i.e incubator)
        } else if (p.beItem) {
          jsonParam[p.query] = this.selectedSamples[0][p.beItem] // get value from selected item
        } else if (p.targetValue) {
          jsonParam[p.query] = this.targetValue[p.query] // get value from target element passed
        } else {
          jsonParam[p.query] = p.value
        }
      })
    }
    if (action.paramFilter) {
      jsonParam[action.paramFilter[this.filterName].query] = action.paramFilter[this.filterName].value
    }
    return jsonParam
  }

  async getProgramList() {
    this.samplesReload = true
    let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl
      + '?' + new URLSearchParams(this.reqParams)
    await this.fetchApi(params).then(j => {
      if (j && !j.is_error) {
        this.programList = j.programsList
        if (this.selectedAction.subAction) {
          this.actionMethod(this.selectedAction.subAction)
        }
      }
    })
  }

  getLots() {
    let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl
      + '?' + new URLSearchParams(this.reqParams)
    this.fetchApi(params).then(j => {
      this.samplesReload = false
    })
  }

  actionMethod(action, replace = true) {
    if (replace) {
      this.selectedAction = action
    }
    this.credsChecker(action.actionName, null, this.jsonParam())
  }
}
window.customElements.define('program-proc', ProgramProc);
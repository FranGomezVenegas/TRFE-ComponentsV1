import { LitElement, html, css, nothing } from 'lit';
import { DataViews } from '../Views/DataViews';
class TableRowDetail extends DataViews(LitElement) {
  static get styles() {
    return css`
      .detail-row {
        display: none;
      }
      :host([opened]) .detail-row {
        display: table-row;
      }
    `;
  }

  static get properties() {
    return {
      opened: { type: Boolean, reflect: true },
      idx:  { type: Number},
      lang: { type: String},
      elem: { type: Object},
      data: { type: Object},
    };
  }

  constructor() {
    super();
    this.opened = false;
    this.idx=-1;
    this.elem={}
    this.data={}
  }

  toggle() {
    this.opened = !this.opened;
  }

  render() {
    return html`
      <tr class="detail-row">
        <td colspan="100%">            
                <div slot="details">
                    <slot name="details"></slot>
                    ${this.print2LevelsObject(this.elem, this.data)}
                </div>            
        </td>
      </tr>
    `;
  }


print2LevelsObject(elem, data){    
    //console.log(elem.elements)
    if (elem.expandInfoSectionDetail===undefined){return html``}
    return html`    
    ${elem.type==="reportTitle" ? this.kpiReportTitle(elem, data) : nothing}
    <div style="display: flex; flex-wrap: wrap; padding-left:30px; gap: 10px">        
      ${elem.expandInfoSectionDetail.elements.map((elem2, i) => {
        return html`
          ${elem2.is_translation===undefined||(elem2.is_translation!==undefined&&elem2.is_translation===true&&elem2.lang!==undefined&&elem2.lang===this.lang) ?
          html`              
            ${elem2.type==="reportTitle" ? this.kpiReportTitleLvl2(elem2, data[elem.endPointResponseObject], true) : nothing}
            ${elem2.type==="card" ? this.kpiCard(elem2, data[elem2.endPointResponseObject], true) : nothing}
            ${elem2.type==="cardSomeElementsSingleObject" ? this.kpiCardSomeElementsSingleObject(elem2, data, true) : nothing}
            ${elem2.type==="cardSomeElementsRepititiveObjects" ? this.cardSomeElementsRepititiveObjects(elem2, data, true) : nothing}              
            ${elem2.type==="cardExpandSectionForScriptStep" ? this.cardExpandSectionForScriptStep(elem2, data, this.moduleName) : nothing}                    
            ${elem2.type==="recovery_rate" ? this.kpiRecoveryRate(elem2, true) : nothing}
            ${elem2.type==="grid" ? this.kpiGrid(elem2, data[elem2.endPointResponseObject], true) : nothing}
            ${elem2.type==="chart" ? this.kpiChartFran(elem2, true) : nothing}   

            ${elem2.type==="jsonViewer" ? this.jsonViewer(elem2, data, true): nothing}
            ${elem2.type==="readOnlyTable" ? this.readOnlyTable(elem2, data, true): nothing}
            ${elem2.type==="parentReadOnlyTable" ? this.parentReadOnlyTable(elem2, data, true, undefined, undefined,): nothing}
            ${elem2.type==="readOnlyTableByGroup" ? this.readOnlyTableByGroup(elem2, data, true): nothing}
            ${elem2.type==="readOnlyTableByGroupAllInOne" ? this.readOnlyTableByGroupAllInOne(elem2, data, true): nothing}

            ${elem2.type==="rolesAndActions"&&elem2.endPointResponseObject2!==undefined&&data[elem2.endPointResponseObject]!==undefined ? 
              this.rolesAndActions(elem2, data[elem2.endPointResponseObject][elem2.endPointResponseObject2], true, this.lang) : nothing}
            ${elem2.type==="rolesAndActions"&&elem2.endPointResponseObject2===undefined ? 
              this.rolesAndActions(elem2, data[elem2.endPointResponseObject], true, this.lang) : nothing}   

            ${elem2.type==="coa" ? this.coa(elem, data[elem.endPointResponseObject], true): nothing}
              
              
            ${(elem2.includeChild===undefined||elem2.includeChild===false) ? nothing :
              html`
                  ${this.kpiCardSomeElementsChild(elem2, data, true)}
            `}              
            ${elem2.type==="Report" ? this.ReportController(elem2, true) : nothing}
            ${elem2.type==="testScripts" ? this.scripts(elem2, true) : nothing}
            ${elem2.type==="spectestScripts" ? this.specScripts(elem, true) : nothing}
            ${elem2.type==="buttonsOnly" ? this.buttonsOnly(elem2, data[elem.endPointResponseObject]) : nothing}
            ${elem2.type==="tree" ? this.treeElement(elem2, data)   : nothing}

          `:nothing}
        `
      })} 
    </div>
    `
}

}customElements.define('table-row-detail', TableRowDetail);

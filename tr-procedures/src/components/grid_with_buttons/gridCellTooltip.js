import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { FeaturesDynamicFieldValue } from '../../features/dynamicFieldValue';
import { FeaturesObjectsAndArrays } from '../../features/objectsAndArrays';
class GridCellTooltip extends FeaturesObjectsAndArrays(FeaturesDynamicFieldValue(LitElement)) {
  static get styles() {
    return css`
      .tooltip {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        border: 1px solid #d3d3d3;
        border-radius: 4px;
        padding: 10px;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s;
        max-width: 200px;
        word-wrap: break-word;
      }
      :host(:hover) .tooltip {
        display: block;
        opacity: 1;
      }
      .tooltip img {
        max-width: 100%;
        height: auto;
      }
      @media screen and (max-width: 600px) {
        .tooltip {
          /* Ajustes específicos para pantallas pequeñas, si son necesarios */
        }
      }
    `;
  }

    static get properties() {
        return {
            element: {type: Object},
            data: {type: Object},
        };
    }

    constructor() {
        super();
        this.element = {};
        this.data = {};
    }

    render() {        
        if (this.element===undefined||this.element.tooltip===undefined){return html``}
        //console.log(this.element.tooltip)
        let tooltipArr=this.varObjorArrAsArray(this.element.tooltip)
        return html`
        <slot></slot>
        <div class="tooltip">
            ${tooltipArr.map((curTip, index) => 
                html`
                    ${curTip.text ? html`${unsafeHTML(this.getDynamicData(curTip, this.data, this.lang))}`:''}
                    ${curTip.text_en&&this.lang==="en" ? html`${unsafeHTML(this.getDynamicData(curTip, this.data, this.lang))}`:''}
                    ${curTip.text_es&&this.lang==="es" ? html`${unsafeHTML(this.getDynamicData(curTip, this.data, this.lang))}`:''}
                    ${curTip.field? html`${this.data[curTip.field]}`:''}
                    ${curTip.imageSrc ? html`<img src="${this.imageSrc}" alt="Tooltip Image">` : ''}
            `
            )}
        </div>
        `;
    }
}

customElements.define('grid-cell-tooltip', GridCellTooltip);

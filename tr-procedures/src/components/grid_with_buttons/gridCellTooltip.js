import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

class GridCellTooltip extends LitElement {
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
    convertToArray(input) {
        
        if (typeof input === 'object' && !Array.isArray(input)) {
            return [input];
        }
        return input;
    }       
  zevaluateExpression(type, key, truePart, falsePart, comparisonValue) {
    try {
      const value = type === 'fld' ? this.data[key] : this.variable[key];

      // Handling comparison expressions
      if (comparisonValue !== undefined) {
        const match = value === comparisonValue.replace(/['"]/g, '');
        return match ? truePart : falsePart;
      }

      // Handling boolean values
      return value ? truePart : falsePart;
    } catch (e) {
      console.error("Error evaluating expression: ", e);
      return ''; // Return a default value or handle the error as needed
    }
  }

  zinterpolateString(curTip) {
    let templateString = curTip["text"]
    if (curTip["text_" + this.lang] !== undefined) {
      templateString = curTip["text_" + this.lang];
    } 
    console.log(templateString);

    const regex = /\{(fld|variable)\?(\w+)(?:\s*==\s*(['"]?.+['"]?))?\s*\?\s*(['"]?[^:'"]+['"]?)\s*:\s*(['"]?[^}]+['"]?)\}|{(fld|variable):(\w+)\}/g;
    return templateString.replace(regex, (match, type, key, comparisonValue, truePart, falsePart, simpleType, simpleKey) => {
      if (type && key) {
        // Handle conditional expression
        return this.evaluateExpression(type, key, truePart, falsePart, comparisonValue);
      } else if (simpleType) {
        // Handle simple replacement
        return simpleType === 'fld' ? this.data[simpleKey] ?? match : this.variable[simpleKey] ?? match;
      }
      return match;
    });
  }    
  evaluateExpression(type, key, truePart, falsePart, comparisonValue, switchCases) {
    try {
      const value = type === 'fld' ? this.data[key] : this.variable[key];
  
      // Handling switch-like expressions
      if (switchCases) {
        const cases = switchCases.split(/\s*:\s*/);
        for (let i = 0; i < cases.length; i += 1) {
            //const caseValue = cases[i]?.trim().replace(/['"]/g, '');
            //const caseResult = cases[i + 1]?.trim();          
            const parts = cases[i].split('?');
            const caseValue = parts[0];
            const caseResult = parts[1];
            if (caseValue === value){// || (i === cases.length - 1 && caseResult !== null)) {
                return caseResult;
            }
        }
        return cases[cases.length-1]; // Default case if no match
      }
  
      // Handling comparison expressions
      if (comparisonValue !== undefined) {
        const match = value === comparisonValue.replace(/['"]/g, '');
        return match ? truePart : falsePart;
      }
  
      // Handling boolean values
      return value ? truePart : falsePart;
    } catch (e) {
      console.error("Error evaluating expression: ", e);
      return ''; // Return a default value or handle the error as needed
    }
  }
  
  interpolateString(curTip) {
    let templateString = curTip["text"]
    if (curTip["text_" + this.lang] !== undefined) {
      templateString = curTip["text_" + this.lang];
    } 
    console.log(templateString);
  
    const regex = /\{(fld|variable)\?(\w+)(?:(?:\s*==\s*(['"]?.+['"]?))?\s*\?\s*(['"]?[^:'"]+['"]?)\s*:\s*(['"]?[^}]+['"]?)|([^}]+))\}|{(fld|variable):(\w+)\}/g;
    return templateString.replace(regex, (match, type, key, comparisonValue, truePart, falsePart, switchCases, simpleType, simpleKey) => {
      if (type && key) {
        // Handle conditional expression
        return this.evaluateExpression(type, key, truePart, falsePart, comparisonValue, switchCases);
      } else if (simpleType) {
        // Handle simple replacement
        return simpleType === 'fld' ? this.data[simpleKey] ?? match : this.variable[simpleKey] ?? match;
      }
      return match;
    });
  }
  
    render() {        
        if (this.element===undefined||this.element.tooltip===undefined){return html``}
        console.log(this.element.tooltip)
        let tooltipArr=this.convertToArray(this.element.tooltip)
        return html`
        <slot></slot>
        <div class="tooltip">
            ${tooltipArr.map((curTip, index) => 
                html`
                    ${curTip.text ? html`${unsafeHTML(this.interpolateString(curTip))}`:''}
                    ${curTip.field? html`${this.data[curTip.field]}`:''}
                    ${curTip.imageSrc ? html`<img src="${this.imageSrc}" alt="Tooltip Image">` : ''}
            `
            )}
        </div>
        `;
    }
}

customElements.define('grid-cell-tooltip', GridCellTooltip);

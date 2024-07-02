import { LitElement, html, css, nothing } from 'lit';
import { flipCardStyles } from './flipcard.css.js';
import { navigator } from "lit-element-router";

class FlipCard extends navigator(LitElement) {
  static styles = css`
    ${flipCardStyles}
  `;

  static get properties() {
    return {
        config: {type: Object},
        flipCardAllowed: {type: Boolean},
        clickLinkAllowed: {type: Boolean},
        data: {type: Object},  

    }
  }
  constructor() {
      super()
      this.config={} 
      this.data={}
      this.flipCardAllowed=false
      this.clickLinkAllowed=false
  }  
  firstUpdated() {
    this.flipCardElement = this.shadowRoot.querySelector('.flip-card');
  }

  flipCard(event) {
    event.stopPropagation();
    this.flipCardElement.classList.toggle('flipped');
  }

  setConfigVariables(){
    if (this.config!==undefined&&this.config.flipCardAllowed!==undefined){this.flipCardAllowed=this.config.flipCardAllowed}
    if (this.config!==undefined&&this.config.clickLinkAllowed!==undefined){this.clickLinkAllowed=this.config.clickLinkAllowed}
  }
  render() {
    this.setConfigVariables()
    return html`
      <div class="flip-card-container">
      
        ${this.clickLinkAllowed===false? html`
          <div class="flip-card">`: html`
          <div class="flip-card" @click="${()=>{this._elementClicked()}}">
        `}
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div class="card-content">
                <div class="card-header">
                ${this.data.role===undefined?nothing: html`<p class="card-role">${this.data.role}</p>`}
                ${this.data.title===undefined?nothing: html`<p class="card-title">${this.data.title}</p>`}
                </div>
                ${this.flipCardAllowed===false? nothing: html`<button class="flip-button" @click="${this.flipCard}">Flip Card</button>`}
              </div>
            </div>
            <div class="flip-card-back">
              <div class="card-cover">
                <h4 class="card-heading">
                  <span class="card-heading-text">Skill Set</span>
                </h4>
              </div>
              <div class="card-details">
                <ul class="skills-list">
                  <li>Advanced JS and CSS</li>
                  <li>JS/CSS Preprocessors</li>
                  <li>JS Frameworks</li>
                  <li>Advanced Animations</li>
                  <li>Deployment Pipelines</li>
                  <li>Large Apps Architectures</li>
                  <li>Naming Conventions</li>
                </ul>
              </div>
              <button class="flip-button" @click="${this.flipCard}">Flip Card</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  _elementClicked(){
    alert('hola')
    let procName=this.data.procName 
    let vwName=this.data.vwName
    let fltrName=this.data.fltrName
    if (procName===undefined){
      procName=this.procName
    }
    console.log("elementClicked", procName, vwName, fltrName);
    this._selectedMenu(
      "/dashboard/procedures?procName=" +
        this.procName +
        "&viewName=" +
        vwName +
        "&filterName=" +
        fltrName
    );
  } 
  _selectedMenu = (route) => {
    this.shadowRoot
      .querySelectorAll("sp-action-menu")
      .forEach((s) => (s.open = false));
    this.navigate(route);
  } 
}
customElements.define('flip-card', FlipCard);
export { FlipCard };

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
        imageUrl: {type: String},
        imageHeight: {type: String},
        imageWidth: {type: String},
    }
  }
  
  constructor() {
    super();
    this.config = {}; 
    this.data = {
      role: "Hello World",
      title: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a"
    };
    this.flipCardAllowed = true;
    this.clickLinkAllowed = true;
    this.imageUrl = 'https://images.unsplash.com/photo-1720475376136-bf9bf6c0c782?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    this.imageHeight = '50px'; // Default values
    this.imageWidth = '100%';  // Default values
  }

  firstUpdated() {
    this.flipCardElement = this.shadowRoot.querySelector('.flip-card');
  }

  flipCard(event) {
    event.stopPropagation();
    this.flipCardElement.classList.toggle('flipped');
  }

  setConfigVariables() {
    if (this.config && this.config.flipCardAllowed !== undefined) {
      this.flipCardAllowed = this.config.flipCardAllowed;
    }
    if (this.config && this.config.clickLinkAllowed !== undefined) {
      this.clickLinkAllowed = this.config.clickLinkAllowed;
    }
    if (this.config && this.config.imageUrl !== undefined) {
      this.imageUrl = this.config.imageUrl;
    }
    if (this.config && this.config.imageHeight !== undefined) {
      this.imageHeight = this.config.imageHeight;
    }
    if (this.config && this.config.imageWidth !== undefined) {
      this.imageWidth = this.config.imageWidth;
    }
  }

  render() {
    this.setConfigVariables();
    return html`
      <div class="flip-card-container">  
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div class="card-content">
                <div class="card-header">
                  ${this.data.role === undefined ? nothing : html`<p class="card-role">${this.data.role}</p>`}
                  ${this.data.title === undefined ? nothing : html`<p class="card-title">${this.data.title}</p>`}
                </div>
                ${this.imageUrl ? html`<img src="${this.imageUrl}" alt="Dynamic Image" style="height:${this.imageHeight}; width:${this.imageWidth};" />` : nothing}
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
            </div>
          </div>
        </div>
        ${this.flipCardAllowed ? html`<button class="flip-button" @click="${this.flipCard}">Flip Card</button>` : nothing}
      </div>
    `;
  }
  
  _elementClicked(){
    alert('hola');
    let procName = this.data.procName;
    let vwName = this.data.vwName;
    let fltrName = this.data.fltrName;
    if (procName === undefined){
      procName = this.procName;
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

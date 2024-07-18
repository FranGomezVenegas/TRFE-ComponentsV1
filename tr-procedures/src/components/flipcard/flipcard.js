import { LitElement, html, css, nothing } from 'lit';
import { flipCardStyles } from './flipcard.css.js';
import { navigator } from "lit-element-router";

class FlipCard extends navigator(LitElement) {
  static styles = css`
    ${flipCardStyles}
  `;

  static get properties() {
    return {
      config: { type: Object },
      data: { type: Array },
      lang: { type: String },
      defaultImageUrl: { type: String },
      defaultImageHeight: { type: String },
      defaultImageWidth: { type: String },
    }
  }

  constructor() {
    super();
    this.config = {};
    this.data = [];
    this.defaultImageUrl = 'https://images.unsplash.com/photo-1720475376136-bf9bf6c0c782?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    this.defaultImageHeight = '50px'; // Default values
    this.defaultImageWidth = '100%';  // Default values
  }

  setConfigVariables() {
    const maxCardsPerRow = this.data.length;
    let cardsPerRow = 3; // Default value

    if (this.config && this.config.cardsPerRow !== undefined) {
      cardsPerRow = Math.min(this.config.cardsPerRow, maxCardsPerRow);
    }

    this.style.setProperty('--cards-per-row', cardsPerRow);

    // Setting width and height from config
    if (this.config && this.config.width !== undefined) {
      this.style.setProperty('--flip-card-width', this.config.width);
    }
    if (this.config && this.config.height !== undefined) {
      this.style.setProperty('--flip-card-height', this.config.height);
    }
    if (this.lang === undefined) { this.lang = 'en'; }
  }

  getClassForTextType(type) {
    switch (type) {
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-critical';
      default:
        return 'text-normal';
    }
  }

  render() {
    this.setConfigVariables();
    return html`
      <div class="flip-card-container">
        ${this.data.map((item) => html`
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                ${item.contentOnFront === undefined || item.contentOnFront.cardTitle === undefined ? html`` : html`
                  <div class="card-cover">
                    <h4 class="card-heading">
                      <span class="card-heading-text">${item.contentOnFront === undefined || item.contentOnFront.cardTitle === undefined ? html`` : html`${item.contentOnFront.cardTitle["label_" + this.lang]}`}</span>
                    </h4>
                  </div>
                `}
                <div class="card-content">
                  <div class="card-header">
                    ${item.contentOnFront !== undefined && item.contentOnFront.imageUrl ? html`<img src="${item.imageUrl}" alt="Dynamic Image" style="height:${item.imageHeight || this.defaultImageHeight}; width:${item.imageWidth || this.defaultImageWidth};" />` : nothing}
                  </div>
                  ${item.contentOnFront === undefined || item.contentOnFront.textTop === undefined ? nothing : html`
                    <p class="card-role ${this.getClassForTextType(item.contentOnFront.textTop.type)}">${item.contentOnFront.textTop["label_" + this.lang]}</p>
                  `}
                  ${item.contentOnFront === undefined || item.contentOnFront.textLow === undefined ? nothing : html`
                    <p class="card-title ${this.getClassForTextType(item.contentOnFront.textLow.type)}">${item.contentOnFront.textLow["label_" + this.lang]}</p>
                  `}
                </div>
                <div class="button-container">
                  ${item.clickLinkAllowed ? html`<button class="flip-button" @click="${() => this._elementClicked(item)}">Window</button>` : nothing}
                  ${item.flipCardAllowed ? html`<button class="flip-button" @click="${this.flipCard}">Flip Card</button>` : nothing}
                </div>
              </div>
              <div class="flip-card-back">
                ${item.contentOnBack === undefined || item.contentOnBack.cardTitle === undefined ? html`` : html`
                  <div class="card-cover">                
                    <h4 class="card-heading">
                      <span class="card-heading-text">${item.contentOnBack === undefined || item.contentOnBack.cardTitle === undefined ? html`` : html`${item.contentOnBack.cardTitle["label_" + this.lang]}`}</span>
                    </h4>
                  </div>
                `}
                <div class="card-details">
                  <ul class="skills-list">
                  ${item.contentOnBack === undefined || item.contentOnBack.detail === undefined ? nothing : 
                  html`
                    ${item.contentOnBack.detail["label_" + this.lang].map((curText, index) => html`
                      <li class="${this.getClassForTextType(item.contentOnBack.detail.types ? item.contentOnBack.detail.types[index] : 'normal')}">${curText}</li>
                    `)}
                  `}
                  </ul>
                </div>
                <div class="button-container">
                  ${item.clickLinkAllowed ? html`<button class="flip-button" @click="${() => this._elementClicked(item)}">Window</button>` : nothing}
                  ${item.flipCardAllowed ? html`<button class="flip-button" @click="${this.flipCard}">Flip Card</button>` : nothing}
                </div>
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  flipCard(event) {
    event.stopPropagation();
    const flipCardElement = event.currentTarget.closest('.flip-card');
    flipCardElement.classList.toggle('flipped');
  }

  _elementClicked(item) {
    if (item.procInstanceName === undefined || item.viewName === undefined) {
      alert('Procedure and view are mandatory to open one view from this card');
      return;
    }
    let procName = item.procInstanceName;
    let vwName = item.viewName;
    let fltrName = item.filterName;
    if (procName === undefined) {
      procName = this.procName;
    }
    console.log("elementClicked", procName, vwName, fltrName);
    this._selectedMenu(
      "/dashboard/procedures?procName=" + procName + "&viewName=" + vwName + "&filterName=" + fltrName
    );
  }

  _selectedMenu(route) {
    this.shadowRoot
      .querySelectorAll("sp-action-menu")
      .forEach((s) => (s.open = false));
    this.navigate(route);
  }
}

customElements.define('flip-card', FlipCard);
export { FlipCard };
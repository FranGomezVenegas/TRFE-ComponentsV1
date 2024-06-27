import { LitElement, html, css } from 'lit';
import { flipCardStyles } from './flipcard.css.js';

class FlipCard extends LitElement {
  static styles = css`
    ${flipCardStyles}
  `;

  firstUpdated() {
    this.flipCardElement = this.shadowRoot.querySelector('.flip-card');
  }

  flipCard(event) {
    event.stopPropagation(); // Prevents the card click event from triggering twice
    this.flipCardElement.classList.toggle('flipped');
  }

  render() {
    return html`
      <div class="flip-card-container">
        <div class="flip-card" @click="${()=>{window.open('https://example.com', '_blank')}}">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div class="card-content">
                <div class="card-header">
                  <p class="card-role">Web Developer</p>
                  <p class="card-title">Hello World!</p>
                </div>
                <button class="flip-button" @click="${this.flipCard}">Flip Card</button>
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
}

customElements.define('flip-card', FlipCard);
export { FlipCard };

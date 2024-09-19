import { LitElement, html, css } from 'lit';
import '../src/tr-styling'
import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/outlined-icon-button.js';
import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/iconbutton/filled-tonal-icon-button.js';


class DemoExample extends LitElement {
  static get styles() {
    return css`
      div[hidden] {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      auth: { type: Boolean },
      notifs: { type: Array }
    };
  }

  constructor() {
    super();
  }
  firstUpdated() {
    setTimeout(() => {
      let trStylingElements = document.querySelectorAll('tr-styling');
      trStylingElements.forEach(el => {
        console.log(el.shadowRoot.adoptedStyleSheets);
      });
    }, 1000);

    fetch("/src/config.json").then(r => r.json()).then(j => {
      this.config = j;
    });
  }
  render() {
    return html`      
    <md-filled-icon-button  style="--md-filled-icon-button-icon-color: green;"><md-icon>logout</md-icon></md-filled-icon-button>

      Theme client1
      <tr-styling .config="${{ theme: 'client1' }}">
        <md-filled-icon-button class="button"><md-icon>logout</md-icon></md-filled-icon-button>
      </tr-styling>
      Theme trazit
      <tr-styling .config="${{ theme: 'trazit' }}">
        <md-filled-icon-button class="button"><md-icon>logout</md-icon></md-filled-icon-button>
      </tr-styling>
      Theme other
      <tr-styling .config="${{ theme: 'other' }}">
        <md-filled-icon-button class="button"><md-icon>logout</md-icon></md-filled-icon-button>
      </tr-styling>      

    `;
  }

  firstUpdated() {
    fetch("/src/config.json").then(r => r.json()).then(j => {
      this.config = j;
    });
  }



}

customElements.define('demo-example', DemoExample);

import { LitElement, html, css } from 'lit';
import '../src/PlatformNotif.js'

import { mockNotifications } from './fakeMockData.js'; // Import the mock data

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
    this.auth = true; // Set to true for testing purposes, assume user is authenticated
    this.notifs = mockNotifications; // Use the mock notifications
  }

  render() {
    return html`      
      <div ?hidden="${!this.auth}">
        <div style="padding-bottom:10px;">
        
          <button @click=${() => this.notif.hidden = !this.notif.hidden}>Notifications ${this.notifs.length?this.notifs.length:null}</button>          
        </div>
        <platform-notif .notifs=${this.notifs}></platform-notif>
      </div>
      
    `;
  }
  changeLang() {
    if (this.flag == "en") {
      this.lang = "en"
      this.flag = "es"
    } else {
      this.lang = "es"
      this.flag = "en"
    }
  }
  get notif() {
    return this.shadowRoot.querySelector("platform-notif");
  }

  firstUpdated() {
    fetch("/src/config.json").then(r => r.json()).then(j => {
      this.pLogin.config = j;
    });
  }


  setNotif(e) {
    console.log('setNotif', e.detail.message_en);
    this.toast.labelText = e.detail.message_en;
    this.toast.show();
    if (e.detail.log) {
      this.notifs = [
        ...this.notifs,
        e.detail
      ];
      this.requestUpdate();
    }
  }
}

customElements.define('demo-example', DemoExample);

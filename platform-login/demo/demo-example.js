import { LitElement, html } from 'lit-element';
import '../platform-login';

class DemoExample extends LitElement {
  render() {
    return html`
      <platform-login @authorized=${e=>this.auth=e.target.auth}></platform-login>
      </div>
      <div ?hidden="${!this.auth}">
        <h1>Hi, you are authorized</h1>
      </div>
    `;
  }

  /**
   * Lifecycle called after DOM updated on the first time
   * Pulling the app config and waiting for the sts state
   */
  firstUpdated() {
    super.firstUpdated()
  }
}
customElements.define('demo-example', DemoExample);

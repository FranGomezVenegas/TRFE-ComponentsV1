import { LitElement, html, css } from 'lit';
import '@material/mwc-textfield';
import '../tr-dialog';

class DemoExample extends LitElement {
  static get styles() {
    return css`
    `
  }

  static get properties() {
    return {
    }
  }

  constructor() {
    super();
  }

  render() {
    return html`
    <button @click=${()=>this.dialog.show()}>Show Dialog</button>
    <tr-dialog name="userpwd" title="Please confirm your credentials (user & password)"
      .dialogContent=${this.dialogContent.bind(this)}
      @opening=${()=>console.log("opening")}
      @opened=${()=>console.log("opened")}
      @closing=${()=>console.log("closing")}
      @closed=${()=>console.log("closed")}>
    </tr-dialog>
    `;
  }

  get dialog() {
    return this.shadowRoot.querySelector("tr-dialog")
  }

  dialogContent() {
    return html`
      <mwc-textfield id="user" label="User" type="text"></mwc-textfield>
      <mwc-textfield id="pwd" label="Password" type="password" iconTrailing="visibility" 
        @click=${this.showPwd}
        @keypress=${e=>e.keyCode==13&&this.checkingUser()}></mwc-textfield>
    `
  }

  showPwd(e) {
    if (e.pointerId == -1) {
      e.target.type = e.target.type == "password" ? "text" : "password";
    }
  }

  checkingUser() {
    console.log("check")
  }
}
customElements.define('demo-example', DemoExample);

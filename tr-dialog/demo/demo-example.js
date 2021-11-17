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
    <button @click=${()=>this.dialog1.show()}>Dialog with full button</button>
    <button @click=${()=>this.dialog2.show()}>Dialog non close button</button>
    <button @click=${()=>this.dialog3.show()}>Dialog non buttons</button>

    <tr-dialog name="dialog1" title="Please confirm your credentials (user & password)"
      .dialogContent=${this.dialog1Content.bind(this)}
      @accept=${()=>console.log("accept")}
      @opening=${()=>console.log("opening")}
      @opened=${()=>console.log("opened")}
      @closing=${()=>console.log("closing")}
      @closed=${()=>console.log("closed")}>
    </tr-dialog>
    <tr-dialog name="dialog2" title="Dialog non close button" hideCancel=true
      .dialogContent=${this.dialog2Content.bind(this)}>
    </tr-dialog>
    <tr-dialog name="dialog3" title="Dialog non buttons" hideAccept=true hideCancel=true
      .dialogContent=${this.dialog3Content.bind(this)}>
    </tr-dialog>
    `;
  }

  get dialog1() {
    return this.shadowRoot.querySelector("tr-dialog[name=dialog1]")
  }

  get dialog2() {
    return this.shadowRoot.querySelector("tr-dialog[name=dialog2]")
  }

  get dialog3() {
    return this.shadowRoot.querySelector("tr-dialog[name=dialog3]")
  }

  dialog1Content() {
    return html`
      <mwc-textfield id="user" label="User" type="text"></mwc-textfield>
      <mwc-textfield id="pwd" label="Password" type="password" iconTrailing="visibility" @click=${this.showPwd}></mwc-textfield>
    `
  }

  dialog2Content() {
    return html`
      <mwc-textfield label="Label" type="text"></mwc-textfield>
    `
  }

  dialog3Content() {
    return html`
      <table>
        <tr><th>Column1</th><th>Column2</th><th>Column3</th></tr>
        <tr><td>Data</td><td>Data</td><td>Data</td></tr>
        <tr><td>Data</td><td>Data</td><td>Data</td></tr>
      </table>
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

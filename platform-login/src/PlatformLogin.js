import { html, css, LitElement } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@spectrum-web-components/button/sp-button';

export class PlatformLogin extends LitElement {
  static get styles() {
    return [
      Layouts,
      css`
      :host {
        display: block;
        width: 400px;
      }
      div.login-box {
        background-color: rgba(177, 242, 244, 25%);
        border-radius: 20px;
        box-shadow: 5px 5px #888888;
        padding: 10px;
      }
      img.appLoginLogoOnTop {
        height: 4.08vmax;
        width: 17.85vmax;
      }
      h2 {
        font-family: 'Oxygen', sans-serif;
        font-size: 35px;
        color: #1676f3;
      }
      div.input * {
        margin-bottom: 15px;
      }
      mwc-icon-button#video {
        color: #6495ed;
      }
      @media (max-width: 460px) {
        :host {
          display: block;
          width: 300px;
        }
      }
    `];
  }

  static get properties() {
    return {
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="login-box layout vertical flex center">
        <img class="appLoginLogoOnTop" src="/images/trazit-removebg.png" />
        <mwc-icon-button>
          <img src="/images/england.jpg" />
        </mwc-icon-button>
        <h2>Trace it !!!</h2>
        <div class="input layout vertical flex">
          <mwc-textfield label="User"></mwc-textfield>
          <mwc-textfield label="Password" type="password" iconTrailing="visibility"></mwc-textfield>
          <sp-button size="xl">Access</sp-button>
          <mwc-select label="Role">
            <mwc-list-item value="0">Role 0</mwc-list-item>
            <mwc-list-item value="1">Role 1</mwc-list-item>
            <mwc-list-item value="2">Role 2</mwc-list-item>
            <mwc-list-item value="3">Role 3</mwc-list-item>
          </mwc-select>
        </div>
        <mwc-icon-button id="video">
          <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z"></path></g></svg>
        </mwc-icon-button>
      </div>
    `;
  }
}

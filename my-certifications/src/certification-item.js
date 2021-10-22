import { LitElement, html, css } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon';
import '@material/mwc-icon-button';

export class CertificationItem extends LitElement {
  static get styles() {
    return [
      Layouts,
      css`
      :host {
        display: block;
        margin: 10px;
      }
      :host([hidden]) {
        display: none;
      }
      .card {
        background-color:  rgba(177, 242, 244); 
        border-radius: 5px;
        box-shadow: 1px 1px #888888;
        padding: 20px;
        width: 300px;
        height: 300px;
        line-height: 1.5;
      }
      @media (max-width: 460px) {
      }
    `];
  }

  static get properties() {
    return {
      cert: { type: Object },
      divHeight: { type: String }
    };
  }

  constructor() {
    super();
    this.cert = {};
    this.divHeight = "";
  }

  render() {
    return html`
      <div class="card layout vertical center">
        <mwc-icon-button icon="picture_as_pdf" @click=${()=>window.open(this.cert.file_link, '_blank').focus()} ?disabled=${!this.cert.file_link}></mwc-icon-button>
        <div><b>Procedure: </b>${this.cert.procedure_name}</div>
        <div><b>Name: </b>${this.cert.sop_name}</div>
        <div><b>Summary: </b>${this.cert.brief_summary}</div>
        <div><b>My Certification Status: </b>${this.cert.status}</div>
        <div><mwc-icon icon="${this.cert.status=="PASS"?'bookmark':'warning'}"></mwc-icon></div>
        <div>${this.cert.status=="NOT_PASS" ? 
          html`<mwc-icon-button icon="replay" @click=${()=>this.dispatchEvent(new CustomEvent('mark-complete', {
            detail: this.cert,
            bubbles: true,
            composed: true
          }))}></mwc-icon-button>` : null 
        }</div>
      </div>
    `;
  }
}
window.customElements.define('certification-item', CertificationItem);
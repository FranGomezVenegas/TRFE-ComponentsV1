import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@material/mwc-icon-button';

export class MyCertifications extends CommonCore {
  static get styles() {
    return [
      Layouts,
      css`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
      @media (max-width: 460px) {
      }
    `];
  }

  static get properties() {
    return {
      sops: { type: Array },
      analytics: { type: Array },
      certSet: { type: Array }
    };
  }

  constructor() {
    super();
    this.sops = [];
    this.analytics = [];
    this.certSet = [];
  }

  render() {
    return html`
    `;
  }

  authorized() {
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    this.sops = userSession.all_my_sops[0].my_sops
    this.analytics = userSession.all_my_analysis_methods[0].my_analysis_method_certifications
  }

  pass(type) {
    if (type == "sop") {
      this.certSet = this.sops.filter(s => s.status == "PASS")
    } else {
      this.certSet = this.analytics.filter(s => s.status == "PASS")
    }
    this.requestUpdate()
  }

  pending(type) {
    if (type == "sop") {
      this.certSet = this.sops.filter(s => s.status == "NOT_PASS")
    } else {
      this.certSet = this.analytics.filter(s => s.status == "NOT_PASS")
    }
    this.requestUpdate()
  }
}

import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import './certification-item';

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
      filterData: { type: String }, // sop, psop, analysis, panalysis
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

  updated(updates) {
    super.updated(updates)
    if (updates.has('filterData') && this.filterData) {
      this.populate()
    }
  }

  render() {
    return html`
      <div class="layout horizontal flex center-center wrap">
      ${this.certSet.map(c=>
        html`<certification-item .cert=${c} @mark-complete=${this.markComplete}></certification-item>`
      )}
      </div>
    `;
  }

  authorized() {
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    this.sops = userSession.all_my_sops.length ? userSession.all_my_sops[0].my_sops : this.sops
    this.analytics = userSession.all_my_analysis_methods.length ? userSession.all_my_analysis_methods[0].my_analysis_method_certifications : this.analytics
  }

  /**
   * Sort out the certs data
   * sop: all sops data
   * psop: pending sop data
   * analytic: all analytics data
   * panalytic: pending analytic
   */
  populate() {
    if (this.filterData == "sop") {
      this.certSet = this.sops
    } else if (this.filterData == "analytic") {
      this.certSet = this.analytics
    } else if (this.filterData == "psop") {
      this.certSet = this.sops.filter(s => s.status == "NOT_PASS")
    } else if (this.filterData == "panalytic") {
      this.certSet = this.analytics.filter(s => s.status == "NOT_PASS")
    }
    this.requestUpdate()
  }

  markComplete(e) {
    // non sop
    if (!e.detail.user_sop_id) return

    this.fetchApi(this.config.backendUrl + this.config.ApiSopUserUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      actionName: 'SOP_MARK_AS_COMPLETED',
      procInstanceName: e.detail.procedure_name,
      sopName: e.detail.sop_name,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken      
    })).then(j => {
      if (j) {
        this.frontEndSopUserAPI(e.detail)
      }
    })
  }

  frontEndSopUserAPI(cert) {
    this.fetchApi(this.config.backendUrl + this.config.frontEndSopUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      actionName: 'ALL_IN_ONE',
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken      
    }), false).then(j => {
      if (j) {
        this.getProcedureList(cert)
      }
    })
  }

  getProcedureList(cert) {
    this.fetchApi(this.config.backendUrl + this.config.frontEndSopUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken      
    }), false).then(j => {
      if (j) {
        let certs = JSON.stringify(this.certSet) // temp ref
        certs = JSON.parse(certs)
        this.certSet = []
        // updating userSession data
        let userSession = JSON.parse(sessionStorage.getItem("userSession"))
        if (cert.user_sop_id) { // sop
          this.sops.forEach((c,i) => {
            if (c.user_sop_id == cert.user_sop_id) {
              this.sops[i].status = "PASS"
            }
          })
          userSession.all_my_sops[0].my_sops = this.sops
        }
        certs.forEach((c,i) => {
          if (c.user_sop_id == cert.user_sop_id) {
            certs[i].status = "PASS"
          }
        })
        sessionStorage.setItem('userSession', JSON.stringify(userSession))
        this.certSet = certs
        this.requestUpdate()
      }
    })
  }
}

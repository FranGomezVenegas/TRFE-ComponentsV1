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
        html`<certification-item .lang=${this.lang} .cert=${c} @mark-complete=${this.markComplete}></certification-item>`
      )}
      </div>
    `;
  }

  authorized() {
    super.authorized()
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

  async markComplete(e) {
    // for something reason e.target will change to demo-example after call API, so keep the ref before call API
    let elm = e.target, res;
    // analytics cert
    if (e.detail.method_name) {
      res = await this.fetchApi(this.config.backendUrl + this.config.apiAnalysisUrl + '?' + new URLSearchParams({
        dbName: this.config.dbName,
        actionName: e.detail.certification_level.endpoint_name,
        procInstanceName: e.detail.procedure,
        methodName: e.detail.method_name,
        finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken      
      }))
    } else {
      res = await this.fetchApi(this.config.backendUrl + this.config.apiSopUserUrl + '?' + new URLSearchParams({
        dbName: this.config.dbName,
        actionName: e.detail.certification_level.endpoint_name,
        procInstanceName: e.detail.procedure,
        sopName: e.detail.sop_name,
        finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken      
      }))
    }
    // enable back the button once get error
    if (res) {
      if (res.is_error) {
        elm.shadowRoot.querySelector('mwc-icon-button[icon="replay"]').disabled = false
      } else {
        this.frontEndCertUserAPI(e.detail)
      }
    } else {
      elm.shadowRoot.querySelector('mwc-icon-button[title="replay"]').disabled = false
    }
  }

  frontEndCertUserAPI(cert) {
    let apiUrl = cert.method_name ? this.config.frontEndAnalysisUrl : this.config.frontEndSopUrl
    this.fetchApi(this.config.backendUrl + apiUrl + '?' + new URLSearchParams({
      dbName: this.config.dbName,
      actionName: cert.method_name ? 'ALL_MY_ANA_METHOD_CERTIF' : 'ALL_IN_ONE',
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken      
    }), false).then(j => {
      if (j && !j.is_error) {
        // updating userSession data
        let userSession = JSON.parse(sessionStorage.getItem("userSession"))
        if (cert.method_name) {
          userSession.all_my_analysis_methods = j
        } else {
          userSession.all_my_sops = j.all_my_sops
          userSession.my_pending_sops = j.my_pending_sops
          // adjust the new_definition only
          j.procedures_list.procedures.forEach(pl => {
            let uid = userSession.procedures_list.procedures.findIndex(l => l.name == pl.name)
            userSession.procedures_list.procedures[uid].new_definition = pl.new_definition
            userSession.procedures_sops = j.procedures_sops
            userSession.sop_tree_list_element = j.sop_tree_list_element
          })
        }
        sessionStorage.setItem('userSession', JSON.stringify(userSession))
        this.dispatchEvent(new CustomEvent('certs-updated'))
        this.sops = userSession.all_my_sops.length ? userSession.all_my_sops[0].my_sops : this.sops
        this.analytics = userSession.all_my_analysis_methods.length ? userSession.all_my_analysis_methods[0].my_analysis_method_certifications : this.analytics
        let certs = JSON.stringify(this.certSet) // temp ref
        certs = JSON.parse(certs)
        certs.forEach((c,i) => {
          if (cert.method_name) {
            if (c.id == cert.id) {
              certs[i].status = "PASS"
            }
          } else {
            if (c.user_sop_id == cert.user_sop_id) {
              certs[i].status = "PASS"
            }  
          }
        })
        this.certSet = certs
        this.requestUpdate()
      }
    })
  }
}

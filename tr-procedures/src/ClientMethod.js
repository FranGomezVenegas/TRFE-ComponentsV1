export function ClientMethod(base) {
  return class extends base {
    async samplesByStage() {
      this.samplesReload = true
      let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      await this.fetchApi(params, false, false).then(j => {
        if (j && !j.is_error) {
          this.setGrid(j)
        }
      })
      this.samplesReload = false
    }

    getSampleAudit() {
      let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params, false, false).then(j => {
        if (j && !j.is_error) {
          this.audit.audits = j
          this.audit.requestUpdate()
        }
        this[this.selectedAction.clientMethod]()
      })
    }
  
    setSamplingDate() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        this.dateDialog.close()
        this[this.selectedAction.clientMethod]()
      })
    }
  }
}
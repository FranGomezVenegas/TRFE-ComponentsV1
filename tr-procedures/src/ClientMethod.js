export function ClientMethod(base) {
  return class extends base {
    async samplesByStage() {
      this.samplesReload = true
      this.selectedSamples = []
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
      })
    }
  
    setSamplingDate() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        this.dateDialog.close()
        this.reload()
      })
    }

    moveToNext() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        this.reload()
      })
    }

    addSamplingComment() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        this.commentDialog.close()
        this.reload()
      })
    }

    removeSamplingComment() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        this.reload()
      })
    }
  }
}
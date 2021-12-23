export function ClientMethod(base) {
  return class extends base {
    async getSamples() {
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

    signAudit() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.reloadAudit()
      })
    }
  
    setSamplingDate() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.dateDialog.close()
        this.reload()
      })
    }

    moveToNext() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }

    addSamplingComment() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.commentDialog.close()
        this.reload()
      })
    }

    removeSamplingComment() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }

    getResult() {
      let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params, false, false).then(j => {
        if (j && !j.is_error) {
          this.selectedResults = []
          this.enterResults = j
          this.erGrid.items = j
          this.requestUpdate()
        }
      })
    }

    enterResult() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params, false, false).then(() => {
        this.reloadResult()
      })
    }
    
    setIncubator() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        this.newBatchDialog.close()
        this.assignDialog.close()
        this.reload()
      })
    }

    getAssign() {
      let params = this.config.backendUrl + this.config.frontEndEnvMonitIncubationUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.selectedAssigns = []
          this.assignList = j
          this.asGrid.items = j
          this.requestUpdate()
        }
      })
    }

    addRemoveBatch() {
      this.reqParams = {
        ...this.reqParams,
        batchName: this.selectedBatch.name
      }
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }
  }
}
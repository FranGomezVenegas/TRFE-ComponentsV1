export function ClientMethod(base) {
  return class extends base {
    async getSamples() {
      this.samplesReload = true
      this.selectedSamples = []
      let params = this.config.backendUrl + (this.selectedAction.endPoint ? this.selectedAction.endPoint : this.config.frontEndEnvMonitSampleUrl) 
        + '?' + new URLSearchParams(this.reqParams)
      await this.fetchApi(params, false, false).then(j => {
        if (j && !j.is_error) {
          this.setGrid(j)
        } else {
          this.setGrid()
        }
      })
      this.samplesReload = false
    }

    getSampleAudit() {
      let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params, false, false).then(j => {
        if (j && !j.is_error) {
          j.forEach(audit => {
            audit.collapse = true
            if (audit.sublevel && audit.sublevel.length) {
              audit.sublevel.forEach(level => {
                level.collapse = false
              })
            }
          })
          this.audit.audits = j
          this.audit.requestUpdate()
        }
      })
    }

    signAudit() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.reloadDialog()
      })
    }
    
    getInstrumentAudit() {
      console.log('this.selectedSamples', this.selectedSamples);
      this.reqParams.instrumentName=this.selectedSamples[0].name;
      let params = this.config.backendUrl + this.config.ApiInstrumentsAPIqueriesUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params, false, false).then(j => {
        if (j && !j.is_error) {
          j.forEach(audit => {
            audit.collapse = true
            if (audit.sublevel && audit.sublevel.length) {
              audit.sublevel.forEach(level => {
                level.collapse = false
              })
            }
          })
          this.audit.audits = j
          this.audit.requestUpdate()
        }
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
        } else {
          this.dispatchEvent(new CustomEvent("error", {
            detail: { 
              is_error: true,
              message_en: this.selectedAction.alertMsg.empty["label_en"],
              message_es: this.selectedAction.alertMsg.empty["label_es"]
            },
            bubbles: true,
            composed: true
          }))
          console.log(this.selectedAction.alertMsg.empty["label_en"])
        }
      })
    }

    enterResult() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params, false, false).then(() => {
        this.reloadDialog()
      })
    }

    getMicroorganism() {
      let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params, false, false).then(j => {
        if (j && !j.is_error) {
          this.mAddHoc.value = ""
          this.selectedMicroorganisms = []
          this.microorganismList = j
          this.moGrid.items = j
          this.requestUpdate()
        }
      })
    }

    addSampleMicroorganism() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params, false, false).then(() => {
        this.selectedSamples[0].microorganism_count = this.selectedSamples[0].microorganism_count + 1
        let newList = this.selectedSamples[0].microorganism_list_array.filter(m => m.name != "")
        newList.push({ name: this.targetValue.microorganismName })
        this.selectedSamples[0].microorganism_list_array = newList
        this.reloadDialog()
      })
    }

    getMicroorganismItem() {
      this.reqParams.whereFieldsValue = this.selectedSamples[0].sample_id +"*Integer"
      let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params, false, false).then(j => {
        if (j && !j.is_error) {
          this.selectedMicroorganisms = []
          this.microorganismList = j[0].microorganism_list_array
          this.moGrid.items = j[0].microorganism_list_array
          this.requestUpdate()
        }
      })
    }

    removeSampleMicroorganism() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params, false, false).then(() => {
        this.selectedSamples[0].microorganism_count = this.selectedSamples[0].microorganism_count - 1
        let newList = this.selectedSamples[0].microorganism_list_array.filter(m => m.name != "" && m.name != this.targetValue.microorganismName)
        this.selectedSamples[0].microorganism_list_array = newList
        this.reloadDialog()
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
      if (this.selectedAction.actionName == "EM_BATCH_INCUB_ADD_SMP" && !this.batchName) {
        this.dispatchEvent(new CustomEvent("error", {
          detail: {
            is_error: true,
            message_en: "Please select the batch should be added",
            message_es: "Seleccione el lote que debe agregarse"
          },
          bubbles: true,
          composed: true
        }))
        console.log("Please select the batch should be added")
        return
      }
      this.reqParams = {
        ...this.reqParams,
        batchName: this.batchName
      }
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }

    async getProgramList() {
      this.samplesReload = true
      let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl 
        + '?' + new URLSearchParams(this.reqParams)
      await this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          if (this.selectedAction.subAction) {
            this.actionMethod(this.selectedAction.subAction)
            this.templates.dataApi = j.programsList[0]
          }
        }
      })
    }

    getLots() {
      let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        this.samplesReload = false
        this.grid.items = this.templates.dataApi.sample_points
        this.langConfig.fieldText.lot.items = j
        this.requestUpdate()
      })
    }

    logSample() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.pointDialog.close()
      })
    }

    reviewTest() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.grid.activeItem=null
      })
    }

    setLot() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitProdLotUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.lotDialog.close()
        this.reload()
      })
    }

    setInstruments() {
      console.log('this.reqParams', this.reqParams);
      let params = this.config.backendUrl + this.config.ApiInstrumentsAPIactionsUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
//        this.newInstrumentDialog.close()
        this.reload()
      })
    }

    reviewSample() {
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }

    newInvestigation() {
      this.reqParams.fieldValue = "Investigation for "+ this.selectedSamples[0].result_id +"*String"
      this.reqParams.objectsToAdd = "sample_analysis_result*"+ this.selectedSamples[0].result_id
      let params = this.config.backendUrl + this.selectedAction.endPoint 
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }
  }
}
export function ClientMethod(base) {
  return class extends base {

    getMicroorganism() {
      let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl
        + '?' + new URLSearchParams(this.reqParams)
      params = params.replace(/\|/g, "%7C");        
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.microName = null
          this.microorganismList = j
          this.gridDialogItems = this.selectedItem.microorganism_list_array
          this.fromGrid = false
          this.requestUpdate()
        }
      })
    }

    addSampleMicroorganism() {
      this.sampleState = { action: JSON.stringify(this.actionBeingPerformedModel.actionName), sample: this.selectedItem.sample_id }
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl
        + '?' + new URLSearchParams(this.reqParams)
      params = params.replace(/\|/g, "%7C");
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }

    getMicroorganismItem() {
      this.reqParams.whereFieldsValue = this.selectedItem.sample_id + "*Integer"
      let params = this.config.backendUrl + this.config.frontEndEnvMonitSampleUrl
        + '?' + new URLSearchParams(this.reqParams)
      params = params.replace(/\|/g, "%7C");
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.microName = null
          this.microorganismList = j
          this.gridDialogItems = this.selectedItem.microorganism_list_array
          this.requestUpdate()
        }
      })
    }

    removeSampleMicroorganism() {
      this.sampleState = { action: JSON.stringify(this.selectedAction), sample: this.selectedItem.sample_id }
      let params = this.config.backendUrl + this.config.ApiEnvMonitSampleUrl
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        this.microGrid.selectedItems = []
        this.reload()
      })
    }

    getAssign() {
      let params = this.config.backendUrl + this.config.frontEndEnvMonitIncubationUrl
        + '?' + new URLSearchParams(this.reqParams)
      params = params.replace(/\|/g, "%7C");
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
      params = params.replace(/\|/g, "%7C");
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }

    getLots() {
      console.log('getLots')
      let params = this.config.backendUrl + this.config.frontEndEnvMonitUrl
        + '?' + new URLSearchParams(this.reqParams)
      params = params.replace(/\|/g, "%7C");
      this.fetchApi(params).then(j => {
        this.samplesReload = false
        this.langConfig.fieldText.lot.items = j
        this.ready = true
        this.requestUpdate()
      })
    }

    logSample() {
      let params = this.config.backendUrl + (this.actionObj.endPoint ? this.actionObj.endPoint : this.config.SampleAPIactionsUrl)
        + '?' + new URLSearchParams(this.reqParams)
      params = params.replace(/\|/g, "%7C");
      this.fetchApi(params).then(() => {
        this.pointDialog.close()
      })
    }

    xxxreloadSampleState() {
      this.selectedSamples = this.gridItems.filter(g => g.sample_id == this.sampleState.sample)
      this.selectedAction = JSON.parse(this.sampleState.action)
      this.reloadDialog()
      this.sampleState = null
    }

    openPDF(action , data){
      if (data===undefined){
        alert('no data received')
      }      
      let linkUrl=undefined
      if (data.report_url!==undefined){
        linkUrl=data.report_url
      }
      if (data.file_link!==undefined){
        linkUrl=data.file_link
      }
      if (linkUrl===undefined){
        alert('this record has no property called report_url or file_link instead')
        return
      }
      window.open(linkUrl, '_blank').focus()
    }
 
    inventoryLotPrintLabel(action, selectedItem ) {
      console.log('inventoryLotPrintLabel this.reqParams', this.reqParams);
      if (selectedItem === undefined || selectedItem.lot_name === undefined) {
        alert("item not selected")
        return
      } 

      let extraParams=this.jsonParam(action,  selectedItem)   
      let APIParams=this.getAPICommonParams(action)
      let endPointUrl=this.getActionAPIUrl(action)
      if (String(endPointUrl).toUpperCase().includes("ERROR")){
          alert(endPointUrl)
          return
      }
      let params = this.config.backendUrl + endPointUrl
        + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(extraParams)
       // + '&'+ new URLSearchParams(credDialogArgs)
      console.log('inventoryLotPrintLabel', 'action', action, ' selectedItem',  selectedItem, 'extraParams', extraParams)


      //this.reqParams.actionName = "LOT_PRINT_LABEL";     
      // let params = this.config.backendUrl + this.config.ApiInstrumentsAPIactionsUrl
      //   + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {          
          console.log(j.zpl_code)
          //this.setPrintContent()          
          let printWindow = window.open('', '', 'fullscreen=yes');
          printWindow.document.write(j.zpl_code);
//          printWindow.document.title = this.printObj.header;
          printWindow.document.close();
          setTimeout(function () {
            printWindow.print();
            
            printWindow.close();
          }, 500);  
        } else {            
          alert('is_error')
        }
      })     
      return 
      this.fetchApi(params).then(() => {(j => {
        console.log('j', j)
        if (j && j.is_error===undefined) {
          console.log(j.zpl_code)
          this.setPrintContent()
          let printWindow = window.open('', '', 'fullscreen=yes');
          printWindow.document.write(j.zpl_code);
//          printWindow.document.title = this.printObj.header;
          printWindow.document.close();
          setTimeout(function () {
            printWindow.print();
            printWindow.close();
          }, 500);          
        } else {
          alert(j.is_error)
        }
        }
        //this.reload()
      )})
    }     

}
}
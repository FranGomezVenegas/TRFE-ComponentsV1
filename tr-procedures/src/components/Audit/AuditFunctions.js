import { ApiFunctions } from '../Api/ApiFunctions';

export function AuditFunctions(base) {
    return class extends ApiFunctions(base) {
        getObjectAuditInfo(dataElement = this.selectedItems[0]) {
            let extraParams=this.jsonParam(this.actionBeingPerformedModel, dataElement, {})   
            let serviceAPIurl=this.getServiceAPIUrl(action)
            let APIParams=this.getAPICommonParams(this.actionBeingPerformedModel)
            let endPointUrl=this.getActionAPIUrl(this.actionBeingPerformedModel)
            if (String(endPointUrl).toUpperCase().includes("ERROR")){
                alert(endPointUrl)
                return
            }
            let params = serviceAPIurl + (this.actionBeingPerformedModel.endPoint ? this.actionBeingPerformedModel.endPoint : this.config.SampleAPIqueriesUrl)
              + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(extraParams)
            params = params.replace(/\|/g, "%7C");
            this.fetchApi(params).then(j => {
              if (j && !j.is_error) {
                let auditRecords=[]
                if (j.audit_info!==undefined){
                  auditRecords = j.audit_info
                  this.audit.highlightFields = j.highlight_fields
                }else{
                  this.audit.highlightFields =[]
                  auditRecords = j
                }
                if (Array.isArray(auditRecords)){
                  auditRecords.forEach(audit => {
                    audit.collapse = true
                    if (audit.sublevel && audit.sublevel.length) {
                      audit.sublevel.forEach(level => {
                        level.collapse = false
                      })
                    }
                  })                
                  this.audit.audits = auditRecords
                  this.audit.requestUpdate()
               // this.audit.auditDialog.show()
              }
              }
            })
          }
        signAudit() {
          let serviceAPIurl=this.getServiceAPIUrl(this.selectedDialogAction.endPoint)  
        let params = serviceAPIurl + (this.selectedDialogAction.endPoint ? this.selectedDialogAction.endPoint : this.config.ApiEnvMonitSampleUrl)
            + '?' + new URLSearchParams(this.reqParams)
            params = params.replace(/\|/g, "%7C");
            this.fetchApi(params).then(() => {
            this.reloadDialog()
        })
        }
    }
}
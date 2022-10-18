import { html, css, nothing} from 'lit';

export function AuditFunctions(base) {
    return class extends (base) {
        getObjectAuditInfo() {
            var extraParams=this.jsonParam(this.actionBeingPerformedModel, this.selectedItems[0], {})   
            let APIParams=this.getAPICommon(this.actionBeingPerformedModel)
            let endPointUrl=this.getActionAPIUrl(this.actionBeingPerformedModel)
            if (String(endPointUrl).toUpperCase().includes("ERROR")){
                alert(endPointUrl)
                return
            }
            let params = this.config.backendUrl + (this.actionBeingPerformedModel.endPoint ? this.actionBeingPerformedModel.endPoint : this.config.SampleAPIqueriesUrl)
              + '?' + new URLSearchParams(APIParams) + '&'+ new URLSearchParams(extraParams)
            this.fetchApi(params).then(j => {
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
               // this.audit.auditDialog.show()
              }
            })
          }
        signAudit() {
        let params = this.config.backendUrl + (this.selectedDialogAction.endPoint ? this.selectedDialogAction.endPoint : this.config.ApiEnvMonitSampleUrl)
            + '?' + new URLSearchParams(this.reqParams)
        this.fetchApi(params).then(() => {
            this.reloadDialog()
        })
        }
    }
}
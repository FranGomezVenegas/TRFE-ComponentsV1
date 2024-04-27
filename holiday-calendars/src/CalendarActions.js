export function CalendarActions(base) {
    return class extends base {

          buttonActionWithoutDialogNoCredChecker(action, selectedItem) {
            this.selectedAction=action
            console.log('buttonActionWithoutDialogNoCredChecker')

            let extraParams=this.jsonParam(action, selectedItem)   
            extraParams.actionName=action.actionName
            extraParams.dbName= this.config.dbName
            extraParams.procName = "app"
            extraParams.finalToken= JSON.parse(sessionStorage.getItem("userSession")).finalToken
            let params = this.config.backendUrl + (action.endPoint ? action.endPoint : this.config.frontEndEnvMonitSampleUrl)
            params=params+'?' + new URLSearchParams(this.reqParams) 
            if (extraParams!==undefined){
              params=params + '&' + new URLSearchParams(extraParams)
            }
            params = params.replace(/\|/g, "%7C");
            this.fetchApi(params).then(() => {
                this.getHolidayCalendars()
            })
          }
          buttonActionWithoutDialog(action, selectedItem) {
            this.selectedAction=action
            //console.log('genomaSuperDialogClickedAction')
            if (this.itemId) {
              this.credsChecker(action.actionName, this.itemId, this.jsonParam(this.selectedAction, selectedItem), action)
            } else {
              this.credsChecker(action.actionName, selectedItem, this.jsonParam(this.selectedAction, selectedItem), action)
            }
            return
          }
          checkMandatoryFieldsNotEmpty(){                
            let dlgFlds=Object.values(this.selectedAction.dialogInfo.fields)
            for (let i=0;i<dlgFlds.length;i++){            
                let fldObj=dlgFlds[i]
                let keyName=Object.keys(this.selectedAction.dialogInfo.fields)
                console.log('checkMandatoryFieldsNotEmpty', fldObj, keyName[i])

                let fldDef=dlgFlds[i]
                if ((fldDef.optional===undefined||
                    fldDef.optional===false)&&this[keyName[i]].value.length==0){
                    alert('Field '+fldDef["label_"+this.lang]+' is mandatory')
                    return false
                }
            }
            return true
          }          
          genomaSuperDialogClickedActionNoCredChecker(){
            if (this.checkMandatoryFieldsNotEmpty()){
            }else{
              console.log('Accepted Generic Dialog but mandatories pending then action not performed')
            return
            }

            let action=this.selectedAction
            let selectedItem={}
            if (action.selObjectVariableName!==undefined&&this[action.selObjectVariableName][0]!==undefined){
                selectedItem=this[action.selObjectVariableName][0]
            }
            let extraParams=this.jsonParam(action, selectedItem)      
            extraParams.actionName=action.actionName
            extraParams.dbName= this.config.dbName
            extraParams.procName = "app"
            extraParams.finalToken= JSON.parse(sessionStorage.getItem("userSession")).finalToken
            let params = this.config.backendUrl + (action.endPoint ? action.endPoint : this.config.frontEndEnvMonitSampleUrl)
            params=params+'?' + new URLSearchParams(this.reqParams) 
            if (extraParams!==undefined){
              params=params + '&' + new URLSearchParams(extraParams)
            }
            params = params.replace(/\|/g, "%7C");
            this.fetchApi(params).then(() => {
              this[action.dialogInfo.name].close()
              this.getHolidayCalendars()
            })            
          }
          genomaSuperDialogClickedAction(){
            let action=this.selectedAction
            let selectedItem={}
            if (action.selObjectVariableName!==undefined&&this[action.selObjectVariableName][0]!==undefined){
                selectedItem=this[action.selObjectVariableName][0]
            }
            if (this.itemId) {
              this.credsChecker(action.actionName, this.itemId, this.jsonParam(this.selectedAction, selectedItem), action)
            } else {
              this.credsChecker(action.actionName, selectedItem, this.jsonParam(this.selectedAction, selectedItem), action)
            }
            return
          }
          nextRequest() {
            super.nextRequest()
            this.reqParams = {
              procInstanceName: this.procName,
              ...this.reqParams
            }
            let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
            this.performRequest()
          }    
                
          performRequest(){
            let action=this.selectedAction
            this.reqParams.actionName=action.actionName
            let selectedItem={}
            if (action.selObjectVariableName!==undefined&&this[action.selObjectVariableName][0]!==undefined){
                selectedItem=this[action.selObjectVariableName][0]
            }
            let extraParams=this.jsonParam(action, selectedItem)      
            let params = this.config.backendUrl + (action.endPoint ? action.endPoint : this.config.frontEndEnvMonitSampleUrl)
            params=params+'?' + new URLSearchParams(this.reqParams) 
            if (extraParams!==undefined){
              params=params + '&' + new URLSearchParams(extraParams)
            }
            params = params.replace(/\|/g, "%7C");
            this.fetchApi(params).then(() => {
              if (action!==undefined&&action.dialogInfo!==undefined&&action.dialogInfo.name!==undefined){
                alert('closing dialog')
                this[action.dialogInfo.name].close()
              }
              this.getHolidayCalendars()
            })            

          }
          actionMethod(action, replace = true) {
            console.log('actionMethod')
            if (replace) {
              this.selectedAction = action
            }
            let selectedItem={}
            if (this[action.selObjectVariableName]!==undefined&&this[action.selObjectVariableName][0]!==undefined){
              selectedItem=this[action.selObjectVariableName][0]
            }
            if (action.dialogInfo) {
              if (action.dialogInfo.automatic) {
                if (this.itemId) {
                  this.credsChecker(action.actionName, this.itemId, this.jsonParam(this.selectedAction, selectedItem), action)
                } else {
                  this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam(this.selectedAction, selectedItem), action)
                }
              } else {
                let dialogName=action.dialogInfo.name
                if (dialogName===undefined){
                  alert('the action '+action.actionName+' has no dialog assigned')
                  return
                }
                if (this[dialogName]===undefined){
                  alert('Check the code due to the dialog '+dialogName+' is not load as to be open')
                  return
                }				
                this[dialogName].show()
              }
            } else {
              if (this.selectedSamples.length) {
                this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam(this.selectedAction, selectedItem), action)
              } else {
                this.credsChecker(action.actionName, null, this.jsonParam(this.selectedAction, selectedItem), action)
              }
            }
          }  
    }
}
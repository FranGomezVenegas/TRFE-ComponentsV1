import { html, css } from 'lit';

export function TrazitDialogActions(base) {
    return class extends base {

          buttonActionWithoutDialogNoCredChecker(action, selectedItem) {
            this.selectedAction=action
            console.log('buttonActionWithoutDialogNoCredChecker')

            var extraParams=this.jsonParam(action, selectedItem)   
            extraParams.actionName=action.actionName
            extraParams.dbName= this.config.dbName
            extraParams.procName = "app"
            extraParams.finalToken= JSON.parse(sessionStorage.getItem("userSession")).finalToken
        //    if (extraParams.includes("ERROR")){return}   
            let params = this.config.backendUrl + (action.endPoint ? action.endPoint : this.config.frontEndEnvMonitSampleUrl)
            params=params+'?' + new URLSearchParams(this.reqParams) 
            if (extraParams!==undefined){
              params=params + '&' + new URLSearchParams(extraParams)
            }
      
            this.fetchApi(params).then(() => {
                this.getHolidayCalendars()
              //this.reload()
            })
            //this.getHolidayCalendars()
          }
          buttonActionWithoutDialog(action, selectedItem) {
            //console.log('buttonActionWithoutDialog')
            this.selectedAction=action
            //console.log('genomaSuperDialogClickedAction')
            if (this.itemId) {
              this.credsChecker(action.actionName, this.itemId, this.jsonParam(this.selectedAction, selectedItem), action)
            } else {
              this.credsChecker(action.actionName, selectedItem, this.jsonParam(this.selectedAction, selectedItem), action)
            }
            return
          }
          genomaSuperDialogClickedActionNoCredChecker(){
            //console.log('genomaSuperDialogClickedAction')
            let action=this.selectedAction
            let selectedItem={}
            if (action.selObjectVariableName!==undefined&&this[action.selObjectVariableName][0]!==undefined){
                selectedItem=this[action.selObjectVariableName][0]
            }
            var extraParams=this.jsonParam(action, selectedItem)      
            extraParams.actionName=action.actionName
            extraParams.dbName= this.config.dbName
            //extraParams.procName = "app"
            extraParams.finalToken= JSON.parse(sessionStorage.getItem("userSession")).finalToken
        //    if (extraParams.includes("ERROR")){return}   
            let params = this.config.backendUrl + (action.endPoint ? action.endPoint : this.config.frontEndEnvMonitSampleUrl)
            params=params+'?' + new URLSearchParams(this.reqParams) 
            if (extraParams!==undefined){
              params=params + '&' + new URLSearchParams(extraParams)
            }
            //console.log(extraParams)
            //return
            this.fetchApi(params).then(() => {
              alert('closing dialog')
              this[action.dialogInfo.name].close()
              this.getHolidayCalendars()
              //this.reload()
            })            
          }
          genomaSuperDialogClickedAction(){
            //console.log('genomaSuperDialogClickedAction')
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
            alert('TrazitDialogActions-nextRequest')
            super.nextRequest()
            this.reqParams = {
              procInstanceName: this.procName,
              ...this.reqParams
            }
            let action = this.selectedDialogAction ? this.selectedDialogAction : this.selectedAction
            this.performRequest()
            //this[action.clientMethod]()
          }    
                
          performRequest(){
            let action=this.selectedAction
            this.reqParams.actionName=action.actionName
            let selectedItem={}
            if (action.selObjectVariableName!==undefined&&this[action.selObjectVariableName][0]!==undefined){
                selectedItem=this[action.selObjectVariableName][0]
            }
            var extraParams=this.jsonParam(action, selectedItem)      
        //    if (extraParams.includes("ERROR")){return}   
            let params = this.config.backendUrl + (action.endPoint ? action.endPoint : this.config.frontEndEnvMonitSampleUrl)
            params=params+'?' + new URLSearchParams(this.reqParams) 
            if (extraParams!==undefined){
              params=params + '&' + new URLSearchParams(extraParams)
            }
            this.fetchApi(params).then(() => {
              if (action!==undefined&&action.dialogInfo!==undefined&&action.dialogInfo.name!==undefined){
                alert('closing dialog')
                this[action.dialogInfo.name].close()
              }
              if (this.getHolidayCalendars!==undefined){
                this.getHolidayCalendars()
              }
              //this.reload()
            })            

          }
          jsonParam(selAction, selObject) {
            console.log('TrazitDialogActions>jsonParam', selAction)
            if (selAction===undefined){
              selAction=this.selectedAction
            }
            if (selObject===undefined){
              if (selAction.selObjectVariableName===undefined){
                alert("Please add the property selObjectVariableName to your action definition")
                return
              }
              selObject=this[selAction.selObjectVariableName][0]
            }
            let jsonParam = {}
            let action = selAction
            if (action.endPointParams) {
              action.endPointParams.forEach(p => {
                if (p.internalVariableObjName&&p.internalVariableObjProperty) {          
                    if (this[p.internalVariableObjName]===undefined||this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
                      var msg=""
                      if (this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
                        msg='The object '+p.internalVariableObjName+' has no one property called '+p.internalVariableObjProperty
                        alert(msg)
                        //console.log(msg, this[p.internalVariableObjName][0])
                      }else{
                        msg='there is no object called '+p.internalVariableObjName+' in this view'
                        alert(msg)
                      }
                  //    alert('No family selected')
                      return jsonParam[p.argumentName] = "ERROR: "+msg
                    }  
                  jsonParam[p.argumentName] = this[p.internalVariableObjName][0][p.internalVariableObjProperty]
                 
                } else if (p.element) {
                  if (p.isAdhocField!==undefined&&p.isAdhocField===true){
                    var curArgName=jsonParam[p.argumentName]
                    if (curArgName===undefined){curArgName=''}
                    if (curArgName.length>0){curArgName=curArgName+"|"}
                    curArgName=curArgName+this[p.element].value
                    if (p.fieldType!==undefined){
                      curArgName=curArgName+"*"+p.fieldType
                    }
                    jsonParam[p.argumentName] = curArgName
                  }else{
                    jsonParam[p.argumentName] = this[p.element].value // get value from field input
                  }
                } else if (p.defaultValue) {
                  if (p.isAdhocField!==undefined&&p.isAdhocField===true){
                    var curArgName=jsonParam[p.argumentName]
                    if (curArgName===undefined){curArgName=''}
                    if (curArgName.length>0){curArgName=curArgName+"|"}
                    curArgName=curArgName+p.defaultValue
                    if (p.fieldType!==undefined){
                      curArgName=curArgName+"*"+p.fieldType
                    }
                    jsonParam[p.argumentName] = curArgName
                  }else{
                    jsonParam[p.argumentName] = p.defaultValue // get value from default value (i.e incubator)
                  }
                } else if (p.selObjectPropertyName) {
                  jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
                } else if (p.targetValue) {
                  jsonParam[p.argumentName] = this.targetValue[p.argumentName] // get value from target element passed
                } else {
                  jsonParam[p.argumentName] = p.value
                }
                console.log('jsonParam', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
              })
            }
            if (action.paramFilter) {
              jsonParam[action.paramFilter[this.filterName].argumentName] = action.paramFilter[this.filterName].value
            }
            return jsonParam
          }

          
//          { "isAdhocField": true, "argumentName": "fieldName", "value": "description" },
//          { "isAdhocField": true, "argumentName": "fieldValue", "element": "text2", "fieldType":"STRING" }
  
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
                //console.log('action', action)
                if (this[dialogName]===undefined){
                  alert('Check the code due to the dialog '+dialogName+' is not load as to be open')
                  return
                }				
                //this.genomaDialogsTemplate()
                //this.requestUpdate()
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
/*          
          async getHolidayCalendars() {
            this.samplesReload = true
            var curProject = this.selectedProject 
            var curStudy = this.selectedStudy 
            this.selectedProject={}
            this.selectedStudy={}
            this.reqParams.actionName="ALL_ACTIVE_PROJECTS"
            let params = this.config.backendUrl + this.config.GenomaStudyAPIqueriesUrl
              + '?' + new URLSearchParams(this.reqParams)
            await this.fetchApi(params).then(j => {
              if (j && !j.is_error) {        
                this.programsList = j.project
                if (j.master_data&&j.master_data.users){
                }
              }
            })
            
            if (this.selectedProject===undefined){
               // console.log("FIRST TIME!!!!")
            }else{
                let givenProject = this.programsList.filter(i => i.name == curProject.name)
                this.selectedProject=givenProject[0]
                if (curStudy!==undefined&&this.selectedProject!==undefined){
                    this.selectedStudy=this.selectedProject.study.filter(i => i.name == curStudy.name)[0]
                }
                console.log('selectedStudy', this.selectedStudy)
            }
          }
*/          
    }
}
export function CommonsClientMethod(base) {
  return class extends base {

    async getGridData() {
      this.samplesReload = true
      this.selectedSamples = []
      let params = this.config.backendUrl + (this.actionObj.endPoint ? this.actionObj.endPoint : this.config.frontEndEnvMonitSampleUrl)
        + '?' + new URLSearchParams(this.reqParams)
      await this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.setGrid(j)
        } else {
          this.setGrid()
        }
      })
      this.samplesReload = false
    }

    buttonActionWithoutDialog() {
      console.log('buttonActionWithoutDialog')
      if (+ this.selectedAction.endPoint===undefined){
        alert('Action with no endPoint property, cannot continue')
        return
      }
      var extraParams=this.jsonParamCommons(this.selectedAction, this.selectedSamples[0])      
      let params = this.config.backendUrl + this.selectedAction.endPoint
        + '?' + new URLSearchParams(this.reqParams) 
      if (extraParams!==undefined){
        params=params + '&' + new URLSearchParams(extraParams)
      }
      this.fetchApi(params).then(() => {
        this.reload()
      })
    }

    jsonParamCommons(selAction, selObject) {
      console.log('jsonParamCommons', selAction)
      let jsonParam = {}
      let action = selAction
      if (action.endPointParams) {
        action.endPointParams.forEach(p => {
          if (p.element) {
            jsonParam[p.argumentName] = this[p.element].value // get value from field input
          } else if (p.defaultValue) {
            jsonParam[p.argumentName] = p.defaultValue // get value from default value (i.e incubator)
          } else if (p.selObjectPropertyName) {
            jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
          } else if (p.targetValue) {
            jsonParam[p.argumentName] = this.targetValue[p.argumentName] // get value from target element passed
          } else {
            jsonParam[p.argumentName] = p.value
          }
          console.log('jsonParamCommons', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
        })
      }
      if (action.paramFilter) {
        jsonParam[action.paramFilter[this.filterName].argumentName] = action.paramFilter[this.filterName].value
      }
      return jsonParam
    }
    openReactivateObjectDialog() {
      if (this.selectedAction.dialogInfo===undefined){
        return
      }
      if (this.selectedAction.dialogInfo.action[0]===undefined){
        alert('Action with no endPoint property, cannot continue')
        return
      }
      let params = this.config.backendUrl + this.selectedAction.dialogInfo.action[0].endPoint
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(() => {
        if (this.reload!==undefined){
          this.reload()
        }
      })
    }
  
    getDeactivatedObjects() {
      console.log('getDeactivatedObjects')
      this.deactivatedObjects = []
      let params = this.config.backendUrl + this.selectedDialogAction.endPoint
        + '?' + new URLSearchParams(this.reqParams)
      this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.deactivatedObjects = j
        }
      })
    }

    myButtonClickedMethod(){
      this.myActionMethod(this.selectedAction, this.selectedSamples, 'name')
    }
    myActionMethod(action, selObject, propName) {
      if (action===undefined){
        alert('viewQuery property not found in the procedure model for procInstanceName'+this.procName+' and view '+this.viewName)
        return
      }
      console.log('myActionMethod','action', action, 'selObject', selObject)
        if (selObject!==undefined) {
          this.credsCheckerCommons(action.actionName, selObject[propName], this.jsonParamCommons(action, selObject), action)
        } else {
          this.credsCheckerCommons(action.actionName, undefined, this.jsonParamCommons(action, selObject), action)
        }
    }
  }
}
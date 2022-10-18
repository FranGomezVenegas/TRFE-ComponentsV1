import { ProceduresModel } from '../../ProceduresModel';

export function ApiFunctions(base) {
    return class extends (base) {


      fetchApi(urlParams, feedback=true) { 
        // notification enabled by default, just turn log to false for those what requires no notification   
        let log = true
        if (urlParams.toString().toUpperCase().includes("QUERI")) {
          log = false
        }
        log = true
        console.log('fetchApi, log', log, 'urlParams', urlParams, urlParams.toString().toUpperCase())
        urlParams += "&isForTesting="+ this.config.isForTesting
        this.dispatchEvent(new CustomEvent('set-activity', {bubbles: true, composed: true}))
        return fetch(urlParams).then(async r => {
          if (r.status == 200) {
            return r.json()
          } else {
            let err = await r.json()
            throw err
          }
        }).then(j => {
          if (feedback) {
            this.dispatchEvent(new CustomEvent('success', {
              detail: {...j, log: log},
              bubbles: true,
              composed: true
            }))
          }
          return j
        }).catch(e => {
          if (e.message == "Unexpected end of JSON input") {
            this.dispatchEvent(new CustomEvent("error", {
              detail: {...e},
              bubbles: true,
              composed: true
            }))
            return
          } else {
            this.dispatchEvent(new CustomEvent("error", {
              detail: {...e, log: log},
              bubbles: true,
              composed: true
            }))
            this.error(e)
            return e
          }
        })
      }
    
      error(e) { }

      // This fetchApi was the original one for model 2.1, on applying naming convention actions/queries we
      //  evidenced that it was not adding notifications ... although it worked before this naming convention changed
      // although now it seemed to be strange that just the naming convention provoked the issue
      xfetchApi(urlParams) { 
          console.log('fetchApi', 'urlParams', urlParams)        
          
          this.dispatchEvent(new CustomEvent('set-activity', {bubbles: true, composed: true}))
          return fetch(urlParams).then(async r => {
              if (r.status == 200) {
              return r.json()
              } else {
              let err = await r.json()
              throw err
              }
          }).then(j => {
              this.dispatchEvent(new CustomEvent('success', {
              detail: {...j},
              bubbles: true,
              composed: true
              }))
              return j
          }).catch(e => {
              this.dispatchEvent(new CustomEvent("error", {
              detail: {...e},
              bubbles: true,
              composed: true
              }))
              return
          })
      }    
      getAPICommonParams(action){
        if (action===undefined){return}
        let extraParams={}  
        extraParams.actionName=action.actionName
        extraParams.dbName= this.config.dbName
        extraParams.procInstanceName = this.procInstanceName
        extraParams.finalToken= JSON.parse(sessionStorage.getItem("userSession")).finalToken
        return extraParams
      }          
      jsonParam(action, selObject = {}, targetValue = {}) {
        //alert('jsonParam', 'action', action)
        if (action===undefined){return}
          let jsonParam = {}
          if (action.endPointParams) {
              action.endPointParams.forEach(p => {
//console.log('jsonParam', 'element', p)
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
                
              }else if (p.element && this[p.element]) {
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
              } else if (p.fixValue) {  //defaultValue
                  jsonParam[p.argumentName] = p.fixValue // get value from default value (i.e incubator)
              } else if (p.beItem) {
                  jsonParam[p.argumentName] = this.selectedItem[0][p.beItem] // get value from selected item
              } else if (p.selObjectPropertyName) {
                jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
              } else if (p.targetValue) {
                if (targetValue[p.argumentName]!==undefined){
                  jsonParam[p.argumentName] = targetValue[p.argumentName] // get value from target element passed
                }else{
                  jsonParam[p.argumentName] = this.targetValue[p.argumentName] // get value from target element passed
                }
              } else {
                  jsonParam[p.argumentName] = p.value
              }
              })
          }
          console.log('jsonParam', 'action', action, 'filterName', this.filte)
          if (action.subViewFilter!==undefined&&this.filterName!==undefined){
            action.subViewFilter[this.filterName].forEach(p => {
              //console.log('jsonParam', 'element', p)
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
                
              }else if (p.element && this[p.element]) {
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
              } else if (p.fixValue) {  //defaultValue
                  jsonParam[p.argumentName] = p.fixValue // get value from default value (i.e incubator)
              } else if (p.beItem) {
                  jsonParam[p.argumentName] = this.selectedItem[0][p.beItem] // get value from selected item
              } else if (p.selObjectPropertyName) {
                jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
              } else if (p.targetValue) {
                jsonParam[p.argumentName] = this.targetValue[p.argumentName] // get value from target element passed
              } else {
                  jsonParam[p.argumentName] = p.value
              }
              })            
          }
          
          // if (action.paramFilter) {
          //     jsonParam[action.paramFilter[this.filterName].argumentName] = action.paramFilter[this.filterName].value
          // }
          return jsonParam
      }
      xjsonParamCommons(selAction, selObject, targetValue = {}) {
         // console.log('xjsonParamCommons', 'selAction', selAction, 'selObject', selObject)
          if (selAction===undefined){
            selAction=this.selectedAction
          }
          if (selObject===undefined){
            // if (selAction.selObjectVariableName===undefined){
            //   alert("Please add the property selObjectVariableName to your action definition")
            //   return
            // }
            if (selAction.selObjectVariableName!==undefined){
              selObject=this[selAction.selObjectVariableName][0]
            }else{
              selObject={}
            }
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
                  if (this[p.element]===undefined||this[p.element]===null){
                    alert('Not found the html element called '+p.element+' Please talk with your System Admin')
                  }else{
                    console.log('element object in context content is:', this[p.element])
                    jsonParam[p.argumentName] = this[p.element].value // get value from field input
                  }
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
                jsonParam[p.argumentName] = targetValue[p.argumentName] // get value from target element passed
              } else {
                jsonParam[p.argumentName] = p.value
              }
              //console.log('xjsonParamCommons', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
            })
          }
          if (action.paramFilter) {
            jsonParam[action.paramFilter[this.filterName].argumentName] = action.paramFilter[this.filterName].value
          }
          if (jsonParam.length==0&&action.endPointParams.length>0){
              alert('There are endPointParams but not configured properly as to get the data, please check the console for further details')
              console.log('endPointParams', action.endPointParams, 'jsonParam', jsonParam)
          }
          return jsonParam
      }        
      getActionAPIUrl(action){
        console.log('getActionAPIUrl', this.procInstanceName)
        if (action!==undefined&&action.endPoint!==undefined){
          return action.endPoint ? action.endPoint : this.config.SampleAPIactionsUrl
        }
        let procInstanceModel={}
        if (!this.config.local) {
          let findProc = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures.filter(m => m.procInstanceName == this.procInstanceName)
          if (findProc.length) {
            procInstanceModel= findProc[0].procModel
          }
        }else{
          procInstanceModel=ProceduresModel[this.procInstanceName]
        }               
        if (procInstanceModel.ModuleSettings===undefined){
          return 'ERROR, ModuleSettings property not found in the model for procedure instance '+this.procInstanceName+'. If endPoint property at action level is not defined then moduleSettings becomes mandatory to get the Endpoint url'
        }
        let actionsEndpoints=procInstanceModel.ModuleSettings.actionsEndpoints
        if (actionsEndpoints.length==1){         
          return actionsEndpoints[0].url
        }
        let endPointUrl=action.endPointUrl        
        let foundEndPoint=actionsEndpoints.filter(m => m.name == endPointUrl)
        if (foundEndPoint.length===0){
          return 'ERROR in ApiFunctions.getActionAPIUrl: EndPointUrl '+endPointUrl+" not found in Module Settings"
        }else{
          return foundEndPoint[0].url
        }
      }
    }
}
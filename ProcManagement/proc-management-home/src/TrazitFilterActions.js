import { html, css } from 'lit';

export function TrazitFilterActions(base) {
    return class extends base {
      xjsonParamCommons(selObject) {
        let jsonParam = {}
        if (selObject[0]===undefined){
          //alert('selObject is not an array as expected')
          console.log('TrazitFilterActions, selObject is not an array as expected', 'selObject', selObject)
          return jsonParam
        }
        selObject.forEach(p => {
          if (p.argumentName==="projectName") {
            if (this.selectedProject===undefined||this.selectedProject.name===undefined){
              alert('No study selected')
              return jsonParam
            }
            jsonParam[p.argumentName] = this.selectedProject.name
          } else if (p.internalVariableObjName&&p.internalVariableObjProperty) {          
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
                return jsonParam[p.argumentName] = "ERROR: "+msg
              }  
            jsonParam[p.argumentName] = this[p.internalVariableObjName][0][p.internalVariableObjProperty]
            
          } else if (p.element) {
            jsonParam[p.argumentName] = this.trazitFormFields[p.element].value // get value from field input
          } else if (p.defaultValue) {
            jsonParam[p.argumentName] = p.defaultValue // get value from default value (i.e incubator)
          } else if (p.selObjectPropertyName) {
            jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
          } else if (p.targetValue) {
            jsonParam[p.argumentName] = this.targetValue[p.argumentName] // get value from target element passed
          } else {
            jsonParam[p.argumentName] = p.value
          }
          //console.log('jsonParam', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
        })
        return jsonParam
      }
      getQueryFilterData() {
        if (this.selectedEntry===undefined||this.selectedEntry.filter===undefined){
          alert("No entry selected to perform the search")
          return
        }
        if (this.config===undefined||this.config===null){
          //alert('No config info available')
          //return
          if (this.config===undefined||this.config.length==0){
            this.config={
              "dbName": "labplanet",
              "isForTesting": false,
              "backendUrl": "http://51.75.202.142:8888/LabPLANET-API",
              "appAuthenticateApiUrl": "/app/AuthenticationAPIactions",
              "frontEndEnvMonitSampleUrl": "/moduleenvmon/EnvMonSampleAPIqueries",
              "EnvMonSampleAPIQueriesStats": "/moduleenvmon/EnvMonAPIstats",
              "ApiEnvMonitSampleUrl": "/moduleenvmon/EnvMonSampleAPIactions",
              "ApiEnvMonitUrl": "/moduleenvmon/EnvMonAPIactions",
              "frontEndEnvMonitIncubationUrl": "/moduleenvmon/EnvMonIncubationAPIqueries",
              "frontEndEnvMonitUrl": "/moduleenvmon/EnvMonAPIqueries",
              "ApiEnvMonitProdLotUrl": "/moduleenvmon/EnvMonProdLotAPIactions",
              "ApiInstrumentsAPIactionsUrl": "/app/procs/InstrumentsAPIactions",
              "ApiInstrumentsAPIqueriesUrl": "/app/procs/InstrumentsAPIqueries",
              "PlatformAdminAPIactionsUrl": "/app/PlatformAdminActions",
              "PlatformAdminAPIqueriesUrl": "/app/PlatformAdminQueries",
              "GenomaStudyAPIactionsUrl": "/modulegenoma/GenomaStudyAPIactions",
              "GenomaStudyAPIqueriesUrl": "/modulegenoma/GenomaStudyAPIqueries",              "local": true,
              "localDefaultView": {
                  "procName": "em-demo-a",
                  "viewName": "DataMining",
                  "filterName": "DataMining"
              }
            }
          }
      
        }
        console.log('line86', 'about to call jsonparam', this.selectedEntry.filter.extraParams)
        var extraParams=this.jsonParam(this.selectedEntry.filter.extraParams) 
        let reqParams = {
          procInstanceName: this.procName,
          finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
          dbName: this.config.dbName,
          actionName: this.selectedEntry.action, 
          ...this.selectedEntry.filter.fixParams,
          ...extraParams
        }
        let params = this.config.backendUrl + (this.selectedEntry.endPoint ? this.selectedEntry.endPoint : this.config.EnvMonSampleAPIQueriesStats)
          + '?' + new URLSearchParams(reqParams)
        this.fetchApi(params).then(j => {
          if (j && !j.is_error) {
            this.data = j
            this.jsonData=this.data[this.selectedEntry.elementName]
            //this.render()
          }
        })
      }
      selectedItem(action){
        if (action.selObjectVariableName===undefined){
            return undefined
        }
        return this[action.selObjectVariableName][0]
      }
      getButton(butArr) {   
//        console.log('getButton', butArr)     
          if (butArr===undefined){return}
          return html`
            ${butArr.map(action =>
              html`${action.button ?                
                html`
                ${action.button.icon ?
                  html`<mwc-icon-button 
                    class="${action.button.class}"
                    icon="${action.button.icon}" 
                    title="${action.button.title['label_'+this.lang]}" 
                    ?disabled=${this.buttonDisable(action)}
                    @click=${()=>this.buttonAction(action, this.selectedItem(action), undefined)}></mwc-icon-button>` :
                  html`${action.button.img ?
                    html`<mwc-icon-button 
                      class="${action.button.class} img"
                      title="${action.button.title['label_'+this.lang]}" 
                      ?disabled=${this.buttonDisable(action)}
                      ?hidden=${this.btnHidden(action)}
                      @click=${()=>this.buttonAction(action, this.selectedItem(action), undefined)}>
                        <img class="iconBtn" src="images/${action.button.img}">
                      </mwc-icon-button>` :
                    html`<mwc-button dense raised 
                      label="${action.button.title['label_'+this.lang]}" 
                      ?disabled=${this.buttonDisable(action)}
                      @click=${()=>this.buttonAction(action, this.selectedItem(action), undefined)}></mwc-button>`
                  }`
                }` :
                nothing
              }`
            )}
          `
      }  
      buttonDisable(action){
        console.log('buttonDisable')
        if (action===undefined||action.button===undefined){return true}
        if (action.button.requiresObjectSelected===undefined){return true}
        if (action.button.requiresObjectSelected===false){return false}
        if (action.selObjectVariableName===undefined&&action.selObjectArrVariableName===undefined){
          alert("The button "+action.button.title['label_en']+" is configured as to be disabled when no object selected but property selObjectVariableName is not found,please review the settings for this button action")
          return true
        }            
        if (action.selObjectVariableName!==undefined){
          if (this[action.selObjectVariableName]===undefined||this[action.selObjectVariableName]==={}){return true}
          return false
        }
        if (action.selObjectArrVariableName!==undefined){
          if (this[action.selObjectArrVariableName][0]===undefined){return true}
          return false
        }
      }    
      buttonAction(action, selectedItem, replace = true, actionNumIdx) {
        //console.log(action, this.newStudyIndividual)
        if (action===undefined){return}
        if (action.clientMethod==="buttonActionWithoutDialog"){
          this.buttonActionWithoutDialog(action, selectedItem)
          return
        }
        this.selectedAction = action
      //this.newStudyIndividual.show()
    
        var propName = ""
        this.actionMethod(action)
      }        
      tableHeight(tableItemsObj){            
        if (tableItemsObj===undefined){
          console.log('tableHeight', 'tableItemsObj', tableItemsObj, '100px')
          return "85px"
        }
        var l=[]
        l=tableItemsObj
        var dynamicH=l.length
        dynamicH=dynamicH*35
        dynamicH=dynamicH+100
        if (dynamicH>350){
          console.log('tableHeight', 'tableItemsObj', tableItemsObj, '250px')
          return "350px"
        }
        console.log('tableHeight', 'tableItemsObj', tableItemsObj, dynamicH+'px')
        return dynamicH.toString()+"px" //(tableItemsObj.length*35)+100
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
              console.log('line206', 'about to call jsonparam', this.selectedAction, selectedItem)
              this.credsChecker(action.actionName, this.itemId, this.jsonParam(this.selectedAction, selectedItem), action)
            } else {
              console.log('line209', 'about to call jsonparam', this.selectedAction, selectedItem)
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
            this.kpiElementsController()
            this[dialogName].show()
          }
        } else {
          if (this.selectedSamples!==null&&this.selectedSamples!==undefined&&this.selectedSamples.length) {
            console.log('line228', 'about to call jsonparam', this.selectedAction, selectedItem)
            this.credsChecker(action.actionName, this.selectedSamples[0].sample_id, this.jsonParam(this.selectedAction, selectedItem), action)
          } else {
            console.log('line231', 'about to call jsonparam', this.selectedAction, selectedItem)
            this.credsChecker(action.actionName, null, this.jsonParam(this.selectedAction, selectedItem), action)
          }
        }
      }  


    }    
}
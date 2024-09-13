//import { ProceduresModel } from '../../ProceduresModel';

export function ApiFunctionsForPlatform(base) {
return class extends (base) {

  TRAZiTgetDataFromRoot(elem, data, viewModelFromProcModel) {
    if (viewModelFromProcModel!==undefined&&viewModelFromProcModel?.viewQuery?.dataResponse!==undefined&&viewModelFromProcModel?.viewQuery?.dataResponse==="ArrayInRoot"){
      return data.queryData?data.queryData:''
    }
    if (elem !== undefined && elem.contextVariableName !== undefined) {
      if (this[elem.contextVariableName] !== undefined) {
        data = this[elem.contextVariableName];
      }
    }
    if (data === null || data === undefined) {
      return undefined;
    }
    if (elem.endPointPropertyArray !== undefined) {
      if (elem.endPointPropertyArray.length === 0) {
        return data;
      }
      if (
        elem.endPointPropertyArray.length === 1 &&
        elem.endPointPropertyArray[0].toUpperCase() === "ROOT"
      ) {
        return data;
      }
      //const numObjectsToSkip = elem.endPointPropertyArray.length - 1;
      //const propertyName = elem.endPointPropertyArray[numObjectsToSkip];
      let i = 0;
      let subJSON = {};
      //data = data[elem.endPointPropertyArray[0]][0]
      for (i = 0; i < elem.endPointPropertyArray.length; i++) {
        if (data === null) {
          return undefined;
        }
        let propertyName = elem.endPointPropertyArray[i];
        if (Array.isArray(data[propertyName])) {
          if (i < elem.endPointPropertyArray.length - 1) {
            subJSON = data[propertyName][0];
          } else {
            return data[propertyName];
          }
        } else {
          subJSON = data[propertyName];
        }
        if (typeof subJSON === "undefined") {
          return data;
        } else {
          data = subJSON;
        }
      }
      return data;
      if (typeof subJSON === "undefined") {
        return undefined;
      } else if (elem.endPointPropertyArray.length % 2 === 0) {
        // If the input array has an even number of elements, skip one more object level before recursing
        return getValueFromNestedJSON(
          subJSON,
          elem.endPointPropertyArray.slice(0, numObjectsToSkip)
        );
      } else {
        // Otherwise, recurse on the sub-JSON with the remaining elem.endPointPropertyArray elements
        return getValueFromNestedJSON(
          subJSON,
          elem.endPointPropertyArray.slice(0, numObjectsToSkip)
        );
      }
    } else {
      if (
        elem.endPointResponseObject !== undefined &&
        elem.endPointResponseObject2 !== undefined
      ) {
        let dataToRet = [];
        dataToRet = data[elem.endPointResponseObject];
        if (dataToRet !== undefined) {
          return dataToRet[elem.endPointResponseObject2];
        } else {
          return [];
        }
      } else {
        if (String(elem.endPointResponseObject).toUpperCase() === "ROOT") {
          if (!Array.isArray(data)) {
            let dataArr = [];
            dataArr.push(data);
            return dataArr;
          }
          return data;
        } else {
          return data[elem.endPointResponseObject];
        }
      }
    }
  }
  getxxxDataFromRoot(elem, curDataForThisCard, filterValues) {
    if (elem !== undefined && elem.contextVariableName !== undefined) {
      if (this[elem.contextVariableName] !== undefined) {
        curDataForThisCard = this[elem.contextVariableName];
      }
    }
    if (curDataForThisCard === null || curDataForThisCard === undefined) {
      return undefined;
    }
    if (elem.endPointPropertyArray !== undefined) {
      if (elem.endPointPropertyArray.length === 0) {
        return curDataForThisCard;
      }
      if (
        elem.endPointPropertyArray.length === 1 &&
        elem.endPointPropertyArray[0].toUpperCase() === "ROOT"
      ) {
        //curDataForThisCard=applyFilterToTheData(curDataForThisCard, filterValues)
        return curDataForThisCard;
      }
      //const numObjectsToSkip = elem.endPointPropertyArray.length - 1;
      //const propertyName = elem.endPointPropertyArray[numObjectsToSkip];
      let i = 0;
      let subJSON = {};
      //curDataForThisCard = curDataForThisCard[elem.endPointPropertyArray[0]][0]
      for (i = 0; i < elem.endPointPropertyArray.length; i++) {
        if (curDataForThisCard === null) {
          return undefined;
        }
        let propertyName = elem.endPointPropertyArray[i];
        if (Array.isArray(curDataForThisCard[propertyName])) {
          if (i < elem.endPointPropertyArray.length - 1) {
            subJSON = curDataForThisCard[propertyName][0];
          } else {
            subJSON = curDataForThisCard[propertyName];
            //return applyFilterToTheData(curDataForThisCard[propertyName], filterValues);
          }
        } else {
          subJSON = curDataForThisCard[propertyName];
        }
        //if (typeof subJSON === "undefined") {
        //  return applyFilterToTheData(curDataForThisCard, filterValues);
        //} else {
          curDataForThisCard = subJSON;
        //}
      }
      return curDataForThisCard
      //return applyFilterToTheData(curDataForThisCard, filterValues);
      if (typeof subJSON === "undefined") {
        return undefined;
      } else if (elem.endPointPropertyArray.length % 2 === 0) {
        // If the input array has an even number of elements, skip one more object level before recursing
        return getValueFromNestedJSON(
          subJSON,
          elem.endPointPropertyArray.slice(0, numObjectsToSkip)
        );
      } else {
        // Otherwise, recurse on the sub-JSON with the remaining elem.endPointPropertyArray elements
        return getValueFromNestedJSON(
          subJSON,
          elem.endPointPropertyArray.slice(0, numObjectsToSkip)
        );
      }
    } else {
      if (
        elem.endPointResponseObject !== undefined &&
        elem.endPointResponseObject2 !== undefined
      ) {
        let curDataForThisCardToRet = [];
        curDataForThisCardToRet = curDataForThisCard[elem.endPointResponseObject];
        if (curDataForThisCardToRet !== undefined) {
            
          return applyFilterToTheData(curDataForThisCardToRet[elem.endPointResponseObject2],  filterValues);
        } else {
          return [];
        }
      } else {
        if (String(elem.endPointResponseObject).toUpperCase() === "ROOT") {
          if (!Array.isArray(curDataForThisCard)) {
            let curDataForThisCardArr = [];
            curDataForThisCardArr.push(curDataForThisCard);
            return applyFilterToTheData(curDataForThisCardArr,  filterValues);
          }
          return applyFilterToTheData(curDataForThisCard,  filterValues);
        } else {
          return applyFilterToTheData(curDataForThisCard[elem.endPointResponseObject],  filterValues);
        }
      }
    }
    function applyFilterToTheData(curDataForThisCard, filterValues) {
   
        const uniqueItemsSet = new Set();
        for (const key in filterValues) {
                const filterValue = filterValues[key];
                if (Array.isArray(curDataForThisCard)) {
                    const filteredItems = curDataForThisCard.filter(item => {
                        if (item[key] && filterValue) {
                          return item[key] == filterValue;
                        }
                        return false
                    });  
                    console.log(filteredItems)                         
                    filteredItems.forEach(item => uniqueItemsSet.add(item));            
            }
        }
        return Array.from(uniqueItemsSet);
    
    }
  }
    fetchApi(urlParams, feedback=true, actionModel) { 
      // notification enabled by default, just turn log to false for those what requires no notification   
      let log = true
      if (urlParams.toString().toUpperCase().includes("QUERI")) {
        log = false
      }
      log = true
      urlParams = urlParams.replace(/\|/g, "%7C");
      //console.log('fetchApi, log', log, 'urlParams', urlParams, urlParams.toString().toUpperCase())
      if (this.config.isForTesting===undefined){
        if (this.isProcManagement===true){this.config.isForTesting=false}
      }
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
        if (log) {
          this.dispatchEvent(new CustomEvent('success', {
            detail: {...j, log: log},
            bubbles: true,
            composed: true
          }))
        }
        if (actionModel!==undefined){
          this.refreshMasterData(j, actionModel)
          this.printLabels(j, actionModel)
        }
        return j
      }).catch(e => {
        if (e.message == "Unexpected end of JSON input") {
          this.dispatchEvent(new CustomEvent("error", {
            detail: {...e},
            bubbles: true,
            composed: true
          }))
        } else {
          this.dispatchEvent(new CustomEvent("error", {
            detail: {...e, log: log},
            bubbles: true,
            composed: true
          }))
          //this.error(e)
          return e
        }
      })
    }

    fetchApiForFiles(urlParams, feedback=true, actionModel, formData=null) {
        // notification enabled by default, just turn log to false for those what requires no notification   
        let log = true;
        if (urlParams.toString().toUpperCase().includes("QUERI")) {
            log = false;
        }
        log = true;
        urlParams = urlParams.replace(/\|/g, "%7C");
        //urlParams += "&isForTesting=" + this.config.isForTesting;
        this.dispatchEvent(new CustomEvent('set-activity', { bubbles: true, composed: true }));
    
        let fetchOptions = {
            method: formData ? 'POST' : 'GET',
            credentials: 'same-origin'
        };
    
        if (formData) {
            fetchOptions.body = formData;
        }
        // Emitir evento para ocultar el progreso circular
        this.dispatchEvent(new CustomEvent('show-progress', {
          bubbles: true,
          composed: true
        }));      
    
        return fetch(urlParams, fetchOptions).then(async r => {
            if (r.status == 200) {
                return r.json();
            } else {
                let err = await r.json();
                throw err;
            }
        }).then(j => {
            // Emitir evento para ocultar el progreso circular
            this.dispatchEvent(new CustomEvent('hide-progress', {
              bubbles: true,
              composed: true
            }));      

            if (log) {
                this.dispatchEvent(new CustomEvent('success', {
                    detail: { ...j, log: log },
                    bubbles: true,
                    composed: true
                }));
            }
            if (actionModel !== undefined) {
                this.refreshMasterData(j, actionModel);
                this.printLabels(j, actionModel)
            }
            return j;
        }).catch(e => {
          // Emitir evento para ocultar el progreso circular
          this.dispatchEvent(new CustomEvent('hide-progress', {
            bubbles: true,
            composed: true
          }));      

            if (e.message == "Unexpected end of JSON input") {
                this.dispatchEvent(new CustomEvent("error", {
                    detail: { ...e },
                    bubbles: true,
                    composed: true
                }));
            } else {
                this.dispatchEvent(new CustomEvent("error", {
                    detail: { ...e, log: log },
                    bubbles: true,
                    composed: true
                }));
                return e;
            }
        });
        
    }
    
    printLabels(endPointResponse, actionModel) {
      if (endPointResponse === undefined || endPointResponse.labelsToPrint === undefined) {
        return;
      }
    
      // Obtén el dispositivo predeterminado de la impresora
      BrowserPrint.getDefaultDevice('printer', (device) => {
        console.log('Selected device:', device);
        
        endPointResponse.labelsToPrint.forEach(label => {
          const { zplCode, numLabels } = label;
          const labelsToPrint = numLabels !== undefined ? numLabels : 1;
          
          for (let i = 0; i < labelsToPrint; i++) {
            device.send(zplCode, () => {
              console.log('Print successful');
            }, (error) => {
              console.error('Error printing:', error);
            });
          }
        });
      }, (error) => {
        console.error('Error getting default device:', error);
      });
    }
    
    refreshMasterData(endPointResponse, actionModel) {
      //console.log('refresh master data')
      if (this.procInstanceName===null){return}
      if (this.procInstanceName===undefined||this.procInstanceName===null||this.procInstanceName.length==0){
        let currentTabView=JSON.parse(sessionStorage.getItem("currentOpenView"))
        if (currentTabView!==null&&currentTabView!==undefined&&currentTabView.procInstanceName!==undefined){
          this.procInstanceName=currentTabView.procInstanceName
        }
      }
      if (this.procInstanceName===undefined||this.procInstanceName===null||this.procInstanceName.length==0){
        this.procInstanceName=sessionStorage.getItem("currentProcInstanceName")          
      }
      //console.log(endPointResponse.master_data)
      if ( endPointResponse===undefined||endPointResponse.master_data===undefined) {
        // alert('master Data no se va a refrescar!')
        return
      } 
      console.log('refreshMasterDataaaa', 'procInstanceName', this.procInstanceName, 'actionModel.area', actionModel.area,  'endPointResponse', endPointResponse)        
      let userSession = JSON.parse(sessionStorage.getItem("userSession"))
      let findProcIndex = 0
      if (actionModel.area!==undefined){          
        findProcIndex = userSession.procedures_list.procedures.findIndex(m => m.procInstanceName == actionModel.area)
      }else{
        findProcIndex = userSession.procedures_list.procedures.findIndex(m => m.procInstanceName == this.procInstanceName)
      }
      if (findProcIndex !== -1) {
        userSession.procedures_list.procedures[findProcIndex].master_data=endPointResponse.master_data
        sessionStorage.setItem('userSession', JSON.stringify(userSession))
        return
      }
      return
    }  

    getAPICommonParams(action, excludeProcInstanceName){
      if (excludeProcInstanceName===undefined){
        if (this.isProcManagement===true){
          excludeProcInstanceName=true
        }else{
          excludeProcInstanceName=false
        }
      }
      if (this.procInstanceName===undefined||this.procInstanceName===null||this.procInstanceName.length==0){
        let currentTabView=JSON.parse(sessionStorage.getItem("currentOpenView"))
        if (currentTabView!==null&&currentTabView!==undefined&&currentTabView.procInstanceName!==undefined){
          this.procInstanceName=currentTabView.procInstanceName
        }
      }
      if (this.procInstanceName===undefined||this.procInstanceName===null||this.procInstanceName.length==0){
        this.procInstanceName=sessionStorage.getItem("currentProcInstanceName")          
      }

      if (action===undefined){return}
      let extraParams={}  
      extraParams.actionName=action.actionName
      if (this.config!==undefined&&this.config.dbName!==undefined){
        extraParams.dbName= this.config.dbName
      }else{
        let userSession = JSON.parse(sessionStorage.getItem("userSession"))
        extraParams.dbName = userSession.dbName
      }   
      if (this.procInstanceName!==undefined&&excludeProcInstanceName!==undefined&&excludeProcInstanceName===false&&String(this.procInstanceName).length>0){
        extraParams.procInstanceName = this.procInstanceName
      }
      extraParams.finalToken= JSON.parse(sessionStorage.getItem("userSession")).finalToken
      return extraParams
    }   
            
    jsonParam(action, selObject = {}, targetValue = {}, selGridObject = {}, parentElementData, dragEntry, dropEntry) {
      console.log('ApiFunctions>jsonParam', 'action', action, 'selObject', selObject, 'targetValue', targetValue, 'selGridObject', selGridObject)
      
      if ( (this.procInstanceName===null||this.procInstanceName===undefined||this.procInstanceName.length===0)&&
            (this.procedureName!==null&&this.procedureName!==undefined&&this.procedureName.length>0) ){
        this.procInstanceName=sessionStorage.getItem("procInstanceName");
      }

      // const stack = new Error().stack;
      // const stackLines = stack.split('\n');
      // if (stackLines!==null&&stackLines[1]!==null){
      //   const callerName = stackLines[1].match(/at (\w+)/)[0]; // Adjust the index as needed    
      //   console.log("Called from: " + callerName);
      // }       
      let curArgName=""
      let jsonParam = {}
      if (action===undefined){return}          
        if (action.endPointParams) {
          action.endPointParams.forEach(p => {
            this.buildJsonParam(jsonParam, p, selObject, targetValue, selGridObject, parentElementData, dragEntry, dropEntry)
          })            
          //return jsonParam
        }
        if (action.extraParams) {
          action.extraParams.forEach(p => {
            this.buildJsonParam(jsonParam, p, selObject, targetValue, selGridObject, parentElementData, dragEntry, dropEntry)
          })
          //return jsonParam
        }
        if (action.subViewFilter!==undefined&&this.filterName!==undefined){
          if (typeof this.filterName !== 'string') {
            throw new Error('filterName must be a string');
          }
          const filterName = String(this.filterName);

          function isFilterNameDefined(subViewFilter, filterName) {
            for (const filter of subViewFilter) {
              if (filter.hasOwnProperty(filterName)) {
                return filter[filterName];
              }
            }
            return [];
          }
          let subViewFilter=isFilterNameDefined(action.subViewFilter, filterName)
            
          if (subViewFilter.length>0){
            subViewFilter.forEach(p => {
                this.buildJsonParam(jsonParam, p, selObject, targetValue, selGridObject, parentElementData, dragEntry, dropEntry)
              })
          }else{
            alert('This view filter is '+this.filterName+' and the action has subViewFilter but none of them with this name')              
            jsonParam[p.argumentName] = "ERROR: "+msg
            return jsonParam[p.argumentName]
          }
        }
        return jsonParam
    }

    getServiceAPIUrl(action){
      // alert('getServiceAPIUrl')
      if (action!==undefined&&action.serviceAPIurl!==undefined){
        return action.serviceAPIurl
      }
      if (this.procInstanceName===undefined){
        return this.config.backendUrl
      }
      let procInstanceModel={}
      if (!this.config.local) {
        let findProc = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures.filter(m => m.procInstanceName == this.procInstanceName)
        if (findProc.length) {
          if (findProc[0].serviceAPIurl!==undefined){
            procInstanceModel= findProc[0].procModel
            let serviceInProcModel=procInstanceModel.ModuleSettings.serviceAPIurl
            if (serviceInProcModel!==undefined&&serviceInProcModel.length>0)
            return serviceInProcModel
          }
          return this.config.backendUrl
        }
      }else{
       // procInstanceModel=ProceduresModel[this.procInstanceName]
        let serviceInProcModel=procInstanceModel.ModuleSettings.serviceAPIurl
        if (serviceInProcModel!==undefined&&serviceInProcModel.length>0)
        return serviceInProcModel
      }

      return this.config.backendUrl
    }
    

    getActionAPIUrl(action){
      if (this.procInstanceName===undefined||this.procInstanceName===null||this.procInstanceName===null||this.procInstanceName.length==0){
        let currentTabView=JSON.parse(sessionStorage.getItem("currentOpenView"))
        if (currentTabView!==null&&currentTabView!==undefined&&currentTabView.procInstanceName!==undefined){
          this.procInstanceName=currentTabView.procInstanceName
        }
      }
      if (this.procInstanceName===undefined||this.procInstanceName===null||this.procInstanceName===''||this.procInstanceName===null||this.procInstanceName.length==0){
        this.procInstanceName=sessionStorage.getItem("currentProcInstanceName")          
      }
      if (this.isProcManagement!==undefined&&this.isProcManagement===true){
        this.procInstanceName="proc_management"
      }
      //console.log('getActionAPIUrl', this.procInstanceName)
      if (action!==undefined&&action.endPoint!==undefined){
        return action.endPoint ? action.endPoint : this.config.SampleAPIactionsUrl
      }
      let procInstanceModel={}
      if (this.config!==undefined&&this.config.local!==undefined&&!this.config.local) {
        let usSess=JSON.parse(sessionStorage.getItem("userSession"))
        let findProc = usSess.procedures_list.procedures.filter(m => m.procInstanceName == this.procInstanceName)
        if (findProc.length) {
          procInstanceModel= findProc[0].procModel
        }
      }else{
        //procInstanceModel=ProceduresModel[this.procInstanceName]
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
    getQueryAPIUrl(query){
      if (this.procInstanceName===undefined||this.procInstanceName===null||String(this.procInstanceName).length==0){
        let currentTabView=JSON.parse(sessionStorage.getItem("currentOpenView"))
        if (currentTabView!==null&&currentTabView!==undefined&&currentTabView.procInstanceName!==undefined){
          this.procInstanceName=currentTabView.procInstanceName
        }
      }
      if (this.procInstanceName===undefined||this.procInstanceName===null||String(this.procInstanceName).length==0){
        this.procInstanceName=sessionStorage.getItem("currentProcInstanceName")          
      }
      //console.log('getQueryAPIUrl', this.procInstanceName)
      if (query!==undefined&&query.endPoint!==undefined){
        return query.endPoint ? query.endPoint : this.config.SampleAPIqueriesUrl
      }
      let procInstanceModel={}
      if (!this.config.local) {
        let findProc = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures.filter(m => m.procInstanceName == this.procInstanceName)
        if (findProc.length) {
          procInstanceModel= findProc[0].procModel
        }
      }else{
       // procInstanceModel=ProceduresModel[this.procInstanceName]
      }               
      if (procInstanceModel.ModuleSettings===undefined||procInstanceModel.ModuleSettings.queriesEndpoints===undefined){
        return 'ERROR, ModuleSettings property not found in the model for procedure instance '+this.procInstanceName+'. If endPoint property at action level is not defined then queriesEndpoints property in moduleSettings becomes mandatory to get the Endpoint url'
      }
      let queriesEndpoints=procInstanceModel.ModuleSettings.queriesEndpoints
      if (queriesEndpoints.length==1){         
        return queriesEndpoints[0].url
      }
      let endPointUrl=query.endPointUrl        
      let foundEndPoint=queriesEndpoints.filter(m => m.name == endPointUrl)
      if (foundEndPoint.length===0){
        return 'ERROR in ApiFunctions.getActionAPIUrl: EndPointUrl '+endPointUrl+" not found in Module Settings"
      }else{
        return foundEndPoint[0].url
      }
    }

    buildJsonParam( jsonParam, p, selObject, targetValue, selGridObject, parentElementData, dragEntry, dropEntry){
      if (p.dragElement){
        jsonParam[p.argumentName]=dragEntry[p.dragElement]
      } else if (p.dropElement){
        jsonParam[p.argumentName]=dropEntry[p.dropElement]
      } else if (p.internalVariableSimpleObjName&&p.internalVariableSimpleObjProperty) {     
            
        if (this[p.internalVariableSimpleObjName]===undefined||this[p.internalVariableSimpleObjName][p.internalVariableSimpleObjProperty]===undefined){
          let msg=""
          if (this[p.internalVariableSimpleObjName][p.internalVariableSimpleObjProperty]===undefined){
            msg='The object '+p.internalVariableSimpleObjName+' has no one property called '+p.internalVariableSimpleObjProperty
            alert(msg)
            //console.log(msg, this[p.internalVariableSimpleObjName][0])
          }else{
            msg='there is no object called '+p.internalVariableSimpleObjName+' in this view'
            alert(msg)
          }
      //    alert('No family selected')
          return jsonParam[p.argumentName] = "ERROR: "+msg
        }  
      jsonParam[p.argumentName] = this[p.internalVariableSimpleObjName][p.internalVariableSimpleObjProperty]
      
      } else if (p.internalVariableObjName&&p.internalVariableObjProperty) {          
          if (this[p.internalVariableObjName]===undefined||this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
            let msg=""
            if (this[p.internalVariableObjName][0][p.internalVariableObjProperty]===undefined){
              msg='The object '+p.internalVariableObjName+' has no one property called '+p.internalVariableObjProperty
              alert(msg)
              //console.log(msg, this[p.internalVariableObjName][0])
            }else{
              msg='there is no object called '+p.internalVariableObjName+' in this view'
              alert(msg)
            }
        //    alert('No family selected')
            jsonParam[p.argumentName] = "ERROR: "+msg
            return 
          }  
        jsonParam[p.argumentName] = this[p.internalVariableObjName][0][p.internalVariableObjProperty]
        
      } else if (p.element) {
        if (p.addToFieldNameAndValue!==undefined&&p.addToFieldNameAndValue===true){
          if (this[p.element]==null){
            if (p.notAddWhenValueIsBlank!==undefined&&p.notAddWhenValueIsBlank===true){
              return
            }else{
            //msg='The element '+p.element+' was not added in this dialog definition, please review the endPointParams configuration or add them to the dialog'
            alert(msg)
              jsonParam[p.argumentName] = "ERROR: "+msg
              return 
            }
          }
          if (this[p.element].value!==undefined&&String(this[p.element].value).length>0){                     //
            if (jsonParam.fieldName===undefined){
              let curFldNameValue=p.argumentName                      
              jsonParam["fieldName"]=curFldNameValue
              let curFldValValue=this[p.element].value
              if (p.fieldType!==undefined){curFldValValue=curFldValValue+"*"+p.fieldType}                      
              jsonParam["fieldValue"]=curFldValValue
              
            }else{
              let curFldNameValue=jsonParam["fieldName"]
              if (curFldNameValue.length>0){curFldNameValue=curFldNameValue+"|"}   
              curFldNameValue=curFldNameValue+p.argumentName 
              jsonParam["fieldName"]=curFldNameValue

              let curFldValValue=jsonParam["fieldValue"]
              if (curFldValValue.length>0){curFldValValue=curFldValValue+"|"}   
              curFldValValue=curFldValValue+this[p.element].value
              if (p.fieldType!==undefined){curFldValValue=curFldValValue+"*"+p.fieldType}                      
              jsonParam["fieldValue"]=curFldValValue

            }
          }
        }else if (p.isAdhocField!==undefined&&p.isAdhocField===true){
          curArgName=jsonParam[p.argumentName]
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
            //console.log('element object in context content is:', this[p.element])
            if (this[p.element]!==undefined&&this[p.element].value!==undefined&&this[p.element].value.length>0){
              jsonParam[p.argumentName] = this[p.element].value // get value from field input
            }else{
              if (p.notAddWhenValueIsBlank===undefined||p.notAddWhenValueIsBlank===false){
                jsonParam[p.argumentName] = this[p.element].value // get value from field input
              }
            }
          }
        }
      } else if (p.getFromGrid) {
        if ((selGridObject===undefined||selGridObject.length===undefined)
          &&(this.genericDialogGridSelectedItems!==undefined&&this.genericDialogGridSelectedItems.length>0)){
                selGridObject=this.genericDialogGridSelectedItems[0]
        }                
        if (p.addToFieldNameAndValue!==undefined&&p.addToFieldNameAndValue===true){
          if (selGridObject[p.argumentName]==null){
            if (p.notAddWhenValueIsBlank!==undefined&&p.notAddWhenValueIsBlank===true){
              return
            }else{
            //msg='The element '+p.element+' was not added in this dialog definition, please review the endPointParams configuration or add them to the dialog'
            alert(msg)
              jsonParam[p.argumentName] = "ERROR: "+msg
              return 
            }
          }
          if (selGridObject[p.argumentName]!==undefined&&selGridObject[p.argumentName].toString().length>0){                    
            if (jsonParam.fieldName===undefined){
              let curFldNameValue=p.argumentName                      
              jsonParam["fieldName"]=curFldNameValue
              let curFldValValue=selGridObject[p.argumentName]
              if (p.fieldType!==undefined){curFldValValue=curFldValValue+"*"+p.fieldType}                      
              jsonParam["fieldValue"]=curFldValValue
              
            }else{
              let curFldNameValue=jsonParam["fieldName"]
              if (curFldNameValue!==undefined&&curFldNameValue.length>0){curFldNameValue=curFldNameValue+"|"}   
              curFldNameValue=curFldNameValue+p.argumentName 
              jsonParam["fieldName"]=curFldNameValue

              let curFldValValue=jsonParam["fieldValue"]
              if (curFldValValue!==undefined&&curFldValValue.length>0){curFldValValue=curFldValValue+"|"}   
              curFldValValue=curFldValValue+selGridObject[p.argumentName]
              if (p.fieldType!==undefined){curFldValValue=curFldValValue+"*"+p.fieldType}                      
              jsonParam["fieldValue"]=curFldValValue

            }
          }
        }
        else if (p.selObjectPropertyName!==undefined){

          if (selGridObject[p.selObjectPropertyName]!==null){
            jsonParam[p.argumentName] = selGridObject[p.selObjectPropertyName]
          }else{
            jsonParam[p.argumentName] = "undefined";
          }
          return 
        }              
        else if (p.isAdhocField!==undefined&&p.isAdhocField===true){
          curArgName=jsonParam[p.argumentName]
          if (curArgName===undefined){curArgName=''}
          if (curArgName.length>0){curArgName=curArgName+"|"}
          curArgName=curArgName+this[p.element].value
          if (p.fieldType!==undefined){
            curArgName=curArgName+"*"+p.fieldType
          }
          jsonParam[p.argumentName] = curArgName
        } else if (p.selObjectPropertyName) {
          jsonParam[p.argumentName] = selGridObject[p.selObjectPropertyName] // get value from selected item

        }else{
          if (this[p.element]===undefined||this[p.element]===null){
            alert('Not found the html element called '+p.element+' Please talk with your System Admin')
          }else{
            //console.log('element object in context content is:', this[p.element])
            if (this[p.element].value.length>0){
              jsonParam[p.argumentName] = this[p.element].value // get value from field input
            }else{
              if (p.notAddWhenValueIsBlank===undefined||p.notAddWhenValueIsBlank===false){
                jsonParam[p.argumentName] = this[p.element].value // get value from field input
              }
            }
          }
        }
      } else if (p.defaultValue) {
        if (p.isAdhocField!==undefined&&p.isAdhocField===true){
          curArgName=jsonParam[p.argumentName]
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
        if (Array.isArray(selObject)){
          jsonParam[p.argumentName] = selObject[0][p.selObjectPropertyName] // get value from selected item
        }else{
          jsonParam[p.argumentName] = selObject[p.selObjectPropertyName] // get value from selected item
        }
      } else if (p.targetValue) {          
        jsonParam[p.argumentName] = p.targetValuePropertyName!==undefined?targetValue[p.targetValuePropertyName]: targetValue[p.argumentName] 
      } else if (p.fixValue) {
        jsonParam[p.argumentName] = p.fixValue
      } else if (p.contextVariableName) {
        if (this[p.contextVariableName]!==undefined&&String(this[p.contextVariableName]).length>0){
          jsonParam[p.argumentName] = this[p.contextVariableName]
        }else{
          jsonParam[p.argumentName] = sessionStorage.getItem(p.contextVariableName)
        }
      } else if (p.parentElementProperty) {
        jsonParam[p.argumentName] = parentElementData[p.parentElementProperty]
      } else {
        jsonParam[p.argumentName] = p.value
      }
      //console.log('xjsonParamCommons', 'endPointParamsArgument', p, 'selObject', selObject, 'jsonParam', jsonParam)
      return jsonParam
    }
      
    
    
}}
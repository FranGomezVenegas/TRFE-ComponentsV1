export function ActionsFunctions(base) {
  return class extends (base) {
      trazitButtonsMethod(e, action, replace = true, actionNumIdx, selectedItemPropertyName, data, isProcManagement, parentData, dragEntry, dropEntry) {
          e.stopPropagation();
          sessionStorage.setItem('actionName', action.actionName);
          selectedItemPropertyName = selectedItemPropertyName || 'selectedItems'
          console.log('actionMethod', this.selectedProcInstance, isProcManagement)
          //this.loadDialogs()
          if (data !== undefined) {
              if (Object.keys(data).length > 0) {
              this.selectedItems = []
              this.selectedItems.push(data)
              }
          }
          let targetValue={}
          if (selectedItemPropertyName!==undefined){
            targetValue.boxValue=selectedItemPropertyName.value
          }
          console.log('actionMethod', 'action', action, 'selectedItems', this.selectedItems, 'parentData', parentData)
          if (action === undefined) {
              alert('action not passed as argument')
              return
          }
  
          if (action.dialogInfo!==undefined&&action.dialogInfo.name == "testScriptUpdateStepDialog") {
              action.actionName = "SCRIPT_UPDATE_STEP";
              action.dialogInfo.name = "testScriptNewStepDialog";
          }
          this.actionBeingPerformedModel = action;
          if (action.requiresDialog === undefined) {
              alert('The action ' + action.actionName + ' has no requiresDialog property which is mandatory')
              return
          }
          if (action.requiresDialog === false) {
              if (action.clientMethod !== undefined) {
              this[action.clientMethod](action, this[selectedItemPropertyName][0])
              return
              } else {
              if (this[selectedItemPropertyName] === undefined) {
                  if (data === undefined) {
                  this.trazitNoDialogRequired(action, null, targetValue, isProcManagement, undefined, parentData, dragEntry, dropEntry)
                  } else {
                  this.trazitNoDialogRequired(action, data, targetValue, isProcManagement, undefined, parentData, dragEntry, dropEntry)
                  }
              } else {
                  this.trazitNoDialogRequired(action, this[selectedItemPropertyName][0], targetValue, isProcManagement, undefined, parentData, dragEntry, dropEntry)
              }
              return
              }
          }
          if (action.requiresGridItemSelected !== undefined && action.requiresGridItemSelected === true &&
              (this[selectedItemPropertyName] === undefined || this[selectedItemPropertyName][0] === undefined)) {
              alert('Please select one item in the table prior')
              return
          }
          this.GetQueriesForDialog(action)
          this.getGenericDialogGridItems(action.dialogInfo)
  
          //this.loadDialogs()
          console.log("action.dialogInfo.name", action.dialogInfo.name);
          if (action.dialogInfo!==undefined&&action.dialogInfo.name === "auditDialog") {
              this[action.clientMethod]()
              return
          }
          if (true){
          //if (action.dialogInfo!==undefined&&this[action.dialogInfo.name]) {
              if (action.dialogInfo.subQueryName) {
              this[action.dialogInfo.subQueryName]()
              } else {
                if (data!==undefined){
                  this.selectedItem=data
                  this[action.dialogInfo.name].show(this.actionBeingPerformedModel, action, data);
                }else{
                  this.selectedItem=this[selectedItemPropertyName][0]
                  this[action.dialogInfo.name].show(this.actionBeingPerformedModel, action, this[selectedItemPropertyName][0]);
                }
              }
          }
          else if (action.dialogInfo!==undefined&&action.dialogInfo.name == "testScriptUpdateStepDialog") {
              this["testScriptNewStepDialog"].show();
          }
          else {
              if (action.dialogInfo!==undefined){
              alert('the action ' + action.actionName + ' has no dialog defined')
              }else{
              alert('the dialog ' + action.dialogInfo.name + ' does not exist')
              }
          }
      }
  
      trazitNoDialogRequired(action, selectedItem, targetValue, isProcManagement, gridSelectedRow, parentData, dragEntry, dropEntry) {
          console.log('trazitNoDialogRequired', 'action', action, 'selectedItem', selectedItem, 'gridSelectedRow', gridSelectedRow, 'parentData', parentData)
          this.selectedAction = action
          if (targetValue === undefined) { targetValue = {} }
          if (this.itemId) {
            this.trazitCredsChecker(action.actionName, this.itemId, this.jsonParam(this.selectedAction, selectedItem, targetValue, gridSelectedRow, parentData, dragEntry, dropEntry), action, isProcManagement, gridSelectedRow, parentData, dragEntry, dropEntry)
          } else {
            this.trazitCredsChecker(action.actionName, selectedItem, this.jsonParam(this.selectedAction, selectedItem, targetValue, gridSelectedRow, parentData, dragEntry, dropEntry), action, isProcManagement, gridSelectedRow, parentData, dragEntry, dropEntry)
          }
          // Comentado para habilitar confirmDialogsparentData
          // this.trazitPerformAPICall(action, selectedItem)
          return
      }
  
    /**
     *
     * @param {*} actionName
     * @param {*} objId -1 will show up the creds dialog, e.g user profile open the creds dialog.
     * @param {*} params ref of this.reqParams
     * @param {*} action ref of action object
     */
  
    
    trazitCredsChecker(actionName, objId, params={}, action, isProcManagement, gridSelectionData, parentData, dragEntry, dropEntry) {
  //    console.log('trazitCredsChecker', 'isProcManagement', isProcManagement, 'action', action, 'parentData', parentData)
      this.actionObj = action || {}
      this.reqParams = params
      if (actionName) {
          let thisActionInfoForAPI = {
              action: action,
              actionParams: params,
              gridSelectedItem: gridSelectionData,
              parentData: parentData
              };
          sessionStorage.setItem('actionInfoToAPIcall', JSON.stringify(thisActionInfoForAPI));
  
        this.actionName = actionName
        if (objId == -1) {
          this.credDialog.show()
        } else {
          this.objectId = objId
          let noNeedCreds = this.trazitCheckProcList(isProcManagement)
          if (noNeedCreds) {
            this.trazitNextRequest(action, params, {}, gridSelectionData, parentData)
          } else {
            if (this.type == "confirm") {
              this.confirmDialog.show()
            } else {
              this.credDialog.show()
            }
          }
        }
      }
    }
  
    /**
     * set the justification type, generate justification list for non text type
     */
     trazitCheckProcList(isProcManagement) {
      if (this.procInstanceName===undefined||this.procInstanceName.length==0){
        let currentTabView=JSON.parse(sessionStorage.getItem("currentOpenView"))
        if (currentTabView!==null&&currentTabView!==undefined&&currentTabView.procInstanceName!==undefined){
          this.procInstanceName=currentTabView.procInstanceName
        }
      }
      if (this.procInstanceName===undefined||this.procInstanceName.length==0){
        this.procInstanceName=sessionStorage.getItem("currentProcInstanceName")          
      }      
      if (isProcManagement===undefined){
        let userSession=JSON.parse(sessionStorage.getItem("userSession"))
        isProcManagement=userSession.isProcManagement
      }        

      // if (this.area!==undefined&&this.area==="app"){
      //   return true
      // }
      let bypass = true
      this.justificationType = null
      this.justificationList = null
      let pArr = []
      let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
      if (isProcManagement!==undefined&&isProcManagement===true){
        pArr = procList.filter(p => p.procInstanceName == 'app')
      }else{
        pArr = procList.filter(p => p.procInstanceName == this.procInstanceName)
      }
      if (isProcManagement&&(pArr===undefined||pArr.length==0)){
        return true
      }
      let p = pArr[0]
      bypass = true
        if (p.actions_with_esign.indexOf(this.actionName) >= 0) {
          let idx = p.actions_with_esign.findIndex(p => p == this.actionName)
          --idx // the object is on the previous index
          if (p.actions_with_esign[idx][this.actionName].type) {
            this.justificationType = p.actions_with_esign[idx][this.actionName].type
            if (this.justificationType != "TEXT") {
              this.justificationList = p.actions_with_esign[idx][this.actionName].list_entries
            }
          }
          this.type = "esign"
          bypass = false
        } else if (p.actions_with_confirm_user.indexOf(this.actionName) >= 0) {
          let idx = p.actions_with_confirm_user.findIndex(p => p == this.actionName)
          --idx // the object is on the previous index
          if (p.actions_with_confirm_user[idx][this.actionName].type) {
            this.justificationType = p.actions_with_confirm_user[idx][this.actionName].type
            if (this.justificationType != "TEXT") {
              this.justificationList = p.actions_with_confirm_user[idx][this.actionName].list_entries
            }
          }
          this.type = "user"
          bypass = false
        } else if (p.actions_with_justification_phrase.indexOf(this.actionName) >= 0) {
          let idx = p.actions_with_justification_phrase.findIndex(p => p == this.actionName)
          --idx // the object is on the previous index
          if (p.actions_with_justification_phrase[idx][this.actionName].type) {
            this.justificationType = p.actions_with_justification_phrase[idx][this.actionName].type
            if (this.justificationType===undefined||this.justificationType.length==0||this.justificationType.length==='LABPLANET_FALSE'){
              console.log('In procedure business rules, for action '+this.actionName+', No confirmDialogDetail specified, it will use TEXT then')
              this.justificationType="TEXT"
            }
  
            if (this.justificationType != "TEXT") {
              this.justificationList = p.actions_with_justification_phrase[idx][this.actionName].list_entries
            }
          }
          this.type = "justification"
          bypass = false
        } else if (p.actions_with_action_confirm.indexOf(this.actionName) >= 0) {
          this.type = "confirm"
          bypass = false
        }
      if (bypass) return true
    }
  
    trazitNextRequest(action, actionParams, credArguments, gridSelectedItem, parentData) {
      if (action===undefined||action.actionName===undefined){
        action=this.actionBeingPerformedModel
      }
      action = action || this.auditAction ||this.actionBeingPerformedModel;
      console.log('trazitNextRequest', 'credArguments', credArguments)
      if (action!==undefined&&action.alternativeItemPropertyName!==undefined){
        this.selectedItems=this[action.alternativeItemPropertyName]
      }
      if (this.selectedItems===undefined){
        this.selectedItems=[]
        this.selectedItems.push({})
      }
      if (this.targetValue===undefined){
        this.targetValue={}
      }
      if (action!==undefined){
        this.trazitPerformAPICall(action, actionParams, credArguments, gridSelectedItem, gridSelectedItem)
      }
      let cleanParams = {}
      Object.entries(this.reqParams).map(([key, value]) => {
        if (value != null || value != undefined) {
          cleanParams[key] = value
        }
      })
      this.reqParams = cleanParams
      if (this.credDialog) {
        if (action===undefined
          ||action.keepTheDialogOpen===undefined
          ||action.keepTheDialogOpen===false){
              this.credDialog.close()
        }else{
          // e.stopPropagation()
        }
      }
    }
    async trazitPerformAPICall(action, actionParams, credDialogArgs = {}, selectedItem, gridSelectedItem = {}) {
      sessionStorage.removeItem('actionInfoToAPIcall');
      if (action.alternativeAPIActionMethod !== undefined) {
        this[action.alternativeAPIActionMethod]()
        return
      }
      if (gridSelectedItem === undefined || gridSelectedItem === null) {
        if (this.genericDialogGridSelectedItems !== undefined && this.genericDialogGridSelectedItems.length > 0) {
          gridSelectedItem = this.genericDialogGridSelectedItems[0]
        }
      }
      
      let APIParams = this.getAPICommonParams(action)
      let serviceAPIurl = this.getServiceAPIUrl(action)
      let endPointUrl = this.getActionAPIUrl(action)
      if (String(endPointUrl).toUpperCase().includes("ERROR")) {
        alert(endPointUrl)
        return
      }
      let params = ""
      params = serviceAPIurl + endPointUrl
      params = params + '?' + new URLSearchParams(APIParams) + '&' + new URLSearchParams(actionParams) + '&' + new URLSearchParams(credDialogArgs)
    
      try {
        const j = await this.fetchApi(params)
        
        if (action !== undefined) {
          await this.refreshMasterData(j, action)
        }
    
        if (action.notGetViewData === undefined || action.notGetViewData === false) {
          this.GetViewData()
        }
    
        this.selectedItems[0] = selectedItem;
        action = this.actionBeingPerformedModel
        let actionRefreshQuery = []
        if (action.dialogInfo !== undefined && action.dialogInfo.name !== undefined && action.dialogInfo.name === 'resultDialog') {
          if (action.dialogInfo.keyFldName !== undefined) {
            this.actionMethodResults(action, this.selectedItems, this.selectedItems[0][action.dialogInfo.keyFldName])
          } else {
            if (action.dialogInfo.viewQuery.endPointParams[0].selObjectPropertyName !== undefined) {
              this.actionMethodResults(action, this.selectedItems, this.selectedItems[0][action.dialogInfo.viewQuery.endPointParams[0].selObjectPropertyName])
            } else {
              this.actionMethodResults(action, this.selectedItems, '')
            }
          }
        }
    
        if (action !== undefined && action.dialogInfo !== undefined && action.dialogInfo.name !== undefined
          && action !== null && action.dialogInfo !== null && action.dialogInfo.name !== null) {
          if (this[action.dialogInfo.name] !== undefined) {
            this[action.dialogInfo.name].close()
          }
        }
    
        if (action.secondaryActionToPerform !== undefined) {
          this[action.secondaryActionToPerform.name]()
        }
    
        if (action.variableToSetResponse !== undefined) {
          if (this[action.variableToSetResponse] !== undefined) {
            this[action.variableToSetResponse] = j
          }
        }
    
      } catch (error) {
        console.error('Error performing API call:', error)
      }
    }
    
  
    credsChecker(actionName, objId, params={}, action, isProcManagement, gridSelectionData, parentData, dragEntry, dropEntry) {
      console.log('credsChecker', 'isProcManagement', isProcManagement, 'action', action, 'parentData', parentData)
      this.actionObj = action || {}
      this.reqParams = params
      if (actionName) {
        this.actionName = actionName
        if (objId == -1) {
          this.credDialog.show()
        } else {
          this.objectId = objId
          let noNeedCreds = this.checkProcList(isProcManagement)
          if (noNeedCreds) {
            this.nextRequest(action, gridSelectionData, parentData, dragEntry, dropEntry)
          } else {
            if (this.type == "confirm") {
              this.confirmDialog.show()
            } else {
              this.credDialog.show()
            }
          }
        }
      }
    }
    checkProcList(isProcManagement) {
      if (isProcManagement===undefined){
        let userSession=JSON.parse(sessionStorage.getItem("userSession"))
        isProcManagement=userSession.isProcManagement
      }         
      if (this.isProcManagement!==undefined&&this.isProcManagement===true){
        return true
      }
      if (this.area!==undefined&&this.area==="app"){
        return true
      }
      //console.log('trazitCheckProcList')
      let bypass = true
      // this.justificationType = null
      // this.justificationList = null
      // let procList2 = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
      // bypass = true
      // procList2.forEach(p => {
      //   //let idx = p.actions_with_confirm_user.findIndex(p => p == this.actionName)
      //   //if (p.actions_with_esign[idx][this.actionName].type) {
      //     //this.justificationType = p.actions_with_esign[idx][this.actionName].type
      //     //if (this.justificationType != "TEXT") {
      //     //  this.justificationList = p.actions_with_esign[idx][this.actionName].list_entries
      //     //}
      //   //}
      // })
      // this.type = "esign"
      // bypass = false
      // return bypass
  
  
  
      // // this.type = "confirm"
      // // bypass = false
      // // alert('Temporalmente en credDialog, toda acción requiere confirmacion')
      // // return bypass
      // alert('Temporalmente en credDialog, se ha deshabilitado el tema de las confirmaciones ... ')
      // return true
      this.justificationType = null
      this.justificationList = null
      let pArr = []
      let procList = JSON.parse(sessionStorage.getItem("userSession")).procedures_list.procedures
      if (isProcManagement!==undefined&&isProcManagement===true){
        pArr = procList.filter(p => p.procInstanceName == 'proc_management')
      }else{
        pArr = procList.filter(p => p.procInstanceName == this.procInstanceName)
      }
      if (isProcManagement&&(pArr===undefined||pArr.length==0)){
        return true
      }
      let p = pArr[0]
      bypass = true
  //    procList.forEach(p => {
        if (p.actions_with_esign.indexOf(this.actionName) >= 0) {
          let idx = p.actions_with_esign.findIndex(p => p == this.actionName)
          --idx // the object is on the previous index
          if (p.actions_with_esign[idx][this.actionName].type) {
            this.justificationType = p.actions_with_esign[idx][this.actionName].type
            if (this.justificationType != "TEXT") {
              this.justificationList = p.actions_with_esign[idx][this.actionName].list_entries
            }
          }
          this.type = "esign"
          bypass = false
        } else if (p.actions_with_confirm_user.indexOf(this.actionName) >= 0) {
          let idx = p.actions_with_confirm_user.findIndex(p => p == this.actionName)
          --idx // the object is on the previous index
          if (p.actions_with_confirm_user[idx][this.actionName].type) {
            this.justificationType = p.actions_with_confirm_user[idx][this.actionName].type
            if (this.justificationType != "TEXT") {
              this.justificationList = p.actions_with_confirm_user[idx][this.actionName].list_entries
            }
          }
          this.type = "user"
          bypass = false
        } else if (p.actions_with_justification_phrase.indexOf(this.actionName) >= 0) {
          let idx = p.actions_with_justification_phrase.findIndex(p => p == this.actionName)
          --idx // the object is on the previous index
          if (p.actions_with_justification_phrase[idx][this.actionName].type) {
            this.justificationType = p.actions_with_justification_phrase[idx][this.actionName].type
            if (this.justificationType===undefined||this.justificationType.length==0||this.justificationType.length==='LABPLANET_FALSE'){
              console.log('In procedure business rules, for action '+this.actionName+', No confirmDialogDetail specified, it will use TEXT then')
              this.justificationType="TEXT"
            }
  
            if (this.justificationType != "TEXT") {
              this.justificationList = p.actions_with_justification_phrase[idx][this.actionName].list_entries
            }
          }
          this.type = "justification"
          bypass = false
        } else if (p.actions_with_action_confirm.indexOf(this.actionName) >= 0) {
          this.type = "confirm"
          bypass = false
        }
    //  })
      // bypass / no need creds process
      if (bypass) return true
    }
  }}
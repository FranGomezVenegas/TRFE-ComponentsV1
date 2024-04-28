import { html } from "lit";
export function ListsFunctions(base) {
    return class extends (base) {
        listEntries(fld, multilist=false){
            if (multilist===undefined){multilist=false}
            let newList=this.entriesForTheList(fld, multilist)
            if (newList===undefined){
                return html``
            }
            if (multilist){
                return newList.filter(entry => entry.keyName.length > 0).map(entry => entry.keyName).join('|');
                //return newList.map(entry => entry.keyName).join('|');            
            }
            return html`
            ${newList.map((c, i) =>
                html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
            )}`                    
        }
        entriesForTheList(fld, multilist=false){

            console.log('listEntries', fld, multilist)
            let blankEmpty={keyName:"", keyValue_en:"", keyValue_es:""}
            let newList=[]
            if (fld===undefined){
                return html`<mwc-list-item></mwc-list-item>`
            }
            if (fld.addBlankValueOnTop!==undefined&&fld.addBlankValueOnTop===true){
                newList.push(blankEmpty)
            }
            if (fld.valuesFromMasterData!==undefined){
                let MDentriesArr=this.listEntriesFromMasterData(fld.valuesFromMasterData)
                if (MDentriesArr.length>0){
                    MDentriesArr.forEach(item =>newList.push(item))
                }
            } else if (fld.valuesFromSelectedItem!==undefined){
                let MDentriesArr=this.listEntriesFromSelectedItem(fld.valuesFromSelectedItem)
                if (MDentriesArr.length>0){
                    MDentriesArr.forEach(item =>newList.push(item))
                }
            }else{
                fld.items.forEach(item =>newList.push(item))
            }            
            if (fld.addBlankValueAtBottom!==undefined&&fld.addBlankValueAtBottom===true){
                newList.push(blankEmpty)
            }
            return newList;            
            if (multilist){
                return newList.filter(entry => entry.keyName.length > 0).map(entry => entry.keyName).join('|');
                //return newList.map(entry => entry.keyName).join('|');            
            }
            
            return html`
            ${newList.map((c, i) =>
                html`<mwc-list-item value="${c.keyName}" ?selected=${i == 0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
            )}
            `
        }
        listEntriesForUom(fld, fldName){
            console.log('listEntriesForUom')
            let blankEmpty={keyName:"", keyValue_en:"", keyValue_es:""}
            let defValue=""
            let newList=[]
            if (fld===undefined){
                return html`<mwc-list-item></mwc-list-item>`
            }
            if (fld.addBlankValueOnTop!==undefined&&fld.addBlankValueOnTop===true){
                newList.push(blankEmpty)
            }
            if (fld.the_default_value!==undefined){
                if (fld.the_default_value.default_value!==undefined&&fldObj[keyName].default_value!==null){
                    blankEmpty={keyName:fld.the_default_value.default_value, keyValue_en:fld.the_default_value.default_value, keyValue_es:fld.default_value.default_value}
                    newList.push(blankEmpty)            
                }
                if (fld.the_default_value.selObjectPropertyName!==undefined&&fld.the_default_value.selObjectPropertyName!==null){
                    let val=""
                    if (this.selectedItems!==undefined&&this.selectedItems.length>0){
                        val=this.selectedItems[0][fld.the_default_value.selObjectPropertyName]
                        const valueArray = val.split("|");
                        valueArray.forEach((item) => {
                            const blankEmpty = {keyName: item, keyValue_en: item, keyValue_es: item}     
                            const isDuplicate = newList.some(item => item.keyName === item);
                            if (!isDuplicate) {
                                if (this[fldName]!==null&&this[fldName].value.length===0){
                                    defValue=item
                                    this[fldName].value=item
                                }
                                newList.push(blankEmpty);
                            }                                                               
                        })                             
                    }
                }
                if (fld.the_default_value.internalVariableObjName!==undefined&&fld.the_default_value.internalVariableObjName!==null&&
                    fld.internalVariableObjProperty!==undefined&&fld.internalVariableObjProperty!==null){
                        let val=this[fld.the_default_value.internalVariableObjName][0][fld.internalVariableObjProperty]
                        blankEmpty={keyName:val, keyValue_en:val, keyValue_es:val}
                        const isDuplicate = newList.some(item => item.keyName === val);
                        if (!isDuplicate) {
                          newList.push(blankEmpty);
                        }                             
    //                this[keyName[0]].value=this[fld.internalVariableObjName][0][fld.internalVariableObjProperty]
                    }
            }
            if (fld.list_values!==undefined){
                if (fld.list_values.default_value!==undefined&&fldObj[keyName].default_value!==null){
                    blankEmpty={keyName:fld.list_values.default_value, keyValue_en:fld.list_values.default_value, keyValue_es:fld.list_values.default_value}
                    newList.push(blankEmpty)            
                }
                if (fld.list_values.selObjectPropertyName!==undefined&&fld.list_values.selObjectPropertyName!==null){
                    let val=this.selectedItems[0][fld.list_values.selObjectPropertyName]
                    const valueArray = val.split("|");
                    valueArray.forEach((item) => {
                      const blankEmpty = {keyName: item, keyValue_en: item, keyValue_es: item}                
                      const isDuplicate = newList.some(item => item.keyName === item);
                      if (!isDuplicate) {
                        newList.push(blankEmpty);
                      }                             
                    })             
                }
                if (fld.list_values.internalVariableObjName!==undefined&&fld.list_values.internalVariableObjName!==null&&
                    fld.internalVariableObjProperty!==undefined&&fld.internalVariableObjProperty!==null){
                        let val=this[fld.list_values.internalVariableObjName][0][fld.internalVariableObjProperty]
                        blankEmpty={keyName:val, keyValue_en:val, keyValue_es:val}
                        const isDuplicate = newList.some(item => item.keyName === val);
                        if (!isDuplicate) {
                          newList.push(blankEmpty);
                        }                             
                }
            }
            return html`
            ${newList.map((c, i) =>
                html`<mwc-list-item value="${c.keyName}" defval="${defValue}" ?selected=${fld.addBlankValueOnTop!==undefined&&fld.addBlankValueOnTop===true&&fld.default_value!==undefined? i == 1: i==0}>${c["keyValue_" + this.lang]}</mwc-list-item>`
            )}
            `
        }   
    
        getProcMasterData(){
            if (this.isProcManagement===undefined||this.isProcManagement!==true){
                let userSession = JSON.parse(sessionStorage.getItem("userSession"))
                //console.log('userSession.procedures_list.procedures', userSession.procedures_list.procedures)
                let findProc =[]
                if (this.area!==undefined){
                    findProc = userSession.procedures_list.procedures.filter(m => m.procInstanceName == this.area)
                }else{
                    findProc = userSession.procedures_list.procedures.filter(m => m.procInstanceName == this.procInstanceName)
                }
                // if (!this.config.local) {
                //   if (findProc.length) {
                //     ProceduresModel[this.procName] = findProc[0].procModel
                //   }
                // }
            //        this.procInstanceModel=ProceduresModel[this.procName]
                if (findProc!==undefined&&findProc.length>0&&findProc[0].master_data!==undefined){
                this.masterData=findProc[0].master_data
                //console.log('master data', this.masterData)   
                }
            }else{
                let userSession = JSON.parse(sessionStorage.getItem("userSession"))
                this.masterData=userSession.proc_management_masterdata
            }
        }
        listEntriesFromMasterData(fldMDDef){
            this.getProcMasterData()
            return this.buildFrontListFromData(fldMDDef, this.masterData)
        }
    
        listEntriesFromSelectedItem(fldMDDef){     
            
            let data=[]
            
            if (fldMDDef!==null&&fldMDDef.defval!==undefined&&fldMDDef.defval!==null){
                alert(fldMDDef.defval)
            }    
            if (fldMDDef!==null&&fldMDDef!==undefined&&fldMDDef.default_value!==undefined&&fldMDDef.default_value!==null){
                data=fldMDDef.default_value
            }
            if (fldMDDef!==null&&fldMDDef!==undefined&&fldMDDef.selObjectPropertyName!==undefined&&fldMDDef.selObjectPropertyName!==null&&fldMDDef!==null){
                data=this.selectedItems[0][fldMDDef.selObjectPropertyName]
            }
            if (fldMDDef!==null&&fldMDDef!==undefined&&fldMDDef.internalVariableObjName!==undefined&&fldMDDef.internalVariableObjName!==null&&
                fldMDDef.internalVariableObjProperty!==undefined&&fldMDDef.internalVariableObjProperty!==null){
                data=this[fldMDDef.internalVariableObjName][0][fldMDDef.internalVariableObjProperty]
            }
            if (fldMDDef!==null&&fldMDDef!==undefined&&fldMDDef.internalVariableSingleObjName!==undefined&&fldMDDef.internalVariableSingleObjName!==null&&
                fldMDDef.internalVariableSingleObjProperty!==undefined&&fldMDDef.internalVariableSingleObjProperty!==null){
                data=this[fldMDDef.internalVariableSingleObjName][fldMDDef.internalVariableSingleObjProperty]
            }
    
            let entries=[]
            if (data!==undefined){
                data.forEach(item =>{
                    console.log('item', item, 'fldMDDef.propertyNameContainer.propertyKeyName', fldMDDef.propertyKeyName)
                    let blankEmpty={keyName:'', keyValue_en:'', keyValue_es:''}
                    blankEmpty.keyName=item[fldMDDef.propertyKeyName]
    
                    let valEn=''
                    fldMDDef.propertyKeyValueEn.forEach(item2=>{
                        if (valEn.length>0){valEn=valEn+'-'}
                        valEn=valEn+item[item2]
                    })
                    blankEmpty.keyValue_en=valEn
                    let valEs=''
                    fldMDDef.propertyKeyValueEn.forEach(item2=>{
                        if (valEs.length>0){valEs=valEs+'-'}
                        valEs=valEs+item[item2]
                    })
                    blankEmpty.keyValue_es=valEs
                    console.log('blankEmpty', blankEmpty)
                    entries.push(blankEmpty)
                })
            }
            return entries        
            //return this.buildFrontListFromData(fldMDDef, this.selectedProcedureInstance)
        }
        buildFrontListFromData(fldMDDef, data){
            if (data===undefined){return []}
            console.log('masterData', data)
            console.log('actionBeingPerformedModel', this.actionBeingPerformedModel)
            let entries=[]
            
            if (data[fldMDDef.propertyNameContainer]===undefined){
                alert('Property '+fldMDDef.propertyNameContainer+' not found in Master Data')
                return entries
            }
            if (fldMDDef.filterInFirstLevel===undefined||fldMDDef.filterInFirstLevel!==true){
                data[fldMDDef.propertyNameContainer].forEach(item =>{
                   // console.log('item', item, 'fldMDDef.propertyNameContainer.propertyKeyName', fldMDDef.propertyKeyName)
                    let blankEmpty={keyName:'', keyValue_en:'', keyValue_es:''}
                    blankEmpty.keyName=item[fldMDDef.propertyKeyName]
                    blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn]
                    blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs]
                    //console.log('blankEmpty', blankEmpty)
                    entries.push(blankEmpty)
                })
            }else{
                // if ((fldMDDef.elementName===undefined||fldMDDef.elementName===null)&&
                //     (fldMDDef.propertyNameContainerLevelfixValue===undefined||fldMDDef.propertyNameContainerLevelfixValue===null)
                //     (fldMDDef.contextVariableName===undefined||fldMDDef.contextVariableName===null)
                //     ((fldMDDef.internalVariableSimpleObjName===undefined||fldMDDef.internalVariableSimpleObjName===null) || (fldMDDef.internalVariableSimpleObjProperty===undefined||fldMDDef.internalVariableSimpleObjProperty===null))
                //     ){
                //     alert('Property elementName or propertyNameContainerLevelfixValue is mandatory when filterInFirstLevel=true. Review model definition')
                //     return entries
                // }
                let filterValue=undefined
                if (fldMDDef.propertyNameContainerLevelfixValue!==undefined){
                    filterValue=fldMDDef.propertyNameContainerLevelfixValue                
                } else if (fldMDDef.elementName!==undefined){
                    filterValue=this[fldMDDef.elementName].value
                } else if (fldMDDef.contextVariableName!==undefined) {
                    filterValue=this[fldMDDef.contextVariableName]                
                } else if (fldMDDef.internalVariableSimpleObjName!==undefined&&fldMDDef.internalVariableSimpleObjProperty!==undefined){
                    filterValue=this[fldMDDef.internalVariableSimpleObjName][fldMDDef.internalVariableSimpleObjProperty]
                }
                let filterPropertyName="name"
                if (fldMDDef.filterPropertyName!==undefined){
                    filterPropertyName=fldMDDef.filterPropertyName
                }
                if (filterValue===undefined){return entries}
                let result = data[fldMDDef.propertyNameContainer].find(item => item[filterPropertyName] === filterValue);
                if (result===undefined){return entries}
                //alert(filterValue)
                // if (fldMDDef.propertyNameContainerLevel2fixValue!==undefined&&fldMDDef.propertyNameContainerLevel3){
                //     entries=getListInLevel3(fldMDDef, result[fldMDDef.propertyNameContainerLevel2])
                //     return entries
                // }
                result[fldMDDef.propertyNameContainerLevel2].forEach(item =>{
                    console.log('item', item, 'fldMDDef.propertyNameContainer.propertyKeyName', fldMDDef.propertyKeyName)
                    let blankEmpty={keyName:'', keyValue_en:'', keyValue_es:''}
                    blankEmpty.keyName=item[fldMDDef.propertyKeyName]
                    blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn]
                    blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs]
                    console.log('blankEmpty', blankEmpty)
                    entries.push(blankEmpty)
                })
                console.log('entries at end', entries)
                return entries
                
            }        
            //let blankEmpty={keyName:"1", keyValue_en:"2", keyValue_es:"3"}
            //entries.push(blankEmpty)
            return entries
        }
        getListInLevel3(fldMDDef, level2Arr){
            let level3Arr = level2Arr.filter(p => p[propertyNameContainerLevel2PropertyKeyName] == fldMDDef.propertyNameContainerLevel2fixValue)
            level3Arr[fldMDDef.propertyNameContainerLevel3].forEach(item =>{
                console.log('item', item, 'fldMDDef.propertyNameContainer.propertyKeyName', fldMDDef.propertyNameContainerLevel2PropertyKeyName)
                let blankEmpty={keyName:'', keyValue_en:'', keyValue_es:''}
                blankEmpty.keyName=item[fldMDDef.propertyKeyName]
                blankEmpty.keyValue_en=item[fldMDDef.propertyKeyValueEn]
                blankEmpty.keyValue_es=item[fldMDDef.propertyKeyValueEs]
                console.log('blankEmpty', blankEmpty)
                entries.push(blankEmpty)
            })
        }
    }
}

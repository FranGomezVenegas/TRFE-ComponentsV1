import { html } from "lit";

export function GetDataFromContextFunctions(base) {
    return class extends (base) {
        dataFromMasterData(fldMDDef, data){
            if (fldMDDef.propertyNameContainer===undefined){
                alert('Property propertyNameContainer not found in this field definition, check console.log')
                console.log('Property propertyNameContainer not found in this field definition, check console.log', fldMDDef)
                return []
            }
            if (String(fldMDDef.propertyNameContainer).toUpperCase()==="ROOT"){
                return data
            }else{
                if (data[fldMDDef.propertyNameContainer]===undefined){
                    alert('Property '+fldMDDef.propertyNameContainer+' not found in Master Data')
                    return []
                }
                return data[fldMDDef.propertyNameContainer]
            }
        } 
        
        dataFromSelectedItem(fldMDDef){                 
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
            return data
        }         
}}
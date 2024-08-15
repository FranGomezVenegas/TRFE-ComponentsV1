import { html } from "lit";
import { ListsFunctions } from "../../form_fields/lists-functions";
export function TreeFunctions(base) {
    return class extends ListsFunctions(base) {
        treeListEntries(fld, data){            
            if (fld.valuesFromMasterData!==undefined){                
                this.getProcMasterData()
                console.log(fld, this.masterData)
                let MDentriesArr = this.dataFromMasterData(fld.valuesFromMasterData, this.masterData);
                return MDentriesArr
                // if (MDentriesArr.length > 0) {
                //     newList = [...newList, ...MDentriesArr];
                // }    
            }            
            if (fld.items!==undefined){
                return fld.items
            }            
            if (data!==undefined){
                return data
            }
            return []
        } 
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
}}


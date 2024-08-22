import { html } from "lit";
import { ListsFunctions } from "../../form_fields/lists-functions";
import { GetDataFromContextFunctions } from "../../0TRAZiT-Paradigm/GetDataFromContext";
export function TreeFunctions(base) {
    return class extends GetDataFromContextFunctions(ListsFunctions(base)) {
        treeListEntries(fld, data){            
            if (fld.valuesFromMasterData!==undefined){                
                this.getProcMasterData()
                console.log(fld, this.masterData)
                return this.dataFromMasterData(fld.valuesFromMasterData, this.masterData);
            }
            if (fld.valuesFromSelectedItem) {
                return this.dataFromSelectedItem(fld.valuesFromSelectedItem)
            }
            if (fld.items!==undefined){
                return fld.items
            }            
            if (data!==undefined){
                return data
            }
            return []
        } 
   
}}


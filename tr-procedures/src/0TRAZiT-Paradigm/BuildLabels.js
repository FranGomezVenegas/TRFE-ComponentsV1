import { html } from "lit";

export function BuildLabelsFunctions(base) {
    return class extends (base) {
    
    // Función pública
    buildLabel(lang, model, dataObj){
        if (lang===undefined){
            lang=this.lang
        }
        if (model===undefined){
            return 'buildLabel-N/D' 
        }
        if (dataObj===undefined){
            if (model["fixLabel_"+lang]!==undefined){
                return model["fixLabel_"+lang]
            }
            if (model.fixLabel!==undefined){
                return model.fixLabel
            }
            return 'buildLabel-N/D' 
        }
        if (model.labelByConcatenateFields!==undefined){
            return this._buildLabelFromArrayOfItems(model.labelByConcatenateFields, dataObj)
        }
        if (model["propertyKeyValue"+lang]!==undefined){
            return dataObj[model["propertyKeyValue"+lang]]
        }
        if (model[labelSingleField+"_"+lang]!==undefined){
            return dataObj[model[labelSingleField+"_"+lang]]
        }
        if (model.labelSingleField!==undefined){
            return dataObj[model.labelSingleField]
        }
        if (model["fixLabel_"+lang]!==undefined){
            return model["fixLabel_"+lang]
        }
        if (model.fixLabel!==undefined){
            return model.fixLabel
        }        
    }

    // Función privada
    _buildLabelFromArrayOfItems(property, row){
        let separator='-'
        if (property.separator!==undefined){
            separator=property.separator
        }
        let entireLabel=''
        if (property.fields===undefined){
            return 'buildLabel-labelByConcatenateFields. fields missing' 
        }
        property.fields.forEach(item2=>{
            if (entireLabel.length>0){entireLabel=entireLabel+separator}
            entireLabel=entireLabel+row[item2]
        })
        return entireLabel
    }        
}
}
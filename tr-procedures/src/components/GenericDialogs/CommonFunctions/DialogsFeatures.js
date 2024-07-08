import { html } from "lit";
export function DialogsFeatures(base) {
    return class extends (base) {
        isFieldDisabled(fld){        
            if (fld.disabled!==undefined&&fld.disabled===true){
                return true
            }
            return false
        }
    
        fldDisabled(){
            return false
        }   
    
        fieldLabel(fld){        
            let fldLbl= fld["label_" + this.lang]
            if (fld.optional===undefined||fld.optional===false){
                fldLbl="* "+fldLbl
            }
            return fldLbl
        }        
    }
}
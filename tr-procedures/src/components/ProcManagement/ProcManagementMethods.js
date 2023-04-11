export function ProcManagementMethods(base) {
    return class extends (base) {
        selectedProcedureInstance(e){    
            this.selectedProcInstance=this.allProcedures.find(item => item.proc_instance_name === e.currentTarget.id);        
            this.render()
          }
          resetView(){
            this.selectedProcInstance=undefined
            this.selectedViewDefinition=undefined
            this.GetViewData(this.viewModelFromProcModel.viewQuery)
            this.render()
          }  
        
        testScriptPerformed(){
            //alert('testScriptPerformed')
            let mye={}
            mye.currentTarget={}
            mye.currentTarget.id=this.procInstanceName
            //this.resetView()
            //this.selectedProcedureInstance(mye)    
          }
          coveragePerformed(){
            
        }        
    }
}
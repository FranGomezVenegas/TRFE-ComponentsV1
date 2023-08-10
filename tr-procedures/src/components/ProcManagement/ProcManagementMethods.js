export function ProcManagementMethods(base) {
    return class extends (base) {
      selectedProcedureInstance(e) {
        this.selectedProcInstance = this.allProcedures.find(
          (item) => item.proc_instance_name === e.currentTarget.id
        );
  
        // Show the default tab which has the expanded property as true
        this.defaultView =
          this.selectedProcInstance.views.findIndex((item) => item.expanded) || 0;
        this.selectSectionView(this.defaultView);
        this.render();
      }
      openSop(e){
        if (window) {
          window.open(this.selectedItems[0].file_link, '_blank').focus()
        }
      }
      procMngRequirementsMethod(e){        
        this.credsChecker(this.actionBeingPerformedModel.actionName, null, this.jsonParam(this.actionBeingPerformedModel, this.selectedItems[0]), this.actionBeingPerformedModel, true)
      }
      testScriptPerformed(){
          alert('testScriptPerformed')
          let mye={}
          mye.currentTarget={}
          mye.currentTarget.id=this.procInstanceName
          //this.resetView()
          //this.selectedProcedureInstance(mye)    
        }
        coveragePerformed(){
          alert('coveragePerformed')
          
      }        
    }
}
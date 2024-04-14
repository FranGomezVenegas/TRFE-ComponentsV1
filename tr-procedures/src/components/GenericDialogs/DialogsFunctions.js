import { ButtonsFunctions } from '../Buttons/ButtonsFunctions';
import { ActionsFunctions } from '../Actions/ActionsFunctions';

export function DialogsFunctions(base) {
    return class extends ActionsFunctions(ButtonsFunctions(base)) {

        dialogAccept(selected=true) {
          if (this.actionBeingPerformedModel.clientMethod!==undefined){
            this[this.actionBeingPerformedModel.clientMethod]()
            return
          }
          if (selected) {
              this.trazitCredsChecker(this.actionBeingPerformedModel.actionName, this.selectedItems[0].sample_id, this.jsonParam(this.actionBeingPerformedModel, this.selectedItems[0]), this.actionBeingPerformedModel)
          } else {
              this.trazitCredsChecker(this.actionBeingPerformedModel.actionName, null, this.jsonParam(this.actionBeingPerformedModel, this.selectedItems[0]), this.actionBeingPerformedModel)
          }
        }

        dialogAcceptForGrid(selected=true, gridSelectedObject) {
          //console.log('dialogAccept before run trazitCredsChecker')
          if (this.actionBeingPerformedModel.clientMethod!==undefined){
            this[this.actionBeingPerformedModel.clientMethod]()
            return
          }
          if (selected) {
              this.trazitCredsChecker(this.actionBeingPerformedModel.actionName, this.selectedItems[0].sample_id, this.jsonParam(this.actionBeingPerformedModel, this.selectedItems[0], null, gridSelectedObject), this.actionBeingPerformedModel)
          } else {
              this.trazitCredsChecker(this.actionBeingPerformedModel.actionName, null, this.jsonParam(this.actionBeingPerformedModel, this.selectedItems[0], null, gridSelectedObject), this.actionBeingPerformedModel)
          }
        }        


    }
}
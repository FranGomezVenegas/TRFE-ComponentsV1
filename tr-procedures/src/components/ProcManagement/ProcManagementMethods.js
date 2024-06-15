export function ProcManagementMethods(base) {
  return class extends base {
    cardActions = [
      {
        "actionName": "LOCK_PROCEDURE",
        "notGetViewData": true,
        "clientMethod": "procMngRequirementsMethod",
        "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
        "selectedItemPropertyName": "selectedItems",
        "requiresDialog": false,
        "certificationException": true,
        "secondaryActionToPerform": {
          "name": "refreshAllProceduresView"
        },
        "button": {
          "icon": "lock",
          "title": {
            "label_en": "Lock procedure",
            "label_es": "Bloquear proceso"
          },
          "requiresGridItemSelected": false,
          "hideWhenSelectedItem": {
            "column": "locked_for_actions",
            "value": true
          }  
        },
        "endPointParams": [
          {
            "argumentName": "procedureName",
            "selObjectPropertyName": "procedure_name"
          },
          {
            "argumentName": "procedureVersion",
            "selObjectPropertyName": "procedure_version"
          },
          {
            "argumentName": "procInstanceName",
            "selObjectPropertyName": "proc_instance_name"
          }
        ]
      },
      {
        "actionName": "UNLOCK_PROCEDURE",
        "notGetViewData": true,
        "clientMethod": "procMngRequirementsMethod",
        "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
        "selectedItemPropertyName": "selectedItems",
        "requiresDialog": false,
        "certificationException": true,
        "secondaryActionToPerform": {
          "name": "refreshAllProceduresView"
        },
        "button": {
          "icon": "lock_open",
          "title": {
            "label_en": "Unlock procedure",
            "label_es": "Desbloquear proceso"
          },
          "requiresGridItemSelected": false,
          "showWhenSelectedItem": {
            "column": "locked_for_actions",
            "value": true
          }  
        },
        "endPointParams": [
          {
            "argumentName": "procedureName",
            "selObjectPropertyName": "procedure_name"
          },
          {
            "argumentName": "procedureVersion",
            "selObjectPropertyName": "procedure_version"
          },
          {
            "argumentName": "procInstanceName",
            "selObjectPropertyName": "proc_instance_name"
          }
        ]
      }      
    ];
    selectedProcedureInstance(e) {
      this.selectedProcInstance = this.allProcedures.find(
        (item) => item.proc_instance_name === e.currentTarget.id
      );

      this.selectSectionView(0);
      this.render();
    }

    openSop(e) {
      if (window) {
        let urlVal="file_link"
        console.log(e)
        if (this.actionBeingPerformedModel.fieldWithUrl!==undefined){
          urlVal=this.actionBeingPerformedModel.fieldWithUrl
        }
        window.open(this.selectedItems[0][urlVal], "_blank").focus();
      }
    }

    procMngRequirementsMethod(e) {
      this.trazitCredsChecker(
        this.actionBeingPerformedModel.actionName,
        null,
        this.jsonParam(this.actionBeingPerformedModel, this.selectedItems[0]),
        this.actionBeingPerformedModel,
        true
      );
    }

    async testScriptPerformed() {
      // All actions should perform the refresh below to refresh the data in the view/window then it can do anything extra if required
      await this.refreshSelProcData();
    }

    async coveragePerformed() {
      // All actions should perform the refresh below to refresh the data in the view/winzdow then it can do anything extra if required
      await this.refreshSelProcData();
    }
    
    async refreshMainView() { 
      const event = new CustomEvent("refresh-main-view", {
        detail: {
          key: "newProcInstance",
          value: newProcInstance,
        },
      });
      window.dispatchEvent(event);
    }

    async refreshSelProcData() {      
      let viewQuery = {
        actionName: "ONE_PROCEDURE_DEFINITION",
        label_en: "One Procedure Definition",
        label_es: "Definición de un proceso",
        endPoint: "/appProcMgr/RequirementsProcedureDefinitionAPIQueries",
        notUseGrid: true,
        variableName: "selectedProcInstance",
        endPointResponseVariableName: "all_platform_procedures_list",
      };
      await this.GetViewData(false, viewQuery);
      // As by the specification above, this query will run this endpoint and then moved the data from endPointResponseVariableName response entry
      // into variableName variable.
      // In our case all_platform_procedures_list is an array of one entry and this content will be moved to this.selectedProcInstance variable
      let newProcInstance = this.selectedProcInstance?.[0];
      if (!newProcInstance) return;

      sessionStorage.setItem("newProcInstance", JSON.stringify(this.selectedProcInstance[0]));

      const event = new CustomEvent("session-storage-updated", {
        detail: {
          key: "newProcInstance",
          value: newProcInstance,
        },
      });
      window.dispatchEvent(event);
    }

    async refreshAllProceduresView() {
      let viewQuery = {
        actionName: "ALL_PROCEDURES_DEFINITION",
        area: "app",
        label_en: "All Procedures Definition",
        label_es: "Definición de todos los procesos",
        endPoint: "/appProcMgr/RequirementsProcedureDefinitionAPIQueries",
        notUseGrid: true,
        variableName: "allProcedures",
        endPointResponseVariableName: "all_platform_procedures_list",
      };
      //alert('refreshAllProceduresView')
      await this.GetViewData(false, viewQuery);
      const event = new CustomEvent("refresh-all-procedures", {
      });
      window.dispatchEvent(event);      
    }


  };
}

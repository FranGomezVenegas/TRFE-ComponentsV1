export function ProcManagementMethods(base) {
  return class extends base {
    selectedProcedureInstance(e) {
      this.selectedProcInstance = this.allProcedures.find(
        (item) => item.proc_instance_name === e.currentTarget.id
      );

      this.selectSectionView(0);
      this.render();
    }

    openSop(e) {
      if (window) {
        window.open(this.selectedItems[0].file_link, "_blank").focus();
      }
    }

    procMngRequirementsMethod(e) {
      this.credsChecker(
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
  };
}

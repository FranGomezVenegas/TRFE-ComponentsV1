import { html, nothing } from 'lit';
export function ReadOnlyTableIsLockedFunctions(base) {
  return class extends (base) {  

    get rowTooltip() {
        return this.shadowRoot.querySelector("#rowTooltip")
    }
    get grid() {return this.shadowRoot.querySelector("vaadin-grid#mainGrid")}

    showLockReason(item, lang) {
      if (!this.rowTooltip) return;
      if (!lang){
        lang="en"
      }
      if (item.is_locked) {
        this.rowTooltip.style.backgroundColor = "#24C0EB";
        this.rowTooltip.style.color = "white";
        this.rowTooltip.style.fontSize = "16px";
        this.rowTooltip.style.visibility = "visible";
        let textToShow='undefined'
        if (item["locked_reason_"+lang]!==undefined){
          textToShow=item["locked_reason_"+lang]
        }
        if (textToShow==='undefined'){
          if (item["locking_reason"]!==undefined){
            textToShow=item.locking_reason["message_"+lang]
          }            
        }
        this.rowTooltip.textContent = 'Locking Reason: '+textToShow;
      } else if (item.warning_reason) {
        this.rowTooltip.style.backgroundColor = "#D6E9F8";
        this.rowTooltip.style.color = "white";
        this.rowTooltip.style.fontSize = "16px";
        this.rowTooltip.style.visibility = "visible";
        let textToShow='undefined'
        if (item["warning_reason_"+lang]!==undefined){
          textToShow=item["warning_reason_"+lang]
        }
        if (textToShow==='undefined'){
          if (item["warning_reason"]!==undefined){
            textToShow=item.warning_reason["message_"+lang]
          }            
        }
        this.rowTooltip.textContent = `Warning Reason: `+textToShow;
      }
    }    

    hideLockReason() {
      if (!this.rowTooltip) return;
      this.rowTooltip.style.visibility = "hidden";
    }

    setCellListener(tableName, dataArr, lang) {
      if (!this.rowTooltip) return;

      const table = this.shadowRoot.querySelector("#" + tableName);
      if (!table) return;

      const rows = table.querySelectorAll("tbody tr");
      rows.forEach((row, i) => {
        const item = dataArr[i];
        if (item) {
          // Remove existing event listeners using bound methods
          row.removeEventListener('mouseenter', this._boundShowLockReason);
          row.removeEventListener('mouseleave', this._boundHideLockReason);

          // Bind the context of the methods and store them so they can be removed later
          this._boundShowLockReason = this.showLockReason.bind(this, item, lang);
          this._boundHideLockReason = this.hideLockReason.bind(this);

          // Add new event listeners
          if (item.is_locked || item.warning_reason) {
            row.addEventListener('mouseenter', this._boundShowLockReason);
            row.addEventListener('mouseleave', this._boundHideLockReason);
          }
        }
      });
    }
}}
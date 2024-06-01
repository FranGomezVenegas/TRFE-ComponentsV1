import { html, nothing, css } from 'lit';

export function LeftPaneFilterViews(base) {
  return class extends base {
    
    static get properties() {
      return {
        selectedIndex: { type: Number }
      };
    }

    filterElement(data){      
      if (data === undefined) { return }
      //this.selectedIndex=filterIndex
      return html`
        ${this.viewModelFromProcModel.filterResultDetail !== undefined && this.viewModelFromProcModel.filterResultDetail.type !== undefined 
          && this.viewModelFromProcModel.filterResultDetail.type === "list" ? html`
            ${this.filterAsList(data)}` : nothing}        
      `;
    }
    
    filterAsList(data) {
      let elem = this.viewModelFromProcModel;
      let dataArr = Array.isArray(data) ? data : [data];
      if (elem === undefined || dataArr === undefined) {
        return html`data undefined`;
      }
      if (this.selectedIndex===undefined){this.selectedIndex=0}
      return html`
        
        ${Array.isArray(dataArr) && dataArr.length > 0
          ? html`
              <style>
                li.no_success {
                  color: red;
                }
                li.success {
                  color: #3880d4;
                }
                li {
                  cursor: pointer;
                  font-size: 1.7vmin;
                  transition: all 0.2s ease-in-out;
                }
                li:hover {
                  background-color: rgba(41, 137, 216, 0.1);
                }
                .item {
                  height: 30px;
                  line-height: 30px;
                  text-align: center;
                  background: linear-gradient(45deg, #54CCEF, #03A9F4);
                  border: 1px solid #03A9F4;
                  border-radius: 8px;
                  display: flex;
                  margin: 2px;
                  cursor: pointer;
                  color: white;
                  width: 100%;
                }
                .selected {
                  
                  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                  transform: translateY(0);
                  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
                  background: linear-gradient(79deg, #384c8e, #29064e);
                  --mdc-theme-primary: transparent;                  
                }
                .search-item {
                  text-align: center;
                  width: 100%;
                }
                .index {
                  width: 36px;
                  height: 30px;
                  text-align: center;
                  flex-shrink: 0;
                  background-color: #24C0EB;
                  border-radius: 12px 0px 0px 12px;
                }
                .index selected{
                  #07091f
                }

                #leftpanefilteritems{
                  padding-top: 20px;
                  width: 100%;
                }
              </style>
              <div id="leftpanefilteritems" style="padding-top:5px;">
              ${dataArr.map(
                (d, i) =>
                  html`
                    <div role="button" class="item ${this.selectedIndex === i ? 'selected' : ''}" 
                    @click=${() => this.filterElementClicked(i)} .thisitem="${d}" .elementdef="${elem}">
                      <div class="index ${this.selectedIndex === i ? 'selected' : ''}" > ${i + 1} </div>
                      <div class="search-item"> 
                        ${elem.filterResultDetail.detail.map((curFld, index) => html`
                          ${d[curFld.field]}${index !== elem.filterResultDetail.detail.length - 1 ? ' ,' : ''}
                        `)}
                      </div>
                    </div>
                  `
              )}
              </div>
            `
          : nothing}
      `;
    }

    filterElementClicked = (i) => {
      this.selectedIndex = i;
      this.selectedItem = this.requestData[i];
      this.selectedItemInView = this.requestData[i];
      this.requestUpdate();
    }
  }
}

import { html, nothing} from 'lit';


export function LeftPaneFilterViews(base) {
  return class extends  base {
    
    filterElement(data){
      if (data===undefined){return}
      return html`
        ${this.viewModelFromProcModel.filterResultDetail !== undefined&&this.viewModelFromProcModel.filterResultDetail.type !== undefined 
          &&this.viewModelFromProcModel.filterResultDetail.type==="list"? html`
            ${this.filterAsList(data)}`: nothing}        
      `
    }
    
    
    filterAsList(data) {
      let elem=this.viewModelFromProcModel
      //console.log('filterAsList', elem.filterResultDetail, data)
      let dataArr=[]
      if (!Array.isArray(data)){        
        dataArr.push(data)        
      }else{
        dataArr=data
      }
      //let data=this.userSessionsList
      if (elem===undefined){html`data undefined`}
      if (dataArr === undefined) {
        return html`data undefined`
      }
      return html`
        ${Array.isArray(dataArr) && dataArr.length > 0
          ? html`
              <style>
                li.no_success {
                  color: red;
                }
                li.success {
                  color: #3880d4;
                };
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
                  background-color: #54CCEF;
                  border: 1px solid #03A9F4;
                  display: flex;
                  border-radius: 12px;
                  cursor: pointer;
                  color: white;
                  width: 100%;
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
                  border-radius: 12px 0px 0px 12px
                }
              </style>
              ${dataArr===undefined?html`dataArr is undefined`:
              html`  
                ${dataArr.map(
                  (d, i) =>
                    html`
                      <div role="button"  class="success item" @click=${() => this.filterElementClicked(i)} 
                      .thisitem="${d}" .elementdef="${elem}">
                        <div class="index"> ${i + 1} </div>
                        <div class="search-item"> 
                          ${elem.filterResultDetail.detail.map((curFld, index) => html`
                          ${d[curFld.field]}${index !== elem.filterResultDetail.detail.length - 1 ? ' ,' : ''}
                        </div>
                      `)}
                      </div>
                    `
                )}
              `}
            `
          : nothing}
      `;
    }

    filterElementClicked = (i) => {
      this.selectedItem=this.requestData[i]      
      this.selectedItemInView=this.requestData[i]
      //alert(this.selectedItemInView.name)
      this.requestUpdate()
      this.render()
    }
  } 
}
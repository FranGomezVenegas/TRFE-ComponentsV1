import { html, nothing } from 'lit';
import { ApiFunctions } from '../Api/ApiFunctions';
import { ClientMethod } from '../../../src/ClientMethod';
import { ProcManagementMethods } from '../../components/ProcManagement/ProcManagementMethods';
import { ActionsFunctions } from '../Actions/ActionsFunctions';
import { ExportTableToCsv } from '../../features/exportTableToCsv';
import { PrintableTable } from '../../features/printableTable';
export function ButtonsFunctions(base) {
  return class extends PrintableTable(ExportTableToCsv(ProcManagementMethods(ClientMethod(ActionsFunctions(ApiFunctions(base)))))) {


    getButtonForRows(actions, data, isProcManagement, parentData) {
      //console.log('getButtonForRows', 'actions', actions, 'data', data, 'parentData', parentData)
      if (actions === undefined) { actions = this.viewModelFromProcModel }
      return html`
        <style>
          mwc-icon-button#lang {        
            color : #1473e6; /* rgba(36, 192, 235, 1); */
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }
          mwc-button {
            background-color: #1473e6; /* rgba(36, 192, 235, 1); */
            font-family: Montserrat;
            font-weight: bold;
            font-size: 19px;
            --mdc-theme-primary:#1473e6; /* rgba(36, 192, 235, 1); */
            border-radius: 12px;
          }
          mwc-button.button {        
            color : #1473e6; /* rgba(36, 192, 235, 1); */
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
            background: rgb(36, 192, 235) none repeat scroll 0% 0%;
            font-family: Montserrat;
            font-weight: bold;
            font-size: 19px;
            color: white;
            border-color: transparent !important;
            --mdc-button-fill-color: red;
            --mdc-button-ink-color: blue;
            border-radius: 12px;
          }            
          mwc-icon-button {        
            color : #1473e6; /* rgba(36, 192, 235, 1); */
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }
          mwc-icon-button.disabledtrue{
            color : red;
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }
          mwc-icon-button#video {
            color : #FFFFFF;
            color : #1473e6; /* rgba(36, 192, 235, 1); */
          }
          sp-button {
            background : #24C0EB;
            background : rgba(36, 192, 235, 1);
            border-color : inherit !important;
            border-radius : 35px;
            -moz-border-radius : 35px;
            -webkit-border-radius : 35px;
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
            color : #FFFFFF;
            color : rgb(255, 255, 255);
          }
          mwc-textfield {
            border-style : Solid;
            border-color : #999999;
            border-color : rgba(153, 153, 153, 1);
            border-width : 1px;
            border-radius : 7px;
            -moz-border-radius : 7px;
            -webkit-border-radius : 7px;
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
            background-color :  #FFFFFF;
            background-color : rgb(255, 255, 255);
            background: rgba(255, 255, 255, 0) none repeat scroll 0% 0%;
          }
          mwc-textfield.mdc-text-field {
            background-color :  #FFFFFF;
            background-color : rgb(255, 255, 255);
          }
          mwc-textfield.mdc-textfield.mdc-floating-label {
            color: red;
          }
        </style>
          ${actions !== undefined && actions.map(action =>
        html`
          ${this.btnHiddenForRows(action, data) ? nothing :
            html`${action.button ?
              html`${action.button.icon ?
                html`<mwc-icon-button
                  class="${action.button.class} disabled${this.btnDisabled(action, actions)}"
                  icon="${action.button.icon}" id="${action.actionName}"
                  title="${action.button.title['label_' + this.lang]}"
                  ?disabled=${this.btnDisabled(action, actions)}
                  ?hidden=${this.btnHiddenForRows(action, data)}
                  @click=${(e) => this.trazitButtonsMethod(e, true, action, actions, null, null, data, isProcManagement, parentData)}></mwc-icon-button>` :
                html`${action.button.img ?
                  html`<mwc-icon-button
                  class="${action.button.class} disabled${this.btnDisabled(action, actions)} img"
                  title="${action.button.title['label_' + this.lang]}" id="${action.actionName}"
                  ?disabled=${this.btnDisabled(action, actions)}
                  ?hidden=${this.btnHiddenForRows(action, data)}
                  @click=${(e) => this.trazitButtonsMethod(e, true, action, actions, null, null, data, isProcManagement, parentData)}>
                      <img class="iconBtn" src="images/${action.button.img}">
                  </mwc-icon-button>` :
                  html`<mwc-button dense raised
                  label="${action.button.title['label_' + this.lang]}" id="${action.actionName}"
                  class="${action.button.class} disabled${this.btnDisabled(action, actions)} img"
                  ?disabled=${this.btnDisabled(action, actions)}
                  ?hidden=${this.btnHiddenForRows(action, data)}
                  @click=${(e) => this.trazitButtonsMethod(e, true, action, actions, null, null, data, isProcManagement, parentData)}></mwc-button>`
                  }`
                }` :
              nothing
              }`
          }`
      )}
      `
    }

    getButton(sectionModel, data, isProcManagement) {
      if (sectionModel === undefined) { sectionModel = this.viewModelFromProcModel }
      //console.log("getButtondatasectionModel", sectionModel);
      //console.log('getButtondata', data)

      let refreshable={enable: true, icon:"refresh", title:{label_en:"Reload", label_es: "Recargar"}}
      if (sectionModel.viewQuery!==undefined&&sectionModel.viewQuery.refreshable!==undefined){
        if (sectionModel.viewQuery.refreshable.enable!==undefined){
          refreshable.enable=sectionModel.viewQuery.refreshable.enable
        }
        if (sectionModel.viewQuery.refreshable.title!==undefined){
          refreshable.title=sectionModel.viewQuery.refreshable.title
        }
        if (sectionModel.viewQuery.refreshable.icon!==undefined){
          refreshable.icon=sectionModel.viewQuery.refreshable.icon
        }
      }
      if (sectionModel.refreshable!==undefined){
        if (sectionModel.refreshable.enable!==undefined){
          refreshable.enable=sectionModel.refreshable.enable
        }
        if (sectionModel.refreshable.title!==undefined){
          refreshable.title=sectionModel.refreshable.title
        }
        if (sectionModel.refreshable.icon!==undefined){
          refreshable.icon=sectionModel.refreshable.icon
        }
      }

      let printable={enable: true, icon:"print", title:{label_en:"Print", label_es: "Imprimir"}}
      if (sectionModel.viewQuery!==undefined&&sectionModel.viewQuery.printable!==undefined){
        if (sectionModel.viewQuery.printable.enable!==undefined){
          printable.enable=sectionModel.viewQuery.printable.enable
        }
        if (sectionModel.viewQuery.printable.title!==undefined){
          printable.title=sectionModel.viewQuery.printable.title
        }
        if (sectionModel.viewQuery.printable.icon!==undefined){
          printable.icon=sectionModel.viewQuery.printable.icon
        }
      }
      if (sectionModel.printable!==undefined){
        if (sectionModel.printable.enable!==undefined){
          printable.enable=sectionModel.printable.enable
        }
        if (sectionModel.printable.title!==undefined){
          printable.title=sectionModel.printable.title
        }
        if (sectionModel.printable.icon!==undefined){
          printable.icon=sectionModel.printable.icon
        }
      }
      
      let downloadable={enable: true, icon:"download", title:{label_en:"Export", label_es: "Exportar"}}
      if (sectionModel.viewQuery!==undefined&&sectionModel.viewQuery.downloadable!==undefined){
        if (sectionModel.viewQuery.downloadable.enable!==undefined){
          downloadable.enable=sectionModel.viewQuery.downloadable.enable
        }
        if (sectionModel.viewQuery.downloadable.title!==undefined){
          downloadable.title=sectionModel.viewQuery.downloadable.title
        }
        if (sectionModel.viewQuery.downloadable.icon!==undefined){
          downloadable.icon=sectionModel.viewQuery.downloadable.icon
        }
      }
      if (sectionModel.downloadable!==undefined){
        if (sectionModel.downloadable.enable!==undefined){
          downloadable.enable=sectionModel.downloadable.enable
        }
        if (sectionModel.downloadable.title!==undefined){
          downloadable.title=sectionModel.downloadable.title
        }
        if (sectionModel.downloadable.icon!==undefined){
          downloadable.icon=sectionModel.downloadable.icon
        }
      }

																																											 
															
									 
			   
											  
						   
		  
      return html`
        <style>
          mwc-icon-button#lang {        
            color : #1473e6; /* rgba(36, 192, 235, 1); */
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }
          mwc-button {
            background-color: #1473e6; /* rgba(36, 192, 235, 1); */
            font-family: Montserrat;
            font-weight: bold;
            font-size: 19px;
            --mdc-theme-primary:#1473e6; /* rgba(36, 192, 235, 1); */
            border-radius: 12px;
          }
          mwc-button.button {        
            color : #1473e6; /* rgba(36, 192, 235, 1); */
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
            background: rgb(36, 192, 235) none repeat scroll 0% 0%;
            font-family: Montserrat;
            font-weight: bold;
            font-size: 19px;
            color: white;
            border-color: transparent !important;
            --mdc-button-fill-color: red;
            --mdc-button-ink-color: blue;
            border-radius: 12px;
          }            
          mwc-icon-button {        
            color : #1473e6; /* rgba(36, 192, 235, 1); */
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }
          mwc-icon-button.disabledtrue{
            color : red;
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
          }
          mwc-icon-button#video {
            color : #FFFFFF;
            color : #1473e6; /* rgba(36, 192, 235, 1); */
          }
          sp-button {
            background : #24C0EB;
            background : #1473e6; /* rgba(36, 192, 235, 1); */
            border-color : inherit !important;
            border-radius : 35px;
            -moz-border-radius : 35px;
            -webkit-border-radius : 35px;
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
            color : #FFFFFF;
            color : rgb(255, 255, 255);
          }
          mwc-textfield {
            border-style : Solid;
            border-color : #999999;
            border-color : rgba(153, 153, 153, 1);
            border-width : 1px;
            border-radius : 7px;
            -moz-border-radius : 7px;
            -webkit-border-radius : 7px;
            font-family : Montserrat;
            font-weight : bold;
            font-size : 19px;
            background-color :  #FFFFFF;
            background-color : rgb(255, 255, 255);
            background: rgba(255, 255, 255, 0) none repeat scroll 0% 0%;
          }
          mwc-textfield.mdc-text-field {
            background-color :  #FFFFFF;
            background-color : rgb(255, 255, 255);
          }
          mwc-textfield.mdc-textfield.mdc-floating-label {
            color: red;
          }
        </style>
          ${refreshable.enable===true ?html`
          <mwc-icon-button
              ${refreshable===undefined||refreshable.class===undefined?'':html`class="${refreshable.class}"`}          
              icon="${refreshable.icon}" id="refresh"
              title="${refreshable.title['label_' + this.lang]}"
              @click=${() => this.GetViewData()}
              style="${refreshable.style !== undefined ? refreshable.style : ''}">
          </mwc-icon-button>` : nothing
        }
        ${printable.enable===true ?html`
          <mwc-icon-button 
              ${printable===undefined||printable.class===undefined?'':html`class="${printable.class}"`}
              icon="${printable.icon}" id="printable" 
              title="${printable.title['label_' + this.lang]}"             
              @click=${() => this.printTable()}
              style="${printable!==undefined&&printable.style !== undefined ? printable.style : ''}">
          </mwc-icon-button>` : nothing
        }
        ${downloadable.enable === true ?
          html`
          <mwc-icon-button 
          ${downloadable===undefined||downloadable.class===undefined?'':html`class="${downloadable.class}"`}
              icon="${downloadable.icon}" id="downloadable" 
              title="${downloadable.title['label_' + this.lang]}"             
              @click=${() => this.downloadDataTableToCSV(sectionModel, data, this.selectedItems, downloadable)}
              style="${downloadable!==undefined&&downloadable.style !== undefined ? downloadable.style : ''}">
          </mwc-icon-button>` : nothing
        }                
          ${sectionModel !== undefined && sectionModel.actions && sectionModel.actions.map(action =>
          html`

              ${this.btnHidden(action, data) ? nothing :
                  html`${action.button ?
                    html`${action.button.icon ?
                      html`<mwc-icon-button id="${action.actionName}"
                                                                                      
                      class="${action.button.class} disabled${this.btnDisabled(action, sectionModel)}"
                      icon="${action.button.icon}" 
                      title="${action.button.title['label_' + this.lang]}" 
                      ?disabled=${this.btnDisabled(action, sectionModel)}
                      ?hidden=${this.btnHidden(action, data)}
                      style="${action.button.style !== undefined ? action.button.style : ''}"
                      .data=${data}
                      @click=${(e) => this.trazitButtonsMethod(e, false, action, sectionModel, null, null, data, isProcManagement)}></mwc-icon-button>` :
                      html`${action.button.img ?
                        html`<mwc-icon-button  id="${action.actionName}"
                      class="${this.btnDisabled(action, sectionModel) === true ? 'disabledtrue' : 'disabledfalse'}"
                      title="${action.button.title['label_' + this.lang]}" 
                      ?disabled=${this.btnDisabled(action, sectionModel)}
                      ?hidden=${this.btnHidden(action, data)}
                      style="${action.button.style !== undefined ? action.button.style : ''}"
                      .data=${data}
                      @click=${(e) => this.trazitButtonsMethod(e, false, action, sectionModel, null, null, data, isProcManagement)}>
                          <img class="iconBtn" src="images/${this.giveFileName(action, sectionModel)}">
                      </mwc-icon-button>` :
                        html`<mwc-button dense raised id="${action.actionName}"
                      label="${action.button.title['label_' + this.lang]}" 
                      ?disabled=${this.btnDisabled(action, sectionModel)}
                      ?hidden=${this.btnHidden(action , data)}
                      style="${action.button.style !== undefined ? action.button.style : ''}"
                      .data=${data}
                      @click=${(e) => this.trazitButtonsMethod(e, false, action, sectionModel, null, null, data, isProcManagement)}></mwc-button>`
                        }`
                      }` :
                    nothing
                    }`
                }
          `
        )}
      `
    }
	getSmartFilterButton(sectionModel, data, isProcManagement,lang) {
		let action=sectionModel.smartFilter
		if(action==undefined){return}
		if (sectionModel === undefined) { sectionModel = this.viewModelFromProcModel }
		console.log("getButtondatasectionModel", sectionModel);
		console.log('getButtondata', data)
		return html`
		  <style>
			mwc-icon-button#lang {
			  color : rgba(36, 192, 235, 1);
			  font-family : Montserrat;
			  font-weight : bold;
			  font-size : 19px;
			}
			mwc-button {
			  background-color: rgba(36, 192, 235, 1);
			  font-family: Montserrat;
			  font-weight: bold;
			  font-size: 19px;
			  --mdc-theme-primary:rgba(36, 192, 235, 1);
			  border-radius: 12px;
			}
			mwc-button.button {
			  color : rgba(36, 192, 235, 1);
			  font-family : Montserrat;
			  font-weight : bold;
			  font-size : 19px;
			  background: rgb(36, 192, 235) none repeat scroll 0% 0%;
			  font-family: Montserrat;
			  font-weight: bold;
			  font-size: 19px;
			  color: white;
			  border-color: transparent !important;
			  --mdc-button-fill-color: red;
			  --mdc-button-ink-color: blue;
			  border-radius: 12px;
			}
			mwc-icon-button {
			  color : rgba(36, 192, 235, 1);
			  font-family : Montserrat;
			  font-weight : bold;
			  font-size : 19px;
			}
			mwc-icon-button.disabledtrue{
			  color : red;
			  font-family : Montserrat;
			  font-weight : bold;
			  font-size : 19px;
			}
			mwc-icon-button#video {
			  color : #FFFFFF;
			  color : rgba(36, 192, 235, 1);
			}
			sp-button {
			  background : #24C0EB;
			  background : rgba(36, 192, 235, 1);
			  border-color : inherit !important;
			  border-radius : 35px;
			  -moz-border-radius : 35px;
			  -webkit-border-radius : 35px;
			  font-family : Montserrat;
			  font-weight : bold;
			  font-size : 19px;
			  color : #FFFFFF;
			  color : rgb(255, 255, 255);
			}
			mwc-textfield {
			  border-style : Solid;
			  border-color : #999999;
			  border-color : rgba(153, 153, 153, 1);
			  border-width : 1px;
			  border-radius : 7px;
			  -moz-border-radius : 7px;
			  -webkit-border-radius : 7px;
			  font-family : Montserrat;
			  font-weight : bold;
			  font-size : 19px;
			  background-color :  #FFFFFF;
			  background-color : rgb(255, 255, 255);
			  background: rgba(255, 255, 255, 0) none repeat scroll 0% 0%;
			}
			mwc-textfield.mdc-text-field {
			  background-color :  #FFFFFF;
			  background-color : rgb(255, 255, 255);
			}
			mwc-textfield.mdc-textfield.mdc-floating-label {
			  color: red;
			}
		  </style>
      ${refreshable.enable===true ?html`
        <mwc-icon-button
            ${refreshable===undefined||refreshable.class===undefined?'':html`class="${refreshable.class}"`}          
            icon="${refreshable.icon}" id="refresh"
            title="${refreshable.title['label_' + this.lang]}"
            @click=${() => this.GetViewData()}
            style="${refreshable.style !== undefined ? refreshable.style : ''}">
        </mwc-icon-button>` : nothing
      }                	  
			${this.btnHidden(action) ? nothing :
				html`${action.button ?
				  html`${action.button.icon ?
					html`<mwc-icon-button id="${action.actionName}"
					class="${action.button.class} disabled${this.btnDisabled(action, sectionModel)}"
					icon="${action.button.icon}"
					title="${action.button.title['label_' +lang]}"
					?disabled=${this.btnDisabled(action, sectionModel)}
					?hidden=${this.btnHidden(action)}
					style="${action.button.style !== undefined ? action.button.style : ''}"
					@click=${(e) => this.trazitButtonsMethod(e, false, action, sectionModel, null, null, data, isProcManagement)}></mwc-icon-button>` :
					html`${action.button.img ?
					  html`<mwc-icon-button  id="${action.actionName}"
					class="${this.btnDisabled(action, sectionModel) === true ? 'disabledtrue' : 'disabledfalse'}"
					title="${action.button.title['label_' + lang]}"
					?disabled=${this.btnDisabled(action, sectionModel)}
					?hidden=${this.btnHidden(action)}
					style="${action.button.style !== undefined ? action.button.style : ''}"
					@click=${(e) => this.trazitButtonsMethod(e, false, action, sectionModel, null, null, data, isProcManagement)}>
						<img class="iconBtn" src="images/${this.giveFileName(action, sectionModel)}">
					</mwc-icon-button>` :
					  html`<mwc-button dense raised id="${action.actionName}"
					label="${action.button.title['label_' + lang]}"
					?disabled=${this.btnDisabled(action, sectionModel)}
					?hidden=${this.btnHidden(action)}
					style="${action.button.style !== undefined ? action.button.style : ''}"
					@click=${(e) => this.trazitButtonsMethod(e, false, action, sectionModel, null, null, data, isProcManagement)}></mwc-button>`
					  }`
					}` :
				  nothing
				  }`
			  }`

	}
    giveFileName(action, sectionModel) {
      const originalExtension = action.button.img.split('.').pop();
      let imgUrl = action.button.img.replace(/\.[^/.]+$/, `_${this.btnDisabled(action, sectionModel) === true ? 'disabledtrue' : 'disabledfalse'}.${originalExtension}`);
      return imgUrl
    }

    btnDisabled(action, viewModelFromProcModel) {

      //console.log(action)
      let selRecord = []
      if (viewModelFromProcModel.alternativeItemPropertyName !== undefined) {
        selRecord = this[viewModelFromProcModel.alternativeItemPropertyName]
      } else {
        selRecord = this.selectedItems
      }
      let d = false
      if (action.certificationException !== undefined && action.certificationException === true) { return false }
      if (selRecord === undefined || selRecord.length == 0) {
        if (action.button.requiresGridItemSelected !== undefined &&
          action.button.requiresGridItemSelected === false) {
          d = this.disabledByCertification(action)
          //console.log('btnDisabled', 'disabledByCertification returned ', d)
          return d
        }
        return true
      }

      //console.log('btnDisabled', viewModelFromProcModel.viewName, 'action', action)
      if (viewModelFromProcModel === undefined) { viewModelFromProcModel = this.viewModelFromProcModel }


      if (action.mode !== undefined && action.mode.toString().toUpperCase() === "READONLY") {
        return true
      }
      if (viewModelFromProcModel.mode !== undefined && viewModelFromProcModel.mode.toString().toUpperCase() === "READONLY") {
        return true
      }
      // if (action.buttonForQuery!==undefined && action.buttonForQuery===true) {
      //   if (action.button.requiresGridItemSelected!==undefined&&
      //     action.button.requiresGridItemSelected===true){
      //       return false
      //   }else{
      //     return false
      //   }
      // }
      if (action.buttonForQuery !== undefined && action.buttonForQuery === true) {
      } else {
        d = this.disabledByCertification(action)
        //console.log('btnDisabled', 'disabledByCertification returned ', d)
        if (d) { return d }
      }
      if (action.button.requiresGridItemSelected !== undefined) {
        if (action.button.requiresGridItemSelected === false) {
          return false
        }

        if (viewModelFromProcModel.alternativeItemPropertyName !== undefined) {
          //console.log('viewModelFromProcModel.alternativeItemPropertyName', viewModelFromProcModel.alternativeItemPropertyName)
          if (this[viewModelFromProcModel.alternativeItemPropertyName] === undefined) {
            return true
          } else {
            if (this[viewModelFromProcModel.alternativeItemPropertyName].length > 0) {
              return false
            } else {
              return true
            }
          }
        } else {
          if (selRecord === undefined) {
            return true
          } else {
            if (selRecord[0] !== undefined) {
              return false
            } else {
              return true
            }
          }
        }
      }
      return d
    }
    btnHiddenForRows(action, selItems) {
      let selRow=selItems[0]
      //console.log('btnHiddenForRows', 'action', action, 'selRow', selRow, 'show', action.button.showWhenSelectedItem, 'hide', action.button.hideWhenSelectedItem)
      let d = false
      if (selRow !== undefined && selRow["No Data"] !== undefined) { return true }
      if (action.button.showWhenSelectedItem !== undefined&&selItems.length===1) {
        //console.log('btnHidden')
        if (selRow === undefined || selRow === undefined) { return true } // keep hide when no selection
        if (Array.isArray(action.button.showWhenSelectedItem)) {
          action.button.showWhenSelectedItem.forEach(rowArray => {
            let curValue = String(rowArray.value).split('|')
            //console.log(rowArray.value, selRow[rowArray.column])

            if (rowArray.value === "*NULL*") {

              if (selRow[rowArray.column].length == 0) {
                d = false
              }
            } else if ( String(rowArray.value).toUpperCase().includes("*NOT")&&
                        String(rowArray.value).toUpperCase().includes("NULL*")) {                          
              if (selRow[rowArray.column].length > 0) {
                d = false
              }
            } else {
              if (curValue.includes(selRow[rowArray.column])) {
                d = true
              } else {
                d = false
              }
            }
          })
          return d
        } else { //then it is json object
          if (action.button.showWhenSelectedItem.value === "*NULL*") {
            if (selRow[action.button.showWhenSelectedItem.column].length == 0) {
              return false
            } else { return true }
          } else if ( String(action.button.showWhenSelectedItem.value).toUpperCase().includes("*NOT")&&
                      String(action.button.showWhenSelectedItem.value).toUpperCase().includes("NULL*")) {                          
            if (selRow[action.button.showWhenSelectedItem.column].length > 0) {
              return false
            } else { return true }
          } else if (selRow[action.button.showWhenSelectedItem.column] !== action.button.showWhenSelectedItem.value) {
            return true
          } else {
            return false
          }
        }
      } else if (action.button.hideWhenSelectedItem !== undefined&&selItems.length===1) {
        if (selRow === undefined || selRow === undefined) { return true } // keep shown when no selection
        if (Array.isArray(action.button.hideWhenSelectedItem)) {
          action.button.hideWhenSelectedItem.forEach(rowArray => {
            if (rowArray.value === "*NULL*") {
              if (selRow[rowArray.column].length == 0) {
                d = true
              } else { d = false }
            } else if ( String(rowArray.value).toUpperCase().includes("*NOT")&&
                        String(rowArray.value).toUpperCase().includes("NULL*")) {                          
              if (selRow[rowArray.column].length > 0) {
                d = true
              } else { d = false }
            } else {
              if (selRow[rowArray.column] != rowArray.value) {
                d = true
              } else { d = false }
            }
          })
          return !d
        } else { //then it is json object
          if (action.button.hideWhenSelectedItem.value === "*NULL*") {
            if (selRow[action.button.hideWhenSelectedItem.column].length == 0) {
              return true
            } else {
              return false
            }
          } else if ( String(action.button.hideWhenSelectedItem.value).toUpperCase().includes("*NOT")&&
                      String(action.button.hideWhenSelectedItem.value).toUpperCase().includes("NULL*")) {                          
            if (selRow[action.button.hideWhenSelectedItem.column].length > 0) {
              return true
            } else {
              return false
            }
          } else if (selRow[action.button.hideWhenSelectedItem.column] === action.button.hideWhenSelectedItem.value) {
            return true
          } else {
            return false
          }
        }
      } else {
        d = false
      }
      return d
    }
    btnHidden(action, selItems) {
      let selRow=selItems[0]      
      if (selItems!==undefined){
        if (selItems.length>1
          &&(action.button===undefined||action.button.requiresGridItemSelected===undefined||action.button.requiresGridItemSelected===true)
          &&(action.actionForMultiSelect===undefined||action.actionForMultiSelect!==true)){
          return true
        }
        return this.btnHiddenForRows(action, selItems)
      }
      let d = false
      if (action===undefined||action.button===undefined){return d}
      if (action.button.showWhenSelectedItem !== undefined&&selItems.length===1) {
        //console.log('btnHidden')
        if (this.selectedItems === undefined || this.selectedItems[0] === undefined) { return true } // keep hide when no selection
        if (Array.isArray(action.button.showWhenSelectedItem)) {
          action.button.showWhenSelectedItem.forEach(rowArray => {
            let curValue = String(rowArray.value).split('|')
            //console.log(rowArray.value, this.selectedItems[0][rowArray.column])

            if (rowArray.value === "*NULL*") {
              if (this.selectedItems[0][rowArray.column].length == 0) {
                d = true
              }
            } else if ( String(rowArray.value).toUpperCase().includes("*NOT")&&
                        String(rowArray.value).toUpperCase().includes("NULL*")) {                          
              if (this.selectedItems[0][rowArray.column].length > 0) {
                d = true
              }
            } else {
              if (curValue.includes(this.selectedItems[0][rowArray.column])) {
                d = true
              } else {
                d = false
              }
            }
          })
          return d
        } else { //then it is json object
          if (action.button.showWhenSelectedItem.value === "*NULL*") {
            if (this.selectedItems[0][action.button.showWhenSelectedItem.column].length == 0) {
              d = true
            }
          } else if ( String(action.button.showWhenSelectedItem.value).toUpperCase().includes("*NOT")&&
                      String(action.button.showWhenSelectedItem.value).toUpperCase().includes("NULL*")) {
            if (this.selectedItems[0][action.button.showWhenSelectedItem.column].length > 0) {
              d = true
            }
          } else if (this.selectedItems[0][action.button.showWhenSelectedItem.column] !== action.button.showWhenSelectedItem.value) {
            return true
          } else {
            return false
          }
        }
      } else if (action.button.hideWhenSelectedItem !== undefined&&selItems.length===1) {
        if (this.selectedItems === undefined || this.selectedItems[0] === undefined) { return true } // keep shown when no selection
        if (Array.isArray(action.button.hideWhenSelectedItem)) {
          action.button.hideWhenSelectedItem.forEach(rowArray => {
            if (rowArray.value === "*NULL*") {
              if (this.selectedItems[0][rowArray.column].length == 0) {
                d = true
              }
            } else if ( String(rowArray.value).toUpperCase().includes("*NOT")&&
                        String(rowArray.value).toUpperCase().includes("NULL*")) {                          
              if (this.selectedItems[0][rowArray.column].length > 0) {
                d = true
              }
            } else {
              if (this.selectedItems[0][rowArray.column] != rowArray.value) {
                d = true
              }
            }
          })
          return !d
        } else { //then it is json object
          if (action.button.hideWhenSelectedItem.value === "*NULL*") {
            if (this.selectedItems[0][action.button.hideWhenSelectedItem.column].length == 0) {
              d = true
            }
          } else if ( String(action.button.hideWhenSelectedItem.value).toUpperCase().includes("*NOT")&&
                      String(action.button.hideWhenSelectedItem.value).toUpperCase().includes("NULL*")) {                          
            if (this.selectedItems[0][action.button.hideWhenSelectedItem.column].length > 0) {
              d = true
            }
          } else if (this.selectedItems[0][action.button.hideWhenSelectedItem.column] === action.button.hideWhenSelectedItem.value) {
            return true
          } else {
            return false
          }
        }
      } else {
        d = false
      }
      return d
    }


    getFromMasterData() {
      if (this.procInstanceName === undefined) {
        alert("Proc Instance Name not found")
        return
      }
      //alert(this.procInstanceName)

      if (this.masterData === undefined) { return entries }
      console.log('masterData', this.masterData)
      console.log('actionBeingPerformedModel', this.actionBeingPerformedModel)
      let entries = []

      if (this.masterData[this.viewModelFromProcModel.viewQuery.actionName] === undefined) {
        alert('Property ' + fldMDDef.propertyNameContainer + ' not found in Master Data')
        return []
      } else {
        return this.masterData[this.viewModelFromProcModel.viewQuery.actionName]
      }
      // let setGrid = true
      // if (setGrid){
      //   if (entries && !entries.is_error) {
      //     this.setGrid(entries)
      //   } else {
      //     this.setGrid()
      //   }
      // }
    }

    setTheValues(queryDefinition, j) {
      if (queryDefinition.notUseGrid !== undefined && queryDefinition.notUseGrid === true) {
        if (queryDefinition.variableName !== undefined) {
          if (queryDefinition.endPointResponseVariableName !== undefined) {
            this[queryDefinition.variableName] = j[queryDefinition.endPointResponseVariableName]
          } else {
            this[queryDefinition.variableName] = j
          }
        } else {
          this.selectedItems = j
          this.selectedItem = this.selectedItems[0]
          console.log('this.selectedItems', this.selectedItems)
          if (j && !j.is_error) {
            this.requestData = j
          } else {
            this.requestData = {}
          }
        }
      } else {
        this.ready = true
        if (this.setGrid !== undefined) {
          if (j && !j.is_error) {
            this.setGrid(j)
          } else {
            this.setGrid()
          }
        } else {
          if (j && !j.is_error) {
            this.requestData = j
          } else {
            this.requestData = {}
          }
        }
      }
      this.samplesReload = false
    }


    async GetViewData(setGrid = true, viewQuery) {
      // const stack = new Error().stack;
      // const stackLines = stack.split('\n');
      // if (stackLines!==null&&stackLines[1]!==null){
      //   const callerName = stackLines[1].match(/at (\w+)/)[0]; // Adjust the index as needed
      //   console.log("Called from: " + callerName);
      // }
      if (viewQuery === undefined) {
        viewQuery = this.viewModelFromProcModel.viewQuery;
      }
      let queryDefinition = viewQuery;
      if (queryDefinition === undefined) { return; }
      let params = {};
    
      if (viewQuery !== undefined && viewQuery.clientMethod !== undefined) {
        if (this[viewQuery.clientMethod] === undefined) {
          alert('not found any clientMethod called ' + viewQuery.clientMethod);
          return;
        }
        let j = this[viewQuery.clientMethod]();
        this.setTheValues(viewQuery, j);
        return;
      }
    
      if (this.config === undefined || this.config.backendUrl === undefined) {
        // fetch('../../../demo/config.json')
        //   .then(response => {
        //     if (!response.ok) {
        //       throw new Error(`HTTP error! Status: ${response.status}`);
        //     }
        //     return response.json();
        //   })
        //   .then(json => {
        //     this.config = json;
        //   })
        //   .catch(error => {
        //     console.error('Error fetching config:', error);
        //   });

          this.config=JSON.parse(sessionStorage.getItem("userSession"))
      }
    
      this.samplesReload = true;
      this.selectedItems = [];
      let APIParams = this.getAPICommonParams(queryDefinition);
      let viewParams = this.jsonParam(queryDefinition);
      let endPointUrl = this.getQueryAPIUrl(queryDefinition);
      if (String(endPointUrl).toUpperCase().includes("ERROR")) {
        alert(endPointUrl);
        return;
      }
      let serviceAPIurl = this.getServiceAPIUrl(viewQuery);
      if (this.config.backendUrl === undefined && serviceAPIurl === undefined) {
        serviceAPIurl = "https://platform.trazit.net:8443/TRAZiT-API";
        let sessionDbName = JSON.parse(sessionStorage.getItem("userSession")).dbName;
        if (sessionDbName !== undefined) {
          this.config.dbName = sessionDbName;
        }
        if (this.config.dbName === undefined) {
          this.config.dbName = "labplanet";
          this.config.isForTesting = false;
        }
      }
      params = serviceAPIurl + endPointUrl
        + '?' + new URLSearchParams(APIParams) + '&' + new URLSearchParams(viewParams);
    
      // Emitir evento para mostrar el progreso circular
      this.dispatchEvent(new CustomEvent('show-progress', {
        bubbles: true,
        composed: true
      }));

      await this.fetchApi(params, false, queryDefinition).then(j => {
        if (queryDefinition.actionName === 'ONE_PROCEDURE_DEFINITION' || queryDefinition.actionName === 'ALL_PROCEDURES_DEFINITION') {
          if (j.master_data !== undefined) {
            let userSession = JSON.parse(sessionStorage.getItem("userSession"));
            userSession.proc_management_masterdata = {};
            userSession.proc_management_masterdata = j.master_data;
            sessionStorage.setItem('userSession', JSON.stringify(userSession));
          }
        }
        if (queryDefinition.dataResponse!==undefined&&queryDefinition.dataResponse==="ArrayInRoot"){
          let arrayToSingleObject={}
          arrayToSingleObject.queryData=j
          this.selectedItemInView=arrayToSingleObject
          return
        }
        if (queryDefinition.notUseGrid !== undefined && queryDefinition.notUseGrid === true) {
          if (queryDefinition.variableName !== undefined) {
            if (queryDefinition.endPointResponseVariableName !== undefined) {
              this[queryDefinition.variableName] = j[queryDefinition.endPointResponseVariableName];
            } else {
              this[queryDefinition.variableName] = j;
            }
          } else {

            this.selectedItems = j;
            if (this.selectedItems[0] !== undefined && this.selectedItems[0] !== null) {
              this.selectedItem = this.selectedItems[0];

              if (this.selectedItemInView) {
                if (j.length==1){
                  this.selectedItemInView =j[0]
                }else{
                  const uniqueKey = this.viewModelFromProcModel.viewQuery.selectedItemKeyProperty;
                  const newItem = j.find(item => item[uniqueKey] === this.selectedItemInView[uniqueKey]);
                  if (newItem) {
                    this.selectedItemInView = newItem;
                  }
                }
              }

              this.render();
            }
            if (j && !j.is_error) {
              this.requestData = j;
            } else {
              this.requestData = {};
            }
          }
        } else if (setGrid) {
          if (j && !j.is_error) {
            this.setGrid(j);
          } else {
            this.setGrid();
          }
        } else {
          if (j && !j.is_error) {
            this.requestData = j;
          } else {
            this.requestData = {};
          }
        }
      });

      // Emitir evento para ocultar el progreso circular
      this.dispatchEvent(new CustomEvent('hide-progress', {
        bubbles: true,
        composed: true
      }));

      this.requestUpdate();
      this.samplesReload = false;
    }
    
    async GetAlternativeViewData(queryDefinition, selObject = {}) {
      if (queryDefinition.clientMethod !== undefined) {
        //alert('Calling '+queryDefinition.clientMethod+' from GetViewData')
        if (this[queryDefinition.clientMethod] === undefined) {
          alert('not found any clientMethod called ' + queryDefinition.clientMethod)
          return
        }
        this[queryDefinition.clientMethod]()
        return
      }
      console.log('GetAlternativeViewData', 'queryDefinition', queryDefinition)
      let APIParams = this.getAPICommonParams(queryDefinition)
      let viewParams = this.jsonParam(queryDefinition, selObject)
      let endPointUrl = this.getQueryAPIUrl(queryDefinition)
      let serviceAPIurl=this.getServiceAPIUrl(queryDefinition)
      let params = serviceAPIurl + endPointUrl
        + '?' + new URLSearchParams(APIParams) + '&' + new URLSearchParams(viewParams)

      //console.log('params', params)
      // Emitir evento para mostrar el progreso circular
      this.dispatchEvent(new CustomEvent('show-progress', {
        bubbles: true,
        composed: true
      }));      
      await this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.setGrid(j)
        } else {
          this.setGrid()
        }
      })
      // Emitir evento para ocultar el progreso circular
      this.dispatchEvent(new CustomEvent('hide-progress', {
        bubbles: true,
        composed: true
      }));      
      this.samplesReload = false
    }

    async GetQueryForDialogGrid(actionDefinition) {
      console.log('GetQueryForDialogGrid', actionDefinition)
      if (actionDefinition.dialogQuery === undefined) { return }

      let currQuery = actionDefinition.dialogQuery
      if (currQuery.clientMethod !== undefined) {
        //alert('Calling '+currQuery.clientMethod+' from GetViewData')
        if (this[currQuery.clientMethod] === undefined) {
          alert('not found any clientMethod called ' + currQuery.clientMethod)
          return
        }
        this[currQuery.clientMethod]()
        return
      }
      console.log('GetQueryForDialogGrid', 'currQuery', currQuery)
      let APIParams = this.getAPICommonParams(currQuery)
      let viewParams = this.jsonParam(currQuery)
      let endPointUrl = this.getQueryAPIUrl(currQuery)
      let serviceAPIurl=this.getServiceAPIUrl(currQuery)
      let params = serviceAPIurl + endPointUrl
        + '?' + new URLSearchParams(APIParams) + '&' + new URLSearchParams(viewParams)
      
      // Emitir evento para mostrar el progreso circular
      this.dispatchEvent(new CustomEvent('show-progress', {
        bubbles: true,
        composed: true
      }));      
      
      await this.fetchApi(params).then(j => {
        if (j && !j.is_error) {
          this.genericDialogGridItems = j

        } else {
          this.genericDialogGridItems = []
        }
      })
      // Emitir evento para ocultar el progreso circular
      this.dispatchEvent(new CustomEvent('hide-progress', {
        bubbles: true,
        composed: true
      }));      


    }

    async GetQueriesForDialog(actionDefinition) {
      console.log('GetQueriesForDialog', actionDefinition)
      if (actionDefinition.dialogQueries === undefined) { return }

      let i = 0
      for (i = 0; i < actionDefinition.dialogQueries.length; i++) {
        let currQuery = actionDefinition.dialogQueries[i]
        if (currQuery.clientMethod !== undefined) {
          //alert('Calling '+currQuery.clientMethod+' from GetViewData')
          if (this[currQuery.clientMethod] === undefined) {
            alert('not found any clientMethod called ' + currQuery.clientMethod)
            return
          }
          this[currQuery.clientMethod]()
          return
        }
        console.log('GetQueriesForDialog', 'currQuery', currQuery)
        let APIParams = this.getAPICommonParams(currQuery)
        let viewParams = this.jsonParam(currQuery)
        if (currQuery === undefined) { return }
        let endPointUrl = this.getQueryAPIUrl(currQuery)
        let serviceAPIurl=this.getServiceAPIUrl(queryDefinition)
        let params = serviceAPIurl + endPointUrl
          //let params = this.config.backendUrl + (currQuery.endPoint ? currQuery.endPoint : this.config.SampleAPIqueriesUrl)
          + '?' + new URLSearchParams(APIParams) + '&' + new URLSearchParams(viewParams)

        //console.log('params', params)
        // Emitir evento para mostrar el progreso circular
        this.dispatchEvent(new CustomEvent('show-progress', {
          bubbles: true,
          composed: true
        }));        
        await this.fetchApi(params).then(j => {
          if (j && !j.is_error) {
            //alert(j.length)
            this[currQuery.variableForData] = j

          } else {
            this[currQuery.variableForData] = []
          }
        })
      }
      // Emitir evento para ocultar el progreso circular
      this.dispatchEvent(new CustomEvent('hide-progress', {
        bubbles: true,
        composed: true
      }));      

      this.samplesReload = false
    }

    async getGenericDialogGridItems(dialogInfo) {

      if ((dialogInfo.gridContent === undefined || dialogInfo.gridContent === false)
        && (dialogInfo.filesListContent === undefined || dialogInfo.filesListContent === false)) { //dialogInfo.gridContent===true){
        //this.getGenericDialogGridItems(this.actionBeingPerformedModel.dialogInfo)
        return []
      }
      // if (dialogInfo.filesListContent!==undefined&&dialogInfo.filesListContent===true){
      //     this.getGenericDialogGridItems(this.actionBeingPerformedModel.dialogInfo)
      //     return
      // }


      if (dialogInfo.masterDataEntryName === undefined && dialogInfo.dialogQuery === undefined && dialogInfo.gridContent === undefined && dialogInfo.filesListContent === undefined) {
        alert('By now, the getGenericDialogGridItems only works for master data entries or dialogQuery or gridContent or filesListContent')
        return []
      }
      let data = []
      if (dialogInfo.masterDataEntryName !== undefined) {
        this.getProcMasterData()
        if (this.masterData === undefined) { return [] }
        if (this.masterData[dialogInfo.masterDataEntryName] === undefined) {
          alert('the procedure instance ' + this.procInstanceName + ' has no one master data entry called ' + dialogInfo.masterDataEntryName)
          return []
        }
        this.genericDialogGridItems = []
        this.genericDialogGridItems = this.masterData[dialogInfo.masterDataEntryName]
        //console.log('new code')
        return this.genericDialogGridItems
      }
      if (dialogInfo.dialogQuery !== undefined) {
        await this.GetQueryForDialogGrid(dialogInfo)
        return this.genericDialogGridItems

      }
      let entry = { "analysis": "hola", "method_name": "method", "method_version": 1 }
      data.push(entry)
      console.log('genericDialogGridItems', data)
      return data
    }


    disabledByCertification(action) {
      return false;
    }
  }
}
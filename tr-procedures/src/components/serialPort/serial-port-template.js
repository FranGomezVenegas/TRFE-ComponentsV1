import { html } from 'lit';
import '@material/mwc-dialog';
import '@material/mwc-button';

export const template = (logAreaHeight, timeout, isSendEnabled, lang, messages, isTimeoutEditable, handleKeyDown, canSendData,
  displayObjectsTable, tableDefinition, tableData, handleButton1, handleButton2, handleButton3, dialogWeightMessage, handleKeyDownNextWeight
) => html`
  <div class="container">
    <div class="left-column">    
      ${isSendEnabled ? html`
        <input type="text" id="userInput" placeholder="${messages.enterText[lang]}" @keydown="${handleKeyDown}" ?disabled="${!canSendData}">
      ` : ''}
      <div class="button-row">
        <button class="standard-button" id="connectButton">${messages.connect[lang]}</button>
        <button class="standard-button" id="closeButton">${messages.closeConnection[lang]}</button>
        <button class="icon-button" id="clearLogButton" title="${messages.clearLog[lang]}">🗑️</button>
      </div>
      <textarea id="output" readonly style="height: ${logAreaHeight}px;"></textarea>
      <div>
        <label for="timeout">${messages.timeout[lang]}:</label>
        <input type="number" id="timeout" value="${timeout}" min="1" step="1" ?disabled="${!isTimeoutEditable}">
      </div>
    </div>
    <div class="right-column">
      ${displayObjectsTable ? html`
        ${dragObjectsTable(messages, {viewTable: true}, lang, tableDefinition, tableData, true, handleButton1, handleButton2, handleButton3, dialogWeightMessage, handleKeyDownNextWeight)}
      ` : ''}
    </div>
  </div>
`;
function dragObjectsTable(messages, tmpLogic, lang, elem, dataArr, componentRef, handleButton1, handleButton2, handleButton3, dialogWeightMessage, handleKeyDownNextWeight){  
  return html`
  
  ${tmpLogic.viewTable ? html`
  <div style="margin-top:42px">
      <table class="dragdropable TRAZiT-DefinitionArea"> 
          <thead>
              ${elem.columns.map((column) => html`<th>${column.label_en}</th>`)}
          </thead>
          <tbody>
              ${dataArr === undefined || !Array.isArray(dataArr) ? html`No Data` : 
              html`  
                  ${dataArr.map((p, idx) => html`
                  <tr class="dragdropabletr" draggable="true" @dragstart=${(e) => tmpLogic.dragTableTr(e, elem, p)}>
                      ${elem.columns.map((fld, index) => fld.is_icon !== undefined && fld.is_icon == true ? 
                          fld.icon_class ?
                              html`<div class="left-area">
                                  ${this.iconRenderer(p, fld.name, idx, fld)}
                                  <mwc-icon-button class="icon ${p[fld.icon_class]}" icon="${p[fld.icon_name]}" alt="${fld.name}"></mwc-icon-button>
                              </div>` :
                              html`${this.iconRenderer(p, fld.name, idx, fld)}
                                  <img src="${tmpLogic.iconRendererSrc(p, fld.name, idx, fld)}" style="width:20px">` 
                          :     
                          html`<td @click="${() => componentRef.shadowRoot.querySelector('#detail' + idx).toggle()}">${p[fld.name]}</td>`                    
                      )}
                      ${elem.row_buttons === undefined ? html`` : html`<td><div class="layout horizontal center flex wrap">${this.getButtonForRows(elem.row_buttons, p, false, parentData)}</div></td>`}
                  </tr>
                  <table-row-detail id="detail${idx}">
                    <div slot="details">                    
                      <!-- Aquí puedes poner el contenido detallado para esta fila -->
                    </div>
                  </table-row-detail>`)}
              `}
          </tbody>
      </table>
      <mwc-dialog id="confirm-dialog" heading="${dialogWeightMessage["label_"+lang]}">
        <div>What would you like to do next?</div>
        <mwc-button slot="primaryAction" dialogAction="ok" @click="${handleButton1}">Next weight</mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="cancel" @click="${handleButton2}">Change Balance</mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="close" @click="${handleButton3}">Exit</mwc-button>
      </mwc-dialog>
      <mwc-dialog id="next-weight" heading="">
        <input type="text" id="userInputNextWeight" placeholder="${messages.enterText[lang]}" @keydown="${handleKeyDownNextWeight}" ?disabled="${false}">
      </mwc-dialog>
  </div> 
  ` : null}
  `
}


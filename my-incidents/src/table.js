import { LitElement, html, nothing } from 'lit';
import { styles } from './my-incidents-styles';
export class TableComponent extends LitElement {

  static get properties() {
    return {
      elem: { type: Object },
      data: { type: Array },
      lang: { type: String },
    };
  }
  static get styles() {
    return styles;
  }
  constructor() {
    super();
    this.elem = {};
    this.data = [];
    this.lang = 'en';
  }

  // Este método se ejecuta cuando cambian las propiedades (como `elem`, `data`, o `lang`)
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('elem') || changedProperties.has('data')) {
      console.log('Recibiendo columnas:', this.elem.columns);
      console.log('Recibiendo datos:', this.data);
      this.requestUpdate(); // Fuerza el re-renderizado
    }
  }

  render() {
    return this._boxesTable(null, this.elem, this.data, this.lang);
  }

  _boxesTable(tmpLogic, elem, data, lang) {
    //console.log('elem', elem); // Asegúrate de que elem.columns está definido
    let dataArr = data || [];
    
    return html`
      <div id="boxesTableMainArea">
        <table class="dragdropable TRAZiT-DefinitionArea">
          <thead>
            ${elem.columns?.map((column, i) => html`<th>${column.label_en}</th>`)}
            ${elem.row_buttons === undefined ? html`` : html`<th class="actions-column">${lang === 'es' ? 'Acciones' : 'Actions'}</th>`}
          </thead>
          <tbody>
            ${dataArr.length === 0
              ? html`<tr><td colspan="100%">No Data</td></tr>`
              : dataArr.map(
                  (p, i) => html`
                    <tr @click=${() => this._onRowClick(p)}>
                      ${elem.columns.map((fld) => html`<td>${p[fld.name]}</td>`)}
                      ${elem.row_buttons === undefined ? html`` : html`
                        <td class="actions-column">
                          <div class="layout horizontal center flex wrap">
                            ${this.getButtonForRows(elem.row_buttons, p, false, undefined)}
                          </div>
                        </td>`}
                    </tr>
                  `
                )}
          </tbody>
        </table>
      </div>
    `;
  }

  getButtonForRows(actions, selRowData, isProcManagement, parentData) {
    //console.log('getButtonForRows', 'actions', actions, 'selRowData', selRowData, 'parentData', parentData)
    if (actions === undefined) { actions = this.viewModelFromProcModel }
    return html`
        ${actions !== undefined && actions.map(action =>
      html`
        
          ${action.button ?
            html`${action.button.icon ?
            html` 
              
              <div class="icon-button"><md-icon slot="icon" style="color:#0d66d0" .title=${action.button.title['label_' + this.lang]}"  @click=${(e) => this.rowButtonClicked(e, action, selRowData)}>${action.button.icon}</md-icon></div>
            ` :
            html`${action.button.img ?
                html`${action.actionName}zz  <md-icon
                title="${action.button.title['label_' + this.lang]}" id="${action.actionName}"
                @click=${(e) => this.rowButtonClicked(e, true, action, actions, null, null, selRowData, isProcManagement, parentData)}>
                    <img class="iconBtn" src="images/${action.button.img}">
                </md-icon>
            ` :
                html` ${action.actionName}zzz <md-button dense raised
                label="${action.button.title['label_' + this.lang]}" id="${action.actionName}"
                @click=${(e) => this.rowButtonClicked(e, true, action, actions, null, null, selRowData, isProcManagement, parentData)}></md-button>`
                }`
            }` :
                nothing
            }`
        
    )}
    `
  }  
  rowButtonClicked(event, action, selRowData) {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('table-row-button-clicked', {
      detail: { action: action, data: selRowData },
      bubbles: true,
      composed: true
    })); 
  }
  

  _onRowClick(rowData) {
    console.log("Fila seleccionada:", rowData);
    // Emitimos el evento personalizado
    this.dispatchEvent(new CustomEvent('table-row-selected', {
      detail: { row: rowData },
      bubbles: true, // Para que pueda ser capturado en niveles superiores
      composed: true
    }));
  }

  _showBoxContent(row, index) {
    console.log("Fila seleccionada:", row);
    this.selectItem()
  }

  
}customElements.define('table-component', TableComponent);

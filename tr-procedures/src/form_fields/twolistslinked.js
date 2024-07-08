import { LitElement, html, css } from 'lit';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import { ListsFunctions } from './lists-functions';
import { DialogsFeatures } from '../components/GenericDialogs/CommonFunctions/DialogsFeatures';
class TwoListsLinked extends ListsFunctions(DialogsFeatures(LitElement)) {
  static properties = {
    lang: { type: String},
    procInstanceName: { type: String},
    fld: { type: Object },
    listLinked1Items: { type: Array },
    listLinked2Items: { type: Array },
    selectedList1Value: { type: String }
  };

  constructor() {
    super();
    this.fld = {};
    this.listLinked1Items = [];
    this.listLinked2Items = [];
    this.selectedList1Value = '';
    this.procInstanceName = '';
  }

  static styles = css`
    .layout {
      display: flex;
    }
    .horizontal {
      flex-direction: row;
    }
    .flex {
      flex: 1;
    }
    .center-center {
      justify-content: center;
      align-items: center;
    }
        mwc-select {
      --mdc-theme-primary: rgba(36, 192, 235, 1);
      --mdc-theme-text-primary-on-background: rgba(49, 130, 189, 1);
      --mdc-select-ink-color: rgb(47, 47, 47);
      --mdc-select-dropdown-icon-color: rgba(36, 192, 235, 1);
      --mdc-select-hover-line-color: rgba(36, 192, 235, 1);
      --mdc-notched-outline-border-color: #148CFA;
      --mdc-select-disabled-dropdown-icon-color: rgba(36, 192, 235, 1);
      --mdc-select-label-ink-color: #148CFA; /* Color del label cuando no hay valor seleccionado */
      --mdc-select-idle-line-color: #148CFA; /* Color de la línea */
      --mdc-select-bottom-line-color: #148CFA; /* Color de la línea inferior */

      font-family: Montserrat;
      font-weight: bold;
      font-size: 19px;
    }

    mwc-select::part(notched-outline) {
      border-color: #148CFA;
    }

    mwc-select::part(idle) {
      border-color: #148CFA;
    }

    mwc-select::part(label) {
      color: #148CFA;
    }

    mwc-select.outlined {
      --mdc-theme-primary: rgba(36, 192, 235, 1);
      --mdc-theme-text-primary-on-background: rgba(49, 130, 189, 1);
      --mdc-select-ink-color: rgba(36, 192, 235, 1);
      font-family: Montserrat;
      font-weight: bold;
      font-size: 19px;
      background-color: 4fcad029;
    }
    `;

  render() {
    return html`
      ${!this.fld.listLinked1 ? html`` : html`
        <div class="layout horizontal flex center-center">
          <mwc-select
            id="listLinked1"
            label="${this.fieldLabel(this.fld.listLinked1)}"
            @selected=${(e) => this.actionWhenListValueSelected(e)}
            ?disabled=${this.isFieldDisabled(this.fld.listLinked1)}
            style="width: 100%;"
          >
            ${this.listEntriesTwoListsLinked(this.fld.listLinked1)}
          </mwc-select>
        </div>
        <div class="layout horizontal flex center-center">
          <mwc-select
            id="listLinked2"
            label="${this.fieldLabel(this.fld.listLinked2)}"
            ?disabled=${this.selectedList1Value === ''}
            style="width: 100%;"
          >
            ${this.listEntriesTwoListsLinked(this.fld.listLinked2)}
          </mwc-select>
        </div>
      `}
    `;
  }


  listEntriesTwoListsLinked(field) {
    let entries = [];
    let blankEmpty = { keyName: "", keyValue_en: "", keyValue_es: "", allRecord: {} };
    if (field.addBlankValueOnTop) {
        entries.push(blankEmpty);
      }
    if (field.items) {
        entries = [...entries, ...field.items];
    } else if (field.valuesFromMasterData) {
        entries = [...entries, ...this.listEntriesFromMasterData(field.valuesFromMasterData)];      
    }
  
    // Si es la lista 2, usa los elementos filtrados
    if (field === this.fld.listLinked2) {
      entries = this.listLinked2Items;
    }
    if (field.addBlankValueAtBottom) {
        entries.push(blankEmpty);
    }
    if (entries.length === 0) {
    return html``;
    }
    return entries.map(item => html`<mwc-list-item value="${item.keyName}">${item["keyValue_" + this.lang]}</mwc-list-item>`);
  }
  
  actionWhenListValueSelected(event) {
    this.listLinked2.value=''
    const selectedValue = event.target.value;
    this.selectedList1Value = selectedValue;
    this.updateList2Entries(selectedValue);
  }
  
  updateList2Entries(selectedValue) {
    if (selectedValue === '') {
      this.listLinked2Items = [];
    } else {
      let allDataWithNoFilter;
      if (this.fld.listLinked2.items) {
        allDataWithNoFilter = this.fld.listLinked2.items;
        this.listLinked2Items = allDataWithNoFilter.filter(item => item.parentValue === selectedValue);
      } else {
        let list2MasterDataConfig=this.fld.listLinked2.valuesFromMasterData
        allDataWithNoFilter = this.masterData[list2MasterDataConfig.propertyNameContainer] 
        
        allDataWithNoFilter= allDataWithNoFilter.filter(item => item[list2MasterDataConfig.propertyNameContainerLevelPropertyKeyName] === selectedValue);
        let allDataForTheSelectedEntry=allDataWithNoFilter[0]
        allDataForTheSelectedEntry=allDataForTheSelectedEntry[list2MasterDataConfig.selectedEntryFromFilterPropertyName]
        this.listLinked2Items = allDataForTheSelectedEntry        
        .map(item => ({
          keyName: item[this.fld.listLinked2.valuesFromMasterData.propertyKeyName],
          keyValue_en: item[this.fld.listLinked2.valuesFromMasterData.propertyKeyValueEn],
          keyValue_es: item[this.fld.listLinked2.valuesFromMasterData.propertyKeyValueEs]
        }));  
        let blankEmpty = { keyName: "", keyValue_en: "", keyValue_es: "", allRecord: {} };
    
        // Agrega una entrada en blanco al principio si está configurado
        if (this.fld.listLinked2.addBlankValueOnTop) {
          this.listLinked2Items.unshift(blankEmpty);
        }
    
        // Agrega una entrada en blanco al final si está configurado
        if (this.fld.listLinked2.addBlankValueAtBottom) {
          this.listLinked2Items.push(blankEmpty);
        }              
      }
    }
    // Necesario para actualizar el renderizado de la lista 2
    this.requestUpdate();
  }
  
  get listLinked1() { 
    return this.shadowRoot.querySelector("mwc-select#listLinked1"); 
  }
  
  get listLinked2() { 
    return this.shadowRoot.querySelector("mwc-select#listLinked2"); 
  }
  
}

customElements.define('two-lists-linked', TwoListsLinked);

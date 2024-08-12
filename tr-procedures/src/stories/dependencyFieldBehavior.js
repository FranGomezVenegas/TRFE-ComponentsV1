import { LitElement, html, css } from 'lit';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import { ListsFunctions } from '../form_fields/lists-functions';
import { DialogsFeatures } from '../components/GenericDialogs/CommonFunctions/DialogsFeatures';

class DependencyFieldBehavior extends ListsFunctions(DialogsFeatures(LitElement)) {
  static properties = {
    lang: { type: String },
    procInstanceName: { type: String },
    fld: { type: Object },
    list2Items: { type: Array },
    dependentFieldValue: { type: String },
  };

  constructor() {
    super();
    this.fld = {};
    this.list2Items = [];
    this.dependentFieldValue = '';
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
      --mdc-select-label-ink-color: #148CFA;
      --mdc-select-idle-line-color: #148CFA;
      --mdc-select-bottom-line-color: #148CFA;
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
      ${!this.fld.list2 ? html`` : html`
        <div class="layout horizontal flex center-center">
          <mwc-select
            id="list2"
            label="${this.fieldLabel(this.fld.list2)}"
            ?hidden=${this.shouldHideField()}
            style="width: 100%;"
          >
            ${this.listEntriesForDependencyFieldBehavior(this.fld.list2)}
          </mwc-select>
        </div>
      `}
    `;
  }

  listEntriesForDependencyFieldBehavior(field) {
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

    if (field.addBlankValueAtBottom) {
      entries.push(blankEmpty);
    }
    if (entries.length === 0) {
      return html``;
    }
    return entries.map(item => html`<mwc-list-item value="${item.keyName}">${item["keyValue_" + this.lang]}</mwc-list-item>`);
  }

  shouldHideField() {
    const dependency = this.fld.list2.dependencyFieldBehavior?.find(dep => dep.field === 'multilist1' && dep.rule === 'whenEmpty');
    if (dependency) {
      const dependentField = this.dependentFieldValue;
      return dependency.action === 'hide' && (dependency.rule === 'whenEmpty' && !dependentField);
    }
    return false;
  }

  updateDependentFieldValue(event) {
    this.dependentFieldValue = event.target.value;
    this.requestUpdate();
  }

  get list2() { 
    return this.shadowRoot.querySelector("mwc-select#list2"); 
  }

}

customElements.define('dependency-field-behavior', DependencyFieldBehavior);
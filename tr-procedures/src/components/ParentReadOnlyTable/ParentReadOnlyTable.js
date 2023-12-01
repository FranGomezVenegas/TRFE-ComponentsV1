import { LitElement, html } from 'lit-element';

export class ParentReadOnlyTable extends LitElement {
  static get styles() {
    return [

    ];
  }

  static get properties() {
    return {
      control: { type: Object },
      element: { type: Object },
      dataArr: { type: Array },
      isSecondLevel: { type: Boolean },
      directData: { type: Array },
      alternaiveTitle: { type: String },
      child: { type: Object },
      readOnlyTable: {state: false}
    };
  }

  constructor() {
    super();
  }

  render() {
    const table = this.readOnlyTable(
      // this.control, 
      this.element, 
      this.dataArr, 
      this.isSecondLevel, 
      this.directData, 
      this.alternaiveTitle
    );
    console.log(table);
    return table;
  }
}

window.customElements.define('parent-readonly-table', ParentReadOnlyTable);

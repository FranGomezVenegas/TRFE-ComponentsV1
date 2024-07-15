import { LitElement } from 'lit';
//import { stylesParTbl } from './styles';

export class ParentReadOnlyTable extends LitElement {
  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      elem: { type: Object },
      data: { type: Array }
    };
  }

  render() {
    // Asegúrate de que data es un arreglo antes de pasarlo a la plantilla
    const data = Array.isArray(this.data) ? this.data : [];
    return template(this.elem, data);
  }
}

customElements.define('parent-read-only-table', ParentReadOnlyTable);

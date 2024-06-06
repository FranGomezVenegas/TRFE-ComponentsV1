import { LitElement } from 'lit-element';
import { template } from './speclimitquantitative.template';
import { styles } from './speclimitquantitative.css';

export class SpeclimitQuantitative extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      rules: { type: Array },
      selectedRule: { type: Number },
      inputValue1: { type: String },
      inputValue2: { type: String },
      errorMessage: { type: String },
      value: { type: String }
    };
  }

  constructor() {
    super();
    this.rules = [
      { id: 1, description: 'Entre X y Y incluidos' },
      { id: 2, description: 'Entre X y Y' },
      { id: 3, description: 'Menor de X' },
      { id: 4, description: 'Menor o igual a X' },
      { id: 5, description: 'Mayor de X' },
      { id: 6, description: 'Mayor o igual a X' }
    ];
    this.selectedRule = 1;
    this.inputValue1 = '';
    this.inputValue2 = '';
    this.errorMessage = '';
    this.value = '';
  }

  handleRuleChange(e) {
    this.selectedRule = Number(e.target.value);
    this.inputValue1 = '';
    this.inputValue2 = '';
    this.errorMessage = '';
    this.updateOutputValue();
  }

  handleInputChange1(e) {
    this.inputValue1 = e.target.value;
    this.validateInput();
  }

  handleInputChange2(e) {
    this.inputValue2 = e.target.value;
    this.validateInput();
  }

  validateInput() {
    let regex;
    let fullInput;
    switch (this.selectedRule) {
      case 1:
        regex = /^Entre \d{1,6}(\.\d{1,2})? y \d{1,6}(\.\d{1,2})? incluidos?$/i;
        fullInput = `Entre ${this.inputValue1} y ${this.inputValue2} incluidos`;
        break;
      case 2:
        regex = /^Entre \d{1,6}(\.\d{1,2})? y \d{1,6}(\.\d{1,2})?$/i;
        fullInput = `Entre ${this.inputValue1} y ${this.inputValue2}`;
        break;
      case 3:
        regex = /^Menor de \d{1,6}(\.\d{1,2})?$/i;
        fullInput = `Menor de ${this.inputValue1}`;
        break;
      case 4:
        regex = /^Menor o igual a \d{1,6}(\.\d{1,2})?$/i;
        fullInput = `Menor o igual a ${this.inputValue1}`;
        break;
      case 5:
        regex = /^Mayor de \d{1,6}(\.\d{1,2})?$/i;
        fullInput = `Mayor de ${this.inputValue1}`;
        break;
      case 6:
        regex = /^Mayor o igual a \d{1,6}(\.\d{1,2})?$/i;
        fullInput = `Mayor o igual a ${this.inputValue1}`;
        break;
      default:
        this.errorMessage = 'Regla no válida';
        return;
    }

    if (!regex.test(fullInput)) {
      this.errorMessage = 'Formato de entrada no válido para la regla seleccionada';
    } else if ((this.selectedRule === 1 || this.selectedRule === 2) && parseFloat(this.inputValue1) >= parseFloat(this.inputValue2)) {
      this.errorMessage = 'El primer valor debe ser menor que el segundo valor';
    } else {
      this.errorMessage = '';
      this.updateOutputValue();
    }
  }

  getPrefix() {
    switch (this.selectedRule) {
      case 1:
        return 'Entre ';
      case 2:
        return 'Entre ';
      case 3:
        return 'Menor de ';
      case 4:
        return 'Menor o igual a ';
      case 5:
        return 'Mayor de ';
      case 6:
        return 'Mayor o igual a ';
      default:
        return '';
    }
  }

  updateOutputValue() {
    let output;
    switch (this.selectedRule) {
      case 1:
        output = `Entre ${this.inputValue1} y ${this.inputValue2} incluidos`;
        break;
      case 2:
        output = `Entre ${this.inputValue1} y ${this.inputValue2}`;
        break;
      case 3:
        output = `Menor de ${this.inputValue1}`;
        break;
      case 4:
        output = `Menor o igual a ${this.inputValue1}`;
        break;
      case 5:
        output = `Mayor de ${this.inputValue1}`;
        break;
      case 6:
        output = `Mayor o igual a ${this.inputValue1}`;
        break;
      default:
        output = '';
    }
    this.value = output;
    this.dispatchEvent(new CustomEvent('output-change', { detail: { value: this.value } }));
  }

  render() {
    return template(
      this.rules,
      this.selectedRule,
      this.inputValue1,
      this.inputValue2,
      this.errorMessage,
      this.handleRuleChange.bind(this),
      this.handleInputChange1.bind(this),
      this.handleInputChange2.bind(this)
    );
  }
}

window.customElements.define('speclimit-quantitative', SpeclimitQuantitative);

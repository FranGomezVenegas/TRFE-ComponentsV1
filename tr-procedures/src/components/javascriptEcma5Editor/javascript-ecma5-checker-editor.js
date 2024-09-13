import { LitElement, html } from 'lit';
import { editorStyles } from './javascript-ecma5-styles.js';
import { editorTemplate } from './javascript-ecma5-template.js';

export class MyJavascriptExcma5CheckerEditor extends LitElement {
  static properties = {
    codeValue: { type: String },
    isSaveDisabled: { type: Boolean },
    checkerType: { type: String }
  };

  static styles = editorStyles;

constructor() {
  super();
  this.codeValue = '';  // Inicializa vacío
  this.isSaveDisabled = true;
  this.editor = null;
  this.checkerType = 'sampleStageSamplingNextChecker';
  this.loadCheckerCode();

  console.log('Checker Code:', this.codeValue);  // Verifica que el código se cargue correctamente
}


loadCheckerCode() {
  if (this.checkerType === 'sampleStageSamplingNextChecker') {
    this.codeValue = `
function sampleStageMicroorganismIdentificationNextChecker(sampleId, sampleData) {
  try {
    var sampleStructure = JSON.parse(sampleData);
    if (!sampleStructure.sample_microorganisms || sampleStructure.sample_microorganisms.length === 0) {
      return 'LAB_FALSE@NOTPARSEABLE';
    }
    var microorganism = sampleStructure.sample_microorganisms[0];
    var rawValue = '';
    if (!microorganism.raw_value) {
      return 'LAB_FALSE@PARAMNAMEEMPTY@' + sampleId;
    } else {
      rawValue = microorganism.raw_value;
    }
    var microorgCount = -1;
    if (!microorganism.microorganism_count) {
      return 'LAB_FALSE@PARAMNAMEEMPTY@' + sampleId;
    } else {
      microorgCount = parseInt(microorganism.microorganism_count);
    }
    if (microorgCount >= parseInt(rawValue)) {
      return 'LAB_TRUE|SampleRevision';
    } else {
      return 'LAB_FALSE';
    }
  } catch (error) {
    return 'LAB_FALSE@' + error.message;
  }
};`;

    // Forzar una actualización del componente después de cargar el valor
    this.requestUpdate();
  }
}


  firstUpdated() {
    this.editor = ace.edit(this.renderRoot.querySelector('#editor'));
    this.editor.setTheme('ace/theme/monokai');
    this.editor.session.setMode('ace/mode/javascript');
  
    // Asigna el valor inicial directamente
    if (this.codeValue) {
      this.editor.setValue(this.codeValue, -1); // Usar -1 para asegurarse de que el editor no intente reubicar el cursor
    }
  
    // Detectar cambios en el editor
    this.editor.on('change', () => {
      this.isSaveDisabled = !this.editor.getValue().trim();
      this.requestUpdate();
    });
  }
  
  
  

  onSave() {
    this.codeValue = this.editor.getValue();
    console.log('Code saved:', this.codeValue);
    // Aquí puedes añadir la lógica para guardar el código en la base de datos
  }

  render() {
    return editorTemplate(
      (el) => (this.editor = el),
      this.onSave.bind(this),
      this.codeValue,
      this.isSaveDisabled
    );
  }
}

customElements.define('javascript-ecma5-checker-editor', MyJavascriptExcma5CheckerEditor);

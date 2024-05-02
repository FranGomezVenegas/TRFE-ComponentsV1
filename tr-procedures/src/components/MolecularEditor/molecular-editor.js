import { LitElement, html, css } from 'lit';

class MolecularEditor extends LitElement {
  static styles = css`
    #molecular-editor {
      width: 500px;
      height: 400px;
      border: 1px solid #ccc;
    }
  `;

  render() {
    return html`
      <div id="molecular-editor"></div>
      <button @click=${this.copyToClipboard}>Copiar a MS Word</button>
      <div id="molecular-paste" @paste=${this.handlePaste} contenteditable="true">Pegue su estructura molecular aquí...</div>
    `;
  }

  firstUpdated() {
    // Cargar ChemDraw JS
    const script = document.createElement('script');
    script.src = 'https://chemdrawdirect.perkinelmer.cloud/deploy/embed.min.js';
    script.onload = () => {
      // Configurar ChemDraw JS
      const editor = new ChemDrawWeb(this.shadowRoot.getElementById('molecular-editor'));
      editor.events.on('save', (data) => {
        this.molecularData = data;
      });
    };
    document.body.appendChild(script);
  }

  handlePaste(event) {
    const pastedData = event.clipboardData.getData('text/plain');
    // Verificar si los datos pegados son estructuras moleculares
    if (this.isValidMolecularData(pastedData)) {
      // Renderizar la estructura molecular pegada
      this.renderPastedMolecularStructure(pastedData);
    } else {
      alert('Los datos pegados no son una estructura molecular válida.');
    }
  }

  isValidMolecularData(data) {
    // Lógica para verificar si los datos son una estructura molecular válida
    // Puedes personalizar esta lógica según tus necesidades específicas
    return true; // En este ejemplo, asumimos que todos los datos son válidos
  }

  renderPastedMolecularStructure(data) {
    // Lógica para renderizar la estructura molecular pegada
    // En este ejemplo, simplemente mostramos los datos en un div
    this.shadowRoot.getElementById('molecular-paste').innerText = data;
  }

  copyToClipboard() {
    // Lógica para copiar los datos de la estructura molecular al portapapeles
    if (this.molecularData) {
      navigator.clipboard.writeText(this.molecularData);
      alert('¡Datos copiados al portapapeles!');
    } else {
      alert('Primero crea una estructura molecular.');
    }
  }
}

customElements.define('molecular-editor', MolecularEditor);
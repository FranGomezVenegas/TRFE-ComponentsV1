import { LitElement, html, css } from 'lit';

class TrazitJsonViewer extends LitElement {
  static properties = {
    data: { type: Object },
    collapsedKeys: { type: Array } // Guardamos las claves que están colapsadas
  };

  static styles = css`
    :host {
      font-family: monospace;
      display: block;
      white-space: pre-wrap;
      font-size: 14px;
      color: #0e70c0;
    }
    .json-key {
      color: #0e70c0;
      margin-right: 4px;
    }
    .json-string {
      color: #3a9d23;
    }
    .json-number {
      color: #1c00cf;
    }
    .json-boolean {
      color: #d07500;
    }
    .json-null {
      color: #808080;
    }
.nested {
  padding-left: 20px; /* Consider increasing this if needed */
  margin: 4px 0;
}

.expand-icon {
  cursor: pointer;
  font-weight: bold;
  font-size: 10px; /* Smaller arrow size */
  color: #666; /* Use a lighter shade */
  margin-right: 8px; /* More space between the arrow and the key */
}

    .object-container {
      margin-left: 5px;
    }
    .object-inline {
      display: inline;
    }
.key-value {
  display: block;
  margin-bottom: 5px; /* Add margin between key-value pairs */
}

.json-key:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
.object-container, .array-container {
  margin-left: 5px;
  display: block;
}
      
  `;

  constructor() {
    super();
    this.data = {};
    this.collapsedKeys = [];
  }

  toggleKey(key) {
    if (this.collapsedKeys.includes(key)) {
      this.collapsedKeys = this.collapsedKeys.filter(k => k !== key);
    } else {
      this.collapsedKeys = [...this.collapsedKeys, key];
    }
  }

  // Función para renderizar cada propiedad del JSON
  renderJson(json, keyPath = '') {
    if (typeof json === 'object' && json !== null) {
      const isArray = Array.isArray(json);
      const type = isArray ? '[' : '{';

      return html`
        <div>
          <span class="key-value">
            <span class="expand-icon" @click="${() => this.toggleKey(keyPath)}">
              ${this.collapsedKeys.includes(keyPath) ? '▶' : '▼'}
            </span>
            ${type}
          </span>
          ${!this.collapsedKeys.includes(keyPath)
            ? html`
                <div class="nested">
                  ${Object.keys(json).map(
                    key =>
                      html`
                        <div class="key-value">
                          <span class="json-key">"${key}":</span>
                          ${this.renderJson(
                            json[key],
                            keyPath ? `${keyPath}.${key}` : key
                          )}
                        </div>
                      `
                  )}
                </div>
              `
            : ''}
          <span>${isArray ? ']' : '}'}</span>
        </div>
      `;
    }

    return this.formatPrimitive(json);
  }

  // Función para formatear los valores primitivos con colores
  formatPrimitive(value) {
    if (typeof value === 'string') {
      return html`<span class="json-string">"${value}"</span>`;
    } else if (typeof value === 'number') {
      return html`<span class="json-number">${value}</span>`;
    } else if (typeof value === 'boolean') {
      return html`<span class="json-boolean">${value}</span>`;
    } else if (value === null) {
      return html`<span class="json-null">null</span>`;
    }
  }

  render() {
    return html`
      <pre>${this.renderJson(this.data)}</pre>
    `;
  }
}


customElements.define('trazit-json-viewer', TrazitJsonViewer);

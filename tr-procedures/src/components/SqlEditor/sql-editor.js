import { html, css, nothing, LitElement } from 'lit';
import '@material/mwc-button';
import '@material/mwc-textfield';
import '@vaadin/vaadin-combo-box';
import { DataViews } from '../Views/DataViews'; // Importar DataViews

export class SqlEditor extends DataViews(LitElement) {
  static get styles() {
    return css`
      .error {
        color: red;
      }
      .editor-container {
        display: flex;
        flex-direction: column;
        padding: 16px;
      }
      .result-table {
        margin-top: 20px;
      }
    `;
  }

  static get properties() {
    return {
      query: { type: String },
      tables: { type: Array },
      fields: { type: Array },
      queryError: { type: Boolean },
      queryResults: { type: Array },
      lang:{type: String}
    };
  }

  constructor() {
    super();
    this.query = '';
    this.tables = [];
    this.fields = [];
    this.queryError = false;
    this.queryResults = null;
  }

  connectedCallback() {
    super.connectedCallback();
    // Aquí podrías hacer una llamada a la API para obtener las tablas y campos
    this._fetchTableAndFields();
  }

  _fetchTableAndFields() {
    // Ejemplo de cómo podrías obtener las tablas y campos de una API
    // Este método llenará las listas de tablas y campos
    fetch('/api/getTablesAndFields')
      .then((response) => response.json())
      .then((data) => {
        this.tables = data.tables;
        this.fields = data.fields;
      });
  }

  _onQueryChange(e) {
    this.query = e.target.value;
    this._validateQuery();
  }

  _validateQuery() {
    const queryRegex = /^SELECT\s.+?\sFROM\s.+/i; // Validación simple para SELECT
    this.queryError = !queryRegex.test(this.query);
  }

  _executeQuery() {
    if (this.queryError) {
      return;
    }
    this.queryResults=[]
    this.requestUpdate()
    // Codificar la consulta SQL para que sea segura dentro de la URL
    const encodedQuery = encodeURIComponent(this.query);
  
    // Crear la URL con los parámetros de la consulta
    const requestUrl = `https://platform.trazit.net:8443/TRAZiT-API/moduleMonitoring/MonitoringAPIqueries?actionName=SAMPLES_BY_STAGE&dbName=demo_v0_9_2&procInstanceName=mb_em&finalToken=eyJ1c2VyREIiOiJhZG1pbiIsImRhdGV0aW1lRm9ybWF0QXRQbGF0Zm9ybUxldmVsIjoiRElTQUJMRUQiLCJwcm9jc01vZHVsZU5hbWUiOiJpbnNwZWN0aW9uX2xvdCpJTlNQRUNUSU9OX0xPVFN8aW5zdHJ1bWVudHMqSU5TVFJVTUVOVFN8RGVtbypJTlNUUlVNRU5UU3xEaXNlYXNlU3R1ZGllcypDTElOSUNBTF9TVFVESUVTfG1iX2VtKk1PTklUT1JJTkd8c3RvY2sqU1RPQ0tTfG1vbl93YXRlcipNT05JVE9SSU5HfFJhbmREKlBST0pFQ1RfUkR8YXBwKmFwcCIsImRiTmFtZSI6ImRlbW9fdjBfOV8yIiwidHlwIjoiSldUIiwidXNlcl9wcm9jZWR1cmVfaGFzaGNvZGVzIjoiaW5zcGVjdGlvbl9sb3QqMSotMTUyMTA0OTg4NHxpbnN0cnVtZW50cyoxKi0xNDEyNjYyNDc0fERlbW8qMSoxNzcyNjIzMTI4fERpc2Vhc2VTdHVkaWVzKjEqMTk3NDc3MTczMXxtYl9lbSoxKi0xMDA2NDIxNjE3fHN0b2NrKjEqMTU2ODkzOTI5Mnxtb25fd2F0ZXIqMSoyMDUzODA2ODY1fFJhbmREKjEqMTg5Nzg4MDY0OXxhcHAqMSotMSIsImVTaWduIjoiZXNpZ24iLCJ1c2VyREJQYXNzd29yZCI6InRyYXppdCIsInVzZXJNYWlsIjoiTkVXdHJheml0LmluZm9AZ21haWwuY29tIiwidXNlcl9wcm9jZWR1cmVzIjoiW2luc3BlY3Rpb25fbG90LCBpbnN0cnVtZW50cywgRGVtbywgRGlzZWFzZVN0dWRpZXMsIG1iX2VtLCBzdG9jaywgbW9uX3dhdGVyLCBSYW5kRCwgYXBwXSIsImFwcFNlc3Npb25JZCI6IjExOTc5IiwiYXBwU2Vzc2lvblN0YXJ0ZWREYXRlIjoiV2VkIFNlcCAxMSAxNjoxNDoyNCBVVEMgMjAyNCIsInVzZXJSb2xlIjoic3VwZXJ1c2VyIiwiYWxnIjoiSFMyNTYiLCJpbnRlcm5hbFVzZXJJRCI6IjQ1NDg5MjIzIn0.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.IsqQzGQBkVQ0fCl8nY7ZGjE1cExz3EWmjZH6kelPeec&sampleFieldToRetrieve=sample_id%7Ccurrent_stage%7Cstatus%7Cstatus_previous%7Csampling_date%7Csampling_comment%7Csample_config_code%7Cprogram_name%7Clocation_name%7Cspec_code%7Cspec_variation_name&whereFieldsName=current_stage%7Csample_config_code+in*%7Crequires_tracking_sampling_end&whereFieldsValue=Sampling%7Clocation%7Cfalse*Boolean&isForTesting=false&query=${encodedQuery}`;
  
    // Enviar la consulta al backend con GET
    fetch(requestUrl)
      .then((response) => response.json())
      .then((data) => {
        this.queryResults = data; // Guardar los resultados de la consulta
        this.requestUpdate();
      })
      .catch((error) => {
        console.error('Error ejecutando la consulta:', error);
      });
  }
  

  _onFieldInput(e) {
    // Autocompletar para campos o tablas
    const inputValue = e.target.value.toLowerCase();
    const suggestions = this.tables.filter((table) =>
      table.toLowerCase().startsWith(inputValue)
    );
    // Mostrar sugerencias al usuario
  }

_formatLabel(field, lang = 'en') {
    // Reemplazar guiones bajos con espacios y capitalizar la primera letra de cada palabra
    const formattedField = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Si es español, ajustar la etiqueta según sea necesario
    if (lang === 'es') {
        // Aquí puedes agregar traducciones personalizadas si lo deseas
        return formattedField; // Cambiar si tienes un mapa de traducciones
    }
    
    return formattedField;
}
  render() {

    let allFieldsInDataArrSet = new Set();
    if (this.queryResults!==null){
        this.queryResults.forEach(item => {
            Object.keys(item).forEach(key => allFieldsInDataArrSet.add(key));
        });
        const allFieldsInDataArr = Array.from(allFieldsInDataArrSet);
    }

    const allFieldsInDataArr = Array.from(allFieldsInDataArrSet);
    const generatedColumns = allFieldsInDataArr.map(field => ({
        name: field,
        label_en: this._formatLabel(field), // Método para formatear las etiquetas
        label_es: this._formatLabel(field, 'es') // Método para formatear etiquetas en español
    }));

    let elem={
    
            "allowMultiSelection": false, 
            "refreshable":{ "enable": true}, 
            "printable":{ "enable": true}, 
            "downloadable":{"enable": true},   
            "columns" : generatedColumns,               
            "actions": [] 
    }

    return html`
      <div class="editor-container">
        <mwc-textfield
          label="SQL Query"
          value="${this.query}"
          @input="${this._onQueryChange}"
          placeholder="Escribe tu consulta SELECT"
          helper="Sólo se permiten consultas SELECT"
          errorMessage="Consulta no válida"
          ?invalid="${this.queryError}"
        ></mwc-textfield>
        <mwc-button
          label="Ejecutar consulta"
          ?disabled="${this.queryError}"
          @click="${this._executeQuery}"
        ></mwc-button>

        ${this.queryError ? html`<span class="error">Consulta no válida</span>` : nothing}

        <div class="result-table">
          ${this.queryResults
            ? this.readOnlyTable(
                elem, undefined, false, this.queryResults, "Data from the SQL: "+this.query, undefined, undefined, undefined, undefined, undefined)                                
            : nothing}
        </div>
      </div>
    `;
  }
}

customElements.define('sql-editor', SqlEditor);

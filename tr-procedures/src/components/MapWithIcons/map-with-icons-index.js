import { html , LitElement} from 'lit';
//import { CoreView } from './../../components/core-view';
//import { DialogsFunctions } from '../../components/GenericDialogs/DialogsFunctions';
import { mapWithIconsStyles } from './map-with-icons-styles.js';
import { mapWithIconsTemplate, pointTemplate } from './map-with-icons-template.js';
//import { actions } from './config'; // Asegúrate de importar las acciones si es necesario


//DialogsFunctions
export class MapWithIcons extends (LitElement) {
  static get styles() {
    return [mapWithIconsStyles];
  }

  static get properties() {
    return {
      samplePoints: { type: Array },
      selectedItems: { type: Array },
      //selectedAction: { type: Object },
      targetValue: { type: Object },
      procInstanceName: { type: String },
      config: { type: Object },
      langConfig: { type: Object },
      commonLangConfig: { type: Object },
      lang: { type: String},
      action: { type: Object },
      mapUrl: { type: String},
      actionOnHoverTheIcon: { type: Boolean },
      actionOnClickTheIcon: { type: Boolean },
      actionDisabled: { type: Boolean },      
    };
  }

  constructor() {
    super();
    this.samplePoints = [];
    this.selectedItems = [];
    this.action={}
    this.actionOnHoverTheIcon = true;  // Acción habilitada al pasar el mouse
    this.actionOnClickTheIcon = false; // Acción deshabilitada al hacer clic
    this.actionDisabled = false;     
    //this.selectedAction = [] //actions[0];

    this.langConfig = {
        "title": {
          "label_en": "Program Sampling Points", 
          "label_es": "Puntos de muestro del programa"
        },
        "fieldText": {
          "logBtn": { "label_en": "Log Sample", "label_es": "Registrar Muestra" },
          "shift": {
            "items": [
              { "keyName": "M1", "keyValue_en": "Morning 1", "keyValue_es": "Mañana 1" },
              { "keyName": "M2", "keyValue_en": "Morning 2", "keyValue_es": "Mañana 2" },
              { "keyName": "N", "keyValue_en": "Night", "keyValue_es": "Noche" }
            ],
            "label_en": "Shift", "label_es": "Turno"
          },
          "lot": {
            "items": [],
            "label_en": "Lot", "label_es": "Lote"
          }
        }
      }  
      this.commonLangConfig = {
        "cancelDialogButton": {
          "label_en": "Cancel", 
          "label_es": "Cancelar"
        },
        "confirmDialogButton": {
          "label_en": "Accept", 
          "label_es": "Aceptar"
        },
        "closeDialogButton":{
          "label_en": "Close", 
          "label_es": "Cerrar"
        },
        "confirmActionPhrase":{
          "label_en": "Are you sure you want to continue doing", 
          "label_es": "¿Está seguro que desea continuar aplicando"
        }
      }     
  }

  render() {

           
    return mapWithIconsTemplate.call(this, this.langConfig, this.commonLangConfig);
  }

  handleMapClick(event) {
    const imgElement = event.target;
    const rect = imgElement.getBoundingClientRect();
    const x = event.clientX - rect.left; // posición X dentro de la imagen
    const y = event.clientY - rect.top;  // posición Y dentro de la imagen

    console.log(`Top: ${y}px, Left: ${x}px`);
  }  
  mapIcon(icon) {
    if (icon===undefined){return ''}
    let path = icon.split("/");
    return path[path.length - 1];
  }

  pointTemplate() {
    return pointTemplate.call(this, this.langConfig, this.commonLangConfig);
  }

  get pointDialog() {
    return this.shadowRoot.querySelector("tr-dialog#pointDialog");
  }

  get shiftField() {
    return this.shadowRoot.querySelector("mwc-select#shift");
  }

  get lotField() {
    return this.shadowRoot.querySelector("mwc-select#lot");
  }

  get programInput() {
    return this.shadowRoot.querySelector("mwc-textfield[name=program_name]");
  }

  get locationInput() {
    return this.shadowRoot.querySelector("mwc-textfield[name=location_name]");
  }

  setLogSample() {
    this.targetValue = {};
    this.targetValue.fieldName = '';
    this.targetValue.fieldValue = '';
    if (this.lotField.value !== undefined) {
      if (this.targetValue.fieldName.length > 0) {
        this.targetValue.fieldName = this.targetValue.fieldName + "|";
        this.targetValue.fieldValue = this.targetValue.fieldValue + "|";
      }
      this.targetValue.fieldName = this.targetValue.fieldName + "production_lot";
      this.targetValue.fieldValue = this.targetValue.fieldValue + this.lotField.value;
    }

    if (this.shiftField.value !== undefined) {
      if (this.targetValue.fieldName.length > 0) {
        this.targetValue.fieldName = this.targetValue.fieldName + "|";
        this.targetValue.fieldValue = this.targetValue.fieldValue + "|";
      }
      this.targetValue.fieldName = this.targetValue.fieldName + "shift";
      this.targetValue.fieldValue = this.targetValue.fieldValue + this.shiftField.value;
    }
    //this.selectedAction = actions[0];
    this.reqParams = this.jsonParam(this.action, {}, this.targetValue);
    this.nextRequestCommons(this.action);
  }

  jsonParam() {
    let jsonParam = {};
    if (this.action.apiParams) {
      this.action.apiParams.forEach(p => {
        if (p.element) {
          jsonParam[p.query] = this[p.element].value;
        } else if (p.defaultValue) {
          jsonParam[p.query] = p.defaultValue;
        } else if (p.targetValue) {
          jsonParam[p.query] = this.targetValue[p.query];
        } else {
          jsonParam[p.query] = p.value;
        }
      });
    }
    return jsonParam;
  }

  setView() {
    this.samplePoints = [];
    this.selectedItems = [];    
    this.actionMethod(this.action.subAction);
  }
}

customElements.define('map-with-icons', MapWithIcons);
export default MapWithIcons;

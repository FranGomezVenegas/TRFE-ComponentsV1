import { LitElement } from "lit-element";
import { template } from "./app.template";
import { styles } from "./app.css";

export class DependencyForm extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      endpoint: { type: String },
      endpoints: { type: Array },
      notification: { type: String },
      notifications: { type: Array },      
      params: { type: Array },
      lang: { type: String },
      isFormValid: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.endpoints = [];
    this.params = [];
    this.notification = "";
    this.notifications = [];
    this.endpoint = "";
    this.lang = "";
  }

  render() {
    return template({
      endpoints: this.endpoints,
      notifications: this.notifications,
      params: this.params,
      lang: this.lang,
      checkValidity: this._checkValidity,
      handleChangeEndpoint: this._handleChangeEndpoint,
    });
  }

  _handleChangeEndpoint = (e) => {
    const idx = this.endpoints.findIndex(
      (endpoint) => endpoint.keyName === e.target.value
    );
    if (idx === -1) return [];
    this.endpoint = this.endpoints[idx].keyName;
    this.params = this.endpoints[idx]?.arguments_array ?? [];
  };

  getFormFields = () => {
    this.checkValidity();
    if(!this.isFormValid)
      return null;

    const payload = {};
    const fields = this.shadowRoot.querySelectorAll(
      "mwc-textfield, mwc-select, mwc-checkbox, mwc-radio"
    );

    fields.forEach((field) => {
      if (field.tagName === "MWC-TEXTFIELD" || field.tagName === "MWC-SELECT") {
        payload[field.name] = field.value;
      }

      if (field.tagName === "MWC-CHECKBOX") {
        payload[field.name] = field.checked;
      }

      if (field.tagName === "MWC-RADIO" && field.checked) {
        payload[field.name] = field.value;
      }
    });

    return payload;
  };

  getFieldTypes = () => {
    return this.params;
  }

  checkValidity = () => {
    const requiredFields = this.shadowRoot.querySelectorAll("[required]");
    const validFields = []; // stores the validity of all required fields

    requiredFields.forEach((field) => {
      validFields.push(field.validity.valid);
    });

    // if false is not in the array of validFields, then the form is valid
    this.isFormValid = !validFields.includes(false);
    return this.isFormValid;
  };
}

window.customElements.define("dependency-form", DependencyForm);

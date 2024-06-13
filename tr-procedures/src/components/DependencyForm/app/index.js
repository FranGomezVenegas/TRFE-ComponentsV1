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
      isFormValid: { type: Boolean },
      toggles: { type: Object },
      objectTypes: {type : Array},
      rowSelectedData: { type: Object },
      objectTypesStr: {type: String}
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
    this.toggles = {};
    this.objectTypes = [];
    this.objectTypesStr=""
    this.rowSelectedData = {};
    this.notificationChecked = false;
    this.tmpNotification = [];
  }

  render() {
    return template({
      endpoints: this.endpoints,
      notifications: this.notifications,
      tmpNotifications: this.tmpNotifications,
      params: this.params,
      lang: this.lang,
      checkValidity: this._checkValidity,
      toggles: this.toggles,
      objectTypes: this.objectTypes,
      objectTypesStr: this.objectTypesStr,
      rowSelectedData: this.rowSelectedData,
      notificationChecked: this.notificationChecked,
      endpoint: this.endpoint,
      handleChangeEndpoint: this._handleChangeEndpoint,
      toggleChanged: this._toggleChanged,
      handleChangeStep: this._handleChangeStep,
      visibleNotification: this._visibleNotification,
    });
  }

  _visibleNotification = (e) =>  {
    this.notificationChecked = !this.notificationChecked;
    this.notifications = this.tmpNotifications;
    if(this.notificationChecked) {
      this.notifications = [];
    }
    this.requestUpdate();
  }

  _handleChangeStep = (name) => (e) => {
    this.objectTypes = [];
    this.objectTypesStr="";
    const stepValue = e.target.value;
    let steps = JSON.parse(sessionStorage.getItem("steps"));
    const tmp = JSON.parse(steps[stepValue - 1].dynamic_data);
    console.log(tmp)
    //this.objectTypesStr=tmp.object_type
    tmp.map((step, i) => {
      if (this.objectTypesStr.length>0){
        this.objectTypesStr=this.objectTypesStr+"|"
      }
      this.objectTypesStr=this.objectTypesStr+step.object_type;
      this.objectTypes.push(step.object_type);
    });
    this.requestUpdate();
  };

  _toggleChanged = (name) => () => {
    this.toggles[name] = !this.toggles[name];
    this.requestUpdate();
  };

  _handleChangeEndpoint = (e) => {
    //sessionStorage.setItem('actionName',"SCRIPT_ADD_STEP");
    //this.rowSelectedData = undefined;
    //this.rowSelectedData={}
    this.willUpdateData = undefined;
    this.toggles = {};
    if (this.endpoints === undefined) return [];
    const idx = this.endpoints.findIndex(
      (endpoint) => endpoint.keyName === e.target.value
    );
    if (idx === -1) return [];
    this.endpoint = this.endpoints[idx].keyName;
    this.params = this.endpoints[idx]?.arguments_array ?? [];
    console.log(this.endpoint, this.params)
    this.requestUpdate();
  };

  getFormFields = () => {
    console.log('getFormFields')
    this.checkValidity();
    if (!this.isFormValid) return null;

    const payload = {};
    const fields = this.shadowRoot.querySelectorAll(
      "mwc-textfield, mwc-select, mwc-checkbox, mwc-radio"
    );

    fields.forEach((field) => {
      console.log('field', field)
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
  };

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

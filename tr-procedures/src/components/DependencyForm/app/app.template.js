import { html } from "lit-element";
import "@material/mwc-select";
import "@material/mwc-textfield";
import "@material/mwc-list/mwc-list-item";
import { elementTypes } from "../config";

export const template = (props) => {
  
  return html`
    <div class="container">
      <form id="#endpoint-form" action="/" method="get">
        <div class="item-container">
          <mwc-select
            required
            fixedMenuPosition
            @change=${props.handleChangeEndpoint}
            id="endpoint"
            name="endpoint"
            label="endpoint"
          >
            ${props.endpoints.map((endpoint, idx) => {
              return html`
                <mwc-list-item value=${endpoint.keyName}>
                  ${endpoint["keyValue_" + props.lang]}
                </mwc-list-item>
              `;
            })}
          </mwc-select>
        </div>
        <div class="form-fields">
          ${props.params.map((param, idx) => {
            const required = param["is_mandatory?"];
            if (param.type === elementTypes.Number) {
              return html`
                <mwc-textfield
                  ?required=${required}
                  outlined
                  type="number"
                  label=${param.name}
                  name=${param.name}
                  @blur=${props.checkValidity}
                ></mwc-textfield>
              `;
            } else if (param.type === elementTypes.Text) {
              return html`
                <mwc-textfield
                  ?required=${required}
                  type="text"
                  label=${param.name}
                  name=${param.name}
                  @blur=${props.checkValidity}
                ></mwc-textfield>
              `;
            } else if (param.type === elementTypes.TextArr) {
              return html`
                <mwc-textfield
                  type="text"
                  ?required=${required}
                  label=${param.name}
                  name=${param.name}
                  @blur=${props.checkValidity}
                ></mwc-textfield>
              `;
            }
            return html`${param.type}`;
          })}
        </div>
      </form>
    </div>
  `;
};

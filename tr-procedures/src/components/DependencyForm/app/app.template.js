import { html } from "lit-element";
import "../components/elements";
import "@material/mwc-list/mwc-list-item";
import "@material/mwc-select";

export const template = (props) => {
  return html`
    <div class="container">
      <h3 class="title">Dependency DataList</h3>
      <form action="" method="post">
        <div class="item-container">
          <div class="select-wrapper">
            <select
              id="endpoint"
              name="endpoint"
              @change=${props.handleChangeEndpoint}
            >
              <option value="-1"></option>
              ${props.endpoints.map((endpoint, idx) => {
                return html`
                  <option value=${idx}>${endpoint.endpoint_name}</option>
                `;
              })}
            </select>
          </div>
        </div>
        <dynamic-elements .params=${props.params}></dynamic-elements>
      </form>
    </div>
  `;
};

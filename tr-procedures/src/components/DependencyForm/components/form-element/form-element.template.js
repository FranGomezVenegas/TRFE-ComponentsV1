import {html} from 'lit-element';
import {elementTypes} from '../../config';
import '@material/mwc-textfield';

export const template = (props) => {
  if (props.param.type === elementTypes.Number) {
    return html`
      <mwc-textfield 
        outlined
        type="number"
        label=${props.param.name}
        id=${props.param.name}
        name=${props.param.name}
      ></mwc-textfield>
    `;
  } else if (props.param.type === elementTypes.Text) {
    return html`
      <mwc-textfield 
        outlined
        type="text"
        label=${props.param.name}
        id=${props.param.name}
        name=${props.param.name}
      ></mwc-textfield>
    `
  } else if (props.param.type === elementTypes.TextArr) {
    return html`
      <mwc-textfield 
        outlined
        type="text"
        label=${props.param.name}
        id=${props.param.name}
        name=${props.param.name}
      ></mwc-textfield>
    `
  } 
  return html`
    <div>No Data Available</div>
  `
};

import {html} from 'lit-element';
import "../../components/form-element";

export const template = (props) => {
  return html`
    ${props.params.map((param) => {
      return html`
        <form-element 
          .param=${param}
        ></form-element>
      `
    })}
  `;
};

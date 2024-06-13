import {html} from 'lit-element';
import '../speclimitquantitative';
import '@material/mwc-textfield';


export const template = (
  rules,
  selectedRule,
  inputValue1,
  inputValue2,
  errorMessage,
  handleRuleChange,
  handleInputChange1,
  handleInputChange2
) => {
  return html`
    <div>
      <label for="rules">Selecciona una regla:</label>
      <select id="rules" @change="${handleRuleChange}">
        ${rules.map(
          rule => html`<option value="${rule.id}" ?selected="${rule.id === selectedRule}">${rule.description}</option>`
        )}
      </select>
    </div>
    <div>
      <label for="input"></label><br>
      <div class="input-container">
        <span>${getPrefix(selectedRule)}</span>
        ${selectedRule === 1 || selectedRule === 2
          ? html`
              <input
                type="text"
                .value="${inputValue1}"
                maxlength="6"
                @input="${handleInputChange1}"
                placeholder="X"/>
              <span> y </span>
              <input
                type="text"
                .value="${inputValue2}"
                maxlength="6"
                @input="${handleInputChange2}"
                placeholder="Y"/>  ${selectedRule===1?` incluidos`:``}`
          : html`
              <input
                type="text"
                .value="${inputValue1}"
                maxlength="6"
                @input="${handleInputChange1}"
                placeholder=""/>`
        }
      </div>
    </div>
    ${errorMessage
      ? html`<div class="error">${errorMessage}</div>`
      : ''}
  `;
};

function getPrefix(selectedRule) {
  switch (selectedRule) {
    case 1:
      return 'Entre ';
    case 2:
      return 'Entre ';
    case 3:
      return 'Menor de ';
    case 4:
      return 'Menor o igual a ';
    case 5:
      return 'Mayor de ';
    case 6:
      return 'Mayor o igual a ';
    default:
      return '';
  }
}


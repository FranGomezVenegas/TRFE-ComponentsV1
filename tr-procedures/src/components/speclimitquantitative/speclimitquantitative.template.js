import {html} from 'lit';
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
  handleInputChange2,
  lang
) => {
  if (lang===undefined){
    lang="en"
  }
  return html`
    <div>
      <label for="rules">${lang=='es'?`Selecciona una regla`:`Select one rule`}</label>
      <select id="rules" @change="${handleRuleChange}">
        ${rules.map(
          rule => html`<option value="${rule.id}" ?selected="${rule.id === selectedRule}">${rule["description_"+lang]}</option>`
        )}
      </select>
    </div>
    <div>
      <label for="input"></label><br>
      <div class="input-container">
        <span>${getPrefix(selectedRule, lang)}</span>
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
                placeholder="Y"/>  ${selectedRule===1? `${lang=='es'?  `incluidos`: `included`}`:``}`
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

function getPrefix(selectedRule, lang) {
  switch (selectedRule) {
    case 1:
      if (lang=="es"){
        return 'Entre ';
      }else{
        return 'Between ';
      }
    case 2:
      if (lang=="es"){
        return 'Entre ';
      }else{
        return 'Between ';
      }
    case 3:
      if (lang=="es"){
        return 'Menor de ';
      }else{
        return 'Less than ';
      }
    case 4:
      if (lang=="es"){
        return 'Menor o igual a ';
      }else{
        return 'Less or equal to ';
      }
    case 5:
      if (lang=="es"){
        return 'Mayor de ';
      }else{
        return 'Greater than ';
      }
    case 6:
      if (lang=="es"){
        return 'Mayor o igual a ';
      }else{
        return 'Greater or equal to ';
      }
    default:
      return '';
  }
}


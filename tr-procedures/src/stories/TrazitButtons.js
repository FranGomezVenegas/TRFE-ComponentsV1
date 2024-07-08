import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import './button.css';
import '../components/Buttons/ButtonsFunctions';

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor = null, size, label, onClick }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  const data=[
    {
        "actionName": "CONFIG_NEW_CATEGORY",
        "requiresDialog": true,
        "notGetViewData": false,
        "selectedItemPropertyName": "selectedItems",	  
        "button": {
          "icon": "edit",
          "title": {
            "label_en": "Add new category",
            "label_es": "Añadir nueva categoría"
          },
          "requiresGridItemSelected": false
        },
        "dialogInfo": {
          "name": "genericDialog",
          "fields": [
            {
              "text1": {
                "label_en": "New category name",
                "label_es": "Nombre para nueva categoría",
                "defaultValue": "",
                "optional": false
              }
            }
          ]
        },
        "endPointParams": [
          {
            "argumentName": "newCategoryName",
            "element": "text1"							
          }
        ]
    }    
  ]
  
  return html`
  ${getButton({}, data, false)}
  `;
};

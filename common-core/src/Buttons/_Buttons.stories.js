import { html } from 'lit';
import { ButtonsFunctions } from './ButtonsFunctions';

export default {
  title: 'Components/ButtonsFunctions',
  component: 'buttons-functions', // Asegúrate de que el nombre del componente sea correcto
};

const Template = (args) => html`<buttons-functions .${args}></buttons-functions>`;

export const Default = Template.bind({});
Default.args = {
  // Define los argumentos necesarios aquí
};

Default.parameters = {
  docs: {
    description: {
      component: `
        # ButtonsFunctions Component

        The \`ButtonsFunctions\` component is a highly customizable component that enhances a base class with various button-related functionalities.

        ## Overview

        The \`ButtonsFunctions\` function enhances a base class with various button-related functionalities. It extends a base class with functionalities from multiple modules to manage button interactions, styles, and logic.

        ## Variables and Properties

        ### 1. \`actions\`

        - **Type:** Array
        - **Description:** An array of action objects that define the buttons and their behaviors.
        - **Properties:**
          - \`button\`: An object defining the button's properties.
            - \`icon\`: The icon displayed on the button.
            - \`class\`: CSS classes applied to the button.
            - \`title\`: An object containing titles in different languages.
              - \`label_en\`: Title in English.
              - \`label_es\`: Title in Spanish.
            - \`img\`: The image displayed on the button.
            - \`requiresGridItemSelected\`: Boolean indicating if a grid item selection is required.
            - \`showWhenSelectedItem\`: Defines conditions to show the button when an item is selected.
            - \`hideWhenSelectedItem\`: Defines conditions to hide the button when an item is selected.
          - \`actionName\`: The name of the action.

        #### Logic:

        - **\`btnDisabled(action, viewModelFromProcModel)\`**
          - Determines if a button should be disabled based on the \`requiresGridItemSelected\` property and the selected items.

        - **\`btnHiddenForRows(action, selItems)\`**
          - Determines if a button should be hidden based on the \`showWhenSelectedItem\` and \`hideWhenSelectedItem\` properties.

        ### 2. \`refreshable\`

        - **Type:** Object
        - **Description:** Defines properties for the refresh button.
        - **Properties:**
          - \`enable\`: Boolean to enable or disable the refresh button.
          - \`icon\`: Icon for the refresh button.
          - \`title\`: An object containing titles in different languages.

        #### Logic:

        - **\`GetViewData(setGrid = true, viewQuery)\`**
          - Fetches data and updates the view, optionally using the refresh button properties.

        ### 3. \`printable\`

        - **Type:** Object
        - **Description:** Defines properties for the print button.
        - **Properties:**
          - \`enable\`: Boolean to enable or disable the print button.
          - \`icon\`: Icon for the print button.
          - \`title\`: An object containing titles in different languages.

        #### Logic:

        - **\`printTable()\`**
          - Prints the table based on the printable button properties.

        ### 4. \`downloadable\`

        - **Type:** Object
        - **Description:** Defines properties for the download button.
        - **Properties:**
          - \`enable\`: Boolean to enable or disable the download button.
          - \`icon\`: Icon for the download button.
          - \`title\`: An object containing titles in different languages.

        #### Logic:

        - **\`downloadDataTableToCSV(sectionModel, data, selectedItems, downloadable)\`**
          - Downloads the data table as a CSV file based on the downloadable button properties.

        ## Functions

        ### \`getButtonForRows(actions, data, isProcManagement, parentData)\`

        Generates buttons for each row based on the \`actions\` array.

        ### \`getButton(sectionModel, data, isProcManagement)\`

        Generates a button based on the section model.

        ### \`btnDisabled(action, viewModelFromProcModel)\`

        Determines if a button should be disabled.

        ### \`btnHiddenForRows(action, selItems)\`

        Determines if a button should be hidden for rows based on selection.

        ### \`btnHidden(action, selItems)\`

        Determines if a button should be hidden based on the selected items.

        ### \`GetViewData(setGrid = true, viewQuery)\`

        Fetches and sets view data based on the query definition.

        ### \`GetAlternativeViewData(queryDefinition, selObject = {})\`

        Fetches alternative view data.

        ### \`GetQueryForDialogGrid(actionDefinition)\`

        Fetches data for a dialog grid.

        ### \`GetQueriesForDialog(actionDefinition)\`

        Fetches multiple queries for a dialog.

        ### \`getGenericDialogGridItems(dialogInfo)\`

        Fetches generic dialog grid items based on the dialog info.

        ### \`disabledByCertification(action)\`

        Determines if a button should be disabled by certification (returns \`false\` by default).

        ## Styles

        The buttons have various CSS styles applied to them to control their appearance. Here are some examples:

        - **mwc-icon-button#lang**
          \`\`\`css
          color: #1473e6;
          font-family: Montserrat;
          font-weight: bold;
          font-size: 19px;
          \`\`\`

        - **mwc-button**
          \`\`\`css
          background-color: #1473e6;
          font-family: Montserrat;
          font-weight: bold;
          font-size: 19px;
          border-radius: 12px;
          \`\`\`

        ## Conclusion

        This documentation covers the primary variables, properties, and logic used in the \`ButtonsFunctions.js\` file. Each property and function is explained to provide a clear understanding of their roles and interactions within the code.
      `,
    },
  },
};

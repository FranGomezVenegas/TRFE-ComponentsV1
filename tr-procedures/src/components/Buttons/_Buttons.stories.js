import { html } from 'lit-html';
import { ButtonsFunctions } from './ButtonsFunctions.js';  // Asegúrate de que esta ruta sea correcta

// Crear una instancia de la clase que contiene los métodos
const BaseClass = ButtonsFunctions(class {});

export default {
  title: 'Components/Buttons',
  component: 'buttons-component',
  tags: ['autodocs'],
  argTypes: {
    actions: {
      control: 'array',
      description: 'An array of action objects representing the buttons. Each object should have properties like `icon`, `title`, `class`, `style`, and conditions for showing or hiding the button.',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    data: {
      control: 'object',
      description: 'The data associated with the buttons and the selected item.',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    isProcManagement: {
      control: 'boolean',
      description: 'Flag indicating if this is for process management.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    parentData: {
      control: 'object',
      description: 'The data of the parent component, if applicable.',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
  },
};

const Template = ({ actions, data, isProcManagement, parentData }) => html`
  <div>
    ${BaseClass.prototype.getButton(actions, data, isProcManagement)}
  </div>
`;

const TemplateForRows = ({ actions, data, isProcManagement, parentData }) => html`
  <div>
    ${BaseClass.prototype.getButtonForRows(actions, data, isProcManagement, parentData)}
  </div>
`;

export const SingleButton = Template.bind({});
SingleButton.args = {
  actions: [
    {
      actionName: 'refresh',
      button: {
        icon: 'refresh',
        title: { label_en: 'Refresh', label_es: 'Actualizar' },
        class: 'refresh-button',
        style: 'color: blue;',
        requiresGridItemSelected: true,
        showWhenSelectedItem: { column: 'status', value: 'active' },
        hideWhenSelectedItem: { column: 'status', value: 'inactive' },
      },
    },
  ],
  data: { status: 'active' },
  isProcManagement: true,
  parentData: {},
};

export const ButtonsInRows = TemplateForRows.bind({});
ButtonsInRows.args = {
  actions: [
    {
      actionName: 'edit',
      button: {
        icon: 'edit',
        title: { label_en: 'Edit', label_es: 'Editar' },
        class: 'edit-button',
        style: 'color: green;',
        requiresGridItemSelected: false,
        showWhenSelectedItem: { column: 'editable', value: 'true' },
        hideWhenSelectedItem: { column: 'status', value: 'archived' },
      },
    },
  ],
  data: JSON.stringify([
    { status: 'active', editable: 'true' },
    { status: 'inactive', editable: 'false' },
  ]),
  isProcManagement: true,
  parentData: JSON.stringify({}),
};

export const Group1 = Template.bind({});
Group1.args = {
  actions: [
    {
      actionName: 'delete',
      button: {
        icon: 'delete',
        title: { label_en: 'Delete', label_es: 'Eliminar' },
        class: 'delete-button',
        style: 'color: red;',
        requiresGridItemSelected: true,
        showWhenSelectedItem: { column: 'status', value: 'inactive' },
        hideWhenSelectedItem: { column: 'status', value: 'active' },
      },
    },
  ],
  data: { status: 'inactive' },
  isProcManagement: false,
  parentData: {},
};

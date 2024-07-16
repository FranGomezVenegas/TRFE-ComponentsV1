import { html } from 'lit';
import './multiselect.css.js';
import './multiselect.template.js';
import './index.js';


export default {
  title: 'Components/Multiselect',
  component: 'multiselect',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The `multiselect` component allows users to select multiple options from a predefined list. It provides flexibility with configuration options and handles various selection states.'
      },
    },
  },
  argTypes: {
    config: {
      description: 'Configuration object for the multiselect component',
      control: 'object',
      table: {
        type: { summary: 'object' },
      },
    },
    maxSelections: {
      description: 'Maximum number of selections allowed',
      control: 'number',
      table: {
        category: 'config',
        type: { summary: 'number' },
        defaultValue: { summary: 3 },
      },
    },
    disabled: {
      description: 'Indicates if the multiselect is disabled',
      control: 'boolean',
      table: {
        category: 'config',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    options: {
      description: 'Array of options available for selection',
      control: 'array',
      table: {
        type: { summary: 'array' },
      },
    },
    label: {
      description: 'Text representing the option',
      control: 'text',
      table: {
        category: 'options',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    value: {
      description: 'Value of the option',
      control: 'text',
      table: {
        category: 'options',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    selected: {
      description: 'Indicates if the option is selected by default',
      control: 'boolean',
      table: {
        category: 'options',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
};

const Template = ({ config, options }) => html`
  <multiselect .config=${config} .options=${options}></multiselect>
`;

export const Default = Template.bind({});
Default.args = {
  config: {
    maxSelections: 3,
    disabled: false,
  },
  options: [
    { label: "Option 1", value: 'opt1', selected: true },
    { label: "Option 2", value: 'opt2' },
    { label: "Option 3", value: 'opt3' },
    { label: "Option 4", value: 'opt4' },
  ],
};
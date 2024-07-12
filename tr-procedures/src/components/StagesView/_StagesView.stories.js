import { html } from 'lit-html';
import './stagesview.css.js';
import './stagesview.template.js';
import './index.js';

export default {
  title: 'Components/StagesView',
  component: 'stages-view',
  tags: ['autodocs'],
  argTypes: {
    stages: {
      control: 'array',
      description: 'An array of objects representing the stages of the process. Each object should have the following properties:\n' +
                   '- `name`: `String` - The name of the stage (e.g., "Assigned", "Started", "Completed", "Approved").',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    currentstage: {
      control: 'number',
      description: 'The index of the current stage, starting from 0.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    data: {
      control: 'object',
      description: 'An object containing detailed data about the stages and the current stage. It should have the following properties:\n' +
                   '- `stages`: `Array` - An array of stage objects, similar to the `stages` property.\n' +
                   '- `currentStageName`: `String` - The name of the current stage.\n' +
                   '- `currentState`: `Number` - The index of the current stage, starting from 0.',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    lang: {
      control: 'text',
      description: 'The language code used for localization. Defaults to English ("en").',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'en' },
      },
    },
    example: {
      control: 'text',
      description: 'Example property for demonstration purposes.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
};

const Template = ({ stages, currentstage, data, lang, example }) => html`
  <stages-view
    .stages=${stages}
    .currentstage=${currentstage}
    .data=${data}
    .lang=${lang}
    .example=${example}
  ></stages-view>
`;

export const Default = Template.bind({});
Default.args = {
  stages: [
    { name: 'Assigned' },
    { name: 'Started' },
    { name: 'Completed' },
    { name: 'Approved' },
  ],
  currentstage: 1,
  data: {
    stages: [
      { name: 'Assigned' },
      { name: 'Started' },
      { name: 'Completed' },
      { name: 'Approved' },
    ],
    currentStageName: 'Assigned',
    currentState: 0,
  },
  lang: 'en',
  example: 'This is an example',
};

export const Group1 = Template.bind({});
Group1.args = {
  stages: [
    { name: 'Initiated' },
    { name: 'In Progress' },
    { name: 'Finished' },
    { name: 'Reviewed' },
  ],
  currentstage: 2,
  data: {
    stages: [
      { name: 'Initiated' },
      { name: 'In Progress' },
      { name: 'Finished' },
      { name: 'Reviewed' },
    ],
    currentStageName: 'Finished',
    currentState: 2,
  },
  lang: 'en',
  example: 'Group 1 Example',
};

export const Group2 = Template.bind({});
Group2.args = {
  stages: [
    { name: 'Open' },
    { name: 'Processing' },
    { name: 'Closed' },
    { name: 'Archived' },
  ],
  currentstage: 3,
  data: {
    stages: [
      { name: 'Open' },
      { name: 'Processing' },
      { name: 'Closed' },
      { name: 'Archived' },
    ],
    currentStageName: 'Archived',
    currentState: 3,
  },
  lang: 'en',
  example: 'Group 2 Example',
};

export const Group3 = Template.bind({});
Group3.args = {
  stages: [
    { name: 'Draft' },
    { name: 'Submitted' },
    { name: 'Reviewed' },
    { name: 'Published' },
  ],
  currentstage: 1,
  data: {
    stages: [
      { name: 'Draft' },
      { name: 'Submitted' },
      { name: 'Reviewed' },
      { name: 'Published' },
    ],
    currentStageName: 'Submitted',
    currentState: 1,
  },
  lang: 'en',
  example: 'Group 3 Example',
};

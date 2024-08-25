import { html } from 'lit';
import { EndpointsList } from './EndpointsList';
import './EndpointsList'

export default {
  title: 'Components/EndpointsList',
  component: 'endpoints-list',
  parameters: {
    docs: {
      description: {
        component: 'The `EndpointsList` component is used to manage serial port communication. It allows configuration of various serial port settings and provides a list of available ports.'
      },
    },
  },  
  argTypes: {
    docs: { control: 'array' },
    apis: { control: 'array' },
    selectedApis: { control: 'array' },
  },
};

const Template = ({ storybook }) => html`
  <endpoints-list ?storybook=${storybook} ></endpoints-list>
`;

export const Default = Template.bind({});
Default.args = {
  storybook: true
};

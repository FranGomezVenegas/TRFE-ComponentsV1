import { html } from 'lit';
import './DataViews.js'; // Asegúrate de que la ruta sea correcta

export default {
  title: 'Components/DataViews/RolesAndActions',
  component: 'roles-and-actions',
  parameters: {
    docs: {
      description: {
        component: 'A component to display roles and their associated actions.'
      }
    }
  },
  argTypes: {
    title: { control: 'text' },
    roles: { control: 'array' },
    actions: { control: 'array' }
  }
};

const Template = ({ title, roles, actions }) => html`
  <roles-and-actions
    .title=${title}
    .roles=${roles}
    .actions=${actions}
  ></roles-and-actions>
`;

export const Default = Template.bind({});
Default.args = {
  title: 'Roles and Actions',
  roles: ['Admin', 'User', 'Guest'],
  actions: ['Create', 'Read', 'Update', 'Delete']
};

export const CustomRolesAndActions = Template.bind({});
CustomRolesAndActions.args = {
  title: 'Custom Roles and Actions',
  roles: ['Editor', 'Viewer'],
  actions: ['Edit', 'View']
};

export const NoRolesOrActions = Template.bind({});
NoRolesOrActions.args = {
  title: 'No Roles or Actions',
  roles: [],
  actions: []
};

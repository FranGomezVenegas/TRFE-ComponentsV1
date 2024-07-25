import { html } from 'lit';
import './DataViews.js';  // Ajusta esta ruta según la ubicación de tu DataViews.js

export default {
  title: 'Components/DataViews/readOnlyTable',
  component: 'read-only-table',
  parameters: {
    docs: {
      description: {
        component: 'A read-only table component that displays data in a structured format.'
      }
    }
  },
  argTypes: {
    title: { control: 'text' },
    dataArr: { control: 'array' },
    columns: { control: 'array' },
    style: { control: 'text' },
    isSecondLevel: { control: 'boolean' }
  }
};

const Template = ({ title, dataArr, columns, style, isSecondLevel }) => html`
  <read-only-table
    .title=${title}
    .dataArr=${dataArr}
    .columns=${columns}
    .style=${style}
    .isSecondLevel=${isSecondLevel}
  ></read-only-table>
`;

export const Default = Template.bind({});
Default.args = {
  title: 'Sample Table',
  dataArr: [
    { id: 1, name: 'Item 1', value: 'Value 1' },
    { id: 2, name: 'Item 2', value: 'Value 2' }
  ],
  columns: [
    { name: 'id', label: 'ID' },
    { name: 'name', label: 'Name' },
    { name: 'value', label: 'Value' }
  ],
  style: 'width: 100%;',
  isSecondLevel: false
};

export const NoData = Template.bind({});
NoData.args = {
  title: 'Empty Table',
  dataArr: [],
  columns: [
    { name: 'id', label: 'ID' },
    { name: 'name', label: 'Name' },
    { name: 'value', label: 'Value' }
  ],
  style: 'width: 100%;',
  isSecondLevel: false
};

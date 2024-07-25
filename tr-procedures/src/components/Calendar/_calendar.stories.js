import { html } from 'lit';
import { Meta } from '@storybook/web-components';
import { calendarConfig, dataAllInOneData } from './_calendar.stories.fakeData';

import './index'; // Importa tu componente

// Importa el contenido del README.md
import readme from './README.md';

export default {
  title: 'Calendar Component',
  component: 'calendar-component', // Asegúrate de que este es el nombre correcto del componente
  tags: ['autodocs'],
  parameters: {
    docs: {
      autodocs: true,
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    lang: { control: 'text', description: 'Language setting for the component' },
    calendarConfig: {
      control: 'object',
      description: 'Configuration object for the calendar',
      table: {
        type: { summary: 'object' },
        detail: `
          - **locale**: Locale setting for the calendar (e.g., 'en').
          - **showWeekNumbers**: Whether to show week numbers (boolean).
          - **firstDayOfWeek**: The first day of the week (number, 0 for Sunday, 1 for Monday, etc.).
        `,
      },
    },
    dataAllInOneData: {
      control: 'object',
      description: 'Array of event data objects',
      table: {
        type: { summary: 'object[]' },
        detail: `
          Each event object contains:
          - **id**: Event ID (number).
          - **name**: Event name (string).
          - **date**: Event date in YYYY-MM-DD format (string).
        `,
      },
    },
  },
};

const Template = (args) => html`<calendar-component .lang=${args.lang} .config=${args.calendarConfig} .dataAllInOneData=${args.dataAllInOneData}></calendar-component>`;

export const Default = Template.bind({});
Default.args = {
  lang: 'en',
  calendarConfig: calendarConfig,
  dataAllInOneData: dataAllInOneData,
};

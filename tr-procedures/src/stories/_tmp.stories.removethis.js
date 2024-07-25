// _tmp.stories.js

import { html } from 'lit';
import { Meta } from '@storybook/web-components';

// Reemplaza 'MyComponent' con el nombre del componente que estás documentando
//import '../path/to/your/component';

// Define la metadata del componente
export default {
  title: 'Components/MyComponent', // Cambia 'MyComponent' por el nombre de tu componente
  component: 'my-component', // Cambia 'my-component' por el nombre de tu componente personalizado
  tags: ['autodocs'],
  parameters: {
    docs: {
      autodocs: true,
    },
  },
};

// Define una plantilla base para tu componente
const Template = (args) => html`<my-component .prop1=${args.prop1} .prop2=${args.prop2}></my-component>`;

// Exporta las variaciones de tu componente (puedes agregar más si lo necesitas)
export const Default = Template.bind({});
Default.args = {
  prop1: 'value1', // Cambia 'prop1' y 'value1' por las propiedades y valores por defecto de tu componente
  prop2: 'value2', // Cambia 'prop2' y 'value2' por las propiedades y valores por defecto de tu componente
};

import { html } from 'lit';
import './flipcard'; // Asegúrate de que este archivo exporta `flip-card` correctamente.

export default {
  title: 'Components/FlipCard',
  component: 'flip-card',
  tags: ['autodocs'],
  argTypes: {
    config: {
      control: 'object',
      description: 'Configuración del flip-card. Incluye propiedades como `flipCardAllowed` y `cardsPerRow`.',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    data: {
      control: 'object',
      description: 'Datos para cada tarjeta. Incluye propiedades como `textLow`, `textTop`, `flipCardAllowed`, `clickLinkAllowed` y `contentOnBack`.',
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '[]' },
      },
    },
    lang: {
      control: 'text',
      description: 'Idioma para la tarjeta.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'es' },
      },
    },
  },
};

const Template = ({ lang, config, data }) => html`
  <flip-card .lang=${lang} .config=${config} .data=${data}></flip-card>
`;

export const Group1 = Template.bind({});
Group1.args = {
  lang: 'es',
  config: { flipCardAllowed: true, cardsPerRow: 3 },
  data: [
    { 
      textLow: "Hola11", 
      textTop: 'Hola', 
      flipCardAllowed: true, 
      clickLinkAllowed: true,
      contentOnBack: {
        detail: [
          { label_en: 'Detail 1', label_es: 'Detalle 1' },
          { label_en: 'Detail 2', label_es: 'Detalle 2' },
        ]
      }
    },
    { textLow: "Hola12", textTop: 'Hola', flipCardAllowed: true, clickLinkAllowed: true },
    { textLow: "Hola13", textTop: 'Hola', flipCardAllowed: true, clickLinkAllowed: true },
    { textLow: "Hola14", textTop: 'Hola', flipCardAllowed: true, clickLinkAllowed: true }
  ],
};

export const Group2 = Template.bind({});
Group2.args = {
  lang: 'es',
  config: { flipCardAllowed: false, cardsPerRow: 2 },
  data: [
    { 
      textLow: "Hola222", 
      textTop: 'Hola', 
      flipCardAllowed: true, 
      clickLinkAllowed: true,
      contentOnFront: {
        "textTop":{ label_en: 'Detail A', label_es: 'Detalle A', type:'warning' },
        "textLow":{ label_en: 'Detail A', label_es: 'Detalle A', type:'critical' }
      },
      contentOnBack: {
        detail: { 
          label_en: ['Detail Abb'], 
          label_es: ['Detalle A']         
        }
      }
    }
  ],
};

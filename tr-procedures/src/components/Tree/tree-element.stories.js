import { html } from 'lit';
import './tree-element.js';
import TreeElementDocs from './TreeElementDocs.mdx';
import TreeElementDocsMasterDataExample from './TreeElementDocsMasterDataExample.mdx';

export default {
  title: 'TRAZiT Actions/Dialogs/Generic Dialog/TreeElement',
  component: 'tree-element',
  
  argTypes: {
    data: {
      description: 'The data used to construct the tree structure.',
      control: 'object',
      table: {
        type: { summary: 'Array' },
      },
    },
    specification: {
      description: 'An object that defines how the tree data should be interpreted.',
      control: 'object',
      table: {
        type: { summary: 'Object' },
      },
    },
    label: {
      description: 'The label displayed when no item is selected.',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select an item' },
      },
    },
    expanded: {
      description: 'Controls whether the component is initially rendered expanded.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
};


const Template = ({ data, specification, config, expanded, lang }) => html`
  <tree-element
    .data="${data}"
    .specification="${specification}"
    lang="${lang}"
    .config="${config}"
    ?expanded="${expanded}">
  </tree-element>
`;

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      name: "hola lvl1",
      level2: [
        { otro: "hola lvl2", otrolabel: "hola lbl lvl2", level3: [{ otro: "holaa lvl3" }] },
        { otro: "holaa lvl2" },
        { otro: "holaaa lvl2" },
        { otro: "holaaaaa lvl2" },
        { otro: "adios lvl2" }
      ]
    },
    {
      name: "adios lvl1"
    }
  ],
  lang:"en",
  config: {
    label_en:"Example", label_es:"Ejemplo",
    items:[
      {
        name: "items hola lvl1",
        description: "description for items hola lvl1",
        level2: [
          { otro: "hola lvl2", otrolabel: "hola lbl lvl2", level3: [{ otro: "holaa lvl3" }] },
          { otro: "holaa lvl2" },
          { otro: "holaaa lvl2" },
          { otro: "holaaaaa lvl2" },
          { otro: "adios lvl2" }
        ]
      },
      {
        name: "adios lvl1"
      }
    ]
  },
  specification: {
    key: "name",
    labelByConcatenateFields:{
      fields:['name', 'description'],
      separator: '-'
    },
    labelSingleField: "description",
    children: "level2",
    children_definition: {
      key: "otro",
      labelSingleField: "otrolabel",
      children: "level3",
      children_definition: {
        key: "otro",
        labelSingleField: "otro"
      }
    }
  },
  label: 'Select an item',
  expanded: false
};

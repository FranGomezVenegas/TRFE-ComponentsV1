import { html } from 'lit-html';
import './serial-port.js';
import './serial-port-styles.js';
import './serial-port-template.js';

export default {
  title: 'Components/SerialPort',
  component: 'serial-port',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The `SerialPort` component is used to manage serial port communication. It allows configuration of various serial port settings and provides a list of available ports.'
      },
    },
  },
  argTypes: {
    config: {
      description: 'Configuration object for the serial port component',
      control: 'object',
      table: {
        type: { summary: 'object' },
      },
    },
    baudRate: {
      description: 'The baud rate for the serial communication',
      control: 'number',
      table: {
        category: 'config',
        type: { summary: 'number' },
        defaultValue: { summary: 9600 },
      },
    },
    dataBits: {
      description: 'The number of data bits per byte',
      control: 'number',
      table: {
        category: 'config',
        type: { summary: 'number' },
        defaultValue: { summary: 8 },
      },
    },
    stopBits: {
      description: 'The number of stop bits per byte',
      control: 'number',
      table: {
        category: 'config',
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
      },
    },
    parity: {
      description: 'The parity bit setting',
      control: 'text',
      table: {
        category: 'config',
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    flowControl: {
      description: 'Indicates if flow control is enabled',
      control: 'boolean',
      table: {
        category: 'config',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    data: {
      description: 'Array of available serial ports',
      control: 'array',
      table: {
        type: { summary: 'array' },
      },
    },
    portName: {
      description: 'The name of the serial port',
      control: 'text',
      table: {
        category: 'data',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    path: {
      description: 'The path of the serial port',
      control: 'text',
      table: {
        category: 'data',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    manufacturer: {
      description: 'The manufacturer of the serial port',
      control: 'text',
      table: {
        category: 'data',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    serialNumber: {
      description: 'The serial number of the port',
      control: 'text',
      table: {
        category: 'data',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    vendorId: {
      description: 'The vendor ID of the port',
      control: 'text',
      table: {
        category: 'data',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    productId: {
      description: 'The product ID of the port',
      control: 'text',
      table: {
        category: 'data',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
};

const Template = ({ config, data }) => html`
  <serial-port .config=${config} .data=${data}></serial-port>
`;

export const Default = Template.bind({});
Default.args = {
  config: {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    flowControl: false,
  },
  data: [
    { portName: "COM1", path: "/dev/ttyS1", manufacturer: "Manufacturer1", serialNumber: "12345", vendorId: "1A2B", productId: "1C2D" },
    { portName: "COM2", path: "/dev/ttyS2", manufacturer: "Manufacturer2", serialNumber: "67890", vendorId: "3E4F", productId: "5G6H" },
  ],
};
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
    lang: {
      description: 'Language',
      control: 'select',
      options: ['en', 'es']            
    },
    baudRate: {
      description: 'The baud rate for the serial communication',
      control: {value: 9600 },
    },    
    timeout:{
        description: 'Number of seconds of inactivity (nothing being received) to consider that this message is done',
        control:{
          value:4,
          min: 0
        }
    },
    sendEnabled:{
      description: 'Enable the line on the top to transmit one message through the port when connection is started, for devices with echo enabled this means that TRAZiT can send one message to be displayed in the device and as for bi-directional and traceability purpose.',
      control: 'boolean',
      defaultValue: { summary:true },
    },
    isTimeoutEditable:{
      description: 'Allow the user to change the timeout seconds or not',
      control: 'boolean',
      defaultValue: { summary:false },
    }, 
    showAlert:{
      description: 'Show one alert to notify the user that one communication-message is completed/received, independently of enabling the alert or not the message will be displayed in the log textarea',
      control: 'boolean',
      defaultValue: { summary:false },
    }, 
    logAreaHeight:{
      description: 'Height, in pixels (px), for the log area',
      control:{
        value:150,
        min: 0
      }
    },           
    config: {
      description: 'Configuration object for the serial port component',
      control: 'object',
      table: {
        type: { summary: 'object' },
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
    }
  },
};

const Template = ({ lang, baudRate, logAreaHeight, sendEnabled, timeout, isTimeoutEditable, showAlert, config }) => html`
  
  <serial-port-component .config=${config} logAreaHeight=${logAreaHeight} baudRate=${baudRate} timeout=${timeout}  lang=${lang} .sendEnabled="${sendEnabled}" .isTimeoutEditable="${isTimeoutEditable}" .showAlert="${showAlert}"></serial-port-component>
`;

export const Default = Template.bind({});
Default.args = {  
  lang: 'en',
  baudRate: 9600,
  logAreaHeight: 150,
  sendEnabled: true,
  timeout: 4,
  isTimeoutEditable: false,
  showAlert: false,
  config: {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    flowControl: false,
  },
};
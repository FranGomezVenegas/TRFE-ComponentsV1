import { html } from 'lit';

export default {
  title: 'TRAZiT Actions/Dialogs/TrazitTakePictureDialog/TAKEPICTUREDIALOG',
  component: 'trazit-take-picture-dialog',
  parameters: {
    docs: {
      description: {
        component: 'Un ejemplo de cómo utilizar el diálogo para tomar una foto.',
      },
    },
  },
};

const Template = ({ lang, actionModel, recordData }) => html`
  <trazit-take-picture-dialog id="thedialog"
    .lang=${lang}
    .actionModel=${actionModel}
    .recordData=${recordData}
  ></trazit-take-picture-dialog>
`;

export const TakePictureDialog = Template.bind({});
TakePictureDialog.args = {
  lang: 'en',
  actionModel: {
    dialogInfo: { name: 'TAKEPICTUREDIALOG' },
  },
  recordData: {},
};

TakePictureDialog.play = async ({ canvasElement, args }) => {
  const dialogElement = canvasElement.querySelector('trazit-take-picture-dialog');

  await dialogElement.updateComplete;

  console.log('Elemento del diálogo:', dialogElement);
  console.log('Propiedades del diálogo:', dialogElement.actionModel, dialogElement.recordData);

  if (typeof dialogElement.show === 'function') {
    dialogElement.show(args.actionModel, args.actionModel, args.recordData);
  } else {
    console.error('El método show no está disponible en el componente');
  }
};

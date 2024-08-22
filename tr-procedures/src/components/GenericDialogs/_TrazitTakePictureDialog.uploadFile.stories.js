import { html } from 'lit';
import { TrazitTakePictureDialog } from './TrazitTakePictureDialog';

export default {
  title: 'TRAZiT Actions/Dialogs/TrazitTakePictureDialog/UPLOADFILEDIALOG',
  component: 'trazit-take-picture-dialog',
  parameters: {
    docs: {
      description: {
        component: 'Un ejemplo de cómo utilizar el diálogo para subir un archivo.',
      },
    },
  },
};

const Template = ({ lang, actionModel, recordData }) => html`
  <trazit-take-picture-dialog
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

  // Llama al método `show` después de que el componente se ha renderizado
  dialogElement.show(args.actionModel, args.actionModel, args.recordData);
};
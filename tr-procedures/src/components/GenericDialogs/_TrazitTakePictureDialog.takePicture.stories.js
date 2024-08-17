import { html } from 'lit';
import { TrazitTakePictureDialog } from '../GenericDialogs/TrazitTakePictureDialog';

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
  <div>
    <button @click=${openDialog}>Launch Dialog</button>
    ${loadDialogs({ lang, actionModel, recordData })}
  </div>
`;

const loadDialogs = ({ lang, actionModel, recordData }) => html`
  <trazit-take-picture-dialog id="thedialog"
    .lang=${lang}
    .actionModel=${actionModel}
    .recordData=${recordData}
  ></trazit-take-picture-dialog>
`;

const openDialog = () => {
  const dialogElement = document.getElementById('thedialog');
  if (dialogElement) {
    dialogElement.show(dialogElement.actionModel, dialogElement.actionModel, dialogElement.recordData);
  } else {
    console.error('El componente no está disponible o el método show no existe');
  }
};

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

  dialogElement.show(args.actionModel, args.actionModel, args.recordData);
};

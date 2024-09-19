import { TrDialog } from './src/TrDialog.js';

if (!customElements.get('tr-dialog')) {
    customElements.define('tr-dialog', TrDialog);
}

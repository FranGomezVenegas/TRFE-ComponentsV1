import { TrDialog } from './src/';

if (!customElements.get('tr-dialog')) {
    customElements.define('tr-dialog', TrDialog);
}

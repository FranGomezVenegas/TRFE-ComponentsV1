import { CredDialog } from './src/CredDialog.js';

if (!customElements.get('cred-dialog')) {
    customElements.define('cred-dialog', CredDialog);
}


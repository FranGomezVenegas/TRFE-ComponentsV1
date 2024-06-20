import { LitElement, html, css } from 'lit';

class UploadNotification extends LitElement {
    static properties = {
        message: { type: String },
        visible: { type: Boolean },
        type: { type: String }
    };

    static styles = css`
        #notification {
            display: none;
            position: fixed;
            bottom: 20px;
            right: 20px;
            color: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            transition: opacity 0.3s ease-in-out;
        }
    `;

    constructor() {
        super();
        this.message = '';
        this.visible = false;
        this.type = 'success';
    }

    show(message, type = 'success') {
        this.message = message;
        this.type = type;
        this.visible = true;
        this.requestUpdate();

        const notification = this.shadowRoot.querySelector('#notification');
        notification.style.display = 'block';
        notification.style.opacity = '1';
        notification.style.backgroundColor = type === 'success' ? '#4caf50' : '#f44336';

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                this.visible = false;
                notification.style.display = 'none';
            }, 300); // Match the CSS transition duration
        }, 3000);
    }

    render() {
        return html`<div id="notification">${this.message}</div>`;
    }
}

customElements.define('upload-notification', UploadNotification);

import { LitElement, html, css } from 'lit';

class UploadNotification extends LitElement {
    static properties = {
        message: { type: String },
        visible: { type: Boolean }
    };

    static styles = css`
        :host {
            display: block;
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4caf50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        :host([visible]) {
            opacity: 1;
        }
    `;

    constructor() {
        super();
        this.message = '';
        this.visible = false;
    }

    show(message) {
        this.message = message;
        this.visible = true;
        setTimeout(() => {
            this.visible = false;
        }, 3000);
    }

    render() {
        return html`${this.message}`;
    }
}

customElements.define('upload-notification', UploadNotification);
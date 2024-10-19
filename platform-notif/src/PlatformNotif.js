import { LitElement } from 'lit';
import { platformNotifStyles } from './PlatformNotifStyles.js';
import { platformNotifTemplate } from './PlatformNotifTemplate.js';
import { Accordion, AccordionItem } from '@spectrum-web-components/accordion';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
import '@spectrum-web-components/accordion/sp-accordion.js';

export class PlatformNotif extends LitElement {
  static get styles() {
    return [platformNotifStyles];
  }

  static get properties() {
    return {
      notifs: { type: Array },
      lang: { type: String },
      msgNoNotifs: {type: Object}
    };
  }

  constructor() {
    super();
    this.notifs = [];
    this.lang = 'en';
    this.msgNoNotifs={}
    this.msgNoNotifs.message_en="No notifications in this session yet."
    this.msgNoNotifs.message_en="Aún no hay notificaciones en esta sesión."
  }

  render() {
    return platformNotifTemplate(this.notifs, this.lang, this.msgNoNotifs);
  }
}

//customElements.define('platform-notif', PlatformNotif);

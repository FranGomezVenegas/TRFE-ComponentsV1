import { html, nothing } from 'lit';

export const platformNotifTemplate = (notifs, lang, msgNoNotifs) => html`
  <div id="mainNotifDiv">
  ${notifs===undefined?html`
      <h3>${msgNoNotifs["message_" + lang]}</h3>
    `:html`
    <sp-accordion allow-multiple>
      ${notifs.map(curMsg => html`
        <sp-accordion-item label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${curMsg["message_" + lang]}" 
          style="color: ${curMsg.is_error ? '#a33' : '#4b9a5e'};">
          <p class="detailmsg">${curMsg["message_" + lang]}</p>
          ${curMsg.minor_messages === null || curMsg.minor_messages === undefined ? nothing : html`
            ${curMsg.minor_messages.map(minormsg => html`
              <p class="minormsg">${minormsg["message_" + lang]}</p>
            `)}
          `}
        </sp-accordion-item>
      `)}
    </sp-accordion>
    `}
  </div>
`;

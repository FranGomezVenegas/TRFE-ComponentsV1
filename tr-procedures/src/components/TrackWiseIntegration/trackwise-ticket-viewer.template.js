// trackwise-ticket-viewer.template.js
import { html } from 'lit';

export const template = (ticketId, ticketDetails, fetchTicket) => html`
  <div class="container">
    <input 
      type="text" 
      placeholder="Enter Ticket ID" 
      .value="${ticketId}" 
      @input="${e => fetchTicket(e.target.value)}">
    <button @click="${() => fetchTicket()}">Fetch Ticket</button>
    <div class="ticket-details">
      ${ticketDetails ? JSON.stringify(ticketDetails, null, 2) : 'No ticket details available.'}
    </div>
  </div>
`;

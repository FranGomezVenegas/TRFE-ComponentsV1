// trackwise-ticket-viewer.js
import { LitElement } from 'lit';
import { styles } from './trackwise-ticket-viewer.css.js';
import { template } from './trackwise-ticket-viewer.template.js';

class TrackwiseTicketViewer extends LitElement {
  static styles = styles;

  static properties = {
    ticketId: { type: String },
    ticketDetails: { type: Object }
  };

  constructor() {
    super();
    this.ticketId = '';
    this.ticketDetails = null;
  }

  fetchTicket(ticketId = this.ticketId) {
    this.ticketId = ticketId;

    if (!this.ticketId) {
      alert('Please enter a Ticket ID');
      return;
    }

    fetch(`https://trackwise.example.com/api/tickets/${this.ticketId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer your_access_token', // Reemplaza con tu token
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch ticket');
      }
    })
    .then(data => {
      this.ticketDetails = data;
    })
    .catch(error => {
      console.error('Error fetching ticket:', error);
      alert('Error fetching ticket');
    });
  }

  render() {
    return template(this.ticketId, this.ticketDetails, (ticketId) => this.fetchTicket(ticketId));
  }
}

customElements.define('trackwise-ticket-viewer', TrackwiseTicketViewer);

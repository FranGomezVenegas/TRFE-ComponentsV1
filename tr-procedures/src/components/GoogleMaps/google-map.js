import { LitElement, html } from 'lit';
import { styles } from './styles.js';

class GoogleMap extends LitElement {
  static get styles() {
    return styles;
  }

  firstUpdated() {
    // Aquí puedes agregar tu clave API de Google Maps
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.addEventListener('load', () => {
      this.initMap();
    });
    document.head.appendChild(script);
  }

  initMap() {
    const map = new google.maps.Map(this.shadowRoot.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
    // Aquí puedes añadir marcadores y otros elementos del mapa
  }

  render() {
    return html`<div id="map"></div>`;
  }
}

customElements.define('google-map', GoogleMap);

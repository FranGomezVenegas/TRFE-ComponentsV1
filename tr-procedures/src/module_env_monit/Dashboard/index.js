import {LitElement} from 'lit-element';
import {template} from './dashboard.template';
import {styles} from './dashboard.css';

export class Dashboard extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      params: {type: Object},
    };
  }

  constructor() {
    super();
    this.params = {
        start: {
          title: "New Samples",
        },
        end: {
          title: "Review Samples",
        },
        groups: [
          {
            title: "FQ",
            items: [
              {
                title: "Testing Group",
              },
              {
                title: "Review",
              },
              {
                title: "Enter Results",
              },
            ]
          }, {
            title: "MB",
            items: [
              {
                title: "Testing Group",
              },
              {
                title: "Review",
              },
              {
                title: "Enter Results",
              },
            ]
          }
        ]};
  }

  render() {
    return template({
      params: this.params 
    });
  }
}

window.customElements.define('dynamic-dashboard', Dashboard);

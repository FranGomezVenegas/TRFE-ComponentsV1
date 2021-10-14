import { html, css, LitElement } from 'lit';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@spectrum-web-components/card/sp-card';

export class VideoTutorial extends LitElement {
  static get styles() {
    return [
      Layouts,
      css`
      :host {
        display: block;
      }
      sp-card {
        width: 400px;
        margin: 10px;
        --spectrum-card-coverphoto-height: 300px;
        --spectrum-card-body-header-height: 50px;
        --spectrum-card-body-padding-top: 0;
        padding-bottom: 40px;
      }
      @media (max-width: 460px) {
        sp-card {
          width: 300px;
          margin: 5px;
          --spectrum-card-coverphoto-height: 300px;
          --spectrum-card-body-header-height: 30px;
          --spectrum-card-body-padding-top: 0;
          padding-bottom: 20px;
        }
        sp-card h1 {
          font-size: 20px;
        }
        sp-card h2 {
          font-size: 12px;
        }
      }
      `
    ];
  }

  static get properties() {
    return {
      config: { type: Object },
      lang: { type: String },
      videos: { type: Array }
    };
  }

  constructor() {
    super();
    this.lang = "en";
    this.videos = [];
  }

  render() {
    return html`
      <div class="layout horizontal flex center-center wrap">
        ${this.videos.map(v=>
          html`
            <sp-card>
              <h1 slot="heading">${v["label_"+this.lang]}</h1>
              <h2 slot="subheading">${v["summary_"+this.lang]}</h2>
              <video controls slot="cover-photo">
                <source type="video/mp4" src="${v.source}">
              </video>
            </sp-card>
          `
        )}
      </div>
    `;
  }

  updated(updates) {
    if (updates.has('config') && JSON.stringify(this.config) != "{}" && sessionStorage.getItem("userSession")) {
      this.getVideos();
    }
  }

  /**
   * Populating video items from the server
   */
  getVideos() {
    return fetch(this.config.backendUrl + this.config.frontEndVideoTutorialsUrl + '?' + new URLSearchParams({
      actionName: "ALL_ACTIVE_VIDEO_TUTORIALS",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      dbName: this.config.dbName
    })).then(async r => {
      if (r.status == 200) {
        return r.json()
      } else {
        let err = await r.json()
        throw err
      }
    }).then(j => {
      this.videos = j
    }).catch(e => {
      console.log(e.message_en)
    })
  }
}

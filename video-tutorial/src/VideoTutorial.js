import { html, css } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@spectrum-web-components/card/sp-card';

export class VideoTutorial extends CommonCore {
  static get styles() {
    return [
      Layouts,
      css`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
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
      videos: { type: Array }
    };
  }

  constructor() {
    super();
    this.videos = [];
  }

  render() {
    return html`
      <div class="layout horizontal flex center-center wrap">
        ${this.videos.map((v,i)=>
          html`
            <sp-card>
              <h1 slot="heading">${v["label_"+this.lang]}</h1>
              <h2 slot="subheading">${v["summary_"+this.lang]}</h2>
              <video id="${v["label_"+this.lang]}-${i}" controls slot="cover-photo"
                @play=${()=>this.stopOthers(`${v["label_"+this.lang]}-${i}`)}>
                <source type="video/mp4" src="${v.source}">
              </video>
            </sp-card>
          `
        )}
      </div>
    `;
  }

  authorized() {
    super.authorized();
    this.getVideos();
  }

  /**
   * Populating video items from the server
   */
  getVideos() {
    this.fetchApi(this.config.backendUrl + this.config.frontEndVideoTutorialsUrl + '?' + new URLSearchParams({
      actionName: "ALL_ACTIVE_VIDEO_TUTORIALS",
      finalToken: JSON.parse(sessionStorage.getItem("userSession")).finalToken,
      dbName: this.config.dbName
    }), false).then(j => {
      if (j) {
        this.videos = j
      }
    })
  }

  /**
   * Stop other videos when playing one video
   * @param {*} v the playing video element
   */
  stopOthers(v) {
    let allVids = this.shadowRoot.querySelectorAll("video")
    allVids.forEach(vid => {
      if (vid.id != v) {
        vid.pause()
      }
    })
  }
}

import { html } from 'lit';
import { SamplePendingSampling } from './SamplePendingSampling';
import './SampleIncubation/sample-batch';

export class SampleIncubation extends SamplePendingSampling {
  render() {
    return html`
      <sample-batch .config=${this.config}></sample-batch>
    `;
  }

  get batch() {
    return this.shadowRoot.querySelector("sample-batch")
  }

  getSamples() {
    this.batch.getSamples()
  }
}

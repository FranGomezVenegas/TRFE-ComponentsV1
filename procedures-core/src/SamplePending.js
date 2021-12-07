import { SamplePendingSampling } from './SamplePendingSampling';

export class SamplePending extends SamplePendingSampling {
  constructor() {
    super()
    this.procName = "proc-deploy"
    this.name = "sampling"
    this.hideNext = true
    delete this.langConfig.gridHeader.sampling_date
  }
}

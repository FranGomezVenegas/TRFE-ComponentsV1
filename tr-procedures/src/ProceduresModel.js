import { EmDemoA } from './0proc_models/em-demo-a';
import { ProcDeploy } from './0proc_models/proc-deploy';
import { AppProc } from './0proc_models/app-proc';
import { EmAir } from './0proc_models/em-air';
import { App } from './0proc_models/app';
import { Genoma1 } from './0proc_models/genoma-1';
import { SampleCoaRel1 } from './0proc_models/sample-coa-rel1';
import { InvDraft } from './0proc_models/inv-draft';
import { MpRelease1 } from './0proc_models/mp-release1';

export const ProceduresModel = {
  ['em-demo-a']: EmDemoA,
  ['proc-deploy']: ProcDeploy,
  ['app-proc']: AppProc,
  ['em-air-spr1']: EmAir,
  ['app']: App,
  ['genoma-1']: Genoma1,
  ['sample-coa-rel1']: SampleCoaRel1,
  ['inv-draft']: InvDraft,
  ['mp-release1']: MpRelease1
}

export const DemoViews = [
  {"label":"EM-Air (em-demo-a)", "proc_instance_name": "em-demo-a", "views":[
    {"proc_instance_name": "em-demo-a", "view_name": "Home", "filter_name": "Home", "title": "Home"},
    {"proc_instance_name": "em-demo-a", "view_name": "LogSamples", "filter_name": "SampleLogin", "title": "Log Samples"},
    {"proc_instance_name": "em-demo-a", "view_name": "ProductionLots", "filter_name": "SampleLot", "title": "Production Lots"},
    {"proc_instance_name": "em-demo-a", "view_name": "SampleCultureMedia", "filter_name": "CultureMediaSMP", "title": "Sample Culture"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePendingSampling", "filter_name": "SamplingSMP", "title": "Personel Sampling"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePendingSampling", "filter_name": "SamplingPERS", "title": "Home"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePendingSamplingInterval", "filter_name": "SamplingSMP", "title": "Location SamplingInterval"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePendingSamplingInterval", "filter_name": "SamplingPERS", "title": "Person SamplingInterval"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePlateReading", "filter_name": "PlateReadingSecondEntrySMP", "title": "Location-Plate Reading"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePlateReading", "filter_name": "PlateReadingSecondEntryPERS", "title": "Person-Plate Reading"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePlateReadingSecondEntry", "filter_name": "PlateReadingSecondEntrySMP", "title": "Location-Plate Reading 2nd Entry"},
    {"proc_instance_name": "em-demo-a", "view_name": "SamplePlateReadingSecondEntry", "filter_name": "PlateReadingSecondEntryPERS", "title": "Person-Plate Reading 2nd Entry"}
    ]
  },
  {"label":"EM-Water (proc-deploy)", "proc_instance_name": "proc-deploy", "views":[
    {"proc_instance_name": "proc-deploy", "view_name": "Home", "filter_name": "Home", "title": "Home"},
    {"proc_instance_name": "proc-deploy", "view_name": "LogSamples", "filter_name": "SampleLogin", "title": "Log Samples"},
    {"proc_instance_name": "proc-deploy", "view_name": "ProductionLots", "filter_name": "SampleLot", "title": "Production Lots"},
    {"proc_instance_name": "proc-deploy", "view_name": "SamplePendingSampling", "filter_name": "SamplingPERS", "title": "Personel Sampling"},
    {"proc_instance_name": "proc-deploy", "view_name": "SampleEnterResult", "filter_name": "ER-FQ", "title": "ER-FQ"},
    {"proc_instance_name": "proc-deploy", "view_name": "SampleEnterResult", "filter_name": "ER-MB", "title": "ER-MB"},
    {"proc_instance_name": "proc-deploy", "view_name": "ReviewTesting", "filter_name": "RT-FQ", "title": "RT-FQ"},
    {"proc_instance_name": "proc-deploy", "view_name": "ReviewTesting", "filter_name": "RT-MB", "title": "RT-MB"},
    {"proc_instance_name": "proc-deploy", "view_name": "ReviewTestingGroup", "filter_name": "RTG-FQ", "title": "RTG-FQ"},
    {"proc_instance_name": "proc-deploy", "view_name": "ReviewTestingGroup", "filter_name": "RTG-MB", "title": "RTG-MB"},
    {"proc_instance_name": "proc-deploy", "view_name": "ReviewSample", "filter_name": "Review", "title": "ReviewSample"}
    ]
  },
  {"label":"Raw Material Inspection Lots (inv-draft)", "proc_instance_name": "inv-draft", "views":[
    {"proc_instance_name": "inv-draft", "view_name": "InventoryLotsGeneral", "filter_name": "InventoryLots.1", "title": "Active Inventory Lots"},
    {"proc_instance_name": "inv-draft", "view_name": "QualificationsInProgress", "filter_name": "QualificationsInProgress.1", "title": "Qualifications In Progress"},
  ]},
  {"label":"Raw Material Inspection Lots (mp-release1", "proc_instance_name": "mp-release1", "views":[
    {"proc_instance_name": "mp-release1", "view_name": "LotView", "filter_name": "LotView", "title": "LotView"},
    {"proc_instance_name": "mp-release1", "view_name": "SampleEnterResult", "filter_name": "ER-FQ", "title": "ER-FQ"},
    {"proc_instance_name": "mp-release1", "view_name": "SampleEnterResult", "filter_name": "ER-MB", "title": "ER-MB"},
    {"proc_instance_name": "mp-release1", "view_name": "ReviewTesting", "filter_name": "RT-FQ", "title": "RT-FQ"},
    {"proc_instance_name": "mp-release1", "view_name": "ReviewTesting", "filter_name": "RT-MB", "title": "RT-MB"},
    {"proc_instance_name": "mp-release1", "view_name": "ReviewTestingGroup", "filter_name": "RTG-FQ", "title": "RTG-FQ"},
    {"proc_instance_name": "mp-release1", "view_name": "ReviewTestingGroup", "filter_name": "RTG-MB", "title": "RTG-MB"},
    {"proc_instance_name": "mp-release1", "view_name": "ReviewSample", "filter_name": "Review", "title": "ReviewSample"}
  ]
  },
/*
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SamplePendingSamplingInterval", "SamplingSMP")}>Samples Sampling (Interval)</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SamplePendingSamplingInterval", "SamplingPERS")}>Personel Sampling (Interval)</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SamplePlateReading", "PlateReadingSMP")}>Sample Plate Reading</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SamplePlateReading", "PlateReadingPERS")}>Personel Plate Reading</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SamplePlateReadingSecondEntry", "PlateReadingSecondEntrySMP")}>Sample Plate Reading SecondEntry</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SamplePlateReadingSecondEntry", "PlateReadingSecondEntryPERS")}>Personel Plate Reading SecondEntry</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SampleIncubation", "Incubation")}>Sample Incubation</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SampleMicroorganism", "MicroOrganismSMP")}>Sample Microorganism </button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "SampleMicroorganism", "MicroOrganismPERS")}>Personel Microorganism</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "Programs", "Programs")}>Program</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "Deviation", "Deviation")}>Deviation</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "Browser", "Browser")}>Browser</button><br>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "DataMining", "DataMining")}>Data Mining</button><br>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("em-demo-a", "Incubators", "Incubators")}>Incubators</button><br>

  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "Home", "Home")}>Home</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "LogSamples", "SampleLogin")}>Log Samples (proc)</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "ProductionLots", "SampleLot")}>Production Lots (proc)</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "SamplePending", "sampling")}>Sampling</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "SampleEnterResult", "ER-FQ")}>FQ</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "SampleEnterResult", "ER-MB")}>MB</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "ReviewTesting", "RT-FQ")}>RT FQ</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "ReviewTesting", "RT-MB")}>RT MB</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "ReviewTestingGroup", "RTG-FQ")}>RTG FQ</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "ReviewTestingGroup", "RTG-MB")}>RTG MB</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "ReviewSample", "Review")}>Review Sample</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "Programs", "Programs")}>Program</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "Deviation", "Deviation")}>Deviation</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("proc-deploy", "Browser", "Browser")}>Browser</button><br>

  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("app-proc", "PlatformInstruments", "InstrumentsList")}>Instruments List</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("app-proc", "EventsInProgress", "EventsER")}>Events In Progress</button><br>

  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("app-instruments", "PlatformInstruments", "InstrumentsList")}>Instruments List</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("app-instruments", "EventsInProgress", "EventsER")}>Events In Progress</button><br>

  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("app", "WhiteIpList", "WhiteIpList")}>White IPs List</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("app", "BlackIpList", "BlackIpList")}>Black IPs List</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("app", "PlatformBusRules", "PlatformBusRules")}>Platform Business Rules</button><br>

  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("genoma-1", "ProjectManager", "ProjectManager")}>Genoma-ProjectManager</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("genoma-1", "StudyVariableValues", "StudyVariableValues")}>Genoma-StudyVariableValues</button><br>

  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "LogSamplesModuleSamples", "SampleLogin")}>sample-coa logSamples</button><br>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "SampleEnterResult", "ER-FQ")}>sample-coa-rel1 FQ</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "SampleEnterResult", "ER-MB")}>sample-coa-rel1 MB</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "ReviewTesting", "RT-FQ")}>sample-coa-rel1 RT FQ</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "ReviewTesting", "RT-MB")}>sample-coa-rel1 RT MB</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "ReviewTestingGroup", "RTG-FQ")}>sample-coa-rel1 RTG FQ</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "ReviewTestingGroup", "RTG-MB")}>sample-coa-rel1 RTG MB</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "ReviewSample", "Review")}>sample-coa-rel1 Review Sample</button><br>

  Inv-Draft<br>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("inv-draft", "InventoryLots", "InventoryLots.1")}>InventoryLots</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("inv-draft", "InventoryLotsReactivos", "InventoryLotsReactivos")}>Issues</button>
  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("inv-draft", "Issues", "Issues")}>Issues</button>

  <button ?hidden="${this.hideActionButton()}" @click=${()=>this.selectMenu("sample-coa-rel1", "culture-medium", "culture-medium")}>culture-medium</button>
*/
]
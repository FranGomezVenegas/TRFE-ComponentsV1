import { App } from './0proc_models/app';
import { ProceduresManagement } from './0proc_models/ProceduresManagement';
import { FakeDevelopers } from './0proc_models/fakeDevelopers';

import { MbEm } from './0proc_models/mb_em';
import { ProjectRandD } from './0proc_models/projectRandD';

import { MonWater } from './0proc_models/mon_water';
import { Stock } from './0proc_models/demo_stock';
import { DemoInstruments } from './0proc_models/demo_instruments'; 
import { DemoInspectionLot } from './0proc_models/demo_inspection_lot';
import { DiseaseStudy } from './0proc_models/disease-study';

export const ProceduresModel = {
  ['app']: App,
  ['proc_management']: ProceduresManagement,
  ['mb_em']: MbEm,
  ['instruments']: DemoInstruments,
  ['mon_water']: MonWater,
  ['stock']: Stock,
  ['inspection_lot']: DemoInspectionLot,
  ['DiseaseStudies']: DiseaseStudy,
  
  ['RandD']: ProjectRandD,
  
  ['fake-developers']: FakeDevelopers
}

export const DemoViews = [
  {"label":"Platform Admin (app)", "proc_instance_name": "app", "views":[
    {"proc_instance_name": "app", "view_name": "InventoryLotsGeneral", "filter_name": "InventoryLots.1", "title": "Active Inventory Lots"},
    {"proc_instance_name": "app-instruments", "view_name": "QualificationsInProgress", "filter_name": "QualificationsInProgress.1", "title": "Qualifications In Progress"},
    {"proc_instance_name": "app", "view_name": "WhiteIpList", "filter_name": "WhiteIpList", "title": "White Ip List"},
    {"proc_instance_name": "app", "view_name": "BlackIpList", "filter_name": "BlackIpList", "title": "Black Ip List"},
    {"proc_instance_name": "app", "view_name": "PlatformBusRules", "filter_name": "PlatformBusRules", "title": "Platform Business Rules"}    
  ]},  
  
  {"label":"fake-developers", "proc_instance_name": "fake-developers", "isSpecial":true, "views":[
    {"proc_instance_name": "fake-developers", "view_name": "culture-medium", "filter_name": "culture-medium", "title": "ModuleEnvMonitCultureMedium"},
    {"proc_instance_name": "fake-developers", "view_name": "tree-view", "filter_name": "tree-view", "title": "TreeView"},
    {"proc_instance_name2": "fake-developers", "proc_instance_name": "mb_em", "view_name": "serial-port", "filter_name": "drag-drop", "title": "Serial Port"},
    
    {"proc_instance_name2": "fake-developers", "proc_instance_name": "mb_em", "view_name": "drag-drop", "filter_name": "drag-drop", "title": "DragDropTables"},
    {"proc_instance_name2": "fake-developers", "proc_instance_name": "mb_em", "view_name": "drag-box", "filter_name": "drag-box", "title": "DragDropBoxes"},

    {"proc_instance_name2": "fake-developers", "proc_instance_name": "RandD", "view_name": "stability", "filter_name": "stability", "title": "stability"},
    
    {"proc_instance_name2": "fake-developers", "proc_instance_name": "RandD", "view_name": "prototype-elements-view-main", "filter_name": "prototype-elements-view-main", "title": "Prototype Elements"},
	  {"proc_instance_name2": "fake-developers", "proc_instance_name": "RandD", "view_name": "ck-editor", "filter_name": "ck-editor", "title": "ck-editor"},
	  {"proc_instance_name2": "fake-developers", "proc_instance_name": "RandD", "view_name": "LabelDesigner", "filter_name": "", "title": "Label Designer"},
	  {"proc_instance_name2": "fake-developers", "proc_instance_name": "RandD", "view_name": "SqlEditor", "filter_name": "", "title": "Sql Editor"}
  ]},      
  {"label":"Instruments (sample-coa-rel1)", "proc_instance_name": "sample-coa-rel1", "views":[
    {"proc_instance_name": "sample-coa-rel1", "view_name": "InventoryLotsGeneral", "filter_name": "InventoryLots.1", "title": "Active Inventory Lots"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "QualificationsInProgress", "filter_name": "QualificationsInProgress.1", "title": "Qualifications In Progress"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "LogSamplesModuleSamples", "filter_name": "SampleLogin", "title": "sample-coa logSamples"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "SampleEnterResult", "filter_name": "ER-FQ", "title": "sample-coa-rel1 FQ"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "SampleEnterResult", "filter_name": "ER-MB", "title": "sample-coa-rel1 MB"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "ReviewTesting", "filter_name": "RT-FQ", "title": "sample-coa-rel1 RT FQ"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "ReviewTesting", "filter_name": "RT-MB", "title": "sample-coa-rel1 RT MB"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "ReviewTestingGroup", "filter_name": "RTG-FQ", "title": "sample-coa-rel1 RTG FQ"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "ReviewTestingGroup", "filter_name": "RTG-MB", "title": "sample-coa-rel1 RTG MB"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "ReviewSample", "filter_name": "Review", "title": "sample-coa-rel1 Review Sample"},
    {"proc_instance_name": "sample-coa-rel1", "view_name": "culture-medium", "filter_name": "culture-medium", "title": "culture-medium"},
  ]},  
  {"label":"EM_MB (mb_em)", "proc_instance_name": "mb_em", "views":[
    {"proc_instance_name": "mb_em", "view_name": "Home", "filter_name": "Home", "title": "Home"},
    {"proc_instance_name": "mb_em", "view_name": "LogSamples", "filter_name": "", "title": "Log Samples"},
    {"proc_instance_name": "mb_em", "view_name": "ProductionLots", "filter_name": "SampleLot", "title": "Production Lots"},
    {"proc_instance_name": "mb_em", "view_name": "SampleCultureMedia", "filter_name": "CultureMediaSMP", "title": "Sample Culture"},
    {"proc_instance_name": "mb_em", "view_name": "SamplePendingSampling", "filter_name": "SamplingSMP", "title": "Location Sampling"},
    {"proc_instance_name": "mb_em", "view_name": "SamplePendingSampling", "filter_name": "SamplingPERS", "title": "Personel Sampling"},
    {"proc_instance_name": "mb_em", "view_name": "SamplePendingSamplingInterval", "filter_name": "SamplingSMP", "title": "Location SamplingInterval"},
    {"proc_instance_name": "mb_em", "view_name": "SamplePendingSamplingInterval", "filter_name": "SamplingPERS", "title": "Person SamplingInterval"},
    {"proc_instance_name": "mb_em", "view_name": "SamplePlateReading", "filter_name": "LOCATION", "title": "Location-Plate Reading"},
    {"proc_instance_name": "mb_em", "view_name": "SamplePlateReading", "filter_name": "PERSONAL", "title": "Person-Plate Reading"},
    {"proc_instance_name": "mb_em", "view_name": "SamplePlateReadingSecondEntry", "filter_name": "PlateReadingSecondEntrySMP", "title": "Location-Plate Reading 2nd Entry"},
    {"proc_instance_name": "mb_em", "view_name": "SamplePlateReadingSecondEntry", "filter_name": "PlateReadingSecondEntryPERS", "title": "Person-Plate Reading 2nd Entry"},
    {"proc_instance_name": "mb_em", "view_name": "SampleIncubation", "filter_name": "", "title": "Sample Incubation"},
    {"proc_instance_name": "mb_em", "view_name": "SampleIncubation1", "filter_name": "", "title": "Sample Incubation 1"},
    {"proc_instance_name": "mb_em", "view_name": "SampleIncubation2", "filter_name": "", "title": "Sample Incubation 1"},
    {"proc_instance_name": "mb_em", "view_name": "SampleMicroorganism", "filter_name": "LOCATION", "title": "Sample Microorganism"},
    {"proc_instance_name": "mb_em", "view_name": "SampleMicroorganism", "filter_name": "PERSONAL", "title": "Personal Microorganism"},
    {"proc_instance_name": "mb_em", "view_name": "Programs", "filter_name": "", "title": "Programs"},
    {"proc_instance_name": "mb_em", "view_name": "ProgramsObjectByTabs", "filter_name": "", "title": "ProgramsObjectByTabs"},
    
        
    {"proc_instance_name": "mb_em", "view_name": "Deviation", "filter_name": "Deviation", "title": "Deviation"},
    {"proc_instance_name": "mb_em", "view_name": "Browser", "filter_name": "", "title": "Browser"},
    {"proc_instance_name": "mb_em", "view_name": "DataMining", "filter_name": "DataMining", "title": "DataMining"},
    {"proc_instance_name": "mb_em", "view_name": "Incubators", "filter_name": "Incubators", "title": "Incubators"},
	{"proc_instance_name": "mb_em", "view_name": "SchedSamples", "filter_name": "SchedSamples", "title": "SchedSamples"},
	{"proc_instance_name": "mb_em", "view_name": "SampleStageTimingCapture", "filter_name": "SampleStageTimingCapture", "title": "SampleStageTimingCapture"},
	
	
	
    ]
  },
  {"label":"EM-Water (mon_water)", "proc_instance_name": "mon_water", "views":[
    {"proc_instance_name": "mon_water", "view_name": "Home", "filter_name": "Home", "title": "Home"},
    {"proc_instance_name": "mon_water", "view_name": "LogSamples", "filter_name": "", "title": "Log Samples"},
    {"proc_instance_name": "mon_water", "view_name": "SamplePending", "filter_name": "Sampling", "title": "Sampling"},
    {"proc_instance_name": "mon_water", "view_name": "ProductionLots", "filter_name": "SampleLot", "title": "Production Lots"},
    {"proc_instance_name": "mon_water", "view_name": "SamplePendingSampling", "filter_name": "SamplingPERS", "title": "Personel Sampling"},
    {"proc_instance_name": "mon_water", "view_name": "SampleEnterResult", "filter_name": "ER-FQ", "title": "ER-FQ"},
    {"proc_instance_name": "mon_water", "view_name": "SampleEnterResult", "filter_name": "ER-MB", "title": "ER-MB"},
    {"proc_instance_name": "mon_water", "view_name": "ReviewTesting", "filter_name": "RT-FQ", "title": "RT-FQ"},
    {"proc_instance_name": "mon_water", "view_name": "ReviewTesting", "filter_name": "RT-MB", "title": "RT-MB"},
    {"proc_instance_name": "mon_water", "view_name": "ReviewTestingGroup", "filter_name": "RTG-FQ", "title": "RTG-FQ"},
    {"proc_instance_name": "mon_water", "view_name": "ReviewTestingGroup", "filter_name": "RTG-MB", "title": "RTG-MB"},
    {"proc_instance_name": "mon_water", "view_name": "ReviewSample", "filter_name": "Review", "title": "ReviewSample"},
    {"proc_instance_name": "mon_water", "view_name": "Programs", "filter_name": "Programs", "title": "Programs"},
    {"proc_instance_name": "mon_water", "view_name": "Deviation", "filter_name": "Deviation", "title": "Deviation"},
    {"proc_instance_name": "mon_water", "view_name": "Browser", "filter_name": "Browser", "title": "Browser"}
    ]
  },  
  {"label":"Instruments (instruments)", "proc_instance_name": "instruments", "views":[
    {"proc_instance_name": "instruments", "view_name": "PlatformInstruments", "filter_name": "InstrumentsList", "title": "Instruments List"},
    {"proc_instance_name": "instruments", "view_name": "PlatformInstrumentsfamilyCorrecto", "filter_name": "InstrumentsfamilyCorrecto", "title": "Instruments List FamilyCorrecto"},
    {"proc_instance_name": "instruments", "view_name": "PlatformInstrumentsfamilyObsInterno", "filter_name": "InstrumentsfamilyObsInterno", "title": "Instruments List FamilyObsIntento"},
    {"proc_instance_name": "instruments", "view_name": "EventsInProgress", "filter_name": "EventsER", "title": "Events In Progress"},
    {"proc_instance_name": "instruments", "view_name": "InstrumentReport", "filter_name": "InstrumentReport", "title": "Instrument Report"},
    {"proc_instance_name": "instruments", "view_name": "InstrumentFamilyList", "filter_name": "InstrumentFamilyList", "title": "Master: Instruments Familiy"},
  	{"proc_instance_name": "instruments", "view_name": "EventsCalendar", "filter_name": "EventsCalendar", "title": "Events Calendar"},
    {"proc_instance_name": "instruments", "view_name": "Deviation", "filter_name": "Deviation", "title": "Deviation"}
  ]},  
  {"label":"Inventory Management (stock)", "proc_instance_name": "stock", "views":[
    {"proc_instance_name": "stock", "view_name": "Home", "filter_name": "Home", "title": "Home"},
    {"proc_instance_name": "stock", "view_name": "InventoryLotsGeneral", "filter_name": "", "title": "Active Inventory Lots"},
    {"proc_instance_name": "stock", "view_name": "InventoryLotsGeneral20240729", "filter_name": "", "title": "Active Inventory Lots InventoryLotsGeneral20240729"},
    
    {"proc_instance_name": "stock", "view_name": "QualificationsInProgress", "filter_name": "QualificationsInProgress.1", "title": "Qualifications In Progress"},
    {"proc_instance_name": "stock", "view_name": "InventoryLotsGeneral", "filter_name": "InventoryLotsGeneral", "title": "InventoryLots"},
    {"proc_instance_name": "stock", "view_name": "InventoryLotsReactivos", "filter_name": "InventoryLotsReactivos", "title": "InventoryLotsReactivos"},
    {"proc_instance_name": "stock", "view_name": "InventoryLotsEstandPrim", "filter_name": "", "title": "InventoryLotsEstandPrim"},    
    {"proc_instance_name": "stock", "view_name": "InventoryControls", "filter_name": "InventoryControls", "title": "InventoryControls"},
    {"proc_instance_name": "stock", "view_name": "Deviation", "filter_name": "Deviation", "title": "Deviation"},
	  {"proc_instance_name": "stock", "view_name": "configReferences", "filter_name": "configReferences", "title": "config References"},
    {"proc_instance_name": "stock", "view_name": "MasterData", "filter_name": "MasterData", "title": "Master Data"}	
  ]},
 {"label":"Raw Material Inspection Lots (demo_lots_raw", "proc_instance_name": "inspection_lot", "views":[
  {"proc_instance_name": "inspection_lot", "view_name": "Home", "filter_name": "", "title": "Home"},
  {"proc_instance_name": "inspection_lot", "view_name": "LotCreation", "filter_name": "", "title": "lotCreation"},
    {"proc_instance_name": "inspection_lot", "view_name": "LotView", "filter_name": "", "title": "LotView"},
    {"proc_instance_name": "inspection_lot", "view_name": "SampleEnterResult", "filter_name": "ER-FQ", "title": "ER-FQ"},
    {"proc_instance_name": "inspection_lot", "view_name": "SampleEnterResult", "filter_name": "ER-MB", "title": "ER-MB"},
    {"proc_instance_name": "inspection_lot", "view_name": "ReviewTesting", "filter_name": "RT-FQ", "title": "RT-FQ"},
    {"proc_instance_name": "inspection_lot", "view_name": "ReviewTesting", "filter_name": "RT-MB", "title": "RT-MB"},
    {"proc_instance_name": "inspection_lot", "view_name": "ReviewTestingGroup", "filter_name": "RTG-FQ", "title": "RTG-FQ"},
    {"proc_instance_name": "inspection_lot", "view_name": "ReviewTestingGroup", "filter_name": "RTG-MB", "title": "RTG-MB"},
    {"proc_instance_name": "inspection_lot", "view_name": "ReviewSample", "filter_name": "", "title": "ReviewSample"},
    
    {"proc_instance_name": "inspection_lot", "view_name": "lotsPendingUsageDecision", "filter_name": "", "title": "lotsPendingUsageDecision"},
    {"proc_instance_name": "inspection_lot", "view_name": "lotsPendingUsageDecision20240723", "filter_name": "", "title": "lotsPendingUsageDecision20240723"},
    {"proc_instance_name": "inspection_lot", "view_name": "Browser", "filter_name": "", "title": "Browser"},
  	{"proc_instance_name": "inspection_lot", "view_name": "Deviation", "filter_name": "", "title": "Deviation"},
    {"proc_instance_name": "inspection_lot", "view_name": "AnalysisDesign", "filter_name": "", "title": "analysisDesign"},
	  {"proc_instance_name": "inspection_lot", "view_name": "SpecDesign", "filter_name": "", "title": "SpecDesign"}
	]},
  {"label":"Disease Study", "proc_instance_name": "DiseaseStudies", "views":[
    {"proc_instance_name": "DiseaseStudies", "view_name": "MyStudies", "filter_name": "MyStudies", "title": "My Studies"},
    {"proc_instance_name": "DiseaseStudies", "view_name": "MyProjects", "filter_name": "MyProjects", "title": "My Projects"},
	]},
  {"label":"R and D", "proc_instance_name": "RandD", "views":[
    {"proc_instance_name": "RandD", "view_name": "rdprojects", "filter_name": "rdprojects", "title": "rd projects"},
    {"proc_instance_name": "RandD", "view_name": "methodvalidation", "filter_name": "methodvalidation", "title": "Method Validation"},
    {"proc_instance_name": "RandD", "view_name": "analysisDesign", "filter_name": "analysisDesign", "title": "analysisDesign"},
    
    {"proc_instance_name": "RandD", "view_name": "stability", "filter_name": "stability", "title": "stabilities"}
	]},

  
  {"label":"Fake developers", "proc_instance_name": "fakeDevelopers", "isSpecial":true, "views":[
    {"proc_instance_name": "fakeDevelopers", "view_name": "prototype-elements-view-main", "filter_name": "prototype-elements-view-main", "title": "prototype-elements-view-main", "isSpecial": true},
    {"proc_instance_name": "fakeDevelopers", "view_name": "culture-medium", "filter_name": "culture-medium", "title": "culture-medium", "isSpecial": true},
    
	]}
     
]
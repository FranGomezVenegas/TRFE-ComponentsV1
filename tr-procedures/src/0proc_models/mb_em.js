export const MbEm= 
{
  "TrackingChanges":{
	  "version": 0.9,
	  "last change on (YYYYMMDD)": "20230330",
	  "last_change_note_20230330": "Scheduled Samples erport",
	  "last_change_note_20230330_2": "Take picture, first draft",
	  "last_change_note_20230328": "Added assign culture media feature in location sampling, both options, by openReferenceLot and by dialog to enter the name",
      "last_change_note_20230327": "Program tabs settings and new Browser model to not be fix view ans BrowserOrig is (keep it as reference)",
	  "last_change_note_20230112": "fixed batchName argument for EM_BATCH_INCUB_REMOVE_SMP",
	  "last_change_note_20221211": "in Sample Incubation, as it has 2 'selectedItems' (one per table) the way to get the endpoint param value is different due to it requires specify from which variable",
	  "last_change_note_20221211_2": "Fix in microorganism views filter",
	  "last_change_note_20221201": "added requires sampling static column in log sample",
	  "last_change_note_20221130": "skip_previous/next the icons for movetoprevious/next",
	  "last_change_note_20221130_2": "For SampleIncubation, fixed the issue to get data from alternativeItemPropertyName ",
	  "last_change_note_20221129": "MicroorganismIdentif, in filter use | instead of * for separator",
	  "last_change_note_20221128": "Incubators List, removed endpointParam as made no sense",
	  "last_change_note_20221104": "Commented objects have been removed",
	  "last_change_note_20221020": "Adapting DataMining to jsonParam model once its own jsonParam was removed",
	  "last_change_note_20221020_2": "argumentName fixValue was doubled for NewIncubator, both have been taken out since this value comes from the dba",
	  "last_change_note_20221018": "renamed paramFilter by subViewFilter when the entry is for two views and they require particular filters",
	  "last_change_note_20221017": "Modified SAMPLESTAGE_MOVETONEXT and SAMPLESTAGE_MOVETOPREVIOUS for Samples Pending Plate Reading Second Entry",
      "last_change_note_20221012": "Added first fix for entering results",
	  "last_change_note_20221005": "Modified endpoint names for Incubators and APIs names",
	  "last_change_note_20221003": "Modified newIncubatorList to be genericDialog, ModuleSettings modified to add a new url for Incubators, requiresGridItemSelected set to false for EM_NEW_INCUBATOR",
	  "last_change_note_20221002": "Fixed deviation",
	  "last_change_note_20220929": "Fixed view for PlateReadingSecondEntry, endpoint should be /moduleenvmon/EnvMonSampleAPIqueries",
	  "last_change_note_20220928": "Fixed Start and End incubation to get the batchName",
	  "last_change_note_20220926": "Fixed Reactivate/Activate for Incubators",
	  "last_change_note_20220921": "Fixed issues in ProductionLots reactivate lot, 3 errors on open dialog for the first time(1) use numDays (2) and error when query returns no records for the list(3)",
	  "last_change_note_20220921_2": "replace whenDisabled by requiresGridItemSelected",
	  "last change note_20220918": "fixed about some endpoints still using the old naming convention, frontend instead of the new one, actions/queries"
  },
  "ModuleSettings":{
    "actionsEndpoints": [
      {
        "name": "Lots",
        "url": "/moduleMonitoring/MonitoringAPIactions"
      }
    ],
    "queriesEndpoints": [
      {
        "name": "Lots",
        "url": "/moduleMonitoring/MonitoringAPIqueries"
      }
    ]            
  },
  "Home":{
	  "component": "ModuleEnvMonitHomeAir"
  },
  "ProductionLots": {
    "component": "TableWithButtons",
    "langConfig": {
      "title": {
        "SampleLot": {
          "label_en": "Active Production Lots",
          "label_es": "Lotes en producción activos"
        }
      },
      "gridHeader": {
        "lot_name": {"label_en": "Name", "label_es": "Nombre", "width": "80%", "sort": false, "filter": true, "align": "left"},
        "created_on": {"label_en": "Created On", "label_es": "F. Creación", "width": "20%", "sort": true, "filter": false, "confidential_value":true},
		"closed_on": {"label_en": "Closed On", "label_es": "F. Cierre", "width": "20%", "sort": true, "filter": false}
      }
    },
    "viewQuery":
      {
        "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
        "endPoint": "/moduleenvmon/EnvMonAPIqueries",
        "addRefreshButton": true,        
        "printable": {
          "enable": true,
          "icon": "print",
          "title": {
            "label_en": "Print", "label_es": "Imprimir"
          }
        },
        "downloadable": {
          "enable": true,
          "icon": "download_2",          
          "title": {
            "label_en": "Download", "label_es": "Descargar"
          }
        },
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Refresh", "label_es": "Recargar"
          }          
        }
    },
	"actions": [
      { "actionName": "EM_NEW_PRODUCTION_LOT",
		  "endPointUrl": "ProdLot",
		  "requiresDialog": true,
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New", "label_es": "Nuevo"
          },
          "requiresGridItemSelected": false
        },
        "dialogInfo": {          
          "name": "genericDialog",
          "fields": [
			      {"text1": { "label_en": "New Production Lot Name", "label_es": "Nombre para nuevo lote de producción" }},
            {"multiselectlist1": { "label_en": "New Production Lot Name", "label_es": "Nombre para nuevo lote de producción" }}
            
          ]
        },
        "endPointParams": [
          { "argumentName": "lotName", "element": "multiselectlist1" },
          { "argumentName": "fieldName", "value": "active" },
          { "argumentName": "fieldValue", "value": "true*Boolean" }
        ]
      },
      { "actionName": "EM_ACTIVATE_PRODUCTION_LOT",
        "endPoint": "/moduleenvmon/EnvMonProdLotAPIactions",  
        "endPointParams": [
          { "argumentName": "lotName", "selObjectPropertyName": "lot_name" }
        ],
        "clientMethod": "openReactivateObjectDialog",
        "button": {
          "icon": "alarm_add",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          "requiresGridItemSelected": false
        },
		    "requiresDialog": true,
        "dialogInfo": {          
          "name": "reactivateObjectDialog",
          "fieldsObject": {
            "queryNumDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
            "objectName": { "label_en": "Production Lot to reactivate", "label_es": "Lote de Producción a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"lot_name",
            "eachEntryTextGenerator":[
              {"value": "Lot: ", "type":"fix"}, {"value": "lot_name", "type":"field"} 
            ]
          },
          "viewQuery": {
            "actionName": "DEACTIVATED_PRODUCTION_LOTS_LAST_N_DAYS",
            "clientMethod": "getDeactivatedObjects",
            "endPoint": "/moduleenvmon/EnvMonAPIqueries",
            "endPointParams": [
              { "argumentName": "numDays", "element": "queryNumDays", "fixValue": 7 }
            ]
          },
            "action": [            
            ]
        }
      },
      { "actionName": "EM_DEACTIVATE_PRODUCTION_LOT",
        "endPoint": "/moduleenvmon/EnvMonProdLotAPIactions",     
        "endPointParams": [
          { "argumentName": "lotName", "selObjectPropertyName": "lot_name" }
        ],
		"requiresDialog": false,
        "button": {
          "icon": "alarm_off",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true
        }
      }
    ]
  },
  "LogSamples":{
    "component": "ObjectByTabs",     
    "hideLeftPane": false, 
    
    "viewQuery": { 
      "actionName": "PROGRAMS_LIST",
      "notUseGrid": true,
      "endPoint": "/moduleenvmon/EnvMonAPIqueries",
      "zzzclientMethod": "getProgramList",
      "subAction": {
        "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
    		"endPoint": "/moduleenvmon/EnvMonAPIqueries",
        "clientMethod": "getLots"
      },
      "requiresGridItemSelected": false
    },  
    "filter": [],
    "filterResultDetail":{
      "type":"list",
      "detail":[
        {"field": "name"}
        ]  		
    },    
    "tabs": [
        {
          "tabLabel_en": "Project info",
          "tabLabel_es": "Información Proyecto",
          "view": "summary",
          "view_definition": [
            {"type": "reportTitle", 
              "title":{
                "label_en": "Program Sampling Points", 
                "label_es": "Puntos de muestro del programa"
              }
            },   
            {"type": "parentReadOnlyTable",  
              "allowMultiSelection": false, 
              "refreshable":{ "enable": true}, 
              "printable":{ "enable": true}, 
              "downloadable":{"enable": true, "allowUserSelectColumns": true}, 
              "endPointPropertyArray": ["sample_points"],		              
              "columns" : [                                
                  {"name":"location_name", "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "20%"},
                  {"name":"spec_code", "label_en": "Spec", "label_es": "Especificación", "sort": false, "filter": true, "width": "20%"},
                  {"name":"spec_variation_name", "label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true, "width": "20%"},
                  {"name":"spec_analysis_variation", "label_en": "Analysis Variation", "label_es": "Análisis de Variación", "sort": false, "filter": true, "width": "20%"},
                  {"name":"person_ana_definition", "label_en": "Person Sampling Areas", "label_es": "Areas a analizar de Personal", "sort": false, "filter": true, "width": "40%"},
                  {"name":"requires_tracking_sampling_end", "label_en": "Sampling Static?", "label_es": "Muestreo Estático?", "sort": false, "filter": true, "width": "40%"}                   
              ],             
              "actions": [
                {
                  "actionName": "LOGSAMPLE",
                  "requiresGridItemSelected": true,
                  "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                  "requiresDialog": true,
                  "button": {
                    "icon": "rule",
                    "title": {
                      "label_en": "Log samples",
                      "label_es": "Registrar muestras"
                    },
                  },
                  "xclientMethod": "logSampleDialog",
                  "dialogQueries":[
                    {	"actionName": "GET_ACTIVE_PRODUCTION_LOTS",				
                      "endPoint": "/moduleenvmon/EnvMonAPIqueries",
                      "variableForData": "prodLotList"		  
                    }
                  ],  
                  "endPointParams": [
                    { "argumentName": "programName", "selObjectPropertyName": "program_name" },
                    { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
                    { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
                    { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
                    { "argumentName": "shift", "element": "list1", "addToFieldNameAndValue": true},
                    { "argumentName": "production_lot", "element": "list2", "addToFieldNameAndValue": true},
                    { "argumentName": "numSamplesToLog", "defaultValue": 1 }
                  ],                              
                  "dialogInfo":{
                    "name": "genericDialog",
                    "fields": [   
                      {"text1": { "label_en":"Program", "label_es":"Programa", "disabled": true, "selObjectPropertyName": "program_name" }},
                      {"text2": { "label_en":"Location", "label_es":"Ubicación", "disabled": true, "selObjectPropertyName": "location_name" }},
                      {"list1": { 
                        "items": [
                        { "keyName": "M1", "keyValue_en": "Morning 1", "keyValue_es": "Mañana 1" },
                        { "keyName": "M2", "keyValue_en": "Morning 2", "keyValue_es": "Mañana 2" },
                        { "keyName": "NIGHT", "keyValue_en": "Night", "keyValue_es": "Nocturno" }
                        ],    
                        "label_en": "Shift", "label_es": "Turno" 
                      }},                      
                      {"list2": {    
                        "label_en": "Production lot", "label_es": "Lote de producción", "optional": true,
                        "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
                        "valuesFromProperty": {
                          "fixItemsOnTop": [
                            { "keyName": "responsible", "keyValue_en": "responsible", "keyValue_es": "responsible" }
                          ],
                          "selObjectPropertyName":"prodLotList",
                          "propertyKeyName": "lot_name", "propertyKeyValueEn": "lot_name", "propertyKeyValueEs": "lot_name"
                        }			
                      }},                      
                      {"number1": { "label_en":"Num Samples to log", "label_es":"Num muestras a crear", "argumentName": "numSamplesToLog", "default_value": 1 } }                              
                      
                    ],  		                               
                    "xname" : "pointDialog",
                    "action": { "actionName": "LOGSAMPLE",
                      "endPointUrl": "Samples",
                      "requiresDialog": false,
                      "zzzendPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                      "zzzclientMethod": "logSample",
                      "endPointParams": [
                        { "argumentName": "programName", "selObjectPropertyName": "program_name" },
                        { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
                        { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
                        { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
                        { "argumentName": "fieldName", "defaultValue": "shift|production_lot" },
                        { "argumentName": "fieldValue", "targetValue": true },
                        { "argumentName": "numSamplesToLog", "defaultValue": 1 }
                      ]
                    }
                  }
                }                
              ],
              "gridActionOnClick":
                {
                  "actionName": "LOGSAMPLE",
                  "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                  "requiresDialog": true,
                  "clientMethod": "logSampleDialog",
                  "dialogQueries":[
                    {	"actionName": "GET_ACTIVE_PRODUCTION_LOTS",				
                      "endPoint": "/moduleenvmon/EnvMonAPIqueries",
                      "variableForData": "prodLotList"		  
                    }
                  ],
              
                  "dialogInfo":{
                    "name" : "pointDialog",
                    "action": { "actionName": "LOGSAMPLE",
                      "endPointUrl": "Samples",
                      "requiresDialog": false,
                      "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                      "clientMethod": "logSample",
                      "endPointParams": [
                        { "argumentName": "programName", "selObjectPropertyName": "program_name" },
                        { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
                        { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
                        { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
                        { "argumentName": "fieldName", "defaultValue": "shift|production_lot" },
                        { "argumentName": "fieldValue", "targetValue": true },
                        { "argumentName": "numSamplesToLog", "defaultValue": 1 }
                      ]
                    }
                  }
                }          
            }
          ]
        }
    ]
  
    
  },
  "LogSamples20240729": {
    "component": "TableWithButtons",
    "langConfig": {
      "title": {
        "SampleLogin" : {
          "label_en": "Program Sampling Points", 
          "label_es": "Puntos de muestro del programa"
        }
      },
      "fieldText": {
        "logBtn": { "label_en": "Log Sample", "label_es": "Registrar Muestra" },
        "shift": {
          "items": [
            { "keyName": "M1", "keyValue_en": "Morning 1", "keyValue_es": "Mañana 1" },
            { "keyName": "M2", "keyValue_en": "Morning 2", "keyValue_es": "Mañana 2" },
            { "keyName": "N", "keyValue_en": "Night", "keyValue_es": "Noche" }
          ],
          "label_en": "Shift", "label_es": "Turno"
        },
        "lot": {
          "items": [],
          "label_en": "Lot", "label_es": "Lote"
        }
      },
      "gridHeader": {
        "area": {"label_en": "Area", "label_es": "Area", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
        "location_name": {"label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "20%"},
        "spec_code": {"label_en": "Spec", "label_es": "Especificación", "sort": false, "filter": true, "width": "20%"},
        "spec_variation_name": {"label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true, "width": "20%"},
        "spec_analysis_variation": {"label_en": "Analysis Variation", "label_es": "Análisis de Variación", "sort": false, "filter": true, "width": "20%"},
        "person_ana_definition": {"label_en": "Person Sampling Areas", "label_es": "Areas a analizar de Personal", "sort": false, "filter": true, "width": "40%"},
        "requires_tracking_sampling_end": {"label_en": "Sampling Static?", "label_es": "Muestreo Estático?", "sort": false, "filter": true, "width": "40%"}
      },
	  "gridActionOnClick":{"actionName": "LOGSAMPLE",
		"endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
		"requiresDialog": true,
		"clientMethod": "logSampleDialog",
		"dialogQueries":[
			{	"actionName": "GET_ACTIVE_PRODUCTION_LOTS",				
				"endPoint": "/moduleenvmon/EnvMonAPIqueries",
				"variableForData": "prodLotList"		  
			}
		],

		"dialogInfo":{
			"name" : "pointDialog",
			"action": { "actionName": "LOGSAMPLE",
				"endPointUrl": "Samples",
				"requiresDialog": false,
				"endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
				"clientMethod": "logSample",
				"endPointParams": [
				  { "argumentName": "programName", "selObjectPropertyName": "program_name" },
				  { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
				  { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
				  { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
				  { "argumentName": "fieldName", "defaultValue": "shift|production_lot" },
				  { "argumentName": "fieldValue", "targetValue": true },
				  { "argumentName": "numSamplesToLog", "defaultValue": 1 }
				]
			}
		}
	  }
    },
    "viewQuery":
    { "actionName": "PROGRAMS_LIST",
      "endPoint": "/moduleenvmon/EnvMonAPIqueries",
      "clientMethod": "getProgramList",
      "addRefreshButton": false,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "subAction": {
        "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
		"endPoint": "/moduleenvmon/EnvMonAPIqueries",
        "clientMethod": "getLots"
      }
    },
    "actions": [
    ],
    "topCompositions": [
      {
        "templateName": "specCode",
        "buttons": [{
          "icon": "refresh",
          "title": {
            "label_en": "Reload", "label_es": "Recargar"
          },
          "calledActionIdx": 0
        }]
      }
    ]
  },
  "SamplePendingSampling": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "SamplingSMP": {
          "label_en": "Samples Pending Sampling Date", 
          "label_es": "Muestras pendientes de la fecha de muestreo"
        },
        "SamplingPERS": {
          "label_en": "Personnel Samples Pending Sampling Date", 
          "label_es": "Muestras de personal pendientes de la fecha de muestreo"
        }
      },
      "gridHeader": {
       "sample_id": {"label_en": "Sample ID","label_es": "ID Muestra", "sort": false, "filter": true},
        "program_name": {"label_en": "Project", "label_es": "Programa", "sort": false, "filter": true},
        "location_name": {"label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true},
        "sampling_date": {"label_en": "Sampling Date", "label_es": "ID Fecha de Muestreo", "sort": false, "filter": true},
        "sampling_comment": {
          "label_en": "sampling Comment", "label_es": "Comentario Muestreo", "sort": false, "filter": true},		  
        "spec_code": {
          "label_en": "Spec", "label_es": "Especificación", "sort": false, "filter": true
        },
        "spec_variation_name": {
          "label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true
        }
      }
    },
    "viewQuery":{ "actionName": "SAMPLES_BY_STAGE",
      "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": [
        { "argumentName": "sampleFieldToRetrieve", "value": "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name" },
        { "argumentName": "whereFieldsValue", "value": "Sampling|prog_pers_template|false*Boolean" }
      ],
      "subViewFilter": {
        "SamplingSMP": [{ "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code not in*|requires_tracking_sampling_end" }],
        "SamplingPERS": [{ "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code in*|requires_tracking_sampling_end" }]
      }
    },
    "actions": [
      { "actionName": "ADDPLATEPICTURE",
		"requiresDialog": true,	  
		"endPointUrl": "Samples",
        "button": {
          "icon": "event",
          "title": {
            "label_en": "Take Plate Picture", "label_es": "Tomar foto de Placa"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": { 
		  "name": "takePictureDialog",
          "fields": [            
			{"datetime1": { "label_en": "new Date", "label_es": "Nueva Fecha" }}
          ]  		  
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "newDateTime", "element": "datetime1", "selObjectPropertyName": "sampling_date"  }
        ]
      },
      { "actionName": "GET_SAMPLE_AUDIT",	  
		"requiresDialog": true,
		"endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            { "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionName": "SETSAMPLINGDATE",
		"endPointUrl": "Samples",
		"requiresDialog": false,
        "button": {
          "icon": "date_range",
          "title": {
            "label_en": "Set Sample Date", "label_es": "Establecer Fecha Muestra"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "CHANGESAMPLINGDATE",
		"requiresDialog": true,	  
		"endPointUrl": "Samples",
        "button": {
          "icon": "event",
          "title": {
            "label_en": "Change Sample Date", "label_es": "Cambiar Fecha Muestra"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": { 
		      "name": "genericDialog",
          "fields": [            
            {"datetime1": { "label_en": "new Date", "label_es": "Nueva Fecha" }}
          ]  		  
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "newDateTime", "element": "datetime1", "selObjectPropertyName": "sampling_date"  }
        ]
      },
      { "actionName": "ASSIGN_SAMPLE_CULTURE_MEDIA",
		"requiresDialog": false,	  
		"endPointUrl": "Samples",
        "button": {
          "icon": "save_alt",
          "title": {
            "label_en": "Assign Culture Media (Open)", "label_es": "Asignar Medio de Cultivo (Abierto)"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "inventoryTrackingProcInstanceName", "fixValue": "inv-draft"},
		  { "argumentName": "category", "fixValue": "Medios de Cultivo"},
		  { "argumentName": "reference", "fixValue": "REF1"},
		  { "argumentName": "useOpenReferenceLot", "fixValue": "true"}
        ]
      },	  
      { "actionName": "ASSIGN_SAMPLE_CULTURE_MEDIA",
		"requiresDialog": true,	  
		"endPointUrl": "Samples",
        "button": {
          "icon": "save_alt",
          "title": {
            "label_en": "Assign Culture Media (Select)", "label_es": "Asignar Medio de Cultivo (Escoger)"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": { 
		  "name": "genericDialog",
          "fields": [            
			{"text1": { "label_en": "Lot", "label_es": "Lote", "default_value": "StdPrimDemo 2023-01-23T15:18:41.731217500" }}
          ]  		  
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "inventoryTrackingProcInstanceName", "fixValue": "inv-draft"},
		  { "argumentName": "category", "fixValue": "Medios de Cultivo"},
		  { "argumentName": "reference", "fixValue": "REF1"},
		  { "argumentName": "referenceLot", "element": "text1"}
        ]
      },	  
      { "actionName": "SAMPLESTAGE_MOVETONEXT",
        "clientMethod": "moveToNext",
		"requiresDialog": false,
		"endPointUrl": "Samples",
        "button": {
          "icon": "skip_next",
          "title": {
            "label_en": "Next", "label_es": "Siguiente"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "SAMPLINGCOMMENTADD",		
        "requiresDialog": true,
		"endPointUrl": "Samples",
        "button": {
          "icon": "add_comment",
          "title": {
            "label_en": "Add Sampling Comment", "label_es": "Agregar Comentario de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": {           
		  "name": "genericDialog",
          "fields": [            
			{"text1": { "label_en": "new Comment", "label_es": "Comentario", "selObjectPropertyName": "sampling_comment" }}
          ]    
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "sampleComment", "element": "text1", "defaultValue": "" }
        ]
      },
      { "actionName": "SAMPLINGCOMMENTREMOVE",
		"requiresDialog": false, 
		"endPointUrl": "Samples",		
        "button": {
          "icon": "speaker_notes_off",
          "title": {
            "label_en": "Remove Sampling Comment", "label_es": "Eliminar Comentario de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      }
    ]
  },
  "SamplePendingSamplingInterval": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "SamplingSMP": {
          "label_en": "Samples Pending Sampling Date by Interval", 
          "label_es": "Muestras pendientes de la fecha de muestreo por Intervalo"
        },
        "SamplingPERS": {
          "label_en": "Personnel Samples Pending Sampling Date by Interval", 
          "label_es": "Muestras de personal pendientes de la fecha de muestreo  por Intervalo"
        }
      },
      "gridHeader": {
        "sample_id": {
          "label_en": "Sample ID", "label_es": "ID Muestra", "sort": false, "filter": true
        },
        "program_name": {
          "label_en": "Project", "label_es": "Programa", "sort": false, "filter": true
        },
        "location_name": {
          "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true
        },
        "sampling_date": {
          "label_en": "Sampling Date", "label_es": "ID Fecha de Muestreo", "sort": false, "filter": true
        },
        "sampling_comment": {
          "label_en": "sampling Comment", "label_es": "Comentario Muestreo", "sort": false, "filter": true
        },
        "spec_code": {
          "label_en": "Spec", "label_es": "Especificación", "sort": false, "filter": true
        },
        "spec_variation_name": {
          "label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true
        }
      }
    },
    "viewQuery":
    { "actionName": "SAMPLES_BY_STAGE",
      "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": [
        { "argumentName": "sampleFieldToRetrieve", "value": "sample_id|current_stage|status|status_previous|sampling_date|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name" },
        { "argumentName": "whereFieldsValue", "value": "true*Boolean|Sampling|prog_pers_template" }
      ],
      "subViewFilter": {
        "SamplingSMP": [{ "argumentName": "whereFieldsName", "value": "requires_tracking_sampling_end|current_stage|sample_config_code not in*" }],
        "SamplingPERS": [{ "argumentName": "whereFieldsName", "value": "requires_tracking_sampling_end|current_stage|sample_config_code in*" }]
      }
    },
    "actions": [
      { "actionName": "GET_SAMPLE_AUDIT",	  
		"requiresDialog": true,
		"endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionName": "SETSAMPLINGDATE",
		"endPointUrl": "Samples",
		"requiresDialog": false,
        "button": {
          "icon": "date_range",
          "title": {
            "label_en": "Set Sample Date", "label_es": "Establecer Fecha Muestra"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "CHANGESAMPLINGDATE",
		"requiresDialog": true,	  
		"endPointUrl": "Samples",
        "button": {
          "icon": "event",
          "title": {
            "label_en": "Change Sample Date", "label_es": "Cambiar Fecha Muestra"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": { 
		  "name": "genericDialog",
          "fields": [            
			{"datetime1": { "label_en": "new Date", "label_es": "Nueva Fecha" }}
          ]  		  
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "newDateTime", "element": "datetime1", "selObjectPropertyName": "sampling_date"  }
        ]
      },
      { "actionName": "SETSAMPLINGDATEEND",
		"endPointUrl": "Samples",
		"requiresDialog": false,
        "button": {
          "icon": "date_range",
          "title": {
            "label_en": "Set END Sample Date", "label_es": "Establecer Fecha FIN Muestreo"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "CHANGESAMPLINGDATEEND",
		"requiresDialog": true,	  
		"endPointUrl": "Samples",
        "button": {
          "icon": "event",
          "title": {
            "label_en": "Change END Sample Date", "label_es": "Cambiar Fecha FIN Muestreo"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": { 
		  "name": "genericDialog",
          "fields": [            
			{"datetime1": { "label_en": "new Comment", "label_es": "Comentario" }}
          ]  		  
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "newDateTime", "element": "datetime1", "defaultValue": "" }
        ]
      },
      { "actionName": "SAMPLESTAGE_MOVETONEXT",
        "clientMethod": "moveToNext",
		"requiresDialog": false,
		"endPointUrl": "Samples",
        "button": {
          "icon": "skip_next",
          "title": {
            "label_en": "Next", "label_es": "Siguiente"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "SAMPLINGCOMMENTADD",		
        "requiresDialog": true,
		"endPointUrl": "Samples",
        "button": {
          "icon": "add_comment",
          "title": {
            "label_en": "Add Sampling Comment", "label_es": "Agregar Comentario de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": {           
		  "name": "genericDialog",
          "fields": [            
			{"text1": { "label_en": "new Comment", "label_es": "Comentario" }}
          ]    
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "sampleComment", "element": "text1", "defaultValue": "" }
        ]
      },
      { "actionName": "SAMPLINGCOMMENTREMOVE",
		"requiresDialog": false, 
		"endPointUrl": "Samples",		
        "button": {
          "icon": "speaker_notes_off",
          "title": {
            "label_en": "Remove Sampling Comment", "label_es": "Eliminar Comentario de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      }
    ]
  },
  "SamplePlateReading":{
    "component": "TableWithButtons",
    "langConfig": {
      "gridHeader": {
        "sample_id": {
          "label_en": "Sample ID",
          "label_es": "ID Muestra",
          "sort": false,
          "filter": true
        },
        "program_name": {
          "label_en": "Project",
          "label_es": "Programa",
          "sort": false,
          "filter": true
        },
        "location_name": {
          "label_en": "Location",
          "label_es": "Ubicación",
          "sort": false,
          "filter": true
        },
        "sampling_date": {
          "label_en": "sampling Date",
          "label_es": "ID Fecha de Muestreo",
          "sort": false,
          "filter": true
        },
        "incubation_batch": {
          "label_en": "Batch incub 1",
          "label_es": "Tanda 1a Incubacion",
          "sort": false,
          "filter": true
        },
        "incubation_incubator": {
          "label_en": "Incubator incub 1",
          "label_es": "Incubadora 1a Incubacion",
          "sort": false,
          "filter": true
        },
        "incubation_start": {
          "label_en": "incubation 1 start",
          "label_es": "Inicio 1a Incubacion",
          "sort": false,
          "filter": true
        },
        "incubation_end": {
          "label_en": "incubation 1 end",
          "label_es": "Fin 1a Incubacion",
          "sort": false,
          "filter": true
        },
        "incubation2_batch": {
          "label_en": "Batch incub 2",
          "label_es": "Tanda 2a Incubacion",
          "sort": false,
          "filter": true
        },
        "incubation2_incubator": {
          "label_en": "Incubator incub 2",
          "label_es": "Incubadora 2a Incubacion",
          "sort": false,
          "filter": true
        },
        "incubation2_start": {
          "label_en": "incubation 2 start",
          "label_es": "Inicio 2a Incubacion",
          "sort": false,
          "filter": true
        },
        "incubation2_end": {
          "label_en": "incubation 2 end",
          "label_es": "Fin 2a Incubacion",
          "sort": false,
          "filter": true
        }
      },
      "title": [
        {
          "LOCATION": {
            "label_en": "Samples Pending Plate Reading",
            "label_es": "Muestras pendientes de la lectura de placa"
          }
        },
        {
          "PERSONAL": {
            "label_en": "Personnel Samples Pending Plate Reading",
            "label_es": "Muestras de personal pendientes de la lectura de placa"
          }
        }
      ],
      "isStaged":[
        {"LOCATION":{
          "stages":[{ "name": "Sampling", "label_en":"Sampling", "label_es":"Muestreo" }, 
                  { "name": "Incubation", "label_en":"Incubation", "label_es":"Incubación" }, 
                  { "name": "PlateReading", "label_en":"Plate Reading Location", "label_es":"Lectura de placa Ubicación" }, 
                  { "name": "PlateReadingSecondEntry", "label_en":"Plate Reading 2nd Entry", "label_es":"2ª Lectura de placa" }, 
                  { "name": "MicroorganismIdentification", "label_en":"Microorganism Identification", "label_es":"Identificación de microorganismos" }, 
                  { "name": "Revision", "label_en":"Revision", "label_es":"Revisión" }],
          "currentstage": 3
          }
        },
        {"PERSONAL":{
          "stages":[{ "name": "Sampling", "label_en":"Sampling", "label_es":"Muestreo" }, 
                  { "name": "Incubation", "label_en":"Incubation", "label_es":"Incubación" }, 
                  { "name": "PlateReading", "label_en":"Plate Reading Personnel", "label_es":"Lectura de placa Personal" }, 
                  { "name": "PlateReadingSecondEntry", "label_en":"Plate Reading 2nd Entry", "label_es":"2ª Lectura de placa" }, 
                  { "name": "MicroorganismIdentification", "label_en":"Microorganism Identification", "label_es":"Identificación de microorganismos" }, 
                  { "name": "Revision", "label_en":"Revision", "label_es":"Revisión" }],
          "currentstage": 3
          }
        }
      ],       
    },
    "viewQuery": {
      "actionName": "SAMPLES_BY_STAGE",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": [
        {
          "argumentName": "sampleFieldToRetrieve",
          "value": "sample_id|program_name|location_name|current_stage|status|sampling_date|sampling_comment|incubation_batch|incubation_incubator|incubation_start|incubation_end|incubation2_batch|incubation2_incubator|incubation2_start|incubation2_end|sample_config_code"
        },
        {
          "argumentName": "whereFieldsValue",
          "value": "PlateReading|prog_pers_template"
        }
      ]
    },   
    "row_buttons": [],
    "enableContextMenu": true,
    "addActionsInContextMenu": false,
    "actions": [
      {
        "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
        "requiresDialog": false,
        "endPointUrl": "Samples",
        "button": {
          "icon": "skip_previous",
          "title": {
            "label_en": "Previous",
            "label_es": "Previo"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ]
      },
      {
        "actionName": "SAMPLESTAGE_MOVETONEXT",
        "clientMethod": "moveToNext",
        "requiresDialog": false,
        "endPointUrl": "Samples",
        "button": {
          "icon": "skip_next",
          "title": {
            "label_en": "Next",
            "label_es": "Siguiente"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ]
      },
      {
        "actionName": "ENTER_PLATE_READING",
        "notGetViewData": true,
        "requiresDialog": true,
        "endPointUrl": "Samples",
        "alertMsg": {
          "empty": {
            "label_en": "No pending results to enter result",
            "label_es": "No hay resultados pendientes de resultados"
          }
        },
        "button": {
          "icon": "document_scanner",
          "title": {
            "label_en": "Enter Result",
            "label_es": "Ingrese el Resultado"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": {
          "name": "resultDialog",
          "subQueryName": "getResult",
          "viewQuery": {
            "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
            "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
            "endPointParams": [
              {
                "argumentName": "sampleId",
                "selObjectPropertyName": "sample_id"
              }
            ]
          },
          "automatic": true,
          "resultHeader": {
            "spec_eval": {
              "label_en": "Spec Eval",
              "label_es": "Eval Espec"
            },
            "result_id": {
              "label_en": "Result Id",
              "label_es": "Id Resultado"
            },
            "analysis": {
              "label_en": "Analysis",
              "label_es": "Análísis"
            },
            "param_name": {
              "label_en": "Parameter",
              "label_es": "Parámetro"
            },
            "raw_value": {
              "label_en": "Value",
              "label_es": "Valor"
            },
            "uom": {
              "label_en": "UOM",
              "label_es": "UOM"
            }
          },
          "resultHeaderObjectLabelTopLeft": {
            "label_en": "Sample: ",
            "label_es": "Muestra: "
          },
          "action": [
            {
              "actionName": "ENTER_PLATE_READING",
              "requiresDialog": false,
              "endPointUrl": "Samples",
              "clientMethod": "enterResult",
              "endPointParams": [
                {
                  "argumentName": "rawValueResult",
                  "targetValue": true
                },
                {
                  "argumentName": "resultId",
                  "targetValue": true
                }
              ]
            },
            {
              "actionName": "RESULT_CHANGE_UOM",
              "clientMethod": "changeUOM",
              "endPointParams": [
                {
                  "argumentName": "newResultUom",
                  "targetValue": true
                },
                {
                  "argumentName": "resultId",
                  "targetValue": true
                }
              ]
            }
          ]
        },
        "endPointParams": [
          {
            "argumentName": "sampleAnalysisResultFieldToRetrieve",
            "value": "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict"
          },
          {
            "argumentName": "sortFieldsName",
            "value": "test_id|result_id"
          },
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ]
      },
      {
        "actionName": "GET_SAMPLE_AUDIT",
        "requiresDialog": true,
        "endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit",
            "label_es": "Auditoría de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ],
        "dialogInfo": {
          "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
              "requiresDialog": false,
              "notGetViewData": true,
              "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                {
                  "argumentName": "auditId",
                  "targetValue": true
                }
              ]
            }
          ]
        }
      }
    ],
    "subViewFilter": [
      {
        "LOCATION": [
          {
            "argumentName": "whereFieldsName",
            "value": "current_stage|sample_config_code not in*"
          }
        ]
      },
      {
        "PERSONAL": [
          {
            "argumentName": "whereFieldsName",
            "value": "current_stage|sample_config_code in*"
          }
        ]
      }
    ]
  },
  "SamplePlateReadingOld": {
	"component": "TableWithButtons",	
    "langConfig": {
      "title": {
        "PlateReadingSMP": {
          "label_en": "Samples Pending Plate Reading", 
          "label_es": "Muestras pendientes de la lectura de placa"
        },
        "PlateReadingPERS": {
          "label_en": "Personnel Samples Pending Plate Reading", 
          "label_es": "Muestras de personal pendientes de la lectura de placa"
        }
      },
      "gridHeader": {
        "sample_id": {
          "label_en": "Sample ID", "label_es": "ID Muestra", "sort": false, "filter": true
        },
        "program_name": {
          "label_en": "Project", "label_es": "Programa", "sort": false, "filter": true
        },
        "location_name": {
          "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true
        },
        "sampling_date": {
          "label_en": "sampling Date", "label_es": "ID Fecha de Muestreo", "sort": false, "filter": true
        },
        "incubation_batch": {
          "label_en": "Batch incub 1", "label_es": "Tanda 1a Incubacion", "sort": false, "filter": true
        },
        "incubation_incubator": {
          "label_en": "Incubator incub 1", "label_es": "Incubadora 1a Incubacion", "sort": false, "filter": true
        },
        "incubation_start": {
          "label_en": "incubation 1 start", "label_es": "Inicio 1a Incubacion", "sort": false, "filter": true
        },
        "incubation_end": {
          "label_en": "incubation 1 end", "label_es": "Fin 1a Incubacion", "sort": false, "filter": true
        },
        "incubation2_batch": {
          "label_en": "Batch incub 2", "label_es": "Tanda 2a Incubacion", "sort": false, "filter": true
        },
        "incubation2_incubator": {
          "label_en": "Incubator incub 2", "label_es": "Incubadora 2a Incubacion", "sort": false, "filter": true
        },
        "incubation2_start": {
          "label_en": "incubation 2 start", "label_es": "Inicio 2a Incubacion", "sort": false, "filter": true
        },
        "incubation2_end": {
          "label_en": "incubation 2 end", "label_es": "Fin 2a Incubacion", "sort": false, "filter": true
        }
      }
    },
    "isStaged":{
      "stages":[{ "name": "Sampling", "label_en":"Sampling", "label_es":"Muestreo" }, 
                { "name": "Incubation", "label_en":"Incubation", "label_es":"Incubación" }, 
                { "name": "PlateReading", "label_en":"Plate Reading", "label_es":"Lectura de placa" }, 
                { "name": "PlateReadingSecondEntry", "label_en":"Plate Reading 2nd Entry", "label_es":"2ª Lectura de placa" }, 
                { "name": "MicroorganismIdentification", "label_en":"Microorganism Identification", "label_es":"Identificación de microorganismos" }, 
                { "name": "Revision", "label_en":"Revision", "label_es":"Revisión" }],
      "currentstage": 3
    },    
    "viewQuery":{ "actionName": "SAMPLES_BY_STAGE",
	  "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": [
        { "argumentName": "sampleFieldToRetrieve", "value": "sample_id|program_name|location_name|current_stage|status|sampling_date|sampling_comment|incubation_batch|incubation_incubator|incubation_start|incubation_end|incubation2_batch|incubation2_incubator|incubation2_start|incubation2_end|sample_config_code" },
        { "argumentName": "whereFieldsValue", "value": "PlateReading|prog_pers_template" }
      ],
      "subViewFilter": {
        "PlateReadingSMP": [{ "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code not in*" }],
        "PlateReadingPERS": [{ "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code in*" }]
      }
    },
    "actions": [
      { "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
		"requiresDialog": false,
		"endPointUrl": "Samples",
        "button": {
          "icon": "skip_previous",
          "title": {
            "label_en": "Previous", "label_es": "Previo"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "SAMPLESTAGE_MOVETONEXT",
		"requiresDialog": false,
		"endPointUrl": "Samples",
        "button": {
          "icon": "skip_next",
          "title": {
            "label_en": "Next", "label_es": "Siguiente"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },	
      { "actionName": "GET_SAMPLE_AUDIT",	  
		"requiresDialog": true,
		"endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionName": "ENTER_PLATE_READING",
        "notGetViewData": true,
		"requiresDialog": true,
		"endPointUrl": "Samples",
        "alertMsg": {
          "empty": { "label_en": "No pending results to enter result", "label_es": "No hay resultados pendientes de resultados" }
        },
        "button": {
          "icon": "document_scanner",
          "title": {
            "label_en": "Enter Result", "label_es": "Ingrese el Resultado"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": { 
		  "name": "resultDialog",
		  "subQueryName": "getResult",
		  "viewQuery": {
			  "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
			  "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
				"endPointParams": [				  
				  { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
				]
		  },			  
          "automatic": true,
		  "resultHeader": {
			"spec_eval": {"label_en": "Spec Eval", "label_es": "Eval Espec"},
			"result_id": {"label_en": "Result Id", "label_es": "Id Resultado"},
			"analysis": {"label_en": "Analysis", "label_es": "Análísis"},
			"param_name": {"label_en": "Parameter", "label_es": "Parámetro"},
			"raw_value": {"label_en": "Value", "label_es": "Valor"},
			"uom": {"label_en": "UOM", "label_es": "UOM"}
		  },
		  "resultHeaderObjectLabelTopLeft": {
			"label_en": "Sample: ", "label_es": "Muestra: "
		  },  
          "action": [
            {
              "actionName": "ENTER_PLATE_READING",
			  "requiresDialog": false,
			  "endPointUrl": "Samples",
              "clientMethod": "enterResult",
              "endPointParams": [
                { "argumentName": "rawValueResult", "targetValue": true },
                { "argumentName": "resultId", "targetValue": true }
              ]
            },
            {
              "actionName": "RESULT_CHANGE_UOM",
              "clientMethod": "changeUOM",
              "endPointParams": [
                { "argumentName": "newResultUom", "targetValue": true },
                { "argumentName": "resultId", "targetValue": true }
              ]
            }
          ]
        },
        "endPointParams": [
          { "argumentName": "sampleAnalysisResultFieldToRetrieve", "value": "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict" },
          { "argumentName": "sortFieldsName", "value": "test_id|result_id" },
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      }
    ]
  },
  "SamplePlateReadingSecondEntry": {
	"component": "TableWithButtons",	  
    "langConfig": {
      "title": {
        "PlateReadingSecondEntrySMP": {"label_en": "Samples Pending Plate Reading Second Entry", "label_es": "Muestras pendientes de confirmación de lectura de placa"},
        "PlateReadingSecondEntryPERS": {"label_en": "Personnel Samples Pending Plate Reading Confirmation", "label_es": "Muestras de personal pendientes confirmación de la lectura de placa"}
      },
      "gridHeader": {
        "sample_id": {"label_en": "Sample ID", "label_es": "ID Muestra", "sort": false, "filter": true},
        "program_name": {"label_en": "Project", "label_es": "Programa", "sort": false, "filter": true},
        "location_name": {"label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true},
        "sampling_date": {"label_en": "sampling Date", "label_es": "ID Fecha de Muestreo", "sort": false, "filter": true},
        "incubation_batch": {"label_en": "Batch incub 1", "label_es": "Tanda 1a Incubacion", "sort": false, "filter": true},
        "incubation_incubator": {"label_en": "Incubator incub 1", "label_es": "Incubadora 1a Incubacion", "sort": false, "filter": true},
        "incubation_start": {"label_en": "incubation 1 start", "label_es": "Inicio 1a Incubacion", "sort": false, "filter": true},
        "incubation_end": {"label_en": "incubation 1 end", "label_es": "Fin 1a Incubacion", "sort": false, "filter": true},
        "incubation2_batch": {"label_en": "Batch incub 2", "label_es": "Tanda 2a Incubacion", "sort": false, "filter": true},
        "incubation2_incubator": {"label_en": "Incubator incub 2", "label_es": "Incubadora 2a Incubacion", "sort": false, "filter": true},
        "incubation2_start": {"label_en": "incubation 2 start", "label_es": "Inicio 2a Incubacion", "sort": false, "filter": true},
        "incubation2_end": {"label_en": "incubation 2 end", "label_es": "Fin 2a Incubacion", "sort": false, "filter": true}
      }
    },
    "viewQuery":    { "actionName": "SAMPLES_BY_STAGE",
	  "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": [
        { "argumentName": "sampleFieldToRetrieve", "value": "sample_id|program_name|location_name|current_stage|status|sampling_date|sampling_comment|incubation_batch|incubation_incubator|incubation_start|incubation_end|incubation2_batch|incubation2_incubator|incubation2_start|incubation2_end|sample_config_code" },
        { "argumentName": "whereFieldsValue", "value": "PlateReadingSecondEntry|prog_pers_template" }        
      ],
      "subViewFilter": {
        "PlateReadingSecondEntrySMP": [{ 
          "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code not in*" }],
        "PlateReadingSecondEntryPERS": [{ 
          "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code in*" }]
      }
    },
    "actions": [
      { "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
		"requiresDialog": false,
		"endPointUrl": "Samples",
        "button": {
          "icon": "skip_previous",
          "title": {
            "label_en": "Previous", "label_es": "Previo"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
	  { "actionName": "SAMPLESTAGE_MOVETONEXT",
		"requiresDialog": false,
		"endPointUrl": "Samples",
        "button": {
          "icon": "skip_next",
          "title": {
            "label_en": "Next", "label_es": "Siguiente"
          },
          "requiresGridItemSelected": true
        },
		"endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "GET_SAMPLE_AUDIT",	  
		"requiresDialog": true,
		"endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionName": "ENTER_PLATE_READING_SECONDENTRY",
		"requiresDialog": true,
		"endPointUrl": "Samples",
        "alertMsg": {
          "empty": { "label_en": "No pending results to enter result", "label_es": "No hay resultados pendientes de resultados" }
        },
        "button": {
          "icon": "document_scanner",
          "title": {
            "label_en": "Enter Result", "label_es": "Ingrese el Resultado"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": { 
		  "name": "resultDialog",
		  "subQueryName": "getResult",
		  "viewQuery": {
			  "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST_SECONDENTRY",
			  "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
				"endPointParams": [				  
				  { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
				]
		  },			  
          "automatic": true,
		  "resultHeader": {"sar2_spec_eval": {"label_en": "Spec Eval", "label_es": "Eval Espec"},
			"sar2_result_id": {"label_en": "Result Id", "label_es": "Id Resultado"},
			"analysis": {"label_en": "Analysis", "label_es": "Análísis"},
			"sar2_param_name": {"label_en": "Parameter", "label_es": "Parámetro"},
			"sar2_raw_value": {"label_en": "Value", "label_es": "Valor"},
			"sar2_uom": {"label_en": "UOM", "label_es": "UOM"}
		  },
		  "resultHeaderObjectLabelTopLeft": {
			"label_en": "Sample: ", "label_es": "Muestra: "
		  },  		  
          "action": [
            {
              "actionName": "ENTER_PLATE_READING_SECONDENTRY",
			  "requiresDialog": false,
			  "endPointUrl": "Samples",
              "clientMethod": "enterResult",
              "endPointParams": [
                { "argumentName": "rawValueResult", "targetValue": true },
                { "argumentName": "resultId", "targetValue": true }
              ]
            },
            {
              "actionName": "RESULT_CHANGE_UOM",
              "clientMethod": "changeUOM",
              "endPointParams": [
                { "argumentName": "newResultUom", "targetValue": true },
                { "argumentName": "resultId", "targetValue": true }
              ]
            }
          ]
        },
        "endPointParams": [
          { "argumentName": "sampleAnalysisResultFieldToRetrieve", "value": "result_id|analysis|method_name|method_version|param_name|param_type|raw_value|uom|spec_eval|spec_eval_detail|status|min_val_allowed|min_allowed_strict|max_val_allowed|max_allowed_strict" },
          { "argumentName": "sortFieldsName", "value": "test_id|result_id" },
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "sampleAnalysisResultWhereFieldsName", "value": "entered_by" },
          { "argumentName": "sampleAnalysisResultWhereFieldsValue", "value": "TOKN_internalUserID*String" }  
        ]
      }
    ]
  },
  "SampleMicroorganism": {
    "component": "SingleView",
    "hideLeftPane": true,
    
    "viewQuery": {
      "actionName": "GET_SAMPLE_MICROORGANISM_VIEW",
      "dataResponse": "ArrayInRoot",
      "endPointParams": [
        {
          "argumentName": "sampleFieldToRetrieve",
          "value": "sample_id|current_stage|status|status_previous|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name"
        }
      ],
      "subViewFilter": [
        {
          "LOCATION": [
            {
              "argumentName": "whereFieldsName",
              "value": "current_stage|sample_config_code in*"
            },
            {
              "argumentName": "whereFieldsValue",
              "value": "MicroorganismIdentification|location"
            }
          ]
        },
        {
          "PERSONAL": [
            {
              "argumentName": "whereFieldsName",
              "value": "current_stage|sample_config_code in*"
            },
            {
              "argumentName": "whereFieldsValue",
              "value": "MicroorganismIdentification|personal"
            }
          ]
        }
      ]
    },
    "view_definition": [
      {
        "type": "reportTitle",
        "subViewFilter": [
          {
            "LOCATION": {
              "title": {
                "label_en": "Microorganism identification Location",
                "label_es": "Identificación de la Ubicación de Microorganismos"
              }
            }
          },
          {
            "PERSONAL": {
              "title": {
                "label_en": "Microorganism identification Personal",
                "label_es": "Identificación de Microorganismos Personal"
              }
            }
          }
        ]
      },
      {
        "type": "parentReadOnlyTable",
        "allowMultiSelection": false,
        "refreshable": {
          "enable": true
        },
        "printable": {
          "enable": true
        },
        "downloadable": {
          "enable": true
        },
        "columns": [
          {
            "name": "sample_id",
            "label_en": "Sample ID",
            "label_es": "ID Muestra"
          },
          {
            "name": "identification_progress_percentage",
            "label_en": "Identification %",
            "label_es": "% Identificados",
            "as_progress": true
          },
          {
            "name": "program_name",
            "label_en": "Project",
            "label_es": "Programa"
          },
          {
            "name": "location_name",
            "label_en": "Location",
            "label_es": "Ubicación"
          },
          {
            "name": "sampling_date",
            "label_en": "Sampling Date",
            "label_es": "Fecha de Muestreo"
          },
          {
            "name": "raw_value",
            "label_en": "Reading Result",
            "label_es": "Recuento"
          },
          {
            "name": "microorganism_count",
            "label_en": "Organism Ident.",
            "label_es": "Num. MicroOrg. Detectados"
          },
          {
            "name": "microorganism_list",
            "label_en": "Microorganisms",
            "label_es": "Microorganismos"
          }
        ],
        "actions": [
          {
            "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
            "requiresDialog": false,
            "button": {
              "icon": "skip_previous",
              "title": {
                "label_en": "Previous",
                "label_es": "Previo"
              },
              "requiresGridItemSelected": true
            },
            "endPointParams": [
              {
                "argumentName": "sampleId",
                "selObjectPropertyName": "sample_id"
              }
            ]
          },
          {
            "actionName": "SAMPLESTAGE_MOVETONEXT",
            "requiresDialog": false,
            "button": {
              "icon": "skip_next",
              "title": {
                "label_en": "Next",
                "label_es": "Siguiente"
              },
              "requiresGridItemSelected": true
            },
            "endPointParams": [
              {
                "argumentName": "sampleId",
                "selObjectPropertyName": "sample_id"
              }
            ]
          },
          {
            "actionName": "ADD_SAMPLE_MICROORGANISM",
            "clientMethod": "addSampleMicroorganism",
            "requiresDialog": true,
            "dialogInfo": { 
              "automatic": true,
              "name": "microorganismDialogAdd",
              "clientMethod": "getMicroorganismToAdd",
              "subQueryName": "getMicroorganismToAdd",
              "keepTheDialogOpen":true,
              "viewQuery": {
                "actionName": "GET_MICROORGANISM_LIST",
                "endPointParams": [				  
                  { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
                ]
              },		  
              "fieldText": {
                "addhocInput": { "label_en": "Ad-hoc microorganism name", "label_es": "Nombre Ad-hoc" },
                "addhocBtn": { "label_en": "Add Addhoc", "label_es": "Añadir Nuevo" },
                "addBtn": { "label_en": "Add", "label_es": "Añadir" }
              },
              "microorganismHeader": {
                "name": {
                  "label_en": "Name", "label_es": "Nombre", "sort": true, "filter": false 
                },
                "items": {
                  "label_en": "Items", "label_es": "Elementos", "sort": true, "filter": false 
                }
              },              
              "action": [
                {
                  "actionName": "ADD_SAMPLE_MICROORGANISM",
                  "clientMethod": "addSampleMicroorganism",
                  "endPointUrl": "Samples",
                  "endPointParams": [
                    { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
                    { "argumentName": "microorganismName", "targetValue": true },
                    { "argumentName": "numItems", "targetValue": true }
                  ]
                },
                {
                  "actionName": "ADD_ADHOC_SAMPLE_MICROORGANISM",
                  "clientMethod": "addSampleMicroorganism",
            "endPointUrl": "Samples",
            "requiresDialog": false,
                  "endPointParams": [
                    { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
                    { "argumentName": "microorganismName", "targetValue": true },
                    { "argumentName": "numItems", "targetValue": true }
                  ]
                }
              ]
            },
            "button": {
              "icon": "add",
              "title": {
                "label_en": "Add microorganisms",
                "label_es": "Añadir microorganismos"
              },
              "requiresGridItemSelected": true
            },            
            "endPointParams": [
              {
                "argumentName": "sampleId",
                "selObjectPropertyName": "sample_id"
              },
              {
                "argumentName": "microorganismName",
                "targetValue": true
              },
              {
                "argumentName": "numItems",
                "targetValue": true
              }
            ]
          },        
          {
            "actionName": "REMOVE_SAMPLE_MICROORGANISM",
            "clientMethod": "removeSampleMicroorganism",
            "requiresDialog": true,
            "dialogInfo":{
              "name": "microorganismDialogRemove",
              "subQueryName": "getMicroorganismToRemove",
              "keepTheDialogOpen":true,
              "viewQuery": {
                "actionName": "GET_MICROORGANISM_LIST",
                "endPointParams": [				  
                  { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
                ]
              },	              
              "microorganismHeader": {
                "name": {
                  "label_en": "Name", "label_es": "Nombre", "sort": true, "filter": false 
                },
                "items": {
                  "label_en": "Items", "label_es": "Elementos", "sort": true, "filter": false 
                }
              },
              "action": [
                {
                  "actionName": "REMOVE_SAMPLE_MICROORGANISM",
                  "endPointUrl": "Samples",
                  "clientMethod": "removeSampleMicroorganism",
                  "endPointParams": [
                    { "argumentName": "sampleId", "targetValue": true },
                    { "argumentName": "microorganismName", "targetValue": true },
                    { "argumentName": "numItems", "targetValue": true }
                  ]
                }
              ]                            
            },
            "button": {
              "icon": "delete",
              "title": {
                "label_en": "Remove microorganisms",
                "label_es": "Quitar microorganismos"
              },
              "requiresGridItemSelected": true
            },            
            "endPointParams": [
              {
                "argumentName": "sampleId",
                "targetValue": true
              },
              {
                "argumentName": "microorganismName",
                "targetValue": true
              },
              {
                "argumentName": "numItems",
                "targetValue": true
              }
            ],
            "row_buttons": []
          }
        ]
      }
    ]
  },
  "SampleRevision": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "SampleRevisionSMP": {
          "label_en": "Samples Pending Revision", 
          "label_es": "Muestras pendientes de revisar"
        },
        "SampleRevisionPERS": {
          "label_en": "Personnel Samples Pending Revision", 
          "label_es": "Muestras de personal pendientes de revisar"
        }
      },
      "gridHeader": {
        "sample_id": {
          "label_en": "Sample ID", "label_es": "ID Muestra", "sort": false, "filter": true, "width":  "12px"
        },
        "identification_progress_percentage": {
          "label_en": "", "label_es": "", "is_icon": true, "as_progress": true, "title":{"label_en": "Identification %", "label_es": "% Identificados"}, "sort": false, "filter": true, "width":  "12px"
        },
        "program_name": {
          "label_en": "Project", "label_es": "Programa", "sort": false, "filter": true, "width": "20px"
        },
        "location_name": {
          "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "30px"
        },
        "sampling_date": {
          "label_en": "sampling Date", "label_es": "ID Fecha de Muestreo", "sort": false, "filter": true, "width": "20px"
        },
        "raw_value": {
          "label_en": "Reading Result", "label_es": "Recuento", "sort": false, "filter": true, "width": "20px"
        },
        "microorganism_count": {
          "label_en": "# Organism Ident.", "label_es": "Num. MicroOrg. Detectados", "sort": false, "filter": true, "width": "20px"
        },
        "microorganism_list": {
          "label_en": "Microorganisms", "label_es": "Microorganismos", "sort": false, "filter": true, "width": "20px"
        }
      },
      "microorganismHeader": {
        "name": {
          "label_en": "Name", "label_es": "Nombre", "sort": true, "filter": false 
        },
        "items": {
          "label_en": "Items", "label_es": "Elementos", "sort": true, "filter": false 
        }
      }
    },
    "viewQuery":
    { "actionName": "SAMPLES_BY_STAGE",
	  "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": [
        { "argumentName": "sampleFieldToRetrieve", "value": "sample_id|current_stage|status|status_previous|sampling_comment|sample_config_code|program_name|location_name|spec_code|spec_variation_name" }
        
      ],
      "subViewFilter": {
        "SampleRevisionSMP": [
			{ "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code" },
			{ "argumentName": "whereFieldsValue", "value": "Revision|program_smp_template" }
		],
        "SampleRevisionPERS": [
			{ "argumentName": "whereFieldsName", "value": "current_stage|sample_config_code" },
			{ "argumentName": "whereFieldsValue", "value": "Revision|prog_pers_template" }
		]
      }
    },
    "actions": [
      { "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
		"requiresDialog": false,
		"endPointUrl": "Samples",
        "button": {
          "icon": "skip_previous",
          "title": {
            "label_en": "Previous", "label_es": "Previo"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "SAMPLESTAGE_MOVETONEXT",
		"requiresDialog": false,
		"endPointUrl": "Samples",
        "button": {
          "icon": "skip_next",
          "title": {
            "label_en": "Next", "label_es": "Siguiente"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ]
      },
      { "actionName": "GET_SAMPLE_AUDIT",	  
		"requiresDialog": true,
		"endPoint": "/modulesample/SampleAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
      {
        "actionName": "REVIEWSAMPLE",
        "endPointUrl": "Samples",
        "requiresDialog": false,
        "xxxclientMethod": "reviewSample",
        "button": {
          "icon": "view_headline",
          "title": {
            "label_en": "Review",
            "label_es": "Revisar"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          {
            "argumentName": "sampleId",
            "selObjectPropertyName": "sample_id"
          }
        ]
      },      
      { "actionName": "GET_MICROORGANISM_LIST",
        "clientMethod": "getMicroorganism",
        "type":"readonly",
		    "requiresDialog": true,
        "button": {
          "icon": "add",
          "title": {
            "label_en": "Add Microorganism", "label_es": "Añadir Microorganismo"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
        ],
		"microorganismHeader": {
			"name": {
			  "label_en": "Name", "label_es": "Nombre", "sort": true, "filter": false 
			},
			"items": {
			  "label_en": "Items", "label_es": "Elementos", "sort": true, "filter": false 
			}
		},		
        "dialogInfo": { 
          "automatic": true,
		  "name": "microorganismDialogAdd",
		  "clientMethod": "getMicroorganismToAdd",
		  "subQueryName": "getMicroorganismToAdd",
		  "viewQuery": {
			  "actionName": "GET_MICROORGANISM_LIST",
				"endPointParams": [				  
				  { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
				]
		  },		  
          "fieldText": {
            "addhocInput": { "label_en": "Ad-hoc microorganism name", "label_es": "Nombre Ad-hoc" },
            "addhocBtn": { "label_en": "Add Addhoc", "label_es": "Añadir Nuevo" },
            "addBtn": { "label_en": "Add", "label_es": "Añadir" }
          },
              "action": [
            {
              "actionName": "ADD_SAMPLE_MICROORGANISM",
              "clientMethod": "addSampleMicroorganism",
			  "endPointUrl": "Samples",
              "endPointParams": [
                { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
                { "argumentName": "microorganismName", "targetValue": true },
                { "argumentName": "numItems", "targetValue": true }
              ]
            },
            {
              "actionName": "ADD_ADHOC_SAMPLE_MICROORGANISM",
              "clientMethod": "addSampleMicroorganism",
			  "endPointUrl": "Samples",
			  "requiresDialog": false,
              "endPointParams": [
                { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
                { "argumentName": "microorganismName", "targetValue": true },
                { "argumentName": "numItems", "targetValue": true }
              ]
            }
          ]
        }
      },
      { "actionNamexxx": "GET_SAMPLE_MICROORGANISM_VIEW",
        "clientMethod": "getMicroorganismItem",
		"requiresDialog": true,
        "button": {
          "icon": "remove",
          "title": {
            "label_en": "Remove Microorganism", "label_es": "Borrar Microorganismo"
          },
          "requiresGridItemSelected": true
        },
        "zzzendPointParams": [
          { "argumentName": "whereFieldsName", "value": "sample_id" },
          { "argumentName": "whereFieldsValue", "targetValue": true }
        ],
      "microorganismHeader": {
        "name": {
          "label_en": "Name", "label_es": "Nombre", "sort": true, "filter": false 
        },
        "items": {
          "label_en": "Items", "label_es": "Elementos", "sort": true, "filter": false 
        }
      },		
        "dialogInfo": { 
          "automatic": true,
		  "name": "microorganismDialogRemove",
		  "subQueryName": "getMicroorganismToRemove",
		  "viewQuery": {
			  "actionName": "GET_SAMPLE_MICROORGANISM_VIEW",
				"endPointParams": [
				  { "argumentName": "whereFieldsName", "value": "sample_id" },
				  { "argumentName": "whereFieldsValue", "targetValue": true }
				]
		  },
          "action": [
            {
              "actionName": "REMOVE_SAMPLE_MICROORGANISM",
              "endPointUrl": "Samples",
              "clientMethod": "removeSampleMicroorganism",
              "endPointParams": [
                { "argumentName": "sampleId", "targetValue": true },
                { "argumentName": "microorganismName", "targetValue": true },
                { "argumentName": "numItems", "targetValue": true }
              ]
            }
          ]
        }
      }
    ]
  },
  "SampleIncubation": {
	"component":"ModuleEnvMonitSampleIncubation", 	  
    "abstract": true,
	"langConfig": {
		"title": {		
		"label_en": "Samples Incubation", 
		"label_es": "Incubación de Muestras"
		}
	},
    "viewQuery":{ "actionName": "GET_PENDING_INCUBATION_SAMPLES_AND_ACTIVE_BATCHES",
	  "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
      "endPointParams": [
        { "argumentName": "incub1_whereFieldsName", "value": "current_stage|incubation_passed" },
        { "argumentName": "incub1_whereFieldsValue", "value": "Incubation|false" },
        { "argumentName": "incub1_sortFieldsName", "value": "sample_id desc" },
        { "argumentName": "incub2_whereFieldsName", "value": "current_stage|incubation_passed" },
        { "argumentName": "incub2_whereFieldsValue", "value": "Incubation|true" },
        { "argumentName": "incub2_sortFieldsName", "value": "sample_id desc" },
        { "argumentName": "includeAllWithAnyPendingIncubation", "value": true },
        { "argumentName": "samplesWithAnyPendingIncubation", "value": true}
      ]
    },
	"actions": [],
    "stuckSamplesDialog":{
		"gridHeader": {
			"current_stage": { "label_en": "Current Stage", "label_es": "Etapa Actual" },
            "incubation_passed": { "label_en": "Passed", "label_es": "Aprobado" },
            "sample_id": { "label_en": "Sample Id", "label_es": "Muestra Id" }
		},
		"fields": {
		"topLabel": { "label_en": "Samples Incubation Stage", "label_es": "Etapa de incubación de muestras" },
		"next": { "label_en": "Next", "label_es": "Próxima" }
		}		
	},
	"active_batches":
      { "elementName": "envmonit-batch-sampleincubation",
        "filter": "active_batches",
        "langConfig": {
			"title":{
				"Incubation": {
					"label_en": "Batches", 
					"label_es": "Tandas"
				}
          },
          "fieldText": {
            "newBatch" : { "label_en": "New Batch Name", "label_es": "Nombre para la nueva tanda" }
          },
          "gridHeader": {
            "batchState": {
              "label_en": "", "label_es": "", "is_icon": true, "width": "10%"
            },
            "incubState": {
              "label_en": "incubState", "label_es": "EstadoIncub", "is_icon": true, "width": "10%"
            },
            "name": {
              "label_en": "Name", "label_es": "Nombre", "sort": true, "filter": false, "width": "15%"
            },
			"incubation_incubator": {
				"label_en": "Incubator", "label_es": "Incubadora", "sort": true, "filter": false, "width": "15%"
			},
            "incubator_info_temperature": {
              "label_en": "Temperature", "label_es": "Temperatura", "sort": false, "filter": false, "width": "10%"
            },
            "incubator_info_created_on": {
              "label_en": "T.Date", "label_es": "Fecha T.", "sort": false, "filter": false, "width": "20%"
            },
            "NUM_SAMPLES": {
              "label_en": "Num Samples", "label_es": "Nº Muestras", "sort": false, "filter": false, "width": "10%"
            },
            "incubation_start": {
              "label_en": "Start Date", "label_es": "Fecha Inicio", "sort": false, "filter": false, "width": "10%"
            }
          },
          "assignHeader": {
            "stage": { "label_en": "Incub", "label_es": "Incub" },
            "name": { "label_en": "Name", "label_es": "Nombre" },
            "description": { "label_en": "description", "label_es": "descripción" }
          }
        },
		"alternativeItemPropertyName": "selectedBatches",
		"viewQuery":{ "addRefreshButton": true,
		  "button": {
			"icon": "refresh",
			"title": {
			  "label_en": "Reload", "label_es": "Recargar"
			},
			"requiresGridItemSelected": true
		  }
		},        
		"actions": [
          { "actionName": "EM_BATCH_INCUB_CREATE",
			"requiresDialog": true,
			"endPointUrl": "Programs",
            "xxxclientMethod": "setIncubator",
            "button": {
              "title": {
                "label_en": "New Batch", "label_es": "Nuevo Lote"
              },
              "requiresGridItemSelected": false
            },
            "dialogInfo": {               
				"name": "genericDialog",
				"fields": [
					{"text1": { "label_en": "New Batch Name", "label_es": "Nombre para nueva Tanda" }}
				]	
            },
            "endPointParams": [
              { "argumentName": "batchName", "element": "text1", "defaultValue": "" },
              { "argumentName": "batchTemplateId", "defaultValue": 1 },
              { "argumentName": "batchTemplateVersion", "defaultValue": 1 }
            ]
          },
          { "actionName": "EM_BATCH_INCUB_REMOVE",
            "xxxclientMethod": "setIncubator",
			"requiresDialog": false,
			"endPointUrl": "Programs",
            "button": {
              "title": {
                "label_en": "Delete Batch", "label_es": "Eliminar Lote"
              },
              "requiresGridItemSelected": true,
			  "axxxlternativeItemPropertyName": "selectedBatches"
            },
            "endPointParams": [
              { "argumentName": "batchName", "internalVariableObjName": "selectedBatches", "internalVariableObjProperty": "name" }
            ]
          },
          { "actionName": "EM_BATCH_ASSIGN_INCUB",
			"requiresDialog": true,
			"endPointUrl": "Programs",
            "clientMethod": "getAssign",
            "button": {
				"title": {
					"label_en": "Assign Incubator", "label_es": "Asignar Incubadora"
				},
				"requiresGridItemSelected": true,
				"alternativeItemPropertyName": "selectedBatches",
              "disabledBEState": "incubation_start"
            },
			"dialogQueries":[
				{	"actionName": "GET_INCUBATORS_LIST",				
					"endPoint": "/moduleenvmon/EnvMonIncubatorAPIqueries",
					"variableForData": "incubatorsList"		  
				}
			],
			
            "dialogInfo": { 
				"name": "assignDialog",
				"automatic": true,
              "action": { "actionName": "EM_BATCH_ASSIGN_INCUB",
                  "xxclientMethod": "setIncubator",
				  "endPointUrl": "Batches",
                  "endPointParams": [
                    { "argumentName": "batchName", "internalVariableObjName": "selectedBatches", "internalVariableObjProperty": "name" },
                    { "argumentName": "incubatorName", "targetValue": true },
                    { "argumentName": "incubStage", "targetValue": true }
                  ]
                }
              
            }
          },
          { "actionName": "EM_BATCH_INCUB_START",
			"endPointUrl": "Programs",
			"requiresDialog": false,
            "xxxclientMethod": "setIncubator",
            "button": {
              "title": {
                "label_en": "Start Incubator", "label_es": "Iniciar Incubadora"
              },
			  "requiresGridItemSelected": true,
			  "alternativeItemPropertyName": "selectedBatches",
              "disabledBEState": "incubation_start"
            },
            "endPointParams": [
              { "argumentName": "batchName", "internalVariableObjName": "selectedBatches", "internalVariableObjProperty": "name" },
              { "argumentName": "batchTemplateId", "defaultValue": 1 },
              { "argumentName": "batchTemplateVersion", "defaultValue": 1 }
            ]
          },
          { "actionName": "EM_BATCH_INCUB_END",
			"endPointUrl": "Programs",
		    "requiresDialog": false,
            "xxxclientMethod": "setIncubator",
            "button": {
              "title": {
                "label_en": "End Incubator", "label_es": "Termina incubadora"
              },
			  "requiresGridItemSelected": true,
			  "alternativeItemPropertyName": "selectedBatches"

            },
            "endPointParams": [
              { "argumentName": "batchName", "internalVariableObjName": "selectedBatches", "internalVariableObjProperty": "name" },
              { "argumentName": "batchTemplateId", "defaultValue": 1 },
              { "argumentName": "batchTemplateVersion", "defaultValue": 1 }
            ]
          }
        ]
      },
    "samples_pending_incubation":  
	  { "elementName": "envmonit-batch-sampleincubation",
        "filter": "samplesWithAnyPendingIncubation",
		"langConfig": {
			"title":{
				"Incubation": {
					"label_en": "All Samples Pending Incubation", 
					"label_es": "Todas las muestras pendientes de incubación"
				}
          },
			"gridHeader": {
            "sampleType": {
              "label_en": "", "label_es": "", "is_icon": true, "width": "3%"
            },
            "incubState": {
              "label_en": "", "label_es": "", "is_icon": true, "width": "3%"
            },
            "samplesState": {
              "label_en": "", "label_es": "", "is_icon": true, "width": "3%"
            },
            "sample_id": {
              "label_en": "Sample ID", "label_es": "ID Muestra", "sort": false, "filter": true, "width": "9%"
            },
            "incubation_batch": {
              "label_en": "Batch 1", "label_es": "Tanda", "sort": false, "filter": true, "width": "9%"
            },
            "incubation2_batch": {
              "label_en": "Batch 2", "label_es": "Tanda", "sort": false, "filter": true, "width": "9%"
            },
            "incubation_start": {
              "label_en": "incubation 1 start", "label_es": "Inicio 1a Incubacion", "sort": false, "filter": true, "width": "15%"
            },
            "incubation_end": {
              "label_en": "incubation 1 end", "label_es": "Fin 1a Incubacion", "sort": false, "filter": true, "width": "15%"
            },
            "incubation2_start": {
              "label_en": "Incubation 2 Start", "label_es": "Inicio 2a Incubacion", "sort": false, "filter": true, "width": "15%"
            },
            "sampling_date": {
              "label_en": "Sampling Date", "label_es": "ID Fecha de Muestreo", "sort": false, "filter": true, "width": "9%"
            },
            "sampling_comment": {
              "label_en": "Sampling Commment", "label_es": "Comentario Muestreo", "sort": false, "filter": true, "width": "9%"
            }
          }
        },
		"alternativeItemPropertyName": "selectedSamples",
		"viewQuery":{ "addRefreshButton": true,
		  "button": {
			"icon": "refresh",
			"title": {
			  "label_en": "Reload", "label_es": "Recargar"
			},
			"requiresGridItemSelected": true
		  }
		},        
        "actions": [
          { "actionName": "SAMPLESTAGE_MOVETONEXT",
			"endPointUrl": "Samples",
			"requiresDialog": false,	
            "button": {
              "icon": "skip_next",
              "color": "red",
              "title": {
                "label_en": "Sample Stuck", "label_es": "Muestra Atascada", "extra": "stuckNum"
              },
              "requiresGridItemSelected": true,
			  "alternativeItemPropertyName": "selectedSamples",
              "whenHidden": "stucksList"
            },
            "dialogInfo": { 
              "requiresDialog": true,
              "name": "sampleStuckDialog"
            },
            "endPointParams": [
			{ "argumentName": "sampleId", "internalVariableObjName": "selectedSamples", "internalVariableObjProperty": "sample_id" }
            ]            
          },
          { "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
			"requiresDialog": false,
			"endPointUrl": "Samples",
            "button": {
              "class": "reverse",
              "icon": "skip_previous",
              "title": {
                "label_en": "Previous", "label_es": "Previo"
              },
			  "requiresGridItemSelected": true,
			  "xxxalternativeItemPropertyName": "selectedSamples"
            },
            "endPointParams": [
              { "argumentName": "sampleId", "internalVariableObjName": "selectedSamples", "internalVariableObjProperty": "sample_id" }
            ]    
          },
		  { "actionName": "GET_SAMPLE_AUDIT",	  
			"buttonForQuery" : true,
			"requiresDialog": true,
			"endPoint": "/modulesample/SampleAPIqueries",
			"button": {
			  "icon": "rule",
			  "title": {
				"label_en": "Sample Audit", "label_es": "Auditoría de Muestra"
			  },
			  "requiresGridItemSelected": true		
			},
			"clientMethod": "getObjectAuditInfo",
			"endPointParams": [
			  { "argumentName": "sampleId", "internalVariableObjName": "selectedSamples", "internalVariableObjProperty": "sample_id" }
			],        
			"dialogInfo": { 
			  "name": "auditDialog",
			  "automatic": true,
			  "action": [
				{
				  "actionName": "SAMPLEAUDIT_SET_AUDIT_ID_REVIEWED",
				  "requiresDialog": false,
				  "notGetViewData": true,
				  "endPointUrl": "Samples",
				  "clientMethod": "signAudit",
				  "endPointParams": [
					{ "argumentName": "auditId", "targetValue": true }
				  ]
				}
			  ]
			}
		  },
          { "actionName": "EM_BATCH_INCUB_ADD_SMP",
			"endPointUrl": "Samples",
			"requiresDialog": false,
            "clientMethod": "addRemoveBatch",
            "alternativeItemPropertyName": "selectedSamples",
            "button": {
              "title": {
                "label_en": "Add to Batch", "label_es": "Añadir a Tanda"
              },
              "requiresGridItemSelected": true,
			  "xalternativeItemPropertyName": "selectedSamples"
            },
            "endPointParams": [
              { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
              { "argumentName": "batchTemplateId", "defaultValue": 1 },
              { "argumentName": "batchTemplateVersion", "defaultValue": 1 },
			  { "argumentName": "batchName", "internalVariableObjName": "selectedBatches", "internalVariableObjProperty": "name" }			  
            ]
          },
          { "actionName": "EM_BATCH_INCUB_REMOVE_SMP",
			"endPointUrl": "Samples",
			"requiresDialog": false,
            "clientMethod": "addRemoveBatch",
            "alternativeItemPropertyName": "selectedSamples",
            "button": {
              "title": {
                "label_en": "Remove from Batch", "label_es": "Quitar de Tanda"
              },
              "requiresGridItemSelected": true			  
            },
            "endPointParams": [
              { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
			  { "argumentName": "batchName", "internalVariableObjName": "selectedBatches", "internalVariableObjProperty": "name" }			  
            ]            
          },
          { "clientMethod": "filterSamples",
			"requiresDialog": false,
            "filterState": "not_in_batch",
            "button": {
              "icon": "radio_button_checked",
              "color": "Orange",
              "title": {
                "label_en": "Incubation1, Not in Batch", "label_es": "Incubación1, Pendiente Asignar Tanda"
              },
              "requiresGridItemSelected": true
            }
          },
          { "clientMethod": "filterSamples",
			"requiresDialog": false,
            "filterState": "in_batch_1",
            "button": {
              "icon": "radio_button_checked",
              "color": "Tomato",
              "title": {
                "label_en": "Incubation1, In Batch", "label_es": "Incubación1, En Tanda"
              },
              "requiresGridItemSelected": true
            }
          },
          { "clientMethod": "filterSamples",
			"requiresDialog": false,
            "filterState": "progress_1",
            "button": {
              "img": "incubators/IncubInProgress.gif",
              "title": {
                "label_en": "Incubation1 In-Progress", "label_es": "Incubación1 en curso"
              },
              "requiresGridItemSelected": true
            }
          },
          { "clientMethod": "filterSamples",
			"requiresDialog": false,
            "filterState": "done",
            "button": {
              "icon": "radio_button_checked",
              "color": "MediumSeaGreen",
              "title": {
                "label_en": "Incubation2, Not in Batch", "label_es": "Incubación2, Pendiente Asignar Tanda"
              },
              "requiresGridItemSelected": true
            }
          },
          { "clientMethod": "filterSamples",
			"requiresDialog": false,
            "filterState": "in_batch_2",
            "button": {
              "icon": "radio_button_checked",
              "color": "SlateBlue",
              "title": {
                "label_en": "Incubation2, In Batch", "label_es": "Incubación2, En Tanda"
              },
              "requiresGridItemSelected": true
            }
          },
          { "clientMethod": "filterSamples",
			"requiresDialog": false,
            "filterState": "progress_2",
            "button": {
              "img": "incubators/IncubInProgress.gif",
              "title": {
                "label_en": "Incubation2 In-Progress", "label_es": "Incubación2 en curso"
              },
              "requiresGridItemSelected": true
            }
          },
          { "clientMethod": "filterSamples",
			"requiresDialog": false,
            "filterState": "all",
            "button": {
              "icon": "restart_alt",
              "color": "black",
              "title": {
                "label_en": "Reset", "label_es": "Reiniciar"
              },
              "requiresGridItemSelected": true
            }
          }
        ]
      }
  },
  "SampleIncubation120240827":{
    "component": "dragDropBoxes",    
    "viewQuery": {
      "actionName": "GET_PENDING_INCUBATION_SAMPLES_AND_ACTIVE_BATCHES",
      "endPointParams": [
        {
          "argumentName": "includeSplittedByIncubNumber",
          "fixValue": "true"
        }      
      ]
    },
    "forceAllowMoveObjectAsViewRule": true,
    "boxesTableKeyField":"name",
    "boxesTableColumns":{
      "endPointPropertyArray": ["active_batches"],
      "columns": [
        {
          "name": "allow_move_objects",
          "label_en": "",
          "label_es": "",
          "is_icon":true,
          "image_name":"ACTIVATE_DEACTIVATE",
          "icon_name": "allow_move_objects",
          "tooltip":{
            "text": "111 the box {fld:name} is {fld?allow_move_objects ? open : closed}",
            "text_en": "the box {fld:name} is {fld?allow_move_objects ? open : close} {fld?name:Box 1? 'result1' :Caja A' ? 'result2' : 'default'}",
            "text_es": "La caja {fld:name} está {fld?allow_move_objects ? abierta : cerrada}",
            "text1": "the box {fld:name} is {fld:allow_move_objects}"
          }
        },
        {
          "name": "name",
          "label_en": "name",
          "label_es": "name"
        },        
        {
          "name": "incubation_incubator",
          "label_en": "Incubator",
          "label_es": "Incubadora"
        },
        {
          "name": "incubation_start",
          "label_en": "Start",
          "label_es": "F. Iniciado"
        },
        {
          "name": "chrono",
          "fldForTimer":"incubation_start",
          "startWarning": "20",
          "startAlert": "40",
          "label_en": "Duration",
          "label_es": "Duración"
        },
        
        {
          "name": "counter",
          "propertyName": "SAMPLES_ARRAY",
          "label_en": "Num Samples",
          "label_es": "Num Muestras"
        }        
      ],
      "actions": [
        {
          "actionName": "EM_BATCH_INCUB_CREATE",
          "requiresDialog": true,
          "endPointUrl": "Programs",
          "button": {
            "title": {
              "label_en": "New Batch",
              "label_es": "Nuevo Lote"
            },
            "requiresGridItemSelected": false
          },
          "dialogInfo": {
            "name": "genericDialog",
            "fields": [
              {
                "text1": {
                  "label_en": "New Batch Name",
                  "label_es": "Nombre para nueva Tanda"
                }
              }
            ]
          },
          "endPointParams": [
            {
              "argumentName": "batchName",
              "element": "text1",
              "defaultValue": ""
            },
            {
              "argumentName": "batchTemplateId",
              "defaultValue": 1
            },
            {
              "argumentName": "batchTemplateVersion",
              "defaultValue": 1
            },
            {
              "argumentName": "incubStage",
              "fixValue": "1"
            }
          ]
        },
      ],
      "row_buttons":[
        {
          "actionName": "EM_BATCH_ASSIGN_INCUB",
          "buttonForQuery": false,
          "requiresDialog": true,
          "button": {
            "icon": "link",
            "title": {
              "label_en": "Assign Incubator",
              "label_es": "Asignar Incubadora"
            },
            "requiresGridItemSelected": false
          },
          "endPointParams": [
            {
              "argumentName": "batchName",
              "selObjectPropertyName": "name"
            },
            {
              "argumentName": "incubatorName",
              "selObjectPropertyName": "name",
              "getFromGrid": true
            },
            {
              "argumentName": "incubStage",
              "selObjectPropertyName": "stage",
              "getFromGrid": true
            }            
          ],
          "dialogInfo": {
            "name": "genericDialog",
            "gridContent": true,
            "masterDataEntryName": "instrument_incubator",
            "langConfig": {
              "gridHeader": [
                {
                  "fldName": "name",
                  "label_en": "Incubator",
                  "label_es": "Incubadora",
                  "width": "40%",
                  "sort": false,
                  "filter": true,
                  "align": "left"
                },
                {
                  "fldName": "description",
                  "label_en": "Description",
                  "label_es": "Descripción",
                  "width": "40%",
                  "sort": true,
                  "filter": false
                }
              ]
            },
            "automatic": true
          }
        },        
        {
          "actionName": "EM_BATCH_INCUB_START",
          "endPointUrl": "Programs",
          "requiresDialog": false,
          "button": {
            "icon": "play_circle",
            "title": {
              "label_en": "Start Incubator",
              "label_es": "Iniciar Incubadora"
            },
            "requiresGridItemSelected": false
          },          
          "endPointParams": [
            {
              "argumentName": "batchName",              
              "selObjectPropertyName": "name"
            },
            {
              "argumentName": "batchTemplateId",
              "selObjectPropertyName": "incub_batch_config_id" 
            },
            {
              "argumentName": "batchTemplateVersion",
              "selObjectPropertyName": "incub_batch_config_version"
            }
          ]          
        },
        {
          "actionName": "EM_BATCH_INCUB_END",
          "endPointUrl": "Programs",
          "requiresDialog": false,
          "button": {
            "icon": "stop_circle",
            "title": {              
              "label_en": "End Incubator",
              "label_es": "Termina incubadora"
            },
            "requiresGridItemSelected": false            
          },
          "endPointParams": [
            {
              "argumentName": "batchName",              
              "selObjectPropertyName": "name"
            },
            {
              "argumentName": "batchTemplateId",
              "selObjectPropertyName": "incub_batch_config_id" 
            },
            {
              "argumentName": "batchTemplateVersion",
              "selObjectPropertyName": "incub_batch_config_version"
            }
          ]
        }
      ]
    }, 
    "boxesContentColumns":{
      "endPointPropertyArray": "SAMPLES_ARRAY",
      "columns": [
        {
          "name": "sample_id",
          "label_en": "name",
          "label_es": "name"
        },
        {
          "name": "posX",
          "label_en": "posX",
          "label_es": "posX"
        },
        {
          "name": "incubation_start",
          "label_en": "incubation_start",
          "label_es": "incubation_start"
        }
      ]
    },    
    "objectsToDragColumns":{
      "endPointPropertyArray": ["incub_1"],
      "columns": [
        {
          "name": "sample_id",
          "label_en": "id",
          "label_es": "id"
        },
        {
          "name": "logged_on",
          "label_en": "Logged",
          "label_es": "Creada"
        },
        {
          "name": "location_name",
          "label_en": "Location",
          "label_es": "Ubicación"
        },
        {
          "name": "incubation_batch",
          "label_en": "Batch",
          "label_es": "Tanda"
        },        
        {
          "name": "incubation_incubator",
          "label_en": "Incubator",
          "label_es": "Incubadora"
        },
        {
          "name": "incubation_start",
          "label_en": "incubation_start",
          "label_es": "incubation_start"
        }
      ]
    },
    "dataIntegrityCheck":{
      "xdropingEntryRequiredProperties":["sample_id", "study", "temperaturezzz"],
      "xdropingEntryRequiredPropertiesAndMatchValues":[
        {"name": "id", "criteria":{"type": "values", "values": [1, 3]}},
        {"name": "id", "criteria":{"type": "range", "min": 1, "max": 4}},
      ],
      "xxdropingEntryRequiredPropertiesAndMatchValues":[
        {"name": "id", "criteria":{"type": "selectedBox_value", "selectedBoxPropName": "anyProperty"}}
      ]
    },      
    "boxPosicsViewNumColumnsForInfo": 2,
    "boxPosicsViews":[
      ["sample_id", "logged_on", "location_name"],
      ["sample_id", "logged_on", "location_name", "program_name", "area"],
      ["sample_id"]
    ],
    "dropAction": { 
      "actionName": "EM_BATCH_INCUB_ADD_SMP",
      "endPointUrl": "Samples",
      "requiresDialog": false,
      "button": {
        "title": {
          "label_en": "Add to Batch", "label_es": "Añadir a Tanda"
        },
        "requiresGridItemSelected": true,
      },
      "endPointParams": [ 
        { "argumentName": "sampleId", "dropElement": "sample_id" },
        { "argumentName": "batchTemplateId", "dragElement": "incub_batch_config_id" },
        { "argumentName": "batchTemplateVersion", "dragElement": "incub_batch_config_version" },
        { "argumentName": "batchName", "dragElement": "name" }			  
      ]
    },




    "view_definition": [
      {
        "type": "reportTitle",
        "title": {
          "label_en": "Samples 1st Incubation",
          "label_es": "1ª Incubación de Muestras"
        }
      },
      {
        "type": "parentReadOnlyTable",
        "endPointPropertyArray":["active_batches"],
        "allowMultiSelection": false,
        "refreshable": { "enable": true },
        "printable": { "enable": true },
        "downloadable": { "enable": true },
        "columns": [
          {
            "name": "name",
            "label_en": "Batch",
            "label_es": "Tanda"
          },
          {
            "name": "active",
            "label_en": "Active",
            "label_es": "Activo"
          },
          {
            "name": "completed",
            "label_en": "Completed",
            "label_es": "Completado"
          },
          {
            "name": "description",
            "label_en": "Description",
            "label_es": "Descripción"
          },
          {
            "name": "incub_stage",
            "label_en": "Incubation Stage",
            "label_es": "Etapa de Incubación"
          },
          {
            "name": "incubation_start",
            "label_en": "Start Date",
            "label_es": "Fecha de Inicio"
          },
          {
            "name": "incubation_end",
            "label_en": "End Date",
            "label_es": "Fecha de Finalización"
          },
          {
            "name": "incubation_incubator",
            "label_en": "Incubator",
            "label_es": "Incubadora"
          }
        ],
        "actions": [
          {
            "actionName": "EM_BATCH_INCUB_CREATE",
            "requiresDialog": true,
            "endPointUrl": "Programs",
            "button": {
              "title": {
                "label_en": "New Batch",
                "label_es": "Nuevo Lote"
              },
              "requiresGridItemSelected": false
            },
            "dialogInfo": {
              "name": "genericDialog",
              "fields": [
                {
                  "text1": {
                    "label_en": "New Batch Name",
                    "label_es": "Nombre para nueva Tanda"
                  }
                }
              ]
            },
            "endPointParams": [
              {
                "argumentName": "batchName",
                "element": "text1",
                "defaultValue": ""
              },
              {
                "argumentName": "batchTemplateId",
                "defaultValue": 1
              },
              {
                "argumentName": "batchTemplateVersion",
                "defaultValue": 1
              },
              {
                "argumentName": "incubStage",
                "fixValue": "1"
              }
            ]
          },
          {
            "actionName": "EM_BATCH_INCUB_REMOVE",
            "requiresDialog": false,
            "endPointUrl": "Programs",
            "button": {
              "title": {
                "label_en": "Delete Batch",
                "label_es": "Eliminar Lote"
              },
              "requiresGridItemSelected": true
            },
            "endPointParams": [
              {
                "argumentName": "batchName",
                "internalVariableObjName": "selectedBatches",
                "internalVariableObjProperty": "name"
              }
            ]
          },
          {
            "actionName": "EM_BATCH_ASSIGN_INCUB",
            "requiresDialog": true,
            "endPointUrl": "Programs",
            "clientMethod": "getAssign",
            "button": {
              "title": {
                "label_en": "Assign Incubator",
                "label_es": "Asignar Incubadora"
              },
              "requiresGridItemSelected": true,
              "alternativeItemPropertyName": "selectedBatches",
              "disabledBEState": "incubation_start"
            },
            "dialogQueries": [
              {
                "actionName": "GET_INCUBATORS_LIST",
                "endPoint": "/moduleenvmon/EnvMonIncubatorAPIqueries",
                "variableForData": "incubatorsList",
                "endPointParams": [
                  {
                    "argumentName": "incubStage",
                    "fixValue": "1"
                  }
                ]
              }
            ],
            "dialogInfo": {
              "name": "assignDialog",
              "automatic": true,
              "action": {
                "actionName": "EM_BATCH_ASSIGN_INCUB",
                "endPointUrl": "Batches",
                "endPointParams": [
                  {
                    "argumentName": "batchName",
                    "internalVariableObjName": "selectedBatches",
                    "internalVariableObjProperty": "name"
                  },
                  {
                    "argumentName": "incubatorName",
                    "targetValue": true
                  },
                  {
                    "argumentName": "incubStage",
                    "targetValue": true
                  }
                ]
              }
            }
          },
          {
            "actionName": "EM_BATCH_INCUB_START",
            "endPointUrl": "Programs",
            "requiresDialog": false,
            "button": {
              "title": {
                "label_en": "Start Incubator",
                "label_es": "Iniciar Incubadora"
              },
              "requiresGridItemSelected": true,
              "alternativeItemPropertyName": "selectedBatches",
              "disabledBEState": "incubation_start"
            },
            "endPointParams": [
              {
                "argumentName": "batchName",
                "internalVariableObjName": "selectedBatches",
                "internalVariableObjProperty": "name"
              },
              {
                "argumentName": "batchTemplateId",
                "defaultValue": 1
              },
              {
                "argumentName": "batchTemplateVersion",
                "defaultValue": 1
              }
            ]
          },
          {
            "actionName": "EM_BATCH_INCUB_END",
            "endPointUrl": "Programs",
            "requiresDialog": false,
            "button": {
              "title": {
                "label_en": "End Incubator",
                "label_es": "Termina incubadora"
              },
              "requiresGridItemSelected": true,
              "alternativeItemPropertyName": "selectedBatches"
            },
            "endPointParams": [
              {
                "argumentName": "batchName",
                "internalVariableObjName": "selectedBatches",
                "internalVariableObjProperty": "name"
              },
              {
                "argumentName": "batchTemplateId",
                "defaultValue": 1
              },
              {
                "argumentName": "batchTemplateVersion",
                "defaultValue": 1
              }
            ]
          },
          {
            "actionName": "SAMPLESTAGE_MOVETONEXT",
            "endPointUrl": "Samples",
            "requiresDialog": false,
            "button": {
              "icon": "skip_next",
              "color": "red",
              "title": {
                "label_en": "Sample Stuck",
                "label_es": "Muestra Atascada",
                "extra": "stuckNum"
              },
              "requiresGridItemSelected": true,
              "alternativeItemPropertyName": "selectedSamples",
              "whenHidden": "stucksList"
            },
            "dialogInfo": {
              "requiresDialog": true,
              "name": "sampleStuckDialog"
            },
            "endPointParams": [
              {
                "argumentName": "sampleId",
                "internalVariableObjName": "selectedSamples",
                "internalVariableObjProperty": "sample_id"
              }
            ]
          },
          {
            "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
            "requiresDialog": false,
            "endPointUrl": "Samples",
            "button": {
              "class": "reverse",
              "icon": "skip_previous",
              "title": {
                "label_en": "Previous",
                "label_es": "Previo"
              },
              "requiresGridItemSelected": true
            },
            "endPointParams": [
              {
                "argumentName": "sampleId",
                "internalVariableObjName": "selectedSamples",
                "internalVariableObjProperty": "sample_id"
              }
            ]
          },
          {
            "actionName": "GET_SAMPLE"
          }
        ]
      },    
      {
        "type": "parentReadOnlyTable",
        "endPointPropertyArray":["incub_1"],
        "allowMultiSelection": false,
        "refreshable": { "enable": true },
        "printable": { "enable": true },
        "downloadable": { "enable": true },
        "columns": [
          {
            "name": "sample_id",
            "label_en": "Plate",
            "label_es": "Placa"
          },
          {
            "name": "active",
            "label_en": "Active",
            "label_es": "Activo"
          },
          {
            "name": "completed",
            "label_en": "Completed",
            "label_es": "Completado"
          },
          {
            "name": "description",
            "label_en": "Description",
            "label_es": "Descripción"
          },
          {
            "name": "incub_stage",
            "label_en": "Incubation Stage",
            "label_es": "Etapa de Incubación"
          },
          {
            "name": "incubation_start",
            "label_en": "Start Date",
            "label_es": "Fecha de Inicio"
          },
          {
            "name": "incubation_end",
            "label_en": "End Date",
            "label_es": "Fecha de Finalización"
          },
          {
            "name": "incubation_incubator",
            "label_en": "Incubator",
            "label_es": "Incubadora"
          }
        ],
        "actions": [
          {
            "actionName": "EM_BATCH_INCUB_CREATE",
            "requiresDialog": true,
            "endPointUrl": "Programs",
            "button": {
              "title": {
                "label_en": "New Batch",
                "label_es": "Nuevo Lote"
              },
              "requiresGridItemSelected": false
            },
            "dialogInfo": {
              "name": "genericDialog",
              "fields": [
                {
                  "text1": {
                    "label_en": "New Batch Name",
                    "label_es": "Nombre para nueva Tanda"
                  }
                }
              ]
            },
            "endPointParams": [
              {
                "argumentName": "batchName",
                "element": "text1",
                "defaultValue": ""
              },
              {
                "argumentName": "batchTemplateId",
                "defaultValue": 1
              },
              {
                "argumentName": "batchTemplateVersion",
                "defaultValue": 1
              },
              {
                "argumentName": "incubStage",
                "fixValue": "1"
              }
            ]
          },
          {
            "actionName": "EM_BATCH_INCUB_REMOVE",
            "requiresDialog": false,
            "endPointUrl": "Programs",
            "button": {
              "title": {
                "label_en": "Delete Batch",
                "label_es": "Eliminar Lote"
              },
              "requiresGridItemSelected": true
            },
            "endPointParams": [
              {
                "argumentName": "batchName",
                "internalVariableObjName": "selectedBatches",
                "internalVariableObjProperty": "name"
              }
            ]
          },
          {
            "actionName": "EM_BATCH_ASSIGN_INCUB",
            "requiresDialog": true,
            "endPointUrl": "Programs",
            "clientMethod": "getAssign",
            "button": {
              "title": {
                "label_en": "Assign Incubator",
                "label_es": "Asignar Incubadora"
              },
              "requiresGridItemSelected": true,
              "alternativeItemPropertyName": "selectedBatches",
              "disabledBEState": "incubation_start"
            },
            "dialogQueries": [
              {
                "actionName": "GET_INCUBATORS_LIST",
                "endPoint": "/moduleenvmon/EnvMonIncubatorAPIqueries",
                "variableForData": "incubatorsList",
                "endPointParams": [
                  {
                    "argumentName": "incubStage",
                    "fixValue": "1"
                  }
                ]
              }
            ],
            "dialogInfo": {
              "name": "assignDialog",
              "automatic": true,
              "action": {
                "actionName": "EM_BATCH_ASSIGN_INCUB",
                "endPointUrl": "Batches",
                "endPointParams": [
                  {
                    "argumentName": "batchName",
                    "internalVariableObjName": "selectedBatches",
                    "internalVariableObjProperty": "name"
                  },
                  {
                    "argumentName": "incubatorName",
                    "targetValue": true
                  },
                  {
                    "argumentName": "incubStage",
                    "targetValue": true
                  }
                ]
              }
            }
          },
          {
            "actionName": "EM_BATCH_INCUB_START",
            "endPointUrl": "Programs",
            "requiresDialog": false,
            "button": {
              "title": {
                "label_en": "Start Incubator",
                "label_es": "Iniciar Incubadora"
              },
              "requiresGridItemSelected": true,
              "alternativeItemPropertyName": "selectedBatches",
              "disabledBEState": "incubation_start"
            },
            "endPointParams": [
              {
                "argumentName": "batchName",
                "internalVariableObjName": "selectedBatches",
                "internalVariableObjProperty": "name"
              },
              {
                "argumentName": "batchTemplateId",
                "defaultValue": 1
              },
              {
                "argumentName": "batchTemplateVersion",
                "defaultValue": 1
              }
            ]
          },
          {
            "actionName": "EM_BATCH_INCUB_END",
            "endPointUrl": "Programs",
            "requiresDialog": false,
            "button": {
              "title": {
                "label_en": "End Incubator",
                "label_es": "Termina incubadora"
              },
              "requiresGridItemSelected": true,
              "alternativeItemPropertyName": "selectedBatches"
            },
            "endPointParams": [
              {
                "argumentName": "batchName",
                "internalVariableObjName": "selectedBatches",
                "internalVariableObjProperty": "name"
              },
              {
                "argumentName": "batchTemplateId",
                "defaultValue": 1
              },
              {
                "argumentName": "batchTemplateVersion",
                "defaultValue": 1
              }
            ]
          },
          {
            "actionName": "SAMPLESTAGE_MOVETONEXT",
            "endPointUrl": "Samples",
            "requiresDialog": false,
            "button": {
              "icon": "skip_next",
              "color": "red",
              "title": {
                "label_en": "Sample Stuck",
                "label_es": "Muestra Atascada",
                "extra": "stuckNum"
              },
              "requiresGridItemSelected": true,
              "alternativeItemPropertyName": "selectedSamples",
              "whenHidden": "stucksList"
            },
            "dialogInfo": {
              "requiresDialog": true,
              "name": "sampleStuckDialog"
            },
            "endPointParams": [
              {
                "argumentName": "sampleId",
                "internalVariableObjName": "selectedSamples",
                "internalVariableObjProperty": "sample_id"
              }
            ]
          },
          {
            "actionName": "SAMPLESTAGE_MOVETOPREVIOUS",
            "requiresDialog": false,
            "endPointUrl": "Samples",
            "button": {
              "class": "reverse",
              "icon": "skip_previous",
              "title": {
                "label_en": "Previous",
                "label_es": "Previo"
              },
              "requiresGridItemSelected": true
            },
            "endPointParams": [
              {
                "argumentName": "sampleId",
                "internalVariableObjName": "selectedSamples",
                "internalVariableObjProperty": "sample_id"
              }
            ]
          },
          {
            "actionName": "GET_SAMPLE"
          }
        ]
      }
    ]
  },  
  "SampleIncubation2":{
    "component": "dragDropBoxes",    
    "viewQuery": {
      "actionName": "GET_PENDING_INCUBATION_SAMPLES_AND_ACTIVE_BATCHES",
      "endPointParams": [
        {
          "argumentName": "includeSplittedByIncubNumber",
          "fixValue": "true"
        },
        {
          "argumentName": "whereFieldsName",
          "fixValue": "incub_stage"
         
        },
        {
          "argumentName": "whereFieldsValue",
          "fixValue": "2"         
        }        
      ]
    },
    "forceAllowMoveObjectAsViewRule": true,
    "boxesTableKeyField":"name",
    "boxesTableColumns":{
      "endPointPropertyArray": ["active_batches"],
      "columns": [
        {
          "name": "allow_move_objects",
          "label_en": "",
          "label_es": "",
          "is_icon":true,
          "image_name":"ACTIVATE_DEACTIVATE",
          "icon_name": "allow_move_objects",
          "tooltip":{
            "text": "111 the box {fld:name} is {fld?allow_move_objects ? open : closed}",
            "text_en": "the box {fld:name} is {fld?allow_move_objects ? open : close} {fld?name:Box 1? 'result1' :Caja A' ? 'result2' : 'default'}",
            "text_es": "La caja {fld:name} está {fld?allow_move_objects ? abierta : cerrada}",
            "text1": "the box {fld:name} is {fld:allow_move_objects}"
          }
        },
        {
          "name": "name",
          "label_en": "name",
          "label_es": "name"
        },        
        {
          "name": "incubation_incubator",
          "label_en": "Incubator",
          "label_es": "Incubadora"
        },
        {
          "name": "incubation_start",
          "label_en": "Start",
          "label_es": "F. Iniciado"
        },
        {
          "name": "chrono",
          "fldForTimer":"incubation_start",
          "startWarning": "20",
          "startAlert": "40",
          "label_en": "Duration",
          "label_es": "Duración"
        },
        
        {
          "name": "counter",
          "propertyName": "SAMPLES_ARRAY",
          "label_en": "Num Samples",
          "label_es": "Num Muestras"
        }        
      ],
      "actions": [
        {
          "actionName": "EM_BATCH_INCUB_CREATE",
          "requiresDialog": true,
          "endPointUrl": "Programs",
          "button": {
            "icon": "create_new_folder",
            "title": {
              "label_en": "New Batch",
              "label_es": "Nuevo Lote"
            },
            "requiresGridItemSelected": false
          },
          "dialogInfo": {
            "name": "genericDialog",
            "fields": [
              {
                "text1": {
                  "label_en": "New Batch Name",
                  "label_es": "Nombre para nueva Tanda"
                }
              }
            ]
          },
          "endPointParams": [
            {
              "argumentName": "batchName",
              "element": "text1",
              "defaultValue": ""
            },
            {
              "argumentName": "batchTemplateId",
              "defaultValue": 1
            },
            {
              "argumentName": "batchTemplateVersion",
              "defaultValue": 1
            },
            {
              "argumentName": "incubStage",
              "fixValue": "2"
            }
          ]
        }
      ],
      "row_buttons":[
        {
          "actionName": "EM_BATCH_ASSIGN_INCUB",
          "buttonForQuery": false,
          "requiresDialog": true,
          "button": {
            "icon": "link",
            "title": {
              "label_en": "Assign Incubator",
              "label_es": "Asignar Incubadora"
            },
            "requiresGridItemSelected": false
          },
          "endPointParams": [
            {
              "argumentName": "batchName",
              "selObjectPropertyName": "name"
            },
            {
              "argumentName": "incubatorName",
              "selObjectPropertyName": "name",
              "getFromGrid": true
            },
            {
              "argumentName": "incubStage",
              "selObjectPropertyName": "stage",
              "getFromGrid": true
            }            
          ],
          "dialogInfo": {
            "name": "genericDialog",
            "gridContent": true,
            "masterDataEntryName": "instrument_incubator",
            "masterDataFilterPropertyName": "stage",
            "masterDataFilterPropertyValue": "2",
            "langConfig": {
              "gridHeader": [
                {
                  "fldName": "name",
                  "label_en": "Incubator",
                  "label_es": "Incubadora",
                  "width": "40%",
                  "sort": false,
                  "filter": true,
                  "align": "left"
                },
                {
                  "fldName": "description",
                  "label_en": "Description",
                  "label_es": "Descripción",
                  "width": "40%",
                  "sort": true,
                  "filter": false
                }
              ]
            },
            "automatic": true
          }
        },        
        {
          "actionName": "EM_BATCH_INCUB_START",
          "endPointUrl": "Programs",
          "requiresDialog": false,
          "button": {
            "icon": "play_circle",
            "title": {
              "label_en": "Start Incubator",
              "label_es": "Iniciar Incubadora"
            },
            "requiresGridItemSelected": false
          },          
          "endPointParams": [
            {
              "argumentName": "batchName",              
              "selObjectPropertyName": "name"
            },
            {
              "argumentName": "batchTemplateId",
              "selObjectPropertyName": "incub_batch_config_id" 
            },
            {
              "argumentName": "batchTemplateVersion",
              "selObjectPropertyName": "incub_batch_config_version"
            }
          ]          
        },
        {
          "actionName": "EM_BATCH_INCUB_END",
          "endPointUrl": "Programs",
          "requiresDialog": false,
          "button": {
            "icon": "stop_circle",
            "title": {              
              "label_en": "End Incubator",
              "label_es": "Termina incubadora"
            },
            "requiresGridItemSelected": false            
          },
          "endPointParams": [
            {
              "argumentName": "batchName",              
              "selObjectPropertyName": "name"
            },
            {
              "argumentName": "batchTemplateId",
              "selObjectPropertyName": "incub_batch_config_id" 
            },
            {
              "argumentName": "batchTemplateVersion",
              "selObjectPropertyName": "incub_batch_config_version"
            }
          ]
        }
      ]
    }, 
    "boxesContentColumns":{
      "endPointPropertyArray": "SAMPLES_ARRAY",
      "columns": [
        {
          "name": "sample_id",
          "label_en": "name",
          "label_es": "name"
        },
        {
          "name": "posX",
          "label_en": "posX",
          "label_es": "posX"
        },
        {
          "name": "incubation_start",
          "label_en": "incubation_start",
          "label_es": "incubation_start"
        }
      ]
    },    
    "objectsToDragColumns":{
      "endPointPropertyArray": ["incub_2"],
      "columns": [
        {
          "name": "sample_id",
          "label_en": "id",
          "label_es": "id"
        },
        {
          "name": "logged_on",
          "label_en": "Logged",
          "label_es": "Creada"
        },
        {
          "name": "location_name",
          "label_en": "Location",
          "label_es": "Ubicación"
        },
        {
            "name": "incubation2_start",
            "label_en": "2nd Start Date",
            "label_es": "2ª Fecha de Inicio"
          },
          {
            "name": "incubation2_end",
            "label_en": "2nd End Date",
            "label_es": "2ª Fecha de Finalización"
          },
          {
            "name": "incubation2_incubator",
            "label_en": "2nd Incubator",
            "label_es": "2ª Incubadora"
          },
          {
            "name": "incubation_start",
            "label_en": "1st Start Date",
            "label_es": "1ª Fecha de Inicio"
          },
          {
            "name": "incubation_end",
            "label_en": "1st End Date",
            "label_es": "1ª Fecha de Finalización"
          },
          {
            "name": "incubation_incubator",
            "label_en": "1st Incubator",
            "label_es": "1ª Incubadora"
          }
      ]
    },
    "dataIntegrityCheck":{
      "xdropingEntryRequiredProperties":["sample_id", "study", "temperaturezzz"],
      "xdropingEntryRequiredPropertiesAndMatchValues":[
        {"name": "id", "criteria":{"type": "values", "values": [1, 3]}},
        {"name": "id", "criteria":{"type": "range", "min": 1, "max": 4}}
      ],
      "xxdropingEntryRequiredPropertiesAndMatchValues":[
        {"name": "id", "criteria":{"type": "selectedBox_value", "selectedBoxPropName": "anyProperty"}}
      ]
    },      
    "boxPosicsViewNumColumnsForInfo": 2,
    "boxPosicsViews":[
      ["sample_id", "logged_on", "location_name"],
      ["sample_id", "logged_on", "location_name", "program_name", "area"],
      ["sample_id"]
    ],
    "dropAction": { 
      "actionName": "EM_BATCH_INCUB_ADD_SMP",
      "endPointUrl": "Samples",
      "requiresDialog": false,
      "button": {
        "title": {
          "label_en": "Add to Batch", "label_es": "Añadir a Tanda"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": [ 
        { "argumentName": "sampleId", "dropElement": "sample_id" },
        { "argumentName": "batchTemplateId", "dragElement": "incub_batch_config_id" },
        { "argumentName": "batchTemplateVersion", "dragElement": "incub_batch_config_version" },
        { "argumentName": "batchName", "dragElement": "name" }			  
      ]
    }
},
"SampleIncubation1":{
  "component": "dragDropBoxes",    
  "viewQuery": {
    "actionName": "GET_PENDING_INCUBATION_SAMPLES_AND_ACTIVE_BATCHES",
    "endPointParams": [
      {
        "argumentName": "includeSplittedByIncubNumber",
        "fixValue": "true"
      },
      {
        "argumentName": "whereFieldsName",
        "fixValue": "incub_stage"
       
      },
      {
        "argumentName": "whereFieldsValue",
        "fixValue": "1"         
      }        
    ]
  },
  "forceAllowMoveObjectAsViewRule": true,
  "boxesTableKeyField":"name",
  "boxesTableColumns":{
    "endPointPropertyArray": ["active_batches"],
    "columns": [
      {
        "name": "allow_move_objects",
        "label_en": "",
        "label_es": "",
        "is_icon":true,
        "image_name":"ACTIVATE_DEACTIVATE",
        "icon_name": "allow_move_objects",
        "tooltip":{
          "text": "111 the box {fld:name} is {fld?allow_move_objects ? open : closed}",
          "text_en": "the box {fld:name} is {fld?allow_move_objects ? open : close} {fld?name:Box 1? 'result1' :Caja A' ? 'result2' : 'default'}",
          "text_es": "La caja {fld:name} está {fld?allow_move_objects ? abierta : cerrada}",
          "text1": "the box {fld:name} is {fld:allow_move_objects}"
        }
      },
      {
        "name": "name",
        "label_en": "name",
        "label_es": "name"
      },        
      {
        "name": "incubation_incubator",
        "label_en": "Incubator",
        "label_es": "Incubadora"
      },
      {
        "name": "incubation_start",
        "label_en": "Start",
        "label_es": "F. Iniciado"
      },
      {
        "name": "chrono",
        "fldForTimer":"incubation_start",
        "startWarning": "20",
        "startAlert": "40",
        "label_en": "Duration",
        "label_es": "Duración"
      },
      
      {
        "name": "counter",
        "propertyName": "SAMPLES_ARRAY",
        "label_en": "Num Samples",
        "label_es": "Num Muestras"
      }        
    ],
    "actions": [
      {
        "actionName": "EM_BATCH_INCUB_CREATE",
        "requiresDialog": true,
        "endPointUrl": "Programs",
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New Batch",
            "label_es": "Nuevo Lote"
          },
          "requiresGridItemSelected": false
        },
        "dialogInfo": {
          "name": "genericDialog",
          "fields": [
            {
              "text1": {
                "label_en": "New Batch Name",
                "label_es": "Nombre para nueva Tanda"
              }
            }
          ]
        },
        "endPointParams": [
          {
            "argumentName": "batchName",
            "element": "text1",
            "defaultValue": ""
          },
          {
            "argumentName": "batchTemplateId",
            "defaultValue": 1
          },
          {
            "argumentName": "batchTemplateVersion",
            "defaultValue": 1
          },
          {
            "argumentName": "incubStage",
            "fixValue": "1"
          }
        ]
      }
    ],
    "row_buttons":[
      {
        "actionName": "EM_BATCH_ASSIGN_INCUB",
        "buttonForQuery": false,
        "requiresDialog": true,
        "button": {
          "icon": "link",
          "title": {
            "label_en": "Assign Incubator",
            "label_es": "Asignar Incubadora"
          },
          "requiresGridItemSelected": false
        },
        "endPointParams": [
          {
            "argumentName": "batchName",
            "selObjectPropertyName": "name"
          },
          {
            "argumentName": "incubatorName",
            "selObjectPropertyName": "name",
            "getFromGrid": true
          },
          {
            "argumentName": "incubStage",
            "selObjectPropertyName": "stage",
            "getFromGrid": true
          }            
        ],
        "dialogInfo": {
          "name": "genericDialog",
          "gridContent": true,
          "masterDataEntryName": "instrument_incubator",
          "masterDataFilterPropertyName": "stage",
          "masterDataFilterPropertyValue": "1",
          "langConfig": {
            "gridHeader": [
              {
                "fldName": "name",
                "label_en": "Incubator",
                "label_es": "Incubadora",
                "width": "40%",
                "sort": false,
                "filter": true,
                "align": "left"
              },
              {
                "fldName": "description",
                "label_en": "Description",
                "label_es": "Descripción",
                "width": "40%",
                "sort": true,
                "filter": false
              }
            ]
          },
          "automatic": true
        }
      },        
      {
        "actionName": "EM_BATCH_INCUB_START",
        "endPointUrl": "Programs",
        "requiresDialog": false,
        "button": {
          "icon": "play_circle",
          "title": {
            "label_en": "Start Incubator",
            "label_es": "Iniciar Incubadora"
          },
          "requiresGridItemSelected": false
        },          
        "endPointParams": [
          {
            "argumentName": "batchName",              
            "selObjectPropertyName": "name"
          },
          {
            "argumentName": "batchTemplateId",
            "selObjectPropertyName": "incub_batch_config_id" 
          },
          {
            "argumentName": "batchTemplateVersion",
            "selObjectPropertyName": "incub_batch_config_version"
          }
        ]          
      },
      {
        "actionName": "EM_BATCH_INCUB_END",
        "endPointUrl": "Programs",
        "requiresDialog": false,
        "button": {
          "icon": "stop_circle",
          "title": {              
            "label_en": "End Incubator",
            "label_es": "Termina incubadora"
          },
          "requiresGridItemSelected": false            
        },
        "endPointParams": [
          {
            "argumentName": "batchName",              
            "selObjectPropertyName": "name"
          },
          {
            "argumentName": "batchTemplateId",
            "selObjectPropertyName": "incub_batch_config_id" 
          },
          {
            "argumentName": "batchTemplateVersion",
            "selObjectPropertyName": "incub_batch_config_version"
          }
        ]
      }
    ]
  }, 
  "boxesContentColumns":{
    "endPointPropertyArray": "SAMPLES_ARRAY",
    "columns": [
      {
        "name": "sample_id",
        "label_en": "name",
        "label_es": "name"
      },
      {
        "name": "posX",
        "label_en": "posX",
        "label_es": "posX"
      },
      {
        "name": "incubation_start",
        "label_en": "incubation_start",
        "label_es": "incubation_start"
      }
    ]
  },    
  "objectsToDragColumns":{
    "endPointPropertyArray": ["incub_1"],
    "columns": [
      {
        "name": "sample_id",
        "label_en": "id",
        "label_es": "id"
      },
      {
        "name": "logged_on",
        "label_en": "Logged",
        "label_es": "Creada"
      },
      {
        "name": "location_name",
        "label_en": "Location",
        "label_es": "Ubicación"
      },
      {
          "name": "incubation_start",
          "label_en": "1st Start Date",
          "label_es": "1ª Fecha de Inicio"
        },
        {
          "name": "incubation_end",
          "label_en": "1st End Date",
          "label_es": "1ª Fecha de Finalización"
        },
        {
          "name": "incubation_incubator",
          "label_en": "1st Incubator",
          "label_es": "1ª Incubadora"
        },
        {
          "name": "incubation2_start",
          "label_en": "2nd Start Date",
          "label_es": "2ª Fecha de Inicio"
        },
        {
          "name": "incubation2_end",
          "label_en": "2nd End Date",
          "label_es": "2ª Fecha de Finalización"
        },
        {
          "name": "incubation2_incubator",
          "label_en": "2nd Incubator",
          "label_es": "2ª Incubadora"
        }
        
    ]
  },
  "dataIntegrityCheck":{
    "xdropingEntryRequiredProperties":["sample_id", "study", "temperaturezzz"],
    "xdropingEntryRequiredPropertiesAndMatchValues":[
      {"name": "id", "criteria":{"type": "values", "values": [1, 3]}},
      {"name": "id", "criteria":{"type": "range", "min": 1, "max": 4}}
    ],
    "xxdropingEntryRequiredPropertiesAndMatchValues":[
      {"name": "id", "criteria":{"type": "selectedBox_value", "selectedBoxPropName": "anyProperty"}}
    ]
  },      
  "boxPosicsViewNumColumnsForInfo": 2,
  "boxPosicsViews":[
    ["sample_id", "logged_on", "location_name"],
    ["sample_id", "logged_on", "location_name", "program_name", "area"],
    ["sample_id"]
  ],
  "dropAction": { 
    "actionName": "EM_BATCH_INCUB_ADD_SMP",
    "endPointUrl": "Samples",
    "requiresDialog": false,
    "button": {
      "title": {
        "label_en": "Add to Batch", "label_es": "Añadir a Tanda"
      },
      "requiresGridItemSelected": true
    },
    "endPointParams": [ 
      { "argumentName": "sampleId", "dropElement": "sample_id" },
      { "argumentName": "batchTemplateId", "dragElement": "incub_batch_config_id" },
      { "argumentName": "batchTemplateVersion", "dragElement": "incub_batch_config_version" },
      { "argumentName": "batchName", "dragElement": "name" }			  
    ]
  }
},
  "Programs":{
    "component": "ObjectByTabs",
    "hasOwnComponent": true,
    "showTitleOnTop": true,
    "title": {
      "fix_text_en": "All my projects",
      "fix_text_es": "Todos mis proyectos",
      "name": "name"
    },
    "viewQuery": {
      "actionName": "PROGRAMS_LIST",
      "notUseGrid": true,
      "responseArray": true,
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": false
      },
      "endPointParams": [
        {
          "argumentName": "name",
          "internalVariableSimpleObjName": "filterCurrentData",
          "internalVariableSimpleObjProperty": "filtertext1"
        },
        {
          "argumentName": "type",
          "fixValue": "Product Development"
        }
      ]
    },
    "left_panel": {
      "actions": []
    },
    "filter_button": {
      "label_en": "Search",
      "label_es": "Buscar"
    },
    "filter": [
      {
        "filtertext1": {
          "label_en": "Project",
          "label_es": "Proyecto",
          "fixValue": "ALL"
        }
      }
    ],
    "filterResultDetail": {
      "type": "list",
      "detail": [
        {
          "field": "name"
        }
      ]
    },
    "actions": [],
    "tabs": [
      {
        "tabLabel_en": "Calendar",
        "tabLabel_es": "Calendario",
        "view_definition": [
          {
            "type": "Calendar",
           
            "calendarConfig":{
              "endPointResponseObject": "program_calendar",
              "actions":[
                {
                  "actionName": "PROGRAM_ADD_HOLIDAYS_CALENDAR",
                  "buttonForQuery": false,
                  "requiresDialog": true,
                  "button": {
                    "icon": "add_task",
                    "title": {
                      "label_en": "Add Holidays Calendar",
                      "label_es": "Añadir Calendario de Festivos"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "programName",
                      "selObjectPropertyName": "name"
                    },
                    {
                      "argumentName": "holidayCalendarCode",
                      "element": "text1"
                    }
                  ],
                  "dialogInfo": {
                    "name": "genericDialog",
                    "gridContent": false,
                    "xmasterDataEntryName": "analysis_method",
                    "langConfig": {
                      "gridHeader": [
                        {
                          "fldName": "analysis",
                          "label_en": "Analysis",
                          "label_es": "Ensayo",
                          "width": "40%",
                          "sort": false,
                          "filter": true,
                          "align": "left"
                        },
                        {
                          "fldName": "method_name",
                          "label_en": "Method",
                          "label_es": "Método",
                          "width": "40%",
                          "sort": true,
                          "filter": false
                        },
                        {
                          "fldName": "method_version",
                          "label_en": "Version",
                          "label_es": "Versión",
                          "width": "20%",
                          "sort": true,
                          "filter": false
                        }
                      ]
                    },
                    "fields": [   
                      {"text1": { "label_en":"Code", "label_es":"Código", "selObjectPropertyName": "name" }}
                    ],
                    "automatic": true
                  }
                },
                {
                  "actionName": "PROGRAM_ADD_RECURSIVE_DATES",
                  "buttonForQuery": false,
                  "requiresDialog": true,
                  "button": {
                    "icon": "add_task",
                    "title": {
                      "label_en": "Add recursive dates",
                      "label_es": "Añadir fechas recursivas"
                    },
                    "requiresGridItemSelected": false
                  },
                  "endPointParams": [
                    {
                      "argumentName": "programName",
                      "selObjectPropertyName": "name"
                    },
                    {
                      "argumentName": "ruleName",
                      "fixValue": "datesList"
                    },
                    {
                      "argumentName": "datesList",
                      "targetValue": "datesList"
                    }
                  ],
                  "dialogInfo": {
                    "name": "miniMapDialog",
                    "gridContent": false,
                    "xmasterDataEntryName": "analysis_method",
                    "automatic": true
                  }
                }                                    
              ],               
              "dayView":{
                "startHour":6,
                "endHour":18,
                "eventListsFields":[
                  {"field": "location_name", "label_en": "Location", "label_es": "Ubicación"},
                  {"field": "sample_id", "label_en": "Sample", "label_es": "Muestra"},
                  {"field": "source", "label_en": "Source", "label_es": "Origen"}
                ]
              },
              "yearView":{
                "hideOutOfBoundsMonths": true,
                "eventListsFields":[
                  {"field": "location_name", "label_en": "Location", "label_es": "Ubicación"},
                  {"field": "sample_id", "label_en": "Samplessss", "label_es": "Muestra"},
                  {"field": "source", "label_en": "Source", "label_es": "Origen"}
                ]
              }
            },
            "eventsConfig":{
              "endPointResponseObject": "config_scheduled_calendar",
              "datesDateField":"date",
              "eventListsFields":[
                {"field": "location_name", "label_en": "Location", "label_es": "Ubicación"},
                {"field": "spec_variation_name", "label_en": "Grade", "label_es": "Grado"},
                {"field": "sample_id", "label_en": "Sample", "label_es": "Muestra"},
                {"field": "source", "label_en": "Source", "label_es": "Origen"}
              ],
              "hoverDateDialog":{
                "entryTitleFld":"location_name",
                "eventListsFields":[
                  {"field": "location_name", "label_en": "Location", "label_es": "Ubicación"},
                  {"field": "spec_variation_name", "label_en": "Grade", "label_es": "Grado"},
                  {"field": "sample_id", "label_en": "Sample", "label_es": "Muestra"},
                  {"field": "source", "label_en": "Source", "label_es": "Origen"}
                ],  
                "dialogWidth": "500px", 
                "dialogHeight": "300px" 
              }                           
            },
            "smartFilter": true
          }
        ]
      },      
      {
        "tabLabel_en": "Summary",
        "tabLabel_es": "Resumen",
        "view_definition": [
          {
            "type": "calendarMonthlyEvents"

          },
          {
            "type": "zzzchart", 
            "endPointPropertyArray":["ROOT"],
            "elementName": "samples_summary_by_stage",

            "display_chart": true,
            "chart_type":"pie",
            "chart_name":"samples_summary_by_stage",
            "chart_title":{"label_en": "Samples by stage", "label_es":"Muestras por etapa"},
            "counter_field_name":"Counter",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#dfa942", "#d33737", "#bf120f"]              
            },
            "grouper_field_name":"samples_summary_by_stage",
            "label_values_replacement":{
              "IN":{"label_es": "In Range", "label_en": "Dentro de Range"},
              "inAlertMax": {"label_es": "Por Encima del límite de alerta", "label_en": "Over the Alert limit"},
              "outOfSpecMax": {"label_es": "Fuera de Rango", "label_en": "Over the Range"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          }          
        ]
      },
      {
        "tabLabel_en": "Specification",
        "tabLabel_es": "Especificación",
        "view_definition": [
          {
            "type": "readOnlyTable",
            "endPointPropertyArray": ["spec_definition", "spec_limits"],
            "columns": [
              {
                "name": "parameter",
                "label_en": "Parameter",
                "label_es": "Parámetro"
              },
              {
                "name": "variation_name",
                "label_en": "Grade",
                "label_es": "Grado"
              },
              {
                "name": "pretty_spec",
                "label_en": "Range",
                "label_es": "Rango"
              }
            ],
            "xactions": [],
            "xrow_buttons": []
          }          
        ]
      },

      {
        "tabLabel_en": "Sampling Points",
        "tabLabel_es": "Puntos de Muestreo",
        "view_definition": [
          {"type": "reportTitle", 
            "title":{
              "label_en": "Program Sampling Points", 
              "label_es": "Puntos de muestro del programa"
            }
          },   
          {"type": "parentReadOnlyTable",  
            "allowMultiSelection": false, 
            "refreshable":{ "enable": true}, 
            "printable":{ "enable": true}, 
            "downloadable":{"enable": true, "allowUserSelectColumns": true}, 
            "endPointPropertyArray": ["sample_points"],		              
            "columns" : [                                
                {"name":"location_name", "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "20%"},
                {"name":"spec_code", "label_en": "Spec", "label_es": "Especificación", "sort": false, "filter": true, "width": "20%"},
                {"name":"spec_variation_name", "label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true, "width": "20%"},
                {"name":"spec_analysis_variation", "label_en": "Analysis Variation", "label_es": "Análisis de Variación", "sort": false, "filter": true, "width": "20%"},
                {"name":"person_ana_definition", "label_en": "Person Sampling Areas", "label_es": "Areas a analizar de Personal", "sort": false, "filter": true, "width": "40%"},
                {"name":"requires_tracking_sampling_end", "label_en": "Sampling Static?", "label_es": "Muestreo Estático?", "sort": false, "filter": true, "width": "40%"}                   
            ],             
            "actions": [
              {
                "actionName": "LOGSAMPLE",
                "requiresGridItemSelected": true,
                "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                "requiresDialog": true,
                "button": {
                  "icon": "add_location",
                  "title": {
                    "label_en": "Log samples",
                    "label_es": "Registrar muestras"
                  }
                },
                "xclientMethod": "logSampleDialog",
                "dialogQueries":[
                  {	"actionName": "GET_ACTIVE_PRODUCTION_LOTS",				
                    "endPoint": "/moduleenvmon/EnvMonAPIqueries",
                    "variableForData": "prodLotList"		  
                  }
                ],  
                "endPointParams": [
                  { "argumentName": "programName", "selObjectPropertyName": "program_name" },
                  { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
                  { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
                  { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
                  { "argumentName": "shift", "element": "list1", "addToFieldNameAndValue": true},
                  { "argumentName": "production_lot", "element": "list2", "addToFieldNameAndValue": true},
                  { "argumentName": "numSamplesToLog", "defaultValue": 1 }
                ],                              
                "dialogInfo":{
                  "name": "genericDialog",
                  "fields": [   
                    {"text1": { "label_en":"Program", "label_es":"Programa", "disabled": true, "selObjectPropertyName": "program_name" }},
                    {"text2": { "label_en":"Location", "label_es":"Ubicación", "disabled": true, "selObjectPropertyName": "location_name" }},
                    {"list1": { 
                      "items": [
                      { "keyName": "M1", "keyValue_en": "Morning 1", "keyValue_es": "Mañana 1" },
                      { "keyName": "M2", "keyValue_en": "Morning 2", "keyValue_es": "Mañana 2" },
                      { "keyName": "NIGHT", "keyValue_en": "Night", "keyValue_es": "Nocturno" }
                      ],    
                      "label_en": "Shift", "label_es": "Turno" 
                    }},                      
                    {"list2": {    
                      "label_en": "Production lot", "label_es": "Lote de producción", "optional": true,
                      "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
                      "valuesFromProperty": {
                        "fixItemsOnTop": [
                          { "keyName": "responsible", "keyValue_en": "responsible", "keyValue_es": "responsible" }
                        ],
                        "selObjectPropertyName":"prodLotList",
                        "propertyKeyName": "lot_name", "propertyKeyValueEn": "lot_name", "propertyKeyValueEs": "lot_name"
                      }			
                    }},                      
                    {"number1": { "label_en":"Num Samples to log", "label_es":"Num muestras a crear", "argumentName": "numSamplesToLog", "default_value": 1 } }                              
                    
                  ],  		                               
                  "xname" : "pointDialog",
                  "action": { "actionName": "LOGSAMPLE",
                    "requiresDialog": false,
                    "zzzendPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                    "zzzclientMethod": "logSample",
                    "endPointParams": [
                      { "argumentName": "programName", "selObjectPropertyName": "program_name" },
                      { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
                      { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
                      { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
                      { "argumentName": "fieldName", "defaultValue": "shift|production_lot" },
                      { "argumentName": "fieldValue", "targetValue": true },
                      { "argumentName": "numSamplesToLog", "defaultValue": 1 }
                    ]
                  }
                }
              }                
            ],
            "gridActionOnClick":
              {
                "actionName": "LOGSAMPLE",
                "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                "requiresDialog": true,
                "clientMethod": "logSampleDialog",
                "dialogQueries":[
                  {	"actionName": "GET_ACTIVE_PRODUCTION_LOTS",				
                    "endPoint": "/moduleenvmon/EnvMonAPIqueries",
                    "variableForData": "prodLotList"		  
                  }
                ],
            
                "dialogInfo":{
                  "name" : "pointDialog",
                  "action": { "actionName": "LOGSAMPLE",
                    "requiresDialog": false,
                    "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                    "clientMethod": "logSample",
                    "endPointParams": [
                      { "argumentName": "programName", "selObjectPropertyName": "program_name" },
                      { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
                      { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
                      { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
                      { "argumentName": "fieldName", "defaultValue": "shift|production_lot" },
                      { "argumentName": "fieldValue", "targetValue": true },
                      { "argumentName": "numSamplesToLog", "defaultValue": 1 }
                    ]
                  }
                }
              }          
          }
        ]
      },
      {
        "tabLabel_en": "Sampling Points Map",
        "tabLabel_es": "Puntos de Muestreo Mapa",
        "view_definition": [
          {
            "type": "mapWithIcons",
            "actionOnHoverTheIcon": true,
            "actionOnClickTheIcon": false,
            "actionDisabled": false,             
            "mapUrlFixValue":"/images/clean-room-example.png",
            "mapUrlDataProperty":"map_image",
            "endPointPropertyArray": ["spec_definition", "spec_limits"],
            "samplePointsDetail":{
              "endPointPropertyArray": ["sample_points"]            
            },
            "action":{
                "actionName": "LOGSAMPLE",
                "requiresGridItemSelected": true,
                "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                "requiresDialog": true,
                "button": {
                  "icon": "rule",
                  "title": {
                    "label_en": "Log samples",
                    "label_es": "Registrar muestras"
                  }
                },
                "xclientMethod": "logSampleDialog",
                "dialogQueries":[
                  {	"actionName": "GET_ACTIVE_PRODUCTION_LOTS",				
                    "endPoint": "/moduleenvmon/EnvMonAPIqueries",
                    "variableForData": "prodLotList"		  
                  }
                ],  
                "endPointParams": [
                  { "argumentName": "programName", "selObjectPropertyName": "program_name" },
                  { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
                  { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
                  { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
                  { "argumentName": "shift", "element": "list1", "addToFieldNameAndValue": true},
                  { "argumentName": "production_lot", "element": "list2", "addToFieldNameAndValue": true},
                  { "argumentName": "numSamplesToLog", "defaultValue": 1 }
                ],                              
                "dialogInfo":{
                  "name": "genericDialog",
                  "fields": [   
                    {"text1": { "label_en":"Program", "label_es":"Programa", "disabled": true, "selObjectPropertyName": "program_name" }},
                    {"text2": { "label_en":"Location", "label_es":"Ubicación", "disabled": true, "selObjectPropertyName": "location_name" }},
                    {"list1": { 
                      "items": [
                      { "keyName": "M1", "keyValue_en": "Morning 1", "keyValue_es": "Mañana 1" },
                      { "keyName": "M2", "keyValue_en": "Morning 2", "keyValue_es": "Mañana 2" },
                      { "keyName": "NIGHT", "keyValue_en": "Night", "keyValue_es": "Nocturno" }
                      ],    
                      "label_en": "Shift", "label_es": "Turno" 
                    }},                      
                    {"list2": {    
                      "label_en": "Production lot", "label_es": "Lote de producción", "optional": true,
                      "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
                      "valuesFromProperty": {
                        "fixItemsOnTop": [
                          { "keyName": "responsible", "keyValue_en": "responsible", "keyValue_es": "responsible" }
                        ],
                        "selObjectPropertyName":"prodLotList",
                        "propertyKeyName": "lot_name", "propertyKeyValueEn": "lot_name", "propertyKeyValueEs": "lot_name"
                      }			
                    }},                      
                    {"number1": { "label_en":"Num Samples to log", "label_es":"Num muestras a crear", "argumentName": "numSamplesToLog", "default_value": 1 } }                              
                    
                  ],  		                               
                  "xname" : "pointDialog",
                  "action": { "actionName": "LOGSAMPLE",
                    "requiresDialog": false,
                    "zzzendPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                    "zzzclientMethod": "logSample",
                    "endPointParams": [
                      { "argumentName": "programName", "selObjectPropertyName": "program_name" },
                      { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
                      { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
                      { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
                      { "argumentName": "fieldName", "defaultValue": "shift|production_lot" },
                      { "argumentName": "fieldValue", "targetValue": true },
                      { "argumentName": "numSamplesToLog", "defaultValue": 1 }
                    ]
                  }
                }
              }                              
          }
        ]
      }                  
    ]    
  },
  "Programs20240903":{
    "component": "ObjectByTabs",
    "hasOwnComponent": true,
    "showTitleOnTop": true,
    "title": {
      "fix_text_en": "All my projects",
      "fix_text_es": "Todos mis proyectos",
      "name": "name"
    },
    "viewQuery": {
      "actionName": "PROGRAMS_LIST",
      "notUseGrid": true,
      "responseArray": true,
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": false
      },
      "endPointParams": [
        {
          "argumentName": "name",
          "internalVariableSimpleObjName": "filterCurrentData",
          "internalVariableSimpleObjProperty": "filtertext1"
        },
        {
          "argumentName": "type",
          "fixValue": "Product Development"
        }
      ]
    },
    "left_panel": {
      "actions": []
    },
    "filter_button": {
      "label_en": "Search",
      "label_es": "Buscar"
    },
    "filter": [
      {
        "filtertext1": {
          "label_en": "Project",
          "label_es": "Proyecto",
          "fixValue": "ALL"
        }
      }
    ],
    "filterResultDetail": {
      "type": "list",
      "detail": [
        {
          "field": "name"
        }
      ]
    },
    "actions": [],
    "tabs": [
      {
        "tabLabel_en": "Summary",
        "tabLabel_es": "Resumen",
        "view_definition": [
          {
            "type": "calendarMonthlyEvents",

          },
          {
            "type": "zzzchart", 
            "endPointPropertyArray":["ROOT"],
            "elementName": "samples_summary_by_stage",

            "display_chart": true,
            "chart_type":"pie",
            "chart_name":"samples_summary_by_stage",
            "chart_title":{"label_en": "Samples by stage", "label_es":"Muestras por etapa"},
            "counter_field_name":"Counter",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#dfa942", "#d33737", "#bf120f"]              
            },
            "grouper_field_name":"samples_summary_by_stage",
            "label_values_replacement":{
              "IN":{"label_es": "In Range", "label_en": "Dentro de Range"},
              "inAlertMax": {"label_es": "Por Encima del límite de alerta", "label_en": "Over the Alert limit"},
              "outOfSpecMax": {"label_es": "Fuera de Rango", "label_en": "Over the Range"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          },          
        ]
      },
      {
        "tabLabel_en": "Specification",
        "tabLabel_es": "Especificación",
        "view_definition": [
          {
            "type": "readOnlyTable",
            "endPointPropertyArray": ["spec_definition", "spec_limits"],
            "columns": [
              {
                "name": "parameter",
                "label_en": "Parameter",
                "label_es": "Parámetro"
              },
              {
                "name": "variation_name",
                "label_en": "Grade",
                "label_es": "Grado"
              },
              {
                "name": "pretty_spec",
                "label_en": "Range",
                "label_es": "Rango"
              }
            ],
            "xactions": [],
            "xrow_buttons": []
          }          
        ]
      },
      {
        "tabLabel_en": "Calendar",
        "tabLabel_es": "Calendario",
        "view_definition": []
      },
      {
        "tabLabel_en": "Sampling Points",
        "tabLabel_es": "Puntos de Muestreo",
        "view_definition": [
          {"type": "reportTitle", 
            "title":{
              "label_en": "Program Sampling Points", 
              "label_es": "Puntos de muestro del programa"
            }
          },   
          {"type": "parentReadOnlyTable",  
            "allowMultiSelection": false, 
            "refreshable":{ "enable": true}, 
            "printable":{ "enable": true}, 
            "downloadable":{"enable": true, "allowUserSelectColumns": true}, 
            "endPointPropertyArray": ["sample_points"],		              
            "columns" : [                                
                {"name":"location_name", "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "20%"},
                {"name":"spec_code", "label_en": "Spec", "label_es": "Especificación", "sort": false, "filter": true, "width": "20%"},
                {"name":"spec_variation_name", "label_en": "Variation", "label_es": "Variación", "sort": false, "filter": true, "width": "20%"},
                {"name":"spec_analysis_variation", "label_en": "Analysis Variation", "label_es": "Análisis de Variación", "sort": false, "filter": true, "width": "20%"},
                {"name":"person_ana_definition", "label_en": "Person Sampling Areas", "label_es": "Areas a analizar de Personal", "sort": false, "filter": true, "width": "40%"},
                {"name":"requires_tracking_sampling_end", "label_en": "Sampling Static?", "label_es": "Muestreo Estático?", "sort": false, "filter": true, "width": "40%"}                   
            ],             
            "actions": [
              {
                "actionName": "LOGSAMPLE",
                "requiresGridItemSelected": true,
                "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                "requiresDialog": true,
                "button": {
                  "icon": "rule",
                  "title": {
                    "label_en": "Log samples",
                    "label_es": "Registrar muestras"
                  },
                },
                "xclientMethod": "logSampleDialog",
                "dialogQueries":[
                  {	"actionName": "GET_ACTIVE_PRODUCTION_LOTS",				
                    "endPoint": "/moduleenvmon/EnvMonAPIqueries",
                    "variableForData": "prodLotList"		  
                  }
                ],  
                "endPointParams": [
                  { "argumentName": "programName", "selObjectPropertyName": "program_name" },
                  { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
                  { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
                  { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
                  { "argumentName": "shift", "element": "list1", "addToFieldNameAndValue": true},
                  { "argumentName": "production_lot", "element": "list2", "addToFieldNameAndValue": true},
                  { "argumentName": "numSamplesToLog", "defaultValue": 1 }
                ],                              
                "dialogInfo":{
                  "name": "genericDialog",
                  "fields": [   
                    {"text1": { "label_en":"Program", "label_es":"Programa", "disabled": true, "selObjectPropertyName": "program_name" }},
                    {"text2": { "label_en":"Location", "label_es":"Ubicación", "disabled": true, "selObjectPropertyName": "location_name" }},
                    {"list1": { 
                      "items": [
                      { "keyName": "M1", "keyValue_en": "Morning 1", "keyValue_es": "Mañana 1" },
                      { "keyName": "M2", "keyValue_en": "Morning 2", "keyValue_es": "Mañana 2" },
                      { "keyName": "NIGHT", "keyValue_en": "Night", "keyValue_es": "Nocturno" }
                      ],    
                      "label_en": "Shift", "label_es": "Turno" 
                    }},                      
                    {"list2": {    
                      "label_en": "Production lot", "label_es": "Lote de producción", "optional": true,
                      "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
                      "valuesFromProperty": {
                        "fixItemsOnTop": [
                          { "keyName": "responsible", "keyValue_en": "responsible", "keyValue_es": "responsible" }
                        ],
                        "selObjectPropertyName":"prodLotList",
                        "propertyKeyName": "lot_name", "propertyKeyValueEn": "lot_name", "propertyKeyValueEs": "lot_name"
                      }			
                    }},                      
                    {"number1": { "label_en":"Num Samples to log", "label_es":"Num muestras a crear", "argumentName": "numSamplesToLog", "default_value": 1 } }                              
                    
                  ],  		                               
                  "xname" : "pointDialog",
                  "action": { "actionName": "LOGSAMPLE",
                    "endPointUrl": "Samples",
                    "requiresDialog": false,
                    "zzzendPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                    "zzzclientMethod": "logSample",
                    "endPointParams": [
                      { "argumentName": "programName", "selObjectPropertyName": "program_name" },
                      { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
                      { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
                      { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
                      { "argumentName": "fieldName", "defaultValue": "shift|production_lot" },
                      { "argumentName": "fieldValue", "targetValue": true },
                      { "argumentName": "numSamplesToLog", "defaultValue": 1 }
                    ]
                  }
                }
              }                
            ],
            "gridActionOnClick":
              {
                "actionName": "LOGSAMPLE",
                "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                "requiresDialog": true,
                "clientMethod": "logSampleDialog",
                "dialogQueries":[
                  {	"actionName": "GET_ACTIVE_PRODUCTION_LOTS",				
                    "endPoint": "/moduleenvmon/EnvMonAPIqueries",
                    "variableForData": "prodLotList"		  
                  }
                ],
            
                "dialogInfo":{
                  "name" : "pointDialog",
                  "action": { "actionName": "LOGSAMPLE",
                    "endPointUrl": "Samples",
                    "requiresDialog": false,
                    "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                    "clientMethod": "logSample",
                    "endPointParams": [
                      { "argumentName": "programName", "selObjectPropertyName": "program_name" },
                      { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
                      { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
                      { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
                      { "argumentName": "fieldName", "defaultValue": "shift|production_lot" },
                      { "argumentName": "fieldValue", "targetValue": true },
                      { "argumentName": "numSamplesToLog", "defaultValue": 1 }
                    ]
                  }
                }
              }          
          }
        ]
      },
      {
        "tabLabel_en": "Sampling Points Map",
        "tabLabel_es": "Puntos de Muestreo Mapa",
        "view_definition": [
          {
            "type": "mapWithIcons",
            "mapUrlFixValue":"/images/clean-room-example.png",
            "mapUrlDataProperty":"map_image",
            "endPointPropertyArray": ["spec_definition", "spec_limits"],
            "samplePointsDetail":{
              "endPointPropertyArray": ["sample_points"]            
            },
            "action":{
                "actionName": "LOGSAMPLE",
                "requiresGridItemSelected": true,
                "endPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                "requiresDialog": true,
                "button": {
                  "icon": "rule",
                  "title": {
                    "label_en": "Log samples",
                    "label_es": "Registrar muestras"
                  },
                },
                "xclientMethod": "logSampleDialog",
                "dialogQueries":[
                  {	"actionName": "GET_ACTIVE_PRODUCTION_LOTS",				
                    "endPoint": "/moduleenvmon/EnvMonAPIqueries",
                    "variableForData": "prodLotList"		  
                  }
                ],  
                "endPointParams": [
                  { "argumentName": "programName", "selObjectPropertyName": "program_name" },
                  { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
                  { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
                  { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
                  { "argumentName": "shift", "element": "list1", "addToFieldNameAndValue": true},
                  { "argumentName": "production_lot", "element": "list2", "addToFieldNameAndValue": true},
                  { "argumentName": "numSamplesToLog", "defaultValue": 1 }
                ],                              
                "dialogInfo":{
                  "name": "genericDialog",
                  "fields": [   
                    {"text1": { "label_en":"Program", "label_es":"Programa", "disabled": true, "selObjectPropertyName": "program_name" }},
                    {"text2": { "label_en":"Location", "label_es":"Ubicación", "disabled": true, "selObjectPropertyName": "location_name" }},
                    {"list1": { 
                      "items": [
                      { "keyName": "M1", "keyValue_en": "Morning 1", "keyValue_es": "Mañana 1" },
                      { "keyName": "M2", "keyValue_en": "Morning 2", "keyValue_es": "Mañana 2" },
                      { "keyName": "NIGHT", "keyValue_en": "Night", "keyValue_es": "Nocturno" }
                      ],    
                      "label_en": "Shift", "label_es": "Turno" 
                    }},                      
                    {"list2": {    
                      "label_en": "Production lot", "label_es": "Lote de producción", "optional": true,
                      "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
                      "valuesFromProperty": {
                        "fixItemsOnTop": [
                          { "keyName": "responsible", "keyValue_en": "responsible", "keyValue_es": "responsible" }
                        ],
                        "selObjectPropertyName":"prodLotList",
                        "propertyKeyName": "lot_name", "propertyKeyValueEn": "lot_name", "propertyKeyValueEs": "lot_name"
                      }			
                    }},                      
                    {"number1": { "label_en":"Num Samples to log", "label_es":"Num muestras a crear", "argumentName": "numSamplesToLog", "default_value": 1 } }                              
                    
                  ],  		                               
                  "xname" : "pointDialog",
                  "action": { "actionName": "LOGSAMPLE",
                    "endPointUrl": "Samples",
                    "requiresDialog": false,
                    "zzzendPoint": "/moduleenvmon/EnvMonSampleAPIactions",
                    "zzzclientMethod": "logSample",
                    "endPointParams": [
                      { "argumentName": "programName", "selObjectPropertyName": "program_name" },
                      { "argumentName": "locationName", "selObjectPropertyName": "location_name" },
                      { "argumentName": "sampleTemplate", "defaultValue": "program_smp_template" },
                      { "argumentName": "sampleTemplateVersion", "defaultValue": 1 },
                      { "argumentName": "fieldName", "defaultValue": "shift|production_lot" },
                      { "argumentName": "fieldValue", "targetValue": true },
                      { "argumentName": "numSamplesToLog", "defaultValue": 1 }
                    ]
                  }
                }
              }                              
          }
        ]
      }                  
    ]    
  },
  "ProgramsOldUsingProgramProcDeprecated": {
    "component": "ModuleEnvMonitProgramProc",   
    "hasOwnComponent": true,
    "viewQuery": {  "actionName": "PROGRAMS_LIST",
					"endPoint": "/moduleenvmon/EnvMonAPIqueries",
					"clientMethod": "getProgramList",
					"button": {
					  "icon": "refresh",
					  "title": {
						"label_en": "Reload", "label_es": "Recargar"
					  },
					  "requiresGridItemSelected": true
					},
					"subAction": {
					  "actionName": "GET_ACTIVE_PRODUCTION_LOTS",
					  "endPoint": "/moduleenvmon/EnvMonAPIqueries",
					  "clientMethod": "getLots"
					}
	},    
	"actions": [],
	"tabs": [
		{"tabLabel_en": "Summary", "tabLabel_es": "Inicio", "view": "summary"},
		{"tabLabel_en": "Parameter Limits", "tabLabel_es": "Límites", "view": "parameter-limits"},
		{"tabLabel_en": "Config Calendar", "tabLabel_es": "Calendario Config", "view": "config-calendar"},
		{"tabLabel_en": "Sampling Points", "tabLabel_es": "Puntos de Muestreo", "view": "sampling-points"},
		{"tabLabel_en": "Sampling Points Map", "tabLabel_es": "Puntos de Muestreo Mapa", "view": "sampling-points-map"}
	  ]
  },
  "Deviation20240827": {
	"component":"Tabs",  
    "abstract": true,
    "tabs": [
      { "component":"TableWithButtons",  
        "filter": "pending",
        "langConfig": {
          "tab": {
            "label_en": "Pending Decision", 
            "label_es": "Decisión pendiente"
          },
          "title": {
            "pending": {
				"label_en": "Pending Decision", 
				"label_es": "Decisión pendiente"
            }
          },
          "gridHeader": {
            "result_id": {
              "label_en": "Result", "label_es": "Resultado", "sort": false, "filter": true, "width": "10%"
            },
            "sample_id": {
              "label_en": "Sample", "label_es": "Muestra", "sort": false, "filter": true, "width": "10%"
            },
            "created_on": {
              "label_en": "Creation", "label_es": "Creada", "sort": true, "filter": false, "width": "15%"
            },
            "location_name": {
              "label_en": "Location", "label_es": "Ubicación", "sort": false, "filter": true, "width": "15%"
            },
            "method_name": {
              "label_en": "Method", "label_es": "Método", "sort": false, "filter": true, "width": "10%"
            },
            "spec_eval_detail": {
              "label_en": "Problem Detail", "label_es": "Detalle del Problema", "sort": false, "filter": true, "width": "30%"
            },
            "spec_rule_with_detail": {
              "label_en": "Spec Rule", "label_es": "Especificación", "sort": false, "filter": true, "width": "10%"
            }
          }
        },
        "viewQuery":{
            "actionName": "INVESTIGATION_RESULTS_PENDING_DECISION",
            "endPoint": "/app/InvestigationAPIqueries",
            "button": {
              "icon": "refresh",
              "title": {
                "label_en": "Reload", "label_es": "Recargar"
              },
              "requiresGridItemSelected": true
            }		
		},
		"actions": [
          {"actionName": "NEW_INVESTIGATION", 
            "alternativeAPIActionMethod": "newInvestigationAction",
            "endPoint": "/app/InvestigationAPIactions",
			"requiresDialog": false,
            "button": {
              "title": {
                "label_en": "Create Investigation", "label_es": "Crear Investigación"
              },
              "requiresGridItemSelected": true
            },
            "endPointParams": [
				{ "argumentName": "fieldName", "value": "description" },
				{ "argumentName": "fieldValue", "targetValue": true },
				{ "argumentName": "objectsToAdd", "targetValue": true }			
            ]
          },
          {"actionName": "OPEN_INVESTIGATIONS",          
            "endPoint": "/app/InvestigationAPIqueries",
			"requiresDialog": true,
            "button": {
              "title": {
                "label_en": "Add to Investigation", "label_es": "Añadir a Investigación"
              },
              "requiresGridItemSelected": true
            },
            "dialogInfo": {
			"name": "investigationDialog",
			"subQueryName": "getOpenInvestigations",				
              "automatic": true,
              "action": [
                {
                  "actionName": "ADD_INVEST_OBJECTS",
                  "clientMethod": "addInvestObjects",
                  "endPoint": "/app/InvestigationAPIactions",
                  "endPointParams": [
                    { "argumentName": "investigationId", "targetValue": true },
                    { "argumentName": "objectsToAdd", "targetValue": true }
                  ]
                }
              ]
            }
          }
        ]
      },	
      { "component":"TableWithButtons",  
        "filter": "open",
        "langConfig": {
          "tab": {
            "label_en": "Investigations", 
            "label_es": "Investigaciones"
          },
          "title": {
            "open": {
              "label_en": "In Progress Investigations", 
              "label_es": "Investigaciones en curso"
            }
          },
          "fieldText": {
            "systemName": { "label_en": "System Name", "label_es": "Nombre Sistema" },
            "systemId": { "label_en": "System Id", "label_es": "Id Sistema" },
            "capa": { "label_en": "CAPA Required", "label_es": "¿Requiere CAPA?" },
            "capaName": { "label_en": "CAPA System Name", "label_es": "Nombre Sistema CAPA" },
            "capaId": { "label_en": "CAPA Id", "label_es": "Id CAPA" }
          },
          "gridHeader": {
            "id": {
              "label_en": "ID", "label_es": "ID", "width": "12px", "sort": false, "filter": true
            },
            "description": {
              "label_en": "description", "label_es": "description", "width": "20px", "sort": false, "filter": true
            },
            "created_on": {
              "label_en": "Creation", "label_es": "Creación", "width": "30px", "sort": false, "filter": true
            },
            "external_system_name": {
              "label_en": "External System Name", "label_es": "Nombre Sistema Externo", "width": "20px", "sort": false, "filter": true
            },
            "external_system_id": {
              "label_en": "External System Id", "label_es": "Id Sistema Externo", "width": "20px", "sort": false, "filter": true
            },
            "capa_required": {
              "label_en": "capa_required", "label_es": "CAPA Necesario", "width": "20px", "sort": false, "filter": true
            },
            "capa_external_system_name": {
              "label_en": "CAPA System", "label_es": "Sistema para CAPAs", "width": "20px", "sort": false, "filter": true
            },
            "capa_external_system_id": {
              "label_en": "CAPA System Id", "label_es": "Id en Sistema CAPAs", "width": "20px", "sort": false, "filter": true
            }
          }
        },
        "viewQuery":{
            "actionName": "OPEN_INVESTIGATIONS",
            "endPoint": "/app/InvestigationAPIqueries",
            "button": {
              "icon": "refresh",
              "title": {
                "label_en": "Reload", "label_es": "Recargar"
              },
              "requiresGridItemSelected": true
            }
		},
		"actions": [
          {"actionName": "INVESTIGATION_CAPA_DECISION",			
            "endPoint": "/app/InvestigationAPIactions",
			"requiresDialog": true,
            "button": {
              "title": {
                "label_en": "Decision", "label_es": "Decisión"
              },
              "requiresGridItemSelected": true
            },
            "dialogInfo": {               
              "name": "decisionDialog"
            },
            "endPointParams": [
              { "argumentName": "investigationId", "selObjectPropertyName": "id" },
              { "argumentName": "capaRequired", "targetValue": true },
              { "argumentName": "capaFieldName", "value": "external_system_name|external_system_id|capa_external_system_name|capa_external_system_id" },
              { "argumentName": "capaFieldValue", "targetValue": true },
			  { "argumentName": "closeInvestigation", "value": false }				  
            ]
          },
          {"actionName": "CLOSE_INVESTIGATION",
            "clientMethod": "closeInvestigation",
            "endPoint": "/app/InvestigationAPIactions",
			"requiresDialog": false,
            "button": {
              "title": {
                "label_en": "Close", "label_es": "Cerrar"
              },
              "requiresGridItemSelected": true
            },
            "endPointParams": [
              { "argumentName": "investigationId", "selObjectPropertyName": "id" }
            ]
          }
        ]
      }
    ]
  },
  "Deviation":{
    "component": "Tabs",
    "tabs": [
      {
        "tabLabel": {
          "label_es": "Decisión pendiente",
          "label_en": "Pending Decision"
        },
  
        "component": "SingleView",
        "hideLeftPane": true,
        "hasOwnComponent": true,
        
        "viewQuery": {
          "actionName": "INVESTIGATION_RESULTS_PENDING_DECISION",
          "endPoint": "/app/InvestigationAPIqueries",
          "dataResponse": "ArrayInRoot",
          "endPointParams": []
        },
  
       "view_definition": [
          {
            "type": "reportTitle",
            "title": {
              "label_en": "Pending Decisions",
              "label_es": "Decisión pendiente"
            }
          },
          {
            "type": "parentReadOnlyTable",
            "allowMultiSelection": false,
            "refreshable": {
              "enable": true
            },
            "printable": {
              "enable": true
            },
            "downloadable": {
              "enable": true
            },
            "columns": [
              {
                "name": "reference",
                "label_en": "Reference",
                "label_es": "Referencia",
                "filter": false,
                "addToSmartFilter": true
              },
              {
                "name": "location_name",
                "label_es": "Ubicación",
                "label_en": "Location",
                 "filter": true,
                "addToSmartFilter": true
              },
              {  
                "name": "created_on",
                "label_es": "Creada",
                "label_en": "Creation", "filter": true,
                "addToSmartFilter": true
              },
              {
                "name": "method_name",
                "label_es": "Método",
                "label_en": "Method", "filter": true,
                "addToSmartFilter": true
              },
              {
                "name": "result_id",
                "label_es": "Resultado",
                "label_en": "Result", "filter": true,
                "addToSmartFilter": true
              },
              {
              "name":"sample_id",
              "label_es": "Muestra",
              "label_en": "Sample", "filter": true,
              "addToSmartFilter": true
              },
              {
                "name": "spec_eval_detail",
                "label_es": "Detalle del Problema",
                "label_en": "Problem Detail", "filter": true,
                "addToSmartFilter": true
              },
              {  
                "name": "spec_rule_with_detail",
                "label_es": "Especificación",
                "label_en": "Spec Rule", "filter": true,
                "addToSmartFilter": true
              }
            ],
  
        
          "actions": [
          {
            "button": {
              "icon": "find_in_page",
              "requiresGridItemSelected": true,
              "title": {
                "label_es": "Crear Investigación",
                "label_en": "Create Investigation"
              }
            },
            "endPoint": "/app/InvestigationAPIactions",
            "requiresDialog": false,
            "alternativeAPIActionMethod": "newInvestigationAction",
            "endPointParams": [
              {
                "argumentName": "fieldName",
                "value": "description"
              },
              {
                "argumentName": "fieldValue",
                "targetValue": true
              },
              {
                "argumentName": "objectsToAdd",
                "targetValue": true
              }
            ],
            "actionName": "NEW_INVESTIGATION"
          },
  {"actionName": "ADD_INVEST_OBJECTS",          
                  "requiresDialog": true,
                  "button": {
                    "icon": "loupe",
                    "title": {
                      "label_en": "Add to Investigation", "label_es": "Añadir a Investigación"
                    },
                    "requiresGridItemSelected": true
                  },
                  "endPointParams": [
                      {"argumentName": "investigationId", "getFromGrid": true, "selObjectPropertyName": "id"},
                      { "argumentName": "objectToAddObjectType", "selObjectPropertyName": "object_type" },	
                      { "argumentName": "objectToAddObjectName", "selObjectPropertyName": "result_id" }		
                  ],			
                  "dialogInfo": {
                      "name": "genericDialog",
                      "gridContent": true,			  
                      "langConfig": {
                          "gridHeader": [
                              {"fldName": "id", "label_en": "Investigation", "label_es": "Investigación", "width": "40%",
                                  "sort": false, "filter": true, "align": "left"},
                              {"fldName": "created_on", "label_en": "Created on", "label_es": "F.Creación", "width": "40%",
                                  "sort": true,"filter": false}			
                          ]
                      },			  
                      "dialogQuery":{
                              "actionName": "OPEN_INVESTIGATIONS",
                              "button": {
                              "icon": "refresh",
                              "title": {
                                    "label_en": "Reload", "label_es": "Recargar"
                              },
                              "requiresGridItemSelected": true
                            }
                      }		  
                  }
              }           
        ]
      }]
      },{
        
        "tabLabel": {
          "label_es": "Investigaciones",
          "label_en": "Investigations"
        },
          
        "component": "SingleView",
        "hideLeftPane": true,
        "hasOwnComponent": true,
        
        "viewQuery": {
          "endPoint": "/app/InvestigationAPIqueries",
          "actionName": "OPEN_INVESTIGATIONS",
          "dataResponse": "ArrayInRoot",
          "endPointParams": []
        },
  
         "view_definition": [
          {
            "type": "reportTitle",
            "title": {
              "label_en": "In Progress Investigations",
              "label_es": "Investigaciones en curso"
            }
          },
          {
            "type": "parentReadOnlyTable",
            "allowMultiSelection": false,
            "refreshable": {
              "enable": true
            },
            "printable": {
              "enable": true
            },
            "downloadable": {
              "enable": true
            },
            "columns": [
              {
                "name": "capa_external_system_id",
                "label_en": "CAPA System Id",
                "label_es": "Id en Sistema CAPAs",
                "filter": true,
                "addToSmartFilter": true
              },
              {
                "name": "created_on",
                "label_es": "Creación",
                "label_en": "Creation", 
                "filter": true,
                "addToSmartFilter": true
              },
              { 
                "name": "capa_external_system_name",
                "label_es": "Sistema para CAPAs",
                "label_en": "CAPA System",
                "filter": true,
                "addToSmartFilter": true
              },
              {
                "name": "external_system_id",
                "label_es": "Id Sistema Externo",
                "label_en": "External System Id",
                "filter": true,
                "addToSmartFilter": true
              },
              {
                "name": "description",
                "label_es": "description",
                "label_en": "description", 
                "filter": true,
                "addToSmartFilter": true
              },
              {
                "name": "id",
                "label_es": "ID",
                "label_en": "ID",
                "filter": true,
                "addToSmartFilter": true
              },
              {
                "name": "external_system_name",
                "label_es": "Nombre Sistema Externo",
                "label_en": "External System Name",
                "filter": true,
                "addToSmartFilter": true
              },
              {
                "name": "capa_required",
                "label_es": "CAPA Necesario",
                "label_en": "capa_required", 
                "filter": true,
                "addToSmartFilter": true
            }
            ],
  
          "actions": [
          {
            "button": {
              "icon": "add_box",
              "requiresGridItemSelected": true,
              "title": {
                "icon": "add_box",
                "label_es": "Decisión",
                "label_en": "Decision"
              }
            },
            "endPoint": "/app/InvestigationAPIactions",
            "requiresDialog": true,
            "dialogInfo": {
              "name": "decisionDialog",
              "fields": {
            "capa": {
              "label_es": "¿Requiere CAPA?",
              "label_en": "CAPA Required"
            },
            "capaName": {
              "label_es": "Nombre Sistema CAPA",
              "label_en": "CAPA System Name"
            },
            "capaId": {
              "label_es": "Id CAPA",
              "label_en": "CAPA Id"
            },
            "systemId": {
              "label_es": "Id Sistema",
              "label_en": "System Id"
            },
            "systemName": {
              "label_es": "Nombre Sistema",
              "label_en": "System Name"
            }
          },"endPointParams": [
              {
                "selObjectPropertyName": "id",
                "argumentName": "investigationId"
              },
              {
                "argumentName": "capaRequired",
                "targetValue": true
              },
              {
                "argumentName": "capaFieldName",
                "value": "external_system_name|external_system_id|capa_external_system_name|capa_external_system_id"
              },
              {
                "argumentName": "capaFieldValue",
                "targetValue": true
              },
              {
                "argumentName": "closeInvestigation",
                "value": false
              }
            ],
            "actionName": "INVESTIGATION_CAPA_DECISION"
          }},
          {
            "clientMethod": "closeInvestigation",
            "button": {
              "icon": "cancel",
              "requiresGridItemSelected": true,
              "title": {
                "label_es": "Cerrar",
                "label_en": "Close"
              }
            },
            "endPoint": "/app/InvestigationAPIactions",
            "requiresDialog": false,
            "endPointParams": [
              {
                "selObjectPropertyName": "id",
                "argumentName": "investigationId"
              }
            ],
            "actionName": "CLOSE_INVESTIGATION"
          }
        ]
      }
    ],
    "abstract": true
  }]},

  "Incubators": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "Incubators": {
          "label_en": "Incubators List",
          "label_es": "Lista de incubadoras"
        }
      },
      "gridHeader": {
        "name": {
          "label_en": "Name", "label_es": "Nombre", "width": "30%", "sort": false, "filter": true, "align": "left"
        },
        "description": {
          "label_en": "Description", "label_es": "Descripción", "width": "40%", "sort": true, "filter": false
        },
        "stage": {
          "label_en": "Incubation", "label_es": "Incubación", "width": "10%", "sort": true, "filter": false
        },
        "min": {
          "label_en": "Min T.", "label_es": "T. Mín", "width": "10%", "sort": true, "filter": false
        },
        "max": {
          "label_en": "Max T.", "label_es": "T. Máx", "width": "10%", "sort": true, "filter": false
        }
      }
    },
    "viewQuery":{ "actionName": "GET_INCUBATORS_LIST",
        "endPoint": "/moduleenvmon/EnvMonIncubatorAPIqueries",
        "endPointParams": [
        ],
        "addRefreshButton": true,
        "button": {
          "icon": "refresh",
          "title": {
            "label_en": "Refresh", "label_es": "Recargar"
          },
          "requiresGridItemSelected": true
      }
    },
    "bottomCompositions": [
    {
      "elementName": "chart",
      "chartTitle":{
        "label_en": "Last Temperature Readings", 
        "label_es": "Últimas lecturas de temperatura"
      },      
      "data":{
        "chartType": "line",
        "objectArrayValuesName": "LAST_READINGS",
        "valuesFirstPropertyName": "created_on",
        "valuesSecondPropertyName": "temperature",
        "chartValuesHeader":{
          "en":["Moment", "Temperature"],
          "es":["Momento", "Temperatura"]
        }
      }
    }
    ],
    "actions": [
      { "actionName": "EM_INCUBATOR_NEW",
        "endPointUrl": "Incubators",
		"requiresDialog": true,
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New", "label_es": "Nuevo"
          },
          "requiresGridItemSelected": false
        },
        "dialogInfo": {          
          "name": "genericDialog",
		  "fields": [
			{"text1": { "label_en": "New Incub Name", "label_es": "Nombre para nueva Incubadora" }},
			{"list1": { 
				"items": [
					{ "keyName": "1", "keyValue_en": "1st Incub", "keyValue_es": "1ª Incub" },
					{ "keyName": "2", "keyValue_en": "2nd Incub", "keyValue_es": "2ª Incub" }
				],    
				"label_en": "Incub Stage", "label_es": "Incubación"
			}},
			{"number1": { "label_en": "Min Temp", "label_es": "Temp Mín", "default_value":20}},
			{"number2": { "label_en": "Max Temp", "label_es": "Temp Máx", "default_value":30}}
          ]
        },
        "endPointParams": [
          { "argumentName": "newIncubator", "element": "text1" },
          { "argumentName": "incubStage", "element": "list1" },
          { "argumentName": "minTemp", "element": "number1" },
          { "argumentName": "maxTemp", "element": "number2" }
        ]
      },
      { "actionName": "EM_INCUBATOR_ACTIVATE",
        "endPointUrl": "Incubators", 
		"requiresDialog": true,		
        "endPointParams": [
          { "argumentName": "incubatorName", "selObjectPropertyName": "name" }
        ],
        "clientMethod": "openReactivateObjectDialog",
        "button": {
          "icon": "alarm_add",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          "requiresGridItemSelected": false
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "reactivateObjectDialog",
          "fieldsObject": {
            "queryNumDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
            "objectName": { "label_en": "Incubator Name to reactivate", "label_es": "Nombre de Incubadora a Reactivar" }
          },  
          "listDefinition":{
            "keyFldName":"name",
            "eachEntryTextGenerator":[
              {"value": "description", "type":"field"}, {"value": " (", "type":"fix"}, 
              {"value": "name", "type":"field"}, {"value": ")", "type":"fix"}
              ]
          },
		  "viewQuery": {
			  "actionName": "GET_INCUBATORS_DEACTIVATED_LAST_N_DAYS",
			  "clientMethod": "getDeactivatedObjects",
			  "endPoint": "/moduleenvmon/EnvMonIncubatorAPIqueries",
			  "endPointParams": [
				{ "argumentName": "numDays", "element": "queryNumDays", "fixValue": 7 }
			  ]
		  },
          "action": [            
          ]	  
        }
      },
      { "actionName": "EM_INCUBATOR_DEACTIVATE",
		"requiresDialog": false,
        "endPointUrl": "Incubators",     
        "endPointParams": [
          { "argumentName": "incubatorName", "selObjectPropertyName": "name" }
        ],
        "button": {
          "icon": "alarm_off",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true
        }
      },
      { "actionName": "EM_INCUBATOR_ADD_TEMP_READING",
        "endPointUrl": "Incubators",     
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "incubatorName", "selObjectPropertyName": "name" },
          { "argumentName": "temperature", "element": "number1" }
        ],
        "button": {
          "icon": "add",
          "title": {
            "label_en": "Add Temperature Reading", "label_es": "Añadir Registro Temperatura"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": {                    
          "name": "genericDialog",
		  "fields": [
			{"number1": { "label_en": "Temperature", "label_es": "Temperatura" }}
          ]
        }
      }
    ]
  },
  "BrowserOrig": {
	"component": "Browser",
    "tabs": [
      { 
        "label_en": "Sample", 
        "label_es": "Sample", 
        "action": "GET_SAMPLE_STAGES_SUMMARY_REPORT",
        "fixParams": {
          "sampleFieldToRetrieve": "ALL",
          "sampleFieldsToDisplay": "current_stage|program_name|location_name|product_lot|shift"
        },
        "extraParams": {
          "sampleId": ""
        }
      },
      { 
        "label_en": "Incubation", 
        "label_es": "Incubation", 
        "action": "GET_INCUBATOR_REPORT",
        "fixParams": {
          "incubatorFieldToRetrieve": "current_stage", 
          "incubatorFieldsToDisplay": "ALL"
        },
        "extraParams": {
          "incubatorName": "",
          "startDate": "", 
          "endDate": ""
        }
      },
      { 
        "label_en": "Batch", 
        "label_es": "Batch", 
        "action": "GET_BATCH_REPORT",
        "fixParams": {
          "batchFieldToRetrieve": "ALL", 
          "batchFieldsToDisplay": "name|active|completed|incubation_incubator|incubation_start|incubation_end"
        },
        "extraParams": {
          "batchName": ""
        }
      },
      { 
        "label_en": "Production Lot", 
        "label_es": "Production Lot", 
        "action": "GET_PRODLOT_REPORT",
        "fixParams": {
          "prodLotFieldToRetrieve": "ALL",
          "prodLotFieldsToDisplay": "ALL",
          "sampleFieldToRetrieve": "ALL",
          "sampleFieldsToDisplay": "ALL",
          "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|area*counter_by_status"
        },
        "extraParams": {
          "lotName": ""
        }
      }
    ]
  } ,
  "DataMining": {
	"component": "DataMining",
    "tabs": [
      { "action": "QUERY_SAMPLING_HISTORY",
        "label_en": "Sampling History", 
        "label_es": "Histórico de muestreos", 
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter":{
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|area*counter_by_area|has_pre_invest*counter_out|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields":[
            {"text1": { "label_en": "Lot Name", "label_es": "Lote", "default_value": "1" }},
            {"text2": { "label_en": "Program", "label_es": "Programa", "default_value": "" }},
            {"text3": { "label_en": "Location", "label_es": "Ubicación", "default_value": "" }},
            {"text4": { "label_en": "Area", "label_es": "Area", "default_value": "" }},
            {"checkbox1": { "label_en": "Include Samples", "label_es": "Incluir Muestreo Ubicaciones", "default_value": true }},
            {"checkbox2": { "label_en": "Include Sampler Samples", "label_es": "Incluir Muestreos de Personal", "default_value": false }},
            {"daterange1":
              {
              "dateStart":{ "label_en": "Sampling Start Date", "label_es": "Fecha Inicio Muestreo", "default_value": "" },
              "dateEnd":{ "label_en": "Sampling End Date", "label_es": "Fecha Fin Muestreo", "default_value": "" }
              }
            },
            {"daterange2":
              {
              "dateStart":{ "label_en": "Login Start Date", "label_es": "Fecha Inicio Creación Muestra", "default_value": "" },
              "dateEnd":{ "label_en": "Login End Date", "label_es": "Fecha Fin Creación Muestra", "default_value": "" }
              }
            },
            {"checkbox3": { "label_en": "Exclude Readings Not Entered Yet", "label_es": "Excluir Lecturas no entradas aún", "default_value": true }},
            {"number1": { "label_en": "Only readings Equal to", "label_es": "Solo las lecturas igual a", "default_value": "" }},
            {"number2": { "label_en": "Only readings Greater than", "label_es": "Solo las lecturas Mayores a", "default_value": "" }},
            {"number3": { "label_en": "Only readings Less than", "label_es": "Solo las lecturas Menores a", "default_value": "" }},
            {"checkbox4": { "label_en": "Include Microorganisms", "label_es": "Incluir Microorganismos", "default_value": false }},
            {"text5": { "label_en": "Microorganisms to find", "label_es": "Microorganismos a encontrar", "default_value": "" }}

          ],
          "extraParams": [
            {"argumentName": "lotName", "element": "text1"},
            {"argumentName": "programName", "element": "text2"},
            {"argumentName": "locationName", "element": "text3"},
            {"argumentName": "area", "element": "text4"},
            {"argumentName": "includeSamples", "element": "checkbox1"},
            {"argumentName": "includeSamplerSamples", "element": "checkbox2"},
            {"argumentName": "excludeReadingNotEntered", "element": "checkbox3"},
            {"argumentName": "samplingDayStart", "element": "daterange1dateStart"},
            {"argumentName": "samplingDayEnd", "element": "daterange1dateEnd"},
            {"argumentName": "loginDayStart", "element": "daterange2dateStart"},
            {"argumentName": "loginDayEnd", "element": "daterange2dateEnd"},
            {"argumentName": "readingEqual", "element": "number1"},
            {"argumentName": "readingMin", "element": "number2"},
            {"argumentName": "readingMax", "element": "number3"},
            {"argumentName": "includeMicroorganisms", "element": "checkbox4"},
            {"argumentName": "MicroorganismsToFind", "element": "text5"}
          ]      
        },
        "reportElements":[
          [
          {"type": "reportTitle", "title":{"label_en": "Sampling History", "label_es": "Histórico de muestreos"}}
          ],
          [
          {"type": "card", "title":{"label_en": "Information", "label_es": "Información"}, 
            "elementName":"production_lot", "subheadingObj": "text1"}
          ],
          [
          {"type": "chart", "elementName": "counter_range_eval",

            "display_chart": true,
            "chart_type":"pie",
            "chart_name":"counter_range_eval",
            "chart_title":{"label_en": "Per out of range type", "label_es":"Por tipo de fuera de rango"},
            "counter_field_name":"count",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#dfa942", "#d33737", "#bf120f"]              
            },
            "grouper_field_name":"spec_eval",
            "label_values_replacement":{
              "IN":{"label_es": "In Range", "label_en": "Dentro de Range"},
              "inAlertMax": {"label_es": "Por Encima del límite de alerta", "label_en": "Over the Alert limit"},
              "outOfSpecMax": {"label_es": "Fuera de Rango", "label_en": "Over the Range"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          },
          {"type": "chart", "elementName": "counter_by_area_spec_tmp",

            "display_chart": true,
            "chart_type":"pie",
            "chart_name":"counter_by_area_spec_tmp",
            "chart_title":{"label_en": "Per Area and Spec", "label_es":"Por Area y Especificación"},
            "counter_field_name":"count",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#1b7fcc", "#5fbd5f", "#bf120f"]              
            },
            "grouper_field_name":"sample_config_code",
            "label_values_replacement":{
              "prog_pers_template": {"label_es": "Personal", "label_en": "Personnel"},
              "program_smp_template": {"label_es": "Muestras", "label_en": "Samples"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          }
        ],
        [
          {"type": "grid", "title":{"label_en": "Info Matching Selection Criteria", "label_es": "Información cumpliendo el criterio de selección"}, 
           "elementName": "datatable", "fieldsToDisplay":[
              {"property": "program_name", "header": "Program"}, 
              {"property": "location_name", "header": "Location"}, 
              {"property": "area", "header": "Area"}, 
              {"property": "shift", "header": "shift"}, 
              {"property": "sampling_date", "header": "Sampling Date"}, 
              {"property": "raw_value_num", "header": "Value"}, 
              {"property": "spec_eval_detail", "header": "Spec Eval"}
           ] 
          }          
        ]
        ]
      },
      { "action": "QUERY_READING_OUT_OF_RANGE",
        "label_en": "Readings out of range", 
        "label_es": "Lecturas fuera de rango", 
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter":{
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields":[
            {"text1": { "label_en": "Program", "label_es": "Programa", "default_value": "" }},
            {"text2": { "label_en": "Location", "label_es": "Ubicación", "default_value": "" }},
            {"text3": { "label_en": "Area", "label_es": "Area", "default_value": "" }},
            {"daterange1":
              {
              "dateStart":{ "label_en": "Sampling Start Date", "label_es": "Fecha Inicio Muestreo", "default_value": "" },
              "dateEnd":{ "label_en": "Sampling End Date", "label_es": "Fecha Fin Muestreo", "default_value": "" }
              }
            },
            {"checkbox1": { "label_en": "Exclude Readings Not Entered Yet", "label_es": "Excluir Lecturas no entradas aún", "default_value": true }},
            {"number1": { "label_en": "Only readings Equal to", "label_es": "Solo las lecturas igual a", "default_value": "" }},
            {"number2": { "label_en": "Only readings Greater than", "label_es": "Solo las lecturas Mayores a", "default_value": "" }},
            {"number3": { "label_en": "Only readings Less than", "label_es": "Solo las lecturas Menores a", "default_value": "" }},
            {"checkbox4": { "label_en": "Include Microorganisms", "label_es": "Incluir Microorganismos", "default_value": false }},
            {"text4": { "label_en": "Microorganisms to find", "label_es": "Microorganismos a encontrar", "default_value": "" }}
          ],
          "extraParams": [
            {"argumentName": "programName", "element": "text1"},
            {"argumentName": "locationName", "element": "text2"},
            {"argumentName": "area", "element": "text3"},
            {"argumentName": "excludeReadingNotEntered", "element": "checkbox1"},
            {"argumentName": "samplingDayStart", "element": "daterange1dateStart"},
            {"argumentName": "samplingDayEnd", "element": "daterange1dateEnd"},
            {"argumentName": "readingEqual", "element": "number1"},
            {"argumentName": "readingMin", "element": "number2"},
            {"argumentName": "readingMax", "element": "number3"},
            {"argumentName": "includeMicroorganisms", "element": "checkbox4"},
            {"argumentName": "MicroorganismsToFind", "element": "text4"}
          ]      
        },
        "printable":{ "active": true},
        "download":{
          "active": true,
          "elements":[
            {"elementName": "datatable"}
          ] 
        },

        "reportElements":[
          [
          {"type": "reportTitle", "title":{"label_en": "Readings Out of Range", "label_es": "Lecturas Fuera de Rango Permitido"}}
          ],
          [
          {"type": "card", "title":{"label_en": "Information", "label_es": "Información"}, 
            "elementName":"production_lot", "subheadingObj": "text1"}
          ],
		[		
          {"type": "chart", "elementName": "datatable",
            "display_chart": true,
            "chart_type":"line",			
            "chart_name":"datatable",
            "chart_title":{"label_en": "Per out of range type", "label_es":"Por tipo de fuera de rango"},
            "counter_field_name":["raw_value_num", "speclimit_max_spec"],
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
			"chart_style":"height:500px; width: 100%;",
			"height": "300px",
			"width": "50em",
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#dfa942", "#d33737", "#bf120f"]              
            },
            "grouper_field_name":"sampling_date",
            "label_values_replacement":{
              "IN":{"label_es": "In Range", "label_en": "Dentro de Range"},
              "inAlertMax": {"label_es": "Por Encima del límite de alerta", "label_en": "Over the Alert limit"},
              "outOfSpecMax": {"label_es": "Fuera de Rango", "label_en": "Over the Range"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          }
        ],




        [
          {"type": "chart", "elementName": "counter_range_eval",

            "display_chart": true,
            "chart_type":"pie",
            "chart_name":"counter_range_eval",
            "chart_title":{"label_en": "Per out of range type", "label_es":"Por tipo de fuera de rango"},
            "counter_field_name":"count",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#dfa942", "#d33737", "#bf120f"]              
            },
            "grouper_field_name":"spec_eval",
            "label_values_replacement":{
              "inAlertMax": {"label_es": "Por Encima del límite de alerta", "label_en": "Over the Alert limit"},
              "outOfSpecMax": {"label_es": "Fuera de Rango", "label_en": "Over the Range"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          },
          {"type": "chart", "elementName": "counter_by_area_spec_tmp",

            "display_chart": true,
            "chart_type":"pie",
            "chart_name":"counter_by_area_spec_tmp",
            "chart_title":{"label_en": "Per Area and Spec", "label_es":"Por Area y Especificación"},
            "counter_field_name":"count",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#1b7fcc", "#5fbd5f", "#bf120f"]              
            },
            "grouper_field_name":"sample_config_code",
            "label_values_replacement":{
              "prog_pers_template": {"label_es": "Personal", "label_en": "Personnel"},
              "program_smp_template": {"label_es": "Muestras", "label_en": "Samples"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          }
		],
        [
          {"type": "grid", "title":{"label_en": "Info Matching Selection Criteria", "label_es": "Información cumpliendo el criterio de selección"}, 
           "elementName": "datatable", "fieldsToDisplay":[
              {"property": "program_name", "header": "Program"}, 
              {"property": "location_name", "header": "Location"}, 
              {"property": "area", "header": "Area"}, 
              {"property": "shift", "header": "shift"}, 
              {"property": "sampling_date", "header": "Sampling Date"}, 
              {"property": "raw_value_num", "header": "Value"}, 
              {"property": "spec_eval_detail", "header": "Spec Eval"}
           ] 
          }          
        ]
        ]
      },
      { "action": "KPI_PRODUCTION_LOT_SAMPLES",
        "label_en": "Production Lot Samples", 
        "label_es": "Muestras por Lote de Producción", 
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter":{
          "filterFields":[
            {"daterange1":
              {
              "dateStart":{ "label_en": "Sampling Start Date", "label_es": "Fecha Inicio Muestreo", "default_value": "" },
              "dateEnd":{ "label_en": "Sampling End Date", "label_es": "Fecha Fin Muestreo", "default_value": "" }
              }
            },
            {"text1": { "label_en": "Lot Name", "label_es": "Lote", "default_value": "20220202" }},
            {"text2": { "label_en": "Program", "label_es": "Programa", "default_value": "" }},
            {"text3": { "label_en": "Location", "label_es": "Ubicación", "default_value": "" }},
            {"text4": { "label_en": "Area", "label_es": "Area", "default_value": "" }},
            {"checkbox1": { "label_en": "Exclude Personal", "label_es": "Excluir Personal", "default_value": true }},
            {"checkbox2": { "label_en": "Exclude Readings Not Entered Yet", "label_es": "Excluir Lecturas no entradas aún", "default_value": true }},
            {"number1": { "label_en": "Only readings Equal to", "label_es": "Solo las lecturas igual a", "default_value": "" }},
            {"number2": { "label_en": "Only readings Greater than", "label_es": "Solo las lecturas Mayores a", "default_value": "" }},
            {"number3": { "label_en": "Only readings Less than", "label_es": "Solo las lecturas Menores a", "default_value": "" }},
            {"checkbox3": { "label_en": "Include Microorganisms", "label_es": "Incluir Microorganismos", "default_value": false }},
            {"text5": { "label_en": "Microorganisms to find", "label_es": "Microorganismos a encontrar", "default_value": "" }}
          ],
          "endPointParams": [
            {"argumentName": "lotName", "element": "text1", "notAddWhenValueIsBlank": true},
            {"argumentName": "programName", "element": "text2", "notAddWhenValueIsBlank": true},
            {"argumentName": "locationName", "element": "text3", "notAddWhenValueIsBlank": true},
            {"argumentName": "area", "element": "text4", "notAddWhenValueIsBlank": true},
            {"argumentName": "excludeSamplerSamples", "element": "checkbox1", "notAddWhenValueIsBlank": true},
            {"argumentName": "excludeReadingNotEntered", "element": "checkbox2", "notAddWhenValueIsBlank": true},
            {"argumentName": "samplingDayStart", "element": "daterange1dateStart", "notAddWhenValueIsBlank": true},
            {"argumentName": "samplingDayEnd", "element": "daterange1dateEnd", "notAddWhenValueIsBlank": true},
            {"argumentName": "readingEqual", "element": "number1", "notAddWhenValueIsBlank": true},
            {"argumentName": "readingMin", "element": "number2", "notAddWhenValueIsBlank": true},
            {"argumentName": "readingMax", "element": "number3", "notAddWhenValueIsBlank": true},
            {"argumentName": "includeMicroorganisms", "element": "checkbox3", "notAddWhenValueIsBlank": true},
            {"argumentName": "MicroorganismsToFind", "element": "text5", "notAddWhenValueIsBlank": true}
          ]      
        },
        "reportElements":[
          [
            {"type": "reportTitle", "title":{"label_en": "Production Lot", "label_es": "Lote de Producción"},
              "style":"color:blue"}
          ],
          [
            {"type": "card", "title":{"label_en": "Information", "label_es": "Información"}, 
              "elementName":"production_lot", "subheadingObj": "text1"}
          ],
          [
            {"type": "recovery_rate"}
          ],
          [
            {"type": "grid", "title":{"label_en": "Info Matching Selection Criteria", "label_es": "Información cumpliendo el criterio de selección"}, 
             "elementName": "datatable", "fieldsToDisplay":[
                {"property": "program_name", "header": "Program"}, 
                {"property": "location_name", "header": "Location"}, 
                {"property": "area", "header": "Area"}, 
                {"property": "shift", "header": "shift"}, 
                {"property": "sampling_date", "header": "Sampling Date"}, 
                {"property": "raw_value_num", "header": "Value"}, 
                {"property": "spec_eval_detail", "header": "Spec Eval"}
             ] 
            }          
          ]          
        ]
      },
      { "action": "RECOVERY_RATE",
        "label_en": "Recovery Rate", 
        "label_es": "Recovery Rate", 
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter":{
          "filterFields":[
            {"checkbox1": { "label_en": "Show Row Totals", "label_es": "Mostrar Totales", "default_value": true }},
            {"checkbox2": { "label_en": "Show Absences", "label_es": "Mostrar Ausencias", "default_value": true }},
            {"checkbox3": { "label_en": "Show Presences", "label_es": "Mostrar Presencias", "default_value": true }},
            {"checkbox4": { "label_en": "Show INs", "label_es": "Mostrar INs", "default_value": true }},
            {"checkbox5": { "label_en": "Show OUTs", "label_es": "Mostrar OUTs", "default_value": true }},
            {"number1": { "label_en": "Perc Num Decs", "label_es": "Num Decimales Perc", "default_value": 2 }}
          ],
          "endPointParams": [
			{"argumentName": "fieldsToRetrieveOrGrouping", "fixValue": "program_name|location_name"},
			{"argumentName": "whereFieldsName", "fixValue": "sample_config_code|program_name"},
			{"argumentName": "whereFieldsValue", "fixValue": "program_smp_template*STRING|LlenadoVialesFA2018*STRING"},
			
            {"argumentName": "showRowTotal", "element": "checkbox1"},
            {"argumentName": "showAbsence", "element": "checkbox2"},
            {"argumentName": "showPresence", "element": "checkbox3"},
            {"argumentName": "showIN", "element": "checkbox4"},
            {"argumentName": "showOUT", "element": "checkbox5"},
            {"argumentName": "percNumDecimals", "element": "number1"}
          ]      
        },
        "printable": true,
        "download":{
          "active": true,
          "elements":[
            {"elementName": "recovery_rate", "header": "columns_data", "values":"data"}
          ] 
        },        
        "reportElements":[
          [
            {"type": "reportTitle", "title":{"label_en": "Recovery Rate", "label_es": "Recovery Rate"},
            "style":"color:blue"}
          ],
          [
            {"type": "recovery_rate"}
          ]
        ]
      },
      { "action": "QUERY_SAMPLER_SAMPLING_HISTORY",
        "label_en": "Personal Sampling History", 
        "label_es": "Histórico de muestreos de personal", 
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter":{
          "filterFields":[
            {"text1": { "label_en": "Sampler Name", "label_es": "Muestreador", "default_value": "" }},
            {"listMDSamplerPersonalAreas": { "label_en": "Sampler Area", "label_es": "Area Muestreada", "default_value": "" }},
            {"text3": { "label_en": "Program", "label_es": "Programa", "default_value": "" }},
            {"text4": { "label_en": "Location", "label_es": "Ubicación", "default_value": "" }},
            {"text5": { "label_en": "Location Area", "label_es": "Area de la ubicacion", "default_value": "" }},
            {"checkbox1": { "label_en": "Include Samples", "label_es": "Incluir Muestreo Ubicaciones", "default_value": true }},
            {"checkbox2": { "label_en": "Include Sampler Samples", "label_es": "Incluir Muestreos de Personal", "default_value": false }},
            {"daterange1":
              {
              "dateStart":{ "label_en": "Sampling Start Date", "label_es": "Fecha Inicio Muestreo", "default_value": "" },
              "dateEnd":{ "label_en": "Sampling End Date", "label_es": "Fecha Fin Muestreo", "default_value": "" }
              }
            },
            {"checkbox3": { "label_en": "Exclude Readings Not Entered Yet", "label_es": "Excluir Lecturas no entradas aún", "default_value": true }},
            {"number1": { "label_en": "Only readings Equal to", "label_es": "Solo las lecturas igual a", "default_value": "" }},
            {"number2": { "label_en": "Only readings Greater than", "label_es": "Solo las lecturas Mayores a", "default_value": "" }},
            {"number3": { "label_en": "Only readings Less than", "label_es": "Solo las lecturas Menores a", "default_value": "" }},
            {"checkbox4": { "label_en": "Include Microorganisms", "label_es": "Incluir Microorganismos", "default_value": false }},
            {"text6": { "label_en": "Microorganisms to find", "label_es": "Microorganismos a encontrar", "default_value": "" }}
          ],
          "endPointParams": [
		  {"argumentName": "sampleGroups", "fixValue": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|area*counter_by_area|has_pre_invest*counter_out|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"},
		  {"argumentName": "includeSamplerSamples", "fixValue": "true"},
		  {"argumentName": "includeSamples", "fixValue": "false"},
		  
            {"argumentName": "samplerName", "element": "text1"},
            {"argumentName": "samplerArea", "element": "listMDSamplerPersonalAreas"},
            {"argumentName": "programName", "element": "text3"},
            {"argumentName": "locationName", "element": "text4"},
            {"argumentName": "area", "element": "text5"},
            {"argumentName": "includeSamplerSamples", "element": "checkbox1"},
            {"argumentName": "includeSamplerSamples", "element": "checkbox2"},
            {"argumentName": "excludeReadingNotEntered", "element": "checkbox3"},
            {"argumentName": "samplingDayStart", "element": "daterange1dateStart"},
            {"argumentName": "samplingDayEnd", "element": "daterange1dateEnd"},
            {"argumentName": "readingEqual", "element": "number1"},
            {"argumentName": "readingMin", "element": "number2"},
            {"argumentName": "readingMax", "element": "number3"},
            {"argumentName": "includeMicroorganisms", "element": "checkbox4"},
            {"argumentName": "MicroorganismsToFind", "element": "text6"}
          ]      
        },
        "printable": true,
        "download":{
          "active": true,
          "elements":[
            {"elementName": "datatable"}
          ] 
        },
        "reportElements":[
          [
            {"type": "reportTitle", "title":{"label_en": "Personal Sampling History", "label_es": "Histórico de muestreos de personal"}}
          ],
          [
            {"type": "card", "title":{"label_en": "Information", "label_es": "Información"}, 
              "elementName":"production_lot", "subheadingObj": "text1"}
          ],
          [
            {"type": "chart", "elementName": "counter_range_eval",
              "display_chart": true,
              "chart_type":"pie",
              "chart_name":"counter_range_eval",
              "chart_title":{"label_en": "Per out of range type", "label_es":"Por tipo de fuera de rango"},
              "counter_field_name":"count",
              "counterLimits":{
                "xmin_allowed": 3,
                "xmin_allowed_included":3,
                "xmax_allowed":100,
                "xmax_allowed_included":100,
                "xvalue":0
              },
              "chartStyle": {
                "backgroundColor": "transparent",
                "is3D": true,
                "colors": ["#dfa942", "#d33737", "#bf120f"]              
              },
              "grouper_field_name":"spec_eval",
              "label_values_replacement":{
                "IN":{"label_es": "In Range", "label_en": "Dentro de Range"},
                "inAlertMax": {"label_es": "Por Encima del límite de alerta", "label_en": "Over the Alert limit"},
                "outOfSpecMax": {"label_es": "Fuera de Rango", "label_en": "Over the Range"},
                "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
              },
              "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
              "label_item":{"label_en":"Statussss", "label_es":"Estado"},
              "label_value":{"label_en":"#", "label_es":"#"}   
            },
            {"type": "chart", "elementName": "counter_by_area_spec_tmp",

              "display_chart": true,
              "chart_type":"pie",
              "chart_name":"counter_by_area_spec_tmp",
              "chart_title":{"label_en": "Per Area and Spec", "label_es":"Por Area y Especificación"},
              "counter_field_name":"count",
              "counterLimits":{
                "xmin_allowed": 3,
                "xmin_allowed_included":3,
                "xmax_allowed":100,
                "xmax_allowed_included":100,
                "xvalue":0
              },
              "chartStyle": {
                "backgroundColor": "transparent",
                "is3D": true,
                "colors": ["#1b7fcc", "#5fbd5f", "#bf120f"]              
              },
              "grouper_field_name":"sample_config_code",
              "label_values_replacement":{
                "prog_pers_template": {"label_es": "Personal", "label_en": "Personnel"},
                "program_smp_template": {"label_es": "Muestras", "label_en": "Samples"},
                "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
              },
              "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
              "label_item":{"label_en":"Statussss", "label_es":"Estado"},
              "label_value":{"label_en":"#", "label_es":"#"}   
            }
        ],
        [
          {"type": "grid", "title":{"label_en": "Info Matching Selection Criteria", "label_es": "Información cumpliendo el criterio de selección"}, 
           "elementName": "datatable", "fieldsToDisplay":[
              {"property": "sampler", "header": "Sampler"},
              {"property": "sampler_area", "header": "Sampler Area"},
              {"property": "program_name", "header": "Program"}, 
              {"property": "location_name", "header": "Location"}, 
              {"property": "area", "header": "Area"}, 
              {"property": "shift", "header": "shift"}, 
              {"property": "sampling_date", "header": "Sampling Date"}, 
              {"property": "raw_value_num", "header": "Value"}, 
              {"property": "spec_eval_detail", "header": "Spec Eval"}
           ] 
          }          
        ]
        ]
      },
      { "action": "QUERY_INVESTIGATION",
        "label_en": "Investigations History", 
        "label_es": "Histórico Investigaciones", 
        "endPoint": "/moduleenvmon/EnvMonAPIstats",
        "filter":{
          "fixParams": {
            "investigationGroups": "capa_required*capa_or_not"
          },
          "filterFields":[
            {"checkbox1": { "label_en": "Exclude In Progress ones", "label_es": "Excluir En Curso"}, "default_value": true },
            {"daterange1":
              {
              "dateStart":{ "label_en": "Creation Start Date", "label_es": "Inicio Rango Creación", "default_value": "" },
              "dateEnd":{ "label_en": "Creation End Date", "label_es": "Fin Rango Creación", "default_value": "" }
              }
            },
            {"daterange2":
              {
              "dateStart":{ "label_en": "Closure Start Date", "label_es": "Inicio Rango Cierre", "default_value": "" },
              "dateEnd":{ "label_en": "Closure End Date", "label_es": "Fin Rango Cierre", "default_value": "" }
              }
            }
          ],
          "endPointParams": [
            {"argumentName": "excludeNotClosedYet", "element": "checkbox1"},
            {"argumentName": "creationDayStart", "element": "daterange1dateStart"},
            {"argumentName": "creationDayEnd", "element": "daterange1dateEnd"},
            {"argumentName": "closureDayStart", "element": "daterange2dateStart"},
            {"argumentName": "closureDayEnd", "element": "daterange2dateEnd"}
          ]      
        },
        "reportElements":[
          [
            {"type": "grid", "title":{"label_en": "Info Matching Selection Criteria", "label_es": "Información cumpliendo el criterio de selección"}, 
             "elementName": "datatable", "fieldsToDisplay":[
                {"property": "id", "header": "Id"}, 
                {"property": "created_on", "header": "Creation", "label_es":"Creación"}, 
                {"property": "created_by", "header": "By"}, 
                {"property": "closed_on", "header": "Closed"}, 
                {"property": "closed_by", "header": "By"}, 
                {"property": "external_system_name", "header": "External System Name"},
                {"property": "external_system_id", "header": "Id"}, 
                {"property": "capa_required", "header": "Capa Required"}, 
                {"property": "capa_decision_by", "header": "Capa Decision By"},
                {"property": "capa_decision_on", "header": "On"},
                {"property": "capa_external_system_id", "header": "External CAPA Systema Name"}, 
                {"property": "capa_external_system_name", "header": "Id"}
             ] 
            }          
          ],
  
          [
          {"type": "reportTitle", "title":{"label_en": "Investigations History", "label_es": "Histórico Investigaciones"}}
          ],
          [
          {"type": "chart", "elementName": "capa_or_not",

            "display_chart": true,
            "chart_type":"pie",
            "chart_name":"capa_or_not",
            "chart_title":{"label_en": "Per CAPA Required", "label_es":"Por CAPA necesario"},
            "counter_field_name":"count",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#dfa942", "#d33737", "#bf120f"]              
            },
            "grouper_field_name":"capa_required",
            "label_values_replacement":{
              "inAlertMax": {"label_es": "Por Encima del límite de alerta", "label_en": "Over the Alert limit"},
              "outOfSpecMax": {"label_es": "Fuera de Rango", "label_en": "Over the Range"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          }
        ]
        ]
      }
    ]
  },   
  "Browser": {
	"component": "DataMining",
    "tabs": [
      { "action": "GET_SAMPLE_STAGES_SUMMARY_REPORT",
        "label_en": "Sample", 
        "label_es": "Muestras", 
        "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
        "filter":{
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields":[
            {"text1": { "label_en": "Sample", "label_es": "Muestra", "default_value": "2029" }}
          ],
          "endPointParams": [
            {"argumentName": "sampleId", "element": "text1"},
			{"argumentName": "sampleFieldToRetrieve", "fixValue": "ALL"},
			{"argumentName": "sampleFieldsToDisplay", "fixValue": "current_stage|program_name|location_name|product_lot|shift"}
          ]      
        },
        "printable": {
			"active": true,
			"reportTitle":{"label_en": "Report for sample", "label_es": "Informe de muestra"},
			"printableTitleContent": "EnvMonAirSampleReportTitle",
			"printableContent": "EnvMonAirSampleReportContent"
		},
        "download":{
          "active": false, 
          "elements":[
            {"elementName": "datatable"}
          ] 
        },

        "reportElements":[  
			[{"type": "Report", "reportModel": "EnvMonAirSampleBrowser"}]	  
        ]        
      },
      { "action": "GET_INCUBATOR_REPORT",
        "label_en": "Incubator", 
        "label_es": "Incubadora", 
        "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
        "filter":{
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields":[
            {"text1": { "label_en": "Incubator", "label_es": "Incubadora", "default_value": "INC_1" }},
            {"daterange1":
              {
              "dateStart":{ "label_en": "Sampling Start Date", "label_es": "Fecha Inicio Muestreo", "default_value": "" },
              "dateEnd":{ "label_en": "Sampling End Date", "label_es": "Fecha Fin Muestreo", "default_value": "" }
              }
            }
          ],
          "endPointParams": [
            {"argumentName": "incubatorName", "element": "text1"},
            {"argumentName": "startDate", "element": "daterange1dateStart"},
            {"argumentName": "endDate", "element": "daterange1dateEnd"},	
			{"argumentName": "incubatorFieldsToDisplay", "fixValue": "ALL"}
          ]      
        },
        "printable": {
			"active": true,
			"reportTitle":{"label_en": "Report for sample", "label_es": "Informe de muestra"},
			"printableTitleContent": "incubatorContentTitle",
			"printableContent": "EnvMonAirIncubatorReportContent"
		},
        "download":{
          "active": false, 
          "elements":[
            {"elementName": "datatable"}
          ] 
        },

        "reportElements":[
          [{"type": "Report", "reportModel": "EnvMonAirIncubatorBrowser"}],
          [
          {"type": "chart", "elementName": "lastTemperatureReadings",

            "display_chart": true,
            "chart_type":"line",
            "chart_name":"lastTemperatureReadings",
            "chart_title":{"label_en": "Per out of range type", "label_es":"Por tipo de fuera de rango"},
            "counter_field_name":"count",
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#dfa942", "#d33737", "#bf120f"]              
            },
            "grouper_field_name":"spec_eval",
            "label_values_replacement":{
              "IN":{"label_es": "In Range", "label_en": "Dentro de Range"},
              "inAlertMax": {"label_es": "Por Encima del límite de alerta", "label_en": "Over the Alert limit"},
              "outOfSpecMax": {"label_es": "Fuera de Rango", "label_en": "Over the Range"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          }
		  ]		 
        ]        
      },
      { "action": "GET_BATCH_REPORT",
        "label_en": "Batch", 
        "label_es": "Tanda", 
        "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
        "filter":{
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields":[
            {"text1": { "label_en": "Sample", "label_es": "Muestra", "default_value": "" }}
          ],
          "endPointParams": [
            {"argumentName": "batchName", "element": "text1"},
			{"argumentName": "sampleFieldToRetrieve", "fixValue": "ALL"},
			{"argumentName": "sampleFieldsToDisplay", "fixValue": "current_stage|program_name|location_name|product_lot|shift"}
          ]      
        },
        "printable": {
			"active": true,
			"reportTitle":{"label_en": "Report for sample", "label_es": "Informe de muestra"},
			"printableTitleContent": "EnvMonAirSampleReportTitle",
			"printableContent": "EnvMonAirBatchReportContent"
		},
        "download":{
          "active": false, 
          "elements":[
            {"elementName": "datatable"}
          ] 
        },

        "reportElements":[
          [{"type": "Report", "reportModel": "EnvMonAirBatchBrowser"}]                   
        ]        
      },
	  { "action": "GET_PRODLOT_REPORT",
        "label_en": "Production Lot", 
        "label_es": "Lote Producido", 
        "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
        "filter":{
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
          "filterFields":[
            {"text1": { "label_en": "Lot", "label_es": "Lote", "default_value": "demo" }}
          ],
          "endPointParams": [
            {"argumentName": "lotName", "element": "text1"},
			{"argumentName": "prodLotFieldToRetrieve", "fixValue": "ALL"},
			{"argumentName": "prodLotFieldsToDisplay", "fixValue": "ALL"},
			{"argumentName": "sampleFieldToRetrieve", "fixValue": "ALL"},
			{"argumentName": "sampleFieldsToDisplay", "fixValue": "ALL"},
			{"argumentName": "sampleGroups", "fixValue": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|area*counter_by_status"}
          ]      
        },
        "printable": {
			"active": true,
			"reportTitle":{"label_en": "Report for sample", "label_es": "Informe de muestra"},
			"printableTitleContent": "EnvMonProductionLotReportTitle",
			"printableContent": "EnvMonProductionLotReportContent"
		},
        "download":{
          "active": false, 
          "elements":[
            {"elementName": "datatable"}
          ] 
        },

        "reportElements":[
          [{"type": "Report", "reportModel": "EnvMonProductionLotBrowser"}]                   
        ]        
      }
    ]
  },   
  "SchedSamples": {
    "component": "ObjectByTabs",
    "hasOwnComponent": true,
    "showTitleOnTop": true,
    "title": {
      "fix_text_en": "Scheduled Samples Report",
      "fix_text_es": "Informe de Muestras Programadas"      
    },
    "viewQuery": {
      "actionName": "GET_SCHEDULED_SAMPLES",
	  "endPoint": "/moduleenvmon/EnvMonAPIqueries",
	  "notUseGrid": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": false
      },
      "endPointParams": [
        {		
          "argumentName": "loginDayStart",
		  "internalVariableSimpleObjName": "filterCurrentData",
          "internalVariableSimpleObjProperty": "filterdaterange1dateStart"          
        },
        {		
          "argumentName": "loginDayEnd",
		  "internalVariableSimpleObjName": "filterCurrentData",
          "internalVariableSimpleObjProperty": "filterdaterange1dateEnd"          
        }
      ]
    },
    "filter_button": {
      "label_en": "Search",
      "label_es": "Buscar"
    },
    "filter": [
		{"filterdaterange1":
		  {
		  "dateStart":{ "label_en": "Sampling Start Date", "label_es": "Fecha Inicio Muestreo", "default_value": "2022-08-29" },
		  "dateEnd":{ "label_en": "Sampling End Date", "label_es": "Fecha Fin Muestreo", "default_value": "2023-08-29" }
		  }
		}
    ],
	"xxxfilterResultDetail":{
		"type":"list",
		"detail":[
			{"field": "date"}
      ]  		
	},
	"printable": {
		"active": true,
		"report_info":{
			"provisional_copy_en": "Provisional Copy", "provisional_copy_es": "Copia Provisional"
		}
	},
	"download":{
	  "active": true,
	  "filename":{"label_en": "sched_samples", "label_es": "muestras_programadas"},
	  "elements":[
		{"endPointPropertyArray": ["datatable"]}
	  ], 
	  "fileHeader":{
		  "traceabilityInfoTitle":{"label_en": "Traceability Info: ", "label_es":"Informacion de Trazabilidad:"},
		  "filterTitle":{"label_en": "Filter Criteria:", "label_es":"Criterio del filtro:"},
		  "dataTitle":{"label_en": "Data:", "label_es":"Datos:"},
		  "system":{"label_en": "Platform", "label_es":"Plataforma"},
		  "procedure":{"label_en": "Procedure", "label_es":"Proceso"},
		  "reportName":{"label_en": "Report Name", "label_es":"Nombre del Informe"},
		  "userRun1":{"label_en": "This file was created on ", "label_es":"Informe creado el "},
		  "userRun2":{"label_en": " by ", "label_es":" por "}
	  }
	},	
    "actions": [],
    "tabs": [
      { "tabLabel_en": "Summary", "tabLabel_es": "Inicio", "view": "summary",
        "view_definition": [
		  {   
            "actions": [
            ]
          },
          { "type": "readOnlyTable", "endPointResponseObject": "datatable",
            "columns": [
              {
                "name": "program_name",
                "label_en": "Program",
                "label_es": "Programa"
              },
              {
                "name": "area",
                "label_en": "Area",
                "label_es": "Area"
              },
              {
                "name": "location_name",
                "label_en": "Location",
                "label_es": "Ubicación"
              },
			  {
				"name": "spec_variation_name",
				"label_en": "Variation",
				"label_es": "Variación"
			  },
              {
                "name": "date",
                "label_en": "Date",
                "label_es": "Fecha"
              },
              {
                "name": "recursive_id",
                "label_en": "id",
                "label_es": "id"
              },
			  {
				"name": "requires_person_ana",
				"label_en": "Requires Pers Ana",
				"label_es": "Requiere an. personal"
			  }
            ]
          }
        ]
      }
    ]
  }, 
  "SampleStageTimingCapture": {
    "component": "ObjectByTabs",
    "hasOwnComponent": true,
    "showTitleOnTop": true,
    "title": {
      "fix_text_en": "Sample stages timing monitoring",
      "fix_text_es": "Monitoreo de tiempos en etapas de muestras"      
    },
    "viewQuery": {
      "actionName": "GET_STAGES_TIMING_CAPTURE_DATA",
	  "endPoint": "/moduleenvmon/EnvMonAPIqueries",
	  "notUseGrid": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": false
      },
      "endPointParams": [
        {		
          "argumentName": "loginDayStart",
		  "internalVariableSimpleObjName": "filterCurrentData",
          "internalVariableSimpleObjProperty": "filterdaterange1dateStart"          
        },
        {		
          "argumentName": "loginDayEnd",
		  "internalVariableSimpleObjName": "filterCurrentData",
          "internalVariableSimpleObjProperty": "filterdaterange1dateEnd"          
        }
      ]
    },
    "filter_button": {
      "label_en": "Search",
      "label_es": "Buscar"
    },
    "filter": [
		{"filterdaterange1":
		  {
		  "dateStart":{ "label_en": "Sampling Start Date", "label_es": "Fecha Inicio Muestreo", "default_value": "2022-08-29" },
		  "dateEnd":{ "label_en": "Sampling End Date", "label_es": "Fecha Fin Muestreo", "default_value": "2023-08-29" }
		  }
		}
    ],
	"xxxfilterResultDetail":{
		"type":"list",
		"detail":[
			{"field": "date"}
      ]  		
	},
	"printable": {
		"active": false,
		"report_info":{
			"provisional_copy_en": "Provisional Copy", "provisional_copy_es": "Copia Provisional"
		}
	},
	"download":{
	  "active": false,
	  "filename":{"label_en": "sched_samples", "label_es": "muestras_programadas"},
	  "elements":[
		{"endPointPropertyArray": ["datatable"]}
	  ], 
	  "fileHeader":{
		  "traceabilityInfoTitle":{"label_en": "Traceability Info: ", "label_es":"Informacion de Trazabilidad:"},
		  "filterTitle":{"label_en": "Filter Criteria:", "label_es":"Criterio del filtro:"},
		  "dataTitle":{"label_en": "Data:", "label_es":"Datos:"},
		  "system":{"label_en": "Platform", "label_es":"Plataforma"},
		  "procedure":{"label_en": "Procedure", "label_es":"Proceso"},
		  "reportName":{"label_en": "Report Name", "label_es":"Nombre del Informe"},
		  "userRun1":{"label_en": "This file was created on ", "label_es":"Informe creado el "},
		  "userRun2":{"label_en": " by ", "label_es":" por "}
	  }
	},	
    "actions": [],
    "tabs": [
      { "tabLabel_en": "Summary", "tabLabel_es": "Inicio", "view": "summary",
        "view_definition": [
		  {"type": "reportTitle",
			  "title": {
				"label_en": "Predictive for the end-to-end process",
				"label_es": "Predicción para el proceso entero"
			  },
			"elements": [
			{
			  "type": "cardSomeElementsSingleObject",
			  "endPointResponseObject": "statistics_per_end_to_end_sample_process",			  
			  "num_columns": 2,
			  "fieldsToDisplay": [
				{
				  "name": "values_in",
				  "label_en": "Values expressed in",
				  "label_es": "Valores expresados en"
				},
				{
				  "name": "estimated_range",
				  "label_en": "Estimated range",
				  "label_es": "Rango estimado"
				},
				{
				  "name": "mean",
				  "label_en": "Mean",
				  "label_es": "Media"
				},
				{
				  "name": "median",
				  "label_en": "Median",
				  "label_es": "Mediana"
				},
				{
				  "name": "mad_variabilty",
				  "label_en": "MAD (Median Absolute Deviation)",
				  "label_es": "MAD (Desviación Absoluta Mediana)"
				},
				{
				  "name": "outlier_threshold",
				  "label_en": "Outlier Threshold",
				  "label_es": "Umbral de Valores Atípicos"
				},
				{
				  "name": "upperBound",
				  "label_en": "Upper Bound",
				  "label_es": " Límite Superior"
				},
				{
				  "name": "lowerBound",
				  "label_en": "Lower Bound",
				  "label_es": " Límite Inferior"
				}
			  ]
			}
			]
		  },
		  {"type": "reportTitle",
			  "title": {
				"label_en": "Predictive per Stage",
				"label_es": "Predicción por Etapa"
			  },
			"elements": [
			{
			  "type": "cardSomeElementsRepititiveObjects",
			  "endPointResponseObject": "statistics_per_stage",	
				"add_border": true,			  
			  "num_columns": 3,
			  "fieldsToDisplay": [
				{
				  "name": "stage",
				  "label_en": "Stage",
				  "label_es": "Etapa"
				},
				{
				  "name": "values_in",
				  "label_en": "Values expressed in",
				  "label_es": "Valores expresados en"
				},
				{
				  "name": "estimated_range",
				  "label_en": "Estimated range",
				  "label_es": "Rango estimado"
				},
				{
				  "name": "mean",
				  "label_en": "Mean",
				  "label_es": "Media"
				},
				{
				  "name": "median",
				  "label_en": "Median",
				  "label_es": "Mediana"
				},
				{
				  "name": "mad_variabilty",
				  "label_en": "MAD (Median Absolute Deviation)",
				  "label_es": "MAD (Desviación Absoluta Mediana)"
				},
				{
				  "name": "outlier_threshold",
				  "label_en": "Outlier Threshold",
				  "label_es": "Umbral de Valores Atípicos"
				},
				{
				  "name": "upperBound",
				  "label_en": "Upper Bound",
				  "label_es": " Límite Superior"
				},
				{
				  "name": "lowerBound",
				  "label_en": "Lower Bound",
				  "label_es": " Límite Inferior"
				}
			  ]
			}
			]
		  },
		
		  {   
            "actions": [
            ]
          },
          { "type": "readOnlyTable", "endPointResponseObject": "stage_timing_interval",
            "columns": [
              {
                "name": "stage",
                "label_en": "Stage",
                "label_es": "Etapa"
              },
              {
                "name": "sample_config_code",
                "label_en": "Sample Template",
                "label_es": "Plantilla de muestras"
              },
              {
                "name": "interval_seconds",
                "label_en": "Interval (sec)",
                "label_es": "Intervalo (seg)"
              },
			  {
				"name": "enabled",
				"label_en": "Enabled?",
				"label_es": "¿Activo?"
			  }
            ]
          },
          { "type": "readOnlyTable", "endPointResponseObject": "violations_percentage",
            "columns": [
              {
                "name": "stage",
                "label_en": "Stage",
                "label_es": "Etapa"
              },
              {
                "name": "percentage",
				"is_icon": true, "as_progress": true,
                "label_en": "Percentage",
                "label_es": "Porcentaje"
              },
              {
                "name": "total_sample_stages",
                "label_en": "Total Samples",
                "label_es": "Total muestras"
              },
			  {
				"name": "violated_sample_stages",
				"label_en": "Deviation samples",
				"label_es": "Muestras desviadas"
			  }
            ]
          },
          {"type": "chart", "elementName": "violations_percentage",
            "display_chart": true,
            "chart_type":"column",
            "chart_name":"violations_percentage",
            "chart_title":{"label_en": "Violations frequency", "label_es":"Frecuencia de desviaciones"},
            "counter_field_name":["percentage"],
            "counterLimits":{
              "xmin_allowed": 3,
              "xmin_allowed_included":3,
              "xmax_allowed":100,
              "xmax_allowed_included":100,
              "xvalue":0
            },
            "chartStyle": {
              "backgroundColor": "transparent",
              "is3D": true,
              "colors": ["#24C0EB", "#d33737", "#bf120f"]              
            },
            "grouper_field_name":"stage",
            "label_values_replacement":{
              "IN":{"label_es": "In Range", "label_en": "Dentro de Range"},
              "inAlertMax": {"label_es": "Por Encima del límite de alerta", "label_en": "Over the Alert limit"},
              "outOfSpecMax": {"label_es": "Fuera de Rango", "label_en": "Over the Range"},
              "outOfSpecMaxStrict": {"label_es": "Fuera de Rango", "label_en": "Over the Range"}
            },
            "grouper_exclude_items":["xxxxoutOfSpecMax", "Samplingzz","Incubationzz","PlateReadingzz","MicroorganismIdentificationzz","zz","END"],
            "label_item":{"label_en":"Statussss", "label_es":"Estado"},
            "label_value":{"label_en":"#", "label_es":"#"}   
          }
        ]
      }
    ]
  } 

}


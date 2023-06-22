export const AppProc = {
  "TrackingChanges":{
	  "version": 0.9,
	  "last change on (YYYYMMDD)": "20230321",
	  "last_change_note_20230321": "Responsible and Responsible_backup lists added to NEW_INSTRUMENT",
	  "last_change_note_20230226": "Added responsible and responsible_backup to the fieldName/Value argument",
	  "last_change_note_20230202": "Endpoint Params added for REOPEN_EVENT",
	  "last_change_note_20230201": "Added addBlankValueOnTop a true for list Family at Instrument Management",
	  "last_change_note_20221126_2": "Added Reopen Instrument button",
	  "last_change_note_20221126": "Family on newInstrument be optional",
	  "last_change_note_20221116": "Enter Results button hide dynamically in INSTRUMENT_EVENT_VARIABLES",
	  "last_change_note_20221112": "Added a button for each instrument completition",
	  "last_change_note_20221106": "Commented objects have been removed",
	  "last_change_note_20221013": "Grid header changed to show the value is_locked instead of locking_reason",
      "last_change_note_20221012": "Added first fix for enter results",
	  "last_change_note_20220926": "Enter Results, removed the button that causes the view to be locked",
	  "last_change_note_20220925": "requiresGridItemSelected set to false for NEW_INSTRUMENT",
	  "last_change_note_20220922": "Modified Decomission and Undecommision button for Instruments",
	  "last_change_note": "replace whenDisabled by requiresGridItemSelected",
	  "last change note_20220918": "fixed about some endpoints still using the old naming convention, frontend instead of the new one, actions/queries"
  },	
  "ModuleSettings":{
	  "actionsEndpoints":[
		{ "name": "Instruments" , "url" : "/app/procs/InstrumentsAPIactions"}
	  ],
	  "queriesEndpoints":[
		{ "name": "InventoryLot" , "url" : "/app/procs/InstrumentsAPIqueries"}
	  ]
  },
  "PlatformInstruments": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "InstrumentsList": {
          "label_en": "Active Instruments",
          "label_es": "Instrumentos activos"
        }
      },
      "gridHeader": {
        "name": {
          "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "family": {
          "label_en": "Family", "label_es": "Familia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "on_line": {
          "label_en": "On Line", "label_es": "En Linea", "sort": false, "filter": true, "is_icon": true, "width": "10%"
        },
        "model_number": {
          "label_en": "Model N.", "label_es": "N. Modelo", "sort": false, "filter": true, "width": "10%"
        },
        "serial_number": {
          "label_en": "Serial N.", "label_es": "N. Serie", "sort": false, "filter": true, "width": "10%"
        },
        "supplier": {
          "label_en": "Supplier", "label_es": "Proveedor", "sort": false, "filter": true, "width": "10%"
        },
        "manufacturer": {
          "label_en": "Manufacturer", "label_es": "fabricante", "sort": false, "filter": true, "width": "10%"
        },
        "created_on": {
          "label_en": "Creation", "label_es": "Creación", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
		"is_locked": {
          "label_en": "Is locked?", "label_es": "¿Bloqueado?", "sort": false, "filter": false, "is_icon": false, "width": "10%"
       },
        "detail": {
          "label_en": "Detail", "label_es": "Detalle", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "last_calibration": {
          "label_en": "Last Cal", "label_es": "Última Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "next_calibration": {
          "label_en": "Next Cal", "label_es": "Próxima Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "last_prev_maint": {
          "label_en": "Last PM", "label_es": "Último MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "next_prev_maint": {
          "label_en": "Next PM", "label_es": "Próximo MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        }
      }
    },
    "viewQuery":{ "actionName": "ACTIVE_INSTRUMENTS_LIST",
      "clientMethodxxx": "getSamples",
      "endPoint": "/app/procs/InstrumentsAPIqueries",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      }
    },
    "actions": [
		{"actionName": "NEW_INSTRUMENT",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "instrumentName", "element": "text1", "defaultValue": "" },
          { "argumentName": "familyName", "element": "list1", "defaultValue": "" },
          { "argumentName": "modelNumber", "element": "text2", "defaultValue": "" },
          { "argumentName": "supplierName", "element": "list2", "defaultValue": "" },
          { "argumentName": "serialNumber", "element": "text3", "defaultValue": "" },
          { "argumentName": "manufacturerName", "element": "list3", "defaultValue": "" },
		  { "argumentName": "responsible", "element": "list4", "defaultValue": "", "addToFieldNameAndValue": true, "notAddWhenValueIsBlank": true, "isAdhocField": true},
		  { "argumentName": "responsible_backup", "element": "list5", "defaultValue": "", "addToFieldNameAndValue": true, "notAddWhenValueIsBlank": true, "isAdhocField": true},
          { "argumentName": "poDate", "element": "date1", "defaultValue": "" },
          { "argumentName": "installationDate", "element": "date2", "defaultValue": "" }
        ],
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
			{"text1": { "label_en": "New Instrument Name", "label_es": "Nombre para nuevo instrumento" }},
			{"list1": { 
              "items": [
                { "keyName": "familyCorrecto", "keyValue_en": "Correct", "keyValue_es": "Correcto" },
                { "keyName": "familyIntentObs", "keyValue_en": "Attempt-Obs", "keyValue_es": "Intent-Obs" },
                { "keyName": "familyObsCorrecto", "keyValue_en": "Correct-Obs", "keyValue_es": "Correcto-Obs" },
                { "keyName": "familyObsIntentosCorrecto", "keyValue_en": "Corr-Attempt-Obs", "keyValue_es": "Corr-Intent-Obs" },
                { "keyName": "familyObsIntentoCorrectoTerminado", "keyValue_en": "Corr-Attempt-Obs-End", "keyValue_es": "Corr-Intent-Obs-Term" }
              ],    
              "label_en": "Family", "label_es": "Familia", "optional": true,
			  "addBlankValueOnTop": true
            }},
            {"text2": { "label_en": "Model Number", "label_es": "Modelo" }},
			{"list2": { 
              "items": [
                { "keyName": "LEICA", "keyValue_en": "Leica Biosystems", "keyValue_es": "Leica Biosystems" },                
                { "keyName": "PB INSTRUMENTS", "keyValue_en": "PB Instruments", "keyValue_es": "PB Instruments" },                
                { "keyName": "METTLER", "keyValue_en": "Mettler Toledo", "keyValue_es": "Mettler Toledo" },
                { "keyName": "PERKIN ELMER", "keyValue_en": "Perkin Elmer", "keyValue_es": "Perkin Elmer" },
                { "keyName": "AGILENT", "keyValue_en": "Agilent", "keyValue_es": "Agilent" },
                { "keyName": "WATERS", "keyValue_en": "Waters", "keyValue_es": "Water" }
              ],    
              "label_en": "Supplier", "label_es": "Proveedor" 
            }},
            {"text3": { "label_en": "Serial Number", "label_es": "Número de Serie" }},
			{"list3": { 
              "items": [
                { "keyName": "METTLER", "keyValue_en": "Mettler Toledo", "keyValue_es": "Mettler Toledo" },
                { "keyName": "PERKIN ELMER", "keyValue_en": "Perkin Elmer", "keyValue_es": "Perkin Elmer" },
                { "keyName": "AGILENT", "keyValue_en": "Agilent", "keyValue_es": "Agilent" },
                { "keyName": "WATERS", "keyValue_en": "Waters", "keyValue_es": "Water" }               
              ],    
              "label_en": "ManufacturerName", "label_es": "Fabricante" 
            }},
			{"list4": {
			  "items": [
			  { "keyName": "responsible", "keyValue_en": "responsible", "keyValue_es": "responsible" }
			  ],
			  "label_en": "Responsible", "label_es": "Responsable", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"elementName":"list4",
				"propertyNameContainer": "users",
				"propertyNameContainerLevelPropertyKeyName": "user",
			    "propertyKeyName": "user", "propertyKeyValueEn": "user", "propertyKeyValueEs": "user"
			  }			
			}},
			{"list5": {
			  "items": [
			  { "keyName": "responsible_backup", "keyValue_en": "responsible_backup", "keyValue_es": "responsible_backup" }
			  ],
			  "label_en": "Responsible Backup", "label_es": "Backup del responsable", "optional": true,
			  "disableUntilFieldsEntered":["list4"],
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"elementName":"list5",
				"propertyNameContainer": "users",
				"propertyNameContainerLevelPropertyKeyName": "user",
			    "propertyKeyName": "user", "propertyKeyValueEn": "user", "propertyKeyValueEs": "user"
			  }			
			}},
            {"date1": {"label_en": "Purchase Date", "label_es": "Fecha Compra" }},
			{"date2": {"label_en": "Installation Date", "label_es": "Fecha Instalación" }}
          ]
        }
      },
		{"actionName": "INSTRUMENT_AUDIT_FOR_GIVEN_INSTRUMENT",	  
		"requiresDialog": true,
		"endPoint": "/app/procs/InstrumentsAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Instrument Audit", "label_es": "Auditoría de Instrumento"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "INSTRUMENTAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "secondaryActionToPerform": {
				  "name": "getObjectAuditInfo",
				  "endPointParams": [
					{ "argumentName": "instrumentName", "selObjectPropertyName": "name" }
				  ]
			  },
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
				{ "argumentName": "instrumentName", "selObjectPropertyName": "name" },
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
		{"actionName": "TURN_OFF_LINE",
		"requiresDialog": false,
        "button": {
          "img": "deactivate.svg",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true,
          "showWhenSelectedItem": {
            "column": "on_line",
            "value": true
          }
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "TURN_ON_LINE",
		"requiresDialog": false,
        "button": {
          "img": "activate.svg",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          "requiresGridItemSelected": true,
          "showWhenSelectedItem": {
            "column": "on_line",
            "value": false
          }
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_CALIBRATION",
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_calibration.svg",
          "title": {
            "label_en": "Start Calibration", "label_es": "Iniciar Calibración"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_PREVENTIVE_MAINTENANCE" ,
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_preventive_maintenance.svg",
          "title": {
            "label_en": "Start Prev Maint", "label_es": "Iniciar Mant Prev"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_SERVICE",
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_service.svg",
          "title": {
            "label_en": "Start Service", "label_es": "Iniciar Servicio"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_VERIFICATION",
        "endPoint": "/app/procs/InstrumentsAPIactions",     
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_verification.svg",
          "title": {
            "label_en": "Start Verification", "label_es": "Iniciar Verificación"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "DECOMMISSION_INSTRUMENT",
        "endPoint": "/app/procs/InstrumentsAPIactions",     
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ],
		"requiresDialog": false,
        "button": {
          "icon": "alarm_off",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true
        }
      },
		{"actionName": "UNDECOMMISSION_INSTRUMENT",
        "endPoint": "/app/procs/InstrumentsAPIactions",  
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
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
			"objectName": { "label_en": "Instrument to reactivate", "label_es": "Lote de Producción a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"name",
            "eachEntryTextGenerator":[
              {"value": "Instrument: ", "type":"fix"}, {"value": "name", "type":"field"} 
            ]
          },
		  "viewQuery": {
			  "actionName": "DECOMISSIONED_INSTRUMENTS_LAST_N_DAYS",
			  "clientMethod": "getDeactivatedObjects",
			  "endPoint": "/app/procs/InstrumentsAPIqueries",
			  "endPointParams": [
				{ "argumentName": "numDays", "element": "queryNumDays", "fixValue": 7 }
			  ]
		  },
          "action": [            
          ]
        }
      }
    ]
  },
  "PlatformInstrumentsfamilyCorrecto": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "InstrumentsListFamilyCorrecto": {
          "label_en": "Active Instruments FamilyCorrecto",
          "label_es": "Instrumentos activos de FamilyCorrecto"
        }
      },
      "gridHeader": {
        "name": {
          "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "family": {
          "label_en": "Family", "label_es": "Familia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "on_line": {
          "label_en": "On Line", "label_es": "En Linea", "sort": false, "filter": true, "is_icon": true, "width": "10%"
        },
        "model_number": {
          "label_en": "Model N.", "label_es": "N. Modelo", "sort": false, "filter": true, "width": "10%"
        },
        "serial_number": {
          "label_en": "Serial N.", "label_es": "N. Serie", "sort": false, "filter": true, "width": "10%"
        },
        "supplier": {
          "label_en": "Supplier", "label_es": "Proveedor", "sort": false, "filter": true, "width": "10%"
        },
        "manufacturer": {
          "label_en": "Manufacturer", "label_es": "fabricante", "sort": false, "filter": true, "width": "10%"
        },
        "created_on": {
          "label_en": "Creation", "label_es": "Creación", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
		"is_locked": {
          "label_en": "Is locked?", "label_es": "¿Bloqueado?", "sort": false, "filter": false, "is_icon": false, "width": "10%"
       },
        "detail": {
          "label_en": "Detail", "label_es": "Detalle", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "last_calibration": {
          "label_en": "Last Cal", "label_es": "Última Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "next_calibration": {
          "label_en": "Next Cal", "label_es": "Próxima Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "last_prev_maint": {
          "label_en": "Last PM", "label_es": "Último MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "next_prev_maint": {
          "label_en": "Next PM", "label_es": "Próximo MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        }
      }
    },
    "viewQuery":{ "actionName": "ACTIVE_INSTRUMENTS_LIST",
      "endPoint": "/app/procs/InstrumentsAPIqueries",
	  "endPointParams": [
          { "argumentName": "familyName", "fixValue": "familyCorrecto"}
      ],
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      }
    },
    "actions": [
		{"actionName": "NEW_INSTRUMENT",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "instrumentName", "element": "text1", "defaultValue": "" },
          { "argumentName": "familyName", "fixValue": "familyCorrecto"},
          { "argumentName": "modelNumber", "element": "text2", "defaultValue": "" },
          { "argumentName": "supplierName", "element": "list2", "defaultValue": "" },
          { "argumentName": "serialNumber", "element": "text3", "defaultValue": "" },
          { "argumentName": "manufacturerName", "element": "list3", "defaultValue": "" },
		  { "argumentName": "responsible", "element": "list4", "defaultValue": "", "addToFieldNameAndValue": true},
		  { "argumentName": "responsible_backup", "element": "list5", "defaultValue": "", "addToFieldNameAndValue": true},
          { "argumentName": "poDate", "element": "date1", "defaultValue": "" },
          { "argumentName": "installationDate", "element": "date2", "defaultValue": "" }
        ],
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
			{"text1": { "label_en": "New Instrument Name", "label_es": "Nombre para nuevo instrumento" }},
            {"text2": { "label_en": "Model Number", "label_es": "Modelo" }},
			{"list2": { 
              "items": [
                { "keyName": "LEICA", "keyValue_en": "Leica Biosystems", "keyValue_es": "Leica Biosystems" },                
                { "keyName": "PB INSTRUMENTS", "keyValue_en": "PB Instruments", "keyValue_es": "PB Instruments" },                
                { "keyName": "METTLER", "keyValue_en": "Mettler Toledo", "keyValue_es": "Mettler Toledo" },
                { "keyName": "PERKIN ELMER", "keyValue_en": "Perkin Elmer", "keyValue_es": "Perkin Elmer" },
                { "keyName": "AGILENT", "keyValue_en": "Agilent", "keyValue_es": "Agilent" },
                { "keyName": "WATERS", "keyValue_en": "Waters", "keyValue_es": "Water" }
              ],    
              "label_en": "Supplier", "label_es": "Proveedor" 
            }},
            {"text3": { "label_en": "Serial Number", "label_es": "Número de Serie" }},
			{"list3": { 
              "items": [
                { "keyName": "METTLER", "keyValue_en": "Mettler Toledo", "keyValue_es": "Mettler Toledo" },
                { "keyName": "PERKIN ELMER", "keyValue_en": "Perkin Elmer", "keyValue_es": "Perkin Elmer" },
                { "keyName": "AGILENT", "keyValue_en": "Agilent", "keyValue_es": "Agilent" },
                { "keyName": "WATERS", "keyValue_en": "Waters", "keyValue_es": "Water" }               
              ],    
              "label_en": "ManufacturerName", "label_es": "Fabricante" 
            }},
			{"list4": {
			  "items": [
			  { "keyName": "responsible", "keyValue_en": "responsible", "keyValue_es": "responsible" }
			  ],
			  "label_en": "Responsible", "label_es": "Responsable", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"elementName":"list4",
				"propertyNameContainer": "users",
				"propertyNameContainerLevelPropertyKeyName": "user",
			    "propertyKeyName": "user", "propertyKeyValueEn": "user", "propertyKeyValueEs": "user"
			  }			
			}},
			{"list5": {
			  "items": [
			  { "keyName": "responsible_backup", "keyValue_en": "responsible_backup", "keyValue_es": "responsible_backup" }
			  ],
			  "label_en": "Responsible Backup", "label_es": "Backup del responsable", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"elementName":"list5",
				"propertyNameContainer": "users",
				"propertyNameContainerLevelPropertyKeyName": "user",
			    "propertyKeyName": "user", "propertyKeyValueEn": "user", "propertyKeyValueEs": "user"
			  }			
			}},
            {"date1": {"label_en": "Purchase Date", "label_es": "Fecha Compra" }},
			{"date2": {"label_en": "Installation Date", "label_es": "Fecha Instalación" }}
          ]
        }
      },
		{"actionName": "INSTRUMENT_AUDIT_FOR_GIVEN_INSTRUMENT",	  
		"requiresDialog": true,
		"endPoint": "/app/procs/InstrumentsAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Instrument Audit", "label_es": "Auditoría de Instrumento"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "INSTRUMENTAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "secondaryActionToPerform": {
				  "name": "getObjectAuditInfo",
				  "endPointParams": [
					{ "argumentName": "instrumentName", "selObjectPropertyName": "name" }
				  ]
			  },
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
				{ "argumentName": "instrumentName", "selObjectPropertyName": "name" },
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
		{"actionName": "TURN_OFF_LINE",
		"requiresDialog": false,
        "button": {
          "img": "deactivate.svg",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true,
          "showWhenSelectedItem": {
            "column": "on_line",
            "value": true
          }
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "TURN_ON_LINE",
		"requiresDialog": false,
        "button": {
          "img": "activate.svg",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          "requiresGridItemSelected": true,
          "showWhenSelectedItem": {
            "column": "on_line",
            "value": false
          }
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_CALIBRATION",
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_calibration.svg",
          "title": {
            "label_en": "Start Calibration", "label_es": "Iniciar Calibración"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_PREVENTIVE_MAINTENANCE" ,
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_preventive_maintenance.svg",
          "title": {
            "label_en": "Start Prev Maint", "label_es": "Iniciar Mant Prev"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_SERVICE",
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_service.svg",
          "title": {
            "label_en": "Start Service", "label_es": "Iniciar Servicio"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_VERIFICATION",
        "endPoint": "/app/procs/InstrumentsAPIactions",     
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_verification.svg",
          "title": {
            "label_en": "Start Verification", "label_es": "Iniciar Verificación"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "DECOMMISSION_INSTRUMENT",
        "endPoint": "/app/procs/InstrumentsAPIactions",     
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ],
		"requiresDialog": false,
        "button": {
          "icon": "alarm_off",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true
        }
      },
		{"actionName": "UNDECOMMISSION_INSTRUMENT",
        "endPoint": "/app/procs/InstrumentsAPIactions",  
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
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
			"objectName": { "label_en": "Instrument to reactivate", "label_es": "Lote de Producción a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"name",
            "eachEntryTextGenerator":[
              {"value": "Instrument: ", "type":"fix"}, {"value": "name", "type":"field"} 
            ]
          },
		  "viewQuery": {
			  "actionName": "DECOMISSIONED_INSTRUMENTS_LAST_N_DAYS",
			  "clientMethod": "getDeactivatedObjects",
			  "endPoint": "/app/procs/InstrumentsAPIqueries",
			  "endPointParams": [
				{ "argumentName": "numDays", "element": "queryNumDays", "fixValue": 7 },
				{ "argumentName": "family", "fixValue": "familyCorrecto"}
			  ]
		  },
          "action": [            
          ]
        }
      }
    ]
  },
  "PlatformInstrumentsfamilyIntentObs": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "InstrumentsListfamilyIntentObs": {
          "label_en": "Active Instruments familyIntentObs",
          "label_es": "Instrumentos activos de familyIntentObs"
        }
      },
      "gridHeader": {
        "name": {
          "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "family": {
          "label_en": "Family", "label_es": "Familia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "on_line": {
          "label_en": "On Line", "label_es": "En Linea", "sort": false, "filter": true, "is_icon": true, "width": "10%"
        },
        "model_number": {
          "label_en": "Model N.", "label_es": "N. Modelo", "sort": false, "filter": true, "width": "10%"
        },
        "serial_number": {
          "label_en": "Serial N.", "label_es": "N. Serie", "sort": false, "filter": true, "width": "10%"
        },
        "supplier": {
          "label_en": "Supplier", "label_es": "Proveedor", "sort": false, "filter": true, "width": "10%"
        },
        "manufacturer": {
          "label_en": "Manufacturer", "label_es": "fabricante", "sort": false, "filter": true, "width": "10%"
        },
        "created_on": {
          "label_en": "Creation", "label_es": "Creación", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
		"is_locked": {
          "label_en": "Is locked?", "label_es": "¿Bloqueado?", "sort": false, "filter": false, "is_icon": false, "width": "10%"
       },
        "detail": {
          "label_en": "Detail", "label_es": "Detalle", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "last_calibration": {
          "label_en": "Last Cal", "label_es": "Última Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "next_calibration": {
          "label_en": "Next Cal", "label_es": "Próxima Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "last_prev_maint": {
          "label_en": "Last PM", "label_es": "Último MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "next_prev_maint": {
          "label_en": "Next PM", "label_es": "Próximo MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        }
      }
    },
    "viewQuery":{ "actionName": "ACTIVE_INSTRUMENTS_LIST",
      "endPoint": "/app/procs/InstrumentsAPIqueries",
	  "endPointParams": [
          { "argumentName": "familyName", "fixValue": "familyIntentObs"}
      ],
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      }
    },
    "actions": [
		{"actionName": "NEW_INSTRUMENT",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "instrumentName", "element": "text1", "defaultValue": "" },
          { "argumentName": "familyName", "fixValue": "familyIntentObs"},
          { "argumentName": "modelNumber", "element": "text2", "defaultValue": "" },
          { "argumentName": "supplierName", "element": "list2", "defaultValue": "" },
          { "argumentName": "serialNumber", "element": "text3", "defaultValue": "" },
          { "argumentName": "manufacturerName", "element": "list3", "defaultValue": "" },
		  { "argumentName": "responsible", "element": "list4", "defaultValue": "", "addToFieldNameAndValue": true},
		  { "argumentName": "responsible_backup", "element": "list5", "defaultValue": "", "addToFieldNameAndValue": true},
          { "argumentName": "poDate", "element": "date1", "defaultValue": "" },
          { "argumentName": "installationDate", "element": "date2", "defaultValue": "" }
        ],
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
			{"text1": { "label_en": "New Instrument Name", "label_es": "Nombre para nuevo instrumento" }},
            {"text2": { "label_en": "Model Number", "label_es": "Modelo" }},
			{"list2": { 
              "items": [
                { "keyName": "LEICA", "keyValue_en": "Leica Biosystems", "keyValue_es": "Leica Biosystems" },                
                { "keyName": "PB INSTRUMENTS", "keyValue_en": "PB Instruments", "keyValue_es": "PB Instruments" },                
                { "keyName": "METTLER", "keyValue_en": "Mettler Toledo", "keyValue_es": "Mettler Toledo" },
                { "keyName": "PERKIN ELMER", "keyValue_en": "Perkin Elmer", "keyValue_es": "Perkin Elmer" },
                { "keyName": "AGILENT", "keyValue_en": "Agilent", "keyValue_es": "Agilent" },
                { "keyName": "WATERS", "keyValue_en": "Waters", "keyValue_es": "Water" }
              ],    
              "label_en": "Supplier", "label_es": "Proveedor" 
            }},
            {"text3": { "label_en": "Serial Number", "label_es": "Número de Serie" }},
			{"list3": { 
              "items": [
                { "keyName": "METTLER", "keyValue_en": "Mettler Toledo", "keyValue_es": "Mettler Toledo" },
                { "keyName": "PERKIN ELMER", "keyValue_en": "Perkin Elmer", "keyValue_es": "Perkin Elmer" },
                { "keyName": "AGILENT", "keyValue_en": "Agilent", "keyValue_es": "Agilent" },
                { "keyName": "WATERS", "keyValue_en": "Waters", "keyValue_es": "Water" }               
              ],    
              "label_en": "ManufacturerName", "label_es": "Fabricante" 
            }},
			{"list4": {
			  "items": [
			  { "keyName": "responsible", "keyValue_en": "responsible", "keyValue_es": "responsible" }
			  ],
			  "label_en": "Responsible", "label_es": "Responsable", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"elementName":"list4",
				"propertyNameContainer": "users",
				"propertyNameContainerLevelPropertyKeyName": "user",
			    "propertyKeyName": "user", "propertyKeyValueEn": "user", "propertyKeyValueEs": "user"
			  }			
			}},
			{"list5": {
			  "items": [
			  { "keyName": "responsible_backup", "keyValue_en": "responsible_backup", "keyValue_es": "responsible_backup" }
			  ],
			  "label_en": "Responsible Backup", "label_es": "Backup del responsable", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"elementName":"list5",
				"propertyNameContainer": "users",
				"propertyNameContainerLevelPropertyKeyName": "user",
			    "propertyKeyName": "user", "propertyKeyValueEn": "user", "propertyKeyValueEs": "user"
			  }			
			}},
            {"date1": {"label_en": "Purchase Date", "label_es": "Fecha Compra" }},
			{"date2": {"label_en": "Installation Date", "label_es": "Fecha Instalación" }}
          ]
        }
      },
		{"actionName": "INSTRUMENT_AUDIT_FOR_GIVEN_INSTRUMENT",	  
		"requiresDialog": true,
		"endPoint": "/app/procs/InstrumentsAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Instrument Audit", "label_es": "Auditoría de Instrumento"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "INSTRUMENTAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "secondaryActionToPerform": {
				  "name": "getObjectAuditInfo",
				  "endPointParams": [
					{ "argumentName": "instrumentName", "selObjectPropertyName": "name" }
				  ]
			  },
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
				{ "argumentName": "instrumentName", "selObjectPropertyName": "name" },
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
		{"actionName": "TURN_OFF_LINE",
		"requiresDialog": false,
        "button": {
          "img": "deactivate.svg",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true,
          "showWhenSelectedItem": {
            "column": "on_line",
            "value": true
          }
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "TURN_ON_LINE",
		"requiresDialog": false,
        "button": {
          "img": "activate.svg",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          "requiresGridItemSelected": true,
          "showWhenSelectedItem": {
            "column": "on_line",
            "value": false
          }
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_CALIBRATION",
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_calibration.svg",
          "title": {
            "label_en": "Start Calibration", "label_es": "Iniciar Calibración"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_PREVENTIVE_MAINTENANCE" ,
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_preventive_maintenance.svg",
          "title": {
            "label_en": "Start Prev Maint", "label_es": "Iniciar Mant Prev"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_SERVICE",
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_service.svg",
          "title": {
            "label_en": "Start Service", "label_es": "Iniciar Servicio"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_VERIFICATION",
        "endPoint": "/app/procs/InstrumentsAPIactions",     
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_verification.svg",
          "title": {
            "label_en": "Start Verification", "label_es": "Iniciar Verificación"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "DECOMMISSION_INSTRUMENT",
        "endPoint": "/app/procs/InstrumentsAPIactions",     
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ],
		"requiresDialog": false,
        "button": {
          "icon": "alarm_off",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true
        }
      },
		{"actionName": "UNDECOMMISSION_INSTRUMENT",
        "endPoint": "/app/procs/InstrumentsAPIactions",  
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
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
			"objectName": { "label_en": "Instrument to reactivate", "label_es": "Lote de Producción a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"name",
            "eachEntryTextGenerator":[
              {"value": "Instrument: ", "type":"fix"}, {"value": "name", "type":"field"} 
            ]
          },
		  "viewQuery": {
			  "actionName": "DECOMISSIONED_INSTRUMENTS_LAST_N_DAYS",
			  "clientMethod": "getDeactivatedObjects",
			  "endPoint": "/app/procs/InstrumentsAPIqueries",
			  "endPointParams": [
				{ "argumentName": "numDays", "element": "queryNumDays", "fixValue": 7 },
				{ "argumentName": "family", "fixValue": "familyCorrecto"}
			  ]
		  },
          "action": [            
          ]
        }
      }
    ]
  },
  "PlatformInstrumentsfamilyObsCorrecto": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "InstrumentsListfamilyObsCorrecto": {
          "label_en": "Active Instruments familyObsCorrecto",
          "label_es": "Instrumentos activos de familyObsCorrecto"
        }
      },
      "gridHeader": {
        "name": {
          "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "family": {
          "label_en": "Family", "label_es": "Familia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "on_line": {
          "label_en": "On Line", "label_es": "En Linea", "sort": false, "filter": true, "is_icon": true, "width": "10%"
        },
        "model_number": {
          "label_en": "Model N.", "label_es": "N. Modelo", "sort": false, "filter": true, "width": "10%"
        },
        "serial_number": {
          "label_en": "Serial N.", "label_es": "N. Serie", "sort": false, "filter": true, "width": "10%"
        },
        "supplier": {
          "label_en": "Supplier", "label_es": "Proveedor", "sort": false, "filter": true, "width": "10%"
        },
        "manufacturer": {
          "label_en": "Manufacturer", "label_es": "fabricante", "sort": false, "filter": true, "width": "10%"
        },
        "created_on": {
          "label_en": "Creation", "label_es": "Creación", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
		"is_locked": {
          "label_en": "Is locked?", "label_es": "¿Bloqueado?", "sort": false, "filter": false, "is_icon": false, "width": "10%"
       },
        "detail": {
          "label_en": "Detail", "label_es": "Detalle", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "last_calibration": {
          "label_en": "Last Cal", "label_es": "Última Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "next_calibration": {
          "label_en": "Next Cal", "label_es": "Próxima Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "last_prev_maint": {
          "label_en": "Last PM", "label_es": "Último MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "next_prev_maint": {
          "label_en": "Next PM", "label_es": "Próximo MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        }
      }
    },
    "viewQuery":{ "actionName": "ACTIVE_INSTRUMENTS_LIST",
      "endPoint": "/app/procs/InstrumentsAPIqueries",
	  "endPointParams": [
          { "argumentName": "familyName", "fixValue": "familyObsCorrecto"}
      ],
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      }
    },
    "actions": [
		{"actionName": "NEW_INSTRUMENT",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "instrumentName", "element": "text1", "defaultValue": "" },
          { "argumentName": "familyName", "fixValue": "familyObsCorrecto"},
          { "argumentName": "modelNumber", "element": "text2", "defaultValue": "" },
          { "argumentName": "supplierName", "element": "list2", "defaultValue": "" },
          { "argumentName": "serialNumber", "element": "text3", "defaultValue": "" },
          { "argumentName": "manufacturerName", "element": "list3", "defaultValue": "" },
		  { "argumentName": "responsible", "element": "list4", "defaultValue": "", "addToFieldNameAndValue": true},
		  { "argumentName": "responsible_backup", "element": "list5", "defaultValue": "", "addToFieldNameAndValue": true},
          { "argumentName": "poDate", "element": "date1", "defaultValue": "" },
          { "argumentName": "installationDate", "element": "date2", "defaultValue": "" }
        ],
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
			{"text1": { "label_en": "New Instrument Name", "label_es": "Nombre para nuevo instrumento" }},
            {"text2": { "label_en": "Model Number", "label_es": "Modelo" }},
			{"list2": { 
              "items": [
                { "keyName": "LEICA", "keyValue_en": "Leica Biosystems", "keyValue_es": "Leica Biosystems" },                
                { "keyName": "PB INSTRUMENTS", "keyValue_en": "PB Instruments", "keyValue_es": "PB Instruments" },                
                { "keyName": "METTLER", "keyValue_en": "Mettler Toledo", "keyValue_es": "Mettler Toledo" },
                { "keyName": "PERKIN ELMER", "keyValue_en": "Perkin Elmer", "keyValue_es": "Perkin Elmer" },
                { "keyName": "AGILENT", "keyValue_en": "Agilent", "keyValue_es": "Agilent" },
                { "keyName": "WATERS", "keyValue_en": "Waters", "keyValue_es": "Water" }
              ],    
              "label_en": "Supplier", "label_es": "Proveedor" 
            }},
            {"text3": { "label_en": "Serial Number", "label_es": "Número de Serie" }},
			{"list3": { 
              "items": [
                { "keyName": "METTLER", "keyValue_en": "Mettler Toledo", "keyValue_es": "Mettler Toledo" },
                { "keyName": "PERKIN ELMER", "keyValue_en": "Perkin Elmer", "keyValue_es": "Perkin Elmer" },
                { "keyName": "AGILENT", "keyValue_en": "Agilent", "keyValue_es": "Agilent" },
                { "keyName": "WATERS", "keyValue_en": "Waters", "keyValue_es": "Water" }               
              ],    
              "label_en": "ManufacturerName", "label_es": "Fabricante" 
            }},
			{"list4": {
			  "items": [
			  { "keyName": "responsible", "keyValue_en": "responsible", "keyValue_es": "responsible" }
			  ],
			  "label_en": "Responsible", "label_es": "Responsable", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"elementName":"list4",
				"propertyNameContainer": "users",
				"propertyNameContainerLevelPropertyKeyName": "user",
			    "propertyKeyName": "user", "propertyKeyValueEn": "user", "propertyKeyValueEs": "user"
			  }			
			}},
			{"list5": {
			  "items": [
			  { "keyName": "responsible_backup", "keyValue_en": "responsible_backup", "keyValue_es": "responsible_backup" }
			  ],
			  "label_en": "Responsible Backup", "label_es": "Backup del responsable", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"elementName":"list5",
				"propertyNameContainer": "users",
				"propertyNameContainerLevelPropertyKeyName": "user",
			    "propertyKeyName": "user", "propertyKeyValueEn": "user", "propertyKeyValueEs": "user"
			  }			
			}},
            {"date1": {"label_en": "Purchase Date", "label_es": "Fecha Compra" }},
			{"date2": {"label_en": "Installation Date", "label_es": "Fecha Instalación" }}
          ]
        }
      },
		{"actionName": "INSTRUMENT_AUDIT_FOR_GIVEN_INSTRUMENT",	  
		"requiresDialog": true,
		"endPoint": "/app/procs/InstrumentsAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Instrument Audit", "label_es": "Auditoría de Instrumento"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "INSTRUMENTAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "secondaryActionToPerform": {
				  "name": "getObjectAuditInfo",
				  "endPointParams": [
					{ "argumentName": "instrumentName", "selObjectPropertyName": "name" }
				  ]
			  },
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
				{ "argumentName": "instrumentName", "selObjectPropertyName": "name" },
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
		{"actionName": "TURN_OFF_LINE",
		"requiresDialog": false,
        "button": {
          "img": "deactivate.svg",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true,
          "showWhenSelectedItem": {
            "column": "on_line",
            "value": true
          }
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "TURN_ON_LINE",
		"requiresDialog": false,
        "button": {
          "img": "activate.svg",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          "requiresGridItemSelected": true,
          "showWhenSelectedItem": {
            "column": "on_line",
            "value": false
          }
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_CALIBRATION",
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_calibration.svg",
          "title": {
            "label_en": "Start Calibration", "label_es": "Iniciar Calibración"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_PREVENTIVE_MAINTENANCE" ,
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_preventive_maintenance.svg",
          "title": {
            "label_en": "Start Prev Maint", "label_es": "Iniciar Mant Prev"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_SERVICE",
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_service.svg",
          "title": {
            "label_en": "Start Service", "label_es": "Iniciar Servicio"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_VERIFICATION",
        "endPoint": "/app/procs/InstrumentsAPIactions",     
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_verification.svg",
          "title": {
            "label_en": "Start Verification", "label_es": "Iniciar Verificación"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "DECOMMISSION_INSTRUMENT",
        "endPoint": "/app/procs/InstrumentsAPIactions",     
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ],
		"requiresDialog": false,
        "button": {
          "icon": "alarm_off",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true
        }
      },
		{"actionName": "UNDECOMMISSION_INSTRUMENT",
        "endPoint": "/app/procs/InstrumentsAPIactions",  
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
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
			"objectName": { "label_en": "Instrument to reactivate", "label_es": "Lote de Producción a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"name",
            "eachEntryTextGenerator":[
              {"value": "Instrument: ", "type":"fix"}, {"value": "name", "type":"field"} 
            ]
          },
		  "viewQuery": {
			  "actionName": "DECOMISSIONED_INSTRUMENTS_LAST_N_DAYS",
			  "clientMethod": "getDeactivatedObjects",
			  "endPoint": "/app/procs/InstrumentsAPIqueries",
			  "endPointParams": [
				{ "argumentName": "numDays", "element": "queryNumDays", "fixValue": 7 },
				{ "argumentName": "family", "fixValue": "familyCorrecto"}
			  ]
		  },
          "action": [            
          ]
        }
      }
    ]
  },
  "PlatformInstrumentsfamilyObsIntento": {
	"component": "Tabs",
	"tabs": [
	{"component": "TableWithButtons",
    "langConfig": {
	  "tab": {
          "label_en": "Active Instruments familyObsIntentoCorrectoTerminado", 
          "label_es": "Instrumentos activos de familyObsIntentoCorrectoTerminado"
      },
      "title": {
          "label_en": "Active Instruments familyObsIntentoCorrectoTerminado",
          "label_es": "Instrumentos activos de familyObsIntentoCorrectoTerminado"
      },
      "gridHeader": {
        "name": {
          "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "family": {
          "label_en": "Family", "label_es": "Familia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "on_line": {
          "label_en": "On Line", "label_es": "En Linea", "sort": false, "filter": true, "is_icon": true, "width": "10%"
        },
        "model_number": {
          "label_en": "Model N.", "label_es": "N. Modelo", "sort": false, "filter": true, "width": "10%"
        },
        "serial_number": {
          "label_en": "Serial N.", "label_es": "N. Serie", "sort": false, "filter": true, "width": "10%"
        },
        "supplier": {
          "label_en": "Supplier", "label_es": "Proveedor", "sort": false, "filter": true, "width": "10%"
        },
        "manufacturer": {
          "label_en": "Manufacturer", "label_es": "fabricante", "sort": false, "filter": true, "width": "10%"
        },
        "created_on": {
          "label_en": "Creation", "label_es": "Creación", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
		"is_locked": {
          "label_en": "Is locked?", "label_es": "¿Bloqueado?", "sort": false, "filter": false, "is_icon": false, "width": "10%"
       },
        "detail": {
          "label_en": "Detail", "label_es": "Detalle", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "last_calibration": {
          "label_en": "Last Cal", "label_es": "Última Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "next_calibration": {
          "label_en": "Next Cal", "label_es": "Próxima Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "last_prev_maint": {
          "label_en": "Last PM", "label_es": "Último MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "next_prev_maint": {
          "label_en": "Next PM", "label_es": "Próximo MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        }
      }
    },
    "viewQuery":{ "actionName": "ACTIVE_INSTRUMENTS_LIST",
      "endPoint": "/app/procs/InstrumentsAPIqueries",
	  "endPointParams": [
          { "argumentName": "familyName", "fixValue": "familyObsIntentoCorrectoTerminado"}
      ],
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      }
    },
    "actions": [
		{"actionName": "NEW_INSTRUMENT",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "instrumentName", "element": "text1", "defaultValue": "" },
          { "argumentName": "familyName", "fixValue": "familyObsIntentoCorrectoTerminado"},
          { "argumentName": "modelNumber", "element": "text2", "defaultValue": "" },
          { "argumentName": "supplierName", "element": "list2", "defaultValue": "" },
          { "argumentName": "serialNumber", "element": "text3", "defaultValue": "" },
          { "argumentName": "manufacturerName", "element": "list3", "defaultValue": "" },
		  { "argumentName": "responsible", "element": "list4", "defaultValue": "", "addToFieldNameAndValue": true},
		  { "argumentName": "responsible_backup", "element": "list5", "defaultValue": "", "addToFieldNameAndValue": true},
          { "argumentName": "poDate", "element": "date1", "defaultValue": "" },
          { "argumentName": "installationDate", "element": "date2", "defaultValue": "" }
        ],
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
			{"text1": { "label_en": "New Instrument Name", "label_es": "Nombre para nuevo instrumento" }},
            {"text2": { "label_en": "Model Number", "label_es": "Modelo" }},
			{"list2": { 
              "items": [
                { "keyName": "LEICA", "keyValue_en": "Leica Biosystems", "keyValue_es": "Leica Biosystems" },                
                { "keyName": "PB INSTRUMENTS", "keyValue_en": "PB Instruments", "keyValue_es": "PB Instruments" },                
                { "keyName": "METTLER", "keyValue_en": "Mettler Toledo", "keyValue_es": "Mettler Toledo" },
                { "keyName": "PERKIN ELMER", "keyValue_en": "Perkin Elmer", "keyValue_es": "Perkin Elmer" },
                { "keyName": "AGILENT", "keyValue_en": "Agilent", "keyValue_es": "Agilent" },
                { "keyName": "WATERS", "keyValue_en": "Waters", "keyValue_es": "Water" }
              ],    
              "label_en": "Supplier", "label_es": "Proveedor" 
            }},
            {"text3": { "label_en": "Serial Number", "label_es": "Número de Serie" }},
			{"list3": { 
              "items": [
                { "keyName": "METTLER", "keyValue_en": "Mettler Toledo", "keyValue_es": "Mettler Toledo" },
                { "keyName": "PERKIN ELMER", "keyValue_en": "Perkin Elmer", "keyValue_es": "Perkin Elmer" },
                { "keyName": "AGILENT", "keyValue_en": "Agilent", "keyValue_es": "Agilent" },
                { "keyName": "WATERS", "keyValue_en": "Waters", "keyValue_es": "Water" }               
              ],    
              "label_en": "ManufacturerName", "label_es": "Fabricante" 
            }},
			{"list4": {
			  "items": [
			  { "keyName": "responsible", "keyValue_en": "responsible", "keyValue_es": "responsible" }
			  ],
			  "label_en": "Responsible", "label_es": "Responsable", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"elementName":"list4",
				"propertyNameContainer": "users",
				"propertyNameContainerLevelPropertyKeyName": "user",
			    "propertyKeyName": "user", "propertyKeyValueEn": "user", "propertyKeyValueEs": "user"
			  }			
			}},
			{"list5": {
			  "items": [
			  { "keyName": "responsible_backup", "keyValue_en": "responsible_backup", "keyValue_es": "responsible_backup" }
			  ],
			  "label_en": "Responsible Backup", "label_es": "Backup del responsable", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"elementName":"list5",
				"propertyNameContainer": "users",
				"propertyNameContainerLevelPropertyKeyName": "user",
			    "propertyKeyName": "user", "propertyKeyValueEn": "user", "propertyKeyValueEs": "user"
			  }			
			}},
            {"date1": {"label_en": "Purchase Date", "label_es": "Fecha Compra" }},
			{"date2": {"label_en": "Installation Date", "label_es": "Fecha Instalación" }}
          ]
        }
      },
		{"actionName": "INSTRUMENT_AUDIT_FOR_GIVEN_INSTRUMENT",	  
		"requiresDialog": true,
		"endPoint": "/app/procs/InstrumentsAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Instrument Audit", "label_es": "Auditoría de Instrumento"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "INSTRUMENTAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "secondaryActionToPerform": {
				  "name": "getObjectAuditInfo",
				  "endPointParams": [
					{ "argumentName": "instrumentName", "selObjectPropertyName": "name" }
				  ]
			  },
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
				{ "argumentName": "instrumentName", "selObjectPropertyName": "name" },
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
		{"actionName": "TURN_OFF_LINE",
		"requiresDialog": false,
        "button": {
          "img": "deactivate.svg",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true,
          "showWhenSelectedItem": {
            "column": "on_line",
            "value": true
          }
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "TURN_ON_LINE",
		"requiresDialog": false,
        "button": {
          "img": "activate.svg",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          "requiresGridItemSelected": true,
          "showWhenSelectedItem": {
            "column": "on_line",
            "value": false
          }
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_CALIBRATION",
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_calibration.svg",
          "title": {
            "label_en": "Start Calibration", "label_es": "Iniciar Calibración"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_PREVENTIVE_MAINTENANCE" ,
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_preventive_maintenance.svg",
          "title": {
            "label_en": "Start Prev Maint", "label_es": "Iniciar Mant Prev"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_SERVICE",
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_service.svg",
          "title": {
            "label_en": "Start Service", "label_es": "Iniciar Servicio"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_VERIFICATION",
        "endPoint": "/app/procs/InstrumentsAPIactions",     
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_verification.svg",
          "title": {
            "label_en": "Start Verification", "label_es": "Iniciar Verificación"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "DECOMMISSION_INSTRUMENT",
        "endPoint": "/app/procs/InstrumentsAPIactions",     
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ],
		"requiresDialog": false,
        "button": {
          "icon": "alarm_off",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true
        }
      },
		{"actionName": "UNDECOMMISSION_INSTRUMENT",
        "endPoint": "/app/procs/InstrumentsAPIactions",  
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
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
			"objectName": { "label_en": "Instrument to reactivate", "label_es": "Lote de Producción a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"name",
            "eachEntryTextGenerator":[
              {"value": "Instrument: ", "type":"fix"}, {"value": "name", "type":"field"} 
            ]
          },
		  "viewQuery": {
			  "actionName": "DECOMISSIONED_INSTRUMENTS_LAST_N_DAYS",
			  "clientMethod": "getDeactivatedObjects",
			  "endPoint": "/app/procs/InstrumentsAPIqueries",
			  "endPointParams": [
				{ "argumentName": "numDays", "element": "queryNumDays", "fixValue": 7 },
				{ "argumentName": "family", "fixValue": "familyCorrecto"}
			  ]
		  },
          "action": [            
          ]
        }
      }
    ]
	},
	{"component": "TableWithButtons",
    "langConfig": {
	  "tab": {
          "label_en": "Active Instruments familyObsIntentosCorrecto", 
          "label_es": "Instrumentos activos de familyObsIntentosCorrecto"
      },
      "title": {
          "label_en": "Active Instruments familyObsIntentosCorrecto",
          "label_es": "Instrumentos activos de familyObsIntentosCorrecto"
      },
      "gridHeader": {
        "name": {
          "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "family": {
          "label_en": "Family", "label_es": "Familia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "on_line": {
          "label_en": "On Line", "label_es": "En Linea", "sort": false, "filter": true, "is_icon": true, "width": "10%"
        },
        "model_number": {
          "label_en": "Model N.", "label_es": "N. Modelo", "sort": false, "filter": true, "width": "10%"
        },
        "serial_number": {
          "label_en": "Serial N.", "label_es": "N. Serie", "sort": false, "filter": true, "width": "10%"
        },
        "supplier": {
          "label_en": "Supplier", "label_es": "Proveedor", "sort": false, "filter": true, "width": "10%"
        },
        "manufacturer": {
          "label_en": "Manufacturer", "label_es": "fabricante", "sort": false, "filter": true, "width": "10%"
        },
        "created_on": {
          "label_en": "Creation", "label_es": "Creación", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
		"is_locked": {
          "label_en": "Is locked?", "label_es": "¿Bloqueado?", "sort": false, "filter": false, "is_icon": false, "width": "10%"
       },
        "detail": {
          "label_en": "Detail", "label_es": "Detalle", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "last_calibration": {
          "label_en": "Last Cal", "label_es": "Última Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "next_calibration": {
          "label_en": "Next Cal", "label_es": "Próxima Cal", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "last_prev_maint": {
          "label_en": "Last PM", "label_es": "Último MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "next_prev_maint": {
          "label_en": "Next PM", "label_es": "Próximo MP", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        }
      }
    },
    "viewQuery":{ "actionName": "ACTIVE_INSTRUMENTS_LIST",
      "endPoint": "/app/procs/InstrumentsAPIqueries",
	  "endPointParams": [
          { "argumentName": "familyName", "fixValue": "familyObsIntentosCorrecto"}
      ],
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      }
    },
    "actions": [
		{"actionName": "NEW_INSTRUMENT",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "instrumentName", "element": "text1", "defaultValue": "" },
          { "argumentName": "familyName", "fixValue": "familyObsIntentosCorrecto"},
          { "argumentName": "modelNumber", "element": "text2", "defaultValue": "" },
          { "argumentName": "supplierName", "element": "list2", "defaultValue": "" },
          { "argumentName": "serialNumber", "element": "text3", "defaultValue": "" },
          { "argumentName": "manufacturerName", "element": "list3", "defaultValue": "" },
		  { "argumentName": "responsible", "element": "list4", "defaultValue": "", "addToFieldNameAndValue": true },
		  { "argumentName": "responsible_backup", "element": "list5", "defaultValue": "", "addToFieldNameAndValue": true },
          { "argumentName": "poDate", "element": "date1", "defaultValue": "" },
          { "argumentName": "installationDate", "element": "date2", "defaultValue": "" }
        ],
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
			{"text1": { "label_en": "New Instrument Name", "label_es": "Nombre para nuevo instrumento" }},
            {"text2": { "label_en": "Model Number", "label_es": "Modelo" }},
			{"list2": { 
              "items": [
                { "keyName": "LEICA", "keyValue_en": "Leica Biosystems", "keyValue_es": "Leica Biosystems" },                
                { "keyName": "PB INSTRUMENTS", "keyValue_en": "PB Instruments", "keyValue_es": "PB Instruments" },                
                { "keyName": "METTLER", "keyValue_en": "Mettler Toledo", "keyValue_es": "Mettler Toledo" },
                { "keyName": "PERKIN ELMER", "keyValue_en": "Perkin Elmer", "keyValue_es": "Perkin Elmer" },
                { "keyName": "AGILENT", "keyValue_en": "Agilent", "keyValue_es": "Agilent" },
                { "keyName": "WATERS", "keyValue_en": "Waters", "keyValue_es": "Water" }
              ],    
              "label_en": "Supplier", "label_es": "Proveedor" 
            }},
            {"text3": { "label_en": "Serial Number", "label_es": "Número de Serie" }},
			{"list3": { 
              "items": [
                { "keyName": "METTLER", "keyValue_en": "Mettler Toledo", "keyValue_es": "Mettler Toledo" },
                { "keyName": "PERKIN ELMER", "keyValue_en": "Perkin Elmer", "keyValue_es": "Perkin Elmer" },
                { "keyName": "AGILENT", "keyValue_en": "Agilent", "keyValue_es": "Agilent" },
                { "keyName": "WATERS", "keyValue_en": "Waters", "keyValue_es": "Water" }               
              ],    
              "label_en": "ManufacturerName", "label_es": "Fabricante" 
            }},
			{"list4": {
			  "items": [
			  { "keyName": "responsible", "keyValue_en": "responsible", "keyValue_es": "responsible" }
			  ],
			  "label_en": "Responsible", "label_es": "Responsable", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"elementName":"list4",
				"propertyNameContainer": "users",
				"propertyNameContainerLevelPropertyKeyName": "user",
			    "propertyKeyName": "user", "propertyKeyValueEn": "user", "propertyKeyValueEs": "user"
			  }			
			}},
			{"list5": {
			  "items": [
			  { "keyName": "responsible_backup", "keyValue_en": "responsible_backup", "keyValue_es": "responsible_backup" }
			  ],
			  "label_en": "Responsible Backup", "label_es": "Backup del responsable", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"elementName":"list5",
				"propertyNameContainer": "users",
				"propertyNameContainerLevelPropertyKeyName": "user",
			    "propertyKeyName": "user", "propertyKeyValueEn": "user", "propertyKeyValueEs": "user"
			  }			
			}},
            {"date1": {"label_en": "Purchase Date", "label_es": "Fecha Compra" }},
			{"date2": {"label_en": "Installation Date", "label_es": "Fecha Instalación" }}
          ]
        }
      },
		{"actionName": "INSTRUMENT_AUDIT_FOR_GIVEN_INSTRUMENT",	  
		"requiresDialog": true,
		"endPoint": "/app/procs/InstrumentsAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Instrument Audit", "label_es": "Auditoría de Instrumento"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ],        
        "dialogInfo": { 
		  "name": "auditDialog",
          "automatic": true,
          "action": [
            {
              "actionName": "INSTRUMENTAUDIT_SET_AUDIT_ID_REVIEWED",
			  "requiresDialog": false,
			  "notGetViewData": true,
			  "secondaryActionToPerform": {
				  "name": "getObjectAuditInfo",
				  "endPointParams": [
					{ "argumentName": "instrumentName", "selObjectPropertyName": "name" }
				  ]
			  },
			  "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
				{ "argumentName": "instrumentName", "selObjectPropertyName": "name" },
                { "argumentName": "auditId", "targetValue": true }
              ]
            }
          ]
        }
      },
		{"actionName": "TURN_OFF_LINE",
		"requiresDialog": false,
        "button": {
          "img": "deactivate.svg",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true,
          "showWhenSelectedItem": {
            "column": "on_line",
            "value": true
          }
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "TURN_ON_LINE",
		"requiresDialog": false,
        "button": {
          "img": "activate.svg",
          "title": {
            "label_en": "Activate", "label_es": "Activar"
          },
          "requiresGridItemSelected": true,
          "showWhenSelectedItem": {
            "column": "on_line",
            "value": false
          }
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_CALIBRATION",
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_calibration.svg",
          "title": {
            "label_en": "Start Calibration", "label_es": "Iniciar Calibración"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_PREVENTIVE_MAINTENANCE" ,
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_preventive_maintenance.svg",
          "title": {
            "label_en": "Start Prev Maint", "label_es": "Iniciar Mant Prev"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_SERVICE",
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_service.svg",
          "title": {
            "label_en": "Start Service", "label_es": "Iniciar Servicio"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "START_VERIFICATION",
        "endPoint": "/app/procs/InstrumentsAPIactions",     
		"requiresDialog": false,
        "button": {
          "img": "inst_ev_type_verification.svg",
          "title": {
            "label_en": "Start Verification", "label_es": "Iniciar Verificación"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ]
      },
		{"actionName": "DECOMMISSION_INSTRUMENT",
        "endPoint": "/app/procs/InstrumentsAPIactions",     
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
        ],
		"requiresDialog": false,
        "button": {
          "icon": "alarm_off",
          "title": {
            "label_en": "Deactivate", "label_es": "Desactivar"
          },
          "requiresGridItemSelected": true
        }
      },
		{"actionName": "UNDECOMMISSION_INSTRUMENT",
        "endPoint": "/app/procs/InstrumentsAPIactions",  
        "endPointParams": [
          { "argumentName": "instrumentName", "selObjectPropertyName": "name" }
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
			"objectName": { "label_en": "Instrument to reactivate", "label_es": "Lote de Producción a Reactivar" }
          },    
          "listDefinition":{
            "keyFldName":"name",
            "eachEntryTextGenerator":[
              {"value": "Instrument: ", "type":"fix"}, {"value": "name", "type":"field"} 
            ]
          },
		  "viewQuery": {
			  "actionName": "DECOMISSIONED_INSTRUMENTS_LAST_N_DAYS",
			  "clientMethod": "getDeactivatedObjects",
			  "endPoint": "/app/procs/InstrumentsAPIqueries",
			  "endPointParams": [
				{ "argumentName": "numDays", "element": "queryNumDays", "fixValue": 7 },
				{ "argumentName": "family", "fixValue": "familyCorrecto"}
			  ]
		  }
        }
      }
    ]
	}
   ]
  }, 
  "EventsInProgress": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "EventsER": {
          "label_en": "Events in progress",
          "label_es": "Eventos en curso"
        }
      },
      "gridHeader": {
        "event_type": {"label_en": "Event", "label_es": "Evento", "sort": false, "filter": true, "is_icon": true, "width": "20%"},
        "instrument": {"label_en": "Instrument", "label_es": "Instrumento", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"},
        "created_on": {"label_en": "Creation", "label_es": "Creación", "sort": false, "filter": true, "is_icon": false, "width": "10%"},
        "created_by": {"label_en": "Creator", "label_es": "Creador", "sort": false, "filter": false, "is_icon": false, "width": "10%"}
      },
      "xxxxresultHeader": {
        "id": {
          "label_en": "Id", "label_es": "Id", "width": "10%"
        },
        "param_name": {
          "label_en": "Parameter", "label_es": "Parámetro"
        },
        "value": {
          "label_en": "Value", "label_es": "Valor"
        }
      },
      "xxxresultHeaderObjectLabelTopLeft": {
        "label_en": "Instrument Event:", "label_es": "Evento de Instrumento :"
      }
    },
    "viewQuery":{ "actionName": "INSTRUMENT_EVENTS_INPROGRESS",	  
      "xxxclientMethod": "getSamples",
      "endPoint": "/app/procs/InstrumentsAPIqueries",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      }
    },
  "actions": [
	  { "actionName": "REOPEN_EVENT",
        "alternativeAPIActionMethod": "completeInstrumentEventAction",
		"requiresDialog": true,		
        "clientMethod": "openReactivateObjectDialog",
		"endPoint": "/app/procs/InstrumentsAPIactions",
		"endPointParams": [
		  { "argumentName": "instrumentName", "selObjectPropertyName": "instrument" },
          { "argumentName": "eventId", "selObjectPropertyName": "id" }
		  
        ],
        "button": {
          "icon": "alarm_add",
          "title": {
            "label_en": "Reopen", "label_es": "Reabrir"
          },
          "requiresGridItemSelected": false
        },
        "dialogInfo": {
          "requiresDialog": true,
          "name": "reactivateObjectDialog",
          "fieldsObject": {
            "queryNumDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
            "objectName": { "label_en": "Reopen event", "label_es": "Reabrir evento" }
          },  
          "listDefinition":{
            "keyFldName":"id",
            "eachEntryTextGenerator":[
              {"value": "instrument", "type":"field"}, {"value": " (", "type":"fix"}, 
              {"value": "event_type", "type":"field"}, {"value": "-", "type":"fix"},
			  {"value": "started_on", "type":"field"}, {"value": "-", "type":"fix"},
			  {"value": "completed_on", "type":"field"}, {"value": "-", "type":"fix"},
			  {"value": "instrument_family", "type":"field"}, {"value": ")", "type":"fix"}
              ]
          },
		  "viewQuery": {
			  "endPoint": "/app/procs/InstrumentsAPIqueries",
			  "actionName": "COMPLETED_EVENTS_LAST_N_DAYS",
			  "clientMethod": "getDeactivatedObjects",
			  "endPointParams": [
				{ "argumentName": "numDays", "element": "queryNumDays", "fixValue": 7 }
			  ]
		  }
        }
      },
	  { "actionName": "COMPLETE_CALIBRATION",
        "alternativeAPIActionMethod": "completeInstrumentEventAction",
		"requiresDialog": true,
        "dialogInfo": {          
		  "name": "genericDialog",
            "fields": [
				{"list1": { "label_en": "Decision", "label_es": "Decisión",
                  "items":[
                    {"keyName":"ACCEPTED", "keyValue_en":"Accepted", "keyValue_es":"Aceptado"},
                    {"keyName":"ACCEPTED_WITH_RESTRICTIONS", "keyValue_en":"Accepted with restrictions", "keyValue_es":"Aceptado con restricciones"},
                    {"keyName":"REJECTED", "keyValue_en":"Rejected", "keyValue_es":"Rechazado"}
                  ]}
				}      
            ]
        },
        "button": {
            "icon": "alarm_on",
			"showWhenSelectedItem": {
				"column": "event_type",
				"value": "CALIBRATION"
			},
            "title": {
                "label_en": "Complete Calibration", "label_es": "Completar Calibración"
            },
            "requiresGridItemSelected": true
        },
        "endPointParams": [
            { "argumentName": "instrumentName", "selObjectPropertyName": "instrument" },
            { "argumentName": "decision", "element": "list1" }
        ]
    },
	  { "actionName": "COMPLETE_PREVENTIVE_MAINTENANCE",
        "alternativeAPIActionMethod": "completeInstrumentEventAction",
		"requiresGridItemSelected": true,
		"requiresDialog": true,
        "dialogInfo": {          
		  "name": "genericDialog",
            "fields": [
				{"list1": { "label_en": "Decision", "label_es": "Decisión",
                  "items":[
                    {"keyName":"ACCEPTED", "keyValue_en":"Accepted", "keyValue_es":"Aceptado"},
                    {"keyName":"ACCEPTED_WITH_RESTRICTIONS", "keyValue_en":"Accepted with restrictions", "keyValue_es":"Aceptado con restricciones"},
                    {"keyName":"REJECTED", "keyValue_en":"Rejected", "keyValue_es":"Rechazado"}
                  ]}
				}      
            ]
        },
        "button": {
            "icon": "alarm_on",
			"showWhenSelectedItem": {
				"column": "event_type",
				"value": "PREVENTIVE_MAINTENANCE"
			},
            "title": {
                "label_en": "Complete Preventive Maintenance", "label_es": "Completar Mantenimiento Preventivo"
            },
            "requiresGridItemSelected": true
        },
        "endPointParams": [
            { "argumentName": "instrumentName", "selObjectPropertyName": "instrument" },
            { "argumentName": "decision", "element": "list1" }
        ]
    },
	  { "actionName": "COMPLETE_VERIFICATION",
        "alternativeAPIActionMethod": "completeInstrumentEventAction",
		"requiresGridItemSelected": true,
		"requiresDialog": true,
        "dialogInfo": {          
		  "name": "genericDialog",
            "fields": [
				{"list1": { "label_en": "Decision", "label_es": "Decisión",
                  "items":[
                    {"keyName":"ACCEPTED", "keyValue_en":"Accepted", "keyValue_es":"Aceptado"},
                    {"keyName":"ACCEPTED_WITH_RESTRICTIONS", "keyValue_en":"Accepted with restrictions", "keyValue_es":"Aceptado con restricciones"},
                    {"keyName":"REJECTED", "keyValue_en":"Rejected", "keyValue_es":"Rechazado"}
                  ]}
				}      
            ]
        },
        "button": {
            "icon": "alarm_on",
			"showWhenSelectedItem": {
				"column": "event_type",
				"value": "VERIFICATION"
			},
            "title": {
                "label_en": "Complete Verification", "label_es": "Completar Verificación"
            },
            "requiresGridItemSelected": true
        },
        "endPointParams": [
            { "argumentName": "instrumentName", "selObjectPropertyName": "instrument" },
            { "argumentName": "decision", "element": "list1" }
        ]
    },
      { "actionName": "COMPLETE_SERVICE",
        "alternativeAPIActionMethod": "completeInstrumentEventAction",
		"requiresDialog": true,
        "dialogInfo": {          
		  "name": "genericDialog",
            "fields": [
				{"list1": { "label_en": "Decision", "label_es": "Decisión",
                  "items":[
                    {"keyName":"ACCEPTED", "keyValue_en":"Accepted", "keyValue_es":"Aceptado"},
                    {"keyName":"ACCEPTED_WITH_RESTRICTIONS", "keyValue_en":"Accepted with restrictions", "keyValue_es":"Aceptado con restricciones"},
                    {"keyName":"REJECTED", "keyValue_en":"Rejected", "keyValue_es":"Rechazado"}
                  ]}
				}      
            ]
        },
        "button": {
			"showWhenSelectedItem": {
				"column": "event_type",
				"value": "SERVICE"
			},
            "icon": "alarm_on",
            "title": {
                "label_en": "Complete Service", "label_es": "Completar Servicio"
            },
            "requiresGridItemSelected": true
        },
        "endPointParams": [
            { "argumentName": "instrumentName", "selObjectPropertyName": "instrument" },
            { "argumentName": "decision", "element": "list1" }
        ]
    },	
      { "actionName": "INSTRUMENT_EVENT_VARIABLES",
		"requiresDialog": true,
        "alertMsg": {
          "empty": { "label_en": "No pending results to enter result", "label_es": "No hay resultados pendientes de resultados" }
        },
        "button": {
          "icon": "document_scanner",
          "title": {
            "label_en": "Enter Result", "label_es": "Ingrese el Resultado"
          },
          "requiresGridItemSelected": true,
		  "hideWhenSelectedItem": {
              "column": "total_params",
              "value": 0
          }
        },
      "resultHeader": {
        "id": {
          "label_en": "Id", "label_es": "Id", "width": "10%"
        },
        "param_name": {
          "label_en": "Parameter", "label_es": "Parámetro"
        },
        "value": {
          "label_en": "Value", "label_es": "Valor"
        }
      },
      "resultHeaderObjectLabelTopLeft": {
        "label_en": "Instrument Event:", "label_es": "Evento de Instrumento :"
      },    
        "dialogInfo": { 
		  "name": "resultDialog",
		  "subQueryName": "getResult",		  
		  "viewQuery": {
			  "actionName": "INSTRUMENT_EVENT_VARIABLES",
			  "endPoint": "/app/procs/InstrumentsAPIqueries",
				"endPointParams": [				  
				  { "argumentName": "eventId", "selObjectPropertyName": "id"}
				]
		  },			  
          "automatic": true,
          "action": [
            { "actionName": "ENTER_EVENT_RESULT",
              "notGetViewData": true,
			  "requiresDialog": false,
			  "endPointUrl": "Samples",
              "clientMethod": "enterEventResult",
              "endPointParams": [
				  { "argumentName": "newValue", "targetValue": true },
				  { "argumentName": "eventId", "targetValue": true },
				  { "argumentName": "instrumentName", "targetValue": true },
				  { "argumentName": "variableName", "targetValue": true }
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
  "InstrumentReport": {
	"component": "DataMining",
    "tabs": [
      { "action": "GET_INSTRUMENT_REPORT",
        "label_en": "Instrument Report", 
        "label_es": "Informe de Instrumento", 
        "filter":{
          "fixParams": {
          },
          "filterFields":[
            {"text1": { "label_en": "Instrument", "label_es": "Instrumento", "default_value": "demoId2"} },
            {"number1": { "label_en": "Num Days", "label_es": "Num días"}, "default_value": true },
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
            {"argumentName": "instrumentName", "element": "text1"},
            {"argumentName": "creationDayStart", "element": "daterange1dateStart"},
            {"argumentName": "creationDayEnd", "element": "daterange1dateEnd"},
            {"argumentName": "closureDayStart", "element": "daterange2dateStart"},
            {"argumentName": "closureDayEnd", "element": "daterange2dateEnd"}
          ]      
        },
        "reportElements":[
          [
			{"type": "reportTitle", "title":{"label_en": "Instrument Report", "label_es": "Instrument Report"}}
          ],
          [
			{"type": "cardSomeElementsSingleObject",
			 "endPointPropertyArray": ["ROOT"],
			 "num_columns": 4,
			 "fieldsToDisplay": [
				{"name": "name", "label_en": "Name", "label_es": "Nombre"},
				{"name": "model_number"},
				{"name": "responsible"},
				{"name": "responsible_backup"},
				{"name": "manufacturer", "label_en": "Manufacturer", "label_es": "Fabricante"},
				{"name": "supplier", "label_en": "Supplier", "label_es": "Distribuidor"}
			 ]
			}			
          ],
          [
			{"type": "reportTitle", "title":{"label_en": "Family definition", "label_es": "Definición de Familia"}},
			{"type": "cardSomeElementsSingleObject",
			 "endPointPropertyArray": ["instruments_family"],
			 "num_columns": 4,
			 "fieldsToDisplay": [
				{"name": "pm_required", "label_en": "Perform PM?", "label_es": "¿Requiere MP?"},
				{"name": "pm_turn_on_when_completed"},
				{"name": "pm_variables_set"}
			 ]
			}						
          ],
          [
			{"type": "reportTitle", "title":{"label_en": "Calibration Parameters", "label_es": "Parámetros de Calibración"}},
			{"type": "readOnlyTable",
			 "endPointPropertyArray": ["instruments_family", "calib_variables_set_detail"],
			 "num_columns": 4,
			 "columns": [
				{"name": "param_name", "label_en": "Parameter", "label_es": "Parámetro"},
				{"name": "param_type"},
				{"name": "required"}
			 ]
			},
			{"type": "reportTitle", "title":{"label_en": "Prev. Maint. Parameters", "label_es": "Parámetros de Mant. Prev."}},
			{"type": "readOnlyTable",
			 "endPointPropertyArray": ["instruments_family", "pm_variables_set_detail"],
			 "num_columns": 4,
			 "columns": [
				{"name": "param_name", "label_en": "Parameter", "label_es": "Parámetro"},
				{"name": "param_type"},
				{"name": "required"}
			 ]
			}						
			
          ]
		
        ]
      }
    ]
  },
  "ConfigInstrumentFamilies": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "ConfigInstrumentFamilies": {
          "label_en": "Instrument Families",
          "label_es": "Familias de Instrumentos"
        }
      },
      "gridHeader": {
        "name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": false, "width": "20%"},
        "description": {"label_en": "Description", "label_es": "Descripción", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"},
        "calibration_required": {"label_en": "Calib?", "label_es": "Calib?", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
        "calib_variables_set": {"label_en": "Set", "label_es": "Set", "sort": false, "filter": false, "is_icon": false, "width": "10%"},
        "calibration_interval": {"label_en": "Inteval", "label_es": "Intervalo", "sort": false, "filter": true, "is_icon": false, "width": "10%"},
        "calib_system_create_new_event_when_expires": {"label_en": "Next automated?", "label_es": "¿Siguiente Automático?", "sort": false, "filter": false, "is_icon": true, "width": "10%"},
        "calibration_turn_off_when_started": {"label_en": "off by Start?", "label_es": "¿Inactivar al crear?", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
        "calibration_turn_on_when_completed": {"label_en": "On By Complete?", "label_es": "¿Activar al completar?", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
        "pm_required": {"label_en": "Prev Maint?", "label_es": "Mant Prev?", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
        "pm_variables_set": {"label_en": "Set", "label_es": "Set", "sort": false, "filter": false, "is_icon": false, "width": "10%"},
        "pm_interval": {"label_en": "Inteval", "label_es": "Intervalo", "sort": false, "filter": true, "is_icon": false, "width": "10%"},
        "pm_system_create_new_event_when_expires": {"label_en": "Next automated?", "label_es": "¿Siguiente Automático?", "sort": false, "filter": false, "is_icon": true, "width": "10%"},
        "pm_turn_off_when_started": {"label_en": "off by Start?", "label_es": "¿Inactivar al crear?", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
        "pm_turn_on_when_completed": {"label_en": "On By Complete?", "label_es": "¿Activar al completar?", "sort": false, "filter": true, "is_icon": true, "width": "10%"}		
      }
    },
    "viewQuery":{ "actionName": "instruments_family",	  
      "clientMethod": "getFromMasterData",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": false
      }
    },
	"actions": [
		{   "actionName": "CONFIG_UPDATE_INSTRUMENT_FAMILY",
			"requiresDialog": true,
			"button": {
				"icon": "create_new_folder",
				"title": {"label_en": "New", "label_es": "Nuevo"},
				"requiresGridItemSelected": true
			},
			"dialogInfo": {          
				"name": "genericDialog", 
				"fields":[
					{"checkbox1": { "label_en": "Required?", "label_es": "Sección 1", "internalVariableObjName": "selectedItems", "internalVariableObjProperty":"calibration_required", "optional": true }},
					{"number1": { "label_en": "Sched offset days", "label_es": "Descripción", "min_allowed":0, "optional": true }},
					{"list1": { "label_en": "Interval", "label_es": "Intervalo", "optional": true,
					  "items": [
						{ "keyName": "DAYS", "keyValue_en": "Days", "keyValue_es": "Días" },
						{ "keyName": "MONTHS", "keyValue_en": "Months", "keyValue_es": "Meses" },
						{ "keyName": "YEARS", "keyValue_en": "Years", "keyValue_es": "Años" }
					  ]
					}},					
					{"checkbox2": { "label_en": "Turn off when started?", "label_es": "Sección 3", "internalVariableObjName": "selectedItems", "internalVariableObjProperty":"calibration_turn_off_when_started" }},
					{"checkbox3": { "label_en": "Turn on when aproved?", "label_es": "Sección 4", "internalVariableObjName": "selectedItems", "internalVariableObjProperty":"calibration_turn_on_when_completed" }},
					{"list2": {
					  "label_en": "Variables Set", "label_es": "Conjunto de Parámetros", "optional": true,
					  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
					  "valuesFromMasterData": {
						"elementName":"list2",
						"propertyNameContainer": "variables_set",
						"propertyNameContainerLevelPropertyKeyName": "name",
						"propertyKeyName": "name", "propertyKeyValueEn": "name", "propertyKeyValueEs": "name"
					  }, "internalVariableObjName": "selectedItems", "internalVariableObjProperty":"calib_variables_set"			
					}},					
					
					{"checkbox4": { "label_en": "System log event when expired?", "label_es": "Descripción", "internalVariableObjName": "selectedItems", "internalVariableObjProperty":"calib_system_create_new_event_when_expires" }},
					{"number1": { "label_en": "Sched offset days", "label_es": "Descripción", "min_allowed":0, "internalVariableObjName": "selectedItems", "internalVariableObjProperty":"calib_sched_create_offset_days" }}
					
				]
			},
			"endPointParams": [
				{ "argumentName": "instrFamilyName", "selObjectPropertyName": "name" },
				{ "argumentName": "calibration_required", "element": "checkbox1", "fieldType": "BOOLEAN", "addToFieldNameAndValue":true, "notAddWhenValueIsBlank":true },
				{ "argumentName": "calibration_turn_off_when_started", "element": "checkbox2", "fieldType": "BOOLEAN", "addToFieldNameAndValue":true, "notAddWhenValueIsBlank":true },
				{ "argumentName": "calibration_turn_on_when_completed", "element": "checkbox3", "fieldType": "BOOLEAN", "addToFieldNameAndValue":true, "notAddWhenValueIsBlank":true },
				{ "argumentName": "calib_system_create_new_event_when_expires", "element": "checkbox4", "fieldType": "BOOLEAN", "addToFieldNameAndValue":true, "notAddWhenValueIsBlank":true },
				{ "argumentName": "description", "element": "text1", "addToFieldNameAndValue":true, "notAddWhenValueIsBlank":true },
				{ "argumentName": "calib_sched_create_offset_days", "element": "number1", "addToFieldNameAndValue":true, "notAddWhenValueIsBlank":true },
				{ "argumentName": "calib_variables_set", "element": "list2", "addToFieldNameAndValue":true, "notAddWhenValueIsBlank":true }
			]
		}  
	]
  },

 }
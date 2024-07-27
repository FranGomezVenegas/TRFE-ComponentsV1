export const DemoInstruments ={
  "TrackingChanges":{
	  "version": 0.9,
	  "last change on (YYYYMMDD)": "20230718", 
	  "last_change_note_20230718": "Added instr attachment for instruments and events, both",
	  "last_change_note_20230710": "Added new view, EventsCalendar",
	  "last_change_note_20230708": "InsturmentView window created to search instruments and show its information/events",
	  "last_change_note_20230522": "Families changed to suits better names, therefore model windows have been changed to suit them too",
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
		{ "name": "Instruments" , "url" : "/app/procs/InstrumentsAPIqueries"}
	  ]
  },
  "InstrumentView": {
    "component": "ObjectByTabs",
    "hasOwnComponent": true,
    "showTitleOnTop": true,
    "title": {
      "fix_text_en": "Instrument view",
      "fix_text_es": "Visor de Instrumentos",
      "name": "name --- puede que sea instrument_name o instrument" 
    },
    "viewQuery": {
      "actionName": "GET_INSTRUMENT_INFO",
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
          "argumentName": "instrumentName",
          "element": "text1"
        }
      ]
    },
    "filter_button": {
      "label_en": "Search",
      "label_es": "Buscar"
    },
    "filter": [
      {
        "text1": {
          "label_en": "Instrument to get",
          "label_es": "Instrumento a cargar",
          "fixValue": "res_230323"
        }
      }
    ],
    "filter_results": {
      "type": "readOnlyTable",
      "title": "3.4) Menu Definition",
      "endPointResponseObject": "user_requirements_events",
      "columns": [
        {
          "name": "id",
          "label_en": "Id",
          "label_es": "Id"
        }
      ]
    },
    "actions": [],
    "tabs": [
      { "tabLabel_en": "Summary",
        "tabLabel_es": "Inicio",
        "view": "summary",
        "view_definition": [
          { "type": "readOnlyTable",
            "endPointResponseObject": "instruments",
            "title": {
              "label_en": "Instrument Info",
              "label_es": "Información del Instrumento"
            },
            "subtitle": {
              "label_en": "Instrument Info",
              "label_es": "Información del Instrumento"
            },
            "fieldsToDisplay": [
              {"name": "name",
                "label_en": "Instrument",
                "label_es": "Instrumento"
              },
              {"name": "family",
                "label_en": "Instrument Family",
                "label_es": "Familia del instrumento"
              },
              {"name": "responsible",
                "label_en": "Responsible",
                "label_es": "Responsable"
              },
              { "name": "responsible_backup",   
                "label_en": "Responsible backup",
                "label_es": "Segundo responsable"
              }
            ],
            "actions": []
          }
		]
      },
	  { "tabLabel_en": "Instrument events",
        "tabLabel_es": "Eventos del instrumento",
        "view": "inst_event",
        "view_definition": [
          { "type": "cardSomeElementsSingleObject",
            "endPointResponseObject": "instrument_event",
            "title": {
              "label_en": "Instrument Events",
              "label_es": "Eventos del Instrumento"
            },
            "subtitle": {
              "label_en": "Instrument Events",
              "label_es": "Eventos del Instrumento"
            },
            "fieldsToDisplay": [
              {"name": "id",
                "label_en": "Instrument Id",
                "label_es": "Id del instrumento"
              },
              {"name": "event_type",
                "label_en": "Event Type",
                "label_es": "Tipo de evento"
              },
              {"name": "decision",
                "label_en": "Decision",
                "label_es": "Decisión"
              },
              { "name": "completed_on",   
                "label_en": "Completed On",
                "label_es": "Completado en"
              }
            ],
            "actions": []
          }
		]
      }
    ]
  },
  "PlatformInstruments":{
    "component": "TableWithButtons",
    "langConfig": {
      "gridHeader": {
        "name": {
          "label_en": "Name",
          "label_es": "Nombre",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "20%",
          "align": "left"
        },
        "family": {
          "label_en": "Family",
          "label_es": "Familia",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "20%"
        },
        "on_line": {
          "label_en": "On Line",
          "label_es": "En Linea",
          "sort": false,
          "filter": true,
          "is_icon": true,
          "width": "10%"
        },
        "model_number": {
          "label_en": "Model",
          "label_es": "Modelo",
          "sort": false,
          "filter": true,
          "width": "10%"
        },
        "serial_number": {
          "label_en": "Serial N.",
          "label_es": "N. Serie",
          "sort": false,
          "filter": true,
          "width": "10%"
        },
        "supplier": {
          "label_en": "Supplier",
          "label_es": "Proveedor",
          "sort": false,
          "filter": true,
          "width": "10%"
        },
        "manufacturer": {
          "label_en": "Manufacturer",
          "label_es": "fabricante",
          "sort": false,
          "filter": true,
          "width": "10%"
        },
        "created_on": {
          "label_en": "Creation",
          "label_es": "Creación",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "is_locked": {
          "label_en": "Is locked?",
          "label_es": "¿Bloqueado?",
          "sort": false,
          "filter": false,
          "is_icon": false,
          "width": "10%"
        },
        "detail": {
          "label_en": "Detail",
          "label_es": "Detalle",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "last_calibration": {
          "label_en": "Last Cal",
          "label_es": "Última Cal",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "next_calibration": {
          "label_en": "Next Cal",
          "label_es": "Próxima Cal",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "last_prev_maint": {
          "label_en": "Last PM",
          "label_es": "Último MP",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "next_prev_maint": {
          "label_en": "Next PM",
          "label_es": "Próximo MP",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        }
      },
      "title": {
        "label_en": "",
        "label_es": ""
      }
    },
    "viewQuery": {
      "actionName": "ACTIVE_INSTRUMENTS_LIST",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": []
    },
    "enableContextMenu": true,
    "addActionsInContextMenu": false,
    "actions": [
      {
        "actionName": "NEW_INSTRUMENT",
        "requiresDialog": true,
        "endPointParams": [
          {
            "argumentName": "instrumentName",
            "element": "text1",
            "defaultValue": ""
          },
          {
            "argumentName": "familyName",
            "element": "list1",
            "defaultValue": ""
          },
          {
            "argumentName": "modelNumber",
            "element": "text2",
            "defaultValue": ""
          },
          {
            "argumentName": "supplierName",
            "element": "list2",
            "defaultValue": ""
          },
          {
            "argumentName": "serialNumber",
            "element": "text3",
            "defaultValue": ""
          },
          {
            "argumentName": "manufacturerName",
            "element": "list3",
            "defaultValue": ""
          },
          {
            "argumentName": "responsible",
            "element": "list4",
            "defaultValue": "",
            "addToFieldNameAndValue": true,
            "notAddWhenValueIsBlank": true,
            "isAdhocField": true
          },
          {
            "argumentName": "responsible_backup",
            "element": "list5",
            "defaultValue": "",
            "addToFieldNameAndValue": true,
            "notAddWhenValueIsBlank": true,
            "isAdhocField": true
          },
          {
            "argumentName": "poDate",
            "element": "date1",
            "defaultValue": "",
            "optional": true
          },
          {
            "argumentName": "installationDate",
            "element": "date2",
            "defaultValue": ""
          }
        ],
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New",
            "label_es": "Nuevo"
          },
          "requiresGridItemSelected": false
        },
        "dialogInfo": {
          "name": "genericDialog",
          "fields": [
            {
              "text1": {
                "label_en": "New Instrument Name",
                "label_es": "Nombre para nuevo instrumento"
              }
            },
            {
              "list1": {
                "label_en": "Family",
                "label_es": "Familia",
                "addBlankValueOnTop": true,
                "addBlankValueAtBottom": false,
                "valuesFromMasterData": {
                  "propertyNameContainer": "instruments_family",
                  "propertyKeyName": "name",
                  "propertyKeyValueEn": "name",
                  "propertyKeyValueEs": "name"
                }
              }
            },
            {
              "text2": {
                "label_en": "Model",
                "label_es": "Modelo"
              }
            },
            {
              "list2": {
                "items": [
                  {
                    "keyName": "LEICA",
                    "keyValue_en": "Leica Biosystems",
                    "keyValue_es": "Leica Biosystems"
                  },
                  {
                    "keyName": "PB INSTRUMENTS",
                    "keyValue_en": "PB Instruments",
                    "keyValue_es": "PB Instruments"
                  },
                  {
                    "keyName": "METTLER",
                    "keyValue_en": "Mettler Toledo",
                    "keyValue_es": "Mettler Toledo"
                  },
                  {
                    "keyName": "PERKIN ELMER",
                    "keyValue_en": "Perkin Elmer",
                    "keyValue_es": "Perkin Elmer"
                  },
                  {
                    "keyName": "AGILENT",
                    "keyValue_en": "Agilent",
                    "keyValue_es": "Agilent"
                  },
                  {
                    "keyName": "WATERS",
                    "keyValue_en": "Waters",
                    "keyValue_es": "Water"
                  }
                ],
                "label_en": "Supplier",
                "label_es": "Proveedor"
              }
            },
            {
              "text3": {
                "label_en": "Serial Number",
                "label_es": "Número de Serie"
              }
            },
            {
              "list3": {
                "items": [
                  {
                    "keyName": "METTLER",
                    "keyValue_en": "Mettler Toledo",
                    "keyValue_es": "Mettler Toledo"
                  },
                  {
                    "keyName": "PERKIN ELMER",
                    "keyValue_en": "Perkin Elmer",
                    "keyValue_es": "Perkin Elmer"
                  },
                  {
                    "keyName": "AGILENT",
                    "keyValue_en": "Agilent",
                    "keyValue_es": "Agilent"
                  },
                  {
                    "keyName": "WATERS",
                    "keyValue_en": "Waters",
                    "keyValue_es": "Water"
                  }
                ],
                "label_en": "ManufacturerName",
                "label_es": "Fabricante"
              }
            },
            {
              "list4": {
                "label_en": "Responsible",
                "label_es": "Responsable",
                "optional": true,
                "addBlankValueOnTop": true,
                "addBlankValueAtBottom": false,
                "valuesFromMasterData": {
                  "propertyNameContainer": "users",
                  "propertyKeyName": "user",
                  "propertyKeyValueEn": "user",
                  "propertyKeyValueEs": "user"
                },
                "dependencyFieldBehavior": [
                  {
                    "field": "list5",
                    "rule": "whenEmpty",
                    "resetValue": true,
                    "action": "hide"
                  }
                ]
              }
            },
            {
              "list5": {
                "label_en": "Responsible Backup",
                "label_es": "Backup del responsable",
                "optional": true,
                "addBlankValueOnTop": true,
                "addBlankValueAtBottom": false,
                "valuesFromMasterData": {
                  "propertyNameContainer": "users",
                  "propertyKeyName": "user",
                  "propertyKeyValueEn": "user",
                  "propertyKeyValueEs": "user"
                }
              }
            },
            {
              "date1": {
                "label_en": "Purchase Date",
                "label_es": "Fecha Compra",
                "optional": true
              }
            },
            {
              "date2": {
                "label_en": "Installation Date",
                "label_es": "Fecha Instalación"
              }
            }
          ]
        }
      },
      {
        "actionName": "TURN_ON_LINE",
        "requiresDialog": false,
        "button": {
          "img": "activate.svg",
          "title": {
            "label_en": "Turn online",
            "label_es": "Poner en servicio"
          },
          "requiresGridItemSelected": true,
          "showWhenSelectedItem": {
            "column": "on_line",
            "value": false
          }
        },
        "endPointParams": [
          {
            "argumentName": "instrumentName",
            "selObjectPropertyName": "name"
          }
        ]
      },
      {
        "actionName": "TURN_OFF_LINE",
        "requiresDialog": false,
        "button": {
          "img": "deactivate.svg",
          "title": {
            "label_en": "Turn off-line",
            "label_es": "Poner fuera de uso"
          },
          "requiresGridItemSelected": true,
          "showWhenSelectedItem": {
            "column": "on_line",
            "value": true
          }
        },
        "endPointParams": [
          {
            "argumentName": "instrumentName",
            "selObjectPropertyName": "name"
          }
        ]
      },
      {
        "actionName": "START_CALIBRATION",
        "requiresDialog": false,
        "button": {
          "img": "inst_ev_type_calibration.svg",
          "title": {
            "label_en": "Start Calibration",
            "label_es": "Iniciar Calibración"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          {
            "argumentName": "instrumentName",
            "selObjectPropertyName": "name"
          }
        ]
      },
      {
        "actionName": "START_PREVENTIVE_MAINTENANCE",
        "requiresDialog": false,
        "button": {
          "img": "inst_ev_type_preventive_maintenance.svg",
          "title": {
            "label_en": "Start Prev Maint",
            "label_es": "Iniciar Mant Prev"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          {
            "argumentName": "instrumentName",
            "selObjectPropertyName": "name"
          }
        ]
      },
      {
        "actionName": "START_SERVICE",
        "requiresDialog": false,
        "button": {
          "img": "inst_ev_type_service.svg",
          "title": {
            "label_en": "Start Service",
            "label_es": "Iniciar Servicio"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          {
            "argumentName": "instrumentName",
            "selObjectPropertyName": "name"
          }
        ]
      },
      {
        "actionName": "START_VERIFICATION",
        "endPoint": "/app/procs/InstrumentsAPIactions",
        "requiresDialog": false,
        "button": {
          "img": "inst_ev_type_verification.svg",
          "title": {
            "label_en": "Start Verification",
            "label_es": "Iniciar Verificación"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          {
            "argumentName": "instrumentName",
            "selObjectPropertyName": "name"
          }
        ]
      },
      {
        "actionName": "DECOMMISSION_INSTRUMENT",
        "endPoint": "/app/procs/InstrumentsAPIactions",
        "endPointParams": [
          {
            "argumentName": "instrumentName",
            "selObjectPropertyName": "name"
          }
        ],
        "requiresDialog": false,
        "button": {
          "icon": "alarm_off",
          "title": {
            "label_en": "Decommission instrument",
            "label_es": "Retirar instrumento"
          },
          "requiresGridItemSelected": true
        }
      },
      {
        "actionName": "UNDECOMMISSION_INSTRUMENT",
        "endPoint": "/app/procs/InstrumentsAPIactions",
        "endPointParams": [
          {
            "argumentName": "instrumentName",
            "selObjectPropertyName": "name"
          }
        ],
        "clientMethod": "openReactivateObjectDialog",
        "button": {
          "icon": "alarm_add",
          "title": {
            "label_en": "Undecommission instrument",
            "label_es": "Recuperar instrumento"
          },
          "requiresGridItemSelected": false
        },
        "requiresDialog": true,
        "dialogInfo": {
          "name": "reactivateObjectDialog",
          "fieldsObject": {
            "queryNumDays": {
              "label_en": "Number of Days",
              "label_es": "Número de Días"
            },
            "objectName": {
              "label_en": "Instrument to reactivate",
              "label_es": "Lote de Producción a Reactivar"
            }
          },
          "listDefinition": {
            "keyFldName": "name",
            "eachEntryTextGenerator": [
              {
                "value": "Instrument: ",
                "type": "fix"
              },
              {
                "value": "name",
                "type": "field"
              }
            ]
          },
          "viewQuery": {
            "actionName": "DECOMISSIONED_INSTRUMENTS_LAST_N_DAYS",
            "clientMethod": "getDeactivatedObjects",
            "endPoint": "/app/procs/InstrumentsAPIqueries",
            "endPointParams": [
              {
                "argumentName": "numDays",
                "element": "queryNumDays",
                "fixValue": 7
              },
              {
                "argumentName": "family",
                "fixValue": "familyCorrecto"
              }
            ]
          },
          "action": []
        }
      },
      {
        "actionName": "INSTRUMENT_AUDIT_FOR_GIVEN_INSTRUMENT",
        "requiresDialog": true,
        "endPoint": "/app/procs/InstrumentsAPIqueries",
        "button": {
          "icon": "rule",
          "title": {
            "label_en": "Instrument Audit",
            "label_es": "Auditoría de Instrumento"
          },
          "requiresGridItemSelected": true
        },
        "clientMethod": "getObjectAuditInfo",
        "endPointParams": [
          {
            "argumentName": "instrumentName",
            "selObjectPropertyName": "name"
          }
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
                  {
                    "argumentName": "instrumentName",
                    "selObjectPropertyName": "name"
                  }
                ]
              },
              "endPointUrl": "Samples",
              "clientMethod": "signAudit",
              "endPointParams": [
                {
                  "argumentName": "instrumentName",
                  "selObjectPropertyName": "name"
                },
                {
                  "argumentName": "auditId",
                  "targetValue": true
                }
              ]
            }
          ]
        }
      },
      {
        "actionName": "ADD_ATTACHMENT",
        "requiresDialog": true,
        "button": {
          "icon": "add_link",
          "title": {
            "label_en": "Add Attachment",
            "label_es": "Añadir Adjunto"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": {
          "name": "genericDialog",
          "fields": [
            {
              "text1": {
                "label_en": "Doc Url",
                "label_es": "Vínculo"
              }
            },
            {
              "text2": {
                "label_en": "Title",
                "label_es": "Título",
                "optional": true
              }
            }
          ]
        },
        "endPointParams": [
          {
            "argumentName": "instrumentName",
            "selObjectPropertyName": "name"
          },
          {
            "argumentName": "fileUrl",
            "element": "text1",
            "defaultValue": ""
          },
          {
            "argumentName": "briefSummary",
            "element": "text2",
            "defaultValue": ""
          }
        ]
      },
      {
        "actionName": "REMOVE_ATTACHMENT",
        "requiresDialog": true,
        "button": {
          "icon": "link_off",
          "title": {
            "label_en": "Remove Attachment",
            "label_es": "Eliminar Adjunto"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": {
          "name": "genericDialog",
          "gridContent": true,
          "dialogQuery": {
            "actionName": "GET_INSTR_ATTACHMENTS",
            "variableForData": "",
            "endPointParams": [
              {
                "argumentName": "instrumentName",
                "internalVariableObjName": "selectedItems",
                "internalVariableObjProperty": "name"
              }
            ],
            "xxxsubViewFilter": {
              "ER-FQ": [],
              "ER-MB": []
            }
          },
          "langConfig": {
            "gridHeader": [
              {
                "fldName": "file_link",
                "label_en": "Link",
                "label_es": "Vínculo",
                "width": "40%",
                "sort": false,
                "filter": true,
                "align": "left"
              },
              {
                "fldName": "brief_summary",
                "label_en": "Title",
                "label_es": "Título",
                "width": "40%",
                "sort": false,
                "filter": true,
                "align": "left"
              }
            ]
          },
          "automatic": true
        },
        "dialogInfo2": {
          "name": "genericDialog",
          "fields": [
            {
              "text1": {
                "label_en": "Doc Url",
                "label_es": "Vínculo"
              }
            }
          ]
        },
        "endPointParams": [
          {
            "argumentName": "instrumentName",
            "selObjectPropertyName": "name"
          },
          {
            "argumentName": "attachmentId",
            "selObjectPropertyName": "id",
            "getFromGrid": true
          }
        ]
      },
      {
        "actionName": "OPEN_ATTACHMENTS",
        "requiresDialog": true,
        "button": {
          "icon": "attach_file",
          "title": {
            "label_en": "Open Attachments",
            "label_es": "Abrir Adjuntos"
          },
          "requiresGridItemSelected": true
        },
        "dialogInfo": {
          "name": "genericDialog",
          "filesListContent": true,
          "dialogQuery": {
            "actionName": "GET_INSTR_ATTACHMENTS",
            "variableForData": "",
            "endPointParams": [
              {
                "argumentName": "instrumentName",
                "internalVariableObjName": "selectedItems",
                "internalVariableObjProperty": "name"
              },
              {
                "argumentName": "family",
                "internalVariableObjName": "selectedItems",
                "internalVariableObjProperty": "family"
              }
            ]
          }
        },
        "endPointParams": [
          {
            "argumentName": "instrumentName",
            "selObjectPropertyName": "instrument"
          },
          {
            "argumentName": "family",
            "selObjectPropertyName": "family"
          },
          {
            "argumentName": "fileUrl",
            "element": "text1",
            "defaultValue": ""
          }
        ]
      },
      {"actionName": "NEW_INVESTIGATION",
        "button": {
          "icon": "find_in_page",
          "requiresGridItemSelected": true,
          "title": {
            "label_es": "Crear Investigación",
            "label_en": "Create Investigation"
          }
        },
        "requiresDialog": false,
        "endPointParams": [
          { "argumentName": "objectToAddObjectType", "fixValue": "instrument" },	
          { "argumentName": "objectToAddObjectName", "selObjectPropertyName": "name" }	
        ],            
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
          { "argumentName": "objectToAddObjectType", "fixValue": "instrument" },	
          { "argumentName": "objectToAddObjectName", "selObjectPropertyName": "name" }	
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
    ],
    "row_buttons": [
      {
        "actionName": "CHANGE_INSTRUMENT_FAMILY",
        "notGetViewData": true,
        "clientMethod": "procMngRequirementsMethod",
        "endPoint": "/app/procs/InstrumentsAPIqueries",
        "selectedItemPropertyName": "selectedItems",
        "requiresDialog": true,
        "certificationException": true,
        "secondaryActionToPerform": {
          "name": "refreshSelProcData"
        },
        "button": {
          "icon": "manage_accounts",
          "title": {
            "label_en": "Change Instrument Family",
            "label_es": "Cambiar Familia Instrumento"
          },
          "requiresGridItemSelected": false
        },
        "dialogInfo": {
          "name": "genericDialog",
          "fields": [
            {
              "text1": {
                "label_en": "New Family Name",
                "label_es": "Nuevo Nombre Familia",
                "selObjectPropertyName": "name"
              }
            }
          ]
        },
        "endPointParams": [
          {
            "argumentName": "procedureName",
            "contextVariableName": "procedureName"
          },
          {
            "argumentName": "procedureVersion",
            "contextVariableName": "procedureVersion"
          },
          {
            "argumentName": "procInstanceName",
            "contextVariableName": "procInstanceName"
          },
          {
            "argumentName": "instrumentName",
            "selObjectPropertyName": "name"
          },
          {
            "argumentName": "newFamilyName",
            "element": "text1",
            "defaultValue": ""
          }
        ]
      }
    ]
  },
  "Deviations":{
    "component": "Tabs",
    "tabs": [
      {
        "filter": "pending",
        "langConfig": {
          "tab": {
            "label_es": "Decisión pendiente",
            "label_en": "Pending Decision"
          },
          "gridHeader": {
              "event_id": {
                "label_en": "Event Id", "label_es": "Id Evento", "sort": false, "filter": true, "width": "10%"
              },
              "instrument": {
                "label_en": "Instrument", "label_es": "Instrumento", "sort": false, "filter": true, "width": "10%"
              },
              "object_type": {
                "label_en": "Object Type", "label_es": "Tipo de objeto", "sort": false, "filter": true, "width": "10%"
              }
          },
          "title": {
            "pending": {
              "label_es": "Decisión pendiente",
              "label_en": "Pending Decision"
            }
          }
        },
        "component": "TableWithButtons",
        "viewQuery": {
          "button": {
            "requiresGridItemSelected": true,
            "icon": "refresh",
            "title": {
              "label_es": "Recargar",
              "label_en": "Reload"
            }
          },
          "actionName": "INVESTIGATION_EVENTS_PENDING_DECISION"
        },
        "actions": [
          {
            "button": {
              "requiresGridItemSelected": true,
              "title": {
                "label_es": "Crear Investigación",
                "label_en": "Create Investigation"
              }
            },
            "requiresDialog": false,
            "endPointParams": [
              {
                "selObjectPropertyName": "event_id",
                "argumentName": "objectToAddObjectName"
              },
              {
                "selObjectPropertyName": "object_type",
                "argumentName": "objectToAddObjectType"
              }
            ],
            "actionName": "NEW_INVESTIGATION"
          },
          {"actionName": "ADD_INVEST_OBJECTS",          
            "requiresDialog": true,
            "button": {
              "title": {
                "label_en": "Add to Investigation", "label_es": "Añadir a Investigación"
              },
              "requiresGridItemSelected": true
            },
            "endPointParams": [
              {"argumentName": "investigationId", "getFromGrid": true, "selObjectPropertyName": "id"},
              { "argumentName": "objectToAddObjectType", "selObjectPropertyName": "object_type" },	
              { "argumentName": "objectToAddObjectName", "selObjectPropertyName": "event_id" }		
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
      },
      {
        "filter": "open",
        "langConfig": {
          "tab": {
            "label_es": "Investigaciones",
            "label_en": "Investigations"
          },
          "gridHeader": {
            "capa_external_system_id": {
              "filter": true,
              "label_es": "Id en Sistema CAPAs",
              "width": "20px",
              "sort": false,
              "label_en": "CAPA System Id"
            },
            "created_on": {
              "filter": true,
              "label_es": "Creación",
              "width": "30px",
              "sort": false,
              "label_en": "Creation"
            },
            "capa_external_system_name": {
              "filter": true,
              "label_es": "Sistema para CAPAs",
              "width": "20px",
              "sort": false,
              "label_en": "CAPA System"
            },
            "external_system_id": {
              "filter": true,
              "label_es": "Id Sistema Externo",
              "width": "20px",
              "sort": false,
              "label_en": "External System Id"
            },
            "description": {
              "filter": true,
              "label_es": "description",
              "width": "20px",
              "sort": false,
              "label_en": "description"
            },
            "id": {
              "filter": true,
              "label_es": "ID",
              "width": "12px",
              "sort": false,
              "label_en": "ID"
            },
            "external_system_name": {
              "filter": true,
              "label_es": "Nombre Sistema Externo",
              "width": "20px",
              "sort": false,
              "label_en": "External System Name"
            },
            "capa_required": {
              "filter": true,
              "label_es": "CAPA Necesario",
              "width": "20px",
              "sort": false,
              "label_en": "capa_required"
            }
          },
          "title": {
            "open": {
              "label_es": "Investigaciones en curso",
              "label_en": "In Progress Investigations"
            }
          },
          "fieldText": {
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
          }
        },
        "component": "TableWithButtons",
        "viewQuery": {
          "button": {
            "requiresGridItemSelected": true,
            "icon": "refresh",
            "title": {
              "label_es": "Recargar",
              "label_en": "Reload"
            }
          },
          "actionName": "OPEN_INVESTIGATIONS"
        },
        "actions": [
          {
            "button": {
              "requiresGridItemSelected": true,
              "title": {
                "label_es": "Decisión",
                "label_en": "Decision"
              }
            },
            "requiresDialog": true,
            "dialogInfo": {
              "name": "decisionDialog"
            },
            "endPointParams": [
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
          },
          {
            "clientMethod": "closeInvestigation",
            "button": {
              "requiresGridItemSelected": true,
              "title": {
                "label_es": "Cerrar",
                "label_en": "Close"
              }
            },
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
  },
  "PlatformInstruments20240725": {
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
          "label_en": "Model", "label_es": "Modelo", "sort": false, "filter": true, "width": "10%"
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
          { "argumentName": "poDate", "element": "date1", "defaultValue": "", "optional": true },
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
                { "keyName": "Balanzas", "keyValue_en": "Balances", "keyValue_es": "Balanzas" },
                { "keyName": "CG", "keyValue_en": "CG", "keyValue_es": "CG" },
                { "keyName": "HPLC", "keyValue_en": "HPLC", "keyValue_es": "HPLC" },
                { "keyName": "UPLC", "keyValue_en": "UPLC", "keyValue_es": "UPLC" }
              ],    
              "label_en": "Family", "label_es": "Familia", "optional": true,
			  "addBlankValueOnTop": true
            }},
            {"text2": { "label_en": "Model", "label_es": "Modelo" }},
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
            {"date1": {"label_en": "Purchase Date", "label_es": "Fecha Compra", "optional": true }},
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
		},
		{"actionName": "ADD_ATTACHMENT",
			"requiresDialog": true,
			"button": {
				"icon": "add_link",
				"title": {
						"label_en": "Add Attachment", "label_es": "Añadir Adjunto"
					},
				"requiresGridItemSelected": true
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"text1": { "label_en": "Doc Url", "label_es": "Vínculo" }},
					{"text2": { "label_en": "Title", "label_es": "Título", "optional": true}}
				]
			},
			"endPointParams": [
				{ "argumentName": "instrumentName", "selObjectPropertyName": "name" },
				{ "argumentName": "fileUrl", "element": "text1", "defaultValue": "" },
				{ "argumentName": "briefSummary", "element": "text2", "defaultValue": "" }
				
			]
		},	  
		{"actionName": "OPEN_ATTACHMENTS",
			"requiresDialog": true,
			"button": {
				"icon": "attach_file",
				"title": {
						"label_en": "Open Attachments", "label_es": "Abrir Adjuntos"
					},
				"requiresGridItemSelected": true
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"filesListContent": true,
				"dialogQuery": {
					"actionName": "GET_INSTR_ATTACHMENTS",
					"variableForData": "",
					"endPointParams": [
						{"argumentName": "instrumentName", "internalVariableObjName": "selectedItems", "internalVariableObjProperty":"name"}
					],
					"xxxsubViewFilter": {
						"ER-FQ": [
						],
						"ER-MB": [
						]
					}
				},					
				"xfields": [
					{"text1": { "label_en": "Doc Url", "label_es": "Vínculo" }}
				]
			},
			"endPointParams": [
				{ "argumentName": "instrumentName", "selObjectPropertyName": "name" },
				{ "argumentName": "fileUrl", "element": "text1", "defaultValue": "" }
			]
		},	  
		{"actionName": "REMOVE_ATTACHMENT",
			"requiresDialog": true,
			"button": {
				"icon": "link_off",
				"title": {
						"label_en": "Remove Attachment", "label_es": "Eliminar Adjunto"
					},
				"requiresGridItemSelected": true
			},
			"dialogInfo": {
				"name": "genericDialog",
				"gridContent": true,
				"dialogQuery": {
					"actionName": "GET_INSTR_ATTACHMENTS",
					"variableForData": "",
					"endPointParams": [
						{"argumentName": "instrumentName", "internalVariableObjName": "selectedItems", "internalVariableObjProperty":"name"}
					],
					"xxxsubViewFilter": {
						"ER-FQ": [
						],
						"ER-MB": [
						]
					}
				},					
				"langConfig": {
					"gridHeader": [
						{"fldName": "file_link", "label_en": "Link", "label_es": "Vínculo", "width": "40%",
							"sort": false, "filter": true, "align": "left"},
						{"fldName": "brief_summary", "label_en": "Title", "label_es": "Título", "width": "40%",
							"sort": false, "filter": true, "align": "left"}
					]
				},
				"automatic": true
			},
			
			"dialogInfo2": {          
				"name": "genericDialog",
				"fields": [
					{"text1": { "label_en": "Doc Url", "label_es": "Vínculo" }}
				]
			},
			"endPointParams": [
				{ "argumentName": "instrumentName", "selObjectPropertyName": "name" },
				{"argumentName": "attachmentId", "selObjectPropertyName": "id", "getFromGrid": true}
			]
		},
  	    {"actionName": "NEW_INVESTIGATION", 
			"alternativeAPIActionMethod": "newInvestigationAction",
			"requiresDialog": false,
			"button": {
			  "title": {
				"label_en": "Create Investigation", "label_es": "Crear Investigación"
			  },
			  "requiresGridItemSelected": true
			},
			"endPointParams": [
				{ "argumentName": "objectToAddObjectType", "fixValue": "instruments" },
				{ "argumentName": "objectToAddObjectName", "selObjectPropertyName": "name" }		
			]
		}		
    ]
  },
  "PlatformInstrumentsBalanzas": {
    "component": "SingleView",
    "hideLeftPane": true,
    "hasOwnComponent": true,
    "showTitleOnTop": true,
    "langConfig": {
      "gridHeader": {
        "name": {
          "label_en": "Name",
          "label_es": "Nombre",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "20%",
          "align": "left"
        },
        "family": {
          "label_en": "Family",
          "label_es": "Familia",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "20%"
        },
        "on_line": {
          "label_en": "On Line",
          "label_es": "En Línea",
          "sort": false,
          "filter": true,
          "is_icon": true,
          "width": "10%"
        },
        "model_number": {
          "label_en": "Model",
          "label_es": "Modelo",
          "sort": false,
          "filter": true,
          "width": "10%"
        },
        "serial_number": {
          "label_en": "Serial N.",
          "label_es": "N. Serie",
          "sort": false,
          "filter": true,
          "width": "10%"
        },
        "supplier": {
          "label_en": "Supplier",
          "label_es": "Proveedor",
          "sort": false,
          "filter": true,
          "width": "10%"
        },
        "manufacturer": {
          "label_en": "Manufacturer",
          "label_es": "Fabricante",
          "sort": false,
          "filter": true,
          "width": "10%"
        },
        "created_on": {
          "label_en": "Creation",
          "label_es": "Creación",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "is_locked": {
          "label_en": "Is locked?",
          "label_es": "¿Bloqueado?",
          "sort": false,
          "filter": false,
          "is_icon": false,
          "width": "10%"
        },
        "detail": {
          "label_en": "Detail",
          "label_es": "Detalle",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "last_calibration": {
          "label_en": "Last Cal",
          "label_es": "Última Cal",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "next_calibration": {
          "label_en": "Next Cal",
          "label_es": "Próxima Cal",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "last_prev_maint": {
          "label_en": "Last PM",
          "label_es": "Último MP",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "next_prev_maint": {
          "label_en": "Next PM",
          "label_es": "Próximo MP",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        }
      },
      "title": {
        "label_en": "Active Instruments Balances",
        "label_es": "Balanzas Instrumentos Activos"
      }
    },
    "viewQuery": {
      "actionName": "ACTIVE_INSTRUMENTS_LIST",
      "dataResponse": "ArrayInRoot",
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
          "argumentName": "familyName",
          "fixValue": "Balanzas"
        }
      ]
    },
    "view_definition": [
      {
        "type": "reportTitle",
        "title": {
          "label_en": "Active Instruments Balances",
          "label_es": "Balanzas Instrumentos Activos"
        }
      },
      {
        "type": "parentReadOnlyTable",
        "allowMultiSelection": false,
        "printable": {"enable": true},
        "downloadable": {
          "enable": true,
          "allowUserSelectColumns": false
        },
        "columns": [
          { "name": "name", "label_en": "Name", "label_es": "Nombre", "addToSmartFilter": true },
          { "name": "family", "label_en": "Family", "label_es": "Familia", "addToSmartFilter": true },
          { "name": "on_line", "label_en": "On Line", "label_es": "En Línea", "addToSmartFilter": true },
          { "name": "model_number", "label_en": "Model", "label_es": "Modelo", "addToSmartFilter": true },
          { "name": "serial_number", "label_en": "Serial N.", "label_es": "N. Serie", "addToSmartFilter": true },
          { "name": "supplier", "label_en": "Supplier", "label_es": "Proveedor", "addToSmartFilter": true },
          { "name": "manufacturer", "label_en": "Manufacturer", "label_es": "Fabricante", "addToSmartFilter": true },
          { "name": "created_on", "label_en": "Creation", "label_es": "Creación", "addToSmartFilter": true },
          { "name": "is_locked", "label_en": "Is locked?", "label_es": "¿Bloqueado?", "addToSmartFilter": true },
          { "name": "detail", "label_en": "Detail", "label_es": "Detalle", "addToSmartFilter": true },
          { "name": "last_calibration", "label_en": "Last Cal", "label_es": "Última Cal", "addToSmartFilter": true },
          { "name": "next_calibration", "label_en": "Next Cal", "label_es": "Próxima Cal", "addToSmartFilter": true },
          { "name": "last_prev_maint", "label_en": "Last PM", "label_es": "Último MP", "addToSmartFilter": true },
          { "name": "next_prev_maint", "label_en": "Next PM", "label_es": "Próximo MP", "addToSmartFilter": true }
        ],
        "actions": [
          {
              "actionName": "NEW_INSTRUMENT",
              "requiresDialog": true,
              "endPointParams": [
                {
                  "argumentName": "instrumentName",
                  "element": "text1",
                  "defaultValue": ""
                },
                {
                  "argumentName": "familyName",
                  "fixValue": "Balanzas"
                },
                {
                  "argumentName": "modelNumber",
                  "element": "text2",
                  "defaultValue": ""
                },
                {
                  "argumentName": "supplierName",
                  "element": "list2",
                  "defaultValue": ""
                },
                {
                  "argumentName": "serialNumber",
                  "element": "text3",
                  "defaultValue": ""
                },
                {
                  "argumentName": "manufacturerName",
                  "element": "list3",
                  "defaultValue": ""
                },
                {
                  "argumentName": "responsible",
                  "element": "list4",
                  "defaultValue": "",
                  "addToFieldNameAndValue": true
                },
                {
                  "argumentName": "responsible_backup",
                  "element": "list5",
                  "defaultValue": "",
                  "addToFieldNameAndValue": true
                },
                {
                  "argumentName": "poDate",
                  "element": "date1",
                  "defaultValue": "",
                  "optional": true
                },
                {
                  "argumentName": "installationDate",
                  "element": "date2",
                  "defaultValue": ""
                }
              ],
              "button": {
                "icon": "create_new_folder",
                "title": {
                  "label_en": "New",
                  "label_es": "Nuevo"
                },
                "requiresGridItemSelected": false
              },
              "dialogInfo": {
                "name": "genericDialog",
                "fields": [
                  {
                    "text1": {
                      "label_en": "New Instrument Name",
                      "label_es": "Nombre para nuevo instrumento"
                    }
                  },
                  {
                    "text2": {
                      "label_en": "Model",
                      "label_es": "Modelo"
                    }
                  },
                  {
                    "list2": {
                      "items": [
                        {
                          "keyName": "LEICA",
                          "keyValue_en": "Leica Biosystems",
                          "keyValue_es": "Leica Biosystems"
                        },
                        {
                          "keyName": "PB INSTRUMENTS",
                          "keyValue_en": "PB Instruments",
                          "keyValue_es": "PB Instruments"
                        },
                        {
                          "keyName": "METTLER",
                          "keyValue_en": "Mettler Toledo",
                          "keyValue_es": "Mettler Toledo"
                        },
                        {
                          "keyName": "PERKIN ELMER",
                          "keyValue_en": "Perkin Elmer",
                          "keyValue_es": "Perkin Elmer"
                        },
                        {
                          "keyName": "AGILENT",
                          "keyValue_en": "Agilent",
                          "keyValue_es": "Agilent"
                        },
                        {
                          "keyName": "WATERS",
                          "keyValue_en": "Waters",
                          "keyValue_es": "Water"
                        }
                      ],
                      "label_en": "Supplier",
                      "label_es": "Proveedor"
                    }
                  },
                  {
                    "text3": {
                      "label_en": "Serial Number",
                      "label_es": "Número de Serie"
                    }
                  },
                  {
                    "list3": {
                      "items": [
                        {
                          "keyName": "METTLER",
                          "keyValue_en": "Mettler Toledo",
                          "keyValue_es": "Mettler Toledo"
                        },
                        {
                          "keyName": "PERKIN ELMER",
                          "keyValue_en": "Perkin Elmer",
                          "keyValue_es": "Perkin Elmer"
                        },
                        {
                          "keyName": "AGILENT",
                          "keyValue_en": "Agilent",
                          "keyValue_es": "Agilent"
                        },
                        {
                          "keyName": "WATERS",
                          "keyValue_en": "Waters",
                          "keyValue_es": "Water"
                        }
                      ],
                      "label_en": "ManufacturerName",
                      "label_es": "Fabricante"
                    }
                  },
                  {
                    "list4": {
                      "items": [
                        {
                          "keyName": "responsible",
                          "keyValue_en": "responsible",
                          "keyValue_es": "responsible"
                        }
                      ],
                      "label_en": "Responsible",
                      "label_es": "Responsable",
                      "optional": true,
                      "addBlankValueOnTop": true,
                      "addBlankValueAtBottom": false,
                      "valuesFromMasterData": {
                        "elementName": "list4",
                        "propertyNameContainer": "users",
                        "propertyNameContainerLevelPropertyKeyName": "user",
                        "propertyKeyName": "user",
                        "propertyKeyValueEn": "user",
                        "propertyKeyValueEs": "user"
                      },
                      "dependencyFieldBehavior": [
                        {
                          "field": "list5",
                          "rule": "whenEmpty",
                          "resetValue": true,
                          "action": "hide"
                        }
                      ]
                    }
                  },
                  {
                    "list5": {
                      "items": [
                        {
                          "keyName": "responsible_backup",
                          "keyValue_en": "responsible_backup",
                          "keyValue_es": "responsible_backup"
                        }
                      ],
                      "label_en": "Responsible Backup",
                      "label_es": "Backup del responsable",
                      "optional": true,
                      "addBlankValueOnTop": true,
                      "addBlankValueAtBottom": false,
                      "valuesFromMasterData": {
                        "elementName": "list5",
                        "propertyNameContainer": "users",
                        "propertyNameContainerLevelPropertyKeyName": "user",
                        "propertyKeyName": "user",
                        "propertyKeyValueEn": "user",
                        "propertyKeyValueEs": "user"
                      }
                    }
                  },
                  {
                    "date1": {
                      "label_en": "Purchase Date",
                      "label_es": "Fecha Compra",
                      "optional": true
                    }
                  },
                  {
                    "date2": {
                      "label_en": "Installation Date",
                      "label_es": "Fecha Instalación"
                    }
                  }
                ]
              }
            },
            {
              "actionName": "TURN_OFF_LINE",
              "requiresDialog": false,
              "button": {
                "img": "deactivate.svg",
                "title": {
                  "label_en": "Deactivate",
                  "label_es": "Desactivar"
                },
                "requiresGridItemSelected": true,
                "showWhenSelectedItem": {
                  "column": "on_line",
                  "value": true
                }
              },
              "endPointParams": [
                {
                  "argumentName": "instrumentName",
                  "selObjectPropertyName": "name"
                }
              ]
            },
            {
              "actionName": "TURN_ON_LINE",
              "requiresDialog": false,
              "button": {
                "img": "activate.svg",
                "title": {
                  "label_en": "Activate",
                  "label_es": "Activar"
                },
                "requiresGridItemSelected": true,
                "showWhenSelectedItem": {
                  "column": "on_line",
                  "value": false
                }
              },
              "endPointParams": [
                {
                  "argumentName": "instrumentName",
                  "selObjectPropertyName": "name"
                }
              ]
            },
            {
              "actionName": "START_CALIBRATION",
              "requiresDialog": false,
              "button": {
                "img": "inst_ev_type_calibration.svg",
                "title": {
                  "label_en": "Start Calibration",
                  "label_es": "Iniciar Calibración"
                },
                "requiresGridItemSelected": true
              },
              "endPointParams": [
                {
                  "argumentName": "instrumentName",
                  "selObjectPropertyName": "name"
                }
              ]
            },
            {
              "actionName": "START_PREVENTIVE_MAINTENANCE",
              "requiresDialog": false,
              "button": {
                "img": "inst_ev_type_preventive_maintenance.svg",
                "title": {
                  "label_en": "Start Prev Maint",
                  "label_es": "Iniciar Mant Prev"
                },
                "requiresGridItemSelected": true
              },
              "endPointParams": [
                {
                  "argumentName": "instrumentName",
                  "selObjectPropertyName": "name"
                }
              ]
            },
            {
              "actionName": "START_SERVICE",
              "requiresDialog": false,
              "button": {
                "img": "inst_ev_type_service.svg",
                "title": {
                  "label_en": "Start Service",
                  "label_es": "Iniciar Servicio"
                },
                "requiresGridItemSelected": true
              },
              "endPointParams": [
                {
                  "argumentName": "instrumentName",
                  "selObjectPropertyName": "name"
                }
              ]
            },
            {
              "actionName": "START_VERIFICATION",
              "endPoint": "/app/procs/InstrumentsAPIactions",
              "requiresDialog": false,
              "button": {
                "img": "inst_ev_type_verification.svg",
                "title": {
                  "label_en": "Start Verification",
                  "label_es": "Iniciar Verificación"
                },
                "requiresGridItemSelected": true
              },
              "endPointParams": [
                {
                  "argumentName": "instrumentName",
                  "selObjectPropertyName": "name"
                }
              ]
            },
            {
              "actionName": "DECOMMISSION_INSTRUMENT",
              "endPoint": "/app/procs/InstrumentsAPIactions",
              "endPointParams": [
                {
                  "argumentName": "instrumentName",
                  "selObjectPropertyName": "name"
                }
              ],
              "requiresDialog": false,
              "button": {
                "icon": "alarm_off",
                "title": {
                  "label_en": "Deactivate",
                  "label_es": "Desactivar"
                },
                "requiresGridItemSelected": true
              }
            },
            {
              "actionName": "UNDECOMMISSION_INSTRUMENT",
              "endPoint": "/app/procs/InstrumentsAPIactions",
              "endPointParams": [
                {
                  "argumentName": "instrumentName",
                  "selObjectPropertyName": "name"
                }
              ],
              "clientMethod": "openReactivateObjectDialog",
              "button": {
                "icon": "alarm_add",
                "title": {
                  "label_en": "Activate",
                  "label_es": "Activar"
                },
                "requiresGridItemSelected": false
              },
              "requiresDialog": true,
              "dialogInfo": {
                "name": "reactivateObjectDialog",
                "fieldsObject": {
                  "queryNumDays": {
                    "label_en": "Number of Days",
                    "label_es": "Número de Días"
                  },
                  "objectName": {
                    "label_en": "Instrument to reactivate",
                    "label_es": "Lote de Producción a Reactivar"
                  }
                },
                "listDefinition": {
                  "keyFldName": "name",
                  "eachEntryTextGenerator": [
                    {
                      "value": "Instrument: ",
                      "type": "fix"
                    },
                    {
                      "value": "name",
                      "type": "field"
                    }
                  ]
                },
                "viewQuery": {
                  "actionName": "DECOMISSIONED_INSTRUMENTS_LAST_N_DAYS",
                  "clientMethod": "getDeactivatedObjects",
                  "endPoint": "/app/procs/InstrumentsAPIqueries",
                  "endPointParams": [
                    {
                      "argumentName": "numDays",
                      "element": "queryNumDays",
                      "fixValue": 7
                    },
                    {
                      "argumentName": "family",
                      "fixValue": "familyCorrecto"
                    }
                  ]
                }
              }
            },
            {
              "actionName": "ADD_ATTACHMENT",
              "requiresDialog": true,
              "button": {
                "icon": "add_link",
                "title": {
                  "label_en": "Add Attachment",
                  "label_es": "Añadir Adjunto"
                },
                "requiresGridItemSelected": true
              },
              "dialogInfo": {
                "name": "genericDialog",
                "fields": [
                  {
                    "text1": {
                      "label_en": "Doc Url",
                      "label_es": "Vínculo"
                    }
                  },
                  {
                    "text2": {
                      "label_en": "Title",
                      "label_es": "Título",
                      "optional": true
                    }
                  }
                ]
              },
              "endPointParams": [
                {
                  "argumentName": "instrumentName",
                  "selObjectPropertyName": "name"
                },
                {
                  "argumentName": "fileUrl",
                  "element": "text1",
                  "defaultValue": ""
                },
                {
                  "argumentName": "briefSummary",
                  "element": "text2",
                  "defaultValue": ""
                }
              ]
            },
            {
              "actionName": "REMOVE_ATTACHMENT",
              "requiresDialog": true,
              "button": {
                "icon": "link_off",
                "title": {
                  "label_en": "Remove Attachment",
                  "label_es": "Eliminar Adjunto"
                },
                "requiresGridItemSelected": true
              },
              "dialogInfo": {
                "name": "genericDialog",
                "gridContent": true,
                "dialogQuery": {
                  "actionName": "GET_INSTR_ATTACHMENTS",
                  "variableForData": "",
                  "endPointParams": [
                    {
                      "argumentName": "instrumentName",
                      "internalVariableObjName": "selectedItems",
                      "internalVariableObjProperty": "name"
                    }
                  ],
                  "xxxsubViewFilter": {
                    "ER-FQ": [],
                    "ER-MB": []
                  }
                },
                "langConfig": {
                  "gridHeader": [
                    {
                      "fldName": "file_link",
                      "label_en": "Link",
                      "label_es": "Vínculo",
                      "width": "40%",
                      "sort": false,
                      "filter": true,
                      "align": "left"
                    },
                    {
                      "fldName": "brief_summary",
                      "label_en": "Title",
                      "label_es": "Título",
                      "width": "40%",
                      "sort": false,
                      "filter": true,
                      "align": "left"
                    }
                  ]
                },
                "automatic": true
              },
              "dialogInfo2": {
                "name": "genericDialog",
                "fields": [
                  {
                    "text1": {
                      "label_en": "Doc Url",
                      "label_es": "Vínculo"
                    }
                  }
                ]
              },
              "endPointParams": [
                {
                  "argumentName": "instrumentName",
                  "selObjectPropertyName": "name"
                },
                {
                  "argumentName": "attachmentId",
                  "selObjectPropertyName": "id",
                  "getFromGrid": true
                }
              ]
            },
            {
              "actionName": "OPEN_ATTACHMENTS",
              "requiresDialog": true,
              "button": {
                "icon": "attach_file",
                "title": {
                  "label_en": "Open Attachments",
                  "label_es": "Abrir Adjuntos"
                },
                "requiresGridItemSelected": true
              },
              "dialogInfo": {
                "name": "genericDialog",
                "filesListContent": true,
                "dialogQuery": {
                  "actionName": "GET_INSTR_ATTACHMENTS",
                  "variableForData": "",
                  "endPointParams": [
                    {
                      "argumentName": "instrumentName",
                      "internalVariableObjName": "selectedItems",
                      "internalVariableObjProperty": "name"
                    },
                    {
                      "argumentName": "family",
                      "internalVariableObjName": "selectedItems",
                      "internalVariableObjProperty": "family"
                    }
                  ]
                }
              },
              "endPointParams": [
                {
                  "argumentName": "instrumentName",
                  "selObjectPropertyName": "instrument"
                },
                {
                  "argumentName": "family",
                  "selObjectPropertyName": "family"
                },
                {
                  "argumentName": "fileUrl",
                  "element": "text1",
                  "defaultValue": ""
                }
              ]
            }
          ]
        }
    ]
  },
  "PlatformInstrumentsHPLC-UPLC": {
	"component": "Tabs",
	"tabs": [
	{"component": "TableWithButtons",
    "langConfig": {
	  "tab": {
          "label_en": "Active Instruments HPLC", 
          "label_es": "Instrumentos activos de HPLC"
      },
      "title": {
          "label_en": "Active Instruments HPLC",
          "label_es": "Instrumentos activos de HPLC"
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
          "label_en": "Model", "label_es": "Modelo", "sort": false, "filter": true, "width": "10%"
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
          { "argumentName": "familyName", "fixValue": "HPLC"}
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
          { "argumentName": "familyName", "fixValue": "HPLC"},
          { "argumentName": "modelNumber", "element": "text2", "defaultValue": "" },
          { "argumentName": "supplierName", "element": "list2", "defaultValue": "" },
          { "argumentName": "serialNumber", "element": "text3", "defaultValue": "" },
          { "argumentName": "manufacturerName", "element": "list3", "defaultValue": "" },
		  { "argumentName": "responsible", "element": "list4", "defaultValue": "", "addToFieldNameAndValue": true},
		  { "argumentName": "responsible_backup", "element": "list5", "defaultValue": "", "addToFieldNameAndValue": true},
          { "argumentName": "poDate", "element": "date1", "defaultValue": "", "optional": true },
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
            {"text2": { "label_en": "Model", "label_es": "Modelo" }},
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
            {"date1": {"label_en": "Purchase Date", "label_es": "Fecha Compra", "optional": true }},
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
          "label_en": "Active Instruments UPLC", 
          "label_es": "Instrumentos activos de UPLC"
      },
      "title": {
          "label_en": "Active Instruments UPLC",
          "label_es": "Instrumentos activos de UPLC"
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
          "label_en": "Model", "label_es": "Modelo", "sort": false, "filter": true, "width": "10%"
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
          { "argumentName": "familyName", "fixValue": "UPLC"}
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
          { "argumentName": "familyName", "fixValue": "UPLC"},
          { "argumentName": "modelNumber", "element": "text2", "defaultValue": "" },
          { "argumentName": "supplierName", "element": "list2", "defaultValue": "" },
          { "argumentName": "serialNumber", "element": "text3", "defaultValue": "" },
          { "argumentName": "manufacturerName", "element": "list3", "defaultValue": "" },
		  { "argumentName": "responsible", "element": "list4", "defaultValue": "", "addToFieldNameAndValue": true },
		  { "argumentName": "responsible_backup", "element": "list5", "defaultValue": "", "addToFieldNameAndValue": true },
          { "argumentName": "poDate", "element": "date1", "defaultValue": "", "optional": true },
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
            {"text2": { "label_en": "Model", "label_es": "Modelo" }},
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
            {"date1": {"label_en": "Purchase Date", "label_es": "Fecha Compra", "optional": true }},
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
  "PlatformInstrumentsCG": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "InstrumentsListCG": {
          "label_en": "Active Instruments CG",
          "label_es": "Instrumentos activos de CG"
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
          "label_en": "Model", "label_es": "Modelo", "sort": false, "filter": true, "width": "10%"
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
          { "argumentName": "familyName", "fixValue": "CG"}
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
          { "argumentName": "familyName", "fixValue": "CG"},
          { "argumentName": "modelNumber", "element": "text2", "defaultValue": "" },
          { "argumentName": "supplierName", "element": "list2", "defaultValue": "" },
          { "argumentName": "serialNumber", "element": "text3", "defaultValue": "" },
          { "argumentName": "manufacturerName", "element": "list3", "defaultValue": "" },
		  { "argumentName": "responsible", "element": "list4", "defaultValue": "", "addToFieldNameAndValue": true},
		  { "argumentName": "responsible_backup", "element": "list5", "defaultValue": "", "addToFieldNameAndValue": true},
          { "argumentName": "poDate", "element": "date1", "defaultValue": "", "optional": true },
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
            {"text2": { "label_en": "Model", "label_es": "Modelo" }},
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
            {"date1": {"label_en": "Purchase Date", "label_es": "Fecha Compra", "optional": true }},
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
  },
  "EventsInProgress": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "EventsER": {
          "label_en": "20280319Events in progress",
          "label_es": "Eventos en curso"
        }
      },
      "gridHeader": {
        "event_type": {"label_en": "Event", "label_es": "Evento", "sort": false, "filter": true, "is_icon": true, "width": "20%"},
        "instrument": {"label_en": "Instrument", "label_es": "Instrumento", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"},
        "created_on": {"label_en": "Creation", "label_es": "Creación", "sort": false, "filter": true, "is_icon": false, "width": "10%"},
        "created_by": {"label_en": "Creator", "label_es": "Creador", "sort": false, "filter": false, "is_icon": false, "width": "10%"}
      }
    },
    "viewQuery":{ "actionName": "INSTRUMENT_EVENTS_INPROGRESS",	  
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
      "keyFldName": "id",
		  "subQueryName": "getParams",		  
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
      },
		{"actionName": "ADD_ATTACHMENT",
			"requiresDialog": true,
			"button": {
				"icon": "add_link",
				"title": {
						"label_en": "Add Attachment", "label_es": "Añadir Adjunto"
					},
				"requiresGridItemSelected": true
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"text1": { "label_en": "Doc Url", "label_es": "Vínculo" }},
					{"text2": { "label_en": "Title", "label_es": "Título", "optional": true}}
				]
			},
			"endPointParams": [
				{"argumentName": "instrumentName", "xinternalVariableObjName": "selectedItems", "selObjectPropertyName":"instrument"},
				{"argumentName": "eventId", "xinternalVariableObjName": "selectedItems", "selObjectPropertyName":"id"},
				{ "argumentName": "fileUrl", "element": "text1", "defaultValue": "" },
				{ "argumentName": "briefSummary", "element": "text2", "defaultValue": "" }
				
			]
		},	  
		{"actionName": "OPEN_ATTACHMENTS",
			"requiresDialog": true,
			"button": {
				"icon": "attach_file",
				"title": {
						"label_en": "Open Attachments", "label_es": "Abrir Adjuntos"
					},
				"requiresGridItemSelected": true
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"filesListContent": true,
				"dialogQuery": {
					"actionName": "GET_INSTR_ATTACHMENTS",
					"variableForData": "",
					"endPointParams": [
						{"argumentName": "instrumentName", "internalVariableObjName": "selectedItems", "internalVariableObjProperty":"instrument"},
						{"argumentName": "eventId", "internalVariableObjName": "selectedItems", "internalVariableObjProperty":"id"}
						
					]
				}
			},
			"endPointParams": [
				{ "argumentName": "instrumentName", "selObjectPropertyName": "instrument" },
				{ "argumentName": "eventId", "selObjectPropertyName": "id"},
				{ "argumentName": "fileUrl", "element": "text1", "defaultValue": "" }
			]
		},	  
		{"actionName": "REMOVE_ATTACHMENT",
			"requiresDialog": true,
			"button": {
				"icon": "link_off",
				"title": {
						"label_en": "Remove Attachment", "label_es": "Eliminar Adjunto"
					},
				"requiresGridItemSelected": true
			},
			"dialogInfo": {
				"name": "genericDialog",
				"gridContent": true,
				"dialogQuery": {
					"actionName": "GET_INSTR_ATTACHMENTS",
					"variableForData": "",
					"endPointParams": [
						{"argumentName": "instrumentName", "internalVariableObjName": "selectedItems", "internalVariableObjProperty":"instrument"},
						{"argumentName": "eventId", "internalVariableObjName": "selectedItems", "internalVariableObjProperty":"id"}
					],
					"xxxsubViewFilter": {
						"ER-FQ": [
						],
						"ER-MB": [
						]
					}
				},					
				"langConfig": {
					"gridHeader": [
						{"fldName": "file_link", "label_en": "Link", "label_es": "Vínculo", "width": "40%",
							"sort": false, "filter": true, "align": "left"},
						{"fldName": "brief_summary", "label_en": "Title", "label_es": "Título", "width": "40%",
							"sort": false, "filter": true, "align": "left"}
					]
				},
				"automatic": true
			},
			
			"dialogInfo2": {          
				"name": "genericDialog",
				"fields": [
					{"text1": { "label_en": "Doc Url", "label_es": "Vínculo" }}
				]
			},
			"endPointParams": [
				{ "argumentName": "instrumentName", "selObjectPropertyName": "instrument" },
				{ "argumentName": "eventId", "selObjectPropertyName": "id"},
				{"argumentName": "attachmentId", "selObjectPropertyName": "id", "getFromGrid": true}
			]
		}	
  ]
  },
  "Deviation": {
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
            "event_id": {
              "label_en": "Event Id", "label_es": "Id evento", "sort": false, "filter": true, "width": "10%"
            },
            "instrument": {
              "label_en": "Instrument", "label_es": "Instrumento", "sort": false, "filter": true, "width": "10%"
            },
            "crated_by": {
              "label_en": "Created By", "label_es": "Creado por", "sort": true, "filter": false, "width": "15%"
            },
            "created_on": {
              "label_en": "Created on", "label_es": "Fecha de creación", "sort": false, "filter": true, "width": "15%"
            },
            "object_type": {
              "label_en": "Object Type", "label_es": "Tipo de objeto", "sort": false, "filter": true, "width": "10%"
            }
          }
        },
        "viewQuery":{
            "actionName": "INVESTIGATION_EVENTS_PENDING_DECISION",
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
			"requiresDialog": false,
            "button": {
              "title": {
                "label_en": "Create Investigation", "label_es": "Crear Investigación"
              },
              "requiresGridItemSelected": true
            },
            "endPointParams": [
              { "argumentName": "objectToAddObjectType", "selObjectPropertyName": "object_type" },	
              { "argumentName": "objectToAddObjectName", "selObjectPropertyName": "event_id" }		
            ]
          },
          {"actionName": "OPEN_INVESTIGATIONS",          
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
                  "endPointParams": [
                    {"argumentName": "investigationId", "getFromGrid": true, "selObjectPropertyName": "id"},
					          { "argumentName": "objectToAddObjectType", "selObjectPropertyName": "object_type" },
					          { "argumentName": "objectToAddObjectName", "selObjectPropertyName": "event_id" }
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
  "EventsCalendar":{
    "component": "ObjectByTabs",
	  "hideLeftPane": false,
    "hasOwnComponent": true,
    "showTitleOnTop": true,
    "title": {
      "fix_text_en": "Master data",
      "fix_text_es": "Datos maestros",
      "name": ""
    },
    "viewQuery": {
      "actionName": "INSTRUMENT_EVENTS_CALENDAR",
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
        { "argumentName": "instrumentName", "element": "filtertext1"},
        { "argumentName": "familyName", "element": "filtertext2"},
        { "argumentName": "startDate", "element": "filterdaterange1dateStart"},
        { "argumentName": "endDate", "element": "filterdaterange1dateEnd"}
      ]
    },
    "filter_button": {
		"label_en": "Search",
		"label_es": "Buscar"
	},
  "filter": [
		{"filterdaterange1":{
			"dateStart":{ "label_en": "Sampling Start Date", "label_es": "Fecha Inicio Muestreo", "default_value": "" },
			"dateEnd":{ "label_en": "Sampling End Date", "label_es": "Fecha Fin Muestreo", "default_value": "" }}
		},
		{"filtertext1": {
			"label_en": "Instrument to get", "label_es": "Instrumento a cargar","default_value": ""}
		},
		{"filtertext2": {
		  "label_en": "Families to get", "label_es": "Familias a cargar", "default_value": ""}
		}
	],		
	"actions": [],
	"tabs": [
		{"tabLabel_en": "References by category", "tabLabel_es": "Referencias por categoría", "view": "Variables",
			"view_definition": [
			  {
				"actions": []
			  },
			  {
				"type": "Calendar",
				"endPointResponseObject": "raw_data",
				"smartFilter": true,
				"columns": [
				  {
					"name": "name",
					"label_en": "Code",
					"label_es": "Código"
				  }
				],
				"actions": [
					{
						"actionName": "CONFIG_NEW_CATEGORY",
						"requiresDialog": true,
						"notGetViewData": false,
						"selectedItemPropertyName": "selectedItems",	  
						"button": {
						  "icon": "edit",
						  "title": {
							"label_en": "Add new category",
							"label_es": "Añadir nueva categoría"
						  },
						  "requiresGridItemSelected": false
						},
						"dialogInfo": {
						  "name": "genericDialog",
						  "fields": [
							{
							  "text1": {
								"label_en": "New category name",
								"label_es": "Nombre para nueva categoría",
								"defaultValue": "",
								"optional": false
							  }
							}
						  ]
						},
						"endPointParams": [
						  {
							"argumentName": "newCategoryName",
							"element": "text1"							
						  }
						]
					}
				],
				"row_buttons": [

				],
				"children": "inv_reference",
				"children_definition": {
					"smartFilter": true,
				  "title": {
					"label_en": "References",
					"label_es": "Referencias"
				  },
				  "columns": [
					{
					  "name": "name",
					  "label_en": "Name",
					  "label_es": "Nombre"
					},
					{
					  "name": "param_type",
					  "label_en": "Type",
					  "label_es": "Tipo",
					  "as_paragraph":"{fld:param_type} - {fld:allowed_values}"
					},
					{
					  "name": "allowed_values",
					  "label_en": "Allowed values",
					  "label_es": "Valores permitidos"
					},
					{
					  "name": "required",
					  "label_en": "Required",
					  "label_es": "Obligatorio"
					}
				  ],
				  "row_buttons": [
					{
						"actionName": "CONFIG_UPDATE_REFERENCE",
						"requiresDialog": true,
						"notGetViewData": false,
						"selectedItemPropertyName": "selectedItems",
						"button": {
						  "icon": "edit",
						  "title": {
							"label_en": "Edit reference",
							"label_es": "Configurar referencia"
						  },
						  "requiresGridItemSelected": true
						},
						"dialogInfo": {
						  "name": "genericDialog",
						  "fields": [
							{
							  "checkbox1": {
								"label_en": "Requires Qualification?",
								"label_es": "¿Requiere Cualificación?",
								"selObjectPropertyName": "lot_requires_qualif",
								"optional": false
							  }
							},
							{
							  "number1": {
								"label_en": "Min Stock",
								"label_es": "Stock Mínimo",
								"selObjectPropertyName": "min_stock",
								"optional": true
							  }
							},
							{
							  "list2": {
								"label_en": "UOM",
								"label_es": "UDM",
								"selObjectPropertyName": "min_stock_uom",
								"addBlankValueOnTop": true,
								"addBlankValueAtBottom": false,
								"optional": true,
								"valuesFromMasterData": {
								  "propertyNameContainer": "units_of_measurement",
								  "propertyKeyName": "pretty_name",
								  "propertyKeyValueEn": [
									"pretty_name"
								  ],
								  "propertyKeyValueEs": [
									"pretty_name"
								  ]
								}
							  }
							},
							{
							  "multilist1": {
								"label_en": "Other Allowed UOMs",
								"label_es": "Otras UDM aceptadas",
								"selObjectPropertyName": "allowed_uoms",
								"addBlankValueOnTop": true,
								"addBlankValueAtBottom": false,
								"valuesFromMasterData": {
								  "propertyNameContainer": "units_of_measurement",
								  "propertyKeyName": "pretty_name",
								  "propertyKeyValueEn": [
									"pretty_name"
								  ],
								  "propertyKeyValueEs": [
									"pretty_name"
								  ]
								}
							  }
							},
							{
							  "list3": {
								"label_en": "min Stock Type",
								"label_es": "Tipo Stock Mínimo",
								"selObjectPropertyName": "min_stock_type",
								"optional": true,
								"addBlankValueOnTop": true,
								"items": [
								  {
									"keyName": "QUANTITY",
									"keyValue_en": "Quantity",
									"keyValue_es": "Cantidad"
								  },
								  {
									"keyName": "PB ITEMS",
									"keyValue_en": "Items",
									"keyValue_es": "Items"
								  }
								]
							  }
							},
							{
							  "checkbox2": {
								"label_en": "Requires control for Available for use",
								"label_es": "¿Requiere control disponible para uso?",
								"selObjectPropertyName": "requires_availables_for_use",
								"optional": true
							  }
							},
							{
							  "number2": {
								"label_en": "Min Available for use",
								"label_es": "Minimo en Disponible para uso",
								"selObjectPropertyName": "min_availables_for_use",
								"optional": true
							  }
							},
							{
								"list4": {
								  "label_en": "min Available for use stock Type",
								  "label_es": "Tipo Stock Para Mínimo disponible",
								  "selObjectPropertyName": "min_availables_for_use_type",
								  "optional": true,
								  "addBlankValueOnTop": true,
								  "items": [
									{
									  "keyName": "QUANTITY",
									  "keyValue_en": "Quantity",
									  "keyValue_es": "Cantidad"
									},
									{
									  "keyName": "PB ITEMS",
									  "keyValue_en": "Items",
									  "keyValue_es": "Items"
									}
								  ]
								}
							},							
							{
							  "checkbox3": {
								"label_en": "Allow Some open at a time?",
								"label_es": "¿Permitir abrir varios a la vez?",
								"selObjectPropertyName": "allow_opening_some_at_a_time",
								"optional": true
							  }
							},
							{
								"list5": {
									"label_en": "Qualification Variables Set",
									"label_es": "Conjunto Variables para Cualificación",
									"selectedItemPropertyName": "qualif_variables_set",
									"optional": true,
									"addBlankValueOnTop": true,
									  "addBlankValueAtBottom": false,
									  "valuesFromMasterData": {
										"propertyNameContainer": "variables_set",
										"propertyNameContainerLevelPropertyKeyName": "name",
										"propertyKeyName": "name",
										"propertyKeyValueEn": "name",
										"propertyKeyValueEs": "name"
									  }
								}
							}
						  ]
						},
						"endPointParams": [
						  {
							"argumentName": "category",
							"selObjectPropertyName": "category"
						  },
						  {
							"argumentName": "referenceName",
							"selObjectPropertyName": "name"
						  },
						  {
							"argumentName": "lot_requires_qualif",
							"element": "checkbox1",
							"addToFieldNameAndValue": true,
							"notAddWhenValueIsBlank": true,
							"fieldType": "BOOLEAN"
						  },
						  {
							"argumentName": "min_stock",
							"element": "number1",
							"addToFieldNameAndValue": true,
							"fieldType": "INTEGER",
							"notAddWhenValueIsBlank": true
						  },
						  {
							"argumentName": "min_stock_uom",
							"element": "list2",
							"addToFieldNameAndValue": true,
							"notAddWhenValueIsBlank": true
						  },
						  {
							"argumentName": "allowed_uoms",
							"element": "multilist1",
							"defaultValue": "",
							"addToFieldNameAndValue": true,
							"notAddWhenValueIsBlank": true
						  },
						  {
							"argumentName": "min_stock_type",
							"element": "list3",
							"addToFieldNameAndValue": true,
							"notAddWhenValueIsBlank": true
						  },
						  {
							"argumentName": "requires_availables_for_use",
							"element": "checkbox2",
							"addToFieldNameAndValue": true,
							"notAddWhenValueIsBlank": true
						  },
						  {
							"argumentName": "min_availables_for_use",
							"element": "number2",
							"addToFieldNameAndValue": true,
							"notAddWhenValueIsBlank": true
						  },
						  {
							"argumentName": "min_availables_for_use_type",
							"element": "list4",
							"addToFieldNameAndValue": true,
							"notAddWhenValueIsBlank": true
						  },
						  {
							"argumentName": "allow_opening_some_at_a_time",
							"element": "checkbox3",
							"addToFieldNameAndValue": true,
							"notAddWhenValueIsBlank": true
						  },
						  {
							"argumentName": "qualif_variables_set",
							"element": "list5",
							"addToFieldNameAndValue": true,
							"notAddWhenValueIsBlank": true
						  }
						]
					}
				  ],
				  "actions": [
					{
						"actionName": "CONFIG_ADD_REFERENCE",
						"requiresDialog": true,
						"button": {
						  "icon": "create_new_folder",
						  "title": {
							"label_en": "New",
							"label_es": "Nuevo"
						  },
						  "requiresGridItemSelected": false
						},
						"dialogInfo": {
						  "name": "genericDialog",
						  "fields": [
							{
							  "text1": {
								"label_en": "New Reference Name",
								"label_es": "Nombre nueva Referencia"
							  }
							},
							{
							  "list1": {
								"label_en": "Category",
								"label_es": "Categoría",
								"addBlankValueOnTop": true,
								"addBlankValueAtBottom": false,
								"valuesFromMasterData": {
								  "propertyNameContainer": "category_and_references",
								  "propertyNameContainerLevelPropertyKeyName": "name",
								  "propertyKeyName": "name",
								  "propertyKeyValueEn": "name",
								  "propertyKeyValueEs": "name"
								}
							  }
							},
							{
							  "checkbox1": {
								"label_en": "Requires Qualification?",
								"label_es": "¿Requiere Cualificación?",
								"defaultValue": false
							  }
							},
							{
							  "number1": {
								"label_en": "Min Stock",
								"label_es": "Stock Mínimo",
								"optional": true
							  }
							},
							{
							  "list2": {
								"label_en": "UOM",
								"label_es": "UDM",
								"addBlankValueOnTop": true,
								"addBlankValueAtBottom": false,
								"valuesFromMasterData": {
								  "propertyNameContainer": "units_of_measurement",
								  "propertyKeyName": "pretty_name",
								  "propertyKeyValueEn": "pretty_name",
								  "propertyKeyValueEs": "pretty_name"
								},
								"dependencyFieldBehavior": [
								  {
									"field": "multilist1",
									"rule": "whenEmpty",
									"resetValue": true,
									"action": "hide"
								  }
								]
							  }
							},
							{
							  "multilist1": {
								"label_en": "Other Allowed UOMs",
								"label_es": "Otras UDM aceptadas",
								"addBlankValueOnTop": true,
								"addBlankValueAtBottom": false,
								"valuesFromMasterData": {
								  "propertyNameContainer": "units_of_measurement",
								  "propertyKeyName": "pretty_name",
								  "propertyKeyValueEn": [
									"pretty_name"
								  ],
								  "propertyKeyValueEs": [
									"pretty_name"
								  ]
								}
							  }
							},
							{
							  "list3": {
								"label_en": "min Stock Type",
								"label_es": "Tipo Stock Mínimo",
								"optional": true,
								"addBlankValueOnTop": true,
								"items": [
								  {
									"keyName": "QUANTITY",
									"keyValue_en": "Quantity",
									"keyValue_es": "Cantidad"
								  },
								  {
									"keyName": "PB ITEMS",
									"keyValue_en": "Items",
									"keyValue_es": "Items"
								  }
								]
							  }
							},
							{
							  "checkbox2": {
								"label_en": "Requires control for Available for use",
								"label_es": "¿Requiere control disponible para uso?",
								"optional": true
							  }
							},
							{
							  "number2": {
								"label_en": "Min Available for use",
								"label_es": "Minimo en Disponible para uso",
								"optional": true
							  }
							},
							{
							  "list3": {
								"label_en": "Type",
								"label_es": "Tipo",
								"optional": true,
								"addBlankValueOnTop": true,
								"items": [
								  {
									"keyName": "QUANTITY",
									"keyValue_en": "Quantity",
									"keyValue_es": "Cantidad"
								  },
								  {
									"keyName": "PB ITEMS",
									"keyValue_en": "Items",
									"keyValue_es": "Items"
								  }
								]
							  }
							},
							{
							  "checkbox3": {
								"label_en": "Allow Some open at a time?",
								"label_es": "¿Permitir abrir varios a la vez?",
								"optional": true
							  }
							},
							{
								"list5": {
									"label_en": "Qualification Variables Set",
									"label_es": "Conjunto Variables para Cualificación",
									"optional": true,
									"addBlankValueOnTop": true,
									  "addBlankValueAtBottom": false,
									  "valuesFromMasterData": {
										"propertyNameContainer": "variables_set",
										"propertyNameContainerLevelPropertyKeyName": "name",
										"propertyKeyName": "name",
										"propertyKeyValueEn": "name",
										"propertyKeyValueEs": "name"
									  }
								}
							}
						  ]
						},
						"endPointParams": [
						  {
							"argumentName": "name",
							"element": "text1"
						  },
						  {
							"argumentName": "category",
							"element": "list1"
						  },
						  {
							"argumentName": "lotRequiresQualif",
							"element": "checkbox1"
						  },
						  {
							"argumentName": "minStock",
							"element": "number1"
						  },
						  {
							"argumentName": "minStockUom",
							"element": "list2"
						  },
						  {
							"argumentName": "allowedUoms",
							"element": "multilist1",
							"defaultValue": ""
						  },
						  {
							"argumentName": "minStockType",
							"element": "list3"
						  },
						  {
							"argumentName": "requiresAvailableForUse",
							"element": "checkbox2"
						  },
						  {
							"argumentName": "minAvailablesForUse",
							"element": "number2"
						  },
						  {
							"argumentName": "minAvailablesForUseType",
							"element": "list3"
						  },
						  {
							"argumentName": "allowedOpeningSomeAtaTime",
							"element": "checkbox3"
						  },
						  {
							"argumentName": "qualificationVariablesSet",
							"element": "list5"
						  }
						]
					}					
				  ]
				}
			  }
			]
		},		
	]
  },
  "EventsCalendarOld": {
	"component": "CalendarData",
	"hasOwnComponent": true,
	"showTitleOnTop": true,
	"title": {
	  "fix_text_en": "Events Calendar 111",
	  "fix_text_es": "Calendario de Eventos",
	  "name": "name --- puede que sea instrument_name o instrument" 
	},
	"viewQuery": {
	  "actionName": "INSTRUMENT_EVENTS_CALENDAR",
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
		{ "argumentName": "instrumentName", "element": "text1"},
		{ "argumentName": "familyName", "element": "text2"},
		{"argumentName": "startDate", "element": "daterange1dateStart"},
		{"argumentName": "endDate", "element": "daterange1dateEnd"},
		{"argumentName": "includeOnlyScheduledOne", "element": "checkbox1"}
	  ]
	},
	"filter_button": {
	  "label_en": "Search",
	  "label_es": "Buscar"
	},
	"filter": [
		{"daterange1":{
			"dateStart":{ "label_en": "Sampling Start Date", "label_es": "Fecha Inicio Muestreo", "default_value": "" },
			"dateEnd":{ "label_en": "Sampling End Date", "label_es": "Fecha Fin Muestreo", "default_value": "" }}
		},
		{"text1": {
			"label_en": "Instrument to get", "label_es": "Instrumento a cargar","fixValue": ""}
		},
		{"text2": {
		  "label_en": "Families to get", "label_es": "Familias a cargar", "fixValue": ""}
		},
		{"checkbox1": {
		  "label_en": "Include only the planned ones", "label_es": "Incluir sólo los planificados", "fixValue": false}
		}

	],
	"filter_results": {
	  "type": "readOnlyTable",
	  "title": "3.4) Menu Definition",
	  "endPointResponseObject": "user_requirements_events",
	  "columns": [
		{
		  "name": "id",
		  "label_en": "Id",
		  "label_es": "Id"
		}
	  ]
	},
	"actions": [],
	"tabs": [
	  { "tabLabel_en": "Table",
		"tabLabel_es": "Tabla",
		"view": "summary",
		"view_definition": [
		  { "type": "readOnlyTable",
			"endPointResponseObject": "raw_data",
			"xtitle": {
			  "label_en": "Instrument Info",
			  "label_es": "Información del Instrumento"
			},
			"subtitle": {
			  "label_en": "Instrument Info",
			  "label_es": "Información del Instrumento"
			},
			"columns": [
			  {"name": "type",
				"label_en": "Type",
				"label_es": "Tipo"
			  },
			  {"name": "name",
				"label_en": "Instrument",
				"label_es": "Instrumento"
			  },
			  {"name": "family",
				"label_en": "Instrument Family",
				"label_es": "Familia del instrumento"
			  },
			  {"name": "responsible",
				"label_en": "Responsible",
				"label_es": "Responsable"
			  },
			  { "name": "responsible_backup",   
				"label_en": "Responsible backup",
				"label_es": "Segundo responsable"
			  },
			  { "name": "next_calibration",   
				"label_en": "Next Calibration",
				"label_es": "Próxima Calibración"
			  },
			  { "name": "last_calibration",   
				"label_en": "Last Calibration",
				"label_es": "Última Calibración"
			  }
			],
			"actions": []
		  }
		]
	  },
	  { "tabLabel_en": "Calendar",
		"tabLabel_es": "Calendario",
		"view": "Calendar",
		"view_definition": [
		  { "type": "Calendar",
			"endPointResponseObject": "dates_grouped",
			"title": {
			  "label_en": "Instrument Events",
			  "label_es": "Eventos del Instrumento"
			},
			"subtitle": {
			  "label_en": "Instrument Events",
			  "label_es": "Eventos del Instrumento"
			},
			"fieldsToDisplay": [
			  {"name": "id",
				"label_en": "Instrument Id",
				"label_es": "Id del instrumento"
			  },
			  {"name": "event_type",
				"label_en": "Event Type",
				"label_es": "Tipo de evento"
			  },
			  {"name": "decision",
				"label_en": "Decision",
				"label_es": "Decisión"
			  },
			  { "name": "completed_on",   
				"label_en": "Completed On",
				"label_es": "Completado en"
			  }
			],
			"actions": []
		  }
		],
		"day_clicked_detail":[
			{ "type": "readOnlyTable",
			"endPointResponseObject": "ROOT",
			"xtitle": {
			  "label_en": "Instrument Info",
			  "label_es": "Información del Instrumento"
			},
			"subtitle": {
			  "label_en": "Instrument Info",
			  "label_es": "Información del Instrumento"
			},
			"columns": [
			  {"name": "type",
			  "label_en": "Type",
			  "label_es": "Tipo"
			  },
			  {"name": "calendar_date",
			  "label_en": "Date",
			  "label_es": "Fecha"
			  },
			  {"name": "name",
			  "label_en": "Instrument",
			  "label_es": "Instrumento"
			  },
			  {"name": "family",
			  "label_en": "Instrument Family",
			  "label_es": "Familia del instrumento"
			  },
			  {"name": "responsible",
			  "label_en": "Responsible",
			  "label_es": "Responsable"
			  },
			  { "name": "responsible_backup",   
			  "label_en": "Responsible backup",
			  "label_es": "Segundo responsable"
			  },
			  { "name": "next_calibration",   
			  "label_en": "Next Calibration",
			  "label_es": "Próxima Calibración"
			  },
			  { "name": "last_calibration",   
			  "label_en": "Last Calibration",
			  "label_es": "Última Calibración"
			  }
        ],
        "actions": []
        }
      ]
	  }
	]
  },
  "InstrumentFamilyList":{
    "component": "TableWithButtons",
    "langConfig": {
      "gridHeader": {
        "name": {
          "label_en": "Name",
          "label_es": "Nombre",
          "sort": true,
          "filter": true,
          "is_icon": false,
          "width": "20%"
        },
        "description": {
          "label_en": "Description",
          "label_es": "Descripcion",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "20%",
          "align": "left"
        },
        "spec_code": {
          "label_en": "Spec Code",
          "label_es": "Codigo especificacion",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "modelNumber": {
          "label_en": "Model Number",
          "label_es": "Numero modelo",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "serialNumber": {
          "label_en": "Serial Number",
          "label_es": "Numero serie",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "supplierName": {
          "label_en": "Supplier Name",
          "label_es": "Nombre proveedor",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "manufacturerName": {
          "label_en": "Manufacturer Name",
          "label_es": "Nombre fabricante",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        },
        "calibration_required": {
          "label_en": "Calibration required?",
          "label_es": "Necesita calibracion",
          "sort": false,
          "filter": true,
          "is_icon": true,
          "width": "10%"
        },
        "pm_required": {
          "label_en": "PM required?",
          "label_es": "Necesita PM?",
          "sort": false,
          "filter": true,
          "is_icon": true,
          "width": "10%"
        },
        "calib_variables_set": {
          "label_en": "Calibration Variables Set",
          "label_es": "Set variables calibracion",
          "sort": false,
          "filter": true,
          "is_icon": false,
          "width": "10%"
        }
      },
      "title": {
        "label_en": "",
        "label_es": ""
      }
    },
    "viewQuery": {
      "actionName": "GET_INSTRUMENT_FAMILY_LIST",
      "addRefreshButton": true,
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload",
          "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      },
      "endPointParams": []
    },
    "row_buttons": [],
    "enableContextMenu": true,
    "addActionsInContextMenu": false,
    "actions": [
      {
        "actionName": "CONFIG_UPDATE_INSTRUMENT_FAMILY",
        "requiresDialog": true,
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "Update instrument family",
            "label_es": "Actualizar familia de instrumentos"
          },
          "requiresGridItemSelected": true
        },
        "endPointParams": [
          {
            "argumentName": "instrFamilyName",
            "selObjectPropertyName": "name"
          },
          {
            "argumentName": "fieldName",
            "value": "description"
          },
          {
            "argumentName": "fieldValue",
            "element": "text1"
          }
        ],
        "dialogInfo": {
          "name": "genericDialog",
          "fields": [
            {
              "text1": {
                "label_en": "Description",
                "label_es": "Descripción",
                "selObjectPropertyName": "description",
                "defaultValue": " "
              }
            }
          ]
        }
      },
      {
        "actionName": "CONFIG_NEW_INSTRUMENT_FAMILY",
        "requiresDialog": true,
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New instrument family",
            "label_es": "Nueva familia de instrumento"
          },
          "requiresGridItemSelected": false
        },
        "endPointParams": [
          {
            "argumentName": "instrFamilyName",
            "element": "text1"
          },
          {
            "argumentName": "calibration_required",
            "element": "checkbox1",
            "addToFieldNameAndValue": true,
            "fieldType": "BOOLEAN",
            "defaultValue": false,
            "notAddWhenValueIsBlank": true
          },
          {
            "argumentName": "pm_required",
            "element": "checkbox2",
            "addToFieldNameAndValue": true,
            "fieldType": "BOOLEAN",
            "defaultValue": false,
            "notAddWhenValueIsBlank": true
          },
          {
            "argumentName": "verif_same_day_required",
            "element": "checkbox3",
            "addToFieldNameAndValue": true,
            "fieldType": "BOOLEAN",
            "defaultValue": false,
            "notAddWhenValueIsBlank": true
          },
          {
            "argumentName": "service_required",
            "element": "checkbox4",
            "addToFieldNameAndValue": true,
            "fieldType": "BOOLEAN",
            "defaultValue": false,
            "notAddWhenValueIsBlank": true
          }
        ],
        "dialogInfo": {
          "name": "genericDialog",
          "fields": [
            {
              "text1": {
                "label_en": "New Instrument Family Name",
                "label_es": "Nombre para nueva familia de instrumentos"
              }
            },
            {
              "text2": {
                "label_en": "Description",
                "label_es": "Descripción"
              }
            },
            {
              "checkbox1": {
                "label_en": "Calibration required?",
                "label_es": "¿Necesita calibración?",
                "default_value": true
              }
            },
            {
              "checkbox2": {
                "label_en": "Preventive maintenance required?",
                "label_es": "¿Necesita mantenimiento preventivo?",
                "default_value": true
              }
            },
            {
              "checkbox3": {
                "label_en": "Verification required?",
                "label_es": "¿Necesita verificación?",
                "default_value": true
              }
            },
            {
              "checkbox4": {
                "label_en": "Service required?",
                "label_es": "¿Necesita servicio?",
                "default_value": true
              }
            }
          ]
        }
      }      
    ]
  }
}

export const ProjectRandD= 
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
      { "name": "ProjectRnD", "url": "/moduleProjectRnD/ProjectRnDAPIactions"}
    ],
    "queriesEndpoints": [
      {"name": "ProjectRnD", "url": "/moduleProjectRnD/ProjectRnDAPIqueries"}
    ]
  },
  "rdprojects":{
    "component": "ObjectByTabs",
    "hasOwnComponent": true,
    "showTitleOnTop": true,
    "title": {
      "fix_text_en": "All my projects",
      "fix_text_es": "Todos mis proyectos",
      "name": "name"
    },
    "viewQuery": {
      "actionName": "ALL_ACTIVE_PROJECTS",
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
        }
      ]
    },
    "left_panel":{
      "actions": [
        { "actionName": "NEW_PROJECT",
          "notGetViewData": true,
          "requiresDialog": true,
          "certificationException": true,
          "button": {
            "icon": "add",
            "title": {
              "label_en": "New project",
              "label_es": "Nuevo proyecto"
            },
            "requiresGridItemSelected": false
          },
          "dialogInfo": {
            "name": "genericDialog",
            "fields": [
              {
                "text1": {
                  "label_en": "Proyect Name",
                  "label_es": "Nombre de proyecto"
                }
              },
              {
                "text2": {
                  "label_en": "Purpose",
                  "label_es": "Propósito"
                }
              },
              {
                "list1": {
                  "addBlankValueOnTop": true,
                  "addBlankValueAtBottom": true,
                  "label_en": "Type",
                  "label_es": "Tipo",
                  "items": [
                    {
                      "keyName": "Product Development",
                      "keyValue_en": "Product Development",
                      "keyValue_es": "Desarrollo de producto"
                    },
                    {
                      "keyName": "Method validation",
                      "keyValue_en": "Method validation",
                      "keyValue_es": "Validación de método"
                    }
                  ]
                }
              },
              {
                "list2": {
                  "label_en": "Responsible",
                  "label_es": "Responsable",
                  "optional": true,
                  "addBlankValueOnTop": true,
                  "addBlankValueAtBottom": false,
                  "items": [
                    {
                      "keyName": "Admin",
                      "keyValue_en": "Admin",
                      "keyValue_es": "Admin"
                    },
                    {
                      "keyName": "R&D",
                      "keyValue_en": "R&D",
                      "keyValue_es": "R&D"
                    },
                    {
                      "keyName": "Paco",
                      "keyValue_en": "Paco",
                      "keyValue_es": "Paco"
                    }
                  ]
                }
              }
            ]
          },
          "endPointParams": [
            {
              "argumentName": "projectName",
              "element": "text1",
              "defaultValue": ""
            },
            {
              "argumentName": "type",
              "element": "list1",
              "defaultValue": ""
            },
            {
              "argumentName": "purpose",
              "element": "text2",
              "defaultValue": ""
            },
            {
              "argumentName": "responsible",
              "element": "list2",
              "defaultValue": " "
            }
          ]
        }
      ]
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
          "fixValue": "Procaps"
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
        "tabLabel_en": "Daily entries",
        "tabLabel_es": "Entradas diario",
        "view": "summary",
        "view_definition": [
          {
            "actions": []
          },          
          {
            "type": "cardMultipleElementsView",            
            "endPointResponseObject": "rd_daily_entry",
            "add_border": true,
            "num_columns":2,
            "cardElements":[
              {
                "type": "reportTitle",
                "endPointResponseObject": "ROOT",
                "title":{
                  "text_en": "{fld:name}",
                  "text_es": "{fld:name}"
                }    
              },              
              {
                "type": "buttonsOnly",
                "endPointResponseObject": "ROOT",
                "num_columns":3,
                "hideNoDataMessage": true,
                "actions":[
                  { "actionName": "DAILY_ENTRY_ADDPICTURE",
                  "requiresDialog": true,	  
                  "endPointUrl": "Samples",
                      "button": {
                        "icon": "add_a_photo",
                        "title": {
                          "label_en": "Take Plate Picture", "label_es": "Tomar foto de Placa"
                        },
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": { 
                    "name": "takePictureDialog",
                        "fields": [                                      
                        ]  		  
                      },
                      "endPointParams": [
                        { "argumentName": "projectName", "selObjectPropertyName": "project" },
                        { "argumentName": "dailyEntryName", "selObjectPropertyName": "name"  }
                      ]
                  },
                  {	"actionName": "DAILY_ENTRY_ADDAWSATTACHMENT",
                  "requiresDialog": true,
                  "button": {
                    "icon": "add_link",
                    "title": {
                        "label_en": "Add Attachment", "label_es": "Añadir Adjunto"
                      },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {          
                    "name": "uploadFileDialog",
                    "fields": [
                    ]
                  },
                  "endPointParams": [
                    { "argumentName": "projectName", "selObjectPropertyName": "project" },
                    { "argumentName": "dailyEntryName", "selObjectPropertyName": "name"  }                    
                  ]
                },
                {	"actionName": "DAILY_ENTRY_ADDURLATTACHMENT",
                "requiresDialog": true,
                "button": {
                  "icon": "link",
                  "title": {
                      "label_en": "Add Attachment", "label_es": "Añadir Adjunto"
                    },
                  "requiresGridItemSelected": false
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
                {	"actionName": "DAILY_ENTRY_ADDNOTE",
                "requiresDialog": true,
                "button": {
                  "icon": "add_notes",
                  "title": {
                      "label_en": "Add note", "label_es": "Añadir nota"
                    },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {          
                  "name": "genericDialog",
                  "fields": [
                    {"text1": { "label_en": "Title", "label_es": "Título", "optional": true}},
                    {"textarea1": { "label_en": "Doc Url", "label_es": "Vínculo" }}
                    
                  ]
                },
                "endPointParams": [
                  { "argumentName": "projectName", "selObjectPropertyName": "project" },
                  { "argumentName": "dailyEntryName", "selObjectPropertyName": "name" },
                  { "argumentName": "note", "element": "textarea1", "defaultValue": "" },
                  { "argumentName": "title", "element": "text1", "defaultValue": "" }
                  
                ]
                }                                                                                                
                ]
                                  
              },
              {
                "type": "parentReadOnlyTable",
                "endPointResponseObject": "project_notes",
                "columns": [
                  { "name": "created_on", "label_en": "", "label_es": ""},
                  { "name": "notes", "label_en": "Notes", "label_es": "Notas"}
                ],
                "actions": [
                ],
                "row_buttons": [
                  {
                    "actionName": "PROJECT_NOTE_REMOVE",
                    "notGetViewData": true,
                    "requiresDialog": false,
                    "certificationException": true,
                    "button": {
                      "icon": "remove",
                      "title": {
                        "label_en": "Remove note",
                        "label_es": "Borrar nota"
                      },
                      "requiresGridItemSelected": false
                    },
                    "endPointParams": [
                      {
                        "argumentName": "noteId",
                        "selObjectPropertyName": "id"
                      }
                    ]
                  }

                ],
                "children": "analysis_method",
                "children_definition": {
                  "title": {
                    "label_en": "Analysis Method",
                    "label_es": "Método analítico"
                  },
                  "columns": [
                    {
                      "name": "method_name",
                      "label_en": "Method Code",
                      "label_es": "Código método"
                    },
                    {
                      "name": "testing_group",
                      "label_en": "Testing Group",
                      "label_es": "Grupo Analítico"
                    }
                  ],
                  "row_buttons": [
                    {
                      "actionName": "ANALYSIS_ADD_PARAM",
                      "notGetViewData": true,
                      "requiresDialog": true,
                      "certificationException": true,
                      "button": {
                        "icon": "person_add",
                        "title": {
                          "label_en": "Add Analysis Params",
                          "label_es": "Añadir parámetros de análisis"
                        },
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "genericDialog",
                        "fields": [
                          {
                            "text1": {
                              "label_en": "Param Name",
                              "label_es": "Nombre del parámetro",
                              "optional": false
                            }
                          },
                          {
                            "text2": {
                              "label_en": "Number of replicas ",
                              "label_es": "Número de réplicas",
                              "optional": false
                            }
                          },
                          {
                            "text3": {
                              "label_en": "UOM Conversion Mode",
                              "label_es": "Modo de conversión de UOM",
                              "optional": true
                            }
                          },
                          {
                            "text4": {
                              "label_en": "Linked Calc",
                              "label_es": "Cálculo enlanzado",
                              "optional": true
                            }
                          },
                          {
                            "text5": {
                              "label_en": "List Entry",
                              "label_es": "Lista de entradas",
                              "optional": true
                            }
                          },
                          {
                            "text6": {
                              "label_en": "Param Type",
                              "label_es": "Tipo parámetro",
                              "optional": false
                            }
                          },
                          {
                            "text7": {
                              "label_en": "UOM",
                              "label_es": "UOM",
                              "optional": false
                            }
                          },
                          {
                            "text8": {
                              "label_en": "Analysis Version",
                              "label_es": "Versión análisis",
                              "optional": false
                            }
                          }
                        ]
                      },
                      "endPointParams": [
                        {
                          "argumentName": "code",
                          "selObjectPropertyName": "analysis"
                        },
                        {
                          "argumentName": "configVersion",
                          "element": "text8"
                        },
                        {
                          "argumentName": "methodName",
                          "selObjectPropertyName": "method_name"
                        },
                        {
                          "argumentName": "paramName",
                          "element": "text1",
                          "defaultValue": " "
                        },
                        {
                          "argumentName": "paramType",
                          "element": "text6",
                          "defaultValue": " "
                        },
                        {
                          "argumentName": "numReplicas",
                          "element": "text2",
                          "defaultValue": "0"
                        },
                        {
                          "argumentName": "uom",
                          "element": "text7",
                          "defaultValue": " "
                        },
                        {
                          "argumentName": "uomConversionMode",
                          "element": "text3",
                          "defaultValue": " "
                        },
                        {
                          "argumentName": "calcLinked",
                          "element": "text4",
                          "defaultValue": " "
                        },
                        {
                          "argumentName": "listEntry",
                          "element": "text5",
                          "defaultValue": " "
                        }
                      ]
                    },
                    {
                      "actionName": "ANALYSIS_REMOVE_METHOD",
                      "notGetViewData": true,
                      "requiresDialog": true,
                      "certificationException": true,
                      "button": {
                        "icon": "playlist_remove",
                        "title": {
                          "label_en": "Remove Analysis Method",
                          "label_es": "Borrar método analítico"
                        },
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "genericDialog",
                        "fields": [
                          {
                            "zzzlist1": {
                              "label_en": "Analysis Code",
                              "label_es": "Código de análisis",
                              "addBlankValueOnTop": true,
                              "addBlankValueAtBottom": false,
                              "valuesFromSelectedItem": {
                                "internalVariableSingleObjName": "selectedItem",
                                "internalVariableSingleObjProperty": "analysis_method",
                                "filterInFirstLevel": true,
                                "propertyKeyName": "method_name",
                                "propertyKeyValueEn": [
                                  "method_name"
                                ],
                                "propertyKeyValueEs": [
                                  "method_name"
                                ]
                              }
                            }
                          },
                          {
                            "text2": {
                              "label_en": "Method version",
                              "label_es": "Versión del método"
                            }
                          }
                        ]
                      },
                      "endPointParams": [
                        {
                          "argumentName": "methodName",
                          "selObjectPropertyName": "method_name"
                        },
                        {
                          "argumentName": "code",
                          "selObjectPropertyName": "analysis"
                        },
                        {
                          "argumentName": "configVersion",
                          "element": "text2"
                        }
                      ]
                    }
                  ],
                  "actions": [],
                  "children": "analysis_method_params",
                  "children_definition": {
                    "title": {
                      "label_en": "Analysis Params",
                      "label_es": "Parámetros analíticos"
                    },
                    "columns": [
                      {
                        "name": "param_name",
                        "label_en": "Param Name",
                        "label_es": "Nombre parámetro"
                      },
                      {
                        "name": "param_type",
                        "label_en": "Param type",
                        "label_es": "Tipo parámetro"
                      },
                      {
                        "name": "mandatory",
                        "label_en": "Mandatory",
                        "label_es": "Obligatorio"
                      },
                      {
                        "name": "list_entry",
                        "label_en": "List entry",
                        "label_es": "Lista de entrada"
                      },
                      {
                        "name": "calc_linked",
                        "label_en": "Calc linked",
                        "label_es": "Calculos enlazados"
                      },
                      {
                        "name": "uom",
                        "label_en": "UOM",
                        "label_es": "UOM"
                      },
                      {
                        "name": "uom_conversion_mode",
                        "label_en": "UOM conversion mode",
                        "label_es": "Modo conversión UOM"
                      }
                    ],
                    "actions": []
                  }
                }
              }
            ]

          }
        ]
      },      
      {
        "tabLabel_en": "Project info",
        "tabLabel_es": "Información Proyecto",
        "view": "summary",
        "view_definition": [
          {
            "actions": []
          },
          {
            "type": "reportTitle",
            "title": {
              "label_en": "Summary",
              "label_es": "Resumen"
            },
            "elements": [
              {
                "type": "cardSomeElementsSingleObject",
                "endPointPropertyArray": [
                  "ROOT"
                ],
                "num_columns": 1,
                "add_border":true,
                "fieldsToDisplay": [
                  {
                    "name": "name",
                    "label_en": "Name",
                    "label_es": "Nombre"
                  },
                  {
                    "name": "purpose",
                    "label_en": "Purpose",
                    "label_es": "Propósito"
                  },
                  {
                    "name": "created_on",
                    "label_en": "Created on",
                    "label_es": "Fecha creación"
                  },
                  {
                    "name": "type",
                    "label_en": "Type",
                    "label_es": "Tipo"
                  },
                  {
                    "name": "responsible",
                    "label_en": "Responsible",
                    "label_es": "Responsable"
                  },
                  {
                    "name": "is_locked",
                    "label_en": "Locked?",
                    "label_es": "¿Bloqueado?",
                    "is_icon": true
                  },
                ],
                "actions": [
                  {
                    "actionName": "NEW_PROJECT",
                    "xnotGetViewData": true,
                    "requiresDialog": true,
                    "certificationException": true,
                    "button": {
                      "icon": "add",
                      "title": {
                        "label_en": "New project",
                        "label_es": "Nuevo proyecto"
                      },
                      "requiresGridItemSelected": false
                    },
                    "dialogInfo": {
                      "name": "genericDialog",
                      "fields": [
                        {
                          "text1": {
                            "label_en": "Proyect Name",
                            "label_es": "Nombre de proyecto"
                          }
                        },
                        {
                          "text2": {
                            "label_en": "Purpose",
                            "label_es": "Propósito"
                          }
                        },
                        {
                          "list1": {
                            "addBlankValueOnTop": true,
                            "addBlankValueAtBottom": true,
                            "label_en": "Type",
                            "label_es": "Tipo",
                            "items": [
                              {
                                "keyName": "Product Development",
                                "keyValue_en": "Product Development",
                                "keyValue_es": "Desarrollo de producto"
                              },
                              {
                                "keyName": "Method validation",
                                "keyValue_en": "Method validation",
                                "keyValue_es": "Validación de método"
                              }
                            ]
                          }
                        },
                        {
                          "list2": {
                            "label_en": "Responsible",
                            "label_es": "Responsable",
                            "optional": true,
                            "addBlankValueOnTop": true,
                            "addBlankValueAtBottom": false,
                            "items": [
                              {
                                "keyName": "Admin",
                                "keyValue_en": "Admin",
                                "keyValue_es": "Admin"
                              },
                              {
                                "keyName": "R&D",
                                "keyValue_en": "R&D",
                                "keyValue_es": "R&D"
                              },
                              {
                                "keyName": "Paco",
                                "keyValue_en": "Paco",
                                "keyValue_es": "Paco"
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "endPointParams": [
                      {
                        "argumentName": "projectName",
                        "element": "text1",
                        "defaultValue": ""
                      },
                      {
                        "argumentName": "type",
                        "element": "list1",
                        "defaultValue": ""
                      },
                      {
                        "argumentName": "purpose",
                        "element": "text2",
                        "defaultValue": ""
                      },
                      {
                        "argumentName": "responsible",
                        "element": "list2",
                        "defaultValue": " "
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },      
      {
        "tabLabel_en": "Formulation",
        "tabLabel_es": "Formulación",
        "view": "summary",
        "view_definition": [
          {
            "actions": []
          },
          {
            "type": "parentReadOnlyTable",
            "endPointResponseObject": "formula",
            "columns": [
              {
                "name": "name",
                "label_en": "Name",
                "label_es": "Nombre"
              },
              {
                "name": "purpose",
                "label_en": "Purpose",
                "label_es": "Propósito"
              },
              {
                "name": "created_on",
                "label_en": "Created on",
                "label_es": "Fecha creación"
              }
            ],
            "actions": [
              {
                "actionName": "NEW_FORMULA",
                "notGetViewData": true,
                "requiresDialog": true,
                "certificationException": true,
                "button": {
                  "icon": "add",
                  "title": {
                    "label_en": "New formula",
                    "label_es": "Nueva formula"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "text1": {
                        "label_en": "Formula Name",
                        "label_es": "Nombre de fórmula"
                      }
                    },
                    {
                      "text2": {
                        "label_en": "Purpose",
                        "label_es": "Propósito"
                      }
                    },
                    {
                      "multilist1": {
                        "label_en": "Ingredients List",
                        "label_es": "Lista de ingredientes",
                        "addBlankValueOnTop": true,
                        "addBlankValueAtBottom": false,
                        "valuesFromMasterData": {
                          "propertyNameContainer": "ingredients",
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
                    "argumentName": "projectName",
                    "selObjectPropertyName": "project"
                  },
                  {
                    "argumentName": "formulaName",
                    "element": "text1",
                    "defaultValue": ""
                  },
                  {
                    "argumentName": "purpose",
                    "element": "text2",
                    "defaultValue": ""
                  },
                  {
                    "argumentName": "ingredientsList",
                    "element": "multilist1",
                    "defaultValue": " "
                  }
                ]
              }
            ],
            "row_buttons": [
              {
                "actionName": "FORMULA_ADD_INGREDIENT",
                "notGetViewData": true,
                "requiresDialog": true,
                "certificationException": true,
                "button": {
                  "icon": "playlist_add",
                  "title": {
                    "label_en": "Add ingredient",
                    "label_es": "Añadir ingrediente"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "list1": {
                        "label_en": "Ingredients List",
                        "label_es": "Lista de ingredientes",
                        "addBlankValueOnTop": true,
                        "addBlankValueAtBottom": false,
                        "valuesFromMasterData": {
                          "propertyNameContainer": "ingredients",
                          "propertyNameContainerLevelPropertyKeyName": "name",
                          "propertyKeyName": "name",
                          "propertyKeyValueEn": "name",
                          "propertyKeyValueEs": "name"
                        }
                      },
                      "dependencyFieldBehavior": [
                        {
                          "field": "text1",
                          "rule": "whenEmpty",
                          "resetValue": true,
                          "action": "hide"
                        }
                      ]
                    },
                    {
                      "number1": {
                        "label_en": "Quantity",
                        "label_es": "Cantidad",
                        "min_allowed": 0,
                        "max_dp": 2
                      }
                    },
                    {
                      "list2": {
                        "addBlankValueOnTop": true,
                        "addBlankValueAtBottom": true,
                        "label_en": "UOM",
                        "label_es": "UDM",
                        "items": [
                          {
                            "keyName": "mg",
                            "keyValue_en": "mg",
                            "keyValue_es": "mg"
                          },
                          {
                            "keyName": "g",
                            "keyValue_en": "g",
                            "keyValue_es": "g"
                          },
                          {
                            "keyName": "kg",
                            "keyValue_en": "kg",
                            "keyValue_es": "kg"
                          }
                        ]
                      }
                    },
                    {
                      "text1": {
                        "label_en": "Notes",
                        "label_es": "Notas"
                      }
                    }
                  ]
                },
                "endPointParams": [
                  {
                    "argumentName": "formulaName",
                    "selObjectPropertyName": "name"
                  },
                  {
                    "argumentName": "ingredient",
                    "element": "list1",
                    "defaultValue": ""
                  },
                  {
                    "argumentName": "quantity",
                    "element": "number1",
                    "defaultValue": ""
                  },
                  {
                    "argumentName": "quantityUom",
                    "element": "list2"
                  },
                  {
                    "argumentName": "notes",
                    "element": "text1",
                    "addToFieldNameAndValue": true
                  }
                ]
              }
            ],
            "children": "formula_ingredients",
            "children_definition": {
              "title": {
                "label_en": "Ingredientes",
                "label_es": "Ingredientes"
              },
              "columns": [
                {
                  "name": "ingredient",
                  "label_en": "Ingredient",
                  "label_es": "Ingrediente"
                },
                {
                  "name": "quantity",
                  "label_en": "Quantity",
                  "label_es": "Cantidad"
                },
                {
                  "name": "in_percentage",
                  "label_en": "Percentage?",
                  "label_es": "¿Porcentaje?"
                },
                {
                  "name": "notes",
                  "label_en": "Notes",
                  "label_es": "Notas"
                },
                {
                  "name": "active",
                  "label_en": "Active?",
                  "label_es": "¿Activo?"
                },
                {
                  "name": "quantity_uom",
                  "label_en": "UOM",
                  "label_es": "UDM"
                }
              ],
              "row_buttons": [
                {
                  "actionName": "FORMULA_UPDATE_INGREDIENT",
                  "notGetViewData": true,
                  "requiresDialog": true,
                  "certificationException": true,
                  "button": {
                    "icon": "playlist_add",
                    "title": {
                      "label_en": "Update ingredient",
                      "label_es": "Actualizar ingrediente"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "number1": {
                          "label_en": "Quantity",
                          "label_es": "Cantidad",
                          "min_allowed": 0,
                          "max_dp": 2,
                          "selObjectPropertyName": "quantity"
                        }
                      },
                      {
                        "list2": {
                          "addBlankValueOnTop": true,
                          "addBlankValueAtBottom": true,
                          "label_en": "UOM",
                          "label_es": "UDM",
                          "selObjectPropertyName": "quantity_uom",
                          "items": [
                            {
                              "keyName": "mg",
                              "keyValue_en": "mg",
                              "keyValue_es": "mg"
                            },
                            {
                              "keyName": "g",
                              "keyValue_en": "g",
                              "keyValue_es": "g"
                            },
                            {
                              "keyName": "kg",
                              "keyValue_en": "kg",
                              "keyValue_es": "kg"
                            }
                          ]
                        }
                      },
                      {
                        "text1": {
                          "label_en": "Notes",
                          "label_es": "Notas",
                          "selObjectPropertyName": "notes"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "formulaName",
                      "selObjectPropertyName": "formula"
                    },
                    {
                      "argumentName": "ingredient",
                      "selObjectPropertyName": "ingredient"
                    },
                    {
                      "argumentName": "quantity",
                      "element": "number1",
                      "defaultValue": ""
                    },
                    {
                      "argumentName": "quantityUom",
                      "element": "list2"
                    },
                    {
                      "argumentName": "notes",
                      "element": "text1",
                      "addToFieldNameAndValue": true
                    }
                  ]
                },
                {
                  "actionName": "FORMULA_REMOVE_INGREDIENT",
                  "notGetViewData": true,
                  "requiresDialog": false,
                  "certificationException": true,
                  "button": {
                    "icon": "playlist_remove",
                    "title": {
                      "label_en": "Deactivate Formula Ingredient",
                      "label_es": "Desactivar ingrediente de fórmula"
                    },
                    "requiresGridItemSelected": false
                  },
                  "dialogInfo": {
                    "name": "genericDialog",
                    "fields": [
                      {
                        "text2": {
                          "label_en": "Method version",
                          "label_es": "Versión del método"
                        }
                      }
                    ]
                  },
                  "endPointParams": [
                    {
                      "argumentName": "formulaName",
                      "selObjectPropertyName": "formula"
                    },
                    {
                      "argumentName": "ingredient",
                      "selObjectPropertyName": "ingredient"
                    }
                  ]
                }
              ],
              "actions": [],
              "children": "formula_ingredients",
              "children_definition": {
                "title": {
                  "label_en": "Formula Ingredientes",
                  "label_es": "Ingredientes de formula"
                },
                "columns": [
                  {
                    "name": "ingredient",
                    "label_en": "Ingredient",
                    "label_es": "Ingrediente"
                  },
                  {
                    "name": "quantity",
                    "label_en": "Quantity",
                    "label_es": "Cantidad"
                  },
                  {
                    "name": "in_percentage",
                    "label_en": "Percentage?",
                    "label_es": "¿Porcentaje?"
                  },
                  {
                    "name": "notes",
                    "label_en": "Notes",
                    "label_es": "Notas"
                  },
                  {
                    "name": "active",
                    "label_en": "Active?",
                    "label_es": "¿Activo?"
                  },
                  {
                    "name": "quantity_uom",
                    "label_en": "UOM",
                    "label_es": "UDM"
                  }
                ],
                "actions": []
              }
            }
          }
        ]
      },

        {
          "tabLabel_en": "Method validation",
          "tabLabel_es": "Validación de métodos",
          "view": "summary",
          "view_definition": [
            {
              "actions": []
            },          
            {
              "type": "cardMultipleElementsView",            
              "endPointResponseObject": "method_validation",
              "add_border": true,
              "num_columns":2,
              "cardElements":[
                {
                  "type": "reportTitle",
                  "endPointResponseObject": "ROOT",
                  "title":{
                    "text_en": "{fld:name}",
                    "text_es": "{fld:name}"
                  }    
                },              
                {
                  "type": "cardSomeElementsSingleObject",
                  "endPointResponseObject": "final_results",
                  "num_columns":3,
                  "hideNoDataMessage": true,
                  "fieldsToDisplay":[
                    {"name": "total_samples", "label_en":"Total samples", "label_es":"Total muestras",
                      "hideNoDataMessage":true, "styleForLabel":"font-size: 12px;", "styleForValue":"font-size: 12px;", "styleForBlock":"list-style-type: none;"}, 
                    {"name": "average", "label_en":"Average", "label_es":"Promedio", 
                      "hideNoDataMessage":true, "styleForLabel":"font-size: 12px;", "styleForValue":"font-size: 12px;"},  
                    {"name": "standard_deviation", "label_en":"Std Dev", "label_es":"Desviación Std", 
                      "hideNoDataMessage":true, "styleForLabel":"font-size: 12px;", "styleForValue":"font-size: 12px;"}, 
                    {"name": "c_v", "label_en":"Coefficient of Variation", "label_es":"Coeficiente de Variación", 
                      "hideNoDataMessage":true, "styleForLabel":"font-size: 12px;", "styleForValue":"font-size: 12px;"} 
                  ]                  
                },
                {
                  "type": "chart",
                  "display_chart": true,
                  "chartModel": "methodValidation",
                  "chart_type": "line",
                  "chart_name": "results",
                  "zzzendPointResponseObject": "chart_results",
                  "elementName": "cdatatable",
                  "chartSourceData": "chart_results",
                  "xAxisSourceData": "theoretical_value",
                  "sourceData": "value",
                  "grouper_field_name": "chart_results",
                  "grouper_exclude_items":[],
                  "chart_title":{ "label_en": "", "label_es":""},
                  "label_item":{"label_en":"Statussss", "label_es":"Estado"},
                  "label_value":{"label_en":"#", "label_es":"#"} ,  
      
                  "counter_field_name":"chart_results",
                  "xxcounter_field_name":["result", "final_result"],
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
                  }                
                },
                {
                  "type": "parentReadOnlyTable",
                  "endPointResponseObject": "results",
                  "columns": [
                    { "name": "name", "label_en": "Sample", "label_es": "Muestra"},
                    { "name": "injection", "label_en": "Injection", "label_es": "Inyectión"},
                    { "name": "result", "label_en": "Result", "label_es": "Resultado"},
                    { "name": "final_result", "label_en": "Average", "label_es": "Promedio"}
                  ],
                  "actions": [
                    {
                      "actionName": "ENTERRESULT",
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
                          "zzzendPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
                          "endPointParams": [
                            {
                              "argumentName": "sampleId",
                              "selObjectPropertyName": "sample_id"
                            }
                          ],
                          "subViewFilter": {
                            "ER-FQ": [
                              {
                                "argumentName": "sampleAnalysisWhereFieldsName",
                                "value": "testing_group|status not in-"
                              },
                              {
                                "argumentName": "sampleAnalysisWhereFieldsValue",
                                "value": "FQ*String|REVIEWED-CANCELED*String"
                              }
                            ],
                            "ER-MB": [
                              {
                                "argumentName": "sampleAnalysisWhereFieldsName",
                                "value": "testing_group|status not in-"
                              },
                              {
                                "argumentName": "sampleAnalysisWhereFieldsValue",
                                "value": "MB*String|REVIEWED-CANCELED*String"
                              }
                            ]
                          }
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
                            "actionName": "ENTERRESULT",
                            "notGetViewData": true,
                            "requiresDialog": false,
                            "zzzendPointUrl": "Samples",
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
                          "argumentName": "sampleAnalysisWhereFieldsName",
                          "value": "testing_group|status not in"
                        },
                        {
                          "argumentName": "sampleId",
                          "selObjectPropertyName": "sample_id"
                        }
                      ],
                      "subViewFilter": {
                        "ER-FQ": [
                          {
                            "argumentName": "sampleAnalysisWhereFieldsValue",
                            "value": "FQ|REVIEWED*String"
                          }
                        ],
                        "ER-MB": [
                          {
                            "argumentName": "sampleAnalysisWhereFieldsValue",
                            "value": "MB|REVIEWED*String"
                          }
                        ]
                      }
                    },                    
                    {
                      "actionName": "ANALYSIS_NEW",
                      "notGetViewData": true,
                      "requiresDialog": true,
                      "certificationException": true,
                      "button": {
                        "icon": "person_add",
                        "title": {
                          "label_en": "xAdd Analysis",
                          "label_es": "Añadir análisis"
                        },
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "genericDialog",
                        "fields": [
                          {"list1": {
                            "label_en": "Category", "label_es": "Categoría", "optional": true,
                            "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
                            "valuesFromMasterData": {
                              "propertyNameContainer": "analysis",
                              "propertyNameContainerLevelPropertyKeyName": "code",
                              "propertyKeyName": "code", "propertyKeyValueEn": "code", "propertyKeyValueEs": "code"
                            },
                            "dependencyActionFields":[
                              {"field": "number1", "staticValue": "hola" },
                              {"field": "text3", "fieldValue": "name" },
                              {"field": "list2", "allRecordEntryWithList": "inv_reference", 
                                "propertyNameInDestination": "category_and_references"}
                            ],
                            "dependencyFieldBehaviorForAll":
                              {"rule": "whenEmpty", "resetValue": true, "action": "disable", 
                                "exceptionFields":[ "list2"]}
                            ,
                            "dependencyFieldBehavior":[
                              {"field": "text4", "rule": "whenEmpty", "resetValue": true}, 
                              {"field": "text5", "rule": "whenEmpty"}, 
                              {"field": "list2", "rule": "whenEmpty", "resetValue": true},
                              {"field": "number2", "rule": "whenEmpty", "resetValue": true, 
                                "action": "hide"}
                            ]
                    
                          }},
                          {
                            "text2": {
                              "label_en": "Analysis version",
                              "label_es": "Versión del análisis"
                            }
                          },
                          {
                            "number1": {
                              "label_en": "theoretical value",
                              "label_es": "Valor teórico"
                            }
                          },
                          {
                            "number2": {
                              "label_en": "Q value",
                              "label_es": "Valor Q"
                            }
                          }
                        ]
                      },  
                      "endPointParams": [
                        {
                          "argumentName": "code",
                          "element": "text1",
                          "defaultValue": ""
                        },
                        {
                          "argumentName": "config_version",
                          "element": "text2",
                          "defaultValue": ""
                        },
                        {
                          "argumentName": "fieldName",
                          "value": "active"
                        },
                        {
                          "argumentName": "fieldValue",
                          "value": "true*Boolean"
                        }
                      ]
                    },
                    {
                      "actionName": "ANALYSIS_REACTIVATE",
                      "notGetViewData": true,
                      "requiresDialog": true,
                      "certificationException": true,
                      "button": {
                        "icon": "toggle_on",
                        "title": {
                          "label_en": "Reactivate analysis",
                          "label_es": "Reactivar análisis"
                        },
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "genericDialog",
                        "fields": [
                          {
                            "list1": {
                              "label_en": "Analysis Code",
                              "label_es": "Código de análisis",
                              "addBlankValueOnTop": true,
                              "addBlankValueAtBottom": false,
                              "valuesFromSelectedItem": {
                                "filterInFirstLevel": true,
                                "elementName": "list1",
                                "internalVariableSingleObjName": "selectedItem",
                                "internalVariableSingleObjProperty": "analysis",
                                "propertyNameContainerLevelPropertyKeyName": "active",
                                "propertyNameContainerLevelfixValue": "false",
                                "propertyKeyName": "code",
                                "propertyKeyValueEn": [
                                  "code"
                                ],
                                "propertyKeyValueEs": [
                                  "code"
                                ]
                              }
                            }
                          },
                          {
                            "text2": {
                              "label_en": "Analysis version",
                              "label_es": "Versión del análisis"
                            }
                          }
                        ]
                      },
                      "endPointParams": [
                        {
                          "argumentName": "code",
                          "element": "list1"
                        },
                        {
                          "argumentName": "configVersion",
                          "element": "text2"
                        }
                      ]
                    },
                    {
                      "actionName": "ANALYSIS_DEACTIVATE",
                      "notGetViewData": true,
                      "requiresDialog": true,
                      "certificationException": true,
                      "button": {
                        "icon": "toggle_off",
                        "title": {
                          "label_en": "Deactivate analysis",
                          "label_es": "Desactivar análisis"
                        },
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "genericDialog",
                        "fields": [
                          {
                            "list1": {
                              "label_en": "Analysis Code",
                              "label_es": "Código de análisis",
                              "addBlankValueOnTop": true,
                              "addBlankValueAtBottom": false,
                              "valuesFromSelectedItem": {
                                "internalVariableSingleObjName": "selectedItem",
                                "internalVariableSingleObjProperty": "analysis",
                                "propertyKeyName": "code",
                                "propertyKeyValueEn": [
                                  "code"
                                ],
                                "propertyKeyValueEs": [
                                  "code"
                                ]
                              }
                            }
                          },
                          {
                            "text2": {
                              "label_en": "Analysis version",
                              "label_es": "Versión del análisis"
                            }
                          }
                        ]
                      },
                      "endPointParams": [
                        {
                          "argumentName": "code",
                          "element": "list1"
                        },
                        {
                          "argumentName": "configVersion",
                          "element": "text2"
                        }
                      ]
                    }
                  ],
                  "row_buttons": [
                    {
                      "actionName": "ENTERRESULT",
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
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "resultDialog",
                        "subQueryName": "getResult",
                        "viewQuery": {
                          "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
                          "zzzendPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
                          "endPointParams": [
                            {
                              "argumentName": "sampleId",
                              "selObjectPropertyName": "sample_id"
                            }
                          ],
                          "subViewFilter": {
                            "ER-FQ": [
                              {
                                "argumentName": "sampleAnalysisWhereFieldsName",
                                "value": "testing_group|status not in-"
                              },
                              {
                                "argumentName": "sampleAnalysisWhereFieldsValue",
                                "value": "FQ*String|REVIEWED-CANCELED*String"
                              }
                            ],
                            "ER-MB": [
                              {
                                "argumentName": "sampleAnalysisWhereFieldsName",
                                "value": "testing_group|status not in-"
                              },
                              {
                                "argumentName": "sampleAnalysisWhereFieldsValue",
                                "value": "MB*String|REVIEWED-CANCELED*String"
                              }
                            ]
                          }
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
                            "actionName": "ENTERRESULT",
                            "notGetViewData": true,
                            "requiresDialog": false,
                            "zzzendPointUrl": "Samples",
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
                          "argumentName": "sampleAnalysisWhereFieldsName",
                          "value": "testing_group|status not in"
                        },
                        {
                          "argumentName": "sampleId",
                          "selObjectPropertyName": "sample_id"
                        }
                      ],
                      "subViewFilter": {
                        "ER-FQ": [
                          {
                            "argumentName": "sampleAnalysisWhereFieldsValue",
                            "value": "FQ|REVIEWED*String"
                          }
                        ],
                        "ER-MB": [
                          {
                            "argumentName": "sampleAnalysisWhereFieldsValue",
                            "value": "MB|REVIEWED*String"
                          }
                        ]
                      }
                    },                        
                    {
                      "actionName": "ANALYSIS_ADD_METHOD",
                      "notGetViewData": true,
                      "requiresDialog": true,
                      "certificationException": true,
                      "button": {
                        "icon": "playlist_add",
                        "title": {
                          "label_en": "Add Analysis Method",
                          "label_es": "Añadir método analítico"
                        },
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "genericDialog",
                        "fields": [
                          {"list1": {
                            "label_en": "Category", "label_es": "Categoría", "optional": true,
                            "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
                            "valuesFromMasterData": {
                              "propertyNameContainer": "analysis",
                              "propertyNameContainerLevelPropertyKeyName": "code",
                              "propertyKeyName": "code", "propertyKeyValueEn": "code", "propertyKeyValueEs": "code"
                            },
                            "dependencyFieldBehaviorForAll":
                              {"rule": "whenEmpty", "resetValue": true, "action": "hide", 
                                "xxxexceptionFields":[ "list2"]}
                            ,
                            "dependencyFieldBehavior":[
                              {"field": "number1", "rule": "whenThisFieldValueIs", "checkValue": "Injections", "resetValue": true, "action": "show"},
                              {"field": "xxnumber1", "rule": "whenThisFieldValueIsNot", "checkValue": "Injections", "resetValue": true, "action": "hide"},
                              {"field": "number2", "rule": "whenThisFieldValueIs", "checkValue": "Disolution Test", "resetValue": true, "action": "show"},
                              {"field": "xxxnumber1", "rule": "whenEmpty", "resetValue": true, "action": "hide"},
                            ]
                    
                          }},
                          {
                            "text2": {
                              "label_en": "Analysis version",
                              "label_es": "Versión del análisis"
                            }
                          },
                          {
                            "number1": {
                              "label_en": "theoretical value",
                              "label_es": "Valor teórico"
                            }
                          },
                          {
                            "number2": {
                              "label_en": "Q value",
                              "label_es": "Valor Q"
                            }
                          }
                        ]
                      },  
                      "endPointParams": [
                        {
                          "argumentName": "methodName",
                          "element": "list1"
                        },
                        {
                          "argumentName": "methodVersion",
                          "element": "text2",
                          "defaultValue": ""
                        },
                        {
                          "argumentName": "code",
                          "selObjectPropertyName": "code"
                        },
                        {
                          "argumentName": "configVersion",
                          "selObjectPropertyName": "config_version"
                        },
                        {
                          "argumentName": "expiryIntervalInfo",
                          "element": "text3",
                          "defaultValue": ""
                        }
                      ]
                    },
                    {
                      "actionName": "ANALYSIS_APPROVAL_FOR_USE",
                      "notGetViewData": true,
                      "requiresDialog": false,
                      "certificationException": true,
                      "requiresGridItemSelected": false,
                      "button": {
                        "icon": "check_box",
                        "title": {
                          "label_en": "Approve analysis for use",
                          "label_es": "Aprobar análisis para su uso"
                        }
                      },
                      "endPointParams": [
                        {
                          "argumentName": "code",
                          "selObjectPropertyName": "code"
                        },
                        {
                          "argumentName": "configVersion",
                          "selObjectPropertyName": "config_version"
                        }
                      ]
                    }
                  ],
                  "children": "analysis_method",
                  "children_definition": {
                    "title": {
                      "label_en": "Analysis Method",
                      "label_es": "Método analítico"
                    },
                    "columns": [
                      {
                        "name": "method_name",
                        "label_en": "Method Code",
                        "label_es": "Código método"
                      },
                      {
                        "name": "testing_group",
                        "label_en": "Testing Group",
                        "label_es": "Grupo Analítico"
                      }
                    ],
                    "row_buttons": [
                      {
                        "actionName": "ANALYSIS_ADD_PARAM",
                        "notGetViewData": true,
                        "requiresDialog": true,
                        "certificationException": true,
                        "button": {
                          "icon": "person_add",
                          "title": {
                            "label_en": "Add Analysis Params",
                            "label_es": "Añadir parámetros de análisis"
                          },
                          "requiresGridItemSelected": false
                        },
                        "dialogInfo": {
                          "name": "genericDialog",
                          "fields": [
                            {
                              "text1": {
                                "label_en": "Param Name",
                                "label_es": "Nombre del parámetro",
                                "optional": false
                              }
                            },
                            {
                              "text2": {
                                "label_en": "Number of replicas ",
                                "label_es": "Número de réplicas",
                                "optional": false
                              }
                            },
                            {
                              "text3": {
                                "label_en": "UOM Conversion Mode",
                                "label_es": "Modo de conversión de UOM",
                                "optional": true
                              }
                            },
                            {
                              "text4": {
                                "label_en": "Linked Calc",
                                "label_es": "Cálculo enlanzado",
                                "optional": true
                              }
                            },
                            {
                              "text5": {
                                "label_en": "List Entry",
                                "label_es": "Lista de entradas",
                                "optional": true
                              }
                            },
                            {
                              "text6": {
                                "label_en": "Param Type",
                                "label_es": "Tipo parámetro",
                                "optional": false
                              }
                            },
                            {
                              "text7": {
                                "label_en": "UOM",
                                "label_es": "UOM",
                                "optional": false
                              }
                            },
                            {
                              "text8": {
                                "label_en": "Analysis Version",
                                "label_es": "Versión análisis",
                                "optional": false
                              }
                            }
                          ]
                        },
                        "endPointParams": [
                          {
                            "argumentName": "code",
                            "selObjectPropertyName": "analysis"
                          },
                          {
                            "argumentName": "configVersion",
                            "element": "text8"
                          },
                          {
                            "argumentName": "methodName",
                            "selObjectPropertyName": "method_name"
                          },
                          {
                            "argumentName": "paramName",
                            "element": "text1",
                            "defaultValue": " "
                          },
                          {
                            "argumentName": "paramType",
                            "element": "text6",
                            "defaultValue": " "
                          },
                          {
                            "argumentName": "numReplicas",
                            "element": "text2",
                            "defaultValue": "0"
                          },
                          {
                            "argumentName": "uom",
                            "element": "text7",
                            "defaultValue": " "
                          },
                          {
                            "argumentName": "uomConversionMode",
                            "element": "text3",
                            "defaultValue": " "
                          },
                          {
                            "argumentName": "calcLinked",
                            "element": "text4",
                            "defaultValue": " "
                          },
                          {
                            "argumentName": "listEntry",
                            "element": "text5",
                            "defaultValue": " "
                          }
                        ]
                      },
                      {
                        "actionName": "ANALYSIS_REMOVE_METHOD",
                        "notGetViewData": true,
                        "requiresDialog": true,
                        "certificationException": true,
                        "button": {
                          "icon": "playlist_remove",
                          "title": {
                            "label_en": "Remove Analysis Method",
                            "label_es": "Borrar método analítico"
                          },
                          "requiresGridItemSelected": false
                        },
                        "dialogInfo": {
                          "name": "genericDialog",
                          "fields": [
                            {
                              "zzzlist1": {
                                "label_en": "Analysis Code",
                                "label_es": "Código de análisis",
                                "addBlankValueOnTop": true,
                                "addBlankValueAtBottom": false,
                                "valuesFromSelectedItem": {
                                  "internalVariableSingleObjName": "selectedItem",
                                  "internalVariableSingleObjProperty": "analysis_method",
                                  "filterInFirstLevel": true,
                                  "propertyKeyName": "method_name",
                                  "propertyKeyValueEn": [
                                    "method_name"
                                  ],
                                  "propertyKeyValueEs": [
                                    "method_name"
                                  ]
                                }
                              }
                            },
                            {
                              "text2": {
                                "label_en": "Method version",
                                "label_es": "Versión del método"
                              }
                            }
                          ]
                        },
                        "endPointParams": [
                          {
                            "argumentName": "methodName",
                            "selObjectPropertyName": "method_name"
                          },
                          {
                            "argumentName": "code",
                            "selObjectPropertyName": "analysis"
                          },
                          {
                            "argumentName": "configVersion",
                            "element": "text2"
                          }
                        ]
                      }
                    ],
                    "actions": [],
                    "children": "analysis_method_params",
                    "children_definition": {
                      "title": {
                        "label_en": "Analysis Params",
                        "label_es": "Parámetros analíticos"
                      },
                      "columns": [
                        {
                          "name": "param_name",
                          "label_en": "Param Name",
                          "label_es": "Nombre parámetro"
                        },
                        {
                          "name": "param_type",
                          "label_en": "Param type",
                          "label_es": "Tipo parámetro"
                        },
                        {
                          "name": "mandatory",
                          "label_en": "Mandatory",
                          "label_es": "Obligatorio"
                        },
                        {
                          "name": "list_entry",
                          "label_en": "List entry",
                          "label_es": "Lista de entrada"
                        },
                        {
                          "name": "calc_linked",
                          "label_en": "Calc linked",
                          "label_es": "Calculos enlazados"
                        },
                        {
                          "name": "uom",
                          "label_en": "UOM",
                          "label_es": "UOM"
                        },
                        {
                          "name": "uom_conversion_mode",
                          "label_en": "UOM conversion mode",
                          "label_es": "Modo conversión UOM"
                        }
                      ],
                      "actions": []
                    }
                  }
                }
              ]
  
            }
          ]
        },        
        {
          "tabLabel_en": "Fake Method validation",
          "tabLabel_es": "Fake Validación de métodos",
          "view": "summary",
          "view_definition": [
            {
              "actions": []
            },          
            {
              "type": "cardMultipleElementsView",            
              "endPointResponseObject": "fake_method_validation",
              "add_border": true,
              "num_columns":2,
              "cardElements":[
                {
                  "type": "reportTitle",
                  "endPointResponseObject": "ROOT",
                  "title":{
                    "text_en": "{fld:name}",
                    "text_es": "{fld:name}"
                  }    
                },              
                {
                  "type": "cardSomeElementsSingleObject",
                  "endPointResponseObject": "final_results",
                  "num_columns":3,
                  "hideNoDataMessage": true,
                  "fieldsToDisplay":[
                    {"name": "total_samples", "label_en":"Total samples", "label_es":"Total muestras",
                      "hideNoDataMessage":true, "styleForLabel":"font-size: 12px;", "styleForValue":"font-size: 12px;", "styleForBlock":"list-style-type: none;"}, 
                    {"name": "average", "label_en":"Average", "label_es":"Promedio", 
                      "hideNoDataMessage":true, "styleForLabel":"font-size: 12px;", "styleForValue":"font-size: 12px;"},  
                    {"name": "standard_deviation", "label_en":"Std Dev", "label_es":"Desviación Std", 
                      "hideNoDataMessage":true, "styleForLabel":"font-size: 12px;", "styleForValue":"font-size: 12px;"}, 
                    {"name": "c_v", "label_en":"Coefficient of Variation", "label_es":"Coeficiente de Variación", 
                      "hideNoDataMessage":true, "styleForLabel":"font-size: 12px;", "styleForValue":"font-size: 12px;"} 
                  ]                  
                },
                {
                  "type": "chart",
                  "display_chart": true,
                  "chartModel": "methodValidation",
                  "chart_type": "line",
                  "chart_name": "results",
                  "zzzendPointResponseObject": "chart_results",
                  "elementName": "cdatatable",
                  "chartSourceData": "chart_results",
                  "xAxisSourceData": "theoretical_value",
                  "sourceData": "value",
                  "grouper_field_name": "chart_results",
                  "grouper_exclude_items":[],
                  "chart_title":{ "label_en": "", "label_es":""},
                  "label_item":{"label_en":"Statussss", "label_es":"Estado"},
                  "label_value":{"label_en":"#", "label_es":"#"} ,  
      
                  "counter_field_name":"chart_results",
                  "xxcounter_field_name":["result", "final_result"],
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
                  }                
                },
                {
                  "type": "parentReadOnlyTable",
                  "endPointResponseObject": "results",
                  "columns": [
                    { "name": "name", "label_en": "Sample", "label_es": "Muestra"},
                    { "name": "injection", "label_en": "Injection", "label_es": "Inyectión"},
                    { "name": "result", "label_en": "Result", "label_es": "Resultado"},
                    { "name": "final_result", "label_en": "Average", "label_es": "Promedio"}
                  ],
                  "actions": [
                    {
                      "actionName": "ENTERRESULT",
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
                          "zzzendPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
                          "endPointParams": [
                            {
                              "argumentName": "sampleId",
                              "selObjectPropertyName": "sample_id"
                            }
                          ],
                          "subViewFilter": {
                            "ER-FQ": [
                              {
                                "argumentName": "sampleAnalysisWhereFieldsName",
                                "value": "testing_group|status not in-"
                              },
                              {
                                "argumentName": "sampleAnalysisWhereFieldsValue",
                                "value": "FQ*String|REVIEWED-CANCELED*String"
                              }
                            ],
                            "ER-MB": [
                              {
                                "argumentName": "sampleAnalysisWhereFieldsName",
                                "value": "testing_group|status not in-"
                              },
                              {
                                "argumentName": "sampleAnalysisWhereFieldsValue",
                                "value": "MB*String|REVIEWED-CANCELED*String"
                              }
                            ]
                          }
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
                            "actionName": "ENTERRESULT",
                            "notGetViewData": true,
                            "requiresDialog": false,
                            "zzzendPointUrl": "Samples",
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
                          "argumentName": "sampleAnalysisWhereFieldsName",
                          "value": "testing_group|status not in"
                        },
                        {
                          "argumentName": "sampleId",
                          "selObjectPropertyName": "sample_id"
                        }
                      ],
                      "subViewFilter": {
                        "ER-FQ": [
                          {
                            "argumentName": "sampleAnalysisWhereFieldsValue",
                            "value": "FQ|REVIEWED*String"
                          }
                        ],
                        "ER-MB": [
                          {
                            "argumentName": "sampleAnalysisWhereFieldsValue",
                            "value": "MB|REVIEWED*String"
                          }
                        ]
                      }
                    },                    
                    {
                      "actionName": "ANALYSIS_NEW",
                      "notGetViewData": true,
                      "requiresDialog": true,
                      "certificationException": true,
                      "button": {
                        "icon": "person_add",
                        "title": {
                          "label_en": "xAdd Analysis",
                          "label_es": "Añadir análisis"
                        },
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "genericDialog",
                        "fields": [
                          {"list1": {
                            "label_en": "Category", "label_es": "Categoría", "optional": true,
                            "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
                            "valuesFromMasterData": {
                              "propertyNameContainer": "analysis",
                              "propertyNameContainerLevelPropertyKeyName": "code",
                              "propertyKeyName": "code", "propertyKeyValueEn": "code", "propertyKeyValueEs": "code"
                            },
                            "dependencyActionFields":[
                              {"field": "number1", "staticValue": "hola" },
                              {"field": "text3", "fieldValue": "name" },
                              {"field": "list2", "allRecordEntryWithList": "inv_reference", 
                                "propertyNameInDestination": "category_and_references"}
                            ],
                            "dependencyFieldBehaviorForAll":
                              {"rule": "whenEmpty", "resetValue": true, "action": "disable", 
                                "exceptionFields":[ "list2"]}
                            ,
                            "dependencyFieldBehavior":[
                              {"field": "text4", "rule": "whenEmpty", "resetValue": true}, 
                              {"field": "text5", "rule": "whenEmpty"}, 
                              {"field": "list2", "rule": "whenEmpty", "resetValue": true},
                              {"field": "number2", "rule": "whenEmpty", "resetValue": true, 
                                "action": "hide"}
                            ]
                    
                          }},
                          {
                            "text2": {
                              "label_en": "Analysis version",
                              "label_es": "Versión del análisis"
                            }
                          },
                          {
                            "number1": {
                              "label_en": "theoretical value",
                              "label_es": "Valor teórico"
                            }
                          },
                          {
                            "number2": {
                              "label_en": "Q value",
                              "label_es": "Valor Q"
                            }
                          }
                        ]
                      },  
                      "endPointParams": [
                        {
                          "argumentName": "code",
                          "element": "text1",
                          "defaultValue": ""
                        },
                        {
                          "argumentName": "config_version",
                          "element": "text2",
                          "defaultValue": ""
                        },
                        {
                          "argumentName": "fieldName",
                          "value": "active"
                        },
                        {
                          "argumentName": "fieldValue",
                          "value": "true*Boolean"
                        }
                      ]
                    },
                    {
                      "actionName": "ANALYSIS_REACTIVATE",
                      "notGetViewData": true,
                      "requiresDialog": true,
                      "certificationException": true,
                      "button": {
                        "icon": "toggle_on",
                        "title": {
                          "label_en": "Reactivate analysis",
                          "label_es": "Reactivar análisis"
                        },
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "genericDialog",
                        "fields": [
                          {
                            "list1": {
                              "label_en": "Analysis Code",
                              "label_es": "Código de análisis",
                              "addBlankValueOnTop": true,
                              "addBlankValueAtBottom": false,
                              "valuesFromSelectedItem": {
                                "filterInFirstLevel": true,
                                "elementName": "list1",
                                "internalVariableSingleObjName": "selectedItem",
                                "internalVariableSingleObjProperty": "analysis",
                                "propertyNameContainerLevelPropertyKeyName": "active",
                                "propertyNameContainerLevelfixValue": "false",
                                "propertyKeyName": "code",
                                "propertyKeyValueEn": [
                                  "code"
                                ],
                                "propertyKeyValueEs": [
                                  "code"
                                ]
                              }
                            }
                          },
                          {
                            "text2": {
                              "label_en": "Analysis version",
                              "label_es": "Versión del análisis"
                            }
                          }
                        ]
                      },
                      "endPointParams": [
                        {
                          "argumentName": "code",
                          "element": "list1"
                        },
                        {
                          "argumentName": "configVersion",
                          "element": "text2"
                        }
                      ]
                    },
                    {
                      "actionName": "ANALYSIS_DEACTIVATE",
                      "notGetViewData": true,
                      "requiresDialog": true,
                      "certificationException": true,
                      "button": {
                        "icon": "toggle_off",
                        "title": {
                          "label_en": "Deactivate analysis",
                          "label_es": "Desactivar análisis"
                        },
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "genericDialog",
                        "fields": [
                          {
                            "list1": {
                              "label_en": "Analysis Code",
                              "label_es": "Código de análisis",
                              "addBlankValueOnTop": true,
                              "addBlankValueAtBottom": false,
                              "valuesFromSelectedItem": {
                                "internalVariableSingleObjName": "selectedItem",
                                "internalVariableSingleObjProperty": "analysis",
                                "propertyKeyName": "code",
                                "propertyKeyValueEn": [
                                  "code"
                                ],
                                "propertyKeyValueEs": [
                                  "code"
                                ]
                              }
                            }
                          },
                          {
                            "text2": {
                              "label_en": "Analysis version",
                              "label_es": "Versión del análisis"
                            }
                          }
                        ]
                      },
                      "endPointParams": [
                        {
                          "argumentName": "code",
                          "element": "list1"
                        },
                        {
                          "argumentName": "configVersion",
                          "element": "text2"
                        }
                      ]
                    }
                  ],
                  "row_buttons": [
                    {
                      "actionName": "ENTERRESULT",
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
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "resultDialog",
                        "subQueryName": "getResult",
                        "viewQuery": {
                          "actionName": "GET_SAMPLE_ANALYSIS_RESULT_LIST",
                          "zzzendPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
                          "endPointParams": [
                            {
                              "argumentName": "sampleId",
                              "selObjectPropertyName": "sample_id"
                            }
                          ],
                          "subViewFilter": {
                            "ER-FQ": [
                              {
                                "argumentName": "sampleAnalysisWhereFieldsName",
                                "value": "testing_group|status not in-"
                              },
                              {
                                "argumentName": "sampleAnalysisWhereFieldsValue",
                                "value": "FQ*String|REVIEWED-CANCELED*String"
                              }
                            ],
                            "ER-MB": [
                              {
                                "argumentName": "sampleAnalysisWhereFieldsName",
                                "value": "testing_group|status not in-"
                              },
                              {
                                "argumentName": "sampleAnalysisWhereFieldsValue",
                                "value": "MB*String|REVIEWED-CANCELED*String"
                              }
                            ]
                          }
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
                            "actionName": "ENTERRESULT",
                            "notGetViewData": true,
                            "requiresDialog": false,
                            "zzzendPointUrl": "Samples",
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
                          "argumentName": "sampleAnalysisWhereFieldsName",
                          "value": "testing_group|status not in"
                        },
                        {
                          "argumentName": "sampleId",
                          "selObjectPropertyName": "sample_id"
                        }
                      ],
                      "subViewFilter": {
                        "ER-FQ": [
                          {
                            "argumentName": "sampleAnalysisWhereFieldsValue",
                            "value": "FQ|REVIEWED*String"
                          }
                        ],
                        "ER-MB": [
                          {
                            "argumentName": "sampleAnalysisWhereFieldsValue",
                            "value": "MB|REVIEWED*String"
                          }
                        ]
                      }
                    },                        
                    {
                      "actionName": "ANALYSIS_ADD_METHOD",
                      "notGetViewData": true,
                      "requiresDialog": true,
                      "certificationException": true,
                      "button": {
                        "icon": "playlist_add",
                        "title": {
                          "label_en": "Add Analysis Method",
                          "label_es": "Añadir método analítico"
                        },
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "genericDialog",
                        "fields": [
                          {"list1": {
                            "label_en": "Category", "label_es": "Categoría", "optional": true,
                            "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
                            "valuesFromMasterData": {
                              "propertyNameContainer": "analysis",
                              "propertyNameContainerLevelPropertyKeyName": "code",
                              "propertyKeyName": "code", "propertyKeyValueEn": "code", "propertyKeyValueEs": "code"
                            },
                            "dependencyFieldBehaviorForAll":
                              {"rule": "whenEmpty", "resetValue": true, "action": "hide", 
                                "xxxexceptionFields":[ "list2"]}
                            ,
                            "dependencyFieldBehavior":[
                              {"field": "number1", "rule": "whenThisFieldValueIs", "checkValue": "Injections", "resetValue": true, "action": "show"},
                              {"field": "xxnumber1", "rule": "whenThisFieldValueIsNot", "checkValue": "Injections", "resetValue": true, "action": "hide"},
                              {"field": "number2", "rule": "whenThisFieldValueIs", "checkValue": "Disolution Test", "resetValue": true, "action": "show"},
                              {"field": "xxxnumber1", "rule": "whenEmpty", "resetValue": true, "action": "hide"},
                            ]
                    
                          }},
                          {
                            "text2": {
                              "label_en": "Analysis version",
                              "label_es": "Versión del análisis"
                            }
                          },
                          {
                            "number1": {
                              "label_en": "theoretical value",
                              "label_es": "Valor teórico"
                            }
                          },
                          {
                            "number2": {
                              "label_en": "Q value",
                              "label_es": "Valor Q"
                            }
                          }
                        ]
                      },  
                      "endPointParams": [
                        {
                          "argumentName": "methodName",
                          "element": "list1"
                        },
                        {
                          "argumentName": "methodVersion",
                          "element": "text2",
                          "defaultValue": ""
                        },
                        {
                          "argumentName": "code",
                          "selObjectPropertyName": "code"
                        },
                        {
                          "argumentName": "configVersion",
                          "selObjectPropertyName": "config_version"
                        },
                        {
                          "argumentName": "expiryIntervalInfo",
                          "element": "text3",
                          "defaultValue": ""
                        }
                      ]
                    },
                    {
                      "actionName": "ANALYSIS_APPROVAL_FOR_USE",
                      "notGetViewData": true,
                      "requiresDialog": false,
                      "certificationException": true,
                      "requiresGridItemSelected": false,
                      "button": {
                        "icon": "check_box",
                        "title": {
                          "label_en": "Approve analysis for use",
                          "label_es": "Aprobar análisis para su uso"
                        }
                      },
                      "endPointParams": [
                        {
                          "argumentName": "code",
                          "selObjectPropertyName": "code"
                        },
                        {
                          "argumentName": "configVersion",
                          "selObjectPropertyName": "config_version"
                        }
                      ]
                    }
                  ],
                  "children": "analysis_method",
                  "children_definition": {
                    "title": {
                      "label_en": "Analysis Method",
                      "label_es": "Método analítico"
                    },
                    "columns": [
                      {
                        "name": "method_name",
                        "label_en": "Method Code",
                        "label_es": "Código método"
                      },
                      {
                        "name": "testing_group",
                        "label_en": "Testing Group",
                        "label_es": "Grupo Analítico"
                      }
                    ],
                    "row_buttons": [
                      {
                        "actionName": "ANALYSIS_ADD_PARAM",
                        "notGetViewData": true,
                        "requiresDialog": true,
                        "certificationException": true,
                        "button": {
                          "icon": "person_add",
                          "title": {
                            "label_en": "Add Analysis Params",
                            "label_es": "Añadir parámetros de análisis"
                          },
                          "requiresGridItemSelected": false
                        },
                        "dialogInfo": {
                          "name": "genericDialog",
                          "fields": [
                            {
                              "text1": {
                                "label_en": "Param Name",
                                "label_es": "Nombre del parámetro",
                                "optional": false
                              }
                            },
                            {
                              "text2": {
                                "label_en": "Number of replicas ",
                                "label_es": "Número de réplicas",
                                "optional": false
                              }
                            },
                            {
                              "text3": {
                                "label_en": "UOM Conversion Mode",
                                "label_es": "Modo de conversión de UOM",
                                "optional": true
                              }
                            },
                            {
                              "text4": {
                                "label_en": "Linked Calc",
                                "label_es": "Cálculo enlanzado",
                                "optional": true
                              }
                            },
                            {
                              "text5": {
                                "label_en": "List Entry",
                                "label_es": "Lista de entradas",
                                "optional": true
                              }
                            },
                            {
                              "text6": {
                                "label_en": "Param Type",
                                "label_es": "Tipo parámetro",
                                "optional": false
                              }
                            },
                            {
                              "text7": {
                                "label_en": "UOM",
                                "label_es": "UOM",
                                "optional": false
                              }
                            },
                            {
                              "text8": {
                                "label_en": "Analysis Version",
                                "label_es": "Versión análisis",
                                "optional": false
                              }
                            }
                          ]
                        },
                        "endPointParams": [
                          {
                            "argumentName": "code",
                            "selObjectPropertyName": "analysis"
                          },
                          {
                            "argumentName": "configVersion",
                            "element": "text8"
                          },
                          {
                            "argumentName": "methodName",
                            "selObjectPropertyName": "method_name"
                          },
                          {
                            "argumentName": "paramName",
                            "element": "text1",
                            "defaultValue": " "
                          },
                          {
                            "argumentName": "paramType",
                            "element": "text6",
                            "defaultValue": " "
                          },
                          {
                            "argumentName": "numReplicas",
                            "element": "text2",
                            "defaultValue": "0"
                          },
                          {
                            "argumentName": "uom",
                            "element": "text7",
                            "defaultValue": " "
                          },
                          {
                            "argumentName": "uomConversionMode",
                            "element": "text3",
                            "defaultValue": " "
                          },
                          {
                            "argumentName": "calcLinked",
                            "element": "text4",
                            "defaultValue": " "
                          },
                          {
                            "argumentName": "listEntry",
                            "element": "text5",
                            "defaultValue": " "
                          }
                        ]
                      },
                      {
                        "actionName": "ANALYSIS_REMOVE_METHOD",
                        "notGetViewData": true,
                        "requiresDialog": true,
                        "certificationException": true,
                        "button": {
                          "icon": "playlist_remove",
                          "title": {
                            "label_en": "Remove Analysis Method",
                            "label_es": "Borrar método analítico"
                          },
                          "requiresGridItemSelected": false
                        },
                        "dialogInfo": {
                          "name": "genericDialog",
                          "fields": [
                            {
                              "zzzlist1": {
                                "label_en": "Analysis Code",
                                "label_es": "Código de análisis",
                                "addBlankValueOnTop": true,
                                "addBlankValueAtBottom": false,
                                "valuesFromSelectedItem": {
                                  "internalVariableSingleObjName": "selectedItem",
                                  "internalVariableSingleObjProperty": "analysis_method",
                                  "filterInFirstLevel": true,
                                  "propertyKeyName": "method_name",
                                  "propertyKeyValueEn": [
                                    "method_name"
                                  ],
                                  "propertyKeyValueEs": [
                                    "method_name"
                                  ]
                                }
                              }
                            },
                            {
                              "text2": {
                                "label_en": "Method version",
                                "label_es": "Versión del método"
                              }
                            }
                          ]
                        },
                        "endPointParams": [
                          {
                            "argumentName": "methodName",
                            "selObjectPropertyName": "method_name"
                          },
                          {
                            "argumentName": "code",
                            "selObjectPropertyName": "analysis"
                          },
                          {
                            "argumentName": "configVersion",
                            "element": "text2"
                          }
                        ]
                      }
                    ],
                    "actions": [],
                    "children": "analysis_method_params",
                    "children_definition": {
                      "title": {
                        "label_en": "Analysis Params",
                        "label_es": "Parámetros analíticos"
                      },
                      "columns": [
                        {
                          "name": "param_name",
                          "label_en": "Param Name",
                          "label_es": "Nombre parámetro"
                        },
                        {
                          "name": "param_type",
                          "label_en": "Param type",
                          "label_es": "Tipo parámetro"
                        },
                        {
                          "name": "mandatory",
                          "label_en": "Mandatory",
                          "label_es": "Obligatorio"
                        },
                        {
                          "name": "list_entry",
                          "label_en": "List entry",
                          "label_es": "Lista de entrada"
                        },
                        {
                          "name": "calc_linked",
                          "label_en": "Calc linked",
                          "label_es": "Calculos enlazados"
                        },
                        {
                          "name": "uom",
                          "label_en": "UOM",
                          "label_es": "UOM"
                        },
                        {
                          "name": "uom_conversion_mode",
                          "label_en": "UOM conversion mode",
                          "label_es": "Modo conversión UOM"
                        }
                      ],
                      "actions": []
                    }
                  }
                }
              ]
  
            }
          ]
        },        
        {
          "tabLabel_en": "Stability Studies",
          "tabLabel_es": "Estudios de Estabilidad",
          "view": "summary",
          "view_definition": [
            {
              "type": "dragDropBoxes",    
              "boxesTableColumns":{
                "endPointPropertyArray": ["boxContents"],
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
                    "name": "cols",
                    "label_en": "Conditions",
                    "label_es": "Condiciones"
                  },
                  {
                    "name": "rows",
                    "label_en": "Timepoints",
                    "label_es": "Tiempos"
                  }
                ]
              },
              "boxesContentColumns":{
                "endPointPropertyArray": ["boxContents"],
                "columns": [
                  {
                    "name": "name",
                    "label_en": "name",
                    "label_es": "name"
                  },
                  {
                    "name": "posX",
                    "label_en": "Condition",
                    "label_es": "Condición"
                  },
                  {
                    "name": "posY",
                    "label_en": "Timepoint",
                    "label_es": "Tiempos"
                  },
                  {
                    "name": "location",
                    "label_en": "Location",
                    "label_es": "Ubicación"
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
              "boxPosicsViews":[
                ["sample_id", "condition"],
                ["sample_id", "condition", "timepoint"],
                ["location"]
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
                  { "argumentName": "sampleId", "dropElement": "id" },
                  { "argumentName": "batchTemplateId", "dragElement": "posicy" },
                  { "argumentName": "batchTemplateVersion", "defaultValue": 1 },
                  { "argumentName": "batchName", "dragElement": "name" }			  
                ]
              },
              "fakedata": {
                "boxDefinition":{
                  "readOnly": true,
                  "max_num_objects_per_position": 1
                },
                "tableDefinition": {
                  "type": "readOnlyTable",
                  "dragEnable": true,
                  "dropEnable": true,
                  "dropObjectPropertiesRequired":["id", "study", "temperature"],
                  "title": {
                    "label_en": "1.1) Roles",
                    "label_es": "1.1) Perfiles"
                  },
                  "theme":"TRAZiT-DefinitionArea",
                  "endPointResponseObject": "procedure_roles",
                  "columns": [
                    {
                      "name": "id",
                      "label_en": "id",
                      "label_es": "id"
                    },
                    {
                      "name": "temperature",
                      "label_en": "temperature",
                      "label_es": "temperature"
                    },
                    {
                      "name": "study",
                      "label_en": "study",
                      "label_es": "study"
                    }
                  ],
                  "row_buttons": [
                    {
                      "actionName": "REMOVE_ROLE",
                      "notGetViewData": true,
                      "clientMethod": "procMngRequirementsMethod",
                      "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                      "selectedItemPropertyName": "selectedItems",
                      "requiresDialog": false,
                      "certificationException": true,
                      "secondaryActionToPerform": {
                        "name": "refreshSelProcData"
                      },
                      "button": {
                        "icon": "person_remove",
                        "title": {
                          "label_en": "Remove role",
                          "label_es": "Borrar perfil"
                        },
                        "requiresGridItemSelected": false
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
                          "argumentName": "roleName",
                          "selObjectPropertyName": "role_name"
                        }
                      ]
                    },
                    {
                      "actionName": "RENAME_ROLE",
                      "notGetViewData": true,
                      "clientMethod": "procMngRequirementsMethod",
                      "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                      "selectedItemPropertyName": "selectedItems",
                      "requiresDialog": true,
                      "certificationException": true,
                      "secondaryActionToPerform": {
                        "name": "refreshSelProcData"
                      },
                      "button": {
                        "icon": "manage_accounts",
                        "title": {
                          "label_en": "Rename role",
                          "label_es": "Renombrar perfil"
                        },
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "genericDialog",
                        "fields": [
                          {
                            "text1": {
                              "label_en": "New Role Name",
                              "label_es": "Nuevo Nombre Perfil",
                              "selObjectPropertyName": "role_name"
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
                          "argumentName": "roleName",
                          "selObjectPropertyName": "role_name"
                        },
                        {
                          "argumentName": "newroleName",
                          "element": "text1",
                          "defaultValue": ""
                        }
                      ]
                    },
                    {
                      "actionName": "CLONE_ROLE",
                      "notGetViewData": true,
                      "clientMethod": "procMngRequirementsMethod",
                      "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                      "selectedItemPropertyName": "selectedItems",
                      "requiresDialog": true,
                      "certificationException": true,
                      "secondaryActionToPerform": {
                        "name": "refreshSelProcData"
                      },
                      "button": {
                        "icon": "file_copy",
                        "title": {
                          "label_en": "Clone Role",
                          "label_es": "Clonar Perfil"
                        },
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "genericDialog",
                        "fields": [
                          {
                            "text1": {
                              "label_en": "New Role Name",
                              "label_es": "Nuevo Nombre de Perfil",
                              "selObjectPropertyName": "role_name"
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
                          "argumentName": "roleName",
                          "selObjectPropertyName": "role_name"
                        },
                        {
                          "argumentName": "newroleName",
                          "element": "text1"
                        }
                      ]
                    }
                  ],
                  "actions": [
                    {
                      "actionName": "ADD_ROLE",
                      "notGetViewData": true,
                      "clientMethod": "procMngRequirementsMethod",
                      "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
                      "selectedItemPropertyName": "selectedItems",
                      "requiresDialog": true,
                      "certificationException": true,
                      "secondaryActionToPerform": {
                        "name": "refreshSelProcData"
                      },
                      "button": {
                        "icon": "person_add",
                        "title": {
                          "label_en": "Assign Role",
                          "label_es": "Asignar Perfil"
                        },
                        "requiresGridItemSelected": false
                      },
                      "dialogInfo": {
                        "name": "genericDialog",
                        "dialogWidth": "500px",
                        "fields": [
                          {
                            "text1": {
                              "label_en": "New Role name",
                              "label_es": "Nuevo Nombre de Perfil"
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
                          "argumentName": "roleName",
                          "element": "text1",
                          "defaultValue": ""
                        }
                      ]
                    }
                  ]
                },
                "boxContents": [
                  {"name":"Protocol 1", "cols": 5, "rows": 5, "content_structured": true, "allow_move_objects": false,   
                    "anyProperty": 1, 
                    "axisLabels":{
                      "posicX":["T25°C 60%RH", "30°C 35%RH", "30°C 65%RH", "30°C 75%RH", "40°C 25%RH", "40°C 75%RH", "5°C ± 3°C"],
                      "posicY":["T0", "M1", "3 Months", "M6", "12 Meses"]
                    },
                    "datas": [            
                      {
                        "sample_id": 1, 
                        "name": "Sample1",
                        "description": "Hello",
                        "study": null,
                        "condition": "T25°C 60%RH",
                        "timepoint": "T0",
                        "result1": 1,
                        "result2": 2,
                        "posX": 1,
                        "posY": 1,
                        "stored_on": "2024-01-19"
                      },
                      {
                        "sample_id": 11, 
                        "condition": "40°C 25%RH",
                        "timepoint": "M1",
                        "name": "Sample11",
                        "description": "Hello11",
                        "study": null,
                        "temperature": "aaa",
                        "result1": 1,
                        "result2": 2,
                        "posX": 5,
                        "posY": 2,
                        "stored_on": "2024-01-19"
                      },            
                      {
                        "sample_id": 2, 
                        "condition": "30°C 65%RH",
                        "timepoint": "M1",
                        "name": "Sample2",
                        "description": "Hello2",
                        "study": "here2",
                        "temperature": "bbb",
                        "result1": 1,
                        "result2": 2,
                        "posX": 3,
                        "posY": 2,
                        "stored_on": "2024-01-17"
                      },
                      {
                        "sample_id": 3, 
                        "name": "Sample3",
                        "description": "Hello3",
                        "study": "here13",
                        "temperature": "ccc",
                        "condition": "40°C 25%RH",
                        "timepoint": "3 Months",
                        "result1": 1,
                        "result2": 2,
                        "posX": 5,
                        "posY": 3,
                        "stored_on": "2024-01-16"
                      }        
                    ]
                  },
                  {"name":"Box 11", "content_structured": true,
                    "datas": [
                      {
                        "id": 1,               
                        "name": "Sample1",
                        "description": "Hello",
                        "study": null,
                        "temperature": "aaa",
                        "result1": 1,
                        "result2": 2,
                        "posX": 3,
                        "posY": 1,
                        "stored_on": "2024-01-19"
                      },
                      {
                        "id": 2, 
                        "name": "Sample2",
                        "description": "Hello2",
                        "study": "here2",
                        "temperature": "bbb",
                        "result1": 1,
                        "result2": 2,
                        "posX": 3,
                        "posY": 2,
                        "stored_on": "2024-01-17"
                      }  
                    ]
                  },
                  {"name":"Caja A", "cols": 11, "rows": 6, "content_structured": false, "allow_move_objects": true, 
                    "datas": [
                      {
                        "id": 1, 
                        "name": "Sample1",
                        "description": "Hello",
                        "study": null,
                        "temperature": "aaa",
                        "result1": 1,
                        "result2": 2,
                        "posX": 3,
                        "posY": 1,
                        "stored_on": "2024-01-19"
                      } 
                    ]
                  },
                  {"name":"Caja B", "cols": 11, "rows": 6, "content_structured": false, "allow_move_objects": true, 
                    "datas": [
                      {
                        "id": 1, 
                        "name": "Sample1",
                        "description": "Hello",
                        "study": null,
                        "temperature": "aaa",
                        "result1": 1,
                        "result2": 2,
                        "posX": 3,
                        "posY": 1,
                        "stored_on": "2024-01-19"
                      } 
                    ]
                  }
                ]
              }    
            }
          ]
        }
    ]
  },
  "stability":{
    "component": "dragDropBoxes",    
    "boxesTableColumns":{
      "endPointPropertyArray": ["boxContents"],
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
          "name": "cols",
          "label_en": "Conditions",
          "label_es": "Condiciones"
        },
        {
          "name": "rows",
          "label_en": "Timepoints",
          "label_es": "Tiempos"
        }
      ]
    },
    "boxesContentColumns":{
      "endPointPropertyArray": ["boxContents"],
      "columns": [
        {
          "name": "name",
          "label_en": "name",
          "label_es": "name"
        },
        {
          "name": "posX",
          "label_en": "Condition",
          "label_es": "Condición"
        },
        {
          "name": "posY",
          "label_en": "Timepoint",
          "label_es": "Tiempos"
        },
        {
          "name": "location",
          "label_en": "Location",
          "label_es": "Ubicación"
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
    "boxPosicsViews":[
      ["sample_id", "condition"],
      ["sample_id", "condition", "timepoint"],
      ["location"]
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
        { "argumentName": "sampleId", "dropElement": "id" },
        { "argumentName": "batchTemplateId", "dragElement": "posicy" },
        { "argumentName": "batchTemplateVersion", "defaultValue": 1 },
        { "argumentName": "batchName", "dragElement": "name" }			  
      ]
    },
    "fakedata": {
      boxDefinition:{
        readOnly: true,
        max_num_objects_per_position: 1
      },
      tableDefinition: {
        "type": "readOnlyTable",
        "dragEnable": true,
        "dropEnable": true,
        "dropObjectPropertiesRequired":["id", "study", "temperature"],
        "title": {
          "label_en": "1.1) Roles",
          "label_es": "1.1) Perfiles"
        },
        "theme":"TRAZiT-DefinitionArea",
        "endPointResponseObject": "procedure_roles",
        "columns": [
          {
            "name": "id",
            "label_en": "id",
            "label_es": "id"
          },
          {
            "name": "temperature",
            "label_en": "temperature",
            "label_es": "temperature"
          },
          {
            "name": "study",
            "label_en": "study",
            "label_es": "study"
          }
        ],
        "row_buttons": [
          {
            "actionName": "REMOVE_ROLE",
            "notGetViewData": true,
            "clientMethod": "procMngRequirementsMethod",
            "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
            "selectedItemPropertyName": "selectedItems",
            "requiresDialog": false,
            "certificationException": true,
            "secondaryActionToPerform": {
              "name": "refreshSelProcData"
            },
            "button": {
              "icon": "person_remove",
              "title": {
                "label_en": "Remove role",
                "label_es": "Borrar perfil"
              },
              "requiresGridItemSelected": false
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
                "argumentName": "roleName",
                "selObjectPropertyName": "role_name"
              }
            ]
          },
          {
            "actionName": "RENAME_ROLE",
            "notGetViewData": true,
            "clientMethod": "procMngRequirementsMethod",
            "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
            "selectedItemPropertyName": "selectedItems",
            "requiresDialog": true,
            "certificationException": true,
            "secondaryActionToPerform": {
              "name": "refreshSelProcData"
            },
            "button": {
              "icon": "manage_accounts",
              "title": {
                "label_en": "Rename role",
                "label_es": "Renombrar perfil"
              },
              "requiresGridItemSelected": false
            },
            "dialogInfo": {
              "name": "genericDialog",
              "fields": [
                {
                  "text1": {
                    "label_en": "New Role Name",
                    "label_es": "Nuevo Nombre Perfil",
                    "selObjectPropertyName": "role_name"
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
                "argumentName": "roleName",
                "selObjectPropertyName": "role_name"
              },
              {
                "argumentName": "newroleName",
                "element": "text1",
                "defaultValue": ""
              }
            ]
          },
          {
            "actionName": "CLONE_ROLE",
            "notGetViewData": true,
            "clientMethod": "procMngRequirementsMethod",
            "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
            "selectedItemPropertyName": "selectedItems",
            "requiresDialog": true,
            "certificationException": true,
            "secondaryActionToPerform": {
              "name": "refreshSelProcData"
            },
            "button": {
              "icon": "file_copy",
              "title": {
                "label_en": "Clone Role",
                "label_es": "Clonar Perfil"
              },
              "requiresGridItemSelected": false
            },
            "dialogInfo": {
              "name": "genericDialog",
              "fields": [
                {
                  "text1": {
                    "label_en": "New Role Name",
                    "label_es": "Nuevo Nombre de Perfil",
                    "selObjectPropertyName": "role_name"
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
                "argumentName": "roleName",
                "selObjectPropertyName": "role_name"
              },
              {
                "argumentName": "newroleName",
                "element": "text1"
              }
            ]
          }
        ],
        "actions": [
          {
            "actionName": "ADD_ROLE",
            "notGetViewData": true,
            "clientMethod": "procMngRequirementsMethod",
            "endPoint": "/appProcMgr/RequirementsProcedureDefinitionAPIActions",
            "selectedItemPropertyName": "selectedItems",
            "requiresDialog": true,
            "certificationException": true,
            "secondaryActionToPerform": {
              "name": "refreshSelProcData"
            },
            "button": {
              "icon": "person_add",
              "title": {
                "label_en": "Assign Role",
                "label_es": "Asignar Perfil"
              },
              "requiresGridItemSelected": false
            },
            "dialogInfo": {
              "name": "genericDialog",
              "dialogWidth": "500px",
              "fields": [
                {
                  "text1": {
                    "label_en": "New Role name",
                    "label_es": "Nuevo Nombre de Perfil"
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
                "argumentName": "roleName",
                "element": "text1",
                "defaultValue": ""
              }
            ]
          }
        ]
      },
      boxContents: [
        {"name":"Protocol 1", cols: 5, rows: 5, content_structured: true, "allow_move_objects": false,   
          "anyProperty": 1, 
          axisLabels:{
            posicX:["T25°C 60%RH", "30°C 35%RH", "30°C 65%RH", "30°C 75%RH", "40°C 25%RH", "40°C 75%RH", "5°C ± 3°C"],
            posicY:["T0", "M1", "3 Months", "M6", "12 Meses"]
          },
          datas: [            
            {
              sample_id: 1, 
              name: "Sample1",
              description: "Hello",
              study: undefined,
              condition: "T25°C 60%RH",
              timepoint: "T0",
              result1: 1,
              result2: 2,
              posX: 1,
              posY: 1,
              stored_on: "2024-01-19"
            },
            {
              sample_id: 11, 
              condition: "40°C 25%RH",
              timepoint: "M1",
              name: "Sample11",
              description: "Hello11",
              study: undefined,
              temperature: "aaa",
              result1: 1,
              result2: 2,
              posX: 5,
              posY: 2,
              stored_on: "2024-01-19"
            },            
            {
              sample_id: 2, 
              condition: "30°C 65%RH",
              timepoint: "M1",
              name: "Sample2",
              description: "Hello2",
              study: "here2",
              temperature: "bbb",
              result1: 1,
              result2: 2,
              posX: 3,
              posY: 2,
              stored_on: "2024-01-17"
            },
            {
              sample_id: 3, 
              name: "Sample3",
              description: "Hello3",
              study: "here13",
              temperature: "ccc",
              condition: "40°C 25%RH",
              timepoint: "3 Months",
              result1: 1,
              result2: 2,
              posX: 5,
              posY: 3,
              stored_on: "2024-01-16"
            }        
          ]
        },
        {"name":"Box 11", content_structured: true,
          datas: [
            {
              id: 1,               
              name: "Sample1",
              description: "Hello",
              study: undefined,
              temperature: "aaa",
              result1: 1,
              result2: 2,
              posX: 3,
              posY: 1,
              stored_on: "2024-01-19"
            },
            {
              id: 2, 
              name: "Sample2",
              description: "Hello2",
              study: "here2",
              temperature: "bbb",
              result1: 1,
              result2: 2,
              posX: 3,
              posY: 2,
              stored_on: "2024-01-17"
            }  
          ]
        },
        {"name":"Caja A", cols: 11, rows: 6, content_structured: false, "allow_move_objects": true, 
          datas: [
            {
              id: 1, 
              name: "Sample1",
              description: "Hello",
              study: undefined,
              temperature: "aaa",
              result1: 1,
              result2: 2,
              posX: 3,
              posY: 1,
              stored_on: "2024-01-19"
            } 
          ]
        },
        {"name":"Caja B", cols: 11, rows: 6, content_structured: false, "allow_move_objects": true, 
          datas: [
            {
              id: 1, 
              name: "Sample1",
              description: "Hello",
              study: undefined,
              temperature: "aaa",
              result1: 1,
              result2: 2,
              posX: 3,
              posY: 1,
              stored_on: "2024-01-19"
            } 
          ]
        }
      ]
    }    
  }  
}


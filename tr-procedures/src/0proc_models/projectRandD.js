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
    "zzzfilterResultDetail": {
      "type": "list",
      "detail": [
        {
          "field": "code"
        }
      ]
    },
    "actions": [],
    "tabs": [
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
                "label_en": "Formula",
                "label_es": "fórmula"
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
              }
            ],
            "actions": [
              {
                "zzactionName": "ANALYSIS_NEW",
                "notGetViewData": true,
                "requiresDialog": true,
                "certificationException": true,
                "button": {
                  "icon": "person_add",
                  "title": {
                    "label_en": "Add Analysis",
                    "label_es": "Añadir análisis"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "text1": {
                        "label_en": "Analysis Code",
                        "label_es": "Código de análisis"
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
                "zzactionName": "ANALYSIS_REACTIVATE",
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
                "zzactionName": "ANALYSIS_DEACTIVATE",
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
                "zzactionName": "ANALYSIS_ADD_METHOD",
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
                    {
                      "list1": {
                        "label_en": "Method Code",
                        "label_es": "Código de método",
                        "addBlankValueOnTop": true,
                        "addBlankValueAtBottom": false,
                        "valuesFromMasterData": {
                          "propertyNameContainer": "methods",
                          "filterInFirstLevel": false,
                          "propertyNameContainerLevelPropertyKeyName": "code",
                          "propertyKeyName": "code",
                          "propertyKeyValueEn": "code",
                          "propertyKeyValueEs": "code"
                        }
                      }
                    },
                    {
                      "text2": {
                        "label_en": "Method version",
                        "label_es": "Versión del método",
                        "optional": false
                      }
                    },
                    {
                      "text3": {
                        "label_en": "Expiry Interval Info",
                        "label_es": "Información del intervalo de caducidad",
                        "optional": true
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
                "zzactionName": "ANALYSIS_APPROVAL_FOR_USE",
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
            "children": "formula_ingredients",
            "children_definition": {
              "title": {
                "label_en": "Ingredients",
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
                  "label_es": "Cantidad",
                  "as_paragraph": true,
                  "paragraph": {"text":"{fld:quantity} {fld?in_percentage?%:{fld:quantity_uom}"}
                },
                {
                  "name": "notes",
                  "label_en": "Notes",
                  "label_es": "Notas"
                }
              ],
              "row_buttons": [
                {
                  "zzactionName": "ANALYSIS_ADD_PARAM",
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
                  "zzactionName": "ANALYSIS_REMOVE_METHOD",
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
            "type": "parentReadOnlyTable",
            "endPointResponseObject": "analysis",
            "columns": [
              {
                "name": "code",
                "label_en": "Code",
                "label_es": "Código"
              },
              {
                "name": "testing_group",
                "label_en": "Testing Group",
                "label_es": "Grupo Analítico"
              }
            ],
            "actions": [
              {
                "actionName": "ANALYSIS_NEW",
                "notGetViewData": true,
                "requiresDialog": true,
                "certificationException": true,
                "button": {
                  "icon": "person_add",
                  "title": {
                    "label_en": "Add Analysis",
                    "label_es": "Añadir análisis"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "text1": {
                        "label_en": "Analysis Code",
                        "label_es": "Código de análisis"
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
                    {
                      "list1": {
                        "label_en": "Method Code",
                        "label_es": "Código de método",
                        "addBlankValueOnTop": true,
                        "addBlankValueAtBottom": false,
                        "valuesFromMasterData": {
                          "propertyNameContainer": "methods",
                          "filterInFirstLevel": false,
                          "propertyNameContainerLevelPropertyKeyName": "code",
                          "propertyKeyName": "code",
                          "propertyKeyValueEn": "code",
                          "propertyKeyValueEs": "code"
                        }
                      }
                    },
                    {
                      "text2": {
                        "label_en": "Method version",
                        "label_es": "Versión del método",
                        "optional": false
                      }
                    },
                    {
                      "text3": {
                        "label_en": "Expiry Interval Info",
                        "label_es": "Información del intervalo de caducidad",
                        "optional": true
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
      },
      {
        "tabLabel_en": "Stability Studies",
        "tabLabel_es": "Estudios de Estabilidad",
        "view": "summary",
        "view_definition": [
          {
            "actions": []
          },
          {
            "type": "parentReadOnlyTable",
            "endPointResponseObject": "analysis",
            "columns": [
              {
                "name": "code",
                "label_en": "Code",
                "label_es": "Código"
              },
              {
                "name": "testing_group",
                "label_en": "Testing Group",
                "label_es": "Grupo Analítico"
              }
            ],
            "actions": [
              {
                "actionName": "ANALYSIS_NEW",
                "notGetViewData": true,
                "requiresDialog": true,
                "certificationException": true,
                "button": {
                  "icon": "person_add",
                  "title": {
                    "label_en": "Add Analysis",
                    "label_es": "Añadir análisis"
                  },
                  "requiresGridItemSelected": false
                },
                "dialogInfo": {
                  "name": "genericDialog",
                  "fields": [
                    {
                      "text1": {
                        "label_en": "Analysis Code",
                        "label_es": "Código de análisis"
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
                    {
                      "list1": {
                        "label_en": "Method Code",
                        "label_es": "Código de método",
                        "addBlankValueOnTop": true,
                        "addBlankValueAtBottom": false,
                        "valuesFromMasterData": {
                          "propertyNameContainer": "methods",
                          "filterInFirstLevel": false,
                          "propertyNameContainerLevelPropertyKeyName": "code",
                          "propertyKeyName": "code",
                          "propertyKeyValueEn": "code",
                          "propertyKeyValueEs": "code"
                        }
                      }
                    },
                    {
                      "text2": {
                        "label_en": "Method version",
                        "label_es": "Versión del método",
                        "optional": false
                      }
                    },
                    {
                      "text3": {
                        "label_en": "Expiry Interval Info",
                        "label_es": "Información del intervalo de caducidad",
                        "optional": true
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
  }
}


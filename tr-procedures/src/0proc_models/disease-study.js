export const DiseaseStudy = {
	"TrackingChanges":{
	  "version": 0.1,
	  "last change on (YYYYMMDD)": "20221018",
	  "last_change_note_20221018": "Starting the remodeling of"
	},
	"ModuleSettings":{
	  "actionsEndpoints":[
		{ "name": "Projects" , "url" : "/moduleclinicalstudy/ClinicalStudyAPIactions"}		
	  ],
	  "queriesEndpoints":[
		{ "name": "Studies" , "url" : "/moduleclinicalstudy/ClinicalStudyAPIqueries"}				
	  ],
	  "zzzactionsEndpoints":[
		{ "name": "Studies" , "url" : "/modulegenoma/GenomaStudyAPIactions"}
	  ]
	},	
	"MyStudies":{
		"component": "ObjectByTabs",
		"hasOwnComponent": true,
		"showTitleOnTop": true,
		"title": {
		  "fix_text_en": "My Studies",
		  "fix_text_es": "Mis Estudios",
		  "name": "study"
		},
		"viewQuery": {
		  "actionName": "ALL_MY_ACTIVE_STUDIES",
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
			{}
		  ]
		},
		"filter_button": {
		  "label_en": "Search",
		  "label_es": "Buscar"
		},
		"filter": [],
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
			"tabLabel_en": "Individuals",
			"tabLabel_es": "Individuos",
			"view": "studyindividuals",
			"view_definition": [
			  {
				"type": "parentReadOnlyTable",
				"endPointPropertyArray": [
				  "study_individual"
				],
				"columns": [
				  {
					"name": "individual_id",
					"label_en": "Individual ID",
					"label_es": "ID persona"
				  },
				  {
					"name": "individual_name",
					"label_en": "Individual name",
					"label_es": "Nombre persona"
				  },
				  {
					"name": "created_by",
					"label_en": "Created by",
					"label_es": "Creado por"
				  },
				  {
					"name": "created_on",
					"label_en": "Created On",
					"label_es": "Creado en"
				  }
				],
				"actions": [
				  {
					"actionName": "STUDY_CREATE_INDIVIDUAL",
					"notGetViewData": true,
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"selObjectPropertyName": "study"
					  },
					  {
						"argumentName": "individualName",
						"element": "text1"
					  }
					],
					"button": {
					  "icon": "person_add",
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
							"label_en": "new Individual Name",
							"label_es": "Nombre Nuevo Individuo"
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "STUDY_INDIVIDUAL_ACTIVATE",
					"clientMethod": "openReactivateObjectDialog",
					"notGetViewData": true,
					"requiresDialog": true,
					"certificationException": true,
					"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "individualId",
						"selObjectPropertyName": "individual_id"
					  }
					],
					"button": {
					  "icon": "toggle_on",
					  "title": {
						"label_en": "Reactivate",
						"label_es": "Reactivar"
					  },
					  "requiresGridItemSelected": false
					},
					"dialogInfo": {
					  "name": "reactivateObjectDialog",
					  "fieldsObject": {
						"queryNumDays": {
						  "label_en": "Number of Days",
						  "label_es": "Número de Días"
						},
						"objectName": {
						  "label_en": "Individual to reactivate",
						  "label_es": "Individuo a Reactivar"
						}
					  },
					  "listDefinition": {
						"keyFldName": "individual_id",
						"eachEntryTextGenerator": [
						  {
							"value": "Name: ",
							"type": "fix"
						  },
						  {
							"value": "individual_name",
							"type": "field"
						  }
						]
					  },
					  "viewQuery": {
						"actionName": "DEACTIVATED_STUDY_INDIVIDUALS_LAST_N_DAYS",
						"clientMethod": "getDeactivatedObjects",
						"endPointParams": [
						  {
							"query": "numDays",
							"element": "queryNumDays",
							"defaultValue": 7
						  },
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  }
						]
					  }
					}
				  }
				],
				"row_buttons": [
				  {
					"actionName": "STUDY_INDIVIDUAL_DEACTIVATE",
					"notGetViewData": true,
					"requiresDialog": false,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"selObjectPropertyName": "study"
					  },
					  {
						"argumentName": "individualId",
						"selObjectPropertyName": "individual_id"
					  }
					],
					"button": {
					  "icon": "toggle_off",
					  "title": {
						"label_en": "Deactivate",
						"label_es": "Desactivar"
					  },
					  "requiresGridItemSelected": true
					}
				  },
				  {
					"actionName": "STUDY_CREATE_INDIVIDUAL_SAMPLE",
					"notGetViewData": true,
					"requiresDialog": false,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"selObjectPropertyName": "study"
					  },
					  {
						"argumentName": "individualId",
						"selObjectPropertyName": "individual_id"
					  }
					],
					"button": {
					  "icon": "playlist_add",
					  "title": {
						"label_en": "Add Extra Sample",
						"label_es": "Añadir Muestra Extra"
					  },
					  "requiresGridItemSelected": true
					}
				  },
				  {
					"actionName": "ADD_VARIABLE_SET_TO_STUDY_OBJECT",
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "ownerTable",
						"value": "study_individual_sample"
					  },
					  {
						"argumentName": "ownerId",
						"selObjectPropertyName": "sample_id"
					  },
					  {
						"argumentName": "variableSetName",
						"element": "list1"
					  }
					],
					"button": {
					  "icon": "refresh",
					  "title": {
						"label_en": "Add Variable Set",
						"label_es": "Añadir Conjunto de Variables"
					  },
					  "requiresObjectSelected": false
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericDialog",
					  "fields": [
						{
						  "list1": {
							"items": [
							  {
								"keyName": "name",
								"keyValue_en": "name",
								"keyValue_es": "name"
							  }
							],
							"label_en": "Variable Set",
							"label_es": "Grupo de variables",
							"optional": true,
							"addBlankValueOnTop": true,
							"addBlankValueAtBottom": false,
							"valuesFromMasterData": {
							  "elementName": "list4",
							  "propertyNameContainer": "variables_set",
							  "propertyNameContainerLevelPropertyKeyName": "name",
							  "propertyKeyName": "name",
							  "propertyKeyValueEn": "name",
							  "propertyKeyValueEs": "name"
							}
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "ADD_VARIABLE_TO_STUDY_OBJECT",
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "ownerTable",
						"value": "study_individual"
					  },
					  {
						"argumentName": "ownerId",
						"selObjectPropertyName": "individual_id"
					  },
					  {
						"argumentName": "variableName",
						"element": "list1"
					  }
					],
					"button": {
					  "icon": "refresh",
					  "title": {
						"label_en": "Add Variable",
						"label_es": "Añadir Variable"
					  },
					  "requiresObjectSelected": false
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericDialog",
					  "fields": [
						{
						  "list1": {
							"items": [
							  {
								"keyName": "name",
								"keyValue_en": "name",
								"keyValue_es": "name"
							  }
							],
							"label_en": "Variables",
							"label_es": "Variables",
							"optional": true,
							"addBlankValueOnTop": true,
							"addBlankValueAtBottom": false,
							"valuesFromMasterData": {
							  "elementName": "list4",
							  "propertyNameContainer": "variables",
							  "propertyNameContainerLevelPropertyKeyName": "name",
							  "propertyKeyName": "name",
							  "propertyKeyValueEn": "name",
							  "propertyKeyValueEs": "name"
							}
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "STUDY_FAMILY_REMOVE_INDIVIDUAL",
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "individualId",
						"selObjectPropertyName": "individual_id"
					  },
					  {
						"argumentName": "familyName",
						"element": "list1"
					  }
					],
					"button": {
					  "icon": "refresh",
					  "title": {
						"label_en": "Remove from family",
						"label_es": "Borrar de familia"
					  },
					  "requiresObjectSelected": false
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericDialog",
					  "fields": [
						{
						  "list1": {
							"label_en": "Family",
							"label_es": "Familia",
							"addBlankValueOnTop": true,
							"addBlankValueAtBottom": false,
							"valuesFromSelectedItem": {
							  "selObjectPropertyName": "study_family_individual",
							  "propertyKeyName": "family_name",
							  "propertyKeyValueEn": [
								"family_name"
							  ],
							  "propertyKeyValueEs": [
								"family_name"
							  ]
							}
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "STUDY_COHORT_REMOVE_INDIVIDUAL",
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "individualId",
						"selObjectPropertyName": "individual_id"
					  },
					  {
						"argumentName": "cohortName",
						"element": "list1"
					  }
					],
					"button": {
					  "icon": "refresh",
					  "title": {
						"label_en": "Remove from cohort",
						"label_es": "Borrar de cohorte"
					  },
					  "requiresObjectSelected": false
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericDialog",
					  "fields": [
						{
						  "list1": {
							"label_en": "Cohort",
							"label_es": "Cohorte",
							"addBlankValueOnTop": true,
							"addBlankValueAtBottom": false,
							"valuesFromSelectedItem": {
							  "selObjectPropertyName": "study_cohort_individual",
							  "propertyKeyName": "cohort_name",
							  "propertyKeyValueEn": [
								"cohort_name"
							  ],
							  "propertyKeyValueEs": [
								"cohort_name"
							  ]
							}
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "OPEN_INDIVIDUAL_CONSENT",
					"requiresDialog": true,
					"button": {
					  "icon": "attach_file",
					  "title": {
						"label_en": "Open",
						"label_es": "Abrir"
					  },
					  "requiresGridItemSelected": false
					},
					"dialogInfo": {
					  "name": "genericDialog",
					  "filesListContent": true,
					  "dialogQuery": {
						"actionName": "GET_INDIVIDUAL_CONSENT_FILE",
						"variableForData": "",
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  },
						  {
							"argumentName": "individualId",
							"internalVariableObjName": "selectedItems",
							"internalVariableObjProperty": "individual_id"
						  }
						]
					  }
					}
				  }
				],
				"children": "study_individual_sample",
				"children_definition": {
				  "title": {
					"label_en": "Individual Samples",
					"label_es": "Muestras del individuo"
				  },
				  "columns": [
					{
					  "name": "sample_id",
					  "label_en": "Sample Id",
					  "label_es": "Id de muestra"
					},
					{
					  "name": "individual_name",
					  "label_en": "Name",
					  "label_es": "Nombre"
					},
					{
					  "name": "created_by",
					  "label_en": "Created by",
					  "label_es": "Creado por"
					},
					{
					  "name": "created_on",
					  "label_en": "Created on",
					  "label_es": "Creado en"
					}
				  ],
				  "row_buttons": [
					{
					  "actionName": "STUDY_INDIVIDUAL_SAMPLE_DEACTIVATE",
					  "certificationException": true,
					  "requiresDialog": false,
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "selObjectPropertyName": "study"
						},
						{
						  "argumentName": "sampleId",
						  "selObjectPropertyName": "sample_id"
						},
						{
						  "argumentName": "individualId",
						  "selObjectPropertyName": "individual_id"
						}
					  ],
					  "button": {
						"icon": "refresh",
						"title": {
						  "label_en": "Deactivate",
						  "label_es": "Desactivar"
						},
						"requiresObjectSelected": true
					  }
					},
					{
					  "actionName": "STUDY_INDIVIDUAL_SAMPLE_ACTIVATE",
					  "clientMethod": "openReactivateObjectDialog",
					  "notGetViewData": true,
					  "requiresDialog": true,
					  "certificationException": true,
					  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "internalVariableSimpleObjName": "selectedItem",
						  "internalVariableSimpleObjProperty": "name"
						},
						{
						  "argumentName": "sampleId",
						  "selObjectPropertyName": "sample_id"
						}
					  ],
					  "button": {
						"icon": "toggle_on",
						"title": {
						  "label_en": "Reactivate",
						  "label_es": "Reactivar"
						},
						"requiresGridItemSelected": false
					  },
					  "dialogInfo": {
						"name": "reactivateObjectDialog",
						"fieldsObject": {
						  "queryNumDays": {
							"label_en": "Number of Days",
							"label_es": "Número de Días"
						  },
						  "objectName": {
							"label_en": "Sample to reactivate",
							"label_es": "Muestra a Reactivar"
						  }
						},
						"listDefinition": {
						  "keyFldName": "sample_id",
						  "eachEntryTextGenerator": [
							{
							  "value": "Sample: ",
							  "type": "fix"
							},
							{
							  "value": "sample_id",
							  "type": "field"
							}
						  ]
						},
						"viewQuery": {
						  "actionName": "DEACTIVATED_STUDY_INDIVIDUAL_SAMPLES_LAST_N_DAYS",
						  "clientMethod": "getDeactivatedObjects",
						  "endPointParams": [
							{
							  "query": "numDays",
							  "element": "queryNumDays",
							  "defaultValue": 7
							},
							{
							  "argumentName": "studyName",
							  "internalVariableSimpleObjName": "selectedItem",
							  "internalVariableSimpleObjProperty": "name"
							}
						  ]
						}
					  }
					},
					{
					  "actionName": "STUDY_SAMPLES_SET_REMOVE_SAMPLE",
					  "requiresDialog": true,
					  "certificationException": true,
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "internalVariableSimpleObjName": "selectedItem",
						  "internalVariableSimpleObjProperty": "name"
						},
						{
						  "argumentName": "sampleId",
						  "selObjectPropertyName": "sample_id"
						},
						{
						  "argumentName": "samplesSetName",
						  "element": "list1"
						}
					  ],
					  "button": {
						"icon": "refresh",
						"title": {
						  "label_en": "Remove from Sample Set",
						  "label_es": "Borrar de Grupo de muestras"
						},
						"requiresObjectSelected": false
					  },
					  "dialogInfo": {
						"requiresDialog": true,
						"name": "genericDialog",
						"fields": [
						  {
							"list1": {
							  "label_en": "Sample Set",
							  "label_es": "Grupo de muestras",
							  "addBlankValueOnTop": true,
							  "addBlankValueAtBottom": false,
							  "valuesFromSelectedItem": {
								"selObjectPropertyName": "study_samples_set",
								"propertyKeyName": "name",
								"propertyKeyValueEn": [
								  "name"
								],
								"propertyKeyValueEs": [
								  "name"
								]
							  }
							}
						  }
						]
					  }
					}
				  ],
				  "children": "study_variable_values",
				  "children_definition": {
					"title": {
					  "label_en": "Sample results",
					  "label_es": "Resultados de muestra"
					},
					"columns": [
					  {
						"name": "id",
						"label_en": "Id",
						"label_es": "Id"
					  },
					  {
						"name": "sample",
						"label_en": "Sample",
						"label_es": "Muestra"
					  }
					],
					"row_buttons": [
					  {
						"actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
						"requiresDialog": true,
						"certificationException": true,
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
						  "requiresGridItemSelected": true,
						  "hideWhenSelectedItem": {
							"column": "total_params",
							"value": 0
						  }
						},
						"resultHeader": {
						  "id": {
							"label_en": "Id",
							"label_es": "Id",
							"width": "10%"
						  },
						  "name": {
							"label_en": "Parameter",
							"label_es": "Parámetro"
						  },
						  "value": {
							"label_en": "Value",
							"label_es": "Valor"
						  }
						},
						"resultHeaderObjectLabelTopLeft": {
						  "label_en": "Instrument Event:",
						  "label_es": "Evento de Instrumento :"
						},
						"dialogInfo": {
						  "name": "resultDialog",
						  "keyFldName": "id",
						  "subQueryName": "getParams",
						  "viewQuery": {
							"actionName": "STUDY_VARIABLES_LIST",
							"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIqueries",
							"endPointParams": [
							  {
								"argumentName": "studyName",
								"internalVariableSimpleObjName": "selectedItem",
								"internalVariableSimpleObjProperty": "name"
							  },
							  {
								"argumentName": "variableId",
								"selObjectPropertyName": "id"
							  }
							]
						  },
						  "automatic": true,
						  "action": [
							{
							  "actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
							  "notGetViewData": true,
							  "requiresDialog": false,
							  "clientMethod": "enterEventResult",
							  "endPointParams": [
								{
								  "argumentName": "studyName",
								  "internalVariableSimpleObjName": "selectedItem",
								  "internalVariableSimpleObjProperty": "name"
								},
								{
								  "argumentName": "variableName",
								  "selObjectPropertyName": "name"
								},
								{
								  "argumentName": "ownerTable",
								  "selObjectPropertyName": "owner_table"
								},
								{
								  "argumentName": "ownerId",
								  "selObjectPropertyName": "owner_id"
								},
								{
								  "argumentName": "newValue",
								  "targetValue": true
								}
							  ]
							}
						  ]
						}
					  }
					]
				  }
				}
			  }
			]
		  },
		  {
			"tabLabel_en": "Consents",
			"tabLabel_es": "Consentimientos",
			"view": "studyindividualConsent",
			"view_definition": [
			  {
				"type": "parentReadOnlyTable",
				"endPointPropertyArray": [
				  "study_individual_consent"
				],
				"columns": [
				  {
					"name": "id",
					"label_en": "ID",
					"label_es": "ID"
				  },
				  {
					"name": "brief_summary",
					"label_en": "Individual name",
					"label_es": "Nombre persona"
				  },
				  {
					"name": "created_by",
					"label_en": "Created by",
					"label_es": "Creado por"
				  },
				  {
					"name": "created_on",
					"label_en": "Created On",
					"label_es": "Creado en"
				  }
				],
				"actions": [
				  {
					"actionName": "ADD_INDIVIDUAL_CONSENT",
					"notGetViewData": true,
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "individualId",
						"element": "list1"
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
					],
					"button": {
					  "icon": "person_add",
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
						  "list1": {
							"label_en": "Indvidual Id to Add",
							"label_es": "Individuo a añadir",
							"addBlankValueOnTop": true,
							"addBlankValueAtBottom": false,
							"valuesFromSelectedItem": {
							  "internalVariableSingleObjName": "selectedItem",
							  "internalVariableSingleObjProperty": "study_individual",
							  "propertyKeyName": "individual_id",
							  "propertyKeyValueEn": [
								"individual_name"
							  ],
							  "propertyKeyValueEs": [
								"individual_name"
							  ]
							}
						  }
						},
						{
						  "text1": {
							"label_en": "Doc Url",
							"label_es": "Vínculo",
							"optional": true
						  }
						},
						{
						  "text2": {
							"label_en": "Notes",
							"label_es": "Notas",
							"optional": true
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "REACTIVATE_INDIVIDUAL_CONSENT",
					"clientMethod": "openReactivateObjectDialog",
					"notGetViewData": true,
					"requiresDialog": true,
					"certificationException": true,
					"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "individualId",
						"selObjectPropertyName": "individual_id"
					  }
					],
					"button": {
					  "icon": "toggle_on",
					  "title": {
						"label_en": "Reactivate",
						"label_es": "Reactivar"
					  },
					  "requiresGridItemSelected": false
					},
					"dialogInfo": {
					  "name": "reactivateObjectDialog",
					  "fieldsObject": {
						"queryNumDays": {
						  "label_en": "Number of Days",
						  "label_es": "Número de Días"
						},
						"objectName": {
						  "label_en": "Individual to reactivate",
						  "label_es": "Individuo a Reactivar"
						}
					  },
					  "listDefinition": {
						"keyFldName": "individual_id",
						"eachEntryTextGenerator": [
						  {
							"value": "Name: ",
							"type": "fix"
						  },
						  {
							"value": "individual_name",
							"type": "field"
						  }
						]
					  },
					  "viewQuery": {
						"actionName": "DEACTIVATED_STUDY_INDIVIDUALS_LAST_N_DAYS",
						"clientMethod": "getDeactivatedObjects",
						"endPointParams": [
						  {
							"query": "numDays",
							"element": "queryNumDays",
							"defaultValue": 7
						  },
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  }
						]
					  }
					}
				  }
				],
				"row_buttons": [
				  {
					"actionName": "REMOVE_INDIVIDUAL_CONSENT",
					"notGetViewData": true,
					"requiresDialog": false,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"selObjectPropertyName": "study"
					  },
					  {
						"argumentName": "individualId",
						"selObjectPropertyName": "individual_id"
					  }
					],
					"button": {
					  "icon": "toggle_off",
					  "title": {
						"label_en": "Deactivate",
						"label_es": "Desactivar"
					  },
					  "requiresGridItemSelected": true
					}
				  },
				  {
					"actionName": "UPDATE_INDIVIDUAL_CONSENT",
					"requiresDialog": true,
					"button": {
					  "icon": "add_link",
					  "title": {
						"label_en": "Update",
						"label_es": "Modificar"
					  },
					  "requiresGridItemSelected": false
					},
					"dialogInfo": {
					  "name": "genericDialog",
					  "fields": [
						{
						  "text1": {
							"label_en": "Doc Url",
							"label_es": "Vínculo",
							"selObjectPropertyName": "file_link"
						  }
						},
						{
						  "text2": {
							"label_en": "Title",
							"label_es": "Título",
							"selObjectPropertyName": "brief_summary",
							"optional": true
						  }
						}
					  ]
					},
					"endPointParams": [
					  {
						"argumentName": "instrumentName",
						"xinternalVariableObjName": "selectedItems",
						"selObjectPropertyName": "instrument"
					  },
					  {
						"argumentName": "eventId",
						"xinternalVariableObjName": "selectedItems",
						"selObjectPropertyName": "id"
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
					"actionName": "OPEN_INDIVIDUAL_CONSENT",
					"requiresDialog": false,
					"clientMethod": "openPDF",
					"button": {
					  "icon": "attach_file",
					  "title": {
						"label_en": "Open",
						"label_es": "Abrir"
					  },
					  "requiresGridItemSelected": false
					},
					"zzzdialogInfo": {
					  "name": "genericDialog",
					  "filesListContent": true,
					  "dialogQuery": {
						"actionName": "GET_INDIVIDUAL_CONSENT_FILE",
						"variableForData": "",
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  },
						  {
							"argumentName": "individualId",
							"internalVariableObjName": "selectedItems",
							"internalVariableObjProperty": "individual_id"
						  },
						  {
							"argumentName": "attachmentId",
							"internalVariableObjName": "selectedItems",
							"internalVariableObjProperty": "id"
						  }
						]
					  }
					}
				  },
				  {
					"actionName": "REMOVE_INDIVIDUAL_CONSENT",
					"requiresDialog": false,
					"button": {
					  "icon": "link_off",
					  "title": {
						"label_en": "Remove Consent",
						"label_es": "Eliminar Consentimiento"
					  },
					  "requiresGridItemSelected": false
					},
					"zzzdialogInfo": {
					  "name": "genericDialog",
					  "gridContent": true,
					  "dialogQuery": {
						"actionName": "GET_INSTR_ATTACHMENTS",
						"variableForData": "",
						"endPointParams": [
						  {
							"argumentName": "instrumentName",
							"internalVariableObjName": "selectedItems",
							"internalVariableObjProperty": "instrument"
						  },
						  {
							"argumentName": "eventId",
							"internalVariableObjName": "selectedItems",
							"internalVariableObjProperty": "id"
						  }
						]
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
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "individualId",
						"selObjectPropertyName": "individual_id"
					  },
					  {
						"argumentName": "attachmentId",
						"selObjectPropertyName": "id"
					  }
					]
				  }
				]
			  }
			]
		  },
		  {
			"tabLabel_en": "Study Variable Values",
			"tabLabel_es": "Valores de variables para el estudio",
			"view": "studyvariablevalues",
			"view_definition": [
			  {
				"type": "parentReadOnlyTable",
				"endPointPropertyArray": [
				  "study_variable_values"
				],
				"columns": [
				  {
					"name": "id",
					"label_en": "Id",
					"label_es": "Id"
				  },
				  {
					"name": "owner_table",
					"label_en": "Type",
					"label_es": "Tipo"
				  },
				  {
					"name": "owner_id",
					"label_en": "Owner",
					"label_es": "Dueño"
				  },
				  {
					"name": "variable_set",
					"label_en": "Variable set",
					"label_es": "Set de variables"
				  },
				  {
					"name": "name",
					"label_en": "Name",
					"label_es": "Nombre"
				  },
				  {
					"name": "value",
					"label_en": "Value",
					"label_es": "Valor"
				  }
				],
				"actions": [],
				"row_buttons": [
				  {
					"actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
					"requiresDialog": true,
					"certificationException": true,
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
					  "requiresGridItemSelected": true,
					  "hideWhenSelectedItem": {
						"column": "total_params",
						"value": 0
					  }
					},
					"resultHeader": {
					  "id": {
						"label_en": "Id",
						"label_es": "Id",
						"width": "10%"
					  },
					  "name": {
						"label_en": "Parameter",
						"label_es": "Parámetro"
					  },
					  "value": {
						"label_en": "Value",
						"label_es": "Valor"
					  }
					},
					"resultHeaderObjectLabelTopLeft": {
					  "label_en": "Instrument Event:",
					  "label_es": "Evento de Instrumento :"
					},
					"dialogInfo": {
					  "name": "resultDialog",
					  "keyFldName": "id",
					  "subQueryName": "getParams",
					  "viewQuery": {
						"actionName": "STUDY_VARIABLES_LIST",
						"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIqueries",
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  },
						  {
							"argumentName": "variableId",
							"selObjectPropertyName": "id"
						  }
						]
					  },
					  "automatic": true,
					  "action": [
						{
						  "actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
						  "notGetViewData": true,
						  "requiresDialog": false,
						  "clientMethod": "enterEventResult",
						  "endPointParams": [
							{
							  "argumentName": "studyName",
							  "internalVariableSimpleObjName": "selectedItem",
							  "internalVariableSimpleObjProperty": "name"
							},
							{
							  "argumentName": "variableName",
							  "selObjectPropertyName": "name"
							},
							{
							  "argumentName": "ownerTable",
							  "selObjectPropertyName": "owner_table"
							},
							{
							  "argumentName": "ownerId",
							  "selObjectPropertyName": "owner_id"
							},
							{
							  "argumentName": "newValue",
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
				  }
				]
			  }
			]
		  },
		  {
			"tabLabel_en": "Families",
			"tabLabel_es": "Familias",
			"view": "studyfamily",
			"view_definition": [
			  {
				"type": "parentReadOnlyTable",
				"endPointPropertyArray": [
				  "study_family"
				],
				"columns": [
				  {
					"name": "name",
					"label_en": "Family",
					"label_es": "Familia"
				  },
				  {
					"name": "active",
					"label_en": "Active",
					"label_es": "Activo",
					"is_icon": true
				  },
				  {
					"name": "description",
					"label_en": "Description",
					"label_es": "Descripción"
				  },
				  {
					"name": "created_by",
					"label_en": "Created By",
					"label_es": "Creado por"
				  },
				  {
					"name": "individual_name",
					"label_en": "Individual name",
					"label_es": "Nombre individual"
				  },
				  {
					"name": "individual_id",
					"label_en": "Individual ID",
					"label_es": "Valor individual"
				  }
				],
				"actions": [
				  {
					"actionName": "STUDY_CREATE_FAMILY",
					"notGetViewData": true,
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "familyName",
						"element": "text1"
					  }
					],
					"button": {
					  "icon": "person_add",
					  "title": {
						"label_en": "New study family",
						"label_es": "Nueva familia de estudio"
					  },
					  "requiresGridItemSelected": false
					},
					"dialogInfo": {
					  "name": "genericDialog",
					  "fields": [
						{
						  "text1": {
							"label_en": "New family Name",
							"label_es": "Nombre Nueva familia"
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "STUDY_FAMILY_ACTIVATE",
					"clientMethod": "openReactivateObjectDialog",
					"notGetViewData": true,
					"requiresDialog": true,
					"certificationException": true,
					"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "familyName",
						"selObjectPropertyName": "name"
					  }
					],
					"button": {
					  "icon": "toggle_on",
					  "title": {
						"label_en": "Reactivate",
						"label_es": "Reactivar"
					  },
					  "requiresGridItemSelected": false
					},
					"dialogInfo": {
					  "name": "reactivateObjectDialog",
					  "fieldsObject": {
						"queryNumDays": {
						  "label_en": "Number of Days",
						  "label_es": "Número de Días"
						},
						"objectName": {
						  "label_en": "Family to reactivate",
						  "label_es": "Familia a Reactivar"
						}
					  },
					  "listDefinition": {
						"keyFldName": "name",
						"eachEntryTextGenerator": [
						  {
							"value": "Name: ",
							"type": "fix"
						  },
						  {
							"value": "name",
							"type": "field"
						  }
						]
					  },
					  "viewQuery": {
						"actionName": "DEACTIVATED_STUDY_FAMILIES_LAST_N_DAYS",
						"clientMethod": "getDeactivatedObjects",
						"endPointParams": [
						  {
							"query": "numDays",
							"element": "queryNumDays",
							"defaultValue": 7
						  },
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  }
						]
					  }
					}
				  }
				],
				"row_buttons": [
				  {
					"actionName": "STUDY_FAMILY_DEACTIVATE",
					"notGetViewData": true,
					"requiresDialog": false,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "familyName",
						"selObjectPropertyName": "name"
					  }
					],
					"button": {
					  "icon": "toggle_off",
					  "title": {
						"label_en": "Deactivate",
						"label_es": "Desactivar"
					  },
					  "requiresGridItemSelected": true
					}
				  },
				  {
					"actionName": "STUDY_FAMILY_ADD_INDIVIDUAL",
					"notGetViewData": true,
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "familyName",
						"selObjectPropertyName": "name"
					  },
					  {
						"argumentName": "individualsList",
						"element": "list1"
					  }
					],
					"button": {
					  "icon": "add",
					  "title": {
						"label_en": "Add Individual",
						"label_es": "Añadir Individuo"
					  },
					  "requiresGridItemSelected": true
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericDialog",
					  "fields": [
						{
						  "list1": {
							"label_en": "Indvidual Id to Add",
							"label_es": "Individuo a añadir",
							"addBlankValueOnTop": true,
							"addBlankValueAtBottom": false,
							"valuesFromSelectedItem": {
							  "internalVariableSingleObjName": "selectedItem",
							  "internalVariableSingleObjProperty": "study_individual",
							  "propertyKeyName": "individual_id",
							  "propertyKeyValueEn": [
								"individual_name"
							  ],
							  "propertyKeyValueEs": [
								"individual_name"
							  ]
							}
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "ADD_VARIABLE_SET_TO_STUDY_OBJECT",
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "ownerTable",
						"value": "study_family"
					  },
					  {
						"argumentName": "ownerId",
						"selObjectPropertyName": "name"
					  },
					  {
						"argumentName": "variableSetName",
						"element": "list1"
					  }
					],
					"button": {
					  "icon": "refresh",
					  "title": {
						"label_en": "Add Variable Set",
						"label_es": "Añadir Conjunto de Variables"
					  },
					  "requiresObjectSelected": false
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericDialog",
					  "fields": [
						{
						  "list1": {
							"items": [
							  {
								"keyName": "name",
								"keyValue_en": "name",
								"keyValue_es": "name"
							  }
							],
							"label_en": "Variable Set",
							"label_es": "Grupo de variables",
							"optional": true,
							"addBlankValueOnTop": true,
							"addBlankValueAtBottom": false,
							"valuesFromMasterData": {
							  "elementName": "list4",
							  "propertyNameContainer": "variables_set",
							  "propertyNameContainerLevelPropertyKeyName": "name",
							  "propertyKeyName": "name",
							  "propertyKeyValueEn": "name",
							  "propertyKeyValueEs": "name"
							}
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "ADD_VARIABLE_TO_STUDY_OBJECT",
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "ownerTable",
						"value": "study_family"
					  },
					  {
						"argumentName": "ownerId",
						"selObjectPropertyName": "name"
					  },
					  {
						"argumentName": "variableName",
						"element": "list1"
					  }
					],
					"button": {
					  "icon": "refresh",
					  "title": {
						"label_en": "Add Variable",
						"label_es": "Añadir Variable"
					  },
					  "requiresObjectSelected": false
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericDialog",
					  "fields": [
						{
						  "list1": {
							"items": [
							  {
								"keyName": "name",
								"keyValue_en": "name",
								"keyValue_es": "name"
							  }
							],
							"label_en": "Variables",
							"label_es": "Variables",
							"optional": true,
							"addBlankValueOnTop": true,
							"addBlankValueAtBottom": false,
							"valuesFromMasterData": {
							  "elementName": "list4",
							  "propertyNameContainer": "variables",
							  "propertyNameContainerLevelPropertyKeyName": "name",
							  "propertyKeyName": "name",
							  "propertyKeyValueEn": "name",
							  "propertyKeyValueEs": "name"
							}
						  }
						}
					  ]
					}
				  }
				],
				"children": "study_individual",
				"children_definition": {
				  "title": {
					"label_en": "Individuals",
					"label_es": "Individuos"
				  },
				  "columns": [
					{
					  "name": "individual_id",
					  "label_en": "Individual ID",
					  "label_es": "ID persona"
					},
					{
					  "name": "individual_name",
					  "label_en": "Individual name",
					  "label_es": "Nombre persona"
					},
					{
					  "name": "created_by",
					  "label_en": "Created by",
					  "label_es": "Creado por"
					},
					{
					  "name": "created_on",
					  "label_en": "Created On",
					  "label_es": "Creado en"
					}
				  ],
				  "row_buttons": [
					{
					  "actionName": "STUDY_FAMILY_REMOVE_INDIVIDUAL",
					  "notGetViewData": true,
					  "requiresDialog": false,
					  "certificationException": true,
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "internalVariableSimpleObjName": "selectedItem",
						  "internalVariableSimpleObjProperty": "name"
						},
						{
						  "argumentName": "familyName",
						  "parentElementProperty": "name"
						},
						{
						  "argumentName": "individualId",
						  "selObjectPropertyName": "individual_id"
						}
					  ],
					  "button": {
						"icon": "remove",
						"title": {
						  "label_en": "Unlink from family",
						  "label_es": "Quitar de la familia"
						},
						"requiresGridItemSelected": true
					  }
					},
					{
					  "actionName": "ADD_VARIABLE_SET_TO_STUDY_OBJECT",
					  "requiresDialog": true,
					  "certificationException": true,
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "internalVariableSimpleObjName": "selectedItem",
						  "internalVariableSimpleObjProperty": "name"
						},
						{
						  "argumentName": "ownerTable",
						  "value": "study_individual"
						},
						{
						  "argumentName": "ownerId",
						  "selObjectPropertyName": "individual_id"
						},
						{
						  "argumentName": "variableSetName",
						  "element": "list1"
						}
					  ],
					  "button": {
						"icon": "refresh",
						"title": {
						  "label_en": "Add Variable Set",
						  "label_es": "Añadir Conjunto de Variables"
						},
						"requiresObjectSelected": false
					  },
					  "dialogInfo": {
						"requiresDialog": true,
						"name": "genericDialog",
						"fields": [
						  {
							"list1": {
							  "items": [
								{
								  "keyName": "name",
								  "keyValue_en": "name",
								  "keyValue_es": "name"
								}
							  ],
							  "label_en": "Variable Set",
							  "label_es": "Grupo de variables",
							  "optional": true,
							  "addBlankValueOnTop": true,
							  "addBlankValueAtBottom": false,
							  "valuesFromMasterData": {
								"elementName": "list4",
								"propertyNameContainer": "variables_set",
								"propertyNameContainerLevelPropertyKeyName": "name",
								"propertyKeyName": "name",
								"propertyKeyValueEn": "name",
								"propertyKeyValueEs": "name"
							  }
							}
						  }
						]
					  }
					},
					{
					  "actionName": "ADD_VARIABLE_TO_STUDY_OBJECT",
					  "requiresDialog": true,
					  "certificationException": true,
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "internalVariableSimpleObjName": "selectedItem",
						  "internalVariableSimpleObjProperty": "name"
						},
						{
						  "argumentName": "ownerTable",
						  "value": "study_individual"
						},
						{
						  "argumentName": "ownerId",
						  "selObjectPropertyName": "individual_id"
						},
						{
						  "argumentName": "variableName",
						  "element": "list1"
						}
					  ],
					  "button": {
						"icon": "refresh",
						"title": {
						  "label_en": "Add Variable",
						  "label_es": "Añadir Variable"
						},
						"requiresObjectSelected": false
					  },
					  "dialogInfo": {
						"requiresDialog": true,
						"name": "genericDialog",
						"fields": [
						  {
							"list1": {
							  "items": [
								{
								  "keyName": "name",
								  "keyValue_en": "name",
								  "keyValue_es": "name"
								}
							  ],
							  "label_en": "Variable",
							  "label_es": "Variables",
							  "optional": true,
							  "addBlankValueOnTop": true,
							  "addBlankValueAtBottom": false,
							  "valuesFromMasterData": {
								"elementName": "list4",
								"propertyNameContainer": "variables",
								"propertyNameContainerLevelPropertyKeyName": "name",
								"propertyKeyName": "name",
								"propertyKeyValueEn": "name",
								"propertyKeyValueEs": "name"
							  }
							}
						  }
						]
					  }
					},
					{
					  "actionName": "STUDY_INDIVIDUAL_DEACTIVATE",
					  "requiresDialog": false,
					  "certificationException": true,
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "selObjectPropertyName": "study"
						},
						{
						  "argumentName": "individualId",
						  "selObjectPropertyName": "individual_id"
						}
					  ],
					  "button": {
						"icon": "refresh",
						"title": {
						  "label_en": "Deactivate",
						  "label_es": "Desactivar"
						},
						"requiresObjectSelected": true
					  }
					},
					{
					  "actionName": "STUDY_INDIVIDUAL_ACTIVATE",
					  "clientMethod": "openReactivateObjectDialog",
					  "notGetViewData": true,
					  "requiresDialog": true,
					  "certificationException": true,
					  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "internalVariableSimpleObjName": "selectedItem",
						  "internalVariableSimpleObjProperty": "name"
						},
						{
						  "argumentName": "individualId",
						  "selObjectPropertyName": "individual_id"
						}
					  ],
					  "button": {
						"icon": "toggle_on",
						"title": {
						  "label_en": "Reactivate",
						  "label_es": "Reactivar"
						},
						"requiresGridItemSelected": false
					  },
					  "dialogInfo": {
						"name": "reactivateObjectDialog",
						"fieldsObject": {
						  "queryNumDays": {
							"label_en": "Number of Days",
							"label_es": "Número de Días"
						  },
						  "objectName": {
							"label_en": "Individual to reactivate",
							"label_es": "Individuo a Reactivar"
						  }
						},
						"listDefinition": {
						  "keyFldName": "individual_id",
						  "eachEntryTextGenerator": [
							{
							  "value": "Name: ",
							  "type": "fix"
							},
							{
							  "value": "individual_name",
							  "type": "field"
							}
						  ]
						},
						"viewQuery": {
						  "actionName": "DEACTIVATED_STUDY_INDIVIDUALS_LAST_N_DAYS",
						  "clientMethod": "getDeactivatedObjects",
						  "endPointParams": [
							{
							  "query": "numDays",
							  "element": "queryNumDays",
							  "defaultValue": 7
							},
							{
							  "argumentName": "studyName",
							  "internalVariableSimpleObjName": "selectedItem",
							  "internalVariableSimpleObjProperty": "name"
							}
						  ]
						}
					  }
					},
					{
					  "actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
					  "requiresDialog": true,
					  "certificationException": true,
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
						"requiresGridItemSelected": true,
						"hideWhenSelectedItem": {
						  "column": "total_params",
						  "value": 0
						}
					  },
					  "resultHeader": {
						"id": {
						  "label_en": "Id",
						  "label_es": "Id",
						  "width": "10%"
						},
						"name": {
						  "label_en": "Parameter",
						  "label_es": "Parámetro"
						},
						"value": {
						  "label_en": "Value",
						  "label_es": "Valor"
						}
					  },
					  "resultHeaderObjectLabelTopLeft": {
						"label_en": "Instrument Event:",
						"label_es": "Evento de Instrumento :"
					  },
					  "dialogInfo": {
						"name": "resultDialog",
						"keyFldName": "id",
						"subQueryName": "getParams",
						"viewQuery": {
						  "actionName": "STUDY_VARIABLES_LIST",
						  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIqueries",
						  "endPointParams": [
							{
							  "argumentName": "studyName",
							  "internalVariableSimpleObjName": "selectedItem",
							  "internalVariableSimpleObjProperty": "name"
							},
							{
							  "argumentName": "ownerTable",
							  "value": "study_individual"
							},
							{
							  "argumentName": "ownerId",
							  "selObjectPropertyName": "individual_id"
							}
						  ]
						},
						"automatic": true,
						"action": [
						  {
							"actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
							"notGetViewData": true,
							"requiresDialog": false,
							"clientMethod": "enterEventResult",
							"endPointParams": [
							  {
								"argumentName": "studyName",
								"internalVariableSimpleObjName": "selectedItem",
								"internalVariableSimpleObjProperty": "name"
							  },
							  {
								"argumentName": "variableName",
								"getFromGrid": true,
								"selObjectPropertyName": "name"
							  },
							  {
								"argumentName": "ownerTable",
								"getFromGrid": true,
								"selObjectPropertyName": "owner_table"
							  },
							  {
								"argumentName": "ownerId",
								"getFromGrid": true,
								"selObjectPropertyName": "owner_id"
							  },
							  {
								"argumentName": "variableId",
								"getFromGrid": true,
								"selObjectPropertyName": "id"
							  },
							  {
								"argumentName": "newValue",
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
					  "actionName": "OPEN_INDIVIDUAL_CONSENT",
					  "requiresDialog": true,
					  "button": {
						"icon": "attach_file",
						"title": {
						  "label_en": "Open",
						  "label_es": "Abrir"
						},
						"requiresGridItemSelected": false
					  },
					  "dialogInfo": {
						"name": "genericDialog",
						"filesListContent": true,
						"dialogQuery": {
						  "actionName": "GET_INDIVIDUAL_CONSENT_FILE",
						  "variableForData": "",
						  "endPointParams": [
							{
							  "argumentName": "studyName",
							  "internalVariableSimpleObjName": "selectedItem",
							  "internalVariableSimpleObjProperty": "name"
							},
							{
							  "argumentName": "individualId",
							  "internalVariableObjName": "selectedItems",
							  "internalVariableObjProperty": "individual_id"
							}
						  ]
						}
					  }
					}
				  ],
				  "children": "study_individual_sample",
				  "children_definition": {
					"title": {
					  "label_en": "Individuals",
					  "label_es": "Individuos"
					},
					"columns": [
					  {
						"name": "sample_id",
						"label_en": "Sample ID",
						"label_es": "ID Muestra"
					  },
					  {
						"name": "individual_name",
						"label_en": "Individual name",
						"label_es": "Nombre persona"
					  },
					  {
						"name": "created_by",
						"label_en": "Created by",
						"label_es": "Creado por"
					  },
					  {
						"name": "created_on",
						"label_en": "Created On",
						"label_es": "Creado en"
					  }
					],
					"row_buttons": [
					  {
						"actionName": "STUDY_FAMILY_REMOVE_INDIVIDUAL",
						"notGetViewData": true,
						"requiresDialog": false,
						"certificationException": true,
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  },
						  {
							"argumentName": "familyName",
							"parentElementProperty": "name"
						  },
						  {
							"argumentName": "individualId",
							"selObjectPropertyName": "individual_id"
						  }
						],
						"button": {
						  "icon": "remove",
						  "title": {
							"label_en": "Unlink from family",
							"label_es": "Quitar de la familia"
						  },
						  "requiresGridItemSelected": true
						}
					  },
					  {
						"actionName": "ADD_VARIABLE_SET_TO_STUDY_OBJECT",
						"requiresDialog": true,
						"certificationException": true,
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  },
						  {
							"argumentName": "ownerTable",
							"value": "study_individual_sample"
						  },
						  {
							"argumentName": "ownerId",
							"selObjectPropertyName": "sample_id"
						  },
						  {
							"argumentName": "variableSetName",
							"element": "list1"
						  }
						],
						"button": {
						  "icon": "refresh",
						  "title": {
							"label_en": "Add Variable Set",
							"label_es": "Añadir Conjunto de Variables"
						  },
						  "requiresObjectSelected": false
						},
						"dialogInfo": {
						  "requiresDialog": true,
						  "name": "genericDialog",
						  "fields": [
							{
							  "list1": {
								"items": [
								  {
									"keyName": "name",
									"keyValue_en": "name",
									"keyValue_es": "name"
								  }
								],
								"label_en": "Variable Set",
								"label_es": "Grupo de variables",
								"optional": true,
								"addBlankValueOnTop": true,
								"addBlankValueAtBottom": false,
								"valuesFromMasterData": {
								  "elementName": "list4",
								  "propertyNameContainer": "variables_set",
								  "propertyNameContainerLevelPropertyKeyName": "name",
								  "propertyKeyName": "name",
								  "propertyKeyValueEn": "name",
								  "propertyKeyValueEs": "name"
								}
							  }
							}
						  ]
						}
					  },
					  {
						"actionName": "ADD_VARIABLE_TO_STUDY_OBJECT",
						"requiresDialog": true,
						"certificationException": true,
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  },
						  {
							"argumentName": "ownerTable",
							"value": "study_individual_sample"
						  },
						  {
							"argumentName": "ownerId",
							"selObjectPropertyName": "sample_id"
						  },
						  {
							"argumentName": "variableName",
							"element": "list1"
						  }
						],
						"button": {
						  "icon": "refresh",
						  "title": {
							"label_en": "Add Variable",
							"label_es": "Añadir Variable"
						  },
						  "requiresObjectSelected": false
						},
						"dialogInfo": {
						  "requiresDialog": true,
						  "name": "genericDialog",
						  "fields": [
							{
							  "list1": {
								"items": [
								  {
									"keyName": "name",
									"keyValue_en": "name",
									"keyValue_es": "name"
								  }
								],
								"label_en": "Variables",
								"label_es": "Variables",
								"optional": true,
								"addBlankValueOnTop": true,
								"addBlankValueAtBottom": false,
								"valuesFromMasterData": {
								  "elementName": "list4",
								  "propertyNameContainer": "variables",
								  "propertyNameContainerLevelPropertyKeyName": "name",
								  "propertyKeyName": "name",
								  "propertyKeyValueEn": "name",
								  "propertyKeyValueEs": "name"
								}
							  }
							}
						  ]
						}
					  },
					  {
						"actionName": "STUDY_INDIVIDUAL_SAMPLE_DEACTIVATE",
						"certificationException": true,
						"requiresDialog": false,
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"selObjectPropertyName": "study"
						  },
						  {
							"argumentName": "sampleId",
							"selObjectPropertyName": "sample_id"
						  },
						  {
							"argumentName": "individualId",
							"selObjectPropertyName": "individual_id"
						  }
						],
						"button": {
						  "icon": "refresh",
						  "title": {
							"label_en": "Deactivate",
							"label_es": "Desactivar"
						  },
						  "requiresObjectSelected": true
						}
					  },
					  {
						"actionName": "STUDY_INDIVIDUAL_SAMPLE_ACTIVATE",
						"clientMethod": "openReactivateObjectDialog",
						"notGetViewData": true,
						"requiresDialog": true,
						"certificationException": true,
						"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  },
						  {
							"argumentName": "sampleId",
							"selObjectPropertyName": "sample_id"
						  }
						],
						"button": {
						  "icon": "toggle_on",
						  "title": {
							"label_en": "Reactivate",
							"label_es": "Reactivar"
						  },
						  "requiresGridItemSelected": false
						},
						"dialogInfo": {
						  "name": "reactivateObjectDialog",
						  "fieldsObject": {
							"queryNumDays": {
							  "label_en": "Number of Days",
							  "label_es": "Número de Días"
							},
							"objectName": {
							  "label_en": "Sample to reactivate",
							  "label_es": "Muestra a Reactivar"
							}
						  },
						  "listDefinition": {
							"keyFldName": "sample_id",
							"eachEntryTextGenerator": [
							  {
								"value": "Sample: ",
								"type": "fix"
							  },
							  {
								"value": "sample_id",
								"type": "field"
							  }
							]
						  },
						  "viewQuery": {
							"actionName": "DEACTIVATED_STUDY_INDIVIDUAL_SAMPLES_LAST_N_DAYS",
							"clientMethod": "getDeactivatedObjects",
							"endPointParams": [
							  {
								"query": "numDays",
								"element": "queryNumDays",
								"defaultValue": 7
							  },
							  {
								"argumentName": "studyName",
								"internalVariableSimpleObjName": "selectedItem",
								"internalVariableSimpleObjProperty": "name"
							  }
							]
						  }
						}
					  }
					],
					"children": "study_variable_values",
					"children_definition": {
					  "title": {
						"label_en": "Sample results",
						"label_es": "Resultados de muestra"
					  },
					  "columns": [
						{
						  "name": "id",
						  "label_en": "Id",
						  "label_es": "Id"
						},
						{
						  "name": "sample",
						  "label_en": "Sample",
						  "label_es": "Muestra"
						}
					  ],
					  "row_buttons": [
						{
						  "actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
						  "requiresDialog": true,
						  "certificationException": true,
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
							"requiresGridItemSelected": true,
							"hideWhenSelectedItem": {
							  "column": "total_params",
							  "value": 0
							}
						  },
						  "resultHeader": {
							"id": {
							  "label_en": "Id",
							  "label_es": "Id",
							  "width": "10%"
							},
							"name": {
							  "label_en": "Parameter",
							  "label_es": "Parámetro"
							},
							"value": {
							  "label_en": "Value",
							  "label_es": "Valor"
							}
						  },
						  "resultHeaderObjectLabelTopLeft": {
							"label_en": "Instrument Event:",
							"label_es": "Evento de Instrumento :"
						  },
						  "dialogInfo": {
							"name": "resultDialog",
							"keyFldName": "id",
							"subQueryName": "getParams",
							"viewQuery": {
							  "actionName": "STUDY_VARIABLES_LIST",
							  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIqueries",
							  "endPointParams": [
								{
								  "argumentName": "studyName",
								  "internalVariableSimpleObjName": "selectedItem",
								  "internalVariableSimpleObjProperty": "name"
								},
								{
								  "argumentName": "variableId",
								  "selObjectPropertyName": "id"
								}
							  ]
							},
							"automatic": true,
							"action": [
							  {
								"actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
								"notGetViewData": true,
								"requiresDialog": false,
								"clientMethod": "enterEventResult",
								"endPointParams": [
								  {
									"argumentName": "studyName",
									"internalVariableSimpleObjName": "selectedItem",
									"internalVariableSimpleObjProperty": "name"
								  },
								  {
									"argumentName": "variableName",
									"selObjectPropertyName": "name"
								  },
								  {
									"argumentName": "ownerTable",
									"selObjectPropertyName": "owner_table"
								  },
								  {
									"argumentName": "ownerId",
									"selObjectPropertyName": "owner_id"
								  },
								  {
									"argumentName": "newValue",
									"targetValue": true
								  }
								]
							  }
							]
						  }
						}
					  ]
					}
				  }
				}
			  }
			]
		  },
		  {
			"tabLabel_en": "Cohorts",
			"tabLabel_es": "Cohortes",
			"view": "studycohort",
			"view_definition": [
			  {
				"type": "parentReadOnlyTable",
				"endPointPropertyArray": [
				  "study_cohort"
				],
				"columns": [
				  {
					"name": "name",
					"label_en": "Cohort",
					"label_es": "Cohorte"
				  },
				  {
					"name": "active",
					"label_en": "Active",
					"label_es": "Activo",
					"is_icon": true
				  },
				  {
					"name": "description",
					"label_en": "Description",
					"label_es": "Descripción"
				  },
				  {
					"name": "created_by",
					"label_en": "Created By",
					"label_es": "Creado por"
				  },
				  {
					"name": "individual_name",
					"label_en": "Individual name",
					"label_es": "Nombre individual"
				  },
				  {
					"name": "individual_id",
					"label_en": "Individual ID",
					"label_es": "Valor individual"
				  }
				],
				"actions": [
				  {
					"actionName": "STUDY_CREATE_COHORT",
					"notGetViewData": true,
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "cohortName",
						"element": "text1"
					  }
					],
					"button": {
					  "icon": "person_add",
					  "title": {
						"label_en": "New study cohort",
						"label_es": "Nuevo cohorte de estudio"
					  },
					  "requiresGridItemSelected": false
					},
					"dialogInfo": {
					  "name": "genericDialog",
					  "fields": [
						{
						  "text1": {
							"label_en": "New cohort Name",
							"label_es": "Nombre Nuevo cohort"
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "STUDY_COHORT_ACTIVATE",
					"clientMethod": "openReactivateObjectDialog",
					"notGetViewData": true,
					"requiresDialog": true,
					"certificationException": true,
					"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "cohortName",
						"selObjectPropertyName": "name"
					  }
					],
					"button": {
					  "icon": "toggle_on",
					  "title": {
						"label_en": "Reactivate",
						"label_es": "Reactivar"
					  },
					  "requiresGridItemSelected": false
					},
					"dialogInfo": {
					  "name": "reactivateObjectDialog",
					  "fieldsObject": {
						"queryNumDays": {
						  "label_en": "Number of Days",
						  "label_es": "Número de Días"
						},
						"objectName": {
						  "label_en": "Cohort to reactivate",
						  "label_es": "Cohorte a Reactivar"
						}
					  },
					  "listDefinition": {
						"keyFldName": "name",
						"eachEntryTextGenerator": [
						  {
							"value": "Name: ",
							"type": "fix"
						  },
						  {
							"value": "name",
							"type": "field"
						  }
						]
					  },
					  "viewQuery": {
						"actionName": "DEACTIVATED_STUDY_COHORTS_LAST_N_DAYS",
						"clientMethod": "getDeactivatedObjects",
						"endPointParams": [
						  {
							"query": "numDays",
							"element": "queryNumDays",
							"defaultValue": 7
						  },
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  }
						]
					  }
					}
				  }
				],
				"row_buttons": [
				  {
					"actionName": "STUDY_COHORT_DEACTIVATE",
					"notGetViewData": true,
					"requiresDialog": false,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "cohortName",
						"selObjectPropertyName": "name"
					  }
					],
					"button": {
					  "icon": "toggle_off",
					  "title": {
						"label_en": "Deactivate",
						"label_es": "Desactivar"
					  },
					  "requiresGridItemSelected": true
					}
				  },
				  {
					"actionName": "STUDY_COHORT_ADD_INDIVIDUAL",
					"notGetViewData": true,
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "cohortName",
						"selObjectPropertyName": "name"
					  },
					  {
						"argumentName": "individualsList",
						"element": "list1"
					  }
					],
					"button": {
					  "icon": "add",
					  "title": {
						"label_en": "Add Individual",
						"label_es": "Añadir Individuo"
					  },
					  "requiresGridItemSelected": true
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericDialog",
					  "fields": [
						{
						  "list1": {
							"label_en": "Indvidual Id to Add",
							"label_es": "Individuo a añadir",
							"addBlankValueOnTop": true,
							"addBlankValueAtBottom": false,
							"valuesFromSelectedItem": {
							  "internalVariableSingleObjName": "selectedItem",
							  "internalVariableSingleObjProperty": "study_individual",
							  "propertyKeyName": "individual_id",
							  "propertyKeyValueEn": [
								"individual_name"
							  ],
							  "propertyKeyValueEs": [
								"individual_name"
							  ]
							}
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "ADD_VARIABLE_SET_TO_STUDY_OBJECT",
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "ownerTable",
						"value": "study_cohort"
					  },
					  {
						"argumentName": "ownerId",
						"selObjectPropertyName": "name"
					  },
					  {
						"argumentName": "variableSetName",
						"element": "list1"
					  }
					],
					"button": {
					  "icon": "refresh",
					  "title": {
						"label_en": "Add Variable Set",
						"label_es": "Añadir Conjunto de Variables"
					  },
					  "requiresObjectSelected": false
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericDialog",
					  "fields": [
						{
						  "list1": {
							"items": [
							  {
								"keyName": "name",
								"keyValue_en": "name",
								"keyValue_es": "name"
							  }
							],
							"label_en": "Variable Set",
							"label_es": "Grupo de variables",
							"optional": true,
							"addBlankValueOnTop": true,
							"addBlankValueAtBottom": false,
							"valuesFromMasterData": {
							  "elementName": "list4",
							  "propertyNameContainer": "variables_set",
							  "propertyNameContainerLevelPropertyKeyName": "name",
							  "propertyKeyName": "name",
							  "propertyKeyValueEn": "name",
							  "propertyKeyValueEs": "name"
							}
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "ADD_VARIABLE_TO_STUDY_OBJECT",
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "ownerTable",
						"value": "study_cohort"
					  },
					  {
						"argumentName": "ownerId",
						"selObjectPropertyName": "name"
					  },
					  {
						"argumentName": "variableName",
						"element": "list1"
					  }
					],
					"button": {
					  "icon": "refresh",
					  "title": {
						"label_en": "Add Variable",
						"label_es": "Añadir Variable"
					  },
					  "requiresObjectSelected": false
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericDialog",
					  "fields": [
						{
						  "list1": {
							"items": [
							  {
								"keyName": "name",
								"keyValue_en": "name",
								"keyValue_es": "name"
							  }
							],
							"label_en": "Variables",
							"label_es": "Variables",
							"optional": true,
							"addBlankValueOnTop": true,
							"addBlankValueAtBottom": false,
							"valuesFromMasterData": {
							  "elementName": "list4",
							  "propertyNameContainer": "variables",
							  "propertyNameContainerLevelPropertyKeyName": "name",
							  "propertyKeyName": "name",
							  "propertyKeyValueEn": "name",
							  "propertyKeyValueEs": "name"
							}
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
					"requiresDialog": true,
					"certificationException": true,
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
					  "requiresGridItemSelected": true,
					  "hideWhenSelectedItem": {
						"column": "total_params",
						"value": 0
					  }
					},
					"resultHeader": {
					  "id": {
						"label_en": "Id",
						"label_es": "Id",
						"width": "10%"
					  },
					  "name": {
						"label_en": "Parameter",
						"label_es": "Parámetro"
					  },
					  "value": {
						"label_en": "Value",
						"label_es": "Valor"
					  }
					},
					"resultHeaderObjectLabelTopLeft": {
					  "label_en": "Instrument Event:",
					  "label_es": "Evento de Instrumento :"
					},
					"dialogInfo": {
					  "name": "resultDialog",
					  "keyFldName": "id",
					  "subQueryName": "getParams",
					  "viewQuery": {
						"actionName": "STUDY_VARIABLES_LIST",
						"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIqueries",
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  },
						  {
							"argumentName": "ownerTable",
							"value": "study_cohort"
						  },
						  {
							"argumentName": "ownerId",
							"selObjectPropertyName": "name"
						  }
						]
					  },
					  "automatic": true,
					  "action": [
						{
						  "actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
						  "notGetViewData": true,
						  "requiresDialog": false,
						  "clientMethod": "enterEventResult",
						  "endPointParams": [
							{
							  "argumentName": "studyName",
							  "internalVariableSimpleObjName": "selectedItem",
							  "internalVariableSimpleObjProperty": "name"
							},
							{
							  "argumentName": "variableName",
							  "getFromGrid": true,
							  "selObjectPropertyName": "name"
							},
							{
							  "argumentName": "ownerTable",
							  "getFromGrid": true,
							  "selObjectPropertyName": "owner_table"
							},
							{
							  "argumentName": "ownerId",
							  "getFromGrid": true,
							  "selObjectPropertyName": "owner_id"
							},
							{
							  "argumentName": "variableId",
							  "getFromGrid": true,
							  "selObjectPropertyName": "id"
							},
							{
							  "argumentName": "newValue",
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
				  }
				],
				"children": "study_individual",
				"children_definition": {
				  "title": {
					"label_en": "Individuals",
					"label_es": "Individuos"
				  },
				  "columns": [
					{
					  "name": "individual_id",
					  "label_en": "Individual ID",
					  "label_es": "ID persona"
					},
					{
					  "name": "individual_name",
					  "label_en": "Individual name",
					  "label_es": "Nombre persona"
					},
					{
					  "name": "created_by",
					  "label_en": "Created by",
					  "label_es": "Creado por"
					},
					{
					  "name": "created_on",
					  "label_en": "Created On",
					  "label_es": "Creado en"
					}
				  ],
				  "row_buttons": [
					{
					  "actionName": "STUDY_COHORT_REMOVE_INDIVIDUAL",
					  "notGetViewData": true,
					  "requiresDialog": false,
					  "certificationException": true,
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "internalVariableSimpleObjName": "selectedItem",
						  "internalVariableSimpleObjProperty": "name"
						},
						{
						  "argumentName": "cohortName",
						  "parentElementProperty": "name"
						},
						{
						  "argumentName": "individualId",
						  "selObjectPropertyName": "individual_id"
						}
					  ],
					  "button": {
						"icon": "remove",
						"title": {
						  "label_en": "Unlink from cohort",
						  "label_es": "Quitar del cohorte"
						},
						"requiresGridItemSelected": true
					  }
					},
					{
					  "actionName": "ADD_VARIABLE_SET_TO_STUDY_OBJECT",
					  "requiresDialog": true,
					  "certificationException": true,
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "internalVariableSimpleObjName": "selectedItem",
						  "internalVariableSimpleObjProperty": "name"
						},
						{
						  "argumentName": "ownerTable",
						  "value": "study_individual"
						},
						{
						  "argumentName": "ownerId",
						  "selObjectPropertyName": "individual_id"
						},
						{
						  "argumentName": "variableSetName",
						  "element": "list1"
						}
					  ],
					  "button": {
						"icon": "refresh",
						"title": {
						  "label_en": "Add Variable Set",
						  "label_es": "Añadir Conjunto de Variables"
						},
						"requiresObjectSelected": false
					  },
					  "dialogInfo": {
						"requiresDialog": true,
						"name": "genericDialog",
						"fields": [
						  {
							"list1": {
							  "items": [
								{
								  "keyName": "name",
								  "keyValue_en": "name",
								  "keyValue_es": "name"
								}
							  ],
							  "label_en": "Variable Set",
							  "label_es": "Grupo de variables",
							  "optional": true,
							  "addBlankValueOnTop": true,
							  "addBlankValueAtBottom": false,
							  "valuesFromMasterData": {
								"elementName": "list4",
								"propertyNameContainer": "variables_set",
								"propertyNameContainerLevelPropertyKeyName": "name",
								"propertyKeyName": "name",
								"propertyKeyValueEn": "name",
								"propertyKeyValueEs": "name"
							  }
							}
						  }
						]
					  }
					},
					{
					  "actionName": "ADD_VARIABLE_TO_STUDY_OBJECT",
					  "requiresDialog": true,
					  "certificationException": true,
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "internalVariableSimpleObjName": "selectedItem",
						  "internalVariableSimpleObjProperty": "name"
						},
						{
						  "argumentName": "ownerTable",
						  "value": "study_individual"
						},
						{
						  "argumentName": "ownerId",
						  "selObjectPropertyName": "individual_id"
						},
						{
						  "argumentName": "variableName",
						  "element": "list1"
						}
					  ],
					  "button": {
						"icon": "refresh",
						"title": {
						  "label_en": "Add Variable",
						  "label_es": "Añadir Variable"
						},
						"requiresObjectSelected": false
					  },
					  "dialogInfo": {
						"requiresDialog": true,
						"name": "genericDialog",
						"fields": [
						  {
							"list1": {
							  "items": [
								{
								  "keyName": "name",
								  "keyValue_en": "name",
								  "keyValue_es": "name"
								}
							  ],
							  "label_en": "Variables",
							  "label_es": "Variables",
							  "optional": true,
							  "addBlankValueOnTop": true,
							  "addBlankValueAtBottom": false,
							  "valuesFromMasterData": {
								"elementName": "list4",
								"propertyNameContainer": "variables",
								"propertyNameContainerLevelPropertyKeyName": "name",
								"propertyKeyName": "name",
								"propertyKeyValueEn": "name",
								"propertyKeyValueEs": "name"
							  }
							}
						  }
						]
					  }
					},
					{
					  "actionName": "STUDY_INDIVIDUAL_DEACTIVATE",
					  "certificationException": true,
					  "requiresDialog": false,
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "selObjectPropertyName": "study"
						},
						{
						  "argumentName": "individualId",
						  "selObjectPropertyName": "individual_id"
						}
					  ],
					  "button": {
						"icon": "refresh",
						"title": {
						  "label_en": "Deactivate",
						  "label_es": "Desactivar"
						},
						"requiresObjectSelected": true
					  }
					},
					{
					  "actionName": "STUDY_INDIVIDUAL_ACTIVATE",
					  "clientMethod": "openReactivateObjectDialog",
					  "notGetViewData": true,
					  "requiresDialog": true,
					  "certificationException": true,
					  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "internalVariableSimpleObjName": "selectedItem",
						  "internalVariableSimpleObjProperty": "name"
						},
						{
						  "argumentName": "individualId",
						  "selObjectPropertyName": "individual_id"
						}
					  ],
					  "button": {
						"icon": "toggle_on",
						"title": {
						  "label_en": "Reactivate",
						  "label_es": "Reactivar"
						},
						"requiresGridItemSelected": false
					  },
					  "dialogInfo": {
						"name": "reactivateObjectDialog",
						"fieldsObject": {
						  "queryNumDays": {
							"label_en": "Number of Days",
							"label_es": "Número de Días"
						  },
						  "objectName": {
							"label_en": "Individual to reactivate",
							"label_es": "Individuo a Reactivar"
						  }
						},
						"listDefinition": {
						  "keyFldName": "individual_id",
						  "eachEntryTextGenerator": [
							{
							  "value": "Name: ",
							  "type": "fix"
							},
							{
							  "value": "individual_name",
							  "type": "field"
							}
						  ]
						},
						"viewQuery": {
						  "actionName": "DEACTIVATED_STUDY_INDIVIDUALS_LAST_N_DAYS",
						  "clientMethod": "getDeactivatedObjects",
						  "endPointParams": [
							{
							  "query": "numDays",
							  "element": "queryNumDays",
							  "defaultValue": 7
							},
							{
							  "argumentName": "studyName",
							  "internalVariableSimpleObjName": "selectedItem",
							  "internalVariableSimpleObjProperty": "name"
							}
						  ]
						}
					  }
					},
					{
					  "actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
					  "requiresDialog": true,
					  "certificationException": true,
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
						"requiresGridItemSelected": true,
						"hideWhenSelectedItem": {
						  "column": "total_params",
						  "value": 0
						}
					  },
					  "resultHeader": {
						"id": {
						  "label_en": "Id",
						  "label_es": "Id",
						  "width": "10%"
						},
						"name": {
						  "label_en": "Parameter",
						  "label_es": "Parámetro"
						},
						"value": {
						  "label_en": "Value",
						  "label_es": "Valor"
						}
					  },
					  "resultHeaderObjectLabelTopLeft": {
						"label_en": "Instrument Event:",
						"label_es": "Evento de Instrumento :"
					  },
					  "dialogInfo": {
						"name": "resultDialog",
						"keyFldName": "id",
						"subQueryName": "getParams",
						"viewQuery": {
						  "actionName": "STUDY_VARIABLES_LIST",
						  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIqueries",
						  "endPointParams": [
							{
							  "argumentName": "studyName",
							  "internalVariableSimpleObjName": "selectedItem",
							  "internalVariableSimpleObjProperty": "name"
							},
							{
							  "argumentName": "ownerTable",
							  "value": "study_individual"
							},
							{
							  "argumentName": "ownerId",
							  "selObjectPropertyName": "individual_id"
							}
						  ]
						},
						"automatic": true,
						"action": [
						  {
							"actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
							"notGetViewData": true,
							"requiresDialog": false,
							"clientMethod": "enterEventResult",
							"endPointParams": [
							  {
								"argumentName": "studyName",
								"internalVariableSimpleObjName": "selectedItem",
								"internalVariableSimpleObjProperty": "name"
							  },
							  {
								"argumentName": "variableName",
								"getFromGrid": true,
								"selObjectPropertyName": "name"
							  },
							  {
								"argumentName": "ownerTable",
								"getFromGrid": true,
								"selObjectPropertyName": "owner_table"
							  },
							  {
								"argumentName": "ownerId",
								"getFromGrid": true,
								"selObjectPropertyName": "owner_id"
							  },
							  {
								"argumentName": "variableId",
								"getFromGrid": true,
								"selObjectPropertyName": "id"
							  },
							  {
								"argumentName": "newValue",
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
					  "actionName": "OPEN_INDIVIDUAL_CONSENT",
					  "requiresDialog": true,
					  "button": {
						"icon": "attach_file",
						"title": {
						  "label_en": "Open",
						  "label_es": "Abrir"
						},
						"requiresGridItemSelected": false
					  },
					  "dialogInfo": {
						"name": "genericDialog",
						"filesListContent": true,
						"dialogQuery": {
						  "actionName": "GET_INDIVIDUAL_CONSENT_FILE",
						  "variableForData": "",
						  "endPointParams": [
							{
							  "argumentName": "studyName",
							  "internalVariableSimpleObjName": "selectedItem",
							  "internalVariableSimpleObjProperty": "name"
							},
							{
							  "argumentName": "individualId",
							  "internalVariableObjName": "selectedItems",
							  "internalVariableObjProperty": "individual_id"
							}
						  ]
						}
					  }
					}
				  ],
				  "children": "study_individual_sample",
				  "children_definition": {
					"title": {
					  "label_en": "Individual Samples",
					  "label_es": "Muestras del Individuo"
					},
					"columns": [
					  {
						"name": "sample_id",
						"label_en": "Sample ID",
						"label_es": "ID Muestra"
					  },
					  {
						"name": "individual_name",
						"label_en": "Individual name",
						"label_es": "Nombre persona"
					  },
					  {
						"name": "created_by",
						"label_en": "Created by",
						"label_es": "Creado por"
					  },
					  {
						"name": "created_on",
						"label_en": "Created On",
						"label_es": "Creado en"
					  }
					],
					"row_buttons": [
					  {
						"actionName": "STUDY_FAMILY_REMOVE_INDIVIDUAL",
						"notGetViewData": true,
						"requiresDialog": false,
						"certificationException": true,
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  },
						  {
							"argumentName": "familyName",
							"parentElementProperty": "name"
						  },
						  {
							"argumentName": "individualId",
							"selObjectPropertyName": "individual_id"
						  }
						],
						"button": {
						  "icon": "remove",
						  "title": {
							"label_en": "Unlink from family",
							"label_es": "Quitar de la familia"
						  },
						  "requiresGridItemSelected": true
						}
					  },
					  {
						"actionName": "ADD_VARIABLE_SET_TO_STUDY_OBJECT",
						"requiresDialog": true,
						"certificationException": true,
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  },
						  {
							"argumentName": "ownerTable",
							"value": "study_individual_sample"
						  },
						  {
							"argumentName": "ownerId",
							"selObjectPropertyName": "sample_id"
						  },
						  {
							"argumentName": "variableSetName",
							"element": "list1"
						  }
						],
						"button": {
						  "icon": "refresh",
						  "title": {
							"label_en": "Add Variable Set",
							"label_es": "Añadir Conjunto de Variables"
						  },
						  "requiresObjectSelected": false
						},
						"dialogInfo": {
						  "requiresDialog": true,
						  "name": "genericDialog",
						  "fields": [
							{
							  "list1": {
								"items": [
								  {
									"keyName": "name",
									"keyValue_en": "name",
									"keyValue_es": "name"
								  }
								],
								"label_en": "Variable Set",
								"label_es": "Grupo de variables",
								"optional": true,
								"addBlankValueOnTop": true,
								"addBlankValueAtBottom": false,
								"valuesFromMasterData": {
								  "elementName": "list4",
								  "propertyNameContainer": "variables_set",
								  "propertyNameContainerLevelPropertyKeyName": "name",
								  "propertyKeyName": "name",
								  "propertyKeyValueEn": "name",
								  "propertyKeyValueEs": "name"
								}
							  }
							}
						  ]
						}
					  },
					  {
						"actionName": "ADD_VARIABLE_TO_STUDY_OBJECT",
						"requiresDialog": true,
						"certificationException": true,
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  },
						  {
							"argumentName": "ownerTable",
							"value": "study_individual_sample"
						  },
						  {
							"argumentName": "ownerId",
							"selObjectPropertyName": "sample_id"
						  },
						  {
							"argumentName": "variableName",
							"element": "list1"
						  }
						],
						"button": {
						  "icon": "refresh",
						  "title": {
							"label_en": "Add Variable",
							"label_es": "Añadir Variable"
						  },
						  "requiresObjectSelected": false
						},
						"dialogInfo": {
						  "requiresDialog": true,
						  "name": "genericDialog",
						  "fields": [
							{
							  "list1": {
								"items": [
								  {
									"keyName": "name",
									"keyValue_en": "name",
									"keyValue_es": "name"
								  }
								],
								"label_en": "Variables",
								"label_es": "Variables",
								"optional": true,
								"addBlankValueOnTop": true,
								"addBlankValueAtBottom": false,
								"valuesFromMasterData": {
								  "elementName": "list4",
								  "propertyNameContainer": "variables",
								  "propertyNameContainerLevelPropertyKeyName": "name",
								  "propertyKeyName": "name",
								  "propertyKeyValueEn": "name",
								  "propertyKeyValueEs": "name"
								}
							  }
							}
						  ]
						}
					  },
					  {
						"actionName": "STUDY_INDIVIDUAL_SAMPLE_DEACTIVATE",
						"certificationException": true,
						"requiresDialog": false,
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"selObjectPropertyName": "study"
						  },
						  {
							"argumentName": "sampleId",
							"selObjectPropertyName": "sample_id"
						  },
						  {
							"argumentName": "individualId",
							"selObjectPropertyName": "individual_id"
						  }
						],
						"button": {
						  "icon": "refresh",
						  "title": {
							"label_en": "Deactivate",
							"label_es": "Desactivar"
						  },
						  "requiresObjectSelected": true
						}
					  },
					  {
						"actionName": "STUDY_INDIVIDUAL_SAMPLE_ACTIVATE",
						"certificationException": true,
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"selObjectPropertyName": "study"
						  },
						  {
							"argumentName": "sampleId",
							"selObjectPropertyName": "sample_id"
						  }
						],
						"button": {
						  "icon": "alarm_add",
						  "title": {
							"label_en": "Activate",
							"label_es": "Activar"
						  },
						  "requiresObjectSelected": false
						},
						"dialogInfo": {
						  "requiresDialog": true,
						  "name": "reactivateObjectDialog",
						  "selObjectVariableName": "selectedIndiv",
						  "fieldText": {
							"numDays": {
							  "label_en": "Number of Days",
							  "label_es": "Número de Días"
							},
							"objectName": {
							  "label_en": "Sample to reactivate",
							  "label_es": "Muestra a Reactivar"
							}
						  },
						  "listDefinition": {
							"keyFldName": "sample_id",
							"eachEntryTextGenerator": [
							  {
								"value": "Sample: ",
								"type": "fix"
							  },
							  {
								"value": "sample_id",
								"type": "field"
							  }
							]
						  },
						  "action": [
							{
							  "actionName": "DEACTIVATED_STUDY_INDIVIDUAL_SAMPLES_LAST_N_DAYS",
							  "clientMethod": "getDeactivatedObjects",
							  "apiParams": [
								{
								  "query": "numDays",
								  "element": "lotNumDays",
								  "defaultValue": 7
								},
								{
								  "argumentName": "studyName",
								  "selObjectPropertyName": "study"
								}
							  ]
							}
						  ]
						}
					  }
					],
					"children": "study_variable_values",
					"children_definition": {
					  "title": {
						"label_en": "Sample results",
						"label_es": "Resultados de muestra"
					  },
					  "columns": [
						{
						  "name": "id",
						  "label_en": "Id",
						  "label_es": "Id"
						},
						{
						  "name": "sample",
						  "label_en": "Sample",
						  "label_es": "Muestra"
						}
					  ],
					  "row_buttons": [
						{
						  "actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
						  "requiresDialog": true,
						  "certificationException": true,
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
							"requiresGridItemSelected": true,
							"hideWhenSelectedItem": {
							  "column": "total_params",
							  "value": 0
							}
						  },
						  "resultHeader": {
							"id": {
							  "label_en": "Id",
							  "label_es": "Id",
							  "width": "10%"
							},
							"name": {
							  "label_en": "Parameter",
							  "label_es": "Parámetro"
							},
							"value": {
							  "label_en": "Value",
							  "label_es": "Valor"
							}
						  },
						  "resultHeaderObjectLabelTopLeft": {
							"label_en": "Instrument Event:",
							"label_es": "Evento de Instrumento :"
						  },
						  "dialogInfo": {
							"name": "resultDialog",
							"keyFldName": "id",
							"subQueryName": "getParams",
							"viewQuery": {
							  "actionName": "STUDY_VARIABLES_LIST",
							  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIqueries",
							  "endPointParams": [
								{
								  "argumentName": "studyName",
								  "internalVariableSimpleObjName": "selectedItem",
								  "internalVariableSimpleObjProperty": "name"
								},
								{
								  "argumentName": "variableId",
								  "selObjectPropertyName": "id"
								}
							  ]
							},
							"automatic": true,
							"action": [
							  {
								"actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
								"notGetViewData": true,
								"requiresDialog": false,
								"clientMethod": "enterEventResult",
								"endPointParams": [
								  {
									"argumentName": "studyName",
									"internalVariableSimpleObjName": "selectedItem",
									"internalVariableSimpleObjProperty": "name"
								  },
								  {
									"argumentName": "variableName",
									"selObjectPropertyName": "name"
								  },
								  {
									"argumentName": "ownerTable",
									"selObjectPropertyName": "owner_table"
								  },
								  {
									"argumentName": "ownerId",
									"selObjectPropertyName": "owner_id"
								  },
								  {
									"argumentName": "newValue",
									"targetValue": true
								  }
								]
							  }
							]
						  }
						}
					  ]
					}
				  }
				}
			  }
			]
		  },
		  {
			"tabLabel_en": "Samples Set",
			"tabLabel_es": "Muestras Agrupadas",
			"view": "studySamplesSet",
			"view_definition": [
			  {
				"type": "parentReadOnlyTable",
				"endPointPropertyArray": [
				  "study_samples_set"
				],
				"columns": [
				  {
					"name": "name",
					"label_en": "Sample Set",
					"label_es": "Grupo"
				  },
				  {
					"name": "created_by",
					"label_en": "Created by",
					"label_es": "Creado por"
				  },
				  {
					"name": "created_on",
					"label_en": "Created On",
					"label_es": "Creado en"
				  }
				],
				"actions": [
				  {
					"actionName": "STUDY_CREATE_SAMPLES_SET",
					"notGetViewData": true,
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"selObjectPropertyName": "study"
					  },
					  {
						"argumentName": "samplesSetName",
						"element": "text1"
					  }
					],
					"button": {
					  "icon": "person_add",
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
							"label_en": "new Sample set Name",
							"label_es": "Nombre Nuevo Grupo Muestras"
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "STUDY_SAMPLES_SET_ACTIVATE",
					"clientMethod": "openReactivateObjectDialog",
					"notGetViewData": true,
					"requiresDialog": true,
					"certificationException": true,
					"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "samplesSetName",
						"selObjectPropertyName": "name"
					  }
					],
					"button": {
					  "icon": "toggle_on",
					  "title": {
						"label_en": "Reactivate",
						"label_es": "Reactivar"
					  },
					  "requiresGridItemSelected": false
					},
					"dialogInfo": {
					  "name": "reactivateObjectDialog",
					  "fieldsObject": {
						"queryNumDays": {
						  "label_en": "Number of Days",
						  "label_es": "Número de Días"
						},
						"objectName": {
						  "label_en": "Set to reactivate",
						  "label_es": "Grupo a Reactivar"
						}
					  },
					  "listDefinition": {
						"keyFldName": "name",
						"eachEntryTextGenerator": [
						  {
							"value": "Name: ",
							"type": "fix"
						  },
						  {
							"value": "name",
							"type": "field"
						  }
						]
					  },
					  "viewQuery": {
						"actionName": "DEACTIVATED_STUDY_SAMPLES_SETS_LAST_N_DAYS",
						"clientMethod": "getDeactivatedObjects",
						"endPointParams": [
						  {
							"query": "numDays",
							"element": "queryNumDays",
							"defaultValue": 7
						  },
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  }
						]
					  }
					}
				  }
				],
				"row_buttons": [
				  {
					"actionName": "STUDY_SAMPLES_SET_DEACTIVATE",
					"notGetViewData": true,
					"requiresDialog": false,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"selObjectPropertyName": "study"
					  },
					  {
						"argumentName": "samplesSetName",
						"selObjectPropertyName": "name"
					  }
					],
					"button": {
					  "icon": "toggle_off",
					  "title": {
						"label_en": "Deactivate",
						"label_es": "Desactivar"
					  },
					  "requiresGridItemSelected": true
					}
				  },
				  {
					"actionName": "STUDY_SAMPLES_SET_ADD_SAMPLE",
					"notGetViewData": true,
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"selObjectPropertyName": "study"
					  },
					  {
						"argumentName": "samplesSetName",
						"selObjectPropertyName": "name"
					  },
					  {
						"argumentName": "sampleId",
						"element": "list1"
					  }
					],
					"button": {
					  "icon": "playlist_add",
					  "title": {
						"label_en": "Add Extra Sample",
						"label_es": "Añadir Muestra Extra"
					  },
					  "requiresGridItemSelected": true
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericDialog",
					  "fields": [
						{
						  "list1": {
							"label_en": "sample Id to Add",
							"label_es": "Muestra a añadir",
							"addBlankValueOnTop": true,
							"addBlankValueAtBottom": false,
							"valuesFromSelectedItem": {
							  "internalVariableSingleObjName": "selectedItem",
							  "internalVariableSingleObjProperty": "study_individual_sample",
							  "propertyKeyName": "sample_id",
							  "propertyKeyValueEn": [
								"sample_id"
							  ],
							  "propertyKeyValueEs": [
								"sample_id"
							  ]
							}
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "ADD_VARIABLE_SET_TO_STUDY_OBJECT",
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "ownerTable",
						"value": "study_samples_set"
					  },
					  {
						"argumentName": "ownerId",
						"selObjectPropertyName": "name"
					  },
					  {
						"argumentName": "variableSetName",
						"element": "list1"
					  }
					],
					"button": {
					  "icon": "refresh",
					  "title": {
						"label_en": "Add Variable Set",
						"label_es": "Añadir Conjunto de Variables"
					  },
					  "requiresObjectSelected": false
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericDialog",
					  "fields": [
						{
						  "list1": {
							"items": [
							  {
								"keyName": "name",
								"keyValue_en": "name",
								"keyValue_es": "name"
							  }
							],
							"label_en": "Variable Set",
							"label_es": "Grupo de variables",
							"optional": true,
							"addBlankValueOnTop": true,
							"addBlankValueAtBottom": false,
							"valuesFromMasterData": {
							  "elementName": "list4",
							  "propertyNameContainer": "variables_set",
							  "propertyNameContainerLevelPropertyKeyName": "name",
							  "propertyKeyName": "name",
							  "propertyKeyValueEn": "name",
							  "propertyKeyValueEs": "name"
							}
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "ADD_VARIABLE_TO_STUDY_OBJECT",
					"requiresDialog": true,
					"certificationException": true,
					"endPointParams": [
					  {
						"argumentName": "studyName",
						"internalVariableSimpleObjName": "selectedItem",
						"internalVariableSimpleObjProperty": "name"
					  },
					  {
						"argumentName": "ownerTable",
						"value": "study_samples_set"
					  },
					  {
						"argumentName": "ownerId",
						"selObjectPropertyName": "name"
					  },
					  {
						"argumentName": "variableName",
						"element": "list1"
					  }
					],
					"button": {
					  "icon": "refresh",
					  "title": {
						"label_en": "Add Variable",
						"label_es": "Añadir Variable"
					  },
					  "requiresObjectSelected": false
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericDialog",
					  "fields": [
						{
						  "list1": {
							"items": [
							  {
								"keyName": "name",
								"keyValue_en": "name",
								"keyValue_es": "name"
							  }
							],
							"label_en": "Variable Set",
							"label_es": "Grupo de variables",
							"optional": true,
							"addBlankValueOnTop": true,
							"addBlankValueAtBottom": false,
							"valuesFromMasterData": {
							  "elementName": "list4",
							  "propertyNameContainer": "variables",
							  "propertyNameContainerLevelPropertyKeyName": "name",
							  "propertyKeyName": "name",
							  "propertyKeyValueEn": "name",
							  "propertyKeyValueEs": "name"
							}
						  }
						}
					  ]
					}
				  },
				  {
					"actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
					"requiresDialog": true,
					"certificationException": true,
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
					  "requiresGridItemSelected": true,
					  "hideWhenSelectedItem": {
						"column": "total_params",
						"value": 0
					  }
					},
					"resultHeader": {
					  "id": {
						"label_en": "Id",
						"label_es": "Id",
						"width": "10%"
					  },
					  "name": {
						"label_en": "Parameter",
						"label_es": "Parámetro"
					  },
					  "value": {
						"label_en": "Value",
						"label_es": "Valor"
					  }
					},
					"resultHeaderObjectLabelTopLeft": {
					  "label_en": "Instrument Event:",
					  "label_es": "Evento de Instrumento :"
					},
					"dialogInfo": {
					  "name": "resultDialog",
					  "keyFldName": "id",
					  "subQueryName": "getParams",
					  "viewQuery": {
						"actionName": "STUDY_VARIABLES_LIST",
						"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIqueries",
						"endPointParams": [
						  {
							"argumentName": "studyName",
							"internalVariableSimpleObjName": "selectedItem",
							"internalVariableSimpleObjProperty": "name"
						  },
						  {
							"argumentName": "ownerTable",
							"value": "study_samples_set"
						  },
						  {
							"argumentName": "ownerId",
							"selObjectPropertyName": "name"
						  }
						]
					  },
					  "automatic": true,
					  "action": [
						{
						  "actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
						  "notGetViewData": true,
						  "requiresDialog": false,
						  "clientMethod": "enterEventResult",
						  "endPointParams": [
							{
							  "argumentName": "studyName",
							  "internalVariableSimpleObjName": "selectedItem",
							  "internalVariableSimpleObjProperty": "name"
							},
							{
							  "argumentName": "variableName",
							  "getFromGrid": true,
							  "selObjectPropertyName": "name"
							},
							{
							  "argumentName": "ownerTable",
							  "getFromGrid": true,
							  "selObjectPropertyName": "owner_table"
							},
							{
							  "argumentName": "ownerId",
							  "getFromGrid": true,
							  "selObjectPropertyName": "owner_id"
							},
							{
							  "argumentName": "variableId",
							  "getFromGrid": true,
							  "selObjectPropertyName": "id"
							},
							{
							  "argumentName": "newValue",
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
				  }
				],
				"children": "samples",
				"children_definition": {
				  "title": {
					"label_en": "Individual Samples",
					"label_es": "Muestras del individuo"
				  },
				  "columns": [
					{
					  "name": "sample_id",
					  "label_en": "Sample Id",
					  "label_es": "Id de muestra"
					},
					{
					  "name": "individual_name",
					  "label_en": "Name",
					  "label_es": "Nombre"
					},
					{
					  "name": "created_by",
					  "label_en": "Created by",
					  "label_es": "Creado por"
					},
					{
					  "name": "created_on",
					  "label_en": "Created on",
					  "label_es": "Creado en"
					}
				  ],
				  "row_buttons": [
					{
					  "actionName": "STUDY_SAMPLES_SET_REMOVE_SAMPLE",
					  "clientMethod": "dialogRequired",
					  "selObjectVariableName": "selectedSampleSet",
					  "endPointUrl": "Projects",
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "internalVariableSimpleObjName": "selectedItem",
						  "internalVariableSimpleObjProperty": "study",
						  "ZZZselObjectPropertyName": "study"
						},
						{
						  "argumentName": "samplesSetName",
						  "selObjectPropertyName": "name"
						},
						{
						  "argumentName": "sampleId",
						  "element": "text1"
						}
					  ],
					  "button": {
						"z-icon": "remove",
						"title": {
						  "label_en": "Unlink Sample",
						  "label_es": "Quitar Muestra"
						},
						"requiresObjectSelected": true
					  },
					  "dialogInfo": {
						"requiresDialog": true,
						"name": "genericFormDialog",
						"fieldText": [
						  {
							"text1": {
							  "label_en": "Sample to unlink",
							  "label_es": "Muestra a deasignar"
							}
						  }
						]
					  }
					},
					{
					  "actionName": "ADD_VARIABLE_SET_TO_STUDY_OBJECT",
					  "requiresDialog": true,
					  "certificationException": true,
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "internalVariableSimpleObjName": "selectedItem",
						  "internalVariableSimpleObjProperty": "name"
						},
						{
						  "argumentName": "ownerTable",
						  "value": "study_individual_sample"
						},
						{
						  "argumentName": "ownerId",
						  "selObjectPropertyName": "sample_id"
						},
						{
						  "argumentName": "variableSetName",
						  "element": "list1"
						}
					  ],
					  "button": {
						"icon": "refresh",
						"title": {
						  "label_en": "Add Variable Set",
						  "label_es": "Añadir Conjunto de Variables"
						},
						"requiresObjectSelected": false
					  },
					  "dialogInfo": {
						"requiresDialog": true,
						"name": "genericDialog",
						"fields": [
						  {
							"list1": {
							  "items": [
								{
								  "keyName": "name",
								  "keyValue_en": "name",
								  "keyValue_es": "name"
								}
							  ],
							  "label_en": "Variable Set",
							  "label_es": "Grupo de variables",
							  "optional": true,
							  "addBlankValueOnTop": true,
							  "addBlankValueAtBottom": false,
							  "valuesFromMasterData": {
								"elementName": "list4",
								"propertyNameContainer": "variables_set",
								"propertyNameContainerLevelPropertyKeyName": "name",
								"propertyKeyName": "name",
								"propertyKeyValueEn": "name",
								"propertyKeyValueEs": "name"
							  }
							}
						  }
						]
					  }
					},
					{
					  "actionName": "ADD_VARIABLE_TO_STUDY_OBJECT",
					  "requiresDialog": true,
					  "certificationException": true,
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "internalVariableSimpleObjName": "selectedItem",
						  "internalVariableSimpleObjProperty": "name"
						},
						{
						  "argumentName": "ownerTable",
						  "value": "study_individual_sample"
						},
						{
						  "argumentName": "ownerId",
						  "selObjectPropertyName": "sample_id"
						},
						{
						  "argumentName": "variableName",
						  "element": "list1"
						}
					  ],
					  "button": {
						"icon": "refresh",
						"title": {
						  "label_en": "Add Variable",
						  "label_es": "Añadir Variable"
						},
						"requiresObjectSelected": false
					  },
					  "dialogInfo": {
						"requiresDialog": true,
						"name": "genericDialog",
						"fields": [
						  {
							"list1": {
							  "items": [
								{
								  "keyName": "name",
								  "keyValue_en": "name",
								  "keyValue_es": "name"
								}
							  ],
							  "label_en": "Variables",
							  "label_es": "Variables",
							  "optional": true,
							  "addBlankValueOnTop": true,
							  "addBlankValueAtBottom": false,
							  "valuesFromMasterData": {
								"elementName": "list4",
								"propertyNameContainer": "variables",
								"propertyNameContainerLevelPropertyKeyName": "name",
								"propertyKeyName": "name",
								"propertyKeyValueEn": "name",
								"propertyKeyValueEs": "name"
							  }
							}
						  }
						]
					  }
					},
					{
					  "actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
					  "requiresDialog": true,
					  "certificationException": true,
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
						"requiresGridItemSelected": true,
						"hideWhenSelectedItem": {
						  "column": "total_params",
						  "value": 0
						}
					  },
					  "resultHeader": {
						"id": {
						  "label_en": "Id",
						  "label_es": "Id",
						  "width": "10%"
						},
						"name": {
						  "label_en": "Parameter",
						  "label_es": "Parámetro"
						},
						"value": {
						  "label_en": "Value",
						  "label_es": "Valor"
						}
					  },
					  "resultHeaderObjectLabelTopLeft": {
						"label_en": "Instrument Event:",
						"label_es": "Evento de Instrumento :"
					  },
					  "dialogInfo": {
						"name": "resultDialog",
						"keyFldName": "id",
						"subQueryName": "getParams",
						"viewQuery": {
						  "actionName": "STUDY_VARIABLES_LIST",
						  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIqueries",
						  "endPointParams": [
							{
							  "argumentName": "studyName",
							  "internalVariableSimpleObjName": "selectedItem",
							  "internalVariableSimpleObjProperty": "name"
							},
							{
							  "argumentName": "ownerTable",
							  "value": "study_individual_sample"
							},
							{
							  "argumentName": "ownerId",
							  "selObjectPropertyName": "sample_id"
							}
						  ]
						},
						"automatic": true,
						"action": [
						  {
							"actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
							"notGetViewData": true,
							"requiresDialog": false,
							"clientMethod": "enterEventResult",
							"endPointParams": [
							  {
								"argumentName": "studyName",
								"internalVariableSimpleObjName": "selectedItem",
								"internalVariableSimpleObjProperty": "name"
							  },
							  {
								"argumentName": "variableName",
								"getFromGrid": true,
								"selObjectPropertyName": "name"
							  },
							  {
								"argumentName": "ownerTable",
								"getFromGrid": true,
								"selObjectPropertyName": "owner_table"
							  },
							  {
								"argumentName": "ownerId",
								"getFromGrid": true,
								"selObjectPropertyName": "owner_id"
							  },
							  {
								"argumentName": "variableId",
								"getFromGrid": true,
								"selObjectPropertyName": "id"
							  },
							  {
								"argumentName": "newValue",
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
					  "actionName": "STUDY_INDIVIDUAL_SAMPLE_DEACTIVATE",
					  "certificationException": true,
					  "requiresDialog": false,
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "selObjectPropertyName": "study"
						},
						{
						  "argumentName": "sampleId",
						  "selObjectPropertyName": "sample_id"
						},
						{
						  "argumentName": "individualId",
						  "selObjectPropertyName": "individual_id"
						}
					  ],
					  "button": {
						"icon": "refresh",
						"title": {
						  "label_en": "Deactivate",
						  "label_es": "Desactivar"
						},
						"requiresObjectSelected": true
					  }
					},
					{
					  "actionName": "STUDY_INDIVIDUAL_SAMPLE_ACTIVATE",
					  "clientMethod": "openReactivateObjectDialog",
					  "notGetViewData": true,
					  "requiresDialog": true,
					  "certificationException": true,
					  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
					  "endPointParams": [
						{
						  "argumentName": "studyName",
						  "internalVariableSimpleObjName": "selectedItem",
						  "internalVariableSimpleObjProperty": "name"
						},
						{
						  "argumentName": "sampleId",
						  "selObjectPropertyName": "sample_id"
						}
					  ],
					  "button": {
						"icon": "toggle_on",
						"title": {
						  "label_en": "Reactivate",
						  "label_es": "Reactivar"
						},
						"requiresGridItemSelected": false
					  },
					  "dialogInfo": {
						"name": "reactivateObjectDialog",
						"fieldsObject": {
						  "queryNumDays": {
							"label_en": "Number of Days",
							"label_es": "Número de Días"
						  },
						  "objectName": {
							"label_en": "Individual to reactivate",
							"label_es": "Individuo a Reactivar"
						  }
						},
						"listDefinition": {
						  "keyFldName": "sample_id",
						  "eachEntryTextGenerator": [
							{
							  "value": "Name: ",
							  "type": "fix"
							},
							{
							  "value": "individual_name",
							  "type": "field"
							}
						  ]
						},
						"viewQuery": {
						  "actionName": "DEACTIVATED_STUDY_INDIVIDUAL_SAMPLES_LAST_N_DAYS",
						  "clientMethod": "getDeactivatedObjects",
						  "endPointParams": [
							{
							  "query": "numDays",
							  "element": "queryNumDays",
							  "defaultValue": 7
							},
							{
							  "argumentName": "studyName",
							  "internalVariableSimpleObjName": "selectedItem",
							  "internalVariableSimpleObjProperty": "name"
							}
						  ]
						}
					  }
					}
				  ],
				  "children": "study_variable_values",
				  "children_definition": {
					"title": {
					  "label_en": "Sample results",
					  "label_es": "Resultados de muestra"
					},
					"columns": [
					  {
						"name": "id",
						"label_en": "Id",
						"label_es": "Id"
					  },
					  {
						"name": "sample",
						"label_en": "Sample",
						"label_es": "Muestra"
					  }
					],
					"row_buttons": [
					  {
						"actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
						"requiresDialog": true,
						"certificationException": true,
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
						  "requiresGridItemSelected": true,
						  "hideWhenSelectedItem": {
							"column": "total_params",
							"value": 0
						  }
						},
						"resultHeader": {
						  "id": {
							"label_en": "Id",
							"label_es": "Id",
							"width": "10%"
						  },
						  "name": {
							"label_en": "Parameter",
							"label_es": "Parámetro"
						  },
						  "value": {
							"label_en": "Value",
							"label_es": "Valor"
						  }
						},
						"resultHeaderObjectLabelTopLeft": {
						  "label_en": "Instrument Event:",
						  "label_es": "Evento de Instrumento :"
						},
						"dialogInfo": {
						  "name": "resultDialog",
						  "keyFldName": "id",
						  "subQueryName": "getParams",
						  "viewQuery": {
							"actionName": "STUDY_VARIABLES_LIST",
							"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIqueries",
							"endPointParams": [
							  {
								"argumentName": "studyName",
								"internalVariableSimpleObjName": "selectedItem",
								"internalVariableSimpleObjProperty": "name"
							  },
							  {
								"argumentName": "variableId",
								"selObjectPropertyName": "id"
							  }
							]
						  },
						  "automatic": true,
						  "action": [
							{
							  "actionName": "ENTER_STUDY_OBJECT_VARIABLE_VALUE",
							  "notGetViewData": true,
							  "requiresDialog": false,
							  "clientMethod": "enterEventResult",
							  "endPointParams": [
								{
								  "argumentName": "studyName",
								  "internalVariableSimpleObjName": "selectedItem",
								  "internalVariableSimpleObjProperty": "name"
								},
								{
								  "argumentName": "variableName",
								  "selObjectPropertyName": "name"
								},
								{
								  "argumentName": "ownerTable",
								  "selObjectPropertyName": "owner_table"
								},
								{
								  "argumentName": "ownerId",
								  "selObjectPropertyName": "owner_id"
								},
								{
								  "argumentName": "newValue",
								  "targetValue": true
								}
							  ]
							}
						  ]
						}
					  }
					]
				  }
				}
			  }
			]
		  }
		]
	},
	"MyProjects":{
	"component": "ObjectByTabs",
	"hasOwnComponent": true,
	"showTitleOnTop": true,
	"title": {
		"fix_text_en": "My Projects",
		"fix_text_es": "Mis Proyectos",
		"name": "study"
	},
	"viewQuery": {
		"actionName": "ALL_ACTIVE_PROJECTS",
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
			"argumentName": "specCode",
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
			"fixValue": ""
		}
		}
	],
	"filterResultDetail":{
		"type":"list",
		"detail":[
			{"field": "name"}
		]  		
	},
	"actions": [],
	"tabs": [
		{ "tabLabel_en": "Studies", "tabLabel_es": "Inicio", "view": "summary",
			"view_definition": [
				{   "type": "parentReadOnlyTable", 
					"endPointPropertyArray": ["project", "study"],
					"columns": [
						{
							"name": "name",
							"label_en": "Study",
							"label_es": "Estudio"
						}
					],
					"children":"study_individual",
					"children_definition":{
						"columns": [
						{
							"name": "individual_id",
							"label_en": "Id",
							"label_es": "Id"
						},
						{
							"name": "individual_name",
							"label_en": "Name",
							"label_es": "Nombre"
						}			  
						],
						"children":"study_individual_sample",
						"children_definition":{
							"columns": [
							{
								"name": "sample_id",
								"label_en": "Id",
								"label_es": "Id"
							},
							{
								"name": "created_on",
								"label_en": "Creation",
								"label_es": "Creación"
							}			  
							]
						}
		
					}
				}
			]
		},
		{"tabLabel_en": "Project", "tabLabel_es": "Proyecto", "view": "projectmain", "display": true,
			"view_definition":[
				{   "type": "readOnlyTable", 
					"endPointPropertyArray": ["project", "project_users"],
					"columns": [
						{
							"name": "person",
							"label_en": "Person",
							"label_es": "Persona"
						},
						{
							"name": "roles",
							"label_en": "Roles",
							"label_es": "Roles"
						},
						{
							"name": "created_by",
							"label_en": "Creator",
							"label_es": "Creador"
						},
						{
							"name": "created_on",
							"label_en": "Creation Date",
							"label_es": "F.Creación"
						}
					],
					"actions":[
						{ "actionName": "PROJECT_NEW",
							"requiresDialog": true,
							"selObjectVariableName": "selectedProject",
							"endPointUrl": "Projects",
							"endPointParams": [
								{ "argumentName": "projectName", "element": "text1" }
							],
							"button": {
								"xicon": "new",
								"title": {
								"label_en": "New Project", "label_es": "Nuevo Proyecto"
								},
								requiresObjectSelected : false
							},   
							"dialogInfo": {
								"name": "genericDialog",
								"fields": [
								{ "text1": { "label_en": "new Project Name", "label_es": "Nombre nuevo Proyecto" }}
								]
							}
						},
						{ "actionName": "PROJECT_ADD_USER",
							"requiresDialog": true,
							"clientMethod": "newStudyIndividual",
							"selObjectVariableName": "selectedProjectUser", 
							"endPointUrl": "Projects",
							"endPointParams": [ 
							{ "argumentName": "projectName", "internalVariableSimpleObjName":"selectedProject", "internalVariableSimpleObjProperty":"name", "ZZZselObjectPropertyName": "study"},
							{ "argumentName": "userName", "element": "listMDprocedureUsers" },
							{ "argumentName": "userRole", "element": "list1" }
							// { "argumentName": "fieldsNames", "value": "undefined" },
							// { "argumentName": "fieldsValues", "value": "undefined" }
							//individualsList
							],
							"button": {
							"z-icdon": "refresh",
							"title": {"label_en": "Add User", "label_es": "Añadir Usuario"},
							requiresObjectSelected : false
							},   
							"dialogInfo": {
								"name": "genericDialog",
								"fields":[ 
									{ "listMDprocedureUsers": { "label_en": "User", "label_es": "Usuario" }},
									{"list1": { "label_en": "Role", "label_es": "Rol",
										"items": [
											{ "keyName": "read-only", "keyValue_en": "Read Only", "keyValue_es": "Solo Lectura" },
											{ "keyName": "edit", "keyValue_en": "Edit", "keyValue_es": "Editar" },
										]            
									}}
								]
							}
						},
						{ "actionName": "PROJECT_USER_ACTIVATE",
						"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
							"endPointParams": [
							{ "argumentName": "projectName", "internalVariableSimpleObjName":"selectedProject", "internalVariableSimpleObjProperty":"name", "ZZZselObjectPropertyName": "study"},
							{ "argumentName": "userName", "selObjectPropertyName": "person" }
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
								"objectName": { "label_en": "Project User to reactivate", "label_es": "Usuario de Proyecto a Reactivar" }
							},    
							"listDefinition":{
								"keyFldName":"person",
								"eachEntryTextGenerator":[
								{"value": "Name: ", "type":"fix"}, {"value": "person", "type":"field"}, {"value": " (", "type":"fix"}, {"value": "roles", "type":"field"}, {"value": ")", "type":"fix"}  
								]
							},
							"viewQuery": {
								"actionName": "DEACTIVATED_PROJECT_USERS_LAST_N_DAYS",
								"clientMethod": "getDeactivatedObjects",
								"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
								"endPointParams": [
									{ "argumentName": "projectName", "internalVariableSimpleObjName": "selectedProject", "internalVariableSimpleObjProperty": "name"},
									{ "argumentName": "numDays", "element": "queryNumDays", "fixValue": 7 }							
								]
							},
							"action": [            
							]
							}
						},
					],
					"row_buttons":[
						{ "actionName": "PROJECT_USER_DEACTIVATE",
							"requiresDialog": false,
							"xxxclientMethod": "buttonActionWithoutDialog",
							"selObjectVariableName": "selectedProjectUser",
							"endPointUrl": "Projects",
							"endPointParams": [
							{ "argumentName": "projectName", "selObjectPropertyName": "project" },
							{ "argumentName": "userName", "selObjectPropertyName": "person" },
							{ "argumentName": "userRole", "selObjectPropertyName": "roles" }
							],
							"button": {
							"z-icon": "refresh",
							"title": {
								"label_en": "Deactivate", "label_es": "Desactivar"
							},
							requiresObjectSelected : true
							},    
						},
					]
				}
			]
		},
		{"tabLabel_en": "Users", "tabLabel_es": "Usuarios", "view": "studyusers",
			"view_definition":[
				{
					
				}
			]
		},
		{"tabLabel_en": "Variable Values", "tabLabel_es": "Valores de Variables", "view": "studyvariablevalues",
		"view_definition":[
			{   "type": "parentReadOnlyTable", 
				"endPointPropertyArray": ["project", "study", "study_variable_values"],
				"columns": [
					{
						"name": "owner_table",
						"label_en": "Entity",
						"label_es": "Entidad"
					},
					{
						"name": "owner_id",
						"label_en": "Object",
						"label_es": "Objeto"
					},
					{
						"name": "individual",
						"label_en": "Individual",
						"label_es": "Individuo"
					},
					{
						"name": "variable_set",
						"label_en": "Variable Set",
						"label_es": "Grupo de variables"
					},
					{
						"name": "name",
						"label_en": "Name",
						"label_es": "Nombre"
					},
					{
						"name": "value",
						"label_en": "Value",
						"label_es": "Valor"
					}
				]
			}
		]
		},  
		{"tabLabel_en": "Individuals", "tabLabel_es": "Individuos", "view": "studyindividuals",
		"view_definition":[
			{   "type": "parentReadOnlyTable", 
			"endPointPropertyArray": ["project", "study"],
			"columns": [
				{
					"name": "name",
					"label_en": "Study",
					"label_es": "Estudio"
				}
			],
			"children":"study_individual",
			"children_definition":{
				"columns": [
				{
					"name": "individual_id",
					"label_en": "Id",
					"label_es": "Id"
				},
				{
					"name": "individual_name",
					"label_en": "Name",
					"label_es": "Nombre"
				}			  
				],
				"children":"study_individual_sample",
				"children_definition":{
					"columns": [
					{
						"name": "sample_id",
						"label_en": "Id",
						"label_es": "Id"
					},
					{
						"name": "created_on",
						"label_en": "Creation",
						"label_es": "Creación"
					}			  
					]
				}	
			}
			}
		]
	},
		{"tabLabel_en": "Families", "tabLabel_es": "Familias", "view": "studyfamilies",
		"view_definition":[
			{
				
			}
		]
	},
		{"tabLabel_en": "Samples Set", "tabLabel_es": "Agrupador Muestras", "view": "studysamplesset",
		"view_definition":[
			{
				
			}
		]
	}
	],
	},

	"ProjectManagerTabs":{
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
          {
            "actionName": "NEW_INVESTIGATION", 
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
          {
            "actionName": "OPEN_INVESTIGATIONS",
            "clientMethodxxx": "getOpenInvestigations",
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
          {
            "actionName": "INVESTIGATION_CAPA_DECISION",			
            "xxxxalternativeAPIActionMethod": "capaDecisionAction",
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
          {
            "actionName": "CLOSE_INVESTIGATION",
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
	"ProjectManager": {
        "component": "ModuleGenomaProjectWindow",
        "hasOwnComponent": true,
        "viewQuery":
        { "actionName": "ALL_ACTIVE_PROJECTS",
          "clientMethod": "getGenomaProjectsList",
          "addRefreshButton": true,
          "button": {
            "icon": "refresh",
            "title": {
              "label_en": "Reload", "label_es": "Recargar"
            },
            "requiresGridItemSelected": true
          },
          "subAction": {
              "actionName": "ALL_ACTIVE_PROJECTS",
              "clientMethod": "getGenomaProjectsList"
          }
        },
		"defaultTabOnOpen": "projectmain",
		"tabs":[
			{"tabLabel_en": "Project", "tabLabel_es": "Proyecto", "view": "projectmain", "display": true},
			{"tabLabel_en": "Users", "tabLabel_es": "Usuarios", "view": "studyusers"},
			{"tabLabel_en": "Variable Values", "tabLabel_es": "Valores de Variables", "view": "studyvariablevalues"},  
			{"tabLabel_en": "Individuals", "tabLabel_es": "Individuos", "view": "studyindividuals"},
			{"tabLabel_en": "Families", "tabLabel_es": "Familias", "view": "studyfamilies"},
			{"tabLabel_en": "Samples Set", "tabLabel_es": "Agrupador Muestras", "view": "studysamplesset"}  		
		],
		"projectmain": {
			"component": "TableWithButtons",
			"langConfig": {
				"title": {"label_en": "Users Project ", "label_es": "Usuarios del Proyecto "},
				"gridName": "projectusersgrid",
				"selectedObjectName": "selectedProject",
				"gridElementName": "project_users",
				"gridHeader": {
					"person": {"label_en": "Person", "label_es": "Persona", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
					"roles": {"label_en": "Roles", "label_es": "Roles", "sort": false, "filter": true, "width": "20%"},
					"created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
					"created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"}
				}
			},
			"actions":[
				{ "actionName": "PROJECT_NEW",
				  "requiresDialog": true,
					"xxclientMethod": "newStudyIndividual",
					"selObjectVariableName": "selectedProject",
					"endPointUrl": "Projects",
					"endPointParams": [
					  { "argumentName": "projectName", "element": "text1" }
					],
					"button": {
					  "z-icdon": "refresh",
					  "title": {
						"label_en": "New Project", "label_es": "Nuevo Proyecto"
					  },
					  requiresObjectSelected : false
					},   
					"dialogInfo": {
					  "name": "genericDialog",
					  "fields": [
						{ "text1": { "label_en": "new Project Name", "label_es": "Nombre nuevo Proyecto" }}
					  ]
					}
				},
			    { "actionName": "PROJECT_ADD_USER",
				  "requiresDialog": true,
				  "clientMethod": "newStudyIndividual",
				  "selObjectVariableName": "selectedProjectUser", 
				  "endPointUrl": "Projects",
				  "endPointParams": [ 
					{ "argumentName": "projectName", "internalVariableSimpleObjName":"selectedProject", "internalVariableSimpleObjProperty":"name", "ZZZselObjectPropertyName": "study"},
					{ "argumentName": "userName", "element": "listMDprocedureUsers" },
					{ "argumentName": "userRole", "element": "list1" }
				  // { "argumentName": "fieldsNames", "value": "undefined" },
				  // { "argumentName": "fieldsValues", "value": "undefined" }
				  //individualsList
				  ],
				  "button": {
					"z-icdon": "refresh",
					"title": {"label_en": "Add User", "label_es": "Añadir Usuario"},
				  requiresObjectSelected : false
				  },   
				  "dialogInfo": {
						"name": "genericDialog",
						"fields":[ 
							{ "listMDprocedureUsers": { "label_en": "User", "label_es": "Usuario" }},
							{"list1": { "label_en": "Role", "label_es": "Rol",
								"items": [
									{ "keyName": "read-only", "keyValue_en": "Read Only", "keyValue_es": "Solo Lectura" },
									{ "keyName": "edit", "keyValue_en": "Edit", "keyValue_es": "Editar" },
								]            
							}}
						]
				  }
				},
			    { "actionName": "PROJECT_USER_DEACTIVATE",
				"requiresDialog": false,
				"xxxclientMethod": "buttonActionWithoutDialog",
				"selObjectVariableName": "selectedProjectUser",
				"endPointUrl": "Projects",
				"endPointParams": [
				  { "argumentName": "projectName", "selObjectPropertyName": "project" },
				  { "argumentName": "userName", "selObjectPropertyName": "person" },
				  { "argumentName": "userRole", "selObjectPropertyName": "roles" }
				],
				"button": {
				  "z-icon": "refresh",
				  "title": {
					"label_en": "Deactivate", "label_es": "Desactivar"
				  },
				  requiresObjectSelected : true
				},    
			  }, 
				{ "actionName": "PROJECT_USER_ACTIVATE",
				"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
					"endPointParams": [
					  { "argumentName": "projectName", "internalVariableSimpleObjName":"selectedProject", "internalVariableSimpleObjProperty":"name", "ZZZselObjectPropertyName": "study"},
					  { "argumentName": "userName", "selObjectPropertyName": "person" }
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
						"objectName": { "label_en": "Project User to reactivate", "label_es": "Usuario de Proyecto a Reactivar" }
					  },    
					  "listDefinition":{
						"keyFldName":"person",
						"eachEntryTextGenerator":[
						  {"value": "Name: ", "type":"fix"}, {"value": "person", "type":"field"}, {"value": " (", "type":"fix"}, {"value": "roles", "type":"field"}, {"value": ")", "type":"fix"}  
						]
					  },
					  "viewQuery": {
						  "actionName": "DEACTIVATED_PROJECT_USERS_LAST_N_DAYS",
						  "clientMethod": "getDeactivatedObjects",
						  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
						  "endPointParams": [
						    { "argumentName": "projectName", "internalVariableSimpleObjName": "selectedProject", "internalVariableSimpleObjProperty": "name"},
							{ "argumentName": "numDays", "element": "queryNumDays", "fixValue": 7 }							
						  ]
					  },
					  "action": [            
					  ]
					}
				},
			]
		},
		"studyusers": {
			"component": "TableWithButtons",
			"langConfig": {
				"title": {"label_en": "Users Study ","label_es": "Usuarios del estudio "},
				"gridName": "studyusergrid",
				"selectedObjectName": "selectedItem",
				"gridElementName": "study_users",				
				"gridHeader": {
					"person": {"label_en": "Person", "label_es": "Persona", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
					"roles": {"label_en": "Roles", "label_es": "Roles", "sort": false, "filter": true, "width": "20%"},
					"created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
					"created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"}					
				}
			},
			"actions":[
				{ "actionName": "STUDY_ADD_USER",
				"requiresDialog": true,
				"xclientMethod": "newStudyIndividual",
				"selObjectVariableName": "selectedItemUser", 
				"endPointUrl": "Projects",
				"endPointParams": [ 
				  { "argumentName": "studyName", "internalVariableSimpleObjName":"selectedItem", "internalVariableSimpleObjProperty":"study", "ZZZselObjectPropertyName": "study"},
				  { "argumentName": "userName", "element": "listMDprocedureUsers" },
				  { "argumentName": "userRole", "element": "list1" }
				  // { "argumentName": "fieldsNames", "value": "undefined" },
				  // { "argumentName": "fieldsValues", "value": "undefined" }
				  //individualsList
				],
				"button": {
				  "z-icdon": "refresh",
				  "title": {
					"label_en": "New", "label_es": "Nuevo"
				  },
				  requiresObjectSelected : false
				},   
				"dialogInfo": {				  
				  "name": "genericDialog",
				  "fieldText": [
					{ "listMDprocedureUsers": { "label_en": "User", "label_es": "Usuario" }},
					{ "list1": { "label_en": "Role", "label_es": "Rol",
					   "items": [
						 { "keyName": "read-only", "keyValue_en": "Read Only", "keyValue_es": "Solo Lectura" },
						 { "keyName": "edit", "keyValue_en": "Edit", "keyValue_es": "Editar" },
						]            
					  }
					}
				  ]
				}
			  },
				{ "actionName": "STUDY_USER_DEACTIVATE",
				"requiresDialog": false,
				"clientMethod": "buttonActionWithoutDialog",
				"selObjectVariableName": "selectedItemUser",
				"endPointUrl": "Projects",
				"endPointParams": [
				  { "argumentName": "studyName", "selObjectPropertyName": "study"},
				  { "argumentName": "userName", "selObjectPropertyName": "person" },
				  { "argumentName": "userRole", "selObjectPropertyName": "roles" }
				],
				"button": {
				  "z-icon": "refresh",
				  "title": {
					"label_en": "Deactivate", "label_es": "Desactivar"
				  },
				  requiresObjectSelected : true
				},    
			  }, 
				{ "actionName": "STUDY_USER_ACTIVATE",
				"requiresDialog": true,
				"endPointUrl": "Projects",  
				"endPointParams": [
				  { "argumentName": "studyName", "selObjectPropertyName": "study"},
				  { "argumentName": "userName", "selObjectPropertyName": "person" }
				  //{ "argumentName": "userRole", "selObjectPropertyName": "roles" }
				],
				"clientMethod": "openReactivateObjectDialog",
				"selObjectVariableName": "selectedItemUser",
				"button": {
				  "icon": "alarm_add",
				  "title": {
					"label_en": "Activate", "label_es": "Activar"
				  },
				  requiresObjectSelected : false
				},
				"dialogInfo": {				  
				  "name": "reactivateObjectDialog",
				  "selObjectVariableName": "selectedItemUser", 
				  "fieldText": {
					"numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
					"objectName": { "label_en": "Person to reactivate", "label_es": "Persona a Reactivar" }
				  },    
				  "listDefinition":{
					"keyFldName":"person",
					"eachEntryTextGenerator":[
					  {"value": "Name: ", "type":"fix"}, {"value": "person", "type":"field"}, {"value": " (", "type":"fix"}, {"value": "roles", "type":"field"}, {"value": ")", "type":"fix"}  
					]
				  },
				  "action": [            
					{
					  "actionName": "DEACTIVATED_STUDY_USERS_LAST_N_DAYS",
					  "clientMethod": "getDeactivatedObjects",
					  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
					  "apiParams": [
						{ "query": "numDays", "element": "lotNumDays", "defaultValue": 7 },
						{ "argumentName": "studyName", "selObjectPropertyName": "study"},
					  ]
					}
				  ]
				}
			  },			
			]
		},
		"studyvariablevalues": {
			"component": "TableWithButtons",
			"langConfig": {		
				"title": {"label_en": "Study Variable Values", "label_es": "Valores de variables para el estudio"},
				"gridName": "studyusergrid",
				"selectedObjectName": "selectedItem",
				"gridElementName": "study_variable_values",				
				"gridHeader": {
				  "id": {"label_en": "Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
				  "owner_table": {"label_en": "type", "label_es": "Tipo", "sort": false, "filter": true, "width": "20%"},
				  "owner_id": {"label_en": "Owner", "label_es": "Dueño", "sort": false, "filter": true, "width": "20%"},
				  "variable_set": {"label_en": "variable_set", "label_es": "variable_set", "sort": false, "filter": true, "width": "20%"},
				  "name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
				  "value": {"label_en": "Value", "label_es": "Valor", "sort": false, "filter": true, "width": "20%"}				
				}
			},
			"actions":[
			  { "actionName": "STUDY_OBJECT_SET_VARIABLE_VALUE",
			  "requiresDialog": true,
				"clientMethod": "studyObjectSetVariableValue",
				"selObjectVariableName": "selectedVariable",
				"endPointUrl": "Projects",
				"endPointParams": [
				  { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
				  { "argumentName": "ownerId", "selObjectPropertyName": "owner_id" },
				  { "argumentName": "ownerTable", "selObjectPropertyName": "owner_table" },
				  { "argumentName": "variableSetName", "selObjectPropertyName": "variable_set" },
				  { "argumentName": "variableName", "selObjectPropertyName": "name" },
				  { "argumentName": "newValue", "variableName": "newResult" }
				],
				// // [{"is_mandatory?":true,"name":"studyName","type":"STRING","testing arg posic":6},
				// // {"is_mandatory?":true,"name":"variableSetName","type":"STRING","testing arg posic":7},
				// // {"is_mandatory?":true,"name":"ownerTable","type":"STRING","testing arg posic":8},
				// // {"is_mandatory?":true,"name":"ownerId","type":"STRING","testing arg posic":9},
				// // {"is_mandatory?":true,"name":"variableName","type":"STRING","testing arg posic":10},
				// // {"is_mandatory?":true,"name":"newValue","type":"STRING","testing arg posic":11}]        
				"button": {
				  "z-icdon": "refresh",
				  "title": {
					"label_en": "Set Result", "label_es": "Entrar Result"
				  },
				  requiresObjectSelected : true
				},   
				"dialogInfo": {				  
				  "name": "objectSetResultValue",
				  "fieldText": {
					"variableName": { "label_en": "Variable Name", "label_es": "Nombre Variable" },
					"value": { "label_en": "Value", "label_es": "Valor" }
					//"number1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo" },
					//"list1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo",
					//   "items": [
					//     { "keyName": "familyCorrecto", "keyValue_en": "Correct", "keyValue_es": "Correcto" },
					//     { "keyName": "familyIntentObs", "keyValue_en": "Attempt-Obs", "keyValue_es": "Intent-Obs" },
					//     { "keyName": "familyObsCorrecto", "keyValue_en": "Correct-Obs", "keyValue_es": "Correcto-Obs" },
					//     { "keyName": "familyObsIntentosCorrecto", "keyValue_en": "Corr-Attempt-Obs", "keyValue_es": "Corr-Intent-Obs" },
					//     { "keyName": "familyObsIntentoCorrectoTerminado", "keyValue_en": "Corr-Attempt-Obs-End", "keyValue_es": "Corr-Intent-Obs-Term" }
					//   ]            
					// }
				  }
				}
			  }			
			]
		},
		
		
		"studyindividuals": {
			"component": "TableWithButtons",
			"langConfig": {		
				"title": {"label_en": "Individuals from Study ", "label_es": "Individuos Estudio "},
				"gridName": "indivgrid",
				"selectedObjectName": "selectedItem",
				"gridElementName": "study_individual",				
				"gridHeader": {
				  "individual_id": {"label_en": "Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
				  "individual_name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
				  "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
				  "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"},				}
			},
			"actions":[
				  { "actionName": "STUDY_CREATE_INDIVIDUAL",
					"clientMethod": "newStudyIndividual",
					"selObjectVariableName": "selectedIndiv",
					"endPointUrl": "Projects",
					"endPointParams": [
					  { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
					  { "argumentName": "individualName", "element": "text1" }
					  // { "argumentName": "fieldsNames", "value": "undefined" },
					  // { "argumentName": "fieldsValues", "value": "undefined" }
					],
					"button": {
					  "z-icdon": "refresh",
					  "title": {
						"label_en": "New", "label_es": "Nuevo"
					  },
					  requiresObjectSelected : false
					},   
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericFormDialog",
					  "fieldText": [
						{"text1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo" }}
					  ]
					}
				  },
				  { "actionName": "STUDY_INDIVIDUAL_DEACTIVATE",
					"clientMethod": "buttonActionWithoutDialog",
					"selObjectVariableName": "selectedIndiv",
					"endPointUrl": "Projects",
					"endPointParams": [
					  { "argumentName": "studyName", "selObjectPropertyName": "study"},
					  { "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
					],
					"button": {
					  "z-icon": "refresh",
					  "title": {
						"label_en": "Deactivate", "label_es": "Desactivar"
					  },
					  requiresObjectSelected : true
					},    
				  }, 
				  { "actionName": "STUDY_CREATE_INDIVIDUAL_SAMPLE",
					"clientMethod": "buttonActionWithoutDialog",
					"selObjectVariableName": "selectedIndiv",
					"endPointUrl": "Projects",
					"endPointParams": [
					  { "argumentName": "studyName", "selObjectPropertyName": "study"},
					  { "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
					],
					"button": {
					  "z-icon": "add",
					  "title": {
						"label_en": "Add Extra Sample", "label_es": "Añadir Muestra Extra"
					  },
					  requiresObjectSelected : true
					},    
				  },               
				  { "actionName": "STUDY_INDIVIDUAL_ACTIVATE",
					"endPointUrl": "Projects",  
					"endPointParams": [
					  { "argumentName": "studyName", "selObjectPropertyName": "study"},
					  { "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
					],
					"clientMethod": "openReactivateObjectDialog",
					"selObjectVariableName": "selectedIndiv",
					"button": {
					  "icon": "alarm_add",
					  "title": {
						"label_en": "Activate", "label_es": "Activar"
					  },
					  requiresObjectSelected : false
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "reactivateObjectDialog",
					  "selObjectVariableName": "selectedIndiv", 
					  "fieldText": {
						"numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
						"objectName": { "label_en": "Individual to reactivate", "label_es": "Individuo a Reactivar" }
					  },    
					  "listDefinition":{
						"keyFldName":"individual_id",
						"eachEntryTextGenerator":[
						  {"value": "Name: ", "type":"fix"}, {"value": "individual_name", "type":"field"} 
						]
					  },
					  "action": [            
						{
						  "actionName": "DEACTIVATED_STUDY_INDIVIDUALS_LAST_N_DAYS",
						  "clientMethod": "getDeactivatedObjects",
						  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
						  "apiParams": [
							{ "query": "numDays", "element": "lotNumDays", "defaultValue": 7 },
							{ "argumentName": "studyName", "selObjectPropertyName": "study"},
						  ]
						}
					  ]
					}
				  },
			]
		},
		
				"studyindividualssamples": {
					"component": "TableWithButtons",
					"langConfig": {		
						"title": {"label_en": "Samples Set Samples from Study ", "label_es": "Muestras del Agrupador de Muestras Estudio "},
						"gridName": "samplesetsamplevariablegrid",
						"selectedObjectName": "selectedItem",
						"gridElementName": "selectedSampleSetSampleVariable",				
						"gridHeader": {
						  "sample_id": {"label_en": "Smp Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
						  "individual_name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
						  "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
						  "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"}
						}
					},
					"actions":[
					  { "actionName": "ADD_VARIABLE_SET_TO_STUDY_OBJECT",
						"clientMethod": "newStudyIndividual",
						"selObjectVariableName": "selectedIndivSample", 
						"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
						"endPointParams": [ 
						  { "argumentName": "studyName", "selObjectPropertyName": "study"},
						  { "argumentName": "ownerTable", "value": "study_individual_sample" },
						  { "argumentName": "ownerId", "selObjectPropertyName": "sample_id" },
						  { "argumentName": "variableSetName", "element": "listMDvariablesSet" },          
						  // { "argumentName": "fieldsNames", "value": "undefined" },
						  // { "argumentName": "fieldsValues", "value": "undefined" }
						  //individualsList
						],
						"button": {
						  "z-icdon": "refresh",
						  "title": {
							"label_en": "Add Variable Set", "label_es": "Añadir Conjunto de Variables"
						  },
						  requiresObjectSelected : false
						},   
						"dialogInfo": {
						  "requiresDialog": true,
						  "name": "genericFormDialog",
						  "fieldText": [
							{"listMDvariablesSet": { "label_en": "Variables Set", "label_es": "Conjunto Variables" }}
						  ]
						}
					  },
					  { "actionName": "ADD_VARIABLE_TO_STUDY_OBJECT",
						"clientMethod": "newStudyIndividual",
						"selObjectVariableName": "selectedIndivSample", 
						"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
						"endPointParams": [ 
						  { "argumentName": "studyName", "selObjectPropertyName": "study"},
						  { "argumentName": "ownerTable", "value": "study_individual_sample" },
						  { "argumentName": "ownerId", "selObjectPropertyName": "sample_id" },
						  { "argumentName": "variableName", "element": "listMDvariables" },          
						  // { "argumentName": "fieldsNames", "value": "undefined" },
						  // { "argumentName": "fieldsValues", "value": "undefined" }
						  //individualsList
						],
						"button": {
						  "z-icdon": "refresh",
						  "title": {
							"label_en": "Add Variable", "label_es": "Añadir Variable"
						  },
						  requiresObjectSelected : false
						},   
						"dialogInfo": {
						  "requiresDialog": true,
						  "name": "genericFormDialog",
						  "fieldText": [
							{"listMDvariables": { "label_en": "Variable", "label_es": "Variable" }}
						  ]
						}
					  },
					  { "actionName": "STUDY_INDIVIDUAL_SAMPLE_DEACTIVATE",
						"clientMethod": "buttonActionWithoutDialog",
						"selObjectVariableName": "selectedIndivSample",
						"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
						"endPointParams": [
						  { "argumentName": "studyName", "selObjectPropertyName": "study"},
						  { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
						  { "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
						],
						"button": {
						  "z-icon": "refresh",
						  "title": {
							"label_en": "Deactivate", "label_es": "Desactivar"
						  },
						  requiresObjectSelected : true
						},    
					  }, 
					  { "actionName": "STUDY_INDIVIDUAL_SAMPLE_ACTIVATE",
					  	"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions", 
						"endPointParams": [
						  { "argumentName": "studyName", "selObjectPropertyName": "study"},
						  { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
						  //{ "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
						],
						"clientMethod": "openReactivateObjectDialog",
						"selObjectVariableName": "selectedIndivSample",
						"button": {
						  "icon": "alarm_add",
						  "title": {
							"label_en": "Activate", "label_es": "Activar"
						  },
						  requiresObjectSelected : false
						},
						"dialogInfo": {
						  "requiresDialog": true,
						  "name": "reactivateObjectDialog",
						  "selObjectVariableName": "selectedIndiv", 
						  "fieldText": {
							"numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
							"objectName": { "label_en": "Sample to reactivate", "label_es": "Muestra a Reactivar" }
						  },    
						  "listDefinition":{
							"keyFldName":"sample_id",
							"eachEntryTextGenerator":[
							  {"value": "Sample: ", "type":"fix"}, {"value": "sample_id", "type":"field"} 
							]
						  },
						  "action": [            
							{
							  "actionName": "DEACTIVATED_STUDY_INDIVIDUAL_SAMPLES_LAST_N_DAYS",
							  "clientMethod": "getDeactivatedObjects",
							  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions", 
							  "apiParams": [
								{ "query": "numDays", "element": "lotNumDays", "defaultValue": 7 },
								{ "argumentName": "studyName", "selObjectPropertyName": "study"},
							  ]
							}
						  ]
						}
					  },
					
					]
				},		
				"studyindividualssamplesvariables": {
					"component": "TableWithButtons",
					"langConfig": {		
						"title": {"label_en": "Samples Set Samples from Study ", "label_es": "Muestras del Agrupador de Muestras Estudio "},
						"gridName": "samplesetsamplevariablegrid",
						"selectedObjectName": "selectedItem",
						"gridElementName": "selectedSampleSetSampleVariable",				
						"gridHeader": {
						  "id": {"label_en": "Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
						  "type": {"label_en": "Type", "label_es": "Tipo", "sort": false, "filter": true, "width": "20%"},
						  "name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
						  "value": {"label_en": "Value", "label_es": "Valor", "sort": false, "filter": true, "width": "20%"}
						}
					},
					"actions":[
						{ "actionName": "STUDY_OBJECT_SET_VARIABLE_VALUE",
			  "requiresDialog": true,
				"clientMethod": "studyObjectSetVariableValue",
				"selObjectVariableName": "selectedVariable",
				"endPointUrl": "Projects",
				"endPointParams": [
				  { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
				  { "argumentName": "ownerId", "selObjectPropertyName": "owner_id" },
				  { "argumentName": "ownerTable", "selObjectPropertyName": "owner_table" },
				  { "argumentName": "variableSetName", "selObjectPropertyName": "variable_set" },
				  { "argumentName": "variableName", "selObjectPropertyName": "name" },
				  { "argumentName": "newValue", "variableName": "newResult" }
				],
				// // [{"is_mandatory?":true,"name":"studyName","type":"STRING","testing arg posic":6},
				// // {"is_mandatory?":true,"name":"variableSetName","type":"STRING","testing arg posic":7},
				// // {"is_mandatory?":true,"name":"ownerTable","type":"STRING","testing arg posic":8},
				// // {"is_mandatory?":true,"name":"ownerId","type":"STRING","testing arg posic":9},
				// // {"is_mandatory?":true,"name":"variableName","type":"STRING","testing arg posic":10},
				// // {"is_mandatory?":true,"name":"newValue","type":"STRING","testing arg posic":11}]        
				"button": {
				  "z-icdon": "refresh",
				  "title": {
					"label_en": "Set Result", "label_es": "Entrar Result"
				  },
				  requiresObjectSelected : true
				},   
				"dialogInfo": {				  
				  "name": "objectSetResultValue",
				  "fieldText": {
					"variableName": { "label_en": "Variable Name", "label_es": "Nombre Variable" },
					"value": { "label_en": "Value", "label_es": "Valor" }
					//"number1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo" },
					//"list1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo",
					//   "items": [
					//     { "keyName": "familyCorrecto", "keyValue_en": "Correct", "keyValue_es": "Correcto" },
					//     { "keyName": "familyIntentObs", "keyValue_en": "Attempt-Obs", "keyValue_es": "Intent-Obs" },
					//     { "keyName": "familyObsCorrecto", "keyValue_en": "Correct-Obs", "keyValue_es": "Correcto-Obs" },
					//     { "keyName": "familyObsIntentosCorrecto", "keyValue_en": "Corr-Attempt-Obs", "keyValue_es": "Corr-Intent-Obs" },
					//     { "keyName": "familyObsIntentoCorrectoTerminado", "keyValue_en": "Corr-Attempt-Obs-End", "keyValue_es": "Corr-Intent-Obs-Term" }
					//   ]            
					// }
				  }
				}
			  }								
					]
				},		
		
		
		
		
		"studyfamilies": {
			"component": "TableWithButtons",
			"langConfig": {		
				"title": {"label_en": "Families from Study ", "label_es": "Familias Estudio "},
				"gridName": "familygrid",
				"selectedObjectName": "selectedItem",
				"gridElementName": "study_family",				
				"gridHeader": {
				  "name": {        "label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": true, "width": "10%"      },
				  "description": {        "label_en": "Description", "label_es": "Descripción", "sort": false, "filter": true, "width": "20%"      },
				  "created_by": {        "label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"      },
				  "created_on": {        "label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"      },
				}
			},
			"actions":[
				  { "actionName": "STUDY_CREATE_FAMILY",
					"clientMethod": "newStudyIndividual",
					"selObjectVariableName": "selectedFamily", 
					"endPointUrl": "Projects",
					"endPointParams": [ 
					  { "argumentName": "studyName", "internalVariableSimpleObjName":"selectedItem", "internalVariableSimpleObjProperty":"study", "ZZZselObjectPropertyName": "study"},
					  { "argumentName": "familyName", "element": "text1" }
					  // { "argumentName": "fieldsNames", "value": "undefined" },
					  // { "argumentName": "fieldsValues", "value": "undefined" }
					  //individualsList
					],
					"button": {
					  "z-icdon": "refresh",
					  "title": {
						"label_en": "New", "label_es": "Nuevo"
					  },
					  requiresObjectSelected : false
					},   
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericFormDialog",
					  "fieldText": [
						{"text1": { "label_en": "new family Name", "label_es": "Nombre Nueva familia" }}
					  ]
					}
				  },
				  { "actionName": "STUDY_FAMILY_DEACTIVATE",
					"clientMethod": "buttonActionWithoutDialog",
					"selObjectVariableName": "selectedFamily",
					"endPointUrl": "Projects",
					"endPointParams": [
					  { "argumentName": "studyName", "internalVariableSimpleObjName":"selectedItem", "internalVariableSimpleObjProperty":"study", "ZZZselObjectPropertyName": "study"},
					  { "argumentName": "familyName", "selObjectPropertyName": "name" }
					],
					"button": {
					  "z-icon": "refresh",
					  "title": {
						"label_en": "Deactivate", "label_es": "Desactivar"
					  },
					  requiresObjectSelected : true
					},    
				  }, 
				  { "actionName": "STUDY_FAMILY_ACTIVATE",
					"endPointUrl": "Projects",  
					"endPointParams": [
					  { "argumentName": "studyName", "internalVariableSimpleObjName":"selectedItem", "internalVariableSimpleObjProperty":"study", "ZZZselObjectPropertyName": "study"},
					  { "argumentName": "familyName", "selObjectPropertyName": "name" }
					],
					"clientMethod": "openReactivateObjectDialog",
					"selObjectVariableName": "selectedFamily",
					"button": {
					  "icon": "alarm_add",
					  "title": {
						"label_en": "Activate", "label_es": "Activar"
					  },
					  requiresObjectSelected : false
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "reactivateObjectDialog",
					  "fieldText": {
						"numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
						"objectName": { "label_en": "Family to reactivate", "label_es": "Familia a Reactivar" }
					  },    
					  "listDefinition":{
						"keyFldName":"name",
						"eachEntryTextGenerator":[
						  {"value": "Name: ", "type":"fix"}, {"value": "name", "type":"field"} 
						]
					  },
					  "action": [            
						{
						  "actionName": "DEACTIVATED_STUDY_FAMILIES_LAST_N_DAYS",
						  "clientMethod": "getDeactivatedObjects",
						  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
						  "apiParams": [
							{ "query": "numDays", "element": "lotNumDays", "defaultValue": 7 },
							{ "argumentName": "studyName", "selObjectPropertyName": "study"},
						  ]
						}
					  ]
					}
				  },
				  { "actionName": "STUDY_FAMILY_ADD_INDIVIDUAL",
					"clientMethod": "dialogRequired",
					"selObjectVariableName": "selectedFamily",
					"endPointUrl": "Projects",
					"endPointParams": [
					  { "argumentName": "studyName", "internalVariableSimpleObjName":"selectedItem", "internalVariableSimpleObjProperty":"study", "ZZZselObjectPropertyName": "study"},
					  { "argumentName": "familyName", "internalVariableSimpleObjName":"selectedFamily", "internalVariableSimpleObjProperty":"name", "element": "text1" },
					  { "argumentName": "individualsList", "element": "listSelectedStudyIndividuals" }
					  // { "argumentName": "fieldsNames", "value": "undefined" },
					  // { "argumentName": "fieldsValues", "value": "undefined" }
					],
					"button": {
					  "z-icon": "add",
					  "title": {
						"label_en": "Add Individual", "label_es": "Añadir Individuo"
					  },
					  requiresObjectSelected : true
					},    
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericFormDialog",
					  "fieldText": [
						{"listSelectedStudyIndividuals": { "label_en": "Indvidual Id to Add", "label_es": "Individuo a añadir",              
						  "keyFldName":"individual_id",
						  "eachEntryTextGenerator":[                
							{"value": "Name: ", "type":"fix"}, {"value": "individual_name", "type":"field"} 
						  ]
						}}
					  ]
					}
				  },               
				  { "actionName": "STUDY_FAMILY_REMOVE_INDIVIDUAL",
					"clientMethod": "dialogRequired",
					"selObjectVariableName": "selectedFamily",
					"endPointUrl": "Projects",
					"endPointParams": [
					  { "argumentName": "studyName", "internalVariableSimpleObjName":"selectedItem", "internalVariableSimpleObjProperty":"study", "ZZZselObjectPropertyName": "study"},
					  { "argumentName": "familyName", "internalVariableSimpleObjName":"selectedFamily", "internalVariableSimpleObjProperty":"name", "element": "text1" },
					  { "argumentName": "individualId", "element": "text1" }
					],
					"button": {
					  "z-icon": "remove",
					  "title": {
						"label_en": "Unlink Individual", "label_es": "Quitar Individuo"
					  },
					  requiresObjectSelected : true
					}, 
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericFormDialog",
					  "fieldText": [
						{"text1": { "label_en": "Indvidual Id to unlink", "label_es": "Individuo a deasignar" }}
					  ]
					}
				  },      			
			]
		},
		
				"studyindividuals": {
					"component": "TableWithButtons",
					"langConfig": {		
						"title": {"label_en": "Individuals from Study ", "label_es": "Individuos Estudio "},
						"gridName": "indivgrid",
						"selectedObjectName": "selectedItem",
						"gridElementName": "study_individual",				
						"gridHeader": {
						  "individual_id": {"label_en": "Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
						  "individual_name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
						  "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
						  "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"},				}
					},
					"actions":[
						  { "actionName": "STUDY_CREATE_INDIVIDUAL",
							"clientMethod": "newStudyIndividual",
							"selObjectVariableName": "selectedIndiv",
							"endPointUrl": "Projects",
							"endPointParams": [
							  { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
							  { "argumentName": "individualName", "element": "text1" }
							  // { "argumentName": "fieldsNames", "value": "undefined" },
							  // { "argumentName": "fieldsValues", "value": "undefined" }
							],
							"button": {
							  "z-icdon": "refresh",
							  "title": {
								"label_en": "New", "label_es": "Nuevo"
							  },
							  requiresObjectSelected : false
							},   
							"dialogInfo": {
							  "requiresDialog": true,
							  "name": "genericFormDialog",
							  "fieldText": [
								{"text1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo" }}
							  ]
							}
						  },
						  { "actionName": "STUDY_INDIVIDUAL_DEACTIVATE",
							"clientMethod": "buttonActionWithoutDialog",
							"selObjectVariableName": "selectedIndiv",
							"endPointUrl": "Projects",
							"endPointParams": [
							  { "argumentName": "studyName", "selObjectPropertyName": "study"},
							  { "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
							],
							"button": {
							  "z-icon": "refresh",
							  "title": {
								"label_en": "Deactivate", "label_es": "Desactivar"
							  },
							  requiresObjectSelected : true
							},    
						  }, 
						  { "actionName": "STUDY_CREATE_INDIVIDUAL_SAMPLE",
							"clientMethod": "buttonActionWithoutDialog",
							"selObjectVariableName": "selectedIndiv",
							"endPointUrl": "Projects",
							"endPointParams": [
							  { "argumentName": "studyName", "selObjectPropertyName": "study"},
							  { "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
							],
							"button": {
							  "z-icon": "add",
							  "title": {
								"label_en": "Add Extra Sample", "label_es": "Añadir Muestra Extra"
							  },
							  requiresObjectSelected : true
							},    
						  },               
						  { "actionName": "STUDY_INDIVIDUAL_ACTIVATE",
							"endPointUrl": "Projects",  
							"endPointParams": [
							  { "argumentName": "studyName", "selObjectPropertyName": "study"},
							  { "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
							],
							"clientMethod": "openReactivateObjectDialog",
							"selObjectVariableName": "selectedIndiv",
							"button": {
							  "icon": "alarm_add",
							  "title": {
								"label_en": "Activate", "label_es": "Activar"
							  },
							  requiresObjectSelected : false
							},
							"dialogInfo": {
							  "requiresDialog": true,
							  "name": "reactivateObjectDialog",
							  "selObjectVariableName": "selectedIndiv", 
							  "fieldText": {
								"numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
								"objectName": { "label_en": "Individual to reactivate", "label_es": "Individuo a Reactivar" }
							  },    
							  "listDefinition":{
								"keyFldName":"individual_id",
								"eachEntryTextGenerator":[
								  {"value": "Name: ", "type":"fix"}, {"value": "individual_name", "type":"field"} 
								]
							  },
							  "action": [            
								{
								  "actionName": "DEACTIVATED_STUDY_INDIVIDUALS_LAST_N_DAYS",
								  "clientMethod": "getDeactivatedObjects",
								  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
								  "apiParams": [
									{ "query": "numDays", "element": "lotNumDays", "defaultValue": 7 },
									{ "argumentName": "studyName", "selObjectPropertyName": "study"},
								  ]
								}
							  ]
							}
						  },
					]
				},
				
						"studyindividualssamples": {
							"component": "TableWithButtons",
							"langConfig": {		
								"title": {"label_en": "Samples Set Samples from Study ", "label_es": "Muestras del Agrupador de Muestras Estudio "},
								"gridName": "samplesetsamplevariablegrid",
								"selectedObjectName": "selectedItem",
								"gridElementName": "selectedSampleSetSampleVariable",				
								"gridHeader": {
								  "sample_id": {"label_en": "Smp Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
								  "individual_name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
								  "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
								  "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"}
								}
							},
							"actions":[
							  { "actionName": "ADD_VARIABLE_SET_TO_STUDY_OBJECT",
								"clientMethod": "newStudyIndividual",
								"selObjectVariableName": "selectedIndivSample", 
								"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
								"endPointParams": [ 
								  { "argumentName": "studyName", "selObjectPropertyName": "study"},
								  { "argumentName": "ownerTable", "value": "study_individual_sample" },
								  { "argumentName": "ownerId", "selObjectPropertyName": "sample_id" },
								  { "argumentName": "variableSetName", "element": "listMDvariablesSet" },          
								  // { "argumentName": "fieldsNames", "value": "undefined" },
								  // { "argumentName": "fieldsValues", "value": "undefined" }
								  //individualsList
								],
								"button": {
								  "z-icdon": "refresh",
								  "title": {
									"label_en": "Add Variable Set", "label_es": "Añadir Conjunto de Variables"
								  },
								  requiresObjectSelected : false
								},   
								"dialogInfo": {
								  "requiresDialog": true,
								  "name": "genericFormDialog",
								  "fieldText": [
									{"listMDvariablesSet": { "label_en": "Variables Set", "label_es": "Conjunto Variables" }}
								  ]
								}
							  },
							  { "actionName": "ADD_VARIABLE_TO_STUDY_OBJECT",
								"clientMethod": "newStudyIndividual",
								"selObjectVariableName": "selectedIndivSample", 
								"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
								"endPointParams": [ 
								  { "argumentName": "studyName", "selObjectPropertyName": "study"},
								  { "argumentName": "ownerTable", "value": "study_individual_sample" },
								  { "argumentName": "ownerId", "selObjectPropertyName": "sample_id" },
								  { "argumentName": "variableName", "element": "listMDvariables" },          
								  // { "argumentName": "fieldsNames", "value": "undefined" },
								  // { "argumentName": "fieldsValues", "value": "undefined" }
								  //individualsList
								],
								"button": {
								  "z-icdon": "refresh",
								  "title": {
									"label_en": "Add Variable", "label_es": "Añadir Variable"
								  },
								  requiresObjectSelected : false
								},   
								"dialogInfo": {
								  "requiresDialog": true,
								  "name": "genericFormDialog",
								  "fieldText": [
									{"listMDvariables": { "label_en": "Variable", "label_es": "Variable" }}
								  ]
								}
							  },
							  { "actionName": "STUDY_INDIVIDUAL_SAMPLE_DEACTIVATE",
								"clientMethod": "buttonActionWithoutDialog",
								"selObjectVariableName": "selectedIndivSample",
								"endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
								"endPointParams": [
								  { "argumentName": "studyName", "selObjectPropertyName": "study"},
								  { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
								  { "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
								],
								"button": {
								  "z-icon": "refresh",
								  "title": {
									"label_en": "Deactivate", "label_es": "Desactivar"
								  },
								  requiresObjectSelected : true
								},    
							  }, 
							  { "actionName": "STUDY_INDIVIDUAL_SAMPLE_ACTIVATE",
							  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",  
								"endPointParams": [
								  { "argumentName": "studyName", "selObjectPropertyName": "study"},
								  { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" }
								  //{ "argumentName": "individualId", "selObjectPropertyName": "individual_id" }
								],
								"clientMethod": "openReactivateObjectDialog",
								"selObjectVariableName": "selectedIndivSample",
								"button": {
								  "icon": "alarm_add",
								  "title": {
									"label_en": "Activate", "label_es": "Activar"
								  },
								  requiresObjectSelected : false
								},
								"dialogInfo": {
								  "requiresDialog": true,
								  "name": "reactivateObjectDialog",
								  "selObjectVariableName": "selectedIndiv", 
								  "fieldText": {
									"numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
									"objectName": { "label_en": "Sample to reactivate", "label_es": "Muestra a Reactivar" }
								  },    
								  "listDefinition":{
									"keyFldName":"sample_id",
									"eachEntryTextGenerator":[
									  {"value": "Sample: ", "type":"fix"}, {"value": "sample_id", "type":"field"} 
									]
								  },
								  "action": [            
									{
									  "actionName": "DEACTIVATED_STUDY_INDIVIDUAL_SAMPLES_LAST_N_DAYS",
									  "clientMethod": "getDeactivatedObjects",
									  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions", 
									  "apiParams": [
										{ "query": "numDays", "element": "lotNumDays", "defaultValue": 7 },
										{ "argumentName": "studyName", "selObjectPropertyName": "study"},
									  ]
									}
								  ]
								}
							  },
							
							]
						},		
						"studyindividualssamplesvariables": {
							"component": "TableWithButtons",
							"langConfig": {		
								"title": {"label_en": "Samples Set Samples from Study ", "label_es": "Muestras del Agrupador de Muestras Estudio "},
								"gridName": "samplesetsamplevariablegrid",
								"selectedObjectName": "selectedItem",
								"gridElementName": "selectedSampleSetSampleVariable",				
								"gridHeader": {
								  "id": {"label_en": "Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
								  "type": {"label_en": "Type", "label_es": "Tipo", "sort": false, "filter": true, "width": "20%"},
								  "name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
								  "value": {"label_en": "Value", "label_es": "Valor", "sort": false, "filter": true, "width": "20%"}
								}
							},
							"actions":[
								{ "actionName": "STUDY_OBJECT_SET_VARIABLE_VALUE",
					  "requiresDialog": true,
						"clientMethod": "studyObjectSetVariableValue",
						"selObjectVariableName": "selectedVariable",
						"endPointUrl": "Projects",
						"endPointParams": [
						  { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
						  { "argumentName": "ownerId", "selObjectPropertyName": "owner_id" },
						  { "argumentName": "ownerTable", "selObjectPropertyName": "owner_table" },
						  { "argumentName": "variableSetName", "selObjectPropertyName": "variable_set" },
						  { "argumentName": "variableName", "selObjectPropertyName": "name" },
						  { "argumentName": "newValue", "variableName": "newResult" }
						],
						// // [{"is_mandatory?":true,"name":"studyName","type":"STRING","testing arg posic":6},
						// // {"is_mandatory?":true,"name":"variableSetName","type":"STRING","testing arg posic":7},
						// // {"is_mandatory?":true,"name":"ownerTable","type":"STRING","testing arg posic":8},
						// // {"is_mandatory?":true,"name":"ownerId","type":"STRING","testing arg posic":9},
						// // {"is_mandatory?":true,"name":"variableName","type":"STRING","testing arg posic":10},
						// // {"is_mandatory?":true,"name":"newValue","type":"STRING","testing arg posic":11}]        
						"button": {
						  "z-icdon": "refresh",
						  "title": {
							"label_en": "Set Result", "label_es": "Entrar Result"
						  },
						  requiresObjectSelected : true
						},   
						"dialogInfo": {				  
						  "name": "objectSetResultValue",
						  "fieldText": {
							"variableName": { "label_en": "Variable Name", "label_es": "Nombre Variable" },
							"value": { "label_en": "Value", "label_es": "Valor" }
							//"number1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo" },
							//"list1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo",
							//   "items": [
							//     { "keyName": "familyCorrecto", "keyValue_en": "Correct", "keyValue_es": "Correcto" },
							//     { "keyName": "familyIntentObs", "keyValue_en": "Attempt-Obs", "keyValue_es": "Intent-Obs" },
							//     { "keyName": "familyObsCorrecto", "keyValue_en": "Correct-Obs", "keyValue_es": "Correcto-Obs" },
							//     { "keyName": "familyObsIntentosCorrecto", "keyValue_en": "Corr-Attempt-Obs", "keyValue_es": "Corr-Intent-Obs" },
							//     { "keyName": "familyObsIntentoCorrectoTerminado", "keyValue_en": "Corr-Attempt-Obs-End", "keyValue_es": "Corr-Intent-Obs-Term" }
							//   ]            
							// }
						  }
						}
					  }								
							]
						},		
		

		
		"studysamplesset": {
			"component": "TableWithButtons",
			"langConfig": {		
				"title": {"label_en": "Samples Set from Study ", "label_es": "Agrupador de Muestras Estudio "},
				"gridName": "sampleSetgrid",
				"selectedObjectName": "selectedItem",
				"gridElementName": "study_samples_set",				
				"gridHeader": {
					  "name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
					  "description": {"label_en": "Description", "label_es": "Descripción", "sort": false, "filter": true, "width": "20%"},
					  "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
					  "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"}
				}
			},
			"actions":[
				  { "actionName": "STUDY_CREATE_SAMPLES_SET",
					"clientMethod": "newStudyIndividual",
					"selObjectVariableName": "selectedSampleSet",
					"endPointUrl": "Projects",
					"endPointParams": [
					  { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
					  { "argumentName": "samplesSetName", "element": "text1" }
					  // { "argumentName": "fieldsNames", "value": "undefined" },
					  // { "argumentName": "fieldsValues", "value": "undefined" }
					],
					"button": {
					  "z-icdon": "refresh",
					  "title": {
						"label_en": "New", "label_es": "Nuevo"
					  },
					  requiresObjectSelected : false
					},   
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericFormDialog",
					  "fieldText": [
						{"text1": { "label_en": "new Sample Set Name", "label_es": "Nombre nuevo Agrupador Muestras" }}
					  ]
					}
				  },
				  { "actionName": "STUDY_SAMPLES_SET_DEACTIVATE",
					"clientMethod": "buttonActionWithoutDialog",
					"selObjectVariableName": "selectedSampleSet",
					"endPointUrl": "Projects",
					"endPointParams": [
					  { "argumentName": "studyName", "selObjectPropertyName": "study"},
					  { "argumentName": "samplesSetName", "selObjectPropertyName": "name" }
					],
					"button": {
					  "z-icon": "refresh",
					  "title": {
						"label_en": "Deactivate", "label_es": "Desactivar"
					  },
					  requiresObjectSelected : true
					},    
				  }, 
				  { "actionName": "STUDY_SAMPLES_SET_ACTIVATE",
					"endPointUrl": "Projects",  
					"endPointParams": [
					  { "argumentName": "studyName", "selObjectPropertyName": "study"},
					  { "argumentName": "samplesSetName", "selObjectPropertyName": "name" }
					],
					"clientMethod": "openReactivateObjectDialog",
					"selObjectVariableName": "selectedSampleSet",
					"button": {
					  "icon": "alarm_add",
					  "title": {
						"label_en": "Activate", "label_es": "Activar"
					  },
					  requiresObjectSelected : false
					},
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "reactivateObjectDialog",
					  "selObjectVariableName": "selectedSampleSet", 
					  "fieldText": {
						"numDays": { "label_en": "Number of Days", "label_es": "Número de Días" },
						"objectName": { "label_en": "Samples Set to reactivate", "label_es": "Agrupador a Reactivar" }
					  },    
					  "listDefinition":{
						"keyFldName":"name",
						"eachEntryTextGenerator":[
						  {"value": "Name: ", "type":"fix"}, {"value": "name", "type":"field"} 
						]
					  },
					  "action": [            
						{
						  "actionName": "DEACTIVATED_STUDY_SAMPLES_SET_LAST_N_DAYS",
						  "clientMethod": "getDeactivatedObjects",
						  "endPoint": "/moduleclinicalstudy/ClinicalStudyAPIactions",
						  "apiParams": [
							{ "query": "numDays", "element": "lotNumDays", "defaultValue": 7 },
							{ "argumentName": "studyName", "selObjectPropertyName": "study"},
						  ]
						}
					  ]
					}
				  },
				  { "actionName": "STUDY_SAMPLES_SET_ADD_SAMPLE",
					"clientMethod": "dialogRequired",
					"selObjectVariableName": "selectedSampleSet",
					"endPointUrl": "Projects",
					"endPointParams": [
					  { "argumentName": "studyName", "internalVariableSimpleObjName":"selectedItem", "internalVariableSimpleObjProperty":"study", "ZZZselObjectPropertyName": "study"},
					  { "argumentName": "samplesSetName", "selObjectPropertyName":"name"},
					  { "argumentName": "sampleId", "element": "text1" }
					  // { "argumentName": "fieldsNames", "value": "undefined" },
					  // { "argumentName": "fieldsValues", "value": "undefined" }
					],
					"button": {
					  "z-icon": "add",
					  "title": {
						"label_en": "Add Sample", "label_es": "Añadir Muestra"
					  },
					  requiresObjectSelected : true
					},    
					"dialogInfo": {
					  "requiresDialog": true,
					  "name": "genericFormDialog",
					  "fieldText": [
						{"text1": { "label_en": "Sample to Add", "label_es": "Muestra a añadir" }}
					  ]
					}
				  }              
			]
		},		
				"studysamplessetsample": {
					"component": "TableWithButtons",
					"langConfig": {		
						"title": {"label_en": "Samples Set Samples from Study ", "label_es": "Muestras del Agrupador de Muestras Estudio "},
						"gridName": "samplesetsamplesgrid",
						"selectedObjectName": "selectedItem",
						"gridElementName": "selectedSampleSetSample",				
						"gridHeader": {
						  "sample_id": {"label_en": "Smp Id", "label_es": "Id", "sort": false, "filter": true, "is_icon": true, "width": "10%"},
						  "individual_name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "width": "20%"},
						  "created_by": {"label_en": "Created By", "label_es": "Creado Por", "sort": false, "filter": true, "width": "20%"},
						  "created_on": {"label_en": "Creation Date", "label_es": "F.Creación", "sort": false, "filter": true, "width": "20%"},	
						}
					},
					"actions":[
					
					]
				},
				
				"samplesetsamplevariablegrid": {
					"component": "TableWithButtons",
					"langConfig": {		
						"title": {"label_en": "Samples Set Samples from Study ", "label_es": "Muestras del Agrupador de Muestras Estudio "},
						"gridName": "samplesetsamplevariablegrid",
						"selectedObjectName": "selectedItem",
						"gridElementName": "selectedSampleSetSampleVariable",				
						"gridHeader": {
						}
					},
					"actions":[
								{ "actionName": "STUDY_OBJECT_SET_VARIABLE_VALUE",
					  "requiresDialog": true,
						"clientMethod": "studyObjectSetVariableValue",
						"selObjectVariableName": "selectedVariable",
						"endPointUrl": "Projects",
						"endPointParams": [
						  { "argumentName": "studyName", "ZZZselObjectPropertyName": "study"},
						  { "argumentName": "ownerId", "selObjectPropertyName": "owner_id" },
						  { "argumentName": "ownerTable", "selObjectPropertyName": "owner_table" },
						  { "argumentName": "variableSetName", "selObjectPropertyName": "variable_set" },
						  { "argumentName": "variableName", "selObjectPropertyName": "name" },
						  { "argumentName": "newValue", "variableName": "newResult" }
						],
						// // [{"is_mandatory?":true,"name":"studyName","type":"STRING","testing arg posic":6},
						// // {"is_mandatory?":true,"name":"variableSetName","type":"STRING","testing arg posic":7},
						// // {"is_mandatory?":true,"name":"ownerTable","type":"STRING","testing arg posic":8},
						// // {"is_mandatory?":true,"name":"ownerId","type":"STRING","testing arg posic":9},
						// // {"is_mandatory?":true,"name":"variableName","type":"STRING","testing arg posic":10},
						// // {"is_mandatory?":true,"name":"newValue","type":"STRING","testing arg posic":11}]        
						"button": {
						  "z-icdon": "refresh",
						  "title": {
							"label_en": "Set Result", "label_es": "Entrar Result"
						  },
						  requiresObjectSelected : true
						},   
						"dialogInfo": {				  
						  "name": "objectSetResultValue",
						  "fieldText": {
							"variableName": { "label_en": "Variable Name", "label_es": "Nombre Variable" },
							"value": { "label_en": "Value", "label_es": "Valor" }
							//"number1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo" },
							//"list1": { "label_en": "new Individual Name", "label_es": "Nombre Nuevo Individuo",
							//   "items": [
							//     { "keyName": "familyCorrecto", "keyValue_en": "Correct", "keyValue_es": "Correcto" },
							//     { "keyName": "familyIntentObs", "keyValue_en": "Attempt-Obs", "keyValue_es": "Intent-Obs" },
							//     { "keyName": "familyObsCorrecto", "keyValue_en": "Correct-Obs", "keyValue_es": "Correcto-Obs" },
							//     { "keyName": "familyObsIntentosCorrecto", "keyValue_en": "Corr-Attempt-Obs", "keyValue_es": "Corr-Intent-Obs" },
							//     { "keyName": "familyObsIntentoCorrectoTerminado", "keyValue_en": "Corr-Attempt-Obs-End", "keyValue_es": "Corr-Intent-Obs-Term" }
							//   ]            
							// }
						  }
						}
					  }													
					]
				},		
	}
}
export const InvDraft = {
  "TrackingChanges":{
	  "version": 0.1,
	  "last change on (YYYYMMDD)": "Begin"
  },
  "ModuleSettings":{
	  "actionsEndpoints":[
		{ "name": "InventoryLot" , "url" : "/app/procs/InvTrackingAPIactions"}
	  ]
  },
  "InventoryLotsGeneral": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "InventoryLots.1": {
          "label_en": "Active Inventory Lots",
          "label_es": "Lotes de inventario activos"
        }
      },
      "gridHeader": {
        "category": {
          "label_en": "Category", "label_es": "Categoría", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "reference": {
          "label_en": "Reference", "label_es": "Referencia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "lot_name": {
          "label_en": "Name", "label_es": "lot_id", "Nombre": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "status": {
          "label_en": "Status", "label_es": "Estado", "sort": false, "filter": true, "width": "10%"
        },
        "volume": {
          "label_en": "volume", "label_es": "volumen", "sort": false, "filter": true, "width": "10%"
        },
        "volume_uom": {
          "label_en": "uom", "label_es": "uom", "sort": false, "filter": true, "width": "10%"
        }
      }
    },
    "viewQuery":{ "actionName": "ALL_INVENTORY_LOTS",
      "endPoint": "/app/procs/InvTrackingAPIqueries",
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
		{"actionName": "NEW_INVENTORY_LOT",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "reference", "element": "text1", "defaultValue": ""  },
          { "argumentName": "category", "element": "list1", "defaultValue": "" },
          { "argumentName": "lotName", "element": "text2", "defaultValue": "" },
		  { "argumentName": "volume", "element": "number1", "defaultValue": "" },
		  { "argumentName": "volumeUom", "fixValue": "mL" },
          { "argumentName": "expiryDate", "element": "date1", "defaultValue": "" },
		  { "argumentName": "expiryDateInUse", "element": "date2", "defaultValue": ""},
		  { "argumentName": "retestDate", "element": "date3", "defaultValue": "" },
		  { "argumentName": "vendor", "element": "text3", "defaultValue": "" },
		  { "argumentName": "vendorLot", "element": "text4", "defaultValue": "" },
		  { "argumentName": "vendorReference", "element": "text5", "defaultValue": "" },
		  { "argumentName": "purity", "element": "text6", "defaultValue": "" },
		  { "argumentName": "conservationCondition", "element": "text7", "defaultValue": "" },
                  { "argumentName": "numEntries", "element": "number2", "defaultValue": "" }
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
			{"list1": {
			  "label_en": "Category", "label_es": "Categoría", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"propertyNameContainer": "category_and_references",
				"propertyNameContainerLevelPropertyKeyName": "name",
				"propertyKeyName": "name", "propertyKeyValueEn": "name", "propertyKeyValueEs": "name"
			  }			
			}},
			{"text1": { "label_en": "Reference", "label_es": "Referencia" }},
            {"text2": { "label_en": "lot id", "label_es": "id Lote" }},
			{"number1": {"label_en": "Volume", "label_es": "Volumen", "optional": true }},			
            {"date1": {"label_en": "Expiry Date", "label_es": "Fecha Caducidad", "optional": true }},
            {"date2": {"label_en": "Expiry Date In Use", "label_es": "Fecha Caducidad En Uso", "optional": true }},
            {"date3": {"label_en": "Retest Date", "label_es": "Fecha Retest", "optional": true }},
			{"text3": { "label_en": "Vendor", "label_es": "Proveedor", "optional": true }},			
			{"text4": { "label_en": "Vendor Lot", "label_es": "Lote de Proveedor", "optional": true }},			
			{"text5": { "label_en": "Vendor Reference", "label_es": "Referencia de Proveedor", "optional": true }},			
			{"text6": { "label_en": "Purity", "label_es": "Pureza", "optional": true }},			
			{"text7": { "label_en": "Conservation Condition", "label_es": "Condición de Conservación", "optional": true }},
            {"number2": {"label_en": "Number of Entries", "label_es": "Número de entradas", "optional": true, "default_value": 1 }}		
          ]
        }
      },
		{"actionName": "AUDIT_FOR_GIVEN_INVENTORY_LOT",	  
			"requiresDialog": true,
			"endPoint": "/app/procs/InvTrackingAPIqueries",
			"button": {
			  "icon": "rule",
			  "title": {
				"label_en": "Lot Audit", "label_es": "Auditoría de Lote"
			  },
			  "requiresGridItemSelected": true
			},
			"clientMethod": "getObjectAuditInfo",
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" }
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
						{ "argumentName": "lotName", "selObjectPropertyName": "name" }
					  ]
				  },
				  "endPointUrl": "Samples",
				  "clientMethod": "signAudit",
				  "endPointParams": [
					{ "argumentName": "lotName", "selObjectPropertyName": "name" },
					{ "argumentName": "auditId", "targetValue": true }
				  ]
				}
				]
			}
		},
		{"actionName": "TURN_LOT_UNAVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "deactivate.svg",
			  "title": {
				"label_en": "Turn Unavailable", "label_es": "Poner NO Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": [{
				"column": "status", "value": "AVAILABLE_FOR_USER"
			  }]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }			  
			]
		},
		{"actionName": "TURN_LOT_AVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "activate.svg",
			  "title": {
				"label_en": "Turn Available", "label_es": "Poner Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "xshowWhenSelectedItem": [
				{"column": "is_locked", "value": false},
				{"column": "status", "value": "NEW|QUARANTINE"}			
			]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }
			]
		},
	
		{"actionName": "QUALIFIFICATION_EVENT_VARIABLES",
			"requiresDialog": true,
			"alertMsg": {
				"empty": { "label_en": "No pending variables to enter result", "label_es": "No hay variables pendientes de resultados" }
			},
			"button": {
				"icon": "document_scanner",
				"title": {"label_en": "Enter Value", "label_es": "Ingrese el Valor"},
				"requiresGridItemSelected": true,
				"showWhenSelectedItem": 				
					{"column": "status", "value": "QUARANTINE"}
			},
			"resultHeader": {
				"id": {"label_en": "Id", "label_es": "Id", "width": "10%"},
				"param_name": {"label_en": "Parameter", "label_es": "Parámetro"},
				"value": {"label_en": "Value", "label_es": "Valor"}
			},
			"resultHeaderObjectLabelTopLeft": {
				"label_en": "Lot Qualification:", "label_es": "Cualificación de Lote :"
			},    
			"dialogInfo": { 
				"name": "resultDialog",
				"subQueryName": "getResult",		  
				"viewQuery": {
					"actionName": "QUALIFIFICATION_EVENT_VARIABLES",
					"endPoint": "/app/procs/InvTrackingAPIqueries",
					"endPointParams": [				  
						{ "argumentName": "lotName", "selObjectPropertyName": "lot_name"},
						{ "argumentName": "category", "selObjectPropertyName": "category"},
						{ "argumentName": "reference", "selObjectPropertyName": "reference"}
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
							{ "argumentName": "certifId", "selObjectPropertyName": "certif_id" },
							{ "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
							{ "argumentName": "category", "selObjectPropertyName": "category"},
							{ "argumentName": "reference", "selObjectPropertyName": "reference"},
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
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list8": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification", "label_es": "Completar Cualificación"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list8" }
			]
		},
		{"actionName": "CONSUME_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Consume", "label_es": "Consumir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to consume", "label_es": "Volumen a consumir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADJUST_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Adjust", "label_es": "Ajustar"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status", 
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Adjust (new)volume", "label_es": "(Nuevo)Volumen a ajustar" }}
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADD_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Add", "label_es": "Añadir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to add", "label_es": "Volumen a añadir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		}	
    ]
  },   
  "InventoryLotsMediosDeCultivo": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "InventoryLots.MediosDeCultivo": {
          "label_en": "Active Inventory Lots",
          "label_es": "Lotes de inventario activos"
        }
      },
      "gridHeader": {
        "category": {
          "label_en": "Category", "label_es": "Categoría", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "reference": {
          "label_en": "Reference", "label_es": "Referencia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "lot_name": {
          "label_en": "Name", "label_es": "lot_id", "Nombre": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "status": {
          "label_en": "Status", "label_es": "Estado", "sort": false, "filter": true, "width": "10%"
        },
        "volume": {
          "label_en": "volume", "label_es": "volumen", "sort": false, "filter": true, "width": "10%"
        },
        "volume_uom": {
          "label_en": "uom", "label_es": "uom", "sort": false, "filter": true, "width": "10%"
        }
      }
    },
    "viewQuery":{ "actionName": "ALL_INVENTORY_LOTS",
      "endPoint": "/app/procs/InvTrackingAPIqueries",
	  "endPointParams": [
          { "argumentName": "category", "fixValue": "Medios de Cultivo"}
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
		{"actionName": "NEW_INVENTORY_LOT",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "reference", "element": "list1", "defaultValue": ""  },
          { "argumentName": "category", "fixValue": "Medios de Cultivo"},
          { "argumentName": "lotName", "element": "text2", "defaultValue": "" },
		  { "argumentName": "volume", "element": "number1", "defaultValue": "" },
		  { "argumentName": "volumeUom", "fixValue": "mL" },
          { "argumentName": "expiryDate", "element": "date1", "defaultValue": "" },
		  { "argumentName": "expiryDateInUse", "element": "date2", "defaultValue": ""},
		  { "argumentName": "retestDate", "element": "date3", "defaultValue": "" },
		  { "argumentName": "vendor", "element": "text3", "defaultValue": "" },
		  { "argumentName": "vendorLot", "element": "text4", "defaultValue": "" },
		  { "argumentName": "vendorReference", "element": "text5", "defaultValue": "" },
		  { "argumentName": "purity", "element": "text6", "defaultValue": "" },
		  { "argumentName": "conservationCondition", "element": "text7", "defaultValue": "" },
          { "argumentName": "numEntries", "element": "number2", "defaultValue": "" }
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
			{"list1": {
			  "label_en": "Reference", "label_es": "Referencia", "optional": false,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"filterInFirstLevel": true, "elementName":"list1",
				"propertyNameContainer": "category_and_references",
				"propertyNameContainerLevelPropertyKeyName": "name",
				"propertyNameContainerLevelfixValue": "Medios de Cultivo",
				"propertyNameContainerLevel2": "inv_reference",
				"propertyKeyName": "name", "propertyKeyValueEn": "name", "propertyKeyValueEs": "name"
			  }			
			}},
            {"text2": { "label_en": "lot id", "label_es": "id Lote" }},
			{"number1": {"label_en": "Volume", "label_es": "Volumen", "optional": true }},			
            {"date1": {"label_en": "Expiry Date", "label_es": "Fecha Caducidad", "optional": true }},
            {"date2": {"label_en": "Expiry Date In Use", "label_es": "Fecha Caducidad En Uso", "optional": true }},
            {"date3": {"label_en": "Retest Date", "label_es": "Fecha Retest", "optional": true }},
			{"text3": { "label_en": "Vendor", "label_es": "Proveedor", "optional": true }},			
			{"text4": { "label_en": "Vendor Lot", "label_es": "Lote de Proveedor", "optional": true }},			
			{"text5": { "label_en": "Vendor Reference", "label_es": "Referencia de Proveedor", "optional": true }},			
			{"text6": { "label_en": "Purity", "label_es": "Pureza", "optional": true }},			
			{"text7": { "label_en": "Conservation Condition", "label_es": "Condición de Conservación", "optional": true }},
            {"number2": {"label_en": "Number of Entries", "label_es": "Número de entradas", "optional": true, "default_value": 1 }}		
          ]
        }
      },
		{"actionName": "AUDIT_FOR_GIVEN_INVENTORY_LOT",	  
			"requiresDialog": true,
			"endPoint": "/app/procs/InvTrackingAPIqueries",
			"button": {
			  "icon": "rule",
			  "title": {
				"label_en": "Lot Audit", "label_es": "Auditoría de Lote"
			  },
			  "requiresGridItemSelected": true
			},
			"clientMethod": "getObjectAuditInfo",
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" }
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
						{ "argumentName": "lotName", "selObjectPropertyName": "name" }
					  ]
				  },
				  "endPointUrl": "Samples",
				  "clientMethod": "signAudit",
				  "endPointParams": [
					{ "argumentName": "lotName", "selObjectPropertyName": "name" },
					{ "argumentName": "auditId", "targetValue": true }
				  ]
				}
				]
			}
		},
		{"actionName": "TURN_LOT_UNAVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "deactivate.svg",
			  "title": {
				"label_en": "Turn Unavailable", "label_es": "Poner NO Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": [{
				"column": "status", "value": "AVAILABLE_FOR_USER"
			  }]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }			  
			]
		},
		{"actionName": "TURN_LOT_AVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "activate.svg",
			  "title": {
				"label_en": "Turn Available", "label_es": "Poner Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "xshowWhenSelectedItem": [
				{"column": "is_locked", "value": false},
				{"column": "status", "value": "NEW|QUARANTINE"}			
			]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }
			]
		},
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list8": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification", "label_es": "Completar Cualificación"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list8" }
			]
		},
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list9": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification + Available", "label_es": "Completar Cualificación + Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list9" },
			  { "argumentName": "turn_available_lot", "fixValue": "true" }			  
			]
		},		
		{"actionName": "CONSUME_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Consume", "label_es": "Consumir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to consume", "label_es": "Volumen a consumir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADJUST_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Adjust", "label_es": "Ajustar"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status", 
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Adjust (new)volume", "label_es": "(Nuevo)Volumen a ajustar" }}
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADD_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Add", "label_es": "Añadir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to add", "label_es": "Volumen a añadir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		}	
    ]
  }, 
  "InventoryLotsEstandPrim": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "InventoryLots.EstandarPrim": {
          "label_en": "Active Inventory Lots",
          "label_es": "Lotes de inventario activos"
        }
      },
      "gridHeader": {
        "category": {
          "label_en": "Category", "label_es": "Categoría", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "reference": {
          "label_en": "Reference", "label_es": "Referencia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "lot_name": {
          "label_en": "Name", "label_es": "lot_id", "Nombre": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "status": {
          "label_en": "Status", "label_es": "Estado", "sort": false, "filter": true, "width": "10%"
        },
        "volume": {
          "label_en": "volume", "label_es": "volumen", "sort": false, "filter": true, "width": "10%"
        },
        "volume_uom": {
          "label_en": "uom", "label_es": "uom", "sort": false, "filter": true, "width": "10%"
        }
      }
    },
    "viewQuery":{ "actionName": "ALL_INVENTORY_LOTS",
      "endPoint": "/app/procs/InvTrackingAPIqueries",
	  "endPointParams": [
          { "argumentName": "category", "fixValue": "Estándares Primarios"}
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
		{"actionName": "NEW_INVENTORY_LOT",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "reference", "element": "list1", "defaultValue": ""  },
          { "argumentName": "category", "fixValue": "Estándares Primarios"},
          { "argumentName": "lotName", "element": "text2", "defaultValue": "" },
		  { "argumentName": "volume", "element": "number1", "defaultValue": "" },
		  { "argumentName": "volumeUom", "fixValue": "mL" },
          { "argumentName": "expiryDate", "element": "date1", "defaultValue": "" },
		  { "argumentName": "expiryDateInUse", "element": "date2", "defaultValue": ""},
		  { "argumentName": "retestDate", "element": "date3", "defaultValue": "" },
		  { "argumentName": "vendor", "element": "text3", "defaultValue": "" },
		  { "argumentName": "vendorLot", "element": "text4", "defaultValue": "" },
		  { "argumentName": "vendorReference", "element": "text5", "defaultValue": "" },
		  { "argumentName": "purity", "element": "text6", "defaultValue": "" },
		  { "argumentName": "conservationCondition", "element": "text7", "defaultValue": "" },
          { "argumentName": "numEntries", "element": "number2", "defaultValue": "" }
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
			{"list1": {
			  "items": [
			  { "keyName": "Estándares Primarios", "keyValue_en": "Estándares Primarios", "keyValue_es": "Estándares Primarios" }
			  ],
			  "label_en": "Reference", "label_es": "Referencia", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"filterInFirstLevel": true, "elementName":"list1",
				"propertyNameContainer": "category_and_references",
				"propertyNameContainerLevelPropertyKeyName": "name",
				"propertyNameContainerLevelfixValue": "Estándares Primarios",
				"propertyNameContainerLevel2": "inv_reference",
				"propertyKeyName": "name", "propertyKeyValueEn": "name", "propertyKeyValueEs": "name"
			  }			
			}},
            {"text2": { "label_en": "lot id", "label_es": "id Lote" }},
			{"number1": {"label_en": "Volume", "label_es": "Volumen", "optional": true }},			
            {"date1": {"label_en": "Expiry Date", "label_es": "Fecha Caducidad", "optional": true }},
            {"date2": {"label_en": "Expiry Date In Use", "label_es": "Fecha Caducidad En Uso", "optional": true }},
            {"date3": {"label_en": "Retest Date", "label_es": "Fecha Retest", "optional": true }},
			{"text3": { "label_en": "Vendor", "label_es": "Proveedor", "optional": true }},			
			{"text4": { "label_en": "Vendor Lot", "label_es": "Lote de Proveedor", "optional": true }},			
			{"text5": { "label_en": "Vendor Reference", "label_es": "Referencia de Proveedor", "optional": true }},			
			{"text6": { "label_en": "Purity", "label_es": "Pureza", "optional": true }},			
			{"text7": { "label_en": "Conservation Condition", "label_es": "Condición de Conservación", "optional": true }},
            {"number2": {"label_en": "Number of Entries", "label_es": "Número de entradas", "optional": true, "default_value": 1 }}		
          ]
        }
      },
		{"actionName": "AUDIT_FOR_GIVEN_INVENTORY_LOT",	  
			"requiresDialog": true,
			"endPoint": "/app/procs/InvTrackingAPIqueries",
			"button": {
			  "icon": "rule",
			  "title": {
				"label_en": "Lot Audit", "label_es": "Auditoría de Lote"
			  },
			  "requiresGridItemSelected": true
			},
			"clientMethod": "getObjectAuditInfo",
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" }
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
						{ "argumentName": "lotName", "selObjectPropertyName": "name" }
					  ]
				  },
				  "endPointUrl": "Samples",
				  "clientMethod": "signAudit",
				  "endPointParams": [
					{ "argumentName": "lotName", "selObjectPropertyName": "name" },
					{ "argumentName": "auditId", "targetValue": true }
				  ]
				}
				]
			}
		},
		{"actionName": "TURN_LOT_UNAVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "deactivate.svg",
			  "title": {
				"label_en": "Turn Unavailable", "label_es": "Poner NO Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": [{
				"column": "status", "value": "AVAILABLE_FOR_USER"
			  }]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }			  
			]
		},
		{"actionName": "TURN_LOT_AVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "activate.svg",
			  "title": {
				"label_en": "Turn Available", "label_es": "Poner Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "xshowWhenSelectedItem": [
				{"column": "is_locked", "value": false},
				{"column": "status", "value": "NEW|QUARANTINE"}			
			]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }
			]
		},
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list8": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification", "label_es": "Completar Cualificación"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list8" }
			]
		},
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list9": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification + Available", "label_es": "Completar Cualificación + Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list9" },
			  { "argumentName": "turn_available_lot", "fixValue": "true" }			  
			]
		},		
		{"actionName": "CONSUME_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Consume", "label_es": "Consumir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to consume", "label_es": "Volumen a consumir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADJUST_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Adjust", "label_es": "Ajustar"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status", 
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Adjust (new)volume", "label_es": "(Nuevo)Volumen a ajustar" }}
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADD_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Add", "label_es": "Añadir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to add", "label_es": "Volumen a añadir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		}	
    ]
  }, 
  "InventoryLotsEstandSec": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "InventoryLots.EstandSec": {
          "label_en": "Active Inventory Lots",
          "label_es": "Lotes de inventario activos"
        }
      },
      "gridHeader": {
        "category": {
          "label_en": "Category", "label_es": "Categoría", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "reference": {
          "label_en": "Reference", "label_es": "Referencia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "lot_name": {
          "label_en": "Name", "label_es": "lot_id", "Nombre": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "status": {
          "label_en": "Status", "label_es": "Estado", "sort": false, "filter": true, "width": "10%"
        },
        "volume": {
          "label_en": "volume", "label_es": "volumen", "sort": false, "filter": true, "width": "10%"
        },
        "volume_uom": {
          "label_en": "uom", "label_es": "uom", "sort": false, "filter": true, "width": "10%"
        }
      }
    },
    "viewQuery":{ "actionName": "ALL_INVENTORY_LOTS",
      "endPoint": "/app/procs/InvTrackingAPIqueries",
	  "endPointParams": [
          { "argumentName": "category", "fixValue": "Estándares Secundarios"}
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
		{"actionName": "NEW_INVENTORY_LOT",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "reference", "element": "list1", "defaultValue": ""  },
          { "argumentName": "category", "fixValue": "Estándares Secundarios"},
          { "argumentName": "lotName", "element": "text2", "defaultValue": "" },
		  { "argumentName": "volume", "element": "number1", "defaultValue": "" },
		  { "argumentName": "volumeUom", "fixValue": "mL" },
          { "argumentName": "expiryDate", "element": "date1", "defaultValue": "" },
		  { "argumentName": "expiryDateInUse", "element": "date2", "defaultValue": ""},
		  { "argumentName": "retestDate", "element": "date3", "defaultValue": "" },
		  { "argumentName": "vendor", "element": "text3", "defaultValue": "" },
		  { "argumentName": "vendorLot", "element": "text4", "defaultValue": "" },
		  { "argumentName": "vendorReference", "element": "text5", "defaultValue": "" },
		  { "argumentName": "purity", "element": "text6", "defaultValue": "" },
		  { "argumentName": "conservationCondition", "element": "text7", "defaultValue": "" },
          { "argumentName": "numEntries", "element": "number2", "defaultValue": "" }
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
			{"list1": {
			  "items": [
			  { "keyName": "Estándares Secundarios", "keyValue_en": "Estándares Secundarios", "keyValue_es": "Estándares Secundarios" }
			  ],
			  "label_en": "Reference", "label_es": "Referencia", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"filterInFirstLevel": true, "elementName":"list1",
				"propertyNameContainer": "category_and_references",
				"propertyNameContainerLevelPropertyKeyName": "name",
				"propertyNameContainerLevelfixValue": "Estándares Secundarios",
				"propertyNameContainerLevel2": "inv_reference",
				"propertyKeyName": "name", "propertyKeyValueEn": "name", "propertyKeyValueEs": "name"
			  }			
			}},
            {"text2": { "label_en": "lot id", "label_es": "id Lote" }},
			{"number1": {"label_en": "Volume", "label_es": "Volumen", "optional": true }},			
            {"date1": {"label_en": "Expiry Date", "label_es": "Fecha Caducidad", "optional": true }},
            {"date2": {"label_en": "Expiry Date In Use", "label_es": "Fecha Caducidad En Uso", "optional": true }},
            {"date3": {"label_en": "Retest Date", "label_es": "Fecha Retest", "optional": true }},
			{"text3": { "label_en": "Vendor", "label_es": "Proveedor", "optional": true }},			
			{"text4": { "label_en": "Vendor Lot", "label_es": "Lote de Proveedor", "optional": true }},			
			{"text5": { "label_en": "Vendor Reference", "label_es": "Referencia de Proveedor", "optional": true }},			
			{"text6": { "label_en": "Purity", "label_es": "Pureza", "optional": true }},			
			{"text7": { "label_en": "Conservation Condition", "label_es": "Condición de Conservación", "optional": true }},
            {"number2": {"label_en": "Number of Entries", "label_es": "Número de entradas", "optional": true, "default_value": 1 }}		
          ]
        }
      },
		{"actionName": "AUDIT_FOR_GIVEN_INVENTORY_LOT",	  
			"requiresDialog": true,
			"endPoint": "/app/procs/InvTrackingAPIqueries",
			"button": {
			  "icon": "rule",
			  "title": {
				"label_en": "Lot Audit", "label_es": "Auditoría de Lote"
			  },
			  "requiresGridItemSelected": true
			},
			"clientMethod": "getObjectAuditInfo",
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" }
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
						{ "argumentName": "lotName", "selObjectPropertyName": "name" }
					  ]
				  },
				  "endPointUrl": "Samples",
				  "clientMethod": "signAudit",
				  "endPointParams": [
					{ "argumentName": "lotName", "selObjectPropertyName": "name" },
					{ "argumentName": "auditId", "targetValue": true }
				  ]
				}
				]
			}
		},
		{"actionName": "TURN_LOT_UNAVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "deactivate.svg",
			  "title": {
				"label_en": "Turn Unavailable", "label_es": "Poner NO Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": [{
				"column": "status", "value": "AVAILABLE_FOR_USER"
			  }]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }			  
			]
		},
		{"actionName": "TURN_LOT_AVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "activate.svg",
			  "title": {
				"label_en": "Turn Available", "label_es": "Poner Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "xshowWhenSelectedItem": [
				{"column": "is_locked", "value": false},
				{"column": "status", "value": "NEW|QUARANTINE"}			
			]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }
			]
		},
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list8": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification", "label_es": "Completar Cualificación"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list8" }
			]
		},
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list9": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification + Available", "label_es": "Completar Cualificación + Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list9" },
			  { "argumentName": "turn_available_lot", "fixValue": "true" }			  
			]
		},		
		{"actionName": "CONSUME_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Consume", "label_es": "Consumir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to consume", "label_es": "Volumen a consumir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADJUST_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Adjust", "label_es": "Ajustar"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status", 
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Adjust (new)volume", "label_es": "(Nuevo)Volumen a ajustar" }}
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADD_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Add", "label_es": "Añadir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to add", "label_es": "Volumen a añadir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		}	
    ]
  }, 
  "InventoryLotsMatFung": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "InventoryLots.MaterialFungible": {
          "label_en": "Active Inventory Lots",
          "label_es": "Lotes de inventario activos"
        }
      },
      "gridHeader": {
        "category": {
          "label_en": "Category", "label_es": "Categoría", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "reference": {
          "label_en": "Reference", "label_es": "Referencia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "lot_name": {
          "label_en": "Name", "label_es": "lot_id", "Nombre": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "status": {
          "label_en": "Status", "label_es": "Estado", "sort": false, "filter": true, "width": "10%"
        },
        "volume": {
          "label_en": "volume", "label_es": "volumen", "sort": false, "filter": true, "width": "10%"
        },
        "volume_uom": {
          "label_en": "uom", "label_es": "uom", "sort": false, "filter": true, "width": "10%"
        }
      }
    },
    "viewQuery":{ "actionName": "ALL_INVENTORY_LOTS",
      "endPoint": "/app/procs/InvTrackingAPIqueries",
	  "endPointParams": [
          { "argumentName": "category", "fixValue": "Material Fungible"}
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
		{"actionName": "NEW_INVENTORY_LOT",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "reference", "element": "list1", "defaultValue": "" },
          { "argumentName": "category", "fixValue": "Material Fungible"},
          { "argumentName": "lotName", "element": "text2", "defaultValue": "" },
		  { "argumentName": "volume", "element": "number1", "defaultValue": "" },
		  { "argumentName": "volumeUom", "fixValue": "mL" },
          { "argumentName": "expiryDate", "element": "date1", "defaultValue": "" },
		  { "argumentName": "expiryDateInUse", "element": "date2", "defaultValue": ""},
		  { "argumentName": "retestDate", "element": "date3", "defaultValue": "" },
		  { "argumentName": "vendor", "element": "text3", "defaultValue": "" },
		  { "argumentName": "vendorLot", "element": "text4", "defaultValue": "" },
		  { "argumentName": "vendorReference", "element": "text5", "defaultValue": "" },
		  { "argumentName": "purity", "element": "text6", "defaultValue": "" },
		  { "argumentName": "conservationCondition", "element": "text7", "defaultValue": "" },
          { "argumentName": "numEntries", "element": "number2", "defaultValue": "" }
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
			{"list1": {
			  "items": [
			  { "keyName": "Material Fungible", "keyValue_en": "Material Fungible", "keyValue_es": "Material Fungible" }
			  ],
			  "label_en": "Reference", "label_es": "Referencia", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"filterInFirstLevel": true, "elementName":"list1",
				"propertyNameContainer": "category_and_references",
				"propertyNameContainerLevelPropertyKeyName": "name",
				"propertyNameContainerLevelfixValue": "Material Fungible",
				"propertyNameContainerLevel2": "inv_reference",
				"propertyKeyName": "name", "propertyKeyValueEn": "name", "propertyKeyValueEs": "name"
			  }			
			}},
            {"text2": { "label_en": "lot id", "label_es": "id Lote" }},
			{"number1": {"label_en": "Volume", "label_es": "Volumen", "optional": true }},			
            {"date1": {"label_en": "Expiry Date", "label_es": "Fecha Caducidad", "optional": true }},
            {"date2": {"label_en": "Expiry Date In Use", "label_es": "Fecha Caducidad En Uso", "optional": true }},
            {"date3": {"label_en": "Retest Date", "label_es": "Fecha Retest", "optional": true }},
			{"text3": { "label_en": "Vendor", "label_es": "Proveedor", "optional": true }},			
			{"text4": { "label_en": "Vendor Lot", "label_es": "Lote de Proveedor", "optional": true }},			
			{"text5": { "label_en": "Vendor Reference", "label_es": "Referencia de Proveedor", "optional": true }},			
			{"text6": { "label_en": "Purity", "label_es": "Pureza", "optional": true }},			
			{"text7": { "label_en": "Conservation Condition", "label_es": "Condición de Conservación", "optional": true }},
            {"number2": {"label_en": "Number of Entries", "label_es": "Número de entradas", "optional": true, "default_value": 1 }}		
          ]
        }
      },
		{"actionName": "AUDIT_FOR_GIVEN_INVENTORY_LOT",	  
			"requiresDialog": true,
			"endPoint": "/app/procs/InvTrackingAPIqueries",
			"button": {
			  "icon": "rule",
			  "title": {
				"label_en": "Lot Audit", "label_es": "Auditoría de Lote"
			  },
			  "requiresGridItemSelected": true
			},
			"clientMethod": "getObjectAuditInfo",
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" }
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
						{ "argumentName": "lotName", "selObjectPropertyName": "name" }
					  ]
				  },
				  "endPointUrl": "Samples",
				  "clientMethod": "signAudit",
				  "endPointParams": [
					{ "argumentName": "lotName", "selObjectPropertyName": "name" },
					{ "argumentName": "auditId", "targetValue": true }
				  ]
				}
				]
			}
		},
		{"actionName": "TURN_LOT_UNAVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "deactivate.svg",
			  "title": {
				"label_en": "Turn Unavailable", "label_es": "Poner NO Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": [{
				"column": "status", "value": "AVAILABLE_FOR_USER"
			  }]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }			  
			]
		},
		{"actionName": "TURN_LOT_AVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "activate.svg",
			  "title": {
				"label_en": "Turn Available", "label_es": "Poner Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "xshowWhenSelectedItem": [
				{"column": "is_locked", "value": false},
				{"column": "status", "value": "NEW|QUARANTINE"}			
			]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }
			]
		},
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list8": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification", "label_es": "Completar Cualificación"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list8" }
			]
		},
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list9": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification + Available", "label_es": "Completar Cualificación + Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list9" },
			  { "argumentName": "turn_available_lot", "fixValue": "true" }			  
			]
		},		
		{"actionName": "CONSUME_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Consume", "label_es": "Consumir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to consume", "label_es": "Volumen a consumir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADJUST_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Adjust", "label_es": "Ajustar"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status", 
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Adjust (new)volume", "label_es": "(Nuevo)Volumen a ajustar" }}
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADD_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Add", "label_es": "Añadir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to add", "label_es": "Volumen a añadir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		}	
    ]
  }, 
  "InventoryLotsOtros": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "InventoryLots.Otros": {
          "label_en": "Active Inventory Lots",
          "label_es": "Lotes de inventario activos"
        }
      },
      "gridHeader": {
        "category": {
          "label_en": "Category", "label_es": "Categoría", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "reference": {
          "label_en": "Reference", "label_es": "Referencia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
        "lot_name": {
          "label_en": "Name", "label_es": "lot_id", "Nombre": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "status": {
          "label_en": "Status", "label_es": "Estado", "sort": false, "filter": true, "width": "10%"
        },
        "volume": {
          "label_en": "volume", "label_es": "volumen", "sort": false, "filter": true, "width": "10%"
        },
        "volume_uom": {
          "label_en": "uom", "label_es": "uom", "sort": false, "filter": true, "width": "10%"
        }
      }
    },
    "viewQuery":{ "actionName": "ALL_INVENTORY_LOTS",
      "endPoint": "/app/procs/InvTrackingAPIqueries",
	  "endPointParams": [
          { "argumentName": "category", "fixValue": "Otros"}
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
		{"actionName": "NEW_INVENTORY_LOT",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "reference", "element": "list1", "defaultValue": ""  },
          { "argumentName": "category", "fixValue": "Otros"},
          { "argumentName": "lotName", "element": "text2", "defaultValue": "" },
		  { "argumentName": "volume", "element": "number1", "defaultValue": "" },
		  { "argumentName": "volumeUom", "fixValue": "mL" },
          { "argumentName": "expiryDate", "element": "date1", "defaultValue": "" },
		  { "argumentName": "expiryDateInUse", "element": "date2", "defaultValue": ""},
		  { "argumentName": "retestDate", "element": "date3", "defaultValue": "" },
		  { "argumentName": "vendor", "element": "text3", "defaultValue": "" },
		  { "argumentName": "vendorLot", "element": "text4", "defaultValue": "" },
		  { "argumentName": "vendorReference", "element": "text5", "defaultValue": "" },
		  { "argumentName": "purity", "element": "text6", "defaultValue": "" },
		  { "argumentName": "conservationCondition", "element": "text7", "defaultValue": "" },
          { "argumentName": "numEntries", "element": "number2", "defaultValue": "" }
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
			{"list1": {
			  "items": [
			  { "keyName": "Otros", "keyValue_en": "v", "keyValue_es": "Otros" }
			  ],
			  "label_en": "Reference", "label_es": "Referencia", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"filterInFirstLevel": true, "elementName":"list1",
				"propertyNameContainer": "category_and_references",
				"propertyNameContainerLevelPropertyKeyName": "name",
				"propertyNameContainerLevelfixValue": "Otros",
				"propertyNameContainerLevel2": "inv_reference",
				"propertyKeyName": "name", "propertyKeyValueEn": "name", "propertyKeyValueEs": "name"
			  }			
			}},
            {"text2": { "label_en": "lot id", "label_es": "id Lote" }},
			{"number1": {"label_en": "Volume", "label_es": "Volumen", "optional": true }},			
            {"date1": {"label_en": "Expiry Date", "label_es": "Fecha Caducidad", "optional": true }},
            {"date2": {"label_en": "Expiry Date In Use", "label_es": "Fecha Caducidad En Uso", "optional": true }},
            {"date3": {"label_en": "Retest Date", "label_es": "Fecha Retest", "optional": true }},
			{"text3": { "label_en": "Vendor", "label_es": "Proveedor", "optional": true }},			
			{"text4": { "label_en": "Vendor Lot", "label_es": "Lote de Proveedor", "optional": true }},			
			{"text5": { "label_en": "Vendor Reference", "label_es": "Referencia de Proveedor", "optional": true }},			
			{"text6": { "label_en": "Purity", "label_es": "Pureza", "optional": true }},			
			{"text7": { "label_en": "Conservation Condition", "label_es": "Condición de Conservación", "optional": true }},
                        {"number2": {"label_en": "Number of Entries", "label_es": "Número de entradas", "optional": true, "default_value": 1 }}		
          ]
        }
      },
		{"actionName": "AUDIT_FOR_GIVEN_INVENTORY_LOT",	  
			"requiresDialog": true,
			"endPoint": "/app/procs/InvTrackingAPIqueries",
			"button": {
			  "icon": "rule",
			  "title": {
				"label_en": "Lot Audit", "label_es": "Auditoría de Lote"
			  },
			  "requiresGridItemSelected": true
			},
			"clientMethod": "getObjectAuditInfo",
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" }
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
						{ "argumentName": "lotName", "selObjectPropertyName": "name" }
					  ]
				  },
				  "endPointUrl": "Samples",
				  "clientMethod": "signAudit",
				  "endPointParams": [
					{ "argumentName": "lotName", "selObjectPropertyName": "name" },
					{ "argumentName": "auditId", "targetValue": true }
				  ]
				}
				]
			}
		},
		{"actionName": "TURN_LOT_UNAVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "deactivate.svg",
			  "title": {
				"label_en": "Turn Unavailable", "label_es": "Poner NO Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": [{
				"column": "status", "value": "AVAILABLE_FOR_USER"
			  }]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }			  
			]
		},
		{"actionName": "TURN_LOT_AVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "activate.svg",
			  "title": {
				"label_en": "Turn Available", "label_es": "Poner Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "xshowWhenSelectedItem": [
				{"column": "is_locked", "value": false},
				{"column": "status", "value": "NEW|QUARANTINE"}			
			]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }
			]
		},
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list8": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification", "label_es": "Completar Cualificación"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list8" }
			]
		},
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list9": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification + Available", "label_es": "Completar Cualificación + Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list9" },
			  { "argumentName": "turn_available_lot", "fixValue": "true" }			  
			]
		},		
		{"actionName": "CONSUME_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Consume", "label_es": "Consumir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to consume", "label_es": "Volumen a consumir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADJUST_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Adjust", "label_es": "Ajustar"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status", 
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Adjust (new)volume", "label_es": "(Nuevo)Volumen a ajustar" }}
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADD_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Add", "label_es": "Añadir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to add", "label_es": "Volumen a añadir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		}	
    ]
  }, 
  "InventoryLotsReactivos": {
	"component":"Tabs",  
    "abstract": true,
    "tabs": [
	{"component": "TableWithButtons",
      "langConfig": {
		"tab": {
            "label_en": "Active Inventory Lots Reactivos Comerciales", 
            "label_es": "Lotes de inventario activos Reactivos Comerciales"
        },
        "title": {
          "label_en": "Active Inventory Lots Reactivos Comerciales",
          "label_es": "Lotes de inventario activos Reactivos Comerciales"
        },
      "gridHeader": {
        "reference": {
          "label_en": "Reference", "label_es": "Referencia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
		"category": {
          "label_en": "Category", "label_es": "Categoría", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
        "status": {
          "label_en": "Status", "label_es": "Estado", "sort": false, "filter": true, "width": "10%"
        },
		"lot_name": {
          "label_en": "Name", "label_es": "lot_id", "Nombre": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "volume": {
          "label_en": "volume", "label_es": "volumen", "sort": false, "filter": true, "width": "10%"
        },
        "volume_uom": {
          "label_en": "uom", "label_es": "uom", "sort": false, "filter": true, "width": "10%"
        }
      }
    },
    "viewQuery":{ "actionName": "ALL_INVENTORY_LOTS",
      "endPoint": "/app/procs/InvTrackingAPIqueries",
	  "endPointParams": [
          { "argumentName": "category", "fixValue": "Reactivos Comerciales"}
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
		{"actionName": "NEW_INVENTORY_LOT",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "reference", "element": "list1", "defaultValue": ""  },
          { "argumentName": "category", "fixValue": "Reactivos Comerciales"},
          { "argumentName": "lotName", "element": "text2", "defaultValue": "" },
		  { "argumentName": "volume", "element": "number1", "defaultValue": "" },
		  { "argumentName": "volumeUom", "fixValue": "mL" },
          { "argumentName": "expiryDate", "element": "date1", "defaultValue": "" },
		  { "argumentName": "expiryDateInUse", "element": "date2", "defaultValue": ""},
		  { "argumentName": "retestDate", "element": "date3", "defaultValue": "" },
		  { "argumentName": "vendor", "element": "text3", "defaultValue": "" },
		  { "argumentName": "vendorLot", "element": "text4", "defaultValue": "" },
		  { "argumentName": "vendorReference", "element": "text5", "defaultValue": "" },
		  { "argumentName": "purity", "element": "text6", "defaultValue": "" },
		  { "argumentName": "conservationCondition", "element": "text7", "defaultValue": "" },
          { "argumentName": "numEntries", "element": "number2", "defaultValue": "" }
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
			{"list1": {
			  "items": [
			  {	"keyName": "Reactivos Comerciales", "keyValue_en": "Reactivos Comerciales", "keyValue_es": "Reactivos Comerciales" }
			  ],
			  "label_en": "Reference", "label_es": "Referencia", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"filterInFirstLevel": true, "elementName":"list1",
				"propertyNameContainer": "category_and_references",
				"propertyNameContainerLevelPropertyKeyName": "name",
				"propertyNameContainerLevelfixValue": "Reactivos Comerciales",
				"propertyNameContainerLevel2": "inv_reference",
				"propertyKeyName": "name", "propertyKeyValueEn": "name", "propertyKeyValueEs": "name"
			  }			
			}},
            {"text2": { "label_en": "lot id", "label_es": "id Lote" }},
			{"number1": {"label_en": "Volume", "label_es": "Volumen", "optional": true }},			
            {"date1": {"label_en": "Expiry Date", "label_es": "Fecha Caducidad", "optional": true }},
            {"date2": {"label_en": "Expiry Date In Use", "label_es": "Fecha Caducidad En Uso", "optional": true }},
            {"date3": {"label_en": "Retest Date", "label_es": "Fecha Retest", "optional": true }},
			{"text3": { "label_en": "Vendor", "label_es": "Proveedor", "optional": true }},			
			{"text4": { "label_en": "Vendor Lot", "label_es": "Lote de Proveedor", "optional": true }},			
			{"text5": { "label_en": "Vendor Reference", "label_es": "Referencia de Proveedor", "optional": true }},			
			{"text6": { "label_en": "Purity", "label_es": "Pureza", "optional": true }},			
			{"text7": { "label_en": "Conservation Condition", "label_es": "Condición de Conservación", "optional": true }},
            {"number2": {"label_en": "Number of Entries", "label_es": "Número de entradas", "optional": true, "default_value": 1 }}		
          ]
        }
      },
		{"actionName": "AUDIT_FOR_GIVEN_INVENTORY_LOT",	  
			"requiresDialog": true,
			"endPoint": "/app/procs/InvTrackingAPIqueries",
			"button": {
			  "icon": "rule",
			  "title": {
				"label_en": "Lot Audit", "label_es": "Auditoría de Lote"
			  },
			  "requiresGridItemSelected": true
			},
			"clientMethod": "getObjectAuditInfo",
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" }
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
						{ "argumentName": "lotName", "selObjectPropertyName": "name" }
					  ]
				  },
				  "endPointUrl": "Samples",
				  "clientMethod": "signAudit",
				  "endPointParams": [
					{ "argumentName": "lotName", "selObjectPropertyName": "name" },
					{ "argumentName": "auditId", "targetValue": true }
				  ]
				}
				]
			}
		},
		{"actionName": "TURN_LOT_UNAVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "deactivate.svg",
			  "title": {
				"label_en": "Turn Unavailable", "label_es": "Poner NO Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": [{
				"column": "status", "value": "AVAILABLE_FOR_USER"
			  }]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }			  
			]
		},
		{"actionName": "TURN_LOT_AVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "activate.svg",
			  "title": {
				"label_en": "Turn Available", "label_es": "Poner Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "xshowWhenSelectedItem": [
				{"column": "is_locked", "value": false},
				{"column": "status", "value": "NEW|QUARANTINE"}			
			]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }
			]
		},
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list8": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification", "label_es": "Completar Cualificación"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list8" }
			]
		},
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list9": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification + Available", "label_es": "Completar Cualificación + Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list9" },
			  { "argumentName": "turn_available_lot", "fixValue": "true" }			  
			]
		},		
		{"actionName": "CONSUME_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Consume", "label_es": "Consumir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to consume", "label_es": "Volumen a consumir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADJUST_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Adjust", "label_es": "Ajustar"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status", 
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Adjust (new)volume", "label_es": "(Nuevo)Volumen a ajustar" }}
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADD_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Add", "label_es": "Añadir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to add", "label_es": "Volumen a añadir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		}	
     ]
    }, 
    {"component": "TableWithButtons",
    "langConfig": {
		"tab": {
            "label_en": "Active Inventory Lots ReactivosPreparados", 
            "label_es": "Lotes de inventario activos ReactivosPreparados"
        },
        "title": {
          "label_en": "Active Inventory Lots ReactivosPreparados",
          "label_es": "Lotes de inventario activos ReactivosPreparados"
        },
      "gridHeader": {
        "reference": {
          "label_en": "Reference", "label_es": "Referencia", "sort": false, "filter": true, "is_icon": false, "width": "20%"
        },
		"category": {
          "label_en": "Category", "label_es": "Categoría", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
		"locked_reason": {
          "label_en": "Locked Reason", "label_es": "Razón de bloqueo", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"
        },
		"status": {
          "label_en": "Status", "label_es": "Estado", "sort": false, "filter": true, "width": "10%"
        },
        "lot_name": {
          "label_en": "Name", "label_es": "lot_id", "Nombre": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "volume": {
          "label_en": "volume", "label_es": "volumen", "sort": false, "filter": true, "width": "10%"
        },
        "volume_uom": {
          "label_en": "uom", "label_es": "uom", "sort": false, "filter": true, "width": "10%"
        }
      }
    },
    "viewQuery":{ "actionName": "ALL_INVENTORY_LOTS",
      "endPoint": "/app/procs/InvTrackingAPIqueries",
	  "endPointParams": [
          { "argumentName": "category", "fixValue": "Reactivos preparados"}
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
		{"actionName": "NEW_INVENTORY_LOT",
		"requiresDialog": true,
        "endPointParams": [
          { "argumentName": "reference", "element": "list1", "defaultValue": ""  },
          { "argumentName": "category", "fixValue": "Reactivos preparados"},
          { "argumentName": "lotName", "element": "text2", "defaultValue": "" },
		  { "argumentName": "volume", "element": "number1", "defaultValue": "" },
		  { "argumentName": "volumeUom", "fixValue": "mL" },
          { "argumentName": "expiryDate", "element": "date1", "defaultValue": "" },
		  { "argumentName": "expiryDateInUse", "element": "date2", "defaultValue": ""},
		  { "argumentName": "retestDate", "element": "date3", "defaultValue": "" },
		  { "argumentName": "vendor", "element": "text3", "defaultValue": "" },
		  { "argumentName": "vendorLot", "element": "text4", "defaultValue": "" },
		  { "argumentName": "vendorReference", "element": "text5", "defaultValue": "" },
		  { "argumentName": "purity", "element": "text6", "defaultValue": "" },
		  { "argumentName": "conservationCondition", "element": "text7", "defaultValue": "" },
          { "argumentName": "numEntries", "element": "number2", "defaultValue": "" }
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
			{"list1": {
			  "items": [
			  { "keyName": "Reactivos preparados", "keyValue_en": "Reactivos preparados", "keyValue_es": "Reactivos preparados" }
			  ],
			  "label_en": "Reference", "label_es": "Referencia", "optional": true,
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": false,
			  "valuesFromMasterData": {
				"filterInFirstLevel": true, "elementName":"list1",
				"propertyNameContainer": "category_and_references",
				"propertyNameContainerLevelPropertyKeyName": "name",
				"propertyNameContainerLevelfixValue": "Reactivos preparados",
				"propertyNameContainerLevel2": "inv_reference",
				"propertyKeyName": "name", "propertyKeyValueEn": "name", "propertyKeyValueEs": "name"
			  }			
			}},
            {"text2": { "label_en": "lot id", "label_es": "id Lote" }},
			{"number1": {"label_en": "Volume", "label_es": "Volumen", "optional": true }},			
            {"date1": {"label_en": "Expiry Date", "label_es": "Fecha Caducidad", "optional": true }},
            {"date2": {"label_en": "Expiry Date In Use", "label_es": "Fecha Caducidad En Uso", "optional": true }},
            {"date3": {"label_en": "Retest Date", "label_es": "Fecha Retest", "optional": true }},
			{"text3": { "label_en": "Vendor", "label_es": "Proveedor", "optional": true }},			
			{"text4": { "label_en": "Vendor Lot", "label_es": "Lote de Proveedor", "optional": true }},			
			{"text5": { "label_en": "Vendor Reference", "label_es": "Referencia de Proveedor", "optional": true }},			
			{"text6": { "label_en": "Purity", "label_es": "Pureza", "optional": true }},			
			{"text7": { "label_en": "Conservation Condition", "label_es": "Condición de Conservación", "optional": true }},
                        {"number2": {"label_en": "Number of Entries", "label_es": "Número de entradas", "optional": true, "default_value": 1 }}		
          ]
        }
      },
		{"actionName": "AUDIT_FOR_GIVEN_INVENTORY_LOT",	  
			"requiresDialog": true,
			"endPoint": "/app/procs/InvTrackingAPIqueries",
			"button": {
			  "icon": "rule",
			  "title": {
				"label_en": "Lot Audit", "label_es": "Auditoría de Lote"
			  },
			  "requiresGridItemSelected": true
			},
			"clientMethod": "getObjectAuditInfo",
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" }
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
						{ "argumentName": "lotName", "selObjectPropertyName": "name" }
					  ]
				  },
				  "endPointUrl": "Samples",
				  "clientMethod": "signAudit",
				  "endPointParams": [
					{ "argumentName": "lotName", "selObjectPropertyName": "name" },
					{ "argumentName": "auditId", "targetValue": true }
				  ]
				}
				]
			}
		},
		{"actionName": "TURN_LOT_UNAVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "deactivate.svg",
			  "title": {
				"label_en": "Turn Unavailable", "label_es": "Poner NO Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": [{
				"column": "status", "value": "AVAILABLE_FOR_USER"
			  }]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }			  
			]
		},
		{"actionName": "TURN_LOT_AVAILABLE",
			"requiresDialog": false,
			"button": {
			  "img": "activate.svg",
			  "title": {
				"label_en": "Turn Available", "label_es": "Poner Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "xshowWhenSelectedItem": [
				{"column": "is_locked", "value": false},
				{"column": "status", "value": "NEW|QUARANTINE"}			
			]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }
			]
		},
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list8": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification", "label_es": "Completar Cualificación"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list8" }
			]
		},
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list9": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification + Available", "label_es": "Completar Cualificación + Disponible"
			  },
			  "requiresGridItemSelected": true,
			  "showWhenSelectedItem": 				
				{"column": "status", "value": "QUARANTINE"}
			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list9" },
			  { "argumentName": "turn_available_lot", "fixValue": "true" }			  
			]
		},		
		{"actionName": "CONSUME_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Consume", "label_es": "Consumir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to consume", "label_es": "Volumen a consumir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADJUST_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Adjust", "label_es": "Ajustar"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status", 
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Adjust (new)volume", "label_es": "(Nuevo)Volumen a ajustar" }}
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		},		
		{"actionName": "ADD_INV_LOT_VOLUME",
			"requiresDialog": true,
			"button": {
			  "icon": "receipt-text",
			  "title": {
				"label_en": "Add", "label_es": "Añadir"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": {
				"column": "status",
				"value": "RETIRED"
			  }
			},
			"dialogInfo": {          
				"name": "genericDialog",
				"fields": [
					{"number1": {"label_en": "Volume to add", "label_es": "Volumen a añadir" }}								
				]
			},
			
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "volumeUom", "selObjectPropertyName": "volume_uom" },
			  { "argumentName": "volume", "element": "number1", "defaultValue": "" }
			]
		}	
    ]
   }
   ]
  },  
  "Issues": {
	"component": "DataMining",
	"tabsListElement": {
		"label_en": "Queries", 
        "label_es": "Consultas"
	},
    "tabs": [
      { "action": "EXPIRED_LOTS",
        "label_en": "Expired Lots", 
        "label_es": "Lotes Caducados", 
        "endPoint": "/app/procs/InvTrackingAPIqueries",
        "filter":{
          "fixParams": {
            "sampleGroups": "area, spec_code,sample_config_code*counter_by_area_spec_tmp|spec_eval*counter_range_eval|has_invest*counter_investigations|has_pre_invest, has_invest*counter_pre_and_invest"
          },
		  "filterFields":[
            {"text1": { "label_en": "Lot Name", "label_es": "Lote", "default_value": "" }},
            {"text2": { "label_en": "Reference", "label_es": "Referencia", "default_value": "REF1" }},
            {"text3": { "label_en": "Category", "label_es": "Categoria", "default_value": "" }}		  
		  ],
          "filterFields2":[
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
		  
		  "endPointParams": [
		    {"argumentName": "lotName", "element": "text1", "notAddWhenValueIsBlank": true},
			{"argumentName": "reference", "element": "text2", "notAddWhenValueIsBlank": true},
            {"argumentName": "category", "element": "text3", "notAddWhenValueIsBlank": true}
		  ],		  
		  "extraParams": [],
          "extraParams2": [
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
        "printable": true,
        "download":{
          "active": true,
          "elements":[
            {"elementName": "datatable"}
          ] 
        },
        "reportElements":[
          [
			{"type": "reportTitle", "title":{"label_en": "Expired Lots", "label_es": "Lotes Caducados"}}
          ],
          [
          {"type": "grid", "title":{"label_en": "Info Matching Selection Criteria", "label_es": "Información cumpliendo el criterio de selección"}, 
           "elementName": "datatable", "fieldsToDisplay":[
              {"property": "lot_name", "header": "lot_name"}, 
              {"property": "reference", "header": "reference"}, 
              {"property": "category", "header": "category"}, 
              {"property": "expiry_reason", "header": "expiry_reason"}			  
           ] 
          }          
        ]
        ]
      },
      { "action": "REFERENCES_UNDER_MIN_STOCK",
		"label_en": "Reference which stock is upon min expected", 
		"label_es": "Referencias cuyas existencias están por debajo de lo esperado",
        "label_en2": "Stocks under min", 
        "label_es2": "Stock bajo mínimos", 
        "endPoint": "/app/procs/InvTrackingAPIqueries",
        "filter":{
			"filterFields":[
            {"text1": { "label_en": "Reference", "label_es": "Referencia", "default_value": "REF1" }},
            {"text2": { "label_en": "Category", "label_es": "Categoria", "default_value": "" }}
			
			],
          "filterFields2":[
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
			{"argumentName": "reference", "element": "text1", "notAddWhenValueIsBlank": true},
            {"argumentName": "category", "element": "text2", "notAddWhenValueIsBlank": true}
		  ],
          "endPointParams2": [
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
        "printable": true,
        "download":{
          "active": true,
          "elements":[
            {"elementName": "datatable"}
          ] 
        },		
        "reportElements":[
          [
            {"type": "reportTitle", "title":{"label_en": "Reference which stock is upon min expected", 
				"label_es": "Referencias cuyas existencias están por debajo de lo esperado"},
              "style":"color:blue"}
          ],
          [
            {"type": "grid", "title":{"label_en": " ", "label_es": " "}, 
             "elementName": "datatable", "fieldsToDisplay":[
                {"property": "name", "header": "Name"}, 
                {"property": "category", "header": "Category"}, 
                {"property": "min_stock_type", "header": "Control Type"}, 
                {"property": "min_stock", "header": "Min Expected"}, 
                {"property": "current_stock", "header": "Current Stock"}
             ] 
            }          
          ]          
        ]
      }
    ]
  },
  "QualificationsInProgress": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "QualificationsInProgress": {
          "label_en": "Events in progress",
          "label_es": "Eventos en curso"
        }
      },
      "gridHeader": {
        "lot_name": {"label_en": "Instrument", "label_es": "Instrumento", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"},
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
    "viewQuery":{ "actionName": "QUALIFICATIONS_INPROGRESS",	  
      "xxxclientMethod": "getSamples",
      "endPoint": "/app/procs/InvTrackingAPIqueries",
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
		{"actionName": "QUALIFIFICATION_EVENT_VARIABLES",
			"requiresDialog": true,
			"alertMsg": {
				"empty": { "label_en": "No pending variables to enter result", "label_es": "No hay variables pendientes de resultados" }
			},
			"button": {
				"icon": "document_scanner",
				"title": {"label_en": "Enter Value", "label_es": "Ingrese el Valor"},
				"requiresGridItemSelected": true
			},
			"resultHeader": {
				"id": {"label_en": "Id", "label_es": "Id", "width": "10%"},
				"param_name": {"label_en": "Parameter", "label_es": "Parámetro"},
				"value": {"label_en": "Value", "label_es": "Valor"}
			},
			"resultHeaderObjectLabelTopLeft": {
				"label_en": "Lot Qualification:", "label_es": "Cualificación de Lote :"
			},    
			"dialogInfo": { 
				"name": "resultDialog",
				"subQueryName": "getResult",		  
				"viewQuery": {
					"actionName": "QUALIFIFICATION_EVENT_VARIABLES",
					"endPoint": "/app/procs/InvTrackingAPIqueries",
					"endPointParams": [				  
						{ "argumentName": "lotName", "selObjectPropertyName": "lot_name"},
						{ "argumentName": "category", "selObjectPropertyName": "category"},
						{ "argumentName": "reference", "selObjectPropertyName": "reference"}
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
							{ "argumentName": "certifId", "selObjectPropertyName": "certif_id" },
							{ "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
							{ "argumentName": "category", "selObjectPropertyName": "category"},
							{ "argumentName": "reference", "selObjectPropertyName": "reference"},
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
		{"actionName": "COMPLETE_QUALIFICATION",
			"requiresDialog": true,
			"dialogInfo": {          
			  "name": "genericDialog",
				"fields": [
					{"list8": { "label_en": "Decision", "label_es": "Decisión",
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
			  "title": {
				"label_en": "Complete Qualification", "label_es": "Completar Cualificación"
			  },
			  "requiresGridItemSelected": true			   
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" },
			  { "argumentName": "decision", "element": "list8" }
			]
		},
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
				  "endPoint": "/app/procs/InvTrackingAPIqueries",
				  "actionName": "COMPLETED_EVENTS_LAST_N_DAYS",
				  "clientMethod": "getDeactivatedObjects",
				  "endPointParams": [
					{ "argumentName": "numDays", "element": "queryNumDays", "fixValue": 7 }
				  ]
			  }
			}
		}
	
  ]
  }
  
  
}

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
"master_data":{"category_and_references":[{"name":"Estándares Primarios","inv_category":[{"min_stock_type":"ITEMS","created_on":"2023-01-15 23:57:00.348211+01","processes_list":"","name":"REF1","active":true,"min_stock":2,"min_stock_uom":"","category":"Estándares Primarios","lot_requires_qualif":true,"allowed_uoms":"","created_by":"PROCEDURE_DEPLOYMENT","allow_proc_discounts":false}]},{"name":"Estándares Secundarios","inv_category":[{}]},{"name":"Material  Fungible","inv_category":[{"min_stock_type":"","created_on":"2023-01-15 23:57:00.304747+01","processes_list":"","name":"Bote de agua","active":true,"min_stock":10,"min_stock_uom":"ML","category":"Material  Fungible","lot_requires_qualif":false,"allowed_uoms":"ML|L|CL","created_by":"PROCEDURE_DEPLOYMENT","allow_proc_discounts":false}]},{"name":"Medios de Cultivo","inv_category":[{"min_stock_type":"ITEMS","created_on":"2023-01-15 23:57:00.386413+01","processes_list":"","name":"REF1","active":true,"min_stock":80,"min_stock_uom":"","category":"Medios de Cultivo","lot_requires_qualif":false,"allowed_uoms":"","created_by":"PROCEDURE_DEPLOYMENT","allow_proc_discounts":true}]},{"name":"Otros","inv_category":[{}]},{"name":"Reactivos Comerciales","inv_category":[{"min_stock_type":"VOLUME","created_on":"2023-01-15 23:57:00.304747+01","processes_list":"","name":"REF1","active":true,"min_stock":67000,"min_stock_uom":"ML","category":"Reactivos Comerciales","lot_requires_qualif":true,"allowed_uoms":"ML|L|CL","created_by":"PROCEDURE_DEPLOYMENT","allow_proc_discounts":false}]},{"name":"Reactivos preparados","inv_category":[{}]}]},  
  "InventoryLots": {
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
		  { "argumentName": "volumeUom", "fixValue": "ML" },
          { "argumentName": "expiryDate", "element": "date1", "defaultValue": "" },
		  { "argumentName": "expiryDateInUse", "element": "date2", "defaultValue": ""},
		  { "argumentName": "retestDate", "element": "date3", "defaultValue": "" },
		  { "argumentName": "vendor", "element": "text3", "defaultValue": "" },
		  { "argumentName": "vendorLot", "element": "text4", "defaultValue": "" },
		  { "argumentName": "vendorReference", "element": "text5", "defaultValue": "" },
		  { "argumentName": "purity", "element": "text6", "defaultValue": "" },
		  { "argumentName": "conservationCondition", "element": "text7", "defaultValue": "" }
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
                { "keyName": "Reactivos Comerciales", "keyValue_en": "Reactivos Comerciales", "keyValue_es": "Reactivos Comerciales" },
                { "keyName": "Medios de Cultivo", "keyValue_en": "Medios de Cultivo", "keyValue_es": "Medios de Cultivo" }
              ],    
              "label_en": "Category", "label_es": "Categoría", "optional": true, 
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": true,
			  "valuesFromMasterData": {
				"propertyNameContainer": "category_and_references",
				"propertyKeyName": "name", "propertyKeyValueEn": "name", "propertyKeyValueEs": "name",
				"recalculateObjectOnEntrySelected": "list2"
			  }
            }},
			{"xlist2": { 
              "items": [
                { "keyName": "Reactivos Comerciales", "keyValue_en": "Reactivos Comerciales", "keyValue_es": "Reactivos Comerciales" },
                { "keyName": "Medios de Cultivo", "keyValue_en": "Medios de Cultivo", "keyValue_es": "Medios de Cultivo" }
              ],    
              "label_en": "Reference", "label_es": "Referencia", "optional": true, 
			  "addBlankValueOnTop": true, "addBlankValueAtBottom": true,
			  "zzzvaluesFromMasterData": {
				"filterInFirstLevel": true, "elementName":"list1",
				"propertyNameContainer": "category_and_references",
				"propertyNameContainerLevel2": "inv_category",
				"propertyKeyName": "name", "propertyKeyValueEn": "name", "propertyKeyValueEs": "name",
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
			{"text7": { "label_en": "Conservation Condition", "label_es": "Condición de Conservación", "optional": true }}		
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
				"column": "status", "value": "AVAILABLE_FOR_USE"
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
		},
		{"actionName": "LOT_PRINT_LABEL",
			"requiresDialog": false,
			"endPoint": "/app/procs/InvTrackingAPIqueries",
			"clientMethod": "inventoryLotPrintLabel",
			"button": {
			  "img": "deactivate.svg",
			  "title": {
				"label_en": "Print Labels", "label_es": "Imprimir Etiquetas"
			  },
			  "requiresGridItemSelected": true,
			  "hideWhenSelectedItem": [{
				"column": "status", "value": "AVAILABLE_FOR_USE"
			  }]
			},
			"endPointParams": [
			  { "argumentName": "lotName", "selObjectPropertyName": "lot_name" },
			  { "argumentName": "category", "selObjectPropertyName": "category" },
			  { "argumentName": "reference", "selObjectPropertyName": "reference" }			  
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
			{"argumentName": "Reference", "element": "text2", "notAddWhenValueIsBlank": true},
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
			{"argumentName": "Reference", "element": "text1", "notAddWhenValueIsBlank": true},
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
  }   
  
}

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
        "lot_id": {
          "label_en": "lot_id", "label_es": "lot_id", "sort": false, "filter": true, "is_icon": true, "width": "10%"
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
          { "argumentName": "reference", "element": "text1", "defaultValue": "" },
          { "argumentName": "category", "element": "list1", "defaultValue": "" },
          { "argumentName": "lotId", "element": "text2", "defaultValue": "" },
          { "argumentName": "expiryDate", "element": "datetime1", "defaultValue": "" },
		  { "argumentName": "volume", "element": "number1", "defaultValue": "" },
		  { "argumentName": "volumeUom", "fixValue": "ML" }
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
              "label_en": "Category", "label_es": "Categoría", "optional": true
            }},
			{"text1": { "label_en": "Reference", "label_es": "Referencia" }},
            {"text2": { "label_en": "lot id", "label_es": "id Lote" }},
            {"datetime1": {"label_en": "Expiry Date", "label_es": "Fecha Caducidad" }},
			{"number1": {"label_en": "Volume", "label_es": "Volumen" }}			
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
      }
    ]
  }
}

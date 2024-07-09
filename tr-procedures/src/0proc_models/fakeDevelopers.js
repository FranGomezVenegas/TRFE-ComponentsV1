export const FakeDevelopers = {
  "TrackingChanges":{
	  "version": 0.1,
	  "last change on (YYYYMMDD)": "20230805",
	  "last_change_note_20230805": "Created this fake procedure for developers then we don't need to mix our devs with official procedures",
	
  },	
  "ModuleSettings":{
	  "actionsEndpoints":[
		{ "name": "PlatformAdmin" , "url" : "/app/PlatformAdminAPIactions"}
	  ]
  },	
  "ck-editor":{
    "component": "ckEditor",
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
  },
  "drag-box":{
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
          "label_en": "incub_stage",
          "label_es": "incub_stage"
        },
        {
          "name": "rows",
          "label_en": "incubation_start",
          "label_es": "incubation_start"
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
          "label_en": "posX",
          "label_es": "posX"
        },
        {
          "name": "posY",
          "label_en": "incubation_start",
          "label_es": "incubation_start"
        }
      ]
    },    
    "objectsToDragColumns":{
      "endPointPropertyArray": ["tableData"],
      "columns": [
        {
          "name": "id",
          "label_en": "id2",
          "label_es": "id2"
        },
        {
          "name": "study",
          "label_en": "study",
          "label_es": "study"
        },
        {
          "name": "temperature",
          "label_en": "temperature",
          "label_es": "temperature"
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
      ["id", "study"],
      ["id", "temperature"],
      ["temperature"]
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
        xcols: 5,
        xrows: 3,
        xviews:[
          ["id", "study"],
          ["id", "temperature"],
        ],
        readOnly: true,
        xallow_move_objects: true,
        max_num_objects_per_position: 1,
        xdatas: [
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
          },
          {
            id: 3, 
            name: "Sample3",
            description: "Hello3",
            study: "here13",
            temperature: "ccc",
            result1: 1,
            result2: 2,
            posX: 5,
            posY: 3,
            stored_on: "2024-01-16"
          }        
        ]
      },
      tableData:[
        {id: "1", name: "Box 1", study:"Study 1", temperature: "10º", "extraField":"demo"},
        {id: "2", study:"Study 2", temperature: "20º", "extraField":"demo"},
        {id: "3", study:"Study 3", temperature: "30º", "extraField":"demo"},
        {id: "4", study:"Study 10", temperature: "40º", "extraField":"demo"}
      ],
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
        {"name":"Box 1", cols: 5, rows: 5, content_structured: true, "allow_move_objects": true,   
          "anyProperty": 1, 
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
              id: 11, 
              name: "Sample11",
              description: "Hello11",
              study: undefined,
              temperature: "aaa",
              result1: 1,
              result2: 2,
              posX: 5,
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
            },
            {
              id: 3, 
              name: "Sample3",
              description: "Hello3",
              study: "here13",
              temperature: "ccc",
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
  },
  "drag-drop":{
    "component": "dragDropObjects",
    
    "viewQuery":{ "actionName": "GET_PENDING_INCUBATION_SAMPLES_AND_ACTIVE_BATCHES",
                  "endPoint": "/moduleenvmon/EnvMonSampleAPIqueries",
                  //"notUseGrid": true,
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
    "objects":[
      { "dragEnable": true,
        "dropEnable": false,
        "name": "1",
        "type": "table",
        smartFilter: {
          "filterValues":{},
          "applyFilterButton":{
            "title":{
              label_en: 'Apply Filter',
              label_es: 'Aplicar Filtro',
            }
          },
          "clearFilterButton":{
            "title":{
              label_en: 'Clear Filter',
              label_es: 'Limpiar Filtro',
            }
          },
          "displayFilterButton":{
            "title":{
              label_en: 'Display Filter',
              label_es: 'Mostrar Filtro',
            }
          },
          dialogInfo: {
            name: 'genericDialog',

            "fields": [
              {
                "name": "sample_id",
                "label_en": "id",
                "label_es": "id",
                "type":"text",
              },
              {
                "name": "location_name",
                "label_en": "location_name",
                "label_es": "location_name",
                "type":"text",
              },
              {
                "name": "pending_incub",
                "label_en": "pending_incub",
                "label_es": "pending_incub",
                "type":"text",
              },
              {
                "name": "location_name",
                "type":"select",
                "label_en": "location_name",
                "label_es": "location_name",
                "select_options":[
                  {
                    "name":"E02",
                    "lable_en":"E02",
                    "lable_es":"E02",
                    "value":"E02"
                  },
                  {
                    "name":"C01",
                    "lable_en":"C01",
                    "lable_es":"C01",
                    "value":"C01"
                  }
                ]
              }
              ],
          }
        },
        "theme":"TRAZiT-DefinitionArea",
        "endPointPropertyArray":["samplesWithAnyPendingIncubation"],
        "columns": [
          {
            "name": "sample_id",
            "label_en": "id",
            "label_es": "id"
          },
          {
            "name": "location_name",
            "label_en": "location_name",
            "label_es": "location_name"
          },
          {
            "name": "pending_incub",
            "label_en": "pending_incub",
            "label_es": "pending_incub"
          }
        ]
      },  
      { "dragEnable": true,
        "dropEnable": true,
        "name": "2",
        "acceptEntriesOnlyFromObjects":["11", "3"],
        "type": "cards",
        smartFilter: {
          "filterValues":{},
          "applyFilterButton":{
            "title":{
              label_en: 'Apply Filter',
              label_es: 'Aplicar Filtro',
            }
          },
          "clearFilterButton":{
            "title":{
              label_en: 'Clear Filter',
              label_es: 'Limpiar Filtro',
            }
          },
          "displayFilterButton":{
            "title":{
              label_en: 'Display Filter',
              label_es: 'Mostrar Filtro',
            }
          },
          dialogInfo: {
            name: 'genericDialog',

            "fields": [
              {
                "name": "name",
                "label_en": "Name",
                "label_es": "Nombre",
                "type":"text",
              },
              {
                "name": "incub_stage",
                "label_en": "Incub Stage",
                "label_es": "Etapa de incubación",
                "type":"text",
              },
              {
                "name": "incubation_start",
                "label_en": "Incubation Start",
                "label_es": "Inicio de incubación",
                "type":"text",
              },
              {
                "name": "incub_stage",
                "type":"select",
                "label_en": "Incub Stage",
                "label_es": "Etapa de incubación",
                "select_options":[
                  {
                    "name":"1",
                    "lable_en":"1",
                    "lable_es":"1",
                    "value":"1"
                  }
                ]
              }
              ],
          }
        },
        "title": "Testing Script Coverage",
        "add_border":true,
        "num_columns": 1,        
        "theme":"TRAZiT-DefinitionArea",
        "endPointPropertyArray":["active_batches"],
        "dataIntegrityCheck":{
          "dropingEntryRequiredProperties":["sample_id", "study", "temperature"],
        },        
        "fieldsToDisplay": [
          {
            "name": "name",
            "label_en": "name",
            "label_es": "name"
          },
          {
            "name": "incub_stage",
            "label_en": "incub_stage",
            "label_es": "incub_stage"
          },
          {
            "name": "incubation_start",
            "label_en": "incubation_start",
            "label_es": "incubation_start"
          }
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
            { "argumentName": "sampleId", "dragElement": "sample_id" },
            { "argumentName": "batchTemplateId", "dropElement": "name" },
            { "argumentName": "batchTemplateVersion", "defaultValue": 1 },
            { "argumentName": "batchName", "dropElement": "name" }			  
          ]
        }  
      },
      { "dragEnable": false,
      "dropEnable": false,
      "name": "3",
      "type": "table",
      smartFilter: {
        "filterValues":{},
        "applyFilterButton":{
          "title":{
            label_en: 'Apply Filter',
            label_es: 'Aplicar Filtro',
          }
        },
        "clearFilterButton":{
          "title":{
            label_en: 'Clear Filter',
            label_es: 'Limpiar Filtro',
          }
        },
        "displayFilterButton":{
          "title":{
            label_en: 'Display Filter',
            label_es: 'Mostrar Filtro',
          }
        },
        dialogInfo: {
          name: 'genericDialog',

          "fields": [
            {
              "name": "name",
              "label_en": "Name",
              "label_es": "Nombre",
              "type":"text",
            },
            {
              "name": "incub_stage",
              "label_en": "Incub Stage",
              "label_es": "Etapa de incubación",
              "type":"text",
            },
            {
              "name": "incubation_start",
              "label_en": "Incubation Start",
              "label_es": "Inicio de incubación",
              "type":"text",
            },
            {
              "name": "incub_stage",
              "type":"select",
              "label_en": "Incub Stage",
              "label_es": "Etapa de incubación",
              "select_options":[
                {
                  "name":"1",
                  "lable_en":"1",
                  "lable_es":"1",
                  "value":"1"
                }
              ]
            }
            ],
        }
      },
      "theme":"TRAZiT-DefinitionArea",
      "endPointPropertyArray":["active_batches"],
      "dataIntegrityCheck":{
        "dropingEntryRequiredProperties":["sample_id", "study", "temperature"],
      },
      "columns": [
        {
          "name": "name",
          "label_en": "name",
          "label_es": "name"
        },
        {
          "name": "incub_stage",
          "label_en": "incub_stage",
          "label_es": "incub_stage"
        },
        {
          "name": "incubation_start",
          "label_en": "incubation_start",
          "label_es": "incubation_start"
        }
      ],
      "rowbuttons": { 
        "actionName": "EM_BATCH_INCUB_ADD_SMP",
        "endPointUrl": "Samples",
        "requiresDialog": false,          
        "alternativeItemPropertyName": "selectedSamples",
        "button": {
          "title": {
            "label_en": "Add to Batch", "label_es": "Añadir a Tanda"
          },
          "requiresGridItemSelected": true,          
        },
        "endPointParams": [
          { "argumentName": "sampleId", "selObjectPropertyName": "sample_id" },
          { "argumentName": "batchTemplateId", "defaultValue": 1 },
          { "argumentName": "batchTemplateVersion", "defaultValue": 1 },
          { "argumentName": "batchName", "internalVariableObjName": "selectedBatches", "internalVariableObjProperty": "name" }			  
        ]
      },        
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
          { "argumentName": "sampleId", "dragElement": "sample_id" },
          { "argumentName": "batchTemplateId", "dropElement": "name" },
          { "argumentName": "batchTemplateVersion", "defaultValue": 1 },
          { "argumentName": "batchName", "dropElement": "name" }			  
        ]
      }  
    }        
    ],
  },
  "tree-view":{
	"component": "TreeView",  
  },
  "culture-medium":{
	"component": "ModuleEnvMonitCultureMedium",  
  },
  "prototype-elements-view-main":{
    "component": "PrototypeElementsViewMain",  
  },      
  "WhiteIpList": {
	"component": "TableWithButtons",
    "langConfig": {
	"title": {
        "WhiteIpList": {
          "label_en": "White (Accepted) IPs List",
          "label_es": "Lista de IPs aceptadas (Blancas)"
        }
      },
      "xxxfields": {
        "ip_value1": { "label_en": "Section 1", "label_es": "Bloque 1" },
        "ip_value2": { "label_en": "Section 2", "label_es": "Bloque 2" },
        "ip_value3": { "label_en": "Section 3", "label_es": "Bloque 3" },
        "ip_value4": { "label_en": "Section 4", "label_es": "Bloque 4" },
        "description": { "label_en": "Description", "label_es": "Descripción" }
      },
      "gridHeader": {
        "active": {
          "label_en": "Active", "label_es": "Activo", "sort": false, "filter": true, "is_icon": true, "width": "20%"
        },
        "ip_value1": {
          "label_en": "Section 1", "label_es": "Bloque 1", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value2": {
          "label_en": "Section 2", "label_es": "Bloque 2", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value3": {
          "label_en": "Section 3", "label_es": "Bloque 3", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value4": {
          "label_en": "Section 4", "label_es": "Bloque 4", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "description": {
          "label_en": "Description", "label_es": "Descripción", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        }
      }
    },	
    "viewQuery":{ "actionName": "GET_WHITE_IP_LIST",
      "xxxclientMethod": "getSamples",
      "addRefreshButton": true,
      "endPoint": "/app/PlatformAdminAPIqueries",
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      }
    },
    "actions": [
      { "actionName": "ADD_WHITE_IP",
		"requiresDialog": true,
        "xxxclientMethod": "setWhiteIpsList",
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New", "label_es": "Nuevo"
          },
          "requiresGridItemSelected": false
        },
        "dialogInfo": {          
			"name": "genericDialog",
			"fields":[
			{"text1": { "label_en": "Section 1", "label_es": "Sección 1" }},
			{"text2": { "label_en": "Section 2", "label_es": "Sección 2" }},
			{"text3": { "label_en": "Section 3", "label_es": "Sección 3" }},
			{"text4": { "label_en": "Section 4", "label_es": "Sección 4" }},
			{"text5": { "label_en": "Description", "label_es": "Descripción" }}			
			]
        },
        "endPointParams": [
          { "argumentName": "ip_value1", "element": "text1" },
          { "argumentName": "ip_value2", "element": "text2" },
          { "argumentName": "ip_value3", "element": "text3" },
          { "argumentName": "ip_value4", "element": "text4" },
          { "argumentName": "description", "element": "text5" }
        ]
      },
      { "actionName": "DEACTIVATE_WHITE_IP",
        "xxxclientMethod": "setWhiteIpsList",
		"requiresDialog": false,
        "button": {
            "img": "deactivate.svg",
            "title": {
              "label_en": "Deactivate", "label_es": "Desactivar"
            },
            "requiresGridItemSelected": true,
            "hideWhenSelectedItem": {
              "column": "active",
              "value": false
            }  
        },
        "endPointParams": [
          { "argumentName": "id", "selObjectPropertyName": "id" }
        ]
      },
      { "actionName": "ACTIVATE_WHITE_IP",
		"requiresDialog": false,
        "xxxclientMethod": "setWhiteIpsList",
        "button": {
            "img": "activate.svg",
            "title": {
              "label_en": "Activate", "label_es": "Activar"
            },
            "requiresGridItemSelected": true,
            "hideWhenSelectedItem": [
				{"column": "active","value": true},
				{"column": "active","value": true}
			]
        },
        "endPointParams": [
          { "argumentName": "id", "selObjectPropertyName": "id" }
        ]
      },
      { "actionName": "UPDATE_WHITE_IP",
        "xxxclientMethod": "setWhiteIpsList",
		"requiresDialog": true,
        "button": {
            "icon": "alarm_on",
            "title": {
                "label_en": "Update", "label_es": "Modificar"
            },
            "requiresGridItemSelected": true
        },
        "dialogInfo": {          
			"name": "genericDialog",
			"fields":[
				{"text1": { "label_en": "Section 1", "label_es": "Sección 1", "selObjectPropertyName": "ip_value1"}},
				{"text2": { "label_en": "Section 2", "label_es": "Sección 2", "selObjectPropertyName": "ip_value2" }},
				{"text3": { "label_en": "Section 3", "label_es": "Sección 3", "selObjectPropertyName": "ip_value3" }},
				{"text4": { "label_en": "Section 4", "label_es": "Sección 4", "selObjectPropertyName": "ip_value4" }},
				{"text5": { "label_en": "Description", "label_es": "Descripción", "selObjectPropertyName": "description" }}		
			]		  
        },
        "endPointParams": [
          { "argumentName": "id", "selObjectPropertyName": "id" },
          { "argumentName": "ip_value1", "element": "text1" },
          { "argumentName": "ip_value2", "element": "text2" },
          { "argumentName": "ip_value3", "element": "text3" },
          { "argumentName": "ip_value4", "element": "text4" },
          { "argumentName": "description", "element": "text5" }
        ]
    },
	  { "actionName": "REMOVE_WHITE_IP",
        "xxxclientMethod": "setWhiteIpsList",
		"requiresDialog":false,
        "button": {
          "icon": "remove",
          "title": {
            "label_en": "Remove", "label_es": "Borrar"
          },
          "requiresGridItemSelected": true
      },
      "endPointParams": [
        { "argumentName": "id", "selObjectPropertyName": "id" }
      ]
    }
  ]
  },
  "BlackIpList": {
	"component": "TableWithButtons",
    "langConfig": {
	"title": {
        "BlackIpList": {
          "label_en": "Black (Banned) IPs List",
          "label_es": "Lista de IPs bloqueadas (Baneadas)"
        }
      },
      "fields": {
        "ip_value1": { "label_en": "Section 1", "label_es": "Bloque 1" },
        "ip_value2": { "label_en": "Section 2", "label_es": "Bloque 2" },
        "ip_value3": { "label_en": "Section 3", "label_es": "Bloque 3" },
        "ip_value4": { "label_en": "Section 4", "label_es": "Bloque 4" },
        "description": { "label_en": "Description", "label_es": "Descripción" }
      },
      "gridHeader": {
        "active": {
          "label_en": "Active", "label_es": "Activo", "sort": false, "filter": true, "is_icon": true, "width": "20%"
        },
        "ip_value1": {
          "label_en": "Section 1", "label_es": "Bloque 1", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value2": {
          "label_en": "Section 2", "label_es": "Bloque 2", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value3": {
          "label_en": "Section 3", "label_es": "Bloque 3", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "ip_value4": {
          "label_en": "Section 4", "label_es": "Bloque 4", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        },
        "description": {
          "label_en": "Description", "label_es": "Descripción", "sort": false, "filter": true, "is_icon": false, "width": "10%"
        }
      }
    },	
    "viewQuery":{ "actionName": "GET_BLACK_IP_LIST",
      "addRefreshButton": true,
      "endPoint": "/app/PlatformAdminAPIqueries",
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      }
    },
    "actions": [
      { "actionName": "ADD_BLACK_IP",
		"requiresDialog": true,
        "button": {
          "icon": "create_new_folder",
          "title": {
            "label_en": "New", "label_es": "Nuevo"
          },
          "whenDisabled": "samplesReload"
        },
        "dialogInfo": {          
			"name": "genericDialog",
			"fields":[
			{"text1": { "label_en": "Section 1", "label_es": "Sección 1" }},
			{"text2": { "label_en": "Section 2", "label_es": "Sección 2" }},
			{"text3": { "label_en": "Section 3", "label_es": "Sección 3" }},
			{"text4": { "label_en": "Section 4", "label_es": "Sección 4" }},
			{"text5": { "label_en": "Description", "label_es": "Descripción" }}		
			]
        },
        "endPointParams": [
          { "argumentName": "ip_value1", "element": "text1" },
          { "argumentName": "ip_value2", "element": "text2" },
          { "argumentName": "ip_value3", "element": "text3" },
          { "argumentName": "ip_value4", "element": "text4" },
          { "argumentName": "description", "element": "text5" }
        ]
      },
      { "actionName": "DEACTIVATE_BLACK_IP",
        "xxxclientMethod": "setWhiteIpsList",
		"requiresDialog": false,
        "button": {
            "img": "deactivate.svg",
            "title": {
              "label_en": "Deactivate", "label_es": "Desactivar"
            },
            "requiresGridItemSelected": true,
            "showWhenSelectedItem": {
              "column": "active",
              "value": true
            }  
        },
        "endPointParams": [
          { "argumentName": "id", "selObjectPropertyName": "id" }
        ]
      },
      { "actionName": "ACTIVATE_BLACK_IP",
		"requiresDialog": false,
        "button": {
            "img": "activate.svg",
            "title": {
              "label_en": "Activate", "label_es": "Activar"
            },
            "requiresGridItemSelected": true,
            "showWhenSelectedItem": {
              "column": "active",
              "value": false
            }  
        },
        "endPointParams": [
          { "argumentName": "id", "selObjectPropertyName": "id" }
        ]
      },
      { "actionName": "UPDATE_BLACK_IP",
		"requiresDialog": true,
        "button": {
            "icon": "alarm_on",
            "title": {
                "label_en": "Update", "label_es": "Modificar"
            },
            "requiresGridItemSelected": true
        },
        "dialogInfo": {          
			"name": "genericDialog",
			"fields":[
				{"text1": { "label_en": "Section 1", "label_es": "Sección 1", "selObjectPropertyName": "ip_value1"}},
				{"text2": { "label_en": "Section 2", "label_es": "Sección 2", "selObjectPropertyName": "ip_value2" }},
				{"text3": { "label_en": "Section 3", "label_es": "Sección 3", "selObjectPropertyName": "ip_value3" }},
				{"text4": { "label_en": "Section 4", "label_es": "Sección 4", "selObjectPropertyName": "ip_value4" }},
				{"text5": { "label_en": "Description", "label_es": "Descripción", "selObjectPropertyName": "description" }}		
			]		  
        },
        "endPointParams": [
          { "argumentName": "id", "selObjectPropertyName": "id" },
          { "argumentName": "ip_value1", "element": "text1" },
          { "argumentName": "ip_value2", "element": "text2" },
          { "argumentName": "ip_value3", "element": "text3" },
          { "argumentName": "ip_value4", "element": "text4" },
          { "argumentName": "description", "element": "text5" }
        ]
    },
	  { "actionName": "REMOVE_BLACK_IP",
		"requiresDialog":false,
        "button": {
          "icon": "remove",
          "title": {
            "label_en": "Remove", "label_es": "Borrar"
          },
          "requiresGridItemSelected": true
      },
      "endPointParams": [
        { "argumentName": "id", "selObjectPropertyName": "id" }
      ]
    }
  ]
  },
  "PlatformBusRules": {
	"component": "TableWithButtons",
    "langConfig": {
      "title": {
        "platformBusRules": {
          "label_en": "Platform Business Rules",
          "label_es": "Reglas de Negocio de la Plataforma"
        }
      },
      "gridHeader": {
        "area": {"label_en": "Area", "label_es": "Área", "sort": false, "filter": true, "is_icon": false, "width": "20%", "align": "left"},
        "rule_name": {"label_en": "Name", "label_es": "Nombre", "sort": false, "filter": true, "is_icon": false, "width": "20%"},
        "rule_value": {"label_en": "Value", "label_es": "Valor", "sort": false, "filter": true, "is_icon": false, "width": "10%"},
        "disabled": {"label_en": "Disabled?", "label_es": "¿Deshabilitada?", "sort": false, "filter": true, "is_icon": true, "width": "10%"}
      }
    },
    "viewQuery":
    {
      "actionName": "GET_PLATFORM_BUSINESS_RULES",
      "addRefreshButton": true,
      "endPoint": "/app/PlatformAdminAPIqueries",
      "button": {
        "icon": "refresh",
        "title": {
          "label_en": "Reload", "label_es": "Recargar"
        },
        "requiresGridItemSelected": true
      }
    },
    "actions": [
    ]
  }
}

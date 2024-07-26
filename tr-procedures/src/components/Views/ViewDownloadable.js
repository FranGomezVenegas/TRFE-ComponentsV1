export function ViewDownloadable(base) {
return class extends  (base) {
    getDataFromRoot(elem, data) {
        if (elem!==undefined&&elem.contextVariableName!==undefined){
          if (this[elem.contextVariableName]!==undefined){
            data=this[elem.contextVariableName]
          }
        }
        if (data === null || data === undefined) {
          return undefined;
        }
        if (elem.endPointPropertyArray !== undefined) {
          if (elem.endPointPropertyArray.length === 0) {
            return data;
          }
          if (
            elem.endPointPropertyArray.length === 1 &&
            elem.endPointPropertyArray[0].toUpperCase() === "ROOT"
          ) {
            return data;
          }
          //const numObjectsToSkip = elem.endPointPropertyArray.length - 1;
          //const propertyName = elem.endPointPropertyArray[numObjectsToSkip];
          let i = 0;
          let subJSON = {};
          //data = data[elem.endPointPropertyArray[0]][0]
          for (i = 0; i < elem.endPointPropertyArray.length; i++) {
            if (data === null) {
              return undefined;
            }
            let propertyName = elem.endPointPropertyArray[i];
            if (Array.isArray(data[propertyName])) {
              if (i < elem.endPointPropertyArray.length - 1) {
                subJSON = data[propertyName][0];
              } else {
                return data[propertyName];
              }
            } else {
              subJSON = data[propertyName];
            }
            if (typeof subJSON === "undefined") {
              return data;
            } else {
              data = subJSON;
            }
          }
          return data;
          if (typeof subJSON === "undefined") {
            return undefined;
          } else if (elem.endPointPropertyArray.length % 2 === 0) {
            // If the input array has an even number of elements, skip one more object level before recursing
            return getValueFromNestedJSON(
              subJSON,
              elem.endPointPropertyArray.slice(0, numObjectsToSkip)
            );
          } else {
            // Otherwise, recurse on the sub-JSON with the remaining elem.endPointPropertyArray elements
            return getValueFromNestedJSON(
              subJSON,
              elem.endPointPropertyArray.slice(0, numObjectsToSkip)
            );
          }
        } else {
          if (
            elem.endPointResponseObject !== undefined &&
            elem.endPointResponseObject2 !== undefined
          ) {
            let dataToRet = [];
            dataToRet = data[elem.endPointResponseObject];
            if (dataToRet !== undefined) {
              return dataToRet[elem.endPointResponseObject2];
            } else {
              return [];
            }
          } else {
            if (String(elem.endPointResponseObject).toUpperCase() === "ROOT") {
              if (!Array.isArray(data)) {
                let dataArr = [];
                dataArr.push(data);
                return dataArr;
              }
              return data;
            } else {
              return data[elem.endPointResponseObject];
            }
          }
        }
      }
  
    downloadDataTableToCSV() {
        console.log('this.viewModelFromProcModel', this.viewModelFromProcModel)
        let csvContent = "data:text/csv;charset=utf-8;"
        let header = [], contents = []
        contents = this.getTraceabilityInfo()
        let data=this.getDataFromRoot(this.viewModelFromProcModel.download.elements[0], this.selectedItem)
        for (let i=0; i<data.length; i++) {
          //if (data[i].spec_code) {
            if (!header.length) {
              Object.entries(data[i]).map(([key]) => {
                header.push(key)
              })
              contents.push(header)
            }
            let content = []
            Object.entries(data[i]).map(([key, val]) => {
              content.push(val)
            })        
            contents.push(content)
          //}
        }
        contents.forEach(rowArray => {      
          let row = rowArray.join(",")
          csvContent += row + "\r\n";
        })
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
    
        let currentDate = new Date();
        let cDay = currentDate.getDate()
        let cMonth = currentDate.getMonth() + 1
        let cYear = currentDate.getFullYear()
    
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", this.viewModelFromProcModel.download.filename["label_"+this.lang]+'_'+cYear+cMonth+cDay+".csv");
        link.click()
      }

      getTraceabilityInfo(){
        let trackInfo = []
        let userSession = JSON.parse(sessionStorage.getItem("userSession"))
        let traceLbls=this.viewModelFromProcModel.download.fileHeader
        //${userSession.header_info.first_name} ${userSession.header_info.last_name} (${userSession.userRole})<br></br
        trackInfo.push([traceLbls.traceabilityInfoTitle["label_"+this.lang]])
        trackInfo.push([traceLbls.userRun1["label_"+this.lang], new Date(), traceLbls.userRun2["label_"+this.lang], userSession.header_info.first_name+' '+userSession.header_info.last_name])
        trackInfo.push([traceLbls.reportName["label_"+this.lang],  this.viewModelFromProcModel["label_"+this.lang], this.viewModelFromProcModel.action])
        trackInfo.push([traceLbls.system["label_"+this.lang],  userSession.dbName, traceLbls.procedure["label_"+this.lang], this.procInstanceName])

        trackInfo.push([traceLbls.filterTitle["label_"+this.lang]])
        //this.filterCurrentData
        let filterData=this.jsonParam(this.viewModelFromProcModel.viewQuery, this.filterCurrentData, undefined, undefined) 
        console.log('filterData', filterData)
        for (let propName in filterData) {
            if (filterData.hasOwnProperty(propName)) {
                let propValue = filterData[propName];
                trackInfo.push([`, ${propName}: ${propValue}`]);
            }
        }        

        trackInfo.push([traceLbls.dataTitle["label_"+this.lang]])
    //    dbName: this.config.dbName,
    //    schemaPrefix: this.procName, 
        return trackInfo
    }
  

}
}
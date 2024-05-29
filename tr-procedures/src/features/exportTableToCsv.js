export function ExportTableToCsv(base) {
    return class extends (base) {
        downloadDataTableToCSV(downloadElements, dataArr, downaloadbleButtonModel, lang = 'en') {
            if (downloadElements===undefined){
                alert("The definition to download is wrong")
                return
            }
            console.log('downloadElements', downloadElements);
            let csvContent = "data:text/csv;charset=utf-8,";
            let headers = Object.entries(downloadElements).map(([key, value]) => value[`label_${lang}`] || key);
            
            let contents = this.getTraceabilityInfo()
            // Add headers to CSV content
            contents.push(headers.join(","));
        
            // Filter and map dataArr to include only the keys present in downloadElements
            if (dataArr!==undefined){
                dataArr.forEach(item => {
                    let row = Object.values(downloadElements).map(key => {
                        return item.hasOwnProperty(key.name) ? `"${item[key.name]}"` : ""; // Ensure to handle potential commas in data
                    }).join(",");
                    contents.push(row);
                });
            }
            // Joining all rows with newline to form the final CSV content
            csvContent += contents.join("\r\n");
            let encodedUri = encodeURI(csvContent);
            let link = document.createElement("a");
        
            // Date formatting with leading zeros for single digits
            let currentDate = new Date();
            let cDay = ('0' + currentDate.getDate()).slice(-2);
            let cMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
            let cYear = currentDate.getFullYear();
        
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `export_${cYear}${cMonth}${cDay}.csv`); // Simplified filename
            document.body.appendChild(link); // Append link to the body to ensure it can be clicked
            link.click();
            document.body.removeChild(link); // Clean up link after clicking
        }

        getTraceabilityInfo(model){
            let trackInfo = []
            let userSession = JSON.parse(sessionStorage.getItem("userSession"))
            //${userSession.header_info.first_name} ${userSession.header_info.last_name} (${userSession.userRole})<br></br
            trackInfo.push(['Traceability Info: '])
            trackInfo.push(['This file was created on', new Date(), 'by', userSession.header_info.first_name+' '+userSession.header_info.last_name])
            //trackInfo.push(['KPI Name',  model["label_"+this.lang], model.action])
            trackInfo.push(['system',  this.dbName, 'Procedure', this.procName])
            trackInfo.push(['Data: '])
        //    dbName: this.config.dbName,
        //    schemaPrefix: this.procName, 
            return trackInfo
          }        
    }
}
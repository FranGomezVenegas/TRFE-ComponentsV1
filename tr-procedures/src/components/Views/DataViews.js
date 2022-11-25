import { html, css, nothing} from 'lit';
//import { columnBodyRenderer } from 'lit-vaadin-helpers';
//import { ApiFunctions } from '../Api/ApiFunctions';

 

export function DataViews(base) {
    return class extends (base) {

        kpiChartFran(elem){
            //console.log('kpiChartFran', 'elem', elem, 'data', this.data)
            return html`
              ${elem.display_chart !==true ? nothing :
              html`        
                ${this.chartStyle(elem.chart_name)}    
                  <google-chart id="${elem.chart_name}" title="${elem.chart_title["label_"+this.lang]}" type="${elem.chart_type}" 
                    .data="${this.getChartData(elem)}" .options="${this.getChartOptions(elem)}"></google-chart>
            `} 
            `   
        }

        jsonViewer(elem, data = {}){
        console.log('jsonViewer', 'elem', elem, 'data', data, 'dataToDisplay', data[elem.endPointResponseObject])
        return html`
            ${elem===undefined||data===undefined ? nothing : html`
            <json-viewer>${data[elem.endPointResponseObject]}</json-viewer>       
            `}
        `   
        }     
        kpiReportTitle(elem){
            return html`    
             <h1 style="${this.kpiStyleByStringAttribute("h1", elem)}" id="reportTitle">${elem.title["label_"+this.lang]}<h1>
            `
        }             

        kpiRecoveryRate(){
            //console.log('kpiRecoveryRate', this.data.recoveryrate_datatable)
            return html`
              ${!this.data.recoveryrate_datatable||!this.data.recoveryrate_datatable.data ? 
                nothing : 
              html`
                <lit-datatable .data="${this.data.recoveryrate_datatable.data}" .conf="${this.data.recoveryrate_datatable.conf}"></lit-datatable>
              `}
            `
        }
        kpiGrid(elem){
            //console.log('kpiGrid', elem, "data", this.data[elem.elementName])
            var fldsToDisplay=[]
            for (var i=0;i<elem.fieldsToDisplay.length;i++){
              if (elem.fieldsToDisplay[i]["label_"+this.lang]!==undefined){
                elem.fieldsToDisplay[i].header=elem.fieldsToDisplay[i]["label_"+this.lang]
              }
            }
        
            return html`
              
              ${!this.data[elem.elementName]||!elem.fieldsToDisplay ? 
                nothing : 
              html`
                <lit-datatable .data="${this.data[elem.elementName]}" .conf="${elem.fieldsToDisplay}"></lit-datatable>
              `}
            `
        }
        kpiCardSomeElementsSingleObject(elem, data){
            return html`  
            ${this.kpiCardSomeElementsMain(elem, data[elem.endPointResponseObject])}
            ` 
        }
        cardSomeElementsRepititiveObjects(elem, data){
            console.log('cardSomeElementsRepititiveObjects', 'elem', elem, 'data', data)
            return html`  
            ${data[elem.endPointResponseObject].map(d => 
                html`
                ${this.kpiCardSomeElementsMain(elem, d)}
                `
            )}
            ` 
        }        
        kpiCardSomeElementsMain(elem, data){
            //console.log('kpiCardSomeElementsMain', 'elem', elem, 'data', data)
            return html`            
            ${data===undefined ? html`nothing to do` :
                html`
                ${elem.fieldsToDisplay.map(d =>                    
                    html`                    
                    <li>${this.fieldLabel(d)}: ${data[d.name]}</li>`
                )}
            `}`
        }
        fieldLabel(d){
            return d["label_"+this.lang]!==undefined ? d["label_"+this.lang] : d.name
            
        }
        kpiCard(elem){
            //console.log('kpiCard', 'elem', elem, 'data', this.data)
            return html`
              ${!this.data||!this.data[elem.elementName] ? nothing :
              html`
                <sp-card-ext heading="Report for the production lot" subheading="'this[elem.subheadingObj].value'">
                  <div slot="footer">
                    ${this.data[elem.elementName].map(d =>
                      html`<li>${d.field_name}: ${d.field_value}</li>`
                    )}
                  </div>
                </sp-card-ext>
              `}
            `
        }
        kpiStyleByStringAttribute(elType, elem){
            var defaultOptions=""    
            if (elType = "title"){
              defaultOptions="width:300px;color:blue;"    
            }
            if (elType = "div"){
              defaultOptions="display:flex"    
            }
            let chartObj=this.shadowRoot.querySelector(elType+"#"+elem.elementName)    
            var chartOptions={}
            if (elem.style===undefined){
              return defaultOptions //"color:red;"
            } else {
              return elem.style
            }
            return 
        }
        kpiChartFran(elem){
            //console.log('kpiChartFran', 'elem', elem, 'data', this.data)
            return html`
              ${elem.display_chart !==true ? nothing :
              html`        
                ${this.chartStyle(elem.chart_name)}    
                  <google-chart id="${elem.chart_name}" title="${elem.chart_title["label_"+this.lang]}" type="${elem.chart_type}" 
                    .data="${this.getChartData(elem)}" .options="${this.getChartOptions(elem)}"></google-chart>
              `} 
              `   
        }
        chartStyle(chartName){
            let chartObj=this.shadowRoot.querySelector("google-chart#"+chartName)    
            if (chartObj!==undefined&&chartObj!==null){
              chartObj.style.setProperty("width", "500px")
            }
            console.log('chartStyle', 'chartName', chartName, chartObj)
        }
          
        addNumericValue(rule, value){
            if (rule==undefined){return true;}
            if (value==undefined){return false;}
            if (rule.min_allowed!=undefined){if (value<=rule.min_allowed){return false;}}
            if (rule.min_allowed_included<undefined){if (value<rule.min_allowed_included){return false;}}
            if (rule.max_allowed!=undefined){if (value>=rule.max_allowed){return false;}}
            if (rule.max_allowed_included>undefined){if (value>rule.max_allowed_included){return false;}}
            if (rule.value!=undefined){if (rule.value==value){return false;}}
            return true;
        }
        getChartData(elem){
           // console.log('getChartData', elem, 'chartData', this.data[elem.chart_name])
            var chartData=[]
            chartData=[[elem.label_item, elem.label_value]]
            if (this.data[elem.chart_name]!==undefined){
              var dataForChart=this.data[elem.chart_name]
              for (var i = 0; i < dataForChart.length; i++) {
                if (!elem.grouper_exclude_items.includes(dataForChart[i][elem.grouper_field_name])){
                  if (this.addNumericValue(elem.counterLimits, dataForChart[i][elem.counter_field_name])){
                    var curchtval=[]
                    chartData.push([
                      this.labelPossibleReplacement(elem, dataForChart[i][elem.grouper_field_name]), 
                      dataForChart[i][elem.counter_field_name] 
                    ])
                  }
                }
              }
            }
            //console.log('getChartData', 'chartData', chartData)
            return chartData
        }
        labelPossibleReplacement(elem, labelValue){
            if (elem.label_values_replacement!==undefined){
              var fld=elem.label_values_replacement[labelValue]
              if (fld!==undefined){
                return fld["label_"+this.lang]
              }
              //console.log('labelPossibleReplacement', labelValue, 'fld', fld)
            }
            return labelValue
        }
        getChartOptions(elem){
            var defaultChartOptions={
              width:"300px",
              backgroundColor:"transparent",
              is3D:true
            }
            var chartOptions={}
            if (elem.chart_title!==undefined){    
              chartOptions.title=elem.chart_title["label_"+this.lang] 
            }
            if (elem.chartStyle===undefined){
              Object.entries(defaultChartOptions).map(([key, val]) => {
                //console.log(key, val)
                chartOptions[key]=val
              })      
            } else {
              Object.entries(elem.chartStyle).map(([key, val]) => {
                //console.log(key, val)
                chartOptions[key]=val
              })            
            }
            return chartOptions
        }
        
        kpiCharts(elem){
            return html`
            <datamining-google-chart-ext id="chart1" 
            @redrawed=${e=>this.dispatchEvent(new CustomEvent('chart-images', {
              detail: { imgUri: e.target.imageURI }
            }))} 
            style="margin: 5px 5px 30px 8px" 
            type="line" 
            options='{"height": ${this.chartH}, "width": ${this.chartW}}'></datamining-google-chart-ext>
          <datamining-google-chart-ext id="chart2" 
            @redrawed=${e=>this.dispatchEvent(new CustomEvent('chart-images', {
              detail: { imgUri: e.target.imageURI }
            }))} 
            style="margin: 5px 5px 30px 8px" 
            type="line" 
            options='{"height": ${this.chartH}, "width": ${this.chartW}}'></datamining-google-chart-ext>
            `
        }        

    }
}
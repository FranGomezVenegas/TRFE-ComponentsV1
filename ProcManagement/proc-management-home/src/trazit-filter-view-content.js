import { LitElement, html, css, nothing } from 'lit';
import { CommonCore } from '@trazit/common-core';
import { Layouts } from '@collaborne/lit-flexbox-literals';
import '@alenaksu/json-viewer';

// import '@material/mwc-icon-button';
 //import '@material/mwc-ripple'
import '@spectrum-web-components/split-view/sp-split-view';
//import '@trazit/tr-procedures/src/browser/sp-card-ext';
 import '../../../tr-procedures/src/browser/sp-card-ext';
import {TrazitFilterActions} from './TrazitFilterActions';
import '@doubletrade/lit-datatable';

import {TrazitDialogTemplate} from './TrazitDialogTemplate';
import {TrazitDialogActions} from './TrazitDialogActions';

// import { GoogleChart } from '@google-web-components/google-chart';
// import '@google-web-components/google-chart';

// class TrazitFilterViewContentGoogleChartExt extends GoogleChart {
//   redraw() {
//     if (this.chartWrapper == null || this._data == null)
//         return;
//     // `ChartWrapper` can be initialized with `DataView` instead of `DataTable`.
//     this.chartWrapper.setDataTable(this._data);
//     this.chartWrapper.setOptions(this.options || {});
//     this.drawn = false;
//     if (this.redrawTimeoutId !== undefined)
//         clearTimeout(this.redrawTimeoutId);
//     this.redrawTimeoutId = window.setTimeout(() => {
//         // Drawing happens after `chartWrapper` is initialized.
//         this.chartWrapper.draw();
//         this.dispatchEvent(new CustomEvent('redrawed'))
//     }, 5);
//   }
// }
// customElements.define('trazit-filter-view-content-google-chart-ext', TrazitFilterViewContentGoogleChartExt);

export class TrazitFilterViewContent extends TrazitDialogActions(TrazitDialogTemplate(TrazitFilterActions(CommonCore))) {
  static get styles() {
    return [
      Layouts,
      css`
      :host {
        display: block;
      }
      sp-split-view {
        height: calc(100vh - 150px);
      }
      #leftSplit {
        padding: 10px;
        background-color:transparent
      }
      #leftSplit::-webkit-scrollbar, #rightSplit::-webkit-scrollbar {
        display: none;
      }
      #rightSplit{
        background-color:transparent
      }
      div[hidden] {
        display: none;
      }
      div#body{
        border-top-width: 0px;
        padding-top: 0px;
      }
      mwc-icon {
        cursor: pointer;
      }
      mwc-icon[hidden] {
        display: none;
      }
      json-viewer {
        --background-color: #fff;
        --color: #f8f8f2;
        --string-color: #03A9F4;
        --number-color: #03A9F4;
        --boolean-color: #03A9F4;
        --null-color: #df9cf3;
        --property-color : #24C0EB;
        --property-color : rgb(36, 192, 235);
        --font-family: Myriad Pro;
        --preview-color: rgba(222, 175, 143, 0.9);
        --highlight-color: #7b0000;
    
        display: block;
        background-color: var(--background-color);
        color: var(--color);
        padding: 0.5rem;
        font-family: var(--font-family);
        font-size: 1.3rem;        
      }
      img {
        height:15vw;
        width:30vw;
      }
    `];
  }

  render() {
    //console.log('render', this.activeTab)
    return html`
    <div class="layout horizontal">
    ${this.activeTab&&this.activeTab.printable&&this.activeTab.printable===true ?
    html`
      <mwc-icon-button icon="print" @click=${this.print}></mwc-icon-button>                
    `: nothing}

    ${this.activeTab&&this.activeTab.download&&this.activeTab.download.active===true ?
      html`    
      <mwc-icon-button icon="download" @click=${this.downloadDataTableToCSV}></mwc-icon-button>                
    `: nothing}
    </div>
    <div id="kpidata" class="layout horizontal flex wrap">
        ${this.kpiElementsController()}
      
      <!-- ${Object.keys(this.data).length ?
        html`<json-viewer>${JSON.stringify(this.data)}</json-viewer>` :
        nothing
      } -->
      </div>
    `;
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
    console.log('kpiGrid', elem, "data", this.data[elem.elementName])
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
        ${!elem.subelementName ?
        html ` 
        <lit-datatable .data="${this.data[elem.elementName]}" .conf="${elem.fieldsToDisplay}"></lit-datatable>
        `: 
        html`
        <lit-datatable .data="${this.data[elem.elementName][elem.subelementName]}" .conf="${elem.fieldsToDisplay}"></lit-datatable>
        `
        }
      `}
    `
  }
  kpiReportTitle(elem){
    return html`    
     <h1 style="${this.kpiStyleByStringAttribute("h1", elem)}" id="reportTitle">${elem.title["label_"+this.lang]}<h1>
    `
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
  cardClicked(e){
    if (e.currentTarget.currentelement.detailContent===undefined||e.currentTarget.currentelement.detailContent.elementType===undefined){return;}
    switch (e.currentTarget.currentelement.detailContent.elementType.toLowerCase()){
      case "jsonviewer":
        let jsVw=this.shadowRoot.querySelector("json-viewer#kpiCardWithImageJsonViewer")
        if (jsVw!==undefined){
          if (jsVw.data===e.currentTarget.currentdata[e.currentTarget.currentelement.detailContent.elementName]){
            jsVw.data={}
            //this.selectedProcInstance=undefined
            return
          }
          jsVw.data=e.currentTarget.currentdata[e.currentTarget.currentelement.detailContent.elementName]          
          //this.selectedProcInstance=e.currentTarget.currentdata[e.currentTarget.currentelement.detailContent.elementName]
          return
        }
        return
      case "datatable":
        let jsTbl=this.shadowRoot.querySelector("lit-datatable#kpiCardWithImageDataTable")
        if (jsTbl!==undefined){
          if (jsTbl.data===e.currentTarget.currentdata[e.currentTarget.currentelement.detailContent.elementName]){
            jsTbl.data=[]
            //this.selectedProcInstance=undefined
            return
          }
          jsTbl.data=e.currentTarget.currentdata[e.currentTarget.currentelement.detailContent.elementName]
          jsTbl.conf=e.currentTarget.currentelement.detailContent.fieldsToDisplay
          //this.selectedProcInstance=e.currentTarget.currentdata[e.currentTarget.currentelement.detailContent.elementName]
          return
        }
        return
    }
    let divBut=this.shadowRoot.querySelector("div#but")
    if (divBut!==undefined){
      let butHtml=this.getButton(e.currentTarget.currentelement.buttons)
    }
    
  }

  kpiCardNoImage(elem){    
    return html`
      ${!this.data||!this.data[elem.elementName] ? nothing :
      html`
      <sp-split-view id="leftsplit" resizable primary-size="1150">
      <div id="leftSplit">
      <p>
        ${this.data[elem.elementName].map(entry =>
          html`          
          <trazit-filter-content-card .currentdata="${entry}" .currentelement="${elem}" @click=${this.cardClicked}>
            <div slot="header">
              ${elem.fieldsToDisplayHeader.map(d => html`<p style="${d.style}">${d.name}: ${entry[d.name]}</p>`)}
            </div>
            <div slot="footer">
              ${elem.fieldsToDisplayFooter.map(d => html`<p style="${d.style}">${d.name}: ${entry[d.name]}</p>`)}
            </div>            
          </trazit-filter-content-card>
          `
        )}
      </p> 
      </div>
      <div id="rightSplit">
        <div id="but"></div>
        <json-viewer id="kpiCardWithImageJsonViewer" .data="{}"></json-viewer>
        <lit-datatable id="kpiCardWithImageDataTable"></lit-datatable>
      </div>
      </sp-split-view>

      `}
    `
  }

  kpiCardWithImage(elem){    
    return html`
      ${!this.data||!this.data[elem.elementName] ? nothing :
      html`
      <sp-split-view id="leftsplit" resizable primary-size="1150">
      <div id="leftSplit">
      <p>
        ${this.data[elem.elementName].map(entry =>
          html`          
          <trazit-filter-content-card .currentdata="${entry}" .currentelement="${elem}" @click=${this.cardClicked}>
          <img id="g" slot="cover-photo2" src="${entry[elem.imageFld]!==undefined&&entry[elem.imageFld].length ? entry[elem.imageFld].toString() : '/images/trazit-removebg.png'}" alt="${entry[elem.image_alt]}" />          
            <div slot="footer">
              ${elem.fieldsToDisplayFooter.map(dElems =>  
              html`
              <p style="${dElems.style}">
                ${dElems.fields.map(d =>               
                html`
                  ${d.hideLabel!==undefined&&d.hideLabel===true ?
                  html`
                    ${entry[d.name]}`
                  :
                  html`${d.name}: ${entry[d.name]}`
                  }
                `
                )}
              </p>                
              `
              )}
            </div>
            
          </trazit-filter-content-card>
          `
        )}
      </p> 
      </div>
      <div id="rightSplit">
        <div id="but"></div>
        <json-viewer id="kpiCardWithImageJsonViewer" .data="{}"></json-viewer>
      </div>
      </sp-split-view>

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
    if (elem===undefined||elem.elementName===undefined){return defaultOptions} 
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
  kpiJsonViewerFran(elem){
    //console.log('kpiChartFran', 'elem', elem, 'data', this.data)
    return html`
      <json-viewer id="viewer" .data=${this.data[elem.elementName]}></json-viewer>
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


//   <sp-card-ext heading="Report for the production lot" subheading="'this[elem.subheadingObj].value'">
//   <div slot="footer">
//     ${this.data[elem.elementName].map(d =>
//       html`<li>${d.field_name}: ${d.field_value}</li>`
//     )}
//   </div>
// </sp-card-ext> 

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

  kpiDownloadButton(elem){
    html`
    <div class="layout horizontal flex wrap">
    </div>
    <div class="layout horizontal flex center-justified">
      <mwc-button label='Download Sample' @click=${this.downloadDataTableToCSV}></mwc-button>
    </div>
    ` 
  }
  kpiElementsController() {
    //console.log('kpiElementsController', 'data', this.data, 'activeTab', this.activeTab)
    return html`${this.data&&this.activeTab&&this.activeTab.reportElements ? 
      html`
        ${this.activeTab===undefined||this.activeTab.reportElements===undefined ? html``:
        html`
          ${this.activeTab.reportElements.map((block, i) =>    
          html`
            <div style="${this.kpiStyleByStringAttribute("div", block)}">
            ${block.map((elem, i) => 
              html`    
                ${elem.type==="reportTitle" ? this.kpiReportTitle(elem) : nothing}
                ${elem.type==="card" ? this.kpiCard(elem) : nothing}
                
                ${elem.type==="cardNoImage" ? this.kpiCardNoImage(elem) : nothing}
                ${elem.type==="cardWithImage" ? this.kpiCardWithImage(elem) : nothing}
                ${elem.type==="recovery_rate" ? this.kpiRecoveryRate(elem) : nothing}
                ${elem.type==="grid" ? this.kpiGrid(elem) : nothing}
                ${elem.type==="chart" ? this.kpiChartFran(elem) : nothing}
                ${elem.type==="jsonviewer" ? this.kpiJsonViewerFran(elem) : nothing}
                ${this.getButton(elem.buttons)}
                ${this.trazitDialogsTemplate()}
              `
              )}
            </div>
          `          
        )}
        `}
  
      ` : nothing
    }`
  }

  static get properties() {
    return {
      lang: { type: String },
      data: { type: Object },
      chartH: { type: Number },
      chartW: { type: Number },
      config: {type: Object},
      procName:{type: String},
      selectedProcInstance:{type: Object}

    };
  }

  constructor() {
    super();
    this.data = {}
    this.selectedProcInstance = undefined
  }

  firstUpdated() {
    this.chartH = Math.round(window.innerHeight / 2)
    this.chartW = Math.round(this.offsetWidth - 40)
  }

  get chart1() {
    return this.shadowRoot.querySelector('datamining-google-chart-ext#chart1')
  }

  get chart2() {
    return this.shadowRoot.querySelector('datamining-google-chart-ext#chart2')
  }

  updated(changes) {
    if (changes.has('data')) {
      if (this.data.incubatorFieldToRetrieve || this.data.batchFieldToRetrieve || this.data.prodLotFieldToRetrieve) {
        this.renderChart()
      }
    }
  }

  renderChart() {
    if (this.chart1) {
      if (this.data.lastTemperatureReadings) {
        if (this.data.lastTemperatureReadings[0].error) return
        let data = [["Created On", "Temperature"]]
        this.data.lastTemperatureReadings.forEach(t => data.push([t.created_on, t.temperature]))
        this.chart1.data = JSON.stringify(data)
      } else {
        let data1 = [["Area", "by area"]]
        this.data.counter_by_area_spec_tmp.forEach(t => data1.push([t.area, t.count]))
        this.chart1.data = JSON.stringify(data1)
        let data2 = [["Area", "by status"]]
        this.data.counter_by_status.forEach(t => data2.push([t.area, t.count]))
        this.chart2.data = JSON.stringify(data2)
      }
    }
  }

  getTraceabilityInfo(){
    let trackInfo = []
    let userSession = JSON.parse(sessionStorage.getItem("userSession"))
    //${userSession.header_info.first_name} ${userSession.header_info.last_name} (${userSession.userRole})<br></br
    trackInfo.push(['Traceability Info: '])
    trackInfo.push(['This file was created on', new Date(), 'by', userSession.header_info.first_name+' '+userSession.header_info.last_name])
    trackInfo.push(['KPI Name',  this.activeTab["label_"+this.lang], this.activeTab.action])
    trackInfo.push(['system',  this.dbName, 'Procedure', this.procName])
    trackInfo.push(['Data: '])
//    dbName: this.config.dbName,
//    schemaPrefix: this.procName, 
    return trackInfo
  }
  //{"elementName": "recovery_rate", "header": "columns_data", "values":"data"
  downloadDataTableToCSVv2() {
    let csvContent = "data:text/csv;charset=utf-8,"
    let header = [], contents = []
    contents = this.getTraceabilityInfo()
    for (let iElems=0; iElems<this.activeTab.download.elements.length; iElems++) {
        let iElemObj=this.activeTab.download.elements[iElems]
//      for (let i=0; i<this.data[this.activeTab.download.elements[iElems].elementName].length; i++) {
        if (this.data[iElemObj.elementName]) {
          if (this.activeTab.download.elements.header!==undefined){
            Object.entries(this.data[iElemObj.header][i]).map(([key]) => {
              header.push(key)
            })
            contents.push(header)
          }else{
            if (!header.length) {
              Object.entries(this.data[iElemObj.elementName]).map(([key]) => {
                header.push(key)
              })
              contents.push(header)
            }
          }
          let content = []
          if (iElemObj.values!==undefined){
            Object.entries(this.data[iElemObj.elementName][iElemObj.values]).map(([key, val]) => {
              content.push(val)
            })
          }else{
            Object.entries(this.data[iElemObj.elementName]).map(([key, val]) => {
              for (let i=0; i<this.data[this.activeTab.download.elements[iElems].elementName].length; i++) {
                content.push(val[i])
              }
            })
          }
          contents.push(content)
        }
//      }
    }
    console.log('contents', contents)
    return
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
    link.setAttribute("download", this.activeTab["label_"+this.lang]+'_'+cYear+cMonth+cDay+".csv");
    link.click()
  }

  downloadDataTableToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,"
    let header = [], contents = []
    contents = this.getTraceabilityInfo()
    for (let i=0; i<this.data.datatable.length; i++) {
      if (this.data.datatable[i].spec_code) {
        if (!header.length) {
          Object.entries(this.data.datatable[i]).map(([key]) => {
            header.push(key)
          })
          contents.push(header)
        }
        let content = []
        Object.entries(this.data.datatable[i]).map(([key, val]) => {
          content.push(val)
        })
        contents.push(content)
      }
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
    link.setAttribute("download", this.activeTab["label_"+this.lang]+'_'+cYear+cMonth+cDay+".csv");
    link.click()
  }

  openSample() {}

  
  print() {
    this.setPrintContent()
    var printWindow = window.open('', '', 'fullscreen=yes');
    printWindow.document.write(this.printObj.content);
    printWindow.document.title = this.printObj.header;
    printWindow.document.close();
    setTimeout(function () {
      printWindow.print();
      printWindow.close();
    }, 500);
  }
  printFran() {
    this.setPrintContent()
    var printWindow = window.open('', '', 'fullscreen=yes');
    printWindow.document.write(this.printObj.content);
    strContent += this.chartContent()
    let dataContentChart =this.shadowRoot.querySelector("google-chart#counter_range_eval")
    printWindow.document.write(dataContentChart.getImageURI());

    printWindow.document.title = 'Trazit-'+this.printObj.header;
    printWindow.document.close();
    setTimeout(function () {
      printWindow.print();
      printWindow.close();
    }, 500);
  }

  printFran2(){
      let dataContent=this.shadowRoot.querySelector("div#kpidata")
      let dataContentChart =this.shadowRoot.querySelector("google-chart#counter_range_eval")
      console.log(dataContentChart.innerHTML)
      //var mywindow = window.open('', 'PRINT', 'height=400,width=600');
      var mywindow = window.open('', '', 'fullscreen=yes');
      mywindow.document.write('<html><head><title>' + document.title  + '</title>');
      mywindow.document.write('</head><body >');
      mywindow.document.write('<h1>' + document.title  + '</h1>');
      mywindow.document.write(dataContentChart.getImageURI());
      mywindow.document.write('</body></html>');

      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10*/

      mywindow.print();
      mywindow.close();

      return true;    
  }
  setPrintContent() {
    let contentToPrint="Page Empty, nothing to print"
    let dataContent=this.shadowRoot.querySelector("div#kpidata")
    if (dataContent!==undefined&&dataContent!==null){contentToPrint=dataContent
    }
    console.log('object to print', contentToPrint)
    this.printObj = {
      header: this.activeTab["label_"+this.lang],
      content: this.setContent()      
    }
  }
  chartContent() {
    let imgs = `` // ${this.kpiStyleByStringAttribute("div", undefined)}
    this.chartImgs.forEach(img => {
      imgs += `<img src="${img}" style="margin-bottom=10px;"><br>`
    })
    return imgs
  }
  reportHeaderContent(){
    let content=``
    //content += `<img height="50px" src="https://upload.wikimedia.org/wikipedia/en/3/3e/Tranzit_Group_logo%2C_New_Zealand.png" style="margin-bottom=10px;"><br>`
    content += `<div>`
    content += `<p style="text-align: center;"><img height="50px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPwOK46iZVfnuBPpbQVbU7BRpc27BhtTkbgAQuF8AUyqxjBb-oTn1-5jxl8vg2_05FNvE&usqp=CAU" style="margin-bottom=10px;">` //${this.activeTab["label_"+this.lang]}</p>`       
    content +=`<td> ${this.activeTab["label_"+this.lang]}</p>`
    content += `</div>`
    return content
  }
  reportFooterContent(){    
    let content=``
    let session = JSON.parse(sessionStorage.getItem("userSession"))
    let sessionDate = session.appSessionStartDate
    let sessionUser = session.header_info.first_name +" "+ session.header_info.last_name +" ("+ session.userRole +")"

    content += `${sessionUser} on ${sessionDate}<br>`
    content += `${this.activeTab["label_"+this.lang]} system: ${this.dbName} Procedure: ${this.procName}`
    return content
  }
  myCharts(){
    let content=`` 
    let dataContentChart =this.shadowRoot.querySelectorAll("google-chart")    
    if (dataContentChart!==undefined){
      //let imgs = `` // ${this.kpiStyleByStringAttribute("div", undefined)}
      content += `<div style="display:flex;">`  
      for (var i=0;i<dataContentChart.length;i++){
        content += `<img src="${dataContentChart[i].imageURI}" style="margin-bottom=10px;"><br>`
      }
      content += `</div>`

    }
    return content    
  }
  myFilter(){
    let content=`` 
    console.log(this.data.filter_detail)
    if (this.data.filter_detail!=undefined){
      let filterContent=[]
      filterContent=this.data.filter_detail
      content += `<div style="display:flex;">` 
      for (var i=0;i<filterContent.length;i++){
        content += `${filterContent[i].filter_name}:${filterContent[i].value}`
      }    
      content += `</div>`
    }
    return content    
  }
  myTables(){    
    let strContent=`` 
    let dataContentTables =this.shadowRoot.querySelectorAll("lit-datatable")
    if (dataContentTables!==undefined){
      for (var i=0;i<dataContentTables.length;i++){
//        strContent += `<table border="1" cellpadding="3" style="border-collapse: collapse; width: 100%;">`
        strContent += `<table class="styled-table" >`
        strContent += `<tr>`
        dataContentTables[i].headers.forEach(f => {
          if (f.innerText) {
            strContent += `<th>${f.innerText}</th>`
          }
        })
        strContent += `</tr>`
        //strContent += `</td><td>`
        dataContentTables[i].table.forEach(row => {
          strContent += `<tr>`
          for (var col=0;col<row.columns.length;col++){
            var valToDisp=''                  
            if (row.columns[col].innerText) {
              valToDisp=row.columns[col].innerText
            }
            strContent += `<td>${valToDisp}</td>`             
          }
          strContent += `</tr>`
        })
        strContent += `</table>`
      }
    }
    return strContent    

  }
  setContent() {
    let strContent =``
    let filterContent=``
    filterContent=this.myFilter()
    strContent =this.myCharts()
    let strContent2 =`` 
    strContent2=this.myTables()

    let str = `
      <style type="text/css">
      .page-header, .page-header-space {
        height: 50px;
        padding-top: 30px;
      }
      .page-header {
        display: flex;
        font-size: 25px;
        position: fixed;
        top: 0mm;
        width: 100%;
        border-bottom: 1px solid black; /* for demo */
      }
      .page-footer, .page-footer-space {
        height: 50px;
        padding-top: 10px;
      }
      .page-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1px solid black; /* for demo */
      }
      .page {
        page-break-after: always;
      }
      @page {
        margin: 0mm 10mm 10mm;
        ${this.activeTab.label_en == 'Production Lot' ? 'size: landscape;' : '' }
      }
      @media print {
        thead {display: table-header-group;} 
        tfoot {display: table-footer-group;}
      }
      .styled-table {
        display: -webkit-inline-box;
        margin-top: 0px;
        margin-bottom: 3px;
        color: #4285f4;
        font-size:2vmin;
        border-collapse: collapse;
        margin: 25px 0;
        font-family: sans-serif;
        min-width: 400px;
        box-shadow: 0 0 20px #44cbe6;
      }            
      .styled-table thead tr {
        background-color: #2989d8;
        color: #ffffff;
        text-align: left;
      }   
      .styled-table th,
      .styled-table td {
        color: #032bbc; 
        padding: 12px 15px;
      }  
      .styled-table tbody tr {
        border-bottom: 1px solid #207cca;
      }
      .styled-table tbody tr:nth-of-type(even) {
        background-color: #c2f2ff5c;
      }
      .styled-table tbody tr:last-of-type {
        border-bottom: 2px solid #009879;
      }      
      .styled-table tbody tr.active-row {
        font-weight: bold;
        color: #009879;
      }

      </style>

      <div class="page-header" style="text-align: center; font-weight: bold;">      
        ${this.reportHeaderContent()}     
      </div>
      <div class="page-header" style="text-align: center; font-weight: bold;">      
        ${filterContent}
      </div>

      <div class="page-footer">
        ${this.reportFooterContent()}        
      </div>
      <table>
      <thead>
        <tr>
          <td>
            <!--place holder for the fixed-position header-->
            <div class="page-header-space"></div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <!--*** CONTENT GOES HERE ***-->
            <div class="page">${strContent}</div>
            <div class="page">${strContent2}</div>
            
          </td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td>
            <!--place holder for the fixed-position footer-->
            <div class="page-footer-space"></div>
          </td>
        </tr>
      </tfoot>
    </table>
    `
    return str
  }  
}
customElements.define('trazit-filter-view-content', TrazitFilterViewContent);
import { LitElement } from 'lit';
import { kpiChartStyles } from './google-chart-styles.js';
import { renderKpiChartTemplate } from './google-chart-template.js';
import { ApiFunctions } from '../Api/ApiFunctions.js';
import { BuildLabelsFunctions } from '@trazit/build-label/BuildLabels.js';
import { BuildNumericFunctions} from '@trazit/build-numerics/BuildNumerics.js';

export class GoogleChart extends BuildNumericFunctions(BuildLabelsFunctions(ApiFunctions(LitElement))) {
  static get properties() {
    return {
      elem: { type: Object },
      data: { type: Array },
      lang: { type: String }
    };
  }

  static styles = [kpiChartStyles];

  constructor() {
    super();
    this.elem = {};
    this.data = [];
    this.lang = 'en';
  }

  render() {
    if (this.elem === undefined) { 
        return renderKpiChartTemplate(this, undefined); }

    if (this.elem.elementName === 'fakeTrendlineExample'||this.elem.elementName==='cdatatable'){
      return renderKpiChartTemplate(this, this.elem, this.getChartData(this.elem, this.data), this.lang);
    }
    if (this.elem.endPointResponseArray !== undefined) {
      this.data = this.TRAZiTgetDataFromRoot(this.elem, this.data, this.viewModelFromProcModel);
    }

    let isGrouperPresent=this.data!==undefined&&Object.keys(this.data).length > 0&&this.elem.grouper_field_name !== undefined && this.data[0][this.elem.grouper_field_name]!==undefined
    let isCounterPresent=this.data!==undefined&&Object.keys(this.data).length > 0&&this.elem.counter_field_name !== undefined && this.data[0][this.elem.counter_field_name]!==undefined

    if (!isGrouperPresent&&!isCounterPresent) {
        return renderKpiChartTemplate(this, undefined);}

    if (this.elem.hideNoDataMessage !== undefined && this.elem.hideNoDataMessage === true && this.data === undefined){
        return renderKpiChartTemplate(this, undefined);
    }

    return renderKpiChartTemplate(this, this.elem, this.getChartData(this.elem, this.data), this.lang);
  }

  getChartData(elem, data) {
    //console.log('getChartData', elem, 'data', data, 'this.data', this.data, 'chartData')
    let chartData = [];
    let fakeData = []
    if (elem.elementName === 'fakeTrendlineExample') {
      fakeData = [
        ['Diameter', 'Age'],
        [8, 37], [4, 19.5], [11, 52], [4, 22], [3, 16.5], [6.5, 32.8], [14, 72]
      ]
      return fakeData
    }
    if (elem.elementName === "cdatatable") {
      fakeData = [
        ["Day", "Group User 1", "User 2", "User 3",],
        [1, 37.8, 80.8, 41.8], [2, 30.9, 69.5, 32.4], [3, 25.4, 57, 25.7], [4, 11.7, 18.8, 10.5],
        [5, 11.9, 17.6, 10.4], [6, 8.8, 13.6, 7.7], [7, 7.6, 12.3, 9.6], [8, 12.3, 29.2, 10.6],
        [9, 16.9, 42.9, 14.8], [10, 12.8, 30.9, 11.6], [11, 5.3, 7.9, 4.7],
        [12, 6.6, 8.4, 5.2], [13, 4.8, 6.3, 3.6], [14, 4.2, 6.2, 3.4],
      ];
      return fakeData;
    }
    if (elem.chartModel === "methodValidation") {
      return this.getChartDataForMethodValidation(elem, data)
    }

    if (data === undefined && this.data !== undefined) { data = this.data }
    //data = this.TRAZiTgetDataFromRoot(elem, data, this.viewModelFromProcModel);
    if (data === undefined && (elem.chart_name === undefined || data[elem.chart_name] === undefined)) {
      if (this.selectedItem !== undefined) {
        data = this.selectedItem;
      } else {
        if (this.selectedItemInView !== undefined) {
          data = this.selectedItemInView;
        }
      }
    }
    //chartData = [[elem.label_item, elem.label_value]];

    //if (data !== undefined && data[elem.chart_name] !== undefined) {
      let dataForChart = data;

      let seriesArr = [];
      if (Array.isArray(elem.counter_field_name)) {
        seriesArr = elem.counter_field_name;
      } else {
        seriesArr.push(elem.counter_field_name);
      }

      let curchtHeader = [];
      curchtHeader.push(elem.label_item);
      for (let iSerie = 0; iSerie < seriesArr.length; iSerie++) {
        curchtHeader.push(seriesArr[iSerie]);
      }
      chartData.push(curchtHeader);
      for (let iData = 0; iData < dataForChart.length; iData++) {
        if (!elem.grouper_exclude_items.includes(dataForChart[iData][elem.grouper_field_name])) {
          for (let iSerie = 0; iSerie < seriesArr.length; iSerie++) {
            if (
              this.addNumericValue(
                elem.counterLimits,
                dataForChart[iData][seriesArr[iSerie]]
              )
            ) {
              let curchtval = [];
              curchtval.push(
                this.labelPossibleReplacement(
                  elem,
                  dataForChart[iData][elem.grouper_field_name]
                )
              );

              for (let iSerie = 0; iSerie < seriesArr.length; iSerie++) {
                curchtval.push(dataForChart[iData][seriesArr[iSerie]]); // Add each value from seriesArr as a column
              }
              chartData.push(curchtval);
            }
          }
        } // iSerie
      } // iData
    //}
    console.log('getChartData', 'chartData', chartData)
    return chartData;
  }

  chartStyle(chartName) {
    let chartObj = this.shadowRoot.querySelector("google-chart#" + chartName);
    if (chartObj !== undefined && chartObj !== null) {
      chartObj.style.setProperty("width", "1600px");
    }
    //console.log("chartStyle", "chartName", chartName, chartObj);
  }
  
  getChartOptions(elem) {
    let defaultChartOptions = {
      width: "300px",
      backgroundColor: "transparent",
      is3D: true,
    };
    let chartOptions = {};
    if (elem.chart_title !== undefined) {
      chartOptions.title = elem.chart_title["label_" + this.lang];
    }
    if (elem.chartStyle === undefined) {
      Object.entries(defaultChartOptions).map(([key, val]) => {
        //console.log(key, val)
        chartOptions[key] = val;
      });
    } else {
      Object.entries(elem.chartStyle).map(([key, val]) => {
        //console.log(key, val)
        chartOptions[key] = val;
      });
    }
    return chartOptions;
  }  

  getChartDataForMethodValidation(elem, data) {
    let chartData = [];
    if (data === undefined || elem === undefined) {
      return chartData;
    }

    const chartSourceData = data[elem.chartSourceData];
    if (!chartSourceData || !Array.isArray(chartSourceData)) {
      return chartData;
    }
    let curchtHeader = [];
    curchtHeader[0] = elem.xAxisSourceData;
    curchtHeader[1] = elem.sourceData;
    chartData.push(curchtHeader);
    for (let iSerie = 0; iSerie < chartSourceData.length; iSerie++) {
      let curchtHeader = [];
      let currentData = chartSourceData[iSerie];

      // Make sure xAxisSourceData and sourceData exist in the current data object
      if (currentData[elem.xAxisSourceData] !== undefined && currentData[elem.sourceData] !== undefined) {
        curchtHeader[0] = Number(currentData[elem.xAxisSourceData]);
        curchtHeader[1] = Number(currentData[elem.sourceData]);
        chartData.push(curchtHeader);
      }
    }

    return chartData;
  }  
}

customElements.define('trazit-google-chart', GoogleChart);

import { html, nothing } from 'lit';

export function renderKpiChartTemplate(thisComponent, elem, data, lang) {
    console.log('elem', elem, 'data', data)
  return html`
  
    ${elem===undefined||elem.display_chart !== true
      ? nothing
      : html`
      ${thisComponent.chartStyle(elem.chart_name)}
        <google-chart
          id="${elem.chart_name}"
          title="${elem.chart_title['label_' + lang]}"
          type="${elem.chart_type}"
          .data="${data}"
          .options="${thisComponent.getChartOptions(elem)}"
        ></google-chart>
      `}
  `;
}

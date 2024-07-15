import { html } from 'lit';

export const template = (data) => html`
  ${!data.recoveryrate_datatable || !data.recoveryrate_datatable.data
    ? html`<p>No data available</p>`
    : html`
        <lit-datatable
          .data="${data.recoveryrate_datatable.data}"
          .conf="${data.recoveryrate_datatable.conf}"
        ></lit-datatable>
      `}
`;

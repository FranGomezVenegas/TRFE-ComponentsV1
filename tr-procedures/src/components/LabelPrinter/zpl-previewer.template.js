import { html } from 'lit';

export const template = (context) => html`
  <div class="container">
    <div class="top-panel">
      ${context.renderTableSection()}
      <div class="right-panel-container">
        ${context.renderButtons()}
        ${context.renderPreviewLabel()}
      </div>
    </div>
    ${context.renderObjectsLoadSection()}
    <mwc-dialog id="printCodeDialog" heading="ZPL Code">
      <pre style="white-space: pre-wrap; word-break: break-word;">${context.zplCode}</pre>
      <mwc-icon-button style="padding-top:20px;" slot="primaryAction" dialogAction="close">Close</mwc-icon-button>
    </mwc-dialog>
  </div>
`;


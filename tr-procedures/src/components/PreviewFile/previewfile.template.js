import { html } from 'lit';

export const template = (props) => {
  const { fileUrl, fileName, fileType } = props;

  const renderFilePreview = () => {
    alert(fileType)
    if (fileType === 'application/pdf') {
      return html`
        <object data="${fileUrl}" type="application/pdf" width="100%" height="500px">
          <embed src="${fileUrl}" type="application/pdf" />
          <p>This browser does not support PDFs. Please download the PDF to view it: <a href="${fileUrl}">Download PDF</a>.</p>
        </object>
      `;
    } else if (fileType === 'application/vnd.ms-powerpoint' || fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
      return html`
        <iframe src="https://view.officeapps.live.com/op/embed.aspx?src=${fileUrl}" width="100%" height="500px"></iframe>
      `;
    } else {
      return html`
        <object data="${fileUrl}" type="application/pdf" width="100%" height="500px">
          <embed src="${fileUrl}" type="application/pdf" />
          <p>This browser does not support PDFs. Please download the PDF to view it: <a href="${fileUrl}">Download PDF</a>.</p>
        </object>      
      `;
    }
  };

  return html`
    <div class="container">
      <div class="file-preview">
        <figcaption>${fileName}</figcaption>
        ${fileUrl ? renderFilePreview() : html`<p>Loading...</p>`}
      </div>
    </div>
  `;
};

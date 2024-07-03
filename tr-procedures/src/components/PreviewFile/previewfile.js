  //let urlFake='http://localhost:8081/TRAZiT-API/app/procs/InvTrackingAPIqueries?finalToken=eyJ1c2VyREIiOiJyJmQiLCJkYXRldGltZUZvcm1hdEF0UGxhdGZvcm1MZXZlbCI6IkRJU0FCTEVEIiwicHJvY3NNb2R1bGVOYW1lIjoiUmFuZEQqUmFuZEQgUFJPSkVDVFMiLCJkYk5hbWUiOiJkZW1vX3YwXzlfMiIsInR5cCI6IkpXVCIsInVzZXJfcHJvY2VkdXJlX2hhc2hjb2RlcyI6IlJhbmREKjEqMTIzODQ1ODM2NSIsImVTaWduIjoiZmlybWFkZW1vIiwidXNlckRCUGFzc3dvcmQiOiJ0cmF6aXQ0ZXZlciIsInVzZXJNYWlsIjoiaW5mb0B0cmF6aXQubmV0IiwidXNlcl9wcm9jZWR1cmVzIjoiW1JhbmREXSIsImFwcFNlc3Npb25JZCI6IjYyOTgiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJGcmkgTWF5IDE3IDA5OjA3OjU3IFVUQyAyMDI0IiwidXNlclJvbGUiOiJyJmQgc3VwZXJ1c2VyIiwiYWxnIjoiSFMyNTYiLCJpbnRlcm5hbFVzZXJJRCI6IjExMDgzMiJ9.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.gZmJzwaOGQOxGW-rJH_vUvAsGOUZxUBeSI7SsOwaQ0o&dbName=demo_v0_9_2&actionName=GET_LOT_AWS_ATTACHMENT&procInstanceName=stock&lotName=123456%205%2F10&lotQualifId=1'
  import { LitElement, html, css } from 'lit';
  import { template } from './previewfile.template';
  import { styles } from './previewfile.css';
  
  export class PreviewFile extends LitElement {
    static get styles() {
      return styles;
    }
  
    static get properties() {
      return {
        fileUrl: { type: String },
        fileName: { type: String },
        fileType: { type: String }
      };
    }
  
    constructor() {
      super();
      this.fileUrl = '';
      this.fileName = '';
      this.fileType = '';
    }
  
    firstUpdated() {
      this.fetchFile();
    }
  
    async fetchFile() {
      try {
        let getData='https://platform.trazit.net:8443/TRAZiT-API/app/PlatformAdminAPIqueries?finalToken=eyJ1c2VyREIiOiJyJmQiLCJkYXRldGltZUZvcm1hdEF0UGxhdGZvcm1MZXZlbCI6IkRJU0FCTEVEIiwicHJvY3NNb2R1bGVOYW1lIjoiUmFuZEQqUmFuZEQgUFJPSkVDVFMiLCJkYk5hbWUiOiJkZW1vX3YwXzlfMiIsInR5cCI6IkpXVCIsInVzZXJfcHJvY2VkdXJlX2hhc2hjb2RlcyI6IlJhbmREKjEqMTIzODQ1ODM2NSIsImVTaWduIjoiZmlybWFkZW1vIiwidXNlckRCUGFzc3dvcmQiOiJ0cmF6aXQ0ZXZlciIsInVzZXJNYWlsIjoiaW5mb0B0cmF6aXQubmV0IiwidXNlcl9wcm9jZWR1cmVzIjoiW1JhbmREXSIsImFwcFNlc3Npb25JZCI6IjYyOTgiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJGcmkgTWF5IDE3IDA5OjA3OjU3IFVUQyAyMDI0IiwidXNlclJvbGUiOiJyJmQgc3VwZXJ1c2VyIiwiYWxnIjoiSFMyNTYiLCJpbnRlcm5hbFVzZXJJRCI6IjExMDgzMiJ9.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.gZmJzwaOGQOxGW-rJH_vUvAsGOUZxUBeSI7SsOwaQ0o&dbName=demo_v0_9_2&actionName=GET_CK_EDITOR_BY_ID&procInstanceName=app&id=1'
        let posttData='https://platform.trazit.net:8443/TRAZiT-API/app/PlatformAdminAPIactions?finalToken=eyJ1c2VyREIiOiJyJmQiLCJkYXRldGltZUZvcm1hdEF0UGxhdGZvcm1MZXZlbCI6IkRJU0FCTEVEIiwicHJvY3NNb2R1bGVOYW1lIjoiUmFuZEQqUmFuZEQgUFJPSkVDVFMiLCJkYk5hbWUiOiJkZW1vX3YwXzlfMiIsInR5cCI6IkpXVCIsInVzZXJfcHJvY2VkdXJlX2hhc2hjb2RlcyI6IlJhbmREKjEqMTIzODQ1ODM2NSIsImVTaWduIjoiZmlybWFkZW1vIiwidXNlckRCUGFzc3dvcmQiOiJ0cmF6aXQ0ZXZlciIsInVzZXJNYWlsIjoiaW5mb0B0cmF6aXQubmV0IiwidXNlcl9wcm9jZWR1cmVzIjoiW1JhbmREXSIsImFwcFNlc3Npb25JZCI6IjYyOTgiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJGcmkgTWF5IDE3IDA5OjA3OjU3IFVUQyAyMDI0IiwidXNlclJvbGUiOiJyJmQgc3VwZXJ1c2VyIiwiYWxnIjoiSFMyNTYiLCJpbnRlcm5hbFVzZXJJRCI6IjExMDgzMiJ9.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.gZmJzwaOGQOxGW-rJH_vUvAsGOUZxUBeSI7SsOwaQ0o&dbName=demo_v0_9_2&actionName=SAVE_NEW_TEXT&procInstanceName=app&textValue=blablabla'
        let getAwsDocument='https://platform.trazit.net:8443/TRAZiT-API/app/procs/InvTrackingAPIqueries?finalToken=eyJ1c2VyREIiOiJyJmQiLCJkYXRldGltZUZvcm1hdEF0UGxhdGZvcm1MZXZlbCI6IkRJU0FCTEVEIiwicHJvY3NNb2R1bGVOYW1lIjoiUmFuZEQqUmFuZEQgUFJPSkVDVFMiLCJkYk5hbWUiOiJkZW1vX3YwXzlfMiIsInR5cCI6IkpXVCIsInVzZXJfcHJvY2VkdXJlX2hhc2hjb2RlcyI6IlJhbmREKjEqMTIzODQ1ODM2NSIsImVTaWduIjoiZmlybWFkZW1vIiwidXNlckRCUGFzc3dvcmQiOiJ0cmF6aXQ0ZXZlciIsInVzZXJNYWlsIjoiaW5mb0B0cmF6aXQubmV0IiwidXNlcl9wcm9jZWR1cmVzIjoiW1JhbmREXSIsImFwcFNlc3Npb25JZCI6IjYyOTgiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJGcmkgTWF5IDE3IDA5OjA3OjU3IFVUQyAyMDI0IiwidXNlclJvbGUiOiJyJmQgc3VwZXJ1c2VyIiwiYWxnIjoiSFMyNTYiLCJpbnRlcm5hbFVzZXJJRCI6IjExMDgzMiJ9.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.gZmJzwaOGQOxGW-rJH_vUvAsGOUZxUBeSI7SsOwaQ0o&dbName=demo_v0_9_2&actionName=GET_LOT_AWS_ATTACHMENT&procInstanceName=stock&lotName=123456%205%2F10&lotQualifId=1'
        const response = await fetch(getAwsDocument, {
          method: 'GET',
          headers: {
            'Accept': 'application/octet-stream'
          }
        });
  
        if (response.ok) {
          // Log all headers
          response.headers.forEach((value, key) => {
            console.log(key, value);
          });
  
          const blob = await response.blob();
          const contentDisposition = response.headers.get('Content-Disposition');
          console.log('Content-Disposition:', contentDisposition);
  
          if (contentDisposition && contentDisposition.includes('filename=')) {
            const matches = contentDisposition.match(/filename="?([^"]+)"?/);
            if (matches && matches[1]) {
              this.fileName = matches[1];
            } else {
              this.fileName = 'downloaded_file';
            }
          } else {
            this.fileName = 'downloaded_file';
          }
  
          // Determine the file type based on the file extension
          const fileExtension = this.fileName.split('.').pop().toLowerCase();
          this.fileType = fileExtension === 'pdf' ? 'application/pdf' :
                          (fileExtension === 'ppt' || fileExtension === 'pptx') ? 'application/vnd.ms-powerpoint' : '';
  
          if (this.fileType === '') {
            console.warn('Unsupported file type:', fileExtension);
          }
  
          this.fileUrl = URL.createObjectURL(blob);
          this.requestUpdate();
        } else {
          const errorText = await response.text();
          console.error('Failed to fetch file:', response.status, errorText);
        }
      } catch (error) {
        console.error('Error fetching file:', error.message, error);
      }
    }
  
    render() {
      return template({
        fileUrl: this.fileUrl,
        fileName: this.fileName,
        fileType: this.fileType
      });
    }
  }
  
  window.customElements.define('preview-file', PreviewFile);
  
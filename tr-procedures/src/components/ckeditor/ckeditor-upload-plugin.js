export default class MyUploadAdapter {
    constructor(loader) {
      this.loader = loader;
      this.url = 'https://platform.trazit.net:8443/TRAZiT-API/app/PlatformAdminAPIactions'; // Replace with your image upload URL
    }
  
    async upload() {
      return this.loader.file.then(
        (file) =>
          new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);  
    
            let actionParams = {
              actionName: 'ADD_TEXT_IMAGE',
              id: 10,
              dbName: 'demo_v0_9_2',
              procInstanceName: 'app',
              finalToken: 'eyJ1c2VyREIiOiJhZG1pbiIsImRhdGV0aW1lRm9ybWF0QXRQbGF0Zm9ybUxldmVsIjoiRElTQUJMRUQiLCJwcm9jc01vZHVsZU5hbWUiOiJpbnNwZWN0aW9uX2xvdCpJTlNQRUNUSU9OX0xPVFN8aW5zdHJ1bWVudHMqSU5TVFJVTUVOVFN8RGVtbypJTlNUUlVNRU5UU3xEaXNlYXNlU3R1ZGllcypDTElOSUNBTF9TVFVESUVTfG1iX2VtKk1PTklUT1JJTkd8c3RvY2sqU1RPQ0tTfG1vbl93YXRlcipNT05JVE9SSU5HfFJhbmREKlBST0pFQ1RfUkR8YXBwKmFwcCIsImRiTmFtZSI6ImRlbW9fdjBfOV8yIiwidHlwIjoiSldUIiwidXNlcl9wcm9jZWR1cmVfaGFzaGNvZGVzIjoiaW5zcGVjdGlvbl9sb3QqMSotNzA0MjE0NTU2fGluc3RydW1lbnRzKjEqLTEwMzcwNjEzNXxEZW1vKjEqMTc3MjYyMzEyOHxEaXNlYXNlU3R1ZGllcyoxKjE5NzQ3NzE3MzF8bWJfZW0qMSoyMzQyNDI1NDV8c3RvY2sqMSotOTU5NTcyNDc4fG1vbl93YXRlcioxKjIwNTM4MDY4NjV8UmFuZEQqMSoxODk3ODgwNjQ5fGFwcCoxKi0xIiwiZVNpZ24iOiJmaXJtYWRlbW8iLCJ1c2VyREJQYXNzd29yZCI6InRyYXppdCIsInVzZXJNYWlsIjoiTkVXdHJheml0LmluZm9AZ21haWwuY29tIiwidXNlcl9wcm9jZWR1cmVzIjoiW2luc3BlY3Rpb25fbG90LCBpbnN0cnVtZW50cywgRGVtbywgRGlzZWFzZVN0dWRpZXMsIG1iX2VtLCBzdG9jaywgbW9uX3dhdGVyLCBSYW5kRCwgYXBwXSIsImFwcFNlc3Npb25JZCI6Ijg1MjkiLCJhcHBTZXNzaW9uU3RhcnRlZERhdGUiOiJXZWQgSnVsIDAzIDE4OjEzOjQyIFVUQyAyMDI0IiwidXNlclJvbGUiOiJzdXBlcnVzZXIiLCJhbGciOiJIUzI1NiIsImludGVybmFsVXNlcklEIjoiNDU0ODkyMjMifQ.eyJpc3MiOiJMYWJQTEFORVRkZXN0cmFuZ2lzSW5UaGVOaWdodCJ9.jtJmzS4E9SLB7rY8g1GM8MNHDy_NU1sQJVh1V3d2r04',              
              isForTesting: false
            };
    
            if (actionParams !== undefined) {
              Object.keys(actionParams).forEach(key => {
                formData.append(key, actionParams[key]);
              });
            }
            // Emitir evento para ocultar el progreso circular
            this.dispatchEvent(new CustomEvent('show-progress', {
              bubbles: true,
              composed: true
            }));      
    
            fetch(this.url, {
              method: 'POST',
              body: formData,
              credentials: 'same-origin'
            })
              .then(response => response.json())
              .then(data => {
                // Emitir evento para ocultar el progreso circular
                this.dispatchEvent(new CustomEvent('hide-progress', {
                  bubbles: true,
                  composed: true
                }));      
                resolve({
                  default: data.uploadedImageAwsUrl // Reemplazar con la URL de la imagen subida                  
                });
              })
              .catch(error => {
                // Emitir evento para ocultar el progreso circular
                this.dispatchEvent(new CustomEvent('hide-progress', {
                  bubbles: true,
                  composed: true
                }));      
                reject(error);
              });
          })
      );
    }
      
    abort() {
      // Reject the promise returned from the upload() method.
    }
  }
  
  export function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }
  
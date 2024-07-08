export class MyUploadAdapter {
    constructor(loader) {
      this.loader = loader;
      this.url = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your image upload URL
    }
  
    async upload() {
      return this.loader.file.then(
        (file) =>
          new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);
  
            fetch(this.url, {
              method: 'POST',
              body: formData
            })
              .then(response => response.json())
              .then(data => {
                resolve({
                  default: 'https://via.placeholder.com/150' // Replace with the URL of the uploaded image
                });
              })
              .catch(error => {
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
  
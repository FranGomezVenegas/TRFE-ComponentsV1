export class PrintPreview {
    constructor(imageUrl) {
      this.imageUrl = imageUrl;
    }
  
    // Method to initialize and create the printable area
    createPrintableArea() {
      const printableArea = document.createElement('div');
      printableArea.id = 'printable-area';
      
      const imageElement = document.createElement('img');
      imageElement.src = this.imageUrl;
      imageElement.alt = 'Label Preview';
      
      printableArea.appendChild(imageElement);
      document.body.appendChild(printableArea);
  
      this.applyPrintStyles();
    }
  
    // Method to apply print-specific styles
    applyPrintStyles() {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-area, #printable-area * {
            visibility: visible;
          }
          #printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
        }
      `;
      document.head.appendChild(style);
    }
  
    // Method to trigger the print dialog
    print() {
      this.createPrintableArea();
      window.print();
    }
  }
  
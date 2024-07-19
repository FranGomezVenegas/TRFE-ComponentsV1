# SerialPort Component

## Properties

### config (Object)
- `baudRate` (number): The baud rate for the serial communication. (Required)
- `dataBits` (number): The number of data bits per byte. (Optional)
- `stopBits` (number): The number of stop bits per byte. (Optional)
- `parity` (string): The parity bit setting (e.g., 'none', 'even', 'odd'). (Optional)
- `flowControl` (boolean): Indicates if flow control is enabled. (Optional)

### data (Array)
- `portName` (string): The name of the serial port. (Required)
- `path` (string): The path of the serial port. (Required)
- `manufacturer` (string): The manufacturer of the serial port. (Optional)
- `serialNumber` (string): The serial number of the port. (Optional)
- `vendorId` (string): The vendor ID of the port. (Optional)
- `productId` (string): The product ID of the port. (Optional)

## Examples

```html
<serial-port .config=${{ baudRate: 9600, dataBits: 8, stopBits: 1, parity: 'none', flowControl: false }} .data=${[
  { portName: "COM1", path: "/dev/ttyS1", manufacturer: "Manufacturer1", serialNumber: "12345", vendorId: "1A2B", productId: "1C2D" },
  { portName: "COM2", path: "/dev/ttyS2", manufacturer: "Manufacturer2", serialNumber: "67890", vendorId: "3E4F", productId: "5G6H" }
]}></serial-port>
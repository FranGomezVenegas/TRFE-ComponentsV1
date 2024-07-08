export async function generateLabel(data, format) {
  const { width, height, fields } = format;
  const labelElements = [];

  for (const field of fields) {
    const { label_en, label_es, key, x, y, isQr, isBarcode } = field;
    const value = data[key];
    const label = `${label_en} / ${label_es}`;

    if (isQr) {
      const qrCodeElement = document.createElement('qr-code');
      qrCodeElement.setAttribute('value', value); // Solo el valor para el QR
      qrCodeElement.setAttribute('size', '128'); // Ajusta el tamaño según tus necesidades
      qrCodeElement.style.position = 'absolute';
      qrCodeElement.style.left = `${x}px`;
      qrCodeElement.style.top = `${y}px`;
      labelElements.push(qrCodeElement);
    } else {
      const textElement = document.createElement('div');
      textElement.textContent = `${label}: ${value}`;
      textElement.style.position = 'absolute';
      textElement.style.left = `${x}px`;
      textElement.style.top = `${y}px`;
      labelElements.push(textElement);
    }
  }

  const labelContainer = document.createElement('div');
  labelContainer.style.position = 'relative';
  labelContainer.style.width = `${width}px`;
  labelContainer.style.height = `${height}px`;
  labelElements.forEach(el => labelContainer.appendChild(el));

  console.log('Generated labelContainer:', labelContainer); // Verificar el contenido generado

  return labelContainer;
}

export function previewLabel(labelContainer, targetElementId) {
  const labelPreviewDiv = document.getElementById(targetElementId);
  console.log('labelPreviewDiv:', labelPreviewDiv); // Verificar si se encuentra el div
  console.log('labelContainer:', labelContainer); // Verificar que el contenedor de la etiqueta está correctamente definido

  if (labelPreviewDiv && labelContainer) {
    labelPreviewDiv.innerHTML = ''; // Limpiar cualquier contenido previo
    labelPreviewDiv.appendChild(labelContainer);
  } else {
    console.error('Error: labelPreviewDiv or labelContainer is null');
  }
}

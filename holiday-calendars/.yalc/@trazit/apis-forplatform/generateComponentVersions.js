const fs = require('fs');
const path = require('path');

const yalcLockPath = path.resolve(__dirname, 'yalc.lock');
const componentVersionsPath = path.resolve(__dirname, 'component-versions.txt');

// Verifica si el archivo yalc.lock existe
if (fs.existsSync(yalcLockPath)) {
  // Lee el contenido de yalc.lock
  const yalcLockContent = fs.readFileSync(yalcLockPath, 'utf8');
  const yalcComponents = JSON.parse(yalcLockContent);

  // Crea o sobrescribe el archivo component-versions.txt
  const versions = Object.entries(yalcComponents).map(([name, details]) => {
    return `${name}: ${details.version}`;
  }).join('\n');

  fs.writeFileSync(componentVersionsPath, versions, 'utf8');
  console.log('component-versions.txt has been created.');
} else {
  console.log('yalc.lock not found, skipping version extraction.');
}

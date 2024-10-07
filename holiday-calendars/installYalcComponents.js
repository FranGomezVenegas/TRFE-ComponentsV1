const fs = require('fs');
const { execSync } = require('child_process');

// Ruta del archivo yalc.lock
const yalcLockFile = './yalc.lock';

// Leer el archivo yalc.lock
fs.readFile(yalcLockFile, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error al leer el archivo yalc.lock: ${err.message}`);
    return;
  }

  // Parsear el archivo JSON de yalc.lock
  try {
    const yalcData = JSON.parse(data);

    // Iterar sobre los paquetes listados en yalc.lock
    for (const packageName in yalcData.packages) {
      const packageInfo = yalcData.packages[packageName];
      const version = packageInfo.version;

      // Ejecutar el comando `yalc add` para cada componente con su versión
      console.log(`Instalando ${packageName}@${version}...`);
      try {
        execSync(`yalc add ${packageName}@${version}`, { stdio: 'inherit' });
        console.log(`${packageName}@${version} instalado correctamente.`);
      } catch (error) {
        console.error(`Error al instalar ${packageName}@${version}: ${error.message}`);
      }
    }

    // Instalar dependencias de yalc
    console.log('Ejecutando yalc install...');
    execSync('yalc install', { stdio: 'inherit' });
    console.log('Todos los componentes han sido instalados.');

  } catch (parseError) {
    console.error(`Error al parsear el archivo yalc.lock: ${parseError.message}`);
  }
});

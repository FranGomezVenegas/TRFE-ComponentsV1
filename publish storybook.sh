#!/bin/bash

# Configuración
profile='default'
bucket='trazit.website'
storybook_dir='tr-procedures/storybook-static'
technical_manual_dir='Technical_Manual'
bucket_images_dir='Technical_Manual/storybook_images'

# Cambiar al directorio donde está configurado Storybook
cd tr-procedures

# Generar el build de Storybook
npm run build-storybook

# Volver al directorio raíz
cd ..

# Sincronizar el build de Storybook con la carpeta "Technical_Manual" en el bucket de S3
aws --profile $profile s3 sync $storybook_dir s3://$bucket/$technical_manual_dir --delete --sse AES256 --cache-control no-cache
# Sincronizar la carpeta "storybook_images" con su equivalente en el bucket de S3
aws --profile $profile s3 sync $images_dir s3://$bucket/$bucket_images_dir --delete --sse AES256 --cache-control no-cache

# Configurar metadatos para archivos específicos
aws --profile $profile s3 cp s3://$bucket/$technical_manual_dir/ s3://$bucket/$technical_manual_dir/ --exclude "*" --include "*.js" --recursive --metadata-directive REPLACE --sse AES256 --cache-control max-age=604800 --content-type application/javascript
aws --profile $profile s3 cp s3://$bucket/$technical_manual_dir/ s3://$bucket/$technical_manual_dir/ --exclude "*" --include "*.html" --recursive --metadata-directive REPLACE --sse AES256 --cache-control no-cache --content-type text/html

# Imprimir mensaje de éxito
echo "Storybook build and images deployed to S3://$bucket/$technical_manual_dir"

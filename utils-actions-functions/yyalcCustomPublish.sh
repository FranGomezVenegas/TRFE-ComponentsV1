#!/bin/bash

# Ruta al archivo yalc.lock
yalc_lock_file="yalc.lock"
# Ruta al archivo de salida component-versions.txt
component_versions_file="component-versions.txt"

# Limpiar component-versions.txt antes de generar nuevo contenido
> $component_versions_file

# Verifica si yalc.lock existe
if [[ -f $yalc_lock_file ]]; then
  echo "Generando $component_versions_file basado en $yalc_lock_file..."

  # Extrae las versiones de yalc.lock y las escribe en component-versions.txt
  jq -r '.packages | to_entries[] | "\(.key): \(.value.version)"' $yalc_lock_file >> $component_versions_file

  echo "$component_versions_file se ha generado correctamente."
else
  echo "No se encontró $yalc_lock_file, se omite la generación de versiones."
fi

# Ejecutar yalc publish después de generar component-versions.txt
yalc publish

# Leer un solo carácter (sin esperar a Enter)
read -n 1 -s

# Continuar con el siguiente comando
echo "Continuando con la ejecución del script..."
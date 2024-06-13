#!/usr/bin/env bash

echo ======
echo "Starting preinstall script"
pwd
echo

# Define the components you want to install (can also be modified to accept as command-line arguments)
components=(
  "@trazit/common-core@0.0.1"
  "@trazit/tr-dialog@0.0.1"
  # Add more components as needed
)

# You can also allow passing components as arguments
if [ "$#" -gt 0 ]; then
  components=("$@")
fi

yalcDir=$(yalc dir)

echo "Deleting old packages"
rm -rf node_modules package-lock.json .yalc yalc.lock

# Track if any errors occur
error_occurred=false

# Link local requirements with specific versions
for r in "${components[@]}"; do
  # Extract package name and version
  package_name="${r%@*}"
  version="${r#*@}"

  echo
  echo "Linking $package_name version $version"
  echo

  if [ ! -d "$yalcDir/packages/$package_name@$version" ]; then
    echo "$package_name version $version is not found in the global ~/.yalc/packages."
    echo "Please go to the package's location and run yalc publish --version $version there first, or use yalc push to update the existing version."
    zenity --info --text="$package_name version $version is not linked to the global ~/.yalc/packages. Go to $package_name's location and run yalc publish --version $version or yalc push to update the existing version."
    echo
    error_occurred=true
    break
  else
    yalc add $package_name@$version
    if [ $? -ne 0 ]; then
      echo "Error adding $package_name@$version"
      error_occurred=true
      break
    fi
  fi
done

echo
echo "Preinstall done"
echo
echo "Installing the packages"
npm i
if [ $? -ne 0 ]; then
  echo "Oops... Installation fault! Please rerun install.sh"
  error_occurred=true
else
  pwd
  echo ======
  echo
fi

# Check if any errors occurred
if [ "$error_occurred" = true ]; then
  echo "Errors were encountered during the script execution. Press any key to exit..."
  read -n 1 -s
else
  echo "Script executed successfully."
fi

#!/bin/zsh

PACKAGE_JSON="package.json"
CONSTANTS="src/constants.ts"
VERSION=$(grep '"version":' $PACKAGE_JSON | sed -E 's/.*"version": *"([^"]+)".*/\1/')

if [[ -z "$VERSION" ]]; then
  echo "could not retrieve version from $PACKAGE_JSON"
  exit 1
fi

if [[ -f $CONSTANTS ]]; then
  sed -i '' -E "s|export const VERSION = \".*\";|export const VERSION = \"$VERSION\";|" $CONSTANTS
else
  echo "$CONSTANTS not found"
  exit 1
fi

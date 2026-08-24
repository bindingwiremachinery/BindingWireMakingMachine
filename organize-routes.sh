#!/usr/bin/env bash

# Strict mode: exit immediately if a command exits with a non-zero status
set -euo pipefail

echo "============================================================"
echo " Converting flat HTML files to clean directory structures..."
echo "============================================================"

# Files that must remain in the root directory
ROOT_FILES=("index.html" "404.html")

# Count processed files
COUNT=0

for file in *.html; do
  # Guard against unmatched glob
  [[ -f "$file" ]] || continue

  # Skip designated root files
  if [[ " ${ROOT_FILES[*]} " =~ " ${file} " ]]; then
    echo "Skipping root file: $file"
    continue
  fi

  # Extract folder name by removing .html extension
  DIR_NAME="${file%.html}"

  echo "Structuring: $file  -->  $DIR_NAME/index.html"

  # Create target directory
  mkdir -p "$DIR_NAME"

  # Move file into the folder as index.html
  mv "$file" "$DIR_NAME/index.html"

  # Fix relative CSS/JS/Image paths in the nested index.html to be root-relative
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS sed syntax
    sed -i '' 's|href="styles.css"|href="/styles.css"|g' "$DIR_NAME/index.html"
    sed -i '' 's|src="main.js"|src="/main.js"|g' "$DIR_NAME/index.html"
    sed -i '' 's|src="seo.js"|src="/seo.js"|g' "$DIR_NAME/index.html"
    sed -i '' 's|src="product/|src="/product/|g' "$DIR_NAME/index.html"
  else
    # Linux / Git Bash syntax
    sed -i 's|href="styles.css"|href="/styles.css"|g' "$DIR_NAME/index.html"
    sed -i 's|src="main.js"|src="/main.js"|g' "$DIR_NAME/index.html"
    sed -i 's|src="seo.js"|src="/seo.js"|g' "$DIR_NAME/index.html"
    sed -i 's|src="product/|src="/product/|g' "$DIR_NAME/index.html"
  fi

  COUNT=$((COUNT + 1))
done

echo "============================================================"
echo " Done! Successfully organized $COUNT pages."
echo " Clean URLs will now return genuine 200 OK statuses."
echo "============================================================"

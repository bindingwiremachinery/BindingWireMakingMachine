#!/usr/bin/env bash
# ==============================================================================
# BINDING WIRE MACHINE - Directory Scaffolder & Asset Path Normalizer
# ==============================================================================

set -e

ROUTES=(
  "about"
  "contact"
  "faq"
  "location"
  "videos"
  "privacy-policy"
  "terms"
  "shipping-return-policy"
  "nail-making-machine"
  "wire-nail-making-machine"
  "binding-wire-making-machine"
  "binding-wire-machine"
  "high-speed-nail-making-machine"
  "steel-nail-making-machine"
  "automatic-nail-machine"
  "nail-making-machine-price"
  "nail-making-machine-india"
  "nail-making-machine-near-me"
  "wire-drawing-machine"
  "polishing-barrel-drum"
  "cutter-grinder-machine"
)

echo "⚙️ Scaffolding clean physical directories for GitHub Pages..."

for route in "${ROUTES[@]}"; do
  mkdir -p "$route"
  if [ ! -f "$route/index.html" ]; then
    echo "Creating placeholder route: $route/index.html"
    cat <<EOF > "$route/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Binding Wire Machine | Industrial Solutions</title>
    <link rel="canonical" href="https://www.bindingwiremachine.in/$route/">
    <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-16">
        <h1 class="text-3xl font-bold mb-4">Industrial Machinery Solutions</h1>
        <p class="text-gray-600 mb-6">Contact our Rajkot factory at +91 99788 22099 for complete technical catalogs.</p>
        <a href="/" class="bg-brand text-white px-6 py-3 rounded">Back to Home</a>
    </div>
</body>
</html>
EOF
  fi
done

echo "✅ All physical directory routes confirmed."

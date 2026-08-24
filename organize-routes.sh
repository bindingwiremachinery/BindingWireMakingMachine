#!/bin/bash
# ==============================================================================
# BINDING WIRE MACHINE - CLEAN DIRECTORY ROUTE GENERATOR FOR GITHUB PAGES
# ==============================================================================

set -e

declare -A ROUTES=(
  ["about"]="About Us | Binding Wire Machine Rajkot:Leading manufacturer of high-speed nail and wire machinery in Rajkot Gujarat.:About Us"
  ["contact"]="Contact Factory & Sales | Binding Wire Machine:Reach out to our Rajkot plant for machinery quotations and international export support.:Contact Us"
  ["faq"]="FAQ | Wire & Nail Making Machinery Technical Answers:Got questions about wire raw materials, power ratings, and die maintenance? Find answers here.:Frequently Asked Questions"
  ["location"]="Factory Location & Logistics | Rajkot Gujarat:Visit our manufacturing facility in Aji Industrial Area Phase-2, Rajkot, Gujarat.:Factory Location"
  ["videos"]="Machine Demonstration & Factory Videos:Watch high-speed IN series nail machines and continuous wire drawing lines running live.:Machine Operation Videos"
  ["products"]="Industrial Machinery Catalog | Wire & Nail Plants:Explore our comprehensive range of wire nail making machines, wire drawing lines, and binding wire plants.:Products Catalog"
  ["nail-making-machine"]="Automatic Wire Nail Making Machine | Heavy-Duty:High-performance automatic wire nail making machines with low maintenance and continuous output.:High-Speed Automatic Wire Nail Making Machines"
  ["wire-nail-making-machine"]="Wire Nail Making Machine Manufacturers & Exporters:Trusted wire nail making machine manufacturers & exporters in Rajkot, Gujarat.:Wire Nail Making Machine Manufacturing Solutions"
  ["binding-wire-making-machine"]="Binding Wire Making Machine & Plant | Heavy Duty:Complete industrial binding wire making machines and plants. Uniform wire annealing.:Industrial Binding Wire Making Machines & Plants"
  ["binding-wire-machine"]="Binding Wire Machine Manufacturers and Exporters:Export-grade binding wire machines and continuous coiling equipment.:Binding Wire Machine Manufacturers & Exporters"
  ["high-speed-nail-making-machine"]="High Speed Nail Making Machine | 1000+ Nails/Min:Advanced high-speed nail making machinery delivering maximum production output.:High Speed Automatic Nail Making Machines"
  ["steel-nail-making-machine"]="Steel Nail Making Machine | Concrete & Common Nails:Heavy-duty steel nail making machines for manufacturing common wire nails and concrete nails.:Industrial Steel Nail Making Machines"
  ["automatic-nail-machine"]="Fully Automatic Nail Machine | Precision Feeding:Fully automatic nail machines with automated wire straightening and cutting mechanisms.:Fully Automatic Nail Manufacturing Machinery"
  ["nail-making-machine-price"]="Nail Making Machine Price & Specifications | Factory:Check latest wire nail making machine prices, power ratings, and output capacity.:Wire Nail Making Machine Price & Technical Specs"
  ["nail-making-machine-india"]="Nail Making Machine in India | Top Supplier & Plant:Leading manufacturer of wire nail making machines in India with pan-India delivery.:Wire Nail Making Machines in India"
  ["nail-making-machine-near-me"]="Wire Nail Making Machine Near Me | Local Manufacturer:Direct manufacturer supply from Rajkot, Gujarat with pan-India dispatch.:Wire Nail Making Machinery & Local Support"
  ["wire-drawing-machine"]="Wire Drawing Machine Manufacturer | Continuous Plants:Industrial multi-die continuous wire drawing machines for mild steel and GI wire.:Heavy-Duty Industrial Wire Drawing Machines"
  ["polishing-barrel-drum"]="Nail Polishing Barrel Drum | Heavy Duty Finishing Unit:Tumbling barrel drums for de-burring, cleaning, and mirror polishing wire nails.:Industrial Wire Nail Polishing Barrel Drums"
  ["cutter-grinder-machine"]="Wire Nail Cutter Grinder Machine | Die Sharpening Tool:High-precision cutter grinder machines for sharpening nail cutting dies.:Precision Cutter Grinder for Nail Dies & Tooling"
  ["privacy-policy"]="Privacy Policy | Binding Wire Machine:Our commercial data protection and customer privacy guidelines.:Privacy Policy"
  ["terms"]="Terms & Conditions | Binding Wire Machine:Commercial, manufacturing, delivery, and export terms for machinery orders.:Terms & Conditions"
  ["shipping-return-policy"]="Shipping, Warranty & Return Policy:International ocean freight logistics, pan-India transport, and 1-year warranty coverage.:Shipping & Warranty Policy"
)

echo "Generating directory-based clean routes..."

for ROUTE in "${!ROUTES[@]}"; do
  IFS=':' read -r TITLE DESC H1 <<< "${ROUTES[$ROUTE]}"
  mkdir -p "$ROUTE"
  
  cat <<EOF > "$ROUTE/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$TITLE</title>
    <meta name="description" content="$DESC">
    <link rel="canonical" href="https://www.bindingwiremachine.in/$ROUTE/">
    <link rel="stylesheet" href="/styles.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@phosphor-icons/web" defer></script>
</head>
<body class="bg-gray-50 text-gray-800 font-sans antialiased min-h-screen flex flex-col justify-between">
    <header class="bg-slate-900 text-white py-6 px-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <a href="/" class="text-xl font-bold tracking-wider font-heading">BINDING WIRE MACHINE</a>
            <a href="/" class="text-rose-500 hover:text-white transition-colors">&larr; Back to Main Catalog</a>
        </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 py-16 flex-grow">
        <h1 class="text-3xl sm:text-4xl font-bold font-heading text-slate-900 mb-6">$H1</h1>
        <p class="text-lg text-gray-600 mb-8 leading-relaxed">$DESC</p>
        
        <div class="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h2 class="text-xl font-bold text-slate-900 mb-4">Machinery Specifications & Factory Direct Quotes</h2>
            <p class="text-gray-600 mb-6">Contact our engineering team directly at our Rajkot manufacturing plant for customized plant layouts, motor configurations, and export pricing.</p>
            <div class="flex flex-wrap gap-4">
                <a href="tel:+919978822099" class="bg-rose-600 text-white px-6 py-3 rounded font-semibold hover:bg-rose-700 transition-colors">Call +91 99788 22099</a>
                <a href="https://wa.me/919978822099" class="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 transition-colors">Chat on WhatsApp</a>
                <a href="/contact/" class="bg-slate-900 text-white px-6 py-3 rounded font-semibold hover:bg-slate-800 transition-colors">Inquiry Form</a>
            </div>
        </div>
    </main>

    <footer class="bg-slate-900 text-gray-400 py-8 text-center text-sm border-t border-slate-800">
        <p>&copy; 2026 Binding Wire Machine. Aji Industrial Area, Rajkot, Gujarat, India.</p>
    </footer>
    <script src="/main.js"></script>
</body>
</html>
EOF
done

echo "Successfully generated all clean directory routes."

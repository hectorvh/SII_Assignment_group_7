🗺️ Interactive Leaflet Map – Nature Reserves of Münster

This project presents an interactive web map built with the Leaflet JavaScript library, visualizing all Nature Reserves (Naturschutzgebiete) around Münster, Germany.

🎯 Objective

The task was to create a simple HTML page with an interactive Leaflet map that:

Shows the city of Münster with a marker and popup.

Displays protected sites (from a GeoJSON file) as polygons.

Provides popups for each reserve showing its name, description, and link.

Includes a legend listing all reserves with matching colors.

Allows clicking legend items to zoom and open the corresponding popup.

🧩 Main Features

OpenStreetMap basemap with pan & zoom controls.

GeoJSON layer containing 16 protected sites, each with unique colors and metadata.

Popups with descriptions and external info links.

Interactive legend – clicking a site recenters the map and opens its popup.

Modern design with smooth gradients, glass-effect panels, and responsive layout.

🗂️ Files
File	Description
index.html	Main webpage
script.js	JavaScript logic for map and interactions
style.css	Page and UI styling
protected_sites_enhanced.geojson	Data of Münster nature reserves
README.md	Project documentation
🚀 How to Run

Because the project uses the Fetch API, it must be served through a local web server.

Option 1 – VS Code

Install Live Server extension.

Right-click index2.html → Open with Live Server.

Option 2 – Python

python -m http.server 8000


Then open:
👉 http://localhost:8000/index.html

🌍 Data & Credits

Protected Areas (NSG): Data from GDI-NRW / Land NRW environmental open data.

Basemap: © OpenStreetMap contributors

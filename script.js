// Münster's Coordinates: [51.96, 7.62] (Latitude, Longitude)
var munsterCoords = [51.96, 7.62];

// Initialize map
var map = L.map('map').setView(munsterCoords, 11);

// Add beautiful map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

// Custom icon for Münster
const cityIcon = L.divIcon({
    html: '<div style="background: linear-gradient(135deg, #667eea 0%, #4ba29f 100%); width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.3);"></div>',
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

// Add Münster marker
var munsterMarker = L.marker(munsterCoords, { icon: cityIcon })
    .addTo(map)
    .bindPopup('<b>Münster</b><br>Historic university city in Westphalia');


// Style function for the GeoJSON features.
function protectedSiteStyle(feature) {
    return {
        color: feature.properties.color || "#006400", // Use GeoJSON color, or default to dark green
        weight: 3,
        opacity: 0.8,
        fillColor: feature.properties.color || "#90EE90", // Use GeoJSON color, or default to light green
        fillOpacity: 0.5
    };
}

// Use Fetch API to load the GeoJSON file
fetch('./protected_sites_enhanced.geojson')
    .then(response => {
        if (!response.ok) {
            // If the fetch fails (often due to CORS/no local server), throw an error.
            throw new Error('Could not load GeoJSON file. Check if a local web server is running.');
        }
        return response.json(); 
    })
    .then(data => {
        // Add the loaded GeoJSON data to the map
        L.geoJSON(data, {
            style: protectedSiteStyle, // Use the dynamic styling function
            onEachFeature: function (feature, layer) {
                // Customize the pop-up using the new properties
                if (feature.properties) {
                    var popupContent = "<b>" + feature.properties.name + "</b><br>";
                    popupContent += feature.properties.desc + "<br>";
                    
                    // Add link if it exists
                    if (feature.properties.link) {
                        popupContent += '<a href="' + feature.properties.link + '" target="_blank">View Website</a>';
                    }
                    
                    layer.bindPopup(popupContent);
                }
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Error loading GeoJSON:', error);
        // Optionally display an alert if the loading fails completely
        alert('Map features failed to load. Please check the console for details.');
    });

// Add legend
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
  const div = L.DomUtil.create('div', 'legend');
  div.innerHTML = `
    <h4>🗺️ Nature Reserves in Münster</h4>

    <div class="legend-item">
    <div class="legend-box" style="background: #2dd4bf;"></div>
    <span>Aa-Aue</span>
    </div>
    <div class="legend-item">
    <div class="legend-box" style="background: #eab308;"></div>
    <span>Alvingheide</span>
    </div>
    <div class="legend-item">
    <div class="legend-box" style="background: #f59e0b;"></div>
    <span>Auwald Stapelskotten</span>
    </div>
    <div class="legend-item">
    <div class="legend-box" style="background: #14b8a6;"></div>
    <span>Bonnenkamp</span>
    </div>
    <div class="legend-item">
    <div class="legend-box" style="background: #ef4444;"></div>
    <span>Dabeckskamp</span>
    </div>
    <div class="legend-item">
    <div class="legend-box" style="background: #818cf8;"></div>
    <span>Davert (Münster)</span>
    </div>
    <div class="legend-item">
    <div class="legend-box" style="background: #fb7185;"></div>
    <span>Feuchtgebiet Handorf</span>
    </div>
    <div class="legend-item">
    <div class="legend-box" style="background: #4ade80;"></div>
    <span>Gelmerheide</span>
    </div>
    <div class="legend-item">
    <div class="legend-box" style="background: #0ea5e9;"></div>
    <span>Große Bree</span>
    </div>
    <div class="legend-item">
    <div class="legend-box" style="background: #22c55e;"></div>
    <span>Huronensee</span>
    </div>
    <div class="legend-item">
    <div class="legend-box" style="background: #10b981;"></div>
    <span>Emsaue</span>
    </div>
    <div class="legend-item">
    <div class="legend-box" style="background: #6366f1;"></div>
    <span>Rieselfelder Münster</span>
    </div>
    <div class="legend-item">
    <div class="legend-box" style="background: #ec4899;"></div>
    <span>Rottbusch</span>
    </div>
    <div class="legend-item">
    <div class="legend-box" style="background: #a855f7;"></div>
    <span>Wolbecker Tiergarten</span>
    </div>
    <div class="legend-item">
    <div class="legend-box" style="background: #f97316;"></div>
    <span>Vorbergs Hügel</span>
    </div>

  `;
  return div;
};

legend.addTo(map);

// Initialize map
    const map = L.map('map').setView([51.96, 7.62], 11);
    
    // Add beautiful map tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
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
    L.marker([51.96, 7.62], { icon: cityIcon })
      .addTo(map)
      .bindPopup('<b>Münster</b><br>Historic university city in Westphalia');
    
    // Protected sites with vibrant colors
    const sites = [
      {
        name: 'Rieselfelder Münster',
        desc: 'Premier wetland bird sanctuary',
        link: 'https://www.rieselfelder-muenster.de/',
        coords: [[52.005, 7.560], [52.005, 7.590], [52.025, 7.590], [52.025, 7.560]],
        color: '#10b981'
      },
      {
        name: 'Davert Forest',
        desc: 'Ancient woodland reserve',
        link: 'https://de.wikipedia.org/wiki/Davert_%28Naturschutzgebiet,_M%C3%BCnster%29',
        coords: [[51.880, 7.600], [51.880, 7.640], [51.900, 7.640], [51.900, 7.600]],
        color: '#8b5cf6'
      },
      {
        name: 'Hohe Ward',
        desc: 'Protected heath and forest',
        link: 'https://www.muensterland.com/en/tourism/topics/riding/riding-routes/munsterland-riding-route/high-on-horseback-in-the-green-munster/rundroute-hohe-ward/',
        coords: [[51.975, 7.680], [51.975, 7.710], [51.995, 7.710], [51.995, 7.680]],
        color: '#f59e0b'
      }
    ];
    
    sites.forEach(site => {
      const polygon = L.polygon(site.coords, {
        color: site.color,
        weight: 3,
        fillColor: site.color,
        fillOpacity: 0.4
      }).addTo(map);
      
      polygon.bindPopup(`<b>${site.name}</b><br>${site.desc}</b><br><a href="${site.link}" target="_blank" rel="noopener noreferrer">Learn more →</a>`);
      
      // Hover effects
      polygon.on('mouseover', function() {
        this.setStyle({ fillOpacity: 0.7, weight: 4 });
      });
      
      polygon.on('mouseout', function() {
        this.setStyle({ fillOpacity: 0.4, weight: 3 });
      });
    });
    
    // Add legend
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function() {
      const div = L.DomUtil.create('div', 'legend');
      div.innerHTML = `
        <h4>🗺️ Map Legend</h4>
        <div class="legend-item">
          <div class="legend-box" style="background: #10b981;"></div>
          <span>Rieselfelder</span>
        </div>
        <div class="legend-item">
          <div class="legend-box" style="background: #8b5cf6;"></div>
          <span>Davert Forest</span>
        </div>
        <div class="legend-item">
          <div class="legend-box" style="background: #f59e0b;"></div>
          <span>Hohe Ward</span>
        </div>
      `;
      return div;
    };
    legend.addTo(map);

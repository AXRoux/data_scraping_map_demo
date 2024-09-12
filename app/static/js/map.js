let map;
let markerClusterGroup;

function initMap() {
    map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    markerClusterGroup = L.markerClusterGroup({
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        spiderfyOnMaxZoom: true,
        chunkedLoading: true,
        maxClusterRadius: 50
    });

    map.addLayer(markerClusterGroup);

    document.getElementById('scrape-button').addEventListener('click', scrapeData);
    loadExistingData();

    // Adjust map size when window is resized
    window.addEventListener('resize', function() {
        map.invalidateSize();
    });
}

function scrapeData() {
    fetch('/scrape-data', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.length > 0) {
                updateMap(data.data);
                alert(`Scraped ${data.new_items} new items!`);
            } else {
                alert('No new data scraped.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while scraping data.');
        });
}

function loadExistingData() {
    fetch('/get-data')
        .then(response => response.json())
        .then(data => {
            updateMap(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateMap(data) {
    markerClusterGroup.clearLayers();

    let pointsByLocation = {};

    data.forEach(point => {
        if (!pointsByLocation[point.location]) {
            pointsByLocation[point.location] = [];
        }
        pointsByLocation[point.location].push(point);
    });

    for (let location in pointsByLocation) {
        let [country, category] = location.split(' - ');
        let latlng = getCountryLatLng(country);
        
        if (latlng) {
            let marker = L.marker(latlng);
            
            let popupContent = createPopupContent(pointsByLocation[location], country, category);
            marker.bindPopup(popupContent, {
                maxWidth: 300,
                maxHeight: 400,
                autoPan: true,
                keepInView: true,
                autoPanPadding: [50, 50]
            });

            markerClusterGroup.addLayer(marker);
        }
    }

    map.fitBounds(markerClusterGroup.getBounds().pad(0.1));
}

function createPopupContent(points, country, category) {
    let content = `<div class="custom-popup"><h2>${getCountryName(country)}${category ? ' - ' + formatCategory(category) : ''}</h2>`;
    points.forEach((point, index) => {
        content += `
            <div class="news-item ${index > 0 ? 'news-item-border' : ''}">
                <h3>${point.name}</h3>
                <p>${point.description}</p>
                <p>Source: ${point.source}</p>
                <a href="${point.url}" target="_blank" class="read-more">Read More</a>
            </div>
        `;
    });
    content += '</div>';
    return content;
}

function formatCategory(category) {
    let parts = category.split('-');
    if (parts.length > 1) {
        return `${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)} (${parts[1]})`;
    }
    return category.charAt(0).toUpperCase() + category.slice(1);
}

function getCountryLatLng(countryCode) {
    const coordinates = {
        'BR': [-14.2350, -51.9253],
        'CN': [35.8617, 104.1954],
        'RU': [61.5240, 105.3188],
        'KP': [40.3399, 127.5101],
        'IR': [32.4279, 53.6880]  // Added coordinates for Iran
    };
    return coordinates[countryCode] || null;
}

function getCountryName(countryCode) {
    const names = {
        'BR': 'Brazil',
        'CN': 'China',
        'RU': 'Russia',
        'KP': 'North Korea',
        'IR': 'Iran'  // Added name for Iran
    };
    return names[countryCode] || countryCode;
}

// Initialize the map when the window loads
window.onload = initMap;

// Adjust map size when the page is fully loaded
window.addEventListener('load', function() {
    setTimeout(function() {
        map.invalidateSize();
    }, 100);
});
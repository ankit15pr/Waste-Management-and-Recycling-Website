// Taking form data 
const form = document.querySelector('.search-form');
const input = document.querySelector('#search-location');

const map = L.map('map').setView([28.6139, 77.2090], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreentMap</a> contributors'
}).addTo(map);

function searchLocation(query) {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;

                // Set the map view to the new location
                map.setView([lat, lon], 13);

                // Add a marker at the location
                L.marker([lat, lon]).addTo(map)
                    .bindPopup('<b>' + data[0].display_name + '</b>')
                    .openPopup();

                // Call function to find nearby recycling centers
                findRecyclingCenters(lat, lon);
            } else {
                alert('Location not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching location data.');
        });
}

// Function to search for recycling centers using Overpass API
function findRecyclingCenters(lat, lon) {
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:30000,${lat},${lon})["amenity"="recycling"];out;`;

    fetch(overpassUrl)
        .then(response => response.json())
        .then(data => {
            if (data.elements.length > 0) {
                data.elements.forEach(element => {
                    const recyclingLat = element.lat;
                    const recyclingLon = element.lon;
                    const recyclingName = element.tags.name || "Recycling Center";
                    const recyclingAddress = element.tags.address || "Address not available";
                    const recyclingHours = element.tags.opening_hours || "Opening hours not available";

                    const popupContent = `
                        <b>${recyclingName}</b><br>
                        <i>${recyclingAddress}</i><br>
                        <strong>Hours:</strong> ${recyclingHours}
                    `;

                    // Add a marker for each recycling center
                    L.marker([recyclingLat, recyclingLon]).addTo(map)
                        .bindPopup(popupContent)
                        .openPopup();
                });
            } else {
                alert('No recycling centers found near this location.');
            }
        })
        .catch(error => {
            console.error('Error fetching recycling centers:', error);
        });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const locationValue = input.value;
    console.log('Entered location:', locationValue);
    if (locationValue) {
        // Use OpenStreetMap's Nominatim API to geocode location input
        const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${locationValue}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const lat = data[0].lat;
                    const lon = data[0].lon;
                    map.setView([lat, lon], 13);

                    // Call function to find nearby recycling centers
                    findRecyclingCenters(lat, lon);
                } else {
                    alert('Location not found.');
                }
            })
            .catch(error => {
                console.error('Error fetching location:', error);
            });
    } else {
        alert('Please enter a location!');
    }
});
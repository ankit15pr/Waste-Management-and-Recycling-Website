// Taking form data 
const form = document.querySelector('.search-form');
const input = document.querySelector('#search-location');

const map = L.map('map').setView([28.6139, 77.2090], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreentMap</a> contributors'
}).addTo(map);

L.marker([28.6139, 77.2090]).addTo(map)
    .bindPopup('<b>New Delhi, India</b>')
    .openPopup();

function searchLocation(query) {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                map.setView([lat, lon], 13);
                L.marker([lat, lon]).addTo(map)
                    .bindPopup('<b>' + data[0].display_name + '</b>')
                    .openPopup();
            } else {
                alert('Location not found');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching data');
        });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const locationValue = input.value;
    console.log('Entered location:', locationValue);
    if(locationValue){
        searchLocation(locationValue);
    }else{
        alert('Please enter a location!');
    }
});
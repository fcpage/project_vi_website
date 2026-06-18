<link rel="stylesheet" href="../../css/project/leaflet.css"/>
<script src="../../js/map/leaflet.js"></script>

var map = L.map('map').setView([43.3871, -80.3968], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([43.387122243769944, -80.39682084792196]).addTo(map);

marker.bindPopup("<b>Conestoga College</b><br>850 Fountain St S<br/>Cambridge, ON").openPopup();
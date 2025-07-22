const map = L.map('map').setView([37.8, -96], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

const drawControl = new L.Control.Draw({
  draw: { polygon: true, polyline: false, circle: false, rectangle: false, marker: false },
  edit: { featureGroup: drawnItems }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (event) {
  drawnItems.clearLayers();
  drawnItems.addLayer(event.layer);
  const geoJson = event.layer.toGeoJSON();
  parent.postMessage({ geoJson }, '*');
});

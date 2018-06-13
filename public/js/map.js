var mymap = L.map('hotelmap').setView([42.308, -71.137], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 20,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);


var popup1 = L.popup({closeButton: false})
    .setLatLng([0, 0])
    .setContent("<img src='images/2.jpg'><h3>Washington St, Suite 1</h3><p>$399</br>1 Bedroom, 1 Living Room</p>")
    .openOn(mymap);

var popup2 = L.popup({closeButton: false})
    .setLatLng([0, 0])
    .setContent("<img src='images/2.jpg'><h3>Boyslton St</h3><p>$399</br>2 Bedrooms, 2 Bathrooms</p>")
    .openOn(mymap);

var popup3 = L.popup({closeButton: false})
    .setLatLng([0, 0])
    .setContent("<img src='images/2.jpg'><h3>3</h3><p>HOUSE</br>1 Bedroom, 1 Living Room</p>")
    .openOn(mymap);

var popup4 = L.popup({closeButton: false})
    .setLatLng([0, 0])
    .setContent("<img src='images/2.jpg'><h3>Harrison Ave</h3><p>$499</br>2 Bedrooms, 2 Bathrooms</p>")
    .openOn(mymap);

var popup5 = L.popup({closeButton: false})
    .setLatLng([0, 0])
    .setContent("<img src='images/2.jpg'><h3>5</h3><p>HOUSE</br>1 Bedroom, 1 Living Room</p>")
    .openOn(mymap);

var popup6 = L.popup({closeButton: false})
    .setLatLng([0, 0])
    .setContent("<img src='images/2.jpg'><h3>5</h3><p>HOUSE</br>1 Bedroom, 1 Living Room</p>")
    .openOn(mymap);






    L.circle([42.3460853, -71.0650603],{
        color: '#2da9e1',
        fillColor: '#2da9e1',
        fillOpacity: 0.5,
        radius: 200
	}).addTo(mymap)
		.bindPopup(popup1).openPopup();

    L.circle([42.3522, -71.06658],{
        color: '#2da9e1',
        fillColor: '#2da9e1',
        fillOpacity: 0.5,
        radius: 200
    }).addTo(mymap)
		.bindPopup(popup2).openPopup();

    L.circle([42.35631, -71.06164],{
        color: '#2da9e1',
        fillColor: '#2da9e1',
        fillOpacity: 0.5,
        radius: 200
    }).addTo(mymap)
		.bindPopup(popup3).openPopup();

	L.circle([42.349605, -71.062457],{
        color: '#2da9e1',
        fillColor: '#2da9e1',
        fillOpacity: 0.5,
        radius: 200
    }).addTo(mymap)
		.bindPopup(popup4).openPopup();

	L.circle([42.3518415,-71.0646243],{
        color: '#2da9e1',
        fillColor: '#2da9e1',
        fillOpacity: 0.5,
        radius: 200
    }).addTo(mymap)
		.bindPopup(popup5).openPopup();



	// L.circle([42.308, -71.137], 500, {
	// 	color: 'red',
	// 	fillColor: '#f03',
	// 	fillOpacity: 0.5
	// }).addTo(mymap).bindPopup("I am a circle.");

	// L.polygon([
	// 	[51.509, -0.08],
	// 	[51.503, -0.06],
	// 	[51.51, -0.047]
	// ]).addTo(mymap).bindPopup("I am a polygon.");


	// var popup = L.popup();

	// function onMapClick(e) {
	// 	popup
	// 		.setLatLng(e.latlng)
	// 		.setContent("You clicked the map at " + e.latlng.toString())
	// 		.openOn(mymap);
	// }

	mymap.on('click', onMapClick);
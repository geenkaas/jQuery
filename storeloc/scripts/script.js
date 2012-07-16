
//	Store Locator
	var map;
	var markers = [];
	var infoWindow;
	var locationSelect;
	
	
//	On document load
$(document).ready(function() {

	//	Load Store locator if gmap div is present	
		if ( $('#bgmaps').length !== 0) {
			//	store locator submit
				$('#storeloc').submit(function(e) {
					e.preventDefault();
					searchLocations();
				});
			geenMaps();
		};
});	//	End of document.ready

	
//	Google Maps store locator

function geenMaps() {
	var styles = [
		{
			featureType: 'water',
			elementType: 'all',
			stylers: [
				{ hue: '#303030' },
				{ saturation: -100 },
				{ lightness: -75 },
				{ visibility: 'on' }
			]
		},{
			featureType: 'landscape.man_made',
			elementType: 'all',
			stylers: [
				{ hue: '#B8B8B8' },
				{ saturation: -100 },
				{ lightness: -19 },
				{ visibility: 'on' }
			]
		},{
			featureType: 'poi.park',
			elementType: 'all',
			stylers: [
				{ hue: '#99CC66' },
				{ saturation: 12 },
				{ lightness: -23 },
				{ visibility: 'on' }
			]
		},{
			featureType: 'landscape.natural',
			elementType: 'all',
			stylers: [
				{ hue: '#E8E8E8' },
				{ saturation: -100 },
				{ lightness: -4 },
				{ visibility: 'on' }
			]
		}
	];

	var mapoptions = {
		mapTypeControlOptions: {
			mapTypeIds: [ 'mapstyle']
		},
		center: new google.maps.LatLng(52.4, 5.1),
		zoom: 8,
		mapTypeId: 'mapstyle',
		panControl: false,
		zoomControl: false,
		scaleControl: false,
		mapTypeControl: false,
		streetViewControl: false
	};
	var mapdiv = document.getElementById('bgmaps');
	map = new google.maps.Map(mapdiv, mapoptions);
	var styledMapType = new google.maps.StyledMapType(styles, { name: 'mapstyle' });
	map.mapTypes.set('mapstyle', styledMapType);

	locationSelect = document.getElementById("locationSelect");
	locationSelect.onchange = function() {
		var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
		if (markerNum != "none"){
			google.maps.event.trigger(markers[markerNum], 'click');
		}
	}
	infoWindow = new google.maps.InfoWindow();
}

function searchLocations() {
	var address = document.getElementById("addressInput").value + ' netherlands';
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({address: address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			searchLocationsNear(results[0].geometry.location);
		} else {
			alert(address + ' not found');
		}
	});
}

function clearLocations() {
	infoWindow.close();
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers.length = 0;
	
	locationSelect.innerHTML = "";
	var option = document.createElement("option");
	option.value = "none";
	option.innerHTML = "Bekijk andere resultaten (afstand in km):";
	locationSelect.appendChild(option);
}

function searchLocationsNear(center) {
	clearLocations(); 
	
	var radius = document.getElementById('radiusSelect').value;
	var searchUrl = geenUrl+'/wp-content/themes/bandbreed/maps/phpsqlsearch_genxml.php?lat=' + center.lat() + '&lng=' + center.lng() + '&radius=' + radius;
	downloadUrl(searchUrl, function(data) {
		var xml = parseXml(data);
		var markerNodes = xml.documentElement.getElementsByTagName("marker");
		var bounds = new google.maps.LatLngBounds();
		for (var i = 0; i < markerNodes.length; i++) {
			var name = markerNodes[i].getAttribute("name");
			var address = markerNodes[i].getAttribute("address");
			var distance = parseFloat(markerNodes[i].getAttribute("distance"));
			var latlng = new google.maps.LatLng(
				parseFloat(markerNodes[i].getAttribute("lat")),
				parseFloat(markerNodes[i].getAttribute("lng")));

			createOption(name, distance, i);
			createMarker(latlng, name, address);
			bounds.extend(latlng);
		}
		if (i > 1) {
			map.fitBounds(bounds);
		}
		else if (i == 1) {
			map.setCenter(bounds.getCenter());
			map.setZoom(16);
		}
		locationSelect.style.visibility = "visible";
		locationSelect.onchange = function() {
			var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
			google.maps.event.trigger(markers[markerNum], 'click');
		};
	});
}

function createMarker(latlng, name, address) {
	var html = "<b>" + name + "</b> <br/>" + address;
	var iconWidth = 80;
	var iconHeight = 71;
	var iconLeftoffset = 26;
	var iconRightoffset = 66;
  	var image = new google.maps.MarkerImage(geenUrl+'/wp-content/themes/bandbreed/maps/icon.png',
		new google.maps.Size(iconWidth, iconHeight),
		new google.maps.Point(0,0),
		new google.maps.Point(iconLeftoffset,iconRightoffset));
  	var shadow = new google.maps.MarkerImage(geenUrl+'/wp-content/themes/bandbreed/maps/shadow.png',
		new google.maps.Size(iconWidth, iconHeight),
		new google.maps.Point(0,0),
		new google.maps.Point(iconLeftoffset, iconRightoffset));
	var marker = new google.maps.Marker({
		map: map,
		icon: image,
		shadow: shadow,
		position: latlng
	});
	
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(html);
		infoWindow.open(map, marker);
	});
	markers.push(marker);
}

function createOption(name, distance, num) {
	var option = document.createElement("option");
	option.value = num;
	option.innerHTML = name + "(" + distance.toFixed(1) + ")";
	locationSelect.appendChild(option);
}

function downloadUrl(url, callback) {
	var request = window.ActiveXObject ?
		new ActiveXObject('Microsoft.XMLHTTP') :
		new XMLHttpRequest;

	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			request.onreadystatechange = doNothing;
			callback(request.responseText, request.status);
		}
	};

	request.open('GET', url, true);
	request.send(null);
}

function parseXml(str) {
	if (window.ActiveXObject) {
		var doc = new ActiveXObject('Microsoft.XMLDOM');
		doc.loadXML(str);
		return doc;
	} else if (window.DOMParser) {
		return (new DOMParser).parseFromString(str, 'text/xml');
	}
}

function doNothing() {}


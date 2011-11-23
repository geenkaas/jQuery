//	Google Maps colorizr and marker code.
function geenMaps(){
	var styles = [
		{
			featureType: 'water',
			elementType: 'all',
			stylers: [
				{ hue: '#c3e3f7' },
				{ saturation: 57 },
				{ lightness: 44 },
				{ visibility: 'on' }
			]
		},{
			featureType: 'landscape.man_made',
			elementType: 'all',
			stylers: [
				{ hue: '#bbbbbb' },
				{ saturation: -100 },
				{ lightness: -18 },
				{ visibility: 'on' }
			]
		},{
			featureType: 'road.arterial',
			elementType: 'all',
			stylers: [
				{ hue: '#999933' },
				{ saturation: -50 },
				{ lightness: -48 },
				{ visibility: 'on' }
			]
		},{
			featureType: 'road.local',
			elementType: 'all',
			stylers: [
				{ hue: '#eeeeee' },
				{ saturation: -100 },
				{ lightness: -7 },
				{ visibility: 'on' }
			]
		},{
			featureType: 'poi.attraction',
			elementType: 'all',
			stylers: [
				{ hue: '#eeeeee' },
				{ saturation: -100 },
				{ lightness: 70 },
				{ visibility: 'off' }
			]
		},{
			featureType: 'transit',
			elementType: 'all',
			stylers: [
				{ hue: '#eeeeee' },
				{ saturation: 0 },
				{ lightness: 73 },
				{ visibility: 'off' }
			]
		},{
			featureType: 'poi.business',
			elementType: 'all',
			stylers: [
				{ hue: '#eeeeee' },
				{ saturation: -100 },
				{ lightness: 56 },
				{ visibility: 'off' }
			]
		},{
			featureType: 'road.highway',
			elementType: 'all',
			stylers: [
				{ hue: '#d2090f' },
				{ saturation: -8 },
				{ lightness: -33 },
				{ visibility: 'on' }
			]
		}
	];
	
	var latlng = new google.maps.LatLng(51.952762,4.555099); // Right click on location in maps.google.com and select "What is this?", then copy the string
	var options = {
		mapTypeControlOptions: {
			mapTypeIds: [ 'Styled']
		},
		center: latlng,
		zoom: 12,	//	Zoom amount, higher is more zoomed in (1 to 20)
		mapTypeId: 'Styled',
		panControl: false,
		zoomControl: false,
		scaleControl: false,
		mapTypeControl: false,
		streetViewControl: false
	};
	
	var div = document.getElementById('gmap');	// ID of the Div to replace
	var map = new google.maps.Map(div, options);
	var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
	map.mapTypes.set('Styled', styledMapType);

	var iconWidth = 159;	//	Width of the icon (and shadow) image
	var iconHeight = 42;	//	Their height
	var iconLeftoffset = 66;	//	Where is the middle located
	var iconBottomoffset = 34;	//	Offset from top to middle
	var geenUrl = "http://www.klant.nl/wp-content/themes/geenkaas/images/maps/"; // Location of your images
	
  	var icon = new google.maps.MarkerImage(geenUrl+'gmap_marker_icon.png',	//	Icon image
		new google.maps.Size(iconWidth, iconHeight),
		new google.maps.Point(0,0),
		new google.maps.Point(iconLeftoffset,iconBottomoffset));
  	var shadow = new google.maps.MarkerImage(geenUrl+'images/maps/gmap_marker_shadow.png',	//	Icon's shadow image
		new google.maps.Size(iconWidth, iconHeight),
		new google.maps.Point(0,0),
		new google.maps.Point(iconLeftoffset, iconBottomoffset));
	var marker = new google.maps.Marker({
		map: map,
		icon: icon,
		shadow: shadow,
		position: latlng
	});
	
	var html = "<p><strong>REPLACE</strong></p><p>Some text</p>";
	infoWindow = new google.maps.InfoWindow();
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.setContent(html);
		infoWindow.open(map, marker);
	});
};
//	Background image variables: URL for background images
var baseUrl = 'http://www.url.com/wp-content/themes/theme/images/backgrounds/background_';
//number of images to rotate on load
var imgAantal = 4;


var wh; // Viewport height
var ww;	// Viewport width
var dh;	// Document height
var dbh; // Same (testen)
var dw = 960; // column width of site
var sd;	// Screen dimensions 
var iw = 1024;
var ih = 768;
var idim = iw/ih;


//	On document load
$(document).ready(function() {
   
   // calculate image background when resizing window
	$(window).scroll(initScreen).resize(initScreen);

	// and once
	initScreen();
	loadBg();
  	
});
//	End of document.ready

//	Background loader Once
function loadBg() {
	var randomNumber = 1 + Math.floor(Math.random() * imgAantal);
	$('#bg').attr('src', baseUrl + randomNumber + '.jpg');
};

//	Background resizer on init and resize window
function initScreen() {

	//	initscreen variables
	wh = $(window).height();
	ww = $(window).width();
	dh = $(document).height();
	dbh = $(document.body).height();
	sd = ww/wh;

	if(idim < sd) { // when screen is smaller than the background
		$('#bg').width(ww).height(ww / idim);
	} else if (idim > sd) { // or wider
		$('#bg').height(wh).width(wh * idim);
	};

	//position the image, around the middle of the screen
	var offsetleft = (ww - $('#bg').width())/2;
	var offsettop = (wh - $('#bg').height())/3;
	$('#bg').css('left', offsetleft + 'px').css('top', offsettop + 'px');

};
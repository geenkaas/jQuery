
//	Background image variables: URL for background images
	var baseUrl = 'http://www.fairminds.nl/wp-content/themes/bandbreed/images/backgrounds/';
//	Declare initScreen variables
	var wh; // Viewport height
	var ww;	// Viewport width
	var dh;	// Document height
	var dw = 960; // column width of site
	var sd;	// Screen dimensions 
	var iw = 960;
	var ih = 600;
	var idim = iw/ih;
	
	var scrolled;
	var bgOffset;
	var mh = 170; // Menu height expanded
	var mw = 160; // Menu width expanded
	var mhc = 40; // Menu height collapsed
	var mp = 10; // Menu padding
	
	var map;
	var markers = [];
	var infoWindow;
	var locationSelect;
	
	// Top 3 variables
	var centerleft;
	var filled = 0;
	var dragitem;
	var oldz = 200;
	var top3;
	var dropcount = 0;
	
	
/*
 window.fbAsyncInit = function() {
    FB.init({
      appId      : '266805616685359', // App ID
      channelURL : '//www.fairminds.nl/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      oauth      : true, // enable OAuth 2.0
      xfbml      : true  // parse XFBML
    });

    // Additional initialization code here
  };

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/nl_NL/all.js";
     d.getElementsByTagName('head')[0].appendChild(js);
   }(document));
/**/
   
//	On document load
$(document).ready(function() {
	//	Fire draggin and dropping functionality
	geenDrag-n-Drop();
});
//	End of document.ready

// Draggable and Droppable behaviour
function geenDrag-n-Drop() {

	// Functionality for draggable items
	$('.draggable').hover(function () {
		//	Action during hover
	}).draggable({
		revert: true,
 		containment: 'window',	//	Contain the draggable item within the browser window
        start : function() {
			//	Functionality when drag is started
			$(this).addClass('isBeingDragged');
			if($(this).hasClass('isDropped')){$(this).removeClass('isDropped')};
        },
		drag: function(event, ui) {
			//	Functionality during dragging
		},
		stop: function() {
        	//	Functionality when drag is stopped
			$(this).removeClass('isBeingDragged');
        }
	});

	// Funtionality for droppable items
	$('.droppable').droppable({
    	accept: '.draggable',
		activeClass: 'isReadyForDrop',
		hoverClass: 'isHoveredOver',
		over: function(event, ui) {
			$('.ui-draggable-dragging').addClass('isHovering'); //	Add hoverclass when draggable object is over the droppable item
		},
		out: function(event, ui) {
			$('.ui-draggable-dragging').removeClass('isHovering'); //	Remove hoverclass when draggable object is out of droppable item
		},
		drop: function(event, ui) {
			$(this).addClass('isFilled');
			$('.ui-draggable-dragging').addClass('isDropped');
		}
	});

};

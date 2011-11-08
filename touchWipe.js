// On document load
$(document).ready(function(){
   
	geenTouchwipe();
	
}); // End of document.ready


// Load iPad touch and wipe
function geenTouchwipe() {

	$("div.touchwipe").touchwipe({
		 wipeLeft: function() { alert("left"); },
		 wipeRight: function() { alert("right"); },
		 wipeUp: function() { alert("up"); },
		 wipeDown: function() { alert("down"); },
		 min_move_x: 20, // Slide distance before doing stuff
		 min_move_y: 20,
		 preventDefaultEvents: true
	});
	
}; // End geenTouchwipe


/* HTML example
		
	<div id="wipetest" class="touchwipe">
		Wipe me!
	</div>

End HTML example */


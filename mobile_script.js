//	On document load
$(document).ready(function(){

	//	Test for iPad and iPhone
	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
		//	alert('using iPad or iPhone!');
		geenApple();
	};
	
	//	Mobile browser check
	if(/(Android|iPhone|iPod|iPad|webOS|SymbianOS)/.test(navigator.userAgent)) {
		//	alert('using  any mobile device');
		geenMobile();
	};
   
	geenTouchwipe();
	geenApple();
	
}); //	End of document.ready


//	Load iPad touch and wipe
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
	
}; //	End geenTouchwipe


//	Set links for iphone and ipad
function geenApple() {
	setTimeout(scrollTo,0,0,0);
	if(window.navigator.standalone){
		var anchors = document.getElementsByTagName("a");
		var hostname = document.location.hostname;
		for (var i=0;i<anchors.length;i++){
			url = anchors[i].getAttribute("href");
			if(url){
				if(url.indexOf("http://")!=-1 && url.indexOf(hostname)==-1){
					anchors[i].setAttribute("target","_blank");
					anchors[i].setAttribute("class", "external");
				} 
				if(anchors[i].getAttribute("class")!="external"){
					anchors[i].removeAttribute("onfocus");
					anchors[i].onclick = function(){
						document.location.href = this.href;
						return false;
					}
				}
			}
		}
	}
};

function geenMobile() {
	//	alert('using a mobile device');
};


/* HTML example
		
	<div id="wipetest" class="touchwipe">
		Wipe me!
	</div>

End HTML example */


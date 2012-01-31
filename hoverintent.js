

////////////////////////////////////////////////////////////////////////////////////////////////////
//	Page initialisation and control	of screen													  //
////////////////////////////////////////////////////////////////////////////////////////////////////

//	When document structure is loaded
	$(document).ready(function() {
	
		//	Basic functions to do once
			geenHover();
			
	});	//	End document ready
	
//	End Init


////////////////////////////////////////////////////////////////////////////////////////////////////
//	Functions																					  //
////////////////////////////////////////////////////////////////////////////////////////////////////

//	Hoverintent function
	function geenHover() {
		$('#mydiv li').hoverIntent (
			//	mouseOver a listitem in mydiv
				function() {
					//	Remove old hoverclasses from all list items
						$('#mydiv li').removeClass('hover');
					//	Add the hover class to the hovering item
						$(this).addClass('hover');
				},
			//	mouseOut
				function() {
					//	Remove old hoverclasses from all list items
						$('#tabs ul li').removeClass('hover');
				}
		);
    };
    
//	End functions

    
////////////////////////////////////////////////////////////////////////////////////////////////////
//	Plugins 																					  //
////////////////////////////////////////////////////////////////////////////////////////////////////

//	Hover intent
	(function(a) {a.fn.hoverIntent=function(b,c) {var d={sensitivity:7,interval:100,timeout:200};d=a.extend(d,c?{over:b,out:c}:b);var e,f,g,h,i=function(a) {e=a.pageX,f=a.pageY},j=function(b,c) {c.hoverIntent_t=clearTimeout(c.hoverIntent_t);if(Math.abs(g-e)+Math.abs(h-f)<d.sensitivity)return a(c).unbind("mousemove",i),c.hoverIntent_s=1,d.over.apply(c,[b]);g=e,h=f,c.hoverIntent_t=setTimeout(function() {j(b,c)},d.interval)},k=function(a,b) {return b.hoverIntent_t=clearTimeout(b.hoverIntent_t),b.hoverIntent_s=0,d.out.apply(b,[a])},l=function(b) {var c=jQuery.extend({},b),e=this;e.hoverIntent_t&&(e.hoverIntent_t=clearTimeout(e.hoverIntent_t)),b.type=="mouseenter"?(g=c.pageX,h=c.pageY,a(e).bind("mousemove",i),e.hoverIntent_s!=1&&(e.hoverIntent_t=setTimeout(function() {j(c,e)},d.interval))):(a(e).unbind("mousemove",i),e.hoverIntent_s==1&&(e.hoverIntent_t=setTimeout(function() {k(c,e)},d.timeout)))};return this.bind("mouseenter",l).bind("mouseleave",l)}})(jQuery)

//	End Plugins
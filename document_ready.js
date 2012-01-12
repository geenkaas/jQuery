
////////////////////////////////////////////////////////////////////////////////////////////////////
//	Global variables															  				  //
////////////////////////////////////////////////////////////////////////////////////////////////////

//	Background image variables: URL for background images
	var bg = $('#bg');	//	Background image
	var bgOffset;		//	a number
	var baseUrl = '/wp-content/themes/bandbreed/images/backgrounds/';
	
//	Declare initScreen variables
	var wh;				//	Viewport height
	var ww;				//	Viewport width
	var dh;				//	Document height (whole content)
	var dw = 960;		//	column width of site
	var sd;				//	Screen dimensions 
	var iw = 1024;		//	Width of the actual bg image
	var ih = 768;		//	Height of the actual bg image	
	var idim = iw/ih;	//	Image dimension
	
	var scrolled = 0;

	
//	////	End global variables

////////////////////////////////////////////////////////////////////////////////////////////////////
//	Page initialisation and control	of screen													  //
////////////////////////////////////////////////////////////////////////////////////////////////////

//	When document structure is loaded
	$(document).ready(function() {
	
		//	Basic functions to do once
			initScreen();
		
	});	//	////	End document ready

//	What to do when page is loaded completely
	$(window).load(function() {
	
		//	Stuff to do last
		
	});	//	////	End window load

//	When user scrolls
	$(window).scroll(function() {
	
		//	Check how far user is scrolled
			scrolled = parseInt($(window).scrollTop());
			
	});	//	////	End window scroll

//	When user resizes window
	$(window).resize(function() {
	
		//	Update background
			initScreen();
				
	});	//	////	End window resize

////////////////////////////////////////////////////////////////////////////////////////////////////
//	Click handlers																			  	  //
////////////////////////////////////////////////////////////////////////////////////////////////////

function handler_templateClick() {
	
	//	Stuff to do when clicked

};
	
//	////	End click handlers

////////////////////////////////////////////////////////////////////////////////////////////////////
//	Functions																					  //
////////////////////////////////////////////////////////////////////////////////////////////////////

//	Stuff to do when building the page
	function initScreen() {
	
		if (idim < sd) {
			//	When screen is taller then background image
				bg.width(ww * 1.05).height(ww / idim * 1.05);
		} else if (idim > sd) {
			//	When screen is wider then background image
				bg.height(wh * 1.05).width(wh * idim * 1.05);
		};
		
		var offsetleft = (ww - bg.width())/2;
		var offsettop = (wh - bg.height())/3;
		bg.css({
			left: offsetleft,
			top: offsettop
		});
		
	};

//	Example functionalities to copy
	function template() {
		//	Attach click functionality
			$('#myDiv').click(handler_templateClick);
		if ($('#myDiv').length == 1) {
			//	Do stuff only if myDiv exists
		};	
		
	};
	
//	////	End functions

////////////////////////////////////////////////////////////////////////////////////////////////////
//	Features (Complete working functionalities)													  //
////////////////////////////////////////////////////////////////////////////////////////////////////


	
//	////	End features

////////////////////////////////////////////////////////////////////////////////////////////////////
//	Plug-ins 													  								  //
////////////////////////////////////////////////////////////////////////////////////////////////////

//	Hover intent
	(function(a){a.fn.hoverIntent=function(b,c){var d={sensitivity:7,interval:100,timeout:200};d=a.extend(d,c?{over:b,out:c}:b);var e,f,g,h,i=function(a){e=a.pageX,f=a.pageY},j=function(b,c){c.hoverIntent_t=clearTimeout(c.hoverIntent_t);if(Math.abs(g-e)+Math.abs(h-f)<d.sensitivity)return a(c).unbind("mousemove",i),c.hoverIntent_s=1,d.over.apply(c,[b]);g=e,h=f,c.hoverIntent_t=setTimeout(function() {j(b,c)},d.interval)},k=function(a,b){return b.hoverIntent_t=clearTimeout(b.hoverIntent_t),b.hoverIntent_s=0,d.out.apply(b,[a])},l=function(b){var c=jQuery.extend({},b),e=this;e.hoverIntent_t&&(e.hoverIntent_t=clearTimeout(e.hoverIntent_t)),b.type=="mouseenter"?(g=c.pageX,h=c.pageY,a(e).bind("mousemove",i),e.hoverIntent_s!=1&&(e.hoverIntent_t=setTimeout(function() {j(c,e)},d.interval))):(a(e).unbind("mousemove",i),e.hoverIntent_s==1&&(e.hoverIntent_t=setTimeout(function() {k(c,e)},d.timeout)))};return this.bind("mouseenter",l).bind("mouseleave",l)}})(jQuery)

//	jQuery advanced easing
	jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return b==0?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;g||(g=e*.3*1.5);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return b<1?-0.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c:h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){return f==undefined&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){return f==undefined&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){return f==undefined&&(f=1.70158),(b/=e/2)<1?d/2*b*b*(((f*=1.525)+1)*b-f)+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*7.5625*b*b+c:b<2/2.75?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:b<2.5/2.75?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(a,b,c,d,e){return b<e/2?jQuery.easing.easeInBounce(a,b*2,0,d,e)*.5+c:jQuery.easing.easeOutBounce(a,b*2-e,0,d,e)*.5+d*.5+c}})

//	format string function
	String.prototype.format=function() {var a=/\{\d+\}/g,b=arguments;return this.replace(a,function(a){return b[a.match(/\d+/)]})}
	
//	////	End Plug-ins
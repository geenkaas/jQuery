// Slider functionality

// Set up global vars
var sliderCollection;
var sliderHeight;
var moveNext = true;
var geenCounter = 666;
var activeSlider;
var nextSlider;
var slideTimer = 6000;
var geenTimeOut;


//	When page is fully loaded
$(document).ready(function(){

	//	Put all sliders in a variable
	sliderCollection = $('.slidediv');
	
	//	Whenyou click on a next or previous button
	$('.slidercontrols div[btn]').click(handler_prevnext_click);
	
	//	Create a template div for the navigation icons (1,2,3,etc.)
	var bolletje = '<div class="bolletje">{0}</div>';
	//	Fill the navigation with one dot for every slide in the slider collection and fill it with it's order
	sliderCollection.each(function(e) {
		$('div.bolletjes').append(bolletje.format($(this).index()));
	});
	//	put all those dots in a collection
	bolletjesCollection = $('.bolletje');
	//	Activate the first dot to show which slide is active (we'll set the slide later)
	bolletjesCollection.first().addClass('active');
	//	Add a clickhandler to each dot
	bolletjesCollection.click(handler_bolletje_click);
	
	//	Set the activeslider to the first slide in the collection and place it on top of the rest, also add one to the counter
	activeSlider = sliderCollection.first().show().css('z-index', geenCounter++);
	
	//	Start a counter, this will count down to the next slide to show (calls function slideDiv)
	geenTimeOut = setTimeout(slideDiv, slideTimer);

});

//	When you clicked on a previous or next button
function handler_prevnext_click() {
	//	Set movenext to either true or false, if next was clicked true, if previous then false
	moveNext = $(this).attr('btn') == 'next'? true : false;
	//	reset the timer to prevent double animations
	clearTimeout(geenTimeOut);
	//	Call the function to animate the next slide
	slideDiv();
};

//	When you click on a navigational dot
function handler_bolletje_click() {
	//	Check to see if you are not clicking on the active dot (which should not do anything)
	if (!$(this).hasClass('active')) {
		//	clear the timer
		clearTimeout(geenTimeOut);
		//	Move the rotational order to next, otherwise it will bug..
		moveNext = true;
		//	Ask where you click and subtract 1, this is done to use the next function which calls for the next slider and not the active
		//	We trick the system to think the activeslider is the one before the one we actually want to it will load the next (the correct) one.
		var bolletjeindex = $(this).index() - 1;
		//	Check to see if you did not click on the first doit, because that will trigger a non-exsistent slide
		//	If it is the case, call for the last slide in the collection (see previous bug :)
		if(bolletjeindex < 0) bolletjeindex = sliderCollection.length - 1;
		//	Set the activeslider to that of the previous dot but don't update the slide itself.
		activeSlider = sliderCollection.eq(bolletjeindex);
		//	Call for the animation function while the activeslide is primed.
		slideDiv();
	};
};

//	Function to animate the sliders
function slideDiv(){
	// Disable slider controls to prevent multiple clicking during animation
	$('.slidercontrols div[btn]').unbind();
	bolletjesCollection.unbind();
	// If direction is next then get next, else get previous slider in collection
	nextSlider = moveNext? activeSlider.next() : activeSlider.prev();
	// if prev or next slider does not exist then get the first or last element from the list
	if(nextSlider.length == 0) nextSlider = moveNext? sliderCollection.first() : sliderCollection.last();

	//	Clear the active dot and set the one that corresponds with the activeslide  to active
	bolletjesCollection.removeClass('active');
	bolletjesCollection.eq(nextSlider.index()).addClass('active');

	//	Hide the next slider, put it on top of the others and fade it in.
	nextSlider.hide().css('z-index', geenCounter++).fadeIn('easeOut', function() {
		// When done; enable slider controls
		$('.slidercontrols div[btn]').click(handler_prevnext_click);
		bolletjesCollection.click(handler_bolletje_click);
		//	Active animated slide as the active one
		activeSlider = nextSlider;
		
	});
	//	Reset the timout in case visitor does noting on itself.
	geenTimeOut = setTimeout(slideDiv, slideTimer);

};

//	Format script with example
String.prototype.format = function() {
	var pattern = /\{\d+\}/g;
	var args = arguments;
	return this.replace(pattern, function(capture){return args[capture.match(/\d+/)]});
}
//	var myName = 'John';
//	var myText = "hello {0}, how are you??".format(myName); // Place variable in the string.

/* HTML

<div id="sliderwrapper">
	<div class="sliderdiv">
		<div class="slidediv">Slide 1</div>
		<div class="slidediv">Slide 2</div>
		<div class="slidediv">Slide 3</div>
		<div class="slidediv">Slide 4</div>
		<div class="slidediv">Slide 5</div>
	</div>
	<div class="slidercontrols">
		<div class="centerdiv">
			<div class="slidercontrol" btn="prev">prev</div>
			<div class="bolletjes"></div>
			<div class="slidercontrol" btn="next">next</div>
		</div>
	</div>
</div>

/* CSS Example

/* @group geenSlider */
#sliderwrapper {
	background: #eee;
	margin: 0 0 20px;
	min-height: 370px;
	overflow: hidden;
	padding: 20px;
	position: relative;
	-moz-border-radius: 5px;
	border-radius: 5px;
	behavior: url(/wp-content/themes/bandbreed/scripts/PIE.htc);

	}
.slidediv {
	background: #eee;
	clear: both;
	display: none;
	max-height: 370px;
	overflow: hidden;
	position: absolute;
	}
.slidediv img {
	float: left;
	height: auto;
	width: 600px;
	-moz-border-radius: 3px;
	border-radius: 3px;
	behavior: url(/wp-content/themes/bandbreed/scripts/PIE.htc);
	}
.slidersidetext {
	color: #222;
	float: right;
	margin: 0 0 0 20px;
	width: 280px;
	}
.sliderdiv h4 {
	font: 24px/1 georgia;
	}
.slidercontrols {
	float: left;
	width: 600px;
	text-align: center;
	position: absolute;
	bottom: 30px;
	z-index: 999999;
	}
.centerdiv {
	display: inline-block;
	}
.slidercontrol {
	width: 50px;
	}
.bolletjes {
	float: left;
	}
.slidercontrol,
.bolletje {
	background: #ccc;
	background: rgba(255,255,255,0.5);
	color: #fff;
	cursor: pointer;
	line-height: 20px;
	min-width: 20px;
	float: left;
	margin: 0 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	behavior: url(/wp-content/themes/bandbreed/scripts/PIE.htc);
	}
.slidercontrol:hover,
.bolletje:hover {
	background: #fff;
	color: #d2090f;
	}
.bolletje.active {
	background:  #d2090f;
	}
.bolletje.active:hover {
	color: #fff;
	}
/* @end */


/**/
//	geentabs function
function geenTabs() {

	$('ul').each(function() {
		$(this).children('li').first().addClass('alpha');
		$(this).children('li').last().addClass('omega');
		
		$('ul li:first-child').addClass('alpha');
		$('ul li:last-child').addClass('omega');
	});

	//	activate and show the first item
	$('#tabs ul li').eq(0).addClass('active');
	$('#tabs ol li').eq(0).show();
			
	// hovereffects on tabs
	$('#tabs ul li').hoverIntent(
		// mouseover
		function(){
			$('#tabs ul li').removeClass('hover');
			$(this).addClass('hover');
		},
		// mouseout
		function(){
			$('#tabs ul li').removeClass('hover');
		}
    );
    
    //	clicks on tabs load other pages
	$('#tabs ul li').click(handler_tabClick);
	
};	//	End geenTabs

// Handling of the actual click
function handler_tabClick() {
	$('#tabs ul li').removeClass('active');
	$(this).addClass('active');
	var i = $(this).parent().children('li').index(this);
	$('#tabs ol li').eq(i).siblings().fadeOut('swing', function() {
		$('#tabs ol li').eq(i).fadeIn('swing');
	});
};
// or
// Handling of the actual click
function handler_tabClick() {
	$(this).siblings().not($(this)).removeClass('selected');
	$(this).addClass('selected');
	var tab = $(this).parent().attr('tab');
	var i = $(this).parent().children('li').index(this);
	$('ol.'+tab+'>li').eq(i).siblings().fadeOut('swing', function() {
		$('ol.'+tab+'>li').eq(i).fadeIn('swing');
	});
};
// With HTML
//<ul tab="thistab"></ul>
//<ol class="thistab"></ol>
// Global variables

	var closeHeight = 40

// On document load
$(document).ready(function(){
   
	geenAccordeon();
	
}); // End of document.ready


// Accordeon
function geenAccordeon() {
	$('.accordeonWrapper h6').wrap('<div class="faqitem" />');
	
	$('.accordeonWrapper p').each(function(){
		$(this).appendTo($(this).prev());
	});
	$('.accordeonWrapper').each(function(){
		$(this).attr('orgheight', $(this).height());
		$(this).css('height',closeHeight);
	}).click(handler_accordeonClick);
	
};

function handler_accordeonClick() {
	var h = closeHeight;
	if($(this).height() == h) {
		$('.faqitem').not($(this)).css('height',h);
		h = $(this).attr('orgheight');
	};
	$(this).css('height',h);
};
}; // End geenAccordeon


/* HTML example

<div class="accordeonWrapper">
	<h6>Question</h6>
	<p>Answer</p>
	<h6>Question</h6>
	<p>Answer</p>
	<h6>Question</h6>
	<p>Answer</p>
</div>
	
End HTML example */


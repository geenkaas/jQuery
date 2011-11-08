// On document load
$(document).ready(function(){
   
	geenFormhelp();
	
});
// End of document.ready

// Basic click function for help with forms
function geenFormhelp() {

	$('.formrow input').click(function() {
		var dit = $(this);
		dit.focus();
		dit.not('.focused-field').addClass('focused-field').children('.formhelp').slideDown('swing');
		$('.focused-field').not(dit).removeClass('focused-field').children('.formhelp').slideUp('swing');
	});
	
};
// End geenFormhelp


/* HTML example

<div class="formrow">
	<label for="email_field">
		E-mailadres
	</label>
	<div class="bordered">
		<input type="text" id="email_field" class="fullwidth" name="email_field" required="true" validate="email" inmail="true" indb="true" />
	</div>
	<div class="formhelp">
		<input type="text" id="email_field" class="fullwidth" name="email_field" required="true" validate="email" inmail="true" indb="true" />
	</div>
</div>

End HTML example */
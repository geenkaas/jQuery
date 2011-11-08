
//	On document load
$(document).ready(function(){
   
	//	Custom functions
	geenCookies();
	
});	//	End of document.ready

//	Set basic functionality for cookie buttons
function geenCookies() {
	$('#setcookie').click(function() {
		var tt = $('#putmeincookie').html();
		createCookie('ct',tt);
		alert('Cookie saved! value: '+ tt)
	});
	
	$('#readcookie').click(function() {
		alert(readCookie('ct'));
	});	
	
	$('#clearcookie').click(function() {
		clearCookie('ct'));
		alert(readCookie('ct'));
	});
};	//	End geenCookies

//	Local storage of cookies.
function createCookie(name, value) {
    if ("localStorage" in window && window["localStorage"] != null) {
        // Local storage supported
        localStorage.setItem(name, value);
    } else {
        var date = new Date();
        date.setTime(date.getTime() + (360 * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = name + "=" + value + expires + "; path=/";
    };
};
function clearCookie(name, value) {
    if ("localStorage" in window && window["localStorage"] != null) {
        // Local storage supported
        localStorage.setItem(name, null);
    } else {
        var expires = "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        document.cookie = name + "=" + expires + "; path=/";
    };
};
function readCookie(name) {
    var s = null;
    if ("localStorage" in window && window["localStorage"] != null) {
        // Local storage supported
        s = localStorage.getItem(name);
    } else {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                s = c.substring(nameEQ.length, c.length);
            };
        };
    };
    if (s != null) {
        if (s.toLowerCase() == 'true') return true;
        else if (s.toLowerCase() == 'false') return false;
    };
    return s;
	//    return null;
};
//	End local storage


/*	HTML example

	<style type="text/css">
		.cookiebutton {
			border: 2px solid #ccc;
			cursor: pointer;
			display: inline-block;
			line-height: 32px;
			padding: 0 20px;
			}
	</style>

	<h3 id="putmeincookie" contenteditable="true">
		Edit this text
	</h3>
	
	<div id="setcookie" class="cookiebutton">
		Save text in cookie
	</div>
	
	<p>
		Leave this page, return and...
	</p>
	
	<div id="readcookie" class="cookiebutton">
		Read the saved text in cookie
	</div>
	
	<div id="clearcookie" class="cookiebutton">
		Or clear the value of the cookie
	</div>

End HTML example	*/
//	Facebook plugins

//	HTML Like box

<!-- Place this where you want the box to appear -->
<div class="fb-like-box" data-href="http://www.facebook.com/REPLACE" data-width="300" data-height="450" data-show-faces="true" data-border-color="#fff" data-stream="false" data-header="false"></div>

//	Place this just above the /body tag

<!-- Facebook -->
<div id="fb-root"></div>
<script>
	window.fbAsyncInit = function() {
		FB.init({
			appId  : '306790876005491', //	REPLACE with your code (developer.facebook.com)
			status : true, // check login status
			cookie : true, // enable cookies to allow the server to access the session
			xfbml  : true  // parse XFBML
		});
	};
	(function() {
		var e = document.createElement('script');
		e.src = document.location.protocol + '//connect.facebook.net/nl_NL/all.js';
		e.async = true;
		document.getElementById('fb-root').appendChild(e);
	}());
</script>
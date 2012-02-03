//	Twitter feed
		
////	CSS
ul#twitterfeed {
	list-style: none;
	margin: 0;
	overflow: hidden;
	padding: 0;
	}
ul#twitterfeed li {
	border-bottom: 1px dotted #333;
	margin: 0 0 10px;
	min-height: 58px;
	}
ul#twitterfeed img {
	float: left;
	margin-right: 10px;
	}
ul#twitterfeed p {
	margin: 0;
	}
	
////	Script
//	Loading Twitter JSON and building HTML output
	function twitterCallback(tweets) {
		var statusHTML = [];
		for (var i=0; i<tweets.length; i++){
			var username = tweets[i].user.screen_name;
			var name = tweets[i].user.name;
			var date = tweets[i].user.created_at;
			var profile_image = tweets[i].user.profile_image_url;
			var status = tweets[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
				return '<a href="'+url+'">'+url+'</a>';
			}).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
				return	reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
			});
			statusHTML.push('<li><a href="http://twitter.com/'+username+'/"><h3>'+username+'</h3><h4>'+name+'</h4></a><p><span>'+status+'</span></p><h4>'+date+'</h4></li>');
		};
		if ($('#twitterfeed').length !== 0) {
			document.getElementById('twitterfeed').innerHTML = statusHTML.join('');
		};
	};

////	HTML
	//	find and replace REPLACE were feed is to show)
		<div id="twitterwrapper">
			<ul id="twitterfeed">
				<li>
					<h3>Twitter is temporary over capacity</h3>
				</li>
			</ul>
		</div>
		
	//	Place this just above the /body tag
		<!-- Twitter -->
			<script src="//platform.twitter.com/widgets.js"></script>
			<script src="http://twitter.com/statuses/user_timeline/REPLACE.json?callback=twitterCallback&count=10"></script>

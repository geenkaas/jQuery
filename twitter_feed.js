//	Twitter feed
//	Script
function twitterCallback(tweets) {
	var statusHTML = [];
	for (var i=0; i<tweets.length; i++){
		var username = tweets[i].user.screen_name;
		var profile_image = tweets[i].user.profile_image_url;
		var status = tweets[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
			return '<a href="'+url+'">'+url+'</a>';
		}).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
			return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
		});
		statusHTML.push('<li><a href="http://twitter.com/'+username+'/"><img src="'+profile_image+'" /></a><p><span>'+status+'</span></p></li>');
	};
	document.getElementById('twitterfeed').innerHTML = statusHTML.join('');
};

//	HTML (find and replace REPLACE here)
		<!-- Place this at location -->
		<ul id="twitterfeed"><li>Twitter can not be loaded</li></ul>
		
		<!-- Place this just above the /body tag -->
			<script src="http://twitter.com/statuses/user_timeline/REPLACE.json?callback=twitterCallback&count=10"></script>
			
//	CSS
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
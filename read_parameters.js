var geenParams = {};
(function () {
	var e,
		a = /\+/g,  // Regex for replacing addition symbol with a space
		r = /([^&=]+)=?([^&]*)/g,
		d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
		q = window.location.search.substring(1);
	while (e = r.exec(q))
		geenParams[d(e[1])] = d(e[2]);
})();

//	Example: http://www.website.com/?clickparam=Hello%20world!
//	alert(geenParams["clickparam"]);
//	Result: Hello World!
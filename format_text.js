//	Format script with example
String.prototype.format = function() {
	var pattern = /\{\d+\}/g;
	var args = arguments;
	return this.replace(pattern, function(capture){return args[capture.match(/\d+/)]});
}
//	var myName = 'John';
//	var myText = "hello {0}, how are you??".format(myName); // Place variable in the string.
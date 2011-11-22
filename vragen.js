//	ExactVars
var exactFactor = 1.9; //	What to show within range of.
var exactMultiplier = 1; // What to add
var exactStart = 10;	//	Start value

//	Define local storage object
var _set = new Object();
//	Reference list of all values in Local Storage
var allItems = ['exactScholier','exactStudent','exactMBO','exactHBO','exactWO','exactMedisch','exactEnergie','exactMoney','exactVoeding','exactMobiliteit','exactScience','exactLifestyle'];


//	On document load
$(document).ready(function() {

	var mySet = jQuery.parseJSON(readCookie('exactSettings'));
	
	//	Cookie exists, returning visitor
	if (mySet != null) {
		_set = mySet;
		$('span.exactReturn').html('Ja');
		if(!_set.exactReturn){saveSession('exactReturn', true)};
		//	Controleren of waardes bestaan, anders toevoegen.
		for (k in allItems){if (k !== 'indexOf') { // ie7/8 check
			if(_set[allItems[k]]==null){saveSession(allItems[k], exactStart)};
		}};
	} else {	//	Visitor is here for the first time
		//	Fill all scores with their basic component
		for (k in allItems){if (k !== 'indexOf') {
			//	Give all values a beginvalue of ten
			_set[allItems[k]] = exactStart;
		}};
		//	Set default values
		_set.exactTest = false;		//	Test already done?
		_set.exactStore = false;	//	Save choices?
		_set.exactReturn = false;	//	Returning visitor?
		_set.exactShow = false;		//	Showing results?
		_set.exactAll = false;		//	Showing all results?
		_set.exactVraag = 0;		//	Set starting question
		//	Save all variables in cookie
		saveSession();
	};
	
	$('#storageTab, #socialTab').hoverIntent(function() {
		$(this).addClass('hovering');
		returnExactScores();
	}, function(e){
		var p = $(this).position();
		var y = e.clientY;
		if(e.clientX > $(this).width() || y < p.top || y > p.top + $(this).height() ) {
			$(this).removeClass('hovering');
		};
		$(this).removeClass('hovering');
	});
	
	//	Update alle scores
	returnExactScores();
	
	//	Functionaliteit voor vragenlijst.
	lightbox();
	
	//	Add +1's to the main menu where applicable.
	$('.menu-item-22, .menu-item-21, .menu-item-15').attr({exact: 'exactScholier'});
	$('.menu-item-13, .menu-item-20, .menu-item-12, .menu-item-17').attr({exact: 'exactStudent'});
	//	Als je op een item klikt op +1 te geven
	$('[exact]').click(handler_exactClick);
	
	//	Button om alle waardes te resetten
	$('.clearallvars').closest('li').unbind().click(handler_clearClick);
	$('.storejanee').closest('li').unbind().click(handler_storejanee);
	$('.watisdit').closest('li').unbind().click(handler_watisdit);
	$('.testreset').closest('li').unbind().click(handler_testreset);
	$('.showalltoggle').closest('li').unbind().click(handler_showallClick);
	
	//	Showall button functionality
	$('#showall').unbind().click(handler_showallClick);
	if(!_set.exactShow){$('#showall').hide()};
	
	//	User wants to see everything
	showandtell();
});

//	When you click on a +1 item on the site
function handler_exactClick(e){

	//	Test has not yet been done before.
	if(!_set.exactTest){
		e.preventDefault(); // Sla oude link op en doe alsnog???
		$('#exactWrapper').fadeIn('fast');
		_set.exactTest = true;
		lightbox();
		return;
	};
	
	//	Visitor does not want to use Local Storage
	if(!_set.exactStore) {
		$('[exact]').unbind();
		return;
	};
	
	//	Want to fo the test, blink Storage tab
	$('.storageAlert').show().fadeOut(600,'easeInOutQuad');
	
	//	Vis het attribuut op waar je op klikt
	var exactProps = $(this).attr('exact');
	//	test of er meerdere attributen zijn
	var exactProp = exactProps.split(',');
	//	Doe voor elk attribuut het volgende
	for(k in exactProp){if (k !== 'indexOf') {
		//	stop de juiste attribuut in CK
		var ck = exactProp[k];
		//	Tel een bij die attribuut op
		var n = _set[ck] + exactMultiplier;
		//	Sla nieuwe waardes (+1) op in cookie
		saveSession(ck, n);
		//	Update waardes (show hide selectieve content)
		returnExactScores();
	}};
};

//	When the Clear Vars button is clicked
function handler_clearClick() {
	//	Verwijder alle data en de cookie zelf
	clearCookie('exactSettings');
	
	//	Zet alle variabele weer terug op beginwaardes
	for (k in allItems){if (k !== 'indexOf') {
		//	Give all values a beginvalue of ten
		_set[allItems[k]] = exactStart;
	}};
	
	//	Set the value of all bars to 0
	$('#storageTab span[replace="true"]').html('0').width(5);
	
	//	Test niet gedaan (verwijderen na ontwikkeling)
	//_set.exactTest = false;
	//_set.exactReturn = false;
	//_set.exactShow = false;
	//_set.exactAll = true;
	//_set.exactVraag = 0;
	//	Update de score (meestal toon alles)
	returnExactScores();
};

//	When the Test is reset
function handler_testreset() {
	//	Test niet gedaan (verwijderen na ontwikkeling)
	_set.exactVraag = 1;
	_set.exactTest = false;
};

//	When the Test is reset
function handler_storejanee() {
	//	Toggle variable and update scores
	_set.exactStore = !_set.exactStore;
	returnExactScores();
};
//	When the Test is reset
function handler_watisdit() {
	
};

//	When the Test is reset
function handler_showalltoggle() {
	
};

function showandtell(){
	if (_set.exactAll) {
		$('#showall').html('Exact wat ik zoek');
		$('.kanweg').addClass('tochlatenzien');
		$('#showall').addClass('clicked').html('Exact wat ik zoek');
		$('.kanweg').addClass('tochlatenzien');
	} else {
		$('#showall').html('Toon alles');
		$('.kanweg').removeClass('tochlatenzien');
	};
	returnExactScores();
};
//	When the show all button is clicked
function handler_showallClick() {
	//	If button is already on and showing everything
	_set.exactAll = !_set.exactAll;
	$('#showall').toggleClass('clicked');
	//$('#showalltogglelist').toggleClass('activated');
	showandtell();
};

//	Update scores and check to see what to hide.
function returnExactScores() {

	//	Update scores in tabbladen
	$('#storageTab span[replace="true"]').each(function() {
		var exactContent = $(this).attr('class');
		$('span.'+exactContent).html(_set[exactContent]-exactStart);
	});
	
	//	Zet alle variabelen in arrays and alle arrays in een master array
	var exactLevenswegen = ['exactScholier','exactStudent'];
	var exactNiveaus = ['exactMBO','exactHBO','exactWO'];
	var exactVakgebieden = ['exactMedisch','exactEnergie','exactMoney','exactVoeding','exactMobiliteit','exactScience','exactLifestyle'];
	var exactGroups = [exactLevenswegen,exactNiveaus,exactVakgebieden];
	
	//	Loop door alle niveaus en vul de namen en de waardes toe aan properties in die multi-arrays
	$('[tohide]').removeClass('laatstaan');
	for (k in exactGroups) {if (k !== 'indexOf') {
		for (l in exactGroups[k]) {if (l !== 'indexOf') {
			exactGroups[k][l] = {name: exactGroups[k][l], clicks:_set[exactGroups[k][l]]}; // Create array with groups, subgroups their name and clicks
			if(l==(exactGroups[k].length-1).toString()){ //When done looping subgroups sort highest to lowest within main group
				function sortDesc(a,b) {return b.clicks - a.clicks};
				var highest = exactGroups[k].sort(sortDesc);
				// loop again through each subgroup
				for (m in exactGroups[k]) {if (m !== 'indexOf') {
					var myName = exactGroups[k][m].name;
					var hideObj = $('[tohide*="{0}"]'.format(myName));
					
					//	Calculate bar width
					var tempw = Math.ceil( ( (exactGroups[k][m].clicks-10) / (highest[0].clicks-10) ) * 90);
					$('#storageTab span[class*="{0}"]'.format(myName)).width(tempw);
					
					if (exactGroups[k][m].clicks * exactFactor > highest[0].clicks) {
						hideObj.addClass('laatstaan').removeClass('kanweg');
					} else {
						$('#showall').show();
						_set.exactShow = true;
						hideObj.addClass('kanweg');
					};
				}};
			};
		}};
	}};
	//	Put lists in their place after showing and hiding
	sortLists();
	
	//	Activate the buttons in the sidepanel according to its status
	$('.storejanee').closest('li').removeClass('activated');
	if(_set.exactStore){$('.storejanee').closest('li').addClass('activated')};
	$('#showalltogglelist').removeClass('activated');
	if(_set.exactAll){$('#showalltogglelist').addClass('activated')};
};

//	ease out lists and puts them in place.
function sortLists(){
	$('ul.modular>li').removeClass('alpha').removeClass('omega');
	var mw = $('ul.modular').width(); //	Width of the whole table
	var m = $('ul.modular>li:visible');	//	Get visible items in modular list
	var n = m.length;	//	Number of visible items in the list
	m.first().addClass('alpha');
	m.last().addClass('omega');
	var mm = 20; //	Margin between lists
	m.width(Math.floor( (mw - ((n-1)*mm)) / n));
};

//	Lightbox and Exact Test functionality
function lightbox() {
	//	Get a ist of all questions
	var qi = $('#exactQuestions .vraag');
	//	Turn on all questions
	qi.show();
	//	Get the number of questions
	var gn = qi.length;
	//	Hide all questions
	qi.hide();
	//	Show the current question
	qi.eq(_set.exactVraag).show();
	
	//	Close or cancel functionality
	function handler_testClose() {
		exactMultiplier = 1;
		_set.exactTest = true;
		_set.exactReturn = true;
		_set.exactStore = false;
		saveSession('exactStore', false);
		$(this).closest('[lb="lightbox"]').fadeOut();
	};
	//	Start the test
	function handler_testStart() {
		_set.exactStore = true;
		_set.exactVraag = 1;
		exactMultiplier = exactStart;
		$(this).closest('.vraag').hide().next().show();
		returnExactScores();
	};
	//	Answer any question
	function handler_test() {
		_set.exactVraag = _set.exactVraag++;
		if (_set.exactVraag = 4){exactMultiplier = 5;};
		$(this).closest('.vraag').hide().next().show();
		returnExactScores();
	};
	//	Answer question 1
	function handler_test1() {
		_set.exactVraag = 2;
		$(this).closest('.vraag').hide().next().show();
		returnExactScores();
	};
	//	Answer question 2
	function handler_test2() {
		_set.exactVraag = 3;
		$(this).closest('.vraag').hide().next().show();
		returnExactScores();
	};
	//	Answer question 3
	function handler_test3() {
		_set.exactVraag = 4;
		$(this).closest('.vraag').hide().next().show();
		returnExactScores();
	};
	//	Close the lightbox after all the questions
	function handler_testDone() {
		_set.exactVraag = 0;
		//	Temp reset if did the test
		exactMultiplier = 1;
		_set.exactTest = true;
		$(this).closest('[lb="lightbox"]').fadeOut();
		returnExactScores();
	};
	
	//	Assign clicks on test elements.
	$('div[lb="lightbox"] div.close, #signoff').unbind().click(handler_testClose);
	$('#signon').unbind().click(handler_testStart);
	$('#vraag1 span').click(handler_test1);
	$('#vraag2 span').click(handler_test2);
	$('#vraag3 span').click(handler_test3);
	$('#closeq').unbind().click(handler_testDone);
};



////////////////////////////////////////////////
//											  //
//		Don't touch!
//											  //
////////////////////////////////////////////////



//	Function save settings exactVars
function saveSession(key, value) {
	if(key != null) {_set[key] = value};
	createCookie('exactSettings',JSON.stringify(_set));
};


//	Local Storage met Coockie Backup.
function createCookie(name, value) {
	if ("localStorage" in window && window["localStorage"] != null) {
		//	Local storage supported
		localStorage.setItem(name, value);
	}
	else {
		var date = new Date();
		date.setTime(date.getTime() + (360 * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
		document.cookie = name + "=" + value + expires + "; path=/";
	}
}
function clearCookie(name, value) {
	if ("localStorage" in window && window["localStorage"] != null) {
		//	Local storage supported
		localStorage.setItem(name, null);
	}
	else {
		var expires = "; expires=Thu, 01-Jan-70 00:00:01 GMT";
		document.cookie = name + "=" + expires + "; path=/";
	}
}
function readCookie(name) {
	var s = null;
	if ("localStorage" in window && window["localStorage"] != null) {
		//	Local storage supported
		s = localStorage.getItem(name);
	}
	else {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) {
				s = c.substring(nameEQ.length, c.length);
			}
		}
	}
	if (s != null) {
		if (s.toLowerCase() == 'true') return true;
	   else if (s.toLowerCase() == 'false') return false;
	}
	return s;
//	return null;
}

//	format
String.prototype.format = function() {
	var pattern = /\{\d+\}/g;
	var args = arguments;
	return this.replace(pattern, function(capture){ return args[capture.match(/\d+/)]; });
}
//	var myName = 'John';	//	{0}
//	var myText = "hallo {0}, hoe is het?".format(myName);

//	JSON Stringify
//	jQuery.parseJSON(string);
//	JSON.stringify(object);

if(!this.JSON){this.JSON={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());
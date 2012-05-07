
var myCollection = new Object();
var myCollectionNews = new Object();
var myOrder = new Array();
var geenFormaat;
var bannerNum;
var activeBanner = new Object();
var bo;
var ch;
var flooradtopoffset;
var flooradwidth;
var flooradoffset;

// Single bannerpositions
//  left position, top position, width, height, 				name, description, source file, amount of banners
myCollection.rectangle = 		[new myBanner(618,210,336,280,	'rectangle','336x280 rectangle banner','3')];
myCollection.halfpage = 		[new myBanner(618,210,336,600, 	'halfpage','x','3')];
myCollection.logolink = 		[new myBanner(618,600,336,20, 	'logolink','x','3')];
myCollection.leaderboard = 		[new myBanner(226, 57, 728, 90, 'leaderboard','x','3')];
myCollection.leaderboardxl = 	[new myBanner(0,57,974,120, 	'leaderboardxl','x','3')];
myCollection.pushdown = 		[new myBanner(0,57,974,150, 	'pushdown','x','3')];
myCollection.takeover =			[new myBanner(0,0,974,1200, 	'takeover','x','3')];
myCollection.cornerad = 		[new myBanner(0,700,974,250, 	'cornerad','x','3')];
myCollection.floorad = 			[new myBanner(0,300,974,150, 	'floorad','x','3')];
myCollection.partnerpagina = 	[new myBanner(9,151,322,199, 	'partnerpagina','3')];
myCollection.headerlink = 		[new myBanner(195,0,95,12, 		'headerlink','x','3')];
myCollection.wallpaper1 = 		[new myBanner(-200,0,200,1200, 	'wallpaper','x','3')];
myCollection.wallpaper2 = 		[new myBanner(974,0,200,1200, 	'wallpaper','x','3')];
myCollection.portrait = 		[new myBanner(618,140,336,1170, 'portrait','x','3')];
myCollection.rectangle = 		[new myBanner(618,210,336,280,	'rectangle','336x280 rectangle banner','3')];

// Collection of two banners
myCollection.roadblock = [myCollection.leaderboard, myCollection.rectangle];
myCollection.wallpaper = [myCollection.wallpaper1, myCollection.wallpaper2];

//	newsletterformat
myCollectionNews.advert1_elsevier = [new myBanner(-70,255,340,140, 'Elsevier advertentiepositie 1')];
myCollectionNews.advert2_elsevier = [new myBanner(-70,566,340,60, 'Elsevier advertentiepositie 2')];
myCollectionNews.advert1_beurs = [new myBanner(-73,273,485,134, 'Beurs advertentiepositie 1')];
myCollectionNews.advert2_beurs = [new myBanner(-73,682,468,67, 'Beurs.nl advertentiepositie 2')];
myCollectionNews.advert1_bb = [new myBanner(-74,262,335,167, 'Beleggers Belangen advertentiepositie 1')];
myCollectionNews.full_bb = [new myBanner(80,8,332,64, 'Beleggers Belangen Full banner')];
myCollectionNews.advert1_bb = [new myBanner(-74,262,340,167, 'Beleggers Belangen advertentiepositie 1')];
myCollectionNews.advert2_bb = [new myBanner(-74,604,340,120, 'Beleggers Belangen advertentiepositie 2')];

//window.addEvent('domready', function() {
jQuery(document).ready(function() {
	for(r in myCollection) {myOrder.push(r)};
	geenHoverPass();
	geenLightbox();
	
	jQuery(window).scroll(initScreen).resize(initScreen);
	initScreen();
});

function initScreen() {
	
	jQuery('#banner0').css({
		position: 'absolute',
		marginLeft: 0
	});
	bo = (jQuery(window).width() - 974) / 2; //	banner offset compensating fixed position.

	ch = jQuery(window).height() - jQuery('#banner0[formaat="cornerad"]').height();
	jQuery('#banner0[formaat="cornerad"]').css({
		top: ch,
		position: 'fixed',
		marginLeft: bo // put it in place
	});
	
	flooradtopoffset = jQuery(window).height() - jQuery('#banner0[formaat="floorad"]').height() + 15;
	flooradwidth = jQuery(window).width();
	flooradoffset = (jQuery(window).width() - 974)/2;
	jQuery('#banner0[formaat="floorad"]').css({
		top: flooradtopoffset,
		position: 'fixed',
		width: flooradwidth
	}).addClass('floorad');
};

function geenHoverPass() {
	jQuery('.roadblock').hover(function () {
		jQuery('#pos_leaderboard, #pos_rectangle').addClass('hoveractivated');
		jQuery('p.roadblock').addClass('texthover');
	}, function () {
		jQuery('#pos_leaderboard, #pos_rectangle').removeClass('hoveractivated');
		jQuery('p.roadblock').removeClass('texthover');
	});
	
	jQuery('.lbpush').hover(function() {
		jQuery('#pos_leaderboard').addClass('lbpush');
	});
	jQuery('.lbexpand').hover(function() {
		jQuery('#pos_leaderboard').addClass('lbexpand');
	});
	
	jQuery('#pos_leaderboard, .roadblock, .lbexpand, .leaderboard').hover(function() {
		jQuery('#pos_leaderboard').removeClass('lbpush');
	}), function() {
		jQuery('#pos_leaderboard').removeClass('lbpush');
	};
	jQuery('#pos_leaderboard, .roadblock, .lbpush, .leaderboard').hover(function() {
		jQuery('#pos_leaderboard').removeClass('lbexpand');
	}), function() {
		jQuery('#pos_leaderboard').removeClass('lbexpand');
	};
	
	jQuery('#pos_wallpaper1, #pos_wallpaper2').hover(function () {
		jQuery('#pos_wallpaper1, #pos_wallpaper2').addClass('hoveractivated');
		jQuery('p.wallpaper').addClass('texthover');
	}, function () {
		jQuery('#pos_wallpaper1, #pos_wallpaper2').removeClass('hoveractivated');
		jQuery('p.wallpaper').removeClass('texthover');
	});
};

function geenLightbox() {
	jQuery('#crealightbox_online').height(jQuery(document).height());
	jQuery('#closeBanner h3').click(function() {
	
		jQuery('#crealightbox_online').hide();
		
	});
	jQuery('.crea_format').click(function() {
		
		bannerNum = 1;
		jQuery('#crealightbox_online').show();
		geenFormaat = jQuery(this).attr('formaat');
		geenBannerClick(geenFormaat);
		
		//if (b.amount == 1) { hide 2 en 3}
		//else if b.amount == 2 { hide 3 }
		
	});
};

function geenBannerClick(bannerFormaat) {

		jQuery('#bannercontrols h3.bannertitle').html(bannerFormaat);
		
		activeBanner = myCollection[bannerFormaat];
		
		var bannerSelect = findBannerId(bannerFormaat);
		bannerSelect = parseInt(bannerSelect);
		var totals = myOrder.length;
		var prevBanner;
		var nextBanner;
		if (bannerSelect+1 == totals) {
			prevBanner = myOrder[bannerSelect-1];
			nextBanner=myOrder[0];
		} else if ((bannerSelect-1) < 0) {
			prevBanner = myOrder[totals-1];
			nextBanner = myOrder[bannerSelect+1];
		} else {
			prevBanner = myOrder[bannerSelect-1];
			nextBanner = myOrder[bannerSelect+1];
		};
		// Clicks on previous and next buttons
		jQuery('#bannercontrols span.prev').html('vorige: '+prevBanner).unbind('click').click(function() {
			geenBannerClick(prevBanner);
		});
		jQuery('#bannercontrols span.next').html('volgende: '+nextBanner).unbind('click').click(function() {
			geenBannerClick(nextBanner);
		});
		// Clicks on three banner examples
		
		jQuery('.bannerimg1').unbind('click').click(function() {
			bannerNum=1;
			geenBannerClick(bannerFormaat);
		});
		jQuery('.bannerimg2').unbind('click').click(function() {
			bannerNum=2;
			geenBannerClick(bannerFormaat);
		});
		jQuery('.bannerimg3').unbind('click').click(function() {
			bannerNum=3;
			geenBannerClick(bannerFormaat);
		});
		
		geenBanner();
};

function findBannerId(geenFormaat) {
	for(s in myOrder) {
		if (myOrder[s] == geenFormaat) {
			return s;
		};
	};
};

function geenBanner() {
	if (activeBanner.length == 1) {
		jQuery('#banner1').hide();
		jQuery('#banner0').css({
			left: 0,
			top: 0,
			width: 200,
			height: 200
		});
	};
	for (var i = 0; i < activeBanner.length; i++) {
		var b = new Object();
		b = jQuery.isArray(activeBanner[i]) ? activeBanner[i][0] : activeBanner[i];
		
		jQuery('#bannertext p').html(b.descr);
		
		jQuery('#banner'+i).show().css({
			left: b.left,
			top: b.top,
			width: b.width,
			height: b.height
		}).attr('formaat',b.name);
		initScreen();
		
		var bannerSrc = 'rectangle1';
		var so = new SWFObject('/images/banners/'+ b.name +''+ bannerNum +'.swf', '1x1', b.width, b.height, '9');
		so.addParam('quality', 'high');
		so.addParam('wmode', 'opaque');
		so.write('banner'+i);
	};
};

// left, top, width, height, name, description, amount
function myBanner(l,t,w,h,n,d,a) {
	this.left = l;
	this.top = t;
	this.width = w;
	this.height = h;
	this.name = n;
	this.descr = d;
	this.amount = a;
};

function geenResize() {
};


 // let people navigate with the left/right arrow keys
    $(document).keydown(function(e){        
        if (e.keyCode == 37 || e.keyCode == 39) { 
			offSet       = (e.keyCode == 39 ? 1 : -1);
			currentImage = $('li.active').get(0);
			allImages    = $('#gallery li');
			currentIndex = jQuery.inArray(currentImage,  allImages);
			nextIndex    = currentIndex+offSet;
			if (nextIndex > allImages.length-1) {
				nextIndex = 0;
			}
			nextImage    = $(allImages.get(nextIndex));
			
			goToImage(nextImage);
        }
	});

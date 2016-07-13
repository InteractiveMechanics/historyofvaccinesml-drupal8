(function ($) {
	
	$('.page figure > img').click(function(){
    	var image_link = window.location.hostname + $(this).attr('src');
    	window.open('http://' + image_link, '_blank');
	});
	
	$('.btn-search').click(function(){
		var val = $('.search-txt').val();
		if(val) {
			var url = "http://dev.interactivemechanics.com/greatmigration/search/node?keys="+ val +"&f[0]=type:artwork&f[1]=type:history&f[2]=type:page&advanced-form=1"
			window.location.href = url;	
		}
	});

    if ($('.artwork-hero-inner').hasClass('preciousplaces')) {
        $('body').addClass('preciousplaces');
    }

    $('ul.dropdown-menu a[title="Precious Places"]').addClass('preciousplaces');

    // If you're scrolling and not at the top of the page...
    $(window).scroll(function() {
        if(!$(window).scrollTop()) {
            $('nav.navbar').removeClass('scrolled');
            $('#artwork-scrollspy').removeClass('scrolled');
        } else {
            $('nav.navbar').addClass('scrolled');
            $('#artwork-scrollspy').addClass('scrolled');
        }
    });

    // Rotate through images on the artwork page automagically
    var images = $('.artwork-hero-image').find('div');
    if (images.length > 1) {
        var total = images.length;
        var count = 0;

        function changeImage() {
            images.removeClass('in');
            $('.artwork-hero-image div:eq(' + count + ')').addClass('in');

            count++;
            if (count > total - 1){ count = 0; }
        }
        setInterval(changeImage, 5000);
    }

    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 1000);
                return false;
            }
        }
    });

    // Launch galleries for video/images
    $('.launch-gallery').on('click tap', function() {
        var images = $(this).attr('data-src-images').split(',');
        var html = $(this).attr('data-sub-html').split('$');
        var array = [];
        
        for(i = 0; i < images.length; i++) {
	        var json = {
                "src": images[i],
                "subHtml": html[i]
            };
            array.push(json);
        }
        console.log(array);
        $(this).lightGallery({
            mode: 'lg-fade',
            dynamic: true,
            thumbnail: false,
            fullScreen: false,
            zoom: false,
            download: false,
            autoplay: false,
            dynamicEl: array
        });
    });
    $('.launch-video').on('click tap', function() {
        var video = $(this).attr('data-src-video');
        $(this).lightGallery({
            mode: 'lg-fade',
            dynamic: true,
            thumbnail: false,
            fullScreen: false,
            zoom: false,
            download: false,
            autoplay: false,
            vimeoPlayerParams: {
                badge: 0,
                byline: 0,
                portrait: 0,
                title: 0,
                loop: 1
            },
            dynamicEl: [{'src': video}]
        });
    });
    
    $('.launch-audio').on('click tap', function() {
        var audio = $(this).attr('data-src-audio');
        $('#audio-player').removeClass('hidden').delay(100).queue(function (next) {
            $(this).addClass('in').find('audio').attr('src', audio);
            next();
        });
        $('#audio-player audio').on('ended', function() { 
            $('#audio-player').removeClass('in').delay(500).queue(function (next) {
                $(this).addClass('hidden');
                next();
            });
        }); 
    });
   
})(jQuery);
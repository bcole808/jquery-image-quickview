this.jQuery && (function ($) {

	$(document).ready( function() {
		quickView.initialize();
	});

	var quickView = {

		isScrollLocked : false,

		initialize : function() {

			var $wrapper = $('body');

			// Create container
			$wrapper.append('<div id="imageQuickView"><div id="imageQuickViewCell"></div></div>');
			this.$container 	= $('#imageQuickView');
			this.$containerCell = $('#imageQuickViewCell');

			// Quick View FX
			$wrapper.delegate("a","click", quickView.processClickEvent);

			// Close on click
			this.$container.click(quickView.hide);

			// Close on esc key
			$('body').keyup(function(e) {
				if (e.which == 27) quickView.hide();
			});
		},

		processClickEvent : function(e) {

			var targetURL = $(e.currentTarget).attr('href');

			// Do not intercept URLs that are alt-clicked
			if (e.metaKey) return true;

			// Do not intercept things on tiny devices
			if (quickView.isSmallScreen()) return true;

			// Intercept image URLs
			if (quickView.hasImageExtension(targetURL)) {
				quickView.showImage(targetURL);
				return false;
			}

			// Intercept Youtube videos
			var youtube_id = quickView.getYoutubeID(targetURL);
			if (youtube_id) {
				quickView.showYoutube(youtube_id);
				return false;
			}

			// Intercept Vimeo videos
			var vimeo_id = quickView.getVimeoID(targetURL);
			if (vimeo_id) {
				quickView.showVimeo(vimeo_id);
				return false;
			}

			return true;
		},

		isSmallScreen: function() {
			return window.innerWidth < 500;
		},

		hasImageExtension : function(url) {
			if (url) return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
		},

		getYoutubeID : function(url) {
			var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
			var match = url.match(regExp);
			return (match&&match[7].length==11)? match[7] : false;
		},

		getVimeoID : function(url) {
			var re = /\/\/(?:www\.)?vimeo.com\/(?:channels\/staffpicks\/)?([0-9a-z\-_]+)/i;
			var matches = re.exec(url);
			return matches && matches[1];
		},

		showYoutube : function(youtube_id) {
			quickView.show('<iframe id="myIframe" width="100%" height="100%" src="https://www.youtube.com/embed/'+youtube_id+'?autoplay=1"></iframe>');
		},

		showVimeo : function(vimeo_id) {
			quickView.show('<iframe src="https://player.vimeo.com/video/'+vimeo_id+'?autoplay=1" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
		},

		showImage : function(image_url) {
			quickView.show('<img src="'+image_url+'" />');
		},

		show : function(content_html) {
			quickView.$containerCell.html(content_html).css('height',$(window).height()+"px").css('width',$(window).width()+"px");
			quickView.$container.fadeIn(80);
			quickView.lockScroll();
		},

		hide : function() {
			quickView.$container.fadeOut(40);
			setTimeout(function(){
				quickView.$containerCell.empty();
			},40);

			quickView.unlockScroll();
		},

		lockScroll : function() {
			// lock scroll position, but retain settings for later
			var scrollPosition = [
			  self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
			  self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
			];
			var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
			html.data('scroll-position', scrollPosition);
			html.data('previous-overflow', html.css('overflow'));
			html.css('overflow', 'hidden');
			window.scrollTo(scrollPosition[0], scrollPosition[1]);
			this.isScrollLocked = true;
		}, // end lockScroll

		unlockScroll : function() {
			if (!this.isScrollLocked) return false;

			var html = jQuery('html');
			var scrollPosition = html.data('scroll-position');
			html.css('overflow', html.data('previous-overflow'));
			window.scrollTo(scrollPosition[0], scrollPosition[1]);
		}
	}

})(jQuery);
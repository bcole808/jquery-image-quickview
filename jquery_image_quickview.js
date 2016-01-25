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
			$wrapper.delegate("a","click",function(e) {

				var targetURL = $(e.currentTarget).attr('href');

				// Do not intercept URLs that are alt-clicked
				if (e.metaKey) return true;

				// Intercept image URLs
				if (quickView.hasImageExtension(targetURL)) {
					var content = quickView.createMarkupForImage(targetURL);
					quickView.show(content);
					return false;
				}

				return true;
			});

			// Close on click
			this.$container.click(quickView.hide);

			// Close on esc key
			$('body').keyup(function(e) {
				if (e.which == 27) quickView.hide();
			});
		},

		hasImageExtension : function(url) {
			if (url) return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
		},

		createMarkupForImage : function(targetURL) {
			return '<img src="'+targetURL+'" />';
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
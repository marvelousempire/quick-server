(function($) { "use strict";

	/* DOCUMENT LOAD */
	$(function() {
	
		// WP FIX: PORTFOLIO SINGLE NAV
		function fixPortfolioNav() {
			$('.portfolio-nav .left-arrow a').addClass('icon button prev ajax');
			$('.portfolio-nav .right-arrow a').addClass('icon button next ajax');
		}
		
		fixPortfolioNav();	
		
		$(document).ajaxComplete(function(event, request, settings) {
			fixPortfolioNav();
		});
	});

})(jQuery);
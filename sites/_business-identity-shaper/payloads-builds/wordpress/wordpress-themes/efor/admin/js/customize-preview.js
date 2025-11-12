(function($) {

	var api = wp.customize;

// ====================================================================================================================


	wp.customize('blogname', function(value)
	{
		value.bind(function(to)
		{
			$('header h1.site-title a span').html(to);
		});
	});
	
	
	wp.customize('blogdescription', function(value)
	{
		value.bind(function(to)
		{
			$('header  p.site-description').html(to);
		});
	});


// ====================================================================================================================


	function efor_check_font_type(remove_class, css_selector_start, css_selector_end, font)
	{
		$('.' + remove_class).remove();
		
		if (font.match('^FONT_LOCAL_'))
		{
			// This is a local font.
			
			var theme_directory_url = $('#efor_theme_directory_url').attr('content');
			var local_font_name     = font.substring(11); // Remove: FONT_LOCAL_
			var local_font_folder   = local_font_name.toLowerCase().replace(/\s+/g, '-');
			var local_font_url      = theme_directory_url + '/css/fonts/' + local_font_folder + '/stylesheet.css';
			
			$('body').append('<link class="' + remove_class + '" rel="stylesheet" type="text/css" href="' + local_font_url + '">');
			
			// This "if" only for Jost* font.
			if (local_font_name == 'Jost')
			{
				local_font_name = 'Jost*';
			}
			
			$('body').append('<style class="' + remove_class + '" type="text/css"> ' + css_selector_start + '"' + local_font_name + '"' + css_selector_end + ' </style>');
		}
		else if (font == "")
		{
			// This is a system font.
			
			font = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
			
			$('body').append('<style class="' + remove_class + '" type="text/css"> ' + css_selector_start + font + css_selector_end + ' </style>');
		}
		else
		{
			// This is a Google font.
			
			var font_url_name = font.replace(/\s+/g, '+');
			
			$('body').append('<link class="' + remove_class + '" rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=' + font_url_name + ':300,400,500,600,700,800,900,300i,400i,500i,600i,700i,800i,900i">');
			$('body').append('<style class="' + remove_class + '" type="text/css"> ' + css_selector_start + '"' + font + '"' + css_selector_end + ' </style>');
		}
	}


// ====================================================================================================================


	// Font Family
	
 	wp.customize('efor_setting_font_text_logo', function(value)
	{
		value.bind(function(to)
		{
			efor_check_font_type('efor_setting_font_text_logo', '.site-title { font-family: ', '; }', to);
		});
	});
	
	
 	wp.customize('efor_setting_font_menu', function(value)
	{
		value.bind(function(to)
		{
			efor_check_font_type('efor_setting_font_menu', '.nav-menu, .entry-meta, .owl-nav, label, .page-links, .navigation, .entry-title i, .site-info, .filters { font-family: ', '; }', to);
		});
	});
	
	
 	wp.customize('efor_setting_font_widget_title', function(value)
	{
		value.bind(function(to)
		{
			efor_check_font_type('efor_setting_font_widget_title', '.widget-title { font-family: ', '; }', to);
		});
	});
	
	
 	wp.customize('efor_setting_font_h1', function(value)
	{
		value.bind(function(to)
		{
			efor_check_font_type(
				'efor_setting_font_h1',
				'h1, .entry-title, .footer-subscribe h3, .widget_categories ul li, .widget_recent_entries ul li a, .widget_pages ul li, .widget_nav_menu ul li, .widget_archive ul li, .widget_most_recommended_posts ul li a, .widget_calendar table caption, .tptn_title, .nav-single a, .widget_recent_comments ul li, .widget_product_categories ul li, .widget_meta ul li, .widget_rss ul a.rsswidget { font-family: ',
				'; }',
				to
			);
		});
	});
	
	
 	wp.customize('efor_setting_font_h2_h6', function(value)
	{
		value.bind(function(to)
		{
			efor_check_font_type('efor_setting_font_h2_h6', 'h2, h3, h4, h5, h6, blockquote, .tab-titles { font-family: ', '; }', to);
		});
	});
	
	
 	wp.customize('efor_setting_font_slider_title', function(value)
	{
		value.bind(function(to)
		{
			efor_check_font_type('efor_setting_font_slider_title', '.slider-box .entry-title { font-family: ', '; }', to);
		});
	});
	
	
 	wp.customize('efor_setting_font_body', function(value)
	{
		value.bind(function(to)
		{
			efor_check_font_type('efor_setting_font_body', 'body { font-family: ', '; }', to);
		});
	});
	
	
 	wp.customize('efor_setting_intro_font', function(value)
	{
		value.bind(function(to)
		{
			efor_check_font_type('efor_setting_intro_font', '.intro h1 { font-family: ', '; }', to);
		});
	});
	
	
 	wp.customize('efor_setting_font_link_box_title', function(value)
	{
		value.bind(function(to)
		{
			efor_check_font_type('efor_setting_font_link_box_title', '.link-box .entry-title { font-family: ', '; }', to);
		});
	});
	
	
 	wp.customize('efor_setting_font_buttons', function(value)
	{
		value.bind(function(to)
		{
			efor_check_font_type('efor_setting_font_buttons', '.button, button, html .elementor-button, html .ekit-wid-con .elementskit-btn, html .ekit-wid-con .ekit_creative_button, .more-link { font-family: ', '; }', to);
		});
	});
	
	
 	wp.customize('efor_setting_font_tagline', function(value)
	{
		value.bind(function(to)
		{
			efor_check_font_type('efor_setting_font_tagline', '.site-description { font-family: ', '; }', to);
		});
	});
	
	
 	wp.customize('efor_setting_font_top_bar', function(value)
	{
		value.bind(function(to)
		{
			efor_check_font_type('efor_setting_font_top_bar', '.top-bar { font-family: ', '; }', to);
		});
	});
	
	
 	wp.customize('efor_setting_font_icon_box_title', function(value)
	{
		value.bind(function(to)
		{
			efor_check_font_type('efor_setting_font_icon_box_title', '.pw-icon-box h3 { font-family: ', '; }', to);
		});
	});


// ====================================================================================================================


 	wp.customize('efor_setting_content_width', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .layout-medium, .is-header-row .header-wrap-inner, .is-header-small .header-wrap-inner, .is-menu-bar.is-menu-fixed-bg .menu-wrap, .is-header-fixed-width .header-wrap, .is-header-fixed-width.is-menu-bar .site-navigation, .is-header-float-box:not(.is-header-float-box-menu) .site-header:not(.clone) .header-wrap, .is-header-float-box.is-menu-bar .site-header:not(.clone) .site-navigation:not(.clone), .is-body-boxed .site, .is-body-boxed .header-wrap, .is-body-boxed.is-menu-bar .site-navigation, .is-body-boxed:not(.is-menu-bar) .site-header, .is-middle-boxed .site-main, .intro-content, .is-footer-boxed .site-footer, .is-content-boxed .site-main .layout-fixed, .top-bar .top-bar-wrap, .is-top-bar-fixed .top-bar, .is-top-bar-fixed-bg .top-bar, .is-menu-bottom.is-menu-bottom-overflow .site-header:not(.clone) .site-navigation:not(.clone) .menu-wrap, .site-branding-wrap, .is-header-border-fixed .header-wrap:after, .is-header-border-fixed .menu-wrap:after, html .tutor-container, html .lp-content-area, html .learn-press-breadcrumb { max-width: ' + to + 'px; margin-left: auto; margin-right: auto; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_page_post_content_width', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .layout-fixed, .blog-list, .blog-regular, .is-content-boxed .single .site-content, .is-content-boxed .page .site-content { max-width: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_menu_height', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css">' + 
							
								'@media screen and (min-width: 992px) {' + 
								
									'.is-header-small .header-wrap, .is-menu-bar .nav-menu > ul > li, .is-header-vertical .nav-menu > ul > li { line-height: ' + to + 'px; }' + 
								
								'}' + 
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_menu_sticky_height', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css">' + 
							
								'@media screen and (min-width: 992px) {' + 
								
									'.is-header-small.is-header-smaller .site-header.clone .header-wrap, .is-header-row.is-header-smaller .site-header.clone .nav-menu > ul > li, .is-menu-bar.is-header-smaller .site-navigation.clone .nav-menu > ul > li, .is-menu-bar.is-header-smaller .site-header.clone .site-navigation .nav-menu > ul > li { line-height: ' + to + 'px; }' + 
									
									'.is-header-small.is-header-smaller .site-header.clone .site-branding { max-height: ' + to + 'px; }' + 
								
								'}' + 
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});


// ====================================================================================================================


 	wp.customize('efor_setting_logo_height', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .site-title img { max-height: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_logo_height_mobile', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (max-width: 991px) { .site-title img { max-height: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_logo_height_sticky', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .is-header-smaller .site-header.clone .site-title img { max-height: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_logo_margin', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .site-branding-wrap { padding: ' + to + 'px 0; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_logo_margin_mobile', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (max-width: 991px) { .site-branding-wrap { padding: ' + to + 'px 0; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_logo_padding', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> html .site-header .site-title a { padding: ' + to + 'px ' + (2 * to) + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_logo_border_radius', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> html .site-header .site-title a { border-radius: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});


// ====================================================================================================================


 	wp.customize('efor_setting_font_size_text_logo', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .site-header .site-title { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_text_logo_sticky', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .is-header-smaller .site-header.clone .site-title { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_text_logo_mobile', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (max-width: 991px) { .site-header .site-title { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_tagline', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .site-description { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_blog_regular_post_title', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .blog-regular .entry-title, .blog-stream.first-full .hentry:first-child .entry-title { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_blog_grid_post_title', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .blog-small .entry-title { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_h1', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { h1 { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_body', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { html { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_body_mobile', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (max-width: 991px) { html { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_nav_menu', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .nav-menu > ul { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_excerpt', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .blog-stream .entry-content { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_blog_grid_excerpt', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .blog-stream.blog-small .entry-content { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_sidebar', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .sidebar { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_sidebar_widget_title', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .widget-title { font-size: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_nav_sub_menu', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .nav-menu ul ul { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_intro_font_size', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .intro h1 { font-size: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_meta', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .entry-meta { font-size: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_top_bar', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .top-bar { font-size: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_buttons', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .button, button, html .elementor-button, .elementor-button.elementor-size-md, .elementor-button.elementor-size-xs, html .ekit-wid-con .elementskit-btn, html .ekit-wid-con .ekit_creative_button, .more-link { font-size: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_copyright', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .site-footer .site-info { font-size: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_size_icon_box_title', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .pw-icon-box h3 { font-size: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});


// ====================================================================================================================


 	wp.customize('efor_setting_header_top_bar_height', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .top-bar { line-height: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_header_row_padding', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .is-header-row .header-wrap-inner { padding: ' + to + 'px 0; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_header_vertical_width', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css">' + 
							
								'@media screen and (min-width: 1360px) {' + 
								
									'.is-header-vertical .site-header, .is-header-vertical .site-header .header-wrap { width: ' + to + 'px; }' + 
									
									'.is-header-vertical-left .site { padding-left: ' + to + 'px; }' + 

									'.is-header-vertical-right .site { padding-right: ' + to + 'px; }' + 
								
								'}' + 
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});


// ====================================================================================================================


 	wp.customize('efor_setting_intro_text_transform', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .intro h1 { text-transform: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_buttons__primary_button_border_radius', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .button.is-primary, .button.is-primary:after, html .elementor-button, .elementor-button.elementor-size-xs, .elementor-button.elementor-size-sm, .elementor-button.elementor-size-md, .elementor-button.elementor-size-lg, .elementor-button.elementor-size-xl, html .ekit-wid-con .elementskit-btn, html .ekit-wid-con .ekit_creative_button { border-radius: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_buttons__secondary_button_border_radius', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .button.is-secondary, .button.is-secondary:after, .elementor-element.elementor-button-info .elementor-button { border-radius: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_header_sub_menu_animation_duration', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .nav-menu ul ul { transition-duration: ' + to + 's; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_sidebar_width', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style id="efor_setting_color_slider_meta_bg_border" type="text/css">' + 
							
								'@media screen and (min-width: 992px) {' +
								
									'.with-sidebar { margin-right: -' + to + 'px; }' +
									
									'.with-sidebar .site-content { margin-right: ' + to + 'px; }' +
									
									'.sidebar { width: ' + to + 'px; }' +
									
									'.is-sidebar-left .with-sidebar { margin-left: -' + to + 'px; }' +
									
									'.is-sidebar-left .with-sidebar .site-content { margin-left: ' + to + 'px; }' +
								
								'}' +
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});


// ====================================================================================================================


 	wp.customize('efor_setting_font_weight_text_logo', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .site-title { font-weight: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_weight_h1', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> h1, .entry-title, .footer-subscribe h3 { font-weight: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_weight_h2_h6', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> h2, h3, h4, h5, h6, blockquote, .comment-meta .fn { font-weight: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_weight_slider_title', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .slider-box .entry-title { font-weight: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_weight_sidebar_widget_title', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .widget-title { font-weight: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_weight_nav_menu', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .nav-menu > ul { font-weight: ' + to + '; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_weight_nav_sub_menu', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .nav-menu ul ul { font-weight: ' + to + '; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_intro_font_weight', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .intro h1 { font-weight: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_weight_link_box_title', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .link-box .entry-title { font-weight: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_weight_buttons', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .button, button, html .elementor-button, html .ekit-wid-con .elementskit-btn, html .ekit-wid-con .ekit_creative_button, .more-link { font-weight: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_weight_tagline', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .site-description { font-weight: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_weight_top_bar', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .top-bar { font-weight: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_weight_copyright', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .site-footer .site-info { font-weight: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_weight_icon_box_title', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .pw-icon-box h3 { font-weight: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_font_weight_meta', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .entry-meta { font-weight: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});


// ====================================================================================================================


 	wp.customize('efor_setting_letter_spacing_main_slider_title', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .slider-box .entry-title { letter-spacing: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_letter_spacing_nav_menu', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .nav-menu > ul { letter-spacing: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_letter_spacing_nav_sub_menu', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .nav-menu ul ul { letter-spacing: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_letter_spacing_sidebar_widget_title', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .widget-title { letter-spacing: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_intro_letter_spacing', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .intro h1 { letter-spacing: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_letter_spacing_link_box_title', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .link-box .entry-title { letter-spacing: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_letter_spacing_tagline', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .site-description { letter-spacing: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_letter_spacing_buttons', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .button, button, html .elementor-button, html .ekit-wid-con .elementskit-btn, html .ekit-wid-con .ekit_creative_button, .more-link { letter-spacing: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_letter_spacing_copyright', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .site-footer .site-info { letter-spacing: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_letter_spacing_icon_box_title', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .pw-icon-box h3 { letter-spacing: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});


// ====================================================================================================================


 	wp.customize('efor_setting_text_transform_h1', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> h1, .entry-title, .footer-subscribe h3, .widget_categories ul li, .widget_recent_entries ul li, .widget_pages ul li, .widget_archive ul li, .widget_calendar table caption, .tptn_title, .nav-single a { text-transform: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_text_transform_h2_h6', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> h2, h3, h4, h5, h6, blockquote, .comment-meta .fn { text-transform: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});


// ====================================================================================================================


 	wp.customize('efor_setting_body_line_height', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { html { line-height: ' + to + '; } } </style>';
			
			$('body').append(styleCss);
		});
	});


 	wp.customize('efor_setting_header_bg_shape_height', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .header-bg-shape { height: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_featured_area_top_padding', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .featured-area { padding-top: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_featured_area_grid_spacing', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css">' + 
							
								'@media screen and (min-width: 768px) {' + 
								
									'.featured-area .block { padding: ' + to + 'px; }' + 
									
									'.featured-area { margin: -' + to + 'px; }' + 
								
								'}' + 
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_header_border_top_width', function(value)
	{
		value.bind(function(to)
		{
			var headerWrapAfterTop  = (-to);
			var headerWrapMarginTop = to;
			var toInt               = parseInt(to);
			
			if (toInt <= 0)
			{
				headerWrapMarginTop = '0';
			}
			
			var styleCss = '<style type="text/css">' + 
							
								'.header-wrap:after { top: ' + headerWrapAfterTop + 'px; }' + 
								
								'.header-wrap { margin-top: ' + headerWrapMarginTop + 'px; }' + 
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_header_menu_border_top_width', function(value)
	{
		value.bind(function(to)
		{
			var headerMenuWrapAfterTop  = (-to);
			var headerMenuWrapMarginTop = to;
			var toInt                   = parseInt(to);
			
			if (toInt <= 0)
			{
				headerMenuWrapMarginTop = '0';
			}
			
			var styleCss = '<style type="text/css">' + 
							
								'.is-menu-bar .menu-wrap:after { top: ' + headerMenuWrapAfterTop + 'px; }' + 
								
								'.is-menu-bar .menu-wrap { margin-top: ' + headerMenuWrapMarginTop + 'px; }' + 
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_header_border_bottom_width', function(value)
	{
		value.bind(function(to)
		{
			var headerWrapAfterBottom = (-to);
			
			var styleCss = '<style type="text/css">' + 
							
								'.header-wrap:after { bottom: ' + headerWrapAfterBottom + 'px; }' + 
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_header_menu_border_bottom_width', function(value)
	{
		value.bind(function(to)
		{
			var headerMenuWrapAfterBottom = (-to);
			
			var styleCss = '<style type="text/css">' + 
							
								'.is-menu-bar .menu-wrap:after { bottom: ' + headerMenuWrapAfterBottom + 'px; }' + 
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_header_border_left_width', function(value)
	{
		value.bind(function(to)
		{
			var headerWrapAfterLeft = (-to);
			
			var styleCss = '<style type="text/css">' + 
							
								'.header-wrap:after { left: ' + headerWrapAfterLeft + 'px; }' + 
								
								'@media screen and (min-width: 992px) { .is-header-vertical-right .header-wrap:after { width: ' + to + 'px; } }' + 
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_header_menu_border_left_width', function(value)
	{
		value.bind(function(to)
		{
			var headerMenuWrapAfterLeft = (-to);
			
			var styleCss = '<style type="text/css">' + 
							
								'.is-menu-bar .menu-wrap:after { left: ' + headerMenuWrapAfterLeft + 'px; }' + 
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_header_border_right_width', function(value)
	{
		value.bind(function(to)
		{
			var headerWrapAfterRight = (-to);
			
			var styleCss = '<style type="text/css">' + 
							
								'.header-wrap:after { right: ' + headerWrapAfterRight + 'px; }' + 
								
								'@media screen and (min-width: 992px) { .is-header-vertical-left .header-wrap:after { width: ' + to + 'px; } }' + 
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_header_menu_border_right_width', function(value)
	{
		value.bind(function(to)
		{
			var headerMenuWrapAfterRight = (-to);
			
			var styleCss = '<style type="text/css">' + 
							
								'.is-menu-bar .menu-wrap:after { right: ' + headerMenuWrapAfterRight + 'px; }' + 
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});


 	wp.customize('efor_setting_header_border_top_radius', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .header-wrap, .header-wrap:after, .header-wrap:before { border-top-left-radius: ' + to + 'px; border-top-right-radius: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_header_menu_border_top_radius', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .is-menu-bar .menu-wrap, .is-menu-bar .menu-wrap:after { border-top-left-radius: ' + to + 'px; border-top-right-radius: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});


 	wp.customize('efor_setting_header_border_bottom_radius', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .header-wrap, .header-wrap:after, .header-wrap:before { border-bottom-left-radius: ' + to + 'px; border-bottom-right-radius: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
 	wp.customize('efor_setting_header_menu_border_bottom_radius', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .is-menu-bar .menu-wrap, .is-menu-bar .menu-wrap:after { border-bottom-left-radius: ' + to + 'px; border-bottom-right-radius: ' + to + 'px; } </style>';
			
			$('body').append(styleCss);
		});
	});


// ====================================================================================================================


	wp.customize('efor_setting_color_link', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> a { color: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_link_hover', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> a:hover { color: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_header_bg', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css">' +
							
								'.site-header .header-wrap { background-color: ' + to + '; }' +
								
								'html:not(.is-menu-bottom) .site-header .header-bg-shape { color: ' + to + '; }' +
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_header_background_gradient', function(value)
	{
		value.bind(function(to)
		{
			$('#efor_setting_color_header_background_gradient').remove();
			
			if (to != "")
			{
				var styleCss = '<style id="efor_setting_color_header_background_gradient" type="text/css">' + 
								
									'.site-header .header-wrap { background: linear-gradient(90deg, ' + api.instance('efor_setting_color_header_bg').get() + ' 30%, ' + to + ' 100%); }' +
								
								'</style>';
				
				$('body').append(styleCss);
			}
			else
			{
				var styleCss = '<style id="efor_setting_color_header_background_gradient" type="text/css">' +
								
									'.site-header .header-wrap { background: none; }' +
									
									'.site-header .header-wrap { background-color: ' + api.instance('efor_setting_color_header_bg').get() + '; }' +
									
									'html:not(.is-menu-bottom) .site-header .header-bg-shape { color: ' + api.instance('efor_setting_color_header_bg').get() + '; }' +
								
								'</style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_header_bg_img', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .site-header .header-wrap { background-image: url(' + to + '); } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_menu_bg', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css">' +
							
								'.site-header .menu-wrap { background-color: ' + to + '; }' +
								
								'html.is-menu-bottom .site-header .header-bg-shape { color: ' + to + '; }' +
							
							'</style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_menu_background_gradient', function(value)
	{
		value.bind(function(to)
		{
			$('#efor_setting_color_menu_background_gradient').remove();
			
			if (to != "")
			{
				var styleCss = '<style id="efor_setting_color_menu_background_gradient" type="text/css">' + 
								
									'.site-header .menu-wrap { background: linear-gradient(90deg, ' + api.instance('efor_setting_color_menu_bg').get() + ' 30%, ' + to + ' 100%); }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
			else
			{
				var styleCss = '<style id="efor_setting_color_menu_background_gradient" type="text/css">' + 
								
									'.site-header .menu-wrap { background: none; }' + 
									
									'.site-header .menu-wrap { background-color: ' + api.instance('efor_setting_color_menu_bg').get() + '; }' + 
									
									'html.is-menu-bottom .site-header .header-bg-shape { color: ' + api.instance('efor_setting_color_menu_bg').get() + '; }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_menu_active_link_text', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .nav-menu > ul > li.current-menu-item > a { color: ' + to + ' !important; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_menu_active_link_bg_border', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .nav-menu li.current-menu-item > a .link-text:before { background-color: ' + to + ' !important; border-color: ' + to + ' !important; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_menu_link_hover_text', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { html .nav-menu > ul > li > a:hover, .nav-menu > ul > li.has-submenu:hover > a { color: ' + to + '; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_menu_link_hover_bg_border', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { html.loaded .nav-menu ul li a .link-text:before, .nav-menu li.has-submenu:hover > a .link-text:before { background-color: ' + to + '; border-color: ' + to + '; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_sub_menu_active_link_text', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .nav-menu  ul ul li.current-menu-item > a .link-text { color: ' + to + ' !important; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_sub_menu_link_hover_text', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { html .nav-menu ul ul li a:hover .link-text, .nav-menu ul ul li.has-submenu:hover > a .link-text { color: ' + to + '; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_headings_text', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> h1, h2, h3, h4, h5, h6, blockquote, .tab-titles { color: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_body_text', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> body { color: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_body_bg', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> body { background: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_footer_bg', function(value)
	{
		value.bind(function(to)
		{
			if (to != "")
			{
				var styleCss = '<style type="text/css"> .site-footer { background: ' + to + '; } </style>';
				
				$('body').append(styleCss);
			}
			else
			{
				var styleCss = '<style type="text/css"> .site-footer { background: none; } </style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_footer_background_gradient', function(value)
	{
		value.bind(function(to)
		{
			$('#efor_setting_color_footer_background_gradient').remove();
			
			if (to != "")
			{
				var styleCss = '<style id="efor_setting_color_footer_background_gradient" type="text/css">' + 
								
									'.site-footer { background: linear-gradient(130deg, ' + api.instance('efor_setting_color_footer_bg').get() + ' 30%, ' + to + ' 100%); }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
			else
			{
				var styleCss = '<style id="efor_setting_color_footer_background_gradient" type="text/css">' + 
								
									'.site-footer { background: none; }' + 
									
									'.site-footer { background: ' + api.instance('efor_setting_color_footer_bg').get() + '; }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_footer_subscribe_bg', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .site .footer-subscribe { background: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_footer_subscribe_background_gradient', function(value)
	{
		value.bind(function(to)
		{
			$('#efor_setting_color_footer_subscribe_background_gradient').remove();
			
			if (to != "")
			{
				var styleCss = '<style id="efor_setting_color_footer_subscribe_background_gradient" type="text/css">' + 
								
									'.site .footer-subscribe { background: linear-gradient(130deg, ' + api.instance('efor_setting_color_footer_subscribe_bg').get() + ' 30%, ' + to + ' 100%); }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
			else
			{
				var styleCss = '<style id="efor_setting_color_footer_subscribe_background_gradient" type="text/css">' + 
								
									'.site .footer-subscribe { background: none; }' + 
									
									'.site .footer-subscribe { background: ' + api.instance('efor_setting_color_footer_subscribe_bg').get() + '; }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_copyright_bar_bg', function(value)
	{
		value.bind(function(to)
		{
			if (to != "")
			{
				var styleCss = '<style type="text/css"> .site-footer .site-info { background-color: ' + to + '; } </style>';
				
				$('body').append(styleCss);
			}
			else
			{
				var styleCss = '<style type="text/css"> .site-footer .site-info { background-color: transparent; } </style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_copyright_bar_text', function(value)
	{
		value.bind(function(to)
		{
			if (to != "")
			{
				var styleCss = '<style type="text/css"> .site-footer .site-info { color: ' + to + '; } </style>';
				
				$('body').append(styleCss);
			}
			else
			{
				var styleCss = '<style type="text/css"> .site-footer .site-info { color: inherit; } </style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_footer_text', function(value)
	{
		value.bind(function(to)
		{
			if (to != "")
			{
				var styleCss = '<style type="text/css"> .footer-widgets { color: ' + to + '; } </style>';
				
				$('body').append(styleCss);
			}
			else
			{
				var styleCss = '<style type="text/css"> .footer-widgets { color: inherit; } </style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_cat_link_bg_border', function(value)
	{
		value.bind(function(to)
		{
			if (to != "")
			{
				var styleCss = '<style type="text/css">' + 
								
									'.is-cat-link-regular .cat-links a, .is-cat-link-borders .cat-links a, .is-cat-link-border-bottom .cat-links a, .is-cat-link-borders-light .cat-links a { color: ' + to + '; }' +
									
									'.is-cat-link-borders .cat-links a, .is-cat-link-borders-light .cat-links a, .is-cat-link-border-bottom .cat-links a, .is-cat-link-ribbon .cat-links a:before, .is-cat-link-ribbon .cat-links a:after, .is-cat-link-ribbon-left .cat-links a:before, .is-cat-link-ribbon-right .cat-links a:after, .is-cat-link-ribbon.is-cat-link-ribbon-dark .cat-links a:before, .is-cat-link-ribbon.is-cat-link-ribbon-dark .cat-links a:after, .is-cat-link-ribbon-left.is-cat-link-ribbon-dark .cat-links a:before, .is-cat-link-ribbon-right.is-cat-link-ribbon-dark .cat-links a:after { border-color: ' + to + '; }' +
									
									'.is-cat-link-solid .cat-links a, .is-cat-link-solid-light .cat-links a, .is-cat-link-ribbon .cat-links a, .is-cat-link-ribbon-left .cat-links a, .is-cat-link-ribbon-right .cat-links a, .is-cat-link-ribbon.is-cat-link-ribbon-dark .cat-links a, .is-cat-link-ribbon-left.is-cat-link-ribbon-dark .cat-links a, .is-cat-link-ribbon-right.is-cat-link-ribbon-dark .cat-links a { background: ' + to + '; }' +
									
									'.is-cat-link-underline .cat-links a { box-shadow: inset 0 -7px 0 ' + to + '; }' +
								
								'</style>';
				
				$('body').append(styleCss);
			}
			else
			{
				var styleCss = '<style type="text/css">' + 
								
									'.is-cat-link-borders .site-content .cat-links a, .is-cat-link-borders-light .site-content .cat-links a, .is-cat-link-border-bottom .site-content .cat-links a { border-color: inherit; }' +
									
									'.is-cat-link-solid .site-content .cat-links a, .is-cat-link-solid-light .site-content .cat-links a { background: inherit; }' +
									
									'.is-cat-link-underline .site-content .cat-links a { box-shadow: inset 0 -7px 0 inherit; }' +
								
								'</style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_slider_meta_bg_border', function(value)
	{
		value.bind(function(to)
		{
			$('#efor_setting_color_slider_meta_bg_border').remove();
			
			if (to != "")
			{
				var styleCss = '<style id="efor_setting_color_slider_meta_bg_border" type="text/css">' + 
								
									'.main-slider-post.is-cat-link-regular .cat-links a, .main-slider-post.is-cat-link-border-bottom .cat-links a, .main-slider-post.is-cat-link-borders .cat-links a, .main-slider-post.is-cat-link-borders-light .cat-links a, .main-slider-post.is-cat-link-line-before .cat-links a, .main-slider-post.is-cat-link-dots-bottom .cat-links a:before { color: ' + to + '; }' +
									
									'.main-slider-post.is-cat-link-borders .cat-links a, .main-slider-post.is-cat-link-borders-light .cat-links a, .main-slider-post.is-cat-link-border-bottom .cat-links a, .main-slider-post.is-cat-link-line-before .cat-links a:before, .main-slider-post.is-cat-link-ribbon .cat-links a:before, .main-slider-post.is-cat-link-ribbon .cat-links a:after, .main-slider-post.is-cat-link-ribbon-left .cat-links a:before, .main-slider-post.is-cat-link-ribbon-right .cat-links a:after { border-color: ' + to + '; }' +
									
									'.main-slider-post.is-cat-link-solid .cat-links a, .main-slider-post.is-cat-link-solid-light .cat-links a, .main-slider-post.is-cat-link-ribbon .cat-links a, .main-slider-post.is-cat-link-ribbon-left .cat-links a, .main-slider-post.is-cat-link-ribbon-right .cat-links a { background: ' + to + '; }' +
									
									'.main-slider-post.is-cat-link-underline .cat-links a { box-shadow: inset 0 -7px 0 ' + to + '; }' +
								
								'</style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_widget_witle_bg_border', function(value)
	{
		value.bind(function(to)
		{
			$('#efor_setting_color_widget_witle_bg_border').remove();
			
			if (to != "")
			{
				var styleCss = '<style id="efor_setting_color_widget_witle_bg_border" type="text/css">' + 
								
									'.is-widget-ribbon .site-main .widget-title span, .is-widget-solid .site-main .widget-title span, .is-widget-solid-arrow .site-main .widget-title span, .is-widget-first-letter-solid .site-main .widget-title span:first-letter { background: ' + to + '; }' +
									
									'.is-widget-ribbon .site-main .widget-title span:before, .is-widget-ribbon .site-main .widget-title span:after, .is-widget-border .site-main .widget-title span, .is-widget-border-arrow .site-main .widget-title span, .is-widget-bottomline .site-main .widget-title:after, .is-widget-first-letter-border .site-main .widget-title span:first-letter, .is-widget-line-cut .site-main .widget-title span:before, .is-widget-line-cut .site-main .widget-title span:after, .is-widget-line-cut-center .site-main .widget-title span:before, .is-widget-line-cut-center .site-main .widget-title span:after { border-color: ' + to + '; }' +
									
									'.is-widget-border-arrow .site-main .widget-title span:before, .is-widget-solid-arrow .site-main .widget-title span:after { border-top-color: ' + to + '; }' +
									
									'.is-widget-underline .site-main .widget-title span { box-shadow: inset 0 -6px 0 ' + to + '; }' +
								
								'</style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_primary_button', function(value)
	{
		value.bind(function(to)
		{
			$('#efor_setting_color_primary_button').remove();
			
			if (to != "")
			{
				var styleCss = '<style id="efor_setting_color_primary_button" type="text/css">' + 
								
									'.button.is-primary { color: ' + to + '; }' + 
									
									'.button.is-primary.is-shadow, .button.is-primary.is-solid, .button.is-primary.is-solid-light, html .elementor-button, html .ekit-wid-con .elementskit-btn { background-color: ' + to + '; }' + 
									
									'.button.is-primary.is-shadow { box-shadow: 0px 18px 23px -6px ' + to + '; }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_primary_button_hover', function(value)
	{
		value.bind(function(to)
		{
			$('#efor_setting_color_primary_button_hover').remove();
			
			if (to != "")
			{
				var styleCss = '<style id="efor_setting_color_primary_button_hover" type="text/css">' + 
								
									'.button.is-primary:hover { color: ' + to + '; }' + 
									
									'.button.is-primary.is-shadow:hover, .button.is-primary.is-solid:hover, .button.is-primary.is-solid-light:hover, .button.is-primary.is-shift:after, .button.is-primary.is-circle:before, html .elementor-button:hover, html .ekit-wid-con .elementskit-btn:hover { background-color: ' + to + '; }' + 
									
									'.button.is-primary.is-shadow:hover { box-shadow: 0px 2px 10px -5px ' + to + '; }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_secondary_button', function(value)
	{
		value.bind(function(to)
		{
			$('#efor_setting_color_secondary_button').remove();
			
			if (to != "")
			{
				var styleCss = '<style id="efor_setting_color_secondary_button" type="text/css">' + 
								
									'.button.is-secondary { color: ' + to + '; }' + 
									
									'.button.is-secondary.is-shadow, .button.is-secondary.is-solid, .button.is-secondary.is-solid-light, .elementor-element.elementor-button-info .elementor-button { background-color: ' + to + '; }' + 
									
									'.button.is-secondary.is-shadow { box-shadow: 0px 18px 23px -6px ' + to + '; }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_secondary_button_hover', function(value)
	{
		value.bind(function(to)
		{
			$('#efor_setting_color_secondary_button_hover').remove();
			
			if (to != "")
			{
				var styleCss = '<style id="efor_setting_color_secondary_button_hover" type="text/css">' + 
								
									'.button.is-secondary:hover { color: ' + to + '; }' + 
									
									'.button.is-secondary.is-shadow:hover, .button.is-secondary.is-solid:hover, .button.is-secondary.is-solid-light:hover, .button.is-secondary.is-shift:after, .button.is-secondary.is-circle:before, .elementor-element.elementor-button-info .elementor-button:hover { background-color: ' + to + '; }' + 
									
									'.button.is-secondary.is-shadow:hover { box-shadow: 0px 2px 10px -5px ' + to + '; }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_intro_mask_color', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .intro:before { background: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_top_bar_background', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .top-bar, .top-bar select option { background-color: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_top_bar_background_gradient', function(value)
	{
		value.bind(function(to)
		{
			$('#efor_setting_color_top_bar_background_gradient').remove();
			
			if (to != "")
			{
				var styleCss = '<style id="efor_setting_color_top_bar_background_gradient" type="text/css">' + 
								
									'.top-bar { background: linear-gradient(90deg, ' + api.instance('efor_setting_color_top_bar_background').get() + ' 30%, ' + to + ' 100%); }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
			else
			{
				var styleCss = '<style id="efor_setting_color_top_bar_background_gradient" type="text/css">' + 
								
									'.top-bar { background: none; }' + 
									
									'.top-bar, .top-bar select option { background-color: ' + api.instance('efor_setting_color_top_bar_background').get() + '; }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_header_text_custom', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .site-header { color: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_header_border', function(value)
	{
		value.bind(function(to)
		{
			$('#efor_setting_color_header_border').remove();
			
			if (to != "")
			{
				var styleCss = '<style id="efor_setting_color_header_border" type="text/css">' + 
								
									'.header-wrap:after { color: ' + to + '; }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
			else
			{
				var styleCss = '<style id="efor_setting_color_header_border" type="text/css">' + 
								
									'.header-wrap:after { color: ' + api.instance('efor_setting_color_header_text_custom').get() + '; }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_header_border_gradient', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .header-wrap:after { background: linear-gradient(90deg, currentColor 30%, ' + to + ' 100%); } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_menu_border', function(value)
	{
		value.bind(function(to)
		{
			if (to != "")
			{
				var styleCss = '<style type="text/css">' + 
								
									'.is-menu-bar .menu-wrap:after { color: ' + to + '; }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
			else
			{
				var styleCss = '<style type="text/css">' + 
								
									'.is-menu-bar .menu-wrap:after { color: ' + api.instance('efor_setting_color_header_text_custom').get() + '; }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
		});
	});
	
	
	wp.customize('efor_setting_color_menu_border_gradient', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .is-menu-bar .menu-wrap:after { background: linear-gradient(90deg, currentColor 30%, ' + to + ' 100%); } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_logo_text', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> html .site-header .site-title a { color: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_logo_bg', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> html .site-header .site-title a { background: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_color_logo_bg_gradient', function(value)
	{
		value.bind(function(to)
		{
			$('#efor_setting_color_logo_bg_gradient').remove();
			
			if (to != "")
			{
				var styleCss = '<style id="efor_setting_color_logo_bg_gradient" type="text/css">' + 
								
									'html .site-header .site-title a { background: linear-gradient(140deg, ' + api.instance('efor_setting_color_logo_bg').get() + ' 0%, ' + to + ' 90%); }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
			else
			{
				var styleCss = '<style id="efor_setting_color_logo_bg_gradient" type="text/css">' + 
								
									'html .site-header .site-title a { background: none; }' + 
									
									'html .site-header .site-title a { background: ' + api.instance('efor_setting_color_logo_bg').get() + '; }' + 
								
								'</style>';
				
				$('body').append(styleCss);
			}
			
			
		});
	});


// ====================================================================================================================


 	wp.customize('efor_setting_custom_css', function(value)
	{
		value.bind(function(to)
		{
			$('#custom-css').remove();
			
			var styleCss = '<style id="custom-css" type="text/css">' + to + '</style>';
			
			$('body').append(styleCss);
		});
	});


// ====================================================================================================================


	var efor_header_mask_style   = "horizontal";
	var efor_header_mask_color_1 = "";
	var efor_header_mask_color_2 = "";
	
	// DOCUMENT READY
	$(function() {
	
		efor_header_mask_style   = wp.customize('efor_setting_header_mask_style').get();
		efor_header_mask_color_1 = wp.customize('efor_setting_color_header_mask_1').get();
		efor_header_mask_color_2 = wp.customize('efor_setting_color_header_mask_2').get();
	});
	// DOCUMENT READY
	
	
	function efor_header_mask_style_css()
	{
		$('#header-mask-style').remove();
		
		var styleCss = "";
		
		if ((efor_header_mask_style == 'solid') && (efor_header_mask_color_1 !=""))
		{
			styleCss = '<style id="header-mask-style" type="text/css"> .header-wrap:before { background: ' + efor_header_mask_color_1 + '; } </style>';
		}
		else if ((efor_header_mask_style == 'radial') && (efor_header_mask_color_1 !="") && (efor_header_mask_color_2 !=""))
		{
			styleCss = '<style id="header-mask-style" type="text/css"> .header-wrap:before { background: radial-gradient(circle, ' + efor_header_mask_color_1 + ', ' + efor_header_mask_color_2 + '); } </style>';
		}
		else if ((efor_header_mask_style == 'vertical') && (efor_header_mask_color_1 !="") && (efor_header_mask_color_2 !=""))
		{
			styleCss = '<style id="header-mask-style" type="text/css"> .header-wrap:before { background: linear-gradient(' + efor_header_mask_color_1 + ', ' + efor_header_mask_color_2 + '); } </style>';
		}
		else if ((efor_header_mask_style == 'horizontal') && (efor_header_mask_color_1 !="") && (efor_header_mask_color_2 !=""))
		{
			styleCss = '<style id="header-mask-style" type="text/css"> .header-wrap:before { background: linear-gradient(130deg, ' + efor_header_mask_color_1 + ' 30%, ' + efor_header_mask_color_2 + ' 100%); } </style>';
		}
		else
		{
			styleCss = '<style id="header-mask-style" type="text/css"> .header-wrap:before { background: none; } </style>';
		}
		
		if (styleCss != "")
		{
			$('body').append(styleCss);
		}
	}
	
	
 	wp.customize('efor_setting_header_mask_style', function(value)
	{
		value.bind(function(to)
		{
			efor_header_mask_style = to;
			efor_header_mask_style_css();
		});
	});
	
	
	wp.customize('efor_setting_color_header_mask_1', function(value)
	{
		value.bind(function(to)
		{
			efor_header_mask_color_1 = to;
			efor_header_mask_style_css();
		});
	});
	
	
	wp.customize('efor_setting_color_header_mask_2', function(value)
	{
		value.bind(function(to)
		{
			efor_header_mask_color_2 = to;
			efor_header_mask_style_css();
		});
	});


// ====================================================================================================================


	wp.customize('efor_setting_header_mask_opacity', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .header-wrap:before { opacity: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_header_half_transparent_bg_opacity', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .is-header-half-transparent:not(.is-menu-toggled-on) .site-header:not(.clone) .header-wrap:before { opacity: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});


	wp.customize('efor_setting_header_border_opacity', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .header-wrap:after { opacity: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_menu_border_opacity', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .is-menu-bar .menu-wrap:after { opacity: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});


// ====================================================================================================================


	wp.customize('efor_setting_body_top_bottom_margin', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .site { margin-top: ' + to + 'px; margin-bottom: ' + to + 'px; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_intro_top_bottom_padding', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> @media screen and (min-width: 992px) { .intro { padding: ' + to + 'px 0; } } </style>';
			
			$('body').append(styleCss);
		});
	});
	
	
	wp.customize('efor_setting_intro_mask_opacity', function(value)
	{
		value.bind(function(to)
		{
			var styleCss = '<style type="text/css"> .intro:before { opacity: ' + to + '; } </style>';
			
			$('body').append(styleCss);
		});
	});


// ====================================================================================================================


	wp.customize('efor_setting_post_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-single-post-title-default is-single-post-title-with-margins is-featured-image-full is-featured-image-full-with-margins is-featured-image-left is-featured-image-right').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_width', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-header-full-width is-header-fixed-width is-header-full-with-margins').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_padding', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-header-padding-left is-header-padding-right').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_text_color', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-header-light is-header-dark').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_menu_width', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-menu-fixed-width is-menu-fixed-bg is-menu-full').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_menu_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-menu-align-center is-menu-align-left is-menu-align-right').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_menu_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-menu-light is-menu-dark').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_sub_menu_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-submenu-light is-submenu-light-border is-submenu-dark').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_menu_text_transform', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-menu-none-uppercase is-menu-uppercase').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_sidebar_widget_text_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-sidebar-align-left is-sidebar-align-center').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_footer_subscribe_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-footer-subscribe-light is-footer-subscribe-dark').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_footer_widget_text_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-footer-widgets-align-left is-footer-widgets-align-center').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_sidebar_widget_title_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-widget-title-align-left is-widget-title-align-center').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_sidebar_widget_title_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-widget-minimal is-widget-ribbon is-widget-border is-widget-border-arrow is-widget-solid is-widget-solid-arrow is-widget-underline is-widget-bottomline is-widget-first-letter-border is-widget-first-letter-solid is-widget-line-cut is-widget-line-cut-center').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_sidebar_trending_posts_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-trending-posts-default is-trending-posts-rounded').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_main_slider_nav_position', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-slider-buttons-stick-to-edges is-slider-buttons-center-margin is-slider-buttons-overflow').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_main_slider_nav_shape', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-slider-buttons-sharp-edges is-slider-buttons-rounded').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_main_slider_nav_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-slider-buttons-dark is-slider-buttons-light is-slider-buttons-border is-slider-buttons-darker').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_main_slider_title_text_transform', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-slider-title-none-uppercase is-slider-title-uppercase').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_main_slider_title_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-slider-title-default is-slider-title-label is-slider-title-rotated is-slider-title-inline-borders is-slider-title-stamp is-slider-title-border-bottom is-slider-title-3d-shadow is-slider-title-3d-hard-shadow is-slider-title-dark-shadow is-slider-title-retro-shadow is-slider-title-retro-skew is-slider-title-comic-shadow is-slider-title-futurist-shadow is-slider-title-outline').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_author_info_box_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-about-author-minimal is-about-author-boxed is-about-author-boxed-dark is-about-author-border is-about-author-border-arrow').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_share_links_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-share-links-minimal is-share-links-boxed is-share-links-boxed-color is-share-links-border').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_tag_cloud_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-tagcloud-minimal is-tagcloud-solid').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_post_nav_image', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-nav-single-rounded is-nav-single-square').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_post_nav_animated', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-nav-single-no-animated is-nav-single-animated').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_comments_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-comments-minimal is-comments-boxed is-comments-boxed-solid is-comments-border is-comments-image-out').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_comment_image_shape', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-comments-image-rounded is-comments-image-soft-rounded is-comments-image-square').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_comment_form_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-comment-form-minimal is-comment-form-boxed is-comment-form-boxed-solid is-comment-form-border is-comment-form-border-arrow').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_body_layout', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-body-full-width is-body-boxed is-middle-boxed is-posts-boxed').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_intro_text_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-intro-align-center is-intro-align-left is-intro-align-right').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_intro_text_color', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-intro-text-dark is-intro-text-light').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_footer_layout', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-footer-full-width is-footer-boxed').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_post_page_title_text_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-post-title-align-center is-post-title-align-left is-post-title-align-right').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_blog_text_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-blog-text-align-center is-blog-text-align-left is-blog-text-align-right').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_meta_prefix_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-meta-with-none is-meta-with-icons is-meta-with-prefix').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_meta_cat_link_style', function(value)
	{
		value.bind(function(to)
		{
			$('.post-header, .blog-stream .hentry').removeClass('is-cat-link-link-style is-cat-link-regular is-cat-link-border-bottom is-cat-link-borders is-cat-link-rounded is-cat-link-borders-light is-cat-link-rounded is-cat-link-solid is-cat-link-rounded is-cat-link-solid-light is-cat-link-rounded is-cat-link-underline is-cat-link-line-before is-cat-link-ribbon is-cat-link-ribbon-left is-cat-link-ribbon-right is-cat-link-ribbon-dark is-cat-link-ribbon-dark is-cat-link-ribbon-dark').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_more_link_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-more-link-button-minimal is-more-link-button-style is-more-link-border-bottom is-more-link-border-bottom-light is-more-link-border-bottom-dotted').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_main_slider_meta_style', function(value)
	{
		value.bind(function(to)
		{
			$('.main-slider-post').removeClass('is-cat-link-default is-cat-link-borders is-cat-link-rounded is-cat-link-borders-light is-cat-link-solid is-cat-link-solid-light is-cat-link-ribbon is-cat-link-ribbon-left is-cat-link-ribbon-right is-cat-link-ribbon-dark is-cat-link-ribbon-dark is-cat-link-ribbon-dark is-cat-link-border-bottom is-cat-link-line-before is-cat-link-dots-bottom').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_main_slider_more_link_visibility', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-slider-more-link-show is-slider-more-link-show-on-hover is-slider-more-link-hidden').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_main_slider_more_link_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-slider-more-link-minimal is-slider-more-link-button-style is-slider-more-link-border-bottom').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_main_slider_text_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-slider-text-align-center is-slider-text-align-left is-slider-text-align-right').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_main_slider_vertical_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-slider-v-align-center is-slider-v-align-top is-slider-v-align-bottom').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_main_slider_horizontal_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-slider-h-align-center is-slider-h-align-left is-slider-h-align-right').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_link_box_title_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-link-box-title-default is-link-box-title-label is-link-box-title-rotated is-link-box-title-inline-borders is-link-box-title-border-bottom').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_link_box_text_transform', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-link-box-title-transform-none is-link-box-title-uppercase').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_link_box_text_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-link-box-text-align-center is-link-box-text-align-left is-link-box-text-align-right').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_link_box_vertical_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-link-box-v-align-center is-link-box-v-align-top is-link-box-v-align-bottom').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_sub_menu_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-submenu-align-center is-submenu-align-left is-submenu-align-right').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_related_posts_width', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-related-posts-fixed is-related-posts-overflow').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_post_media_width', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-post-media-fixed is-post-media-overflow').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_sidebar_position', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-sidebar-right is-sidebar-left').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_post_title_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-single-post-title-default is-single-post-title-with-margins').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_author_info_box_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-about-author-center').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_share_links_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-share-links-center').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_main_slider_dots_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-slider-dots-rounded-line-grow').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_text_transform_text_logo', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-site-title-uppercase').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_text_transform_tagline', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-tagline-uppercase').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_text_transform_meta', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-meta-uppercase').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_tagline_visibility', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-tagline-hidden').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_logo_container_width', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-logo-container-full').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_logo_behaviour', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-logo-stick-with-menu').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_logo_hover_effect', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-logo-hover-shine is-logo-hover-zoom is-logo-hover-zoom-rotate is-logo-hover-drop-shadow is-logo-hover-skew').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_top_bar_mobile_visibility', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-top-bar-mobile-left-visible is-top-bar-mobile-right-visible is-top-bar-mobile-hidden').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_top_bar_text_color', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-top-bar-light').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_top_bar_text_transform', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-top-bar-uppercase').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_top_bar_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-top-bar-transparent is-top-bar-shadow is-top-bar-shadow-inset is-top-bar-border-bottom is-top-bar-border-bottom-bold').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_top_bar_width', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-top-bar-full is-top-bar-fixed is-top-bar-fixed-bg').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_before_logo_area_visibility', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-site-branding-left-show is-site-branding-left-hide').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_after_logo_area_visibility', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-site-branding-right-show is-site-branding-right-hide').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_before_logo_area_items_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-site-branding-left-align-items-left is-site-branding-left-align-items-right').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_after_logo_area_items_align', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-site-branding-right-align-items-left is-site-branding-right-align-items-right').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_text_transform_buttons', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-buttons-lowercase').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_sub_menu_animation', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-sub-menu-ani-fade-in-left is-sub-menu-ani-fade-in-right is-sub-menu-ani-fade-in-up is-sub-menu-ani-fade-in-down is-sub-menu-ani-zoom-in is-sub-menu-ani-blur-in is-sub-menu-ani-blur-in-left is-sub-menu-ani-blur-in-right is-sub-menu-ani-blur-in-up is-sub-menu-ani-blur-in-down is-sub-menu-ani-slide-down is-sub-menu-ani-flip-in is-sub-menu-ani-flip-in-half is-sub-menu-ani-rotate-in is-sub-menu-ani-fly-in is-sub-menu-ani-tilt-in').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_menu_link_hover_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-menu-hover-underline is-menu-hover-underline-bold is-menu-hover-overline is-menu-hover-badge is-menu-hover-badge-horizontal is-menu-hover-badge-center is-menu-hover-badge-round is-menu-hover-solid is-menu-hover-solid-horizontal is-menu-hover-skew is-menu-hover-overflow is-menu-hover-arrow is-menu-hover-arrow-left is-menu-hover-arrow-right is-menu-hover-cut-left is-menu-hover-cut-right is-menu-hover-chat-box is-menu-hover-ribbon is-menu-hover-chevron is-menu-hover-paper-tear is-menu-hover-borders is-menu-hover-borders-bold is-menu-hover-borders-round is-menu-hover-border-top is-menu-hover-border-bottom is-menu-hover-marker is-menu-hover-marker-bold is-menu-hover-marker-horizontal').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_text_transform_copyright', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-copyright-uppercase').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_make_sticky_header_menu_width_always_full', function(value)
	{
		value.bind(function(to)
		{
			if (to == true)
			{
				$('html').removeClass('is-header-sticky-always-full').addClass(to);
			}
		});
	});
	
	
	wp.customize('efor_setting_logo_bg_stretch_left', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-logo-bg-stretch-left').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_shadow', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-header-shadow-soft is-header-shadow-soft-short is-header-shadow-soft-shorter is-header-shadow-soft-long is-header-shadow-offset is-header-shadow-sides is-header-shadow-layers is-header-shadow-inset').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_sticky_shadow', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-header-sticky-shadow-soft is-header-sticky-shadow-soft-short is-header-sticky-shadow-soft-shorter is-header-sticky-shadow-soft-long').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_inner_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-header-inline-borders is-header-inline-borders-light is-header-inline-borders-bold').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_transparent_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-header-transparent-border-bottom is-header-border-fixed is-header-transparent-border-all').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_header_bg_blur', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-header-bg-blur-slightly is-header-bg-blur-medium is-header-bg-blur-more is-header-bg-blur-intense').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_menu_shadow', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-menu-shadow-soft is-menu-shadow-soft-short is-menu-shadow-soft-shorter is-menu-shadow-soft-long is-menu-shadow-offset is-menu-shadow-sides is-menu-shadow-layers is-menu-shadow-inset').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_menu_sticky_shadow', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-menu-sticky-shadow-soft is-menu-sticky-shadow-soft-short is-menu-sticky-shadow-soft-shorter is-menu-sticky-shadow-soft-long').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_menu_links_borders', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-menu-inline-borders is-menu-inline-borders-top is-menu-inline-borders-bottom').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_menu_links_borders_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-menu-inline-borders-bold is-menu-inline-borders-light').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_footer_borders', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-footer-border-top is-footer-border-all').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_footer_border_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-footer-border-light is-footer-border-bold').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_copyright_border_style', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-copyright-border-top is-copyright-border-bold is-copyright-border-light').addClass(to);
		});
	});
	
	
	wp.customize('efor_setting_text_transform_icon_box_title', function(value)
	{
		value.bind(function(to)
		{
			$('html').removeClass('is-icon-box-title-uppercase').addClass(to);
		});
	});

})(jQuery);
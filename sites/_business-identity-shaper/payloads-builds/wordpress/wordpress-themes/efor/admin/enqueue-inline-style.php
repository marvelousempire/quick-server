<?php

	function efor_check_font_type($font)
	{
		$font_local = strpos($font, 'FONT_LOCAL_'); // Check for local font.
		
		if ($font_local !== false)
		{
			$local_font_name = substr($font, 11); // Remove: FONT_LOCAL_
			
			// This "if" only for Jost* font.
			if ($local_font_name == 'Jost')
			{
				$local_font_name = 'Jost*';
			}
			
			$font = "'" . $local_font_name . "', sans-serif";
		}
		else
		{
			// This is a Google font.
			$font = "'" . $font . "'";
		}
		
		return $font;
	}
	
	
	function efor_enqueue__inline_style()
	{
		$custom_css = "";
		
		
		// Font Family
		
		$efor_setting_font_text_logo = get_theme_mod('efor_setting_font_text_logo', 'Great Vibes');
		
		if (! empty($efor_setting_font_text_logo))
		{
			$efor_setting_font_text_logo = efor_check_font_type($efor_setting_font_text_logo);
			$custom_css .= ".site-title { font-family: {$efor_setting_font_text_logo}; }";
		}
		
		
		$efor_setting_font_menu = get_theme_mod('efor_setting_font_menu', 'FONT_LOCAL_Now');
		
		if (! empty($efor_setting_font_menu))
		{
			$efor_setting_font_menu = efor_check_font_type($efor_setting_font_menu);
			$custom_css .= PHP_EOL . PHP_EOL . ".nav-menu, .entry-meta, .owl-nav, label, .page-links, .navigation, .entry-title i, .site-info, .filters { font-family: {$efor_setting_font_menu}; }";
		}
		
		
		$efor_setting_font_widget_title = get_theme_mod('efor_setting_font_widget_title', 'FONT_LOCAL_Now');
		
		if (! empty($efor_setting_font_widget_title))
		{
			$efor_setting_font_widget_title = efor_check_font_type($efor_setting_font_widget_title);
			$custom_css .= PHP_EOL . PHP_EOL . ".widget-title { font-family: {$efor_setting_font_widget_title}; }";
		}
		
		
		$efor_setting_font_h1 = get_theme_mod('efor_setting_font_h1', 'FONT_LOCAL_Now');
		
		if (! empty($efor_setting_font_h1))
		{
			$efor_setting_font_h1 = efor_check_font_type($efor_setting_font_h1);
			$custom_css .= PHP_EOL . PHP_EOL . "h1, .entry-title, .footer-subscribe h3, .widget_categories ul li, .widget_recent_entries ul li a, .widget_pages ul li, .widget_nav_menu ul li, .widget_archive ul li, .widget_most_recommended_posts ul li a, .widget_calendar table caption, .tptn_title, .nav-single a, .widget_recent_comments ul li, .widget_product_categories ul li, .widget_meta ul li, .widget_rss ul a.rsswidget { font-family: {$efor_setting_font_h1}; }";
		}
		
		
		$efor_setting_font_h2_h6 = get_theme_mod('efor_setting_font_h2_h6', 'FONT_LOCAL_Now');
		
		if (! empty($efor_setting_font_h2_h6))
		{
			$efor_setting_font_h2_h6 = efor_check_font_type($efor_setting_font_h2_h6);
			$custom_css .= PHP_EOL . PHP_EOL . "h2, h3, h4, h5, h6, blockquote, .tab-titles { font-family: {$efor_setting_font_h2_h6}; }";
		}
		
		
		$efor_setting_font_slider_title = get_theme_mod('efor_setting_font_slider_title', 'FONT_LOCAL_Now');
		
		if (! empty($efor_setting_font_slider_title))
		{
			$efor_setting_font_slider_title = efor_check_font_type($efor_setting_font_slider_title);
			$custom_css .= PHP_EOL . PHP_EOL . ".slider-box .entry-title { font-family: {$efor_setting_font_slider_title}; }";
		}
		
		
		$efor_setting_font_body = get_theme_mod('efor_setting_font_body');
		
		if (! empty($efor_setting_font_body))
		{
			$efor_setting_font_body = efor_check_font_type($efor_setting_font_body);
			$custom_css .= PHP_EOL . PHP_EOL . "body { font-family: {$efor_setting_font_body}; }";
		}
		
		
		$efor_setting_intro_font = get_theme_mod('efor_setting_intro_font');
		
		if (! empty($efor_setting_intro_font))
		{
			$efor_setting_intro_font = efor_check_font_type($efor_setting_intro_font);
			$custom_css .= PHP_EOL . PHP_EOL . ".intro h1 { font-family: {$efor_setting_intro_font}; }";
		}
		
		
		$efor_setting_font_link_box_title = get_theme_mod('efor_setting_font_link_box_title', 'FONT_LOCAL_Now');
		
		if (! empty($efor_setting_font_link_box_title))
		{
			$efor_setting_font_link_box_title = efor_check_font_type($efor_setting_font_link_box_title);
			$custom_css .= PHP_EOL . PHP_EOL . ".link-box .entry-title { font-family: {$efor_setting_font_link_box_title}; }";
		}
		
		
		$efor_setting_font_buttons = get_theme_mod('efor_setting_font_buttons');
		
		if (! empty($efor_setting_font_buttons))
		{
			$efor_setting_font_buttons = efor_check_font_type($efor_setting_font_buttons);
			$custom_css .= PHP_EOL . PHP_EOL . ".button, button, html .elementor-button, html .ekit-wid-con .elementskit-btn, html .ekit-wid-con .ekit_creative_button, .more-link { font-family: {$efor_setting_font_buttons}; }";
		}
		
		
		$efor_setting_font_tagline = get_theme_mod('efor_setting_font_tagline');
		
		if (! empty($efor_setting_font_tagline))
		{
			$efor_setting_font_tagline = efor_check_font_type($efor_setting_font_tagline);
			$custom_css .= PHP_EOL . PHP_EOL . ".site-description { font-family: {$efor_setting_font_tagline}; }";
		}
		
		
		$efor_setting_font_top_bar = get_theme_mod('efor_setting_font_top_bar');
		
		if (! empty($efor_setting_font_top_bar))
		{
			$efor_setting_font_top_bar = efor_check_font_type($efor_setting_font_top_bar);
			$custom_css .= PHP_EOL . PHP_EOL . ".top-bar { font-family: {$efor_setting_font_top_bar}; }";
		}
		
		
		$efor_setting_font_icon_box_title = get_theme_mod('efor_setting_font_icon_box_title');
		
		if (! empty($efor_setting_font_icon_box_title))
		{
			$efor_setting_font_icon_box_title = efor_check_font_type($efor_setting_font_icon_box_title);
			$custom_css .= PHP_EOL . PHP_EOL . ".pw-icon-box h3 { font-family: {$efor_setting_font_icon_box_title}; }";
		}
		
		
		// Font Size
		
		$efor_setting_font_size_text_logo = get_theme_mod('efor_setting_font_size_text_logo', '26');
		
		if ($efor_setting_font_size_text_logo != '26')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .site-header .site-title { font-size: {$efor_setting_font_size_text_logo}px; } }";
		}
		
		
		$efor_setting_font_size_text_logo_sticky = get_theme_mod('efor_setting_font_size_text_logo_sticky', '28');
		
		if ($efor_setting_font_size_text_logo_sticky != '28')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .is-header-smaller .site-header.clone .site-title { font-size: {$efor_setting_font_size_text_logo_sticky}px; } }";
		}
		
		
		$efor_setting_font_size_text_logo_mobile = get_theme_mod('efor_setting_font_size_text_logo_mobile', '22');
		
		if ($efor_setting_font_size_text_logo_mobile != '22')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (max-width: 991px) { .site-header .site-title { font-size: {$efor_setting_font_size_text_logo_mobile}px; } }";
		}
		
		
		$efor_setting_font_size_tagline = get_theme_mod('efor_setting_font_size_tagline', '12');
		
		if ($efor_setting_font_size_tagline != '12')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .site-description { font-size: {$efor_setting_font_size_tagline}px; } }";
		}
		
		
		$efor_setting_font_size_blog_regular_post_title = get_theme_mod('efor_setting_font_size_blog_regular_post_title', '34');
		
		if ($efor_setting_font_size_blog_regular_post_title != '34')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .blog-regular .entry-title, .blog-stream.first-full .hentry:first-child .entry-title { font-size: {$efor_setting_font_size_blog_regular_post_title}px; } }";
		}
		
		
		$efor_setting_font_size_blog_grid_post_title = get_theme_mod('efor_setting_font_size_blog_grid_post_title', '22');
		
		if ($efor_setting_font_size_blog_grid_post_title != '22')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .blog-small .entry-title { font-size: {$efor_setting_font_size_blog_grid_post_title}px; } }";
		}
		
		
		$efor_setting_font_size_h1 = get_theme_mod('efor_setting_font_size_h1', '48');
		
		if ($efor_setting_font_size_h1 != '48')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { h1 { font-size: {$efor_setting_font_size_h1}px; } }";
		}
		
		
		$efor_setting_font_size_body = get_theme_mod('efor_setting_font_size_body', '16');
		
		if ($efor_setting_font_size_body != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { html { font-size: {$efor_setting_font_size_body}px; } }";
		}
		
		
		$efor_setting_font_size_body_mobile = get_theme_mod('efor_setting_font_size_body_mobile', '14');
		
		if ($efor_setting_font_size_body_mobile != '14')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (max-width: 991px) { html { font-size: {$efor_setting_font_size_body_mobile}px; } }";
		}
		
		
		$efor_setting_font_size_nav_menu = get_theme_mod('efor_setting_font_size_nav_menu', '11');
		
		if ($efor_setting_font_size_nav_menu != '11')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .nav-menu > ul { font-size: {$efor_setting_font_size_nav_menu}px; } }";
		}
		
		
		$efor_setting_font_size_excerpt = get_theme_mod('efor_setting_font_size_excerpt', '16');
		
		if ($efor_setting_font_size_excerpt != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .blog-stream .entry-content { font-size: {$efor_setting_font_size_excerpt}px; } }";
		}
		
		
		$efor_setting_font_size_blog_grid_excerpt = get_theme_mod('efor_setting_font_size_blog_grid_excerpt', '13');
		
		if ($efor_setting_font_size_blog_grid_excerpt != '13')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .blog-stream.blog-small .entry-content { font-size: {$efor_setting_font_size_blog_grid_excerpt}px; } }";
		}
		
		
		$efor_setting_font_size_sidebar = get_theme_mod('efor_setting_font_size_sidebar', '13');
		
		if ($efor_setting_font_size_sidebar != '13')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .sidebar { font-size: {$efor_setting_font_size_sidebar}px; } }";
		}
		
		
		$efor_setting_font_size_sidebar_widget_title = get_theme_mod('efor_setting_font_size_sidebar_widget_title', '13');
		
		if ($efor_setting_font_size_sidebar_widget_title != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".widget-title { font-size: {$efor_setting_font_size_sidebar_widget_title}px; }";
		}
		
		
		$efor_setting_font_size_nav_sub_menu = get_theme_mod('efor_setting_font_size_nav_sub_menu', '9');
		
		if ($efor_setting_font_size_nav_sub_menu != '9')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .nav-menu ul ul { font-size: {$efor_setting_font_size_nav_sub_menu}px; } }";
		}
		
		
		$efor_setting_intro_font_size = get_theme_mod('efor_setting_intro_font_size', '38');
		
		if ($efor_setting_intro_font_size != '38')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .intro h1 { font-size: {$efor_setting_intro_font_size}px; } }";
		}
		
		
		$efor_setting_font_size_meta = get_theme_mod('efor_setting_font_size_meta', '11');
		
		if ($efor_setting_font_size_meta != '11')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".entry-meta { font-size: {$efor_setting_font_size_meta}px; }";
		}
		
		
		$efor_setting_font_size_top_bar = get_theme_mod('efor_setting_font_size_top_bar', '11');
		
		if ($efor_setting_font_size_top_bar != '11')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".top-bar { font-size: {$efor_setting_font_size_top_bar}px; }";
		}
		
		
		$efor_setting_font_size_buttons = get_theme_mod('efor_setting_font_size_buttons', '12');
		
		if ($efor_setting_font_size_buttons != '12')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".button, button, html .elementor-button, .elementor-button.elementor-size-md, .elementor-button.elementor-size-xs, html .ekit-wid-con .elementskit-btn, html .ekit-wid-con .ekit_creative_button, .more-link { font-size: {$efor_setting_font_size_buttons}px; }";
		}
		
		
		$efor_setting_font_size_copyright = get_theme_mod('efor_setting_font_size_copyright', '11');
		
		if ($efor_setting_font_size_copyright != '11')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-footer .site-info { font-size: {$efor_setting_font_size_copyright}px; }";
		}
		
		
		$efor_setting_font_size_icon_box_title = get_theme_mod('efor_setting_font_size_icon_box_title', '15');
		
		if ($efor_setting_font_size_icon_box_title != '15')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".pw-icon-box h3 { font-size: {$efor_setting_font_size_icon_box_title}px; }";
		}
		
		
		// Font Weight
		
		$efor_setting_font_weight_text_logo = get_theme_mod('efor_setting_font_weight_text_logo', '400');
		
		if ($efor_setting_font_weight_text_logo != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-title { font-weight: {$efor_setting_font_weight_text_logo}; }";
		}
		
		
		$efor_setting_font_weight_h1 = get_theme_mod('efor_setting_font_weight_h1', '500');
		
		if ($efor_setting_font_weight_h1 != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "h1, .entry-title, .footer-subscribe h3 { font-weight: {$efor_setting_font_weight_h1}; }";
		}
		
		
		$efor_setting_font_weight_h2_h6 = get_theme_mod('efor_setting_font_weight_h2_h6', "");
		
		if ($efor_setting_font_weight_h2_h6 != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "h2, h3, h4, h5, h6, blockquote, .comment-meta .fn { font-weight: {$efor_setting_font_weight_h2_h6}; }";
		}
		
		
		$efor_setting_font_weight_slider_title = get_theme_mod('efor_setting_font_weight_slider_title', '700');
		
		if ($efor_setting_font_weight_slider_title != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".slider-box .entry-title { font-weight: {$efor_setting_font_weight_slider_title}; }";
		}
		
		
		$efor_setting_font_weight_sidebar_widget_title = get_theme_mod('efor_setting_font_weight_sidebar_widget_title', '700');
		
		if ($efor_setting_font_weight_sidebar_widget_title != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".widget-title { font-weight: {$efor_setting_font_weight_sidebar_widget_title}; }";
		}
		
		
		$efor_setting_font_weight_nav_menu = get_theme_mod('efor_setting_font_weight_nav_menu', '700');
		
		if ($efor_setting_font_weight_nav_menu != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .nav-menu > ul { font-weight: {$efor_setting_font_weight_nav_menu}; } }";
		}
		
		
		$efor_setting_font_weight_nav_sub_menu = get_theme_mod('efor_setting_font_weight_nav_sub_menu', '700');
		
		if ($efor_setting_font_weight_nav_sub_menu != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .nav-menu ul ul { font-weight: {$efor_setting_font_weight_nav_sub_menu}; } }";
		}
		
		
		$efor_setting_intro_font_weight = get_theme_mod('efor_setting_intro_font_weight', "");
		
		if ($efor_setting_intro_font_weight != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".intro h1 { font-weight: {$efor_setting_intro_font_weight}; }";
		}
		
		
		$efor_setting_font_weight_link_box_title = get_theme_mod('efor_setting_font_weight_link_box_title', '700');
		
		if ($efor_setting_font_weight_link_box_title != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".link-box .entry-title { font-weight: {$efor_setting_font_weight_link_box_title}; }";
		}
		
		
		$efor_setting_font_weight_buttons = get_theme_mod('efor_setting_font_weight_buttons', '500');
		
		if ($efor_setting_font_weight_buttons != '500')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".button, button, html .elementor-button, html .ekit-wid-con .elementskit-btn, html .ekit-wid-con .ekit_creative_button, .more-link { font-weight: {$efor_setting_font_weight_buttons}; }";
		}
		
		
		$efor_setting_font_weight_tagline = get_theme_mod('efor_setting_font_weight_tagline', "");
		
		if ($efor_setting_font_weight_tagline != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-description { font-weight: {$efor_setting_font_weight_tagline}; }";
		}
		
		
		$efor_setting_font_weight_top_bar = get_theme_mod('efor_setting_font_weight_top_bar', "");
		
		if ($efor_setting_font_weight_top_bar != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".top-bar { font-weight: {$efor_setting_font_weight_top_bar}; }";
		}
		
		
		$efor_setting_font_weight_copyright = get_theme_mod('efor_setting_font_weight_copyright', "");
		
		if ($efor_setting_font_weight_copyright != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-footer .site-info { font-weight: {$efor_setting_font_weight_copyright}; }";
		}
		
		
		$efor_setting_font_weight_icon_box_title = get_theme_mod('efor_setting_font_weight_icon_box_title', "");
		
		if ($efor_setting_font_weight_icon_box_title != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".pw-icon-box h3 { font-weight: {$efor_setting_font_weight_icon_box_title}; }";
		}
		
		
		$efor_setting_font_weight_meta = get_theme_mod('efor_setting_font_weight_meta', "");
		
		if ($efor_setting_font_weight_meta != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".entry-meta { font-weight: {$efor_setting_font_weight_meta}; }";
		}
		
		
		// Letter Spacing
		
		$efor_setting_letter_spacing_main_slider_title = get_theme_mod('efor_setting_letter_spacing_main_slider_title', '0');
		
		if ($efor_setting_letter_spacing_main_slider_title != '0')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .slider-box .entry-title { letter-spacing: {$efor_setting_letter_spacing_main_slider_title}px; } }";
		}
		
		
		$efor_setting_letter_spacing_nav_menu = get_theme_mod('efor_setting_letter_spacing_nav_menu', '1');
		
		if ($efor_setting_letter_spacing_nav_menu != '1')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .nav-menu > ul { letter-spacing: {$efor_setting_letter_spacing_nav_menu}px; } }";
		}
		
		
		$efor_setting_letter_spacing_nav_sub_menu = get_theme_mod('efor_setting_letter_spacing_nav_sub_menu', '0');
		
		if ($efor_setting_letter_spacing_nav_sub_menu != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .nav-menu ul ul { letter-spacing: {$efor_setting_letter_spacing_nav_sub_menu}px; } }";
		}
		
		
		$efor_setting_letter_spacing_sidebar_widget_title = get_theme_mod('efor_setting_letter_spacing_sidebar_widget_title', '3');
		
		if ($efor_setting_letter_spacing_sidebar_widget_title != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".widget-title { letter-spacing: {$efor_setting_letter_spacing_sidebar_widget_title}px; }";
		}
		
		
		$efor_setting_intro_letter_spacing = get_theme_mod('efor_setting_intro_letter_spacing', '0');
		
		if ($efor_setting_intro_letter_spacing != '0')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".intro h1 { letter-spacing: {$efor_setting_intro_letter_spacing}px; }";
		}
		
		
		$efor_setting_letter_spacing_link_box_title = get_theme_mod('efor_setting_letter_spacing_link_box_title', '0');
		
		if ($efor_setting_letter_spacing_link_box_title != '0')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .link-box .entry-title { letter-spacing: {$efor_setting_letter_spacing_link_box_title}px; } }";
		}
		
		
		$efor_setting_letter_spacing_tagline = get_theme_mod('efor_setting_letter_spacing_tagline', '0');
		
		if ($efor_setting_letter_spacing_tagline != '0')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .site-description { letter-spacing: {$efor_setting_letter_spacing_tagline}px; } }";
		}
		
		
		$efor_setting_letter_spacing_buttons = get_theme_mod('efor_setting_letter_spacing_buttons', '1');
		
		if ($efor_setting_letter_spacing_buttons != '1')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".button, button, html .elementor-button, html .ekit-wid-con .elementskit-btn, html .ekit-wid-con .ekit_creative_button, .more-link { letter-spacing: {$efor_setting_letter_spacing_buttons}px; }";
		}
		
		
		$efor_setting_letter_spacing_copyright = get_theme_mod('efor_setting_letter_spacing_copyright', '1');
		
		if ($efor_setting_letter_spacing_copyright != '1')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-footer .site-info { letter-spacing: {$efor_setting_letter_spacing_copyright}px; }";
		}
		
		
		$efor_setting_letter_spacing_icon_box_title = get_theme_mod('efor_setting_letter_spacing_icon_box_title', '0');
		
		if ($efor_setting_letter_spacing_icon_box_title != '0')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".pw-icon-box h3 { letter-spacing: {$efor_setting_letter_spacing_icon_box_title}px; }";
		}
		
		
		// Text Transform
		
		$efor_setting_intro_text_transform = get_theme_mod('efor_setting_intro_text_transform', "");
		
		if ($efor_setting_intro_text_transform != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".intro h1 { text-transform: {$efor_setting_intro_text_transform}; }";
		}
		
		
		$efor_setting_text_transform_h1 = get_theme_mod('efor_setting_text_transform_h1', "");
		
		if ($efor_setting_text_transform_h1 != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "h1, .entry-title, .footer-subscribe h3, .widget_categories ul li, .widget_recent_entries ul li, .widget_pages ul li, .widget_archive ul li, .widget_calendar table caption, .tptn_title, .nav-single a { text-transform: {$efor_setting_text_transform_h1}; }";
		}
		
		
		$efor_setting_text_transform_h2_h6 = get_theme_mod('efor_setting_text_transform_h2_h6', "");
		
		if ($efor_setting_text_transform_h2_h6 != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "h2, h3, h4, h5, h6, blockquote, .comment-meta .fn { text-transform: {$efor_setting_text_transform_h2_h6}; }";
		}
		
		
		// Line Height
		
		$efor_setting_body_line_height = get_theme_mod('efor_setting_body_line_height', '1.8');
		
		if ($efor_setting_body_line_height != '1.8')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { html { line-height: {$efor_setting_body_line_height}; } }";
		}
		
		
		$efor_setting_header_bg_shape_height = get_theme_mod('efor_setting_header_bg_shape_height', '30');
		
		if ($efor_setting_header_bg_shape_height != '30')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .header-bg-shape { height: {$efor_setting_header_bg_shape_height}px; } }";
		}
		
		
		$efor_setting_featured_area_top_padding = get_theme_mod('efor_setting_featured_area_top_padding', '0');
		
		if ($efor_setting_featured_area_top_padding != '0')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".featured-area { padding-top: {$efor_setting_featured_area_top_padding}px; }";
		}
		
		
		$efor_setting_featured_area_grid_spacing = get_theme_mod('efor_setting_featured_area_grid_spacing', '5');
		
		if ($efor_setting_featured_area_grid_spacing != '5')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 768px) {";
			
				$custom_css .= PHP_EOL . PHP_EOL . ".featured-area .block { padding: {$efor_setting_featured_area_grid_spacing}px; }";
				
				$custom_css .= PHP_EOL . PHP_EOL . ".featured-area { margin: -{$efor_setting_featured_area_grid_spacing}px; }";
				
			$custom_css .= PHP_EOL . PHP_EOL . "}";
		}
		
		
		$efor_setting_header_border_top_width = get_theme_mod('efor_setting_header_border_top_width', '0');
		
		if ($efor_setting_header_border_top_width != '0')
		{
			$efor_setting_header_border_top_width__after_top  = (-intval($efor_setting_header_border_top_width));
			$efor_setting_header_border_top_width__margin_top = $efor_setting_header_border_top_width;
			$efor_setting_header_border_top_width__int        = intval($efor_setting_header_border_top_width);
			
			if ($efor_setting_header_border_top_width__int <= 0)
			{
				$efor_setting_header_border_top_width__margin_top = '0';
			}
			
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap:after { top: {$efor_setting_header_border_top_width__after_top}px; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap { margin-top: {$efor_setting_header_border_top_width__margin_top}px; }";
		}
		
		
		$efor_setting_header_menu_border_top_width = get_theme_mod('efor_setting_header_menu_border_top_width', '0');
		
		if ($efor_setting_header_menu_border_top_width != '0')
		{
			$efor_setting_header_menu_border_top_width__after_top  = (-$efor_setting_header_menu_border_top_width);
			$efor_setting_header_menu_border_top_width__margin_top = $efor_setting_header_menu_border_top_width;
			$efor_setting_header_menu_border_top_width__int        = intval($efor_setting_header_menu_border_top_width);
			
			if ($efor_setting_header_menu_border_top_width__int <= 0)
			{
				$efor_setting_header_menu_border_top_width__margin_top = '0';
			}
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-menu-bar .menu-wrap:after { top: {$efor_setting_header_menu_border_top_width__after_top}px; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-menu-bar .menu-wrap { margin-top: {$efor_setting_header_menu_border_top_width__margin_top}px; }";
		}
		
		
		$efor_setting_header_border_bottom_width = get_theme_mod('efor_setting_header_border_bottom_width', '0');
		
		if ($efor_setting_header_border_bottom_width != '0')
		{
			$efor_setting_header_border_bottom_width__after_bottom  = (-$efor_setting_header_border_bottom_width);
			
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap:after { bottom: {$efor_setting_header_border_bottom_width__after_bottom}px; }";
		}
		
		
		$efor_setting_header_menu_border_bottom_width = get_theme_mod('efor_setting_header_menu_border_bottom_width', '0');
		
		if ($efor_setting_header_menu_border_bottom_width != '0')
		{
			$efor_setting_header_menu_border_bottom_width__after_bottom = (-$efor_setting_header_menu_border_bottom_width);
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-menu-bar .menu-wrap:after { bottom: {$efor_setting_header_menu_border_bottom_width__after_bottom}px; }";
		}
		
		
		$efor_setting_header_border_left_width = get_theme_mod('efor_setting_header_border_left_width', '0');
		
		if ($efor_setting_header_border_left_width != '0')
		{
			$efor_setting_header_border_left_width__after_left = (-intval($efor_setting_header_border_left_width));
			
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap:after { left: {$efor_setting_header_border_left_width__after_left}px; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .is-header-vertical-right .header-wrap:after { width: {$efor_setting_header_border_left_width}px; } }";
		}
		
		
		$efor_setting_header_menu_border_left_width = get_theme_mod('efor_setting_header_menu_border_left_width', '0');
		
		if ($efor_setting_header_menu_border_left_width != '0')
		{
			$efor_setting_header_menu_border_left_width__after_left = (-$efor_setting_header_menu_border_left_width);
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-menu-bar .menu-wrap:after { left: {$efor_setting_header_menu_border_left_width__after_left}px; }";
		}
		
		
		$efor_setting_header_border_right_width = get_theme_mod('efor_setting_header_border_right_width', '0');
		
		if ($efor_setting_header_border_right_width != '0')
		{
			$efor_setting_header_border_right_width__after_right = (-intval($efor_setting_header_border_right_width));
			
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap:after { right: {$efor_setting_header_border_right_width__after_right}px; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .is-header-vertical-left .header-wrap:after { width: {$efor_setting_header_border_right_width}px; } }";
		}
		
		
		$efor_setting_header_menu_border_right_width = get_theme_mod('efor_setting_header_menu_border_right_width', '0');
		
		if ($efor_setting_header_menu_border_right_width != '0')
		{
			$efor_setting_header_menu_border_right_width__after_right = (-intval($efor_setting_header_menu_border_right_width));
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-menu-bar .menu-wrap:after { right: {$efor_setting_header_menu_border_right_width__after_right}px; }";
		}
		
		
		$efor_setting_header_border_top_radius = get_theme_mod('efor_setting_header_border_top_radius', '0');
		
		if ($efor_setting_header_border_top_radius != '0')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap, .header-wrap:after, .header-wrap:before { border-top-left-radius: {$efor_setting_header_border_top_radius}px; border-top-right-radius: {$efor_setting_header_border_top_radius}px; }";
		}
		
		
		$efor_setting_header_menu_border_top_radius = get_theme_mod('efor_setting_header_menu_border_top_radius', '0');
		
		if ($efor_setting_header_menu_border_top_radius != '0')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".is-menu-bar .menu-wrap, .is-menu-bar .menu-wrap:after { border-top-left-radius: {$efor_setting_header_menu_border_top_radius}px; border-top-right-radius: {$efor_setting_header_menu_border_top_radius}px; }";
		}
		
		
		$efor_setting_header_border_bottom_radius = get_theme_mod('efor_setting_header_border_bottom_radius', '0');
		
		if ($efor_setting_header_border_bottom_radius != '0')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap, .header-wrap:after, .header-wrap:before { border-bottom-left-radius: {$efor_setting_header_border_bottom_radius}px; border-bottom-right-radius: {$efor_setting_header_border_bottom_radius}px; }";
		}
		
		
		$efor_setting_header_menu_border_bottom_radius = get_theme_mod('efor_setting_header_menu_border_bottom_radius', '0');
		
		if ($efor_setting_header_menu_border_bottom_radius != '0')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".is-menu-bar .menu-wrap, .is-menu-bar .menu-wrap:after { border-bottom-left-radius: {$efor_setting_header_menu_border_bottom_radius}px; border-bottom-right-radius: {$efor_setting_header_menu_border_bottom_radius}px; }";
		}
		
		
		$efor_setting_logo_height = get_theme_mod('efor_setting_logo_height', '36');
		
		if ($efor_setting_logo_height != '36')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .site-title img { max-height: {$efor_setting_logo_height}px; } }";
		}
		
		
		$efor_setting_logo_height_mobile = get_theme_mod('efor_setting_logo_height_mobile', '26');
		
		if ($efor_setting_logo_height_mobile != '26')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (max-width: 991px) { .site-title img { max-height: {$efor_setting_logo_height_mobile}px; } }";
		}
		
		
		$efor_setting_logo_height_sticky = get_theme_mod('efor_setting_logo_height_sticky', '30');
		
		if ($efor_setting_logo_height_sticky != '30')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .is-header-smaller .site-header.clone .site-title img { max-height: {$efor_setting_logo_height_sticky}px; } }";
		}
		
		
		$efor_setting_header_top_bar_height = get_theme_mod('efor_setting_header_top_bar_height', '35');
		
		if ($efor_setting_header_top_bar_height != '35')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".top-bar { line-height: {$efor_setting_header_top_bar_height}px; }";
		}
		
		
		$efor_setting_header_row_padding = get_theme_mod('efor_setting_header_row_padding', '12');
		
		if ($efor_setting_header_row_padding != '12')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .is-header-row .header-wrap-inner { padding: {$efor_setting_header_row_padding}px 0; } }";
		}
		
		
		$efor_setting_header_vertical_width = get_theme_mod('efor_setting_header_vertical_width', '260');
		
		if ($efor_setting_header_vertical_width != '260')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 1360px) {";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-header-vertical .site-header, .is-header-vertical .site-header .header-wrap { width: {$efor_setting_header_vertical_width}px; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-header-vertical-left .site { padding-left: {$efor_setting_header_vertical_width}px; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-header-vertical-right .site { padding-right: {$efor_setting_header_vertical_width}px; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . "}";
		}
		
		
		// Other
		
		$efor_setting_logo_margin = get_theme_mod('efor_setting_logo_margin', '50');
		
		if ($efor_setting_logo_margin != '50')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .site-branding-wrap { padding: {$efor_setting_logo_margin}px 0; } }";
		}
		
		
		$efor_setting_logo_margin_mobile = get_theme_mod('efor_setting_logo_margin_mobile', '14');
		
		if ($efor_setting_logo_margin_mobile != '14')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (max-width: 991px) { .site-branding-wrap { padding: {$efor_setting_logo_margin_mobile}px 0; } }";
		}
		
		
		$efor_setting_logo_padding = get_theme_mod('efor_setting_logo_padding', '0');
		
		if ($efor_setting_logo_padding != '0')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "html .site-header .site-title a { padding: {$efor_setting_logo_padding}px " . (2 * intval($efor_setting_logo_padding)) . "px; }";
		}
		
		
		$efor_setting_logo_border_radius = get_theme_mod('efor_setting_logo_border_radius', '0');
		
		if ($efor_setting_logo_border_radius != '0')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "html .site-header .site-title a { border-radius: {$efor_setting_logo_border_radius}px; }";
		}
		
		
		$efor_setting_intro_top_bottom_padding = get_theme_mod('efor_setting_intro_top_bottom_padding', "");
		
		if ($efor_setting_intro_top_bottom_padding != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .intro { padding: {$efor_setting_intro_top_bottom_padding}px 0; } }";
		}
		
		
		$efor_setting_body_top_bottom_margin = get_theme_mod('efor_setting_body_top_bottom_margin', "");
		
		if ($efor_setting_body_top_bottom_margin != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .site { margin-top: {$efor_setting_body_top_bottom_margin}px; margin-bottom: {$efor_setting_body_top_bottom_margin}px; } }";
		}
		
		
		$efor_setting_content_width = get_theme_mod('efor_setting_content_width', '1140');
		
		if ($efor_setting_content_width != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".layout-medium, .is-header-row .header-wrap-inner, .is-header-small .header-wrap-inner, .is-menu-bar.is-menu-fixed-bg .menu-wrap, .is-header-fixed-width .header-wrap, .is-header-fixed-width.is-menu-bar .site-navigation, .is-header-float-box:not(.is-header-float-box-menu) .site-header:not(.clone) .header-wrap, .is-header-float-box.is-menu-bar .site-header:not(.clone) .site-navigation:not(.clone), .is-body-boxed .site, .is-body-boxed .header-wrap, .is-body-boxed.is-menu-bar .site-navigation, .is-body-boxed:not(.is-menu-bar) .site-header, .is-middle-boxed .site-main, .intro-content, .is-footer-boxed .site-footer, .is-content-boxed .site-main .layout-fixed, .top-bar .top-bar-wrap, .is-top-bar-fixed .top-bar, .is-top-bar-fixed-bg .top-bar, .is-menu-bottom.is-menu-bottom-overflow .site-header:not(.clone) .site-navigation:not(.clone) .menu-wrap, .site-branding-wrap, .is-header-border-fixed .header-wrap:after, .is-header-border-fixed .menu-wrap:after, html .tutor-container, html .lp-content-area, html .learn-press-breadcrumb { max-width: {$efor_setting_content_width}px; margin-left: auto; margin-right: auto; }";
		}
		
		
		$efor_setting_page_post_content_width = get_theme_mod('efor_setting_page_post_content_width', '740');
		
		if ($efor_setting_page_post_content_width != '740')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".layout-fixed, .blog-list, .blog-regular, .is-content-boxed .single .site-content, .is-content-boxed .page .site-content { max-width: {$efor_setting_page_post_content_width}px; }";
		}
		
		
		$efor_setting_menu_height = get_theme_mod('efor_setting_menu_height', '64');
		
		if ($efor_setting_menu_height != '64')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) {";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-header-small .header-wrap, .is-menu-bar .nav-menu > ul > li, .is-header-vertical .nav-menu > ul > li { line-height: {$efor_setting_menu_height}px; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-header-small .site-branding { max-height: {$efor_setting_menu_height}px; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . "}";
		}
		
		
		$efor_setting_menu_sticky_height = get_theme_mod('efor_setting_menu_sticky_height', '64');
		
		if ($efor_setting_menu_sticky_height != '64')
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) {";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-header-small.is-header-smaller .site-header.clone .header-wrap, .is-header-row.is-header-smaller .site-header.clone .nav-menu > ul > li, .is-menu-bar.is-header-smaller .site-navigation.clone .nav-menu > ul > li, .is-menu-bar.is-header-smaller .site-header.clone .site-navigation .nav-menu > ul > li { line-height: {$efor_setting_menu_sticky_height}px; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-header-small.is-header-smaller .site-header.clone .site-branding { max-height: {$efor_setting_menu_sticky_height}px; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . "}";
		}
		
		
		$efor_setting_buttons__primary_button_border_radius = get_theme_mod('efor_setting_buttons__primary_button_border_radius', "");
		
		if ($efor_setting_buttons__primary_button_border_radius != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".button.is-primary, .button.is-primary:after, html .elementor-button, .elementor-button.elementor-size-xs, .elementor-button.elementor-size-sm, .elementor-button.elementor-size-md, .elementor-button.elementor-size-lg, .elementor-button.elementor-size-xl, html .ekit-wid-con .elementskit-btn, html .ekit-wid-con .ekit_creative_button { border-radius: {$efor_setting_buttons__primary_button_border_radius}px; }";
		}
		
		
		$efor_setting_buttons__secondary_button_border_radius = get_theme_mod('efor_setting_buttons__secondary_button_border_radius', "");
		
		if ($efor_setting_buttons__secondary_button_border_radius != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".button.is-secondary, .button.is-secondary:after, .elementor-element.elementor-button-info .elementor-button { border-radius: {$efor_setting_buttons__secondary_button_border_radius}px; }";
		}
		
		
		$efor_setting_header_sub_menu_animation_duration = get_theme_mod('efor_setting_header_sub_menu_animation_duration', "");
		
		if ($efor_setting_header_sub_menu_animation_duration != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".nav-menu ul ul { transition-duration: {$efor_setting_header_sub_menu_animation_duration}s; }";
		}
		
		
		$efor_setting_sidebar_width = get_theme_mod('efor_setting_sidebar_width', "");
		
		if ($efor_setting_sidebar_width != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) {";
			
				$custom_css .= PHP_EOL . PHP_EOL . ".with-sidebar { margin-right: -{$efor_setting_sidebar_width}px; }";
				
				$custom_css .= PHP_EOL . PHP_EOL . ".with-sidebar .site-content { margin-right: {$efor_setting_sidebar_width}px; }";
				
				$custom_css .= PHP_EOL . PHP_EOL . ".sidebar { width: {$efor_setting_sidebar_width}px; }";
				
				$custom_css .= PHP_EOL . PHP_EOL . ".is-sidebar-left .with-sidebar { margin-left: -{$efor_setting_sidebar_width}px; }";
				
				$custom_css .= PHP_EOL . PHP_EOL . ".is-sidebar-left .with-sidebar .site-content { margin-left: {$efor_setting_sidebar_width}px; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . "}";
		}
		
		
		// Color
		
		$efor_setting_color_link = get_theme_mod('efor_setting_color_link', "");
		
		if ($efor_setting_color_link != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "a { color: {$efor_setting_color_link}; }";
		}
		
		
		$efor_setting_color_link_hover = get_theme_mod('efor_setting_color_link_hover', "");
		
		if ($efor_setting_color_link_hover != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "a:hover { color: {$efor_setting_color_link_hover}; }";
		}
		
		
		$efor_setting_color_header_bg = get_theme_mod('efor_setting_color_header_bg', "");
		
		if ($efor_setting_color_header_bg != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-header .header-wrap { background-color: {$efor_setting_color_header_bg}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . "html:not(.is-menu-bottom) .site-header .header-bg-shape { color: {$efor_setting_color_header_bg}; }";
		}
		
		
		$efor_setting_color_header_background_gradient = get_theme_mod('efor_setting_color_header_background_gradient', "");
		
		if ($efor_setting_color_header_background_gradient != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-header .header-wrap { background: linear-gradient(90deg, {$efor_setting_color_header_bg} 30%, {$efor_setting_color_header_background_gradient} 100%); }";
		}
		
		
		$efor_setting_header_bg_img = get_theme_mod('efor_setting_header_bg_img', "");
		
		if ($efor_setting_header_bg_img != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-header .header-wrap { background-image: url({$efor_setting_header_bg_img}); }";
		}
		
		
		// start Header Mask Style
		$efor_setting_header_mask_style   = get_theme_mod('efor_setting_header_mask_style', 'horizontal');
		$efor_setting_color_header_mask_1 = get_theme_mod('efor_setting_color_header_mask_1', "");
		$efor_setting_color_header_mask_2 = get_theme_mod('efor_setting_color_header_mask_2', "");
		
		if (($efor_setting_header_mask_style == 'solid') && ($efor_setting_color_header_mask_1 != ""))
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap:before { background: {$efor_setting_color_header_mask_1}; }";
		}
		elseif (($efor_setting_header_mask_style == 'radial') && ($efor_setting_color_header_mask_1 != "") && ($efor_setting_color_header_mask_2 != ""))
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap:before { background: radial-gradient(circle, {$efor_setting_color_header_mask_1}, {$efor_setting_color_header_mask_2}); }";
		}
		elseif (($efor_setting_header_mask_style == 'vertical') && ($efor_setting_color_header_mask_1 != "") && ($efor_setting_color_header_mask_2 != ""))
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap:before { background: linear-gradient({$efor_setting_color_header_mask_1}, {$efor_setting_color_header_mask_2}); }";
		}
		elseif (($efor_setting_header_mask_style == 'horizontal') && ($efor_setting_color_header_mask_1 != "") && ($efor_setting_color_header_mask_2 != ""))
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap:before { background: linear-gradient(130deg, {$efor_setting_color_header_mask_1} 30%, {$efor_setting_color_header_mask_2} 100%); }";
		}
		// end Header Mask Style
		
		
		$efor_setting_header_mask_opacity = get_theme_mod('efor_setting_header_mask_opacity', "");
		
		if ($efor_setting_header_mask_opacity != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap:before { opacity: {$efor_setting_header_mask_opacity}; }";
		}
		
		
		$efor_setting_header_half_transparent_bg_opacity = get_theme_mod('efor_setting_header_half_transparent_bg_opacity', "");
		
		if ($efor_setting_header_half_transparent_bg_opacity != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".is-header-half-transparent:not(.is-menu-toggled-on) .site-header:not(.clone) .header-wrap:before { opacity: {$efor_setting_header_half_transparent_bg_opacity}; }";
		}
		
		
		$efor_setting_header_border_opacity = get_theme_mod('efor_setting_header_border_opacity', '1');
		
		if ($efor_setting_header_border_opacity != '1')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap:after { opacity: {$efor_setting_header_border_opacity}; }";
		}
		
		
		$efor_setting_menu_border_opacity = get_theme_mod('efor_setting_menu_border_opacity', '1');
		
		if ($efor_setting_menu_border_opacity != '1')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".is-menu-bar .menu-wrap:after { opacity: {$efor_setting_menu_border_opacity}; }";
		}
		
		
		$efor_setting_intro_mask_color = get_theme_mod('efor_setting_intro_mask_color', "");
		
		if ($efor_setting_intro_mask_color != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".intro:before { background: {$efor_setting_intro_mask_color}; }";
		}
		
		
		$efor_setting_intro_mask_opacity = get_theme_mod('efor_setting_intro_mask_opacity', "");
		
		if ($efor_setting_intro_mask_opacity != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".intro:before { opacity: {$efor_setting_intro_mask_opacity}; }";
		}
		
		
		$efor_setting_color_menu_bg = get_theme_mod('efor_setting_color_menu_bg', "");
		
		if ($efor_setting_color_menu_bg != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-header .menu-wrap { background-color: {$efor_setting_color_menu_bg}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . "html.is-menu-bottom .site-header .header-bg-shape { color: {$efor_setting_color_menu_bg}; }";
		}
		
		
		$efor_setting_color_menu_background_gradient = get_theme_mod('efor_setting_color_menu_background_gradient', "");
		
		if ($efor_setting_color_menu_background_gradient != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-header .menu-wrap { background: linear-gradient(90deg, {$efor_setting_color_menu_bg} 30%, {$efor_setting_color_menu_background_gradient} 100%); }";
		}
		
		
		$efor_setting_color_menu_active_link_text = get_theme_mod('efor_setting_color_menu_active_link_text', "");
		
		if ($efor_setting_color_menu_active_link_text != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .nav-menu > ul > li.current-menu-item > a { color: {$efor_setting_color_menu_active_link_text} !important; } }";
		}
		
		
		$efor_setting_color_menu_active_link_bg_border = get_theme_mod('efor_setting_color_menu_active_link_bg_border', "");
		
		if ($efor_setting_color_menu_active_link_bg_border != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .nav-menu li.current-menu-item > a .link-text:before { background-color: {$efor_setting_color_menu_active_link_bg_border} !important; border-color: {$efor_setting_color_menu_active_link_bg_border} !important; } }";
		}
		
		
		$efor_setting_color_menu_link_hover_text = get_theme_mod('efor_setting_color_menu_link_hover_text', "");
		
		if ($efor_setting_color_menu_link_hover_text != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { html .nav-menu > ul > li > a:hover, .nav-menu > ul > li.has-submenu:hover > a { color: {$efor_setting_color_menu_link_hover_text}; } }";
		}
		
		
		$efor_setting_color_menu_link_hover_bg_border = get_theme_mod('efor_setting_color_menu_link_hover_bg_border', "");
		
		if ($efor_setting_color_menu_link_hover_bg_border != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { html.loaded .nav-menu ul li a .link-text:before, .nav-menu li.has-submenu:hover > a .link-text:before { background-color: {$efor_setting_color_menu_link_hover_bg_border}; border-color: {$efor_setting_color_menu_link_hover_bg_border}; } }";
		}
		
		
		$efor_setting_color_sub_menu_active_link_text = get_theme_mod('efor_setting_color_sub_menu_active_link_text', '#b79f8a');
		
		if ($efor_setting_color_sub_menu_active_link_text != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { .nav-menu  ul ul li.current-menu-item > a .link-text { color: {$efor_setting_color_sub_menu_active_link_text} !important; } }";
		}
		
		
		$efor_setting_color_sub_menu_link_hover_text = get_theme_mod('efor_setting_color_sub_menu_link_hover_text', '#111111');
		
		if ($efor_setting_color_sub_menu_link_hover_text != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "@media screen and (min-width: 992px) { html .nav-menu ul ul li a:hover .link-text, .nav-menu ul ul li.has-submenu:hover > a .link-text { color: {$efor_setting_color_sub_menu_link_hover_text}; } }";
		}
		
		
		$efor_setting_color_headings_text = get_theme_mod('efor_setting_color_headings_text', "");
		
		if ($efor_setting_color_headings_text != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "h1, h2, h3, h4, h5, h6, blockquote, .tab-titles { color: {$efor_setting_color_headings_text}; }";
		}
		
		
		$efor_setting_color_body_text = get_theme_mod('efor_setting_color_body_text', "");
		
		if ($efor_setting_color_body_text != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "body { color: {$efor_setting_color_body_text}; }";
		}
		
		
		$efor_setting_color_body_bg = get_theme_mod('efor_setting_color_body_bg', "");
		
		if ($efor_setting_color_body_bg != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "body { background: {$efor_setting_color_body_bg}; }";
		}
		
		
		$efor_setting_color_footer_bg = get_theme_mod('efor_setting_color_footer_bg', "");
		
		if ($efor_setting_color_footer_bg != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-footer { background: {$efor_setting_color_footer_bg}; }";
		}
		
		
		$efor_setting_color_footer_background_gradient = get_theme_mod('efor_setting_color_footer_background_gradient', "");
		
		if ($efor_setting_color_footer_background_gradient != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-footer { background: linear-gradient(130deg, {$efor_setting_color_footer_bg} 30%, {$efor_setting_color_footer_background_gradient} 100%); }";
		}
		
		
		$efor_setting_color_footer_subscribe_bg = get_theme_mod('efor_setting_color_footer_subscribe_bg', '#ffffff');
		
		if ($efor_setting_color_footer_subscribe_bg != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site .footer-subscribe { background: {$efor_setting_color_footer_subscribe_bg}; }";
		}
		
		
		$efor_setting_color_footer_subscribe_background_gradient = get_theme_mod('efor_setting_color_footer_subscribe_background_gradient', "");
		
		if ($efor_setting_color_footer_subscribe_background_gradient != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site .footer-subscribe { background: linear-gradient(130deg, {$efor_setting_color_footer_subscribe_bg} 30%, {$efor_setting_color_footer_subscribe_background_gradient} 100%); }";
		}
		
		
		$efor_setting_color_copyright_bar_bg = get_theme_mod('efor_setting_color_copyright_bar_bg', "");
		
		if ($efor_setting_color_copyright_bar_bg != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-footer .site-info { background-color: {$efor_setting_color_copyright_bar_bg}; }";
		}
		
		
		$efor_setting_color_copyright_bar_text = get_theme_mod('efor_setting_color_copyright_bar_text', "");
		
		if ($efor_setting_color_copyright_bar_text != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-footer .site-info { color: {$efor_setting_color_copyright_bar_text}; }";
		}
		
		
		$efor_setting_color_footer_text = get_theme_mod('efor_setting_color_footer_text', "");
		
		if ($efor_setting_color_footer_text != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".footer-widgets { color: {$efor_setting_color_footer_text}; }";
		}
		
		
		$efor_setting_color_cat_link_bg_border = get_theme_mod('efor_setting_color_cat_link_bg_border', "");
		
		if ($efor_setting_color_cat_link_bg_border != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".is-cat-link-regular .cat-links a, .is-cat-link-borders .cat-links a, .is-cat-link-border-bottom .cat-links a, .is-cat-link-borders-light .cat-links a { color: {$efor_setting_color_cat_link_bg_border}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-cat-link-borders .cat-links a, .is-cat-link-borders-light .cat-links a, .is-cat-link-border-bottom .cat-links a, .is-cat-link-ribbon .cat-links a:before, .is-cat-link-ribbon .cat-links a:after, .is-cat-link-ribbon-left .cat-links a:before, .is-cat-link-ribbon-right .cat-links a:after, .is-cat-link-ribbon.is-cat-link-ribbon-dark .cat-links a:before, .is-cat-link-ribbon.is-cat-link-ribbon-dark .cat-links a:after, .is-cat-link-ribbon-left.is-cat-link-ribbon-dark .cat-links a:before, .is-cat-link-ribbon-right.is-cat-link-ribbon-dark .cat-links a:after { border-color: {$efor_setting_color_cat_link_bg_border}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-cat-link-solid .cat-links a, .is-cat-link-solid-light .cat-links a, .is-cat-link-ribbon .cat-links a, .is-cat-link-ribbon-left .cat-links a, .is-cat-link-ribbon-right .cat-links a, .is-cat-link-ribbon.is-cat-link-ribbon-dark .cat-links a, .is-cat-link-ribbon-left.is-cat-link-ribbon-dark .cat-links a, .is-cat-link-ribbon-right.is-cat-link-ribbon-dark .cat-links a { background: {$efor_setting_color_cat_link_bg_border}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-cat-link-underline .cat-links a { box-shadow: inset 0 -7px 0 {$efor_setting_color_cat_link_bg_border}; }";
		}
		
		
		$efor_setting_color_slider_meta_bg_border = get_theme_mod('efor_setting_color_slider_meta_bg_border', "");
		
		if ($efor_setting_color_slider_meta_bg_border != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".main-slider-post.is-cat-link-regular .cat-links a, .main-slider-post.is-cat-link-border-bottom .cat-links a, .main-slider-post.is-cat-link-borders .cat-links a, .main-slider-post.is-cat-link-borders-light .cat-links a, .main-slider-post.is-cat-link-line-before .cat-links a, .main-slider-post.is-cat-link-dots-bottom .cat-links a:before { color: {$efor_setting_color_slider_meta_bg_border}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".main-slider-post.is-cat-link-borders .cat-links a, .main-slider-post.is-cat-link-borders-light .cat-links a, .main-slider-post.is-cat-link-border-bottom .cat-links a, .main-slider-post.is-cat-link-line-before .cat-links a:before, .main-slider-post.is-cat-link-ribbon .cat-links a:before, .main-slider-post.is-cat-link-ribbon .cat-links a:after, .main-slider-post.is-cat-link-ribbon-left .cat-links a:before, .main-slider-post.is-cat-link-ribbon-right .cat-links a:after { border-color: {$efor_setting_color_slider_meta_bg_border}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".main-slider-post.is-cat-link-solid .cat-links a, .main-slider-post.is-cat-link-solid-light .cat-links a, .main-slider-post.is-cat-link-ribbon .cat-links a, .main-slider-post.is-cat-link-ribbon-left .cat-links a, .main-slider-post.is-cat-link-ribbon-right .cat-links a { background: {$efor_setting_color_slider_meta_bg_border}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".main-slider-post.is-cat-link-underline .cat-links a { box-shadow: inset 0 -7px 0 {$efor_setting_color_slider_meta_bg_border}; }";
		}
		
		
		$efor_setting_color_widget_witle_bg_border = get_theme_mod('efor_setting_color_widget_witle_bg_border', "");
		
		if ($efor_setting_color_widget_witle_bg_border != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".is-widget-ribbon .site-main .widget-title span, .is-widget-solid .site-main .widget-title span, .is-widget-solid-arrow .site-main .widget-title span, .is-widget-first-letter-solid .site-main .widget-title span:first-letter { background: {$efor_setting_color_widget_witle_bg_border}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-widget-ribbon .site-main .widget-title span:before, .is-widget-ribbon .site-main .widget-title span:after, .is-widget-border .site-main .widget-title span, .is-widget-border-arrow .site-main .widget-title span, .is-widget-bottomline .site-main .widget-title:after, .is-widget-first-letter-border .site-main .widget-title span:first-letter, .is-widget-line-cut .site-main .widget-title span:before, .is-widget-line-cut .site-main .widget-title span:after, .is-widget-line-cut-center .site-main .widget-title span:before, .is-widget-line-cut-center .site-main .widget-title span:after { border-color: {$efor_setting_color_widget_witle_bg_border}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-widget-border-arrow .site-main .widget-title span:before, .is-widget-solid-arrow .site-main .widget-title span:after { border-top-color: {$efor_setting_color_widget_witle_bg_border}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".is-widget-underline .site-main .widget-title span { box-shadow: inset 0 -6px 0 {$efor_setting_color_widget_witle_bg_border}; }";
		}
		
		
		$efor_setting_color_primary_button = get_theme_mod('efor_setting_color_primary_button', "");
		
		if ($efor_setting_color_primary_button != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".button.is-primary { color: {$efor_setting_color_primary_button}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".button.is-primary.is-shadow, .button.is-primary.is-solid, .button.is-primary.is-solid-light, html .elementor-button, html .ekit-wid-con .elementskit-btn { background-color: {$efor_setting_color_primary_button}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".button.is-primary.is-shadow { box-shadow: 0px 18px 23px -6px {$efor_setting_color_primary_button}; }";
		}
		
		
		$efor_setting_color_primary_button_hover = get_theme_mod('efor_setting_color_primary_button_hover', "");
		
		if ($efor_setting_color_primary_button_hover != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".button.is-primary:hover { color: {$efor_setting_color_primary_button_hover}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".button.is-primary.is-shadow:hover, .button.is-primary.is-solid:hover, .button.is-primary.is-solid-light:hover, .button.is-primary.is-shift:after, .button.is-primary.is-circle:before, html .elementor-button:hover, html .ekit-wid-con .elementskit-btn:hover { background-color: {$efor_setting_color_primary_button_hover}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".button.is-primary.is-shadow:hover { box-shadow: 0px 2px 10px -5px {$efor_setting_color_primary_button_hover}; }";
		}
		
		
		$efor_setting_color_secondary_button = get_theme_mod('efor_setting_color_secondary_button', "");
		
		if ($efor_setting_color_secondary_button != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".button.is-secondary { color: {$efor_setting_color_secondary_button}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".button.is-secondary.is-shadow, .button.is-secondary.is-solid, .button.is-secondary.is-solid-light, .elementor-element.elementor-button-info .elementor-button { background-color: {$efor_setting_color_secondary_button}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".button.is-secondary.is-shadow { box-shadow: 0px 18px 23px -6px {$efor_setting_color_secondary_button}; }";
		}
		
		
		$efor_setting_color_secondary_button_hover = get_theme_mod('efor_setting_color_secondary_button_hover', "");
		
		if ($efor_setting_color_secondary_button_hover != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".button.is-secondary:hover { color: {$efor_setting_color_secondary_button_hover}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".button.is-secondary.is-shadow:hover, .button.is-secondary.is-solid:hover, .button.is-secondary.is-solid-light:hover, .button.is-secondary.is-shift:after, .button.is-secondary.is-circle:before, .elementor-element.elementor-button-info .elementor-button:hover { background-color: {$efor_setting_color_secondary_button_hover}; }";
			
			$custom_css .= PHP_EOL . PHP_EOL . ".button.is-secondary.is-shadow:hover { box-shadow: 0px 2px 10px -5px {$efor_setting_color_secondary_button_hover}; }";
		}
		
		
		$efor_setting_color_top_bar_background = get_theme_mod('efor_setting_color_top_bar_background', '#171717');
		
		if ($efor_setting_color_top_bar_background != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".top-bar, .top-bar select option { background-color: {$efor_setting_color_top_bar_background}; }";
		}
		
		
		$efor_setting_color_top_bar_background_gradient = get_theme_mod('efor_setting_color_top_bar_background_gradient', "");
		
		if ($efor_setting_color_top_bar_background_gradient != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".top-bar { background: linear-gradient(90deg, {$efor_setting_color_top_bar_background} 30%, {$efor_setting_color_top_bar_background_gradient} 100%); }";
		}
		
		
		$efor_setting_color_header_text_custom = get_theme_mod('efor_setting_color_header_text_custom', '#222222');
		
		if ($efor_setting_color_header_text_custom != '#222222')
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".site-header { color: {$efor_setting_color_header_text_custom}; }";
		}
		
		
		$efor_setting_color_header_border = get_theme_mod('efor_setting_color_header_border', "");
		
		if ($efor_setting_color_header_border != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap:after { color: {$efor_setting_color_header_border}; }";
		}
		else
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap:after { color: {$efor_setting_color_header_text_custom}; }";
		}
		
		
		$efor_setting_color_header_border_gradient = get_theme_mod('efor_setting_color_header_border_gradient', "");
		
		if ($efor_setting_color_header_border_gradient != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".header-wrap:after { background: linear-gradient(90deg, currentColor 30%, {$efor_setting_color_header_border_gradient} 100%); }";
		}
		
		
		$efor_setting_color_menu_border = get_theme_mod('efor_setting_color_menu_border', "");
		
		if ($efor_setting_color_menu_border != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".is-menu-bar .menu-wrap:after { color: {$efor_setting_color_menu_border}; }";
		}
		else
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".is-menu-bar .menu-wrap:after { color: {$efor_setting_color_header_text_custom}; }";
		}
		
		
		$efor_setting_color_menu_border_gradient = get_theme_mod('efor_setting_color_menu_border_gradient', "");
		
		if ($efor_setting_color_menu_border_gradient != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . ".is-menu-bar .menu-wrap:after { background: linear-gradient(90deg, currentColor 30%, {$efor_setting_color_menu_border_gradient} 100%); }";
		}
		
		
		$efor_setting_color_logo_text = get_theme_mod('efor_setting_color_logo_text', "");
		
		if ($efor_setting_color_logo_text != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "html .site-header .site-title a { color: {$efor_setting_color_logo_text}; }";
		}
		
		
		$efor_setting_color_logo_bg = get_theme_mod('efor_setting_color_logo_bg', "");
		
		if ($efor_setting_color_logo_bg != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "html .site-header .site-title a { background: {$efor_setting_color_logo_bg}; }";
		}
		
		
		$efor_setting_color_logo_bg_gradient = get_theme_mod('efor_setting_color_logo_bg_gradient', "");
		
		if ($efor_setting_color_logo_bg_gradient != "")
		{
			$custom_css .= PHP_EOL . PHP_EOL . "html .site-header .site-title a { background: linear-gradient(140deg, {$efor_setting_color_logo_bg} 0%, {$efor_setting_color_logo_bg_gradient} 90%); }";
		}
		
		
		$custom_css = trim($custom_css);
		wp_add_inline_style('efor-style', $custom_css);
	}
	
	function efor_after_setup_theme__inline_style()
	{
		add_action('wp_enqueue_scripts', 'efor_enqueue__inline_style');
	}
	
	add_action('after_setup_theme', 'efor_after_setup_theme__inline_style');

?>
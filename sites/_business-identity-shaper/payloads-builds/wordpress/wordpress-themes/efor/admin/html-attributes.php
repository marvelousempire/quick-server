<?php

	function efor_html_class()
	{
		$html_class = "";
		
		if ((is_home() && is_active_sidebar('efor_sidebar_13')) || (is_page_template('page_template-latest_posts.php') && is_active_sidebar('efor_sidebar_14')))
		{
			$html_class .= 'is-featured-area-on' . ' ';
		}
		else
		{
			$html_class .= 'no-featured-area' . ' ';
		}
		
		
		$html_class .= get_theme_mod('efor_setting_header_layout', 'is-menu-bottom is-menu-bar') . ' ';
		
		if (isset($_GET['header_layout']))
		{
			if ($_GET['header_layout'] == 'small')
			{
				$html_class .= 'is-header-small' . ' ';
			}
			elseif ($_GET['header_layout'] == 'small_logo_center')
			{
				$html_class .= 'is-header-small is-header-logo-center' . ' ';
			}
			elseif ($_GET['header_layout'] == 'one_row')
			{
				$html_class .= 'is-header-row' . ' ';
			}
			elseif ($_GET['header_layout'] == 'menu_bottom')
			{
				$html_class .= 'is-menu-bottom is-menu-bar' . ' ';
			}
			elseif ($_GET['header_layout'] == 'menu_bottom_overflow')
			{
				$html_class .= 'is-menu-bottom is-menu-bar is-menu-bottom-overflow' . ' ';
			}
			else
			{
				$html_class .= 'is-menu-top is-menu-bar' . ' ';
			}
		}
		
		
		$html_class .= get_theme_mod('efor_setting_body_layout', 'is-body-full-width') . ' ';
		$html_class .= get_theme_mod('efor_setting_post_title_style', 'is-single-post-title-default') . ' ';
		$html_class .= get_theme_mod('efor_setting_post_page_title_text_align', 'is-post-title-align-center') . ' ';
		$html_class .= get_theme_mod('efor_setting_post_media_width', 'is-post-media-fixed') . ' ';
		$html_class .= get_theme_mod('efor_setting_blog_text_align', 'is-blog-text-align-left') . ' ';
		$html_class .= get_theme_mod('efor_setting_meta_prefix_style', 'is-meta-with-icons') . ' ';
		$html_class .= get_theme_mod('efor_setting_header_text_color', 'is-header-light') . ' ';
		$html_class .= get_theme_mod('efor_setting_header_width', 'is-header-full-width') . ' ';
		$html_class .= get_theme_mod('efor_setting_header_parallax_effect', 'is-header-parallax-no') . ' ';
		$html_class .= get_theme_mod('efor_setting_menu_behaviour', 'is-menu-sticky') . ' ';
		$html_class .= get_theme_mod('efor_setting_menu_width', 'is-menu-fixed-width') . ' ';
		$html_class .= get_theme_mod('efor_setting_header_menu_align', 'is-menu-align-center') . ' ';
		$html_class .= get_theme_mod('efor_setting_header_menu_style', 'is-menu-light') . ' ';
		$html_class .= get_theme_mod('efor_setting_header_sub_menu_style', 'is-submenu-dark') . ' ';
		$html_class .= get_theme_mod('efor_setting_header_sub_menu_align', 'is-submenu-align-left') . ' ';
		$html_class .= get_theme_mod('efor_setting_header_menu_text_transform', 'is-menu-uppercase') . ' ';
		$html_class .= get_theme_mod('efor_setting_feat_area_width', 'is-featured-area-fixed') . ' ';
		$html_class .= get_theme_mod('efor_setting_main_slider_nav_position', 'is-slider-buttons-center-margin') . ' ';
		$html_class .= get_theme_mod('efor_setting_main_slider_nav_shape', 'is-slider-buttons-rounded') . ' ';
		$html_class .= get_theme_mod('efor_setting_main_slider_nav_style', 'is-slider-buttons-dark') . ' ';
		$html_class .= get_theme_mod('efor_setting_main_slider_title_style', 'is-slider-title-default') . ' ';
		$html_class .= get_theme_mod('efor_setting_main_slider_parallax_effect', 'is-slider-parallax') . ' ';
		$html_class .= get_theme_mod('efor_setting_main_slider_title_text_transform', 'is-slider-title-none-uppercase') . ' ';
		$html_class .= get_theme_mod('efor_setting_main_slider_more_link_visibility', 'is-slider-more-link-show') . ' ';
		$html_class .= get_theme_mod('efor_setting_main_slider_more_link_style', 'is-slider-more-link-button-style') . ' ';
		$html_class .= get_theme_mod('efor_setting_main_slider_text_align', 'is-slider-text-align-center') . ' ';
		$html_class .= get_theme_mod('efor_setting_main_slider_vertical_align', 'is-slider-v-align-center') . ' ';
		$html_class .= get_theme_mod('efor_setting_main_slider_horizontal_align', 'is-slider-h-align-center') . ' ';
		$html_class .= get_theme_mod('efor_setting_link_box_title_style', 'is-link-box-title-default') . ' ';
		$html_class .= get_theme_mod('efor_setting_link_box_text_transform', 'is-link-box-title-transform-none') . ' ';
		$html_class .= get_theme_mod('efor_setting_link_box_text_align', 'is-link-box-text-align-center') . ' ';
		$html_class .= get_theme_mod('efor_setting_link_box_vertical_align', 'is-link-box-v-align-center') . ' ';
		$html_class .= get_theme_mod('efor_setting_link_box_parallax_effect', 'is-link-box-parallax') . ' ';
		$html_class .= get_theme_mod('efor_setting_intro_text_align', 'is-intro-align-center') . ' ';
		$html_class .= get_theme_mod('efor_setting_intro_text_color', 'is-intro-text-dark') . ' ';
		$html_class .= get_theme_mod('efor_setting_intro_parallax_bg_img', 'is-intro-parallax-no') . ' ';
		$html_class .= get_theme_mod('efor_setting_more_link_style', 'is-more-link-button-style') . ' ';
		$html_class .= get_theme_mod('efor_setting_author_info_box_style', 'is-about-author-minimal') . ' ';
		$html_class .= get_theme_mod('efor_setting_related_posts_parallax_effect', 'is-related-posts-parallax') . ' ';
		$html_class .= get_theme_mod('efor_setting_related_posts_width', 'is-related-posts-overflow') . ' ';
		$html_class .= get_theme_mod('efor_setting_share_links_style', 'is-share-links-boxed') . ' ';
		$html_class .= get_theme_mod('efor_setting_tag_cloud_style', 'is-tagcloud-minimal') . ' ';
		$html_class .= get_theme_mod('efor_setting_post_nav_image', 'is-nav-single-rounded') . ' ';
		$html_class .= get_theme_mod('efor_setting_post_nav_animated', 'is-nav-single-no-animated') . ' ';
		$html_class .= get_theme_mod('efor_setting_comments_style', 'is-comments-minimal') . ' ';
		$html_class .= get_theme_mod('efor_setting_comment_image_shape', 'is-comments-image-rounded') . ' ';
		$html_class .= get_theme_mod('efor_setting_comment_form_style', 'is-comment-form-boxed is-comment-form-border-arrow') . ' ';
		$html_class .= get_theme_mod('efor_setting_sidebar_position', 'is-sidebar-right') . ' ';
		$html_class .= get_theme_mod('efor_setting_sidebar_sticky', 'is-sidebar-sticky') . ' ';
		$html_class .= get_theme_mod('efor_setting_sidebar_widget_text_align', 'is-sidebar-align-left') . ' ';
		$html_class .= get_theme_mod('efor_setting_sidebar_widget_title_align', 'is-widget-title-align-left') . ' ';
		$html_class .= get_theme_mod('efor_setting_sidebar_widget_title_style', 'is-widget-line-cut-center') . ' ';
		$html_class .= get_theme_mod('efor_setting_sidebar_trending_posts_style', 'is-trending-posts-default') . ' ';
		$html_class .= get_theme_mod('efor_setting_footer_subscribe_style', 'is-footer-subscribe-light') . ' ';
		$html_class .= get_theme_mod('efor_setting_footer_widget_text_align', 'is-footer-widgets-align-left') . ' ';
		$html_class .= get_theme_mod('efor_setting_footer_layout', 'is-footer-full-width') . ' ';
		$html_class .= get_theme_mod('efor_setting_text_transform_meta', 'is-meta-uppercase') . ' ';
		
		$author_info_box_align            = get_theme_mod('efor_setting_author_info_box_align', "");            if (! empty($author_info_box_align))            { $html_class .= $author_info_box_align . ' '; }
		$share_links_align                = get_theme_mod('efor_setting_share_links_align', "");                if (! empty($share_links_align))                { $html_class .= $share_links_align . ' '; }
		$main_slider_dots_style           = get_theme_mod('efor_setting_main_slider_dots_style', "");           if (! empty($main_slider_dots_style))           { $html_class .= $main_slider_dots_style . ' '; }
		$text_transform_text_logo         = get_theme_mod('efor_setting_text_transform_text_logo', "");         if (! empty($text_transform_text_logo))         { $html_class .= $text_transform_text_logo . ' '; }
		$text_transform_tagline           = get_theme_mod('efor_setting_text_transform_tagline', "");           if (! empty($text_transform_tagline))           { $html_class .= $text_transform_tagline . ' '; }
		$tagline_visibility               = get_theme_mod('efor_setting_tagline_visibility', "");               if (! empty($tagline_visibility))               { $html_class .= $tagline_visibility . ' '; }
		$logo_container_width             = get_theme_mod('efor_setting_logo_container_width', "");             if (! empty($logo_container_width))             { $html_class .= $logo_container_width . ' '; }
		$logo_behaviour                   = get_theme_mod('efor_setting_logo_behaviour', "");                   if (! empty($logo_behaviour))                   { $html_class .= $logo_behaviour . ' '; }
		$logo_hover_effect                = get_theme_mod('efor_setting_logo_hover_effect', "");                if (! empty($logo_hover_effect))                { $html_class .= $logo_hover_effect . ' '; }
		$header_top_bar_mobile_visibility = get_theme_mod('efor_setting_header_top_bar_mobile_visibility', ""); if (! empty($header_top_bar_mobile_visibility)) { $html_class .= $header_top_bar_mobile_visibility . ' '; }
		$header_top_bar_text_color        = get_theme_mod('efor_setting_header_top_bar_text_color', "");        if (! empty($header_top_bar_text_color))        { $html_class .= $header_top_bar_text_color . ' '; }
		$header_top_bar_text_transform    = get_theme_mod('efor_setting_header_top_bar_text_transform', "");    if (! empty($header_top_bar_text_transform))    { $html_class .= $header_top_bar_text_transform . ' '; }
		$header_top_bar_style             = get_theme_mod('efor_setting_header_top_bar_style', "");             if (! empty($header_top_bar_style))             { $html_class .= $header_top_bar_style . ' '; }
		$header_top_bar_width             = get_theme_mod('efor_setting_header_top_bar_width', "");             if (! empty($header_top_bar_width))             { $html_class .= $header_top_bar_width . ' '; }
		$before_logo_area_visibility      = get_theme_mod('efor_setting_before_logo_area_visibility', "");      if (! empty($before_logo_area_visibility))      { $html_class .= $before_logo_area_visibility . ' '; }
		$after_logo_area_visibility       = get_theme_mod('efor_setting_after_logo_area_visibility', "");       if (! empty($after_logo_area_visibility))       { $html_class .= $after_logo_area_visibility . ' '; }
		$before_logo_area_items_align     = get_theme_mod('efor_setting_before_logo_area_items_align', "");     if (! empty($before_logo_area_items_align))     { $html_class .= $before_logo_area_items_align . ' '; }
		$after_logo_area_items_align      = get_theme_mod('efor_setting_after_logo_area_items_align', "");      if (! empty($after_logo_area_items_align))      { $html_class .= $after_logo_area_items_align . ' '; }
		$text_transform_buttons           = get_theme_mod('efor_setting_text_transform_buttons', "");           if (! empty($text_transform_buttons))           { $html_class .= $text_transform_buttons . ' '; }
		$header_sub_menu_animation        = get_theme_mod('efor_setting_header_sub_menu_animation', "");        if (! empty($header_sub_menu_animation))        { $html_class .= $header_sub_menu_animation . ' '; }
		$header_menu_link_hover_style     = get_theme_mod('efor_setting_header_menu_link_hover_style', "");     if (! empty($header_menu_link_hover_style))     { $html_class .= $header_menu_link_hover_style . ' '; }
		$header_padding                   = get_theme_mod('efor_setting_header_padding', "");                   if (! empty($header_padding))                   { $html_class .= $header_padding . ' '; }
		$header_search                    = get_theme_mod('efor_setting_header_search', "");                    if (! empty($header_search))                    { $html_class .= $header_search . ' '; }
		$text_transform_copyright         = get_theme_mod('efor_setting_text_transform_copyright', "");         if (! empty($text_transform_copyright))         { $html_class .= $text_transform_copyright . ' '; }
		$logo_bg_stretch_left             = get_theme_mod('efor_setting_logo_bg_stretch_left', "");             if (! empty($logo_bg_stretch_left))             { $html_class .= $logo_bg_stretch_left . ' '; }
		$header_shadow                    = get_theme_mod('efor_setting_header_shadow', "");                    if (! empty($header_shadow))                    { $html_class .= $header_shadow . ' '; }
		$header_sticky_shadow             = get_theme_mod('efor_setting_header_sticky_shadow', "");             if (! empty($header_sticky_shadow))             { $html_class .= $header_sticky_shadow . ' '; }
		$header_inner_style               = get_theme_mod('efor_setting_header_inner_style', "");               if (! empty($header_inner_style))               { $html_class .= $header_inner_style . ' '; }
		$header_transparent_style         = get_theme_mod('efor_setting_header_transparent_style', "");         if (! empty($header_transparent_style))         { $html_class .= $header_transparent_style . ' '; }
		$header_bg_blur                   = get_theme_mod('efor_setting_header_bg_blur', "");                   if (! empty($header_bg_blur))                   { $html_class .= $header_bg_blur . ' '; }
		$menu_shadow                      = get_theme_mod('efor_setting_menu_shadow', "");                      if (! empty($menu_shadow))                      { $html_class .= $menu_shadow . ' '; }
		$menu_sticky_shadow               = get_theme_mod('efor_setting_menu_sticky_shadow', "");               if (! empty($menu_sticky_shadow))               { $html_class .= $menu_sticky_shadow . ' '; }
		$menu_links_borders               = get_theme_mod('efor_setting_menu_links_borders', "");               if (! empty($menu_links_borders))               { $html_class .= $menu_links_borders . ' '; }
		$menu_links_borders_style         = get_theme_mod('efor_setting_menu_links_borders_style', "");         if (! empty($menu_links_borders_style))         { $html_class .= $menu_links_borders_style . ' '; }
		$footer_borders                   = get_theme_mod('efor_setting_footer_borders', "");                   if (! empty($footer_borders))                   { $html_class .= $footer_borders . ' '; }
		$footer_border_style              = get_theme_mod('efor_setting_footer_border_style', "");              if (! empty($footer_border_style))              { $html_class .= $footer_border_style . ' '; }
		$copyright_border_style           = get_theme_mod('efor_setting_copyright_border_style', "");           if (! empty($copyright_border_style))           { $html_class .= $copyright_border_style . ' '; }
		$text_transform_icon_box_title    = get_theme_mod('efor_setting_text_transform_icon_box_title', "");    if (! empty($text_transform_icon_box_title))    { $html_class .= $text_transform_icon_box_title . ' '; }
		$audio_embeds_position            = get_theme_mod('efor_setting_audio_embeds_position', "");            if (! empty($audio_embeds_position))            { $html_class .= $audio_embeds_position . ' '; }
		
		
		if (get_theme_mod('efor_setting_make_sticky_header_menu_width_always_full'))
		{
			$html_class .= 'is-header-sticky-always-full' . ' ';
		}
		
		$html_class .= efor_core_header_style() . ' ';
		
		$html_class = trim($html_class);
		echo 'class="' . esc_attr($html_class) . '"';
	}


/* ============================================================================================================================================= */


	function efor_html_data_attributes()
	{
		$html_data_attributes = "";
		
		$font_title_ratio__slider   = get_theme_mod('efor_setting_font_title_ratio', '0.5');
		$font_title_ratio__link_box = get_theme_mod('efor_setting_font_title_ratio_link_box', '0.5');
		$generic_buttons_style      = get_theme_mod('efor_setting_buttons__generic_buttons_style', "");
		$header_bg_shape            = get_theme_mod('efor_setting_header_bg_shape', "");
		
		$html_data_attributes .= 'data-title-ratio="' . esc_attr($font_title_ratio__slider) . '"';
		$html_data_attributes .= ' ';
		$html_data_attributes .= 'data-link-box-title-ratio="' . esc_attr($font_title_ratio__link_box) . '"';
		$html_data_attributes .= ' ';
		$html_data_attributes .= 'data-generic-button-style="' . esc_attr($generic_buttons_style) . '"';
		$html_data_attributes .= ' ';
		$html_data_attributes .= 'data-header-bg-shape="' . esc_attr($header_bg_shape) . '"';
		
		return $html_data_attributes;
	}

?>
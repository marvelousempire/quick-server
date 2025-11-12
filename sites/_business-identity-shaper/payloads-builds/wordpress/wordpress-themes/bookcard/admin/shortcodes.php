<?php

	add_filter( 'the_excerpt', 'do_shortcode' );
	add_filter( 'widget_text', 'do_shortcode' );


/* ============================================================================================================================================ */

	function row( $atts, $content = "" )
	{
		$row =  '<div class="row">' . do_shortcode( $content ) . '</div>';
		
		return $row;
	}
	// end row

	add_shortcode( 'row', 'row' );

/* ============================================================================================================================================ */

	function column( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'width' => "",
										'offset' => "" ), $atts ) );
									
		$column =  '<div class="span' . $width . ' offset' . $offset . '">' . do_shortcode( $content ) . '</div>';
		
		return $column;
	}
	// end column

	add_shortcode( 'column', 'column' );

/* ============================================================================================================================================ */

	function cover_caption( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'title' => "" ), $atts ) );
		
		$cover_caption = '<h3><span>' . $title . '</span> ' . do_shortcode( $content ) . '</h3>';
		
		return $cover_caption;
	}
	// end cover_caption
	
	add_shortcode( 'cover_caption', 'cover_caption' );

/* ============================================================================================================================================ */

	function section_caption( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'title' => "" ), $atts ) );
		
		$section_caption = '<h3><span>' . $title . '</span></h3>';
		
		return $section_caption;
	}
	// end section_caption
	
	add_shortcode( 'section_caption', 'section_caption' );

/* ============================================================================================================================================ */

	function social_icons( $atts, $content = "" )
	{
		$social_icons = '<ul class="social">' . do_shortcode( $content ) . '</ul>';
		
		return $social_icons;
	}
	// end social_icons
	
	add_shortcode( 'social_icons', 'social_icons' );

/* ============================================================================================================================================ */

	function social_icon( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'type' => "",
										'title' => "",
										'url' => "" ), $atts ) );
		
		$social_icon = '<li><a class="' . $type . '" target="_blank" title="' . $title . '" href="' . $url . '"></a></li>';
		
		return $social_icon;
	}
	// end social_icon
	
	add_shortcode( 'social_icon', 'social_icon' );

/* ============================================================================================================================================ */

	function map( $atts, $content = "" )
	{
		$map = '<div class="map">' . do_shortcode( $content ) . '</div>';
		
		return $map;
	}
	// end map
	
	add_shortcode( 'map', 'map' );

/* ============================================================================================================================================ */

	function contact_form_wrap( $atts, $content = "" )
	{
		$contact_form_wrap = '<div class="contact-form">' . do_shortcode( $content ) . '</div>';
		
		return $contact_form_wrap;
	}
	// end contact_form_wrap
	
	add_shortcode( 'contact_form_wrap', 'contact_form_wrap' );

/* ============================================================================================================================================ */

	function letter_wrap( $atts, $content = "" )
	{
		$letter_wrap = '<div class="letter cf">' . do_shortcode( $content ) . '</div>';
		
		return $letter_wrap;
	}
	// end letter_wrap
	
	add_shortcode( 'letter_wrap', 'letter_wrap' );

/* ============================================================================================================================================ */

	function letter_info( $atts, $content = "" )
	{
		$letter_info = '<div class="letter-info">' . do_shortcode( $content ) . '</div>';
		
		return $letter_info;
	}
	// end letter_info
	
	add_shortcode( 'letter_info', 'letter_info' );

/* ============================================================================================================================================ */

	function stamp( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'alt' => "",
										'url' => "" ), $atts ) );
		
		$stamp = '<div class="stamp"><img alt="' . $alt . '" src="' . $url . '"></div>';
		
		return $stamp;
	}
	// end stamp
	
	add_shortcode( 'stamp', 'stamp' );


/* ============================================================================================================================================ */


	function contact_form( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'to' => "",
										'captcha' => "" ), $atts ) );
		
		
		if ( $captcha == "yes" )
		{
			$random1 = rand(1, 5);
			$random2 = rand(1, 5);
			
			$sum_random = $random1 + $random2;
			
			$captcha_out = '<p>';
			$captcha_out .= '<input type="hidden" id="captcha" name="captcha" value="yes">';
			$captcha_out .= '<label for="sum_user">' . $random1 . ' + ' . $random2 . ' = ?</label>';
			$captcha_out .= '<input type="text" id="sum_user" name="sum_user" class="required" placeholder="' . __( 'What is the sum?', 'bookcard' ) . '">';
			$captcha_out .= '<input type="hidden" id="sum_random" name="sum_random" value="' . $sum_random . '">';
			$captcha_out .= '</p>';
		}
		else
		{
			$captcha_out = '<p style="padding: 0px; margin: 0px;">';
			$captcha_out .= '<input type="hidden" id="captcha" name="captcha" value="no">';
			$captcha_out .= '</p>';
		}
		
		
		// Get the site domain and get rid of www.
		$site_url = strtolower( $_SERVER['SERVER_NAME'] );
		
		if ( substr( $site_url, 0, 4 ) == 'www.' )
		{
			$site_url = substr( $site_url, 4 );
		}
		
		$sender_domain = 'server@' . $site_url;
		
		
		$contact_form = '<form id="contact-form" method="post" action="' . get_template_directory_uri() . '/admin/send-mail.php">';
		
		$contact_form .= '<input type="hidden" id="sender_domain" name="sender_domain" value="' . $sender_domain . '">';
		$contact_form .= '<input type="hidden" id="to" name="to" value="' . $to . '">';
		$contact_form .= '<input type="hidden" id="site_name" name="site_name" value="' . get_bloginfo( 'name' ) . '">';
		
		$contact_form .= '<p>';
		$contact_form .= '<label for="name">' . __( 'Name', 'bookcard' ) . '</label>';
		$contact_form .= '<input type="text" id="name" name="name" class="required">';
		$contact_form .= '</p>';
		
		$contact_form .= '<p>';
		$contact_form .= '<label for="email">' . __( 'Email', 'bookcard' ) . '</label>';
		$contact_form .= '<input type="text" id="email" name="email" class="required email">';
		$contact_form .= '</p>';
		
		$contact_form .= '<p>';
		$contact_form .= '<label for="subject">' . __( 'Subject', 'bookcard' ) . '</label>';
		$contact_form .= '<input type="text" id="subject" name="subject" class="required">';
		$contact_form .= '</p>';
		
		$contact_form .= '<p>';
		$contact_form .= '<label for="message">' . __( 'Message', 'bookcard' ) . '</label>';
		$contact_form .= '<textarea id="message" name="message" class="required"></textarea>';
		$contact_form .= '</p>';
		
		$contact_form .= $captcha_out;
		
		$contact_form .= '<p>';
		$contact_form .= '<img class="ajax-loader" alt="' . __( 'Sending ...', 'bookcard' ) . '" src="' . get_template_directory_uri() . '/images/bckg/loader_light.gif">';
		$contact_form .= '<input type="submit" class="btn submit" value="' . __( 'SEND', 'bookcard' ) . '">';
		$contact_form .= '</p>';
		
		$contact_form .= '</form>';
		
		
		return $contact_form;
	}
	
	add_shortcode( 'contact_form', 'contact_form' );


/* ============================================================================================================================================ */


	function label( $atts, $content = "" )
	{
		$label = '<span class="label">' . do_shortcode( $content ) . '</span>';
		
		return $label;
	}
	// end label
	
	add_shortcode( 'label', 'label' );

/* ============================================================================================================================================ */

	function history_group( $atts, $content = "" )
	{
		$history_group = '<div class="history-group">' . do_shortcode( $content ) . '</div>';
		
		return $history_group;
	}
	// end history_group
	
	add_shortcode( 'history_group', 'history_group' );

/* ============================================================================================================================================ */

	function history_unit( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'date' => "" ), $atts ) );
		
		$history_unit = '<div class="history-unit"><h4 class="work-time">' . $date . '</h4><div class="work-desc">' . do_shortcode( $content ) . '</div></div>';
		
		return $history_unit;
	}
	// end history_unit
	
	add_shortcode( 'history_unit', 'history_unit' );

/* ============================================================================================================================================ */

	function button( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'align_center' => "",
										'new_tab' => "",
										'text' => "",
										'url' => "" ), $atts ) );
										
		if ( $new_tab == 'yes' )
		{
			$new_tab_out = 'target="_blank"';
		}
		else
		{
			$new_tab_out = "";
		}
		
		if ( $align_center == 'yes' )
		{
			$button = '<div class="launch"><a class="btn" ' . $new_tab_out . ' href="' . $url . '">' . $text . '</a></div>';
		}
		else
		{
			$button = '<a class="btn" ' . $new_tab_out . ' href="' . $url . '">' . $text . '</a>';
		}
		
		return $button;
	}
	// end button
	
	add_shortcode( 'button', 'button' );

/* ============================================================================================================================================ */

	function skill_group( $atts, $content = "" )
	{
		$skill_group = '<div class="skill-group">' . do_shortcode( $content ) . '</div>';
		
		return $skill_group;
	}
	// end skill_group
	
	add_shortcode( 'skill_group', 'skill_group' );

/* ============================================================================================================================================ */

	function skill_unit( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'percent' => "" ), $atts ) );
		
		$skill_unit = '<div class="skill-unit"><h4>' . do_shortcode( $content ) . '</h4><div class="bar" data-percent="' . $percent . '"><div class="progress"></div></div></div>';
		
		return $skill_unit;
	}
	// end skill_unit
	
	add_shortcode( 'skill_unit', 'skill_unit' );

/* ============================================================================================================================================ */

	function testimonial_group( $atts, $content = "" )
	{
		$testimonial_group = '<div class="testo-group">' . do_shortcode( $content ) . '</div>';
		
		return $testimonial_group;
	}
	// end testimonial_group
	
	add_shortcode( 'testimonial_group', 'testimonial_group' );

/* ============================================================================================================================================ */

	function testimonial( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'image_link' => "",
										'image_url' => "",
										'image_alt' => "",
										'name' => "",
										'position' => "" ), $atts ) );
										
		if ( $image_link != "" )
		{
			$testimonial = '<div class="testo"><a href="' . $image_link . '"><img alt="' . $image_alt . '" src="' . $image_url . '"></a><div class="text"><h4>' . $name . ' <span>' . $position . '</span></h4><p>' . do_shortcode( $content ) . '</p></div></div>';
		}
		else
		{
			$testimonial = '<div class="testo"><img alt="' . $image_alt . '" src="' . $image_url . '"><div class="text"><h4>' . $name . ' <span>' . $position . '</span></h4><p>' . do_shortcode( $content ) . '</p></div></div>';
		}
		
		return $testimonial;
	}
	// end testimonial
	
	add_shortcode( 'testimonial', 'testimonial' );

/* ============================================================================================================================================ */

	function service_group( $atts, $content = "" )
	{
		$service_group = '<div class="service-group">' . do_shortcode( $content ) . '</div>';
		
		return $service_group;
	}
	// end service_group
	
	add_shortcode( 'service_group', 'service_group' );

/* ============================================================================================================================================ */

	function service( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'icon' => "",
										'title' => "" ), $atts ) );
		
		$service = '<div class="service">';
		$service .= '<i class="' . $icon . '"></i>';
		$service .= '<h4>' . $title . '</h4>';
		$service .= '<p>' . do_shortcode( $content ) . '</p>';
		$service .= '</div>';
		
		return $service;
	}
	// end service
	
	add_shortcode( 'service', 'service' );

/* ============================================================================================================================================ */

	function portfolio_field( $atts, $content = "" )
	{	
		$portfolio_field = '<div class="portfolio-field">' . do_shortcode( $content ) . '</div>';
		
		return $portfolio_field;
	}
	// end portfolio_field
	
	add_shortcode( 'portfolio_field', 'portfolio_field' );

/* ============================================================================================================================================ */

	function tags( $atts, $content = "" )
	{	
		$tags = '<ul class="tags">' . do_shortcode( $content ) . '</ul>';
		
		return $tags;
	}
	// end tags
	
	add_shortcode( 'tags', 'tags' );

/* ============================================================================================================================================ */

	function tag( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'text' => "" ), $atts ) );
		
		$tag = '<li><a>' . $text . '</a></li>';
		
		return $tag;
	}
	// end tag
	
	add_shortcode( 'tag', 'tag' );

/* ============================================================================================================================================ */

	function image( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'width' => "",
										'height' => "",
										'alt' => "",
										'title' => "",
										'src' => "" ), $atts ) );
		
		$image = '<img width="' . $width . '" height="' . $height . '" alt="' . $alt . '" title="' . $title . '" src="' . $src . '">';
		
		return $image;
	}
	// end image
	
	add_shortcode( 'image', 'image' );

/* ============================================================================================================================================ */

	function divider( $atts, $content = "" )
	{	
		$divider = '<hr>';
		
		return $divider;
	}
	// end divider
	
	add_shortcode( 'divider', 'divider' );

/* ============================================================================================================================================ */

	function pf_lightbox_video( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'title' => "",
										'url' => "" ), $atts ) );
		
		
		if ( is_single() )
		{
			$pf_lightbox_video = '<div class="portfolio-field span12"><iframe width="500" height="281" src="' . $url . '"></iframe></div>';
		}
		else
		{
			$pf_lightbox_video = '<a class="lightbox iframe" data-lightbox-gallery="fancybox-item-' . get_the_ID() . '" title="' . $title . '" href="' . $url . '"></a>';
		}
		// end if
		
		
		return $pf_lightbox_video;
	}
	// end pf_lightbox_video
	
	add_shortcode( 'pf_lightbox_video', 'pf_lightbox_video' );

/* ============================================================================================================================================ */

	function pf_lightbox_audio( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'title' => "",
										'url' => "" ), $atts ) );
		
		
		if ( is_single() )
		{
			$pf_lightbox_audio = '<div class="portfolio-field span12"><iframe style="width: 100%;" src="' . $url . '"></iframe></div>';
		}
		else
		{
			$pf_lightbox_audio = '<a class="lightbox iframe" data-lightbox-gallery="fancybox-item-' . get_the_ID() . '" title="' . $title . '" href="' . $url . '"></a>';
		}
		// end if
		
		
		return $pf_lightbox_audio;
	}
	// end pf_lightbox_audio
	
	add_shortcode( 'pf_lightbox_audio', 'pf_lightbox_audio' );

/* ============================================================================================================================================ */

	function pf_lightbox_image( $atts, $content = "" )
	{
		extract( shortcode_atts( array( 'first_image' => 'no',
										'title' => "",
										'url' => "" ), $atts ) );
		
		
		if ( $first_image == 'yes' )
		{
			$first_image_out = "";
		}
		else
		{
			$first_image_out = 'hidden';
		}
		// end if
		
		
		if ( is_single() )
		{
			$pf_lightbox_image = '<div class="portfolio-field span12" style="text-align: center;"><img alt="' . $title . '" src="' . $url . '"></div>';
		}
		else
		{
			$pf_lightbox_image = '<a class="lightbox ' . $first_image_out . '" data-lightbox-gallery="fancybox-item-' . get_the_ID() . '" title="' . $title . '" href="' . $url . '"></a>';
		}
		// end if
		
		
		return $pf_lightbox_image;
	}
	// end pf_lightbox_image
	
	add_shortcode( 'pf_lightbox_image', 'pf_lightbox_image' );

/* ============================================================================================================================================ */

	function about_text( $atts, $content = "" )
	{	
		$about_text = '<h4 class="about-text">' . do_shortcode( $content ) . '</h4>';
		
		return $about_text;
	}
	// end about_text
	
	add_shortcode( 'about_text', 'about_text' );

/* ============================================================================================================================================ */

	// Actual processing of the shortcode happens here
	function my_run_shortcode( $content )
	{
		global $shortcode_tags;
		
		// Backup current registered shortcodes and clear them all out
		$orig_shortcode_tags = $shortcode_tags;
		remove_all_shortcodes();
		
		add_shortcode( 'row', 'row' );
		add_shortcode( 'column', 'column' );
		add_shortcode( 'cover_caption', 'cover_caption' );
		add_shortcode( 'section_caption', 'section_caption' );
		add_shortcode( 'social_icons', 'social_icons' );
		add_shortcode( 'social_icon', 'social_icon' );
		add_shortcode( 'map', 'map' );
		add_shortcode( 'contact_form_wrap', 'contact_form_wrap' );
		add_shortcode( 'letter_wrap', 'letter_wrap' );
		add_shortcode( 'letter_info', 'letter_info' );
		add_shortcode( 'stamp', 'stamp' );
		add_shortcode( 'contact_form', 'contact_form' );
		add_shortcode( 'label', 'label' );
		add_shortcode( 'history_group', 'history_group' );
		add_shortcode( 'history_unit', 'history_unit' );
		add_shortcode( 'button', 'button' );
		add_shortcode( 'skill_group', 'skill_group' );
		add_shortcode( 'skill_unit', 'skill_unit' );
		add_shortcode( 'testimonial_group', 'testimonial_group' );
		add_shortcode( 'testimonial', 'testimonial' );
		add_shortcode( 'service_group', 'service_group' );
		add_shortcode( 'service', 'service' );
		add_shortcode( 'portfolio_field', 'portfolio_field' );
		add_shortcode( 'tags', 'tags' );
		add_shortcode( 'tag', 'tag' );
		add_shortcode( 'image', 'image' );
		add_shortcode( 'divider', 'divider' );
		add_shortcode( 'pf_lightbox_video', 'pf_lightbox_video' );
		add_shortcode( 'pf_lightbox_audio', 'pf_lightbox_audio' );
		add_shortcode( 'pf_lightbox_image', 'pf_lightbox_image' );
		add_shortcode( 'about_text', 'about_text' );
		
		// Do the shortcode ( only the one above is registered )
		$content = do_shortcode( $content );
		
		// Put the original shortcodes back
		$shortcode_tags = $orig_shortcode_tags;
		
		return $content;
	}
	
	add_filter('the_content', 'my_run_shortcode', 7);

?>
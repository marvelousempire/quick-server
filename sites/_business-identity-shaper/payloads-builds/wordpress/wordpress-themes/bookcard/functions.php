<?php

	function bookcard_theme_enqueue()
	{
		$template_directory_uri = get_template_directory_uri();
		
		wp_enqueue_style('lato',                            '//fonts.googleapis.com/css?family=Lato:100,300,400,700,900,100italic,300italic,400italic,700italic,900italic');
		wp_enqueue_style('alfa-slab-one-nixie-one-raleway', '//fonts.googleapis.com/css?family=Alfa+Slab+One|Nixie+One|Raleway:200,800');
		wp_enqueue_style('tulpen-one-sacramento',           '//fonts.googleapis.com/css?family=Tulpen+One|Sacramento');
		wp_enqueue_style('print',           $template_directory_uri . '/css/print.css', null, null, 'print');
		wp_enqueue_style('normalize',       $template_directory_uri . '/css/normalize.css');
		wp_enqueue_style('bootstrap',       $template_directory_uri . '/css/bootstrap.min.css');
		wp_enqueue_style('animate',         $template_directory_uri . '/css/animate.css');
		wp_enqueue_style('book',            $template_directory_uri . '/css/book.css');
		wp_enqueue_style('font-awesome',    $template_directory_uri . '/css/font-awesome.css');
		wp_enqueue_style('fancybox',        $template_directory_uri . '/css/jquery.fancybox-1.3.4.css');
		wp_enqueue_style('bookcard-main',   $template_directory_uri . '/css/main.css');
		wp_enqueue_style('bookcard-wp-fix', $template_directory_uri . '/admin/css/wp-fix.css');
		wp_enqueue_style('bookcard-style',  get_stylesheet_uri(), null, null);
		
		if (is_singular() && comments_open() && get_option('thread_comments')) { wp_enqueue_script('comment-reply'); }
		wp_deregister_script('jquery');
		wp_enqueue_script('jquery',          $template_directory_uri . '/js/jquery-1.8.3.min.js', null, null);
		wp_enqueue_script('address',         $template_directory_uri . '/js/jquery.address-1.5.min.js', null, null, true);
		wp_enqueue_script('antiscroll',      $template_directory_uri . '/js/antiscroll.js', null, null, true);
		wp_enqueue_script('fittext',         $template_directory_uri . '/js/jquery.fittext.js', null, null, true);
		wp_deregister_script('imagesloaded');
		wp_enqueue_script('imagesloaded',    $template_directory_uri . '/js/jquery.imagesloaded.min.js', null, null, true);
		wp_enqueue_script('isotope',         $template_directory_uri . '/js/jquery.isotope.min.js', null, null, true);
		wp_enqueue_script('fitvids',         $template_directory_uri . '/js/jquery.fitvids.js', null, null, true);
		wp_enqueue_script('validate',        $template_directory_uri . '/js/jquery.validate.min.js', null, null, true);
		wp_enqueue_script('fancybox',        $template_directory_uri . '/js/jquery.fancybox-1.3.4.pack.js', null, null, true);
		wp_enqueue_script('send-mail',       $template_directory_uri . '/js/send-mail.js', null, null, true);
		wp_enqueue_script('twitter-fetcher', $template_directory_uri . '/js/twitterFetcher_v10_min.js', null, null, true);
		wp_enqueue_script('bookcard-main',   $template_directory_uri . '/js/main.js', null, null, true);
		wp_enqueue_script('bookcard-wp-fix', $template_directory_uri . '/admin/js/wp-fix.js', null, null, true);
	}


/* ============================================================================================================================================ */


	function bookcard_after_setup_theme()
	{
		add_action('wp_enqueue_scripts', 'bookcard_theme_enqueue');
		
		load_theme_textdomain(
			'bookcard',
			get_template_directory() . '/languages'
		);
		
		register_nav_menus(
			array(
				'bookcard_theme_menu_location' => esc_html__('Theme Navigation Menu', 'bookcard')
			)
		);
		
		add_theme_support('title-tag');
		add_theme_support('automatic-feed-links');
		add_theme_support('post-thumbnails', array('post', 'page', 'portfolio'));
		add_theme_support('post-formats', array('image', 'gallery', 'audio', 'video', 'quote', 'link', 'chat', 'status', 'aside'));
		
		remove_theme_support('widgets-block-editor');
	}
	
	add_action('after_setup_theme', 'bookcard_after_setup_theme');


/* ============================================================================================================================================ */


	function bookcard_admin_enqueue()
	{
		wp_enqueue_style('bookcard-adminstyle', get_template_directory_uri() . '/admin/css/adminstyle.css');
		wp_enqueue_style('colorpicker', get_template_directory_uri() . '/admin/colorpicker/colorpicker.css');
		wp_enqueue_style('thickbox');
		
		wp_enqueue_script('thickbox');
		wp_enqueue_script('media-upload');
	}
	
	add_action('admin_enqueue_scripts', 'bookcard_admin_enqueue');


/* ============================================================================================================================================ */


	function bookcard_customize_controls()
	{
		wp_enqueue_style('bookcard-customize-controls', get_template_directory_uri() . '/admin/css/customize-controls.css', null, null);
	}
	
	add_action('customize_controls_enqueue_scripts', 'bookcard_customize_controls');
	
	
	function bookcard_customize_preview_js()
	{
		wp_enqueue_script('bookcard-customize-preview', get_template_directory_uri() . '/admin/js/customize-preview.js', array('customize-preview'), null, true);
	}
	
	add_action('customize_preview_init', 'bookcard_customize_preview_js');


/* ============================================================================================================================================ */


	if ( ! isset( $content_width ) )
	{
		$content_width = 560;
	}


/* ============================================================================================================================================ */


	if (function_exists('add_image_size'))
	{
		add_image_size('featured_image', 150);
		add_image_size('resume_blog_3_feat_img', 896);
		add_image_size('portfolio_image_1x', 400);
		add_image_size('portfolio_image_2x', 800);
	}


/* ============================================================================================================================================ */


	function theme_skin_css()
	{
		$cover_style = get_option( 'cover_style', 'standart' );
		
		if ( $cover_style != 'default' )
		{
			?>

<link rel="stylesheet" type="text/css" class="cover-skin" href="<?php echo get_template_directory_uri(); ?>/css/skins/cover/<?php echo $cover_style; ?>.css">

			<?php
		}
		
		$base_style = get_option( 'base_style', 'clean' );
		
		if ( $base_style != 'default' )
		{
			?>

<link rel="stylesheet" type="text/css" class="base-skin" href="<?php echo get_template_directory_uri(); ?>/css/skins/base/<?php echo $base_style; ?>.css">

			<?php
		}
		
		$paper_background = get_option( 'paper_background', 'cream-dust' );
		
		if ( $paper_background != 'clean' )
		{
			?>

<link rel="stylesheet" type="text/css" class="paper-bg-skin" href="<?php echo get_template_directory_uri(); ?>/css/skins/paper-bg/<?php echo $paper_background; ?>.css">

			<?php
		}
		
		$body_background = get_option( 'body_background', 'wood' );
		
		?>

<link rel="stylesheet" type="text/css" class="body-bg-skin" href="<?php echo get_template_directory_uri(); ?>/css/skins/body-bg/<?php echo $body_background; ?>.css">

		<?php
	}
	
	add_action( 'wp_head', 'theme_skin_css' );


/* ============================================================================================================================================ */


	if ( ! function_exists( 'theme_comments' ) ) :
	
		/*
			Template for comments and pingbacks.
			
			To override this walker in a child theme without modifying the comments template
			simply create your own theme_comments(), and that function will be used instead.
			
			Used as a callback by wp_list_comments() for displaying the comments.
		*/
		
		function theme_comments( $comment, $args, $depth )
		{
			$GLOBALS['comment'] = $comment;
			
			switch ( $comment->comment_type ) :
			
				case 'pingback' :
				
				case 'trackback' :
					
					// Display trackbacks differently than normal comments.
					?>
						<li id="comment-<?php comment_ID(); ?>" <?php comment_class(); ?>>
							<p>
								<?php
									_e( 'Pingback:', 'bookcard' ); ?> <?php comment_author_link(); ?> <?php edit_comment_link( __( '(Edit)', 'bookcard' ), '<span class="edit-link">', '</span>' );
								?>
							</p>
					<?php
				break;
				
				default :
				
					// Proceed with normal comments.
					global $post;
					
					?>
					
					<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">
						<article id="comment-<?php comment_ID(); ?>" class="comment">
							<header class="comment-meta comment-author vcard">
								<?php
									echo get_avatar( $comment, 75 );
									
									printf( '<cite class="fn">%1$s %2$s</cite>',
											get_comment_author_link(),
											// If current post author is also comment author, make it known visually.
											( $comment->user_id === $post->post_author ) ? '<span></span>' : "" );
									
									printf( '<a href="%1$s"><time datetime="%2$s">%3$s</time></a>',
											esc_url( get_comment_link( $comment->comment_ID ) ),
											get_comment_time( 'c' ),
											/* translators: 1: date, 2: time */
											sprintf( __( '%1$s at %2$s', 'bookcard' ), get_comment_date(), get_comment_time() ) );
								?>
							</header>
							<!-- end .comment-meta -->
							
							<?php
								if ( '0' == $comment->comment_approved ) :
									?>
										<p class="comment-awaiting-moderation"><?php _e( 'Your comment is awaiting moderation.', 'bookcard' ); ?></p>
									<?php
								endif;
							?>
							
							<section class="comment-content comment">
								<?php
									comment_text();
								?>
								
								<?php
									edit_comment_link( __( 'Edit', 'bookcard' ), '<p class="edit-link">', '</p>' );
								?>
							</section>
							<!-- end .comment-content -->
							
							<div class="reply">
								<?php
									comment_reply_link( array_merge( $args, array( 'reply_text' => __( 'Reply', 'bookcard' ), 'after' => ' <span>&darr;</span>', 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) );
								?>
							</div>
							<!-- end .reply -->
						</article>
						<!-- end #comment-## -->
					<?php
				break;
				
			endswitch;
		}
		// end theme_comments
		
	endif;


/* ============================================================================================================================================ */


	function theme_login_enqueue()
	{
		wp_enqueue_script('jquery');
	}
	
	add_action('login_enqueue_scripts', 'theme_login_enqueue');
	
	
	function bookcard_login_head()
	{
		$logo_login_hide = get_option('logo_login_hide', false);
		$logo_login      = get_option('logo_login', "");
		
		if ($logo_login_hide)
		{
			echo '<style type="text/css"> h1 { display: none; } </style>';
		}
		else
		{
			if (! empty($logo_login))
			{
				echo '<style type="text/css"> h1 a { cursor: default; background-image: url("' . esc_url($logo_login) . '") !important; }</style>';
				
				echo '<script>
						jQuery(document).ready( function($)
						{
							jQuery("h1 a").removeAttr("title");
							jQuery("h1 a").removeAttr("href");
						});
					</script>';
			}
		}
	}
	
	add_action('login_head', 'bookcard_login_head');


/* ============================================================================================================================================ */


	function bookcard_options_wp_head()
	{
		$custom_css = stripcslashes(get_option('custom_css', ""));
		
		if ($custom_css != "")
		{
			echo '<style type="text/css">' . "\n";
			
				echo $custom_css;
			
			echo "\n" . '</style>' . "\n";
		}
		
		$external_css_head = stripcslashes(get_option('external_css_head', ""));
		echo $external_css_head;
		
		$tracking_code_head = stripcslashes(get_option('tracking_code_head', ""));
		echo $tracking_code_head;
	}
	
	add_action('wp_head', 'bookcard_options_wp_head');


/* ============================================================================================================================================ */


	function bookcard_options_wp_footer()
	{
		$external_css = stripcslashes(get_option( 'external_css', ""));
		echo $external_css;
		
		$tracking_code = stripcslashes(get_option('tracking_code', ""));
		echo $tracking_code;
	}
	
	add_action('wp_footer', 'bookcard_options_wp_footer');


/* ============================================================================================================================================= */


	function bookcard_safe_mod()
	{
		$enable_safe_mod = 'false';
		
		if (get_option('enable_safe_mod'))
		{
			$enable_safe_mod = 'true';
		}
		
		echo 'data-safeMod="' . esc_attr($enable_safe_mod) . '"';
	}
	
	
	function bookcard_scrollbar()
	{
		$enable_scrollbar = 'true';
		
		if (get_option('enable_scrollbar'))
		{
			$enable_scrollbar = 'false';
		}
		
		echo 'data-autoHideScrollbar="' . esc_attr($enable_scrollbar) . '"';
	}
	
	
	function bookcard_safe_mod_page_in_animation()
	{
		$safe_mod_page_in_animation = get_option('safe_mod_page_in_animation', 'fadeIn');
		
		echo 'data-safeModPageInAnimation="' . esc_attr($safe_mod_page_in_animation) . '"';
	}
	
	
	function bookcard_in_animation()
	{
		$pf_details_page_in_animation = get_option('pf_details_page_in_animation', 'fadeInUp');
		
		echo 'data-inAnimation="' . esc_attr($pf_details_page_in_animation) . '"';
	}
	
	
	function bookcard_out_animation()
	{
		$pf_details_page_out_animation = get_option('pf_details_page_out_animation', 'fadeOutDownBig');
		
		echo 'data-outAnimation="' . esc_attr($pf_details_page_out_animation) . '"';
	}
	
	
	function bookcard_cover_heading_tune()
	{
		$cover_heading_1_tune     = get_option('cover_heading_1_tune', '0.85');
		$cover_heading_2_tune     = get_option('cover_heading_2_tune', '2.3');
		$cover_heading_3_tune     = get_option('cover_heading_3_tune', '0.6');
		$cover_heading_3_sub_tune = get_option('cover_heading_3_sub_tune', '0.8');
		
		$cover_heading_tune  = "";
		$cover_heading_tune .= 'data-cover-h1-tune="' . esc_attr($cover_heading_1_tune) . '"';
		$cover_heading_tune .= ' ';
		$cover_heading_tune .= 'data-cover-h2-tune="' . esc_attr($cover_heading_2_tune) . '"';
		$cover_heading_tune .= ' ';
		$cover_heading_tune .= 'data-cover-h3-tune="' . esc_attr($cover_heading_3_tune) . '"';
		$cover_heading_tune .= ' ';
		$cover_heading_tune .= 'data-cover-h3-span-tune="' . esc_attr($cover_heading_3_sub_tune) . '"';
		
		echo $cover_heading_tune;
	}
	
	
	function bookcard_latest_tweet()
	{
		$twitter_username = get_option('twitter_username', "");
		
		echo 'data-twitter-name="' . esc_attr($twitter_username) . '"';
	}
	
	
	function bookcard_html_attributes()
	{
		bookcard_safe_mod();
		echo ' ';
		bookcard_scrollbar();
		echo ' ';
		bookcard_safe_mod_page_in_animation();
		echo ' ';
		bookcard_in_animation();
		echo ' ';
		bookcard_out_animation();
		echo ' ';
		bookcard_cover_heading_tune();
		echo ' ';
		bookcard_latest_tweet();
	}


/* ============================================================================================================================================= */


	function bookcard_page_inner__front_cover()
	{
		?>
			<!-- ABOUT PAGE -->
			<div id="home" class="rm-front page">
				<div class="antiscroll-wrap">
					<div class="antiscroll-inner">
						<!-- COVER IMAGE -->
						<div class="cover">
							<div class="cover-image-holder">
								<?php
									$front_cover_image = get_option( 'front_cover_image', "" );
								?>
								<img alt="<?php bloginfo( 'name' ); ?>" src="<?php echo $front_cover_image; ?>">
							</div>
							<!-- end .cover-image-holder -->
							
							<!-- title -->
							<h1>
								<?php
									$logo_type = get_option( 'logo_type', 'Text Logo' );
									
									if ( $logo_type == 'Text Logo' )
									{
										$text_logo_out = "";
										$select_text_logo = get_option( 'select_text_logo', 'Theme Site Title' );
										
										if ( $select_text_logo == 'WordPress Site Title' )
										{
											$text_logo_out = get_bloginfo( 'name' );
										}
										elseif ( $select_text_logo == 'Theme Site Title' )
										{
											$text_logo_out = stripcslashes( get_option( 'your_name', "" ) );
										}
										else
										{
											$front_cover_page = stripcslashes( get_option( 'front_cover_page', "" ) );
											
											if ( $front_cover_page != "" )
											{
												$args_front_cover_page = 'pagename=' . $front_cover_page;
												$loop_front_cover_page = new WP_Query( $args_front_cover_page );
												
												if ( $loop_front_cover_page->have_posts() ) :
													while ( $loop_front_cover_page->have_posts() ) : $loop_front_cover_page->the_post();
													
														$text_logo_out = get_the_title();
													
													endwhile;
												endif;
												wp_reset_query();
											}
										}
										
										echo $text_logo_out;
									}
									else
									{
										$logo_image = get_option('logo_image', "");
										?>
											<img alt="<?php bloginfo('name'); ?>" src="<?php echo $logo_image; ?>">
										<?php
									}
								?>
							</h1>
							<!-- end title -->
							
							<!-- tagline -->
							<h2>
								<?php
									$tagline_out = "";
									$select_tagline = get_option( 'select_tagline', 'Theme Tagline' );
									
									if ( $select_tagline == 'WordPress Tagline' )
									{
										$tagline_out = get_bloginfo( 'description' );
									}
									else
									{
										$tagline_out = stripcslashes( get_option( 'your_slogan', "" ) );
									}
									
									echo $tagline_out;
								?>
							</h2>
							<!-- end tagline -->
							
							<!-- extra titles -->
							<?php
								$front_cover_page = stripcslashes( get_option( 'front_cover_page', "" ) );
								
								if ( $front_cover_page != "" )
								{
									$args_front_cover_page = 'pagename=' . $front_cover_page;
									$loop_front_cover_page = new WP_Query( $args_front_cover_page );
									
									if ( $loop_front_cover_page->have_posts() ) :
										while ( $loop_front_cover_page->have_posts() ) : $loop_front_cover_page->the_post();
										
											the_content();
											
											wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'bookcard' ), 'after' => '</div>' ) );
										
										endwhile;
									endif;
									wp_reset_query();
								}
								// end if
							?>
							<!-- end extra titles -->
							
							<!-- open link -->
							<a class="rm-button-open ribbon" href="#/resume">
								<span class="ribbon-stitches-top"></span>
								
								<strong class="ribbon-content"><?php echo __('OPEN', 'bookcard'); ?></strong>
								
								<span class="ribbon-stitches-bottom"></span>
							</a>
							<!-- end open link -->
							
							<?php
								bookcard_latest_from_blog();
							?>
							
							<!-- twitter widget -->
							<?php
								$twitter_username = get_option( 'twitter_username', "" );
								
								if ( $twitter_username != "" )
								{
									$twitter_icon_url = get_option( 'twitter_icon_url', "" );
									
									?>
										<aside class="widget widget-twitter">
											<?php
												if ( $twitter_icon_url != "" )
												{
													echo '<a class="twitter-link" target="_blank" href="' . $twitter_icon_url . '"></a>';
												}
											?>
											
											<div id="twitter-list"></div>
										</aside>
										<!-- end .widget-twitter -->
									<?php
								}
							?>
							<!-- end twitter widget -->
						</div>
						<!-- end COVER IMAGE -->
					</div>
					<!-- end .antiscroll-inner -->
				</div>
				<!-- end .antiscroll-wrap -->
			</div>
			<!-- end ABOUT PAGE -->
		<?php
	}


/* ============================================================================================================================================= */


	function bookcard_page_inner__resume()
	{
		?>
			<!-- RESUME PAGE -->
			<div id="resume" class="rm-back page">
				<div class="antiscroll-wrap">
					<div class="antiscroll-inner">
						<div class="content">
							<?php
								$resume_page = stripcslashes( get_option( 'resume_page', "" ) );
								
								if ( $resume_page != "" )
								{
									$args_resume_page = 'pagename=' . $resume_page;
									$loop_resume_page = new WP_Query( $args_resume_page );
									
									if ( $loop_resume_page->have_posts() ) :
										while ( $loop_resume_page->have_posts() ) : $loop_resume_page->the_post();
											
											?>
												<h2 class="inner-page-title"><span><?php the_title(); ?></span></h2>
											<?php
											
											the_content();
											
											wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'bookcard' ), 'after' => '</div>' ) );
										
										endwhile;
									endif;
									
									wp_reset_query();
								}
							?>
							
							<?php
								$resume_page_blog = get_option('resume_page_blog', 'No');
								
								if ($resume_page_blog == 'Type 1')
								{
									bookcard_blog_resume__type_1();
								}
								elseif ($resume_page_blog == 'Type 2')
								{
									bookcard_blog_resume__type_2();
								}
								elseif ($resume_page_blog == 'Type 3')
								{
									bookcard_blog_resume__type_3();
								}
							?>
						</div>
						<!-- end .content -->
					</div>
					<!-- end .antiscroll-inner -->
				</div>
				<!-- end .antiscroll-wrap -->
				
				<div class="rm-overlay"></div>
			</div>
			<!-- end RESUME PAGE -->
		<?php
	}


/* ============================================================================================================================================= */


	function bookcard_page_inner__portfolio()
	{
		?>
			<div id="portfolio" class="portfolio page rm-middle">
				<div class="rm-inner">
					<div class="antiscroll-wrap">
						<div class="antiscroll-inner">
							<div class="content">
								<?php
									$pf_page = stripcslashes( get_option( 'pf_page', "" ) );
									
									if ( $pf_page != "" )
									{
										$args_contact_page = 'pagename=' . $pf_page;
										$loop_contact_page = new WP_Query( $args_contact_page );
										
										if ( $loop_contact_page->have_posts() ) :
											while ( $loop_contact_page->have_posts() ) : $loop_contact_page->the_post();
											
												?>
													<h2 class="inner-page-title"><span><?php the_title(); ?></span></h2>
												<?php
											
											endwhile;
										endif;
										wp_reset_query();
									}
								?>
								
								
								<?php
									$pf_content_editor = get_option( 'pf_content_editor', 'Bottom' );
									
									if ( $pf_content_editor == 'Top' )
									{
										?>
											<div class="page-content">
												<?php
													$pf_page = stripcslashes( get_option( 'pf_page', "" ) );
													
													if ( $pf_page != "" )
													{
														$args_contact_page = 'pagename=' . $pf_page;
														$loop_contact_page = new WP_Query( $args_contact_page );
														
														if ( $loop_contact_page->have_posts() ) :
															while ( $loop_contact_page->have_posts() ) : $loop_contact_page->the_post();
															
																the_content();
																
																wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'bookcard' ), 'after' => '</div>' ) );
															
															endwhile;
														endif;
														wp_reset_query();
													}
												?>
											</div>
										<?php
									}
								?>
								
								
								<ul id="filters">
									<?php
										$pf_terms = get_categories( 'type=portfolio&taxonomy=department' );
										
										if ( count( $pf_terms ) >= 2 )
										{
											?>
												<li class="current pf-all-items">
													<a href="#" data-filter="*"><?php echo __( 'ALL', 'bookcard' ); ?></a>
												</li>
											<?php
										}
										
										
										foreach ( $pf_terms as $pf_term ) :
											?>
												<li>
													<a href="#" data-filter=".<?php echo $pf_term->slug; ?>"><?php echo $pf_term->name; ?></a>
												</li>
											<?php
										endforeach;
									?>
								</ul>
								
								<div class="portfolio-items">
									<?php
										$args_portfolio = array( 'post_type' => 'portfolio', 'posts_per_page' => -1 );
										$loop_portfolio = new WP_Query( $args_portfolio );
										
										if ( $loop_portfolio->have_posts() ) :
											while ( $loop_portfolio->have_posts() ) : $loop_portfolio->the_post();
											
												$pf_type = get_option( get_the_ID() . 'pf_type', 'Standard' );
												
												if ( $pf_type == 'Standard' )
												{
													get_template_part( 'pf', 'standard' );
												}
												elseif ( $pf_type == 'Lightbox Featured Image' )
												{
													get_template_part( 'pf', 'featured' );
												}
												elseif ( $pf_type == 'Lightbox Gallery' )
												{
													get_template_part( 'pf', 'gallery' );
												}
												elseif ( $pf_type == 'Lightbox Video' )
												{
													get_template_part( 'pf', 'video' );
												}
												elseif ( $pf_type == 'Lightbox Audio' )
												{
													get_template_part( 'pf', 'audio' );
												}
												elseif ( $pf_type == 'Direct URL' )
												{
													get_template_part( 'pf', 'url' );
												}
											
											endwhile;
										endif;
										wp_reset_query();
									?>
								</div>
								
								
								<?php
									if ( $pf_content_editor == 'Bottom' )
									{
										?>
											<div class="page-content">
												<?php
													$pf_page = stripcslashes( get_option( 'pf_page', "" ) );
													
													if ( $pf_page != "" )
													{
														$args_contact_page = 'pagename=' . $pf_page;
														$loop_contact_page = new WP_Query( $args_contact_page );
														
														if ( $loop_contact_page->have_posts() ) :
															while ( $loop_contact_page->have_posts() ) : $loop_contact_page->the_post();
															
																the_content();
																
																wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'bookcard' ), 'after' => '</div>' ) );
															
															endwhile;
														endif;
														wp_reset_query();
													}
												?>
											</div>
										<?php
									}
								?>
							</div>
						</div>
					</div>
					
					
					<div class="rm-overlay"></div>
				</div>
			</div>
		<?php
	}


/* ============================================================================================================================================= */


	function bookcard_page_inner__back_cover()
	{
		?>
			<div class="rm-front">
				<!-- BACK COVER IMAGE -->
				<div class="cover">
					<div class="cover-image-holder">
						<?php
							$back_cover_image = get_option( 'back_cover_image', "" );
							$your_name = stripcslashes( get_option( 'your_name', "" ) );
						?>
						<img alt="<?php echo $your_name; ?>" src="<?php echo $back_cover_image; ?>">
					</div>
					<!-- end cover-image-holder -->
				</div>
				<!-- end BACK COVER IMAGE -->
			</div>
			<!-- end .rm-front -->
		<?php
	}


/* ============================================================================================================================================= */


	function bookcard_page_inner__contact()
	{
		?>
			<!-- CONTACT PAGE -->
			<div id="contact" class="rm-back page">
				<div class="antiscroll-wrap">
					<div class="antiscroll-inner">
						<div class="content">
							<?php
								$contact_page = stripcslashes( get_option( 'contact_page', "" ) );
								
								if ( $contact_page != "" )
								{
									$args_contact_page = 'pagename=' . $contact_page;
									$loop_contact_page = new WP_Query( $args_contact_page );
									
									if ( $loop_contact_page->have_posts() ) :
										while ( $loop_contact_page->have_posts() ) : $loop_contact_page->the_post();
										
											?>
												<h2 class="inner-page-title"><span><?php the_title(); ?></span></h2>
											<?php
											
											the_content();
											
											wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'bookcard' ), 'after' => '</div>' ) );
										
										endwhile;
									endif;
									wp_reset_query();
								}
								// end if
							?>
						</div>
						<!-- end .content -->
					</div>
					<!-- end .antiscroll-inner -->
				</div>
				<!-- end .antiscroll-wrap -->
				
				<!-- close link -->
				<a class="rm-close"><span></span></a>
				<!-- end close link -->
			</div>
			<!-- end CONTACT PAGE -->
		<?php
	}


/* ============================================================================================================================================= */


	function bookcard_resume_page_blog_posts_count()
	{
		$resume_page_blog_posts_count = get_option('resume_page_blog_posts_count', '10');
		
		return $resume_page_blog_posts_count;
	}


/* ============================================================================================================================================= */


	function bookcard_blog_resume__type_1()
	{
		$query = new WP_Query(
			array(
				'post_type'      => 'post',
				'posts_per_page' => bookcard_resume_page_blog_posts_count()
			)
		);
		
		if ($query->have_posts()) :
			while ($query->have_posts()) : $query->the_post();
				?>
					<div class="history-group">
						<div class="history-unit">
							<h4 class="work-time">
								<?php
									echo get_the_date('M j, Y');
								?>
							</h4> <!-- .work-time -->
							<div class="work-desc">
								<h4>
									<a href="<?php the_permalink(); ?>">
										<?php
											the_title();
										?>
									</a>
								</h4>
								<h5>
									<?php
										$output     = "";
										$separator  = ', ';
										$categories = get_the_category();
										
										if ($categories)
										{
											foreach ($categories as $category)
											{
												$output .= $category->cat_name . $separator;
											}
											
											echo trim($output, $separator);
										}
									?>
								</h5>
								<p>
									<?php
										the_excerpt();
									?>
								</p>
							</div> <!-- .work-desc -->
						</div> <!-- .history-unit -->
					</div> <!-- .history-group -->
				<?php
			endwhile;
		endif;
		wp_reset_postdata();
	}


/* ============================================================================================================================================= */


	function bookcard_blog_resume__type_2()
	{
		$query = new WP_Query(
			array(
				'post_type'      => 'post',
				'posts_per_page' => bookcard_resume_page_blog_posts_count()
			)
		);
		
		if ($query->have_posts()) :
			while ($query->have_posts()) : $query->the_post();
				?>
					<div class="testo-group">
						<div class="testo">
							<?php
								if (has_post_thumbnail())
								{
									the_post_thumbnail(
										'resume_blog_3_feat_img',
										array(
											'alt'   => get_the_title(),
											'title' => "",
											'class' => 'feat-img-resume-blog-type-2'
										)
									);
									
									?>
										<div class="text">
											<h4>
												<a href="<?php the_permalink(); ?>">
													<?php
														the_title();
													?>
												</a>
												<span>
													<?php
														$output     = "";
														$separator  = ', ';
														$categories = get_the_category();
														
														if ($categories)
														{
															foreach ($categories as $category)
															{
																$output .= $category->cat_name . $separator;
															}
															
															echo trim($output, $separator);
														}
													?>
												</span>
											</h4>
											<p>
												<?php
													the_excerpt();
												?>
											</p>
										</div> <!-- .text -->
									<?php
								}
								else
								{
									?>
										<div class="text" style="margin-left: 0px;">
											<h4>
												<a href="<?php the_permalink(); ?>">
													<?php
														the_title();
													?>
												</a>
												<span>
													<?php
														$output     = "";
														$separator  = ', ';
														$categories = get_the_category();
														
														if ($categories)
														{
															foreach ($categories as $category)
															{
																$output .= $category->cat_name . $separator;
															}
															
															echo trim($output, $separator);
														}
													?>
												</span>
											</h4>
											<p>
												<?php
													the_excerpt();
												?>
											</p>
										</div> <!-- .text -->
									<?php
								}
							?>
						</div> <!-- .testo -->
					</div> <!-- .testo-group -->
				<?php
			endwhile;
		endif;
		wp_reset_postdata();
	}


/* ============================================================================================================================================= */


	function bookcard_blog_resume__type_3()
	{
		$query = new WP_Query(
			array(
				'post_type'      => 'post',
				'posts_per_page' => bookcard_resume_page_blog_posts_count()
			)
		);
		
		if ($query->have_posts()) :
			while ($query->have_posts()) : $query->the_post();
				?>
					<div class="service-group">
						<div class="service">
							<?php
								if (has_post_thumbnail())
								{
									the_post_thumbnail(
										'resume_blog_3_feat_img',
										array(
											'alt'   => get_the_title(),
											'title' => "",
											'class'	=> 'feat-img-resume-blog-type-3'
										)
									);
								}
							?>
							<h4>
								<a href="<?php the_permalink(); ?>">
									<?php
										the_title();
									?>
								</a>
							</h4>
							<p>
								<?php
									the_excerpt();
								?>
							</p>
						</div> <!-- .service -->
					</div> <!-- .service-group -->
				<?php
			endwhile;
		endif;
		wp_reset_postdata();
	}


/* ============================================================================================================================================= */


	if (is_admin())
	{
		include_once(get_template_directory() . '/admin/theme-options.php');
	}
	
	include_once(get_template_directory() . '/admin/post-type-portfolio.php');
	include_once(get_template_directory() . '/admin/sidebar.php');
	include_once(get_template_directory() . '/admin/archive-title.php');
	include_once(get_template_directory() . '/admin/meta.php');
	include_once(get_template_directory() . '/admin/automatic-excerpt.php');
	include_once(get_template_directory() . '/admin/post-tags.php');
	include_once(get_template_directory() . '/admin/related-posts.php');
	include_once(get_template_directory() . '/admin/blog-page-link.php');
	include_once(get_template_directory() . '/admin/latest-from-blog.php');
	include_once(get_template_directory() . '/admin/content-none.php');
	include_once(get_template_directory() . '/admin/navigation-archive.php');
	include_once(get_template_directory() . '/admin/navigation-single.php');
	include_once(get_template_directory() . '/admin/shortcodes.php');
	include_once(get_template_directory() . '/admin/shortcode-generator.php');
	include_once(get_template_directory() . '/admin/customizer.php');
	include_once(get_template_directory() . '/admin/install-plugins.php');
	include_once(get_template_directory() . '/admin/demo-import.php');

?>
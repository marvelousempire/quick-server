<?php

	function efor_after_setup_theme()
	{
		load_theme_textdomain('efor', get_template_directory() . '/languages');
		
		register_nav_menus(
			array(
				'efor_theme_menu_location' => esc_html__('Theme Navigation Menu', 'efor')
			)
		);
		
		add_theme_support('title-tag');
		add_theme_support('post-thumbnails');
		add_theme_support('automatic-feed-links');
		add_theme_support('customize-selective-refresh-widgets');
		add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption'));
		add_theme_support('post-formats', array('image', 'gallery', 'audio', 'video', 'quote', 'link', 'chat', 'status', 'aside'));
		
		add_theme_support('woocommerce');
		add_theme_support('wc-product-gallery-lightbox');
		add_theme_support('wc-product-gallery-zoom');
		add_theme_support('wc-product-gallery-slider');
		
		add_theme_support(
			'custom-logo',
			array(
				'width'       => 1920,
				'height'      => 160,
				'flex-width'  => true,
				'flex-height' => true
			)
		);
		
		remove_theme_support('widgets-block-editor');
	}
	
	add_action('after_setup_theme', 'efor_after_setup_theme');


/* ============================================================================================================================================= */


	include_once(get_template_directory() . '/admin/html-attributes.php');
	include_once(get_template_directory() . '/admin/enqueue-styles-scripts.php');
	include_once(get_template_directory() . '/admin/enqueue-inline-style.php');
	include_once(get_template_directory() . '/admin/enqueue-inline-script.php');
	include_once(get_template_directory() . '/admin/image-sizes.php');
	include_once(get_template_directory() . '/admin/override-post-class.php');
	include_once(get_template_directory() . '/admin/override-post-gallery.php');


/* ============================================================================================================================================= */


	/*
		To override this walker in a child theme without modifying the comments template
		simply create your own efor_theme_comments(), and that function will be used instead.
		
		Used as a callback by wp_list_comments() for displaying the comments.
	*/
	
	function efor_theme_comments($comment, $args, $depth)
	{
		$GLOBALS['comment'] = $comment;
		
		switch ($comment->comment_type)
		{
			case 'pingback' :
			
			case 'trackback' :
			
				?>
					<li id="comment-<?php comment_ID(); ?>" <?php comment_class(); ?>>
						<p>
							<?php
								esc_html_e('Pingback:', 'efor');
								
								comment_author_link();
								
								edit_comment_link(esc_html__('(Edit)', 'efor'), '<span class="edit-link">', '</span>');
							?>
						</p>
				<?php
			
			break;
			
			default :
			
				global $post;
				
				?>
					<li id="li-comment-<?php comment_ID(); ?>" <?php comment_class(); ?>>
						<article id="comment-<?php comment_ID(); ?>" class="comment">
							<header class="comment-meta comment-author vcard">
								<?php
									echo get_avatar($comment, 150);
								?>
								<cite class="fn">
									<?php
										echo get_comment_author_link();
									?>
								</cite>
								<span class="comment-date">
									<?php
										echo get_comment_date();
										
										esc_html_e('at', 'efor');
										
										echo get_comment_time();
										
										edit_comment_link(
											esc_html__('Edit', 'efor'),
											'<span class="comment-edit-link">',
											'</span>'
										);
									?>
								</span>
							</header>
							
							<section class="comment-content comment">
								<?php
									if ('0' == $comment->comment_approved)
									{
										?>
											<p class="comment-awaiting-moderation">
												<?php
													esc_html_e('Your comment is awaiting moderation.', 'efor');
												?>
											</p>
										<?php
									}
									
									comment_text();
								?>
							</section>
							
							<div class="reply">
								<?php
									comment_reply_link(
										array_merge(
											$args,
											array(
												'reply_text' => esc_html__('Reply', 'efor'),
												'after'      => ' ' . '<span>' . esc_html__('&#8595;', 'efor') . '</span>',
												'depth'      => $depth,
												'max_depth'  => $args['max_depth']
											)
										)
									);
								?>
							</div>
						</article>
				<?php
			
			break;
		}
	}


/* ============================================================================================================================================= */


	function efor_post_tags()
	{
		$tags = get_theme_mod('efor_setting_tags', 'Yes');
		
		if ($tags != 'No')
		{
			if (get_the_tags() != "")
			{
				?>
					<div class="post-tags tagcloud">
						<?php
							the_tags("", ' ', "");
						?>
					</div> <!-- .post-tags .tagcloud -->
				<?php
			}
		}
	}


/* ============================================================================================================================================= */


	if (! function_exists('efor_archive_layout'))
	{
		function efor_archive_layout()
		{
			$layout = 'Regular';
			
			if (is_home() || is_tax('post_format'))
			{
				$layout = get_theme_mod('efor_setting_layout_blog', 'Regular');
			}
			elseif (is_tax())
			{
				$layout = 'Other'; // Custom taxonomy archives.
			}
			elseif (is_category())
			{
				$layout = get_theme_mod('efor_setting_layout_category', 'Grid');
			}
			elseif (is_tag())
			{
				$layout = get_theme_mod('efor_setting_layout_tag', 'Grid');
			}
			elseif (is_author())
			{
				$layout = get_theme_mod('efor_setting_layout_author', 'Grid');
			}
			elseif (is_date())
			{
				$layout = get_theme_mod('efor_setting_layout_date', 'Grid');
			}
			elseif (is_search())
			{
				$layout = get_theme_mod('efor_setting_layout_search', 'Grid');
			}
			elseif (is_archive())
			{
				$layout = 'Other'; // Other archives.
			}
			
			return $layout;
		}
	}


/* ============================================================================================================================================= */


	function efor_1st_full_yes_no()
	{
		$first_full = 'No';
		
		if (isset($_GET['first_full']))
		{
			if ($_GET['first_full'] == 'yes')
			{
				$first_full = 'Yes';
			}
			else
			{
				$first_full = 'No';
			}
		}
		else
		{
			$layout = efor_archive_layout();
			
			if (($layout == '1st Full + Grid') || ($layout == '1st Full + List'))
			{
				$first_full = 'Yes';
			}
		}
		
		return $first_full;
	}


/* ============================================================================================================================================= */


	function efor_blog_grid_post_width()
	{
		$grid_post_width = get_theme_mod('efor_setting_grid_post_width', '340');
		
		echo esc_attr($grid_post_width);
	}
	
	
	function efor_blog_grid_type()
	{
		$grid_type = 'masonry';
		
		if (isset($_GET['grid_type']))
		{
			if ($_GET['grid_type'] == 'fitRows')
			{
				$grid_type = 'fitRows';
			}
			else
			{
				$grid_type = 'masonry';
			}
		}
		else
		{
			$grid_type = get_theme_mod('efor_setting_grid_type', 'masonry');
		}
		
		return esc_attr($grid_type);
	}


/* ============================================================================================================================================= */


	function efor_wp_head__theme_directory_url()
	{
		// Used for local_font_url in customizer.
		
		if (is_customize_preview())
		{
			$theme_directory_url = get_template_directory_uri(); // http://www.example.com/wp-content/themes/efor
			
			// Remove URL prefix http: OR https:
			
			$theme_directory_url__http  = strpos($theme_directory_url, 'http:'); // Check for http:
			$theme_directory_url__https = strpos($theme_directory_url, 'https:'); // Check for https:
			
			if ($theme_directory_url__http !== false)
			{
				$theme_directory_url = substr($theme_directory_url, 5); // Remove http:
			}
			elseif ($theme_directory_url__https !== false)
			{
				$theme_directory_url = substr($theme_directory_url, 6); // Remove https:
			}
			
			// end Remove URL prefix http: OR https:
			
			?>

				<meta id="efor_theme_directory_url" name="efor_theme_directory_url" content="<?php echo esc_url($theme_directory_url); ?>">

			<?php
		}
	}
	
	add_action('wp_head', 'efor_wp_head__theme_directory_url');


/* ============================================================================================================================================= */


	/*
		This function filters the post content when viewing a post with the "chat" post format.  It formats the 
		content with structured HTML markup to make it easy for theme developers to style chat posts. The 
		advantage of this solution is that it allows for more than two speakers (like most solutions). You can 
		have 100s of speakers in your chat post, each with their own, unique classes for styling.
		
		@author David Chandra
		@link http://www.turtlepod.org
		@author Justin Tadlock
		@link http://justintadlock.com
		@copyright Copyright (c) 2012
		@license http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
		@link http://justintadlock.com/archives/2012/08/21/post-formats-chat
		
		@global array $_post_format_chat_ids An array of IDs for the chat rows based on the author.
		@param string $content The content of the post.
		@return string $chat_output The formatted content of the post.
	*/
	
	function efor_theme_post_format_chat_content( $content )
	{
		global $_post_format_chat_ids;
		
		/* If this is not a 'chat' post, return the content. */
		if ( !has_post_format( 'chat' ) )
		{
			return $content;
		}
		
		/* Set the global variable of speaker IDs to a new, empty array for this chat. */
		$_post_format_chat_ids = array();
		
		/* Allow the separator (separator for speaker/text) to be filtered. */
		$separator = apply_filters( 'my_post_format_chat_separator', ':' );
		
		/* Open the chat transcript div and give it a unique ID based on the post ID. */
		$chat_output = "\n\t\t\t" . '<div id="chat-transcript-' . esc_attr( get_the_ID() ) . '" class="chat-transcript">';
		
		/* Split the content to get individual chat rows. */
		$chat_rows = preg_split( "/(\r?\n)+|(<br\s*\/?>\s*)+/", $content );
		
		/* Loop through each row and format the output. */
		foreach ( $chat_rows as $chat_row )
		{
			/* If a speaker is found, create a new chat row with speaker and text. */
			if ( strpos( $chat_row, $separator ) )
			{
				/* Split the chat row into author/text. */
				$chat_row_split = explode( $separator, trim( $chat_row ), 2 );
				
				/* Get the chat author and strip tags. */
				$chat_author = strip_tags( trim( $chat_row_split[0] ) );
				
				/* Get the chat text. */
				$chat_text = trim( $chat_row_split[1] );
				
				/* Get the chat row ID (based on chat author) to give a specific class to each row for styling. */
				$speaker_id = efor_theme_post_format_chat_row_id( $chat_author );
				
				/* Open the chat row. */
				$chat_output .= "\n\t\t\t\t" . '<div class="chat-row ' . sanitize_html_class( "chat-speaker-{$speaker_id}" ) . '">';
				
				/* Add the chat row author. */
				$chat_output .= "\n\t\t\t\t\t" . '<div class="chat-author ' . sanitize_html_class( strtolower( "chat-author-{$chat_author}" ) ) . ' vcard"><cite class="fn">' . apply_filters( 'my_post_format_chat_author', $chat_author, $speaker_id ) . '</cite>' . $separator . '</div>';
				
				/* Add the chat row text. */
				$chat_output .= "\n\t\t\t\t\t" . '<div class="chat-text"><p>' . str_replace( array( "\r", "\n", "\t" ), '', apply_filters( 'my_post_format_chat_text', $chat_text, $chat_author, $speaker_id ) ) . '</p></div>';
				
				/* Close the chat row. */
				$chat_output .= "\n\t\t\t\t" . '</div><!-- .chat-row -->';
			}
			/*
				If no author is found, assume this is a separate paragraph of text that belongs to the
				previous speaker and label it as such, but let's still create a new row.
			*/
			else
			{
				/* Make sure we have text. */
				if ( !empty( $chat_row ) )
				{
					/* Open the chat row. */
					$chat_output .= "\n\t\t\t\t" . '<div class="chat-row ' . sanitize_html_class( "chat-speaker-{$speaker_id}" ) . '">';
					
					/* Don't add a chat row author.  The label for the previous row should suffice. */
					
					/* Add the chat row text. */
					$chat_output .= "\n\t\t\t\t\t" . '<div class="chat-text"><p>' . str_replace( array( "\r", "\n", "\t" ), '', apply_filters( 'my_post_format_chat_text', $chat_row, $chat_author, $speaker_id ) ) . '</p></div>';
					
					/* Close the chat row. */
					$chat_output .= "\n\t\t\t</div><!-- .chat-row -->";
				}
			}
		}
		
		/* Close the chat transcript div. */
		$chat_output .= "\n\t\t\t</div><!-- .chat-transcript -->\n";
		
		/* Return the chat content and apply filters for developers. */
		return apply_filters( 'my_post_format_chat_content', $chat_output );
	}
	
	/*
		This function returns an ID based on the provided chat author name. It keeps these IDs in a global 
		array and makes sure we have a unique set of IDs.  The purpose of this function is to provide an "ID"
		that will be used in an HTML class for individual chat rows so they can be styled. So, speaker "John" 
		will always have the same class each time he speaks. And, speaker "Mary" will have a different class 
		from "John" but will have the same class each time she speaks.
		
		@author David Chandra
		@link http://www.turtlepod.org
		@author Justin Tadlock
		@link http://justintadlock.com
		@copyright Copyright (c) 2012
		@license http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
		@link http://justintadlock.com/archives/2012/08/21/post-formats-chat
		
		@global array $_post_format_chat_ids An array of IDs for the chat rows based on the author.
		@param string $chat_author Author of the current chat row.
		@return int The ID for the chat row based on the author.
	*/
	
	function efor_theme_post_format_chat_row_id( $chat_author )
	{
		global $_post_format_chat_ids;
		
		/* Let's sanitize the chat author to avoid craziness and differences like "John" and "john". */
		$chat_author = strtolower( strip_tags( $chat_author ) );
		
		/* Add the chat author to the array. */
		$_post_format_chat_ids[] = $chat_author;
		
		/* Make sure the array only holds unique values. */
		$_post_format_chat_ids = array_unique( $_post_format_chat_ids );
		
		/* Return the array key for the chat author and add "1" to avoid an ID of "0". */
		return absint( array_search( $chat_author, $_post_format_chat_ids ) ) + 1;
	}
	
	/* Filter the content of chat posts. */
	add_filter( 'the_content', 'efor_theme_post_format_chat_content' );


/* ============================================================================================================================================= */


	function efor_blog_page_link_html($url)
	{
		?>
			<div class="section-launch">
				<a class="button" href="<?php echo esc_url($url); ?>">
					<?php
						esc_html_e('See All Posts', 'efor');
					?>
				</a> <!-- .button -->
			</div> <!-- .section-launch -->
		<?php
	}
	
	function efor_blog_page_link()
	{
		$front_page_displays = get_option('show_on_front');
		
		if ($front_page_displays == 'posts')
		{
			$home_url = home_url('/');
			efor_blog_page_link_html($home_url);
		}
		else
		{
			$blog_page_id = get_option('page_for_posts');
			
			if ($blog_page_id)
			{
				$blog_page_url = get_page_link($blog_page_id);
				efor_blog_page_link_html($blog_page_url);
			}
		}
	}


/* ============================================================================================================================================= */


	function efor__register_elementor_locations($elementor_theme_manager)
	{
		$elementor_theme_manager->register_location('header');
		$elementor_theme_manager->register_location('footer');
		$elementor_theme_manager->register_location('single');
		$elementor_theme_manager->register_location('archive');
	}
	
	add_action('elementor/theme/register_locations', 'efor__register_elementor_locations');


/* ============================================================================================================================================= */


	function efor__tutor_course_archive_title($before = "", $after = "")
	{
		$title = post_type_archive_title("", false);
		
		if (! empty($title))
		{
			$title = $before . $title . $after;
		}
		
		$title_visibility = get_option(get_the_ID() . 'efor_title_visibility', false);
		
		if ($title_visibility)
		{
			$title_visibility = 'style="display: none;"';
		}
		
		$title_html  = '<div class="post-header post-header-classic tutor-course-archive-header">';
		$title_html .= 		'<header class="entry-header" ' . $title_visibility . '>';
		$title_html .= 			'<h1 class="entry-title">' . $title . '</h1>';
		$title_html .= 		'</header>';
		$title_html .= '</div>';
		
		echo $title_html;
	}
	
	add_filter('tutor_course/archive/before_loop2', 'efor__tutor_course_archive_title');


/* ============================================================================================================================================= */


	add_filter('widget_text', 'do_shortcode');
	
	
	if (is_admin())
	{
		include_once(get_template_directory() . '/admin/theme-options.php');
	}
	
	
	include_once(get_template_directory() . '/admin/pre-get-posts.php');
	
	include_once(get_template_directory() . '/admin/functions-layout-regular.php');
	include_once(get_template_directory() . '/admin/functions-layout-grid.php');
	include_once(get_template_directory() . '/admin/functions-portfolio.php');
	include_once(get_template_directory() . '/admin/functions-woocommerce.php');
	
	include_once(get_template_directory() . '/admin/meta-box-title-visibility.php');
	include_once(get_template_directory() . '/admin/meta-box-sidebar.php');
	include_once(get_template_directory() . '/admin/meta-box-post-style.php');
	include_once(get_template_directory() . '/admin/meta-box-gallery-type.php');
	include_once(get_template_directory() . '/admin/meta-box-featured-area.php');
	
	include_once(get_template_directory() . '/admin/functions-core.php');
	
	include_once(get_template_directory() . '/admin/widget_area-register.php');
	include_once(get_template_directory() . '/admin/widget_area-featured-area.php');
	include_once(get_template_directory() . '/admin/widget_area-sidebar.php');
	
	include_once(get_template_directory() . '/admin/content-none.php');
	include_once(get_template_directory() . '/admin/archive-title.php');
	include_once(get_template_directory() . '/admin/automatic-excerpt.php');
	include_once(get_template_directory() . '/admin/post-meta.php');
	include_once(get_template_directory() . '/admin/about-author.php');
	include_once(get_template_directory() . '/admin/navigation-archive.php');
	include_once(get_template_directory() . '/admin/navigation-single.php');
	include_once(get_template_directory() . '/admin/customizer.php');
	include_once(get_template_directory() . '/admin/install-plugins.php');
	include_once(get_template_directory() . '/admin/demo-import.php');

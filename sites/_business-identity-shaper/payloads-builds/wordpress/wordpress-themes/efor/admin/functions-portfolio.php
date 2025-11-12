<?php

	// For Portfolio Page template and Portfolio Category pages.
	
	function efor_portfolio_page_layout()
	{
		$sidebar = "";
		
		if (is_page_template('page_template-portfolio.php'))
		{
			$sidebar = get_option('efor_select_page_sidebar' . '__' . get_the_ID(), 'No Sidebar'); // Portfolio page sidebar.
		}
		else
		{
			$sidebar = get_theme_mod('efor_setting_sidebar_portfolio_category', 'No'); // Portfolio category sidebar.
		}
		
		$page_layout = 'layout-medium';
		$page_layout = get_theme_mod('efor_setting_portfolio_page_layout', 'layout-medium');
		
		if (($page_layout == 'layout-fixed') && (($sidebar == 'Yes') || ($sidebar != 'No Sidebar')))
		{
			$page_layout = 'layout-medium';
		}
		
		echo esc_attr($page_layout);
	}


/* ============================================================================================================================================= */


	// For single portfolio posts.
	
	function efor_portfolio_item__short_description()
	{
		if (has_excerpt())
		{
			?>
				<p>
					<?php
						echo get_the_excerpt();
					?>
				</p>
			<?php
		}
	}
	
	
	function efor_portfolio_item__feat_img($linked_url = "")
	{
		if (! empty($linked_url))
		{
			$image_big = $linked_url;
			
			?>
				<figure class="wp-caption aligncenter">
					<a href="<?php echo esc_url($image_big); ?>">
						<?php
							the_post_thumbnail('efor_image_size_7');
						?>
					</a>
					<?php
						if (has_excerpt())
						{
							?>
								<figcaption class="wp-caption-text">
									<?php
										echo get_the_excerpt();
									?>
								</figcaption>
							<?php
						}
					?>
				</figure>
			<?php
		}
		else
		{
			if (has_post_thumbnail())
			{
				?>
					<p>
						<?php
							the_post_thumbnail('efor_image_size_7');
						?>
					</p>
				<?php
			}
		}
	}
	
	
	function efor_portfolio_item__format_image()
	{
		if (has_post_thumbnail())
		{
			$image_big 				 = "";
			$feat_img_id 			 = get_post_thumbnail_id();
			$image_big_width_cropped = wp_get_attachment_image_src($feat_img_id, 'efor_image_size_7'); // magnific-popup-width
			
			if ($image_big_width_cropped[1] > $image_big_width_cropped[2])
			{
				$image_big = $image_big_width_cropped[0];
			}
			else
			{
				$image_big_height_cropped = wp_get_attachment_image_src($feat_img_id, 'efor_image_size_8'); // magnific-popup-height
				$image_big 				  = $image_big_height_cropped[0];
			}
			
			efor_portfolio_item__feat_img($linked_url = $image_big);
		}
	}
	
	
	function efor_portfolio_item__format_link()
	{
		$direct_url = efor_core_featured_media__url();
		
		if (! empty($direct_url))
		{
			$new_tab = efor_core_featured_media__new_tab();
			
			?>
				<p>
					<a class="button" <?php if ($new_tab != false) { echo 'target="_blank"'; } ?> href="<?php echo esc_url($direct_url); ?>">
						<?php
							esc_html_e('Go To Link', 'efor');
						?>
					</a>
				</p>
			<?php
		}
	}
	
	
	function efor_portfolio_item__format_audio_video()
	{
		$browser_address_url = efor_core_featured_media__url();
		
		if (! empty($browser_address_url))
		{
			echo efor_iframe_from_xml($browser_address_url);
		}
	}
	
	
	function efor_portfolio_item__format_chooser()
	{
		if (is_singular('portfolio'))
		{
			if (has_post_format('audio') || has_post_format('video'))
			{
				efor_portfolio_item__format_audio_video();
				efor_portfolio_item__short_description();
			}
			elseif (has_post_format('link'))
			{
				efor_portfolio_item__format_link();
				efor_portfolio_item__short_description();
				efor_portfolio_item__feat_img();
			}
			elseif (has_post_format('image'))
			{
				efor_portfolio_item__format_image();
			}
			elseif (has_post_format('gallery'))
			{
				efor_portfolio_item__short_description();
			}
		}
	}


/* ============================================================================================================================================= */


	function efor_single_portfolio_meta()
	{
		if (is_singular('portfolio'))
		{
			?>
				<div class="entry-meta">
					<?php
						efor_meta_like();
						efor_meta_share();
					?>
				</div> <!-- .entry-meta -->
			<?php
		}
	}

?>
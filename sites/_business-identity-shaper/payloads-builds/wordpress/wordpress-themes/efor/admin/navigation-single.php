<?php

	if (! function_exists('efor_single_navigation_html'))
	{
		function efor_single_navigation_html()
		{
			if (wp_attachment_is_image())
			{
				?>
					<nav class="nav-single">
						<div class="nav-previous">
							<div class="nav-desc">
								<?php
									previous_image_link(false, '<span class="meta-nav">&#8592;</span>' . esc_html__('Previous Image', 'efor'));
								?>
							</div>
						</div>
						<div class="nav-next">
							<div class="nav-desc">
								<?php
									next_image_link(false, esc_html__('Next Image', 'efor') . '<span class="meta-nav">&#8594;</span>');
								?>
							</div>
						</div>
					</nav>
				<?php
			}
			else
			{
				$previous_post_link = get_previous_post_link();
				$next_post_link     = get_next_post_link();
				
				if (($previous_post_link != "") || ($next_post_link != ""))
				{
					$previous_post = (is_attachment()) ? get_post(get_post()->post_parent) : get_adjacent_post(false, '', true);
					$next_post     = get_adjacent_post(false, '', false);
					
					?>
						<nav class="nav-single">
							<div class="nav-previous">
								<?php
									if ($previous_post &&  has_post_thumbnail($previous_post->ID))
									{
										$feat_img  = wp_get_attachment_image_src(get_post_thumbnail_id($previous_post->ID), 'efor_image_size_5');
										$feat_img_alt = get_post_meta(get_post_thumbnail_id($previous_post->ID), '_wp_attachment_image_alt', true);
										
										?>
											<a class="nav-image-link" href="<?php echo get_permalink($previous_post->ID); ?>">
												<img alt="<?php echo esc_attr($feat_img_alt); ?>" src="<?php echo esc_url($feat_img[0]); ?>">
											</a>
										<?php
									}
								?>
								
								<?php
									previous_post_link('<div class="nav-desc"><h4>' . esc_html__('Previous Post', 'efor') . '</h4>%link</div>',
													   '<span class="meta-nav">&#8592;</span> %title');
								?>
								
								<?php
									if ($previous_post)
									{
										?>
											<a class="nav-overlay-link" href="<?php echo get_permalink($previous_post->ID); ?>" rel="prev">
												<?php
													echo esc_html($previous_post->post_title);
												?>
											</a>
										<?php
									}
								?>
							</div>
							
							<div class="nav-next">
								<?php
									if ($next_post && has_post_thumbnail($next_post->ID))
									{
										$feat_img = wp_get_attachment_image_src(get_post_thumbnail_id($next_post->ID), 'efor_image_size_5');
										$feat_img_alt = get_post_meta(get_post_thumbnail_id($next_post->ID), '_wp_attachment_image_alt', true);
										
										?>
											<a class="nav-image-link" href="<?php echo get_permalink($next_post->ID); ?>">
												<img alt="<?php echo esc_attr($feat_img_alt); ?>" src="<?php echo esc_url($feat_img[0]); ?>">
											</a>
										<?php
									}
								?>
								
								<?php
									next_post_link('<div class="nav-desc"><h4>' . esc_html__('Next Post', 'efor') . '</h4>%link</div>',
												   '%title <span class="meta-nav">&#8594;</span>');
								?>
								
								<?php
									if ($next_post)
									{
										?>
											<a class="nav-overlay-link" href="<?php echo get_permalink($next_post->ID); ?>" rel="next">
												<?php
													echo esc_html($next_post->post_title);
												?>
											</a>
										<?php
									}
								?>
							</div>
						</nav>
					<?php
				}
			}
		}
	}
	
	
	if (! function_exists('efor_single_navigation'))
	{
		function efor_single_navigation()
		{
			$post_navigation = get_theme_mod('efor_setting_post_navigation', 'Yes');
			
			if ($post_navigation != 'No')
			{
				efor_single_navigation_html();
			}
		}
	}

?>
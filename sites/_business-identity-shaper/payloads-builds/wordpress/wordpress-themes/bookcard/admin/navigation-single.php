<?php

	if (! function_exists('bookcard_single_navigation_html'))
	{
		function bookcard_single_navigation_html()
		{
			if (wp_attachment_is_image())
			{
				?>
					<nav class="nav-single row">
						<div class="nav-previous col-sm-6">
							<h2>
								<?php
									$previous_link_title__pre_text = '<span class="meta-nav">&#8592;</span>';
									$previous_link_title__text = esc_html__('Previous Image', 'bookcard');
									
									previous_image_link(
										false,
										$previous_link_title__pre_text . $previous_link_title__text
									);
								?>
							</h2>
						</div> <!-- .nav-previous .col-sm-6 -->
						<div class="nav-next col-sm-6">
							<h2>
								<?php
									next_image_link(
										false,
										esc_html__('Next Image', 'bookcard') . '<span class="meta-nav">&#8594;</span>'
									);
								?>
							</h2>
						</div> <!-- .nav-next .col-sm-6 -->
					</nav> <!-- .nav-single .row -->
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
						<nav class="nav-single row">
							<div class="nav-previous col-sm-6">
								<?php
									$previous_link__pre_html = '<h6>' . esc_html__('Previous Post', 'bookcard') . '</h6>';
									$previous_link__html = '<h2>' . '%link' . '</h2>';
									
									$previous_link_title__pre_text = '<span class="meta-nav">&#8592;</span>' . ' ';
									$previous_link_title__text = '%title';
									
									previous_post_link(
										$previous_link__pre_html . $previous_link__html,
										$previous_link_title__pre_text . $previous_link_title__text
									);
								?>
							</div> <!-- .nav-previous .col-sm-6 -->
							<div class="nav-next col-sm-6">
								<?php
									$next_link__pre_html = '<h6>' . esc_html__('Next Post', 'bookcard') . '</h6>';
									$next_link__html = '<h2>' . '%link' . '</h2>';
									
									$next_link_title__after_text = ' ' . '<span class="meta-nav">&#8594;</span>';
									$next_link_title__text = '%title';
									
									next_post_link(
										$next_link__pre_html . $next_link__html,
										$next_link_title__text . $next_link_title__after_text
									);
								?>
							</div> <!-- .nav-next .col-sm-6 -->
						</nav> <!-- .nav-single .row -->
					<?php
				}
			}
		}
	}
	
	
	if (! function_exists('bookcard_single_navigation'))
	{
		function bookcard_single_navigation()
		{
			$post_navigation = get_theme_mod('bookcard_setting_post_navigation', 'Yes');
			
			if ($post_navigation != 'No')
			{
				bookcard_single_navigation_html();
			}
		}
	}

?>
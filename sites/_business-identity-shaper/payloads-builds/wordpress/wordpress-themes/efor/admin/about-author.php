<?php

	function efor_about_author_html()
	{
		?>
			<aside class="about-author">
				<h3 class="widget-title">
					<span>
						<?php
							esc_html_e('Written By', 'efor');
						?>
					</span>
				</h3> <!-- .widget-title -->
				
				<div class="author-bio">
					<div class="author-img">
						<a href="<?php echo get_author_posts_url(get_the_author_meta('ID')); ?>">
							<?php
								echo get_avatar(get_the_author_meta('user_email'), 300, "", get_the_author_meta('display_name'));
							?>
						</a>
					</div> <!-- .author-img -->
					<div class="author-info">
						<h4 class="author-name">
							<?php
								the_author();
							?>
						</h4> <!-- .author-name -->
						<p>
							<?php	
								echo get_the_author_meta('description');
							?>
						</p>
						<?php
							dynamic_sidebar('efor_sidebar_8');
						?>
					</div> <!-- .author-info -->
				</div> <!-- .author-bio -->
			</aside> <!-- .about-author -->
		<?php
	}
	
	
	function efor_about_author()
	{
		if (is_singular('post'))
		{
			$author_info_box   = get_theme_mod('efor_setting_author_info_box', 'yes_with_bio_info');
			$biographical_info = get_the_author_meta('description');
			
			if ($author_info_box == 'yes')
			{
				efor_about_author_html();
			}
			elseif (($author_info_box == 'yes_with_bio_info') && (! empty($biographical_info)))
			{
				efor_about_author_html();
			}
		}
	}

?>
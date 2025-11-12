<?php

	function efor_blog_navigation()
	{
		$numbered_pagination = get_theme_mod('efor_setting_numbered_pagination', 'No');
		
		if ($numbered_pagination == 'Yes')
		{
			the_posts_pagination(
				array(
					'screen_reader_text' => esc_html__('Posts navigation', 'efor'),
					'prev_text'          => esc_html__('Prev', 'efor'),
					'next_text'          => esc_html__('Next', 'efor'),
					'end_size'           => 1,
					'mid_size'           => 1,
					'before_page_number' => '<span class="meta-nav screen-reader-text">' . esc_html__('Page', 'efor') . ' </span>'
				)
			);
		}
		else
		{
			$next_posts_link     = get_next_posts_link();
			$previous_posts_link = get_previous_posts_link();
			
			if (($next_posts_link != "") || ($previous_posts_link != ""))
			{
				?>
					<nav class="navigation" role="navigation">
						<div class="nav-previous">
							<?php
								next_posts_link('&#8592; ' . esc_html__('Older Posts', 'efor'));
							?>
						</div> <!-- .nav-previous -->
						<div class="nav-next">
							<?php
								previous_posts_link(esc_html__('Newer Posts', 'efor') . ' &#8594;');
							?>
						</div> <!-- .nav-next -->
					</nav> <!-- .navigation -->
				<?php
			}
		}
	}

?>
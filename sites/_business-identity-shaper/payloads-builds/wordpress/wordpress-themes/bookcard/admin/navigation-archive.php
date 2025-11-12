<?php

	function bookcard_archive_navigation()
	{
		$numbered_pagination = get_theme_mod('bookcard_setting_numbered_pagination', 'No');
		
		if ($numbered_pagination == 'Yes')
		{
			the_posts_pagination(
				array(
					'screen_reader_text' => esc_html__('Posts Navigation', 'bookcard'),
					'prev_text'          => esc_html__('Prev', 'bookcard'),
					'next_text'          => esc_html__('Next', 'bookcard'),
					'end_size' 			 => 1,
					'mid_size' 			 => 1,
					'before_page_number' => '<span class="meta-nav screen-reader-text">' . esc_html__('Page', 'bookcard') . ' </span>'
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
								next_posts_link(
									'<span class="meta-nav">&#8592;</span>' . esc_html__('Older Posts', 'bookcard')
								);
							?>
						</div> <!-- .nav-previous -->
						<div class="nav-next">
							<?php
								previous_posts_link(
									esc_html__('Newer Posts', 'bookcard') . '<span class="meta-nav">&#8594;</span>'
								);
							?>
						</div> <!-- .nav-next -->
					</nav> <!-- .navigation -->
				<?php
			}
		}
	}

?>
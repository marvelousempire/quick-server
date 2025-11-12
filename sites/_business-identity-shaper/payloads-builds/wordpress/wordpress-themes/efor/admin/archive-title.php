<?php

	function efor_archive_title()
	{
		if (! is_front_page())
		{
			?>
				<div class="post-header post-header-classic archive-header">
					<?php
						$title_visibility = false;
						$blog_page_id     = get_option('page_for_posts');
						
						if ($blog_page_id)
						{
							$title_visibility = get_option($blog_page_id . 'efor_title_visibility', false);
						}
					?>
					<header class="entry-header" <?php if (is_home() && ($title_visibility == true)) { echo 'style="display: none;"'; } ?>>
						<h1 class="entry-title">
							<?php
								if (is_search())
								{
									?><i><?php esc_html_e('You Searched for', 'efor'); ?></i><span class="cat-title"><?php the_search_query(); ?></span> <!-- .cat-title --><?php
								}
								elseif (is_category())
								{
									?><i><?php esc_html_e('Browsing Category', 'efor'); ?></i><span class="cat-title"><?php single_term_title(); ?></span> <!-- .cat-title --><?php
								}
								elseif (is_tag())
								{
									?><i><?php esc_html_e('Posts Tagged', 'efor'); ?></i><span class="cat-title"><?php single_term_title(); ?></span> <!-- .cat-title --><?php
								}
								elseif (is_author())
								{
									?><i><?php esc_html_e('Posts Published by', 'efor'); ?></i><span class="cat-title"><?php the_author(); ?></span> <!-- .cat-title --><?php
								}
								elseif (is_date())
								{
									?>
										<i><?php esc_html_e('Date Archives', 'efor'); ?></i>
										
										<span class="cat-title">
											<?php
												$date_format = "";
												
												if (is_year())
												{
													$date_format = esc_html_x('Y', 'Yearly archives date format.', 'efor');
												}
												elseif (is_month())
												{
													$date_format = esc_html_x('F Y', 'Monthly archives date format.', 'efor');
												}
												
												echo get_the_date($date_format);
											?>
										</span> <!-- .cat-title -->
									<?php
								}
								elseif (is_tax('post_format'))
								{
									?><i><?php esc_html_e('Post Format Archives', 'efor'); ?></i><span class="cat-title"><?php single_term_title(); ?></span> <!-- .cat-title --><?php
								}
								elseif (is_post_type_archive())
								{
									?><i><?php esc_html_e('Post Type Archives', 'efor'); ?></i><span class="cat-title"><?php post_type_archive_title(); ?></span> <!-- .cat-title --><?php
								}
								elseif (is_archive())
								{
									?><i><?php esc_html_e('Archives', 'efor'); ?></i><span class="cat-title"><?php single_term_title(); ?></span> <!-- .cat-title --><?php
								}
								else
								{
									?><span class="cat-title"><?php single_post_title(); ?></span> <!-- .cat-title --><?php
								}
								
								the_archive_description('<div class="category-description">', '</div> <!-- .category-description -->');
							?>
						</h1> <!-- .entry-title -->
					</header> <!-- .entry-header -->
				</div> <!-- .post-header .post-header-classic .archive-header -->
			<?php
		}
	}

?>
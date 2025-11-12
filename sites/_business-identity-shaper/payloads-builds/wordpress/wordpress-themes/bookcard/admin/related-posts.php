<?php

	if (! function_exists('bookcard_related_posts_html'))
	{
		function bookcard_related_posts_html()
		{
			$category_ids = "";
			$categories   = get_the_category();
			
			if ($categories)
			{
				foreach ($categories as $category)
				{
					$category_ids .= $category->cat_ID . ',';
				}
				
				$category_ids = trim($category_ids, ',');
			}
			
			$exclude_ids    = array(get_the_ID());
			$orderby        = get_theme_mod('bookcard_setting_related_posts_order', 'relevance');
			$posts_per_page = get_theme_mod('bookcard_setting_related_posts_count', '3');
			
			if (! empty($posts_per_page))
			{
				$posts_per_page = intval($posts_per_page);
			}
			else
			{
				$posts_per_page = 3;
			}
			
			$query = new WP_Query(
				array(
					'post_type'      => 'post',
					'cat'            => $category_ids,
					'post__not_in'   => $exclude_ids,
					'orderby'        => $orderby,
					'posts_per_page' => $posts_per_page
				)
			);
			
			if ($query->have_posts()) :
				?>
					<div class="related-posts">
						<div class="section-title center">    
							<h2>
								<?php
									esc_html_e('Related Posts', 'bookcard');
								?>
							</h2>
						</div> <!-- .section-title .center -->
						<div class="latest-posts media-grid">
							<?php
								while ($query->have_posts()) : $query->the_post();
									?>
										<article class="media-cell">
											<?php
												if (has_post_thumbnail())
												{
													?>
														<div class="media-box">
															<a href="<?php the_permalink(); ?>">
																<?php
																	the_post_thumbnail('bookcard_image_size_3');
																?>
															</a>
														</div> <!-- .media-box -->
													<?php
												}
											?>
											<header class="media-cell-desc">
												<h2>
													<a href="<?php the_permalink(); ?>">
														<?php
															the_title();
														?>
													</a>
												</h2>
											</header> <!-- .media-cell-desc -->
										</article> <!-- .media-cell -->
									<?php
								endwhile;
							?>
						</div> <!-- .latest-posts .media-grid -->
					</div> <!-- .related-posts -->
				<?php
			endif;
			wp_reset_postdata();
		}
	}
	
	
	if (! function_exists('bookcard_related_posts'))
	{
		function bookcard_related_posts()
		{
			$related_posts = get_theme_mod('bookcard_setting_related_posts', 'Yes');
			
			if (($related_posts != 'No') && is_singular('post'))
			{
				bookcard_related_posts_html();
			}
		}
	}

?>
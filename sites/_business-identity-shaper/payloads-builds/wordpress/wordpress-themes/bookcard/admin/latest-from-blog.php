<?php

	function bookcard_latest_from_blog()
	{
		$query = new WP_Query(
			array(
				'post_type'           => 'post',
				'ignore_sticky_posts' => true,
				'posts_per_page'      => 1
			)
		);
		
		if ($query->have_posts()) :
			?>
				<div class="latest-from-blog">
					<h3>
						<?php
							esc_attr_e('Latest From The Blog', 'bookcard');
						?>
						<?php
							bookcard_blog_page_link();
						?>
					</h3>
					<div class="blog-bar">
						<?php
							while ($query->have_posts()) : $query->the_post();
								?>
									<h2>
										<a href="<?php the_permalink(); ?>">
											<?php
												the_title();
											?>
										</a>
									</h2>
								<?php
							endwhile;
						?>
					</div> <!-- .blog-bar -->
				</div> <!-- .latest-from-blog -->
			<?php
		endif;
		wp_reset_postdata();
	}

?>
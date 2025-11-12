<?php
	global $efor_sidebar;
	efor_sidebar_yes_no();
?>

<?php
	efor_featured_area();
?>

<div id="main" class="site-main">
	<div class="layout-medium">
		<div id="primary" class="content-area <?php echo esc_attr($efor_sidebar); ?>">
			<div id="content" class="site-content" role="main">
				<?php
					efor_archive_title();
				?>
				
				<?php
					$efor_1st_full = efor_1st_full_yes_no();
				?>
				
				<div class="blog-grid-wrap">
					<div class="blog-stream blog-grid blog-small masonry <?php if ($efor_1st_full == 'Yes') { echo 'first-full'; } ?>" data-layout="<?php echo efor_blog_grid_type(); ?>" data-item-width="<?php efor_blog_grid_post_width(); ?>">
						<?php
							if (have_posts()) :
								while (have_posts()) : the_post();
									?>
										<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
											<div class="hentry-wrap">
												<?php
													if ($efor_1st_full == 'Yes')
													{
														efor_featured_media__layout_grid($first_full = 'Yes', efor_blog_grid_type());
														$efor_1st_full = 'No';
													}
													else
													{
														efor_featured_media__layout_grid($first_full = 'No', efor_blog_grid_type());
													}
												?>
												<div class="hentry-middle">
													<header class="entry-header">
														<?php
															efor_meta('above_title');
														?>
														<h2 class="entry-title">
															<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
														</h2>
														<?php
															efor_meta('below_title');
														?>
													</header> <!-- .entry-header -->
													<div class="entry-content">
														<?php
															efor_content();
														?>
													</div> <!-- .entry-content -->
													<?php
														efor_meta('below_content');
													?>
												</div> <!-- .hentry-middle -->
											</div> <!-- .hentry-wrap -->
										</article>
									<?php
								endwhile;
							else :
							
								efor_content_none();
							
							endif;
						?>
					</div> <!-- .blog-stream .blog-grid .blog-small .masonry -->
				</div> <!-- .blog-grid-wrap -->
				<?php
					efor_blog_navigation();
				?>
			</div> <!-- #content .site-content -->
		</div> <!-- #primary .content-area -->
		<?php
			if ($efor_sidebar != "")
			{
				efor_sidebar();
			}
		?>
	</div> <!-- .layout-medium -->
</div> <!-- #main .site-main -->

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
				
				<div class="blog-stream blog-list blog-small <?php if ($efor_1st_full == 'Yes') { echo 'first-full'; } ?>">
					<?php
						if (have_posts()) :
							while (have_posts()) : the_post();
								?>
									<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
										<?php
											if (has_post_thumbnail())
											{
												$feat_img = "";
												
												if ($efor_1st_full == 'Yes')
												{
													$feat_img = wp_get_attachment_image_src(get_post_thumbnail_id(), 'efor_image_size_1');
												}
												else
												{
													$feat_img = wp_get_attachment_image_src(get_post_thumbnail_id(), 'efor_image_size_1');
												}
												
												?>
													<div class="featured-image" style="background-image: url(<?php echo esc_url($feat_img[0]); ?>);">
														<a href="<?php the_permalink(); ?>">
															<?php
																if ($efor_1st_full == 'Yes')
																{
																	the_post_thumbnail('efor_image_size_1');
																	$efor_1st_full = 'No';
																}
																else
																{
																	the_post_thumbnail('efor_image_size_1');
																}
															?>
														</a>
													</div> <!-- .featured-image -->
												<?php
											}
										?>
										<div class="hentry-middle">
											<header class="entry-header">
												<?php
													efor_meta('above_title');
												?>
												<h2 class="entry-title">
													<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
												</h2> <!-- .entry-title -->
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
									</article>
								<?php
							endwhile;
						else :
						
							efor_content_none();
						
						endif;
					?>
				</div> <!-- .blog-stream .blog-list .blog-small -->
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

<?php
/*
Template Name: Latest Posts
*/
?>

<?php
	get_header();
?>

<?php
	$efor_select_page_featured_area = get_option('efor_select_page_featured_area' . '__' . get_the_ID(), 'No Featured Area');
	
	if ((! isset($_GET['featured_area'])) && is_active_sidebar($efor_select_page_featured_area))
	{
		?>
			<section class="top-content">
				<div class="layout-medium">
					<div class="featured-area">
						<?php
							dynamic_sidebar($efor_select_page_featured_area);
						?>
					</div> <!-- .featured-area -->
				</div> <!-- .layout-medium -->
			</section> <!-- .top-content -->
		<?php
	}
?>

<?php
	$efor_select_page_sidebar = get_option('efor_select_page_sidebar' . '__' . get_the_ID(), 'No Sidebar');
?>

<div id="main" class="site-main">
	<div class="<?php if ($efor_select_page_sidebar != 'No Sidebar') { echo 'layout-medium'; } else { echo 'layout-fixed'; } ?>">
		<div id="primary" class="content-area <?php if ($efor_select_page_sidebar != 'No Sidebar') { echo 'with-sidebar'; } ?>">
			<div id="content" class="site-content" role="main">
				<?php
					while (have_posts()) : the_post();
						?>
							<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
								<?php
									if (has_post_thumbnail())
									{
										?>
											<div class="featured-image">
												<?php
													the_post_thumbnail('efor_image_size_1');
												?>
											</div>
										<?php
									}
								?>
								<div class="entry-content">
									<?php
										efor_content();
									?>
									
									<?php
										$query = new WP_Query(array('post_type'      => 'post',
																	'posts_per_page' => 5));
										
										if ($query->have_posts()) :
											?>
												<h3 class="widget-title section-title">
													<span><?php esc_html_e('Latest From The Blog', 'efor'); ?></span>
												</h3>
												
												<div class="blog-simple">
													<?php
														while ($query->have_posts()) : $query->the_post();
															?>
																<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
																	<div class="hentry-left">
																		<div class="entry-date">
																			<span class="day">
																				<?php
																					echo get_the_date('d');
																				?>
																			</span>
																			<span class="month">
																				<?php
																					echo get_the_date('M');
																				?>
																			</span>
																			<span class="year">
																				<?php
																					echo get_the_date('Y');
																				?>
																			</span>
																		</div>
																		<?php
																			if (has_post_thumbnail())
																			{
																				$feat_img = wp_get_attachment_image_src(get_post_thumbnail_id(), 'efor_image_size_5');
																				
																				?>
																					<div class="featured-image" style="background-image: url(<?php echo esc_url($feat_img[0]); ?>);"></div>
																				<?php
																			}
																		?>
																	</div>
																	<div class="hentry-middle">
																		<h2 class="entry-title">
																			<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
																		</h2>
																	</div>
																	<a class="post-link" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
																</article>
															<?php
														endwhile;
													?>
												</div>
											<?php
										endif;
										wp_reset_postdata();
									?>
									
									<?php
										efor_blog_page_link();
									?>
								</div>
							</article>
						<?php
					endwhile;
				?>
			</div>
		</div>
		<?php
			if ($efor_select_page_sidebar != 'No Sidebar')
			{
				efor_sidebar();
			}
		?>
	</div>
</div>

<?php
	get_footer();
?>
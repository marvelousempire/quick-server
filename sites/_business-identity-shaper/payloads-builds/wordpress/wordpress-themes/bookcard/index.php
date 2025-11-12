<?php
	get_header();
?>

<div class="site-middle">
	<div class="layout-medium">
		<div id="primary" class="content-area <?php bookcard_sidebar($class = true); ?>">
			<div id="content" class="site-content" role="main">
				<div class="blog-regular page-layout">
					<?php
						bookcard_archive_title();
					?>
					
					<?php
						if (have_posts()) :
							while (have_posts()) : the_post();
								?>
									<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
										<header class="entry-header">
											<h2 class="entry-title">
												<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
											</h2> <!-- .entry-title -->
											<?php
												bookcard_meta();
											?>
										</header> <!-- .entry-header -->
										<?php
											if (has_post_thumbnail())
											{
												?>
													<div class="featured-image">
														<a href="<?php the_permalink(); ?>">
															<?php
																the_post_thumbnail('resume_blog_3_feat_img');
															?>
														</a>
													</div>
												<?php
											}
										?>
										<div class="entry-content">
											<?php
												bookcard_content();
											?>
										</div> <!-- .entry-content -->
									</article> <!-- .post -->
								<?php
							endwhile;
						else :
						
							bookcard_content_none();
						
						endif;
					?>
					<?php
						bookcard_archive_navigation();
					?>
				</div> <!-- .blog-regular .page-layout -->
			</div> <!-- #content .site-content -->
		</div> <!-- #primary .content-area -->
		<?php
			bookcard_sidebar();
		?>
	</div> <!-- .layout-medium -->
</div> <!-- .site-middle -->

<?php
	get_footer();
?>
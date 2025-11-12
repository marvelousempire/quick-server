<?php
	get_header();
?>

<div class="site-middle">
	<div class="layout-medium">
		<div id="primary" class="content-area <?php bookcard_sidebar($class = true); ?>">
			<div id="content" class="site-content" role="main">
				<div class="blog-single page-layout">
					<?php
						while (have_posts()) : the_post();
							?>
								<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
									<header class="entry-header">
										<h2 class="entry-title">
											<?php
												the_title();
											?>
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
													<?php
														the_post_thumbnail('resume_blog_3_feat_img');
													?>
												</div>
											<?php
										}
									?>
									<div class="entry-content">
										<?php
											bookcard_content();
										?>
										<?php
											bookcard_post_tags();
										?>
									</div> <!-- .entry-content -->
									<?php
										bookcard_related_posts();
									?>
								</article> <!-- .post -->
								<?php
									bookcard_single_navigation();
								?>
								<?php
									comments_template("", true);
								?>
							<?php
						endwhile;
					?>
				</div> <!-- .blog-single .page-layout -->
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
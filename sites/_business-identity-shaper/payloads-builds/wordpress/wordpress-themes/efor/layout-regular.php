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
				<div class="blog-stream blog-regular">
					<?php
						if (have_posts()) :
							while (have_posts()) : the_post();
								?>
									<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
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
										<?php
											efor_featured_media__layout_regular();
										?>
										<div class="entry-content">
											<?php
												efor_content();
											?>
										</div> <!-- .entry-content -->
										<?php
											efor_meta('below_content');
										?>
									</article>
								<?php
							endwhile;
						else :
						
							efor_content_none();
						
						endif;
					?>
					<?php
						efor_blog_navigation();
					?>
				</div> <!-- .blog-stream .blog-regular -->
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

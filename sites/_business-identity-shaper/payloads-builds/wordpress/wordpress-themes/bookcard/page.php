<?php
	$front_cover_page = stripcslashes(get_option('front_cover_page', ""));
	$resume_page      = stripcslashes(get_option('resume_page', ""));
	$pf_page          = stripcslashes(get_option('pf_page', ""));
	$contact_page     = stripcslashes(get_option('contact_page', ""));
	
	$page_all_info = get_post(get_the_ID());
	$slug          = $page_all_info->post_name;
	
	if (($slug == $front_cover_page) || ($slug == $resume_page) || ($slug == $contact_page) || ($slug == $pf_page))
	{
		wp_redirect(home_url() . '/#/' . $slug);
	}
?>

<?php
	get_header();
?>

<?php
	$bookcard_select_page_sidebar = get_option('bookcard_select_page_sidebar' . '__' . get_the_ID(), 'No Sidebar');
?>

<div class="site-middle">
	<div class="layout-medium">
		<div id="primary" class="content-area <?php if ($bookcard_select_page_sidebar != 'No Sidebar') { echo 'with-sidebar'; } ?>">
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
									</div> <!-- .entry-content -->
								</article> <!-- .post -->
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
			if ($bookcard_select_page_sidebar != 'No Sidebar')
			{
				bookcard_sidebar();
			}
		?>
	</div> <!-- .layout-medium -->
</div> <!-- .site-middle -->

<?php
	get_footer();
?>
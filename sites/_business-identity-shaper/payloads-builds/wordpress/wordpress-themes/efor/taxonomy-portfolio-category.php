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
	$efor_sidebar_portfolio_category = get_theme_mod('efor_setting_sidebar_portfolio_category', 'No');
?>

<div id="main" class="site-main">
	<div class="<?php efor_portfolio_page_layout(); ?>">
		<div id="primary" class="content-area <?php if ($efor_sidebar_portfolio_category == 'Yes') { echo 'with-sidebar'; } ?>">
			<div id="content" class="site-content" role="main">
				<div class="post-header portfolio-header post-header-classic">
					<header class="entry-header">
						<h1 class="entry-title">
							<?php
								single_cat_title();
							?>
						</h1> <!-- .entry-title -->
					</header> <!-- .entry-header -->
				</div> <!-- .post-header-classic -->
				
				<ul id="filters" class="filters">
					<?php
						$efor_queried_category_id = get_queried_object_id();
						
						$efor_categories = get_categories(
							array(
								'type'     => 'portfolio',
								'taxonomy' => 'portfolio-category',
								'parent'   => $efor_queried_category_id
							)
						); // Get categories under the queried category.
						
						if (count($efor_categories) >= 1)
						{
							?>
								<li class="current">
									<a data-filter="*" href="#">
										<?php
											esc_html_e('all', 'efor');
										?>
									</a>
								</li>
							<?php
						}
						
						foreach ($efor_categories as $category)
						{
							?>
								<li>
									<a data-filter=".<?php echo esc_attr($category->slug); ?>" href="<?php echo esc_url(get_category_link($category->term_id)); ?>">
										<?php
											echo esc_html($category->name);
										?>
									</a>
								</li>
							<?php
						}
					?>
				</ul> <!-- #filters .filters -->
				
				<?php
					$efor_portfolio_page_post_width = get_theme_mod('efor_setting_portfolio_page_post_width', '320');
				?>
				
				<?php
					$efor_portfolio_page_grid_type_layout = 'masonry';
					$efor_portfolio_page_grid_type 		= get_theme_mod('efor_setting_portfolio_page_grid_type', 'masonry'); // Also used for feat-img below.
					
					if (($efor_portfolio_page_grid_type == 'fitRows_square') || ($efor_portfolio_page_grid_type == 'fitRows_wide'))
					{
						$efor_portfolio_page_grid_type_layout = 'fitRows';
					}
				?>
				
				<div class="blog-grid-wrap">
					<div class="blog-stream blog-grid blog-small portfolio-grid masonry" data-layout="<?php echo esc_attr($efor_portfolio_page_grid_type_layout); ?>" data-item-width="<?php echo esc_attr($efor_portfolio_page_post_width); ?>">
						<?php
							function efor_portfolio_item_feat_img($efor_portfolio_page_grid_type)
							{
								if ($efor_portfolio_page_grid_type == 'fitRows_square')
								{
									the_post_thumbnail('efor_image_size_3');
								}
								elseif ($efor_portfolio_page_grid_type == 'fitRows_wide')
								{
									the_post_thumbnail('efor_image_size_4');
								}
								else
								{
									the_post_thumbnail('efor_image_size_2');
								}
							}
							
							function efor_portfolio_item_feat_img__lightbox_gallery($efor_portfolio_page_grid_type)
							{
								if ($efor_portfolio_page_grid_type == 'fitRows_square')
								{
									return get_the_post_thumbnail(null, 'efor_image_size_3');
								}
								elseif ($efor_portfolio_page_grid_type == 'fitRows_wide')
								{
									return get_the_post_thumbnail(null, 'efor_image_size_4');
								}
								else
								{
									return get_the_post_thumbnail(null, 'efor_image_size_2');
								}
							}
						?>
						
						<?php
							function efor_portfolio_item_type_content__standard($feat_img, $efor_portfolio_page_grid_type)
							{
								?>
									<a href="<?php the_permalink(); ?>">
										<?php
											if ($feat_img)
											{
												efor_portfolio_item_feat_img($efor_portfolio_page_grid_type);
											}
											else
											{
												the_title();
											}
										?>
									</a>
								<?php
							}
						?>
						
						<?php
							function efor_portfolio_item_type_content__lightbox_feat_img($feat_img, $efor_portfolio_page_grid_type)
							{
								$feat_img_url = "";
								$feat_img_id  = get_post_thumbnail_id();
								$feat_img_url_width_cropped = wp_get_attachment_image_src($feat_img_id, 'efor_image_size_7');  // magnific-popup-width
								
								if ($feat_img_url_width_cropped[1] > $feat_img_url_width_cropped[2])
								{
									$feat_img_url = $feat_img_url_width_cropped[0];
								}
								else
								{
									$feat_img_url_height_cropped = wp_get_attachment_image_src($feat_img_id, 'efor_image_size_8'); // magnific-popup-height
									$feat_img_url = $feat_img_url_height_cropped[0];
								}
								
								?>
									<a class="lightbox" title="<?php the_title_attribute(); ?>" href="<?php echo esc_url($feat_img_url); ?>">
										<?php
											if ($feat_img)
											{
												efor_portfolio_item_feat_img($efor_portfolio_page_grid_type);
											}
											else
											{
												the_title();
											}
										?>
									</a>
								<?php
							}
						?>
						
						<?php
							global $efor_portfolio_item_has_feat_img;
							global $efor_portfolio_page_grid_type__lightbox_gallery;
							
							function efor_portfolio_item_type_content__lightbox_gallery($feat_img, $efor_portfolio_page_grid_type)
							{
								the_content();
							}
						?>
						
						<?php
							function efor_portfolio_item_type_content__lightbox_audio($feat_img, $efor_portfolio_page_grid_type)
							{
								$browser_address_url = efor_core_featured_media__url();
								
								if (! empty($browser_address_url))
								{
									$xml_url 	   = 'http://soundcloud.com/oembed?url=' . $browser_address_url;
									$xml_content   = simplexml_load_file($xml_url);
									$xml_attribute = $xml_content->html; // Get iframe.
									preg_match_all('#src=([\'"])(.+?)\1#is', $xml_attribute, $out); // Split iframe.
									$url = $out[2][0]; // Get url.
									
									?>
										<a class="lightbox mfp-iframe" title="<?php the_title_attribute(); ?>" href="<?php echo esc_url($url); ?>">
											<?php
												if ($feat_img)
												{
													efor_portfolio_item_feat_img($efor_portfolio_page_grid_type);
												}
												else
												{
													the_title();
												}
											?>
										</a>
									<?php
								}
							}
						?>
						
						<?php
							function efor_portfolio_item_type_content__lightbox_video($feat_img, $efor_portfolio_page_grid_type)
							{
								$browser_address_url = efor_core_featured_media__url();
								
								if (! empty($browser_address_url))
								{
									?>
										<a class="lightbox mfp-iframe" title="<?php the_title_attribute(); ?>" href="<?php echo esc_url($browser_address_url); ?>">
											<?php
												if ($feat_img)
												{
													efor_portfolio_item_feat_img($efor_portfolio_page_grid_type);
												}
												else
												{
													the_title();
												}
											?>
										</a>
									<?php
								}
							}
						?>
						
						<?php
							function efor_portfolio_item_type_content__direct_url($feat_img, $efor_portfolio_page_grid_type)
							{
								$direct_url = efor_core_featured_media__url();
								
								if (! empty($direct_url))
								{
									$new_tab = efor_core_featured_media__new_tab();
									
									?>
										<a <?php if ($new_tab != false) { echo 'target="_blank"'; } ?> href="<?php echo esc_url($direct_url); ?>">
											<?php
												if ($feat_img)
												{
													efor_portfolio_item_feat_img($efor_portfolio_page_grid_type);
												}
												else
												{
													the_title();
												}
											?>
										</a>
									<?php
								}
							}
						?>
						
						<?php
							function efor_portfolio_item_type_content_selector($portfolio_item_format, $feat_img, $efor_portfolio_page_grid_type)
							{
								if ($portfolio_item_format == 'image')
								{
									efor_portfolio_item_type_content__lightbox_feat_img($feat_img, $efor_portfolio_page_grid_type);
								}
								elseif ($portfolio_item_format == 'gallery')
								{
									efor_portfolio_item_type_content__lightbox_gallery($feat_img, $efor_portfolio_page_grid_type);
								}
								elseif ($portfolio_item_format == 'audio')
								{
									efor_portfolio_item_type_content__lightbox_audio($feat_img, $efor_portfolio_page_grid_type);
								}
								elseif ($portfolio_item_format == 'video')
								{
									efor_portfolio_item_type_content__lightbox_video($feat_img, $efor_portfolio_page_grid_type);
								}
								elseif ($portfolio_item_format == 'link')
								{
									efor_portfolio_item_type_content__direct_url($feat_img, $efor_portfolio_page_grid_type);
								}
								else
								{
									efor_portfolio_item_type_content__standard($feat_img, $efor_portfolio_page_grid_type);
								}
							}
						?>
						
						<?php
							$efor_queried_category_slug = get_query_var('term');
							
							$efor_query = new WP_Query(
								array(
									'post_type'          => 'portfolio',
									'portfolio-category' => $efor_queried_category_slug,
									'posts_per_page'     => -1
								)
							);
							
							if ($efor_query->have_posts()) :
								while ($efor_query->have_posts()) : $efor_query->the_post();
									?>
										<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
											<div class="hentry-wrap">
												<?php
													$portfolio_item_format = get_post_format();
												?>
												<?php
													if (has_post_thumbnail())
													{
														?>
															<div class="featured-image">
																<?php
																	$efor_portfolio_item_has_feat_img = true;
																	$efor_portfolio_page_grid_type__lightbox_gallery = $efor_portfolio_page_grid_type;
																	efor_portfolio_item_type_content_selector($portfolio_item_format, $feat_img = true, $efor_portfolio_page_grid_type);
																?>
															</div> <!-- .featured-image -->
														<?php
													}
												?>
												<div class="hentry-middle">
													<header class="entry-header">
														<h2 class="entry-title">
															<?php
																$efor_portfolio_item_has_feat_img = false;
																$efor_portfolio_page_grid_type__lightbox_gallery = $efor_portfolio_page_grid_type;
																efor_portfolio_item_type_content_selector($portfolio_item_format, $feat_img = false, $efor_portfolio_page_grid_type);
															?>
														</h2> <!-- .entry-title -->
														<?php
															if (has_excerpt())
															{
																?>
																	<div class="entry-meta">
																		<span class="portfolio-excerpt">
																			<?php
																				echo get_the_excerpt();
																			?>
																		</span> <!-- .portfolio-excerpt -->
																	</div> <!-- .entry-meta -->
																<?php
															}
														?>
													</header> <!-- .entry-header -->
												</div> <!-- .hentry-middle -->
											</div> <!-- .hentry-wrap -->
										</div> <!-- .hentry -->
									<?php
								endwhile;
							endif;
							wp_reset_postdata();
						?>
					</div> <!-- .blog-stream .blog-grid .blog-small .portfolio-grid .masonry -->
				</div> <!-- .blog-grid-wrap -->
				
				<?php
					$efor_category_description = category_description();
					
					if (! empty($efor_category_description))
					{
						?>
							<article id="post-<?php echo esc_attr($efor_queried_category_id); ?>">
								<div class="entry-content">
									<?php
										echo esc_html($efor_category_description);
									?>
								</div> <!-- .entry-content -->
							</article> <!-- Category Descriptio -->
						<?php
					}
				?>
			</div> <!-- #content .site-content -->
		</div> <!-- #primary .content-area -->
		<?php
			if ($efor_sidebar_portfolio_category == 'Yes')
			{
				efor_sidebar();
			}
		?>
	</div> <!-- layout -->
</div> <!-- #main .site-main -->

<?php
	get_footer();
?>
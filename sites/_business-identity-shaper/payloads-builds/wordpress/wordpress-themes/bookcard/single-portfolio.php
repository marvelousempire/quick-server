<!doctype html>

<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php echo get_bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	
    <title><?php wp_title( '|', true, 'right' ); ?></title>
    
    <script src="<?php echo get_template_directory_uri(); ?>/js/modernizr.js"></script>
	
    <!--[if lte IE 9]>
        <script src="<?php echo get_template_directory_uri(); ?>/js/html5shiv.js"></script>
        <script src="<?php echo get_template_directory_uri(); ?>/js/selectivizr-min.js"></script>
    <![endif]-->
	
	<?php
		if (is_singular() && get_option('thread_comments'))
		{
			wp_enqueue_script('comment-reply');
		}
	?>
	<?php
		wp_head();
	?>
    <script>
    	jQuery(document).ready(function($) {
			
			$('.portfolio-single').fitVids();
		});
    </script>
</head>

<body class="p-single">
	<?php
		if (have_posts()) :
			while (have_posts()) : the_post();
				?>
					<div id="post-<?php the_ID(); ?>" <?php post_class('container portfolio-single'); ?>>
						<div class="row">
							<div class="span8 portfolio-field portfolio-title">
								<h2><?php the_title(); ?></h2>
							</div> <!-- .portfolio-title -->
							
							<div class="span4 portfolio-field portfolio-nav">
								<?php
									next_post_link( '<span class="left-arrow">%link</span>', "" );
									
									echo '<a class="icon button back" href="' . get_home_url() . '/#/' . get_option( 'portfolio_slug', 'portfolio' ) . '">' . __( 'close', 'bookcard' ) . '</a>';
									
									previous_post_link( '<span class="right-arrow">%link</span>', "" );
								?>
							</div> <!-- .portfolio-nav -->
							
							<?php
								$pf_type = get_option( $post->ID . 'pf_type', 'Standard' );
								
								if ( $pf_type == 'Direct URL' )
								{
									$pf_direct_url = stripcslashes( get_option( $post->ID . 'pf_direct_url', "" ) );
									$pf_link_new_tab = get_option( $post->ID . 'pf_link_new_tab', true );
									
									?>
										<div class="span12">
											<div class="portfolio-field" style="text-align: center;">
												<div class="launch" style="text-align: center; padding-top: 1em; padding-left: 0px;">
													<a class="btn" style="text-transform: uppercase;" <?php if ( $pf_link_new_tab == true ) { echo 'target="_blank"'; } ?> href="<?php echo $pf_direct_url; ?>"><?php the_title(); ?></a>
												</div>
												<!-- end .launch -->
												
												<?php
													$pf_short_description = stripcslashes( get_option( $post->ID . 'pf_short_description', "" ) );
												?>
												<p><?php echo $pf_short_description; ?></p>
												
												<?php
													if (has_post_thumbnail())
													{
														the_post_thumbnail('full');
													}
												?>
											</div>
											<!-- end .portfolio-field -->
										</div>
										<!-- end .span12 -->
									<?php
								}
							?>
							
							<?php
								the_content();
								
								wp_link_pages( array( 'before' => '<div class="page-links">' . __( 'Pages:', 'bookcard' ), 'after' => '</div>' ) );
							?>
							
							<div class="span12 portfolio-field portfolio-nav bottom">
								<?php
									next_post_link( '<span class="left-arrow">%link</span>', "" );
									
									echo '<a class="icon button back" href="' . get_home_url() . '/#/' . get_option( 'portfolio_slug', 'portfolio' ) . '">' . __( 'close', 'bookcard' ) . '</a>';
									
									previous_post_link( '<span class="right-arrow">%link</span>', "" );
								?>
							</div>
							<!-- end .portfolio-nav -->
						</div>
						<!-- end .row -->
					</div>
					<!-- end .portfolio-single -->
				<?php
			endwhile;
		endif;
		wp_reset_query();
	?>

	<?php
		wp_footer();
	?>
</body>
</html>
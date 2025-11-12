<?php
	if (isset($_SERVER['HTTP_USER_AGENT']) && (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false))
	{
		header('X-UA-Compatible: IE=edge,chrome=1');
	}
?>
<!doctype html>

<html <?php language_attributes(); ?> <?php bookcard_html_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    
    <script src="<?php echo get_template_directory_uri(); ?>/js/modernizr.js"></script>
	
    <!--[if lte IE 9]>
        <script src="<?php echo get_template_directory_uri(); ?>/js/html5shiv.js"></script>
        <script src="<?php echo get_template_directory_uri(); ?>/js/selectivizr-min.js"></script>
    <![endif]-->
	
	<?php
		wp_head();
	?>
	
    <script>
    	jQuery(document).ready(function($) {
			$('.portfolio-single').fitVids();
		});
    </script>
</head>

<body <?php body_class('classic'); ?>>
	<div id="page" class="hfeed site">
		<main id="main" class="site-main">
			<header id="masthead" class="header cover" role="banner">
				<div class="cover-image-holder">
					<?php
						$bookcard_front_cover_image = get_option('front_cover_image', "");
						
						if (! empty($bookcard_front_cover_image))
						{
							?>
								<img alt="<?php bloginfo('name'); ?>" src="<?php echo esc_url($bookcard_front_cover_image); ?>">
							<?php
						}
					?>
				</div> <!-- .cover-image-holder -->
				<div class="header-wrap layout-full">
					<?php
						$bookcard_logo_type = get_option('logo_type', 'Text Logo');
						
						if ($bookcard_logo_type == 'Image Logo')
						{
							$logo_image = get_option('logo_image', "");
							
							?>
								<a class="header-title-link" href="<?php echo esc_url(home_url('/')); ?>">
									<img alt="<?php bloginfo('name'); ?>" src="<?php echo esc_url($logo_image); ?>">
								</a> <!-- .header-title-link -->
							<?php
						}
						else
						{
							$text_logo        = get_bloginfo('name');
							$select_text_logo = get_option('select_text_logo', 'WordPress Site Title');
							
							if ($select_text_logo == 'Theme Site Title')
							{
								$text_logo = stripcslashes(get_option('your_name', ""));
							}
							
							if (! empty($text_logo))
							{
								?>
									<h1 class="site-title">
										<?php
											echo $text_logo;
										?>
									</h1> <!-- .site-title -->
								<?php
							}
						}
					?>
					<?php
						$bookcard_tagline        = get_bloginfo('description');
						$bookcard_select_tagline = get_option('select_tagline', 'WordPress Tagline');
						
						if ($bookcard_select_tagline == 'Theme Tagline')
						{
							$bookcard_tagline = stripcslashes(get_option('your_slogan', ""));
						}
						
						if (! empty($bookcard_tagline))
						{
							?>
								<h2>
									<?php
										echo $bookcard_tagline;
									?>
								</h2>
							<?php
						}
					?>
					
					<nav id="primary-navigation" class="site-navigation primary-navigation" role="navigation">
						<div class="nav-menu">
							<?php
								wp_nav_menu(
									array(
										'theme_location' => 'bookcard_theme_menu_location',
										'container'      => false,
										'depth'          => 1
									)
								);
							?>
						</div> <!-- .nav-menu -->
					</nav> <!-- #primary-navigation .site-navigation .primary-navigation -->
				</div> <!-- .header-wrap .layout-full -->
			</header> <!-- #masthead .header .cover -->
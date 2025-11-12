<?php
/*
Template Name: Homepage
*/
?>
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

<body <?php body_class(); ?>>
	<section class="main">
		<div id="rm-container" class="rm-container rm-closed">
			<header id="header">
				<nav>
					<ul>
						<li><a href='#/home'></a></li>
						<li><a href='#/resume'></a></li>
						<li><a href='#/portfolio'></a></li>
						<li><a href='#/contact'></a></li>
					</ul>
				</nav>
			</header> <!-- #header -->
			<div class="rm-wrapper">
				<div class="rm-cover">
					<?php
						bookcard_page_inner__front_cover();
					?>
					<?php
						bookcard_page_inner__resume();
					?>
				</div> <!-- .rm-cover -->
				<?php
					bookcard_page_inner__portfolio();
				?>
				<div class="rm-right">
					<?php
						bookcard_page_inner__back_cover();
					?>
					<?php
						bookcard_page_inner__contact();
					?>
				</div> <!-- .rm-right -->
			</div> <!-- .rm-wrapper -->
		</div> <!-- #rm-container .rm-container .rm-closed -->
	</section> <!-- .main -->
	
	<div class="p-overlay"></div><!-- .p-overlay -->
	<div class="p-overlay"></div><!-- .p-overlay -->
	<div class="loader"></div><!-- .loader -->
	<div class="alert"></div><!-- .alert -->
	
	<?php
		wp_footer();
	?>
</body>
</html>
<!doctype html>
<html <?php language_attributes(); ?> <?php efor_html_class(); ?> <?php echo efor_html_data_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<?php
		$efor_mobile_zoom = get_theme_mod('efor_setting_mobile_zoom', 'Yes');
		
		if ($efor_mobile_zoom == 'No')
		{
			?>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
			<?php
		}
		else
		{
			?>
				<meta name="viewport" content="width=device-width, initial-scale=1">
			<?php
		}
	?>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php
		wp_head();
	?>
</head>

<body <?php body_class(); ?>>
	<?php
	
		// Elementor 'header' location
		
		if (! function_exists('elementor_theme_do_location') || ! elementor_theme_do_location('header'))
		{
			get_template_part('template_part', 'header');
		}

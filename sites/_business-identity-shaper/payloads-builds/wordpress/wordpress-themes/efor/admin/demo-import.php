<?php

	function efor_ocdi_plugin_page_setup($default_settings)
	{
		$default_settings['capability']  = 'import';
		$default_settings['parent_slug'] = 'themes.php';
		$default_settings['menu_slug']   = 'efor-import-theme-demos';
		$default_settings['menu_title']  = esc_html__('Import Theme Demos',    'efor');
		$default_settings['page_title']  = esc_html__('One Click Demo Import', 'efor');
		
		return $default_settings;
	}

	add_filter('ocdi/plugin_page_setup', 'efor_ocdi_plugin_page_setup');


/* ============================================================================================================================================= */


	function efor_ocdi_plugin_intro_text($default_text)
	{
		$default_text .= '<div class="notice notice-warning">';
		$default_text .= 	'<p>';
		$default_text .= 		'<b><span style="color: #ff0000;">' . esc_html__('Important', 'efor') . '</span></b>';
		$default_text .= 		'<br>';
		$default_text .= 		'<b>' . '<a target="_blank" href="https://elementor.com/help/requirements/">' . esc_html__('Please check out here for the system requirements you need in order to import demo data and use Elementor.', 'efor') . '</a> ' . esc_html__('(If you are not sure whether or not your server support this, contact your host.)', 'efor') . '</b>';
		$default_text .= 	'</p>';
		$default_text .= '</div>';
		
		return $default_text;
	}
	
	add_filter('ocdi/plugin_intro_text', 'efor_ocdi_plugin_intro_text');


/* ============================================================================================================================================= */


	function efor_ocdi_register_plugins($plugins)
	{
		$theme_plugins = array(
			array(
				'name'        => 'Pixelwars Core',
				'slug'        => 'pixelwars-core',
				'description' => esc_html__('Advanced features for Pixelwars themes.', 'efor'),
				'source'      => get_template_directory_uri() . '/admin/plugins/pixelwars-core.zip',
				'required'    => false,
				'preselected' => true,
			),
			array(
				'name'        => 'Pixelwars Core Shortcodes - (Optional)',
				'slug'        => 'pixelwars-core-shortcodes',
				'description' => esc_html__('Shortcodes for Pixelwars themes.', 'efor'),
				'source'      => get_template_directory_uri() . '/admin/plugins/pixelwars-core-shortcodes.zip',
				'required'    => false,
				'preselected' => true,
			),
			array(
				'name'        => 'Elementor - Drag & Drop Page Builder',
				'slug'        => 'elementor',
				'description' => esc_html__('Instant drag & drop lets you easily place every element on the page.', 'efor'),
				'required'    => false,
				'preselected' => true,
			),
			array(
				'name'        => 'JetElements - Addon for Elementor',
				'slug'        => 'jet-elements',
				'description' => esc_html__('It provides the set of modules to create different kinds of content, adds custom modules to your website.', 'efor'),
				'source'      => get_template_directory_uri() . '/admin/plugins/jet-elements.zip',
				'required'    => false,
				'preselected' => true,
			),
			array(
				'name'        => 'JetPopup - Addon for Elementor',
				'slug'        => 'jet-popup',
				'description' => esc_html__('The advanced plugin for creating popups with Elementor.', 'efor'),
				'source'      => get_template_directory_uri() . '/admin/plugins/jet-popup.zip',
				'required'    => false,
				'preselected' => true,
			),
			array(
				'name'        => 'WooCommerce - eCommerce Platform',
				'slug'        => 'woocommerce',
				'description' => esc_html__('An eCommerce toolkit that helps you sell anything.', 'efor'),
				'required'    => false,
				'preselected' => true,
			),
			array(
				'name'        => 'Contact Form 7',
				'slug'        => 'contact-form-7',
				'description' => esc_html__('Allows you to create contact forms for your site in minutes.', 'efor'),
				'required'    => false,
				'preselected' => true,
			),
			array(
				'name'        => 'Instagram Feed Gallery',
				'slug'        => 'insta-gallery',
				'description' => esc_html__('The most user-friendly Instagram plugin for WordPress.', 'efor'),
				'required'    => false,
				'preselected' => true,
			),
			array(
				'name'        => 'MC4WP - MailChimp for WordPress',
				'slug'        => 'mailchimp-for-wp',
				'description' => esc_html__('Allowing your visitors to subscribe to your newsletter should be easy. With this plugin, it finally is.', 'efor'),
				'required'    => false,
				'preselected' => true,
			),
			array(
				'name'        => 'Top 10 - Popular Posts',
				'slug'        => 'top-10',
				'description' => esc_html__('Count daily and total visits per post and display the most popular posts based on the number of views.', 'efor'),
				'required'    => false,
				'preselected' => true,
			),
			array(
				'name'        => 'I Recommend This – Like Button for Posts',
				'slug'        => 'i-recommend-this',
				'description' => esc_html__('This plugin allows your visitors to like/recommend your posts.', 'efor'),
				'required'    => false,
				'preselected' => true,
			),
			array(
				'name'        => 'Selection Sharer',
				'slug'        => 'selection-sharer',
				'description' => esc_html__('Medium like popover menu to share on Twitter, Facebook, LinkedIn or by email any text selected on the page.', 'efor'),
				'required'    => false,
				'preselected' => true,
			),
			array(
				'name'        => 'WPFront Scroll Top',
				'slug'        => 'wpfront-scroll-top',
				'description' => esc_html__('Allows the visitor to easily scroll back to the top of the page.', 'efor'),
				'required'    => false,
				'preselected' => true,
			),
			array(
				'name'        => 'GDPR Cookie Consent Banner',
				'slug'        => 'uk-cookie-consent',
				'description' => esc_html__('One of the easiest, most effective, and popular cookie consent plugins available for WordPress.', 'efor'),
				'required'    => false,
				'preselected' => true,
			),
			array(
				'name'        => 'Envato Market',
				'slug'        => 'envato-market',
				'description' => esc_html__('This plugin will periodically check for updates, so keeping your theme up to date is as simple as a few clicks.', 'efor'),
				'source'      => get_template_directory_uri() . '/admin/plugins/envato-market.zip',
				'required'    => false,
				'preselected' => true,
			)
		);
		
		return array_merge($plugins, $theme_plugins);
	}
	
	add_filter('ocdi/register_plugins', 'efor_ocdi_register_plugins');


/* ============================================================================================================================================= */


	function efor_ocdi_before_content_import($selected_import)
	{
		add_filter('ocdi/regenerate_thumbnails_in_content_import', '__return_false');
	}
	
	add_action('ocdi/before_content_import', 'efor_ocdi_before_content_import');


/* ============================================================================================================================================= */


	function efor_ocdi_import_files()
	{
		$theme_directory     = trailingslashit(get_template_directory());
		$theme_directory_url = trailingslashit(get_template_directory_uri());
		
		return array(
			array(
				'import_file_name'             => esc_html__('Debra Wilson', 'efor'),
				'categories'                   => array('LearnPress LMS Demos'),
				'local_import_file'            => $theme_directory     . 'admin/demo-data/01/content.xml',
				'local_import_widget_file'     => $theme_directory     . 'admin/demo-data/01/widgets.wie',
				'local_import_customizer_file' => $theme_directory     . 'admin/demo-data/01/customizer.dat',
				'import_preview_image_url'     => $theme_directory_url . 'admin/demo-data/01/screenshot.jpg',
				'preview_url'                  => 'https://themes.pixelwars.org/efor/demo-01/'
			),
			array(
				'import_file_name'             => esc_html__('John Ray Coaching', 'efor'),
				'categories'                   => array('LearnPress LMS Demos'),
				'local_import_file'            => $theme_directory     . 'admin/demo-data/02/content.xml',
				'local_import_widget_file'     => $theme_directory     . 'admin/demo-data/02/widgets.wie',
				'local_import_customizer_file' => $theme_directory     . 'admin/demo-data/02/customizer.dat',
				'import_preview_image_url'     => $theme_directory_url . 'admin/demo-data/02/screenshot.jpg',
				'preview_url'                  => 'https://themes.pixelwars.org/efor/demo-02/'
			),
			array(
				'import_file_name'             => esc_html__('Linda Cooper', 'efor'),
				'categories'                   => array('LearnPress LMS Demos'),
				'local_import_file'            => $theme_directory     . 'admin/demo-data/03/content.xml',
				'local_import_widget_file'     => $theme_directory     . 'admin/demo-data/03/widgets.wie',
				'local_import_customizer_file' => $theme_directory     . 'admin/demo-data/03/customizer.dat',
				'import_preview_image_url'     => $theme_directory_url . 'admin/demo-data/03/screenshot.jpg',
				'preview_url'                  => 'https://themes.pixelwars.org/efor/demo-03/'
			),
			array(
				'import_file_name'             => esc_html__('Richard Hopkins', 'efor'),
				'categories'                   => array('LearnPress LMS Demos'),
				'local_import_file'            => $theme_directory     . 'admin/demo-data/04/content.xml',
				'local_import_widget_file'     => $theme_directory     . 'admin/demo-data/04/widgets.wie',
				'local_import_customizer_file' => $theme_directory     . 'admin/demo-data/04/customizer.dat',
				'import_preview_image_url'     => $theme_directory_url . 'admin/demo-data/04/screenshot.jpg',
				'preview_url'                  => 'https://themes.pixelwars.org/efor/demo-04/'
			),
			array(
				'import_file_name'             => esc_html__('Stefan Hughes', 'efor'),
				'categories'                   => array('LearnPress LMS Demos'),
				'local_import_file'            => $theme_directory     . 'admin/demo-data/05/content.xml',
				'local_import_widget_file'     => $theme_directory     . 'admin/demo-data/05/widgets.wie',
				'local_import_customizer_file' => $theme_directory     . 'admin/demo-data/05/customizer.dat',
				'import_preview_image_url'     => $theme_directory_url . 'admin/demo-data/05/screenshot.jpg',
				'preview_url'                  => 'https://themes.pixelwars.org/efor/demo-05/'
			),
			array(
				'import_file_name'             => esc_html__('Judy West', 'efor'),
				'categories'                   => array('Tutor LMS Demos'),
				'local_import_file'            => $theme_directory     . 'admin/demo-data/06/content.xml',
				'local_import_widget_file'     => $theme_directory     . 'admin/demo-data/06/widgets.wie',
				'local_import_customizer_file' => $theme_directory     . 'admin/demo-data/06/customizer.dat',
				'import_preview_image_url'     => $theme_directory_url . 'admin/demo-data/06/screenshot.jpg',
				'preview_url'                  => 'https://themes.pixelwars.org/efor/demo-06/'
			),
			array(
				'import_file_name'             => esc_html__('Jay Gattuso', 'efor'),
				'categories'                   => array('Tutor LMS Demos'),
				'local_import_file'            => $theme_directory     . 'admin/demo-data/07/content.xml',
				'local_import_widget_file'     => $theme_directory     . 'admin/demo-data/07/widgets.wie',
				'local_import_customizer_file' => $theme_directory     . 'admin/demo-data/07/customizer.dat',
				'import_preview_image_url'     => $theme_directory_url . 'admin/demo-data/07/screenshot.jpg',
				'preview_url'                  => 'https://themes.pixelwars.org/efor/demo-07/'
			),
			array(
				'import_file_name'             => esc_html__('Olive Mathews', 'efor'),
				'categories'                   => array('Tutor LMS Demos'),
				'local_import_file'            => $theme_directory     . 'admin/demo-data/08/content.xml',
				'local_import_widget_file'     => $theme_directory     . 'admin/demo-data/08/widgets.wie',
				'local_import_customizer_file' => $theme_directory     . 'admin/demo-data/08/customizer.dat',
				'import_preview_image_url'     => $theme_directory_url . 'admin/demo-data/08/screenshot.jpg',
				'preview_url'                  => 'https://themes.pixelwars.org/efor/demo-08/'
			),
			array(
				'import_file_name'             => esc_html__('Jason Hertz', 'efor'),
				'categories'                   => array('Tutor LMS Demos'),
				'local_import_file'            => $theme_directory     . 'admin/demo-data/09/content.xml',
				'local_import_widget_file'     => $theme_directory     . 'admin/demo-data/09/widgets.wie',
				'local_import_customizer_file' => $theme_directory     . 'admin/demo-data/09/customizer.dat',
				'import_preview_image_url'     => $theme_directory_url . 'admin/demo-data/09/screenshot.jpg',
				'preview_url'                  => 'https://themes.pixelwars.org/efor/demo-09/'
			),
			array(
				'import_file_name'             => esc_html__('Ava Wilson', 'efor'),
				'categories'                   => array('Tutor LMS Demos'),
				'local_import_file'            => $theme_directory     . 'admin/demo-data/10/content.xml',
				'local_import_widget_file'     => $theme_directory     . 'admin/demo-data/10/widgets.wie',
				'local_import_customizer_file' => $theme_directory     . 'admin/demo-data/10/customizer.dat',
				'import_preview_image_url'     => $theme_directory_url . 'admin/demo-data/10/screenshot.jpg',
				'preview_url'                  => 'https://themes.pixelwars.org/efor/demo-10/'
			),
			array(
				'import_file_name'             => esc_html__('Amy Garcia', 'efor'),
				'categories'                   => array('Tutor LMS Demos'),
				'local_import_file'            => $theme_directory     . 'admin/demo-data/11/content.xml',
				'local_import_widget_file'     => $theme_directory     . 'admin/demo-data/11/widgets.wie',
				'local_import_customizer_file' => $theme_directory     . 'admin/demo-data/11/customizer.dat',
				'import_preview_image_url'     => $theme_directory_url . 'admin/demo-data/11/screenshot.jpg',
				'preview_url'                  => 'https://themes.pixelwars.org/efor/demo-11/'
			),
			array(
				'import_file_name'             => esc_html__('Leonardo Garcia', 'efor'),
				'categories'                   => array('Tutor LMS Demos'),
				'local_import_file'            => $theme_directory     . 'admin/demo-data/12/content.xml',
				'local_import_widget_file'     => $theme_directory     . 'admin/demo-data/12/widgets.wie',
				'local_import_customizer_file' => $theme_directory     . 'admin/demo-data/12/customizer.dat',
				'import_preview_image_url'     => $theme_directory_url . 'admin/demo-data/12/screenshot.jpg',
				'preview_url'                  => 'https://themes.pixelwars.org/efor/demo-12/'
			),
			array(
				'import_file_name'             => esc_html__('James Hertz', 'efor'),
				'categories'                   => array('Tutor LMS Demos'),
				'local_import_file'            => $theme_directory     . 'admin/demo-data/13/content.xml',
				'local_import_widget_file'     => $theme_directory     . 'admin/demo-data/13/widgets.wie',
				'local_import_customizer_file' => $theme_directory     . 'admin/demo-data/13/customizer.dat',
				'import_preview_image_url'     => $theme_directory_url . 'admin/demo-data/13/screenshot.jpg',
				'preview_url'                  => 'https://themes.pixelwars.org/efor/demo-13/'
			),
			array(
				'import_file_name'             => esc_html__('Theme Demo Helper', 'efor'),
				'local_import_file'            => $theme_directory     . 'admin/demo-data/13/content.xml',
				'local_import_widget_file'     => $theme_directory     . 'admin/demo-data/13/widgets.wie',
				'local_import_customizer_file' => $theme_directory     . 'admin/demo-data/13/customizer.dat',
				'import_preview_image_url'     => $theme_directory_url . 'admin/demo-data/13/screenshot.jpg',
				'preview_url'                  => 'https://themes.pixelwars.org/efor/demo-13/'
			)
		);
	}
	
	add_filter('ocdi/import_files', 'efor_ocdi_import_files');


/* ============================================================================================================================================= */


	function efor_after_import()
	{
		// Assign menus to their locations.
		$main_menu = get_term_by('name', 'MyMenu', 'nav_menu');
		
		set_theme_mod(
			'nav_menu_locations',
			array(
				'efor_theme_menu_location' => $main_menu->term_id,
			)
		);
		
		// Assign Homepage and Blog page.
		$homepage  = get_page_by_title('Home'); // Get homepage.
		$blog_page = get_page_by_title('Blog'); // Get blog page.
		
		update_option('show_on_front',  'page');
		update_option('page_on_front',  $homepage->ID);  // Set homepage.
		update_option('page_for_posts', $blog_page->ID); // Set blog page.
	}
	
	add_action('ocdi/after_import', 'efor_after_import');


<?php

	require_once get_template_directory() . '/admin/class-tgm-plugin-activation.php';
	
	
	function bookcard_plugins()
	{
		$config = array(
			'id'           => 'bookcard_tgmpa',
			'default_path' => "",
			'menu'         => 'bookcard-install-plugins',
			'parent_slug'  => 'themes.php',
			'capability'   => 'edit_theme_options',
			'has_notices'  => true,
			'dismissable'  => true,
			'dismiss_msg'  => esc_html__('Install Plugins', 'bookcard'),
			'is_automatic' => true,
			'message'      => "",
			'strings'      => array('nag_type' => 'updated')
		);
		
		$plugins = array(
			array(
				'name'     => esc_html__('One Click Demo Import', 'bookcard'),
				'slug'     => 'one-click-demo-import',
				'required' => false
			),
			array(
				'name'     => esc_html__('Regenerate Thumbnails', 'bookcard'),
				'slug'     => 'regenerate-thumbnails',
				'required' => false
			),
			array(
				'name'     => esc_html__('Loco Translate', 'bookcard'),
				'slug'     => 'loco-translate',
				'required' => false
			),
			array(
				'name'     => esc_html__('Instagram Feed Gallery', 'bookcard'),
				'slug'     => 'insta-gallery',
				'required' => false
			)
		);
		
		tgmpa($plugins, $config);
	}
	
	add_action('tgmpa_register', 'bookcard_plugins');

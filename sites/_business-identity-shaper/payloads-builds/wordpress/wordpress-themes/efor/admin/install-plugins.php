<?php

	// TGM Plugin Activation
	
	require_once get_template_directory() . '/admin/class-tgm-plugin-activation.php';


/* ============================================================================================================================================= */


	function efor__admin_head__tgmpa_notice()
	{
		?>
			<style>
				#setting-error-tgmpa {
					display: none !important;
				}
			</style>
		<?php
		
		$current_screen = get_current_screen();
		
		if (('dashboard' === $current_screen->id) || ('themes' === $current_screen->id) || ('plugins' === $current_screen->id))
		{
			?>
				<style>
					#setting-error-tgmpa {
						display: block !important;
					}
				</style>
			<?php
		}
	}
	
	add_action('admin_head', 'efor__admin_head__tgmpa_notice', 1);


/* ============================================================================================================================================= */


	function efor_plugins()
	{
		$message  = '<div class="notice notice-warning pixelwars-tgmpa-notice">';
		$message .= 	'<h3>' . esc_html__('Important', 'efor') . ' </h3>';
		$message .= 	'<p><b>' . esc_html__('Install only one', 'efor') . ' <abbr title="Learning Management System">' . esc_html__('LMS', 'efor') . '</abbr> ' . esc_html__('(Online Courses) plugin to avoid any conflict.', 'efor') . '</b></p>';
		$message .= 	'<ul>';
		$message .= 		'<li>' . esc_html__('Install', 'efor') . ' <b>' . esc_html__('LearnPress LMS', 'efor') . '</b> ' . esc_html__('plugin for demo: 01/02/03/04/05', 'efor') . '</li>';
		$message .= 		'<li>' . esc_html__('Install', 'efor') . ' <b>' . esc_html__('Tutor LMS', 'efor') . '</b> ' . esc_html__('plugin for demo: 06/07/08/09/10/11/12/13', 'efor') . '</li>';
		$message .= 	'</ul>';
		$message .= 	'<hr>';
		$message .= 	'<p><b>' . esc_html__('Note:', 'efor') . '</b> ' . '<span>' . esc_html__('If you encounter any update issue for a plugin, just deactivate it from Plugins menu and delete, then reinstall from here.', 'efor') . '</span>' . '</p>';
		$message .= '</div>';
		
		$config = array(
			'id'           => 'efor_tgmpa',
			'default_path' => "",
			'menu'         => 'efor-install-update-theme-plugins',
			'parent_slug'  => 'themes.php',
			'capability'   => 'edit_theme_options',
			'is_automatic' => true,
			'has_notices'  => true,
			'dismissable'  => true,
			'dismiss_msg'  => '<h2>' . esc_html__('Theme Plugins', 'efor') . '</h2>',
			'message'      => $message,
			'strings'      => array(
				'menu_title' => esc_html__('Install Theme Plugins',        'efor'),
				'page_title' => esc_html__('Install/Update Theme Plugins', 'efor')
			)
		);
		
		$plugins = array(
			array(
				'name'               => esc_html__('Pixelwars Core', 'efor'),
				'slug'               => 'pixelwars-core',
				'source'             => get_template_directory() . '/admin/plugins/pixelwars-core.zip',
				'version'            => '6.8.6',
				'required'           => false,
				'force_activation'   => false,
				'force_deactivation' => false,
				'external_url'       => "",
				'is_callable'        => ""
			),
			array(
				'name'               => esc_html__('Pixelwars Core Shortcodes - (Optional)', 'efor'),
				'slug'               => 'pixelwars-core-shortcodes',
				'source'             => get_template_directory() . '/admin/plugins/pixelwars-core-shortcodes.zip',
				'version'            => '1.0.8',
				'required'           => false,
				'force_activation'   => false,
				'force_deactivation' => false,
				'external_url'       => "",
				'is_callable'        => ""
			),
			array(
				'name'               => esc_html__('JetElements - Addon for Elementor', 'efor'),
				'slug'               => 'jet-elements',
				'source'             => get_template_directory() . '/admin/plugins/jet-elements.zip',
				'version'            => '2.7.11',
				'required'           => false,
				'force_activation'   => false,
				'force_deactivation' => false,
				'external_url'       => "",
				'is_callable'        => ""
			),
			array(
				'name'               => esc_html__('JetPopup - Addon for Elementor', 'efor'),
				'slug'               => 'jet-popup',
				'source'             => get_template_directory() . '/admin/plugins/jet-popup.zip',
				'version'            => '2.0.19',
				'required'           => false,
				'force_activation'   => false,
				'force_deactivation' => false,
				'external_url'       => "",
				'is_callable'        => ""
			),
			array(
				'name'               => esc_html__('(LMS) Tutor Pro - (For demo: 06/07/08/09/10/11/12/13)', 'efor'),
				'slug'               => 'tutor-pro',
				'source'             => get_template_directory() . '/admin/plugins/tutor-pro.zip',
				'version'            => '3.8.3',
				'required'           => false,
				'force_activation'   => false,
				'force_deactivation' => false,
				'external_url'       => "",
				'is_callable'        => ""
			),
			array(
				'name'               => esc_html__('(LMS) Tutor Certificate Builder - (For demo: 06/07/08/09/10/11/12/13)', 'efor'),
				'slug'               => 'tutor-lms-certificate-builder',
				'source'             => get_template_directory() . '/admin/plugins/tutor-lms-certificate-builder.zip',
				'version'            => '1.2.1',
				'required'           => false,
				'force_activation'   => false,
				'force_deactivation' => false,
				'external_url'       => "",
				'is_callable'        => ""
			),
			array(
				'name'               => esc_html__('Amelia - Booking for Appointments and Events Calendar', 'efor'),
				'slug'               => 'ameliabooking',
				'source'             => get_template_directory() . '/admin/plugins/ameliabooking.zip',
				'version'            => '8.5',
				'required'           => false,
				'force_activation'   => false,
				'force_deactivation' => false,
				'external_url'       => "",
				'is_callable'        => ""
			),
			array(
				'name'     => esc_html__('Elementor - Drag & Drop Page Builder', 'efor'),
				'slug'     => 'elementor',
				'required' => false
			),
			array(
				'name'     => esc_html__('(LMS) LearnPress - (For demo: 01/02/03/04/05)', 'efor'),
				'slug'     => 'learnpress',
				'required' => false
			),
			array(
				'name'     => esc_html__('(LMS) Tutor - (For demo: 06/07/08/09/10/11/12/13)', 'efor'),
				'slug'     => 'tutor',
				'required' => false
			),
			array(
				'name'     => esc_html__('One Click Demo Import', 'efor'),
				'slug'     => 'one-click-demo-import',
				'required' => false
			)
		);
		
		tgmpa($plugins, $config);
	}
	
	add_action('tgmpa_register', 'efor_plugins');

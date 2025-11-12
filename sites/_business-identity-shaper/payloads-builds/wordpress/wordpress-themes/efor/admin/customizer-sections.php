<?php

	function efor_customize_register__sections($wp_customize)
	{
		$wp_customize->add_panel(
			'efor_panel_general',
			array(
				'title'       => esc_html__('General', 'efor'),
				'description' => esc_html__('General options.', 'efor'),
				'priority'    => 1
			)
		);
		
				$wp_customize->add_section(
					'efor_section_layout',
					array(
						'title'       => esc_html__('Layout', 'efor'),
						'description' => esc_html__('Theme layout settings.', 'efor'),
						'panel'       => 'efor_panel_general',
						'priority'    => 2
					)
				);
				
				$wp_customize->add_section(
					'efor_section_fonts',
					array(
						'title'       => esc_html__('Fonts', 'efor'),
						'description' => esc_html__('Theme font settings.', 'efor'),
						'panel'       => 'efor_panel_general',
						'priority'    => 3
					)
				);
				
				$wp_customize->add_section(
					'efor_section_chars',
					array(
						'title'       => esc_html__('Characters', 'efor'),
						'description' => esc_html__('Set character sets.', 'efor'),
						'panel'       => 'efor_panel_general',
						'priority'    => 4
					)
				);
				
				$wp_customize->add_section(
					'efor_section_colors',
					array(
						'title'       => esc_html__('Colors', 'efor'),
						'description' => esc_html__('Select theme colors.', 'efor'),
						'panel'       => 'efor_panel_general',
						'priority'    => 5
					)
				);
				
				$wp_customize->add_section(
					'efor_section_buttons',
					array(
						'title'       => esc_html__('Buttons', 'efor'),
						'description' => esc_html__('Theme buttons settings.', 'efor'),
						'panel'       => 'efor_panel_general',
						'priority'    => 6
					)
				);
		
		/* ================================================== */
		
		$wp_customize->add_panel(
			'efor_panel_header',
			array(
				'title'       => esc_html__('Header', 'efor'),
				'description' => esc_html__('Theme header settings.', 'efor'),
				'priority'    => 21
			)
		);
		
				$wp_customize->add_section(
					'efor_section_header_general',
					array(
						'title'       => esc_html__('General', 'efor'),
						'description' => esc_html__('General header options.', 'efor'),
						'panel'       => 'efor_panel_header',
						'priority'    => 22
					)
				);
				
				$wp_customize->add_section(
					'efor_section_header_menu',
					array(
						'title'       => esc_html__('Menu', 'efor'),
						'description' => esc_html__('Navigation menu options.', 'efor'),
						'panel'       => 'efor_panel_header',
						'priority'    => 23
					)
				);
				
				$wp_customize->add_section(
					'efor_section_header_top_bar',
					array(
						'title'       => esc_html__('Top Bar', 'efor'),
						'description' => esc_html__('Theme top bar settings.', 'efor'),
						'panel'       => 'efor_panel_header',
						'priority'    => 24
					)
				);
				
				$wp_customize->add_section(
					'efor_section_header_icon_box',
					array(
						'title'       => esc_html__('Icon Box', 'efor'),
						'description' => esc_html__('Theme icon box settings.', 'efor'),
						'panel'       => 'efor_panel_header',
						'priority'    => 25
					)
				);
		
		/* ================================================== */
		
		$wp_customize->add_section(
			'efor_section_footer',
			array(
				'title'       => esc_html__('Footer', 'efor'),
				'description' => esc_html__('Theme footer settings.', 'efor'),
				'priority'    => 26
			)
		);
		
		/* ================================================== */
		
		$wp_customize->add_panel(
			'efor_panel_featured_area',
			array(
				'title'       => esc_html__('Featured Area', 'efor'),
				'description' => esc_html__('Theme featured area settings.', 'efor'),
				'priority'    => 27
			)
		);
		
				$wp_customize->add_section(
					'efor_section_featured_area_general',
					array(
						'title'       => esc_html__('General', 'efor'),
						'description' => esc_html__('Theme general featured area settings.', 'efor'),
						'panel'       => 'efor_panel_featured_area',
						'priority'    => 28
					)
				);
				
				$wp_customize->add_section(
					'efor_section_featured_area_slider',
					array(
						'title'       => esc_html__('Slider', 'efor'),
						'description' => esc_html__('Go to Widgets section and add Main Slider widget to any Featured Area.', 'efor'),
						'panel'       => 'efor_panel_featured_area',
						'priority'    => 29
					)
				);
				
				$wp_customize->add_section(
					'efor_section_featured_area_link_box',
					array(
						'title'       => esc_html__('Link Box', 'efor'),
						'description' => esc_html__('Go to Widgets section and drag and drop Link Box widgets to Blog/Page Featured Area.', 'efor'),
						'panel'       => 'efor_panel_featured_area',
						'priority'    => 30
					)
				);
				
				$wp_customize->add_section(
					'efor_section_featured_area_intro',
					array(
						'title'       => esc_html__('Intro', 'efor'),
						'description' => esc_html__('Go to Widgets section and drag and drop Intro widget to Blog/Page Featured Area.', 'efor'),
						'panel'       => 'efor_panel_featured_area',
						'priority'    => 31
					)
				);
		
		/* ================================================== */
		
		$wp_customize->add_section(
			'efor_section_pages',
			array(
				'title'       => esc_html__('Pages', 'efor'),
				'description' => esc_html__('Default page options.', 'efor'),
				'priority'    => 32
			)
		);
		
		$wp_customize->add_section(
			'efor_section_blog',
			array(
				'title'       => esc_html__('Blog', 'efor'),
				'description' => esc_html__('Blog page options.', 'efor'),
				'priority'    => 33
			)
		);
		
		$wp_customize->add_section(
			'efor_section_post',
			array(
				'title'       => esc_html__('Single Post', 'efor'),
				'description' => esc_html__('Individual post options.', 'efor'),
				'priority'    => 34
			)
		);
		
		/* ================================================== */
		
		$wp_customize->add_panel(
			'efor_panel_meta',
			array(
				'title'       => esc_html__('Meta', 'efor'),
				'description' => esc_html__('Meta options.', 'efor'),
				'priority'    => 35
			)
		);
		
				$wp_customize->add_section(
					'efor_section_meta_style',
					array(
						'title'       => esc_html__('Style', 'efor'),
						'description' => esc_html__('Meta style options.', 'efor'),
						'panel'       => 'efor_panel_meta',
						'priority'    => 36
					)
				);
				
				$wp_customize->add_section(
					'efor_section_meta_blog',
					array(
						'title'       => esc_html__('Blog Meta', 'efor'),
						'description' => esc_html__('Blog meta options.', 'efor'),
						'panel'       => 'efor_panel_meta',
						'priority'    => 37
					)
				);
				
				$wp_customize->add_section(
					'efor_section_meta_post',
					array(
						'title'       => esc_html__('Single Post Meta', 'efor'),
						'description' => esc_html__('Post meta options.', 'efor'),
						'panel'       => 'efor_panel_meta',
						'priority'    => 38
					)
				);
		
		/* ================================================== */
		
		$wp_customize->add_section(
			'efor_section_sidebar',
			array(
				'title'       => esc_html__('Sidebar', 'efor'),
				'description' => esc_html__('Theme sidebar settings.', 'efor'),
				'priority'    => 39
			)
		);
		
		$wp_customize->add_section(
			'efor_section_portfolio',
			array(
				'title'       => esc_html__('Portfolio', 'efor'),
				'description' => esc_html__('Portfolio page options.', 'efor'),
				'priority'    => 40
			)
		);
		
		$wp_customize->add_section(
			'efor_section_shop',
			array(
				'title'       => esc_html__('Shop', 'efor'),
				'description' => esc_html__('Shop page options.', 'efor'),
				'priority'    => 41
			)
		);
		
		/* ================================================== */
		
		$wp_customize->add_panel(
			'widgets',
			array(
				'title'       => esc_html__('Widgets', 'efor'),
				'description' => esc_html__('Widgets are independent sections of content that can be placed into widgetized areas provided by your theme (commonly called sidebars).', 'efor'),
				'priority'    => 99
			)
		);
	}
	
	add_action('customize_register', 'efor_customize_register__sections');
	
	
	function efor_sanitize($value)
	{
		return $value;
	}

?>
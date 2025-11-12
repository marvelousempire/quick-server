<?php

	function bookcard_customize_register($wp_customize)
	{
		// Sections.
		
		$wp_customize->add_section(
			'bookcard_section_fonts',
			array(
				'title'       => esc_html__('Fonts', 'bookcard'),
				'description' => esc_html__('Theme font settings.', 'bookcard'),
				'priority'    => 30
			)
		);
		
		$wp_customize->add_section(
			'bookcard_section_blog',
			array(
				'title'       => esc_html__('Blog', 'bookcard'),
				'description' => esc_html__('Blog page options.', 'bookcard'),
				'priority'    => 31
			)
		);
		
		$wp_customize->add_section(
			'bookcard_section_post',
			array(
				'title'       => esc_html__('Single Post', 'bookcard'),
				'description' => esc_html__('Individual post options.', 'bookcard'),
				'priority'    => 32
			)
		);
		
		$wp_customize->add_section(
			'bookcard_section_sidebar',
			array(
				'title'       => esc_html__('Sidebar', 'bookcard'),
				'description' => esc_html__('Theme sidebar options.', 'bookcard'),
				'priority'    => 33
			)
		);
		
		// end Sections.
		
		
		// Fonts.
		
		include_once(get_template_directory() . '/admin/fonts.php');
		
		$wp_customize->add_setting(
			'setting_text_logo_font',
			array(
				'default'           => 'Alfa Slab One',
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'postMessage'
			)
		);
		
		$wp_customize->add_control(
			'control_text_logo_font',
			array(
				'label'       => esc_html__('Text Logo Font', 'bookcard'),
				'description' => esc_html__('Default: Alfa Slab One', 'bookcard'),
				'section'     => 'bookcard_section_fonts',
				'settings'    => 'setting_text_logo_font',
				'type'        => 'select',
				'choices'     => $bookcard_fonts
			)
		);
		
		
		$wp_customize->add_setting(
			'setting_text_slogan_font',
			array(
				'default'           => 'Nixie One',
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'postMessage'
			)
		);
		
		$wp_customize->add_control(
			'control_heading_font',
			array(
				'label'       => esc_html__('Text Slogan Font', 'bookcard'),
				'description' => esc_html__('Default: Nixie One', 'bookcard'),
				'section'     => 'bookcard_section_fonts',
				'settings'    => 'setting_text_slogan_font',
				'type'        => 'select',
				'choices'     => $bookcard_fonts
			)
		);
		
		
		$wp_customize->add_setting(
			'setting_page_title_font',
			array(
				'default'           => 'Arvo',
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'postMessage'
			)
		);
		
		$wp_customize->add_control(
			'control_menu_font',
			array(
				'label'       => esc_html__('Page Title Font', 'bookcard'),
				'description' => esc_html__('Default: Arvo', 'bookcard'),
				'section'     => 'bookcard_section_fonts',
				'settings'    => 'setting_page_title_font',
				'type'        => 'select',
				'choices'     => $bookcard_fonts
			)
		);
		
		
		$wp_customize->add_setting(
			'setting_content_font',
			array(
				'default'           => 'Lato',
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'postMessage'
			)
		);
		
		$wp_customize->add_control(
			'control_content_font',
			array(
				'label'       => esc_html__('Content Font', 'bookcard'),
				'description' => esc_html__('Default: Lato', 'bookcard'),
				'section'     => 'bookcard_section_fonts',
				'settings'    => 'setting_content_font',
				'type'        => 'select',
				'choices'     => $bookcard_fonts
			)
		);
		
		
		$wp_customize->add_setting(
			'setting_open_button_font',
			array(
				'default'           => 'Lato',
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'postMessage'
			)
		);
		
		$wp_customize->add_control(
			'control_open_button_font',
			array(
				'label'       => esc_html__('Open Button Font', 'bookcard'),
				'description' => esc_html__('Default: Lato', 'bookcard'),
				'section'     => 'bookcard_section_fonts',
				'settings'    => 'setting_open_button_font',
				'type'        => 'select',
				'choices'     => $bookcard_fonts
			)
		);
		
		// end Fonts.
		
		
		// Blog options.
		
		$wp_customize->add_setting(
			'bookcard_setting_automatic_excerpt',
			array(
				'default'           => 'standard',
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'refresh'
			)
		);
		
		$wp_customize->add_control(
			'bookcard_control_automatic_excerpt',
			array(
				'label' 	  => esc_html__('Automatic Excerpt', 'bookcard'),
				'description' => esc_html__('Generates an excerpt from the post content.', 'bookcard'),
				'section' 	  => 'bookcard_section_blog',
				'settings'    => 'bookcard_setting_automatic_excerpt',
				'type' 	      => 'select',
				'choices' 	  => array(
					'standard' => 'Yes - Only for standard format',
					'Yes'      => 'Yes - For all post formats',
					'No'       => 'No'
				)
			)
		);
		
		
		$wp_customize->add_setting(
			'bookcard_setting_excerpt_length',
			array(
				'default'           => '55',
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'refresh'
			)
		);
		
		$wp_customize->add_control(
			'bookcard_control_excerpt_length',
			array(
				'label'       => esc_html__('Excerpt Length', 'bookcard'),
				'description' => esc_html__('For blog page. Default: 55 (words)', 'bookcard'),
				'section'     => 'bookcard_section_blog',
				'settings'    => 'bookcard_setting_excerpt_length',
				'type'        => 'number',
				'input_attrs' => array(
					'min'  => 20,
					'max'  => 1000,
					'step' => 5
				)
			)
		);
		
		
		$wp_customize->add_setting(
			'bookcard_setting_numbered_pagination',
			array(
				'default'           => 'No',
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'refresh'
			)
		);
		
		$wp_customize->add_control(
			'bookcard_control_numbered_pagination',
			array(
				'label'    => esc_html__('Blog Navigation', 'bookcard'),
				'section'  => 'bookcard_section_blog',
				'settings' => 'bookcard_setting_numbered_pagination',
				'type'     => 'select',
				'choices'  => array(
					'No'  => 'Older/Newer Links',
					'Yes' => 'Numbered Pagination'
				)
			)
		);
		
		// end Blog options.
		
		
		// Post options.
		
		$wp_customize->add_setting(
			'bookcard_setting_related_posts',
			array(
				'default'           => 'Yes',
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'refresh'
			)
		);
		
		$wp_customize->add_control(
			'bookcard_control_related_posts',
			array(
				'label'    => esc_html__('Related Posts', 'bookcard'),
				'section'  => 'bookcard_section_post',
				'settings' => 'bookcard_setting_related_posts',
				'type'     => 'select',
				'choices'  => array(
					'Yes' => 'Yes',
					'No'  => 'No'
				)
			)
		);
		
		
		$wp_customize->add_setting(
			'bookcard_setting_related_posts_order',
			array(
				'default'           => 'relevance',
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'refresh'
			)
		);
		
		$wp_customize->add_control(
			'bookcard_control_related_posts_order',
			array(
				'label'       => esc_html__('Related Posts Order', 'bookcard'),
				'description' => esc_html__('Within same category, display posts ordered by:', 'bookcard'),
				'section'     => 'bookcard_section_post',
				'settings'    => 'bookcard_setting_related_posts_order',
				'type'        => 'select',
				'choices'     => array(
					'relevance'     => esc_html__('Relevance - Order by search terms', 'bookcard'),
					'rand'          => esc_html__('Random order', 'bookcard'),
					'date'          => esc_html__('Order by date', 'bookcard'),
					'comment_count' => esc_html__('Order by number of comments', 'bookcard')
				)
			)
		);
		
		
		$wp_customize->add_setting(
			'bookcard_setting_related_posts_count',
			array(
				'default'           => 3,
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'refresh'
			)
		);
		
		$wp_customize->add_control(
			'bookcard_control_related_posts_count',
			array(
				'label'       => esc_html__('Related Posts Count', 'bookcard'),
				'description' => esc_html__('Number of posts to show.', 'bookcard'),
				'section'     => 'bookcard_section_post',
				'settings'    => 'bookcard_setting_related_posts_count',
				'type'        => 'number',
				'input_attrs' => array(
					'min'  => 1,
					'max'  => 15,
					'step' => 1
				)
			)
		);
		
		
		$wp_customize->add_setting(
			'bookcard_setting_post_tags',
			array(
				'default'           => 'Yes',
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'refresh'
			)
		);
		
		$wp_customize->add_control(
			'bookcard_control_post_tags',
			array(
				'label'       => esc_html__('Post Tags', 'bookcard'),
				'section'     => 'bookcard_section_post',
				'settings'    => 'bookcard_setting_post_tags',
				'type'        => 'select',
				'choices'     => array(
					'Yes' => 'Yes',
					'No'  => 'No'
				)
			)
		);
		
		
		$wp_customize->add_setting(
			'bookcard_setting_post_navigation',
			array(
				'default'           => 'Yes',
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'refresh'
			)
		);
		
		$wp_customize->add_control(
			'bookcard_control_post_navigation',
			array(
				'label'       => esc_html__('Post Navigation', 'bookcard'),
				'description' => esc_html__('For previous post/next post links.', 'bookcard'),
				'section'     => 'bookcard_section_post',
				'settings'    => 'bookcard_setting_post_navigation',
				'type'        => 'select',
				'choices'     => array(
					'Yes' => 'Yes',
					'No'  => 'No'
				)
			)
		);
		
		// end Post options.
		
		
		// Sidebar options.
		
		$wp_customize->add_setting(
			'bookcard_setting_sidebar_blog',
			array(
				'default'           => 'Yes',
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'refresh'
			)
		);
		
		$wp_customize->add_control(
			'bookcard_control_sidebar_blog',
			array(
				'label'       => esc_html__('Blog Sidebar', 'bookcard'),
				'description' => esc_html__('Activate sidebar for blog page.', 'bookcard'),
				'section'     => 'bookcard_section_sidebar',
				'settings'    => 'bookcard_setting_sidebar_blog',
				'type'        => 'select',
				'choices'     => array(
					'Yes' => 'Yes',
					'No'  => 'No'
				)
			)
		);
		
		
		$wp_customize->add_setting(
			'bookcard_setting_sidebar_post',
			array(
				'default'           => 'Yes',
				'sanitize_callback' => 'bookcard_sanitize',
				'transport'         => 'refresh'
			)
		);
		
		$wp_customize->add_control(
			'bookcard_control_sidebar_post',
			array(
				'label'       => esc_html__('Post Sidebar', 'bookcard'),
				'description' => esc_html__('Activate sidebar for single posts.', 'bookcard'),
				'section'     => 'bookcard_section_sidebar',
				'settings'    => 'bookcard_setting_sidebar_post',
				'type'        => 'select',
				'choices'     => array(
					'Yes' => 'Yes',
					'No'  => 'No'
				)
			)
		);
		
		// end Sidebar options.
		
		
		// Defaults.
		
		$wp_customize->get_setting('blogname')->transport        = 'postMessage';
		$wp_customize->get_setting('blogdescription')->transport = 'postMessage';
		
		// end Defaults.
	}
	
	add_action('customize_register', 'bookcard_customize_register');
	
	
	function bookcard_sanitize($value)
	{
		return $value;
	}
	
	
	function bookcard_customize_css()
	{
		$setting_text_logo_font   = str_replace(' ', '+', get_theme_mod('setting_text_logo_font', 'Alfa Slab One'));
		$setting_text_slogan_font = str_replace(' ', '+', get_theme_mod('setting_text_slogan_font', 'Nixie One'));
		$setting_page_title_font  = str_replace(' ', '+', get_theme_mod('setting_page_title_font', 'Arvo'));
		$setting_content_font     = str_replace(' ', '+', get_theme_mod('setting_content_font', 'Lato'));
		$setting_open_button_font = str_replace(' ', '+', get_theme_mod('setting_open_button_font', 'Lato'));
		
		?>
		
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=<?php echo $setting_text_logo_font; ?>">
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=<?php echo $setting_text_slogan_font; ?>">
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=<?php echo $setting_page_title_font; ?>">
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=<?php echo $setting_content_font; ?>">
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=<?php echo $setting_open_button_font; ?>">

<style type="text/css">
	.cover h1 { font-family: "<?php echo get_theme_mod('setting_text_logo_font', 'Alfa Slab One'); ?>", Georgia, serif; }
	
	.cover h2 { font-family: "<?php echo get_theme_mod('setting_text_slogan_font', 'Nixie One'); ?>", Georgia, serif; }
	
	h2.inner-page-title { font-family: "<?php echo get_theme_mod('setting_page_title_font', 'Arvo'); ?>", Georgia, serif; }
	
	body { font-family: "<?php echo get_theme_mod('setting_content_font', 'Lato'); ?>", Georgia, serif; }
	
	.rm-button-open .ribbon-content { font-family: "<?php echo get_theme_mod('setting_open_button_font', 'Lato'); ?>", Georgia, serif; }
</style>

		<?php
	}
	
	add_action('wp_head', 'bookcard_customize_css');

?>
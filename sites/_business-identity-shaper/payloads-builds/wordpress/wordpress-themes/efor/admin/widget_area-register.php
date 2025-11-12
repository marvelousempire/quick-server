<?php

	function efor_widgets_init()
	{
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_1',
				'name'          => esc_html__('Blog Sidebar', 'efor'),
				'description'   => esc_html__('Add widgets.', 'efor'),
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title"><span>',
				'after_title'   => '</span></h3>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_2',
				'name'          => esc_html__('Post Sidebar', 'efor'),
				'description'   => esc_html__('Add widgets.', 'efor'),
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title"><span>',
				'after_title'   => '</span></h3>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_3',
				'name'          => esc_html__('Page Sidebar', 'efor'),
				'description'   => esc_html__('- Add widgets. - Select this sidebar in edit screen of a page to display it with this sidebar.', 'efor'),
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title"><span>',
				'after_title'   => '</span></h3>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_15',
				'name'          => esc_html__('Portfolio Sidebar', 'efor'),
				'description'   => esc_html__('Select this sidebar in edit screen of your portfolio page. Also this sidebar can be used for portfolio categories and portfolio posts when activated from Customizer.', 'efor'),
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title"><span>',
				'after_title'   => '</span></h3>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_16',
				'name'          => esc_html__('Shop Sidebar', 'efor'),
				'description'   => esc_html__('Enable sidebar for shop category page and single product page from Customizer > Sidebar.', 'efor'),
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title"><span>',
				'after_title'   => '</span></h3>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_course',
				'name'          => esc_html__('Course Sidebar', 'efor'),
				'description'   => esc_html__('Enable sidebar for courses from Customizer > Sidebar > Course Sidebar. (Use with LearnPress plugin.)', 'efor'),
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title"><span>',
				'after_title'   => '</span></h3>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_13',
				'name'          => esc_html__('Blog Featured Area', 'efor'),
				'description'   => esc_html__('Add Main Slider/Link Box/Intro widgets.', 'efor'),
				'before_widget' => "",
				'after_widget'  => "",
				'before_title'  => '<span style="display: none;">',
				'after_title'   => '</span>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_14',
				'name'          => esc_html__('Page Featured Area', 'efor'),
				'description'   => esc_html__('Add Main Slider/Link Box/Intro widgets.', 'efor'),
				'before_widget' => "",
				'after_widget'  => "",
				'before_title'  => '<span style="display: none;">',
				'after_title'   => '</span>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_17',
				'name'          => esc_html__('Portfolio Featured Area', 'efor'),
				'description'   => esc_html__('Add Main Slider/Link Box/Intro widgets.', 'efor'),
				'before_widget' => "",
				'after_widget'  => "",
				'before_title'  => '<span style="display: none;">',
				'after_title'   => '</span>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_18',
				'name'          => esc_html__('Shop Featured Area', 'efor'),
				'description'   => esc_html__('Add Main Slider/Link Box/Intro widgets.', 'efor'),
				'before_widget' => "",
				'after_widget'  => "",
				'before_title'  => '<span style="display: none;">',
				'after_title'   => '</span>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_4',
				'name'          => esc_html__('Header Social Media Icons', 'efor'),
				'description'   => esc_html__('Add Social Media Icon widget per icon.', 'efor'),
				'before_widget' => "",
				'after_widget'  => "",
				'before_title'  => '<span style="display: none;">',
				'after_title'   => '</span>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_8',
				'name'          => esc_html__('Author Social Media Icons', 'efor'),
				'description'   => esc_html__('Add Social Media Icon widget per icon.', 'efor'),
				'before_widget' => "",
				'after_widget'  => "",
				'before_title'  => '<span style="display: none;">',
				'after_title'   => '</span>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar__top_bar_left',
				'name'          => esc_html__('Top Bar Left', 'efor'),
				'description'   => esc_html__('Add widget.', 'efor'),
				'before_widget' => "",
				'after_widget'  => "",
				'before_title'  => '<span style="display: none;">',
				'after_title'   => '</span>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar__top_bar_right',
				'name'          => esc_html__('Top Bar Right', 'efor'),
				'description'   => esc_html__('Add widget.', 'efor'),
				'before_widget' => "",
				'after_widget'  => "",
				'before_title'  => '<span style="display: none;">',
				'after_title'   => '</span>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar__logo_before',
				'name'          => esc_html__('Logo Before', 'efor'),
				'description'   => esc_html__('Add widget.', 'efor'),
				'before_widget' => "",
				'after_widget'  => "",
				'before_title'  => '<span style="display: none;">',
				'after_title'   => '</span>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar__logo_after',
				'name'          => esc_html__('Logo After', 'efor'),
				'description'   => esc_html__('Add widget.', 'efor'),
				'before_widget' => "",
				'after_widget'  => "",
				'before_title'  => '<span style="display: none;">',
				'after_title'   => '</span>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_5',
				'name'          => esc_html__('Footer Subscribe', 'efor'),
				'description'   => esc_html__('Add widget.', 'efor'),
				'before_widget' => "",
				'after_widget'  => "",
				'before_title'  => '<h3>',
				'after_title'   => '</h3>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_6',
				'name'          => esc_html__('Footer Instagram', 'efor'),
				'description'   => esc_html__('Add widget.', 'efor'),
				'before_widget' => "",
				'after_widget'  => "",
				'before_title'  => '<span style="display: none;">',
				'after_title'   => '</span>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_9',
				'name'          => esc_html__('Footer 1', 'efor'),
				'description'   => esc_html__('Add widgets.', 'efor'),
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title"><span>',
				'after_title'   => '</span></h3>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_10',
				'name'          => esc_html__('Footer 2', 'efor'),
				'description'   => esc_html__('Add widgets.', 'efor'),
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title"><span>',
				'after_title'   => '</span></h3>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_11',
				'name'          => esc_html__('Footer 3', 'efor'),
				'description'   => esc_html__('Add widgets.', 'efor'),
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title"><span>',
				'after_title'   => '</span></h3>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_12',
				'name'          => esc_html__('Footer 4', 'efor'),
				'description'   => esc_html__('Add widgets.', 'efor'),
				'before_widget' => '<aside id="%1$s" class="widget %2$s">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title"><span>',
				'after_title'   => '</span></h3>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'efor_sidebar_7',
				'name'          => esc_html__('Footer Copyright Text', 'efor'),
				'description'   => esc_html__('Add Text widget.', 'efor'),
				'before_widget' => "",
				'after_widget'  => "",
				'before_title'  => '<span style="display: none;">',
				'after_title'   => '</span>'
			)
		);
		
		
		$efor_sidebars_with_commas = get_option('efor_sidebars_with_commas');
		
		if ($efor_sidebars_with_commas != "")
		{
			$sidebars = preg_split("/[\s]*[,][\s]*/", $efor_sidebars_with_commas);
			
			foreach ($sidebars as $sidebar)
			{
				$sidebar_lowercase = strtolower($sidebar);
				$sidebar_id        = str_replace(" ", '_', $sidebar_lowercase); // Parameters: Old value, New value, String.
				
				register_sidebar(
					array(
						'id'            => $sidebar_id,
						'name'          => $sidebar,
						'description'   => esc_html__('Add widgets.', 'efor'),
						'before_widget' => '<aside id="%1$s" class="widget %2$s">',
						'after_widget'  => '</aside>',
						'before_title'  => '<h3 class="widget-title"><span>',
						'after_title'   => '</span></h3>'
					)
				);
			}
		}
	}
	
	add_action('widgets_init', 'efor_widgets_init');

?>
<?php

	function bookcard_widgets_init()
	{
		register_sidebar(
			array(
				'name'          => __('Blog Sidebar', 'bookcard'),
				'id'            => 'blog_sidebar',
				'description'   => esc_html__('Add widgets.', 'bookcard'),
				'before_widget' => '<aside id="%1$s" class="widget %2$s" style="padding-bottom: 1em;">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title">',
				'after_title'   => '</h3>'
			)
		);
		
		register_sidebar(
			array(
				'name'          => __('Post Sidebar', 'bookcard'),
				'id'            => 'post_sidebar',
				'description'   => esc_html__('Add widgets.', 'bookcard'),
				'before_widget' => '<aside id="%1$s" class="widget %2$s" style="padding-bottom: 1em;">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title">',
				'after_title'   => '</h3>'
			)
		);
		
		register_sidebar(
			array(
				'name'          => __('Page Sidebar', 'bookcard'),
				'id'            => 'page_sidebar',
				'description'   => esc_html__('Add widgets.', 'bookcard'),
				'before_widget' => '<aside id="%1$s" class="widget %2$s" style="padding-bottom: 1em;">',
				'after_widget'  => '</aside>',
				'before_title'  => '<h3 class="widget-title">',
				'after_title'   => '</h3>'
			)
		);
		
		
		$bookcard_sidebars_with_commas = get_option('bookcard_sidebars_with_commas');
		
		if ($bookcard_sidebars_with_commas != "")
		{
			$sidebars = preg_split("/[\s]*[,][\s]*/", $bookcard_sidebars_with_commas);
			
			foreach ($sidebars as $sidebar_name)
			{
				register_sidebar(
					array(
						'name'          => $sidebar_name,
						'id'            => $sidebar_name,
						'description'   => esc_html__('Add widgets.', 'bookcard'),
						'before_widget' => '<aside id="%1$s" class="widget %2$s" style="padding-bottom: 1em;">',
						'after_widget'  => '</aside>',
						'before_title'  => '<h3 class="widget-title">',
						'after_title'   => '</h3>'
					)
				);
			}
		}
	}
	
	add_action('widgets_init', 'bookcard_widgets_init');


/* ============================================================================================================================================= */


	function bookcard_meta_box__sidebar($post)
	{
		?>
			<div class="admin-inside-box">
				<?php
					wp_nonce_field('bookcard_meta_box__sidebar', 'bookcard_meta_box_nonce__sidebar');
				?>
				<p>
					<label for="bookcard_select_page_sidebar"><?php esc_html_e('Select Sidebar', 'bookcard'); ?></label>
					<?php
						$select_page_sidebar = get_option('bookcard_select_page_sidebar' . '__' . get_the_ID(), 'No Sidebar');
					?>
					<select id="bookcard_select_page_sidebar" name="bookcard_select_page_sidebar">
						<option <?php if ($select_page_sidebar == 'No Sidebar') { echo 'selected="selected"'; } ?> value="No Sidebar"><?php esc_html_e('No Sidebar', 'bookcard'); ?></option>
						<option <?php if ($select_page_sidebar == 'blog_sidebar') { echo 'selected="selected"'; } ?> value="blog_sidebar"><?php esc_html_e('Blog Sidebar', 'bookcard'); ?></option>
						<option <?php if ($select_page_sidebar == 'post_sidebar') { echo 'selected="selected"'; } ?> value="post_sidebar"><?php esc_html_e('Post Sidebar', 'bookcard'); ?></option>
						<option <?php if ($select_page_sidebar == 'page_sidebar') { echo 'selected="selected"'; } ?> value="page_sidebar"><?php esc_html_e('Page Sidebar', 'bookcard'); ?></option>
						<?php
							$bookcard_sidebars_with_commas = get_option('bookcard_sidebars_with_commas');
							
							if ($bookcard_sidebars_with_commas != "")
							{
								$sidebars = preg_split("/[\s]*[,][\s]*/", $bookcard_sidebars_with_commas);
								
								foreach ($sidebars as $sidebar_name)
								{
									$selected = "";
									
									if ($select_page_sidebar == $sidebar_name)
									{
										$selected = 'selected="selected"';
									}
									
									echo '<option ' . $selected . ' value="' . esc_attr($sidebar_name) . '">' . $sidebar_name . '</option>';
								}
							}
						?>
					</select>
				</p>
				<p class="howto">
					<?php
						esc_html_e('Sidebar is a widget area. You can find all available sidebars in your Widgets page under Appearance menu or Widgets section in Customizer.', 'bookcard');
					?>
				</p>
				<p class="howto">
					<?php
						esc_html_e('Also you can create new sidebars from Appearance > Theme Options > Sidebar.', 'bookcard');
					?>
				</p>
			</div>
		<?php
	}
	
	
	function bookcard_save_meta_box__sidebar($post_id)
	{
		if (! isset($_POST['bookcard_meta_box_nonce__sidebar']))
		{
			return $post_id;
		}
		
		$nonce = $_POST['bookcard_meta_box_nonce__sidebar'];
		
		if (! wp_verify_nonce($nonce, 'bookcard_meta_box__sidebar'))
        {
			return $post_id;
		}
		
		if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) 
        {
			return $post_id;
		}
		
		if ('page' == $_POST['post_type'])
		{
			if (! current_user_can('edit_page', $post_id))
			{
				return $post_id;
			}
		}
		else
		{
			if (! current_user_can('edit_post', $post_id))
			{
				return $post_id;
			}
		}
		
		update_option('bookcard_select_page_sidebar' . '__' . $post_id, $_POST['bookcard_select_page_sidebar']);
	}
	
	add_action('save_post', 'bookcard_save_meta_box__sidebar');
	
	
	function bookcard_add_meta_boxes__sidebar()
	{
		add_meta_box('bookcard_add_meta_box__sidebar',
					 esc_html__('Sidebar', 'bookcard'),
					 'bookcard_meta_box__sidebar',
					 array('page'),
					 'side',
					 'low');
	}
	
	add_action('add_meta_boxes', 'bookcard_add_meta_boxes__sidebar');


/* ============================================================================================================================================= */


	function bookcard_sidebar_html()
	{
		?>
			<div id="secondary" class="widget-area sidebar" role="complementary">
				<?php
					if (is_page())
					{
						$select_page_sidebar = get_option('bookcard_select_page_sidebar' . '__' . get_the_ID(), 'No Sidebar');
						dynamic_sidebar($select_page_sidebar); // Page sidebar. (for default and custom page templates)
					}
					elseif (is_singular('post'))
					{
						if (is_active_sidebar('post_sidebar'))
						{
							dynamic_sidebar('post_sidebar'); // Post sidebar.
						}
						else
						{
							dynamic_sidebar('blog_sidebar'); // Blog sidebar.
						}
					}
					else
					{
						dynamic_sidebar('blog_sidebar'); // Blog sidebar.
					}
				?>
			</div> <!-- #secondary .widget-area .sidebar -->
		<?php
	}


/* ============================================================================================================================================= */


	function bookcard_sidebar($class = false)
	{
		$sidebar_class = 'with-sidebar';
		
		if (isset($_GET['sidebar']))
		{
			if ($_GET['sidebar'] == 'no')
			{
				$sidebar_class = "";
			}
		}
		else
		{
			if (! have_posts())
			{
				$sidebar_class = "";
			}
			elseif (is_single())
			{
				$post_sidebar = get_theme_mod('bookcard_setting_sidebar_post', 'Yes');
				
				if ($post_sidebar == 'No')
				{
					$sidebar_class = "";
				}
			}
			else
			{
				$blog_sidebar = get_theme_mod('bookcard_setting_sidebar_blog', 'Yes');
				
				if ($blog_sidebar == 'No')
				{
					$sidebar_class = "";
				}
			}
		}
		
		if ($class)
		{
			echo esc_attr($sidebar_class);
		}
		
		if ((! empty($sidebar_class)) && ($class == false))
		{
			bookcard_sidebar_html();
		}
	}

?>
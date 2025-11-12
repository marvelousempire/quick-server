<?php

	function efor_meta_box__sidebar($post)
	{
		?>
			<div class="admin-inside-box">
				<?php
					wp_nonce_field(
						'efor_meta_box__sidebar',
						'efor_meta_box_nonce__sidebar'
					);
				?>
				<p>
					<label for="efor_select_page_sidebar"><?php esc_html_e('Select Sidebar:', 'efor'); ?></label>
					<br>
					<?php
						$select_page_sidebar = get_option('efor_select_page_sidebar' . '__' . get_the_ID(), 'No Sidebar');
					?>
					<select id="efor_select_page_sidebar" name="efor_select_page_sidebar">
						<?php
							$current_screen = get_current_screen();
							
							if (($current_screen->id === 'post') || ($current_screen->id === 'portfolio') || ($current_screen->id === 'lp_course'))
							{
								$select_page_sidebar = get_option('efor_select_page_sidebar' . '__' . get_the_ID(), 'inherit');
								
								?>
									<option <?php if ($select_page_sidebar == 'inherit') { echo 'selected="selected"'; } ?> value="inherit"><?php esc_html_e('Inherit from Customizer', 'efor'); ?></option>
								<?php
							}
						?>
						<option <?php if ($select_page_sidebar == 'No Sidebar') { echo 'selected="selected"'; } ?> value="No Sidebar"><?php esc_html_e('No Sidebar', 'efor'); ?></option>
						<option <?php if ($select_page_sidebar == 'efor_sidebar_1') { echo 'selected="selected"'; } ?> value="efor_sidebar_1"><?php esc_html_e('Blog Sidebar', 'efor'); ?></option>
						<option <?php if ($select_page_sidebar == 'efor_sidebar_2') { echo 'selected="selected"'; } ?> value="efor_sidebar_2"><?php esc_html_e('Post Sidebar', 'efor'); ?></option>
						<option <?php if ($select_page_sidebar == 'efor_sidebar_3') { echo 'selected="selected"'; } ?> value="efor_sidebar_3"><?php esc_html_e('Page Sidebar', 'efor'); ?></option>
						<option <?php if ($select_page_sidebar == 'efor_sidebar_15') { echo 'selected="selected"'; } ?> value="efor_sidebar_15"><?php esc_html_e('Portfolio Sidebar', 'efor'); ?></option>
						<option <?php if ($select_page_sidebar == 'efor_sidebar_16') { echo 'selected="selected"'; } ?> value="efor_sidebar_16"><?php esc_html_e('Shop Sidebar', 'efor'); ?></option>
						<option <?php if ($select_page_sidebar == 'efor_sidebar_course') { echo 'selected="selected"'; } ?> value="efor_sidebar_course"><?php esc_html_e('Course Sidebar', 'efor'); ?></option>
						<?php
							$efor_sidebars_with_commas = get_option('efor_sidebars_with_commas');
							
							if ($efor_sidebars_with_commas != "")
							{
								$sidebars = preg_split("/[\s]*[,][\s]*/", $efor_sidebars_with_commas);
								
								foreach ($sidebars as $sidebar)
								{
									$sidebar_lowercase = strtolower($sidebar);
									$sidebar_id        = str_replace(" ", '_', $sidebar_lowercase); // Parameters: Old value, New value, String.
									
									$selected = "";
									
									if ($select_page_sidebar == $sidebar_id)
									{
										$selected = 'selected="selected"';
									}
									
									echo '<option ' . $selected . ' value="' . esc_attr($sidebar_id) . '">' . esc_html($sidebar) . '</option>';
								}
							}
						?>
					</select>
				</p>
				<p class="howto">
					<?php
						if ($current_screen->id === 'post')
						{
							esc_html_e('Inherit from Customizer: Appearance > Customize > Sidebar > Post Sidebar.', 'efor');
						}
						elseif ($current_screen->id === 'portfolio')
						{
							esc_html_e('Inherit from Customizer: Appearance > Customize > Sidebar > Portfolio Post Sidebar.', 'efor');
						}
						elseif ($current_screen->id === 'lp_course')
						{
							esc_html_e('Inherit from Customizer: Appearance > Customize > Sidebar > Course Sidebar.', 'efor');
						}
					?>
				</p>
				<p class="howto">
					<?php
						esc_html_e('- Sidebar is a widget area. You can find all available sidebars in your Widgets page under Appearance menu or Widgets section in Customizer.', 'efor');
					?>
				</p>
				<p class="howto">
					<?php
						esc_html_e('- Also you can create new sidebars from Appearance > Theme Options > Widget Areas.', 'efor');
					?>
				</p>
			</div>
		<?php
	}
	
	
	function efor_save_meta_box__sidebar($post_id)
	{
		if (! isset($_POST['efor_meta_box_nonce__sidebar']))
		{
			return $post_id;
		}
		
		$nonce = $_POST['efor_meta_box_nonce__sidebar'];
		
		if (! wp_verify_nonce($nonce, 'efor_meta_box__sidebar'))
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
		
		update_option('efor_select_page_sidebar' . '__' . $post_id, $_POST['efor_select_page_sidebar']);
	}
	
	add_action('save_post', 'efor_save_meta_box__sidebar');
	
	
	function efor_add_meta_boxes__sidebar()
	{
		$post_types = get_post_types();
		
		add_meta_box(
			'efor_add_meta_box__sidebar',
			esc_html__('Sidebar', 'efor'),
			'efor_meta_box__sidebar',
			$post_types,
			'side',
			'low'
		);
	}
	
	add_action('add_meta_boxes', 'efor_add_meta_boxes__sidebar');

?>
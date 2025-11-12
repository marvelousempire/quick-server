<?php

	function efor_meta_box__featured_area($post)
	{
		?>
			<div class="admin-inside-box">
				<?php
					wp_nonce_field(
						'efor_meta_box__featured_area',
						'efor_meta_box_nonce__featured_area'
					);
				?>
				<p>
					<label for="efor_select_page_featured_area"><?php esc_html_e('Select Featured Area:', 'efor'); ?></label>
					<br>
					<?php
						$select_page_featured_area = get_option('efor_select_page_featured_area' . '__' . get_the_ID(), 'No Featured Area');
					?>
					<select id="efor_select_page_featured_area" name="efor_select_page_featured_area">
						<option <?php if ($select_page_featured_area == 'No Featured Area') { echo 'selected="selected"'; } ?> value="No Featured Area"><?php esc_html_e('No Featured Area', 'efor'); ?></option>
						<option <?php if ($select_page_featured_area == 'efor_sidebar_13') { echo 'selected="selected"'; } ?> value="efor_sidebar_13"><?php esc_html_e('Blog Featured Area', 'efor'); ?></option>
						<option <?php if ($select_page_featured_area == 'efor_sidebar_14') { echo 'selected="selected"'; } ?> value="efor_sidebar_14"><?php esc_html_e('Page Featured Area', 'efor'); ?></option>
						<option <?php if ($select_page_featured_area == 'efor_sidebar_17') { echo 'selected="selected"'; } ?> value="efor_sidebar_17"><?php esc_html_e('Portfolio Featured Area', 'efor'); ?></option>
						<option <?php if ($select_page_featured_area == 'efor_sidebar_18') { echo 'selected="selected"'; } ?> value="efor_sidebar_18"><?php esc_html_e('Shop Featured Area', 'efor'); ?></option>
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
									
									if ($select_page_featured_area == $sidebar_id)
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
						esc_html_e('Featured Area is a widget area like sidebars. So you can create new one from Appearance > Theme Options > Widget Areas.', 'efor');
					?>
				</p>
				<p class="howto">
					<?php
						esc_html_e('Add Main Slider, Link Box or Intro widgets to your featured area. You can add many widgets to a featured area.', 'efor');
					?>
				</p>
			</div>
		<?php
	}
	
	
	function efor_save_meta_box__featured_area($post_id)
	{
		if (! isset($_POST['efor_meta_box_nonce__featured_area']))
		{
			return $post_id;
		}
		
		$nonce = $_POST['efor_meta_box_nonce__featured_area'];
		
		if (! wp_verify_nonce($nonce, 'efor_meta_box__featured_area'))
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
		
		update_option('efor_select_page_featured_area' . '__' . $post_id, $_POST['efor_select_page_featured_area']);
	}
	
	add_action('save_post', 'efor_save_meta_box__featured_area');
	
	
	function efor_add_meta_boxes__featured_area()
	{
		add_meta_box(
			'efor_add_meta_box__featured_area',
			esc_html__('Featured Area', 'efor'),
			'efor_meta_box__featured_area',
			array('page'),
			'side',
			'low'
		);
	}
	
	add_action('add_meta_boxes', 'efor_add_meta_boxes__featured_area');

?>
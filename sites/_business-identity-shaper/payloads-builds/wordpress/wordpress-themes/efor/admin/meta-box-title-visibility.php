<?php

	function efor_meta_box__title_visibility($post)
	{
		?>
			<?php
				wp_nonce_field(
					'efor_meta_box__title_visibility',
					'efor_meta_box_nonce__title_visibility'
				);
			?>
			<p>
				<?php
					$efor_title_visibility = get_option(get_the_ID() . 'efor_title_visibility', false);
				?>
				<label for="efor_title_visibility">
					<input type="checkbox" id="efor_title_visibility" name="efor_title_visibility" <?php if ($efor_title_visibility == true) { echo 'checked="checked"'; } ?>>
					<?php esc_html_e('Hide Title', 'efor'); ?>
				</label>
			</p>
		<?php
	}
	
	
	function efor_meta_box_save__title_visibility($post_id)
	{
		if (! isset($_POST['efor_meta_box_nonce__title_visibility']))
		{
			return $post_id;
		}
		
		$nonce = $_POST['efor_meta_box_nonce__title_visibility'];
		
		if (! wp_verify_nonce($nonce, 'efor_meta_box__title_visibility'))
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
		
		update_option($post_id . 'efor_title_visibility', $_POST['efor_title_visibility']);
	}
	
	add_action('save_post', 'efor_meta_box_save__title_visibility');
	
	
	function efor_add_meta_boxes__title_visibility()
	{
		add_meta_box(
			'efor_add_meta_box__title_visibility',
			esc_html__('Title Visibility', 'efor'),
			'efor_meta_box__title_visibility',
			array('page'),
			'side',
			'high'
		);
	}
	
	add_action('add_meta_boxes', 'efor_add_meta_boxes__title_visibility');

?>
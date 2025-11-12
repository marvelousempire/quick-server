<?php

	function efor_meta_box__post_style($post)
	{
		$current_screen = get_current_screen();
		
		?>
			<div class="admin-inside-box pixelwars-core--meta-box">
				<?php
					wp_nonce_field(
						'efor_meta_box__post_style',
						'efor_meta_box_nonce__post_style'
					);
				?>
				
				<p>
					<?php
						$post_style_label = esc_html__('Post Style', 'efor');
						
						if ($current_screen->id === 'page')
						{
							$post_style_label = esc_html__('Page Style', 'efor');
						}
					?>
					<label for="pixelwars_core_post_style"><?php echo esc_html($post_style_label); ?></label>
					<br>
					<?php
						$post_style = get_option('efor_post_style' . '__' . get_the_ID(), 'inherit');
						
						if ($post_style != 'used')
						{
							update_post_meta(get_the_ID(), 'pixelwars_core_post_style', $post_style);
							update_option('efor_post_style' . '__' . get_the_ID(), 'used');
						}
						
						$post_style = get_post_meta(get_the_ID(), 'pixelwars_core_post_style', true);
					?>
					<select id="pixelwars_core_post_style" name="pixelwars_core_post_style">
						<option <?php if ($post_style == 'inherit')                                                     { echo 'selected="selected"'; } ?> value="inherit"><?php                                                     esc_html_e('Inherit from Customizer',            'efor'); ?></option>
						<option <?php if ($post_style == 'post-header-classic')                                         { echo 'selected="selected"'; } ?> value="post-header-classic"><?php                                         esc_html_e('Classic',                            'efor'); ?></option>
						<option <?php if ($post_style == 'is-top-content-single-medium')                                { echo 'selected="selected"'; } ?> value="is-top-content-single-medium"><?php                                esc_html_e('Classic Medium',                     'efor'); ?></option>
						<option <?php if ($post_style == 'is-top-content-single-medium with-parallax')                  { echo 'selected="selected"'; } ?> value="is-top-content-single-medium with-parallax"><?php                  esc_html_e('Classic Medium Parallax',            'efor'); ?></option>
						<option <?php if ($post_style == 'is-top-content-single-full')                                  { echo 'selected="selected"'; } ?> value="is-top-content-single-full"><?php                                  esc_html_e('Classic Full',                       'efor'); ?></option>
						<option <?php if ($post_style == 'is-top-content-single-full with-parallax')                    { echo 'selected="selected"'; } ?> value="is-top-content-single-full with-parallax"><?php                    esc_html_e('Classic Full Parallax',              'efor'); ?></option>
						<option <?php if ($post_style == 'is-top-content-single-full-margins')                          { echo 'selected="selected"'; } ?> value="is-top-content-single-full-margins"><?php                          esc_html_e('Classic Full with Margins',          'efor'); ?></option>
						<option <?php if ($post_style == 'is-top-content-single-full-margins with-parallax')            { echo 'selected="selected"'; } ?> value="is-top-content-single-full-margins with-parallax"><?php            esc_html_e('Classic Full with Margins Parallax', 'efor'); ?></option>
						<option <?php if ($post_style == 'post-header-overlay post-header-overlay-inline is-post-dark') { echo 'selected="selected"'; } ?> value="post-header-overlay post-header-overlay-inline is-post-dark"><?php esc_html_e('Overlay',                            'efor'); ?></option>
						<option <?php if ($post_style == 'is-top-content-single-medium with-overlay')                   { echo 'selected="selected"'; } ?> value="is-top-content-single-medium with-overlay"><?php                   esc_html_e('Overlay Medium',                     'efor'); ?></option>
						<option <?php if ($post_style == 'is-top-content-single-full with-overlay')                     { echo 'selected="selected"'; } ?> value="is-top-content-single-full with-overlay"><?php                     esc_html_e('Overlay Full',                       'efor'); ?></option>
						<option <?php if ($post_style == 'is-top-content-single-full-margins with-overlay')             { echo 'selected="selected"'; } ?> value="is-top-content-single-full-margins with-overlay"><?php             esc_html_e('Overlay Full with Margins',          'efor'); ?></option>
						<option <?php if ($post_style == 'is-top-content-single-full-screen with-overlay')              { echo 'selected="selected"'; } ?> value="is-top-content-single-full-screen with-overlay"><?php              esc_html_e('Overlay Fullscreen',                 'efor'); ?></option>
						<option <?php if ($post_style == 'is-top-content-single-medium with-title-full')                { echo 'selected="selected"'; } ?> value="is-top-content-single-medium with-title-full"><?php                esc_html_e('Title Full',                         'efor'); ?></option>
						<option <?php if ($post_style == 'post-header-classic is-featured-image-left')                  { echo 'selected="selected"'; } ?> value="post-header-classic is-featured-image-left"><?php                  esc_html_e('Image Left',                         'efor'); ?></option>
						<option <?php if ($post_style == 'post-header-classic is-featured-image-right')                 { echo 'selected="selected"'; } ?> value="post-header-classic is-featured-image-right"><?php                 esc_html_e('Image Right',                        'efor'); ?></option>
					</select>
					<span class="howto">
						<?php
							if ($current_screen->id === 'page')
							{
								esc_html_e('"Inherit from Customizer": Appearance > Customize > Pages > Page Style.', 'efor');
							}
							elseif ($current_screen->id === 'post')
							{
								esc_html_e('"Inherit from Customizer": Appearance > Customize > Single Post > Post Style.', 'efor');
							}
							else
							{
								esc_html_e('"Inherit from Customizer": Appearance > Customize > Portfolio > Post Style.', 'efor');
							}
						?>
						<br>
						<?php
							esc_html_e('"Classic" style applies if there is no featured media.', 'efor');
						?>
						<br>
						<?php
							esc_html_e('"Image Left" and "Image Right" layouts display as classic style when featured video is present.', 'efor');
						?>
					</span>
				</p>
				
				<p>
					<?php
						$post_header_style_label = esc_html__('Post Header Style', 'efor');
						$current_screen          = get_current_screen();
						
						if ($current_screen->id === 'page')
						{
							$post_header_style_label = esc_html__('Page Header Style', 'efor');
						}
					?>
					<label for="pixelwars_core_header_style"><?php echo esc_html($post_header_style_label); ?></label>
					<br>
					<?php
						$post_header_style = get_post_meta(get_the_ID(), 'pixelwars_core_header_style', true);
					?>
					<select id="pixelwars_core_header_style" name="pixelwars_core_header_style">
						<option <?php if ($post_header_style == 'inherit')                                                                                                     { echo 'selected="selected"'; } ?> value="inherit"><?php                                                                                                     esc_html_e('Inherit from Customizer',  'efor'); ?></option>
						<option <?php if ($post_header_style == 'is-header-style-default')                                                                                     { echo 'selected="selected"'; } ?> value="is-header-style-default"><?php                                                                                     esc_html_e('Default',                  'efor'); ?></option>
						<option <?php if ($post_header_style == 'is-header-float is-header-transparent')                                                                       { echo 'selected="selected"'; } ?> value="is-header-float is-header-transparent"><?php                                                                       esc_html_e('Transparent',              'efor'); ?></option>
						<option <?php if ($post_header_style == 'is-header-float is-header-transparent is-header-float-margin')                                                { echo 'selected="selected"'; } ?> value="is-header-float is-header-transparent is-header-float-margin"><?php                                                esc_html_e('Transparent Margin',       'efor'); ?></option>
						<option <?php if ($post_header_style == 'is-header-float is-header-transparent is-header-half-transparent')                                            { echo 'selected="selected"'; } ?> value="is-header-float is-header-transparent is-header-half-transparent"><?php                                            esc_html_e('Half Transparent',         'efor'); ?></option>
						<option <?php if ($post_header_style == 'is-header-float is-header-transparent is-header-half-transparent is-header-float-box is-header-float-margin') { echo 'selected="selected"'; } ?> value="is-header-float is-header-transparent is-header-half-transparent is-header-float-box is-header-float-margin"><?php esc_html_e('Half Transparent Margin',  'efor'); ?></option>
						<option <?php if ($post_header_style == 'is-header-float is-header-transparent-light')                                                                 { echo 'selected="selected"'; } ?> value="is-header-float is-header-transparent-light"><?php                                                                 esc_html_e('Transparent Light',        'efor'); ?></option>
						<option <?php if ($post_header_style == 'is-header-float is-header-transparent-light is-header-float-margin')                                          { echo 'selected="selected"'; } ?> value="is-header-float is-header-transparent-light is-header-float-margin"><?php                                          esc_html_e('Transparent Light Margin', 'efor'); ?></option>
						<option <?php if ($post_header_style == 'is-header-float is-header-float-box')                                                                         { echo 'selected="selected"'; } ?> value="is-header-float is-header-float-box"><?php                                                                         esc_html_e('Floating Box',             'efor'); ?></option>
						<option <?php if ($post_header_style == 'is-header-float is-header-float-box is-header-float-margin')                                                  { echo 'selected="selected"'; } ?> value="is-header-float is-header-float-box is-header-float-margin"><?php                                                  esc_html_e('Floating Box Margin',      'efor'); ?></option>
						<option <?php if ($post_header_style == 'is-header-float is-header-float-box is-header-float-box-menu')                                                { echo 'selected="selected"'; } ?> value="is-header-float is-header-float-box is-header-float-box-menu"><?php                                                esc_html_e('Floating Box Menu',        'efor'); ?></option>
					</select>
					<span class="howto">
						<?php
							if ($current_screen->id === 'page')
							{
								esc_html_e('"Inherit from Customizer": Appearance > Customize > Pages > Page Header Style.', 'efor');
							}
							elseif ($current_screen->id === 'post')
							{
								esc_html_e('"Inherit from Customizer": Appearance > Customize > Single Post > Post Header Style.', 'efor');
							}
							else
							{
								esc_html_e('"Inherit from Customizer": Appearance > Customize > Portfolio > Post Header Style.', 'efor');
							}
						?>
					</span>
				</p>
			</div>
		<?php
	}
	
	
	function efor_save_meta_box__post_style($post_id)
	{
		if (! isset($_POST['efor_meta_box_nonce__post_style']))
		{
			return $post_id;
		}
		
		$nonce = $_POST['efor_meta_box_nonce__post_style'];
		
		if (! wp_verify_nonce($nonce, 'efor_meta_box__post_style'))
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
		
		update_post_meta($post_id, 'pixelwars_core_post_style',   $_POST['pixelwars_core_post_style']  );
		update_post_meta($post_id, 'pixelwars_core_header_style', $_POST['pixelwars_core_header_style']);
	}
	
	add_action('save_post', 'efor_save_meta_box__post_style');
	
	
	function efor_add_meta_boxes__post_style()
	{
		$meta_box_title = esc_html__('Post Style', 'efor');
		$current_screen = get_current_screen();
		
		if ($current_screen->id === 'page')
		{
			$meta_box_title = esc_html__('Page Style', 'efor');
		}
		
		$post_types = get_post_types();
		unset($post_types['attachment']);
		
		add_meta_box(
			'efor_add_meta_box__post_style',
			$meta_box_title,
			'efor_meta_box__post_style',
			$post_types,
			'side',
			'high'
		);
	}
	
	add_action('add_meta_boxes', 'efor_add_meta_boxes__post_style');


/* ============================================================================================================================================= */
/* ============================================================================================================================================= */


	function efor__pixelwars_core_header_style()
	{
		$post_header_style = "";
		
		if (is_home()) // Blog page.
		{
			$blog_page_id      = get_option('page_for_posts'); // Reading Settings > Posts page: Blog.
			$post_header_style = get_post_meta($blog_page_id, 'pixelwars_core_header_style', true);
		}
		else // Pages, Posts, Custom Post Types.
		{
			$post_header_style = get_post_meta(get_the_ID(), 'pixelwars_core_header_style', true);
		}
		
		return $post_header_style;
	}

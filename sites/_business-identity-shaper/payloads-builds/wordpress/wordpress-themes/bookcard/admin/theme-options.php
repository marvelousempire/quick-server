<?php

	function create_tabs( $current = 'general' )
	{
		$tabs = array(
			'general'   => 'General',
			'pages'     => 'Pages',
			'animation' => 'Animation',
			'style'     => 'Style',
			'portfolio' => 'Portfolio',
			'blog'      => 'Blog',
			'sidebar'   => 'Sidebar'
		);
		
		?>
			<h2 class="nav-tab-wrapper">
				<div id="icon-themes" class="icon32"></div>
				
				<div>
					<h2>Theme Options</h2>
				</div>
				
				<?php
					foreach ( $tabs as $tab => $name )
					{
						$class = ( $tab == $current ) ? ' nav-tab-active' : "";
						
						echo "<a class='nav-tab$class' href='?page=theme-options&tab=$tab'>$name</a>";
					}
				?>
			</h2>
		<?php
	}


/* ====================================================================================================================================================== */


	function theme_options_page()
	{
		global $pagenow;
		
		?>
			<div class="wrap wrap2">
				<script src="<?php echo get_template_directory_uri(); ?>/admin/colorpicker/colorpicker.js"></script>
				
				<div class="status">
					<img height="16" width="16" alt="..." src="<?php echo get_template_directory_uri(); ?>/admin/ajax-loader.gif">
					
					<strong></strong>
				</div>
				<!-- end .status -->
				
				<script>
					jQuery(document).ready(function($)
					{
					// -------------------------------------------------------------------------
					
						var uploadID = '',
							uploadImg = '';

						jQuery( '.upload-button' ).click(function()
						{
							uploadID = jQuery(this).prev( 'input' );
							uploadImg = jQuery(this).next( 'img' );
							formfield = jQuery( '.upload' ).attr( 'name' );
							tb_show( "", 'media-upload.php?post_id=0&amp;type=image&amp;TB_iframe=true' );
							return false;
						});
						
						window.send_to_editor = function( html )
						{
							imgurl = jQuery( 'img', html ).attr( 'src' );
							uploadID.val( imgurl );
							uploadImg.attr('src', imgurl);
							tb_remove();
						}
					
					// -------------------------------------------------------------------------
					
						$( ".alert-success p" ).click(function()
						{
							$(this).fadeOut( "slow", function()
							{
								$( ".alert-success" ).slideUp( "slow" );
							});
						});
					
					// -------------------------------------------------------------------------
						
						$( '.color-selector' ).each( function()
						{
							var cp = $( this );
							
							cp.ColorPicker(
							{
								color: '#ffffff',
								
								onBeforeShow: function ()
								{
									var myColor = $( this ).next( 'input' ).val();
									
									if ( myColor != "" )
									{
										$(this).ColorPickerSetColor( myColor );
										// cp.find( 'div' ).css( 'backgroundColor', '#' + myColor );
									}
								},
								onChange: function ( hsb, hex, rgb )
								{
									cp.find( 'div' ).css( 'backgroundColor', '#' + hex );
									cp.next( 'input' ).val( hex );
								},
								onSubmit: function( hsb, hex, rgb, el )
								{
									$( el ).val( hex );
									$( el ).ColorPickerHide();
								}
							});
						});
						
						
						$( '.color' ).change( function()
						{
							var myColor = $( this ).val();
							
							$( this ).prev( 'div' ).find( 'div' ).css( 'backgroundColor', '#' + myColor );
						});
						
						
						$( '.color' ).keypress( function()
						{
							var myColor = $( this ).val();
							
							$( this ).prev( 'div' ).find( 'div' ).css( 'backgroundColor', '#' + myColor );
						});
					
					// =========================================================================
					
						$( 'form.ajax-form' ).submit(function()
						{
							$.ajax(
							{
								data: $( this ).serialize(),
								type: "POST",
								beforeSend: function()
								{
									$( '.status' ).removeClass( 'status-done' );
									$( '.status img' ).show();
									$( '.status strong' ).html( 'Saving...' );
									$( '.status' ).fadeIn();
								},
								success: function(data)
								{
									$( '.status img' ).hide();
									$( '.status' ).addClass( 'status-done' );
									$( '.status strong' ).html( 'Done.' );
									$( '.status' ).delay( 1000 ).fadeOut();
								}
							});
							
							return false;
						});
					
					// =========================================================================

						
					
					// -------------------------------------------------------------------------
					
						/*
						
						var calcHeight = function()
						{
							$( "#preview-frame" ).height($(window).height() - 100);
						}

						$(document).ready(function()
						{
							calcHeight();
						});

						$(window).resize(function()
						{
							calcHeight();
							
						}).load(function()
						{
							calcHeight();
						});
						
						*/
					
					// -------------------------------------------------------------------------
					});
				</script>
				
				<?php
					if ( isset( $_GET['tab'] ) )
					{
						create_tabs( $_GET['tab'] );
					}	
					else
					{
						create_tabs( 'general' );
					}
				?>

				<div id="poststuff">
					<?php
					
						// theme options page
						if ( $pagenow == 'themes.php' && $_GET['page'] == 'theme-options' )
						{
							// tab from url
							if ( isset( $_GET['tab'] ) )
							{
								$tab = $_GET['tab'];
							}
							else
							{
								$tab = 'general'; 
							}
							
							
							switch ( $tab )
							{
								case 'general' :
									
									if ( esc_attr( @$_GET['saved'] ) == 'true' )
									{
										echo '<div class="alert-success" title="Click to close"><p><strong>Saved.</strong></p></div>';
									}
									
									?>
										<div class="postbox">
											<div class="inside">
												<form method="post" class="ajax-form" action="<?php admin_url( 'themes.php?page=theme-options' ); ?>">
													<?php
														wp_nonce_field( "settings-page" );
													?>
													
													<table>
														<tr>
															<td class="option-left">
																<h4>Logo Type</h4>
																
																<?php
																	$logo_type = get_option( 'logo_type', 'Text Logo' );
																?>
																<select id="logo_type" name="logo_type" style="width: 100%;">
																	<option <?php if ( $logo_type == 'Text Logo' ) { echo 'selected="selected"'; } ?>>Text Logo</option>
																	
																	<option <?php if ( $logo_type == 'Image Logo' ) { echo 'selected="selected"'; } ?>>Image Logo</option>
																</select>
															</td>
															
															<td class="option-right">
																Select.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Text Logo</h4>
																
																<?php
																	$select_text_logo = get_option( 'select_text_logo', 'Theme Site Title' );
																?>
																<select id="select_text_logo" name="select_text_logo" style="width: 100%;">
																	<option <?php if ( $select_text_logo == 'WordPress Site Title' ) { echo 'selected="selected"'; } ?>>WordPress Site Title</option>
																	
																	<option <?php if ( $select_text_logo == 'Theme Site Title' ) { echo 'selected="selected"'; } ?>>Theme Site Title</option>
																	
																	<option <?php if ( $select_text_logo == 'Front Cover Page Title' ) { echo 'selected="selected"'; } ?>>Front Cover Page Title</option>
																</select>
																
																<h4>Theme Site Title</h4>
																
																<?php
																	$your_name = stripcslashes( get_option( 'your_name', "" ) );
																?>
																<textarea id="your_name" name="your_name" rows="1" cols="50"><?php echo $your_name; ?></textarea>
															</td>
															
															<td class="option-right">
																Select.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Image Logo</h4>
																
																<?php
																	$logo_image = get_option( 'logo_image' );
																?>
																<input type="text" id="logo_image" name="logo_image" class="upload code2" style="width: 100%;" value="<?php echo $logo_image; ?>">
																<input type="button" class="button upload-button" style="margin-top: 10px;" value="Browse">
																<img style="margin-top: 10px; max-height: 50px;" align="right" alt="" src="<?php echo $logo_image; ?>">
															</td>
															
															<td class="option-right">
																Upload a logo or specify an image address of your online logo.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Tagline</h4>
																
																<?php
																	$select_tagline = get_option( 'select_tagline', 'Theme Tagline' );
																?>
																<select id="select_tagline" name="select_tagline" style="width: 100%;">
																	<option <?php if ( $select_tagline == 'WordPress Tagline' ) { echo 'selected="selected"'; } ?>>WordPress Tagline</option>
																	
																	<option <?php if ( $select_tagline == 'Theme Tagline' ) { echo 'selected="selected"'; } ?>>Theme Tagline</option>
																</select>
																
																<h4>Theme Tagline</h4>
																
																<?php
																	$your_slogan = stripcslashes( get_option( 'your_slogan', "" ) );
																?>
																<textarea id="your_slogan" name="your_slogan" rows="2" cols="50"><?php echo $your_slogan; ?></textarea>
															</td>
															
															<td class="option-right">
																Select.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Front Cover Image</h4>
																
																<?php
																	$front_cover_image = get_option( 'front_cover_image', "" );
																?>
																<input type="text" id="front_cover_image" name="front_cover_image" class="upload code2" style="width: 100%;" value="<?php echo $front_cover_image; ?>">
																
																<input type="button" class="button upload-button" style="margin-top: 10px;" value="Browse">
																
																<img style="margin-top: 10px; max-height: 50px;" align="right" alt="" src="<?php echo $front_cover_image; ?>">
															</td>
															
															<td class="option-right">
																Upload.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Back Cover Image</h4>
																
																<?php
																	$back_cover_image = get_option( 'back_cover_image', "" );
																?>
																<input type="text" id="back_cover_image" name="back_cover_image" class="upload code2" style="width: 100%;" value="<?php echo $back_cover_image; ?>">
																
																<input type="button" class="button upload-button" style="margin-top: 10px;" value="Browse">
																
																<img style="margin-top: 10px; max-height: 50px;" align="right" alt="" src="<?php echo $back_cover_image; ?>">
															</td>
															
															<td class="option-right">
																Upload.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Login Logo</h4>
																
																<?php
																	$logo_login = get_option( 'logo_login', "" );
																?>
																<input type="text" id="logo_login" name="logo_login" class="upload code2" style="width: 100%;" value="<?php echo $logo_login; ?>">
																
																<input type="button" class="button upload-button" style="margin-top: 10px;" value="Browse">
																
																<img style="margin-top: 10px; max-height: 50px;" align="right" alt="" src="<?php echo $logo_login; ?>">
																
																<br>
																
																<?php
																	$logo_login_hide = get_option( 'logo_login_hide', false );
																?>
																<label><input type="checkbox" id="logo_login_hide" name="logo_login_hide" <?php if ( $logo_login_hide ) { echo 'checked="checked"'; } ?>> Hide Login Logo Module</label>
															</td>
															
															<td class="option-right">
																(274x63)px PNG image.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Twitter Username</h4>
																
																<?php
																	$twitter_username = get_option( 'twitter_username', "" );
																?>
																<input type="text" id="twitter_username" name="twitter_username" style="width: 100%;" value="<?php echo $twitter_username; ?>">
															</td>
															<td class="option-right">
																Enter your username.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Twitter Icon URL</h4>
																
																<?php
																	$twitter_icon_url = get_option( 'twitter_icon_url', "" );
																?>
																<input type="text" id="twitter_icon_url" name="twitter_icon_url" class="code2" style="width: 100%;" value="<?php echo $twitter_icon_url; ?>">
															</td>
															
															<td class="option-right">
																Icon link address.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<input type="submit" name="submit" class="button button-primary button-large" value="Save Changes">
																
																<input type="hidden" name="settings-submit" value="Y">
															</td>
															
															<td class="option-right">
																
															</td>
														</tr>
													</table>
												</form>
											</div>
											<!-- end .inside -->
										</div>
										<!-- end .postbox -->
									<?php
								
								break;
								
								case 'animation' :
								
									if ( esc_attr( @$_GET['saved'] ) == 'true' )
									{
										echo '<div class="alert-success" title="Click to close"><p><strong>Saved.</strong></p></div>';
									}
									
									?>
										<div class="postbox">
											<div class="inside">
												<form method="post" action="<?php admin_url( 'themes.php?page=theme-options' ); ?>" class="ajax-form">
													<?php
														wp_nonce_field( "settings-page" );
													?>
													
													<table>
														<tr>
															<td class="option-left">
																<label><input type="checkbox" id="enable_scrollbar" name="enable_scrollbar" value="enable_scrollbar" <?php if ( get_option( 'enable_scrollbar' ) ) { echo 'checked="checked"'; } ?>> Always Show Scrollbar</label>
															</td>
															
															<td class="option-right">
																Activates scrollbar to show always.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<label><input type="checkbox" id="enable_safe_mod" name="enable_safe_mod" <?php if ( get_option( 'enable_safe_mod' ) ) { echo 'checked="checked"'; } ?> value="enable_safe_mod"> Activate Classic Layout</label>
															</td>
															
															<td class="option-right">
																Disable 3D layout for all devices.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Safe Mode Page In Animation</h4>
																
																<?php
																	if ( get_option( 'safe_mod_page_in_animation' ) )
																	{
																		$safe_mod_page_in_animation = get_option( 'safe_mod_page_in_animation' );
																	}
																	else
																	{
																		$safe_mod_page_in_animation = 'fadeInLeft';
																	}
																?>
																<select id="safe_mod_page_in_animation" name="safe_mod_page_in_animation" style="width: 100%;">
																	<option <?php if ( $safe_mod_page_in_animation == "" ) { echo 'selected="selected"'; } ?>></option>
																	<option <?php if ( $safe_mod_page_in_animation == 'flash' ) { echo 'selected="selected"'; } ?>>flash</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'bounce' ) { echo 'selected="selected"'; } ?>>bounce</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'shake' ) { echo 'selected="selected"'; } ?>>shake</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'tada' ) { echo 'selected="selected"'; } ?>>tada</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'swing' ) { echo 'selected="selected"'; } ?>>swing</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'wobble' ) { echo 'selected="selected"'; } ?>>wobble</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'wiggle' ) { echo 'selected="selected"'; } ?>>wiggle</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'pulse' ) { echo 'selected="selected"'; } ?>>pulse</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'flip' ) { echo 'selected="selected"'; } ?>>flip</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'flipInX' ) { echo 'selected="selected"'; } ?>>flipInX</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'flipInY' ) { echo 'selected="selected"'; } ?>>flipInY</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'fadeIn' ) { echo 'selected="selected"'; } ?>>fadeIn</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'fadeInUp' ) { echo 'selected="selected"'; } ?>>fadeInUp</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'fadeInDown' ) { echo 'selected="selected"'; } ?>>fadeInDown</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'fadeInLeft' ) { echo 'selected="selected"'; } ?>>fadeInLeft</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'fadeInRight' ) { echo 'selected="selected"'; } ?>>fadeInRight</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'fadeInUpBig' ) { echo 'selected="selected"'; } ?>>fadeInUpBig</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'fadeInDownBig' ) { echo 'selected="selected"'; } ?>>fadeInDownBig</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'fadeInLeftBig' ) { echo 'selected="selected"'; } ?>>fadeInLeftBig</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'fadeInRightBig' ) { echo 'selected="selected"'; } ?>>fadeInRightBig</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'bounceIn' ) { echo 'selected="selected"'; } ?>>bounceIn</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'bounceInDown' ) { echo 'selected="selected"'; } ?>>bounceInDown</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'bounceInUp' ) { echo 'selected="selected"'; } ?>>bounceInUp</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'bounceInLeft' ) { echo 'selected="selected"'; } ?>>bounceInLeft</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'bounceInRight' ) { echo 'selected="selected"'; } ?>>bounceInRight</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'rotateIn' ) { echo 'selected="selected"'; } ?>>rotateIn</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'rotateInDownLeft' ) { echo 'selected="selected"'; } ?>>rotateInDownLeft</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'rotateInDownRight' ) { echo 'selected="selected"'; } ?>>rotateInDownRight</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'rotateInUpLeft' ) { echo 'selected="selected"'; } ?>>rotateInUpLeft</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'rotateInUpRight' ) { echo 'selected="selected"'; } ?>>rotateInUpRight</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'lightSpeedIn' ) { echo 'selected="selected"'; } ?>>lightSpeedIn</option>
																	<option <?php if ( $safe_mod_page_in_animation == 'rollIn' ) { echo 'selected="selected"'; } ?>>rollIn</option>
																</select>
															</td>
															
															<td class="option-right">
																Determines the animation type for page transitions when in safe mode.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Portfolio Details Page In Animation</h4>
																
																<?php
																	if ( get_option( 'pf_details_page_in_animation' ) )
																	{
																		$pf_details_page_in_animation = get_option( 'pf_details_page_in_animation' );
																	}
																	else
																	{
																		$pf_details_page_in_animation = 'fadeInLeft';
																	}
																?>
																<select id="pf_details_page_in_animation" name="pf_details_page_in_animation" style="width: 100%;">
																	<option <?php if ( $pf_details_page_in_animation == "" ) { echo 'selected="selected"'; } ?>></option>
																	<option <?php if ( $pf_details_page_in_animation == 'flash' ) { echo 'selected="selected"'; } ?>>flash</option>
																	<option <?php if ( $pf_details_page_in_animation == 'bounce' ) { echo 'selected="selected"'; } ?>>bounce</option>
																	<option <?php if ( $pf_details_page_in_animation == 'shake' ) { echo 'selected="selected"'; } ?>>shake</option>
																	<option <?php if ( $pf_details_page_in_animation == 'tada' ) { echo 'selected="selected"'; } ?>>tada</option>
																	<option <?php if ( $pf_details_page_in_animation == 'swing' ) { echo 'selected="selected"'; } ?>>swing</option>
																	<option <?php if ( $pf_details_page_in_animation == 'wobble' ) { echo 'selected="selected"'; } ?>>wobble</option>
																	<option <?php if ( $pf_details_page_in_animation == 'wiggle' ) { echo 'selected="selected"'; } ?>>wiggle</option>
																	<option <?php if ( $pf_details_page_in_animation == 'pulse' ) { echo 'selected="selected"'; } ?>>pulse</option>
																	<option <?php if ( $pf_details_page_in_animation == 'flip' ) { echo 'selected="selected"'; } ?>>flip</option>
																	<option <?php if ( $pf_details_page_in_animation == 'flipInX' ) { echo 'selected="selected"'; } ?>>flipInX</option>
																	<option <?php if ( $pf_details_page_in_animation == 'flipInY' ) { echo 'selected="selected"'; } ?>>flipInY</option>
																	<option <?php if ( $pf_details_page_in_animation == 'fadeIn' ) { echo 'selected="selected"'; } ?>>fadeIn</option>
																	<option <?php if ( $pf_details_page_in_animation == 'fadeInUp' ) { echo 'selected="selected"'; } ?>>fadeInUp</option>
																	<option <?php if ( $pf_details_page_in_animation == 'fadeInDown' ) { echo 'selected="selected"'; } ?>>fadeInDown</option>
																	<option <?php if ( $pf_details_page_in_animation == 'fadeInLeft' ) { echo 'selected="selected"'; } ?>>fadeInLeft</option>
																	<option <?php if ( $pf_details_page_in_animation == 'fadeInRight' ) { echo 'selected="selected"'; } ?>>fadeInRight</option>
																	<option <?php if ( $pf_details_page_in_animation == 'fadeInUpBig' ) { echo 'selected="selected"'; } ?>>fadeInUpBig</option>
																	<option <?php if ( $pf_details_page_in_animation == 'fadeInDownBig' ) { echo 'selected="selected"'; } ?>>fadeInDownBig</option>
																	<option <?php if ( $pf_details_page_in_animation == 'fadeInLeftBig' ) { echo 'selected="selected"'; } ?>>fadeInLeftBig</option>
																	<option <?php if ( $pf_details_page_in_animation == 'fadeInRightBig' ) { echo 'selected="selected"'; } ?>>fadeInRightBig</option>
																	<option <?php if ( $pf_details_page_in_animation == 'bounceIn' ) { echo 'selected="selected"'; } ?>>bounceIn</option>
																	<option <?php if ( $pf_details_page_in_animation == 'bounceInDown' ) { echo 'selected="selected"'; } ?>>bounceInDown</option>
																	<option <?php if ( $pf_details_page_in_animation == 'bounceInUp' ) { echo 'selected="selected"'; } ?>>bounceInUp</option>
																	<option <?php if ( $pf_details_page_in_animation == 'bounceInLeft' ) { echo 'selected="selected"'; } ?>>bounceInLeft</option>
																	<option <?php if ( $pf_details_page_in_animation == 'bounceInRight' ) { echo 'selected="selected"'; } ?>>bounceInRight</option>
																	<option <?php if ( $pf_details_page_in_animation == 'rotateIn' ) { echo 'selected="selected"'; } ?>>rotateIn</option>
																	<option <?php if ( $pf_details_page_in_animation == 'rotateInDownLeft' ) { echo 'selected="selected"'; } ?>>rotateInDownLeft</option>
																	<option <?php if ( $pf_details_page_in_animation == 'rotateInDownRight' ) { echo 'selected="selected"'; } ?>>rotateInDownRight</option>
																	<option <?php if ( $pf_details_page_in_animation == 'rotateInUpLeft' ) { echo 'selected="selected"'; } ?>>rotateInUpLeft</option>
																	<option <?php if ( $pf_details_page_in_animation == 'rotateInUpRight' ) { echo 'selected="selected"'; } ?>>rotateInUpRight</option>
																	<option <?php if ( $pf_details_page_in_animation == 'lightSpeedIn' ) { echo 'selected="selected"'; } ?>>lightSpeedIn</option>
																	<option <?php if ( $pf_details_page_in_animation == 'rollIn' ) { echo 'selected="selected"'; } ?>>rollIn</option>
																</select>
															</td>
															
															<td class="option-right">
																Determines the animation type for ajax portfolio details page in animation.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Portfolio Details Page Out Animation</h4>
																
																<?php
																	if ( get_option( 'pf_details_page_out_animation' ) )
																	{
																		$pf_details_page_out_animation = get_option( 'pf_details_page_out_animation' );
																	}
																	else
																	{
																		$pf_details_page_out_animation = 'fadeOutRightBig';
																	}
																?>
																<select id="pf_details_page_out_animation" name="pf_details_page_out_animation" style="width: 100%;">
																	<option <?php if ( $pf_details_page_out_animation == "" ) { echo 'selected="selected"'; } ?>></option>
																	<option <?php if ( $pf_details_page_out_animation == 'flipOutX' ) { echo 'selected="selected"'; } ?>>flipOutX</option>
																	<option <?php if ( $pf_details_page_out_animation == 'flipOutY' ) { echo 'selected="selected"'; } ?>>flipOutY</option>
																	<option <?php if ( $pf_details_page_out_animation == 'fadeOut' ) { echo 'selected="selected"'; } ?>>fadeOut</option>
																	<option <?php if ( $pf_details_page_out_animation == 'fadeOutUp' ) { echo 'selected="selected"'; } ?>>fadeOutUp</option>
																	<option <?php if ( $pf_details_page_out_animation == 'fadeOutDown' ) { echo 'selected="selected"'; } ?>>fadeOutDown</option>
																	<option <?php if ( $pf_details_page_out_animation == 'fadeOutLeft' ) { echo 'selected="selected"'; } ?>>fadeOutLeft</option>
																	<option <?php if ( $pf_details_page_out_animation == 'fadeOutRight' ) { echo 'selected="selected"'; } ?>>fadeOutRight</option>
																	<option <?php if ( $pf_details_page_out_animation == 'fadeOutUpBig' ) { echo 'selected="selected"'; } ?>>fadeOutUpBig</option>
																	<option <?php if ( $pf_details_page_out_animation == 'fadeOutDownBig' ) { echo 'selected="selected"'; } ?>>fadeOutDownBig</option>
																	<option <?php if ( $pf_details_page_out_animation == 'fadeOutLeftBig' ) { echo 'selected="selected"'; } ?>>fadeOutLeftBig</option>
																	<option <?php if ( $pf_details_page_out_animation == 'fadeOutRightBig' ) { echo 'selected="selected"'; } ?>>fadeOutRightBig</option>
																	<option <?php if ( $pf_details_page_out_animation == 'bounceOut' ) { echo 'selected="selected"'; } ?>>bounceOut</option>
																	<option <?php if ( $pf_details_page_out_animation == 'bounceOutDown' ) { echo 'selected="selected"'; } ?>>bounceOutDown</option>
																	<option <?php if ( $pf_details_page_out_animation == 'bounceOutUp' ) { echo 'selected="selected"'; } ?>>bounceOutUp</option>
																	<option <?php if ( $pf_details_page_out_animation == 'bounceOutLeft' ) { echo 'selected="selected"'; } ?>>bounceOutLeft</option>
																	<option <?php if ( $pf_details_page_out_animation == 'bounceOutRight' ) { echo 'selected="selected"'; } ?>>bounceOutRight</option>
																	<option <?php if ( $pf_details_page_out_animation == 'rotateOut' ) { echo 'selected="selected"'; } ?>>rotateOut</option>
																	<option <?php if ( $pf_details_page_out_animation == 'rotateOutDownLeft' ) { echo 'selected="selected"'; } ?>>rotateOutDownLeft</option>
																	<option <?php if ( $pf_details_page_out_animation == 'rotateOutDownRight' ) { echo 'selected="selected"'; } ?>>rotateOutDownRight</option>
																	<option <?php if ( $pf_details_page_out_animation == 'rotateOutUpLeft' ) { echo 'selected="selected"'; } ?>>rotateOutUpLeft</option>
																	<option <?php if ( $pf_details_page_out_animation == 'rotateOutUpRight' ) { echo 'selected="selected"'; } ?>>rotateOutUpRight</option>
																	<option <?php if ( $pf_details_page_out_animation == 'lightSpeedOut' ) { echo 'selected="selected"'; } ?>>lightSpeedOut</option>
																	<option <?php if ( $pf_details_page_out_animation == 'hinge' ) { echo 'selected="selected"'; } ?>>hinge</option>
																	<option <?php if ( $pf_details_page_out_animation == 'rollOut' ) { echo 'selected="selected"'; } ?>>rollOut</option>
																</select>
															</td>
															
															<td class="option-right">
																Determines the animation type for ajax portfolio details page out animation.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Cover Heading 1 Tune</h4>
																
																<?php
																	$cover_heading_1_tune = get_option( 'cover_heading_1_tune', '0.85' );
																?>
																<input type="number" step="0.05" size="6" maxlength="6" id="cover_heading_1_tune" name="cover_heading_1_tune" class="widefat" value="<?php echo $cover_heading_1_tune; ?>">
																
																<span style="font-size: 11px; color: #666;">Default: 0.85</span>
															</td>
															
															<td class="option-right">
																Site title font size ratio.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Cover Heading 2 Tune</h4>
																
																<?php
																	$cover_heading_2_tune = get_option( 'cover_heading_2_tune', '2.3' );
																?>
																<input type="number" step="0.05" size="6" maxlength="6" id="cover_heading_2_tune" name="cover_heading_2_tune" class="widefat" value="<?php echo $cover_heading_2_tune; ?>">
																
																<span style="font-size: 11px; color: #666;">Default: 2.3</span>
															</td>
															
															<td class="option-right">
																Tagline font size ratio.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Cover Heading 3 Tune</h4>
																
																<?php
																	$cover_heading_3_tune = get_option( 'cover_heading_3_tune', '0.6' );
																?>
																<input type="number" step="0.05" size="6" maxlength="6" id="cover_heading_3_tune" name="cover_heading_3_tune" class="widefat" value="<?php echo $cover_heading_3_tune; ?>">
																
																<span style="font-size: 11px; color: #666;">Default: 0.6</span>
															</td>
															
															<td class="option-right">
																Cover caption font size ratio.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Cover Heading 3 Sub Tune</h4>
																
																<?php
																	$cover_heading_3_sub_tune = get_option( 'cover_heading_3_sub_tune', '0.8' );
																?>
																<input type="number" step="0.05" size="6" maxlength="6" id="cover_heading_3_sub_tune" name="cover_heading_3_sub_tune" class="widefat" value="<?php echo $cover_heading_3_sub_tune; ?>">
																
																<span style="font-size: 11px; color: #666;">Default: 0.8</span>
															</td>
															
															<td class="option-right">
																Cover sub caption font size ratio.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<input type="submit" name="submit" class="button button-primary button-large" value="Save Changes">
																
																<input type="hidden" name="settings-submit" value="Y">
															</td>
															
															<td class="option-right">
																
															</td>
														</tr>
													</table>
												</form>
											</div>
											<!-- end .inside -->
										</div>
										<!-- end .postbox -->
									<?php
								
								break;
									
								case 'style' :
									
									if ( esc_attr( @$_GET['saved'] ) == 'true' )
									{
										echo '<div class="alert-success" title="Click to close"><p><strong>Saved.</strong></p></div>';
									}
									
									?>
										<div class="postbox">
											<div class="inside">
												<form class="ajax-form" method="post" action="<?php admin_url( 'themes.php?page=theme-options' ); ?>">
													<?php
														wp_nonce_field( "settings-page" );
													?>
													
													<table>
														<tr>
															<td class="option-left">
																<h4>Fonts</h4>
																
																<?php
																	echo '<a href="' . admin_url( 'customize.php' ) . '">Customize</a>';
																?>
															</td>
															
															<td class="option-right">
																Select from theme customizer.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Cover Style</h4>
																
																<?php
																	$cover_style = get_option( 'cover_style', 'standart' );
																?>
																<select id="cover_style" name="cover_style" style="width: 100%;">
																	<option <?php if ( $cover_style == 'default' ) { echo 'selected="selected"'; } ?>>default</option>
																	<option <?php if ( $cover_style == 'standart' ) { echo 'selected="selected"'; } ?>>standart</option>
																	<option <?php if ( $cover_style == 'deep' ) { echo 'selected="selected"'; } ?>>deep</option>
																	<option <?php if ( $cover_style == 'fancy' ) { echo 'selected="selected"'; } ?>>fancy</option>
																	<option <?php if ( $cover_style == 'fire' ) { echo 'selected="selected"'; } ?>>fire</option>
																	<option <?php if ( $cover_style == 'future' ) { echo 'selected="selected"'; } ?>>future</option>
																	<option <?php if ( $cover_style == 'modern' ) { echo 'selected="selected"'; } ?>>modern</option>
																	<option <?php if ( $cover_style == 'neon' ) { echo 'selected="selected"'; } ?>>neon</option>
																	<option <?php if ( $cover_style == 'retro' ) { echo 'selected="selected"'; } ?>>retro</option>
																</select>
															</td>
															
															<td class="option-right">
																Select.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Base Style</h4>
																
																<?php
																	$base_style = get_option( 'base_style', 'clean' );
																?>
																<select id="base_style" name="base_style" style="width: 100%;">
																	<option <?php if ( $base_style == 'default' ) { echo 'selected="selected"'; } ?>>default</option>
																	<option <?php if ( $base_style == 'clean' ) { echo 'selected="selected"'; } ?>>clean</option>
																	<option <?php if ( $base_style == 'modern' ) { echo 'selected="selected"'; } ?>>modern</option>
																	<option <?php if ( $base_style == 'retro' ) { echo 'selected="selected"'; } ?>>retro</option>
																	<option <?php if ( $base_style == 'retro3d' ) { echo 'selected="selected"'; } ?>>retro3d</option>
																</select>
															</td>
															
															<td class="option-right">
																Select.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Paper Background</h4>
																
																<?php
																	$paper_background = get_option( 'paper_background', 'cream-dust' );
																?>
																<select id="paper_background" name="paper_background" style="width: 100%;">
																	<option <?php if ( $paper_background == 'clean' ) { echo 'selected="selected"'; } ?>>clean</option>
																	<option <?php if ( $paper_background == 'cream-dust' ) { echo 'selected="selected"'; } ?>>cream-dust</option>
																	<option <?php if ( $paper_background == 'blizzard' ) { echo 'selected="selected"'; } ?>>blizzard</option>
																	<option <?php if ( $paper_background == 'grid' ) { echo 'selected="selected"'; } ?>>grid</option>
																	<option <?php if ( $paper_background == 'groovepaper' ) { echo 'selected="selected"'; } ?>>groovepaper</option>
																	<option <?php if ( $paper_background == 'hand-made-paper' ) { echo 'selected="selected"'; } ?>>hand-made-paper</option>
																	<option <?php if ( $paper_background == 'light-paper-fibers' ) { echo 'selected="selected"'; } ?>>light-paper-fibers</option>
																	<option <?php if ( $paper_background == 'lined-paper' ) { echo 'selected="selected"'; } ?>>lined-paper</option>
																	<option <?php if ( $paper_background == 'paper' ) { echo 'selected="selected"'; } ?>>paper</option>
																	<option <?php if ( $paper_background == 'project-paper' ) { echo 'selected="selected"'; } ?>>project-paper</option>
																	<option <?php if ( $paper_background == 'rice-paper' ) { echo 'selected="selected"'; } ?>>rice-paper</option>
																</select>
															</td>
															
															<td class="option-right">
																Select.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Body Background</h4>
																
																<?php
																	$body_background = get_option( 'body_background', 'wood' );
																?>
																<select id="body_background" name="body_background" style="width: 100%;">
																	<option <?php if ( $body_background == 'wood' ) { echo 'selected="selected"'; } ?>>wood</option>
																	<option <?php if ( $body_background == 'bricks' ) { echo 'selected="selected"'; } ?>>bricks</option>
																	<option <?php if ( $body_background == 'bricks-2' ) { echo 'selected="selected"'; } ?>>bricks-2</option>
																	<option <?php if ( $body_background == 'bricks-3' ) { echo 'selected="selected"'; } ?>>bricks-3</option>
																	<option <?php if ( $body_background == 'bricks-4' ) { echo 'selected="selected"'; } ?>>bricks-4</option>
																	<option <?php if ( $body_background == 'bricks-light' ) { echo 'selected="selected"'; } ?>>bricks-light</option>
																	<option <?php if ( $body_background == 'carbon' ) { echo 'selected="selected"'; } ?>>carbon</option>
																	<option <?php if ( $body_background == 'clouds' ) { echo 'selected="selected"'; } ?>>clouds</option>
																	<option <?php if ( $body_background == 'clouds-2' ) { echo 'selected="selected"'; } ?>>clouds-2</option>
																	<option <?php if ( $body_background == 'concrete' ) { echo 'selected="selected"'; } ?>>concrete</option>
																	<option <?php if ( $body_background == 'concrete-2' ) { echo 'selected="selected"'; } ?>>concrete-2</option>
																	<option <?php if ( $body_background == 'ground' ) { echo 'selected="selected"'; } ?>>ground</option>
																	<option <?php if ( $body_background == 'grunge-wall' ) { echo 'selected="selected"'; } ?>>grunge-wall</option>
																	<option <?php if ( $body_background == 'grunge-wall-dark' ) { echo 'selected="selected"'; } ?>>grunge-wall-dark</option>
																	<option <?php if ( $body_background == 'leather' ) { echo 'selected="selected"'; } ?>>leather</option>
																	<option <?php if ( $body_background == 'linen' ) { echo 'selected="selected"'; } ?>>linen</option>
																	<option <?php if ( $body_background == 'metal-holes' ) { echo 'selected="selected"'; } ?>>metal-holes</option>
																	<option <?php if ( $body_background == 'mosaic' ) { echo 'selected="selected"'; } ?>>mosaic</option>
																	<option <?php if ( $body_background == 'noisy-net' ) { echo 'selected="selected"'; } ?>>noisy-net</option>
																	<option <?php if ( $body_background == 'shattered' ) { echo 'selected="selected"'; } ?>>shattered</option>
																	<option <?php if ( $body_background == 'stone' ) { echo 'selected="selected"'; } ?>>stone</option>
																	<option <?php if ( $body_background == 'stone-blocks' ) { echo 'selected="selected"'; } ?>>stone-blocks</option>
																	<option <?php if ( $body_background == 'tiles' ) { echo 'selected="selected"'; } ?>>tiles</option>
																	<option <?php if ( $body_background == 'watercolor' ) { echo 'selected="selected"'; } ?>>watercolor</option>
																	<option <?php if ( $body_background == 'wood-2' ) { echo 'selected="selected"'; } ?>>wood-2</option>
																	<option <?php if ( $body_background == 'wood-3' ) { echo 'selected="selected"'; } ?>>wood-3</option>
																	<option <?php if ( $body_background == 'wood-4' ) { echo 'selected="selected"'; } ?>>wood-4</option>
																	<option <?php if ( $body_background == 'woven' ) { echo 'selected="selected"'; } ?>>woven</option>
																</select>
															</td>
															
															<td class="option-right">
																Select.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Custom CSS</h4>
																
																<?php
																	$custom_css = stripcslashes( get_option( 'custom_css', "" ) );
																?>
																<textarea id="custom_css" name="custom_css" class="code2" rows="8" cols="50"><?php echo $custom_css; ?></textarea>
															</td>
															
															<td class="option-right">
																Quickly add custom css.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>External CSS</h4>
																
																<?php
																	$external_css_head = stripcslashes( get_option( 'external_css_head', "" ) );
																?>
																<textarea id="external_css_head" name="external_css_head" class="code2" rows="8" cols="50"><?php echo $external_css_head; ?></textarea>
															</td>
															
															<td class="option-right">
																Add your custom external (.css) file.
																<br>
																<br>
																Sample (.css):
																<br>
																<br>
																<span class="code2">&lt;link rel="stylesheet" type="text/css" href="yourstyle.css"&gt;</span>
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>External JS</h4>
																
																<?php
																	$external_css = stripcslashes( get_option( 'external_css', "" ) );
																?>
																<textarea id="external_css" name="external_css" class="code2" rows="8" cols="50"><?php echo $external_css; ?></textarea>
															</td>
															
															<td class="option-right">
																Add your custom external (.js) file.
																<br>
																<br>
																Sample (.js):
																<br>
																<br>
																<span class="code2">&lt;script src="yourscript.js"&gt;&lt;/script&gt;</span>
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<input type="submit" name="submit" class="button button-primary button-large" value="Save Changes">
																
																<input type="hidden" name="settings-submit" value="Y">
															</td>
															
															<td class="option-right">
																
															</td>
														</tr>
													</table>
												</form>
											</div>
											<!-- end .inside -->
										</div>
										<!-- end .postbox -->
									<?php
									
								break;
								
								
								case 'portfolio' :
									
									if ( esc_attr( @$_GET['saved'] ) == 'true' )
									{
										echo '<div class="alert-success" title="Click to close"><p><strong>Saved.</strong></p></div>';
									}
									
									?>
										<div class="postbox">
											<div class="inside">
												<form class="ajax-form" method="post" action="<?php admin_url( 'themes.php?page=theme-options' ); ?>">
													<?php
														wp_nonce_field( 'settings-page' );
													?>
													
													<table>
														<tr>
															<td class="option-left">
																<h4>Ajax</h4>
																
																<?php
																	$pf_ajax = get_option( 'pf_ajax', 'Yes' );
																?>
																<select id="pf_ajax" name="pf_ajax" style="width: 100%;">
																	<option <?php if ( $pf_ajax == 'Yes' ) { echo 'selected="selected"'; } ?>>Yes</option>
																	
																	<option <?php if ( $pf_ajax == 'No' ) { echo 'selected="selected"'; } ?>>No</option>
																</select>
															</td>
															
															<td class="option-right">
																Enable/disable ajax functionality.
															</td>
														</tr>
														
														
														<tr>
															<td class="option-left">
																<input type="submit" name="submit" class="button button-primary button-large" value="Save Changes">
																
																<input type="hidden" name="settings-submit" value="Y">
															</td>
															
															<td class="option-right">
																
															</td>
														</tr>
													</table>
												</form>
											</div>
											<!-- end .inside -->
										</div>
										<!-- end .postbox -->
									<?php
								break;
								
								case 'pages' :
									
									if ( esc_attr( @$_GET['saved'] ) == 'true' )
									{
										echo '<div class="alert-success" title="Click to close"><p><strong>Saved.</strong></p></div>';
									}
									
									?>
										<div class="postbox">
											<div class="inside">
												<form class="ajax-form" method="post" action="<?php admin_url( 'themes.php?page=theme-options' ); ?>">
													<?php
														wp_nonce_field( "settings-page" );
													?>
													
													<table>
														<tr>
															<td class="option-left">
																<h4>Front Cover Page</h4>
																
																<?php
																	$front_cover_page = stripcslashes( get_option( 'front_cover_page', "" ) );
																?>
																<select id="front_cover_page" name="front_cover_page" style="width: 100%;">
																	<option></option>
																	
																	<?php
																		$pages = get_pages();
																		
																		foreach ( $pages as $page )
																		{
																			if ( $page->post_name == $front_cover_page )
																			{
																				$option = '<option value="' . $page->post_name . '" selected="selected">' . $page->post_title . '</option>';
																				
																				echo $option;
																			}
																			else
																			{
																				$option = '<option value="' . $page->post_name . '">' . $page->post_title . '</option>';
																				
																				echo $option;
																			}
																			// end if
																		}
																		// end foreach
																	?>
																</select>
															</td>
															
															<td class="option-right">
																Select.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Resume Page</h4>
																
																<?php
																	$resume_page = stripcslashes( get_option( 'resume_page', "" ) );
																?>
																<select id="resume_page" name="resume_page" style="width: 100%;">
																	<option></option>
																	
																	<?php
																		$pages = get_pages();
																		
																		foreach ( $pages as $page )
																		{
																			if ( $page->post_name == $resume_page )
																			{
																				$option = '<option value="' . $page->post_name . '" selected="selected">' . $page->post_title . '</option>';
																				
																				echo $option;
																			}
																			else
																			{
																				$option = '<option value="' . $page->post_name . '">' . $page->post_title . '</option>';
																				
																				echo $option;
																			}
																			// end if
																		}
																		// end foreach
																	?>
																</select>
															</td>
															
															<td class="option-right">
																Select.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Contact Page</h4>
																
																<?php
																	$contact_page = stripcslashes( get_option( 'contact_page', "" ) );
																?>
																<select id="contact_page" name="contact_page" style="width: 100%;">
																	<option></option>
																	
																	<?php
																		$pages = get_pages();
																		
																		foreach ( $pages as $page )
																		{
																			if ( $page->post_name == $contact_page )
																			{
																				$option = '<option value="' . $page->post_name . '" selected="selected">' . $page->post_title . '</option>';
																				
																				echo $option;
																			}
																			else
																			{
																				$option = '<option value="' . $page->post_name . '">' . $page->post_title . '</option>';
																				
																				echo $option;
																			}
																			// end if
																		}
																		// end foreach
																	?>
																</select>
															</td>
															
															<td class="option-right">
																Select.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Portfolio Page</h4>
																
																<?php
																	$pf_page = stripcslashes( get_option( 'pf_page', "" ) );
																?>
																<select id="pf_page" name="pf_page" style="width: 100%;">
																	<option></option>
																	
																	<?php
																		$pages = get_pages();
																		
																		foreach ( $pages as $page )
																		{
																			if ( $page->post_name == $pf_page )
																			{
																				$option = '<option value="' . $page->post_name . '" selected="selected">' . $page->post_title . '</option>';
																				
																				echo $option;
																			}
																			else
																			{
																				$option = '<option value="' . $page->post_name . '">' . $page->post_title . '</option>';
																				
																				echo $option;
																			}
																			// end if
																		}
																		// end foreach
																	?>
																</select>
															</td>
															
															<td class="option-right">
																Select.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<h4>Portfolio Page Content Editor</h4>
																
																<?php
																	$pf_content_editor = get_option( 'pf_content_editor', 'Bottom' );
																?>
																<select id="pf_content_editor" name="pf_content_editor" style="width: 100%;">
																	<option <?php if ( $pf_content_editor == 'Top' ) { echo 'selected="selected"'; } ?>>Top</option>
																	<option <?php if ( $pf_content_editor == 'Bottom' ) { echo 'selected="selected"'; } ?>>Bottom</option>
																</select>
															</td>
															
															<td class="option-right">
																Above / below location.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<input type="submit" name="submit" class="button button-primary button-large" value="Save Changes">
																<input type="hidden" name="settings-submit" value="Y">
															</td>
															<td class="option-right">
																
															</td>
														</tr>
													</table>
												</form>
											</div>
											<!-- end .inside -->
										</div>
										<!-- end .postbox -->
									<?php
								break;
								
								case 'blog' :
									
									if ( esc_attr( @$_GET['saved'] ) == 'true' )
									{
										echo '<div class="alert-success" title="Click to close"><p><strong>Saved.</strong></p></div>';
									}
									
									?>
										<div class="postbox">
											<div class="inside">
												<form class="ajax-form" method="post" action="<?php admin_url( 'themes.php?page=theme-options' ); ?>">
													<?php
														wp_nonce_field( 'settings-page' );
													?>
													
													<table>
														<tr>
															<td class="option-left">
																<h4>Resume Page Blog</h4>
																
																<?php
																	$resume_page_blog = get_option('resume_page_blog', 'No');
																?>
																<select id="resume_page_blog" name="resume_page_blog" class="widefat">
																	<option <?php if ($resume_page_blog == 'No')     { echo 'selected="selected"'; } ?>>No</option>
																	<option <?php if ($resume_page_blog == 'Type 1') { echo 'selected="selected"'; } ?>>Type 1</option>
																	<option <?php if ($resume_page_blog == 'Type 2') { echo 'selected="selected"'; } ?>>Type 2</option>
																	<option <?php if ($resume_page_blog == 'Type 3') { echo 'selected="selected"'; } ?>>Type 3</option>
																</select>
																
																<h4>Number of posts to show</h4>
																
																<?php
																	$resume_page_blog_posts_count = get_option('resume_page_blog_posts_count', '10');
																?>
																<input type="number" step="1" min="1" id="resume_page_blog_posts_count" name="resume_page_blog_posts_count" class="widefat" value="<?php echo $resume_page_blog_posts_count; ?>">
																
																<span style="font-size: 11px; color: #666;">Default: 10</span>
															</td>
															
															<td class="option-right">
																Add blog posts to resume page.
															</td>
														</tr>
														
														<tr>
															<td class="option-left">
																<input type="submit" name="submit" class="button button-primary button-large" value="Save Changes">
																<input type="hidden" name="settings-submit" value="Y">
															</td>
															
															<td class="option-right">
																
															</td>
														</tr>
													</table>
												</form>
											</div>
											<!-- end .inside -->
										</div>
										<!-- end .postbox -->
									<?php
								break;
								
								case 'sidebar' :
								
									if ( esc_attr( @$_GET['saved'] ) == 'true' )
									{
										$no_sidebar_name = get_option( 'no_sidebar_name' );
										
										if ( $no_sidebar_name == "" )
										{
											echo '<div class="alert-success" title="Click to close"><p><strong>Enter a text for new sidebar name.</strong></p></div>';
										}
										else
										{
											echo '<div class="alert-success" title="Click to close"><p><strong>Created.</strong></p></div>';
										}
									}
									
									?>
										<div class="postbox">
											<div class="inside">
												<form method="post" action="<?php admin_url( 'admin.php?page=theme-settings' ); ?>">
													<?php
														wp_nonce_field( "settings-page" );
													?>
													<table>
														<tr>
															<td class="option-left">
																<h4>New Sidebar</h4>
																<input type="text" id="new_sidebar_name" name="new_sidebar_name" required="required" style="width: 100%;" value="">
															</td>
															<td class="option-right">
																Enter a text for a new sidebar name.
															</td>
														</tr>
														<tr>
															<td class="option-left">
																<input type="submit" name="submit" class="button button-primary button-large" value="Create">
																<input type="hidden" name="settings-submit" value="Y">
															</td>
															<td class="option-right">
																Create new sidebar.
															</td>
														</tr>
														<tr>
															<td class="option-left">
																<h4>Sidebars</h4>
																<select id="sidebars" name="sidebars" style="width: 100%;" size="10">
																	<?php
																		$bookcard_sidebars_with_commas = get_option( 'bookcard_sidebars_with_commas' );
																	
																		$sidebars = preg_split("/[\s]*[,][\s]*/", $bookcard_sidebars_with_commas);

																		foreach ( $sidebars as $sidebar_name )
																		{
																			echo '<option>' . $sidebar_name . '</option>';
																		}
																	?>
																</select>
															</td>
															<td class="option-right">
																New sidebar name must be different from created sidebar names.
															</td>
														</tr>
													</table>
												</form>
											</div>
											<!-- end .inside -->
										</div>
										<!-- end .postbox -->
									<?php
								break;
							}
							// end tab content
						}
						// end settings page
					?>
				</div>
				<!-- end #poststuff -->
			</div>
			<!-- end .wrap2 -->
		<?php
	}
	// end theme_options_page
	
/* ====================================================================================================================================================== */
	
	function save_settings()
	{
		global $pagenow;
		
		if ( $pagenow == 'themes.php' && $_GET['page'] == 'theme-options' )
		{
			if ( isset ( $_GET['tab'] ) )
			{
				$tab = $_GET['tab'];
			}
			else
			{
				$tab = 'general';
			}
			
			
			switch ( $tab )
			{
				case 'general' :
					
					update_option( 'logo_type', $_POST['logo_type'] );
					update_option( 'select_text_logo', $_POST['select_text_logo'] );
					update_option( 'your_name', $_POST['your_name'] );
					update_option( 'logo_image', $_POST['logo_image'] );
					update_option( 'select_tagline', $_POST['select_tagline'] );
					update_option( 'your_slogan', $_POST['your_slogan'] );
					update_option( 'front_cover_image', $_POST['front_cover_image'] );
					update_option( 'back_cover_image', $_POST['back_cover_image'] );
					update_option( 'logo_login', $_POST['logo_login'] );
					update_option( 'logo_login_hide', $_POST['logo_login_hide'] );
					update_option( 'twitter_username', $_POST['twitter_username'] );
					update_option( 'twitter_icon_url', $_POST['twitter_icon_url'] );
					
				break;
				
				case 'animation' :
					
					update_option( 'enable_scrollbar', esc_attr( $_POST['enable_scrollbar'] ) );
					update_option( 'enable_safe_mod', esc_attr( $_POST['enable_safe_mod'] ) );
					update_option( 'safe_mod_page_in_animation', esc_attr( $_POST['safe_mod_page_in_animation'] ) );
					update_option( 'pf_details_page_in_animation', esc_attr( $_POST['pf_details_page_in_animation'] ) );
					update_option( 'pf_details_page_out_animation', esc_attr( $_POST['pf_details_page_out_animation'] ) );
					update_option( 'cover_heading_1_tune', $_POST['cover_heading_1_tune'] );
					update_option( 'cover_heading_2_tune', $_POST['cover_heading_2_tune'] );
					update_option( 'cover_heading_3_tune', $_POST['cover_heading_3_tune'] );
					update_option( 'cover_heading_3_sub_tune', $_POST['cover_heading_3_sub_tune'] );
					
				break;
				
				case 'style' :
					
					update_option( 'cover_style', $_POST['cover_style'] );
					update_option( 'base_style', $_POST['base_style'] );
					update_option( 'paper_background', $_POST['paper_background'] );
					update_option( 'body_background', $_POST['body_background'] );
					update_option( 'custom_css', $_POST['custom_css'] );
					update_option( 'external_css_head', $_POST['external_css_head'] );
					update_option( 'external_css', $_POST['external_css'] );
					
				break;
				
				
				case 'portfolio' :
					
					update_option( 'pf_ajax', $_POST['pf_ajax'] );
					
				break;
				
				
				case 'pages' :
					
					update_option( 'front_cover_page', esc_attr( $_POST['front_cover_page'] ) );
					update_option( 'resume_page', esc_attr( $_POST['resume_page'] ) );
					update_option( 'contact_page', esc_attr( $_POST['contact_page'] ) );
					update_option( 'pf_page', esc_attr( $_POST['pf_page'] ) );
					update_option( 'pf_content_editor', $_POST['pf_content_editor'] );
					
				break;
				
				case 'blog' :
				
					update_option('resume_page_blog',             $_POST['resume_page_blog']);
					update_option('resume_page_blog_posts_count', $_POST['resume_page_blog_posts_count']);
				
				break;
				
				case 'sidebar' :
				
					update_option( 'no_sidebar_name', esc_attr( $_POST['new_sidebar_name'] ) );
					
					if ( esc_attr( $_POST['new_sidebar_name'] ) != "" )
					{
						if ( get_option( 'bookcard_sidebars_with_commas' ) == "" )
						{
							update_option( 'bookcard_sidebars_with_commas', esc_attr( $_POST['new_sidebar_name'] ) );
						}
						else
						{
							update_option( 'bookcard_sidebars_with_commas', get_option( 'bookcard_sidebars_with_commas' ) . ',' . esc_attr( $_POST['new_sidebar_name'] ) );
						}
					}
				
				break;
			}
		}
	}


/* ====================================================================================================================================================== */


	function load_settings_page()
	{
		if ( isset( $_POST["settings-submit"] ) == 'Y' )
		{
			check_admin_referer( "settings-page" );
			
			save_settings();
			
			$url_parameters = isset( $_GET['tab'] ) ? 'tab=' . $_GET['tab'] . '&saved=true' : 'saved=true';
			
			wp_redirect( admin_url( 'themes.php?page=theme-options&' . $url_parameters ) );
			
			exit;
		}
	}


/* ====================================================================================================================================================== */


	function my_theme_menu()
	{
		$settings_page = add_theme_page('Theme Options',
										'Theme Options',
										'edit_theme_options',
										'theme-options',
										'theme_options_page' );
		
		add_action( "load-{$settings_page}", 'load_settings_page' );
	}
	
	add_action( 'admin_menu', 'my_theme_menu' );


?>
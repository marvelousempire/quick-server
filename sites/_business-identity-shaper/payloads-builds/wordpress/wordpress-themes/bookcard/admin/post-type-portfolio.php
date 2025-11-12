<?php

	function create_post_type_portfolio()
	{
		$labels = array('name' => __( 'Portfolio', 'bookcard' ),
						'singular_name' => __( 'Portfolio Item', 'bookcard' ),
						'add_new' => __( 'Add New', 'bookcard' ),
						'add_new_item' => __( 'Add New', 'bookcard' ),
						'edit_item' => __( 'Edit', 'bookcard' ),
						'new_item' => __( 'New', 'bookcard' ),
						'all_items' => __( 'All', 'bookcard' ),
						'view_item' => __( 'View', 'bookcard' ),
						'search_items' => __( 'Search', 'bookcard' ),
						'not_found' =>  __( 'No Items found', 'bookcard' ),
						'not_found_in_trash' => __( 'No Items found in Trash', 'bookcard' ),
						'parent_item_colon' => '',
						'menu_name' => 'Portfolio' );
		
		$args = array(  'labels' => $labels,
						'public' => true,
						'exclude_from_search' => false,
						'publicly_queryable' => true,
						'show_ui' => true,
						'query_var' => true,
						'show_in_nav_menus' => true,
						'capability_type' => 'post',
						'hierarchical' => false,
						'menu_position' => 5,
						'supports' => array( 'title', 'editor', 'thumbnail', 'comments', 'revisions' ),
						'rewrite' => array( 'slug' => 'portfolio', 'with_front' => false ));
					
		register_post_type( 'portfolio' , $args );
	}
	// end create_post_type_portfolio
	
	add_action( 'init', 'create_post_type_portfolio' );
	
	
	function portfolio_updated_messages( $messages )
	{
		global $post, $post_ID;
		
		$messages['portfolio'] = array( 0 => "", // Unused. Messages start at index 1.
										1 => sprintf( __( '<strong>Updated.</strong> <a target="_blank" href="%s">View</a>', 'bookcard' ), esc_url( get_permalink( $post_ID) ) ),
										2 => __( 'Custom field updated.', 'bookcard' ),
										3 => __( 'Custom field deleted.', 'bookcard' ),
										4 => __( 'Updated.', 'bookcard' ),
										// translators: %s: date and time of the revision
										5 => isset( $_GET['revision'] ) ? sprintf( __( 'Restored to revision from %s', 'bookcard' ), wp_post_revision_title( ( int ) $_GET['revision'], false ) ) : false,
										6 => sprintf( __( '<strong>Published.</strong> <a target="_blank" href="%s">View</a>', 'bookcard' ), esc_url( get_permalink( $post_ID) ) ),
										7 => __( 'Saved.', 'bookcard' ),
										8 => sprintf( __( 'Submitted. <a target="_blank" href="%s">Preview</a>', 'bookcard' ), esc_url( add_query_arg( 'preview', 'true', get_permalink($post_ID) ) ) ),
										9 => sprintf( __( 'Scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview</a>', 'bookcard' ),
										// translators: Publish box date format, see http://php.net/date
										date_i18n( __( 'M j, Y @ G:i', 'bookcard' ), strtotime( $post->post_date ) ), esc_url( get_permalink( $post_ID) ) ),
										10 => sprintf( __( '<strong>Item draft updated.</strong> <a target="_blank" href="%s">Preview</a>', 'bookcard' ), esc_url( add_query_arg( 'preview', 'true', get_permalink( $post_ID) ) ) ) );
	
		return $messages;
	}
	// end portfolio_updated_messages
	
	add_filter( 'post_updated_messages', 'portfolio_updated_messages' );
	
	
	function portfolio_columns( $pf_columns )
	{
		$pf_columns = array('cb' => '<input type="checkbox">',
							'title' => __( 'Title', 'bookcard' ),
							'pf_featured_image' => __( 'Featured Image', 'bookcard' ),
							'departments' => __( 'Departments', 'bookcard' ),
							'pf_short_description' => __( 'Short Description', 'bookcard' ),
							'portfolio_type' => __( 'Type', 'bookcard' ),
							'date' => __( 'Date', 'bookcard' ) );
		
		return $pf_columns;
	}
	// end portfolio_columns
	
	add_filter( 'manage_edit-portfolio_columns', 'portfolio_columns' );
	
	
	function portfolio_custom_columns( $pf_column )
	{
		global $post, $post_ID;
		
		switch ( $pf_column )
		{
			case 'pf_featured_image':
			
				the_post_thumbnail(
					'thumbnail',
					array(
						'style' => 'max-height: 40px; max-width: 40px;'
					)
				);
			
			break;
			
			case 'departments':
			
				$taxon = 'department';
				$terms_list = get_the_terms( $post_ID, $taxon );
				
				if ( ! empty( $terms_list ) )
				{
					$out = array();
					
					foreach ( $terms_list as $term_list )
					{
						$out[] = '<a href="edit.php?post_type=portfolio&department=' .$term_list->slug .'">' .$term_list->name .' </a>';
					}
					
					echo join( ', ', $out );
				}
				
			break;
			
			case 'pf_short_description':
			
				$pf_short_description = stripcslashes( get_option( $post->ID . 'pf_short_description', "" ) );
				
				echo $pf_short_description;
				
			break;
			
			case 'portfolio_type':
			
				$pf_type = get_option( $post->ID . 'pf_type', 'Standard' );
				
				echo $pf_type;
				
			break;
		}
		// end switch
	}
	// end portfolio_custom_columns
	
	add_action( 'manage_posts_custom_column',  'portfolio_custom_columns' );
	
	
	function portfolio_taxonomy()
	{
		$labels_dep = array('name' => __( 'Departments', 'bookcard' ),
							'singular_name' => __( 'Department', 'bookcard' ),
							'search_items' =>  __( 'Search', 'bookcard' ),
							'all_items' => __( 'All', 'bookcard' ),
							'parent_item' => __( 'Parent Department', 'bookcard' ),
							'parent_item_colon' => __( 'Parent Department:', 'bookcard' ),
							'edit_item' => __( 'Edit', 'bookcard' ),
							'update_item' => __( 'Update', 'bookcard' ),
							'add_new_item' => __( 'Add New', 'bookcard' ),
							'new_item_name' => __( 'New Department Name', 'bookcard' ),
							'menu_name' => __( 'Departments', 'bookcard' ) );

		register_taxonomy(  'department',
							array( 'portfolio' ),
							array( 'hierarchical' => true,
							'labels' => $labels_dep,
							'show_ui' => true,
							'public' => true,
							'query_var' => true,
							'rewrite' => array( 'slug' => 'department' ) ) );
	}
	// end portfolio_taxonomy
	
	add_action( 'init', 'portfolio_taxonomy' );
	
	
	function only_show_departments()
	{
		global $typenow;
		
		if ( $typenow == 'portfolio' )
		{
			$filters = array( 'department' );
			
			foreach ( $filters as $tax_slug )
			{
				$tax_obj = get_taxonomy( $tax_slug );
				$tax_name = $tax_obj->labels->name;
				$terms = get_terms( $tax_slug );
			
				echo '<select name="' .$tax_slug .'" id="' .$tax_slug .'" class="postform">';
				echo '<option value="">' . __( 'Show All', 'bookcard' ) . ' ' .$tax_name .'</option>';
				
				foreach ( $terms as $term )
				{
					echo '<option value='. $term->slug, @$_GET[$tax_slug] == $term->slug ? ' selected="selected"' : '','>' . $term->name .' (' . $term->count .')</option>';
				}
				
				echo '</select>';
			}
			// end foreach
		}
		// end if
	}
	// end only_show_departments

	add_action( 'restrict_manage_posts', 'only_show_departments' );
	
	
	function portfolio_metabox()
	{
		global $post, $post_ID;
		
		?>
			<input type="hidden" name="portfolio_nonce" value="<?php echo wp_create_nonce( basename(__FILE__) ); ?>">
			
			<h4><?php echo __( 'Type', 'bookcard' ); ?></h4>
			
			<p class="pf-type-wrap">
				<?php
					$pf_type = get_option( $post->ID . 'pf_type', 'Standard' );
				?>
				<label style="display: inline-block; margin-bottom: 5px;">
					<input type="radio" name="pf_type" <?php if ( $pf_type == 'Standard' ) { echo 'checked="checked"'; } ?> value="Standard"> <?php echo __( 'Standard', 'bookcard' ); ?>
				</label>
				<br>
				<label style="display: inline-block; margin-bottom: 5px;">
					<input type="radio" name="pf_type" <?php if ( $pf_type == 'Lightbox Featured Image' ) { echo 'checked="checked"'; } ?> value="Lightbox Featured Image"> <?php echo __( 'Lightbox Featured Image', 'bookcard' ); ?>
				</label>
				<br>
				<label style="display: inline-block; margin-bottom: 5px;">
					<input type="radio" name="pf_type" <?php if ( $pf_type == 'Lightbox Gallery' ) { echo 'checked="checked"'; } ?> value="Lightbox Gallery"> <?php echo __( 'Lightbox Gallery', 'bookcard' ); ?>
				</label>
				<br>
				<label style="display: inline-block; margin-bottom: 5px;">
					<input type="radio" name="pf_type" <?php if ( $pf_type == 'Lightbox Video' ) { echo 'checked="checked"'; } ?> value="Lightbox Video"> <?php echo __( 'Lightbox Video', 'bookcard' ); ?>
				</label>
				<br>
				<label style="display: inline-block; margin-bottom: 5px;">
					<input type="radio" name="pf_type" <?php if ( $pf_type == 'Lightbox Audio' ) { echo 'checked="checked"'; } ?> value="Lightbox Audio"> <?php echo __( 'Lightbox Audio', 'bookcard' ); ?>
				</label>
				<br>
				<label style="display: inline-block;">
					<input type="radio" name="pf_type" <?php if ( $pf_type == 'Direct URL' ) { echo 'checked="checked"'; } ?> class="pf-type-direct-url" value="Direct URL"> <?php echo __( 'Direct URL', 'bookcard' ); ?>
				</label>
			</p>
			
			<p class="direct-url-wrap" style="<?php if ( $pf_type == 'Direct URL' ) { echo 'display: block;'; } else { echo 'display: none;'; } ?>">
				<?php
					$pf_direct_url = stripcslashes( get_option( $post->ID . 'pf_direct_url' ) );
					$pf_link_new_tab = get_option( $post->ID . 'pf_link_new_tab', true );
				?>
				<label for="pf_direct_url"><?php echo __( 'Direct URL:', 'bookcard' ); ?></label>
				<input type="text" id="pf_direct_url" name="pf_direct_url" class="widefat code2" placeholder="Link Url" value="<?php echo $pf_direct_url; ?>">
				<label style="display: inline-block; margin-top: 5px;"><input type="checkbox" id="pf_link_new_tab" name="pf_link_new_tab" <?php if ( $pf_link_new_tab ) { echo 'checked="checked"'; } ?>> <?php echo __( 'Open link in new tab', 'bookcard' ); ?></label>
			</p>
			
			<script>
				jQuery(document).ready(function($)
				{
					$( '.pf-type-wrap label' ).click(function()
					{
						if ( $( this ).find( 'input' ).hasClass( 'pf-type-direct-url' ) )
						{
							$( '.direct-url-wrap' ).show();
						}
						else
						{
							$( '.direct-url-wrap' ).hide();
						}
					});
				});
			</script>
			
			<hr>
			
			<h4><?php echo __( 'Thumbnail Size', 'bookcard' ); ?></h4>
			
			<p>
				<?php
					$pf_thumb_size = get_option( $post->ID . 'pf_thumb_size', 'x1' );
				?>
				<label style="display: inline-block; margin-bottom: 5px;"><input type="radio" name="pf_thumb_size" <?php if ( $pf_thumb_size == 'x1' ) { echo 'checked="checked"'; } ?> value="x1"> <?php echo __( '1x', 'bookcard' ); ?></label>
				<br>
				<label style="display: inline-block; margin-bottom: 5px;"><input type="radio" name="pf_thumb_size" <?php if ( $pf_thumb_size == 'x2' ) { echo 'checked="checked"'; } ?> value="x2"> <?php echo __( '2x', 'bookcard' ); ?></label>
			</p>
			
			<hr>
			
			<h4><?php echo __( 'Short Description', 'bookcard' ); ?></h4>
			
			<p>
				<?php
					$pf_short_description = stripcslashes( get_option( $post->ID . 'pf_short_description' ) );
				?>
				<textarea id="pf_short_description" name="pf_short_description" rows="4" cols="46" class="widefat"><?php echo $pf_short_description; ?></textarea>
			</p>
		<?php
	}
	// end portfolio_metabox
	
	
	function add_portfolio_metabox()
	{
		add_meta_box( 'portfolio_metabox', __( 'Details', 'bookcard' ), 'portfolio_metabox', 'portfolio', 'side', 'low' );
	}
	// end add_portfolio_metabox
	
	add_action( 'admin_init', 'add_portfolio_metabox' );
	
	
	function save_portfolio_details( $post_id )
	{
		global $post, $post_ID;
	
		if ( ! wp_verify_nonce( @$_POST['portfolio_nonce'], basename(__FILE__) ) )
		{
			return $post_id;
		}
		
		
		if ( $_POST['post_type'] == 'portfolio' )
		{
			if ( ! current_user_can( 'edit_page', $post_id ) )
			{
				return $post_id;
			}
		}
		else
		{
			if ( ! current_user_can( 'edit_post', $post_id ) )
			{
				return $post_id;
			}
		}
		
		
		if ( $_POST['post_type'] == 'portfolio' )
		{
			update_option( $post->ID . 'pf_type', $_POST['pf_type'] );
			update_option( $post->ID . 'pf_direct_url', $_POST['pf_direct_url'] );
			update_option( $post->ID . 'pf_link_new_tab', $_POST['pf_link_new_tab'] );
			update_option( $post->ID . 'pf_thumb_size', $_POST['pf_thumb_size'] );
			update_option( $post->ID . 'pf_short_description', $_POST['pf_short_description'] );
		}
	}
	
	add_action( 'save_post', 'save_portfolio_details' );

?>
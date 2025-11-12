<?php
	$terms = get_the_terms( $post->ID, 'department' );
	$on_draught = "";
	
	if ( $terms && ! is_wp_error( $terms ) ) :
		
		$draught_links = array();
		
		foreach ( $terms as $term )
		{
			$draught_links[] = $term->slug;
		}
		
		$on_draught = join( " ", $draught_links );
		
	endif;
	
	$pf_thumb_size = get_option( $post->ID . 'pf_thumb_size' );
?>


<div id="post-<?php the_ID(); ?>" <?php post_class( 'url hentry' . ' ' . $on_draught . ' ' . $pf_thumb_size ); ?>>
	<div class="media-box">
		<?php
			if ( has_post_thumbnail() )
			{
				if ( $pf_thumb_size == 'x2' )
				{
					the_post_thumbnail( 'portfolio_image_2x', array( 'alt' => get_the_title(), 'title' => "" ) );
				}
				else
				{
					the_post_thumbnail( 'portfolio_image_1x', array( 'alt' => get_the_title(), 'title' => "" ) );
				}
			}
		?>
		
		
		<div class="mask">
			<?php
				$pf_direct_url = stripcslashes( get_option( $post->ID . 'pf_direct_url', "" ) );
				$pf_link_new_tab = get_option( $post->ID . 'pf_link_new_tab', true );
			?>
			
			<a <?php if ( $pf_link_new_tab == true ) { echo 'target="_blank"'; } ?> href="<?php echo $pf_direct_url; ?>"></a>
		</div>
	</div>
	
	
	<h4><?php the_title(); ?></h4>
	
	
	<?php
		$pf_short_description = stripcslashes( get_option( $post->ID . 'pf_short_description', "" ) );
	?>
	<p class="category"><?php echo $pf_short_description; ?></p>
</div>
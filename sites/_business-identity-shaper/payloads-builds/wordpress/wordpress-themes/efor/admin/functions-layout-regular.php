<?php

	function efor_featured_media__layout_regular($first_full = 'No', $blog_grid_type = 'masonry')
	{
		$browser_address_url = stripcslashes(get_option(get_the_ID() . 'efor_featured_video_url'));
		$browser_address_url = trim($browser_address_url); // Strip whitespace (or other characters) from the beginning and end of the string.
		
		if (! empty($browser_address_url))
		{
			?>
				<div class="featured-image">
					<?php
						echo efor_iframe_from_xml($browser_address_url);
					?>
				</div> <!-- .featured-image -->
			<?php
		}
		elseif (has_post_thumbnail())
		{
			?>
				<div class="featured-image">
					<a href="<?php the_permalink(); ?>">
						<?php
							the_post_thumbnail('efor_image_size_1');
						?>
					</a>
				</div> <!-- .featured-image -->
			<?php
		}
	}

?>
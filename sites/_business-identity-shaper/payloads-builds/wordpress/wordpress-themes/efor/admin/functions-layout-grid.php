<?php

	function efor_featured_media__layout_grid($first_full = 'No', $blog_grid_type = 'masonry')
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
							if ($first_full == 'Yes')
							{
								the_post_thumbnail('efor_image_size_1');
							}
							else
							{
								if ($blog_grid_type == 'fitRows')
								{
									the_post_thumbnail('efor_image_size_4');
								}
								else
								{
									the_post_thumbnail('efor_image_size_2');
								}
							}
						?>
					</a>
				</div> <!-- .featured-image -->
			<?php
		}
	}

?>
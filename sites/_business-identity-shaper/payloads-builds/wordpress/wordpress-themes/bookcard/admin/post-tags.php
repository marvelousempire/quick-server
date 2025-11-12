<?php

	function bookcard_post_tags()
	{
		$post_tags = get_theme_mod('bookcard_setting_post_tags', 'Yes');
		
		if ($post_tags != 'No')
		{
			if (get_the_tags() != "")
			{
				?>
					<footer class="entry-meta tags">
						<?php
							the_tags("", ' ', "");
						?>
					</footer> <!-- .entry-meta .tags -->
				<?php
			}
		}
	}

?>
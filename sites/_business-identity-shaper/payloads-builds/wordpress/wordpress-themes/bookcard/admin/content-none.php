<?php

	function bookcard_content_none()
	{
		?>
			<article class="hentry post">
				<header class="entry-header">
					<h2 class="entry-title">
						<?php
							if (is_404())
							{
								esc_html_e('You are Lost!', 'bookcard');
							}
							elseif (is_search())
							{
								esc_html_e('Nothing Found', 'bookcard');
							}
							else
							{
								esc_html_e('Nothing Found', 'bookcard');
							}
						?>
					</h2> <!-- .entry-title -->
				</header> <!-- .entry-header -->
				<div class="entry-content">
					<p>
						<?php
							if (is_404())
							{
								esc_html_e('The page you are looking for was not found! Perhaps searching can help.', 'bookcard');
							}
							elseif (is_search())
							{
								esc_html_e('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'bookcard');
							}
							else
							{
								esc_html_e('It seems we can not find what you are looking for. Perhaps searching can help.', 'bookcard');
							}
						?>
					</p>
					<?php
						get_search_form();
					?>
				</div> <!-- .entry-content -->
			</article> <!-- .hentry .post -->
		<?php
	}

?>
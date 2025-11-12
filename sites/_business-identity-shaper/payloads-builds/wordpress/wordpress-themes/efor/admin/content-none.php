<?php

	function efor_content_none()
	{
		?>
			<article class="hentry page no-posts">
				<header class="entry-header">
					<h2 class="entry-title">
						<?php
							esc_html_e('nothing found', 'efor');
						?>
					</h2> <!-- .entry-title -->
				</header> <!-- .entry-header -->
				<div class="entry-content">
					<div class="http-alert">
						<h1>
							<i class="pw-icon-doc-alt"></i>
						</h1>
						<?php
							if (is_search())
							{
								?><p><?php esc_html_e('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'efor'); ?></p><?php
								
								get_search_form();
							}
							else
							{
								?><p><?php esc_html_e('It seems we can not find what you are looking for. Perhaps searching can help.', 'efor'); ?></p><?php
								
								get_search_form();
							}
						?>
					</div> <!-- .http-alert -->
				</div> <!-- .entry-content -->
			</article> <!-- .hentry .page -->
		<?php
	}

?>
<?php

	function bookcard_meta()
	{
		?>
			<div class="entry-meta">
				<span class="entry-date">
					<time class="entry-date" datetime="<?php echo get_the_date('c'); ?>">
						<?php
							echo get_the_date();
						?>
					</time>
				</span>
				<span class="comment-link">
					<?php
						comments_popup_link(
							esc_html__('0 Comments', 'bookcard'),
							esc_html__('1 Comment', 'bookcard'),
							esc_html__('% Comments', 'bookcard'),
							"",
							'Comments Off'
						);
					?>
				</span>
				<span class="cat-links">
					<?php
						the_category(', ');
					?>
				</span>
				<?php
					edit_post_link(
						esc_html__('Edit', 'bookcard'),
						'<span class="edit-link">',
						'</span>'
					);
				?>
			</div> <!-- .entry-meta -->
		<?php
	}

?>
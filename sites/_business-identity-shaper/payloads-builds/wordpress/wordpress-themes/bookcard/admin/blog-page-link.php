<?php

	function bookcard_blog_page_link_html($url)
	{
		?>
			<a class="button2" href="<?php echo esc_url($url); ?>">
				<?php
					esc_html_e('All Posts', 'bookcard');
				?>
			</a> <!-- .button2 -->
		<?php
	}
	
	
	function bookcard_blog_page_link()
	{
		$front_page_displays = get_option('show_on_front');
		
		if ($front_page_displays == 'posts')
		{
			$home_url = home_url('/');
			bookcard_blog_page_link_html($home_url);
		}
		else
		{
			$blog_page_id = get_option('page_for_posts');
			
			if ($blog_page_id)
			{
				$blog_page_url = get_page_link($blog_page_id);
				bookcard_blog_page_link_html($blog_page_url);
			}
		}
	}

?>
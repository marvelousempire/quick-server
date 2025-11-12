<?php

	function bookcard_excerpt_length($length)
	{
		$custom_length = get_theme_mod('bookcard_setting_excerpt_length', '55');
		
		if (! empty($custom_length))
		{
			return $length = intval($custom_length);
		}
		else
		{
			return $length;
		}
	}
	
	add_filter('excerpt_length', 'bookcard_excerpt_length', 999);
	
	
	function bookcard_the_content_more_link()
	{
		$more_link = '<p class="more">';
		$more_link .= '<a class="more-link" href="' . esc_url(get_permalink()) . '">' . esc_html__('Read More', 'bookcard') . '</a>';
		$more_link .= '</p>';
		
		return $more_link;
	}
	
	add_filter('the_content_more_link', 'bookcard_the_content_more_link');
	
	
	function bookcard_excerpt_more($more)
	{
		$more = '...' . ' ' . bookcard_the_content_more_link();
		
		return $more;
	}
	
	add_filter('excerpt_more', 'bookcard_excerpt_more');
	
	
	function bookcard_content()
	{
		if (is_home() || is_archive() || is_search())
		{
			if (has_excerpt())
			{
				the_excerpt();
				
				echo bookcard_the_content_more_link();
			}
			else
			{
				$automatic_excerpt = get_theme_mod('bookcard_setting_automatic_excerpt', 'standard');
				
				if ($automatic_excerpt == 'No')
				{
					the_content();
				}
				elseif ($automatic_excerpt == 'Yes')
				{
					the_excerpt();
				}
				else
				{
					$format = get_post_format();
					
					if ($format == false)
					{
						the_excerpt();
					}
					else
					{
						the_content();
					}
				}
			}
		}
		else
		{
			the_content();
		}
		
		wp_link_pages(
			array(
				'before'      => '<div class="page-links"><span class="page-links-title">' . esc_html__('Pages:', 'bookcard') . '</span>',
				'after'       => '</div>',
				'link_before' => '<span class="page-number">',
				'link_after'  => '</span>'
			)
		);
	}

?>
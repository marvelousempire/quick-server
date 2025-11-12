<?php

	function efor_excerpt_length($length)
	{
		$layout = 'Regular';
		
		if (isset($_GET['layout']))
		{
			$layout = $_GET['layout'];
		}
		else
		{
			$layout = efor_archive_layout();
		}
		
		if (($layout == 'Regular') || ($layout == 'regular'))
		{
			return get_theme_mod('efor_setting_excerpt_length', '65');
		}
		else
		{
			return get_theme_mod('efor_setting_excerpt_length_layout_grid', '35');
		}
	}
	
	add_filter('excerpt_length', 'efor_excerpt_length', 999);


/* ============================================================================================================================================= */


	function efor_read_more_link()
	{
		$more_link_text = get_theme_mod('efor_setting_more_link_text', "");
		$more_link_text = trim($more_link_text);
		
		if (empty($more_link_text))
		{
			$more_link_text = esc_html__('Read More', 'efor');
		}
		
		return '<p class="more"><a class="more-link" href="' . esc_url(get_permalink()) . '">' . $more_link_text . '</a></p>';
	}
	
	add_filter('the_content_more_link', 'efor_read_more_link');
	
	
	function efor_excerpt_more($more)
	{
		return '... ' . efor_read_more_link();
	}
	
	add_filter('excerpt_more', 'efor_excerpt_more');


/* ============================================================================================================================================= */


	function efor_content()
	{
		if (is_singular() || is_post_type_archive() || is_tax())
		{
			the_content(); // Content for: All Single posts/pages/custom posts/custom pages, Custom post type archives, Custom taxonomy archives.
		}
		else
		{
			// Content for: Blog page, Search results, Default archives (Category, Tag, Author, Date).
			
			if (! has_post_format('chat'))
			{
				if (has_excerpt())
				{
					the_excerpt();
					
					echo efor_read_more_link();
				}
				else
				{
					$automatic_excerpt = get_theme_mod('efor_setting_automatic_excerpt', 'standard'); // Regular archives.
					
					if (isset($_GET['layout']))
					{
						if ($_GET['layout'] != 'regular')
						{
							$automatic_excerpt = 'Yes'; // Grid, List, Circles archives.
						}
					}
					else
					{
						$layout = efor_archive_layout();
						
						if ($layout == 'Other')
						{
							$automatic_excerpt = 'No'; // For other archives.
						}
						elseif ($layout != 'Regular')
						{
							$automatic_excerpt = 'Yes'; // For Grid, List, Circles archives.
						}
					}
					
					if ($automatic_excerpt == 'Yes')
					{
						the_excerpt(); // For all posts (all formats).
					}
					elseif ($automatic_excerpt == 'standard')
					{
						$format = get_post_format();
						
						if ($format == false)
						{
							the_excerpt(); // Only for standard posts (standard format).
						}
						else
						{
							the_content(); // For other posts (other formats).
						}
					}
					else
					{
						the_content(); // For all posts (all formats).
					}
				}
			}
		}
		
		wp_link_pages(
			array(
				'before'      => '<div class="page-links"><span class="page-links-title">' . esc_html__('Pages:', 'efor') . '</span>',
				'after'       => '</div>',
				'link_before' => '<span class="page-number">',
				'link_after'  => '</span>'
			)
		);
	}


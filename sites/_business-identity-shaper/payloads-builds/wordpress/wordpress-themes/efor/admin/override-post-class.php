<?php

	function efor_portfolio_page__post_class()
	{
		$taxonomy         = 'portfolio-category';
		$categories_slugs = "";
		$categories 	  = get_the_terms(get_the_ID(), $taxonomy);
		
		if ($categories && (! is_wp_error($categories)))
		{
			foreach ($categories as $category)
			{
				// Get post's category slug and its parent category slug.
				
				$categories_slugs .= get_term_parents_list(
					$category->term_id,
					$taxonomy,
					array(
						'format'    => 'slug',
						'separator' => ' ',
						'link'      => false,
						'inclusive' => true,
					)
				);
			}
		}
		
		$post_class = esc_attr($categories_slugs);
		
		return $post_class;
	}
	
	
	function efor_category_link_style()
	{
		return get_theme_mod('efor_setting_meta_cat_link_style', 'is-cat-link-line-before');
	}
	
	
	function efor_post_class($classes, $class, $post_id)
	{
		if (! is_admin())
		{
			if (is_page_template('page_template-portfolio.php') || is_tax('portfolio-category')) // [Custom Post Type] Portfolio pages. (portfolio page template, portfolio category)
			{
				$classes[] = esc_attr(efor_portfolio_page__post_class());
			}
			elseif (get_post_type() == 'product') // [Plugin] WooCommerce products.
			{
				$classes[] = esc_attr('hentry');
			}
			else
			{
				$classes[] = esc_attr(efor_category_link_style());
			}
		}
		
		return $classes;
	}
	
	add_filter('post_class', 'efor_post_class', 10, 3);

?>
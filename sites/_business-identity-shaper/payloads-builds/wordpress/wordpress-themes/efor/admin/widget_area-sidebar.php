<?php

	function efor_sidebar()
	{
		if (! is_404())
		{
			?>
				<div id="secondary" class="widget-area sidebar" role="complementary">
				    <div class="sidebar-wrap">
						<div class="sidebar-content">
							<?php
								if (is_page())
								{
									$sidebar_individual = get_option('efor_select_page_sidebar' . '__' . get_the_ID(), 'No Sidebar');
									dynamic_sidebar($sidebar_individual); // Individual page sidebar. (Default and Custom page templates)
								}
								elseif (is_post_type_archive('product') || is_tax('product_cat') || is_singular('product')) // WooCommerce plugin. (shop page, product category page, product page)
								{
									$shop_page_id       = get_option('woocommerce_shop_page_id');
									$sidebar_individual = get_option('efor_select_page_sidebar' . '__' . $shop_page_id, 'No Sidebar');
									dynamic_sidebar($sidebar_individual); // WooCommerce plugin. Individual shop sidebar.
								}
								elseif (is_tax('portfolio-category')) // Portfolio category page.
								{
									dynamic_sidebar('efor_sidebar_15'); // Global portfolio sidebar.
								}
								elseif (is_singular('portfolio')) // Portfolio post.
								{
									$sidebar_individual = get_option('efor_select_page_sidebar' . '__' . get_the_ID(), 'inherit');
									
									if ($sidebar_individual == 'inherit')
									{
										dynamic_sidebar('efor_sidebar_15'); // Global portfolio sidebar.
									}
									else
									{
										if ($sidebar_individual != 'No Sidebar')
										{
											dynamic_sidebar($sidebar_individual); // Individual portfolio sidebar.
										}
									}
								}
								elseif (is_tax('course_category')) // LearnPress plugin. (course category page)
								{
									dynamic_sidebar('efor_sidebar_course'); // Global course sidebar.
								}
								elseif (is_post_type_archive('lp_course') || is_singular('lp_course')) // LearnPress plugin. (courses page, individual course page)
								{
									$sidebar_individual = get_option('efor_select_page_sidebar' . '__' . get_the_ID(), 'inherit');
									
									if ($sidebar_individual == 'inherit')
									{
										dynamic_sidebar('efor_sidebar_course'); // Global course sidebar.
									}
									else
									{
										if ($sidebar_individual != 'No Sidebar')
										{
											dynamic_sidebar($sidebar_individual); // LearnPress plugin. (individual course sidebar)
										}
									}
								}
								elseif (is_singular('post'))
								{
									$sidebar_individual = get_option('efor_select_page_sidebar' . '__' . get_the_ID(), 'inherit');
									
									if ($sidebar_individual == 'inherit')
									{
										if (is_active_sidebar('efor_sidebar_2'))
										{
											dynamic_sidebar('efor_sidebar_2'); // Global post sidebar.
										}
										else
										{
											dynamic_sidebar('efor_sidebar_1'); // Global blog sidebar.
										}
									}
									else
									{
										if ($sidebar_individual != 'No Sidebar')
										{
											dynamic_sidebar($sidebar_individual); // Individual post sidebar.
										}
									}
								}
								else
								{
									dynamic_sidebar('efor_sidebar_1'); // Global blog sidebar.
								}
							?>
						</div> <!-- .sidebar-content -->
					</div> <!-- .sidebar-wrap -->
				</div> <!-- #secondary .widget-area .sidebar -->
			<?php
		}
	}


/* ============================================================================================================================================= */


	function efor_sidebar_yes_no()
	{
		global $efor_sidebar;
		$efor_sidebar = 'with-sidebar';
		
		if (isset($_GET['sidebar']))
		{
			if ($_GET['sidebar'] == 'no')
			{
				$efor_sidebar = "";
			}
		}
		else
		{
			if (is_singular('portfolio'))
			{
				$sidebar_global_portfolio_post = get_theme_mod('efor_setting_sidebar_portfolio_post', 'No'); // Portfolio Post Sidebar. (global setting)
				$sidebar_individual            = get_option('efor_select_page_sidebar' . '__' . get_the_ID(), 'inherit'); // Portfolio Post Sidebar. (individual setting)
				
				if ((($sidebar_global_portfolio_post != 'Yes') && ($sidebar_individual == 'inherit')) || ($sidebar_individual == 'No Sidebar'))
				{
					$efor_sidebar = "";
				}
			}
			elseif (is_singular('lp_course'))
			{
				$sidebar_global_course_post = get_theme_mod('efor_setting_sidebar_course', 'No'); // Course Post Sidebar. (global setting)
				$sidebar_individual         = get_option('efor_select_page_sidebar' . '__' . get_the_ID(), 'No Sidebar'); // Course Post Sidebar. (individual setting)
				
				if (($sidebar_global_course_post != 'Yes') && ($sidebar_individual == 'No Sidebar'))
				{
					$efor_sidebar = "";
				}
			}
			elseif (is_single())
			{
				$sidebar_global_blog_post = get_theme_mod('efor_setting_sidebar_post', 'Yes'); // Blog Post Sidebar. (global setting)
				$sidebar_individual       = get_option('efor_select_page_sidebar' . '__' . get_the_ID(), 'inherit'); // Blog Post Sidebar. (individual setting)
				
				if ((($sidebar_global_blog_post == 'No') && ($sidebar_individual == 'inherit')) || ($sidebar_individual == 'No Sidebar'))
				{
					$efor_sidebar = "";
				}
			}
			else
			{
				if (is_category() || is_tag() || is_author() || is_date() || is_search())
				{
					$sidebar_archive = get_theme_mod('efor_setting_sidebar_archive', 'No');  // Archives/Search Sidebar. (global setting)
					
					if ($sidebar_archive != 'Yes')
					{
						$efor_sidebar = "";
					}
				}
				else
				{
					$sidebar_blog = get_theme_mod('efor_setting_sidebar_blog', 'Yes'); // Blog page Sidebar. (global setting)
					
					if ($sidebar_blog == 'No')
					{
						$efor_sidebar = "";
					}
				}
			}
		}
	}


/* ============================================================================================================================================= */


	function efor_singular_sidebar($echo = "")
	{
		$queried_object   = get_queried_object();
		$queried_taxonomy = $queried_object->taxonomy;
		
		global $efor_sidebar;
		efor_sidebar_yes_no();
		
		$layout_class  = 'layout-fixed';
		$sidebar_class = "";
		$page_sidebar  = get_option('efor_select_page_sidebar' . '__' . get_the_ID(), 'No Sidebar');
		
		if ($page_sidebar != 'No Sidebar')
		{
			$layout_class  = 'layout-medium';
			$sidebar_class = 'with-sidebar';
		}
		elseif (is_singular('lp_course'))
		{
			$layout_class = 'layout-medium';
		}
		else
		{
			$archive_layout = efor_archive_layout();
			
			if ($archive_layout == 'Other')
			{
				$layout_class = 'layout-medium';
			}
		}
		
		
		if ($echo == 'class-layout')
		{
			if (is_singular('page') || is_post_type_archive() || is_singular('lp_course') || ($queried_taxonomy == 'course_category'))
			{
				echo esc_attr($layout_class);
			}
			else
			{
				if ($efor_sidebar != "")
				{
					echo 'layout-medium';
				}
				else
				{
					echo 'layout-fixed';
				}
			}
		}
		elseif ($echo == 'class-sidebar')
		{
			if (is_singular('page') || is_post_type_archive() || ($queried_taxonomy == 'course_category'))
			{
				echo esc_attr($sidebar_class);
			}
			else
			{
				echo esc_attr($efor_sidebar);
			}
		}
		elseif ($echo == 'html-sidebar')
		{
			if (is_singular('page') || is_post_type_archive())
			{
				if ($page_sidebar != 'No Sidebar')
				{
					efor_sidebar();
				}
			}
			else
			{
				if ($efor_sidebar != "")
				{
					efor_sidebar();
				}
			}
		}
	}

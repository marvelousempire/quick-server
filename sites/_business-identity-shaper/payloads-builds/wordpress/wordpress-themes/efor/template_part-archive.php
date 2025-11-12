<?php

	if (isset($_GET['layout']))
	{
		if ($_GET['layout'] == 'grid')
		{
			get_template_part('layout', 'grid');
		}
		elseif ($_GET['layout'] == 'list')
		{
			get_template_part('layout', 'list');
		}
		elseif ($_GET['layout'] == 'circles')
		{
			get_template_part('layout', 'circles');
		}
		else
		{
			get_template_part('layout', 'regular');
		}
	}
	else
	{
		$layout = 'Regular';
		
		if (! have_posts())
		{
			$layout = 'Regular';
		}
		else
		{
			$layout = efor_archive_layout();
		}
		
		if (($layout == 'Grid') || ($layout == '1st Full + Grid'))
		{
			get_template_part('layout', 'grid');
		}
		elseif (($layout == 'List') || ($layout == '1st Full + List'))
		{
			get_template_part('layout', 'list');
		}
		elseif ($layout == 'Circles')
		{
			get_template_part('layout', 'circles');
		}
		else
		{
			get_template_part('layout', 'regular');
		}
	}

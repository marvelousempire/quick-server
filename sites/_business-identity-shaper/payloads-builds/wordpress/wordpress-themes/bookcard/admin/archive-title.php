<?php

	if (! function_exists('bookcard_archive_title'))
	{
		function bookcard_archive_title()
		{
			if (! is_front_page())
			{
				?>
					<header class="entry-header">
						<?php
							if (is_category())
							{
								?>
									<div class="section-title center">    
										<h2>
											<i>
												<?php
													esc_html_e('Browsing Category', 'bookcard');
												?>
											</i>
										</h2>
									</div> <!-- .section-title .center -->
									<h1 class="entry-title">
										<?php
											echo single_cat_title();
										?>
									</h1> <!-- .entry-title -->
									<?php
										if (category_description())
										{
											?>
												<div class="category-description">
													<?php
														echo category_description();
													?>
												</div> <!-- .category-description -->
											<?php
										}
									?>
								<?php
							}
							elseif (is_tag())
							{
								?>
									<div class="section-title center">    
										<h2>
											<i>
												<?php
													esc_html_e('Posts Tagged', 'bookcard');
												?>
											</i>
										</h2>
									</div> <!-- .section-title .center -->
									<h1 class="entry-title">
										<?php
											echo single_tag_title();
										?>
									</h1> <!-- .entry-title -->
									<?php
										if (tag_description())
										{
											?>
												<div class="tag-description">
													<?php
														echo tag_description();
													?>
												</div> <!-- .tag-description -->
											<?php
										}
									?>
								<?php
							}
							elseif (is_author())
							{
								?>
									<div class="section-title center">    
										<h2>
											<i>
												<?php
													esc_html_e('Posts Published by', 'bookcard');
												?>
											</i>
										</h2>
									</div> <!-- .section-title .center -->
									<h1 class="entry-title">
										<?php
											the_author();
										?>
									</h1> <!-- .entry-title -->
								<?php
							}
							elseif (is_search())
							{
								?>
									<div class="section-title center">    
										<h2>
											<i>
												<?php
													esc_html_e('You Searched For', 'bookcard');
												?>
											</i>
										</h2>
									</div> <!-- .section-title .center -->
									<h1 class="entry-title">
										<?php
											the_search_query();
										?>
									</h1> <!-- .entry-title -->
								<?php
							}
							elseif (is_date())
							{
								?>
									<div class="section-title center">    
										<h2>
											<i>
												<?php
													esc_html_e('Date Archives', 'bookcard');
												?>
											</i>
										</h2>
									</div> <!-- .section-title .center -->
									<h1 class="entry-title">
										<?php
											if (is_day())
											{
												printf(get_the_date());
											}
											elseif (is_month())
											{
												printf(get_the_date(_x('F Y', 'monthly archives date format', 'bookcard')));
											}
											elseif (is_year())
											{
												printf(get_the_date(_x('Y', 'yearly archives date format', 'bookcard')));
											}
											else
											{
												esc_html_e('Archives', 'bookcard');
											}
										?>
									</h1> <!-- .entry-title -->
								<?php
							}
							elseif (is_post_type_archive())
							{
								?>
									<div class="section-title center">    
										<h2>
											<i>
												<?php
													esc_html_e('Archives', 'bookcard');
												?>
											</i>
										</h2>
									</div> <!-- .section-title .center -->
									<h1 class="entry-title">
										<?php
											echo post_type_archive_title();
										?>
									</h1> <!-- .entry-title -->
								<?php
							}
							elseif (is_archive())
							{
								?>
									<div class="section-title center">    
										<h2>
											<i>
												<?php
													esc_html_e('Archives', 'bookcard');
												?>
											</i>
										</h2>
									</div> <!-- .section-title .center -->
									<h1 class="entry-title">
										<?php
											echo single_term_title();
										?>
									</h1> <!-- .entry-title -->
								<?php
							}
							else
							{
								?>
									<h1 class="entry-title">
										<?php
											single_post_title();
										?>
									</h1> <!-- .entry-title -->
								<?php
							}
						?>
					</header> <!-- .entry-header -->
				<?php
			}
		}
	}

?>
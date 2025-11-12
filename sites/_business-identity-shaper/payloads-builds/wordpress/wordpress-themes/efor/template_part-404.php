
<div id="main" class="site-main">
	<div class="layout-medium">
		<div id="primary" class="content-area">
			<div id="content" class="site-content" role="main">
				<article class="hentry page">
					<div class="hentry-wrap">
						<div class="post-header page-header post-header-classic">
							<header class="entry-header">
								<h1 class="entry-title">
									<?php
										esc_html_e('you are lost!', 'efor');
									?>
								</h1> <!-- .entry-title -->
							</header> <!-- .entry-header -->
						</div> <!-- .post-header .page-header .post-header-classic -->
						<div class="entry-content">
							<div class="http-alert">
								<h1>
									<i class="pw-icon-doc-alt"></i>
								</h1>
								<p>
									<?php esc_html_e('The page you are looking for was not found!', 'efor'); ?>
								</p>
								<p>
									<a class="button big" href="<?php echo esc_url(home_url('/')); ?>"><i class="pw-icon-home"></i><?php esc_html_e('Return To Homepage', 'efor'); ?></a>
								</p>
							</div> <!-- .http-alert -->
						</div> <!-- .entry-content -->
					</div> <!-- .hentry-wrap -->
				</article> <!-- .hentry .page -->
			</div> <!-- #content .site-content -->
		</div> <!-- #primary .content-area -->
	</div> <!-- .layout -->
</div> <!-- #main .site-main -->

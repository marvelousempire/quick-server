(function($) {

	wp.customize( 'blogname', function( value )
	{
		value.bind( function( to )
		{
			// $( '.site-title a' ).html( to );
		});
	});
	
	
	wp.customize( 'blogdescription', function( value )
	{
		value.bind( function( to )
		{
			// $( '.site-description' ).html( to );
		});
	});
	
	
// ========================================================================================


 	wp.customize( 'setting_text_logo_font', function( value )
	{
		value.bind( function( to )
		{
			$( 'body' ).append( '<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=' + to + '">' );
			
			$( '.cover h1' ).css( 'font-family', '"' + to + '"' );
		});
	});
	
	
 	wp.customize( 'setting_text_slogan_font', function( value )
	{
		value.bind( function( to )
		{
			$( 'body' ).append( '<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=' + to + '">' );
			
			$( '.cover h2' ).css( 'font-family', '"' + to + '"' );
		});
	});
	
	
 	wp.customize( 'setting_page_title_font', function( value )
	{
		value.bind( function( to )
		{
			$( 'body' ).append( '<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=' + to + '">' );
			
			$( 'h2.inner-page-title' ).css( 'font-family', '"' + to + '"' );
		});
	});
	
	
 	wp.customize( 'setting_content_font', function( value )
	{
		value.bind( function( to )
		{
			$( 'body' ).append( '<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=' + to + '">' );
			
			$( 'body' ).css( 'font-family', '"' + to + '"' );
		});
	});
	
	
 	wp.customize( 'setting_open_button_font', function( value )
	{
		value.bind( function( to )
		{
			$( 'body' ).append( '<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=' + to + '">' );
			
			$( 'a.rm-button-open strong.ribbon-content' ).css( 'font-family', '"' + to + '"' );
		});
	});

})(jQuery);